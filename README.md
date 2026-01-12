# Shatterpoint Starpath
### Tactical Analysis & Logistics Interface // N-S9 Unit

**Shatterpoint Starpath** is a premium list builder and game state manager for the Star Wars Shatterpoint Game by Atomic Mass Games. Inspired by the rugged, utilitarian aesthetic of the starpath units seen in the *Andor* series, this tool provides a high-contrast, industrial interface for tracking your strike team's progress.

[**Live Application**](https://romdeau.github.io/shatterpoint-starpath/)

---

## 🛰️ Project Mission
The core aim is to provide a seamless list-building experience and a robust game state manager, eliminating the need for excessive physical tokens and cards during matches.

- **List Builder:** Enforce official squad-building rules and manage multiple squads.
- **Sharing:** Export and import squads via base64 encoded strings for immediate deployment.
- **Game State Manager:** Track health, damage, conditions (Strained, Disarmed, etc.), and struggle progression.
- **Visual Hierarchy:** Critical game stats are prioritized for high-glanceability during intense matches.

## 🎨 The Andor Aesthetic
Inspired by the N-S9 Starpath unit, the interface follows a "form follows function" philosophy:
*   **Industrial Palette:** Dark backgrounds with sharp terminal greens, command-center oranges, and imperial reds.
*   **Tactical Hierarchy:** High-contrast data readability designed for various lighting conditions at a gaming table.
*   **In-Universe Utility:** Atmospheric flair including sector scanning and comms-link status indicators.

## 🛠️ Tech Stack
Built with modern, high-performance technologies:
- **Framework:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Runtime/Package Manager:** [Bun](https://bun.sh/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/docs/installation) installed on your system.

### Development
```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Run tests
bun test

# Build for production
bun run build
```

---

## 📦 Deployment Guide

This project is configured for automated hosting on **GitHub Pages**.

### configuration

#### Vite Base Path
The `base` property in `vite.config.ts` matches the repository name to ensure assets load correctly:
```ts
base: '/shatterpoint-starpath/'
```

#### GitHub Repository Settings
1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.

### Automatic Deployment
Any push to the `main` branch triggers the deployment workflow defined in `.github/workflows/deploy.yml`:
1. **Setup:** Initializes the Bun environment.
2. **Build:** Executes `bun run build`.
3. **Deploy:** Pushes the `dist` folder to the `gh-pages` branch.

### Manual Deployment
1. Go to the **Actions** tab in your GitHub repository.
2. Select the **Deploy static content to Pages** workflow.
3. Click **Run workflow**.

---

## ⚖️ Legal Disclaimer
**Community tool.** Not affiliated with Atomic Mass Games. Star Wars Shatterpoint and all related materials are trademarks and copyrights of Atomic Mass Games and Lucasfilm Ltd.