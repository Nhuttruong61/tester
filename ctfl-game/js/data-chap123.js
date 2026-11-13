// ISTQB CTFL v4.0.1 - Chapters 1, 2, 3 Data Bank
window.CTFL_CHAPTERS_123 = [
  {
    id: 1,
    code: "CHAP-01",
    title: "Cơ bản về Kiểm thử (Fundamentals of Testing)",
    bossName: "NullPointer Overlord",
    bossTitle: "Trùm Lỗi Nhận Thức & 7 Nguyên Lý",
    bossIcon: "B-01",
    examWeight: 8,
    kLevels: ["K1", "K2"],
    summary: "Bản chất kiểm thử, phân biệt Testing vs Debugging & QA vs QC, chuỗi Error-Defect-Failure, 7 nguyên lý kiểm thử, quy trình kiểm thử, testware và kỹ năng thiết yếu.",
    cheatSheet: [
      {
        section: "1.1",
        title: "Kiểm thử là gì & Testing vs Debugging",
        points: [
          "Kiểm thử gồm cả tĩnh (Static - không chạy code) và động (Dynamic - chạy code), bao gồm cả Xác minh (Verification - đúng đặc tả) và Thẩm định (Validation - đúng nhu cầu người dùng).",
          "Testing kích hoạt Failure (động) hoặc tìm trực tiếp Defect (tĩnh); Debugging là hoạt động của Dev nhằm tái hiện, chẩn đoán (tìm Defect) và sửa lỗi."
        ]
      },
      {
        section: "1.2",
        title: "Tại sao cần Kiểm thử, QA vs QC & Chuỗi Lỗi",
        points: [
          "Testing là hình thức Kiểm soát chất lượng (QC - hướng sản phẩm, khắc phục); QA là Đảm bảo chất lượng (hướng quy trình, phòng ngừa).",
          "Chuỗi nhân quả: Root Cause (Nguyên nhân gốc rễ) -> Error/Mistake (Sai sót con người) -> Defect/Bug/Fault (Khiếm khuyết trong code/tài liệu) -> Failure (Hỏng hóc khi vận hành)."
        ]
      },
      {
        section: "1.3",
        title: "7 Nguyên lý Kiểm thử (7 Testing Principles)",
        points: [
          "1. Kiểm thử chứng minh sự hiện diện của lỗi, không chứng minh không có lỗi. 2. Không thể kiểm thử vét cạn (Exhaustive testing is impossible).",
          "3. Kiểm thử sớm (Early testing) tiết kiệm thời gian & chi phí. 4. Sự phân cụm lỗi (Defects cluster together - quy luật Pareto 80/20).",
          "5. Nghịch lý thuốc trừ sâu (Tests wear out). 6. Kiểm thử phụ thuộc ngữ cảnh (Context dependent). 7. Ảo tưởng không có lỗi (Absence-of-defects fallacy)."
        ]
      },
      {
        section: "1.4",
        title: "Hoạt động Kiểm thử, Testware, Truy vết & Vai trò",
        points: [
          "Hoạt động: Lập kế hoạch (Planning) -> Giám sát & Kiểm soát (Monitoring & Control) -> Phân tích (Analysis - Test What) -> Thiết kế (Design - Test How) -> Triển khai (Implementation) -> Thực thi (Execution) -> Hoàn tất (Completion).",
          "Hai vai trò chính: Quản lý kiểm thử (Test Management) và Kiểm thử viên (Testing Role); Truy vết (Traceability) giúp đánh giá độ bao phủ và tác động thay đổi."
        ]
      },
      {
        section: "1.5",
        title: "Kỹ năng Thiết yếu, Toàn nhóm & Tính Độc lập",
        points: [
          "Cách tiếp cận toàn nhóm (Whole-team approach): Mọi thành viên cùng chịu trách nhiệm chất lượng, tăng cộng tác trong Agile.",
          "Độc lập kiểm thử (Independence): Tự tác giả -> Đồng nghiệp cùng nhóm -> Nhóm test độc lập trong tổ chức -> Đơn vị bên ngoài. Độc lập cao giúp phát hiện lỗi khách quan nhưng dễ gây cô lập."
        ]
      }
    ]
  },
  {
    id: 2,
    code: "CHAP-02",
    title: "Kiểm thử trong Vòng đời Phát triển Phần mềm (Testing Throughout the SDLC)",
    bossName: "Pipeline Phantom",
    bossTitle: "Bóng Ma Vòng Đời & Hồi Quy",
    bossIcon: "B-02",
    bossColor: "#06B6D4",
    examWeight: 6,
    kLevels: ["K1", "K2"],
    summary: "Tác động của SDLC lên kiểm thử, Shift-Left, TDD/ATDD/BDD, DevOps & CI/CD, 4 cấp độ kiểm thử, 4 loại kiểm thử, Confirmation vs Regression và Kiểm thử bảo trì.",
    cheatSheet: [
      {
        section: "2.1",
        title: "Kiểm thử trong bối cảnh SDLC, Shift-Left & DevOps",
        points: [
          "Mô hình tuần tự (Waterfall, V-Model): phân tích/thiết kế test sớm nhưng thực thi muộn. Mô hình lặp/tăng trưởng (Agile, Scrum, Kanban): phản hồi nhanh, kiểm thử liên tục mỗi vòng lặp.",
          "Test-First (TDD, ATDD, BDD) và Shift-Left: đưa hoạt động kiểm thử về sớm nhất có thể. DevOps & CI/CD tự động hóa build, deploy và regression test nhưng vẫn cần kiểm thử thủ công/thăm dò."
        ]
      },
      {
        section: "2.1.5",
        title: "Họp Cải tiến (Retrospectives)",
        points: [
          "Tổ chức cuối mỗi vòng lặp/cột mốc để nhìn lại: Điều gì thành công? Điều gì chưa tốt? Cần cải tiến gì trong quy trình kiểm thử và phát triển?"
        ]
      },
      {
        section: "2.2",
        title: "4 Cấp độ & 4 Loại Kiểm thử",
        points: [
          "4 Cấp độ (Test Levels): Component/Unit -> Component Integration -> System -> System Integration -> Acceptance (UAT, Operational, Contractual/Regulatory, Alpha/Beta).",
          "4 Loại (Test Types): Functional (Chức năng - làm gì), Non-functional (Phi chức năng - làm tốt thế nào: hiệu năng, bảo mật, khả dụng), Black-box (Hộp đen), White-box (Hộp trắng)."
        ]
      },
      {
        section: "2.2.3",
        title: "Kiểm thử Xác nhận (Confirmation) vs Hồi quy (Regression)",
        points: [
          "Confirmation Testing (Re-testing): Chạy lại test case đã fail để xác nhận Defect đã được sửa thành công.",
          "Regression Testing: Chạy test trên các phần không sửa để đảm bảo thay đổi không gây tác dụng phụ (side effects) ngoài ý muốn; là ứng viên số 1 cho tự động hóa."
        ]
      },
      {
        section: "2.3",
        title: "Kiểm thử Bảo trì (Maintenance Testing)",
        points: [
          "3 yếu tố kích hoạt (Triggers): Sửa đổi/Nâng cấp (Modification), Di chuyển/Chuyển đổi môi trường (Migration), và Ngừng hoạt động/Nghỉ hưu hệ thống (Retirement - kiểm thử lưu trữ/khôi phục dữ liệu).",
          "Phạm vi bảo trì phụ thuộc: Mức độ thay đổi, Kích thước hệ thống hiện có, và Mức độ rủi ro."
        ]
      }
    ]
  },
  {
    id: 3,
    code: "CHAP-03",
    title: "Kiểm thử Tĩnh (Static Testing)",
    bossName: "Syntax Inquisitor",
    bossTitle: "Phán Quan Kiểm Duyệt Tĩnh",
    bossIcon: "B-03",
    examWeight: 4,
    kLevels: ["K1", "K2"],
    summary: "Cơ bản về kiểm thử tĩnh, phân biệt kiểm thử tĩnh và động, quy trình duyệt (Review Process), các vai trò trong buổi duyệt và 4 loại hình duyệt (Informal, Walkthrough, Technical, Inspection).",
    cheatSheet: [
      {
        section: "3.1",
        title: "Kiểm thử Tĩnh vs Kiểm thử Động",
        points: [
          "Kiểm thử tĩnh đánh giá hầu hết mọi sản phẩm công việc đọc hiểu được (Yêu cầu, User Story, Thiết kế, Code, Test Plan) mà KHÔNG cần chạy phần mềm (trừ mã thực thi nhị phân hoặc mã bên thứ 3 bị mã hóa).",
          "Kiểm thử tĩnh tìm trực tiếp Khiếm khuyết (Defects) sớm với chi phí thấp, đánh giá được tính dễ bảo trì; Kiểm thử động kích hoạt Hỏng hóc (Failures) khi thực thi."
        ]
      },
      {
        section: "3.2.1",
        title: "Lợi ích Phản hồi Sớm của Stakeholder & Quy trình Review",
        points: [
          "Phản hồi sớm và thường xuyên từ các bên liên quan (Stakeholders) tránh hiểu lầm yêu cầu, giảm làm lại (rework).",
          "5 bước Quy trình Duyệt chính thức: 1. Lập kế hoạch (Planning) -> 2. Khởi động (Review Initiation) -> 3. Duyệt cá nhân (Individual Review) -> 4. Giao tiếp & Phân tích (Communication & Analysis) -> 5. Sửa lỗi & Báo cáo (Fixing & Reporting)."
        ]
      },
      {
        section: "3.2.3",
        title: "Các Vai trò trong Buổi Duyệt (Review Roles)",
        points: [
          "Manager (Quản lý): Quyết định duyệt gì, cấp nguồn lực/thời gian. Author (Tác giả): Tạo và sửa sản phẩm công việc.",
          "Moderator/Facilitator (Điều phối viên): Đảm bảo buổi họp hiệu quả, quản lý thời gian, tạo môi trường an toàn. Scribe/Recorder (Thư ký): Ghi nhận lỗi và quyết định. Reviewer (Người duyệt): Tìm điểm bất thường. Review Leader (Trưởng nhóm duyệt): Chịu trách nhiệm tổng thể."
        ]
      },
      {
        section: "3.2.4",
        title: "4 Loại hình Duyệt (Review Types) & Yếu tố Thành công",
        points: [
          "1. Duyệt không chính thức (Informal Review): Không theo quy trình cứng, tìm lỗi nhanh. 2. Walkthrough (Duyệt dẫn dắt): Do Author chủ trì dẫn dắt để chia sẻ kiến thức, đánh giá chất lượng.",
          "3. Technical Review (Duyệt kỹ thuật): Đạt đồng thuận kỹ thuật, do Moderator điều phối. 4. Inspection (Thanh tra): Chính thức nhất, Author KHÔNG được làm Review Leader/Moderator/Scribe, thu thập số liệu (metrics) để cải tiến quy trình."
        ]
      }
    ]
  }
];

window.CTFL_QUESTIONS_123 = [
  {
    id: "q1_01",
    chapter: 1,
    section: "1.1.1",
    kLevel: "K1",
    difficulty: "easy",
    scenario: "Theo ISTQB CTFL v4.0.1, mục tiêu nào sau đây là mục tiêu kiểm thử (test objective) hợp lệ?",
    options: [
      "A. Chứng minh rằng hệ thống phần mềm hoàn toàn không còn khiếm khuyết trước khi phát hành",
      "B. Tìm ra nguyên nhân gốc rễ và trực tiếp sửa các khiếm khuyết trong mã nguồn",
      "C. Đánh giá các sản phẩm công việc như yêu cầu, thiết kế, mã nguồn và giảm mức độ rủi ro về chất lượng",
      "D. Loại bỏ hoàn toàn nhu cầu thẩm định (validation) từ phía người dùng cuối"
    ],
    correct: 2,
    explanation: "Mục 1.1.1 nêu rõ mục tiêu kiểm thử bao gồm đánh giá các sản phẩm công việc (requirements, user stories, design, code) và giảm rủi ro chất lượng. A sai với Nguyên lý 1; B là công việc của Debugging.",
    mnemonic: "Test = Đánh giá sản phẩm + Tìm lỗi + Giảm rủi ro + Cung cấp thông tin!"
  },
  {
    id: "q1_02",
    chapter: 1,
    section: "1.1.2",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Phát biểu nào sau đây phân biệt ĐÚNG giữa kiểm thử (testing) và gỡ lỗi (debugging)?",
    options: [
      "A. Kiểm thử động tìm ra nguyên nhân của hỏng hóc, còn gỡ lỗi chỉ kiểm tra xem bản sửa lỗi đã hoạt động chưa",
      "B. Kiểm thử kích hoạt hỏng hóc (động) hoặc tìm khiếm khuyết (tĩnh), còn gỡ lỗi chẩn đoán nguyên nhân và loại bỏ khiếm khuyết",
      "C. Kiểm thử tĩnh gây ra các hỏng hóc khi chạy hệ thống, còn gỡ lỗi tái hiện lại các hỏng hóc đó",
      "D. Gỡ lỗi là một phần của hoạt động thực thi kiểm thử (test execution) do kiểm thử viên độc lập thực hiện"
    ],
    correct: 1,
    explanation: "Theo mục 1.1.2, kiểm thử động kích hoạt hỏng hóc (failures) và kiểm thử tĩnh tìm trực tiếp khiếm khuyết (defects). Gỡ lỗi (debugging) bao gồm tái hiện hỏng hóc, chẩn đoán tìm defect và sửa defect.",
    mnemonic: "Testing = Tìm/Kích hoạt lỗi; Debugging = Chẩn đoán + Sửa code!"
  },
  {
    id: "q1_03",
    chapter: 1,
    section: "1.1",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Một ứng dụng ngân hàng vượt qua toàn bộ các bài kiểm thử theo đúng đặc tả kỹ thuật, nhưng khách hàng phàn nàn rằng quy trình chuyển tiền quá rườm rà và không giải quyết được nhu cầu thanh toán nhanh của họ. Hoạt động nào chưa đạt yêu cầu?",
    options: [
      "A. Xác minh (Verification) chưa đạt, nhưng Thẩm định (Validation) đã đạt",
      "B. Thẩm định (Validation) chưa đạt mặc dù Xác minh (Verification) đã đạt",
      "C. Gỡ lỗi (Debugging) chưa được thực hiện đầy đủ bởi lập trình viên",
      "D. Kiểm thử xác nhận (Confirmation testing) bị bỏ sót trong giai đoạn hệ thống"
    ],
    correct: 1,
    explanation: "Verification kiểm tra xem hệ thống có đáp ứng đúng các yêu cầu đã quy định hay không, trong khi Validation kiểm tra xem hệ thống có đáp ứng đúng nhu cầu thực tế của người dùng và các bên liên quan hay không.",
    mnemonic: "Verification = Làm đúng theo tài liệu; Validation = Làm đúng thứ user cần!"
  },
  {
    id: "q1_04",
    chapter: 1,
    section: "1.2.1",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Kiểm thử đóng góp vào sự thành công của dự án theo cách TRỰC TIẾP (directly) và GIÁN TIẾP (indirectly) như thế nào?",
    options: [
      "A. Trực tiếp sửa lỗi trong mã nguồn và gián tiếp viết lại tài liệu yêu cầu",
      "B. Gián tiếp giúp tạo ra đối tượng kiểm thử chất lượng cao hơn (nhờ phát hiện lỗi để gỡ bỏ) và trực tiếp đánh giá chất lượng ở các giai đoạn SDLC",
      "C. Trực tiếp thay thế hoàn toàn sự tham gia của người dùng và gián tiếp quản lý ngân sách dự án",
      "D. Gián tiếp cung cấp số liệu cho quyết định phát hành và trực tiếp lập trình tính năng mới"
    ],
    correct: 1,
    explanation: "Theo mục 1.2.1, kiểm thử phát hiện defect để từ đó gỡ lỗi loại bỏ chúng (gián tiếp nâng cao chất lượng) và trực tiếp đo lường/đánh giá chất lượng đối tượng kiểm thử phục vụ quyết định quản lý (như release).",
    mnemonic: "Gián tiếp nâng chất lượng (nhờ tìm lỗi để sửa); Trực tiếp đánh giá chất lượng!"
  },
  {
    id: "q1_05",
    chapter: 1,
    section: "1.2.2",
    kLevel: "K1",
    difficulty: "easy",
    scenario: "Sự khác biệt cốt lõi giữa Kiểm thử (Testing) và Đảm bảo Chất lượng (Quality Assurance - QA) là gì?",
    options: [
      "A. Kiểm thử là hướng quy trình (process-oriented) và phòng ngừa; QA là hướng sản phẩm (product-oriented) và khắc phục",
      "B. Kiểm thử là một hình thức Kiểm soát chất lượng (QC) hướng sản phẩm, mang tính khắc phục; QA là hướng quy trình, mang tính phòng ngừa",
      "C. Kiểm thử và QA là hai thuật ngữ đồng nghĩa hoàn toàn trong tiêu chuẩn ISTQB",
      "D. QA chỉ áp dụng cho nhóm kiểm thử, còn Kiểm thử là trách nhiệm của riêng ban giám đốc"
    ],
    correct: 1,
    explanation: "Theo mục 1.2.2, Testing là hình thức chính của QC (hướng sản phẩm, khắc phục - corrective), còn QA là hướng quy trình, mang tính phòng ngừa (preventive) và là trách nhiệm của mọi người.",
    mnemonic: "Testing/QC = Sản phẩm & Khắc phục; QA = Quy trình & Phòng ngừa!"
  },
  {
    id: "q1_06",
    chapter: 1,
    section: "1.2.3",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Do áp lực tiến độ bàn giao gấp, lập trình viên hiểu nhầm công thức tính lãi suất và viết sai biểu thức nhân trong hàm `calcInterest()`. Khi khách hàng tất toán sổ tiết kiệm, màn hình hiển thị số tiền lãi bị hụt 10%. Hãy xác định đúng chuỗi thuật ngữ theo ISTQB:",
    options: [
      "A. Áp lực tiến độ = Error; Hiểu nhầm công thức = Defect; Code sai = Failure; Tiền lãi hiển thị sai = Root cause",
      "B. Áp lực tiến độ = Root cause; Hiểu nhầm công thức = Error; Code viết sai = Defect; Tiền lãi hiển thị sai khi chạy = Failure",
      "C. Hiểu nhầm công thức = Root cause; Code viết sai = Error; Tiền lãi hiển thị sai = Defect; Áp lực tiến độ = Failure",
      "D. Code viết sai = Root cause; Tiền lãi hiển thị sai = Error; Khiếu nại khách hàng = Failure"
    ],
    correct: 1,
    explanation: "Theo mục 1.2.3: Áp lực thời gian là Nguyên nhân gốc rễ (Root cause) khiến con người mắc Sai sót (Error/Mistake - hiểu nhầm), tạo ra Khiếm khuyết (Defect/Bug trong code) và khi chạy gây ra Hỏng hóc (Failure - hiển thị sai tiền lãi).",
    mnemonic: "Root Cause -> Error (Người nghĩ sai) -> Defect (Code nằm sai) -> Failure (Chạy ra sai)!"
  },
  {
    id: "q1_07",
    chapter: 1,
    section: "1.3.1",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Nhóm kiểm thử chạy đi chạy lại cùng một bộ 200 kịch bản kiểm thử hồi quy suốt 6 tháng và không tìm thêm được bất kỳ lỗi mới nào ở các bản phát hành gần đây, dù khách hàng vẫn báo lỗi ở các luồng mới. Nguyên lý kiểm thử nào giải thích hiện tượng này?",
    options: [
      "A. Sự phân cụm khiếm khuyết (Defects cluster together)",
      "B. Các bài kiểm thử bị thoái hóa / Nghịch lý thuốc trừ sâu (Tests wear out)",
      "C. Ảo tưởng về sự không có khiếm khuyết (Absence-of-defects fallacy)",
      "D. Kiểm thử sớm (Early testing)"
    ],
    correct: 1,
    explanation: "Nguyên lý 5 (Tests wear out / Pesticide paradox): Lặp lại cùng các bài kiểm thử nhiều lần sẽ mất dần hiệu quả tìm lỗi mới; cần cập nhật hoặc viết thêm test case và test data mới.",
    mnemonic: "Chạy mãi một bộ test không ra lỗi mới = Thuốc trừ sâu nhờn thuốc (Tests wear out)!"
  },
  {
    id: "q1_08",
    chapter: 1,
    section: "1.3.1",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Dựa trên dữ liệu lịch sử, Test Leader nhận thấy 75% lỗi nghiêm trọng tập trung ở 2 mô-đun Thanh toán và Giỏ hàng, nên quyết định phân bổ phần lớn nỗ lực kiểm thử sâu vào 2 mô-đun này. Đây là ứng dụng của nguyên lý nào?",
    options: [
      "A. Không thể kiểm thử vét cạn (Exhaustive testing is impossible)",
      "B. Sự phân cụm khiếm khuyết (Defects cluster together)",
      "C. Kiểm thử chứng minh sự hiện diện của khiếm khuyết (Testing shows the presence of defects)",
      "D. Kiểm thử phụ thuộc vào ngữ cảnh (Testing is context dependent)"
    ],
    correct: 1,
    explanation: "Nguyên lý 4 (Defects cluster together): Một số lượng nhỏ các thành phần hệ thống thường chứa phần lớn các khiếm khuyết được phát hiện (ứng dụng nguyên lý Pareto).",
    mnemonic: "80% lỗi tụ ở 20% module = Phân cụm khiếm khuyết (Defect Clustering)!"
  },
  {
    id: "q1_09",
    chapter: 1,
    section: "1.3.1",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Một sản phẩm thương mại điện tử được kiểm thử kỹ lưỡng và sửa hết 100% lỗi so với tài liệu đặc tả, nhưng khi ra mắt lại thất bại hoàn toàn vì tốc độ tải trang quá chậm và giao diện khó dùng so với đối thủ. Nguyên lý nào cảnh báo điều này?",
    options: [
      "A. Ảo tưởng về sự không có khiếm khuyết (Absence-of-defects fallacy)",
      "B. Không thể kiểm thử vét cạn (Exhaustive testing is impossible)",
      "C. Kiểm thử sớm tiết kiệm thời gian và chi phí (Early testing saves time and money)",
      "D. Các bài kiểm thử bị thoái hóa (Tests wear out)"
    ],
    correct: 0,
    explanation: "Nguyên lý 7 (Absence-of-defects fallacy): Việc xác minh và sửa hết lỗi theo đặc tả không đảm bảo hệ thống thành công nếu nó không đáp ứng nhu cầu thực tế của người dùng hoặc thua kém đối thủ (thiếu Validation).",
    mnemonic: "Hết bug nhưng user không xài = Ảo tưởng không có lỗi (Absence-of-defects fallacy)!"
  },
  {
    id: "q1_10",
    chapter: 1,
    section: "1.4.1",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Trong tiến trình kiểm thử, việc xác định các Điều kiện kiểm thử (Test conditions) để trả lời câu hỏi 'Kiểm thử cái gì?' (What to test) thuộc về hoạt động nào?",
    options: [
      "A. Lập kế hoạch kiểm thử (Test planning)",
      "B. Phân tích kiểm thử (Test analysis)",
      "C. Thiết kế kiểm thử (Test design)",
      "D. Triển khai kiểm thử (Test implementation)"
    ],
    correct: 1,
    explanation: "Theo mục 1.4.1, Phân tích kiểm thử (Test analysis) phân tích cơ sở kiểm thử (test basis) để nhận diện các tính năng cần kiểm thử và định nghĩa các điều kiện kiểm thử (Test conditions - What to test).",
    mnemonic: "Analysis = Test CÁI GÌ (Test Conditions); Design = Test NHƯ THẾ NÀO (Test Cases)!"
  },
  {
    id: "q1_11",
    chapter: 1,
    section: "1.4.1",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Hoạt động nào sau đây được thực hiện trong giai đoạn Thiết kế kiểm thử (Test design)?",
    options: [
      "A. Xác định tiêu chí bắt đầu (entry criteria) và tiêu chí kết thúc (exit criteria) cho dự án",
      "B. Thiết kế các ca kiểm thử (test cases), xác định dữ liệu kiểm thử tiềm năng và thiết kế môi trường kiểm thử",
      "C. Sắp xếp các thủ tục kiểm thử vào lịch trình thực thi và tạo các kịch bản kiểm thử tự động",
      "D. Lưu trữ testware, tổng kết bài học kinh nghiệm và viết báo cáo hoàn tất kiểm thử"
    ],
    correct: 1,
    explanation: "Theo mục 1.4.1, Test design trả lời câu hỏi 'Kiểm thử như thế nào?' bằng cách áp dụng các kỹ thuật kiểm thử để thiết kế test cases, test charters, xác định test data coverage và thiết kế môi trường kiểm thử.",
    mnemonic: "Test Design = Áp dụng kỹ thuật để tạo Test Cases + Thiết kế môi trường!"
  },
  {
    id: "q1_12",
    chapter: 1,
    section: "1.4.1",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Sự khác biệt giữa Giám sát kiểm thử (Test monitoring) và Kiểm soát kiểm thử (Test control) là gì?",
    options: [
      "A. Giám sát là thu thập thông tin và đánh giá tiến độ liên tục; Kiểm soát là sử dụng thông tin đó để đưa ra các hành động điều chỉnh hướng đi",
      "B. Giám sát chỉ diễn ra khi kết thúc dự án; Kiểm soát chỉ diễn ra trước khi bắt đầu dự án",
      "C. Giám sát là việc viết báo cáo lỗi; Kiểm soát là việc gỡ lỗi trong mã nguồn",
      "D. Giám sát do lập trình viên thực hiện; Kiểm soát do khách hàng thực hiện"
    ],
    correct: 0,
    explanation: "Theo mục 1.4.1, Test monitoring liên tục kiểm tra mọi hoạt động kiểm thử và so sánh tiến độ thực tế với kế hoạch; Test control sử dụng thông tin từ giám sát để đưa ra các chỉ đạo/hành động khắc phục nhằm đạt mục tiêu.",
    mnemonic: "Monitoring = Quan sát & Đo đạc; Control = Ra quyết định điều chỉnh lái!"
  },
  {
    id: "q1_13",
    chapter: 1,
    section: "1.4.3",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Sản phẩm kiểm thử (Testware) nào sau đây là đầu ra điển hình của hoạt động Thực thi kiểm thử (Test execution)?",
    options: [
      "A. Kế hoạch kiểm thử (Test plan) và danh mục rủi ro",
      "B. Các điều kiện kiểm thử đã được ưu tiên hóa (Prioritized test conditions)",
      "C. Nhật ký kiểm thử (Test logs) và các báo cáo khiếm khuyết (Defect reports)",
      "D. Các thủ tục kiểm thử (Test procedures) và kịch bản kiểm thử tự động (Automated test scripts)"
    ],
    correct: 2,
    explanation: "Theo mục 1.4.3: Test plan thuộc Test planning; Test conditions thuộc Test analysis; Test procedures & scripts thuộc Test implementation; còn Test logs và Defect reports là sản phẩm đầu ra của Test execution.",
    mnemonic: "Chạy test (Execution) sinh ra Nhật ký (Test logs) và Báo cáo lỗi (Defect reports)!"
  },
  {
    id: "q1_14",
    chapter: 1,
    section: "1.4.4",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Việc thiết lập và duy trì khả năng truy vết hai chiều (traceability) giữa cơ sở kiểm thử (test basis) và các sản phẩm kiểm thử (testware) mang lại giá trị nào sau đây?",
    options: [
      "A. Tự động sửa mọi lỗi biên dịch trong mã nguồn mà không cần lập trình viên",
      "B. Đánh giá chính xác độ bao phủ yêu cầu, xác định tác động của các thay đổi và tính toán rủi ro tồn đọng",
      "C. Thay thế hoàn toàn hoạt động lập kế hoạch kiểm thử và quản lý rủi ro",
      "D. Đảm bảo kiểm thử vét cạn 100% mọi tổ hợp đầu vào của hệ thống"
    ],
    correct: 1,
    explanation: "Theo mục 1.4.4, khả năng truy vết giúp đánh giá độ bao phủ (coverage), phân tích tác động khi yêu cầu thay đổi (impact analysis), hỗ trợ kiểm toán (audits) và đánh giá chất lượng sản phẩm/rủi ro tồn đọng.",
    mnemonic: "Traceability = Đo Coverage + Phân tích tác động thay đổi (Impact Analysis)!"
  },
  {
    id: "q1_15",
    chapter: 1,
    section: "1.4.5",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Theo ISTQB CTFL v4.0.1, nhiệm vụ nào sau đây thuộc về vai trò Quản lý kiểm thử (Test management role) thay vì vai trò Kiểm thử (Testing role)?",
    options: [
      "A. Phân tích cơ sở kiểm thử và thiết kế các ca kiểm thử chi tiết",
      "B. Thực thi các bài kiểm thử và ghi chép kết quả vào nhật ký kiểm thử",
      "C. Lập kế hoạch kiểm thử, giám sát - kiểm soát tiến độ và viết báo cáo hoàn tất kiểm thử",
      "D. Chuẩn bị dữ liệu kiểm thử và viết kịch bản kiểm thử tự động ở cấp độ thành phần"
    ],
    correct: 2,
    explanation: "Theo mục 1.4.5, vai trò Quản lý kiểm thử chịu trách nhiệm tổng thể về tiến trình kiểm thử, đặc biệt là Test planning, Test monitoring & control, và Test completion. Vai trò Kiểm thử tập trung vào kỹ thuật (Analysis, Design, Implementation, Execution).",
    mnemonic: "Test Management = Đầu (Planning) + Giữa (Monitor/Control) + Cuối (Completion)!"
  },
  {
    id: "q1_16",
    chapter: 1,
    section: "1.5.1",
    kLevel: "K2",
    difficulty: "easy",
    scenario: "Khi thông báo một khiếm khuyết nghiêm trọng cho lập trình viên, kỹ năng chung nào giúp kiểm thử viên tránh gây xung đột cá nhân và duy trì sự hợp tác tích cực?",
    options: [
      "A. Giao tiếp mang tính xây dựng, khách quan và tập trung vào sản phẩm thay vì chỉ trích cá nhân",
      "B. Sử dụng quyền phủ quyết để bắt buộc lập trình viên sửa lỗi ngay lập tức mà không cần giải thích",
      "C. Giấu bớt các lỗi nhỏ để lập trình viên cảm thấy vui vẻ hơn trong buổi họp",
      "D. Chỉ giao tiếp qua hệ thống quản lý lỗi và tuyệt đối không trao đổi trực tiếp"
    ],
    correct: 0,
    explanation: "Mục 1.5.1 nhấn mạnh kỹ năng giao tiếp (communication skills), sự thấu cảm và truyền đạt thông tin về lỗi một cách khách quan, mang tính xây dựng để tránh tâm lý phòng thủ (confirmation bias của dev).",
    mnemonic: "Giao tiếp kiểm thử = Khách quan + Xây dựng + Tập trung vào chất lượng chung!"
  },
  {
    id: "q1_17",
    chapter: 1,
    section: "1.5.2",
    kLevel: "K1",
    difficulty: "easy",
    scenario: "Ưu điểm chính của cách tiếp cận toàn nhóm (Whole-team approach) là gì?",
    options: [
      "A. Chỉ có các kiểm thử viên mới được phép thực hiện bất kỳ hoạt động kiểm thử nào",
      "B. Mọi thành viên trong nhóm có kỹ năng cần thiết đều có thể thực hiện nhiệm vụ bất kỳ, cùng chia sẻ trách nhiệm về chất lượng và tăng cường sức mạnh tổng hợp",
      "C. Loại bỏ hoàn toàn nhu cầu kiểm thử chấp nhận của người dùng và đại diện kinh doanh",
      "D. Tách biệt hoàn toàn nhóm kiểm thử sang một tòa nhà khác để tránh giao tiếp với lập trình viên"
    ],
    correct: 1,
    explanation: "Theo mục 1.5.2, Whole-team approach cho phép mọi thành viên cùng chia sẻ trách nhiệm chất lượng, tận dụng đa dạng kỹ năng, cải thiện giao tiếp và tạo sức mạnh tổng hợp (synergy) cho cả nhóm.",
    mnemonic: "Whole-Team = Cả nhóm cùng chịu trách nhiệm chất lượng & hỗ trợ lẫn nhau!"
  },
  {
    id: "q1_18",
    chapter: 1,
    section: "1.5.3",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Lợi ích chính và hạn chế tiềm ẩn của việc có mức độ độc lập cao trong kiểm thử (ví dụ: nhóm kiểm thử độc lập hoặc bên thứ ba) là gì?",
    options: [
      "A. Lợi ích: Tìm ra các loại lỗi khác nhờ góc nhìn khách quan không thiên kiến; Hạn chế: Dễ bị cô lập, thiếu giao tiếp và lập trình viên có thể giảm tinh thần trách nhiệm với chất lượng",
      "B. Lợi ích: Không tốn chi phí chuyển giao kiến thức; Hạn chế: Kiểm thử viên có cùng định kiến nhận thức giống hệt tác giả viết code",
      "C. Lợi ích: Luôn rút ngắn 50% thời gian phát hành; Hạn chế: Không thể thực hiện kiểm thử hệ thống",
      "D. Lợi ích: Thay thế hoàn toàn kiểm thử thành phần; Hạn chế: Làm tăng số lượng lỗi do phần cứng gây ra"
    ],
    correct: 0,
    explanation: "Theo mục 1.5.3, kiểm thử viên độc lập có nền tảng và góc nhìn khác với tác giả nên phát hiện được các giả định sai lầm, nhưng nhược điểm là dễ bị cô lập khỏi nhóm phát triển, giao tiếp chậm hoặc tạo tâm lý đối đầu.",
    mnemonic: "Độc lập cao = Khách quan bắt lỗi tốt, nhưng coi chừng Cô lập & Đùn đẩy trách nhiệm!"
  },
  {
    id: "q2_01",
    chapter: 2,
    section: "2.1.1",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Sự khác biệt chính về hoạt động kiểm thử giữa mô hình phát triển tuần tự (Sequential models như V-model) và mô hình phát triển lặp/tăng trưởng (Iterative & Incremental models như Agile Scrum) là gì?",
    options: [
      "A. Trong mô hình tuần tự, kiểm thử động diễn ra ngay từ giai đoạn yêu cầu; trong Agile, kiểm thử chỉ diễn ra ở cuối dự án",
      "B. Trong mô hình tuần tự, kiểm thử tĩnh được thực hiện sớm nhưng kiểm thử động thường thực hiện muộn hơn; trong Agile, mỗi vòng lặp đều thực hiện cả kiểm thử tĩnh và động liên tục",
      "C. Mô hình tuần tự không cần tài liệu thiết kế kiểm thử, còn Agile yêu cầu tài liệu kế hoạch kiểm thử đồ sộ trước khi viết code",
      "D. Mô hình Agile không cần kiểm thử hồi quy, trong khi mô hình tuần tự phải chạy kiểm thử hồi quy mỗi ngày"
    ],
    correct: 1,
    explanation: "Theo mục 2.1.1, ở mô hình tuần tự, phân tích và duyệt tĩnh diễn ra sớm nhưng kiểm thử động phải đợi đến khi code được xây dựng ở các pha sau; ở mô hình lặp/tăng trưởng, mỗi vòng lặp đều có kiểm thử tĩnh và động cùng nhu cầu hồi quy liên tục.",
    mnemonic: "Tuần tự = Tĩnh sớm, Động muộn; Lặp/Agile = Tĩnh + Động + Hồi quy liên tục mỗi Sprint!"
  },
  {
    id: "q2_02",
    chapter: 2,
    section: "2.1.2",
    kLevel: "K1",
    difficulty: "easy",
    scenario: "Phương pháp tiếp cận phát triển hướng kiểm thử nào (Test-First approach) diễn tả hành vi mong muốn của ứng dụng bằng cấu trúc ngôn ngữ tự nhiên 'Given / When / Then' để cả nhóm cùng hiểu chung?",
    options: [
      "A. Phát triển hướng kiểm thử (Test-Driven Development - TDD)",
      "B. Phát triển hướng kiểm thử chấp nhận (Acceptance Test-Driven Development - ATDD)",
      "C. Phát triển hướng hành vi (Behavior-Driven Development - BDD)",
      "D. Kiểm thử dựa trên kinh nghiệm (Experience-Based Testing)"
    ],
    correct: 2,
    explanation: "Theo mục 2.1.2, BDD (Behavior-Driven Development) diễn đạt hành vi mong muốn của phần mềm qua các kịch bản viết bằng định dạng Given / When / Then, sau đó chuyển dịch tự động thành các bài kiểm thử thực thi được.",
    mnemonic: "TDD = Viết Unit Test trước code; ATDD = Viết tiêu chí chấp nhận; BDD = Given/When/Then!"
  },
  {
    id: "q2_03",
    chapter: 2,
    section: "2.1.3",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Thực hành nào sau đây là ví dụ ĐIỂN HÌNH của cách tiếp cận Dịch chuyển sang trái (Shift-Left) trong kiểm thử?",
    options: [
      "A. Đợi đến khi hoàn tất toàn bộ mã nguồn của hệ thống rồi mới bắt đầu phân tích yêu cầu và viết test case",
      "B. Rà soát đặc tả yêu cầu sớm, viết các ca kiểm thử trước khi viết mã nguồn và tích hợp phân tích tĩnh tự động vào quy trình CI",
      "C. Chuyển toàn bộ trách nhiệm kiểm thử cho người dùng cuối sau khi phần mềm đã lên môi trường Production",
      "D. Bỏ qua kiểm thử thành phần và kiểm thử tích hợp để tập trung toàn bộ ngân sách cho kiểm thử chấp nhận"
    ],
    correct: 1,
    explanation: "Theo mục 2.1.3, Shift-Left là thực hiện các hoạt động kiểm thử sớm hơn trong SDLC, như duyệt đặc tả, viết test case trước khi code, áp dụng TDD/ATDD/BDD, phân tích tĩnh trước khi đẩy code vào CI và kiểm thử phi chức năng sớm.",
    mnemonic: "Shift-Left = Kéo kiểm thử về đầu dòng thời gian (Review sớm, Test-First, Static Analysis sớm)!"
  },
  {
    id: "q2_04",
    chapter: 2,
    section: "2.1.4",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Việc áp dụng DevOps và đường ống CI/CD mang lại lợi ích và thách thức nào đối với hoạt động kiểm thử?",
    options: [
      "A. Loại bỏ hoàn toàn nhu cầu kiểm thử thủ công và kiểm thử thăm dò",
      "B. Cung cấp phản hồi nhanh về chất lượng mã nguồn, thúc đẩy tự động hóa kiểm thử hồi quy, nhưng vẫn cần đầu tư thiết lập môi trường và duy trì bộ test tự động",
      "C. Làm chậm tốc độ phát hành phần mềm do phải chờ phê duyệt thủ công ở mọi bước biên dịch",
      "D. Chỉ hỗ trợ kiểm thử tĩnh và không cho phép chạy các bài kiểm thử động"
    ],
    correct: 1,
    explanation: "Theo mục 2.1.4, DevOps và CI/CD cung cấp phản hồi nhanh, giảm rủi ro hồi quy nhờ kiểm thử tự động liên tục, thúc đẩy Shift-Left, nhưng có thách thức về chi phí thiết lập đường ống, bảo trì test tự động và vẫn cần kiểm thử thủ công.",
    mnemonic: "DevOps + CI/CD = Phản hồi siêu tốc + Tự động hóa hồi quy, nhưng vẫn cần Manual/Exploratory Test!"
  },
  {
    id: "q2_05",
    chapter: 2,
    section: "2.1.5",
    kLevel: "K2",
    difficulty: "easy",
    scenario: "Buổi họp Cải tiến (Retrospective) vào cuối mỗi vòng lặp mang lại lợi ích gì cho hoạt động kiểm thử?",
    options: [
      "A. Xác định cá nhân làm phát sinh nhiều lỗi nhất để phạt trừ lương",
      "B. Cải thiện hiệu quả tạo test case, nâng cao chất lượng cơ sở kiểm thử và tăng cường sự hợp tác giữa phát triển với kiểm thử dựa trên bài học thực tế",
      "C. Thay thế hoàn toàn cho hoạt động thực thi kiểm thử chấp nhận của khách hàng",
      "D. Đóng băng mọi thay đổi quy trình trong suốt phần còn lại của dự án"
    ],
    correct: 1,
    explanation: "Theo mục 2.1.5, họp Cải tiến (Retrospective) giúp nhóm thảo luận điều gì đã làm tốt, điều gì chưa tốt và thống nhất các hành động cải tiến quy trình phát triển cũng như kiểm thử ở vòng lặp kế tiếp.",
    mnemonic: "Retrospective = Nhìn lại để Cải tiến quy trình & Hợp tác tốt hơn ở Sprint sau!"
  },
  {
    id: "q2_06",
    chapter: 2,
    section: "2.2.1",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Trong dự án phát triển hệ thống viễn thông, nhóm kiểm thử đang kiểm tra giao diện và luồng trao đổi dữ liệu giữa cổng thanh toán nội bộ và hệ thống cổng hóa đơn điện tử của cơ quan thuế bên ngoài. Đây là cấp độ kiểm thử nào?",
    options: [
      "A. Kiểm thử thành phần (Component testing)",
      "B. Kiểm thử tích hợp thành phần (Component integration testing)",
      "C. Kiểm thử hệ thống (System testing)",
      "D. Kiểm thử tích hợp hệ thống (System integration testing)"
    ],
    correct: 3,
    explanation: "Theo mục 2.2.1, Kiểm thử tích hợp hệ thống (System integration testing) tập trung vào việc kiểm thử các giao diện và tương tác giữa hệ thống đang kiểm thử với các hệ thống khác hoặc các dịch vụ bên ngoài.",
    mnemonic: "Giữa các hàm/module nội bộ = Component Integration; Giữa các hệ thống/dịch vụ ngoài = System Integration!"
  },
  {
    id: "q2_07",
    chapter: 2,
    section: "2.2.1",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Một lập trình viên viết các bài kiểm thử đơn vị (Unit test) sử dụng các đối tượng giả lập (mock objects, stubs và drivers) để kiểm tra riêng lẻ một lớp (class) tính thuế thu nhập cá nhân. Đây là cấp độ kiểm thử nào?",
    options: [
      "A. Kiểm thử thành phần (Component testing / Unit testing)",
      "B. Kiểm thử tích hợp thành phần (Component integration testing)",
      "C. Kiểm thử hệ thống (System testing)",
      "D. Kiểm thử chấp nhận vận hành (Operational acceptance testing)"
    ],
    correct: 0,
    explanation: "Theo mục 2.2.1, Kiểm thử thành phần (Component/Unit testing) tập trung kiểm thử các thành phần một cách cô lập, thường đòi hỏi khung hỗ trợ (test harnesses), stubs/drivers và thường do lập trình viên thực hiện.",
    mnemonic: "Test cô lập 1 module/class với Mock/Stub/Driver = Component (Unit) Testing!"
  },
  {
    id: "q2_08",
    chapter: 2,
    section: "2.2.1",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Phân biệt ĐÚNG giữa Kiểm thử Alpha (Alpha testing) và Kiểm thử Beta (Beta testing) trong Kiểm thử chấp nhận?",
    options: [
      "A. Alpha được thực hiện tại địa điểm của khách hàng; Beta được thực hiện tại địa điểm của nhóm phát triển",
      "B. Alpha được thực hiện tại địa điểm của tổ chức phát triển (không có sự tham gia của nhóm phát triển); Beta được thực hiện bởi người dùng thực tế tại chính địa điểm/môi trường của họ",
      "C. Alpha chỉ kiểm tra mã nguồn tĩnh; Beta chỉ kiểm tra sao lưu dữ liệu hệ thống",
      "D. Alpha dành cho phần mềm thương mại đóng gói, còn Beta chỉ dành cho kiểm thử đơn vị"
    ],
    correct: 1,
    explanation: "Theo mục 2.2.1, Alpha testing được thực hiện tại địa điểm của tổ chức phát triển bởi người dùng tiềm năng hoặc nhóm độc lập; Beta testing được thực hiện bởi người dùng thực tế tại địa điểm riêng của họ.",
    mnemonic: "Alpha = Tại nhà Dev; Beta = Tại nhà Khách hàng/User thật!"
  },
  {
    id: "q2_09",
    chapter: 2,
    section: "2.2.1",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Trước khi đưa hệ thống lên môi trường Production, đội ngũ Quản trị hệ thống (System Administration / Ops) kiểm tra quy trình sao lưu - khôi phục (backup/restore), chuyển đổi dự phòng (failover) và giám sát cảnh báo. Đây là hình thức kiểm thử chấp nhận nào?",
    options: [
      "A. Kiểm thử chấp nhận của người dùng (User Acceptance Testing - UAT)",
      "B. Kiểm thử chấp nhận vận hành (Operational Acceptance Testing - OAT)",
      "C. Kiểm thử chấp nhận theo hợp đồng và quy định chế tài (Contractual and Regulatory Acceptance Testing)",
      "D. Kiểm thử tích hợp thành phần (Component Integration Testing)"
    ],
    correct: 1,
    explanation: "Theo mục 2.2.1, Kiểm thử chấp nhận vận hành (OAT) tập trung vào khía cạnh vận hành hệ thống bởi nhân viên vận hành/quản trị (sao lưu/khôi phục, cài đặt, khắc phục thảm họa, quản lý người dùng, tải dữ liệu).",
    mnemonic: "Backup, Restore, Failover, Admin = Chấp nhận Vận hành (OAT)!"
  },
  {
    id: "q2_10",
    chapter: 2,
    section: "2.2.2",
    kLevel: "K2",
    difficulty: "easy",
    scenario: "Sự khác biệt giữa Kiểm thử chức năng (Functional testing) và Kiểm thử phi chức năng (Non-functional testing) là gì?",
    options: [
      "A. Kiểm thử chức năng đánh giá hệ thống hoạt động tốt như thế nào (How well); Kiểm thử phi chức năng đánh giá hệ thống làm cái gì (What)",
      "B. Kiểm thử chức năng đánh giá các chức năng mà hệ thống phải thực hiện (What); Kiểm thử phi chức năng đánh giá các thuộc tính như hiệu năng, bảo mật, tính khả dụng (How well)",
      "C. Kiểm thử chức năng chỉ áp dụng ở cấp độ thành phần; Kiểm thử phi chức năng chỉ áp dụng ở cấp độ chấp nhận",
      "D. Kiểm thử chức năng luôn là hộp trắng; Kiểm thử phi chức năng luôn là hộp đen"
    ],
    correct: 1,
    explanation: "Theo mục 2.2.2, Functional testing kiểm tra 'hệ thống làm cái gì' (What), còn Non-functional testing kiểm tra 'hệ thống thực hiện tốt như thế nào' (How well). Cả hai đều có thể thực hiện ở mọi cấp độ kiểm thử.",
    mnemonic: "Functional = Làm CÁI GÌ (What); Non-functional = Làm TỐT THẾ NÀO (How well)!"
  },
  {
    id: "q2_11",
    chapter: 2,
    section: "2.2.2",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Phát biểu nào sau đây ĐÚNG khi so sánh Kiểm thử hộp đen (Black-box testing) và Kiểm thử hộp trắng (White-box testing)?",
    options: [
      "A. Kiểm thử hộp đen dựa trên cấu trúc mã nguồn bên trong; Kiểm thử hộp trắng chỉ dựa vào tài liệu đặc tả bên ngoài",
      "B. Kiểm thử hộp đen suy xuất ca kiểm thử từ tài liệu đặc tả mà không quan tâm cấu trúc bên trong; Kiểm thử hộp trắng suy xuất ca kiểm thử từ cấu trúc nội tại, mã nguồn hoặc kiến trúc của hệ thống",
      "C. Kiểm thử hộp trắng không bao giờ được áp dụng cho kiểm thử tĩnh hoặc kiểm thử tích hợp",
      "D. Kiểm thử hộp đen chỉ dùng cho kiểm thử phi chức năng, còn hộp trắng chỉ dùng cho kiểm thử chức năng"
    ],
    correct: 1,
    explanation: "Theo mục 2.2.2, Black-box testing dựa trên hành vi bên ngoài/đặc tả không phụ thuộc vào cấu trúc nội tại; White-box testing dựa trên cấu trúc nội tại, thiết kế, mã nguồn hoặc luồng dữ liệu.",
    mnemonic: "Black-box = Nhìn đặc tả/ngoài vỏ; White-box = Nhìn xuyên thấu code/kiến trúc bên trong!"
  },
  {
    id: "q2_12",
    chapter: 2,
    section: "2.2.3",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Sau khi lập trình viên sửa lỗi 'Không áp dụng được mã giảm giá VIP', kiểm thử viên thực hiện: (1) chạy lại đúng test case nhập mã VIP từng bị lỗi để kiểm tra lỗi đã hết chưa, và (2) chạy bộ test thanh toán thẻ tín dụng và ví điện tử để đảm bảo bản sửa lỗi không làm hỏng các hình thức thanh toán khác. Hãy gọi tên (1) và (2):",
    options: [
      "A. (1) Kiểm thử hồi quy (Regression testing); (2) Kiểm thử xác nhận (Confirmation testing)",
      "B. (1) Kiểm thử xác nhận (Confirmation testing); (2) Kiểm thử hồi quy (Regression testing)",
      "C. (1) Kiểm thử thăm dò (Exploratory testing); (2) Kiểm thử bảo trì (Maintenance testing)",
      "D. (1) Kiểm thử tĩnh (Static testing); (2) Kiểm thử hộp trắng (White-box testing)"
    ],
    correct: 1,
    explanation: "Theo mục 2.2.3, Confirmation testing xác nhận rằng khiếm khuyết ban đầu đã được sửa thành công; Regression testing kiểm tra xem thay đổi có vô tình gây ra tác dụng phụ ở các phần khác hay không.",
    mnemonic: "Confirmation = Xác nhận bug cũ đã chết; Regression = Hồi quy xem chỗ lành có bị vạ lây không!"
  },
  {
    id: "q2_13",
    chapter: 2,
    section: "2.3",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Theo ISTQB CTFL v4.0.1, ba yếu tố kích hoạt (triggers) chính cho Kiểm thử bảo trì (Maintenance testing) trên một hệ thống đang vận hành là gì?",
    options: [
      "A. Lập kế hoạch dự án mới, Tuyển dụng kiểm thử viên mới và Mua công cụ quản lý lỗi mới",
      "B. Sửa đổi (Modification), Di chuyển/Chuyển đổi (Migration) và Ngừng hoạt động/Nghỉ hưu hệ thống (Retirement)",
      "C. Kiểm thử đơn vị, Kiểm thử tích hợp và Kiểm thử hệ thống",
      "D. Phân tích tĩnh, Duyệt kỹ thuật và Thanh tra mã nguồn"
    ],
    correct: 1,
    explanation: "Theo mục 2.3, các yếu tố kích hoạt Kiểm thử bảo trì được phân loại thành: Sửa đổi (nâng cấp/khắc phục), Di chuyển sang nền tảng mới (Migration) và Ngừng hoạt động ứng dụng (Retirement).",
    mnemonic: "3 Trigger Bảo trì = Sửa đổi (Modification) + Di cư (Migration) + Nghỉ hưu (Retirement)!"
  },
  {
    id: "q2_14",
    chapter: 2,
    section: "2.3",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Khi một hệ thống kế toán cũ ngừng hoạt động (Retirement / Decommissioning), hoạt động kiểm thử bảo trì cần tập trung vào điều gì?",
    options: [
      "A. Kiểm thử các tính năng giao diện người dùng mới vừa được thêm vào hệ thống cũ",
      "B. Kiểm thử việc lưu trữ dữ liệu (data archiving) và khả năng khôi phục/truy xuất dữ liệu trong thời gian lưu trữ theo quy định pháp luật",
      "C. Viết lại toàn bộ mã nguồn của hệ thống cũ bằng ngôn ngữ lập trình mới",
      "D. Không cần thực hiện bất kỳ hoạt động kiểm thử nào khi hệ thống nghỉ hưu"
    ],
    correct: 1,
    explanation: "Theo mục 2.3, khi một ứng dụng ngừng hoạt động (retirement), việc kiểm thử việc lưu trữ dữ liệu lâu dài (archiving) hoặc quy trình khôi phục/truy xuất dữ liệu là cần thiết để đáp ứng yêu cầu pháp lý.",
    mnemonic: "Hệ thống Nghỉ hưu (Retirement) = Phải test Lưu trữ (Archiving) & Khôi phục dữ liệu lịch sử!"
  },
  {
    id: "q2_15",
    chapter: 2,
    section: "2.3",
    kLevel: "K2",
    difficulty: "easy",
    scenario: "Phạm vi của Kiểm thử bảo trì (Scope of maintenance testing) phụ thuộc vào ba yếu tố chính nào?",
    options: [
      "A. Số lượng lập trình viên, loại màn hình máy tính và múi giờ làm việc",
      "B. Mức độ thay đổi (degree of risk of change), kích thước của hệ thống hiện có và mức độ rủi ro của thay đổi",
      "C. Chỉ phụ thuộc duy nhất vào số lượng dòng mã nguồn được xóa đi",
      "D. Chỉ phụ thuộc vào ngân sách quảng cáo sản phẩm"
    ],
    correct: 1,
    explanation: "Theo mục 2.3, phạm vi kiểm thử bảo trì phụ thuộc vào: mức độ rủi ro của thay đổi, kích thước của hệ thống hiện có, và quy mô của thay đổi đó.",
    mnemonic: "Phạm vi Bảo trì = Quy mô thay đổi + Kích thước hệ thống + Mức độ rủi ro!"
  },
  {
    id: "q3_01",
    chapter: 3,
    section: "3.1.1",
    kLevel: "K1",
    difficulty: "easy",
    scenario: "Sản phẩm công việc nào sau đây KHÔNG phù hợp để áp dụng Kiểm thử tĩnh (Static testing)?",
    options: [
      "A. Tài liệu đặc tả yêu cầu, câu chuyện người dùng (User stories) và tiêu chí chấp nhận",
      "B. Mã nguồn, kế hoạch kiểm thử, các ca kiểm thử và hợp đồng dự án",
      "C. Mã thực thi của bên thứ ba đã được biên dịch/mã hóa mà con người hoặc công cụ không thể đọc hiểu cấu trúc",
      "D. Mô hình kiến trúc hệ thống và hướng dẫn sử dụng dành cho khách hàng"
    ],
    correct: 2,
    explanation: "Theo mục 3.1.1, hầu hết mọi sản phẩm công việc đọc hiểu được đều có thể kiểm thử tĩnh; ngoại trừ các sản phẩm quá phức tạp để con người diễn giải và không thể phân tích bằng công cụ hoặc mã thực thi bên thứ 3 vì lý do pháp lý/bảo mật.",
    mnemonic: "Đọc hiểu được / Phân tích cấu trúc được = Static Test được! File nhị phân mã hóa bên thứ 3 = Không!"
  },
  {
    id: "q3_02",
    chapter: 3,
    section: "3.1.2",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Giá trị nổi bật của Kiểm thử tĩnh (Static testing) là gì?",
    options: [
      "A. Chỉ có thể thực hiện sau khi phần mềm đã được biên dịch và triển khai hoàn chỉnh lên máy chủ thật",
      "B. Phát hiện khiếm khuyết ở giai đoạn sớm nhất trong SDLC (như lỗi yêu cầu, lỗi thiết kế, chuẩn mã hóa) với chi phí thấp hơn nhiều so với kiểm thử động ở giai đoạn muộn",
      "C. Đo lường trực tiếp thời gian phản hồi thực tế của hệ thống dưới tải 10.000 người dùng đồng thời",
      "D. Thay thế hoàn toàn nhu cầu thực hiện kiểm thử động ở mọi cấp độ"
    ],
    correct: 1,
    explanation: "Theo mục 3.1.2, kiểm thử tĩnh giúp phát hiện sớm các khiếm khuyết trước khi chạy kiểm thử động, đánh giá chất lượng tài liệu, phát hiện các lỗi mà kiểm thử động không thể chạm tới (như đoạn code không bao giờ chạy tới) và giảm chi phí sửa lỗi.",
    mnemonic: "Static Testing = Bắt lỗi từ trong trứng nước (Rẻ + Sớm + Sâu)!"
  },
  {
    id: "q3_03",
    chapter: 3,
    section: "3.1.3",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Điểm khác biệt căn bản giữa Kiểm thử tĩnh (Static testing) và Kiểm thử động (Dynamic testing) là gì?",
    options: [
      "A. Kiểm thử tĩnh tìm thấy trực tiếp các Khiếm khuyết (Defects) mà không cần chạy code; Kiểm thử động chạy phần mềm để kích hoạt các Hỏng hóc (Failures) từ đó mới tìm ra Khiếm khuyết",
      "B. Kiểm thử tĩnh chỉ áp dụng cho mã nguồn; Kiểm thử động chỉ áp dụng cho tài liệu yêu cầu",
      "C. Kiểm thử tĩnh tìm ra Hỏng hóc (Failures); Kiểm thử động tìm trực tiếp Sai sót của con người (Errors)",
      "D. Kiểm thử tĩnh luôn phải sử dụng công cụ tự động; Kiểm thử động luôn phải làm thủ công"
    ],
    correct: 0,
    explanation: "Theo mục 3.1.3, kiểm thử tĩnh phát hiện trực tiếp khiếm khuyết (defects) trong sản phẩm công việc, trong khi kiểm thử động gây ra các hỏng hóc (failures) nhìn thấy được khi chạy phần mềm rồi qua gỡ lỗi mới xác định defect.",
    mnemonic: "Tĩnh = Thấy ngay Defect; Động = Chạy ra Failure rồi mới lần về Defect!"
  },
  {
    id: "q3_04",
    chapter: 3,
    section: "3.1.3",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Loại khiếm khuyết nào sau đây DỄ được phát hiện bởi Kiểm thử tĩnh hơn so với Kiểm thử động?",
    options: [
      "A. Lỗi rò rỉ bộ nhớ chỉ xuất hiện sau khi máy chủ chạy liên tục 72 giờ dưới tải cao",
      "B. Sự sai lệch chuẩn viết code (coding standard violations), biến khai báo nhưng không bao giờ sử dụng (dead code) và sự mâu thuẫn/mơ hồ trong tài liệu yêu cầu",
      "C. Sự cố xung đột trình điều khiển phần cứng trên một dòng điện thoại cụ thể khi mất sóng 4G",
      "D. Thời gian phản hồi API vượt quá 3 giây khi cơ sở dữ liệu bị khóa bảng"
    ],
    correct: 1,
    explanation: "Theo mục 3.1.3, các lỗi trong yêu cầu, thiết kế, độ phức tạp mã quá mức, mã chết (unreachable/dead code), vi phạm chuẩn mã hóa và lỗ hổng bảo mật mẫu dễ được phát hiện bằng kiểm thử tĩnh hơn nhiều so với kiểm thử động.",
    mnemonic: "Mơ hồ yêu cầu + Dead code + Sai chuẩn code = Sở trường của Kiểm thử tĩnh!"
  },
  {
    id: "q3_05",
    chapter: 3,
    section: "3.2.1",
    kLevel: "K1",
    difficulty: "easy",
    scenario: "Lợi ích của việc thu thập phản hồi sớm và thường xuyên từ các bên liên quan (early and frequent stakeholder feedback) là gì?",
    options: [
      "A. Giúp phát hiện sớm các hiểu lầm về yêu cầu, đảm bảo các thay đổi được thống nhất nhanh chóng và giúp nhóm phát triển tập trung vào các tính năng mang lại giá trị cao nhất",
      "B. Cho phép nhóm phát triển bỏ qua hoàn toàn việc viết tài liệu và kiểm thử hệ thống",
      "C. Ngăn cản khách hàng thay đổi bất kỳ yêu cầu nào trong suốt dự án",
      "D. Tăng số lượng tài liệu bàn giao cuối dự án lên gấp đôi"
    ],
    correct: 0,
    explanation: "Theo mục 3.2.1, phản hồi sớm và thường xuyên giúp ngăn ngừa hiểu lầm về yêu cầu, giảm chi phí làm lại (rework) và đảm bảo sản phẩm xây dựng đúng hướng mong đợi của các bên liên quan.",
    mnemonic: "Hỏi Stakeholder sớm & thường xuyên = Tránh xây nhầm nhà!"
  },
  {
    id: "q3_06",
    chapter: 3,
    section: "3.2.2",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Theo tiêu chuẩn quy trình duyệt (Review process) trong ISTQB CTFL v4.0.1, thứ tự ĐÚNG của 5 hoạt động chính là gì?",
    options: [
      "A. Khởi động -> Lập kế hoạch -> Duyệt cá nhân -> Sửa lỗi & Báo cáo -> Giao tiếp & Phân tích",
      "B. Lập kế hoạch (Planning) -> Khởi động duyệt (Review initiation) -> Duyệt cá nhân (Individual review) -> Giao tiếp và phân tích (Communication and analysis) -> Sửa lỗi và báo cáo (Fixing and reporting)",
      "C. Duyệt cá nhân -> Lập kế hoạch -> Giao tiếp và phân tích -> Khởi động duyệt -> Sửa lỗi và báo cáo",
      "D. Lập kế hoạch -> Thực thi kiểm thử -> Gỡ lỗi -> Kiểm thử hồi quy -> Đóng dự án"
    ],
    correct: 1,
    explanation: "Theo mục 3.2.2, quy trình duyệt gồm 5 bước tuần tự: 1. Planning -> 2. Review initiation -> 3. Individual review -> 4. Communication and analysis -> 5. Fixing and reporting.",
    mnemonic: "5 bước Review: Lập kế hoạch -> Khởi động -> Cá nhân tự đọc -> Họp phân tích -> Sửa & Báo cáo!"
  },
  {
    id: "q3_07",
    chapter: 3,
    section: "3.2.2",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Trong hoạt động nào của quy trình duyệt (Review process), việc xác định phạm vi duyệt, mục tiêu, tiêu chí kết thúc (exit criteria) và ước lượng nỗ lực được thực hiện?",
    options: [
      "A. Lập kế hoạch (Planning)",
      "B. Khởi động duyệt (Review initiation)",
      "C. Duyệt cá nhân (Individual review)",
      "D. Giao tiếp và phân tích (Communication and analysis)"
    ],
    correct: 0,
    explanation: "Theo mục 3.2.2, trong bước Lập kế hoạch (Planning), phạm vi duyệt, mục tiêu, sản phẩm cần duyệt, đặc tính chất lượng cần đánh giá, tiêu chí kết thúc và khung thời gian sẽ được xác định.",
    mnemonic: "Xác định Phạm vi + Mục tiêu + Exit Criteria = Bước 1: Planning!"
  },
  {
    id: "q3_08",
    chapter: 3,
    section: "3.2.2",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Trong buổi họp duyệt thuộc bước Giao tiếp và phân tích (Communication and analysis), công việc chính của nhóm là gì?",
    options: [
      "A. Ngồi viết lại toàn bộ mã nguồn của tính năng ngay trong phòng họp",
      "B. Thảo luận, phân tích, đánh giá mức độ nghiêm trọng của các điểm bất thường (anomalies) đã phát hiện và đưa ra quyết định về trạng thái duyệt của sản phẩm công việc",
      "C. Phân phát tài liệu lần đầu tiên cho những người tham gia",
      "D. Viết kịch bản kiểm thử tự động cho hệ thống"
    ],
    correct: 1,
    explanation: "Theo mục 3.2.2, bước Giao tiếp và phân tích dùng để phân tích các điểm bất thường được ghi nhận trong bước duyệt cá nhân, thống nhất xem chúng có phải là defect thực sự hay không, ai sẽ sửa và đánh giá kết quả duyệt (Pass/Cần sửa).",
    mnemonic: "Họp Review = Phân tích lỗi & Ra quyết định, KHÔNG ngồi sửa code trực tiếp trong phòng họp!"
  },
  {
    id: "q3_09",
    chapter: 3,
    section: "3.2.3",
    kLevel: "K1",
    difficulty: "easy",
    scenario: "Trong một buổi duyệt chính thức, ai là người chịu trách nhiệm điều hành các cuộc họp duyệt hiệu quả, quản lý thời gian và đảm bảo mọi người đều có thể phát biểu ý kiến một cách an toàn?",
    options: [
      "A. Tác giả (Author)",
      "B. Người điều phối (Moderator / Facilitator)",
      "C. Thư ký (Scribe / Recorder)",
      "D. Quản lý (Manager)"
    ],
    correct: 1,
    explanation: "Theo mục 3.2.3, Người điều phối (Moderator / Facilitator) đảm bảo các cuộc họp duyệt diễn ra hiệu quả, hòa giải các quan điểm khác nhau, quản lý thời gian và tạo môi trường an toàn cho mọi người tham gia.",
    mnemonic: "Moderator (Facilitator) = Trọng tài giữ nhịp cuộc họp & bảo vệ tâm lý an toàn!"
  },
  {
    id: "q3_10",
    chapter: 3,
    section: "3.2.3",
    kLevel: "K1",
    difficulty: "easy",
    scenario: "Vai trò nào trong buổi duyệt chịu trách nhiệm tổng hợp các điểm bất thường từ người duyệt và ghi chép lại các vấn đề mới, quyết định và điểm mở phát sinh trong cuộc họp?",
    options: [
      "A. Trưởng nhóm duyệt (Review Leader)",
      "B. Thư ký (Scribe / Recorder)",
      "C. Tác giả (Author)",
      "D. Quản lý (Manager)"
    ],
    correct: 1,
    explanation: "Theo mục 3.2.3, Thư ký (Scribe / Recorder) thu thập các điểm bất thường từ người duyệt và ghi nhận các thông tin duyệt như quyết định và các điểm bất thường mới xuất hiện trong cuộc họp.",
    mnemonic: "Scribe / Recorder = Thư ký ghi biên bản lỗi & quyết định!"
  },
  {
    id: "q3_11",
    chapter: 3,
    section: "3.2.4",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Loại hình duyệt nào mà Tác giả (Author) trực tiếp dẫn dắt các thành viên tham gia đi qua sản phẩm công việc để đạt hiểu biết chung, trao đổi kỹ thuật và thu thập ý kiến?",
    options: [
      "A. Duyệt không chính thức (Informal review)",
      "B. Duyệt dẫn dắt (Walkthrough)",
      "C. Duyệt kỹ thuật (Technical review)",
      "D. Thanh tra (Inspection)"
    ],
    correct: 1,
    explanation: "Theo mục 3.2.4, trong Walkthrough (Duyệt dẫn dắt), chính Tác giả (Author) là người chủ trì và dẫn dắt buổi duyệt qua sản phẩm công việc; việc chuẩn bị cá nhân trước cuộc họp là không bắt buộc.",
    mnemonic: "Walkthrough = Tác giả (Author) cầm lái dẫn đoàn đi dạo qua tài liệu!"
  },
  {
    id: "q3_12",
    chapter: 3,
    section: "3.2.4",
    kLevel: "K2",
    difficulty: "hard",
    scenario: "Đặc điểm nào sau đây chỉ thuộc về Thanh tra (Inspection) — loại hình duyệt mang tính chính thức cao nhất?",
    options: [
      "A. Không cần tuân theo quy trình được định nghĩa và không cần ghi biên bản",
      "B. Tác giả (Author) bắt buộc phải đóng vai trò là Người điều phối (Moderator) và Thư ký (Scribe)",
      "C. Tuân theo quy trình đầy đủ, dựa trên các quy tắc/danh mục kiểm tra (checklists), thu thập số liệu (metrics) để cải tiến quy trình và Tác giả KHÔNG được đóng vai trò Trưởng nhóm duyệt, Người đọc hay Thư ký",
      "D. Không yêu cầu bước duyệt cá nhân (Individual review) trước cuộc họp"
    ],
    correct: 2,
    explanation: "Theo mục 3.2.4, Inspection là loại duyệt chính thức nhất, tuân thủ quy trình đầy đủ, thu thập metrics, có bước duyệt cá nhân bắt buộc, và Tác giả không được phép làm Review Leader, Reader hay Scribe.",
    mnemonic: "Inspection = Chính thức nhất + Thu thập Metrics + Cấm Author làm Leader/Reader/Scribe!"
  },
  {
    id: "q3_13",
    chapter: 3,
    section: "3.2.4",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Mục tiêu chính của một buổi Duyệt kỹ thuật (Technical review) là gì?",
    options: [
      "A. Đạt được sự đồng thuận về một bài toán kỹ thuật, đánh giá chất lượng và xây dựng sự tự tin vào sản phẩm công việc bởi các chuyên gia kỹ thuật đồng cấp",
      "B. Đánh giá năng lực nhân sự hàng năm để xét tăng lương cho tác giả",
      "C. Đào tạo quy trình hành chính nhân sự cho nhân viên mới",
      "D. Kiểm thử hiệu năng tải cao bằng công cụ bắn tải tự động"
    ],
    correct: 0,
    explanation: "Theo mục 3.2.4, Technical review được thực hiện bởi các người duyệt có trình độ kỹ thuật (technically qualified reviewers) và điều hành bởi Moderator nhằm đạt được sự đồng thuận kỹ thuật và phát hiện khiếm khuyết.",
    mnemonic: "Technical Review = Chuyên gia kỹ thuật hội chẩn để chốt phương án & bắt lỗi kỹ thuật!"
  },
  {
    id: "q3_14",
    chapter: 3,
    section: "3.2.5",
    kLevel: "K2",
    difficulty: "easy",
    scenario: "Yếu tố nào sau đây là yếu tố quyết định sự thành công về mặt CON NGƯỜI (people-related success factor) cho các buổi duyệt?",
    options: [
      "A. Gom toàn bộ tài liệu 500 trang vào một buổi họp kéo dài 8 tiếng liên tục",
      "B. Đánh giá sản phẩm công việc một cách khách quan, thúc đẩy văn hóa tin cậy và KHÔNG sử dụng kết quả buổi duyệt để đánh giá nhân sự (tác giả)",
      "C. Mời tất cả nhân viên trong công ty tham gia mọi buổi duyệt dù không liên quan",
      "D. Bỏ qua việc sử dụng danh mục kiểm tra (checklists) để tiết kiệm thời gian"
    ],
    correct: 1,
    explanation: "Theo mục 3.2.5, các yếu tố thành công gồm: chia nhỏ sản phẩm công việc thành các phần vừa sức, dùng checklists, giới hạn thời gian họp hợp lý, và đặc biệt là duy trì văn hóa tin cậy, không biến việc tìm lỗi thành việc đánh giá cá nhân tác giả.",
    mnemonic: "Review thành công = Chia nhỏ tài liệu + Dùng Checklist + Duyệt sản phẩm chứ KHÔNG phán xét tác giả!"
  },
  {
    id: "q3_15",
    chapter: 3,
    section: "3.2.5",
    kLevel: "K2",
    difficulty: "normal",
    scenario: "Khi cần duyệt một tài liệu đặc tả hệ thống rất lớn (300 trang), cách tiếp cận nào sau đây tuân thủ thực hành tốt của ISTQB CTFL v4.0.1?",
    options: [
      "A. Yêu cầu người duyệt đọc hết 300 trang trong vòng 30 phút ngay trước giờ họp",
      "B. Chia nhỏ tài liệu thành các phần nhỏ (small chunks) để duyệt theo từng đợt, cung cấp đủ thời gian chuẩn bị cá nhân và áp dụng danh mục kiểm tra (checklists) phù hợp",
      "C. Chỉ duyệt trang bìa và mục lục để tiết kiệm chi phí dự án",
      "D. Hủy bỏ buổi duyệt và chuyển thẳng sang giai đoạn lập trình"
    ],
    correct: 1,
    explanation: "Theo mục 3.2.5, để tránh mệt mỏi và giảm sự tập trung của người duyệt, các sản phẩm công việc lớn cần được chia thành các phần nhỏ (small chunks), thông báo sớm và có thời gian chuẩn bị đầy đủ.",
    mnemonic: "Tài liệu to = Cắt lát nhỏ (Small chunks) + Đủ thời gian đọc trước + Có Checklist!"
  }
];

window.CTFL_FLASHCARDS_123 = [
  {
    id: "fc1_01",
    chapter: 1,
    section: "1.1.1",
    term: "Xác minh vs Thẩm định (Verification vs Validation)",
    definition: "Verification (Xác minh): Kiểm tra xem hệ thống có đáp ứng đúng các yêu cầu đã được quy định trong tài liệu hay không. Validation (Thẩm định): Kiểm tra xem hệ thống có đáp ứng đúng nhu cầu thực tế của người dùng và các bên liên quan trong môi trường vận hành hay không.",
    memoryHook: "Verification = Xây ĐÚNG CÁCH (theo tài liệu); Validation = Xây ĐÚNG THỨ user cần!"
  },
  {
    id: "fc1_02",
    chapter: 1,
    section: "1.1.2",
    term: "Kiểm thử vs Gỡ lỗi (Testing vs Debugging)",
    definition: "Testing là hoạt động kích hoạt hỏng hóc (động) hoặc tìm trực tiếp khiếm khuyết (tĩnh). Debugging là hoạt động của Dev nhằm tái hiện hỏng hóc, chẩn đoán tìm ra khiếm khuyết và sửa mã nguồn.",
    memoryHook: "Tester bắt bệnh (Testing); Developer mổ chữa bệnh (Debugging)!"
  },
  {
    id: "fc1_03",
    chapter: 1,
    section: "1.2.2",
    term: "Kiểm thử (QC) vs Đảm bảo Chất lượng (QA)",
    definition: "Testing là một hình thức Kiểm soát chất lượng (QC) hướng sản phẩm (product-oriented), mang tính khắc phục (corrective). QA là cách tiếp cận hướng quy trình (process-oriented), mang tính phòng ngừa (preventive).",
    memoryHook: "QC/Testing = Bắt lỗi trên Sản phẩm; QA = Ngừa lỗi bằng Quy trình!"
  },
  {
    id: "fc1_04",
    chapter: 1,
    section: "1.2.3",
    term: "Chuỗi nhân quả: Root Cause -> Error -> Defect -> Failure",
    definition: "Nguyên nhân gốc rễ (Root cause) dẫn đến Sai sót của con người (Error/Mistake), tạo ra Khiếm khuyết trong code/tài liệu (Defect/Fault/Bug), và khi chạy gây ra Hỏng hóc nhìn thấy được (Failure).",
    memoryHook: "Gốc rễ -> Người nhầm (Error) -> Code lỗi (Defect) -> Hệ thống sập (Failure)!"
  },
  {
    id: "fc1_05",
    chapter: 1,
    section: "1.3.1",
    term: "7 Nguyên lý Kiểm thử (7 Testing Principles)",
    definition: "1. Chứng minh sự hiện diện của lỗi. 2. Không thể kiểm thử vét cạn. 3. Kiểm thử sớm. 4. Sự phân cụm lỗi (Pareto 80/20). 5. Nghịch lý thuốc trừ sâu (Tests wear out). 6. Phụ thuộc ngữ cảnh. 7. Ảo tưởng không có lỗi.",
    memoryHook: "Hiện - Vét - Sớm - Cụm - Thuốc - Ngữ - Ảo!"
  },
  {
    id: "fc1_06",
    chapter: 1,
    section: "1.4.1",
    term: "Phân tích Kiểm thử vs Thiết kế Kiểm thử (Test Analysis vs Test Design)",
    definition: "Test Analysis phân tích test basis để xác định các Điều kiện kiểm thử (Test conditions - Test cái gì?). Test Design áp dụng kỹ thuật kiểm thử để biến điều kiện kiểm thử thành các Ca kiểm thử (Test cases - Test như thế nào?).",
    memoryHook: "Analysis = WHAT to test (Conditions); Design = HOW to test (Test Cases)!"
  },
  {
    id: "fc1_07",
    chapter: 1,
    section: "1.4.5",
    term: "Hai Vai trò trong Kiểm thử (Test Management vs Testing Role)",
    definition: "Vai trò Quản lý kiểm thử (Test Management) phụ trách Lập kế hoạch, Giám sát & Kiểm soát, và Hoàn tất kiểm thử. Vai trò Kiểm thử (Testing Role) phụ trách kỹ thuật: Phân tích, Thiết kế, Triển khai và Thực thi kiểm thử.",
    memoryHook: "Manager giữ Đầu (Plan) - Giữa (Control) - Cuối (Completion); Tester làm Kỹ thuật ở giữa!"
  },
  {
    id: "fc1_08",
    chapter: 1,
    section: "1.5.2",
    term: "Cách tiếp cận Toàn nhóm & Tính Độc lập (Whole-Team & Independence)",
    definition: "Whole-team approach: Cả nhóm cùng chịu trách nhiệm chất lượng, hỗ trợ chéo nhau. Tính độc lập cao giúp nhìn ra các giả định sai mà tác giả bỏ sót, nhưng dễ gây cô lập nếu thiếu giao tiếp.",
    memoryHook: "Whole-Team = Đồng lòng; Independence = Khách quan nhưng tránh Cô lập!"
  },
  {
    id: "fc2_01",
    chapter: 2,
    section: "2.1.2",
    term: "Ba phương pháp Test-First: TDD, ATDD và BDD",
    definition: "TDD: Viết unit test tự động trước khi viết code. ATDD: Cả nhóm thống nhất và viết test từ tiêu chí chấp nhận trước khi làm User Story. BDD: Mô tả hành vi mong muốn bằng ngôn ngữ tự nhiên 'Given / When / Then'.",
    memoryHook: "TDD = Code-level; ATDD = Acceptance Criteria; BDD = Given/When/Then!"
  },
  {
    id: "fc2_02",
    chapter: 2,
    section: "2.1.3",
    term: "Dịch chuyển sang trái (Shift-Left)",
    definition: "Thực hiện các hoạt động kiểm thử sớm hơn trong SDLC (ví dụ: rà soát yêu cầu trước khi chốt, viết test case trước khi code, chạy phân tích tĩnh trước khi đẩy vào CI/CD, kiểm thử phi chức năng sớm).",
    memoryHook: "Shift-Left = Test càng sớm, sửa lỗi càng rẻ!"
  },
  {
    id: "fc2_03",
    chapter: 2,
    section: "2.2.1",
    term: "5 Cấp độ Kiểm thử (Test Levels)",
    definition: "1. Component (Unit) Testing: Kiểm thử thành phần cô lập. 2. Component Integration: Giao diện giữa các thành phần. 3. System Testing: Toàn hệ thống đầu-cuối. 4. System Integration: Tương tác với hệ thống/dịch vụ ngoài. 5. Acceptance Testing: Chấp nhận bởi người dùng/vận hành.",
    memoryHook: "Đơn vị -> Tích hợp Thành phần -> Hệ thống -> Tích hợp Hệ thống -> Chấp nhận!"
  },
  {
    id: "fc2_04",
    chapter: 2,
    section: "2.2.1",
    term: "4 Hình thức Kiểm thử Chấp nhận (Acceptance Testing Forms)",
    definition: "UAT (Người dùng cuối), OAT (Vận hành: backup, restore, failover), Contractual & Regulatory (Hợp đồng & Pháp lý), Alpha (tại môi trường của nhà phát triển) và Beta (tại môi trường thực của khách hàng).",
    memoryHook: "UAT + OAT + Hợp đồng/Pháp lý + Alpha (nhà Dev) / Beta (nhà Khách)!"
  },
  {
    id: "fc2_05",
    chapter: 2,
    section: "2.2.2",
    term: "4 Loại Kiểm thử (Test Types)",
    definition: "1. Functional (Chức năng: hệ thống làm gì - What). 2. Non-functional (Phi chức năng: hệ thống hoạt động tốt thế nào - How well). 3. Black-box (Hộp đen: dựa trên đặc tả). 4. White-box (Hộp trắng: dựa trên cấu trúc code/kiến trúc).",
    memoryHook: "4 Loại Test áp dụng được ở MỌI cấp độ: Chức năng - Phi chức năng - Hộp đen - Hộp trắng!"
  },
  {
    id: "fc2_06",
    chapter: 2,
    section: "2.2.3",
    term: "Kiểm thử Xác nhận vs Kiểm thử Hồi quy (Confirmation vs Regression)",
    definition: "Confirmation testing (Re-testing) chạy lại các ca kiểm thử từng thất bại để xác nhận lỗi đã được sửa. Regression testing chạy trên các phần khác để đảm bảo thay đổi không gây ra lỗi dây chuyền mới.",
    memoryHook: "Confirmation = Kiểm tra vết thương cũ đã lành chưa; Regression = Kiểm tra chỗ lành có bị vạ lây không!"
  },
  {
    id: "fc2_07",
    chapter: 2,
    section: "2.3",
    term: "3 Yếu tố kích hoạt Kiểm thử Bảo trì (Maintenance Testing Triggers)",
    definition: "1. Sửa đổi (Modification: nâng cấp hoặc sửa lỗi khẩn cấp). 2. Di chuyển (Migration: chuyển đổi sang nền tảng/hạ tầng mới). 3. Ngừng hoạt động (Retirement: kiểm thử lưu trữ và khôi phục dữ liệu lịch sử).",
    memoryHook: "Bảo trì = Sửa đổi (Modify) + Di cư (Migrate) + Nghỉ hưu (Retire)!"
  },
  {
    id: "fc2_08",
    chapter: 2,
    section: "2.1.4",
    term: "DevOps, CI/CD & Họp Cải tiến (Retrospectives)",
    definition: "DevOps và CI/CD giúp tự động hóa build, deploy và kiểm thử hồi quy liên tục để phản hồi nhanh. Họp Retrospective ở cuối mỗi vòng lặp giúp nhóm rút kinh nghiệm và cải tiến quy trình liên tục.",
    memoryHook: "CI/CD = Tự động & Phản hồi nhanh; Retrospective = Học từ thực tế để tốt hơn!"
  },
  {
    id: "fc3_01",
    chapter: 3,
    section: "3.1",
    term: "Kiểm thử Tĩnh vs Kiểm thử Động (Static vs Dynamic Testing)",
    definition: "Kiểm thử tĩnh (Reviews & Static Analysis) không cần chạy code và tìm trực tiếp Khiếm khuyết (Defects). Kiểm thử động bắt buộc phải thực thi phần mềm để kích hoạt Hỏng hóc (Failures).",
    memoryHook: "Tĩnh = Không chạy code, thấy ngay Defect; Động = Chạy code, thấy Failure!"
  },
  {
    id: "fc3_02",
    chapter: 3,
    section: "3.1.2",
    term: "Giá trị của Kiểm thử Tĩnh & Phân tích Tĩnh (Static Analysis)",
    definition: "Phát hiện lỗi từ sớm khi chi phí sửa rẻ nhất, tìm ra các lỗi mà kiểm thử động khó chạm tới như mã chết (unreachable code), biến không dùng, vi phạm chuẩn lập trình và sự mơ hồ trong tài liệu yêu cầu.",
    memoryHook: "Static Test bắt trọn Dead Code, Sai chuẩn lập trình & Yêu cầu mâu thuẫn!"
  },
  {
    id: "fc3_03",
    chapter: 3,
    section: "3.2.2",
    term: "5 Bước Quy trình Duyệt Chính thức (Formal Review Process)",
    definition: "1. Lập kế hoạch (Planning) -> 2. Khởi động duyệt (Review Initiation) -> 3. Duyệt cá nhân (Individual Review) -> 4. Giao tiếp và phân tích (Communication & Analysis) -> 5. Sửa lỗi và báo cáo (Fixing & Reporting).",
    memoryHook: "Kế hoạch -> Khởi động -> Cá nhân tự đọc -> Họp phân tích -> Sửa & Báo cáo!"
  },
  {
    id: "fc3_04",
    chapter: 3,
    section: "3.2.3",
    term: "6 Vai trò trong Buổi Duyệt (Review Roles)",
    definition: "Author (Tác giả), Manager (Quản lý cấp nguồn lực), Review Leader (Trưởng nhóm duyệt), Moderator/Facilitator (Điều phối cuộc họp), Scribe/Recorder (Thư ký ghi biên bản), Reviewer (Người duyệt tìm lỗi).",
    memoryHook: "Author viết - Manager cấp vốn - Leader tổ chức - Moderator cầm trịch - Scribe ghi chép - Reviewer soi lỗi!"
  },
  {
    id: "fc3_05",
    chapter: 3,
    section: "3.2.4",
    term: "Duyệt không chính thức & Duyệt dẫn dắt (Informal Review & Walkthrough)",
    definition: "Informal Review: Không cần quy trình chính thức, mục tiêu tìm lỗi nhanh. Walkthrough: Do chính Tác giả (Author) dẫn dắt cuộc họp để giải thích tài liệu, chia sẻ kiến thức và thu thập phản hồi.",
    memoryHook: "Informal = Tự do nhanh gọn; Walkthrough = Tác giả (Author) dẫn đường!"
  },
  {
    id: "fc3_06",
    chapter: 3,
    section: "3.2.4",
    term: "Duyệt Kỹ thuật vs Thanh tra (Technical Review vs Inspection)",
    definition: "Technical Review: Chuyên gia kỹ thuật thảo luận để đạt đồng thuận và tìm lỗi, không cần Manager tham gia. Inspection: Chính thức nhất, tuân thủ quy trình nghiêm ngặt, thu thập metrics, Author cấm làm Leader/Reader/Scribe.",
    memoryHook: "Technical = Đồng thuận chuyên gia; Inspection = Chính thức nhất + Có Metrics!"
  },
  {
    id: "fc3_07",
    chapter: 3,
    section: "3.2.1",
    term: "Phản hồi sớm và thường xuyên của Stakeholder",
    definition: "Giúp phát hiện ngay sự hiểu sai yêu cầu trước khi lập trình, giảm thiểu chi phí làm lại (rework) và đảm bảo sản phẩm bám sát kỳ vọng thực tế của khách hàng.",
    memoryHook: "Phản hồi sớm = Tránh hiểu lầm yêu cầu & Giảm làm lại (Rework)!"
  },
  {
    id: "fc3_08",
    chapter: 3,
    section: "3.2.5",
    term: "Các Yếu tố Thành công của Buổi Duyệt (Review Success Factors)",
    definition: "Chia tài liệu lớn thành các phần nhỏ (small chunks), dùng danh mục kiểm tra (checklists), dành đủ thời gian chuẩn bị, quản lý cuộc họp tốt, và tạo văn hóa tin cậy (duyệt sản phẩm chứ không đánh giá cá nhân tác giả).",
    memoryHook: "Cắt nhỏ tài liệu + Dùng Checklist + Không biến buổi Review thành buổi phán xét Author!"
  }
];
