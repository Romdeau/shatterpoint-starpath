import { expect, test, describe } from "bun:test";
import { UnitList } from "./UnitList";
import React from "react";

describe("UnitList", () => {
  test("is a function", () => {
    expect(typeof UnitList).toBe("function");
  });

  test("returns a React element", () => {
    const element = React.createElement(UnitList, { units: [] });
    expect(element).toBeTruthy();
    expect(element.type).toBe(UnitList);
  });
});
