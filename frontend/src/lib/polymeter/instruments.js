export const POLYMETER_INSTRUMENTS =
  Object.freeze([
    {
      id: "kick",
      name: "Kick",
      sampleUrl:
        "/audio/drums/kick.wav",
      defaultGain: 1,
      accent: "#67e8f9",
    },
    {
      id: "snare",
      name: "Snare",
      sampleUrl:
        "/audio/drums/snare.wav",
      defaultGain: 0.85,
      accent: "#a78bfa",
    },
    {
      id: "hihat",
      name: "Hi-hat",
      sampleUrl:
        "/audio/drums/hihat.wav",
      defaultGain: 0.62,
      accent: "#fbbf24",
    },
  ]);

export const POLYMETER_INSTRUMENT_MAP =
  Object.freeze(
    Object.fromEntries(
      POLYMETER_INSTRUMENTS.map(
        (instrument) => [
          instrument.id,
          instrument,
        ],
      ),
    ),
  );

export function getPolymeterInstrument(
  instrumentId,
) {
  const instrument =
    POLYMETER_INSTRUMENT_MAP[
      instrumentId
    ];

  if (!instrument) {
    throw new Error(
      `Unknown polymeter instrument: ${instrumentId}`,
    );
  }

  return instrument;
}