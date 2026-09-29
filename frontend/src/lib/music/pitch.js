const NATURAL_SEMITONES = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

export const MIDI_MIN = 0;
export const MIDI_MAX = 127;

export const DEFAULT_CONCERT_A_HZ = 440;
export const DEFAULT_AUDITION_OCTAVE = 4;

function mod(value, modulus) {
  return (
    ((value % modulus) + modulus) %
    modulus
  );
}

function normalizeAccidentals(value) {
  return String(value)
    .replaceAll("♯", "#")
    .replaceAll("♭", "b");
}

function getAccidentalOffset(
  accidental = "",
) {
  let offset = 0;

  for (const symbol of accidental) {
    if (symbol === "#") {
      offset += 1;
    }

    if (symbol === "b") {
      offset -= 1;
    }
  }

  return offset;
}

function assertMidi(midi) {
  if (
    !Number.isInteger(midi) ||
    midi < MIDI_MIN ||
    midi > MIDI_MAX
  ) {
    throw new Error(
      `MIDI note must be an integer between ${MIDI_MIN} and ${MIDI_MAX}.`,
    );
  }
}

function assertOctave(octave) {
  if (!Number.isInteger(octave)) {
    throw new Error(
      "Octave must be an integer.",
    );
  }
}

function assertConcertA(
  concertAHz,
) {
  if (
    !Number.isFinite(
      concertAHz,
    ) ||
    concertAHz <= 0
  ) {
    throw new Error(
      "Concert A frequency must be a positive number.",
    );
  }
}

/**
 * Parses a written pitch name without
 * an octave.
 *
 * Examples:
 * C
 * F#
 * F♯
 * Bb
 * B♭
 * C##
 * Ebb
 */
export function parsePitchName(
  noteName,
) {
  const normalized =
    normalizeAccidentals(
      noteName,
    )
      .trim();

  const match =
    normalized.match(
      /^([A-Ga-g])([#b]*)$/,
    );

  if (!match) {
    throw new Error(
      `Invalid pitch name: ${noteName}`,
    );
  }

  const letter =
    match[1].toUpperCase();

  const accidental =
    match[2] ?? "";

  const accidentalOffset =
    getAccidentalOffset(
      accidental,
    );

  const naturalSemitone =
    NATURAL_SEMITONES[
      letter
    ];

  const pitchClass =
    mod(
      naturalSemitone +
        accidentalOffset,
      12,
    );

  return {
    letter,
    accidental,
    accidentalOffset,
    naturalSemitone,
    pitchClass,
  };
}

/**
 * Converts a written note and octave
 * into MIDI.
 *
 * Scientific pitch notation:
 * C4 = MIDI 60
 * A4 = MIDI 69
 *
 * Important:
 * B#4 = MIDI 72 (C5)
 * Cb4 = MIDI 59 (B3)
 */
export function noteNameToMidi(
  noteName,
  octave = DEFAULT_AUDITION_OCTAVE,
) {
  assertOctave(octave);

  const parsed =
    parsePitchName(
      noteName,
    );

  const midi =
    12 * (octave + 1) +
    parsed.naturalSemitone +
    parsed.accidentalOffset;

  assertMidi(midi);

  return midi;
}

/**
 * Converts a chromatic pitch class
 * into MIDI inside a C-based octave.
 *
 * Example octave 4:
 *
 * C  = 60
 * C# = 61
 * ...
 * B  = 71
 */
export function pitchClassToMidi(
  pitchClass,
  octave = DEFAULT_AUDITION_OCTAVE,
) {
  assertOctave(octave);

  if (
    !Number.isInteger(
      pitchClass,
    )
  ) {
    throw new Error(
      "Pitch class must be an integer.",
    );
  }

  const normalized =
    mod(
      pitchClass,
      12,
    );

  const midi =
    12 * (octave + 1) +
    normalized;

  assertMidi(midi);

  return midi;
}

/**
 * MIDI to frequency using
 * equal temperament.
 *
 * MIDI 69 = A4.
 */
export function midiToFrequency(
  midi,
  concertAHz =
    DEFAULT_CONCERT_A_HZ,
) {
  assertMidi(midi);
  assertConcertA(
    concertAHz,
  );

  return (
    concertAHz *
    2 **
      ((midi - 69) / 12)
  );
}

/**
 * Convenience:
 *
 * note name + octave
 * → MIDI
 * → frequency
 */
export function noteNameToFrequency(
  noteName,
  octave = DEFAULT_AUDITION_OCTAVE,
  concertAHz =
    DEFAULT_CONCERT_A_HZ,
) {
  const midi =
    noteNameToMidi(
      noteName,
      octave,
    );

  return midiToFrequency(
    midi,
    concertAHz,
  );
}

export function midiToPitchClass(
  midi,
) {
  assertMidi(midi);

  return mod(
    midi,
    12,
  );
}

export function midiToOctave(
  midi,
) {
  assertMidi(midi);

  return (
    Math.floor(
      midi / 12,
    ) - 1
  );
}

export function formatFrequency(
  frequency,
  fractionDigits = 2,
) {
  if (
    !Number.isFinite(
      frequency,
    )
  ) {
    return "";
  }

  return `${frequency.toFixed(
    fractionDigits,
  )} Hz`;
}