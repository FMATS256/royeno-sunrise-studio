import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Calculator,
  Menu,
  Phone as PhoneIcon,
  ShoppingCart,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { BottomNav, Phone, SectionTitle } from "@/components/AppShell";
import lockup from "@/assets/royeno-lockup-light.png.asset.json";
import house from "@/assets/house-solar.jpg";
import inverter from "@/assets/inverter.jpg";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — Royeno Solartech" },
      { name: "description", content: "Your solar dashboard: quotes, faults, installs and packages." },
      { property: "og:title", content: "Home — Royeno Solartech" },
      { property: "og:description", content: "Your Solar Journey, One App." },
    ],
  }),
  component: HomePage,
});

const actions: { to: "/quote" | "/fault" | "/tickets" | "/products" | "/notifications"; label: string; icon: LucideIcon }[] = [
  { to: "/quote", label: "Get Quotation", icon: Calculator },
  { to: "/fault", label: "Report a Fault", icon: Wrench },
  { to: "/tickets", label: "Book Installation", icon: CalendarDays },
  { to: "/products", label: "View Products", icon: ShoppingCart },
  { to: "/notifications", label: "Contact Us", icon: PhoneIcon },
];

const packages = [
  { kva: "1KVA", price: "$450", note: "Small home" },
  { kva: "3.5KVA", price: "$750", note: "Family home" },
];

function HomePage() {
  return (
    <Phone>
      <header className="bg-navy relative overflow-hidden px-5 pt-4 pb-16 text-primary-foreground">
        <div className="pointer-events-none absolute -top-14 -right-12 h-44 w-44 rounded-full bg-sun/25 blur-2xl" />
        <div className="relative flex items-center justify-between">
          <button aria-label="Menu" className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/15 transition hover:bg-primary-foreground/25">
            <Menu className="h-5 w-5" />
          </button>
          <img src={lockup.url} alt="Royeno Solartech" className="h-9 w-auto object-contain" />
          <Link to="/notifications" aria-label="Notifications" className="relative grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/15 transition hover:bg-primary-foreground/25">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-secondary ring-2 ring-primary" />
          </Link>
        </div>
        <h1 className="relative mt-5 text-2xl font-bold tracking-tight">Hello, Tendai!</h1>
        <p className="relative text-sm text-primary-foreground/80">Your Solar Journey, One App.</p>
        <div className="absolute inset-x-0 -bottom-px h-6 rounded-t-[1.8rem] bg-background" />
      </header>

      <div className="relative -mt-10 px-4 pb-4">
        <div className="relative overflow-hidden rounded-3xl shadow-lift">
          <img src={house} alt="Home with solar panels" width={1024} height={768} className="h-44 w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-5 text-primary-foreground">
            <p className="text-xl leading-tight font-bold">
              Save More
              <br />
              <span className="text-sun">Go Solar Today!</span>
            </p>
            <p className="mt-1 text-sm font-semibold text-primary-foreground/85">Special Deals This Month</p>
            <Link
              to="/products"
              className="bg-sun mt-3 inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-secondary-foreground shadow-sun transition hover:brightness-110"
            >
              Shop Now <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-6 gap-2.5">
          {actions.map(({ to, label, icon: Icon }, i) => (
            <Link
              key={label}
              to={to}
              className={`${i < 3 ? "col-span-2" : "col-span-3"} flex items-center gap-2.5 rounded-2xl border bg-card p-3 text-left shadow-card transition hover:-translate-y-0.5 hover:border-primary/25 active:translate-y-0`}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-[11px] leading-tight font-bold text-primary">{label}</span>
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <SectionTitle action={<Link to="/quote" className="text-xs font-bold text-secondary hover:underline">View All →</Link>}>
            Our Solar Packages
          </SectionTitle>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {packages.map(({ kva, price, note }) => (
            <Link to="/quote" key={kva} className="group flex items-center gap-3 rounded-2xl border bg-card p-2.5 shadow-card transition hover:-translate-y-0.5 hover:border-primary/25">
              <img src={inverter} alt="" loading="lazy" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0">
                <p className="text-sm font-bold">{kva}</p>
                <p className="text-sm font-bold text-primary">{price}</p>
                <p className="text-[10px] text-muted-foreground">{note}</p>
              </div>
              <span className="ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent text-primary transition group-hover:bg-secondary group-hover:text-secondary-foreground">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </Phone>
  );
}
