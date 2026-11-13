import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, Zap } from "lucide-react";
import { BottomNav, Phone, TopBar } from "@/components/AppShell";
import { packageImages } from "@/components/PackageCatalog";
import { Button } from "@/components/ui/button";
import { packageDetails, servicePackages } from "@/lib/packages";

export const Route = createFileRoute("/package/$packageId")({
  loader: ({ params }) => {
    const pkg = servicePackages.find((p) => p.id === params.packageId);
    if (!pkg) throw notFound();
    return { pkg };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.pkg.name ?? "Package";
    const desc = loaderData?.pkg.note ?? "Royeno Solartech system";
    return {
      meta: [
        { title: `${name} — Royeno Solartech` },
        { name: "description", content: `${name}: ${desc}. Specs, what's included and warranty.` },
        { property: "og:title", content: `${name} — Royeno Solartech` },
        { property: "og:description", content: `${name}: ${desc}.` },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PackagePage,
  notFoundComponent: () => (
    <Phone><TopBar title="Not found" /><div className="flex-1 p-6 text-center text-sm">This package doesn't exist. <Link to="/products" className="font-bold text-primary">See all products</Link></div></Phone>
  ),
  errorComponent: () => <Phone><TopBar title="Something went wrong" /><div className="flex-1 p-6 text-sm">Please try again.</div></Phone>,
});

function PackagePage() {
  const { pkg } = Route.useLoaderData();
  const d = packageDetails(pkg);
  const wa = `https://wa.me/?text=${encodeURIComponent(`Hi Royeno, I'm interested in the ${pkg.name}.`)}`;
  return (
    <Phone>
      <TopBar title={pkg.name} subtitle={`${pkg.category} package`} />
      <div className="flex-1 space-y-5 px-5 py-5 pb-28">
        <div className="overflow-hidden rounded-2xl border bg-card shadow-card">
          <img src={packageImages[pkg.category]} alt={pkg.name} width={1024} height={1024} className="aspect-[16/10] w-full object-cover" />
          <div className="p-4">
            <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-secondary-foreground">{pkg.category}</span>
            <h2 className="mt-2 text-xl font-extrabold text-primary">{pkg.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{d.overview}</p>
            <p className="mt-3 text-lg font-extrabold">{pkg.price === null ? "Price on request" : `From $${pkg.price.toLocaleString()}`}</p>
          </div>
        </div>

        <section>
          <h3 className="mb-2 text-sm font-bold">Specifications</h3>
          <div className="grid grid-cols-2 gap-2">
            {d.specs.map((s) => (
              <div key={s.label} className="rounded-xl border bg-card p-3 shadow-card">
                <p className="text-[11px] text-muted-foreground">{s.label}</p>
                <p className="text-sm font-bold text-primary">{s.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-sm font-bold">What it powers</h3>
          <div className="flex flex-wrap gap-2">
            {d.powers.map((p) => (
              <span key={p} className="inline-flex items-center gap-1 rounded-full border bg-card px-3 py-1.5 text-xs font-semibold"><Zap className="h-3.5 w-3.5 text-secondary" />{p}</span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-4 shadow-card">
          <h3 className="mb-2 text-sm font-bold">What's included</h3>
          <ul className="space-y-2">
            {d.included.map((i) => (
              <li key={i} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />{i}</li>
            ))}
          </ul>
        </section>

        <div className="flex items-center gap-3 rounded-2xl bg-navy p-4 text-primary-foreground">
          <ShieldCheck className="h-8 w-8 shrink-0 text-secondary" />
          <div><p className="text-sm font-bold">Warranty</p><p className="text-xs opacity-85">{d.warranty}</p></div>
        </div>

        <div className="grid gap-2">
          <Button asChild size="lg" className="min-h-12"><Link to="/quote" search={{ package: pkg.id }}>Get Quotation <ArrowRight /></Link></Button>
          <Button asChild size="lg" variant="outline" className="min-h-12"><a href={wa} target="_blank" rel="noreferrer"><MessageCircle /> Enquire on WhatsApp</a></Button>
        </div>
      </div>
      <BottomNav />
    </Phone>
  );
}
