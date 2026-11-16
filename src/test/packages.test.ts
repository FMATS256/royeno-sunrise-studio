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
  it("keeps a valid selected package in quotation navigation", () => {
    expect(packageSearch({ package: "starlink-kit" })).toEqual({ package: "starlink-kit" });
    expect(packageSearch({ package: "invalid" })).toEqual({});
  });
});

describe("installation-inclusive flyer prices", () => {
  it.each([["solar-1",580],["solar-3-5",1200],["solar-6-2",1800],["solar-10-2",3900]])("%s costs %d installed, with no add-ons", (id, price) => {
    const pkg = servicePackages.find((p) => p.id === id)!;
    expect(packageTotal(pkg, false, false)).toBe(price);
  });
});
