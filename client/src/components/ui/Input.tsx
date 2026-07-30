
import { useState } from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showPasswordToggle?: boolean;
  className?: string;
  error?: string;
  label?: string;
}

export default function Input({
  showPasswordToggle = false,
  type,
  className = "",
  error,
  label,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    showPasswordToggle && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="space-y-1">
      {label && ( <label className="text-sm uppercase text-(--muted)"> {label} </label> )}
      <div className="relative">
        <input
          {...props}
          type={inputType}
          className={`w-full border border-(--border) bg-transparent px-3 py-2 outline-none focus:border-(--accent)
          ${showPasswordToggle ? "pr-16" : ""}
          ${error ? "border-red-500" : ""}
          ${className}
          `}
        />

        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs uppercase text-(--muted) hover:text-(--accent)"
          >
            {showPassword ? "HIDE" : "SHOW"}
          </button>
        )}
      </div>
      {error && ( <p className="text-sm text-red-500"> {error} </p> )}
    </div>

  );
}
