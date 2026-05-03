import type { LucideIcon } from "lucide-react";

type PrincipleCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function PrincipleCard({ title, description, icon: Icon }: PrincipleCardProps) {
  return (
    <article className="rounded-[1.25rem] border border-line bg-card p-6 shadow-soft">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-coral/10 text-coral">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-6 font-serif text-2xl font-semibold leading-tight text-navy">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
    </article>
  );
}
