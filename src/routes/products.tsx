import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Star } from "lucide-react";
import { toast } from "sonner";
import { BottomNav, Phone, TopBar } from "@/components/AppShell";
import inverter from "@/assets/inverter.jpg";
import battery from "@/assets/battery.jpg";
import panel from "@/assets/panel.jpg";
import { PackageCatalog } from "@/components/PackageCatalog";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Our Products — Royeno Solartech" },
      { name: "description", content: "Inverters, batteries and solar panels." },
      { property: "og:title", content: "Our Products — Royeno Solartech" },
      { property: "og:description", content: "Shop solar equipment." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Products,
});

const items = [
  { name: "Growatt 5KVA Inverter", sub: "Pure Sine Wave Inverter", price: 650, rating: "4.8 (120)", cat: "Inverters", img: inverter },
  { name: "Lithium Battery 5kWh", sub: "Long Life Battery", price: 1200, rating: "4.8 (85)", cat: "Batteries", img: battery },
  { name: "550W Mono Panel", sub: "High Efficiency Panel", price: 180, rating: "4.7 (64)", cat: "Panels", img: panel },
];

const cats = ["All", "Solar", "Borehole", "Starlink", "Inverters", "Batteries", "Panels"];

function Products() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = items.filter((i) => (cat === "All" || i.cat === cat) && i.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <Phone>
      <TopBar title="Products & Packages" subtitle="Solar • Borehole • Starlink" />
      <div className="flex-1 px-5 py-5">
        <label className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3.5 shadow-card transition focus-within:border-primary/45 focus-within:ring-4 focus-within:ring-primary/10">
          <Search className="h-4.5 w-4.5 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-1">
          {cats.map((c) => (
            <Button variant="ghost" size="sm"
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`rounded-full py-2 text-xs font-bold transition ${
                cat === c ? "bg-navy text-primary-foreground shadow-card" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {c}
            </Button>
          ))}
        </div>

        <div className="mt-4 space-y-3.5">
          {(cat === "All" || cat === "Solar" || cat === "Borehole" || cat === "Starlink") && <PackageCatalog category={cat === "All" ? undefined : cat} query={q} />}
          {list.map((p) => (
            <div key={p.name} className="flex gap-3.5 rounded-3xl border bg-card p-3 shadow-card">
              <img src={p.img} alt={p.name} loading="lazy" className="h-28 w-24 shrink-0 rounded-2xl object-cover" />
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="truncate text-sm font-bold">{p.name}</p>
                <p className="text-[11px] text-muted-foreground">{p.sub}</p>
                <p className="mt-1 text-lg font-bold text-primary">${p.price.toLocaleString()}</p>
                <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-sun text-sun" />
                  {p.rating}
                </p>
                <button
                  onClick={() => toast.success(`${p.name} added to enquiry`)}
                  className="bg-sun mt-auto rounded-xl py-2 text-xs font-bold text-secondary-foreground shadow-sun transition hover:brightness-110 active:scale-[0.98]"
                >
                  Add to Enquiry
                </button>
              </div>
            </div>
          ))}
          {list.length === 0 && !["All", "Solar", "Borehole", "Starlink"].includes(cat) && (
            <p className="rounded-2xl border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
              No products match “{q}”.
            </p>
          )}
        </div>
      </div>
      <BottomNav />
    </Phone>
  );
}
