import { expect, test, describe } from "vitest";





// Import testing library after global setup
import { render, within } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { SquadProvider } from "./context/SquadContext";
import { ThemeProvider } from "./context/ThemeContext";

describe("App", () => {
  test("contains the community tool disclaimer", () => {
    render(
        <ThemeProvider>
            <SquadProvider>
                <MemoryRouter initialEntries={["/shatterpoint-starpath/"]}><App /></MemoryRouter>
            </SquadProvider>
        </ThemeProvider>
    );
    const disclaimer = within(document.body).getByText(/Community tool \/\/ Not affiliated with Atomic Mass Games/i);
    expect(disclaimer).not.toBeNull();
  });
});
