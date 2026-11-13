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
    statusTone === "light" ? "text-primary-foreground drop-shadow-[0_1px_2px_rgb(0_0_0/0.4)]" : "text-foreground";
  return (
    <div className="min-h-screen bg-muted sm:grid sm:place-items-center sm:py-10">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[420px] flex-col overflow-hidden bg-background sm:min-h-[880px] sm:rounded-[2.9rem] sm:border-[9px] sm:border-foreground/90 sm:shadow-lift">
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
    <header className="bg-navy relative overflow-hidden px-5 pb-5 pt-5 text-primary-foreground">
      <div className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-sun/25 blur-2xl" />
      <div className="relative flex items-center gap-3">
        <button
          aria-label="Back"
          onClick={() => router.history.back()}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-foreground/15 transition hover:bg-primary-foreground/25 active:scale-95"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
        </button>
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
    <nav className="mx-3 mt-auto mb-3 grid grid-cols-5 rounded-full border bg-card/95 px-1.5 py-1.5 shadow-lift backdrop-blur">
      {nav.map(({ to, label, icon: Icon }) => {
        const active = path === to;
        return (
          <Link
            key={to}
            to={to}
            className={`relative flex flex-col items-center gap-0.5 rounded-full py-1.5 text-[10px] font-medium transition ${
              active ? "bg-accent font-bold text-primary" : "text-muted-foreground hover:text-primary"
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
    <button
      type={type}
      onClick={onClick}
      className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold tracking-wide transition hover:brightness-110 active:scale-[0.98] ${v} ${className}`}
    >
      {children}
    </button>
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
    <div className="flex items-end justify-between">
      <h2 className="text-base font-bold tracking-tight">{children}</h2>
      {action}
    </div>
  );
}
