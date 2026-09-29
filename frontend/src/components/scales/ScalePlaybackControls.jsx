import {
  SCALE_INSTRUMENTS,
} from "@/lib/audio/instruments/instrumentRegistry.js";

export function ScalePlaybackControls({
  instrumentId,
  transportState,
  error,
  onInstrumentChange,
  onPlay,
  onStop,
}) {
  const isPlaying =
    transportState ===
    "playing";

  return (
    <div
      className="
        mt-6
        rounded-2xl
        border
        border-white/10
        bg-black/25
        p-4
      "
    >
      <div
        className="
          grid
          gap-4
          sm:grid-cols-[minmax(0,1fr)_auto]
          sm:items-end
        "
      >
        <label>
          <span
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-white/30
            "
          >
            Instrument
          </span>

          <select
            value={
              instrumentId
            }
            onChange={(
              event,
            ) =>
              onInstrumentChange(
                event.target
                  .value,
              )
            }
            className="
              mt-2
              h-11
              w-full
              rounded-xl
              border
              border-white/10
              bg-black/40
              px-3
              text-sm
              font-semibold
              text-white
              outline-none
              transition
              hover:border-cyan-300/30
            "
          >
            {SCALE_INSTRUMENTS.map(
              (
                instrument,
              ) => (
                <option
                  key={
                    instrument.id
                  }
                  value={
                    instrument.id
                  }
                >
                  {
                    instrument.name
                  }
                </option>
              ),
            )}
          </select>
        </label>

        <div
          className="
            flex
            gap-2
          "
        >
          <button
            type="button"
            onClick={() => {
              void onPlay();
            }}
            disabled={
              isPlaying
            }
            className="
              min-h-11
              rounded-xl
              border
              border-cyan-300/30
              bg-cyan-300/10
              px-4
              text-sm
              font-semibold
              text-cyan-100
              transition
              hover:bg-cyan-300/15
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            {isPlaying
              ? "Playing…"
              : "▶ Play scale"}
          </button>

          <button
            type="button"
            onClick={
              onStop
            }
            disabled={
              !isPlaying
            }
            className="
              min-h-11
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              px-4
              text-sm
              font-semibold
              text-white/60
              transition
              hover:bg-white/[0.07]
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            ■ Stop
          </button>
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="
            mt-3
            text-xs
            text-red-300
          "
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}