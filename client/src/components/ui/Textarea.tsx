import type { TextareaHTMLAttributes } from "react";

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({
  className = "",
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={`w-full border border-(--border) bg-transparent px-3 py-2 outline-none focus:border-(--accent) ${className}`}
      {...props}
    />
  );
}
