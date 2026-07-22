"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import type { AboutProfileItem } from "@/lib/data";

type SegmentConfig = {
  title: string;
  path: string;
  clipPath: string;
  labelPosition: CSSProperties;
  restingTransform: string;
  activeTransform: string;
};

const segments: SegmentConfig[] = [
  {
    title: "AI-First Product Building",
    path: "M50 50 L50 2 A48 48 0 0 1 91.57 26 Z",
    clipPath: "polygon(50% 50%, 50% 0%, 75% 6.7%, 93.3% 25%)",
    labelPosition: { left: "69%", top: "23%" },
    restingTransform: "translate(0.5px, -0.5px) scale(0.965)",
    activeTransform: "translate(1.4px, -1.4px) scale(0.975)"
  },
  {
    title: "Strategic Business Acumen",
    path: "M50 50 L91.57 26 A48 48 0 0 1 91.57 74 Z",
    clipPath: "polygon(50% 50%, 93.3% 25%, 100% 50%, 93.3% 75%)",
    labelPosition: { left: "75%", top: "50%" },
    restingTransform: "translate(0.7px, 0) scale(0.965)",
    activeTransform: "translate(1.8px, 0) scale(0.975)"
  },
  {
    title: "Technical Depth",
    path: "M50 50 L91.57 74 A48 48 0 0 1 50 98 Z",
    clipPath: "polygon(50% 50%, 93.3% 75%, 75% 93.3%, 50% 100%)",
    labelPosition: { left: "68%", top: "77%" },
    restingTransform: "translate(0.5px, 0.5px) scale(0.965)",
    activeTransform: "translate(1.4px, 1.4px) scale(0.975)"
  },
  {
    title: "Cross-Functional Collaboration",
    path: "M50 50 L50 98 A48 48 0 0 1 8.43 74 Z",
    clipPath: "polygon(50% 50%, 50% 100%, 25% 93.3%, 6.7% 75%)",
    labelPosition: { left: "32%", top: "77%" },
    restingTransform: "translate(-0.5px, 0.5px) scale(0.965)",
    activeTransform: "translate(-1.4px, 1.4px) scale(0.975)"
  },
  {
    title: "Data-Driven Product Judgment",
    path: "M50 50 L8.43 74 A48 48 0 0 1 8.43 26 Z",
    clipPath: "polygon(50% 50%, 6.7% 75%, 0% 50%, 6.7% 25%)",
    labelPosition: { left: "25%", top: "50%" },
    restingTransform: "translate(-0.7px, 0) scale(0.965)",
    activeTransform: "translate(-1.8px, 0) scale(0.975)"
  },
  {
    title: "Customer & Behavioral Psychology",
    path: "M50 50 L8.43 26 A48 48 0 0 1 50 2 Z",
    clipPath: "polygon(50% 50%, 6.7% 25%, 25% 6.7%, 50% 0%)",
    labelPosition: { left: "31%", top: "23%" },
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
  const ActiveIcon = activeItem ? iconMap[activeItem.title] ?? Sparkles : Sparkles;

  return (
    <div className="capability-wheel-layout mt-6">
      <div className="relative aspect-square w-full max-w-[40rem]" role="group" aria-label="Product capabilities">
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
                    fill: isActive
                      ? "color-mix(in srgb, var(--teal) 24%, var(--card))"
                      : "var(--card)",
                    filter: isActive
                      ? "drop-shadow(0 0 5px color-mix(in srgb, var(--teal) 42%, transparent))"
                      : "drop-shadow(0 5px 7px color-mix(in srgb, var(--foreground) 10%, transparent))"
                  }}
                  stroke="var(--border)"
                  strokeWidth="2.4"
                />
                <path
                  d={segment.path}
                  vectorEffect="non-scaling-stroke"
                  fill="none"
                  stroke={isActive ? "var(--teal)" : "color-mix(in srgb, var(--border) 72%, var(--navy))"}
                  strokeWidth="0.75"
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
                aria-label={`${item.title}: ${item.description}`}
                className="absolute inset-0 z-10 cursor-pointer outline-none"
                style={{ clipPath: segment.clipPath }}
                onMouseEnter={() => setActiveTitle(item.title)}
                onMouseLeave={() => setActiveTitle(null)}
                onFocus={() => setActiveTitle(item.title)}
                onBlur={() => setActiveTitle(null)}
              />
              <span
                className="pointer-events-none absolute z-20 flex w-[27%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center text-navy"
                style={segment.labelPosition}
                aria-hidden="true"
              >
                <span
                  className={`grid h-[clamp(1.85rem,4.6vw,3.25rem)] w-[clamp(1.85rem,4.6vw,3.25rem)] place-items-center rounded-full border bg-background transition-colors duration-200 ${
                    isActive ? "border-teal" : "border-line"
                  }`}
                >
                  <Icon className="h-[48%] w-[48%] text-coral" />
                </span>
                <span className="font-serif text-[clamp(0.52rem,1.4vw,1.05rem)] font-semibold leading-tight">
                  {item.title}
                </span>
              </span>
            </div>
          );
        })}

        <span
          className="pointer-events-none absolute left-1/2 top-1/2 z-30 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-card shadow-soft sm:h-14 sm:w-14"
          aria-hidden="true"
        >
          <Sparkles className="h-4 w-4 text-coral sm:h-5 sm:w-5" />
        </span>
      </div>

      <aside
        className={`capability-wheel-detail relative min-h-[19rem] overflow-hidden rounded-2xl border border-line bg-card p-8 shadow-soft transition-opacity duration-200 ${
          activeItem ? "opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!activeItem}
      >
        {activeItem ? (
          <>
            <span className="absolute left-0 top-10 h-36 w-1 bg-coral" aria-hidden="true" />
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 flex-none place-items-center rounded-full border border-line bg-background text-coral">
                <ActiveIcon className="h-7 w-7" aria-hidden="true" />
              </span>
              <h4 className="font-serif text-xl font-semibold leading-tight text-navy">{activeItem.title}</h4>
            </div>
            <div className="my-6 h-px bg-coral" aria-hidden="true" />
            <p className="font-serif text-lg leading-8 text-muted">{activeItem.description}</p>
          </>
        ) : null}
      </aside>
    </div>
  );
}
