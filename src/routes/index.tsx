import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Phone } from "@/components/AppShell";
import lockup from "@/assets/royeno-lockup.png.asset.json";
import mark from "@/assets/royeno-mark.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Royeno Solartech — Solar Energy Has Changed The World" },
      { name: "description", content: "Solar Energy Has Changed The World. Quotes, installs and support from Royeno Solartech." },
      { property: "og:title", content: "Royeno Solartech" },
      { property: "og:description", content: "Solar Energy Has Changed The World" },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/login" }), 2600);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <Phone>
      <div className="bg-navy-deep relative flex flex-1 flex-col overflow-hidden">
        {/* sun rays + glow behind the mark */}
        <div className="rays pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[image:var(--glow-sun)]" />
        <div className="panel-grid pointer-events-none absolute inset-x-0 bottom-0 h-56 opacity-25" />
        <div className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-secondary/30 blur-3xl" />

        <div className="relative flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="animate-pop relative">
            <div className="animate-glow absolute inset-0 -m-6 rounded-full bg-sun/30 blur-2xl" />
            <img src={mark.url} alt="Royeno Solartech" className="relative h-24 w-24 object-contain" />
          </div>
          <img
            src={lockup.url}
            alt="Royeno Solartech"
            className="animate-fade-up mt-6 w-52 object-contain"
            style={{ animationDelay: "0.18s" }}
          />
          <p
            className="animate-fade-up mt-7 text-[11px] font-semibold tracking-[0.28em] text-sun uppercase"
            style={{ animationDelay: "0.34s" }}
          >
            Solar Energy Has Changed The World
          </p>
        </div>

        <div className="animate-fade-in relative px-10 pb-12" style={{ animationDelay: "0.5s" }}>
          <div className="h-1.5 overflow-hidden rounded-full bg-primary-foreground/15">
            <div className="animate-rise-bar h-full rounded-full bg-sun" />
          </div>
          <div className="mt-4 flex items-center justify-between text-[11px] font-medium text-primary-foreground/75">
            <span>Powering Zimbabwe</span>
            <span>Loading…</span>
          </div>
        </div>
      </div>
    </Phone>
  );
}
