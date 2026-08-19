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

function shouldHandleSectionClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

type Theme = "light" | "dark";
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
  { label: "Porcelain Light", value: "light", Icon: Sun, swatchClassName: "bg-[#f1e6d5]" },
  { label: "Obsidian Dark", value: "dark", Icon: Moon, swatchClassName: "bg-[#07131a]" }
];

function getCurrentTheme(): Theme {
  const theme = document.documentElement.dataset.theme;

  return theme === "dark" ? theme : "light";
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
    if (!isMobileMenuOpen) {
      return;
    }

    const closeOpenMenus = () => {
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
  }, [isMobileMenuOpen]);

  const selectTheme = (nextTheme: Theme) => {
    const fromTheme = getCurrentTheme();
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
    setIsMobileMenuOpen(false);
    trackPortfolioEvent("theme.select.click", {
      fromTheme,
      toTheme: nextTheme,
      source: "top_theme_bar"
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

  const printPortfolio = (triggerElement?: HTMLElement) => {
    const printTheme = getCurrentTheme();
    triggerElement?.blur();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setIsMobileMenuOpen(false);
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

  const ShareIcon = shareStatus === "copied" ? Check : Share2;

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-[60] border-b border-[var(--theme-bar-border)] bg-[var(--theme-bar)] text-[var(--theme-bar-foreground)] shadow-[var(--theme-bar-shadow)] backdrop-blur-xl print:hidden"
        aria-label="Theme selection"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
          <div className="hidden sm:block">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[var(--theme-bar-muted)]">
              Portfolio palette
            </p>
            <p className="mt-0.5 font-serif text-sm font-semibold">Choose your atmosphere</p>
          </div>
          <div
            className="mx-auto flex items-center gap-1 rounded-full border border-[var(--theme-control-border)] bg-[var(--theme-control)] p-1 shadow-inner sm:mx-0"
            role="radiogroup"
            aria-label="Color theme"
          >
            {themeOptions.map((option) => {
              const isSelected = option.value === theme;
              const OptionIcon = option.Icon;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`flex min-h-10 items-center gap-2 rounded-full px-3 text-xs font-bold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-bar)] sm:px-4 sm:text-sm ${
                    isSelected
                      ? "bg-[var(--theme-control-active)] text-[var(--theme-control-active-text)] shadow-[var(--theme-control-shadow)]"
                      : "text-[var(--theme-bar-muted)] [@media(hover:hover)]:hover:bg-[var(--theme-control-hover)] [@media(hover:hover)]:hover:text-[var(--theme-bar-foreground)]"
                  }`}
                  onClick={() => selectTheme(option.value)}
                >
                  <span
                    className={`h-3.5 w-3.5 rounded-full border border-white/25 shadow-sm ${option.swatchClassName}`}
                    aria-hidden="true"
                  />
                  <OptionIcon className="hidden h-4 w-4 sm:block" aria-hidden="true" />
                  <span>{option.label}</span>
                  {isSelected ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    <header ref={headerRef} className="fixed inset-x-0 bottom-4 z-50 px-4 xl:inset-y-auto xl:left-6 xl:right-auto xl:top-1/2 xl:bottom-auto xl:-translate-y-1/2 xl:px-0">
      <div className="mx-auto max-w-[calc(100vw-2rem)] xl:hidden">
        {isMobileMenuOpen ? (
          <nav
            className="mb-3 overflow-hidden rounded-[1.25rem] border border-line bg-card p-2 shadow-lift"
            aria-label="Utility menu"
          >
            <div className="grid gap-1">
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
        className="group mx-auto flex max-w-[calc(100vw-2rem)] items-center gap-1 overflow-hidden rounded-full border-2 border-coral bg-card p-2 shadow-lift transition-all duration-300 xl:mx-0 xl:w-16 xl:max-w-none xl:flex-col xl:items-center xl:overflow-visible xl:rounded-[1.25rem]"
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
                href={sectionId ? `#${sectionId}` : link.href}
                aria-current={isActive ? "location" : undefined}
                aria-label={link.label}
                onClick={(event) => navigateToSection(event, sectionId, link.label, link.href)}
                className={`desktop-nav-item group/item relative grid min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-teal/20 xl:grid-cols-1 xl:justify-items-center xl:gap-0 xl:px-0 ${
                  isActive ? "z-10 text-coral" : "z-0 text-navy/72 [@media(hover:hover)]:hover:text-teal"
                }`}
              >
                <span
                  className={`relative grid h-10 w-10 flex-none place-items-center rounded-full transition ${
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
        <div className="nav-utility-divider mx-2 h-8 w-px bg-line xl:mx-0 xl:my-1.5 xl:h-px xl:w-full" aria-hidden="true" />
        <button
          type="button"
          className="group/item grid min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold text-navy/72 transition [@media(hover:hover)]:hover:text-teal focus:outline-none focus:ring-4 focus:ring-teal/20 xl:hidden print:hidden"
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
          <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-background text-navy shadow-sm transition [@media(hover:hover)]:group-hover/item:bg-teal [@media(hover:hover)]:group-hover/item:text-white">
            {isMobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </span>
          <span className="hidden min-w-0 overflow-hidden whitespace-nowrap text-left opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
            {isMobileMenuOpen ? "Close" : "Menu"}
          </span>
        </button>
        <button
          type="button"
          className="group/item hidden min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold text-navy/72 transition [@media(hover:hover)]:hover:text-teal focus:outline-none focus:ring-4 focus:ring-teal/20 xl:grid xl:grid-cols-1 xl:justify-items-center xl:gap-0 xl:px-0 print:grid"
          aria-label="Print portfolio"
          title="Print"
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
          <span className="hidden min-w-0 overflow-hidden whitespace-nowrap text-left opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
            Print
          </span>
        </button>
        <button
          type="button"
          className="group/item hidden min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold text-navy/72 transition [@media(hover:hover)]:hover:text-teal focus:outline-none focus:ring-4 focus:ring-teal/20 xl:grid xl:grid-cols-1 xl:justify-items-center xl:gap-0 xl:px-0 print:grid"
          aria-label={shareStatus === "copied" ? "Portfolio link copied" : "Share portfolio"}
          title={shareStatus === "copied" ? "Copied" : "Share"}
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
          <span className="hidden min-w-0 overflow-hidden whitespace-nowrap text-left opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
            {shareStatus === "copied" ? "Copied" : "Share"}
          </span>
        </button>
      </nav>
    </header>
    </>
  );
}
