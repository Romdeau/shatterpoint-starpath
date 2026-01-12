import { expect, test } from "bun:test";
import { readFileSync } from "fs";

test("package.json has tailwindcss v4", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf-8"));
  expect(packageJson.devDependencies.tailwindcss).toMatch(/^\^?4/);
});

test("src/index.css has tailwind import", () => {
  const css = readFileSync("src/index.css", "utf-8");
  expect(css).toContain("@import \"tailwindcss\";");
});

