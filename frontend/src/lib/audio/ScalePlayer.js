import {
  createScaleInstrument,
  DEFAULT_SCALE_INSTRUMENT_ID,
} from "./instruments/instrumentRegistry.js";

const START_DELAY_SECONDS =
  0.04;

const DEFAULT_NOTE_DURATION =
  0.42;

const DEFAULT_STEP_SECONDS =
  0.5;

const DEFAULT_VELOCITY =
  0.82;

const DEFAULT_VOLUME =
  0.45;

function assertFrequency(
  frequency,
) {
  if (
    !Number.isFinite(
      frequency,
    ) ||
    frequency <= 0
  ) {
    throw new Error(
      "Frequency must be a positive number.",
    );
  }
}

export class ScalePlayer {
  constructor(
    context,
    {
      instrumentId =
        DEFAULT_SCALE_INSTRUMENT_ID,

      volume =
        DEFAULT_VOLUME,
    } = {},
  ) {
    if (!context) {
      throw new Error(
        "ScalePlayer requires an AudioContext.",
      );
    }

    this.context =
      context;

    this.volume =
      volume;

    this.instrumentId =
      instrumentId;

    this.voice =
      createScaleInstrument(
        instrumentId,
        context,
        {
          volume,
        },
      );

    this.disposed =
      false;
  }

  setInstrument(
    instrumentId,
  ) {
    this.assertNotDisposed();

    if (
      instrumentId ===
      this.instrumentId
    ) {
      return;
    }

    this.voice.stopAll(
      this.context.currentTime,
    );

    this.voice.dispose();

    this.instrumentId =
      instrumentId;

    this.voice =
      createScaleInstrument(
        instrumentId,
        this.context,
        {
          volume:
            this.volume,
        },
      );
  }

  setVolume(value) {
    this.assertNotDisposed();

    this.volume =
      Math.min(
        1,
        Math.max(
          0,
          value,
        ),
      );

    this.voice.setVolume(
      this.volume,
    );
  }

  playNote(
    frequency,
    {
      duration =
        0.65,

      velocity =
        DEFAULT_VELOCITY,
    } = {},
  ) {
    this.assertNotDisposed();

    assertFrequency(
      frequency,
    );

    return this.voice.scheduleNote({
      frequency,

      when:
        this.context
          .currentTime +
        0.005,

      duration,

      velocity,
    });
  }

  playSequence(
    frequencies,
    {
      noteDuration =
        DEFAULT_NOTE_DURATION,

      stepSeconds =
        DEFAULT_STEP_SECONDS,

      velocity =
        DEFAULT_VELOCITY,
    } = {},
  ) {
    this.assertNotDisposed();

    if (
      !Array.isArray(
        frequencies,
      ) ||
      frequencies.length ===
        0
    ) {
      throw new Error(
        "A scale must contain at least one frequency.",
      );
    }

    this.stop();

    const startTime =
      this.context.currentTime +
      START_DELAY_SECONDS;

    const events =
      frequencies.map(
        (
          frequency,
          index,
        ) => {
          assertFrequency(
            frequency,
          );

          const time =
            startTime +
            index *
              stepSeconds;

          this.voice.scheduleNote({
            frequency,
            when: time,
            duration:
              noteDuration,
            velocity,
          });

          return {
            index,
            frequency,
            time,
            duration:
              noteDuration,
          };
        },
      );

    const lastEvent =
      events[
        events.length - 1
      ];

    const endTime =
      lastEvent.time +
      noteDuration +
      0.25;

    return {
      startTime,
      endTime,

      durationSeconds:
        endTime -
        this.context
          .currentTime,

      events,
    };
  }

  stop() {
    if (this.disposed) {
      return;
    }

    this.voice.stopAll(
      this.context.currentTime,
    );
  }

  dispose() {
    if (this.disposed) {
      return;
    }

    this.stop();

    this.voice.dispose();

    this.disposed =
      true;
  }

  assertNotDisposed() {
    if (this.disposed) {
      throw new Error(
        "ScalePlayer has already been disposed.",
      );
    }
  }
}