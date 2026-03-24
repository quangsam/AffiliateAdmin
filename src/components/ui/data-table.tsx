"use client";

// ============================================
// DataTable — Compound Component
// No-Line design (zebra with tonal bg, no borders)
// ============================================

import { useState, useMemo } from "react";

interface DataTableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

function DataTableHeader({ children, className = "" }: DataTableHeaderProps) {
  return (
    <thead>
      <tr className={`bg-surface-container-highest ${className}`}>
        {children}
      </tr>
    </thead>
  );
}

function DataTableHeaderCell({
  children,
  className = "",
  sortable = false,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
}) {
  const alignClass = align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";

  return (
    <th
      className={`px-4 py-3 text-label-md font-medium uppercase tracking-wider text-on-surface-variant ${alignClass} ${className}`}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {sortable && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40">
            <path d="M3 5l3-3 3 3M3 7l3 3 3-3" />
          </svg>
        )}
      </span>
    </th>
  );
}

function DataTableBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <tbody className={className}>{children}</tbody>;
}

function DataTableRow({
  children,
  className = "",
  onClick,
  striped = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  striped?: boolean;
}) {
  return (
    <tr
      onClick={onClick}
      className={`transition-colors ${
        striped ? "even:bg-surface-container-low" : ""
      } ${onClick ? "cursor-pointer hover:bg-surface-container" : ""} ${className}`}
    >
      {children}
    </tr>
  );
}

function DataTableCell({
  children,
  className = "",
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}) {
  const alignClass = align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";

  return (
    <td className={`px-4 py-3 text-body-md text-on-surface ${alignClass} ${className}`}>
      {children}
    </td>
  );
}

function DataTablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-between border-t border-outline-variant/15 px-4 py-3">
      <p className="text-body-sm text-on-surface-variant">
        Trang {currentPage} / {totalPages}
      </p>
      <div className="flex gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-on-surface-variant transition-colors hover:bg-surface-container-high disabled:opacity-40"
          aria-label="Trang trước"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M10 4l-4 4 4 4" />
          </svg>
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-on-surface-variant transition-colors hover:bg-surface-container-high disabled:opacity-40"
          aria-label="Trang sau"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M6 4l4 4-4 4" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// --- Search/Filter bar ---
function DataTableToolbar({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 ${className}`}>
      {children}
    </div>
  );
}

function DataTableSearch({
  value,
  onChange,
  placeholder = "Tìm kiếm…",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative flex-1 max-w-sm">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
        width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      >
        <circle cx="7" cy="7" r="5" />
        <path d="M11 11l3 3" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 w-full rounded-lg bg-surface-container-highest pl-9 pr-3 text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
        spellCheck={false}
      />
    </div>
  );
}

export const DataTable = {
  Header: DataTableHeader,
  HeaderCell: DataTableHeaderCell,
  Body: DataTableBody,
  Row: DataTableRow,
  Cell: DataTableCell,
  Pagination: DataTablePagination,
  Toolbar: DataTableToolbar,
  Search: DataTableSearch,
};
