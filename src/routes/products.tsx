import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Star } from "lucide-react";
import { toast } from "sonner";
import { BottomNav, Phone, TopBar } from "@/components/AppShell";
import inverter from "@/assets/inverter.jpg";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Our Products — Royeno Solartech" }, { name: "description", content: "Inverters, batteries and solar panels." }, { property: "og:title", content: "Our Products — Royeno Solartech" }, { property: "og:description", content: "Shop solar equipment." }] }),
  component: Products,
});

const items = [
  { name: "Growatt 5KVA Inverter", sub: "Pure Sine Wave Inverter", price: 650, rating: "4.8 (120)", cat: "Inverters" },
  { name: "Lithium Battery 5kWh", sub: "Long Life Battery", price: 1200, rating: "4.8 (85)", cat: "Batteries" },
  { name: "550W Mono Panel", sub: "High Efficiency Panel", price: 180, rating: "4.7 (64)", cat: "Panels" },
];

function Products() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = items.filter((i) => (cat === "All" || i.cat === cat) && i.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <Phone>
      <TopBar title="Our Products" />
      <div className="flex-1 px-5 py-5">
        <label className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3"><Search className="h-5 w-5 text-muted-foreground" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..." className="flex-1 bg-transparent outline-none" /></label>
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {["All", "Inverters", "Batteries", "Panels"].map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-1.5 text-sm font-medium ${cat === c ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-4 space-y-4">
          {list.map((p) => (
            <div key={p.name} className="flex gap-4 rounded-2xl bg-card p-3 shadow-card">
              <img src={inverter} alt={p.name} loading="lazy" className="h-28 w-24 rounded-xl object-cover" />
              <div className="flex flex-1 flex-col">
                <p className="font-bold">{p.name}</p><p className="text-xs text-muted-foreground">{p.sub}</p>
                <p className="mt-1 text-lg font-bold">${p.price.toLocaleString()}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3.5 w-3.5 fill-secondary text-secondary" />{p.rating}</p>
                <button onClick={() => toast.success(`${p.name} added to enquiry`)} className="mt-auto rounded-lg bg-secondary py-2 text-sm font-semibold text-secondary-foreground">Add to Enquiry</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </Phone>
  );
}
