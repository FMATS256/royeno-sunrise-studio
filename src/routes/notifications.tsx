import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarCheck, Gift, Package, Wrench } from "lucide-react";
import { BottomNav, Phone, TopBar } from "@/components/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Royeno Solartech" },
      { name: "description", content: "Deals, installation updates and news." },
      { property: "og:title", content: "Notifications — Royeno Solartech" },
      { property: "og:description", content: "Stay up to date." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Notifications,
});

const all = [
  { t: "Black Friday Solar Deals!", d: "Get up to 30% OFF on selected solar systems.", time: "2h ago", icon: Gift, tone: "bg-sun text-secondary-foreground", tab: "Promotions", unread: true },
  { t: "Installation Scheduled", d: "Your installation is confirmed for 28 Apr 2025.", time: "1d ago", icon: CalendarCheck, tone: "bg-navy text-primary-foreground", tab: "Updates", unread: true },
  { t: "Service Update", d: "Our teams will be in Harare this week for maintenance.", time: "2d ago", icon: Wrench, tone: "bg-secondary text-secondary-foreground", tab: "Updates", unread: false },
  { t: "New Product", d: "Introducing the new LiFePO4 battery range.", time: "3d ago", icon: Package, tone: "bg-success text-success-foreground", tab: "Promotions", unread: false },
];

const tabs = ["All", "Promotions", "Updates"];

function Notifications() {
  const [tab, setTab] = useState("All");
  const list = all.filter((n) => tab === "All" || n.tab === tab);

  return (
    <Phone>
      <TopBar title="Notifications" subtitle="Deals, updates and news" />
      <div className="px-5 pt-4">
        <div className="grid grid-cols-3 rounded-xl border bg-card p-1 shadow-card">
          {tabs.map((t) => (
            <Button variant="ghost"
              key={t}
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={`min-h-11 min-w-0 rounded-lg px-1 py-2 text-xs font-bold transition ${
                tab === t ? "bg-navy text-primary-foreground shadow-card" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {t}
            </Button>
          ))}
        </div>
      </div>

      <ul className="mt-3 grid flex-1 content-start gap-3 px-5 pb-5 @min-[600px]:grid-cols-2">
        {list.map(({ t, d, time, icon: Icon, tone, unread }) => (
          <li key={t} className="flex min-w-0 gap-3 rounded-lg border bg-card p-4 transition hover:border-primary/20">
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tone}`}>
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 text-sm font-bold">
                {t}
                {unread && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{d}</p>
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
