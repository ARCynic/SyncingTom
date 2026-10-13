export const ISSUE_SECTIONS = [
  {
    id: "known",

    title:
      "Known Issues",

    description:
      "Current limitations, rough edges, or behavior that still needs refinement.",
  },

  {
    id: "progress",

    title:
      "In Progress",

    description:
      "Parts of SyncingTom currently being tested, reworked, or expanded.",
  },

  {
    id: "upcoming",

    title:
      "Upcoming Improvements",

    description:
      "Planned tools, experiments, and improvements that may become part of the platform.",
  },
];

export const PROJECT_STATUS_UPDATED =
  "October 2026";

export const PROJECT_ISSUES = [
  {
    id:
      "mobile-home-density",

    section:
      "known",

    status:
      "known",

    area:
      "Home",

    title:
      "Mobile tool cards are too vertically dense",

    description:
      "The large editorial card layout works well on desktop but still feels too stacked on smaller screens.",

    next:
      "Introduce a dedicated compact mobile card layout rather than simply stacking the desktop composition.",
  },

  {
    id:
      "mobile-render-cost",

    section:
      "known",

    status:
      "known",

    area:
      "Performance",

    title:
      "Some visual effects are heavier on mobile",

    description:
      "Floating SVG notes, fixed background layers, image decoding and backdrop blur can make initial rendering or scrolling feel heavier on some phones.",

    next:
      "Reduce mobile particle density, lazy-load card artwork and simplify expensive blur and shadow effects on smaller screens.",
  },

  {
    id:
      "subdivision-testing",

    section:
      "progress",

    status:
      "in-progress",

    area:
      "Subdivision Ladder",

    title:
      "Playback and practice validation",

    description:
      "The first functional Subdivision Ladder is built around fixed meter and pulse while subdivision density changes between user-defined steps.",

    next:
      "Continue practical testing across odd tuplets, different tempos, custom bar counts and mobile layouts before adding more features.",
  },

  {
    id:
      "subdivision-click-hierarchy",

    section:
      "upcoming",

    status:
      "planned",

    area:
      "Subdivision Ladder",

    title:
      "Separate bar, pulse and subdivision accents",

    description:
      "The current playback model primarily distinguishes the underlying pulse from the remaining subdivision clicks.",

    next:
      "Introduce a three-level sonic hierarchy: strongest bar start, medium pulse accent, softer subdivision click.",
  },

  {
    id:
      "polymeter",

    section:
      "upcoming",

    status:
      "planned",

    area:
      "Rhythm",

    title:
      "Polymeter",

    description:
      "A practice module for layering rhythmic cycles of different lengths over one shared pulse and observing where they separate and realign.",

    next:
      "Build the playback model around independent cycle lengths while preserving a common temporal grid.",
  },

  {
    id:
      "fret-the-scales",

    section:
      "upcoming",

    status:
      "planned",

    area:
      "Fretboard",

    title:
      "Fret the Scales",

    description:
      "A bridge between the Scale Archive and physical instrument practice for guitar and bass.",

    next:
      "Develop short exercises around note recall, scale degrees, positions and movement across the fretboard.",
  },

  {
    id:
      "genre-atlas",

    section:
      "upcoming",

    status:
      "exploring",

    area:
      "Theory",

    title:
      "Genre Atlas",

    description:
      "A structured archive connecting musical genres with characteristic rhythm, harmony, scales, instrumentation, history and associated artists.",

    next:
      "Explore genre genealogy and links from theoretical traits directly into relevant SyncingTom practice tools.",
  },
];