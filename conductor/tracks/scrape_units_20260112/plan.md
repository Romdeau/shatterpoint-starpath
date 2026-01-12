# Implementation Plan: Scrape & Integrate Full Unit Data

## Phase 1: Data Ingestion Pipeline
- [x] Task: Create a script skeleton in `scripts/scrape.ts` and update `package.json`. (01ac036)
- [ ] Task: Write unit tests for the data transformation logic (mapping TA format to Starpath schema).
- [ ] Task: Implement fetching logic to retrieve raw unit data from Tabletop Admiral.
- [ ] Task: Implement and refine transformation logic to populate `src/data/units.json`, `abilities.json`, and `stances.json`.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Data Ingestion Pipeline' (Protocol in workflow.md)

## Phase 2: Search & Filter Logic
- [ ] Task: Create a filtering utility in `src/lib/filters.ts` and write tests for various filter combinations.
- [ ] Task: Implement the filtering logic (Type, Keyword, Era, Points) to process the full unit list.
- [ ] Task: Update the `UnitList` component to handle empty states and large datasets efficiently.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Search & Filter Logic' (Protocol in workflow.md)

## Phase 3: UI Integration & Polishing
- [ ] Task: Build the Search & Filter bar UI using shadcn/ui components (Input, Select, Multi-select).
- [ ] Task: Integrate the filter bar into `App.tsx` and connect it to the unit state.
- [ ] Task: Replace hardcoded sample data with the full scraped dataset in `App.tsx`.
- [ ] Task: Perform a final performance audit of the list rendering and refine the "Andor" aesthetic of the filter bar.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: UI Integration & Polishing' (Protocol in workflow.md)
