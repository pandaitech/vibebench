(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const canvas = $("#scene");
  const ctx = canvas.getContext("2d", { alpha: false });
  const app = $("#app");

  const TAU = Math.PI * 2;
  const DEG = Math.PI / 180;
  const FOV = 68 * DEG;
  const CAMERA = { x: 0, y: 1.55, z: 0 };
  const PAPER_RADIUS = 0.17;
  const MAX_PARTICLES = 180;
  const STORAGE = {
    highScore: "lontar-kertas-high-score",
    bestStreak: "lontar-kertas-best-streak",
    sound: "lontar-kertas-sound"
  };

  const LEVELS = [
    {
      name: "Ruang Rehat",
      note: "Pemanas badan",
      distance: 8.2,
      wind: 0.72,
      binX: 0.08,
      tip: "Angin ringan. Bina lengkung balingan yang selesa.",
      obstacles: []
    },
    {
      name: "Peti Bertimbun",
      note: "Jangan sentuh rak",
      distance: 9.7,
      wind: 1.1,
      binX: -0.28,
      tip: "Peti di kanan mengubah laluan paling mudah.",
      obstacles: [
        { type: "crate", x: 1.06, y: 0.98, z: 5.25, w: 1.45, h: 1.95, d: 0.82, color: "#bd7855", label: "FAIL" }
      ]
    },
    {
      name: "Laluan Sempit",
      note: "Sasar celah tengah",
      distance: 11.3,
      wind: 1.58,
      binX: 0.32,
      tip: "Dua blok mengecilkan ruang — jangan baling terlalu rendah.",
      obstacles: [
        { type: "crate", x: -1.18, y: 0.75, z: 6.0, w: 1.38, h: 1.5, d: 0.88, color: "#bd7855", label: "A" },
        { type: "crate", x: 1.24, y: 0.72, z: 7.62, w: 1.32, h: 1.45, d: 0.86, color: "#b9684e", label: "B" }
      ]
    },
    {
      name: "Kipas Silang",
      note: "Tiupan berubah arah",
      distance: 13.35,
      wind: 2.16,
      binX: -0.38,
      tip: "Kipas besar menolak kertas lebih lama di udara.",
      obstacles: [
        { type: "beam", x: 0.9, y: 2.0, z: 7.0, w: 1.7, h: 0.56, d: 0.7, color: "#7e8b55", label: "AWAS", moving: true, range: 0.75, speed: 0.75 },
        { type: "crate", x: -1.45, y: 0.66, z: 9.65, w: 1.3, h: 1.32, d: 0.86, color: "#a9614b", label: "C" }
      ]
    },
    {
      name: "Hujung Koridor",
      note: "Sesi pakar",
      distance: 15.55,
      wind: 2.86,
      binX: 0.46,
      tip: "Angin maksimum. Kuasa dan sudut mesti seimbang.",
      obstacles: [
        { type: "crate", x: -1.35, y: 0.68, z: 7.35, w: 1.28, h: 1.36, d: 0.82, color: "#a9614b", label: "D" },
        { type: "beam", x: 0.22, y: 2.15, z: 9.25, w: 2.1, h: 0.55, d: 0.72, color: "#6f8654", label: "AWAS", moving: true, range: 0.95, speed: 0.92 },
        { type: "crate", x: 1.36, y: 0.68, z: 11.7, w: 1.38, h: 1.36, d: 0.9, color: "#a45d49", label: "E" }
      ]
    }
  ];

  const PAPER_VERTICES = [
    [0, 0.96, 0],
    [0.72, 0.3, 0.2],
    [0.43, -0.72, 0.08],
    [-0.45, -0.66, -0.18],
    [-0.8, 0.22, -0.13],
    [0.06, 0.12, 0.64],
    [0.02, 0.06, -0.62],
    [0.27, 0.18, 0.1],
    [-0.25, -0.17, 0.03]
  ];

  const PAPER_FACES = [
    [0, 1, 5], [0, 5, 4], [0, 4, 6], [0, 6, 1],
    [1, 7, 5], [5, 7, 2], [2, 7, 6], [6, 7, 3],
    [3, 7, 4], [4, 7, 1], [2, 6, 3], [3, 6, 4]
  ];

  const PAPER_COLORS = ["#f5f1dc", "#d8d6bc", "#fffbe5", "#bbbca8", "#ebe6cb", "#9a9f90"];

  const view = { w: 1, h: 1, dpr: 1, focal: 1 };
  const pointer = { id: null };
  const aim = { active: false, startX: 0, startY: 0, currentX: 0, currentY: 0 };
  const particles = [];
  let paper = makePaper();
  let wind = { x: 0.46, z: 0.02 };
  let audioContext = null;
  let fanOscillator = null;
  let fanGain = null;
  let fanFilter = null;
  let lastFrame = performance.now();

  const state = {
    phase: "menu",
    levelIndex: 0,
    stageAttempts: 0,
    stageHits: 0,
    score: 0,
    streak: 0,
    runBestStreak: 0,
    highScore: readStorage(STORAGE.highScore, 0),
    bestStreak: readStorage(STORAGE.bestStreak, 0),
    elapsed: 0,
    fanPhase: 0,
    shake: 0,
    waitTimer: 0,
    waitAction: null,
    feedbackTimer: 0,
    impactCooldown: 0,
    soundOn: readStorage(STORAGE.sound, "1") !== "0",
    lastPower: 0,
    lastResult: null
  };

  const scoreValue = $("#scoreValue");
  const menuHighScore = $("#menuHighScore");
  const menuBestStreak = $("#menuBestStreak");
  const levelNumber = $("#levelNumber");
  const levelName = $("#levelName");
  const levelNote = $("#levelNote");
  const windGlyph = $("#windGlyph");
  const windValue = $("#windValue");
  const windDirection = $("#windDirection");
  const windBars = $("#windBars");
  const attemptValue = $("#attemptValue");
  const stageHits = $("#stageHits");
  const shotDots = [...document.querySelectorAll("#shotDots i")];
  const comboText = $("#comboText");
  const powerValue = $("#powerValue");
  const powerBar = $("#powerBar");
  const powerKnob = $("#powerKnob");
  const powerHint = $("#powerHint");
  const aimReadout = $("#aimReadout");
  const gestureHint = $("#gestureHint");
  const crosshair = $("#crosshair");
  const feedback = $("#feedback");
  const feedbackKicker = $("#feedbackKicker");
  const feedbackTitle = $("#feedbackTitle");
  const feedbackDetail = $("#feedbackDetail");
  const soundButton = $("#soundButton");
  const pauseButton = $("#pauseButton");
  const menuScreen = $("#menuScreen");
  const tutorialScreen = $("#tutorialScreen");
  const pauseScreen = $("#pauseScreen");
  const resultScreen = $("#resultScreen");
  const resultBadge = $("#resultBadge");
  const resultKicker = $("#resultKicker");
  const resultTitle = $("#resultTitle");
  const resultScore = $("#resultScore");
  const resultStreak = $("#resultStreak");
  const resultLevel = $("#resultLevel");
  const resultHighScore = $("#resultHighScore");

  function readStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      const value = Number(raw);
      return Number.isFinite(value) ? value : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try { localStorage.setItem(key, String(value)); } catch (error) { /* Storage is optional. */ }
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function v3(x = 0, y = 0, z = 0) {
    return { x, y, z };
  }

  function copyV(v) {
    return { x: v.x, y: v.y, z: v.z };
  }

  function addV(a, b) {
    return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
  }

  function scaleV(a, amount) {
    return { x: a.x * amount, y: a.y * amount, z: a.z * amount };
  }

  function dotV(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  function lengthV(a) {
    return Math.sqrt(dotV(a, a));
  }

  function formatScore(value) {
    return Math.max(0, Math.round(value)).toString().padStart(6, "0");
  }

  function makePaper() {
    return {
      pos: v3(0, 1.32, 1.1),
      vel: v3(),
      rot: v3(0.14, -0.2, 0.15),
      spin: v3(0, 0, 0),
      size: PAPER_RADIUS,
      active: false,
      visible: true,
      trail: [],
      flightTime: 0,
      bounces: 0,
      result: null
    };
  }

  function currentLevel() {
    return LEVELS[state.levelIndex] || LEVELS[0];
  }

  function fanPosition() {
    return { x: 3.45, y: 3.25, z: Math.min(6.45, currentLevel().distance - 1.9) };
  }

  function rollWind() {
    const max = currentLevel().wind;
    const direction = Math.random() < 0.5 ? -1 : 1;
    let magnitude = max * (0.46 + Math.random() * 0.54);
    if (magnitude < 0.35) magnitude = 0.35;
    wind = {
      x: direction * magnitude,
      z: (Math.random() - 0.5) * max * 0.18
    };
    updateWindUI();
  }

  function updateWindUI() {
    const magnitude = Math.abs(wind.x);
    windValue.textContent = magnitude.toFixed(1);
    windGlyph.textContent = wind.x < 0 ? "←" : "→";
    windDirection.textContent = wind.x < 0 ? "ke kiri" : "ke kanan";
    windBars.className = "wind-bars";
    if (magnitude > currentLevel().wind * 0.78) windBars.classList.add("level-3");
    else if (magnitude > currentLevel().wind * 0.58) windBars.classList.add("level-2");
    else if (magnitude > currentLevel().wind * 0.38) windBars.classList.add("level-1");
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    view.w = Math.max(1, rect.width);
    view.h = Math.max(1, rect.height);
    view.dpr = Math.min(2, window.devicePixelRatio || 1);
    view.focal = view.h / (2 * Math.tan(FOV / 2));
    canvas.width = Math.round(view.w * view.dpr);
    canvas.height = Math.round(view.h * view.dpr);
    ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
  }

  function project(point) {
    const z = point.z - CAMERA.z;
    if (z <= 0.08) return null;
    const scale = view.focal / z;
    return {
      x: view.w * 0.5 + (point.x - CAMERA.x) * scale,
      y: view.h * 0.49 - (point.y - CAMERA.y) * scale,
      scale,
      depth: z
    };
  }

  function shade(hex, amount) {
    const value = hex.replace("#", "");
    const r = clamp(parseInt(value.slice(0, 2), 16) + amount, 0, 255);
    const g = clamp(parseInt(value.slice(2, 4), 16) + amount, 0, 255);
    const b = clamp(parseInt(value.slice(4, 6), 16) + amount, 0, 255);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function drawPolygon(points, fill, stroke = null, lineWidth = 1) {
    if (!points.length || points.some((point) => !point)) return false;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i].x, points[i].y);
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
    return true;
  }

  function drawWorldLine(a, b, stroke, width = 1, alpha = 1) {
    const pa = project(a);
    const pb = project(b);
    if (!pa || !pb) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(pa.x, pa.y);
    ctx.lineTo(pb.x, pb.y);
    ctx.stroke();
    ctx.restore();
  }

  function drawBackground() {
    const horizon = view.h * 0.49;
    const sky = ctx.createLinearGradient(0, 0, 0, horizon + 30);
    sky.addColorStop(0, "#0a2020");
    sky.addColorStop(0.55, "#123237");
    sky.addColorStop(1, "#1d3b3a");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, view.w, view.h);

    const glow = ctx.createRadialGradient(view.w * 0.53, horizon * 0.62, 0, view.w * 0.53, horizon * 0.62, view.w * 0.65);
    glow.addColorStop(0, "rgba(174, 220, 162, 0.15)");
    glow.addColorStop(1, "rgba(174, 220, 162, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, view.w, horizon + 20);

    ctx.fillStyle = "rgba(5, 17, 18, 0.55)";
    ctx.fillRect(0, horizon - 2, view.w, 4);

    ctx.save();
    ctx.globalAlpha = 0.16;
    for (let i = -2; i < 7; i += 1) {
      const x = i * view.w * 0.17;
      ctx.fillStyle = i % 2 === 0 ? "#73aa8a" : "#0b2426";
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + view.w * 0.1, 0);
      ctx.lineTo(x + view.w * 0.18, horizon);
      ctx.lineTo(x + view.w * 0.03, horizon);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  function drawArchitecture() {
    const horizon = view.h * 0.49;
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = "rgba(183, 224, 185, 0.16)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i += 1) {
      const x = view.w * (0.09 + i * 0.22);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + (x - view.w * 0.5) * 0.1, horizon);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(216, 244, 125, 0.22)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(view.w * 0.07, horizon * 0.26);
    ctx.lineTo(view.w * 0.93, horizon * 0.26);
    ctx.stroke();
    ctx.globalAlpha = 0.45;
    for (let i = 0; i < 4; i += 1) {
      const x = view.w * (0.16 + i * 0.25);
      const light = ctx.createLinearGradient(x - 36, 0, x + 36, 0);
      light.addColorStop(0, "rgba(216, 244, 125, 0)");
      light.addColorStop(0.5, "rgba(216, 244, 125, 0.4)");
      light.addColorStop(1, "rgba(216, 244, 125, 0)");
      ctx.fillStyle = light;
      ctx.fillRect(x - 40, horizon * 0.22, 80, 3);
    }
    ctx.restore();

    drawWorldLine({ x: -7, y: 0.02, z: 4 }, { x: 7, y: 0.02, z: 4 }, "rgba(216, 244, 125, 0.12)", 1);
    drawWorldLine({ x: -7, y: 0.02, z: 8 }, { x: 7, y: 0.02, z: 8 }, "rgba(216, 244, 125, 0.1)", 1);
  }

  function drawFloor() {
    const horizon = view.h * 0.49;
    const floor = ctx.createLinearGradient(0, horizon, 0, view.h);
    floor.addColorStop(0, "#173334");
    floor.addColorStop(0.36, "#102b2c");
    floor.addColorStop(1, "#071517");
    ctx.fillStyle = floor;
    ctx.fillRect(0, horizon, view.w, view.h - horizon);

    const far = 2.2;
    const depthLines = [2.2, 2.8, 3.6, 4.7, 6.2, 8.4, 11.2, 14.6, 18.8, 23.5, 29];
    ctx.save();
    depthLines.forEach((z, index) => {
      const left = project({ x: -8, y: 0, z });
      const right = project({ x: 8, y: 0, z });
      if (!left || !right) return;
      ctx.globalAlpha = lerp(0.32, 0.03, index / depthLines.length);
      ctx.strokeStyle = index % 2 ? "#7eac8e" : "#c1d894";
      ctx.lineWidth = index < 4 ? 1.1 : 0.7;
      ctx.beginPath();
      ctx.moveTo(left.x, left.y);
      ctx.lineTo(right.x, right.y);
      ctx.stroke();
    });
    [-8, -6, -4, -2, 0, 2, 4, 6, 8].forEach((x, index) => {
      const near = project({ x, y: 0, z: far });
      const farPoint = project({ x, y: 0, z: 30 });
      if (!near || !farPoint) return;
      ctx.globalAlpha = index === 4 ? 0.2 : 0.09;
      ctx.strokeStyle = index === 4 ? "#d8f47d" : "#8bb596";
      ctx.lineWidth = index === 4 ? 1.1 : 0.7;
      ctx.beginPath();
      ctx.moveTo(near.x, near.y);
      ctx.lineTo(farPoint.x, farPoint.y);
      ctx.stroke();
    });
    ctx.restore();

    const shadow = project({ x: currentLevel().binX, y: 0.02, z: currentLevel().distance + 0.1 });
    if (shadow) {
      const radius = shadow.scale * 1.05;
      const gradient = ctx.createRadialGradient(shadow.x, shadow.y, 0, shadow.x, shadow.y, radius);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.38)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(shadow.x, shadow.y, radius, radius * 0.24, 0, 0, TAU);
      ctx.fill();
    }
  }

  function activeObstacle(obstacle) {
    if (!obstacle.moving) return obstacle;
    return {
      ...obstacle,
      x: obstacle.x + Math.sin(state.elapsed * obstacle.speed + state.levelIndex) * obstacle.range
    };
  }

  function drawCuboid(object, palette = object.color || "#6b8269") {
    const x1 = object.x - object.w / 2;
    const x2 = object.x + object.w / 2;
    const y1 = object.y - object.h / 2;
    const y2 = object.y + object.h / 2;
    const z1 = object.z - object.d / 2;
    const z2 = object.z + object.d / 2;
    const front = [project({ x: x1, y: y1, z: z1 }), project({ x: x2, y: y1, z: z1 }), project({ x: x2, y: y2, z: z1 }), project({ x: x1, y: y2, z: z1 })];
    const back = [project({ x: x1, y: y1, z: z2 }), project({ x: x2, y: y1, z: z2 }), project({ x: x2, y: y2, z: z2 }), project({ x: x1, y: y2, z: z2 })];
    const left = [front[0], back[0], back[3], front[3]];
    const right = [front[1], front[2], back[2], back[1]];
    const top = [front[3], back[3], back[2], front[2]];
    drawPolygon(back, shade(palette, -46));
    drawPolygon(left, shade(palette, -13));
    drawPolygon(right, shade(palette, -58));
    drawPolygon(front, shade(palette, -31), "rgba(235, 245, 206, 0.18)", 1);
    drawPolygon(top, shade(palette, 10), "rgba(235, 245, 206, 0.15)", 1);
    return { front, top };
  }

  function drawObstacle(object) {
    const active = activeObstacle(object);
    const faces = drawCuboid({ ...active, y: active.y }, active.color);
    const frontBottom = project({ x: active.x, y: active.y - active.h * 0.5 + 0.1, z: active.z - active.d * 0.5 - 0.008 });
    const frontTop = project({ x: active.x, y: active.y + active.h * 0.5 - 0.11, z: active.z - active.d * 0.5 - 0.008 });
    if (frontBottom && frontTop) {
      ctx.save();
      ctx.globalAlpha = 0.4;
      ctx.strokeStyle = object.type === "beam" ? "#e9df9a" : "#e8c38b";
      ctx.lineWidth = Math.max(1, frontBottom.scale * 0.008);
      if (object.type === "crate") {
        ctx.beginPath();
        ctx.moveTo(frontBottom.x - active.w * frontBottom.scale * 0.16, frontBottom.y);
        ctx.lineTo(frontTop.x + active.w * frontTop.scale * 0.16, frontTop.y);
        ctx.moveTo(frontBottom.x + active.w * frontBottom.scale * 0.16, frontBottom.y);
        ctx.lineTo(frontTop.x - active.w * frontTop.scale * 0.16, frontTop.y);
        ctx.stroke();
      } else {
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(frontBottom.x - active.w * frontBottom.scale * 0.34, frontBottom.y);
        ctx.lineTo(frontTop.x + active.w * frontTop.scale * 0.34, frontTop.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.restore();
    }
    if (faces.front) {
      const labelPoint = project({ x: active.x, y: active.y, z: active.z - active.d * 0.5 - 0.016 });
      if (labelPoint && labelPoint.scale > 8) {
        ctx.save();
        ctx.globalAlpha = 0.52;
        ctx.fillStyle = object.type === "beam" ? "#e7e4ad" : "#f0d1a0";
        ctx.font = `700 ${clamp(labelPoint.scale * 0.045, 7, 13)}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText(object.label || "", labelPoint.x, labelPoint.y + 4);
        ctx.restore();
      }
    }
  }

  function drawBin() {
    const level = currentLevel();
    const bin = { x: level.binX, y: 0.72, z: level.distance, w: 1.5, h: 1.44, d: 1.12 };
    drawCuboid(bin, "#47735e");

    const outer = [
      project({ x: bin.x - bin.w * 0.5, y: bin.h + 0.015, z: bin.z - bin.d * 0.5 }),
      project({ x: bin.x + bin.w * 0.5, y: bin.h + 0.015, z: bin.z - bin.d * 0.5 }),
      project({ x: bin.x + bin.w * 0.5, y: bin.h + 0.015, z: bin.z + bin.d * 0.5 }),
      project({ x: bin.x - bin.w * 0.5, y: bin.h + 0.015, z: bin.z + bin.d * 0.5 })
    ];
    const inner = [
      project({ x: bin.x - 0.49, y: bin.h + 0.023, z: bin.z - 0.34 }),
      project({ x: bin.x + 0.49, y: bin.h + 0.023, z: bin.z - 0.34 }),
      project({ x: bin.x + 0.49, y: bin.h + 0.023, z: bin.z + 0.34 }),
      project({ x: bin.x - 0.49, y: bin.h + 0.023, z: bin.z + 0.34 })
    ];
    drawPolygon(outer, "rgba(117, 169, 115, 0.82)", "rgba(224, 245, 192, 0.42)", 1.2);
    drawPolygon(inner, "#061516", "rgba(7, 29, 26, 0.9)", 1);

    const lipFront = [
      project({ x: bin.x - bin.w * 0.5, y: bin.h + 0.04, z: bin.z - bin.d * 0.5 - 0.025 }),
      project({ x: bin.x + bin.w * 0.5, y: bin.h + 0.04, z: bin.z - bin.d * 0.5 - 0.025 })
    ];
    if (lipFront[0] && lipFront[1]) {
      ctx.save();
      ctx.strokeStyle = "#9bc58a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(lipFront[0].x, lipFront[0].y);
      ctx.lineTo(lipFront[1].x, lipFront[1].y);
      ctx.stroke();
      ctx.restore();
    }

    const label = project({ x: bin.x, y: 0.78, z: bin.z - bin.d * 0.5 - 0.03 });
    if (label) {
      ctx.save();
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = "#d8f47d";
      ctx.font = `800 ${clamp(label.scale * 0.06, 9, 18)}px Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.letterSpacing = "2px";
      ctx.fillText("SISA", label.x, label.y);
      ctx.restore();
    }

    const target = project({ x: level.binX, y: bin.h + 0.18, z: bin.z - 0.05 });
    if (target) {
      ctx.save();
      ctx.globalAlpha = 0.78;
      ctx.strokeStyle = "rgba(216, 244, 125, 0.74)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.ellipse(target.x, target.y, target.scale * 0.6, target.scale * 0.16, 0, 0, TAU);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }
  }

  function drawFan() {
    const fan = fanPosition();
    const center = project(fan);
    const edge = project({ x: fan.x + 0.7, y: fan.y, z: fan.z });
    if (!center || !edge) return;
    const radius = Math.abs(edge.x - center.x);

    drawWorldLine({ x: fan.x, y: 0.02, z: fan.z }, { x: fan.x, y: fan.y - 0.45, z: fan.z }, "rgba(12, 28, 29, 0.9)", 4);
    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.globalAlpha = 0.88;
    ctx.fillStyle = "#182e2e";
    ctx.strokeStyle = "rgba(207, 231, 179, 0.35)";
    ctx.lineWidth = Math.max(1, radius * 0.06);
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.07, 0, TAU);
    ctx.fill();
    ctx.stroke();

    ctx.globalAlpha = 0.3;
    ctx.strokeStyle = "#d8f47d";
    ctx.lineWidth = Math.max(1, radius * 0.025);
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.87, 0, TAU);
    ctx.stroke();

    ctx.globalAlpha = 0.9;
    for (let i = 0; i < 5; i += 1) {
      const angle = state.fanPhase + i * TAU / 5;
      ctx.save();
      ctx.rotate(angle);
      ctx.fillStyle = i % 2 ? "#84a976" : "#b8d38d";
      ctx.beginPath();
      ctx.moveTo(0, -radius * 0.1);
      ctx.bezierCurveTo(radius * 0.18, -radius * 0.48, radius * 0.74, -radius * 0.52, radius * 0.74, -radius * 0.11);
      ctx.bezierCurveTo(radius * 0.5, -radius * 0.03, radius * 0.21, radius * 0.04, 0, radius * 0.1);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = "#d8f47d";
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.13, 0, TAU);
    ctx.fill();
    ctx.restore();

    drawWindStream(fan, radius);
  }

  function drawWindStream(fan, fanRadius) {
    const sign = wind.x < 0 ? -1 : 1;
    const intensity = clamp(Math.abs(wind.x) / Math.max(0.5, currentLevel().wind), 0.35, 1.2);
    ctx.save();
    ctx.lineCap = "round";
    for (let i = 0; i < 7; i += 1) {
      const start = { x: fan.x + sign * 0.65, y: fan.y + (i - 3) * 0.14, z: fan.z + 0.05 + i * 0.26 };
      const end = { x: fan.x + sign * (1.25 + intensity * 1.5), y: start.y + Math.sin(state.elapsed * 2 + i) * 0.06, z: start.z + 0.75 + i * 0.28 };
      const a = project(start);
      const b = project(end);
      if (!a || !b) continue;
      ctx.globalAlpha = 0.07 + intensity * 0.08;
      ctx.strokeStyle = "#d8f47d";
      ctx.lineWidth = Math.max(0.7, fanRadius * 0.018);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo((a.x + b.x) * 0.5, (a.y + b.y) * 0.5 - 7, b.x, b.y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function rotatePaperPoint(point, rotation) {
    let [x, y, z] = point;
    const cx = Math.cos(rotation.x);
    const sx = Math.sin(rotation.x);
    const cy = Math.cos(rotation.y);
    const sy = Math.sin(rotation.y);
    const cz = Math.cos(rotation.z);
    const sz = Math.sin(rotation.z);

    const y1 = y * cx - z * sx;
    const z1 = y * sx + z * cx;
    const x2 = x * cy + z1 * sy;
    const z2 = -x * sy + z1 * cy;
    return {
      x: x2 * cz - y1 * sz,
      y: x2 * sz + y1 * cz,
      z: z2
    };
  }

  function drawPaper() {
    if (!paper.visible) return;
    const center = project(paper.pos);
    const ground = project({ x: paper.pos.x, y: 0.03, z: paper.pos.z });
    if (!center) return;
    if (ground) {
      const shadowRadius = clamp(center.scale * paper.size * 0.82, 2, 54);
      ctx.save();
      ctx.globalAlpha = paper.active ? 0.16 : 0.27;
      ctx.fillStyle = "#000a0a";
      ctx.beginPath();
      ctx.ellipse(ground.x, ground.y, shadowRadius, shadowRadius * 0.24, 0, 0, TAU);
      ctx.fill();
      ctx.restore();
    }

    const vertices = PAPER_VERTICES.map((vertex) => {
      const rotated = rotatePaperPoint(vertex, paper.rot);
      return project({
        x: paper.pos.x + rotated.x * paper.size,
        y: paper.pos.y + rotated.y * paper.size,
        z: paper.pos.z + rotated.z * paper.size
      });
    });
    const faces = PAPER_FACES.map((face, index) => ({
      face,
      index,
      depth: face.reduce((total, vertexIndex) => total + (vertices[vertexIndex]?.depth || 0), 0) / face.length
    })).sort((a, b) => b.depth - a.depth);

    ctx.save();
    ctx.globalAlpha = paper.active ? 1 : 0.97;
    faces.forEach(({ face, index }) => {
      const points = face.map((vertexIndex) => vertices[vertexIndex]);
      drawPolygon(points, PAPER_COLORS[(index + state.levelIndex) % PAPER_COLORS.length], "rgba(92, 91, 73, 0.3)", 0.55);
    });
    ctx.restore();
  }

  function drawPaperTrail() {
    if (!paper.trail.length || !paper.active) return;
    ctx.save();
    paper.trail.forEach((point, index) => {
      const screen = project(point);
      if (!screen) return;
      const alpha = (index + 1) / paper.trail.length * 0.18;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#e8edc7";
      ctx.beginPath();
      ctx.arc(screen.x, screen.y, clamp(screen.scale * 0.015, 1, 4), 0, TAU);
      ctx.fill();
    });
    ctx.restore();
  }

  function drawAimGuide() {
    if (!aim.active) return;
    const power = getAimPower();
    const velocity = aimVelocity();
    const point = { ...paper.pos };
    const velocityCopy = { ...velocity };
    const dots = [];
    for (let i = 0; i < 24; i += 1) {
      velocityCopy.y -= 9.8 * 0.065;
      velocityCopy.x += wind.x * 0.55 * 0.065;
      velocityCopy.z += wind.z * 0.25 * 0.065;
      point.x += velocityCopy.x * 0.065;
      point.y += velocityCopy.y * 0.065;
      point.z += velocityCopy.z * 0.065;
      if (point.y < 0.08 || point.z > currentLevel().distance + 1.2) break;
      const screen = project(point);
      if (screen) dots.push({ screen, index: i });
    }
    ctx.save();
    dots.forEach(({ screen, index }) => {
      ctx.globalAlpha = 0.75 * (1 - index / 27);
      ctx.fillStyle = index % 3 === 0 ? "#d8f47d" : "#b6cf8d";
      ctx.beginPath();
      ctx.arc(screen.x, screen.y, index % 3 === 0 ? 2.6 : 1.6, 0, TAU);
      ctx.fill();
    });

    const arrowStart = { x: aim.startX, y: aim.startY };
    const arrowEnd = { x: aim.currentX, y: aim.currentY };
    ctx.globalAlpha = 0.88;
    ctx.strokeStyle = "rgba(216, 244, 125, 0.92)";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 5]);
    ctx.beginPath();
    ctx.moveTo(arrowStart.x, arrowStart.y);
    ctx.lineTo(arrowEnd.x, arrowEnd.y);
    ctx.stroke();
    ctx.setLineDash([]);
    const angle = Math.atan2(arrowEnd.y - arrowStart.y, arrowEnd.x - arrowStart.x);
    ctx.fillStyle = "#d8f47d";
    ctx.beginPath();
    ctx.moveTo(arrowEnd.x, arrowEnd.y);
    ctx.lineTo(arrowEnd.x - Math.cos(angle - 0.45) * 12, arrowEnd.y - Math.sin(angle - 0.45) * 12);
    ctx.lineTo(arrowEnd.x - Math.cos(angle + 0.45) * 12, arrowEnd.y - Math.sin(angle + 0.45) * 12);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    void power;
  }

  function drawHands() {
    const scale = clamp(view.w / 480, 0.76, 1.45);
    const cx = view.w * 0.5;
    const base = view.h + 42 * scale;
    const lift = paper.active ? 0.16 : aim.active ? 0.08 : 0;
    const paperScreen = project(paper.pos);
    ctx.save();
    ctx.globalAlpha = 0.98;

    const leftGradient = ctx.createLinearGradient(cx - 220 * scale, base, cx - 70 * scale, base - 190 * scale);
    leftGradient.addColorStop(0, "#122b2a");
    leftGradient.addColorStop(1, "#274b43");
    ctx.fillStyle = leftGradient;
    ctx.beginPath();
    ctx.moveTo(cx - 235 * scale, base + 40 * scale);
    ctx.lineTo(cx - 120 * scale, base + 40 * scale);
    ctx.quadraticCurveTo(cx - 81 * scale, base - 62 * scale, cx - 61 * scale, base - 119 * scale);
    ctx.lineTo(cx - 102 * scale, base - 144 * scale);
    ctx.quadraticCurveTo(cx - 168 * scale, base - 83 * scale, cx - 203 * scale, base - 24 * scale);
    ctx.closePath();
    ctx.fill();

    const rightGradient = ctx.createLinearGradient(cx + 80 * scale, base, cx + 190 * scale, base - 190 * scale);
    rightGradient.addColorStop(0, "#183631");
    rightGradient.addColorStop(1, "#355c4d");
    ctx.fillStyle = rightGradient;
    ctx.beginPath();
    ctx.moveTo(cx + 235 * scale, base + 42 * scale);
    ctx.lineTo(cx + 113 * scale, base + 42 * scale);
    ctx.quadraticCurveTo(cx + 92 * scale, base - 56 * scale, cx + 45 * scale, base - 120 * scale);
    ctx.lineTo(cx + 88 * scale, base - 151 * scale);
    ctx.quadraticCurveTo(cx + 170 * scale, base - 87 * scale, cx + 205 * scale, base - 21 * scale);
    ctx.closePath();
    ctx.fill();

    const palmY = base - 117 * scale - lift * 38 * scale;
    const skin = ctx.createLinearGradient(cx - 45 * scale, palmY - 50 * scale, cx + 55 * scale, palmY + 62 * scale);
    skin.addColorStop(0, "#e7bb94");
    skin.addColorStop(0.55, "#c98c6d");
    skin.addColorStop(1, "#9d604e");
    ctx.fillStyle = skin;
    ctx.beginPath();
    ctx.moveTo(cx - 57 * scale, palmY + 44 * scale);
    ctx.quadraticCurveTo(cx - 73 * scale, palmY + 8 * scale, cx - 47 * scale, palmY - 27 * scale);
    ctx.lineTo(cx - 27 * scale, palmY - 67 * scale);
    ctx.quadraticCurveTo(cx - 16 * scale, palmY - 79 * scale, cx - 7 * scale, palmY - 67 * scale);
    ctx.lineTo(cx - 7 * scale, palmY - 33 * scale);
    ctx.lineTo(cx + 8 * scale, palmY - 81 * scale);
    ctx.quadraticCurveTo(cx + 20 * scale, palmY - 91 * scale, cx + 27 * scale, palmY - 75 * scale);
    ctx.lineTo(cx + 25 * scale, palmY - 27 * scale);
    ctx.lineTo(cx + 42 * scale, palmY - 59 * scale);
    ctx.quadraticCurveTo(cx + 55 * scale, palmY - 69 * scale, cx + 59 * scale, palmY - 49 * scale);
    ctx.lineTo(cx + 44 * scale, palmY + 1 * scale);
    ctx.quadraticCurveTo(cx + 68 * scale, palmY - 24 * scale, cx + 79 * scale, palmY - 4 * scale);
    ctx.quadraticCurveTo(cx + 65 * scale, palmY + 53 * scale, cx + 23 * scale, palmY + 68 * scale);
    ctx.quadraticCurveTo(cx - 30 * scale, palmY + 72 * scale, cx - 57 * scale, palmY + 44 * scale);
    ctx.closePath();
    ctx.fill();

    ctx.save();
    ctx.globalAlpha = 0.24;
    ctx.strokeStyle = "#6f3f39";
    ctx.lineWidth = 1.1 * scale;
    ctx.beginPath();
    ctx.moveTo(cx - 35 * scale, palmY + 22 * scale);
    ctx.quadraticCurveTo(cx - 4 * scale, palmY + 39 * scale, cx + 31 * scale, palmY + 26 * scale);
    ctx.moveTo(cx - 23 * scale, palmY - 4 * scale);
    ctx.quadraticCurveTo(cx - 7 * scale, palmY + 7 * scale, cx + 12 * scale, palmY - 1 * scale);
    ctx.stroke();
    ctx.restore();

    if (paperScreen && !paper.active) {
      ctx.save();
      ctx.globalAlpha = 0.22;
      ctx.strokeStyle = "#7b463c";
      ctx.lineWidth = Math.max(1, scale);
      ctx.beginPath();
      ctx.arc(paperScreen.x, paperScreen.y, Math.max(10, paperScreen.scale * 0.13), 0.3, 2.6);
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  }

  function drawParticles() {
    ctx.save();
    particles.forEach((particle) => {
      const screen = project(particle.pos);
      if (!screen) return;
      const life = clamp(particle.life / particle.maxLife, 0, 1);
      ctx.globalAlpha = life * particle.alpha;
      ctx.fillStyle = particle.color;
      const size = clamp(particle.size * screen.scale, 1, 9);
      if (particle.shape === "diamond") {
        ctx.save();
        ctx.translate(screen.x, screen.y);
        ctx.rotate(particle.rotation);
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.6, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size * 0.6, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(screen.x, screen.y, size, 0, TAU);
        ctx.fill();
      }
    });
    ctx.restore();
  }

  function drawVignette() {
    const edge = ctx.createRadialGradient(view.w * 0.5, view.h * 0.45, view.h * 0.15, view.w * 0.5, view.h * 0.47, Math.max(view.w, view.h) * 0.73);
    edge.addColorStop(0, "rgba(0, 0, 0, 0)");
    edge.addColorStop(0.72, "rgba(0, 0, 0, 0.08)");
    edge.addColorStop(1, "rgba(0, 0, 0, 0.52)");
    ctx.fillStyle = edge;
    ctx.fillRect(0, 0, view.w, view.h);
  }

  function renderWorld() {
    ctx.clearRect(0, 0, view.w, view.h);
    const shakeX = state.shake > 0 ? (Math.random() - 0.5) * state.shake * 9 : 0;
    const shakeY = state.shake > 0 ? (Math.random() - 0.5) * state.shake * 7 : 0;
    ctx.save();
    ctx.translate(shakeX, shakeY);
    drawBackground();
    drawFloor();
    drawArchitecture();
    drawFan();
    const level = currentLevel();
    [...level.obstacles].sort((a, b) => b.z - a.z).forEach(drawObstacle);
    drawBin();
    drawPaperTrail();
    drawParticles();
    drawHands();
    if (aim.active) drawAimGuide();
    drawPaper();
    drawVignette();
    ctx.restore();
  }

  function getAimPower() {
    if (!aim.active) return 0;
    const distance = Math.hypot(aim.currentX - aim.startX, aim.currentY - aim.startY);
    return clamp(distance / (Math.min(view.w, view.h) * 0.38), 0, 1);
  }

  function aimVelocity() {
    const dimension = Math.min(view.w, view.h);
    const power = getAimPower();
    const sideways = clamp((aim.currentX - aim.startX) / dimension * 11, -4.4, 4.4);
    const upward = (aim.startY - aim.currentY) / dimension;
    const lift = clamp(2.35 + upward * 17, 1.65, 8.4);
    const forward = 5.7 + power * 6.6 + state.levelIndex * 0.34;
    return v3(sideways, lift, forward);
  }

  function launchThrow() {
    const power = getAimPower();
    const velocity = aimVelocity();
    paper = makePaper();
    paper.active = true;
    paper.flightTime = 0;
    paper.vel = velocity;
    paper.spin = v3(1.5 + Math.random() * 2.4, -2.4 + Math.random() * 4.6, -1.8 + Math.random() * 3.6);
    state.stageAttempts += 1;
    state.lastPower = power;
    state.lastResult = null;
    state.impactCooldown = 0;
    gestureHint.classList.add("dismissed");
    hideFeedback();
    playThrowSound(power);
    renderUI();
  }

  function resolveObstacleCollision(object) {
    const active = activeObstacle(object);
    const minX = active.x - active.w / 2;
    const maxX = active.x + active.w / 2;
    const minY = active.y - active.h / 2;
    const maxY = active.y + active.h / 2;
    const minZ = active.z - active.d / 2;
    const maxZ = active.z + active.d / 2;
    const nearest = v3(clamp(paper.pos.x, minX, maxX), clamp(paper.pos.y, minY, maxY), clamp(paper.pos.z, minZ, maxZ));
    let normal = v3(paper.pos.x - nearest.x, paper.pos.y - nearest.y, paper.pos.z - nearest.z);
    let distance = lengthV(normal);
    if (distance >= paper.size) return false;
    if (distance < 0.0001) {
      const dx = Math.min(Math.abs(paper.pos.x - minX), Math.abs(maxX - paper.pos.x));
      const dy = Math.min(Math.abs(paper.pos.y - minY), Math.abs(maxY - paper.pos.y));
      const dz = Math.min(Math.abs(paper.pos.z - minZ), Math.abs(maxZ - paper.pos.z));
      if (dx <= dy && dx <= dz) normal = v3(paper.pos.x < active.x ? -1 : 1, 0, 0);
      else if (dy <= dz) normal = v3(0, paper.pos.y < active.y ? -1 : 1, 0);
      else normal = v3(0, 0, paper.pos.z < active.z ? -1 : 1);
      distance = 0;
    } else {
      normal = scaleV(normal, 1 / distance);
    }
    const push = paper.size - distance + 0.006;
    paper.pos.x += normal.x * push;
    paper.pos.y += normal.y * push;
    paper.pos.z += normal.z * push;
    const incoming = dotV(paper.vel, normal);
    if (incoming < 0) {
      paper.vel.x -= normal.x * incoming * 1.52;
      paper.vel.y -= normal.y * incoming * 1.52;
      paper.vel.z -= normal.z * incoming * 1.52;
      paper.vel.x *= 0.78;
      paper.vel.y *= 0.78;
      paper.vel.z *= 0.78;
    }
    if (state.impactCooldown <= 0) {
      playImpactSound(0.7);
      state.impactCooldown = 0.13;
      state.shake = Math.max(state.shake, 0.14);
      spawnBurst(paper.pos, "impact", 5);
    }
    return true;
  }

  function updatePaper(dt) {
    if (!paper.active) return;
    const level = currentLevel();
    paper.flightTime += dt;
    paper.trail.push(copyV(paper.pos));
    if (paper.trail.length > 14) paper.trail.shift();

    paper.vel.y -= 9.8 * dt;
    const windStrength = 0.55 + clamp(paper.pos.z / level.distance, 0, 1) * 0.35;
    paper.vel.x += wind.x * windStrength * dt;
    paper.vel.z += wind.z * 0.26 * dt;
    paper.vel.x *= Math.pow(0.992, dt * 60);
    paper.vel.z *= Math.pow(0.998, dt * 60);
    paper.pos.x += paper.vel.x * dt;
    paper.pos.y += paper.vel.y * dt;
    paper.pos.z += paper.vel.z * dt;
    paper.rot.x += paper.spin.x * dt;
    paper.rot.y += paper.spin.y * dt;
    paper.rot.z += paper.spin.z * dt;
    state.impactCooldown = Math.max(0, state.impactCooldown - dt);

    if (paper.pos.y < paper.size + 0.02 && paper.vel.y < 0) {
      paper.pos.y = paper.size + 0.02;
      if (Math.abs(paper.vel.y) > 1.25 && paper.bounces < 3) {
        paper.vel.y = -paper.vel.y * 0.48;
        paper.vel.x *= 0.84;
        paper.vel.z *= 0.78;
        paper.bounces += 1;
        paper.spin.x *= 0.76;
        playImpactSound(0.55);
        spawnBurst(paper.pos, "impact", 4);
        state.shake = Math.max(state.shake, 0.1);
      } else {
        finishThrow(false, "lantunan terakhir di lantai");
        return;
      }
    }

    if (paper.pos.x < -5.35 && paper.vel.x < 0) {
      paper.pos.x = -5.35;
      paper.vel.x *= -0.62;
      playImpactSound(0.42);
    } else if (paper.pos.x > 5.35 && paper.vel.x > 0) {
      paper.pos.x = 5.35;
      paper.vel.x *= -0.62;
      playImpactSound(0.42);
    }
    if (paper.pos.y > 5.9 && paper.vel.y > 0) {
      paper.pos.y = 5.9;
      paper.vel.y *= -0.36;
    }

    for (const obstacle of level.obstacles) {
      if (resolveObstacleCollision(obstacle)) {
        if (paper.flightTime > 0.12 && paper.vel.z < 0.2) paper.vel.z += 0.4;
      }
    }

    const bin = { x: level.binX, top: 1.44, z: level.distance, depth: 1.12, width: 1.5 };
    const insideOpening = Math.abs(paper.pos.x - bin.x) < 0.5 &&
      paper.pos.z > bin.z - 0.39 && paper.pos.z < bin.z + 0.42 &&
      paper.pos.y > 0.62 && paper.pos.y < bin.top + 0.18 && paper.vel.y < 0;
    if (insideOpening) {
      finishThrow(true, "tepat ke dalam tong");
      return;
    }

    const rimHit = Math.abs(paper.pos.x - bin.x) < 0.78 &&
      paper.pos.z > bin.z - 0.65 && paper.pos.z < bin.z - 0.42 &&
      paper.pos.y > bin.top - 0.12 && paper.pos.y < bin.top + 0.24 && paper.vel.y < 0;
    if (rimHit) {
      paper.pos.y = bin.top + paper.size * 0.72;
      paper.vel.y = Math.abs(paper.vel.y) * 0.33;
      paper.vel.z *= 0.58;
      playImpactSound(0.75);
      spawnBurst(paper.pos, "impact", 5);
      state.shake = Math.max(state.shake, 0.12);
    }

    if (paper.pos.z > level.distance + 2.25 || paper.pos.y < -0.5 || paper.flightTime > 4.8) {
      finishThrow(false, paper.pos.z > level.distance + 1 ? "terlebih jauh dari sasaran" : "jatuh sebelum sasaran");
    }
  }

  function finishThrow(success, reason) {
    if (!paper.active) return;
    paper.active = false;
    paper.result = success ? "hit" : "miss";
    state.lastResult = { success, reason };
    state.shake = success ? 0.2 : 0.08;
    if (success) {
      paper.pos = v3(currentLevel().binX, 1.55, currentLevel().distance);
      paper.vel = v3();
      paper.trail = [];
      state.stageHits += 1;
      state.streak += 1;
      state.runBestStreak = Math.max(state.runBestStreak, state.streak);
      state.bestStreak = Math.max(state.bestStreak, state.runBestStreak);
      const centerBonus = Math.abs(paper.pos.x - currentLevel().binX) < 0.18 ? 35 : 0;
      const combo = Math.min(4, 1 + Math.max(0, state.streak - 1) * 0.28);
      const delta = Math.round((100 + state.levelIndex * 45 + Math.abs(wind.x) * 14 + centerBonus) * combo);
      state.score += delta;
      if (state.score > state.highScore) state.highScore = state.score;
      writeStorage(STORAGE.highScore, state.highScore);
      writeStorage(STORAGE.bestStreak, state.bestStreak);
      spawnBurst(paper.pos, "success", 17);
      playSuccessSound(state.streak);
      const comboLabel = state.streak > 1 ? `rentetan ×${state.streak}` : "lontaran pertama";
      showFeedback(state.streak > 1 ? "RENTETAN NAIK" : "TEPAT MASUK", `+${delta}  •  ${comboLabel}`, reason, 1.35, state.streak > 1 ? "combo" : "success");
    } else {
      state.streak = 0;
      spawnBurst(paper.pos, "miss", 9);
      playMissSound();
      showFeedback("TERLEPAS", "Lantai menang kali ini", reason, 1.25, "miss");
    }

    state.waitAction = state.stageAttempts >= 3
      ? (state.stageHits >= 2 ? "stage-clear" : "game-over")
      : "next-shot";
    state.waitTimer = state.stageAttempts >= 3 ? 1.55 : 1.15;
    renderUI();
  }

  function spawnBurst(position, type, count = 8) {
    const palette = type === "success" ? ["#d8f47d", "#fff4b2", "#a8cc70"] : type === "miss" ? ["#d4b69c", "#9ba499", "#788d84"] : ["#a7c9a1", "#d9e6bd"];
    const amount = Math.min(count, MAX_PARTICLES - particles.length);
    for (let i = 0; i < amount; i += 1) {
      const angle = Math.random() * TAU;
      const speed = type === "success" ? 0.8 + Math.random() * 2.4 : 0.35 + Math.random() * 1.25;
      particles.push({
        pos: { x: position.x, y: position.y, z: position.z },
        vel: v3(Math.cos(angle) * speed, 0.6 + Math.random() * 2.4, Math.sin(angle) * speed * 0.55),
        life: 0.55 + Math.random() * 0.55,
        maxLife: 0.55 + Math.random() * 0.55,
        alpha: type === "success" ? 0.9 : 0.55,
        size: type === "success" ? 0.025 + Math.random() * 0.03 : 0.02 + Math.random() * 0.035,
        color: palette[i % palette.length],
        shape: type === "success" ? "diamond" : "circle",
        rotation: Math.random() * TAU,
        type
      });
    }
  }

  function updateParticles(dt) {
    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const particle = particles[i];
      particle.life -= dt;
      if (particle.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      particle.vel.y -= 4.6 * dt;
      particle.vel.x += wind.x * 0.12 * dt;
      particle.pos.x += particle.vel.x * dt;
      particle.pos.y += particle.vel.y * dt;
      particle.pos.z += particle.vel.z * dt;
      particle.rotation += dt * 3;
    }
  }

  function showFeedback(kicker, title, detail, duration = 1.2, tone = "success") {
    feedbackKicker.textContent = kicker;
    feedbackTitle.textContent = title;
    feedbackDetail.textContent = detail;
    feedback.className = `feedback visible ${tone}`;
    state.feedbackTimer = duration;
  }

  function hideFeedback() {
    feedback.className = "feedback";
    state.feedbackTimer = 0;
  }

  function resetSession() {
    state.levelIndex = 0;
    state.stageAttempts = 0;
    state.stageHits = 0;
    state.score = 0;
    state.streak = 0;
    state.runBestStreak = 0;
    state.waitTimer = 0;
    state.waitAction = null;
    state.lastResult = null;
    state.lastPower = 0;
    paper = makePaper();
    particles.length = 0;
    rollWind();
  }

  function startGame() {
    ensureAudio();
    resetSession();
    setPhase("playing");
    gestureHint.classList.remove("dismissed");
    showFeedback("SESI BERMULA", "Lepaskan untuk melontar", currentLevel().tip, 2.1, "success");
    renderUI();
  }

  function prepareNextThrow() {
    paper = makePaper();
    particles.splice(0, Math.max(0, particles.length - 60));
    state.waitTimer = 0;
    state.waitAction = null;
    state.impactCooldown = 0;
    rollWind();
    aim.active = false;
    renderUI();
  }

  function advanceAfterThrow() {
    const action = state.waitAction;
    state.waitTimer = 0;
    state.waitAction = null;
    if (action === "next-shot") {
      prepareNextThrow();
      showFeedback("CUBAAN SETERUSNYA", "Baca angin baharu", currentLevel().tip, 1.05, "success");
    } else if (action === "stage-clear") {
      if (state.levelIndex >= LEVELS.length - 1) {
        finishGame(true);
        return;
      }
      state.levelIndex += 1;
      state.stageAttempts = 0;
      state.stageHits = 0;
      prepareNextThrow();
      showFeedback(`TAHAP ${String(state.levelIndex + 1).padStart(2, "0")}`, currentLevel().name, currentLevel().tip, 1.45, "combo");
    } else if (action === "game-over") {
      finishGame(false);
    }
  }

  function finishGame(won) {
    paper.active = false;
    state.phase = "result";
    state.waitTimer = 0;
    state.waitAction = null;
    hideFeedback();
    setPhase("result");
    if (won) {
      resultBadge.textContent = "LIMA TAHAP DITAMATKAN";
      resultKicker.textContent = "KIPAS AKHIRNYA KALAH";
      resultTitle.innerHTML = "Balingan<br /><em>bersih.</em>";
      playWinSound();
    } else {
      resultBadge.textContent = "SESI TAMAT";
      resultKicker.textContent = "REKOD DISIMPAN JIKA LEBIH TINGGI";
      resultTitle.innerHTML = "Cuba lagi,<br /><em>pejuang lantai.</em>";
    }
    resultScore.textContent = formatScore(state.score);
    resultStreak.textContent = `${state.runBestStreak}×`;
    resultLevel.textContent = `${String(Math.min(LEVELS.length, state.levelIndex + (won ? 1 : 1))).padStart(2, "0")} / ${String(LEVELS.length).padStart(2, "0")}`;
    resultHighScore.textContent = formatScore(state.highScore);
    renderUI();
  }

  function setPhase(phase) {
    state.phase = phase;
    app.classList.toggle("is-playing", phase === "playing" || phase === "paused");
    menuScreen.hidden = phase !== "menu";
    tutorialScreen.hidden = phase !== "tutorial";
    pauseScreen.hidden = phase !== "paused";
    resultScreen.hidden = phase !== "result";
    pauseButton.style.visibility = phase === "playing" || phase === "paused" ? "visible" : "hidden";
    renderUI();
  }

  function renderUI() {
    const level = currentLevel();
    const displayAttempt = Math.min(3, state.stageAttempts + 1);
    scoreValue.textContent = formatScore(state.score);
    menuHighScore.textContent = formatScore(state.highScore);
    menuBestStreak.textContent = `${state.bestStreak}×`;
    levelNumber.textContent = String(state.levelIndex + 1).padStart(2, "0");
    levelName.textContent = level.name;
    levelNote.textContent = level.note;
    attemptValue.textContent = String(displayAttempt);
    stageHits.textContent = String(state.stageHits);
    shotDots.forEach((dot, index) => {
      dot.className = index < state.stageAttempts ? "used" : "";
      if (index < state.stageHits) dot.className = "hit";
    });
    comboText.textContent = state.streak > 1 ? `Rentetan ×${state.streak} • bonus aktif` : state.streak === 1 ? "Rentetan ×1 • teruskan" : "Rentetan bersedia";
    const power = state.lastPower * 100;
    powerValue.textContent = `${Math.round(aim.active ? getAimPower() * 100 : power)}%`;
    const barPower = aim.active ? getAimPower() * 100 : 0;
    powerBar.style.width = `${Math.max(2, barPower)}%`;
    powerKnob.style.left = `${Math.max(2, barPower)}%`;
    powerHint.textContent = aim.active ? "Lepaskan untuk baling" : "Seret untuk cas";
    aimReadout.classList.toggle("is-active", aim.active);
    crosshair.classList.toggle("is-aiming", aim.active);
    soundButton.textContent = state.soundOn ? "◖" : "·";
    soundButton.classList.toggle("is-muted", !state.soundOn);
    soundButton.setAttribute("aria-label", state.soundOn ? "Bunyi dihidupkan" : "Bunyi dimatikan");
    soundButton.title = state.soundOn ? "Matikan bunyi" : "Hidupkan bunyi";
    pauseButton.setAttribute("aria-label", state.phase === "paused" ? "Sambung permainan" : "Jeda permainan");
  }

  function localPointer(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function beginAim(event) {
    if (state.phase !== "playing" || paper.active || state.waitTimer > 0) return;
    ensureAudio();
    const point = localPointer(event);
    pointer.id = event.pointerId;
    aim.active = true;
    aim.startX = point.x;
    aim.startY = point.y;
    aim.currentX = point.x;
    aim.currentY = point.y;
    gestureHint.classList.add("dismissed");
    canvas.setPointerCapture?.(event.pointerId);
    renderUI();
  }

  function updateAim(event) {
    if (!aim.active || pointer.id !== event.pointerId) return;
    const point = localPointer(event);
    aim.currentX = point.x;
    aim.currentY = point.y;
    renderUI();
  }

  function endAim(event) {
    if (!aim.active || pointer.id !== event.pointerId) return;
    const point = localPointer(event);
    aim.currentX = point.x;
    aim.currentY = point.y;
    const dragDistance = Math.hypot(aim.currentX - aim.startX, aim.currentY - aim.startY);
    aim.active = false;
    pointer.id = null;
    canvas.releasePointerCapture?.(event.pointerId);
    if (dragDistance < 13) {
      showFeedback("LONTAR LEBIH KUAT", "Seret kertas dahulu", "Arahkan seretan ke depan dan lepaskan.", 1.1, "miss");
      renderUI();
      return;
    }
    launchThrow();
  }

  function cancelAim(event) {
    if (pointer.id !== event.pointerId) return;
    aim.active = false;
    pointer.id = null;
    renderUI();
  }

  function handleAction(action) {
    if (action === "start" || action === "restart") startGame();
    else if (action === "tutorial") { setPhase("tutorial"); }
    else if (action === "close-tutorial") { setPhase("menu"); }
    else if (action === "pause" && state.phase === "playing") { setPhase("paused"); }
    else if (action === "resume" && state.phase === "paused") { ensureAudio(); setPhase("playing"); }
    else if (action === "home") { hideFeedback(); setPhase("menu"); paper = makePaper(); resetSession(); }
    else if (action === "sound") toggleSound();
  }

  function toggleSound() {
    state.soundOn = !state.soundOn;
    writeStorage(STORAGE.sound, state.soundOn ? 1 : 0);
    if (state.soundOn) ensureAudio();
    updateFanAudio();
    renderUI();
  }

  function ensureAudio() {
    if (!state.soundOn) return;
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return;
    if (!audioContext) {
      audioContext = new AudioCtor();
      fanOscillator = audioContext.createOscillator();
      fanFilter = audioContext.createBiquadFilter();
      fanGain = audioContext.createGain();
      fanOscillator.type = "sine";
      fanOscillator.frequency.value = 61;
      fanFilter.type = "lowpass";
      fanFilter.frequency.value = 155;
      fanGain.gain.value = 0;
      fanOscillator.connect(fanFilter).connect(fanGain).connect(audioContext.destination);
      fanOscillator.start();
    }
    if (audioContext.state === "suspended") audioContext.resume();
    updateFanAudio();
  }

  function updateFanAudio() {
    if (!audioContext || !fanGain) return;
    const value = state.soundOn && (state.phase === "playing" || state.phase === "paused") ? 0.033 : 0;
    fanGain.gain.cancelScheduledValues(audioContext.currentTime);
    fanGain.gain.setTargetAtTime(value, audioContext.currentTime, 0.08);
  }

  function playTone(frequency, duration, type = "sine", volume = 0.08, delay = 0) {
    if (!state.soundOn || !audioContext) return;
    const start = audioContext.currentTime + delay;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
  }

  function playNoise(duration = 0.16, volume = 0.08, delay = 0) {
    if (!state.soundOn || !audioContext) return;
    const length = Math.max(1, Math.floor(audioContext.sampleRate * duration));
    const buffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    const source = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    const start = audioContext.currentTime + delay;
    source.buffer = buffer;
    filter.type = "bandpass";
    filter.frequency.value = 720;
    filter.Q.value = 0.55;
    gain.gain.setValueAtTime(volume, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    source.connect(filter).connect(gain).connect(audioContext.destination);
    source.start(start);
  }

  function playThrowSound(power) {
    ensureAudio();
    playNoise(0.22 + power * 0.1, 0.06 + power * 0.04);
    playTone(170 + power * 95, 0.22, "triangle", 0.055);
  }

  function playImpactSound(intensity = 0.7) {
    playTone(76 + intensity * 35, 0.17, "sine", 0.08 * intensity);
    playNoise(0.08, 0.045 * intensity, 0.005);
  }

  function playSuccessSound(streak) {
    const base = 380 + Math.min(streak, 5) * 16;
    playTone(base, 0.13, "sine", 0.1, 0);
    playTone(base * 1.25, 0.16, "sine", 0.09, 0.075);
    playTone(base * 1.5, 0.22, "triangle", 0.1, 0.15);
  }

  function playMissSound() {
    playTone(180, 0.19, "sawtooth", 0.055, 0);
    playTone(130, 0.26, "sine", 0.045, 0.13);
  }

  function playWinSound() {
    [440, 554, 659, 880].forEach((frequency, index) => playTone(frequency, 0.25, "triangle", 0.085, index * 0.11));
  }

  function update(dt) {
    state.elapsed += dt;
    state.fanPhase += dt * (1.2 + Math.abs(wind.x) * 0.22);
    state.shake = Math.max(0, state.shake - dt * 0.9);
    updateParticles(dt);
    if (state.feedbackTimer > 0) {
      state.feedbackTimer -= dt;
      if (state.feedbackTimer <= 0) hideFeedback();
    }
    if (state.phase === "playing") {
      updatePaper(dt);
      if (state.waitTimer > 0) {
        state.waitTimer -= dt;
        if (state.waitTimer <= 0) advanceAfterThrow();
      }
    }
  }

  function frame(now) {
    const dt = clamp((now - lastFrame) / 1000, 0.001, 0.034);
    lastFrame = now;
    update(dt);
    renderWorld();
    requestAnimationFrame(frame);
  }

  canvas.addEventListener("pointerdown", beginAim, { passive: false });
  canvas.addEventListener("pointermove", updateAim, { passive: false });
  canvas.addEventListener("pointerup", endAim, { passive: false });
  canvas.addEventListener("pointercancel", cancelAim, { passive: false });
  canvas.addEventListener("contextmenu", (event) => event.preventDefault());
  document.addEventListener("click", (event) => {
    const actionElement = event.target.closest("[data-action]");
    if (actionElement) handleAction(actionElement.dataset.action);
  });
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("keydown", (event) => {
    if (event.code === "KeyP" || event.code === "Escape") {
      if (state.phase === "playing") setPhase("paused");
      else if (state.phase === "paused") setPhase("playing");
    }
    if (event.code === "KeyM") toggleSound();
    if (event.code === "Enter" && (state.phase === "menu" || state.phase === "result")) startGame();
  });

  rollWind();
  resize();
  renderUI();
  setPhase("menu");
  requestAnimationFrame(frame);
})();
