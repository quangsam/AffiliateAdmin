// ============================================
// NTD Affiliate Admin — Formatters & Helpers
// Uses Intl.* APIs per web-design-guidelines
// Uses Math.floor() per business rules
// ============================================

import { VAT_RATE } from "./constants";

/**
 * Format số tiền VNĐ — tabular nums
 * Uses Intl.NumberFormat (never hardcoded format)
 */
const vndFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatVND(amount: number): string {
  return vndFormatter.format(Math.floor(amount));
}

/**
 * Format số lượng
 */
const numberFormatter = new Intl.NumberFormat("vi-VN");

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/**
 * Format phần trăm
 */
export function formatPercent(rate: number): string {
  return `${(rate * 100).toFixed(rate % 0.01 === 0 ? 0 : 1)}%`;
}

/**
 * Format ngày tháng — Uses Intl.DateTimeFormat
 */
const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return dateFormatter.format(d);
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return dateTimeFormatter.format(d);
}

/**
 * Tính giá sau VAT
 * Formula: (quantity * unitPrice) * (1 + VAT_RATE)
 * Always Math.floor() for VNĐ
 */
export function calculateWithVAT(unitPrice: number, quantity: number = 1): number {
  return Math.floor(unitPrice * quantity * (1 + VAT_RATE));
}

/**
 * Tính thuế VAT
 */
export function calculateVATAmount(unitPrice: number, quantity: number = 1): number {
  return Math.floor(unitPrice * quantity * VAT_RATE);
}

/**
 * Format phone number
 */
export function formatPhone(phone: string): string {
  if (phone.length === 10) {
    return `${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}`;
  }
  return phone;
}

/**
 * Relative time (for activity feeds)
 */
export function relativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffMins < 1) return "Vừa xong";
  if (diffMins < 60) return `${diffMins} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays < 7) return `${diffDays} ngày trước`;
  return formatDate(d);
}
