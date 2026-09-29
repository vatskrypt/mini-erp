import type { ReactNode } from "react";

interface PanelProps {
  children: ReactNode;
  className?: string;
}

export function Panel({ children, className = "" }: PanelProps) {
  return (
    <section
      className={`rounded-xl border border-(--border) bg-(--surface) p-4 shadow-sm ${className}`}
    >
      {children}
    </section>
  );
}
