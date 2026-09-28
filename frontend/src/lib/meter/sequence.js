export const SUPPORTED_DENOMINATORS = [2, 4, 8, 16];

export const MIN_NUMERATOR = 1;
export const MAX_NUMERATOR = 32;

export const MIN_REPETITIONS = 1;
export const MAX_REPETITIONS = 999;

export const MIN_BPM = 30;
export const MAX_BPM = 300;

let itemCounter = 0;

function createItemId() {
  itemCounter += 1;
  return `meter-${itemCounter}`;
}

export function clampInteger(value, min, max) {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(max, Math.max(min, Math.round(value)));
}

export function createMeterItem(
  numerator = 4,
  denominator = 4,
  repetitions = 1,
) {
  return {
    id: createItemId(),
    meter: {
      numerator: clampInteger(numerator, MIN_NUMERATOR, MAX_NUMERATOR),
      denominator,
    },
    repetitions: clampInteger(
      repetitions,
      MIN_REPETITIONS,
      MAX_REPETITIONS,
    ),
  };
}

export function createDefaultSequence() {
  return [
    createMeterItem(5, 4),
    createMeterItem(7, 4),
    createMeterItem(4, 4),
  ];
}

export function formatMeterItem(item) {
  const meter = `${item.meter.numerator}/${item.meter.denominator}`;

  return item.repetitions > 1
    ? `${meter}x${item.repetitions}`
    : meter;
}

export function formatMeterSequence(sequence) {
  return sequence.map(formatMeterItem).join(", ");
}

export function formatMeterSequenceDisplay(sequence) {
  return sequence
    .map((item) => {
      const meter = `${item.meter.numerator}/${item.meter.denominator}`;

      return item.repetitions > 1
        ? `${meter} ×${item.repetitions}`
        : meter;
    })
    .join(" → ");
}

export function countBars(sequence) {
  return sequence.reduce(
    (total, item) => total + item.repetitions,
    0,
  );
}

export function quarterNoteEquivalentBeats(sequence) {
  return sequence.reduce((total, item) => {
    const quarterNotesPerBeat = 4 / item.meter.denominator;
    const quarterNotesPerBar =
      item.meter.numerator * quarterNotesPerBeat;

    return total + quarterNotesPerBar * item.repetitions;
  }, 0);
}

export function cycleDurationSeconds(sequence, bpm) {
  const safeBpm = clampInteger(bpm, MIN_BPM, MAX_BPM);
  const quarterDuration = 60 / safeBpm;

  return quarterNoteEquivalentBeats(sequence) * quarterDuration;
}

export function moveSequenceItem(sequence, fromIndex, toIndex) {
  if (
    fromIndex < 0 ||
    fromIndex >= sequence.length ||
    toIndex < 0 ||
    toIndex >= sequence.length ||
    fromIndex === toIndex
  ) {
    return sequence;
  }

  const next = [...sequence];
  const [item] = next.splice(fromIndex, 1);

  if (!item) {
    return sequence;
  }

  next.splice(toIndex, 0, item);

  return next;
}
