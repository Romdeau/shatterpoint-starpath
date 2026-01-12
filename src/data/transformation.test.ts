import { expect, test } from "bun:test";
import schema from "./schema.json";
import { validate } from "jsonschema";

// Mock transformation function based on the strategy
function transform(externalData: any) {
  return {
    name: externalData.name,
    type: externalData.type,
    points: externalData.points,
    force: externalData.force,
    health: externalData.stamina, // Map stamina to health
    keywords: externalData.tags,
    abilities: (externalData.abilities || []).map((a: any) => ({
      name: a.name,
      type: a.type,
      cost: a.cost || 0,
      description: a.text
    }))
  };
}

const mockExternalUnit = {
  name: "Captain Rex",
  type: "Secondary",
  points: 4,
  stamina: 9,
  tags: ["501st", "Clone Trooper", "Galactic Republic"],
  abilities: [
    {
      name: "Get Down!",
      type: "Reactive",
      cost: 1,
      text: "When a character in this unit or a nearby Allied unit is targeted..."
    }
  ]
};

test("transformation produces valid unit", () => {
  const transformed = transform(mockExternalUnit);
  const result = validate(transformed, schema);
  expect(result.valid).toBe(true);
});
