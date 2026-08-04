/* =====================================================================
   DATA — Laporan Suruhanjaya Siasatan Diraja Tabung Haji (19 Julai 2022)
   Setiap angka boleh dijejak balik ke muka surat PDF dalam laporan.
   Konvensi kelas data: F=fakta, T=terbitan, A=anggaran, S=simulasi
   ===================================================================== */

window.RCI = {
  REPO: "https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md",
  LAPORAN_TARIKH: "19 Julai 2022",
  SIASATAN_TEMPOH: "20 Januari 2022 – 19 Julai 2022",
  SKOP: "Pengurusan & operasi LTH 2014–2020",

  /* Pautan ke muka surat PDF laporan */
  SRC: function (ms) {
    return "https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md#pdf-page-" + ms;
  },

  /* ---------- Glosari ringkas ---------- */
  glosari: {
    "Hibah": "Pulangan atau agihan keuntungan yang diagihkan oleh LTH kepada pendeposit, berdasarkan konsep simpanan Islam.",
    "RAV": "Realisable Asset Value — Nilai Aset Yang Boleh Direalisasikan. Anggaran nilai yang boleh diperoleh jika aset dijual, digunakan oleh LTH untuk asas pengiraan hibah.",
    "HAFIS": "Hajj Financial Support — subsidi yang ditanggung LTH untuk menampung perbezaan antara kos haji sebenar dan bayaran yang dikenakan kepada jemaah.",
    "MFRS": "Malaysian Financial Reporting Standards — piawaian perakaunan yang sepatutnya dipatuhi. LTH didapati tidak melaksanakannya sepenuhnya pada 2017.",
    "Sukuk": "Instrumen kewangan Islam seperti bon. Sukuk UJSB ialah sihutang jangka panjang yang diterbitkan UJSB untuk membayar aset LTH.",
    "UJSB": "Urusharta Jamaah Sdn. Bhd. — syarikat milik penuh Menteri Kewangan Diperbadankan yang menerima pemindahan aset kurang berdaya saing daripada LTH pada Disember 2018.",
    "BNM": "Bank Negara Malaysia — bank pusat Malaysia. BNM memantau LTH sejak 2014 tetapi tidak mengawal selia secara formal.",
    "JAN/KAN": "Jabatan Audit Negara / Ketua Audit Negara — mengaudit penyata kewangan badan berkanun. KAN memberi Sijil Audit Bersih untuk 2014-2017 dengan 'Emphasis of Matter' pada 2017.",
    "Akta 535": "Akta Tabung Haji 1995 — undang-undang utama yang mentadbir LTH. RCI mengesyorkan pindaan besar ke atas akta ini.",
    "Akad": "Kontrak atau persetujuan dalam transaksi Islam. LTH menukar akad simpanan beberapa kali: Mudarabah (1979) → Wadi'ah Yad Dhamanah (2016) → Wakalah (2019).",
    "Mudarabah": "Akad perkongsian untung-rugi antara pemilik modal dan pengusaha. LTH dahulu menggunakan akad ini untuk simpanan pendeposit.",
    "Wadi'ah Yad Dhamanah": "Akad simpanan di mana penyimpan bertanggungjawab menjaga harta tetapi tidak menanggung rugi. LTH menukar kepada akad ini pada 2016.",
    "FRSIC 14": "Financial Reporting Standards Implementation Committee — garis panduan untuk menentukan bila pelaburan perlu dirosot nilai (20% penurunan atau 12 bulan berturut-turut).",
    "Impairment": "Rosot nilai — pengiktirafan kehilangan nilai aset dalam penyata kewangan. LTH didapati tidak merekodkan rosot nilai yang sepatutnya pada 2017.",
    "Pendapat Berteguran": "Pendapat audit yang mengandungi teguran — petanda kewangan tidak memberi gambaran yang benar dan saksama. KAN dipertimbangkan memberi pendapat ini kepada 2017 tetapi akhirnya memberi 'Pendapat Tanpa Teguran dengan Emphasis of Matter'.",
    "Emphasis of Matter (EoM)": "Perkara yang ditekankan dalam laporan audit tanpa menjejaskan pendapat keseluruhan. KAN menggunakan ini untuk 2017 walaupun terdapat isu material.",
    "Tonggak Ekonomi Ummah": "Visi tambahan LTH yang meluaskan peranannya kepada pelaburan hartanah, perladangan dan sebagainya. RCI mendapati visi ini menyebabkan LTH terbabit dalam pelaburan yang melampaui kepakarannya.",
    "Cross-subsidy": "Subsidi silang — apabila keuntungan daripada satu aktiviti digunakan untuk menampung aktiviti lain. HAFIS dibiayai melalui keuntungan pelaburan LTH.",
    "ROFR": "Right of First Refusal — Hak Penolakan Pertama. LTH mempunyai hak untuk mengambil semula aset yang dipindahkan ke UJSB sekiranya UJSB ingin melupuskannya.",
    "PwC": "Pricewaterhouse Coopers — firma audit yang dilantik LTH untuk membuat financial review 2014-2017. Penemuan mereka menjadi asas kepada siasatan RCI.",
    "EY": "Ernst & Young — firma yang menyediakan Proforma Financial Information / RAV Report untuk LTH.",
    "RB": "Roland Berger — perunding strategi yang menyediakan Strategic Business Plan Review.",
    "Panel Pelaburan": "Jawatankuasa Lembaga yang bertanggungjawab meluluskan pelaburan LTH. Dibubarkan pada 2018 dan diganti dengan jawatankuasa lain yang tidak berfungsi dengan baik.",
    "JPS": "Jawatankuasa Penasihat Syariah — jawatankuasa yang menasihati LTH berkaitan pematuhan Syariah. RCI mengesyorkan ianya dikanunkan dalam Akta 535.",
    "Dana Haji": "Jabatan dicadangkan oleh RCI untuk menggantikan fungsi pelaburan LTH, dikawal selia oleh Suruhanjaya Sekuriti Malaysia.",
    "Istito'ah": "Keupayaan dari segi kesihatan dan kewangan untuk menunaikan haji. RCI mencadangkan subsidi hanya untuk mereka yang memerlukan."
  },

  /* ===================================================================
     KESAN KESELURUHAN — KPI utama untuk paparan ringkas
     =================================================================== */
  kpi: {
    deposit_semasa: { nilai: 88, unit: "bilion", tarikh: "21 Mei 2022", ms: 165, kelas: "F",
      konteks: "Deposit pendeposit LTH mengikut Penyata Kewangan. Kerajaan menjamin semua deposit di bawah Seksyen 24 Akta 535." },
    deposit_puncak: { nilai: 73, unit: "bilion", tarikh: "Sebelum pengumuman hibah 1.25%", ms: 81, kelas: "F",
      konteks: "Deposit tertinggi sebelum pengumuman agihan keuntungan rendah pada 2019." },
    deposit_2019: { nilai: 69, unit: "bilion", tarikh: "Akhir 2019", ms: 81, kelas: "F",
      konteks: "Deposit susut selepas pengumuman hibah 1.25%. Deflasi ~RM4 bilion." },
    jurang_2017: { nilai: -4093, unit: "juta", tarikh: "Selepas hibah 2017", ms: 112, kelas: "F",
      konteks: "Jurang aset-liabiliti selepas agihan hibah, menurut analisis PwC yang dipetik RCI." },
    untung_dilaporkan: { nilai: 3412, unit: "juta", tarikh: "2017", ms: 149, kelas: "F",
      konteks: "Keuntungan yang dilaporkan dalam Penyata Kewangan LTH 2017." },
    untung_dilaras: { nilai: -1433, unit: "juta", tarikh: "2017", ms: 149, kelas: "F",
      konteks: "Kerugian bersih terlaras jika MFRS diguna pakai sepenuhnya, menurut analisis PwC." },
    hafis_2014: { nilai: 106, unit: "juta", tarikh: "2014", ms: 96, kelas: "F",
      konteks: "Jumlah subsidi HAFIS yang ditanggung LTH pada 2014." },
    hafis_2030: { nilai: 742.47, unit: "juta", tarikh: "Unjuran 2030", ms: 96, kelas: "A",
      konteks: "Unjuran HAFIS kepada 65% daripada kos haji jika bayaran jemaah dikekalkan RM12,980." },
    aset_ujsb: { nilai: 19.9, unit: "bilion", tarikh: "27 Dis 2018", ms: 159, kelas: "F",
      konteks: "Nilai pindahan 106 saham tersenarai, 1 ladang, 29 hartanah kepada UJSB." },
    nilai_pasaran_ujsb: { nilai: 9.7, unit: "bilion", tarikh: "27 Dis 2018", ms: 159, kelas: "F",
      konteks: "Nilai pasaran aset pada tarikh pemindahan. Premium RM10.2 bilion." },
    sukuk_total: { nilai: 27.5, unit: "bilion", tarikh: "Sukuk Siri 1+2", ms: 159, kelas: "F",
      konteks: "Nilai nominal matang Sukuk UJSB. LTH layak terima RM840j setahun sebagai deferred income." },
    peruntukan_kerajaan: { nilai: 17.8, unit: "bilion", tarikh: "RMK 11-13", ms: 159, kelas: "F",
      konteks: "Peruntukan kerajaan untuk menampung shortfall penebusan Sukuk UJSB." },
    rosot_tidak_direkod: { nilai: 227.81, unit: "juta", tarikh: "2017", ms: 87, kelas: "F",
      konteks: "Rosot nilai yang tidak direkodkan LTH pada 2017 untuk 3 subsidiari dan 3 syarikat bersekutu." },
    hibah_total_2014_2017: { nilai: 12652, unit: "juta", tarikh: "2014-2017", ms: 74, kelas: "T",
      konteks: "Jumlah agihan hibah (tahunan + haji) sepanjang 4 tahun sebelum pelan pemulihan. Dikira daripada data terbitan." },
    pelaburan_bermasalah: { nilai: 14, unit: "kes", tarikh: "Untuk diaudit forensik", ms: 199, kelas: "F",
      konteks: "Bilangan pelaburan yang disyorkan oleh RCI untuk diaudit forensik." },
    tempoh_guaransi: { nilai: "Seksyen 24 Akta 535", unit: "", tarikh: "Kekal", ms: 165, kelas: "F",
      konteks: "Jaminan Kerajaan Persekutuan ke atas semua deposit LTH. Pencetus obligasi jika LTH gagal." }
  },

  /* ===================================================================
     KEWANGAN — Penyata Kewangan 2013-2017 (mengikut PwC Financial Review)
     =================================================================== */
  kewangan: {
    /* RM juta */
    ringkasan_pwc: [
      { tahun: 2013, aset: 48778, liabiliti: 43696, surplus_pre: 5082, hibah: 2632, surplus_post: 2450 },
      { tahun: 2014, aset: 54751, liabiliti: 51866, surplus_pre: 2885, hibah: 3237, surplus_post: -352 },
      { tahun: 2015, aset: 60196, liabiliti: 60062, surplus_pre: 134, hibah: 3220, surplus_post: -3086 },
      { tahun: 2016, aset: 64321, liabiliti: 65581, surplus_pre: -1260, hibah: 2871, surplus_post: -4131 },
      { tahun: 2017, aset: 70317, liabiliti: 71086, surplus_pre: -769, hibah: 3324, surplus_post: -4093 }
    ],
    /* Hibah tahunan + haji, RM '000 */
    hibah: [
      { tahun: 2014, kadar_tahunan: 6.25, kadar_haji: 2.00, tahunan: 2988053, haji: 249143, jumlah: 3237196 },
      { tahun: 2015, kadar_tahunan: 5.00, kadar_haji: 3.00, tahunan: 2807369, haji: 413005, jumlah: 3220374 },
      { tahun: 2016, kadar_tahunan: 4.25, kadar_haji: 1.50, tahunan: 2645625, haji: 225197, jumlah: 2870822 },
      { tahun: 2017, kadar_tahunan: 4.50, kadar_haji: 1.75, tahunan: 3042184, haji: 281557, jumlah: 3323741 },
      { tahun: 2018, kadar_tahunan: 1.25, kadar_haji: 0, tahunan: 922959, haji: 0, jumlah: 922959 },
      { tahun: 2019, kadar_tahunan: 3.05, kadar_haji: 0, tahunan: 2140538, haji: 0, jumlah: 2140538 },
      { tahun: 2020, kadar_tahunan: 3.10, kadar_haji: 0, tahunan: 2242141, haji: 0, jumlah: 2242141 }
    ],
    /* Untung bersih seperti yang dilaporkan vs pelarasan PwC */
    akaun_2017: {
      dilaporkan_rm_juta: 3412,
      pelarasan_pwc_rm_juta: -1433,
      beza_rm_juta: 4845,
      komponen_pelarasan: [
        { item: "Keuntungan yang dilaporkan", nilai: 3412, jenis: "t" },
        { item: "Rosot nilai AFS ekuiti", nilai: -4258, jenis: "d" },
        { item: "Rosot nilai AFS sekuriti hutang", nilai: -7, jenis: "d" },
        { item: "Pelarasan lain (subsidiari dll.)", nilai: -580, jenis: "d" },
        { item: "Kerugian terlaras", nilai: -1433, jenis: "t" }
      ],
      ms: 149
    },
    /* Polisi rosot nilai yang bertukar-tukar */
    perubahan_polisi: [
      { fasa: "2014", label: "Tahap 1: 20-30% (3 bulan), Tahap 2: 30-50% (6-12 bulan)" },
      { fasa: "2015", label: "Tahap 1: 20-30%, Tahap 2: 30-50%" },
      { fasa: "2016", label: "Tahap 1: 30-50% (12 bulan), Tahap 2: 50% ke atas" },
      { fasa: "2017 · awal", label: "Tahap 1: 30-50% (12 bulan), Tahap 2: 50% ke atas — TIDAK DIUBAH sehingga Mei 2017" },
      { fasa: "2017 · Mei", label: "Diubah kepada 70% penurunan, 18 bulan — bertentangan FRS 139" },
      { fasa: "2017 · Okt", label: "Diubah kepada 85% (FRSIC 14) dan 90% — selepas tekanan rugi" }
    ],
    /* Rizab & penggunaan */
    rizab: {
      rizab_berkanun: 0.19, /* pindahan tahunan */
      rpk_kadar: 5, /* % daripada aset bersih */
      rpk_sasaran: 3500, /* RM juta */
      rpk_pindahan: 2 /* % keuntungan selepas zakat */
    },
    /* Hutang belum bayar (akruan) */
    hutang: {
      tertunggak: 110, /* RM juta — sumbangan belum dipulangkan, AJK Lembaga */
      deposit_pertama: 0, /* tiada apa-apa disiar */
      tunggakan_haji_2013: { rm_juta: 59, per_jemaah: 500, ms: 24 }
    }
  },

  /* ===================================================================
     HAFIS / HAJJ — Kos, subsidi, unjuran
     =================================================================== */
  hafis: {
    /* Data sejarah fakta 2014-2019 */
    sejarah: [
      { tahun: 2014, kos: 16155, bayaran: 9980, hafis_per: 6175, hafis_pct: 38.2, jemaah: 17176, total: 106 },
      { tahun: 2015, kos: 17270, bayaran: 9980, hafis_per: 7290, hafis_pct: 42.2, jemaah: 18520, total: 135 },
      { tahun: 2016, kos: 18890, bayaran: 9980, hafis_per: 8910, hafis_pct: 47.2, jemaah: 17960, total: 160 },
      { tahun: 2017, kos: 19550, bayaran: 9980, hafis_per: 9570, hafis_pct: 49.0, jemaah: 31180, total: 298 },
      { tahun: 2018, kos: 22450, bayaran: 9980, hafis_per: 12470, hafis_pct: 55.5, jemaah: 25220, total: 314 },
      { tahun: 2019, kos: 22900, bayaran: 9980, hafis_per: 12920, hafis_pct: 56.4, jemaah: 23180, total: 299 }
    ],
    /* Unjuran 2022-2030 oleh RCI */
    unjuran: [
      { tahun: 2022, kos: 25540, bayaran: 12980, hafis_per: 12560, hafis_pct: 49.2, jemaah: 30000, total: 376.8 },
      { tahun: 2023, kos: 26280, bayaran: 12980, hafis_per: 13300, hafis_pct: 50.6, jemaah: 30000, total: 399.0 },
      { tahun: 2024, kos: 28160, bayaran: 12980, hafis_per: 15180, hafis_pct: 53.9, jemaah: 30000, total: 455.4 },
      { tahun: 2025, kos: 29570, bayaran: 12980, hafis_per: 16590, hafis_pct: 56.1, jemaah: 30000, total: 497.7 },
      { tahun: 2026, kos: 31040, bayaran: 12980, hafis_per: 18060, hafis_pct: 58.2, jemaah: 30000, total: 541.8 },
      { tahun: 2027, kos: 32592, bayaran: 12980, hafis_per: 19612, hafis_pct: 60.2, jemaah: 30000, total: 588.4 },
      { tahun: 2028, kos: 34221, bayaran: 12980, hafis_per: 21241, hafis_pct: 62.1, jemaah: 30000, total: 637.2 },
      { tahun: 2029, kos: 35932, bayaran: 12980, hafis_per: 22952, hafis_pct: 63.9, jemaah: 30000, total: 688.6 },
      { tahun: 2030, kos: 37729, bayaran: 12980, hafis_per: 24749, hafis_pct: 65.6, jemaah: 30000, total: 742.5 }
    ],
    /* Model deposit dan bilangan jemaah */
    deposit: {
      minima_sifar_rm: 60, /* bilion - minima untuk HAFIS semasa */
      deposit_2017: 70.3,
      deposit_sebelum_hibah_1_25: 73,
      deposit_akhir_2019: 69,
      deposit_2020: 76,
      deposit_2022_mei: 88,
      bil_pendeposit_2017: 9.2, /* juta */
      bil_pendeposit_2022: 8.6, /* juta */
      bil_pendeposit_total_1963_2021: 1.46 /* juta jemaah diurus */
    },
    /* Kepekatan deposit */
    kepekatan: {
      top_5pct_punya: 75, /* % daripada deposit */
      bottom_65pct_punya: 0.001, /* RM2000 ke bawah */
      risiko_2019_penarikan: 4 /* bilion selepas hibah rendah */
    },
    /* Kos haji 2013 vs 2022 */
    kos_haji_2013: { rm: 15553, ms: 95 },
    kos_haji_2022: { rm: 25540, ms: 95 },
    kadar_dua_lapis: {
      B40: 10980,
      bukan_B40: 12980
    },
    /* Masa menunggu */
    masa_menunggu: {
      semasa: 130,
      unjuran_RM12980: 33,
      unjuran_RM9970: 99
    },
    /* Kuota */
    kuota: { sekarang: 30000, sasaran_2030: 60000 },
    /* Bukti kenaikan */
    notakaki: "Kadar bayaran jemaah dikekalkan RM9,980 selama 13 tahun (2009-2021) walaupun kos sebenar meningkat setiap tahun."
  },

  /* ===================================================================
     UJSB / SUKUK / PEMULIHAN
     =================================================================== */
  ujsb: {
    /* Aset dipindahkan */
    pemindahan: [
      { kategori: "Hartanah & tanah", unit: 29, nilai_pindahan: 2247, nilai_pasaran: 1411, nilai_buku: 1411, format: "bilion" },
      { kategori: "Syarikat perladangan", unit: 1, nilai_pindahan: 802, nilai_pasaran: 718, nilai_buku: 718, format: "juta" },
      { kategori: "Ekuiti tersenarai (Bursa)", unit: 106, nilai_pindahan: 16851, nilai_pasaran: 7600, nilai_buku: 16852, format: "juta" },
      { kategori: "JUMLAH", unit: 136, nilai_pindahan: 19900, nilai_pasaran: 9729, nilai_buku: 18981, format: "juta", jumlah: true }
    ],
    /* Premium = pindahan - pasaran */
    premium: {
      nilai: 10171,
      format: "juta",
      penjelasan: "Perbezaan nilai pindahan dengan nilai pasaran pada tarikh pemindahan."
    },
    /* Hartanah terperinci */
    hartanah: [
      { jenis: "Tanah", luas_kps: 1353361, pindah: 627, pasaran: 401 },
      { jenis: "Menara pejabat", luas_kps: 354021, pindah: 737, pasaran: 325 },
      { jenis: "Lot kedai", luas_kps: 120062, pindah: 46, pasaran: 33 },
      { jenis: "Hotel", luas_kps: 354134, pindah: 804, pasaran: 424 },
      { jenis: "Perindustrian", luas_kps: 35019, pindah: 32, pasaran: 19 },
      { jenis: "JUMLAH", luas_kps: 2216597, pindah: 2247, pasaran: 1203, jumlah: true }
    ],
    /* Sukuk */
    sukuk: {
      siri_1: { nominal: 10000, matang_nilai: 13200, tempoh: 7, yield: 4.05, matang_tahun: 2026 },
      siri_2: { nominal: 9600, matang_nilai: 14300, tempoh: 10, yield: 4.10, matang_tahun: 2029 },
      tunai: 300,
      deferred_annual: 840,
      cumulative_2021: 2100,
      sumbangan_kepada_pendapatan: 26, /* % */
      sumbangan_kepada_hibah: 31, /* % */
      peratus_aset_LTH: 31
    },
    /* Peruntukan kerajaan */
    peruntukan: {
      RMK11_2020: 500,
      RMK12_13_purata_setahun: 1730,
      RMK12_13_jumlah: 17300
    },
    /* ROFR — Hak Penolakan Pertama yang telah digunakan */
    rofr: [
      { tarikh: "2020-03-24", ticker: "WENG MK", syarikat: "WZ Satu", saham: 25999115, harga_rofr: 0.090, harga_pasaran: 0.064, premium_pct: 40.6 },
      { tarikh: "2020-03-25", ticker: "EAST MK", syarikat: "Eastern & Oriental", saham: 46400000, harga_rofr: 0.365, harga_pasaran: 0.335, premium_pct: 9.0 },
      { tarikh: "2020-03-31", ticker: "WENG MK", syarikat: "WZ Satu", saham: 16570923, harga_rofr: 0.085, harga_pasaran: 0.075, premium_pct: 13.3 },
      { tarikh: "2020-04-02", ticker: "WCTHG MK", syarikat: "WCT Holdings", saham: 42477625, harga_rofr: 0.400, harga_pasaran: 0.377, premium_pct: 6.1 },
      { tarikh: "2020-05-06", ticker: "KSL MK", syarikat: "KSL Holdings", saham: 71800000, harga_rofr: 0.610, harga_pasaran: 0.630, premium_pct: -3.2 },
      { tarikh: "2020-05-21", ticker: "KSL MK", syarikat: "KSL Holdings", saham: 35900000, harga_rofr: 0.580, harga_pasaran: 0.605, premium_pct: -4.1 },
      { tarikh: "2020-05-29", ticker: "HAPL MK", syarikat: "Hap Seng Plantations", saham: 66074500, harga_rofr: 1.650, harga_pasaran: 1.570, premium_pct: 5.1 },
      { tarikh: "2020-12-09", ticker: "FGV MK", syarikat: "FGV Holdings", saham: 283710100, harga_rofr: 1.300, harga_pasaran: 1.270, premium_pct: 2.4 },
      { tarikh: "2022-03-14", ticker: "ILB MK", syarikat: "Integrated Logistics", saham: 20500000, harga_rofr: 0.380, harga_pasaran: 0.365, premium_pct: 4.1 }
    ],
    /* Pelupusan */
    pelupusan: {
      hartanah_terjual: 1,
      hartanah_lokasi: "Mukim Sungai Segamat, Johor",
      hartanah_harga: 920000,
      ekuiti_dilupuskan: 75,
      ekuiti_baru_dilabur: 329,
      kerugian_2019_juta: 9900,
      penjanaan_setahun_juta: { min: 200, max: 300 }
    },
    /* Komitmen Jaminan Kerajaan */
    komitmen_jaminan: [
      { entiti: "DanaInfra Nasional Berhad", rm_2020: 72320, rm_2021: 76020, pct_2020: 38.9, pct_2021: 39.9 },
      { entiti: "Prasarana Malaysia Berhad", rm_2020: 38914, rm_2021: 38914, pct_2020: 21.0, pct_2021: 20.4 },
      { entiti: "Malaysia Rail Link Sdn. Bhd.", rm_2020: 21530, rm_2021: 23177, pct_2020: 11.6, pct_2021: 12.2 },
      { entiti: "Urusharta Jamaah Sdn. Bhd.", rm_2020: 20683, rm_2021: 21097, pct_2020: 11.1, pct_2021: 11.1, sorot: true },
      { entiti: "Suria Strategic Energy Resources", rm_2020: 6951, rm_2021: 7276, pct_2020: 3.7, pct_2021: 3.8 },
      { entiti: "GovCo Holdings Berhad", rm_2020: 7200, rm_2021: 5700, pct_2020: 3.9, pct_2021: 3.0 },
      { entiti: "Jambatan Kedua Sdn. Bhd.", rm_2020: 5528, rm_2021: 5514, pct_2020: 3.0, pct_2021: 2.9 },
      { entiti: "Turus Pesawat Sdn. Bhd.", rm_2020: 5310, rm_2021: 5310, pct_2020: 2.9, pct_2021: 2.8 },
      { entiti: "MKD Kencana Sdn. Bhd.", rm_2020: 3500, rm_2021: 4500, pct_2020: 1.9, pct_2021: 2.4 },
      { entiti: "SRC Kencana Sdn. Bhd.", rm_2020: 2485, rm_2021: 1785, pct_2020: 1.4, pct_2021: 0.9 }
    ],
    /* Bluechip saham mewah — kerugian sehingga 31 Dis 2018 */
    bluechip: [
      { ticker: "Axiata", pindah: 6.00, pasaran: 3.63, pindah_total: 1423, pasaran_total: 932, drop: 39.5 },
      { ticker: "Maxis", pindah: 6.84, pasaran: 5.43, pindah_total: 879, pasaran_total: 681, drop: 20.6 },
      { ticker: "MISC", pindah: 7.43, pasaran: 6.15, pindah_total: 487, pasaran_total: 439, drop: 17.2 },
      { ticker: "Digi", pindah: 5.13, pasaran: 4.24, pindah_total: 576, pasaran_total: 500, drop: 17.3 },
      { ticker: "TM", pindah: 5.96, pasaran: 2.33, pindah_total: 241, pasaran_total: 108, drop: 60.9 }
    ]
  },

  /* ===================================================================
     14 PELABURAN UNTUK AUDIT FORENSIK
     =================================================================== */
  pelaburan_bermasalah: [
    {
      id: "thip",
      nama: "PT TH Indo Plantations (THIP)",
      lokasi: "Luar negara",
      negara: "Indonesia",
      sektor: "Perladangan",
      ringkasan_kerugian: "USD100j pengurangan harga jual",
      butiran: "Tanah seluas ~83,000 hektar. Harga jual asal USD910j dikurangkan kepada USD810j selepas LTH memberi pendahuluan USD178.6j kepada pembeli.",
      nilai: { nilai: 100, mata: "USD juta", label: "Pengurangan harga" },
      status: "Laporan polis; audit forensik; siasatan berjalan",
      ms: 139
    },
    {
      id: "emrail",
      nama: "Emrail Sdn. Bhd.",
      lokasi: "Malaysia",
      negara: "Malaysia",
      sektor: "Pengangkutan rel",
      ringkasan_kerugian: "RM19.3j rosot nilai",
      butiran: "Pelaburan asal RM20.17j. Hak jual balik RM20.3j tetapi hanya RM2j diterima sebelum pertikaian timbang tara AIAC.",
      nilai: { nilai: 19.3, mata: "RM juta", label: "Rosot nilai" },
      status: "Timbang tara AIAC berjalan",
      ms: 140
    },
    {
      id: "wellspring",
      nama: "Wellspring Worldwide Limited",
      lokasi: "Luar negara",
      negara: "BVI",
      sektor: "Khas",
      ringkasan_kerugian: "RM19.03j rosot nilai",
      butiran: "Pelaburan RM18.4j. Put option RM19.03j; tiada bayaran. Notis kebangkrapan dibenarkan 25 Januari 2022.",
      nilai: { nilai: 19.03, mata: "RM juta", label: "Rosot nilai" },
      status: "Notis kebangkrapan",
      ms: 141
    },
    {
      id: "deru",
      nama: "Deru Semangat Sdn. Bhd. (DSSB)",
      lokasi: "Malaysia",
      negara: "Malaysia",
      sektor: "Pelaburan strategik",
      ringkasan_kerugian: "RM257j dilupus",
      butiran: "JV dengan KDYMM Sultan Pahang. Komitmen RM526.16j; nilai susut kepada RM32j; baki RM258j diketepikan.",
      nilai: { nilai: 257, mata: "RM juta", label: "Nilai dilupus" },
      status: "Selesai — ekuiti dipindahkan",
      ms: 142
    },
    {
      id: "trurich",
      nama: "Trurich Resources Sdn. Bhd.",
      lokasi: "Malaysia",
      negara: "Malaysia",
      sektor: "Sawit/Kalimantan",
      ringkasan_kerugian: "RM364.31j rosot nilai penuh",
      butiran: "Dirosot nilai sepenuhnya. Pinjaman Maybank USD179j tertunggak. JV dengan FGV Kalimantan.",
      nilai: { nilai: 364.31, mata: "RM juta", label: "Rosot nilai penuh" },
      status: "Laporan polis; FGV & Maybank uruskan",
      ms: 144
    },
    {
      id: "abraj",
      nama: "Abraj Sdn. Bhd.",
      lokasi: "Luar negara",
      negara: "Arab Saudi",
      sektor: "Pelaburan strategik",
      ringkasan_kerugian: "RM40.25j rosot nilai",
      butiran: "JV dengan Amanah Raya Berhad dari 11 Nov 2009. 50% pegangan dijual Dis 2020; ekuiti asal RM85j.",
      nilai: { nilai: 40.25, mata: "RM juta", label: "Rosot nilai" },
      status: "Selesai — 50% dijual",
      ms: 145
    },
    {
      id: "ppb",
      nama: "Putrajaya Perdana Berhad (PPB)",
      lokasi: "Malaysia",
      negara: "Malaysia",
      sektor: "Hartanah",
      ringkasan_kerugian: "RM145.3j rosot nilai",
      butiran: "Pelaburan 30% RM193.5j. Hak jual RM210.7j. Nilai buku bersih tinggal RM48.2j. Put option dicadangkan.",
      nilai: { nilai: 145.3, mata: "RM juta", label: "Rosot nilai" },
      status: "Cadangan penyelesaian",
      ms: 145
    },
    {
      id: "alrawda",
      nama: "Al-Rawda Real Estates",
      lokasi: "Luar negara",
      negara: "Arab Saudi",
      sektor: "Hartanah (hotel)",
      ringkasan_kerugian: "SR560.7j tunggakan sewa",
      butiran: "4 hotel di Makkah/Madinah. Bayaran pajakan SR1,426j. ECL RM202.8j pada 2020. Tawaran RM1,748j & RM968j ditolak.",
      nilai: { nilai: 202.8, mata: "RM juta", label: "ECL 2020" },
      status: "Timbang tara; PN di Mahkamah Saudi",
      ms: 147
    },
    {
      id: "alfareeda",
      nama: "Al-Fareeda Residential Fund",
      lokasi: "Luar negara",
      negara: "Arab Saudi",
      sektor: "Dana kediaman",
      ringkasan_kerugian: "SR76j dihapus kira",
      butiran: "Langganan 13.8% dana (~RM63j). Dana dilupuskan; pengurusan Anfaal Capital lenyap.",
      nilai: { nilai: 63, mata: "RM juta", label: "Anggaran kerugian" },
      status: "Dana dilupuskan",
      ms: 150
    },
    {
      id: "thp",
      nama: "TH Plantations Berhad (THP)",
      lokasi: "Malaysia",
      negara: "Malaysia",
      sektor: "Perladangan",
      ringkasan_kerugian: "RM170j rosot nilai (paras LTH)",
      butiran: "Hanya 58% ladang produktif. Pembiayaan Sukuk RM1.2b. PwC forensik 25 April 2019; CEO cuti 20 Ogos 2018.",
      nilai: { nilai: 170, mata: "RM juta", label: "Rosot nilai" },
      status: "SC & PDRM siasat",
      ms: 151
    },
    {
      id: "thprop",
      nama: "TH Properties Sdn. Bhd.",
      lokasi: "Malaysia",
      negara: "Malaysia",
      sektor: "Hartanah/pembangunan",
      ringkasan_kerugian: "RM2.2j bonus tidak ikut peraturan",
      butiran: "Bonus 2017-2018 (RM1.148j + RM1.045j) tanpa kelulusan sewajarnya. Diluluskan Exco yang tiada kuasa. Akta 777 dilanggar.",
      nilai: { nilai: 2.193, mata: "RM juta", label: "Bonus tidak ikut规程" },
      status: "Audit khas; pulihan dicadangkan",
      ms: 151
    },
    {
      id: "marine",
      nama: "Alam Maritim Resources / TH Marine",
      lokasi: "Malaysia",
      negara: "Malaysia",
      sektor: "Maritim",
      ringkasan_kerugian: "RM334j pelaburan",
      butiran: "Ekuiti RM198j + pembiayaan RM136j; semua ekuiti dirosot nilai. Anggaran boleh pulih RM70.4j (PwC).",
      nilai: { nilai: 334, mata: "RM juta", label: "Pelaburan" },
      status: "Selesai sebahagian",
      ms: 152
    },
    {
      id: "thhr",
      nama: "TH Hotel & Residences (THHR)",
      lokasi: "Malaysia",
      negara: "Malaysia",
      sektor: "Hospitaliti",
      ringkasan_kerugian: "RM804.1j dipindah",
      butiran: "5 hotel dipindah ke UJSB pada 55% premium. THKJ hasil susut 62% (RM16.5j→RM6.2j pada 2020).",
      nilai: { nilai: 804.1, mata: "RM juta", label: "Nilai pindahan" },
      status: "Dipindah ke UJSB",
      ms: 153
    },
    {
      id: "fgv",
      nama: "FGV Berhad (FGV)",
      lokasi: "Malaysia",
      negara: "Malaysia",
      sektor: "Sawit",
      ringkasan_kerugian: "RM1.059b rugi tidak nyata",
      butiran: "Kos IPO RM1.254b (276j unit @ RM4.65 + 273.58j @ RM4.55). 283.71j unit dipindah ke UJSB @ RM1.31b kos. Harga jatuh ke RM0.885.",
      nilai: { nilai: 1059, mata: "RM juta", label: "Rugi tidak nyata" },
      status: "ROFR; saham dipegang UJSB",
      ms: 154
    }
  ],

  /* ===================================================================
     KRONOLOGI — Peristiwa penting mengikut tarikh
     =================================================================== */
  kronologi: [
    { t: "1951-02-17", kategori: "Latar", tajuk: "Ordinan Haji 1951", perincian: "Pejabat Urusan Haji Pulau Pinang ditubuhkan untuk melindungi dan mengawal jemaah haji." },
    { t: "1962", kategori: "Latar", tajuk: "PWSBH ditubuhkan", perincian: "Akta Parlimen 34/62 — Perbadanan Wang Simpanan Bakal-Bakal Haji Tanah Melayu." },
    { t: "1969-08-08", kategori: "Latar", tajuk: "LUTH ditubuhkan", perincian: "Akta Lembaga Urusan dan Tabung Haji 1969 (Akta 8) menggantikan PWSBH." },
    { t: "1979", kategori: "Operasi", tajuk: "Akad simpanan Mudarabah", perincian: "LTH mula membayar zakat untuk pendeposit berdasarkan konsep Mudarabah." },
    { t: "1995-06-01", kategori: "Latar", tajuk: "Akta 535 berkuat kuasa", perincian: "LUTH dimansuhkan; Lembaga Tabung Haji (LTH) ditubuhkan melalui Akta Tabung Haji 1995." },
    { t: "2001", kategori: "Subsidi", tajuk: "HAFIS diperkenalkan", perincian: "Subsidi haji untuk jemaah Muassasah yang membayar kurang daripada kos sebenar." },
    { t: "2013-12-31", kategori: "Kewangan", tajuk: "Aset RM48.8 bilion", perincian: "Jurang selepas hibah masih positif RM2.45b — tahun terakhir LTH catat lebihan." },
    { t: "2014-08-21", kategori: "Amaran", tajuk: "Surat BNM pertama", perincian: "BNM ingatkan Pengerusi LTH berkaitan pengurusan deposit dan kecairan.", ms: 61 },
    { t: "2014-12-31", kategori: "Kewangan", tajuk: "Jurang pertama negatif", perincian: "Selepas hibah RM3.24b diagih, lebihan berubah kepada defisit RM352j." },
    { t: "2015-12-23", kategori: "Amaran", tajuk: "BNM surati Menteri", perincian: "BNM menulis kepada Menteri Hal Ehwal Agama mengenai pengurusan kewangan LTH.", ms: 61 },
    { t: "2016-06-30", kategori: "Laporan", tajuk: "EY RAV Framework", perincian: "EY serah RAV Reporting Framework Final Report — digunakan untuk hibah, bukan berdasarkan piawaian perakaunan.", ms: 73 },
    { t: "2016-07-01", kategori: "Tadbir", tajuk: "CEO baharu", perincian: "Datuk Seri Johan Abdullah mula tugas; Tan Sri Ismee Ismail bersara selepas 10 tahun." },
    { t: "2016", kategori: "Operasi", tajuk: "Akad ditukar", perincian: "Akad simpanan ditukar dari Mudarabah kepada Wadi'ah Yad Dhamanah." },
    { t: "2016-12-31", kategori: "Kewangan", tajuk: "Jurang RM4.13b", perincian: "Defisit selepas hibah melebar kepada RM4.13 bilion walaupun hibah diturunkan." },
    { t: "2017-02-17", kategori: "Amaran", tajuk: "BNM dasar rizab", perincian: "BNM ingatkan Pengerusi LTH tentang keperluan dasar rizab.", ms: 61 },
    { t: "2017-03-03", kategori: "Laporan", tajuk: "Roland Berger", perincian: "5-Year Strategic Business Plan Review Final Report — tidak dibentang ke Lembaga, diabaikan pengurusan.", ms: 81 },
    { t: "2017", kategori: "Kewangan", tajuk: "Polisi rosot nilai bertukar", periringan: "LTH tukar polisi rosot nilai dua kali pada tahun yang sama — daripada 70% ke 85% ke 90% untuk kekalkan keuntungan.", ms: 87 },
    { t: "2017-12-31", kategori: "Kewangan", tajuk: "Untung RM3.4b dilaporkan", perincian: "Penyata Kewangan 2017 catat keuntungan RM3,412j. Pelarasan PwC tunjukkan kerugian RM1,433j.", ms: 149 },
    { t: "2018-02-02", kategori: "Laporan", tajuk: "RB Strategic Plan (Revised)", perincian: "Roland Berger Strategic Plan Review Final Report (Revised) — masih tidak dibentang ke Lembaga." },
    { t: "2018-05", kategori: "Tadbir", tajuk: "Panel Pelaburan dibubarkan", perincian: "Panel Pelaburan dibubarkan; diganti Exco yang tidak mengikut peruntukan Akta 535.", ms: 53 },
    { t: "2018-05-23", kategori: "Tadbir", tajuk: "Pengerusi diganti", perincian: "Tan Sri Md Nor Md Yusof dilantik Pengerusi; Abdul Azeez letak jawatan." },
    { t: "2018-07-04", kategori: "Tadbir", tajuk: "Mesyuarat PM-KAN", perincian: "PM dan KAN bincang isu 2017; keputusan: Pendapat Berteguran ditukar kepada 'Tanpa Teguran + EoM'.", ms: 90 },
    { t: "2018-07-10", kategori: "Tadbir", tajuk: "CEO baharu", perincian: "Dato' Sri Zukri Samat mula tugas; Datuk Seri Johan tamat perkhidmatan." },
    { t: "2018-07-16", kategori: "Kewangan", tajuk: "KAN sijil audit 2017", periringan: "Sijil Audit Bersih dengan 'Emphasis of Matter' ditandatangani untuk 2017.", ms: 89 },
    { t: "2018-08-20", kategori: "Tadbir", tajuk: "CEO THP cuti", perincian: "Ketua Pegawai Eksekutif TH Plantations diletakkan di bawah cuti menunggu siasatan dalaman." },
    { t: "2018-10-25", kategori: "Amaran", tajuk: "Surat KAN", periringan: "KAN menulis kepada Pengerusi LTH bagi pihak Lembaga Pengarah.", ms: 89 },
    { t: "2018-11-30", kategori: "Penguatkuasaan", tajuk: "2 laporan polis", periringan: "Idrus Ismail fail 2 laporan polis di Dang Wangi.", ms: 155 },
    { t: "2018-12-07", kategori: "Keputusan", tajuk: "Pelan Pemulihan dilulus", periringan: "Jemaah Menteri lulus Pelan Pemulihan dan Penstrukturan LTH.", ms: 107 },
    { t: "2018-12-13", kategori: "Penguatkuasaan", tajuk: "Laporan polis ke-3", periringan: "Aliatun Mahmud fail laporan polis di Dang Wangi.", ms: 155 },
    { t: "2018-12-14", kategori: "Penubuhan", tajuk: "UJSB ditubuhkan", periringan: "Urusharta Jamaah Sdn. Bhd. (UJSB) diperbadankan. Model: Danaharta 1998.", ms: 107 },
    { t: "2018-12-19", kategori: "Kewangan", tajuk: "PM lulus pemindahan", periringan: "PM lulus pemindahan aset kurang berdaya saing ke UJSB.", ms: 117 },
    { t: "2018-12-19", kategori: "Kewangan", tajuk: "Surat KAN kepada PM", periringan: "KAN jelaskan kepada PM sebab Pendapat Berteguran ditukar.", ms: 89 },
    { t: "2018-12-27", kategori: "Pemulihan", tajuk: "Perjanjian pemindahan", periringan: "LTH & UJSB tandatangan Perjanjian Pemindahan 106 saham + 1 ladang + 29 hartanah.", ms: 117 },
    { t: "2018-12-28", kategori: "Amaran", tajuk: "Surat BNM kepada PM", periringan: "BNM nasihat PM berkaitan pengawasan & prudential LTH.", ms: 61 },
    { t: "2019-01-01", kategori: "Pemulihan", tajuk: "BNM pengawasan", periringan: "LTH diletakkan di bawah pengawasan pentadbiran BNM.", ms: 61 },
    { t: "2019-01-11", kategori: "Penguatkuasaan", tajuk: "Kluster Keempat", periringan: "Pertuduhan terhadap 4 pegawai LTH (tuntutan palsu).", ms: 163 },
    { t: "2019-01-15", kategori: "Tadbir", tajuk: "CEO baharu", periringan: "Datuk Nik Mohd Hasyudeen Yusoff mula tugas; Zukri tamat." },
    { t: "2019-03-15", kategori: "Penguatkuasaan", tajuk: "Kluster Kedua", periringan: "Pertuduhan terhadap 2 pegawai (sumbangan YTH RM22.12j).", ms: 163 },
    { t: "2019-04-05", kategori: "Pemulihan", tajuk: "Peruntukan RM17.8b", periringan: "Jemaah Menteri lulus RM17.8 bilion untuk penebusan Sukuk UJSB shortfall.", ms: 165 },
    { t: "2019-05-15", kategori: "Pemulihan", tajuk: "Sukuk & ROFR", periringan: "LTH & UJSB tandatangani Perjanjian Langganan Sukuk + Perjanjian Hak Penolakan Pertama.", ms: 117 },
    { t: "2019-05-27", kategori: "Pemulihan", tajuk: "Surat MOF", periringan: "MOF Incorporated Letter of Comfort kepada UJSB (Seksyen 14 Akta 61).", ms: 130 },
    { t: "2019", kategori: "Kewangan", tajuk: "Deposit susut RM4b", periringan: "Selepas hibah 1.25% diumumkan, deposit susut daripada ~RM73b kepada ~RM69b.", ms: 81 },
    { t: "2019-12-30", kategori: "Pemulihan", tajuk: "Bayaran tunai RM100j", periringan: "UJSB bayar RM100j tunai kepada LTH.", ms: 117 },
    { t: "2020-01-03", kategori: "Penguatkuasaan", tajuk: "Kluster Ketiga", periringan: "Pertuduhan hibah 2017.", ms: 163 },
    { t: "2020-05-29", kategori: "Penguatkuasaan", tajuk: "Kluster Pertama", periringan: "Pertuduhan penjualan PT THIP.", ms: 163 },
    { t: "2020-11-30", kategori: "Pemulihan", tajuk: "Penebusan awal RM200j", periringan: "RM200j Sukuk ditebus awal daripada Geran Kerajaan RM500j.", ms: 117 },
    { t: "2020-12-30", kategori: "Pemulihan", tajuk: "Bayaran tunai RM200j", periringan: "UJSB bayar RM200j tunai kedua kepada LTH.", ms: 117 },
    { t: "2021-04-21", kategori: "Tatatertib", tajuk: "JT: buang kerja", periringan: "Jawatankuasa Tatatertib putuskan buang kerja untuk 4 pegawai (Kluster 1 & 3).", ms: 159 },
    { t: "2021-05-05", kategori: "Tadbir", tajuk: "CEO ditamatkan awal", periringan: "Datuk Nik Mohd Hasyudeen ditamatkan perkhidmatan 3 bulan lebih awal.", ms: 40 },
    { t: "2021-05-06", kategori: "Tadbir", tajuk: "CEO interim", periringan: "Datuk Sri Amrin Awaluddin mula tugas." },
    { t: "2021-09-06", kategori: "Tatatertib", tajuk: "Rayuan: turun pangkat", periringan: "Rayuan pegawai dikurangkan kepada turun pangkat.", ms: 159 },
    { t: "2021-10-15", kategori: "Tadbir", tajuk: "Pengerusi ditamatkan", periringan: "Tan Sri Md Nor ditamatkan 2 tahun sebelum kontrak tamat. Tempoh 20 Julai 2020 disambung.", ms: 40 },
    { t: "2021-12-20", kategori: "Tadbir", tajuk: "Pengerusi baharu", periringan: "Tan Sri Azman Mokhtar dilantik Pengerusi LTH." },
    { t: "2022-01-20", kategori: "Siasatan", tajuk: "Pesuruhjaya dilantik", periringan: "6 Pesuruhjaya dilantik oleh Agong; Tun Md Raus Sharif sebagai Pengerusi." },
    { t: "2022-05-09", kategori: "Siasatan", tajuk: "Prosiding mula", periringan: "4 saksi memberi keterangan: Jamil Khir, Abdul Azeez, Ismee Ismail, dan satu lagi." },
    { t: "2022-05-23", kategori: "Siasatan", tajuk: "3 saksi lagi", periringan: "Zukri, Mohzani, Ahmad Qadri." },
    { t: "2022-07-19", kategori: "Siasatan", tajuk: "Laporan siap", periringan: "Suruhanjaya selesai siasatan; laporan dimuktamadkan." },
    { t: "2022-08-30", kategori: "Siasatan", tajuk: "Laporan dibentang", periringan: "Laporan dipersembahkan kepada Agong." }
  ],

  /* ===================================================================
     TADBIR URUS — Menteri, Pengerusi, CEO, Lembaga
     =================================================================== */
  tadbir: {
    menteri: [
      { nama: "Mejar Jeneral (B) Dato' Seri Jamil Khir bin Haji Baharom", mula: "2009-02-10", tamat: "2018-05-09", politik: "UMNO" },
      { nama: "(PM) Tun Dr. Mahathir bin Mohamad (P.U.(A) 125)", mula: "2018-05-10", tamat: "2018-07-01", politik: "PH" },
      { nama: "YB Datuk Seri Dr. Mujahid bin Yusof Rawa", mula: "2018-07-02", tamat: "2020-03-09", politik: "PH" },
      { nama: "YB Senator Datuk Dr. Zulkifli bin Mohamad al-Bakri", mula: "2020-03-10", tamat: "2021-08-29", politik: "PN" },
      { nama: "YB Senator Datuk Haji Idris bin Ahmad", mula: "2021-08-30", tamat: "kini", politik: "PN" }
    ],
    pengerusi: [
      { nama: "Datuk Seri Panglima Abdul Azeez bin Abdul Rahim", mula: "2013-07-01", tamat: "2018-05-23", tamat_awal: false, politik: "UMNO · Ahli Parlimen Baling" },
      { nama: "Tan Sri Md Nor bin Md Yusof", mula: "2018-07-10", tamat: "2021-10-15", tamat_awal: true, politik: null },
      { nama: "Tan Sri Azman bin Mokhtar", mula: "2021-12-20", tamat: "kini", tamat_awal: false, politik: null }
    ],
    ceo: [
      { nama: "Tan Sri Ismee bin Ismail", mula: "2006-01-01", tamat: "2016-06-30", tamat_awal: false },
      { nama: "Datuk Seri Johan bin Abdullah", mula: "2016-07-01", tamat: "2018-06-30", tamat_awal: false },
      { nama: "Dato' Sri Zukri bin Samat", mula: "2018-07-10", tamat: "2019-08-31", tamat_awal: false },
      { nama: "Datuk Nik Mohd Hasyudeen bin Yusoff", mula: "2019-09-01", tamat: "2021-05-05", tamat_awal: true },
      { nama: "Datuk Sri Amrin bin Awaluddin", mula: "2021-05-06", tamat: "kini", tamat_awal: false }
    ],
    /* Lembaga 2014-2020 */
    lembaga: [
      { nama: "Tan Sri Othman bin Mahmood", peranan: "Wakil JPM", mula: "2012-01-16", tamat: "2017-07-31", politik: false },
      { nama: "Tan Sri Dato' Seri Mohd Zuki bin Ali", peranan: "Wakil JPM", mula: "2017-08-01", tamat: "2019-04-16", politik: false },
      { nama: "Datuk Seri Hasnol Zam Zam bin Haji Ahmad", peranan: "Wakil JPM", mula: "2019-06-11", tamat: "2020-02-01", politik: false },
      { nama: "Datuk Seri Mohd Sallehhuddin bin Hassan", peranan: "Wakil JPM", mula: "2020-06-16", tamat: "2021-07-31", politik: false },
      { nama: "Datuk Jamil bin Rakon", peranan: "Wakil JPM", mula: "2021-08-01", tamat: "2022-04-18", politik: false },
      { nama: "Tan Sri Dr. Mohd Irwan Serigar bin Abdullah", peranan: "Wakil Perbendaharaan", mula: "2011-03-01", tamat: "2018-05-14", politik: false },
      { nama: "Tan Sri Ahmad Badri bin Mohd Zahir", peranan: "Wakil Perbendaharaan", mula: "2018-10-31", tamat: "2020-05-01", politik: false },
      { nama: "Datuk Seri Asri bin Hamidon", peranan: "Wakil Perbendaharaan", mula: "2020-06-15", tamat: "kini", politik: false },
      { nama: "Tan Sri Dato' Hashim bin Meon", peranan: "Dilantik Menteri", mula: "2011-01-01", tamat: "2015-12-31", politik: false },
      { nama: "Dato' Haji Ghazali bin Awang", peranan: "Dilantik Menteri", mula: "2011-09-01", tamat: "2015-08-31", politik: false },
      { nama: "Tan Sri Haji Syukry bin Mohd Salleh", peranan: "Dilantik Menteri", mula: "2015-09-01", tamat: "2018-08-31", politik: false },
      { nama: "Prof. Emeritus Tan Sri Dato' Dr. Abdul Shukor bin Husin", peranan: "Dilantik Menteri", mula: "2004-10-15", tamat: "2018-10-14", politik: false },
      { nama: "Tan Sri Dato' Paduka Haji Badruddin bin Amiruldin", peranan: "Dilantik Menteri", mula: "2005-01-01", tamat: "2018-06-30", politik: true, nota_politik: "Ahli Parlimen Yan/Jerai 2004-2008, Pengerusi Tetap Perhimpunan Agong UMNO" },
      { nama: "Allahyarham Tan Sri Datuk Haji Mohamad bin Haji Aziz", peranan: "Dilantik Menteri", mula: "2011-01-01", tamat: "2018-06-30", politik: false },
      { nama: "Datuk Rosni binti Sohar", peranan: "Dilantik Menteri", mula: "2014-02-01", tamat: "2018-05-23", politik: true, nota_politik: "ADUN Hulu Bernam, Majlis Kerja Tertinggi UMNO" },
      { nama: "Tan Sri Dato' Sri Haji Mohamed Apandi bin Ali", peranan: "Dilantik Menteri", mula: "2016-01-15", tamat: "2018-06-04", politik: false },
      { nama: "Datuk Seri Johan bin Abdullah", peranan: "CEO LTH", mula: "2016-07-01", tamat: "2018-06-30", politik: false },
      { nama: "Dato' Sri Zukri bin Samat", peranan: "CEO LTH", mula: "2018-07-10", tamat: "2019-08-31", politik: false },
      { nama: "Tan Sri Abu Talib bin Othman", peranan: "Dilantik Menteri", mula: "2018-08-10", tamat: "2020-08-09", politik: false },
      { nama: "Datuk Zaiton binti Mohd Hassan", peranan: "Dilantik Menteri", mula: "2018-08-10", tamat: "2020-08-09", politik: false },
      { nama: "Profesor Dr. Ashraf bin Md Hashim", peranan: "Dilantik Menteri", mula: "2018-08-10", tamat: "kini", politik: false },
      { nama: "Dato' Noordin bin Sulaiman", peranan: "Dilantik Menteri", mula: "2018-08-15", tamat: "kini", politik: false },
      { nama: "Datuk Haji Ahamed Basheer bin Mohd Hussain", peranan: "Dilantik Menteri", mula: "2019-03-26", tamat: "2021-03-25", politik: false },
      { nama: "Datuk Akbar bin Samon", peranan: "Dilantik Menteri", mula: "2019-06-11", tamat: "2021-06-10", politik: false },
      { nama: "Datuk Nik Mohd Hasyudeen bin Yusoff", peranan: "CEO LTH", mula: "2019-09-01", tamat: "2021-05-05", politik: false },
      { nama: "Dato' Abdul Mutalib bin Datuk Seri Mohamed Razak", peranan: "Dilantik Menteri", mula: "2020-08-10", tamat: "kini", politik: false },
      { nama: "YM Tengku Dato' Seri Hasmuddin bin Tengku Othman", peranan: "Dilantik Menteri", mula: "2021-03-16", tamat: "kini", politik: false },
      { nama: "Datuk Sri Amrin bin Awaluddin", peranan: "CEO LTH", mula: "2021-05-06", tamat: "kini", politik: false },
      { nama: "Dato' Abdul Hamid bin Sh. Mohamed", peranan: "Dilantik Menteri", mula: "2021-08-01", tamat: "kini", politik: false },
      { nama: "Datin Paduka Kartini binti Haji Abdul Manaf", peranan: "Dilantik Menteri", mula: "2021-08-01", tamat: "kini", politik: false }
    ],
    penglibatan_subsidiari: [
      { nama: "Dato' Sri Zukri bin Samat", syarikat: 21, nota: "Pengerusi THP, THP Australia, dll" },
      { nama: "Datuk Seri Johan bin Abdullah", syarikat: 18, nota: "Pelbagai anak syarikat LTH" },
      { nama: "Datuk Rozaida binti Omar", syarikat: 23, nota: "CFO Kumpulan" }
    ]
  },

  /* ===================================================================
     BONUS — Gaji & bonus kakitangan LTH
     =================================================================== */
  bonus: {
    staf: [
      { tahun: 2010, peruntukan: 25, kadar: "2.5+1", taburan: "2-6 bulan", ms: 97 },
      { tahun: 2011, peruntukan: 35, kadar: "3+1", taburan: "2-6 bulan", ms: 97 },
      { tahun: 2012, peruntukan: 38, kadar: "3.5+1", taburan: "2.5-8 bulan", ms: 97 },
      { tahun: 2013, peruntukan: 49, kadar: "2.5-10", taburan: "2.5-10 bulan", ms: 97 },
      { tahun: 2014, peruntukan: 74, kadar: "1-11+2", taburan: "1-13 bulan (puncak!)", ms: 97, sorot: true },
      { tahun: 2015, peruntukan: 65, kadar: "1-10", taburan: "1-10 bulan", ms: 97 },
      { tahun: 2016, peruntukan: 25, kadar: "1-3", taburan: "1-3 bulan", ms: 97 },
      { tahun: 2017, peruntukan: 56.7, kadar: "1-6", taburan: "1-6 bulan", ms: 97 },
      { tahun: 2018, peruntukan: 10.8, kadar: "1", taburan: "1 bulan", ms: 97 },
      { tahun: 2019, peruntukan: 11.6, kadar: "1", taburan: "1 bulan", ms: 97 },
      { tahun: 2020, peruntukan: 14.1, kadar: "1", taburan: "1 bulan", ms: 97 }
    ],
    th_properties: {
      tahun: 2017,
      kelulusan: "2017-04-12 (Exco)",
      kelulusan_tarikh: "TIDAK MENGIKUT AKTA 777",
      total: 1148.4,
      penerima: [
        { nama: "Datuk Azizan bin Abdul Rahman", jumlah: 231000 },
        { nama: "Dato' Roszali bin Othman", jumlah: 189750 },
        { nama: "Haji Abd Kadir bin Sahlan", jumlah: 189750 },
        { nama: "Nik Badrul Hisham bin Nik Hassan", jumlah: 99000 },
        { nama: "Anuarifaei bin Mustapa", jumlah: 99000 },
        { nama: "Nur Adlan bin Taib", jumlah: 99000 },
        { nama: "Zaidi bin Baharudin", jumlah: 56100 },
        { nama: "Haji Mohamed Rahim bin Ismail", jumlah: 52800 },
        { nama: "Aida binti Karim", jumlah: 49500 },
        { nama: "Marhaizah binti Mohamed Yusuf", jumlah: 49500 },
        { nama: "Dato' Mohd Fazillah bin Mohd Ali", jumlah: 33000 }
      ]
    },
    thp_australia: {
      tahun: 2018,
      kelulusan: "2018-04-23 (AGM lewat 7 bulan)",
      total: 1045,
      penerima: [
        { nama: "Dato' Azizan bin Abd Rahman", jumlah: 167250 },
        { nama: "Dato' Roszali bin Othman", jumlah: 176500 },
        { nama: "Haji Abd Kadir bin Sahlan", jumlah: 176500 },
        { nama: "Nik Badrul Hisham bin Nik Hassan", jumlah: 101500 },
        { nama: "Anuarifaei bin Mustapa", jumlah: 101500 },
        { nama: "Nur Adlan bin Taib", jumlah: 101500 },
        { nama: "Zaidi bin Baharudin", jumlah: 63000 },
        { nama: "Aida binti Karim", jumlah: 63000 },
        { nama: "Marhaizah binti Mohamed Yusuf", jumlah: 63000 },
        { nama: "Haji Mohamed Rahim bin Ismail", jumlah: 31250 }
      ]
    }
  },

  /* ===================================================================
     TATATERTIB & PENGUATKUASAAN
     =================================================================== */
  tatatertib: {
    pegawai: [
      { nama: "Datuk Rozaida binti Omar", jawatan: "Ketua Pegawai Kewangan Kumpulan", gred: "K", kluster: "1, 2, 3, 4", keputusan: "Turun pangkat", rayuan: "Disahkan", ms: 163 },
      { nama: "Dato' Adi Azuan Abdul Ghani", jawatan: "Ketua Pegawai Operasi", gred: "K", kluster: "2", keputusan: "Amaran keras", rayuan: "Tiada", ms: 163 },
      { nama: "Rifina binti Md Ariff", jawatan: "PGB Kanan Perkhidmatan Korporat dan Hartanah", gred: "K", kluster: "1", keputusan: "Turun pangkat", rayuan: "Disahkan", ms: 163 },
      { nama: "Mohd Hisham bin Harun", jawatan: "Ketua Pegawai Sumber Manusia", gred: "K", kluster: "1, 2", keputusan: "Amaran + tanguh gaji", rayuan: "Tiada", ms: 163 },
      { nama: "Hazlina binti Mohd Khalid", jawatan: "Penasihat Undang-Undang", gred: "J", kluster: "1, 4", keputusan: "Turun pangkat", rayuan: "Disahkan", ms: 163 }
    ],
    laporan_polis: [
      { tarikh: "2018-11-30", pengadu: "Idrus Ismail", isu: "THIP – penjualan PT TH Indo Plantations" },
      { tarikh: "2018-11-30", pengadu: "Idrus Ismail", isu: "Yayasan TH – sumbangan RM22.12j" },
      { tarikh: "2018-12-13", pengadu: "Aliatun Mahmud", isu: "Trurich – pelaburan sawit" },
      { tarikh: "2019-01-16", pengadu: "Idrus Ismail", isu: "Hibah 2017 – pembentangan menyalahi undang-undang" }
    ],
    sprm: [
      { tarikh: "2019-03-15", pihak: "SPRM", isu: "Kluster Kedua: Sumbangan YTH RM22.12j kepada badan bukan layak", ms: 163 },
      { tarikh: "2020-01-03", pihak: "SPRM", isu: "Kluster Ketiga: Hibah 2017", ms: 163 },
      { tarikh: "2019-01-11", pihak: "SPRM", isu: "Kluster Keempat: Tuntutan palsu", ms: 163 },
      { tarikh: "2020-05-29", pihak: "SPRM", isu: "Kluster Pertama: PT THIP", ms: 163 }
    ]
  },

  /* ===================================================================
     25 SYOR UTAMA
     =================================================================== */
  syor: [
    { no: 1, kategori: "Akta 535", kepada: "Parlimen", tajuk: "Kriteria khusus anggota Lembaga", teks: "Tambah peruntukan yang menggariskan kriteria khusus (kewangan, perniagaan, ekonomi, perakaunan) untuk Pengerusi dan anggota Lembaga." },
    { no: 2, kategori: "Akta 535", kepada: "Parlimen", tajuk: "Kepakaran dinyatakan jelas", teks: "Nyatakan secara khusus bidang kepakaran yang diperlukan bagi anggota Lembaga yang dilantik." },
    { no: 3, kategori: "Akta 535", kepada: "Parlimen", tajuk: "Larang ahli politik aktif", teks: "Ahli politik aktif dilarang dilantik sebagai Pengerusi/anggota Lembaga/anak syarikat." },
    { no: 4, kategori: "Akta 535", kepada: "Parlimen", tajuk: "Badan penasihat bebas", teks: "Penamatan anggota Lembaga perlu dirujuk kepada jawatankuasa/badan penasihat bebas yang dicadangkan." },
    { no: 5, kategori: "Akta 535", kepada: "Parlimen", tajuk: "Sebab munasabah", teks: "Penamatan perkhidmatan anggota Lembaga hendaklah diberi sebab munasabah." },
    { no: 6, kategori: "Akta 535", kepada: "Parlimen", tajuk: "Jawatankuasa dikanunkan", teks: "Jawatankuasa Urusan Haji, JPS, Panel Pelaburan dikanunkan dalam Akta 535." },
    { no: 7, kategori: "Akta 535", kepada: "Parlimen", tajuk: "Pengiraan hibah jelas", teks: "Hibah berpandukan Penyata Kewangan tahunan yang diaudit (piawaian MIA), bukan RAV/proforma." },
    { no: 8, kategori: "Akta 535", kepada: "Parlimen", tajuk: "Dana Haji ditubuhkan", teks: "Jabatan Dana Haji yang bertanggungjawab pelaburan, dikawal selia SC." },
    { no: 9, kategori: "Akta 535", kepada: "Parlimen", tajuk: "Pengecualian Akta 240", teks: "Pindaan Seksyen 26 Akta 535 — pengecualian pemakaian Akta 240." },
    { no: 10, kategori: "Tadbir Urus", kepada: "PM", tajuk: "Tadbir urus dua Menteri", teks: "Mandat: Menteri Hal Ehwal Agama (haji) + Menteri Kewangan (dana/pelaburan). Pelantikan Lembaga/CEO oleh PM atas syor badan bebas." },
    { no: 11, kategori: "Tadbir Urus", kepada: "LTH", tajuk: "Had penglibatan subsidiari", teks: "Penglibatan anggota Lembaga/pengurusan LTH dalam subsidiari hendaklah dihadkan." },
    { no: 12, kategori: "Kawal Selia", kepada: "BNM", tajuk: "BNM had skop", teks: "BNM tidak seharusnya mengawal selia LTH. Jika perlu, had kepada kawalan rizab dan pengurusan kecairan." },
    { no: 13, kategori: "Audit", kepada: "MOF", tajuk: "Audit firma swasta", teks: "Pengauditan LTH tidak lagi oleh JAN; LTH boleh melantik firma akauntan swasta." },
    { no: 14, kategori: "Hibah", kepada: "LTH", tajuk: "Asas hibah disemak", teks: "Hibah berdasarkan Penyata Kewangan diaudit; RAV tidak boleh digunakan." },
    { no: 15, kategori: "Pelaporan", kepada: "LTH", tajuk: "Pematuhan piawaian", teks: "Laporan Penyata Kewangan patuhi piawaian Akta 240 dan PA 3.1." },
    { no: 16, kategori: "Bonus", kepada: "LTH", tajuk: "Bonus tinggi dihentikan", teks: "Amalan pemberian bonus terlalu tinggi kepada kakitangan dihentikan." },
    { no: 17, kategori: "Bonus", kepada: "LTH", tajuk: "Pulih bonus TH Properties", teks: "Usaha mendapatkan semula bonus yang diberi tanpa mematuhi peraturan." },
    { no: 18, kategori: "Forensik", kepada: "LTH", tajuk: "Audit forensik 14 pelaburan", teks: "Audit forensik: THIP, Emrail, Wellspring, DSSB, Trurich, Abraj, PPB, Al-Rawda, Al-Fareeda, THP, TH Properties, TH Marine, THHR, FGV." },
    { no: 19, kategori: "Penguatkuasaan", kepada: "PDRM/SPRM", tajuk: "Tindakan tegas", teks: "Tindakan tegas dan segera ke atas setiap laporan polis/aduan." },
    { no: 20, kategori: "Tatatertib", kepada: "LTH", tajuk: "Proses diperkemas", teks: "Tindakan tatatertib diperkemas dan disegerakan." },
    { no: 21, kategori: "Litigasi", kepada: "LTH", tajuk: "Pantau pertikaian", teks: "Pantau pertikaian mahkamah/timbang tara; selesaikan di luar mahkamah jika sesuai." },
    { no: 22, kategori: "Zakat", kepada: "LTH", tajuk: "Muzakarah MKI", teks: "Bayaran zakat dirujuk kepada Muzakarah MKI susulan perubahan akad." },
    { no: 23, kategori: "UJSB", kepada: "MOF", tajuk: "Pelan Pemulihan serius", teks: "Pelan Pemulihan perlu perhatian serius; Sukuk dijamin Kerajaan untuk kestabilan." },
    { no: 24, kategori: "Sukuk", kepada: "MOF", tajuk: "Sukuk boleh diniagakan", teks: "Sukuk distruktur semula: ciri tradeable, ditawarkan lebih luas." },
    { no: 25, kategori: "Deposit", kepada: "LTH", tajuk: "Deposit & HAFIS disemak", teks: "Deposit minimum dinaikkan, had pengeluaran besar dengan notis, subsidi hanya untuk yang memerlukan." }
  ],

  /* ===================================================================
     PETA RANTAI — Bagaimana krisis berlaku (punca → kesan)
     =================================================================== */
  rantai: [
    {
      id: "mandat",
      label: "Mandat asal",
      tahun: "1969-1995",
      tajuk: "LTH ditubuhkan untuk ibadah haji",
      butiran: "Matlamat asal: bantu orang Islam Malaysia menyimpan dan menunaikan haji.",
      kelas: "F",
      ms: 13
    },
    {
      id: "tonggak",
      label: "Perubahan skop",
      tahun: "2014-2018",
      tajuk: "Visi 'Tonggak Ekonomi Ummah'",
      butiran: "LTH diperluas ke hartanah, perladangan, pelaburan strategik — tanpa kepakaran sewajarnya.",
      kelas: "F",
      ms: 55
    },
    {
      id: "politik",
      label: "Campur tangan politik",
      tahun: "2014-2018",
      tajuk: "Ahli politik dalam Lembaga",
      butiran: "Pengerusi dan beberapa anggota Lembaga terdiri daripada ahli politik aktif.",
      kelas: "F",
      ms: 16
    },
    {
      id: "hibah",
      label: "Hibah tinggi",
      tahun: "2014-2017",
      tajuk: "RM12.65b diagihkan dalam 4 tahun",
      butiran: "Hibah tahunan 6.25% (2014) turun ke 4.50% (2017), tetapi jumlah besar dan melebihi kemampuan sebenar.",
      kelas: "T",
      ms: 74
    },
    {
      id: "rav",
      label: "Asas pengiraan lemah",
      tahun: "2014-2017",
      tajuk: "RAV gantikan penyata diaudit",
      butiran: "RAV digunakan untuk mengira kemampuan hibah, bukan penyata kewangan diaudit. Inflasi nilai aset.",
      kelas: "F",
      ms: 73
    },
    {
      id: "rosot",
      label: "Rosot nilai disembunyi",
      tahun: "2017",
      tajuk: "Polisi rosot nilai bertukar-tukar",
      butiran: "Polisi diubah dua kali pada tahun 2017 sahaja (70%→85%→90%) untuk kekalkan keuntungan RM3.4b.",
      kelas: "F",
      ms: 87
    },
    {
      id: "kan",
      label: "Audit longgar",
      tahun: "2017-2018",
      tajuk: "KAN beri Sijil Audit Bersih",
      butiran: "Pendapat Berteguran dipertimbangkan tetapi ditukar kepada 'Tanpa Teguran + EoM' selepas perbincangan PM.",
      kelas: "F",
      ms: 89
    },
    {
      id: "krisis",
      label: "Krisis kewangan",
      tahun: "2017-2018",
      tajuk: "Untung RM3.4b → Rugi RM1.4b",
      butiran: "Analisis PwC: defisit selepas hibah RM4.093b, jurang aset-liabiliti makin melebar.",
      kelas: "F",
      ms: 112
    },
    {
      id: "deflasi",
      label: "Deposit susut",
      tahun: "2019",
      tajuk: "RM73b → RM69b",
      butiran: "Selepas hibah 1.25% diumumkan, pendeposit besar mengeluarkan ~RM4b.",
      kelas: "F",
      ms: 81
    },
    {
      id: "ujsb",
      label: "Aset dipindah",
      tahun: "2018-12-27",
      tajuk: "RM19.9b → UJSB",
      butiran: "Aset kurang berdaya saing dipindah pada nilai RM19.9b (premium RM10.2b ke atas pasaran).",
      kelas: "F",
      ms: 117
    },
    {
      id: "sukuk",
      label: "Tanggungan Sukuk",
      tahun: "2026-2029",
      tajuk: "RM27.5b perlu ditebus",
      butiran: "Sukuk UJSB matang perlu ditebus; kerajaan peruntuk RM17.8b untuk penebusan shortfall.",
      kelas: "F",
      ms: 159
    },
    {
      id: "hafis",
      label: "Subsidi HAFIS",
      tahun: "2014-2030",
      tajuk: "106j → 742j",
      butiran: "Subsidi HAFIS naik hampir 7 kali ganda; unjuran mencecah RM742j/tahun pada 2030.",
      kelas: "T",
      ms: 96
    }
  ],

  /* ===================================================================
     AMARAN UTAMA — Surat & komunikasi BNM/KAN/MOF
     =================================================================== */
  amaran: [
    { tarikh: "2014-08-21", dari: "BNM", kepada: "Pengerusi LTH (Abdul Azeez)", tajuk: "Pengurusan deposit & kecairan", tindakan: "Tiada perubahan ketara" },
    { tarikh: "2014-12-19", dari: "BNM", kepada: "Pengerusi LTH", tajuk: "Pengurusan deposit & kecairan", tindakan: "Tiada perubahan ketara" },
    { tarikh: "2015-12-23", dari: "BNM", kepada: "Pengerusi LTH", tajuk: "Dasar rizab", tindakan: "Tiada perubahan ketara" },
    { tarikh: "2015-12-23", dari: "BNM", kepada: "Menteri", tajuk: "Pengurusan kewangan LTH", tindakan: "Tiada perubahan ketara" },
    { tarikh: "2016-12-14", dari: "BNM", kepada: "Pengerusi LTH", tajuk: "Dasar rizab", tindakan: "Tiada perubahan ketara" },
    { tarikh: "2017-02-17", dari: "BNM", kepada: "Pengerusi LTH", tajuk: "Dasar rizab", tindakan: "Tiada perubahan ketara" },
    { tarikh: "2018-07-16", dari: "KAN (Tan Sri Madinah)", kepada: "Lembaga LTH", tajuk: "Sijil audit 2017 dengan EoM", tindakan: "Hibah RM2.75b diisytihar pada kadar 4.5% + 1.75%" },
    { tarikh: "2018-10-25", dari: "KAN", kepada: "Pengerusi LTH", tajuk: "Penjelasan lanjutan audit", tindakan: "Tiada tindakan khusus" },
    { tarikh: "2018-12-19", dari: "KAN", kepada: "PM", tajuk: "Justifikasi 'Tanpa Teguran'", tindakan: "PM maklum" },
    { tarikh: "2018-12-28", dari: "BNM", kepada: "PM", tajuk: "Pengawasan & prudential", tindakan: "LTH diletakkan di bawah BNM 1 Jan 2019" },
    { tarikh: "2022-04-18", dari: "BNM", kepada: "Suruhanjaya RCI", tajuk: "Model perniagaan LTH", tindakan: "Untuk perhatian RCI" }
  ],

  /* ===================================================================
     SURUHANJAYA — Saksi yang dipanggil
     =================================================================== */
  suruhanjaya: {
    tempoh: "20 Jan - 19 Jul 2022",
    pengerusi: "Tun Md Raus bin Sharif (Mantan Ketua Hakim Negara)",
    setiausaha: "Datuk Hajah Hakimah binti Mohd Yusoff (KP JAKIM)",
    pesuruhjaya: [
      "Tun Md Raus bin Sharif — Mantan Ketua Hakim Negara",
      "Tan Sri Samsudin bin Osman — Mantan Ketua Setiausaha Negara",
      "Tan Sri Abdul Rashid bin Hussain — Pengasas RHB Group",
      "Tan Sri Dr. Mohd. Munir bin Abdul Majid — Pengerusi CARI ASEAN Research",
      "Profesor Dr. Asmadi bin Mohamed Naim — Naib Canselor UniSHAMS",
      "Norsyahrin bin Hamidon — Akauntan Bertauliah"
    ],
    saksi_dipanggil: 16,
    saksi_abs: 45,
    hari_prosiding: 9,
    saksi_oral: [
      { tarikh: "2022-05-09", saksi: ["Jamil Khir bin Baharom", "Abdul Azeez bin Abdul Rahim", "Ismee bin Ismail", "(saksi ke-4)"] },
      { tarikh: "2022-05-11", saksi: ["Johan bin Abdullah", "Rozaida Omar"] },
      { tarikh: "2022-05-12", saksi: ["Mujahid bin Yusof Rawa", "Md Nor Md Yusof", "Zaiton Mohd Hassan"] },
      { tarikh: "2022-05-23", saksi: ["Zukri Samat", "Mohzani Wahab", "Ahmad Qadri"] },
      { tarikh: "2022-06-01", saksi: ["Mona Othman"] },
      { tarikh: "2022-06-02", saksi: ["Amrin Awaluddin"] },
      { tarikh: "2022-06-04", saksi: ["Nik Hasyudeen", "Abd Kadir Sahlan"] },
      { tarikh: "2022-06-27", saksi: ["Amrin Awaluddin (sambungan)"] }
    ]
  }
};
