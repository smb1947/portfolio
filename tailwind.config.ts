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
        line: "var(--border)"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(20, 36, 50, 0.10)",
        lift: "0 22px 70px rgba(20, 36, 50, 0.16)"
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
