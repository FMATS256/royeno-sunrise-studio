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

        <div className="no-scrollbar mt-4 flex gap-1 overflow-x-auto pb-1" aria-label="Product category">
          {cats.map((c) => (
            <Button variant={cat === c ? "default" : "ghost"} size="sm"
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`min-h-11 shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition ${
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
            <div key={p.name} className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 rounded-xl border bg-card p-3 shadow-card min-[375px]:grid-cols-[88px_minmax(0,1fr)]">
              <img src={p.img} alt={p.name} loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-sm font-bold leading-snug">{p.name}</p>
                <p className="text-[11px] text-muted-foreground">{p.sub}</p>
                <p className="mt-1 text-lg font-bold text-primary">${p.price.toLocaleString()}</p>
                <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-sun text-sun" />
                  {p.rating}
                </p>
                <Button variant="secondary"
                  onClick={() => toast.success(`${p.name} added to enquiry`)}
                  className="mt-2 h-auto min-h-11 whitespace-normal rounded-lg py-2 text-xs font-bold shadow-sun"
                >
                  Add to Enquiry
                </Button>
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
