"use client";

import type { ChangeEvent } from "react";

import { MAX_BPM, MIN_BPM, clampInteger } from "@/lib/meter/sequence";

type BPMControlProps = {
  bpm: number;
  onChange: (bpm: number) => void;
};

export function BPMControl({ bpm, onChange }: BPMControlProps) {
  function setBpm(value: number) {
    onChange(clampInteger(value, MIN_BPM, MAX_BPM));
  }

  return (
    <section aria-labelledby="tempo-heading" className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 id="tempo-heading" className="font-semibold">
            Tempo
          </h2>
          <p className="mt-1 text-sm text-neutral-500">Quarter-note tempo · {MIN_BPM}–{MAX_BPM} BPM</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setBpm(bpm - 1)}
          disabled={bpm <= MIN_BPM}
          aria-label="Decrease BPM by 1"
          className="min-h-11 min-w-11 rounded-xl border border-neutral-300 text-lg font-medium disabled:cursor-not-allowed disabled:opacity-30 dark:border-neutral-700"
        >
          −
        </button>

        <label className="min-w-0 flex-1">
          <span className="sr-only">BPM</span>
          <input
            type="number"
            min={MIN_BPM}
            max={MAX_BPM}
            step={1}
            value={bpm}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const value = event.currentTarget.valueAsNumber;
              if (Number.isFinite(value)) setBpm(value);
            }}
            aria-label="BPM"
            className="min-h-11 w-full rounded-xl border border-neutral-300 bg-transparent px-3 py-2 text-center text-lg font-semibold outline-none focus:border-neutral-500 dark:border-neutral-700"
          />
        </label>

        <button
          type="button"
          onClick={() => setBpm(bpm + 1)}
          disabled={bpm >= MAX_BPM}
          aria-label="Increase BPM by 1"
          className="min-h-11 min-w-11 rounded-xl border border-neutral-300 text-lg font-medium disabled:cursor-not-allowed disabled:opacity-30 dark:border-neutral-700"
        >
          +
        </button>
      </div>
    </section>
  );
}
