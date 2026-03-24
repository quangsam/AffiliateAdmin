"use client";

import { createContext, use, useState, useCallback } from "react";

// ============================================
// Admin Shell — Compound Component Pattern
// Ref: vercel-composition-patterns
// ============================================

interface AdminShellContextValue {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const AdminShellContext = createContext<AdminShellContextValue | null>(null);

function useAdminShell() {
  const ctx = use(AdminShellContext);
  if (!ctx) throw new Error("useAdminShell must be used within AdminShell.Provider");
  return ctx;
}

// --- Provider ---
function AdminShellProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <AdminShellContext value={{ sidebarOpen, toggleSidebar, closeSidebar }}>
      <div className="flex h-screen overflow-hidden bg-surface">{children}</div>
    </AdminShellContext>
  );
}

// --- Sidebar ---
function AdminShellSidebar({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, closeSidebar } = useAdminShell();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-on-surface/20 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-surface-container-low transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {children}
      </aside>
    </>
  );
}

// --- Header ---
function AdminShellHeader({ children }: { children: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 bg-surface-container-lowest/80 px-6 backdrop-blur-sm">
      {children}
    </header>
  );
}

// --- Menu Button (for mobile) ---
function AdminShellMenuButton() {
  const { toggleSidebar } = useAdminShell();

  return (
    <button
      onClick={toggleSidebar}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high lg:hidden"
      aria-label="Mở menu"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M3 5h14M3 10h14M3 15h14" />
      </svg>
    </button>
  );
}

// --- Content ---
function AdminShellContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 overflow-y-auto">
      {children}
    </main>
  );
}

// --- Export as Compound Component ---
export const AdminShell = {
  Provider: AdminShellProvider,
  Sidebar: AdminShellSidebar,
  Header: AdminShellHeader,
  MenuButton: AdminShellMenuButton,
  Content: AdminShellContent,
};

export { useAdminShell };
