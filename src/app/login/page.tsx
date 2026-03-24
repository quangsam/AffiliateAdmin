"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      // Mock login always successful for now
      router.push("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-surface-container-lowest relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/20 mb-4">
            <span className="text-2xl font-bold text-white italic">N</span>
          </div>
          <h1 className="text-headline-sm font-bold text-on-surface">NTD Affiliate</h1>
          <p className="text-body-md text-on-surface-variant mt-1 italic">Hệ thống quản trị tối ưu</p>
        </div>

        <Card.Root className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-whisper-lg">
          <Card.Body className="!pt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-label-md font-medium text-on-surface-variant mb-2">
                  Email đăng nhập
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@coedu.vn"
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-body-md"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-label-md font-medium text-on-surface-variant">
                    Mật khẩu
                  </label>
                  <Link href="#" className="text-label-sm text-primary hover:underline">
                    Quên mật khẩu?
                  </Link>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-body-md"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-outline-variant/30 text-primary focus:ring-primary"
                />
                <label htmlFor="remember" className="ml-2 text-label-md text-on-surface-variant">
                  Ghi nhớ đăng nhập
                </label>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-error-container/10 text-error text-label-md border border-error/10">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                loading={loading}
                className="w-full py-6 text-title-md font-bold shadow-md shadow-primary/20"
              >
                Đăng nhập hệ thống
              </Button>
            </form>
          </Card.Body>
        </Card.Root>

        <p className="text-center mt-8 text-label-sm text-on-surface-variant font-medium">
          &copy; 2026 COEDU. All rights reserved.
        </p>
      </div>
    </div>
  );
}
