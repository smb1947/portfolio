import type { SVGProps } from "react";

type SignalTrailLogoTone = "brand" | "nav" | "activeNav";

const toneClasses: Record<SignalTrailLogoTone, string> = {
  brand: "[--logo-accent:var(--coral)] [--logo-channel:var(--teal)] [--logo-node:var(--navy)] [--logo-trail:var(--navy)]",
  nav: "[--logo-accent:var(--coral)] [--logo-channel:var(--teal)] [--logo-node:var(--navy)] [--logo-trail:var(--navy)]",
  activeNav:
    "[--logo-accent:#fffdf8] [--logo-channel:#142432] [--logo-node:#142432] [--logo-trail:#fffdf8]"
};

type SignalTrailLogoProps = SVGProps<SVGSVGElement> & {
  tone?: SignalTrailLogoTone;
};

export function SignalTrailLogo({ className = "", tone = "brand", ...props }: SignalTrailLogoProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={`${toneClasses[tone]} ${className}`} {...props}>
      <path
        d="M45 17C38 11 25 11 21 18C15 28 27 33 35 34C45 35 49 42 43 50C37 58 24 57 17 50"
        stroke="var(--logo-trail)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M45 17C38 11 25 11 21 18C15 28 27 33 35 34C45 35 49 42 43 50C37 58 24 57 17 50"
        stroke="var(--logo-channel)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="21" cy="18" r="4" fill="var(--logo-accent)" />
      <circle cx="35" cy="34" r="3.5" fill="var(--logo-node)" />
      <path
        d="M49 8L50.85 12.15L55 14L50.85 15.85L49 20L47.15 15.85L43 14L47.15 12.15L49 8Z"
        fill="var(--logo-accent)"
      />
    </svg>
  );
}
