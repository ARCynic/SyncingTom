import { clampInteger } from "@/lib/meter/sequence.js";

const MIN_CYCLES = 1;
const MAX_CYCLES = 999;

export function LoopControls({
  value,
  onChange,
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/35">
          Loop
        </p>
        <h2 className="mt-2 text-xl font-semibold text-white">
          {value.mode === "infinite"
            ? "Infinite"
            : `${value.cycles} cycles`}
        </h2>
        <p className="mt-1 text-sm text-white/35">
          One cycle is one complete pass through the sequence.
        </p>
      </div>

      <fieldset className="mt-5 grid grid-cols-2 gap-2">
        <legend className="sr-only">Loop mode</legend>

        <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2 text-sm font-medium text-white/65">
          <input
            type="radio"
            name="loop-mode"
            value="infinite"
            checked={value.mode === "infinite"}
            onChange={() =>
              onChange({
                ...value,
                mode: "infinite",
              })
            }
            className="accent-cyan-300"
          />
          Infinite
        </label>

        <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2 text-sm font-medium text-white/65">
          <input
            type="radio"
            name="loop-mode"
            value="fixed"
            checked={value.mode === "fixed"}
            onChange={() =>
              onChange({
                ...value,
                mode: "fixed",
              })
            }
            className="accent-emerald-300"
          />
          Fixed
        </label>
      </fieldset>

      {value.mode === "fixed" ? (
        <label className="mt-4 grid gap-1.5 text-sm">
          <span className="font-medium text-white/45">Cycles</span>

          <input
            type="number"
            min={MIN_CYCLES}
            max={MAX_CYCLES}
            step={1}
            value={value.cycles}
            onChange={(event) => {
              const cycles = event.currentTarget.valueAsNumber;

              if (!Number.isFinite(cycles)) {
                return;
              }

              onChange({
                mode: "fixed",
                cycles: clampInteger(
                  cycles,
                  MIN_CYCLES,
                  MAX_CYCLES,
                ),
              });
            }}
            className="min-h-11 rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-white outline-none focus:border-cyan-300/35"
          />
        </label>
      ) : null}
    </section>
  );
}
