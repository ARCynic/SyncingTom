import {
  useMemo,
  useState,
} from "react";

import {
  SCALE_FAMILIES,
  SCALES,
  getScaleById,
  getScalesByFamily,
} from "@/data/scales/index.js";

import {
  buildScaleNotes,
} from "@/lib/scales/buildScale.js";

import {
  parseNoteName,
} from "@/lib/scales/notes.js";

import {
  PianoKeyboard,
} from "@/components/scales/PianoKeyboard.jsx";

import {
  ScaleCard,
} from "@/components/scales/ScaleCard.jsx";

import {
  ScaleDetail,
} from "@/components/scales/ScaleDetail.jsx";

const DEFAULT_FAMILY =
  SCALE_FAMILIES[0]?.id ??
  "diatonic";

const DEFAULT_SCALE =
  SCALE_FAMILIES[0]
    ?.scales[0]?.id ??
  "major";

const DEFAULT_ROOT =
  "C";

export default function ScaleArchivePage() {
  const [
    selectedScaleId,
    setSelectedScaleId,
  ] = useState(
    DEFAULT_SCALE,
  );

  const [
    root,
    setRoot,
  ] = useState(
    DEFAULT_ROOT,
  );

  const [
    query,
  ] = useState("");

  const selectedFamily =
    SCALE_FAMILIES.find(
      (family) =>
        family.id ===
        DEFAULT_FAMILY,
    ) ??
    SCALE_FAMILIES[0];

  const familyScales =
    getScalesByFamily(
      selectedFamily.id,
    );

  const selectedScale =
    familyScales.find(
      (scale) =>
        scale.id ===
        selectedScaleId,
    ) ??
    familyScales[0] ??
    getScaleById(
      selectedScaleId,
    ) ??
    SCALES[0];

  const filteredScales =
    useMemo(() => {
      const normalized =
        query
          .trim()
          .toLowerCase();

      if (!normalized) {
        return familyScales;
      }

      return familyScales.filter(
        (scale) => {
          const haystack = [
            scale.name,
            scale.modeName,
            scale.family,
            ...(scale.aliases ??
              []),
            ...(scale.formula ??
              []),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return haystack.includes(
            normalized,
          );
        },
      );
    }, [
      familyScales,
      query,
    ]);

  const keyboardNotes =
    useMemo(
      () =>
        buildScaleNotes(
          root,
          selectedScale,
        ),
      [
        root,
        selectedScale,
      ],
    );

  const activePitchClasses =
    useMemo(
      () =>
        [
          ...new Set(
            keyboardNotes.map(
              (note) =>
                parseNoteName(
                  note,
                )
                  .pitchClass,
            ),
          ),
        ],
      [
        keyboardNotes,
      ],
    );

  const rootPitchClass =
    useMemo(
      () =>
        parseNoteName(
          root,
        ).pitchClass,
      [
        root,
      ],
    );

  return (
    <main
      className="
        scale-theme
        mx-auto
        w-full
        max-w-screen-xl
        flex-1
        px-4
        pb-8
        pt-2
        sm:px-6
        sm:pb-12
        sm:pt-3
        lg:px-8
      "
    >
      {/* Page header */}
      <header
        className="
          mb-5
          max-w-4xl
          sm:mb-6
        "
      >
        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          <img
            src="/assets/scale_archive.png"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="
              h-16
              w-16
              shrink-0
              object-contain
              opacity-90
              sm:h-20
              sm:w-20
            "
          />

          <div>
            <h1
              className="
                text-3xl
                font-semibold
                tracking-[-0.04em]
                text-white
                sm:text-4xl
              "
            >
              Scale{" "}

              <span className="scale-gradient-text">
                Archive
              </span>
            </h1>

            <p
              className="
                mt-2
                max-w-3xl
                text-sm
                leading-6
                text-white/50
                sm:text-[15px]
              "
            >
              Explore scale families,
              modes, interval formulas
              and their relationships.
            </p>
          </div>
        </div>
      </header>

      {/* Root piano */}
      <section
        className="
          mb-6
          rounded-[2rem]
          border
          border-white/10
          bg-black/25
          px-3
          py-4
          shadow-[0_24px_80px_rgba(0,0,0,0.16)]
          backdrop-blur-sm
          sm:px-5
          sm:py-5
        "
      >
        <PianoKeyboard
          activePitchClasses={
            activePitchClasses
          }
          rootPitchClass={
            rootPitchClass
          }
          onRootChange={
            setRoot
          }
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
              {
                selectedFamily.listLabel
              }
            </h2>
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
                  key={
                    scale.id
                  }
                  scale={
                    scale
                  }
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

          {filteredScales.length ===
          0 ? (
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
              No scales match that
              search.
            </div>
          ) : null}
        </section>

        <ScaleDetail
  scale={
    selectedScale
  }
  root={root}
  allScales={
    familyScales
  }
/>
      </div>
    </main>
  );
}