"use client";

// ============================================
// Finance Page — Phase 6
// Withdrawal requests management
// ============================================

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { mockWithdrawals, mockUsers } from "@/lib/mock-data";
import { formatVND, formatDate } from "@/lib/formatters";
import { MIN_WITHDRAWAL_AMOUNT } from "@/lib/constants";

const statusVariant: Record<string, "default" | "success" | "warning" | "error"> = {
  PENDING: "warning",
  APPROVED: "success",
  REJECTED: "error",
};

const statusLabels: Record<string, string> = {
  PENDING: "Chờ duyệt",
  APPROVED: "Đã duyệt",
  REJECTED: "Từ chối",
};

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState("all");

  const totalPending = mockWithdrawals
    .filter((w) => w.status === "PENDING")
    .reduce((sum, w) => sum + w.amount, 0);
  const totalApproved = mockWithdrawals
    .filter((w) => w.status === "APPROVED")
    .reduce((sum, w) => sum + w.amount, 0);
  const totalCommission = mockUsers
    .reduce((sum, u) => sum + u.commissionWallet, 0);

  const filtered = useMemo(() => {
    if (activeTab === "all") return mockWithdrawals;
    return mockWithdrawals.filter((w) => w.status === activeTab);
  }, [activeTab]);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-headline-sm text-on-surface">Quản lý Tài chính</h1>
        <p className="text-body-md text-on-surface-variant mt-1">
          Hạn mức rút tối thiểu: {formatVND(MIN_WITHDRAWAL_AMOUNT)}
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card.Root>
          <Card.Body className="!pt-5">
            <p className="text-label-md text-on-surface-variant">Tổng hoa hồng trong hệ thống</p>
            <p className="mt-2 text-display-md tabular-nums font-semibold text-primary">
              {formatVND(totalCommission)}
            </p>
          </Card.Body>
        </Card.Root>
        <Card.Root>
          <Card.Body className="!pt-5">
            <p className="text-label-md text-on-surface-variant">Đang chờ duyệt rút</p>
            <p className="mt-2 text-display-md tabular-nums font-semibold text-tertiary-container">
              {formatVND(totalPending)}
            </p>
          </Card.Body>
        </Card.Root>
        <Card.Root>
          <Card.Body className="!pt-5">
            <p className="text-label-md text-on-surface-variant">Đã thanh toán</p>
            <p className="mt-2 text-display-md tabular-nums font-semibold text-secondary">
              {formatVND(totalApproved)}
            </p>
          </Card.Body>
        </Card.Root>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2">
        {[{ id: "all", label: "Tất cả" }, { id: "PENDING", label: "Chờ duyệt" }, { id: "APPROVED", label: "Đã duyệt" }, { id: "REJECTED", label: "Từ chối" }].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-3 py-1.5 text-label-lg transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-on-primary"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Withdrawals Table */}
      <Card.Root>
        <div className="overflow-x-auto">
          <table className="w-full">
            <DataTable.Header>
              <DataTable.HeaderCell>Người yêu cầu</DataTable.HeaderCell>
              <DataTable.HeaderCell align="right">Số tiền</DataTable.HeaderCell>
              <DataTable.HeaderCell>Ngân hàng</DataTable.HeaderCell>
              <DataTable.HeaderCell>STK</DataTable.HeaderCell>
              <DataTable.HeaderCell>Trạng thái</DataTable.HeaderCell>
              <DataTable.HeaderCell>Ngày tạo</DataTable.HeaderCell>
              <DataTable.HeaderCell align="center">Thao tác</DataTable.HeaderCell>
            </DataTable.Header>
            <DataTable.Body>
              {filtered.map((w) => (
                <DataTable.Row key={w.id} striped>
                  <DataTable.Cell>
                    <span className="text-title-sm">{w.userName}</span>
                  </DataTable.Cell>
                  <DataTable.Cell align="right">
                    <span className="tabular-nums text-title-sm font-medium text-primary">
                      {formatVND(w.amount)}
                    </span>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <span className="text-body-sm">{w.bankName}</span>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <span className="font-mono text-body-sm">{w.bankAccount}</span>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Badge variant={statusVariant[w.status]}>
                      {statusLabels[w.status]}
                    </Badge>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <span className="text-body-sm text-on-surface-variant">
                      {formatDate(w.createdAt)}
                    </span>
                  </DataTable.Cell>
                  <DataTable.Cell align="center">
                    {w.status === "PENDING" ? (
                      <div className="flex justify-center gap-1">
                        <Button variant="primary" size="sm">Duyệt</Button>
                        <Button variant="ghost" size="sm">Từ chối</Button>
                      </div>
                    ) : (
                      <span className="text-body-sm text-on-surface-variant">—</span>
                    )}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </table>
        </div>
      </Card.Root>
    </div>
  );
}
