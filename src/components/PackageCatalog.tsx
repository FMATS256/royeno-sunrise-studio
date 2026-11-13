import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { servicePackages, type PackageCategory } from "@/lib/packages";
import inverter from "@/assets/inverter.jpg";
import borehole from "@/assets/borehole-package.jpg";
import starlink from "@/assets/starlink-package.jpg";

export const packageImages = { Solar: inverter, Borehole: borehole, Starlink: starlink };

export function PackageCatalog({ category, query = "" }: { category?: PackageCategory | undefined; query?: string }) {
  const items = servicePackages.filter((pkg) => (!category || pkg.category === category) && `${pkg.name} ${pkg.note}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="space-y-3">
      {items.map((pkg) => (
        <div key={pkg.id} className="flex gap-3 rounded-2xl border bg-card p-3 shadow-card">
          <img src={packageImages[pkg.category]} alt={pkg.category === "Solar" ? "Solar inverter" : `${pkg.category} equipment`} loading="lazy" width={1024} height={1024} className="h-24 w-24 shrink-0 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold">{pkg.name}</h3>
            <p className="text-xs text-muted-foreground">{pkg.note}</p>
            <p className="my-1 text-sm font-bold text-primary">{pkg.price === null ? "Price on request" : `$${pkg.price.toLocaleString()}`}</p>
            <Button asChild variant="secondary" size="sm" className="h-auto min-h-8 w-full whitespace-normal">
              <Link to="/quote" search={{ package: pkg.id }}>Get Quotation <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No packages found.</p>}
    </div>
  );
}