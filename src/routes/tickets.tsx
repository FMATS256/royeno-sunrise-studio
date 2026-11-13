import { createFileRoute } from "@tanstack/react-router";
import { Check, MessageCircle } from "lucide-react";
import { BottomNav, Phone, PrimaryBtn, TopBar } from "@/components/AppShell";

export const Route = createFileRoute("/tickets")({
  head: () => ({ meta: [{ title: "My Service Tickets — Royeno Solartech" }, { name: "description", content: "Track your solar service requests." }, { property: "og:title", content: "My Service Tickets — Royeno Solartech" }, { property: "og:description", content: "Track repairs and installs." }] }),
  component: Tickets,
});

const steps = [
  ["Submitted", "24 Apr, 09:30 AM", "done"], ["Under Review", "24 Apr, 10:15 AM", "done"], ["Technician Assigned", "24 Apr, 11:00 AM", "ok"], ["In Progress", "24 Apr, 02:15 PM", "now"], ["Resolved", "", "todo"],
];

function Tickets() {
  return (
    <Phone>
      <TopBar title="My Service Tickets" />
      <div className="flex-1 px-5 py-5">
        <div className="rounded-2xl bg-card p-5 shadow-card">
          <div className="flex items-start justify-between">
            <div><p className="font-bold">#RST-2025-00124</p><p className="text-sm">Inverter issue</p><p className="mt-1 text-xs text-muted-foreground">Submitted: 24 Apr 2025</p></div>
            <span className="rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-secondary">In Progress</span>
          </div>
          <ol className="mt-5">
            {steps.map(([t, d, s], i) => (
              <li key={t} className="relative flex gap-4 pb-5 last:pb-0">
                {i < steps.length - 1 && <span className="absolute left-[11px] top-6 h-full w-0.5 bg-primary/40" />}
                <span className={`z-10 grid h-6 w-6 place-items-center rounded-full ${s === "done" ? "bg-primary text-primary-foreground" : s === "ok" ? "bg-success text-success-foreground" : s === "now" ? "bg-secondary ring-4 ring-secondary/30" : "border-2 border-border bg-card"}`}>{(s === "done" || s === "ok") && <Check className="h-3.5 w-3.5" />}</span>
                <div><p className={`font-semibold ${s === "now" ? "text-primary" : ""}`}>{t}</p>{d && <p className="text-xs text-muted-foreground">{d}</p>}</div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-6"><PrimaryBtn variant="green"><MessageCircle className="h-5 w-5" />Contact Support</PrimaryBtn></div>
      </div>
      <BottomNav />
    </Phone>
  );
}
