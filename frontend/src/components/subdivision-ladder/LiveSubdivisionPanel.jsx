import {
  subdivisionName,
} from "@/lib/subdivision/ladder.js";

import {
  LadderProgress,
} from "./LadderProgress.jsx";

export function LiveSubdivisionPanel({
  meter,
  bpm,
  steps,
  loopSettings,
  playbackEvent,
  transportState,
}) {
  const cursor =
    playbackEvent?.cursor ?? {
      stepIndex: 0,
      barIndex: 0,
      beatIndex: 0,
      subdivisionIndex: 0,
      cycleIndex: 0,
    };

  const currentStep =
    playbackEvent?.step ??
    steps[
      cursor.stepIndex
    ] ??
    steps[0];

  if (!currentStep) {
    return null;
  }

  const active =
    Boolean(
      playbackEvent,
    ) &&
    transportState !==
      "stopped";

  const cycleTarget =
    loopSettings.mode ===
    "infinite"
      ? "∞"
      : loopSettings.cycles;

  const nextStep =
    playbackEvent?.nextStep;

  return (
    <aside
      className="
        relative
        overflow-hidden
        rounded-[1.75rem]
        border
        border-purple-300/15
        bg-black/35
        p-5
        sm:p-6
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-64
          w-64
          rounded-full
          bg-purple-400/[0.08]
          blur-3xl
        "
      />

      <div className="relative">
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div>
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-purple-300/55
              "
            >
              Current subdivision
            </p>

            <div
              className="
                mt-2
                flex
                items-end
                gap-3
              "
            >
              <span
                className="
                  text-6xl
                  font-semibold
                  tracking-[-0.06em]
                  text-white
                  sm:text-7xl
                "
              >
                {
                  currentStep.subdivision
                }
              </span>

              <span
                className="
                  mb-2
                  text-sm
                  font-semibold
                  text-white/35
                "
              >
                per beat
              </span>
            </div>

            <p
              className="
                mt-2
                text-sm
                text-white/50
              "
            >
              {subdivisionName(
                currentStep.subdivision,
                meter.denominator,
              )}
            </p>
          </div>

          <div
            className="
              text-right
              text-xs
              leading-5
              text-white/35
            "
          >
            <div>
              {meter.numerator}/
              {meter.denominator}
            </div>

            <div>
              {bpm} BPM
            </div>

            <div>
              Cycle{" "}
              {cursor.cycleIndex +
                1}{" "}
              / {cycleTarget}
            </div>
          </div>
        </div>

        {/* Subdivision dots */}

        <div
          className="
            mt-7
            rounded-2xl
            border
            border-white/[0.07]
            bg-black/25
            p-5
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-2
            "
          >
            {Array.from(
              {
                length:
                  currentStep.subdivision,
              },
              (_, index) => {
                const isActive =
                  active &&
                  cursor.subdivisionIndex ===
                    index;

                const isPulse =
                  index === 0;

                return (
                  <div
                    key={`${index}-${playbackEvent?.audioTime ?? "idle"}`}
                    className={[
                      "flex",
                      "h-11",
                      "w-11",
                      "items-center",
                      "justify-center",
                      "rounded-full",
                      "border",
                      "text-xs",
                      "font-bold",
                      "transition-all",
                      "duration-75",

                      isActive
                        ? [
                            "scale-110",
                            "border-transparent",
                            "bg-gradient-to-br",
                            "from-purple-300",
                            "to-emerald-300",
                            "text-black",
                            "shadow-[0_0_28px_rgba(192,132,252,0.24)]",
                          ].join(
                            " ",
                          )
                        : isPulse
                          ? [
                              "border-purple-300/30",
                              "bg-purple-300/[0.07]",
                              "text-purple-200",
                            ].join(
                              " ",
                            )
                          : [
                              "border-white/10",
                              "bg-white/[0.025]",
                              "text-white/35",
                            ].join(
                              " ",
                            ),
                    ].join(" ")}
                  >
                    {index + 1}
                  </div>
                );
              },
            )}
          </div>

          <div
            className="
              mt-5
              grid
              grid-cols-2
              gap-3
              text-center
              text-sm
            "
          >
            <div
              className="
                rounded-xl
                bg-white/[0.025]
                p-3
              "
            >
              <div
                className="
                  text-white/25
                "
              >
                Beat
              </div>

              <div
                className="
                  mt-1
                  font-semibold
                  text-white/75
                "
              >
                {cursor.beatIndex +
                  1}{" "}
                / {meter.numerator}
              </div>
            </div>

            <div
              className="
                rounded-xl
                bg-white/[0.025]
                p-3
              "
            >
              <div
                className="
                  text-white/25
                "
              >
                Bar
              </div>

              <div
                className="
                  mt-1
                  font-semibold
                  text-white/75
                "
              >
                {playbackEvent
                  ?.barNumber ??
                  1}{" "}
                /{" "}
                {playbackEvent
                  ?.totalBars ??
                  1}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div
            className="
              mb-3
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-white/30
              "
            >
              Ladder
            </span>

            <span
              className="
                text-xs
                text-white/30
              "
            >
              Next{" "}
              {nextStep
                ? `${nextStep.subdivision} per beat`
                : "—"}
            </span>
          </div>

          <LadderProgress
            steps={steps}
            denominator={
              meter.denominator
            }
            activeStepIndex={
              cursor.stepIndex
            }
            active={active}
          />
        </div>
      </div>
    </aside>
  );
}