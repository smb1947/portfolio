import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { site } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shankar-portfolio.vercel.app"),
  title: {
    default: site.title,
    template: `%s | ${site.shortName}`
  },
  description: site.description,
  applicationName: "Shankar Binjawadgi Portfolio",
  authors: [{ name: site.name }],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    locale: "en_US",
    siteName: "Shankar Binjawadgi | Product Explorer"
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description
  },
  icons: {
    icon: "/icon.svg"
  }
};

const themeScript = `
(() => {
  try {
    const storedTheme = window.localStorage.getItem("portfolio-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : prefersDark ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Header />
        <div className="pb-24 xl:pb-0 xl:pl-56">
          <main>{children}</main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
