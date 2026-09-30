export const MIN_PATTERN_LENGTH =
  2;

export const MAX_PATTERN_LENGTH =
  12;

export function clampPatternLength(
  value,
) {
  const numeric =
    Number(value);

  if (
    !Number.isFinite(numeric)
  ) {
    return MIN_PATTERN_LENGTH;
  }

  return Math.min(
    MAX_PATTERN_LENGTH,
    Math.max(
      MIN_PATTERN_LENGTH,
      Math.round(numeric),
    ),
  );
}

export function resizePattern(
  pattern,
  nextLength,
) {
  const safeLength =
    clampPatternLength(
      nextLength,
    );

  const currentPattern =
    Array.isArray(pattern)
      ? pattern
      : [];

  return Array.from(
    {
      length:
        safeLength,
    },
    (_, index) =>
      Boolean(
        currentPattern[index],
      ),
  );
}

export function togglePatternStep(
  pattern,
  stepIndex,
) {
  if (
    !Array.isArray(pattern)
  ) {
    throw new Error(
      "Pattern must be an array.",
    );
  }

  if (
    !Number.isInteger(
      stepIndex,
    ) ||
    stepIndex < 0 ||
    stepIndex >=
      pattern.length
  ) {
    throw new Error(
      "Invalid pattern step.",
    );
  }

  return pattern.map(
    (
      isActive,
      index,
    ) =>
      index === stepIndex
        ? !isActive
        : isActive,
  );
}

export function createDefaultPolymeterLanes() {
  return [
    {
      id: "lane-1",
      instrumentId:
        "kick",
      pattern: [
        true,
        false,
        false,
      ],
      muted: false,
    },

    {
      id: "lane-2",
      instrumentId:
        "snare",
      pattern: [
        false,
        true,
        false,
        true,
      ],
      muted: false,
    },

    {
      id: "lane-3",
      instrumentId:
        "hihat",
      pattern: [
        true,
        false,
        true,
        false,
        true,
      ],
      muted: false,
    },
  ];
}