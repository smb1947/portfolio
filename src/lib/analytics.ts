"use client";

import { track } from "@vercel/analytics/react";

type AnalyticsValue = string | number | boolean | null | undefined;
type PortfolioEventProperties = Record<string, AnalyticsValue>;

export function trackPortfolioEvent(name: string, properties: PortfolioEventProperties = {}) {
  track(name, {
    app: "portfolio",
    ...properties
  });
}
