import {
  useMemo,
  useState,
} from "react";

import {
  SCALE_FAMILIES,
  SCALES,
  getScaleById,
  getScaleFamilyById,
  getScalesByFamily,
} from "@/data/scales/index.js";

import {
  buildScaleNotes,
} from "@/lib/scales/buildScale.js";

import {
  displayNoteName,
  parseNoteName,
} from "@/lib/scales/notes.js";

import {
  describeModeRelationship,
} from "@/lib/scales/relationships.js";

import {
  PianoKeyboard,
} from "@/components/scales/PianoKeyboard.jsx";

import {
  ScaleDetail,
} from "@/components/scales/ScaleDetail.jsx";

import {
  ScaleFamilySelector,
} from "@/components/scales/ScaleFamilySelector.jsx";

const DEFAULT_FAMILY =
  SCALE_FAMILIES[0]?.id ??
  "diatonic";

const DEFAULT_SCALE =
  SCALE_FAMILIES[0]
    ?.scales[0]?.id ??
  "major";

const DEFAULT_ROOT = "C";

export default function ScaleArchivePage() {
  const [
    selectedFamilyId,
    setSelectedFamilyId,
  ] = useState(DEFAULT_FAMILY);

  const [
    selectedScaleId,
    setSelectedScaleId,
  ] = useState(DEFAULT_SCALE);

  const [
    root,
    setRoot,
  ] = useState(DEFAULT_ROOT);

  const selectedFamily =
    getScaleFamilyById(
      selectedFamilyId,
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
      () => [
        ...new Set(
          keyboardNotes.map(
            (note) =>
              parseNoteName(
                note,
              ).pitchClass,
          ),
        ),
      ],
      [keyboardNotes],
    );

  const rootPitchClass =
    useMemo(
      () =>
        parseNoteName(
          root,
        ).pitchClass,
      [root],
    );

  const relationship =
    describeModeRelationship(
      selectedScale,
      familyScales,
      root,
    );

  function handleFamilyChange(
    familyId,
  ) {
    const family =
      getScaleFamilyById(
        familyId,
      );

    if (!family) {
      return;
    }

    setSelectedFamilyId(
      familyId,
    );

    if (
      !family.scales.some(
        (scale) =>
          scale.id ===
          selectedScaleId,
      )
    ) {
      setSelectedScaleId(
        family.scales[0]
          ?.id ?? "",
      );
    }
  }

  return (
    <main
      className="
        scale-theme
        mx-auto
        w-full
        max-w-screen-xl
        flex-1
        px-4
        pb-10
        pt-2
        sm:px-6
        lg:px-8
      "
    >
      <header
        className="
          mb-6
          flex
          items-start
          justify-between
          gap-8
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
                text-sm
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

        <ScaleFamilySelector
          families={
            SCALE_FAMILIES
          }
          value={
            selectedFamily.id
          }
          onChange={
            handleFamilyChange
          }
        />
      </header>

      {/* Root keyboard + current scale */}
      <section
        className="
          mb-6
          grid
          gap-5
          lg:grid-cols-[minmax(0,1fr)_18rem]
        "
      >
        <div
          className="
            rounded-[2rem]
            border
            border-white/10
            bg-black/25
            p-4
            shadow-[0_20px_60px_rgba(0,0,0,0.17)]
            backdrop-blur-sm
          "
        >
          <p
            className="
              mb-2
              px-2
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-white/30
            "
          >
            Select root
          </p>

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
        </div>

        <aside
          className="
            flex
            min-h-full
            flex-col
            rounded-[2rem]
            border
            border-white/10
            bg-black/25
            p-6
            shadow-[0_20px_60px_rgba(0,0,0,0.17)]
            backdrop-blur-sm
          "
        >
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-cyan-300/65
            "
          >
            Selected scale
          </p>

          <h2
            className="
              mt-4
              text-3xl
              font-semibold
              tracking-[-0.04em]
              text-white
            "
          >
            {displayNoteName(root)}{" "}

            <span className="scale-gradient-text">
              {selectedScale.name}
            </span>
          </h2>

          <p
            className="
              mt-2
              text-xs
              capitalize
              text-white/35
            "
          >
            {selectedScale.modeName}
            {" · "}
            Mode{" "}
            {selectedScale.modeDegree}
            {" · "}
            {selectedScale.quality}
          </p>

          <p
            className="
              mt-5
              text-sm
              leading-6
              text-white/50
            "
          >
            {selectedScale.description}
          </p>

          {relationship ? (
            <div
              className="
                mt-auto
                border-t
                border-white/[0.07]
                pt-5
              "
            >
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white/25
                "
              >
                Relationship
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-white/55
                "
              >
                {relationship}
              </p>
            </div>
          ) : null}
        </aside>
      </section>

      <ScaleDetail
        scale={
          selectedScale
        }
        root={root}
        allScales={
          familyScales
        }
        onScaleSelect={
          setSelectedScaleId
        }
      />
    </main>
  );
}