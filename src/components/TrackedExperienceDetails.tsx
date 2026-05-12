"use client";

import type { ReactNode, SyntheticEvent } from "react";
import { trackPortfolioEvent } from "@/lib/analytics";

type TrackedExperienceDetailsProps = {
  children: ReactNode;
  section: "experience" | "education";
  experienceType: string;
  organization: string;
  title: string;
  className?: string;
};

export function TrackedExperienceDetails({
  children,
  section,
  experienceType,
  organization,
  title,
  className
}: TrackedExperienceDetailsProps) {
  const handleToggle = (event: SyntheticEvent<HTMLDetailsElement>) => {
    trackPortfolioEvent("experience.toggle.click", {
      section,
      experienceType,
      organization,
      title,
      state: event.currentTarget.open ? "expanded" : "collapsed"
    });
  };

  return (
    <details className={className} onToggle={handleToggle}>
      {children}
    </details>
  );
}
