"use client";

import type { LucideIcon } from "lucide-react";
import { Code, ExternalLink, FileText, MonitorPlay, Newspaper, Presentation } from "lucide-react";
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
  demo: MonitorPlay,
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
    "group/resource inline-flex h-11 max-w-11 items-center overflow-hidden rounded-full border px-0 transition-all duration-200 hover:max-w-48 hover:px-4 focus:max-w-48 focus:px-4";

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
      title={label}
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
      className={`${className} border-line bg-card text-coral shadow-sm hover:-translate-y-0.5 hover:border-teal/40 hover:bg-teal hover:text-white focus:outline-none focus:ring-4 focus:ring-teal/20`}
    >
      <Icon className="mx-[0.8125rem] h-4 w-4 flex-none transition-all duration-200 group-hover/resource:mx-0 group-focus/resource:mx-0" aria-hidden="true" />
      <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold opacity-0 transition-all duration-200 group-hover/resource:ml-2 group-hover/resource:max-w-32 group-hover/resource:opacity-100 group-focus/resource:ml-2 group-focus/resource:max-w-32 group-focus/resource:opacity-100">
        {label}
      </span>
    </a>
  );
}
