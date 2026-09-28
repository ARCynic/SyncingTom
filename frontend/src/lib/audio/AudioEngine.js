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
const FINAL_BEAT_SETTLE_SECONDS = 0.12;

function cloneMeter(meter) {
  return {
    numerator: meter.numerator,
    denominator: meter.denominator,

    grouping: meter.grouping
      ? [...meter.grouping]
      : undefined,
  };
}

function cloneSequence(sequence) {
  return sequence.map((item) => ({
    id: item.id,
    repetitions: item.repetitions,
    meter: cloneMeter(item.meter),
  }));
}

function cloneLoopSettings(loopSettings) {
  return {
    ...loopSettings,
  };
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
      item.meter.numerator ===
        other.meter.numerator &&
      item.meter.denominator ===
        other.meter.denominator &&
      JSON.stringify(
        item.meter.grouping ?? [],
      ) ===
        JSON.stringify(
          other.meter.grouping ?? [],
        )
    );
  });
}

function loopSettingsEqual(a, b) {
  return (
    a.mode === b.mode &&
    a.cycles === b.cycles
  );
}

function countBars(sequence) {
  return sequence.reduce(
    (total, item) =>
      total + item.repetitions,
    0,
  );
}

function getBarNumber(
  sequence,
  cursor,
) {
  let barsBefore = 0;

  for (
    let index = 0;
    index < cursor.sequenceIndex;
    index += 1
  ) {
    barsBefore +=
      sequence[index]?.repetitions ??
      0;
  }

  return (
    barsBefore +
    cursor.repetitionIndex +
    1
  );
}

function getNextMeter(
  sequence,
  cursor,
  loopSettings,
) {
  const currentItem =
    sequence[cursor.sequenceIndex];

  if (!currentItem) {
    return null;
  }

  // Same meter repeats again.
  if (
    cursor.repetitionIndex + 1 <
    currentItem.repetitions
  ) {
    return cloneMeter(
      currentItem.meter,
    );
  }

  // Move to next sequence item.
  const nextItem =
    sequence[
      cursor.sequenceIndex + 1
    ];

  if (nextItem) {
    return cloneMeter(
      nextItem.meter,
    );
  }

  // End of the sequence.
  const anotherCycleExists =
    loopSettings.mode ===
      "infinite" ||
    cursor.cycleIndex + 1 <
      loopSettings.cycles;

  if (!anotherCycleExists) {
    return null;
  }

  return sequence[0]
    ? cloneMeter(
        sequence[0].meter,
      )
    : null;
}

export class AudioEngine {
  constructor(
    config,
    callbacks = {},
  ) {
    validatePlaybackConfig(
      config.sequence,
      config.bpm,
      config.loopSettings,
    );

    this.context = null;
    this.synth = null;
    this.scheduler = null;

    this.config = {
      sequence:
        cloneSequence(
          config.sequence,
        ),

      bpm: config.bpm,

      loopSettings:
        cloneLoopSettings(
          config.loopSettings,
        ),
    };

    this.callbacks = callbacks;

    this.transportState =
      "stopped";

    this.cursor =
      createInitialCursor();

    this.nextBeatTime = 0;

    this.pendingCompletionTime =
      null;

    this.scheduledBeats = [];

    this.nextScheduledBeatId = 1;

    // Timers are ONLY for visual
    // synchronization.
    // Audio timing remains controlled
    // by AudioContext.currentTime.
    this.visualTimerIds =
      new Set();

    this.masterVolume = 0.7;
    this.accentLevel = 0.9;

    this.destroyed = false;

    this.scheduleUntil =
      this.scheduleUntil.bind(this);
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

    const sequenceChanged =
      !sequencesEqual(
        this.config.sequence,
        config.sequence,
      );

    const loopSettingsChanged =
      !loopSettingsEqual(
        this.config.loopSettings,
        config.loopSettings,
      );

    this.config = {
      sequence:
        cloneSequence(
          config.sequence,
        ),

      bpm: config.bpm,

      loopSettings:
        cloneLoopSettings(
          config.loopSettings,
        ),
    };

    if (
      this.transportState ===
        "stopped" ||
      sequenceChanged ||
      loopSettingsChanged
    ) {
      this.resetPosition();
    }
  }

  setMasterVolume(value) {
    this.masterVolume =
      Math.min(
        1,
        Math.max(0, value),
      );

    this.synth?.setMasterVolume(
      this.masterVolume,
    );
  }

  setAccentLevel(value) {
    this.accentLevel =
      Math.min(
        1,
        Math.max(0, value),
      );

    this.synth?.setAccentLevel(
      this.accentLevel,
    );
  }

  async play() {
    this.assertNotDestroyed();

    if (
      this.transportState ===
      "playing"
    ) {
      return;
    }

    try {
      validatePlaybackConfig(
        this.config.sequence,
        this.config.bpm,
        this.config.loopSettings,
      );

      const context =
        await this.ensureAudioContext();

      if (
        context.state ===
        "suspended"
      ) {
        await context.resume();
      }

      if (
        context.state !==
        "running"
      ) {
        throw new Error(
          "Audio could not be started in this browser.",
        );
      }

      this.pendingCompletionTime =
        null;

      this.nextBeatTime =
        context.currentTime +
        START_DELAY_SECONDS;

      this.setState("playing");

      this.scheduler?.start();
    } catch (error) {
      const normalized =
        error instanceof Error
          ? error
          : new Error(
              "Unable to start audio playback.",
            );

      this.callbacks.onError?.(
        normalized,
      );

      throw normalized;
    }
  }

  pause() {
    if (
      this.transportState !==
        "playing" ||
      !this.context
    ) {
      return;
    }

    this.scheduler?.stop();

    this.clearVisualTimers();

    this.rewindToFirstCancelledBeat(
      this.context.currentTime,
    );

    this.pendingCompletionTime =
      null;

    this.setState("paused");
  }

  stop() {
    if (this.destroyed) {
      return;
    }

    this.scheduler?.stop();

    this.clearVisualTimers();

    this.cancelFutureClicks(
      this.context?.currentTime ?? 0,
    );

    this.resetPosition();

    this.setState("stopped");
  }

  async restart() {
    this.assertNotDestroyed();

    this.scheduler?.stop();

    this.clearVisualTimers();

    this.cancelFutureClicks(
      this.context?.currentTime ?? 0,
    );

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

    this.clearVisualTimers();

    this.cancelFutureClicks(
      this.context?.currentTime ?? 0,
    );

    this.synth?.dispose();

    const context =
      this.context;

    this.scheduler = null;
    this.synth = null;
    this.context = null;

    if (
      context &&
      context.state !== "closed"
    ) {
      try {
        await context.close();
      } catch {
        // Page teardown can
        // interrupt closing.
      }
    }
  }

  async ensureAudioContext() {
    if (this.context) {
      return this.context;
    }

    if (
      typeof window ===
      "undefined"
    ) {
      throw new Error(
        "Web Audio is only available in the browser.",
      );
    }

    const AudioContextConstructor =
      window.AudioContext ??
      window.webkitAudioContext;

    if (
      !AudioContextConstructor
    ) {
      throw new Error(
        "This browser does not support the Web Audio API.",
      );
    }

    const context =
      new AudioContextConstructor();

    const synth =
      new ClickSynth(
        context,
        this.masterVolume,
        this.accentLevel,
      );

    const scheduler =
      new Scheduler(
        context,
        this.scheduleUntil,
      );

    this.context = context;
    this.synth = synth;
    this.scheduler = scheduler;

    return context;
  }

  scheduleUntil(
    scheduleUntil,
  ) {
    const context =
      this.context;

    const synth =
      this.synth;

    if (
      !context ||
      !synth ||
      this.transportState !==
        "playing"
    ) {
      return;
    }

    this.removeOldScheduledBeats(
      context.currentTime,
    );

    if (
      this.pendingCompletionTime !==
      null
    ) {
      if (
        context.currentTime >=
        this.pendingCompletionTime
      ) {
        this.completePlayback();
      }

      return;
    }

    while (
      this.transportState ===
        "playing" &&
      this.pendingCompletionTime ===
        null &&
      this.nextBeatTime <=
        scheduleUntil
    ) {
      const item =
        this.config.sequence[
          this.cursor
            .sequenceIndex
        ];

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

      const scheduledTime =
        this.nextBeatTime;

      const isBarAccent =
        scheduledCursor
          .beatIndex === 0;

      const handle =
        synth.scheduleClick(
          scheduledTime,
          isBarAccent,
        );

      this.scheduledBeats.push({
        id:
          this.nextScheduledBeatId++,

        time:
          scheduledTime,

        cursor:
          scheduledCursor,

        isBarAccent,

        handle,
      });

      // Schedule the UI update
      // against the same Web Audio
      // timestamp.
      this.scheduleVisualBeat(
        scheduledTime,
        scheduledCursor,
        isBarAccent,
      );

      const duration =
        beatDurationSeconds(
          this.config.bpm,
          item.meter
            .denominator,
        );

      const advanceResult =
        advanceCursor(
          this.config.sequence,
          scheduledCursor,
          this.config
            .loopSettings,
        );

      this.nextBeatTime +=
        duration;

      if (
        advanceResult.done
      ) {
        this.cursor =
          advanceResult.cursor;

        this.pendingCompletionTime =
          scheduledTime +
          FINAL_BEAT_SETTLE_SECONDS;

        break;
      }

      this.cursor =
        advanceResult.cursor;
    }
  }

  scheduleVisualBeat(
    when,
    cursor,
    isBarAccent,
  ) {
    const context =
      this.context;

    if (
      !context ||
      typeof window ===
        "undefined"
    ) {
      return;
    }

    const item =
      this.config.sequence[
        cursor.sequenceIndex
      ];

    if (!item) {
      return;
    }

    const payload = {
      cursor: {
        ...cursor,
      },

      meter:
        cloneMeter(
          item.meter,
        ),

      repetitions:
        item.repetitions,

      isBarAccent,

      audioTime: when,

      barNumber:
        getBarNumber(
          this.config.sequence,
          cursor,
        ),

      totalBars:
        countBars(
          this.config.sequence,
        ),

      nextMeter:
        getNextMeter(
          this.config.sequence,
          cursor,
          this.config
            .loopSettings,
        ),
    };

    const delayMs =
      Math.max(
        0,
        (
          when -
          context.currentTime
        ) * 1000,
      );

    const timerId =
      window.setTimeout(
        () => {
          this.visualTimerIds.delete(
            timerId,
          );

          if (
            this.destroyed ||
            this.transportState !==
              "playing"
          ) {
            return;
          }

          this.callbacks.onBeat?.(
            payload,
          );
        },
        delayMs,
      );

    this.visualTimerIds.add(
      timerId,
    );
  }

  clearVisualTimers() {
    if (
      typeof window ===
      "undefined"
    ) {
      this.visualTimerIds.clear();

      return;
    }

    for (
      const timerId of
      this.visualTimerIds
    ) {
      window.clearTimeout(
        timerId,
      );
    }

    this.visualTimerIds.clear();
  }

  rewindToFirstCancelledBeat(
    now,
  ) {
    const futureBeats =
      this.scheduledBeats
        .filter(
          (beat) =>
            beat.time > now,
        )
        .sort(
          (a, b) =>
            a.time - b.time,
        );

    if (
      futureBeats.length > 0
    ) {
      this.cursor = {
        ...futureBeats[0]
          .cursor,
      };
    }

    for (
      const beat of
      futureBeats
    ) {
      beat.handle.cancel(
        now,
      );
    }

    this.scheduledBeats =
      this.scheduledBeats.filter(
        (beat) =>
          beat.time <= now,
      );
  }

  cancelFutureClicks(now) {
    for (
      const beat of
      this.scheduledBeats
    ) {
      if (
        beat.time > now
      ) {
        beat.handle.cancel(
          now,
        );
      }
    }

    this.scheduledBeats = [];
  }

  removeOldScheduledBeats(
    now,
  ) {
    const cutoff =
      now -
      EVENT_HISTORY_SECONDS;

    this.scheduledBeats =
      this.scheduledBeats.filter(
        (beat) =>
          beat.time >= cutoff,
      );
  }

  completePlayback() {
    this.scheduler?.stop();

    this.clearVisualTimers();

    this.scheduledBeats = [];

    this.resetPosition();

    this.setState("stopped");
  }

  failPlayback(error) {
    this.scheduler?.stop();

    this.clearVisualTimers();

    this.cancelFutureClicks(
      this.context?.currentTime ?? 0,
    );

    this.resetPosition();

    this.setState("stopped");

    this.callbacks.onError?.(
      error,
    );
  }

  resetPosition() {
    this.cursor =
      createInitialCursor();

    this.nextBeatTime = 0;

    this.pendingCompletionTime =
      null;

    this.callbacks
      .onPositionReset?.();
  }

  setState(nextState) {
    if (
      this.transportState ===
      nextState
    ) {
      return;
    }

    this.transportState =
      nextState;

    this.callbacks
      .onStateChange?.(
        nextState,
      );
  }

  assertNotDestroyed() {
    if (this.destroyed) {
      throw new Error(
        "This audio engine has already been destroyed.",
      );
    }
  }
}