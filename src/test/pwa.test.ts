import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const manifest = JSON.parse(readFileSync("public/manifest.webmanifest", "utf8"));

describe("Home-screen app launch", () => {
  it("starts at the splash page instead of skipping to login or home", () => {
    expect(manifest.start_url).toBe("/");
  });
  it("opens as a standalone installed app", () => {
    expect(manifest.display).toBe("standalone");
  });
});