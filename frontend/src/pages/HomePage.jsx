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
          pb-4
          pt-3
          sm:px-6
          sm:pb-10
          sm:pt-3
          lg:px-8
          lg:pb-6
          lg:pt-3
        "
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-white/[0.08]
            bg-white/[0.018]
            px-6
            py-7
            shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_24px_80px_rgba(0,0,0,0.14)]
            backdrop-blur-md
            sm:px-8
            sm:py-9
            lg:px-10
            lg:py-10
          "
        >
          {/* subtle hero tint */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
            "
            style={{
              background: `
                radial-gradient(
                  700px circle at 10% 0%,
                  rgba(192,132,252,0.075),
                  transparent 58%
                ),
                radial-gradient(
                  600px circle at 92% 100%,
                  rgba(110,231,183,0.055),
                  transparent 58%
                )
              `,
            }}
          />

          <div
            className="
              relative
              lg:grid
              lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]
              lg:items-center
              lg:gap-14
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
                  text-4xl
                  font-semibold
                  tracking-[-0.055em]
                  text-white
                  sm:text-5xl
                  lg:text-5xl
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
                  text-white/58
                  sm:text-lg
                "
              >
                A small music-practice lab
                for rhythm, timing, pitch
                and musical structure.
              </p>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-7
                  text-white/38
                  sm:text-[15px]
                "
              >
                Hear patterns, change them,
                repeat them, and turn music
                theory into something you can
                work with directly during
                practice.
              </p>
            </div>

            {/* Desktop knowledge */}
            <div
              className="
                hidden
                max-w-md
                border-l
                border-white/[0.07]
                pl-8
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
          pb-4
          sm:px-6
          lg:px-8
        "
      >
        <div
  className="
    relative
    mb-5
    px-5
    py-4
    sm:px-6
    sm:py-5
  "
>
  <div
    className="
      flex
      items-center
      justify-between
      gap-6
    "
  >
    <div>
      <h2
        className="
          text-xl
          font-semibold
          tracking-[-0.025em]
          text-white
          sm:text-2xl
        "
      >
        Pick a practice tool.
      </h2>

      <p
        className="
          mt-1
          text-sm
          leading-6
          text-white/35
        "
      >
        Scroll through the tools
        and start with whatever
        you want to work on.
      </p>
    </div>

    <div
      className="
        hidden
        shrink-0
        items-center
        gap-3
        sm:flex
      "
    >
      {/* <span
        className="
          text-xs
          uppercase
          tracking-[0.16em]
          text-white/25
        "
      >
        {HOME_TOOLS.length} tools
      </span> */}

      <span
        aria-hidden="true"
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          border
          border-white/[0.08]
          bg-white/[0.025]
          text-white/35
        "
      >
        <svg
          viewBox="0 0 20 20"
          className="
            h-4
            w-4
          "
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 4v11" />
          <path d="m6 11 4 4 4-4" />
        </svg>
      </span>
    </div>
  </div>
</div>

        <div
          className="
            space-y-5
            sm:space-y-6
          "
        >
          {HOME_TOOLS.map(
            (
              tool,
              index,
            ) => {
              const stampSide =
                tool.stampSide ??
                (
                  index %
                    2 ===
                  0
                    ? "right"
                    : "left"
                );

              return (
                <ToolCard
                  key={
                    tool.id
                  }
                  to={
                    tool.route
                  }
                  title={
                    tool.title
                  }
                  description={
                    tool.description
                  }
                  practice={
                    tool.practice
                  }
                  group={
                    tool.group
                  }
                  badge={
                    tool.badge
                  }
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
                  ctaLabel="Start Practicing"
                  minHeight={
                    280
                  }
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