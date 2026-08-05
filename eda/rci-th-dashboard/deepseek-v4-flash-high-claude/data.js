/* ============================================================
   RCI TABUNG HAJI — model data
   Sumber: Laporan Suruhanjaya Siasatan Diraja Tabung Haji
   (rci-tabung-haji.md, OCR laporan rasmi, 252 muka)
   Konvensyen:
     - src  = nombor halaman PDF laporan (anchor #pdf-page-N)
     - flag = fakta (terus dari laporan) | terbitan (kiraan) | unjuran
   ============================================================ */
window.RTH = window.RTH || {};

RTH.meta = {
  tajuk: 'Laporan Suruhanjaya Siasatan Diraja Tabung Haji (2014–2020)',
  skop: 'Menyiasat isu pengurusan dan operasi LTH 2014–2020',
  pembentangan: '30 Ogos 2022',
  ditandatangani: '19 Julai 2022',
  pesuruhjaya: [
    { n: 'Tun Md Raus bin Sharif', peranan: 'Pengerusi — Mantan Ketua Hakim Negara' },
    { n: 'Tan Sri Samsudin bin Osman', peranan: 'Mantan Ketua Setiausaha Negara' },
    { n: 'Tan Sri Abdul Rashid bin Hussain', peranan: 'Pengasas RHB Group' },
    { n: 'Tan Sri Dr. Mohd Munir bin Abdul Majid', peranan: 'Pengerusi CARI ASEAN' },
    { n: 'Profesor Dr. Asmadi bin Mohamed Naim', peranan: 'Naib Canselor UniSHAMS' },
    { n: 'Norsyahrin bin Hamidon', peranan: 'Akauntan Bertauliah' }
  ],
  saksiAbs: 45,
  saksiProsiding: 16,
  metodologi: ['Pengumpulan rekod & dokumen', 'Taklimat agensi', 'Akuan Berkanun Saksi (ABS)', 'Prosiding Suruhanjaya']
};

/* ============ 1. POSISI ASET vs LIABILITI (PwC financial review) ============ */
/* Pra = lebihan sebelum agihan hibah; pasca = baki bersih selepas agihan */
RTH.posisi = {
  src: [147, 113],
  flag: 'fakta',
  nota: 'Jadual asal PwC. "Liabiliti" termasuk Kumpulan Wang Pendeposit.',
  rows: [
    { y: 2013, aset: 48778, liab: 43696, pra: 5082, agihan: 2632, pasca: 2450 },
    { y: 2014, aset: 54751, liab: 51866, pra: 2885, agihan: 3237, pasca: -352 },
    { y: 2015, aset: 60196, liab: 60062, pra: 134,  agihan: 3220, pasca: -3086 },
    { y: 2016, aset: 64321, liab: 65581, pra: -1260, agihan: 2871, pasca: -4131 },
    { y: 2017, aset: 70317, liab: 71086, pra: -769,  agihan: 3324, pasca: -4093 }
  ]
};

/* ============ 2. HIBAH — kadar & jumlah ============ */
RTH.hibah = {
  kadar: {
    src: [120, 130], flag: 'fakta',
    rows: [
      { y: 2014, t: 6.25, h: 2.00 }, { y: 2015, t: 5.00, h: 3.00 },
      { y: 2016, t: 4.25, h: 1.50 }, { y: 2017, t: 4.50, h: 1.75 },
      { y: 2018, t: 1.25, h: 0 },    { y: 2019, t: 3.05, h: 0 },
      { y: 2020, t: 3.10, h: 0 },    { y: 2021, t: 3.10, h: null }
    ]
  },
  jumlah: {
    src: [130], flag: 'fakta', unit: 'RM ribu',
    rows: [
      { y: 2014, t: 2988053, h: 249143, j: 3237196 },
      { y: 2015, t: 2807369, h: 413005, j: 3220374 },
      { y: 2016, t: 2645625, h: 225197, j: 2870822 },
      { y: 2017, t: 3042184, h: 281557, j: 3323741 },
      { y: 2018, t: 922959,  h: 0,      j: 922959 },
      { y: 2019, t: 2140538, h: 0,      j: 2140538 },
      { y: 2020, t: 2242141, h: 0,      j: 2242141 }
    ]
  }
};

/* ============ 3. JAMBATAN RAV 2017 ============ */
RTH.rav = {
  src: [116, 113], flag: 'fakta',
  asetAudit: 70317, uplift: 4466, asetRav: 74783, liab: 74410, bersih: 373,
  thp: { dalamRav: 2294, asasHartanah: 4600, penilai: 556, anggaranMgmt: 4044 },
  nota: 'Uplift RAV RM4.466b. Daripada nilai hartanah RM4.6b, hanya RM556j disahkan penilai profesional; RM4.044b anggaran pengurusan semata-mata.'
};

/* ============ 4. POLISI ROSOT NILAI 2017 ============ */
RTH.rosot = {
  src: [148, 115, 116], flag: 'fakta',
  rows: [
    { id: 'frs', label: 'Ikut FRS 139 (patut)', kesan: 1310, s: 'JAN', d: 'Rosot nilai yang SEPATUTNYA direkodkan.' },
    { id: 'p70', label: 'Ambang lama >70%', kesan: 1313, s: 'PwC', d: 'Polisi sebelum diubah dalam 2017.' },
    { id: 'p85', label: 'Diubah → >85%', kesan: 171, s: 'PwC', d: 'Perubahan pertama dalam tahun kewangan 2017.' },
    { id: 'p90', label: 'Diubah lagi → >90%', kesan: 1, s: 'PwC', d: 'Perubahan kedua. Akhirnya hanya RM1 juta dirosot.' }
  ],
  frsic: { turun: 20, bulan: 12, d: 'FRSIC: kerugian "signifikan" bila nilai jatuh 20%; "berlanjutan" bila >12 bulan.' },
  takDiambilKira: { frs139: 1310, subsBersekutu: 227.81, jumlah: 1537, thHeavy: 164.58 }
};

/* ============ 5. P/L 2017 waterfall (PwC) ============ */
RTH.pl2017 = {
  src: [149], flag: 'fakta',
  rows: [
    { k: 'Keuntungan 2017 (dilapor)', v: 3412, jenis: 'base' },
    { k: 'Tolak rosot nilai ekuiti AFS', v: -4258, jenis: 'adj' },
    { k: 'Tolak rosot instrumen hutang', v: -7, jenis: 'adj' },
    { k: 'Tolak pelarasan lain', v: -580, jenis: 'adj' }
  ],
  hasil: { k: 'Kerugian terlaras 2017', v: -1433 },
  terkumpul: { simpanan: 162, pelarasan: -4845, kerugian: -4683 }
};

/* ============ 6. DEPOSIT & PENDEPOSIT ============ */
RTH.deposit = {
  src: [122, 123, 171, 218, 229],
  titik: [
    { label: 'Sebelum hibah 1.25%', v: 73, bila: 'Awal 2019', flag: 'fakta' },
    { label: 'Akhir 2019', v: 69, bila: 'Dis 2019', flag: 'fakta' },
    { label: 'Akhir 2020', v: 76, bila: 'Dis 2020', flag: 'terbitan' },
    { label: 'Semasa laporan', v: 88, bila: 'Mei 2022', flag: 'fakta' },
    { label: 'Unjuran LTH', v: 100, bila: '~2024', flag: 'unjuran' }
  ],
  tumpuan: { bawah2000: 65, top5pct: 75, src: [208, 216] },
  danaMinimaHafis: { v: 60, src: 111 },
  jaminanKerajaan: { v: 88, src: 235 }
};

/* ============ 7. RIZAB ============ */
RTH.rizab = {
  src: [104, 105, 106],
  nota: 'Perbendaharaan tidak pernah lulus baki minima Kumpulan Wang Rizab walaupun disyarat seksyen 22(3)(b) Akta 535.',
  guna: [
    { y: '2012, 2014, 2016', apa: 'Roland Berger dapati LTH guna rizab bayar hibah' },
    { y: '2020 & 2021', apa: 'LTH guna rizab tampung agihan hibah' }
  ]
};

/* ============ 8. UJSB — pemindahan aset & sukuk ============ */
RTH.ujsb = {
  src: [159, 162, 163, 165, 166, 167],
  penubuhan: '14 Disember 2018',
  pemindahan: {
    tarikh: '27 Disember 2018',
    kandungan: '106 saham tersenarai + 1 syarikat perladangan + 29 aset hartanah',
    rows: [
      { k: 'Hartanah & tanah', buku: 1411, pindah: 2247, pasaran: 1411 },
      { k: 'Syarikat perladangan', buku: 718, pindah: 802, pasaran: 718 },
      { k: 'Ekuiti tersenarai Bursa', buku: 16852, pindah: 16851, pasaran: 7600 }
    ],
    jumlah: { buku: 18981, pindah: 19900, pasaran: 9729 },
    premium: 10200
  },
  sukuk: {
    siri: [
      { n: 'Sukuk Siri 1', prinsipal: 10000, nominal: 13200, tempoh: 7, ytm: 4.05, matang: '2026' },
      { n: 'Sukuk Siri 2', prinsipal: 9600, nominal: 14300, tempoh: 10, ytm: 4.10, matang: '2029' }
    ],
    tunai: 300,
    tunaiJadual: [{ bila: '30 Dis 2019', v: 100 }, { bila: '30 Dis 2020', v: 200 }],
    ciri: ['Berkupon sifar', 'Tiada penarafan', 'Tidak boleh diniagakan', 'Unsecured', 'Hak Penolakan Pertama'],
    jaminan: 'TIDAK dijamin Kerajaan. Hanya Surat Sokongan Kewangan Menteri Kewangan (27 Mei 2019).',
    peratusPendapatan: 26,
    peratusAset: 31
  },
  danaKerajaan: {
    komitmen: 17800,
    pecahan: [
      { bila: '2020 (RMK-11)', v: 500 },
      { bila: 'RMK-12 & RMK-13', v: 17300, nota: '~RM1.73 bilion setahun' }
    ],
    diterima: [
      { tahun: 2020, v: 500, bentuk: 'Geran Kerajaan', guna: 'RM300j saham patuh syariah + RM200j penebusan awal sukuk (30 Nov 2020)' },
      { tahun: 2021, v: 0, bentuk: 'Tiada', guna: 'RM1.5b diluluskan Belanjawan 2021 TIDAK diterima — keutamaan Covid-19' }
    ]
  }
};

/* Blue-chip dipindah ke UJSB */
RTH.bluechip = {
  src: [162, 163],
  tarikhPasaran: '31 Dis 2018',
  tarikhSemasa: '8 Jun 2022',
  rows: [
    { k: 'Axiata', pindah: 6.00, pasaran: 3.63, jun22: 3.04, jatuhPct: 39.5 },
    { k: 'Maxis',  pindah: 6.84, pasaran: 5.43, jun22: 3.52, jatuhPct: 20.6 },
    { k: 'MISC',   pindah: 7.43, pasaran: 6.15, jun22: 7.30, jatuhPct: 17.2 },
    { k: 'Digi',   pindah: 5.13, pasaran: 4.24, jun22: 3.27, jatuhPct: 17.3 },
    { k: 'TM',     pindah: 5.96, pasaran: 2.33, jun22: 5.20, jatuhPct: 60.9 }
  ],
  jumlah: { pindah: 3605977061, pasaran: 2659905704 },
  tidakPatuh: ['YTL Power', 'Bumi Armada', 'Integrated Logistics', 'Yi-Lai']
};

/* Hartanah UJSB — nilai pemindahan vs pasaran Dis 2021 */
RTH.hartanahUjsb = {
  src: [161],
  rows: [
    { k: 'Tanah', pindah: 627006479, pasaran: 401080000 },
    { k: 'Menara pejabat', pindah: 737399698, pasaran: 325000000 },
    { k: 'Lot kedai', pindah: 46301759, pasaran: 33330000 },
    { k: 'Hotel', pindah: 804058625, pasaran: 424270000 },
    { k: 'Perindustrian', pindah: 31914386, pasaran: 19000000 }
  ],
  jumlah: { pindah: 2246680947, pasaran: 1202680000 },
  tiadaBidaan: 17
};

/* ROFR — 9 transaksi */
RTH.rofr = {
  src: [169],
  rows: [
    { k: 'WZ Satu', tarikh: '24 Mac 2020', rofr: 0.090, pasaran: 0.064, premium: 40.6 },
    { k: 'E&O', tarikh: '25 Mac 2020', rofr: 0.365, pasaran: 0.335, premium: 9.0 },
    { k: 'WZ Satu', tarikh: '31 Mac 2020', rofr: 0.085, pasaran: 0.075, premium: 13.3 },
    { k: 'WCT', tarikh: '2 Apr 2020', rofr: 0.400, pasaran: 0.377, premium: 6.1 },
    { k: 'KSL', tarikh: '6 Mei 2020', rofr: 0.610, pasaran: 0.630, premium: -3.2 },
    { k: 'KSL', tarikh: '21 Mei 2020', rofr: 0.580, pasaran: 0.605, premium: -4.1 },
    { k: 'Hap Seng Plant', tarikh: '29 Mei 2020', rofr: 1.650, pasaran: 1.570, premium: 5.1 },
    { k: 'FGV', tarikh: '9 Dis 2020', rofr: 1.300, pasaran: 1.270, premium: 2.4 },
    { k: 'Integrated Logistics', tarikh: '14 Mar 2022', rofr: 0.380, pasaran: 0.365, premium: 4.1 }
  ]
};

/* Komitmen Jaminan Kerajaan — jadual 5.3 (p165) */
RTH.komitmenJaminan = {
  src: [165], flag: 'fakta',
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
  ]
};

/* ============ 9. BONUS KAKITANGAN LTH ============ */
RTH.bonus = {
  src: [137, 139],
  rows: [
    { y: 2010, peruntukan: 25, kadar: '2.5+1', untung: null },
    { y: 2011, peruntukan: 35, kadar: '3+1', untung: null },
    { y: 2012, peruntukan: 38, kadar: '3.5+1', untung: null },
    { y: 2013, peruntukan: 49, kadar: '2.5–10 bln', untung: 2634 },
    { y: 2014, peruntukan: 74, kadar: '1–11+2 Khas', untung: 2979, sorot: true },
    { y: 2015, peruntukan: 65, kadar: '1–10 bln', untung: 3537 },
    { y: 2016, peruntukan: 25, kadar: '1–3 bln', untung: 2481 },
    { y: 2017, peruntukan: 56.7, kadar: '1–6 bln', untung: 2798 },
    { y: 2018, peruntukan: 10.8, kadar: '1 bln', untung: null },
    { y: 2019, peruntukan: 11.6, kadar: '1 bln', untung: null },
    { y: 2020, peruntukan: 14.1, kadar: '1 bln', untung: null }
  ],
  siling: { bulan: 2, rujukan: 'Pekeliling Perbendaharaan WP 7.2 para 3.1.6' }
};

/* Bonus khas TH Properties & THP Australia */
RTH.bonusKhas = {
  src: [141, 142, 143, 144],
  y2017: {
    entiti: 'TH Properties Sdn. Bhd.',
    kelulusan: 'Exco TH Properties, 12 April 2017',
    alasan: 'Kejayaan The Bay Pavilion, Australia — pulangan AUD11.6j (Dis 2016)',
    jumlah: 1148400,
    penerima: [
      { n: 'Datuk Azizan Abdul Rahman', v: 231000, jw: 'Pengerusi' },
      { n: "Dato' Roszali Othman", v: 189750, jw: 'Pengarah' },
      { n: 'Haji Abd Kadir Sahlan', v: 189750, jw: 'Pengarah' },
      { n: 'Nik Badrul Hisham Nik Hassan', v: 99000, jw: 'Pegawai' },
      { n: 'Anuarifaei Mustapa', v: 99000, jw: 'Pegawai' },
      { n: 'Nur Adlan Taib', v: 99000, jw: 'Pegawai' },
      { n: 'Zaidi Baharudin', v: 56100, jw: 'Pegawai' },
      { n: 'Haji Mohamed Rahim Ismail', v: 52800, jw: 'Pegawai' },
      { n: 'Aida Karim', v: 49500, jw: 'Pegawai' },
      { n: 'Marhaizah Mohamed Yusuf', v: 49500, jw: 'Pegawai' },
      { n: "Dato' Mohd Fazillah Mohd Ali", v: 33000, jw: 'Pengarah' }
    ],
    pelanggaran: 'Seksyen 230(2) & 230(4) Akta Syarikat 2016'
  },
  y2018: {
    entiti: 'THP Australia Capital Sdn. Bhd.',
    kelulusan: 'Lembaga 23 Apr 2018; Mesyuarat Agong 30 Nov 2018',
    alasan: 'Keuntungan sebelum cukai RM34.84j (2017)',
    jumlah: 1045000,
    penerima: [
      { n: "Dato' Roszali Othman", v: 176500, jw: 'Pengarah' },
      { n: 'Haji Abd Kadir Sahlan', v: 176500, jw: 'Pengarah' },
      { n: "Dato' Azizan Abd Rahman", v: 167250, jw: 'Pengarah' },
      { n: 'Nik Badrul Hisham', v: 101500, jw: 'Pegawai' },
      { n: 'Anuarifaei Mustapa', v: 101500, jw: 'Pegawai' },
      { n: 'Nur Adlan Taib', v: 101500, jw: 'Pegawai' },
      { n: 'Zaidi Baharudin', v: 63000, jw: 'Pegawai' },
      { n: 'Aida Karim', v: 63000, jw: 'Pegawai' },
      { n: 'Marhaizah Mohamed Yusuf', v: 63000, jw: 'Pegawai' },
      { n: 'Haji Mohamed Rahim Ismail', v: 31250, jw: 'Pegawai' }
    ],
    pelanggaran: 'Seksyen 230(3) Akta Syarikat 2016'
  },
  jumlahGabungan: 2193400
};

/* ============ 10. HAFIS / KOS HAJI ============ */
RTH.hafis = {
  src: [204, 205],
  sejarah: [
    { y: 2014, kos: 16155, bayaran: 9980, jumlahJuta: 106 },
    { y: 2015, kos: 17270, bayaran: 9980, jumlahJuta: 135 },
    { y: 2016, kos: 18890, bayaran: 9980, jumlahJuta: 160 },
    { y: 2017, kos: 19550, bayaran: 9980, jumlahJuta: 298 },
    { y: 2018, kos: 22450, bayaran: 9980, jumlahJuta: 314 },
    { y: 2019, kos: 22900, bayaran: 9980, jumlahJuta: 299 }
  ],
  tiadaHaji: [2020, 2021],
  unjuran: [
    { y: 2022, kos: 25540, bayaran: 12980, jumlahRibu: 376800 },
    { y: 2023, kos: 26280, bayaran: 12980, jumlahRibu: 399000 },
    { y: 2024, kos: 28160, bayaran: 12980, jumlahRibu: 455400 },
    { y: 2025, kos: 29570, bayaran: 12980, jumlahRibu: 497700 },
    { y: 2026, kos: 31040, bayaran: 12980, jumlahRibu: 541800 },
    { y: 2027, kos: 32592, bayaran: 12980, jumlahRibu: 588360 },
    { y: 2028, kos: 34221, bayaran: 12980, jumlahRibu: 637230 },
    { y: 2029, kos: 35932, bayaran: 12980, jumlahRibu: 688560 },
    { y: 2030, kos: 37729, bayaran: 12980, jumlahRibu: 742470 }
  ],
  bayaran2022: [{ kump: 'B40', v: 10980 }, { kump: 'Bukan B40', v: 12980 }],
  beku: { dari: 2009, hingga: 2021, nilai: 9980 },
  totalSejak2001: { v: 2020, nota: 'Jumlah HAFIS sejak 2001: RM2.02 bilion.' },
  masaMenunggu: { sekarang: 135, cadangan: 33, percanggahan: '130 vs 135 tahun dalam laporan' },
  depositMinima: { sekarang: 1300, cadangan: 12980 },
  kuota: { sekarang: 30000, sasaran2030: 60000 }
};

/* ============ 11. PELABURAN BERMASALAH (14 kes) ============ */
RTH.pelaburan = [
  { id: 'thip', n: 'PT TH Indo Plantations (THIP)', sektor: 'Perladangan', lokasi: 'Riau, Indonesia',
    src: [177, 178], status: 'polis', modus: 'Penjualan aset', pegangan: '95% ekuiti dijual ke PT Borneo Pacific',
    rugiRm: null, laburRm: null, skala: 'USD910j harga asal',
    angka: ['Keluasan 83,000 hektar', 'Harga dikurangkan USD100j', 'Pendahuluan LTH USD178.6j'],
    isu: 'Syer dipindah SEBELUM bayaran penuh. LTH terpaksa beri pendahuluan USD178.6j.',
    tindakan: 'Siasatan forensik + laporan polis (30 Nov 2018)' },
  { id: 'emrail', n: 'Emrail Sdn. Bhd.', sektor: 'Pelaburan', lokasi: 'Malaysia',
    src: [178, 179], status: 'timbangtara', modus: 'Put option gagal', pegangan: '15.3% ekuiti (7 Jun 2016)',
    rugiRm: 19.3, laburRm: 20.17, skala: 'RM20.3j put option',
    angka: ['Bayaran RM20.17j', 'Terima RM2j sahaja', 'Rosot nilai RM19.3j'],
    isu: 'Penyenaraian dibatalkan; sasaran untung RM36.1j tak capai.',
    tindakan: 'Writ Mahkamah Tinggi (8 Sep 2021) → timbangtara AIAC (22 Apr 2022)' },
  { id: 'wellspring', n: 'Wellspring Worldwide', sektor: 'Teknologi', lokasi: 'Malaysia',
    src: [179, 180], status: 'mahkamah', modus: 'Put option gagal', pegangan: '10% ekuiti (21 Sep 2014)',
    rugiRm: 19.03, laburRm: 18.4, skala: 'RM19.03j put option',
    angka: ['Bayaran RM18.4j', 'Terima RM0', 'Perintah mahkamah RM20.8j tak dibayar'],
    isu: 'Promoter gagal bayar walau diperintah mahkamah.',
    tindakan: 'Notis kebankrapan (25 Jan 2022)' },
  { id: 'dssb', n: 'Deru Semangat (DSSB)', sektor: 'Perladangan sawit', lokasi: 'Pahang',
    src: [180, 181], status: 'selesai', modus: 'Usaha sama', pegangan: '55% ekuiti',
    rugiRm: 225, laburRm: 257, skala: 'RM257j dikeluarkan',
    angka: ['Dirotot nilai kepada RM32j', 'Dikembalikan RM259j', 'Komitmen baki RM258j dinepatkan'],
    isu: 'Pembalakan hutan simpan langgar polisi NDPE pembeli utama Wilmar.',
    tindakan: 'Dikembalikan kepada Tengku Muda Pahang' },
  { id: 'trurich', n: 'Trurich Resources', sektor: 'Perladangan sawit', lokasi: 'Kalimantan, Indonesia',
    src: [181, 182], status: 'polis', modus: 'Usaha sama', pegangan: 'JV dengan FGV Kalimantan',
    rugiRm: 364.31, laburRm: 364.31, skala: 'RM364.31j dirosot penuh',
    angka: ['Pinjaman Maybank tertunggak USD179j', 'Laporan tanah dimanipulasi 40,880 hektar'],
    isu: 'Laporan kesesuaian tanah dimanipulasi.',
    tindakan: 'Laporan polis (13 Dis 2018). Menteri lulus pelupusan (22 Dis 2020)' },
  { id: 'abraj', n: 'Abraj Sdn. Bhd.', sektor: 'Hartanah', lokasi: 'Malaysia',
    src: [182, 183], status: 'selesai', modus: 'Usaha sama', pegangan: '50/50 dengan Amanah Raya',
    rugiRm: 40.25, laburRm: 85, skala: 'RM40.25j rosot nilai',
    angka: ['Ekuiti LTH RM85j', 'Tidak mampu bayar pinjaman sejak 2015'],
    isu: 'Penyewa utama berpindah; tidak mampu bayar pinjaman.',
    tindakan: 'Jual 50% kepada Amanah Raya (Dis 2020)' },
  { id: 'ppb', n: 'Putrajaya Perdana Berhad', sektor: 'Pembinaan', lokasi: 'Malaysia',
    src: [183, 184], status: 'pantau', modus: 'Put option gagal', pegangan: '30% ekuiti (Dis 2014)',
    rugiRm: 145.3, laburRm: 193.5, skala: 'RM145.3j rosot nilai',
    angka: ['Beli 30% RM193.5j', 'Put option RM210.7j tak dibayar', 'Nilai buku bersih RM48.2j'],
    isu: 'Sasaran IPO setahun gagal. CDSB gagal bayar put option.',
    tindakan: 'Tindakan undang-undang diluluskan (12 Nov 2020); rundingan berjalan' },
  { id: 'alrawda', n: 'Al-Rawda (Makkah & Madinah)', sektor: 'Hotel', lokasi: 'Arab Saudi',
    src: [184, 185, 186, 187], status: 'timbangtara', modus: 'Pajakan jangka panjang', pegangan: '4 hotel, 10–18 tahun',
    rugiRm: 202.8, laburRm: null, skala: 'RM202.8j jangkaan kerugian kredit',
    angka: ['Bayar SR1,426j', 'Sewa tertunggak SR560.7j', 'Al-Rawda dilantik sekali gus sebagai pengendali'],
    isu: 'Gagal bayar sewa sejak Mac 2019.',
    tindakan: 'Perintah penguatkuasaan Mahkamah Arab Saudi; timbangtara' },
  { id: 'alfareeda', n: 'Al-Fareeda Residential Fund', sektor: 'Dana hartanah', lokasi: 'Arab Saudi',
    src: [188], status: 'hapus', modus: 'Dana luar', pegangan: '13.8% dana SR550j (via Anfaal Capital)',
    rugiRm: 63, laburRm: 63, skala: 'SR76j hapus kira penuh',
    angka: ['Hapus kira penuh', 'Pengurus dana tidak dapat dikesan'],
    isu: 'Pengurus dana TIDAK DAPAT DIKESAN.',
    tindakan: 'Dihapus kira sepenuhnya' },
  { id: 'thp', n: 'TH Plantations Berhad', sektor: 'Perladangan (tersenarai)', lokasi: 'Malaysia/Indonesia',
    src: [188, 189], status: 'polis', modus: 'Tadbir urus anak syarikat', pegangan: 'Tersenarai, milik LTH',
    rugiRm: 170, laburRm: null, skala: 'RM170j rosot nilai di LTH',
    angka: ['Sukuk RM1.2b', 'Ladang produktif 58% sahaja', 'Laporan forensik PwC 25 Apr 2019'],
    isu: 'PwC dapati pengurusan & Lembaga gagal tanggungjawab fidusiari.',
    tindakan: 'Laporan ke PDRM/SPRM/SC. CEO letak jawatan (20 Ogos 2018)' },
  { id: 'thprop', n: 'TH Properties Sdn. Bhd.', sektor: 'Hartanah', lokasi: 'Malaysia/Australia',
    src: [189, 190], status: 'pantau', modus: 'Bonus tanpa kelulusan', pegangan: 'Subsidiari milik penuh',
    rugiRm: 2.2, laburRm: null, skala: 'RM2.2j bonus tanpa kelulusan',
    angka: ['26 subsidiari + 5 usaha sama', 'Untung sebelum cukai 2017 RM34.84j'],
    isu: 'Bonus istimewa dibayar TANPA kelulusan LTH.',
    tindakan: 'Siasatan dalaman; Lembaga putuskan dapatkan kembali bonus' },
  { id: 'thmarine', n: 'Alam Maritim / TH Marine', sektor: 'Perkhidmatan marin', lokasi: 'Malaysia',
    src: [190, 191], status: 'pantau', modus: 'Usaha sama', pegangan: '51% ekuiti (18 Jun 2015)',
    rugiRm: 278, laburRm: 334, skala: 'RM278j rosot nilai',
    angka: ['Pelaburan RM334j', 'PwC jangka recovery RM70.4j sahaja'],
    isu: 'Kemelesetan minyak rentetan pelaburan marin (AHTS).',
    tindakan: 'PwC dilantik nilai kebolehpulihan' },
  { id: 'thhr', n: 'TH Hotel & Residences', sektor: 'Hotel', lokasi: 'Malaysia',
    src: [191, 192], status: 'pantau', modus: 'Aset pulangan rendah', pegangan: 'Subsidiari milik penuh sejak Mei 2007',
    rugiRm: null, laburRm: null, skala: 'RM804.1j nilai dipindah ke UJSB',
    angka: ['Premium ~55% ke atas nilai buku', 'Pulangan aset <2%', 'Sewa Kelana Jaya jatuh 62% (2019→2020)'],
    isu: 'Hotel pulangan rendah dipindah ke UJSB.',
    tindakan: 'Perjanjian Pemindahan Aset UJSB (28 Dis 2018)' },
  { id: 'fgv', n: 'FGV Berhad', sektor: 'Perladangan (IPO)', lokasi: 'Malaysia',
    src: [192, 193], status: 'selesai', modus: 'IPO dipegang terlalu lama', pegangan: '7.5% selepas IPO 2012',
    rugiRm: 1058.94, laburRm: 1310.02, skala: 'RM1.06 bilion kerugian tidak nyata',
    angka: ['IPO RM1,253,742,809 (9 Mei & 26 Jun 2012)', 'Harga jatuh ke RM0.885', 'Dipindah ke UJSB pada harga kos'],
    isu: 'LTH terus pegang sampai harga jatuh; kerugian dipindah ke UJSB.',
    tindakan: 'Saham dipindah ke UJSB pada harga kos (Kerajaan tanggung)' }
];
RTH.pelaburanStatus = {
  polis: 'Laporan polis / siasatan', mahkamah: 'Tindakan mahkamah', timbangtara: 'Timbangtara',
  selesai: 'Dilupus / selesai', hapus: 'Hapus kira', pantau: 'Pemantauan / rundingan'
};

/* ============ 12. TADBIR URUS ============ */
RTH.jawatan = {
  src: [56, 59, 60, 61, 62, 63, 64, 65],
  siri: [
    { k: 'Menteri Hal Ehwal Agama', orang: [
      { n: "Dato' Seri Jamil Khir Baharom", dari: '2009-02-10', hingga: '2018-05-09' },
      { n: 'Tun Dr Mahathir (kuasa Menteri)', dari: '2018-05-10', hingga: '2018-07-01', khas: true },
      { n: 'Datuk Seri Dr. Mujahid Yusof Rawa', dari: '2018-07-02', hingga: '2020-03-09' },
      { n: 'Datuk Dr. Zulkifli al-Bakri', dari: '2020-03-10', hingga: '2021-08-29' },
      { n: 'Datuk Idris Ahmad', dari: '2021-08-30', hingga: null }
    ]},
    { k: 'Pengerusi Lembaga', orang: [
      { n: 'Datuk Seri Abdul Azeez Abdul Rahim', dari: '2013-07-01', hingga: '2018-05-23', politik: true },
      { n: 'Tan Sri Md Nor Md Yusof', dari: '2018-07-10', hingga: '2021-10-15', tamatAwal: true },
      { n: 'Tan Sri Azman Mokhtar', dari: '2021-12-20', hingga: null }
    ]},
    { k: 'Ketua Pegawai Eksekutif', orang: [
      { n: 'Tan Sri Ismee Ismail', dari: '2006-01-01', hingga: '2016-06-30' },
      { n: 'Datuk Seri Johan Abdullah', dari: '2016-07-01', hingga: '2018-06-30' },
      { n: "Dato' Sri Zukri Samat", dari: '2018-07-10', hingga: '2019-08-31' },
      { n: 'Datuk Nik Hasyudeen Yusoff', dari: '2019-09-01', hingga: '2021-05-05', tamatAwal: true },
      { n: 'Datuk Sri Amrin Awaluddin', dari: '2021-05-06', hingga: null }
    ]}
  ]
};

RTH.politik = {
  src: [77],
  orang: [
    { n: 'Datuk Seri Abdul Azeez Abdul Rahim', peranan: 'Anggota 2011, Pengerusi 2013–2018', politik: 'AP Baling; Majlis Tertinggi UMNO' },
    { n: 'Tan Sri Badruddin Amiruldin', peranan: 'Anggota 2005–2018', politik: 'AP Yan/Jerai 2004–2008; Pengerusi Tetap UMNO' },
    { n: 'Datuk Rosni Sohar', peranan: 'Anggota 2014–2018', politik: 'ADUN Hulu Bernam; Setiausaha Wanita UMNO' }
  ],
  dapatan: 'Keputusan LTH (hibah, bayaran haji, HAFIS) "didorong unsur-unsur politik".'
};

RTH.anakSyarikat = {
  src: [84, 85, 86, 87, 88, 89, 90],
  had: { baru: 5 },
  orang: [
    { n: 'Datuk Rozaida Omar', peranan: 'CFO Kumpulan (2004–2021)', bil: 23, contoh: ['Syarikat Takaful', 'BIMB Holdings', 'TH Heavy Engineering', 'Putrajaya Perdana', 'LTH Property Holdings 1–4'] },
    { n: 'Datuk Seri Johan Abdullah', peranan: 'KPE 2016–2018', bil: 18, contoh: ['TH Heavy Eng (Pengerusi)', 'Trurich (Pengerusi)', 'DSSB (Pengerusi)', 'TH Plantations', 'Malakoff'] },
    { n: 'Datuk Abdul Azeez', peranan: 'Pengerusi 2013–2018', bil: 8, contoh: ['TH Real Estate LLC', 'TH Hotel & Residence', 'Putrajaya Perdana', 'Yayasan TH'] },
    { n: "Dato' Noordin Sulaiman", peranan: 'Anggota 2018–', bil: 9, contoh: ['TH Hotel & Residences', 'TH Travel & Services', 'Premia Cards'] },
    { n: 'Datuk Zaiton Hassan', peranan: 'Anggota 2018–2020', bil: 7, contoh: ['TH Properties', 'THP Enstek', 'LTH Property Holdings 1–5'] },
    { n: 'Tan Sri Ismee Ismail', peranan: 'KPE 2006–2016', bil: 7, nota: 'Terus pegang 3 jawatan hingga Mei 2018 — hampir 2 tahun selepas tamat perkhidmatan.' },
    { n: 'Datuk Nik Hasyudeen', peranan: 'KPE 2019–2021', bil: 4 },
    { n: "Dato' Sri Zukri Samat", peranan: 'KPE 2018–2019', bil: 4 },
    { n: 'Datuk Sri Amrin', peranan: 'KPE 2021–', bil: 3 }
  ]
};

RTH.jawatankuasa = {
  src: [63, 64],
  dimansuh: [
    { n: 'Panel Pelaburan', bila: 'Mei 2018', kesan: 'Diganti Exco Perniagaan yang TIDAK PERNAH berfungsi. Dibubar secara pentadbiran walaupun penting.' },
    { n: 'Majlis Penasihat Haji', bila: '2018', kesan: 'Diganti Jawatankuasa Urusan Haji.' }
  ],
  dikanunkan: ['Panel Pelaburan', 'Jawatankuasa Penasihat Syariah', 'Jawatankuasa Urusan Haji']
};

RTH.kuasaMenteri = {
  src: [78, 79, 81],
  senarai: [
    { k: 'Pelantikan Pengerusi & Anggota Lembaga', kini: 'Menteri Agama', cadang: 'Perdana Menteri (syor badan bebas)' },
    { k: 'Pelantikan KPE', kini: 'Menteri Agama', cadang: 'Perdana Menteri (syor badan bebas)' },
    { k: 'Honorarium & elaun anggota', kini: 'Menteri Agama', cadang: 'Menteri Agama' },
    { k: 'Peraturan syarat perkhidmatan & tatatertib', kini: 'Menteri Agama', cadang: 'Menteri Agama' },
    { k: 'Pembiayaan kepada syarikat LTH', kini: 'Menteri Agama', cadang: 'Menteri Kewangan' },
    { k: 'Peraturan deposit & pengeluaran', kini: 'Menteri Agama', cadang: 'Menteri Kewangan' },
    { k: 'SETIAP aktiviti pelaburan LTH', kini: 'Menteri Agama', cadang: 'Menteri Kewangan' },
    { k: 'Pemindahan wang KW Rizab', kini: 'Menteri Agama', cadang: 'Menteri Kewangan' },
    { k: 'Pengisytiharan hibah', kini: 'Menteri Agama', cadang: 'Menteri Kewangan' }
  ]
};

/* ============ 13. AMARAN YANG DIABAIKAN ============ */
RTH.amaran = [
  { dari: 'BNM', tarikh: '2014-08-21', tajuk: 'Pengambilan deposit & kecairan', hasil: 'diabai', src: 100 },
  { dari: 'BNM', tarikh: '2014-12-19', tajuk: 'Pengambilan deposit & kecairan', hasil: 'diabai', src: 247 },
  { dari: 'BNM', tarikh: '2015-12-23', tajuk: 'Dasar rizab', hasil: 'sebahagian', src: 247 },
  { dari: 'BNM', tarikh: '2015-12-23', tajuk: 'Pengurusan kewangan LTH', hasil: 'diabai', src: 247 },
  { dari: 'BNM', tarikh: '2016-12-14', tajuk: 'Dasar rizab', hasil: 'diabai', src: 213 },
  { dari: 'BNM', tarikh: '2017-02-17', tajuk: 'Dasar rizab', hasil: 'diabai', src: 213 },
  { dari: 'Roland Berger', tarikh: '2017-03-03', tajuk: '5-Year Strategic Plan (kerugian RM2.6b)', hasil: 'diabai', src: 214 },
  { dari: 'Roland Berger', tarikh: '2018-02-02', tajuk: 'Strategic Plan Review (Revised)', hasil: 'diabai', src: 246 },
  { dari: 'KAN', tarikh: '2018-07-16', tajuk: 'Emphasis of Matter (bukan Pendapat Berteguran)', hasil: 'lembut', src: 22 },
  { dari: 'KAN', tarikh: '2018-12-19', tajuk: 'Penjelasan isu penyata kewangan 2017', hasil: 'lembut', src: 133 },
  { dari: 'PwC', tarikh: '2018-11-09', tajuk: 'Financial Position Review (defisit sejak 2014)', hasil: 'bertindak', src: 147 },
  { dari: 'BNM', tarikh: '2018-12-28', tajuk: 'Pengawalseliaan & langkah kehematan', hasil: 'bertindak', src: 100 },
  { dari: 'BNM', tarikh: '2019-06-26', tajuk: 'Penzahiran zakat (akad Wadi\'ah)', hasil: 'bertindak', src: 108 },
  { dari: 'BNM', tarikh: '2022-04-18', tajuk: 'Model perniagaan baharu', hasil: 'ditolak', src: 217 }
];
RTH.amaranHasil = {
  diabai: { l: 'Diabaikan', c: 'bad' }, sebahagian: { l: 'Sebahagian', c: 'warn' },
  lembut: { l: 'Dilembutkan', c: 'warn' }, bertindak: { l: 'Ditindaklanjuti', c: 'good' },
  ditolak: { l: 'Ditolak Suruhanjaya', c: 'neutral' }
};

RTH.pihak = [
  { n: 'BNM', peranan: 'Pemantau (bukan pengawal selia sah pre-2019)', dapatan: '6 surat amaran 2014–2017 tanpa kuasa penguatkuasaan.', syor: 'Tidak mengawal selia LTH sepenuhnya. Jika perlu, had kepada rizab + kecairan.', src: [99, 101, 102] },
  { n: 'JAN', peranan: 'Juruaudit statutori', dapatan: 'Sijil Audit Bersih 2014–2017. Untuk 2017, Pendapat Berteguran dicadang tetapi dilembutkan ke Emphasis of Matter.', syor: 'Pengauditan kepada firma akauntan swasta.', src: [21, 22, 125] },
  { n: 'EY', peranan: 'Konsultan RAV & Laporan Proforma', dapatan: 'Proforma dikatakan berasaskan penyata diaudit — tidak benar; RAV semakan 23 Mei 2018, penyata muktamad 16 Julai 2018.', syor: 'RAV tidak boleh jadi asas hibah.', src: [114, 118, 119] },
  { n: 'PwC', peranan: 'Financial review & audit forensik', dapatan: 'Mengesahkan defisit sejak 2014. Hibah 2014–2017 bercanggah seksyen 22.', syor: '—', src: [147, 148, 149] },
  { n: 'Roland Berger', peranan: 'Kajian pelan strategik 2017–2018', dapatan: 'Model berisiko; anggaran kerugian RM2.6b. Tidak diberi perhatian; tiada rekod dibentang kepada Lembaga.', syor: '—', src: [104, 117, 213] },
  { n: 'Perbendaharaan/MOF', peranan: 'Wakil Lembaga; pelulus bonus & rizab', dapatan: 'TIDAK PERNAH lulus baki minima KW Rizab. Bonus >2 bulan = budi bicara Menteri Kewangan.', syor: 'Menteri Kewangan kawal kewangan/dana/pelaburan.', src: [104, 139, 231] }
];

/* ============ 14. TATATERTIB & PENGUATKUASAAN ============ */
RTH.tatatertib = {
  src: [197, 198, 199, 200, 201],
  kes: [
    { n: 'Datuk Rozaida Omar', jw: 'CFO Kumpulan', kluster: 'Penjualan saham THIP; Akta Syarikat; Hibah 2017', asal: 'Buang kerja', rayuan: 'Turun pangkat', kini: 'Masih bertugas' },
    { n: "Dato' Adi Azuan", jw: 'KPO', kluster: 'Sumbangan Yayasan TH tanpa kelulusan', asal: 'Turun pangkat', rayuan: 'Amaran keras', kini: 'Masih bertugas' },
    { n: 'Rifina Md Ariff', jw: 'PBM Perkhidmatan Korporat', kluster: 'Penjualan saham THIP', asal: 'Buang kerja', rayuan: 'Turun pangkat', kini: 'Masih bertugas' },
    { n: 'Mohd Hisham Harun', jw: 'KP Sumber Manusia', kluster: 'THIP; Akta Syarikat', asal: 'Buang kerja', rayuan: 'Turun pangkat', kini: 'Masih bertugas' },
    { n: 'Hazlina Mohd Khalid', jw: 'Penasihat Undang-Undang', kluster: 'THIP; Tuntutan palsu', asal: 'Buang kerja', rayuan: 'Turun pangkat', kini: 'Masih bertugas' }
  ],
  kesimpulan: 'Kelima-lima masih bertugas. Proses "mengambil masa terlalu lama".'
};

RTH.laporanPolis = {
  src: [193, 194, 195, 196],
  rows: [
    { tarikh: '30 Nov 2018', repot: 'Dang Wangi/31347/2018', isu: 'Yayasan TH — guna wang menyalahi Memorandum & Articles.', status: 'PDRM selesai; dirujuk JPN' },
    { tarikh: '30 Nov 2018', repot: 'Dang Wangi/31331/2018', isu: 'Salah nyata penjualan 95% saham THIP (USD910j).', status: 'PDRM berterusan (kebenaran Indonesia)' },
    { tarikh: '13 Dis 2018', repot: 'Dang Wangi/32724/2018', isu: 'Manipulasi laporan kesesuaian tanah 40,880 hektar Kalimantan.', status: 'PDRM berterusan' },
    { tarikh: '16 Jan 2019', repot: 'Dang Wangi/1484/2019', isu: 'Pengisytiharan hibah 2017 bercanggah seksyen 22 Akta 535.', status: 'PDRM selesai; dirujuk JPN' }
  ],
  sprm: ['Pembelian Ladang Weida oleh THP', 'Restoran Opah KL Sentral', 'Restoran Nasi Dalca IPTH', 'Pengubahsuaian mantan KPO', 'Pemalsuan dokumen rubber seedlings THP', 'Salah laku THP Bina & THP Timur'],
  sprmStatus: 'Semua masih siasatan SPRM semasa laporan disiapkan.'
};

/* ============ 15. KRONOLOGI ============ */
RTH.kronologi = [
  { d: '1951', tema: 'asas', t: 'Ordinan Haji 1951', b: 'Pejabat Urusan Haji Pulau Pinang ditubuhkan.', src: 53 },
  { d: '1962', tema: 'asas', t: 'PWSBH ditubuhkan', b: 'Perbadanan Wang Simpanan Bakal-Bakal Haji (Akta 34/62).', src: 53 },
  { d: '1969', tema: 'asas', t: 'LUTH ditubuhkan', b: 'Akta 8 menggantikan PWSBH.', src: 54 },
  { d: '1995', tema: 'asas', t: 'LTH ditubuhkan', b: 'Akta 535 berkuat kuasa 16 Feb 1995; LUTH dimansuh 1 Jun 1995.', src: 54 },
  { d: '2001', tema: 'hafis', t: 'HAFIS dimulakan', b: 'Subsidi diambil dari keuntungan boleh agih.', src: 207 },
  { d: '2009', tema: 'hafis', t: 'Bayaran haji dibekukan RM9,980', b: 'Beku 13 tahun walaupun kos terus naik.', src: 211 },
  { d: '2010', tema: 'krisis', t: 'KW Pendeposit dikelas ekuiti', b: 'JAN terima penyata dengan KW Pendeposit sebagai ekuiti (bukan liabiliti).', src: 132 },
  { d: '2013', tema: 'tadbir', t: 'Abdul Azeez jadi Pengerusi', b: 'AP Baling & Majlis Tertinggi UMNO.', src: 59 },
  { d: '2014', tema: 'amaran', t: 'Amaran BNM #1 & #2', b: 'Pengambilan deposit & kecairan.', src: 100 },
  { d: '2014', tema: 'krisis', t: 'Jurang defisit bermula', b: 'Hibah 2014 (RM3.24b) melebihi lebihan (RM2.89b) — baki −RM352j.', src: 147 },
  { d: '2015', tema: 'amaran', t: 'Amaran BNM #3 & #4', b: 'Kebimbangan menyeluruh pengurusan kewangan.', src: 100 },
  { d: '2016', tema: 'krisis', t: 'EY rangka kerja RAV', b: 'LTH mula guna RAV untuk Laporan Proforma.', src: 127 },
  { d: '2016', tema: 'krisis', t: 'Akad tukar ke Wadi\'ah', b: 'Deposit dikira simpanan; LTH jadi peminjam.', src: 107 },
  { d: '2017-03-03', tema: 'amaran', t: 'Laporan Roland Berger', b: 'Kerugian RM2.6b. Tiada rekod dibentang kepada Lembaga.', src: 214 },
  { d: '2017', tema: 'krisis', t: 'Polisi rosot nilai diubah 2 kali', b: 'Ambang 70% → 85% → 90%. Rosot akhir RM1j sahaja.', src: 148 },
  { d: '2018-02-06', tema: 'krisis', t: 'Dua Mesyuarat Khas Lembaga', b: 'Kertas kerja 6 & 9 Feb untuk benarkan hibah tinggi 2017.', src: 196 },
  { d: '2018-02-07', tema: 'krisis', t: 'Kaedah kiraan hibah tukar & tarik balik', b: 'Baki tahunan → baki bulanan; lebihan RM600j keluar.', src: 115 },
  { d: '2018-05-23', tema: 'tadbir', t: 'Abdul Azeez letak jawatan', b: 'Selepas PH menang PRU14 (9 Mei 2018).', src: 59 },
  { d: '2018-07-16', tema: 'amaran', t: 'KAN — Emphasis of Matter', b: 'Bukan Pendapat Berteguran; ambil kira persepsi pendeposit.', src: 22 },
  { d: '2018-11-09', tema: 'amaran', t: 'PwC financial review final', b: 'Mengesahkan defisit sejak 2014. Asas Pelan Pemulihan.', src: 147 },
  { d: '2018-12-07', tema: 'ujsb', t: 'JM lulus Pelan Pemulihan', b: 'Pelan pemulihan & penstrukturan LTH.', src: 159 },
  { d: '2018-12-14', tema: 'ujsb', t: 'UJSB ditubuhkan', b: 'Model Danaharta 1998.', src: 159 },
  { d: '2018-12-27', tema: 'ujsb', t: 'Perjanjian pemindahan aset', b: 'RM19.9b (vs pasaran RM9.7b).', src: 159 },
  { d: '2019-01-01', tema: 'amaran', t: 'LTH diletak bawah BNM', b: 'Tanpa skop jelas; tidak selari Akta 535.', src: 100 },
  { d: '2019', tema: 'krisis', t: 'Hibah 2018 hanya 1.25%', b: 'Dari 4.50% → 1.25%. Deposit susut RM73b → RM69b.', src: 122 },
  { d: '2019-12', tema: 'krisis', t: 'Akad tukar ke Wakalah', b: 'Selepas BNM tegur zakat.', src: 108 },
  { d: '2020-11-30', tema: 'ujsb', t: 'UJSB tebus awal Sukuk RM200j', b: 'Dari Geran Kerajaan 2020 RM500j.', src: 167 },
  { d: '2021-05-05', tema: 'tadbir', t: 'KPE Nik Hasyudeen ditamat awal', b: 'Tanpa sebab.', src: 16 },
  { d: '2021-10-15', tema: 'tadbir', t: 'Pengerusi Md Nor ditamat awal', b: 'Tanpa sebab.', src: 17 },
  { d: '2022-07-19', tema: 'asas', t: 'Laporan RCI ditandatangani', b: '6 bulan selepas pelantikan.', src: 12 }
];
RTH.kronologiTema = {
  asas: 'Asas institusi', krisis: 'Krisis kewangan', tadbir: 'Tadbir urus',
  amaran: 'Amaran diabaikan', hafis: 'Kos haji & HAFIS', ujsb: 'Pemulihan UJSB'
};

/* ============ 16. SYOR ============ */
RTH.syor = [
  { t: 'Pindaan Akta 535', k: 'tadbir', src: [228, 229], items: ['Kriteria khusus pelantikan anggota Lembaga', 'Larang ahli politik aktif jadi Pengerusi/ALP', 'Dikanunkan: Panel Pelaburan, JPS, Jawatankuasa Urusan Haji', 'Hibah berdasarkan penyata diaudit, bukan Proforma/RAV', 'Penubuhan Dana Haji di bawah SC'] },
  { t: 'Pembahagian kuasa Menteri', k: 'tadbir', src: 231, items: ['Menteri Agama: urusan haji', 'Menteri Kewangan: kewangan, dana, pelaburan', 'Pelantikan Pengerusi/ALP/CEO oleh PM atas syor badan bebas'] },
  { t: 'Hadkan penglibatan anak syarikat', k: 'tadbir', src: 231, items: ['Dasar maksimum 5 syarikat'] },
  { t: 'BNM tidak kawal selia sepenuhnya', k: 'kawal', src: 232, items: ['Jika perlu, had kepada kawalan rizab & kecairan'] },
  { t: 'Audit swasta, bukan JAN', k: 'kawal', src: 232, items: ['LTH boleh melantik firma akauntan swasta'] },
  { t: 'Audit forensik 14 pelaburan', k: 'forensik', src: 234, items: ['Senarai 14 pelaburan bermasalah'] },
  { t: 'Hentikan bonus terlalu tinggi', k: 'wang', src: 235, items: ['Dapatkan kembali bonus TH Properties 2017/2018'] },
  { t: 'Pelan Pemulihan & Sukuk', k: 'ujsb', src: 235, items: ['Sukuk dengan jaminan Kerajaan', 'Ciri boleh diniagakan (tradeable)', 'Peruntukan RM1.73 bilion setahun'] },
  { t: 'Deposit & bayaran haji', k: 'haji', src: [235, 236], items: ['Deposit minima RM1,300 → RM12,980', 'Had pengeluaran besar + notis sebulan', 'Subsidi hanya kepada yang perlu'] },
  { t: 'Kuota haji & giliran', k: 'haji', src: 236, items: ['Guna kuota tambahan Saudi (60,000 menjelang 2030)', 'Giliran 130 → 33 tahun'] },
  { t: 'Dana Haji', k: 'ujsb', src: [237], items: ['Pelaburan LTH dalam jabatan "Dana Haji" dikawal SC', 'Elakkan pelaburan strategik berisiko tinggi'] }
];
RTH.syorKategori = { tadbir: 'Tadbir urus', kawal: 'Kawal selia', forensik: 'Audit forensik', wang: 'Saraan & bonus', ujsb: 'Pemulihan & Sukuk', haji: 'Haji & deposit' };

/* ============ 17. PERCANGGAHAN DATA ============ */
RTH.percanggahan = [
  { judul: 'Bonus 2015: RM61j vs RM65j', a: 'Jadual p139 sebut RM61 juta', b: 'Jadual p137 sebut RM65 juta', src: [139, 137] },
  { judul: 'Untung bersih 2017: tiga nombor', a: 'Jadual bonus p139: RM2,798 juta', b: 'PwC p149: RM3,412 juta; Ringkasan Eksekutif: RM3.4 bilion', src: [149, 139, 21] },
  { judul: 'Giliran menunggu haji: 130 vs 135 tahun', a: 'Para 3.16.17: 135 tahun', b: 'Ringkasan Eksekutif: 130 tahun', src: [208, 209, 33] },
  { judul: 'Kos haji 2030: RM35k vs RM37,729', a: 'Naratif sebut RM35,000', b: 'Jadual unjuran p205 sebut RM37,729', src: [203, 204, 205] },
  { judul: 'Pendeposit 2018: 9.2 vs 9.3 juta', a: 'p150: "lebih 9.2 juta"', b: 'p152: "hampir 9.3 juta"', src: [150, 152] },
  { judul: 'Sijil Audit: bersih atau teguran?', a: 'Dinyatakan "Sijil Audit Bersih 2014–2017"', b: 'Realiti 2017: Pendapat Berteguran DICADANGKAN tetapi dilembutkan', src: [20, 22] }
];

/* ============ 18. GLOSARI (bahasa layman) ============ */
RTH.glosari = [
  { t: 'Hibah', d: 'Agihan keuntungan LTH kepada pendeposit. Bukan "dividen" biasa — LTH mengurus wang simpanan, bukan saham.' },
  { t: 'HAFIS', d: 'Bantuan Kewangan Haji. Subsidi yang ditanggung LTH untuk menampung kos haji sebenar jemaah. Diambil dari keuntungan pelaburan, bukan wang kerajaan.' },
  { t: 'Muassasah', d: 'Jemaah haji Malaysia yang diuruskan terus oleh LTH, berbeza dengan jemaah "Istinadak" yang dikelola swasta.' },
  { t: 'Rosot nilai (impairment)', d: 'Pengurangan nilai aset dalam akaun apabila nilai sebenar jatuh di bawah nilai buku.' },
  { t: 'FRS 139', d: 'Piawaian perakaunan untuk rekod pelaburan kewangan. Ikut piawaian ini, rosot nilai 2017 sepatutnya RM1.31 bilion, bukan RM1 juta.' },
  { t: 'Sijil Audit Bersih', d: 'Juruaudit berpendapat penyata kewangan memberi gambaran sebenar. Bukan bermakna tiada isu langsung.' },
  { t: 'Pendapat Berteguran', d: 'Juruaudit tidak berpuas hati dengan satu perkara material. Lebih serius daripada "Emphasis of Matter" (sekadar menonjolkan isu).' },
  { t: 'RAV', d: 'Nilai Aset yang Boleh Direalisasi — anggaran optimistik pengurusan tentang nilai aset. Menjadi asas Laporan Proforma.' },
  { t: 'Sukuk', d: 'Sijil pelaburan Islam, setara dengan bon, tetapi berasaskan aset (bukan hutang kosong).' },
  { t: 'Sukuk berkupon sifar', d: 'Sukuk yang tidak membayar pulangan berkala. Pulangan datang dari diskaun ke harga matang.' },
  { t: 'Put option', d: 'Hak "jualan paksa" saham kepada penjual asal pada harga tetap. Gagal di Emrail, Wellspring, PPB.' },
  { t: 'ROFR', d: 'Hak keutamaan LTH untuk ambil alih semula aset yang UJSB ingin lupuskan.' },
  { t: 'Akta 535', d: 'Akta Tabung Haji 1995 — undang-undang utama LTH. Memberi kuasa luas kepada Menteri.' }
];

/* ============ 19. FORMAT ============ */
RTH.fmt = function (v, dp) {
  if (v == null || isNaN(v)) return '—';
  if (Math.abs(v) >= 1e9) return (v / 1e9).toFixed(dp ?? 2) + ' bilion';
  if (Math.abs(v) >= 1e6) return (v / 1e6).toFixed(dp ?? 1) + ' juta';
  if (Math.abs(v) >= 1e3 && Number.isInteger(v)) return v.toLocaleString('ms-MY');
  return v.toLocaleString('ms-MY');
};
RTH.fmtRM = function (v, dp) { return 'RM ' + RTH.fmt(v, dp); };
RTH.src = function (p) {
  if (p == null) return '';
  var arr = Array.isArray(p) ? p : [p];
  return 'm/s ' + arr.join(', ');
};
