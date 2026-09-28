export const SUPPORTED_DENOMINATORS = [2, 4, 8, 16] as const;

export type SupportedDenominator = (typeof SUPPORTED_DENOMINATORS)[number];

export type Meter = {
  numerator: number;
  denominator: SupportedDenominator;
  grouping?: number[];
};

export type MeterSequenceItem = {
  meter: Meter;
  repetitions: number;
};

export type LoopMode = "infinite" | "fixed";

export type LoopSettings = {
  mode: LoopMode;
  cycles: number;
};
