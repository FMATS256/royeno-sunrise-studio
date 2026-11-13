import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bell, CalendarDays, Calculator, Menu, Phone as PhoneIcon, ShoppingCart, Wrench } from "lucide-react";
import { BottomNav, Phone } from "@/components/AppShell";
import logo from "@/assets/royeno-logo.png.asset.json";
import house from "@/assets/house-solar.jpg";
import inverter from "@/assets/inverter.jpg";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home — Royeno Solartech" }, { name: "description", content: "Your solar dashboard: quotes, faults, installs and packages." }, { property: "og:title", content: "Home — Royeno Solartech" }, { property: "og:description", content: "Your Solar Journey, One App." }] }),
  component: HomePage,
});

const actions = [
  { to: "/quote", label: "Get Quotation", icon: Calculator },
  { to: "/fault", label: "Report a Fault", icon: Wrench },
  { to: "/tickets", label: "Book Installation", icon: CalendarDays },
  { to: "/products", label: "View Products", icon: ShoppingCart },
  { to: "/notifications", label: "Contact Us", icon: PhoneIcon },
] as const;

function HomePage() {
  return (
    <Phone>
      <header className="bg-navy px-5 pb-20 pt-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <Menu className="h-6 w-6" />
          <div className="rounded-xl bg-card px-3 py-1"><img src={logo.url} alt="Royeno Solartech" className="h-10" /></div>
          <Link to="/notifications"><Bell className="h-6 w-6" /></Link>
        </div>
        <h1 className="mt-5 text-2xl font-bold">Hello, Tendai!</h1>
        <p className="text-sm opacity-90">Your Solar Journey, One App.</p>
      </header>
      <div className="-mt-14 px-4">
        <div className="relative overflow-hidden rounded-2xl shadow-card">
          <img src={house} alt="Home with solar panels" width={1024} height={768} className="h-44 w-full object-cover" />
          <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-primary via-primary/80 to-transparent p-5 text-primary-foreground">
            <p className="text-xl font-bold leading-tight">Save More<br /><span className="text-secondary">Go Solar Today!</span></p>
            <p className="mt-1 text-sm font-semibold">Special Deals This Month</p>
            <Link to="/products" className="mt-3 inline-flex w-fit items-center gap-1 rounded-lg bg-secondary px-3 py-1.5 text-sm font-semibold text-secondary-foreground">Shop Now <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-6 gap-3">
          {actions.map(({ to, label, icon: Icon }, i) => (
            <Link key={label} to={to} className={`${i < 3 ? "col-span-2" : "col-span-3"} flex flex-col items-center gap-2 rounded-2xl bg-accent p-3 text-center text-xs font-semibold text-primary`}>
              <Icon className="h-7 w-7" />{label}
            </Link>
          ))}
        </div>
        <div className="mb-3 mt-6 flex items-center justify-between">
          <h2 className="font-bold">Our Solar Packages</h2>
          <Link to="/quote" className="text-sm font-semibold text-secondary">View All →</Link>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-3">
          {[["1KVA", "$450"], ["3.5KVA", "$750"]].map(([k, p]) => (
            <Link to="/quote" key={k} className="flex items-center gap-2 rounded-2xl bg-card p-2 shadow-card">
              <img src={inverter} alt="" loading="lazy" className="h-16 w-16 rounded-lg object-cover" />
              <div><p className="font-bold">{k}</p><p className="font-bold text-primary">{p}</p><span className="mt-1 inline-block rounded bg-secondary px-2 text-secondary-foreground"><ArrowRight className="h-3 w-3" /></span></div>
            </Link>
          ))}
        </div>
      </div>
      <BottomNav />
    </Phone>
  );
}
