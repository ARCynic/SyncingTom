import ToolShowcase from "../components/home/ToolShowcase.jsx";

export default function HomePage() {
  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
      "
    >
      {/* HERO */}
      <section
        className="
          relative
          flex
          min-h-[46vh]
          items-end
          overflow-hidden
          pb-10
          pt-24
          sm:min-h-[48vh]
          sm:pb-12
          sm:pt-28
          lg:min-h-[50vh]
        "
      >
        {/* subtle hero atmosphere */}
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
                700px circle at 28% 62%,
                rgba(168,85,247,0.055),
                transparent 58%
              ),
              radial-gradient(
                650px circle at 72% 55%,
                rgba(52,211,153,0.035),
                transparent 62%
              )
            `,
          }}
        />

        <div
          className="
            mx-auto
            w-full
            max-w-screen-xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div className="max-w-4xl">
            <p
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.24em]
                text-purple-300/60
                sm:text-xs
              "
            >
              Drums · Bass · Guitar · Practice
            </p>

            <h1
              className="
                mt-4
                text-5xl
                font-semibold
                tracking-[-0.055em]
                text-white
                sm:text-6xl
                lg:text-7xl
              "
            >
              <span
                className="
                  bg-gradient-to-r
                  from-amber-300
                  to-purple-300
                  bg-clip-text
                  text-transparent
                "
              >
                Syncing
              </span>

              <span
                className="
                  bg-gradient-to-r
                  from-purple-300
                  to-emerald-300
                  bg-clip-text
                  text-transparent
                "
              >
                Tom
              </span>
            </h1>

            <p
              className="
                mt-5
                max-w-2xl
                text-base
                leading-7
                text-white/48
                sm:text-lg
                sm:leading-8
              "
            >
              Focused practice tools
              for rhythm, timing,
              scales, and finding
              your way around the
              fretboard.
            </p>

            <div
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-4
              "
            >
              <a
                href="#practice-tools"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-white/55
                  transition
                  hover:border-cyan-300/20
                  hover:bg-cyan-300/[0.04]
                  hover:text-cyan-100
                "
              >
                Explore the tools

                <span
                  aria-hidden="true"
                  className="
                    text-white/30
                  "
                >
                  ↓
                </span>
              </a>

              <span
                className="
                  text-xs
                  text-white/20
                "
              >
                Built for actual
                practice sessions.
              </span>
            </div>
          </div>
        </div>
      </section>

      <ToolShowcase />

      <section
        className="
          relative
          mx-auto
          w-full
          max-w-screen-xl
          px-4
          pb-20
          sm:px-6
          lg:px-8
        "
      />
    </main>
  );
}