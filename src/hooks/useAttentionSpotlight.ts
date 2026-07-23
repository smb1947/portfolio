"use client";

import { useEffect, useRef } from "react";

type AttentionSpotlightOptions = {
  activeAttribute: string;
  onActiveTargetChange?: (target: HTMLElement | null) => void;
  pauseSelector?: string;
  selectionMode?: "random" | "sequential";
  targetSelector: string;
};

export function useAttentionSpotlight<T extends HTMLElement>({
  activeAttribute,
  onActiveTargetChange,
  targetSelector,
  pauseSelector = targetSelector,
  selectionMode = "random"
}: AttentionSpotlightOptions) {
  const containerRef = useRef<T>(null);
  const onActiveTargetChangeRef = useRef(onActiveTargetChange);

  useEffect(() => {
    onActiveTargetChangeRef.current = onActiveTargetChange;
  }, [onActiveTargetChange]);

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
    let isPointerInteracting = false;
    let isFocusInteracting = false;
    let isPrinting = false;
    let nextTargetIndex = 0;

    const clearActiveTarget = () => {
      if (activeTarget) {
        activeTarget.removeAttribute(activeAttribute);
        activeTarget = null;
      }

      onActiveTargetChangeRef.current?.(null);
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

    function spotlightTarget() {
      if (isPrinting || !isInView || isPointerInteracting || isFocusInteracting || reduceMotionQuery.matches) {
        clearActiveTarget();
        return;
      }

      const targets = getVisibleTargets();

      if (targets.length === 0) {
        clearActiveTarget();
        return;
      }

      const nextTarget =
        selectionMode === "sequential"
          ? targets[nextTargetIndex % targets.length]
          : targets[Math.floor(Math.random() * targets.length)];

      if (selectionMode === "sequential") {
        nextTargetIndex = (nextTargetIndex + 1) % targets.length;
      }

      clearActiveTarget();
      activeTarget = nextTarget;
      activeTarget.setAttribute(activeAttribute, "true");
      onActiveTargetChangeRef.current?.(activeTarget);

      if (selectionMode === "random") {
        clearTargetTimeout = window.setTimeout(() => {
          if (activeTarget === nextTarget) {
            clearActiveTarget();
          }
          clearTargetTimeout = null;
        }, 1900);
      }
    }

    const scheduleSpotlight = (delay = selectionMode === "sequential" ? 5000 : 10000) => {
      clearScheduleTimer();

      if (isPrinting || !isInView || isPointerInteracting || isFocusInteracting || reduceMotionQuery.matches) {
        return;
      }

      spotlightTimeout = window.setTimeout(() => {
        spotlightTarget();
        scheduleSpotlight();
      }, delay);
    };

    const startSpotlight = () => {
      clearScheduleTimer();
      clearSpotlightTimer();
      clearActiveTarget();
      nextTargetIndex = 0;

      if (!isPrinting && !isPointerInteracting && !isFocusInteracting && !reduceMotionQuery.matches) {
        if (selectionMode === "sequential") {
          spotlightTarget();
          scheduleSpotlight();
        } else {
          scheduleSpotlight(1000);
        }
      }
    };

    const pauseSpotlight = () => {
      clearScheduleTimer();
      clearSpotlightTimer();
      clearActiveTarget();
    };

    const resumeSpotlight = () => {
      if (isInView && !isPrinting && !isPointerInteracting && !isFocusInteracting && !reduceMotionQuery.matches) {
        if (selectionMode === "sequential") {
          spotlightTarget();
          scheduleSpotlight();
        } else {
          scheduleSpotlight();
        }
      }
    };

    const handleBeforePrint = () => {
      isPrinting = true;
      pauseSpotlight();
    };

    const handleAfterPrint = () => {
      isPrinting = false;
      resumeSpotlight();
    };

    const isPauseTarget = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest(pauseSelector));

    const handlePointerOver = (event: PointerEvent) => {
      if ((event.pointerType === "mouse" || event.pointerType === "pen") && isPauseTarget(event.target)) {
        isPointerInteracting = true;
        pauseSpotlight();
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
        return;
      }

      if (isPauseTarget(event.relatedTarget)) {
        return;
      }

      isPointerInteracting = false;
      resumeSpotlight();
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (isPauseTarget(event.target)) {
        isFocusInteracting = true;
        pauseSpotlight();
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (isPauseTarget(event.relatedTarget)) {
        return;
      }

      isFocusInteracting = false;
      resumeSpotlight();
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
    container.addEventListener("pointerover", handlePointerOver);
    container.addEventListener("pointerout", handlePointerOut);
    container.addEventListener("focusin", handleFocusIn);
    container.addEventListener("focusout", handleFocusOut);
    reduceMotionQuery.addEventListener("change", handleMotionPreferenceChange);
    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      observer.disconnect();
      container.removeEventListener("pointerover", handlePointerOver);
      container.removeEventListener("pointerout", handlePointerOut);
      container.removeEventListener("focusin", handleFocusIn);
      container.removeEventListener("focusout", handleFocusOut);
      reduceMotionQuery.removeEventListener("change", handleMotionPreferenceChange);
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
      clearScheduleTimer();
      clearSpotlightTimer();
      clearActiveTarget();
    };
  }, [activeAttribute, pauseSelector, selectionMode, targetSelector]);

  return containerRef;
}
