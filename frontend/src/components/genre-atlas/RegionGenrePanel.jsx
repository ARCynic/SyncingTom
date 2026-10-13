import {
  Link,
} from "react-router";

import {
  getGenresForRegion,
} from "@/data/genreAtlas/index.js";

export function RegionGenrePanel({
  region,
}) {
  if (!region) {
    return (
      <aside
        className="
          flex
          min-h-full
          flex-col
          justify-between
          rounded-[2rem]
          border
          border-white/10
          bg-black/25
          p-6
          backdrop-blur-sm
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-cyan-300/60
            "
          >
            Explore the map
          </p>

          <h2
            className="
              mt-4
              text-2xl
              font-semibold
              text-white
            "
          >
            Musical geography
          </h2>

          <p
            className="
              mt-4
              text-sm
              leading-7
              text-white/45
            "
          >
            Hover, focus or select a
            highlighted part of the
            world to reveal genres
            associated with that
            region.
          </p>
        </div>

        <p
          className="
            mt-8
            text-xs
            leading-6
            text-white/25
          "
        >
          Genres can appear in more
          than one region because
          musical traditions travel,
          mix and develop across
          borders.
        </p>
      </aside>
    );
  }

  const genres =
    getGenresForRegion(
      region,
    );

  return (
    <aside
      className="
        rounded-[2rem]
        border
        border-white/10
        bg-black/25
        p-6
        backdrop-blur-sm
      "
    >
      <p
        className="
          text-[10px]
          font-bold
          uppercase
          tracking-[0.2em]
          text-cyan-300/60
        "
      >
        Region
      </p>

      <h2
        className="
          mt-3
          text-3xl
          font-semibold
          tracking-[-0.04em]
          text-white
        "
      >
        {region.name}
      </h2>

      <p
        className="
          mt-2
          text-xs
          text-white/30
        "
      >
        {genres.length}{" "}
        {genres.length === 1
          ? "genre"
          : "genres"}{" "}
        in the current atlas
      </p>

      <div
        className="
          mt-6
          divide-y
          divide-white/[0.07]
          border-y
          border-white/[0.07]
        "
      >
        {genres.map(
          (genre) => (
            <Link
              key={
                genre.id
              }
              to={`/genre-atlas/${genre.slug}`}
              className="
                group
                flex
                items-center
                justify-between
                gap-4
                py-4
                outline-none
              "
            >
              <div>
                <p
                  className="
                    font-semibold
                    text-white/75
                    transition-colors
                    group-hover:text-cyan-200
                    group-focus-visible:text-cyan-200
                  "
                >
                  {genre.name}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-white/30
                  "
                >
                  {genre.era}
                </p>
              </div>

              <span
                aria-hidden="true"
                className="
                  text-white/20
                  transition
                  group-hover:translate-x-1
                  group-hover:text-cyan-300
                "
              >
                →
              </span>
            </Link>
          ),
        )}
      </div>
    </aside>
  );
}