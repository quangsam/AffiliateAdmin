"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { Sidebar } from "@/components/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Mock logout logic
    router.push("/login");
  };

  return (
    <AdminShell.Provider>
      <AdminShell.Sidebar>
        <Sidebar />
      </AdminShell.Sidebar>

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminShell.Header>
          <AdminShell.MenuButton />
          {/* Spacer for right side elements */}
          <div className="flex-1" />
          
          {/* Notification + Profile area */}
          <div className="flex items-center gap-2">
            <button
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high"
              aria-label="Thông báo"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2a5 5 0 015 5c0 4 2 5 2 5H3s2-1 2-5a5 5 0 015-5" />
                <path d="M8.5 17a1.5 1.5 0 003 0" />
              </svg>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-outline-variant/20 mx-1" />

            {/* Admin Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex items-center gap-3 rounded-xl p-1.5 transition-colors group ${
                  profileOpen ? "bg-surface-container-high" : "hover:bg-surface-container-high"
                }`}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-on-secondary shadow-sm">
                  A
                </div>
                <div className="hidden min-w-0 text-left sm:block">
                  <p className="truncate text-title-sm font-semibold text-on-surface leading-tight">Admin</p>
                  <p className="truncate text-label-sm text-on-surface-variant">admin@coedu.vn</p>
                </div>
                <svg 
                  className={`ml-1 text-on-surface-variant transition-transform ${profileOpen ? "rotate-180" : "group-hover:translate-y-0.5"}`} 
                  width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl bg-surface-container-lowest border border-outline-variant/15 shadow-whisper-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-outline-variant/10 sm:hidden">
                    <p className="text-title-sm font-semibold text-on-surface">Admin</p>
                    <p className="text-label-sm text-on-surface-variant">admin@coedu.vn</p>
                  </div>
                  <div className="p-1.5">
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-label-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface text-left">
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 12a4 4 0 100-8 4 4 0 000 8z" /><path d="M2.5 17c0-2.8 2.2-5 5-5h5c2.8 0 5 2.2 5 5" />
                      </svg>
                      Cài đặt tài khoản
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-label-lg text-error transition-colors hover:bg-error-container/10 text-left"
                    >
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 3h3a2 2 0 012 2v10a2 2 0 01-2 2h-3M7 10h8M10 6l-3 4 3 4" />
                      </svg>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </AdminShell.Header>

        <AdminShell.Content>{children}</AdminShell.Content>
      </div>
    </AdminShell.Provider>
  );
}
