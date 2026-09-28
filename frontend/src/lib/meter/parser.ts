import type { MeterSequenceItem, SupportedDenominator } from "@/types/music";
import { SUPPORTED_DENOMINATORS } from "@/types/music";

export type ParseSequenceResult =
  | { ok: true; sequence: MeterSequenceItem[] }
  | { ok: false; error: string };

const TOKEN_PATTERN = /^(\d+)(?:\/(\d+))?(?:[x×](\d+))?$/i;
const MIN_NUMERATOR = 1;
const MAX_NUMERATOR = 32;
const MIN_REPETITIONS = 1;
const MAX_REPETITIONS = 999;

function isSupportedDenominator(value: number): value is SupportedDenominator {
  return SUPPORTED_DENOMINATORS.includes(value as SupportedDenominator);
}

export function parseMeterSequence(input: string): ParseSequenceResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      ok: false,
      error: "Enter at least one meter, for example 5,7,4 or 7/8x2,5/8,4/4.",
    };
  }

  const rawTokens = trimmed.split(",");
  const sequence: MeterSequenceItem[] = [];

  for (let index = 0; index < rawTokens.length; index += 1) {
    const rawToken = rawTokens[index];
    const token = rawToken.replace(/\s+/g, "");

    if (!token) {
      return {
        ok: false,
        error: `Meter ${index + 1} is empty. Remove the extra comma or add a meter.`,
      };
    }

    const match = TOKEN_PATTERN.exec(token);

    if (!match) {
      return {
        ok: false,
        error: `“${rawToken.trim()}” is not valid. Use forms such as 5, 7/8, or 5/4x2.`,
      };
    }

    const numerator = Number(match[1]);
    const denominator = match[2] ? Number(match[2]) : 4;
    const repetitions = match[3] ? Number(match[3]) : 1;

    if (!Number.isInteger(numerator) || numerator < MIN_NUMERATOR || numerator > MAX_NUMERATOR) {
      return {
        ok: false,
        error: `Meter ${index + 1} must have between ${MIN_NUMERATOR} and ${MAX_NUMERATOR} beats.`,
      };
    }

    if (!isSupportedDenominator(denominator)) {
      return {
        ok: false,
        error: `Meter ${index + 1} uses /${denominator}. Supported beat units are /2, /4, /8, and /16.`,
      };
    }

    if (
      !Number.isInteger(repetitions) ||
      repetitions < MIN_REPETITIONS ||
      repetitions > MAX_REPETITIONS
    ) {
      return {
        ok: false,
        error: `Meter ${index + 1} must repeat between ${MIN_REPETITIONS} and ${MAX_REPETITIONS} times.`,
      };
    }

    sequence.push({
      meter: {
        numerator,
        denominator,
      },
      repetitions,
    });
  }

  return { ok: true, sequence };
}
