import {
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Code2,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Rocket,
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
  doc: string;
  code: string;
  demo: string;
  skills: string[];
  tools: string[];
  description: string;
};

export type ExperienceType = "education" | "work";

export type EducationDetails = {
  type: "Bachelors" | "Masters" | "Fellowship" | "Certificate";
  name: string;
};

export type WorkDetails = {
  companyName: string;
  teamName: string;
};

export type Experience = {
  type: ExperienceType;
  education?: EducationDetails;
  work?: WorkDetails;
  title: string;
  organization: string;
  location: string;
  from: string;
  to: string;
  summary: string;
  projects: Project[];
};

export type Resume = {
  summary: string;
  downloadLabel: string;
  downloadUrl: string;
  highlights: string[];
  skills: string[];
  tools: string[];
};

export type ContactFormContent = {
  title: string;
  embedUrl: string;
  linkUrl?: string;
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
  resume: Resume;
  contact: ContactMethod[];
  contactForm: ContactFormContent;
  experiences: Experience[];
};

export const portfolio = content as PortfolioContent;
export const site = {
  ...portfolio.site,
  email: portfolio.contact.find((item) => item.type === "email")?.value ?? ""
};

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Education", href: "/education" },
  { label: "Contact", href: "/contact" }
];

export const aboutProfile = {
  title: "AI-First Technical Product Manager",
  context: "Ex-AWS PMT-ES Intern · Ex-Microsoft Azure Engineer · UW Foster STEM MBA ’26",
  intro: [
    "Hi 👋, I’m Shankar — an AI-first Technical Product Manager who brings curiosity, technical depth, product taste, and grit to ambiguous problems. I enjoy product work that starts with a messy human problem, moves through disciplined discovery, and ends in a clear strategy, prototype, or roadmap that helps cross-functional teams build simple, scalable products customers adopt and trust.",
    "Outside product work, I’m usually hiking, working out, or trying to understand why people behave the way they do."
  ],
  capabilities: [
    {
      title: "Customer & Behavioral Psychology",
      description: "Understanding how users think, struggle, decide, and adopt products."
    },
    {
      title: "AI-First Product Building",
      description: "Using AI to rethink workflows, reduce friction, and create new product experiences."
    },
    {
      title: "Data-Driven Product Judgment",
      description: "Turning customer signals, usage patterns, and business context into better product decisions."
    },
    {
      title: "Business Acumen",
      description: "Connecting customer needs, market context, financial tradeoffs, and go-to-market realities into product decisions that create durable business value."
    },
    {
      title: "Technical Depth",
      description: "Working credibly with engineering teams across cloud infrastructure, distributed systems, scalability, and reliability."
    },
    {
      title: "Cross-Functional Collaboration",
      description: "Aligning engineering, design, business, and customer stakeholders around clear problems and measurable outcomes."
    }
  ],
  operatingModel: [
    {
      title: "Deliberate",
      description: "Discipline, consistency, attention to detail, and simplicity."
    },
    {
      title: "Analytical",
      description: "Systematic thinking, observation, long-term orientation, and outcome-driven decisions."
    },
    {
      title: "Human-Centered",
      description: "Curiosity, empathy, inquisitiveness, abstract thinking, and high IQ + EQ."
    }
  ],
  featuredProjects: [
    {
      title: "StreakFit",
      description: "A behavioral psychology-informed GenAI product built in three hours at the OpenAI Codex Hackathon after six customer interviews on student wellness pain points."
    },
    {
      title: "Bumble Barney GenAI Wingman",
      description: "A GenAI wingman concept proposed after analyzing 100 one-star Bumble App Store ratings and root-causing the recurring no-matches problem."
    },
    {
      title: "HeyLily GenAI Scam-Call Assistant",
      description: "A GenAI scam-call assistant for seniors built by an 11-member design, engineering, and business team, backed by 15+ interviews and B2B2C GTM planning."
    },
    {
      title: "Spotify MiniMix",
      description: "A GenAI music recommendation engine in n8n for mood and occasion sub-playlist curation using dynamic song-feature selection."
    },
    {
      title: "AI Hike Researcher",
      description: "A cost- and time-efficient agentic skill that automates real-time data gathering across six safety-critical hike-planning dimensions."
    }
  ],
  personalSignals: [
    "Behavioral psychology",
    "Hiking",
    "Gym",
    "Poker",
    "Anime"
  ]
};

export const contactIconMap = {
  email: Mail,
  phone: Phone,
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram
};

export const contactLinks = portfolio.contact.map((item) => ({
  ...item,
  href: item.link,
  icon: contactIconMap[item.type as keyof typeof contactIconMap] ?? Mail
}));

export const experienceIconMap = {
  education: GraduationCap,
  work: BriefcaseBusiness
};

export function getExperienceKind(experience: Experience): keyof typeof experienceIconMap {
  return experience.type;
}

export function formatExperienceDuration(experience: Experience) {
  if (!experience.from) {
    return experience.to;
  }

  if (!experience.to || experience.from === experience.to) {
    return experience.from;
  }

  return `${experience.from} - ${experience.to}`;
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
