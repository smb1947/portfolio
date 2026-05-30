"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef } from "react";

type ProjectResourceSpotlightProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function ProjectResourceSpotlight({ children, ...props }: ProjectResourceSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isInView = false;
    let activeButton: HTMLElement | null = null;
    let spotlightTimeout: number | null = null;

    const clearActiveButton = () => {
      if (activeButton) {
        activeButton.removeAttribute("data-resource-spotlight");
        activeButton = null;
      }
    };

    const clearTimers = () => {
      if (spotlightTimeout) {
        window.clearTimeout(spotlightTimeout);
        spotlightTimeout = null;
      }
    };

    const getVisibleButtons = () =>
      Array.from(container.querySelectorAll<HTMLElement>("[data-project-resource-action]")).filter(
        (button) => {
          const rect = button.getBoundingClientRect();

          return (
            rect.bottom > 0 &&
            rect.right > 0 &&
            rect.top < window.innerHeight &&
            rect.left < window.innerWidth
          );
        }
      );

    const scheduleSpotlight = (delay = 10000) => {
      clearTimers();

      if (!isInView || reduceMotionQuery.matches) {
        return;
      }

      spotlightTimeout = window.setTimeout(() => {
        spotlightRandomButton();
        scheduleSpotlight();
      }, delay);
    };

    function spotlightRandomButton() {
      if (!isInView || reduceMotionQuery.matches) {
        clearActiveButton();
        return;
      }

      const buttons = getVisibleButtons();

      if (buttons.length === 0) {
        clearActiveButton();
        return;
      }

      const nextButton = buttons[Math.floor(Math.random() * buttons.length)];
      clearActiveButton();
      activeButton = nextButton;
      activeButton.setAttribute("data-resource-spotlight", "true");

      window.setTimeout(() => {
        if (activeButton === nextButton) {
          clearActiveButton();
        }
      }, 1900);
    }

    const startSpotlight = () => {
      clearTimers();
      clearActiveButton();

      if (reduceMotionQuery.matches) {
        return;
      }

      scheduleSpotlight(1000);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextIsInView = entry.isIntersecting && entry.intersectionRatio >= 0.35;

        if (nextIsInView === isInView) {
          return;
        }

        isInView = nextIsInView;

        if (isInView) {
          startSpotlight();
        } else {
          clearTimers();
          clearActiveButton();
        }
      },
      { threshold: [0, 0.35, 0.6] }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      clearTimers();
      clearActiveButton();
    };
  }, []);

  return (
    <div ref={containerRef} {...props}>
      {children}
    </div>
  );
}
