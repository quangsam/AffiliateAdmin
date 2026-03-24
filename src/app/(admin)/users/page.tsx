"use client";

// ============================================
// User List Page — Phase 3
// ============================================

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Tabs } from "@/components/ui/tabs";
import { mockUsers } from "@/lib/mock-data";
import { formatVND, formatDate, formatPhone } from "@/lib/formatters";
import {
  USER_STATUS,
  USER_STATUS_LABELS,
  type UserStatus,
} from "@/lib/constants";

const statusToBadgeVariant: Record<UserStatus, "default" | "success" | "warning" | "error" | "info"> = {
  NEW: "warning",
  PENDING_PLACEMENT: "warning",
  PENDING_APPROVAL: "warning",
  ACTIVE: "success",
  BLOCKED: "error",
};

const statusTabs = [
  { id: "all", label: "Tất cả" },
  { id: "pending", label: "Chờ duyệt" },
  { id: "active", label: "Đã kích hoạt" },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const filtered = useMemo(() => {
    return mockUsers.filter((u) => {
      let matchStatus = true;
      if (activeTab === "pending") {
        matchStatus = u.status === "NEW" || u.status === "PENDING_PLACEMENT" || u.status === "PENDING_APPROVAL";
      } else if (activeTab === "active") {
        matchStatus = u.status === "ACTIVE";
      }
      
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q);
      return matchStatus && matchSearch;
    });
  }, [search, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-headline-sm text-on-surface">Quản lý Người dùng</h1>
        <p className="text-body-md text-on-surface-variant mt-1">
          Tổng cộng {mockUsers.length} người dùng trong hệ thống
        </p>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        {statusTabs.map((tab) => {
          let count = mockUsers.length;
          if (tab.id === "pending") {
            count = mockUsers.filter((u) => u.status === "NEW" || u.status === "PENDING_PLACEMENT" || u.status === "PENDING_APPROVAL").length;
          } else if (tab.id === "active") {
            count = mockUsers.filter((u) => u.status === "ACTIVE").length;
          }
          
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
            placeholder="Tìm theo tên, email, SĐT…"
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
              <DataTable.HeaderCell>Tên</DataTable.HeaderCell>
              <DataTable.HeaderCell>Liên hệ</DataTable.HeaderCell>
              <DataTable.HeaderCell>Người bảo trợ</DataTable.HeaderCell>
              <DataTable.HeaderCell>Gói</DataTable.HeaderCell>
              <DataTable.HeaderCell align="right">Doanh số</DataTable.HeaderCell>
              <DataTable.HeaderCell>Trạng thái</DataTable.HeaderCell>
              <DataTable.HeaderCell>Ngày tạo</DataTable.HeaderCell>
            </DataTable.Header>
            <DataTable.Body>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-body-md text-on-surface-variant">
                    Không tìm thấy người dùng nào
                  </td>
                </tr>
              ) : (
                paginated.map((user) => (
                  <DataTable.Row key={user.id} striped>
                    <DataTable.Cell>
                      <Link
                        href={`/users/${user.id}`}
                        className="flex items-center gap-3 hover:text-primary"
                      >
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary-fixed text-sm font-semibold text-primary">
                          {user.name.charAt(0)}
                        </div>
                        <span className="truncate text-title-sm">{user.name}</span>
                      </Link>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <div>
                        <p className="text-body-sm">{user.email}</p>
                        <p className="text-label-sm text-on-surface-variant">
                          {formatPhone(user.phone)}
                        </p>
                      </div>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <span className="text-body-sm text-on-surface-variant">{user.sponsorCode}</span>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <span className="text-body-sm">{user.rank || "—"}</span>
                    </DataTable.Cell>
                    <DataTable.Cell align="right">
                      <span className="tabular-nums text-title-sm">
                        {user.totalRevenue > 0 ? formatVND(user.totalRevenue) : "—"}
                      </span>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Badge variant={statusToBadgeVariant[user.status]}>
                        {USER_STATUS_LABELS[user.status]}
                      </Badge>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <span className="text-body-sm text-on-surface-variant">
                        {formatDate(user.createdAt)}
                      </span>
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
