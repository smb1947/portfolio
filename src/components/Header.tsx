"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, Check, GraduationCap, Home, Mail, Moon, Palette, Sun, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MouseEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { navLinks } from "@/lib/data";
import { trackPortfolioEvent } from "@/lib/analytics";
import { SignalTrailLogo } from "@/components/SignalTrailLogo";

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

type Theme = "light" | "dark" | "classic";
type NavMotion = {
  direction: "forward" | "backward";
  key: number;
  section: string;
};

const themeOptions: Array<{ label: string; value: Theme; Icon: LucideIcon; swatchClassName: string }> = [
  { label: "Light", value: "light", Icon: Sun, swatchClassName: "bg-[#f8f2e8]" },
  { label: "Graphite dark", value: "dark", Icon: Palette, swatchClassName: "bg-[#090d10]" },
  { label: "Classic dark", value: "classic", Icon: Moon, swatchClassName: "bg-[#0a100e]" }
];

function getCurrentTheme(): Theme {
  const theme = document.documentElement.dataset.theme;

  return theme === "dark" || theme === "classic" ? theme : "light";
}

export function Header() {
  const pathname = usePathname();
  const navItems = useMemo(() => [{ label: "Home", href: "/" }, ...navLinks], []);
  const sectionIds = useMemo(() => navItems.map((link) => getSectionId(link.href)).filter(Boolean), [navItems]);
  const [activeSection, setActiveSection] = useState(sectionPathMap[pathname] ?? sectionIds[0] ?? "");
  const [theme, setTheme] = useState<Theme>("light");
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isThemePickerEnabled, setIsThemePickerEnabled] = useState(false);
  const previousActiveSectionRef = useRef(activeSection);
  const [navMotion, setNavMotion] = useState<NavMotion>({
    direction: "forward",
    key: 0,
    section: ""
  });

  useEffect(() => {
    setTheme(getCurrentTheme());
    setIsThemePickerEnabled(document.documentElement.dataset.themePicker === "true");
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

  useEffect(() => {
    const previousSection = previousActiveSectionRef.current;

    if (!activeSection || previousSection === activeSection) {
      return;
    }

    const previousIndex = sectionIds.indexOf(previousSection);
    const activeIndex = sectionIds.indexOf(activeSection);

    setNavMotion((current) => ({
      direction: previousIndex <= activeIndex ? "forward" : "backward",
      key: current.key + 1,
      section: activeSection
    }));
    previousActiveSectionRef.current = activeSection;
  }, [activeSection, sectionIds]);

  const toggleTheme = () => {
    const currentTheme: Theme = getCurrentTheme() === "dark" ? "dark" : "light";
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
  };

  const selectTheme = (nextTheme: Theme) => {
    const fromTheme = getCurrentTheme();
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
    setIsThemeMenuOpen(false);
    trackPortfolioEvent("theme.select.click", {
      fromTheme,
      toTheme: nextTheme,
      source: "sidebar_nav"
    });
  };

  const activeThemeOption = themeOptions.find((option) => option.value === theme) ?? themeOptions[0];
  const ThemeIcon = isThemePickerEnabled ? activeThemeOption.Icon : theme === "dark" ? Sun : Moon;

  return (
    <header className="fixed inset-x-0 bottom-4 z-50 px-4 xl:inset-y-auto xl:left-6 xl:right-auto xl:top-1/2 xl:bottom-auto xl:-translate-y-1/2 xl:px-0">
      <nav
        className="group mx-auto flex max-w-[calc(100vw-2rem)] items-center gap-1 overflow-hidden rounded-full border-2 border-coral bg-card p-2 shadow-lift transition-all duration-300 xl:mx-0 xl:w-16 xl:max-w-none xl:flex-col xl:items-center xl:rounded-[1.25rem]"
        aria-label="Primary navigation"
      >
        <div className="flex flex-1 items-center justify-center gap-1 xl:flex-none xl:flex-col xl:items-center xl:justify-center xl:gap-1">
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
                className={`group/item relative grid min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-teal/20 xl:grid-cols-1 xl:justify-items-center xl:gap-0 xl:px-0 ${
                  isActive ? "z-10 text-coral" : "z-0 text-navy/72 hover:text-teal"
                }`}
              >
                <span
                  className={`relative grid h-10 w-10 flex-none place-items-center rounded-full transition ${
                    isActive
                      ? "bg-coral text-white shadow-soft"
                      : "bg-background text-navy shadow-sm group-hover/item:bg-teal group-hover/item:text-white"
                  }`}
                >
                  {isActive && navMotion.section === sectionId ? (
                    <span
                      key={navMotion.key}
                      className={`nav-afterimage-stack ${
                        navMotion.direction === "backward"
                          ? "nav-afterimage-stack-backward"
                          : "nav-afterimage-stack-forward"
                      }`}
                      aria-hidden="true"
                    >
                      <span className="nav-afterimage nav-afterimage-one" />
                      <span className="nav-afterimage nav-afterimage-two" />
                      <span className="nav-afterimage nav-afterimage-three" />
                    </span>
                  ) : null}
                  {link.label === "Home" ? (
                    <SignalTrailLogo
                      tone={isActive ? "activeNav" : "nav"}
                      className={`relative z-10 h-7 w-7 ${
                        isActive
                          ? ""
                          : "group-hover/item:[--logo-accent:#fffdf8] group-hover/item:[--logo-channel:#142432] group-hover/item:[--logo-node:#fffdf8] group-hover/item:[--logo-trail:#fffdf8]"
                      }`}
                      aria-hidden="true"
                    />
                  ) : (
                    <Icon className="relative z-10 h-5 w-5" aria-hidden="true" />
                  )}
                </span>
                <span className="hidden min-w-0 overflow-hidden whitespace-nowrap text-left opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="h-8 w-px bg-line xl:h-px xl:w-full" aria-hidden="true" />
        <button
          type="button"
          className="group/item grid min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold text-navy/72 transition hover:text-teal focus:outline-none focus:ring-4 focus:ring-teal/20 xl:grid-cols-1 xl:justify-items-center xl:gap-0 xl:px-0"
          aria-label={
            isThemePickerEnabled
              ? `Choose theme, currently ${activeThemeOption.label}`
              : `Switch to ${theme === "dark" ? "light" : "dark"} mode`
          }
          aria-expanded={isThemePickerEnabled ? isThemeMenuOpen : undefined}
          title={
            isThemePickerEnabled
              ? `Choose theme, currently ${activeThemeOption.label}`
              : `Switch to ${theme === "dark" ? "light" : "dark"} mode`
          }
          onClick={(event) => {
            if (isThemePickerEnabled) {
              setIsThemeMenuOpen((current) => !current);
              trackPortfolioEvent("theme.picker.open.click", {
                theme,
                source: "sidebar_nav"
              });
            } else {
              const fromTheme: Theme = getCurrentTheme() === "dark" ? "dark" : "light";
              const toTheme: Theme = fromTheme === "dark" ? "light" : "dark";
              toggleTheme();
              trackPortfolioEvent("theme.toggle.click", {
                fromTheme,
                toTheme,
                source: "sidebar_nav"
              });
            }
            if (event.detail > 0) {
              event.currentTarget.blur();
            }
          }}
        >
          <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-background text-navy shadow-sm transition group-hover/item:bg-teal group-hover/item:text-white">
            <ThemeIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="hidden min-w-0 overflow-hidden whitespace-nowrap text-left opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
            {isThemePickerEnabled ? activeThemeOption.label : theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>
      </nav>
      {isThemePickerEnabled && isThemeMenuOpen ? (
        <div className="absolute bottom-full right-4 mb-3 w-56 rounded-2xl border border-line bg-card p-2 shadow-lift xl:bottom-auto xl:left-20 xl:right-auto xl:top-1/2 xl:mb-0 xl:-translate-y-1/2">
          <div className="space-y-1" role="radiogroup" aria-label="Theme picker">
            {themeOptions.map((option) => {
              const isSelected = option.value === theme;
              const OptionIcon = option.Icon;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-teal/20 ${
                    isSelected ? "bg-teal text-white" : "text-navy hover:bg-background hover:text-teal"
                  }`}
                  onClick={() => selectTheme(option.value)}
                >
                  <span className={`h-4 w-4 rounded-full border border-line ${option.swatchClassName}`} />
                  <OptionIcon className="h-4 w-4 flex-none" aria-hidden="true" />
                  <span className="flex-1">{option.label}</span>
                  {isSelected ? <Check className="h-4 w-4 flex-none" aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}
