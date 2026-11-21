import { describe, it, expect } from "vitest";
import { exportSquadToBase64, importSquadFromBase64 } from "./sharing";
import type { Squad } from "../context/SquadContext";
import type { Unit } from "../types/unit";

const mockUnit: Unit = {
    name: "Test Unit",
    type: "Primary",
    points: 8,
    force: 0,
    stamina: 0,
    durability: 0,
    eras: [],
    keywords: [],
    abilityIds: [],
    stanceIds: [],
    image: "placeholder",
};

const mockSquad: Squad = {
    id: "test-id",
    primary: mockUnit,
    secondary: null,
    support: null
};

const findUnit = (name: string) => {
    if (name === "Test Unit") return mockUnit;
    return undefined;
};

describe("Sharing Logic", () => {
    it("can round-trip a squad", () => {
        const b64 = exportSquadToBase64(mockSquad);
        expect(typeof b64).toBe("string");
        expect(b64.length).toBeGreaterThan(0);

        const imported = importSquadFromBase64(b64, findUnit);
        expect(imported).not.toBeNull();
        expect(imported?.primary?.name).toBe("Test Unit");
    });
});

it('round-trips Unicode unit names', () => {
  const unit = { ...mockUnit, name: 'Élite Jedi' };
  const code = exportSquadToBase64({ ...mockSquad, primary: unit });
  expect(importSquadFromBase64(code, name => name === unit.name ? unit : undefined)?.primary?.name).toBe(unit.name);
});
it('rejects unknown units, wrong slots and non-object payloads', () => {
  for (const value of [{ p: 'Unknown' }, { s: 'Test Unit' }, [], null, { p: 42 }, { primary: 'Test Unit' }]) {
    expect(importSquadFromBase64(btoa(JSON.stringify(value)), findUnit)).toBeNull();
  }
});

it('imports legacy Latin-1 codes with accented unit names', () => {
  const unit = { ...mockUnit, name: 'Queen Padmé Amidala' };
  const find = (name: string) => name === unit.name ? unit : undefined;
  expect(importSquadFromBase64(btoa(JSON.stringify({ p: unit.name })), find)?.primary?.name).toBe(unit.name);
  expect(importSquadFromBase64(btoa(JSON.stringify({ s: unit.name })), find)).toBeNull();
});
