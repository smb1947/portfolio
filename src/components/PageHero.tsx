import { Tag } from "@/components/Tag";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  tags?: string[];
};

export function PageHero({ eyebrow, title, description, tags }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-[linear-gradient(135deg,rgba(14,151,160,0.08),rgba(244,126,96,0.08)_48%,rgba(255,255,255,0.52))]">
      <div className="absolute inset-0 dot-grid opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        {eyebrow ? (
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-teal">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.03] text-navy md:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted md:text-xl">{description}</p>
        {tags?.length ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
