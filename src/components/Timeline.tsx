import { timelineItems } from "@/lib/data";

export function Timeline() {
  return (
    <div className="relative">
      <div className="absolute left-6 top-8 hidden h-px w-[calc(100%-3rem)] bg-line md:block" aria-hidden="true" />
      <div className="grid gap-5 md:grid-cols-4">
        {timelineItems.map(({ title, description, icon: Icon }) => (
          <article key={title} className="relative rounded-[1.25rem] border border-line bg-card p-6 shadow-soft">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-teal/20 bg-teal/10 text-teal">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-6 font-serif text-2xl font-semibold text-navy">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
