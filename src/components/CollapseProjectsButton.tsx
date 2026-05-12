"use client";

import { ChevronUp } from "lucide-react";
import { trackPortfolioEvent } from "@/lib/analytics";

type CollapseProjectsButtonProps = {
  section: "experience" | "education";
  experienceType: string;
  organization: string;
  title: string;
};

export function CollapseProjectsButton({
  section,
  experienceType,
  organization,
  title
}: CollapseProjectsButtonProps) {
  return (
    <button
      type="button"
      aria-label="Collapse projects"
      title="Collapse projects"
      className="grid h-12 w-12 place-items-center rounded-full border border-line bg-card text-coral shadow-soft transition hover:-translate-y-0.5 hover:border-coral/40 hover:bg-coral hover:text-white focus:outline-none focus:ring-4 focus:ring-coral/20"
      onClick={(event) => {
        trackPortfolioEvent("experience.projects.collapse.click", {
          section,
          experienceType,
          organization,
          title,
          source: "project_grid_footer"
        });

        const details = event.currentTarget.closest("details");
        const summary = details?.querySelector("summary");

        if (details) {
          details.open = false;
        }

        if (summary instanceof HTMLElement) {
          summary.focus();
        }
      }}
    >
      <ChevronUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
