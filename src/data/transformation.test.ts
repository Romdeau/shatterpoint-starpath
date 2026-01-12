import { expect, test } from "bun:test";
import schema from "./schema.json";
import { validate } from "jsonschema";

// Updated Mock transformation function
function transform(externalData: any) {
  return {
    name: externalData.name,
    type: externalData.type,
    points: externalData.points,
    force: externalData.force,
    stamina: externalData.stamina,
    durability: externalData.durability || 1, // Default if missing
    eras: externalData.eras || [],
    keywords: externalData.tags,
    abilityIds: (externalData.abilities || []).map((a: any) => a.id || a.name.toLowerCase().replace(/ /g, "-")),
    stanceIds: [] // Placeholder
  };
}

const mockExternalUnit = {
  name: "Captain Rex",
  type: "Secondary",
  points: 4,
  stamina: 9,
  durability: 2,
  eras: ["Clone Wars"],
  tags: ["501st", "Clone Trooper", "Galactic Republic"],
  abilities: [
    {
      name: "Get Down!",
      type: "Reactive",
      cost: 1,
      text: "When a character in this unit..."
    }
  ]
};

test("transformation produces valid unit", () => {
  const transformed = transform(mockExternalUnit);
  const result = validate(transformed, schema);
  if (!result.valid) console.error(result.errors);
  expect(result.valid).toBe(true);
});