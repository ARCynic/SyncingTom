export const TOOL_GROUPS = [
  {
    id: "rhythm",
    eyebrow: "Rhythm / Drums",
    title: "Time, pulse, and coordination.",
    description:
      "Practice tools for hearing rhythmic structure, controlling subdivisions, and staying oriented when patterns begin to pull apart.",
  },

  {
    id: "strings",
    eyebrow: "Bass / Guitar",
    title: "Pitch under your fingers.",
    description:
      "Tools for understanding scales and gradually connecting that knowledge to physical positions across the fretboard.",
  },
];

export const TOOLS = [
  {
    id: "meter-sequence",

    number: "01",

    group: "rhythm",

    title: "Meter Sequence",

    description:
      "Build changing meter sequences and practise moving between different bar lengths without losing the underlying pulse.",

    practice:
      "Useful for internalising meter changes instead of treating each time signature as an isolated exercise.",

    tags: [
      "Meter changes",
      "Pulse",
      "Counting",
    ],

    route: "/meter-sequence",

    status: "live",

    statusLabel: "Available",

    cta: "Open tool",

    stamp:
      "/assets/meter_seq.png",

    monogram: "MS",

    accent: "#67e8f9",

    glow:
      "rgba(103, 232, 249, 0.12)",
  },

  {
    id: "subdivision-ladder",

    number: "02",

    group: "rhythm",

    title: "Subdivision Ladder",

    description:
      "Move through different rhythmic subdivisions while keeping one central tempo steady.",

    practice:
      "Built for developing timing control when the density of notes changes but the pulse does not.",

    tags: [
      "Subdivisions",
      "Timing",
      "Control",
    ],

    /*
     * Change this value if your existing route
     * uses a different path.
     */
    route:
      "/subdivision-ladder",

    status: "live",

    statusLabel: "Available",

    cta: "Open tool",

    stamp:
      "/assets/subdiv_lad.png",

    monogram: "SL",

    accent: "#5eead4",

    glow:
      "rgba(94, 234, 212, 0.11)",
  },

  {
    id: "polymeter",

    number: "03",

    group: "rhythm",

    title: "Polymeter",

    description:
      "Layer drum patterns with different cycle lengths over one shared pulse and hear how they separate and realign.",

    practice:
      "Explore independent rhythmic cycles without losing the common temporal grid underneath them.",

    tags: [
      "Independent cycles",
      "Alignment",
      "Groove",
    ],

    route: "/polymeter",

    status: "live",

    statusLabel: "Available",

    cta: "Open tool",

    stamp:
      "/assets/polymeter.png",

    monogram: "PM",

    accent: "#22d3ee",

    glow:
      "rgba(34, 211, 238, 0.11)",
  },

  {
    id: "scale-archive",

    number: "04",

    group: "strings",

    title: "Scale Archive",

    description:
      "Explore scale roots and modes, hear their notes, and inspect their interval shape before taking them onto the instrument.",

    practice:
      "A reference and listening space for understanding the scale before turning it into fretboard movement.",

    tags: [
      "Modes",
      "Intervals",
      "Pitch",
    ],

    route: "/scales",

    status: "live",

    statusLabel: "Available",

    cta: "Explore scales",

    stamp:
      "/assets/scale_archive.png",

    monogram: "SA",

    accent: "#93c5fd",

    glow:
      "rgba(147, 197, 253, 0.11)",
  },

  {
    id: "fret-the-scales",

    number: "05",

    group: "strings",

    title: "Fret the Scales",

    description:
      "Connect scale knowledge to physical fretboard positions through short exercises for bass and guitar.",

    practice:
      "Designed around note recall, scale degrees, positions, and eventually moving confidently across the neck.",

    tags: [
      "Fretboard recall",
      "Scale degrees",
      "Positions",
    ],

    route:
      "/fret-the-scales",

    status: "preview",

    statusLabel:
      "In development",

    cta: "Preview tool",

    stamp:
      "/assets/fret_the_scale.png",

    monogram: "FS",

    accent: "#c4b5fd",

    glow:
      "rgba(196, 181, 253, 0.11)",
  },
];

export function getToolsForGroup(
  groupId,
) {
  return TOOLS.filter(
    (tool) =>
      tool.group === groupId,
  );
}