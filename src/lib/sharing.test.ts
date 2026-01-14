import { describe, it, expect } from "bun:test";
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
        expect(b64).toBeString();
        expect(b64.length).toBeGreaterThan(0);

        const imported = importSquadFromBase64(b64, findUnit);
        expect(imported).not.toBeNull();
        expect(imported?.primary?.name).toBe("Test Unit");
    });
});
