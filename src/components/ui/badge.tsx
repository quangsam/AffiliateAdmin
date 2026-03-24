// ============================================
// Badge Component — Status Orb + Tonal fills
// ============================================

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

const variantClasses: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
  default: { bg: "bg-surface-container-high", text: "text-on-surface-variant", dot: "bg-outline" },
  success: { bg: "bg-secondary-fixed/30", text: "text-secondary", dot: "bg-secondary" },
  warning: { bg: "bg-tertiary-container/20", text: "text-tertiary-container", dot: "bg-tertiary" },
  error: { bg: "bg-error-container/30", text: "text-error", dot: "bg-error" },
  info: { bg: "bg-primary-fixed/30", text: "text-primary", dot: "bg-primary" },
};

export function Badge({
  children,
  variant = "default",
  dot = true,
  className = "",
}: BadgeProps) {
  const v = variantClasses[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-label-md font-medium ${v.bg} ${v.text} ${className}`}
    >
      {dot && <span className={`status-orb ${v.dot}`} />}
      {children}
    </span>
  );
}
