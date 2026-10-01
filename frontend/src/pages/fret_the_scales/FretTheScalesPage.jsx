import {
  Link,
} from "react-router";

const STRINGS = [
  {
    name: "G",
    notes: [
      "G",
      "G♯",
      "A",
      "A♯",
      "B",
      "C",
      "C♯",
      "D",
    ],
  },

  {
    name: "D",
    notes: [
      "D",
      "D♯",
      "E",
      "F",
      "F♯",
      "G",
      "G♯",
      "A",
    ],
  },

  {
    name: "A",
    notes: [
      "A",
      "A♯",
      "B",
      "C",
      "C♯",
      "D",
      "D♯",
      "E",
    ],
  },

  {
    name: "E",
    notes: [
      "E",
      "F",
      "F♯",
      "G",
      "G♯",
      "A",
      "A♯",
      "B",
    ],
  },
];

export default function FretTheScalesPage() {
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
              800px circle at 18% 5%,
              rgba(196,181,253,0.08),
              transparent 58%
            ),
            radial-gradient(
              700px circle at 85% 30%,
              rgba(103,232,249,0.055),
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
        {/* Header */}
        <header
          className="
            max-w-4xl
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            <p
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-violet-300/70
              "
            >
              Bass / Guitar
            </p>

            <span
              className="
                rounded-full
                border
                border-violet-300/15
                bg-violet-300/[0.05]
                px-3
                py-1
                text-[9px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-violet-200/60
              "
            >
              In development
            </span>
          </div>

          <h1
            className="
              mt-5
              text-4xl
              font-semibold
              tracking-[-0.055em]
              text-white
              sm:text-5xl
              lg:text-6xl
            "
          >
            Fret the{" "}

            <span
              className="
                bg-gradient-to-r
                from-violet-200
                via-blue-300
                to-cyan-200
                bg-clip-text
                text-transparent
              "
            >
              Scales.
            </span>
          </h1>

          <p
            className="
              mt-6
              max-w-3xl
              text-base
              leading-8
              text-white/46
              sm:text-lg
            "
          >
            Short fretboard practice
            routines for connecting
            scales, intervals, and
            note names to the physical
            neck of the instrument.
          </p>
        </header>

        {/* Instrument idea */}
        <section
          className="
            mt-12
            grid
            gap-4
            sm:grid-cols-2
          "
        >
          <div
            className="
              rounded-[1.5rem]
              border
              border-white/[0.08]
              bg-black/25
              p-6
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-white/28
              "
            >
              Instrument
            </p>

            <p
              className="
                mt-3
                text-xl
                font-semibold
                text-white/85
              "
            >
              4-string Bass
            </p>

            <p
              className="
                mt-2
                text-sm
                text-white/35
              "
            >
              Standard tuning · E A D G
            </p>
          </div>

          <div
            className="
              rounded-[1.5rem]
              border
              border-white/[0.08]
              bg-black/25
              p-6
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-white/28
              "
            >
              Instrument
            </p>

            <p
              className="
                mt-3
                text-xl
                font-semibold
                text-white/85
              "
            >
              6-string Guitar
            </p>

            <p
              className="
                mt-2
                text-sm
                text-white/35
              "
            >
              Standard tuning · E A D G B E
            </p>
          </div>
        </section>

        {/* Fake fretboard */}
        <section
          className="
            mt-6
            overflow-hidden
            rounded-[2rem]
            border
            border-white/[0.08]
            bg-black/35
            shadow-[0_24px_90px_rgba(0,0,0,0.35)]
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-start
              justify-between
              gap-5
              border-b
              border-white/[0.07]
              px-6
              py-6
              sm:px-8
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-violet-300/60
                "
              >
                Preview
              </p>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-semibold
                  tracking-[-0.035em]
                  text-white
                "
              >
                Fretboard practice space
              </h2>

              <p
                className="
                  mt-2
                  max-w-xl
                  text-sm
                  leading-6
                  text-white/34
                "
              >
                This is only a visual
                placeholder. The actual
                practice engine comes
                later.
              </p>
            </div>

            <div
              className="
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.025]
                px-4
                py-2
                text-xs
                text-white/38
              "
            >
              D Dorian
            </div>
          </div>

          <div
            className="
              overflow-x-auto
              px-4
              py-8
              sm:px-8
              sm:py-10
            "
          >
            <div
              className="
                min-w-[760px]
              "
            >
              {/* fret numbers */}
              <div
                className="
                  ml-12
                  grid
                  grid-cols-8
                  text-center
                "
              >
                {Array.from({
                  length: 8,
                }).map(
                  (
                    _,
                    index,
                  ) => (
                    <span
                      key={
                        index
                      }
                      className="
                        pb-3
                        font-mono
                        text-[9px]
                        text-white/18
                      "
                    >
                      {index}
                    </span>
                  ),
                )}
              </div>

              <div
                className="
                  space-y-1
                "
              >
                {STRINGS.map(
                  (string) => (
                    <div
                      key={
                        string.name
                      }
                      className="
                        grid
                        grid-cols-[3rem_repeat(8,minmax(5rem,1fr))]
                        items-center
                      "
                    >
                      <div
                        className="
                          pr-4
                          text-right
                          font-mono
                          text-xs
                          font-bold
                          text-white/32
                        "
                      >
                        {
                          string.name
                        }
                      </div>

                      {string.notes.map(
                        (
                          note,
                          index,
                        ) => {
                          const scaleTone =
                            [
                              "D",
                              "E",
                              "F",
                              "G",
                              "A",
                              "B",
                              "C",
                            ].includes(
                              note,
                            );

                          const root =
                            note ===
                            "D";

                          return (
                            <div
                              key={`${string.name}-${index}-${note}`}
                              className="
                                relative
                                flex
                                h-12
                                items-center
                                justify-center
                                border-l
                                border-white/[0.08]
                              "
                            >
                              <div
                                className="
                                  pointer-events-none
                                  absolute
                                  inset-x-0
                                  top-1/2
                                  h-px
                                  bg-white/15
                                "
                              />

                              {scaleTone ? (
                                <div
                                  className={`
                                    relative
                                    z-10
                                    flex
                                    h-7
                                    w-7
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    text-[10px]
                                    font-bold
                                    ${
                                      root
                                        ? `
                                            border-violet-200/50
                                            bg-violet-300/20
                                            text-violet-100
                                          `
                                        : `
                                            border-cyan-200/20
                                            bg-cyan-300/[0.07]
                                            text-cyan-100/65
                                          `
                                    }
                                  `}
                                >
                                  {
                                    note
                                  }
                                </div>
                              ) : null}
                            </div>
                          );
                        },
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Planned routines */}
        <section
          className="
            mt-6
            rounded-[2rem]
            border
            border-white/[0.08]
            bg-white/[0.018]
            px-6
            py-8
            sm:px-8
          "
        >
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-white/28
            "
          >
            Planned exercises
          </p>

          <div
            className="
              mt-6
              grid
              gap-6
              md:grid-cols-3
            "
          >
            <div>
              <h3
                className="
                  font-semibold
                  text-white/80
                "
              >
                Note Hunt
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-white/32
                "
              >
                Find requested notes
                across strings and fret
                positions.
              </p>
            </div>

            <div>
              <h3
                className="
                  font-semibold
                  text-white/80
                "
              >
                Degree Hunt
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-white/32
                "
              >
                Locate roots, thirds,
                fifths, sevenths, and
                other scale degrees.
              </p>
            </div>

            <div>
              <h3
                className="
                  font-semibold
                  text-white/80
                "
              >
                Scale Paths
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-white/32
                "
              >
                Follow scales through a
                defined fret range and
                position.
              </p>
            </div>
          </div>
        </section>

        <div
          className="
            mt-10
            flex
            flex-wrap
            gap-3
          "
        >
          <Link
            to="/scales"
            className="
              inline-flex
              min-h-11
              items-center
              justify-center
              rounded-xl
              border
              border-violet-300/20
              bg-violet-300/[0.06]
              px-5
              text-sm
              font-semibold
              text-violet-100
              transition
              hover:bg-violet-300/[0.1]
            "
          >
            Open Scale Archive
          </Link>

          <Link
            to="/"
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
              text-white/48
              transition
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}