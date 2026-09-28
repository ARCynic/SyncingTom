import {
  useMemo,
  useState,
} from "react";

import { BPMControl } from "./BPMControl.jsx";
import { LoopControls } from "./LoopControls.jsx";
import { MeterSequenceEditor } from "./MeterSequenceEditor.jsx";
import { PlaybackPanel } from "./PlaybackPanel.jsx";
import { QuickSequenceInput } from "./QuickSequenceInput.jsx";

import {
  countBars,
  createDefaultSequence,
  cycleDurationSeconds,
  formatMeterSequenceDisplay,
  quarterNoteEquivalentBeats,
} from "@/lib/meter/sequence.js";

const DEFAULT_BPM = 100;

const DEFAULT_LOOP_SETTINGS = {
  mode: "infinite",
  cycles: 4,
};

function formatDuration(seconds) {
  if (seconds < 60) {
    return `${seconds.toFixed(seconds < 10 ? 1 : 0)} s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = Math.round(seconds % 60);

  return `${minutes}m ${remainder}s`;
}

export function MeterSequenceTool() {
  const [sequence, setSequence] = useState(createDefaultSequence);
  const [bpm, setBpm] = useState(DEFAULT_BPM);
  const [loopSettings, setLoopSettings] = useState(
    DEFAULT_LOOP_SETTINGS,
  );

  const summary = useMemo(() => {
    const bars = countBars(sequence);
    const quarterNotes = quarterNoteEquivalentBeats(sequence);
    const duration = cycleDurationSeconds(sequence, bpm);

    return {
      bars,
      quarterNotes,
      duration,
      display: formatMeterSequenceDisplay(sequence),
    };
  }, [
    bpm,
    sequence,
  ]);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-black/25 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300/50">
              Sequence editor
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Build the meter chain
            </h2>
          </div>

          <p className="text-sm text-white/35">
            {sequence.length}{" "}
            {sequence.length === 1 ? "meter" : "meters"}
            {" · "}
            {summary.bars}{" "}
            {summary.bars === 1 ? "bar" : "bars"}
          </p>
        </div>

        <div className="mt-6">
          <QuickSequenceInput
            sequence={sequence}
            onApply={setSequence}
          />
        </div>

        <div className="mt-6">
          <MeterSequenceEditor
            sequence={sequence}
            onChange={setSequence}
          />
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <BPMControl
          bpm={bpm}
          onChange={setBpm}
        />

        <LoopControls
          value={loopSettings}
          onChange={setLoopSettings}
        />
      </div>

      <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/30">
          One cycle
        </p>

        <h2 className="mt-3 break-words text-xl font-semibold tracking-tight text-white/85 sm:text-2xl">
          {summary.display}
        </h2>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/35">
          <span>
            {summary.bars}{" "}
            {summary.bars === 1 ? "bar" : "bars"}
          </span>

          <span>
            {Number(summary.quarterNotes.toFixed(3))} quarter-note equivalents
          </span>

          <span>{formatDuration(summary.duration)}</span>

          <span>
            {loopSettings.mode === "infinite"
              ? "Repeats indefinitely"
              : `${loopSettings.cycles} cycles total`}
          </span>
        </div>
      </section>

      <PlaybackPanel
        sequence={sequence}
        bpm={bpm}
        loopSettings={loopSettings}
      />
    </div>
  );
}
