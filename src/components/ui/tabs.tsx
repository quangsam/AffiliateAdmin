"use client";

// ============================================
// Tabs — Compound Component
// ============================================

import { createContext, use, useState, useCallback } from "react";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const ctx = use(TabsContext);
  if (!ctx) throw new Error("useTabs must be used within Tabs");
  return ctx;
}

function TabsRoot({
  children,
  defaultTab,
  className = "",
}: {
  children: React.ReactNode;
  defaultTab: string;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext>
  );
}

function TabsList({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={`flex gap-1 border-b border-outline-variant/15 px-4 ${className}`}
    >
      {children}
    </div>
  );
}

function TabsTrigger({
  children,
  id,
  count,
  className = "",
}: {
  children: React.ReactNode;
  id: string;
  count?: number;
  className?: string;
}) {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === id;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(id)}
      className={`relative inline-flex items-center gap-2 px-3 py-2.5 text-label-lg transition-colors ${
        isActive
          ? "text-primary font-semibold"
          : "text-on-surface-variant hover:text-on-surface"
      } ${className}`}
    >
      {children}
      {count !== undefined && (
        <span
          className={`inline-flex min-w-[20px] items-center justify-center rounded-full px-1.5 py-0.5 text-label-sm ${
            isActive
              ? "bg-primary-fixed text-primary"
              : "bg-surface-container-high text-on-surface-variant"
          }`}
        >
          {count}
        </span>
      )}
      {/* Active indicator bar */}
      {isActive && (
        <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary" />
      )}
    </button>
  );
}

function TabsPanel({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) {
  const { activeTab } = useTabs();

  if (activeTab !== id) return null;

  return (
    <div role="tabpanel" className={className}>
      {children}
    </div>
  );
}

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Panel: TabsPanel,
};
