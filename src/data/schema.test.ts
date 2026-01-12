import { expect, test } from "bun:test";
import schema from "./schema.json";
import { validate } from "jsonschema"; // I'll need to install this or use a similar approach

const sampleUnit = {
  name: "Kalani, Super Tactical Droid",
  type: "Primary",
  points: 4,
  health: 10,
  keywords: ["Droid", "Separatist"],
  abilities: []
};

test("sample unit matches schema", () => {
  const result = validate(sampleUnit, schema);
  expect(result.valid).toBe(true);
});
