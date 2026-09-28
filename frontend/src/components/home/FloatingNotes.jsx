import { useMemo } from "react";
import { motion } from "motion/react";

const COLORS = [
  "#d8b4fe",
  "#c084fc",
  "#6ee7b7",
  "#a7f3d0",
  "#ffffff",
];

const DEPTHS = [
  {
    name: "far",
    size: [18, 30],
    opacity: [0.08, 0.22],
    blur: [0.8, 1.8],
    duration: [20, 32],
    drift: 35,
  },
  {
    name: "mid",
    size: [28, 48],
    opacity: [0.18, 0.42],
    blur: [0, 0.7],
    duration: [14, 24],
    drift: 55,
  },
  {
    name: "near",
    size: [42, 68],
    opacity: [0.3, 0.65],
    blur: [0, 0.15],
    duration: [11, 18],
    drift: 80,
  },
];

function mulberry32(seed) {
  return function random() {
    let value =
      (seed += 0x6d2b79f5);

    value = Math.imul(
      value ^ (value >>> 15),
      value | 1,
    );

    value ^=
      value +
      Math.imul(
        value ^ (value >>> 7),
        value | 61,
      );

    return (
      ((value ^
        (value >>> 14)) >>>
        0) /
      4294967296
    );
  };
}

function between(
  random,
  min,
  max,
) {
  return (
    min +
    random() * (max - min)
  );
}

function choose(
  random,
  items,
) {
  return items[
    Math.floor(
      random() * items.length,
    )
  ];
}

/* -----------------------------
   MUSICAL SVG SYMBOLS
----------------------------- */

function QuarterNote() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-full w-full"
    >
      <ellipse
        cx="15"
        cy="35"
        rx="7"
        ry="5"
        transform="rotate(-18 15 35)"
        fill="currentColor"
      />

      <path
        d="M21 33V8"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EighthNote() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-full w-full"
    >
      <ellipse
        cx="14"
        cy="35"
        rx="7"
        ry="5"
        transform="rotate(-18 14 35)"
        fill="currentColor"
      />

      <path
        d="M20 33V8"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="
          M20 9
          C30 9 37 13 38 22
          C34 18 30 16 26 16
        "
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DoubleNote() {
  return (
    <svg
      viewBox="0 0 52 48"
      fill="none"
      className="h-full w-full"
    >
      <ellipse
        cx="13"
        cy="36"
        rx="6.5"
        ry="4.5"
        transform="rotate(-18 13 36)"
        fill="currentColor"
      />

      <ellipse
        cx="35"
        cy="32"
        rx="6.5"
        ry="4.5"
        transform="rotate(-18 35 32)"
        fill="currentColor"
      />

      <path
        d="M19 34V11"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M41 30V7"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M19 11L41 7"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const NOTES = [
  QuarterNote,
  EighthNote,
  DoubleNote,
];

/* -----------------------------
   BACKGROUND WAVE
----------------------------- */

function AmbientWave() {
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 1200 420"
      preserveAspectRatio="none"
      className="
        absolute
        left-0
        top-1/2
        h-[55%]
        w-full
        -translate-y-1/2
        opacity-30
      "
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 0.3,
      }}
      transition={{
        duration: 2,
      }}
    >
      <defs>
        <linearGradient
          id="wave-gradient"
          x1="0"
          x2="1"
        >
          <stop
            offset="0%"
            stopColor="#c084fc"
            stopOpacity="0"
          />

          <stop
            offset="35%"
            stopColor="#c084fc"
            stopOpacity="0.45"
          />

          <stop
            offset="70%"
            stopColor="#6ee7b7"
            stopOpacity="0.35"
          />

          <stop
            offset="100%"
            stopColor="#6ee7b7"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      <motion.path
        d="
          M0 225
          C130 160 220 290 350 220
          C480 145 570 280 700 205
          C830 140 960 265 1200 180
        "
        fill="none"
        stroke="url(#wave-gradient)"
        strokeWidth="1.5"
        animate={{
          d: [
            `
              M0 225
              C130 160 220 290 350 220
              C480 145 570 280 700 205
              C830 140 960 265 1200 180
            `,
            `
              M0 205
              C140 290 230 135 365 215
              C500 295 600 150 730 225
              C870 300 980 155 1200 220
            `,
            `
              M0 225
              C130 160 220 290 350 220
              C480 145 570 280 700 205
              C830 140 960 265 1200 180
            `,
          ],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.path
        d="
          M0 250
          C180 185 300 305 470 230
          C640 160 760 290 920 220
          C1050 170 1130 210 1200 190
        "
        fill="none"
        stroke="url(#wave-gradient)"
        strokeWidth="0.75"
        opacity="0.45"
        animate={{
          y: [0, -18, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
}

/* -----------------------------
   COMPONENT
----------------------------- */

export default function FloatingNotes({
  count = 16,
  className = "",
}) {
  const notes = useMemo(() => {
    const random =
      mulberry32(41279);

    return Array.from(
      { length: count },
      (_, index) => {
        const depth =
          choose(random, DEPTHS);

        const Note =
          choose(
            random,
            NOTES,
          );

        const drift =
          depth.drift;

        return {
          id: index,

          Note,

          color:
            choose(
              random,
              COLORS,
            ),

          depth:
            depth.name,

          left: between(
            random,
            3,
            97,
          ),

          top: between(
            random,
            5,
            95,
          ),

          size: between(
            random,
            ...depth.size,
          ),

          opacity: between(
            random,
            ...depth.opacity,
          ),

          blur: between(
            random,
            ...depth.blur,
          ),

          duration: between(
            random,
            ...depth.duration,
          ),

          delay: between(
            random,
            -18,
            0,
          ),

          x1: between(
            random,
            -drift,
            drift,
          ),

          x2: between(
            random,
            -drift * 0.65,
            drift * 0.65,
          ),

          y1: between(
            random,
            -drift,
            drift * 0.35,
          ),

          y2: between(
            random,
            -drift * 0.4,
            drift * 0.6,
          ),

          rotation:
            between(
              random,
              -22,
              22,
            ),

          rotationDrift:
            between(
              random,
              -18,
              18,
            ),

          scale: between(
            random,
            0.85,
            1.15,
          ),
        };
      },
    );
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className={[
        "syncingtom-note-field",
  "pointer-events-none",
  "absolute",
  "inset-0",
  "z-0",
  "overflow-hidden",
        className,
      ].join(" ")}
    >
      {/* Atmospheric glows */}

      <div
        className="
          absolute
          left-[8%]
          top-[20%]
          h-[22rem]
          w-[22rem]
          rounded-full
          bg-purple-500/[0.07]
          blur-[100px]
        "
      />

      <div
        className="
          absolute
          bottom-[5%]
          right-[5%]
          h-[26rem]
          w-[26rem]
          rounded-full
          bg-emerald-400/[0.05]
          blur-[120px]
        "
      />

      {/* Animated musical wave */}

      <AmbientWave />

      {/* Notes */}

      {notes.map(
        (note) => {
          const Note =
            note.Note;

          return (
            <motion.div
              key={note.id}
              className="
                absolute
                mix-blend-screen
                will-change-transform
              "
              style={{
                left: `${note.left}%`,
                top: `${note.top}%`,

                width:
                  `${note.size}px`,

                height:
                  `${note.size}px`,

                color:
                  note.color,

                opacity:
                  note.opacity,

                filter: `
                  blur(${note.blur}px)
                  drop-shadow(
                    0 0 8px
                    ${note.color}55
                  )
                  drop-shadow(
                    0 0 22px
                    ${note.color}22
                  )
                `,
              }}
              initial={{
                x: 0,
                y: 0,

                rotate:
                  note.rotation,

                scale:
                  note.scale,

                opacity: 0,
              }}
              animate={{
                x: [
                  0,
                  note.x1,
                  note.x2,
                  0,
                ],

                y: [
                  0,
                  note.y1,
                  note.y2,
                  0,
                ],

                rotate: [
                  note.rotation,

                  note.rotation +
                    note.rotationDrift,

                  note.rotation -
                    note.rotationDrift *
                      0.6,

                  note.rotation,
                ],

                scale: [
                  note.scale,

                  note.scale *
                    1.08,

                  note.scale *
                    0.94,

                  note.scale,
                ],

                opacity: [
                  0,
                  note.opacity,

                  note.opacity *
                    0.65,

                  note.opacity,

                  0,
                ],
              }}
              transition={{
                duration:
                  note.duration,

                delay:
                  note.delay,

                repeat:
                  Infinity,

                ease:
                  "easeInOut",

                times: [
                  0,
                  0.25,
                  0.6,
                  0.85,
                  1,
                ],
              }}
            >
              <Note />
            </motion.div>
          );
        },
      )}

      {/* Grain */}

      <div
        className="
          syncingtom-note-grain
          absolute
          inset-0
        "
      />
    </div>
  );
}