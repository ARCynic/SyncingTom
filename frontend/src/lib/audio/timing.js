import { MAX_BPM, MIN_BPM } from "../meter/sequence.js";

export function clampBpm(value) {
  if (!Number.isFinite(value)) {
    return 100;
  }

  return Math.min(MAX_BPM, Math.max(MIN_BPM, value));
}

export function quarterNoteDurationSeconds(bpm) {
  return 60 / clampBpm(bpm);
}

export function beatDurationSeconds(bpm, denominator) {
  return quarterNoteDurationSeconds(bpm) * (4 / denominator);
}

export function createInitialCursor() {
  return {
    sequenceIndex: 0,
    repetitionIndex: 0,
    beatIndex: 0,
    cycleIndex: 0,
  };
}

export function advanceCursor(sequence, cursor, loopSettings) {
  if (sequence.length === 0) {
    return {
      done: true,
      cursor: createInitialCursor(),
    };
  }

  const currentItem = sequence[cursor.sequenceIndex];

  if (!currentItem) {
    return {
      done: true,
      cursor: createInitialCursor(),
    };
  }

  if (cursor.beatIndex + 1 < currentItem.meter.numerator) {
    return {
      done: false,
      cursor: {
        ...cursor,
        beatIndex: cursor.beatIndex + 1,
      },
    };
  }

  if (cursor.repetitionIndex + 1 < currentItem.repetitions) {
    return {
      done: false,
      cursor: {
        ...cursor,
        repetitionIndex: cursor.repetitionIndex + 1,
        beatIndex: 0,
      },
    };
  }

  if (cursor.sequenceIndex + 1 < sequence.length) {
    return {
      done: false,
      cursor: {
        ...cursor,
        sequenceIndex: cursor.sequenceIndex + 1,
        repetitionIndex: 0,
        beatIndex: 0,
      },
    };
  }

  const nextCycleIndex = cursor.cycleIndex + 1;

  const fixedLoopComplete =
    loopSettings.mode === "fixed" &&
    nextCycleIndex >= loopSettings.cycles;

  if (fixedLoopComplete) {
    return {
      done: true,
      cursor: createInitialCursor(),
    };
  }

  return {
    done: false,
    cursor: {
      sequenceIndex: 0,
      repetitionIndex: 0,
      beatIndex: 0,
      cycleIndex: nextCycleIndex,
    },
  };
}

export function validatePlaybackConfig(sequence, bpm, loopSettings) {
  if (sequence.length === 0) {
    throw new Error("The meter sequence must contain at least one meter.");
  }

  if (!Number.isFinite(bpm) || bpm < MIN_BPM || bpm > MAX_BPM) {
    throw new Error(`BPM must be between ${MIN_BPM} and ${MAX_BPM}.`);
  }

  if (
    loopSettings.mode === "fixed" &&
    (!Number.isInteger(loopSettings.cycles) ||
      loopSettings.cycles < 1 ||
      loopSettings.cycles > 999)
  ) {
    throw new Error("Fixed cycles must be an integer between 1 and 999.");
  }

  for (const item of sequence) {
    const { numerator, denominator } = item.meter;

    if (
      !Number.isInteger(numerator) ||
      numerator < 1 ||
      numerator > 32
    ) {
      throw new Error(
        "Meter numerators must be integers between 1 and 32.",
      );
    }

    if (![2, 4, 8, 16].includes(denominator)) {
      throw new Error("Meter denominator must be 2, 4, 8, or 16.");
    }

    if (!Number.isInteger(item.repetitions) || item.repetitions < 1) {
      throw new Error("Meter repetitions must be positive integers.");
    }
  }
}
