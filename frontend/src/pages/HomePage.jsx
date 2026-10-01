import ToolCard from "@/components/home/ToolCard.jsx";

import {
  HOME_TOOLS,
} from "@/data/tools.js";

export default function HomePage() {
  return (
    <main
      className="
        relative
        min-h-screen
      "
    >
      {/* --------------------------------
          HERO
      -------------------------------- */}

      <section
        className="
          relative
          mx-auto
          flex
          min-h-[52vh]
          w-full
          max-w-screen-2xl
          items-center
          px-4
          pb-14
          pt-20
          sm:px-6
          sm:pb-16
          sm:pt-24
          lg:px-8
          lg:pt-28
        "
      >
        <div
          className="
            max-w-4xl
          "
        >
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.24em]
              text-purple-300/55
            "
          >
            Tools for music practice
          </p>

          <h1
            className="
              mt-5
              max-w-4xl
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
              mt-6
              max-w-2xl
              text-base
              leading-8
              text-white/45
              sm:text-lg
            "
          >
            Focused tools for rhythm,
            timing, pitch and deliberate
            musical practice.
          </p>
        </div>
      </section>

      {/* --------------------------------
          TOOL INDEX
      -------------------------------- */}

      <section
        className="
          relative
          mx-auto
          w-full
          max-w-screen-2xl
          px-4
          pb-32
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            mb-8
            flex
            items-end
            justify-between
            gap-6
            border-b
            border-white/[0.07]
            pb-5
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-emerald-300/45
              "
            >
              Practice tools
            </p>

            <h2
              className="
                mt-2
                text-2xl
                font-semibold
                tracking-[-0.025em]
                text-white
                sm:text-3xl
              "
            >
              Pick a tool
            </h2>
          </div>

          <span
            className="
              hidden
              text-xs
              uppercase
              tracking-[0.14em]
              text-white/20
              sm:block
            "
          >
            {HOME_TOOLS.length} tools
          </span>
        </div>

        {/* Tool cards */}

        <div
          className="
            space-y-5
            sm:space-y-6
          "
        >
          {HOME_TOOLS.map(
            (tool, index) => {
              /*
               * Explicit stampSide wins.
               *
               * If it isn't supplied,
               * alternate automatically
               * so later tools do not all
               * fall onto the same side.
               */
              const stampSide =
                tool.stampSide ??
                (
                  index % 2 === 0
                    ? "right"
                    : "left"
                );

              return (
                <ToolCard
                  key={tool.id}
                  to={tool.route}
                  title={tool.title}
                  description={
                    tool.description
                  }
                  practice={
                    tool.practice
                  }
                  group={tool.group}
                  badge={tool.badge}
                  stampSrc={
                    tool.stamp
                  }
                  stampAlt={`${tool.title} visual`}
                  monogram={
                    tool.monogram
                  }
                  accent={
                    tool.accent
                  }
                  glow={tool.glow}
                  stampSide={
                    stampSide
                  }
                  ctaLabel="Open"
                  minHeight={280}
                  split={[
                    1.7,
                    1,
                  ]}
                />
              );
            },
          )}
        </div>
      </section>
    </main>
  );
}