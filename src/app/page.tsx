import {
  BadgeCheck,
  Brain,
  Building2,
  ChevronDown,
  Code2,
  FileCode2,
  FileText,
  GraduationCap,
  Landmark,
  MapPin,
  Mail,
  Mountain,
  PlayCircle,
  Puzzle,
  Radio,
  School,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  experienceIconMap,
  formatExperienceDuration,
  getExperienceKind,
  portfolio
} from "@/lib/data";
import type { Experience } from "@/lib/data";
import { CollapseProjectsButton } from "@/components/CollapseProjectsButton";
import { ContactCard } from "@/components/ContactCard";
import { ContactForm } from "@/components/ContactForm";

function SectionHeading({ children, icon: Icon }: { children: string; icon: LucideIcon }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl border border-teal/20 bg-teal/10 text-teal shadow-sm">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div>
        <p className="font-serif text-4xl font-semibold text-navy md:text-5xl">{children}</p>
        <div className="mt-5 h-1.5 w-16 rounded-full bg-teal" aria-hidden="true" />
      </div>
    </div>
  );
}

function TagList({
  title,
  items,
  variant = "compact"
}: {
  title: string;
  items: string[];
  variant?: "compact" | "card";
}) {
  return (
    <div>
      {variant === "card" ? (
        <h3 className="font-serif text-2xl font-semibold text-navy">{title}</h3>
      ) : (
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">{title}</p>
      )}
      <ul className={variant === "card" ? "mt-5 flex flex-wrap gap-2" : "mt-3 flex flex-wrap gap-2"}>
        {items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-line bg-background px-3 py-1 text-xs font-bold text-navy/80"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectActionButton({
  label,
  href,
  icon: Icon
}: {
  label: "Doc" | "Code" | "Demo";
  href: string;
  icon: LucideIcon;
}) {
  const className = "inline-grid h-11 w-11 place-items-center rounded-full border transition";

  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${label}`}
      title={label}
      className={`${className} border-line bg-card text-coral shadow-sm hover:-translate-y-0.5 hover:border-teal/40 hover:bg-teal hover:text-white focus:outline-none focus:ring-4 focus:ring-teal/20`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function ExperienceLogo({ organization }: { organization: string }) {
  if (organization.includes("Microsoft")) {
    return (
      <div className="grid h-12 w-12 grid-cols-2 gap-1 rounded-xl bg-white p-2 shadow-sm ring-1 ring-line" aria-label="Microsoft logo">
        <span className="bg-[#f25022]" />
        <span className="bg-[#7fba00]" />
        <span className="bg-[#00a4ef]" />
        <span className="bg-[#ffb900]" />
      </div>
    );
  }

  if (organization.includes("Amazon")) {
    return (
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#232f3e] text-[0.72rem] font-black lowercase tracking-tight text-white shadow-sm ring-1 ring-line" aria-label="AWS logo">
        aws
      </div>
    );
  }

  if (organization.includes("University of Washington")) {
    return (
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#4b2e83] font-serif text-2xl font-black text-[#b7a57a] shadow-sm ring-1 ring-line" aria-label="University of Washington logo">
        W
      </div>
    );
  }

  if (organization.includes("NextLeap")) {
    return (
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#142432] text-sm font-black text-teal shadow-sm ring-1 ring-line" aria-label="NextLeap logo">
        NL
      </div>
    );
  }

  if (organization.includes("PES")) {
    return (
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#005baa] text-sm font-black text-white shadow-sm ring-1 ring-line" aria-label="PES University logo">
        PES
      </div>
    );
  }

  return null;
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

const aboutFocus = [
  {
    title: "AI Product Building",
    description: "Designing practical GenAI workflows, prototypes, and product concepts from real user needs.",
    icon: Brain
  },
  {
    title: "Customer Discovery",
    description: "Turning interviews, reviews, and market signals into sharp problem framing and product direction.",
    icon: Users
  },
  {
    title: "GTM Strategy",
    description: "Connecting positioning, segmentation, adoption barriers, and metrics into clear launch thinking.",
    icon: Target
  },
  {
    title: "Technical Leadership",
    description: "Bringing engineering judgment to product tradeoffs, roadmap clarity, and cross-functional execution.",
    icon: Code2
  }
];

function ExperienceCard({ experience }: { experience: Experience }) {
  const kind = getExperienceKind(experience);
  const Icon = experienceIconMap[kind];
  const hasProjects = experience.projects.length > 0;
  const experienceSummary = (
    <>
      <div className="relative h-14 w-14">
        <ExperienceLogo organization={experience.organization} />
        <div className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border-2 border-card bg-coral text-white">
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </div>
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
        <details className="group open:mb-8">
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
                <section
                  id={`project-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                  key={project.title}
                  className="flex h-full flex-col rounded-2xl border border-line bg-background p-5 transition duration-200 hover:-translate-y-0.5 hover:border-coral/30 hover:shadow-soft"
                >
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
                    <ProjectLogo title={project.title} />
                    <h4 className="font-serif text-2xl font-semibold leading-tight text-navy">
                      {project.title}
                    </h4>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted">{project.description}</p>
                  <div className="mt-5 grid gap-5">
                    <TagList title="Soft Skills" items={project.skills} />
                    <TagList title="Hard Skills" items={project.tools} />
                  </div>
                  {project.doc || project.code || project.demo ? (
                    <div className="mt-auto flex flex-wrap gap-3 border-t border-line pt-5">
                      <ProjectActionButton label="Doc" href={project.doc} icon={FileText} />
                      <ProjectActionButton label="Code" href={project.code} icon={FileCode2} />
                      <ProjectActionButton label="Demo" href={project.demo} icon={PlayCircle} />
                    </div>
                  ) : null}
                </section>
              ))}
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
              <CollapseProjectsButton />
            </div>
          </div>
        </details>
      ) : (
        <div className="grid gap-5 p-6 md:grid-cols-[auto_minmax(0,1fr)] md:items-start md:p-7">
          {experienceSummary}
        </div>
      )}
    </article>
  );
}

export default function Home() {
  const { about, contact, contactForm, experiences, resume } = portfolio;
  const hasContactForm = Boolean(contactForm.embedUrl);
  const educationExperiences = experiences.filter((experience) => experience.type === "education");
  const professionalExperiences = experiences.filter((experience) => experience.type === "work");

  return (
    <>
      <section id="home" className="relative scroll-mt-24 overflow-hidden border-b border-line">
        <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
          <div className="overflow-hidden rounded-[1.35rem] border border-line bg-card shadow-soft transition duration-200 hover:-translate-y-1 hover:border-teal/30 hover:shadow-lift">
            <div className="h-44 bg-[linear-gradient(135deg,rgba(14,151,160,0.28),rgba(244,126,96,0.18)),radial-gradient(circle_at_25%_25%,rgba(20,36,50,0.18),transparent_28rem)] md:h-64" />
            <div className="px-6 pb-8 md:px-10 md:pb-10">
              <div className="-mt-16 flex flex-col gap-6 md:-mt-20 md:flex-row md:items-end md:justify-between">
                <div className="grid h-32 w-32 place-items-center rounded-[2rem] border-4 border-card bg-[#162531] text-white shadow-lift md:h-40 md:w-40">
                  <span className="font-serif text-5xl font-semibold text-coral md:text-6xl">SB</span>
                </div>
                <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
                  Shankar Binjawadgi
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 sm:px-8 md:py-20">
        <SectionHeading icon={Users}>About Me</SectionHeading>

        <div className="mt-8 max-w-4xl space-y-5 text-base leading-8 text-muted md:text-lg">
          <p>{about}</p>
          <p>
            I like product work that starts with a messy human problem, moves through disciplined discovery,
            and ends in a clear strategy, prototype, or roadmap that teams can actually use.
          </p>
        </div>

        <div className="mt-10 grid gap-5">
          <article className="rounded-[1.35rem] border border-line bg-card p-6 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-coral/30 hover:shadow-lift md:p-7">
            <h3 className="font-serif text-2xl font-semibold text-navy">Highlights</h3>
            <ul className="mt-5 grid gap-3">
              {resume.highlights.map((highlight) => (
                <li key={highlight} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 text-sm leading-7 text-muted">
                  <span className="mt-2 h-2 w-2 rounded-full bg-coral" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </article>

          <div className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-[1.35rem] border border-line bg-card p-6 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-coral/30 hover:shadow-lift">
              <TagList title="Skills" items={resume.skills} variant="card" />
            </article>
            <article className="rounded-[1.35rem] border border-line bg-card p-6 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-coral/30 hover:shadow-lift">
              <TagList title="Tools" items={resume.tools} variant="card" />
            </article>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-serif text-3xl font-semibold text-navy">What I&apos;m doing</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {aboutFocus.map(({ title, description, icon: Icon }) => (
              <article key={title} className="rounded-2xl border border-line bg-card p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-coral/30 hover:shadow-lift">
                <div className="grid gap-4 sm:grid-cols-[56px_minmax(0,1fr)]">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-coral/20 bg-coral/10 text-coral">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl font-semibold text-navy">{title}</h4>
                    <p className="mt-2 text-sm leading-7 text-muted">{description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 sm:px-8 md:py-20">
        <SectionHeading icon={Building2}>Experience</SectionHeading>

        <div className="mt-10 space-y-5">
          {professionalExperiences.map((experience) => (
            <ExperienceCard
              key={`${experience.organization}-${experience.title}`}
              experience={experience}
            />
          ))}
        </div>
      </section>

      <section id="education" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 sm:px-8 md:py-20">
        <SectionHeading icon={GraduationCap}>Education</SectionHeading>

        <div className="mt-10 space-y-5">
          {educationExperiences.map((experience) => (
            <ExperienceCard
              key={`${experience.organization}-${experience.title}`}
              experience={experience}
            />
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 sm:px-8 md:py-20">
        <SectionHeading icon={Mail}>Contact</SectionHeading>
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
