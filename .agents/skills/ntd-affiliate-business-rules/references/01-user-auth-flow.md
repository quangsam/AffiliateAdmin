# Quy trình Đăng ký & Kích hoạt (User Auth Flow)

## 1. Dữ liệu Đăng ký (Register)
User đăng ký bắt buộc phải có các trường sau:
- Tên User (Unique, kiểm tra trùng lặp).
- Email.
- Số điện thoại.
- **Mã giới thiệu (Sponsor/Bảo trợ):** Bắt buộc nhập. Mã này chính là Username của người bảo trợ.

## 2. Luồng Kích hoạt (Activation Flow)
- **Bước 1:** User nhập thông tin đăng ký cơ bản.
- **Bước 2:** Chuyển sang màn hình Mua hàng (chọn gói từ 1 đến 50 hộp).
- **Bước 3:** Khai báo địa chỉ nhận hàng (Tại kho hoặc Ship tận nhà).
- **Bước 4:** Thanh toán (Upload biên lai).
- **Bước 5:** Upload ảnh Căn cước công dân (CCCD) để xác minh chính chủ.
- **Bước 6:** Trạng thái tài khoản là `Pending`. Người bảo trợ (F1) sẽ xếp cây hệ thống và gửi yêu cầu duyệt.
- **Bước 7:** Admin duyệt. Tài khoản chính thức `Active` và hoa hồng bắt đầu nhảy.

## 3. Cấu trúc Tuyến dưới
- User có quyền xem chi tiết doanh số, dòng tiền, hoa hồng và lịch sử mua hàng của các user tuyến dưới trực thuộc.
- Nếu User muốn sắp xếp lại cơ cấu nhân sự tuyến dưới, hệ thống không tự động thay đổi mà phải tạo một `Request` gửi lên Admin xét duyệt.