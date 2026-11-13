export type PackageCategory = "Solar" | "Borehole" | "Starlink";

export type ServicePackage = {
  id: string;
  name: string;
  category: PackageCategory;
  note: string;
  price: number | null;
};

// Existing demo prices stay unchanged; new packages await Royeno's prices.
export const servicePackages: ServicePackage[] = [
  { id: "solar-1", name: "1KVA System", category: "Solar", note: "Small home", price: 450 },
  { id: "solar-3", name: "3KVA System", category: "Solar", note: "Solar power package", price: null },
  { id: "solar-3-5", name: "3.5KVA System", category: "Solar", note: "Family home", price: 750 },
  { id: "solar-4-2", name: "4.2KVA System", category: "Solar", note: "Larger home", price: 850 },
  { id: "solar-6-2", name: "6.2KVA System", category: "Solar", note: "Solar power package", price: null },
  { id: "solar-11", name: "11KVA System", category: "Solar", note: "Commercial use", price: 1650 },
  { id: "solar-11-2", name: "11.2KVA System", category: "Solar", note: "Solar power package", price: null },
  { id: "solar-20", name: "20KVA System", category: "Solar", note: "Solar power package", price: null },
  { id: "solar-custom", name: "Custom Solar System", category: "Solar", note: "Other sizes on request", price: null },
  { id: "borehole-pump", name: "Solar Borehole Pumping", category: "Borehole", note: "Solar-powered water pumping", price: null },
  { id: "borehole-install", name: "Complete Borehole Package", category: "Borehole", note: "Borehole installation enquiry", price: null },
  { id: "starlink-kit", name: "Starlink Kit", category: "Starlink", note: "Satellite internet equipment", price: null },
  { id: "starlink-install", name: "Starlink & Installation", category: "Starlink", note: "Equipment and setup enquiry", price: null },
];

export const packageCategories: PackageCategory[] = ["Solar", "Borehole", "Starlink"];

export function packageTotal(pkg: ServicePackage, battery: boolean, installation: boolean): number | null {
  if (pkg.price === null) return null;
  return pkg.price + (pkg.category === "Solar" && battery ? 200 : 0) + (installation ? 150 : 0);
}

export function packageSearch(search: Record<string, unknown>): { package?: string } {
  return typeof search['package'] === "string" && servicePackages.some((pkg) => pkg.id === search['package'])
    ? { package: search['package'] }
    : {};
}