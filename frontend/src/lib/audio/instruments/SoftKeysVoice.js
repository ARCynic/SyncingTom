const MIN_GAIN = 0.0001;

const DEFAULT_VOLUME = 0.45;

const ATTACK_SECONDS = 0.008;
const DECAY_SECONDS = 0.11;
const RELEASE_SECONDS = 0.2;

const SUSTAIN_LEVEL = 0.34;

const FUNDAMENTAL_LEVEL = 0.9;
const OVERTONE_LEVEL = 0.12;

function clampUnit(value) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(
    1,
    Math.max(0, value),
  );
}

function assertFrequency(
  context,
  frequency,
) {
  const nyquist =
    context.sampleRate / 2;

  const maxFrequency =
    Math.min(
      20000,
      nyquist * 0.95,
    );

  if (
    !Number.isFinite(
      frequency,
    ) ||
    frequency <= 0 ||
    frequency >
      maxFrequency
  ) {
    throw new Error(
      `Frequency must be between 0 and ${maxFrequency.toFixed(
        0,
      )} Hz.`,
    );
  }
}

function assertDuration(
  duration,
) {
  if (
    !Number.isFinite(
      duration,
    ) ||
    duration <= 0
  ) {
    throw new Error(
      "Note duration must be a positive number.",
    );
  }
}

export class SoftKeysVoice {
  constructor(
    context,
    options = {},
  ) {
    if (!context) {
      throw new Error(
        "SoftKeysVoice requires an AudioContext.",
      );
    }

    this.context =
      context;

    this.disposed =
      false;

    this.activeNotes =
      new Set();

    const destination =
      options.destination ??
      context.destination;

    const volume =
      options.volume ??
      DEFAULT_VOLUME;

    this.output =
      context.createGain();

    this.output.gain.value =
      clampUnit(volume);

    this.output.connect(
      destination,
    );
  }

  setVolume(value) {
    this.assertNotDisposed();

    const now =
      this.context.currentTime;

    const nextValue =
      clampUnit(value);

    this.output.gain
      .cancelScheduledValues(
        now,
      );

    this.output.gain
      .setTargetAtTime(
        nextValue,
        now,
        0.01,
      );
  }

  scheduleNote({
    frequency,
    when =
      this.context.currentTime,
    duration = 0.65,
    velocity = 0.8,
  }) {
    this.assertNotDisposed();

    assertFrequency(
      this.context,
      frequency,
    );

    assertDuration(
      duration,
    );

    if (
      !Number.isFinite(when)
    ) {
      throw new Error(
        "Note start time must be a finite number.",
      );
    }

    const context =
      this.context;

    const startTime =
      Math.max(
        when,
        context.currentTime +
          0.001,
      );

    const safeVelocity =
      Math.max(
        MIN_GAIN,
        clampUnit(
          velocity,
        ),
      );

    const attackEnd =
      startTime +
      ATTACK_SECONDS;

    const decayEnd =
      attackEnd +
      DECAY_SECONDS;

    const releaseStart =
      Math.max(
        decayEnd,
        startTime +
          duration,
      );

    const endTime =
      releaseStart +
      RELEASE_SECONDS;

    /*
     * Oscillator 1:
     * fundamental
     */
    const fundamental =
      context.createOscillator();

    fundamental.type =
      "sine";

    fundamental.frequency
      .setValueAtTime(
        frequency,
        startTime,
      );

    const fundamentalGain =
      context.createGain();

    fundamentalGain.gain
      .setValueAtTime(
        FUNDAMENTAL_LEVEL,
        startTime,
      );

    /*
     * Oscillator 2:
     * quieter harmonic.
     */
    const overtone =
      context.createOscillator();

    overtone.type =
      "triangle";

    const maxOvertone =
      context.sampleRate *
      0.45;

    overtone.frequency
      .setValueAtTime(
        Math.min(
          frequency * 2,
          maxOvertone,
        ),
        startTime,
      );

    const overtoneGain =
      context.createGain();

    overtoneGain.gain
      .setValueAtTime(
        OVERTONE_LEVEL,
        startTime,
      );

    /*
     * Gentle low-pass filter
     * softens the oscillator sound.
     */
    const filter =
      context.createBiquadFilter();

    filter.type =
      "lowpass";

    filter.frequency
      .setValueAtTime(
        Math.min(
          7000,
          Math.max(
            1800,
            frequency * 8,
          ),
        ),
        startTime,
      );

    filter.Q
      .setValueAtTime(
        0.7,
        startTime,
      );

    /*
     * Amplitude envelope.
     */
    const envelope =
      context.createGain();

    const peak =
      safeVelocity;

    const sustain =
      Math.max(
        MIN_GAIN,
        peak *
          SUSTAIN_LEVEL,
      );

    envelope.gain
      .setValueAtTime(
        MIN_GAIN,
        startTime,
      );

    envelope.gain
      .exponentialRampToValueAtTime(
        peak,
        attackEnd,
      );

    envelope.gain
      .exponentialRampToValueAtTime(
        sustain,
        decayEnd,
      );

    envelope.gain
      .setValueAtTime(
        sustain,
        releaseStart,
      );

    envelope.gain
      .exponentialRampToValueAtTime(
        MIN_GAIN,
        endTime,
      );

    /*
     * Audio graph.
     */
    fundamental.connect(
      fundamentalGain,
    );

    overtone.connect(
      overtoneGain,
    );

    fundamentalGain.connect(
      filter,
    );

    overtoneGain.connect(
      filter,
    );

    filter.connect(
      envelope,
    );

    envelope.connect(
      this.output,
    );

    fundamental.start(
      startTime,
    );

    overtone.start(
      startTime,
    );

    fundamental.stop(
      endTime + 0.02,
    );

    overtone.stop(
      endTime + 0.02,
    );

    let cancelled =
      false;

    let disconnected =
      false;

    const noteHandle = {
      cancel: (
        cancelAt =
          context.currentTime,
      ) => {
        if (
          cancelled ||
          disconnected
        ) {
          return;
        }

        cancelled =
          true;

        const safeCancelTime =
          Math.max(
            cancelAt,
            context.currentTime,
          );

        envelope.gain
          .cancelScheduledValues(
            safeCancelTime,
          );

        envelope.gain
          .setTargetAtTime(
            MIN_GAIN,
            safeCancelTime,
            0.012,
          );

        const stopTime =
          safeCancelTime +
          0.06;

        try {
          fundamental.stop(
            stopTime,
          );
        } catch {
          // It may already be stopped.
        }

        try {
          overtone.stop(
            stopTime,
          );
        } catch {
          // It may already be stopped.
        }
      },
    };

    const disconnect =
      () => {
        if (disconnected) {
          return;
        }

        disconnected =
          true;

        this.activeNotes.delete(
          noteHandle,
        );

        const nodes = [
          fundamental,
          overtone,
          fundamentalGain,
          overtoneGain,
          filter,
          envelope,
        ];

        for (
          const node of nodes
        ) {
          try {
            node.disconnect();
          } catch {
            // Already disconnected.
          }
        }
      };

    fundamental.addEventListener(
      "ended",
      disconnect,
      {
        once: true,
      },
    );

    this.activeNotes.add(
      noteHandle,
    );

    return noteHandle;
  }

  stopAll(
    when =
      this.context.currentTime,
  ) {
    if (this.disposed) {
      return;
    }

    for (
      const note of [
        ...this.activeNotes,
      ]
    ) {
      note.cancel(
        when,
      );
    }
  }

  dispose() {
    if (this.disposed) {
      return;
    }

    this.stopAll(
      this.context.currentTime,
    );

    this.disposed =
      true;

    this.activeNotes.clear();

    try {
      this.output.disconnect();
    } catch {
      // Already disconnected.
    }
  }

  assertNotDisposed() {
    if (this.disposed) {
      throw new Error(
        "SoftKeysVoice has already been disposed.",
      );
    }
  }
}