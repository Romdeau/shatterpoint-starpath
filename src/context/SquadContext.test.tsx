import { describe, it, expect } from "bun:test";
import { JSDOM } from "jsdom";
import { renderHook, act } from "@testing-library/react";
import { SquadProvider, useSquad } from "./SquadContext";
import { Unit } from "../types/unit";

const dom = new JSDOM("<!doctype html><html><body></body></html>");
global.document = dom.window.document;
global.window = dom.window as any;
global.navigator = dom.window.navigator;

// Mock Unit
const mockPrimary: Unit = {
  name: "Jedi Master",
  type: "Primary",
  points: 0,
  force: 4,
  stamina: 10,
  durability: 3,
  eras: ["Clone Wars"],
  keywords: ["Jedi"],
  abilityIds: [],
  stanceIds: [],
};

// Setup JSDOM for this test file since bun test doesn't auto-inject it
// Actually, bun might need a specific setup.
// If this fails, I will add a proper setup file reference or global.
// For now, let's try standard library usage.

describe("SquadContext", () => {
  it("provides initial empty state", () => {
    // We need a DOM for renderHook
    const { result } = renderHook(() => useSquad(), {
        wrapper: SquadProvider
    });
    expect(result.current.squads).toEqual([]);
  });

  it("can add a squad", () => {
      const { result } = renderHook(() => useSquad(), {
          wrapper: SquadProvider
      });
      
      act(() => {
          result.current.addSquad();
      });

      expect(result.current.squads.length).toBe(1);
      expect(result.current.squads[0].id).toBeDefined();
  });

  it("can set a unit in a squad", () => {
      const { result } = renderHook(() => useSquad(), {
          wrapper: SquadProvider
      });
      
      act(() => {
          result.current.addSquad();
      });
      
      const squadId = result.current.squads[0].id;
      act(() => {
          result.current.updateSquadUnit(squadId, "primary", mockPrimary);
      });
      expect(result.current.squads[0].primary).toEqual(mockPrimary);
  });

  it("can remove a squad", () => {
    const { result } = renderHook(() => useSquad(), {
        wrapper: SquadProvider
    });
    
    act(() => {
        result.current.addSquad();
    });
    
    const squadId = result.current.squads[0].id;

    act(() => {
        result.current.removeSquad(squadId);
    });

    expect(result.current.squads.length).toBe(0);
  });
});
