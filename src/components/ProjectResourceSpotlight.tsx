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
    const touchInteractionQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    let isInView = false;
    let activeButton: HTMLElement | null = null;
    let collapseTimeout: number | null = null;
    let scheduleTimeout: number | null = null;

    const clearActiveButton = () => {
      if (activeButton) {
        activeButton.removeAttribute("data-resource-spotlight");
        activeButton.removeAttribute("data-resource-spotlight-mode");
        activeButton = null;
      }
    };

    const clearCollapseTimer = () => {
      if (collapseTimeout) {
        window.clearTimeout(collapseTimeout);
        collapseTimeout = null;
      }
    };

    const clearScheduleTimer = () => {
      if (scheduleTimeout) {
        window.clearTimeout(scheduleTimeout);
        scheduleTimeout = null;
      }
    };

    const stopSpotlight = () => {
      clearScheduleTimer();
      clearCollapseTimer();
      clearActiveButton();
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

    const getSpotlightDuration = () => (touchInteractionQuery.matches ? 4200 : 1900);

    const getInitialDelay = () => (touchInteractionQuery.matches ? 600 : 1000);

    const scheduleSpotlight = (delay = 10000) => {
      clearScheduleTimer();

      if (!isInView || reduceMotionQuery.matches) {
        return;
      }

      scheduleTimeout = window.setTimeout(() => {
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
      clearCollapseTimer();
      clearActiveButton();
      activeButton = nextButton;
      activeButton.setAttribute("data-resource-spotlight", "true");
      activeButton.setAttribute(
        "data-resource-spotlight-mode",
        touchInteractionQuery.matches ? "touch" : "hover"
      );

      collapseTimeout = window.setTimeout(() => {
        if (activeButton === nextButton) {
          clearActiveButton();
        }
      }, getSpotlightDuration());
    }

    const startSpotlight = () => {
      stopSpotlight();

      if (reduceMotionQuery.matches) {
        return;
      }

      scheduleSpotlight(getInitialDelay());
    };

    const handleInteractionPreferenceChange = () => {
      if (isInView) {
        startSpotlight();
      } else {
        stopSpotlight();
      }
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
          stopSpotlight();
        }
      },
      { threshold: [0, 0.35, 0.6] }
    );

    observer.observe(container);
    reduceMotionQuery.addEventListener("change", handleInteractionPreferenceChange);
    touchInteractionQuery.addEventListener("change", handleInteractionPreferenceChange);

    return () => {
      observer.disconnect();
      reduceMotionQuery.removeEventListener("change", handleInteractionPreferenceChange);
      touchInteractionQuery.removeEventListener("change", handleInteractionPreferenceChange);
      stopSpotlight();
    };
  }, []);

  return (
    <div ref={containerRef} {...props}>
      {children}
    </div>
  );
}
