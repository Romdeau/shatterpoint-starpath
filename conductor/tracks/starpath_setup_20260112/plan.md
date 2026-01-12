# Implementation Plan: Define Data Structure & Prototype List Builder

## Phase 1: Data Architecture [checkpoint: f2014c4]
- [x] Task: Define the core JSON schema for Shatterpoint units in `src/data/schema.json`. (44b4ffd)
- [x] Task: Create a sample unit file `src/data/sample_unit.json` to validate the schema. (a76e93c)
- [x] Task: Develop a data mapping strategy from external sources to our internal schema. (8693f02)
- [x] Task: Conductor - User Manual Verification 'Phase 1: Data Architecture' (Protocol in workflow.md) (f2014c4)

## Phase 2: Project Initialization & Core Components [checkpoint: efb50f4]
- [x] Task: Initialize the React/Vite project structure using Bun. (608db01)
- [x] Task: Configure Tailwind CSS v4 and shadcn/ui. (bcfcc70)
- [x] Task: Create reusable UI components for Unit Cards and Selection Lists. (f48ceda)
- [x] Task: Conductor - User Manual Verification 'Phase 2: Project Initialization & Core Components' (Protocol in workflow.md) (efb50f4)

## Phase 3: List Builder Logic
- [x] Task: Implement the squad-building state management using React Context. (800c882)
- [x] Task: Write validation logic for AMG squad-building rules. (f906385)
- [~] Task: Implement base64 export and import functionality.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: List Builder Logic' (Protocol in workflow.md)

## Phase 4: Persistence & Polishing
- [ ] Task: Implement LocalStorage persistence for saved squads.
- [ ] Task: Apply the "Andor" aesthetic (Galactic & Industrial) to the UI.
- [ ] Task: Ensure the "Community tool" disclaimer is present on all pages.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Persistence & Polishing' (Protocol in workflow.md)
