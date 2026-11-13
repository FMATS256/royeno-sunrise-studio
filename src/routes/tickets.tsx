import { createFileRoute } from "@tanstack/react-router";
import { Check, MessageCircle } from "lucide-react";
import { BottomNav, Phone, PrimaryBtn, TopBar } from "@/components/AppShell";

export const Route = createFileRoute("/tickets")({
  head: () => ({
    meta: [
      { title: "My Service Tickets — Royeno Solartech" },
      { name: "description", content: "Track your solar service requests." },
      { property: "og:title", content: "My Service Tickets — Royeno Solartech" },
      { property: "og:description", content: "Track repairs and installs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Tickets,
});

const steps: [string, string, "done" | "now" | "todo"][] = [
  ["Submitted", "24 Apr, 09:30 AM", "done"],
  ["Under Review", "24 Apr, 10:15 AM", "done"],
  ["Technician Assigned", "24 Apr, 11:00 AM", "done"],
  ["In Progress", "24 Apr, 02:15 PM", "now"],
  ["Resolved", "", "todo"],
];

function Tickets() {
  return (
    <Phone>
      <TopBar title="My Service Tickets" subtitle="1 open ticket" />
      <div className="flex-1 px-5 py-5">
        <div className="rounded-2xl border bg-card p-4 shadow-card">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
            <div className="min-w-0">
              <p className="break-all text-sm font-bold">#RST-2025-00124</p>
              <p className="text-sm text-muted-foreground">Inverter issue</p>
              <p className="mt-1 text-[11px] text-muted-foreground">Submitted: 24 Apr 2025</p>
            </div>
            <span className="bg-sun shrink-0 rounded-full px-3 py-1 text-[11px] font-bold text-secondary-foreground">In Progress</span>
          </div>

          <ol className="mt-5">
            {steps.map(([t, d, s], i) => (
              <li key={t} className="relative flex gap-3.5 pb-5 last:pb-0">
                {i < steps.length - 1 && (
                  <span className={`absolute top-6 left-[11px] h-full w-0.5 ${s === "done" ? "bg-primary/45" : "bg-border"}`} />
                )}
                <span
                  className={`z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full transition ${
                    s === "done"
                      ? "bg-primary text-primary-foreground"
                      : s === "now"
                        ? "bg-sun text-secondary-foreground ring-4 ring-secondary/25"
                        : "border-2 border-border bg-card"
                  }`}
                >
                  {s === "done" && <Check className="h-3.5 w-3.5" />}
                </span>
                <div className="min-w-0">
                  <p className={`text-sm ${s === "now" ? "font-bold text-primary" : "font-semibold"}`}>{t}</p>
                  {d && <p className="text-[11px] text-muted-foreground">{d}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-5">
          <PrimaryBtn variant="green">
            <MessageCircle className="h-4.5 w-4.5" />
            Contact Support
          </PrimaryBtn>
        </div>
      </div>
      <BottomNav />
    </Phone>
  );
}
