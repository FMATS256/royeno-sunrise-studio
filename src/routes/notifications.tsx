import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarCheck, Gift, Package, Wrench } from "lucide-react";
import { BottomNav, Phone, TopBar } from "@/components/AppShell";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Royeno Solartech" }, { name: "description", content: "Deals, installation updates and news." }, { property: "og:title", content: "Notifications — Royeno Solartech" }, { property: "og:description", content: "Stay up to date." }] }),
  component: Notifications,
});

const all = [
  { t: "Black Friday Solar Deals!", d: "Get up to 30% OFF on selected solar systems.", time: "2h ago", icon: Gift, tone: "bg-secondary text-secondary-foreground", tab: "Promotions" },
  { t: "Installation Scheduled", d: "Your installation is confirmed for 28 Apr 2025.", time: "1d ago", icon: CalendarCheck, tone: "bg-primary text-primary-foreground", tab: "Updates" },
  { t: "Service Update", d: "Our teams will be in Harare this week for maintenance.", time: "2d ago", icon: Wrench, tone: "bg-secondary/20 text-secondary", tab: "Updates" },
  { t: "New Product", d: "Introducing the new LiFePO4 battery range.", time: "3d ago", icon: Package, tone: "bg-success text-success-foreground", tab: "Promotions" },
];

function Notifications() {
  const [tab, setTab] = useState("All");
  return (
    <Phone>
      <TopBar title="Notifications" />
      <div className="flex border-b bg-card">
        {["All", "Promotions", "Updates"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3 text-sm font-medium ${tab === t ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}>{t}</button>
        ))}
      </div>
      <ul className="flex-1 divide-y bg-card">
        {all.filter((n) => tab === "All" || n.tab === tab).map(({ t, d, time, icon: Icon, tone }) => (
          <li key={t} className="flex gap-4 px-5 py-4">
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tone}`}><Icon className="h-5 w-5" /></span>
            <div><p className="font-bold">{t}</p><p className="text-sm text-muted-foreground">{d}</p><p className="mt-1 text-xs text-muted-foreground">{time}</p></div>
          </li>
        ))}
      </ul>
      <BottomNav />
    </Phone>
  );
}
