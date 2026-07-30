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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-md rounded-lg border border-(--border) bg-(--surface) p-6 shadow-xl">
            {children}
          </div>
        </div>
  );
}
