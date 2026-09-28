import {
  getDegreeNumber,
  getLetterForDegree,
  mod,
  parseNoteName,
  spellPitchClass,
} from "./notes.js";

export function buildScaleNotes(
  root,
  scale,
) {
  if (!scale) {
    throw new Error(
      "A scale definition is required.",
    );
  }

  if (
    !Array.isArray(scale.intervals) ||
    !Array.isArray(scale.formula)
  ) {
    throw new Error(
      "Scale must contain intervals and formula arrays.",
    );
  }

  if (
    scale.intervals.length !==
    scale.formula.length
  ) {
    throw new Error(
      `Scale ${scale.id} has mismatched interval and formula lengths.`,
    );
  }

  const parsedRoot =
    parseNoteName(root);

  return scale.intervals.map(
    (interval, index) => {
      const formulaToken =
        scale.formula[index];

      const degreeNumber =
        getDegreeNumber(
          formulaToken,
        );

      const letter =
        getLetterForDegree(
          parsedRoot.letter,
          degreeNumber,
        );

      const pitchClass = mod(
        parsedRoot.pitchClass +
          interval,
        12,
      );

      return spellPitchClass({
        letter,
        pitchClass,
      });
    },
  );
}