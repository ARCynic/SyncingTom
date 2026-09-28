import type { LoopSettings, MeterSequenceItem } from "@/types/music";
import { ClickSynth } from "./ClickSynth";
import { Scheduler } from "./Scheduler";
import {
  advanceCursor,
  beatDurationSeconds,
  createInitialCursor,
  validatePlaybackConfig,
} from "./timing";
import type {
  AudioEngineCallbacks,
  AudioEngineConfig,
  PlaybackCursor,
  ScheduledBeat,
  TransportState,
} from "./types";

const START_DELAY_SECONDS = 0.05;
const EVENT_HISTORY_SECONDS = 0.25;

function cloneSequence(sequence: MeterSequenceItem[]): MeterSequenceItem[] {
  return sequence.map((item) => ({
    repetitions: item.repetitions,
    meter: {
      numerator: item.meter.numerator,
      denominator: item.meter.denominator,
      grouping: item.meter.grouping ? [...item.meter.grouping] : undefined,
    },
  }));
}

function cloneLoopSettings(loopSettings: LoopSettings): LoopSettings {
  return { ...loopSettings };
}

function sequencesEqual(a: MeterSequenceItem[], b: MeterSequenceItem[]): boolean {
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

function loopSettingsEqual(a: LoopSettings, b: LoopSettings): boolean {
  return a.mode === b.mode && a.cycles === b.cycles;
}

export class AudioEngine {
  private context: AudioContext | null = null;
  private synth: ClickSynth | null = null;
  private scheduler: Scheduler | null = null;

  private config: AudioEngineConfig;
  private callbacks: AudioEngineCallbacks;
  private transportState: TransportState = "stopped";

  private cursor: PlaybackCursor = createInitialCursor();
  private nextBeatTime = 0;
  private pendingCompletionTime: number | null = null;
  private scheduledBeats: ScheduledBeat[] = [];
  private nextScheduledBeatId = 1;

  private masterVolume = 0.7;
  private accentLevel = 0.9;
  private destroyed = false;

  constructor(config: AudioEngineConfig, callbacks: AudioEngineCallbacks = {}) {
    validatePlaybackConfig(config.sequence, config.bpm, config.loopSettings);

    this.config = {
      sequence: cloneSequence(config.sequence),
      bpm: config.bpm,
      loopSettings: cloneLoopSettings(config.loopSettings),
    };
    this.callbacks = callbacks;
  }

  getState(): TransportState {
    return this.transportState;
  }

  setCallbacks(callbacks: AudioEngineCallbacks): void {
    this.callbacks = callbacks;
  }

  setConfig(config: AudioEngineConfig): void {
    validatePlaybackConfig(config.sequence, config.bpm, config.loopSettings);

    const sequenceChanged = !sequencesEqual(this.config.sequence, config.sequence);
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

  setMasterVolume(value: number): void {
    this.masterVolume = Math.min(1, Math.max(0, value));
    this.synth?.setMasterVolume(this.masterVolume);
  }

  setAccentLevel(value: number): void {
    this.accentLevel = Math.min(1, Math.max(0, value));
    this.synth?.setAccentLevel(this.accentLevel);
  }

  async play(): Promise<void> {
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
        error instanceof Error ? error : new Error("Unable to start audio playback.");
      this.callbacks.onError?.(normalized);
      throw normalized;
    }
  }

  pause(): void {
    if (this.transportState !== "playing" || !this.context) {
      return;
    }

    this.scheduler?.stop();
    this.rewindToFirstCancelledBeat(this.context.currentTime);
    this.pendingCompletionTime = null;
    this.setState("paused");
  }

  stop(): void {
    if (this.destroyed) {
      return;
    }

    this.scheduler?.stop();
    this.cancelFutureClicks(this.context?.currentTime ?? 0);
    this.resetPosition();
    this.setState("stopped");
  }

  async restart(): Promise<void> {
    this.assertNotDestroyed();

    this.scheduler?.stop();
    this.cancelFutureClicks(this.context?.currentTime ?? 0);
    this.resetPosition();
    this.setState("stopped");
    await this.play();
  }

  async destroy(): Promise<void> {
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
        // Closing can fail during page teardown; there is nothing else to do.
      }
    }
  }

  private async ensureAudioContext(): Promise<AudioContext> {
    if (this.context) {
      return this.context;
    }

    if (typeof window === "undefined") {
      throw new Error("Web Audio is only available in the browser.");
    }

    const AudioContextConstructor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextConstructor) {
      throw new Error("This browser does not support the Web Audio API.");
    }

    const context = new AudioContextConstructor();
    const synth = new ClickSynth(
      context,
      this.masterVolume,
      this.accentLevel,
    );
    const scheduler = new Scheduler(context, this.scheduleUntil);

    this.context = context;
    this.synth = synth;
    this.scheduler = scheduler;

    return context;
  }

  private scheduleUntil = (scheduleUntil: number): void => {
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
        this.failPlayback(new Error("Playback position is outside the meter sequence."));
        return;
      }

      const scheduledCursor = { ...this.cursor };
      const isBarAccent = scheduledCursor.beatIndex === 0;
      const handle = synth.scheduleClick(this.nextBeatTime, isBarAccent);

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
        this.pendingCompletionTime = this.scheduledBeats.at(-1)!.time + 0.06;
        break;
      }

      this.cursor = advanceResult.cursor;
    }
  };

  private rewindToFirstCancelledBeat(now: number): void {
    const futureBeats = this.scheduledBeats
      .filter((beat) => beat.time > now)
      .sort((a, b) => a.time - b.time);

    if (futureBeats.length > 0) {
      this.cursor = { ...futureBeats[0].cursor };
    }

    for (const beat of futureBeats) {
      beat.handle.cancel(now);
    }

    this.scheduledBeats = this.scheduledBeats.filter((beat) => beat.time <= now);
  }

  private cancelFutureClicks(now: number): void {
    for (const beat of this.scheduledBeats) {
      if (beat.time > now) {
        beat.handle.cancel(now);
      }
    }

    this.scheduledBeats = [];
  }

  private removeOldScheduledBeats(now: number): void {
    const cutoff = now - EVENT_HISTORY_SECONDS;
    this.scheduledBeats = this.scheduledBeats.filter((beat) => beat.time >= cutoff);
  }

  private completePlayback(): void {
    this.scheduler?.stop();
    this.scheduledBeats = [];
    this.resetPosition();
    this.setState("stopped");
  }

  private failPlayback(error: Error): void {
    this.scheduler?.stop();
    this.cancelFutureClicks(this.context?.currentTime ?? 0);
    this.resetPosition();
    this.setState("stopped");
    this.callbacks.onError?.(error);
  }

  private resetPosition(): void {
    this.cursor = createInitialCursor();
    this.nextBeatTime = 0;
    this.pendingCompletionTime = null;
  }

  private setState(nextState: TransportState): void {
    if (this.transportState === nextState) {
      return;
    }

    this.transportState = nextState;
    this.callbacks.onStateChange?.(nextState);
  }

  private assertNotDestroyed(): void {
    if (this.destroyed) {
      throw new Error("This audio engine has already been destroyed.");
    }
  }
}
