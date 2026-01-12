import { expect, test } from "bun:test";
import { validate } from "jsonschema";

import unitSchema from "./schema.json";
import abilitySchema from "./ability_schema.json";
import stanceSchema from "./stance_schema.json";

import sampleUnit from "./sample_unit.json";
import sampleAbilities from "./sample_abilities.json";
import sampleStances from "./sample_stances.json";

test("sample_unit.json matches unit schema", () => {
  const result = validate(sampleUnit, unitSchema);
  expect(result.valid).toBe(true);
});

test("sample_abilities.json matches ability schema", () => {
  sampleAbilities.forEach(ability => {
    const result = validate(ability, abilitySchema);
    if (!result.valid) console.error(result.errors);
    expect(result.valid).toBe(true);
  });
});

test("sample_stances.json matches stance schema", () => {
  sampleStances.forEach(stance => {
    const result = validate(stance, stanceSchema);
    if (!result.valid) console.error(result.errors);
    expect(result.valid).toBe(true);
  });
});