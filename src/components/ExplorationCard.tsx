import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Exploration } from "@/lib/data";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Tag } from "@/components/Tag";

type ExplorationCardProps = {
  exploration: Exploration;
  detailed?: boolean;
};

export function ExplorationCard({ exploration, detailed = false }: ExplorationCardProps) {
  return (
    <Link
      href={`/explorations/${exploration.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-line bg-card shadow-soft transition duration-200 hover:-translate-y-1 hover:border-teal/30 hover:shadow-lift focus:outline-none focus:ring-4 focus:ring-teal/20"
    >
      <ProjectVisual visual={exploration.visual} title={exploration.title} />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-2xl font-semibold leading-tight text-navy">
            {exploration.title}
          </h3>
          <ArrowUpRight className="mt-1 h-5 w-5 flex-none text-teal transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <p className="mt-3 text-sm leading-7 text-muted">{exploration.subtitle}</p>
        {detailed ? (
          <p className="mt-4 border-l-2 border-coral/60 pl-4 text-sm leading-7 text-navy/80">
            {exploration.problemStatement}
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-2">
          {exploration.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
