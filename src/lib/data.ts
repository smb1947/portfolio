import {
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Code2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Sparkles,
  Target,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import content from "./content.json";

export type ContactMethod = {
  type: string;
  label: string;
  value: string;
  link: string;
};

export type Project = {
  title: string;
  link: {
    label: string;
    url: string;
  };
  skills: string[];
  tools: string[];
  description: string;
};

export type Experience = {
  title: string;
  organization: string;
  location: string;
  duration: string;
  summary: string;
  projects: Project[];
};

export type PortfolioContent = {
  site: {
    name: string;
    shortName: string;
    title: string;
    description: string;
    location: string;
  };
  about: string;
  contact: ContactMethod[];
  experiences: Experience[];
};

export const portfolio = content as PortfolioContent;
export const site = {
  ...portfolio.site,
  email: portfolio.contact.find((item) => item.type === "email")?.value ?? ""
};

export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" }
];

export const contactIconMap = {
  email: Mail,
  phone: Phone,
  linkedin: Linkedin,
  github: Github
};

export const contactLinks = portfolio.contact.map((item) => ({
  ...item,
  href: item.link,
  icon: contactIconMap[item.type as keyof typeof contactIconMap] ?? Mail
}));

export const experienceIconMap = {
  education: GraduationCap,
  fellowship: Sparkles,
  work: BriefcaseBusiness
};

export function getExperienceKind(experience: Experience): keyof typeof experienceIconMap {
  const text = `${experience.title} ${experience.organization}`.toLowerCase();

  if (text.includes("fellowship")) {
    return "fellowship";
  }

  if (text.includes("university") || text.includes("school") || text.includes("mba") || text.includes("bachelor")) {
    return "education";
  }

  return "work";
}

export const projectCount = portfolio.experiences.reduce(
  (count, experience) => count + experience.projects.length,
  0
);

export type Exploration = {
  slug: string;
  title: string;
  subtitle: string;
  problemStatement: string;
  tags: string[];
  category: string;
  visual: "bumble" | "netflix" | "copilot" | "fitness";
  metadata: {
    role: string;
    methods: string;
    domain: string;
    status: string;
    tools: string;
    outcome: string;
  };
  sections: {
    context: string;
    problem: string;
    approach: string;
    keyInsight: string;
    concept: string;
    validateNext: string;
  };
};

export const explorations: Exploration[] = [];
export const explorationThemes = [
  {
    title: "AI Products",
    description: "Agentic workflows, GenAI assistants, and practical prototypes.",
    icon: Brain
  },
  {
    title: "Product Strategy",
    description: "Discovery, prioritization, positioning, and go-to-market clarity.",
    icon: Target
  },
  {
    title: "Builder Mindset",
    description: "Engineering depth translated into product leadership.",
    icon: Code2
  }
];
export const filters = ["All"];
export const principles = [
  {
    title: "Understand the user",
    description: "Start with interviews, behavior, and pain before solutioning.",
    icon: Users
  },
  {
    title: "Shape clear strategy",
    description: "Make tradeoffs visible through metrics, positioning, and GTM thinking.",
    icon: BookOpen
  },
  {
    title: "Prototype to learn",
    description: "Use fast builds to test assumptions and sharpen product judgment.",
    icon: Rocket
  }
];
export const timelineItems: { title: string; description: string; icon: LucideIcon }[] = [];
export const aboutSections = [{ title: "About", body: portfolio.about }];
export const values = principles;
export const writingPosts = [];
export { MapPin };
