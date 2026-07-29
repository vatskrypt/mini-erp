import type { ReactNode } from "react";

type Variant =
  | "default"
  | "success"
  | "warning"
  | "danger";

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
}

const colors = {
  default: "border-[var(--border)] text-[var(--text)]",
  success: "border-[var(--success)] text-[var(--success)]",
  warning: "border-[var(--accent)] text-[var(--accent)]",
  danger: "border-[var(--danger)] text-[var(--danger)]",
};

export function Badge({
  children,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={`inline-block border px-2 py-1 text-xs uppercase ${colors[variant]}`}
    >
      {children}
    </span>
  );
}
