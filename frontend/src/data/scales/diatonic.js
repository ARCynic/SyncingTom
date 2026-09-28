export const DIATONIC_SCALES = [
  {
    id: "major",
    name: "Major",
    modeName: "Ionian",
    family: "Diatonic",
    parentId: "major",
    modeDegree: 1,

    intervals: [
      0,
      2,
      4,
      5,
      7,
      9,
      11,
    ],

    formula: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
    ],

    aliases: [
      "Ionian",
    ],

    description:
      "The major scale and parent collection of the seven diatonic modes.",
  },

  {
    id: "dorian",
    name: "Dorian",
    modeName: "Dorian",
    family: "Diatonic",
    parentId: "major",
    modeDegree: 2,

    intervals: [
      0,
      2,
      3,
      5,
      7,
      9,
      10,
    ],

    formula: [
      "1",
      "2",
      "♭3",
      "4",
      "5",
      "6",
      "♭7",
    ],

    aliases: [],

    description:
      "A minor mode distinguished by its natural sixth.",
  },

  {
    id: "phrygian",
    name: "Phrygian",
    modeName: "Phrygian",
    family: "Diatonic",
    parentId: "major",
    modeDegree: 3,

    intervals: [
      0,
      1,
      3,
      5,
      7,
      8,
      10,
    ],

    formula: [
      "1",
      "♭2",
      "♭3",
      "4",
      "5",
      "♭6",
      "♭7",
    ],

    aliases: [],

    description:
      "A minor mode with a characteristic flattened second degree.",
  },

  {
    id: "lydian",
    name: "Lydian",
    modeName: "Lydian",
    family: "Diatonic",
    parentId: "major",
    modeDegree: 4,

    intervals: [
      0,
      2,
      4,
      6,
      7,
      9,
      11,
    ],

    formula: [
      "1",
      "2",
      "3",
      "♯4",
      "5",
      "6",
      "7",
    ],

    aliases: [],

    description:
      "A major mode characterized by its raised fourth degree.",
  },

  {
    id: "mixolydian",
    name: "Mixolydian",
    modeName: "Mixolydian",
    family: "Diatonic",
    parentId: "major",
    modeDegree: 5,

    intervals: [
      0,
      2,
      4,
      5,
      7,
      9,
      10,
    ],

    formula: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "♭7",
    ],

    aliases: [],

    description:
      "A major mode with a flattened seventh degree.",
  },

  {
    id: "natural-minor",
    name: "Natural Minor",
    modeName: "Aeolian",
    family: "Diatonic",
    parentId: "major",
    modeDegree: 6,

    intervals: [
      0,
      2,
      3,
      5,
      7,
      8,
      10,
    ],

    formula: [
      "1",
      "2",
      "♭3",
      "4",
      "5",
      "♭6",
      "♭7",
    ],

    aliases: [
      "Aeolian",
      "Minor",
    ],

    description:
      "The natural minor scale and sixth mode of the major scale.",
  },

  {
    id: "locrian",
    name: "Locrian",
    modeName: "Locrian",
    family: "Diatonic",
    parentId: "major",
    modeDegree: 7,

    intervals: [
      0,
      1,
      3,
      5,
      6,
      8,
      10,
    ],

    formula: [
      "1",
      "♭2",
      "♭3",
      "4",
      "♭5",
      "♭6",
      "♭7",
    ],

    aliases: [],

    description:
      "A minor mode with flattened second and fifth degrees.",
  },
];