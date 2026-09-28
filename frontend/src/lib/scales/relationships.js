function ordinal(number) {
  const mod100 =
    number % 100;

  if (
    mod100 >= 11 &&
    mod100 <= 13
  ) {
    return `${number}th`;
  }

  switch (number % 10) {
    case 1:
      return `${number}st`;

    case 2:
      return `${number}nd`;

    case 3:
      return `${number}rd`;

    default:
      return `${number}th`;
  }
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

export function describeModeRelationship(
  scale,
  allScales,
) {
  const parent =
    getParentScale(
      scale,
      allScales,
    );

  if (!parent) {
    return null;
  }

  if (scale.id === parent.id) {
    return `${scale.name} is the parent collection of this modal family.`;
  }

  return `${
    scale.modeName ?? scale.name
  } is the ${ordinal(
    scale.modeDegree,
  )} mode of ${parent.name}.`;
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
        candidate.id !== scale.id,
    )
    .sort(
      (a, b) =>
        a.modeDegree -
        b.modeDegree,
    );
}