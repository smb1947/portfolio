"use client";

import type { LucideIcon } from "lucide-react";
import { CirclePlay, Code, ExternalLink, FileText, Newspaper, Presentation } from "lucide-react";
import { trackPortfolioEvent } from "@/lib/analytics";
import type { ProjectResource } from "@/lib/data";

type ProjectActionButtonProps = {
  resource: ProjectResource;
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

const actionIconMap: Record<ProjectResource["type"], LucideIcon> = {
  article: Newspaper,
  code: Code,
  demo: CirclePlay,
  doc: FileText,
  other: ExternalLink,
  slides: Presentation
};

export function ProjectActionButton({
  resource,
  section,
  experienceType,
  organization,
  experienceTitle,
  projectTitle
}: ProjectActionButtonProps) {
  const { label, type, url } = resource;
  const className =
    "project-resource-button relative inline-flex h-11 w-11 flex-none items-center justify-center rounded-full border transition-colors duration-200";

  if (!url) {
    return null;
  }

  const Icon = actionIconMap[type];

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${label}`}
      data-project-resource-action
      onClick={() => {
        trackPortfolioEvent("project.action.click", {
          section,
          experienceType,
          organization,
          experienceTitle,
          projectTitle,
          action: type,
          href: url,
          destination: getActionDestination(url)
        });
      }}
      className={`${className} border-line bg-card text-coral shadow-sm [@media(hover:hover)]:hover:border-teal/40 [@media(hover:hover)]:hover:bg-teal [@media(hover:hover)]:hover:text-white focus:outline-none focus:ring-4 focus:ring-teal/20`}
    >
      <Icon className="project-resource-icon h-4 w-4 flex-none" aria-hidden="true" />
      <span className="project-resource-label" aria-hidden="true">
        {label}
      </span>
    </a>
  );
}
