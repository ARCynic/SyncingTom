import {
  Link,
  useLocation,
} from "react-router";

import {
  motion,
  useReducedMotion,
} from "motion/react";

export default function IssueBeacon() {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();

  if (pathname === "/issues") {
    return null;
  }

  return (
    <div
      className="
        pointer-events-none
        fixed
        right-4
        z-40
        sm:right-6
      "
      style={{
        bottom: "10vh",
      }}
    >
      <Link
        to="/issues"
        aria-label="Known issues and upcoming improvements"
        title="Issues & improvements"
        className="
          pointer-events-auto
          group
          relative
          flex
          h-[58px]
          w-[58px]
          items-center
          justify-center
          outline-none
        "
      >
        {/* ─────────────────────────────
            DISTANT PING
        ───────────────────────────── */}

        {!reduceMotion && (
          <motion.span
            aria-hidden="true"
            className="
              absolute
              inset-[5px]
              rounded-[18px]
              border
              border-purple-300/25
            "
            animate={{
              scale: [1, 1, 1.55],
              opacity: [0, 0.42, 0],
            }}
            transition={{
              duration: 1.35,
              repeat: Infinity,
              repeatDelay: 4.2,
              ease: "easeOut",
            }}
          />
        )}

        {/* ─────────────────────────────
            SOFT BACK GLOW
        ───────────────────────────── */}

        <motion.span
          aria-hidden="true"
          className="
            absolute
            inset-0
            rounded-[20px]
            bg-gradient-to-br
            from-purple-500/15
            via-transparent
            to-emerald-400/10
            blur-xl
          "
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.35, 0.7, 0.35],
                  scale: [0.95, 1.08, 0.95],
                }
          }
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ─────────────────────────────
            ROTATING OUTER ENERGY TRACE
        ───────────────────────────── */}

        {!reduceMotion && (
          <motion.span
            aria-hidden="true"
            className="
              absolute
              inset-[1px]
              rounded-[19px]
              opacity-50
            "
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, transparent 210deg, rgba(192,132,252,.8) 250deg, rgba(110,231,183,.75) 290deg, transparent 330deg)",
              padding: "1px",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite:
                "xor",
              maskComposite:
                "exclude",
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {/* ─────────────────────────────
            MAIN BODY
        ───────────────────────────── */}

        <motion.span
          aria-hidden="true"
          className="
            absolute
            inset-[4px]
            rounded-[17px]
            border
            border-white/[0.12]
            bg-[#090a0d]/90
            shadow-
            [0_12px_35px_rgba(0,0,0,.48)]
            backdrop-blur-xl
          "
          whileHover={{
            scale: 1.04,
          }}
          transition={{
            duration: 0.18,
          }}
        />

        {/* Subtle inner lighting */}

        <span
          aria-hidden="true"
          className="
            absolute
            inset-[6px]
            rounded-[15px]
            bg-[radial-gradient(circle_at_30%_25%,rgba(192,132,252,.16),transparent_42%),radial-gradient(circle_at_70%_75%,rgba(110,231,183,.10),transparent_46%)]
          "
        />

        {/* ─────────────────────────────
            STATUS LIGHT
        ───────────────────────────── */}

        <span
          aria-hidden="true"
          className="
            absolute
            right-[5px]
            top-[5px]
            z-20
            flex
            h-[10px]
            w-[10px]
            items-center
            justify-center
            rounded-full
            bg-[#09090b]
            shadow-[0_0_0_1px_rgba(255,255,255,.08)]
          "
        >
          <motion.span
            className="
              h-[5px]
              w-[5px]
              rounded-full
              bg-amber-300
              shadow-[0_0_8px_rgba(252,211,77,.9)]
            "
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [1, 0.35, 1],
                    scale: [1, 0.8, 1],
                  }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </span>

        {/* ─────────────────────────────
            MAIN SVG SIGNAL GLYPH
        ───────────────────────────── */}

        <motion.svg
          viewBox="0 0 42 42"
          aria-hidden="true"
          className="
            relative
            z-10
            h-[32px]
            w-[32px]
            overflow-visible
          "
          whileHover={
            reduceMotion
              ? undefined
              : {
                  rotate: -4,
                  scale: 1.08,
                }
          }
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
          }}
        >
          <defs>
            <linearGradient
              id="issue-orbit-gradient"
              x1="4"
              y1="4"
              x2="38"
              y2="38"
            >
              <stop
                offset="0%"
                stopColor="#d8b4fe"
              />

              <stop
                offset="50%"
                stopColor="#c084fc"
              />

              <stop
                offset="100%"
                stopColor="#6ee7b7"
              />
            </linearGradient>

            <filter
              id="issue-soft-glow"
              x="-60%"
              y="-60%"
              width="220%"
              height="220%"
            >
              <feGaussianBlur
                stdDeviation="1.2"
                result="blur"
              />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* broken outer orbit */}

          <motion.path
            d="
              M 21 5.5
              C 29.8 5.5 36.5 12.1 36.5 21
              C 36.5 29.7 29.7 36.5 21 36.5
            "
            fill="none"
            stroke="url(#issue-orbit-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#issue-soft-glow)"
            animate={
              reduceMotion
                ? undefined
                : {
                    pathLength: [
                      0.72,
                      1,
                      0.72,
                    ],
                    opacity: [
                      0.6,
                      1,
                      0.6,
                    ],
                  }
            }
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* second broken orbit */}

          <path
            d="
              M 18 36.2
              C 10.8 34.8 5.5 28.5 5.5 21
              C 5.5 14.9 8.9 9.7 14 7
            "
            fill="none"
            stroke="rgba(255,255,255,.25)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          {/* little terminal node */}

          <circle
            cx="14.1"
            cy="7"
            r="2"
            fill="#c084fc"
            filter="url(#issue-soft-glow)"
          />

          {/* central waveform */}

          <motion.path
            d="
              M 11 22
              L 15.2 22
              L 17.5 16
              L 21.2 27
              L 24.5 19
              L 27 22
              L 31 22
            "
            fill="none"
            stroke="#f4f4f5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [
                      0.55,
                      1,
                      0.55,
                    ],
                  }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* centre point */}

          <motion.circle
            cx="21"
            cy="22"
            r="2.2"
            fill="#6ee7b7"
            filter="url(#issue-soft-glow)"
            animate={
              reduceMotion
                ? undefined
                : {
                    r: [
                      2,
                      2.8,
                      2,
                    ],
                  }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.svg>

        {/* ─────────────────────────────
            CORNER DETAIL
        ───────────────────────────── */}

        <span
          aria-hidden="true"
          className="
            absolute
            bottom-[8px]
            left-[8px]
            h-[5px]
            w-[5px]
            border-b
            border-l
            border-emerald-300/35
          "
        />

        <span
          aria-hidden="true"
          className="
            absolute
            left-[8px]
            top-[8px]
            h-[5px]
            w-[5px]
            border-l
            border-t
            border-purple-300/40
          "
        />

        {/* ─────────────────────────────
            HOVER LABEL
        ───────────────────────────── */}

        <span
          className="
            pointer-events-none
            absolute
            right-[calc(100%+0.8rem)]
            hidden
            translate-x-2
            whitespace-nowrap
            rounded-xl
            border
            border-white/[0.10]
            bg-[#09090b]/95
            px-3.5
            py-2.5
            opacity-0
            shadow-[0_12px_35px_rgba(0,0,0,.45)]
            backdrop-blur-xl
            transition-all
            duration-200
            group-hover:translate-x-0
            group-hover:opacity-100
            sm:block
          "
        >
          <span
            className="
              block
              text-[10px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-white/70
            "
          >
            Issues & improvements
          </span>

          <span
            className="
              mt-0.5
              block
              text-[9px]
              tracking-[0.04em]
              text-white/30
            "
          >
            What&apos;s changing in SyncingTom
          </span>
        </span>
      </Link>
    </div>
  );
}