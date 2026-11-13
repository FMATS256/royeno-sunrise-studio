import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { createElement } from "react";
import { Route as SplashRoute } from "@/routes/index";

const { navigate } = vi.hoisted(() => ({ navigate: vi.fn() }));
vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...await importOriginal<typeof import("@tanstack/react-router")>(),
  useNavigate: () => navigate,
}));

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("opens splash before moving to client login", () => {
    vi.useFakeTimers();
    navigate.mockClear();
    const Splash = SplashRoute.options.component;
    if (!Splash) throw new Error("Splash page missing");
    try {
      render(createElement(Splash));
      vi.advanceTimersByTime(2599);
      expect(navigate).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);
      expect(navigate).toHaveBeenCalledWith({ to: "/login", replace: true });
    } finally {
      cleanup();
      vi.useRealTimers();
    }
  });
});
