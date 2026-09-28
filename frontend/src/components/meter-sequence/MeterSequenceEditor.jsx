import {
  MAX_NUMERATOR,
  MAX_REPETITIONS,
  MIN_NUMERATOR,
  MIN_REPETITIONS,
  SUPPORTED_DENOMINATORS,
  clampInteger,
  createMeterItem,
  moveSequenceItem,
} from "@/lib/meter/sequence.js";

export function MeterSequenceEditor({
  sequence,
  onChange,
}) {
  function replaceItem(index, item) {
    onChange(
      sequence.map((current, currentIndex) =>
        currentIndex === index ? item : current,
      ),
    );
  }

  function updateNumerator(index, value) {
    const item = sequence[index];

    if (!item) {
      return;
    }

    replaceItem(index, {
      ...item,
      meter: {
        ...item.meter,
        numerator: clampInteger(
          value,
          MIN_NUMERATOR,
          MAX_NUMERATOR,
        ),
      },
    });
  }

  function updateDenominator(index, denominator) {
    const item = sequence[index];

    if (!item) {
      return;
    }

    replaceItem(index, {
      ...item,
      meter: {
        ...item.meter,
        denominator,
      },
    });
  }

  function updateRepetitions(index, value) {
    const item = sequence[index];

    if (!item) {
      return;
    }

    replaceItem(index, {
      ...item,
      repetitions: clampInteger(
        value,
        MIN_REPETITIONS,
        MAX_REPETITIONS,
      ),
    });
  }

  function deleteItem(index) {
    if (sequence.length <= 1) {
      return;
    }

    onChange(
      sequence.filter(
        (_, currentIndex) => currentIndex !== index,
      ),
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {sequence.map((item, index) => (
          <article
            key={item.id}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_16px_50px_rgba(0,0,0,0.16)] transition hover:border-white/15"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200/45">
                Meter {index + 1}
              </p>

              <button
                type="button"
                onClick={() => deleteItem(index)}
                disabled={sequence.length <= 1}
                aria-label={`Delete meter ${index + 1}`}
                className="min-h-9 rounded-xl px-2 text-sm text-white/35 transition hover:bg-white/5 hover:text-white disabled:opacity-20"
              >
                Delete
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <label className="grid gap-1.5 text-sm">
                <span className="text-white/40">Beats</span>
                <input
                  type="number"
                  min={MIN_NUMERATOR}
                  max={MAX_NUMERATOR}
                  step={1}
                  value={item.meter.numerator}
                  onChange={(event) => {
                    const value = event.currentTarget.valueAsNumber;

                    if (Number.isFinite(value)) {
                      updateNumerator(index, value);
                    }
                  }}
                  aria-label={`Beats in meter ${index + 1}`}
                  className="min-h-11 w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-white outline-none focus:border-cyan-300/35"
                />
              </label>

              <label className="grid gap-1.5 text-sm">
                <span className="text-white/40">Beat unit</span>
                <select
                  value={item.meter.denominator}
                  onChange={(event) =>
                    updateDenominator(
                      index,
                      Number(event.target.value),
                    )
                  }
                  aria-label={`Beat unit for meter ${index + 1}`}
                  className="min-h-11 w-full rounded-xl border border-white/10 bg-[#0b0e0f] px-3 py-2 text-white outline-none focus:border-cyan-300/35"
                >
                  {SUPPORTED_DENOMINATORS.map((denominator) => (
                    <option key={denominator} value={denominator}>
                      {denominator}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-1.5 text-sm">
                <span className="text-white/40">Repeat</span>
                <input
                  type="number"
                  min={MIN_REPETITIONS}
                  max={MAX_REPETITIONS}
                  step={1}
                  value={item.repetitions}
                  onChange={(event) => {
                    const value = event.currentTarget.valueAsNumber;

                    if (Number.isFinite(value)) {
                      updateRepetitions(index, value);
                    }
                  }}
                  aria-label={`Repeat meter ${index + 1}`}
                  className="min-h-11 w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-white outline-none focus:border-cyan-300/35"
                />
              </label>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() =>
                  onChange(
                    moveSequenceItem(
                      sequence,
                      index,
                      index - 1,
                    ),
                  )
                }
                disabled={index === 0}
                aria-label={`Move meter ${index + 1} left`}
                className="min-h-10 flex-1 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2 text-sm font-medium text-white/60 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-20"
              >
                ← Left
              </button>

              <button
                type="button"
                onClick={() =>
                  onChange(
                    moveSequenceItem(
                      sequence,
                      index,
                      index + 1,
                    ),
                  )
                }
                disabled={index === sequence.length - 1}
                aria-label={`Move meter ${index + 1} right`}
                className="min-h-10 flex-1 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2 text-sm font-medium text-white/60 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-20"
              >
                Right →
              </button>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          onChange([
            ...sequence,
            createMeterItem(),
          ])
        }
        className="min-h-11 rounded-2xl border border-dashed border-white/15 bg-white/[0.015] px-4 py-2.5 text-sm font-semibold text-white/55 transition hover:border-cyan-300/30 hover:bg-white/[0.035] hover:text-white"
      >
        + Add Meter
      </button>
    </div>
  );
}
