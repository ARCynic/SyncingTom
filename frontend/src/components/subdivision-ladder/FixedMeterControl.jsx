import {
  MAX_NUMERATOR,
  MIN_NUMERATOR,
  SUPPORTED_DENOMINATORS,
  clampInteger,
} from "@/lib/subdivision/ladder.js";

export function FixedMeterControl({
  meter,
  onChange,
}) {
  function setNumerator(
    value,
  ) {
    onChange({
      ...meter,

      numerator:
        clampInteger(
          value,
          MIN_NUMERATOR,
          MAX_NUMERATOR,
        ),
    });
  }

  function setDenominator(
    value,
  ) {
    onChange({
      ...meter,

      denominator:
        Number(value),
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
        Fixed meter
      </p>

      <h2
        className="
          mt-2
          text-xl
          font-semibold
          text-white
        "
      >
        {meter.numerator}/
        {meter.denominator}
      </h2>

      <p
        className="
          mt-1
          text-sm
          text-white/35
        "
      >
        Meter stays unchanged
        throughout the ladder.
      </p>

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
              font-semibold
              text-white/40
            "
          >
            Beats
          </span>

          <input
            type="number"
            min={MIN_NUMERATOR}
            max={MAX_NUMERATOR}
            value={
              meter.numerator
            }
            onChange={(event) =>
              setNumerator(
                event.currentTarget
                  .valueAsNumber,
              )
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

        <label>
          <span
            className="
              mb-2
              block
              text-xs
              font-semibold
              text-white/40
            "
          >
            Beat unit
          </span>

          <select
            value={
              meter.denominator
            }
            onChange={(event) =>
              setDenominator(
                event.target.value,
              )
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
          >
            {SUPPORTED_DENOMINATORS.map(
              (value) => (
                <option
                  key={value}
                  value={value}
                >
                  {value}
                </option>
              ),
            )}
          </select>
        </label>
      </div>
    </section>
  );
}