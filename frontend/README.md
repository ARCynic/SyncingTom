# SyncingTom — Checkpoint 2

SyncingTom is a browser-based rhythm utility project.

This version contains the complete Checkpoint 1 + Checkpoint 2 implementation:

- meter sequence editor
- quick sequence parser
- BPM controls
- infinite / fixed cycle settings
- accurate Web Audio click scheduling
- bar-start accent
- volume and accent controls
- Play / Pause / Stop / Restart
- Space-bar transport shortcut
- responsive site shell
- React Router navigation
- navbar and footer
- Home and Meter Sequence routes

## Fixed stack moving forward

The project is now standardized on:

- Vite
- React
- React Router
- Tailwind CSS
- Web Audio API
- JavaScript / JSX source

There is no Next.js layer and no TypeScript requirement.

The `.js` / `.jsx` source is intentionally free of TypeScript-only syntax. TypeScript can be introduced later for selected modules without changing the application architecture.

## Requirements

Node 22.13+.

```bash
nvm use
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

Meter Sequence:

```text
http://localhost:5173/tools/meter-sequence
```

## Build checks

```bash
npm run lint
npm run build
npm run preview
```

## Important migration cleanup

If replacing an older SyncingTom scaffold, remove these if they still exist:

```text
next.config.*
next-env.d.ts
src/app/
tsconfig.json
tsconfig.app.json
tsconfig.node.json
postcss.config.*
```

This project uses Tailwind's Vite plugin, so the old PostCSS setup is not needed.

## Structure

```text
src/
├── App.jsx
├── main.jsx
├── index.css
├── components/
│   ├── layout/
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── SiteLayout.jsx
│   └── meter-sequence/
│       ├── BPMControl.jsx
│       ├── LoopControls.jsx
│       ├── MeterSequenceEditor.jsx
│       ├── MeterSequenceTool.jsx
│       ├── PlaybackPanel.jsx
│       └── QuickSequenceInput.jsx
├── hooks/
│   └── useMeterAudio.js
├── lib/
│   ├── audio/
│   │   ├── AudioEngine.js
│   │   ├── ClickSynth.js
│   │   ├── Scheduler.js
│   │   └── timing.js
│   └── meter/
│       ├── parser.js
│       └── sequence.js
└── pages/
    ├── HomePage.jsx
    ├── MeterSequencePage.jsx
    └── NotFoundPage.jsx
```

## Routing

React Router owns navigation.

```text
/                        Home
/tools/meter-sequence    Meter Sequence
```

`SiteLayout.jsx` wraps route content with the shared navbar and footer.

## Timing architecture

React does not fire the musical clicks.

The click engine uses `AudioContext.currentTime` and schedules audio ahead of time. A short JavaScript timer only wakes the scheduler so it can fill the next scheduling window.

This engine is kept separate from the UI so later tools can reuse it.
