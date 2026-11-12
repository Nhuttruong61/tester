# Spec: CTFL Bug Hunter: Cyber Arena (ISTQB CTFL v4.0.1 Gamified Learning Platform)

## Capability Map

| Module id | Owner | Responsibility | Depends on |
|---|---|---|---|
| `spec-planner` | `@spec-planner` | Architecture specification, shared data/DOM contracts, implementation plan & task breakdown (`SPEC.md`, `tasks/plan.md`, `tasks/todo.md`) | — |
| `content-chap123` | `@content-chap123` | Chapters 1–3 syllabus cheat sheets, >=48 exam-style questions, >=24 flashcards (`js/data-chap123.js`) | `spec-planner` |
| `content-chap456` | `@content-chap456` | Chapters 4–6 syllabus cheat sheets, >=50 exam-style & K3 calculation questions, >=24 flashcards (`js/data-chap456.js`) | `spec-planner` |
| `ui-designer` | `@ui-designer` | Tactical Cyber-Academy HTML5/CSS3 layout, dark/light themes, 3D card flips, boss animations, launcher (`index.html`, `css/styles.css`, `../index.html`) | `spec-planner` |
| `game-engine` | `@game-engine` | Web Audio synthesizer, Canvas particle FX, state persistence, and all 5 interactive game modes (`js/sound-fx.js`, `js/app.js`) | `content-chap123`, `content-chap456`, `ui-designer` |
| `verifier` | `@verifier` | Automated syntax, schema, question bank weight, and DOM ID contract verification suite (`tests/verify.js`) | `content-chap123`, `content-chap456`, `ui-designer`, `game-engine` |

Build order: `spec-planner` → (`content-chap123`, `content-chap456`, `ui-designer`) → `game-engine` → `verifier`

---

## Assumptions

1. **Zero-Build Static Architecture**: The application runs directly in modern desktop and mobile browsers via `file://` or any static HTTP server without requiring a bundler or backend database.
2. **Vietnamese + English Terminology**: All content follows the official ISTQB CTFL v4.0.1 Vietnamese Syllabus (`C:\VietHa\tester\ISTQB_CTFL_Syllabus_v4.0.1_VI_Full.md`), preserving canonical English terms in parentheses (e.g., *Phân vùng tương đương (Equivalence Partitioning)*).
3. **Client-Side Persistence**: All player progress, XP, ranks, Mistake Graveyard (*Sổ Thù Vặt*), SRS flashcard states, and mock exam history are stored in `localStorage` under the key `ctfl_cyber_arena_v1`.
4. **Zero External Audio Assets**: Sound effects are synthesized procedurally in real time using the browser's native Web Audio API (`AudioContext`).

---

## 1. Objective

Build **CTFL Bug Hunter: Cyber Arena**, a production-grade, interactive gamified learning platform designed to help QA engineers and software testers master the **ISTQB Certified Tester Foundation Level (CTFL) v4.0.1** syllabus in Vietnamese and pass the official certification exam with confidence.

### Core Game Modes & Features

1. **Campaign Raid & Boss Battles (`#view-campaign` & `#view-arena`)**
   - **6 Chapter Bosses** mapped 1-to-1 with Chapters 1–6 of the ISTQB CTFL v4.0.1 syllabus, plus special raids: **Quick Practice All**, **K3 Practical Lab**, and **Mistake Graveyard ("Sổ Thù Vặt")**.
   - **Combat Mechanics**: Player HP (`100`) vs. Boss HP (`100`). Correct answers deal damage scaled by K-Level (`K1` = 12, `K2` = 15, `K3` = 20) multiplied by the active Combo Streak, triggering floating damage numbers, particle bursts, and boss hit-shake animations. Wrong answers deal `20` damage to the Player, reset the combo, and log the question ID into the Mistake Graveyard.
   - **4 Tactical Power-Ups per Raid**:
     - `50/50 Bug Scanner` (`#powerup-5050`): Eliminates 2 incorrect options.
     - `Time Freeze` (`#powerup-freeze`): Pauses the question timer and grants bonus XP.
     - `Syllabus Peek` (`#powerup-peek`): Opens `#q-peek-box` with relevant chapter cheat-sheet notes and mnemonic hints before answering.
     - `Shield Repair` (`#powerup-shield`): Restores `+30 HP` (capped at 100 HP).
   - **Keyboard-First Accessibility**: `1`–`4` or `A`–`D` to select an option, `Enter`/`Space` for Next Question (`#btn-next-question`), `F` to flip flashcards.

2. **Official ISTQB Mock Exam Simulator (`#view-exam`)**
   - Generates a **40-question exam** strictly weighted by the official ISTQB CTFL v4.0.1 exam structure:
     - **Chapter 1** (Fundamentals of Testing): **8 questions** (20%)
     - **Chapter 2** (Testing Throughout the SDLC): **6 questions** (15%)
     - **Chapter 3** (Static Testing): **4 questions** (10%)
     - **Chapter 4** (Test Analysis and Design): **11 questions** (27.5%)
     - **Chapter 5** (Managing the Test Activities): **9 questions** (22.5%)
     - **Chapter 6** (Test Tools): **2 questions** (5%)
   - **60:00 countdown timer**, 40-question interactive navigation grid (`#exam-nav-grid`) showing current, answered, and flagged states, Prev/Next/Flag controls.
   - **Pass Criteria**: `>= 26 / 40` (`65%`). Post-exam analytics display overall score, pass/fail badge, time elapsed, per-chapter accuracy progress bars, and full question-by-question explanations.

3. **60s Bug Smasher Blitz & Spaced Repetition Mistake Graveyard (`#view-blitz` & Sổ Thù Vặt)**
   - **Speed Blitz 60s**: High-tempo 60-second rapid-fire mode with instant question transitions, combo multiplier (`1x` to `5x`), `+2s` time bonus every 5 consecutive hits, and high-score leaderboard tracking.
   - **SRS Mistake Graveyard ("Sổ Thù Vặt")**: Automatically captures any question answered wrong in Campaign, Exam, or Blitz modes. Answering a graveyard question correctly twice in Mistake Raid clears it from the graveyard.

4. **Interactive 3D Flashcards & Syllabus Codex + Mastery Analytics (`#view-flashcards` & `#view-codex`)**
   - **3D Flip Flashcards**: Filterable by Chapter 1–6 or "Cần ôn lại (Need Review)". Supports 3D perspective flip on click/Space/`F`, memory hooks (`memoryHook`), and SRS self-grading ("Đã thuộc / Got It" vs. "Ôn lại / Review Again").
   - **Syllabus Codex & Analytics**: Instant real-time search across all 6 chapter cheat sheets and flashcards, chapter mastery progress bars, player rank progression (*Fresher Bug Hunter* → *Junior QA* → *Test Analyst* → *Automation Ninja* → *CTFL Master*), and 10+ unlockable achievements.

---

## 2. Tech Stack

- **Markup & Styling**: Semantic HTML5, Modern CSS3 (Custom Properties, CSS Grid/Flexbox, 3D Transforms, Keyframe Animations, `[data-theme="light"]` & dark mode support).
- **Typography**: `Space Grotesk` / `Plus Jakarta Sans` (UI & Vietnamese display readability) + `JetBrains Mono` (K-levels, timers, metrics, code).
- **Runtime & Logic**: Vanilla ES6+ JavaScript (zero external runtime dependencies).
- **Audio & Visual FX**: Web Audio API (`AudioContext`) procedural sound synthesizer + HTML5 `<canvas id="fx-canvas">` 2D particle engine.
- **Verification**: Node.js (`node --check` syntax validation + `vm.runInNewContext` automated test runner in `tests/verify.js`).

---

## 3. Commands

```powershell
# Syntax check all JavaScript modules
node --check C:\VietHa\tester\ctfl-game\js\data-chap123.js
node --check C:\VietHa\tester\ctfl-game\js\data-chap456.js
node --check C:\VietHa\tester\ctfl-game\js\sound-fx.js
node --check C:\VietHa\tester\ctfl-game\js\app.js

# Run the automated verification suite (schemas, exam weights, DOM ID parity)
node C:\VietHa\tester\ctfl-game\tests\verify.js

# Launch locally in default browser
Start-Process "C:\VietHa\tester\ctfl-game\index.html"
```

---

## 4. Project Structure

```text
C:\VietHa\tester\
├── index.html                           → Root launcher / redirect entry to ctfl-game/index.html
├── ISTQB_CTFL_Syllabus_v4.0.1_VI_Full.md → Complete Vietnamese syllabus source of truth
├── ISTQB_CTFL_v4.0.1_VI_Chap1_2_3.md    → Chapters 1-3 source reference
├── ISTQB_CTFL_v4.0.1_VI_Chap4_5_6.md    → Chapters 4-6 source reference
└── ctfl-game\
    ├── SPEC.md                          → Architecture & contract specification (this file)
    ├── index.html                       → Main application shell & view containers
    ├── css\
    │   └── styles.css                   → Tactical Cyber-Academy design system & animations
    ├── js\
    │   ├── data-chap123.js              → Ch 1-3 metadata, cheat sheets, >=48 questions, >=24 flashcards
    │   ├── data-chap456.js              → Ch 4-6 metadata, cheat sheets, >=50 questions, >=24 flashcards
    │   ├── sound-fx.js                  → Web Audio API synthesizer & Canvas particle engine
    │   └── app.js                       → Core game engine, state management, and UI controllers
    ├── tasks\
    │   ├── plan.md                      → Technical implementation plan & dependency graph
    │   └── todo.md                      → Ordered, verifiable task breakdown & checkpoints
    └── tests\
        └── verify.js                    → Automated contract, data integrity & DOM verification script
```

---

## 5. Shared Data & DOM Contracts

### 5.1 Global Data Arrays (`js/data-chap123.js` & `js/data-chap456.js`)

Scripts load sequentially before `js/app.js`:
1. `window.CTFL_CHAPTERS_123` (3 chapters: IDs `1, 2, 3`; examWeights `8, 6, 4`)
2. `window.CTFL_QUESTIONS_123` (`>= 48` questions: Ch1 `>= 18`, Ch2 `>= 15`, Ch3 `>= 15`)
3. `window.CTFL_FLASHCARDS_123` (`>= 24` flashcards: `>= 8` per chapter)
4. `window.CTFL_CHAPTERS_456` (3 chapters: IDs `4, 5, 6`; examWeights `11, 9, 2`)
5. `window.CTFL_QUESTIONS_456` (`>= 50` questions: Ch4 `>= 22`, Ch5 `>= 18`, Ch6 `>= 10`)
6. `window.CTFL_FLASHCARDS_456` (`>= 24` flashcards: `>= 8` per chapter)

### 5.2 Code Style & Schema Examples

```javascript
// Chapter Schema Example (window.CTFL_CHAPTERS_123 / window.CTFL_CHAPTERS_456)
{
  id: 1,
  code: "CHAP-01",
  title: "Cơ bản về Kiểm thử (Fundamentals of Testing)",
  bossName: "NullPointer Overlord",
  bossTitle: "Trùm Lỗi Nhận Thức & Nguyên Lý",
  bossIcon: "👾",
  examWeight: 8, // Sum across Chapters 1..6 MUST equal 40 (8+6+4+11+9+2)
  kLevels: ["K1", "K2"],
  summary: "Bản chất kiểm thử, 7 nguyên lý bất di bất dịch, quy trình kiểm thử, tâm lý học kiểm thử và kỹ năng thiết yếu.",
  cheatSheet: [
    {
      section: "1.1",
      title: "Kiểm thử là gì & Lỗi - Khiếm khuyết - Thất bại",
      points: [
        "Error/Mistake (con người) -> Defect/Bug/Fault (trong code/tài liệu) -> Failure (hệ thống chạy sai)",
        "Kiểm thử gồm cả tĩnh (Static) và động (Dynamic), vừa Verification vừa Validation"
      ]
    }
  ]
}

// Question Schema Example (window.CTFL_QUESTIONS_123 / window.CTFL_QUESTIONS_456)
{
  id: "q1_01", // Unique string ID across entire 98+ question bank
  chapter: 1, // Integer 1..6
  section: "1.1.1",
  kLevel: "K2", // "K1" | "K2" | "K3"
  difficulty: "normal", // "easy" | "normal" | "hard"
  scenario: "Tình huống thực tế hoặc câu hỏi chuẩn thi ISTQB...",
  options: [
    "A. ...",
    "B. ...",
    "C. ...",
    "D. ..."
  ], // Exactly 4 strings
  correct: 0, // Integer 0..3
  explanation: "Giải thích chi tiết tại sao đáp án đúng theo Syllabus v4.0.1 và tại sao các đáp án bẫy lại sai.",
  mnemonic: "Mẹo nhớ nhanh cực kỳ ấn tượng để không bao giờ quên!"
}

// Flashcard Schema Example (window.CTFL_FLASHCARDS_123 / window.CTFL_FLASHCARDS_456)
{
  id: "fc1_01",
  chapter: 1,
  section: "1.3",
  term: "7 Nguyên lý Kiểm thử (7 Testing Principles)",
  definition: "1. Chứng minh sự hiện diện của lỗi... 2. Không thể kiểm thử vét cạn...",
  memoryHook: "Hiện - Vét - Sớm - Cụm - Thuốc - Ngữ - Ảo"
}
```

### 5.3 Canonical DOM ID Contract (`index.html` ↔ `js/app.js`)

Every `document.getElementById(...)` call in `js/app.js` MUST match an element in `index.html`:
- **HUD & Global**: `fx-canvas`, `hud-level`, `hud-rank`, `hud-xp-text`, `hud-xp-bar`, `hud-streak`, `hud-bugs-smashed`, `hud-accuracy`, `btn-sound-toggle`, `btn-theme-toggle`, `btn-reset-progress`.
- **Views**: `view-campaign`, `view-arena`, `view-exam`, `view-blitz`, `view-flashcards`, `view-codex`.
- **Campaign Hub**: `daily-quest-box`, `chapter-grid`, `btn-mistake-raid`, `mistake-count`.
- **Battle Arena**: `btn-arena-exit`, `arena-mode-title`, `arena-progress-text`, `arena-progress-bar`, `arena-timer`, `player-hp-bar`, `player-hp-text`, `player-combo-badge`, `boss-avatar`, `boss-name`, `boss-title`, `boss-hp-bar`, `boss-hp-text`, `boss-dialogue`, `powerup-5050`, `powerup-freeze`, `powerup-peek`, `powerup-shield`, `q-chapter-badge`, `q-section-badge`, `q-klevel-badge`, `q-difficulty-badge`, `q-scenario-text`, `q-options-list`, `q-peek-box`, `q-feedback-panel`, `q-feedback-title`, `q-explanation-text`, `q-mnemonic-text`, `btn-next-question`.
- **Mock Exam**: `exam-intro-card`, `btn-start-exam`, `exam-workspace`, `exam-timer`, `exam-q-counter`, `btn-exam-flag`, `btn-exam-submit`, `exam-q-card`, `exam-options-list`, `btn-exam-prev`, `btn-exam-next`, `exam-nav-grid`, `exam-result-panel`, `exam-score-big`, `exam-pass-badge`, `exam-time-taken`, `exam-chapter-breakdown`, `exam-review-list`, `btn-exam-retry`.
- **Speed Blitz**: `blitz-intro`, `btn-start-blitz`, `blitz-workspace`, `blitz-timer`, `blitz-score`, `blitz-multiplier`, `blitz-q-box`, `blitz-result`.
- **Flashcards**: `fc-chapter-filter`, `fc-counter`, `fc-card`, `fc-front-term`, `fc-front-meta`, `fc-back-def`, `fc-back-hook`, `btn-fc-flip`, `btn-fc-prev`, `btn-fc-next`, `btn-fc-know`, `btn-fc-review`.
- **Codex & Analytics**: `codex-search`, `codex-chapter-tabs`, `codex-content`, `achievements-grid`, `mastery-chart`.
- **Result Modal**: `modal-result`, `result-title`, `result-subtitle`, `result-stats`, `btn-result-continue`, `btn-result-retry`.

---

## 6. Testing Strategy

Automated verification is executed via `node C:\VietHa\tester\ctfl-game\tests\verify.js`:
1. **Artifact Presence**: Confirms `SPEC.md`, `tasks/plan.md`, and `tasks/todo.md` exist and are non-empty.
2. **Syntax Check**: Runs `node --check` on `data-chap123.js`, `data-chap456.js`, `sound-fx.js`, and `app.js`.
3. **VM Sandbox Data Integrity**: Executes `data-chap123.js` and `data-chap456.js` inside `vm.runInNewContext({ window: {} })` to assert:
   - All 6 chapters exist with valid `id` (1..6), `title`, `bossName`, `cheatSheet` (non-empty array), and `examWeight` summing to `40` (`8 + 6 + 4 + 11 + 9 + 2 = 40`).
   - Total questions `>= 95` (`>= 48` in 1–3, `>= 50` in 4–6), unique `id`s, valid `kLevel` (`K1`/`K2`/`K3`), `options.length === 4`, `correct` in `0..3`, non-empty `explanation` and `mnemonic`.
   - Per-chapter question counts exceed mock exam weights (`Ch1 >= 8`, `Ch2 >= 6`, `Ch3 >= 4`, `Ch4 >= 11`, `Ch5 >= 9`, `Ch6 >= 2`).
   - Total flashcards `>= 48` (`>= 24` in 1–3, `>= 24` in 4–6) with non-empty `id`, `term`, `definition`, and `memoryHook`.
4. **DOM ID Contract Parity**: Parses `js/app.js` for all `getElementById('...')` references and verifies every referenced ID exists in `index.html`.
5. **Runtime Smoke Simulation**: Simulates DOM initialization in a sandboxed context to verify zero uncaught ReferenceErrors or TypeErrors on startup.

---

## 7. Boundaries

- **Always do:**
  - Respect strict file ownership per agent module (`spec-planner`, `content-chap123`, `content-chap456`, `ui-designer`, `game-engine`, `verifier`).
  - Ground every question, explanation, and cheat sheet point in the official ISTQB CTFL v4.0.1 Vietnamese Syllabus.
  - Validate JavaScript syntax with `node --check` after editing any `.js` file.
- **Ask first:**
  - Changing any canonical DOM ID in `index.html` or `js/app.js`.
  - Modifying the global `window.CTFL_*` variable names or object schemas.
- **Never do:**
  - Introduce external npm runtime dependencies or build steps that break direct `index.html` browser loading.
  - Edit files outside your assigned ownership list.
  - Use placeholder or truncated questions (`"..."`) in the question or flashcard banks.

---

## 8. Success Criteria

- [ ] `SPEC.md`, `tasks/plan.md`, and `tasks/todo.md` are complete and aligned with all module contracts.
- [ ] `window.CTFL_CHAPTERS_123` + `window.CTFL_CHAPTERS_456` define all 6 chapters with rich cheat sheets and `examWeight` summing to `40`.
- [ ] Question bank totals `>= 98` authentic ISTQB v4.0.1 questions (including K3 calculation problems for EP, 2/3-value BVA, Decision Table, State Transition, Statement/Branch Coverage, and Three-Point Estimation).
- [ ] Flashcard bank totals `>= 48` cards across Chapters 1–6 with memory hooks.
- [ ] All 5 views (`Campaign/Arena`, `Exam`, `Blitz`, `Flashcards`, `Codex`) and Web Audio SFX operate with zero console errors and 100% DOM ID parity.
- [ ] `node C:\VietHa\tester\ctfl-game\tests\verify.js` passes 100% of checks.

---

## 9. Open Questions

- None — all syllabus sources, exam weights, DOM contracts, and verification gates are fully specified.
