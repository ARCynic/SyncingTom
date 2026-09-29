import {
  MAX_BPM,
  MIN_BPM,
  clampInteger,
} from "@/lib/subdivision/ladder.js";

export function BPMControl({
  bpm,
  onChange,
}) {
  function setBpm(value) {
    onChange(
      clampInteger(
        value,
        MIN_BPM,
        MAX_BPM,
      ),
    );
  }

  return (
    <section
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.025]
        p-5
      "
    >
      <p
        className="
          text-xs
          font-bold
          uppercase
          tracking-[0.16em]
          text-white/35
        "
      >
        Tempo
      </p>

      <h2
        className="
          mt-2
          text-xl
          font-semibold
          text-white
        "
      >
        {bpm} BPM
      </h2>

      <p
        className="
          mt-1
          text-sm
          text-white/35
        "
      >
        Quarter-note tempo
      </p>

      <div
        className="
          mt-5
          flex
          items-center
          gap-2
        "
      >
        <button
          type="button"
          onClick={() =>
            setBpm(bpm - 1)
          }
          disabled={
            bpm <= MIN_BPM
          }
          className="
            min-h-12
            min-w-12
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            text-lg
            font-semibold
            text-white
            transition
            hover:bg-white/[0.07]
            disabled:opacity-20
          "
        >
          −
        </button>

        <input
          type="number"
          min={MIN_BPM}
          max={MAX_BPM}
          value={bpm}
          onChange={(event) => {
            const value =
              event.currentTarget
                .valueAsNumber;

            if (
              Number.isFinite(
                value,
              )
            ) {
              setBpm(value);
            }
          }}
          className="
            min-h-12
            min-w-0
            flex-1
            rounded-2xl
            border
            border-white/10
            bg-black/25
            px-3
            text-center
            text-lg
            font-semibold
            text-white
            outline-none
            focus:border-purple-300/40
          "
        />

        <button
          type="button"
          onClick={() =>
            setBpm(bpm + 1)
          }
          disabled={
            bpm >= MAX_BPM
          }
          className="
            min-h-12
            min-w-12
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            text-lg
            font-semibold
            text-white
            transition
            hover:bg-white/[0.07]
            disabled:opacity-20
          "
        >
          +
        </button>
      </div>
    </section>
  );
}