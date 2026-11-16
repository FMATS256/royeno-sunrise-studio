import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  INSTALL_DISMISS_KEY,
  installInstructions,
  useInstallPrompt,
} from "@/lib/pwa-install";

/**
 * "Install the app" card. Shows the browser's own install dialog when it can,
 * otherwise manual Add to Home Screen steps. Hidden once installed or dismissed.
 */
export function InstallBanner() {
  const { canPrompt, installed, ios, promptInstall } = useInstallPrompt();
  // Render nothing until hydrated so server and client markup always match;
  // installed/dismissed state only exists in the browser.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [dismissed, setDismissed] = useState(
    () => typeof localStorage !== "undefined" && localStorage.getItem(INSTALL_DISMISS_KEY) === "1",
  );
  const [showSteps, setShowSteps] = useState(false);

  if (!mounted || installed || dismissed) return null;

  const dismiss = () => {
    localStorage.setItem(INSTALL_DISMISS_KEY, "1");
    setDismissed(true);
  };

  const onInstall = async () => {
    if (canPrompt) {
      const accepted = await promptInstall();
      if (!accepted) setShowSteps(true);
    } else {
      setShowSteps(true);
    }
  };

  return (
    <section
      aria-label="Install the app"
      className="relative overflow-hidden rounded-lg border border-primary/25 bg-accent/60 p-4"
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-navy text-primary-foreground">
          <Download className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-primary">Install the app</p>
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
            {showSteps
              ? installInstructions(ios)
              : "Add Royeno Solartech to your home screen for quick access."}
          </p>
          {!showSteps && (
            <Button
              onClick={onInstall}
              className="bg-sun mt-2.5 h-auto min-h-10 rounded-lg px-4 py-2 text-xs font-bold text-secondary-foreground shadow-sun transition hover:brightness-110"
            >
              <Download className="h-3.5 w-3.5" /> Install Now
            </Button>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Dismiss install prompt"
          onClick={dismiss}
          className="h-9 w-9 shrink-0 text-muted-foreground hover:text-primary"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
