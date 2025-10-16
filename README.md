# Date Invitation App

Ứng dụng mời hẹn hò với giao diện đẹp mắt và tương tác thú vị.

## Tính năng mới: Thu thập lý do từ chối

Khi người dùng nhấn nút "Không! ☹", ứng dụng sẽ hiển thị một modal để thu thập lý do từ chối.

### Các lý do có sẵn:
- Tôi đang bận rộn
- Tôi chưa sẵn sàng  
- Tôi không hứng thú
- Khoảng cách quá xa
- Thời điểm không phù hợp
- Lý do khác (có thể nhập tùy chỉnh)

### Chức năng:
1. **Modal đẹp mắt**: Giao diện modal với gradient màu hồng, hiệu ứng shimmer
2. **Lựa chọn đa dạng**: 6 lý do có sẵn + tùy chọn nhập lý do tùy chỉnh
3. **Lưu trữ dữ liệu**: 
   - Lưu vào localStorage của trình duyệt
   - Gửi lên server (nếu có)
4. **Hiệu ứng tương tác**: 
   - Heart burst khi chọn lý do
   - Shake animation khi validation lỗi
   - Thank you message với floating hearts
5. **Responsive**: Tối ưu cho cả desktop và mobile

## Cách chạy ứng dụng

### 1. Chạy Frontend
Mở file `index.html` trong trình duyệt hoặc sử dụng live server.

### 2. Chạy Backend (tùy chọn)
```bash
cd server
npm install
npm start
```

Server sẽ chạy tại `http://localhost:4000`

### 3. Test chức năng
1. Mở ứng dụng trong trình duyệt
2. Nhấn nút "Không! ☹" 
3. Chọn một lý do hoặc nhập lý do tùy chỉnh
4. Nhấn "Gửi lý do"
5. Xem thông báo cảm ơn và hiệu ứng hearts

## Cấu trúc dữ liệu

### Dữ liệu rejection được lưu:
```json
{
  "reason": "busy", // hoặc lý do tùy chỉnh
  "timestamp": "2024-01-15T10:30:00.000Z",
  "userAgent": "Mozilla/5.0..."
}
```

### Dữ liệu gửi lên server:
```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "userResponses": {
    "rejectionReason": "busy",
    "userAgent": "Mozilla/5.0..."
  }
}
```

## Files đã thay đổi

1. **index.html**: Thêm HTML cho modal
2. **style.css**: Thêm CSS styling cho modal và các hiệu ứng
3. **script.js**: Thêm JavaScript xử lý modal và lưu trữ dữ liệu
4. **server/server.js**: Đã có sẵn endpoint để nhận dữ liệu rejection

## Tính năng khác

Ứng dụng còn có nhiều tính năng khác như:
- Chọn địa điểm hẹn hò
- Chọn thời gian
- Chọn món ăn và đồ uống
- Dark mode toggle
- Cherry blossom animation
- Heart trail effect
- Responsive design
