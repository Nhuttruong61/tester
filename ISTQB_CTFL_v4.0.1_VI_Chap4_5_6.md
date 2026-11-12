# ISTQB® Certified Tester Foundation Level Syllabus v4.0.1 - Bản dịch Chuẩn Thuật Ngữ (Chương 4, 5, 6)

> **Nguyên tắc dịch chuẩn ISTQB:**
> - Dịch **đầy đủ 100% từng câu, từng ý** trong tài liệu gốc `ISTQB_CTFL_Syllabus_v4.0.1.pdf` (trang 38 → 60).
> - **Giữ nguyên thuật ngữ gốc tiếng Anh (Keywords)** trong ngoặc đơn để khi làm đề thi tiếng Anh bạn nhận diện được ngay từ khóa ăn điểm.
> - Giữ nguyên mã mục tiêu học tập (**FL-x.x.x**) và mức độ nhận thức (**K1, K2, K3**).

---

# Chương 4: Phân tích và Thiết kế Kiểm thử (Test Analysis and Design) – 390 phút

### Từ khóa (Keywords - K1)
`acceptance criteria` (tiêu chí chấp nhận), `acceptance test-driven development` (phát triển hướng kiểm thử chấp nhận - ATDD), `black-box test technique` (kỹ thuật kiểm thử hộp đen), `boundary value analysis` (phân tích giá trị biên - BVA), `branch coverage` (độ bao phủ nhánh), `checklist-based testing` (kiểm thử dựa trên danh sách kiểm tra), `collaboration-based test approach` (cách tiếp cận kiểm thử dựa trên sự cộng tác), `coverage` (độ bao phủ), `coverage item` (mục bao phủ), `decision table testing` (kiểm thử bảng quyết định), `equivalence partitioning` (phân vùng tương đương - EP), `error guessing` (đoán lỗi), `experience-based test technique` (kỹ thuật kiểm thử dựa trên kinh nghiệm), `exploratory testing` (kiểm thử khám phá), `state transition testing` (kiểm thử chuyển đổi trạng thái), `statement coverage` (độ bao phủ câu lệnh), `test technique` (kỹ thuật kiểm thử), `white-box test technique` (kỹ thuật kiểm thử hộp trắng).

### Mục tiêu học tập Chương 4 (Learning Objectives)
- **4.1 Tổng quan về Kỹ thuật Kiểm thử (Test Techniques Overview)**
  - `FL-4.1.1 (K2)` Phân biệt các kỹ thuật kiểm thử hộp đen, kỹ thuật kiểm thử hộp trắng và kỹ thuật kiểm thử dựa trên kinh nghiệm
- **4.2 Các Kỹ thuật Kiểm thử Hộp đen (Black-box Test Techniques)**
  - `FL-4.2.1 (K3)` **Áp dụng** phân vùng tương đương (`equivalence partitioning`) để dẫn xuất các ca kiểm thử
  - `FL-4.2.2 (K3)` **Áp dụng** phân tích giá trị biên (`boundary value analysis`) để dẫn xuất các ca kiểm thử
  - `FL-4.2.3 (K3)` **Áp dụng** kiểm thử bảng quyết định (`decision table testing`) để dẫn xuất các ca kiểm thử
  - `FL-4.2.4 (K3)` **Áp dụng** kiểm thử chuyển đổi trạng thái (`state transition testing`) để dẫn xuất các ca kiểm thử
- **4.3 Các Kỹ thuật Kiểm thử Hộp trắng (White-box Test Techniques)**
  - `FL-4.3.1 (K2)` Giải thích kiểm thử câu lệnh (`statement testing`)
  - `FL-4.3.2 (K2)` Giải thích kiểm thử nhánh (`branch testing`)
  - `FL-4.3.3 (K2)` Giải thích giá trị của kiểm thử hộp trắng (`white-box testing`)
- **4.4 Các Kỹ thuật Kiểm thử Dựa trên Kinh nghiệm (Experience-based Test Techniques)**
  - `FL-4.4.1 (K2)` Giải thích kỹ thuật đoán lỗi (`error guessing`)
  - `FL-4.4.2 (K2)` Giải thích kiểm thử khám phá (`exploratory testing`)
  - `FL-4.4.3 (K2)` Giải thích kiểm thử dựa trên danh sách kiểm tra (`checklist-based testing`)
- **4.5 Các Cách tiếp cận Kiểm thử Dựa trên sự Cộng tác (Collaboration-based Test Approaches)**
  - `FL-4.5.1 (K2)` Giải thích cách viết câu chuyện người dùng (`user stories`) với sự cộng tác của lập trình viên và đại diện nghiệp vụ
  - `FL-4.5.2 (K2)` Phân loại các tùy chọn khác nhau để viết tiêu chí chấp nhận (`acceptance criteria`)
  - `FL-4.5.3 (K3)` **Áp dụng** phát triển hướng kiểm thử chấp nhận (`ATDD`) để dẫn xuất các ca kiểm thử

---

## 4.1. Tổng quan về Kỹ thuật Kiểm thử (Test Techniques Overview) `[FL-4.1.1 (K2)]`

Các kỹ thuật kiểm thử (`Test techniques`) hỗ trợ kiểm thử viên trong việc phân tích kiểm thử (`test analysis` - kiểm thử cái gì `what to test`) và trong thiết kế kiểm thử (`test design` - kiểm thử như thế nào `how to test`). Các kỹ thuật kiểm thử giúp phát triển một tập hợp các ca kiểm thử tương đối nhỏ nhưng đủ (`relatively small, but sufficient`) một cách có hệ thống. Các kỹ thuật kiểm thử cũng giúp kiểm thử viên xác định các điều kiện kiểm thử (`test conditions`), xác định các mục bao phủ (`coverage items`), và xác định dữ liệu kiểm thử (`test data`) trong quá trình phân tích và thiết kế kiểm thử. Thông tin thêm về các kỹ thuật kiểm thử có thể tìm thấy trong tiêu chuẩn ISO/IEC/IEEE 29119-4, và trong (Beizer 1990, Craig 2002, Copeland 2004, Koomen 2006, Jorgensen 2014, Ammann 2016, Forgács 2019).

Trong đề cương này, các kỹ thuật kiểm thử được phân loại thành **hộp đen (`black-box`)**, **hộp trắng (`white-box`)**, và **dựa trên kinh nghiệm (`experience-based`)**:
- **Các kỹ thuật kiểm thử hộp đen (`Black-box test techniques` - còn gọi là kỹ thuật dựa trên đặc tả `specification-based techniques`):** Dựa trên việc phân tích hành vi đã được quy định (`specified behavior`) của đối tượng kiểm thử mà không tham chiếu đến cấu trúc bên trong của nó. Do đó, các ca kiểm thử độc lập với cách phần mềm được triển khai/viết mã. Hệ quả là, nếu việc triển khai thay đổi, nhưng hành vi yêu cầu vẫn giữ nguyên, thì các ca kiểm thử đó vẫn hữu ích.
- **Các kỹ thuật kiểm thử hộp trắng (`White-box test techniques` - còn gọi là kỹ thuật dựa trên cấu trúc `structure-based techniques`):** Dựa trên việc phân tích cấu trúc bên trong và quá trình xử lý của đối tượng kiểm thử. Vì các ca kiểm thử phụ thuộc vào cách phần mềm được thiết kế, chúng chỉ có thể được tạo ra **sau khi** có thiết kế hoặc việc triển khai của đối tượng kiểm thử.
- **Các kỹ thuật kiểm thử dựa trên kinh nghiệm (`Experience-based test techniques`):** Sử dụng hiệu quả kiến thức và kinh nghiệm của kiểm thử viên để thiết kế và triển khai các ca kiểm thử. Tính hiệu quả của các kỹ thuật kiểm thử này phụ thuộc rất nhiều vào kỹ năng của kiểm thử viên. Các kỹ thuật kiểm thử dựa trên kinh nghiệm có thể phát hiện các khiếm khuyết có thể bị bỏ sót khi sử dụng kỹ thuật kiểm thử hộp đen và kỹ thuật kiểm thử hộp trắng. Do đó, các kỹ thuật kiểm thử dựa trên kinh nghiệm mang tính bổ trợ (`complementary`) cho các kỹ thuật kiểm thử hộp đen và hộp trắng.

---

## 4.2. Các Kỹ thuật Kiểm thử Hộp đen (Black-Box Test Techniques)

Các kỹ thuật kiểm thử hộp đen thường được sử dụng và thảo luận trong các phần tiếp theo là:
- Phân vùng tương đương (`Equivalence Partitioning - EP`)
- Phân tích giá trị biên (`Boundary Value Analysis - BVA`)
- Kiểm thử bảng quyết định (`Decision Table Testing`)
- Kiểm thử chuyển đổi trạng thái (`State Transition Testing`)

### 4.2.1. Phân vùng Tương đương (Equivalence Partitioning - EP) `[FL-4.2.1 (K3)]`
Phân vùng tương đương (`Equivalence Partitioning - EP`) chia dữ liệu thành các phân vùng (được gọi là các phân vùng tương đương `equivalence partitions`) dựa trên kỳ vọng rằng tất cả các phần tử của một phân vùng nhất định sẽ được xử lý theo cùng một cách bởi đối tượng kiểm thử. Lý thuyết đằng sau kỹ thuật này là nếu một ca kiểm thử, kiểm thử một giá trị từ một phân vùng tương đương, phát hiện ra một khiếm khuyết, thì khiếm khuyết này cũng sẽ được phát hiện bởi các ca kiểm thử kiểm thử bất kỳ giá trị nào khác từ cùng phân vùng đó. Do đó, **một bài kiểm thử cho mỗi phân vùng là đủ (`one test for each partition is sufficient`)**.

Các phân vùng tương đương có thể được xác định cho bất kỳ phần tử dữ liệu nào liên quan đến đối tượng kiểm thử, bao gồm đầu vào (`inputs`), đầu ra (`outputs`), các hạng mục cấu hình (`configuration items`), các giá trị nội bộ (`internal values`), các giá trị liên quan đến thời gian (`time-related values`), và các tham số giao diện (`interface parameters`). Các phân vùng có thể là liên tục hoặc rời rạc (`continuous or discrete`), có thứ tự hoặc không có thứ tự (`ordered or unordered`), hữu hạn hoặc vô hạn (`finite or infinite`). **Các phân vùng không được giao nhau/chồng lấp (`must not overlap`) và phải là các tập hợp khác rỗng (`non-empty sets`)**.

Đối với các hạng mục kiểm thử (`test items`) đơn giản, EP có thể dễ dàng, nhưng trong thực tế, việc hiểu cách đối tượng kiểm thử sẽ đối xử với các giá trị khác nhau thường phức tạp. Do đó, việc phân vùng cần được thực hiện cẩn thận.

Một phân vùng chứa các giá trị hợp lệ được gọi là **phân vùng hợp lệ (`valid partition`)**. Một phân vùng chứa các giá trị không hợp lệ được gọi là **phân vùng không hợp lệ (`invalid partition`)**. Định nghĩa về giá trị hợp lệ và không hợp lệ có thể khác nhau giữa các nhóm và tổ chức. Ví dụ, các giá trị hợp lệ có thể được hiểu là những giá trị phải được xử lý bởi đối tượng kiểm thử hoặc là những giá trị mà đặc tả có định nghĩa cách xử lý chúng. Các giá trị không hợp lệ có thể được hiểu là những giá trị phải bị bỏ qua hoặc bị từ chối bởi đối tượng kiểm thử hoặc là những giá trị mà không có cách xử lý nào được định nghĩa trong đặc tả của đối tượng kiểm thử. *(Lưu ý từ Errata v4.0.1 trang 73: các phân vùng tương đương không hợp lệ nên được kiểm thử riêng lẻ/cô lập `tested in isolation` để tránh hiện tượng che khuất khiếm khuyết `defect masking`).*

Trong EP, **các mục bao phủ (`coverage items`) chính là các phân vùng tương đương**. Để đạt được độ bao phủ 100% với kỹ thuật kiểm thử này, các ca kiểm thử phải thực thi tất cả các phân vùng đã xác định (bao gồm cả các phân vùng không hợp lệ) bằng cách bao phủ mỗi phân vùng ít nhất một lần. Công thức tính độ bao phủ:
$$\text{Coverage (\%)} = \frac{\text{Số phân vùng được thực thi bởi ít nhất 1 test case}}{\text{Tổng số phân vùng đã xác định}} \times 100\%$$

Nhiều hạng mục kiểm thử (`test items`) bao gồm nhiều tập hợp phân vùng (`multiple sets of partitions`, ví dụ: các hạng mục kiểm thử có nhiều hơn một tham số đầu vào), nghĩa là một ca kiểm thử sẽ bao phủ các phân vùng từ các tập hợp phân vùng khác nhau. Tiêu chí bao phủ đơn giản nhất trong trường hợp có nhiều tập hợp phân vùng được gọi là **Bao phủ Mỗi Lựa chọn (`Each Choice coverage`)** (Ammann 2016). `Each Choice coverage` đòi hỏi các ca kiểm thử phải thực thi mỗi phân vùng từ mỗi tập hợp phân vùng ít nhất một lần. `Each Choice coverage` không tính đến sự kết hợp (`combinations`) của các phân vùng.

### 4.2.2. Phân tích Giá trị Biên (Boundary Value Analysis - BVA) `[FL-4.2.2 (K3)]`
Phân tích giá trị biên (`Boundary Value Analysis - BVA`) là một kỹ thuật kiểm thử dựa trên việc thực thi các ranh giới/biên (`boundaries`) của các phân vùng tương đương. Do đó, **BVA chỉ có thể được sử dụng cho các phân vùng có thứ tự (`ordered partitions`)**. Giá trị nhỏ nhất (`minimum`) và lớn nhất (`maximum`) của một phân vùng là các **giá trị biên (`boundary values`)** của nó. Trong trường hợp của BVA, nếu hai phần tử thuộc cùng một phân vùng, tất cả các phần tử nằm giữa chúng cũng phải thuộc về phân vùng đó.

BVA tập trung vào các giá trị biên của các phân vùng bởi vì các lập trình viên có nhiều khả năng mắc sai sót (`errors`) hơn với các giá trị biên này. Các khiếm khuyết điển hình được tìm thấy bởi BVA nằm ở nơi các ranh giới được lập trình bị đặt sai vị trí lên trên hoặc xuống dưới so với vị trí dự kiến của chúng, hoặc bị bỏ sót hoàn toàn.

Đề cương này đề cập đến 2 phiên bản của BVA: **BVA 2 giá trị (`2-value BVA`)** và **BVA 3 giá trị (`3-value BVA`)**. Chúng khác nhau về số lượng mục bao phủ (`coverage items`) trên mỗi biên cần được thực thi để đạt độ bao phủ 100%:

- **Trong BVA 2 giá trị (`2-value BVA`)** (Craig 2002, Myers 2011): đối với mỗi giá trị biên có **2 mục bao phủ (`two coverage items`)**: chính giá trị biên này và **giá trị lân cận gần nhất của nó thuộc về phân vùng liền kề (`its closest neighbor belonging to the adjacent partition`)**. Để đạt được độ bao phủ 100% với BVA 2 giá trị, các ca kiểm thử phải thực thi tất cả các mục bao phủ, tức là tất cả các giá trị biên đã xác định. Độ bao phủ được đo bằng số lượng giá trị biên đã được thực thi, chia cho tổng số giá trị biên đã xác định, và được biểu thị bằng phần trăm.
- **Trong BVA 3 giá trị (`3-value BVA`)** (Koomen 2006, O'Regan 2019): đối với mỗi giá trị biên có **3 mục bao phủ (`three coverage items`)**: chính giá trị biên này và **cả hai giá trị lân cận hai bên của nó (`both its neighbors`)**. Do đó, trong BVA 3 giá trị, một số mục bao phủ có thể không phải là giá trị biên (mà là giá trị nằm bên trong phân vùng sát biên). Để đạt được độ bao phủ 100% với BVA 3 giá trị, các ca kiểm thử phải thực thi tất cả các mục bao phủ, tức là các giá trị biên đã xác định và các giá trị lân cận của chúng. Độ bao phủ được đo bằng số lượng giá trị biên và các giá trị lân cận của chúng được thực thi, chia cho tổng số giá trị biên đã xác định và các giá trị lân cận của chúng, và được biểu thị bằng phần trăm.

**BVA 3 giá trị chặt chẽ/nghiêm ngặt hơn (`more rigorous`) BVA 2 giá trị** vì nó có thể phát hiện ra các khiếm khuyết bị BVA 2 giá trị bỏ sót. Ví dụ: nếu câu lệnh quyết định `if (x <= 10) ...` bị lập trình sai thành `if (x = 10) ...`, không có dữ liệu kiểm thử nào dẫn xuất từ BVA 2 giá trị (`x = 10`, `x = 11`) có thể phát hiện ra khiếm khuyết này. Tuy nhiên, `x = 9`, được dẫn xuất từ BVA 3 giá trị, có khả năng phát hiện ra nó.

### 4.2.3. Kiểm thử Bảng Quyết định (Decision Table Testing) `[FL-4.2.3 (K3)]`
Bảng quyết định (`Decision tables`) được sử dụng để kiểm thử việc triển khai các yêu cầu quy định cách thức mà các tổ hợp điều kiện khác nhau (`combinations of conditions`) dẫn đến các kết quả/hành động khác nhau (`different outcomes`). Bảng quyết định là một cách hiệu quả để ghi lại các logic phức tạp, chẳng hạn như các quy tắc nghiệp vụ (`business rules`).

Khi tạo bảng quyết định, các điều kiện (`conditions`) và các hành động kết quả (`resulting actions`) của hệ thống được xác định. Chúng tạo thành các **hàng (`rows`)** của bảng. Mỗi **cột (`column`)** tương ứng với một **quy tắc quyết định (`decision rule`)** xác định một tổ hợp duy nhất của các điều kiện, cùng với các hành động đi kèm:
- **Bảng quyết định mục nhập giới hạn (`Limited-entry decision tables`):** tất cả các giá trị của điều kiện và hành động (ngoại trừ những cái không liên quan hoặc bất khả thi; xem bên dưới) được biểu thị dưới dạng giá trị Boolean (`true` hoặc `false`).
- **Bảng quyết định mục nhập mở rộng (`Extended-entry decision tables`):** một số hoặc tất cả các điều kiện và hành động cũng có thể nhận nhiều giá trị (ví dụ: các khoảng số, các phân vùng tương đương, các giá trị rời rạc).

**Ký hiệu chuẩn (`Notation`):**
- Đối với điều kiện (`Conditions`):
  - `"T"` (`true`): điều kiện được thỏa mãn.
  - `"F"` (`false`): điều kiện không được thỏa mãn.
  - `"–"`: giá trị của điều kiện không liên quan/không ảnh hưởng (`irrelevant`) đến kết quả hành động.
  - `"N/A"`: điều kiện là bất khả thi (`infeasible`) đối với một quy tắc nhất định.
- Đối với hành động (`Actions`):
  - `"X"`: hành động phải xảy ra.
  - Để trống (`Blank`): hành động không được xảy ra.
  (Các ký hiệu khác cũng có thể được sử dụng).

Một bảng quyết định đầy đủ (`full decision table`) có đủ số cột để bao phủ mọi tổ hợp điều kiện (với $n$ điều kiện Boolean sẽ có $2^n$ cột). Bảng có thể được **đơn giản hóa (`simplified`)** bằng cách xóa các cột chứa các tổ hợp điều kiện bất khả thi (`infeasible`). Bảng cũng có thể được **rút gọn/tối thiểu hóa (`minimized`/`collapsed`)** bằng cách gộp các cột mà trong đó một số điều kiện không ảnh hưởng đến kết quả thành một cột duy nhất (dùng dấu `–`). Các thuật toán tối thiểu hóa bảng quyết định nằm ngoài phạm vi của đề cương này.

Trong kiểm thử bảng quyết định, **các mục bao phủ (`coverage items`) là các cột chứa các tổ hợp điều kiện khả thi (`columns containing feasible combinations of conditions`)**. Để đạt được độ bao phủ 100% với kỹ thuật này, các ca kiểm thử phải thực thi tất cả các cột khả thi này.
$$\text{Coverage (\%)} = \frac{\text{Số cột khả thi đã được thực thi}}{\text{Tổng số cột khả thi (feasible columns)}} \times 100\%$$

Điểm mạnh của kiểm thử bảng quyết định là nó cung cấp một cách tiếp cận có hệ thống để xác định tất cả các tổ hợp điều kiện, mà một số trong đó có thể bị bỏ sót nếu làm cách khác. Nó cũng giúp tìm ra bất kỳ khoảng trống (`gaps`) hoặc sự mâu thuẫn (`contradictions`) nào trong các yêu cầu. Nếu có nhiều điều kiện, việc thực thi tất cả các quy tắc quyết định có thể tốn nhiều thời gian, vì số lượng quy tắc tăng theo cấp số nhân (`exponentially`) với số lượng điều kiện. Trong trường hợp đó, để giảm số lượng quy tắc cần thực thi, một bảng quyết định rút gọn (`minimized decision table`) hoặc một cách tiếp cận dựa trên rủi ro (`risk-based approach`) có thể được sử dụng.

### 4.2.4. Kiểm thử Chuyển đổi Trạng thái (State Transition Testing) `[FL-4.2.4 (K3)]`
Một **biểu đồ trạng thái (`state diagram`)** mô hình hóa hành vi của một hệ thống bằng cách hiển thị các trạng thái có thể có (`possible states`) và các chuyển đổi trạng thái hợp lệ (`valid state transitions`) của nó. Một sự chuyển đổi (`transition`) được khởi phát bởi một **sự kiện (`event`)**, và có thể được bổ sung điều kiện bởi một **điều kiện canh/bảo vệ (`guard condition`)**. Các chuyển đổi được giả định là tức thời và đôi khi có thể dẫn đến việc phần mềm thực hiện một **hành động (`action`)**. Cú pháp gán nhãn chuyển đổi phổ biến như sau:
`event [guard condition] / action`
Điều kiện canh (`guard conditions`) và hành động (`actions`) có thể được lược bỏ nếu chúng không tồn tại hoặc không liên quan đối với kiểm thử viên.

Một **bảng trạng thái (`state table`)** là một mô hình tương đương với biểu đồ trạng thái. Các **hàng (`rows`)** của nó đại diện cho các **trạng thái (`states`)**, và các **cột (`columns`)** của nó đại diện cho các **sự kiện (`events`** - cùng với các điều kiện canh nếu có). Các mục trong bảng (các ô - `cells`) đại diện cho các chuyển đổi (`transitions`), và chứa trạng thái đích (`target state`), cũng như các hành động kết quả nếu được định nghĩa. **Trái ngược với biểu đồ trạng thái, bảng trạng thái hiển thị rõ ràng các chuyển đổi không hợp lệ (`invalid transitions`), được biểu thị bằng các ô trống (`empty cells`)**.

Một ca kiểm thử dựa trên biểu đồ trạng thái hoặc bảng trạng thái thường được biểu diễn dưới dạng một chuỗi các sự kiện (`sequence of events`), dẫn đến một chuỗi các thay đổi trạng thái (và các hành động, nếu cần). Một ca kiểm thử có thể, và thường sẽ, bao phủ một số chuyển đổi giữa các trạng thái.

Có nhiều tiêu chí bao phủ cho kiểm thử chuyển đổi trạng thái. Đề cương này thảo luận **3 tiêu chí**:
1. **Bao phủ tất cả các trạng thái (`All states coverage`):** Các mục bao phủ là các trạng thái (`states`). Để đạt 100% `all states coverage`, các ca kiểm thử phải đảm bảo rằng tất cả các trạng thái đều được thực thi (`exercised`). Độ bao phủ được đo bằng số trạng thái đã thực thi chia cho tổng số trạng thái và biểu thị bằng phần trăm.
2. **Bao phủ các chuyển đổi hợp lệ (`Valid transitions coverage` - còn được gọi là `0-switch coverage`):** Các mục bao phủ là các chuyển đổi hợp lệ đơn lẻ (`single valid transitions`). Để đạt 100% `valid transitions coverage`, các ca kiểm thử phải thực thi tất cả các chuyển đổi hợp lệ. Độ bao phủ được đo bằng số chuyển đổi hợp lệ đã thực thi chia cho tổng số chuyển đổi hợp lệ và biểu thị bằng phần trăm.
3. **Bao phủ tất cả các chuyển đổi (`All transitions coverage`):** Các mục bao phủ là tất cả các chuyển đổi được hiển thị trong một bảng trạng thái (`state table` - gồm cả hợp lệ và không hợp lệ). Để đạt 100% `all transitions coverage`, các ca kiểm thử phải thực thi tất cả các chuyển đổi hợp lệ và cố gắng thực thi các chuyển đổi không hợp lệ (`attempt to execute invalid transitions`). Việc chỉ kiểm thử một chuyển đổi không hợp lệ trong một ca kiểm thử duy nhất giúp tránh **hiện tượng che khuất khiếm khuyết (`defect masking`)**, tức là tình huống trong đó một khiếm khuyết ngăn cản việc phát hiện ra một khiếm khuyết khác. Độ bao phủ được đo bằng số lượng chuyển đổi hợp lệ và không hợp lệ đã được thực thi hoặc cố gắng bao phủ bởi các ca kiểm thử đã chạy, chia cho tổng số chuyển đổi hợp lệ và không hợp lệ, và biểu thị bằng phần trăm.

**So sánh độ mạnh giữa 3 tiêu chí:**
- `All states coverage` yếu hơn `valid transitions coverage`, bởi vì nó thường có thể đạt được mà không cần thực thi tất cả các chuyển đổi.
- `Valid transitions coverage` (`0-switch coverage`) là tiêu chí bao phủ được sử dụng rộng rãi nhất. Đạt được 100% `valid transitions coverage` đảm bảo đạt 100% `all states coverage`.
- Đạt được 100% `all transitions coverage` đảm bảo đạt cả 100% `all states coverage` lẫn 100% `valid transitions coverage`, và nên là yêu cầu tối thiểu đối với phần mềm quan trọng về sứ mệnh và an toàn (`mission and safety-critical software`).

---

## 4.3. Các Kỹ thuật Kiểm thử Hộp trắng (White-Box Test Techniques)

Vì sự phổ biến và tính đơn giản của chúng, phần này tập trung vào hai kỹ thuật kiểm thử hộp trắng liên quan đến mã nguồn:
- Kiểm thử câu lệnh (`Statement testing`)
- Kiểm thử nhánh (`Branch testing`)

Có những kỹ thuật kiểm thử hộp trắng nghiêm ngặt hơn được sử dụng trong một số môi trường quan trọng về an toàn (`safety-critical`), sứ mệnh (`mission-critical`), hoặc độ toàn vẹn cao (`high-integrity`) để đạt được độ bao phủ mã nguồn kỹ lưỡng hơn. Cũng có các kỹ thuật kiểm thử hộp trắng được sử dụng ở các cấp độ kiểm thử cao hơn (ví dụ: kiểm thử API), hoặc sử dụng độ bao phủ không liên quan đến mã nguồn (ví dụ: độ bao phủ nơ-ron `neuron coverage` trong kiểm thử mạng nơ-ron). Các kỹ thuật này không được thảo luận trong đề cương này.

### 4.3.1. Kiểm thử Câu lệnh và Độ bao phủ Câu lệnh (Statement Testing and Statement Coverage) `[FL-4.3.1 (K2)]`
Trong kiểm thử câu lệnh (`statement testing`), **các mục bao phủ (`coverage items`) là các câu lệnh có thể thực thi (`executable statements`)**. Mục đích là thiết kế các ca kiểm thử thực thi các câu lệnh trong mã nguồn cho đến khi đạt được mức độ bao phủ chấp nhận được. Độ bao phủ được đo bằng số lượng câu lệnh được thực thi bởi các ca kiểm thử chia cho tổng số câu lệnh có thể thực thi trong mã nguồn, và được biểu thị bằng phần trăm.

Khi đạt được 100% độ bao phủ câu lệnh (`100% statement coverage`), nó đảm bảo rằng tất cả các câu lệnh có thể thực thi trong mã nguồn đã được chạy ít nhất một lần. Cụ thể, điều này có nghĩa là mỗi câu lệnh có chứa khiếm khuyết sẽ được thực thi, điều này có thể gây ra một hỏng hóc chứng minh sự hiện diện của khiếm khuyết đó. Tuy nhiên, việc thực thi một câu lệnh bằng một ca kiểm thử sẽ không phát hiện được khiếm khuyết trong mọi trường hợp. Ví dụ, nó có thể không phát hiện được các khiếm khuyết phụ thuộc vào dữ liệu (`data dependent`, ví dụ: phép chia cho số 0 chỉ bị lỗi khi mẫu số được gán bằng 0). Ngoài ra, 100% độ bao phủ câu lệnh không đảm bảo rằng tất cả logic quyết định (`decision logic`) đã được kiểm thử vì, chẳng hạn, nó có thể không thực thi tất cả các nhánh (`branches`, xem mục 4.3.2) trong mã nguồn (ví dụ: lệnh `if` không có `else`).

### 4.3.2. Kiểm thử Nhánh và Độ bao phủ Nhánh (Branch Testing and Branch Coverage) `[FL-4.3.2 (K2)]`
Một **nhánh (`branch`)** là một sự chuyển giao quyền điều khiển (`transfer of control`) giữa hai nút (`nodes`) trong đồ thị luồng điều khiển (`control flow graph`), biểu thị các trình tự có thể có mà các câu lệnh mã nguồn được thực thi trong đối tượng kiểm thử. Mỗi sự chuyển giao quyền điều khiển có thể là **vô điều kiện (`unconditional`**, tức là mã chạy thẳng `straight-line code`) hoặc **có điều kiện (`conditional`**, tức là một kết quả quyết định `decision outcome`).

Trong kiểm thử nhánh (`branch testing`), **các mục bao phủ là các nhánh (`branches`)** và mục đích là thiết kế các ca kiểm thử để thực thi các nhánh trong mã nguồn cho đến khi đạt được mức độ bao phủ chấp nhận được. Độ bao phủ được đo bằng số lượng nhánh được thực thi bởi các ca kiểm thử chia cho tổng số nhánh và được biểu thị bằng phần trăm.

Khi đạt được 100% độ bao phủ nhánh (`100% branch coverage`), tất cả các nhánh trong mã nguồn, cả vô điều kiện và có điều kiện, đều được thực thi bởi các ca kiểm thử. Các nhánh có điều kiện thường tương ứng với kết quả `true` hoặc `false` từ một quyết định `"if...then"`, một kết quả từ câu lệnh `switch/case`, hoặc một quyết định thoát hay tiếp tục trong một vòng lặp (`loop`). Tuy nhiên, việc thực thi một nhánh bằng một ca kiểm thử cũng sẽ không phát hiện được khiếm khuyết trong mọi trường hợp. Ví dụ, nó có thể không phát hiện được các khiếm khuyết đòi hỏi việc thực thi một đường dẫn (`path`) cụ thể trong mã nguồn.

**Độ bao phủ nhánh bao hàm độ bao phủ câu lệnh (`Branch coverage subsumes statement coverage`)**. Điều này có nghĩa là bất kỳ tập hợp ca kiểm thử nào đạt được **100% độ bao phủ nhánh thì chắc chắn cũng đạt được 100% độ bao phủ câu lệnh (nhưng ngược lại thì KHÔNG đúng - `not vice versa`)**.

### 4.3.3. Giá trị của Kiểm thử Hộp trắng (The Value of White-box Testing) `[FL-4.3.3 (K2)]`
- **Điểm mạnh cơ bản (`Fundamental strength`)** mà tất cả các kỹ thuật kiểm thử hộp trắng đều có chung là **toàn bộ việc triển khai phần mềm (`entire software implementation`) đều được tính đến** trong quá trình kiểm thử, điều này tạo điều kiện phát hiện khiếm khuyết ngay cả khi đặc tả phần mềm mơ hồ, lỗi thời hoặc không đầy đủ (`vague, outdated or incomplete`). *(Ví dụ: phát hiện đoạn mã độc hoặc tính năng thừa trong code mà không có trong tài liệu).*
- **Điểm yếu tương ứng (`Corresponding weakness`)** là nếu phần mềm không triển khai một hoặc nhiều yêu cầu, kiểm thử hộp trắng có thể không phát hiện được các **khiếm khuyết do bỏ sót (`defects of omission`)** đó (Watson 1996).
- Các kỹ thuật kiểm thử hộp trắng có thể được sử dụng trong kiểm thử tĩnh (ví dụ: trong quá trình chạy nháp mã nguồn `dry runs of code`). Chúng rất phù hợp để duyệt mã nguồn chưa sẵn sàng để thực thi (Hetzel 1988), mã giả (`pseudocode`) và các logic cấp cao hoặc từ trên xuống khác có thể mô hình hóa bằng đồ thị luồng điều khiển (`control flow graph`).
- Việc chỉ thực hiện kiểm thử hộp đen không cung cấp thước đo về độ bao phủ mã nguồn thực tế (`actual code coverage`). Các thước đo bao phủ hộp trắng cung cấp một phép đo khách quan (`objective measurement`) về độ bao phủ và thông tin cần thiết để cho phép tạo thêm các bài kiểm thử nhằm tăng độ bao phủ này, và từ đó làm tăng sự tự tin vào mã nguồn.

---

## 4.4. Các Kỹ thuật Kiểm thử Dựa trên Kinh nghiệm (Experience-based Test Techniques)

Các kỹ thuật kiểm thử dựa trên kinh nghiệm thường được sử dụng và thảo luận trong các phần tiếp theo là:
- Đoán lỗi (`Error guessing`)
- Kiểm thử khám phá (`Exploratory testing`)
- Kiểm thử dựa trên danh sách kiểm tra (`Checklist-based testing`)

### 4.4.1. Đoán lỗi (Error Guessing) `[FL-4.4.1 (K2)]`
Đoán lỗi (`Error guessing`) là một kỹ thuật kiểm thử được sử dụng để dự đoán sự xuất hiện của các sai sót (`errors`), khiếm khuyết (`defects`), và hỏng hóc (`failures`), dựa trên kiến thức của kiểm thử viên, bao gồm:
- Cách ứng dụng đã hoạt động trong quá khứ (`How the application has worked in the past`)
- Các loại sai sót mà lập trình viên có xu hướng mắc phải và các loại khiếm khuyết phát sinh từ những sai sót đó
- Các loại hỏng hóc đã xảy ra trong các ứng dụng khác tương tự

Nhìn chung, các sai sót, khiếm khuyết và hỏng hóc có thể liên quan đến: đầu vào (ví dụ: đầu vào đúng không được chấp nhận, tham số sai hoặc thiếu), đầu ra (ví dụ: sai định dạng, sai kết quả), logic (ví dụ: thiếu trường hợp, sai toán tử), tính toán (ví dụ: sai toán hạng, tính toán sai), giao diện (ví dụ: lệch tham số, kiểu không tương thích), hoặc dữ liệu (ví dụ: khởi tạo sai, sai kiểu).

**Tấn công lỗi (`Fault attacks`)** là một cách có phương pháp để triển khai kỹ thuật đoán lỗi. Kỹ thuật kiểm thử này đòi hỏi kiểm thử viên tạo ra hoặc thu thập một danh sách các sai sót, khiếm khuyết và hỏng hóc có thể xảy ra, và thiết kế các bài kiểm thử sẽ xác định các khiếm khuyết gắn với các sai sót đó, làm bộc lộ các khiếm khuyết, hoặc gây ra các hỏng hóc. Các danh sách này có thể được xây dựng dựa trên kinh nghiệm, dữ liệu khiếm khuyết và hỏng hóc, hoặc từ kiến thức chung về lý do tại sao phần mềm bị hỏng.

### 4.4.2. Kiểm thử Khám phá (Exploratory Testing) `[FL-4.4.2 (K2)]`
Trong kiểm thử khám phá (`exploratory testing`), các bài kiểm thử được **thiết kế, thực thi, và đánh giá đồng thời (`simultaneously designed, executed, and evaluated`)** trong khi kiểm thử viên tìm hiểu về đối tượng kiểm thử. Việc kiểm thử được sử dụng để học hỏi thêm về đối tượng kiểm thử, khám phá nó sâu hơn bằng các bài kiểm thử tập trung, và tạo ra các bài kiểm thử cho các khu vực chưa được kiểm thử.

Kiểm thử khám phá đôi khi được thực hiện bằng cách sử dụng **kiểm thử dựa trên phiên (`session-based testing`)** để cấu trúc hóa việc kiểm thử. Trong cách tiếp cận dựa trên phiên, kiểm thử khám phá được thực hiện trong một **khung thời gian cố định (`defined time box`)**. Kiểm thử viên sử dụng một **điều lệ kiểm thử (`test charter`)** chứa các mục tiêu kiểm thử để định hướng việc kiểm thử. Phiên kiểm thử thường được nối tiếp bằng một buổi **họp báo cáo kết quả (`debriefing`)** bao gồm cuộc thảo luận giữa kiểm thử viên và các bên liên quan quan tâm đến kết quả kiểm thử của phiên kiểm thử đó. Trong cách tiếp cận này, các mục tiêu kiểm thử có thể được coi như các điều kiện kiểm thử cấp cao (`high-level test conditions`). Các mục bao phủ (`coverage items`) được xác định và thực thi ngay trong phiên kiểm thử. Kiểm thử viên có thể sử dụng các bảng ghi chép phiên kiểm thử (`test session sheets`) để ghi lại các bước đã thực hiện và những khám phá đã tìm ra.

Kiểm thử khám phá rất hữu ích khi **có ít hoặc không đủ đặc tả (`few or inadequate specifications`)** hoặc có **áp lực thời gian lớn (`significant time pressure`)** đối với việc kiểm thử. Kiểm thử khám phá cũng hữu ích để bổ sung cho các kỹ thuật kiểm thử chính thức hơn khác. Kiểm thử khám phá sẽ hiệu quả hơn nếu kiểm thử viên có nhiều kinh nghiệm, có kiến thức nghiệp vụ (`domain knowledge`) và có mức độ cao về các kỹ năng thiết yếu như kỹ năng phân tích, sự tò mò và tính sáng tạo (xem mục 1.5.1).

Kiểm thử khám phá có thể kết hợp việc sử dụng các kỹ thuật kiểm thử khác (ví dụ: phân vùng tương đương).

### 4.4.3. Kiểm thử Dựa trên Danh sách Kiểm tra (Checklist-Based Testing) `[FL-4.4.3 (K2)]`
Trong kiểm thử dựa trên danh sách kiểm tra (`checklist-based testing`), kiểm thử viên thiết kế, triển khai và thực thi các bài kiểm thử để bao phủ các điều kiện kiểm thử từ một **danh sách kiểm tra (`checklist`)**. Danh sách kiểm tra có thể được xây dựng dựa trên kinh nghiệm, kiến thức về những gì quan trọng đối với người dùng, hoặc sự hiểu biết về lý do và cách thức phần mềm bị lỗi. **Danh sách kiểm tra KHÔNG NÊN chứa các mục có thể kiểm tra tự động, các mục phù hợp hơn làm tiêu chí bắt đầu (`entry criteria`), tiêu chí kết thúc (`exit criteria`), hoặc các mục quá chung chung (`too general`)** (Brykczynski 1999).

Các mục trong danh sách kiểm tra thường được diễn đạt dưới dạng một câu hỏi. Phải có khả năng kiểm tra từng mục một cách riêng biệt và trực tiếp. Các mục này có thể tham chiếu đến các yêu cầu, các thuộc tính giao diện đồ họa, các đặc tính chất lượng hoặc các hình thức điều kiện kiểm thử khác. Danh sách kiểm tra có thể được tạo ra để hỗ trợ nhiều loại kiểm thử khác nhau, bao gồm kiểm thử chức năng và phi chức năng (ví dụ: 10 nguyên tắc heuristic cho kiểm thử khả năng sử dụng của Nielsen 1994).

Một số mục trong danh sách kiểm tra có thể dần trở nên kém hiệu quả theo thời gian vì các lập trình viên sẽ học được cách tránh mắc lại cùng những sai sót đó. Các mục mới cũng có thể cần được thêm vào để phản ánh các khiếm khuyết mức độ nghiêm trọng cao mới được tìm thấy. Do đó, **danh sách kiểm tra nên được cập nhật thường xuyên** dựa trên phân tích khiếm khuyết. Tuy nhiên, cần cẩn thận để tránh làm cho danh sách kiểm tra trở nên quá dài (Gawande 2009).

Khi không có các ca kiểm thử chi tiết, kiểm thử dựa trên danh sách kiểm tra có thể cung cấp các hướng dẫn và một mức độ nhất quán nhất định cho việc kiểm thử. Nếu danh sách kiểm tra ở mức cao (`high-level`), một số sự biến thiên (`variability`) trong kiểm thử thực tế có khả năng xảy ra, dẫn đến **độ bao phủ tiềm năng lớn hơn nhưng khả năng lặp lại thấp hơn (`greater coverage but less repeatability`)**.

---

## 4.5. Các Cách tiếp cận Kiểm thử Dựa trên sự Cộng tác (Collaboration-based Test Approaches)

Mỗi kỹ thuật kiểm thử nêu trên (xem mục 4.2, 4.3, 4.4) đều có một mục tiêu cụ thể đối với việc **phát hiện khiếm khuyết (`defect detection`)**. Ngược lại, các cách tiếp cận dựa trên sự cộng tác (`collaboration-based approaches`) còn tập trung vào việc **tránh/ngăn ngừa khiếm khuyết (`defect avoidance`)** thông qua sự cộng tác và giao tiếp.

### 4.5.1. Viết Câu chuyện Người dùng Cộng tác (Collaborative User Story Writing) `[FL-4.5.1 (K2)]`
Một câu chuyện người dùng (`user story`) đại diện cho một tính năng sẽ mang lại giá trị cho người dùng hoặc người mua hệ thống/phần mềm. Các câu chuyện người dùng có ba khía cạnh quan trọng (Jeffries 2000), được gọi chung là **"3 C's"**:
- **Card (Thẻ):** phương tiện mô tả một câu chuyện người dùng (ví dụ: một thẻ giấy index, một mục trên bảng điện tử).
- **Conversation (Cuộc trò chuyện):** giải thích cách phần mềm sẽ được sử dụng (có thể được ghi thành tài liệu hoặc bằng lời nói).
- **Confirmation (Sự xác nhận):** các tiêu chí chấp nhận (`acceptance criteria`, xem mục 4.5.2).

Định dạng phổ biến nhất cho một câu chuyện người dùng là:
`"As a [role], I want [goal to be accomplished], so that I can [resulting business value for the role]"`
*(Là một [vai trò], tôi muốn [mục tiêu cần hoàn thành], để tôi có thể [giá trị kinh doanh đạt được cho vai trò đó])*, theo sau là các tiêu chí chấp nhận.

Việc cùng nhau viết câu chuyện người dùng có thể sử dụng các kỹ thuật như động não (`brainstorming`) và sơ đồ tư duy (`mind mapping`). Sự cộng tác cho phép nhóm có được tầm nhìn chung về những gì cần chuyển giao, bằng cách tính đến **ba góc nhìn (`three perspectives` - bộ ba Amigos): nghiệp vụ (`business`), phát triển (`development`) và kiểm thử (`testing`)**.

Các câu chuyện người dùng tốt nên tuân theo tiêu chuẩn **INVEST**:
- **I**ndependent (Độc lập)
- **N**egotiable (Có thể thương lượng)
- **V**aluable (Có giá trị)
- **E**stimable (Có thể ước lượng được)
- **S**mall (Nhỏ gọn)
- **T**estable (Có thể kiểm thử được)

Nếu một bên liên quan không biết cách kiểm thử một `user story`, điều này có thể chỉ ra rằng `user story` đó chưa đủ rõ ràng, hoặc nó không phản ánh điều gì đó có giá trị đối với họ, hoặc bên liên quan đó chỉ đơn giản là cần sự trợ giúp trong việc kiểm thử (Wake 2003).

### 4.5.2. Tiêu chí Chấp nhận (Acceptance Criteria) `[FL-4.5.2 (K2)]`
Các tiêu chí chấp nhận (`Acceptance criteria`) cho một `user story` là các điều kiện mà việc triển khai `user story` đó phải đáp ứng để được các bên liên quan chấp nhận. Từ góc độ này, các tiêu chí chấp nhận có thể được xem như là **các điều kiện kiểm thử (`test conditions`)** cần được thực thi bởi các bài kiểm thử. Các tiêu chí chấp nhận thường là kết quả của Cuộc trò chuyện (`Conversation`, xem mục 4.5.1).

Các tiêu chí chấp nhận được sử dụng để:
- Xác định phạm vi (`scope`) của `user story`
- Đạt được sự đồng thuận giữa các bên liên quan
- Mô tả cả các kịch bản tích cực/hợp lệ (`positive`) và tiêu cực/ngoại lệ (`negative scenarios`)
- Đóng vai trò làm cơ sở cho việc kiểm thử chấp nhận `user story` (`user story acceptance testing`, xem mục 4.5.3)
- Cho phép lập kế hoạch và ước lượng chính xác

Có một số cách để viết tiêu chí chấp nhận cho một `user story`. **Hai định dạng phổ biến nhất là:**
1. **Hướng kịch bản (`Scenario-oriented`):** ví dụ: định dạng **Given/When/Then** được sử dụng trong BDD (xem mục 2.1.3).
2. **Hướng quy tắc (`Rule-oriented`):** ví dụ: danh sách xác minh dạng gạch đầu dòng (`bullet point verification list`), hoặc dạng bảng ánh xạ đầu vào - đầu ra (`tabulated form of input-output mapping`).

Hầu hết các tiêu chí chấp nhận có thể được ghi lại theo một trong hai định dạng này. Tuy nhiên, nhóm có thể sử dụng một định dạng tùy chỉnh khác, miễn là các tiêu chí chấp nhận được định nghĩa rõ ràng và không mơ hồ (`well-defined and unambiguous`).

### 4.5.3. Phát triển Hướng Kiểm thử Chấp nhận (Acceptance Test-driven Development - ATDD) `[FL-4.5.3 (K3)]`
ATDD là một cách tiếp cận **kiểm thử trước (`test-first approach`**, xem mục 2.1.3). Các ca kiểm thử được tạo ra **trước khi** triển khai `user story`. Các ca kiểm thử được tạo ra bởi các thành viên trong nhóm với nhiều góc nhìn khác nhau, ví dụ: khách hàng, lập trình viên, và kiểm thử viên (Adzic 2009). Các ca kiểm thử có thể được thực thi thủ công hoặc tự động.

- **Bước đầu tiên** là một buổi hội thảo đặc tả (`specification workshop`), nơi `user story` và (nếu chưa được định nghĩa) các tiêu chí chấp nhận của nó được phân tích, thảo luận và viết ra bởi các thành viên trong nhóm. Sự thiếu sót, mơ hồ hoặc khiếm khuyết trong `user story` sẽ được giải quyết trong quá trình này.
- **Bước tiếp theo** là tạo ra các ca kiểm thử. Việc này có thể được thực hiện bởi cả nhóm cùng nhau hoặc bởi cá nhân kiểm thử viên. Các ca kiểm thử dựa trên các tiêu chí chấp nhận và có thể được xem như là các **ví dụ (`examples`)** về cách phần mềm hoạt động. Điều này sẽ giúp nhóm triển khai `user story` một cách chính xác.

Vì các ví dụ (`examples`) và các bài kiểm thử (`tests`) là như nhau, hai thuật ngữ này thường được sử dụng thay thế cho nhau. Trong quá trình thiết kế kiểm thử, các kỹ thuật kiểm thử được mô tả trong các mục 4.2, 4.3 và 4.4 có thể được áp dụng.

Thông thường, **các ca kiểm thử đầu tiên là tích cực (`positive`)**, xác nhận hành vi đúng mà không có ngoại lệ hoặc điều kiện lỗi, bao gồm chuỗi hoạt động được thực thi nếu mọi thứ diễn ra đúng như mong đợi. Sau khi các ca kiểm thử tích cực hoàn tất, nhóm nên thực hiện **kiểm thử tiêu cực (`negative testing`)**. Cuối cùng, nhóm cũng nên bao phủ cả **các đặc tính chất lượng phi chức năng** (ví dụ: hiệu suất hoạt động, khả năng sử dụng). Các ca kiểm thử nên được diễn đạt theo cách dễ hiểu đối với các bên liên quan. Thông thường, các ca kiểm thử chứa các câu bằng ngôn ngữ tự nhiên bao gồm các điều kiện tiên quyết cần thiết (`preconditions` - nếu có), các đầu vào (`inputs`), và các điều kiện sau (`postconditions`).

**Các ca kiểm thử phải bao phủ tất cả các đặc tính của `user story` và KHÔNG ĐƯỢC vượt ra ngoài phạm vi của `user story` đó (`should not go beyond the story`)**. Tuy nhiên, các tiêu chí chấp nhận có thể chi tiết hóa một số vấn đề được mô tả trong `user story`. Ngoài ra, không có hai ca kiểm thử nào nên mô tả cùng một đặc tính của `user story` (tránh trùng lặp).

Khi được ghi lại ở định dạng được hỗ trợ bởi một khung tự động hóa kiểm thử (`test automation framework`), các lập trình viên có thể tự động hóa các ca kiểm thử bằng cách viết mã hỗ trợ khi họ triển khai tính năng được mô tả bởi `user story`. Khi đó, các bài kiểm thử chấp nhận sẽ trở thành **các yêu cầu có thể thực thi được (`executable requirements`)**.

---

# Chương 5: Quản lý các Hoạt động Kiểm thử (Managing the Test Activities) – 335 phút

### Từ khóa (Keywords - K1)
`defect management` (quản lý khiếm khuyết), `defect report` (báo cáo khiếm khuyết), `entry criteria` (tiêu chí bắt đầu), `exit criteria` (tiêu chí kết thúc), `product risk` (rủi ro sản phẩm), `project risk` (rủi ro dự án), `risk` (rủi ro), `risk analysis` (phân tích rủi ro), `risk assessment` (đánh giá rủi ro), `risk control` (kiểm soát rủi ro), `risk identification` (nhận diện rủi ro), `risk level` (mức độ rủi ro), `risk management` (quản lý rủi ro), `risk mitigation` (giảm thiểu rủi ro), `risk monitoring` (giám sát rủi ro), `risk-based testing` (kiểm thử dựa trên rủi ro), `test approach` (cách tiếp cận kiểm thử), `test completion report` (báo cáo hoàn tất kiểm thử), `test control` (kiểm soát kiểm thử), `test monitoring` (giám sát kiểm thử), `test plan` (kế hoạch kiểm thử), `test planning` (lập kế hoạch kiểm thử), `test progress report` (báo cáo tiến độ kiểm thử), `test pyramid` (kim tự tháp kiểm thử), `test strategy` (chiến lược kiểm thử), `testing quadrants` (góc phần tư kiểm thử).

### Mục tiêu học tập Chương 5 (Learning Objectives)
- **5.1 Lập kế hoạch Kiểm thử (Test Planning)**
  - `FL-5.1.1 (K2)` Cho ví dụ về mục đích và nội dung của một kế hoạch kiểm thử (`test plan`)
  - `FL-5.1.2 (K1)` Nhận biết cách một kiểm thử viên gia tăng giá trị cho việc lập kế hoạch vòng lặp (`iteration planning`) và lập kế hoạch phát hành (`release planning`)
  - `FL-5.1.3 (K2)` So sánh và đối chiếu tiêu chí bắt đầu (`entry criteria`) và tiêu chí kết thúc (`exit criteria`)
  - `FL-5.1.4 (K3)` **Áp dụng** các kỹ thuật ước lượng (`estimation techniques`) để tính toán nỗ lực/công sức kiểm thử cần thiết
  - `FL-5.1.5 (K3)` **Áp dụng** việc sắp xếp độ ưu tiên ca kiểm thử (`test case prioritization`)
  - `FL-5.1.6 (K1)` Nhớ lại các khái niệm của kim tự tháp kiểm thử (`test pyramid`)
  - `FL-5.1.7 (K2)` Tóm tắt các góc phần tư kiểm thử (`testing quadrants`) và mối quan hệ của chúng với các cấp độ kiểm thử và các loại kiểm thử
- **5.2 Quản lý Rủi ro (Risk Management)**
  - `FL-5.2.1 (K1)` Xác định mức độ rủi ro (`risk level`) bằng cách sử dụng khả năng xảy ra rủi ro (`risk likelihood`) và mức độ tác động của rủi ro (`risk impact`)
  - `FL-5.2.2 (K2)` Phân biệt giữa rủi ro dự án (`project risks`) và rủi ro sản phẩm (`product risks`)
  - `FL-5.2.3 (K2)` Giải thích cách phân tích rủi ro sản phẩm có thể ảnh hưởng đến mức độ kỹ lưỡng (`thoroughness`) và phạm vi kiểm thử (`test scope`)
  - `FL-5.2.4 (K2)` Giải thích những biện pháp nào có thể được thực hiện để ứng phó với các rủi ro sản phẩm đã được phân tích
- **5.3 Giám sát Kiểm thử, Kiểm soát Kiểm thử và Hoàn tất Kiểm thử (Test Monitoring, Test Control and Test Completion)**
  - `FL-5.3.1 (K1)` Nhớ lại các số liệu đo lường (`metrics`) được sử dụng cho kiểm thử
  - `FL-5.3.2 (K2)` Tóm tắt mục đích, nội dung và đối tượng độc giả của các báo cáo kiểm thử (`test reports`)
  - `FL-5.3.3 (K2)` Cho ví dụ về cách truyền đạt trạng thái của kiểm thử (`status of testing`)
- **5.4 Quản lý Cấu hình (Configuration Management)**
  - `FL-5.4.1 (K2)` Tóm tắt cách quản lý cấu hình hỗ trợ cho kiểm thử
- **5.5 Quản lý Khiếm khuyết (Defect Management)**
  - `FL-5.5.1 (K3)` **Chuẩn bị** một báo cáo khiếm khuyết (`defect report`)

---

## 5.1. Lập kế hoạch Kiểm thử (Test Planning)

### 5.1.1. Mục đích và Nội dung của một Kế hoạch Kiểm thử `[FL-5.1.1 (K2)]`
Một kế hoạch kiểm thử (`test plan`) mô tả các mục tiêu kiểm thử, nguồn lực và quy trình cho một dự án kiểm thử. Một kế hoạch kiểm thử:
- Ghi lại phương tiện và lịch trình để đạt được các mục tiêu kiểm thử.
- Giúp đảm bảo rằng các hoạt động kiểm thử được thực hiện sẽ đáp ứng các tiêu chí đã thiết lập.
- Đóng vai trò là phương tiện giao tiếp với các thành viên trong nhóm và các bên liên quan khác.
- Chứng minh rằng việc kiểm thử sẽ tuân thủ chính sách kiểm thử (`test policy`) và chiến lược kiểm thử (`test strategy`) hiện hành (hoặc giải thích lý do tại sao việc kiểm thử sẽ đi chệch khỏi chúng).

Việc lập kế hoạch kiểm thử định hướng suy nghĩ của kiểm thử viên và buộc họ phải đối mặt với những thách thức trong tương lai liên quan đến rủi ro, lịch trình, con người, công cụ, chi phí, công sức, v.v. Quá trình chuẩn bị một kế hoạch kiểm thử là một cách hữu ích để suy tính kỹ lưỡng về những nỗ lực cần thiết nhằm đạt được các mục tiêu kiểm thử.

**Nội dung điển hình của một kế hoạch kiểm thử bao gồm:**
- **Ngữ cảnh của kiểm thử (`Context of testing`):** ví dụ: phạm vi kiểm thử (`test scope`), mục tiêu kiểm thử (`test objectives`), cơ sở kiểm thử (`test basis`).
- **Các giả định và ràng buộc (`Assumptions and constraints`)** của dự án kiểm thử.
- **Các bên liên quan (`Stakeholders`):** ví dụ: vai trò, trách nhiệm, sự liên quan đến kiểm thử, nhu cầu tuyển dụng và đào tạo.
- **Giao tiếp (`Communication`):** ví dụ: hình thức và tần suất giao tiếp, các biểu mẫu tài liệu (`documentation templates`).
- **Sổ đăng ký rủi ro (`Risk register`):** ví dụ: rủi ro sản phẩm, rủi ro dự án.
- **Cách tiếp cận kiểm thử (`Test approach`):** ví dụ: các cấp độ kiểm thử, các loại kiểm thử, các kỹ thuật kiểm thử, các sản phẩm bàn giao kiểm thử (`test deliverables`), tiêu chí bắt đầu và tiêu chí kết thúc, tính độc lập của kiểm thử, các số liệu đo lường (`metrics`) cần thu thập, các yêu cầu dữ liệu kiểm thử, các yêu cầu môi trường kiểm thử, những điểm sai lệch so với chính sách kiểm thử và chiến lược kiểm thử.
- **Ngân sách và lịch trình (`Budget and schedule`)**.

### 5.1.2. Đóng góp của Kiểm thử viên vào Lập kế hoạch Vòng lặp và Phát hành `[FL-5.1.2 (K1)]`
Trong các SDLC lặp (`iterative SDLCs`), thông thường có hai loại lập kế hoạch diễn ra: **lập kế hoạch phát hành (`release planning`)** và **lập kế hoạch vòng lặp (`iteration planning`)**.

- **Lập kế hoạch phát hành (`Release planning`):** Nhìn về phía trước tới đợt phát hành của một sản phẩm, định nghĩa và định nghĩa lại tồn đọng sản phẩm (`product backlog`), và có thể bao gồm việc làm mịn (`refining`) các `user stories` lớn thành một tập hợp các `user stories` nhỏ hơn. Nó cũng làm cơ sở cho cách tiếp cận kiểm thử và kế hoạch kiểm thử xuyên suốt tất cả các vòng lặp. **Kiểm thử viên tham gia vào lập kế hoạch phát hành sẽ:** tham gia viết các `user stories` có thể kiểm thử được và các tiêu chí chấp nhận (xem mục 4.5), tham gia phân tích rủi ro dự án và rủi ro chất lượng (xem mục 5.2), ước lượng công sức kiểm thử gắn với các `user stories` (xem mục 5.1.4), xác định cách tiếp cận kiểm thử, và lập kế hoạch kiểm thử cho đợt phát hành.
- **Lập kế hoạch vòng lặp (`Iteration planning`):** Nhìn về phía trước tới cuối một vòng lặp đơn lẻ và quan tâm đến tồn đọng của vòng lặp (`iteration backlog`). **Kiểm thử viên tham gia vào lập kế hoạch vòng lặp sẽ:** tham gia vào việc phân tích rủi ro chi tiết của các `user stories`, xác định khả năng kiểm thử (`testability`) của các `user stories`, phân rã các `user stories` thành các công việc (`tasks` - đặc biệt là các công việc kiểm thử), ước lượng công sức kiểm thử cho tất cả các công việc kiểm thử, và xác định cũng như làm mịn các khía cạnh chức năng và phi chức năng của đối tượng kiểm thử.

### 5.1.3. Tiêu chí Bắt đầu và Tiêu chí Kết thúc (Entry Criteria and Exit Criteria) `[FL-5.1.3 (K2)]`
- **Tiêu chí bắt đầu (`Entry criteria`)** định nghĩa các điều kiện tiên quyết (`preconditions`) để tiến hành một hoạt động nhất định. Nếu các tiêu chí bắt đầu không được đáp ứng, rất có khả năng hoạt động đó sẽ trở nên khó khăn hơn, tốn thời gian hơn, đắt đỏ hơn và rủi ro hơn.
- **Tiêu chí kết thúc (`Exit criteria`)** định nghĩa những gì phải đạt được để tuyên bố một hoạt động đã hoàn tất. Tiêu chí bắt đầu và tiêu chí kết thúc cần được định nghĩa cho mỗi cấp độ kiểm thử, và sẽ khác nhau tùy theo mục tiêu kiểm thử.

**Các tiêu chí bắt đầu (`entry criteria`) điển hình bao gồm:**
- Sự sẵn có của các nguồn lực (ví dụ: nhân sự, công cụ, môi trường, dữ liệu kiểm thử, ngân sách, thời gian).
- Sự sẵn có của `testware` (ví dụ: cơ sở kiểm thử, các yêu cầu có thể kiểm thử được, `user stories`, các ca kiểm thử).
- Mức chất lượng ban đầu của một đối tượng kiểm thử (ví dụ: tất cả các bài kiểm thử khói `smoke tests` đều đã vượt qua `passed`).

**Các tiêu chí kết thúc (`exit criteria`) điển hình bao gồm:**
- Các thước đo về mức độ kỹ lưỡng (`measures of thoroughness`, ví dụ: mức độ bao phủ đạt được, số lượng khiếm khuyết chưa được giải quyết, mật độ khiếm khuyết `defect density`, số lượng ca kiểm thử bị thất bại).
- Các tiêu chí "có/không" nhị phân (`binary "yes/no" criteria` / `completion criteria`, ví dụ: các bài kiểm thử theo kế hoạch đã được thực thi, kiểm thử tĩnh đã được thực hiện, tất cả các khiếm khuyết tìm thấy đã được báo cáo, tất cả các bài kiểm thử hồi quy đã được tự động hóa).

**Việc hết thời gian hoặc cạn ngân sách (`Running out of time or budget`) cũng có thể được xem là các tiêu chí kết thúc hợp lệ (`valid exit criteria`)**. Ngay cả khi các tiêu chí kết thúc khác chưa được thỏa mãn, việc dừng kiểm thử trong những hoàn cảnh như vậy vẫn có thể chấp nhận được, nếu các bên liên quan đã rà soát và chấp nhận rủi ro khi đưa sản phẩm vào vận hành (`go live`) mà không kiểm thử thêm.

Trong phát triển phần mềm Agile:
- Tiêu chí kết thúc thường được gọi là **Định nghĩa sự Hoàn thành (`Definition of Done - DoD`)**, xác định các chỉ số khách quan của nhóm đối với một hạng mục có thể phát hành được.
- Tiêu chí bắt đầu mà một `user story` phải đáp ứng để bắt đầu các hoạt động phát triển và/hoặc kiểm thử được gọi là **Định nghĩa sự Sẵn sàng (`Definition of Ready - DoR`)**.

### 5.1.4. Các Kỹ thuật Ước lượng (Estimation Techniques) `[FL-5.1.4 (K3)]`
Ước lượng công sức kiểm thử (`Test effort estimation`) bao gồm việc dự đoán khối lượng công việc liên quan đến kiểm thử cần thiết để đáp ứng các mục tiêu kiểm thử của một dự án kiểm thử. Điều quan trọng là phải làm rõ cho các bên liên quan biết rằng bản ước lượng được dựa trên một số giả định và luôn chịu sai số ước lượng (`estimation error`). Việc ước lượng cho các công việc nhỏ thường chính xác hơn so với các công việc lớn. Do đó, khi ước lượng một công việc lớn, nó có thể được phân rã thành một tập hợp các công việc nhỏ hơn để từ đó có thể ước lượng từng công việc nhỏ.

Trong đề cương này, **4 kỹ thuật ước lượng** (chia làm 2 nhóm: *dựa trên số liệu `metrics-based`* và *dựa trên chuyên gia `expert-based`*) được mô tả:

1. **Ước lượng dựa trên tỷ lệ (`Estimation based on ratios` - *Metrics-based*):** Trong kỹ thuật dựa trên số liệu này, các con số được thu thập từ các dự án trước đó trong tổ chức, giúp có thể rút ra các tỷ lệ "chuẩn" (`"standard" ratios`) cho các dự án tương tự. Tỷ lệ từ chính các dự án của tổ chức (ví dụ: lấy từ dữ liệu lịch sử) nhìn chung là nguồn tốt nhất để sử dụng trong quá trình ước lượng. Các tỷ lệ chuẩn này sau đó có thể được dùng để ước lượng công sức kiểm thử cho dự án mới.
   - *Ví dụ tính toán (K3):* Nếu ở dự án trước tỷ lệ công sức phát triển so với kiểm thử (`development-to-test effort ratio`) là `3:2`, và trong dự án hiện tại công sức phát triển dự kiến là `600 ngày-người (person-days)`, thì công sức kiểm thử có thể được ước lượng là: $600 \times \frac{2}{3} = 400\text{ person-days}$.
2. **Ngoại suy (`Extrapolation` - *Metrics-based*):** Trong kỹ thuật dựa trên số liệu này, các phép đo được thực hiện càng sớm càng tốt trong dự án hiện tại để thu thập dữ liệu. Khi đã có đủ các quan sát, công sức cần thiết cho phần công việc còn lại có thể được tính xấp xỉ bằng cách ngoại suy dữ liệu này (thường bằng cách áp dụng một mô hình toán học). Phương pháp này rất phù hợp trong các SDLC lặp (`iterative SDLCs`).
   - *Ví dụ tính toán (K3):* Nhóm có thể ngoại suy công sức kiểm thử trong vòng lặp sắp tới bằng trung bình cộng công sức của 3 vòng lặp gần nhất.
3. **Wideband Delphi (*Expert-based*):** Trong kỹ thuật lặp, dựa trên chuyên gia này, các chuyên gia đưa ra các ước lượng dựa trên kinh nghiệm. Mỗi chuyên gia, một cách độc lập/cô lập (`in isolation`), ước lượng công sức. Kết quả được thu thập lại và nếu có những sai lệch trong ước lượng của một chuyên gia vượt ra ngoài phạm vi ranh giới đã thỏa thuận, các chuyên gia sẽ thảo luận về các ước lượng hiện tại của họ. Mỗi chuyên gia sau đó được yêu cầu đưa ra một ước lượng mới dựa trên phản hồi đó, một lần nữa trong sự cô lập (`in isolation`). Quy trình này được lặp lại cho đến khi đạt được sự đồng thuận (`consensus`). **Planning Poker** là một biến thể của Wideband Delphi, thường được sử dụng trong Agile, trong đó các ước lượng thường được thực hiện bằng cách sử dụng các lá bài có ghi số đại diện cho kích thước công sức.
4. **Ước lượng ba điểm (`Three-point estimation` - *Expert-based*):** Trong kỹ thuật dựa trên chuyên gia này, ba con số ước lượng được đưa ra bởi các chuyên gia:
   - Ước lượng lạc quan nhất (`most optimistic estimation`): $a$
   - Ước lượng có khả năng xảy ra nhất (`most likely estimation`): $m$
   - Ước lượng bi quan nhất (`most pessimistic estimation`): $b$
   Ước lượng cuối cùng ($E$) là trung bình cộng có trọng số của chúng. Trong phiên bản phổ biến nhất của kỹ thuật này, ước lượng và sai số đo lường (độ lệch chuẩn $SD$) được tính theo công thức:
   $$E = \frac{a + 4m + b}{6} \quad ; \quad SD = \frac{b - a}{6}$$
   - *Ví dụ tính toán (K3):* Nếu các ước lượng (tính theo giờ-người `person-hours`) là $a = 6$, $m = 9$ và $b = 18$, thì ước lượng cuối cùng là $10 \pm 2\text{ person-hours}$ (tức là nằm trong khoảng từ $8$ đến $12\text{ person-hours}$), bởi vì:
     $$E = \frac{6 + 4 \times 9 + 18}{6} = 10 \quad \text{và} \quad SD = \frac{18 - 6}{6} = 2$$

### 5.1.5. Sắp xếp Độ ưu tiên Ca kiểm thử (Test Case Prioritization) `[FL-5.1.5 (K3)]`
Một khi các ca kiểm thử và các thủ tục kiểm thử được quy định và tập hợp thành các bộ kiểm thử (`test suites`), các bộ kiểm thử này có thể được sắp xếp vào một lịch trình thực thi kiểm thử (`test execution schedule`) xác định thứ tự mà chúng sẽ được chạy. Khi sắp xếp độ ưu tiên cho các ca kiểm thử, nhiều yếu tố khác nhau có thể được tính đến. **3 chiến lược sắp xếp độ ưu tiên ca kiểm thử phổ biến nhất là:**
1. **Sắp xếp độ ưu tiên dựa trên rủi ro (`Risk-based prioritization`):** thứ tự thực thi kiểm thử dựa trên kết quả của việc phân tích rủi ro (xem mục 5.2.3). Các ca kiểm thử bao phủ các rủi ro quan trọng nhất sẽ được thực thi trước.
2. **Sắp xếp độ ưu tiên dựa trên độ bao phủ (`Coverage-based prioritization`):** thứ tự thực thi kiểm thử dựa trên độ bao phủ (ví dụ: độ bao phủ câu lệnh). Các ca kiểm thử đạt được độ bao phủ cao nhất được thực thi trước. Trong một biến thể khác, được gọi là **sắp xếp độ ưu tiên độ bao phủ bổ sung (`additional coverage prioritization`)**, ca kiểm thử đạt độ bao phủ cao nhất được thực thi đầu tiên; mỗi ca kiểm thử tiếp theo là ca kiểm thử đạt được **độ bao phủ tăng thêm (`additional coverage`)** cao nhất so với những gì đã được bao phủ trước đó.
3. **Sắp xếp độ ưu tiên dựa trên yêu cầu (`Requirements-based prioritization`):** thứ tự thực thi kiểm thử dựa trên độ ưu tiên của các yêu cầu được truy vết ngược về các ca kiểm thử tương ứng. Độ ưu tiên của yêu cầu được xác định bởi các bên liên quan. Các ca kiểm thử liên quan đến các yêu cầu quan trọng nhất được thực thi trước.

Lý tưởng nhất, các ca kiểm thử sẽ được sắp xếp để chạy dựa trên mức độ ưu tiên của chúng. Tuy nhiên, thực hành này có thể không hoạt động nếu các ca kiểm thử hoặc các tính năng đang được kiểm thử có **sự phụ thuộc lẫn nhau (`dependencies`)**. **Nếu một ca kiểm thử có độ ưu tiên cao hơn lại phụ thuộc vào một ca kiểm thử có độ ưu tiên thấp hơn, thì ca kiểm thử có độ ưu tiên thấp hơn đó PHẢI được thực thi trước.**

Thứ tự thực thi kiểm thử cũng phải tính đến **sự sẵn có của các nguồn lực (`availability of resources`)** (ví dụ: công cụ kiểm thử, môi trường kiểm thử hoặc nhân sự chỉ sẵn sàng trong một khung thời gian cụ thể).

### 5.1.6. Kim tự tháp Kiểm thử (Test Pyramid) `[FL-5.1.6 (K1)]`
Kim tự tháp kiểm thử (`Test pyramid`) là một mô hình cho thấy các bài kiểm thử khác nhau có thể có **độ mịn/chi tiết (`granularity`)** khác nhau. Mô hình kim tự tháp kiểm thử hỗ trợ nhóm trong việc tự động hóa kiểm thử và phân bổ công sức kiểm thử bằng cách chỉ ra rằng các mục tiêu kiểm thử khác nhau được hỗ trợ bởi các mức độ tự động hóa kiểm thử khác nhau. Các tầng của kim tự tháp đại diện cho các nhóm bài kiểm thử:
- **Tầng càng lên cao (`The higher the layer`):** độ mịn kiểm thử càng thấp (`lower test granularity` - tức là kiểm thử khối lớn hơn), độ cô lập kiểm thử càng thấp (`lower test isolation` - tức là mức độ phụ thuộc vào các phần tử khác của hệ thống cao hơn) và thời gian thực thi kiểm thử càng cao/chậm hơn (`higher test execution time`).
- **Tầng đáy (`Bottom layer`):** Các bài kiểm thử nhỏ, cô lập, nhanh, và kiểm tra một phần nhỏ chức năng, vì vậy thường cần số lượng lớn chúng để đạt được độ bao phủ hợp lý.
- **Tầng đỉnh (`Top layer`):** Đại diện cho các bài kiểm thử phức tạp, cấp cao, đầu-cuối (`end-to-end tests`). Các bài kiểm thử cấp cao này nhìn chung chậm hơn so với các bài kiểm thử ở các tầng thấp hơn, và chúng thường kiểm tra một phần lớn chức năng, vì vậy thường chỉ cần một số lượng ít chúng để đạt được mức độ bao phủ hợp lý.

Số lượng và cách đặt tên các tầng có thể khác nhau. Ví dụ: mô hình kim tự tháp kiểm thử gốc của Cohn (2009) định nghĩa 3 tầng từ dưới lên: `"unit tests"`, `"service tests"` và `"UI tests"`. Một mô hình phổ biến khác định nghĩa: `unit (component) tests`, `integration (component integration) tests`, và `end-to-end tests`.

### 5.1.7. Các Góc phần tư Kiểm thử (Testing Quadrants) `[FL-5.1.7 (K2)]`
Các góc phần tư kiểm thử (`Testing quadrants`), được định nghĩa bởi Brian Marick (Marick 2003, Crispin 2008), nhóm các cấp độ kiểm thử với các loại kiểm thử, hoạt động, kỹ thuật kiểm thử và sản phẩm công việc phù hợp trong phát triển phần mềm Agile. Mô hình này hỗ trợ quản lý kiểm thử trong việc trực quan hóa chúng để đảm bảo rằng tất cả các loại kiểm thử và cấp độ kiểm thử phù hợp đều được đưa vào SDLC.

Trong mô hình này, các bài kiểm thử có thể **hướng nghiệp vụ (`business facing`)** hoặc **hướng công nghệ (`technology facing`)**. Các bài kiểm thử cũng có thể **hỗ trợ nhóm (`support the team` - tức là định hướng phát triển)** hoặc **phê bình/đánh giá sản phẩm (`critique the product` - tức là đo lường hành vi của nó so với kỳ vọng)**. Sự kết hợp của hai góc nhìn này xác định **4 góc phần tư**:
- **Góc phần tư Q1 (`Quadrant Q1` - hướng công nghệ `technology facing`, hỗ trợ nhóm `support the team`):** Chứa kiểm thử thành phần (`component tests`) và kiểm thử tích hợp thành phần (`component integration tests`). Các bài kiểm thử này nên được **tự động hóa** và đưa vào quy trình CI.
- **Góc phần tư Q2 (`Quadrant Q2` - hướng nghiệp vụ `business facing`, hỗ trợ nhóm `support the team`):** Chứa các bài kiểm thử chức năng (`functional tests`), các ví dụ (`examples`), kiểm thử `user story`, nguyên mẫu trải nghiệm người dùng (`user experience prototypes`), kiểm thử API (`API testing`), và các mô phỏng (`simulations`). Các bài kiểm thử này kiểm tra các tiêu chí chấp nhận và có thể là **thủ công hoặc tự động**.
- **Góc phần tư Q3 (`Quadrant Q3` - hướng nghiệp vụ `business facing`, phê bình sản phẩm `critique the product`):** Chứa kiểm thử khám phá (`exploratory testing`), kiểm thử khả năng sử dụng (`usability testing`), kiểm thử chấp nhận người dùng (`user acceptance testing - UAT`). Các bài kiểm thử này hướng tới người dùng và **thường là thủ công (`often manual`)**.
- **Góc phần tư Q4 (`Quadrant Q4` - hướng công nghệ `technology facing`, phê bình sản phẩm `critique the product`):** Chứa kiểm thử khói (`smoke tests`) và các bài kiểm thử phi chức năng (`non-functional tests` - **ngoại trừ kiểm thử khả năng sử dụng `except usability tests`** vì usability nằm ở Q3). Các bài kiểm thử này **thường được tự động hóa (`often automated`)**.

---

## 5.2. Quản lý Rủi ro (Risk Management)

Các hoạt động quản lý rủi ro chính là:
- **Phân tích rủi ro (`Risk analysis`):** bao gồm **nhận diện rủi ro (`risk identification`)** và **đánh giá rủi ro (`risk assessment`)** (xem mục 5.2.3).
- **Kiểm soát rủi ro (`Risk control`):** bao gồm **giảm thiểu rủi ro (`risk mitigation`)** và **giám sát rủi ro (`risk monitoring`)** (xem mục 5.2.4).

Cách tiếp cận kiểm thử mà trong đó các hoạt động kiểm thử được lựa chọn, sắp xếp độ ưu tiên và quản lý dựa trên phân tích rủi ro và kiểm soát rủi ro được gọi là **kiểm thử dựa trên rủi ro (`risk-based testing`)**.

### 5.2.1. Định nghĩa Rủi ro và các Thuộc tính của Rủi ro `[FL-5.2.1 (K1)]`
Rủi ro (`Risk`) là một sự kiện, mối nguy, mối đe dọa hoặc tình huống tiềm ẩn mà nếu xảy ra sẽ gây ra một hệ quả bất lợi (`adverse effect`). Một rủi ro được đặc trưng bởi **hai yếu tố**:
- **Khả năng xảy ra rủi ro (`Risk likelihood`):** xác suất xảy ra rủi ro (lớn hơn 0 và nhỏ hơn 1: $0 < \text{likelihood} < 1$).
- **Mức độ tác động của rủi ro (`Risk impact` / `harm`):** hậu quả của việc rủi ro đó xảy ra.

Hai yếu tố này biểu thị **mức độ rủi ro (`risk level`)**, là thước đo cho rủi ro. Mức độ rủi ro càng cao thì việc xử lý nó càng quan trọng.

### 5.2.2. Rủi ro Dự án và Rủi ro Sản phẩm `[FL-5.2.2 (K2)]`
Trong kiểm thử phần mềm, người ta thường quan tâm đến hai loại rủi ro: **rủi ro dự án (`project risks`)** và **rủi ro sản phẩm (`product risks`)**.

1. **Rủi ro dự án (`Project risks`):** Liên quan đến việc quản lý và kiểm soát dự án. Rủi ro dự án bao gồm:
   - **Vấn đề tổ chức (`Organizational issues`):** ví dụ: chậm trễ trong việc bàn giao sản phẩm công việc, ước lượng không chính xác, cắt giảm chi phí.
   - **Vấn đề con người (`People issues`):** ví dụ: kỹ năng không đủ, xung đột, vấn đề giao tiếp, thiếu hụt nhân sự.
   - **Vấn đề kỹ thuật (`Technical issues`):** ví dụ: phình phạm vi yêu cầu (`scope creep`), hỗ trợ công cụ kém.
   - **Vấn đề nhà cung cấp (`Supplier issues`):** ví dụ: bên thứ ba giao hàng thất bại, công ty hỗ trợ bị phá sản.
   Khi xảy ra, rủi ro dự án có thể tác động đến lịch trình, ngân sách hoặc phạm vi của dự án, làm ảnh hưởng đến khả năng đạt được các mục tiêu của dự án.

2. **Rủi ro sản phẩm (`Product risks`):** Liên quan đến các đặc tính chất lượng của sản phẩm (ví dụ: được mô tả trong mô hình chất lượng ISO 25010). Ví dụ về rủi ro sản phẩm bao gồm: thiếu hoặc sai chức năng, tính toán sai, lỗi thời gian chạy (`runtime errors`), kiến trúc kém, thuật toán kém hiệu quả, thời gian phản hồi không đạt yêu cầu, trải nghiệm người dùng kém, lỗ hổng bảo mật. Khi xảy ra, rủi ro sản phẩm có thể dẫn đến nhiều hậu quả tiêu cực khác nhau, bao gồm:
   - Sự không hài lòng của người dùng (`User dissatisfaction`)
   - Mất doanh thu, uy tín, danh tiếng
   - Thiệt hại cho bên thứ ba
   - Chi phí bảo trì cao, quá tải bộ phận hỗ trợ (`help desk`)
   - Bị phạt hình sự (`Criminal penalties`)
   - Trong trường hợp cực đoan: thiệt hại vật chất, thương tích hoặc thậm chí tử vong.

### 5.2.3. Phân tích Rủi ro Sản phẩm (Product Risk Analysis) `[FL-5.2.3 (K2)]`
Từ góc độ kiểm thử, mục tiêu của phân tích rủi ro sản phẩm là cung cấp nhận thức về rủi ro sản phẩm nhằm tập trung công sức kiểm thử theo cách giảm thiểu mức độ rủi ro sản phẩm còn lại (`residual level of product risk`). Lý tưởng nhất, phân tích rủi ro sản phẩm bắt đầu sớm trong SDLC.

Phân tích rủi ro sản phẩm bao gồm **nhận diện rủi ro (`risk identification`)** và **đánh giá rủi ro (`risk assessment`)**:
- **Nhận diện rủi ro** là việc tạo ra một danh sách toàn diện các rủi ro bằng các kỹ thuật như động não (`brainstorming`), hội thảo (`workshops`), phỏng vấn (`interviews`), hoặc biểu đồ nhân quả (`cause-effect diagrams`).
- **Đánh giá rủi ro** bao gồm: phân loại các rủi ro đã xác định, xác định khả năng xảy ra (`likelihood`), mức độ tác động (`impact`) và mức độ rủi ro (`risk level`), sắp xếp độ ưu tiên, và đề xuất các cách xử lý chúng. Trong cách tiếp cận định lượng (`quantitative`), mức độ rủi ro được tính bằng phép nhân giữa `risk likelihood` và `risk impact`. Trong cách tiếp cận định tính (`qualitative`), mức độ rủi ro có thể được xác định bằng ma trận rủi ro (`risk matrix`).

**Kết quả phân tích rủi ro sản phẩm ảnh hưởng đến mức độ kỹ lưỡng (`thoroughness`) và phạm vi kiểm thử (`test scope`), được dùng để:**
- Xác định phạm vi kiểm thử cần thực hiện
- Xác định các cấp độ kiểm thử cụ thể và đề xuất các loại kiểm thử cần thực hiện
- Xác định các kỹ thuật kiểm thử cần áp dụng và mức độ bao phủ cần đạt được
- Ước lượng công sức kiểm thử cần thiết cho mỗi nhiệm vụ
- Sắp xếp độ ưu tiên kiểm thử nhằm cố gắng tìm ra các khiếm khuyết nghiêm trọng càng sớm càng tốt
- Xác định xem có bất kỳ hoạt động nào ngoài kiểm thử có thể được sử dụng để giảm rủi ro hay không.

### 5.2.4. Kiểm soát Rủi ro Sản phẩm (Product Risk Control) `[FL-5.2.4 (K2)]`
Kiểm soát rủi ro sản phẩm bao gồm tất cả các biện pháp được thực hiện để ứng phó với các rủi ro sản phẩm đã được xác định và đánh giá. Kiểm soát rủi ro sản phẩm bao gồm **giảm thiểu rủi ro (`risk mitigation`)** và **giám sát rủi ro (`risk monitoring`)**.

Một khi rủi ro đã được phân tích, có một số tùy chọn ứng phó với rủi ro: **giảm thiểu rủi ro bằng kiểm thử (`risk mitigation by testing`)**, **chấp nhận rủi ro (`risk acceptance`)**, **chuyển giao rủi ro (`risk transfer`)**, hoặc **kế hoạch dự phòng (`contingency plan`)**.

**Các hành động có thể thực hiện để giảm thiểu rủi ro sản phẩm bằng kiểm thử là:**
- Chọn các kiểm thử viên có mức độ kinh nghiệm và kỹ năng phù hợp với loại rủi ro đó
- Áp dụng một mức độ độc lập kiểm thử phù hợp
- Thực hiện các buổi duyệt (`reviews`) và phân tích tĩnh (`static analysis`)
- Áp dụng các kỹ thuật kiểm thử và mức độ bao phủ phù hợp
- Áp dụng các loại kiểm thử phù hợp giải quyết các đặc tính chất lượng bị ảnh hưởng
- Thực hiện kiểm thử động, bao gồm cả kiểm thử hồi quy.

---

## 5.3. Giám sát Kiểm thử, Kiểm soát Kiểm thử và Hoàn tất Kiểm thử

- **Giám sát kiểm thử (`Test monitoring`):** Thu thập thông tin về kiểm thử để đánh giá tiến độ kiểm thử và đo lường xem các tiêu chí kết thúc đã được thỏa mãn hay chưa.
- **Kiểm soát kiểm thử (`Test control`):** Sử dụng thông tin từ giám sát kiểm thử để đưa ra, dưới dạng các chỉ thị kiểm soát (`control directives`), sự hướng dẫn và các hành động khắc phục cần thiết. **Ví dụ về các chỉ thị kiểm soát (`control directives`) bao gồm:**
  - Sắp xếp lại độ ưu tiên các bài kiểm thử khi một rủi ro đã xác định biến thành vấn đề thực tế (`issue`).
  - Đánh giá lại xem một hạng mục kiểm thử có đáp ứng tiêu chí bắt đầu hoặc kết thúc hay không do phải làm lại (`rework`).
  - Điều chỉnh lịch trình kiểm thử để giải quyết sự chậm trễ trong việc bàn giao môi trường kiểm thử.
  - Bổ sung thêm nguồn lực mới khi cần và ở nơi cần thiết.
- **Hoàn tất kiểm thử (`Test completion`):** Thu thập dữ liệu từ các hoạt động kiểm thử đã hoàn thành để củng cố kinh nghiệm, `testware` và các thông tin liên quan khác; diễn ra tại các cột mốc dự án (hoàn thành một cấp độ kiểm thử, kết thúc một vòng lặp Agile, hoàn thành/hủy bỏ dự án kiểm thử, phát hành hệ thống, hoặc hoàn thành một đợt phát hành bảo trì).

### 5.3.1. Các Số liệu Đo lường được sử dụng trong Kiểm thử (Metrics used in Testing) `[FL-5.3.1 (K1)]`
Các số liệu kiểm thử (`Test metrics`) phổ biến bao gồm **7 nhóm**:
1. **Số liệu tiến độ dự án (`Project progress metrics`):** ví dụ: mức độ hoàn thành công việc (`task completion`), mức sử dụng nguồn lực, công sức kiểm thử (`test effort`).
2. **Số liệu tiến độ kiểm thử (`Test progress metrics`):** ví dụ: tiến độ triển khai ca kiểm thử, tiến độ chuẩn bị môi trường kiểm thử, số lượng ca kiểm thử đã chạy/chưa chạy (`run/not run`), đạt/trượt (`passed/failed`), thời gian thực thi kiểm thử.
3. **Số liệu chất lượng sản phẩm (`Product quality metrics`):** ví dụ: tính sẵn sàng (`availability`), thời gian phản hồi (`response time`), thời gian trung bình đến khi hỏng (`mean time to failure - MTTF`).
4. **Số liệu khiếm khuyết (`Defect metrics`):** ví dụ: số lượng và độ ưu tiên của các khiếm khuyết tìm thấy/đã sửa, mật độ khiếm khuyết (`defect density`), tỷ lệ phần trăm phát hiện khiếm khuyết (`defect detection percentage - DDP`).
5. **Số liệu rủi ro (`Risk metrics`):** ví dụ: mức độ rủi ro còn lại (`residual risk level`).
6. **Số liệu độ bao phủ (`Coverage metrics`):** ví dụ: độ bao phủ yêu cầu (`requirements coverage`), độ bao phủ mã nguồn (`code coverage`).
7. **Số liệu chi phí (`Cost metrics`):** ví dụ: chi phí kiểm thử (`cost of testing`), chi phí chất lượng của tổ chức (`organizational cost of quality`).

### 5.3.2. Mục đích, Nội dung và Độc giả của Báo cáo Kiểm thử `[FL-5.3.2 (K2)]`
Có hai loại báo cáo chính:
1. **Báo cáo tiến độ kiểm thử (`Test progress reports` - còn gọi là `test status reports`):** Được tạo định kỳ (hàng ngày, hàng tuần...) để hỗ trợ kiểm soát kiểm thử liên tục, bao gồm:
   - Kỳ kiểm thử (`Testing period`)
   - Tiến độ kiểm thử (vượt hay chậm tiến độ), bao gồm các sai lệch đáng chú ý
   - Các trở ngại đối với kiểm thử (`Impediments for testing`), và các cách khắc phục tạm thời (`workarounds`)
   - Các số liệu kiểm thử (`Test metrics`)
   - Các rủi ro mới và rủi ro thay đổi trong kỳ kiểm thử
   - Công việc kiểm thử dự kiến cho kỳ tiếp theo (`Testing planned for the next period`).
2. **Báo cáo hoàn tất kiểm thử (`Test completion report`):** Được chuẩn bị một lần khi một dự án, cấp độ kiểm thử hoặc loại kiểm thử hoàn tất và đạt tiêu chí kết thúc, bao gồm:
   - Tóm tắt kiểm thử (`Test summary`)
   - Đánh giá kiểm thử và chất lượng sản phẩm dựa trên kế hoạch kiểm thử ban đầu (mục tiêu và tiêu chí kết thúc)
   - Các sai lệch so với kế hoạch kiểm thử (lịch trình, thời lượng, công sức)
   - Các trở ngại kiểm thử và cách khắc phục tạm thời
   - Các số liệu kiểm thử dựa trên các báo cáo tiến độ
   - Các rủi ro chưa được giảm thiểu (`Unmitigated risks`), các khiếm khuyết chưa được sửa (`defects not fixed`)
   - Các bài học kinh nghiệm (`Lessons learned`) liên quan đến kiểm thử.

### 5.3.3. Truyền đạt Trạng thái của Kiểm thử `[FL-5.3.3 (K2)]`
Các tùy chọn truyền đạt trạng thái kiểm thử bao gồm:
- Giao tiếp bằng lời nói (`Verbal communication`) với các thành viên trong nhóm và các bên liên quan khác
- Bảng thông tin (`Dashboards`, ví dụ: bảng CI/CD, bảng công việc `task boards`, và biểu đồ `burn-down charts`)
- Kênh giao tiếp điện tử (ví dụ: email, chat)
- Tài liệu trực tuyến (`Online documentation`)
- Các báo cáo kiểm thử chính thức (`Formal test reports`).

---

## 5.4. Quản lý Cấu hình (Configuration Management - CM) `[FL-5.4.1 (K2)]`

Trong kiểm thử, quản lý cấu hình (`Configuration management - CM`) cung cấp một kỷ luật để xác định, kiểm soát và theo dõi các sản phẩm công việc (như kế hoạch kiểm thử, chiến lược kiểm thử, điều kiện kiểm thử, ca kiểm thử, kịch bản kiểm thử, kết quả kiểm thử, nhật ký kiểm thử và báo cáo kiểm thử) như là các **hạng mục cấu hình (`configuration items`)**.

Nếu hạng mục cấu hình được phê duyệt để kiểm thử, nó sẽ trở thành một **đường cơ sở (`baseline`)** và chỉ có thể được thay đổi thông qua một quy trình kiểm soát thay đổi chính thức (`formal change control process`). Luôn có thể quay trở lại (`revert`) một `baseline` trước đó để tái hiện lại các kết quả kiểm thử trước đó.

Để hỗ trợ kiểm thử đúng cách, CM đảm bảo:
- Tất cả các hạng mục cấu hình, bao gồm cả các hạng mục kiểm thử (`test items`), đều được định danh duy nhất (`uniquely identified`), kiểm soát phiên bản (`version controlled`), theo dõi thay đổi (`tracked for changes`), và liên kết với các hạng mục cấu hình khác để duy trì khả năng truy vết (`traceability`).
- Tất cả các tài liệu và hạng mục phần mềm đã xác định đều được tham chiếu một cách rõ ràng, không mơ hồ trong `testware`.

---

## 5.5. Quản lý Khiếm khuyết (Defect Management) `[FL-5.5.1 (K3)]`

Tối thiểu, quy trình quản lý khiếm khuyết bao gồm một luồng công việc (`workflow`) để xử lý các khiếm khuyết hoặc điểm bất thường riêng lẻ từ khi phát hiện cho đến khi đóng lại và các quy tắc để phân loại chúng (ghi nhật ký `log` -> phân tích và phân loại `analyze and classify` -> quyết định cách phản hồi như sửa hay giữ nguyên -> đóng báo cáo `close`).

**Các báo cáo khiếm khuyết (`defect reports`) điển hình có các mục tiêu sau:**
- Cung cấp cho những người chịu trách nhiệm xử lý và giải quyết các khiếm khuyết được báo cáo đầy đủ thông tin để giải quyết vấn đề.
- Cung cấp một phương tiện để theo dõi chất lượng của sản phẩm công việc.
- Cung cấp các ý tưởng để cải tiến quy trình phát triển và kiểm thử.

**Một báo cáo khiếm khuyết được ghi lại trong kiểm thử động thường bao gồm các trường sau (cực kỳ quan trọng cho câu hỏi tình huống K3):**
- **Định danh duy nhất (`Unique identifier`)**
- **Tiêu đề (`Title`)** kèm tóm tắt ngắn gọn về điểm bất thường đang được báo cáo
- **Ngày (`Date`)** quan sát thấy điểm bất thường, tổ chức phát hành, và tác giả (`author`), bao gồm cả vai trò của họ
- **Định danh của đối tượng kiểm thử (`Identification of the test object`)** (ví dụ: phiên bản phần mềm) và **môi trường kiểm thử (`test environment`)**
- **Ngữ cảnh của khiếm khuyết (`Context of the defect`)** (ví dụ: ca kiểm thử đang chạy, hoạt động kiểm thử đang thực hiện, giai đoạn SDLC, kỹ thuật kiểm thử, danh sách kiểm tra hoặc dữ liệu kiểm thử đang dùng)
- **Mô tả hỏng hóc (`Description of the failure`)** để cho phép tái hiện và giải quyết, bao gồm **các bước kiểm thử (`test steps`)** đã phát hiện ra điểm bất thường, và bất kỳ nhật ký kiểm thử, bản xuất cơ sở dữ liệu (`database dumps`), ảnh chụp màn hình (`screenshots`) hoặc bản ghi hình nào liên quan
- **Kết quả mong đợi (`Expected results`) và kết quả thực tế (`Actual results`)**
- **Mức độ nghiêm trọng của khiếm khuyết (`Severity of the defect`)** (mức độ tác động) đối với lợi ích của các bên liên quan hoặc các yêu cầu
- **Độ ưu tiên sửa (`Priority to fix`)**
- **Trạng thái của khiếm khuyết (`Status of the defect`)** (ví dụ: đang mở `open`, hoãn lại `deferred`, trùng lặp `duplicate`, chờ sửa `waiting to be fixed`, chờ kiểm thử xác nhận `awaiting confirmation testing`, mở lại `re-opened`, đã đóng `closed`, bị từ chối `rejected`)
- **Các tham chiếu (`References`)** (ví dụ: tới ca kiểm thử tương ứng).

---

# Chương 6: Công cụ Kiểm thử (Test Tools) – 20 phút

### Từ khóa (Keywords - K1)
`test automation` (tự động hóa kiểm thử).

### Mục tiêu học tập Chương 6 (Learning Objectives)
- **6.1 Công cụ Hỗ trợ cho Kiểm thử (Tool Support for Testing)**
  - `FL-6.1.1 (K2)` Giải thích cách các loại công cụ kiểm thử khác nhau hỗ trợ cho kiểm thử
- **6.2 Lợi ích và Rủi ro của Tự động hóa Kiểm thử (Benefits and Risks of Test Automation)**
  - `FL-6.2.1 (K1)` Nhớ lại các lợi ích và rủi ro của tự động hóa kiểm thử

---

## 6.1. Công cụ Hỗ trợ cho Kiểm thử (Tool Support for Testing) `[FL-6.1.1 (K2)]`

Các công cụ kiểm thử hỗ trợ và tạo điều kiện thuận lợi cho nhiều hoạt động kiểm thử. Ví dụ bao gồm:
- **Công cụ quản lý kiểm thử (`Test management tools`):** tăng hiệu suất tiến trình kiểm thử bằng cách tạo thuận lợi cho việc quản lý SDLC, yêu cầu, bài kiểm thử, khiếm khuyết, cấu hình.
- **Công cụ kiểm thử tĩnh (`Static testing tools`):** hỗ trợ kiểm thử viên thực hiện việc duyệt (`reviews`) và phân tích tĩnh (`static analysis`).
- **Công cụ thiết kế kiểm thử và triển khai kiểm thử (`Test design and test implementation tools`):** tạo thuận lợi cho việc sinh ra các ca kiểm thử, dữ liệu kiểm thử và thủ tục kiểm thử.
- **Công cụ thực thi kiểm thử và độ bao phủ kiểm thử (`Test execution and test coverage tools`):** tạo thuận lợi cho việc thực thi kiểm thử tự động và đo lường độ bao phủ.
- **Công cụ kiểm thử phi chức năng (`Non-functional testing tools`):** cho phép kiểm thử viên thực hiện kiểm thử phi chức năng vốn khó hoặc không thể thực hiện thủ công (như kiểm thử tải, hiệu năng, bảo mật).
- **Công cụ DevOps (`DevOps tools`):** hỗ trợ đường ống chuyển giao DevOps, theo dõi luồng công việc, quy trình dựng tự động (`automated build processes`), CI/CD.
- **Công cụ cộng tác (`Collaboration tools`):** tạo thuận lợi cho việc giao tiếp.
- **Công cụ hỗ trợ khả năng mở rộng và chuẩn hóa triển khai (`Tools supporting scalability and deployment standardization`):** ví dụ: máy ảo (`virtual machines`), công cụ container hóa (`containerization tools`).
- **Bất kỳ công cụ nào khác hỗ trợ trong kiểm thử:** ví dụ: một bảng tính (`spreadsheet` như Excel) cũng là một công cụ kiểm thử trong ngữ cảnh kiểm thử.

---

## 6.2. Lợi ích và Rủi ro của Tự động hóa Kiểm thử (Benefits and Risks of Test Automation) `[FL-6.2.1 (K1)]`

Việc chỉ đơn thuần mua/sở hữu một công cụ không đảm bảo sự thành công. Mỗi công cụ mới sẽ đòi hỏi công sức để đạt được những lợi ích thực sự và lâu dài (ví dụ: giới thiệu công cụ, bảo trì và đào tạo).

**Các lợi ích tiềm năng (`Potential benefits`) của việc sử dụng tự động hóa kiểm thử bao gồm:**
- **Tiết kiệm thời gian (`Time saved`)** bằng cách giảm các công việc thủ công lặp đi lặp lại (ví dụ: chạy kiểm thử hồi quy, nhập lại cùng dữ liệu kiểm thử, so sánh kết quả mong đợi với kết quả thực tế, kiểm tra tiêu chuẩn viết mã).
- **Ngăn ngừa các sai sót đơn giản của con người (`Prevention of simple human errors`)** thông qua tính nhất quán và khả năng lặp lại cao hơn (`greater consistency and repeatability`).
- **Đánh giá khách quan hơn (`More objective assessment`)** (ví dụ: độ bao phủ) và cung cấp các thước đo quá phức tạp để con người tự xác định.
- **Tiếp cận thông tin về kiểm thử dễ dàng hơn** để hỗ trợ quản lý kiểm thử và báo cáo kiểm thử (ví dụ: thống kê, biểu đồ, dữ liệu tổng hợp về tiến độ kiểm thử, tỷ lệ hỏng hóc `failure rates`, thời lượng thực thi).
- **Giảm thời gian thực thi kiểm thử** để phát hiện khiếm khuyết sớm hơn, phản hồi nhanh hơn và đưa sản phẩm ra thị trường nhanh hơn (`faster time to market`).
- **Có thêm thời gian cho kiểm thử viên** để thiết kế các bài kiểm thử mới, sâu hơn và hiệu quả hơn.

**Các rủi ro tiềm ẩn (`Potential risks`) của việc sử dụng tự động hóa kiểm thử bao gồm:**
- Kỳ vọng phi thực tế (`Unrealistic expectations`) về lợi ích của công cụ (bao gồm chức năng và tính dễ sử dụng).
- Ước lượng không chính xác về thời gian, chi phí, công sức cần thiết để đưa công cụ vào, bảo trì các kịch bản kiểm thử (`maintain test scripts`) và thay đổi quy trình kiểm thử thủ công hiện tại.
- Sử dụng công cụ kiểm thử khi kiểm thử thủ công phù hợp hơn.
- Phụ thuộc vào công cụ quá nhiều (`Relying on a tool too much`), ví dụ: bỏ qua nhu cầu về tư duy phản biện của con người (`human critical thinking`).
- Sự phụ thuộc vào nhà cung cấp công cụ (`tool vendor`) vốn có thể phá sản, ngừng phát triển công cụ, bán công cụ cho nhà cung cấp khác hoặc hỗ trợ kém.
- Sử dụng phần mềm mã nguồn mở (`open-source software`) có thể bị bỏ rơi (`abandoned`), hoặc các thành phần nội bộ của nó đòi hỏi phải cập nhật quá thường xuyên.
- Công cụ tự động hóa không tương thích (`not compatible`) với nền tảng phát triển.
- Chọn một công cụ không phù hợp, không tuân thủ các yêu cầu quy định chế tài và/hoặc các tiêu chuẩn an toàn.
