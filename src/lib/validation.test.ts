import { describe, it, expect } from "bun:test";
import { validateSquad, validateStrikeTeam } from "./validation";
import { Squad } from "../context/SquadContext";
import { Unit } from "../types/unit";

const mockPrimary: Unit = {
  name: "General Kenobi",
  type: "Primary",
  points: 8, // SP Allowance
  force: 4,
  stamina: 10,
  durability: 3,
  eras: ["Clone Wars"],
  keywords: ["Jedi", "Galactic Republic"],
  abilityIds: [],
  stanceIds: [],
};

const mockSecondary: Unit = {
  name: "Clone Commander Cody",
  type: "Secondary",
  points: 4, // Cost
  force: 0,
  stamina: 8,
  durability: 2,
  eras: ["Clone Wars"],
  keywords: ["Clone Trooper", "Galactic Republic"],
  abilityIds: [],
  stanceIds: [],
};

const mockSupport: Unit = {
  name: "212th Clone Troopers",
  type: "Support",
  points: 4, // Cost
  force: 0,
  stamina: 6,
  durability: 2,
  eras: ["Clone Wars"],
  keywords: ["Clone Trooper", "Galactic Republic"],
  abilityIds: [],
  stanceIds: [],
};

const mockSupportExpensive: Unit = {
    ...mockSupport,
    points: 5,
};

const mockSecondaryWrongEra: Unit = {
    ...mockSecondary,
    eras: ["Galactic Civil War"],
};

const mockSquad: Squad = {
    id: "1",
    primary: mockPrimary,
    secondary: mockSecondary,
    support: mockSupport
};

describe("Validation Logic", () => {
    describe("validateSquad", () => {
        it("validates a correct squad", () => {
            const result = validateSquad(mockSquad);
            expect(result.valid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it("fails if units are missing", () => {
            const result = validateSquad({ ...mockSquad, secondary: null });
            expect(result.valid).toBe(false);
            expect(result.errors).toContain("Squad must have a Secondary unit.");
        });

        it("fails if SP cost exceeds allowance", () => {
            const result = validateSquad({ ...mockSquad, support: mockSupportExpensive });
            // 4 + 5 = 9 > 8
            expect(result.valid).toBe(false);
            expect(result.errors).toContain("Squad points exceeded (9/8).");
        });

        it("fails if eras do not match primary", () => {
            const result = validateSquad({ ...mockSquad, secondary: mockSecondaryWrongEra });
            expect(result.valid).toBe(false);
            expect(result.errors).toContain("Secondary unit must share an era with the Primary unit.");
        });
    });

    describe("validateStrikeTeam", () => {
        it("fails if unique names are duplicated", () => {
            // Two squads with same Primary
            const squad1 = { ...mockSquad, id: "1" };
            const squad2 = { ...mockSquad, id: "2" }; // Same unit objects = same names
            
            const result = validateStrikeTeam([squad1, squad2]);
            expect(result.valid).toBe(false);
            expect(result.errors).toContain("Duplicate unique unit: General Kenobi");
        });
    });
});
