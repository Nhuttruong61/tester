// ISTQB CTFL v4.0.1 — Dữ liệu Chương 4, 5, 6 (100% Tiếng Việt)
window.CTFL_CHAPTERS_456 = [
  {
    id: 4,
    code: "CHAP-04",
    title: "Phân tích và Thiết kế Kiểm thử (Test Analysis and Design)",
    bossName: "KIẾN TRÚC SƯ PHÂN VÙNG",
    bossTitle: "Trùm Kỹ Thuật Hộp Đen, Hộp Trắng & Kinh Nghiệm",
    bossIcon: "B-04",
    bossColor: "#8B5CF6",
    examWeight: 11,
    kLevels: ["K2", "K3"],
    summary: "Chương chiếm nhiều câu hỏi nhất trong đề thi thật (11/40 câu)! Nắm vững các kỹ thuật Hộp đen (Phân vùng tương đương EP, Giá trị biên BVA, Bảng quyết định, Chuyển đổi trạng thái), Hộp trắng (Bao phủ câu lệnh & Bao phủ nhánh), Kinh nghiệm (Đoán lỗi, Thăm dò, Checklist) và Cộng tác (User Story 3C, INVEST, ATDD).",
    cheatSheet: [
      {
        section: "4.1",
        title: "Tổng quan các Nhóm Kỹ thuật Kiểm thử",
        points: [
          "Kỹ thuật Hộp đen (Black-box / Specification-based): Thiết kế ca kiểm thử dựa trên tài liệu đặc tả, yêu cầu hoặc mô hình nghiệp vụ mà KHÔNG cần nhìn vào cấu trúc mã nguồn bên trong.",
          "Kỹ thuật Hộp trắng (White-box / Structure-based): Thiết kế ca kiểm thử dựa trực tiếp vào cấu trúc mã nguồn bên trong, đồ thị dòng điều khiển (control flow) hoặc kiến trúc hệ thống.",
          "Kỹ thuật dựa trên Kinh nghiệm (Experience-based): Tận dụng kỹ năng, trực giác và kinh nghiệm thực tế của kiểm thử viên với các ứng dụng và loại lỗi tương tự để bổ sung cho hộp đen và hộp trắng."
        ]
      },
      {
        section: "4.2",
        title: "Các Kỹ thuật Kiểm thử Hộp đen (EP, BVA, Bảng quyết định, Trạng thái)",
        points: [
          "Phân vùng tương đương (Equivalence Partitioning - EP): Chia dữ liệu thành các phân vùng hợp lệ (Valid) và không hợp lệ (Invalid) sao cho mọi giá trị trong cùng một phân vùng được hệ thống xử lý giống nhau. Độ bao phủ 100% EP = lấy ít nhất 1 giá trị đại diện cho MỖI phân vùng. Lưu ý: Các phân vùng KHÔNG hợp lệ phải được kiểm thử riêng lẻ từng cái một để tránh hiện tượng che khuất lỗi (defect masking).",
          "Phân tích giá trị biên (Boundary Value Analysis - BVA): Lỗi thường tập trung ở ranh giới các phân vùng có thứ tự. Với đoạn [min, max]: BVA 2 giá trị (2-value BVA) kiểm thử giá trị biên và láng giềng sát nhất ở phân vùng kế cận -> {min-1, min, max, max+1} (2 điểm mỗi biên). BVA 3 giá trị (3-value BVA) kiểm thử giá trị biên và CẢ HAI láng giềng hai bên -> {min-1, min, min+1, max-1, max, max+1} (3 điểm mỗi biên).",
          "Kiểm thử Bảng quyết định (Decision Table Testing): Mô hình hóa các quy tắc nghiệp vụ phức tạp bằng cách kết hợp các Điều kiện đầu vào (Conditions: T/F, '-', N/A) với Hành động đầu ra (Actions: X / trống). Với N điều kiện nhị phân sẽ có 2^N cột (quy tắc); có thể rút gọn (collapse) bảng bằng cách gộp các cột có cùng hành động và chỉ khác nhau ở điều kiện không ảnh hưởng kết quả (ký hiệu '-').",
          "Kiểm thử Chuyển đổi trạng thái (State Transition Testing): Mô hình hóa các Trạng thái (States), Sự kiện (Events), Điều kiện canh gác [Guard] và Hành động (Actions). Sơ đồ trạng thái thể hiện các chuyển đổi hợp lệ; Bảng trạng thái (State Table: hàng = trạng thái, cột = sự kiện) giúp phát hiện các chuyển đổi KHÔNG hợp lệ (ô trống). Quy tắc bao hàm: Bao phủ 100% chuyển đổi hợp lệ (0-switch coverage) LUÔN đảm bảo bao phủ 100% trạng thái (All states coverage)."
        ]
      },
      {
        section: "4.3",
        title: "Các Kỹ thuật Kiểm thử Hộp trắng (Câu lệnh & Nhánh)",
        points: [
          "Kiểm thử câu lệnh (Statement Testing): Đo tỷ lệ % các câu lệnh thực thi được (executable statements) đã chạy qua. Bao phủ 100% câu lệnh giúp phát hiện đoạn mã chết (unreachable/dead code) nhưng có thể bỏ sót nhánh ELSE rỗng (ví dụ lệnh IF không có ELSE).",
          "Kiểm thử nhánh (Branch Testing): Đo tỷ lệ % các nhánh chuyển giao điều khiển (control flow transfers - bao gồm cả kết quả Đúng/True và Sai/False của mọi quyết định). Quy tắc vàng: Bao phủ 100% Nhánh (Branch Coverage) LUÔN đảm bảo bao phủ 100% Câu lệnh (Statement Coverage), nhưng KHÔNG BAO GIỜ có chiều ngược lại!",
          "Giá trị của kiểm thử Hộp trắng: Phát hiện được các đoạn mã thừa hoặc logic ẩn (lỗi làm thừa - code of commission) mà đặc tả không nhắc tới, nhưng không tự phát hiện được yêu cầu bị quên chưa lập trình (lỗi bỏ sót - code of omission)."
        ]
      },
      {
        section: "4.4",
        title: "Các Kỹ thuật Kiểm thử dựa trên Kinh nghiệm",
        points: [
          "Đoán lỗi (Error Guessing): Dự đoán các sai sót (errors), khiếm khuyết (defects) và hỏng hóc (failures) thường gặp của lập trình viên. Tấn công lỗi (Fault Attack) là cách tiếp cận có hệ thống bằng cách lập danh sách các lỗi tiềm ẩn để thiết kế test nhắm thẳng vào chúng.",
          "Kiểm thử thăm dò (Exploratory Testing): Vừa tìm hiểu hệ thống, vừa thiết kế và thực thi kiểm thử đồng thời; thường quản lý theo phiên giới hạn thời gian (Time-boxed Session-based testing) từ 60–120 phút dựa trên Điều lệ kiểm thử (Test Charter). Rất hiệu quả khi ít tài liệu hoặc áp lực thời gian gấp.",
          "Kiểm thử dựa trên danh sách kiểm tra (Checklist-Based Testing): Thiết kế và thực thi kiểm thử dựa trên checklist các điều kiện cần kiểm tra; cần cập nhật thường xuyên (thêm mẫu lỗi mới, loại bỏ mục đã tự động hóa) để tránh nghịch lý thuốc trừ sâu."
        ]
      },
      {
        section: "4.5",
        title: "Cách tiếp cận Kiểm thử dựa trên Cộng tác (User Story, INVEST, ATDD)",
        points: [
          "Mô hình 3 chữ C của User Story (3 C's): Card (Thẻ ghi câu chuyện), Conversation (Cuộc trò chuyện trao đổi để hiểu chung), Confirmation (Sự xác nhận thông qua Tiêu chí chấp nhận - Acceptance Criteria).",
          "Tiêu chuẩn INVEST cho User Story tốt: Independent (Độc lập), Negotiable (Có thể thương lượng), Valuable (Có giá trị), Estimable (Ước lượng được), Small (Nhỏ gọn), Testable (Kiểm thử được).",
          "Hai định dạng viết Tiêu chí chấp nhận (Acceptance Criteria): Hướng kịch bản (Scenario-oriented: Given [Điều kiện tiên quyết] / When [Hành động] / Then [Kết quả mong đợi]) và Hướng quy tắc (Rule-oriented: danh sách gạch đầu dòng các quy tắc hoặc bảng đầu vào/đầu ra).",
          "ATDD (Acceptance Test-Driven Development): Phương pháp Test-First cộng tác trong đó bộ ba 'Three Amigos' (Nghiệp vụ/Khách hàng, Lập trình viên, Kiểm thử viên) cùng viết các ca kiểm thử chấp nhận TRƯỚC KHI bắt đầu viết mã nguồn."
        ]
      }
    ]
  },
  {
    id: 5,
    code: "CHAP-05",
    title: "Quản lý các Hoạt động Kiểm thử (Managing the Test Activities)",
    bossName: "TƯ LỆNH CHIẾN LƯỢC RỦI RO",
    bossTitle: "Trùm Lập Kế Hoạch, Ước Lượng, Rủi Ro & Quản Lý Lỗi",
    bossIcon: "B-05",
    bossColor: "#F59E0B",
    examWeight: 9,
    kLevels: ["K1", "K2", "K3"],
    summary: "Chương trọng tâm lớn thứ hai trong đề thi (9/40 câu)! Làm chủ Kế hoạch kiểm thử, Tiêu chí Vào/Ra (DoR vs DoD), 4 Kỹ thuật Ước lượng (Công thức PERT 3 điểm, Wideband Delphi, Ngoại suy, Tỷ lệ), Ưu tiên ca kiểm thử, Kim tự tháp & 4 Góc phần tư kiểm thử (Q1-Q4), Quản lý Rủi ro (Sản phẩm vs Dự án) và Quản lý Lỗi.",
    cheatSheet: [
      {
        section: "5.1",
        title: "Lập Kế hoạch, Ước lượng & Ưu tiên Ca Kiểm thử",
        points: [
          "Tiêu chí đầu vào (Entry Criteria - trong Agile gọi là Definition of Ready / DoR): Điều kiện tiên quyết phải thỏa mãn trước khi bắt đầu một hoạt động kiểm thử.",
          "Tiêu chí đầu ra (Exit Criteria - trong Agile gọi là Definition of Done / DoD): Điều kiện phải đạt được để tuyên bố kết thúc hoàn tất một hoạt động hoặc bản phát hành.",
          "4 Kỹ thuật Ước lượng nỗ lực kiểm thử: (1) Dựa trên số liệu (Metrics-based): Ước lượng theo Tỷ lệ (Ratios - dùng tỷ lệ lịch sử từ các dự án trước) & Ngoại suy (Extrapolation - dự phóng từ dữ liệu thu thập đầu dự án hiện tại). (2) Dựa trên chuyên gia (Expert-based): Wideband Delphi / Planning Poker (thảo luận đồng thuận) & Ước lượng 3 điểm (Three-Point Estimation / PERT) với công thức: Nỗ lực kỳ vọng E = (a + 4m + b) / 6 và Độ lệch chuẩn SD = (b - a) / 6 (trong đó a = Lạc quan nhất, m = Khả dĩ nhất, b = Bi quan nhất).",
          "Chiến lược ưu tiên ca kiểm thử (Test Case Prioritization): Dựa trên rủi ro (Risk-based: rủi ro cao nhất chạy trước), Dựa trên độ bao phủ (Coverage-based: tổng độ bao phủ cao nhất hoặc Độ bao phủ bổ sung - Additional coverage), Dựa trên yêu cầu (Requirements-based). Lưu ý: Phải luôn tuân thủ thứ tự phụ thuộc kỹ thuật/dữ liệu giữa các test case!"
        ]
      },
      {
        section: "5.1.5-5.1.6",
        title: "Kim tự tháp Kiểm thử (Test Pyramid) & 4 Góc phần tư (Testing Quadrants)",
        points: [
          "Kim tự tháp Kiểm thử (Test Pyramid): Đáy rộng gồm rất nhiều Unit/Component test chạy nhanh, cô lập -> Tầng giữa là Integration/Service/API test -> Đỉnh hẹp gồm ít End-to-End (E2E) UI test chạy chậm hơn.",
          "Góc phần tư Q1 (Hướng công nghệ, Hỗ trợ nhóm): Kiểm thử đơn vị & thành phần (Unit/Component test) — Tự động hóa.",
          "Góc phần tư Q2 (Hướng nghiệp vụ, Hỗ trợ nhóm): Kiểm thử chức năng, ví dụ User Story, API/Prototype — Tự động hóa hoặc kết hợp.",
          "Góc phần tư Q3 (Hướng nghiệp vụ, Phản biện sản phẩm): Kiểm thử thăm dò (Exploratory), Khả dụng (Usability), Chấp nhận người dùng (UAT) — Thủ công.",
          "Góc phần tư Q4 (Hướng công nghệ, Phản biện sản phẩm): Kiểm thử hiệu năng, tải, bảo mật và các đặc tính phi chức năng (Performance, Security) — Dùng công cụ chuyên dụng."
        ]
      },
      {
        section: "5.2",
        title: "Quản lý Rủi ro (Risk Management: Rủi ro Dự án vs Rủi ro Sản phẩm)",
        points: [
          "Mức độ rủi ro (Risk Level) = Khả năng xảy ra (Risk Likelihood / Probability) × Mức độ tác động (Risk Impact / Harm).",
          "Rủi ro Dự án (Project Risk): Ảnh hưởng đến tiến độ, ngân sách, nhân sự, công cụ, nhà cung cấp hoặc môi trường kiểm thử chậm trễ.",
          "Rủi ro Sản phẩm (Product Risk): Ảnh hưởng trực tiếp đến chất lượng sản phẩm phần mềm (tính năng tính toán sai, hiệu năng chậm, lỗ hổng bảo mật, giao diện khó dùng).",
          "Quy trình Quản lý Rủi ro gồm 2 bước chính: (1) Phân tích rủi ro (Risk Analysis = Nhận diện rủi ro + Đánh giá rủi ro) và (2) Kiểm soát rủi ro (Risk Control = Giảm thiểu rủi ro / Risk Mitigation thông qua kiểm thử + Giám sát rủi ro / Risk Monitoring)."
        ]
      },
      {
        section: "5.3-5.5",
        title: "Giám sát, Kiểm soát, Quản lý Cấu hình (CM) & Quản lý Lỗi",
        points: [
          "Giám sát kiểm thử (Test Monitoring): Thu thập liên tục các số liệu (metrics) để theo dõi tiến độ so với kế hoạch. Kiểm soát kiểm thử (Test Control): Ra quyết định và thực hiện hành động điều chỉnh (như phân bổ lại nhân sự, sắp xếp lại ưu tiên chạy test) dựa trên thông tin giám sát.",
          "Quản lý cấu hình (Configuration Management - CM): Định danh duy nhất, quản lý phiên bản và thiết lập đường cơ sở (baseline) cho toàn bộ testware và phần mềm để đảm bảo kiểm thử có thể tái lập chính xác.",
          "Báo cáo lỗi (Defect Report): Cần có tiêu đề, các bước tái hiện lỗi rõ ràng, dữ liệu đầu vào, môi trường/phiên bản build, kết quả mong đợi vs kết quả thực tế, mức độ nghiêm trọng (Severity), độ ưu tiên (Priority) và bằng chứng (log/ảnh chụp màn hình)."
        ]
      }
    ]
  },
  {
    id: 6,
    code: "CHAP-06",
    title: "Công cụ Kiểm thử (Test Tools)",
    bossName: "BẬC THẦY CỖ MÁY TỰ ĐỘNG",
    bossTitle: "Trùm Phân Loại Công Cụ, Lợi Ích & Rủi Ro Tự Động Hóa",
    bossIcon: "B-06",
    bossColor: "#10B981",
    examWeight: 2,
    kLevels: ["K1", "K2"],
    summary: "Chương ngắn gọn dễ ăn trọn điểm tuyệt đối (2/40 câu)! Nắm rõ phân loại các nhóm công cụ hỗ trợ kiểm thử và phân biệt chính xác giữa Lợi ích thực tế với những Rủi ro/Cạm bẫy phổ biến khi áp dụng tự động hóa kiểm thử.",
    cheatSheet: [
      {
        section: "6.1",
        title: "Phân loại Công cụ Hỗ trợ Kiểm thử",
        points: [
          "Công cụ Quản lý Kiểm thử (Test Management & ALM Tools): Quản lý ca kiểm thử, lập lịch chạy, theo dõi lỗi, truy vết yêu cầu và xuất báo cáo tiến độ.",
          "Công cụ Kiểm thử Tĩnh (Static Testing Tools): Hỗ trợ rà soát (review) và phân tích mã nguồn tĩnh (linters, đo độ phức tạp cyclomatic, phát hiện code thừa) mà KHÔNG cần chạy chương trình.",
          "Công cụ Thiết kế & Triển khai Kiểm thử (Test Design & Implementation Tools): Sinh test case từ mô hình và chuẩn bị, tạo mới hoặc ẩn danh hóa dữ liệu kiểm thử (test data preparation/masking).",
          "Công cụ Thực thi & Đo độ bao phủ (Test Execution & Coverage Tools): Chạy kịch bản kiểm thử tự động (unit test frameworks, test harnesses) và đo độ bao phủ mã nguồn động (statement/branch coverage).",
          "Công cụ Kiểm thử Phi chức năng (Non-Functional Testing Tools): Giả lập hàng ngàn người dùng ảo (load/stress testing), đo độ trễ mili-giây và quét lỗ hổng bảo mật — những việc con người không thể làm thủ công."
        ]
      },
      {
        section: "6.2",
        title: "Lợi ích và Rủi ro của Tự động hóa Thực thi Kiểm thử",
        points: [
          "Lợi ích chính (Benefits): Tiết kiệm thời gian cho các công việc lặp đi lặp lại (như kiểm thử hồi quy), loại bỏ sai sót thao tác của con người, thực thi nhất quán/lặp lại được, phản hồi cực nhanh trong CI/CD và đánh giá khách quan.",
          "Rủi ro & Cạm bẫy chính (Risks): Kỳ vọng phi thực tế vào công cụ, đánh giá thấp thời gian/chi phí đầu tư ban đầu và công sức bảo trì kịch bản test khi phần mềm thay đổi, phụ thuộc quá mức vào tự động hóa mà bỏ quên kiểm thử thăm dò thủ công, hoặc chọn công cụ không tương thích kỹ thuật / nhà cung cấp ngừng hỗ trợ."
        ]
      }
    ]
  }
];

window.CTFL_QUESTIONS_456 = [
  {
    id: "q4_01",
    chapter: 4,
    section: "4.1",
    kLevel: "K2",
    difficulty: "easy",
    scenario: "Một kiểm thử viên thiết kế các ca kiểm thử bằng cách phân tích đồ thị dòng điều khiển (control flow graph) và các nhánh mã nguồn bên trong hệ thống mà không tham chiếu đến tài liệu đặc tả yêu cầu. Kiểm thử viên này đang áp dụng nhóm kỹ thuật kiểm thử nào?",
    options: [
      "A. Kỹ thuật kiểm thử hộp đen (Black-box test techniques)",
      "B. Kỹ thuật kiểm thử hộp trắng (White-box test techniques)",
      "C. Kỹ thuật kiểm thử dựa trên kinh nghiệm (Experience-based test techniques)",
      "D. Cách tiếp cận kiểm thử dựa trên cộng tác (Collaboration-based test approaches)"
    ],
    correct: 1,
    explanation: "Kỹ thuật kiểm thử hộp trắng (dựa trên cấu trúc - structure-based) thiết kế test dựa trên cấu trúc bên trong, mã nguồn hoặc dòng điều khiển thay vì dựa vào tài liệu đặc tả bên ngoài.",
    mnemonic: "Hộp trắng (White-box) = Nhìn thấu Code bên trong; Hộp đen (Black-box) = Chỉ nhìn Đặc tả bên ngoài."
  },
  {
    id: "q4_02",
    chapter: 4,
    section: "4.2.1",
    kLevel: "K3",
    difficulty: "normal",
    scenario: "Một cửa hàng trực tuyến chiết khấu theo tổng giá trị đơn hàng (số nguyên $): từ $1 đến $49 = 0%, từ $50 đến $99 = 5%, từ $100 đến $499 = 10%, từ $500 trở lên = 15%. Đơn hàng dưới $1 bị từ chối. Bộ giá trị đầu vào nào sau đây đạt độ bao phủ 100% Phân vùng tương đương (EP) với số lượng ca kiểm thử tối thiểu?",
    options: [
      "A. 0, 25, 75, 250, 600",
      "B. 1, 50, 100, 500",
      "C. -10, 0, 49, 50, 100, 500",
      "D. 0, 10, 60, 80, 300"
    ],
    correct: 0,
    explanation: "Hệ thống có 1 phân vùng không hợp lệ (<= 0) và 4 phân vùng hợp lệ (1–49, 50–99, 100–499, >= 500). Bộ {0, 25, 75, 250, 600} lấy đúng 1 giá trị đại diện cho cả 5 phân vùng.",
    mnemonic: "100% EP = Mỗi phân vùng (cả Hợp lệ lẫn Không hợp lệ) lấy đúng 1 đại diện."
  },
  {
    id: "q4_03",
    chapter: 4,
    section: "4.2.1",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Khi thiết kế kiểm thử bằng kỹ thuật Phân vùng tương đương (EP) cho một biểu mẫu có 3 trường nhập liệu độc lập, tại sao các phân vùng KHÔNG hợp lệ nên được kiểm thử riêng lẻ từng trường thay vì gộp chung vào một ca kiểm thử âm tính duy nhất?",
    options: [
      "A. Vì gộp các giá trị không hợp lệ sẽ làm giảm độ bao phủ nhánh ở phía máy chủ.",
      "B. Vì thông báo lỗi của một đầu vào không hợp lệ có thể che khuất việc kiểm tra các đầu vào không hợp lệ khác (hiện tượng che khuất lỗi - defect masking).",
      "C. Vì kiểm thử riêng lẻ các phân vùng không hợp lệ là yêu cầu bắt buộc để đạt BVA 3 giá trị.",
      "D. Vì các phân vùng không hợp lệ chỉ có thể thực thi trong kiểm thử tích hợp thành phần."
    ],
    correct: 1,
    explanation: "Nếu nhập nhiều giá trị không hợp lệ cùng lúc và trường đầu tiên lập tức báo lỗi dừng xử lý, logic kiểm tra của các trường không hợp lệ còn lại sẽ không bao giờ được chạy (gây che khuất lỗi - defect masking).",
    mnemonic: "Hợp lệ = Gộp chung để tối ưu; Không hợp lệ = Tách riêng để tránh Che khuất lỗi (Defect Masking)."
  },
  {
    id: "q4_04",
    chapter: 4,
    section: "4.2.2",
    kLevel: "K3",
    difficulty: "normal",
    scenario: "Trường độ dài mật khẩu chấp nhận số nguyên từ 8 đến 16 ký tự (bao gồm cả 8 và 16). Sử dụng kỹ thuật Phân tích giá trị biên 2 giá trị (2-value BVA), tập hợp các giá trị kiểm thử nào sau đây đạt độ bao phủ biên 100%?",
    options: [
      "A. 7, 8, 9, 15, 16, 17",
      "B. 8, 16",
      "C. 7, 8, 16, 17",
      "D. 6, 7, 8, 16, 17, 18"
    ],
    correct: 2,
    explanation: "Với khoảng [8..16], BVA 2 giá trị kiểm thử mỗi giá trị biên (8 và 16) cùng với giá trị láng giềng gần nhất nằm ở phân vùng kế cận (7 và 17).",
    mnemonic: "BVA 2 giá trị trên [min, max] = {min-1, min, max, max+1}."
  },
  {
    id: "q4_05",
    chapter: 4,
    section: "4.2.2",
    kLevel: "K3",
    difficulty: "hard",
    scenario: "Một bộ điều nhiệt chấp nhận nhiệt độ mục tiêu là số nguyên từ 15°C đến 25°C (bao gồm cả 15 và 25). Nếu cần đạt độ bao phủ 100% Phân tích giá trị biên 3 giá trị (3-value BVA) cho phân vùng 15°C..25°C, cần sử dụng tập giá trị đầu vào nào?",
    options: [
      "A. 14, 15, 25, 26",
      "B. 14, 15, 16, 24, 25, 26",
      "C. 15, 16, 24, 25",
      "D. 13, 14, 15, 25, 26, 27"
    ],
    correct: 1,
    explanation: "BVA 3 giá trị kiểm thử mỗi giá trị biên (15 và 25) cùng CẢ HAI giá trị láng giềng ở hai phía của biên đó: {14, 15, 16} cho biên dưới và {24, 25, 26} cho biên trên.",
    mnemonic: "BVA 3 giá trị trên [min, max] = {min-1, min, min+1, max-1, max, max+1}."
  },
  {
    id: "q4_06",
    chapter: 4,
    section: "4.2.2",
    kLevel: "K3",
    difficulty: "hard",
    scenario: "Hệ thống duyệt vay phân loại điểm tín dụng (số nguyên) thành 3 hạng liền kề: Hạng C (300–599), Hạng B (600–749) và Hạng A (750–850). Bạn đã kiểm thử 2 giá trị 599 và 600 bằng kỹ thuật 2-value BVA cho biên trên của Hạng C. Cần THÊM bao nhiêu giá trị kiểm thử nữa để hoàn tất 100% 2-value BVA cho cả 3 hạng (tính cả biên ngoài khoảng hợp lệ)?",
    options: [
      "A. Thêm 4 giá trị (299, 300, 850, 851)",
      "B. Thêm 6 giá trị (299, 300, 749, 750, 850, 851)",
      "C. Thêm 8 giá trị (299, 300, 601, 748, 749, 750, 850, 851)",
      "D. Thêm 5 giá trị (300, 749, 750, 850, 851)"
    ],
    correct: 1,
    explanation: "Tập 2-value BVA đầy đủ cho [300..599], [600..749], [750..850] gồm 8 giá trị: {299, 300, 599, 600, 749, 750, 850, 851}. Vì 599 và 600 đã được kiểm thử nên chỉ cần thêm 6 giá trị còn lại.",
    mnemonic: "Các phân vùng liền kề dùng chung cặp biên tiếp giáp (599/600 và 749/750)."
  },
  {
    id: "q4_07",
    chapter: 4,
    section: "4.2.3",
    kLevel: "K3",
    difficulty: "normal",
    scenario: "Phòng tập cấp quyền vào hồ bơi dựa trên 3 điều kiện: C1 = Hội viên đang hoạt động (T/F), C2 = Đã mua gói bơi (T/F), C3 = Có vé mời khách (T/F). Quy tắc: Hội viên đang hoạt động được vào hồ bơi nếu đã mua gói bơi HOẶC có vé mời; người không phải hội viên không bao giờ được vào dù có vé mời hay gói bơi. Khi lập bảng quyết định rút gọn (collapsed decision table) với dấu '-' nghĩa là 'không quan tâm', bảng rút gọn có bao nhiêu cột (quy tắc)?",
    options: [
      "A. 8 cột",
      "B. 4 cột",
      "C. 3 cột",
      "D. 5 cột"
    ],
    correct: 1,
    explanation: "Bảng đầy đủ có 8 cột. Khi C1=F (4 tổ hợp của C2/C3), hành động luôn là Từ chối -> gộp thành 1 cột (F, -, -). Khi C1=T và C2=T (2 tổ hợp của C3), hành động luôn là Cho phép -> gộp thành 1 cột (T, T, -). Còn lại 2 cột: (T, F, T) -> Cho phép và (T, F, F) -> Từ chối. Tổng cộng = 4 cột.",
    mnemonic: "Gộp các cặp cột có cùng hành động đầu ra và chỉ khác nhau ở 1 điều kiện duy nhất."
  },
  {
    id: "q4_08",
    chapter: 4,
    section: "4.2.3",
    kLevel: "K3",
    difficulty: "normal",
    scenario: "Hệ thống lên máy bay kiểm tra 3 điều kiện: (1) Thẻ lên tàu hợp lệ? (Y/N), (2) Khách ưu tiên? (Y/N), (3) Hành lý xách tay quá khổ? (Y/N). Bạn đã chạy 3 ca kiểm thử: (Y, Y, N), (Y, N, Y) và (N, N, N). Cần bổ sung ca kiểm thử nào để kiểm tra trường hợp khách không ưu tiên, có thẻ hợp lệ và hành lý đúng chuẩn được lên tàu ở Nhóm 2?",
    options: [
      "A. (Y, Y, Y)",
      "B. (Y, N, N)",
      "C. (N, Y, N)",
      "D. (N, N, Y)"
    ],
    correct: 1,
    explanation: "Thẻ hợp lệ = Y, Khách ưu tiên = N, Hành lý quá khổ = N tương ứng chính xác với bộ điều kiện (Y, N, N).",
    mnemonic: "Ánh xạ từng điều kiện nghiệp vụ tương ứng theo đúng thứ tự dòng Y/N trong bảng quyết định."
  },
  {
    id: "q4_09",
    chapter: 4,
    section: "4.2.4",
    kLevel: "K3",
    difficulty: "normal",
    scenario: "Vòng đời đơn hàng có các trạng thái: Nháp (Draft) -> Đã gửi (Submitted) -> Đã thanh toán (Paid) -> Đã giao (Shipped). Từ Nháp hoặc Đã gửi, người dùng có thể chuyển sang Đã hủy (Cancelled). Khi đã ở trạng thái Đã thanh toán, Đã giao hoặc Đã hủy thì không thể hủy nữa (chỉ có Đã thanh toán -> Đã giao). Cần tối thiểu bao nhiêu ca kiểm thử bắt đầu từ Nháp để đạt độ bao phủ 100% các chuyển đổi hợp lệ (valid transitions)?",
    options: [
      "A. 1 ca kiểm thử",
      "B. 2 ca kiểm thử",
      "C. 3 ca kiểm thử",
      "D. 4 ca kiểm thử"
    ],
    correct: 2,
    explanation: "Có 5 chuyển đổi hợp lệ: (1) Draft->Cancelled, (2) Draft->Submitted, (3) Submitted->Cancelled, (4) Submitted->Paid, (5) Paid->Shipped. Vì Cancelled và Shipped là trạng thái kết thúc nên cần 3 đường đi bắt đầu từ Draft: [Draft->Cancelled], [Draft->Submitted->Cancelled] và [Draft->Submitted->Paid->Shipped].",
    mnemonic: "Đếm số nhánh kết thúc (terminal paths) cần thiết để đi qua mọi mũi tên hợp lệ ít nhất 1 lần."
  },
  {
    id: "q4_10",
    chapter: 4,
    section: "4.2.4",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Trong kỹ thuật Kiểm thử chuyển đổi trạng thái (State Transition Testing), cách biểu diễn nào hiệu quả NHẤT để nhận diện và thiết kế ca kiểm thử cho các chuyển đổi KHÔNG hợp lệ (các sự kiện cần bị chặn ở một trạng thái nhất định)?",
    options: [
      "A. Sơ đồ chuyển đổi trạng thái (State transition diagram) chỉ vẽ các mũi tên hợp lệ",
      "B. Bảng trạng thái (State table) liệt kê mọi trạng thái theo hàng và mọi sự kiện theo cột",
      "C. Bảng phân vùng tương đương của các biến trạng thái",
      "D. Đồ thị dòng điều khiển (Control flow graph) của mã nguồn"
    ],
    correct: 1,
    explanation: "Bảng trạng thái (State table) giao cắt từng trạng thái với từng sự kiện có thể xảy ra; các ô trống/null chính là các chuyển đổi không hợp lệ mà kiểm thử viên cần thiết kế test âm tính để kiểm tra.",
    mnemonic: "Sơ đồ trạng thái = Xem chuyển đổi Hợp lệ; Bảng trạng thái (Ô trống) = Bắt chuyển đổi Không hợp lệ."
  },
  {
    id: "q4_11",
    chapter: 4,
    section: "4.2.4",
    kLevel: "K3",
    difficulty: "hard",
    scenario: "Một khóa thông minh bắt đầu ở trạng thái LOCKED. Nhập sai mã PIN sẽ chuyển LOCKED -> WARNING_1 -> WARNING_2 -> ALARM. Từ WARNING_1 hoặc WARNING_2, nếu nhập đúng PIN sẽ quay về LOCKED; từ LOCKED nhập đúng PIN sẽ sang UNLOCKED (và có thể khóa lại về LOCKED). Mối quan hệ giữa 'bao phủ tất cả trạng thái (all states coverage)' và 'bao phủ các chuyển đổi hợp lệ (valid transitions coverage)' là gì?",
    options: [
      "A. Bao phủ tất cả trạng thái bao hàm (subsumes) bao phủ các chuyển đổi hợp lệ.",
      "B. Bao phủ các chuyển đổi hợp lệ (0-switch) bao hàm (subsumes) bao phủ tất cả trạng thái.",
      "C. Hai tiêu chí hoàn toàn độc lập, không cái nào đảm bảo cái nào.",
      "D. Bao phủ tất cả trạng thái bắt buộc phải kiểm thử các chuyển đổi không hợp lệ trước."
    ],
    correct: 1,
    explanation: "Đạt 100% bao phủ các chuyển đổi hợp lệ (0-switch coverage) chắc chắn sẽ đi qua mọi trạng thái có thể tới được (đạt 100% all states coverage), trong khi chỉ đi qua đủ các trạng thái có thể bỏ sót các mũi tên quay lui (như WARNING_1 -> LOCKED).",
    mnemonic: "Bao phủ mọi Chuyển đổi (0-Switch) > Bao phủ mọi Trạng thái (All States)."
  },
  {
    id: "q4_12",
    chapter: 4,
    section: "4.3.1",
    kLevel: "K2",
    difficulty: "easy",
    scenario: "Cho đoạn mã giả sau:\n1: READ x\n2: IF x > 0 THEN\n3:   y = x * 2\n4: END IF\n5: PRINT x\nSố lượng ca kiểm thử tối thiểu để đạt 100% Bao phủ câu lệnh (Statement Coverage) so với 100% Bao phủ nhánh (Branch Coverage) là bao nhiêu?",
    options: [
      "A. 1 cho Bao phủ câu lệnh; 1 cho Bao phủ nhánh",
      "B. 1 cho Bao phủ câu lệnh; 2 cho Bao phủ nhánh",
      "C. 2 cho Bao phủ câu lệnh; 1 cho Bao phủ nhánh",
      "D. 2 cho Bao phủ câu lệnh; 2 cho Bao phủ nhánh"
    ],
    correct: 1,
    explanation: "Chỉ cần 1 test với x = 5 là chạy qua toàn bộ các dòng 1, 2, 3, 4, 5 (đạt 100% Statement Coverage), nhưng chưa đi qua nhánh Sai (False) của lệnh 'IF x > 0'. Để đạt 100% Branch Coverage cần thêm test thứ 2 (ví dụ x = -1).",
    mnemonic: "Lệnh IF không có ELSE: 1 test phủ 100% Câu lệnh, 2 test phủ 100% Nhánh!"
  },
  {
    id: "q4_13",
    chapter: 4,
    section: "4.3.2",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Một bộ kiểm thử đạt được 100% Độ bao phủ nhánh (Branch Coverage) trên một mô-đun phần mềm. Phát biểu nào sau đây LUÔN ĐÚNG?",
    options: [
      "A. Mô-đun đó hoàn toàn không còn lỗi trong các biểu thức điều kiện.",
      "B. Bộ kiểm thử đó chắc chắn cũng đạt 100% Độ bao phủ câu lệnh (Statement Coverage) trên mô-đun đó.",
      "C. Mọi tổ hợp điều kiện boolean phức hợp trong mô-đun đều đã được kiểm thử.",
      "D. Tất cả các phân vùng tương đương không hợp lệ đều đã được kiểm thử."
    ],
    correct: 1,
    explanation: "Độ bao phủ nhánh bao hàm (subsumes) độ bao phủ câu lệnh: khi đã đi qua mọi nhánh trên đồ thị dòng điều khiển thì chắc chắn mọi câu lệnh thực thi được đều đã được chạy qua.",
    mnemonic: "100% Bao phủ Nhánh => Chắc chắn đạt 100% Bao phủ Câu lệnh (Luôn đúng!)."
  },
  {
    id: "q4_14",
    chapter: 4,
    section: "4.3.3",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Điểm mạnh cốt lõi của các kỹ thuật kiểm thử hộp trắng so với các kỹ thuật kiểm thử hộp đen là gì?",
    options: [
      "A. Kiểm thử hộp trắng phát hiện được các yêu cầu bị thiếu chưa từng được lập trình trong code.",
      "B. Kiểm thử hộp trắng bao phủ toàn bộ phần mã nguồn đã cài đặt, giúp phát hiện các đoạn code thừa hoặc logic ẩn không được nêu trong đặc tả.",
      "C. Kiểm thử hộp trắng không đòi hỏi kiến thức về lập trình hay kiến trúc hệ thống.",
      "D. Kiểm thử hộp trắng giúp thẩm định xem phần mềm có đáp ứng đúng kỳ vọng thực tế của người dùng cuối hay không."
    ],
    correct: 1,
    explanation: "Vì kiểm thử hộp trắng dựa trực tiếp trên mã nguồn nên nó có thể phát hiện lỗi trong các đoạn code làm thừa (backdoor, logic phụ không có trong đặc tả) mà kiểm thử hộp đen không thể biết để kiểm tra; ngược lại hộp trắng không phát hiện được yêu cầu bị quên chưa viết code.",
    mnemonic: "Hộp đen bắt lỗi Làm thiếu (Omission); Hộp trắng bắt lỗi Làm thừa/Code ẩn (Commission)."
  },
  {
    id: "q4_15",
    chapter: 4,
    section: "4.4.1",
    kLevel: "K2",
    difficulty: "easy",
    scenario: "Một kiểm thử viên giàu kinh nghiệm lập danh sách các lỗi phổ biến mà lập trình viên hay mắc phải khi tính toán ngày tháng (như ngày 29/02 năm nhuận, lệch múi giờ, giá trị thời gian null) và thiết kế các ca kiểm thử nhắm thẳng vào việc kích hoạt các lỗi đó. Phương pháp tiếp cận có hệ thống này của kỹ thuật Đoán lỗi (Error Guessing) được gọi là gì?",
    options: [
      "A. Kiểm thử nhánh (Branch Testing)",
      "B. Tấn công lỗi (Fault Attack)",
      "C. Quản lý kiểm thử theo phiên (Session-Based Test Management)",
      "D. Phát triển hướng kiểm thử chấp nhận (ATDD)"
    ],
    correct: 1,
    explanation: "Tấn công lỗi (Fault attack) là cách tiếp cận có phương pháp của kỹ thuật đoán lỗi, trong đó kiểm thử viên tạo hoặc sử dụng danh sách các sai sót, khiếm khuyết và hỏng hóc có thể xảy ra để thiết kế test nhắm mục tiêu.",
    mnemonic: "Đoán lỗi (Error Guessing) + Danh sách lỗi có hệ thống = Tấn công lỗi (Fault Attack)."
  },
  {
    id: "q4_16",
    chapter: 4,
    section: "4.4.2",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Khi một dự án có rất ít tài liệu đặc tả viết sẵn và chịu áp lực thời gian gấp rút, trưởng nhóm kiểm thử giao cho các kiểm thử viên các phiên làm việc giới hạn 90 phút (time-boxed sessions) định hướng bởi một Điều lệ kiểm thử (Test Charter) nêu rõ mục tiêu khám phá. Kỹ thuật nào đang được áp dụng?",
    options: [
      "A. Kiểm thử bảng quyết định (Decision Table Testing)",
      "B. Kiểm thử thăm dò (Exploratory Testing)",
      "C. Kiểm thử câu lệnh (Statement Testing)",
      "D. Phân tích giá trị biên (Boundary Value Analysis)"
    ],
    correct: 1,
    explanation: "Kiểm thử thăm dò (Exploratory testing) thực hiện đồng thời việc học hỏi, thiết kế kiểm thử và thực thi kiểm thử, thường được tổ chức theo các phiên giới hạn thời gian (session-based testing) dựa trên điều lệ kiểm thử (test charter).",
    mnemonic: "Ít đặc tả + Phiên giới hạn giờ (Time-boxed Charter) + Vừa học vừa test = Kiểm thử thăm dò."
  },
  {
    id: "q4_17",
    chapter: 4,
    section: "4.4.3",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Nhóm kiểm thử nên duy trì và cập nhật danh sách kiểm tra (checklist) dùng cho Kiểm thử dựa trên danh sách kiểm tra (Checklist-Based Testing) qua nhiều đợt phát hành như thế nào để giữ được hiệu quả cao?",
    options: [
      "A. Không bao giờ xóa bất kỳ mục nào để danh sách ngày càng dài và đầy đủ vô hạn.",
      "B. Chuyển toàn bộ các mục trong checklist thành unit test mức thấp rồi xóa bỏ hoàn toàn checklist.",
      "C. Thường xuyên cập nhật checklist bằng cách bổ sung các mẫu lỗi nghiêm trọng mới phát hiện và loại bỏ hoặc tự động hóa các mục kiểm tra cơ bản lặp lại.",
      "D. Chỉ ghi các giá trị dữ liệu đầu vào cố định vào checklist thay vì các điều kiện kiểm thử tổng quát."
    ],
    correct: 2,
    explanation: "Do nghịch lý thuốc trừ sâu (pesticide paradox), checklist sẽ giảm dần hiệu quả theo thời gian nếu không được làm mới bằng các kinh nghiệm lỗi mới và lược bỏ những mục rủi ro thấp hoặc đã được tự động hóa.",
    mnemonic: "Lược bỏ mục cũ/đã auto + Thêm mẫu lỗi mới = Giữ Checklist luôn sắc bén."
  },
  {
    id: "q4_18",
    chapter: 4,
    section: "4.5.1",
    kLevel: "K2",
    difficulty: "easy",
    scenario: "Trong kỹ thuật Viết User Story cộng tác (Collaborative User Story Writing), mô hình '3 chữ C' (3 C's) mô tả ba khía cạnh thiết yếu của một User Story. Ba chữ C đó là gì?",
    options: [
      "A. Code, Coverage, Completion",
      "B. Card (Thẻ), Conversation (Cuộc trò chuyện), Confirmation (Sự xác nhận)",
      "C. Context, Condition, Consequence",
      "D. Charter, Checklist, Criteria"
    ],
    correct: 1,
    explanation: "Mô hình 3 C gồm: Card (phương tiện vật lý hoặc điện tử ghi câu chuyện), Conversation (cuộc trao đổi giải thích cách phần mềm sẽ được sử dụng), và Confirmation (các tiêu chí chấp nhận - acceptance criteria).",
    mnemonic: "3 C của User Story = Card (Thẻ) + Conversation (Trò chuyện) + Confirmation (Tiêu chí chấp nhận)."
  },
  {
    id: "q4_19",
    chapter: 4,
    section: "4.5.1",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Trong buổi làm mịn backlog (backlog refinement), kiểm thử viên chỉ ra rằng một User Story ('Là người mua hàng, tôi muốn trang web thật thân thiện và dễ dùng') không có bất kỳ tiêu chí rõ ràng nào để kiểm tra xem nó đã đạt yêu cầu hay chưa. Chữ cái nào trong tiêu chuẩn INVEST đang bị vi phạm?",
    options: [
      "A. I — Independent (Độc lập)",
      "B. N — Negotiable (Có thể thương lượng)",
      "C. S — Small (Nhỏ gọn)",
      "D. T — Testable (Kiểm thử được)"
    ],
    correct: 3,
    explanation: "INVEST viết tắt của Independent, Negotiable, Valuable, Estimable, Small và Testable. Các yêu cầu mơ hồ như 'thân thiện dễ dùng' mà không có tiêu chí chấp nhận đo lường được thì vi phạm tính Kiểm thử được (Testable).",
    mnemonic: "INVEST: Independent, Negotiable, Valuable, Estimable, Small, Testable (Có thể kiểm thử)."
  },
  {
    id: "q4_20",
    chapter: 4,
    section: "4.5.2",
    kLevel: "K3",
    difficulty: "normal",
    scenario: "Bạn đang viết Tiêu chí chấp nhận hướng kịch bản (scenario-oriented acceptance criteria) theo định dạng Given/When/Then cho User Story rút tiền tại cây ATM. Phát biểu nào sau đây tuân thủ ĐÚNG cấu trúc Given/When/Then?",
    options: [
      "A. GIVEN người dùng yêu cầu rút $100, WHEN tài khoản có $500, THEN thẻ ATM được đưa vào máy.",
      "B. GIVEN tài khoản đã xác thực có số dư $500 và máy ATM còn đủ tiền, WHEN người dùng yêu cầu rút $100, THEN máy trả ra $100 và cập nhật số dư còn $400.",
      "C. GIVEN máy trả ra $100, WHEN số dư còn $400, THEN người dùng đăng nhập.",
      "D. GIVEN bảng cơ sở dữ liệu có cột balance, WHEN câu lệnh SQL UPDATE chạy, THEN trả về mã HTTP 200."
    ],
    correct: 1,
    explanation: "GIVEN xác định điều kiện tiên quyết / trạng thái ban đầu, WHEN xác định hành động kích hoạt của tác nhân, và THEN xác định kết quả đầu ra mong đợi có thể kiểm chứng.",
    mnemonic: "GIVEN [Điều kiện ban đầu], WHEN [Hành động kích hoạt], THEN [Kết quả mong đợi]."
  },
  {
    id: "q4_21",
    chapter: 4,
    section: "4.5.2",
    kLevel: "K2",
    difficulty: "easy",
    scenario: "Hai định dạng chính nào được ISTQB CTFL v4.0 nhấn mạnh khi viết Tiêu chí chấp nhận (Acceptance Criteria) cho một User Story?",
    options: [
      "A. Hướng kịch bản (Scenario-oriented, ví dụ Given/When/Then) và Hướng quy tắc (Rule-oriented, ví dụ danh sách gạch đầu dòng các quy tắc)",
      "B. Lưu đồ hộp trắng (White-box flowcharts) và Công thức độ phức tạp Cyclomatic",
      "C. Biểu đồ Gantt và Bảng ước lượng PERT",
      "D. Chú thích trong mã nguồn (Source code comments) và Database triggers"
    ],
    correct: 0,
    explanation: "Đề cương ISTQB v4.0 nêu rõ hai cách phổ biến để viết tiêu chí chấp nhận: hướng kịch bản (Scenario-oriented như Given/When/Then trong BDD) và hướng quy tắc (Rule-oriented như danh sách các quy tắc nghiệp vụ hoặc bảng ánh xạ đầu vào-đầu ra).",
    mnemonic: "Định dạng Tiêu chí chấp nhận = Hướng Kịch bản (Given/When/Then) hoặc Hướng Quy tắc (Bullet Rules)."
  },
  {
    id: "q4_22",
    chapter: 4,
    section: "4.5.3",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Phát biểu nào sau đây mô tả ĐÚNG NHẤT về Phát triển hướng kiểm thử chấp nhận (Acceptance Test-Driven Development - ATDD)?",
    options: [
      "A. Lập trình viên viết unit test sau khi mã nguồn ứng dụng đã được triển khai lên môi trường production.",
      "B. Các thành viên từ nhiều góc nhìn (khách hàng/nghiệp vụ, lập trình viên, kiểm thử viên) cùng nhau xây dựng các ca kiểm thử chấp nhận từ tiêu chí chấp nhận TRƯỚC KHI bắt đầu lập trình tính năng.",
      "C. Kiểm thử viên làm việc độc lập một mình sau giai đoạn tích hợp hệ thống để tự động hóa bộ kiểm thử hồi quy.",
      "D. Quản lý dự án sử dụng các bài kiểm thử chấp nhận để đo tốc độ code của từng lập trình viên."
    ],
    correct: 1,
    explanation: "ATDD là phương pháp tiếp cận ưu tiên kiểm thử trước (test-first) dựa trên sự cộng tác của bộ ba 'Three Amigos' (Nghiệp vụ, Phát triển, Kiểm thử) nhằm định nghĩa các ca kiểm thử chấp nhận trước khi cài đặt mã nguồn cho User Story.",
    mnemonic: "ATDD = Bộ ba Three Amigos cùng viết Kiểm thử chấp nhận TRƯỚC KHI viết Code."
  },
  {
    id: "q5_01",
    chapter: 5,
    section: "5.1.1",
    kLevel: "K2",
    difficulty: "easy",
    scenario: "Điều nào sau đây KHÔNG PHẢI là mục đích điển hình của Kế hoạch kiểm thử (Test Plan)?",
    options: [
      "A. Ghi lại phương tiện và lịch trình để đạt được các mục tiêu kiểm thử.",
      "B. Giúp đảm bảo rằng các hoạt động kiểm thử được thực hiện sẽ đáp ứng các tiêu chí đã thiết lập.",
      "C. Đóng vai trò là phương tiện giao tiếp với các thành viên trong nhóm và các bên liên quan khác.",
      "D. Đóng băng cứng lịch trình dự án để không một thay đổi nào được phép xảy ra sau khi bắt đầu thực thi kiểm thử."
    ],
    correct: 3,
    explanation: "Lập kế hoạch kiểm thử là hoạt động diễn ra liên tục trong suốt vòng đời dự án; kế hoạch kiểm thử luôn được cập nhật linh hoạt khi rủi ro và thông tin phản hồi thay đổi, không bao giờ dùng để đóng băng thay đổi.",
    mnemonic: "Kế hoạch kiểm thử (Test Plan) định hướng & giao tiếp — là tài liệu sống, KHÔNG đóng băng cứng."
  },
  {
    id: "q5_02",
    chapter: 5,
    section: "5.1.2",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Trong phát triển phần mềm Agile, Tiêu chí đầu vào (Entry Criteria) và Tiêu chí đầu ra (Exit Criteria) khi áp dụng cho một User Story thường được gọi bằng tên gì?",
    options: [
      "A. Tiêu chí đầu vào = Definition of Done (DoD); Tiêu chí đầu ra = Definition of Ready (DoR)",
      "B. Tiêu chí đầu vào = Definition of Ready (DoR); Tiêu chí đầu ra = Definition of Done (DoD)",
      "C. Tiêu chí đầu vào = Điều lệ kiểm thử (Test Charter); Tiêu chí đầu ra = Vận tốc nhóm (Velocity)",
      "D. Tiêu chí đầu vào = Biểu đồ Burn-down; Tiêu chí đầu ra = Ghi chú phát hành (Release Note)"
    ],
    correct: 1,
    explanation: "Trong Agile, Tiêu chí đầu vào để một User Story đủ điều kiện đưa vào Sprint được gọi là Definition of Ready (DoR - Định nghĩa Sẵn sàng), còn Tiêu chí đầu ra để xác nhận hoàn tất được gọi là Definition of Done (DoD - Định nghĩa Hoàn thành).",
    mnemonic: "Ready (DoR) = Đủ điều kiện VÀO Sprint; Done (DoD) = Đủ điều kiện HOÀN TẤT ra khỏi Sprint."
  },
  {
    id: "q5_03",
    chapter: 5,
    section: "5.1.3",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Cặp phân loại nào sau đây sắp xếp ĐÚNG 4 kỹ thuật ước lượng nỗ lực kiểm thử theo chương trình ISTQB CTFL v4.0?",
    options: [
      "A. Dựa trên số liệu (Metrics-based): Ước lượng theo tỷ lệ (Ratios), Ngoại suy (Extrapolation) | Dựa trên chuyên gia (Expert-based): Wideband Delphi, Ước lượng 3 điểm (Three-point estimation)",
      "B. Dựa trên số liệu: Wideband Delphi, Planning Poker | Dựa trên chuyên gia: Ngoại suy, Ước lượng 3 điểm",
      "C. Dựa trên số liệu: Ước lượng 3 điểm, Tỷ lệ | Dựa trên chuyên gia: Ngoại suy, Biểu đồ Burndown",
      "D. Dựa trên số liệu: Độ phức tạp Cyclomatic, BVA | Dựa trên chuyên gia: Đoán lỗi, Ước lượng theo Checklist"
    ],
    correct: 0,
    explanation: "Kỹ thuật dựa trên số liệu (Metrics-based) dựa vào dữ liệu/con số (Tỷ lệ từ các dự án cũ, Ngoại suy từ xu hướng của dự án hiện tại). Kỹ thuật dựa trên chuyên gia (Expert-based) dựa vào kinh nghiệm con người (Wideband Delphi/Planning Poker và Ước lượng 3 điểm).",
    mnemonic: "Số liệu (Metrics) = Tỷ lệ (Ratios) + Ngoại suy (Extrapolation); Chuyên gia (Expert) = Wideband Delphi + Ước lượng 3 điểm (PERT)."
  },
  {
    id: "q5_04",
    chapter: 5,
    section: "5.1.3",
    kLevel: "K3",
    difficulty: "normal",
    scenario: "Sử dụng kỹ thuật Ước lượng 3 điểm (Three-Point Estimation), các chuyên gia ước lượng nỗ lực kiểm thử cho mô-đun thanh toán như sau: Lạc quan nhất (a) = 10 giờ-người, Khả dĩ nhất (m) = 19 giờ-người, và Bi quan nhất (b) = 34 giờ-người. Nỗ lực kỳ vọng (E) và Độ lệch chuẩn (SD) bằng bao nhiêu?",
    options: [
      "A. E = 21 giờ, SD = 4 giờ",
      "B. E = 20 giờ, SD = 4 giờ",
      "C. E = 20 giờ, SD = 6 giờ",
      "D. E = 19 giờ, SD = 4 giờ"
    ],
    correct: 1,
    explanation: "Áp dụng công thức PERT: E = (a + 4m + b) / 6 = (10 + 4*19 + 34) / 6 = (10 + 76 + 34) / 6 = 120 / 6 = 20 giờ. Độ lệch chuẩn SD = (b - a) / 6 = (34 - 10) / 6 = 24 / 6 = 4 giờ.",
    mnemonic: "Công thức PERT: E = (a + 4m + b) / 6; SD = (b - a) / 6."
  },
  {
    id: "q5_05",
    chapter: 5,
    section: "5.1.3",
    kLevel: "K2",
    difficulty: "easy",
    scenario: "Trong các dự án trước đây tại công ty bạn, tỷ lệ nỗ lực giữa lập trình viên và kiểm thử viên luôn duy trì ổn định ở mức 3:2. Với một dự án mới có nỗ lực phát triển ước tính là 600 ngày-người, quản lý kiểm thử ước lượng cần 400 ngày-người cho kiểm thử. Kỹ thuật ước lượng nào đang được sử dụng?",
    options: [
      "A. Wideband Delphi",
      "B. Ước lượng 3 điểm (Three-point estimation)",
      "C. Ước lượng dựa trên tỷ lệ (Estimation based on ratios)",
      "D. Ngoại suy (Extrapolation)"
    ],
    correct: 2,
    explanation: "Ước lượng dựa trên tỷ lệ (Estimation based on ratios) sử dụng các tỷ lệ chuẩn thu thập từ dữ liệu lịch sử của các dự án trước đó (như tỷ lệ nỗ lực Dev:Test) để dự tính nỗ lực cho dự án mới.",
    mnemonic: "Dùng Tỷ lệ lịch sử từ các dự án cũ (như Dev:Test = 3:2) = Ước lượng dựa trên tỷ lệ (Ratios)."
  },
  {
    id: "q5_06",
    chapter: 5,
    section: "5.1.4",
    kLevel: "K3",
    difficulty: "hard",
    scenario: "Bạn cần thực thi 4 ca kiểm thử (TC1, TC2, TC3, TC4). Độ ưu tiên theo rủi ro của chúng là: TC2 (Cao nhất), TC4 (Cao), TC1 (Trung bình), TC3 (Thấp). Tuy nhiên, TC4 phụ thuộc vào dữ liệu kiểm thử do TC1 tạo ra, còn TC2 không phụ thuộc vào ai. Thứ tự thực thi kiểm thử tối ưu vừa tôn trọng sự phụ thuộc kỹ thuật vừa tối đa hóa độ bao phủ rủi ro sớm là gì?",
    options: [
      "A. TC2 -> TC4 -> TC1 -> TC3",
      "B. TC2 -> TC1 -> TC4 -> TC3",
      "C. TC1 -> TC2 -> TC4 -> TC3",
      "D. TC1 -> TC4 -> TC2 -> TC3"
    ],
    correct: 1,
    explanation: "TC2 có rủi ro cao nhất và không phụ thuộc vào ca nào nên chạy đầu tiên. TC4 có mức rủi ro cao tiếp theo nhưng bắt buộc phải có dữ liệu từ TC1 trước, vì vậy TC1 được đẩy lên chạy thứ hai để mở đường cho TC4 chạy ngay thứ ba, và cuối cùng là TC3.",
    mnemonic: "Ưu tiên Rủi ro cao nhất trước, nhưng phải chạy ca điều kiện tiên quyết (Prerequisite) ngay trước ca phụ thuộc."
  },
  {
    id: "q5_07",
    chapter: 5,
    section: "5.1.4",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Một nhóm kiểm thử sắp xếp thứ tự bộ kiểm thử sao cho ca kiểm thử nào bao phủ được nhiều nhánh mã nguồn CHƯA ĐƯỢC BAO PHỦ nhất sẽ được chọn chạy tiếp theo, lặp lại cho đến khi toàn bộ các nhánh đều được bao phủ. Chiến lược ưu tiên ca kiểm thử nào đang được sử dụng?",
    options: [
      "A. Ưu tiên dựa trên rủi ro (Risk-based prioritization)",
      "B. Ưu tiên theo độ bao phủ bổ sung (Additional coverage prioritization — một biến thể của ưu tiên dựa trên độ bao phủ)",
      "C. Ưu tiên dựa trên yêu cầu (Requirements-based prioritization)",
      "D. Ưu tiên dựa trên kinh nghiệm (Experience-based prioritization)"
    ],
    correct: 1,
    explanation: "Ưu tiên dựa trên độ bao phủ (Coverage-based prioritization) sắp xếp test theo độ phủ đạt được; trong biến thể 'Độ bao phủ bổ sung (Additional coverage)', mỗi ca kiểm thử tiếp theo được chọn dựa trên số lượng phần tử MỚI (chưa từng được phủ trước đó) mà nó đóng góp thêm.",
    mnemonic: "Tổng độ bao phủ = Ca lớn nhất chạy trước; Độ bao phủ bổ sung = Ca phủ thêm nhiều phần tử MỚI nhất chạy tiếp theo."
  },
  {
    id: "q5_08",
    chapter: 5,
    section: "5.1.5",
    kLevel: "K2",
    difficulty: "easy",
    scenario: "Trong mô hình Kim tự tháp kiểm thử (Test Pyramid), các bài kiểm thử ở tầng đáy (unit/component test) khác với các bài kiểm thử ở tầng đỉnh (end-to-end UI test) như thế nào?",
    options: [
      "A. Kiểm thử tầng đáy chạy chậm hơn, phạm vi rộng hơn và số lượng ít hơn tầng đỉnh.",
      "B. Kiểm thử tầng đáy chạy nhanh hơn, tính cô lập cao hơn (độ mịn nhỏ hơn) và có số lượng nhiều hơn hẳn so với tầng đỉnh.",
      "C. Kiểm thử tầng đáy hoàn toàn làm thủ công trong khi tầng đỉnh được tự động hóa.",
      "D. Cả hai tầng phải có số lượng ca kiểm thử bằng hệt nhau."
    ],
    correct: 1,
    explanation: "Đáy của Kim tự tháp kiểm thử gồm rất nhiều unit test nhỏ gọn, cô lập và chạy cực nhanh, trong khi phần đỉnh chỉ gồm một số lượng nhỏ các bài kiểm thử đầu-cuối (End-to-End) có độ mịn lớn và chạy chậm hơn.",
    mnemonic: "Đáy Kim tự tháp = Nhiều, Nhanh, Cô lập (Unit Test); Đỉnh Kim tự tháp = Ít, Chậm, Tích hợp toàn trình (E2E UI)."
  },
  {
    id: "q5_09",
    chapter: 5,
    section: "5.1.6",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Trong mô hình 4 Góc phần tư kiểm thử (Testing Quadrants) của Brian Marick, góc phần tư nào chứa Kiểm thử thăm dò (Exploratory Testing), Kiểm thử khả dụng (Usability Testing) và Kiểm thử chấp nhận người dùng (UAT)?",
    options: [
      "A. Góc phần tư Q1 (Hướng công nghệ, hỗ trợ nhóm)",
      "B. Góc phần tư Q2 (Hướng nghiệp vụ, hỗ trợ nhóm)",
      "C. Góc phần tư Q3 (Hướng nghiệp vụ, phản biện sản phẩm)",
      "D. Góc phần tư Q4 (Hướng công nghệ, phản biện sản phẩm)"
    ],
    correct: 2,
    explanation: "Góc phần tư Q3 hướng về nghiệp vụ (Business-facing) và phản biện sản phẩm (Critique the product) thông qua các kịch bản người dùng thực tế, kiểm thử thăm dò, kiểm thử khả dụng và UAT.",
    mnemonic: "Q1=Công nghệ+Hỗ trợ(Unit), Q2=Nghiệp vụ+Hỗ trợ(Story), Q3=Nghiệp vụ+Phản biện(Exploratory/UAT), Q4=Công nghệ+Phản biện(Hiệu năng/Bảo mật)."
  },
  {
    id: "q5_10",
    chapter: 5,
    section: "5.2.1",
    kLevel: "K1",
    difficulty: "easy",
    scenario: "Hai yếu tố nào kết hợp với nhau để xác định Mức độ rủi ro (Risk Level) của một rủi ro đã được nhận diện?",
    options: [
      "A. Độ ưu tiên rủi ro và Mật độ lỗi (Defect Density)",
      "B. Khả năng xảy ra rủi ro (Risk Likelihood) và Mức độ tác động của rủi ro (Risk Impact)",
      "C. Nỗ lực kiểm thử và Độ bao phủ mã nguồn",
      "D. Số lượng lập trình viên và Số lượng kiểm thử viên"
    ],
    correct: 1,
    explanation: "Mức độ rủi ro (Risk Level) được xác định bằng cách kết hợp Khả năng xảy ra (Risk Likelihood - xác suất sự kiện rủi ro xuất hiện) và Mức độ tác động (Risk Impact - mức độ thiệt hại nếu rủi ro đó xảy ra).",
    mnemonic: "Mức độ rủi ro (Risk Level) = Khả năng xảy ra (Likelihood) × Mức độ tác động (Impact)."
  },
  {
    id: "q5_11",
    chapter: 5,
    section: "5.2.2",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Trường hợp nào sau đây là RỦI RO SẢN PHẨM (Product Risk) chứ không phải Rủi ro dự án (Project Risk)?",
    options: [
      "A. Các kỹ sư tự động hóa chủ chốt nộp đơn nghỉ việc 2 tuần trước hạn phát hành.",
      "B. Môi trường kiểm thử Staging bị bàn giao chậm 3 tuần do chậm trễ mua sắm phần cứng.",
      "C. Ứng dụng ngân hàng di động có nguy cơ tính sai lãi kép cho các khoản vay rơi vào năm nhuận.",
      "D. Ngân sách dành cho kiểm thử bị cắt giảm 25% vào giữa quý."
    ],
    correct: 2,
    explanation: "Việc tính sai lãi suất ảnh hưởng trực tiếp đến chất lượng và tính đúng đắn chức năng của sản phẩm phần mềm (Rủi ro sản phẩm - Product risk), trong khi thiếu hụt nhân sự, chậm môi trường và cắt giảm ngân sách là Rủi ro dự án (Project risk).",
    mnemonic: "Rủi ro Sản phẩm = Lỗi chất lượng phần mềm; Rủi ro Dự án = Trục trặc Tiến độ / Ngân sách / Nhân sự / Môi trường."
  },
  {
    id: "q5_12",
    chapter: 5,
    section: "5.2.3",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Trong quá trình Phân tích rủi ro sản phẩm (Product Risk Analysis), kết quả đánh giá rủi ro ảnh hưởng như thế nào đến việc lập kế hoạch và thực thi kiểm thử?",
    options: [
      "A. Chỉ dùng để quy trách nhiệm cho lập trình viên khi mô-đun rủi ro cao bị lỗi trên production.",
      "B. Dùng để xác định phạm vi kiểm thử, chọn cấp độ và kỹ thuật kiểm thử phù hợp, mức độ nghiêm ngặt của độ bao phủ và thứ tự ưu tiên thực thi kiểm thử.",
      "C. Thay thế hoàn toàn nhu cầu về tiêu chí đầu ra và báo cáo lỗi.",
      "D. Bắt buộc phải kiểm thử các mục rủi ro thấp trước để lấy thành tích nhanh."
    ],
    correct: 1,
    explanation: "Phân tích rủi ro sản phẩm giúp tập trung nỗ lực kiểm thử vào nơi quan trọng nhất: quyết định phạm vi test, chọn kỹ thuật kiểm thử mạnh hơn, mục tiêu bao phủ sâu hơn và ưu tiên chạy các ca kiểm thử rủi ro cao sớm nhất.",
    mnemonic: "Rủi ro sản phẩm càng cao => Chạy test càng sớm + Kỹ thuật càng chặt + Độ bao phủ càng sâu."
  },
  {
    id: "q5_13",
    chapter: 5,
    section: "5.2.4",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Hai hoạt động chính nào cấu thành giai đoạn Kiểm soát rủi ro (Risk Control) trong quy trình quản lý rủi ro?",
    options: [
      "A. Nhận diện rủi ro (Risk Identification) và Đánh giá rủi ro (Risk Assessment)",
      "B. Giảm thiểu rủi ro (Risk Mitigation) và Giám sát rủi ro (Risk Monitoring)",
      "C. Ngoại suy rủi ro (Risk Extrapolation) và Ước lượng rủi ro (Risk Estimation)",
      "D. Loại bỏ rủi ro và Tái cấu trúc mã nguồn (Code Refactoring)"
    ],
    correct: 1,
    explanation: "Theo ISTQB CTFL v4.0, Quản lý rủi ro gồm 2 phần: Phân tích rủi ro (Nhận diện rủi ro + Đánh giá rủi ro) và Kiểm soát rủi ro (Giảm thiểu rủi ro + Giám sát rủi ro).",
    mnemonic: "Phân tích rủi ro = Nhận diện + Đánh giá; Kiểm soát rủi ro = Giảm thiểu (Mitigate) + Giám sát (Monitor)."
  },
  {
    id: "q5_14",
    chapter: 5,
    section: "5.3.1",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Vào giữa Sprint, các chỉ số đo lường hằng ngày cho thấy các ca kiểm thử rủi ro nghiêm trọng đang bị chậm tiến độ. Để xử lý, trưởng nhóm kiểm thử điều chuyển 2 kiểm thử viên từ nhóm giao diện rủi ro thấp sang hỗ trợ kiểm thử API thanh toán rủi ro cao và tạm hoãn các bài kiểm thử ít quan trọng. Trưởng nhóm kiểm thử đang thực hiện hoạt động gì?",
    options: [
      "A. Giám sát kiểm thử (Test Monitoring)",
      "B. Kiểm soát kiểm thử (Test Control)",
      "C. Hoàn tất kiểm thử (Test Completion)",
      "D. Định danh cấu hình (Configuration Identification)"
    ],
    correct: 1,
    explanation: "Thu thập các số liệu tiến độ là Giám sát kiểm thử (Test Monitoring), còn việc đưa ra quyết định và hành động điều chỉnh thực tế (phân bổ lại nhân sự, thay đổi thứ tự ưu tiên) để đạt mục tiêu kế hoạch là Kiểm soát kiểm thử (Test Control).",
    mnemonic: "Giám sát (Monitoring) = Đo đạc & Quan sát; Kiểm soát (Control) = Hành động & Điều hướng."
  },
  {
    id: "q5_15",
    chapter: 5,
    section: "5.3.3",
    kLevel: "K2",
    difficulty: "easy",
    scenario: "Phương thức nào phù hợp NHẤT để truyền đạt tiến độ kiểm thử ngắn gọn, theo thời gian thực trong một nhóm Agile làm việc cùng nhau?",
    options: [
      "A. Một Báo cáo hoàn tất kiểm thử chính thức dài 150 trang gửi vào cuối năm",
      "B. Trao đổi trực tiếp trong buổi họp đứng hằng ngày (daily stand-up) kết hợp với bảng công việc trực quan (task boards), biểu đồ burn-down và dashboard",
      "C. Nộp hồ sơ kiểm toán pháp lý cho cơ quan quản lý bên ngoài",
      "D. Giấu kín toàn bộ số liệu cho đến khi tất cả các lỗi được sửa xong"
    ],
    correct: 1,
    explanation: "Các nhóm Agile ưu tiên giao tiếp gọn nhẹ, minh bạch cao như họp daily stand-up và các bảng thông tin trực quan (task boards, burn-down charts, dashboards).",
    mnemonic: "Báo cáo trong Agile = Họp Daily Stand-up + Bảng trực quan (Dashboard / Task Board / Burn-down)."
  },
  {
    id: "q5_16",
    chapter: 5,
    section: "5.4",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Tại sao Quản lý cấu hình (Configuration Management - CM) lại đóng vai trò thiết yếu đối với kiểm thử, đặc biệt trong các đường ống tích hợp liên tục (CI/CD) và tự động hóa?",
    options: [
      "A. Vì nó tự động viết tiêu chí chấp nhận cho các User Story.",
      "B. Vì nó đảm bảo mọi đối tượng kiểm thử, testware và phiên bản môi trường đều được định danh duy nhất, quản lý phiên bản và truy vết được về một đường cơ sở (baseline) xác định để tái lập kết quả kiểm thử.",
      "C. Vì nó thay thế hoàn toàn các công cụ quản lý lỗi.",
      "D. Vì nó đảm bảo đạt 100% độ bao phủ nhánh trên mọi bản commit."
    ],
    correct: 1,
    explanation: "Quản lý cấu hình (CM) theo dõi chính xác phiên bản của mã nguồn, kịch bản test, dữ liệu test và môi trường dưới dạng các đường cơ sở (baselines) để kết quả kiểm thử có thể tái lập và kiểm chứng đáng tin cậy.",
    mnemonic: "Quản lý cấu hình (CM) = Quản lý Phiên bản + Đường cơ sở (Baseline) + Truy vết = Tái lập kiểm thử chính xác."
  },
  {
    id: "q5_17",
    chapter: 5,
    section: "5.5",
    kLevel: "K3",
    difficulty: "normal",
    scenario: "Một kiểm thử viên phát hiện khi bấm 'Thanh toán' với mã giảm giá chứa ký tự '%' thì trang thanh toán bị sập với lỗi HTTP 500 trên trình duyệt Chrome v124 ở môi trường Staging. Kiểm thử viên viết báo cáo lỗi gồm: Tiêu đề, Mô tả chung, Kết quả mong đợi, Kết quả thực tế, Mức độ nghiêm trọng (Severity) và Độ ưu tiên (Priority). Thông tin quan trọng nào đang BỊ THIẾU khiến lập trình viên khó tái hiện và sửa lỗi này?",
    options: [
      "A. Điểm đánh giá hiệu suất làm việc hằng năm của lập trình viên",
      "B. Các bước tái hiện lỗi chi tiết (kèm dữ liệu mã giảm giá chứa '%'), thông tin môi trường/phiên bản kiểm thử (Staging, bản build, Chrome v124) và ảnh chụp màn hình/log lỗi",
      "C. Bảng tính Ước lượng 3 điểm cho toàn bộ dự án",
      "D. Đoạn mã nguồn sửa lỗi do chính kiểm thử viên tự viết sẵn"
    ],
    correct: 1,
    explanation: "Để lập trình viên tái hiện và khoanh vùng lỗi nhanh chóng, báo cáo lỗi bắt buộc phải có các bước tái hiện rõ ràng, dữ liệu đầu vào đã dùng, thông tin môi trường/phiên bản phần mềm và bằng chứng đính kèm (log/ảnh chụp màn hình).",
    mnemonic: "Báo cáo lỗi chuẩn = Các bước tái hiện + Dữ liệu test + Môi trường/Phiên bản + Mong đợi vs Thực tế + Log/Ảnh chụp."
  },
  {
    id: "q5_18",
    chapter: 5,
    section: "5.5",
    kLevel: "K2",
    difficulty: "easy",
    scenario: "Mục tiêu chính của Quản lý lỗi (Defect Management) đối với các điểm bất thường (anomalies) được ghi nhận là gì?",
    options: [
      "A. Tối đa hóa tổng số lượng lỗi ghi nhận để kiểm thử viên được thưởng nhiều hơn.",
      "B. Cung cấp đầy đủ thông tin để giải quyết các điểm bất thường và theo dõi chúng từ lúc phát hiện cho đến khi đóng lại (bao gồm cả phân loại và phân tích xu hướng thống kê).",
      "C. Đảm bảo mọi điểm bất thường đều bắt buộc phải sửa code, kể cả khi đó là báo lỗi nhầm (false positive).",
      "D. Bỏ qua bước kiểm thử xác nhận (confirmation testing) ngay khi lập trình viên chuyển trạng thái ticket sang đã sửa."
    ],
    correct: 1,
    explanation: "Quản lý lỗi cung cấp quy trình khép kín để ghi nhận, phân loại, điều tra, khắc phục, kiểm thử xác nhận (hoặc đóng nếu là lỗi giả/hoãn lại) và phân tích xu hướng lỗi nhằm cải tiến quy trình.",
    mnemonic: "Vòng đời lỗi: Ghi nhận -> Phân loại -> Điều tra -> Sửa lỗi -> Kiểm thử xác nhận (Confirmation Test) -> Đóng."
  },
  {
    id: "q6_01",
    chapter: 6,
    section: "6.1",
    kLevel: "K2",
    difficulty: "easy",
    scenario: "Một nhóm phát triển sử dụng công cụ quét mã nguồn trước khi biên dịch để kiểm tra quy chuẩn lập trình (coding standards), phát hiện các đoạn mã không bao giờ chạy tới (unreachable code) và tính độ phức tạp Cyclomatic mà không cần chạy chương trình. Đây là loại công cụ kiểm thử nào?",
    options: [
      "A. Công cụ đo độ bao phủ động (Dynamic coverage measurement tool)",
      "B. Công cụ kiểm thử tĩnh / phân tích mã tĩnh (Static testing tool)",
      "C. Công cụ tạo tải hiệu năng phi chức năng (Non-functional performance load generator)",
      "D. Công cụ chuẩn bị dữ liệu kiểm thử (Test data preparation tool)"
    ],
    correct: 1,
    explanation: "Công cụ kiểm thử tĩnh (Static testing tools) phân tích mã nguồn hoặc sản phẩm công việc mà không cần thực thi phần mềm, giúp phát hiện vi phạm quy chuẩn code, lỗi cấu trúc và đo độ phức tạp.",
    mnemonic: "Không chạy chương trình + Quét Linter/Độ phức tạp code = Công cụ kiểm thử tĩnh (Static Testing Tool)."
  },
  {
    id: "q6_02",
    chapter: 6,
    section: "6.1",
    kLevel: "K2",
    difficulty: "easy",
    scenario: "Nhóm công cụ nào giúp kiểm thử viên ẩn danh hóa dữ liệu thực tế (data anonymization/masking), sinh các bản ghi khách hàng giả lập và nạp dữ liệu vào cơ sở dữ liệu trước khi chạy kiểm thử?",
    options: [
      "A. Công cụ thiết kế và triển khai kiểm thử (cụ thể là công cụ chuẩn bị dữ liệu kiểm thử - test data preparation tools)",
      "B. Công cụ hỗ trợ rà soát tĩnh (Static review tools)",
      "C. Công cụ theo dõi lỗi (Defect tracking tools)",
      "D. Công cụ điều phối container (Container orchestration tools)"
    ],
    correct: 0,
    explanation: "Công cụ thiết kế và triển khai kiểm thử (Test design and implementation tools) hỗ trợ tạo ca kiểm thử, chuẩn bị dữ liệu kiểm thử (bao gồm làm mờ/ẩn danh dữ liệu nhạy cảm) và xây dựng thủ tục kiểm thử.",
    mnemonic: "Ẩn danh dữ liệu (Data Masking) & Sinh bản ghi giả lập = Công cụ Thiết kế & Triển khai kiểm thử."
  },
  {
    id: "q6_03",
    chapter: 6,
    section: "6.1",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Tập hợp các hoạt động nào sau đây được hỗ trợ chính bởi Công cụ quản lý kiểm thử (Test Management Tools)?",
    options: [
      "A. Giả lập 10.000 người dùng ảo truy cập đồng thời để kiểm thử chịu tải máy chủ web",
      "B. Quản lý testware, lập lịch thực thi kiểm thử, theo dõi lỗi, truy vết yêu cầu và tổng hợp số liệu báo cáo tiến độ",
      "C. Biên dịch mã bytecode Java sang mã máy",
      "D. Đo tỷ lệ trượt bộ nhớ đệm (cache misses) của CPU ở mức thanh ghi phần cứng"
    ],
    correct: 1,
    explanation: "Công cụ quản lý kiểm thử và ALM nâng cao hiệu quả quản lý bằng cách tổ chức các ca kiểm thử, liên kết truy vết yêu cầu, theo dõi lỗi và xuất báo cáo số liệu tiến độ kiểm thử.",
    mnemonic: "Công cụ Quản lý = Truy vết yêu cầu + Lập lịch chạy + Theo dõi lỗi + Báo cáo số liệu."
  },
  {
    id: "q6_04",
    chapter: 6,
    section: "6.1",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Một kiểm thử viên sử dụng công cụ để giả lập 5.000 khách hàng mua sắm thanh toán cùng lúc, đồng thời đo thời gian phản hồi, thông lượng (throughput) và mức sử dụng tài nguyên máy chủ. Nhóm công cụ nào đang được sử dụng?",
    options: [
      "A. Công cụ kiểm thử phi chức năng (cụ thể là công cụ kiểm thử hiệu năng/chịu tải)",
      "B. Công cụ phân tích tĩnh (Static analysis tool)",
      "C. Công cụ quản lý cấu hình (Configuration management tool)",
      "D. Công cụ thiết kế kiểm thử dựa trên mô hình (Model-based test design tool)"
    ],
    correct: 0,
    explanation: "Công cụ kiểm thử phi chức năng (Non-functional testing tools) cho phép thực hiện kiểm thử tải, kiểm thử áp lực (stress), đo hiệu năng và quét bảo mật — những việc không thể thực hiện thủ công bằng tay.",
    mnemonic: "Giả lập Tải lớn, Stress, Thời gian phản hồi & Bảo mật = Công cụ kiểm thử Phi chức năng."
  },
  {
    id: "q6_05",
    chapter: 6,
    section: "6.2",
    kLevel: "K1",
    difficulty: "easy",
    scenario: "Điều nào sau đây là LỢI ÍCH được công nhận của tự động hóa thực thi kiểm thử (test execution automation)?",
    options: [
      "A. Loại bỏ hoàn toàn nhu cầu kiểm thử thăm dò thủ công của con người.",
      "B. Không tốn bất kỳ công sức bảo trì nào sau khi kịch bản kiểm thử ban đầu được ghi lại.",
      "C. Đảm bảo thực thi kiểm thử nhất quán, có thể lặp lại và ngăn ngừa sai sót của con người trong các tác vụ lặp đi lặp lại như kiểm thử hồi quy.",
      "D. Tự động đánh giá xem màu sắc giao diện có mang lại cảm xúc dễ chịu cho người dùng hay không."
    ],
    correct: 2,
    explanation: "Thực thi kiểm thử tự động vượt trội ở tính lặp lại, tính nhất quán, tốc độ cao và giải phóng kiểm thử viên khỏi các công việc kiểm thử hồi quy nhàm chán, dễ nhầm lẫn.",
    mnemonic: "Lợi ích Tự động hóa = Nhanh, Nhất quán, Lặp lại chính xác không sợ nhầm lẫn con người."
  },
  {
    id: "q6_06",
    chapter: 6,
    section: "6.2",
    kLevel: "K1",
    difficulty: "easy",
    scenario: "Tại sao tự động hóa kiểm thử lại giúp mang lại phản hồi nhanh hơn (faster feedback) trong đường ống CI/CD so với thực thi thủ công?",
    options: [
      "A. Vì kiểm thử tự động bỏ qua mọi bước kiểm tra kết quả (assertions) để chạy cho nhanh.",
      "B. Vì bộ kiểm thử hồi quy và kiểm tra bản build tự động có thể chạy tự động ngay lập tức sau mỗi lần commit code, cảnh báo lập trình viên ngay khi bản build bị lỗi.",
      "C. Vì công cụ tự động tự sửa lại mã nguồn ứng dụng bị lỗi.",
      "D. Vì kiểm thử tự động chỉ kiểm tra đúng 1% ứng dụng."
    ],
    correct: 1,
    explanation: "Thời gian chạy test được rút ngắn cùng khả năng kích hoạt tự động trên CI/CD giúp phát hiện lỗi hồi quy sớm và phản hồi tức thì cho lập trình viên trên từng bản build.",
    mnemonic: "Chạy tự động trên CI/CD = Thực thi nhanh + Phản hồi lỗi hồi quy tức thì."
  },
  {
    id: "q6_07",
    chapter: 6,
    section: "6.2",
    kLevel: "K1",
    difficulty: "normal",
    scenario: "Điều nào sau đây là RỦI RO hoặc cạm bẫy phổ biến khi đưa tự động hóa kiểm thử vào dự án?",
    options: [
      "A. Đánh giá khách quan hơn về các chỉ số độ bao phủ",
      "B. Kỳ vọng phi thực tế về khả năng của công cụ và đánh giá thấp công sức, thời gian cần thiết để duy trì, bảo trì các kịch bản kiểm thử khi phần mềm thay đổi",
      "C. Ngăn chặn các lỗi nhập liệu đơn giản của con người",
      "D. Khả năng chạy các bộ kiểm thử ngoài giờ hành chính"
    ],
    correct: 1,
    explanation: "Ban quản lý và nhóm dự án rất hay đánh giá thấp thời gian, kỹ năng kỹ thuật và chi phí bảo trì liên tục cần thiết để giữ cho bộ kịch bản kiểm thử tự động hoạt động tốt khi giao diện hoặc nghiệp vụ thay đổi.",
    mnemonic: "Rủi ro lớn nhất của Automation = Kỳ vọng phi thực tế + Đánh giá thấp chi phí bảo trì kịch bản."
  },
  {
    id: "q6_08",
    chapter: 6,
    section: "6.2",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Một nhóm tự động hóa 100% bộ kiểm thử hồi quy và sau đó ngừng hoàn toàn mọi hoạt động kiểm thử thăm dò (exploratory testing) cũng như kiểm thử khả dụng thủ công vì tin rằng bộ auto sẽ bắt được mọi lỗi. Rủi ro tự động hóa nào đã xảy ra?",
    options: [
      "A. Phụ thuộc quá mức vào công cụ (over-reliance on the tool), bỏ qua giá trị tư duy phản biện và kiểm thử thăm dò của con người",
      "B. Không tương thích giấy phép bản quyền với các thư viện mã nguồn mở",
      "C. Quá nhiều cảnh báo giả từ phân tích mã tĩnh",
      "D. Thiếu các đường cơ sở quản lý cấu hình"
    ],
    correct: 0,
    explanation: "Kịch bản tự động chỉ kiểm tra được đúng những gì nó được lập trình sẵn; phụ thuộc quá mức vào công cụ sẽ khiến nhóm mù quáng trước các lỗi bất ngờ nằm ngoài kịch bản mà chỉ kiểm thử thăm dò của con người mới phát hiện ra.",
    mnemonic: "Script chỉ kiểm tra những gì đã lập trình — Đừng bao giờ bỏ quên Kiểm thử thăm dò của con người!"
  },
  {
    id: "q6_09",
    chapter: 6,
    section: "6.2",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Trước khi lựa chọn một công cụ kiểm thử tự động thương mại cho tổ chức, tại sao cần đánh giá sự ổn định của nhà cung cấp (vendor), mô hình cấp phép và khả năng tương thích kỹ thuật với nền tảng công nghệ hiện tại?",
    options: [
      "A. Để giảm thiểu rủi ro chọn nhầm công cụ không tích hợp được với hệ thống hoặc bị ngừng hỗ trợ nếu nhà cung cấp giải thể",
      "B. Vì ISTQB bắt buộc mọi công cụ kiểm thử phải được viết bằng ngôn ngữ COBOL",
      "C. Để đảm bảo công cụ có thể thay thế hoàn toàn vai trò của quản lý dự án",
      "D. Vì các công cụ mã nguồn mở bị cấm sử dụng trong các dự án Agile"
    ],
    correct: 0,
    explanation: "Chọn một công cụ không tương thích với nền tảng phát triển, không đáp ứng tiêu chuẩn hoặc phụ thuộc vào nhà cung cấp kém ổn định (vendor lock-in / ngừng hỗ trợ) là rủi ro chiến lược lớn trong tự động hóa kiểm thử.",
    mnemonic: "Kiểm tra tính Tương thích công nghệ + Uy tín nhà cung cấp trước khi chọn mua Công cụ."
  },
  {
    id: "q6_10",
    chapter: 6,
    section: "6.1-6.2",
    kLevel: "K2",
    difficulty: "easy",
    scenario: "Hoạt động kiểm thử nào sau đây gần như KHÔNG THỂ thực hiện hiệu quả nếu KHÔNG CÓ công cụ kiểm thử chuyên dụng?",
    options: [
      "A. Rà soát thẻ User Story trong buổi làm mịn backlog",
      "B. Đo độ trễ mạng ở mức mili-giây dưới tải giả lập 50.000 yêu cầu API đồng thời",
      "C. Thực hiện buổi đọc duyệt (walkthrough) không chính thức cho tài liệu yêu cầu",
      "D. Chạy một ca kiểm thử đăng nhập hợp lệ đơn lẻ trên trình duyệt máy tính"
    ],
    correct: 1,
    explanation: "Việc tạo ra tải hàng chục ngàn người dùng ảo đồng thời và đo lường thông số hiệu năng chính xác tới từng mili-giây là lợi ích tiêu biểu của công cụ kiểm thử đối với những việc con người không thể làm thủ công.",
    mnemonic: "Giả lập tải đồng thời cực lớn & Đo độ trễ mili-giây bắt buộc phải có Công cụ."
  }
];


window.CTFL_FLASHCARDS_456 = [
  {
    id: "fc4_01",
    chapter: 4,
    section: "4.1",
    term: "Ba Nhóm Kỹ thuật Kiểm thử (Black-box, White-box, Experience-based)",
    definition: "1. Hộp đen (Black-box / Specification-based): Dựa trên tài liệu đặc tả và hành vi bên ngoài, không nhìn vào code. 2. Hộp trắng (White-box / Structure-based): Dựa trên cấu trúc mã nguồn, nhánh lệnh và kiến trúc bên trong. 3. Dựa trên kinh nghiệm (Experience-based): Tận dụng kiến thức, trực giác và kinh nghiệm của Tester về các lỗi thường gặp.",
    memoryHook: "Hộp đen = Nhìn Đặc tả; Hộp trắng = Soi Code; Kinh nghiệm = Trực giác săn lỗi!"
  },
  {
    id: "fc4_02",
    chapter: 4,
    section: "4.2.1",
    term: "Phân vùng Tương đương (Equivalence Partitioning - EP)",
    definition: "Chia miền dữ liệu đầu vào/đầu ra thành các phân vùng hợp lệ (Valid EP) và không hợp lệ (Invalid EP) sao cho mọi giá trị trong cùng một phân vùng được hệ thống xử lý giống nhau. Để đạt 100% độ bao phủ EP, cần kiểm thử ít nhất 1 giá trị đại diện cho mỗi phân vùng.",
    memoryHook: "1 Vùng = 1 Đại diện; Kiểm thử các vùng Không hợp lệ (Invalid EP) phải TÁCH RIÊNG từng cái để tránh che khuất lỗi (Defect Masking)!"
  },
  {
    id: "fc4_03",
    chapter: 4,
    section: "4.2.2",
    term: "Phân tích Giá trị Biên 2 giá trị (2-Value BVA)",
    definition: "Với mỗi điểm biên của một phân vùng số hoặc thứ tự, kiểm thử 2 điểm: chính giá trị biên (Boundary) và giá trị lân cận gần nhất thuộc phân vùng kế tiếp (theo đơn vị bước nhảy nhỏ nhất). Ví dụ vùng hợp lệ [10..20] số nguyên -> kiểm thử {9, 10, 20, 21}.",
    memoryHook: "BVA 2 giá trị cho biên X = {Sát ngoài biên, Chính tại biên} -> Khoảng [A, B] lấy 4 số: A-1, A, B, B+1!"
  },
  {
    id: "fc4_04",
    chapter: 4,
    section: "4.2.2",
    term: "Phân tích Giá trị Biên 3 giá trị (3-Value BVA)",
    definition: "Với mỗi điểm biên, kiểm thử đủ 3 điểm: chính giá trị biên và CẢ HAI giá trị lân cận hai bên biên (1 trong phân vùng, 1 ngoài phân vùng). Ví dụ vùng hợp lệ [10..20] số nguyên -> biên 10 lấy {9, 10, 11}; biên 20 lấy {19, 20, 21} -> tổng 6 giá trị.",
    memoryHook: "BVA 3 giá trị cho biên X = {X - 1, X, X + 1} -> Khoảng [A, B] lấy 6 số: A-1, A, A+1 và B-1, B, B+1!"
  },
  {
    id: "fc4_05",
    chapter: 4,
    section: "4.2.3",
    term: "Kiểm thử Bảng Quyết định (Decision Table Testing)",
    definition: "Mô hình hóa logic nghiệp vụ phức tạp bằng bảng gồm các Điều kiện (Conditions: T/F hoặc giá trị) và Hành động (Actions: X/-). Với N điều kiện Boolean độc lập có 2^N quy tắc (cột). Bảng rút gọn dùng ký hiệu '-' (Don't care) hoặc 'N/A' và loại bỏ các cột bất khả thi.",
    memoryHook: "Mỗi Cột Khả Thi trong Bảng quyết định = 1 Ca kiểm thử (Test Case) để đạt 100% độ bao phủ!"
  },
  {
    id: "fc4_06",
    chapter: 4,
    section: "4.2.4",
    term: "Kiểm thử Chuyển đổi Trạng thái (State Transition Testing)",
    definition: "Mô hình hóa hệ thống gồm Trạng thái (States), Sự kiện (Events), Điều kiện canh giữ (Guard conditions) và Hành động (Actions). 3 tiêu chí bao phủ: All States (yếu nhất), Valid Transitions / 0-switch (phổ biến nhất), và All Transitions (mạnh nhất, gồm cả chuyển đổi hợp lệ và không hợp lệ từ bảng trạng thái).",
    memoryHook: "Độ mạnh tăng dần: All States < Valid Transitions (0-switch) < All Transitions (Valid + Invalid)!"
  },
  {
    id: "fc4_07",
    chapter: 4,
    section: "4.3.1",
    term: "Kiểm thử và Độ bao phủ Câu lệnh (Statement Testing & Coverage)",
    definition: "Kỹ thuật hộp trắng thiết kế test để thực thi các câu lệnh thực thi được (executable statements) trong mã nguồn. Độ bao phủ = (Số câu lệnh đã chạy / Tổng số câu lệnh thực thi được) × 100%. Phát hiện được mã chết (dead code) nhưng có thể bỏ sót trường hợp rẽ nhánh False rỗng.",
    memoryHook: "Lệnh IF không có ELSE chỉ cần 1 test (nhánh True) là đạt 100% Statement Coverage!"
  },
  {
    id: "fc4_08",
    chapter: 4,
    section: "4.3.2",
    term: "Kiểm thử và Độ bao phủ Nhánh (Branch Testing & Coverage)",
    definition: "Kỹ thuật hộp trắng yêu cầu thực thi cả các nhánh vô điều kiện và có điều kiện (cả kết quả True và False của mọi điểm quyết định IF, WHILE, SWITCH). 100% Độ bao phủ Nhánh luôn bao hàm (subsumes) 100% Độ bao phủ Câu lệnh, nhưng chiều ngược lại KHÔNG đúng.",
    memoryHook: "100% Branch Coverage => Chắc chắn đạt 100% Statement Coverage (cần đi qua cả nhánh True và False)!"
  },
  {
    id: "fc4_09",
    chapter: 4,
    section: "4.4",
    term: "Đoán lỗi, Kiểm thử Thăm dò & Kiểm thử dựa trên Danh mục (Experience-based)",
    definition: "1. Error Guessing: Dự đoán lỗi từ quá khứ và lập Danh sách tấn công lỗi (Fault Attack). 2. Exploratory Testing: Học + Thiết kế + Thực thi đồng thời trong khung thời gian cố định (Time-boxed Session-based) theo Bản điều lệ (Test Charter). 3. Checklist-based: Kiểm tra theo danh mục kinh nghiệm.",
    memoryHook: "Error Guessing = Fault Attack; Exploratory = Test Charter + Time-boxed; Checklist = Danh mục gạch đầu dòng!"
  },
  {
    id: "fc4_10",
    chapter: 4,
    section: "4.5",
    term: "3C, INVEST & Tiêu chí Chấp nhận (Collaborative User Story & Acceptance Criteria)",
    definition: "3C của User Story: Card (Thẻ), Conversation (Trò chuyện), Confirmation (Tiêu chí chấp nhận). INVEST: Independent, Negotiable, Valuable, Estimable, Small, Testable. Hai định dạng viết Tiêu chí chấp nhận (AC): Hướng kịch bản (Given/When/Then) và Hướng quy tắc (Rule-oriented).",
    memoryHook: "User Story chuẩn = 3C + INVEST + Acceptance Criteria (Kịch bản Given/When/Then hoặc Danh sách Quy tắc)!"
  },
  {
    id: "fc5_01",
    chapter: 5,
    section: "5.1.3",
    term: "Tiêu chí Bắt đầu & Tiêu chí Kết thúc (Entry Criteria vs Exit Criteria)",
    definition: "Entry Criteria (trong Agile gọi là Definition of Ready - DoR): Điều kiện tiên quyết để bắt đầu một hoạt động kiểm thử. Exit Criteria (trong Agile gọi là Definition of Done - DoD): Điều kiện phải đạt được để tuyên bố hoàn thành một cấp độ kiểm thử hoặc bản phát hành.",
    memoryHook: "Entry Criteria = DoR (Đủ điều kiện Bắt đầu); Exit Criteria = DoD (Đủ điều kiện Hoàn thành)!"
  },
  {
    id: "fc5_02",
    chapter: 5,
    section: "5.1.4",
    term: "4 Kỹ thuật Ước lượng Kiểm thử & Công thức Ước lượng 3 điểm (3-Point Estimation)",
    definition: "4 kỹ thuật: Ước lượng theo tỷ lệ (Ratios), Ngoại suy (Extrapolation), Wideband Delphi (Planning Poker) và Ước lượng 3 điểm. Công thức 3 điểm với O (Lạc quan), M (Khả dĩ nhất), P (Bi quan): Giá trị ước lượng E = (O + 4×M + P) / 6; Độ lệch chuẩn SD = (P - O) / 6.",
    memoryHook: "Công thức vàng K3: E = (O + 4M + P) / 6 và SD = (P - O) / 6 (Khoảng tin cậy = E ± SD)!"
  },
  {
    id: "fc5_03",
    chapter: 5,
    section: "5.1.5",
    term: "3 Chiến lược Sắp xếp Thứ tự Ưu tiên Ca kiểm thử (Test Case Prioritization)",
    definition: "1. Dựa trên rủi ro (Risk-based): Chạy test cho các rủi ro nghiêm trọng nhất trước. 2. Dựa trên độ bao phủ (Coverage-based): Chạy test bao phủ nhiều mã nguồn/điều kiện nhất trước (hoặc độ bao phủ bổ sung). 3. Dựa trên yêu cầu (Requirements-based): Chạy test cho yêu cầu ưu tiên cao nhất của stakeholder trước.",
    memoryHook: "Lưu ý bẫy K3: Dù ưu tiên theo Rủi ro/Bao phủ/Yêu cầu thì vẫn phải tuân thủ Phụ thuộc kỹ thuật (Dependencies)!"
  },
  {
    id: "fc5_04",
    chapter: 5,
    section: "5.1.6 & 5.1.7",
    term: "Kim tự tháp Kiểm thử & Góc phần tư Kiểm thử (Test Pyramid & Testing Quadrants)",
    definition: "Test Pyramid: Đáy rộng (Unit test nhanh, cô lập) -> Giữa (Integration/API) -> Đỉnh hẹp (End-to-End UI chậm). 4 Góc phần tư: Q1 (Hướng công nghệ, Hỗ trợ nhóm: Unit/Component test), Q2 (Hướng nghiệp vụ, Hỗ trợ nhóm: Functional, BDD), Q3 (Hướng nghiệp vụ, Phê bình sản phẩm: Exploratory, UAT), Q4 (Hướng công nghệ, Phê bình sản phẩm: Performance, Security).",
    memoryHook: "Q1 = Unit; Q2 = Functional/BDD; Q3 = Exploratory/UAT; Q4 = Performance/Security!"
  },
  {
    id: "fc5_05",
    chapter: 5,
    section: "5.2.1 & 5.2.2",
    term: "Định nghĩa Rủi ro & Phân biệt Rủi ro Dự án vs Rủi ro Sản phẩm",
    definition: "Mức độ rủi ro (Risk Level) = Khả năng xảy ra (Likelihood) × Tác động (Impact). Rủi ro Dự án (Project Risk): Ảnh hưởng đến lịch trình, ngân sách, nhân sự, môi trường của dự án. Rủi ro Sản phẩm (Product Risk): Ảnh hưởng trực tiếp đến đặc tính chất lượng của phần mềm (lỗi tính toán, chậm, mất an toàn).",
    memoryHook: "Project Risk = Trễ hạn/Thiếu người/Môi trường hỏng; Product Risk = Phần mềm chạy sai/Chậm/Lộ bảo mật!"
  },
  {
    id: "fc5_06",
    chapter: 5,
    section: "5.2.3 & 5.2.4",
    term: "Phân tích Rủi ro vs Kiểm soát Rủi ro (Risk Analysis vs Risk Control)",
    definition: "Phân tích rủi ro gồm: Nhận diện rủi ro (Risk Identification) + Đánh giá rủi ro (Risk Assessment). Kiểm soát rủi ro gồm: Giảm thiểu rủi ro (Risk Mitigation - điển hình là thực hiện kiểm thử) + Giám sát rủi ro (Risk Monitoring). Ngoài ra còn có Chuyển giao, Chấp nhận hoặc Lập kế hoạch dự phòng.",
    memoryHook: "Kiểm thử phần mềm chính là hình thức chủ lực của Giảm thiểu rủi ro sản phẩm (Risk Mitigation)!"
  },
  {
    id: "fc5_07",
    chapter: 5,
    section: "5.3",
    term: "Giám sát Kiểm thử, Kiểm soát Kiểm thử & Hoàn tất Kiểm thử",
    definition: "Test Monitoring: Thu thập số liệu và theo dõi tiến độ so với kế hoạch. Test Control: Đưa ra chỉ đạo, hành động điều chỉnh (phân bổ lại nguồn lực, đổi thứ tự ưu tiên) dựa trên dữ liệu giám sát. Test Completion: Lưu trữ testware, tổng kết bài học kinh nghiệm và viết Báo cáo hoàn tất kiểm thử khi đạt Exit Criteria.",
    memoryHook: "Monitoring = Đo đạc & Quan sát; Control = Ra quyết định & Điều hướng lại; Completion = Tổng kết & Lưu trữ!"
  },
  {
    id: "fc5_08",
    chapter: 5,
    section: "5.4 & 5.5",
    term: "Quản lý Cấu hình (CM) & Quản lý Lỗi (Defect Management)",
    definition: "CM đảm bảo mọi hạng mục cấu hình, testware và môi trường đều được định danh duy nhất, quản lý phiên bản và gắn với đường cơ sở (baseline) để tái lập kiểm thử. Quản lý lỗi theo dõi vòng đời điểm bất thường từ lúc ghi nhận (kèm bước tái hiện, môi trường, log, kết quả thực tế vs mong đợi) đến khi kiểm thử xác nhận và đóng.",
    memoryHook: "CM = Phiên bản + Baseline để tái lập test; Báo cáo lỗi tốt = Bước tái hiện + Môi trường + Thực tế vs Mong đợi + Bằng chứng!"
  },
  {
    id: "fc6_01",
    chapter: 6,
    section: "6.1",
    term: "Công cụ Quản lý Kiểm thử & Công cụ Kiểm thử Tĩnh",
    definition: "Công cụ Quản lý kiểm thử (Test Management): Quản lý ca kiểm thử, lịch chạy, theo dõi lỗi, truy vết yêu cầu và xuất báo cáo số liệu. Công cụ Kiểm thử tĩnh (Static Testing): Hỗ trợ rà soát và quét phân tích mã tĩnh (coding standards, dead code, độ phức tạp Cyclomatic) mà không cần chạy phần mềm.",
    memoryHook: "Management Tool = Quản lý Test + Lỗi + Truy vết; Static Tool = Quét code không cần chạy!"
  },
  {
    id: "fc6_02",
    chapter: 6,
    section: "6.1",
    term: "Công cụ Thiết kế/Triển khai vs Công cụ Thực thi/Độ bao phủ",
    definition: "Công cụ Thiết kế & Triển khai: Sinh ca kiểm thử từ mô hình, chuẩn bị dữ liệu kiểm thử và ẩn danh hóa dữ liệu nhạy cảm (data masking/anonymization). Công cụ Thực thi & Độ bao phủ: Tự động chạy kịch bản kiểm thử hồi quy, so sánh kết quả và đo độ bao phủ câu lệnh/nhánh.",
    memoryHook: "Chuẩn bị & Ẩn danh dữ liệu (Data Masking) = Công cụ Thiết kế & Triển khai kiểm thử!"
  },
  {
    id: "fc6_03",
    chapter: 6,
    section: "6.1",
    term: "Công cụ Kiểm thử Phi chức năng (Non-functional Testing Tools)",
    definition: "Cho phép kiểm thử viên thực hiện các phép đo và giả lập mà con người không thể làm thủ công bằng tay: tạo tải hàng chục ngàn người dùng ảo đồng thời (load/stress testing), đo thời gian phản hồi mức mili-giây, giám sát tài nguyên máy chủ và quét lỗ hổng bảo mật.",
    memoryHook: "Giả lập hàng ngàn user đồng thời + Đo hiệu năng mili-giây = Bắt buộc dùng Công cụ Phi chức năng!"
  },
  {
    id: "fc6_04",
    chapter: 6,
    section: "6.2",
    term: "Lợi ích cốt lõi của Tự động hóa Thực thi Kiểm thử",
    definition: "Tiết kiệm thời gian cho các công việc lặp đi lặp lại (đặc biệt là kiểm thử hồi quy), đảm bảo tính nhất quán và khả năng lặp lại tuyệt đối (tránh sai sót chủ quan của con người), đánh giá khách quan các chỉ số độ bao phủ và phản hồi cực nhanh trên đường ống CI/CD.",
    memoryHook: "Lợi ích Automation = Nhanh + Nhất quán + Không mệt mỏi khi chạy Hồi quy trên CI/CD!"
  },
  {
    id: "fc6_05",
    chapter: 6,
    section: "6.2",
    term: "Rủi ro về Kỳ vọng Phi thực tế & Chi phí Bảo trì Kịch bản Tự động",
    definition: "Cạm bẫy phổ biến nhất khi áp dụng tự động hóa là kỳ vọng phi thực tế vào công cụ và đánh giá quá thấp thời gian, chi phí, kỹ năng kỹ thuật cần thiết để xây dựng ban đầu cũng như bảo trì liên tục bộ kịch bản kiểm thử khi giao diện/nghiệp vụ phần mềm thay đổi.",
    memoryHook: "Bẫy số 1 của Automation: Đánh giá thấp chi phí và công sức BẢO TRÌ kịch bản test!"
  },
  {
    id: "fc6_06",
    chapter: 6,
    section: "6.2",
    term: "Rủi ro Phụ thuộc Quá mức vào Công cụ & Rủi ro Nhà cung cấp",
    definition: "Phụ thuộc quá mức vào công cụ (over-reliance on the tool) khiến nhóm bỏ bê tư duy phản biện và kiểm thử thăm dò thủ công của con người. Ngoài ra cần đánh giá kỹ tính tương thích kỹ thuật, giấy phép nguồn mở và sự ổn định của nhà cung cấp (vendor) trước khi chọn công cụ.",
    memoryHook: "Automation chỉ kiểm tra đúng những gì được lập trình sẵn — Không bao giờ thay thế hoàn toàn Kiểm thử thăm dò của con người!"
  }
];
