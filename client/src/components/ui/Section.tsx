import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export function Section({ title, children }: Props) {
  return (
    <section className="mb-6">
      <h2 className="mb-3 border-b border-[(--border)] pb-2 font-bold uppercase">
        {title}
      </h2>

      {children}
    </section>
  );
}
