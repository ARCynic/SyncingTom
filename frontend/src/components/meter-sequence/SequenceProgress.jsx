import {
  memo,
} from "react";

function SequenceProgressComponent({
  sequence,
  activeSequenceIndex = 0,
  active = false,
}) {
  return (
    <div
      className="
        overflow-x-auto
        pb-1
      "
    >
      <div
        className="
          flex
          min-w-max
          items-center
          gap-2
        "
      >
        {sequence.map(
          (
            item,
            index,
          ) => {
            const isActive =
              active &&
              index ===
                activeSequenceIndex;

            return (
              <div
                key={
                  item.id ??
                  `${item.meter.numerator}-${item.meter.denominator}-${index}`
                }
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <div
                  aria-current={
                    isActive
                      ? "step"
                      : undefined
                  }
                  className={[
                    "rounded-xl border px-3 py-2",
                    "text-sm font-semibold",
                    "transition-all duration-150",

                    isActive
                      ? [
                          "border-purple-300/50",
                          "bg-gradient-to-r",
                          "from-purple-300",
                          "to-emerald-300",
                          "text-black",
                          "shadow-[0_0_24px_rgba(192,132,252,0.16)]",
                        ].join(
                          " ",
                        )
                      : [
                          "border-white/10",
                          "bg-white/[0.025]",
                          "text-white/45",
                        ].join(
                          " ",
                        ),
                  ].join(" ")}
                >
                  {
                    item.meter
                      .numerator
                  }
                  /
                  {
                    item.meter
                      .denominator
                  }

                  {item.repetitions >
                  1 ? (
                    <span
                      className={
                        isActive
                          ? "text-black/60"
                          : "text-white/25"
                      }
                    >
                      {" "}
                      ×
                      {
                        item.repetitions
                      }
                    </span>
                  ) : null}
                </div>

                {index <
                sequence.length -
                  1 ? (
                  <span
                    aria-hidden="true"
                    className="
                      text-white/20
                    "
                  >
                    →
                  </span>
                ) : null}
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}

export const SequenceProgress =
  memo(
    SequenceProgressComponent,
  );