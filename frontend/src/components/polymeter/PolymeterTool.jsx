import {
  useMemo,
  useState,
} from "react";

import {
  usePolymeterAudio,
} from "@/hooks/usePolymeterAudio.js";

import {
  getPolymeterCycleLength,
} from "@/lib/polymeter/cycle.js";

import {
  clampPatternLength,
  createDefaultPolymeterLanes,
  resizePattern,
  togglePatternStep,
} from "@/lib/polymeter/pattern.js";

import {
  PolymeterControls,
} from "./PolymeterControls.jsx";

import {
  PolymeterLane,
} from "./PolymeterLane.jsx";

function clampBpm(
  value,
) {
  const numeric =
    Number(value);

  if (
    !Number.isFinite(numeric)
  ) {
    return 100;
  }

  return Math.min(
    300,
    Math.max(
      30,
      Math.round(numeric),
    ),
  );
}

export function PolymeterTool() {
  const [
    bpm,
    setBpm,
  ] = useState(
    100,
  );

  const [
    laneCount,
    setLaneCount,
  ] = useState(
    2,
  );

  const [
    lanes,
    setLanes,
  ] = useState(
    () =>
      createDefaultPolymeterLanes(),
  );

  const activeLanes =
    useMemo(
      () =>
        lanes.slice(
          0,
          laneCount,
        ),
      [
        lanes,
        laneCount,
      ],
    );

  const cycleLength =
    useMemo(
      () =>
        getPolymeterCycleLength(
          activeLanes,
        ),
      [
        activeLanes,
      ],
    );

  const {
    transportState,
    visualState,
    isLoading,
    error,

    play,
    pause,
    stop,
    restart,
  } = usePolymeterAudio({
    bpm,
    lanes:
      activeLanes,
  });

  function updateLane(
    laneId,
    updater,
  ) {
    setLanes(
      (
        currentLanes,
      ) =>
        currentLanes.map(
          (lane) =>
            lane.id ===
            laneId
              ? updater(
                  lane,
                )
              : lane,
        ),
    );
  }

  function handleInstrumentChange(
    laneId,
    instrumentId,
  ) {
    updateLane(
      laneId,
      (lane) => ({
        ...lane,
        instrumentId,
      }),
    );
  }

  function handleLengthChange(
    laneId,
    value,
  ) {
    const nextLength =
      clampPatternLength(
        value,
      );

    updateLane(
      laneId,
      (lane) => ({
        ...lane,

        pattern:
          resizePattern(
            lane.pattern,
            nextLength,
          ),
      }),
    );
  }

  function handleToggleStep(
    laneId,
    stepIndex,
  ) {
    updateLane(
      laneId,
      (lane) => ({
        ...lane,

        pattern:
          togglePatternStep(
            lane.pattern,
            stepIndex,
          ),
      }),
    );
  }

  function handleMuteToggle(
    laneId,
  ) {
    updateLane(
      laneId,
      (lane) => ({
        ...lane,
        muted:
          !lane.muted,
      }),
    );
  }

  function getCurrentStep(
    laneId,
  ) {
    if (
      !visualState
    ) {
      return null;
    }

    const laneState =
      visualState.laneStates.find(
        (state) =>
          state.laneId ===
          laneId,
      );

    return (
      laneState
        ?.stepIndex ??
      null
    );
  }

  return (
    <div>
      <PolymeterControls
        bpm={bpm}
        laneCount={
          laneCount
        }
        cycleLength={
          cycleLength
        }
        visualState={
          visualState
        }
        transportState={
          transportState
        }
        isLoading={
          isLoading
        }
        error={error}
        onBpmChange={(
          value,
        ) =>
          setBpm(
            clampBpm(
              value,
            ),
          )
        }
        onLaneCountChange={
          setLaneCount
        }
        onPlay={play}
        onPause={pause}
        onStop={stop}
        onRestart={
          restart
        }
      />

      <div
        className="
          mt-6
          grid
          gap-5
          xl:grid-cols-3
        "
      >
        {activeLanes.map(
          (lane) => (
            <PolymeterLane
              key={
                lane.id
              }
              lane={
                lane
              }
              currentStep={
                getCurrentStep(
                  lane.id,
                )
              }
              onInstrumentChange={
                handleInstrumentChange
              }
              onLengthChange={
                handleLengthChange
              }
              onToggleStep={
                handleToggleStep
              }
              onMuteToggle={
                handleMuteToggle
              }
            />
          ),
        )}
      </div>
    </div>
  );
}