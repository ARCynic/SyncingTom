"use client";

import { useEffect } from "react";
import type { ChangeEvent } from "react";
import { useMeterAudio } from "@/hooks/useMeterAudio";
import type { LoopSettings, MeterSequenceItem } from "@/types/music";

export type PlaybackPanelProps = {
  sequence: MeterSequenceItem[];
  bpm: number;
  loopSettings: LoopSettings;
};

function isEditableTarget(target: EventTarget | null): boolean {
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

export function PlaybackPanel({
  sequence,
  bpm,
  loopSettings,
}: PlaybackPanelProps) {
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
  } = useMeterAudio({ sequence, bpm, loopSettings });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space" || isEditableTarget(event.target)) {
        return;
      }

      event.preventDefault();

      if (transportState === "playing") {
        pause();
      } else {
        void play();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pause, play, transportState]);

  return (
    <section
      aria-labelledby="playback-heading"
      className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-6"
    >
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
          Checkpoint 2
        </p>
        <h2 id="playback-heading" className="text-xl font-semibold tracking-tight">
          Playback
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Web Audio schedules the clicks; the browser UI only controls transport.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void play()}
          disabled={transportState === "playing"}
          className="min-h-11 rounded-xl bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-950"
        >
          Play
        </button>
        <button
          type="button"
          onClick={pause}
          disabled={transportState !== "playing"}
          className="min-h-11 rounded-xl border border-neutral-300 px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-700"
        >
          Pause
        </button>
        <button
          type="button"
          onClick={stop}
          disabled={transportState === "stopped"}
          className="min-h-11 rounded-xl border border-neutral-300 px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-700"
        >
          Stop
        </button>
        <button
          type="button"
          onClick={() => void restart()}
          className="min-h-11 rounded-xl border border-neutral-300 px-5 py-2.5 text-sm font-semibold transition dark:border-neutral-700"
        >
          Restart
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400">
        <span>
          Status: <strong className="text-neutral-950 dark:text-white">{transportState}</strong>
        </span>
        <span>Space: Play / Pause</span>
        <span>{bpm} BPM</span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          <span className="flex items-center justify-between gap-3">
            <span>Master volume</span>
            <output>{Math.round(masterVolume * 100)}%</output>
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={masterVolume}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setMasterVolume(Number(event.target.value))
            }
            aria-label="Master volume"
            className="w-full accent-neutral-950 dark:accent-white"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium">
          <span className="flex items-center justify-between gap-3">
            <span>Accent level</span>
            <output>{Math.round(accentLevel * 100)}%</output>
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={accentLevel}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setAccentLevel(Number(event.target.value))
            }
            aria-label="Bar-start accent level"
            className="w-full accent-neutral-950 dark:accent-white"
          />
        </label>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
        >
          {error}
        </p>
      ) : null}
    </section>
  );
}
