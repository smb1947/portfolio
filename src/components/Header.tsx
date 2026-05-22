"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, ChevronDown, GraduationCap, Home, Mail, Moon, Palette, Sun, UserRound } from "lucide-react";
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

const themeOptions: { id: Theme; label: string; tone: "light" | "dark" }[] = [
  { id: "light", label: "Warm Light", tone: "light" },
  { id: "dark", label: "Ember", tone: "dark" }
];

const themeIds = new Set<Theme>(themeOptions.map((option) => option.id));

function getDocumentTheme(): Theme {
  const theme = document.documentElement.dataset.theme;
  return themeIds.has(theme as Theme) ? (theme as Theme) : "light";
}

export function Header() {
  const pathname = usePathname();
  const navItems = useMemo(() => [{ label: "Home", href: "/" }, ...navLinks], []);
  const sectionIds = useMemo(() => navItems.map((link) => getSectionId(link.href)).filter(Boolean), [navItems]);
  const [activeSection, setActiveSection] = useState(sectionPathMap[pathname] ?? sectionIds[0] ?? "");
  const [theme, setTheme] = useState<Theme>("light");
  const [isThemePickerEnabled, setIsThemePickerEnabled] = useState(false);

  useEffect(() => {
    setTheme(getDocumentTheme());
    window.localStorage.removeItem("portfolio-theme-picker");

    const params = new URLSearchParams(window.location.search);
    const themePickerFlag = params.get("themePicker");

    if (themePickerFlag === "1" || themePickerFlag === "true") {
      setIsThemePickerEnabled(true);
      return;
    }

    setIsThemePickerEnabled(false);
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

  const applyTheme = (nextTheme: Theme) => {
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
  };

  const toggleTheme = () => {
    const currentTheme = getDocumentTheme();
    const currentOption = themeOptions.find((option) => option.id === currentTheme) ?? themeOptions[0];
    const nextTheme: Theme = currentOption.tone === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  };

  const currentThemeOption = themeOptions.find((option) => option.id === theme) ?? themeOptions[0];
  const ThemeIcon = currentThemeOption.tone === "dark" ? Sun : Moon;

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
                    isActive ? "bg-activeSurface text-activeForeground shadow-soft" : "bg-navIconSurface text-navIconForeground shadow-sm group-hover/item:bg-teal group-hover/item:text-white"
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
          aria-label={`Switch to ${currentThemeOption.tone === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${currentThemeOption.tone === "dark" ? "light" : "dark"} mode`}
          onClick={(event) => {
            const fromTheme = getDocumentTheme();
            const fromThemeOption = themeOptions.find((option) => option.id === fromTheme) ?? themeOptions[0];
            const toTheme: Theme = fromThemeOption.tone === "dark" ? "light" : "dark";
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
          <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-navIconSurface text-navIconForeground shadow-sm transition group-hover/item:bg-teal group-hover/item:text-white">
            <ThemeIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="hidden min-w-0 overflow-hidden whitespace-nowrap text-left opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 xl:block">
            {currentThemeOption.tone === "dark" ? "Light" : "Dark"}
          </span>
        </button>
        {isThemePickerEnabled ? (
          <label className="group/item relative grid min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold text-navy/72 transition hover:text-teal focus-within:ring-4 focus-within:ring-teal/20 xl:w-full xl:px-2">
            <span
              className="grid h-10 w-10 flex-none place-items-center rounded-full bg-navIconSurface text-navIconForeground shadow-sm transition group-hover/item:bg-teal group-hover/item:text-white"
              title="Theme picker"
            >
              <Palette className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="pointer-events-none hidden min-w-0 items-center justify-between gap-2 rounded-full border border-line bg-background px-3 py-2 text-left opacity-0 shadow-sm transition-opacity duration-200 group-hover/item:opacity-100 group-focus-within/item:opacity-100 xl:flex">
              <span className="min-w-0">
                <span className="block text-[0.65rem] font-black uppercase tracking-[0.12em] text-coral">
                  Theme
                </span>
                <span className="block truncate text-sm font-bold text-navy">
                  {currentThemeOption.label}
                </span>
              </span>
              <ChevronDown className="h-4 w-4 flex-none text-coral" aria-hidden="true" />
            </span>
            <select
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0 outline-none"
              value={theme}
              aria-label="Theme"
              onChange={(event) => {
                const nextTheme = event.currentTarget.value as Theme;
                const fromTheme = getDocumentTheme();
                applyTheme(nextTheme);
                trackPortfolioEvent("theme.picker.change", {
                  fromTheme,
                  toTheme: nextTheme,
                  source: "sidebar_nav"
                });
              }}
            >
              {themeOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </nav>
    </header>
  );
}
