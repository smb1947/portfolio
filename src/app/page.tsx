"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BicepsFlexed,
  Blocks,
  Brain,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  ChevronUp,
  Code2,
  Drama,
  Dumbbell,
  HeartHandshake,
  Landmark,
  Linkedin,
  MapPin,
  Mountain,
  MountainSnow,
  Music4,
  PlayCircle,
  Puzzle,
  School,
  Search,
  ShieldCheck,
  Spade,
  Sparkles,
  Target,
  TrendingUpDown,
  Users,
  Wrench,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  aboutProfile,
  portfolio
} from "@/lib/data";
import type { Experience, Project } from "@/lib/data";
import { publicAsset } from "@/lib/assets";
import { CapabilityWheel } from "@/components/CapabilityWheel";
import { ContactCard } from "@/components/ContactCard";
import { ContactForm } from "@/components/ContactForm";
import { OperatingTriangle } from "@/components/OperatingTriangle";
import { ProjectActionButton } from "@/components/ProjectActionButton";
import { ProjectResourceSpotlight } from "@/components/ProjectResourceSpotlight";
import { RoseIcon } from "@/components/icons/RoseIcon";
import { SectionRouteSync } from "@/components/SectionRouteSync";
import { trackPortfolioEvent, trackPortfolioUtilityRoute } from "@/lib/analytics";

function QuestionWordHighlight({ text }: { text: string }) {
  const match = text.match(/^(Who|What|Where|When|Why|How)(?=\b|['’]s\b)/i);

  if (!match) {
    return <>{text}</>;
  }

  const questionWord = text.slice(0, match[0].length);
  const rest = text.slice(match[0].length);

  return (
    <>
      <span className="text-teal">{questionWord}</span>
      {rest}
    </>
  );
}

function LeadingPhraseHighlight({ text, phrase }: { text: string; phrase: string }) {
  if (!text.startsWith(phrase)) {
    return <>{text}</>;
  }

  return (
    <>
      <span className="text-teal">{phrase}</span>
      {text.slice(phrase.length)}
    </>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <div>
      <p className="font-serif text-4xl font-semibold text-navy md:text-5xl">
        <QuestionWordHighlight text={children} />
      </p>
      <div className="mt-5 h-1.5 w-16 rounded-full bg-coral" aria-hidden="true" />
    </div>
  );
}

const capabilityIconMap: Record<string, LucideIcon> = {
  "Customer & Behavioral Psychology": Brain,
  "AI-First Product Building": Sparkles,
  "Data-Driven Product Judgment": TrendingUpDown,
  "Strategic Business Acumen": BriefcaseBusiness,
  "Technical Depth": Code2,
  "Cross-Functional Collaboration": Users
};

const operatingModelIconMap: Record<string, LucideIcon> = {
  Agency: Zap,
  "Human-Centered": HeartHandshake,
  Thoughtful: Search
};

const personalInterestIconMap: Record<string, LucideIcon> = {
  "Behavioral psychology": Brain,
  Hiking: Mountain,
  Gym: Dumbbell,
  Poker: Spade,
  Anime: Drama
};

function CardIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="grid h-10 w-10 flex-none place-items-center rounded-xl border border-coral/20 bg-coral/10 text-coral">
      <Icon className="h-5 w-5" aria-hidden="true" />
    </span>
  );
}

function CardIconSmall({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon className="h-4 w-4 flex-none text-coral" aria-hidden="true" />;
}

function QuoteIcon() {
  return (
    <span
      className="grid h-12 w-12 place-items-center rounded-xl border border-coral/20 bg-coral/10 font-serif text-[2rem] leading-none text-coral"
      aria-hidden="true"
    >
      <span className="translate-y-1">&ldquo;</span>
    </span>
  );
}

function HighlightedManagerQuote({ quote }: { quote: string }) {
  const highlightPattern = /(fun|ownership|bias for action)/gi;
  const exactHighlightPattern = /^(fun|ownership|bias for action)$/i;
  const parts = quote.split(highlightPattern);

  return (
    <>
      {parts.map((part, index) =>
        exactHighlightPattern.test(part) ? (
          <span key={`${part}-${index}`} className="text-coral">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

function ManagerNoteCard({
  eyebrow,
  quote,
  name,
  title,
  context,
  link
}: {
  eyebrow: string;
  quote: string;
  name: string;
  title: string;
  context: string;
  link: string;
}) {
  return (
    <article className="mt-5 rounded-2xl border border-line bg-card p-5 shadow-soft md:p-6">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-4 md:gap-x-5">
        <QuoteIcon />
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal">{eyebrow}</p>
          <blockquote className="mt-3 font-serif text-xl font-semibold leading-snug text-navy md:text-2xl">
            &ldquo;<HighlightedManagerQuote quote={quote} />&rdquo;
          </blockquote>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          aria-label="Open LinkedIn comment"
          title="LinkedIn Comment"
          className="grid h-11 w-11 place-items-center self-center justify-self-center rounded-full border border-line bg-card text-coral shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-teal/40 hover:bg-teal hover:text-white focus:outline-none focus:ring-4 focus:ring-teal/20"
        >
          <Linkedin className="h-5 w-5" aria-hidden="true" />
        </a>
        <div className="min-w-0 self-center">
          <p className="text-sm font-bold text-navy">{name}</p>
          <p className="mt-1 text-sm leading-6 text-muted">{title}</p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-coral">
            {context}
          </p>
        </div>
      </div>
    </article>
  );
}

type LogoAsset = {
  src: `/${string}`;
  alt: string;
  padded?: boolean;
  compact?: boolean;
};

function getExperienceCompanyLogo(organization: string): LogoAsset | null {
  if (organization.includes("Microsoft")) {
    return { src: "/logos/microsoft.svg", alt: "Microsoft logo" };
  }

  if (organization.includes("Amazon")) {
    return { src: "/logos/amazon.svg", alt: "Amazon logo" };
  }

  if (organization.includes("University of Washington")) {
    return { src: "/logos/uw.svg", alt: "University of Washington logo" };
  }

  if (organization.includes("NextLeap")) {
    return { src: "/logos/nextleap.svg", alt: "NextLeap logo" };
  }

  if (organization.includes("IIIT Hyderabad")) {
    return { src: "/logos/iiit-hyderabad.jpg", alt: "IIIT Hyderabad logo", compact: true };
  }

  if (organization.includes("PES")) {
    return { src: "/logos/pes.png", alt: "PES University logo", compact: true };
  }

  return null;
}

function getExperienceProductLogo(organization: string): LogoAsset | null {
  if (organization.includes("Microsoft")) {
    return { src: "/logos/azure.svg", alt: "Microsoft Azure logo" };
  }

  if (organization.includes("Amazon")) {
    return { src: "/logos/aws.svg", alt: "Amazon Web Services logo", padded: true };
  }

  return null;
}

function ExperienceLogo({ organization }: { organization: string }) {
  const logo = getExperienceCompanyLogo(organization);

  if (logo) {
    return (
      <div
        className="grid h-12 w-12 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-line"
        aria-label={logo.alt}
      >
        <img
          src={publicAsset(logo.src)}
          alt=""
          className={`h-full w-full object-contain ${
            logo.compact ? "p-1" : logo.padded ? "p-1.5" : "p-2"
          }`}
        />
      </div>
    );
  }

  return null;
}

function ExperienceSubLogo({ organization }: { organization: string }) {
  const logo = getExperienceProductLogo(organization);

  if (!logo) {
    return null;
  }

  return (
    <span
      className="grid h-7 w-7 place-items-center overflow-hidden rounded-full border-2 border-card bg-white p-1 shadow-sm"
      aria-label={logo.alt}
    >
      <img src={publicAsset(logo.src)} alt="" className="h-full w-full object-contain" />
    </span>
  );
}

function getProjectLogo(projectTitle: string): { label: string; icon: LucideIcon; className: string; mark?: string } {
  const title = projectTitle.toLowerCase();

  if (title.includes("spotify")) return { label: "Spotify", icon: Music4, className: "bg-[#1db954] text-white" };
  if (title.includes("asana")) return { label: "Asana", icon: Puzzle, className: "bg-[#fc636b] text-white" };
  if (title.includes("heylily")) return { label: "HeyLily", icon: ShieldCheck, className: "bg-teal text-white" };
  if (title.includes("roblox")) return { label: "Roblox", icon: Building2, className: "bg-[#111111] text-white" };
  if (title.includes("copilot")) return { label: "Microsoft 365 Copilot", icon: Sparkles, className: "bg-[#2563eb] text-white" };
  if (title.includes("netflix")) return { label: "Netflix", icon: PlayCircle, className: "bg-[#e50914] text-white", mark: "N" };
  if (title.includes("figma")) return { label: "Figma", icon: Puzzle, className: "bg-[#a259ff] text-white", mark: "F" };
  if (title.includes("bumble")) return { label: "Bumble", icon: RoseIcon, className: "bg-[#ffcb37] text-[#142432]" };
  if (title.includes("wslblobnfs")) return { label: "WSLBlobNFS", icon: Code2, className: "bg-[#0078d4] text-white" };
  if (title.includes("blobnfs")) return { label: "Azure Blob NFS", icon: Wrench, className: "bg-[#0078d4] text-white" };
  if (title.includes("hike")) return { label: "AI Hike Researcher", icon: MountainSnow, className: "bg-[#7c4a2d] text-white" };
  if (title.includes("streakfit")) return { label: "StreakFit AI", icon: BicepsFlexed, className: "bg-coral text-white" };
  if (title.includes("teardown")) return { label: "Product Teardown Series", icon: Blocks, className: "bg-[#dc2626] text-white" };
  if (title.includes("quantum")) return { label: "Quantum Tech Partners", icon: Target, className: "bg-[#2f4858] text-white" };
  if (title.includes("sbs")) return { label: "SBS Consulting", icon: Landmark, className: "bg-[#6f4e37] text-white" };
  if (title.includes("tech club")) return { label: "Foster Tech Club", icon: School, className: "bg-[#4b2e83] text-[#b7a57a]" };
  if (title.includes("sketch")) return { label: "Sketch-to-Image", icon: Sparkles, className: "bg-[#005baa] text-white" };

  return { label: projectTitle, icon: Sparkles, className: "bg-coral text-white" };
}

function ProjectLogo({ title }: { title: string }) {
  const logo = getProjectLogo(title);
  const Icon = logo.icon;

  return (
    <div
      className={`grid h-12 w-12 flex-none place-items-center rounded-2xl shadow-sm ring-1 ring-line ${logo.className}`}
      aria-label={`${logo.label} logo`}
      title={logo.label}
    >
      {logo.mark ? <span className="font-serif text-2xl font-black">{logo.mark}</span> : <Icon className="h-6 w-6" aria-hidden="true" />}
    </div>
  );
}

type ProjectSection = "experience" | "education";

function getProjectSection(experience: Experience): ProjectSection {
  return experience.type === "education" ? "education" : "experience";
}

function CredentialLine({ text }: { text: string }) {
  const highlightPattern = /(AWS|Azure|UW Foster)/g;
  const highlightedTerms = new Set(["AWS", "Azure", "UW Foster"]);
  const parts = text.split(highlightPattern);

  return (
    <>
      {parts.map((part, index) =>
        highlightedTerms.has(part) ? (
          <span key={`${part}-${index}`} className="text-teal">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

function ProjectResourceActions({
  project,
  experience,
  section
}: {
  project: Project;
  experience: Experience;
  section: ProjectSection;
}) {
  if (project.resources.length === 0) {
    return null;
  }

  return (
    <div className="mt-auto flex flex-wrap gap-3 border-t border-line pt-5">
      {project.resources.map((resource) => (
        <ProjectActionButton
          key={`${resource.type}-${resource.label}-${resource.url}`}
          resource={resource}
          section={section}
          experienceType={experience.type}
          organization={experience.organization}
          experienceTitle={experience.title}
          projectTitle={project.title}
        />
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  experience,
  section,
  id,
  surface = "nested"
}: {
  project: Project;
  experience: Experience;
  section: ProjectSection;
  id?: string;
  surface?: "nested" | "card";
}) {
  const surfaceClassName = surface === "card" ? "bg-card" : "bg-background";

  return (
    <section
      id={id}
      className={`flex h-full flex-col rounded-2xl border border-line ${surfaceClassName} p-5 transition duration-200 hover:-translate-y-0.5 hover:border-coral/30 hover:shadow-soft`}
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
        <ProjectLogo title={project.title} />
        <div className="min-w-0">
          <h4 className="font-serif text-xl font-semibold leading-tight text-navy md:text-2xl">
            {project.title}
          </h4>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-coral">
            {formatProjectDateRange(project)}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted">{project.description}</p>
      <ProjectResourceActions project={project} experience={experience} section={section} />
    </section>
  );
}

type FeaturedProjectItem = {
  experience: Experience;
  project: Project;
  section: ProjectSection;
};

function CompactFeaturedProjects({
  projects,
  onExpand
}: {
  projects: FeaturedProjectItem[];
  onExpand: () => void;
}) {
  return (
    <section
      className="featured-projects-summary relative cursor-pointer rounded-2xl border border-line bg-card px-5 pb-5 pt-3 shadow-soft print:hidden sm:pb-3 md:px-6"
      aria-label="Additional featured projects"
    >
      <button
        type="button"
        aria-controls="featured-project-grid"
        aria-expanded="false"
        aria-label="Expand featured projects"
        data-featured-project-summary-trigger
        className="absolute inset-x-0 -bottom-6 top-0 z-10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-inset focus:ring-coral/20"
        onClick={onExpand}
      />
      <ul className="compact-featured-projects-grid grid sm:grid-cols-2">
        {projects.map(({ project }) => (
          <li
            key={project.title}
            className="compact-featured-project-item flex min-w-0 items-center gap-4 py-4"
          >
            <ProjectLogo title={project.title} />
            <p className="min-w-0 font-serif text-lg font-semibold leading-tight text-navy md:text-xl">
              {project.title}
            </p>
          </li>
        ))}
      </ul>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex translate-y-1/2 justify-center">
        <span
          className="featured-projects-expand-button inline-flex h-12 items-center justify-center overflow-hidden rounded-full border border-coral/40 bg-card text-coral shadow-soft"
          aria-hidden="true"
        >
          <ChevronDown className="h-5 w-5 flex-none" aria-hidden="true" />
          <span className="featured-projects-expand-label whitespace-nowrap text-sm font-bold">
            Expand
          </span>
        </span>
      </div>
    </section>
  );
}

type HistoryEntry = {
  id: string;
  label: string;
  organization: string;
  from: string;
  to: string;
  experiences: Experience[];
};

function formatHistoryDateRange(entry: HistoryEntry) {
  return formatYearDateRange(entry.from, entry.to);
}

function formatProjectDateRange(project: Project) {
  return formatYearDateRange(project.from, project.to);
}

function formatYearDateRange(from: string, to: string) {
  if (!to) {
    return getDateYear(from);
  }

  if (!from || from === to) {
    return getDateYear(to);
  }

  const fromYear = getDateYear(from);
  const toYear = getDateYear(to);

  if (fromYear === toYear) {
    return toYear;
  }

  return `${fromYear} - ${toYear}`;
}

function formatEducationHistoryDate(entry: HistoryEntry) {
  return getDateYear(entry.to || entry.from);
}

function formatWorkHistoryDate(entry: HistoryEntry) {
  return formatHistoryDateRange(entry);
}

function formatRoleHistoryDate(experience: Experience) {
  return formatHistoryDateRange({
    id: `${experience.organization}-${experience.title}`,
    label: experience.title,
    organization: experience.organization,
    from: experience.from,
    to: experience.to,
    experiences: [experience]
  });
}

function getDateYear(dateText: string) {
  return dateText.match(/\d{4}/)?.[0] ?? dateText;
}

const monthIndex: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11
};

function getDateSortValue(dateText: string) {
  if (dateText === "Ongoing") {
    return Number.MAX_SAFE_INTEGER;
  }

  const [month, year] = dateText.split(" ");
  const numericYear = Number(year);

  if (!Number.isFinite(numericYear)) {
    return 0;
  }

  return numericYear * 12 + (monthIndex[month] ?? 0);
}

function getHistoryRange(experiences: Experience[]) {
  const sortedStarts = [...experiences].sort((a, b) => getDateSortValue(a.from) - getDateSortValue(b.from));
  const sortedEnds = [...experiences].sort((a, b) => getDateSortValue(b.to) - getDateSortValue(a.to));

  return {
    from: sortedStarts[0]?.from ?? "",
    to: sortedEnds[0]?.to ?? ""
  };
}

function projectId(title: string) {
  return `project-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

function HistoryDetailSummary({
  experience,
  section,
  compact = false
}: {
  experience: Experience;
  section: "experience" | "education";
  compact?: boolean;
}) {
  const heading = section === "education" ? experience.organization : experience.title;

  return (
    <article className={compact ? "border-t border-line pt-5 first:border-t-0 first:pt-0" : ""}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h4 className="font-serif text-xl font-semibold leading-tight text-navy md:text-2xl">
          {heading}
        </h4>
      </div>
      {compact && section === "experience" ? (
        <p className="mt-1 text-sm font-bold text-muted">{formatRoleHistoryDate(experience)}</p>
      ) : null}
      <p className="mt-2 flex items-center gap-2 text-sm text-muted">
        <MapPin className="h-4 w-4 flex-none text-coral" aria-hidden="true" />
        {experience.location}
      </p>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-muted md:text-base">{experience.summary}</p>
    </article>
  );
}

function ExpandedHistoryDetails({
  entry,
  section,
  onCollapse
}: {
  entry: HistoryEntry;
  section: "experience" | "education";
  onCollapse: () => void;
}) {
  const projectItems = entry.experiences.flatMap((experience) =>
    experience.organization === "Microsoft"
      ? []
      : experience.projects.map((project) => ({ experience, project }))
  );

  return (
    <div className="relative border-t border-line bg-background/25 px-4 pb-6 pt-5 md:px-6 md:pt-6">
      <div className="px-1 md:px-2">
        <div className="space-y-5">
          {entry.experiences.map((experience) => (
            <HistoryDetailSummary
              key={`${experience.organization}-${experience.title}`}
              experience={experience}
              section={section}
              compact={entry.experiences.length > 1}
            />
          ))}
        </div>

        {projectItems.length ? (
          <div className="mt-7 border-t border-line pt-6">
            <div className="mb-4">
              <h4 className="font-serif text-xl font-semibold text-navy md:text-2xl">Projects</h4>
            </div>
            <div className="grid gap-5 lg:grid-cols-2 print:grid-cols-2">
              {projectItems.map(({ experience, project }) => (
                <ProjectCard
                  id={projectId(project.title)}
                  key={`${experience.title}-${project.title}`}
                  project={project}
                  experience={experience}
                  section={section}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex translate-y-1/2 justify-center">
        <button
          type="button"
          aria-label={`Collapse ${entry.label} details`}
          onClick={onCollapse}
          className="grid h-12 w-12 place-items-center rounded-full border border-coral/40 bg-card text-coral shadow-soft transition [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-teal/40 [@media(hover:hover)]:hover:bg-teal [@media(hover:hover)]:hover:text-white focus:outline-none focus:ring-4 focus:ring-coral/20"
        >
          <ChevronUp className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function createHistoryEntries(experiences: Experience[], section: "experience" | "education"): HistoryEntry[] {
  if (section === "experience") {
    const microsoftExperiences = experiences.filter((experience) => experience.organization === "Microsoft");
    const otherExperiences = experiences.filter((experience) => experience.organization !== "Microsoft");
    const microsoftRange = getHistoryRange(microsoftExperiences);

    return [
      ...otherExperiences.map((experience) => ({
        id: `${experience.organization}-${experience.from}-${experience.to}`,
        label: experience.organization,
        organization: experience.organization,
        from: experience.from,
        to: experience.to,
        experiences: [experience]
      })),
      ...(microsoftExperiences.length
        ? [
            {
              id: `Microsoft-${microsoftRange.from}-${microsoftRange.to}`,
              label: "Microsoft Azure",
              organization: "Microsoft",
              from: microsoftRange.from,
              to: microsoftRange.to,
              experiences: microsoftExperiences
            }
          ]
        : [])
    ];
  }

  return experiences.map((experience) => ({
    id: `${experience.organization}-${experience.from}-${experience.to}`,
    label: getEducationHistoryLabel(experience.title),
    organization: experience.organization,
    from: experience.from,
    to: experience.to,
    experiences: [experience]
  }));
}

function getEducationHistoryLabel(title: string) {
  if (title.includes("Master of Business Administration")) {
    return "Master of Business Administration (STEM)";
  }

  if (title.includes("Advanced AI/ML")) {
    return "Advanced AI/ML";
  }

  if (title.includes("Product Management Fellowship")) {
    return "Product Fellowship";
  }

  if (title.includes("Bachelor of Engineering")) {
    return "Computer Science & Engineering";
  }

  return title;
}

function slugifyHistoryValue(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getExperienceAnalyticsSlug(entry: HistoryEntry) {
  const source = `${entry.organization} ${entry.label} ${entry.experiences
    .map((experience) => experience.title)
    .join(" ")}`.toLowerCase();

  if (source.includes("amazon web services") || source.includes("aws")) {
    return "aws";
  }

  if (source.includes("azure") || source.includes("microsoft")) {
    return "azure";
  }

  return slugifyHistoryValue(entry.organization || entry.label);
}

function getEducationAnalyticsSlug(entry: HistoryEntry) {
  const education = entry.experiences[0]?.education;

  if (education?.type === "Masters") {
    return "mba";
  }

  if (education?.type === "Fellowship") {
    return "nextleap";
  }

  if (education?.type === "Certificate") {
    return "adv-ai-ml";
  }

  if (education?.type === "Bachelors") {
    return "cse";
  }

  return slugifyHistoryValue(entry.label);
}

function getHistoryAnalyticsPath(entry: HistoryEntry, section: "experience" | "education") {
  const slug = section === "experience" ? getExperienceAnalyticsSlug(entry) : getEducationAnalyticsSlug(entry);

  return `${section}/${slug}`;
}

function HistoryList({
  entries,
  section,
  expandedKey,
  onToggle
}: {
  entries: HistoryEntry[];
  section: "experience" | "education";
  expandedKey: string | null;
  onToggle: (key: string) => void;
}) {
  const collapseAndKeepRowInView = (entryKey: string) => {
    const row = document.getElementById(`${entryKey}-row`);
    const trigger = document.getElementById(`${entryKey}-trigger`);

    onToggle(entryKey);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        row?.scrollIntoView({ block: "center" });

        if (trigger instanceof HTMLElement) {
          trigger.focus({ preventScroll: true });
        }
      });
    });
  };

  const expandAndTrackEntry = (entryKey: string, entry: HistoryEntry) => {
    const analyticsPath = getHistoryAnalyticsPath(entry, section);

    onToggle(entryKey);
    trackPortfolioEvent("history.expand.click", {
      section,
      path: analyticsPath,
      label: entry.label,
      organization: entry.organization
    });
    trackPortfolioUtilityRoute(`/${analyticsPath}`);
  };

  return (
    <div className="mt-10 overflow-hidden rounded-[1.35rem] border border-line bg-card shadow-soft">
      {entries.map((entry, index) => {
        const entryKey = `${section}-${entry.id}`;
        const isExpanded = expandedKey === entryKey;

        return (
          <div id={`${entryKey}-row`} key={entry.id} className={index === 0 ? "" : "border-t border-line"}>
            <button
              id={`${entryKey}-trigger`}
              type="button"
              onClick={() =>
                isExpanded ? collapseAndKeepRowInView(entryKey) : expandAndTrackEntry(entryKey, entry)
              }
              className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 text-left transition duration-200 hover:bg-background/60 focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-teal/20 md:px-6"
              aria-expanded={isExpanded}
              aria-controls={`${entryKey}-details`}
            >
              <div className="relative h-14 w-14">
                <ExperienceLogo organization={entry.organization} />
                {getExperienceProductLogo(entry.organization) ? (
                  <div className="absolute -bottom-1 -right-1">
                    <ExperienceSubLogo organization={entry.organization} />
                  </div>
                ) : null}
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-2xl font-semibold leading-tight text-navy">
                  {entry.label}
                </h3>
                <p className="mt-1 text-sm font-bold text-muted">
                  {section === "education" ? formatEducationHistoryDate(entry) : formatWorkHistoryDate(entry)}
                </p>
              </div>
              <span className="grid h-11 w-11 place-items-center text-coral transition duration-200 [@media(hover:hover)]:hover:text-teal sm:justify-self-end">
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </button>
            {isExpanded ? (
              <div id={`${entryKey}-details`} className="pb-6 print:hidden">
                <ExpandedHistoryDetails
                  entry={entry}
                  section={section}
                  onCollapse={() => collapseAndKeepRowInView(entryKey)}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [expandedHistoryKey, setExpandedHistoryKey] = useState<string | null>(null);
  const [showAllFeaturedProducts, setShowAllFeaturedProducts] = useState(false);
  const { contact, contactForm, experiences } = portfolio;
  const hasContactForm = Boolean(contactForm.embedUrl);
  const educationExperiences = experiences.filter((experience) => experience.type === "education");
  const professionalExperiences = experiences.filter((experience) => experience.type === "work");
  const professionalHistoryEntries = createHistoryEntries(professionalExperiences, "experience");
  const educationHistoryEntries = createHistoryEntries(educationExperiences, "education");
  const featuredProductTitles = aboutProfile.featuredProducts.map((product) => product.title);
  const featuredProducts = experiences
    .flatMap((experience) =>
      experience.projects.map((project) => ({
        experience,
        project,
        section: getProjectSection(experience)
      }))
    )
    .filter(({ project }) => featuredProductTitles.includes(project.title))
    .sort(
      (a, b) =>
        featuredProductTitles.indexOf(a.project.title) - featuredProductTitles.indexOf(b.project.title)
    );
  const primaryFeaturedProducts = featuredProducts.slice(0, 2);
  const additionalFeaturedProducts = featuredProducts.slice(2);
  const contactIntroText = aboutProfile.contactIntro.replace(/\s*☕\s*$/, "");
  const expandFeaturedProducts = () => {
    setShowAllFeaturedProducts(true);
    trackPortfolioEvent("about.featured_projects.expand.click", {
      hiddenProjects: additionalFeaturedProducts.length,
      totalProjects: featuredProducts.length,
      source: "featured_projects_summary"
    });
  };
  const collapseFeaturedProducts = () => {
    setShowAllFeaturedProducts(false);
    trackPortfolioEvent("about.featured_projects.collapse.click", {
      hiddenProjects: additionalFeaturedProducts.length,
      totalProjects: featuredProducts.length,
      source: "featured_projects_footer"
    });
    window.requestAnimationFrame(() => {
      const visibleTrigger = Array.from(
        document.querySelectorAll<HTMLElement>("[data-featured-project-summary-trigger]")
      ).find((trigger) => trigger.offsetParent !== null);

      visibleTrigger?.focus();
    });
  };

  return (
    <>
      <SectionRouteSync />
      <section id="home" className="relative scroll-mt-24 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
          <div className="relative">
            <div className="hero-banner relative h-[22rem] overflow-hidden rounded-[1.35rem] border border-line bg-card shadow-soft sm:h-[28rem] md:h-[34rem]">
              <picture>
                <source
                  media="(max-width: 639px)"
                  srcSet={publicAsset("/images/uw-cover-800.jpg")}
                />
                <source
                  media="(min-width: 640px)"
                  srcSet={publicAsset("/images/uw-cover-1600.jpg")}
                />
                <img
                  src={publicAsset("/images/uw-cover-1600.jpg")}
                  alt="Shankar with classmates and faculty at the University of Washington"
                  width={1600}
                  height={1200}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
                />
              </picture>
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/15 via-[35%] to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 px-4 sm:px-6 md:px-8 lg:px-10">
                <div className="grid grid-cols-[8rem_minmax(0,1fr)] gap-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-5 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-7">
                  <div aria-hidden="true" />
                  <div className="flex h-16 min-w-0 items-end pb-2 sm:h-20 sm:pb-3 md:h-24 lg:h-[6.5rem]">
                    <h1 className="font-serif text-3xl font-semibold leading-[1.02] text-white drop-shadow-sm sm:text-4xl md:text-5xl lg:text-7xl">
                      Shankar Binjawadgi
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative px-4 sm:px-6 md:px-8 lg:px-10">
              <div className="grid grid-cols-[8rem_minmax(0,1fr)] gap-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-5 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-7">
                <div className="relative h-16 sm:h-20 md:h-24 lg:h-[6.5rem]">
                  <div className="absolute left-0 top-0 aspect-square h-32 w-32 -translate-y-1/2 overflow-hidden rounded-[1.65rem] border-4 border-card bg-[#162531] shadow-lift sm:h-40 sm:w-40 md:h-48 md:w-48 md:rounded-[2rem] lg:h-52 lg:w-52">
                    <Image
                      src={publicAsset("/images/headshot.jpg")}
                      alt="Shankar Binjawadgi"
                      fill
                      priority
                      sizes="(min-width: 1024px) 208px, (min-width: 768px) 192px, (min-width: 640px) 160px, 128px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="min-w-0 space-y-1.5 pt-1.5 sm:space-y-2 sm:pt-2 lg:space-y-3 lg:pt-1">
                  <p className="font-serif text-sm font-semibold leading-tight text-navy sm:text-lg md:text-2xl lg:text-3xl">
                    {aboutProfile.title}
                  </p>
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.08em] text-coral sm:text-xs sm:tracking-[0.12em] md:text-sm md:tracking-[0.14em]">
                    <CredentialLine text={aboutProfile.context} />
                  </p>
                  <p className="flex items-center gap-2 text-xs font-bold text-navy sm:text-sm">
                    <MapPin className="h-4 w-4 flex-none text-coral" aria-hidden="true" />
                    {portfolio.site.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 sm:px-8 md:py-20">
        <SectionHeading>Who I Am</SectionHeading>

        <div className="mt-8 max-w-5xl space-y-5">
          <div className="space-y-5 text-base leading-8 text-muted md:text-lg">
            {aboutProfile.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <ProjectResourceSpotlight className="mt-12">
          <h3 className="font-serif text-2xl font-semibold text-navy md:text-3xl">
            <QuestionWordHighlight text={aboutProfile.featuredProductsHeading} />
          </h3>
          <p className="mt-3 max-w-5xl text-sm leading-7 text-muted md:text-base">
            {aboutProfile.featuredProductsIntro}
          </p>
          <div
            id="featured-project-grid"
            className={`relative mt-6 grid gap-5 lg:grid-cols-2 print:grid-cols-2 ${
              showAllFeaturedProducts ? "mb-6" : ""
            }`}
          >
            {showAllFeaturedProducts ? (
              featuredProducts.map(({ project, experience, section }) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  experience={experience}
                  section={section}
                  surface="card"
                />
              ))
            ) : (
              <>
                {primaryFeaturedProducts.map(({ project, experience, section }) => (
                  <div key={project.title} className="hidden lg:block print:hidden">
                    <ProjectCard
                      project={project}
                      experience={experience}
                      section={section}
                      surface="card"
                    />
                  </div>
                ))}
                <div className="pb-6 lg:hidden print:hidden">
                  <CompactFeaturedProjects
                    projects={featuredProducts}
                    onExpand={expandFeaturedProducts}
                  />
                </div>
                <div className="hidden pb-6 lg:col-span-2 lg:block print:hidden">
                  <CompactFeaturedProjects
                    projects={additionalFeaturedProducts}
                    onExpand={expandFeaturedProducts}
                  />
                </div>
                {featuredProducts.map(({ project, experience, section }) => (
                  <div key={`print-${project.title}`} className="hidden print:block">
                    <ProjectCard
                      project={project}
                      experience={experience}
                      section={section}
                      surface="card"
                    />
                  </div>
                ))}
              </>
            )}
            {showAllFeaturedProducts && additionalFeaturedProducts.length ? (
              <button
                type="button"
                aria-controls="featured-project-grid"
                aria-expanded="true"
                aria-label="Collapse featured projects"
                className="absolute bottom-0 left-1/2 z-20 grid h-12 w-12 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full border border-coral/40 bg-card text-coral shadow-soft transition [@media(hover:hover)]:hover:scale-105 [@media(hover:hover)]:hover:border-teal/40 [@media(hover:hover)]:hover:bg-teal [@media(hover:hover)]:hover:text-white focus:outline-none focus:ring-4 focus:ring-coral/20 print:hidden"
                onClick={collapseFeaturedProducts}
              >
                <ChevronUp className="h-5 w-5" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </ProjectResourceSpotlight>

        <div className="mt-12">
          <h3 className="font-serif text-2xl font-semibold text-navy md:text-3xl">
            <QuestionWordHighlight text={aboutProfile.capabilitiesHeading} />
          </h3>
          <CapabilityWheel items={aboutProfile.capabilities} iconMap={capabilityIconMap} />
        </div>

        <div className="mt-12">
          <h3 className="font-serif text-2xl font-semibold text-navy md:text-3xl">
            <LeadingPhraseHighlight text={aboutProfile.operatingModelHeading} phrase="What Is" />
          </h3>
          <OperatingTriangle items={aboutProfile.operatingModel} iconMap={operatingModelIconMap} />
          <ManagerNoteCard {...aboutProfile.managerNote} />
        </div>

        <div className="mt-12">
          <h3 className="font-serif text-2xl font-semibold text-navy md:text-3xl">
            <QuestionWordHighlight text={aboutProfile.personalSignalsHeading} />
          </h3>
          <ul className="mt-6 flex flex-wrap gap-3">
            {aboutProfile.personalSignals.map((signal) => (
              <li
                key={signal}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-bold text-navy/80"
              >
                <CardIconSmall icon={personalInterestIconMap[signal] ?? Sparkles} />
                {signal}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 sm:px-8 md:py-20">
        <SectionHeading>Where I&apos;ve Worked</SectionHeading>
        <HistoryList
          entries={professionalHistoryEntries}
          section="experience"
          expandedKey={expandedHistoryKey}
          onToggle={(key) => setExpandedHistoryKey((current) => (current === key ? null : key))}
        />
      </section>

      <section id="education" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 sm:px-8 md:py-20">
        <SectionHeading>What I&apos;ve Studied</SectionHeading>
        <HistoryList
          entries={educationHistoryEntries}
          section="education"
          expandedKey={expandedHistoryKey}
          onToggle={(key) => setExpandedHistoryKey((current) => (current === key ? null : key))}
        />
      </section>

      <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 sm:px-8 md:py-20">
        <SectionHeading>{aboutProfile.contactHeading}</SectionHeading>
        <p className="mt-6 max-w-5xl text-base leading-8 text-muted md:text-lg">
          {contactIntroText}{" "}
          <span
            className="coffee-cue inline-block text-3xl leading-none align-[-0.16em] md:text-4xl"
            aria-label="coffee"
          >
            ☕
          </span>
        </p>
        <div className={`mt-10 grid gap-6 ${hasContactForm ? "lg:grid-cols-[0.45fr_1.55fr] lg:items-start" : ""}`}>
          <div className="contact-methods flex flex-wrap gap-3">
            {contact.map((method) => (
              <ContactCard key={method.type} item={method} />
            ))}
          </div>
          {hasContactForm ? (
            <ContactForm
              title={contactForm.title}
              embedUrl={contactForm.embedUrl}
              linkUrl={contactForm.linkUrl}
            />
          ) : null}
        </div>
      </section>
    </>
  );
}
