import {
  useState,
} from "react";

import {
  Link,
} from "react-router";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  TOOLS,
} from "../../data/tools.js";

const cx = (...classes) =>
  classes
    .filter(Boolean)
    .join(" ");

function getToolCategory(
  tool,
) {
  return tool.group ===
    "rhythm"
    ? "Rhythm / Drums"
    : "Bass / Guitar";
}

function ToolStamp({
  tool,
  large = false,
}) {
  const [
    imageFailed,
    setImageFailed,
  ] = useState(false);

  if (imageFailed) {
    return (
      <div
        aria-hidden="true"
        className={cx(
          `
            relative
            flex
            items-center
            justify-center
            rounded-full
            border
            border-white/[0.08]
            bg-white/[0.025]
            font-black
            tracking-[-0.08em]
            text-white/15
          `,
          large
            ? `
                h-48
                w-48
                text-5xl
                sm:h-56
                sm:w-56
                lg:h-64
                lg:w-64
              `
            : `
                h-20
                w-20
                text-2xl
              `,
        )}
        style={{
          boxShadow: `
            inset 0 0 60px ${tool.glow},
            0 0 60px ${tool.glow}
          `,
        }}
      >
        {tool.monogram}
      </div>
    );
  }

  return (
    <img
      src={tool.stamp}
      alt=""
      aria-hidden="true"
      draggable="false"
      onError={() =>
        setImageFailed(
          true,
        )
      }
      className={cx(
        `
          relative
          z-[1]
          w-full
          object-contain
          opacity-90
          drop-shadow-[0_22px_55px_rgba(0,0,0,0.6)]
          transition-transform
          duration-300
          ease-out
          group-hover:scale-[1.025]
          motion-reduce:transform-none
          motion-reduce:transition-none
        `,
        large
          ? `
              h-56
              sm:h-64
              lg:h-72
            `
          : `
              h-24
              sm:h-28
            `,
      )}
    />
  );
}

function StatusBadge({
  tool,
}) {
  const preview =
    tool.status ===
    "preview";

  return (
    <span
      className={cx(
        `
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          px-2.5
          py-1
          text-[9px]
          font-bold
          uppercase
          tracking-[0.14em]
        `,
        preview
          ? `
              border-violet-300/15
              bg-violet-300/[0.05]
              text-violet-200/60
            `
          : `
              border-cyan-300/15
              bg-cyan-300/[0.04]
              text-cyan-100/55
            `,
      )}
    >
      <span
        className={cx(
          `
            h-1.5
            w-1.5
            rounded-full
          `,
          preview
            ? "bg-violet-300/70"
            : "bg-cyan-300/70",
        )}
      />

      {tool.statusLabel}
    </span>
  );
}

function CompactToolCard({
  tool,
  index,
  onExpand,
}) {
  const reduceMotion =
    useReducedMotion();

  return (
    <motion.button
      layout
      type="button"
      onClick={onExpand}
      aria-expanded="false"
      aria-label={`Show details for ${tool.title}`}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4,
            }
      }
      whileTap={
        reduceMotion
          ? undefined
          : {
              scale: 0.99,
            }
      }
      className="
        group
        relative
        min-h-[210px]
        w-full
        overflow-hidden
        rounded-[1.6rem]
        border
        border-white/[0.08]
        bg-black/80
        p-5
        text-left
        shadow-[0_18px_55px_rgba(0,0,0,0.28)]
        outline-none
        transition
        duration-300
        hover:border-white/[0.15]
        hover:shadow-[0_26px_70px_rgba(0,0,0,0.42)]
        focus-visible:ring-2
        focus-visible:ring-cyan-300/50
        focus-visible:ring-offset-4
        focus-visible:ring-offset-black
      "
      style={{
        backgroundImage: `
          radial-gradient(
            340px circle at 90% 10%,
            ${tool.glow},
            transparent 62%
          )
        `,
      }}
    >
      {/* accent */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-6
          top-0
          h-px
          opacity-40
        "
        style={{
          background: `
            linear-gradient(
              to right,
              transparent,
              ${tool.accent},
              transparent
            )
          `,
        }}
      />

      {/* decorative geometry */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-10
          -top-12
          h-40
          w-40
          rounded-full
          border
          border-white/[0.025]
        "
      />

      <div
        className="
          relative
          z-10
          flex
          h-full
          min-h-[170px]
          flex-col
          justify-between
        "
      >
        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >
          <div>
            <p
              className="
                font-mono
                text-[9px]
                tracking-[0.18em]
                text-white/20
              "
            >
              {tool.number}
            </p>

            <p
              className="
                mt-1
                text-[9px]
                font-bold
                uppercase
                tracking-[0.17em]
                text-white/30
              "
            >
              {getToolCategory(
                tool,
              )}
            </p>
          </div>

          <span
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.08]
              bg-white/[0.025]
              text-lg
              font-light
              text-white/35
              transition
              group-hover:border-white/[0.16]
              group-hover:bg-white/[0.05]
              group-hover:text-white/80
            "
            aria-hidden="true"
          >
            +
          </span>
        </div>

        <div
          className="
            flex
            items-end
            justify-between
            gap-3
          "
        >
          <div
            className="
              min-w-0
              pb-1
            "
          >
            <h3
              className="
                text-xl
                font-semibold
                tracking-[-0.035em]
                text-white
                sm:text-2xl
              "
            >
              {tool.title}
            </h3>

            <div
              className="
                mt-3
                flex
                flex-wrap
                gap-1.5
              "
            >
              {tool.tags
                .slice(
                  0,
                  2,
                )
                .map(
                  (
                    tag,
                  ) => (
                    <span
                      key={
                        tag
                      }
                      className="
                        rounded-full
                        border
                        border-white/[0.06]
                        bg-white/[0.018]
                        px-2
                        py-1
                        text-[9px]
                        text-white/30
                      "
                    >
                      {tag}
                    </span>
                  ),
                )}
            </div>
          </div>

          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [
                      0,
                      -4,
                      0,
                    ],
                    rotate: [
                      0,
                      index %
                          2 ===
                        0
                        ? 1
                        : -1,
                      0,
                    ],
                  }
            }
            transition={{
              duration:
                4.5 +
                index *
                  0.4,

              repeat:
                Infinity,

              ease:
                "easeInOut",
            }}
            className="
              shrink-0
            "
          >
            <ToolStamp
              tool={tool}
            />
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
}

function ExpandedToolCard({
  tool,
  index,
  onClose,
}) {
  const reduceMotion =
    useReducedMotion();

  const stampSide =
    index % 2 === 0
      ? "right"
      : "left";

  const stampLeft =
    stampSide ===
    "left";

  return (
    <motion.article
      layout
      className="
        group
        relative
        overflow-hidden
        rounded-[2rem]
        border
        border-white/[0.11]
        bg-black/90
        shadow-[0_30px_95px_rgba(0,0,0,0.48)]
      "
      style={{
        backgroundImage: `
          radial-gradient(
            720px circle at ${
              stampLeft
                ? "12%"
                : "88%"
            } 30%,
            ${tool.glow},
            transparent 58%
          )
        `,
      }}
    >
      {/* hover/accent wash */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
        style={{
          background: `
            radial-gradient(
              700px circle at 15% 0%,
              ${tool.glow},
              transparent 55%
            )
          `,
        }}
      />

      {/* top accent */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-10
          top-0
          h-px
          opacity-55
        "
        style={{
          background: `
            linear-gradient(
              to right,
              transparent,
              ${tool.accent},
              transparent
            )
          `,
        }}
      />

      <div
        className={cx(
          `
            relative
            grid
            grid-cols-1
          `,

          stampLeft
            ? `
                md:grid-cols-[1fr_1.75fr]
              `
            : `
                md:grid-cols-[1.75fr_1fr]
              `,
        )}
      >
        {/* TEXT COLUMN */}
        <div
          className={cx(
            `
              flex
              flex-col
              justify-center
              p-6
              sm:p-8
              lg:p-10
            `,

            stampLeft
              ? "md:order-2"
              : "md:order-1",
          )}
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              justify-between
              gap-3
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  font-mono
                  text-[10px]
                  tracking-[0.18em]
                  text-white/22
                "
              >
                {tool.number}
              </span>

              <span
                className="
                  h-px
                  w-6
                  bg-white/10
                "
              />

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white/30
                "
              >
                {getToolCategory(
                  tool,
                )}
              </span>
            </div>

            <StatusBadge
              tool={tool}
            />
          </div>

          <div
            className="
              mt-6
              flex
              items-start
              justify-between
              gap-4
            "
          >
            <h2
              className="
                text-3xl
                font-semibold
                tracking-[-0.045em]
                text-white
                sm:text-4xl
              "
            >
              {tool.title}
            </h2>

            <button
              type="button"
              onClick={
                onClose
              }
              aria-label={`Close ${tool.title}`}
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.025]
                text-xl
                text-white/35
                transition
                hover:border-white/[0.16]
                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              ×
            </button>
          </div>

          <p
            className="
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-white/58
              sm:text-[15px]
            "
          >
            {tool.description}
          </p>

          <div
            className="
              mt-5
              rounded-2xl
              border
              border-white/[0.065]
              bg-white/[0.018]
              p-4
            "
          >
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-white/25
              "
            >
              Practice focus
            </p>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-white/42
              "
            >
              {tool.practice}
            </p>
          </div>

          <div
            className="
              mt-5
              flex
              flex-wrap
              gap-2
            "
          >
            {tool.tags.map(
              (
                tag,
              ) => (
                <span
                  key={tag}
                  className="
                    rounded-full
                    border
                    border-white/[0.07]
                    bg-white/[0.02]
                    px-3
                    py-1.5
                    text-[10px]
                    text-white/38
                  "
                >
                  {tag}
                </span>
              ),
            )}
          </div>

          <div
            className="
              mt-7
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            <Link
              to={tool.route}
              className="
                inline-flex
                min-h-11
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/[0.05]
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white/85
                ring-4
                ring-white/[0.035]
                transition
                hover:bg-white/[0.08]
                hover:text-white
                hover:ring-white/[0.06]
              "
            >
              {tool.cta}

              <span
                className="
                  text-white/50
                  transition-transform
                  group-hover:translate-x-0.5
                  motion-reduce:transform-none
                "
                aria-hidden="true"
              >
                →
              </span>
            </Link>

            <button
              type="button"
              onClick={
                onClose
              }
              className="
                min-h-11
                rounded-xl
                px-3
                text-sm
                font-medium
                text-white/30
                transition
                hover:text-white/65
              "
            >
              Close
            </button>
          </div>
        </div>

        {/* STAMP COLUMN */}
        <div
          className={cx(
            `
              relative
              flex
              min-h-60
              items-center
              justify-center
              overflow-hidden
              p-4
              sm:min-h-72
              sm:p-6
              md:min-h-full
            `,

            stampLeft
              ? "md:order-1"
              : "md:order-2",
          )}
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-l
              from-black/40
              via-black/10
              to-transparent
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              h-64
              w-64
              rounded-full
              border
              border-white/[0.025]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              h-48
              w-48
              rounded-full
              border
              border-white/[0.02]
            "
          />

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity:
                      0,
                    scale:
                      0.92,
                    rotate:
                      stampLeft
                        ? -2
                        : 2,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration:
                reduceMotion
                  ? 0
                  : 0.45,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="
              relative
              z-10
              w-full
              max-w-[320px]
            "
          >
            <ToolStamp
              tool={tool}
              large
            />
          </motion.div>

          <span
            className="
              pointer-events-none
              absolute
              bottom-5
              right-6
              font-mono
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-white/12
            "
          >
            SyncingTom
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function ToolShowcase() {
  const [
    expandedId,
    setExpandedId,
  ] = useState(null);

  const reduceMotion =
    useReducedMotion();

  return (
    <section
      id="practice-tools"
      className="
        relative
        mx-auto
        w-full
        max-w-screen-xl
        scroll-mt-24
        px-4
        pb-16
        pt-3
        sm:px-6
        sm:pb-20
        lg:px-8
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          flex-col
          gap-3
          border-b
          border-white/[0.06]
          pb-5
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-cyan-300/55
            "
          >
            Practice Tools
          </p>

          <h2
            className="
              mt-2
              text-2xl
              font-semibold
              tracking-[-0.04em]
              text-white
              sm:text-3xl
            "
          >
            What are you working
            on?
          </h2>
        </div>

        <p
          className="
            max-w-md
            text-xs
            leading-5
            text-white/27
            sm:text-right
          "
        >
          Open a card for a quick
          overview, then jump into
          the practice tool.
        </p>
      </div>

      {/* TOOL GRID */}
      <motion.div
        layout
        className="
          mt-5
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {TOOLS.map(
          (
            tool,
            index,
          ) => {
            const expanded =
              expandedId ===
              tool.id;

            return (
              <motion.div
                key={tool.id}
                layout
                transition={{
                  layout: {
                    duration:
                      reduceMotion
                        ? 0
                        : 0.45,

                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  },
                }}
                className={cx(
                  expanded &&
                    `
                      sm:col-span-2
                      lg:col-span-3
                    `,

                  !expanded &&
                    index %
                      3 ===
                      1 &&
                    `
                      lg:translate-y-3
                    `,

                  !expanded &&
                    index %
                      3 ===
                      2 &&
                    `
                      lg:translate-y-1
                    `,
                )}
              >
                <AnimatePresence
                  mode="wait"
                  initial={false}
                >
                  {expanded ? (
                    <motion.div
                      key="expanded"
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity:
                                0,
                              scale:
                                0.99,
                            }
                      }
                      animate={{
                        opacity:
                          1,
                        scale: 1,
                      }}
                      exit={{
                        opacity:
                          0,
                        scale:
                          0.99,
                      }}
                      transition={{
                        duration:
                          reduceMotion
                            ? 0
                            : 0.2,
                      }}
                    >
                      <ExpandedToolCard
                        tool={tool}
                        index={
                          index
                        }
                        onClose={() =>
                          setExpandedId(
                            null,
                          )
                        }
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="compact"
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity:
                                0,
                              y: 12,
                            }
                      }
                      animate={{
                        opacity:
                          1,
                        y: 0,
                      }}
                      exit={{
                        opacity:
                          0,
                      }}
                      transition={{
                        duration:
                          reduceMotion
                            ? 0
                            : 0.22,
                      }}
                    >
                      <CompactToolCard
                        tool={tool}
                        index={
                          index
                        }
                        onExpand={() =>
                          setExpandedId(
                            tool.id,
                          )
                        }
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          },
        )}
      </motion.div>
    </section>
  );
}