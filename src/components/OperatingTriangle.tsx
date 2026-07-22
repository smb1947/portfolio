"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import type { AboutProfileItem } from "@/lib/data";

type NodeConfig = {
  title: string;
  position: CSSProperties;
};

const nodes: NodeConfig[] = [
  { title: "Agency", position: { left: "50%", top: "11%" } },
  { title: "Human-Centered", position: { left: "14%", top: "87%" } },
  { title: "Thoughtful", position: { left: "86%", top: "87%" } }
];

const activeEdgeStyle: CSSProperties = {
  filter: "drop-shadow(0 0 2px color-mix(in srgb, var(--teal) 58%, transparent))"
};

export function OperatingTriangle({
  items,
  iconMap
}: {
  items: AboutProfileItem[];
  iconMap: Record<string, LucideIcon>;
}) {
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const activeItem = items.find((item) => item.title === activeTitle) ?? null;
  const leftEdgeActive = activeTitle === "Agency" || activeTitle === "Human-Centered";
  const rightEdgeActive = activeTitle === "Agency" || activeTitle === "Thoughtful";
  const bottomEdgeActive = activeTitle === "Human-Centered" || activeTitle === "Thoughtful";

  return (
    <div className="operating-triangle-layout mt-6">
      <div
        className="relative mx-auto aspect-[25/17] w-full max-w-[44rem]"
        role="group"
        aria-label="Operating principles"
      >
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 68" aria-hidden="true">
        <line
          x1="49.2"
          y1="8.5"
          x2="13.2"
          y2="59"
          vectorEffect="non-scaling-stroke"
          className="transition-colors duration-200"
          stroke={leftEdgeActive ? "var(--teal)" : "var(--visual-border)"}
          style={leftEdgeActive ? activeEdgeStyle : undefined}
          strokeWidth="0.65"
        />
        <line
          x1="50.8"
          y1="8.5"
          x2="14.8"
          y2="59"
          vectorEffect="non-scaling-stroke"
          className="transition-colors duration-200"
          stroke={leftEdgeActive ? "var(--teal)" : "var(--visual-border)"}
          style={leftEdgeActive ? activeEdgeStyle : undefined}
          strokeWidth="0.65"
        />
        <line
          x1="49.2"
          y1="8.5"
          x2="85.2"
          y2="59"
          vectorEffect="non-scaling-stroke"
          className="transition-colors duration-200"
          stroke={rightEdgeActive ? "var(--teal)" : "var(--visual-border)"}
          style={rightEdgeActive ? activeEdgeStyle : undefined}
          strokeWidth="0.65"
        />
        <line
          x1="50.8"
          y1="8.5"
          x2="86.8"
          y2="59"
          vectorEffect="non-scaling-stroke"
          className="transition-colors duration-200"
          stroke={rightEdgeActive ? "var(--teal)" : "var(--visual-border)"}
          style={rightEdgeActive ? activeEdgeStyle : undefined}
          strokeWidth="0.65"
        />
        <line
          x1="14"
          y1="58.4"
          x2="86"
          y2="58.4"
          vectorEffect="non-scaling-stroke"
          className="transition-colors duration-200"
          stroke={bottomEdgeActive ? "var(--teal)" : "var(--visual-border)"}
          style={bottomEdgeActive ? activeEdgeStyle : undefined}
          strokeWidth="0.65"
        />
        <line
          x1="14"
          y1="59.6"
          x2="86"
          y2="59.6"
          vectorEffect="non-scaling-stroke"
          className="transition-colors duration-200"
          stroke={bottomEdgeActive ? "var(--teal)" : "var(--visual-border)"}
          style={bottomEdgeActive ? activeEdgeStyle : undefined}
          strokeWidth="0.65"
        />
        {[
          { cx: 50, cy: 8.5, active: activeTitle === "Agency" },
          { cx: 14, cy: 59, active: activeTitle === "Human-Centered" },
          { cx: 86, cy: 59, active: activeTitle === "Thoughtful" },
          { cx: 50, cy: 59, active: bottomEdgeActive }
        ].map((junction) => (
          <circle
            key={`${junction.cx}-${junction.cy}`}
            cx={junction.cx}
            cy={junction.cy}
            r="0.75"
            fill="var(--background)"
            stroke={junction.active ? "var(--teal)" : "var(--visual-border)"}
            strokeWidth="0.45"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        </svg>

        {nodes.map((node) => {
        const item = items.find((candidate) => candidate.title === node.title);

        if (!item) {
          return null;
        }

        const Icon = iconMap[item.title] ?? BadgeCheck;
        const isActive = activeTitle === item.title;

        return (
          <button
            key={item.title}
            type="button"
            aria-label={`${item.title}: ${item.description}`}
            className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-2 rounded-2xl px-2 py-1 text-center outline-none focus-visible:ring-4 focus-visible:ring-teal/20"
            style={node.position}
            onMouseEnter={() => setActiveTitle(item.title)}
            onMouseLeave={() => setActiveTitle(null)}
            onFocus={() => setActiveTitle(item.title)}
            onBlur={() => setActiveTitle(null)}
          >
            <span
              className="visual-node-surface relative grid h-16 w-16 place-items-center rounded-full border text-coral transition-all duration-200 sm:h-24 sm:w-24"
              style={{
                borderColor: isActive ? "var(--teal)" : "var(--visual-border)",
                boxShadow: isActive
                  ? "0 0 0 5px color-mix(in srgb, var(--teal) 16%, transparent), 0 18px 48px color-mix(in srgb, var(--teal) 22%, transparent)"
                  : "var(--visual-shadow)"
              }}
            >
              <span
                className="pointer-events-none absolute inset-1.5 rounded-full border"
                style={{ borderColor: isActive ? "var(--teal)" : "var(--visual-border)" }}
                aria-hidden="true"
              />
              <Icon className="relative h-7 w-7 text-coral sm:h-10 sm:w-10" aria-hidden="true" />
            </span>
            <span className="whitespace-nowrap font-serif text-sm font-semibold text-navy sm:text-2xl">
              {item.title}
            </span>
          </button>
        );
        })}
      </div>

      <aside
        className={`operating-triangle-detail visual-description-card relative mt-3 min-h-20 w-full max-w-5xl overflow-hidden rounded-2xl border px-6 py-5 transition-opacity duration-200 ${
          activeItem ? "opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!activeItem}
      >
        {activeItem ? (
          <>
            <span className="absolute inset-y-3 left-0 w-1 bg-coral" aria-hidden="true" />
            <p className="font-serif text-base leading-7 text-muted md:text-lg">{activeItem.description}</p>
          </>
        ) : null}
      </aside>
    </div>
  );
}
