import type { Exploration } from "@/lib/data";

export function ProjectVisual({ visual, title }: Pick<Exploration, "visual" | "title">) {
  if (visual === "bumble") {
    return (
      <div className="relative h-52 overflow-hidden rounded-t-[1.25rem] bg-[#f5c84b] p-5" aria-label={`${title} visual`}>
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/25" />
        <div className="mx-auto h-44 w-28 rounded-[1.5rem] border-4 border-navy bg-white p-3 shadow-soft">
          <div className="mx-auto h-12 w-12 rounded-full bg-coral/40" />
          <div className="mt-4 h-2 rounded-full bg-navy/20" />
          <div className="mt-2 h-2 w-16 rounded-full bg-navy/10" />
          <div className="mt-5 grid grid-cols-2 gap-2">
            <span className="h-7 rounded-lg bg-teal/20" />
            <span className="h-7 rounded-lg bg-coral/25" />
          </div>
        </div>
        <div className="absolute bottom-5 left-5 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-navy">
          authentic suggestions
        </div>
      </div>
    );
  }

  if (visual === "netflix") {
    return (
      <div className="relative h-52 overflow-hidden rounded-t-[1.25rem] bg-[#171717] p-5 text-white" aria-label={`${title} visual`}>
        <div className="text-xl font-black tracking-wider text-[#e50914]">NETFLIX</div>
        <div className="mt-10 flex items-center gap-3">
          {["Join", "Taste", "Watch"].map((step, index) => (
            <div key={step} className="flex flex-1 items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-sm font-bold">
                {index + 1}
              </div>
              {index < 2 ? <div className="h-px flex-1 bg-white/20" /> : null}
            </div>
          ))}
        </div>
        <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
          {[58, 82, 44].map((width, index) => (
            <span key={index} className="h-2 rounded-full bg-white/20" style={{ width: `${width}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (visual === "copilot") {
    return (
      <div className="relative h-52 overflow-hidden rounded-t-[1.25rem] bg-[linear-gradient(135deg,#dff6f3,#f1e6ff_48%,#ffe9d7)] p-5" aria-label={`${title} visual`}>
        <div className="absolute left-5 top-7 h-24 w-24 rounded-full border-[14px] border-teal/60" />
        <div className="absolute right-10 top-9 h-28 w-28 rounded-full border-[14px] border-coral/60" />
        <div className="absolute bottom-7 left-24 h-24 w-24 rounded-full border-[14px] border-[#5a7cf5]/50" />
        <div className="relative mt-24 rounded-2xl border border-white/70 bg-white/70 p-4 shadow-soft backdrop-blur">
          <p className="text-sm font-black text-navy">Microsoft 365 Copilot</p>
          <p className="mt-1 text-xs font-semibold text-muted">student adoption loops</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-52 overflow-hidden rounded-t-[1.25rem] bg-teal p-5 text-white" aria-label={`${title} visual`}>
      <div className="absolute right-4 top-4 grid h-24 w-24 place-items-center rounded-full border-[12px] border-white/80 text-lg font-black">
        82
      </div>
      <div className="absolute bottom-7 left-8 h-24 w-20 rounded-t-full bg-white/20" />
      <div className="absolute bottom-14 left-20 h-3 w-24 rotate-[-18deg] rounded-full bg-white/80" />
      <div className="absolute bottom-7 left-28 h-3 w-24 rotate-[18deg] rounded-full bg-coral/80" />
      <div className="absolute bottom-5 left-5 right-5 flex items-end gap-2">
        <span className="h-8 w-5 rounded-t-md bg-white/30" />
        <span className="h-14 w-5 rounded-t-md bg-white/40" />
        <span className="h-10 w-5 rounded-t-md bg-white/30" />
        <span className="h-16 w-5 rounded-t-md bg-white/50" />
      </div>
    </div>
  );
}
