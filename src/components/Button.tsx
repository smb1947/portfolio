import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export function Button({ href, children, variant = "primary" }: ButtonProps) {
  const classes =
    variant === "primary"
      ? "border-teal bg-teal text-white shadow-soft hover:-translate-y-0.5 hover:bg-[#0d7c83]"
      : "border-navy/15 bg-white/70 text-navy hover:-translate-y-0.5 hover:border-teal/40 hover:text-teal";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full border px-6 text-sm font-bold transition duration-200 ${classes}`}
    >
      {children}
    </Link>
  );
}
