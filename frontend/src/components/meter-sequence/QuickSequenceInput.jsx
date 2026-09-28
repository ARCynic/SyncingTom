import {
  useEffect,
  useRef,
  useState,
} from "react";

import { parseMeterSequence } from "@/lib/meter/parser.js";
import { formatMeterSequence } from "@/lib/meter/sequence.js";

export function QuickSequenceInput({
  sequence,
  onApply,
}) {
  const inputRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.value = formatMeterSequence(sequence);
  }, [sequence]);

  function handleSubmit(event) {
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
        className="block text-xs font-bold uppercase tracking-[0.16em] text-white/45"
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
          className="min-h-12 min-w-0 flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 py-2 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/35 focus:ring-2 focus:ring-cyan-300/10"
        />

        <button
          type="submit"
          className="min-h-12 shrink-0 rounded-2xl bg-gradient-to-r from-cyan-300 to-emerald-300 px-5 py-2.5 text-sm font-bold text-black transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
        >
          Apply sequence
        </button>
      </div>

      <p
        id="quick-sequence-help"
        className="text-sm leading-6 text-white/35"
      >
        Omit the denominator for /4. Use x to repeat: 5x2, 7/8x4, 4.
      </p>

      {error ? (
        <p
          id="quick-sequence-error"
          role="alert"
          className="text-sm font-medium text-red-300"
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}
