import {
  MAX_CYCLES,
  MIN_CYCLES,
  clampInteger,
} from "@/lib/subdivision/ladder.js";

export function LoopControls({
  value,
  onChange,
}) {
  function setMode(mode) {
    onChange({
      ...value,
      mode,
    });
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
        Ladder loop
      </p>

      <div
        className="
          mt-4
          grid
          grid-cols-2
          gap-2
        "
      >
        <button
          type="button"
          onClick={() =>
            setMode("infinite")
          }
          className={[
            "min-h-12",
            "rounded-2xl",
            "border",
            "font-semibold",
            "transition",

            value.mode ===
            "infinite"
              ? [
                  "border-purple-300/40",
                  "bg-purple-300/10",
                  "text-purple-100",
                ].join(" ")
              : [
                  "border-white/10",
                  "bg-white/[0.025]",
                  "text-white/45",
                ].join(" "),
          ].join(" ")}
        >
          Infinite
        </button>

        <button
          type="button"
          onClick={() =>
            setMode("fixed")
          }
          className={[
            "min-h-12",
            "rounded-2xl",
            "border",
            "font-semibold",
            "transition",

            value.mode ===
            "fixed"
              ? [
                  "border-purple-300/40",
                  "bg-purple-300/10",
                  "text-purple-100",
                ].join(" ")
              : [
                  "border-white/10",
                  "bg-white/[0.025]",
                  "text-white/45",
                ].join(" "),
          ].join(" ")}
        >
          Fixed
        </button>
      </div>

      {value.mode ===
      "fixed" ? (
        <label
          className="
            mt-4
            block
          "
        >
          <span
            className="
              mb-2
              block
              text-xs
              text-white/40
            "
          >
            Cycles
          </span>

          <input
            type="number"
            min={MIN_CYCLES}
            max={MAX_CYCLES}
            value={
              value.cycles
            }
            onChange={(event) =>
              onChange({
                ...value,

                cycles:
                  clampInteger(
                    event.currentTarget
                      .valueAsNumber,

                    MIN_CYCLES,
                    MAX_CYCLES,
                  ),
              })
            }
            className="
              min-h-12
              w-full
              rounded-2xl
              border
              border-white/10
              bg-black/25
              px-3
              text-center
              font-semibold
              text-white
              outline-none
              focus:border-purple-300/40
            "
          />
        </label>
      ) : null}
    </section>
  );
}