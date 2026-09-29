import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ScalePlayer,
} from "@/lib/audio/ScalePlayer.js";

import {
  DEFAULT_SCALE_INSTRUMENT_ID,
  isScaleInstrumentId,
} from "@/lib/audio/instruments/instrumentRegistry.js";

import {
  buildAscendingMidiSequence,
  DEFAULT_AUDITION_OCTAVE,
  midiToFrequency,
  midiToPitchClass,
  pitchClassToMidi,
} from "@/lib/music/pitch.js";

export function useScaleAudio({
  notes,
}) {
  const contextRef =
    useRef(null);

  const playerRef =
    useRef(null);

  const visualTimerIdsRef =
    useRef(
      new Set(),
    );

  const [
    instrumentId,
    setInstrumentIdState,
  ] = useState(
    DEFAULT_SCALE_INSTRUMENT_ID,
  );

  const [
    transportState,
    setTransportState,
  ] = useState(
    "stopped",
  );

  const [
    playbackPitchClass,
    setPlaybackPitchClass,
  ] = useState(null);

  const [
    error,
    setError,
  ] = useState(null);

  const clearVisualTimers =
    useCallback(() => {
      if (
        typeof window !==
        "undefined"
      ) {
        for (
          const timerId of
          visualTimerIdsRef.current
        ) {
          window.clearTimeout(
            timerId,
          );
        }
      }

      visualTimerIdsRef.current.clear();
    }, []);

  const resetPlaybackVisual =
    useCallback(() => {
      clearVisualTimers();

      setPlaybackPitchClass(
        null,
      );
    }, [
      clearVisualTimers,
    ]);

  const ensureAudioContext =
    useCallback(async () => {
      if (
        !contextRef.current
      ) {
        if (
          typeof window ===
          "undefined"
        ) {
          throw new Error(
            "Web Audio is only available in the browser.",
          );
        }

        const AudioContextClass =
          window.AudioContext ??
          window.webkitAudioContext;

        if (!AudioContextClass) {
          throw new Error(
            "This browser does not support the Web Audio API.",
          );
        }

        contextRef.current =
          new AudioContextClass();
      }

      const context =
        contextRef.current;

      if (
        context.state ===
        "suspended"
      ) {
        await context.resume();
      }

      if (
        context.state !==
        "running"
      ) {
        throw new Error(
          "Audio could not be started.",
        );
      }

      return context;
    }, []);

  const getPlayer =
    useCallback(async () => {
      const context =
        await ensureAudioContext();

      if (
        !playerRef.current
      ) {
        playerRef.current =
          new ScalePlayer(
            context,
            {
              instrumentId,
            },
          );
      }

      return playerRef.current;
    }, [
      ensureAudioContext,
      instrumentId,
    ]);

  const scheduleVisualEvent =
    useCallback(
      (
        callback,
        audioTime,
      ) => {
        const context =
          contextRef.current;

        if (
          !context ||
          typeof window ===
            "undefined"
        ) {
          return;
        }

        const delayMs =
          Math.max(
            0,
            (
              audioTime -
              context.currentTime
            ) *
              1000,
          );

        const timerId =
          window.setTimeout(
            () => {
              visualTimerIdsRef.current.delete(
                timerId,
              );

              callback();
            },
            delayMs,
          );

        visualTimerIdsRef.current.add(
          timerId,
        );
      },
      [],
    );

  const playPitchClass =
    useCallback(
      async (
        pitchClass,
        octave =
          DEFAULT_AUDITION_OCTAVE,
      ) => {
        setError(null);

        try {
          const player =
            await getPlayer();

          const midi =
            pitchClassToMidi(
              pitchClass,
              octave,
            );

          const frequency =
            midiToFrequency(
              midi,
            );

          player.playNote(
            frequency,
          );
        } catch (
          nextError
        ) {
          setError(
            nextError instanceof
              Error
              ? nextError.message
              : "Unable to play note.",
          );
        }
      },
      [
        getPlayer,
      ],
    );

  const playScale =
    useCallback(async () => {
      setError(null);

      try {
        const player =
          await getPlayer();

        const context =
          contextRef.current;

        if (!context) {
          throw new Error(
            "Audio context is unavailable.",
          );
        }

        resetPlaybackVisual();

        const midiSequence =
          buildAscendingMidiSequence(
            notes,
            DEFAULT_AUDITION_OCTAVE,
            {
              repeatRootAtOctave:
                true,
            },
          );

        const frequencies =
          midiSequence.map(
            (midi) =>
              midiToFrequency(
                midi,
              ),
          );

        const playback =
          player.playSequence(
            frequencies,
          );

        setTransportState(
          "playing",
        );

        /*
         * Synchronize each React
         * highlight with the exact
         * Web Audio time at which
         * its note was scheduled.
         */
        for (
          const event of
          playback.events
        ) {
          const midi =
            midiSequence[
              event.index
            ];

          if (
            !Number.isInteger(
              midi,
            )
          ) {
            continue;
          }

          const pitchClass =
            midiToPitchClass(
              midi,
            );

          scheduleVisualEvent(
            () => {
              setPlaybackPitchClass(
                pitchClass,
              );
            },
            event.time,
          );
        }

        /*
         * Stop highlighting after
         * the audible duration of
         * the final scheduled note.
         */
        const finalEvent =
          playback.events[
            playback.events.length -
              1
          ];

        if (finalEvent) {
          scheduleVisualEvent(
            () => {
              setPlaybackPitchClass(
                null,
              );
            },
            finalEvent.time +
              finalEvent.duration,
          );
        }

        /*
         * Transport completes after
         * the instrument's release
         * has had time to settle.
         */
        scheduleVisualEvent(
          () => {
            setPlaybackPitchClass(
              null,
            );

            setTransportState(
              "stopped",
            );
          },
          playback.endTime,
        );
      } catch (
        nextError
      ) {
        resetPlaybackVisual();

        setTransportState(
          "stopped",
        );

        setError(
          nextError instanceof
            Error
            ? nextError.message
            : "Unable to play scale.",
        );
      }
    }, [
      getPlayer,
      notes,
      resetPlaybackVisual,
      scheduleVisualEvent,
    ]);

  const stop =
    useCallback(() => {
      resetPlaybackVisual();

      playerRef.current?.stop();

      setTransportState(
        "stopped",
      );
    }, [
      resetPlaybackVisual,
    ]);

  const setInstrumentId =
    useCallback(
      (nextInstrumentId) => {
        if (
          !isScaleInstrumentId(
            nextInstrumentId,
          )
        ) {
          setError(
            `Unknown instrument: ${nextInstrumentId}`,
          );

          return;
        }

        resetPlaybackVisual();

        playerRef.current
          ?.setInstrument(
            nextInstrumentId,
          );

        setInstrumentIdState(
          nextInstrumentId,
        );

        setTransportState(
          "stopped",
        );

        setError(null);
      },
      [
        resetPlaybackVisual,
      ],
    );

  useEffect(() => {
    return () => {
      clearVisualTimers();

      const player =
        playerRef.current;

      const context =
        contextRef.current;

      playerRef.current =
        null;

      contextRef.current =
        null;

      player?.dispose();

      if (
        context &&
        context.state !==
          "closed"
      ) {
        void context.close();
      }
    };
  }, [
    clearVisualTimers,
  ]);

  return {
    instrumentId,
    transportState,
    playbackPitchClass,
    error,

    playPitchClass,
    playScale,
    stop,

    setInstrumentId,
  };
}