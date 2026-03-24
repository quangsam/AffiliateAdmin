# Quản lý Ví (Wallets) & Thanh toán (Checkout)

## 1. Hệ thống Đa Ví (Multi-Wallet System)
Mỗi User có 2 loại ví hoạt động độc lập:
- **Ví Điểm Thưởng (Reward Wallet):** Chỉ dùng để order hàng hóa trên App. 
- **Ví Hoa Hồng (Commission Wallet):** Chỉ dùng để tạo lệnh rút tiền (Withdraw) về tài khoản ngân hàng thực tế. Gửi lệnh rút phải chờ Admin duyệt.

## 2. Thuật toán Giá (Pricing Logic)
- Công thức: `Tổng thanh toán = (Số lượng * Đơn giá chưa VAT) * 1.08`
- **Ví dụ chuẩn:** Giá 1 hộp CTH là 3.000.000đ. Thuế VAT 8%. Tổng tiền khách phải trả cho 1 hộp là 3.240.000đ.

## 3. Luồng Thanh toán (Manual Checkout Flow)
Hệ thống không tích hợp cổng thanh toán tự động (như VNPay/Momo) mà dùng phương thức chuyển khoản thủ công.
- Ở bước cuối cùng của Giỏ hàng, hiển thị rõ: Thông tin Ngân hàng của Công ty & Mã QR Code.
- User thực hiện chuyển khoản bằng app ngân hàng của họ.
- Bắt buộc hiển thị Form: `Tải ảnh chụp màn hình biên lai chuyển khoản`.
- User gửi xác nhận -> Đơn hàng chuyển trạng thái `waiting_for_payment`.
- Chỉ khi Admin thao tác `Xác nhận đã nhận tiền` trên Web Admin, đơn hàng mới thành công và hệ thống mới kích hoạt tính toán hoa hồng cho tuyến trên.