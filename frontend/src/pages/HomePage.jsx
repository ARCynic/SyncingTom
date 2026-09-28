import { Link } from "react-router";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-screen-xl flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <section className="max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/70">
          Rhythm tools
        </p>

        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
          Syncing
          <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
            Tom
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/55">
          Focused browser tools for rhythm, timing, and deliberate musical
          practice.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Link
            to="/tools/meter-sequence"
            className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-cyan-300/25 hover:bg-white/[0.055] hover:shadow-[0_20px_70px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300/70">
                  Available now
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Meter Sequence
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-white/50">
                  Chain meters such as 5/4 → 7/8 → 4/4 and practice them as one
                  continuous click track.
                </p>
              </div>

              <span className="mt-1 text-2xl text-cyan-200/50 transition group-hover:translate-x-1 group-hover:text-cyan-200">
                →
              </span>
            </div>
          </Link>

          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.015] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/30">
              Next
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white/55">
              More rhythm tools
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/35">
              Polymeter, polyrhythm, subdivision, and tempo-practice tools can
              reuse the same timing engine.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
