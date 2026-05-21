import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: "var(--navy)",
        teal: "var(--teal)",
        coral: "var(--coral)",
        muted: "var(--muted)",
        card: "var(--card)",
        line: "var(--border)",
        iconSurface: "var(--icon-surface)",
        iconForeground: "var(--icon-foreground)",
        iconBorder: "var(--icon-border)",
        navIconSurface: "var(--nav-icon-surface)",
        navIconForeground: "var(--nav-icon-foreground)",
        activeSurface: "var(--active-surface)",
        activeForeground: "var(--active-foreground)"
      },
      boxShadow: {
        soft: "0 18px 60px var(--shadow-soft)",
        lift: "0 22px 70px var(--shadow-lift)"
      },
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"]
      }
    }
  },
  plugins: []
};

export default config;
