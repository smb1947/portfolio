"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useAttentionSpotlight } from "@/hooks/useAttentionSpotlight";

type ProjectResourceSpotlightProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function ProjectResourceSpotlight({ children, ...props }: ProjectResourceSpotlightProps) {
  const containerRef = useAttentionSpotlight<HTMLDivElement>({
    activeAttribute: "data-resource-spotlight",
    targetSelector: "[data-project-resource-action]"
  });

  return (
    <div ref={containerRef} {...props}>
      {children}
    </div>
  );
}
