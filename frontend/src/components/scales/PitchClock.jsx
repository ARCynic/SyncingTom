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

function pointOnCircle(radius, angleDegrees) {
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
}) {
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

export function PitchClock({
  activePitchClasses = [],
  rootPitchClass = null,
  className = "",
}) {
  const activeSet = new Set(
    activePitchClasses
      .map(normalizePitchClass)
      .filter(
        (value) =>
          value !== null,
      ),
  );

  const normalizedRoot =
    normalizePitchClass(
      rootPitchClass,
    );

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
          Chromatic pitch clock
        </title>

        <desc id="pitch-clock-description">
          Twelve pitch classes arranged
          around a circle in chromatic
          order, with C at twelve
          o'clock.
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

        {/* Subtle center glow */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r="102"
          fill="url(#pitch-clock-center-glow)"
        />

        {/* Outer chromatic ring */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={CLOCK_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.5"
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
        />

        {/* 12 clock ticks */}
        {PITCH_CLOCK_POSITIONS.map(
          (position, index) => {
            const angle =
              -90 + index * 30;

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
              index % 3 === 0;

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
              />
            );
          },
        )}

        {/* Pitch markers */}
        {PITCH_CLOCK_POSITIONS.map(
          (position, index) => {
            const angle =
              -90 + index * 30;

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
              normalizedRoot !== null &&
              normalizedRoot ===
                position.pitchClass;

            const appearance =
              getMarkerAppearance({
                isActive,
                isRoot,
              });

            return (
              <g
                key={position.pitchClass}
                aria-label={
                  position.spokenLabel
                }
              >
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={MARKER_RADIUS}
                  fill={
                    appearance.fill
                  }
                  stroke={
                    appearance.stroke
                  }
                  strokeWidth={
                    appearance.strokeWidth
                  }
                />

                {position.secondary ? (
                  <>
                    <text
                      x={point.x}
                      y={point.y - 4}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={
                        appearance.text
                      }
                      fontSize="13"
                      fontWeight="700"
                    >
                      {position.primary}
                    </text>

                    <text
                      x={point.x}
                      y={point.y + 11}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={
                        appearance.text
                      }
                      opacity="0.72"
                      fontSize="10"
                      fontWeight="600"
                    >
                      {position.secondary}
                    </text>
                  </>
                ) : (
                  <text
                    x={point.x}
                    y={point.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={
                      appearance.text
                    }
                    fontSize="15"
                    fontWeight="700"
                  >
                    {position.primary}
                  </text>
                )}
              </g>
            );
          },
        )}

        {/* Center label */}
        <text
          x={CENTER}
          y={CENTER - 8}
          textAnchor="middle"
          fill="rgba(255,255,255,0.72)"
          fontSize="14"
          fontWeight="700"
          letterSpacing="2"
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
        Fixed chromatic layout · C at
        12 o’clock
      </figcaption>
    </figure>
  );
}