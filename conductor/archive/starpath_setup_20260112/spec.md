# Specification: Define Data Structure & Prototype List Builder

## Overview
This track focuses on the foundational data layer and the primary list-building interface. The goal is to establish a robust JSON schema for Star Wars: Shatterpoint units and implement a functional prototype of the list builder.

## Requirements
- **Data Schema:** Define a JSON schema that covers all unit attributes (Primary, Secondary, Support), including keywords, abilities, health, and points.
- **Data Ingestion:** Analyze external sources (Tabletop Admiral, ShatterpointDB) and map them to the new schema.
- **UI Components:** Create reusable components for unit selection and squad display using shadcn/ui.
- **Validation Logic:** Implement official AMG squad-building rules (e.g., Force limits, unit type requirements).
- **Persistence:** Save and load squads using local storage.
- **Sharing:** Implement base64 encoding/decoding for squad sharing.

## Success Criteria
- JSON schema validated and initial unit data loaded.
- List builder allows creating a valid squad.
- Squads can be exported to and imported from a base64 string.
- Disclaimer displayed on all views.
