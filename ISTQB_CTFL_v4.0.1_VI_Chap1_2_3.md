# ISTQB® Certified Tester Foundation Level Syllabus v4.0.1 - Bản dịch Chuẩn Thuật Ngữ (Chương 1, 2, 3)

> **Nguyên tắc dịch chuẩn ISTQB:**
> - Dịch **đầy đủ 100% từng câu, từng ý** trong tài liệu gốc `ISTQB_CTFL_Syllabus_v4.0.1.pdf` (không lược bỏ bất kỳ đoạn nào).
> - **Giữ nguyên thuật ngữ gốc tiếng Anh (Keywords)** trong ngoặc đơn để khi làm đề thi tiếng Anh bạn nhận diện được ngay từ khóa ăn điểm.
> - Giữ nguyên mã mục tiêu học tập (**FL-x.x.x**) và mức độ nhận thức (**K1, K2, K3**).

---

# Chương 1: Cơ bản về Kiểm thử (Fundamentals of Testing) – 180 phút

### Từ khóa (Keywords - Bắt buộc nhớ ở mức K1)
`coverage` (độ bao phủ), `debugging` (gỡ lỗi), `defect` (khiếm khuyết / lỗi trong sản phẩm), `error` (sai sót của con người), `failure` (hỏng hóc / sự cố khi chạy), `quality` (chất lượng), `quality assurance` (đảm bảo chất lượng - QA), `root cause` (nguyên nhân gốc rễ), `test analysis` (phân tích kiểm thử), `test basis` (cơ sở kiểm thử), `test case` (ca kiểm thử), `test completion` (hoàn tất kiểm thử), `test condition` (điều kiện kiểm thử), `test control` (kiểm soát kiểm thử), `test data` (dữ liệu kiểm thử), `test design` (thiết kế kiểm thử), `test execution` (thực thi kiểm thử), `test implementation` (triển khai kiểm thử), `test monitoring` (giám sát kiểm thử), `test object` (đối tượng kiểm thử), `test objective` (mục tiêu kiểm thử), `test planning` (lập kế hoạch kiểm thử), `test procedure` (quy trình/thủ tục kiểm thử), `test process` (tiến trình kiểm thử), `test result` (kết quả kiểm thử), `testing` (kiểm thử), `testware` (sản phẩm/tài nguyên kiểm thử), `traceability` (khả năng truy vết), `validation` (thẩm định), `verification` (xác minh).

### Mục tiêu học tập Chương 1 (Learning Objectives)
- **1.1 Kiểm thử là gì? (What is Testing?)**
  - `FL-1.1.1 (K1)` Nhận diện các mục tiêu kiểm thử điển hình (*Identify typical test objectives*)
  - `FL-1.1.2 (K2)` Phân biệt kiểm thử với gỡ lỗi (*Differentiate testing from debugging*)
- **1.2 Tại sao Kiểm thử là cần thiết? (Why is Testing Necessary?)**
  - `FL-1.2.1 (K2)` Cho ví dụ về lý do tại sao kiểm thử là cần thiết (*Exemplify why testing is necessary*)
  - `FL-1.2.2 (K1)` Nhớ lại mối quan hệ giữa kiểm thử và đảm bảo chất lượng (*Recall the relation between testing and quality assurance*)
  - `FL-1.2.3 (K2)` Phân biệt giữa nguyên nhân gốc rễ, sai sót, khiếm khuyết và hỏng hóc (*Distinguish between root cause, error, defect, and failure*)
- **1.3 Các nguyên lý Kiểm thử (Testing Principles)**
  - `FL-1.3.1 (K2)` Giải thích 7 nguyên lý kiểm thử (*Explain the seven testing principles*)
- **1.4 Các hoạt động Kiểm thử, Testware và các Vai trò trong Kiểm thử (Test Activities, Testware and Test Roles)**
  - `FL-1.4.1 (K2)` Giải thích các hoạt động kiểm thử khác nhau và các công việc liên quan (*Explain the different test activities and related tasks*)
  - `FL-1.4.2 (K2)` Giải thích tác động của ngữ cảnh lên tiến trình kiểm thử (*Explain the impact of context on the test process*)
  - `FL-1.4.3 (K2)` Phân biệt các sản phẩm kiểm thử (*testware*) hỗ trợ cho các hoạt động kiểm thử (*Differentiate the testware that supports the test activities*)
  - `FL-1.4.4 (K2)` Giải thích giá trị của việc duy trì khả năng truy vết (*Explain the value of maintaining traceability*)
  - `FL-1.4.5 (K2)` So sánh các vai trò khác nhau trong kiểm thử (*Compare the different roles in testing*)
- **1.5 Kỹ năng thiết yếu và Thực hành tốt trong Kiểm thử (Essential Skills and Good Practices in Testing)**
  - `FL-1.5.1 (K2)` Đưa ra ví dụ về các kỹ năng chung cần thiết cho kiểm thử (*Give examples of the generic skills required for testing*)
  - `FL-1.5.2 (K1)` Nhớ lại các ưu điểm của cách tiếp cận toàn nhóm (*Recall the advantages of the whole team approach*)
  - `FL-1.5.3 (K2)` Phân biệt lợi ích và hạn chế của tính độc lập trong kiểm thử (*Distinguish the benefits and drawbacks of independence of testing*)

---

## 1.1. Kiểm thử là gì? (What is Testing?)

Các hệ thống phần mềm là một phần không thể thiếu trong cuộc sống hàng ngày của chúng ta. Hầu hết mọi người đều từng trải nghiệm phần mềm hoạt động không như mong đợi. Phần mềm hoạt động không đúng có thể dẫn đến nhiều vấn đề, bao gồm mất tiền bạc, thời gian hoặc uy tín kinh doanh, và trong những trường hợp cực đoan, thậm chí gây thương tích hoặc tử vong. Kiểm thử phần mềm (*Software testing*) đánh giá chất lượng phần mềm (*software quality*) và giúp giảm rủi ro xảy ra hỏng hóc phần mềm (*software failure*) trong quá trình vận hành.

Kiểm thử phần mềm là một tập hợp các hoạt động nhằm phát hiện các khiếm khuyết (*defects*) và đánh giá chất lượng của các sản phẩm công việc phần mềm (*software work products*). Các sản phẩm công việc này, khi được kiểm thử, được gọi là các **đối tượng kiểm thử (`test objects`)**. Một quan niệm sai lầm phổ biến về kiểm thử là nó chỉ bao gồm việc thực thi các bài kiểm thử (*executing tests* - tức là chạy phần mềm và kiểm tra kết quả kiểm thử - `test results`). Tuy nhiên, kiểm thử phần mềm còn bao gồm các hoạt động khác và phải được căn chỉnh phù hợp với vòng đời phát triển phần mềm (*software development lifecycle - SDLC*, xem Chương 2).

Một quan niệm sai lầm phổ biến khác về kiểm thử là kiểm thử chỉ tập trung hoàn toàn vào việc **xác minh (`verifying`)** đối tượng kiểm thử. Mặc dù kiểm thử bao gồm **xác minh (`verification`)**, tức là kiểm tra xem hệ thống có đáp ứng các yêu cầu đã được quy định (*specified requirements*) hay không, nhưng nó cũng bao gồm **thẩm định (`validation`)**, nghĩa là kiểm tra xem hệ thống có đáp ứng nhu cầu của người dùng và các bên liên quan khác (*stakeholders*) trong môi trường vận hành thực tế của nó hay không.

Kiểm thử có thể là **động (`dynamic`)** hoặc **tĩnh (`static`)**:
- **Kiểm thử động (`Dynamic testing`)** bao gồm việc thực thi phần mềm (*execution of software*), trong khi **kiểm thử tĩnh (`static testing`)** thì không.
- Kiểm thử tĩnh bao gồm các hoạt động duyệt/đánh giá (`reviews`, xem Chương 3) và phân tích tĩnh (`static analysis`).
- Kiểm thử động sử dụng các loại kỹ thuật kiểm thử (`test techniques`) và phương pháp tiếp cận kiểm thử khác nhau để xây dựng các ca kiểm thử (`test cases`, xem Chương 4).

Kiểm thử không chỉ là một hoạt động kỹ thuật. Nó còn cần được lập kế hoạch, quản lý, ước lượng, giám sát và kiểm soát một cách hợp lý (xem Chương 5).

Kiểm thử viên (`Testers`) sử dụng các công cụ (xem Chương 6), nhưng điều quan trọng cần nhớ là kiểm thử phần lớn là một hoạt động trí tuệ, đòi hỏi kiểm thử viên phải có kiến thức chuyên môn, sử dụng kỹ năng phân tích và áp dụng tư duy phản biện (`critical thinking`) cũng như tư duy hệ thống (`systems thinking`) (Myers 2011, Roman 2018).

Tiêu chuẩn ISO/IEC/IEEE 29119-1 cung cấp thêm thông tin về các khái niệm kiểm thử phần mềm.

### 1.1.1. Mục tiêu Kiểm thử (Test Objectives) `[FL-1.1.1 (K1)]`
Các mục tiêu kiểm thử (`test objectives`) điển hình là:
- Đánh giá các sản phẩm công việc (`evaluating work products`) như các yêu cầu (`requirements`), câu chuyện người dùng (`user stories`), thiết kế (`designs`), và mã nguồn (`code`).
- Gây ra các hỏng hóc (`causing failures`) và tìm ra các khiếm khuyết (`finding defects`).
- Đảm bảo độ bao phủ yêu cầu (`required coverage`) của một đối tượng kiểm thử (`test object`).
- Giảm mức độ rủi ro (`risk level`) về chất lượng phần mềm không đạt yêu cầu.
- Xác minh (`verifying`) xem các yêu cầu đã quy định có được đáp ứng hay chưa.
- Xác minh rằng đối tượng kiểm thử tuân thủ các yêu cầu về hợp đồng (`contractual`), pháp lý (`legal`), và quy định chế tài (`regulatory`).
- Cung cấp thông tin cho các bên liên quan (`stakeholders`) để cho phép họ đưa ra các quyết định sáng suốt (`informed decisions`).
- Xây dựng sự tự tin/tin tưởng (`building confidence`) vào chất lượng của đối tượng kiểm thử.
- Thẩm định (`validating`) xem đối tượng kiểm thử đã hoàn chỉnh và hoạt động đúng như mong đợi của các bên liên quan hay chưa.

Mục tiêu kiểm thử có thể thay đổi tùy thuộc vào ngữ cảnh (`context`), bao gồm sản phẩm công việc đang được kiểm thử, cấp độ kiểm thử (`test level`), rủi ro (`risks`), vòng đời phát triển phần mềm (`SDLC`) đang được tuân theo, và các yếu tố liên quan đến bối cảnh kinh doanh (ví dụ: cơ cấu công ty, các cân nhắc cạnh tranh, hoặc thời gian đưa sản phẩm ra thị trường - `time to market`).

### 1.1.2. Kiểm thử và Gỡ lỗi (Testing and Debugging) `[FL-1.1.2 (K2)]`
Kiểm thử (`testing`) và gỡ lỗi (`debugging`) là hai hoạt động tách biệt nhau. Kiểm thử có thể kích hoạt các hỏng hóc (`trigger failures`) gây ra bởi các khiếm khuyết (`defects`) trong phần mềm (kiểm thử động - `dynamic testing`) hoặc có thể trực tiếp tìm ra các khiếm khuyết trong đối tượng kiểm thử (kiểm thử tĩnh - `static testing`).

Khi kiểm thử động (xem Chương 4) kích hoạt một hỏng hóc (`failure`), gỡ lỗi (`debugging`) liên quan đến việc tìm ra nguyên nhân của hỏng hóc này (`defects`), phân tích các nguyên nhân đó, và loại bỏ chúng. Quy trình gỡ lỗi điển hình trong trường hợp này bao gồm:
- Tái hiện lại một hỏng hóc (`Reproduction of a failure`)
- Chẩn đoán (`Diagnosis` - tìm ra khiếm khuyết/`finding the defect`)
- Sửa khiếm khuyết (`Fixing the defect`)

**Kiểm thử xác nhận (`Confirmation testing`)** tiếp theo sẽ kiểm tra xem các bản sửa lỗi có giải quyết được vấn đề hay không. Tốt nhất, kiểm thử xác nhận nên được thực hiện bởi cùng một người đã thực hiện bài kiểm thử ban đầu. **Kiểm thử hồi quy (`Regression testing`)** sau đó cũng có thể được thực hiện, để kiểm tra xem các bản sửa lỗi có gây ra hỏng hóc ở các phần khác của đối tượng kiểm thử hay không (xem mục 2.2.3 để biết thêm thông tin về kiểm thử xác nhận và kiểm thử hồi quy).

Khi kiểm thử tĩnh xác định được một khiếm khuyết (`defect`), việc gỡ lỗi chỉ liên quan đến việc loại bỏ nó. Không cần phải tái hiện (`reproduction`) hay chẩn đoán (`diagnosis`), vì kiểm thử tĩnh trực tiếp tìm thấy các khiếm khuyết và không thể gây ra các hỏng hóc (`cannot cause failures`) (xem Chương 3).

---

## 1.2. Tại sao Kiểm thử là cần thiết? (Why is Testing Necessary?)

Kiểm thử, với tư cách là một hình thức kiểm soát chất lượng (`quality control`), giúp đạt được các mục tiêu kiểm thử đã thỏa thuận trong phạm vi các ràng buộc về phạm vi (`scope`), thời gian (`time`), chất lượng (`quality`) và ngân sách (`budget`) đã đặt ra. Đóng góp của kiểm thử vào sự thành công không nên chỉ giới hạn ở các hoạt động của nhóm kiểm thử. Bất kỳ bên liên quan (`stakeholder`) nào cũng có thể sử dụng kỹ năng kiểm thử của mình để đưa dự án tiến gần hơn đến thành công. Việc kiểm thử các thành phần (`components`), hệ thống (`systems`) và các sản phẩm công việc liên quan (ví dụ: tài liệu) giúp xác định các khiếm khuyết trong phần mềm.

### 1.2.1. Đóng góp của Kiểm thử vào Sự thành công (Testing's Contributions to Success) `[FL-1.2.1 (K2)]`
- Kiểm thử cung cấp một phương tiện hiệu quả về mặt chi phí (`cost-effective means`) để phát hiện các khiếm khuyết (`defects`). Các khiếm khuyết này sau đó có thể được loại bỏ (bằng việc gỡ lỗi - `debugging` – một hoạt động không phải là kiểm thử), do đó kiểm thử **gián tiếp (`indirectly`)** đóng góp vào việc tạo ra các đối tượng kiểm thử có chất lượng cao hơn.
- Kiểm thử cung cấp một phương tiện để **trực tiếp (`directly`)** đánh giá chất lượng của một đối tượng kiểm thử ở các giai đoạn (`phases`) khác nhau trong SDLC. Các thước đo này được sử dụng như một phần của hoạt động quản lý dự án lớn hơn, góp phần vào các quyết định chuyển sang giai đoạn tiếp theo của SDLC, chẳng hạn như quyết định phát hành (`release decision`).
- Kiểm thử cung cấp cho người dùng sự đại diện gián tiếp (`indirect representation`) trong dự án phát triển. Kiểm thử viên đảm bảo rằng sự hiểu biết của họ về nhu cầu của người dùng được xem xét xuyên suốt vòng đời phát triển. Giải pháp thay thế là lôi kéo một nhóm người dùng đại diện tham gia như một phần của dự án phát triển, điều này thường không khả thi do chi phí cao và sự thiếu sẵn sàng của những người dùng phù hợp.
- Kiểm thử cũng có thể được yêu cầu để đáp ứng các yêu cầu hợp đồng (`contractual`) hoặc pháp lý (`legal`), hoặc để tuân thủ các tiêu chuẩn quy định chế tài (`regulatory standards`).

### 1.2.2. Kiểm thử và Đảm bảo Chất lượng (Testing and Quality Assurance - QA) `[FL-1.2.2 (K1)]`
Mặc dù mọi người thường sử dụng thuật ngữ "kiểm thử" (`testing`) và "đảm bảo chất lượng" (`quality assurance - QA`) thay thế cho nhau, nhưng kiểm thử và QA **không giống nhau**.

- **Kiểm thử (`Testing`)** là một cách tiếp cận **hướng sản phẩm (`product-oriented`), mang tính khắc phục (`corrective approach`)**, tập trung vào các hoạt động hỗ trợ đạt được các mức chất lượng phù hợp. Kiểm thử là một hình thức chính của **kiểm soát chất lượng (`quality control - QC`)**, trong khi các hình thức QC khác bao gồm các phương pháp hình thức (`formal methods` - kiểm tra mô hình `model checking` và chứng minh tính đúng đắn `proof of correctness`), mô phỏng (`simulation`) và tạo mẫu (`prototyping`).
- **QA (`Quality Assurance`)** là một cách tiếp cận **hướng quy trình (`process-oriented`), mang tính phòng ngừa (`preventive approach`)**, tập trung vào việc triển khai và cải tiến các quy trình (`processes`). Nó hoạt động trên cơ sở rằng nếu một quy trình tốt được tuân thủ một cách chính xác, thì nó sẽ tạo ra một sản phẩm tốt. QA áp dụng cho cả quy trình phát triển và quy trình kiểm thử, và là trách nhiệm của tất cả mọi người trong một dự án.

Kết quả kiểm thử (`Test results`) được sử dụng bởi cả QA và kiểm thử (`testing`). Trong kiểm thử, chúng được dùng để sửa các khiếm khuyết (`fix defects`), trong khi trong QA, chúng cung cấp phản hồi (`feedback`) về mức độ hiệu quả mà các quy trình phát triển và kiểm thử đang hoạt động.

### 1.2.3. Sai sót, Khiếm khuyết, Hỏng hóc và Nguyên nhân gốc rễ (Errors, Defects, Failures, and Root Causes) `[FL-1.2.3 (K2)]`
Con người tạo ra các **sai sót (`errors` / `mistakes`)**, từ đó sinh ra các **khiếm khuyết (`defects` / `faults` / `bugs`)**, và đến lượt chúng có thể dẫn đến các **hỏng hóc (`failures`)**. Con người mắc sai sót vì nhiều lý do khác nhau, chẳng hạn như áp lực thời gian, độ phức tạp của sản phẩm công việc, quy trình, cơ sở hạ tầng hoặc các tương tác, hoặc đơn giản vì họ mệt mỏi hoặc thiếu được đào tạo đầy đủ.

Khiếm khuyết (`Defects`) có thể được tìm thấy trong tài liệu, chẳng hạn như đặc tả yêu cầu (`requirements specification`) hoặc kịch bản kiểm thử (`test script`), trong mã nguồn (`source code`), hoặc trong một sản phẩm công việc hỗ trợ như tệp dựng (`build file`). Các khiếm khuyết trong các sản phẩm công việc được tạo ra sớm hơn trong SDLC, nếu không được phát hiện, thường dẫn đến các sản phẩm công việc bị khiếm khuyết ở giai đoạn sau của vòng đời. Nếu một khiếm khuyết trong mã nguồn được thực thi (`executed`), hệ thống có thể không làm được những gì nó phải làm, hoặc làm điều gì đó mà nó không nên làm, gây ra một **hỏng hóc (`failure`)**. Một số khiếm khuyết sẽ luôn dẫn đến hỏng hóc nếu được thực thi, trong khi những khiếm khuyết khác chỉ dẫn đến hỏng hóc trong những hoàn cảnh cụ thể, và một số có thể không bao giờ dẫn đến hỏng hóc.

Sai sót (`Errors`) và khiếm khuyết (`defects`) không phải là nguyên nhân duy nhất gây ra hỏng hóc (`failures`). Hỏng hóc cũng có thể do các điều kiện môi trường (`environmental conditions`) gây ra, chẳng hạn như khi bức xạ (`radiation`) hoặc trường điện từ (`electromagnetic fields`) gây ra khiếm khuyết trong phần sụn (`firmware`).

Một **nguyên nhân gốc rễ (`root cause`)** là một lý do cơ bản dẫn đến sự xuất hiện của một vấn đề (ví dụ: một tình huống dẫn đến một sai sót `error`). Nguyên nhân gốc rễ được xác định thông qua phân tích nguyên nhân gốc rễ (`root cause analysis`), thường được thực hiện khi một hỏng hóc xảy ra hoặc một khiếm khuyết được xác định. Người ta tin rằng các hỏng hóc hoặc khiếm khuyết tương tự trong tương lai có thể được ngăn chặn hoặc giảm tần suất xuất hiện bằng cách giải quyết nguyên nhân gốc rễ, chẳng hạn như loại bỏ nó.

---

## 1.3. Các nguyên lý Kiểm thử (Testing Principles) `[FL-1.3.1 (K2)]`

Một số nguyên lý kiểm thử đưa ra các hướng dẫn chung áp dụng cho mọi hoạt động kiểm thử đã được đề xuất qua nhiều năm. Đề cương này mô tả 7 nguyên lý như vậy:

1. **Kiểm thử cho thấy sự hiện diện, chứ không phải sự vắng mặt của khiếm khuyết (`Testing shows the presence, not the absence of defects`):** Kiểm thử có thể chỉ ra rằng các khiếm khuyết đang tồn tại trong đối tượng kiểm thử, nhưng không thể chứng minh rằng không có khiếm khuyết nào (Buxton 1970). Kiểm thử làm giảm xác suất các khiếm khuyết còn sót lại chưa được khám phá trong đối tượng kiểm thử, nhưng ngay cả khi không tìm thấy khiếm khuyết nào, kiểm thử cũng không thể chứng minh tính đúng đắn (`correctness`) của đối tượng kiểm thử.
2. **Kiểm thử vét cạn là bất khả thi (`Exhaustive testing is impossible`):** Việc kiểm thử mọi thứ là không khả thi ngoại trừ những trường hợp tầm thường/đơn giản (`trivial cases`) (Manna 1978). Thay vì cố gắng kiểm thử vét cạn, các kỹ thuật kiểm thử (`test techniques`, xem Chương 4), sắp xếp độ ưu tiên ca kiểm thử (`test case prioritization`, xem mục 5.1.5), và kiểm thử dựa trên rủi ro (`risk-based testing`, xem mục 5.2), nên được sử dụng để tập trung nỗ lực kiểm thử.
3. **Kiểm thử sớm tiết kiệm thời gian và tiền bạc (`Early testing saves time and money`):** Các khiếm khuyết được loại bỏ sớm trong quy trình sẽ không gây ra các khiếm khuyết tiếp theo trong các sản phẩm công việc phái sinh (`derived work products`). Chi phí chất lượng (`cost of quality`) sẽ giảm xuống vì sẽ có ít hỏng hóc xảy ra hơn ở giai đoạn sau của SDLC (Boehm 1981). Để tìm ra khiếm khuyết sớm, cả kiểm thử tĩnh (`static testing`, xem Chương 3) và kiểm thử động (`dynamic testing`, xem Chương 4) đều nên được bắt đầu càng sớm càng tốt.
4. **Các khiếm khuyết thường tập trung lại với nhau (`Defects cluster together`):** Một số lượng nhỏ các thành phần hệ thống (`system components`) thường chứa hầu hết các khiếm khuyết được phát hiện hoặc chịu trách nhiệm cho hầu hết các hỏng hóc trong vận hành (`operational failures`) (Enders 1975). Hiện tượng này là một minh họa của nguyên lý Pareto (`Pareto principle` - quy tắc 80/20). Các cụm khiếm khuyết được dự đoán (`predicted defect clusters`) và các cụm khiếm khuyết thực tế (`actual defect clusters`) quan sát được trong quá trình kiểm thử hoặc vận hành là một đầu vào quan trọng cho kiểm thử dựa trên rủi ro (`risk-based testing`, xem mục 5.2).
5. **Bài kiểm thử bị hao mòn / giảm hiệu quả (`Tests wear out` - trước đây gọi là Pesticide Paradox):** Nếu cùng một tập các bài kiểm thử được lặp đi lặp lại nhiều lần, chúng sẽ ngày càng trở nên kém hiệu quả trong việc phát hiện các khiếm khuyết mới (Beizer 1990). Để khắc phục hiệu ứng này, các bài kiểm thử và dữ liệu kiểm thử hiện có có thể cần được sửa đổi, và các bài kiểm thử mới có thể cần được viết thêm. Tuy nhiên, trong một số trường hợp, việc lặp lại cùng các bài kiểm thử có thể mang lại kết quả có lợi, ví dụ: trong kiểm thử hồi quy tự động (`automated regression testing`, xem mục 2.2.3).
6. **Kiểm thử phụ thuộc vào ngữ cảnh (`Testing is context dependent`):** Không có một cách tiếp cận kiểm thử đơn lẻ nào có thể áp dụng chung cho mọi trường hợp. Kiểm thử được thực hiện khác nhau trong các ngữ cảnh khác nhau (Kaner 2011).
7. **Ngụy biện về sự không có khiếm khuyết (`Absence-of-defects fallacy`):** Thật là một ngụy biện (tức là một quan niệm sai lầm) khi kỳ vọng rằng việc xác minh phần mềm (`software verification`) sẽ đảm bảo sự thành công của một hệ thống. Việc kiểm thử kỹ lưỡng tất cả các yêu cầu đã quy định và sửa tất cả các khiếm khuyết tìm thấy vẫn có thể tạo ra một hệ thống không đáp ứng được nhu cầu và kỳ vọng của người dùng, không giúp đạt được mục tiêu kinh doanh của khách hàng, và kém cỏi hơn so với các hệ thống cạnh tranh khác. Ngoài việc xác minh (`verification`), việc thẩm định (`validation`) cũng phải được thực hiện (Boehm 1981).

---

## 1.4. Các hoạt động Kiểm thử, Testware và Vai trò trong Kiểm thử (Test Activities, Testware and Test Roles)

Kiểm thử phụ thuộc vào ngữ cảnh, nhưng ở mức độ tổng quát (`high level`), có những tập hợp hoạt động kiểm thử chung mà nếu thiếu chúng thì kiểm thử ít có khả năng đạt được các mục tiêu kiểm thử. Các tập hợp hoạt động kiểm thử này tạo thành một **tiến trình kiểm thử (`test process`)**. Tiến trình kiểm thử có thể được điều chỉnh (`tailored`) cho phù hợp với một tình huống cụ thể dựa trên nhiều yếu tố khác nhau. Những hoạt động kiểm thử nào được đưa vào tiến trình kiểm thử này, cách chúng được triển khai, và thời điểm chúng diễn ra thường được quyết định như một phần của việc lập kế hoạch kiểm thử cho tình huống cụ thể đó (xem mục 5.1).

Các phần tiếp theo mô tả các khía cạnh chung của tiến trình kiểm thử này xét theo các hoạt động và nhiệm vụ kiểm thử, tác động của ngữ cảnh, sản phẩm kiểm thử (`testware`), khả năng truy vết giữa cơ sở kiểm thử (`test basis`) và `testware`, cũng như các vai trò kiểm thử (`testing roles`).

Tiêu chuẩn ISO/IEC/IEEE 29119-2 cung cấp thêm thông tin về các tiến trình kiểm thử.

### 1.4.1. Các hoạt động và Nhiệm vụ Kiểm thử (Test Activities and Tasks) `[FL-1.4.1 (K2)]`
Một tiến trình kiểm thử thường bao gồm các nhóm hoạt động chính được mô tả dưới đây. Mặc dù nhiều hoạt động trong số này có vẻ tuân theo một trình tự hợp lý (`logical sequence`), nhưng chúng thường được thực hiện lặp đi lặp lại (`iteratively`) hoặc song song (`in parallel`). Các hoạt động kiểm thử này thường cần được điều chỉnh cho phù hợp với hệ thống và dự án.

- **Lập kế hoạch kiểm thử (`Test planning`):** Bao gồm việc xác định các mục tiêu kiểm thử (`test objectives`) và sau đó lựa chọn một cách tiếp cận (`approach`) đạt được các mục tiêu đó tốt nhất trong phạm vi các ràng buộc do ngữ cảnh tổng thể đặt ra. Lập kế hoạch kiểm thử được giải thích chi tiết hơn trong mục 5.1.
- **Giám sát kiểm thử và kiểm soát kiểm thử (`Test monitoring and test control`):** Giám sát kiểm thử (`Test monitoring`) bao gồm việc kiểm tra liên tục tất cả các hoạt động kiểm thử và so sánh tiến độ thực tế với kế hoạch. Kiểm soát kiểm thử (`Test control`) bao gồm việc thực hiện các hành động cần thiết để đáp ứng các mục tiêu kiểm thử. Giám sát kiểm thử và kiểm soát kiểm thử được giải thích chi tiết hơn trong mục 5.3.
- **Phân tích kiểm thử (`Test analysis`):** Bao gồm việc phân tích cơ sở kiểm thử (`test basis`) để xác định các tính năng có thể kiểm thử được (`testable features`). Các **điều kiện kiểm thử (`test conditions`)** liên quan được xác định và sắp xếp độ ưu tiên, có tính đến các rủi ro và mức độ rủi ro liên quan (xem mục 5.2). Cơ sở kiểm thử và đối tượng kiểm thử cũng được đánh giá để xác định các khiếm khuyết mà chúng có thể chứa đựng và để đánh giá khả năng kiểm thử (`testability`) của chúng. Phân tích kiểm thử thường được hỗ trợ bởi việc sử dụng các kỹ thuật kiểm thử (xem Chương 4). Phân tích kiểm thử trả lời cho câu hỏi **"kiểm thử cái gì?" (`"what to test?"`)** xét theo các tiêu chí bao phủ có thể đo lường được (`measurable coverage criteria`).
- **Thiết kế kiểm thử (`Test design`):** Bao gồm việc chi tiết hóa các điều kiện kiểm thử (`test conditions`) thành các ca kiểm thử (`test cases`) và các `testware` khác (ví dụ: điều lệ kiểm thử - `test charters`). Hoạt động này thường bao gồm việc xác định các **mục bao phủ (`coverage items`)**, đóng vai trò làm hướng dẫn để chỉ định các đầu vào của ca kiểm thử (`test case inputs`). Các kỹ thuật kiểm thử (xem Chương 4) có thể được sử dụng để hỗ trợ hoạt động này. Thiết kế kiểm thử cũng bao gồm việc xác định các yêu cầu về dữ liệu kiểm thử (`test data requirements`), thiết kế môi trường kiểm thử (`test environment`) và xác định cơ sở hạ tầng cũng như công cụ cần thiết. Thiết kế kiểm thử trả lời cho câu hỏi **"kiểm thử như thế nào?" (`"how to test?"`)**.
- **Triển khai kiểm thử (`Test implementation`):** Bao gồm việc tạo ra hoặc thu thập các `testware` cần thiết cho việc thực thi kiểm thử (ví dụ: dữ liệu kiểm thử - `test data`). Các ca kiểm thử (`test cases`) có thể được tổ chức thành các **quy trình/thủ tục kiểm thử (`test procedures`)**, và các thủ tục này thường được tập hợp thành các **bộ kiểm thử (`test suites`)**. Các kịch bản kiểm thử thủ công và tự động (`manual and automated test scripts`) được tạo ra. Các thủ tục kiểm thử được sắp xếp độ ưu tiên và bố trí trong một lịch trình thực thi kiểm thử (`test execution schedule`) để thực thi kiểm thử hiệu quả (xem mục 5.1.5). Môi trường kiểm thử được xây dựng và được xác minh là đã thiết lập đúng đắn.
- **Thực thi kiểm thử (`Test execution`):** Bao gồm việc chạy các bài kiểm thử theo đúng lịch trình thực thi kiểm thử (các lần chạy kiểm thử - `test runs`). Thực thi kiểm thử có thể là thủ công hoặc tự động. Thực thi kiểm thử có thể diễn ra dưới nhiều hình thức, bao gồm kiểm thử liên tục (`continuous testing`) hoặc các phiên kiểm thử theo cặp (`pair testing sessions`). Kết quả kiểm thử thực tế (`actual test results`) được so sánh với kết quả mong đợi (`expected results`). Kết quả kiểm thử được ghi nhật ký (`logged`). Các điểm bất thường (`anomalies`) được phân tích để xác định nguyên nhân có khả năng xảy ra của chúng. Phân tích này cho phép chúng ta báo cáo các điểm bất thường dựa trên các hỏng hóc quan sát được (xem mục 5.5).
- **Hoàn tất kiểm thử (`Test completion`):** Thường diễn ra tại các cột mốc của dự án (`project milestones`, ví dụ: phát hành, kết thúc vòng lặp `iteration`, hoàn thành một cấp độ kiểm thử). Đối với bất kỳ khiếm khuyết nào chưa được giải quyết, các yêu cầu thay đổi (`change requests`) hoặc các mục tồn đọng sản phẩm (`product backlog items`) sẽ được tạo ra. Bất kỳ `testware` nào có thể hữu ích trong tương lai đều được xác định và lưu trữ (`archived`) hoặc bàn giao cho các nhóm thích hợp. Môi trường kiểm thử được đóng lại về một trạng thái đã thỏa thuận. Các hoạt động kiểm thử được phân tích để xác định các bài học kinh nghiệm (`lessons learned`) và các cải tiến cho các vòng lặp, bản phát hành hoặc dự án trong tương lai (xem mục 2.1.6). Một báo cáo hoàn tất kiểm thử (`test completion report`) được tạo ra và truyền đạt tới các bên liên quan.

### 1.4.2. Tiến trình Kiểm thử trong Ngữ cảnh (Test Process in Context) `[FL-1.4.2 (K2)]`
Kiểm thử không được thực hiện một cách cô lập. Các hoạt động kiểm thử là một phần không thể tách rời của các quy trình phát triển được thực hiện trong một tổ chức. Kiểm thử cũng được tài trợ bởi các bên liên quan và mục tiêu cuối cùng của nó là giúp đáp ứng các nhu cầu kinh doanh của các bên liên quan. Do đó, cách thức thực hiện kiểm thử sẽ phụ thuộc vào một số yếu tố ngữ cảnh (`contextual factors`) bao gồm:
- **Các bên liên quan (`Stakeholders`):** nhu cầu, kỳ vọng, yêu cầu, sự sẵn lòng hợp tác, v.v.
- **Các thành viên trong nhóm (`Team members`):** kỹ năng, kiến thức, mức độ kinh nghiệm, sự sẵn sàng, nhu cầu đào tạo, v.v.
- **Lĩnh vực kinh doanh (`Business domain`):** mức độ quan trọng/tối mật của đối tượng kiểm thử, các rủi ro đã xác định, nhu cầu thị trường, các quy định pháp lý cụ thể, v.v.
- **Các yếu tố kỹ thuật (`Technical factors`):** loại phần mềm, kiến trúc sản phẩm, công nghệ sử dụng, v.v.
- **Các ràng buộc dự án (`Project constraints`):** phạm vi, thời gian, ngân sách, nguồn lực, v.v.
- **Các yếu tố tổ chức (`Organizational factors`):** cơ cấu tổ chức, các chính sách hiện hành, các thực hành đang áp dụng, v.v.
- **Vòng đời phát triển phần mềm (`Software development lifecycle`):** các thực hành kỹ thuật, phương pháp phát triển, v.v.
- **Các công cụ (`Tools`):** tính sẵn có, khả năng sử dụng, sự tuân thủ, v.v.

Các yếu tố này sẽ có tác động lên nhiều vấn đề liên quan đến kiểm thử, bao gồm: chiến lược kiểm thử (`test strategy`), kỹ thuật kiểm thử được sử dụng, mức độ tự động hóa kiểm thử, mức độ bao phủ yêu cầu, mức độ chi tiết của `testware`, việc báo cáo kiểm thử, v.v.

### 1.4.3. Sản phẩm Kiểm thử (Testware) `[FL-1.4.3 (K2)]`
`Testware` được tạo ra dưới dạng các sản phẩm công việc đầu ra (`output work products`) từ các hoạt động kiểm thử được mô tả trong mục 1.4.1. Có sự khác biệt đáng kể trong cách các tổ chức khác nhau tạo ra, định hình, đặt tên, tổ chức và quản lý các sản phẩm công việc của họ. Quản lý cấu hình (`configuration management`, xem mục 5.4) đúng đắn sẽ đảm bảo tính nhất quán và toàn vẹn của các sản phẩm công việc. Danh sách các sản phẩm công việc dưới đây chưa phải là toàn bộ:
- **Các sản phẩm công việc của Lập kế hoạch kiểm thử (`Test planning work products`)** bao gồm: kế hoạch kiểm thử (`test plan`), lịch trình kiểm thử (`test schedule`), sổ đăng ký rủi ro (`risk register`), tiêu chí bắt đầu và tiêu chí kết thúc (`entry criteria and exit criteria`, xem mục 5.1). Sổ đăng ký rủi ro (`risk register`) là một danh sách các rủi ro cùng với khả năng xảy ra rủi ro (`risk likelihood`), mức độ tác động của rủi ro (`risk impact`) và thông tin về giảm thiểu rủi ro (`risk mitigation`, xem mục 5.2). Lịch trình kiểm thử, sổ đăng ký rủi ro, tiêu chí bắt đầu và tiêu chí kết thúc thường là một phần của kế hoạch kiểm thử.
- **Các sản phẩm công việc của Giám sát kiểm thử và Kiểm soát kiểm thử (`Test monitoring and test control work products`)** bao gồm: các báo cáo tiến độ kiểm thử (`test progress reports`, xem mục 5.3.2), tài liệu về các chỉ thị kiểm soát (`documentation of control directives`, xem mục 5.3) và thông tin về rủi ro (xem mục 5.2).
- **Các sản phẩm công việc của Phân tích kiểm thử (`Test analysis work products`)** bao gồm: các điều kiện kiểm thử (đã được sắp xếp độ ưu tiên) (`(prioritized) test conditions`, ví dụ: các tiêu chí chấp nhận - `acceptance criteria`, xem mục 4.5.2), và các báo cáo khiếm khuyết liên quan đến các khiếm khuyết trong cơ sở kiểm thử (`defect reports regarding defects in the test basis` - nếu không được sửa trực tiếp).
- **Các sản phẩm công việc của Thiết kế kiểm thử (`Test design work products`)** bao gồm: các ca kiểm thử (đã được sắp xếp độ ưu tiên) (`(prioritized) test cases`), điều lệ kiểm thử (`test charters`), các mục bao phủ (`coverage items`), các yêu cầu dữ liệu kiểm thử (`test data requirements`) và các yêu cầu môi trường kiểm thử (`test environment requirements`).
- **Các sản phẩm công việc của Triển khai kiểm thử (`Test implementation work products`)** bao gồm: các thủ tục kiểm thử (`test procedures`), các kịch bản kiểm thử thủ công và tự động (`manual and automated test scripts`), các bộ kiểm thử (`test suites`), dữ liệu kiểm thử (`test data`), lịch trình thực thi kiểm thử (`test execution schedule`), và các hạng mục môi trường kiểm thử (`test environment items`). Ví dụ về các hạng mục môi trường kiểm thử bao gồm: `stubs` (phần tử giả lập module cấp dưới), `drivers` (trình điều khiển giả lập module cấp trên), `simulators` (trình mô phỏng), và `service virtualizations` (ảo hóa dịch vụ).
- **Các sản phẩm công việc của Thực thi kiểm thử (`Test execution work products`)** bao gồm: nhật ký kiểm thử (`test logs`), và báo cáo khiếm khuyết (`defect reports`, xem mục 5.5).
- **Các sản phẩm công việc của Hoàn tất kiểm thử (`Test completion work products`)** bao gồm: báo cáo hoàn tất kiểm thử (`test completion report`, xem mục 5.3.2), các hạng mục hành động (`action items`) để cải tiến cho các dự án hoặc vòng lặp tiếp theo, các bài học kinh nghiệm đã được ghi nhận (`documented lessons learned`), và các yêu cầu thay đổi (`change requests`, ví dụ: dưới dạng các mục tồn đọng sản phẩm - `product backlog items`).

### 1.4.4. Khả năng truy vết giữa Cơ sở Kiểm thử và Testware (Traceability between the Test Basis and Testware) `[FL-1.4.4 (K2)]`
Để thực hiện giám sát kiểm thử và kiểm soát kiểm thử hiệu quả, điều quan trọng là phải thiết lập và duy trì khả năng truy vết (`traceability`) xuyên suốt tiến trình kiểm thử giữa các phần tử của cơ sở kiểm thử (`test basis elements`), các `testware` liên kết với các phần tử này (ví dụ: điều kiện kiểm thử, rủi ro, ca kiểm thử), kết quả kiểm thử (`test results`), và các khiếm khuyết (`defects`).

Khả năng truy vết chính xác hỗ trợ việc đánh giá độ bao phủ (`coverage evaluation`), vì vậy sẽ rất hữu ích nếu các tiêu chí bao phủ có thể đo lường được (`measurable coverage criteria`) được định nghĩa trong cơ sở kiểm thử. Các tiêu chí bao phủ có thể hoạt động như các chỉ số đo lường hiệu suất chính (`key performance indicators - KPIs`) để thúc đẩy các hoạt động cho thấy các mục tiêu kiểm thử đã đạt được đến mức độ nào (xem mục 1.1.1). Ví dụ:
- Truy vết từ các ca kiểm thử tới các yêu cầu (`Traceability of test cases to requirements`) có thể xác minh rằng các yêu cầu đã được bao phủ bởi các ca kiểm thử.
- Truy vết từ kết quả kiểm thử tới các rủi ro (`Traceability of test results to risks`) có thể được sử dụng để đánh giá mức độ **rủi ro còn lại (`residual risk`)** trong một đối tượng kiểm thử.

Ngoài việc đánh giá độ bao phủ, khả năng truy vết tốt còn giúp xác định tác động của các thay đổi (`impact of changes`), tạo điều kiện thuận lợi cho việc kiểm toán (`audits`), và giúp đáp ứng các tiêu chí quản trị CNTT (`IT governance criteria`). Khả năng truy vết tốt cũng làm cho các báo cáo tiến độ kiểm thử và báo cáo hoàn tất kiểm thử trở nên dễ hiểu hơn bằng cách bao gồm trạng thái của các phần tử thuộc cơ sở kiểm thử. Điều này cũng có thể hỗ trợ trong việc truyền đạt các khía cạnh kỹ thuật của kiểm thử tới các bên liên quan theo một cách dễ hiểu. Khả năng truy vết cung cấp thông tin để đánh giá chất lượng sản phẩm, năng lực quy trình (`process capability`), và tiến độ dự án so với các mục tiêu kinh doanh.

### 1.4.5. Các Vai trò trong Kiểm thử (Roles in Testing) `[FL-1.4.5 (K2)]`
Trong đề cương này, hai vai trò chính trong kiểm thử được đề cập: **vai trò quản lý kiểm thử (`test management role`)** và **vai trò kiểm thử (`testing role`)**. Các hoạt động và nhiệm vụ được giao cho hai vai trò này phụ thuộc vào các yếu tố như bối cảnh dự án và sản phẩm, kỹ năng của những người đảm nhận vai trò, và tổ chức.

- **Vai trò quản lý kiểm thử (`Test management role`)** chịu trách nhiệm tổng thể về tiến trình kiểm thử, nhóm kiểm thử và việc lãnh đạo các hoạt động kiểm thử. Vai trò quản lý kiểm thử chủ yếu tập trung vào các hoạt động: **lập kế hoạch kiểm thử (`test planning`), giám sát kiểm thử (`test monitoring`), kiểm soát kiểm thử (`test control`) và hoàn tất kiểm thử (`test completion`)**. Cách thức thực hiện vai trò quản lý kiểm thử thay đổi tùy theo ngữ cảnh. Ví dụ, trong phát triển phần mềm Agile, một số nhiệm vụ quản lý kiểm thử có thể được xử lý bởi chính nhóm Agile. Các nhiệm vụ trải rộng qua nhiều nhóm hoặc toàn bộ tổ chức có thể được thực hiện bởi các quản lý kiểm thử (`test managers`) bên ngoài nhóm phát triển.
- **Vai trò kiểm thử (`Testing role`)** chịu trách nhiệm tổng thể về khía cạnh kỹ thuật (`engineering / technical aspect`) của kiểm thử. Vai trò kiểm thử chủ yếu tập trung vào các hoạt động: **phân tích kiểm thử (`test analysis`), thiết kế kiểm thử (`test design`), triển khai kiểm thử (`test implementation`) và thực thi kiểm thử (`test execution`)**.

Những người khác nhau có thể đảm nhận các vai trò này vào những thời điểm khác nhau. Ví dụ, vai trò quản lý kiểm thử có thể được thực hiện bởi một trưởng nhóm (`team leader`), bởi một quản lý kiểm thử (`test manager`), bởi một quản lý phát triển (`development manager`), v.v. Cũng có thể có trường hợp một người đảm nhận cả hai vai trò kiểm thử và quản lý kiểm thử cùng một lúc.

---

## 1.5. Kỹ năng thiết yếu và Thực hành tốt trong Kiểm thử (Essential Skills and Good Practices in Testing)

Kỹ năng (`Skill`) là khả năng làm tốt một việc gì đó xuất phát từ kiến thức, sự rèn luyện thực hành và năng khiếu của một người. Những kiểm thử viên giỏi cần sở hữu một số kỹ năng thiết yếu để làm tốt công việc của mình. Kiểm thử viên giỏi nên là những người làm việc nhóm hiệu quả (`effective team players`) và có khả năng thực hiện kiểm thử ở các mức độ độc lập kiểm thử (`levels of test independence`) khác nhau.

### 1.5.1. Các Kỹ năng chung cần thiết cho Kiểm thử (Generic Skills Required for Testing) `[FL-1.5.1 (K2)]`
Mặc dù mang tính chung chung, các kỹ năng sau đây đặc biệt phù hợp với kiểm thử viên:
- **Kiến thức về kiểm thử (`Testing knowledge`):** để tăng tính hiệu quả (`effectiveness` - làm đúng việc/tìm được nhiều lỗi) của kiểm thử, ví dụ: bằng cách sử dụng các kỹ thuật kiểm thử.
- **Sự kỹ lưỡng, cẩn thận, tò mò, chú ý đến chi tiết, làm việc có phương pháp (`Thoroughness, carefulness, curiosity, attention to details, being methodical`):** để xác định các khiếm khuyết, đặc biệt là những khiếm khuyết khó tìm.
- **Kỹ năng giao tiếp tốt, lắng nghe chủ động, tinh thần đồng đội (`Good communication skills, active listening, being a team player`):** để tương tác hiệu quả với tất cả các bên liên quan, truyền đạt thông tin cho người khác, để được thấu hiểu, và để báo cáo cũng như thảo luận về các khiếm khuyết.
- **Tư duy phân tích, tư duy phản biện, sự sáng tạo (`Analytical thinking, critical thinking, creativity`):** để tăng tính hiệu quả (`effectiveness`) của kiểm thử.
- **Kiến thức kỹ thuật (`Technical knowledge`):** để tăng hiệu suất (`efficiency` - làm nhanh, tiết kiệm nguồn lực) của kiểm thử, ví dụ: bằng cách sử dụng các công cụ kiểm thử thích hợp.
- **Kiến thức nghiệp vụ / miền ứng dụng (`Domain knowledge`):** để có thể hiểu và giao tiếp với người dùng cuối / đại diện nghiệp vụ (`end users / business representatives`).

Kiểm thử viên thường là người mang tin xấu (`bearers of bad news`). Một đặc tính tâm lý phổ biến của con người là đổ lỗi cho người mang tin xấu (`blame the bearer of bad news`). Điều này làm cho kỹ năng giao tiếp trở nên tối quan trọng đối với kiểm thử viên. Việc truyền đạt kết quả kiểm thử có thể bị nhìn nhận như là sự chỉ trích đối với sản phẩm và tác giả của nó. **Thiên kiến xác nhận (`Confirmation bias`)** có thể khiến người ta khó chấp nhận những thông tin trái ngược với niềm tin hiện tại. Một số người có thể coi kiểm thử là một hoạt động mang tính phá hoại (`destructive activity`), mặc dù nó đóng góp rất lớn vào sự thành công của dự án và chất lượng sản phẩm. Để cố gắng cải thiện quan điểm này, thông tin về các khiếm khuyết và hỏng hóc nên được truyền đạt theo **cách mang tính xây dựng (`constructive way`)**.

### 1.5.2. Cách tiếp cận Toàn nhóm (Whole Team Approach) `[FL-1.5.2 (K1)]`
Một trong những kỹ năng quan trọng đối với một kiểm thử viên là khả năng làm việc hiệu quả trong bối cảnh nhóm và đóng góp tích cực vào mục tiêu chung của nhóm. **Cách tiếp cận toàn nhóm (`Whole team approach`)** – một thực hành bắt nguồn từ Lập trình cực hạn (`Extreme Programming - XP`, xem mục 2.1) – được xây dựng dựa trên kỹ năng này.

Trong cách tiếp cận toàn nhóm, bất kỳ thành viên nào trong nhóm có kiến thức và kỹ năng cần thiết đều có thể thực hiện bất kỳ công việc nào, và **mọi người đều chịu trách nhiệm về chất lượng (`everyone is responsible for quality`)**. Các thành viên trong nhóm chia sẻ cùng một không gian làm việc (vật lý hoặc ảo), vì việc ngồi chung (`co-location`) tạo điều kiện thuận lợi cho giao tiếp và tương tác. Cách tiếp cận toàn nhóm cải thiện động lực nhóm (`team dynamics`), tăng cường giao tiếp và cộng tác trong nhóm, đồng thời tạo ra sức mạnh tổng hợp (`synergy`) bằng cách cho phép tận dụng các bộ kỹ năng khác nhau trong nhóm vì lợi ích của dự án.

Kiểm thử viên làm việc chặt chẽ với các thành viên khác trong nhóm để đảm bảo đạt được các mức chất lượng mong muốn. Điều này bao gồm việc cộng tác với các đại diện nghiệp vụ (`business representatives`) để giúp họ tạo ra các bài kiểm thử chấp nhận (`acceptance tests`) phù hợp và làm việc với các lập trình viên (`developers`) để thống nhất về chiến lược kiểm thử và quyết định các cách tiếp cận tự động hóa kiểm thử. Nhờ đó, kiểm thử viên có thể chuyển giao kiến thức kiểm thử cho các thành viên khác trong nhóm và gây ảnh hưởng tích cực đến việc phát triển sản phẩm.

Tùy thuộc vào ngữ cảnh, cách tiếp cận toàn nhóm không phải lúc nào cũng phù hợp. Chẳng hạn, trong một số tình huống như hệ thống quan trọng về an toàn (`safety-critical`), một mức độ độc lập kiểm thử cao có thể là cần thiết.

### 1.5.3. Tính độc lập của Kiểm thử (Independence of Testing) `[FL-1.5.3 (K2)]`
Một mức độ độc lập nhất định giúp kiểm thử viên tìm kiếm khiếm khuyết hiệu quả hơn do sự khác biệt về **thiên kiến nhận thức (`cognitive biases`)** giữa tác giả (`author`) và kiểm thử viên (`tester`) (Salman 1995). Tuy nhiên, sự độc lập không phải là sự thay thế cho sự quen thuộc (`familiarity`), ví dụ: các lập trình viên có thể tìm thấy nhiều khiếm khuyết trong chính mã nguồn của họ một cách hiệu quả.

Các sản phẩm công việc có thể được kiểm thử theo thứ tự mức độ độc lập tăng dần:
1. **Không có tính độc lập (`No independence`):** được kiểm thử bởi chính tác giả tạo ra chúng.
2. **Có một chút độc lập (`Some independence`):** được kiểm thử bởi các đồng nghiệp cùng nhóm với tác giả (`author's peers from the same team`).
3. **Tính độc lập cao (`High independence`):** được kiểm thử bởi các kiểm thử viên bên ngoài nhóm của tác giả nhưng vẫn trong cùng tổ chức.
4. **Tính độc lập rất cao (`Very high independence`):** được kiểm thử bởi các kiểm thử viên từ bên ngoài tổ chức.

Đối với hầu hết các dự án, thông thường tốt nhất là thực hiện kiểm thử với **nhiều mức độ độc lập khác nhau** (ví dụ: các lập trình viên thực hiện kiểm thử thành phần và kiểm thử tích hợp thành phần, nhóm kiểm thử thực hiện kiểm thử hệ thống và kiểm thử tích hợp hệ thống, và các đại diện nghiệp vụ thực hiện kiểm thử chấp nhận).

- **Lợi ích chính (`Main benefit`)** của tính độc lập trong kiểm thử là các kiểm thử viên độc lập có khả năng nhận ra các loại hỏng hóc và khiếm khuyết khác so với các lập trình viên vì họ có nền tảng, góc nhìn kỹ thuật và các thiên kiến khác nhau. Hơn nữa, một kiểm thử viên độc lập có thể xác minh, phản biện hoặc bác bỏ các giả định (`assumptions`) do các bên liên quan đưa ra trong quá trình đặc tả và triển khai hệ thống.
- **Tuy nhiên, cũng có một số hạn chế (`drawbacks`):** Kiểm thử viên độc lập có thể bị cô lập khỏi nhóm phát triển, dẫn đến thiếu sự hợp tác, gặp các vấn đề giao tiếp, hoặc mối quan hệ đối đầu (`adversarial relationship`) với nhóm phát triển. Các lập trình viên có thể mất đi ý thức trách nhiệm đối với chất lượng. Kiểm thử viên độc lập có thể bị coi là nút thắt cổ chai (`bottleneck`) hoặc bị đổ lỗi cho sự chậm trễ trong việc phát hành.

---

# Chương 2: Kiểm thử Xuyên suốt Vòng đời Phát triển Phần mềm (Testing Throughout the Software Development Lifecycle) – 130 phút

### Từ khóa (Keywords - K1)
`acceptance testing` (kiểm thử chấp nhận), `black-box testing` (kiểm thử hộp đen), `component integration testing` (kiểm thử tích hợp thành phần), `component testing` (kiểm thử thành phần/đơn vị), `confirmation testing` (kiểm thử xác nhận), `functional testing` (kiểm thử chức năng), `integration testing` (kiểm thử tích hợp), `maintenance testing` (kiểm thử bảo trì), `non-functional testing` (kiểm thử phi chức năng), `regression testing` (kiểm thử hồi quy), `shift left` (dịch trái - kiểm thử sớm), `system integration testing` (kiểm thử tích hợp hệ thống), `system testing` (kiểm thử hệ thống), `test level` (cấp độ kiểm thử), `test object` (đối tượng kiểm thử), `test type` (loại kiểm thử), `white-box testing` (kiểm thử hộp trắng).

### Mục tiêu học tập Chương 2 (Learning Objectives)
- **2.1 Kiểm thử trong Ngữ cảnh của Vòng đời Phát triển Phần mềm (Testing in the Context of a Software Development Lifecycle)**
  - `FL-2.1.1 (K2)` Giải thích tác động của vòng đời phát triển phần mềm được chọn lên hoạt động kiểm thử
  - `FL-2.1.2 (K1)` Nhớ lại các thực hành kiểm thử tốt áp dụng cho mọi vòng đời phát triển phần mềm
  - `FL-2.1.3 (K1)` Nhớ lại các ví dụ về cách tiếp cận kiểm thử trước (`test-first approaches`) trong phát triển
  - `FL-2.1.4 (K2)` Tóm tắt cách DevOps có thể tác động đến kiểm thử
  - `FL-2.1.5 (K2)` Giải thích khái niệm `shift left`
  - `FL-2.1.6 (K2)` Giải thích cách các buổi họp nhìn lại (`retrospectives`) có thể được sử dụng làm cơ chế cải tiến quy trình
- **2.2 Các Cấp độ Kiểm thử và Các Loại Kiểm thử (Test Levels and Test Types)**
  - `FL-2.2.1 (K2)` Phân biệt các cấp độ kiểm thử khác nhau (`test levels`)
  - `FL-2.2.2 (K2)` Phân biệt các loại kiểm thử khác nhau (`test types`)
  - `FL-2.2.3 (K2)` Phân biệt kiểm thử xác nhận (`confirmation testing`) với kiểm thử hồi quy (`regression testing`)
- **2.3 Kiểm thử Bảo trì (Maintenance Testing)**
  - `FL-2.3.1 (K2)` Tóm tắt về kiểm thử bảo trì và các tác nhân kích hoạt nó (`triggers`)

---

## 2.1. Kiểm thử trong Ngữ cảnh của Vòng đời Phát triển Phần mềm (SDLC)

Mô hình SDLC là một biểu diễn trừu tượng, ở mức độ cao của quy trình phát triển phần mềm. Một mô hình SDLC xác định cách thức mà các giai đoạn phát triển khác nhau và các loại hoạt động được thực hiện trong quy trình này liên hệ với nhau, cả về mặt logic lẫn trình tự thời gian. Ví dụ về các mô hình SDLC bao gồm:
- **Mô hình phát triển tuần tự (`Sequential development models`):** ví dụ: mô hình thác nước (`waterfall model`), mô hình chữ V (`V-model`).
- **Mô hình phát triển lặp (`Iterative development models`):** ví dụ: mô hình xoắn ốc (`spiral model`), tạo mẫu (`prototyping`).
- **Mô hình phát triển tăng trưởng (`Incremental development models`):** ví dụ: Tiến trình Hợp nhất (`Unified Process`).

Một số hoạt động trong quy trình phát triển phần mềm cũng có thể được mô tả bằng các phương pháp phát triển phần mềm chi tiết hơn và các thực hành Agile. Ví dụ bao gồm: phát triển hướng kiểm thử chấp nhận (`Acceptance Test-Driven Development - ATDD`), phát triển hướng hành vi (`Behavior-Driven Development - BDD`), thiết kế hướng miền (`Domain-Driven Design - DDD`), lập trình cực hạn (`Extreme Programming - XP`), phát triển hướng tính năng (`Feature-Driven Development - FDD`), Kanban, Lean IT, Scrum, và phát triển hướng kiểm thử (`Test-Driven Development - TDD`).

### 2.1.1. Tác động của Vòng đời Phát triển Phần mềm lên Kiểm thử `[FL-2.1.1 (K2)]`
Kiểm thử phải được điều chỉnh cho thích ứng với SDLC để thành công. Việc lựa chọn SDLC tác động lên:
- Phạm vi và thời điểm của các hoạt động kiểm thử (ví dụ: các cấp độ kiểm thử và các loại kiểm thử)
- Mức độ chi tiết của tài liệu kiểm thử
- Việc lựa chọn các kỹ thuật kiểm thử và cách tiếp cận kiểm thử
- Mức độ tự động hóa kiểm thử
- Vai trò và trách nhiệm của một kiểm thử viên

- **Trong các mô hình phát triển tuần tự (`sequential development models`):** ở các giai đoạn ban đầu, kiểm thử viên thường tham gia vào việc duyệt yêu cầu (`requirement reviews`), phân tích kiểm thử, và thiết kế kiểm thử. Mã nguồn có thể thực thi thường được tạo ra ở các giai đoạn muộn hơn, vì vậy thông thường kiểm thử động không thể thực hiện sớm trong SDLC.
- **Trong một số mô hình phát triển lặp (`iterative development models`) và mô hình phát triển tăng trưởng (`incremental development models`):** người ta giả định rằng mỗi vòng lặp (`iteration`) sẽ chuyển giao một nguyên mẫu hoạt động được (`working prototype`) hoặc một phần tăng trưởng của sản phẩm (`product increment`). Điều này ngụ ý rằng trong mỗi vòng lặp, cả kiểm thử tĩnh và kiểm thử động đều có thể được thực hiện ở tất cả các cấp độ kiểm thử. Việc chuyển giao thường xuyên các phần tăng trưởng đòi hỏi phản hồi nhanh (`fast feedback`) và kiểm thử hồi quy sâu rộng (`extensive regression testing`).
- **Phát triển phần mềm Agile (`Agile software development`):** giả định rằng sự thay đổi có thể xảy ra xuyên suốt dự án. Do đó, tài liệu sản phẩm công việc gọn nhẹ (`lightweight work product documentation`) và tự động hóa kiểm thử sâu rộng để giúp kiểm thử hồi quy dễ dàng hơn được ưu tiên trong các dự án Agile. Ngoài ra, hầu hết các kiểm thử thủ công có xu hướng được thực hiện bằng cách sử dụng các kỹ thuật kiểm thử dựa trên kinh nghiệm (`experience-based test techniques`, xem Mục 4.4) vốn không đòi hỏi việc phân tích và thiết kế kiểm thử sâu rộng từ trước.

### 2.1.2. Vòng đời Phát triển Phần mềm và các Thực hành Kiểm thử Tốt `[FL-2.1.2 (K1)]`
Các thực hành kiểm thử tốt, **không phụ thuộc vào mô hình SDLC đã chọn**, bao gồm:
- Đối với mỗi hoạt động phát triển phần mềm, đều có một hoạt động kiểm thử tương ứng, sao cho tất cả các hoạt động phát triển đều chịu sự kiểm soát chất lượng (`quality control`).
- Các cấp độ kiểm thử khác nhau (xem mục 2.2.1) có các mục tiêu kiểm thử cụ thể và khác nhau, cho phép việc kiểm thử được toàn diện một cách hợp lý trong khi tránh được sự dư thừa/trùng lặp (`redundancy`).
- Việc phân tích và thiết kế kiểm thử cho một cấp độ kiểm thử nhất định bắt đầu ngay trong giai đoạn phát triển tương ứng của SDLC, để kiểm thử có thể tuân thủ nguyên lý kiểm thử sớm (`early testing`, xem mục 1.3).
- Kiểm thử viên tham gia vào việc duyệt (`reviewing`) các sản phẩm công việc ngay khi các bản nháp (`drafts`) của các sản phẩm công việc này vừa có sẵn, để việc kiểm thử và phát hiện khiếm khuyết sớm hơn này có thể hỗ trợ cho `shift left` (xem mục 2.1.5).

### 2.1.3. Kiểm thử như một Động lực Dẫn dắt Phát triển Phần mềm (Testing as a Driver for Software Development) `[FL-2.1.3 (K1)]`
**TDD, ATDD và BDD** là các cách tiếp cận phát triển tương tự nhau, trong đó các bài kiểm thử được định nghĩa như một phương tiện để định hướng việc phát triển. Mỗi cách tiếp cận này đều hiện thực hóa nguyên lý kiểm thử sớm (xem mục 1.3) và tuân theo `shift left` (xem mục 2.1.5), bởi vì các bài kiểm thử được định nghĩa **trước khi mã nguồn được viết**. Chúng hỗ trợ mô hình phát triển lặp. Các cách tiếp cận này có đặc điểm như sau:

- **Phát triển hướng Kiểm thử (`Test-Driven Development - TDD`):**
  - Định hướng việc viết mã thông qua các ca kiểm thử (thay vì thiết kế phần mềm sâu rộng) (Beck 2003).
  - Các bài kiểm thử được viết trước, sau đó mã nguồn được viết để thỏa mãn các bài kiểm thử đó, và cuối cùng các bài kiểm thử cùng mã nguồn được tái cấu trúc (`refactored`).
- **Phát triển hướng Kiểm thử Chấp nhận (`Acceptance Test-Driven Development - ATDD`)** (xem mục 4.5.3):
  - Xây dựng các bài kiểm thử từ các tiêu chí chấp nhận (`acceptance criteria`) như một phần của quy trình thiết kế hệ thống (Gärtner 2011).
  - Các bài kiểm thử được viết trước khi phần ứng dụng đó được phát triển để thỏa mãn các bài kiểm thử.
- **Phát triển hướng Hành vi (`Behavior-Driven Development - BDD`):**
  - Diễn đạt hành vi mong muốn của một ứng dụng bằng các ca kiểm thử được viết dưới dạng ngôn ngữ tự nhiên đơn giản, dễ hiểu đối với các bên liên quan – thường sử dụng định dạng **Given/When/Then** (Chelimsky 2010).
  - Các ca kiểm thử sau đó nên được tự động dịch thành các bài kiểm thử có thể thực thi được (`executable tests`).

Đối với tất cả các cách tiếp cận trên, các bài kiểm thử có thể được duy trì lâu dài dưới dạng các bài kiểm thử tự động để đảm bảo chất lượng mã nguồn trong các lần điều chỉnh / tái cấu trúc (`refactoring`) trong tương lai.

### 2.1.4. DevOps và Kiểm thử (DevOps and Testing) `[FL-2.1.4 (K2)]`
**DevOps** là một cách tiếp cận mang tính tổ chức nhằm tạo ra sức mạnh tổng hợp (`synergy`) bằng cách đưa bộ phận phát triển (`development` - bao gồm cả kiểm thử) và bộ phận vận hành (`operations`) làm việc cùng nhau để đạt được một tập hợp các mục tiêu chung. DevOps đòi hỏi một sự thay đổi văn hóa (`cultural shift`) trong tổ chức để thu hẹp khoảng cách giữa phát triển (bao gồm kiểm thử) và vận hành, đồng thời coi trọng chức năng của hai bên ngang nhau. DevOps thúc đẩy quyền tự chủ của nhóm (`team autonomy`), phản hồi nhanh (`fast feedback`), chuỗi công cụ tích hợp (`integrated toolchains`), và các thực hành kỹ thuật như tích hợp liên tục (`continuous integration - CI`) và chuyển giao liên tục (`continuous delivery - CD`). Điều này cho phép các nhóm xây dựng, kiểm thử và phát hành mã nguồn chất lượng cao nhanh hơn thông qua một đường ống chuyển giao DevOps (`DevOps delivery pipeline`) (Kim 2016).

Từ góc độ kiểm thử, một số **lợi ích của DevOps** là:
- Phản hồi nhanh về chất lượng mã nguồn, và liệu các thay đổi có gây ảnh hưởng bất lợi đến mã nguồn hiện có hay không.
- CI thúc đẩy `shift left` trong kiểm thử (xem mục 2.1.5) bằng cách khuyến khích các lập trình viên nộp mã nguồn chất lượng cao đi kèm với các bài kiểm thử thành phần (`component tests`) và phân tích tĩnh (`static analysis`).
- Các quy trình tự động được thúc đẩy như CI/CD giúp tạo điều kiện thiết lập các môi trường kiểm thử ổn định.
- Tăng khả năng quan sát (`visibility`) đối với các đặc tính chất lượng phi chức năng (ví dụ: hiệu suất hoạt động - `performance efficiency`, độ tin cậy - `reliability`).
- Tự động hóa thông qua đường ống chuyển giao làm giảm nhu cầu kiểm thử thủ công lặp đi lặp lại.
- Rủi ro hồi quy (`risk of regression`) được giảm thiểu nhờ quy mô và phạm vi của các bài kiểm thử hồi quy tự động.

DevOps cũng không tránh khỏi những **rủi ro và thách thức**, bao gồm:
- Đường ống chuyển giao DevOps phải được định nghĩa và thiết lập.
- Các công cụ CI / CD phải được đưa vào và bảo trì.
- Tự động hóa kiểm thử đòi hỏi thêm nguồn lực và có thể khó thiết lập cũng như bảo trì.

Mặc dù DevOps đi kèm với mức độ kiểm thử tự động hóa cao, kiểm thử thủ công – đặc biệt là từ góc nhìn của người dùng – vẫn sẽ cần thiết.

### 2.1.5. Dịch trái (Shift Left) `[FL-2.1.5 (K2)]`
Nguyên lý kiểm thử sớm (xem mục 1.3) đôi khi được gọi là **`shift left`** vì đây là cách tiếp cận mà trong đó kiểm thử được thực hiện sớm hơn trong SDLC. `Shift left` về cơ bản gợi ý rằng kiểm thử nên được thực hiện sớm hơn (ví dụ: không chờ mã nguồn được viết xong hoặc không chờ các thành phần được tích hợp xong), nhưng điều đó **không có nghĩa là** việc kiểm thử ở giai đoạn muộn hơn trong SDLC bị bỏ qua.

Có một số thực hành tốt minh họa cách đạt được "shift left" trong kiểm thử, bao gồm:
- Duyệt đặc tả (`reviewing the specification`) từ góc nhìn của kiểm thử viên. Các hoạt động duyệt trên đặc tả này thường tìm thấy các khiếm khuyết tiềm ẩn, chẳng hạn như sự mơ hồ (`ambiguities`), thiếu sót (`incompleteness`), và mâu thuẫn (`inconsistencies`).
- Viết các ca kiểm thử trước khi mã nguồn được viết và cho mã nguồn chạy trong một khung giá đỡ kiểm thử (`test harness`) trong quá trình viết mã.
- Sử dụng CI và tốt hơn nữa là CD vì nó đi kèm với phản hồi nhanh và các bài kiểm thử thành phần tự động đi kèm với mã nguồn khi được đẩy lên kho lưu trữ mã (`code repository`).
- Hoàn thành phân tích tĩnh mã nguồn trước khi kiểm thử động, hoặc như một phần của quy trình tự động.
- Thực hiện kiểm thử phi chức năng (`non-functional testing`) bắt đầu ngay từ cấp độ kiểm thử thành phần (`component test level`) khi có thể. Đây là một hình thức `shift left` vì các loại kiểm thử phi chức năng này thường có xu hướng được thực hiện muộn hơn trong SDLC khi đã có một hệ thống hoàn chỉnh và một môi trường kiểm thử đại diện.

`Shift left` có thể dẫn đến việc tốn thêm đào tạo, công sức và/hoặc chi phí sớm hơn trong quy trình nhưng được kỳ vọng sẽ tiết kiệm công sức và/hoặc chi phí ở giai đoạn sau của quy trình.

Đối với `shift left`, điều quan trọng là các bên liên quan phải bị thuyết phục và đồng thuận (`bought into`) với khái niệm này.

### 2.1.6. Họp nhìn lại và Cải tiến Quy trình (Retrospectives and Process Improvement) `[FL-2.1.6 (K2)]`
Các buổi họp nhìn lại (`Retrospectives`) thường được tổ chức vào cuối một dự án hoặc một vòng lặp (`iteration`), tại một cột mốc phát hành (`release milestone`), hoặc có thể được tổ chức bất cứ khi nào cần thiết. Thời điểm và cách tổ chức các buổi họp nhìn lại phụ thuộc vào mô hình SDLC cụ thể đang được tuân theo. Trong các cuộc họp này, những người tham gia (không chỉ kiểm thử viên mà còn cả lập trình viên, kiến trúc sư, chủ sở hữu sản phẩm `product owner`, chuyên viên phân tích nghiệp vụ `business analysts`) thảo luận về:
- Điều gì đã thành công, và nên được giữ lại?
- Điều gì chưa thành công và có thể được cải thiện?
- Làm thế nào để đưa các cải tiến vào và duy trì các thành công đó trong tương lai?

Kết quả cần được ghi lại và thường là một phần của báo cáo hoàn tất kiểm thử (`test completion report`, xem mục 5.3.2). Các buổi họp nhìn lại đóng vai trò sống còn đối với việc triển khai thành công sự cải tiến liên tục (`continuous improvement`), và điều quan trọng là mọi cải tiến được khuyến nghị đều phải được theo dõi thực hiện (`followed up`).

Các lợi ích điển hình cho kiểm thử bao gồm:
- Tăng hiệu quả / hiệu suất kiểm thử (`test effectiveness / efficiency`) (ví dụ: bằng cách thực hiện các đề xuất cải tiến quy trình).
- Tăng chất lượng của `testware` (ví dụ: bằng cách cùng nhau rà soát lại các quy trình kiểm thử).
- Gắn kết nhóm và học hỏi (`team bonding and learning`) (ví dụ: nhờ cơ hội nêu ra các vấn đề và đề xuất các điểm cải tiến).
- Cải thiện chất lượng của cơ sở kiểm thử (`test basis`) (ví dụ: khi những thiếu sót về phạm vi và chất lượng của các yêu cầu được giải quyết).
- Hợp tác tốt hơn giữa phát triển và kiểm thử (ví dụ: khi sự cộng tác được rà soát và tối ưu hóa thường xuyên).

---

## 2.2. Các Cấp độ Kiểm thử và Các Loại Kiểm thử (Test Levels and Test Types)

- **Các cấp độ kiểm thử (`Test levels`)** là các nhóm hoạt động kiểm thử được tổ chức và quản lý cùng nhau. Mỗi cấp độ kiểm thử là một thể hiện (`instance`) của tiến trình kiểm thử, được thực hiện đối với phần mềm ở một giai đoạn phát triển nhất định, từ các thành phần riêng lẻ cho đến các hệ thống hoàn chỉnh hoặc, nếu có, hệ thống của các hệ thống (`systems of systems`). Các cấp độ kiểm thử có liên quan đến các hoạt động khác trong SDLC. Trong các mô hình SDLC tuần tự, các cấp độ kiểm thử thường được định nghĩa sao cho tiêu chí kết thúc (`exit criteria`) của cấp độ này là một phần của tiêu chí bắt đầu (`entry criteria`) cho cấp độ tiếp theo. Trong một số mô hình lặp, điều này có thể không áp dụng. Các hoạt động phát triển có thể trải dài qua nhiều cấp độ kiểm thử. Các cấp độ kiểm thử có thể gối đầu/chồng lấp nhau về mặt thời gian (`overlap in time`).
- **Các loại kiểm thử (`Test types`)** là các nhóm hoạt động kiểm thử liên quan đến các đặc tính chất lượng cụ thể (`specific quality characteristics`) và hầu hết các hoạt động kiểm thử đó **có thể được thực hiện ở mọi cấp độ kiểm thử (`at every test level`)**.

### 2.2.1. Các Cấp độ Kiểm thử (Test Levels) `[FL-2.2.1 (K2)]`
Trong đề cương này, **5 cấp độ kiểm thử** sau đây được mô tả:

1. **Kiểm thử thành phần (`Component testing` - còn được gọi là kiểm thử đơn vị `unit testing`):** Tập trung vào việc kiểm thử các thành phần một cách cô lập (`in isolation`). Nó thường đòi hỏi sự hỗ trợ cụ thể, chẳng hạn như các khung giá đỡ kiểm thử (`test harnesses`) hoặc các bộ khung kiểm thử đơn vị (`unit test frameworks`). Kiểm thử thành phần thường được thực hiện bởi các lập trình viên trong môi trường phát triển của họ.
2. **Kiểm thử tích hợp thành phần (`Component integration testing` - còn gọi là `unit integration testing`):** Tập trung vào việc kiểm thử các giao diện (`interfaces`) và tương tác (`interactions`) giữa các thành phần. Kiểm thử tích hợp thành phần phụ thuộc rất nhiều vào các chiến lược tích hợp như từ dưới lên (`bottom-up`), từ trên xuống (`top-down`) hoặc tích hợp đồng loạt (`big-bang`).
3. **Kiểm thử hệ thống (`System testing`):** Tập trung vào hành vi và khả năng tổng thể của toàn bộ một hệ thống hoặc sản phẩm, thường bao gồm kiểm thử chức năng của các tác vụ đầu-cuối (`end-to-end tasks`) và kiểm thử phi chức năng đối với các đặc tính chất lượng. Đối với một số đặc tính chất lượng phi chức năng, tốt hơn là nên kiểm thử chúng trên một hệ thống hoàn chỉnh trong một môi trường kiểm thử đại diện (`representative test environment`, ví dụ: khả năng sử dụng - `usability`). Việc sử dụng các mô phỏng của các hệ thống con (`simulations of sub-systems`) cũng có thể thực hiện được. Kiểm thử hệ thống có thể được thực hiện bởi một nhóm kiểm thử độc lập, và gắn liền với các đặc tả của hệ thống.
4. **Kiểm thử tích hợp hệ thống (`System integration testing`):** Tập trung vào việc kiểm thử các giao diện của hệ thống đang được kiểm thử (`system under test`) với các hệ thống khác và các dịch vụ bên ngoài (`external services`). Kiểm thử tích hợp hệ thống đòi hỏi các môi trường kiểm thử phù hợp, tốt nhất là tương tự như môi trường vận hành thực tế (`operational environment`).
5. **Kiểm thử chấp nhận (`Acceptance testing`):** Tập trung vào việc thẩm định (`validation`) và chứng minh sự sẵn sàng để triển khai (`readiness for deployment`), nghĩa là hệ thống đáp ứng được nhu cầu kinh doanh của người dùng. Lý tưởng nhất, kiểm thử chấp nhận nên được thực hiện bởi những người dùng dự kiến (`intended users`). Các hình thức chính của kiểm thử chấp nhận là: kiểm thử chấp nhận người dùng (`user acceptance testing - UAT`), kiểm thử chấp nhận vận hành (`operational acceptance testing`), kiểm thử chấp nhận theo hợp đồng và quy định chế tài (`contractual and regulatory acceptance testing`), kiểm thử alpha (`alpha testing`) và kiểm thử beta (`beta testing`).

Các cấp độ kiểm thử được phân biệt bởi danh sách (chưa đầy đủ) các thuộc tính sau đây, nhằm tránh sự chồng chéo của các hoạt động kiểm thử:
- Đối tượng kiểm thử (`Test object`)
- Mục tiêu kiểm thử (`Test objectives`)
- Cơ sở kiểm thử (`Test basis`)
- Khiếm khuyết và hỏng hóc (`Defects and failures`)
- Cách tiếp cận và trách nhiệm (`Approach and responsibilities`)

### 2.2.2. Các Loại Kiểm thử (Test Types) `[FL-2.2.2 (K2)]`
Có rất nhiều loại kiểm thử tồn tại và có thể áp dụng trong các dự án. Trong đề cương này, **4 loại kiểm thử** sau đây được giải quyết:

1. **Kiểm thử chức năng (`Functional testing`):** Đánh giá các chức năng mà một thành phần hoặc hệ thống phải thực hiện. Các chức năng là **"cái gì" (`"what"`)** mà đối tượng kiểm thử phải làm. Mục tiêu chính của kiểm thử chức năng là kiểm tra tính đầy đủ chức năng (`functional completeness`), tính đúng đắn chức năng (`functional correctness`) và tính phù hợp chức năng (`functional appropriateness`).
2. **Kiểm thử phi chức năng (`Non-functional testing`):** Đánh giá các thuộc tính khác ngoài các đặc tính chức năng của một thành phần hoặc hệ thống. Kiểm thử phi chức năng là việc kiểm thử **"hệ thống hoạt động tốt như thế nào" (`"how well the system behaves"`)**. Mục tiêu chính của kiểm thử phi chức năng là kiểm tra các đặc tính chất lượng phi chức năng. Tiêu chuẩn **ISO/IEC 25010** cung cấp phân loại các đặc tính chất lượng phi chức năng như sau:
   - Hiệu suất hoạt động (`Performance efficiency`)
   - Tính tương thích (`Compatibility`)
   - Khả năng sử dụng (`Usability` - còn được gọi là khả năng tương tác `interaction capability`)
   - Độ tin cậy (`Reliability`)
   - Tính bảo mật (`Security`)
   - Khả năng bảo trì (`Maintainability`)
   - Tính khả chuyển (`Portability` - còn được gọi là tính linh hoạt `flexibility`)
   - Tính an toàn (`Safety`)
   Đôi khi việc bắt đầu kiểm thử phi chức năng sớm trong SDLC là phù hợp (ví dụ: như một phần của việc duyệt hoặc kiểm thử thành phần). Nhiều bài kiểm thử phi chức năng được dẫn xuất từ các bài kiểm thử chức năng vì chúng sử dụng cùng các bài kiểm thử chức năng đó, nhưng kiểm tra xem trong khi thực hiện chức năng, một ràng buộc phi chức năng có được thỏa mãn hay không (ví dụ: kiểm tra xem một chức năng có thực hiện trong một khoảng thời gian quy định hay không, hoặc một chức năng có thể chuyển đổi sang một nền tảng mới hay không). Việc phát hiện muộn các khiếm khuyết phi chức năng có thể tạo ra mối đe dọa nghiêm trọng cho sự thành công của dự án. Kiểm thử phi chức năng đôi khi cần một môi trường kiểm thử rất đặc thù, chẳng hạn như phòng thí nghiệm khả năng sử dụng (`usability lab`) cho kiểm thử khả năng sử dụng.
3. **Kiểm thử hộp đen (`Black-box testing`, xem mục 4.2):** Dựa trên đặc tả (`specification-based`) và dẫn xuất các bài kiểm thử từ tài liệu không liên quan đến cấu trúc bên trong của đối tượng kiểm thử. Mục tiêu chính của kiểm thử hộp đen là kiểm tra hành vi của hệ thống so với các đặc tả của nó.
4. **Kiểm thử hộp trắng (`White-box testing`, xem mục 4.3):** Dựa trên cấu trúc (`structure-based`) và dẫn xuất các bài kiểm thử từ việc triển khai hoặc cấu trúc bên trong của hệ thống (ví dụ: mã nguồn, kiến trúc, luồng công việc `workflows`, và luồng dữ liệu `data flows`). Mục tiêu chính của kiểm thử hộp trắng là bao phủ cấu trúc bên dưới bằng các bài kiểm thử tới một mức độ chấp nhận được.

**Tất cả 4 loại kiểm thử nêu trên đều có thể áp dụng cho tất cả các cấp độ kiểm thử**, mặc dù trọng tâm sẽ khác nhau ở mỗi cấp độ. Các kỹ thuật kiểm thử khác nhau có thể được sử dụng để dẫn xuất các điều kiện kiểm thử và các ca kiểm thử cho tất cả các loại kiểm thử đã nêu.

### 2.2.3. Kiểm thử Xác nhận và Kiểm thử Hồi quy (Confirmation Testing and Regression Testing) `[FL-2.2.3 (K2)]`
Các thay đổi thường được thực hiện đối với một thành phần hoặc hệ thống để nâng cấp nó bằng cách thêm một tính năng mới hoặc để sửa nó bằng cách loại bỏ một khiếm khuyết. Khi đó, việc kiểm thử cũng phải bao gồm **kiểm thử xác nhận (`confirmation testing`)** và **kiểm thử hồi quy (`regression testing`)**.

- **Kiểm thử xác nhận (`Confirmation testing`):** Xác nhận rằng một khiếm khuyết ban đầu đã được sửa thành công. Tùy thuộc vào rủi ro, người ta có thể kiểm thử phiên bản đã sửa của phần mềm theo nhiều cách, bao gồm:
  - Thực thi tất cả các bài kiểm thử trước đó đã bị thất bại (`failed`) do khiếm khuyết đó, hoặc, ngoài ra bằng cách
  - Thêm các bài kiểm thử mới để bao phủ bất kỳ thay đổi nào cần thiết để sửa khiếm khuyết đó.
  Tuy nhiên, khi thời gian hoặc tiền bạc eo hẹp trong lúc sửa khiếm khuyết, kiểm thử xác nhận có thể chỉ giới hạn ở việc đơn thuần thực hiện lại các bước kiểm thử dùng để tái hiện hỏng hóc do khiếm khuyết đó gây ra và kiểm tra xem hỏng hóc đó không còn xảy ra nữa.

- **Kiểm thử hồi quy (`Regression testing`):** Xác nhận rằng không có hệ quả bất lợi nào (`no adverse consequences`) bị gây ra bởi một thay đổi, bao gồm cả một bản sửa lỗi vốn đã được kiểm thử xác nhận. Những hệ quả bất lợi này có thể ảnh hưởng đến cùng thành phần nơi thay đổi được thực hiện, các thành phần khác trong cùng hệ thống, hoặc thậm chí các hệ thống được kết nối khác. Kiểm thử hồi quy có thể không chỉ giới hạn ở bản thân đối tượng kiểm thử mà còn có thể liên quan đến môi trường. Lời khuyên là trước tiên nên thực hiện **phân tích tác động (`impact analysis`)** để nhận biết phạm vi của kiểm thử hồi quy. Phân tích tác động cho thấy những phần nào của phần mềm có thể bị ảnh hưởng.
  Các bộ kiểm thử hồi quy (`regression test suites`) được chạy nhiều lần và nhìn chung số lượng ca kiểm thử hồi quy sẽ tăng lên sau mỗi vòng lặp hoặc bản phát hành, vì vậy **kiểm thử hồi quy là một ứng cử viên sáng giá cho việc tự động hóa (`strong candidate for automation`)**. Tự động hóa kiểm thử nên bắt đầu sớm trong dự án. Ở những nơi sử dụng CI, chẳng hạn như trong DevOps (xem mục 2.1.4), một thực hành tốt là bao gồm luôn cả các bài kiểm thử hồi quy tự động. Tùy thuộc vào tình huống, điều này có thể bao gồm các bài kiểm thử hồi quy ở các cấp độ kiểm thử khác nhau.

Kiểm thử xác nhận và/hoặc kiểm thử hồi quy cho đối tượng kiểm thử là cần thiết **ở tất cả các cấp độ kiểm thử** nếu các khiếm khuyết được sửa và/hoặc các thay đổi được thực hiện ở các cấp độ kiểm thử này.

---

## 2.3. Kiểm thử Bảo trì (Maintenance Testing) `[FL-2.3.1 (K2)]`

Có nhiều loại bảo trì khác nhau: có thể là bảo trì khắc phục lỗi (`corrective`), thích ứng với các thay đổi trong môi trường (`adaptive`), hoặc cải thiện hiệu suất hay khả năng bảo trì (xem ISO/IEC 14764 để biết chi tiết), vì vậy bảo trì có thể bao gồm cả các đợt phát hành/triển khai có kế hoạch (`planned releases/deployments`) và các đợt phát hành/triển khai không có kế hoạch (`unplanned releases/deployments` - các bản vá nóng `hot fixes`). Phân tích tác động (`impact analysis`) có thể được thực hiện trước khi một thay đổi được tiến hành, nhằm giúp quyết định xem có nên thực hiện thay đổi đó hay không, dựa trên các hệ quả tiềm tàng ở các khu vực khác của hệ thống. Việc kiểm thử các thay đổi đối với một hệ thống đang vận hành bao gồm cả việc đánh giá sự thành công của việc triển khai thay đổi đó lẫn việc kiểm tra các lỗi hồi quy có thể xảy ra ở các phần không thay đổi của hệ thống (vốn thường là phần lớn của hệ thống).

**Phạm vi của kiểm thử bảo trì (`scope of maintenance testing`)** thường phụ thuộc vào:
- Mức độ rủi ro của thay đổi (`The degree of risk of the change`)
- Kích thước của hệ thống hiện tại (`The size of the existing system`)
- Kích thước của thay đổi (`The size of the change`)

**Các tác nhân kích hoạt (`triggers`)** việc bảo trì và kiểm thử bảo trì có thể được phân loại như sau:
- **Các sửa đổi (`Modifications`):** chẳng hạn như các nâng cấp có kế hoạch (`planned enhancements` - tức là theo đợt phát hành), các thay đổi khắc phục lỗi (`corrective changes`) hoặc các bản vá nóng (`hot fixes`).
- **Nâng cấp hoặc di chuyển môi trường vận hành (`Upgrades or migrations of the operational environment`):** chẳng hạn như từ nền tảng này sang nền tảng khác, có thể đòi hỏi các bài kiểm thử gắn với môi trường mới cũng như đối với phần mềm đã thay đổi, hoặc kiểm thử việc chuyển đổi dữ liệu (`data conversion`) khi dữ liệu từ một ứng dụng khác được di chuyển (`migrated`) vào hệ thống đang được bảo trì.
- **Ngừng hoạt động / Nghỉ hưu hệ thống (`Retirement`):** chẳng hạn như khi một ứng dụng kết thúc vòng đời của nó (`reaches the end of its life`). Khi một hệ thống ngừng hoạt động, điều này có thể đòi hỏi việc kiểm thử lưu trữ dữ liệu (`data archiving`) nếu yêu cầu thời gian lưu giữ dữ liệu dài. Việc kiểm thử các thủ tục khôi phục và truy xuất (`restore and retrieval procedures`) sau khi lưu trữ cũng có thể cần thiết trong trường hợp cần đến một số dữ liệu nhất định trong suốt thời gian lưu trữ.

---

# Chương 3: Kiểm thử Tĩnh (Static Testing) – 80 phút

### Từ khóa (Keywords - K1)
`anomaly` (điểm bất thường), `dynamic testing` (kiểm thử động), `formal review` (duyệt chính thức/trang trọng), `informal review` (duyệt không chính thức), `inspection` (thanh tra - mức duyệt trang trọng nhất), `review` (duyệt/rà soát), `static analysis` (phân tích tĩnh), `static testing` (kiểm thử tĩnh), `technical review` (duyệt kỹ thuật), `walkthrough` (duyệt từng bước do tác giả dẫn dắt).

### Mục tiêu học tập Chương 3 (Learning Objectives)
- **3.1 Cơ bản về Kiểm thử Tĩnh (Static Testing Basics)**
  - `FL-3.1.1 (K1)` Nhận biết các loại sản phẩm công việc có thể được kiểm tra bằng kiểm thử tĩnh
  - `FL-3.1.2 (K2)` Giải thích giá trị của kiểm thử tĩnh
  - `FL-3.1.3 (K2)` So sánh và đối chiếu kiểm thử tĩnh và kiểm thử động
- **3.2 Phản hồi và Quy trình Duyệt (Feedback and Review Process)**
  - `FL-3.2.1 (K1)` Xác định lợi ích của việc phản hồi sớm và thường xuyên từ các bên liên quan
  - `FL-3.2.2 (K2)` Tóm tắt các hoạt động của quy trình duyệt (`review process`)
  - `FL-3.2.3 (K1)` Nhớ lại các trách nhiệm được giao cho các vai trò chính khi thực hiện duyệt
  - `FL-3.2.4 (K2)` So sánh và đối chiếu các loại duyệt (`review types`) khác nhau
  - `FL-3.2.5 (K1)` Nhớ lại các yếu tố góp phần tạo nên một buổi duyệt thành công

---

## 3.1. Cơ bản về Kiểm thử Tĩnh (Static Testing Basics)

Trái ngược với kiểm thử động (`dynamic testing`), trong kiểm thử tĩnh (`static testing`), phần mềm đang được kiểm thử **không cần phải được thực thi (`does not need to be executed`)**. Mã nguồn, đặc tả quy trình, đặc tả kiến trúc hệ thống hoặc các sản phẩm công việc khác được đánh giá thông qua việc kiểm tra thủ công (ví dụ: `reviews`) hoặc với sự trợ giúp của một công cụ (ví dụ: phân tích tĩnh `static analysis`). Các mục tiêu kiểm thử bao gồm cải thiện chất lượng, phát hiện khiếm khuyết và đánh giá các đặc tính như tính dễ đọc (`readability`), tính đầy đủ (`completeness`), tính đúng đắn (`correctness`), khả năng kiểm thử (`testability`) và tính nhất quán (`consistency`). Kiểm thử tĩnh có thể được áp dụng cho cả xác minh (`verification`) và thẩm định (`validation`).

Kiểm thử viên, đại diện nghiệp vụ (`Product Owner`, `business analyst`, v.v.) và lập trình viên làm việc cùng nhau trong các buổi lập bản đồ ví dụ (`example mappings`), viết câu chuyện người dùng cộng tác (`collaborative user story writing`) và các phiên làm mịn backlog (`backlog refinement sessions`) để đảm bảo rằng các `user stories` và các sản phẩm công việc liên quan đáp ứng các tiêu chí đã định nghĩa, ví dụ: Định nghĩa sự Sẵn sàng (`Definition of Ready`, xem mục 5.1.3). Các kỹ thuật duyệt (`review techniques`) có thể được áp dụng để đảm bảo các `user stories` đầy đủ, dễ hiểu và bao gồm các tiêu chí chấp nhận có thể kiểm thử được (`testable acceptance criteria`). Bằng cách đặt ra những câu hỏi đúng, kiểm thử viên khám phá, phản biện và giúp cải thiện các `user stories` được đề xuất.

Phân tích tĩnh (`Static analysis`) có thể xác định các vấn đề trước khi kiểm thử động trong khi thường đòi hỏi ít công sức hơn, vì không cần các ca kiểm thử (`no test cases are required`), và các công cụ (xem Chương 6) thường được sử dụng. Phân tích tĩnh thường được tích hợp vào các khung CI (xem mục 2.1.4). Mặc dù phần lớn được dùng để phát hiện các khiếm khuyết mã nguồn cụ thể, phân tích tĩnh cũng được dùng để đánh giá khả năng bảo trì (`maintainability`) và tính bảo mật (`security`). Công cụ kiểm tra chính tả (`spelling checkers`) và công cụ đánh giá tính dễ đọc (`readability tools`) là những ví dụ khác về công cụ phân tích tĩnh.

### 3.1.1. Các Sản phẩm Công việc có thể Kiểm tra bằng Kiểm thử Tĩnh `[FL-3.1.1 (K1)]`
Hầu như bất kỳ sản phẩm công việc nào cũng có thể được kiểm tra bằng kiểm thử tĩnh. Ví dụ bao gồm: tài liệu đặc tả yêu cầu, mã nguồn, kế hoạch kiểm thử, ca kiểm thử, các mục tồn đọng sản phẩm (`product backlog items`), điều lệ kiểm thử (`test charters`), tài liệu dự án, hợp đồng và các mô hình (`models`).

- **Đối với Duyệt (`Review`):** Bất kỳ sản phẩm công việc nào **có thể đọc và hiểu được (`can be read and understood`)** đều có thể là đối tượng của một buổi duyệt.
- **Đối với Phân tích tĩnh (`Static analysis`):** Các sản phẩm công việc **cần có một cấu trúc (`structure`)** để dựa vào đó chúng có thể được kiểm tra (ví dụ: các mô hình, mã nguồn hoặc văn bản có cú pháp hình thức `formal syntax`).

Các sản phẩm công việc **không phù hợp** cho kiểm thử tĩnh bao gồm những sản phẩm khó diễn dịch bởi con người và không nên được phân tích bởi các công cụ (ví dụ: mã thực thi của bên thứ 3 `3rd party executable code` vì lý do pháp lý).

### 3.1.2. Giá trị của Kiểm thử Tĩnh (Value of Static Testing) `[FL-3.1.2 (K2)]`
Kiểm thử tĩnh có thể phát hiện các khiếm khuyết ngay trong những giai đoạn sớm nhất của SDLC, thực hiện đúng nguyên lý kiểm thử sớm (xem mục 1.3). Nó cũng có thể xác định những khiếm khuyết **không thể phát hiện được bằng kiểm thử động** (ví dụ: đoạn mã không thể chạm tới `unreachable code`, các mẫu thiết kế `design patterns` không được triển khai như mong muốn, các khiếm khuyết trong các sản phẩm công việc không thể thực thi).

Kiểm thử tĩnh cung cấp khả năng đánh giá chất lượng và xây dựng sự tự tin vào các sản phẩm công việc. Bằng cách xác minh các yêu cầu đã được ghi thành tài liệu, các bên liên quan cũng có thể đảm bảo rằng các yêu cầu này mô tả đúng nhu cầu thực tế của họ (`validation`). Vì kiểm thử tĩnh có thể được thực hiện sớm trong SDLC, một sự hiểu biết chung (`shared understanding`) có thể được tạo ra giữa các bên liên quan tham gia. Giao tiếp cũng sẽ được cải thiện giữa các bên liên quan. Vì lý do này, người ta khuyến nghị nên lôi kéo nhiều bên liên quan đa dạng tham gia vào kiểm thử tĩnh.

Mặc dù việc thực hiện các buổi duyệt (`reviews`) có thể tốn kém chi phí, nhưng tổng chi phí dự án thường thấp hơn nhiều so với khi không thực hiện duyệt bởi vì cần ít thời gian và công sức hơn cho việc sửa các khiếm khuyết ở giai đoạn muộn hơn trong dự án.

Một số khiếm khuyết mã nguồn nhất định (`certain code defects`) có thể được phát hiện bằng phân tích tĩnh hiệu quả hơn (`more efficiently`) so với trong kiểm thử động, thường dẫn đến việc vừa có ít khiếm khuyết mã nguồn hơn vừa giảm tổng công sức phát triển chung.

### 3.1.3. Sự khác biệt giữa Kiểm thử Tĩnh và Kiểm thử Động `[FL-3.1.3 (K2)]`
Các thực hành kiểm thử tĩnh và kiểm thử động bổ trợ cho nhau (`complement each other`). Chúng có các mục tiêu tương tự nhau, chẳng hạn như hỗ trợ phát hiện các khiếm khuyết trong các sản phẩm công việc (xem mục 1.1.1), nhưng cũng có một số điểm khác biệt, chẳng hạn như:
- Kiểm thử tĩnh và kiểm thử động (kèm phân tích hỏng hóc) đều có thể dẫn đến việc phát hiện các khiếm khuyết, tuy nhiên có một số loại khiếm khuyết chỉ có thể tìm thấy bằng kiểm thử tĩnh hoặc chỉ bằng kiểm thử động.
- **Kiểm thử tĩnh tìm thấy khiếm khuyết trực tiếp (`directly`)**, trong khi **kiểm thử động gây ra các hỏng hóc (`causes failures`)** mà từ đó các khiếm khuyết liên quan mới được xác định thông qua phân tích tiếp theo.
- Kiểm thử tĩnh có thể dễ dàng phát hiện hơn các khiếm khuyết nằm trên các đường dẫn xuyên qua mã nguồn vốn hiếm khi được thực thi hoặc khó chạm tới bằng kiểm thử động.
- Kiểm thử tĩnh có thể được áp dụng cho các sản phẩm công việc không thực thi được (`non-executable work products`), trong khi kiểm thử động chỉ có thể áp dụng cho các sản phẩm công việc thực thi được (`executable work products`).
- Kiểm thử tĩnh có thể được dùng để đo lường các đặc tính chất lượng không phụ thuộc vào việc thực thi mã nguồn (ví dụ: khả năng bảo trì - `maintainability`), trong khi kiểm thử động có thể được dùng để đo lường các đặc tính chất lượng phụ thuộc vào việc thực thi mã nguồn (ví dụ: hiệu suất hoạt động - `performance efficiency`).

**Các khiếm khuyết điển hình dễ tìm hơn và/hoặc rẻ hơn khi tìm thông qua kiểm thử tĩnh bao gồm:**
- Khiếm khuyết trong các yêu cầu (ví dụ: sự không nhất quán, mơ hồ, mâu thuẫn, thiếu sót, không chính xác, trùng lặp).
- Khiếm khuyết thiết kế (ví dụ: cấu trúc cơ sở dữ liệu kém hiệu quả, chia module kém `poor modularization`).
- Một số loại khiếm khuyết viết mã nhất định (ví dụ: biến có giá trị chưa xác định, biến chưa khai báo, mã không thể chạm tới `unreachable code` hoặc mã trùng lặp, độ phức tạp mã nguồn quá mức).
- Sự sai lệch so với các tiêu chuẩn (ví dụ: không tuân thủ quy ước đặt tên trong tiêu chuẩn viết mã).
- Đặc tả giao diện không chính xác (ví dụ: sai lệch về số lượng, kiểu hoặc thứ tự của các tham số).
- Các loại lỗ hổng bảo mật cụ thể (ví dụ: tràn bộ đệm `buffer overflows`).
- Khoảng trống hoặc sự thiếu chính xác trong độ bao phủ cơ sở kiểm thử (`test basis coverage`) (ví dụ: thiếu các bài kiểm thử cho một tiêu chí chấp nhận).

---

## 3.2. Phản hồi và Quy trình Duyệt (Feedback and Review Process)

### 3.2.1. Lợi ích của Phản hồi Sớm và Thường xuyên từ các Bên liên quan `[FL-3.2.1 (K1)]`
Phản hồi sớm và thường xuyên cho phép truyền đạt sớm các vấn đề chất lượng tiềm ẩn. Nếu có ít sự tham gia của các bên liên quan trong suốt SDLC, sản phẩm đang được phát triển có thể không đáp ứng được tầm nhìn ban đầu hoặc hiện tại của các bên liên quan. Việc không chuyển giao được những gì bên liên quan mong muốn có thể dẫn đến việc làm lại tốn kém (`costly rework`), trễ hạn (`missed deadlines`), đổ lỗi cho nhau (`blame games`), và thậm chí có thể dẫn đến thất bại hoàn toàn của dự án.

Phản hồi thường xuyên từ các bên liên quan xuyên suốt SDLC có thể ngăn ngừa những hiểu lầm về yêu cầu và đảm bảo rằng các thay đổi đối với yêu cầu được hiểu rõ và được triển khai sớm hơn. Điều này giúp nhóm phát triển cải thiện sự hiểu biết của họ về những gì họ đang xây dựng. Nó cho phép họ tập trung vào những tính năng mang lại nhiều giá trị nhất cho các bên liên quan và có tác động tích cực nhất đến các rủi ro đã xác định.

### 3.2.2. Các Hoạt động của Quy trình Duyệt (Review Process Activities) `[FL-3.2.2 (K2)]`
Tiêu chuẩn ISO/IEC 20246 định nghĩa một quy trình duyệt chung (`generic review process`) cung cấp một khung làm việc có cấu trúc nhưng linh hoạt, từ đó một quy trình duyệt cụ thể có thể được điều chỉnh cho phù hợp với một tình huống cụ thể. Nếu buổi duyệt được yêu cầu càng trang trọng/chính thức (`more formal`), thì càng cần nhiều nhiệm vụ được mô tả cho các hoạt động khác nhau đó.

Kích thước của nhiều sản phẩm công việc khiến chúng quá lớn để có thể bao quát chỉ bằng một buổi duyệt duy nhất. Quy trình duyệt có thể được gọi thực hiện nhiều lần (`invoked multiple times`) để hoàn thành việc duyệt cho toàn bộ sản phẩm công việc.

**5 hoạt động trong quy trình duyệt là:**
1. **Lập kế hoạch (`Planning`):** Trong giai đoạn lập kế hoạch, phạm vi của buổi duyệt — bao gồm mục đích, sản phẩm công việc cần duyệt, các đặc tính chất lượng cần đánh giá, các khu vực cần tập trung, tiêu chí kết thúc (`exit criteria`), thông tin hỗ trợ như các tiêu chuẩn, công sức và khung thời gian cho buổi duyệt — sẽ được xác định.
2. **Khởi động duyệt (`Review initiation`):** Trong quá trình khởi động duyệt, mục tiêu là đảm bảo rằng tất cả mọi người và mọi thứ liên quan đều đã sẵn sàng để bắt đầu buổi duyệt. Điều này bao gồm việc đảm bảo rằng mọi người tham gia đều có quyền truy cập vào sản phẩm công việc đang được duyệt, hiểu rõ vai trò và trách nhiệm của mình, và nhận được mọi thứ cần thiết để thực hiện việc duyệt.
3. **Duyệt cá nhân (`Individual review`):** Mỗi người duyệt (`reviewer`) thực hiện một đợt duyệt cá nhân để đánh giá chất lượng của sản phẩm công việc đang được duyệt, và để xác định các điểm bất thường (`anomalies`), các khuyến nghị (`recommendations`), và các câu hỏi bằng cách áp dụng một hoặc nhiều kỹ thuật duyệt (ví dụ: duyệt dựa trên danh sách kiểm tra `checklist-based reviewing`, duyệt dựa trên kịch bản `scenario-based reviewing`). Tiêu chuẩn ISO/IEC 20246 cung cấp chiều sâu hơn về các kỹ thuật duyệt khác nhau. Những người duyệt ghi nhật ký (`log`) tất cả các điểm bất thường, khuyến nghị và câu hỏi mà họ đã xác định được.
4. **Giao tiếp và phân tích (`Communication and analysis`):** Vì các điểm bất thường (`anomalies`) được xác định trong quá trình duyệt không nhất thiết đều là khiếm khuyết (`defects`), tất cả các điểm bất thường này cần được phân tích và thảo luận. Đối với mỗi điểm bất thường, cần đưa ra quyết định về trạng thái của nó, người chịu trách nhiệm (`ownership`) và các hành động cần thiết. Việc này thường được thực hiện trong một cuộc họp duyệt (`review meeting`), trong đó những người tham gia cũng quyết định mức chất lượng của sản phẩm công việc được duyệt là gì và những hành động theo dõi (`follow-up actions`) nào là cần thiết. Một buổi duyệt theo dõi (`follow-up review`) có thể được yêu cầu để hoàn tất các hành động.
5. **Sửa lỗi và báo cáo (`Fixing and reporting`):** Đối với mỗi khiếm khuyết (`defect`), một báo cáo khiếm khuyết (`defect report`) cần được tạo ra để có thể theo dõi các hành động khắc phục. Một khi đạt được các tiêu chí kết thúc (`exit criteria`), sản phẩm công việc có thể được chấp nhận. Kết quả duyệt sẽ được báo cáo.

### 3.2.3. Vai trò và Trách nhiệm trong các Buổi duyệt (Roles and Responsibilities in Reviews) `[FL-3.2.3 (K1)]`
Các buổi duyệt có sự tham gia của nhiều bên liên quan khác nhau, những người có thể đảm nhận một số vai trò. **6 vai trò chính và trách nhiệm của họ là:**
- **Người quản lý (`Manager`):** Quyết định cái gì sẽ được duyệt và cung cấp các nguồn lực, chẳng hạn như nhân sự và thời gian cho việc duyệt.
- **Tác giả (`Author`):** Tạo ra và sửa sản phẩm công việc đang được duyệt.
- **Người điều phối (`Moderator` - còn được gọi là `facilitator`):** Đảm bảo việc điều hành hiệu quả các cuộc họp duyệt, bao gồm hòa giải (`mediation`), quản lý thời gian, và tạo ra một môi trường duyệt an toàn nơi mọi người đều có thể phát biểu tự do.
- **Thư ký (`Scribe` - còn được gọi là `recorder`):** Tập hợp các điểm bất thường từ những người duyệt và ghi chép lại thông tin buổi duyệt, chẳng hạn như các quyết định và các điểm bất thường mới được tìm thấy trong cuộc họp duyệt.
- **Người duyệt (`Reviewer`):** Thực hiện việc duyệt. Người duyệt có thể là một người đang làm việc trong dự án, một chuyên gia về lĩnh vực chuyên môn (`subject matter expert - SME`), hoặc bất kỳ bên liên quan nào khác.
- **Trưởng nhóm duyệt (`Review leader`):** Chịu trách nhiệm tổng thể về việc duyệt như quyết định ai sẽ tham gia, và tổ chức thời gian cũng như địa điểm diễn ra buổi duyệt.

Các vai trò chi tiết hơn khác cũng có thể có, như được mô tả trong tiêu chuẩn ISO/IEC 20246.

### 3.2.4. Các Loại Duyệt (Review Types) `[FL-3.2.4 (K2)]`
Tồn tại nhiều loại duyệt trải dài từ duyệt không chính thức (`informal reviews`) đến duyệt chính thức (`formal reviews`). Mức độ trang trọng/chính thức (`level of formality`) cần thiết phụ thuộc vào các yếu tố như SDLC đang được tuân theo, mức độ trưởng thành của quy trình phát triển, mức độ quan trọng và độ phức tạp của sản phẩm công việc đang được duyệt, các yêu cầu pháp lý hoặc quy định chế tài, và nhu cầu về một dấu vết kiểm toán (`audit trail`). Cùng một sản phẩm công việc có thể được duyệt bằng các loại duyệt khác nhau, ví dụ: đầu tiên là một buổi duyệt không chính thức và sau đó là một buổi duyệt chính thức hơn.

Việc lựa chọn đúng loại duyệt là chìa khóa để đạt được các mục tiêu duyệt theo yêu cầu (xem mục 3.2.5). Việc lựa chọn không chỉ dựa trên các mục tiêu, mà còn dựa trên các yếu tố như nhu cầu dự án, nguồn lực sẵn có, loại sản phẩm công việc và rủi ro, lĩnh vực kinh doanh, và văn hóa công ty.

**4 loại duyệt thường được sử dụng là:**
1. **Duyệt không chính thức (`Informal review`):** Duyệt không chính thức không tuân theo một quy trình đã được định nghĩa và không đòi hỏi một đầu ra được ghi thành tài liệu chính thức. Mục tiêu chính là phát hiện các điểm bất thường (`detecting anomalies`).
2. **Duyệt từng bước (`Walkthrough`):** Một buổi `walkthrough`, **được dẫn dắt bởi tác giả (`led by the author`)**, có thể phục vụ nhiều mục tiêu, chẳng hạn như đánh giá chất lượng và xây dựng sự tự tin vào sản phẩm công việc, đào tạo/hướng dẫn cho những người duyệt (`educating reviewers`), đạt được sự đồng thuận, tạo ra các ý tưởng mới, thúc đẩy và tạo điều kiện cho các tác giả cải thiện cũng như phát hiện các điểm bất thường. Những người duyệt có thể thực hiện việc duyệt cá nhân trước buổi `walkthrough`, nhưng điều này **không bắt buộc**.
3. **Duyệt kỹ thuật (`Technical Review`):** Một buổi duyệt kỹ thuật được thực hiện bởi những người duyệt có trình độ kỹ thuật (`technically qualified reviewers`) và **được dẫn dắt bởi một người điều phối (`led by a moderator`)**. Mục tiêu của duyệt kỹ thuật là đạt được sự đồng thuận và đưa ra các quyết định liên quan đến một vấn đề kỹ thuật, nhưng đồng thời cũng để phát hiện các điểm bất thường, đánh giá chất lượng và xây dựng sự tự tin vào sản phẩm công việc, tạo ra các ý tưởng mới, và thúc đẩy cũng như tạo điều kiện cho các tác giả cải thiện.
4. **Thanh tra (`Inspection`):** Vì thanh tra (`inspections`) là **loại duyệt trang trọng/chính thức nhất (`most formal type of review`)**, chúng tuân theo đầy đủ quy trình duyệt chung (xem mục 3.2.2). Mục tiêu chính là tìm ra số lượng tối đa các điểm bất thường (`find the maximum number of anomalies`). Các mục tiêu khác là đánh giá chất lượng, xây dựng sự tự tin vào sản phẩm công việc, và thúc đẩy cũng như tạo điều kiện cho các tác giả cải thiện. Các số liệu đo lường (`metrics`) được thu thập và sử dụng để cải tiến SDLC, bao gồm cả quy trình thanh tra. **Trong thanh tra (`inspections`), tác giả KHÔNG ĐƯỢC đóng vai trò là trưởng nhóm duyệt (`review leader`) hoặc thư ký (`scribe`)** *(và theo ngầm định chuẩn ISTQB, cũng không làm `moderator`)*.

### 3.2.5. Các Yếu tố Thành công cho các Buổi duyệt (Success Factors for Reviews) `[FL-3.2.5 (K1)]`
Có một số yếu tố quyết định sự thành công của các buổi duyệt, bao gồm:
- Xác định các mục tiêu rõ ràng và các tiêu chí kết thúc có thể đo lường được (`measurable exit criteria`). **Việc đánh giá cá nhân những người tham gia (`Evaluation of participants`) không bao giờ được phép là một mục tiêu.**
- Chọn loại duyệt phù hợp để đạt được các mục tiêu đã đề ra, và phù hợp với loại sản phẩm công việc, những người tham gia duyệt, nhu cầu dự án và ngữ cảnh.
- Thực hiện duyệt trên các phần nhỏ (`small chunks`), để những người duyệt không bị mất tập trung trong quá trình duyệt cá nhân và/hoặc cuộc họp duyệt (khi được tổ chức).
- Cung cấp phản hồi từ các buổi duyệt cho các bên liên quan và các tác giả để họ có thể cải thiện sản phẩm và các hoạt động của mình (xem mục 3.2.1).
- Cung cấp đủ thời gian cho những người tham gia để chuẩn bị cho buổi duyệt.
- Sự hỗ trợ từ cấp quản lý (`management`) đối với quy trình duyệt.
- Biến việc duyệt thành một phần trong văn hóa của tổ chức, nhằm thúc đẩy việc học hỏi và cải tiến quy trình.
- Đào tạo đầy đủ cho tất cả những người tham gia để họ biết cách hoàn thành vai trò của mình.
- Điều phối tốt các cuộc họp (`Facilitating meetings`).
