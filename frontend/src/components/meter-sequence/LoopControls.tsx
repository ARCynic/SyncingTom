"use client";

import type { ChangeEvent } from "react";

import { clampInteger } from "@/lib/meter/sequence";
import type { LoopSettings } from "@/types/music";

const MIN_CYCLES = 1;
const MAX_CYCLES = 999;

type LoopControlsProps = {
  value: LoopSettings;
  onChange: (settings: LoopSettings) => void;
};

export function LoopControls({ value, onChange }: LoopControlsProps) {
  return (
    <section aria-labelledby="loop-heading" className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
      <h2 id="loop-heading" className="font-semibold">
        Loop
      </h2>
      <p className="mt-1 text-sm text-neutral-500">One cycle is one complete pass through your sequence.</p>

      <fieldset className="mt-4 space-y-3">
        <legend className="sr-only">Loop mode</legend>

        <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-neutral-300 px-3 py-2 dark:border-neutral-700">
          <input
            type="radio"
            name="loop-mode"
            value="infinite"
            checked={value.mode === "infinite"}
            onChange={() => onChange({ ...value, mode: "infinite" })}
          />
          <span className="text-sm font-medium">Infinite</span>
        </label>

        <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-neutral-300 px-3 py-2 dark:border-neutral-700">
          <input
            type="radio"
            name="loop-mode"
            value="fixed"
            checked={value.mode === "fixed"}
            onChange={() => onChange({ ...value, mode: "fixed" })}
          />
          <span className="text-sm font-medium">Fixed cycles</span>
        </label>
      </fieldset>

      {value.mode === "fixed" ? (
        <label className="mt-4 grid gap-1.5 text-sm">
          <span className="font-medium">Cycles</span>
          <input
            type="number"
            min={MIN_CYCLES}
            max={MAX_CYCLES}
            step={1}
            value={value.cycles}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const cycles = event.currentTarget.valueAsNumber;
              if (!Number.isFinite(cycles)) return;

              onChange({
                mode: "fixed",
                cycles: clampInteger(cycles, MIN_CYCLES, MAX_CYCLES),
              });
            }}
            className="min-h-11 rounded-xl border border-neutral-300 bg-transparent px-3 py-2 outline-none focus:border-neutral-500 dark:border-neutral-700"
          />
        </label>
      ) : null}
    </section>
  );
}
