import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin, Navigation, Phone as PhoneIcon } from "lucide-react";
import { BottomNav, Phone, TopBar } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { companyContact, directionsUrl } from "@/lib/contact";

export const Route = createFileRoute("/branches")({
  head: () => ({ meta: [
    { title: "Our Branches — Royeno Solartech" },
    { name: "description", content: "Visit Royeno Solartech at Afgate House in Harare. Find directions and contact information." },
    { property: "og:title", content: "Our Branches — Royeno Solartech" },
    { property: "og:description", content: "Find our Harare office, opening hours and directions." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: BranchesPage,
});

function BranchesPage() {
  return (
    <Phone>
      <TopBar title="Our Branches" subtitle="Visit the Royeno team" />
      <main className="flex-1 space-y-6 px-5 py-5">
        <section>
          <h2 className="text-2xl font-bold text-primary">Find Royeno near you</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Visit our Harare office for solar, water and irrigation enquiries.</p>
        </section>
        <div className="grid gap-5 @min-[600px]:grid-cols-2">
          <article className="min-w-0 rounded-lg border bg-card p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="min-w-0"><p className="text-xs font-semibold text-secondary">Zimbabwe</p><h3 className="mt-1 text-xl font-bold">Harare Office</h3></div>
              <MapPin className="h-7 w-7 shrink-0 text-primary" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{companyContact.address}<br />{companyContact.city}</p>
            <a href={companyContact.phoneHref} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"><PhoneIcon className="h-4 w-4" />{companyContact.phone}</a>
            <div className="mt-3 border-t pt-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold"><Clock className="h-4 w-4 text-secondary" /> Opening Hours</h4>
              <dl className="mt-3 space-y-3">{companyContact.hours.map((h) => <div key={h.days} className="text-sm"><dt className="text-muted-foreground">{h.days}</dt><dd className="font-medium">{h.time}</dd></div>)}</dl>
            </div>
            <Button asChild className="mt-5 min-h-12 w-full"><a href={directionsUrl(`${companyContact.address}, ${companyContact.city}`)} target="_blank" rel="noreferrer"><Navigation /> Get Directions</a></Button>
          </article>
          <section className="min-w-0 self-start border-t pt-5 @min-[600px]:border-t-0">
            <h3 className="text-lg font-bold">Planning a visit?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Contact our team to discuss your project or arrange a consultation.</p>
            <Button asChild variant="outline" className="mt-4 min-h-12 w-full"><Link to="/contact">Contact Us <ArrowRight /></Link></Button>
          </section>
        </div>
        <a href={companyContact.source} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-xs text-muted-foreground underline">royenosolartech.co.zw</a>
      </main>
      <BottomNav />
    </Phone>
  );
}