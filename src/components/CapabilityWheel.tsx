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
};

const segments: SegmentConfig[] = [
  {
    title: "AI-First Product Building",
    path: "M50 50 L50 2 A48 48 0 0 1 91.57 26 Z",
    clipPath: "polygon(50% 50%, 50% 0%, 75% 6.7%, 93.3% 25%)",
    labelPosition: { left: "69%", top: "23%" }
  },
  {
    title: "Strategic Business Acumen",
    path: "M50 50 L91.57 26 A48 48 0 0 1 91.57 74 Z",
    clipPath: "polygon(50% 50%, 93.3% 25%, 100% 50%, 93.3% 75%)",
    labelPosition: { left: "75%", top: "50%" }
  },
  {
    title: "Technical Depth",
    path: "M50 50 L91.57 74 A48 48 0 0 1 50 98 Z",
    clipPath: "polygon(50% 50%, 93.3% 75%, 75% 93.3%, 50% 100%)",
    labelPosition: { left: "68%", top: "77%" }
  },
  {
    title: "Cross-Functional Collaboration",
    path: "M50 50 L50 98 A48 48 0 0 1 8.43 74 Z",
    clipPath: "polygon(50% 50%, 50% 100%, 25% 93.3%, 6.7% 75%)",
    labelPosition: { left: "32%", top: "77%" }
  },
  {
    title: "Data-Driven Product Judgment",
    path: "M50 50 L8.43 74 A48 48 0 0 1 8.43 26 Z",
    clipPath: "polygon(50% 50%, 6.7% 75%, 0% 50%, 6.7% 25%)",
    labelPosition: { left: "25%", top: "50%" }
  },
  {
    title: "Customer & Behavioral Psychology",
    path: "M50 50 L8.43 26 A48 48 0 0 1 50 2 Z",
    clipPath: "polygon(50% 50%, 6.7% 25%, 25% 6.7%, 50% 0%)",
    labelPosition: { left: "31%", top: "23%" }
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

  return (
    <div className="capability-wheel-layout mt-6">
      <div className="relative aspect-square w-full max-w-[40rem]" role="group" aria-label="Product capabilities">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
          {segments.map((segment) => (
            <path
              key={segment.title}
              d={segment.path}
              vectorEffect="non-scaling-stroke"
              className={`transition-colors duration-200 ${activeTitle === segment.title ? "stroke-teal" : "stroke-line"}`}
              style={{
                fill:
                  activeTitle === segment.title
                    ? "color-mix(in srgb, var(--teal) 22%, var(--card))"
                    : "var(--card)"
              }}
              strokeWidth="1.25"
            />
          ))}
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
                className={`pointer-events-none absolute z-20 flex w-[27%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center transition-colors duration-200 ${
                  isActive ? "text-teal" : "text-navy"
                }`}
                style={segment.labelPosition}
                aria-hidden="true"
              >
                <Icon className="h-[clamp(1rem,2.4vw,1.65rem)] w-[clamp(1rem,2.4vw,1.65rem)] text-coral" />
                <span className="font-serif text-[clamp(0.52rem,1.35vw,0.95rem)] font-semibold leading-tight">
                  {item.title}
                </span>
              </span>
            </div>
          );
        })}
      </div>

      <aside
        className={`capability-wheel-detail min-h-52 rounded-2xl border border-line bg-card p-6 shadow-soft transition-opacity duration-200 ${
          activeItem ? "opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!activeItem}
      >
        {activeItem ? (
          <>
            <h4 className="font-serif text-2xl font-semibold leading-tight text-teal">{activeItem.title}</h4>
            <p className="mt-4 text-base leading-8 text-muted">{activeItem.description}</p>
          </>
        ) : null}
      </aside>
    </div>
  );
}
