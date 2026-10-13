import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

import worldMap from "world-atlas/countries-110m.json";

import {
  getRegionByCountryId,
} from "@/data/genreAtlas/index.js";

function normalizeCountryId(
  id,
) {
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
        rounded-[1.6rem]
        border
        border-white/[0.07]
        bg-black/20
      "
    >
      <ComposableMap
        projection="geoEqualEarth"
        width={900}
        height={500}
        projectionConfig={{
          scale: 155,
          center: [0, 10],
        }}
        className="
          h-auto
          w-full
        "
      >
        <Geographies
          geography={
            worldMap
          }
        >
          {({
            geographies,
          }) =>
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

                const active =
                  Boolean(
                    region &&
                      region.id ===
                        activeRegionId,
                  );

                const dimmed =
                  Boolean(
                    activeRegionId &&
                      !active,
                  );

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    tabIndex={
                      region
                        ? 0
                        : -1
                    }
                    role={
                      region
                        ? "button"
                        : undefined
                    }
                    aria-label={
                      region
                        ? `${geo.properties?.name ?? "Country"} — ${region.name}`
                        : geo.properties
                            ?.name
                    }
                    onMouseEnter={() =>
                      region &&
                      onRegionEnter?.(
                        region.id,
                      )
                    }
                    onMouseLeave={() =>
                      onRegionLeave?.()
                    }
                    onFocus={() =>
                      region &&
                      onRegionEnter?.(
                        region.id,
                      )
                    }
                    onBlur={() =>
                      onRegionLeave?.()
                    }
                    onClick={() =>
                      region &&
                      onRegionSelect?.(
                        region.id,
                      )
                    }
                    onKeyDown={(
                      event,
                    ) => {
                      if (
                        !region
                      ) {
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
                      default: {
                        fill: active
                          ? "#163239"
                          : dimmed
                            ? "#0a0d0f"
                            : region
                              ? "#11191c"
                              : "#0b0e10",

                        stroke: active
                          ? "#67e8f9"
                          : region
                            ? "rgba(255,255,255,0.13)"
                            : "rgba(255,255,255,0.055)",

                        strokeWidth:
                          active
                            ? 1.4
                            : 0.6,

                        outline:
                          "none",

                        transition:
                          "fill 120ms ease, stroke 120ms ease, opacity 120ms ease",

                        opacity:
                          dimmed
                            ? 0.48
                            : 1,
                      },

                      hover: {
                        fill: region
                          ? "#163239"
                          : "#0b0e10",

                        stroke: region
                          ? "#67e8f9"
                          : "rgba(255,255,255,0.055)",

                        strokeWidth:
                          region
                            ? 1.4
                            : 0.6,

                        outline:
                          "none",

                        cursor:
                          region
                            ? "pointer"
                            : "default",
                      },

                      pressed: {
                        fill: region
                          ? "#1b4149"
                          : "#0b0e10",

                        stroke:
                          "#67e8f9",

                        outline:
                          "none",
                      },
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
          inset-x-[12%]
          bottom-0
          h-20
          bg-cyan-300/[0.03]
          blur-3xl
        "
      />
    </div>
  );
}