import { useEffect } from "react";

import { useMeterAudio } from "@/hooks/useMeterAudio.js";

function isEditableTarget(target) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
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
        "min-h-12 rounded-2xl px-5 py-2.5 text-sm font-bold transition",
        "disabled:cursor-not-allowed disabled:opacity-25",
        primary
          ? "bg-gradient-to-r from-cyan-300 to-emerald-300 text-black hover:brightness-110"
          : "border border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.07] hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function PlaybackPanel({
  sequence,
  bpm,
  loopSettings,
}) {
  const {
    transportState,
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
    function handleKeyDown(event) {
      if (
        event.code !== "Space" ||
        isEditableTarget(event.target)
      ) {
        return;
      }

      event.preventDefault();

      if (transportState === "playing") {
        pause();
      } else {
        void play();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    pause,
    play,
    transportState,
  ]);

  return (
    <section
      aria-labelledby="playback-heading"
      className="overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-gradient-to-br from-cyan-300/[0.045] via-white/[0.025] to-emerald-300/[0.035] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.25)] sm:p-6"
    >
      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300/55">
          Playback
        </p>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2
              id="playback-heading"
              className="text-2xl font-semibold tracking-tight text-white"
            >
              Click engine
            </h2>
            <p className="mt-1 text-sm text-white/40">
              Web Audio schedules the beats ahead of the UI thread.
            </p>
          </div>

          <div className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white/55">
            {transportState}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <TransportButton
          onClick={() => void play()}
          disabled={transportState === "playing"}
          primary
        >
          Play
        </TransportButton>

        <TransportButton
          onClick={pause}
          disabled={transportState !== "playing"}
        >
          Pause
        </TransportButton>

        <TransportButton
          onClick={stop}
          disabled={transportState === "stopped"}
        >
          Stop
        </TransportButton>

        <TransportButton onClick={() => void restart()}>
          Restart
        </TransportButton>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/40">
        <span>
          Tempo{" "}
          <strong className="font-semibold text-white/70">
            {bpm} BPM
          </strong>
        </span>
        <span>Space = Play / Pause</span>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-white/55">
          <span className="flex items-center justify-between gap-3">
            <span>Master volume</span>
            <output className="text-white/75">
              {Math.round(masterVolume * 100)}%
            </output>
          </span>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={masterVolume}
            onChange={(event) =>
              setMasterVolume(Number(event.target.value))
            }
            aria-label="Master volume"
            className="w-full accent-cyan-300"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-white/55">
          <span className="flex items-center justify-between gap-3">
            <span>Bar accent</span>
            <output className="text-white/75">
              {Math.round(accentLevel * 100)}%
            </output>
          </span>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={accentLevel}
            onChange={(event) =>
              setAccentLevel(Number(event.target.value))
            }
            aria-label="Bar-start accent level"
            className="w-full accent-emerald-300"
          />
        </label>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-5 rounded-2xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
        >
          {error}
        </p>
      ) : null}
    </section>
  );
}
