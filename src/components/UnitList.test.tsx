import { expect, test, describe } from "vitest";



import { render, within } from "@testing-library/react";
import { UnitList } from "./UnitList";

describe("UnitList", () => {
  test("renders a message when no units are found", () => {
    render(<UnitList units={[]} />);
    const emptyMessage = within(document.body).queryByText(/No tactical units found matching current criteria/i);
    expect(emptyMessage).not.toBeNull();
  });

  test("renders units when provided", () => {
    const mockUnits = [
      {
        name: "Test Unit",
        type: "Primary" as const,
        points: 7,
        stamina: 10,
        durability: 3,
        eras: ["Clone Wars"],
        keywords: ["Jedi"],
        abilityIds: [],
        stanceIds: [],
        image: "placeholder",
      }
    ];
    render(<UnitList units={mockUnits} />);
    const unitName = within(document.body).queryByText(/Test Unit/i);
    expect(unitName).not.toBeNull();
  });
});
