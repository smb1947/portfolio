"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, GraduationCap, Home, Mail, Moon, Sun, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { navLinks } from "@/lib/data";
import { trackPortfolioEvent } from "@/lib/analytics";

const navIconMap: Record<string, LucideIcon> = {
  Home,
  About: UserRound,
  Education: GraduationCap,
  Experience: BriefcaseBusiness,
  Contact: Mail
};

const sectionPathMap: Record<string, string> = {
  "/": "home",
  "/about": "about",
  "/experience": "experience",
  "/education": "education",
  "/contact": "contact"
};

function getSectionId(href: string) {
  return sectionPathMap[href] ?? "";
}

function shouldHandleSectionClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

type Theme = "light" | "dark";

export function Header() {
  const pathname = usePathname();
  const navItems = useMemo(() => [{ label: "Home", href: "/" }, ...navLinks], []);
  const sectionIds = useMemo(() => navItems.map((link) => getSectionId(link.href)).filter(Boolean), [navItems]);
  const [activeSection, setActiveSection] = useState(sectionPathMap[pathname] ?? sectionIds[0] ?? "");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(currentTheme);
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + Math.min(window.innerHeight * 0.45, 360);
      const isNearPageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      let current = sectionIds[0] ?? "";

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);

        if (section && section.offsetTop <= scrollPosition) {
          current = sectionId;
        }
      }

      if (isNearPageBottom) {
        current = sectionIds[sectionIds.length - 1] ?? current;
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [pathname, sectionIds]);

  const toggleTheme = () => {
    const currentTheme: Theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
  };

  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <header className="fixed inset-x-0 bottom-4 z-50 px-4 xl:inset-y-auto xl:left-6 xl:right-auto xl:top-1/2 xl:bottom-auto xl:-translate-y-1/2 xl:px-0">
      <nav
        className="group mx-auto flex max-w-[calc(100vw-2rem)] items-center gap-1 overflow-hidden rounded-full border border-line bg-card p-2 shadow-lift transition-all duration-300 xl:mx-0 xl:w-16 xl:max-w-none xl:flex-col xl:items-stretch xl:rounded-[1.25rem] xl:hover:w-48 xl:focus-within:w-48"
        aria-label="Primary navigation"
      >
        <div className="flex flex-1 items-center justify-center gap-1 xl:flex-none xl:flex-col xl:items-stretch xl:justify-start xl:gap-1">
          {navItems.map((link) => {
            const sectionId = getSectionId(link.href);
            const Icon = navIconMap[link.label] ?? UserRound;
            const isActive = activeSection === sectionId;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                title={link.label}
                onClick={(event) => {
                  setActiveSection(sectionId);
                  trackPortfolioEvent("navigation.item.click", {
                    section: sectionId,
                    label: link.label,
                    href: link.href,
                    source: "sidebar_nav"
                  });

                  if (sectionId && shouldHandleSectionClick(event) && document.getElementById(sectionId)) {
                    event.preventDefault();
                    window.dispatchEvent(
                      new CustomEvent("portfolio:navigate-section", {
                        detail: { sectionId, path: link.href }
                      })
                    );
                  }

                  if (event.detail > 0) {
                    event.currentTarget.blur();
                  }
                }}
                className={`group/item grid min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-teal/20 xl:w-full xl:px-2 ${
                  isActive ? "text-coral" : "text-navy/72 hover:text-teal"
                }`}
              >
                <span
                  className={`grid h-10 w-10 flex-none place-items-center rounded-full transition ${
                    isActive ? "bg-coral text-white shadow-soft" : "bg-background text-navy shadow-sm group-hover/item:bg-teal group-hover/item:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="hidden min-w-0 overflow-hidden whitespace-nowrap text-left opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 xl:block">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="h-8 w-px bg-line xl:h-px xl:w-full" aria-hidden="true" />
        <button
          type="button"
          className="group/item grid min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold text-navy/72 transition hover:text-teal focus:outline-none focus:ring-4 focus:ring-teal/20 xl:w-full xl:px-2"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          onClick={(event) => {
            const fromTheme: Theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
            const toTheme: Theme = fromTheme === "dark" ? "light" : "dark";
            toggleTheme();
            trackPortfolioEvent("theme.toggle.click", {
              fromTheme,
              toTheme,
              source: "sidebar_nav"
            });
            if (event.detail > 0) {
              event.currentTarget.blur();
            }
          }}
        >
          <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-background text-navy shadow-sm transition group-hover/item:bg-teal group-hover/item:text-white">
            <ThemeIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="hidden min-w-0 overflow-hidden whitespace-nowrap text-left opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 xl:block">
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>
      </nav>
    </header>
  );
}
