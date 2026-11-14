import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Sun, Droplets, Satellite } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { packageCategories, packageSearch, packageTotal, servicePackages, type PackageCategory } from "@/lib/packages";
import { toast } from "sonner";
import { BottomNav, Phone, PrimaryBtn, TopBar } from "@/components/AppShell";

export const Route = createFileRoute("/quote")({
  validateSearch: packageSearch,
  head: () => ({
    meta: [
      { title: "Get a Quotation — Royeno Solartech" },
      { name: "description", content: "Pick a solar package and get an instant quote." },
      { property: "og:title", content: "Get a Quotation — Royeno Solartech" },
      { property: "og:description", content: "Solar, borehole and Starlink package enquiries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Quote,
});

const categoryIcons = { Solar: Sun, Borehole: Droplets, Starlink: Satellite };

const steps = ["Configure", "Review", "Confirm"];

function Quote() {
  const search = Route.useSearch();
  const initial = servicePackages.find((pkg) => pkg.id === search.package) ?? servicePackages.find((pkg) => pkg.id === "solar-3-5") ?? servicePackages[0];
  const [category, setCategory] = useState<PackageCategory>(initial?.category ?? "Solar");
  const [sel, setSel] = useState(initial?.id ?? "solar-3-5");
  const [battery, setBattery] = useState(true);
  const [install, setInstall] = useState(true);
  const selected = servicePackages.find((pkg) => pkg.id === sel);
  const pkgs = servicePackages.filter((pkg) => pkg.category === category);
  const total = selected ? packageTotal(selected, battery, install) : null;
  const Icon = categoryIcons[category];

  return (
    <Phone>
      <TopBar title="Get a Quotation" subtitle="Solar, borehole & Starlink" />
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

        <div className="mt-6 grid grid-cols-3 gap-1 rounded-2xl border bg-card p-1" aria-label="Package category">
          {packageCategories.map((cat) => {
            const CategoryIcon = categoryIcons[cat];
            return <Button key={cat} variant={category === cat ? "default" : "ghost"} size="sm" aria-pressed={category === cat} onClick={() => {
              setCategory(cat);
              const first = servicePackages.find((pkg) => pkg.category === cat);
              if (first) setSel(first.id);
            }} className="min-h-11 min-w-0 gap-1 px-1 text-xs"><CategoryIcon />{cat}</Button>;
          })}
        </div>
        <h2 className="mt-5 text-sm font-bold tracking-tight">Select Package</h2>
        <p className="text-xs text-muted-foreground">Choose a {category.toLowerCase()} package</p>
        <div className="mt-3 grid grid-cols-1 gap-2.5 @min-[600px]:grid-cols-2">
          {pkgs.map((p) => {
            const on = sel === p.id;
            return (
              <Button variant="ghost"
                key={p.name}
                onClick={() => setSel(p.id)}
                aria-pressed={on}
                className={`flex h-auto min-w-0 w-full items-center justify-start gap-3 whitespace-normal rounded-lg border-2 bg-card p-3.5 text-left transition ${
                  on ? "border-secondary bg-secondary/8 shadow-card" : "border-border hover:border-primary/25"
                }`}
              >
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg transition ${on ? "bg-secondary text-secondary-foreground" : "bg-accent text-primary"}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold">{p.name}</span>
                  <span className="block text-base font-bold text-primary">{p.price === null ? "Price on request" : `$${p.price.toLocaleString()}`}</span>
                  <span className="block text-[11px] text-muted-foreground">{p.note}</span>
                </span>
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition ${on ? "bg-primary text-primary-foreground" : "border-2 border-border"}`}>
                  {on && <Check className="h-3.5 w-3.5" />}
                </span>
              </Button>
            );
          })}
        </div>

        {category === "Solar" && <>
        <h2 className="mt-6 text-sm font-bold tracking-tight">Battery Option</h2>
        <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border bg-card px-4 py-3.5 shadow-card">
          <span className="min-w-0 text-sm font-semibold">
            Lithium Battery <span className="block text-xs font-normal text-muted-foreground">Recommended</span>
          </span>
          <span className="flex shrink-0 items-center gap-2">
            <span className="text-sm font-bold text-primary">+ $200</span>
            <Switch aria-label="Toggle battery" checked={battery} onCheckedChange={setBattery} />
          </span>
        </div>

        </>}
        {category === "Solar" && <>
        <h2 className="mt-6 text-sm font-bold tracking-tight">Installation</h2>
        <div className="mt-2 space-y-2">
          {[
            [true, "Include Installation", "+ $150"],
            [false, "Supply Only", ""],
          ].map(([v, l, p]) => (
            <Button variant="ghost"
              key={l as string}
              onClick={() => setInstall(v as boolean)}
              aria-pressed={install === v}
              className={`grid h-auto min-h-12 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 whitespace-normal rounded-xl border px-4 py-3 text-sm transition ${
                install === v ? "border-primary/35 bg-accent font-semibold" : "border-border bg-card hover:border-primary/20"
              }`}
            >
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${install === v ? "border-primary" : "border-border"}`}>
                {install === v && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
              </span>
              <span className="min-w-0 text-left">{l as string}</span>
              <span className="font-bold text-primary">{p as string}</span>
            </Button>
          ))}
        </div>

        </>}
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-center rounded-xl bg-navy px-4 py-4 text-primary-foreground shadow-lift">
          <span className="text-xs font-semibold uppercase">{total === null ? "Quotation" : "Estimated total"}</span>
          <span className="text-right text-lg font-bold">{total === null ? "Price on request" : `$${total.toLocaleString()}`}</span>
        </div>
        <div className="mt-4">
          <PrimaryBtn variant="orange" onClick={() => toast.success(total === null ? `${selected?.name ?? "Package"} added to enquiry` : `Quote sent: $${total.toLocaleString()}`)}>
            {total === null ? "Request Quotation" : "Calculate Quote"}
          </PrimaryBtn>
        </div>
      </div>
      <BottomNav />
    </Phone>
  );
}
