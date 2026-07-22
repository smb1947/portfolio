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
  { title: "Human-Centered", position: { left: "18%", top: "78%" } },
  { title: "Thoughtful", position: { left: "82%", top: "78%" } }
];

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
      className="relative mx-auto mt-6 aspect-[4/3] w-full max-w-[52rem]"
      role="group"
      aria-label="Operating principles"
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 75" aria-hidden="true">
        <line
          x1="50"
          y1="8"
          x2="18"
          y2="59"
          vectorEffect="non-scaling-stroke"
          className={`transition-colors duration-200 ${leftEdgeActive ? "stroke-teal" : "stroke-line"}`}
          strokeWidth="1.25"
        />
        <line
          x1="50"
          y1="8"
          x2="82"
          y2="59"
          vectorEffect="non-scaling-stroke"
          className={`transition-colors duration-200 ${rightEdgeActive ? "stroke-teal" : "stroke-line"}`}
          strokeWidth="1.25"
        />
        <line
          x1="18"
          y1="59"
          x2="82"
          y2="59"
          vectorEffect="non-scaling-stroke"
          className={`transition-colors duration-200 ${bottomEdgeActive ? "stroke-teal" : "stroke-line"}`}
          strokeWidth="1.25"
        />
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
              className={`grid h-16 w-16 place-items-center rounded-full border bg-card shadow-soft transition-colors duration-200 sm:h-20 sm:w-20 ${
                isActive ? "border-teal text-teal" : "border-line text-coral"
              }`}
            >
              <Icon className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
            </span>
            <span className={`whitespace-nowrap font-serif text-sm font-semibold sm:text-xl ${isActive ? "text-teal" : "text-navy"}`}>
              {item.title}
            </span>
          </button>
        );
      })}

      <aside
        className={`operating-triangle-detail absolute left-1/2 top-[48%] z-10 w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-line bg-card p-5 text-center shadow-soft transition-opacity duration-200 ${
          activeItem ? "opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!activeItem}
      >
        {activeItem ? (
          <>
            <h4 className="font-serif text-2xl font-semibold text-teal">{activeItem.title}</h4>
            <p className="mt-3 text-sm leading-7 text-muted">{activeItem.description}</p>
          </>
        ) : null}
      </aside>
    </div>
  );
}
