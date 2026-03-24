// ============================================
// Button Component — Gradient Primary, variants
// ============================================

import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "gradient-primary text-white shadow-whisper hover:shadow-whisper-lg active:scale-[0.98] disabled:opacity-50",
  secondary:
    "bg-surface-container-high text-on-surface hover:bg-surface-container-highest active:scale-[0.98] disabled:opacity-50",
  danger:
    "bg-error text-on-error hover:bg-error/90 active:scale-[0.98] disabled:opacity-50",
  ghost:
    "bg-transparent text-on-surface-variant hover:bg-surface-container-high disabled:opacity-50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-label-md gap-1.5 rounded-md",
  md: "h-10 px-4 text-label-lg gap-2 rounded-lg",
  lg: "h-12 px-6 text-body-md gap-2.5 rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" opacity="0.25" />
          <path d="M4 12a8 8 0 018-8" opacity="0.75" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </button>
  );
}
