"use client";

import { useState } from "react";
import { Blend, Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import type { AboutProfileItem } from "@/lib/data";
import { useAttentionSpotlight } from "@/hooks/useAttentionSpotlight";

type SegmentConfig = {
  title: string;
  titleLines: string[];
  path: string;
  clipPath: string;
  labelPosition: CSSProperties;
  desktopIconOffsetX: string;
  desktopIconOffsetY: string;
  edgeTitleOffset: string;
  mobileTitleOffset: string;
  mobileTitleYOffset: string;
  side: "left" | "right";
  restingTransform: string;
  activeTransform: string;
};

const polarPoint = (angle: number, radius: number) => {
  const radians = (angle * Math.PI) / 180;

  return {
    x: 50 + radius * Math.cos(radians),
    y: 50 + radius * Math.sin(radians)
  };
};

const point = ({ x, y }: { x: number; y: number }) => `${x.toFixed(2)} ${y.toFixed(2)}`;

const roundedSegmentPath = (startAngle: number, endAngle: number) => {
  const outerRadius = 48;
  const cornerInset = 1.6;
  const angleInset = 2;
  const innerRadius = 2.25;
  const startCorner = polarPoint(startAngle, outerRadius);
  const endCorner = polarPoint(endAngle, outerRadius);
  const startRadial = polarPoint(startAngle, outerRadius - cornerInset);
  const endRadial = polarPoint(endAngle, outerRadius - cornerInset);
  const arcStart = polarPoint(startAngle + angleInset, outerRadius);
  const arcEnd = polarPoint(endAngle - angleInset, outerRadius);
  const innerEnd = polarPoint(endAngle, innerRadius);
  const innerStart = polarPoint(startAngle, innerRadius);

  return [
    `M ${point(innerStart)}`,
    `L ${point(startRadial)}`,
    `Q ${point(startCorner)} ${point(arcStart)}`,
    `A ${outerRadius} ${outerRadius} 0 0 1 ${point(arcEnd)}`,
    `Q ${point(endCorner)} ${point(endRadial)}`,
    `L ${point(innerEnd)}`,
    `Q 50 50 ${point(innerStart)}`,
    "Z"
  ].join(" ");
};

const segments: SegmentConfig[] = [
  {
    title: "AI-First Product Building",
    titleLines: ["AI-First", "Product", "Building"],
    path: roundedSegmentPath(-90, -30),
    clipPath: "polygon(50% 50%, 50% 0%, 75% 6.7%, 93.3% 25%)",
    labelPosition: { left: "69%", top: "23%" },
    desktopIconOffsetX: "-4.4rem",
    desktopIconOffsetY: "6rem",
    edgeTitleOffset: "9.3rem",
    mobileTitleOffset: "4.65rem",
    mobileTitleYOffset: "-1.5rem",
    side: "right",
    restingTransform: "translate(0.5px, -0.5px) scale(0.965)",
    activeTransform: "translate(1.4px, -1.4px) scale(0.975)"
  },
  {
    title: "Strategic Business Acumen",
    titleLines: ["Strategic", "Business", "Acumen"],
    path: roundedSegmentPath(-30, 30),
    clipPath: "polygon(50% 50%, 93.3% 25%, 100% 50%, 93.3% 75%)",
    labelPosition: { left: "75%", top: "50%" },
    desktopIconOffsetX: "-5.6rem",
    desktopIconOffsetY: "0rem",
    edgeTitleOffset: "7.5rem",
    mobileTitleOffset: "3.75rem",
    mobileTitleYOffset: "0rem",
    side: "right",
    restingTransform: "translate(0.7px, 0) scale(0.965)",
    activeTransform: "translate(1.8px, 0) scale(0.975)"
  },
  {
    title: "Technical Depth",
    titleLines: ["Technical", "Depth"],
    path: roundedSegmentPath(30, 90),
    clipPath: "polygon(50% 50%, 93.3% 75%, 75% 93.3%, 50% 100%)",
    labelPosition: { left: "68%", top: "77%" },
    desktopIconOffsetX: "-4rem",
    desktopIconOffsetY: "-5.6rem",
    edgeTitleOffset: "9.6rem",
    mobileTitleOffset: "4.8rem",
    mobileTitleYOffset: "1.5rem",
    side: "right",
    restingTransform: "translate(0.5px, 0.5px) scale(0.965)",
    activeTransform: "translate(1.4px, 1.4px) scale(0.975)"
  },
  {
    title: "Cross-Functional Collaboration",
    titleLines: ["Cross-Functional", "Collaboration"],
    path: roundedSegmentPath(90, 150),
    clipPath: "polygon(50% 50%, 50% 100%, 25% 93.3%, 6.7% 75%)",
    labelPosition: { left: "32%", top: "77%" },
    desktopIconOffsetX: "4rem",
    desktopIconOffsetY: "-5.6rem",
    edgeTitleOffset: "-9.6rem",
    mobileTitleOffset: "-4.8rem",
    mobileTitleYOffset: "1.5rem",
    side: "left",
    restingTransform: "translate(-0.5px, 0.5px) scale(0.965)",
    activeTransform: "translate(-1.4px, 1.4px) scale(0.975)"
  },
  {
    title: "Data-Driven Product Judgment",
    titleLines: ["Data-Driven", "Product", "Judgment"],
    path: roundedSegmentPath(150, 210),
    clipPath: "polygon(50% 50%, 6.7% 75%, 0% 50%, 6.7% 25%)",
    labelPosition: { left: "25%", top: "50%" },
    desktopIconOffsetX: "5.6rem",
    desktopIconOffsetY: "0rem",
    edgeTitleOffset: "-7.5rem",
    mobileTitleOffset: "-3.75rem",
    mobileTitleYOffset: "0rem",
    side: "left",
    restingTransform: "translate(-0.7px, 0) scale(0.965)",
    activeTransform: "translate(-1.8px, 0) scale(0.975)"
  },
  {
    title: "Customer & Behavioral Psychology",
    titleLines: ["Customer &", "Behavioral", "Psychology"],
    path: roundedSegmentPath(210, 270),
    clipPath: "polygon(50% 50%, 6.7% 25%, 25% 6.7%, 50% 0%)",
    labelPosition: { left: "31%", top: "23%" },
    desktopIconOffsetX: "4.4rem",
    desktopIconOffsetY: "6rem",
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
  const [interactionTitle, setInteractionTitle] = useState<string | null>(null);
  const [spotlightTitle, setSpotlightTitle] = useState<string | null>(null);
  const firstTitle = segments.find((segment) => items.some((item) => item.title === segment.title))?.title ?? null;
  const activeTitle = interactionTitle ?? spotlightTitle ?? firstTitle;
  const activeItem = items.find((item) => item.title === activeTitle) ?? null;
  const spotlightRef = useAttentionSpotlight<HTMLDivElement>({
    activeAttribute: "data-visual-spotlight",
    onActiveTargetChange: (target) => setSpotlightTitle(target?.dataset.spotlightTitle ?? null),
    pauseSelector: "[data-visual-interaction-target]",
    selectionMode: "sequential",
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
                  className="capability-wheel-segment"
                  d={segment.path}
                  vectorEffect="non-scaling-stroke"
                  style={{
                    fill: isActive ? "var(--visual-active-surface)" : "var(--visual-surface)",
                    filter: isActive ? "var(--visual-active-filter)" : "var(--visual-svg-filter)"
                  }}
                  stroke={isActive ? "var(--teal)" : "var(--visual-wheel-border)"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                data-spotlight-title={item.title}
                aria-label={`${item.title}: ${item.description}`}
                className="absolute inset-0 z-10 cursor-pointer outline-none"
                style={{ clipPath: segment.clipPath }}
                onMouseEnter={() => setInteractionTitle(item.title)}
                onMouseLeave={() => setInteractionTitle(null)}
                onFocus={() => setInteractionTitle(item.title)}
                onBlur={() => setInteractionTitle(null)}
                onClick={() => setInteractionTitle(item.title)}
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
                    "--desktop-icon-offset-x": segment.desktopIconOffsetX,
                    "--desktop-icon-offset-y": segment.desktopIconOffsetY,
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
                <span className="capability-wheel-title type-h4 font-serif font-semibold">
                  {segment.titleLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </span>
            </div>
          );
        })}

        <span
          className="visual-hub pointer-events-none absolute left-1/2 top-1/2 z-30 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border sm:h-14 sm:w-14"
          aria-hidden="true"
        >
          <Blend className="h-4 w-4 text-coral sm:h-5 sm:w-5" />
        </span>
      </div>

      <div
        className={`capability-wheel-detail mt-6 w-full max-w-5xl transition-opacity duration-200 ${
          activeItem ? "opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!activeItem}
      >
        <aside className="visual-description-card relative min-h-20 overflow-hidden rounded-2xl border px-6 py-5">
          <span className="absolute inset-y-3 left-0 w-1 bg-coral" aria-hidden="true" />
          <div className="grid">
            {items.map((item) => {
              const isActive = item.title === activeTitle;

              return (
                <div
                  key={item.title}
                  className={`col-start-1 row-start-1 transition-opacity duration-200 ${
                    isActive ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                  aria-hidden={!isActive}
                >
                  <h3 className="type-h4 mb-1 font-serif font-semibold text-navy xl:hidden">
                    {item.title}
                  </h3>
                  <p className="type-body font-serif text-muted">{item.description}</p>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
