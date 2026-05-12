"use client";

import { BriefcaseBusiness, Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ContactMethod } from "@/lib/data";
import { trackPortfolioEvent } from "@/lib/analytics";

const contactIconMap: Record<string, LucideIcon> = {
  email: Mail,
  phone: Phone,
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  location: MapPin
};

type ContactCardProps = {
  item: ContactMethod | {
    type: "location";
    label: string;
    value: string;
    link?: string;
  };
};

export function ContactCard({ item }: ContactCardProps) {
  const Icon = contactIconMap[item.type] ?? BriefcaseBusiness;
  const label = `${item.label}: ${item.value}`;

  if (item.link) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        title={label}
        onClick={() => {
          trackPortfolioEvent("contact.method.click", {
            method: item.type,
            label: item.label,
            href: item.link,
            source: "contact_section"
          });
        }}
        className="grid h-14 w-14 place-items-center rounded-full border border-line bg-card text-coral shadow-soft transition duration-200 hover:-translate-y-1 hover:border-teal/40 hover:bg-teal hover:text-white hover:shadow-lift focus:outline-none focus:ring-4 focus:ring-teal/20"
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </a>
    );
  }

  return (
    <span
      aria-label={label}
      title={label}
      className="grid h-14 w-14 place-items-center rounded-full border border-line bg-card text-coral shadow-soft"
    >
      <Icon className="h-6 w-6" aria-hidden="true" />
    </span>
  );
}
