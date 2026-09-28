import { DIATONIC_SCALES } from "./diatonic.js";

export const SCALES = [
  ...DIATONIC_SCALES,
];

export function getScaleById(id) {
  return (
    SCALES.find(
      (scale) => scale.id === id,
    ) ?? null
  );
}