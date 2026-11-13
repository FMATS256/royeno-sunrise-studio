import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, Lock, User } from "lucide-react";
import { Field, Phone, PrimaryBtn } from "@/components/AppShell";
import lockup from "@/assets/royeno-lockup.png.asset.json";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Royeno Solartech" },
      { name: "description", content: "Sign in to access your Royeno Solartech solar services." },
      { property: "og:title", content: "Sign In — Royeno Solartech" },
      { property: "og:description", content: "Access your solar services." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  return (
    <Phone statusTone="dark">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/home" });
        }}
        className="flex flex-1 flex-col px-6 pt-8"
      >
        <img src={lockup.url} alt="Royeno Solartech" className="mx-auto w-48 object-contain" />
        <h1 className="mt-7 text-center text-2xl font-bold tracking-tight">Welcome Back!</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Sign in to access your solar services</p>

        <div className="mt-8 space-y-3">
          <Field icon={User} placeholder="Mobile Number or Email" autoComplete="username" />
          <label className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3.5 transition focus-within:border-primary/45 focus-within:ring-4 focus-within:ring-primary/10">
            <Lock className="h-5 w-5 shrink-0 text-primary" />
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <Eye className="h-4.5 w-4.5 shrink-0 text-muted-foreground" aria-hidden />
          </label>
        </div>

        <div className="mt-7">
          <PrimaryBtn type="submit">Sign In</PrimaryBtn>
        </div>
        <a className="mt-4 text-center text-sm font-semibold text-primary hover:underline">Forgot Password?</a>

        <div className="my-5 flex items-center gap-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>

        <Link
          to="/home"
          className="rounded-2xl border-2 border-primary/25 py-3.5 text-center text-sm font-bold text-primary transition hover:border-primary/60 hover:bg-accent"
        >
          Create Account
        </Link>

        <div className="bg-navy -mx-6 mt-auto overflow-hidden px-6 pt-8 pb-9 text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-sun uppercase">
            Solar Energy Has Changed The World
          </p>
          <p className="mt-2 text-xs text-primary-foreground/70">Powering homes &amp; businesses across Zimbabwe</p>
        </div>
      </form>
    </Phone>
  );
}
