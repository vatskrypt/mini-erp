import type { ReactNode } from "react";

interface Props {
  open: boolean;
  children: ReactNode;
}

export function Modal({
  open,
  children,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
      <div className="w-125 border border-(--border) bg-(--surface) p-6">
        {children}
      </div>
    </div>
  );
}
