import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 border border-(--border) uppercase transition-colors hover:bg-(--text) hover:text-(--bg) disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
