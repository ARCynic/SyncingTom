import { Link } from "react-router";

import FloatingNotes from "@/components/home/FloatingNotes.jsx";

export default function HomePage() {
  return (
    <main
      className="
        relative
        isolate
        min-h-screen
        overflow-hidden
      "
    >
      {/* Entire-page animated background */}
      <FloatingNotes
        count={22}
        className="
          absolute
          inset-0
          z-0
        "
      />

      {/* HERO */}
      <section
        className="
          relative
          z-10
          flex
          min-h-[78vh]
          items-center
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-screen-xl
            px-4
            py-24
            sm:px-6
            lg:px-8
          "
        >
          <div className="max-w-3xl">
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.24em]
                text-purple-300/60
              "
            >
              Rhythm · Timing · Practice
            </p>

            <h1
              className="
                mt-5
                text-5xl
                font-semibold
                tracking-[-0.05em]
                text-white
                sm:text-6xl
                lg:text-7xl
              "
            >
              Syncing
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
                mt-6
                max-w-2xl
                text-lg
                leading-8
                text-white/50
              "
            >
              Focused tools for rhythm,
              timing, changing meters
              and deliberate musical
              practice.
            </p>

            {/* <div
              className="
                mt-9
                flex
                flex-wrap
                gap-3
              "
            >
              <Link
                to="/tools/meter-sequence"
                className="
                  rounded-full
                  bg-gradient-to-r
                  from-purple-300
                  to-emerald-300
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-black
                  transition
                  hover:scale-[1.03]
                  hover:brightness-110
                "
              >
                Open Meter Sequence
              </Link>
            </div> */}
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-screen-xl
          px-4
          py-24
          sm:px-6
          lg:px-8
        "
      >
        {/* <div
          className="
            rounded-[2rem]
            border
            border-white/[0.08]
            bg-black/30
            p-8
            backdrop-blur-sm
            sm:p-10
          "
        >
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-emerald-300/50
            "
          >
            Current utility
          </p>

          <h2
            className="
              mt-3
              text-3xl
              font-semibold
              tracking-tight
              text-white
            "
          >
            Meter Sequence
          </h2>

          <p
            className="
              mt-4
              max-w-2xl
              leading-7
              text-white/45
            "
          >
            Build changing meter
            sequences such as
            5/4 → 7/8 → 4/4 and
            practice them with an
            accurately scheduled
            click track.
          </p>
        </div> */}
      </section>

      {/* FUTURE TOOLS */}
      <section
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-screen-xl
          px-4
          pb-32
          sm:px-6
          lg:px-8
        "
      >
        {/* <div
          className="
            border-t
            border-white/[0.07]
            pt-16
          "
        >
          <p
            className="
              text-sm
              uppercase
              tracking-[0.18em]
              text-white/25
            "
          >
            More rhythm tools will
            live here.
          </p>
        </div> */}
      </section>
    </main>
  );
}