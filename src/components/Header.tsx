"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, Check, GraduationCap, Home, Mail, Menu, Moon, Printer, Share2, Sun, UserRound, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { publicAsset } from "@/lib/assets";
import { navLinks, site } from "@/lib/data";
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
type ShareStatus = "idle" | "copied";
type PrintStatus = "idle" | "processing" | "downloading" | "ready" | "error";

const printFilename = "shankar-binjawadgi-portfolio.pdf";

export function Header() {
  const pathname = usePathname();
  const navItems = useMemo(() => [{ label: "Home", href: "/" }, ...navLinks], []);
  const sectionIds = useMemo(() => navItems.map((link) => getSectionId(link.href)).filter(Boolean), [navItems]);
  const [activeSection, setActiveSection] = useState(sectionPathMap[pathname] ?? sectionIds[0] ?? "");
  const [theme, setTheme] = useState<Theme>("light");
  const [shareStatus, setShareStatus] = useState<ShareStatus>("idle");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [printStatus, setPrintStatus] = useState<PrintStatus>("idle");
  const [printProgress, setPrintProgress] = useState<number | null>(null);

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
  const ShareIcon = shareStatus === "copied" ? Check : Share2;

  const downloadPrintPdf = async () => {
    const printUrl = new URL(publicAsset("/portfolio-print.pdf"), window.location.origin).toString();

    if (printStatus === "processing" || printStatus === "downloading") {
      return;
    }

    setIsMobileMenuOpen(false);
    setPrintStatus("processing");
    setPrintProgress(null);
    trackPortfolioEvent("print_pdf.download.start", { source: "sidebar_nav" });

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
      anchor.download = printFilename;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      setPrintStatus("ready");
      setPrintProgress(100);
      trackPortfolioEvent("print_pdf.download.complete", { source: "sidebar_nav" });
      window.setTimeout(() => {
        setPrintStatus("idle");
        setPrintProgress(null);
      }, 2400);
    } catch {
      setPrintStatus("error");
      setPrintProgress(null);
      trackPortfolioEvent("print_pdf.download.error", { source: "sidebar_nav" });
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
    const fromTheme: Theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const toTheme: Theme = fromTheme === "dark" ? "light" : "dark";
    toggleTheme();
    setIsMobileMenuOpen(false);
    trackPortfolioEvent("theme.toggle.click", {
      fromTheme,
      toTheme,
      source: "sidebar_nav"
    });

    if (event.detail > 0) {
      event.currentTarget.blur();
    }
  };

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
            aria-label="Primary navigation"
          >
            <div className="grid gap-1">
              {navItems.map((link) => {
                const sectionId = getSectionId(link.href);
                const Icon = navIconMap[link.label] ?? UserRound;
                const isActive = activeSection === sectionId;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
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
                      <Icon className="h-5 w-5" aria-hidden="true" />
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
                <span>{theme === "dark" ? "Light" : "Dark"}</span>
              </button>
              <button
                type="button"
                className="grid min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-2 text-left text-sm font-bold text-navy/72 transition focus:outline-none focus:ring-4 focus:ring-teal/20"
                onClick={() => void downloadPrintPdf()}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-background text-navy">
                  <Printer className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>Print</span>
              </button>
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
                onClick={(event) => navigateToSection(event, sectionId, link.label, link.href)}
                className={`group/item grid min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-teal/20 xl:w-full xl:px-2 ${
                  isActive ? "text-coral" : "text-navy/72 [@media(hover:hover)]:hover:text-teal"
                }`}
              >
                <span
                  className={`grid h-10 w-10 flex-none place-items-center rounded-full transition ${
                    isActive ? "bg-coral text-white shadow-soft" : "bg-background text-navy shadow-sm [@media(hover:hover)]:group-hover/item:bg-teal [@media(hover:hover)]:group-hover/item:text-white"
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
          <span className="hidden min-w-0 overflow-hidden whitespace-nowrap text-left opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 xl:block">
            {isMobileMenuOpen ? "Close" : "Menu"}
          </span>
        </button>
        <button
          type="button"
          className="group/item hidden min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold text-navy/72 transition [@media(hover:hover)]:hover:text-teal focus:outline-none focus:ring-4 focus:ring-teal/20 xl:grid xl:w-full xl:px-2 print:grid"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          onClick={handleThemeButtonClick}
        >
          <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-background text-navy shadow-sm transition [@media(hover:hover)]:group-hover/item:bg-teal [@media(hover:hover)]:group-hover/item:text-white">
            <ThemeIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="hidden min-w-0 overflow-hidden whitespace-nowrap text-left opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 xl:block">
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>
        <div className="hidden h-px w-full bg-line xl:block print:block" aria-hidden="true" />
        <button
          type="button"
          className="group/item hidden min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold text-navy/72 transition [@media(hover:hover)]:hover:text-teal focus:outline-none focus:ring-4 focus:ring-teal/20 xl:grid xl:w-full xl:px-2 print:grid"
          aria-label="Open print-ready portfolio PDF"
          title="Print"
          onClick={(event) => {
            void downloadPrintPdf();
            if (event.detail > 0) {
              event.currentTarget.blur();
            }
          }}
        >
          <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-background text-navy shadow-sm transition [@media(hover:hover)]:group-hover/item:bg-teal [@media(hover:hover)]:group-hover/item:text-white">
            <Printer className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="hidden min-w-0 overflow-hidden whitespace-nowrap text-left opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 xl:block">
            Print
          </span>
        </button>
        <button
          type="button"
          className="group/item hidden min-h-12 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-full px-1 text-sm font-bold text-navy/72 transition [@media(hover:hover)]:hover:text-teal focus:outline-none focus:ring-4 focus:ring-teal/20 xl:grid xl:w-full xl:px-2 print:grid"
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
          <span className="hidden min-w-0 overflow-hidden whitespace-nowrap text-left opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 xl:block">
            {shareStatus === "copied" ? "Copied" : "Share"}
          </span>
        </button>
      </nav>
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
