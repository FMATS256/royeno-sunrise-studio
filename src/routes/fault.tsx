import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, ChevronDown, MapPin, Zap } from "lucide-react";
import { toast } from "sonner";
import { Phone, PrimaryBtn, TopBar } from "@/components/AppShell";

export const Route = createFileRoute("/fault")({
  head: () => ({ meta: [{ title: "Report a Fault — Royeno Solartech" }, { name: "description", content: "Report a problem with your solar system." }, { property: "og:title", content: "Report a Fault — Royeno Solartech" }, { property: "og:description", content: "Fast solar support." }] }),
  component: Fault,
});

function Fault() {
  const navigate = useNavigate();
  return (
    <Phone>
      <TopBar title="Report a Fault" />
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Fault reported — ticket #RST-2025-00124"); navigate({ to: "/tickets" }); }} className="flex flex-1 flex-col gap-2 px-5 py-5">
        <h2 className="text-lg font-bold">Tell us about the problem</h2>
        <label className="mt-2 text-sm font-medium">Fault Category</label>
        <div className="relative flex items-center gap-3 rounded-xl border bg-card px-4 py-3">
          <Zap className="h-5 w-5 text-secondary" />
          <select className="flex-1 appearance-none bg-transparent outline-none"><option>Inverter Problems</option><option>Battery Problems</option><option>Panel Damage</option><option>Other</option></select>
          <ChevronDown className="h-5 w-5" />
        </div>
        <label className="mt-2 text-sm font-medium">Description</label>
        <textarea rows={3} defaultValue="Inverter not powering the house..." className="rounded-xl border bg-card px-4 py-3 outline-none" />
        <label className="mt-2 flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed border-primary/30 bg-accent py-5 text-sm text-primary">
          <Camera className="h-6 w-6" /><span className="font-semibold">Upload Photos<br /><span className="font-normal">(Take or Select)</span></span>
          <input type="file" accept="image/*" className="hidden" />
        </label>
        <label className="mt-2 text-sm font-medium">Location</label>
        <div className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3"><MapPin className="h-5 w-5 text-primary" /><input defaultValue="123 Main Street, Harare" className="flex-1 bg-transparent outline-none" /></div>
        <div className="mt-auto pt-6"><PrimaryBtn type="submit">Submit Report</PrimaryBtn></div>
      </form>
    </Phone>
  );
}
