"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

import { parseMeterSequence } from "@/lib/meter/parser";
import { formatMeterSequence } from "@/lib/meter/sequence";
import type { MeterSequenceItem } from "@/types/music";

type QuickSequenceInputProps = {
  sequence: MeterSequenceItem[];
  onApply: (sequence: MeterSequenceItem[]) => void;
};

export function QuickSequenceInput({
  sequence,
  onApply,
}: QuickSequenceInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.value = formatMeterSequence(sequence);
  }, [sequence]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = inputRef.current?.value ?? "";

    const result = parseMeterSequence(value);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError(null);
    onApply(result.sequence);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label
        htmlFor="quick-sequence"
        className="block text-sm font-medium"
      >
        Quick input
      </label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          ref={inputRef}
          id="quick-sequence"
          type="text"
          defaultValue={formatMeterSequence(sequence)}
          onChange={() => {
            if (error) {
              setError(null);
            }
          }}
          placeholder="5,7,4 or 7/8x2,5/8,4/4"
          autoComplete="off"
          spellCheck={false}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? "quick-sequence-error quick-sequence-help"
              : "quick-sequence-help"
          }
          className="
            min-h-11
            min-w-0
            flex-1
            rounded-xl
            border
            border-neutral-300
            bg-transparent
            px-3
            py-2
            outline-none
            transition
            focus:border-neutral-500
            dark:border-neutral-700
            dark:focus:border-neutral-500
          "
        />

        <button
          type="submit"
          className="
            min-h-11
            shrink-0
            rounded-xl
            bg-neutral-950
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-neutral-800
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-neutral-500
            dark:bg-white
            dark:text-neutral-950
            dark:hover:bg-neutral-200
          "
        >
          Apply sequence
        </button>
      </div>

      <p
        id="quick-sequence-help"
        className="text-sm text-neutral-500"
      >
        Omit the denominator for /4. Use x to repeat: 5x2, 7/8x4, 4.
      </p>

      {error ? (
        <p
          id="quick-sequence-error"
          role="alert"
          className="
            text-sm
            font-medium
            text-red-600
            dark:text-red-400
          "
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}