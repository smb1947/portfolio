import { site } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-8 text-center sm:px-8">
        <p className="text-sm font-semibold tracking-[0.04em] text-muted">
          {site.name} ✦ AI Technical Product Builder ✦ Crafted with ❤️ in 🇺🇸
        </p>
      </div>
    </footer>
  );
}
