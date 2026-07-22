import { site } from "@/lib/data";
import { PrintWebsiteLink } from "@/components/PrintWebsiteLink";

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-8 text-center sm:px-8">
        <p className="text-sm font-semibold tracking-[0.04em] text-muted">
          {site.name} <span className="text-teal">✦</span> AI Technical Product Builder{" "}
          <span className="text-teal">✦</span> Crafted with ❤️ in 🇺🇸
        </p>
        <PrintWebsiteLink />
      </div>
    </footer>
  );
}
