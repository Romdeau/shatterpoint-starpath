import { expect, test } from "bun:test";
import { validate } from "jsonschema";

import unitSchema from "./schema.json";
import missionSchema from "./mission_schema.json";

import units from "./units.json";
import missions from "./missions.json";

test("units.json matches unit schema", () => {
  units.forEach(unit => {
    const result = validate(unit, unitSchema);
    if (!result.valid) {
      console.error(`Validation failed for unit: ${unit.name}`);
      console.error(result.errors);
    }
    expect(result.valid).toBe(true);
  });
});

test("missions.json matches mission schema", () => {
  missions.forEach(mission => {
    const result = validate(mission, missionSchema);
    if (!result.valid) {
      console.error(`Validation failed for mission: ${mission.name}`);
      console.error(result.errors);
    }
    expect(result.valid).toBe(true);
  });
});
