import Link from "next/link";
import { navLinks, site } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 text-sm text-muted sm:px-8 md:flex-row md:items-center md:justify-between">
        <p>
          <span className="font-semibold text-navy">{site.name}</span> · Product Explorer
        </p>
        <div className="flex flex-wrap gap-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="font-semibold hover:text-teal">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
