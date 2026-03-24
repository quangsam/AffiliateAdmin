"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { mockProducts, type Product } from "@/lib/mock-data";
import { formatVND, formatNumber } from "@/lib/formatters";
import { VAT_RATE, CTV_PACKAGES, PRODUCT_CATEGORY, PRODUCT_CATEGORY_LABELS } from "@/lib/constants";

export default function ProductsPage() {
  const [showPackages, setShowPackages] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === "ALL" || p.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [search, activeCategory]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-headline-sm text-on-surface">Quản lý Sản phẩm</h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Đăng tin, cập nhật giá và theo dõi tồn kho sản phẩm/combo.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => setShowPackages(true)}>
             Xem gói CTV
          </Button>
          <Button variant="primary" size="sm" onClick={handleAdd}>
            + Thêm sản phẩm
          </Button>
        </div>
      </div>

      {/* Toolbar: Search and Category Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-surface-container-lowest p-4 rounded-2xl shadow-whisper border border-outline-variant/10">
        <div className="relative w-full lg:max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="9" cy="9" r="6" /><path d="M14 14l4 4" />
          </svg>
          <input
            type="text"
            placeholder="Tìm mã hoặc tên sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-body-md"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["ALL", ...Object.keys(PRODUCT_CATEGORY)].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-label-md font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              {cat === "ALL" ? "Tất cả" : PRODUCT_CATEGORY_LABELS[cat as keyof typeof PRODUCT_CATEGORY]}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => {
          const vatAmount = Math.floor(product.unitPrice * VAT_RATE);
          const totalPrice = product.unitPrice + vatAmount;
          const isLowStock = product.stock < 100;

          return (
            <Card.Root key={product.id} className="transition-all hover:shadow-whisper-lg group border border-outline-variant/10">
              {/* Product Image placeholder */}
              <div className="relative h-48 overflow-hidden rounded-t-xl bg-gradient-to-br from-primary-fixed/30 to-surface-container-highest">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-primary/30">
                    <path d="M6 14l18-8 18 8-18 8-18-8z" /><path d="M6 24l18 8 18-8" /><path d="M6 34l18 8 18-8" />
                  </svg>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="info" className="backdrop-blur-md bg-white/60">
                    {PRODUCT_CATEGORY_LABELS[product.category]}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button onClick={() => handleEdit(product)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-primary shadow-sm hover:bg-white transition-colors">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 16h4.5M14 4l2 2-10 10-2 0 0-2 10-10z" /></svg>
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-error shadow-sm hover:bg-white transition-colors">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h12M6 6l1 10a1 1 0 001 1h6a1 1 0 001-1l1-10M8 4h4" /></svg>
                  </button>
                </div>
              </div>

              <Card.Body>
                <div className="mb-4">
                  <h3 className="text-title-md font-bold text-on-surface line-clamp-1">{product.name}</h3>
                  <p className="text-body-sm text-on-surface-variant mt-1 line-clamp-2 min-h-[2.5rem]">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-2.5 rounded-2xl bg-surface-container-low p-4">
                  <div className="flex justify-between text-body-sm">
                    <span className="text-on-surface-variant font-medium">Niêm yết (chưa VAT)</span>
                    <span className="tabular-nums text-on-surface font-semibold">{formatVND(product.unitPrice)}</span>
                  </div>
                  <div className="flex justify-between text-body-sm">
                    <span className="text-on-surface-variant">VAT ({VAT_RATE * 100}%)</span>
                    <span className="tabular-nums text-on-surface-variant">+{formatVND(vatAmount)}</span>
                  </div>
                  <div className="flex justify-between border-t border-outline-variant/20 pt-2.5">
                    <span className="text-title-sm text-on-surface font-bold text-primary">Giá bán App</span>
                    <span className="tabular-nums text-title-md text-primary font-black">
                      {formatVND(totalPrice)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${isLowStock ? "bg-error animate-pulse" : "bg-success"}`} />
                    <span className={`text-label-lg font-medium ${isLowStock ? "text-error" : "text-on-surface-variant"}`}>
                      Kho: {formatNumber(product.stock)}
                    </span>
                  </div>
                  <Badge variant={product.active ? "success" : "default"}>
                    {product.active ? "Đang bán" : "Tạm ngưng"}
                  </Badge>
                </div>
              </Card.Body>
            </Card.Root>
          );
        })}
      </div>

      {/* Product Add/Edit Modal */}
      <Modal.Overlay open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Content width="max-w-xl">
          <Modal.Header>{editingProduct ? "Sửa thông tin sản phẩm" : "Thêm sản phẩm mới"}</Modal.Header>
          <Modal.Body>
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-label-md font-semibold text-on-surface mb-1.5">Tên sản phẩm/Combo</label>
                  <input
                    type="text"
                    defaultValue={editingProduct?.name || ""}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-body-md"
                    placeholder="VD: CellThera Hyper (CTH)"
                  />
                </div>
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-1.5">Danh mục</label>
                  <select
                    defaultValue={editingProduct?.category || PRODUCT_CATEGORY.FOOD}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-body-md"
                  >
                    {Object.keys(PRODUCT_CATEGORY).map(cat => (
                      <option key={cat} value={cat}>{PRODUCT_CATEGORY_LABELS[cat as keyof typeof PRODUCT_CATEGORY]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-1.5">Số lượng kho</label>
                  <input
                    type="number"
                    defaultValue={editingProduct?.stock || 0}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-body-md"
                  />
                </div>
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-1.5">Đơn giá niêm yết</label>
                  <input
                    type="number"
                    defaultValue={editingProduct?.unitPrice || ""}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-body-md font-mono"
                    placeholder="3.000.000"
                  />
                </div>
                <div className="flex items-end">
                  <div className="p-3 bg-primary-fixed/20 rounded-xl border border-primary/10 w-full mb-0.5">
                    <p className="text-label-xs text-primary font-bold uppercase tracking-wider mb-1">Giá App (Incl. 8% VAT)</p>
                    <p className="text-title-md font-black text-primary">Theo đơn giá</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1.5">Mô tả ngắn</label>
                <textarea
                  defaultValue={editingProduct?.description || ""}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-body-md"
                  placeholder="Mô tả công dụng sản phẩm..."
                />
              </div>
              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1.5">Ảnh sản phẩm</label>
                <div className="border-2 border-dashed border-outline-variant/30 rounded-2xl p-6 flex flex-col items-center justify-center bg-surface-container-lowest hover:bg-surface-container-low transition-colors group cursor-pointer">
                  <svg className="text-on-surface-variant/30 group-hover:text-primary/50 transition-colors mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                  </svg>
                  <p className="text-label-md text-on-surface-variant">Kéo thả hoặc click để tải ảnh lên</p>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" size="md" onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button variant="primary" size="md" onClick={() => setIsModalOpen(false)}>
              {editingProduct ? "Lưu thay đổi" : "Lưu sản phẩm"}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Overlay>

      {/* CTV Packages Modal (Existing) */}
      <Modal.Overlay open={showPackages} onClose={() => setShowPackages(false)}>
        <Modal.Content width="max-w-2xl">
          <Modal.Header>Bảng giá Gói CTV/Đại lý</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              {CTV_PACKAGES.map((pkg) => {
                const totalVAT = Math.floor(pkg.revenue * (1 + VAT_RATE));
                return (
                  <div key={pkg.id} className="flex items-center justify-between rounded-2xl bg-surface-container-low p-5 border border-outline-variant/10">
                    <div>
                      <p className="text-title-md font-bold text-on-surface">{pkg.name}</p>
                      <p className="text-body-sm text-on-surface-variant mt-1 italic font-medium">
                         Quy cách: {pkg.boxes} hộp • {pkg.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-label-xs text-on-surface-variant/70 uppercase tracking-widest font-bold">Doanh số niêm yết</p>
                      <p className="tabular-nums text-title-lg text-primary font-black">
                        {formatVND(pkg.revenue)}
                      </p>
                      <p className="text-label-sm text-on-surface-variant mt-0.5">
                        (Giá thanh toán: {formatVND(totalVAT)})
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={() => setShowPackages(false)}>Đóng</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Overlay>
    </div>
  );
}
