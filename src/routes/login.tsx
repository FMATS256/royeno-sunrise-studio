import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, Lock, User } from "lucide-react";
import { Phone, PrimaryBtn } from "@/components/AppShell";
import logo from "@/assets/royeno-logo.png.asset.json";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — Royeno Solartech" }, { name: "description", content: "Sign in to access your Royeno Solartech solar services." }, { property: "og:title", content: "Sign In — Royeno Solartech" }, { property: "og:description", content: "Access your solar services." }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  return (
    <Phone>
      <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/home" }); }} className="flex flex-1 flex-col px-6 pt-14">
        <img src={logo.url} alt="Royeno Solartech" className="mx-auto w-56" />
        <h1 className="mt-6 text-center text-2xl font-bold">Welcome Back!</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Sign in to access your solar services</p>
        <label className="mt-8 flex items-center gap-3 rounded-xl border bg-card px-4 py-3.5"><User className="h-5 w-5 text-primary" /><input className="flex-1 bg-transparent outline-none" placeholder="Mobile Number or Email" /></label>
        <label className="mt-4 flex items-center gap-3 rounded-xl border bg-card px-4 py-3.5"><Lock className="h-5 w-5 text-primary" /><input type="password" className="flex-1 bg-transparent outline-none" placeholder="Password" /><Eye className="h-5 w-5 text-muted-foreground" /></label>
        <div className="mt-6"><PrimaryBtn type="submit">Sign In</PrimaryBtn></div>
        <a className="mt-4 text-center text-sm font-medium text-primary">Forgot Password?</a>
        <div className="my-5 flex items-center gap-3 text-sm text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
        <Link to="/home" className="rounded-xl border-2 border-primary py-3 text-center font-semibold text-primary">Create Account</Link>
        <div className="-mx-6 mt-auto bg-navy pb-8 pt-10 text-center text-sm font-medium text-primary-foreground">Powering Zimbabwe · Solar Energy Has Changed The World</div>
      </form>
    </Phone>
  );
}
