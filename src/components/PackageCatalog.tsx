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
    <div className="grid grid-cols-1 gap-3 @min-[600px]:grid-cols-2">
      {items.map((pkg) => (
        <div key={pkg.id} className="grid min-w-0 grid-cols-[80px_minmax(0,1fr)] gap-3 rounded-lg border bg-card p-3 transition hover:border-primary/30 min-[375px]:grid-cols-[96px_minmax(0,1fr)]">
          <Link to="/package/$packageId" params={{ packageId: pkg.id }} className="min-w-0 self-start overflow-hidden rounded-md"><img src={packageImages[pkg.category]} alt={pkg.category === "Solar" ? "Solar inverter" : `${pkg.category} equipment`} loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover transition hover:scale-105" /></Link>
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-[10px] font-semibold uppercase text-muted-foreground">{pkg.category}</p>
            <h3 className="text-sm font-bold"><Link to="/package/$packageId" params={{ packageId: pkg.id }} className="hover:text-primary">{pkg.name}</Link></h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{pkg.note}</p>
            <p className="my-2 text-sm font-bold text-primary">{pkg.price === null ? "Price on request" : `$${pkg.price.toLocaleString()}`}</p>
            <div className="grid grid-cols-2 gap-2">
              <Button asChild variant="outline" size="sm" className="h-auto min-h-11 whitespace-normal px-1.5">
                <Link to="/package/$packageId" params={{ packageId: pkg.id }}>Details</Link>
              </Button>
              <Button asChild variant="secondary" size="sm" className="h-auto min-h-11 whitespace-normal px-1.5">
                <Link to="/quote" search={{ package: pkg.id }}>Quote <ArrowRight /></Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No packages found.</p>}
    </div>
  );
}