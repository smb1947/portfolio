import { site } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line bg-background">
      <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-muted sm:px-8">
        <div className="space-y-1">
          <p>
            <span className="font-semibold text-navy">{site.name}</span> · Product Explorer
          </p>
          <p>Made with ❤️ in the USA.</p>
        </div>
      </div>
    </footer>
  );
}
