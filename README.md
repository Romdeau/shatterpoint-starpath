# Shatterpoint Starpath

A local-first Star Wars Shatterpoint squad builder and game tracker. [Open the app](https://romdeau.github.io/shatterpoint-starpath/).

## Use at the table

Browse and filter the bundled unit database, then open List Builder. Select a Primary, Secondary and Support for each of two squads. The builder checks points, shared eras and duplicate unit names. Export each squad as a code to copy into another browser's Squad code field.

Game Manager starts from a valid strike team and saves a snapshot separately from the builder. Track damage, injuries, conditions, activation, Force and the struggle counter. Changes to squads do not change an active game. End game asks for confirmation and keeps the squads.

The game tracker records counters; it does not adjudicate attacks, wounds, turn sequencing or victory. The validator covers basic construction constraints, not every card exception or character alias. Check current cards and event rules when building a team.

## Offline and saved data

Open the production app online once and allow the service worker to finish installing before going offline. The app caches its shell, bundled data and local assets. Hash routes work on GitHub Pages and survive offline reloads. Development mode does not install a worker. Updates wait until the app's tabs close and reopen, so a match is never reloaded automatically.

Squads use the existing `starpath_squads` localStorage key. The active game uses `starpath-game-v1`. Theme preferences retain their existing keys. Storage belongs to the browser and origin; it does not sync between devices. Export squad codes before clearing site data. Corrupt saves are preserved rather than overwritten; a visible warning explains failed writes. A full browser storage quota or private-mode restrictions can prevent saving. Active games currently have no portable backup format.

## Develop and validate

Use Bun 1.4.3 and Node 24.15 or newer on the 24.x line, or Node 26+. Native Windows and Unix shells are supported. TypeScript stays on 6.0 until the ESLint stack declares TypeScript 7 support. A `glob` override selects the patched 14.x release for Workbox; recheck it when Workbox updates.

```sh
bun install --frozen-lockfile
bun run dev
bun run check
bunx playwright install chromium
bun run test:e2e
```

`check` runs ESLint, TypeScript, Vitest and the production build. Browser tests run the production preview on port 4173, with desktop and mobile Chromium projects. They cover squad selection, transfer, game controls, persistence and offline reloads. Test artifacts go in `test-results/`.

## Deploy

Pull requests run validation and browser tests in `.github/workflows/ci.yml`. A push to `main` or a manual run of `deploy.yml` validates and builds, then uploads `dist/` to GitHub Pages using the Pages artifact deployment action. Set repository Settings > Pages > Source to GitHub Actions. Vite's base is `/shatterpoint-starpath/`; public assets must respect it.

## Project reference

See [AGENTS.md](AGENTS.md) for repository instructions and [TODO.md](TODO.md) for remaining work. The `conductor/archive/` plans describe historical work and are not current completion checklists. Dependency versions in `package.json` and `bun.lock` are authoritative.

Community tool, not affiliated with Atomic Mass Games or Lucasfilm. Star Wars Shatterpoint and its materials belong to their respective owners.
