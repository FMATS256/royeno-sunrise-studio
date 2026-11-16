import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Clock, Navigation, Phone as PhoneIcon } from "lucide-react";
import { BottomNav, Phone, TopBar } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { branches, branchPhones, companyContact, directionsUrl } from "@/lib/contact";

export const Route = createFileRoute("/branches")({
  head: () => ({ meta: [
    { title: "Our Branches — Royeno Solartech" },
    { name: "description", content: "Visit Royeno Solartech branches nationwide: Harare, Gokwe, Chiredzi, Mt Darwin, Mvurwi, Mutoko, Rusape, Goromonzi and Gazebo." },
    { property: "og:title", content: "Our Branches — Royeno Solartech" },
    { property: "og:description", content: "Find a Royeno Solartech branch near you across Zimbabwe." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: BranchesPage,
});

function BranchesPage() {
  return (
    <Phone>
      <TopBar title="Our Branches" subtitle="Nationwide across Zimbabwe" />
      <main className="flex-1 space-y-6 px-5 py-5">
        <section>
          <h2 className="text-2xl font-bold text-primary">Find Royeno near you</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{branches.length} branches ready for solar, borehole and Starlink enquiries.</p>
        </section>
        <div className="grid gap-4 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-3">
          {branches.map((b) => (
            <article key={b.name} className="flex min-w-0 flex-col rounded-lg border bg-card p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Building2 className="h-5 w-5" /></span>
                <div className="min-w-0">
                  {b.headquarters && <p className="text-xs font-semibold uppercase text-secondary">Headquarters</p>}
                  <h3 className="text-lg font-bold">{b.name}</h3>
                </div>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{b.address ?? "Call us for directions to this branch."}</p>
              <Button asChild variant={b.headquarters ? "default" : "outline"} className="mt-4 min-h-11 w-full">
                <a href={directionsUrl(`${b.address ? b.address + ", " : "Royeno Solartech, "}${b.name}, Zimbabwe`)} target="_blank" rel="noreferrer"><Navigation /> Get Directions</a>
              </Button>
            </article>
          ))}
        </div>
        <section className="rounded-lg border bg-card p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold"><PhoneIcon className="h-4 w-4 text-secondary" /> Call us</h3>
          <div className="mt-2 flex flex-col">
            {[companyContact.phone, ...branchPhones].map((p) => <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center text-sm font-semibold text-primary">{p}</a>)}
          </div>
          <h3 className="mt-3 flex items-center gap-2 text-sm font-semibold"><Clock className="h-4 w-4 text-secondary" /> Head office hours</h3>
          <dl className="mt-2 space-y-2">{companyContact.hours.map((h) => <div key={h.days} className="text-sm"><dt className="text-muted-foreground">{h.days}</dt><dd className="font-medium">{h.time}</dd></div>)}</dl>
          <Button asChild variant="outline" className="mt-4 min-h-12 w-full"><Link to="/contact">Contact Us <ArrowRight /></Link></Button>
        </section>
      </main>
      <BottomNav />
    </Phone>
  );
}
