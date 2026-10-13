import {
  Link,
  useParams,
} from "react-router";

import {
  getGenreById,
  getGenreBySlug,
  getRegionsForGenre,
} from "@/data/genreAtlas/index.js";

export default function GenreDetailPage() {
  const {
    genreSlug,
  } = useParams();

  const genre =
    getGenreBySlug(
      genreSlug,
    );

  if (!genre) {
    return (
      <main
        className="
          mx-auto
          w-full
          max-w-screen-xl
          flex-1
          px-6
          py-16
        "
      >
        <p className="text-white/35">
          Genre not found.
        </p>

        <Link
          to="/genre-atlas"
          className="
            mt-5
            inline-block
            text-sm
            font-semibold
            text-cyan-300
          "
        >
          ← Return to Genre Atlas
        </Link>
      </main>
    );
  }

  const regions =
    getRegionsForGenre(
      genre,
    );

  const relatedGenres =
    genre.relatedGenreIds
      .map(getGenreById)
      .filter(Boolean);

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
      <Link
        to="/genre-atlas"
        className="
          inline-flex
          items-center
          gap-2
          text-xs
          font-semibold
          text-white/35
          transition-colors
          hover:text-cyan-200
        "
      >
        ← Genre Atlas
      </Link>

      <header
        className="
          mt-8
          max-w-4xl
        "
      >
        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.22em]
            text-cyan-300/60
          "
        >
          {regions
            .map(
              (region) =>
                region.name,
            )
            .join(" · ")}
        </p>

        <h1
          className="
            mt-3
            text-5xl
            font-semibold
            tracking-[-0.05em]
            text-white
          "
        >
          {genre.name}
        </h1>

        <p
          className="
            mt-2
            text-sm
            text-white/30
          "
        >
          {genre.era}
        </p>

        <p
          className="
            mt-6
            max-w-3xl
            text-[15px]
            leading-8
            text-white/55
          "
        >
          {genre.description}
        </p>
      </header>

      <section
        className="
          mt-10
          grid
          gap-5
          lg:grid-cols-3
        "
      >
        <DetailBlock
          label="Rhythm"
        >
          {genre.rhythm}
        </DetailBlock>

        <DetailBlock
          label="Harmony"
        >
          {genre.harmony}
        </DetailBlock>

        <DetailBlock
          label="Instrumentation"
        >
          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >
            {genre.instrumentation.map(
              (instrument) => (
                <span
                  key={
                    instrument
                  }
                  className="
                    rounded-lg
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    px-3
                    py-2
                    text-xs
                    text-white/55
                  "
                >
                  {instrument}
                </span>
              ),
            )}
          </div>
        </DetailBlock>
      </section>

      {relatedGenres.length >
      0 ? (
        <section
          className="
            mt-5
            rounded-[2rem]
            border
            border-white/10
            bg-black/25
            p-6
          "
        >
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-white/30
            "
          >
            Related genres
          </p>

          <div
            className="
              mt-4
              flex
              flex-wrap
              gap-2
            "
          >
            {relatedGenres.map(
              (related) => (
                <Link
                  key={
                    related.id
                  }
                  to={`/genre-atlas/${related.slug}`}
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-white/60
                    transition-colors
                    hover:border-cyan-300/25
                    hover:text-cyan-200
                  "
                >
                  {related.name}
                </Link>
              ),
            )}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function DetailBlock({
  label,
  children,
}) {
  return (
    <div
      className="
        rounded-[2rem]
        border
        border-white/10
        bg-black/25
        p-6
      "
    >
      <p
        className="
          text-[10px]
          font-bold
          uppercase
          tracking-[0.18em]
          text-cyan-300/50
        "
      >
        {label}
      </p>

      <div
        className="
          mt-4
          text-sm
          leading-7
          text-white/50
        "
      >
        {children}
      </div>
    </div>
  );
}