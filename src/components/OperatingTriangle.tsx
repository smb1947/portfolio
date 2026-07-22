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
  { title: "Agency", position: { left: "50%", top: "10%" } },
  { title: "Human-Centered", position: { left: "14%", top: "78%" } },
  { title: "Thoughtful", position: { left: "86%", top: "78%" } }
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
    <div
      className="relative mx-auto mt-6 aspect-[4/3] w-full max-w-[56rem]"
      role="group"
      aria-label="Operating principles"
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 75" aria-hidden="true">
        <line
          x1="49.2"
          y1="8.5"
          x2="13.2"
          y2="59"
          vectorEffect="non-scaling-stroke"
          className={`transition-colors duration-200 ${leftEdgeActive ? "stroke-teal" : "stroke-line"}`}
          style={leftEdgeActive ? activeEdgeStyle : undefined}
          strokeWidth="0.65"
        />
        <line
          x1="50.8"
          y1="8.5"
          x2="14.8"
          y2="59"
          vectorEffect="non-scaling-stroke"
          className={`transition-colors duration-200 ${leftEdgeActive ? "stroke-teal" : "stroke-line"}`}
          style={leftEdgeActive ? activeEdgeStyle : undefined}
          strokeWidth="0.65"
        />
        <line
          x1="49.2"
          y1="8.5"
          x2="85.2"
          y2="59"
          vectorEffect="non-scaling-stroke"
          className={`transition-colors duration-200 ${rightEdgeActive ? "stroke-teal" : "stroke-line"}`}
          style={rightEdgeActive ? activeEdgeStyle : undefined}
          strokeWidth="0.65"
        />
        <line
          x1="50.8"
          y1="8.5"
          x2="86.8"
          y2="59"
          vectorEffect="non-scaling-stroke"
          className={`transition-colors duration-200 ${rightEdgeActive ? "stroke-teal" : "stroke-line"}`}
          style={rightEdgeActive ? activeEdgeStyle : undefined}
          strokeWidth="0.65"
        />
        <line
          x1="14"
          y1="58.4"
          x2="86"
          y2="58.4"
          vectorEffect="non-scaling-stroke"
          className={`transition-colors duration-200 ${bottomEdgeActive ? "stroke-teal" : "stroke-line"}`}
          style={bottomEdgeActive ? activeEdgeStyle : undefined}
          strokeWidth="0.65"
        />
        <line
          x1="14"
          y1="59.6"
          x2="86"
          y2="59.6"
          vectorEffect="non-scaling-stroke"
          className={`transition-colors duration-200 ${bottomEdgeActive ? "stroke-teal" : "stroke-line"}`}
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
            stroke={junction.active ? "var(--teal)" : "var(--border)"}
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
              className={`relative grid h-16 w-16 place-items-center rounded-full border bg-card shadow-soft transition-all duration-200 sm:h-24 sm:w-24 ${
                isActive ? "border-teal text-teal" : "border-line text-coral"
              }`}
              style={{
                boxShadow: isActive
                  ? "0 0 0 5px color-mix(in srgb, var(--teal) 16%, transparent), 0 18px 48px color-mix(in srgb, var(--teal) 22%, transparent)"
                  : "var(--shadow-soft)"
              }}
            >
              <span
                className={`pointer-events-none absolute inset-1.5 rounded-full border ${isActive ? "border-teal" : "border-line"}`}
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

      <aside
        className={`operating-triangle-detail absolute left-1/2 top-[48%] z-10 flex min-h-64 w-[38%] -translate-x-1/2 -translate-y-1/2 flex-col justify-center rounded-2xl border border-line bg-card p-6 text-center shadow-soft transition-opacity duration-200 ${
          activeItem ? "opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!activeItem}
      >
        {activeItem ? (
          <>
            <h4 className="font-serif text-2xl font-semibold text-teal">{activeItem.title}</h4>
            <div className="mx-auto my-4 h-px w-4/5 bg-coral" aria-hidden="true" />
            <p className="font-serif text-base leading-8 text-muted sm:text-lg">{activeItem.description}</p>
          </>
        ) : null}
      </aside>
    </div>
  );
}
