import {
  POLYMETER_INSTRUMENTS,
  getPolymeterInstrument,
} from "@/lib/polymeter/instruments.js";

import {
  MAX_PATTERN_LENGTH,
  MIN_PATTERN_LENGTH,
} from "@/lib/polymeter/pattern.js";

import {
  PolymeterCircle,
} from "./PolymeterCircle.jsx";

export function PolymeterLane({
  lane,
  currentStep,
  onInstrumentChange,
  onLengthChange,
  onToggleStep,
  onMuteToggle,
}) {
  const instrument =
    getPolymeterInstrument(
      lane.instrumentId,
    );

  return (
    <section
      className="
        rounded-[1.75rem]
        border
        border-white/10
        bg-white/[0.018]
        p-5
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
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
            Instrument
          </p>

          <select
            value={
              lane.instrumentId
            }
            onChange={(
              event,
            ) =>
              onInstrumentChange(
                lane.id,
                event.target
                  .value,
              )
            }
            className="
              mt-2
              h-11
              rounded-xl
              border
              border-white/10
              bg-black/40
              px-3
              text-sm
              font-semibold
              text-white
            "
          >
            {POLYMETER_INSTRUMENTS.map(
              (
                option,
              ) => (
                <option
                  key={
                    option.id
                  }
                  value={
                    option.id
                  }
                >
                  {
                    option.name
                  }
                </option>
              ),
            )}
          </select>
        </div>

        <div
          className="
            flex
            items-end
            gap-3
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
              Pattern length
            </span>

            <input
              type="number"
              min={
                MIN_PATTERN_LENGTH
              }
              max={
                MAX_PATTERN_LENGTH
              }
              value={
                lane.pattern
                  .length
              }
              onChange={(
                event,
              ) =>
                onLengthChange(
                  lane.id,
                  event.target
                    .value,
                )
              }
              className="
                mt-2
                h-11
                w-24
                rounded-xl
                border
                border-white/10
                bg-black/40
                px-3
                text-sm
                font-semibold
                text-white
              "
            />
          </label>

          <button
            type="button"
            onClick={() =>
              onMuteToggle(
                lane.id,
              )
            }
            className="
              h-11
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              px-4
              text-xs
              font-bold
              uppercase
              tracking-wide
              text-white/60
              transition
              hover:bg-white/[0.07]
            "
          >
            {lane.muted
              ? "Unmute"
              : "Mute"}
          </button>
        </div>
      </div>

      <div className="mt-6">
        <PolymeterCircle
          pattern={
            lane.pattern
          }
          currentStep={
            currentStep
          }
          instrumentName={
            instrument.name
          }
          accent={
            instrument.accent
          }
          muted={
            lane.muted
          }
          onToggleStep={(
            stepIndex,
          ) =>
            onToggleStep(
              lane.id,
              stepIndex,
            )
          }
        />
      </div>
    </section>
  );
}