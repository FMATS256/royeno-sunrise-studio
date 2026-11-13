import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Phone } from "@/components/AppShell";
import logo from "@/assets/royeno-logo.png.asset.json";
import panels from "@/assets/splash-panels.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Royeno Solartech — Your Solar Journey, One App" }, { name: "description", content: "Solar Energy Has Changed The World. Quotes, installs and support from Royeno Solartech." }, { property: "og:title", content: "Royeno Solartech" }, { property: "og:description", content: "Solar Energy Has Changed The World" }] }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => { const t = setTimeout(() => navigate({ to: "/login" }), 2500); return () => clearTimeout(t); }, [navigate]);
  return (
    <Phone>
      <div className="flex flex-1 flex-col bg-navy">
        <div className="bg-card px-8 pb-8 pt-16 text-center">
          <img src={logo.url} alt="Royeno Solartech" className="mx-auto w-64" />
          <p className="mt-4 text-lg font-semibold text-primary">Your Solar Journey, One App.</p>
        </div>
        <div className="relative flex-1">
          <img src={panels} alt="" width={768} height={1024} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 flex h-1/2 flex-col items-center justify-end gap-2 bg-gradient-to-t from-primary to-transparent pb-12 text-primary-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            <span className="text-sm">Loading...</span>
          </div>
        </div>
      </div>
    </Phone>
  );
}
