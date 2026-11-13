import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, Bell, FileText, Home, User, Wrench } from "lucide-react";
import type { ReactNode } from "react";

export function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted sm:py-8">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[420px] flex-col overflow-hidden bg-background sm:min-h-[860px] sm:rounded-[2.5rem] sm:shadow-card">
        {children}
      </div>
    </div>
  );
}

export function TopBar({ title }: { title: string }) {
  const router = useRouter();
  return (
    <header className="bg-navy flex items-center gap-4 px-5 pb-5 pt-6 text-primary-foreground">
      <button aria-label="Back" onClick={() => router.history.back()}>
        <ArrowLeft className="h-5 w-5" />
      </button>
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
}

const nav = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/quote", label: "Quotations", icon: FileText },
  { to: "/tickets", label: "Services", icon: Wrench },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/login", label: "Account", icon: User },
] as const;

export function BottomNav() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  return (
    <nav className="sticky bottom-0 mt-auto grid grid-cols-5 border-t bg-card py-2">
      {nav.map(({ to, label, icon: Icon }) => (
        <Link key={to} to={to} className={`relative flex flex-col items-center gap-1 text-[11px] ${path === to ? "font-semibold text-primary" : "text-muted-foreground"}`}>
          <Icon className="h-5 w-5" />
          {label}
          {to === "/notifications" && <span className="absolute right-4 top-0 grid h-4 w-4 place-items-center rounded-full bg-destructive text-[9px] text-destructive-foreground">2</span>}
        </Link>
      ))}
    </nav>
  );
}

export function PrimaryBtn({ children, variant = "navy", onClick, type = "button" }: { children: ReactNode; variant?: "navy" | "orange" | "green"; onClick?: () => void; type?: "button" | "submit" }) {
  const v = { navy: "bg-primary text-primary-foreground", orange: "bg-secondary text-secondary-foreground", green: "bg-success text-success-foreground" }[variant];
  return <button type={type} onClick={onClick} className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-semibold shadow-card transition active:scale-[0.98] ${v}`}>{children}</button>;
}
