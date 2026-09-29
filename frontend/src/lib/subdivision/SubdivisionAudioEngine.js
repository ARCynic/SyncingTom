import { ClickSynth } from "@/lib/audio/ClickSynth.js";
import { Scheduler } from "@/lib/audio/Scheduler.js";

import {
  countLadderBars,
  validateSubdivisionConfig,
} from "./ladder.js";

import {
  advanceSubdivisionCursor,
  createInitialSubdivisionCursor,
  subdivisionDurationSeconds,
} from "./timing.js";

const START_DELAY_SECONDS = 0.05;
const EVENT_HISTORY_SECONDS = 0.25;
const FINAL_EVENT_SETTLE_SECONDS = 0.12;

function cloneMeter(meter) {
  return {
    numerator:
      meter.numerator,

    denominator:
      meter.denominator,
  };
}

function cloneSteps(steps) {
  return steps.map(
    (step) => ({
      ...step,
    }),
  );
}

function cloneLoopSettings(
  loopSettings,
) {
  return {
    ...loopSettings,
  };
}

function stepsEqual(a, b) {
  if (
    a.length !== b.length
  ) {
    return false;
  }

  return a.every(
    (step, index) => {
      const other = b[index];

      return (
        other &&
        step.subdivision ===
          other.subdivision &&
        step.bars ===
          other.bars
      );
    },
  );
}

function structuralConfigEqual(
  current,
  next,
) {
  return (
    current.meter.numerator ===
      next.meter.numerator &&
    current.meter.denominator ===
      next.meter.denominator &&
    stepsEqual(
      current.steps,
      next.steps,
    ) &&
    current.loopSettings.mode ===
      next.loopSettings.mode &&
    current.loopSettings.cycles ===
      next.loopSettings.cycles
  );
}

function getAbsoluteBarNumber(
  steps,
  cursor,
) {
  let previousBars = 0;

  for (
    let index = 0;
    index < cursor.stepIndex;
    index += 1
  ) {
    previousBars +=
      steps[index]?.bars ?? 0;
  }

  return (
    previousBars +
    cursor.barIndex +
    1
  );
}

function getNextStep(
  steps,
  cursor,
  loopSettings,
) {
  const nextStep =
    steps[
      cursor.stepIndex + 1
    ];

  if (nextStep) {
    return {
      ...nextStep,
    };
  }

  const anotherCycleExists =
    loopSettings.mode ===
      "infinite" ||
    cursor.cycleIndex + 1 <
      loopSettings.cycles;

  if (
    !anotherCycleExists
  ) {
    return null;
  }

  return steps[0]
    ? {
        ...steps[0],
      }
    : null;
}

export class SubdivisionAudioEngine {
  constructor(
    config,
    callbacks = {},
  ) {
    validateSubdivisionConfig(
      config,
    );

    this.config = {
      meter:
        cloneMeter(
          config.meter,
        ),

      bpm:
        config.bpm,

      steps:
        cloneSteps(
          config.steps,
        ),

      loopSettings:
        cloneLoopSettings(
          config.loopSettings,
        ),
    };

    this.callbacks =
      callbacks;

    this.context = null;
    this.synth = null;
    this.scheduler = null;

    this.transportState =
      "stopped";

    this.cursor =
      createInitialSubdivisionCursor();

    this.nextEventTime = 0;

    this.pendingCompletionTime =
      null;

    this.scheduledEvents = [];

    this.visualTimerIds =
      new Set();

    this.masterVolume = 0.7;
    this.accentLevel = 0.9;

    this.destroyed = false;

    this.scheduleUntil =
      this.scheduleUntil.bind(
        this,
      );
  }

  setCallbacks(callbacks) {
    this.callbacks =
      callbacks;
  }

  getState() {
    return this.transportState;
  }

  setConfig(nextConfig) {
    validateSubdivisionConfig(
      nextConfig,
    );

    const structureChanged =
      !structuralConfigEqual(
        this.config,
        nextConfig,
      );

    this.config = {
      meter:
        cloneMeter(
          nextConfig.meter,
        ),

      bpm:
        nextConfig.bpm,

      steps:
        cloneSteps(
          nextConfig.steps,
        ),

      loopSettings:
        cloneLoopSettings(
          nextConfig.loopSettings,
        ),
    };

    if (
      this.transportState ===
        "stopped" ||
      structureChanged
    ) {
      this.resetPosition();
    }
  }

  setMasterVolume(value) {
    this.masterVolume =
      Math.min(
        1,
        Math.max(0, value),
      );

    this.synth?.setMasterVolume(
      this.masterVolume,
    );
  }

  setAccentLevel(value) {
    this.accentLevel =
      Math.min(
        1,
        Math.max(0, value),
      );

    this.synth?.setAccentLevel(
      this.accentLevel,
    );
  }

  async ensureAudioContext() {
    if (this.context) {
      return this.context;
    }

    if (
      typeof window ===
      "undefined"
    ) {
      throw new Error(
        "Web Audio is only available in the browser.",
      );
    }

    const AudioContextConstructor =
      window.AudioContext ??
      window.webkitAudioContext;

    if (
      !AudioContextConstructor
    ) {
      throw new Error(
        "This browser does not support the Web Audio API.",
      );
    }

    const context =
      new AudioContextConstructor();

    this.context = context;

    this.synth =
      new ClickSynth(
        context,
        this.masterVolume,
        this.accentLevel,
      );

    this.scheduler =
      new Scheduler(
        context,
        this.scheduleUntil,
      );

    return context;
  }

  async play() {
    this.assertNotDestroyed();

    if (
      this.transportState ===
      "playing"
    ) {
      return;
    }

    try {
      validateSubdivisionConfig(
        this.config,
      );

      const context =
        await this.ensureAudioContext();

      if (
        context.state ===
        "suspended"
      ) {
        await context.resume();
      }

      if (
        context.state !==
        "running"
      ) {
        throw new Error(
          "Audio could not be started.",
        );
      }

      this.pendingCompletionTime =
        null;

      this.nextEventTime =
        context.currentTime +
        START_DELAY_SECONDS;

      this.setState("playing");

      this.scheduler?.start();
    } catch (error) {
      const normalized =
        error instanceof Error
          ? error
          : new Error(
              "Unable to start playback.",
            );

      this.callbacks.onError?.(
        normalized,
      );

      throw normalized;
    }
  }

  pause() {
    if (
      this.transportState !==
        "playing" ||
      !this.context
    ) {
      return;
    }

    this.scheduler?.stop();

    this.clearVisualTimers();

    this.rewindToFirstFutureEvent(
      this.context.currentTime,
    );

    this.pendingCompletionTime =
      null;

    this.setState("paused");
  }

  stop() {
    if (this.destroyed) {
      return;
    }

    this.scheduler?.stop();

    this.clearVisualTimers();

    this.cancelFutureEvents(
      this.context?.currentTime ??
        0,
    );

    this.resetPosition();

    this.setState("stopped");
  }

  async restart() {
    this.assertNotDestroyed();

    this.scheduler?.stop();

    this.clearVisualTimers();

    this.cancelFutureEvents(
      this.context?.currentTime ??
        0,
    );

    this.resetPosition();

    this.setState("stopped");

    await this.play();
  }

  scheduleUntil(
    scheduleUntil,
  ) {
    const context =
      this.context;

    const synth =
      this.synth;

    if (
      !context ||
      !synth ||
      this.transportState !==
        "playing"
    ) {
      return;
    }

    this.removeOldEvents(
      context.currentTime,
    );

    if (
      this.pendingCompletionTime !==
      null
    ) {
      if (
        context.currentTime >=
        this.pendingCompletionTime
      ) {
        this.completePlayback();
      }

      return;
    }

    while (
      this.transportState ===
        "playing" &&
      this.pendingCompletionTime ===
        null &&
      this.nextEventTime <=
        scheduleUntil
    ) {
      const step =
        this.config.steps[
          this.cursor.stepIndex
        ];

      if (!step) {
        this.failPlayback(
          new Error(
            "Subdivision playback position is invalid.",
          ),
        );

        return;
      }

      const scheduledCursor = {
        ...this.cursor,
      };

      const scheduledTime =
        this.nextEventTime;

      /*
       * First subdivision of
       * every pulse is accented.
       *
       * This keeps the underlying
       * pulse audible while the
       * note density changes.
       */
      const isPulseAccent =
        scheduledCursor
          .subdivisionIndex === 0;

      const handle =
        synth.scheduleClick(
          scheduledTime,
          isPulseAccent,
        );

      this.scheduledEvents.push({
        time:
          scheduledTime,

        cursor:
          scheduledCursor,

        handle,
      });

      this.scheduleVisualEvent(
        scheduledTime,
        scheduledCursor,
        isPulseAccent,
      );

      const duration =
        subdivisionDurationSeconds(
          this.config.bpm,

          this.config.meter
            .denominator,

          step.subdivision,
        );

      const advanceResult =
        advanceSubdivisionCursor(
          this.config.meter,
          this.config.steps,
          scheduledCursor,
          this.config
            .loopSettings,
        );

      this.nextEventTime +=
        duration;

      if (
        advanceResult.done
      ) {
        this.cursor =
          advanceResult.cursor;

        this.pendingCompletionTime =
          scheduledTime +
          FINAL_EVENT_SETTLE_SECONDS;

        break;
      }

      this.cursor =
        advanceResult.cursor;
    }
  }

  scheduleVisualEvent(
    when,
    cursor,
    isPulseAccent,
  ) {
    const context =
      this.context;

    if (
      !context ||
      typeof window ===
        "undefined"
    ) {
      return;
    }

    const step =
      this.config.steps[
        cursor.stepIndex
      ];

    if (!step) {
      return;
    }

    const payload = {
      cursor: {
        ...cursor,
      },

      meter:
        cloneMeter(
          this.config.meter,
        ),

      step: {
        ...step,
      },

      bpm:
        this.config.bpm,

      audioTime:
        when,

      isPulseAccent,

      barNumber:
        getAbsoluteBarNumber(
          this.config.steps,
          cursor,
        ),

      totalBars:
        countLadderBars(
          this.config.steps,
        ),

      nextStep:
        getNextStep(
          this.config.steps,
          cursor,
          this.config
            .loopSettings,
        ),
    };

    const delayMs =
      Math.max(
        0,

        (
          when -
          context.currentTime
        ) * 1000,
      );

    const timerId =
      window.setTimeout(
        () => {
          this.visualTimerIds.delete(
            timerId,
          );

          if (
            this.destroyed ||
            this.transportState !==
              "playing"
          ) {
            return;
          }

          this.callbacks
            .onSubdivision?.(
              payload,
            );
        },
        delayMs,
      );

    this.visualTimerIds.add(
      timerId,
    );
  }

  rewindToFirstFutureEvent(
    now,
  ) {
    const futureEvents =
      this.scheduledEvents
        .filter(
          (event) =>
            event.time > now,
        )
        .sort(
          (a, b) =>
            a.time - b.time,
        );

    if (
      futureEvents.length > 0
    ) {
      this.cursor = {
        ...futureEvents[0]
          .cursor,
      };
    }

    for (
      const event of
      futureEvents
    ) {
      event.handle.cancel(
        now,
      );
    }

    this.scheduledEvents =
      this.scheduledEvents.filter(
        (event) =>
          event.time <= now,
      );
  }

  cancelFutureEvents(now) {
    for (
      const event of
      this.scheduledEvents
    ) {
      if (
        event.time > now
      ) {
        event.handle.cancel(
          now,
        );
      }
    }

    this.scheduledEvents = [];
  }

  removeOldEvents(now) {
    const cutoff =
      now -
      EVENT_HISTORY_SECONDS;

    this.scheduledEvents =
      this.scheduledEvents.filter(
        (event) =>
          event.time >= cutoff,
      );
  }

  clearVisualTimers() {
    if (
      typeof window ===
      "undefined"
    ) {
      this.visualTimerIds.clear();

      return;
    }

    for (
      const timerId of
      this.visualTimerIds
    ) {
      window.clearTimeout(
        timerId,
      );
    }

    this.visualTimerIds.clear();
  }

  completePlayback() {
    this.scheduler?.stop();

    this.clearVisualTimers();

    this.scheduledEvents = [];

    this.resetPosition();

    this.setState("stopped");
  }

  failPlayback(error) {
    this.scheduler?.stop();

    this.clearVisualTimers();

    this.cancelFutureEvents(
      this.context?.currentTime ??
        0,
    );

    this.resetPosition();

    this.setState("stopped");

    this.callbacks.onError?.(
      error,
    );
  }

  resetPosition() {
    this.cursor =
      createInitialSubdivisionCursor();

    this.nextEventTime = 0;

    this.pendingCompletionTime =
      null;

    this.callbacks
      .onPositionReset?.();
  }

  setState(nextState) {
    if (
      this.transportState ===
      nextState
    ) {
      return;
    }

    this.transportState =
      nextState;

    this.callbacks
      .onStateChange?.(
        nextState,
      );
  }

  assertNotDestroyed() {
    if (this.destroyed) {
      throw new Error(
        "Subdivision audio engine has already been destroyed.",
      );
    }
  }

  async destroy() {
    if (this.destroyed) {
      return;
    }

    this.destroyed = true;

    this.scheduler?.stop();

    this.clearVisualTimers();

    this.cancelFutureEvents(
      this.context?.currentTime ??
        0,
    );

    this.synth?.dispose();

    const context =
      this.context;

    this.scheduler = null;
    this.synth = null;
    this.context = null;

    if (
      context &&
      context.state !==
        "closed"
    ) {
      try {
        await context.close();
      } catch {
        // Browser teardown.
      }
    }
  }
}