// ============================================
// Mock Data — Realistic business data
// Ref: ntd-affiliate-business-rules
// ============================================

import type { UserStatus, OrderStatus, ProductCategory } from "./constants";
import { PRODUCT_CATEGORY } from "./constants";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  sponsorCode: string;
  status: UserStatus;
  rank: string;
  package: string;
  cccdImage?: string;
  createdAt: string;
  rewardWallet: number;
  commissionWallet: number;
  directTeamCount: number;
  totalRevenue: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  unitPrice: number; // Before VAT
  stock: number;
  image: string;
  active: boolean;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  productName: string;
  quantity: number;
  unitPrice: number; // Before VAT
  totalAmount: number; // After VAT
  status: OrderStatus;
  receiptImage?: string;
  createdAt: string;
  note?: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  bankName: string;
  bankAccount: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  note?: string;
}

export interface Activity {
  id: string;
  type: "user_registered" | "order_created" | "order_confirmed" | "withdrawal_request" | "user_activated";
  description: string;
  createdAt: string;
}

// --- Mock Users ---
export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Nguyễn Văn An",
    email: "an.nguyen@gmail.com",
    phone: "0901234567",
    sponsorCode: "admin",
    status: "ACTIVE",
    rank: "CTV Chuyên nghiệp",
    package: "ctv-chuyen-nghiep",
    createdAt: "2025-11-15T08:30:00Z",
    rewardWallet: 12_000_000,
    commissionWallet: 45_600_000,
    directTeamCount: 8,
    totalRevenue: 96_000_000,
  },
  {
    id: "u2",
    name: "Trần Thị Bình",
    email: "binh.tran@gmail.com",
    phone: "0912345678",
    sponsorCode: "an.nguyen",
    status: "ACTIVE",
    rank: "CTV Nâng cao",
    package: "ctv-nang-cao",
    createdAt: "2025-12-01T10:00:00Z",
    rewardWallet: 6_000_000,
    commissionWallet: 18_200_000,
    directTeamCount: 5,
    totalRevenue: 48_000_000,
  },
  {
    id: "u3",
    name: "Lê Hoàng Cường",
    email: "cuong.le@gmail.com",
    phone: "0923456789",
    sponsorCode: "binh.tran",
    status: "PENDING_APPROVAL",
    rank: "CTV Cơ bản",
    package: "ctv-co-ban",
    createdAt: "2026-03-20T14:00:00Z",
    rewardWallet: 0,
    commissionWallet: 0,
    directTeamCount: 0,
    totalRevenue: 6_000_000,
  },
  {
    id: "u4",
    name: "Phạm Thị Dung",
    email: "dung.pham@gmail.com",
    phone: "0934567890",
    sponsorCode: "an.nguyen",
    status: "PENDING_PLACEMENT",
    rank: "CTV Tiêu dùng",
    package: "ctv-tieu-dung",
    createdAt: "2026-03-21T09:30:00Z",
    rewardWallet: 0,
    commissionWallet: 0,
    directTeamCount: 0,
    totalRevenue: 3_000_000,
  },
  {
    id: "u5",
    name: "Hoàng Minh Đức",
    email: "duc.hoang@gmail.com",
    phone: "0945678901",
    sponsorCode: "binh.tran",
    status: "NEW",
    rank: "",
    package: "",
    createdAt: "2026-03-22T16:00:00Z",
    rewardWallet: 0,
    commissionWallet: 0,
    directTeamCount: 0,
    totalRevenue: 0,
  },
  {
    id: "u6",
    name: "Vũ Thị Giang",
    email: "giang.vu@gmail.com",
    phone: "0956789012",
    sponsorCode: "an.nguyen",
    status: "ACTIVE",
    rank: "CTV Cơ bản",
    package: "ctv-co-ban",
    createdAt: "2026-01-10T11:00:00Z",
    rewardWallet: 3_000_000,
    commissionWallet: 7_800_000,
    directTeamCount: 3,
    totalRevenue: 24_000_000,
  },
  {
    id: "u7",
    name: "Đỗ Văn Hải",
    email: "hai.do@gmail.com",
    phone: "0967890123",
    sponsorCode: "giang.vu",
    status: "BLOCKED",
    rank: "CTV Tiêu dùng",
    package: "ctv-tieu-dung",
    createdAt: "2026-02-05T13:00:00Z",
    rewardWallet: 0,
    commissionWallet: 1_200_000,
    directTeamCount: 0,
    totalRevenue: 3_000_000,
  },
  {
    id: "u8",
    name: "Ngô Thanh Hương",
    email: "huong.ngo@gmail.com",
    phone: "0978901234",
    sponsorCode: "an.nguyen",
    status: "ACTIVE",
    rank: "CTV Nâng cao",
    package: "ctv-nang-cao",
    createdAt: "2025-12-20T09:00:00Z",
    rewardWallet: 9_000_000,
    commissionWallet: 32_400_000,
    directTeamCount: 6,
    totalRevenue: 72_000_000,
  },
];

// --- Mock Products ---
export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "CellThera Hyper (CTH)",
    description: "Sản phẩm tế bào gốc cao cấp, hỗ trợ sức khỏe toàn diện",
    category: PRODUCT_CATEGORY.SUPPLEMENTS,
    unitPrice: 3_000_000,
    stock: 500,
    image: "",
    active: true,
  },
  {
    id: "p2",
    name: "CellThera Beauty (CTB)",
    description: "Sản phẩm làm đẹp từ tế bào gốc thực vật",
    category: PRODUCT_CATEGORY.PHARMACY,
    unitPrice: 2_500_000,
    stock: 300,
    image: "",
    active: true,
  },
  {
    id: "p3",
    name: "CellThera Joint (CTJ)",
    description: "Sản phẩm hỗ trợ xương khớp",
    category: PRODUCT_CATEGORY.FOOD,
    unitPrice: 2_800_000,
    stock: 200,
    image: "",
    active: true,
  },
  {
    id: "p4",
    name: "Combo Khởi nghiệp (8 hộp CTH)",
    description: "Gói combo tối ưu cho CTV Chuyên nghiệp",
    category: PRODUCT_CATEGORY.COMBO,
    unitPrice: 24_000_000,
    stock: 50,
    image: "",
    active: true,
  },
];

// --- Mock Orders ---
export const mockOrders: Order[] = [
  {
    id: "ord-001",
    userId: "u3",
    userName: "Lê Hoàng Cường",
    productName: "CellThera Hyper (CTH)",
    quantity: 2,
    unitPrice: 3_000_000,
    totalAmount: 6_480_000, // 6M * 1.08
    status: "PENDING_ADMIN",
    createdAt: "2026-03-20T14:30:00Z",
  },
  {
    id: "ord-002",
    userId: "u4",
    userName: "Phạm Thị Dung",
    productName: "CellThera Hyper (CTH)",
    quantity: 1,
    unitPrice: 3_000_000,
    totalAmount: 3_240_000,
    status: "PENDING_ADMIN",
    createdAt: "2026-03-21T10:00:00Z",
  },
  {
    id: "ord-003",
    userId: "u1",
    userName: "Nguyễn Văn An",
    productName: "CellThera Hyper (CTH)",
    quantity: 8,
    unitPrice: 3_000_000,
    totalAmount: 25_920_000,
    status: "COMPLETED",
    createdAt: "2025-11-15T09:00:00Z",
  },
  {
    id: "ord-004",
    userId: "u2",
    userName: "Trần Thị Bình",
    productName: "CellThera Hyper (CTH)",
    quantity: 5,
    unitPrice: 3_000_000,
    totalAmount: 16_200_000,
    status: "COMPLETED",
    createdAt: "2025-12-01T11:00:00Z",
  },
  {
    id: "ord-005",
    userId: "u6",
    userName: "Vũ Thị Giang",
    productName: "CellThera Beauty (CTB)",
    quantity: 2,
    unitPrice: 2_500_000,
    totalAmount: 5_400_000,
    status: "COMPLETED",
    createdAt: "2026-01-10T12:00:00Z",
  },
  {
    id: "ord-006",
    userId: "u5",
    userName: "Hoàng Minh Đức",
    productName: "CellThera Hyper (CTH)",
    quantity: 1,
    unitPrice: 3_000_000,
    totalAmount: 3_240_000,
    status: "WAITING_PAYMENT",
    createdAt: "2026-03-22T16:30:00Z",
  },
];

// --- Mock Withdrawal Requests ---
export const mockWithdrawals: WithdrawalRequest[] = [
  {
    id: "wd-001",
    userId: "u1",
    userName: "Nguyễn Văn An",
    amount: 20_000_000,
    bankName: "Vietcombank",
    bankAccount: "0123456789",
    status: "PENDING",
    createdAt: "2026-03-20T08:00:00Z",
  },
  {
    id: "wd-002",
    userId: "u2",
    userName: "Trần Thị Bình",
    amount: 10_000_000,
    bankName: "Techcombank",
    bankAccount: "9876543210",
    status: "PENDING",
    createdAt: "2026-03-21T09:00:00Z",
  },
  {
    id: "wd-003",
    userId: "u8",
    userName: "Ngô Thanh Hương",
    amount: 15_000_000,
    bankName: "MB Bank",
    bankAccount: "1122334455",
    status: "APPROVED",
    createdAt: "2026-03-15T10:00:00Z",
  },
];

// --- Mock Activities ---
export const mockActivities: Activity[] = [
  { id: "a1", type: "user_registered", description: "Hoàng Minh Đức vừa đăng ký tài khoản mới", createdAt: "2026-03-22T16:00:00Z" },
  { id: "a2", type: "order_created", description: "Phạm Thị Dung đã tạo đơn hàng 1 hộp CTH", createdAt: "2026-03-21T10:00:00Z" },
  { id: "a3", type: "order_created", description: "Lê Hoàng Cường đã tạo đơn hàng 2 hộp CTH", createdAt: "2026-03-20T14:30:00Z" },
  { id: "a4", type: "withdrawal_request", description: "Trần Thị Bình yêu cầu rút 10.000.000₫", createdAt: "2026-03-21T09:00:00Z" },
  { id: "a5", type: "withdrawal_request", description: "Nguyễn Văn An yêu cầu rút 20.000.000₫", createdAt: "2026-03-20T08:00:00Z" },
  { id: "a6", type: "user_activated", description: "Vũ Thị Giang đã được kích hoạt tài khoản", createdAt: "2026-01-10T11:30:00Z" },
  { id: "a7", type: "order_confirmed", description: "Admin xác nhận đơn hàng 5 hộp CTH của Trần Thị Bình", createdAt: "2025-12-02T08:00:00Z" },
];

// --- Dashboard Stats ---
export const dashboardStats = {
  totalActiveUsers: mockUsers.filter((u) => u.status === "ACTIVE").length,
  pendingOrders: mockOrders.filter((o) => o.status === "PENDING_ADMIN").length,
  monthlyRevenue: 55_080_000, // sum of completed orders this month
  pendingWithdrawals: mockWithdrawals.filter((w) => w.status === "PENDING").length,
};
