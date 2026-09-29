import {
  useMemo,
  useState,
} from "react";

import {
  countLadderBars,
  countLadderClicks,
  createDefaultLadder,
  createDefaultMeter,
  formatLadder,
  ladderCycleDurationSeconds,
} from "@/lib/subdivision/ladder.js";

import {
  BPMControl,
} from "./BPMControl.jsx";

import {
  FixedMeterControl,
} from "./FixedMeterControl.jsx";

import {
  LadderEditor,
} from "./LadderEditor.jsx";

import {
  LoopControls,
} from "./LoopControls.jsx";

import {
  PlaybackPanel,
} from "./PlaybackPanel.jsx";

const DEFAULT_BPM = 100;

const DEFAULT_LOOP_SETTINGS = {
  mode: "infinite",
  cycles: 4,
};

function formatDuration(
  seconds,
) {
  if (seconds < 60) {
    return `${seconds.toFixed(
      seconds < 10 ? 1 : 0,
    )} s`;
  }

  const minutes =
    Math.floor(
      seconds / 60,
    );

  const remainder =
    Math.round(
      seconds % 60,
    );

  return `${minutes}m ${remainder}s`;
}

export function SubdivisionLadderTool() {
  const [
    meter,
    setMeter,
  ] = useState(
    createDefaultMeter,
  );

  const [
    bpm,
    setBpm,
  ] = useState(DEFAULT_BPM);

  const [
    steps,
    setSteps,
  ] = useState(
    createDefaultLadder,
  );

  const [
    loopSettings,
    setLoopSettings,
  ] = useState(
    DEFAULT_LOOP_SETTINGS,
  );

  const summary =
    useMemo(() => {
      return {
        bars:
          countLadderBars(
            steps,
          ),

        clicks:
          countLadderClicks(
            meter,
            steps,
          ),

        duration:
          ladderCycleDurationSeconds(
            meter,
            steps,
            bpm,
          ),

        display:
          formatLadder(
            steps,
          ),
      };
    }, [
      bpm,
      meter,
      steps,
    ]);

  return (
    <div className="space-y-6">
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
        "
      >
        <div
          className="
            flex
            flex-col
            gap-2
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-purple-300/50
              "
            >
              Ladder editor
            </p>

            <h1
              className="
                mt-2
                text-2xl
                font-semibold
                tracking-tight
                text-white
              "
            >
              Build the subdivision
              ladder
            </h1>

            <p
              className="
                mt-2
                max-w-2xl
                text-sm
                leading-6
                text-white/35
              "
            >
              Keep the meter and
              pulse fixed while the
              number of notes inside
              each beat changes.
            </p>
          </div>

          <p
            className="
              text-sm
              text-white/30
            "
          >
            {steps.length} steps
            {" · "}
            {summary.bars} bars
          </p>
        </div>

        <div className="mt-6">
          <LadderEditor
            steps={steps}
            denominator={
              meter.denominator
            }
            onChange={
              setSteps
            }
          />
        </div>
      </section>

      <div
        className="
          grid
          gap-4
          lg:grid-cols-3
        "
      >
        <FixedMeterControl
          meter={meter}
          onChange={setMeter}
        />

        <BPMControl
          bpm={bpm}
          onChange={setBpm}
        />

        <LoopControls
          value={
            loopSettings
          }
          onChange={
            setLoopSettings
          }
        />
      </div>

      <section
        className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.02]
          p-5
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
          One ladder cycle
        </p>

        <h2
          className="
            mt-3
            break-words
            text-xl
            font-semibold
            tracking-tight
            text-white/85
            sm:text-2xl
          "
        >
          {summary.display}
        </h2>

        <div
          className="
            mt-4
            flex
            flex-wrap
            gap-x-6
            gap-y-2
            text-sm
            text-white/35
          "
        >
          <span>
            {meter.numerator}/
            {meter.denominator}
          </span>

          <span>
            {summary.bars} bars
          </span>

          <span>
            {summary.clicks} clicks
          </span>

          <span>
            {formatDuration(
              summary.duration,
            )}
          </span>

          <span>
            {loopSettings.mode ===
            "infinite"
              ? "Repeats indefinitely"
              : `${loopSettings.cycles} cycles total`}
          </span>
        </div>
      </section>

      <PlaybackPanel
        meter={meter}
        bpm={bpm}
        steps={steps}
        loopSettings={
          loopSettings
        }
      />
    </div>
  );
}