import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const RUNTIME_PARAMS = new URLSearchParams(window.location.search);
const AUTOTEST_MODE = RUNTIME_PARAMS.get("autotest") === "core";
const STORAGE_KEY = AUTOTEST_MODE ? "kedai-saya-autotest-v3" : "kedai-saya-save-v3";
const SAVE_VERSION = 3;
const TAU = Math.PI * 2;
const MOBILE_BREAKPOINT = 680;

const PRODUCT = {
  rice: { name: "Beras", short: "Padi", icon: "🌾", color: 0xeacb66, price: 6 },
  veg: { name: "Sayur", short: "Sayur", icon: "🥬", color: 0x55a957, price: 9 },
  egg: { name: "Telur Kampung", short: "Telur", icon: "🥚", color: 0xffe4a3, price: 11 },
  nasi: { name: "Nasi Lemak", short: "Nasi Lemak", icon: "🍚", color: 0x3f8e5a, price: 24 },
};

const FACILITY_META = [
  { id: "garden", name: "Kebun Sayur", icon: "🥬", cost: 24, prereq: [], copy: "Sumber sayur segar" },
  { id: "vegShelf", name: "Rak Sayur", icon: "▤", cost: 18, prereq: ["garden"], copy: "Jual sayur kepada pelanggan" },
  { id: "coop", name: "Reban Ayam", icon: "🐔", cost: 50, prereq: ["garden"], copy: "Kutip telur kampung" },
  { id: "eggShelf", name: "Rak Telur", icon: "🥚", cost: 28, prereq: ["coop"], copy: "Tambah pilihan di kedai" },
  { id: "worker", name: "Pekerja", icon: "🧑‍🌾", cost: 75, prereq: ["garden"], copy: "Isi Rak Beras secara automatik" },
  { id: "kitchen", name: "Dapur Nasi Lemak", icon: "🍳", cost: 85, prereq: ["eggShelf"], copy: "Proses beras bersama telur" },
  { id: "nasiShelf", name: "Rak Nasi Lemak", icon: "🍚", cost: 35, prereq: ["kitchen"], copy: "Jual hidangan bernilai tinggi" },
  { id: "counter2", name: "Kaunter Ekspres", icon: "🧾", cost: 95, prereq: ["vegShelf"], copy: "Layan pelanggan lebih pantas" },
];

const UPGRADE_META = {
  speed: {
    name: "Kelajuan",
    icon: "⚡",
    color: 0xf2b83c,
    levelKey: "speedLevel",
    base: 34,
    copy: "Bergerak lebih pantas",
  },
  capacity: {
    name: "Kapasiti Bawaan",
    icon: "▦",
    color: 0xf07a44,
    levelKey: "capacityLevel",
    base: 30,
    copy: "Bawa lebih banyak produk",
  },
  shelf: {
    name: "Kapasiti Rak",
    icon: "▤",
    color: 0x4c9c77,
    levelKey: "shelfLevel",
    base: 38,
    copy: "Simpan lebih banyak stok",
  },
  value: {
    name: "Nilai Jualan",
    icon: "RM",
    color: 0x3f82b5,
    levelKey: "valueLevel",
    base: 42,
    copy: "Setiap jualan lebih lumayan",
  },
};

const DEFAULT_STATE = {
  version: SAVE_VERSION,
  money: 8,
  pendingSales: 0,
  totalSales: 0,
  reputation: 100,
  speedLevel: 0,
  capacityLevel: 0,
  shelfLevel: 0,
  valueLevel: 0,
  tutorialStep: 0,
  tutorialRiceHarvested: 0,
  tutorialRiceStocked: 0,
  tutorialSaleSeen: false,
  sound: true,
  inventory: { type: null, count: 0 },
  player: { x: -4.5, z: -7.5 },
  unlocked: {
    paddy: true,
    riceShelf: true,
    garden: false,
    vegShelf: false,
    coop: false,
    eggShelf: false,
    worker: false,
    kitchen: false,
    nasiShelf: false,
    counter2: false,
  },
  shelfStock: { rice: 0, veg: 0, egg: 0, nasi: 0 },
  kitchen: { rice: 0, egg: 0, output: 0, progress: 0 },
};

if (AUTOTEST_MODE) localStorage.removeItem(STORAGE_KEY);

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function loadState() {
  const fresh = cloneDefaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fresh;
    const saved = JSON.parse(raw);
    if (!saved || saved.version !== SAVE_VERSION) return fresh;
    return {
      ...fresh,
      ...saved,
      inventory: { ...fresh.inventory, ...saved.inventory },
      player: { ...fresh.player, ...saved.player },
      unlocked: { ...fresh.unlocked, ...saved.unlocked },
      shelfStock: { ...fresh.shelfStock, ...saved.shelfStock },
      kitchen: { ...fresh.kitchen, ...saved.kitchen },
    };
  } catch (error) {
    console.warn("Simpanan Kedai Saya tidak dapat dibaca.", error);
    return fresh;
  }
}

const state = loadState();
let hasStarted = false;
let paused = true;
let worldReady = false;
let lastSaveAt = 0;
let elapsed = 0;
let screenShake = 0;

const $ = (id) => document.getElementById(id);
const ui = {
  world: $("world"),
  loading: $("loading-screen"),
  loadingFill: $("loading-fill"),
  loadingCopy: $("loading-copy"),
  intro: $("intro-overlay"),
  pause: $("pause-overlay"),
  progress: $("progress-overlay"),
  milestone: $("milestone-overlay"),
  money: $("money-value"),
  sales: $("sales-value"),
  carry: $("carry-value"),
  day: $("day-value"),
  pauseMoney: $("pause-money"),
  pauseSales: $("pause-sales"),
  pauseFacilities: $("pause-facilities"),
  facilityCount: $("facility-count"),
  facilityList: $("facility-list"),
  speedLevel: $("speed-level"),
  capacityLevel: $("capacity-level"),
  shelfLevel: $("shelf-level"),
  valueLevel: $("value-level"),
  missionCard: $("mission-card"),
  missionKicker: $("mission-kicker"),
  missionDistance: $("mission-distance"),
  missionIcon: $("mission-icon"),
  missionTitle: $("mission-title"),
  missionCopy: $("mission-copy"),
  missionFill: $("mission-progress-fill"),
  contextCard: $("context-card"),
  contextIcon: $("context-icon"),
  contextTitle: $("context-title"),
  contextCopy: $("context-copy"),
  contextFill: $("context-fill"),
  toastStack: $("toast-stack"),
  worldTextLayer: $("world-text-layer"),
  joystick: $("joystick"),
  joystickKnob: $("joystick-knob"),
  soundButton: $("sound-button"),
  soundIcon: $("sound-icon"),
  restartButton: $("restart-button"),
  unlockFlash: $("unlock-flash"),
  milestoneTitle: $("milestone-title"),
  milestoneCopy: $("milestone-copy"),
};

function fmtRM(value) {
  return `RM${Math.max(0, Math.round(value)).toLocaleString("ms-MY")}`;
}

function setLoading(progress, copy) {
  ui.loadingFill.style.width = `${Math.round(progress * 100)}%`;
  if (copy) ui.loadingCopy.textContent = copy;
}

function saveGame(force = false) {
  const now = performance.now();
  if (!force && now - lastSaveAt < 2500) return;
  lastSaveAt = now;
  if (player) {
    state.player.x = Number(player.position.x.toFixed(2));
    state.player.z = Number(player.position.z.toFixed(2));
  }
  for (const shelf of Object.values(shelves)) state.shelfStock[shelf.type] = shelf.stock;
  if (kitchen) {
    state.kitchen = {
      rice: kitchen.rice,
      egg: kitchen.egg,
      output: kitchen.output,
      progress: kitchen.progress,
    };
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Kemajuan tidak dapat disimpan.", error);
  }
}

class SoundBank {
  constructor() {
    this.ctx = null;
    this.master = null;
  }

  unlock() {
    if (!state.sound) return;
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.22;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
  }

  tone(frequency, duration = 0.12, type = "sine", volume = 0.18, slide = 0) {
    if (!state.sound) return;
    this.unlock();
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    const oscillator = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    if (slide) oscillator.frequency.exponentialRampToValueAtTime(Math.max(30, frequency + slide), now + duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gain);
    gain.connect(this.master);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  }

  harvest() {
    this.tone(310, 0.08, "triangle", 0.12, 90);
  }

  place() {
    this.tone(210, 0.09, "sine", 0.12, 60);
  }

  sale() {
    this.tone(680, 0.09, "sine", 0.16, 180);
    setTimeout(() => this.tone(960, 0.12, "sine", 0.12, 120), 75);
  }

  cash() {
    this.tone(520, 0.08, "square", 0.1, 110);
    setTimeout(() => this.tone(780, 0.13, "triangle", 0.12, 150), 65);
  }

  unlockSound() {
    [392, 523, 659, 784].forEach((note, index) => {
      setTimeout(() => this.tone(note, 0.24, "sine", 0.12, 35), index * 90);
    });
  }

  unhappy() {
    this.tone(260, 0.22, "sawtooth", 0.08, -90);
  }
}

const sounds = new SoundBank();

function showToast(message, type = "good", icon = "✓", duration = 2400) {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const mark = document.createElement("i");
  mark.textContent = icon;
  const text = document.createElement("span");
  text.textContent = message;
  toast.append(mark, text);
  ui.toastStack.appendChild(toast);
  window.setTimeout(() => {
    toast.classList.add("is-leaving");
    window.setTimeout(() => toast.remove(), 300);
  }, duration);
}

const worldPops = [];
function spawnWorldText(text, position, kind = "") {
  const element = document.createElement("div");
  element.className = `world-pop ${kind}`;
  element.textContent = text;
  ui.worldTextLayer.appendChild(element);
  worldPops.push({
    element,
    position: position.clone(),
    age: 0,
    life: 1.25,
  });
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbce7d4);
scene.fog = new THREE.Fog(0xbce7d4, 34, 66);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < MOBILE_BREAKPOINT ? 1.45 : 1.8));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
ui.world.appendChild(renderer.domElement);

const camera = new THREE.OrthographicCamera(-12, 12, 12, -12, 0.1, 120);
const cameraLook = new THREE.Vector3(0, 0, 0);
const cameraOffset = new THREE.Vector3(24, 30, 28);
camera.position.copy(cameraOffset);
camera.lookAt(cameraLook);

const hemi = new THREE.HemisphereLight(0xfffae9, 0x48785e, 2.05);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff4cf, 3.25);
sun.position.set(-14, 28, -10);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.left = -26;
sun.shadow.camera.right = 26;
sun.shadow.camera.top = 26;
sun.shadow.camera.bottom = -26;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 65;
sun.shadow.bias = -0.0006;
scene.add(sun);
const warmFill = new THREE.DirectionalLight(0xffb863, 0.65);
warmFill.position.set(18, 12, 12);
scene.add(warmFill);

const unitBox = new THREE.BoxGeometry(1, 1, 1);
const lowSphere = new THREE.SphereGeometry(0.5, 10, 7);
const lowCylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 10);
const lowCone = new THREE.ConeGeometry(0.5, 1, 9);
const materialCache = new Map();

function material(color, options = {}) {
  const key = `${color}-${options.roughness ?? 0.82}-${options.metalness ?? 0}-${options.transparent ?? false}-${options.opacity ?? 1}-${options.emissive ?? 0}`;
  if (!materialCache.has(key)) {
    materialCache.set(
      key,
      new THREE.MeshStandardMaterial({
        color,
        roughness: options.roughness ?? 0.82,
        metalness: options.metalness ?? 0,
        transparent: options.transparent ?? false,
        opacity: options.opacity ?? 1,
        emissive: options.emissive ?? 0x000000,
        emissiveIntensity: options.emissiveIntensity ?? 0,
        side: options.side ?? THREE.FrontSide,
      }),
    );
  }
  return materialCache.get(key);
}

function cube(width, height, depth, color, x = 0, y = height / 2, z = 0, options = {}) {
  const mesh = new THREE.Mesh(unitBox, material(color, options));
  mesh.position.set(x, y, z);
  mesh.scale.set(width, height, depth);
  mesh.castShadow = options.castShadow ?? true;
  mesh.receiveShadow = options.receiveShadow ?? true;
  return mesh;
}

function cylinder(radius, height, color, x = 0, y = height / 2, z = 0, options = {}) {
  const mesh = new THREE.Mesh(lowCylinder, material(color, options));
  mesh.position.set(x, y, z);
  mesh.scale.set(radius * 2, height, radius * 2);
  mesh.castShadow = options.castShadow ?? true;
  mesh.receiveShadow = options.receiveShadow ?? true;
  return mesh;
}

function sphere(radius, color, x = 0, y = radius, z = 0, options = {}) {
  const mesh = new THREE.Mesh(lowSphere, material(color, options));
  mesh.position.set(x, y, z);
  mesh.scale.setScalar(radius * 2);
  mesh.castShadow = options.castShadow ?? true;
  mesh.receiveShadow = options.receiveShadow ?? true;
  return mesh;
}

function cone(radius, height, color, x = 0, y = height / 2, z = 0, options = {}) {
  const mesh = new THREE.Mesh(lowCone, material(color, options));
  mesh.position.set(x, y, z);
  mesh.scale.set(radius * 2, height, radius * 2);
  mesh.castShadow = options.castShadow ?? true;
  return mesh;
}

function roundedPath(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function makeLabel(title, subtitle = "", options = {}) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = subtitle ? 148 : 112;
  const ctx = canvas.getContext("2d");
  roundedPath(ctx, 10, 10, 492, canvas.height - 20, 30);
  ctx.fillStyle = options.background || "rgba(8,91,70,.94)";
  ctx.fill();
  ctx.lineWidth = 7;
  ctx.strokeStyle = options.border || "rgba(255,255,255,.82)";
  ctx.stroke();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = options.color || "#fffaf0";
  ctx.font = `900 ${subtitle ? 42 : 46}px system-ui, sans-serif`;
  ctx.fillText(title, 256, subtitle ? 58 : 56);
  if (subtitle) {
    ctx.fillStyle = options.subColor || "#bfead3";
    ctx.font = "800 24px system-ui, sans-serif";
    ctx.fillText(subtitle, 256, 106);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(spriteMaterial);
  const width = options.width || 4.4;
  sprite.scale.set(width, width * (canvas.height / canvas.width), 1);
  sprite.renderOrder = 12;
  return sprite;
}

function addLabel(group, title, subtitle, y, options = {}) {
  const sprite = makeLabel(title, subtitle, options);
  sprite.position.set(options.x || 0, y, options.z || 0);
  group.add(sprite);
  return sprite;
}

function setGroupShadows(group, cast = true, receive = true) {
  group.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = cast;
      object.receiveShadow = receive;
    }
  });
}

const particles = [];
function spawnParticles(position, color = 0xffd45c, count = 8, force = 1) {
  const particleMaterial = material(color, { roughness: 0.72 });
  for (let index = 0; index < count; index += 1) {
    const mesh = new THREE.Mesh(index % 3 === 0 ? lowSphere : unitBox, particleMaterial);
    const size = 0.06 + Math.random() * 0.08;
    mesh.scale.setScalar(size);
    mesh.position.copy(position);
    mesh.position.x += (Math.random() - 0.5) * 0.45;
    mesh.position.z += (Math.random() - 0.5) * 0.45;
    mesh.castShadow = false;
    scene.add(mesh);
    particles.push({
      mesh,
      velocity: new THREE.Vector3((Math.random() - 0.5) * 2.4 * force, (1.3 + Math.random() * 2.2) * force, (Math.random() - 0.5) * 2.4 * force),
      age: 0,
      life: 0.55 + Math.random() * 0.35,
      spin: (Math.random() - 0.5) * 8,
    });
  }
}

const world = new THREE.Group();
scene.add(world);
const decorAnimations = [];
const obstacles = [];
const stationTargets = {};
const shelves = {};
const sources = {};
const unlockZones = [];
const upgradeZones = [];
let kitchen = null;
let cashStation = null;
let player = null;
let worker = null;
let tutorialBeacon = null;

function addObstacle(x, z, width, depth, active = () => true) {
  obstacles.push({ x, z, width, depth, active });
}

function createPathTile(x, z, width = 2, depth = 2, color = 0xe7d6ad, rotation = 0) {
  const tile = cube(width, 0.09, depth, color, x, 0.045, z, { castShadow: false, receiveShadow: true });
  tile.rotation.y = rotation;
  world.add(tile);
  return tile;
}

function createTree(x, z, scale = 1, blossom = false) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  const trunk = cylinder(0.22 * scale, 1.65 * scale, 0x8d623b, 0, 0.82 * scale, 0);
  trunk.rotation.z = (Math.random() - 0.5) * 0.08;
  group.add(trunk);
  const leafColors = blossom ? [0xed8d9e, 0xf3a6b5, 0xd96f87] : [0x378c58, 0x4da865, 0x2f7950];
  const positions = [
    [-0.45, 1.72, 0.05, 0.72],
    [0.28, 1.92, -0.12, 0.78],
    [0.02, 2.28, 0.12, 0.66],
    [0.53, 1.68, 0.2, 0.56],
  ];
  positions.forEach(([px, py, pz, radius], index) => {
    group.add(sphere(radius * scale, leafColors[index % leafColors.length], px * scale, py * scale, pz * scale));
  });
  setGroupShadows(group);
  world.add(group);
  return group;
}

function createPalm(x, z, scale = 1) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  const trunk = cylinder(0.14 * scale, 2.4 * scale, 0x9b6d3e, 0, 1.2 * scale, 0);
  trunk.rotation.z = 0.06;
  group.add(trunk);
  for (let i = 0; i < 7; i += 1) {
    const leaf = cube(0.18 * scale, 0.08 * scale, 1.55 * scale, i % 2 ? 0x2f8a50 : 0x43a65a, 0, 2.42 * scale, 0.65 * scale);
    leaf.rotation.y = (i / 7) * TAU;
    leaf.rotation.x = -0.22;
    group.add(leaf);
  }
  group.add(sphere(0.18 * scale, 0x7d5a2f, -0.2 * scale, 2.3 * scale, 0.08 * scale));
  group.add(sphere(0.17 * scale, 0x7d5a2f, 0.14 * scale, 2.29 * scale, -0.08 * scale));
  world.add(group);
  return group;
}

function createLamp(x, z) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  group.add(cylinder(0.08, 2.4, 0x284d45, 0, 1.2, 0));
  group.add(cube(0.55, 0.1, 0.1, 0x284d45, 0.22, 2.35, 0));
  group.add(cube(0.38, 0.25, 0.32, 0xffe9a5, 0.46, 2.18, 0, { emissive: 0xffca63, emissiveIntensity: 0.4 }));
  world.add(group);
}

function createBench(x, z, rotation = 0) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  group.rotation.y = rotation;
  group.add(cube(1.4, 0.12, 0.42, 0xb9793f, 0, 0.62, 0));
  group.add(cube(1.4, 0.62, 0.1, 0xb9793f, 0, 0.92, 0.2));
  group.add(cube(0.1, 0.58, 0.1, 0x31594c, -0.52, 0.29, 0));
  group.add(cube(0.1, 0.58, 0.1, 0x31594c, 0.52, 0.29, 0));
  world.add(group);
}

function createKetupat(group, x, y, z, scale = 1) {
  const body = cube(0.28 * scale, 0.28 * scale, 0.1 * scale, 0x5eae5b, x, y, z);
  body.rotation.z = Math.PI / 4;
  group.add(body);
  const tailOne = cube(0.035 * scale, 0.46 * scale, 0.035 * scale, 0xe1d55e, x - 0.08 * scale, y - 0.27 * scale, z);
  tailOne.rotation.z = 0.25;
  const tailTwo = tailOne.clone();
  tailTwo.position.x = x + 0.08 * scale;
  tailTwo.rotation.z = -0.25;
  group.add(tailOne, tailTwo);
}

function createGround() {
  const ground = cube(48, 0.25, 42, 0x8bc873, 0, -0.15, 0, { castShadow: false, receiveShadow: true });
  world.add(ground);

  const road = cube(48, 0.07, 6.4, 0x71837c, 0, 0.015, -15.2, { castShadow: false, receiveShadow: true });
  world.add(road);
  for (let x = -22; x <= 22; x += 4) {
    world.add(cube(2, 0.025, 0.14, 0xe9e4cb, x, 0.06, -15.2, { castShadow: false }));
  }
  const curb = cube(48, 0.22, 0.4, 0xe4d8bd, 0, 0.11, -12.2, { castShadow: false });
  world.add(curb);

  for (let index = 0; index < 17; index += 1) {
    const x = -19 + Math.random() * 38;
    const z = -11 + Math.random() * 29;
    if (x > -16 && x < 16 && z > -10 && z < 13) continue;
    const tuft = new THREE.Group();
    tuft.position.set(x, 0.08, z);
    for (let blade = 0; blade < 3; blade += 1) {
      const stem = cube(0.05, 0.25 + Math.random() * 0.18, 0.05, blade % 2 ? 0x5ea75b : 0x4d9652, (blade - 1) * 0.11, 0.13, 0);
      stem.rotation.z = (blade - 1) * 0.25;
      tuft.add(stem);
    }
    world.add(tuft);
  }

  const pathPoints = [
    [-5.2, -11], [-5.2, -9], [-5.2, -7], [-3.4, -6], [-1.6, -6], [0.2, -6], [2, -6], [4, -6], [6, -6], [8, -6], [10, -6], [12, -7], [14, -9], [15, -11],
    [-6.8, -5.3], [-8.6, -4.2], [-9.8, -2.4], [-9.5, -0.5], [-8.3, 1.2], [-7.2, 3], [-6.4, 5], [-5.7, 7], [-4.8, 9],
    [11.8, -4.7], [13.2, -3], [14, -1], [14, 1], [14, 3], [13.5, 5.2], [12.5, 7.2], [10.7, 8.6], [8.6, 9.2], [6.4, 9.5],
  ];
  pathPoints.forEach(([x, z], index) => createPathTile(x, z, 1.8, 1.45, index % 3 === 0 ? 0xeadbb5 : 0xe3d2aa, (index % 2) * 0.04));

  createTree(-18, -8, 1.1);
  createTree(-18, 3, 0.95, true);
  createTree(-16.5, 12, 1.05);
  createTree(17.5, 10.5, 1.1, true);
  createTree(19, -6, 0.9);
  createPalm(-20, 8, 1.1);
  createPalm(19, 2, 0.95);
  createPalm(17, -11, 0.85);
  createLamp(-4, -11.6);
  createLamp(9.5, -11.6);
  createBench(-1.5, -10.8, 0);
}

function createShop() {
  const shop = new THREE.Group();
  shop.position.set(4.1, 0, -0.15);
  world.add(shop);

  shop.add(cube(15.2, 0.16, 11.8, 0xf3dfb7, 0, 0.08, 0, { castShadow: false, receiveShadow: true }));
  for (let x = -6.4; x <= 6.4; x += 1.6) {
    shop.add(cube(0.05, 0.025, 11.5, x % 3.2 === 0 ? 0xd5c49f : 0xe3d1a9, x, 0.18, 0, { castShadow: false }));
  }
  shop.add(cube(15.5, 2.7, 0.34, 0xfff2d3, 0, 1.35, 5.75));
  shop.add(cube(0.34, 2.7, 11.7, 0xfff2d3, 7.58, 1.35, 0));
  shop.add(cube(0.28, 0.58, 11.7, 0x0c7157, 7.39, 0.3, 0));
  shop.add(cube(15.5, 0.58, 0.28, 0x0c7157, 0, 0.3, 5.55));

  const awning = new THREE.Group();
  awning.position.set(0, 2.86, 5.47);
  for (let x = -7.2; x <= 7.2; x += 1.2) {
    awning.add(cube(1.16, 0.18, 1.15, Math.round(x * 10) % 24 === 0 ? 0xf1b83b : 0xe85e43, x, 0, -0.25));
  }
  shop.add(awning);

  const sign = makeLabel("KEDAI SAYA", "MURAH • SEGAR • MESRA", { width: 7.3, background: "#0b6c53", border: "#f7d469" });
  sign.position.set(0, 3.55, 5.6);
  shop.add(sign);

  const welcome = makeLabel("SELAMAT DATANG", "Jiran kita, rezeki kita", { width: 4.3, background: "#f05f43", border: "#fff2ca", subColor: "#fff4d7" });
  welcome.position.set(7.52, 2.3, -2.2);
  welcome.rotation.y = -Math.PI / 2;
  shop.add(welcome);

  for (let index = 0; index < 9; index += 1) {
    const color = [0xe85043, 0xf3c238, 0x2d72aa, 0xf8f3dc][index % 4];
    const flag = cone(0.18, 0.34, color, -5.8 + index * 1.45, 2.75, 5.32);
    flag.rotation.z = Math.PI;
    shop.add(flag);
  }
  createKetupat(shop, -6.4, 2.2, 5.35, 1.05);
  createKetupat(shop, 6.35, 2.2, 5.35, 1.05);

  const planters = [-5.8, 5.8];
  planters.forEach((x) => {
    shop.add(cylinder(0.42, 0.55, 0xc7653f, x, 0.28, 5.15));
    shop.add(sphere(0.5, 0x4c9c5d, x, 0.85, 5.15));
    shop.add(sphere(0.16, 0xf19b9f, x - 0.2, 1.1, 5.13));
    shop.add(sphere(0.14, 0xffca58, x + 0.18, 1.08, 5.13));
  });

  addObstacle(4.1, 5.6, 15.6, 0.6);
  addObstacle(11.5, -0.15, 0.6, 12);
  stationTargets.shop = new THREE.Vector3(4.1, 0, -0.15);
}

function createRiceVisual(scale = 1) {
  const group = new THREE.Group();
  const sack = cube(0.38 * scale, 0.32 * scale, 0.27 * scale, 0xf1e3b5, 0, 0.16 * scale, 0);
  sack.rotation.z = 0.03;
  group.add(sack);
  group.add(cube(0.22 * scale, 0.07 * scale, 0.285 * scale, 0xd8b94f, 0, 0.22 * scale, 0.01));
  return group;
}

function createVegVisual(scale = 1) {
  const group = new THREE.Group();
  group.add(sphere(0.18 * scale, 0x54a956, 0, 0.16 * scale, 0));
  for (let index = 0; index < 4; index += 1) {
    const leaf = sphere(0.13 * scale, index % 2 ? 0x73be64 : 0x3f914d, Math.cos(index * Math.PI / 2) * 0.12 * scale, 0.23 * scale, Math.sin(index * Math.PI / 2) * 0.12 * scale);
    leaf.scale.z *= 0.7;
    group.add(leaf);
  }
  return group;
}

function createEggVisual(scale = 1) {
  const eggGeometry = new THREE.SphereGeometry(0.5, 9, 7);
  const egg = new THREE.Mesh(eggGeometry, material(0xffe7b0));
  egg.scale.set(0.22 * scale, 0.29 * scale, 0.22 * scale);
  egg.position.y = 0.25 * scale;
  egg.castShadow = true;
  return egg;
}

function createNasiVisual(scale = 1) {
  const group = new THREE.Group();
  const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.3 * scale, 0.32 * scale, 4), material(0x3d8c54));
  leaf.rotation.y = Math.PI / 4;
  leaf.position.y = 0.16 * scale;
  leaf.castShadow = true;
  group.add(leaf);
  group.add(sphere(0.07 * scale, 0xf7e7bc, 0, 0.31 * scale, 0));
  return group;
}

function createProductVisual(type, scale = 1) {
  if (type === "rice") return createRiceVisual(scale);
  if (type === "veg") return createVegVisual(scale);
  if (type === "egg") return createEggVisual(scale);
  return createNasiVisual(scale);
}

function createPaddyField() {
  const source = {
    id: "paddy",
    type: "rice",
    name: "Bendang Padi",
    position: new THREE.Vector3(-11.4, 0, -6.1),
    radius: 2.3,
    interval: 0.52,
    cooldown: 0,
    group: new THREE.Group(),
    nodes: [],
    unlockedKey: "paddy",
  };
  source.group.position.copy(source.position);
  world.add(source.group);
  source.group.add(cube(7, 0.11, 5.5, 0x78b86a, 0, 0.055, 0, { castShadow: false }));
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 6; col += 1) {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(-2.45 + col * 0.98 + (row % 2) * 0.12, 0.09, -1.75 + row * 1.1);
      for (let stemIndex = 0; stemIndex < 3; stemIndex += 1) {
        const stem = cube(0.045, 0.68 + stemIndex * 0.06, 0.045, 0xb4a748, (stemIndex - 1) * 0.1, 0.35, 0);
        stem.rotation.z = (stemIndex - 1) * 0.14;
        nodeGroup.add(stem);
        const grain = sphere(0.075, 0xe2c557, (stemIndex - 1) * 0.13, 0.72 + stemIndex * 0.05, 0);
        grain.scale.y *= 1.4;
        nodeGroup.add(grain);
      }
      source.group.add(nodeGroup);
      source.nodes.push({ group: nodeGroup, ready: true, regrow: 0, wobble: Math.random() * TAU });
    }
  }
  addLabel(source.group, "BENDANG PADI", "Hampiri untuk menuai", 2.35, { width: 4.3 });
  sources.rice = source;
  stationTargets.paddy = source.position.clone();
  return source;
}

function createVegetableGarden() {
  const source = {
    id: "garden",
    type: "veg",
    name: "Kebun Sayur",
    position: new THREE.Vector3(-12.2, 0, 1.55),
    radius: 2.15,
    interval: 0.56,
    cooldown: 0,
    group: new THREE.Group(),
    nodes: [],
    unlockedKey: "garden",
  };
  source.group.position.copy(source.position);
  world.add(source.group);
  source.group.add(cube(6.4, 0.13, 5.25, 0x7a5739, 0, 0.06, 0, { castShadow: false }));
  for (let lane = -1; lane <= 1; lane += 1) {
    source.group.add(cube(5.55, 0.1, 0.83, 0x9a6942, 0, 0.15, lane * 1.38, { castShadow: false }));
  }
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 6; col += 1) {
      const nodeGroup = createVegVisual(1.25);
      nodeGroup.position.set(-2.3 + col * 0.92, 0.15, -1.38 + row * 1.38);
      source.group.add(nodeGroup);
      source.nodes.push({ group: nodeGroup, ready: true, regrow: 0, wobble: Math.random() * TAU });
    }
  }
  for (const x of [-3.25, 3.25]) {
    source.group.add(cube(0.13, 0.7, 5.5, 0xb5824d, x, 0.35, 0));
  }
  addLabel(source.group, "KEBUN SAYUR", "Segar dari kebun", 2.15, { width: 4.2, background: "#4f8f4f" });
  source.group.visible = state.unlocked.garden;
  sources.veg = source;
  stationTargets.garden = source.position.clone();
  return source;
}

function createChicken(x, z, color = 0xf6eee0) {
  const chicken = new THREE.Group();
  chicken.position.set(x, 0, z);
  chicken.add(sphere(0.32, color, 0, 0.48, 0));
  chicken.add(sphere(0.21, color, 0.08, 0.77, -0.04));
  const beak = cone(0.08, 0.18, 0xe9a12e, 0.12, 0.75, -0.2);
  beak.rotation.x = Math.PI / 2;
  chicken.add(beak);
  chicken.add(sphere(0.035, 0x1b2c29, 0.13, 0.82, -0.17));
  chicken.add(cone(0.07, 0.18, 0xd94c39, 0.07, 1.0, -0.01));
  chicken.add(cube(0.035, 0.28, 0.035, 0xe0a436, -0.09, 0.18, 0));
  chicken.add(cube(0.035, 0.28, 0.035, 0xe0a436, 0.11, 0.18, 0));
  chicken.userData.phase = Math.random() * TAU;
  return chicken;
}

function createCoop() {
  const source = {
    id: "coop",
    type: "egg",
    name: "Reban Ayam",
    position: new THREE.Vector3(-10.2, 0, 8.2),
    radius: 2.15,
    interval: 0.6,
    cooldown: 0,
    group: new THREE.Group(),
    nodes: [],
    chickens: [],
    unlockedKey: "coop",
  };
  source.group.position.copy(source.position);
  world.add(source.group);
  source.group.add(cube(6.2, 0.1, 5.15, 0xa8ca75, 0, 0.05, 0, { castShadow: false }));
  const house = new THREE.Group();
  house.position.set(1.45, 0, 0.6);
  house.add(cube(2.25, 1.55, 2, 0xe69b50, 0, 1.05, 0));
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1.75, 0.8, 4), material(0xbf5039));
  roof.rotation.y = Math.PI / 4;
  roof.position.y = 2.12;
  roof.scale.z = 0.82;
  roof.castShadow = true;
  house.add(roof);
  house.add(cube(0.74, 1, 0.15, 0x71452f, 0, 0.7, -1.04));
  house.add(cube(0.68, 0.13, 1.8, 0x9a653c, -0.7, 0.32, -1.25));
  source.group.add(house);
  for (let index = 0; index < 4; index += 1) {
    const egg = createEggVisual(1.1);
    egg.position.set(-2 + (index % 2) * 0.65, 0.09, -0.5 + Math.floor(index / 2) * 0.7);
    source.group.add(egg);
    source.nodes.push({ group: egg, ready: true, regrow: 0, wobble: Math.random() * TAU });
  }
  const chickenOne = createChicken(-0.9, 1.05, 0xf7eee1);
  const chickenTwo = createChicken(-1.8, 1.45, 0xb86e42);
  source.group.add(chickenOne, chickenTwo);
  source.chickens.push(chickenOne, chickenTwo);
  for (let side = -1; side <= 1; side += 2) {
    for (let z = -2.4; z <= 2.4; z += 0.8) source.group.add(cube(0.08, 0.6, 0.08, 0xe7d29c, side * 3, 0.3, z));
    source.group.add(cube(0.12, 0.1, 5.2, 0xc99b5b, side * 3, 0.42, 0));
  }
  addLabel(source.group, "REBAN AYAM", "Telur kampung", 2.85, { width: 4.1, background: "#c0643f" });
  source.group.visible = state.unlocked.coop;
  sources.egg = source;
  stationTargets.coop = source.position.clone();
  return source;
}

function createShelf(id, type, name, position, unlockedKey) {
  const group = new THREE.Group();
  group.position.copy(position);
  world.add(group);
  const color = type === "rice" ? 0xd88a3d : type === "veg" ? 0x55945a : type === "egg" ? 0xdca643 : 0x39775a;
  group.add(cube(3.15, 0.18, 0.85, 0x73492f, 0, 0.13, 0));
  group.add(cube(3.15, 1.85, 0.18, color, 0, 1.02, 0.36));
  group.add(cube(0.18, 1.75, 0.86, 0x66422f, -1.49, 0.94, 0));
  group.add(cube(0.18, 1.75, 0.86, 0x66422f, 1.49, 0.94, 0));
  group.add(cube(3, 0.11, 0.82, 0x9a7047, 0, 0.72, 0));
  group.add(cube(3, 0.11, 0.82, 0x9a7047, 0, 1.3, 0));
  addLabel(group, name.toUpperCase(), `${PRODUCT[type].icon} ${PRODUCT[type].name}`, 2.25, { width: 3.4, background: type === "nasi" ? "#286a4c" : "#8d5b35" });
  const itemsGroup = new THREE.Group();
  group.add(itemsGroup);
  const shelf = {
    id,
    type,
    name,
    position: position.clone(),
    radius: 1.72,
    group,
    itemsGroup,
    stock: Math.max(0, Math.round(state.shelfStock[type] || 0)),
    transferCooldown: 0,
    unlockedKey,
  };
  group.visible = Boolean(state.unlocked[unlockedKey]);
  shelves[type] = shelf;
  stationTargets[id] = position.clone();
  addObstacle(position.x, position.z, 3.25, 0.9, () => state.unlocked[unlockedKey]);
  return shelf;
}

function shelfCapacity() {
  return 5 + state.shelfLevel * 2;
}

function carryCapacity() {
  return 5 + state.capacityLevel * 2;
}

function updateShelfVisual(shelf) {
  shelf.itemsGroup.clear();
  const visibleCount = Math.min(shelf.stock, 9);
  for (let index = 0; index < visibleCount; index += 1) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const visual = createProductVisual(shelf.type, shelf.type === "egg" ? 0.8 : 0.72);
    visual.position.set(-0.88 + col * 0.88, 0.82 + row * 0.57, -0.1);
    visual.rotation.y = (col - 1) * 0.08;
    shelf.itemsGroup.add(visual);
  }
}

function createCounter() {
  const counter = new THREE.Group();
  counter.position.set(8.7, 0, -3.55);
  world.add(counter);
  counter.add(cube(3.5, 1.25, 1.35, 0x196e5a, 0, 0.63, 0));
  counter.add(cube(3.72, 0.16, 1.5, 0xf0cf89, 0, 1.33, 0));
  counter.add(cube(0.65, 0.38, 0.5, 0x394b47, 0.55, 1.6, 0));
  counter.add(cube(0.46, 0.12, 0.42, 0xe9c94a, -0.5, 1.46, -0.02));
  addLabel(counter, "KAUNTER", "Bayaran automatik", 2.35, { width: 3.1, background: "#d2573d" });
  addObstacle(8.7, -3.55, 3.7, 1.5);
  stationTargets.counter = new THREE.Vector3(8.7, 0, -3.55);

  const registerTwo = new THREE.Group();
  registerTwo.position.set(1.2, 0, 0);
  registerTwo.add(cube(0.72, 0.4, 0.54, 0x304844, 0, 1.58, 0));
  registerTwo.add(cube(0.28, 0.08, 0.28, 0xffd85b, -0.18, 1.43, -0.03));
  counter.add(registerTwo);
  registerTwo.visible = state.unlocked.counter2;
  counter.userData.registerTwo = registerTwo;

  const cashGroup = new THREE.Group();
  cashGroup.position.set(10.25, 0.06, -5.0);
  world.add(cashGroup);
  const pad = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.12, 28), material(0xf3c348));
  pad.position.y = 0.08;
  pad.receiveShadow = true;
  cashGroup.add(pad);
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.76, 1.05, 32), new THREE.MeshBasicMaterial({ color: 0xffef9a, transparent: true, opacity: 0.72, side: THREE.DoubleSide }));
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.15;
  cashGroup.add(ring);
  const coinStack = new THREE.Group();
  cashGroup.add(coinStack);
  addLabel(cashGroup, "KUTIP JUALAN", "Wang di Kaunter", 1.8, { width: 3.25, background: "#ba7914" });
  cashStation = {
    position: cashGroup.position.clone(),
    radius: 1.3,
    group: cashGroup,
    ring,
    coinStack,
    cooldown: 0,
  };
  stationTargets.cash = cashGroup.position.clone();
}

function updateCashVisual() {
  if (!cashStation) return;
  cashStation.coinStack.clear();
  const count = Math.min(10, Math.ceil(state.pendingSales / 10));
  for (let index = 0; index < count; index += 1) {
    const coin = cylinder(0.16, 0.06, 0xf2bf38, (index % 3) * 0.12 - 0.12, 0.2 + Math.floor(index / 3) * 0.065, (index % 2) * 0.08 - 0.04, { roughness: 0.4, metalness: 0.25 });
    coin.rotation.x = Math.PI / 2;
    cashStation.coinStack.add(coin);
  }
  cashStation.group.visible = state.pendingSales > 0;
}

function createKitchen() {
  const group = new THREE.Group();
  group.position.set(5.6, 0, 9.25);
  world.add(group);
  group.add(cube(6.5, 0.12, 4.5, 0xe0c993, 0, 0.06, 0, { castShadow: false }));
  group.add(cube(5.7, 0.88, 1.45, 0x4d8b67, 0, 0.47, 0.4));
  group.add(cube(5.9, 0.14, 1.6, 0xf1d59b, 0, 0.98, 0.4));
  const stove = cylinder(0.75, 0.22, 0x384945, 0.7, 1.12, 0.35, { roughness: 0.42, metalness: 0.3 });
  group.add(stove);
  group.add(cylinder(0.64, 0.55, 0x6d7f79, 0.7, 1.39, 0.35, { roughness: 0.4, metalness: 0.25 }));
  group.add(cylinder(0.68, 0.09, 0x344844, 0.7, 1.72, 0.35, { roughness: 0.4, metalness: 0.35 }));
  const riceBin = new THREE.Group();
  riceBin.position.set(-1.75, 1.12, 0.35);
  riceBin.add(cube(0.95, 0.5, 0.8, 0xc98a45, 0, 0.25, 0));
  riceBin.add(createRiceVisual(0.75));
  group.add(riceBin);
  const eggBin = new THREE.Group();
  eggBin.position.set(-0.65, 1.12, 0.35);
  eggBin.add(cube(0.95, 0.25, 0.8, 0xbb7541, 0, 0.13, 0));
  const eggA = createEggVisual(0.65);
  eggA.position.set(-0.18, 0.18, 0);
  const eggB = createEggVisual(0.65);
  eggB.position.set(0.18, 0.18, 0);
  eggBin.add(eggA, eggB);
  group.add(eggBin);
  const output = new THREE.Group();
  output.position.set(2.05, 1.12, 0.35);
  group.add(output);
  const steam = [];
  for (let index = 0; index < 4; index += 1) {
    const puff = sphere(0.13 + index * 0.02, 0xffffff, 0.55 + (index % 2) * 0.25, 1.95 + index * 0.28, 0.35, { transparent: true, opacity: 0.52, castShadow: false });
    group.add(puff);
    steam.push(puff);
  }
  addLabel(group, "DAPUR NASI LEMAK", "Beras + Telur", 2.85, { width: 4.8, background: "#b8523b" });
  group.visible = state.unlocked.kitchen;
  kitchen = {
    position: group.position.clone(),
    radius: 2.15,
    group,
    outputGroup: output,
    rice: Math.max(0, Math.round(state.kitchen.rice || 0)),
    egg: Math.max(0, Math.round(state.kitchen.egg || 0)),
    output: Math.max(0, Math.round(state.kitchen.output || 0)),
    progress: Math.max(0, Number(state.kitchen.progress || 0)),
    cooldown: 0,
    steam,
  };
  stationTargets.kitchen = kitchen.position.clone();
  addObstacle(kitchen.position.x, kitchen.position.z + 0.35, 6, 1.65, () => state.unlocked.kitchen);
}

function updateKitchenVisual() {
  if (!kitchen) return;
  kitchen.outputGroup.clear();
  const count = Math.min(kitchen.output, 6);
  for (let index = 0; index < count; index += 1) {
    const packet = createNasiVisual(0.85);
    packet.position.set((index % 3) * 0.42 - 0.42, Math.floor(index / 3) * 0.34, 0);
    packet.rotation.y = (index % 3) * 0.25;
    kitchen.outputGroup.add(packet);
  }
}

function createZoneBase(position, color, title, subtitle, width = 3.4) {
  const group = new THREE.Group();
  group.position.copy(position);
  world.add(group);
  const pad = new THREE.Mesh(new THREE.CylinderGeometry(1.18, 1.28, 0.14, 28), material(color, { roughness: 0.68 }));
  pad.position.y = 0.08;
  pad.receiveShadow = true;
  group.add(pad);
  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xfff0a1, transparent: true, opacity: 0.72, side: THREE.DoubleSide, depthWrite: false });
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.84, 1.24, 36), ringMaterial);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.17;
  group.add(ring);
  const posts = new THREE.Group();
  for (let index = 0; index < 4; index += 1) {
    const angle = (index / 4) * TAU + Math.PI / 4;
    const post = cylinder(0.06, 0.7, 0xe8d39b, Math.cos(angle) * 1.12, 0.35, Math.sin(angle) * 1.12);
    posts.add(post);
  }
  group.add(posts);
  const label = addLabel(group, title, subtitle, 1.75, { width, background: color === 0xd36742 ? "#bd5438" : "#166f57" });
  return { group, pad, ring, posts, label };
}

function createUnlockZones() {
  const placements = {
    garden: new THREE.Vector3(-8.1, 0, 1.5),
    vegShelf: new THREE.Vector3(0.7, 0, -0.1),
    coop: new THREE.Vector3(-6.5, 0, 8.1),
    eggShelf: new THREE.Vector3(0.7, 0, 2.9),
    worker: new THREE.Vector3(12.3, 0, 7.7),
    kitchen: new THREE.Vector3(8.9, 0, 8.3),
    nasiShelf: new THREE.Vector3(5.1, 0, 3.4),
    counter2: new THREE.Vector3(9.7, 0, 0.25),
  };
  FACILITY_META.forEach((meta) => {
    const built = createZoneBase(placements[meta.id], 0xd36742, `BUKA ${meta.name.toUpperCase()}`, fmtRM(meta.cost), meta.name.length > 14 ? 4.4 : 3.7);
    const zone = {
      ...meta,
      ...built,
      type: "unlock",
      position: placements[meta.id].clone(),
      radius: 1.24,
      hold: 0,
      duration: 1.55,
      lockedUntilExit: false,
    };
    zone.group.visible = !state.unlocked[meta.id];
    unlockZones.push(zone);
    stationTargets[`unlock-${meta.id}`] = zone.position.clone();
  });
}

function upgradeCost(key) {
  const meta = UPGRADE_META[key];
  const level = state[meta.levelKey];
  return Math.round(meta.base * Math.pow(level + 1, 1.34));
}

function createUpgradePlaza() {
  const plaza = new THREE.Group();
  plaza.position.set(14.1, 0, 1.5);
  world.add(plaza);
  plaza.add(cube(4.8, 0.08, 9.3, 0xd8c999, 0, 0.04, 0, { castShadow: false }));
  addLabel(plaza, "PUSAT NAIK TARAF", "Tingkatkan perniagaan", 3.35, { width: 4.7, background: "#2c6c5b" });
  const placements = {
    speed: new THREE.Vector3(13.25, 0, -1.35),
    capacity: new THREE.Vector3(15.0, 0, 0.55),
    shelf: new THREE.Vector3(13.25, 0, 2.5),
    value: new THREE.Vector3(15.0, 0, 4.35),
  };
  Object.entries(UPGRADE_META).forEach(([key, meta]) => {
    const built = createZoneBase(placements[key], meta.color, meta.name.toUpperCase(), "NAIK TARAF", 3.45);
    const zone = {
      key,
      ...meta,
      ...built,
      type: "upgrade",
      position: placements[key].clone(),
      radius: 1.18,
      hold: 0,
      duration: 1.45,
      lockedUntilExit: false,
    };
    upgradeZones.push(zone);
    stationTargets[`upgrade-${key}`] = zone.position.clone();
  });
}

function createPlayerCharacter() {
  const group = new THREE.Group();
  group.position.set(state.player.x, 0, state.player.z);
  world.add(group);
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.48, 18), new THREE.MeshBasicMaterial({ color: 0x173d32, transparent: true, opacity: 0.18, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.025;
  group.add(shadow);
  const legs = new THREE.Group();
  const leftLeg = cylinder(0.11, 0.58, 0x294a4a, -0.17, 0.36, 0);
  const rightLeg = cylinder(0.11, 0.58, 0x294a4a, 0.17, 0.36, 0);
  legs.add(leftLeg, rightLeg);
  group.add(legs);
  const body = new THREE.Group();
  body.add(cylinder(0.38, 0.82, 0xe9573f, 0, 1.04, 0));
  body.add(cube(0.44, 0.65, 0.08, 0xffe8c4, 0, 1.02, -0.34));
  body.add(cube(0.5, 0.08, 0.1, 0x0b7459, 0, 1.28, -0.39));
  const armLeft = cylinder(0.095, 0.67, 0xc8875e, -0.43, 1.05, 0);
  armLeft.rotation.z = -0.18;
  const armRight = cylinder(0.095, 0.67, 0xc8875e, 0.43, 1.05, 0);
  armRight.rotation.z = 0.18;
  body.add(armLeft, armRight);
  group.add(body);
  const head = sphere(0.31, 0xc8875e, 0, 1.72, 0);
  group.add(head);
  const hair = sphere(0.32, 0x2e2824, 0, 1.86, 0.03);
  hair.scale.y *= 0.62;
  group.add(hair);
  const songkok = cylinder(0.26, 0.22, 0x182b2d, 0, 2.05, 0);
  songkok.scale.x = 0.92;
  group.add(songkok);
  const carryGroup = new THREE.Group();
  carryGroup.position.set(0, 1.05, 0.43);
  group.add(carryGroup);
  const arrow = cone(0.13, 0.28, 0xffdb55, 0, 2.55, 0, { emissive: 0xffc842, emissiveIntensity: 0.35 });
  arrow.rotation.z = Math.PI;
  group.add(arrow);
  group.userData = { body, legs, leftLeg, rightLeg, leftArm: armLeft, rightArm: armRight, carryGroup, arrow, moving: 0, facing: Math.PI };
  setGroupShadows(group);
  return group;
}

function updateCarryVisual(character, type, count, maxVisible = 7) {
  const carryGroup = character.userData.carryGroup;
  if (!carryGroup) return;
  carryGroup.clear();
  const visible = Math.min(count, maxVisible);
  for (let index = 0; index < visible; index += 1) {
    const product = createProductVisual(type, type === "egg" ? 0.72 : 0.68);
    product.position.set((index % 2) * 0.34 - 0.17, Math.floor(index / 2) * 0.3, 0);
    product.rotation.y = (index % 2 ? 1 : -1) * 0.12;
    carryGroup.add(product);
  }
}

function createTutorialBeacon() {
  const group = new THREE.Group();
  world.add(group);
  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffe05a, transparent: true, opacity: 0.78, side: THREE.DoubleSide, depthWrite: false });
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.85, 1.1, 32), ringMaterial);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.1;
  group.add(ring);
  const arrow = cone(0.28, 0.55, 0xffd43f, 0, 2.6, 0, { emissive: 0xffd43f, emissiveIntensity: 0.35 });
  arrow.rotation.z = Math.PI;
  group.add(arrow);
  group.userData = { ring, arrow };
  tutorialBeacon = group;
}

const SKIN_TONES = [0xf1c29b, 0xd79a70, 0xb87552, 0x8f5a3f, 0xe6b486];
const OUTFIT_COLORS = [0x4b8ead, 0xde6a57, 0x6b9a63, 0xe3a33e, 0x826aa6, 0x2e8c7b, 0xce5e88];

function createPerson(options = {}) {
  const variant = options.variant ?? Math.floor(Math.random() * 8);
  const skin = options.skin ?? SKIN_TONES[variant % SKIN_TONES.length];
  const outfit = options.outfit ?? OUTFIT_COLORS[variant % OUTFIT_COLORS.length];
  const group = new THREE.Group();
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.4, 16), new THREE.MeshBasicMaterial({ color: 0x173d32, transparent: true, opacity: 0.15, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.025;
  group.add(shadow);

  const leftLeg = cylinder(0.095, 0.5, variant % 3 === 0 ? 0xece1c7 : 0x314c52, -0.14, 0.3, 0);
  const rightLeg = cylinder(0.095, 0.5, variant % 3 === 0 ? 0xece1c7 : 0x314c52, 0.14, 0.3, 0);
  group.add(leftLeg, rightLeg);
  const body = cylinder(0.34, variant % 4 === 0 ? 0.93 : 0.76, outfit, 0, 0.96, 0);
  if (variant % 4 === 0) body.scale.y = 1.08;
  group.add(body);
  const leftArm = cylinder(0.08, 0.57, skin, -0.38, 1.0, 0);
  const rightArm = cylinder(0.08, 0.57, skin, 0.38, 1.0, 0);
  leftArm.rotation.z = -0.12;
  rightArm.rotation.z = 0.12;
  group.add(leftArm, rightArm);
  const head = sphere(0.275, skin, 0, 1.62, 0);
  group.add(head);

  if (variant % 5 === 0) {
    const scarf = sphere(0.31, variant % 2 ? 0xd95d72 : 0x3d886d, 0, 1.69, 0.03);
    scarf.scale.set(1, 1.16, 0.96);
    group.add(scarf);
    const face = sphere(0.225, skin, 0, 1.63, -0.13);
    face.scale.z = 0.62;
    group.add(face);
    const drape = cone(0.31, 0.48, variant % 2 ? 0xd95d72 : 0x3d886d, 0, 1.34, 0.1);
    drape.rotation.y = Math.PI / 4;
    group.add(drape);
  } else if (variant % 5 === 1) {
    const hair = sphere(0.29, 0x241f1c, 0, 1.76, 0.04);
    hair.scale.y *= 0.66;
    group.add(hair);
    const bun = sphere(0.14, 0x241f1c, 0, 1.9, 0.13);
    group.add(bun);
  } else if (variant % 5 === 2) {
    const hair = sphere(0.3, 0x2b211e, 0, 1.76, 0.04);
    hair.scale.y *= 0.52;
    group.add(hair);
    const cap = cylinder(0.245, 0.16, 0xf3eee3, 0, 1.93, 0);
    group.add(cap);
  } else if (variant % 5 === 3) {
    const hair = sphere(0.31, 0x18191a, 0, 1.77, 0.03);
    hair.scale.y *= 0.63;
    hair.rotation.z = 0.1;
    group.add(hair);
  } else {
    const hair = sphere(0.31, 0x4a2c22, 0, 1.76, 0.03);
    hair.scale.y *= 0.58;
    group.add(hair);
    for (let index = 0; index < 5; index += 1) {
      group.add(sphere(0.075, 0x4a2c22, -0.23 + index * 0.115, 1.82 + (index % 2) * 0.03, 0));
    }
  }

  const bag = new THREE.Group();
  bag.position.set(0.37, 0.9, 0.15);
  bag.add(cube(0.32, 0.4, 0.14, 0xe1b454, 0, 0, 0));
  bag.visible = false;
  group.add(bag);
  const thought = makeLabel("…", "", { width: 0.95, background: "rgba(255,255,255,.96)", border: "#e2d8bf", color: "#36564c" });
  thought.position.set(0, 2.45, 0);
  thought.visible = false;
  group.add(thought);
  group.userData = { leftLeg, rightLeg, leftArm, rightArm, body, bag, thought, phase: Math.random() * TAU, moving: 0 };
  setGroupShadows(group);
  return group;
}

function animateCharacter(group, speed, time, dt) {
  if (!group?.userData) return;
  const data = group.userData;
  data.moving = THREE.MathUtils.lerp(data.moving || 0, Math.min(1, speed / 3), 1 - Math.pow(0.001, dt));
  const phase = time * 9 + (data.phase || 0);
  const swing = Math.sin(phase) * 0.42 * data.moving;
  if (data.leftLeg) data.leftLeg.rotation.x = swing;
  if (data.rightLeg) data.rightLeg.rotation.x = -swing;
  if (data.leftArm) data.leftArm.rotation.x = -swing * 0.72;
  if (data.rightArm) data.rightArm.rotation.x = swing * 0.72;
  if (data.body) data.body.position.y = Math.abs(Math.sin(phase)) * 0.035 * data.moving;
}

function createCashier() {
  const cashier = createPerson({ variant: 5, outfit: 0xf0d9ac, skin: 0xc78861 });
  cashier.scale.setScalar(0.9);
  cashier.position.set(8.7, 0, -4.5);
  cashier.rotation.y = Math.PI;
  const apron = cube(0.42, 0.5, 0.06, 0x0e7359, 0, 1.0, -0.31);
  cashier.add(apron);
  const label = makeLabel("AINA", "JURUWANG", { width: 1.9, background: "#0b6c53" });
  label.position.set(0, 2.55, 0);
  cashier.add(label);
  world.add(cashier);
  return cashier;
}

const customers = [];
const customerQueue = [];
let customerSpawnTimer = 2.4;
let customerSerial = 0;
let cashierCharacter = null;

function customerGate() {
  return new THREE.Vector3(15.7, 0, -10.8);
}

function availableCustomerShelves() {
  return Object.values(shelves).filter((shelf) => state.unlocked[shelf.unlockedKey]);
}

function spawnCustomer(forceType = null) {
  if (!hasStarted || paused || customers.length >= (state.unlocked.counter2 ? 11 : 8)) return null;
  const possible = availableCustomerShelves();
  if (!possible.length) return null;
  let targetShelf = forceType ? shelves[forceType] : possible[Math.floor(Math.random() * possible.length)];
  if (!targetShelf || !state.unlocked[targetShelf.unlockedKey]) targetShelf = possible[0];
  const group = createPerson({ variant: customerSerial % 10 });
  customerSerial += 1;
  const gate = customerGate();
  group.position.copy(gate);
  group.position.x += (Math.random() - 0.5) * 0.7;
  world.add(group);
  const customer = {
    id: `customer-${customerSerial}`,
    group,
    state: "enter",
    targetShelf,
    target: new THREE.Vector3(11.8, 0, -6.4),
    speed: 2.15 + Math.random() * 0.35,
    patience: 8.5 + Math.random() * 4,
    service: 0,
    itemType: null,
    amount: 0,
    queueIndex: -1,
    time: 0,
    unhappy: false,
  };
  customers.push(customer);
  return customer;
}

function moveAgent(group, target, speed, dt) {
  const dx = target.x - group.position.x;
  const dz = target.z - group.position.z;
  const distance = Math.hypot(dx, dz);
  if (distance < 0.05) return { distance, speed: 0 };
  const step = Math.min(distance, speed * dt);
  group.position.x += (dx / distance) * step;
  group.position.z += (dz / distance) * step;
  const desired = Math.atan2(dx, dz);
  let delta = desired - group.rotation.y;
  delta = Math.atan2(Math.sin(delta), Math.cos(delta));
  group.rotation.y += delta * Math.min(1, dt * 10);
  return { distance, speed: step / Math.max(dt, 0.001) };
}

function setCustomerBag(customer, type) {
  const bag = customer.group.userData.bag;
  bag.clear();
  const product = createProductVisual(type, type === "egg" ? 0.72 : 0.63);
  product.position.set(0, 0, 0);
  bag.add(product);
  bag.visible = true;
}

function joinQueue(customer) {
  if (!customerQueue.includes(customer)) customerQueue.push(customer);
  customer.state = "queue";
}

function removeFromQueue(customer) {
  const index = customerQueue.indexOf(customer);
  if (index >= 0) customerQueue.splice(index, 1);
  customer.queueIndex = -1;
}

function removeCustomer(customer) {
  removeFromQueue(customer);
  const index = customers.indexOf(customer);
  if (index >= 0) customers.splice(index, 1);
  world.remove(customer.group);
}

function saleValue(type) {
  return Math.round(PRODUCT[type].price * (1 + state.valueLevel * 0.15));
}

function completeCustomerSale(customer) {
  const amount = saleValue(customer.itemType);
  customer.amount = amount;
  state.pendingSales += amount;
  state.totalSales += amount;
  state.reputation = Math.min(100, state.reputation + 0.5);
  spawnWorldText(`+${fmtRM(amount)} Jualan`, new THREE.Vector3(8.7, 2.4, -3.4), "money");
  spawnParticles(new THREE.Vector3(8.7, 1.5, -3.4), 0xf2c13e, 9, 0.8);
  sounds.sale();
  updateCashVisual();
  if (state.tutorialStep === 2) {
    state.tutorialSaleSeen = true;
    advanceTutorial(3);
  }
  removeFromQueue(customer);
  customer.state = "exit";
  customer.target.copy(customerGate());
  customer.group.userData.thought.visible = false;
  updateHUD();
  saveGame();
}

function updateCustomers(dt) {
  if (!hasStarted || paused) return;
  customerSpawnTimer -= dt;
  if (customerSpawnTimer <= 0) {
    spawnCustomer();
    const facilityBoost = Object.values(state.unlocked).filter(Boolean).length * 0.13;
    customerSpawnTimer = Math.max(3.25, 6.8 - facilityBoost) + Math.random() * 2.2;
  }

  customerQueue.forEach((customer, index) => {
    customer.queueIndex = index;
  });

  for (const customer of [...customers]) {
    customer.time += dt;
    let movementSpeed = 0;
    if (customer.state === "enter") {
      const waypoint = new THREE.Vector3(11.5, 0, -6.1);
      const moved = moveAgent(customer.group, waypoint, customer.speed, dt);
      movementSpeed = moved.speed;
      if (moved.distance < 0.25) {
        customer.state = "shelf";
        customer.target.set(customer.targetShelf.position.x + 0.2, 0, customer.targetShelf.position.z - 1.42);
      }
    } else if (customer.state === "shelf") {
      const moved = moveAgent(customer.group, customer.target, customer.speed, dt);
      movementSpeed = moved.speed;
      if (moved.distance < 0.3) {
        if (customer.targetShelf.stock > 0) {
          customer.targetShelf.stock -= 1;
          updateShelfVisual(customer.targetShelf);
          customer.itemType = customer.targetShelf.type;
          setCustomerBag(customer, customer.itemType);
          customer.group.userData.thought.visible = false;
          spawnParticles(customer.targetShelf.position.clone().add(new THREE.Vector3(0, 1.2, -0.6)), PRODUCT[customer.itemType].color, 5, 0.55);
          sounds.place();
          joinQueue(customer);
        } else {
          customer.state = "waitShelf";
          customer.group.userData.thought.visible = true;
        }
      }
    } else if (customer.state === "waitShelf") {
      customer.patience -= dt;
      customer.group.userData.thought.position.y = 2.42 + Math.sin(elapsed * 4 + customer.time) * 0.08;
      if (customer.targetShelf.stock > 0) {
        customer.targetShelf.stock -= 1;
        updateShelfVisual(customer.targetShelf);
        customer.itemType = customer.targetShelf.type;
        setCustomerBag(customer, customer.itemType);
        customer.group.userData.thought.visible = false;
        joinQueue(customer);
      } else if (customer.patience <= 0) {
        customer.unhappy = true;
        customer.state = "exit";
        customer.group.userData.thought.visible = false;
        customer.target.copy(customerGate());
        state.reputation = Math.max(0, state.reputation - 3);
        spawnWorldText("Rak kosong!", customer.group.position.clone().add(new THREE.Vector3(0, 2.25, 0)), "bad");
        showToast(`Pelanggan beredar — ${customer.targetShelf.name} kosong terlalu lama.`, "bad", "!", 2700);
        sounds.unhappy();
      }
    } else if (customer.state === "queue") {
      const index = Math.max(0, customerQueue.indexOf(customer));
      const laneOffset = state.unlocked.counter2 && index % 2 === 1 ? 0.7 : 0;
      const row = state.unlocked.counter2 ? Math.floor(index / 2) : index;
      const target = new THREE.Vector3(8.6 + laneOffset, 0, -1.65 + row * 1.0);
      const moved = moveAgent(customer.group, target, customer.speed * 0.9, dt);
      movementSpeed = moved.speed;
      if (index === 0 && moved.distance < 0.28) {
        customer.service += dt * (state.unlocked.counter2 ? 1.7 : 1);
        customer.group.userData.thought.visible = false;
        if (cashierCharacter?.userData?.rightArm) cashierCharacter.userData.rightArm.rotation.x = Math.sin(elapsed * 12) * 0.28;
        if (customer.service >= 1.55) completeCustomerSale(customer);
      }
    } else if (customer.state === "exit") {
      const moved = moveAgent(customer.group, customer.target, customer.speed * 1.08, dt);
      movementSpeed = moved.speed;
      if (moved.distance < 0.35) removeCustomer(customer);
    }
    animateCharacter(customer.group, movementSpeed, elapsed, dt);
  }
}

function createWorker() {
  const group = createPerson({ variant: 2, outfit: 0x2f82a5, skin: 0xa66d4d });
  group.position.set(12.2, 0, 7.6);
  const apron = cube(0.42, 0.48, 0.07, 0xf0d49b, 0, 1.0, -0.31);
  group.add(apron);
  const hatBrim = cylinder(0.36, 0.07, 0xe8c46c, 0, 1.97, 0);
  const hatTop = cylinder(0.23, 0.2, 0xd8aa49, 0, 2.08, 0);
  group.add(hatBrim, hatTop);
  const label = makeLabel("AMIR", "PEKERJA", { width: 1.85, background: "#2f7fa0" });
  label.position.set(0, 2.58, 0);
  group.add(label);
  world.add(group);
  const agent = {
    group,
    state: "toField",
    carry: 0,
    timer: 0,
    speed: 2.3,
    target: sources.rice.position.clone(),
  };
  group.visible = state.unlocked.worker;
  return agent;
}

function updateWorkerCarry() {
  if (!worker) return;
  updateCarryVisual(worker.group, "rice", worker.carry, 5);
}

function harvestNode(source) {
  const node = source.nodes.find((entry) => entry.ready);
  if (!node) return false;
  node.ready = false;
  node.regrow = source.type === "egg" ? 3.3 + Math.random() * 1.5 : 2.6 + Math.random() * 1.4;
  node.group.scale.set(0.12, 0.12, 0.12);
  return true;
}

function updateWorker(dt) {
  if (!worker || !state.unlocked.worker || paused || !hasStarted) return;
  let movementSpeed = 0;
  const riceShelf = shelves.rice;
  if (worker.state === "toField") {
    const target = sources.rice.position.clone().add(new THREE.Vector3(1.8, 0, 0));
    const moved = moveAgent(worker.group, target, worker.speed, dt);
    movementSpeed = moved.speed;
    if (moved.distance < 0.45) {
      worker.state = "harvest";
      worker.timer = 0;
    }
  } else if (worker.state === "harvest") {
    worker.timer -= dt;
    if (worker.timer <= 0) {
      if (worker.carry >= 4 || !harvestNode(sources.rice)) {
        if (worker.carry > 0) worker.state = "toShelf";
        else worker.timer = 0.65;
      } else {
        worker.carry += 1;
        worker.timer = 0.72;
        updateWorkerCarry();
        spawnParticles(worker.group.position.clone().add(new THREE.Vector3(0, 1, 0)), PRODUCT.rice.color, 3, 0.45);
      }
    }
  } else if (worker.state === "toShelf") {
    const target = riceShelf.position.clone().add(new THREE.Vector3(0, 0, -1.35));
    const moved = moveAgent(worker.group, target, worker.speed, dt);
    movementSpeed = moved.speed;
    if (moved.distance < 0.4) {
      worker.state = "stock";
      worker.timer = 0;
    }
  } else if (worker.state === "stock") {
    worker.timer -= dt;
    if (worker.timer <= 0) {
      if (worker.carry > 0 && riceShelf.stock < shelfCapacity()) {
        worker.carry -= 1;
        riceShelf.stock += 1;
        worker.timer = 0.35;
        updateShelfVisual(riceShelf);
        updateWorkerCarry();
        spawnParticles(riceShelf.position.clone().add(new THREE.Vector3(0, 1.1, -0.4)), PRODUCT.rice.color, 3, 0.4);
      } else if (worker.carry === 0) {
        worker.state = "toField";
      } else {
        worker.timer = 0.8;
      }
    }
  }
  animateCharacter(worker.group, movementSpeed, elapsed, dt);
}

function createMarketDecor() {
  const scooter = new THREE.Group();
  scooter.position.set(2.8, 0, -10.6);
  scooter.rotation.y = -0.22;
  for (const x of [-0.48, 0.48]) {
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.07, 7, 12), material(0x273331));
    wheel.rotation.y = Math.PI / 2;
    wheel.position.set(x, 0.31, 0);
    scooter.add(wheel);
  }
  scooter.add(cube(1.05, 0.18, 0.28, 0x3c8cac, 0, 0.55, 0));
  scooter.add(cube(0.45, 0.26, 0.32, 0x2b716f, 0.25, 0.75, 0));
  scooter.add(cube(0.18, 0.75, 0.18, 0x304742, 0.44, 0.9, 0));
  scooter.add(cube(0.55, 0.07, 0.08, 0x304742, 0.55, 1.24, 0));
  world.add(scooter);

  const umbrella = new THREE.Group();
  umbrella.position.set(-1.3, 0, 10.2);
  umbrella.add(cylinder(0.06, 2.3, 0xe7dcbd, 0, 1.15, 0));
  const canopy = new THREE.Mesh(new THREE.ConeGeometry(1.45, 0.58, 10, 1, true), material(0xf16543, { side: THREE.DoubleSide }));
  canopy.position.y = 2.32;
  umbrella.add(canopy);
  umbrella.add(cylinder(0.65, 0.11, 0x9c623a, 0, 0.75, 0));
  world.add(umbrella);
  createBench(0.1, 10.2, Math.PI / 2);

  const arch = new THREE.Group();
  arch.position.set(15.5, 0, -10.8);
  arch.add(cube(0.22, 2.5, 0.22, 0x0c6c53, -1.05, 1.25, 0));
  arch.add(cube(0.22, 2.5, 0.22, 0x0c6c53, 1.05, 1.25, 0));
  arch.add(cube(2.3, 0.23, 0.28, 0xf1b83d, 0, 2.42, 0));
  const archSign = makeLabel("MASUK", "Pelanggan", { width: 2.25, background: "#0d7057" });
  archSign.position.set(0, 2.82, 0);
  arch.add(archSign);
  world.add(arch);
}

function applyUnlockVisibility() {
  if (sources.veg) sources.veg.group.visible = state.unlocked.garden;
  if (sources.egg) sources.egg.group.visible = state.unlocked.coop;
  Object.values(shelves).forEach((shelf) => {
    shelf.group.visible = Boolean(state.unlocked[shelf.unlockedKey]);
  });
  if (kitchen) kitchen.group.visible = state.unlocked.kitchen;
  if (worker) worker.group.visible = state.unlocked.worker;
  if (cashierCharacter?.parent) {
    const counter = world.children.find((child) => child.userData?.registerTwo);
    if (counter) counter.userData.registerTwo.visible = state.unlocked.counter2;
  }
  unlockZones.forEach((zone) => {
    zone.group.visible = !state.unlocked[zone.id];
  });
}

function buildWorld() {
  setLoading(0.15, "Menanam padi dan sayur…");
  createGround();
  createShop();
  createPaddyField();
  createVegetableGarden();
  createCoop();
  setLoading(0.42, "Menyusun Rak dan Kaunter…");
  createShelf("riceShelf", "rice", "Rak Beras", new THREE.Vector3(0.4, 0, -3.8), "riceShelf");
  createShelf("vegShelf", "veg", "Rak Sayur", new THREE.Vector3(0.4, 0, -0.6), "vegShelf");
  createShelf("eggShelf", "egg", "Rak Telur", new THREE.Vector3(0.4, 0, 2.6), "eggShelf");
  createShelf("nasiShelf", "nasi", "Rak Nasi Lemak", new THREE.Vector3(5.25, 0, 3.4), "nasiShelf");
  Object.values(shelves).forEach((shelf) => {
    shelf.stock = Math.min(shelf.stock, shelfCapacity());
    updateShelfVisual(shelf);
  });
  createCounter();
  createKitchen();
  updateKitchenVisual();
  createUnlockZones();
  createUpgradePlaza();
  createMarketDecor();
  setLoading(0.7, "Memanggil pelanggan kejiranan…");
  cashierCharacter = createCashier();
  worker = createWorker();
  player = createPlayerCharacter();
  updateCarryVisual(player, state.inventory.type, state.inventory.count);
  createTutorialBeacon();
  applyUnlockVisibility();
  updateCashVisual();
  setLoading(0.95, "Kedai hampir dibuka…");
}

const TUTORIAL_STEPS = [
  {
    icon: "🌾",
    title: "Tuai 3 padi",
    copy: "Pergi ke Bendang Padi. Hampiri tanaman masak untuk menuai automatik.",
    target: "paddy",
  },
  {
    icon: "▤",
    title: "Isi Rak Beras",
    copy: "Bawa hasil ke Rak Beras. Stok akan dipindahkan secara automatik.",
    target: "riceShelf",
  },
  {
    icon: "🛒",
    title: "Tunggu pelanggan membeli",
    copy: "Pelanggan akan mengambil Beras, beratur dan membayar di Kaunter.",
    target: "counter",
  },
  {
    icon: "RM",
    title: "Kutip hasil Jualan",
    copy: "Pergi ke tapak kuning di belakang Kaunter untuk masukkan Wang ke dalam simpanan.",
    target: "cash",
  },
  {
    icon: "🥬",
    title: "Buka Kebun Sayur",
    copy: "Cari tapak Buka Kebun Sayur. Kekal di atasnya sehingga pembinaan selesai.",
    target: "unlock-garden",
  },
];

function advanceTutorial(nextStep) {
  if (nextStep <= state.tutorialStep) return;
  state.tutorialStep = Math.min(nextStep, TUTORIAL_STEPS.length);
  if (state.tutorialStep === 2) {
    customerSpawnTimer = Math.min(customerSpawnTimer, 0.8);
    showToast("Pelanggan pertama sedang menuju ke kedai.", "good", "🛒", 2800);
  } else if (state.tutorialStep === 3) {
    showToast("Bayaran menunggu untuk dikutip di belakang Kaunter.", "good", "RM", 2800);
  } else if (state.tutorialStep === TUTORIAL_STEPS.length) {
    showToast("Tutorial selesai — sekarang bina kedai impian anda!", "good", "★", 3800);
    spawnParticles(player.position.clone().add(new THREE.Vector3(0, 1.3, 0)), 0xffd451, 18, 1.2);
    sounds.unlockSound();
  } else {
    showToast("Bagus! Langkah baharu dibuka.", "good", "✓", 1800);
  }
  updateMissionUI();
  saveGame(true);
}

function getNextRecommendedFacility() {
  return FACILITY_META.find((meta) => !state.unlocked[meta.id] && meta.prereq.every((id) => state.unlocked[id])) || FACILITY_META.find((meta) => !state.unlocked[meta.id]) || null;
}

function tutorialProgress() {
  if (state.tutorialStep === 0) return Math.min(1, state.tutorialRiceHarvested / 3);
  if (state.tutorialStep === 1) return Math.min(1, state.tutorialRiceStocked / 3);
  if (state.tutorialStep === 2) return state.tutorialSaleSeen || state.pendingSales > 0 || state.totalSales > 0 ? 1 : 0;
  if (state.tutorialStep === 3) return state.pendingSales > 0 ? 0.3 : 0;
  if (state.tutorialStep === 4) return state.unlocked.garden ? 1 : 0;
  return 1;
}

function tutorialTarget() {
  if (state.tutorialStep < TUTORIAL_STEPS.length) {
    if (state.tutorialStep === 1 && state.inventory.type !== "rice" && state.inventory.count === 0 && state.tutorialRiceStocked < 3) return stationTargets.paddy;
    return stationTargets[TUTORIAL_STEPS[state.tutorialStep].target];
  }
  const next = getNextRecommendedFacility();
  return next ? stationTargets[`unlock-${next.id}`] : stationTargets.shop;
}

function updateMissionUI() {
  if (!player) return;
  if (state.tutorialStep < TUTORIAL_STEPS.length) {
    const step = TUTORIAL_STEPS[state.tutorialStep];
    ui.missionCard.classList.remove("is-complete");
    ui.missionKicker.textContent = `TUTORIAL · ${state.tutorialStep + 1}/${TUTORIAL_STEPS.length}`;
    ui.missionIcon.textContent = step.icon;
    ui.missionTitle.textContent = step.title;
    if (state.tutorialStep === 1 && state.inventory.type !== "rice" && state.inventory.count === 0 && state.tutorialRiceStocked < 3) {
      ui.missionCopy.textContent = "Bawaan kosong — tuai lagi Padi, kemudian kembali ke Rak Beras.";
    } else {
      ui.missionCopy.textContent = step.copy;
    }
    ui.missionFill.style.width = `${tutorialProgress() * 100}%`;
  } else {
    const next = getNextRecommendedFacility();
    ui.missionCard.classList.add("is-complete");
    ui.missionKicker.textContent = next ? "SASARAN KEDAI" : "KEDAI LENGKAP";
    ui.missionIcon.textContent = next?.icon || "★";
    ui.missionTitle.textContent = next ? `Buka ${next.name}` : "Semua kemudahan dibuka!";
    ui.missionCopy.textContent = next ? `${fmtRM(next.cost)} · ${next.copy}` : "Teruskan berniaga dan capai Naik Taraf tahap maksimum.";
    ui.missionFill.style.width = `${next ? Math.min(1, state.money / next.cost) * 100 : 100}%`;
  }
  const target = tutorialTarget();
  if (target) {
    const distance = Math.hypot(target.x - player.position.x, target.z - player.position.z);
    ui.missionDistance.textContent = distance < 1.5 ? "TIBA" : `${Math.ceil(distance)}m`;
  }
}

function updateTutorialBeacon() {
  if (!tutorialBeacon || !player) return;
  const target = tutorialTarget();
  if (!target) {
    tutorialBeacon.visible = false;
    return;
  }
  tutorialBeacon.visible = true;
  tutorialBeacon.position.lerp(target, 0.12);
  const pulse = 1 + Math.sin(elapsed * 4) * 0.13;
  tutorialBeacon.userData.ring.scale.setScalar(pulse);
  tutorialBeacon.userData.arrow.position.y = 2.45 + Math.sin(elapsed * 4.8) * 0.22;
  tutorialBeacon.userData.arrow.rotation.y += 0.018;
}

function facilityPrerequisitesMet(zone) {
  return zone.prereq.every((id) => state.unlocked[id]);
}

function updateFacilityUI() {
  const opened = Object.values(state.unlocked).filter(Boolean).length;
  const total = Object.keys(state.unlocked).length;
  ui.facilityCount.textContent = `${opened} / ${total} dibuka`;
  ui.pauseFacilities.textContent = `${opened} / ${total}`;
  ui.facilityList.replaceChildren();
  FACILITY_META.forEach((meta) => {
    const isOpen = state.unlocked[meta.id];
    const ready = meta.prereq.every((id) => state.unlocked[id]);
    const row = document.createElement("div");
    row.className = `facility-item ${isOpen ? "opened" : ready ? "ready" : "locked"}`;
    const icon = document.createElement("span");
    icon.textContent = meta.icon;
    const copy = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = meta.name;
    const sub = document.createElement("small");
    sub.textContent = isOpen ? meta.copy : ready ? `${fmtRM(meta.cost)} · Cari tapak Buka` : `Perlu ${meta.prereq.map((id) => FACILITY_META.find((item) => item.id === id)?.name || id).join(", ")}`;
    copy.append(name, sub);
    const status = document.createElement("em");
    status.className = "facility-state";
    status.textContent = isOpen ? "DIBUKA" : ready ? "TERSEDIA" : "DIKUNCI";
    row.append(icon, copy, status);
    ui.facilityList.appendChild(row);
  });
  ui.speedLevel.textContent = `Tahap ${state.speedLevel}`;
  ui.capacityLevel.textContent = `Tahap ${state.capacityLevel}`;
  ui.shelfLevel.textContent = `Tahap ${state.shelfLevel}`;
  ui.valueLevel.textContent = `Tahap ${state.valueLevel}`;
}

function updateHUD() {
  ui.money.textContent = Math.round(state.money).toLocaleString("ms-MY");
  ui.sales.textContent = fmtRM(state.pendingSales);
  ui.carry.textContent = `${state.inventory.count} / ${carryCapacity()}`;
  ui.day.textContent = Math.max(1, Math.floor(state.totalSales / 90) + 1);
  ui.pauseMoney.textContent = fmtRM(state.money);
  ui.pauseSales.textContent = fmtRM(state.totalSales);
  ui.soundIcon.textContent = state.sound ? "♪" : "×";
  ui.soundButton.setAttribute("aria-label", state.sound ? "Tutup bunyi" : "Buka bunyi");
  updateMissionUI();
}

function setContext(icon, title, copy, progress = 0, active = true) {
  ui.contextIcon.textContent = icon;
  ui.contextTitle.textContent = title;
  ui.contextCopy.textContent = copy;
  ui.contextFill.style.width = `${Math.min(1, Math.max(0, progress)) * 100}%`;
  ui.contextCard.classList.toggle("is-active", active);
}

function defaultContext() {
  setContext("✦", "Terokai kedai", window.innerWidth < MOBILE_BREAKPOINT ? "Gerak dengan kayu bedik. Semua tugas dibuat automatik." : "Gunakan WASD atau anak panah. Semua tugas dibuat automatik.", 0, false);
}

function showMilestone(title, copy) {
  ui.milestoneTitle.textContent = title;
  ui.milestoneCopy.textContent = copy;
  ui.milestone.classList.remove("is-hidden");
  ui.unlockFlash.classList.remove("flash");
  void ui.unlockFlash.offsetWidth;
  ui.unlockFlash.classList.add("flash");
  screenShake = 0.55;
  sounds.unlockSound();
  window.setTimeout(() => ui.milestone.classList.add("is-hidden"), 1750);
}

function unlockFacility(zone) {
  if (state.unlocked[zone.id] || state.money < zone.cost || !facilityPrerequisitesMet(zone)) return;
  state.money -= zone.cost;
  state.unlocked[zone.id] = true;
  zone.group.visible = false;
  applyUnlockVisibility();
  const facility = FACILITY_META.find((meta) => meta.id === zone.id);
  const position = zone.position.clone().add(new THREE.Vector3(0, 0.8, 0));
  spawnParticles(position, 0xffd451, 28, 1.4);
  spawnWorldText("DIBUKA!", position.clone().add(new THREE.Vector3(0, 1.3, 0)), "money");
  showMilestone(`${facility.name} Dibuka!`, facility.copy);
  if (zone.id === "garden" && state.tutorialStep === 4) advanceTutorial(5);
  if (zone.id === "worker") showToast("Amir mula menuai dan mengisi Rak Beras secara autonomi.", "good", "🧑‍🌾", 3900);
  if (zone.id === "kitchen") showToast("Bawa Beras dan Telur Kampung ke dapur untuk diproses.", "good", "🍳", 3900);
  if (zone.id === "counter2") showToast("Kaunter Ekspres mempercepat barisan pelanggan.", "good", "🧾", 3600);
  updateFacilityUI();
  updateHUD();
  saveGame(true);
}

function purchaseUpgrade(zone) {
  const level = state[zone.levelKey];
  if (level >= 5) return;
  const cost = upgradeCost(zone.key);
  if (state.money < cost) return;
  state.money -= cost;
  state[zone.levelKey] += 1;
  zone.lockedUntilExit = true;
  zone.hold = 0;
  if (zone.key === "shelf") Object.values(shelves).forEach(updateShelfVisual);
  if (zone.key === "capacity") updateCarryVisual(player, state.inventory.type, state.inventory.count);
  spawnParticles(zone.position.clone().add(new THREE.Vector3(0, 0.8, 0)), zone.color, 18, 1.05);
  spawnWorldText(`TAHAP ${state[zone.levelKey]}`, zone.position.clone().add(new THREE.Vector3(0, 1.9, 0)), "money");
  sounds.unlockSound();
  screenShake = 0.22;
  showToast(`${zone.name} kini Tahap ${state[zone.levelKey]}.`, "good", zone.icon, 2400);
  updateFacilityUI();
  updateHUD();
  saveGame(true);
}

function distanceTo(position) {
  return Math.hypot(player.position.x - position.x, player.position.z - position.z);
}

let activeZone = null;
let activeInteraction = null;

function handleZone(zone, dt) {
  const distance = distanceTo(zone.position);
  const inside = distance <= zone.radius;
  if (!inside) {
    zone.hold = 0;
    zone.lockedUntilExit = false;
    return false;
  }
  activeZone = zone;
  if (zone.type === "unlock") {
    if (!facilityPrerequisitesMet(zone)) {
      const names = zone.prereq.map((id) => FACILITY_META.find((meta) => meta.id === id)?.name || id).join(" dan ");
      setContext("🔒", `${zone.name} belum tersedia`, `Buka ${names} terlebih dahulu.`, 0);
      return true;
    }
    if (state.money < zone.cost) {
      setContext("RM", `Buka ${zone.name} · ${fmtRM(zone.cost)}`, `Perlu ${fmtRM(zone.cost - state.money)} lagi. Kutip Jualan di Kaunter.`, state.money / zone.cost);
      return true;
    }
    zone.hold += dt;
    const progress = zone.hold / zone.duration;
    setContext(zone.icon, `Membuka ${zone.name}…`, `Kekal di tapak · Kos ${fmtRM(zone.cost)}`, progress);
    if (progress >= 1) unlockFacility(zone);
    return true;
  }

  const level = state[zone.levelKey];
  if (level >= 5) {
    setContext("★", `${zone.name} maksimum`, "Tahap 5 telah dicapai.", 1);
    return true;
  }
  const cost = upgradeCost(zone.key);
  if (zone.lockedUntilExit) {
    setContext("✓", `${zone.name} dinaik taraf`, "Keluar dari tapak untuk Naik Taraf lagi.", 1);
    return true;
  }
  if (state.money < cost) {
    setContext(zone.icon, `${zone.name} · ${fmtRM(cost)}`, `Perlu ${fmtRM(cost - state.money)} lagi.`, state.money / cost);
    return true;
  }
  zone.hold += dt;
  const progress = zone.hold / zone.duration;
  setContext(zone.icon, `Naik Taraf ${zone.name}…`, `Tahap ${level} → ${level + 1} · ${fmtRM(cost)}`, progress);
  if (progress >= 1) purchaseUpgrade(zone);
  return true;
}

function handleSource(source, dt) {
  if (!state.unlocked[source.unlockedKey] || distanceTo(source.position) > source.radius) return false;
  const inventory = state.inventory;
  const capacity = carryCapacity();
  const available = source.nodes.filter((node) => node.ready).length;
  const requiredShelf = source.type === "veg" ? "vegShelf" : source.type === "egg" ? "eggShelf" : null;
  if (requiredShelf && !state.unlocked[requiredShelf]) {
    const shelfName = source.type === "veg" ? "Rak Sayur" : "Rak Telur";
    setContext("🔒", `${PRODUCT[source.type].name} belum boleh dibawa`, `Buka ${shelfName} dahulu supaya hasil tidak menyebabkan jalan buntu.`, 0);
    return true;
  }
  if (inventory.count > 0 && inventory.type !== source.type) {
    setContext(PRODUCT[source.type].icon, source.name, `Hantar ${PRODUCT[inventory.type].name} dahulu sebelum mengambil hasil lain.`, inventory.count / capacity);
    return true;
  }
  if (inventory.count >= capacity) {
    setContext("▦", "Kapasiti penuh", `Bawa ${PRODUCT[source.type].name} ke ${source.type === "rice" ? "Rak Beras" : source.type === "veg" ? "Rak Sayur" : "Rak Telur"}.`, 1);
    return true;
  }
  if (available <= 0) {
    setContext("◷", `${source.name} sedang tumbuh`, "Tunggu sebentar untuk hasil seterusnya.", 0.15);
    return true;
  }
  source.cooldown -= dt;
  if (source.cooldown <= 0 && harvestNode(source)) {
    inventory.type = source.type;
    inventory.count += 1;
    source.cooldown = Math.max(0.24, source.interval - state.speedLevel * 0.035);
    updateCarryVisual(player, inventory.type, inventory.count);
    spawnParticles(player.position.clone().add(new THREE.Vector3(0, 1.15, 0)), PRODUCT[source.type].color, 6, 0.65);
    spawnWorldText(`+1 ${PRODUCT[source.type].short}`, player.position.clone().add(new THREE.Vector3(0, 2.15, 0)));
    sounds.harvest();
    if (source.type === "rice" && state.tutorialStep === 0) {
      state.tutorialRiceHarvested += 1;
      if (state.tutorialRiceHarvested >= 3) advanceTutorial(1);
    }
    updateHUD();
  }
  setContext(PRODUCT[source.type].icon, `Menuai ${source.name}`, `${inventory.count} / ${capacity} dibawa · ${available} sedia`, inventory.count / capacity);
  return true;
}

function handleShelf(shelf, dt) {
  if (!state.unlocked[shelf.unlockedKey] || distanceTo(shelf.position) > shelf.radius) return false;
  const capacity = shelfCapacity();
  if (state.inventory.count === 0) {
    setContext(PRODUCT[shelf.type].icon, shelf.name, `Stok ${shelf.stock} / ${capacity} · Bawa ${PRODUCT[shelf.type].name} ke sini.`, shelf.stock / capacity);
    return true;
  }
  if (state.inventory.type !== shelf.type) {
    setContext("↗", "Rak tidak sepadan", `${PRODUCT[state.inventory.type].name} perlu dihantar ke Rak ${PRODUCT[state.inventory.type].short}.`, shelf.stock / capacity);
    return true;
  }
  if (shelf.stock >= capacity) {
    setContext("▤", `${shelf.name} penuh`, `Kapasiti Rak ${shelf.stock} / ${capacity}.`, 1);
    return true;
  }
  shelf.transferCooldown -= dt;
  if (shelf.transferCooldown <= 0) {
    state.inventory.count -= 1;
    shelf.stock += 1;
    shelf.transferCooldown = 0.22;
    if (state.inventory.count === 0) state.inventory.type = null;
    updateShelfVisual(shelf);
    updateCarryVisual(player, state.inventory.type, state.inventory.count);
    spawnParticles(shelf.position.clone().add(new THREE.Vector3(0, 1.2, -0.45)), PRODUCT[shelf.type].color, 4, 0.5);
    sounds.place();
    if (shelf.type === "rice" && state.tutorialStep === 1) {
      state.tutorialRiceStocked += 1;
      if (state.tutorialRiceStocked >= 3) advanceTutorial(2);
    }
    updateHUD();
  }
  setContext(PRODUCT[shelf.type].icon, `Mengisi ${shelf.name}`, `Stok ${shelf.stock} / ${capacity}`, shelf.stock / capacity);
  return true;
}

function handleKitchen(dt) {
  if (!state.unlocked.kitchen || distanceTo(kitchen.position) > kitchen.radius) return false;
  const inventory = state.inventory;
  const ingredientCapacity = 8 + state.shelfLevel;
  kitchen.cooldown -= dt;
  if (inventory.count > 0 && (inventory.type === "rice" || inventory.type === "egg")) {
    const key = inventory.type;
    if (kitchen[key] >= ingredientCapacity) {
      setContext(PRODUCT[key].icon, `Bekas ${PRODUCT[key].name} penuh`, `${kitchen[key]} / ${ingredientCapacity} di dapur.`, 1);
      return true;
    }
    if (kitchen.cooldown <= 0) {
      inventory.count -= 1;
      kitchen[key] += 1;
      kitchen.cooldown = 0.24;
      if (inventory.count === 0) inventory.type = null;
      updateCarryVisual(player, inventory.type, inventory.count);
      spawnParticles(kitchen.position.clone().add(new THREE.Vector3(0, 1.4, 0)), PRODUCT[key].color, 5, 0.55);
      sounds.place();
      updateHUD();
    }
    setContext("🍳", "Mengisi Dapur Nasi Lemak", `Beras ${kitchen.rice} · Telur ${kitchen.egg} · Siap ${kitchen.output}`, Math.min(kitchen.rice, kitchen.egg) / ingredientCapacity);
    return true;
  }
  if (!state.unlocked.nasiShelf && kitchen.output > 0 && inventory.count === 0) {
    setContext("🔒", "Nasi Lemak menunggu di dapur", `Buka Rak Nasi Lemak dahulu · ${kitchen.output} bungkus siap`, 0);
    return true;
  }
  if (state.unlocked.nasiShelf && (inventory.count === 0 || inventory.type === "nasi") && kitchen.output > 0 && inventory.count < carryCapacity()) {
    if (kitchen.cooldown <= 0 && inventory.count < carryCapacity()) {
      inventory.type = "nasi";
      inventory.count += 1;
      kitchen.output -= 1;
      kitchen.cooldown = 0.26;
      updateKitchenVisual();
      updateCarryVisual(player, inventory.type, inventory.count);
      spawnWorldText("+1 Nasi Lemak", player.position.clone().add(new THREE.Vector3(0, 2.1, 0)));
      sounds.harvest();
      updateHUD();
    }
    setContext("🍚", "Mengambil Nasi Lemak", `${inventory.count} / ${carryCapacity()} dibawa · ${kitchen.output} masih siap`, inventory.count / carryCapacity());
    return true;
  }
  if (inventory.type === "nasi") {
    setContext("🍚", "Nasi Lemak sedia dijual", "Bawa hidangan ke Rak Nasi Lemak.", inventory.count / carryCapacity());
    return true;
  }
  setContext("🍳", "Dapur Nasi Lemak", `Beras ${kitchen.rice} · Telur ${kitchen.egg} · Siap ${kitchen.output}`, kitchen.progress / 3.2);
  return true;
}

function handleCash(dt) {
  if (!cashStation || state.pendingSales <= 0 || distanceTo(cashStation.position) > cashStation.radius) {
    if (cashStation) cashStation.hold = 0;
    return false;
  }
  cashStation.hold = (cashStation.hold || 0) + dt;
  const progress = cashStation.hold / 0.55;
  setContext("RM", "Mengutip hasil Jualan…", `${fmtRM(state.pendingSales)} menunggu di Kaunter`, progress);
  if (progress >= 1) {
    const amount = state.pendingSales;
    state.money += amount;
    state.pendingSales = 0;
    cashStation.hold = 0;
    spawnWorldText(`+${fmtRM(amount)} Wang`, player.position.clone().add(new THREE.Vector3(0, 2.2, 0)), "money");
    spawnParticles(player.position.clone().add(new THREE.Vector3(0, 1.1, 0)), 0xf3c33d, 15, 0.9);
    sounds.cash();
    updateCashVisual();
    if (state.tutorialStep === 3) advanceTutorial(4);
    updateHUD();
    saveGame(true);
  }
  return true;
}

function handlePlayerInteractions(dt) {
  activeZone = null;
  activeInteraction = null;
  for (const zone of unlockZones) {
    if (!zone.group.visible) continue;
    if (handleZone(zone, dt)) {
      activeInteraction = zone;
      return;
    }
  }
  for (const zone of upgradeZones) {
    if (handleZone(zone, dt)) {
      activeInteraction = zone;
      return;
    }
  }
  if (handleCash(dt)) {
    activeInteraction = cashStation;
    return;
  }
  if (handleKitchen(dt)) {
    activeInteraction = kitchen;
    return;
  }
  const shelfList = Object.values(shelves).sort((a, b) => distanceTo(a.position) - distanceTo(b.position));
  for (const shelf of shelfList) {
    if (handleShelf(shelf, dt)) {
      activeInteraction = shelf;
      return;
    }
  }
  const sourceList = Object.values(sources).sort((a, b) => distanceTo(a.position) - distanceTo(b.position));
  for (const source of sourceList) {
    if (handleSource(source, dt)) {
      activeInteraction = source;
      return;
    }
  }
  defaultContext();
}

function updateSources(dt) {
  for (const source of Object.values(sources)) {
    if (!state.unlocked[source.unlockedKey]) continue;
    source.nodes.forEach((node, index) => {
      if (!node.ready) {
        node.regrow -= dt;
        const targetScale = node.regrow < 0.7 ? 1 : 0.12;
        node.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 1 - Math.pow(0.008, dt));
        if (node.regrow <= 0) {
          node.ready = true;
          node.group.scale.set(1, 1, 1);
          spawnParticles(source.position.clone().add(node.group.position).add(new THREE.Vector3(0, 0.45, 0)), PRODUCT[source.type].color, 2, 0.25);
        }
      } else if (source.type !== "egg") {
        node.group.rotation.z = Math.sin(elapsed * 1.45 + node.wobble + index * 0.13) * 0.025;
      }
    });
    if (source.chickens) {
      source.chickens.forEach((chicken, index) => {
        const phase = elapsed * (1.5 + index * 0.2) + chicken.userData.phase;
        chicken.position.x += Math.sin(phase * 0.7) * dt * 0.08;
        chicken.position.z += Math.cos(phase * 0.65) * dt * 0.07;
        chicken.rotation.y = Math.sin(phase * 0.45) * 1.5;
        chicken.position.y = Math.max(0, Math.sin(phase * 3) * 0.018);
      });
    }
  }
}

function updateKitchen(dt) {
  if (!kitchen || !state.unlocked.kitchen) return;
  const canCook = kitchen.rice > 0 && kitchen.egg > 0 && kitchen.output < 6 + state.shelfLevel;
  if (canCook) {
    kitchen.progress += dt;
    if (kitchen.progress >= 3.2) {
      kitchen.progress = 0;
      kitchen.rice -= 1;
      kitchen.egg -= 1;
      kitchen.output += 1;
      updateKitchenVisual();
      spawnParticles(kitchen.position.clone().add(new THREE.Vector3(0, 1.9, 0)), 0xffffff, 10, 0.65);
      spawnWorldText("Nasi Lemak siap!", kitchen.position.clone().add(new THREE.Vector3(0, 2.6, 0)));
      sounds.sale();
      showToast("Satu bungkus Nasi Lemak siap di dapur.", "good", "🍚", 2200);
      saveGame();
    }
  }
  kitchen.steam.forEach((puff, index) => {
    puff.visible = canCook;
    puff.position.y = 1.86 + ((elapsed * 0.52 + index * 0.24) % 1.15);
    puff.position.x = 0.65 + Math.sin(elapsed * 1.8 + index) * 0.18;
    const scale = 0.65 + ((elapsed * 0.52 + index * 0.24) % 1.15) * 0.42;
    puff.scale.setScalar(scale);
  });
}

function updateZones(dt) {
  [...unlockZones, ...upgradeZones].forEach((zone, index) => {
    if (!zone.group.visible) return;
    const near = player ? distanceTo(zone.position) : Infinity;
    zone.label.visible = zone.type === "unlock"
      ? facilityPrerequisitesMet(zone) || near < 4.2
      : near < 5.4;
    const pulse = 1 + Math.sin(elapsed * 3.1 + index * 0.55) * 0.08;
    zone.ring.scale.setScalar(pulse);
    zone.ring.material.opacity = 0.48 + Math.sin(elapsed * 3 + index) * 0.2;
    zone.group.children.forEach((child) => {
      if (child.isSprite) child.position.y = 1.76 + Math.sin(elapsed * 2.5 + index * 0.4) * 0.08;
    });
  });
  if (cashStation?.group.visible) {
    cashStation.ring.scale.setScalar(1 + Math.sin(elapsed * 4) * 0.1);
    cashStation.ring.material.opacity = 0.55 + Math.sin(elapsed * 4.5) * 0.18;
  }
}

function updateParticles(dt) {
  for (let index = particles.length - 1; index >= 0; index -= 1) {
    const particle = particles[index];
    particle.age += dt;
    particle.velocity.y -= 5.4 * dt;
    particle.mesh.position.addScaledVector(particle.velocity, dt);
    particle.mesh.rotation.x += particle.spin * dt;
    particle.mesh.rotation.z -= particle.spin * 0.7 * dt;
    const remaining = 1 - particle.age / particle.life;
    particle.mesh.scale.multiplyScalar(Math.max(0.85, remaining));
    if (particle.age >= particle.life) {
      scene.remove(particle.mesh);
      particles.splice(index, 1);
    }
  }
}

function updateWorldPops(dt) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  for (let index = worldPops.length - 1; index >= 0; index -= 1) {
    const pop = worldPops[index];
    pop.age += dt;
    pop.position.y += dt * 0.75;
    const projected = pop.position.clone().project(camera);
    const x = (projected.x * 0.5 + 0.5) * width;
    const y = (-projected.y * 0.5 + 0.5) * height;
    const progress = pop.age / pop.life;
    pop.element.style.left = `${x}px`;
    pop.element.style.top = `${y}px`;
    pop.element.style.opacity = `${Math.min(1, (1 - progress) * 2.2)}`;
    pop.element.style.transform = `translate(-50%, -50%) scale(${0.85 + Math.min(1, progress * 4) * 0.15})`;
    if (pop.age >= pop.life || projected.z > 1) {
      pop.element.remove();
      worldPops.splice(index, 1);
    }
  }
}

const keys = new Set();
const input = {
  joystickActive: false,
  joystickPointer: null,
  joystickX: 0,
  joystickY: 0,
};

function resetJoystick() {
  input.joystickActive = false;
  input.joystickPointer = null;
  input.joystickX = 0;
  input.joystickY = 0;
  ui.joystickKnob.style.transform = "translate(0px, 0px)";
}

function updateJoystickFromPointer(event) {
  const rect = ui.joystick.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dx = event.clientX - centerX;
  const dy = event.clientY - centerY;
  const max = rect.width * 0.29;
  const distance = Math.hypot(dx, dy);
  const scale = distance > max ? max / distance : 1;
  const clampedX = dx * scale;
  const clampedY = dy * scale;
  input.joystickX = clampedX / max;
  input.joystickY = -clampedY / max;
  ui.joystickKnob.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
}

ui.joystick.addEventListener("pointerdown", (event) => {
  if (!hasStarted || paused) return;
  sounds.unlock();
  input.joystickActive = true;
  input.joystickPointer = event.pointerId;
  ui.joystick.setPointerCapture(event.pointerId);
  updateJoystickFromPointer(event);
});

ui.joystick.addEventListener("pointermove", (event) => {
  if (!input.joystickActive || event.pointerId !== input.joystickPointer) return;
  updateJoystickFromPointer(event);
});

ui.joystick.addEventListener("pointerup", (event) => {
  if (event.pointerId === input.joystickPointer) resetJoystick();
});
ui.joystick.addEventListener("pointercancel", resetJoystick);

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
    event.preventDefault();
    keys.add(key);
    sounds.unlock();
  }
  if (key === "escape" && hasStarted) {
    event.preventDefault();
    if (!ui.progress.classList.contains("is-hidden")) closeProgress();
    else togglePause();
  }
  if (key === "p" && hasStarted) togglePause();
});

window.addEventListener("keyup", (event) => keys.delete(event.key.toLowerCase()));
window.addEventListener("blur", () => keys.clear());

function getInputVector() {
  let horizontal = input.joystickX;
  let vertical = input.joystickY;
  if (keys.has("a") || keys.has("arrowleft")) horizontal -= 1;
  if (keys.has("d") || keys.has("arrowright")) horizontal += 1;
  if (keys.has("w") || keys.has("arrowup")) vertical += 1;
  if (keys.has("s") || keys.has("arrowdown")) vertical -= 1;
  const length = Math.hypot(horizontal, vertical);
  if (length > 1) {
    horizontal /= length;
    vertical /= length;
  }
  return { horizontal, vertical, length: Math.min(1, length) };
}

function collidesAt(x, z) {
  const radius = 0.34;
  return obstacles.some((obstacle) => {
    if (!obstacle.active()) return false;
    return Math.abs(x - obstacle.x) < obstacle.width / 2 + radius && Math.abs(z - obstacle.z) < obstacle.depth / 2 + radius;
  });
}

function updatePlayer(dt) {
  if (!player || paused || !hasStarted) return;
  const controls = getInputVector();
  const forward = new THREE.Vector3();
  camera.getWorldDirection(forward);
  forward.y = 0;
  forward.normalize();
  const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
  const movement = right.multiplyScalar(controls.horizontal).add(forward.multiplyScalar(controls.vertical));
  if (movement.lengthSq() > 1) movement.normalize();
  const speed = 4.25 + state.speedLevel * 0.55;
  const stepX = movement.x * speed * dt;
  const stepZ = movement.z * speed * dt;
  const nextX = THREE.MathUtils.clamp(player.position.x + stepX, -20.5, 19.5);
  const nextZ = THREE.MathUtils.clamp(player.position.z + stepZ, -12.4, 15.8);
  const escapingObstacle = collidesAt(player.position.x, player.position.z);
  if (escapingObstacle || !collidesAt(nextX, player.position.z)) player.position.x = nextX;
  if (escapingObstacle || !collidesAt(player.position.x, nextZ)) player.position.z = nextZ;
  const actualSpeed = movement.length() * speed;
  if (movement.lengthSq() > 0.001) {
    const desired = Math.atan2(movement.x, movement.z);
    let delta = desired - player.rotation.y;
    delta = Math.atan2(Math.sin(delta), Math.cos(delta));
    player.rotation.y += delta * Math.min(1, dt * 12);
  }
  animateCharacter(player, actualSpeed, elapsed, dt);
  if (player.userData.arrow) player.userData.arrow.position.y = 2.48 + Math.sin(elapsed * 4) * 0.1;
  handlePlayerInteractions(dt);
}

function updateCamera(dt) {
  if (!player) return;
  const mobile = window.innerWidth < MOBILE_BREAKPOINT;
  const desiredLook = new THREE.Vector3(
    THREE.MathUtils.clamp(player.position.x * (mobile ? 0.75 : 0.48), -8.5, 9.5),
    0,
    THREE.MathUtils.clamp(player.position.z * (mobile ? 0.74 : 0.5), -6.8, 8.5),
  );
  cameraLook.lerp(desiredLook, 1 - Math.pow(0.025, dt));
  const shakeX = screenShake > 0 ? (Math.random() - 0.5) * screenShake * 0.28 : 0;
  const shakeZ = screenShake > 0 ? (Math.random() - 0.5) * screenShake * 0.28 : 0;
  camera.position.copy(cameraLook).add(cameraOffset).add(new THREE.Vector3(shakeX, 0, shakeZ));
  camera.lookAt(cameraLook);
  screenShake = Math.max(0, screenShake - dt * 1.5);
}

function resizeRenderer() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspect = width / Math.max(1, height);
  const mobile = width < MOBILE_BREAKPOINT;
  const portrait = aspect < 0.78;
  const view = mobile ? (portrait ? 11.6 : 10.5) : 13.6;
  camera.left = -view * aspect;
  camera.right = view * aspect;
  camera.top = view;
  camera.bottom = -view;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.45 : 1.8));
  renderer.setSize(width, height, false);
}

window.addEventListener("resize", resizeRenderer);

let progressWasPaused = false;

function openProgress() {
  if (!hasStarted) return;
  progressWasPaused = paused;
  paused = true;
  resetJoystick();
  updateFacilityUI();
  ui.progress.classList.remove("is-hidden");
}

function closeProgress() {
  ui.progress.classList.add("is-hidden");
  paused = progressWasPaused;
}

function togglePause(force) {
  if (!hasStarted || !worldReady) return;
  const shouldPause = typeof force === "boolean" ? force : !paused;
  paused = shouldPause;
  resetJoystick();
  ui.pause.classList.toggle("is-hidden", !paused);
  if (paused) {
    updateFacilityUI();
    updateHUD();
    saveGame(true);
  }
}

$("start-button").addEventListener("click", () => {
  sounds.unlock();
  hasStarted = true;
  paused = false;
  ui.intro.classList.add("is-hidden");
  showToast("Kedai dibuka! Ikut tutorial di sebelah kiri.", "good", "★", 3200);
  if (state.tutorialStep === 2) customerSpawnTimer = 0.7;
});

$("pause-button").addEventListener("click", () => togglePause(true));
$("resume-button").addEventListener("click", () => togglePause(false));
$("progress-button").addEventListener("click", openProgress);
$("progress-backdrop").addEventListener("click", closeProgress);
$("close-progress").addEventListener("click", closeProgress);

ui.soundButton.addEventListener("click", () => {
  state.sound = !state.sound;
  if (state.sound) {
    sounds.unlock();
    sounds.tone(620, 0.12, "sine", 0.12, 120);
    showToast("Bunyi permainan dibuka.", "good", "♪", 1500);
  } else {
    showToast("Bunyi permainan ditutup.", "good", "×", 1500);
  }
  updateHUD();
  saveGame(true);
});

let restartConfirmTimer = null;
ui.restartButton.addEventListener("click", () => {
  if (!ui.restartButton.dataset.confirm) {
    ui.restartButton.dataset.confirm = "true";
    ui.restartButton.textContent = "Tekan lagi untuk sahkan Mula Semula";
    clearTimeout(restartConfirmTimer);
    restartConfirmTimer = window.setTimeout(() => {
      delete ui.restartButton.dataset.confirm;
      ui.restartButton.textContent = "Mula Semula";
    }, 3500);
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden && hasStarted && !paused) togglePause(true);
});

function updateDecor(dt) {
  if (cashierCharacter) {
    cashierCharacter.position.y = Math.sin(elapsed * 2.4) * 0.012;
    animateCharacter(cashierCharacter, 0, elapsed, dt);
  }
  sun.position.x = -14 + Math.sin(elapsed * 0.035) * 2;
}

function gameLoop(now) {
  requestAnimationFrame(gameLoop);
  const dt = Math.min(0.05, Math.max(0.001, (now - (gameLoop.lastNow || now)) / 1000));
  gameLoop.lastNow = now;
  elapsed += dt;

  if (!paused && hasStarted) {
    updatePlayer(dt);
    updateSources(dt);
    updateKitchen(dt);
    updateCustomers(dt);
    updateWorker(dt);
    updateZones(dt);
    updateTutorialBeacon();
    updateHUD();
    saveGame();
  } else {
    updateZones(dt);
    updateTutorialBeacon();
  }
  updateParticles(dt);
  updateWorldPops(dt);
  updateDecor(dt);
  updateCamera(dt);
  renderer.render(scene, camera);
}

function exposeDebugAPI() {
  if (!(location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.search.includes("debug=1"))) return;
  window.__KEDAI_DEBUG__ = {
    snapshot() {
      return {
        money: state.money,
        pendingSales: state.pendingSales,
        totalSales: state.totalSales,
        inventory: { ...state.inventory },
        unlocked: { ...state.unlocked },
        shelves: Object.fromEntries(Object.entries(shelves).map(([key, shelf]) => [key, shelf.stock])),
        kitchen: kitchen ? { rice: kitchen.rice, egg: kitchen.egg, output: kitchen.output, progress: kitchen.progress } : null,
        customers: customers.map((customer) => ({ state: customer.state, target: customer.targetShelf.type, item: customer.itemType, patience: customer.patience })),
        worker: worker ? { state: worker.state, carry: worker.carry, visible: worker.group.visible } : null,
        tutorialStep: state.tutorialStep,
        paused,
        started: hasStarted,
        player: player ? { x: player.position.x, z: player.position.z } : null,
      };
    },
    start() {
      hasStarted = true;
      paused = false;
      ui.intro.classList.add("is-hidden");
    },
    teleport(x, z) {
      player.position.set(x, 0, z);
    },
    addMoney(amount = 500) {
      state.money += amount;
      updateHUD();
    },
    setInventory(type, count) {
      state.inventory.type = count > 0 ? type : null;
      state.inventory.count = Math.max(0, Math.round(count));
      updateCarryVisual(player, state.inventory.type, state.inventory.count);
      updateHUD();
    },
    setShelf(type, count) {
      shelves[type].stock = Math.max(0, Math.min(shelfCapacity(), Math.round(count)));
      updateShelfVisual(shelves[type]);
    },
    spawnCustomer(type = "rice") {
      return spawnCustomer(type)?.id || null;
    },
    unlock(id) {
      state.unlocked[id] = true;
      applyUnlockVisibility();
      updateFacilityUI();
    },
    clearSave() {
      localStorage.removeItem(STORAGE_KEY);
    },
    save() {
      saveGame(true);
    },
  };
}

function reconcileSavedTutorial() {
  if (state.tutorialStep === 0 && state.tutorialRiceHarvested >= 3) state.tutorialStep = 1;
  if (state.tutorialStep === 1 && state.tutorialRiceStocked >= 3) state.tutorialStep = 2;
  if (state.tutorialStep === 2 && (state.tutorialSaleSeen || state.pendingSales > 0 || state.totalSales > 0)) state.tutorialStep = 3;
  if (state.tutorialStep === 3 && state.pendingSales === 0 && state.totalSales > 0) state.tutorialStep = 4;
  if (state.tutorialStep === 4 && state.unlocked.garden) state.tutorialStep = 5;
}

function waitForTest(predicate, timeout = 12000, label = "syarat") {
  const started = performance.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      if (predicate()) {
        resolve();
        return;
      }
      if (performance.now() - started > timeout) {
        reject(new Error(`Masa tamat menunggu ${label}`));
        return;
      }
      window.setTimeout(check, 80);
    };
    check();
  });
}

async function runCoreAutotest() {
  const output = document.createElement("output");
  output.id = "kedai-autotest-output";
  output.dataset.status = "running";
  output.style.cssText = "position:fixed;right:8px;bottom:8px;z-index:9999;max-width:420px;padding:8px;background:#082;color:#fff;font:11px monospace;opacity:.01;pointer-events:none";
  document.body.appendChild(output);
  const checks = [];
  const mark = (name, data = true) => {
    checks.push({ name, data });
    output.textContent = JSON.stringify({ status: "running", checks });
  };
  try {
    hasStarted = true;
    paused = false;
    ui.intro.classList.add("is-hidden");
    state.sound = false;

    player.position.copy(sources.rice.position).add(new THREE.Vector3(1.7, 0, 0));
    await waitForTest(() => state.inventory.type === "rice" && state.inventory.count >= 3, 7000, "tuai padi");
    mark("tuai", { type: state.inventory.type, count: state.inventory.count });

    player.position.copy(shelves.rice.position).add(new THREE.Vector3(0, 0, -1.35));
    await waitForTest(() => shelves.rice.stock >= 3, 5000, "isi rak");
    mark("isi-rak", shelves.rice.stock);

    customerSpawnTimer = 999;
    spawnCustomer("rice");
    await waitForTest(() => state.pendingSales > 0, 18000, "pelanggan membayar");
    const paid = state.pendingSales;
    mark("pelanggan-bayar", paid);

    player.position.copy(cashStation.position);
    await waitForTest(() => state.pendingSales === 0 && state.money > 8, 3500, "kutip jualan");
    mark("kutip-wang", state.money);

    state.money += 250;
    const gardenZone = unlockZones.find((zone) => zone.id === "garden");
    player.position.copy(gardenZone.position);
    await waitForTest(() => state.unlocked.garden, 4500, "buka kebun");
    mark("buka-kemudahan", state.unlocked.garden);

    state.inventory.type = null;
    state.inventory.count = 0;
    player.position.copy(sources.veg.position);
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    if (state.inventory.count !== 0) throw new Error("Sayur boleh dituai sebelum Rak Sayur dibuka");
    mark("pelindung-jalan-buntu-sayur", true);

    state.unlocked.worker = true;
    applyUnlockVisibility();
    shelves.rice.stock = 0;
    updateShelfVisual(shelves.rice);
    worker.group.position.copy(sources.rice.position).add(new THREE.Vector3(1.7, 0, 0));
    worker.state = "harvest";
    worker.timer = 0;
    worker.carry = 0;
    await waitForTest(() => shelves.rice.stock > 0, 16000, "pekerja autonomi");
    mark("pekerja-autonomi", { state: worker.state, shelf: shelves.rice.stock });

    Object.assign(state.unlocked, { coop: true, eggShelf: true, kitchen: true, nasiShelf: false });
    applyUnlockVisibility();
    state.inventory.type = "rice";
    state.inventory.count = 2;
    updateCarryVisual(player, "rice", 2);
    player.position.copy(kitchen.position).add(new THREE.Vector3(0, 0, -1.75));
    await waitForTest(() => kitchen.rice >= 2 && state.inventory.count === 0, 4000, "beras ke dapur");
    state.inventory.type = "egg";
    state.inventory.count = 2;
    updateCarryVisual(player, "egg", 2);
    await waitForTest(() => kitchen.egg >= 2 && state.inventory.count === 0, 4000, "telur ke dapur");
    await waitForTest(() => kitchen.output > 0, 7000, "proses nasi lemak");
    if (state.inventory.count !== 0) throw new Error("Nasi Lemak diambil sebelum Rak Nasi Lemak dibuka");
    mark("pelindung-jalan-buntu-nasi", kitchen.output);
    state.unlocked.nasiShelf = true;
    applyUnlockVisibility();
    await waitForTest(() => state.inventory.type === "nasi" && state.inventory.count > 0, 3000, "ambil nasi lemak");
    mark("dapur-proses", { rice: kitchen.rice, egg: kitchen.egg, carried: state.inventory.count });

    player.position.copy(shelves.nasi.position).add(new THREE.Vector3(0, 0, -1.35));
    await waitForTest(() => shelves.nasi.stock > 0, 4000, "isi rak nasi lemak");
    mark("nasi-lemak-ke-rak", shelves.nasi.stock);

    saveGame(true);
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved || saved.money !== state.money || !saved.unlocked.kitchen) throw new Error("Simpanan localStorage tidak sepadan");
    mark("localStorage", true);

    output.dataset.status = "passed";
    output.textContent = JSON.stringify({ status: "passed", checks, paid, finalMoney: state.money });
  } catch (error) {
    console.error("Ujian automatik Kedai Saya gagal", error);
    output.dataset.status = "failed";
    output.textContent = JSON.stringify({ status: "failed", checks, error: error.message });
  }
}

try {
  buildWorld();
  resizeRenderer();
  reconcileSavedTutorial();
  updateFacilityUI();
  updateHUD();
  defaultContext();
  exposeDebugAPI();
  worldReady = true;
  setLoading(1, "Kedai sedia dibuka!");
  window.setTimeout(() => {
    ui.loading.classList.add("is-ready");
    ui.intro.classList.remove("is-hidden");
    if (AUTOTEST_MODE) runCoreAutotest();
  }, 450);
  requestAnimationFrame(gameLoop);
} catch (error) {
  console.error(error);
  ui.loadingCopy.textContent = "Dunia 3D tidak dapat dimuatkan. Muat semula halaman untuk mencuba lagi.";
  ui.loadingFill.style.background = "#ef7a68";
}
