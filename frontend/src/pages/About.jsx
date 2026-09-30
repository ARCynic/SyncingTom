import {
  Link,
} from "react-router";

const TOOLS = [
  {
    name:
      "Meter Sequence",

    status:
      "Available",

    description:
      "Build changing meter sequences, hear the transitions, loop difficult passages, and practise time signatures as a continuous musical structure.",
  },

  {
    name:
      "Subdivision Ladder",

    status:
      "Available",

    description:
      "Move through rhythmic subdivisions while keeping one central pulse, making the relationship between tempo, density, and timing easier to hear and feel.",
  },

  {
    name:
      "Scale Archive",

    status:
      "Available",

    description:
      "Explore scales from any root, inspect their interval structure, hear individual pitches, play complete scales, and view them on a root-relative pitch clock.",
  },

  {
    name:
      "Polymeter Player",

    status:
      "In development",

    description:
      "Layer independent drum patterns with different cycle lengths over one shared BPM and hear how they separate and eventually realign.",
  },
];

const PRINCIPLES = [
  {
    title:
      "Hear it",

    description:
      "Music theory and rhythm make more sense when the concept can immediately be heard.",
  },

  {
    title:
      "See it",

    description:
      "Visual structure helps expose relationships that are easy to miss when they remain only numbers or notation.",
  },

  {
    title:
      "Change it",

    description:
      "The tools are designed for experimentation. Change the root, meter, subdivision, pattern length, or tempo and listen to what happens.",
  },

  {
    title:
      "Practise it",

    description:
      "SyncingTom is built around repeatable musical exercises rather than passive reference pages.",
  },
];

function Panel({
  children,
  className = "",
}) {
  return (
    <section
      className={[
        `
          relative
          overflow-hidden
          rounded-[2rem]
          border
          border-white/[0.08]
          bg-black/30
          shadow-[0_24px_80px_rgba(0,0,0,0.20)]
          backdrop-blur-sm
        `,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-cyan-300/40
          to-transparent
        "
      />

      {children}
    </section>
  );
}

function Eyebrow({
  children,
}) {
  return (
    <p
      className="
        text-[11px]
        font-bold
        uppercase
        tracking-[0.22em]
        text-cyan-300/75
      "
    >
      {children}
    </p>
  );
}

function StatusPill({
  children,
  active = false,
}) {
  return (
    <span
      className="
        inline-flex
        items-center
        rounded-full
        border
        px-2.5
        py-1
        text-[10px]
        font-bold
        uppercase
        tracking-[0.14em]
      "
      style={{
        borderColor:
          active
            ? "rgba(103,232,249,0.22)"
            : "rgba(255,255,255,0.08)",

        background:
          active
            ? "rgba(103,232,249,0.07)"
            : "rgba(255,255,255,0.025)",

        color:
          active
            ? "rgba(165,243,252,0.78)"
            : "rgba(255,255,255,0.36)",
      }}
    >
      {children}
    </span>
  );
}

function InterestTag({
  children,
}) {
  return (
    <span
      className="
        rounded-full
        border
        border-white/[0.08]
        bg-white/[0.025]
        px-4
        py-2
        text-sm
        font-medium
        text-white/55
      "
    >
      {children}
    </span>
  );
}

export default function AboutPage() {
  return (
    <main
      className="
        relative
        overflow-hidden
      "
    >
      {/* Background atmosphere */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
        "
        style={{
          background: `
            radial-gradient(
              900px circle at 15% 0%,
              rgba(103,232,249,0.08),
              transparent 55%
            ),
            radial-gradient(
              700px circle at 90% 18%,
              rgba(96,165,250,0.06),
              transparent 60%
            )
          `,
        }}
      />

      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          py-12
          sm:px-6
          sm:py-16
          lg:px-8
          lg:py-20
        "
      >
        {/* Hero */}
        <header
          className="
            max-w-4xl
          "
        >
          <Eyebrow>
            About SyncingTom
          </Eyebrow>

          <h1
            className="
              mt-5
              max-w-4xl
              text-4xl
              font-semibold
              tracking-[-0.05em]
              text-white
              sm:text-5xl
              lg:text-6xl
            "
          >
            A small music lab for{" "}

            <span
              className="
                bg-gradient-to-r
                from-cyan-200
                to-blue-400
                bg-clip-text
                text-transparent
              "
            >
              rhythm, timing,
              theory and practice.
            </span>
          </h1>

          <p
            className="
              mt-6
              max-w-3xl
              text-base
              leading-8
              text-white/50
              sm:text-lg
            "
          >
            SyncingTom is a
            collection of
            interactive tools for
            musicians who like to
            understand what they
            are practising rather
            than simply repeat it.
          </p>

          <p
            className="
              mt-4
              max-w-3xl
              text-base
              leading-8
              text-white/40
            "
          >
            The project sits
            somewhere between a
            practice room, a music
            theory reference, and
            a small experimental
            laboratory. Each tool
            takes one musical idea,
            makes its structure
            visible, and lets you
            hear and manipulate it
            directly.
          </p>

          <div
            className="
              mt-8
              flex
              flex-wrap
              gap-3
            "
          >
            <Link
              to="/"
              className="
                inline-flex
                min-h-11
                items-center
                justify-center
                rounded-xl
                border
                border-cyan-300/25
                bg-cyan-300/[0.08]
                px-5
                text-sm
                font-semibold
                text-cyan-100
                transition
                hover:bg-cyan-300/[0.13]
              "
            >
              Explore the tools
            </Link>

            <Link
              to="/scales"
              className="
                inline-flex
                min-h-11
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/[0.025]
                px-5
                text-sm
                font-semibold
                text-white/55
                transition
                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              Open Scale Archive
            </Link>
          </div>
        </header>

        {/* What SyncingTom is */}
        <Panel className="mt-12">
          <div
            className="
              grid
              gap-10
              px-6
              py-8
              sm:px-8
              sm:py-10
              lg:grid-cols-[0.8fr_1.2fr]
              lg:gap-16
              lg:px-10
            "
          >
            <div>
              <Eyebrow>
                The idea
              </Eyebrow>

              <h2
                className="
                  mt-3
                  text-2xl
                  font-semibold
                  tracking-[-0.035em]
                  text-white
                  sm:text-3xl
                "
              >
                Music becomes
                easier to reason
                about when you can
                hear the structure.
              </h2>
            </div>

            <div
              className="
                space-y-5
                text-sm
                leading-7
                text-white/48
                sm:text-[15px]
              "
            >
              <p>
                A meter can be
                written as a pair
                of numbers. A scale
                can be written as
                intervals. A
                polymeter can be
                explained using
                least common
                multiples. Those
                descriptions are
                useful, but they
                are only one layer
                of the musical
                experience.
              </p>

              <p>
                SyncingTom tries to
                connect the layers:
                the mathematical
                structure, the
                visual pattern, the
                sound, and the
                physical act of
                practising it.
              </p>

              <p>
                The goal is not to
                replace an
                instrument,
                teacher, score, or
                metronome. It is to
                provide small tools
                that make difficult
                musical
                relationships
                easier to inspect,
                repeat, and
                internalise.
              </p>
            </div>
          </div>
        </Panel>

        {/* Current tools */}
        <div className="mt-16">
          <div
            className="
              max-w-3xl
            "
          >
            <Eyebrow>
              Current tools
            </Eyebrow>

            <h2
              className="
                mt-3
                text-3xl
                font-semibold
                tracking-[-0.04em]
                text-white
                sm:text-4xl
              "
            >
              Different musical
              problems, one shared
              approach.
            </h2>
          </div>

          <div
            className="
              mt-7
              grid
              gap-4
              md:grid-cols-2
            "
          >
            {TOOLS.map(
              (tool) => {
                const available =
                  tool.status ===
                  "Available";

                return (
                  <article
                    key={
                      tool.name
                    }
                    className="
                      rounded-[1.5rem]
                      border
                      border-white/[0.08]
                      bg-white/[0.018]
                      p-6
                      transition
                      hover:border-white/[0.13]
                      hover:bg-white/[0.025]
                    "
                  >
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
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
                          tool.name
                        }
                      </h3>

                      <StatusPill
                        active={
                          available
                        }
                      >
                        {
                          tool.status
                        }
                      </StatusPill>
                    </div>

                    <p
                      className="
                        mt-4
                        text-sm
                        leading-7
                        text-white/42
                      "
                    >
                      {
                        tool.description
                      }
                    </p>
                  </article>
                );
              },
            )}
          </div>
        </div>

        {/* Philosophy */}
        <Panel className="mt-16">
          <div
            className="
              px-6
              py-8
              sm:px-8
              sm:py-10
              lg:px-10
            "
          >
            <Eyebrow>
              How the tools are
              designed
            </Eyebrow>

            <h2
              className="
                mt-3
                text-2xl
                font-semibold
                tracking-[-0.035em]
                text-white
                sm:text-3xl
              "
            >
              Hear it. See it.
              Change it. Practise
              it.
            </h2>

            <div
              className="
                mt-8
                grid
                gap-6
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >
              {PRINCIPLES.map(
                (
                  principle,
                ) => (
                  <div
                    key={
                      principle.title
                    }
                  >
                    <div
                      className="
                        h-px
                        w-8
                        bg-cyan-300/60
                      "
                    />

                    <h3
                      className="
                        mt-4
                        text-base
                        font-semibold
                        text-white/85
                      "
                    >
                      {
                        principle.title
                      }
                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-6
                        text-white/38
                      "
                    >
                      {
                        principle.description
                      }
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </Panel>

        {/* Areas */}
        <div
          className="
            mt-16
            grid
            gap-6
            lg:grid-cols-[1fr_0.8fr]
          "
        >
          <Panel>
            <div
              className="
                px-6
                py-8
                sm:px-8
                sm:py-10
              "
            >
              <Eyebrow>
                Areas of interest
              </Eyebrow>

              <h2
                className="
                  mt-3
                  text-2xl
                  font-semibold
                  tracking-[-0.035em]
                  text-white
                "
              >
                The territory
                SyncingTom explores
              </h2>

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  gap-2.5
                "
              >
                {[
                  "Rhythm",
                  "Meter",
                  "Subdivision",
                  "Polymeter",
                  "Timing",
                  "Groove",
                  "Scales",
                  "Intervals",
                  "Music Theory",
                  "Ear Training",
                  "Instrument Practice",
                  "Musical Patterns",
                ].map(
                  (label) => (
                    <InterestTag
                      key={
                        label
                      }
                    >
                      {label}
                    </InterestTag>
                  ),
                )}
              </div>
            </div>
          </Panel>

          <Panel>
            <div
              className="
                px-6
                py-8
                sm:px-8
                sm:py-10
              "
            >
              <Eyebrow>
                Still evolving
              </Eyebrow>

              <h2
                className="
                  mt-3
                  text-2xl
                  font-semibold
                  tracking-[-0.035em]
                  text-white
                "
              >
                This is a working
                music lab.
              </h2>

              <div
                className="
                  mt-5
                  space-y-4
                  text-sm
                  leading-7
                  text-white/43
                "
              >
                <p>
                  SyncingTom is
                  being built
                  incrementally.
                  Tools begin as
                  functional
                  experiments and
                  are refined as
                  their musical
                  behaviour becomes
                  clearer.
                </p>

                <p>
                  That means some
                  parts will remain
                  deliberately
                  simple while the
                  underlying timing,
                  audio, and theory
                  systems are being
                  developed.
                </p>

                <p
                  className="
                    text-white/65
                  "
                >
                  Function first.
                  Musical clarity
                  second. Polish
                  after the idea
                  works.
                </p>
              </div>
            </div>
          </Panel>
        </div>

        {/* Closing */}
        <div
          className="
            mx-auto
            mt-20
            max-w-3xl
            text-center
          "
        >
          <p
            className="
              text-sm
              font-semibold
              tracking-wide
              text-cyan-200/70
            "
          >
            SyncingTom
          </p>

          <p
            className="
              mt-4
              text-2xl
              font-semibold
              tracking-[-0.035em]
              text-white
              sm:text-3xl
            "
          >
            Learn the pattern.
            Hear the relationship.
            Make it musical.
          </p>

          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              text-sm
              leading-7
              text-white/35
            "
          >
            More tools, sounds,
            visualisations, and
            practice systems will
            be added as SyncingTom
            develops.
          </p>

          <Link
            to="/"
            className="
              mt-7
              inline-flex
              min-h-11
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.025]
              px-5
              text-sm
              font-semibold
              text-white/55
              transition
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            Back to SyncingTom
          </Link>
        </div>
      </div>
    </main>
  );
}