"use client";

// ============================================
// Order List — Phase 5
// ============================================

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { mockOrders } from "@/lib/mock-data";
import { formatVND, formatDate } from "@/lib/formatters";
import { ORDER_STATUS, ORDER_STATUS_LABELS, type OrderStatus } from "@/lib/constants";

const statusToBadgeVariant: Record<OrderStatus, "default" | "success" | "warning" | "error" | "info"> = {
  WAITING_PAYMENT: "info",
  PENDING_ADMIN: "warning",
  COMPLETED: "success",
  REJECTED: "error",
};

const statusTabs = [
  { id: "all", label: "Tất cả" },
  { id: ORDER_STATUS.WAITING_PAYMENT, label: ORDER_STATUS_LABELS.WAITING_PAYMENT },
  { id: ORDER_STATUS.PENDING_ADMIN, label: ORDER_STATUS_LABELS.PENDING_ADMIN },
  { id: ORDER_STATUS.COMPLETED, label: ORDER_STATUS_LABELS.COMPLETED },
  { id: ORDER_STATUS.REJECTED, label: ORDER_STATUS_LABELS.REJECTED },
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const filtered = useMemo(() => {
    return mockOrders.filter((o) => {
      const matchStatus = activeTab === "all" || o.status === activeTab;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        o.userName.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.productName.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [search, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-headline-sm text-on-surface">Quản lý Đơn hàng</h1>
        <p className="text-body-md text-on-surface-variant mt-1">
          Tổng cộng {mockOrders.length} đơn hàng
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {statusTabs.slice(1).map((tab) => {
          const count = mockOrders.filter((o) => o.status === tab.id).length;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setPage(1); }}
              className={`rounded-xl p-3 text-left transition-all ${
                activeTab === tab.id
                  ? "bg-primary-fixed shadow-whisper"
                  : "bg-surface-container-lowest hover:shadow-whisper"
              }`}
            >
              <p className="text-label-md text-on-surface-variant">{tab.label}</p>
              <p className={`mt-1 text-title-lg tabular-nums ${
                activeTab === tab.id ? "text-primary" : "text-on-surface"
              }`}>
                {count}
              </p>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <Card.Root>
        <DataTable.Toolbar>
          <DataTable.Search
            value={search}
            onChange={(v) => { setSearch(v); setPage(1); }}
            placeholder="Tìm theo mã đơn, người mua, sản phẩm…"
          />
          {activeTab !== "all" && (
            <button
              onClick={() => setActiveTab("all")}
              className="text-label-md text-primary hover:underline"
            >
              Xóa bộ lọc
            </button>
          )}
        </DataTable.Toolbar>

        <div className="overflow-x-auto">
          <table className="w-full">
            <DataTable.Header>
              <DataTable.HeaderCell>Mã đơn</DataTable.HeaderCell>
              <DataTable.HeaderCell>Người mua</DataTable.HeaderCell>
              <DataTable.HeaderCell>Sản phẩm</DataTable.HeaderCell>
              <DataTable.HeaderCell align="center">SL</DataTable.HeaderCell>
              <DataTable.HeaderCell align="right">Tổng tiền</DataTable.HeaderCell>
              <DataTable.HeaderCell>Trạng thái</DataTable.HeaderCell>
              <DataTable.HeaderCell>Ngày tạo</DataTable.HeaderCell>
              <DataTable.HeaderCell align="right">Thao tác</DataTable.HeaderCell>
            </DataTable.Header>
            <DataTable.Body>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-body-md text-on-surface-variant">
                    Không tìm thấy đơn hàng nào
                  </td>
                </tr>
              ) : (
                paginated.map((order) => (
                  <DataTable.Row key={order.id} striped>
                    <DataTable.Cell>
                      <Link 
                        href={`/orders/${order.id}`} 
                        className="font-mono text-body-sm text-primary font-medium hover:underline flex items-center gap-1 group/link"
                      >
                        {order.id}
                        <svg className="opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 12l4-4-4-4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Link href={`/users/${order.userId}`} className="text-title-sm hover:text-primary">
                        {order.userName}
                      </Link>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <span className="text-body-sm">{order.productName}</span>
                    </DataTable.Cell>
                    <DataTable.Cell align="center">
                      <span className="tabular-nums">{order.quantity}</span>
                    </DataTable.Cell>
                    <DataTable.Cell align="right">
                      <span className="tabular-nums text-title-sm font-medium">
                        {formatVND(order.totalAmount)}
                      </span>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Badge variant={statusToBadgeVariant[order.status]}>
                        {ORDER_STATUS_LABELS[order.status]}
                      </Badge>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <span className="text-body-sm text-on-surface-variant">
                        {formatDate(order.createdAt)}
                      </span>
                    </DataTable.Cell>
                    <DataTable.Cell align="right">
                      {order.status === "PENDING_ADMIN" && (
                        <Button size="sm" variant="primary">Duyệt nhanh</Button>
                      )}
                    </DataTable.Cell>
                  </DataTable.Row>
                ))
              )}
            </DataTable.Body>
          </table>
        </div>

        <DataTable.Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </Card.Root>
    </div>
  );
}
