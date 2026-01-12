import { describe, it, expect } from "bun:test";
import { transformUnit, transformAbility } from "./transformer";
import { validate } from "jsonschema";
import unitSchema from "./schema.json";
import abilitySchema from "./ability_schema.json";

describe("Transformer", () => {
  const mockExternalAbility = {
    name: "Tactical Maneuver",
    type: "Active",
    cost: 1,
    text: "Each character in this unit may dash.",
  };

  const mockExternalUnit = {
    name: "Captain Rex",
    type: "Secondary",
    points: 4,
    stamina: 9,
    durability: 2,
    eras: ["Clone Wars"],
    tags: ["501st", "Clone Trooper", "Galactic Republic"],
    abilities: [mockExternalAbility],
  };

  it("should transform an external ability correctly", () => {
    const transformed = transformAbility(mockExternalAbility);
    expect(transformed.name).toBe("Tactical Maneuver");
    expect(transformed.type).toBe("Active");
    expect(transformed.cost).toBe(1);
    expect(transformed.description).toBe("Each character in this unit may dash.");
    
    const result = validate(transformed, abilitySchema);
    expect(result.valid).toBe(true);
  });

  it("should transform an external unit correctly", () => {
    const transformed = transformUnit(mockExternalUnit);
    expect(transformed.name).toBe("Captain Rex");
    expect(transformed.type).toBe("Secondary");
    expect(transformed.points).toBe(4);
    expect(transformed.stamina).toBe(9);
    expect(transformed.durability).toBe(2);
    expect(transformed.keywords).toContain("501st");
    expect(transformed.abilityIds).toHaveLength(1);
    
    const result = validate(transformed, unitSchema);
    expect(result.valid).toBe(true);
  });
});
