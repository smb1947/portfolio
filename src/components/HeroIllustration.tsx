export function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-[0.92] w-full max-w-[500px] rounded-[2rem] border border-white/70 bg-card p-5 shadow-soft">
      <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_18%_20%,rgba(14,151,160,0.18),transparent_28%),radial-gradient(circle_at_82%_72%,rgba(244,126,96,0.18),transparent_28%)]" />
      <div className="absolute inset-5 rounded-[1.55rem] dot-grid opacity-70" aria-hidden="true" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 544" fill="none" aria-hidden="true">
        <path d="M78 286 C122 228, 158 210, 226 224 C305 240, 328 172, 412 150" stroke="#0E97A0" strokeWidth="2" strokeDasharray="8 10" />
        <path d="M108 406 C172 378, 198 422, 258 390 C310 362, 332 326, 404 334" stroke="#F47E60" strokeWidth="2" strokeDasharray="6 9" />
        <circle cx="78" cy="286" r="7" fill="#0E97A0" />
        <circle cx="226" cy="224" r="7" fill="#142432" />
        <circle cx="412" cy="150" r="7" fill="#F47E60" />
        <circle cx="404" cy="334" r="7" fill="#0E97A0" />
      </svg>

      <div className="relative grid h-full grid-cols-6 grid-rows-6 gap-4">
        <div className="col-span-4 row-span-4 rounded-[1.5rem] border border-navy/10 bg-[#fff8ea] p-5 shadow-[0_18px_40px_rgba(20,36,50,0.09)]">
          <div className="relative mx-auto mt-3 h-44 w-40">
            <div className="absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 rounded-full bg-[#f5c875]" />
            <div className="absolute bottom-0 left-1/2 h-32 w-32 -translate-x-1/2 rounded-t-[4rem] bg-teal/80" />
            <div className="absolute left-10 top-16 h-10 w-20 rounded-full bg-coral/75 blur-xl" />
            <div className="absolute left-1/2 top-8 h-20 w-16 -translate-x-1/2 rounded-full border-2 border-navy/20" />
          </div>
          <div className="mt-4 h-2 w-28 rounded-full bg-navy/15" />
          <div className="mt-2 h-2 w-40 rounded-full bg-teal/20" />
        </div>

        <div className="col-span-2 row-span-2 rounded-3xl border border-navy/10 bg-white/90 p-4 shadow-soft">
          <div className="flex h-28 items-end gap-2">
            <span className="h-10 flex-1 rounded-t-lg bg-teal/30" />
            <span className="h-20 flex-1 rounded-t-lg bg-teal" />
            <span className="h-14 flex-1 rounded-t-lg bg-coral/70" />
            <span className="h-24 flex-1 rounded-t-lg bg-navy/75" />
          </div>
          <p className="mt-3 text-xs font-bold text-navy">People insights</p>
        </div>

        <div className="col-span-2 row-span-2 rounded-3xl border border-navy/10 bg-white/90 p-4 shadow-soft">
          <svg viewBox="0 0 150 92" className="h-24 w-full" aria-hidden="true">
            <path d="M4 72 C26 50, 42 54, 58 42 S94 20, 116 36 S136 48, 146 20" fill="none" stroke="#0E97A0" strokeWidth="5" strokeLinecap="round" />
            <path d="M6 76 H144" stroke="#142432" strokeOpacity=".16" strokeWidth="2" />
          </svg>
          <p className="text-xs font-bold text-navy">Outcomes that matter</p>
        </div>

        <div className="col-span-3 row-span-2 rounded-3xl border border-navy/10 bg-navy p-5 text-white shadow-soft">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-coral" />
            <span className="h-3 w-3 rounded-full bg-[#f5c875]" />
            <span className="h-3 w-3 rounded-full bg-teal" />
          </div>
          <p className="mt-7 font-serif text-2xl leading-tight">Systems thinking</p>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {[...Array(8)].map((_, index) => (
              <span key={index} className="h-2 rounded-full bg-white/20" />
            ))}
          </div>
        </div>

        <div className="col-span-3 row-span-2 rounded-3xl border border-navy/10 bg-white/90 p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="h-14 w-14 rounded-full border-[10px] border-teal/80" />
            <span className="h-10 w-10 rounded-full bg-coral/30" />
            <span className="h-16 w-16 rounded-full border border-dashed border-navy/25" />
          </div>
          <p className="mt-5 text-xs font-bold text-navy">Questions before answers</p>
        </div>
      </div>
    </div>
  );
}
