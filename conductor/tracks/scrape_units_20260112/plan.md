# Implementation Plan: Scrape & Integrate Full Unit Data

## Phase 1: Data Ingestion Pipeline [checkpoint: c32c4c9]
- [x] Task: Create a script skeleton in `scripts/scrape.ts` and update `package.json`. (01ac036)
- [x] Task: Write unit tests for the data transformation logic (mapping TA format to Starpath schema). (396d6d3)
- [x] Task: Prepare unit and ability data in `src/data/units.json` and `src/data/abilities.json`.
- [x] Task: Remove temporary scrape script and clean up `package.json`.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Data Ingestion Pipeline' (Protocol in workflow.md) (c32c4c9)

## Phase 2: Search & Filter Logic
- [x] Task: Update the application to load data from `src/data/units.json` and `src/data/abilities.json` instead of sample data.
- [x] Task: Create a filtering utility in `src/lib/filters.ts` and write tests for various filter combinations.
- [x] Task: Implement the filtering logic (Type, Keyword, Era, Points) to process the full unit list. (3351fd6)
- [ ] Task: Update the `UnitList` component to handle empty states and large datasets efficiently.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Search & Filter Logic' (Protocol in workflow.md)

## Phase 3: UI Integration & Polishing
- [ ] Task: Build the Search & Filter bar UI using shadcn/ui components (Input, Select, Multi-select).
- [ ] Task: Integrate the filter bar into `App.tsx` and connect it to the unit state.
- [ ] Task: Replace hardcoded sample data with the full scraped dataset in `App.tsx`.
- [ ] Task: Perform a final performance audit of the list rendering and refine the "Andor" aesthetic of the filter bar.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: UI Integration & Polishing' (Protocol in workflow.md)
