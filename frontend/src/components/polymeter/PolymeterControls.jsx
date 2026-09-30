export function PolymeterControls({
  bpm,
  laneCount,
  cycleLength,
  visualState,
  transportState,
  isLoading,
  error,

  onBpmChange,
  onLaneCountChange,

  onPlay,
  onPause,
  onStop,
  onRestart,
}) {
  const isPlaying =
    transportState ===
    "playing";

  const isPaused =
    transportState ===
    "paused";

  const cyclePosition =
    visualState
      ? visualState.cycleStep +
        1
      : 0;

  return (
    <section
      className="
        rounded-[1.75rem]
        border
        border-white/10
        bg-black/25
        p-5
      "
    >
      <div
        className="
          grid
          gap-6
          lg:grid-cols-[auto_auto_1fr]
          lg:items-end
        "
      >
        <label>
          <span
            className="
              block
              text-[10px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-white/30
            "
          >
            Central BPM
          </span>

          <input
            type="number"
            min="30"
            max="300"
            value={bpm}
            onChange={(
              event,
            ) =>
              onBpmChange(
                event.target
                  .value,
              )
            }
            className="
              mt-2
              h-12
              w-28
              rounded-xl
              border
              border-white/10
              bg-black/40
              px-3
              text-lg
              font-semibold
              text-white
            "
          />
        </label>

        <div>
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-white/30
            "
          >
            Instruments
          </p>

          <div
            className="
              mt-2
              flex
              gap-2
            "
          >
            {[2, 3].map(
              (count) => (
                <button
                  key={
                    count
                  }
                  type="button"
                  onClick={() =>
                    onLaneCountChange(
                      count,
                    )
                  }
                  className="
                    h-12
                    min-w-12
                    rounded-xl
                    border
                    px-4
                    text-sm
                    font-semibold
                    transition
                  "
                  style={{
                    borderColor:
                      laneCount ===
                      count
                        ? "#67e8f9"
                        : "rgba(255,255,255,0.1)",

                    background:
                      laneCount ===
                      count
                        ? "rgba(103,232,249,0.12)"
                        : "rgba(255,255,255,0.025)",

                    color:
                      laneCount ===
                      count
                        ? "#cffafe"
                        : "rgba(255,255,255,0.55)",
                  }}
                >
                  {count}
                </button>
              ),
            )}
          </div>
        </div>

        <div
          className="
            flex
            flex-wrap
            gap-2
            lg:justify-end
          "
        >
          <button
            type="button"
            disabled={
              isLoading ||
              isPlaying
            }
            onClick={() => {
              void onPlay();
            }}
            className="
              h-12
              rounded-xl
              border
              border-cyan-300/30
              bg-cyan-300/10
              px-5
              text-sm
              font-semibold
              text-cyan-100
              disabled:opacity-35
            "
          >
            {isLoading
              ? "Loading samples…"
              : isPaused
                ? "▶ Resume"
                : "▶ Play"}
          </button>

          <button
            type="button"
            disabled={
              !isPlaying
            }
            onClick={
              onPause
            }
            className="
              h-12
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              px-5
              text-sm
              font-semibold
              text-white/60
              disabled:opacity-30
            "
          >
            Pause
          </button>

          <button
            type="button"
            disabled={
              transportState ===
              "stopped"
            }
            onClick={
              onStop
            }
            className="
              h-12
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              px-5
              text-sm
              font-semibold
              text-white/60
              disabled:opacity-30
            "
          >
            Stop
          </button>

          <button
            type="button"
            disabled={
              isLoading
            }
            onClick={() => {
              void onRestart();
            }}
            className="
              h-12
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              px-5
              text-sm
              font-semibold
              text-white/60
              disabled:opacity-30
            "
          >
            Restart
          </button>
        </div>
      </div>

      <div
        className="
          mt-5
          grid
          gap-3
          sm:grid-cols-3
        "
      >
        <StatusBlock
          label="Full cycle"
          value={`${cycleLength} steps`}
        />

        <StatusBlock
          label="Cycle position"
          value={
            visualState
              ? `${cyclePosition} / ${cycleLength}`
              : `0 / ${cycleLength}`
          }
        />

        <StatusBlock
          label="Alignment"
          value={
            visualState
              ?.realigned
              ? "Realigned"
              : "In motion"
          }
          highlighted={
            visualState
              ?.realigned
          }
        />
      </div>

      {error ? (
        <p
          role="alert"
          className="
            mt-4
            rounded-xl
            border
            border-red-400/20
            bg-red-400/[0.06]
            p-3
            text-sm
            text-red-200
          "
        >
          {error}
        </p>
      ) : null}
    </section>
  );
}

function StatusBlock({
  label,
  value,
  highlighted = false,
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-white/[0.07]
        bg-white/[0.018]
        p-3
      "
    >
      <p
        className="
          text-[10px]
          font-bold
          uppercase
          tracking-[0.18em]
          text-white/25
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          font-mono
          text-sm
        "
        style={{
          color:
            highlighted
              ? "#67e8f9"
              : "rgba(255,255,255,0.65)",
        }}
      >
        {value}
      </p>
    </div>
  );
}