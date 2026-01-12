import { expect, test } from "bun:test";
import { cn } from "./utils";

test("cn merges classes correctly", () => {
  expect(cn("px-2", "py-2")).toBe("px-2 py-2");
  expect(cn("px-2", "px-4")).toBe("px-4");
});
