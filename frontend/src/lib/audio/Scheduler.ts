type SchedulerTick = (scheduleUntil: number) => void;

export type SchedulerOptions = {
  lookAheadMs?: number;
  scheduleAheadSeconds?: number;
};

export class Scheduler {
  private readonly context: AudioContext;
  private readonly onTick: SchedulerTick;
  private readonly lookAheadMs: number;
  private readonly scheduleAheadSeconds: number;
  private timerId: number | null = null;
  private running = false;

  constructor(
    context: AudioContext,
    onTick: SchedulerTick,
    options: SchedulerOptions = {},
  ) {
    this.context = context;
    this.onTick = onTick;
    this.lookAheadMs = options.lookAheadMs ?? 25;
    this.scheduleAheadSeconds = options.scheduleAheadSeconds ?? 0.1;
  }

  start(): void {
    if (this.running) {
      return;
    }

    this.running = true;
    this.runTick();
  }

  stop(): void {
    this.running = false;

    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  isRunning(): boolean {
    return this.running;
  }

  private runTick = (): void => {
    if (!this.running) {
      return;
    }

    const scheduleUntil = this.context.currentTime + this.scheduleAheadSeconds;
    this.onTick(scheduleUntil);

    if (!this.running) {
      return;
    }

    // setTimeout only wakes the scheduler. Musical timing itself is scheduled
    // against AudioContext.currentTime inside the Web Audio timeline.
    this.timerId = window.setTimeout(this.runTick, this.lookAheadMs);
  };
}
