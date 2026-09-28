const MIN_GAIN = 0.0001;
const NORMAL_CLICK_LEVEL = 0.5;

function clampUnit(value) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(1, Math.max(0, value));
}

export class ClickSynth {
  constructor(context, masterVolume = 0.7, accentLevel = 0.9) {
    this.context = context;
    this.accentLevel = clampUnit(accentLevel);

    this.masterGain = context.createGain();
    this.masterGain.gain.value = clampUnit(masterVolume);
    this.masterGain.connect(context.destination);
  }

  setMasterVolume(value) {
    const now = this.context.currentTime;
    const nextValue = clampUnit(value);

    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setTargetAtTime(nextValue, now, 0.01);
  }

  setAccentLevel(value) {
    this.accentLevel = clampUnit(value);
  }

  scheduleClick(when, isAccent) {
    const startTime = Math.max(
      when,
      this.context.currentTime + 0.001,
    );

    const duration = isAccent ? 0.045 : 0.035;

    const oscillator = this.context.createOscillator();
    const envelope = this.context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(
      isAccent ? 1450 : 920,
      startTime,
    );

    const peak = isAccent ? this.accentLevel : NORMAL_CLICK_LEVEL;

    envelope.gain.setValueAtTime(MIN_GAIN, startTime);
    envelope.gain.exponentialRampToValueAtTime(
      Math.max(MIN_GAIN, peak),
      startTime + 0.002,
    );
    envelope.gain.exponentialRampToValueAtTime(
      MIN_GAIN,
      startTime + duration,
    );

    oscillator.connect(envelope);
    envelope.connect(this.masterGain);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.005);

    let cancelled = false;

    const disconnect = () => {
      try {
        oscillator.disconnect();
      } catch {
        // Already disconnected.
      }

      try {
        envelope.disconnect();
      } catch {
        // Already disconnected.
      }
    };

    oscillator.addEventListener("ended", disconnect, { once: true });

    return {
      cancel: (cancelAt = this.context.currentTime) => {
        if (cancelled) {
          return;
        }

        cancelled = true;

        const safeCancelTime = Math.max(
          cancelAt,
          this.context.currentTime,
        );

        try {
          oscillator.stop(safeCancelTime);
        } catch {
          // It may already have ended.
        }
      },
    };
  }

  dispose() {
    try {
      this.masterGain.disconnect();
    } catch {
      // Already disconnected.
    }
  }
}
