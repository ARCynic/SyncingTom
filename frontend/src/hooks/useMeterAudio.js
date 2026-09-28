import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { AudioEngine } from "@/lib/audio/AudioEngine.js";

export function useMeterAudio({
  sequence,
  bpm,
  loopSettings,
}) {
  const engineRef = useRef(null);

  const [transportState, setTransportState] = useState("stopped");
  const [masterVolume, setMasterVolumeState] = useState(0.7);
  const [accentLevel, setAccentLevelState] = useState(0.9);
  const [error, setError] = useState(null);

  const getEngine = useCallback(() => {
    if (!engineRef.current) {
      engineRef.current = new AudioEngine(
        {
          sequence,
          bpm,
          loopSettings,
        },
        {
          onStateChange: setTransportState,
          onError: (nextError) => setError(nextError.message),
        },
      );

      engineRef.current.setMasterVolume(masterVolume);
      engineRef.current.setAccentLevel(accentLevel);
    }

    return engineRef.current;
  }, [
    accentLevel,
    bpm,
    loopSettings,
    masterVolume,
    sequence,
  ]);

  const syncConfig = useCallback(() => {
    const engine = getEngine();

    engine.setConfig({
      sequence,
      bpm,
      loopSettings,
    });

    return engine;
  }, [
    bpm,
    getEngine,
    loopSettings,
    sequence,
  ]);

  const play = useCallback(async () => {
    setError(null);

    try {
      const engine = syncConfig();
      await engine.play();
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : "Unable to start playback.",
      );
    }
  }, [syncConfig]);

  const pause = useCallback(() => {
    engineRef.current?.pause();
  }, []);

  const stop = useCallback(() => {
    engineRef.current?.stop();
  }, []);

  const restart = useCallback(async () => {
    setError(null);

    try {
      const engine = syncConfig();
      await engine.restart();
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : "Unable to restart playback.",
      );
    }
  }, [syncConfig]);

  const setMasterVolume = useCallback((value) => {
    const nextValue = Math.min(1, Math.max(0, value));

    setMasterVolumeState(nextValue);
    engineRef.current?.setMasterVolume(nextValue);
  }, []);

  const setAccentLevel = useCallback((value) => {
    const nextValue = Math.min(1, Math.max(0, value));

    setAccentLevelState(nextValue);
    engineRef.current?.setAccentLevel(nextValue);
  }, []);

  useEffect(() => {
    return () => {
      const engine = engineRef.current;
      engineRef.current = null;
      void engine?.destroy();
    };
  }, []);

  return {
    transportState,
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
