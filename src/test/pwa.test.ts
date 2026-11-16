import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { installInstructions } from "@/lib/pwa-install";

const manifest = JSON.parse(readFileSync("public/manifest.webmanifest", "utf8"));

describe("Home-screen app launch", () => {
  it("starts at the splash page instead of skipping to login or home", () => {
    expect(manifest.start_url).toBe("/");
  });
  it("opens as a standalone installed app", () => {
    expect(manifest.display).toBe("standalone");
  });
});

describe("Install the app prompt", () => {
  it("tells iPhone users to use Share then Add to Home Screen", () => {
    expect(installInstructions(true)).toContain("Add to Home Screen");
  });
  it("tells other browsers to use the browser menu install option", () => {
    expect(installInstructions(false)).toContain("Install app");
  });
});