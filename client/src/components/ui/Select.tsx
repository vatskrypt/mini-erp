import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export function Select({
  className = "",
  children,
  ...props
}: SelectProps) {
  return (
    <select
      className={`w-full border border-(--border) bg-transparent px-3 py-2 outline-none focus:border-(--accent) ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
