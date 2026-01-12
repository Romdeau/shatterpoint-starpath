import { expect, test, describe } from "bun:test";
import { UnitCard } from "./UnitCard";
import React from "react";

import { Unit } from "../types/unit";



// Mock unit data

const mockUnit: Unit = {

  name: "Lord Maul",

  type: "Primary",

  points: 8,

  stamina: 11,

  durability: 2,

  eras: ["Clone Wars"],

  keywords: ["Sith"],

  abilityIds: [],

  stanceIds: []

};



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
