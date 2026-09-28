export class Scheduler {
  constructor(context, onTick, options = {}) {
    this.context = context;
    this.onTick = onTick;

    this.lookAheadMs = options.lookAheadMs ?? 25;
    this.scheduleAheadSeconds = options.scheduleAheadSeconds ?? 0.1;

    this.timerId = null;
    this.running = false;

    this.runTick = this.runTick.bind(this);
  }

  start() {
    if (this.running) {
      return;
    }

    this.running = true;
    this.runTick();
  }

  stop() {
    this.running = false;

    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  isRunning() {
    return this.running;
  }

  runTick() {
    if (!this.running) {
      return;
    }

    const scheduleUntil =
      this.context.currentTime + this.scheduleAheadSeconds;

    this.onTick(scheduleUntil);

    if (!this.running) {
      return;
    }

    this.timerId = window.setTimeout(
      this.runTick,
      this.lookAheadMs,
    );
  }
}
