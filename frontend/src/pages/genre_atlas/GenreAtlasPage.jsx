import {
  useState,
} from "react";

import {
  GENRE_REGIONS,
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
          lg:grid-cols-[minmax(0,1fr)_20rem]
        "
      >
        <div
          className="
            rounded-[2rem]
            border
            border-white/10
            bg-black/25
            p-4
            shadow-[0_24px_80px_rgba(0,0,0,0.18)]
            backdrop-blur-sm
            sm:p-5
          "
        >
          <div
            className="
              mb-4
              flex
              items-center
              justify-between
              gap-4
              px-1
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white/30
                "
              >
                World map
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-white/30
                "
              >
                Hover or select a
                highlighted region
              </p>
            </div>

            <p
              className="
                hidden
                text-xs
                text-white/20
                sm:block
              "
            >
              {
                GENRE_REGIONS.length
              }{" "}
              mapped regions
            </p>
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
            onRegionSelect={(
              regionId,
            ) =>
              setSelectedRegionId(
                (current) =>
                  current ===
                  regionId
                    ? null
                    : regionId,
              )
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