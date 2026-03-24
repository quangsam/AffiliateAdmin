// ============================================
// NTD Affiliate Admin — Business Constants
// Ref: ntd-affiliate-business-rules/references/
// ============================================

// --- VAT & Pricing ---
export const VAT_RATE = 0.08;
export const BASE_PRODUCT_PRICE = 3_000_000; // VNĐ per box (before VAT)
export const MIN_WITHDRAWAL_AMOUNT = 100_000; // VNĐ

// --- User Status ---
export const USER_STATUS = {
  NEW: "NEW",
  PENDING_PLACEMENT: "PENDING_PLACEMENT",
  PENDING_APPROVAL: "PENDING_APPROVAL",
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
} as const;

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  NEW: "Chờ duyệt",
  PENDING_PLACEMENT: "Chờ duyệt",
  PENDING_APPROVAL: "Chờ duyệt",
  ACTIVE: "Đã kích hoạt",
  BLOCKED: "Đã khóa",
};

export const USER_STATUS_COLORS: Record<UserStatus, string> = {
  NEW: "bg-warning",
  PENDING_PLACEMENT: "bg-warning",
  PENDING_APPROVAL: "bg-warning",
  ACTIVE: "bg-secondary",
  BLOCKED: "bg-error",
};

// --- Order Status ---
export const ORDER_STATUS = {
  WAITING_PAYMENT: "WAITING_PAYMENT",
  PENDING_ADMIN: "PENDING_ADMIN",
  COMPLETED: "COMPLETED",
  REJECTED: "REJECTED",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  WAITING_PAYMENT: "Chờ thanh toán",
  PENDING_ADMIN: "Chờ Admin duyệt",
  COMPLETED: "Hoàn thành",
  REJECTED: "Từ chối",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  WAITING_PAYMENT: "bg-tertiary",
  PENDING_ADMIN: "bg-tertiary-container",
  COMPLETED: "bg-secondary",
  REJECTED: "bg-error",
};

// --- Commission Rates ---
export const DIRECT_COMMISSION_RATES = {
  F1: 0.1,  // 10%
  F2: 0.03, // 3%
  F3: 0.02, // 2%
} as const;

export const BINARY_COMMISSION_RATE = 0.09; // 9% of weak branch

export const CONNECTIVITY_BONUS_RATE = 0.05; // 5%

// --- CTV Packages ---
export const CTV_PACKAGES = [
  {
    id: "ctv-tieu-dung",
    name: "CTV Tiêu dùng",
    boxes: 1,
    revenue: 3_000_000,
    description: "Gói khởi đầu",
  },
  {
    id: "ctv-co-ban",
    name: "CTV Cơ bản",
    boxes: 2,
    revenue: 6_000_000,
    description: "Hoa hồng F1-F3",
  },
  {
    id: "ctv-nang-cao",
    name: "CTV Nâng cao",
    boxes: 5,
    revenue: 15_000_000,
    description: "Hoa hồng F1-F3 + 5% Sponsor + 5% F1-F3",
  },
  {
    id: "ctv-chuyen-nghiep",
    name: "CTV Chuyên nghiệp",
    boxes: 8,
    revenue: 24_000_000,
    description: "Hoa hồng F1-F3 + 5% 2 Sponsor + 5% F1-F5",
  },
] as const;

// --- TĐL Ranks ---
export const TDL_RANKS = [
  {
    id: "tdl-3",
    name: "Tổng Đại lý 3",
    minRevenue: 48_000_000,
    minBoxes: 16,
    minDirectTeam: 5,
    commissionRate: 0.05,
  },
  {
    id: "tdl-2",
    name: "Tổng Đại lý 2",
    minRevenue: 96_000_000,
    minBoxes: 32,
    minDirectTeam: 7,
    commissionRate: 0.06,
    downlineBonus: 0.02,
  },
  {
    id: "tdl-1",
    name: "Tổng Đại lý 1",
    minRevenue: 150_000_000,
    minBoxes: 50,
    minDirectTeam: 10,
    commissionRate: 0.08,
    downlineBonus: 0.02,
    level3Bonus: 0.01,
  },
] as const;

// --- Leadership Ranks ---
export const LEADERSHIP_RANKS = [
  { id: "pho-phong", name: "Phó Phòng", reward: 130_000_000, teamShare: 0.005 },
  { id: "truong-phong", name: "Trưởng Phòng", reward: 250_000_000, teamShare: 0.01 },
  { id: "pho-gd", name: "Phó Giám đốc", reward: 500_000_000, nationalShare: 0.005 },
  { id: "giam-doc", name: "Giám đốc", reward: 1_000_000_000, nationalShare: 0.01 },
] as const;

// --- Product Category ---
export const PRODUCT_CATEGORY = {
  FOOD: "FOOD",
  PHARMACY: "PHARMACY",
  SUPPLEMENTS: "SUPPLEMENTS",
  COMBO: "COMBO",
} as const;

export type ProductCategory = (typeof PRODUCT_CATEGORY)[keyof typeof PRODUCT_CATEGORY];

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  FOOD: "Thực phẩm",
  PHARMACY: "Dược phẩm",
  SUPPLEMENTS: "TPCN",
  COMBO: "Gói Combo",
};

// --- Re-ID ---
export const REID_THRESHOLD = 240_000_000;  // VNĐ
export const REID_DEDUCTION = 24_000_000;   // 8 boxes

// --- Placement ---
export const PLACEMENT_DEADLINE_HOURS = 48;

// --- Monthly Payout ---
export const PAYOUT_DEADLINE_DAY = 5; // Before 5th of each month

// --- Media ---
export const MAX_IMAGE_SIZE_MB = 5;
export const MAX_IMAGE_DIMENSION = 1920; // px (longest side)
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];

// --- Sidebar Navigation ---
export const ADMIN_NAV_ITEMS = [
  { label: "Tổng quan", href: "/", icon: "dashboard" },
  { label: "Người dùng", href: "/users", icon: "users" },
  { label: "Xếp cây", href: "/users/placement", icon: "tree" },
  { label: "Sản phẩm", href: "/products", icon: "products" },
  { label: "Đơn hàng", href: "/orders", icon: "orders" },
  { label: "Tài chính", href: "/finance", icon: "finance" },
  { label: "Hoa hồng", href: "/commission", icon: "commission" },
  { label: "Cây hệ thống", href: "/network", icon: "network" },
] as const;
