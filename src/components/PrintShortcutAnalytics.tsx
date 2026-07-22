"use client";

import { useEffect } from "react";
import { trackPortfolioEvent, trackPortfolioUtilityRoute } from "@/lib/analytics";

function isPrintShortcut(event: KeyboardEvent) {
  return (
    !event.repeat &&
    !event.altKey &&
    !event.shiftKey &&
    (event.ctrlKey || event.metaKey) &&
    event.key.toLowerCase() === "p"
  );
}

export function PrintShortcutAnalytics() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isPrintShortcut(event)) {
        return;
      }

      trackPortfolioEvent("print.browser.open", {
        source: "keyboard_shortcut",
        shortcut: event.metaKey ? "cmd+p" : "ctrl+p"
      });
      trackPortfolioUtilityRoute("/print");
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, []);

  return null;
}
