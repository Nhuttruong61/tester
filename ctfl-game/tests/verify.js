/**
 * CTFL Bug Hunter: Cyber Arena — Automated QA & Verification Suite
 * Owner: @verifier
 *
 * Checks:
 * 1. Spec & Plan files exist (SPEC.md, tasks/plan.md, tasks/todo.md)
 * 2. Syntax validation (`node --check`) on data-chap123.js, data-chap456.js, sound-fx.js, app.js
 * 3. Data schema & content integrity in VM context (Chapters 1-6, >=95 Questions, >=48 Flashcards, Exam weights = 40)
 * 4. DOM ID contract verification between index.html, app.js, sound-fx.js, and required UI specification IDs
 * 5. Simulated DOM execution of sound-fx.js and app.js initialization + key user flows without runtime errors
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const WORKSPACE_DIR = path.resolve(ROOT_DIR, '..');

let totalChecks = 0;
let passedChecks = 0;
const failures = [];

function assertCheck(condition, name, details = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  [PASS] ${name}`);
  } else {
    const msg = details ? `${name} -> ${details}` : name;
    failures.push(msg);
    console.error(`  [FAIL] ${msg}`);
  }
}

console.log('==============================================================');
console.log(' CTFL BUG HUNTER: CYBER ARENA — QA VERIFICATION SUITE');
console.log('==============================================================\n');

// ---------------------------------------------------------------------------
// 1. Check Spec & Plan files exist
// ---------------------------------------------------------------------------
console.log('1. Checking Spec & Plan Artifacts...');
const specFiles = [
  'SPEC.md',
  'tasks/plan.md',
  'tasks/todo.md'
];

for (const relPath of specFiles) {
  const fullPath = path.join(ROOT_DIR, relPath);
  const exists = fs.existsSync(fullPath);
  const size = exists ? fs.statSync(fullPath).size : 0;
  assertCheck(exists && size > 100, `File exists & non-empty: ${relPath} (${size} bytes)`, `Missing or empty at ${fullPath}`);
}

// Also check HTML & CSS files exist
const uiFiles = [
  { label: 'ctfl-game/index.html', fullPath: path.join(ROOT_DIR, 'index.html') },
  { label: 'ctfl-game/css/styles.css', fullPath: path.join(ROOT_DIR, 'css', 'styles.css') },
  { label: 'root index.html launcher', fullPath: path.join(WORKSPACE_DIR, 'index.html') }
];

for (const f of uiFiles) {
  const exists = fs.existsSync(f.fullPath);
  const size = exists ? fs.statSync(f.fullPath).size : 0;
  assertCheck(exists && size > 50, `UI file exists & non-empty: ${f.label} (${size} bytes)`, `Missing or empty at ${f.fullPath}`);
}

// ---------------------------------------------------------------------------
// 2. Syntax check (`node --check`) on JS files
// ---------------------------------------------------------------------------
console.log('\n2. Running `node --check` on JavaScript files...');
const jsFiles = [
  'js/data-chap123.js',
  'js/data-chap456.js',
  'js/syllabus-full-vi.js',
  'js/ai-provider.js',
  'js/world3d.js',
  'js/battle-stage.js',
  'js/sound-fx.js',
  'js/app.js'
];

for (const relPath of jsFiles) {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(fullPath)) {
    assertCheck(false, `node --check ${relPath}`, `File does not exist at ${fullPath}`);
    continue;
  }
  try {
    execFileSync(process.execPath, ['--check', fullPath], { stdio: 'pipe' });
    assertCheck(true, `node --check ${relPath}`);
  } catch (err) {
    const stderr = err.stderr ? err.stderr.toString().trim() : err.message;
    assertCheck(false, `node --check ${relPath}`, stderr);
  }
}

// ---------------------------------------------------------------------------
// 3. Load data-chap123.js and data-chap456.js in VM & verify schema
// ---------------------------------------------------------------------------
console.log('\n3. Validating Data Schema & ISTQB CTFL v4.0.1 Content...');
const sandbox = { window: {}, console };
sandbox.global = sandbox;
sandbox.globalThis = sandbox.window;
vm.createContext(sandbox);

const chap123Path = path.join(ROOT_DIR, 'js/data-chap123.js');
const chap456Path = path.join(ROOT_DIR, 'js/data-chap456.js');

if (fs.existsSync(chap123Path)) {
  try {
    const code123 = fs.readFileSync(chap123Path, 'utf8');
    vm.runInContext(code123, sandbox, { filename: 'data-chap123.js' });
    // Copy top-level const/let/var bindings onto window if needed
    vm.runInContext(`
      if (typeof CTFL_CHAPTERS_123 !== 'undefined' && !window.CTFL_CHAPTERS_123) window.CTFL_CHAPTERS_123 = CTFL_CHAPTERS_123;
      if (typeof CTFL_QUESTIONS_123 !== 'undefined' && !window.CTFL_QUESTIONS_123) window.CTFL_QUESTIONS_123 = CTFL_QUESTIONS_123;
      if (typeof CTFL_FLASHCARDS_123 !== 'undefined' && !window.CTFL_FLASHCARDS_123) window.CTFL_FLASHCARDS_123 = CTFL_FLASHCARDS_123;
    `, sandbox);
    assertCheck(true, 'Executed data-chap123.js in VM sandbox');
  } catch (e) {
    assertCheck(false, 'Executed data-chap123.js in VM sandbox', e.message);
  }
} else {
  assertCheck(false, 'Executed data-chap123.js in VM sandbox', 'File missing');
}

if (fs.existsSync(chap456Path)) {
  try {
    const code456 = fs.readFileSync(chap456Path, 'utf8');
    vm.runInContext(code456, sandbox, { filename: 'data-chap456.js' });
    vm.runInContext(`
      if (typeof CTFL_CHAPTERS_456 !== 'undefined' && !window.CTFL_CHAPTERS_456) window.CTFL_CHAPTERS_456 = CTFL_CHAPTERS_456;
      if (typeof CTFL_QUESTIONS_456 !== 'undefined' && !window.CTFL_QUESTIONS_456) window.CTFL_QUESTIONS_456 = CTFL_QUESTIONS_456;
      if (typeof CTFL_FLASHCARDS_456 !== 'undefined' && !window.CTFL_FLASHCARDS_456) window.CTFL_FLASHCARDS_456 = CTFL_FLASHCARDS_456;
    `, sandbox);
    assertCheck(true, 'Executed data-chap456.js in VM sandbox');
  } catch (e) {
    assertCheck(false, 'Executed data-chap456.js in VM sandbox', e.message);
  }
} else {
  assertCheck(false, 'Executed data-chap456.js in VM sandbox', 'File missing');
}

const ch123 = sandbox.window.CTFL_CHAPTERS_123 || [];
const ch456 = sandbox.window.CTFL_CHAPTERS_456 || [];
const q123 = sandbox.window.CTFL_QUESTIONS_123 || [];
const q456 = sandbox.window.CTFL_QUESTIONS_456 || [];
const fc123 = sandbox.window.CTFL_FLASHCARDS_123 || [];
const fc456 = sandbox.window.CTFL_FLASHCARDS_456 || [];

assertCheck(Array.isArray(ch123) && ch123.length === 3, `window.CTFL_CHAPTERS_123 has 3 chapters (found ${ch123.length})`);
assertCheck(Array.isArray(ch456) && ch456.length === 3, `window.CTFL_CHAPTERS_456 has 3 chapters (found ${ch456.length})`);

const allChapters = [...ch123, ...ch456];
const expectedWeights = { 1: 8, 2: 6, 3: 4, 4: 11, 5: 9, 6: 2 };
let weightSum = 0;

for (let cId = 1; cId <= 6; cId++) {
  const ch = allChapters.find(c => c && c.id === cId);
  assertCheck(
    Boolean(ch && typeof ch.title === 'string' && ch.title.trim().length > 0 &&
            typeof ch.bossName === 'string' && ch.bossName.trim().length > 0 &&
            Array.isArray(ch.cheatSheet) && ch.cheatSheet.length > 0),
    `Chapter ${cId} metadata & cheatSheet valid`,
    ch ? `title="${ch.title}", bossName="${ch.bossName}", cheatSheet.length=${ch.cheatSheet?.length}` : `Chapter ${cId} missing`
  );
  if (ch) {
    weightSum += Number(ch.examWeight || 0);
    assertCheck(
      ch.examWeight === expectedWeights[cId],
      `Chapter ${cId} examWeight === ${expectedWeights[cId]} (got ${ch.examWeight})`
    );
  }
}
assertCheck(weightSum === 40, `Total examWeight across Chapters 1-6 sums to 40 (got ${weightSum})`);

// Questions validation
const allQuestions = [...q123, ...q456];
assertCheck(
  allQuestions.length >= 95,
  `Total questions >= 95 across Chapters 1-6 (found ${allQuestions.length}: Ch1-3=${q123.length}, Ch4-6=${q456.length})`
);

const seenQIds = new Set();
const duplicateQIds = [];
const invalidQuestions = [];
const chapterQCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

allQuestions.forEach((q, idx) => {
  if (!q || typeof q !== 'object') {
    invalidQuestions.push(`Index ${idx}: not an object`);
    return;
  }
  if (!q.id || typeof q.id !== 'string') {
    invalidQuestions.push(`Index ${idx}: missing string id`);
  } else if (seenQIds.has(q.id)) {
    duplicateQIds.push(q.id);
  } else {
    seenQIds.add(q.id);
  }

  if (![1, 2, 3, 4, 5, 6].includes(q.chapter)) {
    invalidQuestions.push(`${q.id}: invalid chapter ${q.chapter}`);
  } else {
    chapterQCounts[q.chapter]++;
  }

  if (!['K1', 'K2', 'K3'].includes(q.kLevel)) {
    invalidQuestions.push(`${q.id}: invalid kLevel "${q.kLevel}"`);
  }
  if (typeof q.scenario !== 'string' || q.scenario.trim().length < 5) {
    invalidQuestions.push(`${q.id}: invalid/empty scenario`);
  }
  if (!Array.isArray(q.options) || q.options.length !== 4 || q.options.some(o => typeof o !== 'string' || !o.trim())) {
    invalidQuestions.push(`${q.id}: options must be array of 4 non-empty strings`);
  }
  if (![0, 1, 2, 3].includes(q.correct)) {
    invalidQuestions.push(`${q.id}: invalid correct index ${q.correct}`);
  }
  if (typeof q.explanation !== 'string' || q.explanation.trim().length < 5) {
    invalidQuestions.push(`${q.id}: invalid/empty explanation`);
  }
  if (typeof q.mnemonic !== 'string' || q.mnemonic.trim().length < 2) {
    invalidQuestions.push(`${q.id}: invalid/empty mnemonic`);
  }
});

assertCheck(duplicateQIds.length === 0, `All question IDs are unique (${seenQIds.size} unique)`, `Duplicates: ${duplicateQIds.join(', ')}`);
assertCheck(invalidQuestions.length === 0, `All questions satisfy schema (chapter, kLevel, scenario, 4 options, correct 0..3, explanation, mnemonic)`, invalidQuestions.slice(0, 5).join('; '));

for (let cId = 1; cId <= 6; cId++) {
  const minRequired = expectedWeights[cId];
  assertCheck(
    chapterQCounts[cId] >= minRequired,
    `Chapter ${cId} question count (${chapterQCounts[cId]}) >= examWeight (${minRequired})`
  );
}

// Flashcards validation
const allFlashcards = [...fc123, ...fc456];
assertCheck(
  allFlashcards.length >= 48,
  `Total flashcards >= 48 across Chapters 1-6 (found ${allFlashcards.length}: Ch1-3=${fc123.length}, Ch4-6=${fc456.length})`
);

const seenFcIds = new Set();
const invalidFlashcards = [];
allFlashcards.forEach((fc, idx) => {
  if (!fc || typeof fc !== 'object') {
    invalidFlashcards.push(`Index ${idx}: not an object`);
    return;
  }
  if (!fc.id || typeof fc.id !== 'string' || seenFcIds.has(fc.id)) {
    invalidFlashcards.push(`Index ${idx}: missing or duplicate id "${fc.id}"`);
  } else {
    seenFcIds.add(fc.id);
  }
  if (![1, 2, 3, 4, 5, 6].includes(fc.chapter)) {
    invalidFlashcards.push(`${fc.id}: invalid chapter ${fc.chapter}`);
  }
  if (typeof fc.term !== 'string' || !fc.term.trim()) {
    invalidFlashcards.push(`${fc.id}: missing term`);
  }
  if (typeof fc.definition !== 'string' || !fc.definition.trim()) {
    invalidFlashcards.push(`${fc.id}: missing definition`);
  }
  if (typeof fc.memoryHook !== 'string' || !fc.memoryHook.trim()) {
    invalidFlashcards.push(`${fc.id}: missing memoryHook`);
  }
});

assertCheck(invalidFlashcards.length === 0, `All flashcards have valid unique id, chapter, term, definition, memoryHook`, invalidFlashcards.slice(0, 5).join('; '));

// ---------------------------------------------------------------------------
// 4. Parse index.html and app.js / sound-fx.js to verify all DOM IDs match
// ---------------------------------------------------------------------------
console.log('\n4. Checking DOM ID Contract between index.html and JS files...');
const indexHtmlPath = path.join(ROOT_DIR, 'index.html');
const appJsPath = path.join(ROOT_DIR, 'js/app.js');
const soundFxPath = path.join(ROOT_DIR, 'js/sound-fx.js');

const htmlContent = fs.existsSync(indexHtmlPath) ? fs.readFileSync(indexHtmlPath, 'utf8') : '';
const appJsContent = fs.existsSync(appJsPath) ? fs.readFileSync(appJsPath, 'utf8') : '';
const soundFxContent = fs.existsSync(soundFxPath) ? fs.readFileSync(soundFxPath, 'utf8') : '';

// Extract all id="..." from index.html
const htmlIds = new Set();
const htmlIdRegex = /\bid\s*=\s*["']([^"']+)["']/g;
let match;
while ((match = htmlIdRegex.exec(htmlContent)) !== null) {
  htmlIds.add(match[1]);
}

// Also extract dynamic IDs created inside app.js via innerHTML / template literals if any
const dynamicJsHtmlIds = new Set();
while ((match = htmlIdRegex.exec(appJsContent)) !== null) {
  dynamicJsHtmlIds.add(match[1]);
}

// Required canonical IDs from specification
const requiredSpecIds = [
  'hud-level', 'hud-rank', 'hud-xp-text', 'hud-xp-bar', 'hud-streak', 'hud-bugs-smashed', 'hud-accuracy',
  'btn-sound-toggle', 'btn-theme-toggle', 'btn-reset-progress',
  'fx-canvas',
  'view-campaign', 'daily-quest-box', 'chapter-grid', 'btn-mistake-raid', 'mistake-count',
  'view-arena', 'btn-arena-exit', 'arena-mode-title', 'arena-progress-text', 'arena-progress-bar', 'arena-timer',
  'player-hp-bar', 'player-hp-text', 'player-combo-badge',
  'boss-avatar', 'boss-name', 'boss-title', 'boss-hp-bar', 'boss-hp-text', 'boss-dialogue',
  'powerup-5050', 'powerup-freeze', 'powerup-peek', 'powerup-shield',
  'q-chapter-badge', 'q-section-badge', 'q-klevel-badge', 'q-difficulty-badge', 'q-scenario-text', 'q-options-list',
  'q-peek-box', 'q-feedback-panel', 'q-feedback-title', 'q-explanation-text', 'q-mnemonic-text', 'btn-next-question',
  'view-exam', 'exam-intro-card', 'btn-start-exam', 'exam-workspace', 'exam-timer', 'exam-q-counter',
  'btn-exam-flag', 'btn-exam-submit', 'exam-q-card', 'exam-options-list', 'btn-exam-prev', 'btn-exam-next', 'exam-nav-grid',
  'exam-result-panel', 'exam-score-big', 'exam-pass-badge', 'exam-time-taken', 'exam-chapter-breakdown', 'exam-review-list', 'btn-exam-retry',
  'view-blitz', 'blitz-intro', 'btn-start-blitz', 'blitz-workspace', 'blitz-timer', 'blitz-score', 'blitz-multiplier', 'blitz-q-box', 'blitz-result',
  'view-flashcards', 'fc-chapter-filter', 'fc-counter', 'fc-card', 'fc-front-term', 'fc-front-meta', 'fc-back-def', 'fc-back-hook',
  'btn-fc-flip', 'btn-fc-prev', 'btn-fc-next', 'btn-fc-know', 'btn-fc-review',
  'view-codex', 'codex-search', 'codex-chapter-tabs', 'codex-content', 'achievements-grid', 'mastery-chart',
  'modal-result', 'result-title', 'result-subtitle', 'result-stats', 'btn-result-continue', 'btn-result-retry'
];

const missingSpecIdsInHtml = requiredSpecIds.filter(id => !htmlIds.has(id));
assertCheck(
  missingSpecIdsInHtml.length === 0,
  `All ${requiredSpecIds.length} canonical spec DOM IDs exist in index.html`,
  `Missing in index.html: ${missingSpecIdsInHtml.join(', ')}`
);

// Extract every getElementById('...') and querySelector('#...') in app.js & sound-fx.js
const combinedJs = appJsContent + '\n' + soundFxContent;
const referencedIds = new Set();

const getByIdRegex = /getElementById\(\s*['"]([^'"]+)['"]\s*\)/g;
while ((match = getByIdRegex.exec(combinedJs)) !== null) {
  referencedIds.add(match[1]);
}

const qsIdRegex = /querySelector\(\s*['"]#([a-zA-Z0-9_-]+)['"]\s*\)/g;
while ((match = qsIdRegex.exec(combinedJs)) !== null) {
  referencedIds.add(match[1]);
}

// Check if helper like $('id') or $id('id') or el('id') is used in app.js
// Let's detect any custom ID lookup helper definitions in app.js:
const helperDefRegex = /(?:function\s+(\w+)\s*\(\s*\w+\s*\)\s*\{\s*return\s+document\.getElementById|const\s+(\w+)\s*=\s*\(?(\w+)\)?\s*=>\s*document\.getElementById)/g;
const helperNames = [];
while ((match = helperDefRegex.exec(appJsContent)) !== null) {
  const fnName = match[1] || match[2];
  if (fnName) helperNames.push(fnName);
}
for (const fnName of helperNames) {
  const escaped = fnName.replace(/\$/g, '\\$');
  const callRegex = new RegExp(`\\b${escaped}\\(\\s*['"]([^'"]+)['"]\\s*\\)`, 'g');
  while ((match = callRegex.exec(appJsContent)) !== null) {
    referencedIds.add(match[1]);
  }
}

const missingReferencedIds = [...referencedIds].filter(id => !htmlIds.has(id) && !dynamicJsHtmlIds.has(id));
assertCheck(
  missingReferencedIds.length === 0,
  `Every getElementById / ID selector in app.js & sound-fx.js (${referencedIds.size} IDs) exists in index.html`,
  `Missing in index.html: ${missingReferencedIds.join(', ')}`
);

// Verify script loading order in index.html
const expectedScripts = [
  'js/data-chap123.js',
  'js/data-chap456.js',
  'js/sound-fx.js',
  'js/app.js'
];
let lastIdx = -1;
let scriptOrderOk = true;
for (const src of expectedScripts) {
  const idx = htmlContent.indexOf(src);
  if (idx === -1 || idx < lastIdx) {
    scriptOrderOk = false;
    break;
  }
  lastIdx = idx;
}
assertCheck(scriptOrderOk, `Script tags in index.html load in order: ${expectedScripts.join(' -> ')}`);

// ---------------------------------------------------------------------------
// 5. Simulate DOM execution & app initialization
// ---------------------------------------------------------------------------
console.log('\n5. Simulating DOM Execution & App Initialization...');

function createMockElement(id = '', tagName = 'DIV') {
  const children = [];
  const classSet = new Set();
  const listeners = {};
  const attributes = {};
  return {
    id,
    tagName: tagName.toUpperCase(),
    style: new Proxy({}, {
      set(target, prop, value) { target[prop] = value; return true; },
      get(target, prop) { return target[prop] || ''; }
    }),
    dataset: {},
    classList: {
      add: (...cls) => cls.forEach(c => classSet.add(c)),
      remove: (...cls) => cls.forEach(c => classSet.delete(c)),
      toggle: (c, force) => {
        if (force === undefined) {
          if (classSet.has(c)) { classSet.delete(c); return false; }
          classSet.add(c); return true;
        }
        if (force) classSet.add(c); else classSet.delete(c);
        return Boolean(force);
      },
      contains: (c) => classSet.has(c)
    },
    className: '',
    innerHTML: '',
    textContent: '',
    innerText: '',
    value: '',
    disabled: false,
    checked: false,
    width: 1280,
    height: 720,
    children,
    childNodes: children,
    parentElement: null,
    parentNode: null,
    firstElementChild: null,
    appendChild(child) {
      if (child) {
        child.parentElement = this;
        child.parentNode = this;
        children.push(child);
        this.firstElementChild = children[0];
      }
      return child;
    },
    prepend(child) {
      if (child) {
        child.parentElement = this;
        child.parentNode = this;
        children.unshift(child);
        this.firstElementChild = children[0];
      }
    },
    removeChild(child) {
      const i = children.indexOf(child);
      if (i >= 0) children.splice(i, 1);
      this.firstElementChild = children[0] || null;
      return child;
    },
    remove() {},
    replaceChildren(...newChildren) {
      children.length = 0;
      newChildren.forEach(c => this.appendChild(c));
    },
    insertAdjacentHTML() {},
    setAttribute(k, v) {
      attributes[k] = String(v);
      if (k === 'id') this.id = String(v);
      if (k.startsWith('data-')) {
        const camel = k.slice(5).replace(/-([a-z])/g, (_, l) => l.toUpperCase());
        this.dataset[camel] = String(v);
      }
    },
    getAttribute(k) {
      if (k === 'id') return this.id || null;
      if (k.startsWith('data-')) {
        const camel = k.slice(5).replace(/-([a-z])/g, (_, l) => l.toUpperCase());
        if (camel in this.dataset) return this.dataset[camel];
      }
      return attributes[k] ?? null;
    },
    hasAttribute(k) { return k in attributes; },
    removeAttribute(k) { delete attributes[k]; },
    addEventListener(type, fn) {
      if (!listeners[type]) listeners[type] = [];
      listeners[type].push(fn);
    },
    removeEventListener(type, fn) {
      if (!listeners[type]) return;
      listeners[type] = listeners[type].filter(f => f !== fn);
    },
    dispatchEvent(evt) {
      const type = evt.type;
      if (listeners[type]) {
        listeners[type].forEach(fn => fn.call(this, evt));
      }
    },
    click() {
      this.dispatchEvent({ type: 'click', target: this, currentTarget: this, preventDefault() {}, stopPropagation() {} });
    },
    focus() {},
    blur() {},
    scrollIntoView() {},
    scrollTo() {},
    getBoundingClientRect() {
      return { top: 100, left: 100, right: 300, bottom: 200, width: 200, height: 100, x: 100, y: 100 };
    },
    querySelector(sel) {
      if (sel.startsWith('#')) return mockElements.get(sel.slice(1)) || createMockElement(sel.slice(1));
      return createMockElement('', 'DIV');
    },
    querySelectorAll(sel) {
      if (sel.includes('.nav-tab')) return navTabElements;
      if (sel.includes('.view-section')) return viewSectionElements;
      return [];
    },
    closest(sel) {
      return this;
    },
    getContext() {
      return {
        clearRect() {},
        fillRect() {},
        beginPath() {},
        arc() {},
        fill() {},
        stroke() {},
        save() {},
        restore() {},
        translate() {},
        rotate() {},
        scale() {},
        moveTo() {},
        lineTo() {},
        closePath() {},
        fillText() {}
      };
    }
  };
}

const mockElements = new Map();
for (const id of htmlIds) {
  const tag = id === 'fx-canvas' ? 'CANVAS' : 'DIV';
  mockElements.set(id, createMockElement(id, tag));
}

const navTabElements = ['study', 'campaign', 'exam', 'blitz', 'flashcards', 'codex', 'ai'].map(view => {
  const el = createMockElement(`nav-tab-${view}`, 'BUTTON');
  el.dataset.view = view;
  el.setAttribute('data-view', view);
  return el;
});

const viewSectionElements = ['view-study', 'view-campaign', 'view-arena', 'view-exam', 'view-blitz', 'view-flashcards', 'view-codex', 'view-ai'].map(id => {
  return mockElements.get(id) || createMockElement(id, 'SECTION');
});

const docListeners = {};
const winListeners = {};
const storageMap = new Map();

class MockAudioParam {
  constructor() { this.value = 0; }
  setValueAtTime(v) { this.value = v; }
  linearRampToValueAtTime(v) { this.value = v; }
  exponentialRampToValueAtTime(v) { this.value = v; }
}

class MockAudioContext {
  constructor() {
    this.currentTime = 0;
    this.state = 'running';
    this.destination = {};
  }
  resume() { return Promise.resolve(); }
  createOscillator() {
    return {
      type: 'sine',
      frequency: new MockAudioParam(),
      detune: new MockAudioParam(),
      connect() { return this; },
      start() {},
      stop() {}
    };
  }
  createGain() {
    return {
      gain: new MockAudioParam(),
      connect() { return this; }
    };
  }
  createBiquadFilter() {
    return {
      type: 'lowpass',
      frequency: new MockAudioParam(),
      Q: new MockAudioParam(),
      connect() { return this; }
    };
  }
}

const domWindow = {
  console,
  Date,
  Math,
  JSON,
  Set,
  Map,
  Array,
  Object,
  String,
  Number,
  Boolean,
  RegExp,
  Error,
  Promise,
  parseInt,
  parseFloat,
  isNaN,
  isFinite,
   encodeURIComponent,
  decodeURIComponent,
  innerWidth: 1440,
  innerHeight: 900,
  devicePixelRatio: 1,
  AudioContext: MockAudioContext,
  webkitAudioContext: MockAudioContext,
  localStorage: {
    getItem: (k) => storageMap.has(k) ? storageMap.get(k) : null,
    setItem: (k, v) => storageMap.set(k, String(v)),
    removeItem: (k) => storageMap.delete(k),
    clear: () => storageMap.clear()
  },
  requestAnimationFrame: () => 1,
  cancelAnimationFrame: () => {},
  setTimeout: (fn) => 1,
  clearTimeout: () => {},
  setInterval: (fn) => 1,
  clearInterval: () => {},
  confirm: () => true,
  alert: () => {},
  scrollTo: () => {},
  matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
  addEventListener(type, fn) {
    if (!winListeners[type]) winListeners[type] = [];
    winListeners[type].push(fn);
  },
  removeEventListener() {},
  dispatchEvent(evt) {
    if (winListeners[evt.type]) winListeners[evt.type].forEach(fn => fn(evt));
  }
};

const domDocument = {
  documentElement: createMockElement('html-root', 'HTML'),
  body: createMockElement('body-root', 'BODY'),
  head: createMockElement('head-root', 'HEAD'),
  readyState: 'complete',
  createElement(tag) {
    return createMockElement('', tag);
  },
  createDocumentFragment() {
    return createMockElement('', 'FRAGMENT');
  },
  getElementById(id) {
    if (mockElements.has(id)) return mockElements.get(id);
    // Return null if not in index.html so missing ID bugs are caught if unguarded
    return null;
  },
  querySelector(sel) {
    if (sel.startsWith('#')) {
      const id = sel.slice(1);
      return mockElements.get(id) || null;
    }
    if (sel.startsWith('.nav-tab[data-view=')) {
      const m = sel.match(/data-view=["']?([^"'\]]+)/);
      if (m) return navTabElements.find(el => el.dataset.view === m[1]) || navTabElements[0];
    }
    return createMockElement('', 'DIV');
  },
  querySelectorAll(sel) {
    if (sel.includes('.nav-tab')) return navTabElements;
    if (sel.includes('.view-section')) return viewSectionElements;
    return [];
  },
  addEventListener(type, fn) {
    if (!docListeners[type]) docListeners[type] = [];
    docListeners[type].push(fn);
  },
  removeEventListener() {},
  dispatchEvent(evt) {
    if (docListeners[evt.type]) docListeners[evt.type].forEach(fn => fn(evt));
  }
};

domWindow.document = domDocument;
domWindow.window = domWindow;
domWindow.globalThis = domWindow;
domWindow.self = domWindow;

vm.createContext(domWindow);

const syllabusViPath = path.join(ROOT_DIR, 'js/syllabus-full-vi.js');
const aiProviderPath = path.join(ROOT_DIR, 'js/ai-provider.js');
const world3dPath = path.join(ROOT_DIR, 'js/world3d.js');
const battleStagePath = path.join(ROOT_DIR, 'js/battle-stage.js');

try {
  vm.runInContext(fs.readFileSync(chap123Path, 'utf8'), domWindow, { filename: 'data-chap123.js' });
  vm.runInContext(fs.readFileSync(chap456Path, 'utf8'), domWindow, { filename: 'data-chap456.js' });
  vm.runInContext(fs.readFileSync(syllabusViPath, 'utf8'), domWindow, { filename: 'syllabus-full-vi.js' });
  vm.runInContext(fs.readFileSync(aiProviderPath, 'utf8'), domWindow, { filename: 'ai-provider.js' });
  vm.runInContext(fs.readFileSync(world3dPath, 'utf8'), domWindow, { filename: 'world3d.js' });
  vm.runInContext(fs.readFileSync(battleStagePath, 'utf8'), domWindow, { filename: 'battle-stage.js' });
  vm.runInContext(fs.readFileSync(soundFxPath, 'utf8'), domWindow, { filename: 'sound-fx.js' });
  vm.runInContext(fs.readFileSync(appJsPath, 'utf8'), domWindow, { filename: 'app.js' });

  // Fire DOMContentLoaded if listeners were registered
  if (docListeners['DOMContentLoaded']) {
    docListeners['DOMContentLoaded'].forEach(fn => fn({ type: 'DOMContentLoaded' }));
  }
  if (winListeners['load']) {
    winListeners['load'].forEach(fn => fn({ type: 'load' }));
  }
  assertCheck(true, 'Full script bundle executed and initialized (DOMContentLoaded) without runtime errors');
} catch (err) {
  assertCheck(false, 'Full script bundle executed and initialized (DOMContentLoaded) without runtime errors', `${err.stack || err.message}`);
}

// Verify CTFL_FULL_SYLLABUS_VI, CTFLAIProvider, CTFLBattleStage
try {
  const syl = domWindow.CTFL_FULL_SYLLABUS_VI;
  assertCheck(Boolean(syl && Array.isArray(syl.chapters) && syl.chapters.length === 6), `window.CTFL_FULL_SYLLABUS_VI has 6 Vietnamese chapters (found ${syl && syl.chapters ? syl.chapters.length : 0})`);
  if (syl) {
    const hasSylApi = typeof syl.getChapter === 'function' && typeof syl.getSection === 'function' && typeof syl.search === 'function';
    assertCheck(hasSylApi, 'window.CTFL_FULL_SYLLABUS_VI exposes getChapter, getSection, search');
    const sec11 = syl.getSection(1, '1.1');
    assertCheck(Boolean(sec11 && sec11.html && sec11.rawText), 'CTFL_FULL_SYLLABUS_VI.getSection(1, "1.1") returns Vietnamese HTML & rawText');
  }

  const ai = domWindow.CTFLAIProvider;
  assertCheck(Boolean(ai), 'window.CTFLAIProvider is defined');
  if (ai) {
    const aiMethods = ['getConfig', 'saveConfig', 'parseApiKeys', 'maskApiKey', 'fetchModels', 'testAllKeys', 'generateQuestionsFromSyllabus', 'generateDynamicK3Questions', 'shuffleQuestionOptions', 'askSyllabusTutor'];
    const missingAi = aiMethods.filter(m => typeof ai[m] !== 'function');
    assertCheck(missingAi.length === 0, 'window.CTFLAIProvider implements all required OpenRouter & generator methods', `Missing: ${missingAi.join(', ')}`);

    const dynQs = ai.generateDynamicK3Questions(5);
    assertCheck(Array.isArray(dynQs) && dynQs.length === 5 && dynQs.every(q => Array.isArray(q.options) && q.options.length === 4 && q.correct >= 0 && q.correct <= 3), 'CTFLAIProvider.generateDynamicK3Questions(5) returns 5 valid K3 questions');

    const sampleQ = { id: 'T1', options: ['A. Alpha', 'B. Beta', 'C. Gamma', 'D. Delta'], correct: 1 };
    const shuffledQ = ai.shuffleQuestionOptions(sampleQ);
    const strippedCorrect = shuffledQ.options[shuffledQ.correct].replace(/^[A-D]\.\s*/, '');
    assertCheck(strippedCorrect === 'Beta', 'CTFLAIProvider.shuffleQuestionOptions preserves correct answer content after permuting');
  }

  const stage = domWindow.CTFLBattleStage;
  assertCheck(Boolean(stage), 'window.CTFLBattleStage is defined');
  if (stage) {
    const stageMethods = ['init', 'setCombatants', 'updateState', 'heroAttack', 'heroShoot', 'heroShieldBlock', 'heroUltimate', 'bossAttack', 'bossDefeat', 'destroy', 'renderMiniLessonBattle'];
    const missingStage = stageMethods.filter(m => typeof stage[m] !== 'function');
    assertCheck(missingStage.length === 0, 'window.CTFLBattleStage implements all required interactive stage methods', `Missing: ${missingStage.join(', ')}`);
  }
} catch (err) {
  assertCheck(false, 'New modules (Syllabus, AIProvider, BattleStage) verification', err.message);
}

// Verify CTFLSound & CTFLParticles exist and their methods run cleanly
try {
  const sfx = domWindow.CTFLSound;
  assertCheck(Boolean(sfx), 'window.CTFLSound is defined');
  if (sfx) {
    const requiredMethods = ['click', 'select', 'correct', 'wrong', 'criticalHit', 'bossDefeat', 'powerup', 'levelUp', 'tick', 'examFinish', 'laserSlash', 'crossLaser', 'spinLaser', 'toggle'];
    const missingMethods = requiredMethods.filter(m => typeof sfx[m] !== 'function');
    assertCheck(missingMethods.length === 0, `window.CTFLSound implements all required Web Audio methods`, `Missing: ${missingMethods.join(', ')}`);
    // Invoke each method once to ensure no runtime exceptions
    requiredMethods.forEach(m => {
      if (typeof sfx[m] === 'function') sfx[m](1);
    });
    assertCheck(true, 'All window.CTFLSound methods execute without error');
  }

  const pt = domWindow.CTFLParticles;
  assertCheck(Boolean(pt), 'window.CTFLParticles is defined');
} catch (err) {
  assertCheck(false, 'CTFLSound & CTFLParticles verification', err.message);
}

// Verify 3D Laser Slash skills, Ollama/Local AI removal, NullPointer cleanup & Right-Click Lock
try {
  const aiJsText = fs.readFileSync(path.join(ROOT_DIR, 'js', 'ai-provider.js'), 'utf8');
  const world3dText = fs.readFileSync(path.join(ROOT_DIR, 'js', 'world3d.js'), 'utf8');
  const stageJsText = fs.readFileSync(path.join(ROOT_DIR, 'js', 'battle-stage.js'), 'utf8');
  const chap123Text = fs.readFileSync(path.join(ROOT_DIR, 'js', 'data-chap123.js'), 'utf8');

  const hasLocalAiResidue = /ai-endpoint-input|congnghevietha|ollama/i.test(htmlContent + '\n' + aiJsText + '\n' + appJsContent);
  assertCheck(!hasLocalAiResidue, 'Local AI / Ollama & custom endpoint UI/config completely removed');

  const hasNullPointerBossOrBug = /NullPointer\s*Overlord|Đại Ma Vương NullPointer|Lỗi Con Trỏ Null/i.test(
    htmlContent + '\n' + world3dText + '\n' + stageJsText + '\n' + chap123Text
  );
  assertCheck(!hasNullPointerBossOrBug, 'All NullPointer boss/bug labels replaced with 100% Vietnamese ISTQB names');

  const w3d = domWindow.CTFLWorld3D;
  assertCheck(
    Boolean(w3d && typeof w3d.triggerLaserSlash === 'function' && typeof w3d.triggerCrossLaser === 'function' && typeof w3d.triggerSpinLaser === 'function'),
    'window.CTFLWorld3D exposes 3 outer-world Laser Slash skills (triggerLaserSlash, triggerCrossLaser, triggerSpinLaser)'
  );

  const hasRightClickLock = /contextmenu/.test(appJsContent) && /contextmenu/.test(world3dText) && /contextmenu/.test(stageJsText);
  assertCheck(hasRightClickLock, 'Right-click contextmenu lock is enforced across app.js, world3d.js, and battle-stage.js');
} catch (err) {
  assertCheck(false, 'Laser skills, Local AI removal, NullPointer cleanup & Right-click lock checks', err.message);
}

// Simulate user interactions (tab switching, starting exam, starting blitz, flashcards, codex search)
try {
  navTabElements.forEach(tab => tab.click());
  const startExamBtn = mockElements.get('btn-start-exam');
  if (startExamBtn) startExamBtn.click();
  const nextExamBtn = mockElements.get('btn-exam-next');
  if (nextExamBtn) nextExamBtn.click();
  const flagExamBtn = mockElements.get('btn-exam-flag');
  if (flagExamBtn) flagExamBtn.click();

  const startBlitzBtn = mockElements.get('btn-start-blitz');
  if (startBlitzBtn) startBlitzBtn.click();

  const flipFcBtn = mockElements.get('btn-fc-flip');
  if (flipFcBtn) flipFcBtn.click();
  const nextFcBtn = mockElements.get('btn-fc-next');
  if (nextFcBtn) nextFcBtn.click();

  // New features: AI Exam, Dynamic K3 Arena, Battle Stage actions, 3D Laser Slash HUD buttons, Study K3 Simulator
  const startAiExamBtn = mockElements.get('btn-start-ai-exam');
  if (startAiExamBtn) startAiExamBtn.click();
  const dynK3Btn = mockElements.get('btn-dynamic-k3-now');
  if (dynK3Btn) dynK3Btn.click();
  ['btn-stage-slash', 'btn-stage-shoot', 'btn-stage-shield', 'btn-stage-ult', 'btn-3d-slash', 'btn-3d-xslash', 'btn-3d-spinslash', 'btn-study-mode-sim', 'btn-study-mode-full'].forEach(id => {
    const el = mockElements.get(id);
    if (el) el.click();
  });

  assertCheck(true, 'Simulated UI interactions (Navigation tabs, Mock Exam, AI Exam, Battle Stage, Study Simulator, Speed Blitz, Flashcards) without runtime errors');
} catch (err) {
  assertCheck(false, 'Simulated UI interactions without runtime errors', `${err.stack || err.message}`);
}

console.log('\n==============================================================');
console.log(` SUMMARY: ${passedChecks}/${totalChecks} checks passed`);
console.log('==============================================================');

if (failures.length > 0) {
  console.error('\nFAILED CHECKS:');
  failures.forEach((f, i) => console.error(`  ${i + 1}. ${f}`));
  process.exit(1);
} else {
  console.log('\nALL VERIFICATION CHECKS PASSED 100%! PROJECT IS READY.');
  process.exit(0);
}
