import React from "react";
import { expect, test, describe } from "vitest";
import { UnitCard } from "./UnitCard";
import { render } from "@testing-library/react";
import type { Unit } from "../types/unit";



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