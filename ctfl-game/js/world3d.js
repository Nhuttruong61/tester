/**
 * CTFL Bug Hunter 3D: Đấu Trường Săn Lỗi
 * Full-Screen Interactive Three.js 3D World, 3D Hero Controller, Roaming 3D Bug Monsters & 6 Giant 3D Bosses
 * Owner: @threejs-world
 */
(function () {
  'use strict';

  const BOSS_CONFIGS = [
    {
      id: 1,
      type: 'chapter',
      code: 'CHƯƠNG 1 • K1-K2',
      name: 'Đại Ma Vương NullPointer',
      subtitle: 'Trùm Bản Chất & 7 Nguyên Lý Kiểm Thử',
      color: 0xf43f5e,
      emissive: 0xbe123c,
      hex: '#f43f5e',
      angle: -Math.PI * 0.72,
      radius: 34
    },
    {
      id: 2,
      type: 'chapter',
      code: 'CHƯƠNG 2 • K1-K2',
      name: 'Thủy Quái Thác Nước SDLC',
      subtitle: 'Trùm Vòng Đời Phát Triển Phần Mềm',
      color: 0x06b6d4,
      emissive: 0x0e7490,
      hex: '#06b6d4',
      angle: -Math.PI * 0.44,
      radius: 34
    },
    {
      id: 3,
      type: 'chapter',
      code: 'CHƯƠNG 3 • K1-K2',
      name: 'Bóng Ma Kiểm Thử Tĩnh',
      subtitle: 'Trùm Review & Phân Tích Tĩnh',
      color: 0xa855f7,
      emissive: 0x6b21a8,
      hex: '#a855f7',
      angle: -Math.PI * 0.16,
      radius: 34
    },
    {
      id: 4,
      type: 'chapter',
      code: 'CHƯƠNG 4 • TRỌNG TÂM K3',
      name: 'Rồng 3 Đầu Giá Trị Biên K3',
      subtitle: 'Trùm Thiết Kế Test Case Hộp Đen & Hộp Trắng',
      color: 0xf59e0b,
      emissive: 0xb45309,
      hex: '#f59e0b',
      angle: Math.PI * 0.16,
      radius: 34
    },
    {
      id: 5,
      type: 'chapter',
      code: 'CHƯƠNG 5 • K1-K3',
      name: 'Khổng Lồ Ma Trận Rủi Ro',
      subtitle: 'Trùm Quản Lý Kiểm Thử & Quản Trị Rủi Ro',
      color: 0x10b981,
      emissive: 0x047857,
      hex: '#10b981',
      angle: Math.PI * 0.44,
      radius: 34
    },
    {
      id: 6,
      type: 'chapter',
      code: 'CHƯƠNG 6 • K1-K2',
      name: 'Siêu Robot Tự Động Hóa',
      subtitle: 'Trùm Công Cụ Kiểm Thử & Test Automation',
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      hex: '#3b82f6',
      angle: Math.PI * 0.72,
      radius: 34
    }
  ];

  const SPECIAL_PORTALS = [
    {
      id: 'exam',
      type: 'exam',
      code: 'CỔNG THI QUỐC TẾ',
      name: 'Cổng Thi Thử 40 Câu ISTQB',
      subtitle: '60 Phút • Đạt 26/40 (65%)',
      color: 0x00f5d4,
      emissive: 0x06b6d4,
      hex: '#00f5d4',
      x: -13,
      z: -16
    },
    {
      id: 'mistakes',
      type: 'mistakes',
      code: 'CỔNG PHỤC THÙ',
      name: 'Cổng Sổ Thù Vặt (SRS)',
      subtitle: 'Tiêu Diệt Các Câu Đã Làm Sai',
      color: 0xff2a85,
      emissive: 0xbe185d,
      hex: '#ff2a85',
      x: 13,
      z: -16
    },
    {
      id: 'blitz',
      type: 'blitz',
      code: 'CỔNG TỐC ĐỘ',
      name: 'Đấu Trường Đập Bug 60s',
      subtitle: 'Phản Xạ Nhanh • Săn Combo XP',
      color: 0xfbbf24,
      emissive: 0xd97706,
      hex: '#fbbf24',
      x: 0,
      z: -21
    }
  ];

  const BUG_NAMES_VI = [
    'Bug Tràn Bộ Đệm (Buffer Overflow)',
    'Lỗi Con Trỏ Null (NullPointer)',
    'Sai Giá Trị Biên (Off-by-One)',
    'Rò Rỉ Bộ Nhớ (Memory Leak)',
    'Lỗi Phân Vùng Tương Đương',
    'Xung Đột Luồng (Race Condition)',
    'Vòng Lặp Vô Tận (Infinite Loop)',
    'Lỗi Tích Hợp API (500 Error)'
  ];

  const world3d = {
    initialized: false,
    webglAvailable: false,
    mode: 'freeroam', // 'freeroam' | 'battle'
    battleChapterId: 1,
    onPortalInteract: null,
    onBugSmashed: null,
    chapters: [],

    // Three.js core references
    canvas: null,
    scene: null,
    camera: null,
    renderer: null,
    raycaster: null,
    mouse: null,
    floorPlane: null,

    // 3D Entities
    hero: null,
    heroParts: {},
    targetMarker: null,
    bossNodes: [],
    portalNodes: [],
    bugMonsters: [],
    projectiles: [],
    particles3D: [],
    shockwaves: [],
    pillars: [],
    starfield: null,
    arenaGridRing: null,

    // HTML Overlay for 3D Floating Vietnamese Labels & Prompts
    labelContainer: null,
    promptBanner: null,
    activePromptTarget: null,

    // Hero Physics & Controls
    heroPos: { x: 0, y: 0, z: 8 },
    heroVel: { x: 0, y: 0, z: 0 },
    heroRotY: Math.PI, // Facing north (-Z) initially
    moveTarget: null,
    keys: {
      up: false,
      down: false,
      left: false,
      right: false
    },
    dashCooldown: 0,
    dashActiveTimer: 0,
    shootCooldown: 0,
    lastInteractTime: 0,

    // Camera Orbit & Shake
    camYaw: 0,
    camPitch: 0.42,
    camDist: 17,
    isDraggingCam: false,
    dragStart: { x: 0, y: 0 },
    pointerMovedDistance: 0,
    shakeIntensity: 0,
    clockTime: 0,

    // Battle state animations
    heroBattleAnim: null,
    bossBattleAnim: null,

    /**
     * Initialize the 3D World
     */
    init(options = {}) {
      if (options.chapters && Array.isArray(options.chapters)) {
        this.chapters = options.chapters;
      }
      if (typeof options.onPortalInteract === 'function') {
        this.onPortalInteract = options.onPortalInteract;
      }
      if (typeof options.onBugSmashed === 'function') {
        this.onBugSmashed = options.onBugSmashed;
      }

      if (this.initialized) {
        this.updateChapters(this.chapters);
        return this;
      }
      this.initialized = true;

      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return this;
      }

      // Ensure canvas exists
      this.canvas = document.getElementById('world3d-canvas');
      if (!this.canvas && document.body && typeof document.createElement === 'function') {
        try {
          this.canvas = document.createElement('canvas');
          this.canvas.id = 'world3d-canvas';
          this.canvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:1;pointer-events:auto;';
          if (document.body.firstChild) {
            document.body.insertBefore(this.canvas, document.body.firstChild);
          } else {
            document.body.appendChild(this.canvas);
          }
        } catch (_) {}
      }

      this._setupOverlayDOM();
      this._bindInputEvents();

      // Check Three.js availability
      const THREE = window.THREE;
      if (!THREE || typeof THREE.Scene !== 'function') {
        return this;
      }

      try {
        this._initThreeScene(THREE);
        this._buildCyberEnvironment(THREE);
        this._buildHero3D(THREE);
        this._buildBossStations3D(THREE);
        this._buildSpecialPortals3D(THREE);
        this._spawnInitialBugs3D(THREE, 8);
        this.updateChapters(this.chapters);
        this._startAnimationLoop();
      } catch (err) {
        // Fallback gracefully in headless test environments without WebGL
        this.webglAvailable = false;
      }

      return this;
    },

    /**
     * Update chapter names/metadata on 3D Boss labels if provided
     */
    updateChapters(chapters) {
      if (!Array.isArray(chapters) || !chapters.length) return;
      this.chapters = chapters;
      this.bossNodes.forEach((node) => {
        const ch = chapters.find((c) => c && Number(c.id) === Number(node.config.id));
        if (ch && node.labelEl) {
          const titleEl = node.labelEl.querySelector('.w3d-label-sub');
          if (titleEl && ch.title) {
            titleEl.textContent = ch.title;
          }
        }
      });
    },

    /**
     * Create floating 3D HTML labels container & Vietnamese interaction prompt banner
     */
    _setupOverlayDOM() {
      if (typeof document === 'undefined' || !document.body || typeof document.createElement !== 'function') return;

      try {
        let container = document.getElementById('world3d-labels-layer');
        if (!container) {
          container = document.createElement('div');
          container.id = 'world3d-labels-layer';
          container.style.cssText = [
            'position:fixed',
            'inset:0',
            'pointer-events:none',
            'z-index:5',
            'overflow:hidden',
            'font-family:"Plus Jakarta Sans",sans-serif'
          ].join(';');
          document.body.appendChild(container);
        }
        this.labelContainer = container;

        let promptEl = document.getElementById('world3d-prompt-banner');
        if (!promptEl) {
          promptEl = document.createElement('div');
          promptEl.id = 'world3d-prompt-banner';
          promptEl.style.cssText = [
            'position:fixed',
            'left:50%',
            'bottom:68px',
            'transform:translateX(-50%)',
            'width:max-content',
            'max-width:calc(100vw - 24px)',
            'white-space:nowrap',
            'overflow:hidden',
            'text-overflow:ellipsis',
            'background:rgba(6, 18, 34, 0.92)',
            'border:1.5px solid #06b6d4',
            'box-shadow:0 0 18px rgba(6, 182, 212, 0.45)',
            'color:#f8fafc',
            'padding:7px 16px',
            'border-radius:8px',
            'font-weight:700',
            'font-size:13px',
            'letter-spacing:0.2px',
            'pointer-events:auto',
            'cursor:pointer',
            'display:none',
            'z-index:35',
            'backdrop-filter:blur(8px)',
            'transition:transform 0.2s ease, border-color 0.2s ease'
          ].join(';');
          promptEl.addEventListener('click', () => {
            this.triggerInteract();
          });
          document.body.appendChild(promptEl);
        }
        this.promptBanner = promptEl;
      } catch (_) {}
    },

    /**
     * Initialize Three.js Scene, Camera, Lights & Renderer
     */
    _initThreeScene(THREE) {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x050914);
      if (typeof THREE.FogExp2 === 'function') {
        this.scene.fog = new THREE.FogExp2(0x050914, 0.0115);
      }

      const w = window.innerWidth || 1280;
      const h = window.innerHeight || 720;
      this.camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 300);
      this.camera.position.set(0, 11, 23);
      this.camera.lookAt(0, 1.5, 0);

      this.raycaster = typeof THREE.Raycaster === 'function' ? new THREE.Raycaster() : null;
      this.mouse = typeof THREE.Vector2 === 'function' ? new THREE.Vector2() : { x: 0, y: 0 };

      // Ambient & Directional & Dynamic Point Lights
      if (typeof THREE.AmbientLight === 'function') {
        const ambient = new THREE.AmbientLight(0x88b4ff, 0.65);
        this.scene.add(ambient);
      }
      if (typeof THREE.DirectionalLight === 'function') {
        const dirLight = new THREE.DirectionalLight(0xe0f2fe, 0.95);
        dirLight.position.set(22, 40, 25);
        this.scene.add(dirLight);
      }
      if (typeof THREE.PointLight === 'function') {
        this.centerLight = new THREE.PointLight(0x06b6d4, 1.6, 65);
        this.centerLight.position.set(0, 8, -4);
        this.scene.add(this.centerLight);

        this.accentLightLeft = new THREE.PointLight(0xf43f5e, 1.2, 55);
        this.accentLightLeft.position.set(-28, 10, -10);
        this.scene.add(this.accentLightLeft);

        this.accentLightRight = new THREE.PointLight(0x10b981, 1.2, 55);
        this.accentLightRight.position.set(28, 10, -10);
        this.scene.add(this.accentLightRight);
      }

      if (this.canvas && typeof THREE.WebGLRenderer === 'function' && typeof this.canvas.getContext === 'function') {
        try {
          this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance'
          });
          this.renderer.setSize(w, h);
          if (typeof this.renderer.setPixelRatio === 'function') {
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          }
          this.webglAvailable = true;
        } catch (_) {
          this.renderer = null;
          this.webglAvailable = false;
        }
      }
    },

    /**
     * Build the 3D Cyber Arena Floor, Neon Grid, Hologram Rings, Cyber Pillars & Starfield
     */
    _buildCyberEnvironment(THREE) {
      // Interactive Ground Plane for Raycasting Clicks
      const floorGeo = new THREE.PlaneGeometry(160, 160);
      const floorMat = new THREE.MeshStandardMaterial({
        color: 0x070e1e,
        roughness: 0.75,
        metalness: 0.35
      });
      this.floorPlane = new THREE.Mesh(floorGeo, floorMat);
      this.floorPlane.rotation.x = -Math.PI / 2;
      this.floorPlane.position.y = 0;
      this.scene.add(this.floorPlane);

      // Glowing Neon Grid
      if (typeof THREE.GridHelper === 'function') {
        const grid = new THREE.GridHelper(140, 70, 0x06b6d4, 0x11284a);
        grid.position.y = 0.03;
        this.scene.add(grid);
      }

      // Concentric Cyber Arena Rings on the floor
      const ringRadii = [8, 18, 34, 46];
      const ringColors = [0x06b6d4, 0x3b82f6, 0x10b981, 0x6366f1];
      this.arenaFloorRings = [];
      ringRadii.forEach((r, idx) => {
        const ringGeo = new THREE.RingGeometry(r - 0.18, r + 0.18, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: ringColors[idx % ringColors.length],
          side: THREE.DoubleSide,
          transparent: true,
          opacity: idx === 2 ? 0.65 : 0.4
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = -Math.PI / 2;
        ringMesh.position.y = 0.05 + idx * 0.01;
        this.scene.add(ringMesh);
        this.arenaFloorRings.push(ringMesh);
      });

      // Click-to-Move Target Marker Ring on Ground
      const markerGroup = new THREE.Group();
      const mRingGeo = new THREE.RingGeometry(0.55, 0.85, 32);
      const mRingMat = new THREE.MeshBasicMaterial({
        color: 0x00f5d4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const mRing = new THREE.Mesh(mRingGeo, mRingMat);
      mRing.rotation.x = -Math.PI / 2;
      markerGroup.add(mRing);
      markerGroup.position.set(0, 0.08, 0);
      markerGroup.visible = false;
      this.scene.add(markerGroup);
      this.targetMarker = markerGroup;

      // Outer Cyber Pillars with Floating Hologram Rings
      const pillarCount = 12;
      const pillarRadius = 52;
      for (let i = 0; i < pillarCount; i++) {
        const angle = (i / pillarCount) * Math.PI * 2;
        const px = Math.cos(angle) * pillarRadius;
        const pz = Math.sin(angle) * pillarRadius;

        const pGroup = new THREE.Group();
        pGroup.position.set(px, 0, pz);

        const bodyGeo = new THREE.BoxGeometry(1.8, 12, 1.8);
        const bodyMat = new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          emissive: i % 2 === 0 ? 0x083344 : 0x1e1b4b,
          metalness: 0.7,
          roughness: 0.25
        });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = 6;
        pGroup.add(body);

        // Glowing neon strip on pillar
        const stripGeo = new THREE.BoxGeometry(2.0, 10, 0.35);
        const stripMat = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0x06b6d4 : 0x8b5cf6
        });
        const strip = new THREE.Mesh(stripGeo, stripMat);
        strip.position.y = 6;
        pGroup.add(strip);

        // Floating hologram torus above pillar
        const holoGeo = new THREE.TorusGeometry(1.5, 0.12, 12, 32);
        const holoMat = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0x22d3ee : 0xa855f7
        });
        const holo = new THREE.Mesh(holoGeo, holoMat);
        holo.position.y = 14.2;
        pGroup.add(holo);

        pGroup.lookAt(0, 0, 0);
        this.scene.add(pGroup);
        this.pillars.push({ group: pGroup, holo, phase: i * 0.6 });
      }

      // 3D Starfield & Cyber Data Particles
      if (typeof THREE.BufferGeometry === 'function' && typeof THREE.Float32BufferAttribute === 'function') {
        const starCount = 420;
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 150;
          positions[i * 3 + 1] = 2 + Math.random() * 48;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 150;

          const isCyan = i % 3 !== 0;
          colors[i * 3] = isCyan ? 0.05 : 0.95;
          colors[i * 3 + 1] = isCyan ? 0.85 : 0.35;
          colors[i * 3 + 2] = 0.98;
        }

        const starGeo = new THREE.BufferGeometry();
        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        starGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const starMat = new THREE.PointsMaterial({
          size: 0.45,
          vertexColors: true,
          transparent: true,
          opacity: 0.85
        });
        this.starfield = new THREE.Points(starGeo, starMat);
        this.scene.add(this.starfield);
      }
    },

    /**
     * Build the Articulated 3D Player Character (Chiến Binh Tester 3D)
     * Includes: Cyber Helmet + Glowing Visor, Armored Torso, Plasma Blade, Bug Blaster, Animated Legs, and Orbiting QA Drone
     */
    _buildHero3D(THREE) {
      const heroGroup = new THREE.Group();
      heroGroup.position.set(this.heroPos.x, 0, this.heroPos.z);
      heroGroup.rotation.y = this.heroRotY;

      // Ground Hero Aura Ring
      const auraGeo = new THREE.RingGeometry(1.15, 1.45, 32);
      const auraMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75
      });
      const auraRing = new THREE.Mesh(auraGeo, auraMat);
      auraRing.rotation.x = -Math.PI / 2;
      auraRing.position.y = 0.06;
      heroGroup.add(auraRing);

      // Character Body Root (allows jump/bob animation)
      const bodyRoot = new THREE.Group();
      heroGroup.add(bodyRoot);

      // Left & Right Legs
      const legGeo = new THREE.BoxGeometry(0.38, 1.1, 0.42);
      const legMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.6,
        roughness: 0.35
      });
      const bootMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
      const bootGeo = new THREE.BoxGeometry(0.42, 0.24, 0.54);

      const leftLeg = new THREE.Group();
      leftLeg.position.set(-0.28, 1.1, 0);
      const leftLegMesh = new THREE.Mesh(legGeo, legMat);
      leftLegMesh.position.y = -0.5;
      const leftBoot = new THREE.Mesh(bootGeo, bootMat);
      leftBoot.position.set(0, -0.98, 0.05);
      leftLeg.add(leftLegMesh);
      leftLeg.add(leftBoot);
      bodyRoot.add(leftLeg);

      const rightLeg = new THREE.Group();
      rightLeg.position.set(0.28, 1.1, 0);
      const rightLegMesh = new THREE.Mesh(legGeo, legMat);
      rightLegMesh.position.y = -0.5;
      const rightBoot = new THREE.Mesh(bootGeo, bootMat);
      rightBoot.position.set(0, -0.98, 0.05);
      rightLeg.add(rightLegMesh);
      rightLeg.add(rightBoot);
      bodyRoot.add(rightLeg);

      // Armored Cyber Torso
      const torsoGeo = new THREE.BoxGeometry(1.05, 1.35, 0.68);
      const torsoMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        emissive: 0x083344,
        metalness: 0.75,
        roughness: 0.25
      });
      const torso = new THREE.Mesh(torsoGeo, torsoMat);
      torso.position.y = 1.85;
      bodyRoot.add(torso);

      // Glowing QA Core Emblem on Chest
      const coreGeo = new THREE.OctahedronGeometry(0.26, 0);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4 });
      const chestCore = new THREE.Mesh(coreGeo, coreMat);
      chestCore.position.set(0, 1.92, 0.36);
      bodyRoot.add(chestCore);

      // Cyber Jetpack on Back
      const packGeo = new THREE.BoxGeometry(0.75, 0.9, 0.36);
      const packMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 });
      const jetpack = new THREE.Mesh(packGeo, packMat);
      jetpack.position.set(0, 1.9, -0.45);
      bodyRoot.add(jetpack);

      // Cyber Helmet & Glowing Cyan Visor
      const headGroup = new THREE.Group();
      headGroup.position.set(0, 2.9, 0);
      const helmetGeo = new THREE.BoxGeometry(0.82, 0.78, 0.82);
      const helmetMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.7,
        roughness: 0.2
      });
      const helmet = new THREE.Mesh(helmetGeo, helmetMat);
      headGroup.add(helmet);

      // Glowing Cyan Visor on Front (+Z of character local space)
      const visorGeo = new THREE.BoxGeometry(0.74, 0.26, 0.12);
      const visorMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4 });
      const visor = new THREE.Mesh(visorGeo, visorMat);
      visor.position.set(0, 0.04, 0.4);
      headGroup.add(visor);

      // Helmet Cyber Crest
      const crestGeo = new THREE.BoxGeometry(0.16, 0.25, 0.88);
      const crest = new THREE.Mesh(crestGeo, visorMat);
      crest.position.set(0, 0.45, 0);
      headGroup.add(crest);
      bodyRoot.add(headGroup);

      // Left Arm + 3D Plasma Blade (Thanh Kiếm Ánh Sáng QA)
      const leftArm = new THREE.Group();
      leftArm.position.set(-0.74, 2.35, 0);
      const armGeo = new THREE.BoxGeometry(0.32, 0.95, 0.32);
      const armMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6, roughness: 0.3 });
      const leftArmMesh = new THREE.Mesh(armGeo, armMat);
      leftArmMesh.position.y = -0.4;
      leftArm.add(leftArmMesh);

      // Plasma Blade attached to Left Hand
      const bladeGroup = new THREE.Group();
      bladeGroup.position.set(0, -0.82, 0.35);
      bladeGroup.rotation.x = Math.PI / 3;
      const hiltGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.4, 8);
      const hiltMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
      const hilt = new THREE.Mesh(hiltGeo, hiltMat);
      bladeGroup.add(hilt);

      const swordGeo = new THREE.BoxGeometry(0.1, 1.85, 0.22);
      const swordMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      const swordBlade = new THREE.Mesh(swordGeo, swordMat);
      swordBlade.position.y = 1.05;
      bladeGroup.add(swordBlade);
      leftArm.add(bladeGroup);
      bodyRoot.add(leftArm);

      // Right Arm + 3D Bug Blaster (Súng Laser Diệt Bug)
      const rightArm = new THREE.Group();
      rightArm.position.set(0.74, 2.35, 0);
      const rightArmMesh = new THREE.Mesh(armGeo, armMat);
      rightArmMesh.position.y = -0.4;
      rightArm.add(rightArmMesh);

      const blasterGroup = new THREE.Group();
      blasterGroup.position.set(0, -0.75, 0.48);
      const gunBodyGeo = new THREE.BoxGeometry(0.24, 0.28, 0.85);
      const gunBodyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.2 });
      const gunBody = new THREE.Mesh(gunBodyGeo, gunBodyMat);
      blasterGroup.add(gunBody);

      const gunBarrelGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.55, 12);
      const gunBarrelMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4 });
      const gunBarrel = new THREE.Mesh(gunBarrelGeo, gunBarrelMat);
      gunBarrel.rotation.x = Math.PI / 2;
      gunBarrel.position.z = 0.52;
      blasterGroup.add(gunBarrel);
      rightArm.add(blasterGroup);
      bodyRoot.add(rightArm);

      // Floating 3D QA Companion Drone (Drone Trợ Chiến K3)
      const droneGroup = new THREE.Group();
      droneGroup.position.set(1.6, 3.6, -0.6);
      const droneCoreGeo = new THREE.OctahedronGeometry(0.35, 1);
      const droneCoreMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x0891b2,
        metalness: 0.7,
        roughness: 0.2
      });
      const droneCore = new THREE.Mesh(droneCoreGeo, droneCoreMat);
      droneGroup.add(droneCore);

      const droneRingGeo = new THREE.TorusGeometry(0.55, 0.05, 8, 24);
      const droneRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const droneRing = new THREE.Mesh(droneRingGeo, droneRingMat);
      droneRing.rotation.x = Math.PI / 2;
      droneGroup.add(droneRing);
      heroGroup.add(droneGroup);

      this.scene.add(heroGroup);
      this.hero = heroGroup;
      this.heroParts = {
        bodyRoot,
        headGroup,
        leftLeg,
        rightLeg,
        leftArm,
        rightArm,
        swordBlade,
        gunBarrel,
        chestCore,
        auraRing,
        droneGroup,
        droneRing
      };
    },

    /**
     * Build the 6 Distinct Giant 3D Bosses arranged in a grand arc
     */
    _buildBossStations3D(THREE) {
      this.bossNodes = [];

      BOSS_CONFIGS.forEach((cfg) => {
        const bx = Math.sin(cfg.angle) * cfg.radius;
        const bz = -Math.cos(cfg.angle) * cfg.radius;

        const stationGroup = new THREE.Group();
        stationGroup.position.set(bx, 0, bz);
        stationGroup.lookAt(0, 0, 8);

        // Glowing Boss Pedestal & Portal Ring on Ground
        const baseGeo = new THREE.CylinderGeometry(3.6, 4.2, 0.6, 24);
        const baseMat = new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          emissive: cfg.emissive,
          metalness: 0.75,
          roughness: 0.25
        });
        const baseMesh = new THREE.Mesh(baseGeo, baseMat);
        baseMesh.position.y = 0.3;
        stationGroup.add(baseMesh);

        const portalRingGeo = new THREE.RingGeometry(4.3, 4.85, 32);
        const portalRingMat = new THREE.MeshBasicMaterial({
          color: cfg.color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85
        });
        const portalRing = new THREE.Mesh(portalRingGeo, portalRingMat);
        portalRing.rotation.x = -Math.PI / 2;
        portalRing.position.y = 0.08;
        stationGroup.add(portalRing);

        // Build Unique 3D Boss Geometry for Chapters 1 to 6
        const bossRoot = new THREE.Group();
        bossRoot.position.y = 4.2;
        const hitMeshes = [baseMesh];

        const mainMat = new THREE.MeshStandardMaterial({
          color: cfg.color,
          emissive: cfg.emissive,
          metalness: 0.65,
          roughness: 0.25
        });
        const glowMat = new THREE.MeshBasicMaterial({ color: cfg.color });
        const darkMat = new THREE.MeshStandardMaterial({
          color: 0x111827,
          metalness: 0.8,
          roughness: 0.2
        });

        if (cfg.id === 1) {
          // Boss 1: Đại Ma Vương NullPointer (Rotating dark octahedron core + 8 orbital spikes)
          const core = new THREE.Mesh(new THREE.OctahedronGeometry(2.1, 0), mainMat);
          bossRoot.add(core);
          hitMeshes.push(core);

          const orbitGroup = new THREE.Group();
          for (let i = 0; i < 8; i++) {
            const ang = (i / 8) * Math.PI * 2;
            const spike = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.8, 6), glowMat);
            spike.position.set(Math.cos(ang) * 3.1, Math.sin(ang * 2) * 0.6, Math.sin(ang) * 3.1);
            spike.rotation.z = ang + Math.PI / 2;
            orbitGroup.add(spike);
          }
          bossRoot.add(orbitGroup);
          bossRoot.userData.animPart = orbitGroup;
        } else if (cfg.id === 2) {
          // Boss 2: Thủy Quái Thác Nước SDLC (Multi-segment undulating cyber-serpent)
          const segments = [];
          for (let s = 0; s < 6; s++) {
            const radius = Math.max(0.7, 1.75 - s * 0.18);
            const seg = new THREE.Mesh(new THREE.SphereGeometry(radius, 14, 14), s % 2 === 0 ? mainMat : darkMat);
            seg.position.set(Math.sin(s * 0.8) * 1.1, 1.6 - s * 0.75, -s * 0.6);
            bossRoot.add(seg);
            segments.push(seg);
            if (s === 0) hitMeshes.push(seg);
          }
          const hornL = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.6, 8), glowMat);
          hornL.position.set(-0.9, 2.9, 0.4);
          const hornR = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.6, 8), glowMat);
          hornR.position.set(0.9, 2.9, 0.4);
          bossRoot.add(hornL);
          bossRoot.add(hornR);
          bossRoot.userData.segments = segments;
        } else if (cfg.id === 3) {
          // Boss 3: Bóng Ma Kiểm Thử Tĩnh (Floating spectral monolith + spinning rune rings)
          const monolith = new THREE.Mesh(new THREE.BoxGeometry(2.1, 4.4, 1.2), mainMat);
          bossRoot.add(monolith);
          hitMeshes.push(monolith);

          const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.14, 12, 36), glowMat);
          const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.3, 0.12, 12, 36), glowMat);
          ring2.rotation.x = Math.PI / 3;
          bossRoot.add(ring1);
          bossRoot.add(ring2);
          bossRoot.userData.rings = [ring1, ring2];
        } else if (cfg.id === 4) {
          // Boss 4: Rồng 3 Đầu Giá Trị Biên K3 (3-headed mechanical hydra with glowing jaws)
          const body = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.1, 2.8, 12), darkMat);
          body.position.y = -0.8;
          bossRoot.add(body);
          hitMeshes.push(body);

          const heads = [];
          [-1.7, 0, 1.7].forEach((offsetX, idx) => {
            const headGroup = new THREE.Group();
            headGroup.position.set(offsetX, 1.3 + (idx === 1 ? 0.5 : 0), 0.7);
            const skull = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 1.6), mainMat);
            const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.35, 1.4), glowMat);
            jaw.position.set(0, -0.55, 0.2);
            headGroup.add(skull);
            headGroup.add(jaw);
            bossRoot.add(headGroup);
            heads.push(headGroup);
            hitMeshes.push(skull);
          });
          bossRoot.userData.heads = heads;
        } else if (cfg.id === 5) {
          // Boss 5: Khổng Lồ Ma Trận Rủi Ro (Giant armored mech golem with rotating hexagonal shield)
          const chest = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.0, 1.9), mainMat);
          bossRoot.add(chest);
          hitMeshes.push(chest);

          const head = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.2, 1.4), darkMat);
          head.position.y = 2.2;
          bossRoot.add(head);

          const shieldGroup = new THREE.Group();
          const shieldRing = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.22, 8, 6), glowMat);
          shieldGroup.add(shieldRing);
          bossRoot.add(shieldGroup);
          bossRoot.userData.animPart = shieldGroup;
        } else {
          // Boss 6: Siêu Robot Tự Động Hóa (Twin-cannon cyber sentinel mech)
          const coreBody = new THREE.Mesh(new THREE.SphereGeometry(1.9, 18, 18), mainMat);
          bossRoot.add(coreBody);
          hitMeshes.push(coreBody);

          const cannonL = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 3.2, 12), darkMat);
          cannonL.rotation.x = Math.PI / 2;
          cannonL.position.set(-2.3, 0.8, 0.8);
          const cannonR = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 3.2, 12), darkMat);
          cannonR.rotation.x = Math.PI / 2;
          cannonR.position.set(2.3, 0.8, 0.8);
          bossRoot.add(cannonL);
          bossRoot.add(cannonR);

          const radar = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.14, 10, 28), glowMat);
          radar.rotation.x = Math.PI / 2;
          radar.position.y = 2.4;
          bossRoot.add(radar);
          bossRoot.userData.animPart = radar;
        }

        // Tag meshes for Raycaster click detection
        hitMeshes.forEach((m) => {
          m.userData = {
            interactType: 'chapter',
            chapterId: cfg.id,
            bossName: cfg.name
          };
        });

        stationGroup.add(bossRoot);
        this.scene.add(stationGroup);

        // Create Floating Vietnamese HTML Label
        const labelEl = this._createFloatingLabel({
          badge: cfg.code,
          title: cfg.name,
          subtitle: cfg.subtitle,
          colorHex: cfg.hex,
          onClick: () => this._handleStationClick('chapter', cfg.id, bx, bz, cfg.name)
        });

        this.bossNodes.push({
          config: cfg,
          group: stationGroup,
          bossRoot,
          portalRing,
          mainMat,
          hitMeshes,
          labelEl,
          x: bx,
          z: bz,
          baseY: 4.2,
          recoilZ: 0,
          flashTimer: 0,
          defeatedAnim: 0
        });
      });
    },

    /**
     * Build Interactive 3D Portals for Mock Exam (40 Câu), Mistake Graveyard (Sổ Thù Vặt) & Blitz 60s
     */
    _buildSpecialPortals3D(THREE) {
      this.portalNodes = [];

      SPECIAL_PORTALS.forEach((p) => {
        const pGroup = new THREE.Group();
        pGroup.position.set(p.x, 0, p.z);

        const baseGeo = new THREE.CylinderGeometry(2.6, 3.1, 0.45, 24);
        const baseMat = new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          emissive: p.emissive,
          metalness: 0.7,
          roughness: 0.25
        });
        const baseMesh = new THREE.Mesh(baseGeo, baseMat);
        baseMesh.position.y = 0.22;
        pGroup.add(baseMesh);

        const archGeo = new THREE.TorusGeometry(2.5, 0.24, 14, 36);
        const archMat = new THREE.MeshBasicMaterial({ color: p.color });
        const archMesh = new THREE.Mesh(archGeo, archMat);
        archMesh.position.y = 2.9;
        pGroup.add(archMesh);

        const innerGeo = new THREE.OctahedronGeometry(0.95, 0);
        const innerMat = new THREE.MeshStandardMaterial({
          color: p.color,
          emissive: p.emissive,
          metalness: 0.5,
          roughness: 0.2
        });
        const innerCrystal = new THREE.Mesh(innerGeo, innerMat);
        innerCrystal.position.y = 2.9;
        pGroup.add(innerCrystal);

        const hitData = {
          interactType: p.type,
          chapterId: null,
          bossName: p.name
        };
        baseMesh.userData = hitData;
        archMesh.userData = hitData;
        innerCrystal.userData = hitData;

        this.scene.add(pGroup);

        const labelEl = this._createFloatingLabel({
          badge: p.code,
          title: p.name,
          subtitle: p.subtitle,
          colorHex: p.hex,
          onClick: () => this._handleStationClick(p.type, null, p.x, p.z, p.name)
        });

        this.portalNodes.push({
          config: p,
          group: pGroup,
          archMesh,
          innerCrystal,
          hitMeshes: [baseMesh, archMesh, innerCrystal],
          labelEl,
          x: p.x,
          z: p.z
        });
      });
    },

    /**
     * Spawn Roaming 3D Bug Monsters (Quái Vật Bug 3D) in the Open Arena
     */
    _spawnInitialBugs3D(THREE, count = 8) {
      this.bugMonsters = [];
      for (let i = 0; i < count; i++) {
        this._spawnSingleBug3D(THREE, i);
      }
    },

    _spawnSingleBug3D(THREE, index = 0) {
      if (!this.scene || !THREE) return;

      const bugGroup = new THREE.Group();
      const angle = (index / 8) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const dist = 7 + Math.random() * 14;
      const bx = Math.cos(angle) * dist;
      const bz = Math.sin(angle) * dist + 2;
      bugGroup.position.set(bx, 0, bz);

      const isPurple = index % 2 === 1;
      const bugColor = isPurple ? 0xa855f7 : 0xf43f5e;
      const bugEmissive = isPurple ? 0x6b21a8 : 0x9f1239;

      // Spiky Cyber-Beetle Carapace
      const bodyGeo = new THREE.SphereGeometry(0.85, 12, 12);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: bugColor,
        emissive: bugEmissive,
        metalness: 0.55,
        roughness: 0.3
      });
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      bodyMesh.position.y = 0.85;
      bugGroup.add(bodyMesh);

      // Glowing Yellow/Red Cyber Eyes
      const eyeGeo = new THREE.SphereGeometry(0.18, 8, 8);
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
      const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
      eyeL.position.set(-0.32, 1.0, 0.72);
      const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
      eyeR.position.set(0.32, 1.0, 0.72);
      bugGroup.add(eyeL);
      bugGroup.add(eyeR);

      // Back Spikes
      const spikeGeo = new THREE.ConeGeometry(0.2, 0.65, 6);
      const spikeMat = new THREE.MeshBasicMaterial({ color: 0xfb7185 });
      const spike = new THREE.Mesh(spikeGeo, spikeMat);
      spike.position.set(0, 1.65, 0);
      bugGroup.add(spike);

      // 6 Scuttling Spider Legs
      const legs = [];
      const legGeo = new THREE.BoxGeometry(0.75, 0.14, 0.14);
      const legMat = new THREE.MeshBasicMaterial({ color: bugColor });
      for (let l = 0; l < 6; l++) {
        const side = l < 3 ? -1 : 1;
        const row = (l % 3) - 1;
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(side * 0.8, 0.55, row * 0.45);
        leg.rotation.z = side * -0.45;
        bugGroup.add(leg);
        legs.push({ mesh: leg, side, row });
      }

      const bugName = BUG_NAMES_VI[index % BUG_NAMES_VI.length];
      bodyMesh.userData = {
        interactType: 'bug',
        bugIndex: index,
        bugName
      };

      this.scene.add(bugGroup);

      this.bugMonsters.push({
        index,
        name: bugName,
        group: bugGroup,
        bodyMesh,
        legs,
        x: bx,
        z: bz,
        vx: (Math.random() - 0.5) * 4.2,
        vz: (Math.random() - 0.5) * 4.2,
        alive: true,
        respawnTimer: 0,
        phase: Math.random() * Math.PI * 2
      });
    },

    /**
     * Create a clickable Vietnamese HTML floating tag projected over 3D world positions
     */
    _createFloatingLabel({ badge, title, subtitle, colorHex, onClick }) {
      if (!this.labelContainer || typeof document === 'undefined' || typeof document.createElement !== 'function') {
        return null;
      }
      try {
        const el = document.createElement('div');
        el.className = 'w3d-floating-label';
        el.style.cssText = [
          'position:absolute',
          'left:0',
          'top:0',
          'transform:translate(-50%, -100%)',
          'width:max-content',
          'max-width:210px',
          'background:rgba(7, 13, 28, 0.88)',
          `border:1.5px solid ${colorHex}`,
          `box-shadow:0 4px 14px ${colorHex}33`,
          'color:#f8fafc',
          'padding:5px 10px',
          'border-radius:8px',
          'pointer-events:auto',
          'cursor:pointer',
          'user-select:none',
          'text-align:center',
          'backdrop-filter:blur(6px)',
          'transition:opacity 0.2s ease'
        ].join(';');

        el.innerHTML = `
          <div style="font-size:10px;font-weight:800;letter-spacing:0.8px;color:${colorHex};text-transform:uppercase;">${badge}</div>
          <div class="w3d-label-title" style="font-size:12.5px;font-weight:700;color:#ffffff;margin-top:1px;">${title}</div>
          <div class="w3d-label-sub" style="font-size:10.5px;color:#cbd5e1;margin-top:1px;max-width:190px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${subtitle}</div>
        `;

        if (typeof onClick === 'function') {
          el.addEventListener('click', (e) => {
            e.stopPropagation();
            onClick();
          });
        }

        this.labelContainer.appendChild(el);
        return el;
      } catch (_) {
        return null;
      }
    },

    /**
     * Handle clicking a 3D Boss or Portal (walks hero toward it and triggers interaction)
     */
    _handleStationClick(type, chapterId, targetX, targetZ, labelName) {
      if (this.mode === 'battle') return;

      // Move hero close to the portal/boss and trigger interact
      const dx = targetX - this.heroPos.x;
      const dz = targetZ - this.heroPos.z;
      const dist = Math.hypot(dx, dz);

      if (dist > 6.5) {
        const stopDist = 4.2;
        const ratio = (dist - stopDist) / dist;
        this.moveTarget = {
          x: this.heroPos.x + dx * ratio,
          z: this.heroPos.z + dz * ratio,
          autoInteract: { type, chapterId, labelName }
        };
        if (this.targetMarker) {
          this.targetMarker.position.set(this.moveTarget.x, 0.08, this.moveTarget.z);
          this.targetMarker.visible = true;
        }
      } else {
        this._invokePortalCallback(type, chapterId);
      }
    },

    _invokePortalCallback(type, chapterId) {
      const now = Date.now();
      if (now - this.lastInteractTime < 450) return;
      this.lastInteractTime = now;

      if (window.CTFLSound && typeof window.CTFLSound.select === 'function') {
        window.CTFLSound.select();
      }
      if (typeof this.onPortalInteract === 'function') {
        this.onPortalInteract(type, chapterId);
      } else if (typeof window.CTFLWorld3D?.onPortalInteract === 'function') {
        window.CTFLWorld3D.onPortalInteract(type, chapterId);
      }
    },

    /**
     * Bind Keyboard (WASD, Arrows, Space, F, E), Mouse Raycasting & Touch/HUD Controls
     */
    _bindInputEvents() {
      if (typeof window === 'undefined') return;

      window.addEventListener('resize', () => this._onResize());

      window.addEventListener('keydown', (e) => {
        const tag = (e.target && e.target.tagName ? e.target.tagName : '').toLowerCase();
        if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
        if (typeof document !== 'undefined' && document.body &&
            !document.body.classList.contains('world3d-freeroam') &&
            !document.body.classList.contains('arena-3d-battle')) {
          return;
        }

        const code = e.code || '';
        const key = (e.key || '').toLowerCase();

        if (code === 'KeyW' || code === 'ArrowUp' || key === 'w') {
          this.keys.up = true;
          this.moveTarget = null;
        } else if (code === 'KeyS' || code === 'ArrowDown' || key === 's') {
          this.keys.down = true;
          this.moveTarget = null;
        } else if (code === 'KeyA' || code === 'ArrowLeft' || key === 'a') {
          this.keys.left = true;
          this.moveTarget = null;
        } else if (code === 'KeyD' || code === 'ArrowRight' || key === 'd') {
          this.keys.right = true;
          this.moveTarget = null;
        } else if (code === 'Space' && this.mode === 'freeroam') {
          // Only intercept Space when in 3D freeroam or when no button is focused
          if (tag !== 'button') {
            e.preventDefault();
            this.triggerDash();
          }
        } else if (code === 'KeyF' || key === 'f') {
          this.triggerShoot();
        } else if (code === 'KeyE' || key === 'e') {
          this.triggerInteract();
        }
      });

      window.addEventListener('keyup', (e) => {
        const code = e.code || '';
        const key = (e.key || '').toLowerCase();
        if (code === 'KeyW' || code === 'ArrowUp' || key === 'w') this.keys.up = false;
        if (code === 'KeyS' || code === 'ArrowDown' || key === 's') this.keys.down = false;
        if (code === 'KeyA' || code === 'ArrowLeft' || key === 'a') this.keys.left = false;
        if (code === 'KeyD' || code === 'ArrowRight' || key === 'd') this.keys.right = false;
      });

      if (this.canvas && typeof this.canvas.addEventListener === 'function') {
        this.canvas.addEventListener('pointerdown', (e) => {
          this.isDraggingCam = true;
          this.dragStart.x = e.clientX;
          this.dragStart.y = e.clientY;
          this.pointerMovedDistance = 0;
        });

        window.addEventListener('pointermove', (e) => {
          if (!this.isDraggingCam) return;
          const dx = e.clientX - this.dragStart.x;
          const dy = e.clientY - this.dragStart.y;
          this.pointerMovedDistance += Math.abs(dx) + Math.abs(dy);
          this.dragStart.x = e.clientX;
          this.dragStart.y = e.clientY;

          if (this.pointerMovedDistance > 6) {
            this.camYaw -= dx * 0.0065;
            this.camPitch = Math.max(0.18, Math.min(1.15, this.camPitch + dy * 0.005));
          }
        });

        window.addEventListener('pointerup', (e) => {
          if (!this.isDraggingCam) return;
          this.isDraggingCam = false;
          if (this.pointerMovedDistance < 10 && e.target === this.canvas) {
            this._handleCanvasClick(e);
          }
        });

        this.canvas.addEventListener(
          'wheel',
          (e) => {
            this.camDist = Math.max(9, Math.min(32, this.camDist + (e.deltaY > 0 ? 1.5 : -1.5)));
          },
          { passive: true }
        );
      }
    },

    /**
     * Raycast click on 3D Canvas:
     * - Click on 3D Bug Monster -> fires 3D laser directly at that bug!
     * - Click on 3D Boss / Portal -> walks to it & opens battle/portal!
     * - Click on 3D Floor -> walks 3D Hero to clicked point & fires laser!
     */
    _handleCanvasClick(e) {
      if (!this.raycaster || !this.camera || !this.scene || this.mode === 'battle') return;

      const w = window.innerWidth || 1280;
      const h = window.innerHeight || 720;
      this.mouse.x = (e.clientX / w) * 2 - 1;
      this.mouse.y = -(e.clientY / h) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);

      // 1. Check 3D Bug Monsters first
      const bugMeshes = this.bugMonsters.filter((b) => b.alive).map((b) => b.bodyMesh);
      if (bugMeshes.length > 0) {
        const bugHits = this.raycaster.intersectObjects(bugMeshes, false);
        if (bugHits.length > 0) {
          const hitBug = this.bugMonsters.find((b) => b.bodyMesh === bugHits[0].object);
          if (hitBug && hitBug.alive) {
            this.heroRotY = Math.atan2(hitBug.x - this.heroPos.x, hitBug.z - this.heroPos.z);
            this.triggerShoot(hitBug);
            return;
          }
        }
      }

      // 2. Check 3D Bosses & Portals
      const interactMeshes = [];
      this.bossNodes.forEach((n) => interactMeshes.push(...n.hitMeshes));
      this.portalNodes.forEach((p) => interactMeshes.push(...p.hitMeshes));

      if (interactMeshes.length > 0) {
        const stationHits = this.raycaster.intersectObjects(interactMeshes, false);
        if (stationHits.length > 0) {
          const data = stationHits[0].object.userData || {};
          if (data.interactType) {
            const pt = stationHits[0].point;
            this._handleStationClick(data.interactType, data.chapterId, pt.x, pt.z, data.bossName);
            return;
          }
        }
      }

      // 3. Check 3D Floor Plane for Click-to-Move
      if (this.floorPlane) {
        const floorHits = this.raycaster.intersectObject(this.floorPlane, false);
        if (floorHits.length > 0) {
          const pt = floorHits[0].point;
          const clampedRadius = Math.min(44, Math.hypot(pt.x, pt.z));
          const ang = Math.atan2(pt.z, pt.x);
          const tx = Math.cos(ang) * clampedRadius;
          const tz = Math.sin(ang) * clampedRadius;

          this.moveTarget = { x: tx, z: tz, autoInteract: null };
          if (this.targetMarker) {
            this.targetMarker.position.set(tx, 0.08, tz);
            this.targetMarker.visible = true;
          }
          // Face target and fire a scouting laser pulse
          this.heroRotY = Math.atan2(tx - this.heroPos.x, tz - this.heroPos.z);
          this.triggerShoot();
        }
      }
    },

    /**
     * Public API for On-Screen D-Pad / Action Buttons (`up`, `down`, `left`, `right`, `dash`, `shoot`, `interact`)
     */
    setControlAction(action, active = true) {
      if (action === 'up' || action === 'down' || action === 'left' || action === 'right') {
        this.keys[action] = Boolean(active);
        if (active) this.moveTarget = null;
      } else if (action === 'dash' && active) {
        this.triggerDash();
      } else if (action === 'shoot' && active) {
        this.triggerShoot();
      } else if (action === 'interact' && active) {
        this.triggerInteract();
      }
    },

    /**
     * Perform 3D Cyber-Dash / Jump with 3D Cyan Energy Burst
     */
    triggerDash() {
      if (this.dashCooldown > 0) return;
      this.dashCooldown = 1.1;
      this.dashActiveTimer = 0.28;

      if (window.CTFLSound && typeof window.CTFLSound.powerup === 'function') {
        window.CTFLSound.powerup();
      }

      const THREE = window.THREE;
      if (THREE && this.scene) {
        this._spawnShockwave3D(THREE, this.heroPos.x, 0.25, this.heroPos.z, 0x00f5d4, 4.5);
        this._spawnExplosion3D(THREE, this.heroPos.x, 1.2, this.heroPos.z, 0x06b6d4, 22);
      }

      // Smash any bug monster within close dash range
      this.bugMonsters.forEach((bug) => {
        if (!bug.alive) return;
        const d = Math.hypot(bug.x - this.heroPos.x, bug.z - this.heroPos.z);
        if (d < 4.2) {
          this._destroyBugMonster(bug);
        }
      });
    },

    /**
     * Fire a 3D Laser Projectile from the Hero's Bug Blaster (auto-aims at nearest bug if none specified)
     */
    triggerShoot(targetBug = null) {
      if (this.shootCooldown > 0) return;
      this.shootCooldown = 0.18;

      if (window.CTFLSound && typeof window.CTFLSound.click === 'function') {
        window.CTFLSound.click();
      }

      const THREE = window.THREE;
      if (!THREE || !this.scene) return;

      // Auto-aim at closest alive bug within 24 units if player isn't aiming elsewhere
      let chosenBug = targetBug;
      if (!chosenBug && this.mode === 'freeroam') {
        let bestDist = 24;
        this.bugMonsters.forEach((b) => {
          if (!b.alive) return;
          const d = Math.hypot(b.x - this.heroPos.x, b.z - this.heroPos.z);
          if (d < bestDist) {
            bestDist = d;
            chosenBug = b;
          }
        });
      }

      if (chosenBug && chosenBug.alive) {
        this.heroRotY = Math.atan2(chosenBug.x - this.heroPos.x, chosenBug.z - this.heroPos.z);
      }

      const dirX = Math.sin(this.heroRotY);
      const dirZ = Math.cos(this.heroRotY);

      const laserGeo = new THREE.SphereGeometry(0.28, 10, 10);
      const laserMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4 });
      const laserMesh = new THREE.Mesh(laserGeo, laserMat);

      const startX = this.heroPos.x + dirX * 1.2;
      const startZ = this.heroPos.z + dirZ * 1.2;
      laserMesh.position.set(startX, 1.65, startZ);
      this.scene.add(laserMesh);

      this.projectiles.push({
        mesh: laserMesh,
        x: startX,
        y: 1.65,
        z: startZ,
        vx: dirX * 42,
        vz: dirZ * 42,
        life: 1.2,
        isHeroLaser: true
      });
    },

    /**
     * Trigger interaction with the nearest 3D Boss or Portal (or default to Chapter 1 Boss if none nearby)
     */
    triggerInteract() {
      if (this.activePromptTarget) {
        this._invokePortalCallback(this.activePromptTarget.type, this.activePromptTarget.id);
        return;
      }

      // Find closest boss station
      let closest = null;
      let minDist = Infinity;
      this.bossNodes.forEach((b) => {
        const d = Math.hypot(b.x - this.heroPos.x, b.z - this.heroPos.z);
        if (d < minDist) {
          minDist = d;
          closest = { type: 'chapter', id: b.config.id };
        }
      });

      if (closest) {
        this._invokePortalCallback(closest.type, closest.id);
      }
    },

    /**
     * Destroy a 3D Bug Monster & Award XP via `onBugSmashed(xpReward)`
     */
    _destroyBugMonster(bug) {
      if (!bug || !bug.alive) return;
      bug.alive = false;
      bug.respawnTimer = 6.5;
      bug.group.visible = false;

      const THREE = window.THREE;
      if (THREE && this.scene) {
        this._spawnExplosion3D(THREE, bug.x, 1.1, bug.z, 0xf43f5e, 28);
        this._spawnShockwave3D(THREE, bug.x, 0.15, bug.z, 0xfbbf24, 3.2);
      }

      const xpReward = 15;
      if (typeof this.onBugSmashed === 'function') {
        this.onBugSmashed(xpReward, bug.name);
      } else if (typeof window.CTFLWorld3D?.onBugSmashed === 'function') {
        window.CTFLWorld3D.onBugSmashed(xpReward, bug.name);
      }
    },

    // =========================================================================
    // 5. DYNAMIC 3D BATTLE CAMERA & 3D COMBAT ANIMATIONS
    // =========================================================================

    /**
     * Swoop 3D Camera into Over-the-Shoulder 3D Boss Battle Mode
     */
    enterBattle(chapterId = 1) {
      this.mode = 'battle';
      const numericId = Number(chapterId) || 1;
      this.battleChapterId = numericId >= 1 && numericId <= 6 ? numericId : 1;
      this.moveTarget = null;
      if (this.targetMarker) this.targetMarker.visible = false;
      if (this.promptBanner) this.promptBanner.style.display = 'none';

      const targetBoss = this._getActiveBossNode();
      if (targetBoss) {
        targetBoss.defeatedAnim = 0;
        targetBoss.bossRoot.visible = true;
        targetBoss.bossRoot.scale.set(1.25, 1.25, 1.25);

        // Position Hero directly in front of the Giant 3D Boss facing it
        const normX = Math.sin(targetBoss.config.angle);
        const normZ = -Math.cos(targetBoss.config.angle);
        const heroDist = targetBoss.config.radius - 11.5;

        this.heroPos.x = normX * heroDist;
        this.heroPos.z = normZ * heroDist;
        this.heroRotY = Math.atan2(targetBoss.x - this.heroPos.x, targetBoss.z - this.heroPos.z);

        if (this.hero) {
          this.hero.position.set(this.heroPos.x, 0, this.heroPos.z);
          this.hero.rotation.y = this.heroRotY;
        }
      }
      return this;
    },

    /**
     * Hero 3D Attack Animation:
     * Hero lunges forward and fires a massive 3D Cyan/Gold Laser Beam & Sword Wave into the 3D Boss!
     */
    heroAttack(isCrit = false) {
      this.heroBattleAnim = {
        timer: 0.65,
        duration: 0.65,
        isCrit: Boolean(isCrit)
      };

      const THREE = window.THREE;
      const boss = this._getActiveBossNode();
      if (THREE && this.scene && boss) {
        const beamColor = isCrit ? 0xfbbf24 : 0x00f5d4;

        // Spawn giant laser projectile / crescent wave from Hero to Boss
        const beamGeo = new THREE.CylinderGeometry(isCrit ? 0.55 : 0.32, isCrit ? 0.55 : 0.32, 11, 12);
        const beamMat = new THREE.MeshBasicMaterial({
          color: beamColor,
          transparent: true,
          opacity: 0.92
        });
        const beamMesh = new THREE.Mesh(beamGeo, beamMat);
        const midX = (this.heroPos.x + boss.x) * 0.5;
        const midZ = (this.heroPos.z + boss.z) * 0.5;
        beamMesh.position.set(midX, 2.8, midZ);
        beamMesh.lookAt(boss.x, 3.8, boss.z);
        beamMesh.rotateX(Math.PI / 2);
        this.scene.add(beamMesh);

        this.shockwaves.push({
          mesh: beamMesh,
          life: 0.32,
          maxLife: 0.32,
          isBeam: true
        });

        // Boss recoil, red flash & 3D particle explosion
        boss.recoilZ = isCrit ? 2.4 : 1.4;
        boss.flashTimer = 0.42;
        this.shakeIntensity = isCrit ? 0.65 : 0.32;

        this._spawnExplosion3D(THREE, boss.x, 4.2, boss.z, beamColor, isCrit ? 52 : 32);
        this._spawnShockwave3D(THREE, boss.x, 3.2, boss.z, beamColor, isCrit ? 8.5 : 5.5);
      }
      return this;
    },

    /**
     * Boss 3D Counter-Attack Animation:
     * Boss charges up and blasts a fiery Red 3D Plasma Barrage that hits the 3D Hero with camera shake!
     */
    bossAttack() {
      this.bossBattleAnim = {
        timer: 0.7,
        duration: 0.7
      };
      this.shakeIntensity = 0.78;

      const THREE = window.THREE;
      const boss = this._getActiveBossNode();
      if (THREE && this.scene && boss) {
        this._spawnExplosion3D(THREE, this.heroPos.x, 2.0, this.heroPos.z, 0xf43f5e, 38);
        this._spawnShockwave3D(THREE, this.heroPos.x, 0.5, this.heroPos.z, 0xf43f5e, 6.5);

        // Fiery Red Plasma Barrage from Boss to Hero
        const blastGeo = new THREE.CylinderGeometry(0.48, 0.85, 11, 12);
        const blastMat = new THREE.MeshBasicMaterial({
          color: 0xf43f5e,
          transparent: true,
          opacity: 0.9
        });
        const blastMesh = new THREE.Mesh(blastGeo, blastMat);
        blastMesh.position.set((this.heroPos.x + boss.x) * 0.5, 2.8, (this.heroPos.z + boss.z) * 0.5);
        blastMesh.lookAt(this.heroPos.x, 1.8, this.heroPos.z);
        blastMesh.rotateX(Math.PI / 2);
        this.scene.add(blastMesh);

        this.shockwaves.push({
          mesh: blastMesh,
          life: 0.36,
          maxLife: 0.36,
          isBeam: true
        });
      }
      return this;
    },

    /**
     * Boss 3D Defeat Animation:
     * Boss explodes into dozens of glowing 3D shards while the 3D Hero performs a celebratory jump!
     */
    bossDefeat() {
      const THREE = window.THREE;
      const boss = this._getActiveBossNode();
      this.shakeIntensity = 0.95;
      this.dashActiveTimer = 0.65; // Hero victory jump

      if (boss) {
        boss.defeatedAnim = 1.8;
        if (THREE && this.scene) {
          this._spawnExplosion3D(THREE, boss.x, 4.5, boss.z, 0xfbbf24, 65);
          this._spawnExplosion3D(THREE, boss.x, 4.5, boss.z, 0x00f5d4, 45);
          this._spawnShockwave3D(THREE, boss.x, 2.5, boss.z, 0xfbbf24, 12);
        }
      }
      return this;
    },

    /**
     * Exit 3D Boss Battle and return smoothly to 3D Free-Roam Exploration
     */
    exitBattle() {
      this.mode = 'freeroam';
      this.bossNodes.forEach((b) => {
        b.defeatedAnim = 0;
        b.bossRoot.visible = true;
        b.bossRoot.scale.set(1, 1, 1);
      });
      return this;
    },

    _getActiveBossNode() {
      if (!this.bossNodes || !this.bossNodes.length) return null;
      return this.bossNodes.find((b) => b.config.id === this.battleChapterId) || this.bossNodes[0];
    },

    // =========================================================================
    // 3D PARTICLE EXPLOSIONS & SHOCKWAVES
    // =========================================================================

    _spawnExplosion3D(THREE, x, y, z, colorHex, count = 28) {
      if (!THREE || !this.scene) return;
      const shardGeo = new THREE.OctahedronGeometry(0.26, 0);
      const shardMat = new THREE.MeshBasicMaterial({ color: colorHex });

      for (let i = 0; i < count; i++) {
        const mesh = new THREE.Mesh(shardGeo, shardMat);
        mesh.position.set(x, y, z);
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.3) * Math.PI;
        const speed = 4 + Math.random() * 14;
        this.scene.add(mesh);
        this.particles3D.push({
          mesh,
          vx: Math.cos(theta) * Math.cos(phi) * speed,
          vy: Math.sin(phi) * speed + 4,
          vz: Math.sin(theta) * Math.cos(phi) * speed,
          life: 0.55 + Math.random() * 0.45
        });
      }
    },

    _spawnShockwave3D(THREE, x, y, z, colorHex, maxScale = 6) {
      if (!THREE || !this.scene) return;
      const ringGeo = new THREE.RingGeometry(0.4, 0.75, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
      });
      const mesh = new THREE.Mesh(ringGeo, ringMat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(x, y, z);
      this.scene.add(mesh);

      this.shockwaves.push({
        mesh,
        life: 0.45,
        maxLife: 0.45,
        maxScale,
        isBeam: false
      });
    },

    // =========================================================================
    // MAIN 60 FPS ANIMATION & PHYSICS LOOP
    // =========================================================================

    _startAnimationLoop() {
      if (typeof window === 'undefined' || typeof window.requestAnimationFrame !== 'function') return;

      let lastTime = performance.now();
      const tick = (now) => {
        const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
        lastTime = now;
        this.clockTime += dt;

        this._updateWorld(dt);
        if (this.renderer && this.scene && this.camera) {
          this.renderer.render(this.scene, this.camera);
        }
        window.requestAnimationFrame(tick);
      };
      window.requestAnimationFrame(tick);
    },

    _updateWorld(dt) {
      const t = this.clockTime;

      if (this.dashCooldown > 0) this.dashCooldown = Math.max(0, this.dashCooldown - dt);
      if (this.dashActiveTimer > 0) this.dashActiveTimer = Math.max(0, this.dashActiveTimer - dt);
      if (this.shootCooldown > 0) this.shootCooldown = Math.max(0, this.shootCooldown - dt);
      if (this.shakeIntensity > 0) this.shakeIntensity = Math.max(0, this.shakeIntensity - dt * 1.8);

      // 1. Update Hero Movement & Animation
      this._updateHeroPhysics(dt, t);

      // 2. Update Roaming 3D Bug Monsters
      this._updateBugMonsters(dt, t);

      // 3. Update 3D Laser Projectiles
      this._updateProjectiles(dt);

      // 4. Update 6 Giant 3D Bosses & Special Portals
      this._updateBossesAndPortals(dt, t);

      // 5. Update 3D Explosions & Shockwaves
      this._updateEffects3D(dt);

      // 6. Update Third-Person / Battle Camera
      this._updateCamera3D(dt, t);

      // 7. Project 3D Floating Vietnamese Labels & Proximity Prompt
      this._updateFloatingLabelsAndPrompt();
    },

    _updateHeroPhysics(dt, t) {
      if (!this.hero) return;

      let isMoving = false;
      const baseSpeed = this.dashActiveTimer > 0 ? 26 : 12.5;

      if (this.mode === 'freeroam') {
        let moveX = 0;
        let moveZ = 0;

        if (this.keys.up) moveZ -= 1;
        if (this.keys.down) moveZ += 1;
        if (this.keys.left) moveX -= 1;
        if (this.keys.right) moveX += 1;

        if (moveX !== 0 || moveZ !== 0) {
          isMoving = true;
          const inputAngle = Math.atan2(moveX, moveZ) + this.camYaw;
          this.heroRotY = inputAngle;
          this.heroPos.x += Math.sin(inputAngle) * baseSpeed * dt;
          this.heroPos.z += Math.cos(inputAngle) * baseSpeed * dt;
          if (this.targetMarker) this.targetMarker.visible = false;
        } else if (this.moveTarget) {
          const dx = this.moveTarget.x - this.heroPos.x;
          const dz = this.moveTarget.z - this.heroPos.z;
          const dist = Math.hypot(dx, dz);
          if (dist > 0.45) {
            isMoving = true;
            this.heroRotY = Math.atan2(dx, dz);
            const step = Math.min(dist, baseSpeed * dt);
            this.heroPos.x += (dx / dist) * step;
            this.heroPos.z += (dz / dist) * step;
          } else {
            const pending = this.moveTarget.autoInteract;
            this.moveTarget = null;
            if (this.targetMarker) this.targetMarker.visible = false;
            if (pending) {
              this._invokePortalCallback(pending.type, pending.chapterId);
            }
          }
        }

        // Clamp hero inside Cyber Arena boundary
        const radialDist = Math.hypot(this.heroPos.x, this.heroPos.z);
        if (radialDist > 45) {
          this.heroPos.x = (this.heroPos.x / radialDist) * 45;
          this.heroPos.z = (this.heroPos.z / radialDist) * 45;
        }
      }

      // Apply Hero Position & Rotation
      let lungeOffsetX = 0;
      let lungeOffsetZ = 0;
      if (this.heroBattleAnim && this.heroBattleAnim.timer > 0) {
        this.heroBattleAnim.timer -= dt;
        const p = Math.sin((this.heroBattleAnim.timer / this.heroBattleAnim.duration) * Math.PI);
        lungeOffsetX = Math.sin(this.heroRotY) * p * 3.2;
        lungeOffsetZ = Math.cos(this.heroRotY) * p * 3.2;
      }

      this.hero.position.set(this.heroPos.x + lungeOffsetX, 0, this.heroPos.z + lungeOffsetZ);
      this.hero.rotation.y = this.heroRotY;

      // Animate Articulated Limbs, Jump & Companion Drone
      const parts = this.heroParts;
      if (parts.bodyRoot) {
        const jumpHeight = this.dashActiveTimer > 0 ? Math.sin((this.dashActiveTimer / 0.28) * Math.PI) * 2.2 : 0;
        const walkBob = isMoving ? Math.abs(Math.sin(t * 12)) * 0.16 : Math.sin(t * 3) * 0.05;
        parts.bodyRoot.position.y = jumpHeight + walkBob;

        const swing = isMoving ? Math.sin(t * 12) * 0.65 : Math.sin(t * 2.5) * 0.06;
        if (parts.leftLeg) parts.leftLeg.rotation.x = swing;
        if (parts.rightLeg) parts.rightLeg.rotation.x = -swing;
        if (parts.leftArm) {
          parts.leftArm.rotation.x = this.heroBattleAnim && this.heroBattleAnim.timer > 0 ? -1.4 : -swing * 0.7;
        }
        if (parts.rightArm) {
          parts.rightArm.rotation.x = this.shootCooldown > 0 ? -0.45 : swing * 0.5;
        }
      }

      if (parts.droneGroup) {
        parts.droneGroup.position.x = Math.cos(t * 2.2) * 1.75;
        parts.droneGroup.position.z = Math.sin(t * 2.2) * 1.75;
        parts.droneGroup.position.y = 3.4 + Math.sin(t * 4) * 0.25;
        parts.droneGroup.rotation.y = t * 2.5;
      }
      if (parts.auraRing) {
        parts.auraRing.rotation.z = t * 1.5;
      }
    },

    _updateBugMonsters(dt, t) {
      this.bugMonsters.forEach((bug) => {
        if (!bug.alive) {
          bug.respawnTimer -= dt;
          if (bug.respawnTimer <= 0) {
            bug.alive = true;
            const ang = Math.random() * Math.PI * 2;
            const rad = 9 + Math.random() * 14;
            bug.x = Math.cos(ang) * rad;
            bug.z = Math.sin(ang) * rad;
            bug.group.position.set(bug.x, 0, bug.z);
            bug.group.visible = true;
          }
          return;
        }

        // Scuttle patrol movement
        bug.x += bug.vx * dt;
        bug.z += bug.vz * dt;

        const distFromCenter = Math.hypot(bug.x, bug.z);
        if (distFromCenter > 26 || distFromCenter < 4) {
          bug.vx = -bug.vx + (Math.random() - 0.5) * 1.5;
          bug.vz = -bug.vz + (Math.random() - 0.5) * 1.5;
        }

        bug.group.position.set(bug.x, Math.abs(Math.sin(t * 9 + bug.phase)) * 0.18, bug.z);
        bug.group.rotation.y = Math.atan2(bug.vx, bug.vz);

        // Animate 6 spider legs
        bug.legs.forEach((l, idx) => {
          l.mesh.rotation.y = Math.sin(t * 16 + idx * 1.1) * 0.35;
        });
      });
    },

    _updateProjectiles(dt) {
      const THREE = window.THREE;
      for (let i = this.projectiles.length - 1; i >= 0; i--) {
        const p = this.projectiles[i];
        p.life -= dt;
        p.x += p.vx * dt;
        p.z += p.vz * dt;
        p.mesh.position.set(p.x, p.y, p.z);

        let hit = false;
        if (p.isHeroLaser) {
          for (let b = 0; b < this.bugMonsters.length; b++) {
            const bug = this.bugMonsters[b];
            if (!bug.alive) continue;
            if (Math.hypot(p.x - bug.x, p.z - bug.z) < 1.35) {
              this._destroyBugMonster(bug);
              hit = true;
              break;
            }
          }
        }

        if (hit || p.life <= 0) {
          if (this.scene) this.scene.remove(p.mesh);
          if (hit && THREE && this.scene) {
            this._spawnExplosion3D(THREE, p.x, p.y, p.z, 0x00f5d4, 12);
          }
          this.projectiles.splice(i, 1);
        }
      }
    },

    _updateBossesAndPortals(dt, t) {
      this.bossNodes.forEach((node, idx) => {
        const root = node.bossRoot;
        if (!root) return;

        // Recoil & Flash Recovery
        if (node.recoilZ > 0) {
          node.recoilZ = Math.max(0, node.recoilZ - dt * 5.5);
        }
        if (node.flashTimer > 0) {
          node.flashTimer = Math.max(0, node.flashTimer - dt);
          if (node.mainMat && node.mainMat.emissive) {
            node.mainMat.emissive.setHex(node.flashTimer > 0 ? 0xffffff : node.config.emissive);
          }
        }

        // Defeat shrink/explosion animation
        if (node.defeatedAnim > 0) {
          node.defeatedAnim = Math.max(0, node.defeatedAnim - dt);
          const s = Math.max(0.05, node.defeatedAnim / 1.8);
          root.scale.set(s, s, s);
          root.rotation.y += dt * 12;
        } else {
          root.position.y = node.baseY + Math.sin(t * 2.2 + idx) * 0.45;
          root.position.z = -node.recoilZ;
        }

        // Boss-specific animated parts
        if (root.userData.animPart) {
          root.userData.animPart.rotation.y = t * 1.8;
          root.userData.animPart.rotation.z = Math.sin(t * 1.2) * 0.35;
        }
        if (root.userData.segments) {
          root.userData.segments.forEach((seg, sIdx) => {
            seg.position.x = Math.sin(t * 3.5 + sIdx * 0.7) * 1.1;
          });
        }
        if (root.userData.rings) {
          root.userData.rings[0].rotation.y = t * 1.6;
          root.userData.rings[1].rotation.x = t * 2.1;
        }
        if (root.userData.heads) {
          root.userData.heads.forEach((h, hIdx) => {
            h.position.y = 1.3 + Math.sin(t * 3.2 + hIdx * 1.3) * 0.35;
          });
        }
      });

      this.portalNodes.forEach((p, idx) => {
        if (p.archMesh) p.archMesh.rotation.z = t * 1.2 + idx;
        if (p.innerCrystal) {
          p.innerCrystal.rotation.y = t * 2.4;
          p.innerCrystal.position.y = 2.9 + Math.sin(t * 3 + idx) * 0.3;
        }
      });

      this.pillars.forEach((p) => {
        if (p.holo) {
          p.holo.rotation.x = t * 1.4 + p.phase;
          p.holo.rotation.y = t * 1.8;
        }
      });
    },

    _updateEffects3D(dt) {
      for (let i = this.particles3D.length - 1; i >= 0; i--) {
        const pt = this.particles3D[i];
        pt.life -= dt;
        pt.vy -= 18 * dt;
        pt.mesh.position.x += pt.vx * dt;
        pt.mesh.position.y = Math.max(0.1, pt.mesh.position.y + pt.vy * dt);
        pt.mesh.position.z += pt.vz * dt;
        pt.mesh.rotation.x += dt * 6;
        pt.mesh.rotation.y += dt * 6;

        if (pt.life <= 0) {
          if (this.scene) this.scene.remove(pt.mesh);
          this.particles3D.splice(i, 1);
        }
      }

      for (let i = this.shockwaves.length - 1; i >= 0; i--) {
        const sw = this.shockwaves[i];
        sw.life -= dt;
        const progress = 1 - Math.max(0, sw.life / sw.maxLife);
        if (!sw.isBeam && sw.maxScale) {
          const scale = 1 + progress * sw.maxScale;
          sw.mesh.scale.set(scale, scale, scale);
        }
        if (sw.mesh.material) {
          sw.mesh.material.opacity = Math.max(0, 1 - progress);
        }
        if (sw.life <= 0) {
          if (this.scene) this.scene.remove(sw.mesh);
          this.shockwaves.splice(i, 1);
        }
      }
    },

    _updateCamera3D(dt, t) {
      if (!this.camera) return;

      const shakeX = this.shakeIntensity > 0 ? (Math.random() - 0.5) * this.shakeIntensity : 0;
      const shakeY = this.shakeIntensity > 0 ? (Math.random() - 0.5) * this.shakeIntensity : 0;

      if (this.mode === 'battle') {
        const boss = this._getActiveBossNode();
        if (boss) {
          // Dramatic Over-the-Shoulder 3D Boss Battle Camera Angle
          const toBossX = boss.x - this.heroPos.x;
          const toBossZ = boss.z - this.heroPos.z;
          const dist = Math.max(1, Math.hypot(toBossX, toBossZ));
          const dirX = toBossX / dist;
          const dirZ = toBossZ / dist;
          const rightX = -dirZ;
          const rightZ = dirX;

          const desiredCamX = this.heroPos.x - dirX * 7.2 + rightX * 3.4 + shakeX;
          const desiredCamY = 5.4 + Math.sin(t * 1.5) * 0.15 + shakeY;
          const desiredCamZ = this.heroPos.z - dirZ * 7.2 + rightZ * 3.4;

          this.camera.position.x += (desiredCamX - this.camera.position.x) * Math.min(1, dt * 6);
          this.camera.position.y += (desiredCamY - this.camera.position.y) * Math.min(1, dt * 6);
          this.camera.position.z += (desiredCamZ - this.camera.position.z) * Math.min(1, dt * 6);
          this.camera.lookAt(boss.x, 3.6, boss.z);
          return;
        }
      }

      // Smooth Third-Person 3D Follow Camera in Free-Roam
      const horizDist = Math.cos(this.camPitch) * this.camDist;
      const vertDist = Math.sin(this.camPitch) * this.camDist;
      const targetCamX = this.heroPos.x - Math.sin(this.camYaw) * horizDist + shakeX;
      const targetCamY = Math.max(2.5, vertDist) + shakeY;
      const targetCamZ = this.heroPos.z + Math.cos(this.camYaw) * horizDist;

      this.camera.position.x += (targetCamX - this.camera.position.x) * Math.min(1, dt * 8);
      this.camera.position.y += (targetCamY - this.camera.position.y) * Math.min(1, dt * 8);
      this.camera.position.z += (targetCamZ - this.camera.position.z) * Math.min(1, dt * 8);
      this.camera.lookAt(this.heroPos.x, 2.2, this.heroPos.z);
    },

    _updateFloatingLabelsAndPrompt() {
      const THREE = window.THREE;
      if (!THREE || !this.camera) return;

      const isFreeroam = typeof document !== 'undefined' && document.body &&
        document.body.classList.contains('world3d-freeroam');
      const is3DActive = isFreeroam || (typeof document !== 'undefined' && document.body &&
        document.body.classList.contains('arena-3d-battle'));
      const hudEl = typeof document !== 'undefined' ? document.getElementById('world3d-hud') : null;
      if (hudEl) {
        hudEl.style.display = isFreeroam ? 'flex' : 'none';
      }
      if (!is3DActive) {
        if (this.labelContainer) this.labelContainer.style.display = 'none';
        if (this.promptBanner) this.promptBanner.style.display = 'none';
        return;
      }
      if (this.labelContainer) {
        this.labelContainer.style.display = isFreeroam ? 'block' : 'none';
      }

      const w = window.innerWidth || 1280;
      const h = window.innerHeight || 720;
      let nearestPrompt = null;
      let nearestDist = 8.2; // Proximity threshold to show Vietnamese [E] prompt

      const projectToScreen = (x, y, z, labelEl) => {
        if (!labelEl) return;
        if (this.mode === 'battle') {
          labelEl.style.display = 'none';
          return;
        }
        const vec = new THREE.Vector3(x, y, z);
        vec.project(this.camera);
        if (vec.z > 1) {
          labelEl.style.display = 'none';
          return;
        }
        const sx = (vec.x * 0.5 + 0.5) * w;
        const sy = (-vec.y * 0.5 + 0.5) * h;
        labelEl.style.display = 'block';
        labelEl.style.left = `${sx}px`;
        labelEl.style.top = `${sy}px`;
      };

      this.bossNodes.forEach((b) => {
        projectToScreen(b.x, 8.2, b.z, b.labelEl);
        const d = Math.hypot(b.x - this.heroPos.x, b.z - this.heroPos.z);
        if (d < nearestDist) {
          nearestDist = d;
          nearestPrompt = {
            type: 'chapter',
            id: b.config.id,
            text: `NHẤN [E] HOẶC CLICK ĐỂ KHIÊU CHIẾN: ${b.config.name} (Chương ${b.config.id})`
          };
        }
      });

      this.portalNodes.forEach((p) => {
        projectToScreen(p.x, 6.2, p.z, p.labelEl);
        const d = Math.hypot(p.x - this.heroPos.x, p.z - this.heroPos.z);
        if (d < nearestDist) {
          nearestDist = d;
          nearestPrompt = {
            type: p.config.type,
            id: null,
            text: `NHẤN [E] HOẶC CLICK ĐỂ MỞ: ${p.config.name}`
          };
        }
      });

      this.activePromptTarget = nearestPrompt;
      if (this.promptBanner) {
        if (this.mode === 'freeroam' && nearestPrompt) {
          this.promptBanner.textContent = nearestPrompt.text;
          this.promptBanner.style.display = 'block';
        } else {
          this.promptBanner.style.display = 'none';
        }
      }
    },

    _onResize() {
      if (!this.camera || !this.renderer || typeof window === 'undefined') return;
      const w = window.innerWidth || 1280;
      const h = window.innerHeight || 720;
      this.camera.aspect = w / h;
      if (typeof this.camera.updateProjectionMatrix === 'function') {
        this.camera.updateProjectionMatrix();
      }
      this.renderer.setSize(w, h);
    }
  };

  if (typeof window !== 'undefined') {
    window.CTFLWorld3D = world3d;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = world3d;
  }
})();
