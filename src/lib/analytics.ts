"use client";

import { track } from "@vercel/analytics/react";
import { pageview } from "@vercel/analytics";

type AnalyticsValue = string | number | boolean | null | undefined;
type PortfolioEventProperties = Record<string, AnalyticsValue>;

export function trackPortfolioEvent(name: string, properties: PortfolioEventProperties = {}) {
  track(name, {
    app: "portfolio",
    ...properties
  });
}

export function trackPortfolioUtilityRoute(route: string) {
  pageview({
    route,
    path: route
  });
}
