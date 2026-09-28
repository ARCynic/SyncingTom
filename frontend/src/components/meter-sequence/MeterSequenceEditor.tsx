"use client";

import type { ChangeEvent } from "react";

import {
  MAX_NUMERATOR,
  MAX_REPETITIONS,
  MIN_NUMERATOR,
  MIN_REPETITIONS,
  clampInteger,
  createMeterItem,
  moveSequenceItem,
} from "@/lib/meter/sequence";
import { SUPPORTED_DENOMINATORS } from "@/types/music";
import type { MeterSequenceItem, SupportedDenominator } from "@/types/music";

type MeterSequenceEditorProps = {
  sequence: MeterSequenceItem[];
  onChange: (sequence: MeterSequenceItem[]) => void;
};

export function MeterSequenceEditor({ sequence, onChange }: MeterSequenceEditorProps) {
  function replaceItem(index: number, item: MeterSequenceItem) {
    onChange(sequence.map((current, currentIndex) => (currentIndex === index ? item : current)));
  }

  function updateNumerator(index: number, value: number) {
    const item = sequence[index];
    if (!item) return;

    replaceItem(index, {
      ...item,
      meter: {
        ...item.meter,
        numerator: clampInteger(value, MIN_NUMERATOR, MAX_NUMERATOR),
      },
    });
  }

  function updateDenominator(index: number, denominator: SupportedDenominator) {
    const item = sequence[index];
    if (!item) return;

    replaceItem(index, {
      ...item,
      meter: {
        ...item.meter,
        denominator,
      },
    });
  }

  function updateRepetitions(index: number, value: number) {
    const item = sequence[index];
    if (!item) return;

    replaceItem(index, {
      ...item,
      repetitions: clampInteger(value, MIN_REPETITIONS, MAX_REPETITIONS),
    });
  }

  function deleteItem(index: number) {
    if (sequence.length <= 1) return;
    onChange(sequence.filter((_, currentIndex) => currentIndex !== index));
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {sequence.map((item, index) => (
          <article
            key={index}
            className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Meter {index + 1}
              </p>

              <button
                type="button"
                onClick={() => deleteItem(index)}
                disabled={sequence.length <= 1}
                aria-label={`Delete meter ${index + 1}`}
                className="min-h-9 rounded-lg px-2 text-sm text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-neutral-900 dark:hover:text-white"
              >
                Delete
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <label className="grid gap-1.5 text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Beats</span>
                <input
                  type="number"
                  min={MIN_NUMERATOR}
                  max={MAX_NUMERATOR}
                  step={1}
                  value={item.meter.numerator}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = event.currentTarget.valueAsNumber;
                    if (Number.isFinite(value)) updateNumerator(index, value);
                  }}
                  aria-label={`Beats in meter ${index + 1}`}
                  className="min-h-11 w-full rounded-xl border border-neutral-300 bg-transparent px-3 py-2 outline-none focus:border-neutral-500 dark:border-neutral-700"
                />
              </label>

              <label className="grid gap-1.5 text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Beat unit</span>
                <select
                  value={item.meter.denominator}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    updateDenominator(index, Number(event.target.value) as SupportedDenominator)
                  }
                  aria-label={`Beat unit for meter ${index + 1}`}
                  className="min-h-11 w-full rounded-xl border border-neutral-300 bg-transparent px-3 py-2 outline-none focus:border-neutral-500 dark:border-neutral-700"
                >
                  {SUPPORTED_DENOMINATORS.map((denominator) => (
                    <option key={denominator} value={denominator}>
                      {denominator}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-1.5 text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Repeat</span>
                <input
                  type="number"
                  min={MIN_REPETITIONS}
                  max={MAX_REPETITIONS}
                  step={1}
                  value={item.repetitions}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = event.currentTarget.valueAsNumber;
                    if (Number.isFinite(value)) updateRepetitions(index, value);
                  }}
                  aria-label={`Repeat meter ${index + 1}`}
                  className="min-h-11 w-full rounded-xl border border-neutral-300 bg-transparent px-3 py-2 outline-none focus:border-neutral-500 dark:border-neutral-700"
                />
              </label>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => onChange(moveSequenceItem(sequence, index, index - 1))}
                disabled={index === 0}
                aria-label={`Move meter ${index + 1} left`}
                className="min-h-10 flex-1 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-30 dark:border-neutral-700"
              >
                ← Left
              </button>

              <button
                type="button"
                onClick={() => onChange(moveSequenceItem(sequence, index, index + 1))}
                disabled={index === sequence.length - 1}
                aria-label={`Move meter ${index + 1} right`}
                className="min-h-10 flex-1 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-30 dark:border-neutral-700"
              >
                Right →
              </button>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange([...sequence, createMeterItem()])}
        className="min-h-11 rounded-xl border border-dashed border-neutral-400 px-4 py-2.5 text-sm font-semibold transition hover:border-neutral-600 dark:border-neutral-600 dark:hover:border-neutral-400"
      >
        + Add Meter
      </button>
    </div>
  );
}
