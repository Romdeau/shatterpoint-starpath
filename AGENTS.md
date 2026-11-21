# Repository instructions

## Scope and architecture

Starpath is a static React 19 app for Shatterpoint, built with Vite 8, TypeScript 6, Tailwind 4 and Bun. Preserve its dark industrial terminal styling and responsive sidebar. Routes live in `src/App.tsx`; `src/main.tsx` uses HashRouter for GitHub Pages. Keep the `/shatterpoint-starpath/` base and use `import.meta.env.BASE_URL` for public assets.

`src/pages/` contains the unit registry, squad builder and game manager. `src/context/SquadContext.tsx` owns squad CRUD. `src/lib/validation.ts` validates basic construction, `sharing.ts` handles portable squad codes, and `game.ts` defines the saved session snapshot. Bundled units and abilities live in `src/data/`; do not invent card statistics or rules. Record data gaps in TODO.md.

## Local data contract

Route storage reads and writes through guarded helpers. Validate parsed data before using it. Preserve malformed saves, keep existing storage keys compatible, and show write failures to the user. Never clear user data as an upgrade step. Game sessions snapshot selected units and must survive changes in the builder. New storage formats need a version, migration policy and recovery test. Never add automatic mid-game reloads. Keep required assets local for offline use.

## Commands and checks

Use Bun 1.4.3, with Node 24.15 or newer on the 24.x line, or Node 26+ for tooling. Native PowerShell works; WSL is optional. Install with `bun install --frozen-lockfile`. Use `bun run dev` to develop and `bun run check` before shipping. It runs lint, typecheck, Vitest and the production PWA build. Commit manifest and lockfile updates together. TypeScript 7 remains deferred until typescript-eslint supports it.

For storage, routing, game or offline changes, run `bunx playwright install chromium` then `bun run test:e2e`. This tests the production build on desktop and mobile Chromium. Unit tests use Vitest with a shared jsdom setup in `src/test-setup.ts`. Keep regression tests focused on observable behavior, including rejected imports and persistence failures. Do not use `bun test`, which invokes a different runner.

## Delivery and docs

Keep README.md and TODO.md aligned with observable behavior. `conductor/archive/` is historical; do not mark past manual acceptance complete based on new automated tests. `tech-stack.md` points to the current stack reference. Run the same checks as CI, review the diff for unrelated changes, and use signed Conventional Commits when committing. Never commit credentials, browser profiles or generated test output.
