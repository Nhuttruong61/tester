/**
 * CTFL Bug Hunter: Cyber Arena
 * Sound Effects (Web Audio API Synthesizer) & Particle FX Engine
 * Zero external audio assets required.
 */
(function () {
  'use strict';

  const STORAGE_SOUND_KEY = 'ctfl_cyber_sound_v1';

  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = true;
      this._loadState();
    }

    _loadState() {
      try {
        const saved = localStorage.getItem(STORAGE_SOUND_KEY);
        if (saved !== null) {
          this.enabled = JSON.parse(saved) !== false;
        }
      } catch (_) {
        this.enabled = true;
      }
    }

    _saveState() {
      try {
        localStorage.setItem(STORAGE_SOUND_KEY, JSON.stringify(this.enabled));
      } catch (_) {
        // Ignore storage errors
      }
    }

    _getContext() {
      if (!this.enabled) return null;
      if (typeof window === 'undefined') return null;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      if (!this.ctx) {
        try {
          this.ctx = new AudioCtx();
        } catch (_) {
          return null;
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }

    _tone(freq, type, duration, gainVal = 0.12, delay = 0, slideTo = null) {
      const ctx = this._getContext();
      if (!ctx) return;
      try {
        const now = ctx.currentTime + delay;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(freq, now);
        if (slideTo) {
          osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), now + duration);
        }

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(gainVal, now + Math.min(0.015, duration * 0.25));
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + duration + 0.02);
      } catch (_) {
        // Safe fallback if audio context is restricted
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      this._saveState();
      if (this.enabled) {
        this.click();
      }
      return this.enabled;
    }

    click() {
      this._tone(680, 'triangle', 0.045, 0.08, 0, 920);
    }

    select() {
      this._tone(520, 'sine', 0.06, 0.09, 0, 740);
    }

    correct(combo = 1) {
      const boost = Math.min(combo - 1, 8) * 35;
      this._tone(523.25 + boost, 'triangle', 0.11, 0.13, 0);
      this._tone(659.25 + boost, 'triangle', 0.12, 0.13, 0.07);
      this._tone(783.99 + boost, 'sine', 0.22, 0.15, 0.14, 1046.5 + boost);
    }

    wrong() {
      this._tone(210, 'sawtooth', 0.16, 0.13, 0, 145);
      this._tone(155, 'sawtooth', 0.26, 0.14, 0.12, 98);
    }

    criticalHit() {
      this._tone(140, 'sawtooth', 0.12, 0.18, 0, 55);
      this._tone(587.33, 'square', 0.1, 0.12, 0.04, 880);
      this._tone(880, 'triangle', 0.24, 0.16, 0.11, 1318.5);
    }

    bossDefeat() {
      const notes = [523.25, 659.25, 783.99, 1046.5, 987.77, 1046.5, 1318.5];
      const delays = [0, 0.09, 0.18, 0.27, 0.42, 0.52, 0.64];
      const durs = [0.12, 0.12, 0.12, 0.18, 0.12, 0.15, 0.45];
      notes.forEach((n, idx) => {
        this._tone(n, idx === notes.length - 1 ? 'triangle' : 'square', durs[idx], 0.14, delays[idx]);
      });
    }

    powerup() {
      this._tone(440, 'sine', 0.08, 0.11, 0, 660);
      this._tone(660, 'sine', 0.09, 0.12, 0.06, 990);
      this._tone(990, 'triangle', 0.18, 0.13, 0.12, 1480);
    }

    levelUp() {
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((freq, i) => {
        this._tone(freq, 'triangle', 0.16 + i * 0.04, 0.14, i * 0.075);
      });
    }

    tick() {
      this._tone(900, 'sine', 0.025, 0.05, 0);
    }

    examFinish(passed = true) {
      if (passed) {
        this.bossDefeat();
      } else {
        this._tone(392.0, 'triangle', 0.22, 0.12, 0);
        this._tone(349.23, 'triangle', 0.22, 0.12, 0.2);
        this._tone(311.13, 'sawtooth', 0.4, 0.12, 0.4, 261.63);
      }
    }

    laserSlash(combo = 1) {
      const step = Math.max(1, Math.min(3, Number(combo) || 1));
      const baseFreq = step === 3 ? 980 : (step === 2 ? 840 : 720);
      this._tone(baseFreq, 'sawtooth', 0.11, 0.14, 0, 210);
      this._tone(baseFreq * 1.4, 'triangle', 0.14, 0.12, 0.02, 340);
      if (step === 3) {
        this._tone(1180, 'sine', 0.18, 0.13, 0.05, 520);
      }
    }

    crossLaser() {
      this._tone(920, 'sawtooth', 0.13, 0.15, 0, 240);
      this._tone(1240, 'square', 0.15, 0.12, 0.04, 310);
      this._tone(660, 'triangle', 0.22, 0.14, 0.08, 1080);
    }

    spinLaser() {
      const sweep = [520, 680, 860, 1120];
      sweep.forEach((f, idx) => {
        this._tone(f, idx % 2 === 0 ? 'sawtooth' : 'triangle', 0.13, 0.13, idx * 0.045, f * 0.45);
      });
    }
  }

  class ParticleEngine {
    constructor() {
      this.canvas = null;
      this.ctx = null;
      this.particles = [];
      this.animId = null;
      this.palette = ['#06B6D4', '#10B981', '#F59E0B', '#38BDF8', '#A7F3D0', '#F43F5E'];
    }

    init() {
      if (typeof document === 'undefined') return;
      this.canvas = document.getElementById('fx-canvas');
      if (!this.canvas || !this.canvas.getContext) return;
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      if (!this.canvas || typeof window === 'undefined') return;
      this.canvas.width = window.innerWidth || 1280;
      this.canvas.height = window.innerHeight || 720;
    }

    burst(x, y, color = null, count = 28) {
      if (!this.canvas) this.init();
      if (!this.ctx || !this.canvas) return;

      const originX = typeof x === 'number' ? x : this.canvas.width * 0.5;
      const originY = typeof y === 'number' ? y : this.canvas.height * 0.38;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = 2.2 + Math.random() * 6.5;
        const pickedColor = color || this.palette[i % this.palette.length];
        this.particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          size: 2.5 + Math.random() * 4.5,
          alpha: 1,
          decay: 0.016 + Math.random() * 0.018,
          color: pickedColor,
          shape: i % 3 === 0 ? 'rect' : 'circle'
        });
      }

      if (!this.animId) {
        this._loop();
      }
    }

    comboBurst(combo = 2) {
      if (!this.canvas) this.init();
      if (!this.canvas) return;
      const w = this.canvas.width;
      const h = this.canvas.height;
      const count = Math.min(20 + combo * 6, 65);
      this.burst(w * 0.5, h * 0.32, null, count);
    }

    bossExplosion() {
      if (!this.canvas) this.init();
      if (!this.canvas) return;
      const w = this.canvas.width;
      const h = this.canvas.height;
      this.burst(w * 0.5, h * 0.3, '#06B6D4', 40);
      setTimeout(() => this.burst(w * 0.35, h * 0.36, '#10B981', 34), 140);
      setTimeout(() => this.burst(w * 0.65, h * 0.36, '#F59E0B', 34), 280);
    }

    _loop() {
      if (!this.ctx || !this.canvas) {
        this.animId = null;
        return;
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.14; // gravity
        p.vx *= 0.985;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.alpha);
        this.ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          this.ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
          this.ctx.fill();
        }
        this.ctx.restore();
      }

      if (this.particles.length > 0) {
        if (typeof requestAnimationFrame === 'function') {
          this.animId = requestAnimationFrame(() => this._loop());
        } else {
          this.particles = [];
          this.animId = null;
        }
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.animId = null;
      }
    }
  }

  const soundInstance = new SoundEngine();
  const particleInstance = new ParticleEngine();

  if (typeof window !== 'undefined') {
    window.CTFLSound = soundInstance;
    window.CTFLParticles = particleInstance;
  }
})();
