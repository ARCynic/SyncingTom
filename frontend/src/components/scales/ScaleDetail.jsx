import {
  PitchClock,
} from "./PitchClock.jsx";

import {
  useEffect,
  useState,
} from "react";

import {
  DEFAULT_AUDITION_OCTAVE,
  formatFrequency,
  midiToFrequency,
  pitchClassToMidi,
} from "@/lib/music/pitch.js";

import {
  buildScaleNotes,
} from "@/lib/scales/buildScale.js";

import {
  noteNamesToPitchClasses,
  noteNameToPitchClass,
} from "@/lib/scales/pitchClasses.js";

import {
  describeModeRelationship,
  getSiblingModes,
} from "@/lib/scales/relationships.js";

import {
  displayNoteName,
} from "@/lib/scales/notes.js";

export function ScaleDetail({
  scale,
  root,
  allScales,
  onScaleSelect,
}) {
    const [ selectedPitch, setSelectedPitch,] = useState(null);
  const notes =
    buildScaleNotes(
      root,
      scale,
    );
  

  const activePitchClasses =
    noteNamesToPitchClasses(
      notes,
  );

  const rootPitchClass =
    noteNameToPitchClass(
      root,
  );
  useEffect(() => {
  setSelectedPitch(null);
}, [
  root,
  scale.id,
]);
    const selectedMidi =
  selectedPitch
    ? pitchClassToMidi(
        selectedPitch.pitchClass,
        DEFAULT_AUDITION_OCTAVE,
      )
    : null;

const selectedFrequency =
  selectedMidi !== null
    ? midiToFrequency(
        selectedMidi,
      )
    : null;

  const relationship =
    describeModeRelationship(
      scale,
      allScales,
    );

  const siblings =
    getSiblingModes(
      scale,
      allScales,
    );

  return (
    <section
      className="
        rounded-[2rem]
        border
        border-white/10
        bg-black/25
        p-5
        shadow-[0_24px_80px_rgba(0,0,0,0.22)]
        backdrop-blur-sm
        sm:p-6
        lg:p-8
      "
    >
      <div>
        <p
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.2em]
          "
          style={{
            color:
              "var(--scale-accent)",
          }}
        >
          {scale.family}
        </p>

        <h2
          className="
            mt-3
            text-3xl
            font-semibold
            tracking-[-0.04em]
            text-white
            sm:text-4xl
          "
        >
          {displayNoteName(
            root,
          )}{" "}
          <span className="scale-gradient-text">
            {scale.name}
          </span>
        </h2>

        {scale.modeName !==
        scale.name ? (
          <p
            className="
              mt-2
              text-sm
              text-white/35
            "
          >
            Also known as{" "}
            {scale.modeName}
          </p>
        ) : null}

        <p
          className="
            mt-5
            max-w-2xl
            text-sm
            leading-7
            text-white/50
          "
        >
          {scale.description}
        </p>
      </div>
      <div className="mt-10">
  <div
    className="
      mb-5
      flex
      flex-col
      gap-1
    "
  >
    <p
      className="
        text-xs
        font-bold
        uppercase
        tracking-[0.18em]
        text-white/30
      "
    >
      Pitch clock
    </p>

    <p
      className="
        text-sm
        text-white/35
      "
    >
      Twelve chromatic pitch
      classes arranged like a
      clock face.
    </p>
  </div>

  <div
    className="
      rounded-[2rem]
      border
      border-white/[0.07]
      bg-white/[0.012]
      px-3
      py-6
      sm:px-6
      sm:py-8
    "
  >
    <PitchClock
  activePitchClasses={
    activePitchClasses
  }
  rootPitchClass={
    rootPitchClass
  }
  onPitchSelect={
    setSelectedPitch
  }
/>
        <div
  className="
    mx-auto
    mt-5
    min-h-16
    max-w-md
    text-center
  "
>
  {selectedPitch ? (
    <div
      role="status"
      aria-live="polite"
    >
      <p
        className="
          text-sm
          text-white/55
        "
      >
        Selected{" "}

        <strong
          className="
            font-semibold
            text-cyan-200
          "
        >
          {
            selectedPitch.primary
          }

          {selectedPitch.secondary
            ? ` / ${selectedPitch.secondary}`
            : ""}
        </strong>

        {" · "}

        {selectedPitch.isRoot
          ? "Root"
          : selectedPitch.isScaleTone
            ? "Scale tone"
            : "Outside the scale"}
      </p>

      <p
        className="
          mt-2
          font-mono
          text-xs
          tracking-wide
          text-white/30
        "
      >
        Octave{" "}
        {
          DEFAULT_AUDITION_OCTAVE
        }

        {" · "}

        MIDI{" "}
        {
          selectedMidi
        }

        {" · "}

        {
          formatFrequency(
            selectedFrequency,
          )
        }
      </p>
    </div>
  ) : (
    <p
      className="
        text-xs
        text-white/25
      "
    >
      Select a pitch on the clock.
    </p>
  )}
</div>
  </div>
</div>

      <div className="mt-8">
        <p
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.18em]
            text-white/30
          "
        >
          Notes
        </p>

        <div
          className="
            mt-3
            flex
            flex-wrap
            gap-2
          "
        >
          {notes.map(
            (note, index) => (
              <div
                key={`${note}-${index}`}
                className="
                  flex
                  h-12
                  min-w-12
                  items-center
                  justify-center
                  rounded-xl
                  border
                  px-3
                  text-base
                  font-semibold
                "
                style={{
                  borderColor:
                    index === 0
                      ? "var(--scale-accent)"
                      : "rgba(255,255,255,0.08)",

                  background:
                    index === 0
                      ? "color-mix(in srgb, var(--scale-accent) 13%, transparent)"
                      : "rgba(255,255,255,0.025)",

                  color:
                    index === 0
                      ? "white"
                      : "rgba(255,255,255,0.72)",
                }}
              >
                {note}
              </div>
            ),
          )}
        </div>
      </div>

      <div
        className="
          mt-8
          grid
          gap-4
          sm:grid-cols-2
        "
      >
        <InfoBlock
          label="Formula"
          value={scale.formula.join(
            "  ",
          )}
        />

        <InfoBlock
          label="Semitones"
          value={scale.intervals.join(
            " · ",
          )}
        />
      </div>

      {relationship ? (
        <div
          className="
            mt-8
            rounded-2xl
            border
            p-4
          "
          style={{
            borderColor:
              "color-mix(in srgb, var(--scale-accent) 20%, transparent)",

            background:
              "color-mix(in srgb, var(--scale-accent) 6%, transparent)",
          }}
        >
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
            "
            style={{
              color:
                "var(--scale-accent)",
            }}
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

      <div className="mt-8">
        <p
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.18em]
            text-white/30
          "
        >
          Other modes in this family
        </p>

        <div
          className="
            mt-3
            flex
            flex-wrap
            gap-2
          "
        >
          {siblings.map(
            (sibling) => (
              <button
                key={sibling.id}
                type="button"
                onClick={() =>
                  onScaleSelect(
                    sibling.id,
                  )
                }
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.025]
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-white/50
                  transition
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                {sibling.name}
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.018]
        p-4
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
        {label}
      </p>

      <p
        className="
          mt-2
          font-mono
          text-sm
          leading-6
          text-white/70
        "
      >
        {value}
      </p>
    </div>
  );
}