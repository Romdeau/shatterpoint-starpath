import { expect, test } from "bun:test";
import schema from "./schema.json";
import { validate } from "jsonschema"; // I'll need to install this or use a similar approach

import sampleUnitFile from "./sample_unit.json";

test("sample_unit.json matches schema", () => {
  const result = validate(sampleUnitFile, schema);
  expect(result.valid).toBe(true);
});
