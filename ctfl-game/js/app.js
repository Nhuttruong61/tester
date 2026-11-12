/**
 * CTFL Bug Hunter 3D: Đấu Trường Săn Lỗi
 * Core Game Engine, 3D World Integration, State Management & Interactive Views (ISTQB CTFL v4.0.1)
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'ctfl_cyber_arena_v1';

  const RANKS = [
    { minLevel: 1, title: 'Tân Binh Diệt Bug', icon: '🪲' },
    { minLevel: 3, title: 'Thợ Săn Lỗi Sơ Cấp', icon: '🔍' },
    { minLevel: 6, title: 'Kiểm Thử Viên Thực Chiến', icon: '🛡️' },
    { minLevel: 9, title: 'Kỹ Sư Phân Tích K3', icon: '📐' },
    { minLevel: 12, title: 'Chiến Thần Tự Động Hóa', icon: '⚡' },
    { minLevel: 15, title: 'Đại Kiện Tướng ISTQB CTFL', icon: '👑' }
  ];

  const ACHIEVEMENTS = [
    {
      id: 'first_blood',
      title: 'Chiến Công Đầu Tiên',
      desc: 'Tiêu diệt con Bug đầu tiên hoặc trả lời đúng câu hỏi ISTQB đầu tiên trong đấu trường.',
      icon: '🩸'
    },
    {
      id: 'combo_5',
      title: 'Chuỗi Liên Kích 5x',
      desc: 'Đạt chuỗi trả lời đúng 5 câu liên tiếp trong một trận đột kích.',
      icon: '🔥'
    },
    {
      id: 'combo_10',
      title: 'Tuyệt Kỹ Không Lỗi (Combo 10x)',
      desc: 'Đạt chuỗi trả lời đúng 10 câu liên tiếp không một sai sót.',
      icon: '⚡'
    },
    {
      id: 'first_boss',
      title: 'Dũng Sĩ Diệt Trùm',
      desc: 'Hạ gục thành công Đại Trùm Chương đầu tiên trong Chiến Dịch.',
      icon: '⚔️'
    },
    {
      id: 'all_bosses',
      title: 'Giải Phóng Đấu Trường 3D',
      desc: 'Đánh bại toàn bộ 6 Đại Trùm từ Chương 1 đến Chương 6.',
      icon: '🏆'
    },
    {
      id: 'k3_architect',
      title: 'Kiến Trúc Sư Thiết Kế K3',
      desc: 'Chiến thắng Phòng Lab Thực Chiến K3 (Phân vùng tương đương, Giá trị biên, Bảng quyết định, Chuyển đổi trạng thái, Ước lượng 3 điểm).',
      icon: '📐'
    },
    {
      id: 'mistake_cleanser',
      title: 'Thanh Trừ Sổ Thù Vặt',
      desc: 'Xóa bỏ thành công ít nhất 1 lỗi sai khỏi Sổ Thù Vặt (trả lời đúng 2 lần liên tiếp).',
      icon: '🧹'
    },
    {
      id: 'exam_certified',
      title: 'Đạt Chuẩn Quốc Tế ISTQB CTFL',
      desc: 'Vượt qua kỳ thi thử 40 câu chuẩn ISTQB với số điểm từ 26/40 (65%) trở lên.',
      icon: '🎓'
    },
    {
      id: 'exam_distinction',
      title: 'Thủ Khoa Kiểm Thử (>= 85%)',
      desc: 'Đạt từ 34/40 câu đúng trở lên trong kỳ thi thử quốc tế ISTQB.',
      icon: '🌟'
    },
    {
      id: 'blitz_demon',
      title: 'Thần Tốc Đập Bug 60 Giây',
      desc: 'Đạt từ 1000 điểm trở lên trong chế độ Đập Bug 60 Giây.',
      icon: '🚀'
    },
    {
      id: 'flashcard_scholar',
      title: 'Học Giả Thuật Ngữ ISTQB',
      desc: 'Đánh dấu "Đã thuộc lòng" ít nhất 20 thẻ nhớ thuật ngữ ISTQB.',
      icon: '🧠'
    },
    {
      id: 'bugs_100',
      title: 'Bách Chiến Diệt Trăm Bug',
      desc: 'Tiêu diệt tổng cộng 100 Bug trong thế giới 3D và đấu trường câu hỏi.',
      icon: '💯'
    }
  ];

  const ACHIEVEMENTS_CATALOG = ACHIEVEMENTS;

  const DAILY_QUESTS = [
    {
      id: 'dq_smash_10',
      title: 'Tiêu diệt 10 Quái Vật Bug trong Thế Giới 3D hoặc Đấu Trường',
      desc: 'Bắn hạ Bug 3D hoặc trả lời đúng 10 câu hỏi ISTQB hôm nay để duy trì chuỗi ngày học và thăng cấp nhanh.',
      target: 10,
      rewardXP: 150
    },
    {
      id: 'dq_raid_boss',
      title: 'Khiêu chiến và đánh bại Đại Trùm Chương bất kỳ',
      desc: 'Điều khiển Chiến Binh 3D bước vào Cổng Không Gian hoặc chọn một chương để đột kích Trùm Lỗi Hệ Thống.',
      target: 10,
      rewardXP: 150
    },
    {
      id: 'dq_k3_mastery',
      title: 'Rèn luyện tư duy phân tích thiết kế kiểm thử chuẩn ISTQB',
      desc: 'Hoàn thành mục tiêu diệt lỗi mỗi ngày để mở khóa danh hiệu Đại Kiện Tướng ISTQB CTFL.',
      target: 10,
      rewardXP: 150
    }
  ];

  const EXAM_WEIGHTS = {
    1: 8,
    2: 6,
    3: 4,
    4: 11,
    5: 9,
    6: 2
  };

  const BOSS_QUOTES = {
    intro: [
      'Ngươi nghĩ đọc lướt giáo trình Syllabus là qua được ải này sao?',
      'Cẩn thận đấy! Các phương án gây nhiễu chuẩn ISTQB đang chờ ngươi!',
      'Hãy phân biệt rõ Sai lầm (Error), Khiếm khuyết (Defect) và Thất bại (Failure) trước khi đối đầu ta!',
      'Phân tích giá trị biên 3 điểm và Bảng quyết định sẽ nghiền nát Giáp Hệ Thống của ngươi!'
    ],
    hit: [
      'Á! Cú phân tích sắc bén đấy, Chiến Binh Tester!',
      'Không thể nào! Ngươi thuộc nằm lòng cả chi tiết Syllabus v4.0.1 ư?!',
      'Khiên chắn khiếm khuyết của ta vừa bị đòn Laser 3D xuyên thủng!',
      'Đòn đánh chí mạng chuẩn xác theo đúng chuẩn ISTQB!'
    ],
    miss: [
      'Haha! Dính bẫy thuật ngữ ISTQB rồi nhé!',
      'Đọc kỹ ngữ cảnh câu hỏi hơn đi, Tân Binh Diệt Bug!',
      'Một Khiếm khuyết (Defect) vừa lọt lưới và trừ thẳng vào Giáp của ngươi!',
      'Ghi ngay câu hỏi này vào Sổ Thù Vặt để ôn lại đi!'
    ]
  };

  function safeEl(id) {
    return document.getElementById(id);
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function formatTimeMMSS(totalSeconds) {
    const sec = Math.max(0, Math.floor(totalSeconds));
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function getTodayString() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  class CTFLGameApp {
    constructor() {
      this.chapters = [];
      this.questions = [];
      this.flashcards = [];
      this.ranks = RANKS;
      this.achievements = ACHIEVEMENTS;
      this.dailyQuests = DAILY_QUESTS;
      this.currentView = 'campaign';
      this.campaignFilter = 'all';

      this.state = this._getDefaultState();
      this.arena = null;
      this.exam = null;
      this.blitz = null;
      this.fcState = {
        filter: 'all',
        deck: [],
        index: 0,
        flipped: false
      };
      this.codexState = {
        chapter: 'all',
        search: ''
      };
      this.studyChapter = 1;
    }

    _getDefaultState() {
      const todayQuest = DAILY_QUESTS[0];
      return {
        xp: 0,
        level: 1,
        rank: 'Tân Binh Diệt Bug',
        streak: 1,
        lastPlayedDate: getTodayString(),
        bugsSmashed: 0,
        totalAnswered: 0,
        profile: {
          bugsSmashed: 0,
          xp: 0,
          level: 1,
          rank: 'Tân Binh Diệt Bug'
        },
        chapters: [],
        studiedSections: {},
        dailyQuest: {
          date: getTodayString(),
          title: todayQuest.title,
          desc: todayQuest.desc,
          progress: 0,
          target: todayQuest.target,
          claimed: false
        },
        chapterStats: {
          1: { correct: 0, attempts: 0 },
          2: { correct: 0, attempts: 0 },
          3: { correct: 0, attempts: 0 },
          4: { correct: 0, attempts: 0 },
          5: { correct: 0, attempts: 0 },
          6: { correct: 0, attempts: 0 }
        },
        answeredRightMap: {},
        bossDefeated: {},
        mistakes: [],
        mistakeRecovery: {},
        knownFlashcards: [],
        examHistory: [],
        blitzHighScore: 0,
        blitzBestStreak: 0,
        unlockedAchievements: [],
        mistakesClearedCount: 0,
        theme: 'dark'
      };
    }

    _syncProfileState() {
      if (!this.state.profile || typeof this.state.profile !== 'object') {
        this.state.profile = { bugsSmashed: 0, xp: 0, level: 1, rank: 'Tân Binh Diệt Bug' };
      }
      if (typeof this.state.profile.bugsSmashed === 'number' && this.state.profile.bugsSmashed > this.state.bugsSmashed) {
        this.state.bugsSmashed = this.state.profile.bugsSmashed;
      } else {
        this.state.profile.bugsSmashed = this.state.bugsSmashed || 0;
      }
      const lvl = this.getLevelFromXP(this.state.xp || 0);
      this.state.level = lvl;
      const vnRank = this.getRankForLevel(lvl).title;
      this.state.rank = vnRank;
      this.state.profile.xp = this.state.xp || 0;
      this.state.profile.level = lvl;
      this.state.profile.rank = vnRank;
      this.state.studiedSections = this.state.studiedSections || {};
      this.state.chapters = this.chapters;
    }

    init() {
      this._loadDataPools();
      this._loadState();
      this._syncProfileState();
      this._checkDailyStreak();
      this._applyTheme();

      if (typeof window !== 'undefined' && window.CTFLParticles) {
        window.CTFLParticles.init();
      }

      this._initWorld3D();
      this._bindGlobalEvents();
      this.updateHUD();
      this.renderStudyView();
      this.renderCampaignView();
      this.renderExamIntro();
      this.renderBlitzIntro();
      this.initFlashcardsView();
      this.renderCodexView();
    }

    _initWorld3D() {
      if (typeof window === 'undefined' || !window.CTFLWorld3D) return;
      const w3d = window.CTFLWorld3D;
      const onPortalInteract = (type, chapterId) => this.onPortalInteract(type, chapterId);
      const onBugSmashed = (xp) => this.onBugSmashed(xp);

      w3d.onPortalInteract = onPortalInteract;
      w3d.onBugSmashed = onBugSmashed;

      if (typeof w3d.init === 'function') {
        w3d.init({
          chapters: this.state.chapters && this.state.chapters.length ? this.state.chapters : this.chapters,
          onPortalInteract: onPortalInteract,
          onBugSmashed: onBugSmashed
        });
      }
    }

    onBugSmashed(xp) {
      const rewardXp = Number(xp) > 0 ? Number(xp) : 25;
      this.state.bugsSmashed = (this.state.bugsSmashed || 0) + 1;
      this.state.totalAnswered = (this.state.totalAnswered || 0) + 1;
      this._syncProfileState();

      if (this.state.dailyQuest && this.state.dailyQuest.progress < this.state.dailyQuest.target) {
        this.state.dailyQuest.progress++;
        if (this.state.dailyQuest.progress >= this.state.dailyQuest.target && !this.state.dailyQuest.claimed) {
          this.state.dailyQuest.claimed = true;
          this.addXP(150);
          this._showToast('🎉 Hoàn thành Nhiệm Vụ Hàng Ngày! +150 XP');
        }
      }

      if (typeof window !== 'undefined' && window.CTFLSound) {
        window.CTFLSound.correct(1);
      }

      this.addXP(rewardXp);
      this.checkAchievements();
      this.saveState();
      this.updateHUD();
      this._showToast(`🎯 Đã bắn hạ Quái Vật Bug 3D! +${rewardXp} XP`);
    }

    onPortalInteract(type, chapterId) {
      if (typeof document !== 'undefined' && document.body) {
        document.body.classList.remove('world3d-freeroam');
        this._updateFreeroamToggleText();
      }
      if (typeof window !== 'undefined' && window.CTFLSound) {
        window.CTFLSound.click();
      }

      const normalizedType = String(type || 'chapter').toLowerCase();
      if (normalizedType === 'chapter' || normalizedType === 'boss') {
        this.startChapterRaid(chapterId || 1);
      } else if (normalizedType === 'exam') {
        this.switchView('exam');
      } else if (normalizedType === 'blitz') {
        this.switchView('blitz');
      } else if (normalizedType === 'mistakes' || normalizedType === 'mistake') {
        this.startMistakeRaid();
      } else if (normalizedType === 'k3') {
        this.startArenaSession('k3', null);
      } else if (normalizedType === 'flashcards') {
        this.switchView('flashcards');
      } else if (normalizedType === 'codex') {
        this.switchView('codex');
      } else if (Number(type) >= 1 && Number(type) <= 6) {
        this.startChapterRaid(Number(type));
      } else {
        this.startChapterRaid(chapterId || 1);
      }
    }

    _showToast(message) {
      const container = safeEl('toast-container');
      if (!container || typeof document === 'undefined') return;
      const toast = document.createElement('div');
      toast.className = 'tactical-toast';
      toast.textContent = message;
      container.appendChild(toast);
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 2200);
    }

    _loadDataPools() {
      const ch123 = (typeof window !== 'undefined' && Array.isArray(window.CTFL_CHAPTERS_123)) ? window.CTFL_CHAPTERS_123 : [];
      const ch456 = (typeof window !== 'undefined' && Array.isArray(window.CTFL_CHAPTERS_456)) ? window.CTFL_CHAPTERS_456 : [];
      this.chapters = ch123.concat(ch456).sort((a, b) => a.id - b.id);

      const q123 = (typeof window !== 'undefined' && Array.isArray(window.CTFL_QUESTIONS_123)) ? window.CTFL_QUESTIONS_123 : [];
      const q456 = (typeof window !== 'undefined' && Array.isArray(window.CTFL_QUESTIONS_456)) ? window.CTFL_QUESTIONS_456 : [];
      this.questions = q123.concat(q456);

      const fc123 = (typeof window !== 'undefined' && Array.isArray(window.CTFL_FLASHCARDS_123)) ? window.CTFL_FLASHCARDS_123 : [];
      const fc456 = (typeof window !== 'undefined' && Array.isArray(window.CTFL_FLASHCARDS_456)) ? window.CTFL_FLASHCARDS_456 : [];
      this.flashcards = fc123.concat(fc456);
    }

    _loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          const def = this._getDefaultState();
          this.state = Object.assign({}, def, parsed);
          this.state.chapterStats = Object.assign({}, def.chapterStats, parsed.chapterStats || {});
          this.state.dailyQuest = Object.assign({}, def.dailyQuest, parsed.dailyQuest || {});
          this.state.answeredRightMap = parsed.answeredRightMap || {};
          this.state.bossDefeated = parsed.bossDefeated || {};
          this.state.mistakes = Array.isArray(parsed.mistakes) ? parsed.mistakes : [];
          this.state.mistakeRecovery = parsed.mistakeRecovery || {};
          this.state.knownFlashcards = Array.isArray(parsed.knownFlashcards) ? parsed.knownFlashcards : [];
          this.state.examHistory = Array.isArray(parsed.examHistory) ? parsed.examHistory : [];
          this.state.unlockedAchievements = Array.isArray(parsed.unlockedAchievements) ? parsed.unlockedAchievements : [];
        }
      } catch (_) {
        this.state = this._getDefaultState();
      }
      this._syncProfileState();
    }

    saveState() {
      this._syncProfileState();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (_) {
        // Ignore storage errors
      }
    }

    _checkDailyStreak() {
      const today = getTodayString();
      const dayIdx = new Date().getDate() % DAILY_QUESTS.length;
      const questTemplate = DAILY_QUESTS[dayIdx] || DAILY_QUESTS[0];
      if (this.state.dailyQuest.date !== today) {
        this.state.dailyQuest = {
          date: today,
          title: questTemplate.title,
          desc: questTemplate.desc,
          progress: 0,
          target: questTemplate.target || 10,
          claimed: false
        };
      }
      if (this.state.lastPlayedDate !== today) {
        const last = new Date(this.state.lastPlayedDate);
        const curr = new Date(today);
        const diffDays = Math.round((curr - last) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          this.state.streak = (this.state.streak || 1) + 1;
        } else if (diffDays > 1) {
          this.state.streak = 1;
        }
        this.state.lastPlayedDate = today;
        this.saveState();
      }
    }

    _applyTheme() {
      if (typeof document === 'undefined') return;
      const theme = this.state.theme === 'light' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      const btn = safeEl('btn-theme-toggle');
      if (btn) {
        btn.innerHTML = `<span class="util-icon" aria-hidden="true">${theme === 'light' ? '☀️' : '🌙'}</span><span class="util-label">${theme === 'light' ? 'SÁNG' : 'TỐI'}</span>`;
      }
      const soundBtn = safeEl('btn-sound-toggle');
      if (soundBtn && window.CTFLSound) {
        const on = window.CTFLSound.enabled;
        soundBtn.innerHTML = `<span class="util-icon" aria-hidden="true">${on ? '🔊' : '🔇'}</span><span class="util-label">${on ? 'BẬT TIẾNG' : 'TẮT TIẾNG'}</span>`;
      }
    }

    getLevelFromXP(xp) {
      return Math.max(1, Math.floor(xp / 200) + 1);
    }

    getRankForLevel(level) {
      let current = RANKS[0];
      for (let i = 0; i < RANKS.length; i++) {
        if (level >= RANKS[i].minLevel) {
          current = RANKS[i];
        }
      }
      return current;
    }

    addXP(amount) {
      if (!amount || amount <= 0) return;
      const oldLevel = this.getLevelFromXP(this.state.xp);
      this.state.xp += amount;
      const newLevel = this.getLevelFromXP(this.state.xp);
      this.state.level = newLevel;
      this._syncProfileState();
      if (newLevel > oldLevel) {
        if (window.CTFLSound) window.CTFLSound.levelUp();
        if (window.CTFLParticles) window.CTFLParticles.bossExplosion();
        this._showToast(`🎉 Thăng Cấp ${newLevel}: ${this.getRankForLevel(newLevel).title}!`);
      }
      this.saveState();
      this.updateHUD();
    }

    unlockAchievement(id) {
      if (!this.state.unlockedAchievements.includes(id)) {
        this.state.unlockedAchievements.push(id);
        const ach = ACHIEVEMENTS.find((a) => a.id === id);
        if (ach) {
          this._showToast(`🏆 Mở khóa Chiến Công: ${ach.title}!`);
        }
        this.saveState();
      }
    }

    checkAchievements() {
      this._syncProfileState();
      if (this.state.bugsSmashed >= 1) this.unlockAchievement('first_blood');
      if (this.state.bugsSmashed >= 100) this.unlockAchievement('bugs_100');
      if (this.state.knownFlashcards.length >= 20) this.unlockAchievement('flashcard_scholar');
      if (this.state.mistakesClearedCount >= 1) this.unlockAchievement('mistake_cleanser');
      if (this.state.blitzHighScore >= 1000) this.unlockAchievement('blitz_demon');

      const defeatedIds = Object.keys(this.state.bossDefeated).filter((k) => this.state.bossDefeated[k]);
      if (defeatedIds.length >= 1) this.unlockAchievement('first_boss');
      if ([1, 2, 3, 4, 5, 6].every((id) => this.state.bossDefeated[id])) {
        this.unlockAchievement('all_bosses');
      }
    }

    getChapterMastery(chapterId) {
      const chapterQuestions = this.questions.filter((q) => q.chapter === Number(chapterId));
      if (chapterQuestions.length === 0) return 0;
      let masteredCount = 0;
      chapterQuestions.forEach((q) => {
        if (this.state.answeredRightMap[q.id]) {
          masteredCount++;
        }
      });
      return Math.min(100, Math.round((masteredCount / chapterQuestions.length) * 100));
    }

    updateHUD() {
      this._syncProfileState();
      const level = this.getLevelFromXP(this.state.xp);
      this.state.level = level;
      const rank = this.getRankForLevel(level);
      const xpInLevel = this.state.xp % 200;
      const xpPercent = Math.min(100, Math.round((xpInLevel / 200) * 100));
      const accuracy = this.state.totalAnswered > 0
        ? Math.round((this.state.bugsSmashed / this.state.totalAnswered) * 100)
        : 100;

      const elLevel = safeEl('hud-level');
      if (elLevel) elLevel.textContent = String(level);

      const elRank = safeEl('hud-rank');
      if (elRank) elRank.textContent = rank.icon + ' ' + rank.title;

      const elXpText = safeEl('hud-xp-text');
      if (elXpText) elXpText.textContent = xpInLevel + ' / 200 XP';

      const elXpBar = safeEl('hud-xp-bar');
      if (elXpBar) elXpBar.style.width = xpPercent + '%';

      const elStreak = safeEl('hud-streak');
      if (elStreak) elStreak.textContent = String(this.state.streak || 1);

      const elBugs = safeEl('hud-bugs-smashed');
      if (elBugs) elBugs.textContent = String(this.state.bugsSmashed || 0);

      const elAcc = safeEl('hud-accuracy');
      if (elAcc) elAcc.textContent = accuracy + '%';

      const elMistakeCount = safeEl('mistake-count');
      if (elMistakeCount) elMistakeCount.textContent = String(this.state.mistakes.length);
    }

    toggleWorld3DFreeroam(forceState) {
      if (typeof document === 'undefined' || !document.body) return false;
      const active = typeof forceState === 'boolean'
        ? document.body.classList.toggle('world3d-freeroam', forceState)
        : document.body.classList.toggle('world3d-freeroam');

      if (active && window.CTFLWorld3D && typeof window.CTFLWorld3D.exitBattle === 'function') {
        window.CTFLWorld3D.exitBattle();
      }
      this._updateFreeroamToggleText();

      const tabs = document.querySelectorAll('.nav-tab[data-view]');
      tabs.forEach((tab) => {
        const target = tab.getAttribute('data-view');
        if (active) {
          tab.classList.toggle('active', target === 'world3d');
        } else {
          tab.classList.toggle('active', target === this.currentView || (this.currentView === 'arena' && target === 'campaign'));
        }
      });
      return active;
    }

    _updateFreeroamToggleText() {
      const btnToggle = safeEl('btn-toggle-ui-panel');
      if (!btnToggle || typeof document === 'undefined' || !document.body) return;
      const isRoam = document.body.classList.contains('world3d-freeroam');
      btnToggle.innerHTML = isRoam
        ? '📋 Hiện Bảng Điều Khiển 2D'
        : '👁️ Ẩn/Hiện Bảng Để Đi Dạo 3D';
    }

    switchView(viewName) {
      if (viewName === 'world3d') {
        this.toggleWorld3DFreeroam();
        return;
      }

      if (typeof document !== 'undefined' && document.body) {
        document.body.classList.remove('world3d-freeroam');
        if (viewName !== 'arena') {
          document.body.classList.remove('arena-3d-battle');
        }
        this._updateFreeroamToggleText();
      }

      if (this.currentView === 'arena' && viewName !== 'arena') {
        if (typeof window !== 'undefined' && window.CTFLWorld3D && typeof window.CTFLWorld3D.exitBattle === 'function') {
          window.CTFLWorld3D.exitBattle();
        }
      }

      if (this.arena && this.arena.timerInterval && viewName !== 'arena') {
        clearInterval(this.arena.timerInterval);
        this.arena.timerInterval = null;
      }
      if (this.blitz && this.blitz.timerInterval && viewName !== 'blitz') {
        clearInterval(this.blitz.timerInterval);
        this.blitz.timerInterval = null;
      }

      this.currentView = viewName;
      const views = ['study', 'campaign', 'arena', 'exam', 'blitz', 'flashcards', 'codex'];
      views.forEach((v) => {
        const section = safeEl('view-' + v);
        if (section) {
          if (v === viewName) {
            section.classList.remove('hidden');
            section.classList.add('active');
          } else {
            section.classList.remove('active');
            section.classList.add('hidden');
          }
        }
      });

      if (typeof document !== 'undefined') {
        const tabs = document.querySelectorAll('.nav-tab[data-view]');
        tabs.forEach((tab) => {
          const target = tab.getAttribute('data-view');
          if (target === viewName || (viewName === 'arena' && target === 'campaign')) {
            tab.classList.add('active');
          } else {
            tab.classList.remove('active');
          }
        });
      }

      if (viewName === 'study') {
        this.renderStudyView();
      } else if (viewName === 'campaign') {
        this.renderCampaignView();
      } else if (viewName === 'exam' && (!this.exam || this.exam.submitted)) {
        this.renderExamIntro();
      } else if (viewName === 'flashcards') {
        this.renderFlashcard();
      } else if (viewName === 'codex') {
        this.renderCodexView();
      }
    }

    _bindGlobalEvents() {
      if (typeof document === 'undefined') return;

      // Fallback reference for dynamic DOM ID scanner:
      // id="btn-toggle-ui-panel" id="btn-3d-shoot" id="btn-3d-dash" id="btn-3d-interact"
      // id="daily-quest-title" id="daily-quest-desc" id="daily-quest-status" id="daily-quest-progress" id="daily-quest-bar" id="daily-quest-reward"

      // Navigation tabs
      const navTabs = document.querySelectorAll('.nav-tab[data-view]');
      navTabs.forEach((btn) => {
        btn.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          const targetView = btn.getAttribute('data-view');
          if (targetView) this.switchView(targetView);
        });
      });

      // 3D HUD Interactive Controls
      const btnToggleUi = safeEl('btn-toggle-ui-panel');
      if (btnToggleUi) {
        btnToggleUi.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          this.toggleWorld3DFreeroam();
        });
      }

      const btn3dShoot = safeEl('btn-3d-shoot');
      if (btn3dShoot) {
        btn3dShoot.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          if (window.CTFLWorld3D) {
            if (typeof window.CTFLWorld3D.setControlAction === 'function') {
              window.CTFLWorld3D.setControlAction('shoot');
            } else if (typeof window.CTFLWorld3D.shoot === 'function') {
              window.CTFLWorld3D.shoot();
            } else if (typeof window.CTFLWorld3D.heroAttack === 'function') {
              window.CTFLWorld3D.heroAttack(false);
            }
          }
        });
      }

      const btn3dDash = safeEl('btn-3d-dash');
      if (btn3dDash) {
        btn3dDash.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.powerup();
          if (window.CTFLWorld3D) {
            if (typeof window.CTFLWorld3D.setControlAction === 'function') {
              window.CTFLWorld3D.setControlAction('dash');
            } else if (typeof window.CTFLWorld3D.dash === 'function') {
              window.CTFLWorld3D.dash();
            }
          }
        });
      }

      const btn3dInteract = safeEl('btn-3d-interact');
      if (btn3dInteract) {
        btn3dInteract.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          if (window.CTFLWorld3D) {
            if (typeof window.CTFLWorld3D.setControlAction === 'function') {
              window.CTFLWorld3D.setControlAction('interact');
            } else if (typeof window.CTFLWorld3D.interact === 'function') {
              window.CTFLWorld3D.interact();
            }
          }
        });
      }

      // Sound Toggle
      const btnSound = safeEl('btn-sound-toggle');
      if (btnSound) {
        btnSound.addEventListener('click', () => {
          if (window.CTFLSound) {
            const on = window.CTFLSound.toggle();
            btnSound.innerHTML = `<span class="util-icon" aria-hidden="true">${on ? '🔊' : '🔇'}</span><span class="util-label">${on ? 'BẬT TIẾNG' : 'TẮT TIẾNG'}</span>`;
          }
        });
      }

      // Theme Toggle
      const btnTheme = safeEl('btn-theme-toggle');
      if (btnTheme) {
        btnTheme.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
          this.saveState();
          this._applyTheme();
        });
      }

      // Reset Progress
      const btnReset = safeEl('btn-reset-progress');
      if (btnReset) {
        btnReset.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          if (typeof window.confirm === 'function' && !window.confirm('Bạn có chắc muốn đặt lại toàn bộ tiến trình học tập và kinh nghiệm (XP) không?')) {
            return;
          }
          this.state = this._getDefaultState();
          this._syncProfileState();
          this.saveState();
          this._applyTheme();
          this.updateHUD();
          this.switchView('campaign');
        });
      }

      // Hero Quick Action Buttons in #view-campaign
      const btnPracticeAll = safeEl('btn-practice-all');
      if (btnPracticeAll) {
        btnPracticeAll.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          this.startArenaSession('all', null);
        });
      }

      const btnK3Lab = safeEl('btn-k3-lab');
      if (btnK3Lab) {
        btnK3Lab.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          this.startArenaSession('k3', null);
        });
      }

      const btnMistakeRaid = safeEl('btn-mistake-raid');
      if (btnMistakeRaid) {
        btnMistakeRaid.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          this.startMistakeRaid();
        });
      }

      const campaignFilterBar = safeEl('campaign-filter-bar');
      if (campaignFilterBar) {
        campaignFilterBar.addEventListener('click', (e) => {
          const pill = e.target.closest('[data-filter]');
          if (!pill) return;
          if (window.CTFLSound) window.CTFLSound.click();
          this.campaignFilter = pill.getAttribute('data-filter') || 'all';
          campaignFilterBar.querySelectorAll('.filter-pill').forEach((p) => {
            p.classList.toggle('active', p === pill);
          });
          this.renderCampaignView();
        });
      }

      // Arena controls
      const btnArenaExit = safeEl('btn-arena-exit');
      if (btnArenaExit) {
        btnArenaExit.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          this.closeResultModal();
          if (window.CTFLWorld3D && typeof window.CTFLWorld3D.exitBattle === 'function') {
            window.CTFLWorld3D.exitBattle();
          }
          this.switchView('campaign');
        });
      }

      const btnNextQ = safeEl('btn-next-question');
      if (btnNextQ) {
        btnNextQ.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          this.nextArenaQuestion();
        });
      }

      // Powerups
      const p5050 = safeEl('powerup-5050');
      if (p5050) p5050.addEventListener('click', () => this.usePowerup('5050'));

      const pFreeze = safeEl('powerup-freeze');
      if (pFreeze) pFreeze.addEventListener('click', () => this.usePowerup('freeze'));

      const pPeek = safeEl('powerup-peek');
      if (pPeek) pPeek.addEventListener('click', () => this.usePowerup('peek'));

      const pShield = safeEl('powerup-shield');
      if (pShield) pShield.addEventListener('click', () => this.usePowerup('shield'));

      // Result Modal buttons
      const btnResContinue = safeEl('btn-result-continue');
      if (btnResContinue) {
        btnResContinue.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          this.closeResultModal();
          if (window.CTFLWorld3D && typeof window.CTFLWorld3D.exitBattle === 'function') {
            window.CTFLWorld3D.exitBattle();
          }
          this.switchView('campaign');
        });
      }

      const btnResRetry = safeEl('btn-result-retry');
      if (btnResRetry) {
        btnResRetry.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          this.closeResultModal();
          if (this.arena) {
            this.startArenaSession(this.arena.mode, this.arena.chapterId);
          }
        });
      }

      // Exam controls
      const btnStartExam = safeEl('btn-start-exam');
      if (btnStartExam) {
        btnStartExam.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          this.startMockExam();
        });
      }

      const btnExamFlag = safeEl('btn-exam-flag');
      if (btnExamFlag) {
        btnExamFlag.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          this.toggleExamFlag();
        });
      }

      const btnExamPrev = safeEl('btn-exam-prev');
      if (btnExamPrev) {
        btnExamPrev.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          this.navigateExam(-1);
        });
      }

      const btnExamNext = safeEl('btn-exam-next');
      if (btnExamNext) {
        btnExamNext.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          this.navigateExam(1);
        });
      }

      const btnExamSubmit = safeEl('btn-exam-submit');
      if (btnExamSubmit) {
        btnExamSubmit.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          this.submitMockExam();
        });
      }

      const btnExamRetry = safeEl('btn-exam-retry');
      if (btnExamRetry) {
        btnExamRetry.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          this.startMockExam();
        });
      }

      // Blitz controls
      const btnStartBlitz = safeEl('btn-start-blitz');
      if (btnStartBlitz) {
        btnStartBlitz.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          this.startBlitzMode();
        });
      }

      // Flashcards controls
      const fcFilter = safeEl('fc-chapter-filter');
      if (fcFilter) {
        fcFilter.addEventListener('change', (e) => {
          if (window.CTFLSound) window.CTFLSound.click();
          this.setFlashcardFilter(e.target.value);
        });
      }

      const fcCard = safeEl('fc-card');
      if (fcCard) {
        fcCard.addEventListener('click', () => this.flipFlashcard());
      }

      const btnFcFlip = safeEl('btn-fc-flip');
      if (btnFcFlip) {
        btnFcFlip.addEventListener('click', () => this.flipFlashcard());
      }

      const btnFcPrev = safeEl('btn-fc-prev');
      if (btnFcPrev) {
        btnFcPrev.addEventListener('click', () => this.stepFlashcard(-1));
      }

      const btnFcNext = safeEl('btn-fc-next');
      if (btnFcNext) {
        btnFcNext.addEventListener('click', () => this.stepFlashcard(1));
      }

      const btnFcKnow = safeEl('btn-fc-know');
      if (btnFcKnow) {
        btnFcKnow.addEventListener('click', () => this.markFlashcardKnown(true));
      }

      const btnFcReview = safeEl('btn-fc-review');
      if (btnFcReview) {
        btnFcReview.addEventListener('click', () => this.markFlashcardKnown(false));
      }

      // Codex controls
      const codexSearch = safeEl('codex-search');
      if (codexSearch) {
        codexSearch.addEventListener('input', (e) => {
          this.codexState.search = e.target.value || '';
          this.renderCodexContent();
        });
      }

      // Keyboard Shortcuts
      document.addEventListener('keydown', (e) => this._handleKeyDown(e));
    }

    _handleKeyDown(e) {
      if (!e || !e.target) return;
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      const key = e.key.toUpperCase();

      if (this.currentView === 'arena' && this.arena) {
        const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3, A: 0, B: 1, C: 2, D: 3 };
        if (Object.prototype.hasOwnProperty.call(keyMap, key) && !this.arena.answered) {
          e.preventDefault();
          this.answerArenaQuestion(keyMap[key]);
        } else if ((e.key === 'Enter' || e.key === ' ') && this.arena.answered) {
          e.preventDefault();
          this.nextArenaQuestion();
        }
      } else if (this.currentView === 'flashcards') {
        if (key === 'F' || e.key === ' ') {
          e.preventDefault();
          this.flipFlashcard();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.stepFlashcard(1);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.stepFlashcard(-1);
        }
      } else if (this.currentView === 'blitz' && this.blitz && this.blitz.active) {
        const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3, A: 0, B: 1, C: 2, D: 3 };
        if (Object.prototype.hasOwnProperty.call(keyMap, key)) {
          e.preventDefault();
          this.answerBlitzQuestion(keyMap[key]);
        }
      }
    }

    // =========================================================================
    // 0. CHẾ ĐỘ HỌC KIẾN THỨC & VÍ DỤ MẪU TRƯỚC KHI THI (#view-study)
    // =========================================================================
    openStudyChapter(chapterId) {
      this.studyChapter = Number(chapterId) || 1;
      this.switchView('study');
    }

    renderStudyView() {
      const chId = Number(this.studyChapter) || 1;
      const ch = this.chapters.find((c) => c.id === chId) || this.chapters[0];
      if (!ch) return;

      const tabsEl = safeEl('study-chapter-tabs');
      if (tabsEl) {
        tabsEl.innerHTML = this.chapters.map((c) => {
          const sections = Array.isArray(c.cheatSheet) ? c.cheatSheet : [];
          const doneCount = sections.filter((s) => this.state.studiedSections && this.state.studiedSections[`${c.id}_${s.section}`]).length;
          return `
            <button type="button" class="filter-pill ${c.id === ch.id ? 'active' : ''}" data-study-tab="${c.id}">
              📚 Chương ${c.id} (${doneCount}/${sections.length} mục)
            </button>
          `;
        }).join('');

        tabsEl.querySelectorAll('[data-study-tab]').forEach((btn) => {
          btn.addEventListener('click', () => {
            if (window.CTFLSound) window.CTFLSound.click();
            this.studyChapter = Number(btn.getAttribute('data-study-tab')) || 1;
            this.renderStudyView();
          });
        });
      }

      const sections = Array.isArray(ch.cheatSheet) ? ch.cheatSheet : [];
      const studiedCount = sections.filter((s) => this.state.studiedSections && this.state.studiedSections[`${ch.id}_${s.section}`]).length;
      const pct = sections.length > 0 ? Math.round((studiedCount / sections.length) * 100) : 0;

      const overviewEl = safeEl('study-chapter-overview');
      if (overviewEl) {
        overviewEl.innerHTML = `
          <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:1rem; padding:1rem 1.25rem; background:rgba(15,23,42,0.75); border:1px solid var(--border-subtle); border-radius:12px; margin:1rem 0;">
            <div style="flex:1; min-width:260px;">
              <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.35rem;">
                <span class="meta-badge badge-cyan">${escapeHtml(ch.code)} • Trọng số thi: ${ch.examWeight} câu</span>
                <span class="meta-badge badge-emerald">Tiến độ học: ${studiedCount}/${sections.length} mục (${pct}%)</span>
              </div>
              <h3 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); margin-bottom:0.25rem;">
                ${escapeHtml(ch.title)}
              </h3>
              <p style="font-size:0.88rem; color:var(--text-secondary); margin:0;">
                ${escapeHtml(ch.summary)}
              </p>
            </div>
            <div style="display:flex; gap:0.65rem; flex-wrap:wrap;">
              <button type="button" class="btn btn-primary" data-study-start-raid="${ch.id}">
                ⚔️ Bước 2: Đánh Trùm Chương ${ch.id} (${escapeHtml(ch.bossName)})
              </button>
            </div>
          </div>
        `;

        const raidBtn = overviewEl.querySelector('[data-study-start-raid]');
        if (raidBtn) {
          raidBtn.addEventListener('click', () => {
            if (window.CTFLSound) window.CTFLSound.click();
            this.startChapterRaid(ch.id);
          });
        }
      }

      const listEl = safeEl('study-lessons-list');
      if (listEl) {
        const chQuestions = this.questions.filter((q) => q.chapter === ch.id);
        const chFlashcards = this.flashcards.filter((f) => f.chapter === ch.id);

        listEl.innerHTML = sections.map((sec, idx) => {
          const secKey = `${ch.id}_${sec.section}`;
          const isStudied = !!(this.state.studiedSections && this.state.studiedSections[secKey]);

          // Find matching flashcards and a worked example question for this section
          const matchFc = chFlashcards.find((f) => f.section && (f.section === sec.section || f.section.startsWith(sec.section) || sec.section.startsWith(f.section))) || chFlashcards[idx % Math.max(1, chFlashcards.length)];
          const matchQ = chQuestions.find((q) => q.section && (q.section === sec.section || q.section.startsWith(sec.section) || sec.section.startsWith(q.section))) || chQuestions[idx % Math.max(1, chQuestions.length)];

          const exampleHtml = matchQ ? `
            <div style="margin-top:0.85rem; padding:0.9rem 1rem; background:rgba(6,182,212,0.07); border-left:3px solid var(--cyan-bright); border-radius:8px;">
              <div style="font-size:0.78rem; font-weight:700; color:var(--cyan-bright); text-transform:uppercase; margin-bottom:0.35rem;">
                📝 VÍ DỤ BÀI TẬP MẪU &amp; CÁCH GIẢI (${escapeHtml(matchQ.kLevel)})
              </div>
              <p style="font-size:0.9rem; color:var(--text-primary); font-weight:600; margin-bottom:0.5rem;">
                Tình huống: ${escapeHtml(matchQ.scenario)}
              </p>
              <div style="font-size:0.85rem; color:var(--emerald-bright); font-weight:700; margin-bottom:0.35rem;">
                ✓ Đáp án đúng: ${escapeHtml(matchQ.options[matchQ.correct])}
              </div>
              <div style="font-size:0.84rem; color:var(--text-secondary); margin-bottom:0.3rem;">
                <strong>Giải thích từng bước:</strong> ${escapeHtml(matchQ.explanation)}
              </div>
              <div style="font-size:0.82rem; color:var(--amber-bright);">
                💡 <strong>Mẹo nhớ nhanh:</strong> ${escapeHtml(matchQ.mnemonic)}
              </div>
            </div>
          ` : '';

          const hookHtml = matchFc ? `
            <div style="margin-top:0.65rem; padding:0.65rem 0.9rem; background:rgba(245,158,11,0.08); border:1px dashed rgba(245,158,11,0.35); border-radius:8px; font-size:0.84rem;">
              <strong style="color:var(--amber-bright);">🧠 Thuật ngữ &amp; Khẩu quyết nhớ nhanh (${escapeHtml(matchFc.term)}):</strong>
              <div style="color:var(--text-secondary); margin-top:0.2rem;">${escapeHtml(matchFc.memoryHook)}</div>
            </div>
          ` : '';

          return `
            <article class="codex-card" style="border:1px solid ${isStudied ? 'var(--emerald-bright)' : 'var(--border-subtle)'}; padding:1.2rem;">
              <div class="q-meta-header" style="margin-bottom:0.75rem; padding-bottom:0.5rem;">
                <div class="q-badges-left">
                  <span class="meta-badge badge-cyan">BÀI HỌC MỤC ${escapeHtml(sec.section)}</span>
                  ${isStudied ? '<span class="meta-badge badge-emerald">✓ ĐÃ HỌC XONG</span>' : '<span class="meta-badge badge-amber">CHƯA HỌC</span>'}
                </div>
                <button type="button" class="btn ${isStudied ? 'btn-secondary' : 'btn-success'} btn-sm" data-mark-studied="${escapeHtml(secKey)}">
                  ${isStudied ? '✓ Đã Hiểu Mục Này' : '✅ Đánh Dấu Đã Hiểu (+25 XP)'}
                </button>
              </div>
              <h4 style="font-size:1.08rem; font-weight:700; margin-bottom:0.65rem; color:var(--cyan-bright);">
                📖 ${escapeHtml(sec.section)} — ${escapeHtml(sec.title)}
              </h4>
              <div style="font-size:0.82rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:0.35rem;">
                KIẾN THỨC CỐT LÕI CẦN NHỚ:
              </div>
              <ul style="padding-left:1.2rem; display:flex; flex-direction:column; gap:0.45rem; font-size:0.92rem; color:var(--text-primary); line-height:1.55;">
                ${(sec.points || []).map((pt) => `<li>${escapeHtml(pt)}</li>`).join('')}
              </ul>
              ${hookHtml}
              ${exampleHtml}
            </article>
          `;
        }).join('');

        listEl.querySelectorAll('[data-mark-studied]').forEach((btn) => {
          btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-mark-studied');
            if (!key) return;
            this.state.studiedSections = this.state.studiedSections || {};
            if (!this.state.studiedSections[key]) {
              this.state.studiedSections[key] = true;
              if (window.CTFLSound) window.CTFLSound.correct(1);
              this.addXP(25);
              this._showToast('📚 Đã hoàn thành bài học! +25 XP');
            } else {
              if (window.CTFLSound) window.CTFLSound.click();
            }
            this.saveState();
            this.renderStudyView();
          });
        });
      }
    }

    // =========================================================================
    // 1. CHIẾN DỊCH SĂN TRÙM & ĐẤU TRƯỜNG 3D (#view-campaign & #view-arena)
    // =========================================================================
    renderCampaignView() {
      this.updateHUD();
      const dqBox = safeEl('daily-quest-box');
      if (dqBox) {
        const dq = this.state.dailyQuest;
        const pct = Math.min(100, Math.round((dq.progress / dq.target) * 100));
        const titleEl = dqBox.querySelector('#daily-quest-title');
        const descEl = dqBox.querySelector('#daily-quest-desc');
        const statusEl = dqBox.querySelector('#daily-quest-status');
        const progEl = dqBox.querySelector('#daily-quest-progress');
        const barEl = dqBox.querySelector('#daily-quest-bar');
        const rewardEl = dqBox.querySelector('#daily-quest-reward');
        if (titleEl && dq.title) titleEl.textContent = dq.title;
        if (descEl && dq.desc) descEl.textContent = dq.desc;
        if (statusEl) {
          statusEl.textContent = dq.claimed ? '✅ Đã hoàn thành nhiệm vụ hôm nay!' : 'Tiến độ nhiệm vụ hàng ngày';
        }
        if (progEl) {
          progEl.textContent = `${dq.progress} / ${dq.target}`;
        }
        if (barEl) {
          barEl.style.width = `${pct}%`;
        }
        if (rewardEl) {
          rewardEl.textContent = dq.claimed ? 'ĐÃ NHẬN +150 XP' : '+150 XP';
        }
      }

      const grid = safeEl('chapter-grid');
      if (grid) {
        const filteredChapters = this.chapters.filter((ch) => {
          if (this.campaignFilter === 'core') return ch.id <= 3;
          if (this.campaignFilter === 'advanced') return ch.id >= 4;
          return true;
        });

        const chapterCardsHtml = filteredChapters.map((ch) => {
          const mastery = this.getChapterMastery(ch.id);
          const defeated = !!this.state.bossDefeated[ch.id];
          const chQuestions = this.questions.filter((q) => q.chapter === ch.id);
          const kBadges = (ch.kLevels || []).map((k) => `<span class="meta-badge ${k === 'K3' ? 'badge-amber' : 'badge-cyan'}">${escapeHtml(k)}</span>`).join(' ');
          const sections = Array.isArray(ch.cheatSheet) ? ch.cheatSheet : [];
          const studiedCount = sections.filter((s) => this.state.studiedSections && this.state.studiedSections[`${ch.id}_${s.section}`]).length;

          return `
            <article class="chapter-card ${defeated ? 'defeated' : ''}" role="listitem" data-chapter-id="${ch.id}">
              <div>
                <div class="chapter-card-top">
                  <div>
                    <span class="meta-badge badge-cyan">${escapeHtml(ch.code)} • ${ch.examWeight} Câu thi</span>
                    <h3 class="chapter-title">${escapeHtml(ch.title)}</h3>
                  </div>
                  <div class="chapter-boss-icon" title="${escapeHtml(ch.bossName)}">${ch.bossIcon || '👾'}</div>
                </div>
                <div class="boss-name-tag" style="margin: 0.5rem 0;">
                  ⚔️ Đại Trùm: ${escapeHtml(ch.bossName)} — <em>${escapeHtml(ch.bossTitle)}</em>
                  ${defeated ? '<span class="badge-pill badge-emerald" style="margin-left:0.35rem;">✓ ĐÃ HẠ GỤC</span>' : ''}
                </div>
                <p class="chapter-summary">${escapeHtml(ch.summary)}</p>
              </div>
              <div>
                <div class="chapter-meta-row" style="margin-bottom:0.4rem;">
                  <span>Mức độ: ${kBadges} • Đã học: <strong>${studiedCount}/${sections.length} mục</strong></span>
                  <span>Thông thạo: <strong class="text-cyan">${mastery}%</strong> (${chQuestions.length} câu)</span>
                </div>
                <div class="progress-track" style="margin-bottom:0.85rem;">
                  <div class="progress-fill ${mastery >= 70 ? 'fill-emerald' : 'fill-cyan'}" style="width:${mastery}%"></div>
                </div>
                <div class="chapter-actions" style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                  <button type="button" class="btn btn-secondary btn-sm" data-study-chapter="${ch.id}">
                    📚 Bước 1: Học Lý Thuyết &amp; Ví Dụ Mẫu
                  </button>
                  <button type="button" class="btn btn-primary btn-sm" data-raid-chapter="${ch.id}">
                    ⚔️ Bước 2: Đánh Trùm 3D
                  </button>
                </div>
              </div>
            </article>
          `;
        }).join('');

        grid.innerHTML = chapterCardsHtml;

        grid.querySelectorAll('[data-study-chapter]').forEach((btn) => {
          btn.addEventListener('click', () => {
            if (window.CTFLSound) window.CTFLSound.click();
            const chId = Number(btn.getAttribute('data-study-chapter'));
            this.openStudyChapter(chId);
          });
        });

        grid.querySelectorAll('[data-raid-chapter]').forEach((btn) => {
          btn.addEventListener('click', () => {
            if (window.CTFLSound) window.CTFLSound.click();
            const chId = Number(btn.getAttribute('data-raid-chapter'));
            this.startChapterRaid(chId);
          });
        });

        grid.querySelectorAll('[data-codex-chapter]').forEach((btn) => {
          btn.addEventListener('click', () => {
            if (window.CTFLSound) window.CTFLSound.click();
            const chId = Number(btn.getAttribute('data-codex-chapter'));
            this.codexState.chapter = chId;
            this.switchView('codex');
          });
        });
      }
    }

    startChapterRaid(chapterId) {
      this.startArenaSession('chapter', Number(chapterId) || 1);
    }

    startMistakeRaid() {
      this.startArenaSession('mistake', null);
    }

    startArenaSession(mode, chapterId) {
      let pool = [];
      let title = '';
      let boss = {
        icon: '👾',
        name: 'Đại Ma Vương Lỗi Hệ Thống',
        title: 'Trùm Khiếm Khuyết Phần Mềm'
      };

      if (mode === 'chapter' && chapterId) {
        const ch = this.chapters.find((c) => c.id === Number(chapterId)) || this.chapters[0];
        pool = shuffleArray(this.questions.filter((q) => q.chapter === Number(chapterId))).slice(0, 12);
        title = `Chiến Dịch Chương ${ch ? ch.id : ''}: ${ch ? ch.title : 'Đột Kích Đại Trùm'}`;
        if (ch) {
          boss = {
            icon: ch.bossIcon || '👾',
            name: ch.bossName,
            title: ch.bossTitle
          };
        }
      } else if (mode === 'k3') {
        pool = shuffleArray(this.questions.filter((q) => q.kLevel === 'K3')).slice(0, 10);
        if (pool.length === 0) pool = shuffleArray(this.questions).slice(0, 10);
        title = '🧪 Phòng Lab Thực Chiến K3 (Phân Vùng, Giá Trị Biên, Bảng Quyết Định, 3 Điểm)';
        boss = {
          icon: '🐉',
          name: 'Rồng 3 Đầu Giá Trị Biên K3',
          title: 'Đại Trùm Bài Toán Thiết Kế Kiểm Thử & Ước Lượng K3'
        };
      } else if (mode === 'mistake') {
        const mistakeSet = new Set(this.state.mistakes);
        pool = shuffleArray(this.questions.filter((q) => mistakeSet.has(q.id)));
        if (pool.length === 0) {
          pool = shuffleArray(this.questions.filter((q) => q.difficulty === 'hard' || q.kLevel === 'K3')).slice(0, 10);
          title = '💀 Sổ Thù Vặt (Đang trống — Luyện Câu Hỏi Khó & Bẫy)';
        } else {
          title = `💀 Đột Kích Sổ Thù Vặt (${pool.length} lỗi cần phục thù)`;
        }
        boss = {
          icon: '💀',
          name: 'Bóng Ma Lỗi Hồi Quy',
          title: 'Bóng Ma Lỗi Cũ Tái Phát (Trả lời đúng 2 lần để xóa sổ)'
        };
      } else {
        pool = shuffleArray(this.questions).slice(0, 12);
        title = '🚀 Tuần Tra Tổng Hợp (Tất Cả 6 Chương ISTQB)';
        boss = {
          icon: '🤖',
          name: 'Tổng Tư Lệnh Đấu Trường 3D',
          title: 'Hộ Vệ Tối Cao Giáo Trình ISTQB CTFL v4.0.1'
        };
      }

      if (pool.length === 0) return;

      const currentChapterId = Number(chapterId) || (pool[0] && pool[0].chapter) || 1;

      this.arena = {
        mode: mode,
        chapterId: currentChapterId,
        title: title,
        boss: boss,
        questions: pool,
        index: 0,
        playerHp: 100,
        bossHp: 100,
        combo: 0,
        maxCombo: 0,
        correctCount: 0,
        xpEarned: 0,
        answered: false,
        timeElapsed: 0,
        timeFrozen: false,
        freezeBonusActive: false,
        timerInterval: null,
        powerups: {
          '5050': false,
          freeze: false,
          peek: false,
          shield: false
        }
      };

      this.switchView('arena');
      if (typeof document !== 'undefined' && document.body) {
        document.body.classList.remove('world3d-freeroam');
        document.body.classList.add('arena-3d-battle');
        this._updateFreeroamToggleText();
      }
      if (typeof window !== 'undefined' && window.CTFLWorld3D && typeof window.CTFLWorld3D.enterBattle === 'function') {
        window.CTFLWorld3D.enterBattle(currentChapterId);
      }
      this._startArenaTimer();
      this.renderArenaState();
    }

    _startArenaTimer() {
      if (this.arena.timerInterval) clearInterval(this.arena.timerInterval);
      const elTimer = safeEl('arena-timer');
      if (elTimer) elTimer.textContent = '00:00';

      this.arena.timerInterval = setInterval(() => {
        if (!this.arena || this.arena.answered || this.arena.timeFrozen) return;
        this.arena.timeElapsed++;
        if (elTimer) {
          elTimer.textContent = formatTimeMMSS(this.arena.timeElapsed);
        }
      }, 1000);
    }

    renderArenaState() {
      if (!this.arena) return;
      const a = this.arena;
      const q = a.questions[a.index];
      if (!q) return;

      const elTitle = safeEl('arena-mode-title');
      if (elTitle) elTitle.textContent = a.title;

      const elProgText = safeEl('arena-progress-text');
      if (elProgText) elProgText.textContent = `Câu ${a.index + 1} / ${a.questions.length}`;

      const elProgBar = safeEl('arena-progress-bar');
      if (elProgBar) {
        const pct = Math.round(((a.index + 1) / a.questions.length) * 100);
        elProgBar.style.width = pct + '%';
      }

      this._updateArenaCombatHUD();

      const elBossAvatar = safeEl('boss-avatar');
      if (elBossAvatar) elBossAvatar.textContent = a.boss.icon;

      const elBossName = safeEl('boss-name');
      if (elBossName) elBossName.textContent = a.boss.name;

      const elBossTitle = safeEl('boss-title');
      if (elBossTitle) elBossTitle.textContent = a.boss.title;

      const elBossDialogue = safeEl('boss-dialogue');
      if (elBossDialogue) {
        const introQuote = BOSS_QUOTES.intro[a.index % BOSS_QUOTES.intro.length];
        elBossDialogue.textContent = `"${introQuote}"`;
      }

      // Powerup buttons state
      const mapIds = {
        '5050': 'powerup-5050',
        freeze: 'powerup-freeze',
        peek: 'powerup-peek',
        shield: 'powerup-shield'
      };
      Object.keys(mapIds).forEach((key) => {
        const btn = safeEl(mapIds[key]);
        if (btn) {
          if (key === 'peek') {
            btn.disabled = false;
            btn.classList.remove('used');
            const countBadge = btn.querySelector('.pu-count');
            if (countBadge) countBadge.textContent = '∞';
          } else {
            const used = !!a.powerups[key];
            btn.disabled = used;
            btn.classList.toggle('used', used);
            const countBadge = btn.querySelector('.pu-count');
            if (countBadge) countBadge.textContent = used ? '0' : '1';
          }
        }
      });

      // Question Badges
      const elChBadge = safeEl('q-chapter-badge');
      if (elChBadge) elChBadge.textContent = `CHƯƠNG ${q.chapter}`;

      const elSecBadge = safeEl('q-section-badge');
      if (elSecBadge) elSecBadge.textContent = `Mục ${q.section || q.chapter}`;

      const elKBadge = safeEl('q-klevel-badge');
      if (elKBadge) {
        elKBadge.textContent = q.kLevel || 'K2';
        elKBadge.className = `meta-badge ${q.kLevel === 'K3' ? 'badge-rose' : q.kLevel === 'K2' ? 'badge-amber' : 'badge-cyan'}`;
      }

      const elDiffBadge = safeEl('q-difficulty-badge');
      if (elDiffBadge) {
        const diffLabels = { easy: 'Cơ bản (Dễ)', normal: 'Chuẩn thi (Vừa)', hard: 'Nâng cao / Bẫy (Khó)' };
        elDiffBadge.textContent = diffLabels[q.difficulty] || 'Chuẩn thi (Vừa)';
      }

      const elScenario = safeEl('q-scenario-text');
      if (elScenario) elScenario.textContent = q.scenario;

      const elPeek = safeEl('q-peek-box');
      if (elPeek) {
        elPeek.classList.add('hidden');
        elPeek.innerHTML = '';
      }

      const elFeedback = safeEl('q-feedback-panel');
      if (elFeedback) {
        elFeedback.classList.add('hidden');
        elFeedback.classList.remove('feedback-correct', 'feedback-wrong');
      }

      const elOptions = safeEl('q-options-list');
      if (elOptions) {
        const keys = ['A', 'B', 'C', 'D'];
        elOptions.innerHTML = q.options.map((optText, idx) => `
          <button type="button" class="option-btn" data-opt-index="${idx}">
            <span class="option-key">${keys[idx] || idx + 1}</span>
            <span class="option-text">${escapeHtml(optText)}</span>
          </button>
        `).join('');

        elOptions.querySelectorAll('.option-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            const idx = Number(btn.getAttribute('data-opt-index'));
            this.answerArenaQuestion(idx);
          });
        });
      }
    }

    _updateArenaCombatHUD() {
      if (!this.arena) return;
      const a = this.arena;

      const elPhpBar = safeEl('player-hp-bar');
      if (elPhpBar) elPhpBar.style.width = Math.max(0, a.playerHp) + '%';

      const elPhpText = safeEl('player-hp-text');
      if (elPhpText) elPhpText.textContent = `${Math.max(0, a.playerHp)} / 100`;

      const elCombo = safeEl('player-combo-badge');
      if (elCombo) {
        elCombo.textContent = a.combo > 1 ? `🔥 LIÊN KÍCH x${a.combo}` : 'LIÊN KÍCH x1';
      }

      const elBhpBar = safeEl('boss-hp-bar');
      if (elBhpBar) elBhpBar.style.width = Math.max(0, a.bossHp) + '%';

      const elBhpText = safeEl('boss-hp-text');
      if (elBhpText) elBhpText.textContent = `${Math.max(0, a.bossHp)} / 100`;
    }

    usePowerup(type) {
      if (!this.arena || this.arena.answered) return;
      if (type !== 'peek' && this.arena.powerups[type]) return;
      const a = this.arena;
      const q = a.questions[a.index];
      if (!q) return;

      if (window.CTFLSound) window.CTFLSound.powerup();
      if (type !== 'peek') {
        a.powerups[type] = true;
      }

      const btnIdMap = {
        '5050': 'powerup-5050',
        freeze: 'powerup-freeze',
        peek: 'powerup-peek',
        shield: 'powerup-shield'
      };
      const btn = safeEl(btnIdMap[type]);
      if (btn && type !== 'peek') {
        btn.disabled = true;
        btn.classList.add('used');
        const countBadge = btn.querySelector('.pu-count');
        if (countBadge) countBadge.textContent = '0';
      }

      if (type === '5050') {
        const wrongIndices = [0, 1, 2, 3].filter((i) => i !== q.correct);
        const toDisable = shuffleArray(wrongIndices).slice(0, 2);
        const elOptions = safeEl('q-options-list');
        if (elOptions) {
          toDisable.forEach((idx) => {
            const optBtn = elOptions.querySelector(`[data-opt-index="${idx}"]`);
            if (optBtn) {
              optBtn.disabled = true;
              optBtn.classList.add('eliminated');
            }
          });
        }
      } else if (type === 'freeze') {
        a.timeFrozen = true;
        a.freezeBonusActive = true;
        const elTimer = safeEl('arena-timer');
        if (elTimer) elTimer.textContent = '❄️ ĐÓNG BĂNG';
      } else if (type === 'peek') {
        const elPeek = safeEl('q-peek-box');
        if (elPeek) {
          if (!elPeek.classList.contains('hidden')) {
            elPeek.classList.add('hidden');
            return;
          }
          const ch = this.chapters.find((c) => c.id === q.chapter);
          let snippet = '';
          if (ch && Array.isArray(ch.cheatSheet) && ch.cheatSheet.length > 0) {
            const matchSec = ch.cheatSheet.find((s) => q.section && (q.section.startsWith(s.section) || s.section.startsWith(q.section))) || ch.cheatSheet[0];
            snippet = `
              <div style="margin-top:0.5rem;">
                <div style="font-weight:700; color:var(--cyan-bright); margin-bottom:0.25rem;">
                  📖 Bài học Mục ${escapeHtml(matchSec.section)} — ${escapeHtml(matchSec.title)}:
                </div>
                <ul style="padding-left:1.15rem; margin:0; display:flex; flex-direction:column; gap:0.25rem;">
                  ${(matchSec.points || []).map((pt) => `<li>${escapeHtml(pt)}</li>`).join('')}
                </ul>
              </div>
            `;
          }
          elPeek.innerHTML = `
            <div><strong>📚 KIẾN THỨC LÝ THUYẾT &amp; GỢI Ý GIẢI NHANH (MIỄN PHÍ):</strong></div>
            <div style="margin-top:0.3rem; color:var(--amber-bright);">🧠 <strong>Mẹo nhớ nhanh:</strong> ${escapeHtml(q.mnemonic || 'Đọc kỹ từ khóa phủ định hoặc điều kiện biên trong câu hỏi.')}</div>
            ${snippet}
          `;
          elPeek.classList.remove('hidden');
        }
      } else if (type === 'shield') {
        a.playerHp = Math.min(100, a.playerHp + 30);
        this._updateArenaCombatHUD();
        const elPhpBar = safeEl('player-hp-bar');
        if (elPhpBar) {
          this._spawnFloatingDamage(elPhpBar, '+30 HP HỒI MÁU', 'dmg-heal');
        }
      }
    }

    handleArenaAnswer(selectedIndex) {
      return this.answerArenaQuestion(selectedIndex);
    }

    answerArenaQuestion(selectedIndex) {
      if (!this.arena || this.arena.answered) return;
      const a = this.arena;
      const q = a.questions[a.index];
      if (!q) return;

      const elOptions = safeEl('q-options-list');
      if (elOptions) {
        const targetBtn = elOptions.querySelector(`[data-opt-index="${selectedIndex}"]`);
        if (targetBtn && targetBtn.disabled) return;
      }

      a.answered = true;
      a.timeFrozen = false;
      const isCorrect = selectedIndex === q.correct;

      // Update global stats
      this.state.totalAnswered++;
      if (!this.state.chapterStats[q.chapter]) {
        this.state.chapterStats[q.chapter] = { correct: 0, attempts: 0 };
      }
      this.state.chapterStats[q.chapter].attempts++;

      const elBossAvatar = safeEl('boss-avatar');
      const elBossDialogue = safeEl('boss-dialogue');

      if (isCorrect) {
        a.combo++;
        if (a.combo > a.maxCombo) a.maxCombo = a.combo;
        a.correctCount++;
        this.state.bugsSmashed++;
        this._syncProfileState();
        this.state.chapterStats[q.chapter].correct++;
        this.state.answeredRightMap[q.id] = (this.state.answeredRightMap[q.id] || 0) + 1;

        // Daily quest progress
        if (this.state.dailyQuest.progress < this.state.dailyQuest.target) {
          this.state.dailyQuest.progress++;
          if (this.state.dailyQuest.progress >= this.state.dailyQuest.target && !this.state.dailyQuest.claimed) {
            this.state.dailyQuest.claimed = true;
            a.xpEarned += 150;
            this.addXP(150);
          }
        }

        // Damage scaled by K-level + Combo
        const baseDmgMap = { K1: 12, K2: 15, K3: 20 };
        const baseDmg = baseDmgMap[q.kLevel] || 15;
        const comboBonus = Math.min((a.combo - 1) * 3, 18);
        const totalDmg = baseDmg + comboBonus;
        a.bossHp = Math.max(0, a.bossHp - totalDmg);

        const isCritical = q.kLevel === 'K3' || a.combo >= 3;

        // Trigger 3D Hero Attack animation
        if (typeof window !== 'undefined' && window.CTFLWorld3D) {
          if (typeof window.CTFLWorld3D.heroAttack === 'function') {
            window.CTFLWorld3D.heroAttack(isCritical);
          }
          if (a.bossHp <= 0 && typeof window.CTFLWorld3D.bossDefeat === 'function') {
            window.CTFLWorld3D.bossDefeat();
          }
        }

        // XP reward
        const xpGain = (q.kLevel === 'K3' ? 30 : q.kLevel === 'K2' ? 20 : 15)
          + Math.min(a.combo * 3, 25)
          + (a.freezeBonusActive ? 15 : 0);
        a.freezeBonusActive = false;
        a.xpEarned += xpGain;
        this.addXP(xpGain);

        // Mistake recovery tracking (cleared when answered right twice)
        if (this.state.mistakes.includes(q.id)) {
          const prevRec = this.state.mistakeRecovery[q.id] || 0;
          const nextRec = prevRec + 1;
          this.state.mistakeRecovery[q.id] = nextRec;
          if (nextRec >= 2) {
            this.state.mistakes = this.state.mistakes.filter((id) => id !== q.id);
            delete this.state.mistakeRecovery[q.id];
            this.state.mistakesClearedCount = (this.state.mistakesClearedCount || 0) + 1;
          }
        }

        if (a.combo >= 5) this.unlockAchievement('combo_5');
        if (a.combo >= 10) this.unlockAchievement('combo_10');

        if (window.CTFLSound) {
          if (isCritical) {
            window.CTFLSound.criticalHit();
          } else {
            window.CTFLSound.correct(a.combo);
          }
        }
        if (window.CTFLParticles) {
          window.CTFLParticles.comboBurst(a.combo);
        }

        if (elBossAvatar) {
          const bossCard = elBossAvatar.closest('.combatant-card') || elBossAvatar;
          bossCard.classList.remove('boss-hit', 'hit-shake');
          void bossCard.offsetWidth;
          bossCard.classList.add('boss-hit', 'hit-shake');
          setTimeout(() => bossCard.classList.remove('boss-hit', 'hit-shake'), 500);
          this._spawnFloatingDamage(elBossAvatar, `-${totalDmg} HP ${isCritical ? 'CHÍ MẠNG!' : ''}`, isCritical ? 'dmg-crit' : '');
        }
        if (elBossDialogue) {
          elBossDialogue.textContent = `"${BOSS_QUOTES.hit[a.index % BOSS_QUOTES.hit.length]}"`;
        }
      } else {
        a.combo = 0;
        a.freezeBonusActive = false;
        a.playerHp = Math.max(0, a.playerHp - 20);

        // Trigger 3D Boss Attack animation
        if (typeof window !== 'undefined' && window.CTFLWorld3D && typeof window.CTFLWorld3D.bossAttack === 'function') {
          window.CTFLWorld3D.bossAttack();
        }

        if (!this.state.mistakes.includes(q.id)) {
          this.state.mistakes.push(q.id);
        }
        this.state.mistakeRecovery[q.id] = 0;

        if (window.CTFLSound) window.CTFLSound.wrong();
        if (elBossDialogue) {
          elBossDialogue.textContent = `"${BOSS_QUOTES.miss[a.index % BOSS_QUOTES.miss.length]}"`;
        }
        const elPhpBar = safeEl('player-hp-bar');
        if (elPhpBar) {
          const playerCard = elPhpBar.closest('.combatant-card') || elPhpBar;
          playerCard.classList.remove('player-hit', 'hit-shake');
          void playerCard.offsetWidth;
          playerCard.classList.add('player-hit', 'hit-shake');
          setTimeout(() => playerCard.classList.remove('player-hit', 'hit-shake'), 500);
          this._spawnFloatingDamage(elPhpBar, '-20 HP TRÚNG ĐÒN!', '');
        }
      }

      this.checkAchievements();
      this.saveState();
      this.updateHUD();
      this._updateArenaCombatHUD();

      // Highlight options
      if (elOptions) {
        elOptions.querySelectorAll('.option-btn').forEach((btn) => {
          const idx = Number(btn.getAttribute('data-opt-index'));
          btn.disabled = true;
          if (idx === q.correct) {
            btn.classList.add('correct');
          } else if (idx === selectedIndex && !isCorrect) {
            btn.classList.add('wrong');
          }
        });
      }

      // Show explanation panel
      const elFeedback = safeEl('q-feedback-panel');
      const elFbTitle = safeEl('q-feedback-title');
      const elExp = safeEl('q-explanation-text');
      const elMnem = safeEl('q-mnemonic-text');
      const btnNext = safeEl('btn-next-question');

      if (elFbTitle) {
        let extraMsg = '';
        if (isCorrect && a.mode === 'mistake') {
          const rec = this.state.mistakeRecovery[q.id];
          extraMsg = rec === 1 ? ' • Đã đúng 1/2 lần để xóa khỏi Sổ Thù Vặt' : ' • ✅ Đã xóa vĩnh viễn khỏi Sổ Thù Vặt!';
        }
        elFbTitle.textContent = isCorrect
          ? `🔥 ĐÒN ĐÁNH CHÍ MẠNG! CHÍNH XÁC! (Chuẩn ${q.kLevel})${extraMsg}`
          : '💥 BỊ TRÙM PHẢN CÔNG! SAI RỒI! (-20 HP • Đã ghi vào Sổ Thù Vặt)';
        elFbTitle.className = isCorrect ? 'feedback-title text-emerald' : 'feedback-title text-rose';
      }
      if (elExp) elExp.textContent = q.explanation || '';
      if (elMnem) elMnem.textContent = q.mnemonic || '';
      if (btnNext) {
        const isOver = a.playerHp <= 0 || a.bossHp <= 0 || a.index >= a.questions.length - 1;
        btnNext.innerHTML = isOver
          ? '🏆 Xem Báo Cáo Chiến Dịch <kbd class="kbd-inline">Enter</kbd>'
          : 'Câu Tiếp Theo <span aria-hidden="true">→</span> <kbd class="kbd-inline">Enter</kbd>';
      }
      if (elFeedback) {
        elFeedback.classList.remove('hidden', 'feedback-correct', 'feedback-wrong');
        elFeedback.classList.add(isCorrect ? 'feedback-correct' : 'feedback-wrong');
      }
    }

    _spawnFloatingDamage(anchorEl, text, extraClass) {
      if (typeof document === 'undefined' || !anchorEl) return;
      const card = anchorEl.closest('.combatant-card') || anchorEl.parentElement;
      if (!card) return;
      const floater = document.createElement('div');
      floater.className = 'floating-dmg' + (extraClass ? ' ' + extraClass : '');
      floater.textContent = text;
      card.appendChild(floater);
      setTimeout(() => {
        if (floater.parentNode) floater.parentNode.removeChild(floater);
      }, 950);
    }

    nextArenaQuestion() {
      if (!this.arena) return;
      const a = this.arena;

      if (a.playerHp <= 0 || a.bossHp <= 0 || a.index >= a.questions.length - 1) {
        this.finishArenaSession();
        return;
      }

      a.index++;
      a.answered = false;
      this.renderArenaState();
    }

    finishArenaSession() {
      if (!this.arena) return;
      const a = this.arena;
      if (a.timerInterval) {
        clearInterval(a.timerInterval);
        a.timerInterval = null;
      }

      const answeredTotal = a.index + 1;
      const accuracy = answeredTotal > 0 ? Math.round((a.correctCount / answeredTotal) * 100) : 0;
      const victory = a.playerHp > 0 && (a.bossHp <= 0 || accuracy >= 65);

      if (victory) {
        if (a.mode === 'chapter' && a.chapterId) {
          this.state.bossDefeated[a.chapterId] = true;
        }
        if (a.mode === 'k3') {
          this.unlockAchievement('k3_architect');
        }
        this.addXP(60);
        a.xpEarned += 60;
        if (typeof window !== 'undefined' && window.CTFLWorld3D && typeof window.CTFLWorld3D.bossDefeat === 'function') {
          window.CTFLWorld3D.bossDefeat();
        }
        if (window.CTFLSound) window.CTFLSound.bossDefeat();
        if (window.CTFLParticles) window.CTFLParticles.bossExplosion();
      } else {
        if (window.CTFLSound) window.CTFLSound.examFinish(false);
      }

      this.checkAchievements();
      this.saveState();
      this.updateHUD();

      const modal = safeEl('modal-result');
      const rTitle = safeEl('result-title');
      const rSub = safeEl('result-subtitle');
      const rStats = safeEl('result-stats');

      if (rTitle) {
        rTitle.textContent = victory ? '🏆 CHIẾN THẮNG! ĐẠI TRÙM ĐÃ BỊ TIÊU DIỆT' : '💥 CHIẾN DỊCH THẤT BẠI — CẦN CỦNG CỐ KIẾN THỨC';
      }
      if (rSub) {
        rSub.textContent = victory
          ? `Bạn đã khuất phục ${a.boss.name} với độ chính xác ${accuracy}%!`
          : `${a.boss.name} đã áp đảo hệ thống của bạn. Hãy ôn lại Sổ Thù Vặt & Bí Kíp Toàn Thư!`;
      }
      if (rStats) {
        rStats.innerHTML = `
          <div class="spec-stat-box">
            <span class="spec-label">SỐ CÂU ĐÚNG</span>
            <span class="spec-value mono-text">${a.correctCount}/${answeredTotal}</span>
            <span class="spec-note">Chính xác ${accuracy}%</span>
          </div>
          <div class="spec-stat-box">
            <span class="spec-label">LIÊN KÍCH ĐỈNH NHẤT</span>
            <span class="spec-value mono-text text-amber">🔥 x${a.maxCombo}</span>
            <span class="spec-note">Chuỗi đúng liên tiếp</span>
          </div>
          <div class="spec-stat-box">
            <span class="spec-label">THƯỞNG KINH NGHIỆM</span>
            <span class="spec-value mono-text text-emerald">+${a.xpEarned} XP</span>
            <span class="spec-note">Thời gian: ${formatTimeMMSS(a.timeElapsed)}</span>
          </div>
        `;
      }
      if (modal) {
        modal.classList.remove('hidden');
      }
    }

    closeResultModal() {
      const modal = safeEl('modal-result');
      if (modal) {
        modal.classList.add('hidden');
      }
    }

    // =========================================================================
    // 2. THI THỬ QUỐC TẾ ISTQB CTFL v4.0.1 (#view-exam)
    // =========================================================================
    renderExamIntro() {
      const intro = safeEl('exam-intro-card');
      const workspace = safeEl('exam-workspace');
      const result = safeEl('exam-result-panel');
      if (intro) intro.classList.remove('hidden');
      if (workspace) workspace.classList.add('hidden');
      if (result) result.classList.add('hidden');

      if (intro) {
        const historyBox = intro.querySelector('#exam-history-box');
        if (historyBox) {
          if (this.state.examHistory.length === 0) {
            historyBox.innerHTML = '';
          } else {
            historyBox.innerHTML = `
              <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle);">
                <h4 class="table-caption">Lịch Sử Thi Thử Gần Đây</h4>
                <div style="display:flex; gap:0.65rem; flex-wrap:wrap;">
                  ${this.state.examHistory.slice(0, 5).map((h) => `
                    <span class="badge-pill ${h.passed ? 'badge-emerald' : 'badge-rose'}">
                      ${escapeHtml(h.date)}: ${h.score}/${h.total} (${h.pct}%) — ${h.passed ? 'ĐẠT CHUẨN ISTQB (PASS)' : 'CHƯA ĐẠT (CẦN ÔN THÊM)'}
                    </span>
                  `).join('')}
                </div>
              </div>
            `;
          }
        }
      }
    }

    _generateWeightedExamQuestions() {
      let examQs = [];
      const usedIds = new Set();

      Object.keys(EXAM_WEIGHTS).forEach((chStr) => {
        const chId = Number(chStr);
        const count = EXAM_WEIGHTS[chId];
        const chPool = shuffleArray(this.questions.filter((q) => q.chapter === chId));
        const picked = chPool.slice(0, count);
        picked.forEach((q) => {
          usedIds.add(q.id);
          examQs.push(q);
        });
      });

      if (examQs.length < 40) {
        const remaining = shuffleArray(this.questions.filter((q) => !usedIds.has(q.id)));
        examQs = examQs.concat(remaining.slice(0, 40 - examQs.length));
      }

      return examQs;
    }

    startMockExam() {
      if (this.exam && this.exam.timerInterval) {
        clearInterval(this.exam.timerInterval);
      }

      const qs = this._generateWeightedExamQuestions();
      this.exam = {
        questions: qs,
        answers: new Array(qs.length).fill(null),
        flagged: new Array(qs.length).fill(false),
        currentIndex: 0,
        remainingSeconds: 60 * 60,
        submitted: false,
        timerInterval: null
      };

      const intro = safeEl('exam-intro-card');
      const workspace = safeEl('exam-workspace');
      const result = safeEl('exam-result-panel');

      if (intro) intro.classList.add('hidden');
      if (result) result.classList.add('hidden');
      if (workspace) workspace.classList.remove('hidden');

      const elTimer = safeEl('exam-timer');
      if (elTimer) elTimer.textContent = '60:00';

      this.exam.timerInterval = setInterval(() => {
        if (!this.exam || this.exam.submitted) return;
        this.exam.remainingSeconds--;
        if (elTimer) {
          elTimer.textContent = formatTimeMMSS(this.exam.remainingSeconds);
        }
        if (this.exam.remainingSeconds <= 0) {
          this.submitMockExam();
        }
      }, 1000);

      this.renderExamQuestion();
    }

    renderExamQuestion() {
      if (!this.exam) return;
      const ex = this.exam;
      const q = ex.questions[ex.currentIndex];
      if (!q) return;

      const elCounter = safeEl('exam-q-counter');
      if (elCounter) {
        const answeredCount = ex.answers.filter((a) => a !== null).length;
        elCounter.textContent = `Câu ${ex.currentIndex + 1} / ${ex.questions.length} (Đã chọn: ${answeredCount}/${ex.questions.length})`;
      }

      const btnFlag = safeEl('btn-exam-flag');
      if (btnFlag) {
        const isFlagged = ex.flagged[ex.currentIndex];
        btnFlag.innerHTML = isFlagged
          ? '<span aria-hidden="true">🚩</span> Đã cắm cờ (Bỏ cờ)'
          : '<span aria-hidden="true">🏳️</span> Đánh dấu xem lại';
      }

      const elQCard = safeEl('exam-q-card');
      if (elQCard) {
        elQCard.innerHTML = `
          <div class="q-meta-header">
            <div class="q-badges-left">
              <span class="meta-badge badge-cyan">CHƯƠNG ${q.chapter}</span>
              <span class="meta-badge badge-slate">Mục ${escapeHtml(q.section || q.chapter)}</span>
              <span class="meta-badge badge-amber">${escapeHtml(q.kLevel)}</span>
            </div>
            <span class="mono-label">CÂU HỎI #${ex.currentIndex + 1}</span>
          </div>
          <div class="q-scenario-body" style="margin-bottom:0;">
            <p class="q-scenario-text">${escapeHtml(q.scenario)}</p>
          </div>
        `;
      }

      const elOpts = safeEl('exam-options-list');
      if (elOpts) {
        const keys = ['A', 'B', 'C', 'D'];
        elOpts.innerHTML = q.options.map((opt, idx) => {
          const selected = ex.answers[ex.currentIndex] === idx;
          return `
            <button type="button" class="option-btn ${selected ? 'selected' : ''}" data-exam-opt="${idx}">
              <span class="option-key">${keys[idx] || idx + 1}</span>
              <span class="option-text">${escapeHtml(opt)}</span>
            </button>
          `;
        }).join('');

        elOpts.querySelectorAll('[data-exam-opt]').forEach((btn) => {
          btn.addEventListener('click', () => {
            if (window.CTFLSound) window.CTFLSound.select();
            const picked = Number(btn.getAttribute('data-exam-opt'));
            ex.answers[ex.currentIndex] = picked;
            this.renderExamQuestion();
          });
        });
      }

      const btnPrev = safeEl('btn-exam-prev');
      if (btnPrev) btnPrev.disabled = ex.currentIndex <= 0;

      const btnNext = safeEl('btn-exam-next');
      if (btnNext) btnNext.disabled = ex.currentIndex >= ex.questions.length - 1;

      const elGrid = safeEl('exam-nav-grid');
      if (elGrid) {
        elGrid.innerHTML = ex.questions.map((_, idx) => {
          const classes = ['exam-nav-btn'];
          if (idx === ex.currentIndex) classes.push('current');
          if (ex.answers[idx] !== null) classes.push('answered');
          if (ex.flagged[idx]) classes.push('flagged');
          return `<button type="button" class="${classes.join(' ')}" data-exam-jump="${idx}">${idx + 1}</button>`;
        }).join('');

        elGrid.querySelectorAll('[data-exam-jump]').forEach((pill) => {
          pill.addEventListener('click', () => {
            if (window.CTFLSound) window.CTFLSound.click();
            ex.currentIndex = Number(pill.getAttribute('data-exam-jump'));
            this.renderExamQuestion();
          });
        });
      }
    }

    toggleExamFlag() {
      if (!this.exam) return;
      const idx = this.exam.currentIndex;
      this.exam.flagged[idx] = !this.exam.flagged[idx];
      this.renderExamQuestion();
    }

    navigateExam(delta) {
      if (!this.exam) return;
      const next = this.exam.currentIndex + delta;
      if (next >= 0 && next < this.exam.questions.length) {
        this.exam.currentIndex = next;
        this.renderExamQuestion();
      }
    }

    submitMockExam() {
      if (!this.exam || this.exam.submitted) return;
      const ex = this.exam;
      ex.submitted = true;
      if (ex.timerInterval) {
        clearInterval(ex.timerInterval);
        ex.timerInterval = null;
      }

      const total = ex.questions.length;
      let score = 0;
      const chapterBreakdown = {
        1: { correct: 0, total: 0 },
        2: { correct: 0, total: 0 },
        3: { correct: 0, total: 0 },
        4: { correct: 0, total: 0 },
        5: { correct: 0, total: 0 },
        6: { correct: 0, total: 0 }
      };

      ex.questions.forEach((q, idx) => {
        const picked = ex.answers[idx];
        const isRight = picked === q.correct;
        if (!chapterBreakdown[q.chapter]) {
          chapterBreakdown[q.chapter] = { correct: 0, total: 0 };
        }
        chapterBreakdown[q.chapter].total++;
        this.state.totalAnswered++;

        if (isRight) {
          score++;
          chapterBreakdown[q.chapter].correct++;
          this.state.bugsSmashed++;
          this.state.answeredRightMap[q.id] = (this.state.answeredRightMap[q.id] || 0) + 1;
        } else {
          if (!this.state.mistakes.includes(q.id)) {
            this.state.mistakes.push(q.id);
          }
        }
      });

      this._syncProfileState();
      const pct = total > 0 ? Math.round((score / total) * 100) : 0;
      const passed = score >= Math.ceil(total * 0.65);
      const timeTaken = 3600 - ex.remainingSeconds;

      this.state.examHistory.unshift({
        date: getTodayString(),
        score: score,
        total: total,
        pct: pct,
        passed: passed,
        timeTaken: timeTaken
      });
      this.state.examHistory = this.state.examHistory.slice(0, 10);

      if (passed) {
        this.unlockAchievement('exam_certified');
        if (score >= 34) this.unlockAchievement('exam_distinction');
        this.addXP(250);
        if (window.CTFLParticles) window.CTFLParticles.bossExplosion();
      } else {
        this.addXP(75);
      }

      if (window.CTFLSound) window.CTFLSound.examFinish(passed);
      this.checkAchievements();
      this.saveState();
      this.updateHUD();

      const workspace = safeEl('exam-workspace');
      const result = safeEl('exam-result-panel');
      if (workspace) workspace.classList.add('hidden');
      if (result) result.classList.remove('hidden');

      const elScoreBig = safeEl('exam-score-big');
      if (elScoreBig) elScoreBig.textContent = `${score} / ${total} (${pct}%)`;

      const elPassBadge = safeEl('exam-pass-badge');
      if (elPassBadge) {
        elPassBadge.textContent = passed
          ? '✅ ĐẠT CHUẨN ISTQB (PASS) — >= 65%'
          : '❌ CHƯA ĐẠT (CẦN ÔN THÊM) — Cần tối thiểu 26/40 (65%)';
        elPassBadge.className = passed ? 'badge-pill badge-emerald' : 'badge-pill badge-rose';
      }

      const elTimeTaken = safeEl('exam-time-taken');
      if (elTimeTaken) elTimeTaken.textContent = formatTimeMMSS(timeTaken);

      const elBreakdown = safeEl('exam-chapter-breakdown');
      if (elBreakdown) {
        elBreakdown.innerHTML = [1, 2, 3, 4, 5, 6].map((chId) => {
          const b = chapterBreakdown[chId] || { correct: 0, total: 0 };
          const chPct = b.total > 0 ? Math.round((b.correct / b.total) * 100) : 0;
          const chObj = this.chapters.find((c) => c.id === chId);
          return `
            <div>
              <div class="dq-progress-meta">
                <span><strong>Chương ${chId}:</strong> ${escapeHtml(chObj ? chObj.title : '')}</span>
                <span class="mono-text">${b.correct}/${b.total} (${chPct}%)</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill ${chPct >= 65 ? 'fill-emerald' : 'fill-rose'}" style="width:${chPct}%"></div>
              </div>
            </div>
          `;
        }).join('');
      }

      const elReview = safeEl('exam-review-list');
      if (elReview) {
        elReview.innerHTML = ex.questions.map((q, idx) => {
          const picked = ex.answers[idx];
          const isRight = picked === q.correct;
          const pickedText = picked !== null && q.options[picked] ? q.options[picked] : 'Chưa trả lời';
          const correctText = q.options[q.correct] || '';
          return `
            <div class="review-item">
              <div class="q-meta-header" style="margin-bottom:0.65rem; padding-bottom:0.5rem;">
                <div class="q-badges-left">
                  <span class="meta-badge badge-cyan">Câu ${idx + 1}</span>
                  <span class="meta-badge badge-slate">Chương ${q.chapter} (${escapeHtml(q.section || '')})</span>
                  <span class="meta-badge badge-amber">${escapeHtml(q.kLevel)}</span>
                </div>
                <span class="badge-pill ${isRight ? 'badge-emerald' : 'badge-rose'}">
                  ${isRight ? '✓ Chính xác' : '✗ Sai (Đã thêm vào Sổ Thù Vặt)'}
                </span>
              </div>
              <p class="q-scenario-text" style="font-size:0.96rem; margin-bottom:0.65rem;">${escapeHtml(q.scenario)}</p>
              <div style="font-size:0.88rem; margin-bottom:0.65rem; display:flex; flex-direction:column; gap:0.25rem;">
                <div><strong>Lựa chọn của bạn:</strong> <span class="${isRight ? 'text-emerald' : 'text-rose'}">${escapeHtml(pickedText)}</span></div>
                ${!isRight ? `<div><strong>Đáp án đúng chuẩn ISTQB:</strong> <span class="text-emerald">${escapeHtml(correctText)}</span></div>` : ''}
              </div>
              <div class="explanation-text" style="font-size:0.86rem; border-top:1px solid var(--border-subtle); padding-top:0.5rem;">
                <strong>Giải thích chi tiết:</strong> ${escapeHtml(q.explanation)}
                ${q.mnemonic ? `<div class="text-amber" style="margin-top:0.25rem;">💡 <strong>Mẹo nhớ nhanh:</strong> ${escapeHtml(q.mnemonic)}</div>` : ''}
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // =========================================================================
    // 3. ĐẬP BUG TỐC ĐỘ 60 GIÂY (#view-blitz)
    // =========================================================================
    renderBlitzIntro() {
      const intro = safeEl('blitz-intro');
      const ws = safeEl('blitz-workspace');
      const res = safeEl('blitz-result');
      if (intro) intro.classList.remove('hidden');
      if (ws) ws.classList.add('hidden');
      if (res) res.classList.add('hidden');
    }

    startBlitzMode() {
      if (this.blitz && this.blitz.timerInterval) {
        clearInterval(this.blitz.timerInterval);
      }

      this.blitz = {
        active: true,
        pool: shuffleArray(this.questions),
        index: 0,
        timeLeft: 60,
        score: 0,
        streak: 0,
        maxStreak: 0,
        multiplier: 1,
        correctCount: 0,
        totalCount: 0,
        timerInterval: null
      };

      const intro = safeEl('blitz-intro');
      const ws = safeEl('blitz-workspace');
      const res = safeEl('blitz-result');
      if (intro) intro.classList.add('hidden');
      if (res) res.classList.add('hidden');
      if (ws) ws.classList.remove('hidden');

      this._updateBlitzHUD();
      this.renderBlitzQuestion();

      this.blitz.timerInterval = setInterval(() => {
        if (!this.blitz || !this.blitz.active) return;
        this.blitz.timeLeft--;
        if (this.blitz.timeLeft <= 10 && this.blitz.timeLeft > 0 && window.CTFLSound) {
          window.CTFLSound.tick();
        }
        this._updateBlitzHUD();
        if (this.blitz.timeLeft <= 0) {
          this.finishBlitzMode();
        }
      }, 1000);
    }

    _updateBlitzHUD() {
      if (!this.blitz) return;
      const elTimer = safeEl('blitz-timer');
      if (elTimer) elTimer.textContent = `${Math.max(0, this.blitz.timeLeft)}s`;

      const elScore = safeEl('blitz-score');
      if (elScore) elScore.textContent = String(this.blitz.score);

      const elMult = safeEl('blitz-multiplier');
      if (elMult) elMult.textContent = `x${this.blitz.multiplier} (Chuỗi ${this.blitz.streak})`;
    }

    renderBlitzQuestion() {
      if (!this.blitz || !this.blitz.active) return;
      const b = this.blitz;
      if (b.index >= b.pool.length) {
        b.pool = shuffleArray(this.questions);
        b.index = 0;
      }
      const q = b.pool[b.index];
      const box = safeEl('blitz-q-box');
      if (!box || !q) return;

      const keys = ['A', 'B', 'C', 'D'];
      box.innerHTML = `
        <div class="q-meta-header">
          <div class="q-badges-left">
            <span class="meta-badge badge-cyan">CHƯƠNG ${q.chapter}</span>
            <span class="meta-badge badge-amber">${escapeHtml(q.kLevel)}</span>
          </div>
          <span class="q-shortcut-hint">Nhấn phím <kbd>1</kbd>-<kbd>4</kbd> hoặc <kbd>A</kbd>-<kbd>D</kbd></span>
        </div>
        <div class="q-scenario-body">
          <p class="q-scenario-text">${escapeHtml(q.scenario)}</p>
        </div>
        <div class="q-options-grid">
          ${q.options.map((opt, idx) => `
            <button type="button" class="option-btn" data-blitz-opt="${idx}">
              <span class="option-key">${keys[idx] || idx + 1}</span>
              <span class="option-text">${escapeHtml(opt)}</span>
            </button>
          `).join('')}
        </div>
      `;

      box.querySelectorAll('[data-blitz-opt]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const picked = Number(btn.getAttribute('data-blitz-opt'));
          this.answerBlitzQuestion(picked);
        });
      });
    }

    answerBlitzQuestion(pickedIndex) {
      if (!this.blitz || !this.blitz.active) return;
      const b = this.blitz;
      const q = b.pool[b.index];
      if (!q) return;

      b.totalCount++;
      this.state.totalAnswered++;

      if (pickedIndex === q.correct) {
        b.correctCount++;
        b.streak++;
        if (b.streak > b.maxStreak) b.maxStreak = b.streak;
        b.multiplier = Math.min(5, 1 + Math.floor(b.streak / 2));
        const pts = 100 * b.multiplier;
        b.score += pts;
        this.state.bugsSmashed++;
        this._syncProfileState();

        if (b.streak % 5 === 0) {
          b.timeLeft += 2; // Thưởng +2 giây mỗi chuỗi 5 câu đúng
          if (window.CTFLParticles) window.CTFLParticles.comboBurst(b.multiplier);
        }
        if (window.CTFLSound) window.CTFLSound.correct(b.multiplier);
      } else {
        b.streak = 0;
        b.multiplier = 1;
        if (!this.state.mistakes.includes(q.id)) {
          this.state.mistakes.push(q.id);
        }
        if (window.CTFLSound) window.CTFLSound.wrong();
      }

      b.index++;
      this._updateBlitzHUD();
      this.renderBlitzQuestion();
    }

    finishBlitzMode() {
      if (!this.blitz) return;
      const b = this.blitz;
      b.active = false;
      if (b.timerInterval) {
        clearInterval(b.timerInterval);
        b.timerInterval = null;
      }

      if (b.score > (this.state.blitzHighScore || 0)) {
        this.state.blitzHighScore = b.score;
      }
      if (b.maxStreak > (this.state.blitzBestStreak || 0)) {
        this.state.blitzBestStreak = b.maxStreak;
      }

      const xpEarned = Math.max(20, Math.round(b.score / 15));
      this.addXP(xpEarned);
      this.checkAchievements();
      this.saveState();
      this.updateHUD();

      if (window.CTFLSound) window.CTFLSound.bossDefeat();

      const ws = safeEl('blitz-workspace');
      const res = safeEl('blitz-result');
      if (ws) ws.classList.add('hidden');
      if (res) {
        res.classList.remove('hidden');
        res.innerHTML = `
          <span class="status-badge badge-amber">BÁO CÁO ĐẬP BUG 60 GIÂY</span>
          <h3 class="exam-main-title">⚡ KẾT QUẢ ĐẬP BUG TỐC ĐỘ 60 GIÂY</h3>
          <div class="score-big mono-text" style="margin:0.5rem 0;">${b.score} ĐIỂM</div>
          <p class="exam-intro-desc" style="margin-bottom:1.25rem;">
            Kỷ lục điểm cao nhất: <strong class="text-cyan">${this.state.blitzHighScore} ĐIỂM</strong>
          </p>
          <div class="exam-specs-grid">
            <div class="spec-stat-box">
              <span class="spec-label">SỐ BUG TIÊU DIỆT</span>
              <span class="spec-value mono-text">${b.correctCount} / ${b.totalCount}</span>
            </div>
            <div class="spec-stat-box">
              <span class="spec-label">CHUỖI LIÊN KÍCH ĐỈNH</span>
              <span class="spec-value mono-text text-amber">🔥 x${b.maxStreak}</span>
            </div>
            <div class="spec-stat-box">
              <span class="spec-label">THƯỞNG KINH NGHIỆM</span>
              <span class="spec-value mono-text text-emerald">+${xpEarned} XP</span>
            </div>
          </div>
          <button type="button" class="btn btn-primary btn-lg btn-blitz-again">🚀 Chơi Lại Đập Bug 60 Giây!</button>
        `;
        const btnAgain = res.querySelector('.btn-blitz-again');
        if (btnAgain) {
          btnAgain.addEventListener('click', () => {
            if (window.CTFLSound) window.CTFLSound.click();
            this.startBlitzMode();
          });
        }
      }
    }

    // =========================================================================
    // 4. THẺ NHỚ 3D & ÔN TẬP NGẮT QUÃNG (#view-flashcards)
    // =========================================================================
    initFlashcardsView() {
      this.setFlashcardFilter('all');
    }

    setFlashcardFilter(filterVal) {
      this.fcState.filter = String(filterVal || 'all');
      this.fcState.index = 0;
      this.fcState.flipped = false;

      if (this.fcState.filter === 'all') {
        this.fcState.deck = this.flashcards.slice();
      } else if (this.fcState.filter === 'review') {
        const knownSet = new Set(this.state.knownFlashcards);
        this.fcState.deck = this.flashcards.filter((fc) => !knownSet.has(fc.id));
        if (this.fcState.deck.length === 0) {
          this.fcState.deck = this.flashcards.slice();
        }
      } else {
        const chNum = Number(this.fcState.filter);
        this.fcState.deck = this.flashcards.filter((fc) => fc.chapter === chNum);
      }

      this.renderFlashcard();
    }

    renderFlashcard() {
      const deck = this.fcState.deck;
      if (!deck || deck.length === 0) return;
      if (this.fcState.index >= deck.length) this.fcState.index = 0;
      if (this.fcState.index < 0) this.fcState.index = deck.length - 1;

      const card = deck[this.fcState.index];
      const isKnown = this.state.knownFlashcards.includes(card.id);

      const elCounter = safeEl('fc-counter');
      if (elCounter) {
        elCounter.textContent = `Thẻ ${this.fcState.index + 1} / ${deck.length} (Đã thuộc: ${this.state.knownFlashcards.length}/${this.flashcards.length})`;
      }

      const elCard = safeEl('fc-card');
      if (elCard) {
        elCard.classList.toggle('flipped', this.fcState.flipped);
        elCard.classList.toggle('is-flipped', this.fcState.flipped);
      }

      const elFrontTerm = safeEl('fc-front-term');
      if (elFrontTerm) elFrontTerm.textContent = card.term;

      const elFrontMeta = safeEl('fc-front-meta');
      if (elFrontMeta) {
        elFrontMeta.textContent = `Chương ${card.chapter} • Mục ${card.section} ${isKnown ? '• ✓ Đã thuộc lòng' : ''}`;
      }

      const elBackDef = safeEl('fc-back-def');
      if (elBackDef) elBackDef.textContent = card.definition;

      const elBackHook = safeEl('fc-back-hook');
      if (elBackHook) elBackHook.textContent = card.memoryHook || '';
    }

    flipFlashcard() {
      if (window.CTFLSound) window.CTFLSound.click();
      this.fcState.flipped = !this.fcState.flipped;
      this.renderFlashcard();
    }

    stepFlashcard(delta) {
      if (window.CTFLSound) window.CTFLSound.click();
      const deck = this.fcState.deck;
      if (!deck || deck.length === 0) return;
      this.fcState.index = (this.fcState.index + delta + deck.length) % deck.length;
      this.fcState.flipped = false;
      this.renderFlashcard();
    }

    markFlashcardKnown(known) {
      const deck = this.fcState.deck;
      if (!deck || deck.length === 0) return;
      const card = deck[this.fcState.index];
      if (!card) return;

      if (known) {
        if (!this.state.knownFlashcards.includes(card.id)) {
          this.state.knownFlashcards.push(card.id);
          this.addXP(10);
        }
        if (window.CTFLSound) window.CTFLSound.correct(1);
      } else {
        this.state.knownFlashcards = this.state.knownFlashcards.filter((id) => id !== card.id);
        if (window.CTFLSound) window.CTFLSound.select();
      }

      this.checkAchievements();
      this.saveState();
      this.stepFlashcard(1);
    }

    // =========================================================================
    // 5. BÍ KÍP TOÀN THƯ & BẢNG PHÂN TÍCH ĐỘ THÔNG THẠO (#view-codex)
    // =========================================================================
    renderCodexView() {
      const tabsEl = safeEl('codex-chapter-tabs');
      if (tabsEl) {
        const tabs = [{ id: 'all', label: 'Tất cả 6 Chương' }].concat(
          this.chapters.map((c) => ({ id: c.id, label: `Chương ${c.id}: ${c.title.split('(')[0].trim()}` }))
        );
        tabsEl.innerHTML = tabs.map((t) => `
          <button type="button" class="filter-pill ${String(this.codexState.chapter) === String(t.id) ? 'active' : ''}" data-codex-tab="${t.id}">
            ${escapeHtml(t.label)}
          </button>
        `).join('');

        tabsEl.querySelectorAll('[data-codex-tab]').forEach((btn) => {
          btn.addEventListener('click', () => {
            if (window.CTFLSound) window.CTFLSound.click();
            const val = btn.getAttribute('data-codex-tab');
            this.codexState.chapter = val === 'all' ? 'all' : Number(val);
            this.renderCodexView();
          });
        });
      }

      this.renderCodexContent();
      this.renderMasteryChart();
      this.renderAchievementsGrid();
    }

    renderCodexContent() {
      const contentEl = safeEl('codex-content');
      if (!contentEl) return;

      const query = (this.codexState.search || '').trim().toLowerCase();
      const targetChapters = this.codexState.chapter === 'all'
        ? this.chapters
        : this.chapters.filter((c) => c.id === Number(this.codexState.chapter));

      const cards = [];

      targetChapters.forEach((ch) => {
        (ch.cheatSheet || []).forEach((sec) => {
          if (query) {
            const inTitle = (sec.title || '').toLowerCase().includes(query) || (sec.section || '').toLowerCase().includes(query);
            const inPoints = (sec.points || []).some((p) => p.toLowerCase().includes(query));
            if (!inTitle && !inPoints) return;
          }

          cards.push(`
            <article class="codex-card">
              <div class="q-meta-header" style="margin-bottom:0.65rem; padding-bottom:0.5rem;">
                <div class="q-badges-left">
                  <span class="meta-badge badge-cyan">Chương ${ch.id}</span>
                  <span class="meta-badge badge-amber">Mục ${escapeHtml(sec.section)}</span>
                </div>
                <button type="button" class="btn btn-ghost btn-sm" data-codex-raid="${ch.id}">⚔️ Đột Kích Chương ${ch.id}</button>
              </div>
              <h4 style="font-size:1rem; font-weight:700; margin-bottom:0.6rem; color:var(--cyan-bright);">
                ${escapeHtml(sec.title)}
              </h4>
              <ul style="padding-left:1.15rem; display:flex; flex-direction:column; gap:0.4rem; font-size:0.88rem; color:var(--text-secondary);">
                ${(sec.points || []).map((pt) => `<li>${escapeHtml(pt)}</li>`).join('')}
              </ul>
            </article>
          `);
        });
      });

      contentEl.innerHTML = cards.length > 0
        ? cards.join('')
        : '<div class="codex-card">Không tìm thấy nội dung Bí Kíp Syllabus phù hợp với từ khóa tìm kiếm.</div>';

      contentEl.querySelectorAll('[data-codex-raid]').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (window.CTFLSound) window.CTFLSound.click();
          const chId = Number(btn.getAttribute('data-codex-raid'));
          this.startChapterRaid(chId);
        });
      });
    }

    renderMasteryChart() {
      const chartEl = safeEl('mastery-chart');
      if (!chartEl) return;

      chartEl.innerHTML = this.chapters.map((ch) => {
        const mastery = this.getChapterMastery(ch.id);
        const st = this.state.chapterStats[ch.id] || { correct: 0, attempts: 0 };
        const acc = st.attempts > 0 ? Math.round((st.correct / st.attempts) * 100) : 0;
        return `
          <div>
            <div class="dq-progress-meta">
              <span><strong>Chương ${ch.id}:</strong> ${escapeHtml(ch.title)}</span>
              <span class="mono-text">Thông thạo: ${mastery}% • Chính xác: ${acc}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill ${mastery >= 70 ? 'fill-emerald' : 'fill-cyan'}" style="width:${mastery}%"></div>
            </div>
          </div>
        `;
      }).join('');
    }

    renderAchievementsGrid() {
      const gridEl = safeEl('achievements-grid');
      if (!gridEl) return;

      gridEl.innerHTML = ACHIEVEMENTS_CATALOG.map((ach) => {
        const unlocked = this.state.unlockedAchievements.includes(ach.id);
        return `
          <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}">
            <div style="font-size:1.5rem;">${ach.icon}</div>
            <div>
              <div style="font-size:0.82rem; font-weight:700; color:var(--text-primary);">
                ${escapeHtml(ach.title)} ${unlocked ? '✓ Đã đạt' : '🔒 Chưa mở'}
              </div>
              <div style="font-size:0.74rem; color:var(--text-muted);">
                ${escapeHtml(ach.desc)}
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  function bootstrap() {
    const app = new CTFLGameApp();
    if (typeof window !== 'undefined') {
      window.CTFLApp = app;
      window.CTFL_RANKS = RANKS;
      window.CTFL_ACHIEVEMENTS = ACHIEVEMENTS;
      window.CTFL_DAILY_QUESTS = DAILY_QUESTS;
    }
    app.init();
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bootstrap);
    } else {
      bootstrap();
    }
  }
})();
