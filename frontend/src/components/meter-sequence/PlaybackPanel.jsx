import {
  memo,
  useEffect,
} from "react";

import {
  useMeterAudio,
} from "@/hooks/useMeterAudio.js";

import {
  LiveMeterPanel,
} from "./LiveMeterPanel.jsx";

function isEditableTarget(
  target,
) {
  if (
    !(
      target instanceof
      HTMLElement
    )
  ) {
    return false;
  }

  return (
    target.isContentEditable ||
    target.tagName ===
      "INPUT" ||
    target.tagName ===
      "TEXTAREA" ||
    target.tagName ===
      "SELECT"
  );
}

function TransportButton({
  children,
  onClick,
  disabled = false,
  primary = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "min-h-12",
        "rounded-2xl",
        "px-5",
        "py-2.5",
        "text-sm",
        "font-bold",
        "transition",

        "disabled:cursor-not-allowed",
        "disabled:opacity-25",

        primary
          ? [
              "bg-gradient-to-r",
              "from-purple-300",
              "to-emerald-300",
              "text-black",
              "hover:brightness-110",
            ].join(" ")
          : [
              "border",
              "border-white/10",
              "bg-white/[0.03]",
              "text-white/70",
              "hover:bg-white/[0.07]",
              "hover:text-white",
            ].join(" "),
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/*
 * Memoized so beat updates do not
 * unnecessarily rerender all the
 * transport/volume controls.
 */
const PlaybackControls =
  memo(
    function PlaybackControls({
      transportState,
      bpm,

      masterVolume,
      accentLevel,

      error,

      play,
      pause,
      stop,
      restart,

      setMasterVolume,
      setAccentLevel,
    }) {
      return (
        <div
          className="
            rounded-[1.75rem]
            border
            border-white/10
            bg-white/[0.018]
            p-5
            sm:p-6
          "
        >
          <div
            className="
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
                text-emerald-300/55
              "
            >
              Playback
            </p>

            <div
              className="
                mt-1
                flex
                flex-wrap
                items-center
                justify-between
                gap-4
              "
            >
              <div>
                <h2
                  id="playback-heading"
                  className="
                    text-2xl
                    font-semibold
                    tracking-tight
                    text-white
                  "
                >
                  Click engine
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-white/40
                  "
                >
                  Audio timing stays
                  on the Web Audio
                  clock.
                </p>
              </div>

              <div
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-black/25
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-white/55
                "
              >
                {transportState}
              </div>
            </div>
          </div>

          {/* Transport */}

          <div
            className="
              mt-6
              grid
              grid-cols-2
              gap-3
              sm:flex
              sm:flex-wrap
            "
          >
            <TransportButton
              onClick={() =>
                void play()
              }
              disabled={
                transportState ===
                "playing"
              }
              primary
            >
              Play
            </TransportButton>

            <TransportButton
              onClick={pause}
              disabled={
                transportState !==
                "playing"
              }
            >
              Pause
            </TransportButton>

            <TransportButton
              onClick={stop}
              disabled={
                transportState ===
                "stopped"
              }
            >
              Stop
            </TransportButton>

            <TransportButton
              onClick={() =>
                void restart()
              }
            >
              Restart
            </TransportButton>
          </div>

          <div
            className="
              mt-4
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-2
              text-sm
              text-white/40
            "
          >
            <span>
              Tempo{" "}
              <strong
                className="
                  font-semibold
                  text-white/70
                "
              >
                {bpm} BPM
              </strong>
            </span>

            <span>
              Space = Play / Pause
            </span>
          </div>

          {/* Audio controls */}

          <div
            className="
              mt-7
              grid
              gap-5
            "
          >
            <label
              className="
                grid
                gap-2
                text-sm
                font-medium
                text-white/55
              "
            >
              <span
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <span>
                  Master volume
                </span>

                <output
                  className="
                    text-white/75
                  "
                >
                  {Math.round(
                    masterVolume *
                      100,
                  )}
                  %
                </output>
              </span>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={
                  masterVolume
                }
                onChange={(
                  event,
                ) =>
                  setMasterVolume(
                    Number(
                      event.target
                        .value,
                    ),
                  )
                }
                aria-label="Master volume"
                className="
                  w-full
                  accent-purple-300
                "
              />
            </label>

            <label
              className="
                grid
                gap-2
                text-sm
                font-medium
                text-white/55
              "
            >
              <span
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <span>
                  Bar accent
                </span>

                <output
                  className="
                    text-white/75
                  "
                >
                  {Math.round(
                    accentLevel *
                      100,
                  )}
                  %
                </output>
              </span>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={
                  accentLevel
                }
                onChange={(
                  event,
                ) =>
                  setAccentLevel(
                    Number(
                      event.target
                        .value,
                    ),
                  )
                }
                aria-label="Bar-start accent level"
                className="
                  w-full
                  accent-emerald-300
                "
              />
            </label>
          </div>

          {error ? (
            <p
              role="alert"
              className="
                mt-5
                rounded-2xl
                border
                border-red-300/20
                bg-red-400/10
                px-4
                py-3
                text-sm
                text-red-200
              "
            >
              {error}
            </p>
          ) : null}
        </div>
      );
    },
  );

export function PlaybackPanel({
  sequence,
  bpm,
  loopSettings,
}) {
  const {
    transportState,
    playbackBeat,

    masterVolume,
    accentLevel,

    error,

    play,
    pause,
    stop,
    restart,

    setMasterVolume,
    setAccentLevel,
  } = useMeterAudio({
    sequence,
    bpm,
    loopSettings,
  });

  useEffect(() => {
    function handleKeyDown(
      event,
    ) {
      if (
        event.code !==
          "Space" ||
        isEditableTarget(
          event.target,
        )
      ) {
        return;
      }

      event.preventDefault();

      if (
        transportState ===
        "playing"
      ) {
        pause();
      } else {
        void play();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    pause,
    play,
    transportState,
  ]);

  return (
    <section
      aria-labelledby="playback-heading"
      className="
        overflow-hidden
        rounded-[2rem]
        border
        border-purple-300/10
        bg-gradient-to-br
        from-purple-300/[0.045]
        via-white/[0.018]
        to-emerald-300/[0.03]
        p-4
        shadow-[0_24px_80px_rgba(0,0,0,0.25)]
        sm:p-5
      "
    >
      <div
        className="
          grid
          gap-4
          xl:grid-cols-[minmax(0,0.72fr)_minmax(430px,1.28fr)]
        "
      >
        {/* Controls */}

        <div
          className="
            order-2
            xl:order-1
          "
        >
          <PlaybackControls
            transportState={
              transportState
            }
            bpm={bpm}
            masterVolume={
              masterVolume
            }
            accentLevel={
              accentLevel
            }
            error={error}
            play={play}
            pause={pause}
            stop={stop}
            restart={restart}
            setMasterVolume={
              setMasterVolume
            }
            setAccentLevel={
              setAccentLevel
            }
          />
        </div>

        {/* Live visual panel */}

        <div
          className="
            order-1
            xl:order-2
          "
        >
          <LiveMeterPanel
            sequence={sequence}
            playbackBeat={
              playbackBeat
            }
            transportState={
              transportState
            }
            loopSettings={
              loopSettings
            }
          />
        </div>
      </div>
    </section>
  );
}