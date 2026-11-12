# 🕹️ Đấu Trường Diệt Bug 3D — Game Học & Luyện Thi ISTQB CTFL v4.0.1 (Tiếng Việt 100%)

Tựa game nhập vai 3D tương tác bằng **Three.js (WebGL)** kết hợp hệ thống học lý thuyết, ví dụ giải mẫu từng bước và mô phỏng đề thi quốc tế **ISTQB Certified Tester Foundation Level (CTFL) v4.0.1** hoàn toàn bằng Tiếng Việt.

## 🚀 Cách Chơi Ngay
- **Chơi trực tiếp trên máy (Zero-Install):** Mở trực tiếp file [`ctfl-game/index.html`](ctfl-game/index.html) hoặc cổng khởi chạy [`index.html`](index.html) trên trình duyệt.
- **Giáo trình Tiếng Việt đầy đủ:** Xem tại [`ISTQB_CTFL_Syllabus_v4.0.1_VI.html`](ISTQB_CTFL_Syllabus_v4.0.1_VI.html) hoặc [`ISTQB_CTFL_Syllabus_v4.0.1_VI_Full.md`](ISTQB_CTFL_Syllabus_v4.0.1_VI_Full.md).

## 🌟 Các Chế Độ Nổi Bật
1. **📚 Bước 1 — Học Kiến Thức & Ví Dụ Giải Mẫu (6 Chương):**
   - Học lý thuyết cốt lõi theo từng mục (`1.1` → `6.2`), kèm công thức tính nhanh, khẩu quyết nhớ lâu và **Ví dụ bài tập mẫu đã giải chi tiết từng bước**.
   - Đánh dấu **Đã Hiểu Mục Này** để nhận **+25 XP** trước khi bước vào đánh Trùm.
2. **🕹️ Thế Giới Tương Tác 3D (Three.js 60 FPS):**
   - Điều khiển Chiến Binh Tester 3D bằng phím `WASD` / Phím mũi tên hoặc Click chuột xuống sàn 3D.
   - Nhấn `F` / Click chuột để bắn đạn Laser 3D tiêu diệt Quái Vật Bug bò quanh đấu trường (+25 XP).
   - Nhấn `Space` để lướt nhanh (Dash) và tiến lại gần 6 Cổng Không Gian nhấn `E` để khiêu chiến 6 Đại Trùm Chương 3D.
3. **⚔️ Bước 2 — Chiến Dịch Đánh Trùm 6 Chương (Campaign Boss Raid):**
   - Hệ thống chiến đấu RPG với thanh máu Chiến Binh & Trùm, hệ số Liên Kích (Combo), âm thanh tổng hợp trực tiếp bằng Web Audio API (`CTFLSound`) và pháo hoa hạt Canvas (`CTFLParticles`).
   - 4 Kỹ năng hỗ trợ: **Loại 2 Đáp Án Sai (50/50)**, **Đóng Băng Giờ**, **📖 Mở Bài Học Mục Này (Miễn phí không giới hạn)** và **Hồi +30 Máu**.
4. **🎓 Phòng Thi Thử Chuẩn Quốc Tế ISTQB v4.0.1 (Mock Exam Simulator):**
   - 40 câu trắc nghiệm / 60 phút phân bổ chuẩn xác theo trọng số đề thi thật (Chương 1: 8 câu, Chương 2: 6 câu, Chương 3: 4 câu, Chương 4: 11 câu, Chương 5: 9 câu, Chương 6: 2 câu — Đạt chuẩn ở mốc **26/40 câu = 65%**).
5. **⚡ 60 Giây Đập Bug Tốc Độ & 💀 Sổ Thù Vặt (Spaced Repetition):**
   - Tự động lưu các câu trả lời sai vào **Sổ Thù Vặt**, chỉ xóa khi trả lời đúng liên tiếp 2 lần.
6. **🃏 Thẻ Nhớ 3D (48 Thẻ) & 📖 Bí Kíp Toàn Thư:**
   - Lật thẻ 3D bằng phím `F`/`Space` và tra cứu nhanh toàn bộ bảng công thức K3 (EP, BVA 2 & 3 giá trị, Bảng quyết định, Chuyển đổi trạng thái, Ước lượng 3 điểm).

## 🧪 Kiểm Thử Tự Động
```bash
node ctfl-game/tests/verify.js
```
