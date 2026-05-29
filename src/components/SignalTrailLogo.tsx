import type { SVGProps } from "react";

export function SignalTrailLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M45 17C38 11 25 11 21 18C15 28 27 33 35 34C45 35 49 42 43 50C37 58 24 57 17 50"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M45 17C38 11 25 11 21 18C15 28 27 33 35 34C45 35 49 42 43 50C37 58 24 57 17 50"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-teal"
      />
      <circle cx="21" cy="18" r="4" fill="currentColor" className="text-coral" />
      <circle cx="35" cy="34" r="3.5" fill="currentColor" />
      <path
        d="M49 8L50.85 12.15L55 14L50.85 15.85L49 20L47.15 15.85L43 14L47.15 12.15L49 8Z"
        fill="currentColor"
        className="text-coral"
      />
    </svg>
  );
}
