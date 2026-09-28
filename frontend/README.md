# SyncingTom

Browser-first music utilities. The first tool is **Meter Sequence**, a programmable changing-meter click track.

## Stack

- Next.js 16 / App Router
- React 19
- TypeScript
- Tailwind CSS
- Motion for React
- Web Audio API

No database, authentication, or backend is required for the core music tools.

## Local setup

Node.js 22 is recommended (`.nvmrc` is included).

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Useful checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Structure

```text
src/
├── app/
│   ├── page.tsx
│   └── tools/
│       └── meter-sequence/
│           └── page.tsx
├── components/
│   ├── meter-sequence/
│   └── shared/
├── lib/
│   ├── audio/
│   └── meter/
└── types/
    └── music.ts
```

## Checkpoint status

- [x] 1. Meter engine + editable UI
- [x] 2. Accurate Web Audio playback
- [ ] 3. Playback visualization + UX
- [ ] 4. Grouping accents + tempo ladder
- [ ] 5. Presets + shareable URLs + production polish

## Architecture rule

Keep these layers separate:

- `lib/meter`: pure music/meter logic
- `lib/audio`: browser audio scheduling/synthesis
- `components`: React UI
- `types`: shared TypeScript contracts

This keeps the core reusable for future SyncingTom tools such as Polymeter and Polyrhythm.
