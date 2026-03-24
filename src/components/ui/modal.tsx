"use client";

// ============================================
// Modal — Compound Component (Glassmorphism)
// ============================================

import { useEffect, useRef, useCallback } from "react";

interface ModalOverlayProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function ModalOverlay({ open, onClose, children }: ModalOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Close on overlay click
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-on-surface/30 pt-[15vh] pb-10"
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
}

function ModalContent({
  children,
  className = "",
  width = "max-w-lg",
}: {
  children: React.ReactNode;
  className?: string;
  width?: string;
}) {
  return (
    <div
      className={`glass w-full rounded-2xl shadow-whisper-lg ${width} ${className}`}
      style={{ animation: "modalIn 0.2s ease-out" }}
    >
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      {children}
    </div>
  );
}

function ModalHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between px-6 pt-6 pb-2 ${className}`}>
      <div className="text-title-lg text-on-surface">{children}</div>
    </div>
  );
}

function ModalBody({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

function ModalFooter({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-end gap-3 px-6 pb-6 pt-2 ${className}`}>
      {children}
    </div>
  );
}

export const Modal = {
  Overlay: ModalOverlay,
  Content: ModalContent,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
};
