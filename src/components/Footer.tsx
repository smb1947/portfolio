import { site } from "@/lib/data";
import { PrintWebsiteLink } from "@/components/PrintWebsiteLink";

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-8 text-center sm:px-8">
        <p className="font-hero text-base font-semibold leading-6 text-navy sm:text-lg sm:leading-7">
          {site.name}
          <span className="sr-only">, </span>
          <span className="text-coral" aria-hidden="true">{" ✦ "}</span>
          AI Technical Product Builder
          <span className="sr-only">, </span>
          <span className="text-teal" aria-hidden="true">{" ✦ "}</span>
          Crafted with ❤️ in 🇺🇸
        </p>
        <PrintWebsiteLink />
      </div>
    </footer>
  );
}
