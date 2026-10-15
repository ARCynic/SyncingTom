import {
  useState,
} from "react";

import {
  getRegionById,
} from "@/data/genreAtlas/index.js";

import {
  WorldGenreMap,
} from "@/components/genre-atlas/WorldGenreMap.jsx";

import {
  RegionGenrePanel,
} from "@/components/genre-atlas/RegionGenrePanel.jsx";

export default function GenreAtlasPage() {
  const [
    hoveredRegionId,
    setHoveredRegionId,
  ] = useState(null);

  const [
    selectedRegionId,
    setSelectedRegionId,
  ] = useState(null);

  const activeRegionId =
    hoveredRegionId ??
    selectedRegionId;

  const activeRegion =
    getRegionById(
      activeRegionId,
    );

  function handleRegionSelect(
    regionId,
  ) {
    setSelectedRegionId(
      (current) =>
        current === regionId
          ? null
          : regionId,
    );
  }

  return (
    <main
      className="
        genre-theme
        mx-auto
        w-full
        max-w-screen-xl
        flex-1
        px-4
        pb-12
        pt-3
        sm:px-6
        lg:px-8
      "
    >
      <header
        className="
          mb-7
          max-w-3xl
        "
      >
        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.22em]
            text-cyan-300/55
          "
        >
          Geography of sound
        </p>

        <h1
          className="
            mt-3
            text-4xl
            font-semibold
            tracking-[-0.045em]
            text-white
            sm:text-5xl
          "
        >
          Genre{" "}

          <span className="genre-gradient-text">
            Atlas
          </span>
        </h1>

        <p
          className="
            mt-3
            max-w-2xl
            text-sm
            leading-7
            text-white/45
            sm:text-[15px]
          "
        >
          Explore musical styles
          through the places where
          they emerged, developed
          and influenced one another.
        </p>
      </header>

      <section
        className="
          grid
          gap-5
          lg:grid-cols-[minmax(0,1fr)_19rem]
          lg:items-stretch
        "
      >
        <div
          className="
            overflow-hidden
            rounded-[2rem]
            border
            border-white/10
            bg-[#080c0f]/80
            shadow-[0_24px_80px_rgba(0,0,0,0.20)]
            backdrop-blur-sm
          "
        >
          <div
            className="
              flex
              items-end
              justify-between
              gap-6
              px-5
              pb-3
              pt-5
              sm:px-6
              sm:pt-6
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-cyan-300/55
                "
              >
                World map
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  text-white/38
                "
              >
                Move across the map
                to discover regional
                music traditions.
              </p>
            </div>

            {activeRegion ? (
              <p
                className="
                  hidden
                  text-xs
                  font-semibold
                  text-cyan-200/60
                  sm:block
                "
              >
                {activeRegion.name}
              </p>
            ) : null}
          </div>

          <WorldGenreMap
            activeRegionId={
              activeRegionId
            }
            onRegionEnter={
              setHoveredRegionId
            }
            onRegionLeave={() =>
              setHoveredRegionId(
                null,
              )
            }
            onRegionSelect={
              handleRegionSelect
            }
          />
        </div>

        <RegionGenrePanel
          region={
            activeRegion
          }
        />
      </section>
    </main>
  );
}