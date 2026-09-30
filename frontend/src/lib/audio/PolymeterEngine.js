import {
  Scheduler,
} from "./Scheduler.js";

import {
  SampleVoice,
} from "./SampleVoice.js";

import {
  getLaneStepIndex,
  getPolymeterCycleLength,
} from "@/lib/polymeter/cycle.js";

import {
  getPolymeterInstrument,
  POLYMETER_INSTRUMENTS,
} from "@/lib/polymeter/instruments.js";

const START_DELAY_SECONDS =
  0.05;

const DEFAULT_BPM =
  100;

function cloneLanes(
  lanes,
) {
  return lanes.map(
    (lane) => ({
      ...lane,

      pattern: [
        ...lane.pattern,
      ],
    }),
  );
}

function assertBpm(
  bpm,
) {
  if (
    !Number.isFinite(bpm) ||
    bpm < 30 ||
    bpm > 300
  ) {
    throw new Error(
      "BPM must be between 30 and 300.",
    );
  }
}

export class PolymeterEngine {
  constructor(
    context,
    {
      onVisualStep =
        () => {},

      onStateChange =
        () => {},

      onError =
        () => {},
    } = {},
  ) {
    if (!context) {
      throw new Error(
        "PolymeterEngine requires an AudioContext.",
      );
    }

    this.context =
      context;

    this.onVisualStep =
      onVisualStep;

    this.onStateChange =
      onStateChange;

    this.onError =
      onError;

    this.voice =
      new SampleVoice(
        context,
      );

    this.scheduler =
      new Scheduler(
        context,
        (
          scheduleUntil,
        ) => {
          this.handleSchedulerTick(
            scheduleUntil,
          );
        },
      );

    this.config = {
      bpm:
        DEFAULT_BPM,

      lanes: [],
    };

    this.state =
      "stopped";

    this.nextGlobalStep =
      0;

    this.lastVisualGlobalStep =
      null;

    this.nextStepTime =
      null;

    this.visualTimers =
      new Set();

    this.disposed =
      false;
  }

  async loadSamples() {
    this.assertNotDisposed();

    await this.voice.loadSamples(
      POLYMETER_INSTRUMENTS,
    );
  }

  setConfig({
    bpm,
    lanes,
  }) {
    this.assertNotDisposed();

    assertBpm(
      bpm,
    );

    if (
      !Array.isArray(lanes) ||
      lanes.length === 0
    ) {
      throw new Error(
        "Polymeter requires at least one lane.",
      );
    }

    this.config = {
      bpm,

      lanes:
        cloneLanes(
          lanes,
        ),
    };
  }

  play() {
    this.assertNotDisposed();

    if (
      this.state ===
      "playing"
    ) {
      return;
    }

    this.clearVisualTimers();

    this.nextStepTime =
      this.context
        .currentTime +
      START_DELAY_SECONDS;

    this.setState(
      "playing",
    );

    this.scheduler.start();
  }

  pause() {
    if (
      this.disposed ||
      this.state !==
        "playing"
    ) {
      return;
    }

    this.scheduler.stop();

    this.voice.stopAll(
      this.context.currentTime,
    );

    this.clearVisualTimers();

    if (
      this.lastVisualGlobalStep ===
      null
    ) {
      this.nextGlobalStep =
        0;
    } else {
      this.nextGlobalStep =
        this.lastVisualGlobalStep +
        1;
    }

    this.nextStepTime =
      null;

    this.setState(
      "paused",
    );
  }

  stop() {
    if (this.disposed) {
      return;
    }

    this.scheduler.stop();

    this.voice.stopAll(
      this.context.currentTime,
    );

    this.clearVisualTimers();

    this.nextGlobalStep =
      0;

    this.lastVisualGlobalStep =
      null;

    this.nextStepTime =
      null;

    this.onVisualStep(
      null,
    );

    this.setState(
      "stopped",
    );
  }

  restart() {
    this.assertNotDisposed();

    this.stop();
    this.play();
  }

  handleSchedulerTick(
    scheduleUntil,
  ) {
    if (
      this.state !==
      "playing"
    ) {
      return;
    }

    try {
      const stepDuration =
        60 /
        this.config.bpm;

      while (
        this.nextStepTime !==
          null &&
        this.nextStepTime <=
          scheduleUntil
      ) {
        this.scheduleGlobalStep(
          this.nextGlobalStep,
          this.nextStepTime,
        );

        this.nextGlobalStep +=
          1;

        this.nextStepTime +=
          stepDuration;
      }
    } catch (error) {
      this.onError(
        error,
      );

      this.stop();
    }
  }

  scheduleGlobalStep(
    globalStep,
    when,
  ) {
    const lanes =
      this.config.lanes;

    const cycleLength =
      getPolymeterCycleLength(
        lanes,
      );

    const cycleStep =
      globalStep %
      cycleLength;

    const laneStates =
      lanes.map(
        (lane) => {
          const stepIndex =
            getLaneStepIndex(
              globalStep,
              lane,
            );

          const isHit =
            Boolean(
              lane.pattern[
                stepIndex
              ],
            );

          if (
            isHit &&
            !lane.muted
          ) {
            const instrument =
              getPolymeterInstrument(
                lane.instrumentId,
              );

            this.voice.scheduleSample(
              instrument.id,
              {
                when,

                gain:
                  instrument.defaultGain,
              },
            );
          }

          return {
            laneId:
              lane.id,

            stepIndex,

            isHit,

            muted:
              lane.muted,
          };
        },
      );

    this.scheduleVisualStep(
      {
        globalStep,
        cycleStep,
        cycleLength,

        realigned:
          cycleStep === 0,

        laneStates,
      },
      when,
    );
  }

  scheduleVisualStep(
    visualState,
    audioTime,
  ) {
    const delayMs =
      Math.max(
        0,
        (
          audioTime -
          this.context
            .currentTime
        ) *
          1000,
      );

    const timerId =
      window.setTimeout(
        () => {
          this.visualTimers.delete(
            timerId,
          );

          if (
            this.state !==
            "playing"
          ) {
            return;
          }

          this.lastVisualGlobalStep =
            visualState.globalStep;

          this.onVisualStep(
            visualState,
          );
        },
        delayMs,
      );

    this.visualTimers.add(
      timerId,
    );
  }

  clearVisualTimers() {
    for (
      const timerId of
      this.visualTimers
    ) {
      window.clearTimeout(
        timerId,
      );
    }

    this.visualTimers.clear();
  }

  setState(
    nextState,
  ) {
    this.state =
      nextState;

    this.onStateChange(
      nextState,
    );
  }

  dispose() {
    if (this.disposed) {
      return;
    }

    this.stop();

    this.scheduler.stop();
    this.voice.dispose();

    this.disposed =
      true;
  }

  assertNotDisposed() {
    if (this.disposed) {
      throw new Error(
        "PolymeterEngine has already been disposed.",
      );
    }
  }
}