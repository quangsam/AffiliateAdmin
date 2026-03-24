"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_ITEMS } from "@/lib/constants";

// ============================================
// Sidebar Navigation Component
// ============================================

// SVG Icons — inlined to avoid barrel imports (vercel-react-best-practices)
const icons: Record<string, React.ReactNode> = {
  dashboard: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="7" height="8" rx="1.5" />
      <rect x="11" y="2" width="7" height="5" rx="1.5" />
      <rect x="2" y="12" width="7" height="6" rx="1.5" />
      <rect x="11" y="9" width="7" height="9" rx="1.5" />
    </svg>
  ),
  users: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="6" r="3" />
      <path d="M2 17c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="15" cy="6" r="2" />
      <path d="M14 11c1.7 0 3.2.8 4 2" />
    </svg>
  ),
  tree: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="3" r="2" />
      <circle cx="5" cy="11" r="2" />
      <circle cx="15" cy="11" r="2" />
      <path d="M10 5v2M10 7l-5 4M10 7l5 4" />
      <path d="M5 13v2M15 13v2" />
    </svg>
  ),
  products: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6l8-4 8 4-8 4-8-4z" />
      <path d="M2 10l8 4 8-4" />
      <path d="M2 14l8 4 8-4" />
    </svg>
  ),
  orders: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="2" width="14" height="16" rx="2" />
      <path d="M7 6h6M7 10h6M7 14h3" />
    </svg>
  ),
  finance: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="16" height="12" rx="2" />
      <path d="M2 8h16" />
      <path d="M6 12h2" />
    </svg>
  ),
  commission: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v8M8 8h4c.6 0 1 .4 1 1s-.4 1-1 1H8M8 10h4c.6 0 1 .4 1 1s-.4 1-1 1H8" />
    </svg>
  ),
  network: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="3" r="2" />
      <circle cx="4" cy="10" r="2" />
      <circle cx="16" cy="10" r="2" />
      <circle cx="4" cy="17" r="2" />
      <circle cx="16" cy="17" r="2" />
      <path d="M10 5v1.5M10 6.5L4 8M10 6.5l6 1.5M4 12v3M16 12v3" />
    </svg>
  ),
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Logo area */}
      <div className="flex h-16 items-center gap-3 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
          <span className="text-sm font-bold text-white">N</span>
        </div>
        <div>
          <p className="text-title-sm text-on-surface">NTD Affiliate</p>
          <p className="text-label-sm text-on-surface-variant">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {ADMIN_NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-label-lg transition-colors ${
                    isActive
                      ? "bg-primary-fixed text-primary font-semibold"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  <span className={isActive ? "text-primary" : "text-on-surface-variant"}>
                    {icons[item.icon]}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
