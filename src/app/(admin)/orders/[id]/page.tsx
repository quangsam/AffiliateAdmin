"use client";

// ============================================
// Order Detail — Phase 5
// Shows receipt, VAT breakdown, admin actions
// ============================================

import { use } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockOrders } from "@/lib/mock-data";
import { formatVND, formatDate } from "@/lib/formatters";
import { ORDER_STATUS_LABELS, VAT_RATE, type OrderStatus } from "@/lib/constants";

const statusToBadgeVariant: Record<OrderStatus, "default" | "success" | "warning" | "error" | "info"> = {
  WAITING_PAYMENT: "info",
  PENDING_ADMIN: "warning",
  COMPLETED: "success",
  REJECTED: "error",
};

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const order = mockOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-body-lg text-on-surface-variant">Không tìm thấy đơn hàng</p>
      </div>
    );
  }

  const subtotal = order.unitPrice * order.quantity;
  const vatAmount = Math.floor(subtotal * VAT_RATE);
  const total = subtotal + vatAmount;

  // Commission preview
  const commissionF1 = Math.floor(subtotal * 0.1);
  const commissionF2 = Math.floor(subtotal * 0.03);
  const commissionF3 = Math.floor(subtotal * 0.02);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-body-sm text-on-surface-variant">
        <Link href="/orders" className="hover:text-primary">Đơn hàng</Link>
        <span>/</span>
        <span className="text-on-surface font-mono">{order.id}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-headline-sm text-on-surface">
            Chi tiết đơn hàng
          </h1>
          <div className="mt-2 flex items-center gap-3">
            <span className="font-mono text-body-md text-on-surface-variant">{order.id}</span>
            <Badge variant={statusToBadgeVariant[order.status]}>
              {ORDER_STATUS_LABELS[order.status]}
            </Badge>
          </div>
        </div>

        {/* Admin Actions */}
        {order.status === "PENDING_ADMIN" && (
          <div className="flex gap-2">
            <Button variant="primary" size="sm">Xác nhận đã nhận tiền</Button>
            <Button variant="danger" size="sm">Từ chối</Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Order Info — 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <Card.Root>
            <Card.Header>
              <h3 className="text-title-md">Thông tin người mua</h3>
            </Card.Header>
            <Card.Body>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-fixed text-lg font-bold text-primary">
                  {order.userName.charAt(0)}
                </div>
                <div>
                  <Link href={`/users/${order.userId}`} className="text-title-sm text-primary hover:underline">
                    {order.userName}
                  </Link>
                  <p className="text-body-sm text-on-surface-variant">
                    Ngày đặt: {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card.Root>

          {/* Products */}
          <Card.Root>
            <Card.Header>
              <h3 className="text-title-md">Sản phẩm</h3>
            </Card.Header>
            <Card.Body>
              <div className="rounded-lg bg-surface-container-low p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-title-sm text-on-surface">{order.productName}</p>
                    <p className="text-body-sm text-on-surface-variant mt-0.5">
                      Đơn giá (chưa VAT): {formatVND(order.unitPrice)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-body-sm text-on-surface-variant">Số lượng</p>
                    <p className="text-title-lg tabular-nums text-on-surface">{order.quantity}</p>
                  </div>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-body-md">
                  <span className="text-on-surface-variant">Tiền hàng ({order.quantity} × {formatVND(order.unitPrice)})</span>
                  <span className="tabular-nums text-on-surface">{formatVND(subtotal)}</span>
                </div>
                <div className="flex justify-between text-body-md">
                  <span className="text-on-surface-variant">Thuế VAT ({VAT_RATE * 100}%)</span>
                  <span className="tabular-nums text-on-surface">+{formatVND(vatAmount)}</span>
                </div>
                <div className="flex justify-between border-t border-outline-variant/15 pt-3">
                  <span className="text-title-md text-on-surface">Tổng thanh toán</span>
                  <span className="tabular-nums text-title-lg text-primary font-bold">
                    {formatVND(total)}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card.Root>

          {/* Receipt */}
          <Card.Root>
            <Card.Header>
              <h3 className="text-title-md">Biên lai chuyển khoản</h3>
            </Card.Header>
            <Card.Body>
              {order.receiptImage ? (
                <img src={order.receiptImage} alt="Biên lai" className="rounded-lg" width={400} height={300} />
              ) : (
                <div className="flex h-48 items-center justify-center rounded-lg bg-surface-container-low">
                  <div className="text-center">
                    <svg className="mx-auto text-on-surface-variant/40" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="8" y="4" width="32" height="40" rx="4" />
                      <path d="M16 16h16M16 24h16M16 32h8" />
                    </svg>
                    <p className="text-body-sm text-on-surface-variant mt-2">Chưa có biên lai</p>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card.Root>
        </div>

        {/* Preview Commissions — 1/3 */}
        <div>
          <Card.Root>
            <Card.Header>
              <h3 className="text-title-md">Hoa hồng dự kiến</h3>
            </Card.Header>
            <Card.Body>
              <p className="text-body-sm text-on-surface-variant mb-4">
                Khi xác nhận đơn hàng, hoa hồng sẽ được phân phối cho tuyến trên:
              </p>
              <div className="space-y-3">
                <div className="flex justify-between rounded-lg bg-surface-container-low p-3">
                  <div>
                    <p className="text-title-sm text-on-surface">F1 (10%)</p>
                    <p className="text-label-sm text-on-surface-variant">Bảo trợ trực tiếp</p>
                  </div>
                  <span className="tabular-nums text-title-sm text-secondary font-semibold">
                    {formatVND(commissionF1)}
                  </span>
                </div>
                <div className="flex justify-between rounded-lg bg-surface-container-low p-3">
                  <div>
                    <p className="text-title-sm text-on-surface">F2 (3%)</p>
                    <p className="text-label-sm text-on-surface-variant">Tuyến 2</p>
                  </div>
                  <span className="tabular-nums text-title-sm text-secondary font-semibold">
                    {formatVND(commissionF2)}
                  </span>
                </div>
                <div className="flex justify-between rounded-lg bg-surface-container-low p-3">
                  <div>
                    <p className="text-title-sm text-on-surface">F3 (2%)</p>
                    <p className="text-label-sm text-on-surface-variant">Tuyến 3</p>
                  </div>
                  <span className="tabular-nums text-title-sm text-secondary font-semibold">
                    {formatVND(commissionF3)}
                  </span>
                </div>
                <div className="mt-2 flex justify-between border-t border-outline-variant/15 pt-3">
                  <span className="text-title-sm text-on-surface">Tổng hoa hồng trực hệ</span>
                  <span className="tabular-nums text-title-sm text-primary font-bold">
                    {formatVND(commissionF1 + commissionF2 + commissionF3)}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card.Root>
        </div>
      </div>
    </div>
  );
}
