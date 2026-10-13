import {
  GENRES,
} from "./genres.js";

import {
  GENRE_REGIONS,
} from "./regions.js";

export {
  GENRES,
  GENRE_REGIONS,
};

export function getGenreBySlug(
  slug,
) {
  return (
    GENRES.find(
      (genre) =>
        genre.slug === slug,
    ) ?? null
  );
}

export function getGenreById(
  id,
) {
  return (
    GENRES.find(
      (genre) =>
        genre.id === id,
    ) ?? null
  );
}

export function getRegionById(
  id,
) {
  return (
    GENRE_REGIONS.find(
      (region) =>
        region.id === id,
    ) ?? null
  );
}

export function getRegionByCountryId(
  countryId,
) {
  const normalized =
    String(countryId)
      .padStart(3, "0");

  return (
    GENRE_REGIONS.find(
      (region) =>
        region.countryIds.includes(
          normalized,
        ),
    ) ?? null
  );
}

export function getGenresForRegion(
  region,
) {
  if (!region) {
    return [];
  }

  return region.genreIds
    .map(getGenreById)
    .filter(Boolean);
}

export function getRegionsForGenre(
  genre,
) {
  if (!genre) {
    return [];
  }

  return genre.regionIds
    .map(getRegionById)
    .filter(Boolean);
}