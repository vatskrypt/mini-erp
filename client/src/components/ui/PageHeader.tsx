import type { ReactNode } from "react";

interface Props {
  title: string;
  action?: ReactNode;
}

export function PageHeader({
  title,
  action,
}: Props) {
  return (
    <div className="mb-6 flex items-center justify-between border-b border-(--border) pb-3">
      <h1 className="text-lg font-bold uppercase">
        {title}
      </h1>

      {action}
    </div>
  );
}
