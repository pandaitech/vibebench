/* ==========================================================================
   data-fin.js — Data kewangan yang diekstrak daripada Laporan RCI Tabung Haji.
   Semua nombor di sini FAKTA LAPORAN kecuali ditandakan.
   `p` = nombor halaman PDF laporan (anchor #pdf-page-N pada versi Markdown).
   Unit: kecuali dinyatakan, nilai kewangan besar dalam RM JUTA.
   ========================================================================== */
var RD = (window.RD = window.RD || {});

/* --------------------------------------------------------------------------
   1. KEDUDUKAN ASET vs LIABILITI + AGIHAN HIBAH  (analisis PwC, p147; p112)
   -------------------------------------------------------------------------- */
RD.posisi = {
  p: [112, 147],
  nota: 'Jadual asal PwC. "Liabiliti" termasuk Kumpulan Wang Simpanan Pendeposit. ' +
        'Tahun 2013 hanya muncul dalam jadual p147, tidak dalam jadual p112.',
  rows: [
    { y: 2013, aset: 48778, liabiliti: -43696, pra: 5082, agihan: -2632, pasca: 2450 },
    { y: 2014, aset: 54751, liabiliti: -51866, pra: 2885, agihan: -3237, pasca: -352 },
    { y: 2015, aset: 60196, liabiliti: -60062, pra: 134, agihan: -3220, pasca: -3086 },
    { y: 2016, aset: 64321, liabiliti: -65581, pra: -1260, agihan: -2871, pasca: -4131 },
    { y: 2017, aset: 70317, liabiliti: -71086, pra: -769, agihan: -3324, pasca: -4093 }
  ]
};

/* --------------------------------------------------------------------------
   2. KADAR HIBAH (p120) + JUMLAH AGIHAN (p130)
   -------------------------------------------------------------------------- */
RD.hibahKadar = {
  p: [120],
  rows: [
    { y: 2014, tahunan: 6.25, haji: 2.00 },
    { y: 2015, tahunan: 5.00, haji: 3.00 },
    { y: 2016, tahunan: 4.25, haji: 1.50 },
    { y: 2017, tahunan: 4.50, haji: 1.75 },
    { y: 2018, tahunan: 1.25, haji: 0 },
    { y: 2019, tahunan: 3.05, haji: 0 },
    { y: 2020, tahunan: 3.10, haji: 0 },
    { y: 2021, tahunan: 3.10, haji: null }
  ],
  nota: 'Kadar 2021 disebut dalam jadual p120. Jumlah ringgit 2021 tidak diberikan dalam laporan.'
};
RD.hibahJumlah = {
  p: [130],
  unit: 'RM ribu',
  rows: [
    { y: 2014, tahunan: 2988053, haji: 249143, jumlah: 3237196 },
    { y: 2015, tahunan: 2807369, haji: 413005, jumlah: 3220374 },
    { y: 2016, tahunan: 2645625, haji: 225197, jumlah: 2870822 },
    { y: 2017, tahunan: 3042184, haji: 281557, jumlah: 3323741 },
    { y: 2018, tahunan: 922959, haji: 0, jumlah: 922959 },
    { y: 2019, tahunan: 2140538, haji: 0, jumlah: 2140538 },
    { y: 2020, tahunan: 2242141, haji: 0, jumlah: 2242141 }
  ]
};

/* --------------------------------------------------------------------------
   3. JAMBATAN RAV 2017 — bagaimana defisit jadi lebihan (p116)
   -------------------------------------------------------------------------- */
RD.rav2017 = {
  p: [116, 113],
  aset: 70317,
  uplift: 4466,
  asetRav: 74783,
  liabiliti: 74410,
  bersih: 373,
  upliftNota: 'Nilai tambahan yang dianggarkan pengurusan LTH ke atas anak syarikat, syarikat bersekutu, ' +
    'usaha sama, hartanah dan aset dipegang sehingga matang.',
  thp: { jumlahDalamRav: 2294, asasPenilaian: 4600, olehPenilaiBertauliah: 556, olehAnggaranPengurusan: 4044 },
  thpNota: 'Contoh yang diberi PwC: komponen TH Plantations dalam kiraan RAV 2017.'
};

/* --------------------------------------------------------------------------
   4. POLISI ROSOT NILAI — kesan menukar satu nombor (p148, p115, p131)
   -------------------------------------------------------------------------- */
RD.rosotStates = {
  p: [148, 115, 131, 116],
  nota: 'Empat keadaan yang benar-benar didokumenkan dalam laporan. Tiada nilai antara ini dicipta.',
  rows: [
    {
      id: 'frs', label: 'Ikut FRS 139 sepenuhnya', ambang: null,
      kesan: 1310, sumber: 'JAN (Puan Mona binti Othman, ABS)', p: 116,
      desc: 'Rosot nilai aset kewangan yang SEPATUTNYA direkodkan pada 2017 jika piawaian FRS 139 dipatuhi.'
    },
    {
      id: 'p70', label: 'Ambang lama: jatuh >70% kos', ambang: 70, prolong: '>24 bulan',
      kesan: 1313, sumber: 'PwC', p: 148,
      desc: 'Polisi sebelum diubah. Hampir sama dengan kiraan JAN — dua sumber berbeza, jumlah hampir serupa.'
    },
    {
      id: 'p85', label: 'Ambang diubah: >85%', ambang: 85, prolong: 'tiada',
      kesan: 171, sumber: 'PwC', p: 148,
      desc: 'Perubahan pertama pada tahun kewangan 2017.'
    },
    {
      id: 'p90', label: 'Ambang diubah lagi: >90%', ambang: 90, prolong: 'tiada',
      kesan: 1, sumber: 'PwC', p: 148,
      desc: 'Perubahan kedua — dalam tempoh satu hari. Rosot nilai yang direkod akhirnya RM1 juta sahaja.'
    }
  ],
  frsic: { turun: 20, bulan: 12, p: 114,
    desc: 'Garis panduan FRSIC 14 (Institut Akauntan Malaysia): kerugian dianggap SIGNIFIKAN bila nilai aset ' +
          'turun 20% atau lebih; BERLANJUTAN bila melebihi 12 bulan.' },
  contoh: { kos: 1000, cetusPada90: 100, p: 115 }
};

/* --------------------------------------------------------------------------
   5. UNTUNG/RUGI 2017 SELEPAS PELARASAN (PwC, p149)
   -------------------------------------------------------------------------- */
RD.pl2017 = {
  p: [149],
  rows: [
    { k: 'Keuntungan tahun 2017 seperti direkod', v: 3412, jenis: 'base' },
    { k: 'Tolak: rosot nilai pelaburan ekuiti AFS', v: -4258, jenis: 'adj' },
    { k: 'Tolak: rosot nilai instrumen hutang AFS', v: -7, jenis: 'adj' },
    { k: 'Tolak: pelarasan lain', v: -580, jenis: 'adj' }
  ],
  hasil: { k: 'Kerugian terlaras 2017', v: -1433 },
  terkumpul: {
    simpananTerkumpul: 162, pelarasan: -4845, kerugianTerkumpul: -4683,
    nota: 'Kerugian terkumpul terlaras pada 31 Disember 2017.'
  }
};

/* Rosot nilai yang tidak diambil kira, dan liabiliti bersih (p116–117) */
RD.tidakDiambilKira = {
  p: [116, 117],
  frs139: 1310,
  subsidiariBersekutu: 227.81,
  jumlah: 1537,
  bersihTerlaras: 373,
  liabilitiBersihJan: 1164,
  liabilitiBersihPwc: 4093,
  theKesan: { syarikat: 'TH Heavy Engineering Berhad', nilai: 164.58, p: 18 },
  nota: 'RM227.81 juta melibatkan 3 syarikat subsidiari dan 3 syarikat bersekutu; yang terbesar ' +
        'TH Heavy Engineering Berhad RM164.58 juta.'
};

/* --------------------------------------------------------------------------
   6. KAEDAH KIRAAN HIBAH 2017 — baki bulanan vs baki tahunan (p131, p115)
   -------------------------------------------------------------------------- */
RD.kaedahHibah2017 = {
  p: [131, 115],
  mampuBakiTahunan: { kadar: 4.0, jumlah: 2700 },
  dibayarBakiBulanan: { kadar: 6.25, jumlah: 3310 },
  tambahanDana: 610, tambahanPeratus: 22.5,
  lebihanKeluar: 600,
  nota: 'JAN: berdasarkan draf penyata kewangan, kemampuan LTH hanya RM2.70 bilion (4%, baki minima tahunan). ' +
        'Lembaga bertukar ke baki minima bulanan pada 6.25%, menjadikan bayaran RM3.31 bilion.'
};

/* --------------------------------------------------------------------------
   7. DEPOSIT & PENDEPOSIT (p122–123, p171, p218, p229)
   -------------------------------------------------------------------------- */
RD.deposit = {
  p: [122, 123, 171, 218, 229],
  titik: [
    { label: 'Sebelum pengumuman hibah 2018', nilai: 73000, anggaran: true, bila: '~awal 2019', p: 122 },
    { label: 'Akhir 2019 (selepas hibah 1.25%)', nilai: 69000, anggaran: false, bila: 'Dis 2019', p: 122 },
    { label: 'Akhir 2020', nilai: 76000, anggaran: true, bila: 'Dis 2020', p: 122 },
    { label: 'Semasa laporan disiapkan', nilai: 88000, anggaran: false, bila: '21 Mei 2022', p: 171 },
    { label: 'Unjuran LTH: dalam dua tahun', nilai: 100000, anggaran: true, bila: '~2024', p: 218, unjuran: true }
  ],
  pendeposit: [
    { bila: '2018', jumlah: 9.2, p: 150, nota: 'disebut "lebih 9.2 juta pendeposit"' },
    { bila: '2018', jumlah: 9.3, p: 152, nota: 'disebut "hampir 9.3 juta pendeposit"' },
    { bila: '22 Julai 2022', jumlah: 8.6, p: 229, nota: 'jumlah pendeposit semasa laporan' }
  ],
  tumpuan: {
    p: [208, 216],
    bawah2000: 65, bawah2000Nota: '65% pendeposit ada RM2,000 atau kurang dalam akaun',
    top5pct: 75, top5pctNota: 'Dianggarkan 75% deposit LTH dipegang oleh hanya 5% pendeposit'
  },
  danaMinima: { nilai: 60000, p: 111, nota: 'Dana minima yang diperlukan LTH untuk menampung subsidi haji pada tahap sekarang.' },
  jaminan: { nilai: 88000, p: 235, nota: 'Nilai jaminan Kerajaan (seksyen 24 Akta 535) ke atas deposit pendeposit.' }
};

/* Rizab (p105) */
RD.rizab = {
  p: [104, 105, 106],
  rizabBerkanunPindahan: 0.1,
  rpkSasaranPeratus: 5,
  rpkSasaranNilai: 3500,
  rpkPindahanTahunan: 2,
  guna: [
    { tahun: '2012, 2014, 2016', apa: 'RB dapati LTH guna rizab untuk bayar hibah', p: 104 },
    { tahun: '2020 dan 2021', apa: 'LTH guna rizab untuk menampung agihan hibah', p: 106 }
  ],
  perbendaharaan: 'Perbendaharaan tidak pernah meluluskan apa-apa baki minima Kumpulan Wang Rizab, ' +
    'walaupun seksyen 22(3)(b) Akta 535 mensyaratkannya dan wakil Perbendaharaan ada dalam Lembaga.',
  perbendaharaanP: [104]
};

/* --------------------------------------------------------------------------
   8. UJSB — PEMINDAHAN ASET (p159)
   -------------------------------------------------------------------------- */
RD.ujsbPindah = {
  p: [159],
  rows: [
    { k: 'Hartanah dan tanah', buku: 1411, pindah: 2247, pasaran: 1411 },
    { k: 'Syarikat perladangan', buku: 718, pindah: 802, pasaran: 718 },
    { k: 'Ekuiti tersenarai di Bursa Malaysia', buku: 16852, pindah: 16851, pasaran: 7600 }
  ],
  jumlah: { buku: 18981, pindah: 19900, pasaran: 9729 },
  kandungan: '106 saham tersenarai + 1 syarikat perladangan + 29 aset hartanah',
  kandunganP: [156]
};

RD.sukuk = {
  p: [162, 163, 166, 171],
  siri: [
    { n: 'Sukuk Siri 1', prinsipal: 10000, nominal: 13200, tempoh: 7, ytm: 4.05, matang: 2026 },
    { n: 'Sukuk Siri 2', prinsipal: 9600, nominal: 14300, tempoh: 10, ytm: 4.10, matang: 2029 }
  ],
  tunai: 300,
  tunaiJadual: [{ bila: '30 Dis 2019', nilai: 100 }, { bila: '30 Dis 2020', nilai: 200 }],
  nominalJumlah: 27500,
  keuntunganTertunggak: 7650,
  pendapatanTertunggakTahunan: 840,
  pendapatanTertunggakTerkumpul: 2100,
  pendapatanTertunggakSetakat: '31 Disember 2021',
  peratusAsetLth: 31,
  peratusPendapatanLth: 26,
  ciri: ['Berkupon sifar', 'Tidak diberi penarafan', 'Tidak boleh diniagakan',
         'Tidak boleh dipindah milik', 'Unsecured', 'Terikat dengan Hak Penolakan Pertama'],
  jaminan: 'TIDAK dijamin Kerajaan. Hanya ada Surat Sokongan Kewangan Menteri Kewangan bertarikh 27 Mei 2019 ' +
           '— Suruhanjaya menilainya sebagai "Letter of Comfort" sahaja.',
  jaminanP: [164, 165]
};

RD.ujsbDana = {
  p: [165, 166],
  komitmen: 17800,
  komitmenPecahan: [
    { bila: '2020 (RMK-11)', nilai: 500 },
    { bila: 'RMK-12 & RMK-13', nilai: 17300, nota: 'anggaran purata RM1.73 bilion setahun' }
  ],
  purataTahunan: 1730,
  diterima: [
    { tahun: 2020, nilai: 500, bentuk: 'Geran Kerajaan',
      guna: 'RM300 juta bayaran saham tukar taraf syariah + RM200 juta penebusan awal Sukuk (30 Nov 2020)' },
    { tahun: 2021, nilai: 0, bentuk: 'Tiada',
      guna: 'RM1.5 bilion yang diluluskan dalam Belanjawan 2021 TIDAK diterima — keutamaan diberi kepada pemulihan ekonomi Covid-19' }
  ],
  tunaiDiterimaLth: 500,
  tunaiDiterimaLthNota: 'Bayaran tunai yang benar-benar diterima LTH setakat laporan, berbanding nilai pasaran ' +
    'aset yang dipindahkan RM9.73 bilion.'
};

/* Komitmen Jaminan Kerajaan — Jadual 5.3 (p165) */
RD.komitmenJaminan = {
  p: [165],
  tajuk: 'Komitmen Jaminan Kerajaan Persekutuan',
  rows: [
    { k: 'DanaInfra Nasional Berhad', y2020: 72320, y2021: 76020 },
    { k: 'Prasarana Malaysia Berhad', y2020: 38914, y2021: 38914 },
    { k: 'Malaysia Rail Link Sdn. Bhd.', y2020: 21530, y2021: 23177 },
    { k: 'Urusharta Jamaah Sdn. Bhd.', y2020: 20683, y2021: 21097, sorot: true },
    { k: 'Suria Strategic Energy Resources Sdn. Bhd.', y2020: 6951, y2021: 7276 },
    { k: 'GovCo Holdings Berhad', y2020: 7200, y2021: 5700 },
    { k: 'Jambatan Kedua Sdn. Bhd.', y2020: 5528, y2021: 5514 },
    { k: 'Turus Pesawat Sdn. Bhd.', y2020: 5310, y2021: 5310 },
    { k: 'MKD Kencana Sdn. Bhd.', y2020: 3500, y2021: 4500 },
    { k: 'SRC Kencana Sdn. Bhd.', y2020: 2485, y2021: 1785 },
    { k: 'Sentuhan Budiman Sdn. Bhd.', y2020: 800, y2021: 750 },
    { k: 'TRX City Sdn. Bhd.', y2020: 253, y2021: 192 },
    { k: 'Assets Global Network Sdn. Bhd.', y2020: 253, y2021: 202 }
  ],
  jumlah: { y2020: 185727, y2021: 190437 }
};

/* Hartanah UJSB — nilai pindah vs pasaran Dis 2021 (p161) */
RD.ujsbHartanah = {
  p: [161],
  unit: 'RM',
  rows: [
    { k: 'Tanah', kps: 1353361.48, pindah: 627006479, pasaran: 401080000 },
    { k: 'Menara pejabat', kps: 354021, pindah: 737399698, pasaran: 325000000 },
    { k: 'Lot kedai', kps: 120062, pindah: 46301759, pasaran: 33330000 },
    { k: 'Hotel', kps: 354134, pindah: 804058625, pasaran: 424270000 },
    { k: 'Perindustrian', kps: 35019, pindah: 31914386, pasaran: 19000000 }
  ],
  jumlah: { kps: 2216597.48, pindah: 2246680947, pasaran: 1202680000 },
  jppham: { lebih: 543.65, bawahNilai: 11, daripada: 29, p: 160 },
  dijual: { bilangan: 1, lokasi: 'Mukim Sungai Segamat, Daerah Segamat, Johor', nilai: 920000, tahun: 2020, p: 167 },
  tiadaBidaan: 17, masihPerluTawar: 10
};

/* Saham mewah yang dipindahkan (p162) */
RD.bluechip = {
  p: [162],
  tarikhPasaran: '31 Dis 2018',
  tarikhSemasa: '8 Jun 2022',
  rows: [
    { k: 'Axiata', pindahUnit: 6.00, pasaranUnit: 3.63, jun22: 3.04, jumlahPindah: 1422605154, jumlahPasaran: 931803255 },
    { k: 'Maxis', pindahUnit: 6.84, pasaranUnit: 5.43, jun22: 3.52, jumlahPindah: 879395994, jumlahPasaran: 681197584 },
    { k: 'MISC', pindahUnit: 7.43, pasaranUnit: 6.15, jun22: 7.30, jumlahPindah: 486532216, jumlahPasaran: 438925710 },
    { k: 'Digi', pindahUnit: 5.13, pasaranUnit: 4.24, jun22: 3.27, jumlahPindah: 576240738, jumlahPasaran: 500328955 },
    { k: 'TM', pindahUnit: 5.96, pasaranUnit: 2.33, jun22: 5.20, jumlahPindah: 241202959, jumlahPasaran: 107650200 }
  ],
  jumlah: { pindah: 3605977061, pasaran: 2659905704, jatuh: -946071357 },
  kriteria: 'Kejatuhan nilai melebihi 20%, ATAU kejatuhan melebihi RM45 juta, ATAU hilang status patuh syariah.',
  tidakPatuh: ['YTL Power International Berhad', 'Bumi Armada Berhad', 'Integrated Logistics Berhad', 'Yi-Lai Berhad'],
  tidakPatuhP: [162, 163]
};

/* Hak Penolakan Pertama — harga tawaran vs pasaran (p169) */
RD.rofr = {
  p: [169],
  rows: [
    { tik: 'WENG MK', k: 'WZ Satu', tarikh: '24 Mac 2020', unit: 25999115, rofr: 0.090, pasaran: 0.064, premium: 40.6 },
    { tik: 'EAST MK', k: 'Eastern & Oriental', tarikh: '25 Mac 2020', unit: 46400000, rofr: 0.365, pasaran: 0.335, premium: 9.0 },
    { tik: 'WENG MK', k: 'WZ Satu', tarikh: '31 Mac 2020', unit: 16570923, rofr: 0.085, pasaran: 0.075, premium: 13.3 },
    { tik: 'WCTHG MK', k: 'WCT Holdings', tarikh: '2 Apr 2020', unit: 42477625, rofr: 0.400, pasaran: 0.377, premium: 6.1 },
    { tik: 'KSL MK', k: 'KSL Holdings', tarikh: '6 Mei 2020', unit: 71800000, rofr: 0.610, pasaran: 0.630, premium: -3.2 },
    { tik: 'KSL MK', k: 'KSL Holdings', tarikh: '21 Mei 2020', unit: 35900000, rofr: 0.580, pasaran: 0.605, premium: -4.1 },
    { tik: 'HAPL MK', k: 'Hap Seng Plantations', tarikh: '29 Mei 2020', unit: 66074500, rofr: 1.650, pasaran: 1.570, premium: 5.1 },
    { tik: 'FGV MK', k: 'FGV Holdings', tarikh: '9 Dis 2020', unit: 283710100, rofr: 1.300, pasaran: 1.270, premium: 2.4 },
    { tik: 'ILB MK', k: 'Integrated Logistics', tarikh: '14 Mac 2022', unit: 20500000, rofr: 0.380, pasaran: 0.365, premium: 4.1 }
  ],
  perladangan: { minima: 280, notis: '7 Januari 2020', tolak: '24 Januari 2020', lokasi: 'Sri Aman, Sarawak', p: 169 }
};

RD.ujsbOperasi = {
  p: [167, 168],
  kaunterDipindah: 106, kaunterDilupus: 75, kaunterBaru: 329,
  pendapatanBaruMin: 200, pendapatanBaruMax: 300,
  kerugian2019: 9900,
  kerugian2019Nota: 'Kerugian UJSB bagi tahun berakhir 2019 kerana perbezaan nilai pemindahan dan nilai pasaran semasa.'
};

/* --------------------------------------------------------------------------
   9. BONUS (p137, p138, p139)
   -------------------------------------------------------------------------- */
RD.bonus = {
  p: [137, 139],
  rows: [
    { y: 2010, peruntukan: 25, kadar: '2.5 (tahunan) + 1 (khas)', taburan: '2–6 bulan', untung: null },
    { y: 2011, peruntukan: 35, kadar: '3 (tahunan) + 1 (khas)', taburan: '2–6 bulan', untung: null },
    { y: 2012, peruntukan: 38, kadar: '3.5 (tahunan) + 1 (khas)', taburan: '2.5–8 bulan', untung: null },
    { y: 2013, peruntukan: 49, kadar: '2.5–10 bulan', taburan: '2.5–10 bulan', untung: 2634, peratus: 1.9 },
    { y: 2014, peruntukan: 74, kadar: '1–11 (tahunan) + 2 (khas)', taburan: 'sehingga 13 bulan', untung: 2979, peratus: 2.5, sorot: true },
    { y: 2015, peruntukan: 65, kadar: '1–10 bulan', taburan: '1–10 bulan', untung: 3537, peratus: 1.7, nota: 'Jadual p139 menyebut RM61 juta bagi 2015 — lihat Percanggahan.' },
    { y: 2016, peruntukan: 25, kadar: '1–3 bulan', taburan: '1–3 bulan', untung: 2481, peratus: 1.0 },
    { y: 2017, peruntukan: 56.7, kadar: '1–6 bulan', taburan: '1–6 bulan', untung: 2798, peratus: 2.0 },
    { y: 2018, peruntukan: 10.8, kadar: '1 bulan', taburan: '1 bulan', untung: null },
    { y: 2019, peruntukan: 11.6, kadar: '1 bulan', taburan: '1 bulan', untung: null },
    { y: 2020, peruntukan: 14.1, kadar: '1 bulan', taburan: '1 bulan', untung: null }
  ],
  siling: { bulan: 2, rujukan: 'Pekeliling Perbendaharaan WP 7.2, perenggan 3.1.6',
    nota: 'Siling panduan purata bonus bagi anggota Bukan Eksekutif ialah tidak lebih dua bulan gaji, ' +
          'melainkan ramai pegawai berprestasi cemerlang (perenggan 3.1.8).', p: [136, 137] },
  kelulusan: ['Lembaga LTH', 'Menteri Hal Ehwal Agama', 'Kementerian Kewangan (MOF)'],
  kelulusanNota: 'Suruhanjaya: "Lazimnya Menteri Hal Ehwal Agama dan MOF hanya akan menerima cadangan ' +
    'pemberian bonus seperti yang disyorkan oleh Pengurusan LTH dan Lembaga."',
  kelulusanP: [138],
  taburanKpi: {
    p: [138],
    rows: [
      { g: 'A', pctKakitangan: 5, y2014: '9–11', y2015: '8–10' },
      { g: 'B', pctKakitangan: 15, y2014: '7–8', y2015: '6–7' },
      { g: 'C', pctKakitangan: 60, y2014: '5–6', y2015: '4–5' },
      { g: 'D', pctKakitangan: 15, y2014: '3–4', y2015: '2–3' },
      { g: 'E', pctKakitangan: 5, y2014: '1', y2015: '1' }
    ]
  }
};

RD.bonusKhas = {
  p: [142, 143, 144, 145],
  jumlahGabungan: 2193400,
  jumlahLaporan: 2200000,
  y2017: {
    entiti: 'TH Properties Sdn. Bhd.', kelulusan: 'Mesyuarat Exco TH Properties, 12 April 2017',
    alasan: 'Kejayaan projek "The Bay Pavillion" di Australia — siap 2015, habis dijual; pulangan didakwa AUD11.6 juta sehingga Disember 2016.',
    jumlah: 1148400,
    penerima: [
      { n: 'Datuk Azizan bin Abdul Rahman', v: 231000, jw: 'Pengerusi (menghadiri mesyuarat kelulusan)' },
      { n: "Dato' Roszali bin Othman", v: 189750, jw: 'Pengarah (menghadiri mesyuarat kelulusan)' },
      { n: 'Haji Abd Kadir bin Sahlan', v: 189750, jw: 'Pengarah (menghadiri mesyuarat kelulusan)' },
      { n: 'Nik Badrul Hisham bin Nik Hassan', v: 99000, jw: 'Pegawai' },
      { n: 'Anuarifaei bin Mustapa', v: 99000, jw: 'Pegawai' },
      { n: 'Nur Adlan bin Taib', v: 99000, jw: 'Pegawai' },
      { n: 'Zaidi bin Baharudin', v: 56100, jw: 'Pegawai' },
      { n: 'Haji Mohamed Rahim bin Ismail', v: 52800, jw: 'Pegawai' },
      { n: 'Aida binti Karim', v: 49500, jw: 'Pegawai' },
      { n: 'Marhaizah binti Mohamed Yusuf', v: 49500, jw: 'Pegawai' },
      { n: "Dato' Mohd Fazillah bin Mohd Ali", v: 33000, jw: 'Pengarah (menghadiri mesyuarat kelulusan)' }
    ],
    pelanggaran: 'Seksyen 230(2) dan 230(4) Akta Syarikat 2016 (Akta 777)'
  },
  y2018: {
    entiti: 'THP Australia Capital Sdn. Bhd.', kelulusan: 'Lembaga Pengarah THP Australia, 23 April 2018; ' +
      'Mesyuarat Agong 30 November 2018 (tujuh bulan selepas resolusi Lembaga)',
    alasan: 'TH Properties memperoleh keuntungan sebelum cukai RM34.84 juta pada 2017.',
    jumlah: 1045000,
    penerima: [
      { n: "Dato' Roszali bin Othman", v: 176500, jw: 'Pengarah' },
      { n: 'Haji Abd Kadir bin Sahlan', v: 176500, jw: 'Pengarah' },
      { n: "Dato' Azizan bin Abd Rahman", v: 167250, jw: 'Pengarah' },
      { n: 'Nik Badrul Hisham bin Nik Hassan', v: 101500, jw: 'Pegawai' },
      { n: 'Anuarifaei bin Mustapa', v: 101500, jw: 'Pegawai' },
      { n: 'Nur Adlan bin Taib', v: 101500, jw: 'Pegawai' },
      { n: 'Zaidi bin Baharudin', v: 63000, jw: 'Pegawai' },
      { n: 'Aida binti Karim', v: 63000, jw: 'Pegawai' },
      { n: 'Marhaizah binti Mohamed Yusuf', v: 63000, jw: 'Pegawai' },
      { n: 'Haji Mohamed Rahim bin Ismail', v: 31250, jw: 'Pegawai' }
    ],
    pelanggaran: 'Seksyen 230(3) Akta Syarikat 2016 (Akta 777)',
    komposisi: '10 penerima: 2 Pengarah, 2 bekas Pengarah, 6 pegawai'
  }
};

/* --------------------------------------------------------------------------
   10. HAFIS / KOS HAJI (p203, p204, p205)
   -------------------------------------------------------------------------- */
RD.hafis = {
  p: [204],
  sejarah: [
    { y: 2014, kos: 16155, bayaran: 9980, hafis: 6175, jumlahJuta: 106 },
    { y: 2015, kos: 17270, bayaran: 9980, hafis: 7290, jumlahJuta: 135 },
    { y: 2016, kos: 18890, bayaran: 9980, hafis: 8910, jumlahJuta: 160 },
    { y: 2017, kos: 19550, bayaran: 9980, hafis: 9570, jumlahJuta: 298 },
    { y: 2018, kos: 22450, bayaran: 9980, hafis: 12470, jumlahJuta: 314 },
    { y: 2019, kos: 22900, bayaran: 9980, hafis: 12920, jumlahJuta: 299 }
  ],
  tiadaHaji: [2020, 2021],
  tiadaHajiNota: 'Tiada penghantaran jemaah haji pada 2020 dan 2021 (pandemik Covid-19).',
  unjuran: {
    p: [205, 203],
    rows: [
      { y: 2022, kos: 25540, bayaran: 12980, hafis: 12560, pct: 49.2, jumlahRibu: 376800 },
      { y: 2023, kos: 26280, bayaran: 12980, hafis: 13300, pct: 50.6, jumlahRibu: 399000 },
      { y: 2024, kos: 28160, bayaran: 12980, hafis: 15180, pct: 53.9, jumlahRibu: 455400 },
      { y: 2025, kos: 29570, bayaran: 12980, hafis: 16590, pct: 56.1, jumlahRibu: 497700 },
      { y: 2026, kos: 31040, bayaran: 12980, hafis: 18060, pct: 58.2, jumlahRibu: 541800 },
      { y: 2027, kos: 32592, bayaran: 12980, hafis: 19612, pct: 60.2, jumlahRibu: 588360 },
      { y: 2028, kos: 34221, bayaran: 12980, hafis: 21241, pct: 62.1, jumlahRibu: 637230 },
      { y: 2029, kos: 35932, bayaran: 12980, hafis: 22952, pct: 63.9, jumlahRibu: 688560 },
      { y: 2030, kos: 37729, bayaran: 12980, hafis: 24749, pct: 65.6, jumlahRibu: 742470 }
    ],
    jemaahTersirat: 30000,
    jemaahTersiratNota: 'Jumlah HAFIS ÷ HAFIS seorang = 30,000 jemaah dalam setiap tahun unjuran. ' +
      'Ini menunjukkan unjuran menggunakan kuota tetap 30,000, bukan kuota yang bertambah.'
  },
  bayaranBaru2022: [
    { kump: 'Jemaah B40', bayaran: 10980 },
    { kump: 'Jemaah bukan B40', bayaran: 12980 }
  ],
  bekuBayaran: { dari: 2009, hingga: 2021, tahun: 13, nilai: 9980, p: [204, 211] },
  kesanHibah: { juta: 400, peratusHibah: 0.4, p: [110, 206] },
  totalSejak2001: { nilai: 2020, p: 229, nota: 'Jumlah HAFIS diberi kepada jemaah Muassasah sejak 2001: RM2.02 bilion.' },
  kosJangkaPanjang: [
    { y: 2030, kos: 35000, nota: 'disebut dalam ayat naratif p203' },
    { y: 2050, kos: 50000, nota: 'disebut dalam ayat naratif p203' }
  ],
  masaMenunggu: { sekarang: 135, cadangan: 33, p: [208, 209],
    nota: 'Perenggan 3.16.17 menyebut 135 tahun → 33 tahun; Ringkasan Eksekutif dan perenggan 4.4.22 menyebut 130 tahun → 33 tahun.' },
  depositMinima: { sekarang: 1300, cadangan: 12980, p: [207, 236] },
  kuota: { sekarang: 30000, sasaran2030: 60000, p: 210 },
  jemaahDibawa: { nilai: 1.46, unit: 'juta', dari: 1963, hingga: 2021, p: 229 },
  hibahTerkumpul: { nilai: 37.52, dari: 1966, hingga: 2021, p: 229, nota: 'Jumlah agihan keuntungan termasuk hibah haji.' }
};

/* --------------------------------------------------------------------------
   11. KEUNTUNGAN BERSIH (p139) — sebagai siri berasingan
   -------------------------------------------------------------------------- */
RD.untungBersih = {
  p: [139],
  rows: [
    { y: 2013, v: 2634 }, { y: 2014, v: 2979 }, { y: 2015, v: 3537 },
    { y: 2016, v: 2481 }, { y: 2017, v: 2798 }
  ],
  konflik: { y: 2017, pwc: 3412, ringkasan: 3400, p: [149, 21],
    nota: 'Untuk 2017, jadual bonus p139 menyebut keuntungan bersih RM2,798 juta, ' +
          'laporan PwC p149 menyebut keuntungan tahun RM3,412 juta, dan Ringkasan Eksekutif menyebut "RM3.4 bilion".' }
};
