import { expect, test } from "bun:test";
import { existsSync, readFileSync } from "fs";

test("project uses bun.lock and not package-lock.json", () => {
  expect(existsSync("bun.lock")).toBe(true);
  expect(existsSync("package-lock.json")).toBe(false);
});

test("package.json has react 19", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf-8"));
  expect(packageJson.dependencies.react).toMatch(/^\^?19/);
});