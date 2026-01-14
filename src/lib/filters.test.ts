import { describe, it, expect } from "bun:test";
import { filterUnits, type UnitFilters } from "./filters";
import type { Unit } from "../types/unit";

describe("Filter Utility", () => {
  const mockUnits: Unit[] = [
    {
      name: "General Anakin Skywalker",
      type: "Primary",
      points: 7,
      force: 4,
      stamina: 10,
      durability: 3,
      eras: ["Clone Wars"],
      keywords: ["Jedi", "501st", "Galactic Republic"],
      abilityIds: [],
      stanceIds: [],
      image: "placeholder",
    },
    {
      name: "Captain Rex",
      type: "Secondary",
      points: 4,
      stamina: 9,
      durability: 2,
      eras: ["Clone Wars"],
      keywords: ["501st", "Clone Trooper", "Galactic Republic"],
      abilityIds: [],
      stanceIds: [],
      image: "placeholder",
    },
    {
      name: "B1 Battle Droids",
      type: "Support",
      points: 3,
      stamina: 9,
      durability: 2,
      eras: ["Clone Wars"],
      keywords: ["Droid", "Separatist Alliance"],
      abilityIds: [],
      stanceIds: [],
      image: "placeholder",
    },
  ];

  it("should filter by name (case-insensitive search)", () => {
    const filters: UnitFilters = { search: "Anakin" };
    const result = filterUnits(mockUnits, filters);
    expect(result).toHaveLength(1);
    expect(result[0]!.name).toBe("General Anakin Skywalker");
  });

  it("should filter by unit type", () => {
    const filters: UnitFilters = { type: "Secondary" };
    const result = filterUnits(mockUnits, filters);
    expect(result).toHaveLength(1);
    expect(result[0]!.name).toBe("Captain Rex");
  });

  it("should filter by keyword", () => {
    const filters: UnitFilters = { keywords: ["501st"] };
    const result = filterUnits(mockUnits, filters);
    expect(result).toHaveLength(2);
    expect(result.map(u => u.name)).toContain("General Anakin Skywalker");
    expect(result.map(u => u.name)).toContain("Captain Rex");
  });

  it("should return all units when filters are empty", () => {
    const filters: UnitFilters = {};
    const result = filterUnits(mockUnits, filters);
    expect(result).toHaveLength(3);
  });

  it("should handle multiple filters correctly", () => {
    const filters: UnitFilters = {
      search: "General",
      keywords: ["Jedi"],
      type: "Primary"
    };
    const result = filterUnits(mockUnits, filters);
    expect(result).toHaveLength(1);
    expect(result[0]!.name).toBe("General Anakin Skywalker");
  });

  it("should filter by points", () => {
    const filters: UnitFilters = { points: 4 };
    const result = filterUnits(mockUnits, filters);
    expect(result).toHaveLength(1);
    expect(result[0]!.name).toBe("Captain Rex");
  });
});
