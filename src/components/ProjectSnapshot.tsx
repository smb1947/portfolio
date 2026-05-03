import type { Exploration } from "@/lib/data";

export function ProjectSnapshot({ exploration }: { exploration: Exploration }) {
  const rows = [
    ["Role", exploration.metadata.role],
    ["Methods", exploration.metadata.methods],
    ["Tools", exploration.metadata.tools],
    ["Outcome", exploration.metadata.outcome]
  ];

  return (
    <aside className="sticky top-28 rounded-[1.35rem] border border-line bg-card p-6 shadow-soft">
      <h2 className="font-serif text-2xl font-semibold text-navy">Project Snapshot</h2>
      <div className="mt-5 space-y-5">
        {rows.map(([label, value]) => (
          <div key={label}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal">{label}</p>
            <p className="mt-1 text-sm leading-6 text-muted">{value}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
