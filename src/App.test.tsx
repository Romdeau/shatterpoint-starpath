import { expect, test, describe } from "bun:test";
import React from "react";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>");
global.document = dom.window.document;
global.window = dom.window as any;
global.navigator = dom.window.navigator;

// Mock localStorage
const storage: Record<string, string> = {};
global.localStorage = {
    getItem: (key: string) => storage[key] || null,
    setItem: (key: string, value: string) => { storage[key] = value },
    clear: () => { Object.keys(storage).forEach(k => delete storage[k]) },
    removeItem: (key: string) => { delete storage[key] },
    length: 0,
    key: () => null
} as any;

// Import testing library after global setup
import { render, within } from "@testing-library/react";
import App from "./App";
import { SquadProvider } from "./context/SquadContext";
import { ThemeProvider } from "./context/ThemeContext";

describe("App Disclaimer", () => {
  test("contains the community tool disclaimer", () => {
    render(
        <ThemeProvider>
            <SquadProvider>
                <App />
            </SquadProvider>
        </ThemeProvider>
    );
    const disclaimer = within(document.body).getByText(/Community tool \/\/ Not affiliated with Atomic Mass Games/i);
    expect(disclaimer).not.toBeNull();
  });
});
