"use client";

// ============================================
// Network Tree Page — Phase 8
// Binary tree visualization + Sponsor tree
// ============================================

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { mockUsers } from "@/lib/mock-data";
import { formatVND } from "@/lib/formatters";
import { USER_STATUS_LABELS, type UserStatus } from "@/lib/constants";

const statusToBadgeVariant: Record<UserStatus, "default" | "success" | "warning" | "error" | "info"> = {
  NEW: "default",
  PENDING_PLACEMENT: "info",
  PENDING_APPROVAL: "warning",
  ACTIVE: "success",
  BLOCKED: "error",
};

// Mock binary tree structure
interface TreeNode {
  user: typeof mockUsers[number];
  left?: TreeNode;
  right?: TreeNode;
}

// Build a simple mock tree
const rootUser = mockUsers.find((u) => u.id === "u1")!;
const f1Left = mockUsers.find((u) => u.id === "u2")!;
const f1Right = mockUsers.find((u) => u.id === "u8")!;
const f2Left = mockUsers.find((u) => u.id === "u3")!;
const f2Right = mockUsers.find((u) => u.id === "u6")!;

const mockTree: TreeNode = {
  user: rootUser,
  left: {
    user: f1Left,
    left: { user: f2Left },
    right: { user: f2Right },
  },
  right: {
    user: f1Right,
  },
};

// Tree Node Component
function TreeNodeCard({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.left || node.right;

  return (
    <div className="flex flex-col items-center">
      {/* Node */}
      <button
        onClick={() => hasChildren && setExpanded(!expanded)}
        className={`relative rounded-xl bg-surface-container-lowest p-4 shadow-whisper transition-all hover:shadow-whisper-lg ${
          hasChildren ? "cursor-pointer" : ""
        }`}
        style={{ minWidth: 160 }}
      >
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
            node.user.status === "ACTIVE"
              ? "bg-secondary text-on-secondary"
              : "bg-surface-container-high text-on-surface-variant"
          }`}>
            {node.user.name.charAt(0)}
          </div>
          <div className="text-left min-w-0">
            <p className="truncate text-title-sm text-on-surface">{node.user.name}</p>
            <p className="text-label-sm text-on-surface-variant">{node.user.rank || "Mới"}</p>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <Badge variant={statusToBadgeVariant[node.user.status]} className="text-[10px]">
            {USER_STATUS_LABELS[node.user.status]}
          </Badge>
          <span className="tabular-nums text-label-sm text-primary font-medium">
            {formatVND(node.user.totalRevenue)}
          </span>
        </div>
        {hasChildren && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
            <span className={`flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-on-primary transition-transform ${
              expanded ? "rotate-180" : ""
            }`}>
              ▾
            </span>
          </div>
        )}
      </button>

      {/* Children */}
      {hasChildren && expanded && (
        <div className="mt-6 flex gap-8 relative">
          {/* Connection lines */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-6 bg-outline-variant/30 -translate-y-6" />
          {node.left && node.right && (
            <div className="absolute top-0 left-[25%] right-[25%] h-px bg-outline-variant/30" />
          )}

          {/* Left branch */}
          <div className="flex flex-col items-center">
            {node.left ? (
              <>
                <p className="text-label-sm text-on-surface-variant mb-2 bg-secondary-fixed/20 px-2 py-0.5 rounded-full">Nhánh Trái</p>
                <TreeNodeCard node={node.left} depth={depth + 1} />
              </>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-label-sm text-on-surface-variant mb-2">Nhánh Trái</p>
                <div className="flex h-20 w-40 items-center justify-center rounded-xl border-2 border-dashed border-outline-variant/30">
                  <p className="text-body-sm text-on-surface-variant">Trống</p>
                </div>
              </div>
            )}
          </div>

          {/* Right branch */}
          <div className="flex flex-col items-center">
            {node.right ? (
              <>
                <p className="text-label-sm text-on-surface-variant mb-2 bg-primary-fixed/30 px-2 py-0.5 rounded-full">Nhánh Phải</p>
                <TreeNodeCard node={node.right} depth={depth + 1} />
              </>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-label-sm text-on-surface-variant mb-2">Nhánh Phải</p>
                <div className="flex h-20 w-40 items-center justify-center rounded-xl border-2 border-dashed border-outline-variant/30">
                  <p className="text-body-sm text-on-surface-variant">Trống</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function NetworkPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-headline-sm text-on-surface">Cây hệ thống</h1>
        <p className="text-body-md text-on-surface-variant mt-1">
          Cấu trúc Nhị phân — Mỗi người tối đa 2 nhánh (Trái/Phải)
        </p>
      </div>

      <Tabs.Root defaultTab="binary">
        <Tabs.List>
          <Tabs.Trigger id="binary">Cây Nhị phân</Tabs.Trigger>
          <Tabs.Trigger id="sponsor">Cây Bảo trợ</Tabs.Trigger>
        </Tabs.List>

        {/* Binary Tree */}
        <Tabs.Panel id="binary" className="py-6">
          <Card.Root>
            <Card.Header>
              <h3 className="text-title-md">Binary Tree — {rootUser.name}</h3>
            </Card.Header>
            <Card.Body>
              <div className="overflow-x-auto pb-8">
                <div className="flex justify-center min-w-[600px] py-4">
                  <TreeNodeCard node={mockTree} />
                </div>
              </div>
            </Card.Body>
          </Card.Root>

          {/* Branch Summary */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Card.Root>
              <Card.Body className="!pt-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-fixed/20">
                    <span className="text-sm font-bold text-secondary">L</span>
                  </div>
                  <div>
                    <p className="text-label-md text-on-surface-variant">Nhánh Trái</p>
                    <p className="text-title-lg tabular-nums font-semibold text-secondary">
                      {formatVND(f1Left.totalRevenue + (f2Left?.totalRevenue || 0) + (f2Right?.totalRevenue || 0))}
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card.Root>
            <Card.Root>
              <Card.Body className="!pt-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-fixed/20">
                    <span className="text-sm font-bold text-primary">R</span>
                  </div>
                  <div>
                    <p className="text-label-md text-on-surface-variant">Nhánh Phải</p>
                    <p className="text-title-lg tabular-nums font-semibold text-primary">
                      {formatVND(f1Right.totalRevenue)}
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card.Root>
          </div>
        </Tabs.Panel>

        {/* Sponsor Tree */}
        <Tabs.Panel id="sponsor" className="py-6">
          <Card.Root>
            <Card.Header>
              <h3 className="text-title-md">Cây Bảo trợ (Sponsor/Mặt trời)</h3>
            </Card.Header>
            <Card.Body>
              <div className="space-y-3">
                {mockUsers
                  .filter((u) => u.status === "ACTIVE")
                  .map((user) => {
                    const downlines = mockUsers.filter(
                      (u) => u.sponsorCode === user.name.toLowerCase().replace(/\s/g, ".")
                    );
                    return (
                      <div
                        key={user.id}
                        className="flex items-center justify-between rounded-xl bg-surface-container-low p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-fixed text-sm font-bold text-primary">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-title-sm text-on-surface">{user.name}</p>
                            <p className="text-body-sm text-on-surface-variant">
                              {user.rank} • Bảo trợ: {user.sponsorCode}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="tabular-nums text-title-sm text-primary font-medium">
                            {formatVND(user.totalRevenue)}
                          </p>
                          <p className="text-label-sm text-on-surface-variant">
                            {downlines.length} tuyến dưới trực hệ
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </Card.Body>
          </Card.Root>
        </Tabs.Panel>
      </Tabs.Root>
    </div>
  );
}
