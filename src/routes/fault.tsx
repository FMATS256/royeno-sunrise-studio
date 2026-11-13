import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, ChevronDown, MapPin, Zap } from "lucide-react";
import { toast } from "sonner";
import { Phone, PrimaryBtn, TopBar } from "@/components/AppShell";

export const Route = createFileRoute("/fault")({
  head: () => ({
    meta: [
      { title: "Report a Fault — Royeno Solartech" },
      { name: "description", content: "Report a problem with your solar system." },
      { property: "og:title", content: "Report a Fault — Royeno Solartech" },
      { property: "og:description", content: "Fast solar support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Fault,
});

function Fault() {
  const navigate = useNavigate();
  return (
    <Phone>
      <TopBar title="Report a Fault" subtitle="We respond within 2 hours" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Fault reported — ticket #RST-2025-00124");
          navigate({ to: "/tickets" });
        }}
        className="flex flex-1 flex-col px-5 py-5"
      >
        <h2 className="text-base font-bold tracking-tight">Tell us about the problem</h2>

        <label className="mt-4 text-xs font-bold tracking-wide uppercase">Fault Category</label>
        <div className="mt-1.5 flex items-center gap-3 rounded-2xl border bg-card px-4 py-3.5 transition focus-within:border-primary/45 focus-within:ring-4 focus-within:ring-primary/10">
          <Zap className="h-5 w-5 shrink-0 text-secondary" />
          <select className="min-w-0 flex-1 appearance-none bg-transparent text-sm outline-none">
            <option>Inverter Problems</option>
            <option>Battery Problems</option>
            <option>Panel Damage</option>
            <option>Other</option>
          </select>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        </div>

        <label className="mt-4 text-xs font-bold tracking-wide uppercase">Description</label>
        <textarea
          rows={3}
          defaultValue="Inverter not powering the house..."
          className="mt-1.5 resize-none rounded-2xl border bg-card px-4 py-3.5 text-sm outline-none transition focus:border-primary/45 focus:ring-4 focus:ring-primary/10"
        />

        <label className="mt-4 flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-primary/25 bg-accent/60 py-5 text-center transition hover:border-primary/50 hover:bg-accent">
          <Camera className="h-6 w-6 text-primary" />
          <span className="text-sm leading-tight">
            <span className="font-bold text-primary">Upload Photos</span>
            <span className="block text-[11px] text-muted-foreground">Take or select from gallery</span>
          </span>
          <input type="file" accept="image/*" className="hidden" />
        </label>

        <label className="mt-4 text-xs font-bold tracking-wide uppercase">Location</label>
        <div className="mt-1.5 flex items-center gap-3 rounded-2xl border bg-card px-4 py-3.5 transition focus-within:border-primary/45 focus-within:ring-4 focus-within:ring-primary/10">
          <MapPin className="h-5 w-5 shrink-0 text-primary" />
          <input defaultValue="123 Main Street, Harare" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
        </div>

        <div className="mt-auto pt-6">
          <PrimaryBtn type="submit">Submit Report</PrimaryBtn>
        </div>
      </form>
    </Phone>
  );
}
