import {
  useEffect,
  useState,
} from "react";

import ToolCard from "@/components/home/ToolCard.jsx";

import {
  HOME_TOOLS,
} from "@/data/tools.js";

import {
  MUSIC_KNOWLEDGE,
} from "@/data/musicKnowledge.js";

const KNOWLEDGE_INTERVAL_MS =
  15_000;

export default function HomePage() {
  const [
    knowledgeIndex,
    setKnowledgeIndex,
  ] = useState(0);

  useEffect(() => {
    const timerId =
      window.setInterval(
        () => {
          setKnowledgeIndex(
            (current) =>
              (
                current + 1
              ) %
              MUSIC_KNOWLEDGE.length,
          );
        },
        KNOWLEDGE_INTERVAL_MS,
      );

    return () => {
      window.clearInterval(
        timerId,
      );
    };
  }, []);

  const knowledge =
    MUSIC_KNOWLEDGE[
      knowledgeIndex
    ];

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
          w-full
          max-w-screen-2xl
          px-4
          pb-8
          pt-8
          sm:px-6
          sm:pb-10
          sm:pt-10
          lg:px-8
          lg:pb-12
          lg:pt-12
        "
      >
        <div
          className="
            lg:grid
            lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]
            lg:items-end
            lg:gap-12
          "
        >
          {/* Hero copy */}
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
                mt-4
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
                mt-5
                max-w-2xl
                text-base
                leading-7
                text-white/45
                sm:text-lg
              "
            >
              Focused tools for rhythm,
              timing, pitch and deliberate
              musical practice.
            </p>
          </div>

          {/* Desktop knowledge */}
          <div
            className="
              hidden
              max-w-md
              pb-1
              text-right
              lg:block
              lg:justify-self-end
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-cyan-300/45
              "
            >
              Did you know?
            </p>

            <p
              key={
                knowledge.id
              }
              className="
                mt-3
                text-sm
                leading-6
                text-white/38
              "
            >
              {
                knowledge.text
              }
            </p>
          </div>
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

        <div
          className="
            space-y-5
            sm:space-y-6
          "
        >
          {HOME_TOOLS.map(
            (tool, index) => {
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
                  glow={
                    tool.glow
                  }
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