"use client";

// ============================================
// Commission Page — Phase 7
// Direct commission, binary, connectivity
// ============================================

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { mockUsers } from "@/lib/mock-data";
import { formatVND, formatPercent } from "@/lib/formatters";
import {
  DIRECT_COMMISSION_RATES,
  BINARY_COMMISSION_RATE,
  CONNECTIVITY_BONUS_RATE,
  TDL_RANKS,
  LEADERSHIP_RANKS,
  REID_THRESHOLD,
  REID_DEDUCTION,
  PAYOUT_DEADLINE_DAY,
} from "@/lib/constants";
import Link from "next/link";

export default function CommissionPage() {
  const activeUsers = mockUsers.filter((u) => u.status === "ACTIVE");
  const totalSystemRevenue = activeUsers.reduce((sum, u) => sum + u.totalRevenue, 0);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-headline-sm text-on-surface">Hệ thống Hoa hồng</h1>
        <p className="text-body-md text-on-surface-variant mt-1">
          Chốt số trước ngày {PAYOUT_DEADLINE_DAY} hàng tháng • Tái đầu tư khi đạt {formatVND(REID_THRESHOLD)}
        </p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card.Root>
          <Card.Body className="!pt-5">
            <p className="text-label-md text-on-surface-variant">Tổng doanh số hệ thống</p>
            <p className="mt-2 text-title-lg tabular-nums font-semibold text-primary">
              {formatVND(totalSystemRevenue)}
            </p>
          </Card.Body>
        </Card.Root>
        <Card.Root>
          <Card.Body className="!pt-5">
            <p className="text-label-md text-on-surface-variant">Hoa hồng F1 ({formatPercent(DIRECT_COMMISSION_RATES.F1)})</p>
            <p className="mt-2 text-title-lg tabular-nums font-semibold text-secondary">
              {formatVND(Math.floor(totalSystemRevenue * DIRECT_COMMISSION_RATES.F1))}
            </p>
          </Card.Body>
        </Card.Root>
        <Card.Root>
          <Card.Body className="!pt-5">
            <p className="text-label-md text-on-surface-variant">HH Nhị phân ({formatPercent(BINARY_COMMISSION_RATE)})</p>
            <p className="mt-2 text-title-lg tabular-nums font-semibold text-tertiary-container">
              Nhánh yếu
            </p>
          </Card.Body>
        </Card.Root>
        <Card.Root>
          <Card.Body className="!pt-5">
            <p className="text-label-md text-on-surface-variant">HH Gắn kết ({formatPercent(CONNECTIVITY_BONUS_RATE)})</p>
            <p className="mt-2 text-title-lg tabular-nums font-semibold text-primary">
              Sponsor + F1-F5
            </p>
          </Card.Body>
        </Card.Root>
      </div>

      {/* Tabs */}
      <Tabs.Root defaultTab="direct">
        <Tabs.List>
          <Tabs.Trigger id="direct">Hoa hồng Trực hệ</Tabs.Trigger>
          <Tabs.Trigger id="ranks">Cấp bậc TĐL</Tabs.Trigger>
          <Tabs.Trigger id="leadership">Cấp Lãnh đạo</Tabs.Trigger>
          <Tabs.Trigger id="reid">Tái đầu tư</Tabs.Trigger>
        </Tabs.List>

        {/* Direct Commission */}
        <Tabs.Panel id="direct" className="py-6">
          <Card.Root>
            <Card.Header>
              <h3 className="text-title-md">Biểu phí hoa hồng trực hệ</h3>
            </Card.Header>
            <Card.Body>
              <div className="grid gap-4 sm:grid-cols-3">
                {(["F1", "F2", "F3"] as const).map((level) => (
                  <div
                    key={level}
                    className="rounded-xl bg-surface-container-low p-5 text-center"
                  >
                    <p className="text-display-md font-bold text-primary">
                      {formatPercent(DIRECT_COMMISSION_RATES[level])}
                    </p>
                    <p className="text-title-sm text-on-surface mt-2">{level}</p>
                    <p className="text-body-sm text-on-surface-variant mt-1">
                      {level === "F1" ? "Bảo trợ trực tiếp" : level === "F2" ? "Tuyến 2" : "Tuyến 3"}
                    </p>
                  </div>
                ))}
              </div>

              {/* User commission table */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-container-highest">
                      <th className="px-4 py-3 text-left text-label-md font-medium uppercase tracking-wider text-on-surface-variant">User</th>
                      <th className="px-4 py-3 text-right text-label-md font-medium uppercase tracking-wider text-on-surface-variant">Doanh số</th>
                      <th className="px-4 py-3 text-right text-label-md font-medium uppercase tracking-wider text-on-surface-variant">F1 (10%)</th>
                      <th className="px-4 py-3 text-right text-label-md font-medium uppercase tracking-wider text-on-surface-variant">F2 (3%)</th>
                      <th className="px-4 py-3 text-right text-label-md font-medium uppercase tracking-wider text-on-surface-variant">F3 (2%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeUsers.map((user) => (
                      <tr key={user.id} className="even:bg-surface-container-low">
                        <td className="px-4 py-3">
                          <Link href={`/users/${user.id}`} className="text-title-sm hover:text-primary">
                            {user.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-body-md">
                          {formatVND(user.totalRevenue)}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-body-md text-secondary">
                          {formatVND(Math.floor(user.totalRevenue * DIRECT_COMMISSION_RATES.F1))}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-body-md text-secondary">
                          {formatVND(Math.floor(user.totalRevenue * DIRECT_COMMISSION_RATES.F2))}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-body-md text-secondary">
                          {formatVND(Math.floor(user.totalRevenue * DIRECT_COMMISSION_RATES.F3))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card.Root>
        </Tabs.Panel>

        {/* TĐL Ranks */}
        <Tabs.Panel id="ranks" className="py-6">
          <div className="space-y-4">
            {TDL_RANKS.map((rank) => (
              <Card.Root key={rank.id}>
                <Card.Body className="!pt-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-title-md text-on-surface">{rank.name}</h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-body-sm text-on-surface-variant">
                          Doanh số tối thiểu: <span className="tabular-nums font-medium text-on-surface">{formatVND(rank.minRevenue)}</span> ({rank.minBoxes} hộp)
                        </p>
                        <p className="text-body-sm text-on-surface-variant">
                          Ekip trực hệ: <span className="font-medium text-on-surface">{rank.minDirectTeam} user</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-center rounded-xl bg-primary-fixed p-4">
                      <p className="text-display-md font-bold text-primary">
                        {formatPercent(rank.commissionRate)}
                      </p>
                      <p className="text-label-sm text-on-surface-variant">Hoa hồng trực hệ</p>
                    </div>
                  </div>
                </Card.Body>
              </Card.Root>
            ))}
          </div>
        </Tabs.Panel>

        {/* Leadership */}
        <Tabs.Panel id="leadership" className="py-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {LEADERSHIP_RANKS.map((rank) => (
              <Card.Root key={rank.id}>
                <Card.Body className="!pt-5">
                  <h3 className="text-title-md text-on-surface">{rank.name}</h3>
                  <p className="mt-3 text-display-md tabular-nums font-bold text-secondary">
                    {formatVND(rank.reward)}
                  </p>
                  <p className="text-body-sm text-on-surface-variant mt-1">Thưởng thăng cấp</p>
                  <div className="mt-3 rounded-lg bg-surface-container-low p-2">
                    <p className="text-label-md text-on-surface-variant">
                      {"teamShare" in rank
                        ? `+ ${formatPercent(rank.teamShare)} đồng chia đội nhóm`
                        : `+ ${formatPercent(rank.nationalShare)} đồng chia toàn quốc`}
                    </p>
                  </div>
                </Card.Body>
              </Card.Root>
            ))}
          </div>
        </Tabs.Panel>

        {/* Re-ID */}
        <Tabs.Panel id="reid" className="py-6">
          <Card.Root>
            <Card.Body className="!pt-5">
              <div className="text-center max-w-lg mx-auto py-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-tertiary-container/20 mb-4">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-tertiary-container">
                    <circle cx="16" cy="16" r="12" />
                    <path d="M12 16l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-title-lg text-on-surface">Cơ chế Tái đầu tư (Re-ID)</h3>
                <p className="text-body-md text-on-surface-variant mt-3 leading-relaxed">
                  Khi tổng thu nhập tích lũy của một User đạt <span className="font-semibold text-primary">{formatVND(REID_THRESHOLD)}</span>,
                  hệ thống tự động khấu trừ <span className="font-semibold text-tertiary-container">{formatVND(REID_DEDUCTION)}</span> (8 hộp)
                  từ thu nhập phát sinh tiếp theo để duy trì vị trí trong hệ thống.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-surface-container-low p-4">
                    <p className="text-label-md text-on-surface-variant">Ngưỡng kích hoạt</p>
                    <p className="mt-1 text-title-lg tabular-nums font-semibold text-primary">{formatVND(REID_THRESHOLD)}</p>
                  </div>
                  <div className="rounded-xl bg-surface-container-low p-4">
                    <p className="text-label-md text-on-surface-variant">Khấu trừ</p>
                    <p className="mt-1 text-title-lg tabular-nums font-semibold text-tertiary-container">{formatVND(REID_DEDUCTION)}</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card.Root>
        </Tabs.Panel>
      </Tabs.Root>
    </div>
  );
}
