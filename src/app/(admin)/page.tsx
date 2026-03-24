import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dashboardStats, mockActivities, mockOrders, mockUsers } from "@/lib/mock-data";
import { formatVND, relativeTime } from "@/lib/formatters";
import {
  USER_STATUS_LABELS,
  ORDER_STATUS_LABELS,
} from "@/lib/constants";

// ============================================
// Dashboard — Phase 2
// ============================================

const activityIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  user_registered: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="5" r="3" /><path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      </svg>
    ),
    color: "bg-primary-fixed text-primary",
  },
  order_created: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="12" height="12" rx="2" /><path d="M5 6h6M5 8h6M5 10h3" />
      </svg>
    ),
    color: "bg-tertiary-container/20 text-tertiary-container",
  },
  order_confirmed: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M4 8l3 3 5-6" />
      </svg>
    ),
    color: "bg-secondary-fixed/30 text-secondary",
  },
  withdrawal_request: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="12" height="10" rx="2" /><path d="M2 7h12" />
      </svg>
    ),
    color: "bg-error-container/30 text-error",
  },
  user_activated: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="8" cy="8" r="6" /><path d="M5.5 8l2 2 3-4" />
      </svg>
    ),
    color: "bg-secondary-fixed/30 text-secondary",
  },
};

export default function DashboardPage() {
  const stats = [
    {
      label: "User Active",
      value: dashboardStats.totalActiveUsers,
      suffix: "người",
      href: "/users",
      color: "text-secondary",
      bg: "bg-secondary-fixed/20",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="6" r="3" /><path d="M2 17c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="15" cy="6" r="2" /><path d="M14 11c1.7 0 3.2.8 4 2" />
        </svg>
      ),
    },
    {
      label: "Đơn hàng chờ duyệt",
      value: dashboardStats.pendingOrders,
      suffix: "đơn",
      href: "/orders",
      color: "text-tertiary-container",
      bg: "bg-tertiary-container/10",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="2" width="14" height="16" rx="2" /><path d="M7 6h6M7 10h6M7 14h3" />
        </svg>
      ),
    },
    {
      label: "Doanh số tháng",
      value: formatVND(dashboardStats.monthlyRevenue),
      href: "/commission",
      color: "text-primary",
      bg: "bg-primary-fixed/20",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 5l4-3 4 3 4-3 4 3v11l-4 3-4-3-4 3-4-3z" /><path d="M6 9h8M6 12h5" />
        </svg>
      ),
    },
    {
      label: "Lệnh rút chờ duyệt",
      value: dashboardStats.pendingWithdrawals,
      suffix: "lệnh",
      href: "/finance",
      color: "text-error",
      bg: "bg-error-container/20",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="16" height="12" rx="2" /><path d="M2 8h16" /><path d="M6 12h2" />
        </svg>
      ),
    },
  ];

  // Pending users for quick action
  const pendingUsers = mockUsers.filter(
    (u) => u.status === "NEW" || u.status === "PENDING_APPROVAL" || u.status === "PENDING_PLACEMENT"
  );
  const pendingOrders = mockOrders.filter((o) => o.status === "PENDING_ADMIN");

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-headline-sm text-on-surface">Tổng quan</h1>
        <p className="text-body-md text-on-surface-variant mt-1">
          Xin chào, Admin! Đây là tình hình hệ thống hôm nay.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card.Root className="transition-shadow hover:shadow-whisper-lg h-full">
              <Card.Body className="!pt-5 h-full flex flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-label-md text-on-surface-variant font-medium">{stat.label}</p>
                    <p className={`mt-2 tabular-nums font-bold truncate ${stat.color} text-headline-md`}>
                      {stat.value}
                    </p>
                    <p className="text-body-sm text-on-surface-variant mt-1 h-5">
                      {stat.suffix || ""}
                    </p>
                  </div>
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${stat.bg} shadow-sm border border-white/10`}>
                    <span className={stat.color}>{stat.icon}</span>
                  </div>
                </div>
              </Card.Body>
            </Card.Root>
          </Link>
        ))}
      </div>

      {/* Quick Actions + Activity */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Quick Actions — 2/3 width */}
        <div className="xl:col-span-2 space-y-6">
          {/* Pending Users */}
          {pendingUsers.length > 0 && (
            <Card.Root>
              <Card.Header>
                <h2 className="text-title-md text-on-surface">User chờ xử lý</h2>
                <Link href="/users">
                  <Button variant="ghost" size="sm">Xem tất cả</Button>
                </Link>
              </Card.Header>
              <Card.Body>
                <div className="space-y-3">
                  {pendingUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between rounded-lg bg-surface-container-low p-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-fixed text-sm font-semibold text-primary">
                          {user.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-title-sm text-on-surface">{user.name}</p>
                          <p className="text-body-sm text-on-surface-variant">{user.sponsorCode}</p>
                        </div>
                      </div>
                      <Badge
                        variant={user.status === "PENDING_APPROVAL" ? "warning" : "info"}
                      >
                        {USER_STATUS_LABELS[user.status]}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card.Root>
          )}

          {/* Pending Orders */}
          {pendingOrders.length > 0 && (
            <Card.Root>
              <Card.Header>
                <h2 className="text-title-md text-on-surface">Đơn hàng chờ xác nhận</h2>
                <Link href="/orders">
                  <Button variant="ghost" size="sm">Xem tất cả</Button>
                </Link>
              </Card.Header>
              <Card.Body>
                <div className="space-y-3">
                  {pendingOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between rounded-lg bg-surface-container-low p-3"
                    >
                      <div className="min-w-0">
                        <p className="text-title-sm text-on-surface">{order.userName}</p>
                        <p className="text-body-sm text-on-surface-variant">
                          {order.quantity} × {order.productName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="tabular-nums text-title-sm text-on-surface">
                          {formatVND(order.totalAmount)}
                        </p>
                        <Badge variant="warning">
                          {ORDER_STATUS_LABELS[order.status]}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card.Root>
          )}
        </div>

        {/* Activity Feed — 1/3 width */}
        <div>
          <Card.Root>
            <Card.Header>
              <h2 className="text-title-md text-on-surface">Hoạt động gần đây</h2>
            </Card.Header>
            <Card.Body>
              <div className="space-y-4">
                {mockActivities.map((activity) => {
                  const actIco = activityIcons[activity.type] ?? activityIcons.user_registered;
                  return (
                    <div key={activity.id} className="flex gap-3">
                      <div
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${actIco.color}`}
                      >
                        {actIco.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-body-sm text-on-surface leading-snug">
                          {activity.description}
                        </p>
                        <p className="text-label-sm text-on-surface-variant mt-0.5">
                          {relativeTime(activity.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card.Body>
          </Card.Root>
        </div>
      </div>
    </div>
  );
}
