const LETTERS = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
];

const NATURAL_PITCH_CLASSES = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

export const ROOT_OPTIONS = [
  "C",
  "C#",
  "Db",
  "D",
  "D#",
  "Eb",
  "E",
  "F",
  "F#",
  "Gb",
  "G",
  "G#",
  "Ab",
  "A",
  "A#",
  "Bb",
  "B",
];

export function mod(value, modulus) {
  return ((value % modulus) + modulus) % modulus;
}

function accidentalOffset(accidental = "") {
  let offset = 0;

  for (const symbol of accidental) {
    if (symbol === "#" || symbol === "♯") {
      offset += 1;
    }

    if (symbol === "b" || symbol === "♭") {
      offset -= 1;
    }
  }

  return offset;
}

export function parseNoteName(note) {
  const normalized = String(note)
    .trim()
    .replaceAll("♯", "#")
    .replaceAll("♭", "b");

  const match = normalized.match(/^([A-Ga-g])([#b]*)$/);

  if (!match) {
    throw new Error(`Invalid note name: ${note}`);
  }

  const letter = match[1].toUpperCase();
  const accidental = match[2] ?? "";

  const naturalPitchClass =
    NATURAL_PITCH_CLASSES[letter];

  const pitchClass = mod(
    naturalPitchClass +
      accidentalOffset(accidental),
    12,
  );

  return {
    letter,
    accidental,
    pitchClass,
  };
}

export function displayNoteName(note) {
  return String(note)
    .replaceAll("#", "♯")
    .replaceAll("b", "♭");
}

export function getDegreeNumber(formulaToken) {
  const match =
    String(formulaToken).match(/\d+/);

  if (!match) {
    throw new Error(
      `Cannot determine degree from ${formulaToken}`,
    );
  }

  return Number(match[0]);
}

export function getLetterForDegree(
  rootLetter,
  degreeNumber,
) {
  const rootIndex =
    LETTERS.indexOf(rootLetter);

  if (rootIndex === -1) {
    throw new Error(
      `Invalid root letter: ${rootLetter}`,
    );
  }

  const letterIndex = mod(
    rootIndex + degreeNumber - 1,
    LETTERS.length,
  );

  return LETTERS[letterIndex];
}

function signedPitchDistance(
  fromPitchClass,
  toPitchClass,
) {
  const distance = mod(
    toPitchClass - fromPitchClass,
    12,
  );

  return distance <= 6
    ? distance
    : distance - 12;
}

function accidentalString(offset) {
  if (offset === 0) {
    return "";
  }

  if (offset > 0) {
    return "♯".repeat(offset);
  }

  return "♭".repeat(
    Math.abs(offset),
  );
}

export function spellPitchClass({
  letter,
  pitchClass,
}) {
  const naturalPitchClass =
    NATURAL_PITCH_CLASSES[letter];

  const accidentalDistance =
    signedPitchDistance(
      naturalPitchClass,
      pitchClass,
    );

  return (
    letter +
    accidentalString(
      accidentalDistance,
    )
  );
}