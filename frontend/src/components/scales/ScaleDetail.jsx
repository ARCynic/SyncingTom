import {
  useEffect,
  useState,
} from "react";

import {
  useScaleAudio,
} from "@/hooks/useScaleAudio.js";

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
  noteNameToPitchClass,
  noteNamesToPitchClasses,
} from "@/lib/scales/pitchClasses.js";

import {
  displayNoteName,
} from "@/lib/scales/notes.js";

import {
  PitchClock,
} from "./PitchClock.jsx";

export function ScaleDetail({
  scale,
  root,
  allScales,
  onScaleSelect,
}) {
  const [
    selectedPitchState,
    setSelectedPitchState,
  ] = useState(null);

  const selectionKey =
    `${root}:${scale.id}`;

  const selectedPitch =
    selectedPitchState?.key ===
    selectionKey
      ? selectedPitchState.pitch
      : null;

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

  const {
    instrumentId,
    transportState,
    playbackPitchClass,
    error: audioError,
    playPitchClass,
    playScale,
    stop,
    setInstrumentId,
  } = useScaleAudio({
    notes,
  });

  useEffect(() => {
    stop();
  }, [
    root,
    scale.id,
    stop,
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

  function handlePitchSelect(
    pitch,
  ) {
    setSelectedPitchState({
      key: selectionKey,
      pitch,
    });

    void playPitchClass(
      pitch.pitchClass,
    );
  }

  return (
    <section
      className="
        rounded-[2rem]
        border
        border-white/10
        bg-black/25
        p-5
        shadow-[0_24px_80px_rgba(0,0,0,0.20)]
        backdrop-blur-sm
        sm:p-6
        lg:p-8
      "
    >
      <div
        className="
          grid
          gap-8
          md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]
          md:items-start
        "
      >
        {/* CLOCK */}
        <div
          className="
            min-w-0
            md:pr-2
          "
        >
          <PitchClock
            activePitchClasses={
              activePitchClasses
            }
            rootPitchClass={
              rootPitchClass
            }
            playbackPitchClass={
              playbackPitchClass
            }
            transportState={
              transportState
            }
            onPitchSelect={
              handlePitchSelect
            }
            onPlay={
              playScale
            }
            onStop={
              stop
            }
          />

          {selectedPitch ? (
            <div
              role="status"
              aria-live="polite"
              className="
                mt-3
                text-center
              "
            >
              <p
                className="
                  text-sm
                  text-white/55
                "
              >
                <strong
                  className="
                    font-semibold
                    text-cyan-200
                  "
                >
                  {selectedPitch.primary}

                  {selectedPitch.secondary
                    ? ` / ${selectedPitch.secondary}`
                    : ""}
                </strong>

                {" · "}

                {selectedPitch.isRoot
                  ? "Root"
                  : selectedPitch.isScaleTone
                    ? "Scale tone"
                    : "Outside scale"}
              </p>

              <p
                className="
                  mt-1
                  font-mono
                  text-[11px]
                  text-white/25
                "
              >
                MIDI {selectedMidi}
                {" · "}
                {formatFrequency(
                  selectedFrequency,
                )}
              </p>
            </div>
          ) : null}
        </div>

        {/* DETAILS */}
        <aside
          className="
            min-w-0
            md:border-l
            md:border-white/[0.07]
            md:pl-7
          "
        >
          {/* Controls */}
          <div
            className="
              grid
              gap-4
              sm:grid-cols-2
              md:grid-cols-1
              xl:grid-cols-2
            "
          >
            <label>
              <span className="detail-label">
                Mode
              </span>

              <select
                value={scale.id}
                onChange={(event) =>
                  onScaleSelect(
                    event.target.value,
                  )
                }
                className="
                  mt-2
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-black/35
                  px-4
                  text-sm
                  font-semibold
                  text-white/75
                  outline-none
                  transition-colors
                  hover:border-white/20
                  focus:border-cyan-300/35
                "
              >
                {allScales.map(
                  (candidate) => (
                    <option
                      key={
                        candidate.id
                      }
                      value={
                        candidate.id
                      }
                    >
                      {candidate.modeName ??
                        candidate.name}
                    </option>
                  ),
                )}
              </select>
            </label>

            <label>
              <span className="detail-label">
                Instrument
              </span>

              <select
                value={instrumentId}
                onChange={(event) =>
                  setInstrumentId(
                    event.target.value,
                  )
                }
                className="
                  mt-2
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-black/35
                  px-4
                  text-sm
                  font-semibold
                  text-white/75
                  outline-none
                  transition-colors
                  hover:border-white/20
                  focus:border-cyan-300/35
                "
              >
                <option
                  value={
                    instrumentId
                  }
                >
                  Soft Keys
                </option>
              </select>
            </label>
          </div>

          {audioError ? (
            <p
              role="alert"
              className="
                mt-3
                text-xs
                text-rose-300/80
              "
            >
              {audioError}
            </p>
          ) : null}

          {/* Tones */}
          <DetailSection
            label="Tones"
          >
            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >
              {notes.map(
                (
                  note,
                  index,
                ) => (
                  <span
                    key={`${note}-${index}`}
                    className="
                      flex
                      h-10
                      min-w-10
                      items-center
                      justify-center
                      rounded-lg
                      border
                      px-3
                      text-sm
                      font-semibold
                    "
                    style={{
                      borderColor:
                        index === 0
                          ? "#67e8f9"
                          : "rgba(255,255,255,0.08)",

                      background:
                        index === 0
                          ? "rgba(103,232,249,0.10)"
                          : "rgba(255,255,255,0.02)",

                      color:
                        index === 0
                          ? "white"
                          : "rgba(255,255,255,0.68)",
                    }}
                  >
                    {displayNoteName(
                      note,
                    )}
                  </span>
                ),
              )}
            </div>
          </DetailSection>

          <DetailSection
            label="Formula"
          >
            <TheoryValue>
              {scale.formula.join(
                " · ",
              )}
            </TheoryValue>
          </DetailSection>

          <DetailSection
            label="Characteristic"
          >
            <TheoryValue>
              {scale.characteristicDegrees
                ?.join(" · ") ??
                "—"}
            </TheoryValue>
          </DetailSection>

          <DetailSection
            label="Semitones"
          >
            <TheoryValue>
              {scale.intervals.join(
                " · ",
              )}
            </TheoryValue>
          </DetailSection>
        </aside>
      </div>
    </section>
  );
}

function DetailSection({
  label,
  children,
}) {
  return (
    <div
      className="
        mt-6
        border-t
        border-white/[0.07]
        pt-5
      "
    >
      <p className="detail-label">
        {label}
      </p>

      <div className="mt-3">
        {children}
      </div>
    </div>
  );
}

function TheoryValue({
  children,
}) {
  return (
    <p
      className="
        font-mono
        text-sm
        leading-6
        text-white/65
      "
    >
      {children}
    </p>
  );
}