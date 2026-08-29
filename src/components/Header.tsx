"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  Check,
  GraduationCap,
  Home,
  AtSign,
  Mail,
  Menu,
  Moon,
  Palette,
  Printer,
  Share2,
  Sun,
  UserRound,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MouseEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { publicAsset } from "@/lib/assets";
import { navLinks, site } from "@/lib/data";
import { trackPortfolioEvent, trackPortfolioUtilityRoute } from "@/lib/analytics";
import { SignalTrailLogo } from "@/components/SignalTrailLogo";

const navIconMap: Record<string, LucideIcon> = {
  Home,
  About: UserRound,
  Education: GraduationCap,
  Experience: BriefcaseBusiness,
  Contact: AtSign
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

function getMobileNavClassName(label: string) {
  return `mobile-nav-${label.toLowerCase()}`;
}

function shouldHandleSectionClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

type Theme = "light" | "dark" | "classic";
type ShareStatus = "idle" | "copied";
type NavMotion = {
  direction: "forward" | "backward";
  key: number;
  section: string;
};
type ShareDataWithFiles = ShareData & {
  files?: File[];
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

async function getShareHeadshotFile() {
  try {
    const response = await fetch(publicAsset("/images/headshot.jpg"));

    if (!response.ok) {
      return null;
    }

    const blob = await response.blob();

    return new File([blob], "shankar-binjawadgi-headshot.jpg", {
      type: blob.type || "image/jpeg"
    });
  } catch {
    return null;
  }
}

function shouldAttachHeadshotToShare() {
  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();
  const isApplePlatform = /mac|iphone|ipad|ipod/.test(platform) || /iphone|ipad|ipod/.test(userAgent);

  return /android/.test(userAgent) && !isApplePlatform;
}

export function Header() {
  const pathname = usePathname();
  const navItems = useMemo(() => [{ label: "Home", href: "/" }, ...navLinks], []);
  const sectionIds = useMemo(() => navItems.map((link) => getSectionId(link.href)).filter(Boolean), [navItems]);
  const [activeSection, setActiveSection] = useState(sectionPathMap[pathname] ?? sectionIds[0] ?? "");
  const [theme, setTheme] = useState<Theme>("light");
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isThemePickerEnabled, setIsThemePickerEnabled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState<ShareStatus>("idle");
  const headerRef = useRef<HTMLElement>(null);
  const previousActiveSectionRef = useRef(activeSection);
  const [navMotion, setNavMotion] = useState<NavMotion>({
    direction: "forward",
    key: 0,
    section: ""
  });

  useEffect(() => {
    setTheme(getCurrentTheme());
    setIsThemePickerEnabled(document.documentElement.dataset.themePicker === "true");

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = (event: MediaQueryListEvent) => {
      const hasRequestedTheme = new URLSearchParams(window.location.search).has("theme");

      if (hasRequestedTheme) {
        return;
      }

      const nextTheme: Theme = event.matches ? "dark" : "light";
      document.documentElement.dataset.theme = nextTheme;
      setTheme(nextTheme);
    };

    systemTheme.addEventListener("change", syncSystemTheme);

    return () => systemTheme.removeEventListener("change", syncSystemTheme);
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

  useEffect(() => {
    if (!isThemeMenuOpen && !isMobileMenuOpen) {
      return;
    }

    const closeOpenMenus = () => {
      setIsThemeMenuOpen(false);
      setIsMobileMenuOpen(false);
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (target instanceof Node && headerRef.current?.contains(target)) {
        return;
      }

      closeOpenMenus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeOpenMenus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isThemeMenuOpen, isMobileMenuOpen]);

  const toggleTheme = () => {
    const currentTheme: Theme = getCurrentTheme() === "dark" ? "dark" : "light";
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
  };

  const selectTheme = (nextTheme: Theme) => {
    const fromTheme = getCurrentTheme();
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
    setIsThemeMenuOpen(false);
    setIsMobileMenuOpen(false);
    trackPortfolioEvent("theme.select.click", {
      fromTheme,
      toTheme: nextTheme,
      source: "sidebar_nav"
    });
    trackPortfolioUtilityRoute(`/utility/theme/${nextTheme}`);
  };

  const navigateToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
    label: string,
    href: string
  ) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    trackPortfolioEvent("navigation.item.click", {
      section: sectionId,
      label,
      href,
      source: "sidebar_nav"
    });

    if (sectionId && shouldHandleSectionClick(event) && document.getElementById(sectionId)) {
      event.preventDefault();
      window.dispatchEvent(
        new CustomEvent("portfolio:navigate-section", {
          detail: { sectionId, path: href }
        })
      );
    }

    if (event.detail > 0) {
      event.currentTarget.blur();
    }
  };

  const handleThemeButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isThemePickerEnabled) {
      setIsThemeMenuOpen((current) => !current);
      trackPortfolioEvent("theme.picker.open.click", {
        theme,
        source: "sidebar_nav"
      });
      trackPortfolioUtilityRoute("/utility/theme-picker");
    } else {
      const fromTheme: Theme = getCurrentTheme() === "dark" ? "dark" : "light";
      const toTheme: Theme = fromTheme === "dark" ? "light" : "dark";
      toggleTheme();
      setIsMobileMenuOpen(false);
      trackPortfolioEvent("theme.toggle.click", {
        fromTheme,
        toTheme,
        source: "sidebar_nav"
      });
      trackPortfolioUtilityRoute(`/utility/theme/${toTheme}`);
    }

    if (event.detail > 0) {
      event.currentTarget.blur();
    }
  };

  const printPortfolio = (triggerElement?: HTMLElement) => {
    const printTheme = getCurrentTheme();
    triggerElement?.blur();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setIsMobileMenuOpen(false);
    setIsThemeMenuOpen(false);
    trackPortfolioEvent("print.browser.open", { source: "sidebar_nav", theme: printTheme });
    trackPortfolioUtilityRoute(`/utility/print/${printTheme}`);
    window.setTimeout(() => window.print(), 50);
  };

  const sharePortfolio = async () => {
    const shareUrl = window.location.href.split("#")[0];
    const shareText = `${shareUrl}\n${site.title}`;
    const shareData: ShareDataWithFiles = {
      title: site.title,
      text: site.title,
      url: shareUrl
    };

    try {
      setIsMobileMenuOpen(false);

      if (navigator.share) {
        const headshotFile = shouldAttachHeadshotToShare() ? await getShareHeadshotFile() : null;

        if (headshotFile && navigator.canShare?.({ files: [headshotFile] })) {
          shareData.files = [headshotFile];
        }

        await navigator.share(shareData);
        trackPortfolioEvent("share.native.open", {
          source: "sidebar_nav"
        });
        trackPortfolioUtilityRoute("/utility/share");
        return;
      }

      await navigator.clipboard.writeText(shareText);
      setShareStatus("copied");
      window.setTimeout(() => setShareStatus("idle"), 1800);
      trackPortfolioEvent("share.link.copy", {
        source: "sidebar_nav"
      });
      trackPortfolioUtilityRoute("/utility/share");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      trackPortfolioEvent("share.error", {
        source: "sidebar_nav"
      });
    }
  };

  const activeThemeOption = themeOptions.find((option) => option.value === theme) ?? themeOptions[0];
  const isDarkTheme = theme === "dark" || theme === "classic";
  const oppositeThemeLabel = isDarkTheme ? "Light" : "Dark";
  const ThemeIcon = isThemePickerEnabled ? activeThemeOption.Icon : isDarkTheme ? Sun : Moon;
  const ShareIcon = shareStatus === "copied" ? Check : Share2;

  return (
    <header ref={headerRef} className="mobile-site-header fixed inset-x-0 bottom-4 z-50 px-4 xl:inset-y-auto xl:left-6 xl:right-auto xl:top-1/2 xl:bottom-auto xl:-translate-y-1/2 xl:px-0">
      <div className="mx-auto max-w-[calc(100vw-2rem)] xl:hidden">
        {isMobileMenuOpen ? (
          <nav
            className="mb-3 overflow-hidden rounded-[1.25rem] border border-line bg-card p-2 shadow-lift"
            aria-label="Navigation menu"
          >
            <div className="grid gap-1">
              {navItems.map((link) => {
                const sectionId = getSectionId(link.href);
                const Icon = navIconMap[link.label] ?? UserRound;
                const isActive = activeSection === sectionId;

                return (
                  <Link
                    key={`overflow-${link.href}`}
                    href={sectionId ? `#${sectionId}` : link.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={(event) => navigateToSection(event, sectionId, link.label, link.href)}
                    className={`mobile-overflow-item ${getMobileNavClassName(link.label)} group/item min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-2 text-left text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-teal/20 ${
                      isActive ? "text-coral" : "text-navy/72 [@media(hover:hover)]:hover:text-teal"
                    }`}
                  >
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full transition ${
                        isActive
                          ? "bg-coral text-white shadow-soft"
                          : "bg-background text-navy [@media(hover:hover)]:group-hover/item:bg-teal [@media(hover:hover)]:group-hover/item:text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              <div className="mobile-overflow-divider mx-2 hidden h-px bg-line" aria-hidden="true" />
              <button
                type="button"
                className="group/item grid min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-2 text-left text-sm font-bold text-navy/72 transition [@media(hover:hover)]:hover:text-teal focus:outline-none focus:ring-4 focus:ring-teal/20"
                onClick={handleThemeButtonClick}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-background text-navy transition [@media(hover:hover)]:group-hover/item:bg-teal [@media(hover:hover)]:group-hover/item:text-white">
                  <ThemeIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>{isThemePickerEnabled ? activeThemeOption.label : oppositeThemeLabel}</span>
              </button>
              <button
                type="button"
                className="group/item grid min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-2 text-left text-sm font-bold text-navy/72 transition [@media(hover:hover)]:hover:text-teal focus:outline-none focus:ring-4 focus:ring-teal/20"
                onClick={(event) => {
                  printPortfolio(event.currentTarget);
                  if (event.detail > 0) {
                    event.currentTarget.blur();
                  }
                }}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-background text-navy transition [@media(hover:hover)]:group-hover/item:bg-teal [@media(hover:hover)]:group-hover/item:text-white print:!bg-background print:!text-navy">
                  <Printer className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>Print</span>
              </button>
              <button
                type="button"
                className="group/item grid min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-2 text-left text-sm font-bold text-navy/72 transition [@media(hover:hover)]:hover:text-teal focus:outline-none focus:ring-4 focus:ring-teal/20"
                onClick={() => void sharePortfolio()}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-background text-navy transition [@media(hover:hover)]:group-hover/item:bg-teal [@media(hover:hover)]:group-hover/item:text-white">
                  <ShareIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>{shareStatus === "copied" ? "Copied" : "Share"}</span>
              </button>
            </div>
          </nav>
        ) : null}
      </div>
      <nav
        className="mobile-primary-nav group mx-auto flex max-w-[calc(100vw-2rem)] items-center gap-1 overflow-hidden rounded-full border-2 border-coral bg-card p-2 shadow-lift transition-all duration-300 xl:mx-0 xl:w-16 xl:max-w-none xl:flex-col xl:items-center xl:overflow-visible xl:rounded-[1.25rem]"
        aria-label="Primary navigation"
      >
        <div className="mobile-nav-links flex min-w-0 flex-1 items-center justify-center gap-1 xl:flex-none xl:flex-col xl:items-center xl:justify-center xl:gap-1">
          {navItems.map((link) => {
            const sectionId = getSectionId(link.href);
            const Icon = navIconMap[link.label] ?? UserRound;
            const isActive = activeSection === sectionId;

            return (
              <Link
                key={link.href}
                href={sectionId ? `#${sectionId}` : link.href}
                aria-current={isActive ? "location" : undefined}
                aria-label={link.label}
                onClick={(event) => navigateToSection(event, sectionId, link.label, link.href)}
                className={`mobile-nav-item ${getMobileNavClassName(link.label)} desktop-nav-item group/item relative grid min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-teal/20 xl:grid-cols-1 xl:justify-items-center xl:gap-0 xl:px-0 ${
                  isActive ? "z-10 text-coral" : "z-0 text-navy/72 [@media(hover:hover)]:hover:text-teal"
                }`}
              >
                <span
                  className={`mobile-nav-icon relative grid h-10 w-10 flex-none place-items-center rounded-full transition ${
                    isActive
                      ? "bg-coral text-white shadow-soft"
                      : "bg-background text-navy shadow-sm [@media(hover:hover)]:group-hover/item:bg-teal [@media(hover:hover)]:group-hover/item:text-white"
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
                          : "[@media(hover:hover)]:group-hover/item:[--logo-accent:#fffdf8] [@media(hover:hover)]:group-hover/item:[--logo-channel:#142432] [@media(hover:hover)]:group-hover/item:[--logo-node:#fffdf8] [@media(hover:hover)]:group-hover/item:[--logo-trail:#fffdf8]"
                      }`}
                      aria-hidden="true"
                    />
                  ) : (
                    <Icon className="relative z-10 h-5 w-5" aria-hidden="true" />
                  )}
                </span>
                <span className="desktop-nav-label hidden whitespace-nowrap text-left">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="nav-utility-divider hidden bg-line xl:my-1.5 xl:block xl:h-px xl:w-full" aria-hidden="true" />
        <button
          type="button"
          className="mobile-menu-button group/item grid min-h-12 flex-none grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold text-navy/72 transition [@media(hover:hover)]:hover:text-teal focus:outline-none focus:ring-4 focus:ring-teal/20 xl:hidden print:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          title={isMobileMenuOpen ? "Close" : "Menu"}
          onClick={(event) => {
            setIsMobileMenuOpen((current) => !current);
            if (event.detail > 0) {
              event.currentTarget.blur();
            }
          }}
        >
          <span className="mobile-nav-icon grid h-10 w-10 flex-none place-items-center rounded-full bg-background text-navy shadow-sm transition [@media(hover:hover)]:group-hover/item:bg-teal [@media(hover:hover)]:group-hover/item:text-white">
            {isMobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </span>
          <span className="hidden min-w-0 overflow-hidden whitespace-nowrap text-left opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
            {isMobileMenuOpen ? "Close" : "Menu"}
          </span>
        </button>
        <button
          type="button"
          className="desktop-nav-utility group/item relative hidden min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold text-navy/72 transition [@media(hover:hover)]:hover:text-teal focus:outline-none focus:ring-4 focus:ring-teal/20 xl:grid xl:grid-cols-1 xl:justify-items-center xl:gap-0 xl:px-0 print:grid"
          aria-label={
            isThemePickerEnabled
              ? `Choose theme, currently ${activeThemeOption.label}`
              : `Switch to ${oppositeThemeLabel.toLowerCase()} theme`
          }
          aria-expanded={isThemePickerEnabled ? isThemeMenuOpen : undefined}
          onClick={handleThemeButtonClick}
        >
          <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-background text-navy shadow-sm transition [@media(hover:hover)]:group-hover/item:bg-teal [@media(hover:hover)]:group-hover/item:text-white">
            <ThemeIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="desktop-nav-label hidden whitespace-nowrap text-left">
            {isThemePickerEnabled ? "Theme" : oppositeThemeLabel}
          </span>
        </button>
        <button
          type="button"
          className="desktop-nav-utility group/item relative hidden min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold text-navy/72 transition [@media(hover:hover)]:hover:text-teal focus:outline-none focus:ring-4 focus:ring-teal/20 xl:grid xl:grid-cols-1 xl:justify-items-center xl:gap-0 xl:px-0 print:grid"
          aria-label="Print portfolio"
          onClick={(event) => {
            printPortfolio(event.currentTarget);
            if (event.detail > 0) {
              event.currentTarget.blur();
            }
          }}
        >
          <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-background text-navy shadow-sm transition [@media(hover:hover)]:group-hover/item:bg-teal [@media(hover:hover)]:group-hover/item:text-white print:!bg-background print:!text-navy">
            <Printer className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="desktop-nav-label hidden whitespace-nowrap text-left">
            Print
          </span>
        </button>
        <button
          type="button"
          className="desktop-nav-utility group/item relative hidden min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold text-navy/72 transition [@media(hover:hover)]:hover:text-teal focus:outline-none focus:ring-4 focus:ring-teal/20 xl:grid xl:grid-cols-1 xl:justify-items-center xl:gap-0 xl:px-0 print:grid"
          aria-label={shareStatus === "copied" ? "Portfolio link copied" : "Share portfolio"}
          onClick={(event) => {
            void sharePortfolio();
            if (event.detail > 0) {
              event.currentTarget.blur();
            }
          }}
        >
          <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-background text-navy shadow-sm transition [@media(hover:hover)]:group-hover/item:bg-teal [@media(hover:hover)]:group-hover/item:text-white">
            <ShareIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="desktop-nav-label hidden whitespace-nowrap text-left">
            {shareStatus === "copied" ? "Copied" : "Share"}
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
                    isSelected ? "bg-teal text-white" : "text-navy [@media(hover:hover)]:hover:bg-background [@media(hover:hover)]:hover:text-teal"
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
