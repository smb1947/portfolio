"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

const sectionRoutes = [
  { id: "home", path: "/" },
  { id: "about", path: "/about" },
  { id: "experience", path: "/experience" },
  { id: "education", path: "/education" },
  { id: "contact", path: "/contact" }
];

const sectionByPath = new Map(sectionRoutes.map((section) => [section.path, section.id]));
const pathBySection = new Map(sectionRoutes.map((section) => [section.id, section.path]));

function getBasePath() {
  return window.location.pathname.startsWith("/portfolio") ? "/portfolio" : "";
}

function getBrowserPath(path: string) {
  const basePath = getBasePath();
  return path === "/" ? `${basePath}/` : `${basePath}${path}`;
}

function getAppPath() {
  const basePath = getBasePath();
  const pathname = window.location.pathname;

  if (basePath && pathname.startsWith(basePath)) {
    return pathname.slice(basePath.length) || "/";
  }

  return pathname;
}

function scrollToSection(sectionId: string) {
  if (sectionId === "home") {
    window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }

  document.getElementById(sectionId)?.scrollIntoView({ block: "start", behavior: "auto" });
}

export function SectionRouteSync() {
  const pathname = usePathname();
  const activePathRef = useRef(pathname);
  const routeScrollTimeoutRef = useRef<number | null>(null);
  const suppressScrollRoutingUntilRef = useRef(0);
  const sectionIds = useMemo(() => sectionRoutes.map((section) => section.id), []);

  useEffect(() => {
    activePathRef.current = pathname;
    const sectionId = sectionByPath.get(pathname);

    if (!sectionId) {
      return;
    }

    suppressScrollRoutingUntilRef.current = Date.now() + 700;

    if (routeScrollTimeoutRef.current) {
      window.clearTimeout(routeScrollTimeoutRef.current);
    }

    routeScrollTimeoutRef.current = window.setTimeout(() => {
      scrollToSection(sectionId);
    }, 50);

    return () => {
      if (routeScrollTimeoutRef.current) {
        window.clearTimeout(routeScrollTimeoutRef.current);
      }
    };
  }, [pathname]);

  useEffect(() => {
    let ticking = false;

    const updateRouteForScroll = () => {
      ticking = false;

      if (Date.now() < suppressScrollRoutingUntilRef.current) {
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      let activeSection = sectionIds[0];

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);

        if (section && section.offsetTop <= scrollPosition) {
          activeSection = sectionId;
        }
      }

      const nextPath = pathBySection.get(activeSection);

      if (nextPath && nextPath !== activePathRef.current) {
        activePathRef.current = nextPath;
        window.history.replaceState(null, "", getBrowserPath(nextPath));
        window.va?.("pageview", { route: nextPath, path: nextPath });
      }
    };

    const requestRouteUpdate = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateRouteForScroll);
    };

    const handlePopState = () => {
      const sectionId = sectionByPath.get(getAppPath());

      if (sectionId) {
        scrollToSection(sectionId);
      }
    };

    updateRouteForScroll();
    window.addEventListener("scroll", requestRouteUpdate, { passive: true });
    window.addEventListener("resize", requestRouteUpdate);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("scroll", requestRouteUpdate);
      window.removeEventListener("resize", requestRouteUpdate);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [sectionIds]);

  return null;
}
