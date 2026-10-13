export const GENRES = [
  {
    id: "blues",
    slug: "blues",
    name: "Blues",
    era: "Late 19th–early 20th century",
    regionIds: ["united-states"],
    description:
      "A foundational African American musical tradition whose forms, phrasing and harmonic language deeply influenced jazz, rock and popular music.",
    rhythm:
      "Strong groove orientation, shuffle feels, swung subdivisions and repeated rhythmic figures.",
    harmony:
      "Blues forms commonly center on I, IV and V harmony with expressive blue-note inflections.",
    instrumentation: [
      "Voice",
      "Guitar",
      "Harmonica",
      "Piano",
      "Bass",
      "Drums",
    ],
    relatedGenreIds: [
      "jazz",
      "rock",
    ],
  },

  {
    id: "jazz",
    slug: "jazz",
    name: "Jazz",
    era: "Early 20th century",
    regionIds: ["united-states"],
    description:
      "An improvisation-centered tradition that developed from African American musical practices and expanded into a large family of styles.",
    rhythm:
      "Swing, syncopation, polyrhythmic interaction and flexible phrasing are central across many jazz styles.",
    harmony:
      "Extended chords, functional harmony, modal approaches and chromatic movement are common.",
    instrumentation: [
      "Saxophone",
      "Trumpet",
      "Piano",
      "Double bass",
      "Drums",
      "Guitar",
    ],
    relatedGenreIds: [
      "blues",
      "rock",
    ],
  },

  {
    id: "rock",
    slug: "rock",
    name: "Rock",
    era: "1950s onward",
    regionIds: [
      "united-states",
      "british-isles",
    ],
    description:
      "A broad family of amplified popular music that grew from rock and roll and drew strongly from blues, rhythm and blues and country traditions.",
    rhythm:
      "Strong backbeat, repeated riffs and steady subdivisions form the rhythmic backbone of many rock styles.",
    harmony:
      "Often riff-driven, with power chords, blues-derived movement, modal harmony and functional progressions.",
    instrumentation: [
      "Electric guitar",
      "Bass",
      "Drums",
      "Voice",
      "Keyboards",
    ],
    relatedGenreIds: [
      "blues",
      "punk",
      "heavy-metal",
    ],
  },

  {
    id: "hip-hop",
    slug: "hip-hop",
    name: "Hip-Hop",
    era: "1970s onward",
    regionIds: ["united-states"],
    description:
      "A musical culture built around rhythmic vocal delivery, DJ practice, sampling, beat construction and production.",
    rhythm:
      "Loop-based grooves, syncopation, drum-machine patterns and rhythmic vocal phrasing.",
    harmony:
      "Harmony ranges from minimal sampled loops to elaborate jazz-, soul- and electronic-influenced production.",
    instrumentation: [
      "Voice",
      "Sampler",
      "Drum machine",
      "Turntables",
      "Synthesizer",
    ],
    relatedGenreIds: [],
  },

  {
    id: "reggae",
    slug: "reggae",
    name: "Reggae",
    era: "Late 1960s onward",
    regionIds: ["caribbean"],
    description:
      "A Jamaican music tradition developed from ska and rocksteady, recognized for its distinctive rhythmic placement and bass-centered arrangements.",
    rhythm:
      "Offbeat guitar or keyboard accents, deep bass movement and characteristic drum patterns.",
    harmony:
      "Frequently uses repeated diatonic progressions while leaving substantial space for rhythm and bass.",
    instrumentation: [
      "Bass",
      "Drums",
      "Guitar",
      "Organ",
      "Voice",
      "Percussion",
    ],
    relatedGenreIds: [],
  },

  {
    id: "highlife",
    slug: "highlife",
    name: "Highlife",
    era: "20th century",
    regionIds: ["west-africa"],
    description:
      "A West African popular music tradition particularly associated with Ghana and Nigeria, combining local rhythmic practices with guitar and brass-band influences.",
    rhythm:
      "Interlocking rhythmic patterns and dance-oriented grooves are central.",
    harmony:
      "Often uses cyclical tonal progressions supporting layered melodic and rhythmic interaction.",
    instrumentation: [
      "Guitar",
      "Bass",
      "Percussion",
      "Brass",
      "Voice",
    ],
    relatedGenreIds: [
      "afrobeat",
    ],
  },

  {
    id: "afrobeat",
    slug: "afrobeat",
    name: "Afrobeat",
    era: "Late 1960s–1970s onward",
    regionIds: ["west-africa"],
    description:
      "A Nigerian-rooted style combining West African rhythmic traditions with jazz, funk and extended ensemble arrangements.",
    rhythm:
      "Layered percussion, repeated interlocking patterns and long-form grooves.",
    harmony:
      "Often harmonically economical, allowing rhythmic layers and ensemble development to remain central.",
    instrumentation: [
      "Drums",
      "Percussion",
      "Bass",
      "Guitar",
      "Keyboards",
      "Horns",
      "Voice",
    ],
    relatedGenreIds: [
      "highlife",
      "jazz",
    ],
  },

  {
    id: "samba",
    slug: "samba",
    name: "Samba",
    era: "Early 20th century onward",
    regionIds: ["brazil"],
    description:
      "A major Brazilian musical tradition built around layered percussion, syncopation, song and dance.",
    rhythm:
      "Dense interlocking percussion patterns and characteristic syncopated subdivisions.",
    harmony:
      "Ranges from direct popular-song harmony to more elaborate chromatic approaches.",
    instrumentation: [
      "Percussion",
      "Cavaquinho",
      "Guitar",
      "Voice",
    ],
    relatedGenreIds: [
      "bossa-nova",
    ],
  },

  {
    id: "bossa-nova",
    slug: "bossa-nova",
    name: "Bossa Nova",
    era: "Late 1950s onward",
    regionIds: ["brazil"],
    description:
      "A Brazilian style that reshaped samba rhythm into an intimate song form with sophisticated harmonic language.",
    rhythm:
      "Subtle syncopated guitar patterns derived from samba.",
    harmony:
      "Extended chords, chromatic voice-leading and jazz-influenced progressions are common.",
    instrumentation: [
      "Classical guitar",
      "Voice",
      "Piano",
      "Bass",
      "Light percussion",
    ],
    relatedGenreIds: [
      "samba",
      "jazz",
    ],
  },

  {
    id: "punk",
    slug: "punk",
    name: "Punk",
    era: "1970s onward",
    regionIds: [
      "united-states",
      "british-isles",
    ],
    description:
      "A direct, high-energy rock movement emphasizing concise songs, forceful performance and stripped-down arrangements.",
    rhythm:
      "Fast, direct backbeats and persistent eighth-note or downstroke-driven patterns.",
    harmony:
      "Frequently based on power chords, compact progressions and riff-centered writing.",
    instrumentation: [
      "Electric guitar",
      "Bass",
      "Drums",
      "Voice",
    ],
    relatedGenreIds: [
      "rock",
    ],
  },

  {
    id: "heavy-metal",
    slug: "heavy-metal",
    name: "Heavy Metal",
    era: "Late 1960s–1970s onward",
    regionIds: [
      "british-isles",
      "united-states",
    ],
    description:
      "A heavy, amplified branch of rock centered on distorted guitar, powerful rhythm sections and riff-based composition.",
    rhythm:
      "Heavy accents, riff synchronization, driving subdivisions and frequent rhythmic contrast.",
    harmony:
      "Power chords, modal riffing, chromatic movement and tonal ambiguity appear frequently.",
    instrumentation: [
      "Electric guitar",
      "Bass",
      "Drums",
      "Voice",
    ],
    relatedGenreIds: [
      "rock",
    ],
  },

  {
    id: "hindustani-classical",
    slug: "hindustani-classical",
    name: "Hindustani Classical",
    era: "Centuries-old tradition",
    regionIds: ["india"],
    description:
      "A North Indian classical tradition organized around raga, tala, melodic development and improvisation.",
    rhythm:
      "Rhythmic organization is structured through tala cycles.",
    harmony:
      "The music is primarily melodic and drone-based rather than built around Western functional harmony.",
    instrumentation: [
      "Sitar",
      "Sarod",
      "Tabla",
      "Tanpura",
      "Voice",
    ],
    relatedGenreIds: [],
  },

  {
    id: "city-pop",
    slug: "city-pop",
    name: "City Pop",
    era: "Late 1970s–1980s",
    regionIds: ["japan"],
    description:
      "A Japanese popular-music umbrella associated with polished studio production and influences from funk, soul, jazz and soft rock.",
    rhythm:
      "Tight studio grooves drawing from funk, disco and contemporary pop.",
    harmony:
      "Rich extended chords and jazz- and soul-influenced progressions appear frequently.",
    instrumentation: [
      "Electric piano",
      "Synthesizer",
      "Guitar",
      "Bass",
      "Drums",
      "Voice",
    ],
    relatedGenreIds: [],
  },

  {
    id: "amapiano",
    slug: "amapiano",
    name: "Amapiano",
    era: "2010s onward",
    regionIds: ["south-africa"],
    description:
      "A South African electronic dance style recognized for spacious grooves, keyboard textures and distinctive low-end production.",
    rhythm:
      "Deep dance grooves, syncopated percussion and characteristic log-drum patterns.",
    harmony:
      "Often uses repeating keyboard-centered progressions and atmospheric harmonic loops.",
    instrumentation: [
      "Synthesizer",
      "Sampler",
      "Drum programming",
      "Voice",
    ],
    relatedGenreIds: [],
  },
];