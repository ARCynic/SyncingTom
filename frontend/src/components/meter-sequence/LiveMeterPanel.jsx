import {
  useState,
} from "react";

import {
  SequenceProgress,
} from "./SequenceProgress.jsx";

const COUNT_MODES = [
  {
    key: "meter",
    label: "Meter count",
  },

  {
    key: "standard",
    label: "Standard",
  },

  {
    key: "accent",
    label: "Accent only",
  },
];

function countBars(sequence) {
  return sequence.reduce(
    (total, item) =>
      total +
      item.repetitions,
    0,
  );
}

function cloneMeter(meter) {
  if (!meter) {
    return null;
  }

  return {
    numerator:
      meter.numerator,

    denominator:
      meter.denominator,
  };
}

function getFallbackNextMeter(
  sequence,
  cursor,
  loopSettings,
) {
  const currentItem =
    sequence[
      cursor.sequenceIndex
    ] ??
    sequence[0];

  if (!currentItem) {
    return null;
  }

  if (
    cursor.repetitionIndex +
      1 <
    currentItem.repetitions
  ) {
    return cloneMeter(
      currentItem.meter,
    );
  }

  const nextItem =
    sequence[
      cursor.sequenceIndex +
        1
    ];

  if (nextItem) {
    return cloneMeter(
      nextItem.meter,
    );
  }

  const anotherCycleExists =
    loopSettings.mode ===
      "infinite" ||
    cursor.cycleIndex + 1 <
      loopSettings.cycles;

  if (!anotherCycleExists) {
    return null;
  }

  return cloneMeter(
    sequence[0]?.meter,
  );
}

function buildBeatLabels(
  numerator,
  countMode,
) {
  return Array.from(
    {
      length: numerator,
    },

    (_, index) => {
      const beatNumber =
        index + 1;

      /*
       * Meter Count:
       *
       * 5/4
       * 5 2 3 4 5
       *
       * 7/8
       * 7 2 3 4 5 6 7
       */
      if (
        countMode ===
        "meter"
      ) {
        return index === 0
          ? numerator
          : beatNumber;
      }

      if (
        countMode ===
        "accent"
      ) {
        return index === 0
          ? "●"
          : "•";
      }

      return beatNumber;
    },
  );
}

function formatMeter(meter) {
  if (!meter) {
    return "—";
  }

  return (
    `${meter.numerator}/` +
    `${meter.denominator}`
  );
}

function CountModeButton({
  active,
  children,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full",
        "px-3 py-1.5",
        "text-[11px]",
        "font-bold",
        "uppercase",
        "tracking-[0.1em]",
        "transition",

        active
          ? "bg-white text-black"
          : [
              "bg-white/[0.035]",
              "text-white/40",
              "hover:bg-white/[0.07]",
              "hover:text-white/70",
            ].join(" "),
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function LiveMeterPanel({
  sequence,
  playbackBeat,
  transportState,
  loopSettings,
}) {
  const [
    countMode,
    setCountMode,
  ] = useState("meter");

  const cursor =
    playbackBeat?.cursor ?? {
      sequenceIndex: 0,
      repetitionIndex: 0,
      beatIndex: 0,
      cycleIndex: 0,
    };

  const currentItem =
    sequence[
      cursor.sequenceIndex
    ] ??
    sequence[0] ??
    null;

  const currentMeter =
    playbackBeat?.meter ??
    currentItem?.meter ?? {
      numerator: 4,
      denominator: 4,
    };

  const repetitions =
    playbackBeat?.repetitions ??
    currentItem?.repetitions ??
    1;

  const barNumber =
    playbackBeat?.barNumber ??
    1;

  const totalBars =
    playbackBeat?.totalBars ??
    countBars(sequence);

  const nextMeter =
    playbackBeat?.nextMeter ??
    getFallbackNextMeter(
      sequence,
      cursor,
      loopSettings,
    );

  const activeBeatIndex =
    transportState ===
      "stopped" ||
    !playbackBeat
      ? null
      : cursor.beatIndex;

  const labels =
    buildBeatLabels(
      currentMeter.numerator,
      countMode,
    );

  const cycleNumber =
    cursor.cycleIndex + 1;

  const cycleTarget =
    loopSettings.mode ===
    "infinite"
      ? "∞"
      : loopSettings.cycles;

  /*
   * Changes on every new bar.
   * This retriggers the small
   * meter transition animation.
   */
  const panelKey =
    `${cursor.cycleIndex}-` +
    `${cursor.sequenceIndex}-` +
    `${cursor.repetitionIndex}`;

  return (
    <aside
      aria-label="Live meter display"
      className="
        relative
        overflow-hidden
        rounded-[1.75rem]
        border
        border-purple-300/15
        bg-black/35
        p-5
        shadow-[0_24px_80px_rgba(0,0,0,0.32)]
        sm:p-6
      "
    >
      {/* Background glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-purple-400/[0.08]
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-28
          -left-20
          h-64
          w-64
          rounded-full
          bg-emerald-400/[0.06]
          blur-3xl
        "
      />

      <div className="relative">
        {/* Meter header */}

        <div
          className="
            flex
            flex-wrap
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
                text-purple-300/60
              "
            >
              Live meter
            </p>

            <div
              key={panelKey}
              className="
                syncingtom-meter-in
                mt-2
                flex
                items-end
                gap-3
              "
            >
              <span
                aria-live="polite"
                className="
                  text-5xl
                  font-semibold
                  tracking-[-0.06em]
                  text-white
                  sm:text-6xl
                "
              >
                {
                  currentMeter
                    .numerator
                }

                <span
                  className="
                    mx-1
                    text-white/20
                  "
                >
                  /
                </span>

                <span
                  className="
                    text-white/55
                  "
                >
                  {
                    currentMeter
                      .denominator
                  }
                </span>
              </span>

              <span
                className="
                  mb-1
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.035]
                  px-2.5
                  py-1
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-white/40
                "
              >
                {transportState}
              </span>
            </div>
          </div>

          {/* Current position */}

          <div
            className="
              text-right
              text-xs
              leading-5
              text-white/35
            "
          >
            <div>
              Bar{" "}
              <span
                className="
                  text-white/65
                "
              >
                {barNumber}
              </span>{" "}
              / {totalBars || 1}
            </div>

            <div>
              Cycle{" "}
              <span
                className="
                  text-white/65
                "
              >
                {cycleNumber}
              </span>{" "}
              / {cycleTarget}
            </div>

            {repetitions > 1 ? (
              <div>
                Repeat{" "}
                {
                  cursor.repetitionIndex +
                  1
                }{" "}
                / {repetitions}
              </div>
            ) : null}
          </div>
        </div>

        {/* Counting mode */}

        <div
          className="
            mt-5
            flex
            flex-wrap
            gap-2
          "
        >
          {COUNT_MODES.map(
            (mode) => (
              <CountModeButton
                key={mode.key}
                active={
                  countMode ===
                  mode.key
                }
                onClick={() =>
                  setCountMode(
                    mode.key,
                  )
                }
              >
                {mode.label}
              </CountModeButton>
            ),
          )}
        </div>

        {/* Beat display */}

        <div
          className="
            mt-7
            rounded-2xl
            border
            border-white/[0.07]
            bg-black/25
            p-4
            sm:p-5
          "
        >
          <div
            key={
              `${panelKey}-` +
              `${countMode}`
            }
            role="list"
            aria-label={
              `${currentMeter.numerator}/` +
              `${currentMeter.denominator} beat count`
            }
            className="
              flex
              flex-wrap
              justify-center
              gap-2
              sm:gap-3
            "
          >
            {labels.map(
              (
                label,
                index,
              ) => {
                const isActive =
                  activeBeatIndex ===
                  index;

                const isDownbeat =
                  index === 0;

                return (
                  <div
                    key={
                      `${index}-` +
                      `${
                        isActive
                          ? playbackBeat?.audioTime ??
                            "active"
                          : "idle"
                      }`
                    }
                    role="listitem"
                    aria-current={
                      isActive
                        ? "step"
                        : undefined
                    }
                    aria-label={
                      `Beat ${index + 1} ` +
                      `of ${currentMeter.numerator}` +
                      `${
                        isDownbeat
                          ? ", bar start"
                          : ""
                      }`
                    }
                    className={[
                      "flex",
                      "h-14",
                      "min-w-12",
                      "items-center",
                      "justify-center",
                      "rounded-2xl",
                      "border",
                      "px-3",
                      "text-lg",
                      "font-bold",
                      "tabular-nums",
                      "transition-all",
                      "duration-100",
                      "sm:h-16",
                      "sm:min-w-14",
                      "sm:text-xl",

                      isActive
                        ? [
                            "syncingtom-beat-pop",
                            "scale-110",
                            "border-transparent",
                            "bg-gradient-to-br",
                            "from-purple-300",
                            "to-emerald-300",
                            "text-black",
                            "shadow-[0_0_32px_rgba(192,132,252,0.22)]",
                          ].join(
                            " ",
                          )
                        : isDownbeat
                          ? [
                              "border-purple-300/30",
                              "bg-purple-300/[0.06]",
                              "text-purple-200",
                            ].join(
                              " ",
                            )
                          : [
                              "border-white/[0.08]",
                              "bg-white/[0.025]",
                              "text-white/45",
                            ].join(
                              " ",
                            ),
                    ].join(" ")}
                  >
                    {label}
                  </div>
                );
              },
            )}
          </div>

          <div
            className="
              mt-4
              text-center
              text-sm
              text-white/35
            "
          >
            {activeBeatIndex ===
            null ? (
              <span>
                Press Play to start
                the visual count.
              </span>
            ) : (
              <span>
                Beat{" "}
                {activeBeatIndex +
                  1}{" "}
                of{" "}
                {
                  currentMeter.numerator
                }
              </span>
            )}
          </div>
        </div>

        {/* Sequence */}

        <div className="mt-6">
          <div
            className="
              mb-2
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-white/30
              "
            >
              Sequence
            </p>

            <p
              className="
                text-xs
                text-white/30
              "
            >
              Next{" "}
              {formatMeter(
                nextMeter,
              )}
            </p>
          </div>

          <SequenceProgress
            sequence={sequence}
            activeSequenceIndex={
              cursor.sequenceIndex
            }
            active={
              transportState !==
                "stopped" &&
              Boolean(
                playbackBeat,
              )
            }
          />
        </div>
      </div>
    </aside>
  );
}