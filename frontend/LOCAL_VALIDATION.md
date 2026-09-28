# Local Validation

Validated on the generated Checkpoint 2 source tree.

## Passed

- All `.js` files pass `node --check`.
- All `.js` / `.jsx` source parses through TypeScript's JSX parser with `allowJs` and `checkJs: false`.
- No `.ts` or `.tsx` files remain.
- No Next.js imports/config references remain in source.
- No `vite/client` type reference remains.
- Core executable tests pass for:
  - `5,7,4` parsing
  - `7/8x2,5/8,4/4` parsing
  - invalid denominator rejection
  - default sequence bar math
  - cycle duration at 100 BPM
  - `/2`, `/4`, `/8`, `/16` beat duration at 120 BPM
  - fixed one-cycle cursor progression
  - 16-click `5/4 → 7/4 → 4/4` schedule
  - bar accents on clicks 1, 6, and 13

## Environment limitation

The execution container cannot reach the npm registry, so `npm install`, `vite build`, and ESLint with installed package dependencies could not be executed here.

Run locally:

```bash
npm install
npm run lint
npm run build
npm run dev
```

The dependency versions in `package.json` were chosen against current official/npm package information as of 2026-09-28.
