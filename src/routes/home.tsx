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
import { PackageCatalog } from "@/components/PackageCatalog";
import { servicePackages } from "@/lib/packages";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — Royeno Solartech" },
      { name: "description", content: "Your solar dashboard: quotes, faults, installs and packages." },
      { property: "og:title", content: "Home — Royeno Solartech" },
      { property: "og:description", content: "Your Solar Journey, One App." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

const packages = servicePackages.filter((pkg) => pkg.category === "Solar");

function HomePage() {
  return (
    <Phone>
      <header className="bg-navy relative px-5 pt-5 pb-6 @min-[600px]:px-8 text-primary-foreground">
        <div className="relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
          <Button asChild variant="ghost" size="icon" className="h-11 w-11 rounded-lg bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"><Link to="/products" aria-label="Browse products"><Menu className="h-5 w-5" /></Link></Button>
          <img src={lockup.url} alt="Royeno Solartech" className="h-11 w-full max-w-48 min-w-0 justify-self-center object-contain" />
          <Link to="/notifications" aria-label="Notifications" className="relative grid h-11 w-11 place-items-center rounded-lg bg-primary-foreground/10 transition hover:bg-primary-foreground/20">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-secondary ring-2 ring-primary" />
          </Link>
        </div>
        <h1 className="relative mt-5 text-2xl font-bold tracking-tight">Hello, Tendai!</h1>
        <p className="relative text-sm text-primary-foreground/85">Your Solar Journey, One App.</p>
      </header>

      <div className="relative px-4 pt-4 pb-6 @min-[600px]:px-8">
        <div className="relative overflow-hidden rounded-lg">
          <img src={house} alt="Home with solar panels" width={1024} height={768} className="h-44 w-full object-cover @min-[600px]:h-64" />
          <div className="photo-shade absolute inset-0" />
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

        <div className="mt-4 grid grid-cols-2 gap-2.5 @min-[600px]:grid-cols-5">
          {actions.map(({ to, label, icon: Icon }, i) => (
            <Link
              key={label}
              to={to}
              className={`${i === actions.length - 1 ? "col-span-2 @min-[600px]:col-span-1" : ""} grid min-h-16 min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-lg border bg-card px-3 py-3 text-left transition hover:border-primary/35 hover:bg-accent/40 @min-[600px]:grid-cols-1 @min-[600px]:justify-items-center @min-[600px]:text-center`}
            >
               <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 text-xs leading-snug font-bold text-primary">{label}</span>
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <SectionTitle action={<Link to="/products" className="text-xs font-bold text-primary hover:underline">View All →</Link>}>
            Our Solar Packages
          </SectionTitle>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 @min-[600px]:grid-cols-3 @min-[850px]:grid-cols-4">
          {packages.map(({ id, name, price, note }) => (
            <Link to="/package/$packageId" params={{ packageId: id }} key={id} className="group flex min-w-0 flex-col items-start gap-2 overflow-hidden rounded-lg border bg-card p-3 transition hover:border-primary/35 hover:shadow-card">
              <img src={inverter} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover" />
              <div className="min-w-0">
                <p className="text-sm font-bold">{name}</p>
                <p className="text-sm font-bold text-primary">{price === null ? "Price on request" : `$${price.toLocaleString()}`}</p>
                <p className="text-[10px] text-muted-foreground">{note}</p>
              </div>
              <span className="ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent text-primary transition group-hover:bg-secondary group-hover:text-secondary-foreground">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-6 mb-3"><SectionTitle>Borehole Packages</SectionTitle></div>
        <PackageCatalog category="Borehole" />
        <div className="mt-6 mb-3"><SectionTitle>Starlink Packages</SectionTitle></div>
        <PackageCatalog category="Starlink" />
      </div>

      <BottomNav />
    </Phone>
  );
}
