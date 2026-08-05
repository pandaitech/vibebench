/* ==========================================================================
   EMPAYAR SAMBAL BILIS
   Permainan idle-arcade 3D — dari dapur rumah ke kilang sambal seluruh Malaysia.
   Semua kandungan dalam Bahasa Melayu. Mobile-first.
   ========================================================================== */

import * as THREE from './three.module.min.js';

/* ---------- Alat bantu ---------- */
const $ = (id) => document.getElementById(id);
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const rnd = (a, b) => a + Math.random() * (b - a);
const rndInt = (a, b) => Math.floor(rnd(a, b + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const fmtRM = (n) => 'RM' + Math.round(n).toLocaleString('ms-MY');
/* Bentuk pendek untuk HUD supaya nombor besar tidak memecahkan susun atur. */
function wangRingkas(n) {
  const v = Math.round(n);
  if (v >= 1000000) return (v / 1000000).toFixed(v >= 10000000 ? 0 : 1).replace('.', ',') + 'jt';
  if (v >= 100000) return (v / 1000).toFixed(0) + 'rb';
  return v.toLocaleString('ms-MY');
}
const TAU = Math.PI * 2;

const SAVE_KEY = 'empayar-sambal-bilis:opus5:v1';
const IS_TOUCH = matchMedia('(pointer: coarse)').matches;
if (!IS_TOUCH) document.body.classList.add('no-touch');

/* ==========================================================================
   1. DATA — bahan, produk, stesen, naik taraf, pekerja, misi
   ========================================================================== */

const ITEMS = {
  cili:         { nama: 'Cili merah',    ikon: '🌶', warna: 0xe0402c, bentuk: 'cili' },
  bilis:        { nama: 'Ikan bilis',    ikon: '🐟', warna: 0xe8dcbc, bentuk: 'bilis' },
  petai:        { nama: 'Petai',         ikon: '🫛', warna: 0x84b34e, bentuk: 'petai' },
  ciliKering:   { nama: 'Cili kering',   ikon: '🌶', warna: 0x912a1c, bentuk: 'cili' },
  bawang:       { nama: 'Bawang merah',  ikon: '🧅', warna: 0xb85a80, bentuk: 'bawang' },

  sambalKlasik: { nama: 'Sambal klasik', ikon: '🍲', warna: 0xb8331f, bentuk: 'periuk' },
  sambalPetai:  { nama: 'Sambal petai',  ikon: '🍲', warna: 0x6f8f3a, bentuk: 'periuk' },
  sambalGaring: { nama: 'Sambal garing', ikon: '🍲', warna: 0xd07a24, bentuk: 'periuk' },

  balangKlasik: { nama: 'Balang sambal klasik', pendek: 'Balang klasik', ikon: '🫙', warna: 0xd8402c, bentuk: 'balang', harga: 6,  produk: true },
  balangPetai:  { nama: 'Balang sambal petai',  pendek: 'Balang petai',  ikon: '🫙', warna: 0x74a33f, bentuk: 'balang', harga: 13, produk: true },
  pekGaring:    { nama: 'Pek sambal garing',    pendek: 'Pek garing',    ikon: '📦', warna: 0xf0a12e, bentuk: 'pek',    harga: 22, produk: true },
  kotakRaya:    { nama: 'Kotak hadiah raya',    pendek: 'Kotak raya',    ikon: '🎁', warna: 0xc9a227, bentuk: 'kotak',  harga: 48, produk: true },
};
const namaItem = (t) => (ITEMS[t] ? ITEMS[t].pendek || ITEMS[t].nama : '—');
const PRODUK = ['balangKlasik', 'balangPetai', 'pekGaring', 'kotakRaya'];

const KAWASAN = [
  { nama: 'Dapur Rumah',         sub: 'Satu kuali, satu impian',        x0: -27, x1: -9.5, lantai: 0x9c7a4e, pintu: -13.5 },
  { nama: 'Gerai Pasar Malam',   sub: 'Wangi sambal tarik orang ramai', x0: -9.5, x1: 6.5, lantai: 0x6f6a63, pintu: 0.5 },
  { nama: 'Bengkel Pengeluaran', sub: 'Sambal garing mula dibungkus',   x0: 6.5, x1: 22.5, lantai: 0x8a8f8b, pintu: 17 },
  { nama: 'Kilang Sambal',       sub: 'Empayar seluruh Malaysia',       x0: 22.5, x1: 40,  lantai: 0x7d8590, pintu: 31 },
];

const STESEN = [
  /* ---- Kawasan 0 · Dapur Rumah ---- */
  { id: 'kebun_cili', jenis: 'tuai', kawasan: 0, x: -23, z: -5, hasil: 'cili', kadar: 1.0, muat: 8,
    nama: 'Kebun Cili', sub: 'Petik cili merah' },
  { id: 'tong_bilis', jenis: 'tuai', kawasan: 0, x: -23, z: 3.5, hasil: 'bilis', kadar: 1.2, muat: 8,
    nama: 'Tong Ikan Bilis', sub: 'Bilis kering Pangkor' },
  { id: 'kuali_a', jenis: 'masak', kawasan: 0, x: -18, z: -5.5, resipi: { cili: 2, bilis: 1 }, hasil: 'sambalKlasik', masa: 2.6, muat: 4,
    nama: 'Kuali Sambal Klasik', sub: 'Tumis sampai pecah minyak' },
  { id: 'bungkus_a', jenis: 'bungkus', kawasan: 0, x: -18, z: 3, masuk: 'sambalKlasik', hasil: 'balangKlasik', masa: 1.5, muat: 4,
    nama: 'Meja Balang', sub: 'Isi ke dalam balang kaca' },
  { id: 'rak_a', jenis: 'rak', kawasan: 0, x: -13.5, z: -3.5, nama: 'Rak Jualan', sub: 'Pelanggan ambil sendiri' },
  { id: 'kaunter_a', jenis: 'kaunter', kawasan: 0, x: -13.5, z: 4.5, nama: 'Kaunter Bayaran', sub: 'Kutip wang di sini' },
  { id: 'pad_area1', jenis: 'tapak', kawasan: 0, x: -8.5, z: 0, kos: 120, buka: ['area1'],
    nama: 'Buka Gerai Pasar Malam', sub: 'Kawasan kedua' },

  /* ---- Kawasan 1 · Gerai Pasar Malam ---- */
  { id: 'pad_petai', jenis: 'tapak', kawasan: 1, x: -6, z: 0.5, kos: 240, buka: ['pokok_petai', 'kuali_b', 'bungkus_b'],
    nama: 'Buka Barisan Sambal Petai', sub: 'Produk kedua' },
  { id: 'pokok_petai', jenis: 'tuai', kawasan: 1, x: -6, z: -5.5, hasil: 'petai', kadar: 1.45, muat: 8, kunci: true,
    nama: 'Pokok Petai', sub: 'Petai muda segar' },
  { id: 'kuali_b', jenis: 'masak', kawasan: 1, x: -1.5, z: -5.5, resipi: { cili: 1, petai: 2, bilis: 1 }, hasil: 'sambalPetai', masa: 3.2, muat: 4, kunci: true,
    nama: 'Kuali Sambal Petai', sub: 'Wangi menusuk hidung' },
  { id: 'bungkus_b', jenis: 'bungkus', kawasan: 1, x: -1.5, z: 3, masuk: 'sambalPetai', hasil: 'balangPetai', masa: 1.8, muat: 4, kunci: true,
    nama: 'Meja Balang Petai', sub: 'Balang hijau' },
  { id: 'rak_b', jenis: 'rak', kawasan: 1, x: 3, z: -3.5, nama: 'Rak Gerai', sub: 'Rak kedua' },
  { id: 'kaunter_b', jenis: 'kaunter', kawasan: 1, x: 3, z: 4.5, nama: 'Kaunter Gerai', sub: 'Barisan kedua' },
  { id: 'pad_area2', jenis: 'tapak', kawasan: 1, x: 6.5, z: 0, kos: 750, buka: ['area2'],
    nama: 'Buka Bengkel Pengeluaran', sub: 'Kawasan ketiga' },

  /* ---- Kawasan 2 · Bengkel Pengeluaran ---- */
  { id: 'pad_garing', jenis: 'tapak', kawasan: 2, x: 9.5, z: 0.5, kos: 1200, buka: ['gudang_kering', 'kebun_bawang', 'kawah_c', 'bungkus_c'],
    nama: 'Buka Barisan Sambal Garing', sub: 'Produk ketiga' },
  { id: 'gudang_kering', jenis: 'tuai', kawasan: 2, x: 9.5, z: -5.5, hasil: 'ciliKering', kadar: 1.3, muat: 10, kunci: true,
    nama: 'Gudang Cili Kering', sub: 'Cili kering tumbuk' },
  { id: 'kebun_bawang', jenis: 'tuai', kawasan: 2, x: 9.5, z: 6.5, hasil: 'bawang', kadar: 1.3, muat: 10, kunci: true,
    nama: 'Kebun Bawang', sub: 'Bawang merah kampung' },
  { id: 'kawah_c', jenis: 'masak', kawasan: 2, x: 14, z: -5.5, resipi: { ciliKering: 2, bawang: 1, bilis: 2 }, hasil: 'sambalGaring', masa: 3.8, muat: 5, kunci: true,
    nama: 'Kawah Sambal Garing', sub: 'Goreng sampai rangup' },
  { id: 'bungkus_c', jenis: 'bungkus', kawasan: 2, x: 14, z: 3, masuk: 'sambalGaring', hasil: 'pekGaring', masa: 2.0, muat: 5, kunci: true,
    nama: 'Mesin Pek Garing', sub: 'Pek kedap udara' },
  { id: 'rak_c', jenis: 'rak', kawasan: 2, x: 18.5, z: -3.5, nama: 'Rak Bengkel', sub: 'Rak ketiga' },
  { id: 'kaunter_c', jenis: 'kaunter', kawasan: 2, x: 18.5, z: 4.5, nama: 'Kaunter Bengkel', sub: 'Barisan ketiga' },
  { id: 'pad_lori', jenis: 'tapak', kawasan: 2, x: 11.5, z: 9.5, kos: 950, buka: ['lori_borong'],
    nama: 'Buka Kontrak Borong', sub: 'Penghantaran lori' },
  { id: 'lori_borong', jenis: 'lori', kawasan: 2, x: 16, z: 9.5, kunci: true,
    nama: 'Lori Borong', sub: 'Hantar pesanan pukal' },
  { id: 'pad_area3', jenis: 'tapak', kawasan: 2, x: 22.5, z: 0, kos: 2800, buka: ['area3'],
    nama: 'Buka Kilang Sambal', sub: 'Kawasan terakhir' },

  /* ---- Kawasan 3 · Kilang Sambal ---- */
  { id: 'pad_hadiah', jenis: 'tapak', kawasan: 3, x: 25.5, z: 0.5, kos: 4500, buka: ['meja_hadiah', 'lori_nasional'],
    nama: 'Buka Meja Kotak Raya', sub: 'Produk mewah' },
  { id: 'meja_hadiah', jenis: 'masak', kawasan: 3, x: 25.5, z: -5.5, resipi: { balangKlasik: 1, balangPetai: 1, pekGaring: 1 }, hasil: 'kotakRaya', masa: 3.4, muat: 4, kunci: true,
    nama: 'Meja Kotak Raya', sub: 'Gabung tiga produk' },
  { id: 'rak_d', jenis: 'rak', kawasan: 3, x: 31.5, z: -3.5, nama: 'Rak Kilang', sub: 'Rak terakhir' },
  { id: 'kaunter_d', jenis: 'kaunter', kawasan: 3, x: 31.5, z: 4.5, nama: 'Kaunter Kilang', sub: 'Barisan terakhir' },
  { id: 'lori_nasional', jenis: 'lori', kawasan: 3, x: 29, z: 9.5, kunci: true, nasional: true,
    nama: 'Lori Nasional', sub: 'Pesanan seluruh Malaysia' },
];
const stesenDef = (id) => STESEN.find((s) => s.id === id);

const NAIK_TARAF = [
  { key: 'kapasiti', ikon: '🎒', nama: 'Beg Bahu',        max: 7, kos: (l) => Math.round(45 * Math.pow(1.9, l)),  teks: (l) => `Bawa ${3 + l} → ${4 + l} barang serentak` },
  { key: 'laju',     ikon: '👟', nama: 'Kasut Getah',     max: 5, kos: (l) => Math.round(80 * Math.pow(2.0, l)),  teks: () => 'Kelajuan berjalan +13%' },
  { key: 'mesin',    ikon: '🔥', nama: 'Api Dapur',       max: 5, kos: (l) => Math.round(140 * Math.pow(2.15, l)), teks: () => 'Semua mesin +18% pantas' },
  { key: 'rak',      ikon: '🗄️', nama: 'Rak Tambahan',    max: 4, kos: (l) => Math.round(170 * Math.pow(2.2, l)), teks: () => 'Muatan setiap rak +2' },
  { key: 'harga',    ikon: '🏷️', nama: 'Jenama Sambal',   max: 6, kos: (l) => Math.round(230 * Math.pow(2.1, l)), teks: () => 'Harga jualan +9%' },
  { key: 'pekerja',  ikon: '🎓', nama: 'Latihan Pekerja', max: 5, kos: (l) => Math.round(340 * Math.pow(2.1, l)), teks: () => 'Semua pekerja +14% pantas' },
  { key: 'baja',     ikon: '🌱', nama: 'Baja & Bekalan',  max: 4, kos: (l) => Math.round(200 * Math.pow(2.1, l)), teks: () => 'Bahan tumbuh +22% cepat' },
];

const PERANAN = [
  { key: 'pemetik',    nama: 'Pemetik Bahan', ikon: '🧺', kawasan: 0, max: 3, kos: [140, 460, 1500],
    desc: 'Petik bahan mentah dan tuang ke dalam kuali.' },
  { key: 'tukang',     nama: 'Tukang Masak',  ikon: '🍳', kawasan: 1, max: 3, kos: [400, 1300, 3400],
    desc: 'Pindah sambal dari kuali ke meja bungkus.' },
  { key: 'pembungkus', nama: 'Pembungkus',    ikon: '📦', kawasan: 1, max: 3, kos: [680, 2000, 4800],
    desc: 'Isi rak jualan dengan produk yang siap dibungkus.' },
  { key: 'juruwang',   nama: 'Juruwang',      ikon: '💵', kawasan: 2, max: 2, kos: [1600, 3800],
    desc: 'Kutip wang di kaunter dan percepat barisan.' },
  { key: 'pemandu',    nama: 'Pemandu Lori',  ikon: '🚚', kawasan: 2, max: 2, kos: [2600, 5400],
    desc: 'Muatkan pesanan borong dan pesanan nasional ke dalam lori.' },
];

const ACARA = [
  { key: 'rehat',  nama: 'Waktu Rehat Sekolah', kicker: 'ORANG RAMAI', tempoh: 34, spawn: 2.1, harga: 1,    rep: 1 },
  { key: 'viral',  nama: 'Sambal Viral di TikTok', kicker: 'JADI SEBUTAN', tempoh: 30, spawn: 1.5, harga: 1.6, rep: 1 },
  { key: 'hujan',  nama: 'Hujan Lebat Petang', kicker: 'CUACA', tempoh: 28, spawn: 0.55, harga: 1, rep: 1, mesin: 1.25 },
  { key: 'pasar',  nama: 'Malam Pasar Penuh',  kicker: 'SUASANA', tempoh: 32, spawn: 1.7, harga: 1.15, rep: 2 },
];

/* ---------- Misi & tutorial ---------- */
const MISI = [
  { k: 'TUTORIAL 1/8', t: 'Petik 3 batang cili', c: 'Berjalan ke Kebun Cili dan berdiri di situ.', i: '🌶', s: 'kebun_cili', p: () => [kira.tuai.cili || 0, 3] },
  { k: 'TUTORIAL 2/8', t: 'Ambil 2 ikan bilis', c: 'Tong bilis ada di sebelah kebun.', i: '🐟', s: 'tong_bilis', p: () => [kira.tuai.bilis || 0, 2] },
  { k: 'TUTORIAL 3/8', t: 'Tuang bahan ke dalam kuali', c: 'Berdiri di Kuali Sambal Klasik untuk menuang.', i: '🍳', s: 'kuali_a', p: () => [kira.hantar.kuali_a || 0, 3] },
  { k: 'TUTORIAL 4/8', t: 'Ambil sambal yang siap', c: 'Tunggu kuali masak, kemudian ambil sambal.', i: '🥄', s: 'kuali_a', p: () => [kira.ambil.sambalKlasik || 0, 1] },
  { k: 'TUTORIAL 5/8', t: 'Bungkus jadi balang', c: 'Hantar sambal ke Meja Balang.', i: '🫙', s: 'bungkus_a', p: () => [kira.dibuat.balangKlasik || 0, 1] },
  { k: 'TUTORIAL 6/8', t: 'Isi rak jualan', c: 'Bawa balang ke Rak Jualan.', i: '🗄️', s: 'rak_a', p: () => [kira.diisi || 0, 1] },
  { k: 'TUTORIAL 7/8', t: 'Layan pelanggan pertama', c: 'Pelanggan akan datang sendiri ke rak.', i: '🧑', s: 'kaunter_a', p: () => [kira.jualan || 0, 1] },
  { k: 'TUTORIAL 8/8', t: 'Kutip wang di kaunter', c: 'Duit bertimbun di kaunter — berdiri untuk kutip.', i: '💵', s: 'kaunter_a', p: () => [kira.kutip || 0, 1] },

  { k: 'MISI 01', t: 'Jual 8 balang sambal', c: 'Kekalkan rak sentiasa berisi.', i: '📈', s: 'rak_a', p: () => [kira.jualan || 0, 8] },
  { k: 'MISI 02', t: 'Beli satu naik taraf', c: 'Tekan butang “Taraf” di penjuru atas.', i: '⚒️', s: null, p: () => [kira.naikTaraf || 0, 1] },
  { k: 'MISI 03', t: 'Upah seorang Pemetik Bahan', c: 'Pekerja akan petik bahan tanpa henti.', i: '🧺', s: null, p: () => [state.pekerja.pemetik || 0, 1] },
  { k: 'MISI 04', t: 'Buka Gerai Pasar Malam', c: 'Berdiri atas tapak bercahaya untuk membayar.', i: '🏮', s: 'pad_area1', p: () => [state.dibuka.area1 ? 1 : 0, 1] },
  { k: 'MISI 05', t: 'Buka barisan Sambal Petai', c: 'Produk kedua bernilai lebih tinggi.', i: '🫛', s: 'pad_petai', p: () => [state.dibuka.pad_petai ? 1 : 0, 1] },
  { k: 'MISI 06', t: 'Jual 15 balang sambal petai', c: 'Isi kedua-dua rak sekali gus.', i: '🫙', s: 'rak_b', p: () => [kira.jual.balangPetai || 0, 15] },
  { k: 'MISI 07', t: 'Upah seorang Tukang Masak', c: 'Dia pindahkan sambal dari kuali ke meja.', i: '🍳', s: null, p: () => [state.pekerja.tukang || 0, 1] },
  { k: 'MISI 08', t: 'Buka Bengkel Pengeluaran', c: 'Kawasan ketiga menanti di sebelah kanan.', i: '🏭', s: 'pad_area2', p: () => [state.dibuka.area2 ? 1 : 0, 1] },
  { k: 'MISI 09', t: 'Buka barisan Sambal Garing', c: 'Cili kering + bawang + bilis.', i: '🔥', s: 'pad_garing', p: () => [state.dibuka.pad_garing ? 1 : 0, 1] },
  { k: 'MISI 10', t: 'Buka kontrak borong', c: 'Lori borong bayar lebih mahal.', i: '🚚', s: 'pad_lori', p: () => [state.dibuka.pad_lori ? 1 : 0, 1] },
  { k: 'MISI 11', t: 'Siapkan 2 pesanan borong', c: 'Muatkan produk ke dalam lori.', i: '📋', s: 'lori_borong', p: () => [kira.borong || 0, 2] },
  { k: 'MISI 12', t: 'Buka Kilang Sambal', c: 'Kawasan terakhir empayar anda.', i: '🏗️', s: 'pad_area3', p: () => [state.dibuka.area3 ? 1 : 0, 1] },
  { k: 'MISI 13', t: 'Buka Meja Kotak Raya', c: 'Gabungkan tiga produk jadi satu kotak.', i: '🎁', s: 'pad_hadiah', p: () => [state.dibuka.pad_hadiah ? 1 : 0, 1] },
  { k: 'MISI AKHIR', t: 'Hantar 8 Kotak Raya ke Lori Nasional', c: 'Pesanan terakhir untuk seluruh Malaysia.', i: '🇲🇾', s: 'lori_nasional', p: () => [kira.nasional || 0, 8] },
];
const MISI_TAMAT = { k: 'EMPAYAR TERBUKA', t: 'Kembangkan empayar sesuka hati', c: 'Semua kawasan dan produk sudah dibuka.', i: '★', s: null, p: () => [1, 1] };

/* ==========================================================================
   2. KEADAAN PERMAINAN (state) & simpanan
   ========================================================================== */

function keadaanBaharu() {
  return {
    versi: 1,
    wang: 0,
    reputasi: 0,
    jumlahJualan: 0,
    kawasan: 0,
    dibuka: {},
    bayarTapak: {},
    naikTaraf: { kapasiti: 0, laju: 0, mesin: 0, rak: 0, harga: 0, pekerja: 0, baja: 0 },
    pekerja: { pemetik: 0, tukang: 0, pembungkus: 0, juruwang: 0, pemandu: 0 },
    misi: 0,
    tamat: false,
    tetapan: { muzik: true, bunyi: true, grafikTinggi: !IS_TOUCH },
    stesen: {},
    pemain: { x: -21, z: 0 },
    pesanan: null,
    pesananNasional: 0,
    masaSimpan: 0,
  };
}

let kira = {
  tuai: {}, hantar: {}, ambil: {}, dibuat: {}, jual: {},
  diisi: 0, jualan: 0, kutip: 0, naikTaraf: 0, borong: 0, nasional: 0,
  gembira: 0, marah: 0, dihasilkan: 0,
};

let state = keadaanBaharu();
let simpanan = null;
try {
  const raw = localStorage.getItem(SAVE_KEY);
  if (raw) {
    const parsed = JSON.parse(raw);
    if (parsed && parsed.versi === 1) simpanan = parsed;
  }
} catch (e) { simpanan = null; }

function simpan() {
  if (!bermula) return;
  state.pemain = { x: pemain.mesh.position.x, z: pemain.mesh.position.z };
  state.stesen = {};
  for (const s of stesenSemua) state.stesen[s.def.id] = s.simpanKeadaan();
  state.kira = kira;
  state.masaSimpan = Date.now();
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (e) { /* penuh */ }
}

/* ==========================================================================
   3. AUDIO — kesan bunyi & muzik latar (disintesis, tiada fail luar)
   ========================================================================== */

const audio = {
  ctx: null, master: null, muzikGain: null, sfxGain: null,
  langkahSeterusnya: 0, bar: 0, jam: null, hidup: false,

  mula() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.9;
    this.master.connect(this.ctx.destination);
    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.55;
    this.sfxGain.connect(this.master);
    this.muzikGain = this.ctx.createGain();
    this.muzikGain.gain.value = 0.0;
    this.muzikGain.connect(this.master);
    this.selaras();
    this.hidup = true;
    this.langkahSeterusnya = this.ctx.currentTime + 0.1;
    this.jam = setInterval(() => this.jadual(), 90);
  },

  selaras() {
    if (!this.ctx) return;
    this.sfxGain.gain.value = state.tetapan.bunyi ? 0.55 : 0;
    const sasaran = state.tetapan.muzik ? 0.2 : 0;
    this.muzikGain.gain.setTargetAtTime(sasaran, this.ctx.currentTime, 0.4);
  },

  nada(freq, { jenis = 'triangle', mula = 0, tempoh = 0.18, kuat = 0.5, ke = null, keluar = null } = {}) {
    if (!this.ctx || !state.tetapan.bunyi) return;
    const t = this.ctx.currentTime + mula;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = jenis;
    osc.frequency.setValueAtTime(freq, t);
    if (ke) osc.frequency.exponentialRampToValueAtTime(Math.max(30, ke), t + tempoh);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(kuat, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + tempoh);
    osc.connect(g); g.connect(keluar || this.sfxGain);
    osc.start(t); osc.stop(t + tempoh + 0.03);
  },

  bising(tempoh = 0.14, kuat = 0.25, hp = 900) {
    if (!this.ctx || !state.tetapan.bunyi) return;
    const t = this.ctx.currentTime;
    const n = Math.floor(this.ctx.sampleRate * tempoh);
    const buf = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const src = this.ctx.createBufferSource(); src.buffer = buf;
    const f = this.ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = hp;
    const g = this.ctx.createGain(); g.gain.value = kuat;
    src.connect(f); f.connect(g); g.connect(this.sfxGain);
    src.start(t);
  },

  main(nama) {
    if (!this.ctx) return;
    switch (nama) {
      case 'petik':   this.nada(rnd(520, 640), { jenis: 'sine', tempoh: 0.09, kuat: 0.3, ke: 880 }); break;
      case 'letak':   this.nada(rnd(180, 220), { jenis: 'sine', tempoh: 0.11, kuat: 0.35, ke: 110 }); break;
      case 'masak':   this.bising(0.3, 0.13, 2400); break;
      case 'siap':    this.nada(660, { tempoh: 0.12, kuat: 0.32 }); this.nada(990, { mula: 0.09, tempoh: 0.16, kuat: 0.28 }); break;
      case 'jual':    this.nada(880, { tempoh: 0.1, kuat: 0.3 }); this.nada(1320, { mula: 0.08, tempoh: 0.14, kuat: 0.26 }); break;
      case 'duit':    this.nada(rnd(1000, 1250), { jenis: 'square', tempoh: 0.07, kuat: 0.18 }); this.nada(rnd(1500, 1800), { mula: 0.05, tempoh: 0.09, kuat: 0.14 }); break;
      case 'buka':    [523, 659, 784, 1047].forEach((f, i) => this.nada(f, { mula: i * 0.09, tempoh: 0.3, kuat: 0.3 })); break;
      case 'misi':    [784, 988].forEach((f, i) => this.nada(f, { mula: i * 0.1, tempoh: 0.26, kuat: 0.26 })); break;
      case 'marah':   this.nada(200, { jenis: 'sawtooth', tempoh: 0.22, kuat: 0.2, ke: 120 }); break;
      case 'tolak':   this.nada(150, { jenis: 'square', tempoh: 0.1, kuat: 0.14 }); break;
      case 'tamat':   [523, 659, 784, 1047, 1319].forEach((f, i) => this.nada(f, { mula: i * 0.13, tempoh: 0.5, kuat: 0.32 })); break;
    }
  },

  /* Muzik latar: tangga nada pentatonik seakan gamelan, lapisan bes + bilah. */
  jadual() {
    if (!this.ctx || !state.tetapan.muzik) return;
    const skala = [0, 2, 4, 7, 9];
    const asas = 55; // A1
    while (this.langkahSeterusnya < this.ctx.currentTime + 0.35) {
      const t = this.langkahSeterusnya;
      const langkah = this.bar % 16;
      if (langkah % 4 === 0) {
        const f = asas * Math.pow(2, ([0, 5, 3, 7][(this.bar >> 4) % 4]) / 12);
        this.nadaMuzik(f, t, 1.1, 0.5, 'sine');
      }
      if (langkah % 2 === 0) {
        const n = skala[(langkah / 2 + Math.floor(this.bar / 16)) % skala.length];
        this.nadaMuzik(asas * 8 * Math.pow(2, n / 12), t, 0.55, 0.16, 'triangle');
      }
      if (langkah === 6 || langkah === 14) {
        this.nadaMuzik(asas * 16 * Math.pow(2, skala[(this.bar + 3) % skala.length] / 12), t, 0.4, 0.1, 'sine');
      }
      this.langkahSeterusnya += 0.19;
      this.bar++;
    }
  },
  nadaMuzik(freq, t, tempoh, kuat, jenis) {
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = jenis;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(kuat, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + tempoh);
    osc.connect(g); g.connect(this.muzikGain);
    osc.start(t); osc.stop(t + tempoh + 0.05);
  },
};

/* ==========================================================================
   4. PERSEDIAAN 3D
   ========================================================================== */

const canvas = $('scene');
const renderer = new THREE.WebGLRenderer({
  canvas, antialias: !IS_TOUCH, powerPreference: 'high-performance', alpha: false,
});
renderer.setClearColor(0x89c7d8);
let grafikTinggi = true;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8fcbdc);
scene.fog = new THREE.Fog(0x9ed2df, 34, 96);

const camera = new THREE.PerspectiveCamera(46, 1, 0.5, 160);
camera.position.set(-16, 16, 13);

const cahayaAmbien = new THREE.HemisphereLight(0xe6f6ff, 0x86a468, 1.35);
scene.add(cahayaAmbien);
const matahari = new THREE.DirectionalLight(0xfff4d8, 1.7);
matahari.position.set(-14, 24, 12);
matahari.castShadow = true;
matahari.shadow.mapSize.set(1024, 1024);
matahari.shadow.camera.near = 1;
matahari.shadow.camera.far = 70;
matahari.shadow.camera.left = -22;
matahari.shadow.camera.right = 22;
matahari.shadow.camera.top = 22;
matahari.shadow.camera.bottom = -18;
matahari.shadow.bias = -0.0016;
scene.add(matahari);
scene.add(matahari.target);

function pasangGrafik(tinggi) {
  grafikTinggi = tinggi;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, tinggi ? 2 : 1.25));
  renderer.shadowMap.enabled = tinggi;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  matahari.castShadow = tinggi;
  scene.traverse((o) => { if (o.isMesh && o.userData.bolehBayang) o.castShadow = tinggi; });
}

/* ---------- Cache bahan & geometri ---------- */
const cacheBahan = new Map();
function bahan(warna, kasar = 0.86, rata = true, opts = {}) {
  const kunci = `${warna}|${kasar}|${rata}|${opts.transparent ? opts.opacity : ''}|${opts.emissive || ''}`;
  let m = cacheBahan.get(kunci);
  if (!m) {
    m = new THREE.MeshStandardMaterial({
      color: warna, roughness: kasar, metalness: opts.metal || 0, flatShading: rata,
      transparent: !!opts.transparent, opacity: opts.opacity != null ? opts.opacity : 1,
      emissive: opts.emissive != null ? opts.emissive : 0x000000,
      emissiveIntensity: opts.emissiveIntensity != null ? opts.emissiveIntensity : 1,
    });
    cacheBahan.set(kunci, m);
  }
  return m;
}
const cacheGeom = new Map();
function geomKotak(w, h, d) {
  const k = `b${w},${h},${d}`;
  if (!cacheGeom.has(k)) cacheGeom.set(k, new THREE.BoxGeometry(w, h, d));
  return cacheGeom.get(k);
}
function geomSilinder(rt, rb, h, seg = 10) {
  const k = `c${rt},${rb},${h},${seg}`;
  if (!cacheGeom.has(k)) cacheGeom.set(k, new THREE.CylinderGeometry(rt, rb, h, seg));
  return cacheGeom.get(k);
}
function geomSfera(r, seg = 10) {
  const k = `s${r},${seg}`;
  if (!cacheGeom.has(k)) cacheGeom.set(k, new THREE.SphereGeometry(r, seg, Math.max(6, seg - 2)));
  return cacheGeom.get(k);
}
function kotak(induk, w, h, d, warna, x = 0, y = 0, z = 0, opts = {}) {
  const m = new THREE.Mesh(geomKotak(w, h, d), bahan(warna, opts.kasar, opts.rata !== false, opts));
  m.position.set(x, y, z);
  if (opts.putar) m.rotation.set(opts.putar[0], opts.putar[1], opts.putar[2]);
  m.castShadow = opts.bayang !== false;
  m.receiveShadow = true;
  m.userData.bolehBayang = opts.bayang !== false;
  induk.add(m);
  return m;
}
function silinder(induk, rt, rb, h, warna, x = 0, y = 0, z = 0, opts = {}) {
  const m = new THREE.Mesh(geomSilinder(rt, rb, h, opts.seg || 10), bahan(warna, opts.kasar, opts.rata !== false, opts));
  m.position.set(x, y, z);
  if (opts.putar) m.rotation.set(opts.putar[0], opts.putar[1], opts.putar[2]);
  m.castShadow = opts.bayang !== false;
  m.receiveShadow = true;
  m.userData.bolehBayang = opts.bayang !== false;
  induk.add(m);
  return m;
}
function sfera(induk, r, warna, x = 0, y = 0, z = 0, opts = {}) {
  const m = new THREE.Mesh(geomSfera(r, opts.seg || 10), bahan(warna, opts.kasar, opts.rata !== false, opts));
  m.position.set(x, y, z);
  m.castShadow = opts.bayang !== false;
  m.receiveShadow = true;
  m.userData.bolehBayang = opts.bayang !== false;
  induk.add(m);
  return m;
}

/* ---------- Bayang palsu (murah, sentiasa hidup) ---------- */
const geomBayang = new THREE.CircleGeometry(0.5, 14);
const bahanBayang = new THREE.MeshBasicMaterial({ color: 0x14301f, transparent: true, opacity: 0.24, depthWrite: false });
function bayangBulat(induk, saiz = 1) {
  const m = new THREE.Mesh(geomBayang, bahanBayang);
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.02;
  m.scale.setScalar(saiz);
  induk.add(m);
  return m;
}

/* ==========================================================================
   5. MODEL BARANG (fizikal, boleh bertindan)
   ========================================================================== */

function buatBarang(jenis) {
  const d = ITEMS[jenis];
  const g = new THREE.Group();
  switch (d.bentuk) {
    case 'cili': {
      const b = silinder(g, 0.055, 0.11, 0.44, d.warna, 0, 0.22, 0, { seg: 7 });
      b.rotation.z = 0.22;
      silinder(g, 0.03, 0.045, 0.12, 0x4f8f3c, 0.03, 0.46, 0, { seg: 6 });
      break;
    }
    case 'bilis': {
      const b = kotak(g, 0.34, 0.1, 0.14, d.warna, 0, 0.07, 0);
      b.rotation.y = 0.2;
      kotak(g, 0.1, 0.13, 0.02, 0xd8c9a4, -0.19, 0.07, 0);
      break;
    }
    case 'petai': {
      const b = kotak(g, 0.46, 0.14, 0.1, d.warna, 0, 0.09, 0);
      b.rotation.z = 0.12;
      for (let i = 0; i < 3; i++) sfera(g, 0.058, 0x9ac45c, -0.13 + i * 0.13, 0.15, 0, { seg: 6 });
      break;
    }
    case 'bawang': {
      const s = sfera(g, 0.15, d.warna, 0, 0.15, 0, { seg: 8 });
      s.scale.y = 1.15;
      silinder(g, 0.012, 0.03, 0.12, 0x8f6a4a, 0, 0.32, 0, { seg: 5 });
      break;
    }
    case 'periuk': {
      silinder(g, 0.2, 0.17, 0.24, 0x4b565a, 0, 0.12, 0, { seg: 12 });
      silinder(g, 0.19, 0.19, 0.05, d.warna, 0, 0.25, 0, { seg: 12 });
      break;
    }
    case 'balang': {
      silinder(g, 0.145, 0.145, 0.34, d.warna, 0, 0.17, 0, { seg: 10, kasar: 0.35 });
      silinder(g, 0.16, 0.16, 0.06, 0xf2e3c0, 0, 0.37, 0, { seg: 10 });
      kotak(g, 0.2, 0.12, 0.005, 0xfff3d8, 0, 0.19, 0.146, { bayang: false });
      break;
    }
    case 'pek': {
      const b = kotak(g, 0.3, 0.36, 0.13, d.warna, 0, 0.18, 0);
      b.rotation.z = 0.03;
      kotak(g, 0.3, 0.07, 0.135, 0xa5651c, 0, 0.35, 0, { bayang: false });
      break;
    }
    case 'kotak': {
      kotak(g, 0.38, 0.3, 0.3, d.warna, 0, 0.15, 0);
      kotak(g, 0.4, 0.06, 0.09, 0xd8402c, 0, 0.31, 0, { bayang: false });
      kotak(g, 0.09, 0.06, 0.32, 0xd8402c, 0, 0.31, 0, { bayang: false });
      break;
    }
    default:
      sfera(g, 0.16, d.warna, 0, 0.16, 0);
  }
  g.userData.jenis = jenis;
  return g;
}

/* Kolam objek supaya tidak asyik cipta/buang mesh. */
const kolamBarang = new Map();
function ambilBarang(jenis) {
  const kolam = kolamBarang.get(jenis);
  if (kolam && kolam.length) { const o = kolam.pop(); o.visible = true; return o; }
  return buatBarang(jenis);
}
function pulangBarang(o) {
  if (!o) return;
  if (o.parent) o.parent.remove(o);
  const jenis = o.userData.jenis;
  if (!kolamBarang.has(jenis)) kolamBarang.set(jenis, []);
  const kolam = kolamBarang.get(jenis);
  if (kolam.length < 60) kolam.push(o);
}

/* Susun timbunan barang dalam satu kumpulan (grid berlapis). */
function susunTimbunan(kump, jenis, bilangan, opt = {}) {
  const lebar = opt.lebar || 2;
  const jarak = opt.jarak || 0.34;
  const tinggi = opt.tinggi || 0.34;
  const maks = opt.maks || 9;
  const n = Math.min(bilangan, maks);
  const sedia = kump.children.filter((c) => c.userData.jenis);
  if (kump.userData.jenisSemasa !== jenis) {
    for (const c of sedia.slice()) pulangBarang(c);
    kump.userData.jenisSemasa = jenis;
  }
  let ada = kump.children.filter((c) => c.userData.jenis).length;
  while (ada < n) { kump.add(ambilBarang(jenis)); ada++; }
  while (ada > n) { pulangBarang(kump.children.filter((c) => c.userData.jenis).pop()); ada--; }
  const senarai = kump.children.filter((c) => c.userData.jenis);
  senarai.forEach((o, i) => {
    const lapis = Math.floor(i / (lebar * lebar));
    const dlm = i % (lebar * lebar);
    const cx = (dlm % lebar) - (lebar - 1) / 2;
    const cz = Math.floor(dlm / lebar) - (lebar - 1) / 2;
    o.position.set(cx * jarak, lapis * tinggi, cz * jarak);
    o.rotation.y = (i * 1.7) % TAU;
    o.scale.setScalar(opt.skala || 1);
  });
}

/* ==========================================================================
   6. PAPAN TANDA & TEKS TERAPUNG (tekstur kanvas)
   ========================================================================== */

function buatKanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 2;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  return { c, ctx, tex, sprite };
}
function bulatRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

class Papan {
  constructor(lebar = 3.0) {
    const o = buatKanvas(384, 192);
    this.o = o;
    this.sprite = o.sprite;
    this.sprite.scale.set(lebar, lebar / 2, 1);
    this.terakhir = '';
  }
  lukis(tajuk, sub, aksen = '#f6b432', pecahan = -1, penuh = false) {
    const kunci = `${tajuk}|${sub}|${aksen}|${pecahan.toFixed(2)}|${penuh}`;
    if (kunci === this.terakhir) return;
    this.terakhir = kunci;
    const { ctx, c, tex } = this.o;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = penuh ? 'rgba(28,95,61,.94)' : 'rgba(11,26,21,.9)';
    bulatRect(ctx, 8, 26, 368, 118, 26); ctx.fill();
    ctx.strokeStyle = 'rgba(255,246,228,.18)'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = aksen;
    bulatRect(ctx, 8, 26, 14, 118, 7); ctx.fill();
    ctx.fillStyle = '#fff6e4';
    ctx.font = '700 34px Fredoka, "Plus Jakarta Sans", sans-serif';
    ctx.textBaseline = 'middle';
    ctx.fillText(tajuk.slice(0, 22), 38, pecahan >= 0 ? 60 : 72);
    ctx.fillStyle = aksen;
    ctx.font = '800 23px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(sub.slice(0, 26), 38, pecahan >= 0 ? 92 : 108);
    if (pecahan >= 0) {
      ctx.fillStyle = 'rgba(255,246,228,.18)';
      bulatRect(ctx, 38, 116, 310, 12, 6); ctx.fill();
      ctx.fillStyle = aksen;
      bulatRect(ctx, 38, 116, Math.max(6, 310 * clamp(pecahan, 0, 1)), 12, 6); ctx.fill();
    }
    tex.needsUpdate = true;
  }
}

const teksApung = [];
function teks3D(teks, kedudukan, warna = '#ffd75e', saiz = 1) {
  const o = buatKanvas(256, 72);
  const { ctx, c, tex } = o;
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.font = '700 46px Fredoka, "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.lineWidth = 9; ctx.strokeStyle = 'rgba(8,20,15,.85)';
  ctx.strokeText(teks, 128, 38);
  ctx.fillStyle = warna;
  ctx.fillText(teks, 128, 38);
  tex.needsUpdate = true;
  o.sprite.scale.set(2.1 * saiz, 0.6 * saiz, 1);
  o.sprite.position.copy(kedudukan);
  o.sprite.position.y += 1.4;
  scene.add(o.sprite);
  teksApung.push({ s: o.sprite, hayat: 1.15, tex, mat: o.sprite.material });
}
function kemasTeksApung(dt) {
  for (let i = teksApung.length - 1; i >= 0; i--) {
    const t = teksApung[i];
    t.hayat -= dt;
    t.s.position.y += dt * 1.5;
    t.mat.opacity = clamp(t.hayat / 0.5, 0, 1);
    if (t.hayat <= 0) {
      scene.remove(t.s);
      t.tex.dispose(); t.mat.dispose();
      teksApung.splice(i, 1);
    }
  }
}

/* Zarah kecil (asap, percikan) */
const zarah = [];
const geomZarah = new THREE.SphereGeometry(0.1, 6, 5);
function letupkan(pos, warna = 0xffd75e, bil = 8, kuasa = 2.4) {
  for (let i = 0; i < bil; i++) {
    const m = new THREE.Mesh(geomZarah, bahan(warna, 0.7, true, { transparent: true, opacity: 0.95 }).clone());
    m.position.copy(pos);
    m.material.transparent = true;
    scene.add(m);
    zarah.push({
      m,
      v: new THREE.Vector3(rnd(-1, 1) * kuasa, rnd(1.2, 2.6), rnd(-1, 1) * kuasa),
      hayat: rnd(0.5, 0.9),
    });
  }
}
function kemasZarah(dt) {
  for (let i = zarah.length - 1; i >= 0; i--) {
    const p = zarah[i];
    p.hayat -= dt;
    p.v.y -= 7 * dt;
    p.m.position.addScaledVector(p.v, dt);
    p.m.material.opacity = clamp(p.hayat * 1.6, 0, 1);
    p.m.scale.setScalar(clamp(p.hayat * 1.5, 0.2, 1));
    if (p.hayat <= 0) { scene.remove(p.m); p.m.material.dispose(); zarah.splice(i, 1); }
  }
}

/* ==========================================================================
   7. DUNIA — tanah, kawasan, hiasan kampung Malaysia
   ========================================================================== */

const HAD = { x0: -27.5, x1: 39.5, z0: -9.5, z1: 12.5 };
const kumpulanKawasan = [];

function buatTanah() {
  const tanah = new THREE.Mesh(new THREE.PlaneGeometry(180, 70), bahan(0x7cb05e, 0.96, false));
  tanah.rotation.x = -Math.PI / 2;
  tanah.position.set(8, 0, 1.5);
  tanah.receiveShadow = true;
  scene.add(tanah);

  // Jalan tanah merah di hadapan (tempat pelanggan datang)
  const jalan = new THREE.Mesh(new THREE.PlaneGeometry(78, 5.4), bahan(0xa8804f, 0.98, false));
  jalan.rotation.x = -Math.PI / 2;
  jalan.position.set(6, 0.012, 11.6);
  jalan.receiveShadow = true;
  scene.add(jalan);
}

function buatLantaiKawasan(i) {
  const a = KAWASAN[i];
  const g = new THREE.Group();
  const lebar = a.x1 - a.x0;
  const lantai = new THREE.Mesh(new THREE.BoxGeometry(lebar - 0.6, 0.22, 20), bahan(a.lantai, 0.95, false));
  lantai.position.set((a.x0 + a.x1) / 2, 0.11, 0.5);
  lantai.receiveShadow = true;
  g.add(lantai);
  // bibir tepi
  kotak(g, lebar - 0.6, 0.1, 0.35, 0x5d4327, (a.x0 + a.x1) / 2, 0.24, 10.4, { bayang: false });
  return g;
}

function pokokKelapa(g, x, z, tinggi = 4.4) {
  const p = new THREE.Group();
  p.position.set(x, 0, z);
  const batang = silinder(p, 0.15, 0.24, tinggi, 0x8a6132, 0, tinggi / 2, 0, { seg: 7 });
  batang.rotation.z = rnd(-0.06, 0.06);
  const mahkota = new THREE.Group();
  mahkota.position.y = tinggi;
  p.add(mahkota);
  for (let i = 0; i < 7; i++) {
    const sudut = (i / 7) * TAU;
    const daun = new THREE.Group();
    daun.rotation.y = sudut;
    mahkota.add(daun);
    const bilah = kotak(daun, 0.28, 0.09, 1.7, i % 2 ? 0x2f7a3f : 0x3d9147, 0, -0.28, 0.95);
    bilah.rotation.x = 0.42;
    const hujung = kotak(daun, 0.16, 0.07, 0.7, 0x2a6c38, 0, -0.72, 1.9);
    hujung.rotation.x = 0.85;
  }
  for (let i = 0; i < 3; i++) sfera(mahkota, 0.17, 0x7a5a2e, rnd(-0.25, 0.25), -0.2, rnd(-0.25, 0.25), { seg: 6 });
  bayangBulat(p, 1.7);
  g.add(p);
}

function pokokPisang(g, x, z) {
  const p = new THREE.Group();
  p.position.set(x, 0, z);
  silinder(p, 0.16, 0.22, 1.7, 0x6f8f4a, 0, 0.85, 0, { seg: 7 });
  for (let i = 0; i < 5; i++) {
    const d = kotak(p, 1.9, 0.08, 0.85, i % 2 ? 0x2e7d3a : 0x3d9147, 0, 1.7, 0);
    d.rotation.y = (i / 5) * TAU + 0.3;
    d.rotation.z = -0.42;
    d.position.x = Math.cos((i / 5) * TAU) * 0.85;
    d.position.z = Math.sin((i / 5) * TAU) * 0.85;
  }
  bayangBulat(p, 1.2);
  g.add(p);
}

function rumahKampung(g, x, z) {
  const r = new THREE.Group();
  r.position.set(x, 0, z);
  for (const [dx, dz] of [[-2.4, -1.5], [2.4, -1.5], [-2.4, 1.5], [2.4, 1.5]]) {
    silinder(r, 0.14, 0.16, 1.1, 0x6b4a25, dx, 0.55, dz, { seg: 6 });
  }
  kotak(r, 6.2, 2.5, 4.4, 0xd8b98a, 0, 2.35, 0);
  kotak(r, 6.5, 0.16, 4.7, 0x8d5a2b, 0, 1.12, 0);
  // bumbung atap
  const bumbung = new THREE.Mesh(new THREE.ConeGeometry(4.7, 1.9, 4), bahan(0xb03526, 0.9));
  bumbung.position.set(0, 4.6, 0);
  bumbung.rotation.y = Math.PI / 4;
  bumbung.castShadow = true; bumbung.userData.bolehBayang = true;
  r.add(bumbung);
  // tingkap & pintu
  kotak(r, 1.1, 1.2, 0.08, 0x8ec6d8, -1.7, 2.5, 2.22, { bayang: false });
  kotak(r, 1.1, 1.2, 0.08, 0x8ec6d8, 1.7, 2.5, 2.22, { bayang: false });
  kotak(r, 1.0, 2.0, 0.1, 0x7a4f28, 0, 2.1, 2.24, { bayang: false });
  // tangga
  for (let i = 0; i < 3; i++) kotak(r, 1.4, 0.16, 0.4, 0x9a6a38, 0, 0.28 + i * 0.3, 2.9 + i * 0.35);
  bayangBulat(r, 6);
  g.add(r);
}

function papanTanda(g, x, z, teksAtas, teksBawah, warna = 0xd8402c) {
  const p = new THREE.Group();
  p.position.set(x, 0, z);
  silinder(p, 0.09, 0.09, 2.6, 0x7a5230, -0.9, 1.3, 0, { seg: 6 });
  silinder(p, 0.09, 0.09, 2.6, 0x7a5230, 0.9, 1.3, 0, { seg: 6 });
  kotak(p, 3.0, 1.25, 0.14, warna, 0, 2.5, 0);
  const papan = new Papan(2.7);
  papan.lukis(teksAtas, teksBawah, '#ffd75e');
  papan.sprite.position.set(0, 2.5, 0.12);
  p.add(papan.sprite);
  g.add(p);
}

function khemahPasarMalam(g, x, z) {
  const k = new THREE.Group();
  k.position.set(x, 0, z);
  for (const dx of [-3.2, 3.2]) for (const dz of [-2.4, 2.4]) {
    silinder(k, 0.07, 0.07, 3.1, 0xb9c2be, dx, 1.55, dz, { seg: 6 });
  }
  for (let i = 0; i < 8; i++) {
    kotak(k, 0.86, 0.1, 5.4, i % 2 ? 0xe14b32 : 0xfff3d8, -3.0 + i * 0.86, 3.2, 0);
  }
  // lampu tali
  for (let i = 0; i < 7; i++) {
    sfera(k, 0.11, 0xffd75e, -3.0 + i * 1.0, 2.95, 2.45, { seg: 6, emissive: 0xffb020, emissiveIntensity: 0.9, bayang: false });
  }
  g.add(k);
}

function bangsalKilang(g, x, z, lebar = 12, warna = 0xb7c0c4) {
  const b = new THREE.Group();
  b.position.set(x, 0, z);
  kotak(b, lebar, 4.4, 7, warna, 0, 2.2, 0);
  for (let i = 0; i < Math.floor(lebar / 0.9); i++) {
    kotak(b, 0.8, 0.28, 7.4, i % 2 ? 0x8f9a9e : 0xa5b0b4, -lebar / 2 + 0.45 + i * 0.9, 4.5, 0);
  }
  for (let i = 0; i < 3; i++) kotak(b, 1.5, 1.1, 0.1, 0x8ec6d8, -lebar / 3 + i * (lebar / 3), 3.1, 3.55, { bayang: false });
  silinder(b, 0.5, 0.6, 3.2, 0xd8d2c4, lebar / 2 - 1.4, 5.6, -2, { seg: 8 });
  g.add(b);
}

function pagarKampung(g, x0, x1, z) {
  for (let x = x0; x <= x1; x += 1.5) {
    kotak(g, 0.12, 1.0, 0.12, 0xb08a56, x, 0.5, z);
  }
  kotak(g, x1 - x0, 0.09, 0.09, 0xc09a66, (x0 + x1) / 2, 0.78, z, { bayang: false });
  kotak(g, x1 - x0, 0.09, 0.09, 0xc09a66, (x0 + x1) / 2, 0.42, z, { bayang: false });
}

function buatHiasan() {
  const g0 = new THREE.Group(); // kawasan 0
  rumahKampung(g0, -22, -13.5);
  pokokKelapa(g0, -26.5, -11, 5.2);
  pokokKelapa(g0, -16.5, -11.5, 4.4);
  pokokPisang(g0, -11.2, -10.6);
  pokokPisang(g0, -12.4, -11.8);
  papanTanda(g0, -13.5, 8.6, 'SAMBAL BILIS', 'Buatan kampung · Halal');
  pagarKampung(g0, -27, -10, -9.2);
  kumpulanKawasan.push(g0);

  const g1 = new THREE.Group(); // kawasan 1
  khemahPasarMalam(g1, -1.5, -1.5);
  pokokKelapa(g1, -8.5, -11.5, 4.8);
  pokokKelapa(g1, 4.5, -11, 4.2);
  papanTanda(g1, 0.5, 8.6, 'PASAR MALAM', 'Setiap Khamis · Gerai 12', 0xf6b432);
  pagarKampung(g1, -9.5, 6, -9.2);
  kumpulanKawasan.push(g1);

  const g2 = new THREE.Group(); // kawasan 2
  bangsalKilang(g2, 13, -13, 15, 0xc3ccd0);
  pokokKelapa(g2, 21.5, -11.5, 4.6);
  papanTanda(g2, 17, 8.6, 'BENGKEL SAMBAL', 'Pengeluaran berlesen', 0x2f8f5b);
  pagarKampung(g2, 6.5, 22, -9.2);
  kumpulanKawasan.push(g2);

  const g3 = new THREE.Group(); // kawasan 3
  bangsalKilang(g3, 30, -14, 17, 0xaeb9c2);
  papanTanda(g3, 31, 8.6, 'KILANG SAMBAL', 'Menghantar ke 13 negeri', 0xd8402c);
  pokokKelapa(g3, 38, -11, 5.0);
  pokokKelapa(g3, 23.5, -11.5, 4.3);
  pagarKampung(g3, 22.5, 39, -9.2);
  kumpulanKawasan.push(g3);

  kumpulanKawasan.forEach((g, i) => {
    const lantai = buatLantaiKawasan(i);
    g.add(lantai);
    scene.add(g);
  });
}

/* ==========================================================================
   8. STESEN
   ========================================================================== */

const stesenSemua = [];
const stesenIkut = new Map();

const kelajuanMesin = () => (1 + 0.18 * state.naikTaraf.mesin) * (acaraSemasa && acaraSemasa.def.mesin ? acaraSemasa.def.mesin : 1);
const muatanRak = () => 4 + state.naikTaraf.rak * 2;
const kapasitiBawa = () => 3 + state.naikTaraf.kapasiti;
const hargaProduk = (jenis) => {
  const asas = ITEMS[jenis].harga;
  const jenama = 1 + 0.09 * state.naikTaraf.harga;
  const rep = 1 + Math.min(0.5, state.reputasi / 500);
  const acara = acaraSemasa ? acaraSemasa.def.harga : 1;
  return Math.max(1, Math.round(asas * jenama * rep * acara));
};

class Stesen {
  constructor(def) {
    this.def = def;
    this.group = new THREE.Group();
    this.group.position.set(def.x, 0, def.z);
    this.pos = new THREE.Vector3(def.x, 0, def.z);
    this.radius = def.jenis === 'tapak' ? 1.6 : 2.0;
    this.simpananMasuk = {};
    this.hasilAda = 0;
    this.hasilJenis = def.hasil || null;
    this.stok = {};          // untuk rak
    this.tunai = 0;          // untuk kaunter
    this.masaKerja = 0;
    this.dibayar = 0;        // untuk tapak
    this.giliran = [];       // untuk kaunter
    this.timbunan = new THREE.Group();
    this.timbunan.position.y = 0.9;
    this.group.add(this.timbunan);
    this.papan = new Papan(2.7);
    this.papan.sprite.position.set(0, 2.95, 0);
    this.group.add(this.papan.sprite);
    this.buatModel();
    scene.add(this.group);
    stesenSemua.push(this);
    stesenIkut.set(def.id, this);
  }

  /* ---------- Model ---------- */
  buatModel() {
    const g = this.group;
    const d = this.def;
    switch (d.jenis) {
      case 'tuai': {
        kotak(g, 3.0, 0.28, 2.6, 0x6b4a25, 0, 0.28, 0);
        kotak(g, 2.7, 0.2, 2.3, 0x4d3a22, 0, 0.44, 0, { bayang: false });
        const warna = ITEMS[d.hasil].warna;
        this.tanaman = new THREE.Group();
        for (let i = 0; i < 6; i++) {
          const t = new THREE.Group();
          t.position.set(-0.85 + (i % 3) * 0.85, 0.5, i < 3 ? -0.5 : 0.5);
          silinder(t, 0.05, 0.07, 0.5, 0x4f8f3c, 0, 0.25, 0, { seg: 5 });
          sfera(t, 0.2, 0x3f8a45, 0, 0.6, 0, { seg: 6 });
          const buah = sfera(t, 0.13, warna, 0.1, 0.52, 0.12, { seg: 6 });
          buah.userData.buah = true;
          this.tanaman.add(t);
        }
        g.add(this.tanaman);
        // bakul hasil
        kotak(g, 1.0, 0.5, 0.9, 0x9a6a38, 1.75, 0.25, 0);
        this.timbunan.position.set(1.75, 0.5, 0);
        break;
      }
      case 'masak': {
        kotak(g, 2.6, 0.9, 1.8, 0x5f6b6a, 0, 0.45, 0);
        kotak(g, 2.7, 0.14, 1.9, 0x8b989a, 0, 0.95, 0, { bayang: false });
        // kuali
        const kuali = new THREE.Mesh(new THREE.SphereGeometry(0.72, 14, 8, 0, TAU, Math.PI / 2, Math.PI / 2), bahan(0x3a4442, 0.7));
        kuali.position.set(0, 1.35, 0);
        kuali.castShadow = true; kuali.userData.bolehBayang = true;
        g.add(kuali);
        this.isiKuali = silinder(g, 0.6, 0.55, 0.16, ITEMS[d.hasil].warna, 0, 1.12, 0, { seg: 12, bayang: false });
        this.isiKuali.visible = false;
        // api
        this.api = new THREE.Group();
        for (let i = 0; i < 4; i++) {
          const f = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.4, 6), bahan(i % 2 ? 0xff9b2f : 0xffd75e, 0.5, true, { emissive: 0xff7a1a, emissiveIntensity: 1.2 }));
          f.position.set(rnd(-0.3, 0.3), 1.0, rnd(-0.3, 0.3));
          f.userData.asal = f.position.y;
          this.api.add(f);
        }
        this.api.visible = false;
        g.add(this.api);
        // rak bahan
        kotak(g, 0.9, 0.5, 0.9, 0x8d5a2b, -1.85, 0.25, 0);
        this.timbunan.position.set(1.85, 0.55, 0);
        kotak(g, 0.9, 0.5, 0.9, 0x8d5a2b, 1.85, 0.25, 0);
        this.timbunanMasuk = new THREE.Group();
        this.timbunanMasuk.position.set(-1.85, 0.55, 0);
        g.add(this.timbunanMasuk);
        break;
      }
      case 'bungkus': {
        kotak(g, 2.8, 0.85, 1.6, 0xa8703c, 0, 0.42, 0);
        kotak(g, 2.9, 0.14, 1.7, 0xd8b98a, 0, 0.9, 0, { bayang: false });
        kotak(g, 0.7, 1.5, 1.2, 0xb9c2be, -0.95, 1.6, 0);
        this.lengan = kotak(g, 0.24, 0.9, 0.24, 0xd8402c, -0.35, 1.5, 0);
        kotak(g, 2.0, 0.1, 0.9, 0x4e5a58, 0.55, 1.0, 0, { bayang: false });
        this.timbunanMasuk = new THREE.Group();
        this.timbunanMasuk.position.set(-1.7, 0.95, 0);
        g.add(this.timbunanMasuk);
        this.timbunan.position.set(1.05, 1.05, 0);
        break;
      }
      case 'rak': {
        kotak(g, 3.2, 0.2, 1.5, 0x8d5a2b, 0, 0.55, 0);
        kotak(g, 3.2, 0.2, 1.5, 0x8d5a2b, 0, 1.35, 0);
        kotak(g, 3.2, 0.22, 1.6, 0x7a4f28, 0, 2.15, 0);
        kotak(g, 0.2, 2.2, 1.5, 0x6b4423, -1.6, 1.1, 0);
        kotak(g, 0.2, 2.2, 1.5, 0x6b4423, 1.6, 1.1, 0);
        kotak(g, 3.2, 2.2, 0.14, 0xb08a56, 0, 1.1, -0.75);
        this.timbunan.position.set(0, 0.66, 0);
        this.timbunanAtas = new THREE.Group();
        this.timbunanAtas.position.set(0, 1.46, 0);
        g.add(this.timbunanAtas);
        break;
      }
      case 'kaunter': {
        kotak(g, 3.0, 1.05, 1.4, 0xc98f4a, 0, 0.52, 0);
        kotak(g, 3.2, 0.16, 1.6, 0xf2dcb0, 0, 1.1, 0, { bayang: false });
        kotak(g, 0.9, 0.5, 0.7, 0x3f4a48, -0.9, 1.4, 0);
        kotak(g, 0.7, 0.1, 0.5, 0x8ec6d8, -0.9, 1.68, 0, { bayang: false });
        // payung/kanopi
        for (const dx of [-1.4, 1.4]) silinder(g, 0.06, 0.06, 2.4, 0xb9c2be, dx, 1.2, -0.6, { seg: 6 });
        kotak(g, 3.4, 0.14, 1.8, 0xd8402c, 0, 2.45, -0.2, { bayang: false });
        this.timbunan.position.set(0.75, 1.18, 0);
        break;
      }
      case 'tapak': {
        const plat = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.12, 22), bahan(0x2a4a3a, 0.9));
        plat.position.y = 0.08;
        plat.receiveShadow = true;
        g.add(plat);
        this.cincin = new THREE.Mesh(new THREE.RingGeometry(1.05, 1.45, 26), new THREE.MeshBasicMaterial({ color: 0xf6b432, transparent: true, opacity: 0.75, side: THREE.DoubleSide }));
        this.cincin.rotation.x = -Math.PI / 2;
        this.cincin.position.y = 0.16;
        g.add(this.cincin);
        this.isiTapak = new THREE.Mesh(new THREE.CircleGeometry(1.05, 24), new THREE.MeshBasicMaterial({ color: 0x8ec96f, transparent: true, opacity: 0.55 }));
        this.isiTapak.rotation.x = -Math.PI / 2;
        this.isiTapak.position.y = 0.15;
        this.isiTapak.scale.setScalar(0.001);
        g.add(this.isiTapak);
        this.panah = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.7, 5), bahan(0xffd75e, 0.5, true, { emissive: 0xf6b432, emissiveIntensity: 0.7 }));
        this.panah.rotation.x = Math.PI;
        this.panah.position.y = 2.0;
        g.add(this.panah);
        this.papan.sprite.position.y = 3.1;
        break;
      }
      case 'lori': {
        const l = new THREE.Group();
        kotak(l, 3.6, 1.9, 2.3, 0xf2dcb0, 0.6, 1.5, 0);
        kotak(l, 1.9, 1.5, 2.2, d.nasional ? 0xd8402c : 0x2f8f5b, -1.9, 1.3, 0);
        kotak(l, 1.5, 0.7, 2.24, 0x8ec6d8, -2.1, 1.75, 0, { bayang: false });
        kotak(l, 5.8, 0.4, 2.4, 0x4a4f52, 0, 0.55, 0);
        for (const [dx, dz] of [[-1.9, 1.1], [-1.9, -1.1], [1.6, 1.1], [1.6, -1.1]]) {
          silinder(l, 0.42, 0.42, 0.34, 0x25292b, dx, 0.42, dz, { seg: 12, putar: [Math.PI / 2, 0, 0] });
        }
        kotak(l, 2.4, 0.7, 0.06, 0xffd75e, 0.6, 1.6, 1.17, { bayang: false });
        l.rotation.y = -Math.PI / 2;
        g.add(l);
        this.timbunan.position.set(0, 1.0, 0.4);
        break;
      }
    }
    if (this.timbunanMasuk) this.timbunanMasuk.userData.jenisSemasa = null;
  }

  /* ---------- Keadaan ---------- */
  get kelihatan() { return this.group.visible; }

  kemasKelihatan() {
    const d = this.def;
    let tampak;
    if (d.jenis === 'tapak') {
      tampak = state.kawasan >= d.kawasan && !state.dibuka[d.id];
    } else if (d.kunci) {
      tampak = !!state.dibuka[d.id];
    } else {
      tampak = state.kawasan >= d.kawasan;
    }
    this.group.visible = tampak;
  }

  simpanKeadaan() {
    return {
      masuk: this.simpananMasuk, hasil: this.hasilAda, hasilJenis: this.hasilJenis,
      stok: this.stok, tunai: Math.round(this.tunai), dibayar: this.dibayar,
    };
  }
  muatKeadaan(d) {
    if (!d) return;
    this.simpananMasuk = d.masuk || {};
    this.hasilAda = d.hasil || 0;
    if (d.hasilJenis) this.hasilJenis = d.hasilJenis;
    this.stok = d.stok || {};
    this.tunai = d.tunai || 0;
    this.dibayar = d.dibayar || 0;
  }

  /* ---------- Antara muka pemindahan ---------- */
  jumlahStok() { let n = 0; for (const k in this.stok) n += this.stok[k]; return n; }

  bolehTerima(jenis) {
    const d = this.def;
    if (!this.kelihatan) return false;
    if (d.jenis === 'masak') {
      if (!d.resipi[jenis]) return false;
      return (this.simpananMasuk[jenis] || 0) < d.resipi[jenis] * 3;
    }
    if (d.jenis === 'bungkus') return jenis === d.masuk && (this.simpananMasuk[jenis] || 0) < 6;
    if (d.jenis === 'rak') return !!ITEMS[jenis].produk && this.jumlahStok() < muatanRak();
    if (d.jenis === 'lori') {
      const p = this.pesanan();
      return !!p && p.jenis === jenis && p.siap < p.perlu;
    }
    return false;
  }
  terima(jenis) {
    if (!this.bolehTerima(jenis)) return false;
    const d = this.def;
    if (d.jenis === 'rak') {
      this.stok[jenis] = (this.stok[jenis] || 0) + 1;
      kira.diisi++;
    } else if (d.jenis === 'lori') {
      const p = this.pesanan();
      p.siap++;
      if (d.nasional) kira.nasional = p.siap;
      this.periksaPesanan();
    } else {
      this.simpananMasuk[jenis] = (this.simpananMasuk[jenis] || 0) + 1;
      kira.hantar[d.id] = (kira.hantar[d.id] || 0) + 1;
    }
    return true;
  }
  hasilSedia() {
    const d = this.def;
    if (d.jenis === 'tuai' || d.jenis === 'masak' || d.jenis === 'bungkus') {
      return this.hasilAda > 0 ? this.hasilJenis : null;
    }
    if (d.jenis === 'rak') {
      for (const k in this.stok) if (this.stok[k] > 0) return k;
    }
    return null;
  }
  keluar() {
    const d = this.def;
    if (d.jenis === 'rak') {
      const j = this.hasilSedia();
      if (!j) return null;
      this.stok[j]--;
      if (this.stok[j] <= 0) delete this.stok[j];
      return j;
    }
    if (this.hasilAda > 0) {
      this.hasilAda--;
      kira.ambil[this.hasilJenis] = (kira.ambil[this.hasilJenis] || 0) + 1;
      return this.hasilJenis;
    }
    return null;
  }
  keluarJenis(jenis) {
    if (this.def.jenis === 'rak') {
      if (!this.stok[jenis]) return null;
      this.stok[jenis]--;
      if (this.stok[jenis] <= 0) delete this.stok[jenis];
      return jenis;
    }
    if (this.hasilAda > 0 && this.hasilJenis === jenis) { this.hasilAda--; return jenis; }
    return null;
  }

  /* ---------- Pesanan lori ---------- */
  pesanan() {
    if (this.def.jenis !== 'lori') return null;
    if (this.def.nasional) {
      if (!this._pesananNasional) {
        this._pesananNasional = { jenis: 'kotakRaya', perlu: 8, siap: state.pesananNasional || 0, ganjaran: 0, rehat: 0 };
      }
      return this._pesananNasional;
    }
    if (!state.pesanan) state.pesanan = this.pesananBaharu();
    return state.pesanan;
  }
  pesananBaharu() {
    const senarai = PRODUK.filter((p) => produkDibuka(p));
    const jenis = senarai.length ? pick(senarai) : 'balangKlasik';
    const perlu = rndInt(5, 8);
    return { jenis, perlu, siap: 0, ganjaran: Math.round(hargaProduk(jenis) * perlu * 1.75), rehat: 0 };
  }
  periksaPesanan() {
    const p = this.pesanan();
    if (!p || p.siap < p.perlu) return;
    if (this.def.nasional) {
      state.pesananNasional = p.siap;
      audio.main('tamat');
      tamatkanPermainan();
      return;
    }
    tambahWang(p.ganjaran, this.pos);
    state.reputasi += 4;
    kira.borong++;
    audio.main('buka');
    letupkan(this.pos.clone().setY(1.6), 0xffd75e, 16, 3);
    toast(`Pesanan borong siap! +${fmtRM(p.ganjaran)}`, 'cash');
    state.pesanan = this.pesananBaharu();
    state.pesanan.rehat = 6;
  }

  /* ---------- Kemas kini ---------- */
  kemas(dt) {
    if (!this.kelihatan) return;
    const d = this.def;
    // Papan tanda hanya dipaparkan berhampiran pemain — dunia kekal bersih.
    const jarakPemain = pemain ? Math.hypot(this.pos.x - pemain.mesh.position.x, this.pos.z - pemain.mesh.position.z) : 0;
    this.papan.sprite.visible = jarakPemain < (d.jenis === 'tapak' ? 26 : 15);
    switch (d.jenis) {
      case 'tuai': {
        const muat = d.muat;
        if (this.hasilAda < muat) {
          this.masaKerja += dt * (1 + 0.22 * state.naikTaraf.baja);
          const perlu = d.kadar;
          if (this.masaKerja >= perlu) {
            this.masaKerja -= perlu;
            this.hasilAda++;
          }
        } else this.masaKerja = 0;
        if (this.tanaman) {
          const pecahan = this.hasilAda / muat;
          this.tanaman.children.forEach((t, i) => {
            const buah = t.children[2];
            if (buah) buah.visible = i / this.tanaman.children.length < pecahan + 0.16;
          });
        }
        susunTimbunan(this.timbunan, d.hasil, this.hasilAda, { lebar: 2, jarak: 0.3, tinggi: 0.3, skala: 0.85, maks: 8 });
        this.papan.lukis(d.nama, `${this.hasilAda}/${muat} ${namaItem(d.hasil)}`, '#8ec96f', this.hasilAda / muat);
        break;
      }
      case 'masak':
      case 'bungkus': {
        const resipi = d.jenis === 'masak' ? d.resipi : { [d.masuk]: 1 };
        const cukup = Object.keys(resipi).every((k) => (this.simpananMasuk[k] || 0) >= resipi[k]);
        const adaRuang = this.hasilAda < d.muat;
        if (this.masaKerja > 0) {
          this.masaKerja -= dt * kelajuanMesin();
          if (this.masaKerja <= 0) {
            this.masaKerja = 0;
            this.hasilAda++;
            kira.dibuat[this.hasilJenis] = (kira.dibuat[this.hasilJenis] || 0) + 1;
            kira.dihasilkan++;
            audio.main(d.jenis === 'masak' ? 'siap' : 'jual');
            letupkan(this.pos.clone().setY(1.5), ITEMS[this.hasilJenis].warna, 5, 1.3);
          }
        } else if (cukup && adaRuang) {
          for (const k in resipi) this.simpananMasuk[k] -= resipi[k];
          this.masaKerja = d.masa;
          this._masaPenuh = d.masa;
          audio.main('masak');
        }
        const bekerja = this.masaKerja > 0;
        const pecahan = bekerja ? 1 - this.masaKerja / (this._masaPenuh || d.masa) : (cukup ? 0 : -1);
        if (this.api) {
          this.api.visible = bekerja;
          if (bekerja) this.api.children.forEach((f, i) => {
            f.scale.y = 0.7 + Math.sin(jamGlobal * 12 + i) * 0.3;
            f.position.y = f.userData.asal + Math.sin(jamGlobal * 9 + i) * 0.05;
          });
        }
        if (this.isiKuali) {
          this.isiKuali.visible = bekerja;
          if (bekerja) this.isiKuali.position.y = 1.1 + Math.sin(jamGlobal * 8) * 0.02;
        }
        if (this.lengan) {
          this.lengan.position.y = 1.5 - (bekerja ? Math.abs(Math.sin(jamGlobal * 7)) * 0.45 : 0);
        }
        // timbunan masuk (papar bahan pertama yang ada)
        const masukAda = Object.keys(this.simpananMasuk).filter((k) => this.simpananMasuk[k] > 0);
        if (this.timbunanMasuk) {
          if (masukAda.length) susunTimbunan(this.timbunanMasuk, masukAda[0], this.simpananMasuk[masukAda[0]], { lebar: 2, jarak: 0.28, tinggi: 0.3, skala: 0.8, maks: 6 });
          else susunTimbunan(this.timbunanMasuk, masukAda[0] || 'cili', 0);
        }
        susunTimbunan(this.timbunan, this.hasilJenis, this.hasilAda, { lebar: 2, jarak: 0.32, tinggi: 0.34, skala: 0.9, maks: 6 });
        let sub;
        if (bekerja) sub = 'Sedang ' + (d.jenis === 'masak' ? 'menumis…' : 'membungkus…');
        else if (this.hasilAda >= d.muat) sub = 'Penuh — sila ambil';
        else sub = this.perluTeks();
        this.papan.lukis(d.nama, sub, bekerja ? '#f6b432' : '#ef5b3c', bekerja ? pecahan : -1);
        break;
      }
      case 'rak': {
        const jenisSemua = Object.keys(this.stok).filter((k) => this.stok[k] > 0);
        const bawah = jenisSemua[0], atas = jenisSemua[1];
        susunTimbunan(this.timbunan, bawah || 'balangKlasik', bawah ? Math.min(this.stok[bawah], 6) : 0, { lebar: 3, jarak: 0.5, tinggi: 0.4, skala: 0.95, maks: 6 });
        susunTimbunan(this.timbunanAtas, atas || 'balangPetai', atas ? Math.min(this.stok[atas], 6) : 0, { lebar: 3, jarak: 0.5, tinggi: 0.4, skala: 0.95, maks: 6 });
        const n = this.jumlahStok();
        this.papan.lukis(d.nama, n ? `${n}/${muatanRak()} produk` : 'Kosong — isi rak!', n ? '#8ec96f' : '#ef5b3c', n / muatanRak());
        break;
      }
      case 'kaunter': {
        susunTimbunan(this.timbunan, 'duit', 0);
        this.kemasDuit();
        const g = this.giliran.length;
        this.papan.lukis(d.nama, this.tunai > 0 ? `Kutip ${fmtRM(this.tunai)}` : (g ? `${g} pelanggan menunggu` : 'Tiada barisan'), this.tunai > 0 ? '#ffd75e' : '#8ec96f', -1);
        break;
      }
      case 'tapak': {
        const kos = d.kos;
        const baki = kos - this.dibayar;
        this.cincin.material.opacity = 0.5 + Math.sin(jamGlobal * 3) * 0.22;
        this.isiTapak.scale.setScalar(Math.max(0.001, this.dibayar / kos));
        this.panah.position.y = 2.0 + Math.sin(jamGlobal * 2.6) * 0.18;
        this.panah.rotation.y += dt * 1.4;
        const mampu = state.wang > 0;
        this.papan.lukis(d.nama, `${fmtRM(baki)} lagi`, mampu ? '#ffd75e' : '#ef5b3c', this.dibayar / kos);
        break;
      }
      case 'lori': {
        const p = this.pesanan();
        if (p.rehat > 0) { p.rehat -= dt; this.papan.lukis(d.nama, 'Menunggu pesanan baharu…', '#8ec96f', -1); susunTimbunan(this.timbunan, p.jenis, 0); break; }
        susunTimbunan(this.timbunan, p.jenis, Math.min(p.siap, 8), { lebar: 3, jarak: 0.42, tinggi: 0.38, skala: 0.85, maks: 8 });
        this.papan.lukis(d.nama, `${p.siap}/${p.perlu} ${namaItem(p.jenis)}`, d.nasional ? '#ef5b3c' : '#ffd75e', p.siap / p.perlu);
        break;
      }
    }
  }

  perluTeks() {
    const d = this.def;
    const resipi = d.jenis === 'masak' ? d.resipi : { [d.masuk]: 1 };
    const kurang = Object.keys(resipi).filter((k) => (this.simpananMasuk[k] || 0) < resipi[k]);
    if (!kurang.length) return 'Bersedia';
    return 'Perlu ' + kurang.map((k) => `${resipi[k]} ${namaItem(k).toLowerCase()}`).join(' + ');
  }

  /* Wang bertimbun di atas kaunter */
  kemasDuit() {
    if (!this.duitKump) {
      this.duitKump = new THREE.Group();
      this.duitKump.position.set(0.75, 1.18, 0.1);
      this.group.add(this.duitKump);
      this.duitMesh = [];
    }
    const bil = Math.min(8, Math.ceil(this.tunai / 12));
    while (this.duitMesh.length < bil) {
      const i = this.duitMesh.length;
      const m = kotak(this.duitKump, 0.42, 0.06, 0.26, i % 2 ? 0x7fb069 : 0xd9c46a, rnd(-0.12, 0.12), i * 0.075, rnd(-0.1, 0.1));
      m.rotation.y = rnd(-0.4, 0.4);
      this.duitMesh.push(m);
    }
    while (this.duitMesh.length > bil) {
      const m = this.duitMesh.pop();
      this.duitKump.remove(m);
    }
    this.duitKump.visible = bil > 0;
    if (bil > 0) this.duitKump.position.y = 1.18 + Math.sin(jamGlobal * 4) * 0.02;
  }
}

function produkDibuka(jenis) {
  if (jenis === 'balangKlasik') return true;
  if (jenis === 'balangPetai') return !!state.dibuka.pad_petai;
  if (jenis === 'pekGaring') return !!state.dibuka.pad_garing;
  if (jenis === 'kotakRaya') return !!state.dibuka.pad_hadiah;
  return false;
}

function binaStesen() {
  for (const d of STESEN) new Stesen(d);
}

/* ==========================================================================
   9. WATAK — pemain, pekerja, pelanggan
   ========================================================================== */

const WARNA_KULIT = [0xd9a06b, 0xc48752, 0xb0703f, 0xe8b98a, 0x9c5f34];
const WARNA_BAJU = [0xd8402c, 0x2f8f5b, 0x3c6fb0, 0xf6b432, 0x8e4fa8, 0x2b8f8f, 0xe07a3c, 0xd85f8a];

function buatWatak(opt = {}) {
  const g = new THREE.Group();
  const kulit = opt.kulit != null ? opt.kulit : pick(WARNA_KULIT);
  const baju = opt.baju != null ? opt.baju : pick(WARNA_BAJU);
  const seluar = opt.seluar != null ? opt.seluar : 0x36485c;
  const skala = opt.skala || 1;

  bayangBulat(g, 1.05);

  const badan = new THREE.Group();
  badan.position.y = 0.62;
  g.add(badan);

  // kaki (pangsi di pinggul)
  const kiriKaki = kotak(badan, 0.17, 0.55, 0.19, seluar, -0.13, 0, 0);
  const kananKaki = kotak(badan, 0.17, 0.55, 0.19, seluar, 0.13, 0, 0);
  kiriKaki.geometry = kiriKaki.geometry.clone(); kiriKaki.geometry.translate(0, -0.275, 0);
  kananKaki.geometry = kananKaki.geometry.clone(); kananKaki.geometry.translate(0, -0.275, 0);

  // torso
  kotak(badan, 0.54, 0.62, 0.32, baju, 0, 0.3, 0);
  if (opt.apron) {
    kotak(badan, 0.42, 0.5, 0.06, opt.apron, 0, 0.26, 0.17, { bayang: false });
    kotak(badan, 0.1, 0.22, 0.05, opt.apron, -0.12, 0.57, 0.16, { bayang: false });
    kotak(badan, 0.1, 0.22, 0.05, opt.apron, 0.12, 0.57, 0.16, { bayang: false });
  }
  // tangan (pangsi di bahu)
  const kiriTangan = kotak(badan, 0.14, 0.5, 0.15, kulit, -0.34, 0.55, 0);
  const kananTangan = kotak(badan, 0.14, 0.5, 0.15, kulit, 0.34, 0.55, 0);
  kiriTangan.geometry = kiriTangan.geometry.clone(); kiriTangan.geometry.translate(0, -0.25, 0);
  kananTangan.geometry = kananTangan.geometry.clone(); kananTangan.geometry.translate(0, -0.25, 0);

  // kepala
  const kepala = new THREE.Group();
  kepala.position.y = 0.68;
  badan.add(kepala);
  kotak(kepala, 0.42, 0.4, 0.38, kulit, 0, 0.2, 0);
  kotak(kepala, 0.07, 0.07, 0.03, 0x2a2320, -0.1, 0.24, 0.2, { bayang: false });
  kotak(kepala, 0.07, 0.07, 0.03, 0x2a2320, 0.1, 0.24, 0.2, { bayang: false });
  kotak(kepala, 0.14, 0.03, 0.03, 0x8a4a3a, 0, 0.11, 0.2, { bayang: false });

  switch (opt.topi) {
    case 'tudung':
      kotak(kepala, 0.5, 0.46, 0.46, opt.warnaTopi || 0xe8dcbc, 0, 0.22, -0.03, { bayang: false });
      kotak(kepala, 0.34, 0.32, 0.06, kulit, 0, 0.21, 0.21, { bayang: false });
      kotak(kepala, 0.44, 0.3, 0.28, opt.warnaTopi || 0xe8dcbc, 0, -0.08, -0.06, { bayang: false });
      break;
    case 'songkok':
      kotak(kepala, 0.44, 0.26, 0.4, 0x1f2429, 0, 0.52, 0, { bayang: false });
      break;
    case 'kopiah':
      sfera(kepala, 0.21, 0xf2ead8, 0, 0.44, 0, { seg: 8, bayang: false });
      break;
    case 'cap':
      kotak(kepala, 0.44, 0.16, 0.42, opt.warnaTopi || 0xd8402c, 0, 0.46, 0, { bayang: false });
      kotak(kepala, 0.4, 0.06, 0.22, opt.warnaTopi || 0xd8402c, 0, 0.42, 0.3, { bayang: false });
      break;
    default:
      kotak(kepala, 0.46, 0.14, 0.42, 0x2b1d16, 0, 0.44, 0, { bayang: false });
      break;
  }

  const bawaan = new THREE.Group();
  bawaan.position.y = 1.62;
  g.add(bawaan);

  g.scale.setScalar(skala);
  return {
    grup: g, badan, kepala, bawaan,
    kaki: [kiriKaki, kananKaki], tangan: [kiriTangan, kananTangan],
    fasa: Math.random() * TAU,
  };
}

function animasiWatak(w, laju, dt) {
  w.fasa += dt * (2.6 + laju * 2.2);
  const amp = clamp(laju / 3.4, 0, 1);
  const s = Math.sin(w.fasa * 2);
  w.kaki[0].rotation.x = s * 0.85 * amp;
  w.kaki[1].rotation.x = -s * 0.85 * amp;
  w.tangan[0].rotation.x = -s * 0.7 * amp;
  w.tangan[1].rotation.x = s * 0.7 * amp;
  w.badan.position.y = 0.62 + Math.abs(s) * 0.06 * amp;
  w.badan.rotation.z = s * 0.045 * amp;
}

function kemasBawaan(w, jenis, bil) {
  if (!jenis || bil <= 0) {
    if (w.bawaan.children.length) {
      for (const c of w.bawaan.children.slice()) pulangBarang(c);
      w.bawaan.userData.jenisSemasa = null;
    }
    return;
  }
  susunTimbunan(w.bawaan, jenis, bil, { lebar: 2, jarak: 0.3, tinggi: 0.33, skala: 0.9, maks: 10 });
}

/* ==========================================================================
   10. PEMAIN
   ========================================================================== */

const arahGerak = new THREE.Vector2(0, 0);
const kekunci = {};

function sudutLerp(a, b, t) {
  let d = ((b - a + Math.PI) % TAU) - Math.PI;
  if (d < -Math.PI) d += TAU;
  return a + d * t;
}
function hadKananSemasa() {
  const a = KAWASAN[Math.min(state.kawasan, 3)];
  return a.x1 + (state.kawasan === 3 ? 7 : 1.4);
}

class Pemain {
  constructor() {
    this.watak = buatWatak({ kulit: 0xd9a06b, baju: 0xf2dcb0, seluar: 0x3f5a44, topi: 'tudung', warnaTopi: 0xd8402c, apron: 0xd8402c });
    this.mesh = this.watak.grup;
    this.mesh.position.set(-21, 0, 0);
    scene.add(this.mesh);
    this.bawaJenis = null;
    this.bawaBil = 0;
    this.halaju = new THREE.Vector3();
  }
  get kelajuan() { return 5.2 * (1 + 0.13 * state.naikTaraf.laju); }

  kemas(dt) {
    const laju = this.kelajuan;
    let dx = arahGerak.x, dz = arahGerak.y;
    if (kekunci.w) dz -= 1; if (kekunci.s) dz += 1;
    if (kekunci.a) dx -= 1; if (kekunci.d) dx += 1;
    const p = Math.hypot(dx, dz);
    if (p > 1) { dx /= p; dz /= p; }
    this.halaju.x = lerp(this.halaju.x, dx * laju, 1 - Math.pow(0.0006, dt));
    this.halaju.z = lerp(this.halaju.z, dz * laju, 1 - Math.pow(0.0006, dt));
    this.mesh.position.x = clamp(this.mesh.position.x + this.halaju.x * dt, HAD.x0, hadKananSemasa());
    this.mesh.position.z = clamp(this.mesh.position.z + this.halaju.z * dt, HAD.z0, HAD.z1);
    const kelajuanSemasa = Math.hypot(this.halaju.x, this.halaju.z);
    if (kelajuanSemasa > 0.15) {
      this.mesh.rotation.y = sudutLerp(this.mesh.rotation.y, Math.atan2(this.halaju.x, this.halaju.z), 1 - Math.pow(0.0001, dt));
    }
    animasiWatak(this.watak, kelajuanSemasa, dt);
    kemasBawaan(this.watak, this.bawaJenis, this.bawaBil);
  }

  bolehAmbil(jenis) {
    if (this.bawaBil >= kapasitiBawa()) return false;
    return this.bawaJenis === null || this.bawaJenis === jenis;
  }
  ambil(jenis) {
    if (!this.bolehAmbil(jenis)) return false;
    this.bawaJenis = jenis; this.bawaBil++;
    return true;
  }
  lepas() {
    if (this.bawaBil <= 0) return null;
    const j = this.bawaJenis;
    this.bawaBil--;
    if (this.bawaBil === 0) this.bawaJenis = null;
    return j;
  }
}

/* ==========================================================================
   11. EKONOMI & MAKLUM BALAS
   ========================================================================== */

function tambahWang(jumlah, pos) {
  state.wang += jumlah;
  state.jumlahJualan += jumlah;
  if (pos) teks3D('+' + fmtRM(jumlah), pos.clone(), '#ffd75e');
  denyutStat($('stat-money'));
}
function belanja(jumlah) {
  if (state.wang < jumlah) return false;
  state.wang -= jumlah;
  denyutStat($('stat-money'));
  return true;
}
function denyutStat(el) {
  if (!el) return;
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
}
function toast(teks, jenis = '') {
  const t = document.createElement('div');
  t.className = 'toast ' + jenis;
  t.textContent = teks;
  $('toasts').appendChild(t);
  setTimeout(() => t.remove(), 2700);
  const anak = $('toasts').children;
  while (anak.length > 3) anak[0].remove();
}

/* ==========================================================================
   12. INTERAKSI PEMAIN ↔ STESEN
   ========================================================================== */

let masaTindakan = 0;
const KADAR_PINDAH = 0.11;   // saat bagi setiap barang

function stesenTerdekat(pos, jarakMaks = 2.6) {
  let terbaik = null, terdekat = jarakMaks * jarakMaks;
  for (const s of stesenSemua) {
    if (!s.kelihatan) continue;
    const dx = s.pos.x - pos.x, dz = s.pos.z - pos.z;
    const d2 = dx * dx + dz * dz;
    const had = (s.radius + 0.7) * (s.radius + 0.7);
    if (d2 < had && d2 < terdekat) { terdekat = d2; terbaik = s; }
  }
  return terbaik;
}

function kemasInteraksi(dt) {
  const s = stesenTerdekat(pemain.mesh.position);
  const kad = $('prompt');
  if (!s) {
    masaTindakan = 0;
    kad.hidden = true;
    return;
  }
  kad.hidden = false;
  masaTindakan += dt;
  let tajuk = s.def.nama, teks = s.def.sub, gaya = '', ikon = '◆', meter = -1;

  switch (s.def.jenis) {
    case 'tuai': {
      gaya = 'take'; ikon = ITEMS[s.def.hasil].ikon;
      if (!pemain.bolehAmbil(s.def.hasil)) {
        teks = pemain.bawaBil >= kapasitiBawa() ? 'Tangan penuh — hantar dahulu' : `Tangan penuh dengan ${namaItem(pemain.bawaJenis).toLowerCase()}`;
      } else if (s.hasilAda <= 0) {
        teks = 'Sedang tumbuh…';
        meter = s.masaKerja / s.def.kadar;
      } else {
        teks = `Mengutip ${namaItem(s.def.hasil).toLowerCase()}`;
        while (masaTindakan >= KADAR_PINDAH && s.hasilAda > 0 && pemain.bolehAmbil(s.def.hasil)) {
          masaTindakan -= KADAR_PINDAH;
          s.hasilAda--;
          pemain.ambil(s.def.hasil);
          kira.tuai[s.def.hasil] = (kira.tuai[s.def.hasil] || 0) + 1;
          audio.main('petik');
          denyutStat($('stat-carry'));
        }
        meter = pemain.bawaBil / kapasitiBawa();
      }
      break;
    }
    case 'masak':
    case 'bungkus': {
      const bolehBeri = pemain.bawaJenis && s.bolehTerima(pemain.bawaJenis);
      if (bolehBeri) {
        gaya = ''; ikon = '↓';
        tajuk = s.def.nama; teks = `Menuang ${namaItem(pemain.bawaJenis).toLowerCase()}`;
        while (masaTindakan >= KADAR_PINDAH && pemain.bawaBil > 0 && s.bolehTerima(pemain.bawaJenis)) {
          masaTindakan -= KADAR_PINDAH;
          const j = pemain.lepas();
          s.terima(j);
          audio.main('letak');
        }
        meter = -1;
      } else if (s.hasilAda > 0 && pemain.bolehAmbil(s.hasilJenis)) {
        gaya = 'take'; ikon = ITEMS[s.hasilJenis].ikon;
        teks = `Mengambil ${namaItem(s.hasilJenis).toLowerCase()}`;
        while (masaTindakan >= KADAR_PINDAH && s.hasilAda > 0 && pemain.bolehAmbil(s.hasilJenis)) {
          masaTindakan -= KADAR_PINDAH;
          s.keluar();
          pemain.ambil(s.hasilJenis);
          audio.main('petik');
          denyutStat($('stat-carry'));
        }
        meter = pemain.bawaBil / kapasitiBawa();
      } else {
        ikon = '⏱';
        teks = s.masaKerja > 0 ? 'Sedang diproses…' : s.perluTeks();
        meter = s.masaKerja > 0 ? 1 - s.masaKerja / (s._masaPenuh || s.def.masa) : -1;
      }
      break;
    }
    case 'rak': {
      ikon = '🗄️';
      if (pemain.bawaJenis && s.bolehTerima(pemain.bawaJenis)) {
        teks = `Menyusun ${namaItem(pemain.bawaJenis).toLowerCase()}`;
        while (masaTindakan >= KADAR_PINDAH && pemain.bawaBil > 0 && s.bolehTerima(pemain.bawaJenis)) {
          masaTindakan -= KADAR_PINDAH;
          s.terima(pemain.lepas());
          audio.main('letak');
        }
        meter = s.jumlahStok() / muatanRak();
      } else if (pemain.bawaJenis && ITEMS[pemain.bawaJenis].produk) {
        teks = 'Rak sudah penuh';
      } else {
        teks = `${s.jumlahStok()}/${muatanRak()} produk di rak`;
        meter = s.jumlahStok() / muatanRak();
      }
      break;
    }
    case 'kaunter': {
      ikon = '💵'; gaya = 'take';
      if (s.tunai > 0) {
        teks = 'Mengutip wang…';
        const kadar = 0.06;
        let dikutip = 0;
        while (masaTindakan >= kadar && s.tunai > 0) {
          masaTindakan -= kadar;
          const amaun = Math.min(s.tunai, Math.max(3, s.tunai * 0.34));
          s.tunai -= amaun;
          if (s.tunai < 1) s.tunai = 0;
          tambahWang(amaun, null);
          dikutip += amaun;
          kira.kutip++;
          audio.main('duit');
        }
        if (dikutip > 0) {
          teks3D('+' + fmtRM(dikutip), s.pos.clone().setY(1.4), '#ffd75e', 0.8);
          letupkan(s.pos.clone().setY(1.3), 0xffd75e, 3, 1.2);
        }
      } else {
        teks = s.giliran.length ? `${s.giliran.length} pelanggan dalam barisan` : 'Belum ada wang untuk dikutip';
      }
      break;
    }
    case 'lori': {
      const p = s.pesanan();
      ikon = '🚚';
      if (p.rehat > 0) { teks = 'Menunggu pesanan baharu…'; break; }
      if (pemain.bawaJenis && s.bolehTerima(pemain.bawaJenis)) {
        teks = `Memuatkan ${namaItem(p.jenis).toLowerCase()}`;
        while (masaTindakan >= KADAR_PINDAH && pemain.bawaBil > 0 && s.bolehTerima(pemain.bawaJenis)) {
          masaTindakan -= KADAR_PINDAH;
          pemain.lepas();
          s.terima(p.jenis);
          audio.main('letak');
        }
      } else {
        teks = `Perlu ${p.perlu - p.siap} ${namaItem(p.jenis).toLowerCase()} lagi`;
      }
      meter = p.siap / p.perlu;
      break;
    }
    case 'tapak': {
      gaya = 'buy'; ikon = '★';
      const baki = s.def.kos - s.dibayar;
      if (state.wang <= 0) {
        teks = `Perlu ${fmtRM(baki)} — kumpul wang dahulu`;
      } else {
        const kadar = Math.max(45, s.def.kos / 2.6);
        const bayar = Math.min(baki, state.wang, kadar * dt);
        if (bayar > 0) {
          state.wang -= bayar;
          s.dibayar += bayar;
          if (Math.random() < dt * 12) audio.main('duit');
        }
        teks = `Membayar… ${fmtRM(baki)} lagi`;
        if (s.dibayar >= s.def.kos - 0.5) bukaTapak(s);
      }
      meter = s.dibayar / s.def.kos;
      break;
    }
  }

  $('prompt-title').textContent = tajuk;
  $('prompt-copy').textContent = teks;
  $('prompt-icon').textContent = ikon;
  kad.className = 'prompt ' + gaya;
  $('prompt-fill').style.height = meter >= 0 ? `${clamp(meter, 0, 1) * 100}%` : '0%';
  if (masaTindakan > 0.6) masaTindakan = 0.6;
}

function bukaTapak(s) {
  state.dibuka[s.def.id] = true;
  s.dibayar = s.def.kos;
  for (const sasaran of s.def.buka) {
    if (sasaran.startsWith('area')) {
      const idx = parseInt(sasaran.slice(4), 10);
      state.kawasan = Math.max(state.kawasan, idx);
      state.dibuka[sasaran] = true;
      toast(`${KAWASAN[idx].nama} dibuka!`, 'good');
    } else {
      state.dibuka[sasaran] = true;
    }
  }
  audio.main('buka');
  letupkan(s.pos.clone().setY(1), 0xffd75e, 22, 4);
  kamera.tumpu(s.pos.clone(), 1.4);
  kemasSemuaKelihatan();
  kemasPanelKedai();
  toast(`${s.def.nama.replace('Buka ', '')} dibuka!`, 'good');
  simpan();
}

function kemasSemuaKelihatan() {
  for (const s of stesenSemua) s.kemasKelihatan();
  kumpulanKawasan.forEach((g, i) => { g.visible = i <= state.kawasan; });
}

/* ==========================================================================
   13. PEKERJA (AI)
   ========================================================================== */

const pekerjaSemua = [];
const WARNA_PERANAN = {
  pemetik: 0x8ec96f, tukang: 0xf6b432, pembungkus: 0x3c9ad8, juruwang: 0xffd75e, pemandu: 0xd8402c,
};

class Pekerja {
  constructor(peranan, indeks) {
    this.peranan = peranan;
    this.watak = buatWatak({
      baju: WARNA_PERANAN[peranan], seluar: 0x2f3a45,
      topi: peranan === 'juruwang' ? 'songkok' : indeks % 2 ? 'tudung' : 'cap',
      warnaTopi: WARNA_PERANAN[peranan], apron: 0x1c5f3d, skala: 0.96,
    });
    this.mesh = this.watak.grup;
    const asal = stesenIkut.get('kuali_a');
    this.mesh.position.set(asal.pos.x + rnd(-2, 2), 0, asal.pos.z + rnd(2, 3.5));
    scene.add(this.mesh);
    this.bawaJenis = null;
    this.bawaBil = 0;
    this.tugas = null;
    this.fasaTugas = 'cari';
    this.masaCari = rnd(0, 0.5);
    this.masaTindakan = 0;
    pekerjaSemua.push(this);
  }
  get kelajuan() { return 4.1 * (1 + 0.14 * state.naikTaraf.pekerja); }
  get muatan() { return 6 + Math.floor(state.naikTaraf.pekerja / 2) + Math.floor(state.naikTaraf.kapasiti / 3); }

  buang() {
    scene.remove(this.mesh);
    const i = pekerjaSemua.indexOf(this);
    if (i >= 0) pekerjaSemua.splice(i, 1);
  }

  kemas(dt) {
    switch (this.fasaTugas) {
      case 'cari':
        this.masaCari -= dt;
        if (this.masaCari <= 0) {
          this.masaCari = 0.35;
          if (this.bawaBil > 0) {
            // Masih memegang barang: cari mana-mana tempat yang boleh menerimanya.
            const dst = this.cariSasaranUntuk(this.bawaJenis);
            if (dst) { this.tugas = { sumber: null, sasaran: dst, jenis: this.bawaJenis }; this.fasaTugas = 'ke_sasaran'; }
            else { this.bawaBil = 0; this.bawaJenis = null; }   // tiada tempat — lepaskan
          } else {
            this.tugas = cariTugas(this.peranan, this);
            if (this.tugas) this.fasaTugas = this.tugas.fasa || 'ke_sumber';
          }
        }
        this.gerakKe(null, dt);
        break;

      case 'ke_sumber': {
        const t = this.tugas;
        if (!t || !t.sumber || !t.sumber.kelihatan) { this.batal(); break; }
        if (this.gerakKe(t.sumber.pos, dt)) {
          this.masaTindakan += dt;
          const kadar = KADAR_PINDAH * 0.85;
          while (this.masaTindakan >= kadar && this.bawaBil < this.muatan) {
            const j = t.sumber.keluarJenis(t.jenis);
            if (!j) break;
            this.masaTindakan -= kadar;
            this.bawaJenis = j; this.bawaBil++;
          }
          if (this.bawaBil >= this.muatan || (this.bawaBil > 0 && !this.adaLagi(t))) {
            this.fasaTugas = 'ke_sasaran';
            this.masaTindakan = 0;
          } else if (this.bawaBil === 0 && !this.adaLagi(t)) {
            this.batal();
          }
        }
        break;
      }

      case 'ke_sasaran': {
        const t = this.tugas;
        if (!t || !t.sasaran.kelihatan) { this.batal(); break; }
        if (this.gerakKe(t.sasaran.pos, dt)) {
          this.masaTindakan += dt;
          const kadar = KADAR_PINDAH * 0.85;
          while (this.masaTindakan >= kadar && this.bawaBil > 0 && t.sasaran.bolehTerima(this.bawaJenis)) {
            this.masaTindakan -= kadar;
            t.sasaran.terima(this.bawaJenis);
            this.bawaBil--;
            if (this.bawaBil === 0) this.bawaJenis = null;
          }
          if (this.bawaBil === 0 || !t.sasaran.bolehTerima(this.bawaJenis)) {
            this.tugas = null;
            this.fasaTugas = 'cari';
            this.masaCari = this.bawaBil === 0 ? 0.15 : 0.3;
          }
        }
        break;
      }

      case 'kaunter': {
        const t = this.tugas;
        if (!t || !t.sumber.kelihatan) { this.batal(); break; }
        if (this.gerakKe(t.sumber.pos, dt)) {
          const s = t.sumber;
          if (s.tunai > 0) {
            const amaun = Math.min(s.tunai, 55 * dt + 4 * dt * state.naikTaraf.pekerja);
            s.tunai -= amaun;
            if (s.tunai < 0.5) s.tunai = 0;
            tambahWang(amaun, null);
            if (Math.random() < dt * 5) audio.main('duit');
          } else { this.batal(); }
        }
        break;
      }
    }
    kemasBawaan(this.watak, this.bawaJenis, this.bawaBil);
  }

  adaLagi(t) {
    if (!t.sumber) return false;
    if (t.sumber.def.jenis === 'rak') return (t.sumber.stok[t.jenis] || 0) > 0;
    return t.sumber.hasilAda > 0 && t.sumber.hasilJenis === t.jenis;
  }

  /* Tempat terdekat yang sudi menerima barang yang sedang dipegang. */
  cariSasaranUntuk(jenis) {
    let terbaik = null, skorTerbaik = -1e9;
    for (const dst of stesenSemua) {
      if (!dst.kelihatan || !dst.bolehTerima(jenis)) continue;
      const skor = bonusSasaran(dst) - dst.pos.distanceTo(this.mesh.position) * 0.3;
      if (skor > skorTerbaik) { skorTerbaik = skor; terbaik = dst; }
    }
    return terbaik;
  }
  batal() { this.tugas = null; this.fasaTugas = 'cari'; this.masaCari = 0.5; }

  gerakKe(sasaran, dt) {
    const p = this.mesh.position;
    let laju = 0;
    if (sasaran) {
      const dx = sasaran.x - p.x, dz = sasaran.z - p.z;
      const jarak = Math.hypot(dx, dz);
      if (jarak > 1.75) {
        const v = this.kelajuan;
        p.x += (dx / jarak) * v * dt;
        p.z += (dz / jarak) * v * dt;
        laju = v;
        this.mesh.rotation.y = sudutLerp(this.mesh.rotation.y, Math.atan2(dx, dz), 1 - Math.pow(0.0001, dt));
      } else {
        animasiWatak(this.watak, 0, dt);
        return true;
      }
    }
    animasiWatak(this.watak, laju, dt);
    return false;
  }
}

/* Keutamaan destinasi. Rak yang hampir kosong sentiasa menang — pelanggan
   yang datang ke rak kosong akan pulang dengan marah. */
function bonusSasaran(dst) {
  switch (dst.def.jenis) {
    case 'bungkus': return 44;
    case 'masak': return dst.def.id === 'meja_hadiah' ? 70 : 46;
    case 'rak': {
      const stok = dst.jumlahStok();
      if (stok === 0) return 100;
      if (stok < 3) return 62;
      return Math.max(6, 30 - stok * 2.2);
    }
    case 'lori': return 30;
    default: return 0;
  }
}

/* Cari kerja yang paling berguna untuk sesuatu peranan. */
function cariTugas(peranan, diri) {
  const nampak = stesenSemua.filter((s) => s.kelihatan);
  // Elakkan dua pekerja merebut kerja yang sama.
  const diambil = new Set();
  for (const w of pekerjaSemua) {
    if (w !== diri && w.tugas && w.tugas.sumber) diambil.add(w.tugas.sumber.def.id + '>' + w.tugas.sasaran.def.id);
  }

  if (peranan === 'juruwang') {
    const kaunter = nampak.filter((s) => s.def.jenis === 'kaunter' && s.tunai > 0)
      .sort((a, b) => b.tunai - a.tunai)[0];
    return kaunter ? { sumber: kaunter, sasaran: kaunter, jenis: null, fasa: 'kaunter' } : null;
  }

  let sumberCalon = [];
  if (peranan === 'pemetik') sumberCalon = nampak.filter((s) => s.def.jenis === 'tuai' && s.hasilAda > 0);
  else if (peranan === 'tukang') sumberCalon = nampak.filter((s) => s.def.jenis === 'masak' && s.hasilAda > 0);
  else if (peranan === 'pembungkus') sumberCalon = nampak.filter((s) => (s.def.jenis === 'bungkus' || (s.def.jenis === 'masak' && ITEMS[s.hasilJenis] && ITEMS[s.hasilJenis].produk)) && s.hasilAda > 0);
  else if (peranan === 'pemandu') {
    const lori = nampak.filter((s) => s.def.jenis === 'lori' && s.pesanan() && s.pesanan().rehat <= 0 && s.pesanan().siap < s.pesanan().perlu);
    // Pesanan nasional ialah matlamat akhir — muatkan ia dahulu.
    lori.sort((a, b) => (b.def.nasional ? 1 : 0) - (a.def.nasional ? 1 : 0));
    for (const l of lori) {
      const j = l.pesanan().jenis;
      const sumber = nampak.filter((s) => (s.def.jenis === 'rak' && (s.stok[j] || 0) > 0) || (s.hasilAda > 0 && s.hasilJenis === j));
      if (sumber.length) {
        sumber.sort((a, b) => a.pos.distanceToSquared(l.pos) - b.pos.distanceToSquared(l.pos));
        return { sumber: sumber[0], sasaran: l, jenis: j };
      }
    }
    return null;
  }

  let terbaik = null, skorTerbaik = -1;
  for (const src of sumberCalon) {
    const jenis = src.hasilJenis;
    if (peranan === 'pemetik') {
      const j = src.def.hasil;
      for (const dst of nampak) {
        if (dst.def.jenis !== 'masak' || !dst.bolehTerima(j)) continue;
        const perlu = dst.def.resipi[j] || 0;
        const ada = dst.simpananMasuk[j] || 0;
        // Bahan yang menyekat pengeluaran diberi keutamaan tertinggi.
        const menyekat = ada < perlu ? 90 : 0;
        const ruang = perlu * 3 - ada;
        let skor = menyekat + ruang * 6 + src.hasilAda - dst.pos.distanceTo(src.pos) * 0.3
          - diri.mesh.position.distanceTo(src.pos) * 0.2;
        if (diambil.has(src.def.id + '>' + dst.def.id)) skor -= 70;
        if (skor > skorTerbaik) { skorTerbaik = skor; terbaik = { sumber: src, sasaran: dst, jenis: j }; }
      }
    } else {
      for (const dst of nampak) {
        if (dst === src || !dst.bolehTerima(jenis)) continue;
        let skor = bonusSasaran(dst) + src.hasilAda * 3 - dst.pos.distanceTo(src.pos) * 0.25
          - diri.mesh.position.distanceTo(src.pos) * 0.2;
        if (diambil.has(src.def.id + '>' + dst.def.id)) skor -= 70;
        if (skor > skorTerbaik) { skorTerbaik = skor; terbaik = { sumber: src, sasaran: dst, jenis }; }
      }
    }
  }
  return terbaik;
}

function selarasPekerja() {
  for (const p of PERANAN) {
    const mahu = state.pekerja[p.key] || 0;
    const ada = pekerjaSemua.filter((w) => w.peranan === p.key);
    for (let i = ada.length; i < mahu; i++) new Pekerja(p.key, i);
    for (let i = ada.length - 1; i >= mahu; i--) ada[i].buang();
  }
}

/* ==========================================================================
   14. PELANGGAN (AI)
   ========================================================================== */

const pelangganSemua = [];
const TOPI_PELANGGAN = ['tudung', 'songkok', 'kopiah', 'cap', 'rambut'];

class Pelanggan {
  constructor(kawasanIdx) {
    const kanak = Math.random() < 0.18;
    this.watak = buatWatak({
      topi: pick(TOPI_PELANGGAN),
      skala: kanak ? 0.74 : rnd(0.94, 1.04),
      seluar: pick([0x36485c, 0x4a3b2c, 0x2f4a3a, 0x5a3550]),
    });
    this.mesh = this.watak.grup;
    this.kawasanIdx = kawasanIdx;
    const pintu = KAWASAN[kawasanIdx].pintu;
    this.mesh.position.set(pintu + rnd(-2.5, 2.5), 0, 13.4);
    scene.add(this.mesh);

    this.fasa = 'ke_rak';
    this.bawaJenis = null;
    this.bawaBil = 0;
    this.sabar = rnd(22, 32);
    this.masaLayan = 0;
    this.slot = -1;
    this.rak = null;
    this.kaunter = null;
    this.mahu = kanak ? 1 : rndInt(1, 2);
    this.buatMeter();
    pelangganSemua.push(this);
  }

  buatMeter() {
    const m = new THREE.Group();
    m.position.y = 2.0;
    this.meterLatar = kotak(m, 0.86, 0.14, 0.06, 0x14301f, 0, 0, 0, { bayang: false });
    this.meterIsi = kotak(m, 0.8, 0.09, 0.08, 0x8ec96f, 0, 0, 0.01, { bayang: false });
    m.visible = false;
    this.meter = m;
    this.mesh.add(m);
  }

  buang() {
    scene.remove(this.mesh);
    const i = pelangganSemua.indexOf(this);
    if (i >= 0) pelangganSemua.splice(i, 1);
    if (this.kaunter) {
      const k = this.kaunter.giliran.indexOf(this);
      if (k >= 0) this.kaunter.giliran.splice(k, 1);
    }
  }

  rakPilihan() {
    const calon = stesenSemua.filter((s) => s.kelihatan && s.def.jenis === 'rak' && s.jumlahStok() > 0);
    if (!calon.length) {
      const kosong = stesenSemua.filter((s) => s.kelihatan && s.def.jenis === 'rak');
      return kosong.length ? kosong[Math.min(this.kawasanIdx, kosong.length - 1)] : null;
    }
    calon.sort((a, b) => a.pos.distanceToSquared(this.mesh.position) - b.pos.distanceToSquared(this.mesh.position));
    return calon[0];
  }
  kaunterPilihan() {
    const calon = stesenSemua.filter((s) => s.kelihatan && s.def.jenis === 'kaunter');
    if (!calon.length) return null;
    calon.sort((a, b) => (a.giliran.length - b.giliran.length) || (a.pos.distanceToSquared(this.mesh.position) - b.pos.distanceToSquared(this.mesh.position)));
    return calon[0];
  }

  gerakKe(x, z, dt, jarakBerhenti = 1.9) {
    const p = this.mesh.position;
    const dx = x - p.x, dz = z - p.z;
    const jarak = Math.hypot(dx, dz);
    if (jarak > jarakBerhenti) {
      const v = 2.6;
      p.x += (dx / jarak) * v * dt;
      p.z += (dz / jarak) * v * dt;
      this.mesh.rotation.y = sudutLerp(this.mesh.rotation.y, Math.atan2(dx, dz), 1 - Math.pow(0.0001, dt));
      animasiWatak(this.watak, v, dt);
      return false;
    }
    animasiWatak(this.watak, 0, dt);
    return true;
  }

  kemas(dt) {
    switch (this.fasa) {
      case 'ke_rak': {
        if (!this.rak || !this.rak.kelihatan) this.rak = this.rakPilihan();
        if (!this.rak) { this.fasa = 'pulang'; break; }
        const sampai = this.gerakKe(this.rak.pos.x, this.rak.pos.z + 1.6, dt, 1.2);
        if (sampai) {
          this.sabar -= dt;
          this.meter.visible = true;
          this.meterIsi.scale.x = clamp(this.sabar / 26, 0.02, 1);
          this.meterIsi.material = bahan(this.sabar > 12 ? 0x8ec96f : this.sabar > 6 ? 0xf6b432 : 0xef5b3c, 0.8, true);
          this.masaAmbil = (this.masaAmbil || 0) + dt;
          const mahuJenis = this.bawaJenis || this.rak.hasilSedia();
          const boleh = mahuJenis && (this.rak.stok[mahuJenis] || 0) > 0;
          if (boleh && this.masaAmbil >= 0.32) {
            this.masaAmbil = 0;
            this.rak.keluarJenis(mahuJenis);
            this.bawaJenis = mahuJenis; this.bawaBil++;
            audio.main('petik');
            if (this.bawaBil >= this.mahu) {
              this.meter.visible = false;
              this.fasa = 'ke_kaunter';
            }
          } else if (!boleh && this.bawaBil > 0) {
            this.meter.visible = false;
            this.fasa = 'ke_kaunter';
          } else if (!boleh && this.sabar <= 0) {
            this.marah();
          }
        }
        break;
      }
      case 'ke_kaunter': {
        if (!this.kaunter) {
          this.kaunter = this.kaunterPilihan();
          if (!this.kaunter) { this.fasa = 'pulang'; break; }
          this.kaunter.giliran.push(this);
        }
        this.slot = this.kaunter.giliran.indexOf(this);
        const tx = this.kaunter.pos.x + (this.slot > 0 ? 0.5 * this.slot : 0);
        const tz = this.kaunter.pos.z + 1.7 + this.slot * 1.15;
        const sampai = this.gerakKe(tx, tz, dt, 0.35);
        if (sampai && this.slot === 0) {
          const adaJuruwang = (state.pekerja.juruwang || 0) > 0;
          this.masaLayan += dt * (adaJuruwang ? 2.2 : 1);
          this.meter.visible = true;
          this.meterIsi.scale.x = clamp(this.masaLayan / 1.7, 0.02, 1);
          this.meterIsi.material = bahan(0xffd75e, 0.8, true);
          if (this.masaLayan >= 1.7) this.bayar();
        }
        break;
      }
      case 'pulang': {
        const pintu = KAWASAN[this.kawasanIdx].pintu;
        this.meter.visible = false;
        if (this.gerakKe(pintu + this.tersasar, 14.6, dt, 0.6)) this.buang();
        break;
      }
    }
    kemasBawaan(this.watak, this.bawaJenis, this.bawaBil);
  }

  get tersasar() { return this._ts != null ? this._ts : (this._ts = rnd(-3, 3)); }

  bayar() {
    let jumlah = 0;
    for (let i = 0; i < this.bawaBil; i++) jumlah += hargaProduk(this.bawaJenis);
    const tip = state.reputasi > 20 && Math.random() < 0.2 ? Math.round(jumlah * 0.25) : 0;
    this.kaunter.tunai += jumlah + tip;
    kira.jualan += this.bawaBil;
    kira.jual[this.bawaJenis] = (kira.jual[this.bawaJenis] || 0) + this.bawaBil;
    kira.gembira++;
    state.reputasi += (acaraSemasa ? acaraSemasa.def.rep : 1);
    audio.main('jual');
    teks3D(fmtRM(jumlah + tip), this.kaunter.pos.clone().setY(1.6), '#8ec96f');
    letupkan(this.kaunter.pos.clone().setY(1.4), 0x8ec96f, 5, 1.6);
    if (tip) toast('Pelanggan gembira beri tip!', 'cash');
    this.bawaJenis = null; this.bawaBil = 0;
    const k = this.kaunter.giliran.indexOf(this);
    if (k >= 0) this.kaunter.giliran.splice(k, 1);
    this.kaunter = null;
    this.fasa = 'pulang';
    denyutStat($('stat-rep'));
  }

  marah() {
    kira.marah++;
    state.reputasi = Math.max(0, state.reputasi - 2);
    audio.main('marah');
    teks3D('Rak kosong!', this.mesh.position.clone().setY(1.5), '#ef5b3c', 0.8);
    this.meter.visible = false;
    this.fasa = 'pulang';
  }
}

let masaSpawn = 3;
function kemasPelanggan(dt) {
  masaSpawn -= dt;
  const maks = 3 + state.kawasan * 2;
  if (masaSpawn <= 0 && pelangganSemua.length < maks) {
    const asas = 6.2 - state.kawasan * 0.45;
    const repBonus = 1 + Math.min(0.8, state.reputasi / 260);
    const acara = acaraSemasa ? acaraSemasa.def.spawn : 1;
    masaSpawn = Math.max(0.8, (asas / (repBonus * acara)) * rnd(0.8, 1.2));
    // Kalau semua rak kosong, hanya sesekali ada yang singgah — supaya
    // pemain tidak dihukum bertalu-talu ketika baru membina barisan.
    const adaStok = stesenSemua.some((s) => s.kelihatan && s.def.jenis === 'rak' && s.jumlahStok() > 0);
    if (adaStok || Math.random() < 0.34) new Pelanggan(rndInt(0, state.kawasan));
  }
  for (const p of pelangganSemua.slice()) p.kemas(dt);
}

/* ==========================================================================
   15. KAMERA
   ========================================================================== */

const kamera = {
  sasaran: new THREE.Vector3(-21, 0, 0),
  tumpuPos: null, tumpuMasa: 0,
  offset: new THREE.Vector3(),
  goyang: 0,

  tumpu(pos, tempoh = 1.2) { this.tumpuPos = pos; this.tumpuMasa = tempoh; },

  kemas(dt, ikut) {
    if (this.tumpuMasa > 0) { this.tumpuMasa -= dt; if (this.tumpuMasa <= 0) this.tumpuPos = null; }
    const t = this.tumpuPos || ikut;
    this.sasaran.lerp(t, 1 - Math.pow(0.002, dt));

    const nisbah = (canvas.clientWidth || innerWidth) / (canvas.clientHeight || innerHeight);
    const jauh = nisbah < 0.72 ? 1.82 : nisbah < 1 ? 1.4 : nisbah < 1.5 ? 1.12 : 1;
    this.offset.set(3.6 * jauh, 15.5 * jauh, 13.2 * jauh);
    const mahu = this.sasaran.clone().add(this.offset);
    camera.position.lerp(mahu, 1 - Math.pow(0.004, dt));
    const lihat = this.sasaran.clone();
    lihat.y += 0.9;
    camera.lookAt(lihat);
    if (this.goyang > 0) {
      this.goyang -= dt;
      camera.position.x += Math.sin(jamGlobal * 60) * this.goyang * 0.14;
      camera.position.y += Math.cos(jamGlobal * 71) * this.goyang * 0.14;
    }
    matahari.position.set(this.sasaran.x - 14, 24, this.sasaran.z + 12);
    matahari.target.position.copy(this.sasaran);
    matahari.target.updateMatrixWorld();
  },
};

/* ==========================================================================
   16. ACARA RAWAK
   ========================================================================== */

let acaraSemasa = null;
let masaAcara = 70;

function kemasAcara(dt) {
  if (acaraSemasa) {
    acaraSemasa.baki -= dt;
    $('event-timer').textContent = Math.ceil(acaraSemasa.baki) + 's';
    if (acaraSemasa.baki <= 0) {
      acaraSemasa = null;
      $('event-strip').hidden = true;
      masaAcara = rnd(60, 100);
    }
    return;
  }
  if (state.kawasan < 1) return;
  masaAcara -= dt;
  if (masaAcara <= 0) {
    const def = pick(ACARA);
    acaraSemasa = { def, baki: def.tempoh };
    $('event-strip').hidden = false;
    $('event-kicker').textContent = def.kicker;
    $('event-title').textContent = def.nama;
    audio.main('misi');
    toast(def.nama, 'good');
  }
}

/* ==========================================================================
   17. MISI & TUTORIAL
   ========================================================================== */

let sinarMisi = null;

function buatSinarMisi() {
  const g = new THREE.Group();
  const cincin = new THREE.Mesh(new THREE.RingGeometry(1.5, 1.85, 26), new THREE.MeshBasicMaterial({ color: 0xffd75e, transparent: true, opacity: 0.7, side: THREE.DoubleSide }));
  cincin.rotation.x = -Math.PI / 2;
  cincin.position.y = 0.05;
  g.add(cincin);
  const panah = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.9, 5), new THREE.MeshBasicMaterial({ color: 0xffd75e }));
  panah.rotation.x = Math.PI;
  panah.position.y = 3.6;
  g.add(panah);
  g.visible = false;
  scene.add(g);
  sinarMisi = { g, cincin, panah };
}

function misiSemasa() {
  return state.misi < MISI.length ? MISI[state.misi] : MISI_TAMAT;
}

function kemasMisi(dt) {
  const m = misiSemasa();
  const [kini, jumlah] = m.p();
  const pecahan = clamp(kini / jumlah, 0, 1);
  $('mission-kicker').textContent = m.k;
  $('mission-title').textContent = m.t;
  $('mission-copy').textContent = m.c;
  $('mission-icon').textContent = m.i;
  $('mission-fill').style.width = (pecahan * 100) + '%';

  const st = m.s ? stesenIkut.get(m.s) : null;
  if (st && st.kelihatan && state.misi < MISI.length) {
    sinarMisi.g.visible = true;
    sinarMisi.g.position.set(st.pos.x, 0, st.pos.z);
    sinarMisi.panah.position.y = 3.6 + Math.sin(jamGlobal * 2.6) * 0.22;
    sinarMisi.cincin.material.opacity = 0.45 + Math.sin(jamGlobal * 3.2) * 0.25;
    const jarak = Math.hypot(st.pos.x - pemain.mesh.position.x, st.pos.z - pemain.mesh.position.z);
    $('mission-dist').textContent = jarak < 3 ? '✓' : Math.round(jarak) + 'm';
  } else {
    sinarMisi.g.visible = false;
    $('mission-dist').textContent = jumlah > 1 ? `${Math.min(kini, jumlah)}/${jumlah}` : '—';
  }

  if (state.misi < MISI.length && kini >= jumlah) {
    state.misi++;
    audio.main('misi');
    $('mission').classList.add('done');
    setTimeout(() => $('mission').classList.remove('done'), 500);
    toast('Misi selesai: ' + m.t, 'good');
    if (state.misi < MISI.length) {
      const seterusnya = MISI[state.misi];
      if (seterusnya.s) {
        const s2 = stesenIkut.get(seterusnya.s);
        if (s2 && s2.kelihatan) kamera.tumpu(s2.pos.clone(), 1.1);
      }
    }
    simpan();
  }
}

function tamatkanPermainan() {
  if (state.tamat) return;
  state.tamat = true;
  jeda = true;
  $('e-sales').textContent = fmtRM(state.jumlahJualan);
  $('e-happy').textContent = kira.gembira;
  $('e-rep').textContent = state.reputasi;
  $('ending').classList.remove('is-hidden');
  letupkan(new THREE.Vector3(29, 2, 9.5), 0xffd75e, 40, 6);
  kamera.goyang = 0.5;
  simpan();
}

/* ==========================================================================
   18. ANTARA MUKA — HUD, kedai, peta
   ========================================================================== */

let wangPapar = 0;

function kemasHUD(dt) {
  wangPapar = lerp(wangPapar, state.wang, 1 - Math.pow(0.0005, dt));
  if (Math.abs(wangPapar - state.wang) < 0.6) wangPapar = state.wang;
  $('money').textContent = wangRingkas(wangPapar);
  $('rep').textContent = state.reputasi;
  $('carry-count').textContent = pemain.bawaBil;
  $('carry-max').textContent = kapasitiBawa();
  $('carry-icon').textContent = pemain.bawaJenis ? ITEMS[pemain.bawaJenis].ikon : '▦';
  $('stat-carry').classList.toggle('full', pemain.bawaBil >= kapasitiBawa());

  const adaBeli = NAIK_TARAF.some((u) => state.naikTaraf[u.key] < u.max && state.wang >= u.kos(state.naikTaraf[u.key]))
    || PERANAN.some((r) => state.kawasan >= r.kawasan && (state.pekerja[r.key] || 0) < r.max && state.wang >= r.kos[state.pekerja[r.key] || 0]);
  $('shop-dot').classList.toggle('on', adaBeli);

  // pesanan borong
  const lori = stesenSemua.find((s) => s.def.jenis === 'lori' && s.kelihatan && !s.def.nasional);
  const loriNas = stesenSemua.find((s) => s.def.jenis === 'lori' && s.kelihatan && s.def.nasional);
  const papar = loriNas || lori;
  if (papar) {
    const p = papar.pesanan();
    $('order-strip').hidden = false;
    $('order-kicker').textContent = papar.def.nasional ? 'PESANAN NASIONAL' : 'PESANAN BORONG';
    $('order-title').textContent = `${namaItem(p.jenis)}${papar.def.nasional ? '' : ' · ' + fmtRM(p.ganjaran)}`;
    $('order-count').textContent = `${p.siap}/${p.perlu}`;
  } else $('order-strip').hidden = true;

  // zon
  const x = pemain.mesh.position.x;
  let idx = 0;
  for (let i = 0; i < KAWASAN.length; i++) if (x >= KAWASAN[i].x0) idx = i;
  if (idx !== zonSemasa) {
    zonSemasa = idx;
    const chip = $('zone-chip');
    chip.textContent = KAWASAN[idx].nama;
    chip.classList.add('show');
    clearTimeout(zonTimer);
    zonTimer = setTimeout(() => chip.classList.remove('show'), 1900);
  }
}
let zonSemasa = -1, zonTimer = null;

/* ---------- Kedai ---------- */
function kadBeli({ ikon, tajuk, sub, kos, boleh, milik, tahap, maks, klik }) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'buy-card' + (milik ? ' owned' : boleh ? ' afford' : '');
  b.disabled = milik || !boleh;
  const pips = maks ? `<div class="bc-pips">${Array.from({ length: maks }, (_, i) => `<i class="${i < tahap ? 'on' : ''}"></i>`).join('')}</div>` : '';
  b.innerHTML =
    `<span class="bc-icon">${ikon}</span>` +
    `<span class="bc-body"><b>${tajuk}</b><small>${sub}</small>${pips}</span>` +
    `<span class="bc-cost${milik ? ' max' : ''}"><small>${milik ? '' : 'HARGA'}</small>${milik ? '✓' : fmtRM(kos)}</span>`;
  if (!b.disabled) b.addEventListener('click', klik);
  return b;
}

function kemasPanelKedai() {
  $('shop-money').textContent = Math.round(state.wang).toLocaleString('ms-MY');
  const senaraiU = $('list-upgrades');
  senaraiU.innerHTML = '';
  for (const u of NAIK_TARAF) {
    const tahap = state.naikTaraf[u.key];
    const maksTercapai = tahap >= u.max;
    const kos = maksTercapai ? 0 : u.kos(tahap);
    senaraiU.appendChild(kadBeli({
      ikon: u.ikon, tajuk: u.nama, sub: maksTercapai ? 'Tahap maksimum dicapai' : u.teks(tahap),
      kos, boleh: !maksTercapai && state.wang >= kos, milik: maksTercapai,
      tahap, maks: u.max,
      klik: () => {
        if (!belanja(kos)) return;
        state.naikTaraf[u.key]++;
        kira.naikTaraf++;
        audio.main('buka');
        toast(`${u.nama} dinaik taraf!`, 'good');
        kemasPanelKedai();
        simpan();
      },
    }));
  }

  const senaraiP = $('list-staff');
  senaraiP.innerHTML = '';
  const tersedia = PERANAN.filter((r) => state.kawasan >= r.kawasan);
  if (!tersedia.length) {
    senaraiP.innerHTML = '<p class="empty-note">Belum ada pekerja untuk diupah.<br>Buka kawasan baharu dahulu.</p>';
  }
  for (const r of tersedia) {
    const ada = state.pekerja[r.key] || 0;
    const penuh = ada >= r.max;
    const kos = penuh ? 0 : r.kos[ada];
    senaraiP.appendChild(kadBeli({
      ikon: r.ikon, tajuk: r.nama + (r.max > 1 ? ` (${ada}/${r.max})` : ''),
      sub: penuh ? 'Semua slot sudah diisi' : r.desc,
      kos, boleh: !penuh && state.wang >= kos, milik: penuh,
      tahap: ada, maks: r.max,
      klik: () => {
        if (!belanja(kos)) return;
        state.pekerja[r.key] = ada + 1;
        selarasPekerja();
        audio.main('buka');
        toast(`${r.nama} mula bekerja!`, 'good');
        kemasPanelKedai();
        simpan();
      },
    }));
  }
}

/* ---------- Peta empayar ---------- */
function kemasPanelPeta() {
  const jumlahTapak = STESEN.filter((s) => s.jenis === 'tapak').length;
  const dibuka = STESEN.filter((s) => s.jenis === 'tapak' && state.dibuka[s.id]).length;
  const pecahan = dibuka / jumlahTapak;
  $('empire-name').textContent = KAWASAN[state.kawasan].nama;
  $('empire-fill').style.width = (pecahan * 100) + '%';
  $('empire-pct').textContent = Math.round(pecahan * 100) + '%';

  const senarai = $('list-areas');
  senarai.innerHTML = '';
  KAWASAN.forEach((a, i) => {
    const d = document.createElement('div');
    d.className = 'area-row ' + (i < state.kawasan ? 'done' : i === state.kawasan ? 'now' : '');
    d.innerHTML = `<span class="area-num">${i < state.kawasan ? '✓' : i + 1}</span><div><b>${a.nama}</b><small>${i <= state.kawasan ? a.sub : 'Belum dibuka'}</small></div>`;
    senarai.appendChild(d);
  });

  const prod = $('list-products');
  prod.innerHTML = '';
  for (const p of PRODUK) {
    const on = produkDibuka(p);
    const d = document.createElement('div');
    d.className = 'prod-card' + (on ? ' on' : '');
    d.innerHTML = `<span>${ITEMS[p].ikon}</span><b>${ITEMS[p].pendek}</b><small>${on ? fmtRM(hargaProduk(p)) + ' seunit' : 'Belum dibuka'}</small>`;
    prod.appendChild(d);
  }

  $('s-sales').textContent = fmtRM(state.jumlahJualan);
  $('s-happy').textContent = kira.gembira;
  $('s-made').textContent = kira.dihasilkan;
  $('s-staff').textContent = PERANAN.reduce((n, r) => n + (state.pekerja[r.key] || 0), 0);
}

/* ---------- Overlay ---------- */
const overlayTerbuka = new Set();
function bukaOverlay(id) {
  $(id).classList.remove('is-hidden');
  overlayTerbuka.add(id);
  jeda = true;
}
function tutupOverlay(id) {
  $(id).classList.add('is-hidden');
  overlayTerbuka.delete(id);
  if (overlayTerbuka.size === 0 && bermula && !state.tamat) jeda = false;
  jam.getDelta();
}

/* ==========================================================================
   19. INPUT
   ========================================================================== */

const PETA_KEKUNCI = {
  KeyW: 'w', KeyA: 'a', KeyS: 's', KeyD: 'd',
  ArrowUp: 'w', ArrowLeft: 'a', ArrowDown: 's', ArrowRight: 'd',
};
addEventListener('keydown', (e) => {
  const k = PETA_KEKUNCI[e.code];
  if (k) { kekunci[k] = true; e.preventDefault(); }
  if (e.code === 'Escape' && bermula) {
    if (overlayTerbuka.size) [...overlayTerbuka].forEach(tutupOverlay);
    else bukaJeda();
  }
});
addEventListener('keyup', (e) => { const k = PETA_KEKUNCI[e.code]; if (k) kekunci[k] = false; });
addEventListener('blur', () => { for (const k in kekunci) kekunci[k] = false; });

/* Kayu bedik: boleh diseret dari mana-mana bahagian kiri-bawah skrin. */
const joy = $('joystick'), knob = $('joy-knob');
let jariJoy = null, pusatJoy = { x: 0, y: 0 };
const JEJARI = 44;

function mulaJoy(e) {
  if (jariJoy !== null || overlayTerbuka.size || !bermula) return;
  if (e.target && e.target.closest && e.target.closest('button, .overlay')) return;
  const r = joy.getBoundingClientRect();
  const dalamKawasan = e.clientX < innerWidth * 0.62 && e.clientY > innerHeight * 0.42;
  const dalamJoy = e.clientX >= r.left - 30 && e.clientX <= r.right + 30 && e.clientY >= r.top - 30 && e.clientY <= r.bottom + 30;
  if (!dalamJoy && !dalamKawasan) return;
  jariJoy = e.pointerId;
  if (dalamJoy) pusatJoy = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  else {
    pusatJoy = { x: e.clientX, y: e.clientY };
    joy.style.left = (e.clientX - 59) + 'px';
    joy.style.bottom = (innerHeight - e.clientY - 59) + 'px';
  }
  joy.classList.add('active');
  gerakJoy(e);
}
function gerakJoy(e) {
  if (e.pointerId !== jariJoy) return;
  const dx = e.clientX - pusatJoy.x, dy = e.clientY - pusatJoy.y;
  const jarak = Math.hypot(dx, dy) || 1;
  const had = Math.min(JEJARI, jarak) / jarak;
  arahGerak.set((dx * had) / JEJARI, (dy * had) / JEJARI);
  knob.style.transform = `translate(${dx * had}px, ${dy * had}px)`;
  e.preventDefault();
}
function tamatJoy(e) {
  if (e.pointerId !== jariJoy) return;
  jariJoy = null;
  arahGerak.set(0, 0);
  knob.style.transform = '';
  joy.classList.remove('active');
  joy.style.left = ''; joy.style.bottom = '';
}
if (IS_TOUCH) {
  const lapisan = $('app');
  lapisan.addEventListener('pointerdown', mulaJoy, { passive: false });
  lapisan.addEventListener('pointermove', gerakJoy, { passive: false });
  lapisan.addEventListener('pointerup', tamatJoy);
  lapisan.addEventListener('pointercancel', tamatJoy);
}

/* ---------- Butang ---------- */
function bukaJeda() {
  $('p-money').textContent = fmtRM(state.wang);
  $('p-sales').textContent = fmtRM(state.jumlahJualan);
  $('p-staff').textContent = PERANAN.reduce((n, r) => n + (state.pekerja[r.key] || 0), 0);
  segarToggle();
  bukaOverlay('pause');
}
function segarToggle() {
  $('tg-music').classList.toggle('is-on', state.tetapan.muzik);
  $('tg-sfx').classList.toggle('is-on', state.tetapan.bunyi);
  $('tg-quality').classList.toggle('is-on', state.tetapan.grafikTinggi);
}

$('btn-shop').addEventListener('click', () => { kemasPanelKedai(); bukaOverlay('shop'); });
$('btn-map').addEventListener('click', () => { kemasPanelPeta(); bukaOverlay('map'); });
$('btn-pause').addEventListener('click', bukaJeda);
$('shop-close').addEventListener('click', () => tutupOverlay('shop'));
$('shop-scrim').addEventListener('click', () => tutupOverlay('shop'));
$('map-close').addEventListener('click', () => tutupOverlay('map'));
$('map-scrim').addEventListener('click', () => tutupOverlay('map'));
$('btn-resume').addEventListener('click', () => tutupOverlay('pause'));
$('how-close').addEventListener('click', () => tutupOverlay('how'));
$('how-scrim').addEventListener('click', () => tutupOverlay('how'));
$('how-ok').addEventListener('click', () => tutupOverlay('how'));
$('btn-how').addEventListener('click', () => $('how').classList.remove('is-hidden'));
$('end-close').addEventListener('click', () => { $('ending').classList.add('is-hidden'); jeda = false; jam.getDelta(); });
$('offline-ok').addEventListener('click', () => tutupOverlay('offline'));

$('tab-up').addEventListener('click', () => {
  $('tab-up').classList.add('is-on'); $('tab-staff').classList.remove('is-on');
  $('list-upgrades').classList.remove('is-hidden'); $('list-staff').classList.add('is-hidden');
});
$('tab-staff').addEventListener('click', () => {
  $('tab-staff').classList.add('is-on'); $('tab-up').classList.remove('is-on');
  $('list-staff').classList.remove('is-hidden'); $('list-upgrades').classList.add('is-hidden');
});

$('tg-music').addEventListener('click', () => { state.tetapan.muzik = !state.tetapan.muzik; audio.selaras(); segarToggle(); simpan(); });
$('tg-sfx').addEventListener('click', () => { state.tetapan.bunyi = !state.tetapan.bunyi; audio.selaras(); segarToggle(); simpan(); });
$('tg-quality').addEventListener('click', () => { state.tetapan.grafikTinggi = !state.tetapan.grafikTinggi; pasangGrafik(state.tetapan.grafikTinggi); segarToggle(); simpan(); });

$('btn-reset').addEventListener('click', () => $('confirm').classList.remove('is-hidden'));
$('confirm-no').addEventListener('click', () => $('confirm').classList.add('is-hidden'));
$('confirm-yes').addEventListener('click', () => {
  try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* abaikan */ }
  location.reload();
});

/* ==========================================================================
   20. GELUNG UTAMA
   ========================================================================== */

const jam = new THREE.Clock();
let jamGlobal = 0;
let jeda = true;
let bermula = false;
let pemain = null;
let masaSimpanAuto = 0;

function saizSemula() {
  const w = canvas.clientWidth || innerWidth;
  const h = canvas.clientHeight || innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.fov = h > w ? 52 : 44;
  camera.updateProjectionMatrix();
}
addEventListener('resize', saizSemula);
addEventListener('orientationchange', () => setTimeout(saizSemula, 220));

function langkahSimulasi(dt) {
  pemain.kemas(dt);
  for (const s of stesenSemua) s.kemas(dt);
  for (const w of pekerjaSemua) w.kemas(dt);
  kemasPelanggan(dt);
  kemasInteraksi(dt);
  kemasAcara(dt);
  kemasMisi(dt);
  kemasHUD(dt);
  masaSimpanAuto += dt;
  if (masaSimpanAuto > 6) { masaSimpanAuto = 0; simpan(); }
}

function gelung() {
  requestAnimationFrame(gelung);
  const dt = Math.min(0.05, jam.getDelta());
  jamGlobal += dt;

  if (bermula && !jeda) langkahSimulasi(dt);
  kemasTeksApung(dt);
  kemasZarah(dt);
  kamera.kemas(dt, bermula ? pemain.mesh.position : new THREE.Vector3(-21, 0, 0));
  renderer.render(scene, camera);
}

/* ==========================================================================
   21. PENDAPATAN SEMASA TIADA (idle)
   ========================================================================== */

function kiraPendapatanTiada() {
  if (!simpanan || !simpanan.masaSimpan) return 0;
  const jumlahPekerja = PERANAN.reduce((n, r) => n + (simpanan.pekerja[r.key] || 0), 0);
  if (jumlahPekerja < 2) return 0;
  const saat = clamp((Date.now() - simpanan.masaSimpan) / 1000, 0, 7200);
  if (saat < 90) return 0;
  const asasSeminit = (simpanan.kawasan + 1) * 26 * Math.min(jumlahPekerja, 6) * 0.5;
  return Math.round((saat / 60) * asasSeminit * 0.35);
}

/* ==========================================================================
   22. MULA
   ========================================================================== */

const TEKS_MEMUAT = [
  'Menumbuk cili kering', 'Membersih ikan bilis', 'Memanaskan kuali besi',
  'Menyusun balang kaca', 'Menggantung papan tanda', 'Menyapu lantai dapur',
];

function bina() {
  buatTanah();
  buatHiasan();
  binaStesen();
  buatSinarMisi();
  pemain = new Pemain();
  pasangGrafik(state.tetapan.grafikTinggi);
  saizSemula();
  kemasSemuaKelihatan();
  for (const s of stesenSemua) s.kemas(0.001);
  renderer.render(scene, camera);
}

function mulakan(gunaSimpanan) {
  audio.mula();
  if (gunaSimpanan && simpanan) {
    const pendapatan = kiraPendapatanTiada();
    Object.assign(state, simpanan);
    state.tetapan = Object.assign({ muzik: true, bunyi: true, grafikTinggi: !IS_TOUCH }, simpanan.tetapan || {});
    kira = Object.assign(kira, simpanan.kira || {});
    kira.tuai = kira.tuai || {}; kira.hantar = kira.hantar || {};
    kira.ambil = kira.ambil || {}; kira.dibuat = kira.dibuat || {}; kira.jual = kira.jual || {};
    for (const s of stesenSemua) s.muatKeadaan(state.stesen && state.stesen[s.def.id]);
    if (state.pemain) pemain.mesh.position.set(state.pemain.x, 0, state.pemain.z);
    kemasSemuaKelihatan();
    selarasPekerja();
    pasangGrafik(state.tetapan.grafikTinggi);
    if (pendapatan > 0) {
      state.wang += pendapatan;
      $('offline-amount').textContent = pendapatan.toLocaleString('ms-MY');
      $('offline-copy').textContent = `Pekerja anda terus berniaga selama ${Math.round(clamp((Date.now() - simpanan.masaSimpan) / 60000, 1, 120))} minit.`;
      setTimeout(() => bukaOverlay('offline'), 420);
    }
  }
  wangPapar = state.wang;
  $('start').classList.add('is-hidden');
  bermula = true;
  jeda = overlayTerbuka.size > 0;
  jam.getDelta();
  segarToggle();
  kemasPanelKedai();
}

function siapkanSkrinMula() {
  if (simpanan) {
    $('btn-continue').hidden = false;
    $('btn-start').innerHTML = '<span>Mula Baharu</span><i>↺</i>';
    $('save-note').textContent = `Kemajuan tersimpan: ${fmtRM(simpanan.wang || 0)} · ${KAWASAN[simpanan.kawasan || 0].nama}`;
  }
  $('btn-continue').addEventListener('click', () => mulakan(true));
  $('btn-start').addEventListener('click', () => {
    if (simpanan) { try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* abaikan */ } }
    mulakan(false);
  });
}

function muatkan() {
  let kemajuan = 0;
  const isi = $('load-fill'), teks = $('load-copy');
  const tik = setInterval(() => {
    kemajuan = Math.min(1, kemajuan + rnd(0.14, 0.3));
    isi.style.width = (kemajuan * 100) + '%';
    teks.textContent = TEKS_MEMUAT[Math.min(TEKS_MEMUAT.length - 1, Math.floor(kemajuan * TEKS_MEMUAT.length))];
    if (kemajuan >= 1) {
      clearInterval(tik);
      setTimeout(() => {
        $('loading').classList.add('is-hidden');
        $('start').classList.remove('is-hidden');
      }, 260);
    }
  }, 190);
}

/* Simpan bila keluar */
addEventListener('beforeunload', simpan);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) simpan();
  else jam.getDelta();
});
addEventListener('pointerdown', () => audio.mula(), { once: true });

bina();
siapkanSkrinMula();
muatkan();
gelung();

/* Cangkuk nyahpepijat — hanya aktif dengan ?debug=1 pada URL. */
if (location.search.includes('debug')) {
  window.__EB = {
    get state() { return state; },
    get kira() { return kira; },
    pemain, stesenIkut, stesenSemua, pekerjaSemua, pelangganSemua,
    mula: (guna) => mulakan(!!guna),
    langkah(bilangan = 60, dt = 1 / 60) { for (let i = 0; i < bilangan; i++) langkahSimulasi(dt); },
    ke(x, z) { pemain.mesh.position.set(x, 0, z); },
  };
}
