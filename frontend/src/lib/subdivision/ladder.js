export const MIN_BPM = 30;
export const MAX_BPM = 300;

export const MIN_NUMERATOR = 1;
export const MAX_NUMERATOR = 32;

export const MIN_SUBDIVISION = 1;
export const MAX_SUBDIVISION = 16;

export const MIN_STEP_BARS = 1;
export const MAX_STEP_BARS = 64;

export const MIN_CYCLES = 1;
export const MAX_CYCLES = 999;

export const SUPPORTED_DENOMINATORS = [
  2,
  4,
  8,
  16,
];

export const SUBDIVISION_OPTIONS =
  Array.from(
    {
      length:
        MAX_SUBDIVISION -
        MIN_SUBDIVISION +
        1,
    },
    (_, index) =>
      index + MIN_SUBDIVISION,
  );

let stepIdCounter = 0;

function createStepId() {
  stepIdCounter += 1;

  return `subdivision-step-${stepIdCounter}`;
}

export function clampInteger(
  value,
  min,
  max,
) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return min;
  }

  return Math.min(
    max,
    Math.max(
      min,
      Math.round(number),
    ),
  );
}

export function createLadderStep(
  subdivision = 1,
  bars = 1,
) {
  return {
    id: createStepId(),

    subdivision:
      clampInteger(
        subdivision,
        MIN_SUBDIVISION,
        MAX_SUBDIVISION,
      ),

    bars:
      clampInteger(
        bars,
        MIN_STEP_BARS,
        MAX_STEP_BARS,
      ),
  };
}

export function createDefaultLadder() {
  return [
    createLadderStep(1, 1),
    createLadderStep(2, 1),
    createLadderStep(3, 1),
    createLadderStep(4, 1),
    createLadderStep(5, 1),
    createLadderStep(6, 1),
    createLadderStep(8, 1),
  ];
}

export function createDefaultMeter() {
  return {
    numerator: 4,
    denominator: 4,
  };
}

export function moveLadderStep(
  steps,
  fromIndex,
  toIndex,
) {
  if (
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= steps.length ||
    toIndex >= steps.length ||
    fromIndex === toIndex
  ) {
    return steps;
  }

  const copy = [...steps];

  const [step] =
    copy.splice(fromIndex, 1);

  copy.splice(
    toIndex,
    0,
    step,
  );

  return copy;
}

export function countLadderBars(
  steps,
) {
  return steps.reduce(
    (total, step) =>
      total + step.bars,
    0,
  );
}

export function countLadderClicks(
  meter,
  steps,
) {
  return steps.reduce(
    (total, step) =>
      total +
      meter.numerator *
        step.subdivision *
        step.bars,
    0,
  );
}

export function beatDurationSeconds(
  bpm,
  denominator,
) {
  const quarter =
    60 / bpm;

  return (
    quarter *
    (4 / denominator)
  );
}

export function ladderCycleDurationSeconds(
  meter,
  steps,
  bpm,
) {
  const beatDuration =
    beatDurationSeconds(
      bpm,
      meter.denominator,
    );

  return (
    countLadderBars(steps) *
    meter.numerator *
    beatDuration
  );
}

const NOTE_NAMES = {
  1: "Whole notes",
  2: "Half notes",
  4: "Quarter notes",
  8: "Eighth notes",
  16: "Sixteenth notes",
  32: "32nd notes",
  64: "64th notes",
  128: "128th notes",
};

const TUPLET_NAMES = {
  3: "Triplets",
  5: "Quintuplets",
  6: "Sextuplets",
  7: "Septuplets",
  9: "Nonuplets",
  10: "Decuplets",
  11: "11-tuplets",
  12: "12-tuplets",
  13: "13-tuplets",
  14: "14-tuplets",
  15: "15-tuplets",
};

function isPowerOfTwo(value) {
  return (
    value > 0 &&
    (value & (value - 1)) === 0
  );
}

export function subdivisionName(
  subdivision,
  denominator = 4,
) {
  if (subdivision === 1) {
    return (
      NOTE_NAMES[denominator] ??
      "One per beat"
    );
  }

  if (
    isPowerOfTwo(subdivision)
  ) {
    const resultingDenominator =
      denominator *
      subdivision;

    return (
      NOTE_NAMES[
        resultingDenominator
      ] ??
      `${subdivision} per beat`
    );
  }

  if (subdivision === 3) {
    const tripletBase =
      NOTE_NAMES[
        denominator * 2
      ];

    if (tripletBase) {
      return `${tripletBase.replace(
        " notes",
        "",
      )}-note triplets`;
    }
  }

  return (
    TUPLET_NAMES[subdivision] ??
    `${subdivision}-tuplets`
  );
}

export function formatLadder(
  steps,
) {
  return steps
    .map(
      (step) =>
        `${step.subdivision}${
          step.bars > 1
            ? ` ×${step.bars}`
            : ""
        }`,
    )
    .join(" → ");
}

export function validateSubdivisionConfig({
  meter,
  bpm,
  steps,
  loopSettings,
}) {
  if (
    !Number.isInteger(
      meter.numerator,
    ) ||
    meter.numerator <
      MIN_NUMERATOR ||
    meter.numerator >
      MAX_NUMERATOR
  ) {
    throw new Error(
      `Meter numerator must be between ${MIN_NUMERATOR} and ${MAX_NUMERATOR}.`,
    );
  }

  if (
    !SUPPORTED_DENOMINATORS.includes(
      meter.denominator,
    )
  ) {
    throw new Error(
      "Meter denominator must be 2, 4, 8, or 16.",
    );
  }

  if (
    !Number.isFinite(bpm) ||
    bpm < MIN_BPM ||
    bpm > MAX_BPM
  ) {
    throw new Error(
      `BPM must be between ${MIN_BPM} and ${MAX_BPM}.`,
    );
  }

  if (
    !Array.isArray(steps) ||
    steps.length === 0
  ) {
    throw new Error(
      "The subdivision ladder must contain at least one step.",
    );
  }

  for (const step of steps) {
    if (
      !Number.isInteger(
        step.subdivision,
      ) ||
      step.subdivision <
        MIN_SUBDIVISION ||
      step.subdivision >
        MAX_SUBDIVISION
    ) {
      throw new Error(
        `Subdivision must be between ${MIN_SUBDIVISION} and ${MAX_SUBDIVISION}.`,
      );
    }

    if (
      !Number.isInteger(
        step.bars,
      ) ||
      step.bars <
        MIN_STEP_BARS ||
      step.bars >
        MAX_STEP_BARS
    ) {
      throw new Error(
        `Bars per step must be between ${MIN_STEP_BARS} and ${MAX_STEP_BARS}.`,
      );
    }
  }

  if (
    loopSettings.mode ===
      "fixed" &&
    (
      !Number.isInteger(
        loopSettings.cycles,
      ) ||
      loopSettings.cycles <
        MIN_CYCLES ||
      loopSettings.cycles >
        MAX_CYCLES
    )
  ) {
    throw new Error(
      `Cycles must be between ${MIN_CYCLES} and ${MAX_CYCLES}.`,
    );
  }
}