"use client";

import type { LucideIcon } from "lucide-react";
import { FileCode2, FileText, PlayCircle } from "lucide-react";
import { trackPortfolioEvent } from "@/lib/analytics";

type ProjectActionButtonProps = {
  label: "Doc" | "Code" | "Demo";
  href: string;
  section: "experience" | "education";
  experienceType: string;
  organization: string;
  experienceTitle: string;
  projectTitle: string;
};

function getActionDestination(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
  return href.startsWith("/") ? "internal" : "unknown";
  }
}

const actionIconMap: Record<ProjectActionButtonProps["label"], LucideIcon> = {
  Doc: FileText,
  Code: FileCode2,
  Demo: PlayCircle
};

export function ProjectActionButton({
  label,
  href,
  section,
  experienceType,
  organization,
  experienceTitle,
  projectTitle
}: ProjectActionButtonProps) {
  const className = "inline-grid h-11 w-11 place-items-center rounded-full border transition";

  if (!href) {
    return null;
  }

  const action = label.toLowerCase();
  const Icon = actionIconMap[label];

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${label}`}
      title={label}
      onClick={() => {
        trackPortfolioEvent("project.action.click", {
          section,
          experienceType,
          organization,
          experienceTitle,
          projectTitle,
          action,
          href,
          destination: getActionDestination(href)
        });
      }}
      className={`${className} border-line bg-card text-coral shadow-sm hover:-translate-y-0.5 hover:border-teal/40 hover:bg-teal hover:text-white focus:outline-none focus:ring-4 focus:ring-teal/20`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
