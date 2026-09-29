import {
  useEffect,
} from "react";

import {
  useSubdivisionAudio,
} from "@/hooks/useSubdivisionAudio.js";

import {
  LiveSubdivisionPanel,
} from "./LiveSubdivisionPanel.jsx";

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
            ].join(" ")
          : [
              "border",
              "border-white/10",
              "bg-white/[0.03]",
              "text-white/65",
              "hover:bg-white/[0.07]",
            ].join(" "),
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function PlaybackPanel({
  meter,
  bpm,
  steps,
  loopSettings,
}) {
  const {
    transportState,
    playbackEvent,

    masterVolume,
    accentLevel,

    error,

    play,
    pause,
    stop,
    restart,

    setMasterVolume,
    setAccentLevel,
  } = useSubdivisionAudio({
    meter,
    bpm,
    steps,
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

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
  }, [
    pause,
    play,
    transportState,
  ]);

  return (
    <section
      className="
        rounded-[2rem]
        border
        border-purple-300/10
        bg-gradient-to-br
        from-purple-300/[0.04]
        via-black/20
        to-emerald-300/[0.025]
        p-4
        sm:p-5
      "
    >
      <div
        className="
          grid
          gap-4
          xl:grid-cols-[minmax(0,0.7fr)_minmax(430px,1.3fr)]
        "
      >
        <div
          className="
            order-2
            rounded-[1.75rem]
            border
            border-white/10
            bg-black/25
            p-5
            xl:order-1
          "
        >
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-emerald-300/50
            "
          >
            Playback
          </p>

          <div
            className="
              mt-2
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <h2
              className="
                text-2xl
                font-semibold
                text-white
              "
            >
              Subdivision engine
            </h2>

            <span
              className="
                rounded-full
                border
                border-white/10
                px-3
                py-1
                text-xs
                uppercase
                tracking-[0.12em]
                text-white/40
              "
            >
              {transportState}
            </span>
          </div>

          <div
            className="
              mt-6
              grid
              grid-cols-2
              gap-3
            "
          >
            <TransportButton
              primary
              disabled={
                transportState ===
                "playing"
              }
              onClick={() =>
                void play()
              }
            >
              Play
            </TransportButton>

            <TransportButton
              disabled={
                transportState !==
                "playing"
              }
              onClick={pause}
            >
              Pause
            </TransportButton>

            <TransportButton
              disabled={
                transportState ===
                "stopped"
              }
              onClick={stop}
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

          <p
            className="
              mt-3
              text-xs
              text-white/25
            "
          >
            Space = Play / Pause
          </p>

          <div
            className="
              mt-7
              space-y-5
            "
          >
            <label>
              <div
                className="
                  mb-2
                  flex
                  justify-between
                  text-sm
                  text-white/45
                "
              >
                <span>
                  Master volume
                </span>

                <span>
                  {Math.round(
                    masterVolume *
                      100,
                  )}
                  %
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={
                  masterVolume
                }
                onChange={(event) =>
                  setMasterVolume(
                    Number(
                      event.target
                        .value,
                    ),
                  )
                }
                className="
                  w-full
                  accent-purple-300
                "
              />
            </label>

            <label>
              <div
                className="
                  mb-2
                  flex
                  justify-between
                  text-sm
                  text-white/45
                "
              >
                <span>
                  Pulse accent
                </span>

                <span>
                  {Math.round(
                    accentLevel *
                      100,
                  )}
                  %
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={
                  accentLevel
                }
                onChange={(event) =>
                  setAccentLevel(
                    Number(
                      event.target
                        .value,
                    ),
                  )
                }
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
                rounded-xl
                border
                border-red-300/20
                bg-red-400/10
                p-3
                text-sm
                text-red-200
              "
            >
              {error}
            </p>
          ) : null}
        </div>

        <div
          className="
            order-1
            xl:order-2
          "
        >
          <LiveSubdivisionPanel
            meter={meter}
            bpm={bpm}
            steps={steps}
            loopSettings={
              loopSettings
            }
            playbackEvent={
              playbackEvent
            }
            transportState={
              transportState
            }
          />
        </div>
      </div>
    </section>
  );
}