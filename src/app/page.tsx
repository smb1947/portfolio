import {
  BadgeCheck,
  Brain,
  Building2,
  ChevronDown,
  Code2,
  Drama,
  Dumbbell,
  Landmark,
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
  Wrench
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  formatExperienceDuration,
  aboutProfile,
  portfolio
} from "@/lib/data";
import type { Experience, Project } from "@/lib/data";
import { publicAsset } from "@/lib/assets";
import { CollapseProjectsButton } from "@/components/CollapseProjectsButton";
import { ContactCard } from "@/components/ContactCard";
import { ContactForm } from "@/components/ContactForm";
import { ProjectActionButton } from "@/components/ProjectActionButton";
import { SectionRouteSync } from "@/components/SectionRouteSync";
import { TrackedExperienceDetails } from "@/components/TrackedExperienceDetails";

function SectionHeading({ children }: { children: string }) {
  return (
    <div>
      <p className="font-serif text-4xl font-semibold text-navy md:text-5xl">{children}</p>
      <div className="mt-5 h-1.5 w-16 rounded-full bg-teal" aria-hidden="true" />
    </div>
  );
}

const capabilityIconMap: Record<string, LucideIcon> = {
  "Customer & Behavioral Psychology": Brain,
  "AI-First Product Building": Sparkles,
  "Data-Driven Product Judgment": Target,
  "Business Acumen": Landmark,
  "Technical Depth": Code2,
  "Cross-Functional Collaboration": Users
};

const operatingModelIconMap: Record<string, LucideIcon> = {
  Deliberate: BadgeCheck,
  Analytical: Search,
  "Human-Centered": Users
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
  if (title.includes("hike")) return { label: "AI Hike Researcher", icon: Mountain, className: "bg-teal text-white" };
  if (title.includes("streakfit")) return { label: "StreakFit", icon: BadgeCheck, className: "bg-coral text-white" };
  if (title.includes("teardown")) return { label: "Product Teardown Series", icon: Search, className: "bg-navy text-white" };
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

function getProjectLinkActionLabel(url: string) {
  return url.includes("linkedin.com") ? "Post" : "Article";
}

function getProjectSection(experience: Experience): ProjectSection {
  return experience.type === "education" ? "education" : "experience";
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
  if (!project.link.url && !project.doc && !project.code && !project.demo) {
    return null;
  }

  return (
    <div className="mt-auto flex flex-wrap gap-3 border-t border-line pt-5">
      <ProjectActionButton
        label={getProjectLinkActionLabel(project.link.url)}
        href={project.link.url}
        section={section}
        experienceType={experience.type}
        organization={experience.organization}
        experienceTitle={experience.title}
        projectTitle={project.title}
      />
      <ProjectActionButton
        label="Doc"
        href={project.doc}
        section={section}
        experienceType={experience.type}
        organization={experience.organization}
        experienceTitle={experience.title}
        projectTitle={project.title}
      />
      <ProjectActionButton
        label="Code"
        href={project.code}
        section={section}
        experienceType={experience.type}
        organization={experience.organization}
        experienceTitle={experience.title}
        projectTitle={project.title}
      />
      <ProjectActionButton
        label="Demo"
        href={project.demo}
        section={section}
        experienceType={experience.type}
        organization={experience.organization}
        experienceTitle={experience.title}
        projectTitle={project.title}
      />
    </div>
  );
}

function ProjectCard({
  project,
  experience,
  section,
  id
}: {
  project: Project;
  experience: Experience;
  section: ProjectSection;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="flex h-full flex-col rounded-2xl border border-line bg-background p-5 transition duration-200 hover:-translate-y-0.5 hover:border-coral/30 hover:shadow-soft"
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
        <ProjectLogo title={project.title} />
        <h4 className="font-serif text-2xl font-semibold leading-tight text-navy">
          {project.title}
        </h4>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted">{project.description}</p>
      <ProjectResourceActions project={project} experience={experience} section={section} />
    </section>
  );
}

function ExperienceCard({
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
        <TrackedExperienceDetails
          className="group open:mb-8"
          section={section}
          experienceType={experience.type}
          organization={experience.organization}
          title={experience.title}
        >
          <summary className="grid cursor-pointer list-none gap-5 p-6 focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-teal/20 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-start md:p-7">
            {experienceSummary}
            <div className="flex items-center gap-3 text-sm font-bold text-navy md:justify-end">
              <span>
                {experience.projects.length} project{experience.projects.length === 1 ? "" : "s"}
              </span>
              <ChevronDown className="h-5 w-5 text-coral transition group-open:rotate-180" aria-hidden="true" />
            </div>
          </summary>

          <div className="relative border-t border-line px-6 pb-12 md:px-7 md:pb-14">
            <div className="grid gap-5 pt-6 lg:grid-cols-2">
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
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
              <CollapseProjectsButton
                section={section}
                experienceType={experience.type}
                organization={experience.organization}
                title={experience.title}
              />
            </div>
          </div>
        </TrackedExperienceDetails>
      ) : (
        <div className="grid gap-5 p-6 md:grid-cols-[auto_minmax(0,1fr)] md:items-start md:p-7">
          {experienceSummary}
        </div>
      )}
    </article>
  );
}

export default function Home() {
  const { contact, contactForm, experiences } = portfolio;
  const hasContactForm = Boolean(contactForm.embedUrl);
  const educationExperiences = experiences.filter((experience) => experience.type === "education");
  const professionalExperiences = experiences.filter((experience) => experience.type === "work");
  const featuredProjectTitles = aboutProfile.featuredProjects.map((project) => project.title);
  const featuredProjects = experiences
    .flatMap((experience) =>
      experience.projects.map((project) => ({
        experience,
        project,
        section: getProjectSection(experience)
      }))
    )
    .filter(({ project }) => featuredProjectTitles.includes(project.title))
    .sort(
      (a, b) =>
        featuredProjectTitles.indexOf(a.project.title) - featuredProjectTitles.indexOf(b.project.title)
    );

  return (
    <>
      <SectionRouteSync />
      <section id="home" className="relative scroll-mt-24 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
          <div className="overflow-hidden rounded-[1.35rem] border border-line bg-card shadow-soft">
            <div className="h-44 bg-[linear-gradient(135deg,rgba(14,151,160,0.28),rgba(244,126,96,0.18)),radial-gradient(circle_at_25%_25%,rgba(20,36,50,0.18),transparent_28rem)] md:h-64" />
            <div className="px-6 pb-8 md:px-10 md:pb-10">
              <div className="-mt-16 flex flex-col gap-6 md:-mt-20 md:flex-row md:items-end md:justify-between">
                <div className="grid h-32 w-32 place-items-center rounded-[2rem] border-4 border-card bg-[#162531] text-white shadow-lift md:h-40 md:w-40">
                  <span className="font-serif text-5xl font-semibold text-coral md:text-6xl">SB</span>
                </div>
                <div className="max-w-3xl">
                  <h1 className="font-serif text-5xl font-semibold leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
                    Shankar Binjawadgi
                  </h1>
                  <p className="mt-5 font-serif text-2xl font-semibold leading-tight text-navy md:text-3xl">
                    {aboutProfile.title}
                  </p>
                  <p className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-coral">
                    {aboutProfile.context}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8" aria-hidden="true">
          <div className="h-px bg-line" />
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 sm:px-8 md:py-20">
        <SectionHeading>Who I Am</SectionHeading>

        <div className="mt-8 max-w-5xl space-y-5">
          <div className="max-w-4xl space-y-5 text-base leading-8 text-muted md:text-lg">
            {aboutProfile.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-serif text-2xl font-semibold text-navy md:text-3xl">My Featured Project Work</h3>
          <p className="mt-3 max-w-5xl text-sm leading-7 text-muted md:text-base">
            Below are a few of my latest projects, some of which are still works in progress. For more project work, check out the Experience and Education sections below.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {featuredProjects.map(({ project, experience, section }) => (
              <ProjectCard
                key={project.title}
                project={project}
                experience={experience}
                section={section}
              />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-serif text-2xl font-semibold text-navy md:text-3xl">My Core Capabilities</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
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
          <h3 className="font-serif text-2xl font-semibold text-navy md:text-3xl">My Modus Operandi</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
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
        </div>

        <div className="mt-12">
          <h3 className="font-serif text-2xl font-semibold text-navy md:text-3xl">My Personal Interests</h3>
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
        <SectionHeading>Where I Worked</SectionHeading>

        <div className="mt-10 space-y-5">
          {professionalExperiences.map((experience) => (
            <ExperienceCard
              key={`${experience.organization}-${experience.title}`}
              experience={experience}
              section="experience"
            />
          ))}
        </div>
      </section>

      <section id="education" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 sm:px-8 md:py-20">
        <SectionHeading>What I Studied</SectionHeading>

        <div className="mt-10 space-y-5">
          {educationExperiences.map((experience) => (
            <ExperienceCard
              key={`${experience.organization}-${experience.title}`}
              experience={experience}
              section="education"
            />
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 sm:px-8 md:py-20">
        <SectionHeading>How to Contact Me</SectionHeading>
        <p className="mt-6 max-w-5xl text-base leading-8 text-muted md:text-lg">
          Liked my work, have an idea to collaborate on, or just want to chat? I’d be happy to hear from you. ☕
        </p>
        <div className={`mt-10 grid gap-6 ${hasContactForm ? "lg:grid-cols-[0.45fr_1.55fr] lg:items-start" : ""}`}>
          <div className="flex flex-wrap gap-3">
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
