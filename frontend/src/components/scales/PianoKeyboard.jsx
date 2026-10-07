// import {
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// import {
//   useScaleAudio,
// } from "@/hooks/useScaleAudio.js";

// const WHITE_KEYS = [
//   {
//     id: "c4",
//     note: "C",
//     rootValue: "C",
//     pitchClass: 0,
//     octave: 4,
//   },
//   {
//     id: "d4",
//     note: "D",
//     rootValue: "D",
//     pitchClass: 2,
//     octave: 4,
//   },
//   {
//     id: "e4",
//     note: "E",
//     rootValue: "E",
//     pitchClass: 4,
//     octave: 4,
//   },
//   {
//     id: "f4",
//     note: "F",
//     rootValue: "F",
//     pitchClass: 5,
//     octave: 4,
//   },
//   {
//     id: "g4",
//     note: "G",
//     rootValue: "G",
//     pitchClass: 7,
//     octave: 4,
//   },
//   {
//     id: "a4",
//     note: "A",
//     rootValue: "A",
//     pitchClass: 9,
//     octave: 4,
//   },
//   {
//     id: "b4",
//     note: "B",
//     rootValue: "B",
//     pitchClass: 11,
//     octave: 4,
//   },
//   {
//     id: "c5",
//     note: "C",
//     rootValue: "C",
//     pitchClass: 0,
//     octave: 5,
//   },
// ];

// const BLACK_KEYS = [
//   {
//     id: "cs4",
//     note: "C♯",
//     rootValue: "C#",
//     pitchClass: 1,
//     octave: 4,
//     left: "12.5%",
//   },
//   {
//     id: "ds4",
//     note: "D♯",
//     rootValue: "D#",
//     pitchClass: 3,
//     octave: 4,
//     left: "25%",
//   },
//   {
//     id: "fs4",
//     note: "F♯",
//     rootValue: "F#",
//     pitchClass: 6,
//     octave: 4,
//     left: "50%",
//   },
//   {
//     id: "gs4",
//     note: "G♯",
//     rootValue: "G#",
//     pitchClass: 8,
//     octave: 4,
//     left: "62.5%",
//   },
//   {
//     id: "as4",
//     note: "A♯",
//     rootValue: "A#",
//     pitchClass: 10,
//     octave: 4,
//     left: "75%",
//   },
// ];

// function getWhiteAccentOpacity({
//   isScaleTone,
//   isRoot,
//   isPressed,
// }) {
//   if (isPressed) {
//     return 0.34;
//   }

//   if (isRoot) {
//     return 0.22;
//   }

//   if (isScaleTone) {
//     return 0.09;
//   }

//   return 0;
// }

// function getBlackAccentOpacity({
//   isScaleTone,
//   isRoot,
//   isPressed,
// }) {
//   if (isPressed) {
//     return 0.5;
//   }

//   if (isRoot) {
//     return 0.32;
//   }

//   if (isScaleTone) {
//     return 0.15;
//   }

//   return 0;
// }

// function getWhiteBorderColor({
//   isScaleTone,
//   isRoot,
//   isPressed,
// }) {
//   if (isPressed) {
//     return "color-mix(in srgb, var(--scale-accent) 75%, rgba(0,0,0,0.20))";
//   }

//   if (isRoot) {
//     return "color-mix(in srgb, var(--scale-accent) 52%, rgba(0,0,0,0.20))";
//   }

//   if (isScaleTone) {
//     return "color-mix(in srgb, var(--scale-accent) 22%, rgba(0,0,0,0.20))";
//   }

//   return "rgba(0,0,0,0.20)";
// }

// function getBlackBorderColor({
//   isScaleTone,
//   isRoot,
//   isPressed,
// }) {
//   if (isPressed) {
//     return "color-mix(in srgb, var(--scale-accent) 78%, rgba(255,255,255,0.10))";
//   }

//   if (isRoot) {
//     return "color-mix(in srgb, var(--scale-accent) 58%, rgba(255,255,255,0.10))";
//   }

//   if (isScaleTone) {
//     return "color-mix(in srgb, var(--scale-accent) 28%, rgba(255,255,255,0.08))";
//   }

//   return "rgba(255,255,255,0.08)";
// }

// export function PianoKeyboard({
//   activePitchClasses = [],
//   rootPitchClass = 0,
//   onRootChange,
// }) {
//   const [
//     pressedKeyId,
//     setPressedKeyId,
//   ] = useState(null);

//   const releaseTimerRef =
//     useRef(null);

//   const {
//     error,
//     playPitchClass,
//   } = useScaleAudio({
//     notes: [],
//   });

//   const activeSet =
//     useMemo(
//       () =>
//         new Set(
//           activePitchClasses,
//         ),
//       [
//         activePitchClasses,
//       ],
//     );

//   function releasePressedKeyLater() {
//     if (
//       typeof window ===
//       "undefined"
//     ) {
//       return;
//     }

//     if (
//       releaseTimerRef.current
//     ) {
//       window.clearTimeout(
//         releaseTimerRef.current,
//       );
//     }

//     releaseTimerRef.current =
//       window.setTimeout(
//         () => {
//           setPressedKeyId(
//             null,
//           );

//           releaseTimerRef.current =
//             null;
//         },
//         120,
//       );
//   }

//   function handleKeyPress(
//     key,
//   ) {
//     setPressedKeyId(
//       key.id,
//     );

//     onRootChange?.(
//       key.rootValue,
//     );

//     void playPitchClass(
//       key.pitchClass,
//       key.octave,
//     );

//     releasePressedKeyLater();
//   }

//   function handleKeyboardClick(
//     event,
//     key,
//   ) {
//     /*
//      * Pointer interactions are handled
//      * on pointer-down for immediate
//      * tactile/audio response.
//      *
//      * Keyboard-generated button clicks
//      * have detail === 0.
//      */
//     if (
//       event.detail === 0
//     ) {
//       handleKeyPress(
//         key,
//       );
//     }
//   }

//   useEffect(() => {
//     return () => {
//       if (
//         releaseTimerRef.current &&
//         typeof window !==
//           "undefined"
//       ) {
//         window.clearTimeout(
//           releaseTimerRef.current,
//         );
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <div
//         className="
//           overflow-x-auto
//           px-2
//           py-3
//           sm:px-4
//           sm:py-5
//         "
//       >
//         <div
//           className="
//             relative
//             mx-auto
//             h-[210px]
//             min-w-[600px]
//             max-w-5xl
//           "
//         >
//           {/* White keys */}

//           <div
//             className="
//               absolute
//               inset-0
//               grid
//               grid-cols-8
//               overflow-hidden
//               rounded-xl
//               border
//               border-white/[0.08]
//               bg-black
//               shadow-[0_18px_45px_rgba(0,0,0,0.32)]
//             "
//           >
//             {WHITE_KEYS.map(
//               (key) => {
//                 const isScaleTone =
//                   activeSet.has(
//                     key.pitchClass,
//                   );

//                 const isRoot =
//                   key.pitchClass ===
//                   rootPitchClass;

//                 const isPressed =
//                   pressedKeyId ===
//                   key.id;

//                 const accentOpacity =
//                   getWhiteAccentOpacity({
//                     isScaleTone,
//                     isRoot,
//                     isPressed,
//                   });

//                 return (
//                   <button
//                     key={
//                       key.id
//                     }
//                     type="button"
//                     onPointerDown={() =>
//                       handleKeyPress(
//                         key,
//                       )
//                     }
//                     onClick={(
//                       event,
//                     ) =>
//                       handleKeyboardClick(
//                         event,
//                         key,
//                       )
//                     }
//                     aria-label={`Select ${key.note} as root and play ${key.note}${key.octave}`}
//                     aria-pressed={
//                       isRoot
//                     }
//                     className={`
//                       relative
//                       flex
//                       select-none
//                       items-end
//                       justify-center
//                       overflow-hidden
//                       border-r
//                       pb-4
//                       outline-none
//                       touch-manipulation
//                       transition-[transform,border-color]
//                       duration-[75ms]
//                       ease-out
//                       last:border-r-0
//                       focus-visible:z-20
//                       focus-visible:ring-2
//                       focus-visible:ring-inset
//                       focus-visible:ring-[var(--scale-accent)]
//                       ${
//                         isPressed
//                           ? "translate-y-[2px]"
//                           : ""
//                       }
//                     `}
//                     style={{
//                       borderColor:
//                         getWhiteBorderColor({
//                           isScaleTone,
//                           isRoot,
//                           isPressed,
//                         }),

//                       background:
//                         "linear-gradient(180deg, #f7f7f4 0%, #eeeeea 58%, #d5d5cf 100%)",
//                     }}
//                   >
//                     {/* Accent tint */}

//                     <span
//                       aria-hidden="true"
//                       className="
//                         pointer-events-none
//                         absolute
//                         inset-0
//                         transition-opacity
//                         duration-[110ms]
//                         ease-out
//                       "
//                       style={{
//                         backgroundColor:
//                           "var(--scale-accent)",

//                         opacity:
//                           accentOpacity,
//                       }}
//                     />

//                     {/* Soft upper highlight */}

//                     <span
//                       aria-hidden="true"
//                       className="
//                         pointer-events-none
//                         absolute
//                         inset-x-0
//                         top-0
//                         h-px
//                         bg-white/90
//                       "
//                     />

//                     {/* Root marker */}

//                     <span
//                       aria-hidden="true"
//                       className="
//                         pointer-events-none
//                         absolute
//                         bottom-9
//                         h-1
//                         w-5
//                         rounded-full
//                         transition-opacity
//                         duration-[110ms]
//                       "
//                       style={{
//                         backgroundColor:
//                           "var(--scale-accent)",

//                         opacity:
//                           isRoot
//                             ? 0.85
//                             : 0,
//                       }}
//                     />

//                     <span
//                       className={`
//                         pointer-events-none
//                         relative
//                         z-10
//                         text-xs
//                         font-bold
//                         transition-colors
//                         duration-[110ms]
//                         ${
//                           isRoot ||
//                           isPressed
//                             ? "text-black/90"
//                             : isScaleTone
//                               ? "text-black/70"
//                               : "text-black/45"
//                         }
//                       `}
//                     >
//                       {
//                         key.note
//                       }
//                     </span>
//                   </button>
//                 );
//               },
//             )}
//           </div>

//           {/* Black keys */}

//           {BLACK_KEYS.map(
//             (key) => {
//               const isScaleTone =
//                 activeSet.has(
//                   key.pitchClass,
//                 );

//               const isRoot =
//                 key.pitchClass ===
//                 rootPitchClass;

//               const isPressed =
//                 pressedKeyId ===
//                 key.id;

//               const accentOpacity =
//                 getBlackAccentOpacity({
//                   isScaleTone,
//                   isRoot,
//                   isPressed,
//                 });

//               return (
//                 <button
//                   key={
//                     key.id
//                   }
//                   type="button"
//                   onPointerDown={() =>
//                     handleKeyPress(
//                       key,
//                     )
//                   }
//                   onClick={(
//                     event,
//                   ) =>
//                     handleKeyboardClick(
//                       event,
//                       key,
//                     )
//                   }
//                   aria-label={`Select ${key.note} as root and play ${key.note}${key.octave}`}
//                   aria-pressed={
//                     isRoot
//                   }
//                   className={`
//                     absolute
//                     top-0
//                     z-10
//                     flex
//                     h-[62%]
//                     w-[7.4%]
//                     select-none
//                     items-end
//                     justify-center
//                     overflow-hidden
//                     rounded-b-lg
//                     border
//                     pb-3
//                     outline-none
//                     touch-manipulation
//                     transition-[transform,border-color]
//                     duration-[75ms]
//                     ease-out
//                     focus-visible:z-20
//                     focus-visible:ring-2
//                     focus-visible:ring-[var(--scale-accent)]
//                     ${
//                       isPressed
//                         ? "-translate-x-1/2 translate-y-[2px]"
//                         : "-translate-x-1/2"
//                     }
//                   `}
//                   style={{
//                     left:
//                       key.left,

//                     borderColor:
//                       getBlackBorderColor({
//                         isScaleTone,
//                         isRoot,
//                         isPressed,
//                       }),

//                     background:
//                       "linear-gradient(180deg, #25272a 0%, #111214 48%, #050607 100%)",
//                   }}
//                 >
//                   {/* Accent tint */}

//                   <span
//                     aria-hidden="true"
//                     className="
//                       pointer-events-none
//                       absolute
//                       inset-0
//                       transition-opacity
//                       duration-[110ms]
//                       ease-out
//                     "
//                     style={{
//                       backgroundColor:
//                         "var(--scale-accent)",

//                       opacity:
//                         accentOpacity,
//                     }}
//                   />

//                   {/* Edge highlight */}

//                   <span
//                     aria-hidden="true"
//                     className="
//                       pointer-events-none
//                       absolute
//                       inset-x-1
//                       top-0
//                       h-px
//                       bg-white/15
//                     "
//                   />

//                   {/* Root marker */}

//                   <span
//                     aria-hidden="true"
//                     className="
//                       pointer-events-none
//                       absolute
//                       bottom-8
//                       h-1
//                       w-4
//                       rounded-full
//                       transition-opacity
//                       duration-[110ms]
//                     "
//                     style={{
//                       backgroundColor:
//                         "var(--scale-accent)",

//                       opacity:
//                         isRoot
//                           ? 0.95
//                           : 0,
//                     }}
//                   />

//                   <span
//                     className={`
//                       pointer-events-none
//                       relative
//                       z-10
//                       text-[10px]
//                       font-bold
//                       transition-colors
//                       duration-[110ms]
//                       ${
//                         isRoot ||
//                         isPressed
//                           ? "text-white"
//                           : isScaleTone
//                             ? "text-white/80"
//                             : "text-white/40"
//                       }
//                     `}
//                   >
//                     {
//                       key.note
//                     }
//                   </span>
//                 </button>
//               );
//             },
//           )}
//         </div>
//       </div>

//       {error ? (
//         <p
//           role="alert"
//           className="
//             mt-2
//             text-center
//             text-xs
//             text-rose-300/80
//           "
//         >
//           {error}
//         </p>
//       ) : null}
//     </div>
//   );
// }

// import {
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// import {
//   useScaleAudio,
// } from "@/hooks/useScaleAudio.js";

// const WHITE_KEYS = [
//   {
//     id: "c4",
//     note: "C",
//     rootValue: "C",
//     pitchClass: 0,
//     octave: 4,
//   },
//   {
//     id: "d4",
//     note: "D",
//     rootValue: "D",
//     pitchClass: 2,
//     octave: 4,
//   },
//   {
//     id: "e4",
//     note: "E",
//     rootValue: "E",
//     pitchClass: 4,
//     octave: 4,
//   },
//   {
//     id: "f4",
//     note: "F",
//     rootValue: "F",
//     pitchClass: 5,
//     octave: 4,
//   },
//   {
//     id: "g4",
//     note: "G",
//     rootValue: "G",
//     pitchClass: 7,
//     octave: 4,
//   },
//   {
//     id: "a4",
//     note: "A",
//     rootValue: "A",
//     pitchClass: 9,
//     octave: 4,
//   },
//   {
//     id: "b4",
//     note: "B",
//     rootValue: "B",
//     pitchClass: 11,
//     octave: 4,
//   },
//   {
//     id: "c5",
//     note: "C",
//     rootValue: "C",
//     pitchClass: 0,
//     octave: 5,
//   },
// ];

// const BLACK_KEYS = [
//   {
//     id: "cs4",
//     note: "C♯",
//     rootValue: "C#",
//     pitchClass: 1,
//     octave: 4,
//     left: "12.5%",
//   },
//   {
//     id: "ds4",
//     note: "D♯",
//     rootValue: "D#",
//     pitchClass: 3,
//     octave: 4,
//     left: "25%",
//   },
//   {
//     id: "fs4",
//     note: "F♯",
//     rootValue: "F#",
//     pitchClass: 6,
//     octave: 4,
//     left: "50%",
//   },
//   {
//     id: "gs4",
//     note: "G♯",
//     rootValue: "G#",
//     pitchClass: 8,
//     octave: 4,
//     left: "62.5%",
//   },
//   {
//     id: "as4",
//     note: "A♯",
//     rootValue: "A#",
//     pitchClass: 10,
//     octave: 4,
//     left: "75%",
//   },
// ];

// export function PianoKeyboard({
//   activePitchClasses = [],
//   rootPitchClass = 0,
//   onRootChange,
// }) {
//   const [
//     pressedKeyId,
//     setPressedKeyId,
//   ] = useState(null);

//   const releaseTimerRef =
//     useRef(null);

//   const {
//     error,
//     playPitchClass,
//   } = useScaleAudio({
//     notes: [],
//   });

//   const activeSet =
//     useMemo(
//       () =>
//         new Set(
//           activePitchClasses,
//         ),
//       [
//         activePitchClasses,
//       ],
//     );

//   function releasePressedKeyLater() {
//     if (
//       typeof window ===
//       "undefined"
//     ) {
//       return;
//     }

//     if (
//       releaseTimerRef.current
//     ) {
//       window.clearTimeout(
//         releaseTimerRef.current,
//       );
//     }

//     releaseTimerRef.current =
//       window.setTimeout(
//         () => {
//           setPressedKeyId(
//             null,
//           );

//           releaseTimerRef.current =
//             null;
//         },
//         150,
//       );
//   }

//   function handleKeyPress(
//     key,
//   ) {
//     setPressedKeyId(
//       key.id,
//     );

//     onRootChange?.(
//       key.rootValue,
//     );

//     void playPitchClass(
//       key.pitchClass,
//       key.octave,
//     );

//     releasePressedKeyLater();
//   }

//   function handleKeyboardClick(
//     event,
//     key,
//   ) {
//     /*
//      * Keyboard-generated button
//      * clicks have detail === 0.
//      *
//      * Pointer interactions are
//      * already handled on pointer-down.
//      */
//     if (
//       event.detail === 0
//     ) {
//       handleKeyPress(
//         key,
//       );
//     }
//   }

//   useEffect(() => {
//     return () => {
//       if (
//         releaseTimerRef.current &&
//         typeof window !==
//           "undefined"
//       ) {
//         window.clearTimeout(
//           releaseTimerRef.current,
//         );
//       }
//     };
//   }, []);

//   return (
//     <div
//       className="
//         w-full
//       "
//     >
//       <div
//         className="
//           overflow-x-auto
//           px-2
//           py-4
//           sm:px-4
//           sm:py-6
//         "
//       >
//         <div
//           className="
//             relative
//             mx-auto
//             h-[220px]
//             min-w-[600px]
//             max-w-5xl
//             rounded-xl
//             bg-black
//             p-1
//             shadow-[0_20px_50px_rgba(0,0,0,0.5)]
//             ring-1
//             ring-white/10
//           "
//         >
//           {/* WHITE KEYS */}

//           <div
//             className="
//               relative
//               grid
//               h-full
//               w-full
//               grid-cols-8
//               overflow-hidden
//               rounded-lg
//               bg-neutral-900
//             "
//           >
//             {WHITE_KEYS.map(
//               (key) => {
//                 const isScaleTone =
//                   activeSet.has(
//                     key.pitchClass,
//                   );

//                 const isRoot =
//                   key.pitchClass ===
//                   rootPitchClass;

//                 const isPressed =
//                   pressedKeyId ===
//                   key.id;

//                 return (
//                   <button
//                     key={
//                       key.id
//                     }
//                     type="button"
//                     onPointerDown={() =>
//                       handleKeyPress(
//                         key,
//                       )
//                     }
//                     onClick={(
//                       event,
//                     ) =>
//                       handleKeyboardClick(
//                         event,
//                         key,
//                       )
//                     }
//                     aria-label={`Select ${key.note} as root and play ${key.note}${key.octave}`}
//                     aria-pressed={
//                       isRoot
//                     }
//                     className="
//                       group
//                       relative
//                       flex
//                       select-none
//                       items-end
//                       justify-center
//                       border-r
//                       border-neutral-300/40
//                       outline-none
//                       touch-manipulation
//                       transition-[transform,border-color]
//                       duration-[70ms]
//                       ease-out
//                       last:border-r-0
//                       focus-visible:z-20
//                       focus-visible:ring-2
//                       focus-visible:ring-inset
//                       focus-visible:ring-[var(--scale-accent)]
//                     "
//                     style={{
//                       background:
//                         "linear-gradient(180deg, #ffffff 0%, #f3f4f6 100%)",

//                       boxShadow:
//                         "inset 0 -6px 0 rgba(0,0,0,0.12), inset 0 -7px 4px rgba(0,0,0,0.05)",

//                       transform:
//                         isPressed
//                           ? "translateY(2px)"
//                           : "translateY(0)",
//                     }}
//                   >
//                     {/* Scale accent */}

//                     <span
//                       aria-hidden="true"
//                       className="
//                         absolute
//                         inset-0
//                         transition-opacity
//                         duration-100
//                         ease-out
//                       "
//                       style={{
//                         backgroundColor:
//                           "var(--scale-accent)",

//                         opacity:
//                           isPressed
//                             ? 0.28
//                             : isRoot
//                               ? 0.18
//                               : isScaleTone
//                                 ? 0.07
//                                 : 0,
//                       }}
//                     />

//                     {/* Root marker */}

//                     <span
//                       aria-hidden="true"
//                       className="
//                         absolute
//                         bottom-9
//                         h-[3px]
//                         w-4
//                         rounded-full
//                         transition-opacity
//                         duration-100
//                       "
//                       style={{
//                         backgroundColor:
//                           "var(--scale-accent)",

//                         boxShadow:
//                           "0 0 8px var(--scale-accent)",

//                         opacity:
//                           isRoot
//                             ? 1
//                             : 0,
//                       }}
//                     />

//                     {/* Note label */}

//                     <span
//                       className={`
//                         relative
//                         z-10
//                         mb-4
//                         font-mono
//                         text-[10px]
//                         font-bold
//                         tracking-widest
//                         transition-colors
//                         duration-100

//                         ${
//                           isRoot ||
//                           isPressed
//                             ? "text-neutral-800"
//                             : isScaleTone
//                               ? "text-neutral-500"
//                               : "text-neutral-300"
//                         }
//                       `}
//                     >
//                       {
//                         key.note
//                       }
//                     </span>
//                   </button>
//                 );
//               },
//             )}
//           </div>

//           {/* BLACK KEYS */}

//           {BLACK_KEYS.map(
//             (key) => {
//               const isScaleTone =
//                 activeSet.has(
//                   key.pitchClass,
//                 );

//               const isRoot =
//                 key.pitchClass ===
//                 rootPitchClass;

//               const isPressed =
//                 pressedKeyId ===
//                 key.id;

//               return (
//                 <button
//                   key={
//                     key.id
//                   }
//                   type="button"
//                   onPointerDown={() =>
//                     handleKeyPress(
//                       key,
//                     )
//                   }
//                   onClick={(
//                     event,
//                   ) =>
//                     handleKeyboardClick(
//                       event,
//                       key,
//                     )
//                   }
//                   aria-label={`Select ${key.note} as root and play ${key.note}${key.octave}`}
//                   aria-pressed={
//                     isRoot
//                   }
//                   className="
//                     group
//                     absolute
//                     top-1
//                     z-10
//                     flex
//                     h-[60%]
//                     w-[7.5%]
//                     select-none
//                     items-end
//                     justify-center
//                     rounded-b-md
//                     outline-none
//                     touch-manipulation
//                     transition-transform
//                     duration-[70ms]
//                     ease-out
//                     focus-visible:z-20
//                     focus-visible:ring-2
//                     focus-visible:ring-[var(--scale-accent)]
//                   "
//                   style={{
//                     left:
//                       key.left,

//                     transform:
//                       isPressed
//                         ? "translateX(-50%) translateY(2px)"
//                         : "translateX(-50%) translateY(0)",

//                     background:
//                       "linear-gradient(180deg, #2a2a2a 0%, #171717 80%, #0a0a0a 100%)",

//                     boxShadow:
//                       "inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -4px 0 rgba(0,0,0,0.8), 0 8px 12px rgba(0,0,0,0.5)",
//                   }}
//                 >
//                   {/* Scale accent */}

//                   <span
//                     aria-hidden="true"
//                     className="
//                       absolute
//                       inset-0
//                       rounded-b-md
//                       transition-opacity
//                       duration-100
//                       ease-out
//                     "
//                     style={{
//                       background:
//                         "linear-gradient(180deg, transparent 40%, var(--scale-accent) 100%)",

//                       opacity:
//                         isPressed
//                           ? 0.35
//                           : isRoot
//                             ? 0.25
//                             : isScaleTone
//                               ? 0.12
//                               : 0,
//                     }}
//                   />

//                   {/* Root marker */}

//                   <span
//                     aria-hidden="true"
//                     className="
//                       absolute
//                       bottom-7
//                       h-[3px]
//                       w-4
//                       rounded-full
//                       transition-opacity
//                       duration-100
//                     "
//                     style={{
//                       backgroundColor:
//                         "var(--scale-accent)",

//                       boxShadow:
//                         "0 0 8px var(--scale-accent)",

//                       opacity:
//                         isRoot
//                           ? 1
//                           : 0,
//                     }}
//                   />

//                   {/* Note label */}

//                   <span
//                     className={`
//                       relative
//                       z-10
//                       mb-2
//                       font-mono
//                       text-[9px]
//                       font-bold
//                       tracking-widest
//                       transition-colors
//                       duration-100

//                       ${
//                         isRoot ||
//                         isPressed
//                           ? "text-white"
//                           : isScaleTone
//                             ? "text-white/70"
//                             : "text-white/30"
//                       }
//                     `}
//                   >
//                     {
//                       key.note
//                     }
//                   </span>
//                 </button>
//               );
//             },
//           )}
//         </div>
//       </div>

//       {error ? (
//         <p
//           role="alert"
//           className="
//             mt-2
//             text-center
//             text-xs
//             font-medium
//             tracking-wide
//             text-rose-400/90
//           "
//         >
//           {error}
//         </p>
//       ) : null}
//     </div>
//   );
// }

import { useEffect, useMemo, useRef, useState } from "react";
import { useScaleAudio } from "@/hooks/useScaleAudio.js";

const WHITE_KEYS = [
  { id: "c4", note: "C", rootValue: "C", pitchClass: 0, octave: 4 },
  { id: "d4", note: "D", rootValue: "D", pitchClass: 2, octave: 4 },
  { id: "e4", note: "E", rootValue: "E", pitchClass: 4, octave: 4 },
  { id: "f4", note: "F", rootValue: "F", pitchClass: 5, octave: 4 },
  { id: "g4", note: "G", rootValue: "G", pitchClass: 7, octave: 4 },
  { id: "a4", note: "A", rootValue: "A", pitchClass: 9, octave: 4 },
  { id: "b4", note: "B", rootValue: "B", pitchClass: 11, octave: 4 },
  { id: "c5", note: "C", rootValue: "C", pitchClass: 0, octave: 5 },
];

const BLACK_KEYS = [
  { id: "cs4", note: "C♯", rootValue: "C#", pitchClass: 1, octave: 4, left: "12.5%" },
  { id: "ds4", note: "D♯", rootValue: "D#", pitchClass: 3, octave: 4, left: "25%" },
  { id: "fs4", note: "F♯", rootValue: "F#", pitchClass: 6, octave: 4, left: "50%" },
  { id: "gs4", note: "G♯", rootValue: "G#", pitchClass: 8, octave: 4, left: "62.5%" },
  { id: "as4", note: "A♯", rootValue: "A#", pitchClass: 10, octave: 4, left: "75%" },
];

export function PianoKeyboard({
  activePitchClasses = [],
  rootPitchClass = 0,
  onRootChange,
}) {
  const [pressedKeyId, setPressedKeyId] = useState(null);
  const releaseTimerRef = useRef(null);

  const { error, playPitchClass } = useScaleAudio({ notes: [] });

  const activeSet = useMemo(
    () => new Set(activePitchClasses),
    [activePitchClasses]
  );

  function releasePressedKeyLater() {
    if (typeof window === "undefined") return;

    if (releaseTimerRef.current) {
      window.clearTimeout(releaseTimerRef.current);
    }

    releaseTimerRef.current = window.setTimeout(() => {
      setPressedKeyId(null);
      releaseTimerRef.current = null;
    }, 150); // Slightly lengthened for a smoother visual release
  }

  function handleKeyPress(key) {
    setPressedKeyId(key.id);
    onRootChange?.(key.rootValue);
    void playPitchClass(key.pitchClass, key.octave);
    releasePressedKeyLater();
  }

  function handleKeyboardClick(event, key) {
    // Keyboard-generated button clicks (Enter/Space) have detail === 0.
    // Pointer interactions are handled on pointer-down.
    if (event.detail === 0) {
      handleKeyPress(key);
    }
  }

  useEffect(() => {
    return () => {
      if (releaseTimerRef.current && typeof window !== "undefined") {
        window.clearTimeout(releaseTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div className="overflow-x-auto px-2 py-4 sm:px-4 sm:py-6">
        <div className="relative mx-auto h-[220px] min-w-[600px] max-w-5xl rounded-xl bg-black p-1 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
          
          {/* WHITE KEYS CONTAINER */}
          <div className="relative grid h-full w-full grid-cols-8 overflow-hidden rounded-lg bg-neutral-900">
            {WHITE_KEYS.map((key) => {
              const isScaleTone = activeSet.has(key.pitchClass);
              const isRoot = key.pitchClass === rootPitchClass;
              const isPressed = pressedKeyId === key.id;

              return (
                <button
                  key={key.id}
                  type="button"
                  onPointerDown={() => handleKeyPress(key)}
                  onClick={(e) => handleKeyboardClick(e, key)}
                  aria-label={`Select ${key.note} as root and play ${key.note}${key.octave}`}
                  aria-pressed={isRoot}
                  className={`
                    group relative flex select-none items-end justify-center outline-none touch-manipulation
                    border-r border-neutral-300/40 last:border-r-0
                    transition-all duration-[75ms] ease-out
                    focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--scale-accent)]
                  `}
                  style={{
                    background: isPressed
                      ? "linear-gradient(180deg, #e5e5e5 0%, #d4d4d4 100%)"
                      : "linear-gradient(180deg, #ffffff 0%, #f3f4f6 100%)",
                    // The "lip" of the key. It compresses when pressed.
                    boxShadow: isPressed 
                      ? "inset 0 1px 4px rgba(0,0,0,0.2), inset 0 -2px 0 rgba(0,0,0,0.1)"
                      : "inset 0 -6px 0 rgba(0,0,0,0.12), inset 0 -7px 4px rgba(0,0,0,0.05)",
                    transform: isPressed ? "translateY(2px)" : "translateY(0)",
                  }}
                >
                  {/* Glowing Scale Accent Wash */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 transition-opacity duration-300 ease-out"
                    style={{
                      backgroundColor: "var(--scale-accent)",
                      opacity: isPressed ? 0.25 : isRoot ? 0.15 : isScaleTone ? 0.05 : 0,
                    }}
                  />

                  {/* Root Indicator Marker */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-10 h-1.5 w-1.5 rounded-full shadow-[0_0_8px_var(--scale-accent)] transition-all duration-300"
                    style={{
                      backgroundColor: "var(--scale-accent)",
                      opacity: isRoot ? 1 : 0,
                      transform: isRoot ? "scale(1)" : "scale(0.5)",
                    }}
                  />

                  {/* Note Label */}
                  <span
                    className={`
                      relative z-10 mb-4 font-mono text-[10px] font-bold tracking-widest transition-colors duration-200
                      ${isRoot || isPressed ? "text-neutral-800" : isScaleTone ? "text-neutral-500" : "text-neutral-300"}
                    `}
                  >
                    {key.note}
                  </span>
                </button>
              );
            })}
          </div>

          {/* BLACK KEYS */}
          {BLACK_KEYS.map((key) => {
            const isScaleTone = activeSet.has(key.pitchClass);
            const isRoot = key.pitchClass === rootPitchClass;
            const isPressed = pressedKeyId === key.id;

            return (
              <button
                key={key.id}
                type="button"
                onPointerDown={() => handleKeyPress(key)}
                onClick={(e) => handleKeyboardClick(e, key)}
                aria-label={`Select ${key.note} as root and play ${key.note}${key.octave}`}
                aria-pressed={isRoot}
                className="group absolute top-1 z-10 flex h-[60%] w-[7.5%] select-none items-end justify-center rounded-b-md outline-none touch-manipulation transition-all duration-[75ms] ease-out focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-[var(--scale-accent)]"
                style={{
                  left: key.left,
                  transform: isPressed ? "translateX(-50%) translateY(2px)" : "translateX(-50%) translateY(0)",
                  background: "linear-gradient(180deg, #2a2a2a 0%, #171717 80%, #0a0a0a 100%)",
                  // Replaced borders with 3D shadows for a realistic elevated look
                  boxShadow: isPressed
                    ? "inset 0 2px 4px rgba(0,0,0,0.8), inset 0 -2px 0 rgba(255,255,255,0.05)"
                    : "inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -4px 0 rgba(0,0,0,0.8), 0 8px 12px rgba(0,0,0,0.5)",
                }}
              >
                {/* Glowing Scale Accent Wash */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-b-md transition-opacity duration-300 ease-out"
                  style={{
                    background: `linear-gradient(180deg, transparent 40%, var(--scale-accent) 100%)`,
                    opacity: isPressed ? 0.6 : isRoot ? 0.35 : isScaleTone ? 0.15 : 0,
                  }}
                />

                {/* Root Indicator Marker */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-7 h-1 w-4 rounded-full shadow-[0_0_10px_var(--scale-accent)] transition-all duration-300"
                  style={{
                    backgroundColor: "var(--scale-accent)",
                    opacity: isRoot ? 1 : 0,
                    transform: isRoot ? "scaleX(1)" : "scaleX(0.2)",
                  }}
                />

                {/* Note Label */}
                <span
                  className={`
                    relative z-10 mb-2 font-mono text-[9px] font-bold tracking-widest transition-colors duration-200
                    ${isRoot || isPressed ? "text-white" : isScaleTone ? "text-white/70" : "text-white/30"}
                  `}
                >
                  {key.note}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p role="alert" className="mt-2 text-center text-xs font-medium tracking-wide text-rose-400/90">
          {error}
        </p>
      )}
    </div>
  );
}