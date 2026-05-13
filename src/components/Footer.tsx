import { site } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto h-px max-w-6xl bg-line" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-5 py-8 text-center text-sm text-muted sm:px-8">
        <p>
          <span className="font-semibold text-navy">{site.name}</span> · AI Product Builder · Made with ❤️ in the USA.
        </p>
      </div>
    </footer>
  );
}
