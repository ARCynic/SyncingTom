export const PITCH_CLOCK_POSITIONS = [
  {
    pitchClass: 0,
    primary: "C",
    secondary: null,
    spokenLabel: "C",
  },

  {
    pitchClass: 1,
    primary: "C♯",
    secondary: "D♭",
    spokenLabel: "C sharp or D flat",
  },

  {
    pitchClass: 2,
    primary: "D",
    secondary: null,
    spokenLabel: "D",
  },

  {
    pitchClass: 3,
    primary: "D♯",
    secondary: "E♭",
    spokenLabel: "D sharp or E flat",
  },

  {
    pitchClass: 4,
    primary: "E",
    secondary: null,
    spokenLabel: "E",
  },

  {
    pitchClass: 5,
    primary: "F",
    secondary: null,
    spokenLabel: "F",
  },

  {
    pitchClass: 6,
    primary: "F♯",
    secondary: "G♭",
    spokenLabel: "F sharp or G flat",
  },

  {
    pitchClass: 7,
    primary: "G",
    secondary: null,
    spokenLabel: "G",
  },

  {
    pitchClass: 8,
    primary: "G♯",
    secondary: "A♭",
    spokenLabel: "G sharp or A flat",
  },

  {
    pitchClass: 9,
    primary: "A",
    secondary: null,
    spokenLabel: "A",
  },

  {
    pitchClass: 10,
    primary: "A♯",
    secondary: "B♭",
    spokenLabel: "A sharp or B flat",
  },

  {
    pitchClass: 11,
    primary: "B",
    secondary: null,
    spokenLabel: "B",
  },
];

export function normalizePitchClass(value) {
  if (!Number.isFinite(value)) {
    return null;
  }

  return ((value % 12) + 12) % 12;
}