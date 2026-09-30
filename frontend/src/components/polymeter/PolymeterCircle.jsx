const SIZE =
  300;

const CENTER =
  SIZE / 2;

const RADIUS =
  105;

const MARKER_RADIUS =
  18;

function pointOnCircle(
  radius,
  angleDegrees,
) {
  const radians =
    (
      angleDegrees *
      Math.PI
    ) /
    180;

  return {
    x:
      CENTER +
      Math.cos(radians) *
        radius,

    y:
      CENTER +
      Math.sin(radians) *
        radius,
  };
}

export function PolymeterCircle({
  pattern,
  currentStep = null,
  instrumentName,
  accent,
  muted = false,
  onToggleStep,
}) {
  const stepCount =
    pattern.length;

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="group"
      aria-label={`${instrumentName}, ${stepCount} step pattern`}
      className="
        mx-auto
        block
        h-auto
        w-full
        max-w-[20rem]
        overflow-visible
      "
    >
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1.5"
      />

      <circle
        cx={CENTER}
        cy={CENTER}
        r="64"
        fill="rgba(255,255,255,0.015)"
        stroke="rgba(255,255,255,0.04)"
      />

      <text
        x={CENTER}
        y={CENTER - 7}
        textAnchor="middle"
        fill={
          muted
            ? "rgba(255,255,255,0.25)"
            : "rgba(255,255,255,0.78)"
        }
        fontSize="15"
        fontWeight="700"
      >
        {instrumentName}
      </text>

      <text
        x={CENTER}
        y={CENTER + 16}
        textAnchor="middle"
        fill="rgba(255,255,255,0.3)"
        fontSize="11"
        fontWeight="600"
      >
        {stepCount} STEPS
      </text>

      {pattern.map(
        (
          isHit,
          index,
        ) => {
          const angle =
            -90 +
            (
              index /
              stepCount
            ) *
              360;

          const point =
            pointOnCircle(
              RADIUS,
              angle,
            );

          const isCurrent =
            currentStep ===
            index;

          const markerFill =
            isHit
              ? accent
              : "#0d0f11";

          const markerStroke =
            isCurrent
              ? "#ffffff"
              : isHit
                ? accent
                : "rgba(255,255,255,0.16)";

          function activate() {
            onToggleStep(
              index,
            );
          }

          function handleKeyDown(
            event,
          ) {
            if (
              event.key !==
                "Enter" &&
              event.key !== " "
            ) {
              return;
            }

            event.preventDefault();

            activate();
          }

          return (
            <g
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`Step ${index + 1}, ${
                isHit
                  ? "hit"
                  : "rest"
              }`}
              onClick={
                activate
              }
              onKeyDown={
                handleKeyDown
              }
              className="cursor-pointer outline-none"
            >
              {isCurrent ? (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={
                    MARKER_RADIUS +
                    7
                  }
                  fill="none"
                  stroke={accent}
                  strokeWidth="2.5"
                  opacity="0.45"
                  pointerEvents="none"
                />
              ) : null}

              <circle
                cx={point.x}
                cy={point.y}
                r={
                  MARKER_RADIUS +
                  7
                }
                fill="transparent"
              />

              <circle
                cx={point.x}
                cy={point.y}
                r={
                  MARKER_RADIUS
                }
                fill={
                  markerFill
                }
                fillOpacity={
                  muted
                    ? 0.3
                    : isHit
                      ? 0.8
                      : 1
                }
                stroke={
                  markerStroke
                }
                strokeWidth={
                  isCurrent
                    ? 3
                    : 1.5
                }
                pointerEvents="none"
              />

              <text
                x={point.x}
                y={
                  point.y +
                  1
                }
                textAnchor="middle"
                dominantBaseline="middle"
                fill={
                  isHit
                    ? "#050708"
                    : "rgba(255,255,255,0.45)"
                }
                fontSize="11"
                fontWeight="800"
                pointerEvents="none"
              >
                {index + 1}
              </text>
            </g>
          );
        },
      )}
    </svg>
  );
}