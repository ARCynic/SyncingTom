import {
  subdivisionName,
} from "@/lib/subdivision/ladder.js";

export function LadderProgress({
  steps,
  denominator,
  activeStepIndex,
  active,
}) {
  return (
    <div
      className="
        overflow-x-auto
        pb-2
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
        {steps.map(
          (step, index) => {
            const isActive =
              active &&
              index ===
                activeStepIndex;

            return (
              <div
                key={step.id}
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <div
                  className={[
                    "rounded-2xl",
                    "border",
                    "px-4",
                    "py-3",
                    "transition-all",
                    "duration-100",

                    isActive
                      ? [
                          "border-transparent",
                          "bg-gradient-to-r",
                          "from-purple-300",
                          "to-emerald-300",
                          "text-black",
                          "shadow-[0_0_24px_rgba(192,132,252,0.18)]",
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
                  <div
                    className="
                      text-lg
                      font-bold
                    "
                  >
                    {
                      step.subdivision
                    }
                  </div>

                  <div
                    className={[
                      "mt-0.5",
                      "text-[9px]",
                      "font-bold",
                      "uppercase",
                      "tracking-[0.1em]",

                      isActive
                        ? "text-black/55"
                        : "text-white/25",
                    ].join(" ")}
                  >
                    {subdivisionName(
                      step.subdivision,
                      denominator,
                    )}
                  </div>

                  {step.bars > 1 ? (
                    <div
                      className={[
                        "mt-1",
                        "text-[10px]",

                        isActive
                          ? "text-black/55"
                          : "text-white/25",
                      ].join(" ")}
                    >
                      {step.bars} bars
                    </div>
                  ) : null}
                </div>

                {index <
                steps.length -
                  1 ? (
                  <span
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