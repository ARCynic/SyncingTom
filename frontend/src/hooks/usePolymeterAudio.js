import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  PolymeterEngine,
} from "@/lib/audio/PolymeterEngine.js";

export function usePolymeterAudio({
  bpm,
  lanes,
}) {
  const contextRef =
    useRef(null);

  const engineRef =
    useRef(null);

  const samplesLoadedRef =
    useRef(false);

  const [
    transportState,
    setTransportState,
  ] = useState(
    "stopped",
  );

  const [
    visualState,
    setVisualState,
  ] = useState(null);

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState(null);

  const ensureEngine =
    useCallback(
      async () => {
        if (
          typeof window ===
          "undefined"
        ) {
          throw new Error(
            "Web Audio is only available in the browser.",
          );
        }

        if (
          !contextRef.current
        ) {
          const AudioContextClass =
            window.AudioContext ??
            window.webkitAudioContext;

          if (
            !AudioContextClass
          ) {
            throw new Error(
              "This browser does not support the Web Audio API.",
            );
          }

          contextRef.current =
            new AudioContextClass();
        }

        const context =
          contextRef.current;

        /*
         * Resume immediately from
         * the user's button click.
         * This matters for browser
         * autoplay restrictions.
         */
        if (
          context.state ===
          "suspended"
        ) {
          await context.resume();
        }

        if (
          !engineRef.current
        ) {
          engineRef.current =
            new PolymeterEngine(
              context,
              {
                onVisualStep:
                  setVisualState,

                onStateChange:
                  setTransportState,

                onError:
                  (
                    nextError,
                  ) => {
                    setError(
                      nextError instanceof
                        Error
                        ? nextError.message
                        : "Polymeter playback failed.",
                    );
                  },
              },
            );
        }

        const engine =
          engineRef.current;

        engine.setConfig({
          bpm,
          lanes,
        });

        if (
          !samplesLoadedRef.current
        ) {
          setIsLoading(
            true,
          );

          try {
            await engine.loadSamples();

            samplesLoadedRef.current =
              true;
          } finally {
            setIsLoading(
              false,
            );
          }
        }

        return engine;
      },
      [
        bpm,
        lanes,
      ],
    );

  const play =
    useCallback(async () => {
      setError(null);

      try {
        const engine =
          await ensureEngine();

        engine.setConfig({
          bpm,
          lanes,
        });

        engine.play();
      } catch (nextError) {
        setError(
          nextError instanceof
            Error
            ? nextError.message
            : "Unable to start polymeter playback.",
        );

        setTransportState(
          "stopped",
        );
      }
    }, [
      bpm,
      ensureEngine,
      lanes,
    ]);

  const pause =
    useCallback(() => {
      engineRef.current
        ?.pause();
    }, []);

  const stop =
    useCallback(() => {
      engineRef.current
        ?.stop();

      setVisualState(
        null,
      );

      setTransportState(
        "stopped",
      );
    }, []);

  const restart =
    useCallback(async () => {
      setError(null);

      try {
        const engine =
          await ensureEngine();

        engine.setConfig({
          bpm,
          lanes,
        });

        engine.restart();
      } catch (nextError) {
        setError(
          nextError instanceof
            Error
            ? nextError.message
            : "Unable to restart polymeter playback.",
        );
      }
    }, [
      bpm,
      ensureEngine,
      lanes,
    ]);

  /*
   * Keep the live engine in sync
   * when BPM, patterns, mute state,
   * lane count, or instruments
   * change.
   */
  useEffect(() => {
    const engine =
      engineRef.current;

    if (!engine) {
      return;
    }

    try {
      engine.setConfig({
        bpm,
        lanes,
      });
    } catch (nextError) {
      setError(
        nextError instanceof
          Error
          ? nextError.message
          : "Unable to update polymeter configuration.",
      );
    }
  }, [
    bpm,
    lanes,
  ]);

  useEffect(() => {
    return () => {
      const engine =
        engineRef.current;

      const context =
        contextRef.current;

      engineRef.current =
        null;

      contextRef.current =
        null;

      samplesLoadedRef.current =
        false;

      engine?.dispose();

      if (
        context &&
        context.state !==
          "closed"
      ) {
        void context.close();
      }
    };
  }, []);

  return {
    transportState,
    visualState,
    isLoading,
    error,

    play,
    pause,
    stop,
    restart,
  };
}