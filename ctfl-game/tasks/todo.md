# Task Breakdown: CTFL Bug Hunter: Cyber Arena

## Task 1: Specification & Architecture Contract (`@spec-planner`)

**Description:** Document the complete technical specification, capability map, shared global data schemas (`window.CTFL_*`), canonical DOM ID contract, implementation plan, and ordered task breakdown for **CTFL Bug Hunter: Cyber Arena**.

**Acceptance criteria:**
- [x] `SPEC.md` documents all 5 game modes, shared data schemas, canonical DOM IDs, testing strategy, and boundaries.
- [x] `tasks/plan.md` documents the dependency graph, architecture decisions, parallelization strategy, and risk mitigations.
- [x] `tasks/todo.md` breaks the project into small, verifiable tasks with checkpoints.

**Verification:**
- [x] Manual check: Verify `C:\VietHa\tester\ctfl-game\SPEC.md`, `C:\VietHa\tester\ctfl-game\tasks\plan.md`, and `C:\VietHa\tester\ctfl-game\tasks\todo.md` exist and are non-empty.

**Dependencies:** None

**Files likely touched:**
- `C:\VietHa\tester\ctfl-game\SPEC.md`
- `C:\VietHa\tester\ctfl-game\tasks\plan.md`
- `C:\VietHa\tester\ctfl-game\tasks\todo.md`

**Estimated scope:** Medium (3 files)

---

## Task 2: Chapters 1–3 Content & Question Bank (`@content-chap123`)

**Description:** Extract authentic Vietnamese ISTQB CTFL v4.0.1 knowledge from `ISTQB_CTFL_v4.0.1_VI_Chap1_2_3.md` to populate `window.CTFL_CHAPTERS_123`, `window.CTFL_QUESTIONS_123`, and `window.CTFL_FLASHCARDS_123` in `js/data-chap123.js`.

**Acceptance criteria:**
- [ ] `window.CTFL_CHAPTERS_123` defines Chapters 1, 2, and 3 with `examWeight` values `8, 6, 4`, boss metadata, and 4–6 rich `cheatSheet` sections per chapter covering sub-sections `1.1–1.5`, `2.1–2.3`, and `3.1–3.2`.
- [ ] `window.CTFL_QUESTIONS_123` contains `>= 48` exam-style questions (`>= 18` for Ch1, `>= 15` for Ch2, `>= 15` for Ch3) with 4 options, valid `correct` (`0..3`), detailed `explanation`, and `mnemonic`.
- [ ] `window.CTFL_FLASHCARDS_123` contains `>= 24` flashcards (`>= 8` per chapter) with `term`, `definition`, and `memoryHook`.

**Verification:**
- [ ] Syntax check passes: `node --check C:\VietHa\tester\ctfl-game\js\data-chap123.js`
- [ ] Schema check passes via `node C:\VietHa\tester\ctfl-game\tests\verify.js`

**Dependencies:** Task 1

**Files likely touched:**
- `C:\VietHa\tester\ctfl-game\js\data-chap123.js`

**Estimated scope:** Small (1 file)

---

## Task 3: Chapters 4–6 Content & K3 Calculation Bank (`@content-chap456`)

**Description:** Extract authentic Vietnamese ISTQB CTFL v4.0.1 knowledge from `ISTQB_CTFL_v4.0.1_VI_Chap4_5_6.md` to populate `window.CTFL_CHAPTERS_456`, `window.CTFL_QUESTIONS_456`, and `window.CTFL_FLASHCARDS_456` in `js/data-chap456.js`.

**Acceptance criteria:**
- [ ] `window.CTFL_CHAPTERS_456` defines Chapters 4, 5, and 6 with `examWeight` values `11, 9, 2`, boss metadata, and 4–6 rich `cheatSheet` sections per chapter covering sub-sections `4.1–4.5`, `5.1–5.5`, and `6.1–6.2`.
- [ ] `window.CTFL_QUESTIONS_456` contains `>= 50` exam-style questions (`>= 22` for Ch4 including K3 calculation problems for EP, 2/3-value BVA, Decision Table, State Transition, Statement/Branch Coverage; `>= 18` for Ch5 including 3-point estimation `E=(O+4M+P)/6`, `SD=(P-O)/6`, Risk Matrix, Test Pyramid, Defect Report; `>= 10` for Ch6).
- [ ] `window.CTFL_FLASHCARDS_456` contains `>= 24` flashcards (`>= 8` per chapter) with `term`, `definition`, and `memoryHook`.

**Verification:**
- [ ] Syntax check passes: `node --check C:\VietHa\tester\ctfl-game\js\data-chap456.js`
- [ ] Schema check passes via `node C:\VietHa\tester\ctfl-game\tests\verify.js`

**Dependencies:** Task 1

**Files likely touched:**
- `C:\VietHa\tester\ctfl-game\js\data-chap456.js`

**Estimated scope:** Small (1 file)

---

## Task 4: Tactical Cyber-Academy UI, Animations & Launcher (`@ui-designer`)

**Description:** Build the responsive HTML5 structure (`ctfl-game/index.html`), Tactical Cyber-Academy stylesheet (`ctfl-game/css/styles.css`) with dark/light mode (`[data-theme="light"]`), 3D flashcard flip, boss hit animations, and root launcher (`C:\VietHa\tester\index.html`).

**Acceptance criteria:**
- [ ] `ctfl-game/index.html` includes all canonical DOM IDs for the Top HUD, `#view-campaign`, `#view-arena`, `#view-exam`, `#view-blitz`, `#view-flashcards`, `#view-codex`, and `#modal-result`, plus the exact 4-script loading sequence at the bottom.
- [ ] `ctfl-game/css/styles.css` implements the deep obsidian (`#090D16`) / neon cyan (`#06B6D4`) tactical palette, Light Mode theme toggle, 3D card perspective flip, boss damage shake, and responsive breakpoints (`320px`, `768px`, `1024px`, `1440px`).
- [ ] `C:\VietHa\tester\index.html` provides a clean launcher/redirect into `ctfl-game/index.html`.

**Verification:**
- [ ] DOM ID contract check passes in `node C:\VietHa\tester\ctfl-game\tests\verify.js`
- [ ] Manual check: Open `C:\VietHa\tester\ctfl-game\index.html` and verify layout across desktop and mobile viewports.

**Dependencies:** Task 1

**Files likely touched:**
- `C:\VietHa\tester\ctfl-game\index.html`
- `C:\VietHa\tester\ctfl-game\css\styles.css`
- `C:\VietHa\tester\index.html`

**Estimated scope:** Medium (3 files)

---

## Checkpoint: After Tasks 1–4 (Data & UI Foundation)
- [ ] `SPEC.md`, `tasks/plan.md`, and `tasks/todo.md` are complete.
- [ ] `node --check` passes on `js/data-chap123.js` and `js/data-chap456.js`.
- [ ] All 6 chapters, `>= 98` questions, and `>= 48` flashcards are populated.
- [ ] `ctfl-game/index.html` and `ctfl-game/css/styles.css` contain all required DOM IDs and styling rules.

---

## Task 5: Web Audio Synthesizer & Canvas Particle Engine (`@game-engine`)

**Description:** Build `window.CTFLSound` (procedural Web Audio API sound effects) and `window.CTFLParticles` (2D `<canvas id="fx-canvas">` particle bursts) in `js/sound-fx.js`.

**Acceptance criteria:**
- [ ] `window.CTFLSound` implements `click()`, `select()`, `correct(combo)`, `wrong()`, `criticalHit()`, `bossDefeat()`, `powerup()`, `levelUp()`, `tick()`, `examFinish(passed)`, and `toggle()` with mute state saved in `localStorage`.
- [ ] `window.CTFLParticles` binds to `#fx-canvas` and renders celebratory particle bursts on correct answers, combo streaks, and boss defeats.

**Verification:**
- [ ] Syntax check passes: `node --check C:\VietHa\tester\ctfl-game\js\sound-fx.js`

**Dependencies:** Task 4

**Files likely touched:**
- `C:\VietHa\tester\ctfl-game\js\sound-fx.js`

**Estimated scope:** Small (1 file)

---

## Task 6: State Manager, Campaign Raid, Boss Combat & Power-Ups (`@game-engine`)

**Description:** Implement data merging (`CTFL_CHAPTERS_123` + `456`, `CTFL_QUESTIONS_123` + `456`, `CTFL_FLASHCARDS_123` + `456`), `localStorage` persistence (`ctfl_cyber_arena_v1`), Campaign Hub (`#view-campaign`), and Active Boss Battle Arena (`#view-arena`) in `js/app.js`.

**Acceptance criteria:**
- [ ] Merges all 6 chapters, questions, and flashcards cleanly and persists player XP, Level, Rank titles, Daily Streak, Daily Quest, Chapter Mastery %, Boss defeated flags, Mistake Graveyard (`mistakes`), and 10+ Achievements in `localStorage`.
- [ ] Campaign Arena (`#view-arena`) supports 6 Chapter Boss raids, Quick Practice All, K3 Practical Lab, and Mistake Graveyard (*Sổ Thù Vặt* — clearing a mistake after 2 correct answers).
- [ ] Implements Player HP (100) vs. Boss HP (100), K-level + Combo scaled damage (`K1=12`, `K2=15`, `K3=20`), 4 Power-ups (`50/50 Bug Filter`, `Time Freeze`, `Syllabus Peek`, `Shield Repair`), and keyboard shortcuts (`1-4`, `A-D`, `Enter`/`Space`).

**Verification:**
- [ ] Syntax check passes: `node --check C:\VietHa\tester\ctfl-game\js\app.js`

**Dependencies:** Tasks 2, 3, 4, 5

**Files likely touched:**
- `C:\VietHa\tester\ctfl-game\js\app.js`

**Estimated scope:** Small (1 file)

---

## Task 7: Mock Exam Simulator, 60s Blitz, 3D Flashcards & Codex (`@game-engine`)

**Description:** Complete `js/app.js` by implementing the Official 40-Question ISTQB Mock Exam Simulator (`#view-exam`), 60s Bug Smasher Blitz (`#view-blitz`), 3D SRS Flashcards (`#view-flashcards`), and Searchable Syllabus Codex & Mastery Analytics (`#view-codex`).

**Acceptance criteria:**
- [ ] Mock Exam (`#view-exam`) draws 40 questions weighted strictly by ISTQB v4.0.1 (`Ch1=8, Ch2=6, Ch3=4, Ch4=11, Ch5=9, Ch6=2`), runs a 60:00 timer, supports question flagging and 40-pill navigation grid, and evaluates Pass/Fail (`>= 26/40 = 65%`) with per-chapter breakdown and full answer review.
- [ ] Speed Blitz (`#view-blitz`) runs a 60s rapid-fire timer with `1x–5x` combo multiplier, `+2s` streak time bonus, and high-score tracking.
- [ ] Flashcards (`#view-flashcards`) & Codex (`#view-codex`) support chapter/SRS filtering, 3D card flip (`Click`/`Space`/`F`), real-time syllabus search, mastery bars, and achievement cards.

**Verification:**
- [ ] Syntax check passes: `node --check C:\VietHa\tester\ctfl-game\js\app.js`
- [ ] DOM ID parity check confirms 100% of `getElementById` calls in `js/app.js` exist in `ctfl-game/index.html`.

**Dependencies:** Task 6

**Files likely touched:**
- `C:\VietHa\tester\ctfl-game\js\app.js`

**Estimated scope:** Small (1 file)

---

## Checkpoint: After Tasks 5–7 (Full Application Integration)
- [ ] `node --check` passes on both `js/sound-fx.js` and `js/app.js`.
- [ ] All 5 navigation tabs (`campaign`, `exam`, `blitz`, `flashcards`, `codex`) and `#view-arena` bind cleanly without missing DOM IDs.

---

## Task 8: Automated QA & Contract Verification Suite (`@verifier`)

**Description:** Write and execute `tests/verify.js` to validate all specification files, JS syntax, VM-sandboxed chapter/question/flashcard schemas, exam weight distribution, DOM ID parity, and initialization safety.

**Acceptance criteria:**
- [ ] Verifies `SPEC.md`, `tasks/plan.md`, and `tasks/todo.md` exist.
- [ ] Verifies `node --check` passes on `data-chap123.js`, `data-chap456.js`, `sound-fx.js`, and `app.js`.
- [ ] Verifies in `vm.runInNewContext` that Chapters 1–6 exist with `examWeight` summing to `40` (`8+6+4+11+9+2`), total questions `>= 95` with unique IDs and valid fields, per-chapter question counts >= exam weights, and flashcards `>= 48`.
- [ ] Verifies every `getElementById('...')` in `js/app.js` exists in `ctfl-game/index.html` and simulated initialization throws zero errors.

**Verification:**
- [ ] Automated test command passes 100%: `node C:\VietHa\tester\ctfl-game\tests\verify.js`

**Dependencies:** Tasks 1, 2, 3, 4, 5, 6, 7

**Files likely touched:**
- `C:\VietHa\tester\ctfl-game\tests\verify.js`

**Estimated scope:** Small (1 file)

---

## Final Checkpoint: Release Sign-Off
- [ ] All tasks 1–8 completed and verified.
- [ ] `node C:\VietHa\tester\ctfl-game\tests\verify.js` passes 100% of assertions.
- [ ] `@verifier` posts verification report to `@coordinator`.
