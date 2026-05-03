import { MapPin } from "lucide-react";
import { contactLinks, site } from "@/lib/data";
import { Button } from "@/components/Button";

export function ContactStrip() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 topo-lines opacity-30" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal">Let's connect</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">Thoughtful conversations welcome.</h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-white/70">
            Always open to thoughtful conversations, collaborations, and new ideas.
          </p>
          <div className="mt-8">
            <Button href="/contact">Contact Shankar</Button>
          </div>
        </div>
        <div className="rounded-[1.35rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
          <a className="block text-lg font-semibold text-white hover:text-teal" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <p className="mt-3 flex items-center gap-2 text-sm text-white/70">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {site.location}
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {contactLinks.filter((link) => link.label !== "Email").map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full border border-white/10 px-4 py-2 text-center text-sm font-bold text-white/80 transition hover:border-teal hover:text-teal"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
