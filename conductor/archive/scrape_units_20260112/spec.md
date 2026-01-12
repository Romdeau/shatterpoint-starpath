# Specification: Scrape & Integrate Full Unit Data

## Overview
This track involves building a data ingestion pipeline to scrape Star Wars: Shatterpoint unit data from Tabletop Admiral and integrating this full dataset into the application. We will replace the current hardcoded samples with a dynamic "Unit Data Visualizer" that supports searching and filtering across the entire roster.

## Functional Requirements
- **Scraping Script:** Create a Bun-based script (`scripts/scrape.ts`) that:
    - Fetches unit, ability, and stance data from Tabletop Admiral.
    - Transforms the external data format into our internal `src/data/schema.json` format.
    - Saves the result to `src/data/units.json`, `src/data/abilities.json`, and `src/data/stances.json`.
- **UI Update:** Update `App.tsx` and the `UnitList` component to:
    - Load the full dataset from the generated JSON files.
    - Implement a "Search & Filter" bar.
    - Provide filters for **Unit Type**, **Keywords/Factions**, **Era**, and **Point Cost/Allowance**.
- **Performance:** Ensure the `UnitList` remains responsive even with 50+ units rendered.

## Non-Functional Requirements
- **Data Integrity:** The transformation logic must validate scraped data against our existing JSON schemas.
- **Maintainability:** The scrape script should be idempotent and easy to run whenever new units are released.

## Acceptance Criteria
- Running `bun run scrape` populates the `src/data/` directory with full unit data.
- The web application displays all scraped units instead of hardcoded samples.
- The Search bar correctly filters units by name.
- Selecting a filter (e.g., "Secondary") immediately updates the visible unit list.

## Out of Scope
- Scraping image assets (we will use placeholders or external URLs for now).
- Advanced squad-building validation during this specific track (focused on data availability and display).
