import {
  useState,
} from "react";

import {
  Link,
} from "react-router";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  TOOL_GROUPS,
  getToolsForGroup,
} from "../../data/tools.js";

const cx = (...classes) =>
  classes
    .filter(Boolean)
    .join(" ");

function StampVisual({
  tool,
}) {
  const [
    imageFailed,
    setImageFailed,
  ] = useState(false);

  if (imageFailed) {
    return (
      <div
        className="
          flex
          h-44
          w-44
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-black/20
          text-5xl
          font-black
          tracking-[-0.08em]
          text-white/15
          sm:h-52
          sm:w-52
          lg:h-60
          lg:w-60
        "
        style={{
          boxShadow: `
            inset 0 0 60px ${tool.glow},
            0 0 80px ${tool.glow}
          `,
        }}
        aria-hidden="true"
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
        setImageFailed(true)
      }
      className="
        h-full
        w-full
        object-contain
        opacity-80
        grayscale-[0.15]
        drop-shadow-[0_20px_60px_rgba(0,0,0,0.65)]
        transition
        duration-500
        ease-out
        group-hover:scale-[1.035]
        group-hover:rotate-[1.5deg]
        group-hover:opacity-100
        motion-reduce:transform-none
        motion-reduce:transition-none
      "
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
          rounded-full
          border
          px-3
          py-1.5
          text-[10px]
          font-bold
          uppercase
          tracking-[0.16em]
        `,
        preview
          ? `
              border-violet-300/15
              bg-violet-300/[0.05]
              text-violet-200/65
            `
          : `
              border-cyan-300/15
              bg-cyan-300/[0.04]
              text-cyan-100/60
            `,
      )}
    >
      <span
        className={cx(
          `
            mr-2
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

function ToolCard({
  tool,
  reverse = false,
  index = 0,
}) {
  const reduceMotion =
    useReducedMotion();

  return (
    <Link
      to={tool.route}
      aria-label={`${tool.cta}: ${tool.title}`}
      className="
        group
        block
        rounded-[2rem]
        outline-none
        focus-visible:ring-2
        focus-visible:ring-cyan-300/50
        focus-visible:ring-offset-4
        focus-visible:ring-offset-black
      "
    >
      <motion.article
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 28,
                scale: 0.985,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.62,
          delay:
            reduceMotion
              ? 0
              : Math.min(
                  index * 0.05,
                  0.15,
                ),
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        whileHover={
          reduceMotion
            ? undefined
            : {
                y: -4,
              }
        }
        className="
          relative
          isolate
          overflow-hidden
          rounded-[2rem]
          border
          border-white/[0.09]
          bg-[#050708]/90
          shadow-[0_22px_80px_rgba(0,0,0,0.34)]
          transition
          duration-300
          group-hover:border-white/[0.16]
          group-hover:shadow-[0_28px_90px_rgba(0,0,0,0.48)]
          motion-reduce:transition-none
        "
        style={{
          backgroundImage: `
            radial-gradient(
              650px circle at 88% 50%,
              ${tool.glow},
              transparent 58%
            ),
            linear-gradient(
              120deg,
              rgba(255,255,255,0.018),
              transparent 40%
            )
          `,
        }}
      >
        {/* top accent */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-12
            top-0
            h-px
            opacity-45
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

        {/* faint circular technical marks */}
        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-24
            h-80
            w-80
            rounded-full
            border
            border-white/[0.025]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-5
            -top-10
            h-56
            w-56
            rounded-full
            border
            border-white/[0.018]
          "
        />

        <div
          className="
            grid
            min-h-[330px]
            lg:grid-cols-[minmax(0,1.25fr)_minmax(19rem,0.75fr)]
          "
        >
          {/* Content */}
          <div
            className={cx(
              `
                relative
                z-10
                flex
                flex-col
                justify-between
                px-6
                py-7
                sm:px-8
                sm:py-9
                lg:px-10
                lg:py-10
              `,
              reverse &&
                "lg:order-2",
            )}
          >
            <div>
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  justify-between
                  gap-4
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
                      text-[11px]
                      tracking-[0.18em]
                      text-white/25
                    "
                  >
                    {tool.number}
                  </span>

                  <span
                    className="
                      h-px
                      w-7
                      bg-white/10
                    "
                  />

                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-white/35
                    "
                  >
                    {tool.group ===
                    "rhythm"
                      ? "Rhythm / Drums"
                      : "Bass / Guitar"}
                  </span>
                </div>

                <StatusBadge
                  tool={tool}
                />
              </div>

              <h3
                className="
                  mt-8
                  text-3xl
                  font-semibold
                  tracking-[-0.045em]
                  text-white
                  sm:text-4xl
                "
              >
                {tool.title}
              </h3>

              <p
                className="
                  mt-4
                  max-w-2xl
                  text-sm
                  leading-7
                  text-white/52
                  sm:text-[15px]
                "
              >
                {
                  tool.description
                }
              </p>

              <p
                className="
                  mt-4
                  max-w-2xl
                  text-sm
                  leading-7
                  text-white/32
                "
              >
                {tool.practice}
              </p>

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {tool.tags.map(
                  (tag) => (
                    <span
                      key={tag}
                      className="
                        rounded-full
                        border
                        border-white/[0.07]
                        bg-white/[0.022]
                        px-3
                        py-1.5
                        text-[11px]
                        font-medium
                        tracking-wide
                        text-white/40
                      "
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div
              className="
                mt-9
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  text-sm
                  font-semibold
                  text-white/75
                  transition
                  duration-300
                  group-hover:text-white
                "
              >
                {tool.cta}
              </span>

              <span
                className="
                  text-lg
                  text-white/30
                  transition
                  duration-300
                  group-hover:translate-x-1
                  group-hover:text-white/70
                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              >
                →
              </span>
            </div>
          </div>

          {/* Stamp */}
          <div
            className={cx(
              `
                relative
                flex
                min-h-64
                items-center
                justify-center
                overflow-hidden
                px-8
                py-8
                lg:min-h-full
              `,
              reverse &&
                "lg:order-1",
            )}
          >
            <div
              className="
                pointer-events-none
                absolute
                inset-0
              "
              style={{
                background: `
                  radial-gradient(
                    circle at center,
                    ${tool.glow},
                    transparent 65%
                  )
                `,
              }}
            />

            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      scale: 1.025,
                      rotate:
                        reverse
                          ? -1.2
                          : 1.2,
                    }
              }
              transition={{
                duration: 0.35,
              }}
              className="
                relative
                z-10
                h-48
                w-48
                sm:h-56
                sm:w-56
                lg:h-64
                lg:w-64
              "
            >
              <StampVisual
                tool={tool}
              />
            </motion.div>

            <div
              className="
                pointer-events-none
                absolute
                bottom-5
                right-6
                font-mono
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-white/15
              "
            >
              SyncingTom Practice
              System
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export default function ToolShowcase() {
  let cardIndex = 0;

  return (
    <section
      id="practice-tools"
      className="
        relative
        mx-auto
        w-full
        max-w-7xl
        px-4
        py-16
        sm:px-6
        sm:py-20
        lg:px-8
        lg:py-24
      "
    >
      <header
        className="
          max-w-3xl
        "
      >
        <p
          className="
            text-[11px]
            font-bold
            uppercase
            tracking-[0.22em]
            text-cyan-300/70
          "
        >
          Practice Tools
        </p>

        <h2
          className="
            mt-4
            text-3xl
            font-semibold
            tracking-[-0.045em]
            text-white
            sm:text-4xl
            lg:text-5xl
          "
        >
          Built around things worth
          practising repeatedly.
        </h2>

        <p
          className="
            mt-5
            max-w-2xl
            text-sm
            leading-7
            text-white/42
            sm:text-base
          "
        >
          SyncingTom is a collection
          of small practice systems
          for drums, bass and guitar.
          Each tool focuses on one
          relationship and makes it
          easier to hear, see, and
          work with directly.
        </p>
      </header>

      <div
        className="
          mt-16
          space-y-20
        "
      >
        {TOOL_GROUPS.map(
          (group) => {
            const groupTools =
              getToolsForGroup(
                group.id,
              );

            return (
              <section
                key={group.id}
              >
                <div
                  className="
                    grid
                    gap-4
                    border-b
                    border-white/[0.07]
                    pb-6
                    lg:grid-cols-[0.7fr_1.3fr]
                    lg:items-end
                  "
                >
                  <div>
                    <p
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-white/28
                      "
                    >
                      {
                        group.eyebrow
                      }
                    </p>

                    <h3
                      className="
                        mt-2
                        text-xl
                        font-semibold
                        tracking-[-0.03em]
                        text-white/85
                        sm:text-2xl
                      "
                    >
                      {
                        group.title
                      }
                    </h3>
                  </div>

                  <p
                    className="
                      max-w-2xl
                      text-sm
                      leading-6
                      text-white/35
                      lg:justify-self-end
                    "
                  >
                    {
                      group.description
                    }
                  </p>
                </div>

                <div
                  className="
                    mt-6
                    space-y-6
                  "
                >
                  {groupTools.map(
                    (
                      tool,
                      index,
                    ) => {
                      const currentIndex =
                        cardIndex;

                      cardIndex += 1;

                      return (
                        <ToolCard
                          key={
                            tool.id
                          }
                          tool={tool}
                          index={
                            currentIndex
                          }
                          reverse={
                            index %
                              2 ===
                            1
                          }
                        />
                      );
                    },
                  )}
                </div>
              </section>
            );
          },
        )}
      </div>
    </section>
  );
}