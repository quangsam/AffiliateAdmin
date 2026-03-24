// ============================================
// Card — Compound Component (Tonal Layering)
// ============================================

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}

function CardRoot({ children, className = "", elevated = true }: CardProps) {
  return (
    <div
      className={`rounded-xl bg-surface-container-lowest ${
        elevated ? "shadow-whisper" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

function CardHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between px-6 pt-5 pb-3 ${className}`}>
      {children}
    </div>
  );
}

function CardBody({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`px-6 pb-5 ${className}`}>{children}</div>;
}

function CardFooter({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 border-t border-outline-variant/15 px-6 py-3 ${className}`}
    >
      {children}
    </div>
  );
}

export const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
};
