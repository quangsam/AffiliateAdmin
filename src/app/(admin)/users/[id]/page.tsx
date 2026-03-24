"use client";

// ============================================
// User Detail Page — Phase 3
// Tabs: Info, Orders, Wallet, Downline
// Admin Actions: Approve/Reject/Block
// ============================================

import { use } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { mockUsers, mockOrders } from "@/lib/mock-data";
import { formatVND, formatDate, formatPhone } from "@/lib/formatters";
import { USER_STATUS_LABELS, ORDER_STATUS_LABELS, type UserStatus } from "@/lib/constants";

const statusToBadgeVariant: Record<UserStatus, "default" | "success" | "warning" | "error" | "info"> = {
  NEW: "warning",
  PENDING_PLACEMENT: "warning",
  PENDING_APPROVAL: "warning",
  ACTIVE: "success",
  BLOCKED: "error",
};

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-body-lg text-on-surface-variant">Không tìm thấy người dùng</p>
      </div>
    );
  }

  const userOrders = mockOrders.filter((o) => o.userId === user.id);
  const directTeam = mockUsers.filter((u) => u.sponsorCode === user.name.toLowerCase().replace(/\s/g, "."));

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-body-sm text-on-surface-variant">
        <Link href="/users" className="hover:text-primary">Người dùng</Link>
        <span>/</span>
        <span className="text-on-surface">{user.name}</span>
      </nav>

      {/* User Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-fixed text-2xl font-bold text-primary">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-headline-sm text-on-surface">{user.name}</h1>
            <div className="mt-1 flex items-center gap-3">
              <Badge variant={statusToBadgeVariant[user.status]}>
                {USER_STATUS_LABELS[user.status]}
              </Badge>
              {user.rank && (
                <span className="text-body-sm text-on-surface-variant">{user.rank}</span>
              )}
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="flex gap-2">
          {(user.status === "NEW" || user.status === "PENDING_PLACEMENT" || user.status === "PENDING_APPROVAL") && (
            <>
              <Button variant="primary" size="sm">Duyệt kích hoạt</Button>
              <Button variant="danger" size="sm">Từ chối</Button>
            </>
          )}
          {user.status === "ACTIVE" && (
            <Button variant="danger" size="sm">Khóa tài khoản</Button>
          )}
          {user.status === "BLOCKED" && (
            <Button variant="secondary" size="sm">Mở khóa</Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs.Root defaultTab="info">
        <Tabs.List>
          <Tabs.Trigger id="info">Thông tin</Tabs.Trigger>
          <Tabs.Trigger id="orders" count={userOrders.length}>Đơn hàng</Tabs.Trigger>
          <Tabs.Trigger id="wallet">Ví tiền</Tabs.Trigger>
          <Tabs.Trigger id="downline" count={directTeam.length}>Tuyến dưới</Tabs.Trigger>
        </Tabs.List>

        {/* Tab: Info */}
        <Tabs.Panel id="info" className="py-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card.Root>
              <Card.Header>
                <h3 className="text-title-md">Thông tin liên hệ</h3>
              </Card.Header>
              <Card.Body>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-body-sm text-on-surface-variant">Email</dt>
                    <dd className="text-body-sm text-on-surface">{user.email}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-body-sm text-on-surface-variant">Số điện thoại</dt>
                    <dd className="text-body-sm text-on-surface">{formatPhone(user.phone)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-body-sm text-on-surface-variant">Mã bảo trợ</dt>
                    <dd className="text-body-sm text-primary font-medium">{user.sponsorCode}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-body-sm text-on-surface-variant">Ngày đăng ký</dt>
                    <dd className="text-body-sm text-on-surface">{formatDate(user.createdAt)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-body-sm text-on-surface-variant">Gói đăng ký</dt>
                    <dd className="text-body-sm text-on-surface">{user.rank || "Chưa chọn gói"}</dd>
                  </div>
                </dl>
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Header>
                <h3 className="text-title-md">Xác minh</h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-4">
                  <div>
                    <p className="text-label-md text-on-surface-variant mb-2">Ảnh CCCD</p>
                    {user.cccdImage ? (
                      <div className="rounded-lg bg-surface-container-low p-2">
                        <img src={user.cccdImage} alt="CCCD" className="rounded-md" width={240} height={160} />
                      </div>
                    ) : (
                      <div className="flex h-32 items-center justify-center rounded-lg bg-surface-container-low">
                        <p className="text-body-sm text-on-surface-variant">Chưa tải lên</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card.Root>
          </div>
        </Tabs.Panel>

        {/* Tab: Orders */}
        <Tabs.Panel id="orders" className="py-6">
          <Card.Root>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-surface-container-highest">
                    <th className="px-4 py-3 text-left text-label-md font-medium uppercase tracking-wider text-on-surface-variant">Mã đơn</th>
                    <th className="px-4 py-3 text-left text-label-md font-medium uppercase tracking-wider text-on-surface-variant">Sản phẩm</th>
                    <th className="px-4 py-3 text-right text-label-md font-medium uppercase tracking-wider text-on-surface-variant">SL</th>
                    <th className="px-4 py-3 text-right text-label-md font-medium uppercase tracking-wider text-on-surface-variant">Tổng tiền</th>
                    <th className="px-4 py-3 text-left text-label-md font-medium uppercase tracking-wider text-on-surface-variant">Trạng thái</th>
                    <th className="px-4 py-3 text-left text-label-md font-medium uppercase tracking-wider text-on-surface-variant">Ngày</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-body-md text-on-surface-variant">
                        Chưa có đơn hàng nào
                      </td>
                    </tr>
                  ) : (
                    userOrders.map((order) => (
                      <tr key={order.id} className="even:bg-surface-container-low">
                        <td className="px-4 py-3">
                          <Link 
                            href={`/orders/${order.id}`} 
                            className="font-mono text-body-sm text-primary font-medium hover:underline flex items-center gap-1 group/link"
                          >
                            {order.id}
                            <svg className="opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M6 12l4-4-4-4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-body-sm text-on-surface">{order.productName}</td>
                        <td className="px-4 py-3 text-right text-body-sm tabular-nums text-on-surface">{order.quantity}</td>
                        <td className="px-4 py-3 text-right text-title-sm tabular-nums text-on-surface">{formatVND(order.totalAmount)}</td>
                        <td className="px-4 py-3">
                          <Badge variant={order.status === "COMPLETED" ? "success" : order.status === "REJECTED" ? "error" : "warning"}>
                            {ORDER_STATUS_LABELS[order.status]}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-body-sm text-on-surface-variant">{formatDate(order.createdAt)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card.Root>
        </Tabs.Panel>

        {/* Tab: Wallet */}
        <Tabs.Panel id="wallet" className="py-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Card.Root>
              <Card.Body className="!pt-5">
                <p className="text-label-md text-on-surface-variant">Ví Điểm Thưởng</p>
                <p className="mt-2 text-display-md tabular-nums font-semibold text-secondary">
                  {formatVND(user.rewardWallet)}
                </p>
                <p className="text-body-sm text-on-surface-variant mt-1">Dùng để order hàng hóa</p>
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Body className="!pt-5">
                <p className="text-label-md text-on-surface-variant">Ví Hoa Hồng</p>
                <p className="mt-2 text-display-md tabular-nums font-semibold text-primary">
                  {formatVND(user.commissionWallet)}
                </p>
                <p className="text-body-sm text-on-surface-variant mt-1">Dùng để rút tiền về ngân hàng</p>
              </Card.Body>
            </Card.Root>
          </div>
        </Tabs.Panel>

        {/* Tab: Downline */}
        <Tabs.Panel id="downline" className="py-6">
          <Card.Root>
            <Card.Header>
              <h3 className="text-title-md">
                Tuyến dưới trực hệ ({user.directTeamCount} người)
              </h3>
            </Card.Header>
            <Card.Body>
              {directTeam.length === 0 ? (
                <p className="text-body-md text-on-surface-variant py-8 text-center">
                  Chưa có tuyến dưới trực hệ
                </p>
              ) : (
                <div className="space-y-3">
                  {directTeam.map((member) => (
                    <Link
                      key={member.id}
                      href={`/users/${member.id}`}
                      className="flex items-center justify-between rounded-lg bg-surface-container-low p-3 transition-colors hover:bg-surface-container"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-fixed text-sm font-semibold text-primary">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-title-sm text-on-surface">{member.name}</p>
                          <p className="text-body-sm text-on-surface-variant">{member.rank || "Mới"}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="tabular-nums text-title-sm">{formatVND(member.totalRevenue)}</p>
                        <Badge variant={statusToBadgeVariant[member.status]} className="mt-1">
                          {USER_STATUS_LABELS[member.status]}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card.Root>
        </Tabs.Panel>
      </Tabs.Root>
    </div>
  );
}
