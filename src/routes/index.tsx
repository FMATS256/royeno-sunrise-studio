import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Phone } from "@/components/AppShell";
import logo from "@/assets/royeno-official-logo.png.asset.json";
import panels from "@/assets/splash-panels.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Royeno Solartech — Solar Energy Has Changed The World" },
      { name: "description", content: "Solar Energy Has Changed The World. Quotes, installs and support from Royeno Solartech." },
      { property: "og:title", content: "Royeno Solartech" },
      { property: "og:description", content: "Solar Energy Has Changed The World" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/login", replace: true }), 2600);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <Phone>
      <div className="bg-navy-deep relative flex flex-1 flex-col overflow-hidden">
        <img src={panels} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="splash-shade pointer-events-none absolute inset-0" />

        <div className="relative flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="animate-pop relative w-full max-w-sm bg-primary-foreground px-5 py-6">
            <img src={logo.url} alt="Royeno Solartech" className="relative w-full object-contain" />
          </div>
          <p
            className="animate-fade-up mt-7 max-w-64 text-sm font-semibold leading-relaxed text-sun"
            style={{ animationDelay: "0.34s" }}
          >
            Solar Energy Has Changed The World
          </p>
        </div>

        <div className="animate-fade-in relative px-10 pb-12" style={{ animationDelay: "0.5s" }}>
          <div className="h-1.5 overflow-hidden rounded-full bg-primary-foreground/15">
            <div className="animate-rise-bar h-full rounded-full bg-sun" />
          </div>
          <div className="mt-4 flex items-center justify-between text-[11px] font-semibold text-primary-foreground/90">
            <span>Powering Zimbabwe</span>
            <span>Loading…</span>
          </div>
        </div>
      </div>
    </Phone>
  );
}
