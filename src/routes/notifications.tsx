import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarCheck, Gift, Package, Wrench } from "lucide-react";
import { BottomNav, Phone, TopBar } from "@/components/AppShell";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Royeno Solartech" },
      { name: "description", content: "Deals, installation updates and news." },
      { property: "og:title", content: "Notifications — Royeno Solartech" },
      { property: "og:description", content: "Stay up to date." },
    ],
  }),
  component: Notifications,
});

const all = [
  { t: "Black Friday Solar Deals!", d: "Get up to 30% OFF on selected solar systems.", time: "2h ago", icon: Gift, tone: "bg-sun text-secondary-foreground", tab: "Promotions", unread: true },
  { t: "Installation Scheduled", d: "Your installation is confirmed for 28 Apr 2025.", time: "1d ago", icon: CalendarCheck, tone: "bg-navy text-primary-foreground", tab: "Updates", unread: true },
  { t: "Service Update", d: "Our teams will be in Harare this week for maintenance.", time: "2d ago", icon: Wrench, tone: "bg-secondary/15 text-secondary", tab: "Updates", unread: false },
  { t: "New Product", d: "Introducing the new LiFePO4 battery range.", time: "3d ago", icon: Package, tone: "bg-success/15 text-success", tab: "Promotions", unread: false },
];

const tabs = ["All", "Promotions", "Updates"];

function Notifications() {
  const [tab, setTab] = useState("All");
  const list = all.filter((n) => tab === "All" || n.tab === tab);

  return (
    <Phone>
      <TopBar title="Notifications" subtitle="Deals, updates and news" />
      <div className="px-5 pt-4">
        <div className="flex rounded-full border bg-card p-1 shadow-card">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={`flex-1 rounded-full py-2 text-xs font-bold transition ${
                tab === t ? "bg-navy text-primary-foreground shadow-card" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-3 flex-1 space-y-2.5 px-5 pb-2">
        {list.map(({ t, d, time, icon: Icon, tone, unread }) => (
          <li key={t} className="flex gap-3.5 rounded-2xl border bg-card p-3.5 shadow-card transition hover:border-primary/20">
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tone}`}>
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 text-sm font-bold">
                {t}
                {unread && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />}
              </p>
              <p className="text-xs text-muted-foreground">{d}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{time}</p>
            </div>
          </li>
        ))}
        {list.length === 0 && (
          <li className="rounded-2xl border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
            Nothing here yet.
          </li>
        )}
      </ul>
      <BottomNav />
    </Phone>
  );
}
