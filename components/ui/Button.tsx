import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-white shadow-glass hover:shadow-glass-lg hover:brightness-105",
  secondary:
    "bg-white text-navy border border-hairline-strong hover:border-blue-600/40 hover:bg-blue-pale-2",
  ghost:
    "bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
