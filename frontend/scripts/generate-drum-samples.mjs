import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SAMPLE_RATE = 44100;
const BIT_DEPTH = 16;

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

const OUTPUT_DIR =
  path.resolve(
    __dirname,
    "../public/audio/drums",
  );

fs.mkdirSync(
  OUTPUT_DIR,
  {
    recursive: true,
  },
);

function clamp(
  value,
  min = -1,
  max = 1,
) {
  return Math.max(
    min,
    Math.min(
      max,
      value,
    ),
  );
}

function exponentialDecay(
  time,
  speed,
) {
  return Math.exp(
    -time * speed,
  );
}

/*
 * Deterministic pseudo-random
 * generator so regenerated drums
 * sound identical every time.
 */
function createNoiseGenerator(
  seed = 123456789,
) {
  let state =
    seed >>> 0;

  return function noise() {
    state =
      (
        1664525 *
          state +
        1013904223
      ) >>>
      0;

    return (
      state /
        4294967295
    ) *
      2 -
      1;
  };
}

function createBuffer(
  durationSeconds,
  generator,
) {
  const sampleCount =
    Math.floor(
      durationSeconds *
        SAMPLE_RATE,
    );

  const samples =
    new Float32Array(
      sampleCount,
    );

  for (
    let index = 0;
    index < sampleCount;
    index += 1
  ) {
    const time =
      index /
      SAMPLE_RATE;

    samples[index] =
      clamp(
        generator(
          time,
          index,
        ),
      );
  }

  return samples;
}

function normalize(
  samples,
  peak = 0.92,
) {
  let max =
    0;

  for (
    const sample of samples
  ) {
    max =
      Math.max(
        max,
        Math.abs(
          sample,
        ),
      );
  }

  if (max === 0) {
    return samples;
  }

  const multiplier =
    peak / max;

  for (
    let index = 0;
    index <
    samples.length;
    index += 1
  ) {
    samples[index] *=
      multiplier;
  }

  return samples;
}

function fadeOut(
  samples,
  durationSeconds = 0.01,
) {
  const fadeSamples =
    Math.min(
      samples.length,
      Math.floor(
        durationSeconds *
          SAMPLE_RATE,
      ),
    );

  for (
    let index = 0;
    index < fadeSamples;
    index += 1
  ) {
    const sampleIndex =
      samples.length -
      fadeSamples +
      index;

    const gain =
      1 -
      index /
        fadeSamples;

    samples[sampleIndex] *=
      gain;
  }

  return samples;
}

function writeWav(
  filePath,
  samples,
) {
  const channels = 1;
  const bytesPerSample =
    BIT_DEPTH / 8;

  const blockAlign =
    channels *
    bytesPerSample;

  const byteRate =
    SAMPLE_RATE *
    blockAlign;

  const dataSize =
    samples.length *
    bytesPerSample;

  const buffer =
    Buffer.alloc(
      44 +
        dataSize,
    );

  buffer.write(
    "RIFF",
    0,
  );

  buffer.writeUInt32LE(
    36 +
      dataSize,
    4,
  );

  buffer.write(
    "WAVE",
    8,
  );

  buffer.write(
    "fmt ",
    12,
  );

  buffer.writeUInt32LE(
    16,
    16,
  );

  buffer.writeUInt16LE(
    1,
    20,
  );

  buffer.writeUInt16LE(
    channels,
    22,
  );

  buffer.writeUInt32LE(
    SAMPLE_RATE,
    24,
  );

  buffer.writeUInt32LE(
    byteRate,
    28,
  );

  buffer.writeUInt16LE(
    blockAlign,
    32,
  );

  buffer.writeUInt16LE(
    BIT_DEPTH,
    34,
  );

  buffer.write(
    "data",
    36,
  );

  buffer.writeUInt32LE(
    dataSize,
    40,
  );

  for (
    let index = 0;
    index <
    samples.length;
    index += 1
  ) {
    const sample =
      clamp(
        samples[index],
      );

    const intSample =
      sample < 0
        ? Math.round(
            sample *
              32768,
          )
        : Math.round(
            sample *
              32767,
          );

    buffer.writeInt16LE(
      intSample,
      44 +
        index *
          2,
    );
  }

  fs.writeFileSync(
    filePath,
    buffer,
  );
}

/*
 * KICK
 *
 * Sine oscillator with a fast
 * downward pitch sweep.
 *
 * Starts high for the attack,
 * then settles around 48 Hz.
 */
function generateKick() {
  let phase = 0;

  const samples =
    createBuffer(
      0.8,
      (
        time,
      ) => {
        const pitchEnvelope =
          Math.exp(
            -time * 28,
          );

        const frequency =
          48 +
          125 *
            pitchEnvelope;

        phase +=
          (
            2 *
            Math.PI *
            frequency
          ) /
          SAMPLE_RATE;

        const body =
          Math.sin(
            phase,
          );

        const amplitude =
          exponentialDecay(
            time,
            7.5,
          );

        /*
         * Tiny click at the front
         * for some definition.
         */
        const attack =
          time <
          0.008
            ? (
                1 -
                time /
                  0.008
              ) *
              0.15
            : 0;

        return (
          body *
            amplitude +
          attack
        );
      },
    );

  normalize(
    samples,
  );

  fadeOut(
    samples,
    0.03,
  );

  return samples;
}

/*
 * SNARE
 *
 * Mostly noise, plus a short
 * low-mid body oscillator.
 */
function generateSnare() {
  const noise =
    createNoiseGenerator(
      987654321,
    );

  let bodyPhase =
    0;

  let previousNoise =
    0;

  const samples =
    createBuffer(
      0.55,
      (
        time,
      ) => {
        const rawNoise =
          noise();

        /*
         * Simple high-pass-ish
         * treatment:
         *
         * subtract part of the
         * previous noise sample.
         */
        const brightNoise =
          rawNoise -
          previousNoise *
            0.72;

        previousNoise =
          rawNoise;

        const noiseEnvelope =
          exponentialDecay(
            time,
            12,
          );

        const bodyFrequency =
          185;

        bodyPhase +=
          (
            2 *
            Math.PI *
            bodyFrequency
          ) /
          SAMPLE_RATE;

        const body =
          Math.sin(
            bodyPhase,
          ) *
          exponentialDecay(
            time,
            18,
          );

        return (
          brightNoise *
            noiseEnvelope *
            0.82 +
          body *
            0.34
        );
      },
    );

  normalize(
    samples,
    0.88,
  );

  fadeOut(
    samples,
    0.02,
  );

  return samples;
}

/*
 * CLOSED HI-HAT
 *
 * Very short bright noise burst.
 */
function generateHiHat() {
  const noise =
    createNoiseGenerator(
      246813579,
    );

  let previousNoise =
    0;

  let previousHighPass =
    0;

  const samples =
    createBuffer(
      0.22,
      (
        time,
      ) => {
        const raw =
          noise();

        /*
         * Crude high-pass filter
         * to remove low-frequency
         * content.
         */
        const highPass =
          0.82 *
            (
              previousHighPass +
              raw -
              previousNoise
            );

        previousNoise =
          raw;

        previousHighPass =
          highPass;

        const envelope =
          exponentialDecay(
            time,
            32,
          );

        return (
          highPass *
          envelope
        );
      },
    );

  normalize(
    samples,
    0.72,
  );

  fadeOut(
    samples,
    0.012,
  );

  return samples;
}

const drums = [
  {
    filename:
      "kick.wav",

    generate:
      generateKick,
  },
  {
    filename:
      "snare.wav",

    generate:
      generateSnare,
  },
  {
    filename:
      "hihat.wav",

    generate:
      generateHiHat,
  },
];

for (
  const drum of drums
) {
  const samples =
    drum.generate();

  const outputPath =
    path.join(
      OUTPUT_DIR,
      drum.filename,
    );

  writeWav(
    outputPath,
    samples,
  );

  console.log(
    `Generated ${outputPath}`,
  );
}

console.log(
  "\nDone.",
);

console.log(
  "Generated kick.wav, snare.wav and hihat.wav.",
);