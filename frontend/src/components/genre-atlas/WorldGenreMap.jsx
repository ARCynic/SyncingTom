import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

import worldMap from "world-atlas/countries-110m.json";

import {
  getRegionByCountryId,
} from "@/data/genreAtlas/index.js";

const COLORS = {
  land: "#3b4750",
  landBorder: "#5b6871",

  mapped: "#35646c",
  mappedBorder: "#76a3aa",

  active: "#4faeb5",
  activeBorder: "#b9fffa",
};

function normalizeCountryId(id) {
  return String(
    id ?? "",
  ).padStart(3, "0");
}

export function WorldGenreMap({
  activeRegionId,
  onRegionEnter,
  onRegionLeave,
  onRegionSelect,
}) {
  return (
    <div
      className="
        relative
        w-full
        overflow-hidden
        bg-[#0d1519]
      "
      style={{
        background:
          "radial-gradient(circle at 28% 42%, rgba(103,232,249,0.08), transparent 32%), radial-gradient(circle at 75% 50%, rgba(192,132,252,0.055), transparent 34%), #0d1519",
      }}
    >
      <ComposableMap
        projection="geoEqualEarth"
        width={900}
        height={430}
        projectionConfig={{
          scale: 168,
          center: [0, 10],
        }}
        className="
          block
          h-auto
          w-full
        "
      >
        <Geographies
          geography={
            worldMap
          }
        >
          {({ geographies }) =>
            geographies.map(
              (geo) => {
                const countryId =
                  normalizeCountryId(
                    geo.id,
                  );

                const region =
                  getRegionByCountryId(
                    countryId,
                  );

                const isMapped =
                  Boolean(region);

                const isActive =
                  Boolean(
                    region &&
                      region.id ===
                        activeRegionId,
                  );

                const isDimmed =
                  Boolean(
                    activeRegionId &&
                      region &&
                      !isActive,
                  );

                const countryName =
                  geo.properties
                    ?.name ??
                  "Country";

                const fill =
                  isActive
                    ? COLORS.active
                    : isMapped
                      ? COLORS.mapped
                      : COLORS.land;

                const stroke =
                  isActive
                    ? COLORS.activeBorder
                    : isMapped
                      ? COLORS.mappedBorder
                      : COLORS.landBorder;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={
                      isActive
                        ? 1.5
                        : isMapped
                          ? 0.8
                          : 0.55
                    }
                    opacity={
                      isDimmed
                        ? 0.55
                        : 1
                    }
                    vectorEffect="non-scaling-stroke"
                    tabIndex={
                      isMapped
                        ? 0
                        : -1
                    }
                    role={
                      isMapped
                        ? "button"
                        : undefined
                    }
                    aria-label={
                      region
                        ? `${countryName} — ${region.name}`
                        : countryName
                    }
                    aria-pressed={
                      isMapped
                        ? isActive
                        : undefined
                    }
                    onMouseEnter={() => {
                      if (region) {
                        onRegionEnter?.(
                          region.id,
                        );
                      }
                    }}
                    onMouseLeave={() => {
                      if (region) {
                        onRegionLeave?.();
                      }
                    }}
                    onFocus={() => {
                      if (region) {
                        onRegionEnter?.(
                          region.id,
                        );
                      }
                    }}
                    onBlur={() => {
                      if (region) {
                        onRegionLeave?.();
                      }
                    }}
                    onClick={() => {
                      if (region) {
                        onRegionSelect?.(
                          region.id,
                        );
                      }
                    }}
                    onKeyDown={(
                      event,
                    ) => {
                      if (!region) {
                        return;
                      }

                      if (
                        event.key ===
                          "Enter" ||
                        event.key ===
                          " "
                      ) {
                        event.preventDefault();

                        onRegionSelect?.(
                          region.id,
                        );
                      }
                    }}
                    style={{
                      outline: "none",

                      cursor:
                        isMapped
                          ? "pointer"
                          : "default",

                      transition:
                        "fill 100ms ease, stroke 100ms ease, opacity 100ms ease",
                    }}
                  />
                );
              },
            )
          }
        </Geographies>
      </ComposableMap>

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-[18%]
          bottom-0
          h-16
          bg-cyan-300/[0.045]
          blur-3xl
        "
      />
    </div>
  );
}