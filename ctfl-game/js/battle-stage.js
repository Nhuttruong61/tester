/**
 * CTFL Bug Hunter: Cyber Arena — Interactive 2.5D Battle Stage Engine (60 FPS HTML5 Canvas)
 * Owner: @battle-stage
 * Exports: window.CTFLBattleStage
 */
(function (global) {
  'use strict';

  var BOSS_THEMES = {
    1: {
      code: 'CHAP-01',
      defaultName: 'NullPointer Overlord',
      defaultTitle: 'Ác Ma Hư Không & 7 Nguyên Lý',
      primary: '#a855f7',
      secondary: '#6366f1',
      glow: '#c084fc',
      bgTint: 'rgba(168, 85, 247, 0.14)',
      taunts: [
        'Kiểm thử chỉ thấy lỗi, không chứng minh hết lỗi!',
        '6 xúc tu NullPointer sẽ nuốt chửng code của ngươi!',
        'Ngươi dám kiểm thử vét cạn ta sao? Haha!'
      ]
    },
    2: {
      code: 'CHAP-02',
      defaultName: 'Waterfall Leviathan',
      defaultTitle: 'Thủy Quái Cơ Khí Vòng Đời SDLC',
      primary: '#06b6d4',
      secondary: '#0284c7',
      glow: '#22d3ee',
      bgTint: 'rgba(6, 182, 212, 0.14)',
      taunts: [
        'Hàm răng cưa SDLC sẽ nghiền nát bản build này!',
        'Shift-left ư? Quá muộn rồi chiến binh QA!',
        'Regression toàn hệ thống đang ập tới!'
      ]
    },
    3: {
      code: 'CHAP-03',
      defaultName: 'Phantom Reviewer',
      defaultTitle: 'Bóng Ma Pháp Sư Phân Tích Tĩnh',
      primary: '#f43f5e',
      secondary: '#9f1239',
      glow: '#fb7185',
      bgTint: 'rgba(244, 63, 94, 0.14)',
      taunts: [
        'Lưỡi hái Static Review sẽ cắt đứt mọi giả định!',
        'Lỗi ẩn trong tài liệu đặc tả, ngươi tìm nổi không?',
        'Không chạy code mà đòi bắt ta ư?'
      ]
    },
    4: {
      code: 'CHAP-04',
      defaultName: 'Boundary Hydra',
      defaultTitle: 'Rồng Máy 3 Đầu Giá Trị Biên',
      primary: '#f59e0b',
      secondary: '#ea580c',
      glow: '#fbbf24',
      bgTint: 'rgba(245, 158, 11, 0.14)',
      taunts: [
        'Min - 1, Min, Max + 1 — Đầu nào sẽ thiêu rụi ngươi?',
        'Ngươi quên kiểm tra biên ngoài rồi!',
        'Lửa điện tử BVA 3 giá trị thiêu đốt!'
      ]
    },
    5: {
      code: 'CHAP-05',
      defaultName: 'Risk Matrix Colossus',
      defaultTitle: 'Người Khổng Lồ Ma Trận Rủi Ro',
      primary: '#ef4444',
      secondary: '#b91c1c',
      glow: '#f87171',
      bgTint: 'rgba(239, 68, 68, 0.14)',
      taunts: [
        'Búa Tạ Trọng Số Rủi Ro sẽ đập tan kế hoạch của ngươi!',
        'Xác suất cao x Tác động lớn = Nghiền nát!',
        'Ước lượng sai là trả giá bằng cả Sprint!'
      ]
    },
    6: {
      code: 'CHAP-06',
      defaultName: 'Automaton Prime',
      defaultTitle: 'Siêu Robot Hủy Diệt Tự Động Hóa',
      primary: '#10b981',
      secondary: '#059669',
      glow: '#34d399',
      bgTint: 'rgba(16, 185, 129, 0.14)',
      taunts: [
        'Pháo Laze Kép CI/CD đang khóa mục tiêu!',
        'Flaky Test sẽ làm sập toàn bộ pipeline!',
        'ROI tự động hóa của ngươi bằng không!'
      ]
    }
  };

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  // Null-safe Canvas 2D helpers for both real browsers & minimal VM mocks
  function safeSetLineDash(ctx, dash) {
    if (ctx && typeof ctx.setLineDash === 'function') {
      ctx.setLineDash(dash);
    }
  }

  function safeRoundRect(ctx, x, y, w, h, r) {
    if (!ctx) return;
    if (typeof ctx.roundRect === 'function') {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      return;
    }
    var radius = Math.min(r || 0, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.lineTo(x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.lineTo(x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.lineTo(x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.closePath();
  }

  function safeEllipse(ctx, x, y, rx, ry, rot, start, end) {
    if (!ctx) return;
    if (typeof ctx.ellipse === 'function') {
      ctx.ellipse(x, y, rx, ry, rot || 0, start || 0, end || Math.PI * 2);
    } else {
      ctx.arc(x, y, Math.max(1, (rx + ry) * 0.5), start || 0, end || Math.PI * 2);
    }
  }

  function safeQuadCurve(ctx, cpx, cpy, x, y) {
    if (!ctx) return;
    if (typeof ctx.quadraticCurveTo === 'function') {
      ctx.quadraticCurveTo(cpx, cpy, x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  function safeLinearGradient(ctx, x0, y0, x1, y1, stops, fallbackColor) {
    if (ctx && typeof ctx.createLinearGradient === 'function') {
      var grad = ctx.createLinearGradient(x0, y0, x1, y1);
      if (grad && typeof grad.addColorStop === 'function') {
        for (var i = 0; i < stops.length; i++) {
          grad.addColorStop(stops[i][0], stops[i][1]);
        }
        return grad;
      }
    }
    return fallbackColor || '#0f172a';
  }

  function safeRadialGradient(ctx, x0, y0, r0, x1, y1, r1, stops, fallbackColor) {
    if (ctx && typeof ctx.createRadialGradient === 'function') {
      var grad = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
      if (grad && typeof grad.addColorStop === 'function') {
        for (var i = 0; i < stops.length; i++) {
          grad.addColorStop(stops[i][0], stops[i][1]);
        }
        return grad;
      }
    }
    return fallbackColor || 'rgba(56, 189, 248, 0.3)';
  }

  function safeStrokeText(ctx, text, x, y) {
    if (ctx && typeof ctx.strokeText === 'function') {
      ctx.strokeText(text, x, y);
    }
  }

  function safeMeasureWidth(ctx, text) {
    if (ctx && typeof ctx.measureText === 'function') {
      var m = ctx.measureText(text);
      if (m && typeof m.width === 'number') return m.width;
    }
    return String(text || '').length * 7;
  }

  // Main Stage State
  var state = {
    canvas: null,
    ctx: null,
    width: 920,
    height: 380,
    dpr: 1,
    rafId: null,
    lastTime: 0,
    elapsed: 0,
    initialized: false,
    listenersAttached: false,

    // Combatant stats
    chapterId: 1,
    bossName: 'NullPointer Overlord',
    bossTitle: 'Ác Ma Hư Không & 7 Nguyên Lý',
    playerHp: 100,
    maxPlayerHp: 100,
    displayPlayerHp: 100,
    bossHp: 100,
    maxBossHp: 100,
    displayBossHp: 100,
    combo: 1,
    fury: 0,
    displayFury: 0,

    // Interactive shield & cooldowns
    shieldActive: false,
    shieldTimer: 0,
    actionCooldown: 0,

    // Speech bubbles
    heroSpeech: '',
    heroSpeechTimer: 0,
    bossSpeech: 'Ngươi nghĩ kiểm thử chứng minh được không còn lỗi sao?',
    bossSpeechTimer: 5.5,

    // Animation timelines
    heroAnim: { type: 'idle', timer: 0, duration: 0, critical: false },
    bossAnim: { type: 'idle', timer: 0, duration: 0 },
    ultimateAnim: { active: false, timer: 0, duration: 1.45 },
    defeatAnim: { active: false, timer: 0 },
    screenShake: 0,
    flashAlpha: 0,
    flashColor: '#ffffff',

    // Visual entities
    afterimages: [],
    projectiles: [],
    slashes: [],
    particles: [],
    shockwaves: [],
    floatingTexts: [],
    bgNodes: [],

    // Weakpoint system
    weakpoint: {
      active: true,
      x: 685,
      y: 175,
      radius: 26,
      pulse: 0,
      cooldown: 0,
      offsetX: 0,
      offsetY: 0
    },

    // On-canvas interactive buttons
    buttons: [],
    hoverButtonId: null,
    hoverWeakpoint: false,

    // Callbacks
    onStageAction: null,
    onUltimateReady: null
  };

  function resolveElement(target) {
    if (!target) return null;
    if (typeof target === 'string') {
      if (typeof document === 'undefined' || !document.getElementById) return null;
      var cleanId = target.charAt(0) === '#' ? target.slice(1) : target;
      return document.getElementById(cleanId);
    }
    return target;
  }

  function initBackgroundNodes() {
    state.bgNodes = [];
    for (var i = 0; i < 24; i++) {
      state.bgNodes.push({
        x: Math.random() * state.width,
        y: Math.random() * (state.height * 0.68),
        r: 1 + Math.random() * 2.2,
        speed: 8 + Math.random() * 18,
        alpha: 0.15 + Math.random() * 0.45
      });
    }
  }

  function spawnParticles(x, y, color, count, speedScale, sizeScale) {
    var total = count || 16;
    var spd = speedScale || 1;
    var sz = sizeScale || 1;
    for (var i = 0; i < total; i++) {
      var angle = Math.random() * Math.PI * 2;
      var speed = (60 + Math.random() * 210) * spd;
      state.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 35 * spd,
        life: 0.4 + Math.random() * 0.55,
        maxLife: 0.95,
        size: (2 + Math.random() * 4.5) * sz,
        color: color || '#38bdf8',
        gravity: 220
      });
    }
    if (state.particles.length > 260) {
      state.particles.splice(0, state.particles.length - 260);
    }
  }

  function spawnShockwave(x, y, color, maxRadius) {
    state.shockwaves.push({
      x: x,
      y: y,
      radius: 10,
      maxRadius: maxRadius || 95,
      life: 0.42,
      maxLife: 0.42,
      color: color || '#22d3ee'
    });
  }

  function spawnFloatingText(x, y, text, color, scale) {
    state.floatingTexts.push({
      x: x,
      y: y,
      vy: -48,
      text: text,
      color: color || '#fde047',
      scale: scale || 1,
      life: 1.35,
      maxLife: 1.35
    });
  }

  function spawnWeakpoint() {
    var offsets = [
      { ox: -22, oy: -38 },
      { ox: 18, oy: -18 },
      { ox: -14, oy: 18 },
      { ox: 26, oy: 10 },
      { ox: 0, oy: -52 }
    ];
    var pick = offsets[Math.floor(Math.random() * offsets.length)];
    state.weakpoint.active = true;
    state.weakpoint.offsetX = pick.ox;
    state.weakpoint.offsetY = pick.oy;
    state.weakpoint.pulse = 0;
    state.weakpoint.cooldown = 0;
  }

  function buildCanvasButtons() {
    var y = state.height - 44;
    var h = 32;
    var gap = 10;
    var specs = [
      { id: 'slash', label: 'Chém Kiếm [1]', w: 146, bg: 'rgba(14, 165, 233, 0.24)', border: '#38bdf8' },
      { id: 'shoot', label: 'Bắn Laser [2]', w: 146, bg: 'rgba(16, 185, 129, 0.22)', border: '#34d399' },
      { id: 'shield', label: 'Bật Khiên [3]', w: 146, bg: 'rgba(99, 102, 241, 0.24)', border: '#818cf8' },
      { id: 'ult', label: 'Tuyệt Kỹ [R]', w: 158, bg: 'rgba(245, 158, 11, 0.25)', border: '#fbbf24' }
    ];
    var totalW = 0;
    for (var i = 0; i < specs.length; i++) totalW += specs[i].w;
    totalW += gap * (specs.length - 1);
    var startX = (state.width - totalW) * 0.5;
    state.buttons = [];
    var cx = startX;
    for (var j = 0; j < specs.length; j++) {
      var s = specs[j];
      state.buttons.push({
        id: s.id,
        label: s.label,
        x: cx,
        y: y,
        w: s.w,
        h: h,
        bg: s.bg,
        border: s.border
      });
      cx += s.w + gap;
    }
  }

  function resizeCanvas() {
    if (!state.canvas) return;
    var rect = typeof state.canvas.getBoundingClientRect === 'function'
      ? state.canvas.getBoundingClientRect()
      : null;
    var cssW = rect && rect.width > 120 ? rect.width : 920;
    var cssH = rect && rect.height > 120 ? rect.height : 380;
    var dpr = clamp(global.devicePixelRatio || 1, 1, 2);
    state.dpr = dpr;
    state.width = 920;
    state.height = Math.round(920 * (cssH / cssW));
    if (state.height < 320 || state.height > 480) {
      state.height = 380;
    }
    if (state.canvas.width !== Math.round(state.width * dpr)) {
      state.canvas.width = Math.round(state.width * dpr);
    }
    if (state.canvas.height !== Math.round(state.height * dpr)) {
      state.canvas.height = Math.round(state.height * dpr);
    }
    buildCanvasButtons();
  }

  function getCanvasCoords(evt) {
    if (!state.canvas || typeof state.canvas.getBoundingClientRect !== 'function') {
      return { x: 0, y: 0 };
    }
    var rect = state.canvas.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) return { x: 0, y: 0 };
    return {
      x: ((evt.clientX - rect.left) / rect.width) * state.width,
      y: ((evt.clientY - rect.top) / rect.height) * state.height
    };
  }

  function getBossAnchor() {
    var baseX = state.width * 0.74;
    var baseY = state.height * 0.53;
    var bob = Math.sin(state.elapsed * 2.1) * 7;
    var offsetX = 0;
    var offsetY = 0;
    if (state.bossAnim.type === 'hit') {
      var p = state.bossAnim.timer / Math.max(0.01, state.bossAnim.duration);
      offsetX = Math.sin(p * Math.PI) * 26;
      offsetY = -Math.sin(p * Math.PI) * 8;
    } else if (state.bossAnim.type === 'attack') {
      var ap = state.bossAnim.timer / Math.max(0.01, state.bossAnim.duration);
      offsetX = -Math.sin(ap * Math.PI) * 80;
    }
    return { x: baseX + offsetX, y: baseY + bob + offsetY };
  }

  function getHeroAnchor() {
    var baseX = state.width * 0.23;
    var baseY = state.height * 0.56;
    var bob = Math.sin(state.elapsed * 3.4) * 4;
    var offsetX = 0;
    var offsetY = 0;
    if (state.heroAnim.type === 'slash') {
      var p = state.heroAnim.timer / Math.max(0.01, state.heroAnim.duration);
      var dash = p < 0.45 ? p / 0.45 : 1 - (p - 0.45) / 0.55;
      offsetX = dash * (state.width * 0.36);
      offsetY = -Math.sin(p * Math.PI) * 24;
    } else if (state.heroAnim.type === 'shoot') {
      var sp = state.heroAnim.timer / Math.max(0.01, state.heroAnim.duration);
      offsetX = -Math.sin(sp * Math.PI) * 14;
    } else if (state.heroAnim.type === 'hit') {
      var hp = state.heroAnim.timer / Math.max(0.01, state.heroAnim.duration);
      offsetX = -Math.sin(hp * Math.PI) * 22;
    } else if (state.heroAnim.type === 'ultimate') {
      var up = state.heroAnim.timer / Math.max(0.01, state.heroAnim.duration);
      offsetY = -Math.sin(up * Math.PI) * 90;
      offsetX = Math.sin(up * Math.PI) * 45;
    }
    return { x: baseX + offsetX, y: baseY + bob + offsetY };
  }

  function triggerCallback(payload) {
    if (typeof state.onStageAction === 'function') {
      try {
        state.onStageAction(payload);
      } catch (e) {
        // Keep stage resilient if external callback throws
      }
    }
  }

  function handleCanvasAction(actionId) {
    if (state.defeatAnim.active) return;
    if (actionId === 'slash') {
      if (state.actionCooldown > 0) return;
      state.actionCooldown = 0.65;
      api.heroAttack(false);
      triggerCallback({ type: 'slash', damage: 2, fury: 15 });
    } else if (actionId === 'shoot') {
      if (state.actionCooldown > 0) return;
      state.actionCooldown = 0.65;
      api.heroShoot();
      triggerCallback({ type: 'shoot', damage: 2, fury: 15 });
    } else if (actionId === 'shield') {
      state.shieldActive = true;
      state.shieldTimer = 4.0;
      state.heroSpeech = 'Khiên Lục Giác Sẵn Sàng!';
      state.heroSpeechTimer = 2.2;
      spawnShockwave(getHeroAnchor().x + 28, getHeroAnchor().y - 10, '#34d399', 64);
      spawnFloatingText(getHeroAnchor().x, getHeroAnchor().y - 72, 'BẬT KHIÊN (4s)', '#34d399', 1.0);
      triggerCallback({ type: 'shield', duration: 4 });
    } else if (actionId === 'ult') {
      if (state.fury < 100) {
        spawnFloatingText(getHeroAnchor().x + 40, getHeroAnchor().y - 68, 'Cần 100% Nộ!', '#fbbf24', 0.95);
        return;
      }
      api.heroUltimate();
      triggerCallback({ type: 'ultimate', damage: 15, fury: -100 });
    }
  }

  function handlePointerMove(evt) {
    var pt = getCanvasCoords(evt);
    state.hoverButtonId = null;
    for (var i = 0; i < state.buttons.length; i++) {
      var b = state.buttons[i];
      if (pt.x >= b.x && pt.x <= b.x + b.w && pt.y >= b.y && pt.y <= b.y + b.h) {
        state.hoverButtonId = b.id;
        break;
      }
    }
    var bossPos = getBossAnchor();
    var wpX = bossPos.x + state.weakpoint.offsetX;
    var wpY = bossPos.y + state.weakpoint.offsetY;
    var distWp = Math.hypot(pt.x - wpX, pt.y - wpY);
    var distBoss = Math.hypot(pt.x - bossPos.x, pt.y - bossPos.y);
    state.hoverWeakpoint = (state.weakpoint.active && distWp <= state.weakpoint.radius + 14) || distBoss <= 78;
    if (state.canvas && state.canvas.style) {
      state.canvas.style.cursor = (state.hoverButtonId || state.hoverWeakpoint) ? 'pointer' : 'default';
    }
  }

  function handlePointerDown(evt) {
    if (state.defeatAnim.active) return;
    var pt = getCanvasCoords(evt);

    // 1. Check bottom stage buttons
    for (var i = 0; i < state.buttons.length; i++) {
      var b = state.buttons[i];
      if (pt.x >= b.x && pt.x <= b.x + b.w && pt.y >= b.y && pt.y <= b.y + b.h) {
        handleCanvasAction(b.id);
        return;
      }
    }

    // 2. Check weakpoint or Boss direct click
    var bossPos = getBossAnchor();
    var wpX = bossPos.x + state.weakpoint.offsetX;
    var wpY = bossPos.y + state.weakpoint.offsetY;
    var distWp = Math.hypot(pt.x - wpX, pt.y - wpY);
    var distBoss = Math.hypot(pt.x - bossPos.x, pt.y - bossPos.y);

    if (state.weakpoint.active && distWp <= state.weakpoint.radius + 16) {
      state.weakpoint.active = false;
      state.weakpoint.cooldown = 3.2;
      state.fury = clamp(state.fury + 20, 0, 100);
      api.heroAttack(true);
      spawnFloatingText(wpX, wpY - 26, '[CHÍ MẠNG] TRÚNG ĐIỂM YẾU! -3 HP | +20% NỘ | +5 XP', '#fde047', 1.15);
      triggerCallback({ type: 'weakpoint_hit', damage: 3, xp: 5, fury: 20 });
      if (state.fury >= 100 && typeof state.onUltimateReady === 'function') {
        try { state.onUltimateReady(); } catch (e) {}
      }
    } else if (distBoss <= 84) {
      if (state.actionCooldown > 0) return;
      state.actionCooldown = 0.55;
      api.heroShoot();
      state.fury = clamp(state.fury + 10, 0, 100);
      spawnFloatingText(pt.x, pt.y - 18, 'BẮN TRỰC DIỆN! -2 HP', '#38bdf8', 1.0);
      triggerCallback({ type: 'shoot', damage: 2, fury: 10 });
    }
  }

  function handleKeyDown(evt) {
    if (!state.initialized || state.defeatAnim.active) return;
    var tag = evt && evt.target && evt.target.tagName ? evt.target.tagName.toUpperCase() : '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    // Only respond if canvas is visible in DOM
    if (state.canvas && state.canvas.offsetParent === null) return;

    var key = evt && evt.key ? evt.key.toLowerCase() : '';
    if (key === 'r') {
      handleCanvasAction('ult');
    } else if (key === '1') {
      handleCanvasAction('slash');
    } else if (key === '2') {
      handleCanvasAction('shoot');
    } else if (key === '3') {
      handleCanvasAction('shield');
    }
  }

  function attachListeners() {
    if (state.listenersAttached || !state.canvas) return;
    if (typeof state.canvas.addEventListener === 'function') {
      state.canvas.addEventListener('mousemove', handlePointerMove);
      state.canvas.addEventListener('mousedown', handlePointerDown);
    }
    if (typeof global.addEventListener === 'function') {
      global.addEventListener('resize', resizeCanvas);
      global.addEventListener('keydown', handleKeyDown);
    }
    state.listenersAttached = true;
  }

  function detachListeners() {
    if (!state.listenersAttached) return;
    if (state.canvas && typeof state.canvas.removeEventListener === 'function') {
      state.canvas.removeEventListener('mousemove', handlePointerMove);
      state.canvas.removeEventListener('mousedown', handlePointerDown);
    }
    if (typeof global.removeEventListener === 'function') {
      global.removeEventListener('resize', resizeCanvas);
      global.removeEventListener('keydown', handleKeyDown);
    }
    state.listenersAttached = false;
  }

  // =========================================================================
  // DRAWING ROUTINES (2.5D CYBER ARENA, HERO, 6 BOSSES, FX, HUD)
  // =========================================================================

  function drawArenaBackground(ctx, theme) {
    var w = state.width;
    var h = state.height;

    // Sky gradient
    ctx.fillStyle = safeLinearGradient(ctx, 0, 0, 0, h, [
      [0, '#070b19'],
      [0.58, '#0f172a'],
      [1, '#090d1b']
    ], '#0b1120');
    ctx.fillRect(0, 0, w, h);

    // Chapter atmospheric glow
    ctx.fillStyle = safeRadialGradient(ctx, w * 0.72, h * 0.42, 20, w * 0.72, h * 0.42, 290, [
      [0, theme.bgTint],
      [1, 'rgba(0,0,0,0)']
    ], theme.bgTint);
    ctx.fillRect(0, 0, w, h);

    // Hero atmospheric glow
    ctx.fillStyle = safeRadialGradient(ctx, w * 0.24, h * 0.48, 15, w * 0.24, h * 0.48, 220, [
      [0, 'rgba(34, 211, 238, 0.14)'],
      [1, 'rgba(0,0,0,0)']
    ], 'rgba(34, 211, 238, 0.12)');
    ctx.fillRect(0, 0, w, h);

    // Floating cyber data particles
    for (var i = 0; i < state.bgNodes.length; i++) {
      var n = state.bgNodes[i];
      ctx.fillStyle = 'rgba(56, 189, 248, ' + n.alpha + ')';
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2.5D Perspective Grid Floor
    var horizonY = h * 0.66;
    ctx.fillStyle = safeLinearGradient(ctx, 0, horizonY, 0, h, [
      [0, 'rgba(15, 23, 42, 0.85)'],
      [1, 'rgba(2, 6, 23, 0.98)']
    ], '#080e1f');
    ctx.fillRect(0, horizonY, w, h - horizonY);

    // Horizon neon line
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(w, horizonY);
    ctx.stroke();

    // Perspective vertical grid lines
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.14)';
    ctx.lineWidth = 1;
    var centerX = w * 0.5;
    for (var gx = -10; gx <= 10; gx++) {
      var topX = centerX + gx * 48;
      var botX = centerX + gx * 125;
      ctx.beginPath();
      ctx.moveTo(topX, horizonY);
      ctx.lineTo(botX, h);
      ctx.stroke();
    }

    // Perspective horizontal grid lines (animated scroll)
    var scroll = (state.elapsed * 0.5) % 1;
    for (var gy = 0; gy < 7; gy++) {
      var t = (gy + scroll) / 7;
      var yLine = horizonY + (t * t) * (h - horizonY);
      ctx.beginPath();
      ctx.moveTo(0, yLine);
      ctx.lineTo(w, yLine);
      ctx.stroke();
    }
  }

  function drawHero(ctx, x, y, alpha) {
    ctx.save();
    ctx.translate(x, y);
    if (typeof alpha === 'number') ctx.globalAlpha = alpha;

    var breath = Math.sin(state.elapsed * 3.4) * 2.5;
    var isSlashing = state.heroAnim.type === 'slash';
    var isShooting = state.heroAnim.type === 'shoot';

    // Ground shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    safeEllipse(ctx, 0, 62, 34, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Flowing Energy Scarf (animated sine wave behind hero)
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(-10, -24 + breath);
    for (var s = 1; s <= 4; s++) {
      var sx = -10 - s * 14;
      var sy = -22 + breath + Math.sin(state.elapsed * 7 + s * 1.1) * (4 + s * 2);
      ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    ctx.strokeStyle = '#a5f3fc';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Legs (articulated mechanical boots)
    var legBend = Math.sin(state.elapsed * 3.4) * 2;
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    // Left leg
    safeRoundRect(ctx, -16, 18, 12, 36 + legBend * 0.5, 4);
    ctx.fill();
    ctx.stroke();
    // Right leg
    safeRoundRect(ctx, 4, 18, 12, 36 - legBend * 0.5, 4);
    ctx.fill();
    ctx.stroke();

    // Torso Armor
    ctx.fillStyle = safeLinearGradient(ctx, -20, -28, 20, 22, [
      [0, '#0f172a'],
      [0.5, '#1e3a5f'],
      [1, '#0f172a']
    ], '#1e293b');
    safeRoundRect(ctx, -20, -26 + breath, 40, 48, 8);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Chest QA Reactor Core
    ctx.fillStyle = '#22d3ee';
    ctx.beginPath();
    ctx.arc(0, -4 + breath, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ecfeff';
    ctx.beginPath();
    ctx.arc(0, -4 + breath, 3, 0, Math.PI * 2);
    ctx.fill();

    // Shoulder pads
    ctx.fillStyle = '#0284c7';
    safeRoundRect(ctx, -27, -28 + breath, 12, 16, 4);
    ctx.fill();
    safeRoundRect(ctx, 15, -28 + breath, 12, 16, 4);
    ctx.fill();

    // Cyber Helmet + Glowing Cyan Visor
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, -44 + breath, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Visor
    ctx.fillStyle = '#22d3ee';
    safeRoundRect(ctx, -4, -50 + breath, 19, 9, 4);
    ctx.fill();
    // Helmet crest
    ctx.fillStyle = '#38bdf8';
    safeRoundRect(ctx, -6, -64 + breath, 12, 6, 2);
    ctx.fill();

    // Left Arm: Testing Laser Cannon
    ctx.save();
    ctx.translate(-16, -12 + breath);
    ctx.rotate(isShooting ? -0.1 : 0.15);
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 1.8;
    safeRoundRect(ctx, -6, -6, 28, 12, 3);
    ctx.fill();
    ctx.stroke();
    // Muzzle glow
    ctx.fillStyle = isShooting ? '#fde047' : '#34d399';
    ctx.beginPath();
    ctx.arc(23, 0, isShooting ? 6 : 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Right Arm: Plasma Blade
    ctx.save();
    ctx.translate(18, -10 + breath);
    var bladeAngle = isSlashing
      ? Math.sin((state.heroAnim.timer / Math.max(0.01, state.heroAnim.duration)) * Math.PI * 2) * 1.4
      : -0.45 + Math.sin(state.elapsed * 3.4) * 0.08;
    ctx.rotate(bladeAngle);
    // Hilt
    ctx.fillStyle = '#475569';
    safeRoundRect(ctx, -2, -4, 14, 8, 2);
    ctx.fill();
    // Plasma Blade Glow
    ctx.fillStyle = '#22d3ee';
    safeRoundRect(ctx, 12, -3.5, 52, 7, 3);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    safeRoundRect(ctx, 14, -1.5, 46, 3, 1.5);
    ctx.fill();
    ctx.restore();

    // Hovering QA Support Drone
    var droneX = -44 + Math.cos(state.elapsed * 2.2) * 8;
    var droneY = -58 + Math.sin(state.elapsed * 3.1) * 9;
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(droneX, droneY, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#34d399';
    ctx.beginPath();
    ctx.arc(droneX + 3, droneY, 4, 0, Math.PI * 2);
    ctx.fill();
    // Drone wings
    ctx.strokeStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(droneX - 16, droneY - 4);
    ctx.lineTo(droneX + 16, droneY - 4);
    ctx.stroke();

    // Hexagonal Hologram Shield when active
    if (state.shieldActive) {
      ctx.save();
      ctx.translate(42, -6 + breath);
      var pulse = 0.72 + Math.sin(state.elapsed * 9) * 0.2;
      ctx.strokeStyle = 'rgba(52, 211, 153, ' + pulse + ')';
      ctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (var hx = 0; hx < 6; hx++) {
        var ang = (hx * Math.PI) / 3 + Math.PI / 6;
        var px = Math.cos(ang) * 34;
        var py = Math.sin(ang) * 52;
        if (hx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  }

  function drawBoss(ctx, x, y, chapterId, theme) {
    if (state.defeatAnim.active && state.defeatAnim.timer > 0.9) return;
    ctx.save();
    ctx.translate(x, y);
    if (state.defeatAnim.active) {
      var fade = clamp(1 - state.defeatAnim.timer / 0.9, 0, 1);
      ctx.globalAlpha = fade;
      ctx.scale(fade, fade);
    }

    var isHit = state.bossAnim.type === 'hit';
    var glowCol = isHit ? '#ef4444' : theme.glow;
    var bodyCol = isHit ? '#dc2626' : theme.primary;

    // Ground shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    safeEllipse(ctx, 0, 68, 56, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Aura ring
    ctx.strokeStyle = glowCol;
    ctx.lineWidth = 2;
    ctx.globalAlpha = (ctx.globalAlpha || 1) * 0.45;
    ctx.beginPath();
    ctx.arc(0, -8, 66 + Math.sin(state.elapsed * 4) * 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = state.defeatAnim.active ? clamp(1 - state.defeatAnim.timer / 0.9, 0, 1) : 1;

    if (chapterId === 1) {
      // Chapter 1: NullPointer Overlord (Void Demon + dark purple core + 6 lightning tentacles)
      for (var t = 0; t < 6; t++) {
        var baseAng = (t / 6) * Math.PI * 2 + state.elapsed * 0.8;
        ctx.strokeStyle = t % 2 === 0 ? '#a855f7' : '#38bdf8';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, -10);
        var midX = Math.cos(baseAng) * 42 + Math.sin(state.elapsed * 6 + t) * 12;
        var midY = -10 + Math.sin(baseAng) * 42;
        var endX = Math.cos(baseAng) * 76 + Math.cos(state.elapsed * 7 + t) * 14;
        var endY = -10 + Math.sin(baseAng) * 66;
        safeQuadCurve(ctx, midX, midY, endX, endY);
        ctx.stroke();
      }
      ctx.fillStyle = '#1e1b4b';
      ctx.strokeStyle = glowCol;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, -10, 38, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Glowing Void Eye
      ctx.fillStyle = isHit ? '#ffffff' : '#f43f5e';
      ctx.beginPath();
      safeEllipse(ctx, -6, -12, 14, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(-8, -12, 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (chapterId === 2) {
      // Chapter 2: Waterfall Leviathan (Segmented Mech Sea Serpent + saw-tooth jaws)
      for (var seg = 4; seg >= 0; seg--) {
        var sx = seg * 18;
        var sy = Math.sin(state.elapsed * 4 + seg * 0.9) * 12;
        ctx.fillStyle = seg === 0 ? '#0e7490' : '#164e63';
        ctx.strokeStyle = glowCol;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(sx - 10, sy - 10, 28 - seg * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      // Saw-tooth jaws
      ctx.fillStyle = '#e2e8f0';
      for (var tooth = 0; tooth < 4; tooth++) {
        ctx.beginPath();
        ctx.moveTo(-36, -18 + tooth * 8);
        ctx.lineTo(-48, -14 + tooth * 8);
        ctx.lineTo(-36, -10 + tooth * 8);
        ctx.closePath();
        ctx.fill();
      }
      // Eye
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(-20, -20, 6, 0, Math.PI * 2);
      ctx.fill();
    } else if (chapterId === 3) {
      // Chapter 3: Phantom Reviewer (Cloaked Mage + glowing red eyes + Static Analysis Scythe)
      // Scythe
      ctx.save();
      ctx.translate(-34, -8);
      ctx.rotate(Math.sin(state.elapsed * 2.5) * 0.14);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, 48);
      ctx.lineTo(0, -56);
      ctx.stroke();
      ctx.fillStyle = '#fb7185';
      ctx.beginPath();
      ctx.moveTo(0, -56);
      safeQuadCurve(ctx, -46, -48, -38, -14);
      safeQuadCurve(ctx, -20, -34, 0, -40);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Cloak
      ctx.fillStyle = '#1f122b';
      ctx.strokeStyle = bodyCol;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, -54);
      ctx.lineTo(36, 48);
      ctx.lineTo(-36, 48);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Glowing red eyes
      ctx.fillStyle = '#ff0044';
      ctx.beginPath();
      ctx.arc(-10, -28, 4.5, 0, Math.PI * 2);
      ctx.arc(4, -28, 4.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (chapterId === 4) {
      // Chapter 4: Boundary Hydra (3-Headed Cyber Dragon: Min-1, Min, Max+1)
      var heads = [
        { ox: -36, oy: -42, tag: 'Min-1' },
        { ox: 0, oy: -58, tag: 'Min' },
        { ox: 34, oy: -38, tag: 'Max+1' }
      ];
      // Body
      ctx.fillStyle = '#451a03';
      ctx.strokeStyle = glowCol;
      ctx.lineWidth = 2.5;
      safeRoundRect(ctx, -32, -8, 64, 52, 14);
      ctx.fill();
      ctx.stroke();
      for (var hIdx = 0; hIdx < heads.length; hIdx++) {
        var hd = heads[hIdx];
        var sway = Math.sin(state.elapsed * 3.5 + hIdx) * 6;
        ctx.strokeStyle = bodyCol;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(0, -4);
        ctx.lineTo(hd.ox + sway, hd.oy);
        ctx.stroke();

        ctx.fillStyle = '#78350f';
        ctx.strokeStyle = glowCol;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(hd.ox + sway, hd.oy, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(hd.tag, hd.ox + sway, hd.oy - 21);
      }
    } else if (chapterId === 5) {
      // Chapter 5: Risk Matrix Colossus (Steel Giant + Risk Grid Chest + Weighted Hammer)
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = glowCol;
      ctx.lineWidth = 3;
      safeRoundRect(ctx, -38, -36, 76, 80, 10);
      ctx.fill();
      ctx.stroke();
      // Risk Matrix grid on chest
      var gridColors = ['#22c55e', '#eab308', '#ef4444', '#eab308'];
      for (var r = 0; r < 2; r++) {
        for (var c = 0; c < 2; c++) {
          ctx.fillStyle = gridColors[r * 2 + c];
          ctx.fillRect(-18 + c * 18, -14 + r * 18, 15, 15);
        }
      }
      // Head
      ctx.fillStyle = '#1e293b';
      safeRoundRect(ctx, -18, -62, 36, 24, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-10, -52, 20, 6);
      // Giant Weighted War-Hammer
      ctx.save();
      ctx.translate(-46, -10);
      ctx.rotate(Math.sin(state.elapsed * 2.2) * 0.16);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(-4, -36, 8, 74);
      ctx.fillStyle = '#dc2626';
      ctx.strokeStyle = '#fca5a5';
      safeRoundRect(ctx, -22, -52, 44, 24, 4);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    } else {
      // Chapter 6: Automaton Prime (Super Robot + Twin Shoulder Laser Cannons)
      ctx.fillStyle = '#064e3b';
      ctx.strokeStyle = glowCol;
      ctx.lineWidth = 3;
      safeRoundRect(ctx, -36, -34, 72, 78, 12);
      ctx.fill();
      ctx.stroke();
      // Twin Shoulder Cannons
      ctx.fillStyle = '#1e293b';
      safeRoundRect(ctx, -56, -46, 24, 16, 4);
      ctx.fill();
      ctx.stroke();
      safeRoundRect(ctx, 32, -46, 24, 16, 4);
      ctx.fill();
      ctx.stroke();
      // Cannon tips
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(-58, -38, 5, 0, Math.PI * 2);
      ctx.arc(58, -38, 5, 0, Math.PI * 2);
      ctx.fill();
      // Reactor Core
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(0, 2, 14, 0, Math.PI * 2);
      ctx.fill();
      // Head
      ctx.fillStyle = '#0f172a';
      safeRoundRect(ctx, -16, -60, 32, 24, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#34d399';
      ctx.fillRect(-10, -50, 20, 5);
    }

    ctx.restore();
  }

  function drawWeakpoint(ctx, bossPos) {
    if (!state.weakpoint.active || state.defeatAnim.active) return;
    var wx = bossPos.x + state.weakpoint.offsetX;
    var wy = bossPos.y + state.weakpoint.offsetY;
    var pulse = 1 + Math.sin(state.elapsed * 8) * 0.14;
    var r = state.weakpoint.radius * pulse;

    ctx.save();
    ctx.translate(wx, wy);

    ctx.strokeStyle = state.hoverWeakpoint ? '#fde047' : '#f43f5e';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();

    safeSetLineDash(ctx, [5, 4]);
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.62, state.elapsed * 3, state.elapsed * 3 + Math.PI * 2);
    ctx.stroke();
    safeSetLineDash(ctx, []);

    // Crosshair lines
    ctx.beginPath();
    ctx.moveTo(-r - 6, 0);
    ctx.lineTo(r + 6, 0);
    ctx.moveTo(0, -r - 6);
    ctx.lineTo(0, r + 6);
    ctx.stroke();

    // Label pill
    var label = 'ĐIỂM YẾU [CLICK]';
    ctx.font = 'bold 11px sans-serif';
    var tw = safeMeasureWidth(ctx, label) + 14;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    safeRoundRect(ctx, -tw * 0.5, -r - 24, tw, 18, 6);
    ctx.fill();
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#fde047';
    ctx.textAlign = 'center';
    ctx.fillText(label, 0, -r - 11);

    ctx.restore();
  }

  function drawEffects(ctx) {
    // Afterimages
    for (var a = 0; a < state.afterimages.length; a++) {
      var ai = state.afterimages[a];
      drawHero(ctx, ai.x, ai.y, ai.alpha * 0.45);
    }

    // Projectiles
    for (var p = 0; p < state.projectiles.length; p++) {
      var pr = state.projectiles[p];
      ctx.save();
      ctx.strokeStyle = pr.color;
      ctx.lineWidth = pr.width || 5;
      ctx.beginPath();
      ctx.moveTo(pr.x, pr.y);
      ctx.lineTo(pr.x - pr.vx * 0.04, pr.y - pr.vy * 0.04);
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(pr.x, pr.y, (pr.width || 5) * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // X-Slashes
    for (var s = 0; s < state.slashes.length; s++) {
      var sl = state.slashes[s];
      var alpha = clamp(sl.life / sl.maxLife, 0, 1);
      ctx.save();
      ctx.translate(sl.x, sl.y);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = sl.color;
      ctx.lineWidth = 7 * alpha;
      ctx.beginPath();
      ctx.moveTo(-42, -42);
      ctx.lineTo(42, 42);
      ctx.moveTo(42, -42);
      ctx.lineTo(-42, 42);
      ctx.stroke();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5 * alpha;
      ctx.stroke();
      ctx.restore();
    }

    // Orbital QA Laser Beam (Hero Ultimate)
    if (state.ultimateAnim.active) {
      var up = state.ultimateAnim.timer / state.ultimateAnim.duration;
      var bossPos = getBossAnchor();
      var beamW = up < 0.7 ? 78 + Math.sin(state.elapsed * 40) * 14 : 78 * (1 - (up - 0.7) / 0.3);
      ctx.save();
      ctx.fillStyle = safeLinearGradient(ctx, bossPos.x - beamW * 0.5, 0, bossPos.x + beamW * 0.5, 0, [
        [0, 'rgba(34, 211, 238, 0)'],
        [0.3, 'rgba(34, 211, 238, 0.85)'],
        [0.5, 'rgba(255, 255, 255, 0.98)'],
        [0.7, 'rgba(250, 204, 21, 0.85)'],
        [1, 'rgba(34, 211, 238, 0)']
      ], 'rgba(34, 211, 238, 0.8)');
      ctx.fillRect(bossPos.x - beamW * 0.5, 0, beamW, bossPos.y + 42);
      ctx.restore();
    }

    // Shockwaves
    for (var w = 0; w < state.shockwaves.length; w++) {
      var sw = state.shockwaves[w];
      var swA = clamp(sw.life / sw.maxLife, 0, 1);
      ctx.save();
      ctx.strokeStyle = sw.color;
      ctx.globalAlpha = swA;
      ctx.lineWidth = 3 * swA;
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Particles
    for (var i = 0; i < state.particles.length; i++) {
      var pt = state.particles[i];
      ctx.save();
      ctx.globalAlpha = clamp(pt.life / pt.maxLife, 0, 1);
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Floating Damage / Status Texts
    for (var f = 0; f < state.floatingTexts.length; f++) {
      var ft = state.floatingTexts[f];
      ctx.save();
      ctx.globalAlpha = clamp(ft.life / ft.maxLife, 0, 1);
      ctx.font = 'bold ' + Math.round(14 * ft.scale) + 'px sans-serif';
      ctx.textAlign = 'center';
      ctx.strokeStyle = 'rgba(2, 6, 23, 0.95)';
      ctx.lineWidth = 4;
      safeStrokeText(ctx, ft.text, ft.x, ft.y);
      ctx.fillStyle = ft.color;
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    }
  }

  function drawSpeechBubble(ctx, x, y, text, borderColor) {
    if (!text) return;
    ctx.save();
    ctx.font = '600 11.5px sans-serif';
    var maxW = 240;
    var display = text.length > 52 ? text.slice(0, 49) + '...' : text;
    var tw = Math.min(maxW, safeMeasureWidth(ctx, display) + 20);
    var bx = clamp(x - tw * 0.5, 12, state.width - tw - 12);
    var by = clamp(y, 12, state.height - 90);

    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    safeRoundRect(ctx, bx, by, tw, 28, 10);
    ctx.fill();
    ctx.strokeStyle = borderColor || '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#f8fafc';
    ctx.textAlign = 'center';
    ctx.fillText(display, bx + tw * 0.5, by + 18);
    ctx.restore();
  }

  function drawOverheadHUD(ctx, heroPos, bossPos, theme) {
    // 1. Hero Overhead Bars (HP + Fury + Shield badge)
    var hx = clamp(heroPos.x - 80, 16, state.width * 0.44);
    var hy = 16;
    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    safeRoundRect(ctx, hx, hy, 210, 62, 10);
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Chiến Binh QA', hx + 10, hy + 17);

    if (state.combo > 1) {
      ctx.fillStyle = '#fde047';
      ctx.textAlign = 'right';
      ctx.fillText('COMBO x' + state.combo, hx + 200, hy + 17);
    }

    // Hero HP Bar
    var hpPct = clamp(state.displayPlayerHp / Math.max(1, state.maxPlayerHp), 0, 1);
    ctx.fillStyle = '#1e293b';
    safeRoundRect(ctx, hx + 10, hy + 24, 190, 10, 4);
    ctx.fill();
    ctx.fillStyle = hpPct > 0.35 ? '#10b981' : '#ef4444';
    safeRoundRect(ctx, hx + 10, hy + 24, 190 * hpPct, 10, 4);
    ctx.fill();

    // Hero Fury Bar (0-100%)
    var furyPct = clamp(state.displayFury / 100, 0, 1);
    ctx.fillStyle = '#1e293b';
    safeRoundRect(ctx, hx + 10, hy + 40, 190, 9, 4);
    ctx.fill();
    ctx.fillStyle = state.fury >= 100 ? '#fde047' : '#f59e0b';
    safeRoundRect(ctx, hx + 10, hy + 40, 190 * furyPct, 9, 4);
    ctx.fill();

    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 9.5px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('NỘ: ' + Math.round(state.fury) + '%', hx + 12, hy + 58);
    if (state.shieldActive) {
      ctx.fillStyle = '#34d399';
      ctx.textAlign = 'right';
      ctx.fillText('KHIÊN (' + state.shieldTimer.toFixed(1) + 's)', hx + 200, hy + 58);
    }
    ctx.restore();

    // 2. Boss Overhead Bars
    var bx = clamp(bossPos.x - 115, state.width * 0.52, state.width - 236);
    var by = 16;
    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    safeRoundRect(ctx, bx, by, 220, 56, 10);
    ctx.fill();
    ctx.strokeStyle = theme.primary;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(state.bossName, bx + 10, by + 18);

    ctx.fillStyle = theme.glow;
    ctx.font = '10.5px sans-serif';
    ctx.fillText(state.bossTitle, bx + 10, by + 32);

    var bossPct = clamp(state.displayBossHp / Math.max(1, state.maxBossHp), 0, 1);
    ctx.fillStyle = '#1e293b';
    safeRoundRect(ctx, bx + 10, by + 38, 200, 11, 4);
    ctx.fill();
    ctx.fillStyle = theme.primary;
    safeRoundRect(ctx, bx + 10, by + 38, 200 * bossPct, 11, 4);
    ctx.fill();
    ctx.restore();

    // Speech Bubbles
    if (state.heroSpeechTimer > 0 && state.heroSpeech) {
      drawSpeechBubble(ctx, heroPos.x, heroPos.y - 102, state.heroSpeech, '#22d3ee');
    }
    if (state.bossSpeechTimer > 0 && state.bossSpeech && !state.defeatAnim.active) {
      drawSpeechBubble(ctx, bossPos.x, bossPos.y - 108, state.bossSpeech, theme.primary);
    }
  }

  function drawCanvasButtons(ctx) {
    for (var i = 0; i < state.buttons.length; i++) {
      var b = state.buttons[i];
      var isHover = state.hoverButtonId === b.id;
      var isUltReady = b.id === 'ult' && state.fury >= 100;
      var isShieldOn = b.id === 'shield' && state.shieldActive;

      ctx.save();
      ctx.fillStyle = isHover ? 'rgba(56, 189, 248, 0.35)' : b.bg;
      if (isUltReady) {
        ctx.fillStyle = 'rgba(245, 158, 11, ' + (0.35 + Math.sin(state.elapsed * 8) * 0.15) + ')';
      } else if (isShieldOn) {
        ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
      }

      safeRoundRect(ctx, b.x, b.y, b.w, b.h, 8);
      ctx.fill();
      ctx.strokeStyle = isUltReady ? '#fde047' : b.border;
      ctx.lineWidth = isHover || isUltReady ? 2.2 : 1.3;
      ctx.stroke();

      ctx.fillStyle = b.id === 'ult' && state.fury < 100 ? '#94a3b8' : '#f8fafc';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(b.label, b.x + b.w * 0.5, b.y + 20);
      ctx.restore();
    }
  }

  function drawDefeatBanner(ctx) {
    if (!state.defeatAnim.active) return;
    var alpha = clamp((state.defeatAnim.timer - 0.35) * 1.5, 0, 1);
    if (alpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = alpha;
    var bw = 420;
    var bh = 74;
    var bx = (state.width - bw) * 0.5;
    var by = state.height * 0.34;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
    safeRoundRect(ctx, bx, by, bw, bh, 14);
    ctx.fill();
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ĐÃ HẠ GỤC TRÙM!', state.width * 0.5, by + 35);
    ctx.fillStyle = '#a7f3d0';
    ctx.font = '13px sans-serif';
    ctx.fillText('Sân khấu đã được giải phóng khỏi toàn bộ Bug!', state.width * 0.5, by + 56);
    ctx.restore();
  }

  function update(dt) {
    state.elapsed += dt;
    state.displayPlayerHp = lerp(state.displayPlayerHp, state.playerHp, Math.min(1, dt * 8));
    state.displayBossHp = lerp(state.displayBossHp, state.bossHp, Math.min(1, dt * 8));
    state.displayFury = lerp(state.displayFury, state.fury, Math.min(1, dt * 8));

    if (state.actionCooldown > 0) state.actionCooldown = Math.max(0, state.actionCooldown - dt);
    if (state.shieldTimer > 0) {
      state.shieldTimer = Math.max(0, state.shieldTimer - dt);
      if (state.shieldTimer === 0) state.shieldActive = false;
    }
    if (state.heroSpeechTimer > 0) state.heroSpeechTimer = Math.max(0, state.heroSpeechTimer - dt);
    if (state.bossSpeechTimer > 0) state.bossSpeechTimer = Math.max(0, state.bossSpeechTimer - dt);
    if (state.screenShake > 0) state.screenShake = Math.max(0, state.screenShake - dt * 28);
    if (state.flashAlpha > 0) state.flashAlpha = Math.max(0, state.flashAlpha - dt * 2.5);

    // Background nodes drift
    for (var i = 0; i < state.bgNodes.length; i++) {
      var n = state.bgNodes[i];
      n.y -= n.speed * dt;
      if (n.y < 0) {
        n.y = state.height * 0.65;
        n.x = Math.random() * state.width;
      }
    }

    // Weakpoint respawn
    if (!state.weakpoint.active && !state.defeatAnim.active) {
      state.weakpoint.cooldown -= dt;
      if (state.weakpoint.cooldown <= 0) {
        spawnWeakpoint();
      }
    }

    // Hero animation timer & afterimages
    if (state.heroAnim.type !== 'idle') {
      state.heroAnim.timer += dt;
      if (state.heroAnim.type === 'slash' && Math.random() < 0.55) {
        var hp = getHeroAnchor();
        state.afterimages.push({ x: hp.x, y: hp.y, alpha: 0.9 });
      }
      if (state.heroAnim.timer >= state.heroAnim.duration) {
        state.heroAnim.type = 'idle';
        state.heroAnim.timer = 0;
      }
    }

    // Boss animation timer
    if (state.bossAnim.type !== 'idle') {
      state.bossAnim.timer += dt;
      if (state.bossAnim.timer >= state.bossAnim.duration) {
        state.bossAnim.type = 'idle';
        state.bossAnim.timer = 0;
      }
    }

    // Ultimate animation
    if (state.ultimateAnim.active) {
      state.ultimateAnim.timer += dt;
      if (Math.random() < 0.7) {
        var bp = getBossAnchor();
        spawnParticles(bp.x + (Math.random() - 0.5) * 60, bp.y + (Math.random() - 0.5) * 60, '#fde047', 2, 1.2, 1.1);
      }
      if (state.ultimateAnim.timer >= state.ultimateAnim.duration) {
        state.ultimateAnim.active = false;
      }
    }

    // Defeat animation
    if (state.defeatAnim.active) {
      state.defeatAnim.timer += dt;
    }

    // Afterimages fade
    for (var a = state.afterimages.length - 1; a >= 0; a--) {
      state.afterimages[a].alpha -= dt * 3.4;
      if (state.afterimages[a].alpha <= 0) state.afterimages.splice(a, 1);
    }

    // Projectiles
    for (var p = state.projectiles.length - 1; p >= 0; p--) {
      var pr = state.projectiles[p];
      pr.x += pr.vx * dt;
      pr.y += pr.vy * dt;
      pr.life -= dt;
      if (pr.life <= 0) state.projectiles.splice(p, 1);
    }

    // Slashes
    for (var s = state.slashes.length - 1; s >= 0; s--) {
      state.slashes[s].life -= dt;
      if (state.slashes[s].life <= 0) state.slashes.splice(s, 1);
    }

    // Shockwaves
    for (var w = state.shockwaves.length - 1; w >= 0; w--) {
      var sw = state.shockwaves[w];
      sw.life -= dt;
      sw.radius = lerp(sw.radius, sw.maxRadius, Math.min(1, dt * 10));
      if (sw.life <= 0) state.shockwaves.splice(w, 1);
    }

    // Particles
    for (var k = state.particles.length - 1; k >= 0; k--) {
      var pt = state.particles[k];
      pt.x += pt.vx * dt;
      pt.y += pt.vy * dt;
      pt.vy += pt.gravity * dt;
      pt.life -= dt;
      if (pt.life <= 0) state.particles.splice(k, 1);
    }

    // Floating Texts
    for (var f = state.floatingTexts.length - 1; f >= 0; f--) {
      var ft = state.floatingTexts[f];
      ft.y += ft.vy * dt;
      ft.life -= dt;
      if (ft.life <= 0) state.floatingTexts.splice(f, 1);
    }
  }

  function render() {
    var ctx = state.ctx;
    if (!ctx) return;
    var theme = BOSS_THEMES[state.chapterId] || BOSS_THEMES[1];

    ctx.save();
    ctx.scale(state.dpr, state.dpr);

    if (state.screenShake > 0) {
      var sx = (Math.random() - 0.5) * state.screenShake;
      var sy = (Math.random() - 0.5) * state.screenShake;
      ctx.translate(sx, sy);
    }

    drawArenaBackground(ctx, theme);

    var heroPos = getHeroAnchor();
    var bossPos = getBossAnchor();

    drawBoss(ctx, bossPos.x, bossPos.y, state.chapterId, theme);
    drawWeakpoint(ctx, bossPos);
    drawHero(ctx, heroPos.x, heroPos.y, 1);
    drawEffects(ctx);
    drawOverheadHUD(ctx, heroPos, bossPos, theme);
    drawCanvasButtons(ctx);
    drawDefeatBanner(ctx);

    if (state.flashAlpha > 0) {
      ctx.fillStyle = state.flashColor;
      ctx.globalAlpha = state.flashAlpha;
      ctx.fillRect(0, 0, state.width, state.height);
    }

    ctx.restore();
  }

  function loop(now) {
    if (!state.initialized) return;
    var t = typeof now === 'number' ? now : Date.now();
    var dt = state.lastTime ? Math.min(0.05, (t - state.lastTime) / 1000) : 0.016;
    state.lastTime = t;
    update(dt);
    render();
    if (typeof global.requestAnimationFrame === 'function') {
      state.rafId = global.requestAnimationFrame(loop);
    }
  }

  // =========================================================================
  // PUBLIC API (window.CTFLBattleStage)
  // =========================================================================

  var api = {
    init: function (canvasIdOrElement, options) {
      var el = resolveElement(canvasIdOrElement || 'battle-stage-canvas');
      if (!el || typeof el.getContext !== 'function') {
        return false;
      }

      if (state.rafId && typeof global.cancelAnimationFrame === 'function') {
        global.cancelAnimationFrame(state.rafId);
        state.rafId = null;
      }
      detachListeners();

      state.canvas = el;
      state.ctx = el.getContext('2d');
      if (!state.ctx) return false;

      state.initialized = true;
      state.lastTime = 0;
      state.defeatAnim.active = false;
      state.ultimateAnim.active = false;
      state.particles = [];
      state.floatingTexts = [];
      state.slashes = [];
      state.projectiles = [];
      state.shockwaves = [];
      state.afterimages = [];

      var opts = options || {};
      state.onStageAction = typeof opts.onStageAction === 'function' ? opts.onStageAction : null;
      state.onUltimateReady = typeof opts.onUltimateReady === 'function' ? opts.onUltimateReady : null;

      resizeCanvas();
      initBackgroundNodes();
      api.setCombatants(opts);
      attachListeners();

      // Draw one immediate frame synchronously (useful for VM tests & instant first paint)
      render();

      if (typeof global.requestAnimationFrame === 'function') {
        state.rafId = global.requestAnimationFrame(loop);
      }
      return true;
    },

    setCombatants: function (info) {
      var cfg = info || {};
      var chap = clamp(parseInt(cfg.chapterId, 10) || 1, 1, 6);
      var theme = BOSS_THEMES[chap] || BOSS_THEMES[1];
      state.chapterId = chap;
      state.bossName = cfg.bossName || theme.defaultName;
      state.bossTitle = cfg.bossTitle || theme.defaultTitle;
      state.maxPlayerHp = cfg.maxPlayerHp || 100;
      state.maxBossHp = cfg.maxBossHp || 100;
      state.playerHp = typeof cfg.playerHp === 'number' ? cfg.playerHp : state.maxPlayerHp;
      state.bossHp = typeof cfg.bossHp === 'number' ? cfg.bossHp : state.maxBossHp;
      state.displayPlayerHp = state.playerHp;
      state.displayBossHp = state.bossHp;
      state.combo = cfg.combo || 1;
      state.fury = clamp(typeof cfg.fury === 'number' ? cfg.fury : 0, 0, 100);
      state.displayFury = state.fury;
      state.defeatAnim.active = false;
      state.bossSpeech = theme.taunts[Math.floor(Math.random() * theme.taunts.length)];
      state.bossSpeechTimer = 5.0;
      spawnWeakpoint();
      if (state.ctx) render();
    },

    updateState: function (next) {
      var d = next || {};
      if (typeof d.maxPlayerHp === 'number') state.maxPlayerHp = d.maxPlayerHp;
      if (typeof d.maxBossHp === 'number') state.maxBossHp = d.maxBossHp;
      if (typeof d.playerHp === 'number') state.playerHp = clamp(d.playerHp, 0, state.maxPlayerHp);
      if (typeof d.bossHp === 'number') state.bossHp = clamp(d.bossHp, 0, state.maxBossHp);
      if (typeof d.combo === 'number') state.combo = Math.max(1, d.combo);
      if (typeof d.fury === 'number') {
        var prevFury = state.fury;
        state.fury = clamp(d.fury, 0, 100);
        if (prevFury < 100 && state.fury >= 100 && typeof state.onUltimateReady === 'function') {
          try { state.onUltimateReady(); } catch (e) {}
        }
      }
      if (typeof d.shieldActive === 'boolean') {
        state.shieldActive = d.shieldActive;
        if (d.shieldActive && state.shieldTimer <= 0) state.shieldTimer = 4.0;
      }
    },

    heroAttack: function (isCritical) {
      state.heroAnim = { type: 'slash', timer: 0, duration: 0.52, critical: !!isCritical };
      state.bossAnim = { type: 'hit', timer: 0, duration: 0.4 };
      var bossPos = getBossAnchor();
      var heroPos = getHeroAnchor();

      // Drone fires piercing laser across boss
      state.projectiles.push({
        x: heroPos.x + 20,
        y: heroPos.y - 48,
        vx: (bossPos.x - heroPos.x) * 3.4,
        vy: (bossPos.y - heroPos.y + 38) * 3.4,
        color: '#22d3ee',
        width: 5,
        life: 0.28
      });

      state.slashes.push({
        x: bossPos.x - 10,
        y: bossPos.y - 10,
        color: isCritical ? '#fbbf24' : '#22d3ee',
        life: 0.36,
        maxLife: 0.36
      });

      spawnParticles(bossPos.x, bossPos.y - 10, isCritical ? '#fde047' : '#38bdf8', isCritical ? 30 : 18, isCritical ? 1.35 : 1.0, 1.1);
      spawnShockwave(bossPos.x, bossPos.y - 10, isCritical ? '#fde047' : '#22d3ee', isCritical ? 105 : 70);

      if (isCritical) {
        state.screenShake = 12;
        state.flashAlpha = 0.22;
        state.flashColor = '#fde047';
        spawnFloatingText(bossPos.x, bossPos.y - 72, '-25 HP CHÍ MẠNG!', '#fde047', 1.35);
        state.heroSpeech = 'Nhất Kích Tất Sát!';
        state.heroSpeechTimer = 2.0;
      } else {
        state.screenShake = 5;
        spawnFloatingText(bossPos.x, bossPos.y - 64, 'TRÚNG ĐÒN!', '#38bdf8', 1.1);
      }
    },

    heroShoot: function () {
      state.heroAnim = { type: 'shoot', timer: 0, duration: 0.34, critical: false };
      state.bossAnim = { type: 'hit', timer: 0, duration: 0.32 };
      var heroPos = getHeroAnchor();
      var bossPos = getBossAnchor();

      for (var i = 0; i < 3; i++) {
        state.projectiles.push({
          x: heroPos.x + 16 + i * 18,
          y: heroPos.y - 14 + (i - 1) * 7,
          vx: 1150,
          vy: (bossPos.y - heroPos.y) * 1.8,
          color: '#34d399',
          width: 4.5,
          life: 0.42
        });
      }
      spawnParticles(bossPos.x - 12, bossPos.y - 8, '#34d399', 14, 0.95, 0.9);
      state.screenShake = 4;
    },

    heroShieldBlock: function () {
      state.shieldActive = true;
      state.shieldTimer = 2.2;
      var heroPos = getHeroAnchor();
      spawnShockwave(heroPos.x + 42, heroPos.y - 6, '#34d399', 88);
      spawnParticles(heroPos.x + 42, heroPos.y - 6, '#34d399', 22, 1.0, 1.0);
      spawnFloatingText(heroPos.x + 25, heroPos.y - 76, 'ĐỠ ĐÒN THÀNH CÔNG! GIẢM 75% SÁT THƯƠNG!', '#34d399', 1.15);
      state.heroSpeech = 'Khiên Hologram đã chặn đòn!';
      state.heroSpeechTimer = 2.4;
    },

    heroUltimate: function () {
      state.fury = 0;
      state.heroAnim = { type: 'ultimate', timer: 0, duration: 1.05, critical: true };
      state.bossAnim = { type: 'hit', timer: 0, duration: 1.0 };
      state.ultimateAnim = { active: true, timer: 0, duration: 1.45 };
      state.screenShake = 18;
      state.flashAlpha = 0.42;
      state.flashColor = '#38bdf8';

      var bossPos = getBossAnchor();
      spawnShockwave(bossPos.x, bossPos.y, '#fde047', 160);
      spawnParticles(bossPos.x, bossPos.y, '#fde047', 45, 1.5, 1.3);
      spawnFloatingText(bossPos.x, bossPos.y - 82, 'TUYỆT KỸ VŨ TRỤ! -15 HP!', '#fde047', 1.45);
      state.heroSpeech = 'ORBITAL QA LASER — DIỆT BUG!';
      state.heroSpeechTimer = 2.8;
    },

    bossAttack: function () {
      var theme = BOSS_THEMES[state.chapterId] || BOSS_THEMES[1];
      state.bossAnim = { type: 'attack', timer: 0, duration: 0.56 };
      var bossPos = getBossAnchor();
      var heroPos = getHeroAnchor();

      state.projectiles.push({
        x: bossPos.x - 30,
        y: bossPos.y - 14,
        vx: -1020,
        vy: (heroPos.y - bossPos.y) * 1.4,
        color: '#f43f5e',
        width: 8,
        life: 0.48
      });

      if (state.shieldActive) {
        api.heroShieldBlock();
        return;
      }

      state.heroAnim = { type: 'hit', timer: 0, duration: 0.42, critical: false };
      state.screenShake = 9;
      state.flashAlpha = 0.2;
      state.flashColor = '#ef4444';
      spawnParticles(heroPos.x, heroPos.y - 10, '#f43f5e', 20, 1.0, 1.0);
      spawnFloatingText(heroPos.x, heroPos.y - 68, 'TRÚNG ĐÒN TRÙM!', '#fb7185', 1.15);
      state.bossSpeech = theme.taunts[Math.floor(Math.random() * theme.taunts.length)];
      state.bossSpeechTimer = 3.0;
    },

    bossDefeat: function () {
      state.defeatAnim.active = true;
      state.defeatAnim.timer = 0;
      state.weakpoint.active = false;
      state.screenShake = 16;
      state.flashAlpha = 0.45;
      state.flashColor = '#fde047';

      var bossPos = getBossAnchor();
      spawnShockwave(bossPos.x, bossPos.y, '#fde047', 180);
      spawnParticles(bossPos.x, bossPos.y, '#fde047', 70, 1.7, 1.4);
      spawnParticles(bossPos.x, bossPos.y, '#38bdf8', 55, 1.5, 1.2);
      spawnParticles(bossPos.x, bossPos.y, '#f43f5e', 45, 1.4, 1.1);
      state.heroSpeech = 'ĐẠI TRÙM ĐÃ BỊ HẠ GỤC!';
      state.heroSpeechTimer = 4.0;
    },

    destroy: function () {
      state.initialized = false;
      if (state.rafId && typeof global.cancelAnimationFrame === 'function') {
        global.cancelAnimationFrame(state.rafId);
        state.rafId = null;
      }
      detachListeners();
    },

    // =======================================================================
    // MINI-STAGE INTERACTIVE BATTLE FOR #view-study (Per-Section Guardian)
    // =======================================================================
    renderMiniLessonBattle: function (containerEl, opts) {
      var container = resolveElement(containerEl);
      if (!container) return null;
      var cfg = opts || {};
      var chapterId = clamp(parseInt(cfg.chapterId, 10) || 1, 1, 6);
      var sectionCode = cfg.sectionCode || (chapterId + '.1');
      var sectionTitle = cfg.sectionTitle || 'Kiểm tra nhanh kiến thức';
      var theme = BOSS_THEMES[chapterId] || BOSS_THEMES[1];
      var questions = Array.isArray(cfg.questions) && cfg.questions.length > 0
        ? cfg.questions.slice(0, 2)
        : [
            {
              prompt: 'Mục tiêu chính của phần ' + sectionCode + ' (' + sectionTitle + ') là gì?',
              options: [
                'Phát hiện khiếm khuyết sớm và đánh giá chất lượng sản phẩm',
                'Chứng minh phần mềm hoàn toàn 100% không có lỗi',
                'Thay thế hoàn toàn hoạt động lập trình của Developer',
                'Chỉ chạy kiểm thử sau khi đã đưa lên môi trường Production'
              ],
              correctIndex: 0,
              explanation: 'Kiểm thử giúp phát hiện khiếm khuyết, giảm thiểu rủi ro và cung cấp thông tin về chất lượng.'
            },
            {
              prompt: 'Khi áp dụng kiến thức mục ' + sectionCode + ' vào thực tế dự án, điều nào sau đây đúng nhất?',
              options: [
                'Bỏ qua phân tích ngữ cảnh để tiết kiệm thời gian',
                'Áp dụng có hệ thống, phù hợp ngữ cảnh và có khả năng truy vết',
                'Chỉ kiểm thử một lần duy nhất cho mọi phiên bản',
                'Không cần trao đổi với các thành viên khác trong nhóm'
              ],
              correctIndex: 1,
              explanation: 'Hoạt động kiểm thử hiệu quả luôn phụ thuộc ngữ cảnh, có hệ thống và cộng tác chặt chẽ.'
            }
          ];

      var qIndex = 0;
      var bossHp = 100;
      var heroHp = 100;
      var score = 0;
      var completed = false;
      var miniRaf = null;
      var miniTime = 0;
      var miniHitTimer = 0;
      var miniHeroSlash = 0;

      container.innerHTML =
        '<div class="mini-battle-card" style="border:1px solid rgba(56,189,248,0.35);border-radius:14px;padding:14px;background:rgba(15,23,42,0.86);margin-top:12px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px;">' +
            '<div>' +
              '<span style="font-size:11px;font-weight:700;color:#22d3ee;letter-spacing:0.06em;">ĐẤU TRƯỜNG BÀI HỌC MỤC ' + sectionCode + '</span>' +
              '<h4 style="margin:2px 0 0;font-size:15px;color:#f8fafc;">Quái Canh Cổng: ' + theme.defaultName + ' (Mini)</h4>' +
            '</div>' +
            '<span class="mini-battle-hp" style="font-family:monospace;font-size:12px;color:#fda4af;font-weight:700;">HP Quái: 100% | HP Bạn: 100%</span>' +
          '</div>' +
          '<canvas class="mini-battle-canvas" width="560" height="150" style="width:100%;max-width:560px;height:150px;display:block;margin:0 auto 12px;border-radius:10px;border:1px solid rgba(148,163,184,0.2);background:#070b19;"></canvas>' +
          '<div class="mini-battle-quiz"></div>' +
        '</div>';

      var canvas = typeof container.querySelector === 'function' ? container.querySelector('.mini-battle-canvas') : null;
      var hpLabel = typeof container.querySelector === 'function' ? container.querySelector('.mini-battle-hp') : null;
      var quizBox = typeof container.querySelector === 'function' ? container.querySelector('.mini-battle-quiz') : null;
      var mCtx = canvas && typeof canvas.getContext === 'function' ? canvas.getContext('2d') : null;

      function drawMiniScene() {
        if (!mCtx) return;
        var w = 560;
        var h = 150;
        mCtx.clearRect(0, 0, w, h);
        mCtx.fillStyle = '#070b19';
        mCtx.fillRect(0, 0, w, h);

        // Floor line
        mCtx.strokeStyle = 'rgba(56,189,248,0.35)';
        mCtx.beginPath();
        mCtx.moveTo(0, 122);
        mCtx.lineTo(w, 122);
        mCtx.stroke();

        // Hero mini
        var hx = 115 + (miniHeroSlash > 0 ? Math.sin(miniHeroSlash * Math.PI * 3) * 140 : 0);
        var hy = 86 + Math.sin(miniTime * 4) * 3;
        mCtx.save();
        mCtx.translate(hx, hy);
        mCtx.fillStyle = '#0284c7';
        safeRoundRect(mCtx, -14, -18, 28, 36, 6);
        mCtx.fill();
        mCtx.fillStyle = '#22d3ee';
        mCtx.beginPath();
        mCtx.arc(0, -28, 12, 0, Math.PI * 2);
        mCtx.fill();
        // Plasma blade
        mCtx.fillStyle = '#38bdf8';
        safeRoundRect(mCtx, 14, -8, 34, 5, 2);
        mCtx.fill();
        mCtx.restore();

        // Guardian Boss mini
        if (bossHp > 0) {
          var bx = 435 + (miniHitTimer > 0 ? Math.sin(miniTime * 40) * 8 : 0);
          var by = 82 + Math.sin(miniTime * 2.5) * 5;
          mCtx.save();
          mCtx.translate(bx, by);
          mCtx.fillStyle = miniHitTimer > 0 ? '#ef4444' : theme.primary;
          mCtx.beginPath();
          mCtx.arc(0, 0, 28, 0, Math.PI * 2);
          mCtx.fill();
          mCtx.fillStyle = '#fde047';
          mCtx.beginPath();
          mCtx.arc(-8, -4, 4, 0, Math.PI * 2);
          mCtx.arc(8, -4, 4, 0, Math.PI * 2);
          mCtx.fill();
          mCtx.restore();
        } else {
          mCtx.fillStyle = '#fde047';
          mCtx.font = 'bold 16px sans-serif';
          mCtx.textAlign = 'center';
          mCtx.fillText('ĐÃ CHINH PHỤC MỤC ' + sectionCode + '!', 380, 84);
        }
      }

      function miniTick() {
        miniTime += 0.016;
        if (miniHitTimer > 0) miniHitTimer = Math.max(0, miniHitTimer - 0.016);
        if (miniHeroSlash > 0) miniHeroSlash = Math.max(0, miniHeroSlash - 0.016);
        drawMiniScene();
        if (!completed && typeof global.requestAnimationFrame === 'function') {
          miniRaf = global.requestAnimationFrame(miniTick);
        }
      }

      function renderQuestion() {
        if (!quizBox) return;
        if (qIndex >= questions.length || bossHp <= 0) {
          completed = true;
          bossHp = 0;
          if (hpLabel) hpLabel.textContent = 'HP Quái: 0% | HP Bạn: ' + heroHp + '%';
          drawMiniScene();
          quizBox.innerHTML =
            '<div style="padding:10px 12px;border-radius:10px;background:rgba(16,185,129,0.16);border:1px solid #34d399;color:#a7f3d0;font-weight:600;">' +
              '[CHIẾN THẮNG] Bạn đã tiêu diệt Quái Canh Cổng mục <strong>' + sectionCode + '</strong> (' + score + '/' + questions.length + ' câu đúng) — Thưởng <strong>+35 XP</strong>!' +
            '</div>';
          if (typeof cfg.onComplete === 'function') {
            try {
              cfg.onComplete({
                chapterId: chapterId,
                sectionCode: sectionCode,
                score: score,
                total: questions.length,
                xp: 35
              });
            } catch (e) {}
          }
          return;
        }

        var q = questions[qIndex];
        var promptText = q.prompt || q.scenario || ('Câu hỏi kiểm tra mục ' + sectionCode);
        var correctIdx = typeof q.correctIndex === 'number' ? q.correctIndex : (typeof q.correct === 'number' ? q.correct : 0);
        var optsHtml = '';
        var letters = ['A', 'B', 'C', 'D'];
        for (var i = 0; i < q.options.length; i++) {
          var cleanOpt = String(q.options[i] || '').replace(/^[A-Da-d][\.\)\:]\s*/, '');
          optsHtml +=
            '<button type="button" class="mini-q-opt" data-idx="' + i + '" style="display:block;width:100%;text-align:left;padding:8px 12px;margin-top:6px;border-radius:8px;border:1px solid rgba(148,163,184,0.28);background:rgba(30,41,59,0.75);color:#e2e8f0;cursor:pointer;font-size:13px;">' +
              '<strong>' + letters[i] + '.</strong> ' + cleanOpt +
            '</button>';
        }

        quizBox.innerHTML =
          '<div style="font-size:13.5px;color:#f8fafc;font-weight:600;margin-bottom:6px;">Câu ' + (qIndex + 1) + '/' + questions.length + ': ' + promptText + '</div>' +
          '<div>' + optsHtml + '</div>' +
          '<div class="mini-q-feedback" style="margin-top:8px;font-size:12.5px;"></div>';

        var btns = typeof quizBox.querySelectorAll === 'function' ? quizBox.querySelectorAll('.mini-q-opt') : [];
        var fb = typeof quizBox.querySelector === 'function' ? quizBox.querySelector('.mini-q-feedback') : null;
        for (var b = 0; b < btns.length; b++) {
          (function (btn) {
            if (typeof btn.addEventListener !== 'function') return;
            btn.addEventListener('click', function () {
              var picked = parseInt(btn.getAttribute('data-idx'), 10);
              var isRight = picked === correctIdx;
              if (isRight) {
                score++;
                var dmg = Math.ceil(100 / questions.length);
                bossHp = Math.max(0, bossHp - dmg);
                miniHeroSlash = 0.45;
                miniHitTimer = 0.45;
                if (hpLabel) hpLabel.textContent = 'HP Quái: ' + bossHp + '% | HP Bạn: ' + heroHp + '%';
                if (fb) fb.innerHTML = '<span style="color:#34d399;font-weight:600;">[CHÍNH XÁC] Chém bay ' + dmg + '% HP Quái! ' + (q.explanation || '') + '</span>';
                qIndex++;
                if (typeof global.setTimeout === 'function') {
                  global.setTimeout(renderQuestion, 750);
                } else {
                  renderQuestion();
                }
              } else {
                heroHp = Math.max(15, heroHp - 20);
                if (hpLabel) hpLabel.textContent = 'HP Quái: ' + bossHp + '% | HP Bạn: ' + heroHp + '%';
                if (fb) fb.innerHTML = '<span style="color:#fb7185;font-weight:600;">[SAI] Chưa chính xác! Quái phản đòn (-20% HP). Hãy thử chọn lại đáp án đúng!</span>';
              }
            });
          })(btns[b]);
        }
      }

      drawMiniScene();
      if (typeof global.requestAnimationFrame === 'function') {
        miniRaf = global.requestAnimationFrame(miniTick);
      }
      renderQuestion();

      return {
        destroy: function () {
          completed = true;
          if (miniRaf && typeof global.cancelAnimationFrame === 'function') {
            global.cancelAnimationFrame(miniRaf);
          }
        }
      };
    }
  };

  global.CTFLBattleStage = api;
})(typeof window !== 'undefined' ? window : globalThis);
