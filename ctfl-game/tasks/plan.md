# Implementation Plan: CTFL Bug Hunter: Cyber Arena

## Overview

**CTFL Bug Hunter: Cyber Arena** is a zero-dependency, browser-native gamified learning platform built to master the **ISTQB CTFL v4.0.1 Vietnamese Syllabus**. The system combines a Tactical Cyber-Academy dark/light UI with five interactive learning modes: Campaign Boss Raids (with HP, combo multipliers, and tactical power-ups), an Official 40-Question / 60-Minute Mock Exam Simulator weighted strictly by ISTQB v4.0.1 syllabus rules, a 60-second Bug Smasher Blitz mode, Spaced Repetition (SRS) Mistake Graveyard (*Sổ Thù Vặt*) & 3D Flip Flashcards, and a searchable Syllabus Codex with Mastery Analytics.

---

## Dependency Graph

```text
SPEC.md & Shared Contracts (spec-planner)
    │
    ├──► Chapters 1-3 Data Bank: js/data-chap123.js (content-chap123) ──┐
    │      • CTFL_CHAPTERS_123 (Ch 1..3, weights 8,6,4)                 │
    │      • CTFL_QUESTIONS_123 (>=48 questions)                        │
    │      • CTFL_FLASHCARDS_123 (>=24 flashcards)                      │
    │                                                                   │
    ├──► Chapters 4-6 Data Bank: js/data-chap456.js (content-chap456) ──┼──► Audio & Game Engine (game-engine)
    │      • CTFL_CHAPTERS_456 (Ch 4..6, weights 11,9,2)                │      • js/sound-fx.js (CTFLSound, CTFLParticles)
    │      • CTFL_QUESTIONS_456 (>=50 questions, K3 labs)               │      • js/app.js (State, 5 Views, SRS, Exam)
    │      • CTFL_FLASHCARDS_456 (>=24 flashcards)                      │              │
    │                                                                   │              ▼
    └──► Tactical Cyber UI & Styles (ui-designer) ──────────────────────┘    Automated QA Suite (verifier)
           • ctfl-game/index.html (Canonical DOM IDs)                          • tests/verify.js (Syntax, VM Schema,
           • ctfl-game/css/styles.css (Animations, Responsive, Light/Dark)       Exam Weights, DOM ID Parity)
           • index.html (Root Launcher)
```

---

## Architecture Decisions

1. **Global Window Data Contract over ES Module Bundling**:
   - *Decision*: Expose chapter, question, and flashcard datasets on `window` (`window.CTFL_CHAPTERS_123`, `window.CTFL_QUESTIONS_123`, `window.CTFL_FLASHCARDS_123`, `window.CTFL_CHAPTERS_456`, `window.CTFL_QUESTIONS_456`, `window.CTFL_FLASHCARDS_456`) and load scripts in deterministic order (`data-chap123.js` → `data-chap456.js` → `sound-fx.js` → `app.js`).
   - *Rationale*: Works directly over `file://` protocol without CORS errors or requiring a local Node/Vite server, while allowing parallel authoring by two content agents (`content-chap123` and `content-chap456`) with zero merge conflicts.

2. **Procedural Web Audio Synthesizer (`window.CTFLSound`)**:
   - *Decision*: Synthesize all UI, combat, combo, power-up, and exam feedback sounds using the native Web Audio API (`AudioContext` oscillators and gain envelopes).
   - *Rationale*: Eliminates external `.mp3`/`.wav` asset loading failures, works offline immediately, and supports dynamic pitch scaling for combo streaks.

3. **Single-Key Versioned `localStorage` Store (`ctfl_cyber_arena_v1`)**:
   - *Decision*: Consolidate XP, level, rank, streak, chapter mastery, boss defeat flags, Mistake Graveyard (`mistakes` array with 2-hit clearance counter), flashcard SRS states, exam history, and unlocked achievements into a single JSON state tree with safe fallback defaults.
   - *Rationale*: Simplifies state hydration, reset (`#btn-reset-progress`), and fault tolerance if `localStorage` is empty or cleared.

4. **Strict DOM ID Contract Verification**:
   - *Decision*: Pre-define every interactive DOM ID in `SPEC.md` and verify 100% parity between `app.js` `getElementById` calls and `index.html` elements via `tests/verify.js`.
   - *Rationale*: Prevents null-reference runtime bugs when `ui-designer` and `game-engine` work in parallel.

---

## Task List Index

Detailed task descriptions, acceptance criteria, and verification commands are recorded in `tasks/todo.md`.

### Phase 1: Specification & Contract Foundation
- [x] **Task 1**: Author `SPEC.md`, `tasks/plan.md`, and `tasks/todo.md` defining all schemas, DOM IDs, and verification gates (`@spec-planner`).

### Checkpoint 1: Foundation Contracts Locked
- [x] `SPEC.md`, `tasks/plan.md`, and `tasks/todo.md` written and aligned with all agent briefs.

### Phase 2: Parallel Content & UI Engineering
- [ ] **Task 2**: Author Chapters 1–3 syllabus cheat sheets, >=48 questions, and >=24 flashcards in `js/data-chap123.js` (`@content-chap123`).
- [ ] **Task 3**: Author Chapters 4–6 syllabus cheat sheets, >=50 questions (with K3 calculation problems), and >=24 flashcards in `js/data-chap456.js` (`@content-chap456`).
- [ ] **Task 4**: Build Tactical Cyber-Academy UI in `ctfl-game/index.html`, `ctfl-game/css/styles.css`, and root launcher `index.html` (`@ui-designer`).

### Checkpoint 2: Content & UI Readiness
- [ ] `node --check` passes on `js/data-chap123.js` and `js/data-chap456.js`.
- [ ] All canonical DOM IDs exist in `ctfl-game/index.html`.

### Phase 3: Audio Synthesizer, Particle FX & Core Game Engine
- [ ] **Task 5**: Implement procedural Web Audio synthesizer (`window.CTFLSound`) and Canvas particle engine (`window.CTFLParticles`) in `js/sound-fx.js` (`@game-engine`).
- [ ] **Task 6**: Implement core state manager, Campaign Boss Raid & Battle Arena, Power-ups, and Mistake Graveyard (*Sổ Thù Vặt*) in `js/app.js` (`@game-engine`).
- [ ] **Task 7**: Implement Official 40-Question Mock Exam Simulator, 60s Bug Smasher Blitz, 3D SRS Flashcards, and Syllabus Codex + Mastery Analytics in `js/app.js` (`@game-engine`).

### Checkpoint 3: Engine Integration Complete
- [ ] `node --check` passes on `js/sound-fx.js` and `js/app.js`.
- [ ] Every `getElementById` in `js/app.js` matches `ctfl-game/index.html`.

### Phase 4: End-to-End Automated Verification
- [ ] **Task 8**: Author and execute `tests/verify.js` to validate file presence, JS syntax, VM sandbox data schemas, mock exam weights (sum = 40), and DOM ID parity (`@verifier`).

### Checkpoint 4: Release Ready
- [ ] `node C:\VietHa\tester\ctfl-game\tests\verify.js` exits with code `0` and 100% checks passing.

---

## Parallelization Opportunities

- **Parallel Wave 1**: `@spec-planner`, `@content-chap123`, `@content-chap456`, and `@ui-designer` can execute concurrently because the data schemas and DOM IDs are pre-established in the shared contract and each agent writes to strictly disjoint files.
- **Sequential Wave 2**: `@game-engine` writes `js/sound-fx.js` and `js/app.js`, cross-checking `ctfl-game/index.html` once `@ui-designer` finishes to guarantee 100% DOM ID alignment.
- **Verification Gate (Wave 3)**: `@verifier` runs `tests/verify.js` across all artifacts and reports any mismatch back to the specific file owner before final sign-off.

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| DOM ID mismatch between `index.html` and `js/app.js` | High (Runtime `TypeError: Cannot set properties of null`) | Canonical ID list documented in `SPEC.md`; `@game-engine` inspects `index.html` before finalizing; `@verifier` runs static AST/regex ID parity check in `tests/verify.js`. |
| Duplicate question or flashcard IDs across `data-chap123.js` and `data-chap456.js` | Medium (Incorrect SRS or Mistake Graveyard lookup) | Prefix IDs by chapter (`q1_01`..`q3_xx` in `data-chap123.js`, `q4_01`..`q6_xx` in `data-chap456.js`, `fc1_01`..`fc6_xx`); `tests/verify.js` asserts 100% ID uniqueness. |
| Browser autoplay policy blocks `AudioContext` on initial load | Low (Muted sound until interaction) | Lazy-initialize or resume `AudioContext` inside the first user click/keydown gesture handler in `sound-fx.js` and wrap in `try/catch`. |
| Mock Exam generator fails if a chapter has fewer questions than its official weight | High (Broken exam generation) | Enforce minimum question pool sizes (`Ch1>=18`, `Ch2>=15`, `Ch3>=15`, `Ch4>=22`, `Ch5>=18`, `Ch6>=10`) well above exam weights (`8, 6, 4, 11, 9, 2`) and include graceful fallback in `app.js`. |

---

## Open Questions

- None. All technical requirements and contracts are locked.
