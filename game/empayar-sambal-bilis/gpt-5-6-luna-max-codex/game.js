import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const SAVE_KEY = "empayar-sambal-bilis-gpt5-6-sol-ultra-v1";
const TAU = Math.PI * 2;
const WORLD_LIMITS = { x: [-17.5, 17.5], z: [-12.5, 12.5] };
const MOBILE_BREAKPOINT = 720;

const PRODUCT = {
  CILI: { name: "Cili segar", short: "Cili", icon: "🌶", color: 0xe5563f, category: "bahan" },
  BILIS: { name: "Bilis", short: "Bilis", icon: "🐟", color: 0x4d91a4, category: "bahan" },
  PETAI: { name: "Petai", short: "Petai", icon: "🫘", color: 0x6c9b48, category: "bahan" },
  BAWANG: { name: "Bawang", short: "Bawang", icon: "🧅", color: 0xd99b63, category: "bahan" },
  CILI_KERING: { name: "Cili kering", short: "Cili kering", icon: "🌶", color: 0xa93c38, category: "bahan" },
  PES_CILI: { name: "Pes cili", short: "Pes cili", icon: "🥣", color: 0xc74235, category: "proses" },
  SAMBAL_KLASIK: { name: "Sambal klasik", short: "Sambal klasik", icon: "🍲", color: 0xd44835, category: "proses" },
  BALANG_KLASIK: { name: "Balang klasik", short: "Balang klasik", icon: "🫙", color: 0xd95942, category: "produk", price: 5 },
  SAMBAL_PETAI: { name: "Sambal petai", short: "Sambal petai", icon: "🍲", color: 0x657f41, category: "proses" },
  BALANG_PETAI: { name: "Balang petai", short: "Balang petai", icon: "🫙", color: 0x6e9849, category: "produk", price: 9 },
  SAMBAL_GARING: { name: "Sambal garing", short: "Sambal garing", icon: "🍱", color: 0xd7833a, category: "proses" },
  PEK_GARING: { name: "Pek garing", short: "Pek garing", icon: "📦", color: 0xe49a48, category: "produk", price: 12 },
  KOTAK_BORONG: { name: "Kotak borong", short: "Kotak borong", icon: "🚚", color: 0xc48d54, category: "produk" }
};

const DEFAULT_STATE = {
  version: 1,
  money: 52,
  pendingCash: 0,
  totalSales: 0,
  saleCount: 0,
  reputation: 0,
  bestStreak: 0,
  currentStreak: 0,
  wholesaleShipped: 0,
  tutorialStep: 0,
  sound: true,
  music: true,
  player: { x: -10.2, z: -8.6, inventory: { type: null, count: 0 } },
  upgrades: { speed: 0, capacity: 0, shelf: 0, process: 0, value: 0 },
  open: {
    chiliSource: true,
    anchovySource: true,
    blender: true,
    panClassic: true,
    packClassic: true,
    counter: false,
    shelf: false,
    market: false,
    petaiSource: false,
    panPetai: false,
    packPetai: false,
    shelfPetai: false,
    workshop: false,
    onionSource: false,
    dryChiliSource: false,
    fryer: false,
    packSnack: false,
    shelfSnack: false,
    storage: false,
    wholesale: false,
    van: false,
    factory: false,
    autoLine: false,
    hireGardener: false,
    hireKitchen: false,
    hireFiller: false,
    hireCashier: false,
    hireDelivery: false
  },
  sources: { CILI: 8, BILIS: 8, PETAI: 5, BAWANG: 5, CILI_KERING: 5 },
  warehouse: {},
  machines: {
    blender: { inputs: { CILI: 0 }, output: 0, progress: 0 },
    panClassic: { inputs: { PES_CILI: 0, BILIS: 0 }, output: 0, progress: 0 },
    packClassic: { inputs: { SAMBAL_KLASIK: 0 }, output: 0, progress: 0 },
    panPetai: { inputs: { SAMBAL_KLASIK: 0, PETAI: 0 }, output: 0, progress: 0 },
    packPetai: { inputs: { SAMBAL_PETAI: 0 }, output: 0, progress: 0 },
    fryer: { inputs: { BILIS: 0, CILI_KERING: 0, BAWANG: 0 }, output: 0, progress: 0 },
    packSnack: { inputs: { SAMBAL_GARING: 0 }, output: 0, progress: 0 }
  },
  shelves: { classic: 0, petai: 0, snack: 0 },
  wholesale: { type: null, lastType: null, count: 0, ready: 0 },
  workers: { gardener: 0, kitchen: 0, filler: 0, cashier: 0, delivery: 0 },
  stats: {
    harvested: 0,
    harvestedTypes: {},
    cookedClassic: 0,
    packedClassic: 0,
    stockedClassic: 0,
    productsMade: { BALANG_KLASIK: 0, BALANG_PETAI: 0, PEK_GARING: 0 }
  }
};

const $ = (id) => document.getElementById(id);
const ui = {
  app: $("app"), canvas: $("world-canvas"), loading: $("loading-screen"), loadingCopy: $("loading-copy"), loadingFill: $("loading-fill"),
  start: $("start-overlay"), startButton: $("start-button"), howButton: $("how-button"), howStart: $("how-start-button"), howOverlay: $("how-overlay"), howBackdrop: $("how-backdrop"), howClose: $("how-close"),
  mission: $("mission-card"), missionKicker: $("mission-kicker"), missionDistance: $("mission-distance"), missionIcon: $("mission-icon"), missionTitle: $("mission-title"), missionCopy: $("mission-copy"), missionFill: $("mission-fill"),
  eventBanner: $("event-banner"), eventKicker: $("event-kicker"), eventTitle: $("event-title"), eventTimer: $("event-timer"),
  contextCard: $("context-card"), contextIcon: $("context-icon"), contextTitle: $("context-title"), contextDetail: $("context-detail"), contextMeter: $("context-meter"), contextFill: $("context-fill"),
  worldLabels: $("world-labels"), toastStack: $("toast-stack"),
  money: $("money-value"), reputation: $("reputation-value"), carry: $("carry-value"), progressButton: $("progress-button"), soundButton: $("sound-button"), soundIcon: $("sound-icon"), musicButton: $("music-button"), musicIcon: $("music-icon"), pauseButton: $("pause-button"),
  joystick: $("joystick"), joystickKnob: $("joystick-knob"),
  pause: $("pause-overlay"), resume: $("resume-button"), restart: $("restart-button"), pauseMoney: $("pause-money"), pauseSales: $("pause-sales"), pauseWorkers: $("pause-workers"),
  progress: $("progress-overlay"), progressBackdrop: $("progress-backdrop"), progressClose: $("progress-close"), progressList: $("progress-list"), upgradeList: $("upgrade-list"), empireCopy: $("empire-progress-copy"), empireFill: $("empire-progress-fill"), empirePercent: $("empire-progress-percent"),
  completion: $("completion-overlay"), completeSales: $("complete-sales"), completeRep: $("complete-rep"), completeProducts: $("complete-products"), completionClose: $("completion-close")
};

function clone(value) { return JSON.parse(JSON.stringify(value)); }

function mergeState(base, saved) {
  if (!saved || saved.version !== base.version) return clone(base);
  const out = clone(base);
  const merge = (target, source) => {
    Object.entries(source || {}).forEach(([key, value]) => {
      if (value && typeof value === "object" && !Array.isArray(value) && target[key] && typeof target[key] === "object") merge(target[key], value);
      else target[key] = value;
    });
  };
  merge(out, saved);
  return out;
}

function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? mergeState(DEFAULT_STATE, JSON.parse(raw)) : clone(DEFAULT_STATE);
  } catch (error) {
    console.warn("Simpanan Empayar Sambal Bilis tidak dapat dibaca.", error);
    return clone(DEFAULT_STATE);
  }
}

const state = loadState();
let hasStarted = false;
let runtimePaused = true;
let gameTime = 0;
let saveTimer = 0;
let introTimer = 0;
let currentNearId = null;
let interactionHold = 0;
let actionCooldown = 0;
let lastFrame = performance.now();
let wholesaleFlashTimer = 0;

const input = { x: 0, z: 0, keys: new Set(), pointerId: null };
const runtime = {
  customers: [], workers: [], floatingTexts: [],
  customerSeq: 0, workerSeq: 0,
  event: { name: "SUASANA DAPUR", title: "Buka dapur dan mula mengacau", timer: 0, multiplier: 1 },
  eventClock: 48,
  spawnClock: 1.6,
  targetId: null,
  completedShown: false
};

function fmtRM(value) { return `RM${Math.max(0, Math.round(value)).toLocaleString("ms-MY")}`; }
function pct(value) { return `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%`; }
function productName(type) { return PRODUCT[type]?.name || type || "—"; }
function capacity() { return 3 + state.upgrades.capacity; }
function shelfCapacity() { return 4 + state.upgrades.shelf * 2; }
function productPrice(type) { return Math.round((PRODUCT[type]?.price || 0) * (1 + state.upgrades.value * 0.12)); }
function totalWorkers() { return Object.values(state.workers).reduce((sum, value) => sum + value, 0); }

const STATIONS = {
  counterBuy: { kind: "gate", unlock: "counter", title: "Kaunter bayaran", icon: "💵", pos: [-6.6, -4.9], cost: 18, copy: "Buka tempat pelanggan membayar.", zone: "home" },
  counter: { kind: "counter", title: "Kaunter bayaran", icon: "💵", pos: [-6.6, -4.9], copy: "Kutip wang pelanggan di sini.", zone: "home" },
  shelfBuy: { kind: "gate", unlock: "shelf", title: "Rak jualan", icon: "▤", pos: [-4.1, -4.9], cost: 24, prereq: "counter", copy: "Pamerkan balang pertama.", zone: "home" },
  chiliSource: { kind: "source", key: "CILI", title: "Kebun cili", icon: "🌶", pos: [-10.2, -9.1], copy: "Cili merah segar untuk dikisar.", zone: "home" },
  anchovySource: { kind: "source", key: "BILIS", title: "Bekas bilis", icon: "🐟", pos: [-5.6, -9.1], copy: "Bilis rangup dari Selat Melaka.", zone: "home" },
  blender: { kind: "machine", machine: "blender", title: "Pengisar tangan", icon: "⚙", pos: [-8.2, -7.1], copy: "Cili → pes cili · 2 saat", zone: "home", input: ["CILI"], output: "PES_CILI", time: 2.1 },
  panClassic: { kind: "machine", machine: "panClassic", title: "Kuali klasik", icon: "🍳", pos: [-5.7, -7.1], copy: "Pes cili + bilis → sambal", zone: "home", input: ["PES_CILI", "BILIS"], output: "SAMBAL_KLASIK", time: 2.8 },
  packClassic: { kind: "machine", machine: "packClassic", title: "Meja balang", icon: "🫙", pos: [-3.1, -7.1], copy: "Sambal klasik → balang", zone: "home", input: ["SAMBAL_KLASIK"], output: "BALANG_KLASIK", time: 1.1 },
  shelfClassic: { kind: "shelf", shelf: "classic", title: "Rak sambal klasik", icon: "🫙", pos: [-3.9, -3.2], copy: "Penuhkan rak untuk pelanggan.", zone: "home", accepts: ["BALANG_KLASIK"] },
  marketGate: { kind: "area", area: "market", title: "Gerai pasar malam", icon: "🏮", pos: [4.7, -4.2], cost: 150, reputation: 15, sales: 10, copy: "Buka gerai, petai dan pekerja pertama.", zone: "market" },
  petaiSource: { kind: "source", key: "PETAI", title: "Bak petai", icon: "🫘", pos: [3.7, -7.0], copy: "Petai hijau untuk resipi premium.", zone: "market", area: "market" },
  panPetai: { kind: "machine", machine: "panPetai", title: "Kuali petai", icon: "🍳", pos: [6.2, -7.0], copy: "Sambal klasik + petai → premium", zone: "market", area: "market", input: ["SAMBAL_KLASIK", "PETAI"], output: "SAMBAL_PETAI", time: 3.6 },
  packPetai: { kind: "machine", machine: "packPetai", title: "Balang hijau", icon: "🫙", pos: [8.5, -7.0], copy: "Sambal petai → balang premium", zone: "market", area: "market", input: ["SAMBAL_PETAI"], output: "BALANG_PETAI", time: 1.3 },
  shelfPetai: { kind: "shelf", shelf: "petai", title: "Rak premium", icon: "✦", pos: [8.8, -3.5], copy: "Harga tinggi, pelanggan tetap.", zone: "market", area: "market", accepts: ["BALANG_PETAI"] },
  hireGardener: { kind: "hire", role: "gardener", title: "Pekerja: Pekebun", icon: "🧑‍🌾", pos: [5.5, -2.5], cost: 95, copy: "Kutip bahan dan hantar ke stor.", zone: "market", area: "market" },
  workshopGate: { kind: "area", area: "workshop", title: "Bengkel pengeluaran", icon: "🏭", pos: [5.6, 3.3], cost: 400, reputation: 40, sales: 36, copy: "Buka penggoreng, stor dan borong.", zone: "workshop" },
  onionSource: { kind: "source", key: "BAWANG", title: "Bakul bawang", icon: "🧅", pos: [3.3, 6.5], copy: "Bawang wangi untuk sambal garing.", zone: "workshop", area: "workshop" },
  dryChiliSource: { kind: "source", key: "CILI_KERING", title: "Rak cili kering", icon: "🌶", pos: [7.2, 6.5], copy: "Cili kering dan minyak panas.", zone: "workshop", area: "workshop" },
  fryer: { kind: "machine", machine: "fryer", title: "Penggoreng besar", icon: "♨", pos: [5.4, 8.7], copy: "Bilis + cili kering + bawang → garing", zone: "workshop", area: "workshop", input: ["BILIS", "CILI_KERING", "BAWANG"], output: "SAMBAL_GARING", time: 4.3 },
  packSnack: { kind: "machine", machine: "packSnack", title: "Meja pek snek", icon: "📦", pos: [8.2, 8.7], copy: "Sambal garing → pek rangup", zone: "workshop", area: "workshop", input: ["SAMBAL_GARING"], output: "PEK_GARING", time: 1.4 },
  shelfSnack: { kind: "shelf", shelf: "snack", title: "Rak snek", icon: "📦", pos: [10.2, 5.5], copy: "Pek garing untuk pembeli borong.", zone: "workshop", area: "workshop", accepts: ["PEK_GARING"] },
  storage: { kind: "storage", title: "Stor sementara", icon: "🧺", pos: [10.1, 8.8], copy: "Lebihan bahan pekerja.", zone: "workshop", area: "workshop" },
  wholesale: { kind: "wholesale", title: "Meja borong", icon: "▣", pos: [12.4, 7.2], copy: "6 unit sama → satu kotak borong.", zone: "workshop", area: "workshop" },
  van: { kind: "van", title: "Van penghantaran", icon: "🚚", pos: [14.7, 9.8], copy: "Hantar kotak untuk bonus 20%.", zone: "workshop", area: "workshop" },
  hireKitchen: { kind: "hire", role: "kitchen", title: "Pekerja: Pembantu dapur", icon: "👩‍🍳", pos: [2.9, 3.8], cost: 160, copy: "Bekal mesin dan kutip output.", zone: "workshop", area: "workshop" },
  hireFiller: { kind: "hire", role: "filler", title: "Pekerja: Pengisi rak", icon: "🧺", pos: [10.5, 3.2], cost: 180, copy: "Pastikan rak tidak pernah kosong.", zone: "workshop", area: "workshop" },
  factoryGate: { kind: "area", area: "factory", title: "Kilang sambal", icon: "🏗", pos: [-7.4, 4.2], cost: 950, reputation: 90, sales: 92, copy: "Buka barisan pengeluaran dan penamat.", zone: "factory" },
  autoLine: { kind: "auto", title: "Barisan automatik", icon: "⚡", pos: [-11.2, 7.0], copy: "Mesin jalan sendiri untuk produk utama.", zone: "factory", area: "factory" },
  hireCashier: { kind: "hire", role: "cashier", title: "Pekerja: Juruwang", icon: "🧾", pos: [-5.4, 7.7], cost: 220, copy: "Kutip wang sambil anda mengurus kilang.", zone: "factory", area: "factory" },
  hireDelivery: { kind: "hire", role: "delivery", title: "Pekerja: Penghantar", icon: "🚚", pos: [-2.8, 9.0], cost: 260, copy: "Hantar kotak borong secara automatik.", zone: "factory", area: "factory" },
  speedUpgrade: { kind: "upgrade", upgrade: "speed", title: "Kelajuan kaki", icon: "⚡", pos: [-1.4, -3.6], cost: 38, copy: "Bergerak lebih pantas.", zone: "home" },
  capacityUpgrade: { kind: "upgrade", upgrade: "capacity", title: "Bakul lebih besar", icon: "▦", pos: [-0.2, -3.6], cost: 45, copy: "Tambah satu unit bawaan.", zone: "home" },
  shelfUpgrade: { kind: "upgrade", upgrade: "shelf", title: "Rak bertingkat", icon: "▤", pos: [1.0, -3.6], cost: 55, copy: "Dua slot tambahan setiap rak.", zone: "home" },
  processUpgrade: { kind: "upgrade", upgrade: "process", title: "Api lebih sekata", icon: "♨", pos: [0.2, 3.0], cost: 72, copy: "Mesin memproses lebih laju.", zone: "market" },
  valueUpgrade: { kind: "upgrade", upgrade: "value", title: "Label premium", icon: "★", pos: [1.7, 3.0], cost: 80, copy: "Nilai setiap jualan meningkat.", zone: "market" }
};

const AREA_STATIONS = {
  market: ["petaiSource", "panPetai", "packPetai", "shelfPetai", "hireGardener"],
  workshop: ["onionSource", "dryChiliSource", "fryer", "packSnack", "shelfSnack", "storage", "wholesale", "van", "hireKitchen", "hireFiller"],
  factory: ["autoLine", "hireCashier", "hireDelivery"]
};

const AREA_META = [
  { id: "home", title: "Dapur rumah", sub: "Kuali pertama", icon: "🍳", open: true, copy: "Cili, bilis dan sambal klasik" },
  { id: "market", title: "Gerai pasar malam", sub: "Petai premium", icon: "🏮", copy: "Pelanggan lebih ramai + pekerja" },
  { id: "workshop", title: "Bengkel pengeluaran", sub: "Borong & snek", icon: "🏭", copy: "Penggoreng besar dan penghantaran" },
  { id: "factory", title: "Kilang sambal", sub: "Penamat prototaip", icon: "🏗", copy: "Barisan automatik seluruh Malaysia" }
];

const RECIPE = {
  blender: { inputs: ["CILI"], output: "PES_CILI", time: 2.1 },
  panClassic: { inputs: ["PES_CILI", "BILIS"], output: "SAMBAL_KLASIK", time: 2.8 },
  packClassic: { inputs: ["SAMBAL_KLASIK"], output: "BALANG_KLASIK", time: 1.1 },
  panPetai: { inputs: ["SAMBAL_KLASIK", "PETAI"], output: "SAMBAL_PETAI", time: 3.6 },
  packPetai: { inputs: ["SAMBAL_PETAI"], output: "BALANG_PETAI", time: 1.3 },
  fryer: { inputs: ["BILIS", "CILI_KERING", "BAWANG"], output: "SAMBAL_GARING", time: 4.3 },
  packSnack: { inputs: ["SAMBAL_GARING"], output: "PEK_GARING", time: 1.4 }
};

// --- audio: tiny Web Audio instruments keep the game self-contained ---
const audio = {
  ctx: null, master: null, musicGain: null, musicTimer: null, step: 0,
  init() {
    if (this.ctx) { if (this.ctx.state === "suspended") this.ctx.resume(); return; }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain(); this.master.gain.value = .22; this.master.connect(this.ctx.destination);
    this.musicGain = this.ctx.createGain(); this.musicGain.gain.value = state.music ? .035 : 0; this.musicGain.connect(this.master);
    this.startMusic();
  },
  tone(freq, duration = .12, type = "sine", volume = .12, destination = this.master, delay = 0) {
    if (!this.ctx || !state.sound || !destination) return;
    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, now); osc.frequency.exponentialRampToValueAtTime(Math.max(45, freq * .72), now + duration);
    gain.gain.setValueAtTime(.0001, now); gain.gain.exponentialRampToValueAtTime(volume, now + .012); gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
    osc.connect(gain); gain.connect(destination); osc.start(now); osc.stop(now + duration + .03);
  },
  noise(duration = .08, volume = .08) {
    if (!this.ctx || !state.sound || !this.master) return;
    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * duration, this.ctx.sampleRate); const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const source = this.ctx.createBufferSource(); const gain = this.ctx.createGain(); gain.gain.value = volume; source.buffer = buffer; source.connect(gain); gain.connect(this.master); source.start();
  },
  sfx(name) {
    this.init();
    if (!this.ctx || !state.sound) return;
    const sounds = {
      pop: () => { this.tone(460, .08, "triangle", .16); this.tone(760, .11, "sine", .08, this.master, .045); },
      collect: () => { this.tone(280, .07, "triangle", .12); this.tone(520, .08, "triangle", .09, this.master, .06); },
      cook: () => { this.noise(.12, .07); this.tone(130, .22, "sine", .11); },
      done: () => { this.tone(420, .11, "triangle", .12); this.tone(620, .12, "triangle", .11, this.master, .08); },
      cash: () => { this.tone(650, .08, "square", .12); this.tone(930, .1, "square", .08, this.master, .08); },
      unlock: () => { [392, 494, 587, 784].forEach((n, i) => this.tone(n, .18, "triangle", .11, this.master, i * .1)); },
      error: () => { this.tone(170, .16, "sawtooth", .08); },
      click: () => this.tone(300, .06, "sine", .08)
    };
    sounds[name]?.();
  },
  startMusic() {
    if (!this.ctx || this.musicTimer || !this.musicGain) return;
    const melody = [196, 247, 294, 330, 294, 247, 220, 165];
    this.musicTimer = window.setInterval(() => {
      if (!this.ctx || !state.music) return;
      const n = melody[this.step++ % melody.length];
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain(); osc.type = "sine"; osc.frequency.value = n;
      gain.gain.setValueAtTime(.0001, now); gain.gain.exponentialRampToValueAtTime(.7, now + .04); gain.gain.exponentialRampToValueAtTime(.0001, now + .42);
      osc.connect(gain); gain.connect(this.musicGain); osc.start(now); osc.stop(now + .45);
    }, 520);
  },
  setMusic(on) { state.music = on; if (this.musicGain) this.musicGain.gain.setTargetAtTime(on ? .035 : 0, this.ctx.currentTime, .05); },
  setSound(on) { state.sound = on; }
};

// --- Three.js world ---
let renderer; let scene; let camera; let worldRoot; let playerObject; let playerCarry; let targetBeacon; let carrySignature = "";
const stationObjects = new Map(); const stationLabels = new Map(); const zoneObjects = new Map(); const workerLabels = new Map(); const customerLabels = new Map();
const mats = new Map();

function material(color, roughness = .82) {
  const key = `${color}-${roughness}`;
  if (!mats.has(key)) mats.set(key, new THREE.MeshStandardMaterial({ color, roughness, metalness: .02, flatShading: true }));
  return mats.get(key);
}
function meshBox(parent, size, color, position = [0, 0, 0], rotation = [0, 0, 0]) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material(color)); mesh.position.set(...position); mesh.rotation.set(...rotation); parent.add(mesh); return mesh;
}
function meshCylinder(parent, radiusTop, radiusBottom, height, color, position = [0, 0, 0], segments = 10) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments), material(color)); mesh.position.set(...position); parent.add(mesh); return mesh;
}
function meshSphere(parent, radius, color, position = [0, 0, 0], segments = 12) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, Math.max(6, segments / 2)), material(color)); mesh.position.set(...position); parent.add(mesh); return mesh;
}
function meshPlane(parent, width, height, color, position = [0, 0, 0], rotation = [-Math.PI / 2, 0, 0]) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material(color)); mesh.position.set(...position); mesh.rotation.set(...rotation); parent.add(mesh); return mesh;
}
function roundedRing(parent, color = 0xffd16a, inner = .72, outer = .88, y = .035) {
  const ring = new THREE.Mesh(new THREE.RingGeometry(inner, outer, 32), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .9, side: THREE.DoubleSide })); ring.rotation.x = -Math.PI / 2; ring.position.y = y; parent.add(ring); return ring;
}

function makeTextTexture(text, background = "#e5563f", foreground = "#fff5df") {
  const canvas = document.createElement("canvas"); canvas.width = 512; canvas.height = 128; const ctx = canvas.getContext("2d");
  ctx.fillStyle = background; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = foreground; ctx.font = "900 48px system-ui"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(text, 256, 66);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; return texture;
}
function worldSign(parent, text, position, background = "#e5563f") {
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.45, .36), new THREE.MeshBasicMaterial({ map: makeTextTexture(text, background), transparent: true, side: THREE.DoubleSide })); sign.position.set(...position); parent.add(sign); return sign;
}

function addZone(id, center, size, color, title, locked = false) {
  const group = new THREE.Group(); group.position.set(center[0], 0, center[1]); group.userData.locked = locked;
  meshBox(group, [size[0], .28, size[1]], 0x326f63, [0, -.14, 0]); meshBox(group, [size[0] - .35, .16, size[1] - .35], color, [0, .05, 0]);
  const borderColor = locked ? 0x4f7770 : 0xe0b36b; meshBox(group, [size[0], .05, .1], borderColor, [0, .12, -size[1] / 2]); meshBox(group, [size[0], .05, .1], borderColor, [0, .12, size[1] / 2]); meshBox(group, [.1, .05, size[1]], borderColor, [-size[0] / 2, .12, 0]); meshBox(group, [.1, .05, size[1]], borderColor, [size[0] / 2, .12, 0]);
  const sign = worldSign(group, title, [0, 3.3, -size[1] / 2 - .05], locked ? "#4a7770" : "#167363"); sign.rotation.x = 0;
  const lockedShade = new THREE.Mesh(new THREE.PlaneGeometry(size[0] - .4, size[1] - .4), new THREE.MeshBasicMaterial({ color: 0x1e4a44, transparent: true, opacity: locked ? .36 : 0, side: THREE.DoubleSide })); lockedShade.rotation.x = -Math.PI / 2; lockedShade.position.y = .14; group.add(lockedShade);
  group.userData.shade = lockedShade; group.userData.sign = sign; group.userData.base = color; worldRoot.add(group); zoneObjects.set(id, group); return group;
}

function addPalm(parent, x, z, scale = 1) {
  const tree = new THREE.Group(); tree.position.set(x, .12, z); tree.scale.setScalar(scale); meshCylinder(tree, .12, .16, 1.65, 0x8d6445, [0, .82, 0], 7);
  for (let i = 0; i < 5; i++) { const leaf = meshBox(tree, [.13, .06, 1.2], 0x2f866b, [0, 1.68, 0], [0, i * TAU / 5, -.42]); leaf.geometry.translate(0, 0, -.5); }
  parent.add(tree); return tree;
}
function addCrate(parent, x, z, color = 0xd28a4e, label = "") { const crate = new THREE.Group(); crate.position.set(x, .17, z); meshBox(crate, [.72, .5, .66], color, [0, .25, 0]); meshBox(crate, [.76, .045, .06], 0x9d5b3b, [0, .28, -.34]); meshBox(crate, [.06, .045, .7], 0x9d5b3b, [0, .28, 0], [0, 0, Math.PI / 2]); if (label) worldSign(crate, label, [0, .65, 0], "#a85c3e"); parent.add(crate); return crate; }

function createStation(id, meta) {
  const group = new THREE.Group(); group.position.set(meta.pos[0], 0, meta.pos[1]); group.userData.id = id; group.userData.meta = meta; group.userData.dynamic = new THREE.Group(); group.add(group.userData.dynamic);
  const base = meshBox(group, [1.7, .1, 1.5], 0x214c45, [0, .06, 0]); roundedRing(group, 0xffd16a, .6, .78, .12); group.userData.base = base; group.userData.ring = group.children.find((child) => child.geometry?.type === "RingGeometry");
  const prop = new THREE.Group(); prop.position.y = .12; group.add(prop); group.userData.prop = prop;
  const type = meta.kind;
  if (type === "source") {
    meshBox(prop, [1.1, .55, .8], 0xd28a4e, [0, .27, 0]); meshBox(prop, [1.15, .05, .07], 0x9c593a, [0, .32, -.42]); meshBox(prop, [.07, .05, .85], 0x9c593a, [0, .32, 0], [0, 0, Math.PI / 2]);
    for (let i = 0; i < 5; i++) { const item = meta.key === "CILI" ? meshSphere(prop, .15, 0xe5563f, [-.33 + (i % 3) * .33, .66 + Math.floor(i / 3) * .13, -.17 + (i % 2) * .25], 8) : meta.key === "BILIS" ? meshBox(prop, [.31, .09, .1], 0x83b6bd, [-.35 + (i % 3) * .32, .66 + Math.floor(i / 3) * .13, -.17 + (i % 2) * .22], [0, .2, -.12]) : meta.key === "PETAI" ? meshSphere(prop, .13, 0x6c9b48, [-.35 + (i % 3) * .34, .67 + Math.floor(i / 3) * .14, -.17 + (i % 2) * .24], 7) : meshSphere(prop, .14, meta.key === "BAWANG" ? 0xd9a170 : 0xa93c38, [-.35 + (i % 3) * .34, .67 + Math.floor(i / 3) * .14, -.17 + (i % 2) * .24], 8); item.rotation.y = i * .6; }
  } else if (type === "machine") {
    meshBox(prop, [1.18, .35, .9], 0xb66a45, [0, .18, 0]);
    if (meta.machine === "blender") { meshCylinder(prop, .36, .42, .55, 0x75bab0, [0, .62, 0], 10); meshCylinder(prop, .28, .28, .08, 0x214c45, [0, .93, 0], 10); meshBox(prop, [.09, .4, .09], 0x214c45, [.3, .8, 0], [0, 0, -.3]); }
    else if (meta.machine === "fryer") { meshCylinder(prop, .48, .56, .38, 0x465856, [0, .46, 0], 12); meshCylinder(prop, .35, .35, .07, 0xf0a343, [0, .68, 0], 12); meshCylinder(prop, .24, .24, .12, 0xe5563f, [0, .77, 0], 10); }
    else { meshCylinder(prop, .5, .56, .24, 0x384d48, [0, .48, 0], 12); meshCylinder(prop, .4, .42, .08, meta.machine.includes("Petai") ? 0x6c9b48 : 0xe3a140, [0, .64, 0], 12); meshBox(prop, [.12, .28, .12], 0x8c4c37, [.42, .72, 0], [0, 0, -.4]); }
    const progress = meshBox(prop, [1.0, .035, .07], 0x214c45, [0, 1.09, -.06]); const progressFill = meshBox(progress, [.96, .04, .04], 0xffd16a, [-.48, .02, 0]); progressFill.scale.x = 0; group.userData.progressFill = progressFill;
  } else if (type === "shelf") {
    meshBox(prop, [1.28, .1, .5], 0x9b6045, [0, .33, 0]); meshBox(prop, [1.28, .1, .5], 0x9b6045, [0, .83, 0]); meshBox(prop, [1.28, .1, .5], 0x9b6045, [0, 1.33, 0]); [-.6, .6].forEach((x) => meshBox(prop, [.1, 1.55, .58], 0x764a3b, [x, .83, 0]));
    group.userData.shelfSlots = new THREE.Group(); group.userData.shelfSlots.position.z = -.28; prop.add(group.userData.shelfSlots);
  } else if (type === "storage") { addCrate(prop, -.34, 0, 0xc8894f, "STOR"); addCrate(prop, .37, 0, 0xb87546); }
  else if (type === "wholesale") { meshBox(prop, [1.25, .22, .9], 0xb97646, [0, .28, 0]); meshBox(prop, [1.03, .32, .68], 0xc9965d, [0, .55, 0]); meshBox(prop, [.05, .38, .7], 0xa25c40, [0, .55, 0], [0, 0, Math.PI / 2]); }
  else if (type === "van") { meshBox(prop, [1.7, .72, .9], 0xe6c067, [0, .56, 0]); meshBox(prop, [.72, .5, .86], 0xe5563f, [-.48, .95, 0]); meshCylinder(prop, .18, .18, .08, 0x274a47, [-.48, .18, -.38], 10).rotation.x = Math.PI / 2; meshCylinder(prop, .18, .18, .08, 0x274a47, [.58, .18, -.38], 10).rotation.x = Math.PI / 2; }
  else if (type === "auto") { meshBox(prop, [1.2, .3, .8], 0x3e8d82, [0, .27, 0]); meshCylinder(prop, .37, .37, .38, 0x94d1bf, [0, .68, 0], 10); meshBox(prop, [.08, .52, .08], 0xffd16a, [.33, .83, 0], [0, 0, -.25]); }
  else if (type === "gate") { meshBox(prop, [.9, .75, .16], 0x507f72, [0, .43, 0]); meshBox(prop, [.9, .06, .25], 0xffd16a, [0, .83, 0]); }
  else if (type === "counter") { meshBox(prop, [1.35, .6, .72], 0x9b6045, [0, .42, 0]); meshBox(prop, [1.16, .12, .65], 0xe0b36b, [0, .78, 0]); meshCylinder(prop, .14, .14, .08, 0x91c8a6, [0, .9, 0], 10); meshBox(prop, [.08, .18, .08], 0x355955, [0, 1.01, 0]); }
  else if (type === "area") { meshCylinder(prop, .54, .64, .16, 0xe3ad5f, [0, .2, 0], 12); meshBox(prop, [.08, 1.6, .08], 0x9c593a, [0, 1.0, 0]); meshBox(prop, [.9, .42, .08], 0xe5563f, [0, 1.72, 0]); }
  else if (type === "hire") { meshCylinder(prop, .52, .57, .13, 0x5bb698, [0, .18, 0], 12); meshSphere(prop, .23, 0xf4c17b, [0, .75, 0], 10); meshBox(prop, [.4, .55, .24], 0x287c6e, [0, .45, 0]); }
  else if (type === "upgrade") { meshCylinder(prop, .5, .56, .12, 0x3d8b7c, [0, .18, 0], 12); meshBox(prop, [.16, .72, .16], 0xf0a343, [0, .62, 0]); }
  stationObjects.set(id, group); worldRoot.add(group);
  const label = document.createElement("div"); label.className = "world-label"; label.innerHTML = `<span class="label-kicker">${meta.icon || "✦"}</span>${meta.title}`; ui.worldLabels.appendChild(label); stationLabels.set(id, label);
  updateStationVisual(id); return group;
}

function stationUnlocked(id) {
  const meta = STATIONS[id]; if (!meta) return false;
  if (meta.kind === "gate" || meta.kind === "area") return !state.open[meta.unlock || meta.area];
  if (meta.kind === "upgrade") return true;
  if (meta.kind === "hire") return Boolean(state.open[meta.area === "market" ? "market" : meta.area] || !meta.area);
  return Boolean(state.open[id]);
}
function stationEnabled(id) { const meta = STATIONS[id]; if (!meta) return false; if (meta.kind === "gate" || meta.kind === "area") return false; return Boolean(state.open[id]); }
function updateZoneVisual(id) { const zone = zoneObjects.get(id); if (!zone) return; const isOpen = id === "home" || state.open[id]; zone.userData.shade.material.opacity = isOpen ? 0 : .36; zone.userData.sign.material.map = makeTextTexture(AREA_META.find((item) => item.id === id)?.title || id, isOpen ? "#167363" : "#4a7770"); zone.userData.sign.material.needsUpdate = true; }
function updateStationVisual(id) {
  const group = stationObjects.get(id); const meta = STATIONS[id]; if (!group || !meta) return;
  const enabled = stationEnabled(id); const gateReady = (meta.kind === "gate" || meta.kind === "area") && !state.open[meta.unlock || meta.area]; const isFuture = meta.area && !state.open[meta.area];
  group.userData.locked = !enabled && !gateReady;
  group.userData.ring?.material?.color?.setHex(gateReady ? (canUnlock(id) ? 0xffd16a : 0x688f85) : enabled ? 0x54c3a3 : 0x405f59);
  group.userData.ring?.material && (group.userData.ring.material.opacity = gateReady ? .95 : enabled ? .6 : .25);
  group.userData.prop.visible = enabled || gateReady || meta.kind === "upgrade";
  group.userData.prop.traverse((child) => { if (child.material) { child.material.transparent = true; child.material.opacity = enabled || gateReady || meta.kind === "upgrade" ? 1 : .2; } });
  const label = stationLabels.get(id); if (label) { label.classList.toggle("locked", !enabled && !gateReady); label.classList.toggle("target", runtime.targetId === id); }
  if (meta.kind === "shelf") updateShelfVisual(id);
}

function createEnvironment() {
  scene.background = new THREE.Color(0x9edbd2); scene.fog = new THREE.Fog(0x9edbd2, 25, 55);
  scene.add(new THREE.HemisphereLight(0xfff3cf, 0x28645c, 2.1)); const sun = new THREE.DirectionalLight(0xfff0cd, 2.4); sun.position.set(-8, 16, 10); scene.add(sun);
  meshPlane(worldRoot, 48, 38, 0x8bceaa, [0, -.02, 0]);
  addZone("home", [-6.2, -6.0], [10.4, 8.2], 0xf0bd6b, "DAPUR RUMAH"); addZone("market", [7.2, -4.7], [9.8, 8.1], 0xe99b65, "PASAR MALAM", !state.open.market); addZone("workshop", [7.3, 7.2], [10.6, 8.6], 0xb8b56b, "BENGKEL", !state.open.workshop); addZone("factory", [-7.2, 7.2], [9.7, 8.2], 0x78a8a3, "KILANG", !state.open.factory);
  for (let i = 0; i < 15; i++) { const x = -20 + (i * 13) % 40; const z = -14 + (i * 9) % 28; addPalm(worldRoot, x, z, .75 + (i % 3) * .14); }
  addCrate(worldRoot, -15, -10, 0xb97646, "CILI"); addCrate(worldRoot, 16, -9, 0xd28a4e); addCrate(worldRoot, 16, 10, 0xb97646, "BORONG");
  for (let i = 0; i < 9; i++) { const lamp = new THREE.Group(); lamp.position.set(-17 + i * 4.3, .08, -1.8 + (i % 2) * 1.1); meshCylinder(lamp, .04, .06, 2.2, 0x4c675e, [0, 1.1, 0], 6); meshSphere(lamp, .13, 0xffd16a, [0, 2.25, 0], 8); worldRoot.add(lamp); }
}

function createPlayer() {
  const group = createCharacter(0x2b8372, 0xe5563f); group.position.set(state.player.x, 0, state.player.z); worldRoot.add(group); playerObject = group; playerCarry = new THREE.Group(); playerCarry.position.set(0, 2.12, .05); group.add(playerCarry); updateCarryVisual();
  targetBeacon = new THREE.Group(); const beam = new THREE.Mesh(new THREE.CylinderGeometry(.03, .13, 1.25, 8), new THREE.MeshBasicMaterial({ color: 0xffd16a, transparent: true, opacity: .64 })); beam.position.y = .72; targetBeacon.add(beam); roundedRing(targetBeacon, 0xffd16a, .55, .8, .04); targetBeacon.visible = false; worldRoot.add(targetBeacon);
}
function createCharacter(bodyColor, accentColor) {
  const group = new THREE.Group(); group.userData.bob = Math.random() * 10; meshBox(group, [.52, .68, .38], bodyColor, [0, .58, 0]); meshBox(group, [.34, .4, .04], accentColor, [0, .61, -.2]); meshSphere(group, .3, 0xf0bb7d, [0, 1.13, 0], 10); meshCylinder(group, .33, .31, .11, accentColor, [0, 1.36, 0], 10); meshBox(group, [.52, .12, .12], accentColor, [0, 1.39, -.08], [0, 0, -.12]); meshBox(group, [.14, .43, .14], 0x355955, [-.16, .16, 0]); meshBox(group, [.14, .43, .14], 0x355955, [.16, .16, 0]); meshSphere(group, .06, 0x214c45, [-.1, 1.17, -.27], 6); meshSphere(group, .06, 0x214c45, [.1, 1.17, -.27], 6); return group;
}

function updateCarryVisual() {
  if (!playerCarry) return; const inv = state.player.inventory; const signature = `${inv.type || ""}:${inv.count}:${capacity()}`; if (signature === carrySignature) return; carrySignature = signature; while (playerCarry.children.length) playerCarry.remove(playerCarry.children[0]); if (!inv.type || !inv.count) return; const info = PRODUCT[inv.type] || PRODUCT.CILI; const amount = Math.min(inv.count, capacity());
  for (let i = 0; i < amount; i++) { const item = new THREE.Group(); const x = ((i % 2) - .5) * .23; const y = Math.floor(i / 2) * .25; if (info.category === "produk") { meshCylinder(item, .12, .13, .24, info.color, [x, y, 0], 9); meshCylinder(item, .09, .09, .035, 0xffe9a9, [x, y + .13, 0], 9); } else if (inv.type === "BILIS") meshBox(item, [.25, .08, .1], info.color, [x, y, 0], [0, i * .6, -.12]); else if (inv.type.includes("CILI")) { meshSphere(item, .13, info.color, [x, y, 0], 8); meshBox(item, [.05, .11, .05], 0x2f866b, [x, y + .13, 0]); } else meshSphere(item, .14, info.color, [x, y, 0], 8); item.rotation.y = i * .4; playerCarry.add(item); }
}

function initScene() {
  renderer = new THREE.WebGLRenderer({ canvas: ui.canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.55)); renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.setClearColor(0x9edbd2, 1);
  scene = new THREE.Scene(); worldRoot = new THREE.Group(); scene.add(worldRoot);
  camera = new THREE.OrthographicCamera(-10, 10, 10, -10, .1, 100); camera.position.set(16, 22, 17); camera.lookAt(0, 0, 0);
  createEnvironment(); Object.entries(STATIONS).forEach(([id, meta]) => createStation(id, meta)); createPlayer(); syncWorkers(); resize();
  updateAllStationVisuals(); updateMission(); renderHud(); renderProgress();
}

function resize() {
  if (!renderer || !camera) return; const width = Math.max(1, ui.app.clientWidth); const height = Math.max(1, ui.app.clientHeight); const aspect = width / height; const viewSize = width <= MOBILE_BREAKPOINT ? (height > width ? 23 : 18) : 17.5;
  camera.left = -viewSize * aspect / 2; camera.right = viewSize * aspect / 2; camera.top = viewSize / 2; camera.bottom = -viewSize / 2; camera.updateProjectionMatrix(); renderer.setSize(width, height, false);
}

function saveGame(force = false) {
  if (!force && saveTimer < 2.3) return; saveTimer = 0;
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (error) { console.warn("Simpanan gagal", error); }
}

function updateAllStationVisuals() { Object.keys(STATIONS).forEach(updateStationVisual); ["home", "market", "workshop", "factory"].forEach(updateZoneVisual); }
function showToast(text, icon = "✦", tone = "normal") {
  const toast = document.createElement("div"); toast.className = `toast ${tone}`; toast.innerHTML = `<b>${icon}</b><span>${text}</span>`; ui.toastStack.appendChild(toast); window.setTimeout(() => { toast.classList.add("out"); window.setTimeout(() => toast.remove(), 320); }, 2300);
}

function setPaused(value) {
  runtimePaused = value; ui.pause.classList.toggle("is-hidden", !value); if (value) { ui.pauseMoney.textContent = fmtRM(state.money); ui.pauseSales.textContent = fmtRM(state.totalSales); ui.pauseWorkers.textContent = totalWorkers(); saveGame(true); }
}
function startGame() {
  audio.init(); hasStarted = true; runtimePaused = false; ui.start.classList.add("is-hidden"); ui.howOverlay.classList.add("is-hidden"); showToast(state.tutorialStep < 6 ? "Dapur sudah dibuka — ikut tanda kuning." : "Selamat kembali ke empayar.", "🌶"); audio.sfx("click"); updateMission();
}
function openProgress() { renderProgress(); ui.progress.classList.remove("is-hidden"); runtimePaused = true; }
function closeProgress() { ui.progress.classList.add("is-hidden"); runtimePaused = false; }
function openHow() { ui.howOverlay.classList.remove("is-hidden"); }

function renderHud() {
  ui.money.textContent = fmtRM(state.money); ui.reputation.textContent = Math.round(state.reputation).toLocaleString("ms-MY"); ui.carry.textContent = `${state.player.inventory.count} / ${capacity()}`;
  ui.soundIcon.textContent = state.sound ? "◖" : "⊘"; ui.musicIcon.textContent = state.music ? "♫" : "♩";
  ui.pauseMoney.textContent = fmtRM(state.money); ui.pauseSales.textContent = fmtRM(state.totalSales); ui.pauseWorkers.textContent = totalWorkers();
}

function areaProgress() { const opened = ["market", "workshop", "factory"].filter((area) => state.open[area]).length; return .22 + opened * .26 + (state.wholesaleShipped ? .12 : 0); }
function renderProgress() {
  const activeArea = state.open.factory ? "Kilang sambal" : state.open.workshop ? "Bengkel pengeluaran" : state.open.market ? "Gerai pasar malam" : "Dapur rumah"; ui.empireCopy.textContent = activeArea; ui.empireFill.style.width = pct(areaProgress()); ui.empirePercent.textContent = pct(areaProgress());
  ui.progressList.innerHTML = AREA_META.map((area, index) => {
    const isOpen = area.id === "home" || state.open[area.id]; const gate = STATIONS[`${area.id}Gate`]; const ready = gate && !isOpen && canUnlock(`${area.id}Gate`); const status = isOpen ? "DIBUKA" : ready ? "BOLEH BUKA" : "TERKUNCI";
    return `<article class="progress-item ${isOpen ? "open" : ready ? "ready" : "locked"}"><span class="progress-icon">${area.icon}</span><strong>${area.title}</strong><small>${area.copy}</small><em>${index === 0 ? "ASAS" : status}</em></article>`;
  }).join("");
  const upgrades = ["speed", "capacity", "shelf", "process", "value"]; ui.upgradeList.innerHTML = upgrades.map((key) => { const level = state.upgrades[key]; const meta = { speed: ["⚡", "Kelajuan"], capacity: ["▦", "Kapasiti"], shelf: ["▤", "Rak"], process: ["♨", "Mesin"], value: ["★", "Nilai"] }[key]; return `<div class="upgrade-card"><span>${meta[0]}</span><div><strong>${meta[1]}</strong><small>Tahap ${level} / 5</small></div></div>`; }).join("");
}

function tutorialData() {
  const steps = [
    { icon: "💵", title: "Buka kaunter pertama", copy: `Hampiri tapak kaunter · ${fmtRM(STATIONS.counterBuy.cost)}`, target: "counterBuy", check: () => state.open.counter },
    { icon: "▤", title: "Beli rak jualan", copy: `Satu rak untuk balang pertama · ${fmtRM(STATIONS.shelfBuy.cost)}`, target: "shelfBuy", check: () => state.open.shelf },
    { icon: "🌶", title: "Kutip cili dan bilis", copy: "Bawa dua timbunan bahan ke mesin yang betul.", target: "chiliSource", check: () => (state.stats.harvestedTypes.CILI || 0) > 0 && (state.stats.harvestedTypes.BILIS || 0) > 0 },
    { icon: "🍳", title: "Kacau sambal klasik", copy: "Kisar cili, campur bilis, kemudian tunggu kuali.", target: "panClassic", check: () => state.stats.cookedClassic >= 1 },
    { icon: "🫙", title: "Penuhkan rak", copy: "Bungkus sambal dan hantar balang ke rak.", target: "shelfClassic", check: () => state.stats.stockedClassic >= 1 },
    { icon: "💸", title: "Layan pelanggan pertama", copy: "Ambil wang di kaunter dan lihat dapur berkembang.", target: "counter", check: () => state.saleCount >= 1 }
  ];
  return steps[Math.min(state.tutorialStep, steps.length - 1)];
}
function updateMission() {
  const done = state.tutorialStep >= 6; const item = tutorialData(); ui.missionKicker.textContent = done ? "SASARAN SETERUSNYA" : `TUTORIAL · ${Math.min(state.tutorialStep + 1, 6)}/6`; ui.missionIcon.textContent = done ? "🏭" : item.icon; ui.missionTitle.textContent = done ? (state.open.factory ? "Hantar pesanan seluruh Malaysia" : state.open.workshop ? "Bina kilang automatik" : state.open.market ? "Buka bengkel pengeluaran" : "Buka gerai pasar malam") : item.title; ui.missionCopy.textContent = done ? (state.open.factory ? "Satu kotak borong lagi untuk penamat prototaip." : "Tapak bercahaya di dunia menunjukkan laluan seterusnya.") : item.copy;
  const target = done ? (state.open.factory ? "van" : state.open.workshop ? "factoryGate" : state.open.market ? "workshopGate" : "marketGate") : item.target; runtime.targetId = target; ui.missionDistance.textContent = target && STATIONS[target] ? `${distanceTo(STATIONS[target].pos).toFixed(0)}m` : "—"; ui.missionFill.style.width = done ? pct(areaProgress()) : `${Math.max(8, (state.tutorialStep / 6) * 100)}%`; updateAllStationVisuals();
}

function distanceTo(pos) { return Math.hypot(state.player.x - pos[0], state.player.z - pos[1]); }
function canUnlock(id) {
  const meta = STATIONS[id]; if (!meta) return false; if (meta.kind === "gate" && meta.prereq && !state.open[meta.prereq]) return false; if (meta.kind === "area" && meta.area === "workshop" && !state.open.market) return false; if (meta.kind === "area" && meta.area === "factory" && !state.open.workshop) return false;
  if (meta.kind === "area" && !meta.area) return false; return state.money >= (meta.cost || 0) && state.reputation >= (meta.reputation || 0) && state.totalSales >= (meta.sales || 0);
}
function upgradeCost(key) { const base = STATIONS[`${key}Upgrade`]?.cost || 40; return Math.round(base * (1 + state.upgrades[key] * .72)); }
function hireAvailable(meta) { return state.open[meta.area] && state.workers[meta.role] < (meta.role === "cashier" || meta.role === "delivery" ? 2 : 2); }

function updateContext() {
  let nearest = null; let best = 2.2;
  Object.entries(STATIONS).forEach(([id, meta]) => {
    const d = distanceTo(meta.pos); const gateOpen = (meta.kind === "gate" || meta.kind === "area") && state.open[meta.unlock || meta.area]; const canSee = stationEnabled(id) || (!gateOpen && (meta.kind === "gate" || meta.kind === "area")) || (meta.kind === "upgrade" && (meta.zone === "home" || state.open[meta.zone])) || (meta.kind === "hire" && state.open[meta.area]);
    if (canSee && d < best) { nearest = id; best = d; }
  });
  currentNearId = nearest;
  if (!nearest) { ui.contextIcon.textContent = "✦"; ui.contextTitle.textContent = "Gerak sahaja"; ui.contextDetail.textContent = "Hampiri stesen untuk mengutip, memasak dan menjual."; ui.contextFill.style.width = "0%"; ui.contextCard.classList.remove("alert"); return; }
  const meta = STATIONS[nearest]; let title = meta.title; let detail = meta.copy; let holdable = false;
  if (meta.kind === "gate" || meta.kind === "area") { const opened = state.open[meta.unlock || meta.area]; if (opened) { detail = "Dibuka — ruang ini milik anda."; } else { detail = canUnlock(nearest) ? `${fmtRM(meta.cost)} · Berdiri untuk buka` : `Perlu ${meta.reputation || 0} reputasi · ${meta.sales || 0} jualan`; holdable = canUnlock(nearest); } }
  else if (meta.kind === "upgrade") { const level = state.upgrades[meta.upgrade]; detail = level >= 5 ? "Tahap maksimum" : `${fmtRM(upgradeCost(meta.upgrade))} · Tahap ${level} → ${level + 1}`; holdable = level < 5 && state.money >= upgradeCost(meta.upgrade); }
  else if (meta.kind === "hire") { const level = state.workers[meta.role]; detail = level >= 2 ? "Pasukan penuh" : `${fmtRM(meta.cost)} · Ambil pekerja`; holdable = hireAvailable(meta) && state.money >= meta.cost; }
  else if (meta.kind === "source") { const inv = state.player.inventory; detail = inv.type && inv.type !== meta.key ? `Bawaan ${productName(inv.type)} penuh` : `${state.sources[meta.key] || 0} unit tersedia · hampiri untuk kutip`; }
  else if (meta.kind === "counter") { detail = state.pendingCash ? `${fmtRM(state.pendingCash)} menunggu · hampiri untuk kutip` : "Tiada wang menunggu — pelanggan sedang beratur."; }
  else if (meta.kind === "shelf") { const count = state.shelves[meta.shelf]; detail = `${count} / ${shelfCapacity()} stok · hantar ${productName(meta.accepts[0])}`; }
  else if (meta.kind === "machine") { const machine = state.machines[meta.machine]; const recipe = RECIPE[meta.machine]; const progress = machineProgress(meta.machine); detail = machine.output ? `${machine.output} output siap · kutip` : machine.inputs && Object.values(machine.inputs).some(Boolean) ? `Sedang bekerja · ${pct(progress)}` : recipe.inputs.map((type) => PRODUCT[type].short).join(" + "); }
  else if (meta.kind === "storage") { detail = `Stor: ${warehouseTotal()} unit · pekerja akan urus lebihan`; }
  else if (meta.kind === "wholesale") { detail = state.wholesale.ready ? "Kotak borong siap · kutip dan hantar" : `${state.wholesale.count} / 6 unit · satu jenis produk`; }
  else if (meta.kind === "van") { detail = state.player.inventory.type === "KOTAK_BORONG" ? "Berdiri untuk hantar · +20% bonus" : `${state.wholesale.ready} kotak menunggu`; }
  ui.contextIcon.textContent = meta.icon || "✦"; ui.contextTitle.textContent = title; ui.contextDetail.textContent = detail; ui.contextCard.classList.toggle("alert", meta.kind === "gate" && !canUnlock(nearest));
  ui.contextFill.style.width = holdable && currentNearId === nearest ? `${Math.min(100, interactionHold / .6 * 100)}%` : "0%";
}

function machineProgress(key) { const machine = state.machines[key]; const recipe = RECIPE[key]; if (!machine || !recipe) return 0; return Math.min(1, machine.progress / Math.max(.1, adjustedProcessTime(recipe.time))); }
function adjustedProcessTime(time) { return time * (1 - state.upgrades.process * .08); }
function warehouseTotal() { return Object.values(state.warehouse).reduce((sum, value) => sum + (value || 0), 0); }

function addToPlayer(type, amount = 1) {
  const inv = state.player.inventory; if (inv.type && inv.type !== type) return 0; const room = capacity() - inv.count; const moved = Math.max(0, Math.min(room, amount)); if (!moved) return 0; inv.type = type; inv.count += moved; updateCarryVisual(); renderHud(); return moved;
}
function removeFromPlayer(amount = 1) { const inv = state.player.inventory; const moved = Math.min(inv.count, amount); inv.count -= moved; if (!inv.count) inv.type = null; updateCarryVisual(); renderHud(); return moved; }
function addWarehouse(type, amount = 1) { state.warehouse[type] = (state.warehouse[type] || 0) + amount; }
function takeWarehouse(type, amount = 1) { const moved = Math.min(state.warehouse[type] || 0, amount); state.warehouse[type] = (state.warehouse[type] || 0) - moved; if (!state.warehouse[type]) delete state.warehouse[type]; return moved; }

function unlockStation(id) {
  const meta = STATIONS[id]; if (!meta || state.open[meta.unlock || meta.area] || !canUnlock(id)) return false;
  state.money -= meta.cost || 0;
  const key = meta.unlock || meta.area; state.open[key] = true;
  if (meta.kind === "area") { (AREA_STATIONS[meta.area] || []).forEach((stationId) => { state.open[stationId] = true; }); }
  if (id === "shelfBuy") state.open.shelfClassic = true;
  if (id === "counterBuy") state.open.counter = true;
  audio.sfx("unlock"); showToast(`${meta.title} dibuka!`, meta.icon || "✦");
  updateAllStationVisuals(); renderProgress(); renderHud(); saveGame(true); updateMission(); return true;
}

function harvestSource(id) {
  const meta = STATIONS[id]; if (!meta || meta.kind !== "source" || !stationEnabled(id)) return false; const moved = addToPlayer(meta.key, 1); if (!moved) return false;
  state.sources[meta.key] = Math.max(0, (state.sources[meta.key] || 0) - moved); state.stats.harvested += moved; state.stats.harvestedTypes[meta.key] = (state.stats.harvestedTypes[meta.key] || 0) + moved; audio.sfx("collect"); return true;
}

function transferOneToMachine(meta) {
  const machine = state.machines[meta.machine]; const inv = state.player.inventory; if (!machine || !inv.type || !meta.input?.includes(inv.type)) return false;
  const currentInput = machine.inputs[inv.type] || 0; if (currentInput >= 4) return false; machine.inputs[inv.type] = currentInput + 1; removeFromPlayer(1); audio.sfx("pop"); return true;
}
function collectMachineOutput(meta) {
  const machine = state.machines[meta.machine]; if (!machine?.output) return false; const moved = addToPlayer(meta.output, 1); if (!moved) return false; machine.output -= moved; audio.sfx("done"); return true;
}
function interactMachine(id) {
  const meta = STATIONS[id]; if (!meta || meta.kind !== "machine" || !stationEnabled(id)) return false; return collectMachineOutput(meta) || transferOneToMachine(meta);
}

function depositToShelf(id) {
  const meta = STATIONS[id]; if (!meta || meta.kind !== "shelf" || !stationEnabled(id)) return false; const inv = state.player.inventory; if (!inv.type || !meta.accepts.includes(inv.type)) return false; const before = state.shelves[meta.shelf] || 0; const room = shelfCapacity() - before; const moved = Math.min(room, inv.count); if (!moved) return false; state.shelves[meta.shelf] = before + moved; removeFromPlayer(moved); if (meta.shelf === "classic") state.stats.stockedClassic += moved; audio.sfx("done"); updateShelfVisual(id); showToast(`${moved} ${productName(meta.accepts[0])} di rak`, "▤"); return true;
}

function collectFromStorage() {
  const inv = state.player.inventory; const preferred = Object.keys(state.warehouse).sort((a, b) => (PRODUCT[b]?.category === "produk" ? 1 : 0) - (PRODUCT[a]?.category === "produk" ? 1 : 0));
  if (!preferred.length) return false; const type = inv.type || preferred[0]; if (!state.warehouse[type]) return false; const moved = addToPlayer(type, 1); if (!moved) return false; takeWarehouse(type, moved); audio.sfx("collect"); return true;
}
function depositToStorage() { const inv = state.player.inventory; if (!inv.type || !inv.count) return false; const moved = inv.count; addWarehouse(inv.type, moved); removeFromPlayer(moved); showToast(`${moved} ${productName(inv.type)} disimpan`, "🧺"); return true; }

function collectCash() {
  if (state.pendingCash <= 0) return false; const amount = state.pendingCash; state.money += amount; state.pendingCash = 0; audio.sfx("cash"); showToast(`+${fmtRM(amount)} masuk kaunter`, "💵"); renderHud(); saveGame(true); return true;
}

function wholesaleInteract() {
  const inv = state.player.inventory;
  if (state.wholesale.ready && !inv.type) { addToPlayer("KOTAK_BORONG", 1); state.wholesale.ready -= 1; audio.sfx("done"); showToast("Kotak borong diangkat — ke van!", "📦"); return true; }
  if (!inv.type || !["BALANG_KLASIK", "BALANG_PETAI", "PEK_GARING"].includes(inv.type)) return false;
  if (state.wholesale.type && state.wholesale.type !== inv.type) return false;
  if (state.wholesale.count >= 6) return false; state.wholesale.type = inv.type; state.wholesale.count += removeFromPlayer(1); audio.sfx("pop");
  if (state.wholesale.count >= 6) { state.wholesale.ready += 1; state.wholesale.lastType = inv.type; state.wholesale.type = null; state.wholesale.count = 0; showToast("Kotak borong lengkap! +20% bonus menunggu.", "🚚"); audio.sfx("unlock"); }
  return true;
}

function deliverWholesale() {
  if (state.player.inventory.type !== "KOTAK_BORONG") return false; const shippedType = state.wholesale.lastType || "BALANG_KLASIK"; removeFromPlayer(1); const value = Math.round((productPrice(shippedType) * 6) * 1.2); state.pendingCash += value; state.totalSales += value; state.saleCount += 1; state.reputation += 8; state.wholesaleShipped += 1; audio.sfx("cash"); showToast(`Penghantaran berjaya · +${fmtRM(value)}`, "🚚"); if (state.open.factory && !runtime.completedShown) showCompletion(); return true;
}

function performUpgrade(meta) {
  const level = state.upgrades[meta.upgrade]; if (level >= 5) return false; const cost = upgradeCost(meta.upgrade); if (state.money < cost) { audio.sfx("error"); showToast(`Perlu ${fmtRM(cost)}`, "⟐", "alert"); return false; }
  state.money -= cost; state.upgrades[meta.upgrade] += 1; audio.sfx("unlock"); showToast(`${meta.title} tahap ${level + 1}!`, meta.icon); updateCarryVisual(); renderHud(); renderProgress(); updateAllStationVisuals(); saveGame(true); return true;
}
function performHire(meta) {
  if (!hireAvailable(meta)) return false; if (state.money < meta.cost) { audio.sfx("error"); showToast(`Perlu ${fmtRM(meta.cost)}`, "⟐", "alert"); return false; }
  state.money -= meta.cost; state.workers[meta.role] += 1; audio.sfx("unlock"); showToast(`${meta.title.replace("Pekerja: ", "")} menyertai dapur!`, meta.icon); syncWorkers(); renderHud(); renderProgress(); updateAllStationVisuals(); saveGame(true); return true;
}

function performStationAction(id) {
  const meta = STATIONS[id]; if (!meta) return false;
  if (meta.kind === "gate" || meta.kind === "area") return unlockStation(id);
  if (!stationEnabled(id) && meta.kind !== "upgrade" && meta.kind !== "hire") return false;
  if (meta.kind === "source") return harvestSource(id);
  if (meta.kind === "machine") return interactMachine(id);
  if (meta.kind === "shelf") return depositToShelf(id);
  if (meta.kind === "storage") return state.player.inventory.type ? depositToStorage() : collectFromStorage();
  if (meta.kind === "wholesale") return wholesaleInteract();
  if (meta.kind === "van") return deliverWholesale();
  if (meta.kind === "upgrade") return performUpgrade(meta);
  if (meta.kind === "hire") return performHire(meta);
  if (meta.kind === "auto") return autoLineAction();
  if (meta.kind === "counter" || id === "counterBuy" || id === "counter") return collectCash();
  return false;
}

function autoLineAction() { if (!state.open.autoLine) return false; if (state.player.inventory.type) return false; const type = state.open.shelfPetai && Math.random() > .55 ? "BALANG_PETAI" : "BALANG_KLASIK"; addToPlayer(type, 1); showToast("Barisan automatik hasilkan satu balang", "⚡"); return true; }

function processMachines(dt) {
  Object.entries(RECIPE).forEach(([key, recipe]) => {
    const machine = state.machines[key]; if (!machine || !stationEnabled(key === "blender" ? "blender" : key) && !(key === "blender" || key === "panClassic" || key === "packClassic")) return;
    const ready = recipe.inputs.every((type) => (machine.inputs[type] || 0) > 0); if (!ready || machine.output >= 4) return;
    machine.progress += dt; if (machine.progress >= adjustedProcessTime(recipe.time)) { recipe.inputs.forEach((type) => { machine.inputs[type] = Math.max(0, (machine.inputs[type] || 0) - 1); }); machine.progress = 0; machine.output += 1; audio.sfx(key.includes("pan") || key === "fryer" ? "cook" : "done");
      if (recipe.output === "SAMBAL_KLASIK") state.stats.cookedClassic += 1; if (["BALANG_KLASIK", "BALANG_PETAI", "PEK_GARING"].includes(recipe.output)) state.stats.productsMade[recipe.output] = (state.stats.productsMade[recipe.output] || 0) + 1;
    }
  });
  if (state.open.autoLine) { wholesaleFlashTimer += dt; if (wholesaleFlashTimer > 5.5) { wholesaleFlashTimer = 0; addWarehouse("BALANG_KLASIK", 1); } }
  Object.keys(RECIPE).forEach(updateMachineVisual);
}

function updateMachineVisual(key) { const stationId = key === "blender" ? "blender" : key; const group = stationObjects.get(stationId); const machine = state.machines[key]; if (!group?.userData.progressFill || !machine) return; group.userData.progressFill.scale.x = machineProgress(key); }

function productMesh(parent, type, position, index = 0) {
  const info = PRODUCT[type] || PRODUCT.BALANG_KLASIK; const item = new THREE.Group(); item.position.set(...position); if (info.category === "produk") { meshCylinder(item, .13, .14, .28, info.color, [0, .14, 0], 9); meshCylinder(item, .1, .1, .035, 0xffefad, [0, .31, 0], 9); meshBox(item, [.12, .02, .09], 0xfff0c7, [0, .16, -.14]); } else { meshSphere(item, .14, info.color, [0, .14, 0], 8); }
  item.rotation.y = index * .9; parent.add(item); return item;
}
function updateShelfVisual(id) {
  const group = stationObjects.get(id); const meta = STATIONS[id]; if (!group?.userData.shelfSlots || !meta) return; const slots = group.userData.shelfSlots; while (slots.children.length) slots.remove(slots.children[0]); const type = meta.accepts[0]; const count = state.shelves[meta.shelf] || 0; for (let i = 0; i < count; i++) { const row = Math.floor(i / 4); const col = i % 4; productMesh(slots, type, [-.44 + col * .29, row * .5 + .33, 0], i); }
}

const WORKER_META = {
  gardener: { name: "Pekebun", icon: "🧑‍🌾", body: 0x2d8d70, accent: 0xf0a343 },
  kitchen: { name: "Pembantu dapur", icon: "👩‍🍳", body: 0xd86d47, accent: 0xffd16a },
  filler: { name: "Pengisi rak", icon: "🧺", body: 0x3d7f9a, accent: 0xf0c27b },
  cashier: { name: "Juruwang", icon: "🧾", body: 0x6f7fbd, accent: 0xffd16a },
  delivery: { name: "Penghantar", icon: "🚚", body: 0x7d9761, accent: 0xe5563f }
};
const STORAGE_POS = STATIONS.storage.pos;

function createWorker(role, index = 0) {
  const info = WORKER_META[role]; const group = createCharacter(info.body, info.accent); const spawn = { gardener: [5.2, -2.2], kitchen: [3.2, 3.5], filler: [10.1, 3.1], cashier: [-5.2, 7.2], delivery: [-2.8, 8.2] }[role] || [0, 0]; group.position.set(spawn[0] + index * .35, 0, spawn[1] + index * .35); group.scale.setScalar(.88); group.userData.bob = Math.random() * 9;
  const carry = new THREE.Group(); carry.position.set(0, 2.02, 0); group.add(carry); const label = document.createElement("div"); label.className = "world-label worker-label"; label.innerHTML = `<span class="label-kicker">${info.icon} ${info.name}</span>CARI TUGAS`; ui.worldLabels.appendChild(label);
  const worker = { id: `worker-${++runtime.workerSeq}`, role, group, carry, label, ai: { state: "cari", task: null, phase: 0, timer: 0, wait: index * .55, carrying: null } }; runtime.workers.push(worker); workerLabels.set(worker.id, label); worldRoot.add(group); return worker;
}
function removeWorker(worker) { worker.label.remove(); workerLabels.delete(worker.id); worldRoot.remove(worker.group); }
function syncWorkers() {
  const wanted = []; Object.entries(state.workers).forEach(([role, count]) => { for (let i = 0; i < count; i++) wanted.push(role); });
  for (let i = runtime.workers.length; i < wanted.length; i++) createWorker(wanted[i], i % 2); while (runtime.workers.length > wanted.length) removeWorker(runtime.workers.pop());
}
function moveAgent(agent, target, dt, speed = 2.2) { const dx = target[0] - agent.group.position.x; const dz = target[1] - agent.group.position.z; const distance = Math.hypot(dx, dz); if (distance < .08) return true; const step = Math.min(distance, speed * dt); agent.group.position.x += dx / distance * step; agent.group.position.z += dz / distance * step; agent.group.rotation.y = Math.atan2(dx, dz); return distance < .3; }
function stationPos(id) { return STATIONS[id]?.pos || [0, 0]; }

function chooseGardenerTask() {
  const candidates = state.open.workshop ? ["BAWANG", "CILI_KERING", "BILIS"] : state.open.market ? ["PETAI", "CILI", "BILIS"] : ["CILI", "BILIS"];
  const type = candidates.find((key) => (state.sources[key] || 0) > 0 && (state.warehouse[key] || 0) < 8); if (!type) return null;
  const sourceId = Object.keys(STATIONS).find((id) => STATIONS[id].kind === "source" && STATIONS[id].key === type && stationEnabled(id)); return sourceId ? { kind: "harvest", type, sourceId, from: stationPos(sourceId), to: STORAGE_POS } : null;
}
function chooseKitchenTask() {
  const machines = Object.entries(RECIPE).filter(([key]) => stationEnabled(key));
  for (const [key, recipe] of machines) { const machine = state.machines[key]; if (machine.output > 0 && warehouseTotal() < 16) return { kind: "collect", key, from: stationPos(key), to: STORAGE_POS, output: recipe.output }; }
  for (const [key, recipe] of machines) { const machine = state.machines[key]; const type = recipe.inputs.find((inputType) => (state.warehouse[inputType] || 0) > 0 && (machine.inputs[inputType] || 0) < 3); if (type) return { kind: "supply", key, type, from: STORAGE_POS, to: stationPos(key) }; }
  return null;
}
function chooseFillerTask() {
  const shelves = [{ id: "shelfClassic", shelf: "classic", type: "BALANG_KLASIK" }, { id: "shelfPetai", shelf: "petai", type: "BALANG_PETAI" }, { id: "shelfSnack", shelf: "snack", type: "PEK_GARING" }];
  const target = shelves.find((item) => stationEnabled(item.id) && (state.shelves[item.shelf] || 0) < shelfCapacity() && (state.warehouse[item.type] || 0) > 0); return target ? { kind: "fill", shelfId: target.id, type: target.type, from: STORAGE_POS, to: stationPos(target.id) } : null;
}
function chooseWorkerTask(worker) {
  if (worker.role === "gardener") return chooseGardenerTask();
  if (worker.role === "kitchen") return chooseKitchenTask();
  if (worker.role === "filler") return chooseFillerTask();
  if (worker.role === "cashier") return state.pendingCash > 0 && state.open.counter ? { kind: "cash", from: stationPos("counter"), to: stationPos("counter") } : null;
  if (worker.role === "delivery") return state.wholesale.ready > 0 && state.open.van ? { kind: "deliver", from: stationPos("wholesale"), to: stationPos("van") } : null;
  return null;
}
function setWorkerLabel(worker) { const names = { cari: "CARI TUGAS", bergerak: "BERGERAK", kutip: "KUTIP", hantar: "HANTAR", tunggu: "TUNGGU" }; worker.label.innerHTML = `<span class="label-kicker">${WORKER_META[worker.role].icon} ${WORKER_META[worker.role].name}</span>${names[worker.ai.state] || "TUNGGU"}`; }
function updateWorkerCarry(worker) { const signature = worker.ai.carrying || ""; if (worker.carry.userData.signature === signature) return; worker.carry.userData.signature = signature; while (worker.carry.children.length) worker.carry.remove(worker.carry.children[0]); if (!worker.ai.carrying) return; productMesh(worker.carry, worker.ai.carrying, [0, 0, 0]); }
function finishWorkerTask(worker) { worker.ai.task = null; worker.ai.phase = 0; worker.ai.timer = 0; worker.ai.carrying = null; updateWorkerCarry(worker); worker.ai.state = "tunggu"; worker.ai.wait = .35; setWorkerLabel(worker); }

function workerCompletePhase(worker) {
  const ai = worker.ai; const task = ai.task; if (!task) return;
  if (task.kind === "harvest") {
    if (ai.phase === 0) { if ((state.sources[task.type] || 0) <= 0) return finishWorkerTask(worker); state.sources[task.type] -= 1; ai.carrying = task.type; ai.phase = 1; ai.timer = 0; ai.state = "hantar"; updateWorkerCarry(worker); setWorkerLabel(worker); return; }
    if (ai.phase === 1) { addWarehouse(ai.carrying, 1); finishWorkerTask(worker); return; }
  }
  if (task.kind === "supply") {
    if (ai.phase === 0) { if (!takeWarehouse(task.type, 1)) return finishWorkerTask(worker); ai.carrying = task.type; ai.phase = 1; ai.timer = 0; ai.state = "hantar"; updateWorkerCarry(worker); setWorkerLabel(worker); return; }
    if (ai.phase === 1) { const machine = state.machines[task.key]; machine.inputs[task.type] = (machine.inputs[task.type] || 0) + 1; finishWorkerTask(worker); return; }
  }
  if (task.kind === "collect") {
    if (ai.phase === 0) { const machine = state.machines[task.key]; if (!machine.output) return finishWorkerTask(worker); machine.output -= 1; ai.carrying = task.output; ai.phase = 1; ai.timer = 0; ai.state = "hantar"; updateWorkerCarry(worker); setWorkerLabel(worker); return; }
    if (ai.phase === 1) { addWarehouse(ai.carrying, 1); finishWorkerTask(worker); return; }
  }
  if (task.kind === "fill") {
    if (ai.phase === 0) { if (!takeWarehouse(task.type, 1)) return finishWorkerTask(worker); ai.carrying = task.type; ai.phase = 1; ai.timer = 0; ai.state = "hantar"; updateWorkerCarry(worker); setWorkerLabel(worker); return; }
    if (ai.phase === 1) { const shelf = STATIONS[task.shelfId].shelf; if ((state.shelves[shelf] || 0) < shelfCapacity()) { state.shelves[shelf] += 1; if (shelf === "classic") state.stats.stockedClassic += 1; updateShelfVisual(task.shelfId); } finishWorkerTask(worker); return; }
  }
  if (task.kind === "cash") { collectCash(); finishWorkerTask(worker); return; }
  if (task.kind === "deliver") {
    if (ai.phase === 0) { if (!state.wholesale.ready) return finishWorkerTask(worker); state.wholesale.ready -= 1; ai.carrying = "KOTAK_BORONG"; ai.phase = 1; ai.timer = 0; ai.state = "hantar"; updateWorkerCarry(worker); setWorkerLabel(worker); return; }
    if (ai.phase === 1) { const value = Math.round(productPrice(state.wholesale.lastType || "BALANG_KLASIK") * 6 * 1.2); state.pendingCash += value; state.totalSales += value; state.saleCount += 1; state.reputation += 8; state.wholesaleShipped += 1; showToast(`Van pekerja tiba · ${fmtRM(value)}`, "🚚"); if (state.open.factory && !runtime.completedShown) showCompletion(); finishWorkerTask(worker); return; }
  }
}

function updateWorkers(dt) {
  runtime.workers.forEach((worker) => {
    const ai = worker.ai; if (!ai.task) { ai.wait -= dt; if (ai.wait <= 0) { ai.task = chooseWorkerTask(worker); if (ai.task) { ai.phase = 0; ai.timer = 0; ai.state = "bergerak"; setWorkerLabel(worker); } else { ai.wait = 1.5; ai.state = "tunggu"; setWorkerLabel(worker); } } }
    if (ai.task) { const target = ai.phase === 0 ? ai.task.from : ai.task.to; const arrived = moveAgent(worker, target, dt, 1.45 + state.upgrades.speed * .06); if (arrived) { ai.timer += dt; ai.state = ai.phase === 0 ? "kutip" : "hantar"; setWorkerLabel(worker); if (ai.timer >= .42) workerCompletePhase(worker); } }
    worker.group.position.y = Math.sin(gameTime * 4 + worker.group.userData.bob) * .035; updateWorkerCarry(worker);
  });
}

const CUSTOMER_PALETTE = [[0x367e78, 0xffd16a], [0xd65f45, 0x6f9e88], [0x6c72a4, 0xe7b66b], [0x488b82, 0xe5563f], [0xc07b54, 0x54b39a]];
function shelfForProduct(type) { return type === "BALANG_PETAI" ? "shelfPetai" : type === "PEK_GARING" ? "shelfSnack" : "shelfClassic"; }
function chooseCustomerProduct() {
  const options = ["BALANG_KLASIK"]; if (state.open.shelfPetai) options.push("BALANG_PETAI"); if (state.open.shelfSnack) options.push("PEK_GARING");
  if (state.shelves.classic > 0) return "BALANG_KLASIK"; return options[Math.floor(Math.random() * options.length)];
}
function createCustomer() {
  const product = chooseCustomerProduct(); const colors = CUSTOMER_PALETTE[runtime.customerSeq % CUSTOMER_PALETTE.length]; const group = createCharacter(colors[0], colors[1]); group.scale.setScalar(.78); group.position.set(16.5, 0, -8.8 + (runtime.customerSeq % 3) * .7); worldRoot.add(group);
  const label = document.createElement("div"); label.className = "world-label customer-label"; label.textContent = PRODUCT[product]?.icon || "🛍"; ui.worldLabels.appendChild(label);
  const customer = { id: `customer-${++runtime.customerSeq}`, product, group, label, phase: "enter", timer: 0, bought: false, price: productPrice(product) }; runtime.customers.push(customer); customerLabels.set(customer.id, label); return customer;
}
function removeCustomer(customer) { customer.label.remove(); customerLabels.delete(customer.id); worldRoot.remove(customer.group); const index = runtime.customers.indexOf(customer); if (index >= 0) runtime.customers.splice(index, 1); }
function customerQueue() { return runtime.customers.filter((customer) => customer.phase === "queue").sort((a, b) => a.id.localeCompare(b.id)); }
function customerQueueTarget(customer) { const index = customerQueue().indexOf(customer); return [-7.55 - Math.max(0, index) * .68, -3.35]; }
function updateCustomerLabel(customer) { const phaseText = { enter: "MASUK", browse: "PILIH", queue: "BERATUR", pay: "BAYAR", exit: "JUMPA LAGI" }[customer.phase] || ""; customer.label.textContent = `${PRODUCT[customer.product]?.icon || "🛍"} ${phaseText}`; }
function customerPays(customer) {
  const value = customer.price * (runtime.event.timer > 0 ? runtime.event.multiplier : 1); state.pendingCash += Math.round(value); state.totalSales += Math.round(value); state.saleCount += 1; state.reputation += 1; state.currentStreak += 1; state.bestStreak = Math.max(state.bestStreak, state.currentStreak); audio.sfx("cash"); if (state.saleCount % 3 === 0) showToast(`Pelanggan puas · +${fmtRM(value)}`, "💵"); if (state.currentStreak > 0 && state.currentStreak % 5 === 0) { state.pendingCash += 3; state.reputation += 2; showToast("Bonus rentetan pelanggan! +RM3", "★"); }
}
function updateCustomers(dt) {
  runtime.customers.slice().forEach((customer) => {
    const group = customer.group; group.position.y = Math.sin(gameTime * 4.2 + customer.id.length) * .025; customer.timer += dt;
    if (customer.phase === "enter") { const targetShelf = stationPos(shelfForProduct(customer.product)); const arrived = moveAgent(customer, [targetShelf[0] + 1.7, targetShelf[1] + .9], dt, 1.5); if (arrived) { customer.phase = "browse"; customer.timer = 0; updateCustomerLabel(customer); } }
    else if (customer.phase === "browse") { const shelfKey = STATIONS[shelfForProduct(customer.product)]?.shelf; const shelfOpen = stationEnabled(shelfForProduct(customer.product)); if (!shelfOpen) { customer.phase = "exit"; customer.timer = 0; state.currentStreak = 0; updateCustomerLabel(customer); } else if ((state.shelves[shelfKey] || 0) > 0) { state.shelves[shelfKey] -= 1; updateShelfVisual(shelfForProduct(customer.product)); customer.bought = true; customer.phase = "queue"; customer.timer = 0; updateCustomerLabel(customer); audio.sfx("pop"); } else if (customer.timer > 4.2) { customer.phase = "exit"; customer.timer = 0; state.currentStreak = 0; updateCustomerLabel(customer); showToast("Pelanggan mahu stok yang belum siap.", "…", "alert"); } }
    else if (customer.phase === "queue") { const target = customerQueueTarget(customer); const arrived = moveAgent(customer, target, dt, 1.32); const first = customerQueue()[0] === customer; if (first && arrived && customer.timer > .65) { customer.phase = "pay"; customer.timer = 0; updateCustomerLabel(customer); } }
    else if (customer.phase === "pay") { const arrived = moveAgent(customer, stationPos("counter"), dt, 1.2); if (arrived && customer.timer > .65) { customerPays(customer); customer.phase = "exit"; customer.timer = 0; updateCustomerLabel(customer); } }
    else if (customer.phase === "exit") { const arrived = moveAgent(customer, [18, -1.5], dt, 1.75); if (arrived || group.position.x > 18) removeCustomer(customer); }
    updateCustomerLabel(customer);
  });
}
function spawnCustomers(dt) {
  if (!hasStarted || runtimePaused || !state.open.counter || !state.open.shelf) return; runtime.spawnClock -= dt; const max = state.open.market ? 7 : 5; if (runtime.spawnClock <= 0 && runtime.customers.length < max) { createCustomer(); runtime.spawnClock = runtime.event.timer > 0 ? 1.45 : state.open.market ? 2.65 : 3.8; }
}
function updateEvents(dt) {
  if (!state.open.market) { runtime.event.title = "Buka dapur dan mula mengacau"; runtime.event.kicker = "SUASANA DAPUR"; runtime.event.timer = 0; return; }
  if (runtime.event.timer > 0) { runtime.event.timer -= dt; if (runtime.event.timer <= 0) { runtime.event.timer = 0; runtime.event.multiplier = 1; showToast("Pesanan viral reda — stok kembali stabil.", "🏮"); } }
  else { runtime.eventClock -= dt; if (runtime.eventClock <= 0) { runtime.event.timer = 24; runtime.event.multiplier = 1.35; runtime.eventClock = 68; showToast("Pesanan viral! Pelanggan mencari sambal petai.", "🔥"); audio.sfx("unlock"); } }
}

function updateEventUi() {
  const active = runtime.event.timer > 0; ui.eventBanner.classList.toggle("active", active); ui.eventKicker.textContent = active ? "PESANAN VIRAL" : state.open.market ? "SUASANA PASAR MALAM" : "SUASANA DAPUR"; ui.eventTitle.textContent = active ? "Sambal petai sedang laku keras" : state.open.factory ? "Mesin berjalan, van menunggu" : state.open.market ? "Lampu gerai menyala — pelanggan datang" : "Buka dapur dan mula mengacau"; ui.eventTimer.textContent = active ? `${Math.ceil(runtime.event.timer)}s` : "—";
}

function showCompletion() {
  runtime.completedShown = true; ui.completeSales.textContent = fmtRM(state.totalSales); ui.completeRep.textContent = Math.round(state.reputation); ui.completeProducts.textContent = `${Object.values(state.stats.productsMade).filter((value) => value > 0).length} / 3`; ui.completion.classList.remove("is-hidden"); runtimePaused = true; audio.sfx("unlock"); saveGame(true);
}

function advanceTutorial() {
  if (state.tutorialStep >= 6) return; const item = tutorialData(); if (!item.check()) return; state.tutorialStep += 1; audio.sfx("done"); if (state.tutorialStep < 6) showToast(`Sasaran selesai · ${tutorialData().title}`, tutorialData().icon); else showToast("Tutorial selesai — kini bina empayar sendiri.", "🏮"); updateMission(); renderProgress(); saveGame(true);
}

function interactNearby(dt) {
  actionCooldown = Math.max(0, actionCooldown - dt); if (!currentNearId) { interactionHold = 0; return; } const meta = STATIONS[currentNearId]; if (!meta) return;
  const holdable = meta.kind === "gate" || meta.kind === "area" ? canUnlock(currentNearId) : meta.kind === "upgrade" ? state.upgrades[meta.upgrade] < 5 && state.money >= upgradeCost(meta.upgrade) : meta.kind === "hire" ? hireAvailable(meta) && state.money >= meta.cost : false;
  if (holdable) { interactionHold += dt; if (interactionHold >= .6) { const done = performStationAction(currentNearId); interactionHold = 0; actionCooldown = .7; if (!done && meta.kind !== "upgrade" && meta.kind !== "hire") audio.sfx("error"); } }
  else { interactionHold = 0; if (actionCooldown <= 0) { const did = performStationAction(currentNearId); actionCooldown = did ? (meta.kind === "source" ? .28 : .24) : .28; } }
}

function updateMovement(dt) {
  const x = input.x || ((input.keys.has("a") || input.keys.has("arrowleft") ? -1 : 0) + (input.keys.has("d") || input.keys.has("arrowright") ? 1 : 0));
  const z = input.z || ((input.keys.has("w") || input.keys.has("arrowup") ? -1 : 0) + (input.keys.has("s") || input.keys.has("arrowdown") ? 1 : 0)); const length = Math.hypot(x, z); if (!length) return;
  const speed = 2.9 + state.upgrades.speed * .48; const nx = x / Math.max(1, length); const nz = z / Math.max(1, length); state.player.x = Math.max(WORLD_LIMITS.x[0], Math.min(WORLD_LIMITS.x[1], state.player.x + nx * speed * dt)); state.player.z = Math.max(WORLD_LIMITS.z[0], Math.min(WORLD_LIMITS.z[1], state.player.z + nz * speed * dt));
  playerObject.rotation.y = Math.atan2(nx, nz); playerObject.position.x = state.player.x; playerObject.position.z = state.player.z;
  playerObject.userData.moving = true;
}

function updatePlayerVisual(dt) {
  if (!playerObject) return; const moving = Math.abs(input.x) + Math.abs(input.z) || input.keys.size; playerObject.position.y = Math.sin(gameTime * (moving ? 9 : 3) + playerObject.userData.bob) * (moving ? .065 : .025); if (!moving) playerObject.rotation.y += Math.sin(gameTime * .5) * .0003;
}

function updateCamera(dt) {
  if (!camera || !playerObject) return; const tx = state.player.x * .26; const tz = state.player.z * .26; const current = camera.userData.focus || { x: 0, z: 0 }; current.x += (tx - current.x) * Math.min(1, dt * 3); current.z += (tz - current.z) * Math.min(1, dt * 3); camera.userData.focus = current; camera.position.set(current.x + 16, 22, current.z + 17); camera.lookAt(current.x, 0, current.z);
  if (targetBeacon) { const target = runtime.targetId && STATIONS[runtime.targetId]; targetBeacon.visible = Boolean(target && (!state.open[target.unlock || target.area] || runtime.targetId === "van")); if (target) { targetBeacon.position.set(target.pos[0], .12, target.pos[1]); targetBeacon.rotation.y += dt * 1.8; targetBeacon.children[0].scale.y = 1 + Math.sin(gameTime * 5) * .1; } }
}

function updateWorldLabels() {
  if (!camera || !renderer) return; camera.updateMatrixWorld(); const width = ui.app.clientWidth; const height = ui.app.clientHeight; const project = (pos, element, yOffset = 1.5) => { const vector = new THREE.Vector3(pos[0], yOffset, pos[1]); vector.project(camera); const x = (vector.x * .5 + .5) * width; const y = (-vector.y * .5 + .5) * height; const visible = vector.z > -1 && vector.z < 1 && x > -90 && x < width + 90 && y > -80 && y < height + 80; element.style.display = visible ? "block" : "none"; if (visible) element.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`; };
  stationLabels.forEach((label, id) => { const meta = STATIONS[id]; if (!meta) return; const gateOpen = (meta.kind === "gate" || meta.kind === "area") && state.open[meta.unlock || meta.area]; const shouldShow = runtime.targetId === id || stationEnabled(id) || (!gateOpen && (meta.kind === "gate" || meta.kind === "area")) || (meta.kind === "upgrade" && (meta.zone === "home" || state.open[meta.zone])) || (meta.kind === "hire" && state.open[meta.area]); label.style.opacity = shouldShow ? "1" : "0"; project(meta.pos, label, meta.kind === "area" ? 2.0 : 1.5); label.classList.toggle("target", runtime.targetId === id); });
  runtime.workers.forEach((worker) => project([worker.group.position.x, worker.group.position.z], worker.label, 2.25)); runtime.customers.forEach((customer) => project([customer.group.position.x, customer.group.position.z], customer.label, 1.65));
}

function updateGame(dt) {
  gameTime += dt; saveTimer += dt; updateMovement(dt); interactNearby(dt); processMachines(dt); updateWorkers(dt); updateCustomers(dt); spawnCustomers(dt); updateEvents(dt);
  const regen = gameTime % 12 < dt; if (regen) Object.keys(state.sources).forEach((key) => { state.sources[key] = Math.min(10, (state.sources[key] || 0) + 1); });
  advanceTutorial(); renderHud(); updateContext(); updateEventUi(); if (state.tutorialStep >= 6 && state.open.factory && state.wholesaleShipped > 0 && !runtime.completedShown) showCompletion(); saveGame(false);
}

function renderFrame(now) {
  const dt = Math.min(.05, Math.max(0, (now - lastFrame) / 1000)); lastFrame = now; if (!runtimePaused && hasStarted) updateGame(dt); updatePlayerVisual(dt); updateCamera(dt); updateWorldLabels(); renderer.render(scene, camera); requestAnimationFrame(renderFrame);
}

function resetJoystick() { input.x = 0; input.z = 0; input.pointerId = null; ui.joystickKnob.style.transform = "translate(-50%, -50%)"; }
function updateJoystick(clientX, clientY) { const rect = ui.joystick.getBoundingClientRect(); const cx = rect.left + rect.width / 2; const cy = rect.top + rect.height / 2; const dx = clientX - cx; const dz = clientY - cy; const radius = rect.width * .31; const distance = Math.hypot(dx, dz); const scale = Math.min(1, radius / Math.max(1, distance)); const x = dx * scale / radius; const z = dz * scale / radius; input.x = x; input.z = z; ui.joystickKnob.style.transform = `translate(calc(-50% + ${dx * scale}px), calc(-50% + ${dz * scale}px))`; }

function bindInput() {
  window.addEventListener("keydown", (event) => { const key = event.key.toLowerCase(); if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) { event.preventDefault(); input.keys.add(key); } if (key === "p" || key === "escape") { event.preventDefault(); if (hasStarted && ui.progress.classList.contains("is-hidden") && ui.howOverlay.classList.contains("is-hidden")) setPaused(!runtimePaused); } });
  window.addEventListener("keyup", (event) => input.keys.delete(event.key.toLowerCase()));
  ui.joystick.addEventListener("pointerdown", (event) => { event.preventDefault(); input.pointerId = event.pointerId; ui.joystick.setPointerCapture(event.pointerId); updateJoystick(event.clientX, event.clientY); }); ui.joystick.addEventListener("pointermove", (event) => { if (event.pointerId === input.pointerId) { event.preventDefault(); updateJoystick(event.clientX, event.clientY); } }); ui.joystick.addEventListener("pointerup", resetJoystick); ui.joystick.addEventListener("pointercancel", resetJoystick);
  ui.startButton.addEventListener("click", startGame); ui.howButton.addEventListener("click", openHow); ui.howStart.addEventListener("click", startGame); ui.howBackdrop.addEventListener("click", () => ui.howOverlay.classList.add("is-hidden")); ui.howClose.addEventListener("click", () => ui.howOverlay.classList.add("is-hidden"));
  ui.pauseButton.addEventListener("click", () => { if (hasStarted) setPaused(!runtimePaused); }); ui.resume.addEventListener("click", () => setPaused(false)); ui.restart.addEventListener("click", () => { if (!window.confirm("Mula semula dan padam kemajuan semasa?")) return; localStorage.removeItem(SAVE_KEY); window.location.reload(); });
  ui.progressButton.addEventListener("click", openProgress); ui.progressBackdrop.addEventListener("click", closeProgress); ui.progressClose.addEventListener("click", closeProgress);
  ui.soundButton.addEventListener("click", () => { audio.init(); audio.setSound(!state.sound); renderHud(); saveGame(true); }); ui.musicButton.addEventListener("click", () => { audio.init(); audio.setMusic(!state.music); renderHud(); saveGame(true); }); ui.completionClose.addEventListener("click", () => { ui.completion.classList.add("is-hidden"); runtimePaused = false; });
  window.addEventListener("resize", resize); window.addEventListener("beforeunload", () => saveGame(true)); window.addEventListener("pointerdown", () => audio.init(), { once: true });
}

function boot() {
  initScene(); bindInput(); let progress = 0; const loading = window.setInterval(() => { progress += .19; ui.loadingFill.style.width = `${Math.min(100, progress * 100)}%`; ui.loadingCopy.textContent = progress < .38 ? "Menyusun cili dan bilis segar" : progress < .72 ? "Memeriksa laluan pekerja" : "Menyalakan lampu pasar malam"; if (progress >= 1) { window.clearInterval(loading); ui.loading.classList.add("done"); ui.start.classList.remove("is-hidden"); } }, 130); requestAnimationFrame(renderFrame);
}

boot();
