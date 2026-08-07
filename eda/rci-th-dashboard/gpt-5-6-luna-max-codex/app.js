/* RCI Tabung Haji — data exploration build.
 * All report values are kept here as an explicit, inspectable data model.
 * No external chart library is needed: the coordinated views are small SVGs.
 */

"use strict";

const REPORT_URL = "https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md";
const state = {
  view: "story",
  selectedYear: 2019,
  hibahYear: 2017,
  costMode: "both",
  evidence: false,
  selectedAsset: "Ekuiti (tersenarai di Bursa Malaysia)",
  investmentFilter: "semua",
  investmentSearch: "",
  selectedInvestment: "FGV",
  timelineFilter: "semua",
};

const SOURCES = {
  overview: {
    label: "Ringkasan eksekutif",
    section: "Bab 1–3 / ringkasan eksekutif",
    pdf: "PDF 13–33",
    printed: "dicetak xi–xxxi",
    description: "Skop siasatan, penemuan krisis kewangan, pemulihan UJSB dan cadangan utama Suruhanjaya.",
    quote: "Laporan ini menilai pengurusan dan operasi LTH dari 2014 hingga 2020.",
  },
  costActual: {
    label: "Tanggungan Bantuan Kewangan Haji",
    section: "Bahagian 3.16.3–3.16.7",
    pdf: "PDF 204–205",
    printed: "dicetak 166–167",
    description: "Jadual kos haji, bayaran jemaah dan HAFIS bagi 2014–2019; nota tiada penghantaran pada 2020–2021.",
    quote: "Bayaran haji 2009–2021 kekal RM9,980 walaupun kos haji meningkat.",
  },
  costProjection: {
    label: "Unjuran kos haji dan HAFIS",
    section: "Bahagian 3.16.8–3.16.12",
    pdf: "PDF 205–206",
    printed: "dicetak 167–168",
    description: "Unjuran 2022–2030 yang digunakan oleh RCI, termasuk angka RM742.47 juta HAFIS pada 2030.",
    quote: "Jika bayaran kekal, HAFIS boleh melebihi 65% kos haji pada 2030.",
  },
  hibah: {
    label: "Hibah dan jurang aset-liabiliti",
    section: "Bahagian 3.9.2 dan 3.9.22–3.9.30",
    pdf: "PDF 112, 120–123",
    printed: "dicetak 74, 82–85",
    description: "Kadar hibah, jumlah agihan dan jadual PwC tentang kekurangan/kelebihan sebelum dan selepas agihan.",
    quote: "Suruhanjaya mempersoalkan penggunaan RAV sebagai asas agihan hibah.",
  },
  accounting: {
    label: "Pelaporan kewangan dan RAV",
    section: "Bahagian 3.9.3–3.9.21 dan 3.11",
    pdf: "PDF 113–119, 125–133",
    printed: "dicetak 75–81, 87–95",
    description: "Perbezaan antara angka penyata kewangan, RAV dan kesan polisi rosot nilai.",
    quote: "RAV 2017 menunjukkan nilai bersih aset terlaras RM373 juta; PwC menganggarkan liabiliti bersih yang lebih besar.",
  },
  recovery: {
    label: "Pelan pemulihan dan UJSB",
    section: "Bahagian 3.13.1–3.13.71",
    pdf: "PDF 146–176",
    printed: "dicetak 108–138",
    description: "Pemindahan aset kepada UJSB, nilai buku/pindahan/pasaran, Sukuk dan komitmen Kerajaan.",
    quote: "Aset dipindahkan pada RM19.9 bilion berbanding nilai pasaran RM9.7 bilion.",
  },
  investments: {
    label: "Pelaburan yang bermasalah",
    section: "Bahagian 3.14.1–3.14.7",
    pdf: "PDF 176–193",
    printed: "dicetak 138–155",
    description: "Kes-kes pelaburan, jumlah pelaburan atau rosot nilai yang disebut, dan tindakan susulan.",
    quote: "Suruhanjaya mencadangkan semakan forensik terhadap bagaimana keputusan pelaburan dibuat.",
  },
  timeline: {
    label: "Kronologi laporan",
    section: "Pelbagai bahagian laporan",
    pdf: "PDF 13–210",
    printed: "dicetak xi–172",
    description: "Peristiwa dan keputusan yang menyambungkan kos, hibah, krisis, pemulihan dan siasatan.",
    quote: "Kronologi ini menyusun fakta laporan; ia tidak mendakwa hubungan sebab-akibat baharu.",
  },
};

const actualCost = [
  { year: 2014, type: "fact", cost: 16155, payment: 9980, paymentPct: 62, hafis: 6175, hafisPct: 38, total: 106 },
  { year: 2015, type: "fact", cost: 17270, payment: 9980, paymentPct: 58, hafis: 7290, hafisPct: 42, total: 135 },
  { year: 2016, type: "fact", cost: 18890, payment: 9980, paymentPct: 53, hafis: 8910, hafisPct: 47, total: 160 },
  { year: 2017, type: "fact", cost: 19550, payment: 9980, paymentPct: 51, hafis: 9570, hafisPct: 49, total: 298 },
  { year: 2018, type: "fact", cost: 22450, payment: 9980, paymentPct: 44, hafis: 12470, hafisPct: 56, total: 314 },
  { year: 2019, type: "fact", cost: 22900, payment: 9980, paymentPct: 44, hafis: 12920, hafisPct: 56, total: 299 },
];

const projectionCost = [
  { year: 2022, type: "projection", cost: 25540, payment: 12980, hafis: 12560, hafisPct: 49.2, total: 376.8 },
  { year: 2023, type: "projection", cost: 26280, payment: 12980, hafis: 13300, hafisPct: 50.6, total: 399 },
  { year: 2024, type: "projection", cost: 28160, payment: 12980, hafis: 15180, hafisPct: 53.9, total: 455.4 },
  { year: 2025, type: "projection", cost: 29570, payment: 12980, hafis: 16590, hafisPct: 56.1, total: 497.7 },
  { year: 2026, type: "projection", cost: 31040, payment: 12980, hafis: 18060, hafisPct: 58.2, total: 541.8 },
  { year: 2027, type: "projection", cost: 32592, payment: 12980, hafis: 19612, hafisPct: 60.2, total: 588.36 },
  { year: 2028, type: "projection", cost: 34221, payment: 12980, hafis: 21241, hafisPct: 62.1, total: 637.23 },
  { year: 2029, type: "projection", cost: 35932, payment: 12980, hafis: 22952, hafisPct: 63.9, total: 688.56 },
  { year: 2030, type: "projection", cost: 37729, payment: 12980, hafis: 24749, hafisPct: 65.6, total: 742.47 },
];

const noPilgrimage = [
  { year: 2020, type: "gap", label: "Tiada penghantaran jemaah" },
  { year: 2021, type: "gap", label: "Tiada penghantaran jemaah" },
];

const hibahRates = [
  { year: 2014, annual: 6.25, haj: 2.00 },
  { year: 2015, annual: 5.00, haj: 3.00 },
  { year: 2016, annual: 4.25, haj: 1.50 },
  { year: 2017, annual: 4.50, haj: 1.75 },
  { year: 2018, annual: 1.25, haj: 0 },
  { year: 2019, annual: 3.05, haj: 0 },
  { year: 2020, annual: 3.10, haj: 0 },
  { year: 2021, annual: 3.10, haj: 0 },
];

const financialGaps = [
  { year: 2014, assets: 54751, liabilities: 51866, pre: 2885, distribution: 3237, post: -352 },
  { year: 2015, assets: 60196, liabilities: 60062, pre: 134, distribution: 3220, post: -3086 },
  { year: 2016, assets: 64321, liabilities: 65581, pre: -1260, distribution: 2871, post: -4131 },
  { year: 2017, assets: 70317, liabilities: 71086, pre: -769, distribution: 3324, post: -4093 },
];

const rav2017 = {
  reportedAssets: 70317,
  ravAdjustment: 4466,
  ravAssets: 74783,
  liabilities: 74410,
  adjustedNet: 373,
  unrecordedImpairment: 1537,
  adjustedLoss: -1433,
  reportedProfit: 3412,
  adjustedAccumulatedLoss: -4683,
};

const transferredAssets = [
  { name: "Hartanah dan tanah", book: 1411, transfer: 2247, market: 1411 },
  { name: "Syarikat perladangan", book: 718, transfer: 802, market: 718 },
  { name: "Ekuiti (tersenarai di Bursa Malaysia)", book: 16852, transfer: 16851, market: 7600 },
];

const transferredProperty = [
  { name: "Tanah", transfer: 627.006479, market: 401.08 },
  { name: "Menara pejabat", transfer: 737.399698, market: 325 },
  { name: "Lot kedai", transfer: 46.301759, market: 33.33 },
  { name: "Hotel", transfer: 804.058625, market: 424.27 },
  { name: "Perindustrian", transfer: 31.914386, market: 19 },
];

const bluechips = [
  { name: "Axiata", transfer: 1422.605154, market: 931.803255, drop: -39.5, loss: 490.801899, current: 3.04 },
  { name: "Maxis", transfer: 879.395994, market: 681.197584, drop: -20.6, loss: 198.198410, current: 3.52 },
  { name: "MISC", transfer: 486.532216, market: 438.925710, drop: -17.2, loss: 47.606506, current: 7.30 },
  { name: "Digi", transfer: 576.240738, market: 500.328955, drop: -17.3, loss: 75.911783, current: 3.27 },
  { name: "TM", transfer: 241.202959, market: 107.650200, drop: -60.9, loss: 133.552759, current: 5.20 },
];

const investmentCases = [
  { key: "FGV", name: "FGV Berhad", category: "Ekuiti", amount: 1310.02, amountLabel: "nilai kos saham yang diambil alih UJSB", loss: 1058.94, lossLabel: "kerugian tidak nyata yang disebut", status: "dipindahkan kepada UJSB", source: "investments", story: "Harga pasaran pernah jatuh kepada RM0.885 seunit; LTH bernasib baik apabila saham dipindahkan kepada UJSB pada nilai kos." },
  { key: "Trurich", name: "Trurich Resources", category: "Perladangan", amount: 364.31, amountLabel: "pelaburan LTH", loss: 364.31, lossLabel: "dirosot nilai sepenuhnya", status: "pelupusan diluluskan", source: "investments", story: "Usaha sama menjadi insolven; baki pinjaman kepada Maybank yang disebut laporan ialah USD179 juta." },
  { key: "TH Marine", name: "Alam Maritim / TH Marine", category: "Kapal", amount: 334, amountLabel: "jumlah pelaburan", loss: 278, lossLabel: "rosot nilai setakat Dis 2021", status: "kebolehpulihan dinilai", source: "investments", story: "Kesemua RM198 juta ekuiti dirosot nilai dan RM80 juta daripada RM136 juta pembiayaan dirosot nilai." },
  { key: "DSSB", name: "Deru Semangat", category: "Perladangan", amount: 257, amountLabel: "jumlah yang telah dikeluarkan", loss: 225, lossLabel: "terbitan: RM257m − RM32m", status: "pegangan dirungkaikan", source: "investments", derived: true, story: "Laporan menyebut RM257 juta dikeluarkan dan dirosot nilai kepada RM32 juta; beza RM225 juta ialah kiraan terbitan." },
  { key: "PPB", name: "Putrajaya Perdana", category: "Ekuiti", amount: 193.5, amountLabel: "pembelian 30% ekuiti", loss: 145.3, lossLabel: "peruntukan rosot nilai", status: "cadangan penyelesaian", source: "investments", story: "Sasaran penyenaraian tidak tercapai; nilai buku bersih yang disebut ialah RM48.2 juta." },
  { key: "Abraj", name: "Abraj", category: "Hartanah", amount: 85, amountLabel: "jumlah pegangan ekuiti", loss: 40.25, lossLabel: "kerugian rosot nilai", status: "50% dijual 2020", source: "investments", story: "Usaha sama tidak mampu menjana pendapatan yang cukup untuk membayar pinjaman bank selepas penyewa utama berpindah." },
  { key: "Emrail", name: "Emrail", category: "Ekuiti", amount: 20.17, amountLabel: "jumlah pembelian ekuiti", loss: 19.3, lossLabel: "baki put option dirosot nilai", status: "timbang tara", source: "investments", story: "LHSB hanya membayar RM2 juta daripada harga put option RM20.3 juta; baki direkodkan sebagai rosot nilai." },
  { key: "Wellspring", name: "Wellspring Worldwide", category: "Ekuiti", amount: 18.4, amountLabel: "jumlah pembelian ekuiti", loss: 19.03, lossLabel: "peruntukan rosot nilai", status: "tuntutan mahkamah", source: "investments", story: "Syarikat gagal disenaraikan; tuntutan put option RM20.8 juta masih tidak dibayar oleh promoters." },
  { key: "Al-Rawda", name: "Al-Rawda", category: "Hotel", amount: 202.8, amountLabel: "ECL yang dianggarkan", loss: 202.8, lossLabel: "estimated credit loss", status: "timbang tara / penguatkuasaan", source: "investments", notComparable: true, story: "Angka RM202.8 juta ialah ECL, bukan nilai modal pelaburan; laporan juga menyebut sewa tertunggak SR560.7 juta." },
  { key: "Al-Fareeda", name: "Al-Fareeda Residential Fund", category: "Dana", amount: 63, amountLabel: "nilai RM bersamaan SR76m", loss: null, lossLabel: "kerugian dilapor dalam SR76m", status: "dihapus kira", source: "investments", notComparable: true, story: "Dana dihapus kira sepenuhnya; laporan menyatakan kerugian SR76 juta dan nilai bersamaan RM63 juta." },
  { key: "THP", name: "TH Plantations", category: "Perladangan", amount: null, amountLabel: "tidak dinyatakan sebagai satu angka", loss: 170, lossLabel: "rosot nilai di peringkat LTH", status: "siasatan forensik", source: "investments", notComparable: true, story: "Hanya 58% ladang didapati produktif; penjualan estet dan pengurangan kos perladangan menjejaskan hasil sawit." },
  { key: "THHR", name: "TH Hotel & Residences", category: "Hartanah", amount: 804.1, amountLabel: "nilai pemindahan hartanah", loss: null, lossLabel: "pulangan dikenal pasti <2%", status: "dipindahkan kepada UJSB", source: "investments", notComparable: true, story: "Hotel dan kompleks haji berpulangan rendah dipindahkan; angka ini bukan kerugian." },
];

const timelineEvents = [
  { year: "1951", category: "struktur", title: "Ordinan Haji diwujudkan", text: "Pengurusan haji negara bermula dengan matlamat melindungi dan mengawal bakal jemaah.", source: "overview" },
  { year: "1969", category: "struktur", title: "LUTH menggantikan PWSBH", text: "Lembaga Urusan dan Tabung Haji dibentuk melalui Akta 8.", source: "overview" },
  { year: "1995", category: "struktur", title: "LTH menggantikan LUTH", text: "Akta Tabung Haji 1995 (Akta 535) memperuntukkan fungsi, kawal selia dan operasi LTH.", source: "overview" },
  { year: "2001", category: "haji", title: "HAFIS mula diperkenalkan", text: "Sebelum itu, jemaah Muassasah perlu membayar kos haji sebenar.", source: "costActual" },
  { year: "2009", category: "haji", title: "Bayaran haji dibekukan", text: "Bayaran Muassasah RM9,980 kekal hingga 2021 walaupun kos haji terus meningkat.", source: "costActual", key: true },
  { year: "2014–17", category: "hibah", title: "Hibah tinggi dan rizab tertekan", text: "Kadar tahunan 6.25%, 5.00%, 4.25% dan 4.50% disertai hibah haji.", source: "hibah", key: true },
  { year: "16 Jul 2018", category: "akaun", title: "Teguran KAN tentang rosot nilai", text: "Polisi rosot nilai berubah dua kali pada 2017; RM227.81 juta tidak direkodkan bagi beberapa pelaburan.", source: "accounting", key: true },
  { year: "7 Dis 2018", category: "pemulihan", title: "Pelan pemulihan diluluskan", text: "Jemaah Menteri meluluskan pelan untuk menangani defisit aset-liabiliti.", source: "recovery", key: true },
  { year: "14 Dis 2018", category: "pemulihan", title: "UJSB ditubuhkan", text: "SPV milik Menteri Kewangan Diperbadankan diberi mandat memulihkan nilai aset.", source: "recovery" },
  { year: "27–28 Dis 2018", category: "pemulihan", title: "Perjanjian pemindahan aset", text: "106 saham tersenarai, sebuah syarikat perladangan dan 29 aset hartanah dipindahkan melalui pelan pemulihan.", source: "recovery", key: true },
  { year: "2018–19", category: "hibah", title: "Selepas hibah 1.25%, deposit mengecut", text: "Laporan menyebut deposit turun kira-kira RM73 bilion sebelum pengumuman kepada RM69 bilion pada akhir 2019.", source: "hibah", key: true },
  { year: "30 Dis 2019", category: "pemulihan", title: "RM100 juta tunai dibayar", text: "Sebahagian daripada RM300 juta bayaran tunai pemindahan aset diterima oleh LTH.", source: "recovery" },
  { year: "2020–21", category: "haji", title: "Tiada penghantaran jemaah", text: "Jadual HAFIS sebenar tidak diisi sebagai sifar; laporan hanya menyatakan tiada penghantaran.", source: "costActual" },
  { year: "30 Nov 2020", category: "pemulihan", title: "RM200 juta penebusan awal", text: "Daripada geran Kerajaan RM500 juta pada 2020, RM200 juta digunakan menebus Sukuk UJSB kepada LTH.", source: "recovery" },
  { year: "2021", category: "pemulihan", title: "Suntikan RM1.5b tidak diterima", text: "Laporan menyebut keutamaan tunai diberi kepada pemulihan ekonomi akibat pandemik.", source: "recovery" },
  { year: "2022", category: "haji", title: "Bayaran dua lapisan diperkenalkan", text: "RM10,980 bagi kumpulan B40 dan RM12,980 bagi kumpulan bukan B40.", source: "costProjection", key: true },
  { year: "30 Ogos 2022", category: "struktur", title: "Laporan dipersembahkan", text: "Laporan RCI dipersembahkan kepada Yang di-Pertuan Agong.", source: "overview" },
  { year: "2030", category: "haji", title: "Hujung unjuran RCI", text: "Jadual unjuran meletakkan kos RM37,729, HAFIS RM24,749 seorang dan jumlah HAFIS RM742.47 juta.", source: "costProjection", key: true },
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const root = () => $("#view-root");

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function fmtNumber(value, digits = 0) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("ms-MY", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
}

function fmtRM(value, digits = 0) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return `RM${fmtNumber(value, digits)}`;
}

function fmtRMm(value, digits = 0) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  if (Math.abs(value) >= 1000) return `RM${fmtNumber(value / 1000, digits || 1)}b`;
  return `RM${fmtNumber(value, digits)}j`;
}

function fmtPct(value, digits = 1) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return `${fmtNumber(value, digits)}%`;
}

function sourceTag(id, label = "sumber") {
  return `<button type="button" class="source-tag" data-source="${escapeHTML(id)}" aria-label="Buka sumber ${escapeHTML(label)}">${escapeHTML(label)}</button>`;
}

function chip(kind, label) {
  return `<span class="fact-chip ${kind}">${escapeHTML(label)}</span>`;
}

function getYearData(year) {
  return actualCost.find((row) => row.year === Number(year)) || projectionCost.find((row) => row.year === Number(year)) || noPilgrimage.find((row) => row.year === Number(year));
}

function formatHafisTotal(value) {
  return value >= 1000 ? `RM${fmtNumber(value / 1000, 2)}b` : `RM${fmtNumber(value, value % 1 ? 2 : 0)}j`;
}

function sourceDrawerHTML(sourceId) {
  const source = SOURCES[sourceId] || SOURCES.overview;
  return `<div class="drawer-note"><strong>Bagaimana membaca:</strong> Angka dan fakta di bawah ialah daripada teks laporan OCR. Halaman PDF membantu anda menyemak dokumen asal; “dicetak” ialah label muka surat dalam laporan.</div>
    <article class="drawer-source">
      <div class="drawer-source-meta">${chip(sourceId === "costProjection" ? "projection" : "fact", sourceId === "costProjection" ? "unjuran RCI" : "fakta laporan")}<span>${escapeHTML(source.pdf)} · ${escapeHTML(source.printed)}</span></div>
      <h3>${escapeHTML(source.label)}</h3>
      <p><strong>${escapeHTML(source.section)}</strong><br />${escapeHTML(source.description)}</p>
      <div class="quote">“${escapeHTML(source.quote)}”</div>
      <a href="${REPORT_URL}" target="_blank" rel="noreferrer">Buka laporan RCI di GitHub ↗</a>
    </article>`;
}

function allSourcesHTML() {
  const items = Object.entries(SOURCES).map(([id, source]) => `<article class="drawer-source">
    <div class="drawer-source-meta">${chip(id === "costProjection" ? "projection" : "fact", id === "costProjection" ? "unjuran" : "fakta")}<span>${escapeHTML(source.pdf)} · ${escapeHTML(source.printed)}</span></div>
    <h3>${escapeHTML(source.label)}</h3><p>${escapeHTML(source.description)}</p><button type="button" class="text-button" data-source="${escapeHTML(id)}">Lihat nota sumber ↗</button>
  </article>`).join("");
  return `<div class="drawer-note"><strong>Nota penting:</strong> Dashboard ini membezakan fakta laporan, unjuran yang dipetik RCI, dan angka terbitan yang dikira untuk membantu eksplorasi. Ia bukan audit baharu terhadap LTH.</div>${items}`;
}

function openDrawer(sourceId = null) {
  const drawer = $("#evidence-drawer");
  $("#drawer-content").innerHTML = sourceId ? sourceDrawerHTML(sourceId) : allSourcesHTML();
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  $("#drawer-backdrop").hidden = false;
  document.body.classList.add("drawer-open");
}

function closeDrawer() {
  const drawer = $("#evidence-drawer");
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  $("#drawer-backdrop").hidden = true;
  document.body.classList.remove("drawer-open");
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function setView(view, options = {}) {
  state.view = view;
  if (options.year) state.selectedYear = Number(options.year);
  render();
  if (options.scroll !== false) $("#view-root").scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateNavigation() {
  $$(".view-tab").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.view === state.view));
  const names = { story: "gambaran besar", cost: "kos & HAFIS", hibah: "hibah & jurang", recovery: "pemulihan aset", investments: "pelaburan bermasalah", timeline: "kronologi" };
  $("#view-status").textContent = `Paparan: ${names[state.view]}`;
  $("#evidence-toggle").setAttribute("aria-pressed", String(state.evidence));
  document.body.classList.toggle("evidence-on", state.evidence);
}

function render() {
  updateNavigation();
  const views = { story: renderStory, cost: renderCost, hibah: renderHibah, recovery: renderRecovery, investments: renderInvestments, timeline: renderTimeline };
  root().innerHTML = views[state.view]();
  bindViewEvents();
}

function renderStory() {
  const latest = projectionCost[projectionCost.length - 1];
  return `<div class="view-heading">
    <div><p class="eyebrow">01 / gambaran besar</p><h2>Cerita ini bukan satu angka.<br /><em>Ia satu rangkaian tekanan.</em></h2><p>Klik mana-mana pintu masuk di bawah. Setiap perspektif menggunakan set data yang berbeza, tetapi berkongsi tahun, entiti dan bukti laporan yang sama.</p></div>
    <div class="view-actions">${sourceTag("overview", "sumber laporan")}</div>
  </div>
  <div class="story-hero">
    <article class="story-question"><p class="panel-kicker">Soalan utama</p><h3>Apabila kos sebenar naik, jurang itu pergi ke mana?</h3><p>Jawapan laporan: sebahagian ditanggung melalui HAFIS daripada keuntungan pelaburan LTH. Itu menghubungkan urusan haji dengan hibah pendeposit, prestasi pelaburan dan keupayaan institusi menanggung liabiliti.</p></article>
    <article class="story-answer"><p class="panel-kicker">Bacaan paling ringkas</p><h3>Tekanan berpindah dari satu lapisan ke lapisan lain.</h3><p>Bayaran jemaah yang rendah mengekalkan akses, tetapi jurang kos memakan pulangan yang boleh diagih. Bila aset dan amalan perakaunan pula dipersoalkan, pemulihan UJSB memindahkan risiko ke struktur Sukuk dan komitmen Kerajaan.</p></article>
  </div>
  <div class="grid grid-3">
    <article class="panel insight-card"><div><span class="insight-index">01 / kos kepada jemaah</span><h3>HAFIS seorang lebih dua kali ganda dalam enam tahun.</h3><p>Daripada RM6,175 pada 2014 kepada RM12,920 pada 2019, sedangkan bayaran jemaah kekal RM9,980. Ini ialah fakta 2014–2019, bukan unjuran.</p></div><div class="insight-footer">${chip("fact", "fakta laporan")}${sourceTag("costActual", "PDF 204")}</div></article>
    <article class="panel insight-card soft-mustard"><div><span class="insight-index">02 / hibah dan angka kewangan</span><h3>Tahun 2017 kelihatan untung, tetapi jurangnya sudah negatif.</h3><p>Jadual PwC menunjukkan kekurangan RM769 juta sebelum agihan dan RM4.093 bilion selepas agihan. RCI turut membincangkan RAV dan polisi rosot nilai.</p></div><div class="insight-footer">${chip("fact", "jadual PwC")}${sourceTag("hibah", "PDF 112")}</div></article>
    <article class="panel insight-card soft-blue"><div><span class="insight-index">03 / pemulihan</span><h3>Nilai pindahan bukan sama dengan nilai pasaran.</h3><p>Aset dipindahkan kepada UJSB pada RM19.9 bilion; nilai pasaran yang disebut ketika itu RM9.729 bilion. Pertukaran ini datang bersama Sukuk RM27.5 bilion.</p></div><div class="insight-footer">${chip("fact", "fakta laporan")}${sourceTag("recovery", "PDF 159")}</div></article>
  </div>
  <div class="grid grid-2" style="margin-top:16px">
    <article class="panel flow-panel"><div class="panel-title"><div><p class="panel-kicker">Peta sebab-akibat laporan</p><h3>Dari kos haji kepada risiko sistemik</h3><p>Ini ialah hubungan yang dinyatakan atau dibincangkan dalam laporan — bukan model kausal statistik baharu.</p></div>${sourceTag("costProjection", "PDF 206")}</div><div class="flow">
      <div class="flow-step"><span class="flow-num">01</span><h4>Kos haji meningkat</h4><p>Kos seorang: RM16,155 (2014) → RM22,900 (2019); unjuran RM37,729 pada 2030.</p></div>
      <div class="flow-step"><span class="flow-num">02</span><h4>HAFIS memakan keuntungan</h4><p>HAFIS diambil daripada keuntungan pelaburan yang boleh diagih kepada pendeposit.</p></div>
      <div class="flow-step"><span class="flow-num">03</span><h4>Tekanan berganda</h4><p>Hibah, deposit, pelaburan, aset dan komitmen UJSB bertemu dalam persoalan kelestarian LTH.</p></div>
    </div></article>
    <article class="panel"><div class="panel-title"><div><p class="panel-kicker">Pilih soalan</p><h3>Terus ke analisis yang anda mahu</h3><p>Dashboard ini sengaja membenarkan anda menukar perspektif.</p></div></div><div class="question-list">
      <button class="question-button" data-go-view="cost" type="button"><span class="q-num">01</span><span class="q-copy">Berapa banyak kos haji sebenarnya ditanggung jemaah dan LTH?</span><span class="q-arrow">→</span></button>
      <button class="question-button" data-go-view="hibah" type="button"><span class="q-num">02</span><span class="q-copy">Adakah agihan hibah bergerak seiring dengan ruang kewangan LTH?</span><span class="q-arrow">→</span></button>
      <button class="question-button" data-go-view="recovery" type="button"><span class="q-num">03</span><span class="q-copy">Apa yang bertukar tangan dalam pelan pemulihan UJSB?</span><span class="q-arrow">→</span></button>
      <button class="question-button" data-go-view="investments" type="button"><span class="q-num">04</span><span class="q-copy">Kes pelaburan mana yang menunjukkan kerugian atau pendedahan paling besar?</span><span class="q-arrow">→</span></button>
      <button class="question-button" data-go-view="timeline" type="button"><span class="q-num">05</span><span class="q-copy">Bagaimana keputusan utama berlaku dari 2001 hingga unjuran 2030?</span><span class="q-arrow">→</span></button>
    </div></article>
  </div>
  <div class="data-notice" style="margin-top:16px"><span>↳</span><span><strong>Had bacaan:</strong> Laporan ialah OCR daripada PDF. Dashboard mengekalkan unit, status fakta/unjuran dan nota “tiada penghantaran jemaah”; ia tidak mengisi jurang data sebagai sifar.</span></div>`;
}

function costYearOptions() {
  const values = [...actualCost.map((row) => row.year), 2020, 2021, ...projectionCost.map((row) => row.year)];
  return values.map((year) => `<option value="${year}" ${Number(state.selectedYear) === year ? "selected" : ""}>${year}${year === 2020 || year === 2021 ? " · tiada penghantaran" : ""}</option>`).join("");
}

function costChartData() {
  return [...actualCost, ...noPilgrimage, ...projectionCost];
}

function renderCostChart() {
  const data = costChartData();
  const width = 900; const height = 328; const left = 50; const right = 48; const top = 28; const bottom = 46;
  const plotW = width - left - right; const plotH = height - top - bottom; const maxY = 40000;
  const step = plotW / (data.length - 1); const x = (index) => left + index * step; const y = (value) => top + plotH - (value / maxY) * plotH;
  const yTicks = [0, 10000, 20000, 30000, 40000];
  const grid = yTicks.map((tick) => `<line x1="${left}" y1="${y(tick)}" x2="${width - right}" y2="${y(tick)}" class="chart-gridline" /><text x="${left - 9}" y="${y(tick) + 3}" class="chart-label mono" text-anchor="end">${tick === 0 ? "0" : `${tick / 1000}k`}</text>`).join("");
  const actualEnd = data.findIndex((row) => row.year === 2022);
  const dividerX = x(actualEnd) - step / 2;
  const divider = `<line x1="${dividerX}" y1="${top - 4}" x2="${dividerX}" y2="${top + plotH + 2}" stroke="var(--line-dark)" stroke-dasharray="3 4" /><text x="${dividerX - 7}" y="${top - 11}" class="chart-label mono" text-anchor="end">sebenar</text><text x="${dividerX + 7}" y="${top - 11}" class="chart-label mono">unjuran</text>`;
  const bars = data.map((row, index) => {
    const center = x(index); const barW = Math.max(16, Math.min(26, step * .62));
    if (row.type === "gap") return `<g class="gap-marker" data-year="${row.year}"><line x1="${center}" y1="${top + 10}" x2="${center}" y2="${top + plotH}" stroke="var(--line)" stroke-dasharray="2 4" /><text x="${center}" y="${top + plotH / 2}" class="chart-label" text-anchor="middle" transform="rotate(-90 ${center} ${top + plotH / 2})">tiada penghantaran jemaah</text><text x="${center}" y="${height - 18}" class="chart-label mono" text-anchor="middle">${row.year}</text></g>`;
    const paymentTop = y(row.payment); const costTop = y(row.cost); const hafisH = paymentTop - costTop; const paymentH = y(0) - paymentTop;
    const selected = Number(state.selectedYear) === row.year;
    return `<g class="cost-bar-group ${selected ? "is-selected" : ""}" data-year="${row.year}" tabindex="0" role="button" aria-label="Pilih tahun ${row.year}">
      <rect x="${center - barW / 2}" y="${paymentTop}" width="${barW}" height="${paymentH}" rx="2" class="chart-bar bar-payment ${selected ? "" : ""}" data-year="${row.year}" />
      <rect x="${center - barW / 2}" y="${costTop}" width="${barW}" height="${hafisH}" rx="2" class="chart-bar ${row.type === "projection" ? "bar-projection" : "bar-hafis"}" data-year="${row.year}" />
      ${selected ? `<line x1="${center}" y1="${top}" x2="${center}" y2="${top + plotH}" stroke="var(--ink)" stroke-width="1" stroke-dasharray="2 3" opacity=".45" />` : ""}
      <text x="${center}" y="${height - 18}" class="chart-label mono" text-anchor="middle">${row.year}</text></g>`;
  }).join("");
  const actualLinePoints = data.filter((row) => row.type === "fact").map((row) => `${x(data.indexOf(row))},${y(row.cost)}`).join(" ");
  const projectionLinePoints = data.filter((row) => row.type === "projection").map((row) => `${x(data.indexOf(row))},${y(row.cost)}`).join(" ");
  const points = data.map((row, index) => row.cost ? `<circle cx="${x(index)}" cy="${y(row.cost)}" r="${Number(state.selectedYear) === row.year ? 5 : 3.3}" class="chart-point ${Number(state.selectedYear) === row.year ? "selected" : ""}" data-year="${row.year}" tabindex="0" role="button" aria-label="Pilih tahun ${row.year}" />` : "").join("");
  return `<div class="chart-wrap"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Kos haji seorang, bayaran jemaah dan HAFIS dari tahun 2014 hingga 2030"><g>${grid}${divider}<line x1="${left}" y1="${y(0)}" x2="${width - right}" y2="${y(0)}" class="chart-axis" />${bars}<polyline points="${actualLinePoints}" class="line-cost" /><polyline points="${projectionLinePoints}" class="line-cost" stroke-dasharray="5 4" />${points}<text x="${left}" y="14" class="chart-label">RM seorang</text></g></svg></div>
    <div class="chart-legend"><span><i class="legend-block bar-payment"></i>bayaran jemaah</span><span><i class="legend-block bar-hafis"></i>HAFIS seorang</span><span><i class="legend-block" style="background:var(--mustard)"></i>kos haji sebenar</span></div>
    <p class="chart-note"><strong>Cara baca:</strong> bar bertingkat = siapa membayar kos seorang; garisan mustard = jumlah kos seorang. Klik mana-mana tahun untuk menyelaras bacaan.</p>`;
}

function renderHafisTotalChart() {
  const data = [...actualCost, ...noPilgrimage, ...projectionCost]; const width = 900; const height = 260; const left = 53; const right = 48; const top = 24; const bottom = 42; const maxY = 800;
  const plotW = width - left - right; const plotH = height - top - bottom; const step = plotW / (data.length - 1); const x = (i) => left + i * step; const y = (v) => top + plotH - (v / maxY) * plotH;
  const yTicks = [0, 200, 400, 600, 800];
  const grid = yTicks.map((tick) => `<line x1="${left}" y1="${y(tick)}" x2="${width - right}" y2="${y(tick)}" class="chart-gridline" /><text x="${left - 9}" y="${y(tick) + 3}" class="chart-label mono" text-anchor="end">${tick === 0 ? "0" : `RM${tick}j`}</text>`).join("");
  const actual = data.filter((row) => row.type === "fact"); const projection = data.filter((row) => row.type === "projection");
  const actualPoints = actual.map((row) => `${x(data.indexOf(row))},${y(row.total)}`).join(" "); const projectedPoints = projection.map((row) => `${x(data.indexOf(row))},${y(row.total)}`).join(" ");
  const actualArea = `${actualPoints} ${x(data.indexOf(actual[actual.length - 1]))},${y(0)} ${x(data.indexOf(actual[0]))},${y(0)}`;
  const projectionArea = `${projectedPoints} ${x(data.indexOf(projection[projection.length - 1]))},${y(0)} ${x(data.indexOf(projection[0]))},${y(0)}`;
  const gapMarkers = data.filter((row) => row.type === "gap").map((row) => { const center = x(data.indexOf(row)); return `<g class="gap-marker"><line x1="${center}" y1="${top + 10}" x2="${center}" y2="${y(0)}" stroke="var(--line)" stroke-dasharray="2 4" /><text x="${center}" y="${top + plotH / 2}" class="chart-label" text-anchor="middle" transform="rotate(-90 ${center} ${top + plotH / 2})">tiada penghantaran</text></g>`; }).join("");
  const points = data.map((row, i) => row.total !== undefined ? `<circle class="chart-point ${Number(state.selectedYear) === row.year ? "selected" : ""}" cx="${x(i)}" cy="${y(row.total)}" r="${Number(state.selectedYear) === row.year ? 5 : 3.3}" data-year="${row.year}" tabindex="0" role="button" aria-label="Pilih tahun ${row.year}" />` : "").join("");
  const labels = data.map((row, i) => `<text x="${x(i)}" y="${height - 16}" class="chart-label mono" text-anchor="middle">${row.year}</text>`).join("");
  return `<div class="chart-wrap"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Jumlah HAFIS yang ditanggung LTH dari tahun 2014 hingga 2030"><g>${grid}<line x1="${left}" y1="${y(0)}" x2="${width - right}" y2="${y(0)}" class="chart-axis" /><polygon points="${actualArea}" class="area-hafis" /><polygon points="${projectionArea}" class="area-hafis" opacity=".55" /><polyline points="${actualPoints}" fill="none" stroke="var(--red-deep)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" /><polyline points="${projectedPoints}" fill="none" stroke="var(--red)" stroke-width="2.5" stroke-dasharray="5 4" stroke-linecap="round" stroke-linejoin="round" />${gapMarkers}${points}${labels}<text x="${left}" y="14" class="chart-label">jumlah HAFIS · RM juta</text></g></svg></div>
    <div class="chart-legend"><span><i class="legend-block" style="background:var(--red-deep)"></i>sebenar 2014–2019</span><span><i class="legend-block" style="background:var(--red)"></i>unjuran 2022–2030</span></div>
    <p class="chart-note"><strong>Jangan keliru:</strong> jumlah HAFIS bergantung pada kos seorang <em>dan</em> bilangan jemaah; ia bukan kadar seorang.</p>`;
}

function renderSelectedCost() {
  const row = getYearData(state.selectedYear);
  if (!row || row.type === "gap") return `<div class="selected-year"><div class="selected-year-mark">${state.selectedYear}</div><div><h4>Tiada penghantaran jemaah pada ${state.selectedYear}</h4><p>Laporan tidak menyatakan kos, bayaran atau jumlah HAFIS sebagai sifar untuk tahun ini. Ia hanya memberi nota bahawa tiada penghantaran jemaah haji.</p><div class="year-numbers">${chip("caveat", "jangan isi sebagai sifar")}${sourceTag("costActual", "PDF 204")}</div></div></div>`;
  const status = row.type === "projection" ? "Unjuran RCI" : "Fakta laporan";
  return `<div class="selected-year"><div class="selected-year-mark">${row.year}</div><div><h4>${row.type === "projection" ? "Angka dalam jadual unjuran RCI" : "Angka sebenar yang dipetik laporan"}</h4><p>${row.type === "projection" ? "Ini bukan data semasa atau ramalan yang dikemas kini. Jadual RCI menggunakan bayaran RM12,980 seorang." : "Bayaran jemaah kekal RM9,980 dalam jadual ini."}</p><div class="year-numbers"><span class="mini-metric"><small>kos seorang</small><strong class="mustard">${fmtRM(row.cost)}</strong></span><span class="mini-metric"><small>bayaran</small><strong class="blue">${fmtRM(row.payment)}</strong></span><span class="mini-metric"><small>HAFIS seorang</small><strong class="red">${fmtRM(row.hafis)} · ${fmtPct(row.hafisPct)}</strong></span><span class="mini-metric"><small>jumlah HAFIS</small><strong>${formatHafisTotal(row.total)}</strong></span>${chip(row.type === "projection" ? "projection" : "fact", status)}</div></div></div>`;
}

function renderSimulator() {
  const base = projectionCost.find((row) => row.year === 2030);
  return `<article class="panel simulator"><div class="panel-title"><div><p class="panel-kicker">Makmal anggaran</p><h3>Jika kita ubah andaian 2030</h3><p>Gunakan formula mudah untuk menguji skala jurang — bukan untuk menghasilkan ramalan rasmi.</p></div>${sourceTag("costProjection", "asas RCI")}</div><div class="simulator-grid"><div class="grid">
    <div class="sim-control"><label for="sim-pilgrims">Bilangan jemaah <output id="sim-pilgrims-output">30,000</output></label><input id="sim-pilgrims" type="range" min="10000" max="60000" step="1000" value="30000" /></div>
    <div class="sim-control"><label for="sim-cost">Kos seorang <output id="sim-cost-output">RM37,729</output></label><input id="sim-cost" type="range" min="25000" max="50000" step="100" value="37729" /></div>
    <div class="sim-control"><label for="sim-payment">Bayaran jemaah <output id="sim-payment-output">RM12,980</output></label><input id="sim-payment" type="range" min="0" max="30000" step="100" value="12980" /></div>
  </div><div><div class="sim-result"><div class="sim-output"><span>HAFIS seorang</span><strong id="sim-hafis">RM24,749</strong><small id="sim-share">65.6% daripada kos</small></div><div class="sim-output"><span>Jumlah HAFIS</span><strong id="sim-total">RM742.47j</strong><small>bilangan × HAFIS seorang</small></div><div class="sim-output"><span>Anggaran kesan hibah</span><strong id="sim-impact">0.74 mata</strong><small>berdasarkan nisbah RM400j ≈ 0.4 mata</small></div></div><p class="sim-disclaimer">Andaian awal meniru baris RCI 2030: 30,000 jemaah, kos RM37,729, bayaran RM12,980. Kesan hibah ialah terbitan ilustrasi daripada hubungan yang disebut laporan, bukan unjuran hibah rasmi.</p></div></div></article>`;
}

function renderCost() {
  return `<div class="view-heading"><div><p class="eyebrow">02 / kos & HAFIS</p><h2>Jurang yang <em>semakin lebar</em></h2><p>Bar bertingkat membezakan bayaran jemaah daripada HAFIS seorang. Garisan mustard menunjukkan kos penuh. Carta kedua membezakan kesan seorang daripada jumlah yang perlu ditanggung LTH.</p></div><div class="view-actions"><div class="select-wrap"><select id="cost-year" aria-label="Pilih tahun">${costYearOptions()}</select></div>${sourceTag("costActual", "jadual 2014–19")}${sourceTag("costProjection", "jadual 2022–30")}</div></div>
  <div class="data-notice"><span>!</span><span><strong>Status masa:</strong> 2014–2019 ialah data sebenar dalam laporan. 2022–2030 ialah unjuran RCI. 2020–2021 dilabel “tiada penghantaran jemaah”, bukan sifar.</span></div>
  <article class="panel chart-panel" style="margin-top:16px"><div class="panel-title"><div><p class="panel-kicker">Kos seorang</p><h3>Siapa bayar satu pakej haji?</h3><p>Apabila bahagian merah membesar, semakin besar kos yang tidak dibayar terus oleh jemaah dalam jadual ini.</p></div>${chip("fact", "koordinat tahun dikongsi")}</div>${renderCostChart()}${renderSelectedCost()}</article>
  <article class="panel chart-panel" style="margin-top:16px"><div class="panel-title"><div><p class="panel-kicker">Beban LTH</p><h3>HAFIS seorang kecil berbeza daripada jumlah HAFIS</h3><p>Jumlah melonjak atau turun kerana bilangan jemaah turut berubah; 2017–2019 bukan sekadar sambungan garis kos seorang.</p></div>${sourceTag("costActual", "PDF 204")}</div>${renderHafisTotalChart()}</article>
  <div style="margin-top:16px">${renderSimulator()}</div>`;
}

function renderHibahRateChart() {
  const width = 820; const height = 280; const left = 52; const right = 32; const top = 25; const bottom = 44; const maxY = 10; const plotW = width - left - right; const plotH = height - top - bottom; const step = plotW / hibahRates.length; const y = (v) => top + plotH - (v / maxY) * plotH;
  const grid = [0, 2, 4, 6, 8, 10].map((tick) => `<line x1="${left}" y1="${y(tick)}" x2="${width - right}" y2="${y(tick)}" class="chart-gridline" /><text x="${left - 8}" y="${y(tick) + 3}" class="chart-label mono" text-anchor="end">${tick}%</text>`).join("");
  const bars = hibahRates.map((row, i) => { const cx = left + step * i + step / 2; const groupW = Math.min(38, step * .62); const barW = Math.max(8, groupW / 2 - 2); const selected = row.year === Number(state.hibahYear); return `<g class="hibah-bar-group ${selected ? "is-selected" : ""}" data-year="${row.year}" tabindex="0" role="button" aria-label="Pilih hibah ${row.year}"><rect x="${cx - groupW / 2}" y="${y(row.annual)}" width="${barW}" height="${y(0) - y(row.annual)}" rx="2" class="chart-bar bar-payment ${selected ? "is-selected" : ""}" data-year="${row.year}" /><rect x="${cx + 2}" y="${y(row.haj)}" width="${barW}" height="${y(0) - y(row.haj)}" rx="2" class="chart-bar bar-hafis" data-year="${row.year}" /><text x="${cx}" y="${height - 18}" class="chart-label mono" text-anchor="middle">${row.year}</text></g>`; }).join("");
  return `<div class="chart-wrap"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Kadar hibah tahunan dan hibah haji bagi tahun 2014 hingga 2021"><g>${grid}<line x1="${left}" y1="${y(0)}" x2="${width - right}" y2="${y(0)}" class="chart-axis" />${bars}</g></svg></div><div class="chart-legend"><span><i class="legend-block bar-payment"></i>hibah tahunan</span><span><i class="legend-block bar-hafis"></i>hibah haji</span></div><p class="chart-note"><strong>Klik tahun:</strong> kadar ialah peratus agihan yang dipetik laporan, bukan kadar pulangan pasaran yang dinormalkan.</p>`;
}

function renderGapChart() {
  const width = 820; const height = 300; const left = 58; const right = 30; const top = 28; const bottom = 45; const minY = -4500; const maxY = 3500; const plotW = width - left - right; const plotH = height - top - bottom; const step = plotW / financialGaps.length; const y = (v) => top + ((maxY - v) / (maxY - minY)) * plotH;
  const gridTicks = [-4000, -2000, 0, 2000]; const grid = gridTicks.map((tick) => `<line x1="${left}" y1="${y(tick)}" x2="${width - right}" y2="${y(tick)}" class="${tick === 0 ? "zero-line" : "chart-gridline"}" /><text x="${left - 8}" y="${y(tick) + 3}" class="chart-label mono" text-anchor="end">${tick === 0 ? "0" : `${tick / 1000}b`}</text>`).join("");
  const bars = financialGaps.map((row, i) => { const cx = left + step * i + step / 2; const bw = Math.min(28, step * .25); const selected = row.year === Number(state.hibahYear); return `<g class="gap-point ${selected ? "is-selected" : ""}" data-year="${row.year}" tabindex="0" role="button" aria-label="Pilih jurang ${row.year}"><rect x="${cx - bw - 3}" y="${Math.min(y(row.pre), y(0))}" width="${bw}" height="${Math.abs(y(row.pre) - y(0))}" rx="2" class="${row.pre >= 0 ? "positive-fill" : "negative-fill"}" stroke="${row.pre >= 0 ? "var(--green)" : "var(--red)"}" /><rect x="${cx + 3}" y="${Math.min(y(row.post), y(0))}" width="${bw}" height="${Math.abs(y(row.post) - y(0))}" rx="2" class="negative-fill" stroke="var(--red)" />${selected ? `<line x1="${cx}" y1="${top}" x2="${cx}" y2="${top + plotH}" stroke="var(--ink)" stroke-dasharray="2 3" opacity=".4" />` : ""}<text x="${cx}" y="${height - 18}" class="chart-label mono" text-anchor="middle">${row.year}</text></g>`; }).join("");
  return `<div class="chart-wrap"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Kekurangan atau lebihan aset sebelum dan selepas agihan keuntungan"><g>${grid}${bars}<text x="${left}" y="14" class="chart-label">RM juta · positif = lebihan, negatif = kekurangan</text></g></svg></div><div class="chart-legend"><span><i class="legend-block" style="background:var(--green-soft);border:1px solid var(--green)"></i>sebelum agihan</span><span><i class="legend-block" style="background:var(--red-soft);border:1px solid var(--red)"></i>selepas agihan</span></div><p class="chart-note"><strong>Soalan penting:</strong> bar kanan menunjukkan apa yang tinggal selepas agihan hibah, bukan “untung bersih” semata-mata.</p>`;
}

function renderSelectedHibah() {
  const rate = hibahRates.find((row) => row.year === Number(state.hibahYear)); const gap = financialGaps.find((row) => row.year === Number(state.hibahYear));
  if (!rate || !gap) return "";
  return `<div class="selected-year"><div class="selected-year-mark">${state.hibahYear}</div><div><h4>Angka yang dipilih</h4><p>Gunakan dua carta serentak: kadar hibah ialah peratus; jurang ialah RM juta dalam jadual PwC.</p><div class="year-numbers"><span class="mini-metric"><small>hibah tahunan</small><strong class="blue">${fmtPct(rate.annual, 2)}</strong></span><span class="mini-metric"><small>hibah haji</small><strong class="red">${fmtPct(rate.haj, 2)}</strong></span><span class="mini-metric"><small>sebelum agihan</small><strong class="${gap.pre >= 0 ? "mustard" : "red"}">${fmtRMm(gap.pre)}</strong></span><span class="mini-metric"><small>selepas agihan</small><strong class="red">${fmtRMm(gap.post)}</strong></span>${sourceTag("hibah", "PDF 112/120")}</div></div></div>`;
}

function renderRavComparison() {
  const max = 5000;
  return `<div class="comparison-row"><div class="compare-box"><h4>Angka aset dalam jadual 2017</h4><p>Jumlah aset dalam jadual PwC / penyata yang dipetik</p><span class="compare-amount">${fmtRMm(rav2017.reportedAssets)}</span><div class="compare-bar"><span style="width:${rav2017.reportedAssets / 75000 * 100}%"></span></div><div class="compare-caption"><span>aset</span><span>RM70.317b</span></div></div><div class="compare-box"><h4>Tambah pelarasan RAV</h4><p>Nilai yang boleh direalisasi ditambah oleh pengurusan untuk pengiraan RAV</p><span class="compare-amount positive">+${fmtRMm(rav2017.ravAdjustment)}</span><div class="compare-bar"><span class="green" style="width:${rav2017.ravAdjustment / max * 100}%"></span></div><div class="compare-caption"><span>pelarasan</span><span>RM4.466b</span></div></div><div class="compare-box"><h4>Kesimpulan RAV vs isu PwC</h4><p>RAV menunjukkan lebihan terlaras; PwC turut menyebut rosot nilai tidak direkodkan.</p><span class="compare-amount negative">RM${fmtNumber(Math.abs(rav2017.unrecordedImpairment) / 1000, 3)}b</span><div class="compare-bar"><span style="width:${rav2017.unrecordedImpairment / max * 100}%"></span></div><div class="compare-caption"><span>rosot nilai terkumpul tidak diambil kira</span><span>RM1.537b</span></div></div></div>`;
}

function renderHibah() {
  return `<div class="view-heading"><div><p class="eyebrow">03 / hibah & jurang</p><h2>Hibah tinggi<br /><em>tidak semestinya ruang luas.</em></h2><p>Bandingkan kadar agihan dengan jurang aset-liabiliti sebelum dan selepas agihan. Kemudian lihat sendiri bagaimana RCI membincangkan RAV — ukuran terbitan yang digunakan ketika itu.</p></div><div class="view-actions"><div class="select-wrap"><select id="hibah-year" aria-label="Pilih tahun hibah">${hibahRates.map((row) => `<option value="${row.year}" ${row.year === Number(state.hibahYear) ? "selected" : ""}>${row.year}</option>`).join("")}</select></div>${sourceTag("hibah", "PDF 112/120")}</div></div>
  <div class="grid grid-2"><article class="panel chart-panel"><div class="panel-title"><div><p class="panel-kicker">Kadar agihan</p><h3>Hibah tahunan + hibah haji</h3><p>Empat tahun pertama mempunyai dua lapisan agihan; selepas itu jadual menyenaraikan hibah tahunan sahaja.</p></div>${sourceTag("hibah", "PDF 120")}</div>${renderHibahRateChart()}</article><article class="panel chart-panel"><div class="panel-title"><div><p class="panel-kicker">Ruang kewangan</p><h3>Sebelum agihan vs selepas agihan</h3><p>Nilai negatif bermaksud kekurangan dalam jadual yang dipetik, bukan skor prestasi.</p></div>${sourceTag("hibah", "PDF 112")}</div>${renderGapChart()}</article></div>
  ${renderSelectedHibah()}
  <article class="panel soft-mustard" style="margin-top:16px"><div class="panel-title"><div><p class="panel-kicker">Ujian ketelusan angka</p><h3>Apa berubah jika kita melihat RAV?</h3><p>RCI membezakan antara angka aset yang dilaporkan dan pelarasan RAV yang digunakan dalam pengiraan hibah. Panel ini menunjukkan struktur pengiraannya, bukan mengesahkan salah satu ukuran sebagai nilai pasaran sebenar.</p></div>${sourceTag("accounting", "PDF 116–117")}</div>${renderRavComparison()}<div class="data-notice" style="margin-top:14px"><span>!</span><span><strong>Batasan:</strong> RAV ialah anggaran pengurusan dan bukan set data yang seragam dengan angka penyata kewangan beraudit. Jangan campur atau jumlahkan kedua-duanya seolah-olah satu siri masa.</span></div></article>`;
}

function renderAssetBars() {
  const max = Math.max(...transferredAssets.map((row) => Math.max(row.book, row.transfer, row.market)));
  const selected = transferredAssets.find((row) => row.name === state.selectedAsset) || transferredAssets[2];
  const rows = transferredAssets.map((row) => `<button type="button" class="asset-row" data-asset="${escapeHTML(row.name)}" aria-pressed="${row.name === selected.name}"><span class="asset-name">${escapeHTML(row.name)}</span><span class="asset-bars-stack"><span class="asset-track book"><span style="width:${row.book / max * 100}%"></span></span><span class="asset-track transfer"><span style="width:${row.transfer / max * 100}%"></span></span><span class="asset-track market"><span style="width:${row.market / max * 100}%"></span></span><span class="asset-track-label"><span class="asset-label-book">buku ${fmtRMm(row.book)}</span><span class="asset-label-transfer">pindah ${fmtRMm(row.transfer)}</span><span class="asset-label-market">pasaran ${fmtRMm(row.market)}</span></span></span></button>`).join("");
  const gap = selected.transfer - selected.market;
  return `<div class="asset-bars">${rows}</div><div class="asset-selected"><h4>${escapeHTML(selected.name)}</h4><p>Jurang pindah → pasaran: <strong>${fmtRMm(gap)}</strong>. Klik kategori lain untuk menukar fokus.</p></div>`;
}

function renderPropertyTable() {
  return `<div class="table-wrap"><table><thead><tr><th>Jenis aset</th><th class="num">Pindahan (RM juta)</th><th class="num">Pasaran Dis 2021 (RM juta)</th><th class="num">Susut nilai</th></tr></thead><tbody>${transferredProperty.map((row) => `<tr><td><strong>${escapeHTML(row.name)}</strong></td><td class="num">${fmtNumber(row.transfer, 1)}</td><td class="num">${fmtNumber(row.market, 1)}</td><td class="num">${fmtPct((1 - row.market / row.transfer) * 100, 1)}</td></tr>`).join("")}</tbody></table></div><p class="table-caption">Jadual hartanah 29 aset: nilai pindahan RM2,246.68 juta dan nilai pasaran Disember 2021 RM1,202.68 juta.</p>`;
}

function renderBluechipTable() {
  return `<div class="table-wrap"><table><thead><tr><th>Kaunter</th><th class="num">Pindahan (RM juta)</th><th class="num">Pasaran 31-Dis-18</th><th class="num">Kejatuhan</th><th class="num">Harga 8-Jun-22</th></tr></thead><tbody>${bluechips.map((row) => `<tr><td><strong>${row.name}</strong></td><td class="num">${fmtNumber(row.transfer, 1)}</td><td class="num">${fmtNumber(row.market, 1)}</td><td class="num" style="color:var(--red-deep)">${fmtPct(row.drop, 1)}</td><td class="num">RM${fmtNumber(row.current, 2)}</td></tr>`).join("")}</tbody></table></div><p class="table-caption">Jumlah lima kaunter: nilai pindahan RM3,605.98 juta, nilai pasaran RM2,659.91 juta, kejatuhan RM946.07 juta.</p>`;
}

function renderRecovery() {
  return `<div class="view-heading"><div><p class="eyebrow">04 / pemulihan aset</p><h2>Menutup jurang<br /><em>dengan struktur baharu.</em></h2><p>Pelan pemulihan memindahkan aset kurang berdaya saing kepada UJSB dan menggantikannya dengan Sukuk. Lihat tiga lapisan nilai itu secara berasingan: buku, pindahan dan pasaran.</p></div><div class="view-actions">${sourceTag("recovery", "PDF 159–166")}</div></div>
  <div class="grid grid-2"><article class="panel"><div class="panel-title"><div><p class="panel-kicker">Tiga nilai, tiga maksud</p><h3>Nilai aset yang bertukar tangan</h3><p>Skala setiap bar relatif dalam kategori itu; bukan perbandingan harga antara kategori.</p></div>${chip("fact", "RM juta")}</div>${renderAssetBars()}<div class="chart-legend"><span><i class="legend-block bar-payment"></i>nilai buku TH</span><span><i class="legend-block" style="background:var(--mustard)"></i>nilai pindahan</span><span><i class="legend-block bar-hafis"></i>nilai pasaran</span></div></article><article class="panel red"><div class="panel-title"><div><p class="panel-kicker">Aliran kewajipan</p><h3>RM19.9b aset → RM27.5b Sukuk</h3><p>Pertukaran ini menutup jurang pada masa pemulihan, tetapi membina jadual obligasi yang perlu dilunaskan.</p></div>${sourceTag("recovery", "PDF 163–167")}</div><div class="waterfall"><div class="water-step"><span class="water-year">2018</span><div><h4>Aset dipindahkan</h4><p><strong>RM19.9b</strong> nilai pindahan berbanding RM9.729b nilai pasaran yang disebut.</p></div></div><div class="water-step"><span class="water-year">2019</span><div><h4>Sukuk Siri 1 + 2</h4><p><strong>RM27.5b</strong> obligasi, termasuk RM7.65b hasil tertunda.</p></div></div><div class="water-step"><span class="water-year">2020</span><div><h4>Tunai diterima</h4><p><strong>RM500j</strong> diterima setakat yang disebut; RM300j bayaran tunai + RM200j penebusan awal.</p></div></div><div class="water-step"><span class="water-year">RMK-11→13</span><div><h4>Komitmen Kerajaan</h4><p><strong>RM17.8b</strong> diluluskan untuk shortfall penebusan, termasuk anggaran RM1.73b setahun.</p></div></div></div></article></div>
  <article class="panel" style="margin-top:16px"><div class="panel-title"><div><p class="panel-kicker">Hartanah yang berpindah</p><h3>Selepas pemindahan, pasaran masih bergerak</h3><p>Jadual berikut menunjukkan nilai pindahan dan nilai pasaran Disember 2021 bagi jenis hartanah yang diringkaskan laporan.</p></div>${sourceTag("recovery", "PDF 160–161")}</div>${renderPropertyTable()}</article>
  <article class="panel" style="margin-top:16px"><div class="panel-title"><div><p class="panel-kicker">Ekuiti yang dipindahkan</p><h3>Lima kaunter blue-chip dalam satu potongan laporan</h3><p>Bandingkan harga/nilai ketika pindahan, pasaran 31 Disember 2018 dan harga seunit pada 8 Jun 2022.</p></div>${sourceTag("recovery", "PDF 162")}</div>${renderBluechipTable()}</article>
  <div class="data-notice" style="margin-top:16px"><span>↳</span><span><strong>Jangan simpulkan terlalu cepat:</strong> nilai pindahan yang lebih tinggi daripada pasaran tidak dengan sendirinya membuktikan prestasi UJSB atau keuntungan Kerajaan. Ia menunjukkan struktur nilai yang digunakan dalam pelan pemulihan dan risiko yang perlu dilunaskan.</span></div>`;
}

function investmentChartRecords() {
  return investmentCases.filter((item) => item.amount !== null && item.loss !== null && !item.notComparable);
}

function renderInvestmentScatter() {
  const records = investmentChartRecords(); const width = 860; const height = 340; const left = 58; const right = 35; const top = 26; const bottom = 52; const maxX = 1400; const maxY = 1200; const plotW = width - left - right; const plotH = height - top - bottom; const x = (v) => left + (v / maxX) * plotW; const y = (v) => top + plotH - (v / maxY) * plotH;
  const ticksX = [0, 300, 600, 900, 1200]; const ticksY = [0, 300, 600, 900, 1200]; const grid = [...ticksX.map((tick) => `<line x1="${x(tick)}" y1="${top}" x2="${x(tick)}" y2="${top + plotH}" class="chart-gridline" /><text x="${x(tick)}" y="${height - 26}" class="chart-label mono" text-anchor="middle">${tick === 0 ? "0" : `${tick}j`}</text>`), ...ticksY.map((tick) => `<line x1="${left}" y1="${y(tick)}" x2="${left + plotW}" y2="${y(tick)}" class="chart-gridline" /><text x="${left - 9}" y="${y(tick) + 3}" class="chart-label mono" text-anchor="end">${tick === 0 ? "0" : `${tick}j`}</text>`)].join("");
  const bubbles = records.map((item) => { const selected = item.key === state.selectedInvestment; const radius = 7 + Math.sqrt(item.loss) / 3.2; return `<g class="investment-bubble" data-investment="${item.key}" tabindex="0" role="button" aria-label="Pilih ${escapeHTML(item.name)}"><circle class="bubble ${selected ? "is-selected" : ""}" cx="${x(item.amount)}" cy="${y(item.loss)}" r="${radius}" /><text x="${x(item.amount) + radius + 4}" y="${y(item.loss) + 3}" class="chart-label">${escapeHTML(item.key)}</text></g>`; }).join("");
  return `<div class="scatter-wrap"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Perbandingan nilai RM disebut dan kerugian atau rosot nilai bagi kes pelaburan bermasalah"><g>${grid}<line x1="${left}" y1="${top + plotH}" x2="${left + plotW}" y2="${top + plotH}" class="chart-axis" /><line x1="${left}" y1="${top}" x2="${left}" y2="${top + plotH}" class="chart-axis" />${bubbles}<text x="${left + plotW / 2}" y="${height - 8}" class="chart-label" text-anchor="middle">nilai pelaburan / jumlah disebut (RM juta)</text><text x="13" y="${top + plotH / 2}" class="chart-label" text-anchor="middle" transform="rotate(-90 13 ${top + plotH / 2})">rosot nilai / kerugian disebut (RM juta)</text></g></svg></div><p class="chart-note"><strong>Nota integriti:</strong> hanya kes yang menyebut angka RM pelaburan dan kerugian/rosot nilai dimasukkan. Ini bukan jumlah keseluruhan portfolio dan tidak semua kes mempunyai ukuran yang seragam.</p>`;
}

function renderInvestmentDetail() {
  const item = investmentCases.find((row) => row.key === state.selectedInvestment) || investmentCases[0];
  const loss = item.loss === null ? "Tidak dinyatakan dalam RM yang setara" : `${fmtRMm(item.loss)} · ${item.lossLabel}`;
  return `<div class="investment-detail"><div class="panel-title"><div><p class="panel-kicker">Kes dipilih · ${escapeHTML(item.category)}</p><h4>${escapeHTML(item.name)}</h4><p>${escapeHTML(item.story)}</p></div>${sourceTag(item.source, item.status)}</div><dl><div><dt>Nilai yang dipetik</dt><dd>${item.amount === null ? "—" : fmtRMm(item.amount)}</dd><small>${escapeHTML(item.amountLabel)}</small></div><div><dt>Kerugian / rosot nilai</dt><dd>${escapeHTML(loss)}</dd></div><div><dt>Status dalam laporan</dt><dd>${escapeHTML(item.status)}</dd></div><div><dt>Jenis angka</dt><dd>${item.derived ? "Terbitan" : item.notComparable ? "Tidak seragam" : "Fakta laporan"}</dd></div></dl></div>`;
}

function investmentTableRows() {
  const query = state.investmentSearch.trim().toLowerCase(); const filtered = investmentCases.filter((item) => { const matchFilter = state.investmentFilter === "semua" || item.category === state.investmentFilter; const matchSearch = !query || `${item.name} ${item.category} ${item.status}`.toLowerCase().includes(query); return matchFilter && matchSearch; });
  if (!filtered.length) return `<tr><td colspan="5">Tiada kes sepadan dengan carian ini.</td></tr>`;
  return filtered.map((item) => `<tr class="${item.key === state.selectedInvestment ? "is-focus" : ""}" data-investment="${item.key}"><td><strong>${escapeHTML(item.name)}</strong><small style="display:block;color:var(--muted)">${escapeHTML(item.category)}</small></td><td class="num">${item.amount === null ? "—" : fmtRMm(item.amount)}</td><td class="num">${item.loss === null ? "—" : fmtRMm(item.loss)}</td><td>${item.derived ? chip("derived", "terbitan") : item.notComparable ? chip("caveat", "tidak seragam") : chip("fact", "laporan")}</td><td>${escapeHTML(item.status)}</td></tr>`).join("");
}

function renderInvestments() {
  const categories = ["semua", ...new Set(investmentCases.map((item) => item.category))];
  return `<div class="view-heading"><div><p class="eyebrow">05 / pelaburan bermasalah</p><h2>Jangan cuma tanya<br /><em>berapa besar kerugian.</em></h2><p>Tanya juga bagaimana keputusan dibuat, apa yang dijanjikan, dan apa yang masih perlu dipulihkan. Plot hanya menggunakan kes dengan angka RM yang boleh dibandingkan; jadual di bawah menyimpan kes lain tanpa memaksa anggaran.</p></div><div class="view-actions">${sourceTag("investments", "PDF 176–193")}</div></div>
  <article class="panel chart-panel"><div class="panel-title"><div><p class="panel-kicker">Peta skala kes</p><h3>Nilai disebut vs kerugian / rosot nilai disebut</h3><p>Lebih kanan = nilai RM lebih besar; lebih tinggi = kerugian yang disebut lebih besar. Klik titik untuk baca konteks kes.</p></div>${chip("fact", "kes terpilih")}</div>${renderInvestmentScatter()}${renderInvestmentDetail()}</article>
  <article class="panel" style="margin-top:16px"><div class="panel-title"><div><p class="panel-kicker">Senarai siasatan</p><h3>12 entiti / transaksi yang boleh ditelusuri</h3><p>Filter mengubah jadual sahaja; angka yang tiada dalam laporan dibiarkan kosong.</p></div></div><div class="filter-row">${categories.map((category) => `<button type="button" class="filter-pill ${state.investmentFilter === category ? "is-active" : ""}" data-investment-filter="${escapeHTML(category)}">${escapeHTML(category)}</button>`).join("")}</div><div class="table-search"><input class="input" id="investment-search" type="search" value="${escapeHTML(state.investmentSearch)}" placeholder="Cari entiti, kategori atau status…" aria-label="Cari pelaburan" /><span class="muted" style="font-size:11px">${investmentCases.length} kes dalam model data</span></div><div class="table-wrap"><table><thead><tr><th>Entiti / transaksi</th><th class="num">Nilai disebut</th><th class="num">Kerugian / rosot nilai</th><th>Jenis angka</th><th>Status</th></tr></thead><tbody id="investment-table-body">${investmentTableRows()}</tbody></table></div><p class="table-caption">Nota: “kerugian / rosot nilai” bukan semestinya kerugian tunai terakhir; ikut label asal laporan seperti ECL, peruntukan atau kerugian tidak nyata.</p></article>`;
}

function renderTimeline() {
  const categories = ["semua", "struktur", "haji", "hibah", "akaun", "pemulihan"];
  const filtered = timelineEvents.filter((item) => state.timelineFilter === "semua" || item.category === state.timelineFilter);
  return `<div class="view-heading"><div><p class="eyebrow">06 / kronologi</p><h2>Ikut urutan<br /><em>keputusan dan tekanan.</em></h2><p>Kronologi ini bukan sekadar sejarah. Ia membantu anda membezakan apa yang sudah berlaku, apa yang diunjurkan, dan bila sesuatu isu mula menjadi keputusan institusi.</p></div><div class="view-actions">${sourceTag("timeline", "sumber berbilang")}</div></div><article class="panel"><div class="panel-title"><div><p class="panel-kicker">Pilih lensa masa</p><h3>Dari penubuhan HAFIS ke unjuran 2030</h3><p>Filter mengikut tema untuk melihat urutan yang paling berguna bagi soalan anda.</p></div></div><div class="filter-row">${categories.map((category) => `<button type="button" class="filter-pill ${state.timelineFilter === category ? "is-active" : ""}" data-timeline-filter="${category}">${category === "semua" ? "semua tema" : category}</button>`).join("")}</div><div class="timeline">${filtered.map((item) => `<article class="timeline-item ${item.key ? "is-key" : ""}"><div class="timeline-year">${escapeHTML(item.year)}</div><span class="timeline-dot" aria-hidden="true"></span><div class="timeline-card"><h4>${escapeHTML(item.title)}</h4><p>${escapeHTML(item.text)}</p><div class="timeline-meta"><span class="timeline-type">${escapeHTML(item.category)}</span>${sourceTag(item.source, "bukti")}</div></div></article>`).join("")}</div></article><div class="data-notice" style="margin-top:16px"><span>!</span><span><strong>Bezakan fakta dan inferens:</strong> susunan tahun di sini datang daripada laporan. Garisan masa tidak membuktikan bahawa setiap peristiwa sendirian menyebabkan peristiwa selepasnya; gunakan paparan Hibah, Kos dan Pemulihan untuk menyemak angka.</span></div>`;
}

function bindViewEvents() {
  $$("[data-go-view]").forEach((button) => button.addEventListener("click", () => setView(button.dataset.goView)));
  const yearSelect = $("#cost-year"); if (yearSelect) yearSelect.addEventListener("change", (event) => { state.selectedYear = Number(event.target.value); render(); });
  const hibahSelect = $("#hibah-year"); if (hibahSelect) hibahSelect.addEventListener("change", (event) => { state.hibahYear = Number(event.target.value); render(); });
  $$("[data-year]").forEach((element) => element.addEventListener("click", () => { const year = Number(element.dataset.year); if (!Number.isNaN(year) && (state.view === "cost" || state.view === "hibah")) { if (state.view === "cost") state.selectedYear = year; else state.hibahYear = year; render(); } }));
  $$("[data-year]").forEach((element) => element.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); element.click(); } }));
  $$("[data-asset]").forEach((button) => button.addEventListener("click", () => { state.selectedAsset = button.dataset.asset; render(); }));
  $$("[data-investment]").forEach((element) => element.addEventListener("click", () => { state.selectedInvestment = element.dataset.investment; render(); }));
  $$("[data-investment]").forEach((element) => element.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); element.click(); } }));
  $$("[data-investment-filter]").forEach((button) => button.addEventListener("click", () => { state.investmentFilter = button.dataset.investmentFilter; render(); }));
  const search = $("#investment-search"); if (search) search.addEventListener("input", (event) => { state.investmentSearch = event.target.value; const body = $("#investment-table-body"); if (body) body.innerHTML = investmentTableRows(); });
  $$("[data-timeline-filter]").forEach((button) => button.addEventListener("click", () => { state.timelineFilter = button.dataset.timelineFilter; render(); }));
  bindSimulator();
}

function bindSimulator() {
  const pilgrims = $("#sim-pilgrims"); const cost = $("#sim-cost"); const payment = $("#sim-payment"); if (!pilgrims || !cost || !payment) return;
  const update = () => {
    const people = Number(pilgrims.value); const costPer = Number(cost.value); const paymentPer = Number(payment.value); const hafis = Math.max(costPer - paymentPer, 0); const total = people * hafis / 1000000; const share = costPer ? hafis / costPer * 100 : 0; const impact = total / 400 * .4;
    $("#sim-pilgrims-output").textContent = fmtNumber(people); $("#sim-cost-output").textContent = fmtRM(costPer); $("#sim-payment-output").textContent = fmtRM(paymentPer); $("#sim-hafis").textContent = fmtRM(hafis); $("#sim-share").textContent = `${fmtPct(share, 1)} daripada kos`; $("#sim-total").textContent = `RM${fmtNumber(total, 2)}j`; $("#sim-impact").textContent = `${fmtNumber(impact, 2)} mata`;
  };
  [pilgrims, cost, payment].forEach((input) => input.addEventListener("input", update)); update();
}

function bindGlobalEvents() {
  $$(".view-tab").forEach((tab) => tab.addEventListener("click", () => setView(tab.dataset.view)));
  $("#start-reading").addEventListener("click", () => $("#view-root").scrollIntoView({ behavior: "smooth", block: "start" }));
  $("#evidence-toggle").addEventListener("click", () => { state.evidence = !state.evidence; updateNavigation(); showToast(state.evidence ? "Label bukti dipaparkan" : "Mod bukti ditutup"); });
  $("#sources-button").addEventListener("click", () => openDrawer());
  $("#drawer-close").addEventListener("click", closeDrawer); $("#drawer-backdrop").addEventListener("click", closeDrawer);
  $("#about-button").addEventListener("click", () => $("#about-dialog").showModal());
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeDrawer(); });
  document.addEventListener("click", (event) => { const sourceButton = event.target.closest("[data-source]"); if (sourceButton) { event.preventDefault(); openDrawer(sourceButton.dataset.source); } });
}

document.addEventListener("DOMContentLoaded", () => { bindGlobalEvents(); render(); });
