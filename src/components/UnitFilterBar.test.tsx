import { expect, test, describe } from "vitest";



import { render, within, fireEvent } from "@testing-library/react";
import { UnitFilterBar } from "./UnitFilterBar";

describe("UnitFilterBar", () => {
  const mockFilters = {};
  const mockOnFilterChange = () => { };
  const mockKeywords = ["Bounty Hunter", "Scoundrel"];

  test("renders search input", () => {
    render(
      <UnitFilterBar
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
        availableKeywords={mockKeywords}
      />
    );
    const searchInput = within(document.body).queryByPlaceholderText(/SEARCH UNIT REGISTRY.../i);
    expect(searchInput).not.toBeNull();
  });

  test("renders keyword badges in popover", () => {
    render(
      <UnitFilterBar
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
        availableKeywords={mockKeywords}
      />
    );

    // Open the popover first
    const addButton = within(document.body).getByText(/\+ ADD FILTERS/i);
    fireEvent.click(addButton);

    // Badges should now be visible in the popover
    const badge = within(document.body).queryByText(/Bounty Hunter/i);
    expect(badge).not.toBeNull();
  });
});
