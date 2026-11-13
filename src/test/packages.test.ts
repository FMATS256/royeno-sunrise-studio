import { describe, expect, it } from "vitest";
import { servicePackages, packageTotal, packageSearch } from "@/lib/packages";

describe("Royeno service packages", () => {
  it.each(["3KVA System", "4.2KVA System", "6.2KVA System", "11.2KVA System", "20KVA System"])("includes requested solar size %s", (name) => {
    expect(servicePackages.find((pkg) => pkg.name === name)?.category).toBe("Solar");
  });
  it("offers borehole packages", () => {
    expect(servicePackages.filter((pkg) => pkg.category === "Borehole").length).toBeGreaterThan(0);
  });
  it("offers Starlink packages", () => {
    expect(servicePackages.filter((pkg) => pkg.category === "Starlink").length).toBeGreaterThan(0);
  });
  it("does not invent totals for packages without a price", () => {
    const pkg = servicePackages.find((item) => item.id === "solar-20");
    if (!pkg) throw new Error("20KVA package missing");
    expect(packageTotal(pkg, true, true)).toBeNull();
  });
  it("preserves the existing 4.2KVA demo total", () => {
    const pkg = servicePackages.find((item) => item.id === "solar-4-2");
    if (!pkg) throw new Error("4.2KVA package missing");
    expect(packageTotal(pkg, true, true)).toBe(1200);
  });
  it("keeps a valid selected package in quotation navigation", () => {
    expect(packageSearch({ package: "starlink-kit" })).toEqual({ package: "starlink-kit" });
    expect(packageSearch({ package: "invalid" })).toEqual({});
  });
});