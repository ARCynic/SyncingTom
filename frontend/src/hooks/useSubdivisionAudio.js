import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  SubdivisionAudioEngine,
} from "@/lib/subdivision/SubdivisionAudioEngine.js";

export function useSubdivisionAudio({
  meter,
  bpm,
  steps,
  loopSettings,
}) {
  const engineRef =
    useRef(null);

  const [
    transportState,
    setTransportState,
  ] = useState("stopped");

  const [
    playbackEvent,
    setPlaybackEvent,
  ] = useState(null);

  const [
    masterVolume,
    setMasterVolumeState,
  ] = useState(0.7);

  const [
    accentLevel,
    setAccentLevelState,
  ] = useState(0.9);

  const [
    error,
    setError,
  ] = useState(null);

  const getEngine =
    useCallback(() => {
      if (
        !engineRef.current
      ) {
        engineRef.current =
          new SubdivisionAudioEngine(
            {
              meter,
              bpm,
              steps,
              loopSettings,
            },

            {
              onStateChange:
                setTransportState,

              onSubdivision:
                setPlaybackEvent,

              onPositionReset:
                () =>
                  setPlaybackEvent(
                    null,
                  ),

              onError:
                (nextError) =>
                  setError(
                    nextError.message,
                  ),
            },
          );

        engineRef.current
          .setMasterVolume(
            masterVolume,
          );

        engineRef.current
          .setAccentLevel(
            accentLevel,
          );
      }

      return engineRef.current;
    }, [
      accentLevel,
      bpm,
      loopSettings,
      masterVolume,
      meter,
      steps,
    ]);

  const syncConfig =
    useCallback(() => {
      const engine =
        getEngine();

      engine.setConfig({
        meter,
        bpm,
        steps,
        loopSettings,
      });

      return engine;
    }, [
      bpm,
      getEngine,
      loopSettings,
      meter,
      steps,
    ]);

  const play =
    useCallback(async () => {
      setError(null);

      try {
        const engine =
          syncConfig();

        await engine.play();
      } catch (nextError) {
        setError(
          nextError instanceof Error
            ? nextError.message
            : "Unable to start playback.",
        );
      }
    }, [syncConfig]);

  const pause =
    useCallback(() => {
      engineRef.current?.pause();
    }, []);

  const stop =
    useCallback(() => {
      engineRef.current?.stop();
    }, []);

  const restart =
    useCallback(async () => {
      setError(null);

      try {
        const engine =
          syncConfig();

        await engine.restart();
      } catch (nextError) {
        setError(
          nextError instanceof Error
            ? nextError.message
            : "Unable to restart playback.",
        );
      }
    }, [syncConfig]);

  const setMasterVolume =
    useCallback((value) => {
      const nextValue =
        Math.min(
          1,
          Math.max(0, value),
        );

      setMasterVolumeState(
        nextValue,
      );

      engineRef.current
        ?.setMasterVolume(
          nextValue,
        );
    }, []);

  const setAccentLevel =
    useCallback((value) => {
      const nextValue =
        Math.min(
          1,
          Math.max(0, value),
        );

      setAccentLevelState(
        nextValue,
      );

      engineRef.current
        ?.setAccentLevel(
          nextValue,
        );
    }, []);

  useEffect(() => {
    return () => {
      const engine =
        engineRef.current;

      engineRef.current = null;

      void engine?.destroy();
    };
  }, []);

  return {
    transportState,
    playbackEvent,

    masterVolume,
    accentLevel,

    error,

    play,
    pause,
    stop,
    restart,

    setMasterVolume,
    setAccentLevel,
  };
}