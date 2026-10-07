export const DIATONIC_SCALES = [
  {
    id: "major",
    name: "Major",
    modeName: "Ionian",
    family: "Diatonic",
    parentId: "major",
    modeDegree: 1,

    intervals: [0, 2, 4, 5, 7, 9, 11],

    formula: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
    ],

    aliases: ["Ionian"],

    quality: "major",

    characteristicDegrees: [
      "3",
      "7",
    ],

    description:
      "The major scale and reference point for the seven diatonic modes.",
  },

  {
    id: "dorian",
    name: "Dorian",
    modeName: "Dorian",
    family: "Diatonic",
    parentId: "major",
    modeDegree: 2,

    intervals: [0, 2, 3, 5, 7, 9, 10],

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

    quality: "minor",

    characteristicDegrees: [
      "♭3",
      "6",
      "♭7",
    ],

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

    intervals: [0, 1, 3, 5, 7, 8, 10],

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

    quality: "minor",

    characteristicDegrees: [
      "♭2",
      "♭3",
      "♭7",
    ],

    description:
      "A minor mode defined strongly by its flattened second.",
  },

  {
    id: "lydian",
    name: "Lydian",
    modeName: "Lydian",
    family: "Diatonic",
    parentId: "major",
    modeDegree: 4,

    intervals: [0, 2, 4, 6, 7, 9, 11],

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

    quality: "major",

    characteristicDegrees: [
      "3",
      "♯4",
      "7",
    ],

    description:
      "A major mode distinguished by its raised fourth.",
  },

  {
    id: "mixolydian",
    name: "Mixolydian",
    modeName: "Mixolydian",
    family: "Diatonic",
    parentId: "major",
    modeDegree: 5,

    intervals: [0, 2, 4, 5, 7, 9, 10],

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

    quality: "major",

    characteristicDegrees: [
      "3",
      "♭7",
    ],

    description:
      "A major mode distinguished by its flattened seventh.",
  },

  {
    id: "natural-minor",
    name: "Natural Minor",
    modeName: "Aeolian",
    family: "Diatonic",
    parentId: "major",
    modeDegree: 6,

    intervals: [0, 2, 3, 5, 7, 8, 10],

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

    quality: "minor",

    characteristicDegrees: [
      "♭3",
      "♭6",
      "♭7",
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

    intervals: [0, 1, 3, 5, 6, 8, 10],

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

    quality: "diminished",

    characteristicDegrees: [
      "♭2",
      "♭5",
    ],

    description:
      "The most unstable diatonic mode, defined by its flattened second and fifth.",
  },
];