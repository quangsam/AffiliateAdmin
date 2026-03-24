"use client";

// ============================================
// ImagePreview — For CCCD & billing receipts
// Per business rules: preview + delete before submit
// ============================================

import { useState } from "react";

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
  onRemove?: () => void;
  removable?: boolean;
}

export function ImagePreview({
  src,
  alt,
  className = "",
  onRemove,
  removable = false,
}: ImagePreviewProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className={`group relative inline-block overflow-hidden rounded-lg ${className}`}>
        <img
          src={src}
          alt={alt}
          width={240}
          height={160}
          className="h-40 w-60 cursor-pointer object-cover transition-transform duration-200 group-hover:scale-105"
          onClick={() => setExpanded(true)}
          loading="lazy"
        />
        {removable && onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-error text-on-error opacity-0 transition-opacity group-hover:opacity-100"
            aria-label="Xóa ảnh"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 3l8 8M11 3l-8 8" />
            </svg>
          </button>
        )}
      </div>

      {/* Lightbox */}
      {expanded && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-on-surface/80 p-8"
          onClick={() => setExpanded(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Preview: ${alt}`}
        >
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-whisper-lg"
          />
          <button
            onClick={() => setExpanded(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-surface/80 text-on-surface transition-colors hover:bg-surface"
            aria-label="Đóng"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 5l10 10M15 5l-10 10" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
