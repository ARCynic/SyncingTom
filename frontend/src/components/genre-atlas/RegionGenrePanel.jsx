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
          min-h-[26rem]
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
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-cyan-300/15
              bg-cyan-300/[0.05]
            "
          >
            <span
              aria-hidden="true"
              className="
                h-2
                w-2
                rounded-full
                bg-cyan-300/70
                shadow-[0_0_12px_rgba(103,232,249,0.5)]
              "
            />
          </div>

          <p
            className="
              mt-6
              text-[10px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-cyan-300/55
            "
          >
            Explore
          </p>

          <h2
            className="
              mt-3
              text-2xl
              font-semibold
              tracking-[-0.04em]
              text-white
            "
          >
            Find the sound
          </h2>

          <p
            className="
              mt-4
              text-sm
              leading-7
              text-white/45
            "
          >
            Hover or focus a
            highlighted part of the
            world to see the genres
            connected with that
            region.
          </p>
        </div>

        <div
          className="
            border-t
            border-white/[0.07]
            pt-5
          "
        >
          <p
            className="
              text-xs
              leading-6
              text-white/25
            "
          >
            Select a region to keep
            it open while exploring
            its genres.
          </p>
        </div>
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
        min-h-[26rem]
        rounded-[2rem]
        border
        border-cyan-300/15
        bg-black/30
        p-6
        shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        backdrop-blur-sm
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <span
          aria-hidden="true"
          className="
            h-1.5
            w-1.5
            rounded-full
            bg-cyan-300
            shadow-[0_0_10px_rgba(103,232,249,0.55)]
          "
        />

        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.2em]
            text-cyan-300/65
          "
        >
          Region
        </p>
      </div>

      <h2
        className="
          mt-4
          text-3xl
          font-semibold
          tracking-[-0.045em]
          text-white
        "
      >
        {region.name}
      </h2>

      <p
        className="
          mt-3
          text-sm
          leading-6
          text-white/35
        "
      >
        Explore musical traditions
        associated with this part of
        the world.
      </p>

      <div
        className="
          mt-6
          border-t
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
                border-b
                border-white/[0.07]
                py-4
                outline-none
              "
            >
              <div
                className="
                  min-w-0
                "
              >
                <p
                  className="
                    font-semibold
                    text-white/75
                    transition-colors
                    duration-100
                    group-hover:text-cyan-200
                    group-focus-visible:text-cyan-200
                  "
                >
                  {genre.name}
                </p>

                <p
                  className="
                    mt-1
                    truncate
                    text-[11px]
                    text-white/30
                  "
                >
                  {genre.era}
                </p>
              </div>

              <span
                aria-hidden="true"
                className="
                  shrink-0
                  text-lg
                  text-white/20
                  transition
                  duration-100
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