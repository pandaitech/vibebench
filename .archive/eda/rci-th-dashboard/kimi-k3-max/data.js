/*
 * DATA.JS — Semua data diekstrak daripada Laporan Suruhanjaya Siasatan Diraja (RCI)
 * Tabung Haji (30 Ogos 2022), sumber OCR:
 * https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md
 *
 * Setiap rekod membawa rujukan muka surat PDF (`p`) supaya setiap angka boleh
 * dijejak semula ke sumber asal.
 *
 * Jenis data (`type`):
 *   LAPORAN  — fakta/angka yang dinyatakan dalam laporan
 *   TERBITAN — dikira semula daripada angka laporan (contoh: jumlah, peratus)
 *   ANGGARAN — unjuran/anggaran yang dibuat oleh laporan itu sendiri
 *   SIMULASI — apa-jika interaktif dashboard ini (bukan fakta laporan)
 *
 * Nota: teks sumber ialah hasil OCR. Percanggahan angka yang dikesan dalam
 * laporan disenaraikan di bawah `PERCANGGAHAN` dan dipaparkan apa adanya.
 */
window.RCI = (function () {
  "use strict";

  var SRC_MD = "https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md#pdf-page-";

  /* ------------------------------------------------------------------ *
   * META
   * ------------------------------------------------------------------ */
  var META = {
    tajuk: "Laporan Suruhanjaya Siasatan Diraja Tabung Haji",
    sub: "Siasatan isu pengurusan dan operasi Lembaga Tabung Haji (LTH), 2014–2020",
    tarikhLaporan: "19 Julai 2022 (dipersembahkan 30 Ogos 2022)",
    skop: "2014–2020",
    tempohSiasatan: "20 Januari 2022 – 19 Julai 2022 (6 bulan)",
    pesuruhjaya: [
      { n: "Tun Md Raus bin Sharif", r: "Pengerusi — Mantan Ketua Hakim Negara" },
      { n: "Tan Sri Samsudin bin Osman", r: "Pesuruhjaya — Mantan Ketua Setiausaha Negara" },
      { n: "Tan Sri Abdul Rashid bin Hussain", r: "Pesuruhjaya — Pengasas RHB Group" },
      { n: "Tan Sri Dr. Mohd Munir bin Abdul Majid", r: "Pesuruhjaya — Pengerusi CARI ASEAN" },
      { n: "Profesor Dr. Asmadi bin Mohamed Naim", r: "Pesuruhjaya — Naib Canselor UniSHAMS" },
      { n: "Norsyahrin bin Hamidon", r: "Pesuruhjaya — Akauntan Bertauliah" }
    ],
    setiausaha: "Datuk Hajah Hakimah binti Mohd Yusoff (Ketua Pengarah JAKIM)",
    statistikSiasatan: [
      { label: "Saksi memberi Akuan Berkanun", value: "45 orang", p: 47 },
      { label: "Saksi dipanggil ke prosiding", value: "16 orang", p: 48 },
      { label: "Agensi memberi taklimat", value: "8 agensi (11 sesi)", p: 46 },
      { label: "Jilid ekshibit", value: "12 jilid (dirahsiakan)", p: 239 },
      { label: "Lokasi prosiding tertutup", value: "Kompleks Islam Putrajaya", p: 44 },
      { label: "Tempoh prosiding", value: "9 Mei – 27 Jun 2022", p: 49 }
    ],
    p: 41
  };

  /* ------------------------------------------------------------------ *
   * STATISTIK HEADLINE (agregat laporan)
   * ------------------------------------------------------------------ */
  var HEADLINE = [
    { id: "deposit", label: "Deposit pendeposit (21 Mei 2022)", value: 88, unit: "RM bilion", display: "RM88 bilion", note: "Dijamin sepenuhnya oleh Kerajaan di bawah seksyen 24 Akta 535 — jika LTH gagal, rakyat yang tanggung.", p: 167, type: "LAPORAN" },
    { id: "defisit", label: "Defisit aset vs liabiliti 2017 (selepas agihan hibah)", value: -4093, unit: "RM juta", display: "−RM4.09 bilion", note: "Angka PwC. LTH sudah berhutang lebih daripada asetnya sejak 2014, tetapi terus membayar hibah tinggi.", p: 147, type: "LAPORAN" },
    { id: "swing2017", label: "Untung dilapor 2017 vs sepatutnya (ikuti piawaian MFRS)", value: -1433, unit: "RM juta", display: "+RM3.41b → −RM1.43b", note: "Perbezaan RM4.8 bilion — keuntungan 'di atas kertas' yang menjadi asas hibah 2017.", p: 149, type: "LAPORAN" },
    { id: "premium", label: "Premium pemindahan aset ke UJSB melebihi nilai pasaran", value: 10.2, unit: "RM bilion", display: "RM10.2 bilion", note: "Aset dipindah pada RM19.9 bilion sedangkan nilai pasaran hanya RM9.7 bilion.", p: 159, type: "LAPORAN" },
    { id: "hibahjumlah", label: "Jumlah hibah dibayar 1966–2021", value: 37.52, unit: "RM bilion", display: "RM37.52 bilion", note: "Termasuk hibah haji. Hibah 2014–2017 sahaja berjumlah RM12.65 bilion.", p: 229, type: "LAPORAN" },
    { id: "hafisjumlah", label: "Jumlah subsidi haji (HAFIS) sejak 2001", value: 2.02, unit: "RM bilion", display: "RM2.02 bilion", note: "Subsidi diambil daripada keuntungan pelaburan — duit pendeposit sendiri.", p: 229, type: "LAPORAN" },
    { id: "pendeposit", label: "Bilangan pendeposit (22 Julai 2022)", value: 8.6, unit: "juta", display: "8.6 juta orang", note: "Pada 2018 seramai 9.3 juta pendeposit disebut sebagai pihak yang perlu dilindungi.", p: 229, type: "LAPORAN" },
    { id: "jemaah", label: "Jemaah haji diuruskan 1963–2021", value: 1.46, unit: "juta", display: "1.46 juta orang", note: "Fungsi asal LTH sejak zaman PWSBH 1962.", p: 229, type: "LAPORAN" }
  ];

  /* ------------------------------------------------------------------ *
   * KRISIS KEWANGAN
   * ------------------------------------------------------------------ */
  // Jadual PwC: aset vs liabiliti (RM juta) — PDF 147 / ms. 109 (perenggan 3.13.7)
  var PWC = {
    tajuk: "Aset vs liabiliti LTH (semakan PwC)",
    nota: "Liabiliti termasuk dana pendeposit. 'Selepas agihan' = selepas hibah diisytiharkan ditolak.",
    unit: "RM juta",
    p: 147,
    rows: [
      { tahun: 2013, aset: 48778, liabiliti: 43696, praAgihan: 5082, agihan: 2632, pascaAgihan: 2450 },
      { tahun: 2014, aset: 54751, liabiliti: 51866, praAgihan: 2885, agihan: 3237, pascaAgihan: -352 },
      { tahun: 2015, aset: 60196, liabiliti: 60062, praAgihan: 134, agihan: 3220, pascaAgihan: -3086 },
      { tahun: 2016, aset: 64321, liabiliti: 65581, praAgihan: -1260, agihan: 2871, pascaAgihan: -4131 },
      { tahun: 2017, aset: 70317, liabiliti: 71086, praAgihan: -769, agihan: 3324, pascaAgihan: -4093 }
    ]
  };

  // Pelarasan 2017 mengikut MFRS/FRS — PDF 149 / ms. 111 (perenggan 3.13.11)
  var RESTATE2017 = {
    tajuk: "Untung 2017 seperti dilapor vs sepatutnya",
    nota: "Jika piawaian perakaunan MFRS/FRS dipatuhi sepenuhnya pada 2017.",
    p: 149,
    waterfall: [
      { label: "Keuntungan direkod 2017", value: 3412, kind: "start" },
      { label: "Rosot nilai pelaburan ekuiti (AFS)", value: -4258, kind: "delta" },
      { label: "Rosot nilai sekuriti hutang (AFS)", value: -7, kind: "delta" },
      { label: "Pelarasan lain", value: -580, kind: "delta" },
      { label: "Kerugian bersih sepatutnya", value: -1433, kind: "end" }
    ],
    terkumpul: [
      { label: "Untung terkumpul direkod (31.12.2017)", value: 162 },
      { label: "Pelarasan", value: -4845 },
      { label: "Kerugian terkumpul sepatutnya", value: -4683 }
    ],
    nota2: "Kerugian LTH kemudiannya meningkat kepada hampir RM10 bilion — memaksa Kerajaan bertindak segera (perenggan 3.13.12).",
    p2: 149
  };

  // RAV 2017 — bagaimana LTH justifikasikan hibah — PDF 116 / ms. 78 (3.9.12)
  var RAV2017 = {
    tajuk: "Dua versi 'kebenaran' bagi 2017",
    nota: "Versi pengurusan (RAV) menunjukkan lebihan; versi beraudit/PwC menunjukkan defisit besar.",
    p: 116,
    rows: [
      { label: "Jumlah aset (Penyata Kewangan)", pengurusan: 70317, pwc: 70317 },
      { label: "Tambahan 'nilai boleh direalisasi' (RAV)", pengurusan: 4466, pwc: 0 },
      { label: "Jumlah aset dikira", pengurusan: 74783, pwc: 70317 },
      { label: "Jumlah liabiliti", pengurusan: -74410, pwc: -71086 },
      { label: "Lebihan / (defisit)", pengurusan: 373, pwc: -769, isTotal: true }
    ],
    selepasAgihan: { pengurusan: 373 - 3324, pwc: -4093 },
    nota2: "Versi KAN pula mencatat aset RM70.317 bilion vs liabiliti RM74.409 bilion bagi 2017 (ms. 94).",
    nota3: "Daripada nilai hartanah RM4.6 bilion dalam RAV, hanya RM556 juta dinilai penilai profesional — baki RM4.044 bilion anggaran pengurusan sendiri. RM2.294 bilion berkaitan TH Plantations.",
    p3: 113
  };

  // Polisi rosot nilai — PDF 115 / ms. 77 (3.9.8) & PDF 148 / ms. 110 (3.13.8)
  var IMPAIRMENT = {
    tajuk: "Bagaimana polisi rosot nilai diubah untuk 'cantikkan' 2017",
    nota: "Rosot nilai = pengakuan bahawa nilai pelaburan telah jatuh. Piawaian pasaran (FRS 139): rosot nilai jika nilai jatuh ≥20% atau berlarutan >12 bulan. LTH mengubah ambangnya supaya hampir tiada rosot nilai perlu direkod.",
    p: 148,
    rows: [
      { ambang: "Piawaian FRS 139", perlu: "Rosot nilai jika nilai jatuh ≥20% / >12 bulan", impak: 1313, impakNota: "RM1,313 juta rosot nilai sepatutnya direkod (ambang 70% + 24 bulan)" },
      { ambang: "Polisi asal LTH (70%)", perlu: "Hanya jika nilai jatuh >70% daripada kos", impak: 1313, impakNota: "Sama: RM1,313 juta terdedah" },
      { ambang: "Ubah kepada 85%", perlu: "Hanya jika nilai jatuh >85%", impak: 171, impakNota: "RM171 juta" },
      { ambang: "Ubah kepada 90% (TK2017)", perlu: "Hanya jika nilai jatuh >90% — pelaburan RM1,000 hanya diiktiraf rugi bila tinggal RM100", impak: 1, impakNota: "RM1 juta sahaja direkod pada 2017" }
    ],
    fakta: [
      { t: "Polisi rosot nilai diubah dua kali dalam tahun kewangan 2017 sahaja.", p: 146 },
      { t: "Akuan Berkanun CFO: pertukaran dibuat untuk membolehkan agihan hibah selaras jangkaan pendeposit — bukan untuk mencerminkan nilai wajar.", p: 115 },
      { t: "RM227.81 juta rosot nilai ke atas 3 subsidiari & 3 syarikat bersekutu tidak direkod — termasuk TH Heavy Engineering RM164.58 juta.", p: 146 },
      { t: "Kata JAN (Mona Othman): jika FRS 139 dipatuhi, jumlah rosot nilai terkumpul tidak diambil kira ialah RM1.537 bilion — jauh melebihi 'lebihan' RAV RM373 juta.", p: 116 }
    ]
  };

  var AUDIT = {
    tajuk: "Peranan Juruaudit Negara (JAN)",
    fakta: [
      { t: "Penyata kewangan LTH 2014–2017 semuanya menerima Sijil Audit Bersih daripada JAN, walaupun aset sudah lebih rendah daripada liabiliti pada 2015 & 2016.", p: 125 },
      { t: "16 Julai 2018: KAN mengeluarkan Pendapat Tanpa Teguran dengan 'Emphasis of Matter' untuk TK2017 — selepas perbincangan dengan Perdana Menteri pada 4 Julai 2018.", p: 133 },
      { t: "Surat KAN kepada PM (19 Dis 2018): Pendapat Berteguran tidak diberi kerana dikhuatiri 'mempengaruhi espektasi dan persepsi negatif pihak berkepentingan, khususnya pendeposit'.", p: 133 },
      { t: "Suruhanjaya: KAN telah mempertimbangkan perkara di luar skop audit; JAN tidak tegas — TK2017 tidak sepatutnya menerima Sijil Audit Bersih.", p: 134 },
      { t: "Tanpa Sijil Audit Bersih, LTH tidak sepatutnya mengisytiharkan hibah 4.50% + hibah haji 1.75% yang menelan RM2.75 bilion bagi 2017.", p: 134 },
      { t: "Sejak 2010, Kumpulan Wang Pendeposit tersalah kelas sebagai 'ekuiti' (bukan liabiliti) dalam penyata kewangan — menjadikan aset kelihatan melebihi liabiliti.", p: 132 },
      { t: "KAN mengakui (surat 25 Okt 2018 kepada Pengerusi LTH & 19 Dis 2018 kepada PM) bahawa laporan audit TK2017 sepatutnya mengandungi teguran (qualified opinion).", p: 117 }
    ],
    syor: "Suruhanjaya mencadangkan audit LTH tidak lagi dibuat JAN — sebaliknya firma akauntan swasta, dan seksyen 26 Akta 535 dipinda untuk mengecualikan LTH daripada Akta 240.",
    pSyor: 134
  };

  /* ------------------------------------------------------------------ *
   * HIBAH & DEPOSIT
   * ------------------------------------------------------------------ */
  // Kadar hibah — PDF 120 / ms. 82 (3.9.22)
  var HIBAH_KADAR = {
    tajuk: "Kadar hibah diisytiharkan",
    p: 120,
    rows: [
      { tahun: 2014, tahunan: 6.25, haji: 2.00 },
      { tahun: 2015, tahunan: 5.00, haji: 3.00 },
      { tahun: 2016, tahunan: 4.25, haji: 1.50 },
      { tahun: 2017, tahunan: 4.50, haji: 1.75 },
      { tahun: 2018, tahunan: 1.25, haji: 0 },
      { tahun: 2019, tahunan: 3.05, haji: 0 },
      { tahun: 2020, tahunan: 3.10, haji: 0 },
      { tahun: 2021, tahunan: 3.10, haji: 0 }
    ]
  };

  // Jumlah bayaran hibah — PDF 130 / ms. 92 (3.11.7)
  var HIBAH_BAYARAN = {
    tajuk: "Jumlah hibah dibayar",
    unit: "RM juta",
    p: 130,
    rows: [
      { tahun: 2014, tahunan: 2988.053, haji: 249.143, jumlah: 3237.196 },
      { tahun: 2015, tahunan: 2807.369, haji: 413.005, jumlah: 3220.374 },
      { tahun: 2016, tahunan: 2645.625, haji: 225.197, jumlah: 2870.822 },
      { tahun: 2017, tahunan: 3042.184, haji: 281.557, jumlah: 3323.741 },
      { tahun: 2018, tahunan: 922.959, haji: 0, jumlah: 922.959 },
      { tahun: 2019, tahunan: 2140.538, haji: 0, jumlah: 2140.538 },
      { tahun: 2020, tahunan: 2242.141, haji: 0, jumlah: 2242.141 }
    ]
  };

  var HIBAH_NOTA = [
    { t: "Hibah 2014–2017 dibayar berasaskan RAV (nilai anggaran pengurusan), bukan penyata kewangan beraudit — Suruhanjaya: ini 'tidak selaras dengan kehendak seksyen 22 Akta 535'.", p: 131 },
    { t: "Kesannya, pendeposit dibayar bukan daripada keuntungan sebenar, tetapi daripada wang deposit sendiri.", p: 118 },
    { t: "Roland Berger: pada 2012, 2014 dan 2016, LTH terpaksa mengorek rizab untuk membayar hibah. Rizab terus menyusut selepas 2016.", p: 104 },
    { t: "Pada 2020 dan 2021, rizab sekali lagi digunakan untuk menampung hibah.", p: 106 },
    { t: "7 Februari 2018: LTH mengumumkan perubahan kaedah kiraan hibah (purata baki tahunan), ditarik balik selepas reaksi negatif pendeposit. Kesannya LTH terpaksa mengeluarkan lebihan RM600 juta untuk hibah 2017.", p: 115 },
    { t: "Versi JAN: keupayaan sebenar LTH bagi 2017 hanya RM2.70 bilion (kadar 4%), tetapi RM3.31 bilion dibayar — lebihan RM0.61 bilion (22.5%) melebihi kemampuan.", p: 131 },
    { t: "Tekanan berterusan: LTH cuba membayar hibah 0.5%–1.0% melebihi kadar deposit bank Islam, walaupun pulangan pelaburan tidak menampungnya.", p: 105 },
    { t: "Polisi baharu selepas 2018: sasaran hibah hanya sedikit melebihi kadar purata deposit bank Islam (50–100 mata asas).", p: 122 }
  ];

  // Deposit — pelbagai muka surat
  var DEPOSIT = {
    tajuk: "Pergerakan deposit pendeposit",
    unit: "RM bilion",
    rows: [
      { label: "Sebelum pengumuman hibah 1.25% (2018/awal 2019)", value: 73, approx: true, p: 122 },
      { label: "Akhir 2019", value: 69, p: 122 },
      { label: "Akhir 2020", value: 76, approx: true, p: 122 },
      { label: "21 Mei 2022", value: 88, p: 167 }
    ],
    kepekatan: [
      { label: "75% daripada wang deposit dimiliki hanya 5% pendeposit.", p: 216 },
      { label: "65% pendeposit mempunyai baki RM2,000 atau kurang.", p: 207 },
      { tipe: "nota", label: "Maksudnya: segelintir pendeposit kaya memegang kuasa besar — jika mereka mengeluarkan wang serentak ('bank run'), LTH boleh jatuh. Hibah tinggi pra-2018 menarik golongan ini, sekali gus menjauhkan LTH daripada matlamat asalnya." }
    ],
    jaminan: { t: "Seksyen 24 Akta 535: setiap ringgit deposit dijamin Kerajaan. Nilai jaminan semasa: RM88 bilion. Jika LTH gagal, jaminan ini terpaksa diaktifkan — kesannya membebankan kewangan negara.", p: 151 }
  };

  /* ------------------------------------------------------------------ *
   * PELABURAN BERMASALAH — PDF 176–193 / ms. 138–155 (perenggan 3.14.6)
   * loss dalam RM juta kecuali dinyatakan lain. exposure = jumlah dilabur/diberi.
   * ------------------------------------------------------------------ */
  var PELABURAN = [
    {
      id: "fgv", nama: "FGV Berhad", sektor: "Perladangan (saham tersenarai)",
      tahun: "2012", exposure: 1369.9, exposureNota: "IPO RM1,253.7 juta (273.6 juta unit @ ~RM4.58) + pembelian tambahan RM116.2 juta",
      loss: 1058.9, lossNota: "Kerugian tidak direalisasi RM1,058.9 juta apabila harga jatuh ke RM0.885/unit; dianggarkan ~RM1.1 bilion jika tidak diambil alih UJSB",
      status: "Dipindah ke UJSB", statusJenis: "dialih",
      cerita: "LTH melanggan IPO FGV pada harga ~RM4.55–4.58 seunit (2012) dan terus memegang walaupun harga jatuh teruk. 283.7 juta unit akhirnya diambil alih UJSB pada kos RM4.62/unit (nilai kos RM1,310 juta) — sedangkan harga pasaran sekitar RM0.69/unit sahaja (Feb 2022).",
      p: 192, forensik: true
    },
    {
      id: "thp", nama: "TH Plantations Berhad", sektor: "Perladangan (anak syarikat tersenarai)",
      tahun: "2012–2014", exposure: 1200, exposureNota: "Pembiayaan ladang melalui Sukuk RM1.2 bilion keluaran LTH",
      loss: 170, lossNota: "Rosot nilai RM170 juta di peringkat LTH",
      status: "Siasatan SC & PDRM berterusan", statusJenis: "siasatan",
      cerita: "Pengambilalihan ladang Bumi Suria Ventures, Maju Warisanmas & PT Persada Kencana Prima menjadi masalah — hanya 58% ladang produktif. THP terpaksa menjual estet untuk membayar hutang. Laporan forensik PwC (25 Apr 2019) mendapati pengurusan kanan & lembaga gagal menjalankan tanggungjawab fidusiari. CEO diletakkan garden leave dan meletak jawatan 20 Ogos 2018.",
      p: 188, forensik: true
    },
    {
      id: "dssb", nama: "Deru Semangat Sdn. Bhd. (DSSB)", sektor: "Usaha sama ladang kelapa sawit, Pahang",
      tahun: "2014–2015", exposure: 526.16, exposureNota: "Diluluskan RM526.16 juta (ekuiti RM231 juta + pembiayaan RM295.16 juta); RM257 juta telah dikeluarkan",
      loss: 225, lossNota: "Pelaburan RM257 juta dirosot nilai sehingga tinggal RM32 juta (terbitan: susut ~RM225 juta)",
      status: "Diselesaikan — pegangan dikembalikan kepada YAM Tengku Muda Pahang", statusJenis: "selesai",
      cerita: "Usaha sama membuka ladang di Mukim Tembeling tergendala apabila pembalakan hutan simpan melanggar polisi NDPE — THP tidak dapat menjual sawit kepada Wilmar International. Penyelesaian: ekuiti dirungkai kepada YAM TMP dengan bayaran RM259 juta; YAM TMP memaafkan baki RM258 juta.",
      p: 180, forensik: true
    },
    {
      id: "trurich", nama: "Trurich Resources Sdn. Bhd.", sektor: "Usaha sama ladang kelapa sawit, Kalimantan",
      tahun: "2009", exposure: 364.31, exposureNota: "Pelaburan & pembiayaan RM364.31 juta",
      loss: 364.31, lossNota: "Dirosot nilai sepenuhnya; baki pinjaman kepada Maybank USD179 juta tertunggak",
      status: "Insolven — pelupusan dalam proses akhir", statusJenis: "siasatan",
      cerita: "Usaha sama dengan Felda Global Ventures Kalimantan untuk membangunkan sehingga 200,000 ha tidak berhasil. Laporan polis dibuat (13 Dis 2018) mendakwa laporan kesesuaian tanah bagi 40,880 ha dimanipulasi — siasatan PDRM berterusan, menunggu kerjasama pihak berkuasa Indonesia.",
      p: 181, forensik: true
    },
    {
      id: "alrawda", nama: "Al-Rawda Real Estates (Arab Saudi)", sektor: "Pajakan hotel, Madinah & Mekah",
      tahun: "2015–2017", exposure: 1426, exposureMatawang: "SR", exposureNota: "SR1,426 juta dibayar bagi pajakan 4 hotel (Al-Aqiq, Al-Haram, Al-Saha, Rawdat Al-Bait); kontrak sewa SR2,490 juta",
      loss: 386.8, lossNota: "ECL RM202.8 juta (TK2020) + jangkaan rosot nilai tambahan RM184 juta (TK2021); sewa tertunggak SR560.7 juta",
      status: "Penguatkuasaan mahkamah & timbang tara di Arab Saudi", statusJenis: "mahkamah",
      cerita: "Al-Rawda gagal membayar sewa sejak Mac 2019. Perjanjian penyelesaian SR1,748 juta (Apr 2021) kemudian ditawar turun kepada SR968 juta oleh Al-Rawda — ditolak LTH. 9 tindakan promissory note (SR344 juta) dan 7 tindakan terhadap pemilik Dr. Mashhoor (SR255.1 juta) sedang berjalan; 20 hartanah dikenal pasti untuk likuidasi.",
      p: 184, forensik: true
    },
    {
      id: "alammaritim", nama: "Alam Maritim / TH Marine", sektor: "Usaha sama perkapalan (AHTS)",
      tahun: "2015", exposure: 334, exposureNota: "Ekuiti RM198 juta + pembiayaan RM136 juta",
      loss: 278, lossNota: "Ekuiti RM198 juta dirosot nilai penuh + RM80 juta daripada pembiayaan (terbitan: RM278 juta)",
      status: "Penilaian kebolehpulihan oleh PwC", statusJenis: "siasatan",
      cerita: "Usaha sama 51% dengan Alam Maritim Resources Berhad bagi 6 + 2 kapal AHTS. PwC menganggarkan hanya RM70.4 juta dapat diperoleh semula.",
      p: 190, forensik: true
    },
    {
      id: "ppb", nama: "Putrajaya Perdana Berhad", sektor: "Pembinaan & hartanah (ekuiti 30%)",
      tahun: "2014", exposure: 193.5, exposureNota: "RM193.5 juta untuk 30% ekuiti daripada Cendana Destini Sdn. Bhd.",
      loss: 145.3, lossNota: "Rosot nilai RM145.3 juta (31 Dis 2020); nilai buku tinggal RM48.2 juta",
      status: "Rundingan penyelesaian", statusJenis: "mahkamah",
      cerita: "Dibeli dengan sasaran IPO dalam setahun — IPO tidak berlaku, sasaran untung RM86 juta (TK2015) tidak dicapai. Put Option RM210.7 juta (7 Mac 2018) gagal dilunaskan CDSB. Tindakan undang-undang diluluskan 12 Nov 2020.",
      p: 183, forensik: true
    },
    {
      id: "thip", nama: "PT TH Indo Plantations (THIP)", sektor: "Perladangan, Riau Indonesia",
      tahun: "Jualan 2012", exposure: 0, exposureNota: "Penjualan 95% ekuiti + tanah 83,000 ha pada USD910 juta",
      loss: 0, lossNota: "Harga dipotong USD100 juta; LTH terpaksa memberi pendahuluan USD178.6 juta kepada pembeli",
      status: "Siasatan PDRM berterusan (rentas sempadan)", statusJenis: "siasatan",
      cerita: "Syer dipindahkan sebelum bayaran penuh diterima; bayaran tidak mengikut jadual. Laporan polis 30 Nov 2018 — syak berlaku salah nyataan dan penyembunyian maklumat. Siasatan tergantung kerana memerlukan kebenaran pihak berkuasa Indonesia.",
      p: 177, forensik: true
    },
    {
      id: "alfareeda", nama: "Al-Fareeda Residential Fund", sektor: "Dana perumahan, Arab Saudi",
      tahun: "2013", exposure: 63, exposureNota: "SR76 juta (~RM63 juta) — 13.8% daripada dana SR550 juta",
      loss: 63, lossNota: "Dihapus kira keseluruhan — rugi SR76 juta",
      status: "Dana dicairkan; pengurus dana tidak dapat dikesan", statusJenis: "rugi",
      cerita: "Dana yang diuruskan Anfaal Capital gagal — undang-undang buruh & imigresen baharu Saudi, kontraktor bermasalah, kos binaan naik, harga minyak jatuh. Tiada perkembangan sejak 2017; aset kini di bawah Alinma Bank.",
      p: 188, forensik: true
    },
    {
      id: "abraj", nama: "Abraj Sdn. Bhd.", sektor: "Usaha sama hartanah dengan Amanah Raya",
      tahun: "2009", exposure: 85, exposureNota: "Ekuiti keseluruhan Abraj RM85 juta",
      loss: 40.25, lossNota: "Rosot nilai RM40.25 juta",
      status: "Dijual — Amanah Raya beli 50% pegangan LTH (Dis 2020)", statusJenis: "dialih",
      cerita: "Hartanah tidak mampu menjana pendapatan untuk membayar pinjaman bank; penyewa utama berpindah.",
      p: 182, forensik: true
    },
    {
      id: "emrail", nama: "Emrail Sdn. Bhd.", sektor: "Kejuruteraan rel (ekuiti 15.3%)",
      tahun: "2016", exposure: 20.17, exposureNota: "RM20.17 juta",
      loss: 19.3, lossNota: "Rosot nilai RM19.3 juta (31 Dis 2020)",
      status: "Timbang tara AIAC", statusJenis: "mahkamah",
      cerita: "IPO Bursa dibatalkan; sasaran untung RM36.1 juta (TK2016) gagal. Put Option RM20.3 juta (26 Apr 2017) terhadap Lingkaran Hartaniaga — hanya RM2 juta dibayar. Writ difail 8 Sep 2021.",
      p: 178, forensik: true
    },
    {
      id: "wellspring", nama: "Wellspring Worldwide Limited", sektor: "Ekuiti 10% (sasaran IPO)",
      tahun: "2014", exposure: 18.4, exposureNota: "RM18.4 juta",
      loss: 19.03, lossNota: "Rosot nilai RM19.03 juta (31 Dis 2019)",
      status: "Kebankrapan promoters (25 Jan 2022)", statusJenis: "mahkamah",
      cerita: "Gagal disenaraikan di Bursa. Mahkamah memerintahkan promoters membayar RM20.8 juta (5 Okt 2018) — tetap gagal, sehingga notis kebankrapan difailkan.",
      p: 179, forensik: true
    },
    {
      id: "thhr", nama: "TH Hotel & Residences (THHR)", sektor: "Hotel & kompleks haji",
      tahun: "Pindahan 2018", exposure: 804.1, exposureNota: "5 aset dipindah ke UJSB pada RM804.1 juta — premium ~55% atas nilai buku",
      loss: 0, lossNota: "Pulangan sewa <2%; sewaan TK2020 RM6.2 juta — merosot 62% daripada RM16.5 juta (2019)",
      status: "Dipindah ke UJSB", statusJenis: "dialih",
      cerita: "Hotel Alor Setar, Kuching, Pulau Pinang, Kuala Terengganu & Kota Kinabalu dipindahkan ke UJSB (28 Dis 2018). Movenpick Sepang & Kompleks Haji Kelana Jaya dikecualikan.",
      p: 191, forensik: true
    },
    {
      id: "thproperties", nama: "TH Properties Sdn. Bhd. (bonus)", sektor: "Hartanah (anak syarikat milik penuh)",
      tahun: "2017–2018", exposure: 2.19, exposureNota: "Bonus istimewa RM2.19 juta kepada lembaga pengarah & kakitangan",
      loss: 2.19, lossNota: "Dibayar tanpa kelulusan LTH sebagai pemegang saham — melanggar seksyen 230 Akta Syarikat 2016",
      status: "Lembaga TH Properties memutuskan menuntut semula (12 Ogos 2020)", statusJenis: "siasatan",
      cerita: "Bonus diisytiharkan oleh Exco yang tiada kuasa, tanpa kelulusan pemegang saham. Lihat bahagian Bonus untuk pecahan setiap penerima.",
      p: 189, forensik: true
    }
  ];

  var PELABURAN_NOTA = {
    punca: [
      { t: "Proses keputusan pelaburan tidak teratur — tiada koordinasi antara CIO, Ketua Kewangan Korporat, Ketua Pegawai Hartanah dan Ketua Bahagian Perbendaharaan.", p: 176 },
      { t: "Panel Pelaburan tidak bebas dan tidak meneliti cadangan secukupnya — Pengerusinya sendiri mengaku 'tidak cukup tegas'.", p: 176 },
      { t: "Menteri meluluskan semua cadangan 'seperti yang dicadangkan' — bergantung sepenuhnya pada memo pengurusan.", p: 177 },
      { t: "Suruhanjaya: 'wujudnya transaksi yang mencurigakan dan penyembunyian maklumat' dalam pelaburan LTH.", p: 176 }
    ],
    pandangan: "Setiap anggota Lembaga, lembaga pengarah anak syarikat, pengurusan serta kakitangan yang terlibat patut dipertanggungjawabkan atas kerugian yang dialami LTH.",
    pandanganP: 193,
    kajianEY: "Kajian EY 2018: hampir kesemua anak syarikat dan syarikat berkaitan LTH menghadapi kerugian — hanya Bank Islam & Syarikat Takaful Malaysia memberi dividen mampan.",
    kajianEYP: 224
  };

  /* ------------------------------------------------------------------ *
   * UJSB & SUKUK — PDF 145–175 / ms. 107–137 (perenggan 3.13)
   * ------------------------------------------------------------------ */
  var UJSB = {
    ringkasan: "Urusharta Jamaah Sdn. Bhd. (UJSB) — syarikat tujuan khas (SPV) milik Menteri Kewangan, ditubuhkan 14 Disember 2018 untuk mengambil alih aset lemah LTH, mengikut model Danaharta ketika krisis 1998.",
    p: 145,
    kronologi: [
      { tarikh: "16 Jul 2018", peristiwa: "KAN mengeluarkan 'Emphasis of Matter' ke atas penyata kewangan 2017 — pencetus krisis.", p: 146 },
      { tarikh: "Jul–Ogos 2018", peristiwa: "Pengurusan baharu LTH melantik PwC meneliti kedudukan kewangan 2014–2017.", p: 147 },
      { tarikh: "7 Dis 2018", peristiwa: "Jemaah Menteri meluluskan Pelan Pemulihan & Penstrukturan LTH — diarah siap sebelum hujung tahun.", p: 145 },
      { tarikh: "14 Dis 2018", peristiwa: "UJSB ditubuhkan.", p: 145 },
      { tarikh: "27 Dis 2018", peristiwa: "Perjanjian Pemindahan Aset: 106 saham tersenarai, 1 syarikat perladangan, 29 hartanah.", p: 156 },
      { tarikh: "5 Apr 2019", peristiwa: "Jemaah Menteri meluluskan peruntukan RM17.8 bilion untuk kekurangan penebusan Sukuk.", p: 165 },
      { tarikh: "15 Mei 2019", peristiwa: "Perjanjian Langganan Sukuk & Hak Penolakan Pertama (ROFR) dimeterai.", p: 156 },
      { tarikh: "27 Mei 2019", peristiwa: "Surat Sokongan Kewangan Menteri Kewangan (Letter of Comfort, bukan jaminan).", p: 164 },
      { tarikh: "30 Dis 2019", peristiwa: "Bayaran tunai pertama RM100 juta kepada LTH.", p: 163 },
      { tarikh: "30 Nov 2020", peristiwa: "Penebusan awal Sukuk RM200 juta.", p: 166 },
      { tarikh: "30 Dis 2020", peristiwa: "Bayaran tunai kedua RM200 juta kepada LTH.", p: 163 },
      { tarikh: "2021", peristiwa: "Suntikan RM1.5 bilion diperuntukkan dalam Belanjawan 2021 TIDAK diterima — keutamaan kepada pemulihan Covid-19.", p: 166 }
    ],
    // Nilai pemindahan — PDF 159 / ms. 121 (3.13.28–3.13.29)
    pemindahan: {
      p: 159,
      rows: [
        { kategori: "Ekuiti tersenarai (Bursa)", nilaiBuku: 16852, nilaiPindah: 16851, nilaiPasaran: 7600 },
        { kategori: "Hartanah & tanah (29 aset)", nilaiBuku: 1411, nilaiPindah: 2247, nilaiPasaran: 1411 },
        { kategori: "Syarikat perladangan", nilaiBuku: 718, nilaiPindah: 802, nilaiPasaran: 718 }
      ],
      jumlah: { nilaiBuku: 18981, nilaiPindah: 19900, nilaiPasaran: 9729 }
    },
    // Saham bluechip utama — PDF 162 / ms. 124 (3.13.37)
    bluechips: {
      p: 162,
      nota: "Kaunter terbesar yang dipindahkan (kejatuhan >20% atau >RM45 juta). Harga 8 Jun 2022 menunjukkan semuanya masih di bawah harga pindahan.",
      rows: [
        { kaunter: "Axiata", hargaPindah: 6.00, hargaDis18: 3.63, jatuhPeratus: -39.5, nilaiPindah: 1422.6, nilaiDis18: 931.8, hargaJun22: 3.04 },
        { kaunter: "Maxis", hargaPindah: 6.84, hargaDis18: 5.43, jatuhPeratus: -20.6, nilaiPindah: 879.4, nilaiDis18: 681.2, hargaJun22: 3.52 },
        { kaunter: "Digi", hargaPindah: 5.13, hargaDis18: 4.24, jatuhPeratus: -17.3, nilaiPindah: 576.2, nilaiDis18: 500.3, hargaJun22: 3.27 },
        { kaunter: "MISC", hargaPindah: 7.43, hargaDis18: 6.15, jatuhPeratus: -17.2, nilaiPindah: 486.5, nilaiDis18: 438.9, hargaJun22: 7.30 },
        { kaunter: "TM", hargaPindah: 5.96, hargaDis18: 2.33, jatuhPeratus: -60.9, nilaiPindah: 241.2, nilaiDis18: 107.7, hargaJun22: 5.20 }
      ]
    },
    // Hartanah — PDF 161 / ms. 123 (3.13.34)
    hartanah: {
      p: 161,
      nota: "Nilai 29 hartanah semasa dipindah vs nilai pasaran semula (31 Dis 2021).",
      rows: [
        { kategori: "Hotel", nilaiPindah: 804.06, nilai2021: 424.27 },
        { kategori: "Menara pejabat", nilaiPindah: 737.40, nilai2021: 325.00 },
        { kategori: "Tanah", nilaiPindah: 627.01, nilai2021: 401.08 },
        { kategori: "Lot kedai", nilaiPindah: 46.30, nilai2021: 33.33 },
        { kategori: "Perindustrian", nilaiPindah: 31.91, nilai2021: 19.00 }
      ],
      jumlah: { nilaiPindah: 2246.68, nilai2021: 1202.68 }
    },
    // Sukuk — PDF 163–165 / ms. 125–127 (3.13.41–3.13.45)
    sukuk: {
      p: 163,
      nota: "Sukuk Murabahah kupon sifar, dilanggan sepenuhnya oleh LTH. Tidak berpenarafan, tidak boleh diniagakan, tidak dijamin Kerajaan — hanya Letter of Comfort.",
      siri: [
        { nama: "Siri 1", terbitan: 10.0, nominal: 13.2, tempoh: 7, kupon: 4.05, matang: 2026 },
        { nama: "Siri 2", terbitan: 9.6, nominal: 14.3, tempoh: 10, kupon: 4.10, matang: 2029 }
      ],
      tunai: { jumlah: 300, nota: "RM100 juta (30 Dis 2019) + RM200 juta (30 Dis 2020)" },
      jumlahNominal: 27.5,
      tunggakanAkru: 7.65
    },
    kerajaan: {
      peruntukan: { jumlah: 17.8, rmk11: 0.5, rmk1213: 17.3, purata: 1.73, p: 165 },
      geran2020: { jumlah: 500, kepada_lth: 300, tebus: 200, p: 165 },
      komitmen: { ujsb2020: 20683, ujsb2021: 21097, jumlah2020: 185727, jumlah2021: 190437, peratus: 11.1, p: 164 }
    },
    risiko: [
      { t: "Sukuk RM27.5 bilion bersamaan ~31% daripada keseluruhan aset LTH.", p: 171 },
      { t: "Akruan Sukuk menyumbang hampir 26% pendapatan tahunan LTH — melebihi satu pertiga jumlah hibah tahunan kepada pendeposit.", p: 171 },
      { t: "Pendapatan tertunggak (deferred income) RM840 juta setahun TIDAK bersandarkan tunai — kumulatif melebihi RM2.1 bilion setakat 31 Dis 2021.", p: 170 },
      { t: "Tunggakan keuntungan terakru menjelang matang: RM7.65 bilion.", p: 167 },
      { t: "Suruhanjaya: kegagalan UJSB melunaskan obligasinya adalah risiko terbesar LTH — boleh meruntuhkan ekosistem kewangan negara.", p: 171 },
      { t: "Pelan ini 'solusi interim yang penting' tetapi 'bukan solusi jangka panjang'.", p: 175 }
    ],
    pelupusan: {
      p: 167,
      rows: [
        { label: "Kaunter saham Bursa dilupuskan", nilai: 75, daripada: 106, nota: "Dijual di pasaran terbuka pada harga pasaran" },
        { label: "Hartanah terjual (tender terbuka 2020)", nilai: 1, daripada: 19, nota: "Hanya tanah di Segamat, Johor (RM920 ribu); 17 lagi tiada bidaan" },
        { label: "Pelaburan semula oleh UJSB", nilai: 329, daripada: null, nota: "Kaunter baharu domestik & antarabangsa; pendapatan RM200–300 juta/tahun menampung operasi UJSB" }
      ],
      kerugianUJSB: { t: "UJSB menelan kerugian RM9.9 bilion pada TK2019 — perbezaan nilai pemindahan vs nilai pasaran aset yang diambil alih.", p: 168 }
    },
    cadangan4: {
      p: 152,
      nota: "Empat cadangan dinilai jawatankuasa khas (Pejabat PM, BNM, MOF, pengurusan LTH) sebelum UJSB dipilih:",
      rows: [
        { cadangan: "Suntikan tunai Kerajaan >RM10 bilion", keputusan: "Ditolak", sebab: "Terlalu besar; jejaskan peruntukan pembangunan & risiko kepada penarafan negara (siling hutang 55% KDNK)" },
        { cadangan: "Aktifkan jaminan Kerajaan (seksyen 24 Akta 535)", keputusan: "Ditolak", sebab: "Jangka pendek; tidak menutup defisit; menambah hutang LTH kepada Kerajaan" },
        { cadangan: "Deferred asset — tangguhkan kerugian ke masa hadapan", keputusan: "Ditolak", sebab: "Tidak dibenarkan di bawah MFRS 9; LTH tetap tidak mampu membayar hibah 2018" },
        { cadangan: "Pindahkan aset lemah kepada SPV (UJSB)", keputusan: "Diterima", sebab: "Solusi jangka panjang; aset diganti instrumen berpendapatan stabil pada nilai premium" }
      ]
    }
  };

  /* ------------------------------------------------------------------ *
   * HAFIS & KOS HAJI — PDF 203–210 / ms. 165–172 (perenggan 3.16)
   * ------------------------------------------------------------------ */
  var HAFIS = {
    sejarah: [
      { tahun: 2014, kos: 16155, bayaran: 9980, hafis: 6175, jumlah: 106 },
      { tahun: 2015, kos: 17270, bayaran: 9980, hafis: 7290, jumlah: 135 },
      { tahun: 2016, kos: 18890, bayaran: 9980, hafis: 8910, jumlah: 160 },
      { tahun: 2017, kos: 19550, bayaran: 9980, hafis: 9570, jumlah: 298 },
      { tahun: 2018, kos: 22450, bayaran: 9980, hafis: 12470, jumlah: 314 },
      { tahun: 2019, kos: 22900, bayaran: 9980, hafis: 12920, jumlah: 299 }
    ],
    sejarahP: 204,
    unjuran: [
      { tahun: 2022, kos: 25540, bayaran: 12980, hafis: 12560, jumlah: 376.8 },
      { tahun: 2023, kos: 26280, bayaran: 12980, hafis: 13300, jumlah: 399.0 },
      { tahun: 2024, kos: 28160, bayaran: 12980, hafis: 15180, jumlah: 455.4 },
      { tahun: 2025, kos: 29570, bayaran: 12980, hafis: 16590, jumlah: 497.7 },
      { tahun: 2026, kos: 31040, bayaran: 12980, hafis: 18060, jumlah: 541.8 },
      { tahun: 2027, kos: 32592, bayaran: 12980, hafis: 19612, jumlah: 588.36 },
      { tahun: 2028, kos: 34221, bayaran: 12980, hafis: 21241, jumlah: 637.23 },
      { tahun: 2029, kos: 35932, bayaran: 12980, hafis: 22952, jumlah: 688.56 },
      { tahun: 2030, kos: 37729, bayaran: 12980, hafis: 24749, jumlah: 742.47 }
    ],
    unjuranP: 205,
    fakta: [
      { t: "Bayaran haji RM9,980 tidak pernah dinaikkan selama 13 tahun (2009–2021) walaupun kos sebenar terus meningkat.", p: 205 },
      { t: "2022: kadar baharu RM10,980 (jemaah B40) dan RM12,980 (bukan B40) — kos sebenar RM25,540 seorang.", p: 205 },
      { t: "Tiada penghantaran jemaah pada 2020 & 2021 (Covid-19).", p: 204 },
      { t: "Subsidi HAFIS ~RM400 juta setahun bersamaan pengurangan ~0.4% kadar hibah kepada semua pendeposit.", p: 206 },
      { t: "LTH memerlukan dana minimum RM60 bilion untuk menampung subsidi haji pada tahap sekarang.", p: 206 },
      { t: "Kuota haji Malaysia ~30,000 jemaah (pra-pandemik); boleh mencecah 60,000 menjelang 2030 di bawah Saudi Vision 2030.", p: 209 },
      { t: "Mekanisme semasa: simpan RM1,300 (deposit minimum), tambah RM11,680 jika terpilih — layak pakej bernilai ~RM25,000, ditanggung LTH.", p: 208 },
      { t: "Kos haji 2003: RM15,555; 2022: RM25,540; unjuran 2050: RM50,000.", p: 203 }
    ],
    subsidiSilang: "HAFIS dibayar daripada keuntungan pelaburan wang pendeposit — maksudnya 8.6 juta pendeposit (termasuk yang belum pernah menunaikan haji) menanggung subsidi jemaah yang berangkat. Jika subsidi naik, hibah turun; jika hibah turun, pendeposit besar berisiko lari — begitulah kitaran yang memerangkap LTH.",
    subsidiSilangP: 206,
    cadangan: [
      { t: "Deposit minimum untuk layak giliran haji automatik dinaikkan daripada RM1,300 kepada RM12,980 (bayaran semasa).", p: 206 },
      { t: "Pengeluaran besar dihadkan dan perlu notis sebulan.", p: 206 },
      { t: "Subsidi hanya kepada jemaah yang benar-benar memerlukan (prinsip istito'ah).", p: 206 },
      { t: "Kesan jika bayaran pendaftaran dinaikkan kepada RM12,980: tempoh menunggu giliran haji dipendekkan daripada ~130 tahun kepada ~33 tahun.", p: 236 }
    ]
  };

  /* ------------------------------------------------------------------ *
   * BONUS — PDF 135–145 / ms. 97–107 (perenggan 3.12)
   * ------------------------------------------------------------------ */
  var BONUS = {
    // Jadual 3.12.7 — PDF 137 / ms. 99
    kakitangan: {
      p: 137,
      nota: "Peruntukan bonus kakitangan LTH. Kadar 2010–2017 'amat tinggi' — sehingga 13 bulan gaji (2014).",
      rows: [
        { tahun: 2010, peruntukan: 25, bulan: "2.5 + 1 (khas)" },
        { tahun: 2011, peruntukan: 35, bulan: "3 + 1 (khas)" },
        { tahun: 2012, peruntukan: 38, bulan: "3.5 + 1 (khas)" },
        { tahun: 2013, peruntukan: 49, bulan: "2.5–10" },
        { tahun: 2014, peruntukan: 74, bulan: "1–11 + 2 (khas)" },
        { tahun: 2015, peruntukan: 65, bulan: "1–10" },
        { tahun: 2016, peruntukan: 25, bulan: "1–3" },
        { tahun: 2017, peruntukan: 56.7, bulan: "1–6" },
        { tahun: 2018, peruntukan: 10.8, bulan: "1" },
        { tahun: 2019, peruntukan: 11.6, bulan: "1" },
        { tahun: 2020, peruntukan: 14.1, bulan: "1" }
      ]
    },
    // Bonus vs keuntungan — 3.12.10, PDF 139 / ms. 101
    vsUntung: {
      p: 139,
      rows: [
        { tahun: 2013, untung: 2634, bonus: 49, peratus: 1.9 },
        { tahun: 2014, untung: 2979, bonus: 74, peratus: 2.5 },
        { tahun: 2015, untung: 3537, bonus: 61, peratus: 1.7 },
        { tahun: 2016, untung: 2481, bonus: 25, peratus: 1.0 },
        { tahun: 2017, untung: 2798, bonus: 57, peratus: 2.0 }
      ]
    },
    fakta: [
      { t: "Suruhanjaya: pemberian bonus sebanyak itu 'tidak wajar' memandangkan aset LTH lebih rendah daripada liabiliti sepanjang 2014–2017.", p: 139 },
      { t: "Proses kelulusan 3 peringkat (Lembaga → Menteri → MOF) — tetapi Menteri & MOF lazimnya hanya menerima cadangan pengurusan.", p: 138 },
      { t: "Mulai TK2018, bonus dikawal mengikut kemampuan kewangan sebenar LTH.", p: 140 }
    ],
    thp2017: {
      p: 141,
      tajuk: "Bonus istimewa TH Properties 2017 (RM1,148,400)",
      nota: "Diluluskan Mesyuarat Exco 12 April 2017 — Exco tiada kuasa; melanggar seksyen 230(2) & 230(4) Akta Syarikat 2016.",
      rows: [
        { nama: "Datuk Azizan bin Abdul Rahman", jawatan: "Pengerusi TH Properties", jumlah: 231000 },
        { nama: "Dato' Roszali bin Othman", jawatan: "Ahli Exco", jumlah: 189750 },
        { nama: "Haji Abd Kadir bin Sahlan", jawatan: "Ahli Exco (juga Ketua Pegawai Pelaburan LTH 2010–2018)", jumlah: 189750 },
        { nama: "Nik Badrul Hisham bin Nik Hassan", jawatan: "Pengarah", jumlah: 99000 },
        { nama: "Anuarifaei bin Mustapa", jawatan: "Pegawai", jumlah: 99000 },
        { nama: "Nur Adlan bin Taib", jawatan: "Pegawai", jumlah: 99000 },
        { nama: "Zaidi bin Baharudin", jawatan: "Pegawai", jumlah: 56100 },
        { nama: "Haji Mohamed Rahim bin Ismail", jawatan: "Pegawai", jumlah: 52800 },
        { nama: "Aida binti Karim", jawatan: "Pegawai", jumlah: 49500 },
        { nama: "Marhaizah binti Mohamed Yusuf", jawatan: "Pegawai", jumlah: 49500 },
        { nama: "Dato' Mohd Fazillah bin Mohd Ali", jawatan: "Ahli Exco", jumlah: 33000 }
      ]
    },
    thp2018: {
      p: 142,
      tajuk: "Bonus THP Australia Capital 2018 (RM1,045,000)",
      nota: "Diluluskan Lembaga Pengarah THP Australia 23 April 2018; notifikasi pemegang saham hanya 7 bulan kemudian — melanggar seksyen 230(3) Akta Syarikat 2016.",
      rows: [
        { nama: "Dato' Roszali bin Othman", jumlah: 176500 },
        { nama: "Haji Abd Kadir bin Sahlan", jumlah: 176500 },
        { nama: "Dato' Azizan bin Abd Rahman", jumlah: 167250 },
        { nama: "Nik Badrul Hisham bin Nik Hassan", jumlah: 101500 },
        { nama: "Anuarifaei bin Mustapa", jumlah: 101500 },
        { nama: "Nur Adlan bin Taib", jumlah: 101500 },
        { nama: "Zaidi bin Baharudin", jumlah: 63000 },
        { nama: "Aida binti Karim", jumlah: 63000 },
        { nama: "Marhaizah binti Mohamed Yusuf", jumlah: 63000 },
        { nama: "Haji Mohamed Rahim bin Ismail", jumlah: 31250 }
      ]
    },
    tindakanSemula: "12 Ogos 2020: Lembaga Pengarah TH Properties memutuskan untuk mendapatkan kembali bonus 2017–2018 daripada penerima. Suruhanjaya mengesyorkan usaha mendapatkan semula bonus tersebut.",
    tindakanSemulaP: 145
  };

  /* ------------------------------------------------------------------ *
   * TADBIR URUS — orang, politik, konflik kepentingan
   * ------------------------------------------------------------------ */
  var TADBIR = {
    menteri: [
      { nama: "Dato' Seri Jamil Khir Baharom", mula: "2009-02-10", tamat: "2018-05-09", nota: "Menteri di JPM (Hal Ehwal Agama)", p: 56 },
      { nama: "(Kosong — kuasa dijalankan PM Tun Dr. Mahathir)", mula: "2018-05-10", tamat: "2018-07-01", nota: "Perintah P.U.(A) 125", p: 56 },
      { nama: "Datuk Seri Dr. Mujahid Yusof Rawa", mula: "2018-07-02", tamat: "2020-03-09", nota: "Menteri di JPM (Hal Ehwal Agama)", p: 56 },
      { nama: "Datuk Dr. Zulkifli Mohamad al-Bakri", mula: "2020-03-10", tamat: "2021-08-29", nota: "Menteri di JPM (Hal Ehwal Agama)", p: 56 },
      { nama: "Datuk Idris Ahmad", mula: "2021-08-30", tamat: "2022-08-30", nota: "Menteri di JPM (Hal Ehwal Agama) — masih berkhidmat semasa laporan", p: 56 }
    ],
    pengerusi: [
      { nama: "Datuk Seri Panglima Abdul Azeez Abdul Rahim", mula: "2013-07-01", tamat: "2018-05-23", nota: "Ahli Parlimen Baling; Ahli Majlis Tertinggi UMNO", politik: true, p: 59 },
      { nama: "Tan Sri Md Nor Md Yusof", mula: "2018-07-10", tamat: "2021-10-15", nota: "Ditamatkan awal tanpa sebab — kontrak baru sahaja disambung 2 tahun (20 Jul 2020)", ditamatkan: true, p: 59 },
      { nama: "Tan Sri Azman Mokhtar", mula: "2021-12-20", tamat: "2022-08-30", nota: "Masih berkhidmat semasa laporan", p: 60 }
    ],
    kpe: [
      { nama: "Tan Sri Ismee Ismail", mula: "2006-01-01", tamat: "2016-06-30", nota: "KPE & anggota Lembaga", p: 65 },
      { nama: "Datuk Seri Johan Abdullah", mula: "2016-07-01", tamat: "2018-06-30", nota: "Pengarah Urusan Kumpulan & KPE", p: 65 },
      { nama: "Dato' Sri Zukri Samat", mula: "2018-07-10", tamat: "2019-08-31", nota: "Pengarah Urusan Kumpulan & KPE", p: 65 },
      { nama: "Datuk Nik Mohd Hasyudeen Yusoff", mula: "2019-09-01", tamat: "2021-05-05", nota: "Ditamatkan awal tanpa sebab — sepatutnya hingga 31 Ogos 2021", ditamatkan: true, p: 65 },
      { nama: "Datuk Sri Amrin Awaluddin", mula: "2021-05-06", tamat: "2022-08-30", nota: "Masih berkhidmat semasa laporan", p: 65 }
    ],
    politik: [
      { nama: "Abdul Azeez Abdul Rahim", jawatan: "Pengerusi LTH 2013–2018", latar: "Ahli Parlimen Baling; Ahli Majlis Tertinggi UMNO", p: 77 },
      { nama: "Tan Sri Badruddin Amiruldin", jawatan: "Anggota Lembaga 2005–2018", latar: "Bekas Ahli Parlimen; Pengerusi Tetap Perhimpunan Agong UMNO", p: 77 },
      { nama: "Datuk Rosni Sohar", jawatan: "Anggota Lembaga 2014–2018", latar: "ADUN Hulu Bernam; Ahli MKT & Setiausaha Wanita UMNO", p: 77 }
    ],
    // jawatan dalam anak syarikat — PDF 84–89 / ms. 46–51
    anakSyarikat: {
      p: 84,
      nota: "Bilangan jawatan (Pengerusi/Ahli Lembaga Pengarah) yang dipegang dalam anak-anak syarikat LTH:",
      rows: [
        { nama: "Datuk Seri Johan Abdullah (KPE 2016–2018)", jumlah: 18 },
        { nama: "Datuk Rozaida Omar (Ketua Pegawai Kewangan, proksi LTH)", jumlah: 21 },
        { nama: "Dato' Noordin Sulaiman (Anggota Lembaga)", jumlah: 9 },
        { nama: "Abdul Azeez Abdul Rahim (Pengerusi 2013–2018)", jumlah: 8 },
        { nama: "Tan Sri Ismee Ismail (KPE 2006–2016)", jumlah: 7 },
        { nama: "Datuk Zaiton Mohd Hassan (Anggota Lembaga)", jumlah: 7 },
        { nama: "Dato' Sri Zukri Samat (KPE 2018–2019)", jumlah: 4 },
        { nama: "Datuk Nik Mohd Hasyudeen (KPE 2019–2021)", jumlah: 4 },
        { nama: "Tan Sri Badruddin Amiruldin (Anggota Lembaga)", jumlah: 3 },
        { nama: "Datuk Sri Amrin Awaluddin (KPE 2021–kini)", jumlah: 3 }
      ]
    },
    jawatankuasa: {
      p: 63,
      nota: "Semua 13 jawatankuasa LTH ditubuhkan di bawah seksyen 11 Akta 535 — pentadbiran, bukan undang-undang. Akibatnya ia boleh dibubarkan sewenangnya.",
      peristiwa: [
        { t: "Mei/Julai 2018: Panel Pelaburan & Majlis Penasihat Haji dibubarkan secara pentadbiran.", p: 92 },
        { t: "Pengganti Panel Pelaburan — 'Exco Perniagaan' — mengaku saksi 'tidak pernah berfungsi'.", p: 92 },
        { t: "Pelaburan LTH berada di luar skop Jawatankuasa Penasihat Syariah sehingga 2016; LTH melantik perunding luar (Amanie Advisors, 2010–2016).", p: 95 },
        { t: "Suruhanjaya mencadangkan Panel Pelaburan, Jawatankuasa Penasihat Syariah & Jawatankuasa Urusan Haji dikanunkan dalam Akta 535.", p: 91 }
      ]
    },
    kuasaMenteri: {
      p: 78,
      nota: "Akta 535 memberi Menteri Hal Ehwal Agama kuasa melantik & membatalkan pelantikan tanpa sebab (seksyen 6(5)), meluluskan pelaburan, hibah, dan banyak lagi. Suruhanjaya mendapati kepakaran ketiga-tiga Menteri terhad kepada hal ehwal agama — mereka bergantung sepenuhnya kepada cadangan pengurusan.",
      fakta: [
        { t: "Seksyen 6(2) Akta 535 hanya mensyaratkan anggota Lembaga 'seorang Muslim dan warganegara Malaysia' — tiada kriteria kepakaran kewangan.", p: 71 },
        { t: "7 undang-undang lain (KWSP, LHDN, SC, PTPTN, KWAP, LPPSA, MAVCOM) semuanya mempunyai kriteria kepakaran khusus untuk ahli lembaga.", p: 71 },
        { t: "Kuasa seksyen 6(5) digunakan 2 kali: menamatkan KPE Nik Mohd Hasyudeen (5 Mei 2021) & Pengerusi Md Nor Md Yusof (15 Okt 2021) — tanpa sebab.", p: 82 },
        { t: "Suruhanjaya: kedua-duanya 'sedang melaksanakan penambahbaikan terhadap LTH'; penamatan mengejut ini menjejaskan proses pemulihan.", p: 82 },
        { t: "Keputusan seperti hibah, bayaran haji dan HAFIS didapati 'didorong oleh unsur-unsur politik'.", p: 16 }
      ]
    }
  };

  /* ------------------------------------------------------------------ *
   * TINDAKAN UNDANG-UNDANG & TATATERTIB — PDF 193–203 / ms. 155–165
   * ------------------------------------------------------------------ */
  var TINDAKAN = {
    polis: {
      p: 193,
      nota: "Empat laporan polis dibuat oleh pengurusan baharu LTH selepas siasatan dalaman bermula pertengahan 2018.",
      rows: [
        { tarikh: "30 Nov 2018", repot: "Dang Wangi/31347/2018", pengadu: "Idrus Ismail (bekas Setiausaha Syarikat LTH)", perkara: "Penganjuran aktiviti & penggunaan wang Yayasan Tabung Haji disyaki menyalahi perlembagaan Yayasan", status: "Kertas siasatan dirujuk ke Jabatan Peguam Negara", p: 194 },
        { tarikh: "30 Nov 2018", repot: "Dang Wangi/31331/2018", pengadu: "Idrus Ismail", perkara: "Penjualan 95% saham PT TH Indo Plantations kepada PT Borneo Pacific (~USD910 juta) — syak salah nyataan & penyembunyian maklumat", status: "Siasatan berterusan — menunggu kebenaran pihak berkuasa Indonesia", p: 194 },
        { tarikh: "13 Dis 2018", repot: "Dang Wangi/32724/2018", pengadu: "Aliatun Mahmud (bekas Setiausaha Trurich)", perkara: "Dakwaan manipulasi laporan kesesuaian tanah 40,880 ha di Kalimantan yang mengelirukan Trurich (~USD58 juta)", status: "Siasatan berterusan — menunggu kebenaran pihak berkuasa Indonesia", p: 195 },
        { tarikh: "16 Jan 2019", repot: "Dang Wangi/1484/2019", pengadu: "Idrus Ismail", perkara: "Perisytiharan hibah TK2017 melanggar seksyen 22 Akta 535 — dakwaan salah nyataan pengurusan dalam 2 kertas kerja Mesyuarat Khas Lembaga (6 & 9 Feb 2018)", status: "Siasatan SELESAI — dirujuk ke Jabatan Peguam Negara untuk pertimbangan Pendakwa Raya", p: 196 }
      ]
    },
    sprm: {
      p: 201,
      nota: "Enam perkara dilaporkan kepada SPRM — semua masih dalam siasatan semasa laporan disiapkan.",
      rows: [
        "Dakwaan rasuah dalam pembelian Ladang Weida Bhd oleh TH Plantations",
        "Penyelewengan dalam penyewaan Restoran Opah, KL Sentral",
        "Penyelewengan dalam penyewaan Restoran Nasi Dalca, Ibu Pejabat LTH",
        "Penyelewengan oleh bekas Ketua Pegawai Operasi LTH dalam kerja pengubahsuaian",
        "Pemalsuan dokumen pembekalan anak benih getah di Ladang TH-Usia Jatimas, Sandakan",
        "Salah laku pegawai THP Bina Sdn. Bhd. & THP Timur Sdn. Bhd."
      ]
    },
    tatatertib: {
      p: 197,
      nota: "Lima pegawai kanan pengurusan lama dikenakan tindakan tatatertib dalam 4 kluster kesalahan. Kesemua masih berkhidmat dalam kumpulan LTH selepas hukuman dikurangkan semasa rayuan.",
      pegawai: [
        { nama: "Datuk Rozaida Omar", asal: "Ketua Pegawai Kewangan Kumpulan", kluster: "1, 2 & 3" },
        { nama: "Dato' Adi Azuan Abdul Ghani", asal: "Ketua Pegawai Operasi", kluster: "2" },
        { nama: "Rifina Md Ariff", asal: "Pengurus Besar Kanan Perkhidmatan Korporat & Hartanah", kluster: "1" },
        { nama: "Mohd Hisham Harun", asal: "Ketua Pegawai Sumber Manusia", kluster: "1 & 2" },
        { nama: "Hazlina Mohd Khalid", asal: "Penasihat Undang-Undang", kluster: "1 & 4" }
      ],
      kluster: [
        { nama: "Kluster 1: Penjualan saham PT TH Indo Plantations", pertuduhan: "29 Mei 2020", keputusan: "Buang kerja (21 Apr 2021)", rayuan: "Dikurangkan kepada turun pangkat (6 Sep 2021)", bulan: null, p: 197 },
        { nama: "Kluster 2: Sumbangan RM22.12 juta Yayasan TH tanpa kelulusan", pertuduhan: "15 & 19 Mac 2019", keputusan: "Turun pangkat", rayuan: "Dikurangkan kepada amaran keras / amaran + tangguh kenaikan gaji", bulan: 19, p: 198 },
        { nama: "Kluster 3: Perisytiharan hibah TK2017", pertuduhan: "3 Jan 2020", keputusan: "Buang kerja (16 Apr 2021)", rayuan: "Dikurangkan kepada turun pangkat (6 Sep 2021)", bulan: 15, p: 199 },
        { nama: "Kluster 4: Tuntutan mengandungi butiran palsu", pertuduhan: "11 Jan 2019", keputusan: "Turun pangkat (1 Nov 2019)", rayuan: "Kekal turun pangkat (28 Jan 2020)", bulan: 10, p: 199 }
      ],
      kelewatan: "Suruhanjaya menegur kelewatan proses — Kluster 2 mengambil 19 bulan, Kluster 3: 15 bulan, Kluster 4: 10 bulan — dan mengesyorkan proses diperkemas termasuk durasi penahanan kerja.",
      kelewatanP: 200
    },
    mahkamah: {
      p: 202,
      rows: [
        { kes: "LTH lwn PT Borneo Pacific", perkara: "Penjualan pegangan ekuiti PT TH Indo Plantations", status: "Dalam pertikaian mahkamah / timbang tara" },
        { kes: "LTH lwn Al-Rawda", perkara: "Pajakan & sub-pajakan 4 hotel di Madinah & Mekah (tuntutan SR344 juta + SR255.1 juta terhadap penjamin)", status: "Penguatkuasaan promissory note, timbang tara & likuidasi 20 hartanah berjalan" }
      ],
      nota: "Suruhanjaya mengesyorkan kes dipantau rapat dan penyelesaian luar mahkamah dipertingkatkan."
    }
  };

  /* ------------------------------------------------------------------ *
   * KRONOLOGI UTAMA — disusun daripada seluruh laporan
   * tema: krisis | hibah | ujsb | pelaburan | tadbir | tindakan | haji
   * ------------------------------------------------------------------ */
  var KRONOLOGI = [
    { d: "1951", tema: "haji", t: "Ordinan Haji 1951 — Pejabat Urusan Haji ditubuhkan di Pulau Pinang.", p: 53 },
    { d: "1962", tema: "haji", t: "Perbadanan Wang Simpanan Bakal-Bakal Haji (PWSBH) ditubuhkan (Akta 34/62).", p: 53 },
    { d: "1969", tema: "haji", t: "Lembaga Urusan dan Tabung Haji (LUTH) menggantikan PWSBH (Akta 8).", p: 54 },
    { d: "1979", tema: "haji", t: "Fatwa Kebangsaan: simpanan berasaskan Mudarabah; LTH membayar zakat bagi pihak pendeposit.", p: 106 },
    { d: "1995", tema: "haji", t: "LUTH dimansuhkan; Lembaga Tabung Haji (LTH) ditubuhkan di bawah Akta Tabung Haji 1995 (Akta 535).", p: 54 },
    { d: "2001", tema: "haji", t: "Subsidi haji (HAFIS) diperkenalkan — sebelum ini jemaah membayar kos sebenar.", p: 207 },
    { d: "2009", tema: "haji", t: "Kerajaan membekukan kenaikan bayaran haji — RM9,980 kekal selama 13 tahun.", p: 210 },
    { d: "9 Mei 2012", tema: "pelaburan", t: "Kelulusan pelaburan IPO FGV; LTH melanggan 273.6 juta unit (~RM1.25 bilion).", p: 192 },
    { d: "2012", tema: "pelaburan", t: "Penjualan 95% ekuiti PT TH Indo Plantations (USD910 juta) — kemudian menjadi pertikaian.", p: 177 },
    { d: "21 Feb 2013", tema: "pelaburan", t: "Langganan Al-Fareeda Residential Fund, Arab Saudi (SR76 juta).", p: 188 },
    { d: "1 Jul 2013", tema: "tadbir", t: "Abdul Azeez Abdul Rahim (Ahli Parlimen UMNO) dilantik Pengerusi LTH.", p: 59 },
    { d: "21 Ogos 2014", tema: "krisis", t: "Surat pertama BNM kepada Pengerusi LTH — isu pengambilan deposit & kecairan.", p: 100 },
    { d: "21 Sep 2014", tema: "pelaburan", t: "Pelaburan Wellspring Worldwide (RM18.4 juta).", p: 179 },
    { d: "21 Okt 2014", tema: "pelaburan", t: "Kelulusan Menteri untuk usaha sama Deru Semangat (RM526.16 juta diluluskan).", p: 180 },
    { d: "19 Dis 2014", tema: "krisis", t: "Surat BNM kedua: Pengambilan Deposit dan Pengurusan Kecairan.", p: 100 },
    { d: "Dis 2014", tema: "pelaburan", t: "Pembelian 30% ekuiti Putrajaya Perdana Berhad (RM193.5 juta).", p: 183 },
    { d: "2014", tema: "krisis", t: "PwC: defisit selepas agihan hibah mula direkod (−RM352 juta).", p: 147 },
    { d: "2014", tema: "hibah", t: "Hibah 6.25% + 2.00% dibayar — RM3.24 bilion, melebihi keuntungan sebenar.", p: 120 },
    { d: "2015", tema: "tadbir", t: "Jawatankuasa Penasihat Syariah ditubuhkan; rangka kerja RAV mula digunakan bagi TK2015.", p: 94 },
    { d: "18 Jun 2015", tema: "pelaburan", t: "Kelulusan Menteri usaha sama Alam Maritim/TH Marine (RM334 juta).", p: 190 },
    { d: "23 Dis 2015", tema: "krisis", t: "BNM menulis kepada Pengerusi LTH DAN Menteri — isu pendeposit besar & rizab. Mencetuskan pelantikan EY.", p: 100 },
    { d: "2015", tema: "hibah", t: "Hibah 5.00% + 3.00% — RM3.22 bilion. Aset jatuh di bawah liabiliti buat pertama kali (mengikut penyata beraudit).", p: 125 },
    { d: "2016", tema: "haji", t: "Akad simpanan ditukar kepada Wadi'ah Yad Dhamanah tanpa dokumen persetujuan pendeposit.", p: 107 },
    { d: "7 Jun 2016", tema: "pelaburan", t: "Pembelian 15.3% ekuiti Emrail (RM20.17 juta).", p: 178 },
    { d: "1 Jul 2016", tema: "tadbir", t: "Johan Abdullah dilantik KPE — memegang 18 jawatan dalam anak syarikat.", p: 65 },
    { d: "14 Dis 2016", tema: "krisis", t: "Surat BNM ketiga kepada LTH.", p: 100 },
    { d: "17 Feb 2017", tema: "krisis", t: "Surat BNM: Keperluan Merumus Dasar Rizab.", p: 210 },
    { d: "3 Mac 2017", tema: "krisis", t: "Laporan Roland Berger: model perniagaan LTH berisiko; subsidi haji terlalu tinggi. Laporan tidak dibentangkan kepada Lembaga.", p: 210 },
    { d: "12 Apr 2017", tema: "tadbir", t: "Exco TH Properties meluluskan bonus istimewa RM1.15 juta — tanpa kuasa.", p: 141 },
    { d: "2017", tema: "krisis", t: "Polisi rosot nilai diubah dua kali (70% → 85% → 90%) — rosot nilai 2017 direkod RM1 juta sahaja.", p: 148 },
    { d: "2017", tema: "hibah", t: "Hibah 4.50% + 1.75% — RM3.32 bilion, dibayar walaupun defisit RM4.09 bilion.", p: 130 },
    { d: "7 Feb 2018", tema: "hibah", t: "LTH mengumumkan perubahan kaedah kiraan hibah; ditarik balik selepas bantahan pendeposit. Lebihan RM600 juta terkeluar.", p: 115 },
    { d: "6 & 9 Feb 2018", tema: "tindakan", t: "Dua Mesyuarat Khas Lembaga meluluskan hibah 2017 — kemudian didakwa mengandungi salah nyataan.", p: 196 },
    { d: "23 Apr 2018", tema: "tadbir", t: "Lembaga Pengarah THP Australia meluluskan bonus RM1.05 juta.", p: 142 },
    { d: "9 Mei 2018", tema: "tadbir", t: "PRU14 — kerajaan bertukar; Jamil Khir tamat sebagai Menteri.", p: 56 },
    { d: "Mei 2018", tema: "tadbir", t: "Panel Pelaburan dibubarkan; diganti 'Exco Perniagaan' yang kemudiannya diakui tidak berfungsi.", p: 92 },
    { d: "23 Mei 2018", tema: "tadbir", t: "Abdul Azeez tamat sebagai Pengerusi. EY mengeluarkan Laporan Semakan RAV.", p: 59 },
    { d: "4 Jul 2018", tema: "krisis", t: "Perbincangan KAN dengan Perdana Menteri mengenai Pendapat Berteguran.", p: 133 },
    { d: "10 Jul 2018", tema: "tadbir", t: "Pengurusan baharu: Md Nor Md Yusof (Pengerusi) & Zukri Samat (KPE).", p: 59 },
    { d: "16 Jul 2018", tema: "krisis", t: "KAN mengeluarkan 'Emphasis of Matter' — bukan teguran — ke atas penyata 2017.", p: 133 },
    { d: "Jul–Ogos 2018", tema: "krisis", t: "PwC melaporkan defisit LTH: RM4.09 bilion (2017); 2017 sepatutnya rugi RM1.43 bilion, bukan untung RM3.41 bilion.", p: 147 },
    { d: "20 Ogos 2018", tema: "pelaburan", t: "CEO TH Plantations diletakkan garden leave & meletak jawatan.", p: 188 },
    { d: "30 Nov 2018", tema: "tindakan", t: "Dua laporan polis pertama: Yayasan Tabung Haji & penjualan THIP.", p: 194 },
    { d: "7 Dis 2018", tema: "ujsb", t: "Jemaah Menteri meluluskan Pelan Pemulihan & Penstrukturan LTH; LTH diletakkan di bawah pemantauan BNM mulai 1 Jan 2019.", p: 145 },
    { d: "13 Dis 2018", tema: "tindakan", t: "Laporan polis ketiga: manipulasi laporan tanah Trurich.", p: 195 },
    { d: "14 Dis 2018", tema: "ujsb", t: "UJSB ditubuhkan.", p: 145 },
    { d: "19 Dis 2018", tema: "krisis", t: "Surat KAN kepada PM: menjelaskan mengapa teguran tidak diberikan.", p: 133 },
    { d: "27 Dis 2018", tema: "ujsb", t: "Perjanjian Pemindahan Aset: RM19.9 bilion aset (nilai pasaran RM9.7 bilion) dipindah ke UJSB.", p: 156 },
    { d: "16 Jan 2019", tema: "tindakan", t: "Laporan polis keempat: perisytiharan hibah 2017 melanggar seksyen 22 Akta 535.", p: 196 },
    { d: "2018", tema: "hibah", t: "Hibah jatuh kepada 1.25% sahaja (RM923 juta) — kadar terendah, mencetuskan kemarahan pendeposit.", p: 120 },
    { d: "17 Jan–28 Feb 2019", tema: "krisis", t: "Pemeriksaan BNM ke atas LTH (seksyen 33 Akta BNM 2009).", p: 101 },
    { d: "5 Apr 2019", tema: "ujsb", t: "Jemaah Menteri meluluskan peruntukan RM17.8 bilion untuk kekurangan penebusan Sukuk.", p: 165 },
    { d: "15 Mei 2019", tema: "ujsb", t: "Perjanjian Sukuk (RM27.5 bilion nominal) & ROFR dimeterai.", p: 156 },
    { d: "2019", tema: "hibah", t: "Selepas hibah 1.25% diumumkan, deposit menyusut daripada ~RM73 bilion kepada RM69 bilion — risiko bank run yang dikhuatiri.", p: 122 },
    { d: "Dis 2019", tema: "haji", t: "Akad simpanan ditukar kepada Wakalah — LTH menjadi ejen pendeposit.", p: 109 },
    { d: "2019", tema: "pelaburan", t: "UJSB menelan kerugian RM9.9 bilion (TK2019) — jurang nilai pindahan vs pasaran.", p: 168 },
    { d: "2020", tema: "haji", t: "Tiada penghantaran jemaah haji (Covid-19); begitu juga 2021.", p: 204 },
    { d: "30 Nov 2020", tema: "ujsb", t: "Penebusan awal Sukuk RM200 juta (daripada geran Kerajaan RM500 juta).", p: 166 },
    { d: "14 Ogos 2020", tema: "tadbir", t: "Jemaah Menteri berpandangan perlu menubuhkan Suruhanjaya Siasatan Diraja.", p: 41 },
    { d: "5 Mei 2021", tema: "tadbir", t: "KPE Nik Mohd Hasyudeen ditamatkan tanpa sebab.", p: 82 },
    { d: "2021", tema: "ujsb", t: "Suntikan RM1.5 bilion (Belanjawan 2021) tidak diterima — keutamaan Covid-19.", p: 166 },
    { d: "15 Okt 2021", tema: "tadbir", t: "Pengerusi Md Nor Md Yusof ditamatkan tanpa sebab — kontrak baru disambung setahun sebelumnya.", p: 82 },
    { d: "20 Jan 2022", tema: "tadbir", t: "YDPA melantik 6 Pesuruhjaya RCI.", p: 42 },
    { d: "2022", tema: "haji", t: "Bayaran haji baharu: RM10,980 (B40) / RM12,980 (bukan B40). Kos sebenar RM25,540.", p: 205 },
    { d: "18 Apr 2022", tema: "tadbir", t: "BNM mencadangkan pelaburan LTH diasingkan kepada entiti dikawal BNM/SC.", p: 210 },
    { d: "9 Mei–27 Jun 2022", tema: "tadbir", t: "Prosiding tertutup RCI — 16 saksi memberi keterangan.", p: 48 },
    { d: "19 Jul 2022", tema: "tadbir", t: "Laporan RCI ditandatangani.", p: 237 },
    { d: "30 Ogos 2022", tema: "tadbir", t: "Laporan dipersembahkan kepada YDPA.", p: 5 }
  ];

  /* ------------------------------------------------------------------ *
   * CADANGAN — 25 syor (Bab 4, PDF 230–237 / ms. 192–199)
   * ------------------------------------------------------------------ */
  var CADANGAN = [
    { id: 1, tema: "Undang-undang", t: "Pinda Akta 535: kriteria kepakaran anggota Lembaga, larangan ahli politik aktif, penamatan perlu sebab munasabah, kanunkan 3 jawatankuasa utama, pengiraan hibah ikut penyata beraudit, wujudkan 'Dana Haji', kecualikan LTH daripada Akta 240.", p: 230 },
    { id: 2, tema: "Undang-undang", t: "Bahagikan kuasa Menteri: Menteri Hal Ehwal Agama (urusan haji) + Menteri Kewangan (kewangan, dana & pelaburan). Pelantikan Lembaga & KPE oleh Perdana Menteri atas syor badan penasihat bebas.", p: 231 },
    { id: 3, tema: "Tadbir urus", t: "Hadkan penglibatan anggota Lembaga & pengurusan dalam anak syarikat — elak konflik kepentingan.", p: 232 },
    { id: 4, tema: "Kawal selia", t: "BNM tidak seharusnya mengawal selia LTH; jika perlu, hadkan kepada kawalan rizab & kecairan sahaja.", p: 232 },
    { id: 5, tema: "Kawal selia", t: "Audit penyata kewangan LTH tidak lagi oleh JAN — lantik firma akauntan swasta.", p: 232 },
    { id: 6, tema: "Kewangan", t: "Hibah mesti berasaskan penyata kewangan beraudit — bukan Laporan Proforma atau RAV.", p: 232 },
    { id: 7, tema: "Kewangan", t: "Penyata kewangan patuh penuh piawaian Akta 240 & garis panduan PA 3.1.", p: 233 },
    { id: 8, tema: "Kewangan", t: "Hentikan amalan bonus terlalu tinggi kepada kakitangan.", p: 233 },
    { id: 9, tema: "Tindakan", t: "Dapatkan semula bonus TH Properties yang diberikan tanpa mematuhi peraturan.", p: 233 },
    { id: 10, tema: "Tindakan", t: "Jalankan audit forensik ke atas 13 pelaburan bermasalah (daripada THIP sehingga FGV).", p: 233 },
    { id: 11, tema: "Tindakan", t: "Pihak berkuasa wajib bertindak tegas & segera ke atas setiap laporan polis dan aduan.", p: 234 },
    { id: 12, tema: "Tindakan", t: "Perkemas & segerakan proses tatatertib, termasuk durasi penahanan kerja.", p: 234 },
    { id: 13, tema: "Tindakan", t: "Pantau rapat pertikaian mahkamah & timbang tara; pertingkatkan penyelesaian luar mahkamah.", p: 234 },
    { id: 14, tema: "Syariah", t: "Rujuk isu zakat kepada Muzakarah MKI susulan perubahan akad simpanan.", p: 234 },
    { id: 15, tema: "UJSB", t: "Kerajaan mesti memastikan Pelan Pemulihan 2018 berjaya; Sukuk diperbaiki dengan jaminan Kerajaan — jika LTH gagal, jaminan RM88 bilion terpaksa diaktifkan.", p: 234 },
    { id: 16, tema: "UJSB", t: "Penstrukturan semula Sukuk mestilah boleh diniagakan (tradeable).", p: 235 },
    { id: 17, tema: "UJSB", t: "Sukuk ditawarkan juga kepada institusi kewangan lain, bukan hanya LTH/Kerajaan.", p: 235 },
    { id: 18, tema: "UJSB", t: "Kerajaan memastikan peruntukan RM1.73 bilion setahun untuk penebusan awal Sukuk, seperti dipersetujui Jemaah Menteri.", p: 235 },
    { id: 19, tema: "UJSB", t: "Galakkan UJSB menebus awal Sukuk hasil pelupusan aset.", p: 235 },
    { id: 20, tema: "Haji", t: "Ubah dasar deposit/bayaran/HAFIS: deposit minimum RM1,300 → RM12,980; pengeluaran besar perlu notis sebulan; subsidi hanya untuk yang memerlukan.", p: 235 },
    { id: 21, tema: "Haji", t: "Rancang membawa lebih ramai jemaah; gunakan sepenuhnya kuota tambahan Arab Saudi.", p: 236 },
    { id: 22, tema: "Haji", t: "Naikkan bayaran pendaftaran Muassasah RM1,300 → RM12,980 — memendekkan tempoh menunggu daripada 130 tahun kepada 33 tahun.", p: 236 },
    { id: 23, tema: "Pelaburan", t: "Fungsi pelaburan dijalankan bebas & profesional; kekal dalam entiti yang sama (subsidi silang); wujudkan jabatan 'Dana Haji' dikawal selia Suruhanjaya Sekuriti.", p: 236 },
    { id: 24, tema: "Pelaburan", t: "Fokus portfolio pengurusan dana; elak pelaburan 'strategik' berisiko tinggi.", p: 236 },
    { id: 25, tema: "Tadbir urus", t: "Kerajaan memperkukuh model perniagaan & pelaburan LTH secara menyeluruh — pengurusan profesional tanpa campur tangan politik.", p: 237 }
  ];

  /* ------------------------------------------------------------------ *
   * PERCANGGAHAN / NOTA INTEGRITI DATA
   * ------------------------------------------------------------------ */
  var PERCANGGAHAN = [
    { isu: "Kos haji 'asal'", versi: "Ringkasan Eksekutif: RM15,553 (2013); Bab 3.16: RM15,555 (2003)", nota: "Dua angka & tahun berbeza dalam laporan yang sama.", p: 23 },
    { isu: "Kos haji 2030", versi: "Teks 3.16.1: RM35,000; Jadual 3.16.2: RM37,729", nota: "Dashboard menggunakan angka jadual.", p: 203 },
    { isu: "Tempoh menunggu giliran haji", versi: "Perenggan 3.16.17: 135 → 33 tahun; Syor 4.4.22: 130 → 33 tahun", nota: "Dashboard memaparkan ~130 tahun dengan nota.", p: 208 },
    { isu: "HAFIS 2022 sebagai % kos", versi: "Teks 3.16.8: 'hampir 57%'; Jadual 3.16.8: 49.2%", nota: "Perbezaan mungkin kerana kaedah kiraan; dashboard menggunakan jadual.", p: 205 },
    { isu: "Liabiliti 2017", versi: "Jadual PwC: RM71.086 bilion; kenyataan KAN: RM74.409 bilion", nota: "Kemungkinan kaedah pengiraan berbeza (termasuk deposit kena bayar serta-merta).", p: 147 },
    { isu: "Tempoh Pengerusi Abdul Azeez", versi: "Perenggan 2.2.15: hingga 23 Mei 2018; perenggan 3.3.2(a): hingga 1 Julai 2018", nota: "Dashboard menggunakan 23 Mei 2018.", p: 59 },
    { isu: "Teks OCR", versi: "Sumber ialah hasil OCR — contohnya '9096' = 90%, 'Akta 536' = Akta 535", nota: "Angka yang jelas ralat OCR diperbetulkan dan diberi nota; angka lain dipetik apa adanya.", p: null }
  ];

  /* ------------------------------------------------------------------ *
   * GLOSARI — istilah teknikal dalam bahasa mudah
   * ------------------------------------------------------------------ */
  var GLOSARI = [
    { term: "Hibah", def: "Agihan keuntungan tahunan LTH kepada pendeposit — seperti 'dividen' simpanan. Di bawah akad Wadi'ah, pemberian ini atas budi bicara LTH, bukan kadar tetap." },
    { term: "Rosot nilai", def: "Pengakuan dalam akaun bahawa nilai sesuatu pelaburan telah jatuh. Jika saham dibeli RM1,000 kini bernilai RM300, rosot nilai RM700 perlu direkod sebagai kerugian." },
    { term: "RAV (Realisable Asset Value)", def: "Nilai aset yang 'boleh direalisasikan' — kaedah kiraan ciptaan pengurusan LTH yang menaikkan nilai aset melebihi angka penyata beraudit. Tiada piawaian pasaran; Suruhanjaya menolak penggunaannya sebagai asas hibah." },
    { term: "Seksyen 22 Akta 535", def: "Peruntukan undang-undang: LTH hanya boleh mengisytiharkan hibah jika asetnya tidak kurang daripada liabiliti (termasuk wang pendeposit). Inilah syarat yang dilanggar pada 2014–2017." },
    { term: "Sijil Audit Bersih", def: "Pengesahan juruaudit bahawa penyata kewangan 'benar dan saksama'. Tanpanya, LTH sepatutnya tidak boleh mengisytiharkan hibah." },
    { term: "Emphasis of Matter", def: "Nota perhatian dalam laporan audit yang menarik perhatian kepada isu penting — tetapi bukan teguran. KAN menggunakannya pada 2017 bagi mengelakkan Pendapat Berteguran." },
    { term: "Sukuk", def: "Bon patuh syariah. LTH melanggan Sukuk UJSB RM19.6 bilion (nilai nominal RM27.5 bilion) sebagai bayaran pemindahan aset — kupon sifar, dibayar sekaligus apabila matang." },
    { term: "Kupon sifar", def: "Sukuk yang tidak membayar faedah/keuntungan berkala — semua pulangan dibayar sekaligus pada tarikh matang. Maksudnya tiada aliran tunai tahunan untuk LTH." },
    { term: "UJSB", def: "Urusharta Jamaah Sdn. Bhd. — syarikat tujuan khas milik Menteri Kewangan yang mengambil alih aset lemah LTH pada Disember 2018, mengikut model Danaharta (1998)." },
    { term: "Bank run", def: "Keadaan apabila ramai pendeposit mengeluarkan wang serentak kerana hilang kepercayaan — boleh meruntuhkan institusi walaupun ia kukuh." },
    { term: "HAFIS", def: "Hajj Financial Support — subsidi haji yang ditanggung LTH bagi setiap jemaah Muassasah, dibayar daripada keuntungan pelaburan wang pendeposit." },
    { term: "Muassasah", def: "Skim haji biasa yang diuruskan LTH untuk jemaah biasa — berbanding pakej swasta yang lebih mahal." },
    { term: "MFRS / FRS", def: "Piawaian pelaporan kewangan Malaysia — peraturan rasmi cara syarikat merekod untung, rugi, aset dan liabiliti." },
    { term: "AFS (Available for Sale)", def: "Kategori pelaburan yang dipegang untuk dijual suatu masa nanti — perubahan nilainya perlu diiktiraf mengikut piawaian." },
    { term: "Deferred income", def: "Pendapatan direkod dalam akaun tetapi wangnya belum diterima. Akruan Sukuk UJSB RM840 juta/tahun direkod sebagai pendapatan LTH walaupun tiada tunai masuk." },
    { term: "Wadi'ah Yad Dhamanah", def: "Akad simpanan Islam: pendeposit 'menitipkan' wang dan LTH menjamin pulangannya. Digunakan LTH mulai 2016; menukar hubungan LTH–pendeposit kepada peminjam–pemberi pinjaman." },
    { term: "Wakalah", def: "Akad Islam di mana LTH bertindak sebagai ejen yang menguruskan wang pendeposit. Digunakan mulai Disember 2019." },
    { term: "Letter of Comfort", def: "Surat sokongan kewangan — bukan jaminan undang-undang. Sokongan MOF kepada UJSB hanya setakat ini, maksudnya Kerajaan tidak wajib membayar jika UJSB gagal." },
    { term: "ROFR (Right of First Refusal)", def: "Hak keutamaan LTH untuk membeli semula aset yang dipindahkan kepada UJSB, jika UJSB ingin menjualnya." },
    { term: "NDPE", def: "No Deforestation, No Peat, No Exploitation — polisi lestari industri sawit. Pelanggarannya menyebabkan ladang DSSB tidak dapat menjual hasil kepada pembeli utama." },
    { term: "Istito'ah", def: "Prinsip syariah: kewajipan haji hanya bagi yang mampu. Suruhanjaya mencadangkan subsidi haji dipandukan semula kepada prinsip ini." }
  ];

  /* ------------------------------------------------------------------ */
  return {
    SRC_MD: SRC_MD,
    META: META,
    HEADLINE: HEADLINE,
    PWC: PWC,
    RESTATE2017: RESTATE2017,
    RAV2017: RAV2017,
    IMPAIRMENT: IMPAIRMENT,
    AUDIT: AUDIT,
    HIBAH_KADAR: HIBAH_KADAR,
    HIBAH_BAYARAN: HIBAH_BAYARAN,
    HIBAH_NOTA: HIBAH_NOTA,
    DEPOSIT: DEPOSIT,
    PELABURAN: PELABURAN,
    PELABURAN_NOTA: PELABURAN_NOTA,
    UJSB: UJSB,
    HAFIS: HAFIS,
    BONUS: BONUS,
    TADBIR: TADBIR,
    TINDAKAN: TINDAKAN,
    KRONOLOGI: KRONOLOGI,
    CADANGAN: CADANGAN,
    PERCANGGAHAN: PERCANGGAHAN,
    GLOSARI: GLOSARI
  };
})();
