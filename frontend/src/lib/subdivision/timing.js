export function quarterDurationSeconds(
  bpm,
) {
  return 60 / bpm;
}

export function pulseDurationSeconds(
  bpm,
  denominator,
) {
  return (
    quarterDurationSeconds(bpm) *
    (4 / denominator)
  );
}

export function subdivisionDurationSeconds(
  bpm,
  denominator,
  subdivision,
) {
  return (
    pulseDurationSeconds(
      bpm,
      denominator,
    ) / subdivision
  );
}

export function createInitialSubdivisionCursor() {
  return {
    stepIndex: 0,
    barIndex: 0,
    beatIndex: 0,
    subdivisionIndex: 0,
    cycleIndex: 0,
  };
}

export function advanceSubdivisionCursor(
  meter,
  steps,
  cursor,
  loopSettings,
) {
  if (steps.length === 0) {
    return {
      done: true,

      cursor:
        createInitialSubdivisionCursor(),
    };
  }

  const step =
    steps[cursor.stepIndex];

  if (!step) {
    return {
      done: true,

      cursor:
        createInitialSubdivisionCursor(),
    };
  }

  // Move inside current beat.
  if (
    cursor.subdivisionIndex + 1 <
    step.subdivision
  ) {
    return {
      done: false,

      cursor: {
        ...cursor,

        subdivisionIndex:
          cursor.subdivisionIndex +
          1,
      },
    };
  }

  // Move to next beat.
  if (
    cursor.beatIndex + 1 <
    meter.numerator
  ) {
    return {
      done: false,

      cursor: {
        ...cursor,

        beatIndex:
          cursor.beatIndex + 1,

        subdivisionIndex: 0,
      },
    };
  }

  // Move to next bar within
  // current ladder step.
  if (
    cursor.barIndex + 1 <
    step.bars
  ) {
    return {
      done: false,

      cursor: {
        ...cursor,

        barIndex:
          cursor.barIndex + 1,

        beatIndex: 0,
        subdivisionIndex: 0,
      },
    };
  }

  // Move to next ladder step.
  if (
    cursor.stepIndex + 1 <
    steps.length
  ) {
    return {
      done: false,

      cursor: {
        ...cursor,

        stepIndex:
          cursor.stepIndex + 1,

        barIndex: 0,
        beatIndex: 0,
        subdivisionIndex: 0,
      },
    };
  }

  const nextCycleIndex =
    cursor.cycleIndex + 1;

  const fixedComplete =
    loopSettings.mode ===
      "fixed" &&
    nextCycleIndex >=
      loopSettings.cycles;

  if (fixedComplete) {
    return {
      done: true,

      cursor:
        createInitialSubdivisionCursor(),
    };
  }

  return {
    done: false,

    cursor: {
      stepIndex: 0,
      barIndex: 0,
      beatIndex: 0,
      subdivisionIndex: 0,

      cycleIndex:
        nextCycleIndex,
    },
  };
}