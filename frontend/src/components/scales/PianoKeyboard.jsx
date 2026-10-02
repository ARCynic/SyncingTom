import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useScaleAudio,
} from "@/hooks/useScaleAudio.js";

const WHITE_KEYS = [
  {
    id: "c4",
    note: "C",
    rootValue: "C",
    pitchClass: 0,
    octave: 4,
  },
  {
    id: "d4",
    note: "D",
    rootValue: "D",
    pitchClass: 2,
    octave: 4,
  },
  {
    id: "e4",
    note: "E",
    rootValue: "E",
    pitchClass: 4,
    octave: 4,
  },
  {
    id: "f4",
    note: "F",
    rootValue: "F",
    pitchClass: 5,
    octave: 4,
  },
  {
    id: "g4",
    note: "G",
    rootValue: "G",
    pitchClass: 7,
    octave: 4,
  },
  {
    id: "a4",
    note: "A",
    rootValue: "A",
    pitchClass: 9,
    octave: 4,
  },
  {
    id: "b4",
    note: "B",
    rootValue: "B",
    pitchClass: 11,
    octave: 4,
  },
  {
    id: "c5",
    note: "C",
    rootValue: "C",
    pitchClass: 0,
    octave: 5,
  },
];

const BLACK_KEYS = [
  {
    id: "cs4",
    note: "C♯",
    rootValue: "C#",
    pitchClass: 1,
    octave: 4,
    left: "12.5%",
  },
  {
    id: "ds4",
    note: "D♯",
    rootValue: "D#",
    pitchClass: 3,
    octave: 4,
    left: "25%",
  },
  {
    id: "fs4",
    note: "F♯",
    rootValue: "F#",
    pitchClass: 6,
    octave: 4,
    left: "50%",
  },
  {
    id: "gs4",
    note: "G♯",
    rootValue: "G#",
    pitchClass: 8,
    octave: 4,
    left: "62.5%",
  },
  {
    id: "as4",
    note: "A♯",
    rootValue: "A#",
    pitchClass: 10,
    octave: 4,
    left: "75%",
  },
];

function getWhiteKeyStyle({
  isScaleTone,
  isRoot,
  isPressed,
}) {
  if (isPressed) {
    return {
      borderColor:
        "var(--scale-accent)",

      background:
        "color-mix(in srgb, var(--scale-accent) 35%, white)",

      color: "#071013",

      transform:
        "translateY(2px)",

      boxShadow:
        "inset 0 -4px 8px rgba(0,0,0,0.16)",
    };
  }

  if (isRoot) {
    return {
      borderColor:
        "color-mix(in srgb, var(--scale-accent) 65%, white)",

      background:
        "linear-gradient(to bottom, color-mix(in srgb, var(--scale-accent) 23%, white), color-mix(in srgb, var(--scale-accent) 12%, #d7d7d7))",

      color: "#071013",

      boxShadow:
        "0 0 18px color-mix(in srgb, var(--scale-accent) 12%, transparent), inset 0 -8px 15px rgba(0,0,0,0.1)",
    };
  }

  if (isScaleTone) {
    return {
      borderColor:
        "color-mix(in srgb, var(--scale-accent) 24%, rgba(0,0,0,0.25))",

      background:
        "linear-gradient(to bottom, color-mix(in srgb, var(--scale-accent) 6%, white), #d8d8d6)",

      color: "#111418",
    };
  }

  return {
    borderColor:
      "rgba(0,0,0,0.28)",

    background:
      "linear-gradient(to bottom, #f1f1ef, #cdcdcb)",

    color:
      "rgba(0,0,0,0.48)",
  };
}

function getBlackKeyStyle({
  isScaleTone,
  isRoot,
  isPressed,
}) {
  if (isPressed) {
    return {
      borderColor:
        "var(--scale-accent)",

      background:
        "color-mix(in srgb, var(--scale-accent) 58%, #060708)",

      color: "white",

      transform:
        "translate(-50%, 2px)",

      boxShadow:
        "0 0 18px color-mix(in srgb, var(--scale-accent) 25%, transparent)",
    };
  }

  if (isRoot) {
    return {
      borderColor:
        "color-mix(in srgb, var(--scale-accent) 65%, white)",

      background:
        "color-mix(in srgb, var(--scale-accent) 48%, #050607)",

      color: "white",

      transform:
        "translateX(-50%)",

      boxShadow:
        "0 0 20px color-mix(in srgb, var(--scale-accent) 20%, transparent)",
    };
  }

  if (isScaleTone) {
    return {
      borderColor:
        "color-mix(in srgb, var(--scale-accent) 35%, transparent)",

      background:
        "color-mix(in srgb, var(--scale-accent) 18%, #070809)",

      color:
        "rgba(255,255,255,0.88)",

      transform:
        "translateX(-50%)",
    };
  }

  return {
    borderColor:
      "rgba(255,255,255,0.08)",

    background:
      "linear-gradient(to bottom, #17191b, #050606)",

    color:
      "rgba(255,255,255,0.4)",

    transform:
      "translateX(-50%)",
  };
}

export function PianoKeyboard({
  activePitchClasses = [],
  rootPitchClass = 0,
  onRootChange,
}) {
  const [
    pressedKeyId,
    setPressedKeyId,
  ] = useState(null);

  const releaseTimerRef =
    useRef(null);

  const {
    error,
    playPitchClass,
  } = useScaleAudio({
    notes: [],
  });

  const activeSet =
    new Set(
      activePitchClasses,
    );

  function releasePressedKeyLater() {
    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }

    if (
      releaseTimerRef.current
    ) {
      window.clearTimeout(
        releaseTimerRef.current,
      );
    }

    releaseTimerRef.current =
      window.setTimeout(
        () => {
          setPressedKeyId(
            null,
          );

          releaseTimerRef.current =
            null;
        },
        160,
      );
  }

  function handleKeyPress(
    key,
  ) {
    setPressedKeyId(
      key.id,
    );

    onRootChange?.(
      key.rootValue,
    );

    void playPitchClass(
      key.pitchClass,
      key.octave,
    );

    releasePressedKeyLater();
  }

  useEffect(() => {
    return () => {
      if (
        releaseTimerRef.current &&
        typeof window !==
          "undefined"
      ) {
        window.clearTimeout(
          releaseTimerRef.current,
        );
      }
    };
  }, []);

  return (
    <div>
      <div
        className="
          overflow-x-auto
          px-2
          py-3
          sm:px-4
          sm:py-5
        "
      >
        <div
          className="
            relative
            mx-auto
            h-[210px]
            min-w-[600px]
            max-w-5xl
          "
        >
          {/* White keys */}
          <div
            className="
              absolute
              inset-0
              grid
              grid-cols-8
              overflow-hidden
              rounded-xl
              border
              border-white/10
              bg-black
              shadow-[0_20px_50px_rgba(0,0,0,0.38)]
            "
          >
            {WHITE_KEYS.map(
              (key) => {
                const isScaleTone =
                  activeSet.has(
                    key.pitchClass,
                  );

                const isRoot =
                  key.pitchClass ===
                  rootPitchClass;

                const isPressed =
                  pressedKeyId ===
                  key.id;

                return (
                  <button
                    key={key.id}
                    type="button"
                    onClick={() =>
                      handleKeyPress(
                        key,
                      )
                    }
                    aria-label={`Select ${key.note} as root and play ${key.note}${key.octave}`}
                    aria-pressed={
                      isRoot
                    }
                    className="
                      relative
                      flex
                      items-end
                      justify-center
                      border-r
                      pb-4
                      outline-none
                      transition-[background,border-color,box-shadow,transform]
                      duration-100
                      last:border-r-0
                      focus-visible:z-20
                      focus-visible:ring-2
                      focus-visible:ring-inset
                      focus-visible:ring-cyan-400
                    "
                    style={
                      getWhiteKeyStyle({
                        isScaleTone,
                        isRoot,
                        isPressed,
                      })
                    }
                  >
                    <span
                      className="
                        pointer-events-none
                        text-xs
                        font-bold
                      "
                    >
                      {key.note}
                    </span>
                  </button>
                );
              },
            )}
          </div>

          {/* Black keys */}
          {BLACK_KEYS.map(
            (key) => {
              const isScaleTone =
                activeSet.has(
                  key.pitchClass,
                );

              const isRoot =
                key.pitchClass ===
                rootPitchClass;

              const isPressed =
                pressedKeyId ===
                key.id;

              return (
                <button
                  key={key.id}
                  type="button"
                  onClick={() =>
                    handleKeyPress(
                      key,
                    )
                  }
                  aria-label={`Select ${key.note} as root and play ${key.note}${key.octave}`}
                  aria-pressed={
                    isRoot
                  }
                  className="
                    absolute
                    top-0
                    z-10
                    flex
                    h-[62%]
                    w-[7.4%]
                    items-end
                    justify-center
                    rounded-b-lg
                    border
                    pb-3
                    outline-none
                    transition-[background,border-color,box-shadow,transform]
                    duration-100
                    focus-visible:z-20
                    focus-visible:ring-2
                    focus-visible:ring-cyan-400
                  "
                  style={{
                    left:
                      key.left,

                    ...getBlackKeyStyle({
                      isScaleTone,
                      isRoot,
                      isPressed,
                    }),
                  }}
                >
                  <span
                    className="
                      pointer-events-none
                      text-[10px]
                      font-bold
                    "
                  >
                    {key.note}
                  </span>
                </button>
              );
            },
          )}
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="
            mt-2
            text-center
            text-xs
            text-rose-300/80
          "
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}