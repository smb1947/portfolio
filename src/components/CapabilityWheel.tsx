"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import type { AboutProfileItem } from "@/lib/data";
import { useAttentionSpotlight } from "@/hooks/useAttentionSpotlight";

type SegmentConfig = {
  title: string;
  path: string;
  clipPath: string;
  labelPosition: CSSProperties;
  edgeTitleOffset: string;
  mobileTitleOffset: string;
  mobileTitleYOffset: string;
  side: "left" | "right";
  restingTransform: string;
  activeTransform: string;
};

const segments: SegmentConfig[] = [
  {
    title: "AI-First Product Building",
    path: "M50 50 L50 2 A48 48 0 0 1 91.57 26 Z",
    clipPath: "polygon(50% 50%, 50% 0%, 75% 6.7%, 93.3% 25%)",
    labelPosition: { left: "69%", top: "23%" },
    edgeTitleOffset: "9.3rem",
    mobileTitleOffset: "4.65rem",
    mobileTitleYOffset: "-1.5rem",
    side: "right",
    restingTransform: "translate(0.5px, -0.5px) scale(0.965)",
    activeTransform: "translate(1.4px, -1.4px) scale(0.975)"
  },
  {
    title: "Strategic Business Acumen",
    path: "M50 50 L91.57 26 A48 48 0 0 1 91.57 74 Z",
    clipPath: "polygon(50% 50%, 93.3% 25%, 100% 50%, 93.3% 75%)",
    labelPosition: { left: "75%", top: "50%" },
    edgeTitleOffset: "7.5rem",
    mobileTitleOffset: "3.75rem",
    mobileTitleYOffset: "0rem",
    side: "right",
    restingTransform: "translate(0.7px, 0) scale(0.965)",
    activeTransform: "translate(1.8px, 0) scale(0.975)"
  },
  {
    title: "Technical Depth",
    path: "M50 50 L91.57 74 A48 48 0 0 1 50 98 Z",
    clipPath: "polygon(50% 50%, 93.3% 75%, 75% 93.3%, 50% 100%)",
    labelPosition: { left: "68%", top: "77%" },
    edgeTitleOffset: "9.6rem",
    mobileTitleOffset: "4.8rem",
    mobileTitleYOffset: "1.5rem",
    side: "right",
    restingTransform: "translate(0.5px, 0.5px) scale(0.965)",
    activeTransform: "translate(1.4px, 1.4px) scale(0.975)"
  },
  {
    title: "Cross-Functional Collaboration",
    path: "M50 50 L50 98 A48 48 0 0 1 8.43 74 Z",
    clipPath: "polygon(50% 50%, 50% 100%, 25% 93.3%, 6.7% 75%)",
    labelPosition: { left: "32%", top: "77%" },
    edgeTitleOffset: "-9.6rem",
    mobileTitleOffset: "-4.8rem",
    mobileTitleYOffset: "1.5rem",
    side: "left",
    restingTransform: "translate(-0.5px, 0.5px) scale(0.965)",
    activeTransform: "translate(-1.4px, 1.4px) scale(0.975)"
  },
  {
    title: "Data-Driven Product Judgment",
    path: "M50 50 L8.43 74 A48 48 0 0 1 8.43 26 Z",
    clipPath: "polygon(50% 50%, 6.7% 75%, 0% 50%, 6.7% 25%)",
    labelPosition: { left: "25%", top: "50%" },
    edgeTitleOffset: "-7.5rem",
    mobileTitleOffset: "-3.75rem",
    mobileTitleYOffset: "0rem",
    side: "left",
    restingTransform: "translate(-0.7px, 0) scale(0.965)",
    activeTransform: "translate(-1.8px, 0) scale(0.975)"
  },
  {
    title: "Customer & Behavioral Psychology",
    path: "M50 50 L8.43 26 A48 48 0 0 1 50 2 Z",
    clipPath: "polygon(50% 50%, 6.7% 25%, 25% 6.7%, 50% 0%)",
    labelPosition: { left: "31%", top: "23%" },
    edgeTitleOffset: "-9.3rem",
    mobileTitleOffset: "-4.65rem",
    mobileTitleYOffset: "-1.5rem",
    side: "left",
    restingTransform: "translate(-0.5px, -0.5px) scale(0.965)",
    activeTransform: "translate(-1.4px, -1.4px) scale(0.975)"
  }
];

export function CapabilityWheel({
  items,
  iconMap
}: {
  items: AboutProfileItem[];
  iconMap: Record<string, LucideIcon>;
}) {
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const activeItem = items.find((item) => item.title === activeTitle) ?? null;
  const spotlightRef = useAttentionSpotlight<HTMLDivElement>({
    activeAttribute: "data-visual-spotlight",
    onActiveTargetChange: (target) => setActiveTitle(target?.dataset.spotlightTitle ?? null),
    pauseSelector: "[data-visual-interaction-target]",
    targetSelector: "[data-visual-spotlight-target]"
  });

  return (
    <div ref={spotlightRef} className="capability-wheel-layout mt-6">
      <div className="capability-wheel-frame relative aspect-square w-full" role="group" aria-label="Product capabilities">
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" aria-hidden="true">
          {segments.map((segment) => {
            const isActive = activeTitle === segment.title;
            const transform = isActive ? segment.activeTransform : segment.restingTransform;

            return (
              <g
                key={segment.title}
                className="transition-transform duration-200"
                style={{ transform, transformBox: "fill-box", transformOrigin: "center" }}
              >
                <path
                  d={segment.path}
                  vectorEffect="non-scaling-stroke"
                  style={{
                    fill: isActive ? "var(--visual-active-surface)" : "var(--visual-surface)",
                    filter: isActive ? "var(--visual-active-filter)" : "var(--visual-svg-filter)"
                  }}
                  stroke={isActive ? "var(--teal)" : "var(--visual-wheel-border)"}
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </svg>

        {segments.map((segment) => {
          const item = items.find((candidate) => candidate.title === segment.title);

          if (!item) {
            return null;
          }

          const Icon = iconMap[item.title] ?? Sparkles;
          const isActive = activeTitle === item.title;

          return (
            <div key={item.title}>
              <button
                type="button"
                data-visual-interaction-target
                aria-label={`${item.title}: ${item.description}`}
                className="absolute inset-0 z-10 cursor-pointer outline-none"
                style={{ clipPath: segment.clipPath }}
                onMouseEnter={() => setActiveTitle(item.title)}
                onMouseLeave={() => setActiveTitle(null)}
                onFocus={() => setActiveTitle(item.title)}
                onBlur={() => setActiveTitle(null)}
                onClick={() => setActiveTitle(item.title)}
              />
              <span
                data-visual-spotlight-target
                data-spotlight-title={item.title}
                data-active={isActive ? "true" : undefined}
                data-side={segment.side}
                className={`capability-wheel-label pointer-events-none absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center text-center transition-all duration-200 ${
                  isActive ? "text-white" : "text-navy"
                }`}
                style={
                  {
                    ...segment.labelPosition,
                    "--edge-title-offset": segment.edgeTitleOffset,
                    "--mobile-title-offset": segment.mobileTitleOffset,
                    "--mobile-title-y-offset": segment.mobileTitleYOffset
                  } as CSSProperties
                }
                aria-hidden="true"
              >
                <span
                  className="visual-icon-medallion grid h-[3.25rem] w-[3.25rem] flex-none place-items-center rounded-full border transition-colors duration-200"
                  style={{
                    background: isActive ? "var(--teal)" : "var(--visual-medallion)",
                    borderColor: isActive ? "#fffdf8" : "var(--visual-border)"
                  }}
                >
                  <Icon className={`h-[48%] w-[48%] ${isActive ? "text-white" : "text-coral"}`} />
                </span>
                <span className="capability-wheel-title font-serif font-semibold leading-tight">
                  {item.title}
                </span>
              </span>
            </div>
          );
        })}

        <span
          className="visual-hub pointer-events-none absolute left-1/2 top-1/2 z-30 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border sm:h-14 sm:w-14"
          aria-hidden="true"
        >
          <Sparkles className="h-4 w-4 text-coral sm:h-5 sm:w-5" />
        </span>
      </div>

      <div
        className={`capability-wheel-detail mt-6 w-full max-w-5xl transition-opacity duration-200 ${
          activeItem ? "opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!activeItem}
      >
        <aside className="visual-description-card relative min-h-20 overflow-hidden rounded-2xl border px-6 py-5">
          {activeItem ? (
            <>
              <span className="absolute inset-y-3 left-0 w-1 bg-coral" aria-hidden="true" />
              <p className="font-serif text-base leading-7 text-muted md:text-lg">{activeItem.description}</p>
            </>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
