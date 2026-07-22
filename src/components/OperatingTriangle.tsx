"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import type { AboutProfileItem } from "@/lib/data";
import { useAttentionSpotlight } from "@/hooks/useAttentionSpotlight";

type NodeConfig = {
  title: string;
  position: CSSProperties;
  labelPosition: "above" | "below";
};

const nodes: NodeConfig[] = [
  { title: "Agency", position: { left: "50%", top: "11%" }, labelPosition: "above" },
  { title: "Human-Centered", position: { left: "14%", top: "87%" }, labelPosition: "below" },
  { title: "Thoughtful", position: { left: "86%", top: "87%" }, labelPosition: "below" }
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
  const spotlightRef = useAttentionSpotlight<HTMLDivElement>({
    activeAttribute: "data-visual-spotlight",
    targetSelector: "[data-visual-spotlight-target]"
  });

  return (
    <div ref={spotlightRef} className="operating-triangle-layout mt-6">
      <div
        className="relative mx-auto aspect-[25/17] w-full max-w-[30rem]"
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
          stroke={leftEdgeActive ? "var(--teal)" : "var(--visual-line)"}
          style={leftEdgeActive ? activeEdgeStyle : undefined}
          strokeWidth="1"
        />
        <line
          x1="50.8"
          y1="8.5"
          x2="14.8"
          y2="59"
          vectorEffect="non-scaling-stroke"
          className="transition-colors duration-200"
          stroke={leftEdgeActive ? "var(--teal)" : "var(--visual-line)"}
          style={leftEdgeActive ? activeEdgeStyle : undefined}
          strokeWidth="1"
        />
        <line
          x1="49.2"
          y1="8.5"
          x2="85.2"
          y2="59"
          vectorEffect="non-scaling-stroke"
          className="transition-colors duration-200"
          stroke={rightEdgeActive ? "var(--teal)" : "var(--visual-line)"}
          style={rightEdgeActive ? activeEdgeStyle : undefined}
          strokeWidth="1"
        />
        <line
          x1="50.8"
          y1="8.5"
          x2="86.8"
          y2="59"
          vectorEffect="non-scaling-stroke"
          className="transition-colors duration-200"
          stroke={rightEdgeActive ? "var(--teal)" : "var(--visual-line)"}
          style={rightEdgeActive ? activeEdgeStyle : undefined}
          strokeWidth="1"
        />
        <line
          x1="14"
          y1="58.4"
          x2="86"
          y2="58.4"
          vectorEffect="non-scaling-stroke"
          className="transition-colors duration-200"
          stroke={bottomEdgeActive ? "var(--teal)" : "var(--visual-line)"}
          style={bottomEdgeActive ? activeEdgeStyle : undefined}
          strokeWidth="1"
        />
        <line
          x1="14"
          y1="59.6"
          x2="86"
          y2="59.6"
          vectorEffect="non-scaling-stroke"
          className="transition-colors duration-200"
          stroke={bottomEdgeActive ? "var(--teal)" : "var(--visual-line)"}
          style={bottomEdgeActive ? activeEdgeStyle : undefined}
          strokeWidth="1"
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
            data-visual-spotlight-target
            className="operating-node absolute z-20 grid -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-2xl px-2 py-1 text-center outline-none focus-visible:ring-4 focus-visible:ring-teal/20"
            aria-label={`${item.title}: ${item.description}`}
            style={node.position}
            onMouseEnter={() => setActiveTitle(item.title)}
            onMouseLeave={() => setActiveTitle(null)}
            onFocus={() => setActiveTitle(item.title)}
            onBlur={() => setActiveTitle(null)}
          >
            <span
              className="visual-node-surface relative grid h-14 w-14 place-items-center rounded-full border transition-all duration-200 sm:h-16 sm:w-16"
              style={{
                background: isActive ? "var(--teal)" : "var(--visual-surface)",
                borderColor: isActive ? "var(--teal)" : "var(--visual-border)",
                boxShadow: isActive
                  ? "0 0 0 5px color-mix(in srgb, var(--teal) 16%, transparent), 0 18px 48px color-mix(in srgb, var(--teal) 22%, transparent)"
                  : "var(--visual-shadow)"
              }}
            >
              <span
                className="pointer-events-none absolute inset-1.5 rounded-full border"
                style={{ borderColor: isActive ? "#fffdf8" : "var(--visual-border)" }}
                aria-hidden="true"
              />
              <Icon
                className={`relative h-6 w-6 sm:h-7 sm:w-7 ${isActive ? "text-white" : "text-coral"}`}
                aria-hidden="true"
              />
            </span>
            <span
              className={`visual-spotlight-label absolute whitespace-nowrap font-serif text-xs font-semibold transition-colors duration-200 sm:text-base ${
                node.labelPosition === "above" ? "bottom-full mb-2" : "top-full mt-2"
              } ${
                isActive ? "text-teal" : "text-navy"
              }`}
            >
              {item.title}
            </span>
          </button>
        );
        })}
      </div>

      <aside
        className={`operating-triangle-detail visual-description-card relative mt-6 min-h-20 w-full max-w-5xl overflow-hidden rounded-2xl border px-6 py-5 transition-opacity duration-200 ${
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
