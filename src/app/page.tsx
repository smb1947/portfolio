"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Brain,
  Building2,
  Code2,
  Drama,
  Dumbbell,
  Maximize2,
  HeartHandshake,
  Landmark,
  Linkedin,
  MapPin,
  Mountain,
  PlayCircle,
  Puzzle,
  Radio,
  School,
  Search,
  ShieldCheck,
  Spade,
  Sparkles,
  Target,
  Users,
  Wrench,
  X,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  formatExperienceDuration,
  formatProjectDuration,
  aboutProfile,
  portfolio
} from "@/lib/data";
import type { Experience, Project } from "@/lib/data";
import { publicAsset } from "@/lib/assets";
import { ContactCard } from "@/components/ContactCard";
import { ContactForm } from "@/components/ContactForm";
import { ProjectActionButton } from "@/components/ProjectActionButton";
import { ProjectResourceSpotlight } from "@/components/ProjectResourceSpotlight";
import { SectionRouteSync } from "@/components/SectionRouteSync";

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
  "Data-Driven Product Judgment": Target,
  "Strategic Business Acumen": Landmark,
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

  if (title.includes("spotify")) return { label: "Spotify", icon: Radio, className: "bg-[#1db954] text-white" };
  if (title.includes("asana")) return { label: "Asana", icon: Puzzle, className: "bg-[#fc636b] text-white" };
  if (title.includes("heylily")) return { label: "HeyLily", icon: ShieldCheck, className: "bg-teal text-white" };
  if (title.includes("roblox")) return { label: "Roblox", icon: Building2, className: "bg-[#111111] text-white" };
  if (title.includes("copilot")) return { label: "Microsoft 365 Copilot", icon: Sparkles, className: "bg-[#2563eb] text-white" };
  if (title.includes("netflix")) return { label: "Netflix", icon: PlayCircle, className: "bg-[#e50914] text-white", mark: "N" };
  if (title.includes("figma")) return { label: "Figma", icon: Puzzle, className: "bg-[#a259ff] text-white", mark: "F" };
  if (title.includes("bumble")) return { label: "Bumble", icon: Users, className: "bg-[#ffcb37] text-navy", mark: "B" };
  if (title.includes("wslblobnfs")) return { label: "WSLBlobNFS", icon: Code2, className: "bg-[#0078d4] text-white" };
  if (title.includes("blobnfs")) return { label: "Azure Blob NFS", icon: Wrench, className: "bg-[#0078d4] text-white" };
  if (title.includes("hike")) return { label: "AI Hike Researcher", icon: Mountain, className: "bg-[#7c4a2d] text-white" };
  if (title.includes("streakfit")) return { label: "StreakFit", icon: BadgeCheck, className: "bg-coral text-white" };
  if (title.includes("teardown")) return { label: "Product Teardown Series", icon: Search, className: "bg-[#dc2626] text-white" };
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
          <h4 className="font-serif text-2xl font-semibold leading-tight text-navy">
            {project.title}
          </h4>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-coral">
            {formatProjectDuration(project)}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted">{project.description}</p>
      <ProjectResourceActions project={project} experience={experience} section={section} />
    </section>
  );
}

function RichExperienceCard({
  experience,
  section
}: {
  experience: Experience;
  section: "experience" | "education";
}) {
  const hasProjects = experience.projects.length > 0;
  const hasSubLogo = Boolean(getExperienceProductLogo(experience.organization));
  const experienceSummary = (
    <>
      <div className="relative h-14 w-14">
        <ExperienceLogo organization={experience.organization} />
        {hasSubLogo ? (
          <div className="absolute -bottom-1 -right-1">
            <ExperienceSubLogo organization={experience.organization} />
          </div>
        ) : null}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-bold text-muted">{formatExperienceDuration(experience)}</span>
        </div>
        <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-navy md:text-3xl">
          {experience.title}
        </h3>
        <p className="mt-2 text-base font-bold text-teal">{experience.organization}</p>
        <p className="mt-2 flex items-center gap-2 text-sm text-muted">
          <MapPin className="h-4 w-4 flex-none text-coral" aria-hidden="true" />
          {experience.location}
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{experience.summary}</p>
      </div>
    </>
  );

  return (
    <article
      key={`${experience.organization}-${experience.title}`}
      className="rounded-[1.35rem] border border-line bg-card shadow-soft transition duration-200 hover:-translate-y-1 hover:border-coral/30 hover:shadow-lift"
    >
      {hasProjects ? (
        <>
          <div className="grid gap-5 p-6 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-start md:p-7 print:grid-cols-[auto_minmax(0,1fr)_auto] print:items-start">
            {experienceSummary}
            <div className="text-sm font-bold text-navy md:justify-self-end">
              {experience.projects.length} project{experience.projects.length === 1 ? "" : "s"}
            </div>
          </div>
          <div className="border-t border-line px-6 pb-6 md:px-7 md:pb-7">
            <div className="grid gap-5 pt-6 lg:grid-cols-2 print:grid-cols-2">
              {experience.projects.map((project) => (
                <ProjectCard
                  id={`project-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                  key={project.title}
                  project={project}
                  experience={experience}
                  section={section}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="grid gap-5 p-6 md:grid-cols-[auto_minmax(0,1fr)] md:items-start md:p-7 print:grid-cols-[auto_minmax(0,1fr)] print:items-start">
          {experienceSummary}
        </div>
      )}
    </article>
  );
}

type HistoryEntry = {
  id: string;
  organization: string;
  from: string;
  to: string;
  experiences: Experience[];
};

function formatHistoryDateRange(entry: HistoryEntry) {
  if (!entry.from) {
    return entry.to;
  }

  if (!entry.to || entry.from === entry.to) {
    return entry.from;
  }

  return `${entry.from} - ${entry.to}`;
}

function createHistoryEntries(experiences: Experience[], section: "experience" | "education"): HistoryEntry[] {
  if (section === "experience") {
    const microsoftExperiences = experiences.filter((experience) => experience.organization === "Microsoft");
    const otherExperiences = experiences.filter((experience) => experience.organization !== "Microsoft");

    return [
      ...otherExperiences.map((experience) => ({
        id: `${experience.organization}-${experience.from}-${experience.to}`,
        organization: experience.organization,
        from: experience.from,
        to: experience.to,
        experiences: [experience]
      })),
      ...(microsoftExperiences.length
        ? [
            {
              id: "Microsoft-Jul 2018-Jul 2024",
              organization: "Microsoft",
              from: "Jul 2018",
              to: "Jul 2024",
              experiences: microsoftExperiences
            }
          ]
        : [])
    ];
  }

  return experiences.map((experience) => ({
    id: `${experience.organization}-${experience.from}-${experience.to}`,
    organization: experience.organization,
    from: experience.from,
    to: experience.to,
    experiences: [experience]
  }));
}

function HistoryList({
  entries,
  section,
  onOpen
}: {
  entries: HistoryEntry[];
  section: "experience" | "education";
  onOpen: (entry: HistoryEntry, section: "experience" | "education") => void;
}) {
  return (
    <div className="mt-10 overflow-hidden rounded-[1.35rem] border border-line bg-card shadow-soft">
      {entries.map((entry, index) => (
        <button
          key={entry.id}
          type="button"
          onClick={() => onOpen(entry, section)}
          className={`grid w-full gap-4 px-5 py-5 text-left transition duration-200 hover:bg-background/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-teal/20 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center md:px-6 ${
            index === 0 ? "" : "border-t border-line"
          }`}
          aria-label={`Open details for ${entry.organization}`}
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
              {entry.organization}
            </h3>
            <p className="mt-1 text-sm font-bold text-muted">{formatHistoryDateRange(entry)}</p>
          </div>
          <span className="grid h-11 w-11 place-items-center rounded-full border border-line bg-background text-coral shadow-sm transition duration-200 hover:border-teal/40 hover:bg-teal hover:text-white sm:justify-self-end">
            <Maximize2 className="h-5 w-5" aria-hidden="true" />
          </span>
        </button>
      ))}
    </div>
  );
}

function HistoryModal({
  entry,
  section,
  onClose
}: {
  entry: HistoryEntry | null;
  section: "experience" | "education";
  onClose: () => void;
}) {
  if (!entry) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#05080b]/80 px-5 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${entry.organization} details`}
      onClick={onClose}
    >
      <div
        className="mx-auto max-w-6xl"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-card text-navy shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-coral/40 hover:bg-coral hover:text-white focus:outline-none focus:ring-4 focus:ring-coral/20"
            aria-label="Close details"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="space-y-5">
          {entry.experiences.map((experience) => (
            <RichExperienceCard
              key={`${experience.organization}-${experience.title}`}
              experience={experience}
              section={section}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedHistory, setSelectedHistory] = useState<{
    entry: HistoryEntry;
    section: "experience" | "education";
  } | null>(null);
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
  const contactIntroText = aboutProfile.contactIntro.replace(/\s*☕\s*$/, "");

  return (
    <>
      <SectionRouteSync />
      <HistoryModal
        entry={selectedHistory?.entry ?? null}
        section={selectedHistory?.section ?? "experience"}
        onClose={() => setSelectedHistory(null)}
      />
      <section id="home" className="relative scroll-mt-24 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
          <div className="overflow-hidden rounded-[1.35rem] border border-line bg-card shadow-soft">
            <div className="hero-banner h-44 bg-[linear-gradient(135deg,rgba(14,151,160,0.28),rgba(244,126,96,0.18)),radial-gradient(circle_at_25%_25%,rgba(20,36,50,0.18),transparent_28rem)] md:h-64" />
            <div className="px-6 pb-8 md:px-10 md:pb-10">
              <div className="-mt-16 flex flex-col gap-6 md:-mt-20 md:flex-row md:items-end md:justify-between">
                <div className="aspect-square h-32 w-32 overflow-hidden rounded-[2rem] border-4 border-card bg-[#162531] shadow-lift md:h-40 md:w-40">
                  <img
                    src={publicAsset("/images/headshot.jpg")}
                    alt="Shankar Binjawadgi"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="max-w-3xl">
                  <h1 className="font-serif text-5xl font-semibold leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
                    Shankar Binjawadgi
                  </h1>
                  <p className="mt-5 font-serif text-2xl font-semibold leading-tight text-navy md:text-3xl">
                    {aboutProfile.title}
                  </p>
                  <p className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-coral">
                    <CredentialLine text={aboutProfile.context} />
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
          <div className="mt-6 grid gap-5 md:grid-cols-2 print:grid-cols-2">
            {featuredProducts.map(({ project, experience, section }) => (
              <ProjectCard
                key={project.title}
                project={project}
                experience={experience}
                section={section}
                surface="card"
              />
            ))}
          </div>
        </ProjectResourceSpotlight>

        <div className="mt-12">
          <h3 className="font-serif text-2xl font-semibold text-navy md:text-3xl">
            <QuestionWordHighlight text={aboutProfile.capabilitiesHeading} />
          </h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2 print:grid-cols-2">
            {aboutProfile.capabilities.map((capability) => (
              <article key={capability.title} className="rounded-2xl border border-line bg-card p-5 shadow-soft">
                <div className="flex items-start gap-4">
                  <CardIcon icon={capabilityIconMap[capability.title] ?? Sparkles} />
                  <div>
                    <h4 className="font-serif text-xl font-semibold leading-tight text-navy">{capability.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-muted">{capability.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-serif text-2xl font-semibold text-navy md:text-3xl">
            <QuestionWordHighlight text={aboutProfile.operatingModelHeading} />
          </h3>
          <div className="mt-6 grid gap-5 md:grid-cols-3 print:grid-cols-3">
            {aboutProfile.operatingModel.map((principle) => (
              <article key={principle.title} className="rounded-2xl border border-line bg-card p-5 shadow-soft">
                <div className="flex items-start gap-4">
                  <CardIcon icon={operatingModelIconMap[principle.title] ?? BadgeCheck} />
                  <div>
                    <h4 className="font-serif text-xl font-semibold leading-tight text-navy">{principle.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-muted">{principle.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
          onOpen={(entry, section) => setSelectedHistory({ entry, section })}
        />
      </section>

      <section id="education" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 sm:px-8 md:py-20">
        <SectionHeading>What I&apos;ve Studied</SectionHeading>
        <HistoryList
          entries={educationHistoryEntries}
          section="education"
          onOpen={(entry, section) => setSelectedHistory({ entry, section })}
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
