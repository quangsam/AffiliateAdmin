# Thông số kỹ thuật chi tiết (Technical Specifications)

## 1. Hệ thống Trạng thái (Status Enum Strings)
Bắt buộc sử dụng các hằng số sau để đồng bộ giữa Frontend và Backend:

### User Status
- `NEW` (0): Vừa đăng ký, chưa đặt hàng gói khởi đầu.
- `PENDING_PLACEMENT` (1): Đã thanh toán, chờ bảo trợ xếp cây.
- `PENDING_APPROVAL` (2): Đã xếp cây, chờ Admin duyệt kích hoạt.
- `ACTIVE` (3): Đã kích hoạt, bắt đầu được tính hoa hồng.
- `BLOCKED` (4): Tài khoản bị khóa.

### Order Status
- `WAITING_PAYMENT`: Chờ user upload bill chuyển khoản.
- `PENDING_ADMIN`: Đã upload bill, chờ Admin xác nhận dòng tiền.
- `COMPLETED`: Đơn hàng thành công.
- `REJECTED`: Đơn hàng bị từ chối (Bill giả, sai số tiền...).

## 2. Cấu trúc Cây Hệ thống (Hybrid Tree Structure)
- **Cấu trúc Hiển thị & Xếp cây:** Nhị phân (Binary Tree). Mỗi người có tối đa 2 nhánh (Trái/Phải). Hỗ trợ tràn tầng.
- **Cấu trúc Tính Hoa Hồng:** 
  * **Nhị phân:** Thưởng 9% trên doanh số nhánh yếu (Weak Branch). Nhánh mạnh bảo lưu.
  * **Trực hệ:** Thưởng F1-F3 và các cấp TĐL dựa trên cây mặt trời (Sponsor).
  * **Connectivity:** Thưởng dựa trên thu nhập của Sponsor và F1-F5.

## 3. Ràng buộc Tài chính & Làm tròn
- **Đơn vị tiền tệ:** VNĐ.
- **Làm tròn:** `Math.floor()` - Luôn làm tròn về 0 chữ số thập phân.
- **Hạn mức rút tối thiểu:** 100.000 VNĐ.
- **VAT:** 8%, tính trên Đơn giá gốc.
- **Tái đầu tư (Re-ID):** Khi tổng thu nhập tích lũy đạt **240.000.000 VNĐ**, hệ thống tự động khấu trừ thu nhập phát sinh tiếp theo để mua 1 gói duy trì (8 hộp - 24.000.000 VNĐ) để bảo trì vị trí.


## 4. Xử lý Ảnh & Lưu trữ
- **Lưu trữ:** Ưu tiên Cloudinary hoặc AWS S3 (Cấu hình qua biến môi trường).
- **Định dạng:** JPEG, PNG.
- **Dung lượng tối đa:** 5MB/ảnh.
- **Resize:** Frontend tự động resize ảnh xuống tối đa 1920px (chiều dài nhất) trước khi upload để tiết kiệm băng thông.

## 5. Logic Xếp cây & Thời hạn
- User sau khi thanh toán đơn đầu tiên sẽ nằm ở trạng thái `PENDING_PLACEMENT`.
- **Thời hạn xếp cây:** Không quá 48h. Nếu quá hạn, hệ thống sẽ gửi thông báo (Notification) nhắc nhở Bảo trợ. User vẫn sẽ ở trạng thái chờ cho đến khi được xếp vào cây Nhị phân thì hoa hồng mới bắt đầu được tính toán cho tuyến trên.