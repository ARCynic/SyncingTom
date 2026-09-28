import {
  useMemo,
  useState,
} from "react";

import {
  SCALES,
  getScaleById,
} from "@/data/scales/index.js";

import {
  RootSelector,
} from "@/components/scales/RootSelector.jsx";

import {
  ScaleCard,
} from "@/components/scales/ScaleCard.jsx";

import {
  ScaleDetail,
} from "@/components/scales/ScaleDetail.jsx";

const DEFAULT_SCALE = "major";
const DEFAULT_ROOT = "C";

export default function ScaleArchivePage() {
  const [
    selectedScaleId,
    setSelectedScaleId,
  ] = useState(DEFAULT_SCALE);

  const [
    root,
    setRoot,
  ] = useState(DEFAULT_ROOT);

  const [
    query,
    setQuery,
  ] = useState("");

  const selectedScale =
    getScaleById(selectedScaleId) ??
    SCALES[0];

  const filteredScales =
    useMemo(() => {
      const normalized = query
        .trim()
        .toLowerCase();

      if (!normalized) {
        return SCALES;
      }

      return SCALES.filter(
        (scale) => {
          const haystack = [
            scale.name,
            scale.modeName,
            scale.family,
            ...scale.aliases,
            ...scale.formula,
          ]
            .join(" ")
            .toLowerCase();

          return haystack.includes(
            normalized,
          );
        },
      );
    }, [query]);

  return (
    <main
      className="
        scale-theme
        mx-auto
        w-full
        max-w-screen-xl
        flex-1
        px-4
        py-8
        sm:px-6
        sm:py-12
        lg:px-8
      "
    >
      <header
        className="
          mb-8
          max-w-4xl
          sm:mb-10
        "
      >
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.22em]
            text-cyan-300/65
          "
        >
          Music theory archive
        </p>

        <h1
          className="
            mt-3
            text-4xl
            font-semibold
            tracking-[-0.04em]
            text-white
            sm:text-5xl
          "
        >
          Scale{" "}
          <span className="scale-gradient-text">
            Archive
          </span>
        </h1>

        <p
          className="
            mt-4
            max-w-3xl
            text-base
            leading-7
            text-white/50
          "
        >
          Explore scales, modes,
          interval formulas and their
          relationships. Change the
          tonic to see the same musical
          structure from any root.
        </p>
      </header>

      <section
        className="
          mb-6
          grid
          gap-4
          rounded-[2rem]
          border
          border-white/10
          bg-black/25
          p-5
          backdrop-blur-sm
          sm:p-6
          md:grid-cols-[minmax(0,1fr)_11rem]
        "
      >
        <label className="block">
          <span
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-white/35
            "
          >
            Search
          </span>

          <input
            type="search"
            value={query}
            onChange={(event) =>
              setQuery(
                event.target.value,
              )
            }
            placeholder="Dorian, minor, ♭7..."
            className="
              mt-2
              h-12
              w-full
              rounded-xl
              border
              border-white/10
              bg-black/35
              px-4
              text-sm
              text-white
              outline-none
              transition
              placeholder:text-white/20
              hover:border-white/20
            "
          />
        </label>

        <RootSelector
          value={root}
          onChange={setRoot}
        />
      </section>

      <div
        className="
          grid
          gap-6
          lg:grid-cols-[20rem_minmax(0,1fr)]
        "
      >
        <section>
          <div
            className="
              mb-3
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <h2
              className="
                text-sm
                font-semibold
                text-white/70
              "
            >
              Diatonic modes
            </h2>

            <span
              className="
                text-xs
                text-white/30
              "
            >
              {filteredScales.length} results
            </span>
          </div>

          <div
            className="
              grid
              gap-2
              sm:grid-cols-2
              lg:grid-cols-1
            "
          >
            {filteredScales.map(
              (scale) => (
                <ScaleCard
                  key={scale.id}
                  scale={scale}
                  selected={
                    selectedScale.id ===
                    scale.id
                  }
                  onSelect={
                    setSelectedScaleId
                  }
                />
              ),
            )}
          </div>

          {filteredScales.length === 0 ? (
            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.02]
                p-5
                text-sm
                text-white/40
              "
            >
              No scales match that search.
            </div>
          ) : null}
        </section>

        <ScaleDetail
          scale={selectedScale}
          root={root}
          allScales={SCALES}
          onScaleSelect={
            setSelectedScaleId
          }
        />
      </div>
    </main>
  );
}