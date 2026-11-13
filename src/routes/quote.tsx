import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Sun } from "lucide-react";
import { toast } from "sonner";
import { BottomNav, Phone, PrimaryBtn, TopBar } from "@/components/AppShell";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Quotation — Royeno Solartech" },
      { name: "description", content: "Pick a solar package and get an instant quote." },
      { property: "og:title", content: "Get a Quotation — Royeno Solartech" },
      { property: "og:description", content: "Instant solar quotes." },
    ],
  }),
  component: Quote,
});

const pkgs = [
  { name: "3.5KVA System", price: 750, note: "Ideal for homes" },
  { name: "4.2KVA System", price: 850, note: "For larger homes" },
  { name: "11KVA System", price: 1650, note: "Commercial use" },
];

const steps = ["Configure", "Review", "Confirm"];

function Quote() {
  const [sel, setSel] = useState(0);
  const [battery, setBattery] = useState(true);
  const [install, setInstall] = useState(true);
  const total = (pkgs[sel]?.price ?? 0) + (battery ? 200 : 0) + (install ? 150 : 0);

  return (
    <Phone>
      <TopBar title="Get a Quotation" subtitle="Build your system in seconds" />
      <div className="flex-1 px-5 py-5">
        {/* stepper */}
        <div className="relative flex items-start justify-between">
          <span className="absolute top-3.5 right-6 left-6 h-0.5 bg-border" />
          {steps.map((s, i) => (
            <div key={s} className="relative z-10 flex flex-1 flex-col items-center gap-1.5">
              <span
                className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold transition ${
                  i === 0 ? "bg-navy text-primary-foreground ring-4 ring-secondary/30" : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </span>
              <span className={`text-[11px] ${i === 0 ? "font-bold text-primary" : "text-muted-foreground"}`}>{s}</span>
            </div>
          ))}
        </div>

        <h2 className="mt-6 text-sm font-bold tracking-tight">Select Package</h2>
        <p className="text-xs text-muted-foreground">Choose a solar package</p>
        <div className="mt-3 space-y-2.5">
          {pkgs.map((p, i) => {
            const on = sel === i;
            return (
              <button
                key={p.name}
                onClick={() => setSel(i)}
                aria-pressed={on}
                className={`flex w-full items-center gap-3.5 rounded-2xl border-2 bg-card p-3.5 text-left transition ${
                  on ? "border-secondary bg-secondary/8 shadow-card" : "border-border hover:border-primary/25"
                }`}
              >
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition ${on ? "bg-sun text-secondary-foreground" : "bg-accent text-primary"}`}>
                  <Sun className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold">{p.name}</span>
                  <span className="block text-lg font-bold text-primary">${p.price.toLocaleString()}</span>
                  <span className="block text-[11px] text-muted-foreground">{p.note}</span>
                </span>
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition ${on ? "bg-primary text-primary-foreground" : "border-2 border-border"}`}>
                  {on && <Check className="h-3.5 w-3.5" />}
                </span>
              </button>
            );
          })}
        </div>

        <h2 className="mt-6 text-sm font-bold tracking-tight">Battery Option</h2>
        <div className="mt-2 flex items-center justify-between rounded-2xl border bg-card px-4 py-3.5 shadow-card">
          <span className="text-sm font-semibold">
            Lithium Battery <span className="font-normal text-muted-foreground">(Recommended)</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="text-sm font-bold text-primary">+ $200</span>
            <button
              aria-label="Toggle battery"
              aria-pressed={battery}
              onClick={() => setBattery(!battery)}
              className={`relative h-6 w-11 rounded-full transition ${battery ? "bg-success" : "bg-border"}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-all ${battery ? "left-5.5" : "left-0.5"}`} />
            </button>
          </span>
        </div>

        <h2 className="mt-6 text-sm font-bold tracking-tight">Installation</h2>
        <div className="mt-2 space-y-2">
          {[
            [true, "Include Installation", "+ $150"],
            [false, "Supply Only", ""],
          ].map(([v, l, p]) => (
            <button
              key={l as string}
              onClick={() => setInstall(v as boolean)}
              aria-pressed={install === v}
              className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                install === v ? "border-primary/35 bg-accent font-semibold" : "border-border bg-card hover:border-primary/20"
              }`}
            >
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${install === v ? "border-primary" : "border-border"}`}>
                {install === v && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
              </span>
              <span className="flex-1 text-left">{l as string}</span>
              <span className="font-bold text-primary">{p as string}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-navy px-4 py-4 text-primary-foreground shadow-lift">
          <span className="text-xs font-semibold tracking-wide uppercase">Estimated total</span>
          <span className="text-2xl font-bold">${total.toLocaleString()}</span>
        </div>
        <div className="mt-4">
          <PrimaryBtn variant="orange" onClick={() => toast.success(`Quote sent: $${total.toLocaleString()}`)}>
            Calculate Quote
          </PrimaryBtn>
        </div>
      </div>
      <BottomNav />
    </Phone>
  );
}
