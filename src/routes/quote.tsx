import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Sun } from "lucide-react";
import { toast } from "sonner";
import { BottomNav, Phone, PrimaryBtn, TopBar } from "@/components/AppShell";

export const Route = createFileRoute("/quote")({
  head: () => ({ meta: [{ title: "Get a Quotation — Royeno Solartech" }, { name: "description", content: "Pick a solar package and get an instant quote." }, { property: "og:title", content: "Get a Quotation — Royeno Solartech" }, { property: "og:description", content: "Instant solar quotes." }] }),
  component: Quote,
});

const pkgs = [
  { name: "3.5KVA System", price: 750, note: "Ideal for homes" },
  { name: "4.2KVA System", price: 850, note: "For larger homes" },
  { name: "11KVA System", price: 1650, note: "Commercial use" },
];

function Quote() {
  const [sel, setSel] = useState(0);
  const [battery, setBattery] = useState(true);
  const [install, setInstall] = useState(true);
  const total = pkgs[sel].price + (battery ? 200 : 0) + (install ? 150 : 0);
  return (
    <Phone>
      <TopBar title="Get a Quotation" />
      <div className="flex-1 px-5 py-5">
        <div className="flex items-center justify-between text-xs">
          {["Configure", "Review", "Confirm"].map((s, i) => (
            <div key={s} className="flex flex-1 flex-col items-center gap-1">
              <span className={`grid h-7 w-7 place-items-center rounded-full font-bold ${i === 0 ? "bg-primary text-primary-foreground ring-4 ring-secondary/40" : "bg-muted text-muted-foreground"}`}>{i + 1}</span>
              <span className={i === 0 ? "font-semibold text-primary" : "text-muted-foreground"}>{s}</span>
            </div>
          ))}
        </div>
        <h2 className="mt-6 font-bold">Select Package</h2>
        <p className="text-sm text-muted-foreground">Choose a solar package</p>
        <div className="mt-3 space-y-3">
          {pkgs.map((p, i) => (
            <button key={p.name} onClick={() => setSel(i)} className={`flex w-full items-center gap-4 rounded-2xl border-2 bg-card p-4 text-left ${sel === i ? "border-secondary bg-secondary/10" : "border-border"}`}>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary/20 text-secondary"><Sun /></span>
              <div className="flex-1"><p className="font-bold">{p.name}</p><p className="text-lg font-bold text-primary">${p.price.toLocaleString()}</p><p className="text-xs text-muted-foreground">{p.note}</p></div>
              {sel === i && <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-4 w-4" /></span>}
            </button>
          ))}
        </div>
        <h2 className="mt-6 font-bold">Battery Option</h2>
        <div className="mt-2 flex items-center justify-between rounded-xl bg-muted px-4 py-3 text-sm">
          <span>Lithium Battery <span className="text-muted-foreground">(Recommended)</span></span>
          <div className="flex items-center gap-3"><span className="font-semibold">+ $200</span>
            <button aria-label="Toggle battery" onClick={() => setBattery(!battery)} className={`relative h-6 w-11 rounded-full transition ${battery ? "bg-success" : "bg-border"}`}><span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card transition ${battery ? "left-5" : "left-0.5"}`} /></button>
          </div>
        </div>
        <h2 className="mt-6 font-bold">Installation</h2>
        {[[true, "Include Installation", "+ $150"], [false, "Supply Only", ""]].map(([v, l, p]) => (
          <button key={l as string} onClick={() => setInstall(v as boolean)} className="mt-2 flex w-full items-center gap-3 text-sm">
            <span className={`h-5 w-5 rounded-full border-2 ${install === v ? "border-primary bg-primary ring-2 ring-inset ring-card" : "border-border"}`} />
            <span className="flex-1 text-left">{l as string}</span><span className="font-semibold">{p as string}</span>
          </button>
        ))}
        <div className="mt-6 flex items-center justify-between rounded-xl bg-accent px-4 py-3"><span className="text-sm">Estimated total</span><span className="text-xl font-bold text-primary">${total.toLocaleString()}</span></div>
        <div className="mt-4"><PrimaryBtn variant="orange" onClick={() => toast.success(`Quote sent: $${total.toLocaleString()}`)}>Calculate Quote</PrimaryBtn></div>
      </div>
      <BottomNav />
    </Phone>
  );
}
