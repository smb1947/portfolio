"use client";

import { usePathname, useRouter } from "next/navigation";
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

function scrollToSection(sectionId: string) {
  if (sectionId === "home") {
    window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }

  document.getElementById(sectionId)?.scrollIntoView({ block: "start", behavior: "auto" });
}

export function SectionRouteSync() {
  const pathname = usePathname();
  const router = useRouter();
  const activePathRef = useRef(pathname);
  const routeScrollTimeoutRef = useRef<number | null>(null);
  const suppressScrollRoutingUntilRef = useRef(0);
  const scrollDrivenPathRef = useRef<string | null>(null);
  const sectionIds = useMemo(() => sectionRoutes.map((section) => section.id), []);

  useEffect(() => {
    activePathRef.current = pathname;
    const sectionId = sectionByPath.get(pathname);

    if (!sectionId) {
      return;
    }

    if (scrollDrivenPathRef.current === pathname) {
      scrollDrivenPathRef.current = null;
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
        scrollDrivenPathRef.current = nextPath;
        router.replace(nextPath, { scroll: false });
      }
    };

    const requestRouteUpdate = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateRouteForScroll);
    };

    updateRouteForScroll();
    window.addEventListener("scroll", requestRouteUpdate, { passive: true });
    window.addEventListener("resize", requestRouteUpdate);

    return () => {
      window.removeEventListener("scroll", requestRouteUpdate);
      window.removeEventListener("resize", requestRouteUpdate);
    };
  }, [router, sectionIds]);

  return null;
}
