import {
  MAX_STEP_BARS,
  MIN_STEP_BARS,
  SUBDIVISION_OPTIONS,
  clampInteger,
  subdivisionName,
} from "@/lib/subdivision/ladder.js";

export function LadderStep({
  step,
  index,
  total,
  denominator,
  onChange,
  onDelete,
  onMoveLeft,
  onMoveRight,
}) {
  return (
    <article
      className="
        rounded-3xl
        border
        border-white/10
        bg-black/20
        p-4
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-purple-300/45
            "
          >
            Step {index + 1}
          </p>

          <h3
            className="
              mt-1
              text-lg
              font-semibold
              text-white
            "
          >
            {subdivisionName(
              step.subdivision,
              denominator,
            )}
          </h3>
        </div>

        <button
          type="button"
          onClick={onDelete}
          disabled={total <= 1}
          className="
            rounded-xl
            border
            border-white/10
            px-3
            py-2
            text-xs
            font-semibold
            text-white/35
            transition
            hover:border-red-300/20
            hover:text-red-200
            disabled:opacity-20
          "
        >
          Delete
        </button>
      </div>

      <div
        className="
          mt-5
          grid
          grid-cols-2
          gap-3
        "
      >
        <label>
          <span
            className="
              mb-2
              block
              text-xs
              text-white/40
            "
          >
            Notes per beat
          </span>

          <select
            value={
              step.subdivision
            }
            onChange={(event) =>
              onChange({
                ...step,

                subdivision:
                  Number(
                    event.target
                      .value,
                  ),
              })
            }
            className="
              min-h-12
              w-full
              rounded-2xl
              border
              border-white/10
              bg-black/30
              px-3
              font-semibold
              text-white
              outline-none
              focus:border-purple-300/40
            "
          >
            {SUBDIVISION_OPTIONS.map(
              (value) => (
                <option
                  key={value}
                  value={value}
                >
                  {value} —{" "}
                  {subdivisionName(
                    value,
                    denominator,
                  )}
                </option>
              ),
            )}
          </select>
        </label>

        <label>
          <span
            className="
              mb-2
              block
              text-xs
              text-white/40
            "
          >
            Bars
          </span>

          <input
            type="number"
            min={MIN_STEP_BARS}
            max={MAX_STEP_BARS}
            value={step.bars}
            onChange={(event) =>
              onChange({
                ...step,

                bars:
                  clampInteger(
                    event.currentTarget
                      .valueAsNumber,

                    MIN_STEP_BARS,
                    MAX_STEP_BARS,
                  ),
              })
            }
            className="
              min-h-12
              w-full
              rounded-2xl
              border
              border-white/10
              bg-black/30
              px-3
              text-center
              font-semibold
              text-white
              outline-none
              focus:border-purple-300/40
            "
          />
        </label>
      </div>

      <div
        className="
          mt-4
          flex
          gap-2
        "
      >
        <button
          type="button"
          onClick={onMoveLeft}
          disabled={index === 0}
          className="
            min-h-10
            flex-1
            rounded-xl
            border
            border-white/10
            bg-white/[0.025]
            text-white/45
            transition
            hover:bg-white/[0.06]
            disabled:opacity-20
          "
        >
          ←
        </button>

        <button
          type="button"
          onClick={onMoveRight}
          disabled={
            index ===
            total - 1
          }
          className="
            min-h-10
            flex-1
            rounded-xl
            border
            border-white/10
            bg-white/[0.025]
            text-white/45
            transition
            hover:bg-white/[0.06]
            disabled:opacity-20
          "
        >
          →
        </button>
      </div>
    </article>
  );
}