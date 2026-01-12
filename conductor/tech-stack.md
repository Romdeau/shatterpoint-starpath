# Tech Stack - Shatterpoint Starpath

## Core Technologies
- **Framework:** React (v19)
- **Language:** TypeScript
- **Build Tool:** Vite
- **Package Manager:** Bun (Mandatory)

## UI & Styling
- **CSS Framework:** Tailwind CSS (v4)
- **Component Library:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Charts:** Recharts (for game state visualization)

## Routing & State
- **Routing:** React Router DOM (v6)
- **State Management:** React Context API (to avoid external weight)

## Deployment & Tooling
- **Linting:** ESLint
- **Formatting:** TypeScript-ESLint
- **Deployment:** GitHub Pages (Subpath: `/shatterpoint-starpath/`)
- **Asset Handling:** Always use `import.meta.env.BASE_URL` for public assets.

## Workflow Constraints
- **Cross-Platform:** Developed on macOS and Windows (WSL Ubuntu-24.04).
- **Bun Only:** Never use `npm` or `yarn`. All `bun` commands on Windows must run via WSL.
