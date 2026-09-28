"use client";

import { useMemo, useState } from "react";

import { BPMControl } from "@/components/meter-sequence/BPMControl";
import { LoopControls } from "@/components/meter-sequence/LoopControls";
import { MeterSequenceEditor } from "@/components/meter-sequence/MeterSequenceEditor";
import { QuickSequenceInput } from "@/components/meter-sequence/QuickSequenceInput";
import { PlaybackPanel } from "@/components/meter-sequence/PlaybackPanel";
import {
  countBars,
  createDefaultSequence,
  cycleDurationSeconds,
  formatMeterSequenceDisplay,
  quarterNoteEquivalentBeats,
} from "@/lib/meter/sequence";
import type { LoopSettings, MeterSequenceItem } from "@/types/music";

const DEFAULT_BPM = 100;
const DEFAULT_LOOP_SETTINGS: LoopSettings = {
  mode: "infinite",
  cycles: 4,
};

function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds.toFixed(seconds < 10 ? 1 : 0)} s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = Math.round(seconds % 60);
  return `${minutes}m ${remainder}s`;
}

export function MeterSequenceTool() {
  const [sequence, setSequence] = useState<MeterSequenceItem[]>(createDefaultSequence);
  const [bpm, setBpm] = useState(DEFAULT_BPM);
  const [loopSettings, setLoopSettings] = useState<LoopSettings>(DEFAULT_LOOP_SETTINGS);

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
  }, [bpm, sequence]);

  return (
    <div className="space-y-8">
      <section aria-labelledby="sequence-editor-heading" className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">Sequence editor</p>
            <h2 id="sequence-editor-heading" className="mt-1 text-2xl font-semibold tracking-tight">
              Your sequence
            </h2>
          </div>

          <p className="text-sm text-neutral-500">
            {sequence.length} {sequence.length === 1 ? "meter" : "meters"} · {summary.bars} {summary.bars === 1 ? "bar" : "bars"}
          </p>
        </div>

        <QuickSequenceInput sequence={sequence} onApply={setSequence} />
        <MeterSequenceEditor sequence={sequence} onChange={setSequence} />
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <BPMControl bpm={bpm} onChange={setBpm} />
        <LoopControls value={loopSettings} onChange={setLoopSettings} />
      </div>

      <section aria-labelledby="cycle-summary-heading" className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900/40">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">One cycle</p>
        <h2 id="cycle-summary-heading" className="mt-2 break-words text-xl font-semibold tracking-tight">
          {summary.display}
        </h2>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <span>{summary.bars} {summary.bars === 1 ? "bar" : "bars"}</span>
          <span>{Number(summary.quarterNotes.toFixed(3))} quarter-note equivalents</span>
          <span>{formatDuration(summary.duration)}</span>
          <span>{loopSettings.mode === "infinite" ? "Repeats indefinitely" : `${loopSettings.cycles} cycles total`}</span>
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
