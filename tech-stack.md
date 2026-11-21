# Tech stack

The current stack and commands are documented in [AGENTS.md](AGENTS.md) and [README.md](README.md). Exact dependency versions live in `package.json` and `bun.lock`.

React 19, React Router 7 with HashRouter, TypeScript 6, Vite 8, Tailwind CSS 4, Radix UI, Lucide, Bun 1.4.3, ESLint 10, Vitest 5 and Playwright. Production builds include a generated service worker from vite-plugin-pwa. Saved squads and game snapshots use localStorage. There is no server, account system or Recharts dependency.
