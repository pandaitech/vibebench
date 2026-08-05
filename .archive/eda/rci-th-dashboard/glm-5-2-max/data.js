/* ==========================================================================
   data.js — Model data ekstrak dari Laporan RCI Tabung Haji (2014–2020)
   Sumber: teks Markdown OCR laporan asal (249 halaman PDF).
   Konvensyen:
   - p = nombor halaman PDF (anchor #pdf-page-N pada versi Markdown)
   - tanda `sr` = data terbitan (kiraan kami); `unj` = unjuran LTH/RCI; `sr` digunakan sebagai bendera
   - nilai RM kecuali dinyatakan
   ========================================================================== */
var RD = window.RD = window.RD || {};

RD.meta = {
  tajukPenuh: 'Laporan Suruhanjaya Siasatan Diraja bagi Menyiasat Isu Pengurusan dan Operasi Lembaga Tabung Haji 2014–2020',
  skop: '2014–2020 (dengan unjuran hingga 2030 dan tarikh lampau sejak 1951)',
  persembahan: '30 Ogos 2022',
  ditandatangani: '19 Julai 2022',
  mukaSurat: 249,
  pesuruhjaya: [
    { n: 'Tun Md Raus bin Sharif', peranan: 'Pengerusi (Mantan Ketua Hakim Negara)' },
    { n: 'Tan Sri Samsudin bin Osman', peranan: 'Mantan Ketua Setiausaha Negara' },
    { n: 'Tan Sri Abdul Rashid bin Hussain', peranan: 'Pengasas RHB Group' },
    { n: 'Tan Sri Dr. Mohd. Munir bin Abdul Majid', peranan: 'Pengerusi CARI ASEAN Research' },
    { n: 'Profesor Dr. Asmadi bin Mohamed Naim', peranan: 'Naib Canselor UniSHAMS' },
    { n: 'Norsyahrin bin Hamidon', peranan: 'Akauntan Bertauliah' }
  ],
  setiausaha: 'Datuk Hajah Hakimah binti Mohd Yusoff (Ketua Pengarah JAKIM)',
  tempohSiasatan: '6 bulan (20 Jan 2022 – 19 Julai 2022)',
  saksi: '45 saksi (Akuan Berkanun); 16 dipanggil memberi keterangan lisan',
  objektif: [
    'Meneliti isu LTH 2014–2020, merujuk penemuan PwC, EY dan Roland Berger',
    'Menentukan sama ada terdapat penyembunyian maklumat dan kenyataan mengelirukan',
    'Mengesyorkan tindakan terhadap mana-mana pihak yang melanggar undang-undang'
  ]
};

/* --------------------------------------------------------------------------
   1. KEDUDUKAN ASET vs LIABILITI + AGIHAN HIBAH  (PwC, p147; p112)
   nilai dalam RM juta; liabiliti negatif
   -------------------------------------------------------------------------- */
RD.posisi = {
  p: [147, 113],
  nota: 'Jadual asal PwC. "Liabiliti" merangkumi Kumpulan Wang Pendeposit. ' +
        '2013 hanya muncul dalam jadual p147; tiada dalam jadual p113.',
  rows: [
    { y: 2013, aset: 48778, liab: -43696, pra: 5082, agihan: -2632, pasca: 2450 },
    { y: 2014, aset: 54751, liab: -51866, pra: 2885, agihan: -3237, pasca: -352 },
    { y: 2015, aset: 60196, liab: -60062, pra: 134, agihan: -3220, pasca: -3086 },
    { y: 2016, aset: 64321, liab: -65581, pra: -1260, agihan: -2871, pasca: -4131 },
    { y: 2017, aset: 70317, liab: -71086, pra: -769, agihan: -3324, pasca: -4093 }
  ]
};

/* --------------------------------------------------------------------------
   2. HIBAH — kadar tahunan + haji, jumlah RM (p120, p130)
   -------------------------------------------------------------------------- */
RD.hibahKadar = {
  p: [120, 130],
  rows: [
    { y: 2014, t: 6.25, h: 2.00 },
    { y: 2015, t: 5.00, h: 3.00 },
    { y: 2016, t: 4.25, h: 1.50 },
    { y: 2017, t: 4.50, h: 1.75 },
    { y: 2018, t: 1.25, h: 0 },
    { y: 2019, t: 3.05, h: 0 },
    { y: 2020, t: 3.10, h: 0 },
    { y: 2021, t: 3.10, h: null }
  ],
  nota: '2021 kadar disebut dalam jadual p120. Jumlah ringgit 2021 tidak diberikan dalam laporan.'
};
RD.hibahJumlah = {
  p: [130],
  unit: 'RM000 (ribu)',
  rows: [
    { y: 2014, t: 2988053, h: 249143, j: 3237196 },
    { y: 2015, t: 2807369, h: 413005, j: 3220374 },
    { y: 2016, t: 2645625, h: 225197, j: 2870822 },
    { y: 2017, t: 3042184, h: 281557, j: 3323741 },
    { y: 2018, t: 922959,  h: 0,      j: 922959 },
    { y: 2019, t: 2140538, h: 0,      j: 2140538 },
    { y: 2020, t: 2242141, h: 0,      j: 2242141 }
  ]
};

/* --------------------------------------------------------------------------
   3. JAMBATAN RAV 2017 (p116)
   -------------------------------------------------------------------------- */
RD.rav = {
  p: [116, 113],
  asetAudit: 70317, uplift: 4466, asetRav: 74783, liab: 74410, bersih: 373,
  thp: { dalamRav: 2294, asasHartanah: 4600, olehPenilaiBertauliah: 556, olehAnggaranMgmt: 4044 },
  nota: 'Uplift RAV 2017 RM4.466 bilion termasuk TH Plantations RM2.294 bilion. ' +
        'Daripada nilai hartanah RM4.6 bilion, hanya RM556 juta disahkan penilai profesional; ' +
        'RM4.044 bilion ialah anggaran pengurusan semata-mata.',
  banding: { janLiabBersih: 1164, pwcLiabBersih: 4093, janNota: 'PwC menganggarkan liabiliti bersih sebenar 2017 RM4.093 bilion.' }
};

/* --------------------------------------------------------------------------
   4. POLISI ROSOT NILAI 2017 — kesan menukar ambang (p148, p115, p116)
   -------------------------------------------------------------------------- */
RD.rosot = {
  p: [148, 115, 116],
  rows: [
    { id: 'frs', label: 'Ikut FRS 139 sepenuhnya', ambang: '—', kesan: 1310, s: 'JAN (Akuan Berkanun)', p: 116,
      d: 'Rosot nilai aset kewangan yang SEPATUTNYA direkodkan pada 2017 mengikut piawaian.' },
    { id: 'p70', label: 'Ambang lama — turun >70% kos', ambang: '>70%', kesan: 1313, s: 'PwC', p: 148,
      d: 'Polisi sebelum diubah dalam 2017. Hampir sama dengan kiraan JAN — dua sumber berbeza.' },
    { id: 'p85', label: 'Diubah pertama — turun >85%', ambang: '>85%', kesan: 171, s: 'PwC', p: 148,
      d: 'Perubahan pertama pada tahun kewangan 2017.' },
    { id: 'p90', label: 'Diubah lagi — turun >90%', ambang: '>90%', kesan: 1, s: 'PwC', p: 148,
      d: 'Perubahan kedua dalam tempoh satu hari. Rosot nilai akhirnya hanya RM1 juta.' }
  ],
  frsic: { turun: 20, bulan: 12, p: 114,
    d: 'Garis panduan FRSIC 14 (Institut Akauntan Malaysia): kerugian "signifikan" bila nilai jatuh 20%; "berlanjutan" bila melebihi 12 bulan.' },
  tidakDiambilKira: { frs139: 1310, subsidiariBersekutu: 227.81, jumlah: 1537, p: [116, 117],
    thHeavy: { v: 164.58, p: 18,
      d: 'RM227.81 juta melibatkan 3 subsidiari + 3 bersekutu; terbesar TH Heavy Engineering Berhad RM164.58 juta.' } },
  lebihan: { bakiTahunanMampu: 2700, kadarMampu: 4, bakiBulananDibayar: 3310, kadarDibayar: 6.25, lebihan: 610, pOver: 22.5, p: [131, 115],
    nota: 'JAN dapatan: draf penyata tunjukkan kemampuan hibah 2017 hanya RM2.70 bilion (4%, baki tahunan). ' +
          'Lembaga bertukar ke baki bulanan pada 6.25%, bayaran menjadi RM3.31 bilion. Lebihan keluar ~RM600 juta.' }
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
  terkumpul: { simpanan: 162, pelarasan: -4845, kerugian: -4683,
    nota: 'Simpanan terkumpul terlaras pada 31 Disember 2017.' }
};

RD.untungBersih = {
  p: [139],
  rows: [
    { y: 2013, v: 2634 }, { y: 2014, v: 2979 }, { y: 2015, v: 3537 },
    { y: 2016, v: 2481 }, { y: 2017, v: 2798 }
  ],
  konflik: { y: 2017, bonusJadual: 2798, pwcKeuntungan: 3412, ringkasan: 3400, p: [149, 21],
    nota: 'Mungkin berbeza asas: sebelum vs selepas zakat, sebelum vs selepas cukai.' }
};

/* --------------------------------------------------------------------------
   6. DEPOSIT & PENDEPOSIT (p122–123, p171, p218, p229)
   -------------------------------------------------------------------------- */
RD.deposit = {
  p: [122, 123, 171, 218, 229],
  titik: [
    { label: 'Sebelum pengumuman hibah 2018', v: 73, bila: 'Awal 2019', anggaran: true, p: 122 },
    { label: 'Akhir 2019 (selepas hibah 1.25%)', v: 69, bila: 'Dis 2019', anggaran: false, p: 122 },
    { label: 'Akhir 2020', v: 76, bila: 'Dis 2020', anggaran: true, p: 123 },
    { label: 'Semasa laporan disiapkan', v: 88, bila: '21 Mei 2022', anggaran: false, p: 171 },
    { label: 'Unjuran LTH (dalam dua tahun)', v: 100, bila: '~2024', unjuran: true, p: 218 }
  ],
  tumpuan: { bawah2000: 65, top5pct: 75, p: [208, 216],
    d: '65% pendeposit simpanan ≤ RM2,000; dianggarkan 75% deposit dipegang hanya 5% pendeposit.' },
  danaMinimaHafis: { v: 60, p: 111, d: 'Dana minima LTH perlu untuk menampung subsidi haji pada tahap kini.' },
  jaminanKerajaan: { v: 88, p: 235, d: 'Jaminan Kerajaan (seksyen 24 Akta 535) ke atas deposit pendeposit.' },
  jemaahSentiasahaji: { v: 8.6, p: 229, d: 'Jumlah pendeposit semasa laporan disiapkan (22 Julai 2022).' }
};

/* --------------------------------------------------------------------------
   7. RIZAB (p104–106)
   -------------------------------------------------------------------------- */
RD.rizab = {
  p: [104, 105, 106],
  nota: 'Perbendaharaan tidak pernah meluluskan baki minima Kumpulan Wang Rizab walaupun disyaratkan seksyen 22(3)(b) Akta 535 dan wakil Perbendaharaan ada dalam Lembaga.',
  guna: [
    { y: '2012, 2014, 2016', apa: 'Roland Berger dapati LTH guna rizab untuk bayar hibah', p: 104 },
    { y: '2020 & 2021', apa: 'LTH guna rizab untuk menampung agihan hibah', p: 106 }
  ],
  sasaran: { rpk: 5, nilaiRm: 3500, note: 'Penghijrahan 2% daripada keuntungan tahunan selepas zakat → RPK.' }
};

/* --------------------------------------------------------------------------
   8. UJSB — pemindahan aset, sukuk, dana (p159, 162, 163, 165–167)
   -------------------------------------------------------------------------- */
RD.ujsb = {
  p: [159, 162, 163, 165, 166, 167],
  penubuhan: '14 Disember 2018',
  pemindahan: {
    tarikh: '27 Disember 2018',
    kandungan: '106 saham tersenarai + 1 syarikat perladangan + 29 aset hartanah',
    rows: [
      { k: 'Hartanah & tanah', buku: 1411, pindah: 2247, pasaran: 1411 },
      { k: 'Syarikat perladangan', buku: 718, pindah: 802, pasaran: 718 },
      { k: 'Ekuiti tersenarai Bursa Malaysia', buku: 16852, pindah: 16851, pasaran: 7600 }
    ],
    jumlah: { buku: 18981, pindah: 19900, pasaran: 9729 },
    premium: 10200, nota: 'Premium RM10.2 bilion ke atas nilai pasaran ketika itu.'
  },
  sukuk: {
    siri: [
      { n: 'Sukuk Siri 1', prinsipal: 10000, nominal: 13200, tempoh: 7, ytm: 4.05, matang: '2026' },
      { n: 'Sukuk Siri 2', prinsipal: 9600, nominal: 14300, tempoh: 10, ytm: 4.10, matang: '2029' }
    ],
    tunai: 300,
    tunaiJadual: [{ bila: '30 Dis 2019', v: 100 }, { bila: '30 Dis 2020', v: 200 }],
    nominalJumlah: 27500,
    pendapatanTertunggakTahunan: 840,
    pendapatanTertunggakTerkumpul: 2100,
    peratusAsetLth: 31, peratusPendapatanLth: 26,
    ciri: ['Berkupon sifar', 'Tiada penarafan', 'Tidak boleh diniagakan', 'Tidak boleh dipindah milik', 'Unsecured', 'Hak Penolakan Pertama'],
    jaminan: 'TIDAK dijamin Kerajaan. Hanya Surat Sokongan Kewangan Menteri Kewangan (27 Mei 2019) — "Letter of Comfort" sahaja.',
   Nota: 'Sukuk menyumbang 26% pendapatan tahunan LTH; melebihi 1/3 jumlah agihan hibah tahunan.'
  },
  danaKerajaan: {
    p: [165, 166, 167],
    komitmen: 17800,
    pecahan: [
      { bila: '2020 (RMK-11)', v: 500 },
      { bila: 'RMK-12 & RMK-13', v: 17300, nota: 'anggaran purata RM1.73 bilion setahun' }
    ],
    diterima: [
      { tahun: 2020, v: 500, bentuk: 'Geran Kerajaan',
        guna: 'RM300j (saham tukar taraf syariah) + RM200j (penebusan awal Sukuk, 30 Nov 2020)' },
      { tahun: 2021, v: 0, bentuk: 'Tiada',
        guna: 'RM1.5 bilion yang diluluskan Belanjawan 2021 TIDAK diterima — keutamaan Covid-19' }
    ]
  }
};

/* Saham blue-chip dipindah (p162) */
RD.bluechip = {
  p: [162, 163],
  tarikhPasaran: '31 Dis 2018',
  tarikhSemasa: '8 Jun 2022',
  rows: [
    { k: 'Axiata', pindah: 6.00, pasaran: 3.63, jun22: 3.04, jumlahPindah: 1422605154, jumlahPasaran: 931803255, jatuhPct: 39.5 },
    { k: 'Maxis', pindah: 6.84, pasaran: 5.43, jun22: 3.52, jumlahPindah: 879395994, jumlahPasaran: 681197584, jatuhPct: 20.6 },
    { k: 'MISC', pindah: 7.43, pasaran: 6.15, jun22: 7.30, jumlahPindah: 486532216, jumlahPasaran: 438925710, jatuhPct: 17.2 },
    { k: 'Digi', pindah: 5.13, pasaran: 4.24, jun22: 3.27, jumlahPindah: 576240738, jumlahPasaran: 500328955, jatuhPct: 17.3 },
    { k: 'TM', pindah: 5.96, pasaran: 2.33, jun22: 5.20, jumlahPindah: 241202959, jumlahPasaran: 107650200, jatuhPct: 60.9 }
  ],
  jumlah: { pindah: 3605977061, pasaran: 2659905704, jatuh: 946071357 },
  kriteria: 'Kejatuhan >20%, atau kejatuhan >RM45 juta, atau hilang status patuh syariah.',
  tidakPatuh: ['YTL Power International', 'Bumi Armada', 'Integrated Logistics', 'Yi-Lai'],
  tidakPatuhP: [162, 163]
};

/* ROFR (Hak Penolakan Pertama) — 9 transaksi, harga tawaran vs harga pasaran (p169) */
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
    { tik: 'ILB MK', k: 'Integrated Logistics', tarikh: '14 Mar 2022', unit: 20500000, rofr: 0.380, pasaran: 0.365, premium: 4.1 }
  ]
};

/* Hartanah UJSB — nilai pemindahan vs pasaran 31 Dis 2021 (p161) */
RD.hartanahUjsb = {
  p: [161],
  rows: [
    { k: 'Tanah', kps: 1353361, pindah: 627006479, pasaran: 401080000 },
    { k: 'Menara pejabat', kps: 354021, pindah: 737399698, pasaran: 325000000 },
    { k: 'Lot kedai', kps: 120062, pindah: 46301759, pasaran: 33330000 },
    { k: 'Hotel', kps: 354134, pindah: 804058625, pasaran: 424270000 },
    { k: 'Perindustrian', kps: 35019, pindah: 31914386, pasaran: 19000000 }
  ],
  jumlah: { kps: 2216597, pindah: 2246680947, pasaran: 1202680000 },
  dijual: { n: 1, lokasi: 'Mukim Sg Segamat, Johor', v: 920000, tahun: 2020, p: 167 },
  tiadaBidaan: 17, masihPerluTawar: 10
};

/* Komitmen Jaminan Kerajaan — Jadual 5.3 (p165) */
RD.komitmenJaminan = {
  p: [165],
  rows: [
    { k: 'DanaInfra Nasional Berhad', y2020: 72320, y2021: 76020 },
    { k: 'Prasarana Malaysia Berhad', y2020: 38914, y2021: 38914 },
    { k: 'Malaysia Rail Link Sdn. Bhd.', y2020: 21530, y2021: 23177 },
    { k: 'Urusharta Jamaah Sdn. Bhd.', y2020: 20683, y2021: 21097, sorot: true },
    { k: 'Suria Strategic Energy Resources', y2020: 6951, y2021: 7276 },
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

/* --------------------------------------------------------------------------
   9. BONUS (p137, p139, p141–144)
   -------------------------------------------------------------------------- */
RD.bonus = {
  p: [137, 139],
  rows: [
    { y: 2010, peruntukan: 25, kadar: '2.5+1', taburan: '2–6 bln', untung: null, persen: null },
    { y: 2011, peruntukan: 35, kadar: '3+1', taburan: '2–6 bln', untung: null, persen: null },
    { y: 2012, peruntukan: 38, kadar: '3.5+1', taburan: '2.5–8 bln', untung: null, persen: null },
    { y: 2013, peruntukan: 49, kadar: '2.5–10 bln', taburan: '2.5–10 bln', untung: 2634, persen: 1.9 },
    { y: 2014, peruntukan: 74, kadar: '1–11+2 Khas', taburan: 'sehingga 13 bln', untung: 2979, persen: 2.5, sorot: true },
    { y: 2015, peruntukan: 65, kadar: '1–10 bln', taburan: '1–10 bln', untung: 3537, persen: 1.7, nota: 'p139 sebut RM61j bagi 2015 — percanggahan' },
    { y: 2016, peruntukan: 25, kadar: '1–3 bln', taburan: '1–3 bln', untung: 2481, persen: 1.0 },
    { y: 2017, peruntukan: 56.7, kadar: '1–6 bln', taburan: '1–6 bln', untung: 2798, persen: 2.0 },
    { y: 2018, peruntukan: 10.8, kadar: '1 bln', taburan: '1 bln', untung: null, persen: null },
    { y: 2019, peruntukan: 11.6, kadar: '1 bln', taburan: '1 bln', untung: null, persen: null },
    { y: 2020, peruntukan: 14.1, kadar: '1 bln', taburan: '1 bln', untung: null, persen: null }
  ],
  siling: { bulan: 2, rujukan: 'Pekeliling Perbendaharaan WP 7.2, perenggan 3.1.6',
    nota: 'Panduan purata bonus anggota Bukan Eksekutif — tidak lebih 2 bulan gaji melainkan ramai pegawai cemerlang.', p: [136, 137] },
  kelulusan: ['Lembaga LTH', 'Menteri Hal Ehwal Agama', 'Kementerian Kewangan (MOF)'],
  nota: 'Suruhanjaya: "Lazimnya Menteri Hal Ehwal Agama dan MOF hanya menerima cadangan seperti disyorkan Pengurusan & Lembaga."',
  p: [138]
};

RD.bonusKhas = {
  p: [141, 142, 143, 144],
  y2017: {
    entiti: 'TH Properties Sdn. Bhd.',
    kelulusan: 'Mesyuarat Exco TH Properties, 12 April 2017',
    alasan: 'Kejayaan projek The Bay Pavillion, Australia — siap 2015, habis dijual; pulangan didakwa AUD11.6 juta (Dis 2016).',
    jumlah: 1148400,
    penerima: [
      { n: 'Datuk Azizan bin Abdul Rahman', v: 231000, jw: 'Pengerusi (hadir mesyuarat)' },
      { n: "Dato' Roszali bin Othman", v: 189750, jw: 'Pengarah (hadir)' },
      { n: 'Haji Abd Kadir bin Sahlan', v: 189750, jw: 'Pengarah (hadir)' },
      { n: 'Nik Badrul Hisham bin Nik Hassan', v: 99000, jw: 'Pegawai' },
      { n: 'Anuarifaei bin Mustapa', v: 99000, jw: 'Pegawai' },
      { n: 'Nur Adlan bin Taib', v: 99000, jw: 'Pegawai' },
      { n: 'Zaidi bin Baharudin', v: 56100, jw: 'Pegawai' },
      { n: 'Haji Mohamed Rahim bin Ismail', v: 52800, jw: 'Pegawai' },
      { n: 'Aida binti Karim', v: 49500, jw: 'Pegawai' },
      { n: 'Marhaizah binti Mohamed Yusuf', v: 49500, jw: 'Pegawai' },
      { n: "Dato' Mohd Fazillah bin Mohd Ali", v: 33000, jw: 'Pengarah (hadir)' }
    ],
    pelanggaran: 'Seksyen 230(2) & 230(4) Akta Syarikat 2016 (Akta 777)',
    pelanggaranP: [144]
  },
  y2018: {
    entiti: 'THP Australia Capital Sdn. Bhd.',
    kelulusan: 'Lembaga 23 April 2018; Mesyuarat Agong 30 November 2018 (7 bulan selepas)',
    alasan: 'Keuntungan sebelum cukai RM34.84 juta (2017).',
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
    pelanggaran: 'Seksyen 230(3) Akta Syarikat 2016 (Akta 777)'
  },
  jumlahGabungan: 2193400
};

/* --------------------------------------------------------------------------
   10. HAFIS / KOS HAJI (p204, p205, 203, 211)
   -------------------------------------------------------------------------- */
RD.hafis = {
  p: [204, 205],
  sejarah: [
    { y: 2014, kos: 16155, bayaran: 9980, hafis: 6175, jumlahJuta: 106 },
    { y: 2015, kos: 17270, bayaran: 9980, hafis: 7290, jumlahJuta: 135 },
    { y: 2016, kos: 18890, bayaran: 9980, hafis: 8910, jumlahJuta: 160 },
    { y: 2017, kos: 19550, bayaran: 9980, hafis: 9570, jumlahJuta: 298 },
    { y: 2018, kos: 22450, bayaran: 9980, hafis: 12470, jumlahJuta: 314 },
    { y: 2019, kos: 22900, bayaran: 9980, hafis: 12920, jumlahJuta: 299 }
  ],
  tiadaHaji: [2020, 2021],
  unjuran: {
    p: [205],
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
    ]
  },
  bayaranBaru2022: [{ kump: 'B40', v: 10980 }, { kump: 'Bukan B40', v: 12980 }],
  bekuBayaran: { dari: 2009, hingga: 2021, tahun: 13, nilai: 9980, p: [204, 211] },
  totalSejak2001: { v: 2020, p: 229, nota: 'Jumlah HAFIS sejak 2001: RM2.02 bilion.' },
  masaMenunggu: { sekarang: 135, cadangan: 33, p: [208, 209],
    nota: 'Perenggan 3.16.17: 135→33; Ringkasan Eksekutif/perenggan 4.4.22: 130→33 — percanggahan.' },
  depositMinima: { sekarang: 1300, cadangan: 12980, p: [207, 236] },
  kuota: { sekarang: 30000, sasaran2030: 60000, p: 210 },
  jemaahDibawa: { v: 1.46, dari: 1963, hingga: 2021, p: 229 },
  hibahTerkumpul: { v: 37.52, dari: 1966, hingga: 2021, p: 229,
    nota: 'Jumlah agihan keuntungan termasuk hibah haji.' }
};

/* --------------------------------------------------------------------------
   11. PELABURAN BERMASALAH — 14 kes audit forensik (p177–193, p234)
   -------------------------------------------------------------------------- */
RD.pelaburan = [
  {
    id: 'thip', n: 'PT TH Indo Plantations (THIP)', sektor: 'Perladangan', lokasi: 'Riau, Sumatera, Indonesia',
    p: [177, 178, 194], status: 'polis',
    modus: 'Penjualan aset', pegangan: '95% ekuiti dijual ke PT Borneo Pacific',
    skala: 910, mata: 'USD juta',
    angka: [
      { k: 'Keluasan tanah', v: '83,000 hektar' },
      { k: 'Harga asal', v: 'USD910 juta' },
      { k: 'Pengurangan harga', v: 'USD100 juta' },
      { k: 'Pendahuluan LTH', v: 'USD178.6 juta' }
    ],
    isu: 'Syer dipindahkan SEBELUM bayaran penuh diterima. Harga dikurangkan USD100 juta. LTH terpaksa beri pendahuluan USD178.6 juta yang sepatutnya dilunaskan pembeli.',
    tindakan: 'Siasatan forensik dalaman + laporan polis (Dang Wangi/31331/2018, 30 Nov 2018). Siasatan rentas sempadan memerlukan kebenaran pihak berkuasa Indonesia.'
  },
  {
    id: 'emrail', n: 'Emrail Sdn. Bhd.', sektor: 'Pelaburan', lokasi: 'Malaysia',
    p: [178, 179], status: 'timbangtara',
    modus: 'Put option gagal', pegangan: '15.3% ekuiti dibeli 7 Jun 2016',
    skala: 19.3, mata: 'RM juta (rosot nilai)',
    angka: [{ k: 'Bayaran pembelian', v: 'RM20.17 juta' }, { k: 'Harga put option', v: 'RM20.3 juta' },
            { k: 'Diterima', v: 'RM2 juta' }, { k: 'Rosot nilai (31 Dis 2020)', v: 'RM19.3 juta' }],
    isu: 'Penyenaraian dibatalkan; sasaran keuntungan RM36.1 juta tak capai. LHSB hanya bayar RM2 juta daripada RM20.3 juta.',
    tindakan: 'Writ Mahkamah Tinggi KL (8 Sep 2021) → timbangtara AIAC (22 Apr 2022).'
  },
  {
    id: 'wellspring', n: 'Wellspring Worldwide Limited', sektor: 'Teknologi', lokasi: 'Malaysia',
    p: [179, 180], status: 'mahkamah',
    modus: 'Put option gagal', pegangan: '10% ekuiti dibeli 21 Sep 2014',
    skala: 19.03, mata: 'RM juta',
    angka: [{ k: 'Bayaran pembelian', v: 'RM18.4 juta' }, { k: 'Put option', v: 'RM19.03 juta' },
            { k: 'Diterima', v: 'RM0' }, { k: 'Perintah mahkamah (5 Okt 2018)', v: 'RM20.8 juta' }],
    isu: 'Promoters (Mohamed Ridzuan Nor Mohamed & Andy Farouk Muhamad Nasim) gagal bayar walau diperintah mahkamah.',
    tindakan: 'Notis kebankruptan dibenarkan 25 Januari 2022.'
  },
  {
    id: 'dssb', n: 'Deru Semangat Sdn. Bhd. (DSSB)', sektor: 'Perladangan sawit', lokasi: 'Mukim Tembeling, Pahang',
    p: [180, 181], status: 'selesai',
    modus: 'Usaha sama', pegangan: '55% ekuiti daripada pemilik asal',
    skala: 257, mata: 'RM juta dikeluarkan',
    angka: [{ k: 'Kelulusan', v: 'RM526.16 juta' }, { k: 'Ambil alih 55%', v: 'RM231 juta' },
            { k: 'Pembiayaan ladang', v: 'RM295.16 juta' }, { k: 'Dikeluarkan', v: 'RM257 juta' },
            { k: 'Dirosotnilai kepada', v: 'RM32 juta' }],
    isu: 'Pembalakan hutan simpan melanggar polisi NDPE pembeli utama Wilmar — hasil sawit tak dapat dijual.',
    tindakan: 'Dikembalikan kepada YAM Tengku Muda Pahang RM259 juta; komitmen baki RM258 juta dinepatkan.',
    rugiRm: 225, laburRm: 257
  },
  {
    id: 'trurich', n: 'Trurich Resources Sdn. Bhd.', sektor: 'Perladangan sawit', lokasi: 'Kalimantan, Indonesia',
    p: [181, 182, 195], status: 'polis',
    modus: 'Usaha sama', pegangan: 'JV dengan FGV Kalimantan Sdn. Bhd. (30 Nov 2009)',
    skala: 364.31, mata: 'RM juta (rosot nilai penuh)',
    angka: [{ k: 'Pelaburan LTH', v: 'RM364.31 juta' }, { k: 'Pinjaman ke Maybank tertunggak', v: 'USD179 juta' },
            { k: 'Liabiliti semasa bersih 2017', v: 'RM119.67 juta' }, { k: 'Sasaran tanah asal', v: '200,000 hektar' }],
    isu: 'Laporan polis mendakwa laporan kesesuaian tanah dimanipulasi — 40,880 hektar Kalimantan ≈ USD58 juta.',
    tindakan: 'Polis (Dang Wangi/32724/2018, 13 Dis 2018). Menteri lulus pelupusan anak syarikat (22 Dis 2020).',
    rugiRm: 364.31, laburRm: 364.31
  },
  {
    id: 'abraj', n: 'Abraj Sdn. Bhd.', sektor: 'Hartanah', lokasi: 'Malaysia',
    p: [182, 183], status: 'selesai',
    modus: 'Usaha sama', pegangan: '50/50 dengan Amanah Raya Berhad (11 Nov 2009)',
    skala: 40.25, mata: 'RM juta (rosot nilai)',
    angka: [{ k: 'Ekuiti LTH', v: 'RM85 juta' }, { k: 'Rosot nilai', v: 'RM40.25 juta' },
            { k: 'Pelupusan 50%', v: 'Dis 2020 ke Amanah Raya' }],
    isu: 'Sejak 2015 tidak mampu bayar pinjaman; penyewa utama berpindah.',
    tindakan: 'Jual 50% kepada Amanah Raya Berhad Disember 2020.',
    rugiRm: 40.25, laburRm: 85
  },
  {
    id: 'ppb', n: 'Putrajaya Perdana Berhad (PPB)', sektor: 'Pembinaan', lokasi: 'Malaysia',
    p: [183, 184], status: 'pantau',
    modus: 'Put option gagal', pegangan: '30% ekuiti dibeli Disember 2014',
    skala: 145.3, mata: 'RM juta (rosot nilai)',
    angka: [{ k: 'Pembelian 30%', v: 'RM193.50 juta' }, { k: 'Put option (7 Mar 2018)', v: 'RM210.7 juta' },
            { k: 'Nilai buku bersih LTH', v: 'RM48.2 juta' }],
    isu: 'Sasaran IPO setahun gagal. CDSB gagal bayar put option RM210.7 juta.',
    tindakan: 'PRC LTH lulus tindakan undang-undang (12 Nov 2020); rundingan penyelesaian berjalan.',
    rugiRm: 145.3, laburRm: 193.5
  },
  {
    id: 'alrawda', n: 'Al-Rawda Real Estates Development', sektor: 'Hotel/Pajakan', lokasi: 'Makkah & Madinah, Arab Saudi',
    p: [184, 185, 186, 187], status: 'timbangtara',
    modus: 'Pajakan jangka panjang', pegangan: '4 hotel, 10–18 tahun',
    skala: 202.8, mata: 'RM juta (jangkaan kerugian kredit)',
    angka: [{ k: 'Nilai perjanjian dibayar LTH', v: 'SR1,426 juta' }, { k: 'Pendapatan sewa dijangka', v: 'SR2,490 juta' },
            { k: 'Sewa tertunggak (31 Dis 2021)', v: 'SR560.7 juta' }, { k: '9 Nota Janji vs Al-Rawda', v: 'SR344.0 juta' },
            { k: '7 tindakan vs penjamin peribadi', v: 'SR255.1 juta' }],
    isu: 'Empat hotel: Al-Aqiq, Al-Haram, Al-Saha (Madinah), Rawdat Al-Bait (Makkah). Al-Rawda dilantik SEKALIGUS sebagai pengendali. Sejak Mac 2019 gagal bayar sewa.',
    tindakan: 'Perintah penguatkuasaan Mahkamah Penguatkuasaan Arab Saudi. 20 hartanah untuk likuidasi (2 tahun). Timbangtara berjalan.',
    rugiRm: 202.8
  },
  {
    id: 'alfareeda', n: 'Al-Fareeda Residential Fund', sektor: 'Dana hartanah', lokasi: 'Arab Saudi',
    p: [188], status: 'hapus',
    modus: 'Dana luar', pegangan: '13.8% dana SR550 juta (via Anfaal Capital)',
    skala: 76, mata: 'SR juta (hapus kira)',
    angka: [{ k: 'Langganan LTH (21 Feb 2013)', v: 'SR76 juta ≈ RM63 juta' }, { k: 'Status', v: 'Hapus kira penuh' }],
    isu: 'Undang-undang buruh/imigresen Saudi, kontraktor bermasalah, harga minyak jatuh. PENGURUS DANA TIDAK DAPAT DIKESAN.',
    tindakan: 'Dihapus kira sepenuhnya.',
    rugiRm: 63, laburRm: 63
  },
  {
    id: 'thp', n: 'TH Plantations Berhad (THP)', sektor: 'Perladangan (tersenarai)', lokasi: 'Malaysia/Indonesia',
    p: [188, 189], status: 'polis',
    modus: 'Tadbir urus anak syarikat', pegangan: 'Tersenarai, milik LTH',
    skala: 170, mata: 'RM juta (rosot nilai di LTH)',
    angka: [{ k: 'Sukuk dikeluarkan', v: 'RM1.2 bilion' }, { k: 'Ladang produktif', v: '58% sahaja' },
            { k: 'Laporan forensik PwC', v: '25 Apr 2019' }],
    isu: 'PwC dapati pengurusan & Lembaga THP GAGAL tanggungjawab fidusiari — pengambilalihan Bumi Suria, Maju Warisanmas, PT Persada Kencana Prima.',
    tindakan: 'Laporan kepada PDRM/SPRM/SC. CEO THP garden leave → letak jawatan 20 Ogos 2018.',
    rugiRm: 170
  },
  {
    id: 'thprop', n: 'TH Properties Sdn. Bhd.', sektor: 'Hartanah/Pembinaan', lokasi: 'Malaysia/Australia',
    p: [189, 190, 144], status: 'pantau',
    modus: 'Bonus tanpa kelulusan', pegangan: 'Subsidiari milik penuh LTH',
    skala: 2.2, mata: 'RM juta (bonus tanpa kelulusan)',
    angka: [{ k: 'Struktur kumpulan', v: '26 subsidiari + 5 usahasama' },
            { k: 'Untung sebelum cukai 2017', v: 'RM34.84 juta' }],
    isu: 'Bonus istimewa 2017+2018 dibayar TANPA kelulusan LTH sebagai pemegang ekuiti utama.',
    tindakan: 'Siasatan dalaman 5 Feb 2020; Tetuan Tajuddin & Co. 12 Ogos 2020 — Lembaga putuskan dapatkan kembali bonus.',
    rugiRm: 2.2
  },
  {
    id: 'thmarine', n: 'Alam Maritim/TH Marine', sektor: 'Perkhidmatan marin', lokasi: 'Malaysia',
    p: [190, 191], status: 'pantau',
    modus: 'Usaha sama', pegangan: '51% ekuiti (18 Jun 2015)',
    skala: 278, mata: 'RM juta (rosot nilai)',
    angka: [{ k: 'Jumlah pelaburan', v: 'RM334 juta' }, { k: 'Ekuiti', v: 'RM198 juta (rosot penuh)' },
            { k: 'Pembiayaan', v: 'RM136 juta (RM80j dirosot)' }, { k: 'PwC jangka recovery', v: 'RM70.4 juta' }],
    isu: 'Pelaburan marin (AHTS) rentetan kemelesetan minyak. PwC jangka hanya dapat semula RM70.4 juta.',
    tindakan: 'PwC dilantik nilai kebolehpulihan.',
    rugiRm: 278, laburRm: 334
  },
  {
    id: 'thhr', n: 'TH Hotel & Residences (THHR)', sektor: 'Hotel', lokasi: 'Malaysia',
    p: [191, 192], status: 'pantau',
    modus: 'Aset pulangan rendah', pegangan: 'Subsidiari milik penuh sejak Mei 2007',
    skala: 804.1, mata: 'RM juta (nilai pemindahan ke UJSB)',
    angka: [{ k: 'Premium ke atas nilai buku', v: '~55%' }, { k: 'Pulangan aset dipindah', v: '<2%' },
            { k: 'Sewa Kelana Jaya 2019', v: 'RM16.5 juta' }, { k: 'Sewa Kelana Jaya 2020', v: 'RM6.2 juta (−62%)' }],
    isu: 'Hotel di Alor Setar/Kuching/Pulau Pinang/Kuala Terengganu/Kota Kinabalu dipindah ke UJSB (pulangan rendah).',
    tindakan: 'Perjanjian Pemindahan Aset UJSB 28 Disember 2018.'
  },
  {
    id: 'fgv', n: 'FGV Berhad', sektor: 'Perladangan (IPO)', lokasi: 'Malaysia',
    p: [192, 193], status: 'selesai',
    modus: 'IPO dipegang terlalu lama', pegangan: '7.5% selepas IPO 2012',
    skala: 1058.94, mata: 'RM juta (kerugian tidak nyata)',
    angka: [{ k: 'Langganan IPO', v: '276 juta unit @ RM4.65 (9 Mei 2012)' },
            { k: 'Tambahan', v: '273,579,700 unit @ RM4.55 (26 Jun 2012)' },
            { k: 'Jumlah pelaburan IPO', v: 'RM1,253,742,809 @ purata RM4.58/unit' },
            { k: 'Harga jatuh ke', v: 'RM0.885/unit' }],
    isu: 'Mengapa LTH terus pegang sehingga harga jatuh serendah itu? "Bertasib baik" kerana UJSB ambil alih pada HARGA KOS, bukan pasaran.',
    tindakan: 'Saham dipindah ke UJSB pada harga kos. Kerugian RM1.1 bilion dipindah kepada UJSB (Kerajaan).',
    rugiRm: 1058.94, laburRm: 1310.02
  }
];

RD.pelaburanMeta = {
  p: [176, 177, 234],
  dapatan: 'Suruhanjaya dapati wujud transaksi mencurigakan dan penyembunyian maklumat.',
  prosesRosak: [
    'Tiada koordinasi antara KPPelaburan, KPKorporat, KPHartanah, KPPerbendaharaan.',
    'Aliran proses pelaburan tidak jelas; terlalu banyak lapisan.',
    'Keputusan setiap peringkat sangat bergantung nasihat Pengurusan Tertinggi.',
    'Panel Pelaburan tidak menyemak cadangan dengan secukupnya (Pengerusi Dato\' Mohzani akui "longgar dan tidak menyeluruh").',
    'Menteri bergantung sepenuhnya memo Lembaga. Semua "dipersetujui seperti dicadangkan".'
  ],
  status: {
    polis: 'Laporan polis / siasatan',
    mahkamah: 'Tindakan mahkamah',
    timbangtara: 'Timbangtara',
    selesai: 'Dilupus/diselesaikan',
    hapus: 'Hapus kira',
    pantau: 'Pemantauan / rundingan'
  }
};

/* --------------------------------------------------------------------------
   12. ORANG & TADBIR URUS
   -------------------------------------------------------------------------- */
RD.jawatan = {
  p: [56, 59, 60, 61, 62, 63, 64, 65],
  siri: [
    { k: 'Menteri Hal Ehwal Agama', warna: 'sim', orang: [
      { n: "Dato' Seri Jamil Khir Baharom", dari: '2009-02-10', hingga: '2018-05-09' },
      { n: 'Tun Dr Mahathir (memegang kuasa)', dari: '2018-05-10', hingga: '2018-07-01', khas: true },
      { n: 'Datuk Seri Dr. Mujahid Yusof Rawa', dari: '2018-07-02', hingga: '2020-03-09' },
      { n: 'Datuk Dr. Zulkifli al-Bakri', dari: '2020-03-10', hingga: '2021-08-29' },
      { n: 'Datuk Idris Ahmad', dari: '2021-08-30', hingga: null }
    ]},
    { k: 'Pengerusi Lembaga', warna: 'accent', orang: [
      { n: 'Datuk Seri Abdul Azeez Abdul Rahim', dari: '2013-07-01', hingga: '2018-05-23', politik: true },
      { n: 'Tan Sri Md Nor Md Yusof', dari: '2018-07-10', hingga: '2021-10-15', tamatAwal: true },
      { n: 'Tan Sri Azman Mokhtar', dari: '2021-12-20', hingga: null }
    ]},
    { k: 'Ketua Pegawai Eksekutif', warna: 'neutral', orang: [
      { n: 'Tan Sri Ismee Ismail', dari: '2006-01-01', hingga: '2016-06-30' },
      { n: 'Datuk Seri Johan Abdullah', dari: '2016-07-01', hingga: '2018-06-30' },
      { n: "Dato' Sri Zukri Samat", dari: '2018-07-10', hingga: '2019-08-31' },
      { n: 'Datuk Nik Hasyudeen Yusoff', dari: '2019-09-01', hingga: '2021-05-05', tamatAwal: true },
      { n: 'Datuk Sri Amrin Awaluddin', dari: '2021-05-06', hingga: null }
    ]}
  ],
  tamatAwal: { nota: 'Dua penamatan awal tanpa sebab (seksyen 6(5) Akta 535): KPE Nik (5 Mei 2021, sepatutnya 31 Ogos 2021) + Pengerusi Md Nor (15 Okt 2021, kontrak baru disambung 2 tahun mulai 20 Julai 2020).',
    p: [16, 17, 82, 83] }
};

RD.politik = {
  p: [77],
  orang: [
    { n: 'Datuk Seri Abdul Azeez Abdul Rahim', peranan: 'Anggota 2011, Pengerusi 2013–2018',
      politik: 'AP Baling; Ahli Majlis Tertinggi UMNO' },
    { n: "Tan Sri Badruddin Amiruldin", peranan: 'Anggota 2005–2018',
      politik: 'AP Yan/Jerai 2004–2008; Pengerusi Tetap Perhimpunan Agong UMNO' },
    { n: 'Datuk Rosni Sohar', peranan: 'Anggota 2014–2018',
      politik: 'ADUN Hulu Bernam; Setiausaha Wanita UMNO sejak 2013' }
  ],
  dapatan: 'Keputusan LTH (hibah, bayaran haji, HAFIS) "didorong unsur-unsur politik".',
  p2: [16, 78]
};

RD.anakSyarikat = {
  p: [84, 85, 86, 87, 88, 89, 90],
  had: { baru: 5, d: 'Dasar baharu: hadkan pegangan jawatan anak syarikat kepada 5.' },
  orang: [
    { n: 'Datuk Rozaida Omar', peranan: 'CFO Kumpulan (2004–2021)', bil: 23,
      contoh: ['Syarikat Takaful', 'BIMB Holdings', 'TH Heavy Engineering', 'Putrajaya Perdana', 'LTH Property Holdings 1–4', 'TH Oxford'] },
    { n: 'Datuk Seri Johan Abdullah', peranan: 'KPE 2016–2018', bil: 18,
      contoh: ['TH Heavy Engineering (Pengerusi)', 'Trurich (Pengerusi)', 'DSSB (Pengerusi)', 'TH Plantations', 'Malakoff', 'Express Rail Link'] },
    { n: 'Datuk Abdul Azeez Abdul Rahim', peranan: 'Pengerusi 2013–2018', bil: 8,
      contoh: ['TH Real Estate LLC (Pengerusi)', 'TH Hotel & Residence (Pengerusi)', 'Putrajaya Perdana (Pengerusi)', 'Yayasan TH'] },
    { n: "Dato' Noordin Sulaiman", peranan: 'Anggota 2018–', bil: 9,
      contoh: ['TH Hotel & Residence (Pengerusi)', 'TH Travel & Services (Pengerusi)', 'Premia Cards (Pengerusi)', 'Theta Edge (Pengerusi)'] },
    { n: 'Datuk Zaiton Hassan', peranan: 'Anggota 2018–2020', bil: 7,
      contoh: ['TH Properties (Pengerusi)', 'THP Enstek', 'LTH Property Holdings 1–5'] },
    { n: 'Tan Sri Ismee Ismail', peranan: 'KPE 2006–2016', bil: 7,
      contoh: ['TH Plantations', 'Trurich', 'BIMB Holdings', 'Bank Islam', 'Syarikat Takaful'],
      nota: 'Terus pegang 3 jawatan hingga Mei 2018 — hampir 2 tahun SELEPAS tamat perkhidmatan.' },
    { n: 'Datuk Nik Hasyudeen Yusoff', peranan: 'KPE 2019–2021', bil: 4,
      contoh: ['Bank Islam', 'BIMB Holdings', 'TH Plantations', 'TH Properties'] },
    { n: "Dato' Sri Zukri Samat", peranan: 'KPE 2018–2019', bil: 4,
      contoh: ['TH Plantations (Pengerusi)', 'TH Estates (Pengerusi)', 'TH Properties (Pengerusi)'],
      nota: 'Melepaskan jawatan untuk elak konflik kepentingan.' },
    { n: 'Datuk Sri Amrin Awaluddin', peranan: 'KPE 2021–', bil: 3,
      contoh: ['TH Plantations', 'TH Properties', 'Bank Islam'] },
    { n: 'Encik Abd Kadir Sahlan', peranan: 'KP Pelaburan 2010–2018', bil: 3,
      contoh: ['TH Properties Group', 'Perladangan Sabah Sarawak', 'BIMB Securities'] }
  ],
  dapatan: 'Penglibatan berlebihan menyebabkan kurang fokus + konflik kepentingan.',
  p2: [90]
};

/* Jawatankuasa (p63–64) */
RD.jawatankuasa = {
  p: [63, 64],
  asal: ['Audit', 'Risiko', 'Lembaga Tender', 'Urusan Haji', 'Penasihat Syariah', 'Penamaan', 'Perkhidmatan', 'Panel Pelaburan', 'Majlis Penasihat Haji', 'Penasihat Ibadah', 'Tatatertib', 'Rayuan Tatatertib'],
  dimansuh: [
    { n: 'Panel Pelaburan', bila: 'Mei 2018',
      kesan: 'Diganti Exco Perniagaan (Pengerusi: Menteri Hal Ehwal Ekonomi) — saksi akui TIDAK PERNAH BERFUNGsi. Sekarang dihidupkan semula.' },
    { n: 'Majlis Penasihat Haji', bila: '2018', kesan: 'Diganti Jawatankuasa Urusan Haji.' }
  ],
  dikanunkan: ['Panel Pelaburan', 'Jawatankuasa Penasihat Syariah', 'Jawatankuasa Urusan Haji'],
  masalah: 'Jawatankuasa penting tidak dikanunkan dalam Akta 535 — boleh dibubarkan secara pentadbiran.'
};

/* Kuasa Menteri (p78–81) */
RD.kuasaMenteri = {
  p: [78, 79, 81],
  senarai: [
    { k: 'Pelantikan Pengerusi & Anggota Lembaga', jenis: 'tadbir', cadang: 'PM (syor badan bebas)' },
    { k: 'Pelantikan KPE', jenis: 'tadbir', cadang: 'PM (syor badan bebas)' },
    { k: 'Honorarium & elaun anggota', jenis: 'tadbir', cadang: 'Menteri Agama' },
    { k: 'Peraturan syarat perkhidmatan & tatatertib', jenis: 'tadbir', cadang: 'Menteri Agama' },
    { k: 'Pembiayaan/bantuan kewangan kepada syarikat LTH', jenis: 'wang', cadang: 'Menteri Kewangan' },
    { k: 'Peraturan deposit & pengeluaran', jenis: 'wang', cadang: 'Menteri Kewangan' },
    { k: 'SETIAP aktiviti pelaburan LTH', jenis: 'wang', cadang: 'Menteri Kewangan' },
    { k: 'Pemindahan wang dari KW Rizab', jenis: 'wang', cadang: 'Menteri Kewangan' },
    { k: 'Pengisytiharan untung boleh agih (hibah)', jenis: 'wang', cadang: 'Menteri Kewangan' }
  ],
  dapatan: 'Kuasa Menteri terlalu luas. Kepakaran 3 Menteri Hal Ehwal Agama dalam tempoh siasatan hanya terhad bidang agama. Tiada input tambahan sebelum keputusan dibuat.',
  kelayakan: {
    sekarang: 'Seksyen 6(2) Akta 535: "seorang Muslim dan warganegara Malaysia" — itu sahaja.',
    cadangan: ['perbankan', 'perniagaan', 'ekonomi', 'syariah', 'perundangan', 'perakaunan'],
    bandingan: [
      { akta: 'Akta KWSP 1991', kriteria: 'kewangan, perniagaan, ekonomi, keselamatan sosial' },
      { akta: 'Akta LHDN 1995', kriteria: 'kewangan, komersial, percukaian, undang-undang' },
      { akta: 'Akta SC 1993', kriteria: 'integriti & reputasi amat baik; kewangan/pasaran modal' },
      { akta: 'Akta PTPTN 1997', kriteria: 'pendidikan, kewangan, komersial' },
      { akta: 'Akta KWAP 2007', kriteria: 'perniagaan atau kewangan' },
      { akta: 'Akta LPPSA 2015', kriteria: 'perbankan, kewangan, undang-undang' }
    ]
  }
};

/* --------------------------------------------------------------------------
   13. AMARAN & JAWAPAN AGENSI (p100, 213, 22, 147)
   -------------------------------------------------------------------------- */
RD.amaran = [
  { dari: 'BNM', tarikh: '2014-08-21', kepada: 'Pengerusi LTH', tajuk: 'Pengambilan deposit & kecairan', hasil: 'diabai', p: 100 },
  { dari: 'BNM', tarikh: '2014-12-19', kepada: 'Pengerusi LTH', tajuk: 'Pengambilan deposit & kecairan', hasil: 'diabai', p: 247 },
  { dari: 'BNM', tarikh: '2015-12-23', kepada: 'Pengerusi LTH', tajuk: 'Dasar rizab', hasil: 'sebahagian',
    nota: 'LTH melantik EY sediakan Laporan Proforma — tetapi dijadikan asas bayaran hibah.', p: 247 },
  { dari: 'BNM', tarikh: '2015-12-23', kepada: 'Menteri di JPM', tajuk: 'Pengurusan kewangan LTH', hasil: 'diabai', p: 247 },
  { dari: 'BNM', tarikh: '2016-12-14', kepada: 'LTH', tajuk: 'Dasar rizab', hasil: 'diabai', p: 213 },
  { dari: 'BNM', tarikh: '2017-02-17', kepada: 'LTH', tajuk: 'Dasar rizab', hasil: 'diabai', p: 213 },
  { dari: 'Roland Berger', tarikh: '2017-03-03', kepada: 'Pengurusan LTH', tajuk: '5-Year Strategic Business Plan Review', hasil: 'diabai',
    nota: 'Menganggar kerugian RM2.6 bilion. Tiada rekod laporan dibentangkan kepada Lembaga. Siap SEBELUM hibah 2017 diisytiharkan.', p: 214 },
  { dari: 'Roland Berger', tarikh: '2018-02-02', kepada: 'Pengurusan LTH', tajuk: 'Strategic Plan Review (Revised)', hasil: 'diabai', p: 246 },
  { dari: 'Ketua Audit Negara', tarikh: '2018-07-16', kepada: 'LTH (laporan)', tajuk: 'Emphasis of Matter, bukan Pendapat Berteguran', hasil: 'lembut',
    nota: 'Pendapat Berteguran DICADANGKAN tetapi tidak diberi. KAN mengaku mengambil kara "persepsi pendeposit" — di luar skop audit.', p: 22 },
  { dari: 'KAN', tarikh: '2018-12-19', kepada: 'Perdana Menteri', tajuk: 'Penjelasan isu penyata kewangan 2017', hasil: 'lembut', p: 133 },
  { dari: 'PwC', tarikh: '2018-11-09', kepada: 'Pengurusan LTH', tajuk: 'Financial Position Review (Final)', hasil: 'bertindak',
    nota: 'Mengesahkan jurang defisit sejak 2014. Menjadi asas Pelan Pemulihan & penubuhan UJSB.', p: 147 },
  { dari: 'BNM', tarikh: '2018-12-28', kepada: 'Perdana Menteri', tajuk: 'Pengawalseliaan & Langkah Kehematan', hasil: 'bertindak',
    nota: 'JM 7 Dis 2018 letak LTH bawah BNM (1 Jan 2019) — tetapi TANPA skop jelas. Suruhanjaya: tidak selari Akta 535.', p: 100 },
  { dari: 'BNM', tarikh: '2019-06-26', kepada: 'Perdana Menteri', tajuk: 'Penzahiran zakat (akad Wadi\'ah)', hasil: 'bertindak',
    nota: 'LTH tukar akad ke Wakalah Disember 2019.', p: 108 },
  { dari: 'BNM', tarikh: '2022-04-18', kepada: 'Pengerusi Suruhanjaya', tajuk: 'Cadangan model perniagaan baharu', hasil: 'ditolak',
    nota: 'Suruhanjaya menolak: akan jadikan LTH "glorified travel agent".', p: 217 }
];
RD.amaranHasil = {
  diabai: { l: 'Tidak diberi perhatian', c: 'bad' },
  sebahagian: { l: 'Sebahagian', c: 'warn' },
  lembut: { l: 'Teguran dilembutkan', c: 'warn' },
  bertindak: { l: 'Ditindaklanjuti', c: 'good' },
  ditolak: { l: 'Ditolak Suruhanjaya', c: 'neutral' }
};

RD.pihak = [
  { n: 'Bank Negara Malaysia (BNM)', peranan: 'Pemantau (bukan pengawal selia sah pre-2019)',
    dapatan: '6 surat amaran 2014–2017 tanpa kuasa penguatkuasaan. BNM mengaku sendiri "tidak mempunyai kepakaran penuh bagi kawal selia LTH".',
    syor: 'Tidak seharusnya mengawal LTH sepenuhnya. Jika perlu, hadkan kepada kawalan rizab + kecairan.', p: [99, 101, 102, 232] },
  { n: 'Jabatan Audit Negara (JAN)', peranan: 'Juruaudit statutori',
    dapatan: 'Sijil Audit Bersih 2014–2017. Untuk 2017, Pendapat Berteguran dicadangkan tetapi tidak diberi selepas ambil kira "persepsi pendeposit". Menerima Kumpulan Wang Pendeposit dikelaskan EKUITI (bukan liabiliti) sejak 2010 — "representasi salah".',
    syor: 'Pengauditan dipertanggungjawabkan kepada firma akauntan swasta.', p: [21, 22, 125, 132, 134, 135] },
  { n: 'Ernst & Young (EY)', peranan: 'Konsultan RAV & Laporan Proforma',
    dapatan: 'Rakan kongsi EY dakwa Proforma berasaskan penyata diaudit KAN — TIDAK BENAR: Semakan RAV EY 23 Mei 2018, Penyata Beraudit muktamad 16 Julai 2018. EY sendiri nyatakan Proforma bukan asas bayaran hibah.',
    syor: 'RAV tidak boleh jadi asas pembayaran hibah.', p: [114, 118, 119, 130] },
  { n: 'PricewaterhouseCoopers (PwC)', peranan: 'Financial review 2014–2017; audit forensik',
    dapatan: 'Mengesahkan jurang defisit sejak 2014. Hibah 2014–2017 bercanggah dengan seksyen 22 Akta 535. Sediakan kiraan kerugian terlaras 2017 (RM1.4 bilion) + kerugian terkumpul (RM4.7 bilion).',
    p: [147, 148, 149] },
  { n: 'Roland Berger (RB)', peranan: 'Kajian pelan perniagaan strategik 2017–2018',
    dapatan: 'Model perniagaan berisiko; polisi pelaburan berat ke ekuiti domestik; subsidi haji tinggi; rizab menurun selepas 2016. Anggaran kerugian RM2.6 bilian. Suruhanjaya: analisis RB "baik dan menyeluruh" tetapi "tidak diberi perhatian dan dimanfaatkan"; tiada rekod dibentangkan kepada Lembaga.',
    p: [104, 117, 213, 214] },
  { n: 'Perbendaharaan / MOF', peranan: 'Wakil dalam Lembaga; pelulus bonus; pelulus rizab minima',
    dapatan: 'TIDAK PERNAH lulus baki minima KW Rizab walaupun disyarat seksyen 22(3)(b) Akta 535. Bagi bonus: "lebih 2 bulan ialah budi bicara Menteri Kewangan".',
    syor: 'Menteri Kewangan dipertanggungjawabkan pengurusan kewangan, dana & pelaburan.', p: [104, 139, 231] },
  { n: 'Panel Pelaburan', peranan: 'Semak cadangan pelaburan sebelum ke Lembaga',
    dapatan: 'Bergantung input Pengurusan; tidak semak dengan secukupnya. Pengerusi Dato\' Mohzani: "longgar dan tidak menyeluruh". Dibubarkan Mei 2018; diganti Exco Perniagaan yang tidak pernah berfungsi.',
    syor: 'Dikanunkan dalam Akta 535.', p: [92, 93, 176, 177] }
];

/* --------------------------------------------------------------------------
   14. TATATERTIB (p197–201)
   -------------------------------------------------------------------------- */
RD.tatatertib = {
  p: [197, 198, 199, 200, 201],
  kluster: [
    { id: 1, n: 'Penjualan saham THIP' },
    { id: 2, n: 'Pelanggaran Akta Syarikat 1965 — tiada kelulusan awal Menteri untuk sumbangan RM22.12 juta Yayasan TH' },
    { id: 3, n: 'Pengisytiharan hibah tahun kewangan 2017' },
    { id: 4, n: 'Tuntutan palsu Unit Bayaran' }
  ],
  kes: [
    { n: 'Datuk Rozaida Omar', jw: 'CFO Kumpulan (Gred K)', kluster: [1, 2, 3],
      asal: 'Buang kerja (K1, K3) / Turun pangkat (K2)',
      rayuan: 'Dikurang ke turun pangkat (K1, K3, 6 Sep 2021); amaran keras (K2)',
      kini: 'Pengurus Besar Strategik Modal Insan (Gred J), LTH' },
    { n: "Dato' Adi Azuan Abdul Ghani", jw: 'KPO (Gred K)', kluster: [2],
      asal: 'Turun pangkat', rayuan: 'Amaran keras',
      kini: 'Pengurus Besar Kanan Kafe & Pembangunan, THHR' },
    { n: 'Rifina Md Ariff', jw: 'PBM Perkhidmatan Korporat & Hartanah', kluster: [1],
      asal: 'Buang kerja (21 Apr 2021)', rayuan: 'Turun pangkat (6 Sep 2021)',
      kini: 'Ketua Bahagian Risiko & Pematuhan, THP' },
    { n: 'Mohd Hisham Harun', jw: 'KP Sumber Manusia (Gred K)', kluster: [1, 2],
      asal: 'Buang kerja (K1) / Turun pangkat (K2)',
      rayuan: 'Turun pangkat (K1); amaran & tangguh gaji (K2)',
      kini: 'Head, Business & Corporate Affairs, TH Properties' },
    { n: 'Hazlina Mohd Khalid', jw: 'Penasihat Undang-Undang (Gred J)', kluster: [1, 4],
      asal: 'Buang kerja (K1) / Turun pangkat (K4)',
      rayuan: 'Turun pangkat (K1); turun pangkat Dikekalkan (K4)',
      kini: 'Timbalan Pengurus Besar, TH Plantations' }
  ],
  lengah: [
    { kluster: 2, bulan: 19, sesiapa: "Dato' Adi Azuan" },
    { kluster: 3, bulan: 15, sesiapa: 'Datuk Rozaida Omar' },
    { kluster: 4, bulan: 10, sesiapa: 'Hazlina Mohd Khalid' }
  ],
  nota: 'Tempoh dari surat representasi sehingga Jawatankuasa Tatatertib bersidang untuk putusan hukuman.',
  kesimpulan: 'Kelima-lima pegawai masih bertugas dengan LTH atau anak syarikat. Suruhanjaya: proses "mengambil masa terlalu lama", perlu diperkemas & disegerakan.'
};

RD.laporanPolis = {
  p: [193, 194, 195, 196],
  rows: [
    { tarikh: '30 Nov 2018', repot: 'Dang Wangi/31347/2018', pengadu: 'Idrus Ismail (mantan Setiausaha Syarikat LTH)',
      isu: 'Yayasan TH — penganjuran & guna wang menyalahi Memorandum & Articles of Association.',
      status: 'PDRM selesai; kertas dirujuk JPN.' },
    { tarikh: '30 Nov 2018', repot: 'Dang Wangi/31331/2018', pengadu: 'Idrus Ismail',
      isu: 'Salah nyataan & sembunyi maklumat penjualan 95% saham THIP (USD910 juta, 2012) ke PT Borneo Pacific.',
      status: 'PDRM berterusan — kebenaran pihak berkuasa Indonesia.' },
    { tarikh: '13 Dis 2018', repot: 'Dang Wangi/32724/2018', pengadu: 'Aliatun Mahmud (mantan Setiausaha Trurich)',
      isu: 'Manipulasi laporan kesesuaian tanah 40,880 hektar Kalimantan (~USD58 juta, 2008–2009).',
      status: 'PDRM berterusan — kebenaran Indonesia.' },
    { tarikh: '16 Jan 2019', repot: 'Dang Wangi/1484/2019', pengadu: 'Idrus Ismail',
      isu: 'Pengisytiharan hibah 2017 bercanggah seksyen 22 Akta 535 — salah nyataan dalam dua kertas kerja Mesyuarat Khas Lembaga (6 & 9 Feb 2018).',
      status: 'PDRM selesai; kertas ke JPN.' }
  ],
  sprm: [
    'Pembelian Ladang Weida Bhd oleh TH Plantation',
    'Penyewaan Restoran Opah, KL Sentral',
    'Penyewaan Restoran Nasi Dalca, Ibu Pejabat LTH',
    'Pengubahsuaian mantan KPO LTH',
    'Pemalsuan dokumen rubber seedlings TH Plantation (Ladang TH-Usia Jatimas, Sandakan)',
    'Salah laku THP Bina & THP Timur (anak syarikat TH Properties)'
  ],
  sprmStatus: 'Semua dakwaan masih siasatan SPRM semasa laporan disiapkan.'
};

/* --------------------------------------------------------------------------
   15. KRONOLOGI
   -------------------------------------------------------------------------- */
RD.kronologi = [
  { d: '1951', tema: 'asas', t: 'Ordinan Haji 1951', b: 'Pejabat Urusan Haji Pulau Pinang ditubuhkan.', p: 53 },
  { d: '1962', tema: 'asas', t: 'PWSBH ditubuhkan', b: 'Perbadanan Wang Simpanan Bakal-Bakal Haji Tanah Melayu (Akta 34/62).', p: 53 },
  { d: '1969', tema: 'asas', t: 'LUTH ditubuhkan', b: 'Akta Lembaga Urusan dan Tabung Haji 1969 (Akta 8) menggantikan PWSBH.', p: 54 },
  { d: '1995', tema: 'asas', t: 'Lembaga Tabung Haji ditubuhkan', b: 'Akta 535 berkuat kuasa 16 Feb 1995; LUTH dimansuhkan 1 Jun 1995.', p: 54 },
  { d: '2001', tema: 'hafis', t: 'HAFIS dimulakan', b: 'Sebelum ini jemaah Muassasah bayar kos sebenar. Subsidi diambil dari keuntungan boleh diagih — bukan suntikan Kerajaan.', p: 207 },
  { d: '2009', tema: 'hafis', t: 'Bayaran haji dibekukan RM9,980', b: 'Kerajaan beku kenaikan bayaran haji Muassasah. Beku kekal 13 tahun walaupun kos haji terus naik.', p: 211 },
  { d: '2010', tema: 'krisis', t: 'KW Pendeposit dikelas ekuiti', b: 'Sejak 2010 JAN terima penyata LTH dengan KW Pendeposit dikelas ekuiti (bukan liabiliti) — "representasi salah".', p: 132 },
  { d: '2013', tema: 'tadbir', t: 'Abdul Azeez dilantik Pengerusi', b: 'AP Baling & Ahli Majlis Tertinggi UMNO. Anggota Lembaga sejak 2011.', p: 59 },
  { d: '2014', tema: 'amaran', t: 'Amaran BNM #1 & #2', b: 'Dua surat tentang pengambilan deposit & kecairan.', p: 100 },
  { d: '2014', tema: 'krisis', t: 'Jurang defisit bermula', b: 'Hibah 2014 (RM3.24 bilion) melebihi lebihan sebelum agihan (RM2.89 bilion) — baki bersih jadi −RM352 juta.', p: 147 },
  { d: '2015', tema: 'amaran', t: 'Amaran BNM #3 & #4', b: 'Surat kepada Pengerusi & Menteri — kebimbangan menyeluruh pengurusan kewangan.', p: 100 },
  { d: '2016', tema: 'krisis', t: 'EY rangka kerja RAV dilancarkan', b: 'LTH mula guna Nilai Aset Boleh Direalisasi (RAV) untuk Laporan Proforma.', p: 127 },
  { d: '2016', tema: 'krisis', t: 'Akad ditukar ke Wadi\'ah Yad Dhamanah', b: 'Deposit dikira simpanan; LTH jadi peminjam. Tiada kajian menyeluruh dilaksanakan.', p: 107 },
  { d: '2016–17', tema: 'amaran', t: 'Amaran BNM #5 & #6', b: 'Keperluan merumus dasar rizab.', p: 213 },
  { d: '2017-03-03', tema: 'amaran', t: 'Laporan Roland Berger', b: 'Kajian 5-Year Strategic Plan. Mengesan model berisiko & kerugian RM2.6 bilian. TIADA rekod dibentangkan kepada Lembaga.', p: 214 },
  { d: '2017', tema: 'krisis', t: 'Polisi rosot nilai diubah 2 kali', b: 'Ambang dinaik 70% → 85% → 90% dalam satu hari. Rosot nilai akhir RM1 juta sahaja (vs RM1,313 juta).', p: 148 },
  { d: '2018-02-06', tema: 'krisis', t: 'Dua Mesyuarat Khas Lembaga', b: 'Dua kertas kerja dibentangkan 6 & 9 Feb. Polis kemudian dakwa salah nyataan dalam kertas ini untuk benarkan hibah tinggi 2017.', p: 196 },
  { d: '2018-02-07', tema: 'krisis', t: 'Kaedah kiraan hibah ditukar — ditarik balik', b: 'Baki tahunan → baki bulanan; diumum 7 Feb, ditarik balik selepas bantahan pendeposit. Lebihan RM600 juta keluar untuk hibah 2017.', p: 115 },
  { d: '2018-05-23', tema: 'tadbir', t: 'Abdul Azeez letak jawatan', b: 'Selepas PH menang PRU14 (9 Mei 2018).', p: 59 },
  { d: '2018-07-16', tema: 'amaran', t: 'KAN — "Emphasis of Matter"', b: 'Bukan "Pendapat Berteguran" kerana mengambil kara persepsi pendeposit.', p: 22 },
  { d: '2018-11-09', tema: 'amaran', t: 'PwC financial review final', b: 'Mengesahkan jurang defisit sejak 2014. Menjadi asas Pelan Pemulihan.', p: 147 },
  { d: '2018-12-07', tema: 'ujsb', t: 'Jemaah Menteri lulus Pelan Pemulihan', b: 'Pelan pemulihan & penstrukturan semula LTH.', p: 159 },
  { d: '2018-12-14', tema: 'ujsb', t: 'UJSB ditubuhkan', b: 'Urusharta Jamaah Sdn. Bhd. — model Danaharta 1998.', p: 159 },
  { d: '2018-12-27', tema: 'ujsb', t: 'Perjanjian pemindahan aset', b: '106 saham tersenarai + 1 syarikat perladangan + 29 hartanah — RM19.9 bilion (vs pasaran RM9.7 bilion).', p: 159 },
  { d: '2019-01-01', tema: 'amaran', t: 'LTH diletak bawah BNM', b: 'JM 7 Dis 2018, kuat kuasa 1 Jan 2019 — TANPA skop jelas. Suruhanjaya: tidak selari Akta 535.', p: 100 },
  { d: '2019', tema: 'krisis', t: 'Hibah 2018 hanya 1.25%', b: 'Penurunan dramatik dari 4.50% → 1.25%. Deposit susut RM73b → RM69b.', p: 122 },
  { d: '2019-12', tema: 'krisis', t: 'Akad ditukar ke Wakalah', b: 'Selepas BNM tegur zakat; LTH menukar akad Wadi\'ah ke Wakalah.', p: 108 },
  { d: '2020-11-30', tema: 'ujsb', t: 'UJSB tebus awal Sukuk RM200 juta', b: 'Daripada Geran Kerajaan 2020 RM500 juta.', p: 167 },
  { d: '2021-05-05', tema: 'tadbir', t: 'KPE Nik Hasyudeen ditamat awal', b: 'Sebelum tamat 31 Ogos 2021. Tanpa sebab.', p: 16 },
  { d: '2021-10-15', tema: 'tadbir', t: 'Pengerusi Md Nor ditamat awal', b: 'Sebelum tamat kontrak baru 2 tahun (mulai 20 Julai 2020). Tanpa sebab.', p: 17 },
  { d: '2022-07-19', tema: 'asas', t: 'Laporan RCI ditandatangani', b: '6 bulan selepas pelantikan.', p: 12 },
  { d: '2022-08-30', tema: 'asas', t: 'Laporan dipersembahkan ke YDPA', b: 'KDYMA Seri Paduka Baginda Yang di-Pertuan Agong.', p: 5 }
];

/* --------------------------------------------------------------------------
   16. SYOR & CADANGAN (p228–237)
   -------------------------------------------------------------------------- */
RD.syor = [
  { t: 'Pindaan Akta 535', k: 'tadbir', p: [228, 229],
    items: ['Kriteria khusus pelantikan anggota Lembaga', 'Larang ahli politik aktif jadi Pengerusi/ALP', 'Dikanunkan: Panel Pelaburan, JPS, Jawatankuasa Urusan Haji', 'Hibah berdasarkan penyata diaudit, bukan Proforma/RAV', 'Penubuhan Dana Haji diawal SC, pengecualian Akta 240'] },
  { t: 'Pembahagian kuasa Menteri', k: 'tadbir', p: 231,
    items: ['Menteri Agama: urusan haji', 'Menteri Kewangan: kewangan, dana, pelaburan', 'Pelantikan Pengerusi/ALP/CEO oleh PM atas syor badan bebas'] },
  { t: 'Hadkan penglibatan anak syarikat', k: 'tadbir', p: 231, items: ['Dasar 5 syarikat sahaja.'] },
  { t: 'BNM tidak mengawal selia sepenuhnya', k: 'kawal', p: 232, items: ['Jika perlu, hadkan kepada kawalan rizab & kecairan.'] },
  { t: 'Audit swasta, bukan JAN', k: 'kawal', p: 232, items: ['LTH boleh melantik firma akauntan swasta.'] },
  { t: 'Audit forensik 14 pelaburan', k: 'forensik', p: 234, items: ['Senarai 14 pelaburan bermasalah.'] },
  { t: 'Hentikan bonus terlalu tinggi', k: 'wang', p: 235, items: ['Dapatkan kembali bonus TH Properties 2017/2018.'] },
  { t: 'Pelan Pemulihan & Sukuk', k: 'ujsb', p: 235, items: ['Sukuk dengan jaminan Kerajaan', 'Ciri tradeable', 'Peruntukan RM1.73 bilion setahun'] },
  { t: 'Deposit & bayaran haji', k: 'haji', p: [235, 236], items: ['Deposit minima naik RM1,300 → RM12,980', 'Had pengeluaran besar + notis sebulan', 'Subsidi hanya kepada yang perlu'] },
  { t: 'Kuota haji & giliran', k: 'haji', p: 236, items: ['Gunakan kuota tambahan Saudi (sasaran 60,000 menjelang 2030)', 'Naikkan bayaran pendaftaran untuk kurangkan giliran 130 → 33 tahun.'] },
  { t: 'Dana Haji', k: 'ujsb', p: [237],
    items: ['Pelaburan LTH dalam jabatan "Dana Haji" dikawal SC', 'Elakkan pelaburan strategik berisiko tinggi'] }
];

/* --------------------------------------------------------------------------
   17. PERCANGGAHAN DALAM LAPORAN
   -------------------------------------------------------------------------- */
RD.percanggahan = [
  { p: [139, 137], judul: 'Bonus 2015: RM61j vs RM65j',
    a: 'Jadual p139 sebut peruntukan bonus 2015 = RM61 juta',
    b: 'Jadual p137 sebut peruntukan bonus 2015 = RM65 juta',
    nota: 'Perbezaan RM4 juta. Tiada penjelasan dalam laporan.' },
  { p: [149, 139, 21], judul: 'Keuntungan bersih 2017: tiga nombor',
    a: 'Jadual bonus p139: keuntungan bersih 2017 RM2,798 juta',
    b: 'PwC p149: keuntungan tahun 2017 RM3,412 juta',
    c: 'Ringkasan Eksekutif p21: "RM3.4 bilion"',
    nota: 'Mungkin berbeza asas (sebelum/selepas zakat, sebelum/selepas cukai). Tiada perdamaian eksplisit.' },
  { p: [208, 209, 33], judul: 'Giliran menunggu haji: 130 vs 135 tahun',
    a: 'Perenggan 3.16.17: giliran semasa "135 tahun"',
    b: 'Ringkasan Eksekutif & perenggan 4.4.22: "130 tahun"',
    nota: 'Cadangan penurunan sama: 33 tahun.' },
  { p: [203, 204, 205], judul: 'Kos haji 2022: tiga nombor berbeza',
    a: 'Naratif p203: "kos haji tahun 2022 RM25,540"',
    b: 'Jadual unjuran p204: kos haji 2022 RM25,540 ✓',
    c: 'Catatan juga naratif sebut "RM35,000 menjelang 2030" — tetapi jadual p205 sebut RM37,729',
    nota: 'Angka 2022 konsisten; angka 2030 berbeza RM2,729.' },
  { p: [122, 150, 152], judul: 'Jumlah pendeposit 2018: dua nombor',
    a: 'p150: "lebih 9.2 juta pendeposit"',
    b: 'p152: "hampir 9.3 juta pendeposit"',
    nota: 'Selang muka surat kecil; tiada penjelasan.' },
  { p: [20, 22], judul: 'Sijil Audit: bersih atau teguran?',
    a: 'Pernyataan luar: "Sijil Audit Bersih 2014–2017"',
    b: 'Realiti 2017: "Pendapat Berteguran DICADANGKAN" oleh KAN tetapi DILEMBUTKAN ke "Emphasis of Matter"',
    nota: 'KAN sendiri mengakui mengambil kira perkara di luar skop audit.' }
];

/* --------------------------------------------------------------------------
   18. GLOSARI
   -------------------------------------------------------------------------- */
RD.glosari = [
  { t: 'RAV (Realisable Asset Value)', d: 'Nilai aset yang boleh direalisasi. Pengurusan LTH guna anggaran optimistik (bukan nilai pasaran). Menjadi asas Laporan Proforma.' },
  { t: 'Hibah', d: 'Agihan keuntungan LTH kepada pendeposit. Bukan "dividen" kerana akad simpanan berbeza. Hibah tahunan = untuk semua; hibah haji = untuk jemaah yang telah menunaikan haji.' },
  { t: 'HAFIS (Hajj Financial Support)', d: 'Bantuan Kewangan Haji LTH. Subsidi yang ditanggung LTH bagi kos haji sebenar jemaah Muassasah. Diambil dari keuntungan pelaburan, bukan suntikan Kerajaan.' },
  { t: 'Muassasah', d: 'Jemaah haji Malaysia yang diuruskan terus oleh LTH (di bawah kuota Muassasah Arab Saudi), berbeza dengan jemaah "Istinadak" yang dikelola swasta.' },
  { t: 'Rosot nilai (Impairment)', d: 'Pengurangan nilai aset dalam akaun apabila nilai sebenar jatuh di bawah nilai buku. Dipanggil "impairment loss" dalam perakaunan.' },
  { t: 'FRS 139', d: 'Financial Reporting Standard 139 — piawaian antarabangsa untuk rekod pelaburan kewangan. Mengikut FRS 139, rosot nilai 2017 sepatutnya RM1.310 bilion (bukan RM1 juta).' },
  { t: 'Sijil Audit Bersih', d: 'Pengauditor memberi "pendapat tanpa teguran" — iaitu berpendapat penyata kewangan memberi gambaran sebenar. Bukan bermakna tiada isu; hanya tiada isu material yang gagal dipatuhi.' },
  { t: 'Pendapat Berteguran', d: 'Pengauditor tidak berpuas hati dengan satu perkara material dalam penyata kewangan. Lebih serius daripada "Emphasis of Matter" (yang sekadar menonjolkan isu).' },
  { t: 'Sukuk', d: 'Sijil pelaburan Islam yang setara dengan bon. Berbeza dengan bon konvensional keranaSukuk mestilat berasaskan aset (bukan hutang kosong).' },
  { t: 'Sukuk berkupon sifar', d: 'Sukuk yang tidak membayar kupon berkala. Pulangan datang dari diskaun ke harga matang. Sukuk UJSB TIDAK membayar kupon — pulangan LTH dari pengakruan, bukan tunai.' },
  { t: 'Put option', d: 'Hak pemegang saham untuk "jualan paksa" saham kepada penjual asal pada harga tetap. Gagal di Emrail, Wellspring, PPB.' },
  { t: 'ROFR (Right of First Refusal)', d: 'Hak keutamaan LTH untuk ambil alih semula aset yang UJSB ingin lupuskan, pada harga perjanjian atau harga ambang.' },
  { t: 'Akta 535', d: 'Akta Tabung Haji 1995 — undang-undang utama yang menubuhkan LTH. Memberi kuasa luas kepada Menteri.' }
];

/* --------------------------------------------------------------------------
   19. HELPER
   -------------------------------------------------------------------------- */
RD.fmt = function (v, dp) {
  if (v == null || isNaN(v)) return '—';
  if (Math.abs(v) >= 1e9) return (v / 1e9).toFixed(dp ?? 2) + ' bilion';
  if (Math.abs(v) >= 1e6) return (v / 1e6).toFixed(dp ?? 1) + ' juta';
  if (Math.abs(v) >= 1e3 && Number.isInteger(v)) return v.toLocaleString('ms-MY');
  return v.toLocaleString('ms-MY');
};
RD.fmtRM = function (v, dp) { return 'RM ' + RD.fmt(v, dp); };
RD.srcTag = function (pages) {
  if (!pages || !pages.length) return '';
  return 'm/s ' + pages.join(', ');
};