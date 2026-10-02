import {
  DIATONIC_SCALES,
} from "./diatonic.js";

export const SCALE_FAMILIES = [
  {
    id: "diatonic",

    name: "Diatonic",

    listLabel:
      "Diatonic modes",

    description:
      "The seven modes derived from the major scale.",

    scales:
      DIATONIC_SCALES,
  },
];

export const SCALES =
  SCALE_FAMILIES.flatMap(
    (family) =>
      family.scales,
  );

export function getScaleFamilyById(
  id,
) {
  return (
    SCALE_FAMILIES.find(
      (family) =>
        family.id === id,
    ) ?? null
  );
}

export function getScalesByFamily(
  familyId,
) {
  return (
    getScaleFamilyById(
      familyId,
    )?.scales ?? []
  );
}

export function getScaleById(
  id,
) {
  return (
    SCALES.find(
      (scale) =>
        scale.id === id,
    ) ?? null
  );
}