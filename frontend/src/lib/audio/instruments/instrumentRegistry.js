import {
  SoftKeysVoice,
} from "./SoftKeysVoice.js";

export const DEFAULT_SCALE_INSTRUMENT_ID =
  "soft-keys";

export const SCALE_INSTRUMENTS =
  Object.freeze([
    {
      id: "soft-keys",
      name: "Soft Keys",
      description:
        "A lightweight synthesized keyboard voice.",
    },
  ]);

const INSTRUMENT_FACTORIES = {
  "soft-keys": (
    context,
    options,
  ) =>
    new SoftKeysVoice(
      context,
      options,
    ),
};

export function isScaleInstrumentId(
  instrumentId,
) {
  return Object.hasOwn(
    INSTRUMENT_FACTORIES,
    instrumentId,
  );
}

export function createScaleInstrument(
  instrumentId,
  context,
  options = {},
) {
  const factory =
    INSTRUMENT_FACTORIES[
      instrumentId
    ];

  if (!factory) {
    throw new Error(
      `Unknown scale instrument: ${instrumentId}`,
    );
  }

  return factory(
    context,
    options,
  );
}