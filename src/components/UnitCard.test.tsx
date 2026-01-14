import { expect, test, describe } from "bun:test";
import { UnitCard } from "./UnitCard";
import React from "react";
import { JSDOM } from "jsdom";
import { render } from "@testing-library/react";
import type { Unit } from "../types/unit";

const dom = new JSDOM("<!doctype html><html><body></body></html>");
global.document = dom.window.document;
global.window = dom.window as any;
global.navigator = dom.window.navigator;

const mockUnit: Unit = {
  name: "Lord Maul",
  type: "Primary",
  points: 8,
  stamina: 11,
  durability: 2,
  eras: ["Clone Wars"],
  keywords: ["Sith"],
  abilityIds: [],
  stanceIds: [],
  image: "placeholder"
};

describe("UnitCard Aesthetic", () => {
  test("renders with tactical data attributes", () => {
    render(<UnitCard unit={mockUnit} />);
    const card = document.querySelector('[data-tactical-frame]');
    expect(card).not.toBeNull();
  });
});

describe("UnitCard", () => {
  test("is a function", () => {
    expect(typeof UnitCard).toBe("function");
  });

  test("returns a React element", () => {
    const element = React.createElement(UnitCard, { unit: mockUnit });
    expect(element).toBeTruthy();
    expect(element.type).toBe(UnitCard);
  });
});