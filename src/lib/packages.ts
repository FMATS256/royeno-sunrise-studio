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
export type PackageDetails = {
  overview: string;
  powers: string[];
  specs: { label: string; value: string }[];
  included: string[];
  warranty: string;
};

const solarSpecs: Record<string, [string, string, string, string[]]> = {
  "solar-1": ["1 kVA", "2.5 kWh", "2 × 550W", ["Lights", "TV", "Wi-Fi router", "Phone charging"]],
  "solar-3": ["3 kVA", "5 kWh", "4 × 550W", ["Lights", "Fridge", "TV", "Laptops", "Wi-Fi"]],
  "solar-3-5": ["3.5 kVA", "5 kWh", "6 × 550W", ["Lights", "Fridge", "TV", "Laptops", "Small pump"]],
  "solar-4-2": ["4.2 kVA", "5–10 kWh", "8 × 550W", ["Lights", "Fridge & freezer", "TV", "Microwave", "Borehole pump"]],
  "solar-6-2": ["6.2 kVA", "10 kWh", "10 × 550W", ["Whole home", "Borehole pump", "Microwave", "Kettle", "Iron"]],
  "solar-11": ["11 kVA", "15 kWh", "16 × 550W", ["Office or shop", "Air conditioning", "Pumps", "Heavy appliances"]],
  "solar-11-2": ["11.2 kVA", "15 kWh", "18 × 550W", ["Large home", "Air conditioning", "Borehole pump", "Geyser timer"]],
  "solar-20": ["20 kVA", "30 kWh", "32 × 550W", ["Commercial site", "Machinery", "Cold rooms", "Multiple offices"]],
  "solar-custom": ["Sized to you", "Sized to you", "Sized to you", ["Whatever you need — we assess your site"]],
};

export function packageDetails(pkg: ServicePackage): PackageDetails {
  if (pkg.category === "Solar") {
    const [inv, bat, pv, powers] = solarSpecs[pkg.id] ?? solarSpecs["solar-custom"]!;
    return {
      overview: `A complete ${pkg.name.replace(" System", "")} solar backup for ${pkg.note.toLowerCase()} — clean, quiet power through load-shedding, day and night.`,
      powers,
      specs: [
        { label: "Inverter", value: inv },
        { label: "Lithium battery", value: bat },
        { label: "Solar panels", value: pv },
        { label: "Output", value: "Pure sine wave" },
      ],
      included: ["Hybrid inverter", "Lithium battery", "Mono solar panels", "Mounting rails", "DC & AC surge protection", "Changeover switch", "Certified installation"],
      warranty: "5-year inverter • 10-year battery • 25-year panels",
    };
  }
  if (pkg.category === "Borehole") {
    return {
      overview: "Reliable water for your home, farm or business, powered by the sun — no fuel and no electricity bills.",
      powers: ["Household water", "Garden irrigation", "Livestock", "Water tanks"],
      specs: [
        { label: "Pump", value: "Solar submersible" },
        { label: "Depth", value: "Up to 120 m" },
        { label: "Controller", value: "MPPT pump drive" },
        { label: "Tank", value: "Optional 5,000 L" },
      ],
      included: pkg.id === "borehole-install"
        ? ["Site survey", "Drilling & casing", "Solar pump & panels", "Tank stand", "Plumbing", "Commissioning"]
        : ["Solar pump", "Solar panels", "Pump controller", "Cabling", "Installation"],
      warranty: "2-year pump • 25-year panels",
    };
  }
  return {
    overview: "High-speed satellite internet anywhere in Zimbabwe — perfect for homes, farms and remote offices.",
    powers: ["Streaming", "Video calls", "Remote work", "Smart devices"],
    specs: [
      { label: "Speed", value: "Up to 200 Mbps" },
      { label: "Coverage", value: "Nationwide" },
      { label: "Power", value: "Solar-ready" },
      { label: "Setup", value: pkg.id === "starlink-install" ? "Professional" : "Self-install" },
    ],
    included: pkg.id === "starlink-install"
      ? ["Starlink kit", "Pole or wall mount", "Cable routing", "Wi-Fi setup", "Activation help"]
      : ["Starlink dish", "Router", "Cables", "Base stand"],
    warranty: "1-year equipment warranty",
  };
}
