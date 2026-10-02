import {
  Link,
} from "react-router";

import {
  HOME_TOOLS,
} from "@/data/tools.js";

const STAMP_TOOLS =
  HOME_TOOLS
    .filter(
      (tool) =>
        Boolean(tool.stamp),
    )
    .slice(0, 4);

export default function AboutPage() {
  return (
    <main
      className="
        relative
        overflow-hidden
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-screen-xl
          px-4
          py-10
          sm:px-6
          sm:py-14
          lg:px-8
          lg:py-16
        "
      >
        {/* Hero */}
        <header
          className="
            grid
            gap-10
            lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)]
            lg:items-center
            lg:gap-16
          "
        >
          <div
            className="
              max-w-3xl
            "
          >
            <h1
              className="
                text-4xl
                font-semibold
                tracking-[-0.05em]
                text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
              About{" "}

              <span
                className="
                  bg-gradient-to-r
                  from-amber-300
                  via-purple-300
                  to-emerald-300
                  bg-clip-text
                  text-transparent
                "
              >
                SyncingTom
              </span>
            </h1>

            <p
              className="
                mt-6
                max-w-2xl
                text-base
                leading-8
                text-white/55
                sm:text-lg
              "
            >
              SyncingTom is a
              collection of small
              music-practice tools
              built around rhythm,
              timing, pitch and
              musical structure.
            </p>

            <p
              className="
                mt-4
                max-w-2xl
                text-base
                leading-8
                text-white/38
              "
            >
              It started from a
              simple need: make the
              things I was
              practising easier to
              see, hear, repeat and
              experiment with.
              Rather than turning
              every idea into a
              theory lesson, the
              tools try to make the
              musical relationship
              itself tangible.
            </p>

            <div
              className="
                mt-7
                flex
                flex-wrap
                gap-x-6
                gap-y-3
                text-sm
              "
            >
              <Link
                to="/"
                className="
                  font-medium
                  text-cyan-200/75
                  underline
                  decoration-white/15
                  underline-offset-4
                  transition
                  hover:text-cyan-100
                "
              >
                Explore the tools
              </Link>

              <Link
                to="/contact"
                className="
                  font-medium
                  text-white/45
                  underline
                  decoration-white/15
                  underline-offset-4
                  transition
                  hover:text-white/75
                "
              >
                Get in touch
              </Link>
            </div>
          </div>

          {/* Stamp composition */}
          <div
            className="
              hidden
              grid-cols-2
              items-center
              gap-x-8
              gap-y-5
              lg:grid
            "
            aria-hidden="true"
          >
            {STAMP_TOOLS.map(
              (
                tool,
                index,
              ) => (
                <div
                  key={tool.id}
                  className={[
                    "flex min-h-36 items-center justify-center",
                    index % 2 === 0
                      ? "-rotate-2"
                      : "rotate-2",
                  ].join(" ")}
                >
                  <img
                    src={
                      tool.stamp
                    }
                    alt=""
                    draggable="false"
                    className="
                      max-h-40
                      w-full
                      max-w-[13rem]
                      object-contain
                      opacity-75
                    "
                  />
                </div>
              ),
            )}
          </div>
        </header>

        {/* Why it exists */}
        <section
          className="
            mt-14
            grid
            gap-8
            border-t
            border-white/[0.08]
            pt-10
            sm:mt-16
            sm:pt-12
            lg:grid-cols-[0.75fr_1.25fr]
            lg:gap-16
          "
        >
          <h2
            className="
              text-2xl
              font-semibold
              tracking-[-0.035em]
              text-white
              sm:text-3xl
            "
          >
            Why it exists
          </h2>

          <div
            className="
              max-w-3xl
              space-y-5
              text-sm
              leading-7
              text-white/45
              sm:text-[15px]
            "
          >
            <p>
              Musical ideas often
              arrive as numbers,
              formulas or notation.
              A time signature can
              be written down. A
              scale can be reduced
              to intervals. A
              polymeter can be
              described
              mathematically.
            </p>

            <p>
              Those descriptions
              matter, but practising
              the idea is different.
              You need to hear where
              the pulse moves, see
              where cycles line up,
              feel how subdivisions
              change, or hear how a
              set of intervals
              actually behaves.
            </p>

            <p>
              SyncingTom tries to
              keep those things
              close together:
              structure, sound,
              visual feedback and
              repetition.
            </p>
          </div>
        </section>

        {/* Tools */}
        <section
          className="
            mt-16
            sm:mt-20
          "
        >
          <div
            className="
              max-w-3xl
            "
          >
            <h2
              className="
                text-3xl
                font-semibold
                tracking-[-0.04em]
                text-white
                sm:text-4xl
              "
            >
              The tools
            </h2>

            <p
              className="
                mt-4
                max-w-2xl
                text-sm
                leading-7
                text-white/38
                sm:text-[15px]
              "
            >
              Each one focuses on a
              specific practice
              problem. They share
              the same idea: change
              something, hear the
              result, and work with
              it directly.
            </p>
          </div>

          <div
            className="
              mt-8
              border-t
              border-white/[0.08]
            "
          >
            {HOME_TOOLS.map(
              (
                tool,
                index,
              ) => (
                <article
                  key={tool.id}
                  className="
                    grid
                    gap-5
                    border-b
                    border-white/[0.08]
                    py-7
                    sm:grid-cols-[7.5rem_minmax(0,1fr)]
                    sm:items-center
                    sm:gap-8
                    sm:py-8
                  "
                >
                  <div
                    className="
                      flex
                      h-24
                      items-center
                      justify-start
                      sm:h-28
                      sm:justify-center
                    "
                    aria-hidden="true"
                  >
                    {tool.stamp ? (
                      <img
                        src={
                          tool.stamp
                        }
                        alt=""
                        draggable="false"
                        className={[
                          "max-h-24 max-w-28 object-contain opacity-75 sm:max-h-28",
                          index % 2 ===
                          0
                            ? "-rotate-1"
                            : "rotate-1",
                        ].join(
                          " ",
                        )}
                      />
                    ) : null}
                  </div>

                  <div
                    className="
                      max-w-3xl
                    "
                  >
                    <h3
                      className="
                        text-xl
                        font-semibold
                        tracking-[-0.025em]
                        text-white
                      "
                    >
                      {
                        tool.title
                      }
                    </h3>

                    <p
                      className="
                        mt-3
                        text-sm
                        leading-7
                        text-white/42
                      "
                    >
                      {
                        tool.description
                      }
                    </p>

                    {tool.route ? (
                      <Link
                        to={
                          tool.route
                        }
                        className="
                          mt-4
                          inline-block
                          text-sm
                          font-medium
                          text-white/40
                          underline
                          decoration-white/15
                          underline-offset-4
                          transition
                          hover:text-cyan-200/80
                        "
                      >
                        Open{" "}
                        {
                          tool.title
                        }
                      </Link>
                    ) : null}
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        {/* Approach */}
        <section
          className="
            mt-16
            grid
            gap-8
            border-t
            border-white/[0.08]
            pt-10
            sm:mt-20
            sm:pt-12
            lg:grid-cols-[0.75fr_1.25fr]
            lg:gap-16
          "
        >
          <h2
            className="
              text-2xl
              font-semibold
              tracking-[-0.035em]
              text-white
              sm:text-3xl
            "
          >
            How I think about it
          </h2>

          <div
            className="
              max-w-3xl
              space-y-5
              text-sm
              leading-7
              text-white/45
              sm:text-[15px]
            "
          >
            <p>
              The site is meant to
              stay practical. If a
              tool makes a practice
              problem clearer, it
              belongs here. If it
              only adds another
              layer of explanation
              without helping the
              exercise itself, it
              probably does not.
            </p>

            <p>
              That also means some
              tools will remain
              deliberately small.
              They do not need to
              become full music
              applications. They
              need to do one thing
              well enough to be
              useful during an
              actual practice
              session.
            </p>
          </div>
        </section>

        {/* Closing */}
        <section
          className="
            mt-16
            border-t
            border-white/[0.08]
            pt-10
            sm:mt-20
            sm:pt-12
          "
        >
          <div
            className="
              grid
              gap-8
              lg:grid-cols-[1fr_auto]
              lg:items-end
            "
          >
            <div
              className="
                max-w-2xl
              "
            >
              <h2
                className="
                  text-2xl
                  font-semibold
                  tracking-[-0.035em]
                  text-white
                  sm:text-3xl
                "
              >
                SyncingTom will
                keep changing as
                the practice does.
              </h2>

              <p
                className="
                  mt-4
                  text-sm
                  leading-7
                  text-white/38
                  sm:text-[15px]
                "
              >
                New tools and
                refinements will be
                added when there is
                a useful musical
                reason for them.
              </p>
            </div>

            <Link
              to="/"
              className="
                text-sm
                font-medium
                text-cyan-200/70
                underline
                decoration-white/15
                underline-offset-4
                transition
                hover:text-cyan-100
              "
            >
              Back to SyncingTom
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}