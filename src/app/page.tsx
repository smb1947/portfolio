import { ArrowUpRight, BriefcaseBusiness, ChevronDown, GraduationCap, MapPin, Sparkles } from "lucide-react";
import {
  contactIconMap,
  experienceIconMap,
  getExperienceKind,
  portfolio,
  projectCount
} from "@/lib/data";

function TagList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{title}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-line bg-white/70 px-3 py-1 text-xs font-bold text-navy/80"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  const { site, about, contact, experiences } = portfolio;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:items-end md:py-20">
          <div>
            <p className="inline-flex rounded-full border border-teal/20 bg-teal/10 px-4 py-2 text-sm font-bold text-teal">
              Product Explorer
            </p>
            <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
              Shankar Binjawadgi
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              MBA candidate and product builder turning customer discovery, AI prototypes, and strategy work into clear product decisions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#experience"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-teal bg-teal px-6 text-sm font-bold text-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-[#0d7c83] focus:outline-none focus:ring-4 focus:ring-teal/20"
              >
                View Experience
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-navy/15 bg-white/70 px-6 text-sm font-bold text-navy transition duration-200 hover:-translate-y-0.5 hover:border-teal/40 hover:text-teal focus:outline-none focus:ring-4 focus:ring-teal/20"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="grid gap-4 rounded-[1.35rem] border border-line bg-card p-6 shadow-soft">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 flex-none place-items-center rounded-full bg-coral/10 text-coral">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal">Current Focus</p>
                <p className="mt-2 text-base leading-7 text-muted">
                  AI product building, go-to-market strategy, customer discovery, and product leadership.
                </p>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-3 border-t border-line pt-5">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Experiences</dt>
                <dd className="mt-1 font-serif text-3xl font-semibold text-navy">{experiences.length}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Projects</dt>
                <dd className="mt-1 font-serif text-3xl font-semibold text-navy">{projectCount}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 sm:px-8 md:py-20">
        <div className="grid gap-8 md:grid-cols-[0.32fr_0.68fr] md:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal">About</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-navy">Who I am</h2>
          </div>
          <p className="max-w-3xl text-xl leading-9 text-navy/80">{about}</p>
        </div>
      </section>

      <section id="experience" className="scroll-mt-24 border-y border-line bg-white/45">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal">Experience</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-navy">Experience and projects</h2>
            <p className="mt-4 text-base leading-8 text-muted">
              Content below is generated from a hierarchical JSON file. AWS and Microsoft appear as experience context only; internal work projects are not listed.
            </p>
          </div>

          <div className="mt-10 space-y-5">
            {experiences.map((experience, index) => {
              const kind = getExperienceKind(experience);
              const Icon = experienceIconMap[kind];
              const defaultOpen = experience.projects.length > 0;

              return (
                <article
                  key={`${experience.organization}-${experience.title}`}
                  className="overflow-hidden rounded-[1.35rem] border border-line bg-card shadow-soft"
                >
                  <details open={defaultOpen} className="group">
                    <summary className="grid cursor-pointer list-none gap-5 p-6 focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-teal/20 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-start md:p-7">
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-teal/10 text-teal">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-coral/20 bg-coral/10 px-3 py-1 text-xs font-bold text-navy">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm font-bold text-muted">{experience.duration}</span>
                        </div>
                        <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-navy md:text-3xl">
                          {experience.title}
                        </h3>
                        <p className="mt-2 text-base font-bold text-teal">{experience.organization}</p>
                        <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                          <MapPin className="h-4 w-4 flex-none" aria-hidden="true" />
                          {experience.location}
                        </p>
                        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{experience.summary}</p>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-bold text-navy md:justify-end">
                        <span>
                          {experience.projects.length === 0
                            ? "No public projects"
                            : `${experience.projects.length} project${experience.projects.length === 1 ? "" : "s"}`}
                        </span>
                        <ChevronDown className="h-5 w-5 transition group-open:rotate-180" aria-hidden="true" />
                      </div>
                    </summary>

                    {experience.projects.length > 0 ? (
                      <div className="border-t border-line px-6 pb-6 md:px-7 md:pb-7">
                        <div className="grid gap-5 pt-6 lg:grid-cols-2">
                          {experience.projects.map((project) => (
                            <section
                              id={`project-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                              key={project.title}
                              className="rounded-2xl border border-line bg-white/65 p-5"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <h4 className="font-serif text-2xl font-semibold leading-tight text-navy">
                                  {project.title}
                                </h4>
                                {project.link.url ? (
                                  <a
                                    href={project.link.url}
                                    className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-line bg-card text-teal transition hover:border-teal/40 hover:text-navy focus:outline-none focus:ring-4 focus:ring-teal/20"
                                    aria-label={`Open ${project.title}`}
                                  >
                                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                  </a>
                                ) : (
                                  <span className="rounded-full border border-line bg-card px-3 py-1 text-xs font-bold text-muted">
                                    {project.link.label}
                                  </span>
                                )}
                              </div>
                              <p className="mt-4 text-sm leading-7 text-muted">{project.description}</p>
                              <div className="mt-5 grid gap-5">
                                <TagList title="Skills" items={project.skills} />
                                <TagList title="Tools" items={project.tools} />
                              </div>
                            </section>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </details>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 sm:px-8 md:py-20">
        <div className="grid gap-8 md:grid-cols-[0.36fr_0.64fr] md:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal">Contact</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-navy">Connect</h2>
            <p className="mt-4 text-base leading-8 text-muted">
              Contact methods are managed in the same JSON file as the portfolio content.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {contact.map((method) => {
              const Icon = contactIconMap[method.type as keyof typeof contactIconMap] ?? BriefcaseBusiness;

              return (
                <a
                  key={method.type}
                  href={method.link}
                  className="group rounded-[1.35rem] border border-line bg-card p-6 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-teal/30 hover:shadow-lift focus:outline-none focus:ring-4 focus:ring-teal/20"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-teal/10 text-teal">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-coral">{method.label}</p>
                  <p className="mt-2 break-words font-serif text-2xl font-semibold text-navy group-hover:text-teal">
                    {method.value}
                  </p>
                </a>
              );
            })}
            <div className="rounded-[1.35rem] border border-line bg-white/60 p-6 shadow-soft">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-coral/10 text-coral">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-coral">Location</p>
              <p className="mt-2 font-serif text-2xl font-semibold text-navy">{site.location}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
