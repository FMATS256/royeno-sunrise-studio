import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeft,
  BatteryFull,
  Bell,
  FileText,
  Home,
  SignalHigh,
  User,
  Wifi,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/ui/button";

/**
 * Phone frame: a full-bleed app on small screens, a device mock-up on desktop.
 * statusTone picks the colour of the fake status bar (light = over the navy header).
 */
export function Phone({
  children,
  statusTone = "light",
}: {
  children: ReactNode;
  statusTone?: "light" | "dark";
}) {
  const tone =
    statusTone === "light" ? "bg-primary text-primary-foreground" : "bg-background text-foreground";
  return (
    <div className="phone-stage bg-muted sm:grid sm:place-items-center sm:py-10">
      <div
        data-device
        className="phone-shell relative mx-auto flex min-w-0 w-full flex-col bg-background sm:max-w-[420px] sm:rounded-[2.9rem] sm:border-[9px] sm:border-foreground/90 sm:shadow-lift"
      >
        <div className="pointer-events-none absolute left-1/2 top-2.5 z-50 hidden h-5 w-20 -translate-x-1/2 rounded-full bg-foreground/90 sm:block" />
        <div className={`hidden items-center justify-between px-6 pt-4 pb-1 text-[11px] font-semibold tracking-wide sm:flex ${tone}`}>
          <span>9:41</span>
          <span className="flex items-center gap-1.5">
            <SignalHigh className="h-3.5 w-3.5" />
            <Wifi className="h-3.5 w-3.5" />
            <BatteryFull className="h-4 w-4" />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function TopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  const router = useRouter();
  return (
    <header className="app-topbar bg-navy relative px-5 pb-5 pt-5 text-primary-foreground">
      <div className="relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
        <Button variant="ghost" size="icon"
          aria-label="Back"
          onClick={() => router.history.back()}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-foreground/15 text-primary-foreground transition hover:bg-primary-foreground/25 hover:text-primary-foreground active:scale-95"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
        </Button>
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="truncate text-xs text-primary-foreground/70">{subtitle}</p>}
        </div>
      </div>
    </header>
  );
}

const nav = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/quote", label: "Quotes", icon: FileText },
  { to: "/tickets", label: "Services", icon: Wrench },
  { to: "/notifications", label: "Alerts", icon: Bell },
  { to: "/login", label: "Account", icon: User },
] as const;

export function BottomNav() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  return (
    <nav aria-label="Main navigation" className="app-bottom-nav sticky bottom-0 z-40 mt-auto grid shrink-0 grid-cols-5 border-t bg-card/95 px-2 pt-2 shadow-lift backdrop-blur">
      {nav.map(({ to, label, icon: Icon }) => {
        const active = path === to;
        return (
          <Link
            key={to}
            to={to}
            aria-current={active ? "page" : undefined}
            className={`relative flex min-h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-xl py-1.5 text-[10px] font-medium transition ${
              active ? "bg-navy font-bold text-primary-foreground shadow-card" : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
            {to === "/notifications" && (
              <span className="absolute right-2.5 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-secondary text-[9px] font-bold text-secondary-foreground">
                2
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function PrimaryBtn({
  children,
  variant = "navy",
  onClick,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  variant?: "navy" | "orange" | "green";
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  const v = {
    navy: "bg-navy text-primary-foreground shadow-lift",
    orange: "bg-sun text-secondary-foreground shadow-sun",
    green: "bg-success text-success-foreground shadow-card",
  }[variant];
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`flex h-auto min-h-12 w-full items-center justify-center gap-2 whitespace-normal rounded-xl px-4 py-3.5 text-sm font-bold transition hover:brightness-110 active:scale-[0.98] ${v} ${className}`}
    >
      {children}
    </Button>
  );
}

/** Labelled input with a leading icon — used on sign-in and the fault form. */
export function Field({
  icon: Icon,
  ...rest
}: { icon?: LucideIcon } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3.5 transition focus-within:border-primary/45 focus-within:ring-4 focus-within:ring-primary/10">
      {Icon && <Icon className="h-5 w-5 shrink-0 text-primary" />}
      <input {...rest} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
    </label>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
      <h2 className="min-w-0 text-base font-bold">{children}</h2>
      {action}
    </div>
  );
}
