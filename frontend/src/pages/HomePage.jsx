export default function HomePage() {
  return (
    <main
      className="
        relative
        min-h-screen
      "
    >
      {/* HERO */}
      <section
        className="
          relative
          flex
          min-h-[82vh]
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
                mt-6
                max-w-2xl
                text-lg
                leading-8
                text-white/50
                sm:text-xl
              "
            >
              Focused tools for rhythm,
              timing, changing meters
              and deliberate musical
              practice.
            </p>
          </div>
        </div>
      </section>

      {/* Reserved for future home modules */}
      <section
        className="
          relative
          mx-auto
          w-full
          max-w-screen-xl
          px-4
          pb-32
          sm:px-6
          lg:px-8
        "
      />
    </main>
  );
}