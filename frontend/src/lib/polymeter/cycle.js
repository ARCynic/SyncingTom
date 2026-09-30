function assertPositiveInteger(
  value,
  label,
) {
  if (
    !Number.isInteger(value) ||
    value <= 0
  ) {
    throw new Error(
      `${label} must be a positive integer.`,
    );
  }
}

export function greatestCommonDivisor(
  first,
  second,
) {
  assertPositiveInteger(
    first,
    "First number",
  );

  assertPositiveInteger(
    second,
    "Second number",
  );

  let a = first;
  let b = second;

  while (b !== 0) {
    const remainder =
      a % b;

    a = b;
    b = remainder;
  }

  return a;
}

export function leastCommonMultiple(
  first,
  second,
) {
  assertPositiveInteger(
    first,
    "First number",
  );

  assertPositiveInteger(
    second,
    "Second number",
  );

  return Math.abs(
    (first /
      greatestCommonDivisor(
        first,
        second,
      )) *
      second,
  );
}

export function getLaneLength(
  lane,
) {
  const length =
    lane?.pattern?.length;

  assertPositiveInteger(
    length,
    "Lane pattern length",
  );

  return length;
}

export function getPolymeterCycleLength(
  lanes,
) {
  if (
    !Array.isArray(lanes) ||
    lanes.length === 0
  ) {
    return 0;
  }

  return lanes
    .map(getLaneLength)
    .reduce(
      (
        currentCycle,
        laneLength,
      ) =>
        leastCommonMultiple(
          currentCycle,
          laneLength,
        ),
      1,
    );
}

export function getLaneStepIndex(
  globalStep,
  lane,
) {
  if (
    !Number.isInteger(
      globalStep,
    ) ||
    globalStep < 0
  ) {
    throw new Error(
      "Global step must be a non-negative integer.",
    );
  }

  return (
    globalStep %
    getLaneLength(lane)
  );
}