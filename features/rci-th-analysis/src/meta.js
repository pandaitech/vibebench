/**
 * Metadata sumber, peraturan kebolehkesanan, dan glosari.
 *
 * SEMUA rekod dalam modul ini mesti boleh dijejak kembali kepada laporan asal.
 * Setiap rekod membawa medan `source` (satu atau lebih `sourceRef`) dan medan
 * `factType` yang membezakan fakta laporan daripada data terbitan.
 */

export const SOURCE_BASE =
  "https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md";

/**
 * Bina rujukan sumber yang boleh dijejak.
 * @param {string} section  Nombor perenggan/seksyen laporan, cth "3.9.2".
 * @param {number} pdfPage  Nombor muka surat fizikal PDF (anchor dalam markdown).
 * @param {number|string|null} printedPage Label muka surat bercetak, jika ada.
 * @param {string|null} note Nota tambahan (cth amaran OCR).
 */
export function sourceRef(section, pdfPage, printedPage = null, note = null) {
  return {
    section,
    pdfPage,
    printedPage,
    anchor: `pdf-page-${pdfPage}`,
    url: `${SOURCE_BASE}#pdf-page-${pdfPage}`,
    note,
  };
}

/**
 * Taksonomi jenis maklumat. Entiti hiliran WAJIB memaparkan label ini
 * pada setiap angka supaya pembaca tahu apa yang mereka lihat.
 */
export const factTypes = {
  fact: {
    id: "fact",
    label: "Fakta laporan",
    short: "Fakta",
    description:
      "Angka atau pernyataan yang tersurat dalam Laporan RCI Tabung Haji.",
    colorRole: "neutral",
  },
  reportProjection: {
    id: "reportProjection",
    label: "Unjuran laporan",
    short: "Unjuran",
    description:
      "Angka masa hadapan yang diterbitkan oleh laporan atau pihak yang dipetik (LTH, PwC, RB, EY). Bukan fakta sejarah.",
    colorRole: "warning",
  },
  thirdPartyEstimate: {
    id: "thirdPartyEstimate",
    label: "Anggaran pihak ketiga",
    short: "Anggaran",
    description:
      "Anggaran yang dibuat oleh PwC, EY, Roland Berger, JAN atau BNM dan dipetik dalam laporan. Tertakluk kepada skop kerja masing-masing.",
    colorRole: "info",
  },
  derived: {
    id: "derived",
    label: "Data terbitan",
    short: "Terbitan",
    description:
      "Dikira daripada angka laporan menggunakan formula yang dinyatakan. Bukan angka yang tersurat dalam laporan.",
    colorRole: "accent",
  },
  simulation: {
    id: "simulation",
    label: "Simulasi 'bagaimana jika'",
    short: "Simulasi",
    description:
      "Senario yang dijana oleh pengguna melalui parameter dashboard. Bukan ramalan dan bukan pendirian Suruhanjaya.",
    colorRole: "muted",
  },
  opinion: {
    id: "opinion",
    label: "Pandangan Suruhanjaya",
    short: "Pandangan",
    description:
      "Penilaian, teguran atau syor Suruhanjaya. Ia adalah pendapat berdasarkan keterangan, bukan angka.",
    colorRole: "quote",
  },
  gap: {
    id: "gap",
    label: "Jurang data",
    short: "Tiada data",
    description:
      "Laporan tidak menyediakan angka ini. Jangan isi dengan andaian.",
    colorRole: "empty",
  },
};

export const reportMeta = {
  id: "rci-tabung-haji-2022",
  titleShort: "Laporan RCI Tabung Haji",
  titleFull:
    "Laporan Suruhanjaya Siasatan Diraja bagi Menyiasat Isu Pengurusan dan Operasi Lembaga Tabung Haji dari Tahun 2014 hingga 2020",
  language: "ms",
  investigationPeriod: { from: 2014, to: 2020 },
  dataHorizonNote:
    "Skop siasatan ialah 2014–2020, tetapi laporan turut memetik data sehingga Julai 2022 dan unjuran sehingga 2030.",
  signedDate: "2022-07-19",
  presentedDate: "2022-08-30",
  presentedTo:
    "Kebawah Duli Yang Maha Mulia Seri Paduka Baginda Yang di-Pertuan Agong Al-Sultan Abdullah Ri'ayatuddin Al-Mustafa Billah Shah",
  commissionAppointedDate: "2022-01-20",
  commissionTermEndDate: "2022-07-19",
  commissionTermMonths: 6,
  legalBasis: "Akta Suruhanjaya Siasatan 1950 (Akta 119)",
  quorum: 5,
  proceedingsMode: "Tertutup (rahsia) di bawah Akta 119 dan Akta Rahsia Rasmi 1972 (Akta 88)",
  proceedingsVenue: "Bilik Mesyuarat, Kompleks Islam Putrajaya",
  secretariat: "Jabatan Kemajuan Islam Malaysia (JAKIM)",
  witnessesStatutoryDeclaration: 45,
  witnessesCalledToTestify: 16,
  exhibitVolumes: 12,
  exhibitClassification: "RAHSIA (tidak didedahkan kepada umum)",
  pdfPages: 252,
  source: [sourceRef("Muka hadapan / 1.4 / 1.12", 41, 3)],
  sourceUrl: SOURCE_BASE,
  sourceFormat:
    "Markdown hasil OCR daripada rci-tabung-haji.pdf. Setiap blok membawa nombor muka surat PDF sebagai anchor.",
};

export const commissioners = [
  { name: "Tun Md Raus bin Sharif", role: "Pengerusi", background: "Mantan Ketua Hakim Negara" },
  { name: "Tan Sri Samsudin bin Osman", role: "Pesuruhjaya", background: "Mantan Ketua Setiausaha Negara" },
  { name: "Tan Sri Abdul Rashid bin Hussain", role: "Pesuruhjaya", background: "Pengasas RHB Group" },
  {
    name: "Tan Sri Dr. Mohd Munir bin Abdul Majid",
    role: "Pesuruhjaya",
    background:
      "Pengerusi CARI ASEAN Research and Advocacy dan Asean Business Advisory Council Malaysia",
  },
  {
    name: "Profesor Dr. Asmadi bin Mohamed Naim",
    role: "Pesuruhjaya",
    background: "Naib Canselor UniSHAMS",
  },
  { name: "Encik Norsyahrin bin Hamidon", role: "Pesuruhjaya", background: "Akauntan Bertauliah" },
  {
    name: "Datuk Hajah Hakimah binti Mohd Yusoff",
    role: "Setiausaha",
    background: "Ketua Pengarah JAKIM",
  },
].map((c) => ({ ...c, factType: "fact", source: [sourceRef("1.4", 43, 5)] }));

export const investigationMethods = [
  {
    id: "records",
    label: "Pengumpulan rekod dan dokumen",
    description: "Rekod dan dokumen daripada agensi berkaitan, ditanda sebagai ekshibit.",
  },
  {
    id: "briefings",
    label: "Taklimat agensi",
    description: "Lapan agensi dipanggil memberi taklimat antara Februari dan Julai 2022.",
  },
  {
    id: "abs",
    label: "Akuan Berkanun Saksi (ABS)",
    description:
      "45 saksi memberi Akuan Berkanun di bawah Akta Akuan Berkanun 1960 (Akta 783).",
  },
  {
    id: "proceedings",
    label: "Prosiding Suruhanjaya",
    description: "16 saksi dipanggil memberi keterangan lisan secara tertutup, Mei–Jun 2022.",
  },
].map((m) => ({ ...m, factType: "fact", source: [sourceRef("1.12", 46, 8)] }));

export const agencyBriefings = [
  { agency: "Lembaga Tabung Haji", dates: ["2022-02-23", "2022-04-08", "2022-04-28"] },
  { agency: "Ernst & Young", dates: ["2022-02-24", "2022-07-07"] },
  { agency: "Roland Berger", dates: ["2022-02-25"] },
  { agency: "PricewaterhouseCoopers", dates: ["2022-03-10"] },
  { agency: "Bank Negara Malaysia", dates: ["2022-03-14"] },
  { agency: "Jabatan Audit Negara", dates: ["2022-03-25"] },
  { agency: "Kementerian Kewangan Malaysia", dates: ["2022-04-01"] },
  { agency: "Urusharta Jamaah Sdn. Bhd.", dates: ["2022-04-01"] },
].map((b) => ({ ...b, factType: "fact", source: [sourceRef("1.12.2", 46, 8)] }));

/**
 * Ekshibit: 12 jilid, semuanya diklasifikasikan RAHSIA.
 * Ini penting untuk dashboard: ia menerangkan MENGAPA banyak angka
 * tidak boleh disahkan secara bebas oleh orang awam.
 */
export const exhibitVolumes = [
  { volume: "Jilid 1–3", contents: "Akuan Berkanun Saksi bagi saksi yang TIDAK dipanggil memberi keterangan" },
  { volume: "Jilid 4–7", contents: "Akuan Berkanun Saksi + Nota Keterangan bagi 16 saksi yang dipanggil" },
  { volume: "Jilid 8–10", contents: "Laporan Ernst & Young (audit anak syarikat, RAV, THIP, business review)" },
  { volume: "Jilid 11", contents: "Laporan PricewaterhouseCoopers, Laporan Roland Berger, Laporan Jabatan Audit Negara" },
  { volume: "Jilid 12", contents: "Surat-surat agensi (KAN, BNM, MOF), perjanjian UJSB, proforma EY, penyata kewangan beraudit 2017" },
].map((e) => ({
  ...e,
  classification: "RAHSIA",
  publiclyAvailable: false,
  factType: "fact",
  source: [sourceRef("Senarai Ekshibit", 239, 201)],
}));

/**
 * Batasan bahan sumber. WAJIB dipaparkan sekurang-kurangnya sekali
 * dalam dashboard (nota kaki atau halaman "Tentang data ini").
 */
export const sourceLimitations = [
  {
    id: "ocr",
    severity: "high",
    title: "Teks sumber ialah hasil OCR",
    body:
      "Fail markdown dijana daripada PDF melalui OCR. Beberapa angka dan simbol rosak dalam teks asal (contoh: '1.259' sepatutnya 1.25%, '0.196' sepatutnya 0.1%, '9096' sepatutnya 90%, '5196' sepatutnya 51%, 'seksyen 2.2 Akta 535' sepatutnya seksyen 22). Angka dalam modul ini telah dibetulkan HANYA apabila pembetulan itu disahkan oleh konteks atau oleh jumlah yang menepati. Setiap pembetulan direkodkan dalam `ocrCorrections`.",
  },
  {
    id: "exhibits-secret",
    severity: "high",
    title: "Ekshibit tidak boleh diakses umum",
    body:
      "Kesemua 12 jilid ekshibit (laporan PwC, EY, Roland Berger, JAN, surat BNM, perjanjian UJSB) diklasifikasikan RAHSIA. Analisis ini bergantung sepenuhnya kepada petikan dan ringkasan dalam teks laporan. Angka penuh, nota kaki dan asas pengiraan dalam laporan perunding tidak dapat disemak.",
  },
  {
    id: "closed-proceedings",
    severity: "medium",
    title: "Prosiding dijalankan secara tertutup",
    body:
      "Keterangan saksi tidak diterbitkan. Kenyataan saksi yang dipetik dalam laporan tidak dapat dibaca dalam konteks penuh.",
  },
  {
    id: "no-microdata",
    severity: "medium",
    title: "Tiada data peringkat butiran",
    body:
      "Laporan tidak menyediakan data bulanan, data mengikut cawangan, taburan pendeposit penuh, senarai penuh 106 kaunter ekuiti, senarai penuh 29 hartanah, atau penyata kewangan tahunan penuh. Sesetengah carta hanya boleh dibina pada peringkat tahunan atau agregat.",
  },
  {
    id: "no-audited-fs",
    severity: "medium",
    title: "Penyata kewangan penuh tidak disertakan",
    body:
      "Angka aset/liabiliti yang ada datang daripada ringkasan analisis PwC dan petikan JAN, bukan daripada penyata kewangan beraudit yang lengkap. Baris seperti pendapatan, perbelanjaan operasi, dan pecahan portfolio pelaburan tidak tersedia.",
  },
  {
    id: "scope-2014-2020",
    severity: "low",
    title: "Skop rasmi 2014–2020",
    body:
      "Siri masa untuk beberapa metrik bermula 2013 atau 2010 (bonus, aset) dan berakhir 2021/2022. Jangan anggap siri ini lengkap untuk tahun di luar 2014–2020.",
  },
].map((l) => ({ ...l, factType: "fact", source: [sourceRef("Pelbagai", 1, null)] }));

/**
 * Pembetulan OCR yang telah dibuat secara sedar, dengan justifikasi.
 * Ini adalah sebahagian daripada kebolehkesanan: tiada pembetulan senyap.
 */
export const ocrCorrections = [
  {
    id: "hibah-2018-rate",
    raw: "1.259.",
    corrected: "1.25%",
    justification:
      "Jadual kadar hibah 3.9.22 menyenaraikan 1.25 bagi 2018; teks ringkasan eksekutif menaip '1.259.' kerana OCR.",
    source: [sourceRef("Ringkasan Eksekutif ¶22(i) vs 3.9.22", 120, 82)],
  },
  {
    id: "statutory-reserve-transfer",
    raw: "0.196",
    corrected: "0.1%",
    justification: "Konteks 'perpindahan tahunan sebanyak 0.1% ke dalam Rizab Berkanun'.",
    source: [sourceRef("3.7.9", 105, 67)],
  },
  {
    id: "rpk-transfer",
    raw: "296",
    corrected: "2%",
    justification: "Konteks 'jumlah yang sama dengan 2% daripada keuntungan tahun semasa selepas zakat'.",
    source: [sourceRef("3.7.9", 105, 67)],
  },
  {
    id: "impairment-threshold-90",
    raw: "9096",
    corrected: "90%",
    justification:
      "Jadual 3.13.8 mengesahkan ambang 70% / 85% / 90%. Teks 3.9.8 rosak OCR.",
    source: [sourceRef("3.9.8 vs 3.13.8", 114, 76)],
  },
  {
    id: "alam-maritim-stake",
    raw: "5196 ekuiti",
    corrected: "51% ekuiti",
    justification: "Konteks syarikat usaha sama; 51% ialah kepentingan majoriti yang lazim.",
    source: [sourceRef("3.14.6(12)", 190, 152)],
  },
  {
    id: "debt-ceiling-2018",
    raw: "kadar siling hutang negara hanya pada 5% daripada KDNK",
    corrected: "55% daripada KDNK",
    justification:
      "Ringkasan Eksekutif ¶32 dan 3.13.19(a) kedua-duanya menyatakan 55%, dinaikkan kemudian kepada 65%.",
    source: [sourceRef("3.13.63 vs 3.13.19(a)", 172, 134)],
  },
  {
    id: "act-535-number",
    raw: "Akta Tabung Haji 1995 (Akta 536)",
    corrected: "Akta 535",
    justification: "Seluruh laporan menggunakan Akta 535; 536 ialah salah taip OCR di 2.1.4.",
    source: [sourceRef("2.1.4", 54, 16)],
  },
  {
    id: "section-22",
    raw: "seksyen 2.2 Akta 535",
    corrected: "seksyen 22 Akta 535",
    justification:
      "Petikan penuh seksyen 22 dinyatakan di 3.11.3; rujukan '2.2' ialah artifak OCR.",
    source: [sourceRef("3.11.10 / 3.11.11 / 3.11.18", 131, 93)],
  },
  {
    id: "wp72",
    raw: "WP 72",
    corrected: "WP 7.2",
    justification: "Pekeliling Perbendaharaan WP 7.2 dinamakan penuh di 3.12.2.",
    source: [sourceRef("3.12.2", 135, 97)],
  },
  {
    id: "guarantee-table-years",
    raw: "JADUAL 5.3. Komitmen Jaminan, 2021–2021",
    corrected: "Komitmen Jaminan, 2020–2021",
    justification: "Lajur jadual ialah 2020 dan 2021.",
    source: [sourceRef("3.13.45", 165, 127)],
  },
  {
    id: "alrawda-ecl",
    raw: "RM202\n8 juta",
    corrected: "RM202.8 juta",
    justification: "Pemisahan baris OCR di tengah nombor perpuluhan.",
    source: [sourceRef("3.14.6(8)", 187, 149)],
  },
];

/**
 * Glosari istilah teknikal dalam bahasa yang mudah difahami orang awam.
 * `plain` ialah teks tooltip; `why` menerangkan kenapa ia penting dalam kes ini.
 */
export const glossary = [
  {
    term: "Hibah / agihan keuntungan",
    plain:
      "Bayaran tahunan yang diberi LTH kepada pendeposit, sama seperti 'dividen' atau 'bonus simpanan'.",
    why: "Kadar hibah yang terlalu tinggi antara 2014–2017 ialah punca utama krisis kewangan LTH.",
  },
  {
    term: "Rosot nilai (impairment)",
    plain:
      "Mengakui dalam akaun bahawa sesuatu pelaburan sudah jatuh nilai dan tidak lagi bernilai harga belian asalnya.",
    why: "LTH melewatkan pengiktirafan rosot nilai supaya akaun kelihatan untung dan hibah boleh dibayar.",
  },
  {
    term: "RAV (Realisable Asset Value / Nilai Aset Boleh Direalisasi)",
    plain:
      "Anggaran dalaman LTH tentang berapa nilai asetnya 'jika dijual', yang lebih tinggi daripada nilai dalam penyata kewangan beraudit.",
    why: "RAV digunakan untuk menjustifikasikan pembayaran hibah walaupun penyata beraudit menunjukkan liabiliti melebihi aset. Tiada piawaian pasaran untuk RAV.",
  },
  {
    term: "Emphasis of Matter",
    plain:
      "Nota amaran juruaudit yang menarik perhatian kepada sesuatu isu, TANPA menjejaskan pendapat 'bersih' yang diberi.",
    why: "Suruhanjaya berpendapat isu 2017 sepatutnya dinyatakan sebagai ketidakpatuhan, bukan sekadar Emphasis of Matter.",
  },
  {
    term: "Sijil Audit Bersih / Pendapat Tanpa Teguran",
    plain: "Juruaudit mengesahkan akaun memberi gambaran benar dan saksama, tanpa bantahan.",
    why: "LTH menerima Sijil Audit Bersih 2014–2017 walaupun aset kurang daripada liabiliti.",
  },
  {
    term: "Sukuk berkupon sifar (zero coupon)",
    plain:
      "Bon patuh syariah yang tidak membayar tunai setiap tahun; pemegangnya hanya menerima wang pada tarikh matang.",
    why: "LTH mengakru pendapatan daripada Sukuk UJSB tanpa menerima tunai — pendapatan 'di atas kertas'.",
  },
  {
    term: "SPV (Special Purpose Vehicle)",
    plain: "Syarikat yang ditubuhkan khas untuk satu tujuan tertentu.",
    why: "UJSB ialah SPV milik penuh Menteri Kewangan Diperbadankan untuk menyerap aset lemah LTH.",
  },
  {
    term: "Bank run",
    plain: "Keadaan ramai pendeposit mengeluarkan wang serentak kerana hilang keyakinan.",
    why: "Risiko utama yang cuba dielakkan oleh pelan pemulihan 2018.",
  },
  {
    term: "HAFIS (Bantuan Kewangan Haji)",
    plain:
      "Subsidi yang ditanggung LTH untuk menutup beza antara kos haji sebenar dan bayaran yang dikenakan kepada jemaah.",
    why: "HAFIS diambil daripada keuntungan pelaburan, jadi ia mengurangkan hibah pendeposit.",
  },
  {
    term: "Muassasah",
    plain: "Jemaah haji yang menggunakan pakej rasmi LTH (bukan pakej swasta).",
    why: "Bayaran haji Muassasah kekal RM9,980 dari 2009 hingga 2021 walaupun kos naik setiap tahun.",
  },
  {
    term: "Concentration risk (risiko tertumpu)",
    plain: "Terlalu bergantung kepada sebilangan kecil pendeposit besar.",
    why: "Dianggarkan 75% deposit LTH dimiliki oleh 5% pendeposit sahaja.",
  },
  {
    term: "ROFR (Hak Penolakan Pertama)",
    plain: "Hak LTH untuk membeli semula asetnya dahulu sebelum UJSB menjualnya kepada orang lain.",
    why: "Harga tawaran ROFR sering lebih tinggi daripada harga pasaran terbuka.",
  },
  {
    term: "Akad Mudarabah / Wadi'ah Yad Dhamanah / Wakalah",
    plain:
      "Tiga bentuk kontrak syariah antara LTH dan pendeposit: perkongsian untung (Mudarabah), simpanan terjamin (Wadi'ah), dan wakil menguruskan dana (Wakalah).",
    why: "LTH menukar akad dua kali (2016 dan Disember 2019) dan ini mengubah siapa yang wajib membayar zakat.",
  },
  {
    term: "MFRS / FRS",
    plain: "Piawaian perakaunan rasmi Malaysia yang wajib diikuti semasa menyediakan akaun.",
    why: "Jika MFRS diguna sepenuhnya untuk 2017, untung RM3.4 bilion bertukar menjadi rugi RM1.4 bilion.",
  },
  {
    term: "Rizab Penyamaan Keuntungan (RPK)",
    plain:
      "Simpanan keuntungan yang disimpan pada tahun baik untuk menampung tahun kurang baik.",
    why: "RPK hanya ditetapkan secara formal pada 2019 — selepas krisis.",
  },
  {
    term: "Komitmen Jaminan",
    plain:
      "Senarai hutang syarikat kerajaan yang, walaupun bukan hutang langsung Kerajaan, kemungkinan besar perlu ditanggung Kerajaan.",
    why: "Sukuk UJSB tersenarai di sini — RM20.68 bilion (2020) dan RM21.10 bilion (2021).",
  },
].map((g) => ({ ...g, factType: "fact" }));

export const abbreviations = [
  ["LTH", "Lembaga Tabung Haji"],
  ["RCI", "Royal Commission of Inquiry / Suruhanjaya Siasatan Diraja"],
  ["UJSB", "Urusharta Jamaah Sdn. Bhd."],
  ["JAN", "Jabatan Audit Negara"],
  ["KAN", "Ketua Audit Negara"],
  ["BNM", "Bank Negara Malaysia"],
  ["MOF", "Kementerian Kewangan Malaysia"],
  ["SC", "Suruhanjaya Sekuriti Malaysia"],
  ["SPRM", "Suruhanjaya Pencegahan Rasuah Malaysia"],
  ["PwC", "PricewaterhouseCoopers"],
  ["EY", "Ernst & Young"],
  ["RB", "Roland Berger"],
  ["RAV", "Realisable Asset Value"],
  ["HAFIS", "Hajj Financial Support / Bantuan Kewangan Haji"],
  ["RPK", "Rizab Penyamaan Keuntungan"],
  ["ROFR", "Right of First Refusal / Hak Penolakan Pertama"],
  ["ALP", "Ahli Lembaga Pengarah"],
  ["JPS", "Jawatankuasa Penasihat Syariah"],
  ["JPPHM", "Jabatan Penilaian dan Perkhidmatan Harta Malaysia"],
  ["IKBB", "Institusi Kewangan Bukan Bank"],
  ["ABS", "Akuan Berkanun Saksi"],
  ["NKS", "Nota Keterangan Saksi"],
  ["Akta 535", "Akta Tabung Haji 1995"],
  ["Akta 240", "Akta Badan Berkanun (Akaun dan Laporan Tahunan) 1980"],
  ["Akta 61", "Akta Tatacara Kewangan 1957"],
  ["Akta 119", "Akta Suruhanjaya Siasatan 1950"],
  ["Akta 777", "Akta Syarikat 2016"],
  ["WP 7.2", "Pekeliling Perbendaharaan WP 7.2 (bayaran bonus badan berkanun)"],
].map(([abbr, meaning]) => ({ abbr, meaning, factType: "fact" }));

export const currencyUnits = {
  RM: { code: "RM", label: "Ringgit Malaysia", locale: "ms-MY" },
  USD: { code: "USD", label: "Dolar Amerika Syarikat", note: "Tiada kadar tukaran diberi dalam laporan." },
  SR: {
    code: "SR",
    label: "Saudi Riyal",
    note:
      "Laporan hanya memberi satu titik tukaran tersirat: SR76 juta = RM63 juta (Al-Fareeda, 2013). Jangan gunakan kadar ini untuk transaksi tahun lain.",
  },
  AUD: { code: "AUD", label: "Dolar Australia", note: "Tiada kadar tukaran diberi dalam laporan." },
};
