# Migration from the old scaffold

Use this Checkpoint 2 project as the new root rather than mixing it into the old Next/Vite hybrid.

## Remove old framework files

Delete these if present:

```text
next.config.*
next-env.d.ts
src/app/
tsconfig.json
tsconfig.app.json
tsconfig.node.json
postcss.config.*
```

Do not keep `"types": ["vite/client"]` because this project is JavaScript/JSX-first and does not require a TypeScript application config.

## Replace with this project

Copy the generated files into the project root, then:

```bash
npm install
npm run lint
npm run build
npm run dev
```

## Routes

```text
/                        Home
/tools/meter-sequence    Meter Sequence Click Track
```

Internal navigation uses React Router `NavLink`/`Link`, not `<a>` for app routes and not `next/link`.
