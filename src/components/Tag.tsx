export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-xs font-semibold text-navy">
      {children}
    </span>
  );
}
