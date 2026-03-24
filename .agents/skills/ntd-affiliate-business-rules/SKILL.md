---
name: ntd-affiliate-business-rules
description: Hệ thống luật kinh doanh, luồng đăng ký, thanh toán và chia hoa hồng đa cấp cho App Client NTD Affiliate (CÔNG TY CỔ PHẦN GIÁO DỤC COEDU).
---

# NTD Affiliate Business Rules

## Core Directives
1. **Luôn tuân thủ nghiệp vụ:** Khi code các tính năng liên quan đến User, Giỏ hàng, Ví tiền hoặc Hệ thống tuyến dưới, BẮT BUỘC phải đọc và áp dụng các quy tắc trong thư mục `references/`.
2. **Kiểm soát tính chính xác (Toán học):** - Giá sản phẩm niêm yết luôn là giá CHƯA VAT.
   - Thuế VAT mặc định là 8%. 
   - Tuyệt đối không làm tròn sai số khi tính toán hoa hồng phân tầng.
3. **Phê duyệt tập trung (Admin-centric):** Hầu hết các luồng quan trọng (Kích hoạt tài khoản, Nạp/Rút tiền, Ghi nhận đơn hàng, Thay đổi cơ cấu F1) đều yêu cầu trạng thái `pending_admin_approval`. App Client chỉ làm nhiệm vụ gửi Yêu cầu (Request) và Tải minh chứng (Upload Proof).

## Khởi tạo UI/UX
- Các màn hình liên quan đến Tiền bạc (Thanh toán, Ví) cần hiển thị rõ ràng thông số: Tổng tiền hàng, Thuế VAT 8%, Tổng thanh toán.
- Các form upload (CCCD, Biên lai) phải có preview ảnh và nút xóa ảnh trước khi submit.

## Context References
Tham khảo các file trong thư mục `references/` để biết chi tiết thuật toán:
- `01-user-auth-flow.md`: Quy trình tạo và kích hoạt User.
- `02-wallet-and-checkout.md`: Logic 2 loại Ví và quy trình thanh toán thủ công.
- `03-commission-policy.md`: Thuật toán tính doanh số và trả thưởng TĐL/CTV.
- `04-technical-specs.md`: Hằng số, mô hình cây, hạn mức tài chính và xử lý media.