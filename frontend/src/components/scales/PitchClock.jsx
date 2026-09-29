import {
  normalizePitchClass,
  PITCH_CLOCK_POSITIONS,
} from "@/lib/scales/pitchClasses.js";

const SIZE = 420;
const CENTER = SIZE / 2;

const CLOCK_RADIUS = 146;
const MARKER_RADIUS = 27;

const TICK_INNER_RADIUS = 108;
const TICK_OUTER_RADIUS = 119;

function pointOnCircle(
  radius,
  angleDegrees,
) {
  const angleRadians =
    (angleDegrees * Math.PI) /
    180;

  return {
    x:
      CENTER +
      Math.cos(angleRadians) *
        radius,

    y:
      CENTER +
      Math.sin(angleRadians) *
        radius,
  };
}

function getMarkerAppearance({
  isActive,
  isRoot,
  isPlaying,
}) {
  if (isPlaying) {
    return {
      fill:
        "color-mix(in srgb, var(--scale-accent-2) 32%, #09090b)",

      stroke:
        "var(--scale-accent-2)",

      text:
        "#ffffff",

      strokeWidth: 3.2,
    };
  }

  if (isRoot) {
    return {
      fill:
        "color-mix(in srgb, var(--scale-accent) 24%, #09090b)",

      stroke:
        "var(--scale-accent)",

      text:
        "#ffffff",

      strokeWidth: 2.4,
    };
  }

  if (isActive) {
    return {
      fill:
        "color-mix(in srgb, var(--scale-accent) 13%, #09090b)",

      stroke:
        "color-mix(in srgb, var(--scale-accent) 78%, transparent)",

      text:
        "#e6fbff",

      strokeWidth: 1.8,
    };
  }

  return {
    fill: "#0d0f11",

    stroke:
      "rgba(255,255,255,0.11)",

    text:
      "rgba(255,255,255,0.46)",

    strokeWidth: 1.25,
  };
}

function createAriaLabel(
  position,
  isActive,
  isRoot,
  isPlaying,
) {
  const states = [];

  if (isPlaying) {
    states.push(
      "currently playing",
    );
  }

  if (isRoot) {
    states.push(
      "root note",
    );
  }

  if (isActive) {
    states.push(
      "part of the current scale",
    );
  } else {
    states.push(
      "not part of the current scale",
    );
  }

  return [
    position.spokenLabel,
    ...states,
  ].join(", ");
}

function buildClockPositions(
  rootPitchClass,
) {
  const clockRoot =
    rootPitchClass ?? 0;

  return Array.from(
    {
      length: 12,
    },
    (_, index) => {
      const pitchClass =
        (
          clockRoot +
          index
        ) % 12;

      return PITCH_CLOCK_POSITIONS[
        pitchClass
      ];
    },
  );
}

export function PitchClock({
  activePitchClasses = [],
  rootPitchClass = null,
  playbackPitchClass = null,
  onPitchSelect = null,
  className = "",
}) {
  const activeSet = new Set(
    activePitchClasses
      .map(
        normalizePitchClass,
      )
      .filter(
        (value) =>
          value !== null,
      ),
  );

  const normalizedRoot =
    normalizePitchClass(
      rootPitchClass,
    );

  const normalizedPlaybackPitch =
    normalizePitchClass(
      playbackPitchClass,
    );

  /*
   * Rotate the visual clock so
   * the selected root is always
   * at 12 o'clock.
   *
   * Pitch-class values remain
   * absolute. Only their visual
   * positions change.
   */
  const clockPositions =
    buildClockPositions(
      normalizedRoot,
    );

  const interactive =
    typeof onPitchSelect ===
    "function";

  function activatePitch(
    position,
    isActive,
    isRoot,
  ) {
    if (!interactive) {
      return;
    }

    onPitchSelect({
      pitchClass:
        position.pitchClass,

      primary:
        position.primary,

      secondary:
        position.secondary,

      spokenLabel:
        position.spokenLabel,

      isScaleTone:
        isActive,

      isRoot,
    });
  }

  return (
    <figure
      className={[
        "mx-auto w-full max-w-[34rem]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-labelledby="pitch-clock-title pitch-clock-description"
        className="
          block
          h-auto
          w-full
          overflow-visible
        "
      >
        <title id="pitch-clock-title">
          Root-relative pitch clock
        </title>

        <desc id="pitch-clock-description">
          Twelve pitch classes
          arranged around a circle
          in chromatic order, with
          the selected root at
          twelve o'clock. The
          currently playing pitch
          is highlighted. Each
          pitch can be selected
          with a mouse, touch,
          Enter, or Space.
        </desc>

        <defs>
          <radialGradient
            id="pitch-clock-center-glow"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop
              offset="0%"
              stopColor="var(--scale-accent)"
              stopOpacity="0.07"
            />

            <stop
              offset="65%"
              stopColor="var(--scale-accent)"
              stopOpacity="0.015"
            />

            <stop
              offset="100%"
              stopColor="#09090b"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        {/* Center glow */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r="102"
          fill="url(#pitch-clock-center-glow)"
          pointerEvents="none"
        />

        {/* Outer ring */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={CLOCK_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.5"
          pointerEvents="none"
        />

        {/* Inner reference ring */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r="92"
          fill="none"
          stroke="rgba(255,255,255,0.045)"
          strokeWidth="1"
          strokeDasharray="3 7"
          pointerEvents="none"
        />

        {/* Clock ticks */}
        {clockPositions.map(
          (
            position,
            index,
          ) => {
            const angle =
              -90 +
              index * 30;

            const inner =
              pointOnCircle(
                TICK_INNER_RADIUS,
                angle,
              );

            const outer =
              pointOnCircle(
                TICK_OUTER_RADIUS,
                angle,
              );

            const isQuarter =
              index % 3 ===
              0;

            return (
              <line
                key={`tick-${position.pitchClass}`}
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke={
                  isQuarter
                    ? "rgba(103,232,249,0.28)"
                    : "rgba(255,255,255,0.10)"
                }
                strokeWidth={
                  isQuarter
                    ? 2
                    : 1
                }
                strokeLinecap="round"
                pointerEvents="none"
              />
            );
          },
        )}

        {/* Pitch markers */}
        {clockPositions.map(
          (
            position,
            index,
          ) => {
            const angle =
              -90 +
              index * 30;

            const point =
              pointOnCircle(
                CLOCK_RADIUS,
                angle,
              );

            const isActive =
              activeSet.has(
                position.pitchClass,
              );

            const isRoot =
              normalizedRoot !==
                null &&
              normalizedRoot ===
                position.pitchClass;

            const isPlaying =
              normalizedPlaybackPitch !==
                null &&
              normalizedPlaybackPitch ===
                position.pitchClass;

            const appearance =
              getMarkerAppearance({
                isActive,
                isRoot,
                isPlaying,
              });

            const ariaLabel =
              createAriaLabel(
                position,
                isActive,
                isRoot,
                isPlaying,
              );

            function handleActivate() {
              activatePitch(
                position,
                isActive,
                isRoot,
              );
            }

            function handleKeyDown(
              event,
            ) {
              if (
                event.key !==
                  "Enter" &&
                event.key !==
                  " "
              ) {
                return;
              }

              event.preventDefault();

              handleActivate();
            }

            return (
              <g
                key={
                  position.pitchClass
                }
                className={
                  interactive
                    ? "pitch-clock-note"
                    : undefined
                }
                role={
                  interactive
                    ? "button"
                    : undefined
                }
                tabIndex={
                  interactive
                    ? 0
                    : undefined
                }
                aria-label={
                  interactive
                    ? ariaLabel
                    : undefined
                }
                onClick={
                  interactive
                    ? handleActivate
                    : undefined
                }
                onKeyDown={
                  interactive
                    ? handleKeyDown
                    : undefined
                }
              >
                {/* Larger invisible interaction target */}
                {interactive ? (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={
                      MARKER_RADIUS +
                      7
                    }
                    fill="transparent"
                    className="pitch-clock-hit-area"
                  />
                ) : null}

                {/* Playback halo */}
                {isPlaying ? (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={
                      MARKER_RADIUS +
                      7
                    }
                    fill="none"
                    stroke="var(--scale-accent-2)"
                    strokeWidth="2"
                    opacity="0.5"
                    pointerEvents="none"
                    className="pitch-clock-playback-ring"
                  />
                ) : null}

                {/* Visible pitch marker */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={
                    MARKER_RADIUS
                  }
                  fill={
                    appearance.fill
                  }
                  stroke={
                    appearance.stroke
                  }
                  strokeWidth={
                    appearance.strokeWidth
                  }
                  className={[
                    "pitch-clock-marker",
                    isPlaying
                      ? "pitch-clock-marker-playing"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  pointerEvents="none"
                />

                {position.secondary ? (
                  <>
                    <text
                      x={point.x}
                      y={
                        point.y -
                        4
                      }
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={
                        appearance.text
                      }
                      fontSize="13"
                      fontWeight="700"
                      pointerEvents="none"
                    >
                      {
                        position.primary
                      }
                    </text>

                    <text
                      x={point.x}
                      y={
                        point.y +
                        11
                      }
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={
                        appearance.text
                      }
                      opacity="0.72"
                      fontSize="10"
                      fontWeight="600"
                      pointerEvents="none"
                    >
                      {
                        position.secondary
                      }
                    </text>
                  </>
                ) : (
                  <text
                    x={point.x}
                    y={
                      point.y +
                      1
                    }
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={
                      appearance.text
                    }
                    fontSize="15"
                    fontWeight="700"
                    pointerEvents="none"
                  >
                    {
                      position.primary
                    }
                  </text>
                )}
              </g>
            );
          },
        )}

        {/* Center */}
        <text
          x={CENTER}
          y={CENTER - 8}
          textAnchor="middle"
          fill="rgba(255,255,255,0.72)"
          fontSize="14"
          fontWeight="700"
          letterSpacing="2"
          pointerEvents="none"
        >
          CHROMATIC
        </text>

        <text
          x={CENTER}
          y={CENTER + 16}
          textAnchor="middle"
          fill="rgba(255,255,255,0.28)"
          fontSize="11"
          fontWeight="600"
          letterSpacing="1.5"
          pointerEvents="none"
        >
          12 PITCH CLASSES
        </text>
      </svg>

      <figcaption
        className="
          mt-2
          text-center
          text-xs
          leading-5
          text-white/30
        "
      >
        Select any chromatic
        pitch · Root fixed at
        12 o’clock
      </figcaption>
    </figure>
  );
}