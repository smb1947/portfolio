"use client";

import { useEffect, useRef } from "react";

type AttentionSpotlightOptions = {
  activeAttribute: string;
  targetSelector: string;
};

export function useAttentionSpotlight<T extends HTMLElement>({
  activeAttribute,
  targetSelector
}: AttentionSpotlightOptions) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isInView = false;
    let activeTarget: HTMLElement | null = null;
    let spotlightTimeout: number | null = null;
    let clearTargetTimeout: number | null = null;

    const clearActiveTarget = () => {
      if (activeTarget) {
        activeTarget.removeAttribute(activeAttribute);
        activeTarget = null;
      }
    };

    const clearScheduleTimer = () => {
      if (spotlightTimeout) {
        window.clearTimeout(spotlightTimeout);
        spotlightTimeout = null;
      }
    };

    const clearSpotlightTimer = () => {
      if (clearTargetTimeout) {
        window.clearTimeout(clearTargetTimeout);
        clearTargetTimeout = null;
      }
    };

    const getVisibleTargets = () =>
      Array.from(container.querySelectorAll<HTMLElement>(targetSelector)).filter((target) => {
        const rect = target.getBoundingClientRect();

        return rect.bottom > 0 && rect.right > 0 && rect.top < window.innerHeight && rect.left < window.innerWidth;
      });

    function spotlightRandomTarget() {
      if (!isInView || reduceMotionQuery.matches) {
        clearActiveTarget();
        return;
      }

      const targets = getVisibleTargets();

      if (targets.length === 0) {
        clearActiveTarget();
        return;
      }

      const nextTarget = targets[Math.floor(Math.random() * targets.length)];
      clearActiveTarget();
      activeTarget = nextTarget;
      activeTarget.setAttribute(activeAttribute, "true");

      clearTargetTimeout = window.setTimeout(() => {
        if (activeTarget === nextTarget) {
          clearActiveTarget();
        }
        clearTargetTimeout = null;
      }, 1900);
    }

    const scheduleSpotlight = (delay = 10000) => {
      clearScheduleTimer();

      if (!isInView || reduceMotionQuery.matches) {
        return;
      }

      spotlightTimeout = window.setTimeout(() => {
        spotlightRandomTarget();
        scheduleSpotlight();
      }, delay);
    };

    const startSpotlight = () => {
      clearScheduleTimer();
      clearSpotlightTimer();
      clearActiveTarget();

      if (!reduceMotionQuery.matches) {
        scheduleSpotlight(1000);
      }
    };

    const handleMotionPreferenceChange = () => {
      if (isInView) {
        startSpotlight();
      } else {
        clearScheduleTimer();
        clearSpotlightTimer();
        clearActiveTarget();
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
          clearScheduleTimer();
          clearSpotlightTimer();
          clearActiveTarget();
        }
      },
      { threshold: [0, 0.35, 0.6] }
    );

    observer.observe(container);
    reduceMotionQuery.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      observer.disconnect();
      reduceMotionQuery.removeEventListener("change", handleMotionPreferenceChange);
      clearScheduleTimer();
      clearSpotlightTimer();
      clearActiveTarget();
    };
  }, [activeAttribute, targetSelector]);

  return containerRef;
}
