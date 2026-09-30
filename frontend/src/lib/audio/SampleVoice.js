const MIN_GAIN =
  0.0001;

function clampUnit(
  value,
) {
  if (
    !Number.isFinite(value)
  ) {
    return 0;
  }

  return Math.min(
    1,
    Math.max(
      0,
      value,
    ),
  );
}

export class SampleVoice {
  constructor(
    context,
    {
      destination =
        context?.destination,

      volume = 0.85,
    } = {},
  ) {
    if (!context) {
      throw new Error(
        "SampleVoice requires an AudioContext.",
      );
    }

    this.context =
      context;

    this.buffers =
      new Map();

    this.activeNotes =
      new Set();

    this.disposed =
      false;

    this.output =
      context.createGain();

    this.output.gain.value =
      clampUnit(volume);

    this.output.connect(
      destination,
    );
  }

  setVolume(
    value,
  ) {
    this.assertNotDisposed();

    const now =
      this.context.currentTime;

    this.output.gain
      .cancelScheduledValues(
        now,
      );

    this.output.gain
      .setTargetAtTime(
        clampUnit(value),
        now,
        0.01,
      );
  }

  async loadSample(
    id,
    url,
  ) {
    this.assertNotDisposed();

    if (
      this.buffers.has(id)
    ) {
      return;
    }

    const response =
      await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Could not load "${id}" sample from ${url}. HTTP ${response.status}.`,
      );
    }

    const arrayBuffer =
      await response.arrayBuffer();

    const audioBuffer =
      await this.context
        .decodeAudioData(
          arrayBuffer,
        );

    this.buffers.set(
      id,
      audioBuffer,
    );
  }

  async loadSamples(
    instruments,
  ) {
    await Promise.all(
      instruments.map(
        (
          instrument,
        ) =>
          this.loadSample(
            instrument.id,
            instrument.sampleUrl,
          ),
      ),
    );
  }

  scheduleSample(
    sampleId,
    {
      when =
        this.context.currentTime,

      gain = 1,
    } = {},
  ) {
    this.assertNotDisposed();

    const buffer =
      this.buffers.get(
        sampleId,
      );

    if (!buffer) {
      throw new Error(
        `Sample "${sampleId}" has not been loaded.`,
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

    const source =
      context.createBufferSource();

    source.buffer =
      buffer;

    const noteGain =
      context.createGain();

    noteGain.gain.setValueAtTime(
      Math.max(
        MIN_GAIN,
        clampUnit(gain),
      ),
      startTime,
    );

    source.connect(
      noteGain,
    );

    noteGain.connect(
      this.output,
    );

    let finished =
      false;

    const handle = {
      cancel: (
        cancelAt =
          context.currentTime,
      ) => {
        if (finished) {
          return;
        }

        const stopTime =
          Math.max(
            cancelAt,
            startTime,
          );

        try {
          source.stop(
            stopTime,
          );
        } catch {
          // Source may already
          // have finished.
        }
      },
    };

    const cleanup = () => {
      if (finished) {
        return;
      }

      finished = true;

      this.activeNotes.delete(
        handle,
      );

      try {
        source.disconnect();
      } catch {
        // Already disconnected.
      }

      try {
        noteGain.disconnect();
      } catch {
        // Already disconnected.
      }
    };

    source.addEventListener(
      "ended",
      cleanup,
      {
        once: true,
      },
    );

    this.activeNotes.add(
      handle,
    );

    source.start(
      startTime,
    );

    return handle;
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
    this.buffers.clear();

    try {
      this.output.disconnect();
    } catch {
      // Already disconnected.
    }
  }

  assertNotDisposed() {
    if (this.disposed) {
      throw new Error(
        "SampleVoice has already been disposed.",
      );
    }
  }
}