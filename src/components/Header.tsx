"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  Check,
  GraduationCap,
  Home,
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
type ShareStatus = "idle" | "copied";
type PrintStatus = "idle" | "processing" | "downloading" | "ready" | "error";
type PrintTheme = "light" | "dark";
type NavMotion = {
  direction: "forward" | "backward";
  key: number;
  section: string;
};

const printFileByTheme: Record<PrintTheme, { filename: string; path: `/${string}` }> = {
  light: {
    filename: "shankar-binjawadgi-portfolio-light.pdf",
    path: "/portfolio-print.pdf"
  },
  dark: {
    filename: "shankar-binjawadgi-portfolio-dark.pdf",
    path: "/portfolio-print-dark.pdf"
  }
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState<ShareStatus>("idle");
  const [printStatus, setPrintStatus] = useState<PrintStatus>("idle");
  const [printProgress, setPrintProgress] = useState<number | null>(null);
  const [isPrintMenuOpen, setIsPrintMenuOpen] = useState(false);
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
    setIsMobileMenuOpen(false);
    trackPortfolioEvent("theme.select.click", {
      fromTheme,
      toTheme: nextTheme,
      source: "sidebar_nav"
    });
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
      setIsPrintMenuOpen(false);
      trackPortfolioEvent("theme.picker.open.click", {
        theme,
        source: "sidebar_nav"
      });
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
    }

    if (event.detail > 0) {
      event.currentTarget.blur();
    }
  };

  const downloadPrintPdf = async (printTheme: PrintTheme) => {
    const printFile = printFileByTheme[printTheme];
    const printUrl = new URL(publicAsset(printFile.path), window.location.origin).toString();

    if (printStatus === "processing" || printStatus === "downloading") {
      return;
    }

    setIsMobileMenuOpen(false);
    setIsPrintMenuOpen(false);
    setPrintStatus("processing");
    setPrintProgress(null);
    trackPortfolioEvent("print_pdf.download.start", { source: "sidebar_nav", theme: printTheme });

    try {
      const response = await fetch(printUrl, { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`Unable to fetch print PDF: ${response.status}`);
      }

      setPrintStatus("downloading");
      const contentLength = Number(response.headers.get("content-length"));
      const contentType = response.headers.get("content-type") ?? "application/pdf";
      let blob: Blob;

      if (response.body && Number.isFinite(contentLength) && contentLength > 0) {
        const reader = response.body.getReader();
        const chunks: ArrayBuffer[] = [];
        let received = 0;

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          chunks.push(value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength));
          received += value.length;
          setPrintProgress(Math.min(100, Math.round((received / contentLength) * 100)));
        }

        blob = new Blob(chunks, { type: contentType });
      } else {
        blob = await response.blob();
      }

      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = printFile.filename;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      setPrintStatus("ready");
      setPrintProgress(100);
      trackPortfolioEvent("print_pdf.download.complete", { source: "sidebar_nav", theme: printTheme });
      window.setTimeout(() => {
        setPrintStatus("idle");
        setPrintProgress(null);
      }, 2400);
    } catch {
      setPrintStatus("error");
      setPrintProgress(null);
      trackPortfolioEvent("print_pdf.download.error", { source: "sidebar_nav", theme: printTheme });
      window.setTimeout(() => setPrintStatus("idle"), 3000);
    }
  };

  const sharePortfolio = async () => {
    const shareUrl = window.location.href.split("#")[0];
    const shareData = {
      title: site.title,
      text: site.description,
      url: shareUrl
    };

    try {
      setIsMobileMenuOpen(false);

      if (navigator.share) {
        await navigator.share(shareData);
        trackPortfolioEvent("share.native.open", {
          source: "sidebar_nav"
        });
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setShareStatus("copied");
      window.setTimeout(() => setShareStatus("idle"), 1800);
      trackPortfolioEvent("share.link.copy", {
        source: "sidebar_nav"
      });
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
  const ThemeIcon = isThemePickerEnabled ? activeThemeOption.Icon : theme === "dark" ? Sun : Moon;
  const ShareIcon = shareStatus === "copied" ? Check : Share2;
  const printStatusText =
    printStatus === "processing"
      ? "Preparing print PDF..."
      : printStatus === "downloading"
        ? printProgress === null
          ? "Downloading print PDF..."
          : `Downloading print PDF ${printProgress}%`
        : printStatus === "ready"
          ? "Download started"
          : printStatus === "error"
            ? "Could not download PDF"
            : "";

  return (
    <header className="fixed inset-x-0 bottom-4 z-50 px-4 xl:inset-y-auto xl:left-6 xl:right-auto xl:top-1/2 xl:bottom-auto xl:-translate-y-1/2 xl:px-0">
      <div className="mx-auto max-w-[calc(100vw-2rem)] xl:hidden">
        {isMobileMenuOpen ? (
          <nav
            className="mb-3 overflow-hidden rounded-[1.25rem] border border-line bg-card p-2 shadow-lift"
            aria-label="Expanded navigation"
          >
            <div className="grid gap-1">
              {navItems.map((link) => {
                const sectionId = getSectionId(link.href);
                const Icon = navIconMap[link.label] ?? UserRound;
                const isActive = activeSection === sectionId;

                return (
                  <Link
                    key={link.href}
                    href={sectionId ? `#${sectionId}` : link.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`grid min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-2 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-teal/20 ${
                      isActive ? "text-coral" : "text-navy/72"
                    }`}
                    onClick={(event) => navigateToSection(event, sectionId, link.label, link.href)}
                  >
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full ${
                        isActive ? "bg-coral text-white" : "bg-background text-navy"
                      }`}
                    >
                      {link.label === "Home" ? (
                        <SignalTrailLogo tone={isActive ? "activeNav" : "nav"} className="h-7 w-7" aria-hidden="true" />
                      ) : (
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            <div className="my-1 h-px bg-line" aria-hidden="true" />
              <button
                type="button"
                className="grid min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-2 text-left text-sm font-bold text-navy/72 transition focus:outline-none focus:ring-4 focus:ring-teal/20"
                onClick={handleThemeButtonClick}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-background text-navy">
                  <ThemeIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>{isThemePickerEnabled ? activeThemeOption.label : theme === "dark" ? "Light" : "Dark"}</span>
              </button>
              <button
                type="button"
                className="grid min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-2 text-left text-sm font-bold text-navy/72 transition focus:outline-none focus:ring-4 focus:ring-teal/20"
                onClick={() => {
                  setIsPrintMenuOpen((current) => !current);
                  setIsThemeMenuOpen(false);
                }}
                aria-expanded={isPrintMenuOpen}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-background text-navy">
                  <Printer className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>Print</span>
              </button>
              {isPrintMenuOpen ? (
                <div className="grid gap-1 rounded-2xl bg-background p-2">
                  <button
                    type="button"
                    className="grid min-h-11 grid-cols-[2.25rem_1fr] items-center gap-3 rounded-full px-2 text-left text-sm font-bold text-navy transition focus:outline-none focus:ring-4 focus:ring-teal/20"
                    onClick={() => void downloadPrintPdf("light")}
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#fffdf8] text-[#f47e60] ring-1 ring-[#e8dfd0]">
                      <Sun className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>Light PDF</span>
                  </button>
                  <button
                    type="button"
                    className="grid min-h-11 grid-cols-[2.25rem_1fr] items-center gap-3 rounded-full px-2 text-left text-sm font-bold text-navy transition focus:outline-none focus:ring-4 focus:ring-teal/20"
                    onClick={() => void downloadPrintPdf("dark")}
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#142432] text-[#fffdf8] ring-1 ring-[#374149]">
                      <Moon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>Dark PDF</span>
                  </button>
                </div>
              ) : null}
              <button
                type="button"
                className="grid min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-2 text-left text-sm font-bold text-navy/72 transition focus:outline-none focus:ring-4 focus:ring-teal/20"
                onClick={() => void sharePortfolio()}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-background text-navy">
                  <ShareIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>{shareStatus === "copied" ? "Copied" : "Share"}</span>
              </button>
            </div>
          </nav>
        ) : null}
      </div>
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
                href={sectionId ? `#${sectionId}` : link.href}
                aria-current={isActive ? "location" : undefined}
                title={link.label}
                onClick={(event) => navigateToSection(event, sectionId, link.label, link.href)}
                className={`group/item relative grid min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-teal/20 xl:grid-cols-1 xl:justify-items-center xl:gap-0 xl:px-0 ${
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
          onClick={handleThemeButtonClick}
        >
          <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-background text-navy shadow-sm transition [@media(hover:hover)]:group-hover/item:bg-teal [@media(hover:hover)]:group-hover/item:text-white">
            <ThemeIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="hidden min-w-0 overflow-hidden whitespace-nowrap text-left opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
            {isThemePickerEnabled ? activeThemeOption.label : theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>
        <div className="hidden h-px w-full bg-line xl:block print:block" aria-hidden="true" />
        <button
          type="button"
          className="group/item hidden min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold text-navy/72 transition [@media(hover:hover)]:hover:text-teal focus:outline-none focus:ring-4 focus:ring-teal/20 xl:grid xl:grid-cols-1 xl:justify-items-center xl:gap-0 xl:px-0 print:grid"
          aria-label="Download print-ready portfolio PDF"
          title="Print"
          onClick={(event) => {
            setIsPrintMenuOpen((current) => !current);
            setIsThemeMenuOpen(false);
            if (event.detail > 0) {
              event.currentTarget.blur();
            }
          }}
        >
          <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-background text-navy shadow-sm transition [@media(hover:hover)]:group-hover/item:bg-teal [@media(hover:hover)]:group-hover/item:text-white">
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
      {isPrintMenuOpen ? (
        <div className="absolute bottom-full right-4 mb-3 hidden w-52 rounded-2xl border border-line bg-card p-2 shadow-lift xl:bottom-auto xl:left-20 xl:right-auto xl:top-[calc(50%+4.5rem)] xl:mb-0 xl:block xl:-translate-y-1/2">
          <div className="space-y-1" role="menu" aria-label="Choose print mode">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold text-navy transition focus:outline-none focus:ring-4 focus:ring-teal/20 [@media(hover:hover)]:hover:bg-background [@media(hover:hover)]:hover:text-teal"
              onClick={() => void downloadPrintPdf("light")}
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#fffdf8] text-[#f47e60] ring-1 ring-[#e8dfd0]">
                <Sun className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>Light PDF</span>
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold text-navy transition focus:outline-none focus:ring-4 focus:ring-teal/20 [@media(hover:hover)]:hover:bg-background [@media(hover:hover)]:hover:text-teal"
              onClick={() => void downloadPrintPdf("dark")}
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#142432] text-[#fffdf8] ring-1 ring-[#374149]">
                <Moon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>Dark PDF</span>
            </button>
          </div>
        </div>
      ) : null}
      {printStatus !== "idle" ? (
        <div
          className="pointer-events-none fixed bottom-24 left-4 right-4 z-[60] rounded-2xl border border-line bg-card p-4 text-sm font-bold text-navy shadow-lift xl:left-24 xl:right-auto xl:w-80"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-coral/10 text-coral">
              {printStatus === "ready" ? <Check className="h-5 w-5" aria-hidden="true" /> : <Printer className="h-5 w-5" aria-hidden="true" />}
            </span>
            <span>{printStatusText}</span>
          </div>
          {printStatus === "downloading" && printProgress !== null ? (
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-background">
              <div className="h-full rounded-full bg-teal transition-all" style={{ width: `${printProgress}%` }} />
            </div>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
