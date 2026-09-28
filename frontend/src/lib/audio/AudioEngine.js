import { ClickSynth } from "./ClickSynth.js";
import { Scheduler } from "./Scheduler.js";
import {
  advanceCursor,
  beatDurationSeconds,
  createInitialCursor,
  validatePlaybackConfig,
} from "./timing.js";

const START_DELAY_SECONDS = 0.05;
const EVENT_HISTORY_SECONDS = 0.25;

function cloneSequence(sequence) {
  return sequence.map((item) => ({
    id: item.id,
    repetitions: item.repetitions,
    meter: {
      numerator: item.meter.numerator,
      denominator: item.meter.denominator,
      grouping: item.meter.grouping
        ? [...item.meter.grouping]
        : undefined,
    },
  }));
}

function cloneLoopSettings(loopSettings) {
  return { ...loopSettings };
}

function sequencesEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  return a.every((item, index) => {
    const other = b[index];

    if (!other) {
      return false;
    }

    return (
      item.repetitions === other.repetitions &&
      item.meter.numerator === other.meter.numerator &&
      item.meter.denominator === other.meter.denominator &&
      JSON.stringify(item.meter.grouping ?? []) ===
        JSON.stringify(other.meter.grouping ?? [])
    );
  });
}

function loopSettingsEqual(a, b) {
  return a.mode === b.mode && a.cycles === b.cycles;
}

export class AudioEngine {
  constructor(config, callbacks = {}) {
    validatePlaybackConfig(
      config.sequence,
      config.bpm,
      config.loopSettings,
    );

    this.context = null;
    this.synth = null;
    this.scheduler = null;

    this.config = {
      sequence: cloneSequence(config.sequence),
      bpm: config.bpm,
      loopSettings: cloneLoopSettings(config.loopSettings),
    };

    this.callbacks = callbacks;
    this.transportState = "stopped";

    this.cursor = createInitialCursor();
    this.nextBeatTime = 0;
    this.pendingCompletionTime = null;
    this.scheduledBeats = [];
    this.nextScheduledBeatId = 1;

    this.masterVolume = 0.7;
    this.accentLevel = 0.9;
    this.destroyed = false;

    this.scheduleUntil = this.scheduleUntil.bind(this);
  }

  getState() {
    return this.transportState;
  }

  setCallbacks(callbacks) {
    this.callbacks = callbacks;
  }

  setConfig(config) {
    validatePlaybackConfig(
      config.sequence,
      config.bpm,
      config.loopSettings,
    );

    const sequenceChanged = !sequencesEqual(
      this.config.sequence,
      config.sequence,
    );

    const loopSettingsChanged = !loopSettingsEqual(
      this.config.loopSettings,
      config.loopSettings,
    );

    this.config = {
      sequence: cloneSequence(config.sequence),
      bpm: config.bpm,
      loopSettings: cloneLoopSettings(config.loopSettings),
    };

    if (
      this.transportState === "stopped" ||
      sequenceChanged ||
      loopSettingsChanged
    ) {
      this.resetPosition();
    }
  }

  setMasterVolume(value) {
    this.masterVolume = Math.min(1, Math.max(0, value));
    this.synth?.setMasterVolume(this.masterVolume);
  }

  setAccentLevel(value) {
    this.accentLevel = Math.min(1, Math.max(0, value));
    this.synth?.setAccentLevel(this.accentLevel);
  }

  async play() {
    this.assertNotDestroyed();

    if (this.transportState === "playing") {
      return;
    }

    try {
      validatePlaybackConfig(
        this.config.sequence,
        this.config.bpm,
        this.config.loopSettings,
      );

      const context = await this.ensureAudioContext();

      if (context.state === "suspended") {
        await context.resume();
      }

      if (context.state !== "running") {
        throw new Error("Audio could not be started in this browser.");
      }

      this.pendingCompletionTime = null;
      this.nextBeatTime = context.currentTime + START_DELAY_SECONDS;

      this.setState("playing");
      this.scheduler?.start();
    } catch (error) {
      const normalized =
        error instanceof Error
          ? error
          : new Error("Unable to start audio playback.");

      this.callbacks.onError?.(normalized);
      throw normalized;
    }
  }

  pause() {
    if (this.transportState !== "playing" || !this.context) {
      return;
    }

    this.scheduler?.stop();
    this.rewindToFirstCancelledBeat(this.context.currentTime);
    this.pendingCompletionTime = null;
    this.setState("paused");
  }

  stop() {
    if (this.destroyed) {
      return;
    }

    this.scheduler?.stop();
    this.cancelFutureClicks(this.context?.currentTime ?? 0);
    this.resetPosition();
    this.setState("stopped");
  }

  async restart() {
    this.assertNotDestroyed();

    this.scheduler?.stop();
    this.cancelFutureClicks(this.context?.currentTime ?? 0);
    this.resetPosition();
    this.setState("stopped");

    await this.play();
  }

  async destroy() {
    if (this.destroyed) {
      return;
    }

    this.destroyed = true;

    this.scheduler?.stop();
    this.cancelFutureClicks(this.context?.currentTime ?? 0);
    this.synth?.dispose();

    const context = this.context;

    this.scheduler = null;
    this.synth = null;
    this.context = null;

    if (context && context.state !== "closed") {
      try {
        await context.close();
      } catch {
        // Page teardown can interrupt closing.
      }
    }
  }

  async ensureAudioContext() {
    if (this.context) {
      return this.context;
    }

    if (typeof window === "undefined") {
      throw new Error("Web Audio is only available in the browser.");
    }

    const AudioContextConstructor =
      window.AudioContext ?? window.webkitAudioContext;

    if (!AudioContextConstructor) {
      throw new Error(
        "This browser does not support the Web Audio API.",
      );
    }

    const context = new AudioContextConstructor();

    const synth = new ClickSynth(
      context,
      this.masterVolume,
      this.accentLevel,
    );

    const scheduler = new Scheduler(
      context,
      this.scheduleUntil,
    );

    this.context = context;
    this.synth = synth;
    this.scheduler = scheduler;

    return context;
  }

  scheduleUntil(scheduleUntil) {
    const context = this.context;
    const synth = this.synth;

    if (
      !context ||
      !synth ||
      this.transportState !== "playing"
    ) {
      return;
    }

    this.removeOldScheduledBeats(context.currentTime);

    if (this.pendingCompletionTime !== null) {
      if (context.currentTime >= this.pendingCompletionTime) {
        this.completePlayback();
      }

      return;
    }

    while (
      this.transportState === "playing" &&
      this.pendingCompletionTime === null &&
      this.nextBeatTime <= scheduleUntil
    ) {
      const item = this.config.sequence[this.cursor.sequenceIndex];

      if (!item) {
        this.failPlayback(
          new Error(
            "Playback position is outside the meter sequence.",
          ),
        );
        return;
      }

      const scheduledCursor = {
        ...this.cursor,
      };

      const isBarAccent = scheduledCursor.beatIndex === 0;

      const handle = synth.scheduleClick(
        this.nextBeatTime,
        isBarAccent,
      );

      this.scheduledBeats.push({
        id: this.nextScheduledBeatId++,
        time: this.nextBeatTime,
        cursor: scheduledCursor,
        isBarAccent,
        handle,
      });

      const duration = beatDurationSeconds(
        this.config.bpm,
        item.meter.denominator,
      );

      const advanceResult = advanceCursor(
        this.config.sequence,
        scheduledCursor,
        this.config.loopSettings,
      );

      this.nextBeatTime += duration;

      if (advanceResult.done) {
        this.cursor = advanceResult.cursor;

        const finalBeat = this.scheduledBeats.at(-1);

        if (finalBeat) {
          this.pendingCompletionTime = finalBeat.time + 0.06;
        }

        break;
      }

      this.cursor = advanceResult.cursor;
    }
  }

  rewindToFirstCancelledBeat(now) {
    const futureBeats = this.scheduledBeats
      .filter((beat) => beat.time > now)
      .sort((a, b) => a.time - b.time);

    if (futureBeats.length > 0) {
      this.cursor = {
        ...futureBeats[0].cursor,
      };
    }

    for (const beat of futureBeats) {
      beat.handle.cancel(now);
    }

    this.scheduledBeats = this.scheduledBeats.filter(
      (beat) => beat.time <= now,
    );
  }

  cancelFutureClicks(now) {
    for (const beat of this.scheduledBeats) {
      if (beat.time > now) {
        beat.handle.cancel(now);
      }
    }

    this.scheduledBeats = [];
  }

  removeOldScheduledBeats(now) {
    const cutoff = now - EVENT_HISTORY_SECONDS;

    this.scheduledBeats = this.scheduledBeats.filter(
      (beat) => beat.time >= cutoff,
    );
  }

  completePlayback() {
    this.scheduler?.stop();
    this.scheduledBeats = [];
    this.resetPosition();
    this.setState("stopped");
  }

  failPlayback(error) {
    this.scheduler?.stop();
    this.cancelFutureClicks(this.context?.currentTime ?? 0);
    this.resetPosition();
    this.setState("stopped");
    this.callbacks.onError?.(error);
  }

  resetPosition() {
    this.cursor = createInitialCursor();
    this.nextBeatTime = 0;
    this.pendingCompletionTime = null;
  }

  setState(nextState) {
    if (this.transportState === nextState) {
      return;
    }

    this.transportState = nextState;
    this.callbacks.onStateChange?.(nextState);
  }

  assertNotDestroyed() {
    if (this.destroyed) {
      throw new Error("This audio engine has already been destroyed.");
    }
  }
}
