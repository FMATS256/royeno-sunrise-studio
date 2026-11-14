import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, User, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, Phone, PrimaryBtn } from "@/components/AppShell";
import lockup from "@/assets/royeno-lockup.png.asset.json";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Royeno Solartech" },
      { name: "description", content: "Sign in to access your Royeno Solartech solar services." },
      { property: "og:title", content: "Sign In — Royeno Solartech" },
      { property: "og:description", content: "Access your solar services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Phone statusTone="dark">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/home" });
        }}
        className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pt-8 pb-6 min-[375px]:px-6 @min-[600px]:justify-center"
      >
        <img src={lockup.url} alt="Royeno Solartech" className="mx-auto w-52 max-w-full object-contain" />
        <h1 className="mt-8 text-center text-2xl font-bold tracking-tight">Client Sign In</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Welcome back to Royeno Solartech</p>

        <div className="mt-6 space-y-3">
          <Field icon={User} aria-label="Mobile Number or Email" placeholder="Mobile Number or Email" autoComplete="username" />
          <label className="flex items-center gap-3 rounded-lg border bg-card px-4 py-2 transition focus-within:border-primary/45 focus-within:ring-4 focus-within:ring-primary/10">
            <Lock className="h-5 w-5 shrink-0 text-primary" />
            <input
              type={showPassword ? "text" : "password"}
              aria-label="Password"
              placeholder="Password"
              autoComplete="current-password"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <Button type="button" variant="ghost" size="icon" className="h-10 w-10 shrink-0 text-muted-foreground" aria-label={showPassword ? "Hide password" : "Show password"} title={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((v) => !v)}>{showPassword ? <EyeOff /> : <Eye />}</Button>
          </label>
        </div>

        <div className="mt-5">
          <PrimaryBtn type="submit">Sign In <ArrowRight className="h-4 w-4" /></PrimaryBtn>
        </div>
        <a className="mt-4 text-center text-sm font-semibold text-primary hover:underline">Forgot Password?</a>

        <div className="my-5 flex items-center gap-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>

        <Link
          to="/home"
          className="rounded-lg border border-primary/25 py-3.5 text-center text-sm font-bold text-primary transition hover:border-primary/60 hover:bg-accent"
        >
          Create Account
        </Link>

        <div className="mt-auto pt-8 text-center">
          <p className="text-xs font-semibold leading-relaxed text-primary">
            Solar Energy Has Changed The World
          </p>
          <p className="mt-2 text-xs font-medium text-muted-foreground">Powering homes &amp; businesses across Zimbabwe</p>
        </div>
      </form>
    </Phone>
  );
}
