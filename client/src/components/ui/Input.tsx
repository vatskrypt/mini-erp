import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showPasswordToggle?: boolean;
}

export default function Input({
  showPasswordToggle = false,
  type,
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
    <div className="relative">
      <input
        {...props}
        type={inputType}
        className="w-full pr-16"
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
  );
}
