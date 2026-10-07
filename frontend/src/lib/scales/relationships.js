const MAJOR_MODE_OFFSETS = [
  0,
  2,
  4,
  5,
  7,
  9,
  11,
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

const LETTERS = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
];

function ordinal(number) {
  const mod100 =
    number % 100;

  if (
    mod100 >= 11 &&
    mod100 <= 13
  ) {
    return `${number}th`;
  }

  if (number % 10 === 1) {
    return `${number}st`;
  }

  if (number % 10 === 2) {
    return `${number}nd`;
  }

  if (number % 10 === 3) {
    return `${number}rd`;
  }

  return `${number}th`;
}

function normalizePitchClass(value) {
  return ((value % 12) + 12) % 12;
}

function parseRoot(root) {
  const match =
    /^([A-Ga-g])([#♯b♭]?)$/.exec(
      root,
    );

  if (!match) {
    return null;
  }

  const letter =
    match[1].toUpperCase();

  const accidental =
    match[2];

  let pitchClass =
    NATURAL_PITCH_CLASSES[
      letter
    ];

  if (
    accidental === "#" ||
    accidental === "♯"
  ) {
    pitchClass += 1;
  }

  if (
    accidental === "b" ||
    accidental === "♭"
  ) {
    pitchClass -= 1;
  }

  return {
    letter,
    pitchClass:
      normalizePitchClass(
        pitchClass,
      ),
  };
}

function accidentalFor(
  letter,
  targetPitchClass,
) {
  const natural =
    NATURAL_PITCH_CLASSES[
      letter
    ];

  let difference =
    normalizePitchClass(
      targetPitchClass -
        natural,
    );

  if (difference > 6) {
    difference -= 12;
  }

  if (difference === 0) {
    return "";
  }

  if (difference === 1) {
    return "♯";
  }

  if (difference === -1) {
    return "♭";
  }

  if (difference === 2) {
    return "𝄪";
  }

  if (difference === -2) {
    return "𝄫";
  }

  return "";
}

function formatRoot(root) {
  return root
    .replace("#", "♯")
    .replace("b", "♭");
}

export function getParentScale(
  scale,
  allScales,
) {
  if (!scale?.parentId) {
    return null;
  }

  return (
    allScales.find(
      (candidate) =>
        candidate.id ===
        scale.parentId,
    ) ?? null
  );
}

export function getParentRoot(
  root,
  modeDegree,
) {
  const parsed =
    parseRoot(root);

  if (
    !parsed ||
    !modeDegree
  ) {
    return null;
  }

  const offset =
    MAJOR_MODE_OFFSETS[
      modeDegree - 1
    ];

  if (
    offset === undefined
  ) {
    return null;
  }

  const parentPitchClass =
    normalizePitchClass(
      parsed.pitchClass -
        offset,
    );

  const rootLetterIndex =
    LETTERS.indexOf(
      parsed.letter,
    );

  const parentLetterIndex =
    (
      rootLetterIndex -
      (modeDegree - 1) +
      7
    ) % 7;

  const parentLetter =
    LETTERS[
      parentLetterIndex
    ];

  const accidental =
    accidentalFor(
      parentLetter,
      parentPitchClass,
    );

  return `${parentLetter}${accidental}`;
}

export function describeModeRelationship(
  scale,
  allScales,
  root,
) {
  const parent =
    getParentScale(
      scale,
      allScales,
    );

  if (
    !parent ||
    !root
  ) {
    return null;
  }

  const rootLabel =
    formatRoot(root);

  if (
    scale.id === parent.id
  ) {
    return `${rootLabel} ${parent.name} is the parent collection of this modal family.`;
  }

  const parentRoot =
    getParentRoot(
      root,
      scale.modeDegree,
    );

  if (!parentRoot) {
    return null;
  }

  const modeName =
    scale.modeName ??
    scale.name;

  return `${rootLabel} ${modeName} is the ${ordinal(
    scale.modeDegree,
  )} mode of ${parentRoot} ${parent.name}.`;
}

export function getSiblingModes(
  scale,
  allScales,
) {
  if (!scale?.parentId) {
    return [];
  }

  return allScales
    .filter(
      (candidate) =>
        candidate.parentId ===
          scale.parentId &&
        candidate.id !==
          scale.id,
    )
    .sort(
      (a, b) =>
        a.modeDegree -
        b.modeDegree,
    );
}