/* ============================================================================
   RCI TABUNG HAJI — LAPISAN DATA
   ----------------------------------------------------------------------------
   Semua angka di sini diekstrak terus daripada Laporan Suruhanjaya Siasatan
   Diraja Tabung Haji (19 Julai 2022).

   Setiap nilai dilabel dengan darjah kepastian:
     "laporan"  = angka tersurat dalam laporan
     "terbitan" = dikira oleh dashboard ini daripada angka laporan (formula
                  ditunjukkan kepada pengguna)
     "simulasi" = hasil andaian pengguna, BUKAN fakta laporan

   Rujukan sumber: { pdf: <muka surat PDF>, ms: "<label muka surat bercetak>" }
   Pautan sumber dijana ke fail markdown asal di GitHub pada baris tepat.
   ============================================================================ */

(function () {
  'use strict';

  // Peta muka surat PDF -> nombor baris dalam rci-tabung-haji.md
  var PAGE_LINE = ('8,19,27,44,52,85,100,115,162,197,252,300,338,388,439,491,539,587,638,695,743,791,839,887,936,986,1032,1080,1133,1185,1234,1286,1332,1382,1427,1480,1539,1589,1604,1612,1620,1668,1718,1767,1820,1871,1918,1967,2020,2068,2076,2084,2092,2137,2185,2235,2287,2338,2387,2440,2499,2552,2618,2668,2717,2760,2768,2776,2784,2835,2883,2933,2984,3032,3084,3133,3178,3227,3277,3325,3372,3418,3464,3511,3559,3617,3668,3714,3765,3812,3863,3913,3960,4011,4058,4106,4152,4202,4252,4300,4345,4391,4439,4485,4533,4578,4626,4675,4723,4770,4819,4865,4903,4949,4993,5037,5080,5125,5172,5221,5267,5313,5360,5408,5455,5503,5552,5600,5643,5691,5730,5778,5824,5872,5921,5969,6015,6058,6095,6133,6182,6229,6278,6325,6370,6419,6463,6510,6561,6612,6659,6705,6752,6802,6849,6897,6944,6992,7039,7085,7133,7178,7221,7269,7314,7361,7408,7456,7502,7548,7594,7640,7687,7733,7780,7826,7873,7920,7969,8018,8066,8114,8164,8214,8264,8311,8360,8405,8454,8501,8550,8599,8645,8694,8741,8788,8836,8890,8938,8986,9041,9087,9136,9186,9233,9279,9328,9373,9421,9468,9519,9564,9611,9657,9705,9751,9798,9845,9893,9940,9988,10031,10083,10132,10176,10207,10215,10223,10231,10279,10330,10379,10428,10477,10524,10574,10622,10655,10697,10749')
    .split(',').map(Number);

  var REPO = 'https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md';

  function srcUrl(pdfPage) {
    var line = PAGE_LINE[pdfPage - 1];
    return line ? REPO + '?plain=1#L' + line : REPO;
  }

  // ---------------------------------------------------------------- METADATA
  var META = {
    tajuk: 'Laporan Suruhanjaya Siasatan Diraja Tabung Haji',
    skop: 'Isu pengurusan dan operasi Lembaga Tabung Haji, tahun 2014 hingga 2020',
    tarikhLaporan: '19 Julai 2022',
    tarikhPersembahan: '30 Ogos 2022',
    mukaSurat: 240,
    pengerusi: 'Tun Md Raus bin Sharif',
    pesuruhjaya: [
      { nama: 'Tun Md Raus bin Sharif', latar: 'Mantan Ketua Hakim Negara', peranan: 'Pengerusi' },
      { nama: 'Tan Sri Samsudin bin Osman', latar: 'Mantan Ketua Setiausaha Negara', peranan: 'Pesuruhjaya' },
      { nama: 'Tan Sri Abdul Rashid bin Hussain', latar: 'Pengasas RHB Group', peranan: 'Pesuruhjaya' },
      { nama: 'Tan Sri Dr. Mohd Munir bin Abdul Majid', latar: 'Pengerusi CARI ASEAN Research & Advocacy', peranan: 'Pesuruhjaya' },
      { nama: 'Profesor Dr. Asmadi bin Mohamed Naim', latar: 'Naib Canselor UniSHAMS', peranan: 'Pesuruhjaya' },
      { nama: 'Encik Norsyahrin bin Hamidon', latar: 'Akauntan Bertauliah', peranan: 'Pesuruhjaya' }
    ],
    setiausaha: 'Datuk Hajah Hakimah binti Mohd Yusoff (Ketua Pengarah JAKIM)',
    saksiABS: 45,
    saksiProsiding: 16,
    tempoh: '20 Januari 2022 – 19 Julai 2022 (enam bulan)',
    agensiTaklimat: [
      { nama: 'Lembaga Tabung Haji', tarikh: '23 Feb, 8 Apr & 28 Apr 2022' },
      { nama: 'Ernst & Young', tarikh: '24 Feb & 7 Julai 2022' },
      { nama: 'Roland Berger', tarikh: '25 Feb 2022' },
      { nama: 'PricewaterhouseCoopers', tarikh: '10 Mac 2022' },
      { nama: 'Bank Negara Malaysia', tarikh: '14 Mac 2022' },
      { nama: 'Jabatan Audit Negara', tarikh: '25 Mac 2022' },
      { nama: 'Kementerian Kewangan', tarikh: '1 Apr 2022' },
      { nama: 'Urusharta Jamaah Sdn. Bhd.', tarikh: '1 Apr 2022' }
    ],
    src: { pdf: 41, ms: '3' }
  };

  // ------------------------------------------------- KEDUDUKAN ASET/LIABILITI
  // Sumber: analisa PwC (ms 74 & ms 109). RM juta.
  var KEWANGAN = {
    src: { pdf: 147, ms: '109' },
    srcAlt: { pdf: 112, ms: '74' },
    tahun: [2013, 2014, 2015, 2016, 2017],
    aset: [48778, 54751, 60196, 64321, 70317],
    liabiliti: [43696, 51866, 60062, 65581, 71086],
    sebelumAgihan: [5082, 2885, 134, -1260, -769],
    agihan: [2632, 3237, 3220, 2871, 3324],
    selepasAgihan: [2450, -352, -3086, -4131, -4093]
  };

  // 2017: tiga cara melihat tahun yang sama
  var PANDANGAN2017 = {
    src: { pdf: 116, ms: '78' },
    src2: { pdf: 117, ms: '79' },
    baris: [
      {
        label: 'Cara LTH (guna RAV)',
        nilai: 373,
        warna: 'pos',
        formula: 'Aset 70,317 + tokokan RAV 4,466 = 74,783; tolak liabiliti 74,410 = +373',
        nota: 'RAV = Nilai Aset Yang Boleh Direalisasi. Nilai tambahan yang dianggarkan sendiri oleh pengurusan, bukan harga pasaran.',
        src: { pdf: 116, ms: '78' }
      },
      {
        label: 'Cara Jabatan Audit Negara',
        nilai: -1164,
        warna: 'neg',
        formula: '+373 tolak rosot nilai yang tidak direkod 1,537 (1,310 aset kewangan + 227 anak/syarikat bersekutu) = −1,164',
        nota: 'Angka RM1.164 bilion liabiliti bersih disebut terus dalam laporan.',
        src: { pdf: 117, ms: '79' }
      },
      {
        label: 'Cara PwC',
        nilai: -4093,
        warna: 'neg',
        formula: 'Aset 70,317 − liabiliti 71,086 = −769; tolak agihan 3,324 = −4,093',
        nota: 'PwC tidak menerima tokokan RAV langsung dan menggunakan penyata kewangan sebagai asas.',
        src: { pdf: 147, ms: '109' }
      }
    ]
  };

  // Jambatan untung 2017 (PwC) — RM juta
  var JAMBATAN2017 = {
    src: { pdf: 149, ms: '111' },
    langkah: [
      { label: 'Untung dilaporkan 2017', nilai: 3412, jenis: 'mula' },
      { label: 'Rosot nilai ekuiti AFS', nilai: -4258, jenis: 'ubah' },
      { label: 'Rosot nilai instrumen hutang AFS', nilai: -7, jenis: 'ubah' },
      { label: 'Pelarasan lain', nilai: -580, jenis: 'ubah' },
      { label: 'Kerugian terlaras', nilai: -1433, jenis: 'akhir' }
    ],
    terkumpul: {
      simpanan: 162,
      pelarasan: -4845,
      hasil: -4683
    }
  };

  // Dasar rosot nilai — kesan ambang (ms 110)
  var ROSOTNILAI = {
    src: { pdf: 148, ms: '110' },
    pilihan: [
      { ambang: 70, tempoh: '> 24 bulan', kesan: 1313, label: '70% di bawah kos' },
      { ambang: 85, tempoh: 'tiada', kesan: 171, label: '85% di bawah kos' },
      { ambang: 90, tempoh: 'tiada', kesan: 1, label: '90% di bawah kos' }
    ],
    diguna: 90,
    direkod: 1.0,
    nota: 'Dalam tahun kewangan 2017 sahaja, dasar rosot nilai diubah dua kali: 70% → 85% → 90%. Laporan menyatakan satu perubahan berlaku dalam tempoh satu hari.',
    panduanFRSIC: 'Panduan FRSIC 14 (MIA): kerugian dikira "signifikan" apabila nilai aset turun 20% atau lebih, dan "berlarutan" apabila melebihi 12 bulan.',
    srcFRSIC: { pdf: 114, ms: '76' }
  };

  // Tokokan RAV 2017
  var RAV = {
    src: { pdf: 116, ms: '78' },
    jumlahAset: 70317,
    tokokan: 4466,
    asetRAV: 74783,
    liabilitiRAV: 74410,
    bersih: 373,
    contohTHP: {
      jumlah: 2294,
      penilaianHartanah: 4600,
      olehPenilaiProfesional: 556,
      anggaranPengurusan: 4044,
      src: { pdf: 113, ms: '75' }
    }
  };

  // ------------------------------------------------------------------- HIBAH
  var HIBAH = {
    srcKadar: { pdf: 120, ms: '82' },
    srcJumlah: { pdf: 130, ms: '92' },
    tahun: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
    kadarTahunan: [6.25, 5.00, 4.25, 4.50, 1.25, 3.05, 3.10, 3.10],
    kadarHaji: [2.00, 3.00, 1.50, 1.75, 0, 0, 0, 0],
    // RM'000
    jumlahTahunan: [2988053, 2807369, 2645625, 3042184, 922959, 2140538, 2242141, null],
    jumlahHaji: [249143, 413005, 225197, 281557, 0, 0, 0, null],
    jumlah: [3237196, 3220374, 2870822, 3323741, 922959, 2140538, 2242141, null],
    kupasan2017: {
      keupayaan: 2700,      // RM juta, kaedah baki minima tahunan @ 4%
      dibayar: 3310,        // RM juta
      lebihan: 610,
      lebihanPeratus: 22.5,
      src: { pdf: 131, ms: '93' }
    },
    perubahanKaedah: {
      teks: 'Pada 2017 kaedah kira hibah ditukar daripada purata baki bulanan kepada purata baki tahunan. Diumum 7 Feb 2018, ditarik balik selepas reaksi negatif pendeposit. Kaedah bulanan digunakan semula — LTH mengeluarkan lebihan RM600 juta.',
      src: { pdf: 115, ms: '77' }
    },
    dasarBaharu: {
      teks: 'Selepas 2018, sasaran hibah ialah 50–100 mata asas di atas purata kadar deposit bank Islam.',
      src: { pdf: 122, ms: '84' }
    },
    kumulatif: { nilai: 37.52, unit: 'bilion', tempoh: '1966–2021', src: { pdf: 229, ms: '191' } }
  };

  // ------------------------------------------------------------------ DEPOSIT
  var DEPOSIT = {
    src: { pdf: 122, ms: '84' },
    titik: [
      { label: 'Sebelum umum hibah 2018', nilai: 73, nota: 'Anggaran laporan: "kira-kira RM73 bilion"', tahun: 2018.9 },
      { label: 'Akhir 2019', nilai: 69, nota: 'Selepas hibah 1.25% diumumkan', tahun: 2019.95 },
      { label: 'Akhir 2020', nilai: 76, nota: '"lebih kurang RM76 bilion"', tahun: 2020.95 },
      { label: '21 Mei 2022', nilai: 88, nota: 'Liabiliti kepada pendeposit', tahun: 2022.4 }
    ],
    unjuran: { nilai: 100, tempoh: 'dalam dua tahun', src: { pdf: 218, ms: '180' } },
    pendeposit2018: 9.2,
    pendeposit2022: 8.6,
    tumpuan: {
      kecil: { peratusPendeposit: 65, ambang: 'RM2,000 atau kurang', src: { pdf: 207, ms: '169' } },
      besar: { peratusDeposit: 75, peratusPendeposit: 5, src: { pdf: 216, ms: '178' } }
    }
  };

  // ------------------------------------------------------------------- BONUS
  var BONUS = {
    src: { pdf: 137, ms: '99' },
    tahun: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    peruntukan: [25, 35, 38, 49, 74, 65, 25, 56.7, 10.8, 11.6, 14.1],
    bulan: ['2.5 + 1 khas', '3 + 1 khas', '3.5 + 1 khas', '2.5–10', '1–11 + 2 khas', '1–10', '1–3', '1–6', '1', '1', '1'],
    bulanMax: [3.5, 4, 4.5, 10, 13, 10, 3, 6, 1, 1, 1],
    untungVsBonus: {
      src: { pdf: 139, ms: '101' },
      tahun: [2013, 2014, 2015, 2016, 2017],
      untungBersih: [2634, 2979, 3537, 2481, 2798],
      bonus: [49, 74, 61, 25, 57],
      peratus: [1.9, 2.5, 1.7, 1.0, 2.0]
    },
    thProperties: {
      src2017: { pdf: 142, ms: '104' },
      src2018: { pdf: 143, ms: '105' },
      y2017: [
        { nama: 'Datuk Azizan bin Abdul Rahman', jumlah: 231000 },
        { nama: 'Dato’ Roszali bin Othman', jumlah: 189750 },
        { nama: 'Haji Abd Kadir bin Sahlan', jumlah: 189750 },
        { nama: 'Nik Badrul Hisham bin Nik Hassan', jumlah: 99000 },
        { nama: 'Anuarifaei bin Mustapa', jumlah: 99000 },
        { nama: 'Nur Adlan bin Taib', jumlah: 99000 },
        { nama: 'Zaidi bin Baharudin', jumlah: 56100 },
        { nama: 'Haji Mohamed Rahim bin Ismail', jumlah: 52800 },
        { nama: 'Aida binti Karim', jumlah: 49500 },
        { nama: 'Marhaizah binti Mohamed Yusuf', jumlah: 49500 },
        { nama: 'Dato’ Mohd Fazillah bin Mohd Ali', jumlah: 33000 }
      ],
      jum2017: 1148400,
      y2018: [
        { nama: 'Dato’ Azizan bin Abd Rahman', jumlah: 167250 },
        { nama: 'Dato’ Roszali bin Othman', jumlah: 176500 },
        { nama: 'Haji Abd Kadir bin Sahlan', jumlah: 176500 },
        { nama: 'Nik Badrul Hisham bin Nik Hassan', jumlah: 101500 },
        { nama: 'Anuarifaei bin Mustapa', jumlah: 101500 },
        { nama: 'Nur Adlan bin Taib', jumlah: 101500 },
        { nama: 'Zaidi bin Baharudin', jumlah: 63000 },
        { nama: 'Aida binti Karim', jumlah: 63000 },
        { nama: 'Marhaizah binti Mohamed Yusuf', jumlah: 63000 },
        { nama: 'Haji Mohamed Rahim bin Ismail', jumlah: 31250 }
      ],
      jum2018: 1045000,
      // Kehadiran mesyuarat yang meluluskan bayaran (nama seperti dalam laporan)
      hadir2017: ['Azizan bin Abd Rahman', 'Roszali bin Othman', 'Mohd Fazillah bin Mohd Ali', 'Abd Kadir bin Sahlan'],
      hadir2018: ['Roszali bin Othman', 'Abd Kadir bin Sahlan', 'Nik Badrul Hisham bin Nik Hassan', 'Anuarifaei bin Mustapa'],
      notaNama: 'Laporan mengeja nama yang sama secara berbeza antara dua jadual ("Azizan bin Abdul Rahman" pada 2017 dan "Azizan bin Abd Rahman" pada 2018). Papan ini menyeragamkan ejaan supaya seorang individu tidak dikira dua kali.',
      alasan2017: 'Kejayaan projek "The Bay Pavilion" di Australia — didakwa membawa pulangan AUD11.6 juta kepada TH Properties sehingga Disember 2016.',
      alasan2018: 'TH Properties memperoleh keuntungan sebelum cukai RM34.84 juta pada 2017.',
      undang: 'Firma guaman MD. Tajuddin & Co: bayaran 2017 melanggar seksyen 230(2) & 230(4) Akta Syarikat 2016; bayaran 2018 melanggar seksyen 230(3).',
      srcUndang: { pdf: 144, ms: '106' }
    },
    peraturan: 'Pekeliling Perbendaharaan WP 7.2: bonus untuk anggota Bukan Eksekutif tidak lebih dua bulan gaji jika tiada persetujuan bersama; melebihi dua bulan hanya jika ramai menunjukkan prestasi cemerlang.',
    srcPeraturan: { pdf: 136, ms: '98' }
  };

  // -------------------------------------------------------------------- UJSB
  var UJSB = {
    src: { pdf: 159, ms: '121' },
    ditubuh: '14 Disember 2018',
    pemilik: 'Menteri Kewangan Diperbadankan (100%)',
    aset: {
      src: { pdf: 159, ms: '121' },
      baris: [
        { label: 'Hartanah dan tanah', buku: 1411, pindah: 2247, pasaran: 1411 },
        { label: 'Syarikat perladangan', buku: 718, pindah: 802, pasaran: 718 },
        { label: 'Ekuiti tersenarai Bursa', buku: 16852, pindah: 16851, pasaran: 7600 }
      ],
      jumlah: { buku: 18981, pindah: 19900, pasaran: 9729 },
      premium: 10171
    },
    kandungan: '106 kaunter saham tersenarai, sebuah syarikat perladangan, dan 29 aset hartanah.',
    sukuk: {
      src: { pdf: 163, ms: '125' },
      siri: [
        { nama: 'Sukuk Siri 1', prinsipal: 10.0, nominal: 13.2, tempoh: 7, ytm: 4.05, matang: 2026 },
        { nama: 'Sukuk Siri 2', prinsipal: 9.6, nominal: 14.3, tempoh: 10, ytm: 4.10, matang: 2029 }
      ],
      tunai: 0.3,
      nominalJumlah: 27.5,
      yieldTertunggak: 7.65,
      ciri: 'Berkupon sifar, tidak dinilai penarafan, tidak boleh diniaga, tidak boleh dipindah milik, tanpa cagaran.',
      srcCiri: { pdf: 164, ms: '126' },
      jaminan: 'TIDAK dijamin Kerajaan. Hanya Surat Sokongan Kewangan Menteri Kewangan bertarikh 27 Mei 2019 (seksyen 14 Akta 61) — pada pandangan Suruhanjaya ia hanyalah "Letter of Comfort".',
      srcJaminan: { pdf: 165, ms: '127' }
    },
    tunaiDiterima: {
      src: { pdf: 166, ms: '128' },
      baris: [
        { tarikh: '30 Dis 2019', jumlah: 100, tujuan: 'Bayaran saham tidak patuh syariah' },
        { tarikh: '30 Nov 2020', jumlah: 200, tujuan: 'Penebusan awal Sukuk' },
        { tarikh: '30 Dis 2020', jumlah: 200, tujuan: 'Bayaran saham tidak patuh syariah' }
      ],
      jumlah: 500,
      nilaiPasaranDipindah: 9730
    },
    komitmenKerajaan: {
      src: { pdf: 165, ms: '127' },
      diluluskan: 17800,
      pecahan: 'RM500 juta (2020, RMK-11) + sekurang-kurangnya RM17.3 bilion di bawah RMK-12 & RMK-13 (purata RM1.73 bilion setahun).',
      setahun: 1730,
      diterima2020: 500,
      tidakDiterima2021: 1500,
      sebab2021: 'Keutamaan peruntukan diberi kepada perbelanjaan pemulihan ekonomi ekoran pandemik Covid-19.'
    },
    jaminanNegara: {
      src: { pdf: 165, ms: '127' },
      tajuk: 'Komitmen Jaminan Kerajaan Persekutuan',
      entiti: [
        { nama: 'DanaInfra Nasional Berhad', y2020: 72320, y2021: 76020 },
        { nama: 'Prasarana Malaysia Berhad', y2020: 38914, y2021: 38914 },
        { nama: 'Malaysia Rail Link Sdn. Bhd.', y2020: 21530, y2021: 23177 },
        { nama: 'Urusharta Jamaah Sdn. Bhd.', y2020: 20683, y2021: 21097, sorot: true },
        { nama: 'Suria Strategic Energy Resources', y2020: 6951, y2021: 7276 },
        { nama: 'GovCo Holdings Berhad', y2020: 7200, y2021: 5700 },
        { nama: 'Jambatan Kedua Sdn. Bhd.', y2020: 5528, y2021: 5514 },
        { nama: 'Turus Pesawat Sdn. Bhd.', y2020: 5310, y2021: 5310 },
        { nama: 'MKD Kencana Sdn. Bhd.', y2020: 3500, y2021: 4500 },
        { nama: 'SRC Kencana Sdn. Bhd.', y2020: 2485, y2021: 1785 },
        { nama: 'Sentuhan Budiman Sdn. Bhd.', y2020: 800, y2021: 750 },
        { nama: 'TRX City Sdn. Bhd.', y2020: 253, y2021: 192 },
        { nama: 'Assets Global Network Sdn. Bhd.', y2020: 253, y2021: 202 }
      ],
      jumlah: { y2020: 185727, y2021: 190437 }
    },
    hartanah: {
      src: { pdf: 161, ms: '123' },
      baris: [
        { label: 'Tanah', kps: 1353361.48, pindah: 627006479, pasaran: 401080000 },
        { label: 'Menara pejabat', kps: 354021, pindah: 737399698, pasaran: 325000000 },
        { label: 'Lot kedai', kps: 120062, pindah: 46301759, pasaran: 33330000 },
        { label: 'Hotel', kps: 354134, pindah: 804058625, pasaran: 424270000 },
        { label: 'Perindustrian', kps: 35019, pindah: 31914386, pasaran: 19000000 }
      ],
      jumlah: { kps: 2216597.48, pindah: 2246680947, pasaran: 1202680000 },
      nota: 'Nilai pasaran setakat 31 Disember 2021 oleh jurunilai bebas bertauliah.',
      jppham: 'JAN: 11 daripada 29 hartanah dipindah di bawah nilaian JPPHM, tetapi secara keseluruhan nilai pindahan melebihi nilaian JPPHM sebanyak RM543.65 juta.'
    },
    bluechip: {
      src: { pdf: 162, ms: '124' },
      baris: [
        { kaunter: 'Axiata', hargaPindah: 6.00, harga2018: 3.63, harga2022: 3.04, jumPindah: 1422605154, jum2018: 931803255 },
        { kaunter: 'Maxis', hargaPindah: 6.84, harga2018: 5.43, harga2022: 3.52, jumPindah: 879395994, jum2018: 681197584 },
        { kaunter: 'MISC', hargaPindah: 7.43, harga2018: 6.15, harga2022: 7.30, jumPindah: 486532216, jum2018: 438925710 },
        { kaunter: 'Digi', hargaPindah: 5.13, harga2018: 4.24, harga2022: 3.27, jumPindah: 576240738, jum2018: 500328955 },
        { kaunter: 'TM', hargaPindah: 5.96, harga2018: 2.33, harga2022: 5.20, jumPindah: 241202959, jum2018: 107650200 }
      ],
      jumPindah: 3605977061,
      jum2018: 2659905704,
      jatuh2018: -946071357,
      tarikh2022: '8 Jun 2022',
      tidakPatuhSyariah: ['YTL Power International', 'Bumi Armada', 'Integrated Logistics', 'Yi-Lai']
    },
    rofr: {
      src: { pdf: 169, ms: '131' },
      baris: [
        { syarikat: 'WZ Satu', tarikh: '24-Mac-20', unit: 25999115, hargaRofr: 0.090, hargaPasaran: 0.064, premium: 40.6 },
        { syarikat: 'Eastern & Oriental', tarikh: '25-Mac-20', unit: 46400000, hargaRofr: 0.365, hargaPasaran: 0.335, premium: 9.0 },
        { syarikat: 'WZ Satu', tarikh: '31-Mac-20', unit: 16570923, hargaRofr: 0.085, hargaPasaran: 0.075, premium: 13.3 },
        { syarikat: 'WCT Holdings', tarikh: '02-Apr-20', unit: 42477625, hargaRofr: 0.400, hargaPasaran: 0.377, premium: 6.1 },
        { syarikat: 'KSL Holdings', tarikh: '06-Mei-20', unit: 71800000, hargaRofr: 0.610, hargaPasaran: 0.630, premium: -3.2 },
        { syarikat: 'KSL Holdings', tarikh: '21-Mei-20', unit: 35900000, hargaRofr: 0.580, hargaPasaran: 0.605, premium: -4.1 },
        { syarikat: 'Hap Seng Plantations', tarikh: '29-Mei-20', unit: 66074500, hargaRofr: 1.650, hargaPasaran: 1.570, premium: 5.1 },
        { syarikat: 'FGV Holdings', tarikh: '09-Dis-20', unit: 283710100, hargaRofr: 1.300, hargaPasaran: 1.270, premium: 2.4 },
        { syarikat: 'Integrated Logistics', tarikh: '14-Mac-22', unit: 20500000, hargaRofr: 0.380, hargaPasaran: 0.365, premium: 4.1 }
      ]
    },
    pelupusan: {
      src: { pdf: 167, ms: '129' },
      hartanahDijual: 1,
      hartanahDijualNota: 'Tanah di Mukim Sungai Segamat, Johor — RM920 ribu (tender terbuka 2020).',
      hartanahTiadaBidaan: 17,
      hartanahBelumDitawar: 10,
      kaunterDilupus: 75,
      kaunterAsal: 106,
      kaunterDilaburSemula: 329,
      pendapatanPortfolio: '~RM200–300 juta setahun',
      kerugianUJSB2019: 9900,
      sriAman: 'Hak Penolakan Pertama bagi syarikat perladangan Sri Aman (harga minimum RM280 juta) ditolak LTH pada 24 Januari 2020.'
    },
    risiko: {
      src: { pdf: 171, ms: '133' },
      pendapatanTertunggakSetahun: 840,
      pendapatanTertunggakTerkumpul: 2100,
      tarikhTerkumpul: '31 Disember 2021',
      peratusAset: 31,
      peratusPendapatan: 26,
      nisbahHibah: 'lebih satu pertiga daripada jumlah agihan keuntungan tahunan',
      siling: 'Siling hutang negara dinaikkan daripada 55% kepada 65% daripada KDNK.',
      hurdle: 'Kadar halangan LTH: kadar deposit tetap Islam + 75 mata asas.'
    }
  };

  // -------------------------------------------------------------------- HAJI
  var HAJI = {
    srcSejarah: { pdf: 204, ms: '166' },
    srcUnjuran: { pdf: 205, ms: '167' },
    sejarah: [
      { tahun: 2014, kos: 16155, bayaran: 9980, hafis: 6175, jumlahJuta: 106 },
      { tahun: 2015, kos: 17270, bayaran: 9980, hafis: 7290, jumlahJuta: 135 },
      { tahun: 2016, kos: 18890, bayaran: 9980, hafis: 8910, jumlahJuta: 160 },
      { tahun: 2017, kos: 19550, bayaran: 9980, hafis: 9570, jumlahJuta: 298 },
      { tahun: 2018, kos: 22450, bayaran: 9980, hafis: 12470, jumlahJuta: 314 },
      { tahun: 2019, kos: 22900, bayaran: 9980, hafis: 12920, jumlahJuta: 299 }
    ],
    unjuran: [
      { tahun: 2022, kos: 25540, bayaran: 12980, hafis: 12560, peratus: 49.2, jumlahRibu: 376800 },
      { tahun: 2023, kos: 26280, bayaran: 12980, hafis: 13300, peratus: 50.6, jumlahRibu: 399000 },
      { tahun: 2024, kos: 28160, bayaran: 12980, hafis: 15180, peratus: 53.9, jumlahRibu: 455400 },
      { tahun: 2025, kos: 29570, bayaran: 12980, hafis: 16590, peratus: 56.1, jumlahRibu: 497700 },
      { tahun: 2026, kos: 31040, bayaran: 12980, hafis: 18060, peratus: 58.2, jumlahRibu: 541800 },
      { tahun: 2027, kos: 32592, bayaran: 12980, hafis: 19612, peratus: 60.2, jumlahRibu: 588360 },
      { tahun: 2028, kos: 34221, bayaran: 12980, hafis: 21241, peratus: 62.1, jumlahRibu: 637230 },
      { tahun: 2029, kos: 35932, bayaran: 12980, hafis: 22952, peratus: 63.9, jumlahRibu: 688560 },
      { tahun: 2030, kos: 37729, bayaran: 12980, hafis: 24749, peratus: 65.6, jumlahRibu: 742470 }
    ],
    jemaahAndaian: 30000,
    bekuBayaran: { dari: 2009, hingga: 2021, kadar: 9980, tahun: 13, src: { pdf: 204, ms: '166' } },
    kadar2022: [
      { kumpulan: 'B40', bayaran: 10980 },
      { kumpulan: 'Bukan B40', bayaran: 12980 }
    ],
    kesanHibah: { juta: 400, peratusHibah: 0.4, src: { pdf: 206, ms: '168' } },
    danaMinimum: { bilion: 60, src: { pdf: 206, ms: '168' } },
    menunggu: { sekarang: 130, cadangan: 33, nota: 'Ringkasan Eksekutif menyebut 130 tahun; perenggan 3.16.17 menyebut 135 tahun. Kedua-duanya guna asas kiraan EY (RM9,980).', src: { pdf: 235, ms: '197' } },
    depositMinimum: { sekarang: 1300, cadangan: 12980, src: { pdf: 207, ms: '169' } },
    kuota: { sekarang: 30000, sasaran2030: 60000, src: { pdf: 210, ms: '172' } },
    jemaahDiurus: { jumlah: 1.46, unit: 'juta', tempoh: '1963–2021', src: { pdf: 229, ms: '191' } },
    hafisKumulatif: { nilai: 2.02, unit: 'bilion', tempoh: 'sejak 2001', src: { pdf: 229, ms: '191' } },
    kos2050: 50000
  };

  // -------------------------------------------------- PELABURAN BERMASALAH (14)
  var PELABURAN = [
    {
      id: 'thip', nama: 'PT TH Indo Plantations', ringkas: 'THIP',
      kategori: 'Perladangan', lokasi: 'Riau, Sumatera, Indonesia',
      src: { pdf: 177, ms: '139' },
      isu: 'Tadbir urus dalam penjualan 95% ekuiti LTH (tanah 83,000 hektar) kepada PT Borneo Pacific.',
      kesan: [
        'Syer dipindah kepada pembeli sebelum bayaran penuh diterima.',
        'Harga dikurangkan USD100 juta daripada harga asal USD910 juta.',
        'LTH terpaksa memberi pendahuluan USD178.6 juta yang sepatutnya dilunaskan pembeli.'
      ],
      pelaburanRM: null, rosotNilaiRM: null, pulihRM: null,
      angkaUSD: { hargaAsal: 910, potongan: 100, pendahuluan: 178.6 },
      status: ['Siasatan dalaman', 'Siasatan forensik oleh peguam', 'Laporan polis — siasatan berterusan', 'Timbang tara/mahkamah'],
      bendera: ['Penyembunyian maklumat', 'Rentas sempadan']
    },
    {
      id: 'emrail', nama: 'Emrail Sdn. Bhd.', ringkas: 'Emrail',
      kategori: 'Kejuruteraan', lokasi: 'Malaysia',
      src: { pdf: 178, ms: '140' },
      isu: 'Beli 15.3% ekuiti pada 7 Jun 2016 (RM20.17 juta) daripada Lingkaran Hartaniaga (LHSB). Penyenaraian dibatal dan sasaran untung RM36.1 juta tidak dicapai.',
      kesan: ['Hak Jual (Put Option) dilaksana 26 Apr 2017 pada RM20.3 juta.', 'LHSB hanya bayar RM2 juta.'],
      pelaburanRM: 20.17, rosotNilaiRM: 19.3, pulihRM: 2.0,
      status: ['Writ Mahkamah Tinggi KL 8 Sep 2021', 'Dirujuk ke timbang tara AIAC 22 Apr 2022'],
      bendera: ['Put option gagal']
    },
    {
      id: 'wellspring', nama: 'Wellspring Worldwide Limited', ringkas: 'Wellspring',
      kategori: 'Teknologi/lain', lokasi: 'Malaysia',
      src: { pdf: 179, ms: '141' },
      isu: 'Beli 10% ekuiti pada 21 Sep 2014 (RM18.4 juta). Syarikat gagal disenaraikan.',
      kesan: ['Hak Jual dilaksana 19 Sep 2016 pada RM19.03 juta.', 'Promoters langsung tidak membayar.'],
      pelaburanRM: 18.4, rosotNilaiRM: 19.03, pulihRM: 0,
      status: ['Mahkamah perintah bayar RM20.8 juta (5 Okt 2018)', 'Notis kebankrapan dibenarkan 25 Jan 2022'],
      bendera: ['Put option gagal']
    },
    {
      id: 'dssb', nama: 'Deru Semangat Sdn. Bhd.', ringkas: 'DSSB',
      kategori: 'Perladangan', lokasi: 'Mukim Tembeling, Pahang',
      src: { pdf: 180, ms: '142' },
      isu: 'Kelulusan Menteri 21 Okt 2014 & 19 Jan 2015 untuk melabur RM526.16 juta: ambil alih 55% ekuiti (RM231.00 juta) + pembiayaan ladang (RM295.16 juta).',
      kesan: [
        'Sehingga Jan 2021 hanya RM257 juta dikeluarkan; dirosot nilai kepada RM32 juta.',
        'Pembangunan ladang melibatkan pembalakan hutan simpan — melanggar polisi NDPE; Wilmar International enggan membeli hasil.'
      ],
      pelaburanRM: 257, rosotNilaiRM: 225, pulihRM: 259,
      status: ['Pegangan ekuiti dirungkai; bayaran keseluruhan RM259 juta diterima', 'Komitmen baki RM258 juta (ekuiti RM71j + pembiayaan RM187j) dikenepikan'],
      bendera: ['Isu alam sekitar', 'Pemulihan penuh']
    },
    {
      id: 'trurich', nama: 'Trurich Resources Sdn. Bhd.', ringkas: 'Trurich',
      kategori: 'Perladangan', lokasi: 'Kalimantan, Indonesia',
      src: { pdf: 181, ms: '143' },
      isu: 'Usaha sama dengan Felda Global Ventures Kalimantan (30 Nov 2009) untuk membangun sehingga 200,000 hektar kelapa sawit.',
      kesan: [
        'Liabiliti semasa bersih RM119.67 juta (2017) dan RM92.78 juta (2018) — syarikat menjadi insolven.',
        'Baki pinjaman Trurich kepada Maybank USD179 juta masih tertunggak.'
      ],
      pelaburanRM: 364.31, rosotNilaiRM: 364.31, pulihRM: null,
      status: ['Laporan polis oleh anggota Lembaga Pengarah', 'Pelupusan anak syarikat diluluskan 22 Dis 2020'],
      bendera: ['Rosot nilai penuh', 'Laporan polis', 'Rentas sempadan']
    },
    {
      id: 'abraj', nama: 'Abraj Sdn. Bhd.', ringkas: 'Abraj',
      kategori: 'Hartanah', lokasi: 'Malaysia',
      src: { pdf: 182, ms: '144' },
      isu: 'Usaha sama dengan Amanah Raya Berhad (11 Nov 2009) dalam pembelian hartanah. Tidak mampu jana pendapatan cukup untuk bayar pinjaman bank sejak 2015; penyewa utama berpindah.',
      kesan: ['Rosot nilai RM40.25 juta daripada pegangan ekuiti keseluruhan RM85 juta.'],
      pelaburanRM: 85, rosotNilaiRM: 40.25, pulihRM: null,
      status: ['Amanah Raya Berhad membeli 50% pegangan LTH (Disember 2020)'],
      bendera: []
    },
    {
      id: 'ppb', nama: 'Putrajaya Perdana Berhad', ringkas: 'PPB',
      kategori: 'Pembinaan', lokasi: 'Malaysia',
      src: { pdf: 183, ms: '145' },
      isu: 'Disember 2014 beli 30% ekuiti (RM193.50 juta) daripada Cendana Destini (CDSB) dengan sasaran penyenaraian dalam setahun.',
      kesan: ['Gagal disenaraikan; sasaran untung RM86 juta (2015) tidak dicapai.', 'Hak Jual 7 Mac 2018 pada RM210.7 juta — CDSB gagal bayar.'],
      pelaburanRM: 193.5, rosotNilaiRM: 145.3, pulihRM: null, nilaiBuku: 48.2,
      status: ['Cadangan Pengaturan Penyelesaian sedang dalam proses kelulusan dalaman'],
      bendera: ['Put option gagal']
    },
    {
      id: 'alrawda', nama: 'Al-Rawda Real Estates Development & Project Management', ringkas: 'Al-Rawda',
      kategori: 'Hotel/pajakan', lokasi: 'Makkah & Madinah, Arab Saudi',
      src: { pdf: 185, ms: '147' },
      isu: 'Perjanjian pajakan/sub-pajakan 10–18 tahun bagi empat hotel (Al-Aqiq, Al-Haram, Al-Saha di Madinah; Rawdat Al-Bait di Makkah). Bayaran kepada Al-Rawda SR1,426 juta.',
      kesan: [
        'Al-Rawda gagal bayar pendapatan sewa sejak Mac 2019.',
        'Sewa tertunggak SR560.7 juta setakat 31 Dis 2021.',
        'Tawaran penyelesaian Al-Rawda SR968 juta ditolak (rundingan asal SR1,748 juta).'
      ],
      pelaburanRM: null, rosotNilaiRM: 202.8, rosotTambahan: 184, pulihRM: null,
      angkaSR: { bayaran: 1426, sewaDijangka: 2490, tertunggak: 560.7, tuntutanPN: 344.0, tuntutanPenjamin: 255.1, penyelesaian: 1748, tawaran: 968 },
      status: ['9 tindakan Nota Janji terhadap Al-Rawda; 7 terhadap penjamin', 'Aset penjamin dibekukan & sekatan perjalanan dikenakan', 'Timbang tara sedang berjalan', '20 hartanah dikenal pasti untuk likuidasi (~2 tahun)'],
      bendera: ['Timbang tara', 'Rentas sempadan']
    },
    {
      id: 'alfareeda', nama: 'Al-Fareeda Residential Fund', ringkas: 'Al-Fareeda',
      kategori: 'Dana hartanah', lokasi: 'Arab Saudi',
      src: { pdf: 188, ms: '150' },
      isu: 'Melanggan SR76 juta (RM63 juta) = 13.8% daripada dana SR550 juta, melalui pengurus dana Anfaal Capital (21 Feb 2013).',
      kesan: ['Undang-undang buruh & imigresen baharu, kontraktor bermasalah, kenaikan harga bahan, kejatuhan harga minyak.', 'Tiada perkembangan sejak 2017; pengurus dana tidak dapat dikesan.'],
      pelaburanRM: 63, rosotNilaiRM: 63, pulihRM: 0,
      status: ['Dihapus kira sepenuhnya'],
      bendera: ['Hapus kira penuh', 'Pengurus dana hilang']
    },
    {
      id: 'thp', nama: 'TH Plantations Berhad', ringkas: 'THP',
      kategori: 'Perladangan', lokasi: 'Malaysia & Indonesia',
      src: { pdf: 188, ms: '150' },
      isu: 'Laporan forensik PwC (25 Apr 2019): pengurusan kanan dan Lembaga gagal memenuhi tanggungjawab fidusiari, terutamanya pengambilalihan Bumi Suria Ventures, Maju Warisanmas dan PT Persada Kencana Prima.',
      kesan: [
        'Pembelian ladang 2012–2014 dibiayai terutamanya melalui Sukuk RM1.2 bilion yang diterbitkan LTH.',
        'Hanya 58% ladang THP produktif; estet terpaksa dijual untuk bayar hutang.',
        'Rosot nilai di peringkat LTH RM170 juta.'
      ],
      pelaburanRM: null, rosotNilaiRM: 170, pulihRM: null, sukuk: 1200,
      status: ['Laporan kepada PDRM, SPRM dan Suruhanjaya Sekuriti', 'Ketua Pegawai Eksekutif THP letak jawatan 20 Ogos 2018'],
      bendera: ['Laporan forensik', 'Laporan SPRM']
    },
    {
      id: 'thprop', nama: 'TH Properties Sdn. Bhd.', ringkas: 'TH Properties',
      kategori: 'Hartanah', lokasi: 'Malaysia',
      src: { pdf: 189, ms: '151' },
      isu: 'Bonus istimewa RM2.2 juta dibayar pada 2017 & 2018 kepada Ahli Lembaga dan pengurusan tanpa kelulusan LTH sebagai pemegang ekuiti utama.',
      kesan: ['Kelulusan Exco tidak mematuhi resolusi Lembaga TH Properties.'],
      pelaburanRM: null, rosotNilaiRM: 2.2, pulihRM: null,
      status: ['Siasatan dalaman 5 Feb 2020', 'Lembaga Pengarah putus untuk dapatkan semula bonus (12 Ogos 2020)'],
      bendera: ['Pelanggaran Akta Syarikat']
    },
    {
      id: 'thmarine', nama: 'Alam Maritim Resources / TH Marine', ringkas: 'TH Marine',
      kategori: 'Maritim', lokasi: 'Malaysia',
      src: { pdf: 190, ms: '152' },
      isu: 'Usaha sama 51% diluluskan Menteri 18 Jun 2015 — enam kapal AHTS (USD20.27 juta) ditambah dua kapal milik penuh.',
      kesan: ['Ekuiti RM198 juta dirosot nilai sepenuhnya.', 'RM80 juta daripada RM136 juta pembiayaan dirosot nilai sehingga Dis 2021.', 'PwC: hanya RM70.4 juta dijangka diperoleh semula.'],
      pelaburanRM: 334, rosotNilaiRM: 278, pulihRM: 70.4,
      status: ['Penilaian kebolehpulihan oleh PwC'],
      bendera: ['Rosot nilai ekuiti penuh']
    },
    {
      id: 'thhr', nama: 'TH Hotel & Residences Sdn. Bhd.', ringkas: 'THHR',
      kategori: 'Hotel', lokasi: 'Malaysia',
      src: { pdf: 191, ms: '153' },
      isu: 'Hotel dan kompleks haji di Alor Setar, Kuching, Pulau Pinang, Kuala Terengganu dan Kota Kinabalu dipindahkan kepada UJSB (28 Dis 2018) kerana pulangan rendah (kurang 2%).',
      kesan: ['Nilai pemindahan RM804.1 juta — premium lebih kurang 55% daripada nilai buku LTH.', 'Hasil sewaan 2020 RM6.2 juta, turun 62% daripada RM16.5 juta (2019).', 'Kerugian bersih selepas cukai RM5.9 juta pada tahun kewangan sebelumnya.'],
      pelaburanRM: null, rosotNilaiRM: null, pulihRM: null, pindahRM: 804.1,
      status: ['Dipindah ke UJSB'],
      bendera: ['Pulangan < 2%']
    },
    {
      id: 'fgv', nama: 'FGV Holdings Berhad', ringkas: 'FGV',
      kategori: 'Ekuiti tersenarai', lokasi: 'Malaysia',
      src: { pdf: 192, ms: '154' },
      isu: 'Langganan IPO 2012 sehingga 276 juta unit @ RM4.65 (7.5% pegangan); tambahan 273,579,700 unit @ RM4.55. Kos purata RM4.58/unit, jumlah RM1,253,742,809.',
      kesan: [
        'Harga saham jatuh ke RM0.885/unit — kerugian tidak nyata RM1,058,937,380.',
        'Jumlah kos pegangan RM1,310,020,819; harga pasaran sekitar RM0.69/unit (Feb 2022).'
      ],
      pelaburanRM: 1310.02, rosotNilaiRM: null, kerugianTidakNyata: 1058.94, pulihRM: null,
      status: ['283,710,100 unit diambil alih UJSB pada nilai kos RM4.62/unit', 'Tanpa pengambilalihan UJSB, LTH sepatutnya menanggung kerugian ~RM1.1 bilion'],
      bendera: ['Kerugian dipindah kepada Kerajaan']
    }
  ];

  // ------------------------------------------------------- TADBIR URUS: ORANG
  var JAWATAN = {
    src: { pdf: 59, ms: '21' },
    siri: [
      {
        peranan: 'Menteri (Hal Ehwal Agama)',
        orang: [
          { nama: 'Jamil Khir Baharom', mula: '2009-02-10', tamat: '2018-05-09' },
          { nama: 'Tun Dr. Mahathir Mohamad (kuasa Menteri)', mula: '2018-05-10', tamat: '2018-07-01', nota: 'Perdana Menteri menjalankan kuasa Menteri melalui P.U.(A) 125' },
          { nama: 'Mujahid Yusof Rawa', mula: '2018-07-02', tamat: '2020-03-09' },
          { nama: 'Zulkifli Mohamad al-Bakri', mula: '2020-03-10', tamat: '2021-08-29' },
          { nama: 'Idris Ahmad', mula: '2021-08-30', tamat: '2022-07-19' }
        ]
      },
      {
        peranan: 'Pengerusi Lembaga',
        orang: [
          { nama: 'Abdul Azeez Abdul Rahim', mula: '2013-07-01', tamat: '2018-05-23', politik: true },
          { nama: 'Md Nor Md Yusof', mula: '2018-07-10', tamat: '2021-10-15', tamatAwal: true },
          { nama: 'Azman Mokhtar', mula: '2021-12-20', tamat: '2022-07-19' }
        ]
      },
      {
        peranan: 'Ketua Pegawai Eksekutif',
        orang: [
          { nama: 'Ismee Ismail', mula: '2006-01-01', tamat: '2016-06-30' },
          { nama: 'Johan Abdullah', mula: '2016-07-01', tamat: '2018-06-30' },
          { nama: 'Zukri Samat', mula: '2018-07-10', tamat: '2019-08-31' },
          { nama: 'Nik Mohd Hasyudeen Yusoff', mula: '2019-09-01', tamat: '2021-05-05', tamatAwal: true },
          { nama: 'Amrin Awaluddin', mula: '2021-05-06', tamat: '2022-07-19' }
        ]
      },
      {
        peranan: 'Wakil Jabatan Perdana Menteri',
        orang: [
          { nama: 'Othman Mahmood', mula: '2012-01-16', tamat: '2017-07-31' },
          { nama: 'Mohd Zuki Ali', mula: '2017-08-01', tamat: '2019-04-16' },
          { nama: 'Hasnol Zam Zam Ahmad', mula: '2019-06-11', tamat: '2020-02-01' },
          { nama: 'Mohd Sallehhuddin Hassan', mula: '2020-06-16', tamat: '2021-07-31' },
          { nama: 'Jamil Rakon', mula: '2021-08-01', tamat: '2022-04-18' }
        ]
      },
      {
        peranan: 'Wakil Perbendaharaan',
        orang: [
          { nama: 'Mohd Irwan Serigar Abdullah', mula: '2011-03-01', tamat: '2018-05-14' },
          { nama: 'Ahmad Badri Mohd Zahir', mula: '2018-10-31', tamat: '2020-05-01' },
          { nama: 'Asri Hamidon', mula: '2020-06-15', tamat: '2022-07-19' }
        ]
      }
    ],
    kekosongan: 'Jawatan wakil Jabatan Perdana Menteri kosong selepas 18 April 2022. Terdapat juga jurang antara penyandang: wakil Perbendaharaan kosong 15 Mei – 30 Okt 2018 dan 2 Mei – 14 Jun 2020.',
    tamatAwal: [
      { nama: 'Nik Mohd Hasyudeen Yusoff', jawatan: 'Ketua Pegawai Eksekutif', tarikh: '5 Mei 2021', sepatutnya: '31 Ogos 2021' },
      { nama: 'Md Nor Md Yusof', jawatan: 'Pengerusi Lembaga', tarikh: '15 Oktober 2021', sepatutnya: 'kontrak disambung 2 tahun mulai 20 Julai 2020' }
    ],
    srcTamatAwal: { pdf: 82, ms: '44' }
  };

  var AHLIPOLITIK = {
    src: { pdf: 77, ms: '39' },
    senarai: [
      { nama: 'Abdul Azeez Abdul Rahim', jawatan: 'ALP 2011, Pengerusi 2013–2018', politik: 'Ahli Parlimen Baling; Ahli Majlis Tertinggi UMNO' },
      { nama: 'Badruddin Amiruldin', jawatan: 'ALP 2005–2018', politik: 'Ahli Parlimen Yan/Jerai 2004–2008; Pengerusi Tetap Perhimpunan Agong UMNO' },
      { nama: 'Rosni Sohar', jawatan: 'ALP 2014–2018', politik: 'ADUN Hulu Bernam; Setiausaha Wanita UMNO Malaysia' }
    ]
  };

  var JAWATANANAK = {
    src: { pdf: 84, ms: '46' },
    src2: { pdf: 85, ms: '47' },
    orang: [
      { nama: 'Rozaida Omar', peranan: 'Ketua Pegawai Kewangan Kumpulan', bil: 23, tempoh: '2004–2021' },
      { nama: 'Johan Abdullah', peranan: 'Ketua Pegawai Eksekutif', bil: 18, tempoh: '2016–2018' },
      { nama: 'Noordin Sulaiman', peranan: 'Anggota Lembaga', bil: 9, tempoh: '2018–kini' },
      { nama: 'Abdul Azeez Abdul Rahim', peranan: 'Pengerusi Lembaga', bil: 8, tempoh: '2013–2018' },
      { nama: 'Zaiton Mohd Hassan', peranan: 'Anggota Lembaga', bil: 7, tempoh: '2018–2020' },
      { nama: 'Ismee Ismail', peranan: 'Ketua Pegawai Eksekutif', bil: 7, tempoh: '2006–2016' },
      { nama: 'Zukri Samat', peranan: 'Ketua Pegawai Eksekutif', bil: 4, tempoh: '2018–2019' },
      { nama: 'Nik Mohd Hasyudeen Yusoff', peranan: 'Ketua Pegawai Eksekutif', bil: 4, tempoh: '2019–2021' },
      { nama: 'Badruddin Amiruldin', peranan: 'Anggota Lembaga', bil: 3, tempoh: '2005–2018' },
      { nama: 'Amrin Awaluddin', peranan: 'Ketua Pegawai Eksekutif', bil: 3, tempoh: '2021–kini' },
      { nama: 'Abd Kadir Sahlan', peranan: 'Ketua Pegawai Pelaburan', bil: 3, tempoh: '2010–2018' }
    ],
    hadBaharu: 5,
    nota: 'Angka ini ialah bilangan jawatan anak syarikat yang DISENARAIKAN dalam laporan bagi individu berkenaan — laporan menggunakan perkataan "antaranya", jadi senarai mungkin tidak lengkap.',
    ismeeSelepas: 'Ismee Ismail terus memegang jawatan di tiga anak syarikat sehingga Mei 2018, hampir dua tahun selepas tamat perkhidmatan pada 30 Jun 2016.'
  };

  var TATATERTIB = {
    src: { pdf: 197, ms: '159' },
    pegawai: [
      { nama: 'Rozaida Omar', jawatanDulu: 'Ketua Pegawai Kewangan Kumpulan (Gred K)', jawatanKini: 'Pengurus Besar Strategik Modal Insan (Gred J), LTH' },
      { nama: 'Adi Azuan Abdul Ghani', jawatanDulu: 'Ketua Pegawai Operasi (Gred K)', jawatanKini: 'Pengurus Besar Kanan Kafe & Pembangunan Perniagaan (Gred K), TH Hotel & Residence' },
      { nama: 'Rifina Md Ariff', jawatanDulu: 'Pengurus Besar Kanan Perkhidmatan Korporat & Hartanah (Gred K)', jawatanKini: 'Ketua Bahagian Risiko & Pematuhan (Gred J), TH Plantations' },
      { nama: 'Mohd Hisham Harun', jawatanDulu: 'Ketua Pegawai Sumber Manusia (Gred K)', jawatanKini: 'Head, Business & Corporate Affairs (Gred J), TH Properties' },
      { nama: 'Hazlina Mohd Khalid', jawatanDulu: 'Penasihat Undang-Undang (Gred J)', jawatanKini: 'Timbalan Pengurus Besar (Gred H2), TH Plantations' }
    ],
    kluster: [
      {
        nama: 'Kluster 1 — penjualan saham PT TH Indo Plantations',
        terlibat: ['Rozaida Omar', 'Rifina Md Ariff', 'Mohd Hisham Harun', 'Hazlina Mohd Khalid'],
        pertuduhan: '29 Mei 2020', keputusan: 'Buang kerja (21 Apr 2021)', rayuan: 'Dikurangkan kepada turun pangkat (6 Sep 2021)'
      },
      {
        nama: 'Kluster 2 — sumbangan RM22.12 juta (Yayasan Tabung Haji) tanpa kelulusan awal',
        terlibat: ['Rozaida Omar', 'Adi Azuan Abdul Ghani', 'Mohd Hisham Harun'],
        pertuduhan: '15 & 19 Mac 2019', keputusan: 'Turun pangkat (31 Mei & 1 Nov 2019)', rayuan: 'Amaran keras (2 orang); amaran + tangguh kenaikan gaji (1 orang)'
      },
      {
        nama: 'Kluster 3 — perisytiharan untung boleh agih (hibah) 2017',
        terlibat: ['Rozaida Omar'],
        pertuduhan: '3 Jan 2020', keputusan: 'Buang kerja (16 Apr 2021)', rayuan: 'Dikurangkan kepada turun pangkat (6 Sep 2021)'
      },
      {
        nama: 'Kluster 4 — tuntutan mengandungi butiran palsu',
        terlibat: ['Hazlina Mohd Khalid'],
        pertuduhan: '11 Jan 2019', keputusan: 'Turun pangkat (1 Nov 2019)', rayuan: 'Hukuman turun pangkat dikekalkan (28 Jan 2020)'
      }
    ],
    kelewatan: [
      { kluster: 'Kluster 2', bulan: 19 },
      { kluster: 'Kluster 3', bulan: 15 },
      { kluster: 'Kluster 4', bulan: 10 }
    ],
    rumusan: 'Kesemua lima pegawai masih bertugas dengan LTH atau anak syarikatnya pada tarikh laporan.'
  };

  var LAPORANPOLIS = {
    src: { pdf: 193, ms: '155' },
    senarai: [
      { tarikh: '30 Nov 2018', rujukan: 'Dang Wangi/31347/2018', pengadu: 'Idrus Ismail (mantan Setiausaha Syarikat LTH)', isu: 'Penganjuran aktiviti & penggunaan wang Yayasan Tabung Haji yang didakwa menyalahi M&A.', status: 'Kertas siasatan dirujuk ke Jabatan Peguam Negara' },
      { tarikh: '30 Nov 2018', rujukan: 'Dang Wangi/31331/2018', pengadu: 'Idrus Ismail', isu: 'Salah nyataan & penyembunyian maklumat berkaitan penjualan 95% saham THIP kepada PT Borneo Pacific (~USD910 juta).', status: 'Siasatan PDRM berterusan (rentas sempadan)' },
      { tarikh: '13 Dis 2018', rujukan: 'Dang Wangi/32724/2018', pengadu: 'Aliatun Mahmud (mantan Setiausaha Trurich)', isu: 'Dakwaan manipulasi laporan kesesuaian tanah 40,880 hektar di Kalimantan (~USD58 juta, 2008–2009).', status: 'Menunggu kebenaran pihak berkuasa Indonesia' },
      { tarikh: '16 Jan 2019', rujukan: 'Dang Wangi/1484/2019', pengadu: 'Idrus Ismail', isu: 'Perisytiharan hibah 2017 yang didakwa melanggar seksyen 22 Akta 535; salah nyataan dalam dua kertas kerja kepada Mesyuarat Khas Lembaga 6 & 9 Feb 2018.', status: 'Siasatan lengkap; dirujuk ke Jabatan Peguam Negara' }
    ],
    sprm: {
      src: { pdf: 201, ms: '163' },
      senarai: [
        'Dakwaan rasuah dalam pembelian Ladang Weida Bhd oleh TH Plantations',
        'Dakwaan penyelewengan & salah guna kuasa dalam penyewaan Restoran Opah, KL Sentral',
        'Dakwaan penyelewengan & salah guna kuasa dalam penyewaan Restoran Nasi Dalca, Ibu Pejabat LTH',
        'Dakwaan penyelewengan & rasuah oleh mantan Ketua Pegawai Operasi LTH dalam pengubahsuaian',
        'Dakwaan pemalsuan dokumen pembekalan rubber seedlings di Ladang TH-Usia Jatimas, Sandakan',
        'Dakwaan salah laku pegawai THP Bina Sdn. Bhd. dan THP Timur Sdn. Bhd.'
      ]
    }
  };

  // --------------------------------------------------------------- KRONOLOGI
  var KRONOLOGI = [
    { tarikh: '1951', kategori: 'institusi', tajuk: 'Ordinan Haji 1951', teks: 'Pejabat Urusan Hal Ehwal Haji ditubuhkan di Pulau Pinang.', src: { pdf: 53, ms: '15' } },
    { tarikh: '1962', kategori: 'institusi', tajuk: 'PWSBH ditubuhkan', teks: 'Perbadanan Wang Simpanan Bakal-Bakal Haji Tanah Melayu — memobilisasi simpanan bakal haji.', src: { pdf: 53, ms: '15' } },
    { tarikh: '1969', kategori: 'institusi', tajuk: 'LUTH ditubuhkan', teks: 'Menggabungkan fungsi PWSBH dengan Pejabat Urusan Hal Ehwal Haji.', src: { pdf: 54, ms: '16' } },
    { tarikh: '1979', kategori: 'syariah', tajuk: 'Konsep Mudarabah untuk zakat', teks: 'Jawatankuasa Fatwa memutuskan LTH membayar zakat bagi pihak pendeposit.', src: { pdf: 106, ms: '68' } },
    { tarikh: '1 Jun 1995', kategori: 'institusi', tajuk: 'Lembaga Tabung Haji ditubuhkan', teks: 'Akta Tabung Haji 1995 (Akta 535) menggantikan Akta 8.', src: { pdf: 54, ms: '16' } },
    { tarikh: '2001', kategori: 'haji', tajuk: 'HAFIS bermula', teks: 'Bantuan Kewangan Haji mula diberikan. Sebelum ini jemaah Muassasah membayar kos haji sebenar.', src: { pdf: 23, ms: 'xxi' } },
    { tarikh: '2009', kategori: 'haji', tajuk: 'Bayaran haji dibekukan pada RM9,980', teks: 'Kerajaan membekukan kenaikan bayaran haji Muassasah. Kekal sehingga 2021 — 13 tahun.', src: { pdf: 211, ms: '173' } },
    { tarikh: '9 Mei 2012', kategori: 'pelaburan', tajuk: 'Langganan IPO FGV', teks: 'LTH melanggan sehingga 276 juta unit FGV @ RM4.65. Jumlah kos akhirnya RM1.31 bilion.', src: { pdf: 192, ms: '154' } },
    { tarikh: '1 Julai 2013', kategori: 'tadbir', tajuk: 'Abdul Azeez dilantik Pengerusi', teks: 'Ahli Parlimen Baling dan Ahli Majlis Tertinggi UMNO memegang jawatan Pengerusi LTH sehingga Mei 2018.', src: { pdf: 59, ms: '21' } },
    { tarikh: '21 Ogos 2014', kategori: 'amaran', tajuk: 'Surat amaran pertama BNM', teks: 'BNM menulis kepada Pengerusi LTH mengenai pengambilan deposit, pengurusan kecairan, pendeposit besar dan rizab.', src: { pdf: 100, ms: '62' } },
    { tarikh: '2014', kategori: 'kewangan', tajuk: 'Lebihan aset mula terhakis', teks: 'Lebihan sebelum agihan RM2,885 juta, tetapi agihan hibah RM3,237 juta — defisit selepas agihan RM352 juta.', src: { pdf: 147, ms: '109' } },
    { tarikh: '21 Okt 2014', kategori: 'pelaburan', tajuk: 'Kelulusan pelaburan Deru Semangat', teks: 'Menteri meluluskan pelaburan RM526.16 juta dalam usaha sama ladang kelapa sawit di Pahang.', src: { pdf: 180, ms: '142' } },
    { tarikh: 'Dis 2014', kategori: 'pelaburan', tajuk: 'Pembelian 30% Putrajaya Perdana', teks: 'RM193.50 juta daripada Cendana Destini dengan sasaran penyenaraian dalam setahun.', src: { pdf: 183, ms: '145' } },
    { tarikh: '19 Dis 2014', kategori: 'amaran', tajuk: 'BNM: pengambilan deposit & kecairan', teks: 'Surat kedua BNM kepada LTH.', src: { pdf: 100, ms: '62' } },
    { tarikh: '3 Apr 2015', kategori: 'pelaburan', tajuk: 'Perjanjian pajakan Al-Rawda bermula', teks: 'Perjanjian pertama bagi hotel di Makkah & Madinah. Jumlah bayaran akhirnya SR1,426 juta.', src: { pdf: 185, ms: '147' } },
    { tarikh: '18 Jun 2015', kategori: 'pelaburan', tajuk: 'Usaha sama TH Marine diluluskan', teks: '51% ekuiti; enam kapal AHTS bernilai USD20.27 juta.', src: { pdf: 190, ms: '152' } },
    { tarikh: '2015', kategori: 'kewangan', tajuk: 'Lebihan hampir kosong', teks: 'Lebihan sebelum agihan hanya RM134 juta — tetapi hibah RM3,220 juta tetap diagihkan.', src: { pdf: 147, ms: '109' } },
    { tarikh: '23 Dis 2015', kategori: 'amaran', tajuk: 'BNM menulis kepada Menteri', teks: 'BNM membangkitkan kemampuan LTH membayar hibah yang tinggi. LTH kemudian melantik EY menyediakan Laporan Proforma.', src: { pdf: 130, ms: '92' } },
    { tarikh: '2016', kategori: 'syariah', tajuk: 'Akad deposit ditukar kepada Wadi\'ah Yad Dhamanah', teks: 'Tiada dokumen kajian menyeluruh sebelum perubahan; menimbulkan isu tanggungan zakat pendeposit.', src: { pdf: 107, ms: '69' } },
    { tarikh: '30 Jun 2016', kategori: 'kewangan', tajuk: 'Metodologi RAV diperkenalkan EY', teks: 'EY mengeluarkan laporan mencadangkan metodologi menilai aset; RAV mula digunakan untuk Laporan Proforma.', src: { pdf: 127, ms: '89' } },
    { tarikh: '2016', kategori: 'kewangan', tajuk: 'Aset jatuh di bawah liabiliti', teks: 'Buat pertama kali dalam tempoh siasatan, aset kurang daripada liabiliti sebelum agihan (−RM1,260 juta).', src: { pdf: 147, ms: '109' } },
    { tarikh: '14 Dis 2016', kategori: 'amaran', tajuk: 'BNM: keperluan merumus dasar rizab', teks: 'Diikuti surat 17 Februari 2017. Laporan menyatakan surat-surat ini tidak mendapat perhatian sewajarnya.', src: { pdf: 213, ms: '175' } },
    { tarikh: '2017', kategori: 'kewangan', tajuk: 'Roland Berger memberi amaran', teks: 'RB dilantik 2017; mendapati model perniagaan berisiko, subsidi haji tinggi, dan menganggarkan kerugian RM2.6 bilion mengancam pendapatan masa depan. Tiada rekod laporan dibentang kepada Lembaga.', src: { pdf: 214, ms: '176' } },
    { tarikh: '6 & 9 Feb 2018', kategori: 'kewangan', tajuk: 'Mesyuarat Khas Lembaga mengenai hibah 2017', teks: 'Dua kertas kerja dibentang. Laporan polis kemudian mendakwa wujud salah nyataan dalam kertas kerja ini.', src: { pdf: 196, ms: '158' } },
    { tarikh: '7 Feb 2018', kategori: 'kewangan', tajuk: 'Perubahan kaedah kira hibah diumum — kemudian ditarik balik', teks: 'Tukar daripada purata baki bulanan kepada tahunan; ditarik balik selepas reaksi negatif. LTH keluarkan lebihan RM600 juta.', src: { pdf: 115, ms: '77' } },
    { tarikh: '14 Feb 2018', kategori: 'kewangan', tajuk: 'Polisi rosot nilai & hibah dipinda semula', teks: 'Minit mesyuarat pembentangan semula laporan kewangan belum diaudit berserta pindaan polisi rosot nilai.', src: { pdf: 129, ms: '91' } },
    { tarikh: '9–23 Mei 2018', kategori: 'tadbir', tajuk: 'Perubahan kepimpinan', teks: 'Menteri Jamil Khir tamat 9 Mei; Pengerusi Abdul Azeez tamat 23 Mei; Panel Pelaburan dibubarkan pada Mei 2018.', src: { pdf: 92, ms: '54' } },
    { tarikh: 'Mei 2018', kategori: 'tadbir', tajuk: 'Panel Pelaburan dibubarkan', teks: 'Digantikan Exco Perniagaan yang dipengerusikan Menteri Hal Ehwal Ekonomi — diakui saksi tidak pernah berfungsi.', src: { pdf: 92, ms: '54' } },
    { tarikh: '23 Mei 2018', kategori: 'kewangan', tajuk: 'Laporan Semakan RAV oleh EY dikeluarkan', teks: 'Dikeluarkan LAPAN minggu SEBELUM penyata kewangan beraudit dimuktamadkan — asas dakwaan bahawa RAV berasaskan penyata beraudit adalah tidak tepat.', src: { pdf: 119, ms: '81' } },
    { tarikh: '4 Julai 2018', kategori: 'audit', tajuk: 'Perbincangan KAN dengan Perdana Menteri', teks: 'Pendapat Berteguran dicadangkan; perbincangan mengambil kira kesan kepada persepsi pendeposit.', src: { pdf: 133, ms: '95' } },
    { tarikh: '16 Julai 2018', kategori: 'audit', tajuk: 'Sijil Audit Bersih dengan "Emphasis of Matter"', teks: 'KAN memilih Pendapat Tanpa Teguran. Suruhanjaya: sepatutnya ia dinyatakan sebagai ketidakpatuhan serius.', src: { pdf: 134, ms: '96' } },
    { tarikh: '20 Ogos 2018', kategori: 'pelaburan', tajuk: 'CEO TH Plantations letak jawatan', teks: 'Selepas diletakkan dalam garden leave berikutan isu tadbir urus THP.', src: { pdf: 189, ms: '151' } },
    { tarikh: '28 Okt 2018', kategori: 'kewangan', tajuk: 'Laporan Penilaian Anak Syarikat oleh EY', teks: 'EY mendapati hampir kesemua anak syarikat dalam kategori "pelaburan strategik" mengalami kerugian.', src: { pdf: 157, ms: '119' } },
    { tarikh: '30 Nov 2018', kategori: 'undang', tajuk: 'Dua laporan polis pertama dibuat', teks: 'Berkaitan Yayasan Tabung Haji dan penjualan saham THIP.', src: { pdf: 194, ms: '156' } },
    { tarikh: '30 Nov 2018', kategori: 'pemulihan', tajuk: 'Jemaah Menteri bersetuju secara dasar', teks: 'Rangka kerja Pelan Pemulihan & Penstrukturan LTH.', src: { pdf: 156, ms: '118' } },
    { tarikh: '7 Dis 2018', kategori: 'pemulihan', tajuk: 'Jemaah Menteri luluskan Pelan Pemulihan', teks: 'Diarah dilaksana sebelum akhir 2018 — LTH ada kurang dua minggu. LTH juga diletakkan di bawah kawal selia BNM mulai 1 Jan 2019.', src: { pdf: 156, ms: '118' } },
    { tarikh: '13 Dis 2018', kategori: 'undang', tajuk: 'Laporan polis Trurich', teks: 'Dakwaan manipulasi laporan kesesuaian tanah di Kalimantan.', src: { pdf: 195, ms: '157' } },
    { tarikh: '14 Dis 2018', kategori: 'pemulihan', tajuk: 'Urusharta Jamaah Sdn. Bhd. ditubuhkan', teks: 'SPV milik penuh Menteri Kewangan Diperbadankan.', src: { pdf: 145, ms: '107' } },
    { tarikh: '19 Dis 2018', kategori: 'audit', tajuk: 'Surat KAN kepada Perdana Menteri', teks: 'Menjelaskan mengapa Pendapat Tanpa Teguran diberikan walaupun dua penemuan material dibangkitkan.', src: { pdf: 133, ms: '95' } },
    { tarikh: '27 Dis 2018', kategori: 'pemulihan', tajuk: 'Perjanjian Pemindahan Aset ditandatangani', teks: '106 saham tersenarai, sebuah syarikat perladangan dan 29 aset hartanah dipindah pada RM19.9 bilion.', src: { pdf: 156, ms: '118' } },
    { tarikh: '16 Jan 2019', kategori: 'undang', tajuk: 'Laporan polis mengenai hibah 2017', teks: 'Dakwaan perisytiharan hibah melanggar seksyen 22 Akta 535.', src: { pdf: 196, ms: '158' } },
    { tarikh: '17 Jan – 28 Feb 2019', kategori: 'amaran', tajuk: 'Pemeriksaan BNM ke atas LTH', teks: 'Di bawah seksyen 33 Akta BNM 2009 dan seksyen 25 AMLA.', src: { pdf: 101, ms: '63' } },
    { tarikh: '2019', kategori: 'kewangan', tajuk: 'Hibah jatuh kepada 1.25% — deposit mengecut', teks: 'Deposit turun daripada ~RM73 bilion kepada RM69 bilion pada akhir 2019.', src: { pdf: 122, ms: '84' } },
    { tarikh: '5 Apr 2019', kategori: 'pemulihan', tajuk: 'Jemaah Menteri luluskan RM17.8 bilion', teks: 'Bagi membiayai kekurangan penebusan Sukuk UJSB — purata RM1.73 bilion setahun.', src: { pdf: 165, ms: '127' } },
    { tarikh: '25 Apr 2019', kategori: 'pelaburan', tajuk: 'Laporan forensik PwC ke atas TH Plantations', teks: 'Mendapati kegagalan tanggungjawab fidusiari pengurusan kanan dan Lembaga THP.', src: { pdf: 188, ms: '150' } },
    { tarikh: '15 Mei 2019', kategori: 'pemulihan', tajuk: 'Perjanjian Sukuk & Hak Penolakan Pertama', teks: 'LTH melanggan Sukuk UJSB dan memperoleh hak keutamaan membeli semula aset.', src: { pdf: 157, ms: '119' } },
    { tarikh: '27 Mei 2019', kategori: 'pemulihan', tajuk: 'Surat Sokongan Kewangan Menteri Kewangan', teks: 'Bukan jaminan Kerajaan — Suruhanjaya menyifatkannya sebagai "Letter of Comfort" sahaja.', src: { pdf: 165, ms: '127' } },
    { tarikh: '26 Jun 2019', kategori: 'syariah', tajuk: 'BNM bangkitkan isu zakat', teks: 'Surat kepada Perdana Menteri: penzahiran zakat kepada pendeposit mungkin tidak sepadan dengan akad Wadi\'ah Yad Dhamanah.', src: { pdf: 108, ms: '70' } },
    { tarikh: '2019', kategori: 'kewangan', tajuk: 'Polisi rizab diperkukuh', teks: 'RPK disasarkan pada 5% nilai aset bersih (~RM3.5 bilion); pemindahan 2% keuntungan semasa selepas zakat.', src: { pdf: 105, ms: '67' } },
    { tarikh: 'Dis 2019', kategori: 'syariah', tajuk: 'Akad ditukar kepada Wakalah', teks: 'Selepas kajian menyeluruh — menyelesaikan isu zakat dan subsidi.', src: { pdf: 109, ms: '71' } },
    { tarikh: '24 Jan 2020', kategori: 'pemulihan', tajuk: 'LTH tolak Hak Penolakan Pertama Sri Aman', teks: 'Tawaran syarikat perladangan pada harga minimum RM280 juta ditolak.', src: { pdf: 168, ms: '130' } },
    { tarikh: '2020', kategori: 'pemulihan', tajuk: 'Hanya satu hartanah berjaya dijual', teks: 'Tanah di Sungai Segamat, Johor — RM920 ribu. 17 hartanah lain tiada bidaan.', src: { pdf: 167, ms: '129' } },
    { tarikh: '30 Nov 2020', kategori: 'pemulihan', tajuk: 'Penebusan awal Sukuk RM200 juta', teks: 'Daripada Geran Kerajaan RM500 juta pada 2020.', src: { pdf: 166, ms: '128' } },
    { tarikh: '2021', kategori: 'pemulihan', tajuk: 'Suntikan RM1.5 bilion tidak diterima', teks: 'Peruntukan Belanjawan 2021 tidak disalurkan; keutamaan diberi kepada pemulihan ekonomi Covid-19.', src: { pdf: 166, ms: '128' } },
    { tarikh: '5 Mei 2021', kategori: 'tadbir', tajuk: 'Perkhidmatan CEO Nik Hasyudeen ditamatkan', teks: 'Sebelum tempoh sebenar tamat (31 Ogos 2021), tanpa sebab diberikan.', src: { pdf: 82, ms: '44' } },
    { tarikh: '15 Okt 2021', kategori: 'tadbir', tajuk: 'Pengerusi Md Nor Md Yusof ditamatkan', teks: 'Sebelum tamat kontrak yang baru disambung dua tahun. Suruhanjaya: kedua-dua mereka sedang melaksanakan penambahbaikan.', src: { pdf: 82, ms: '44' } },
    { tarikh: '31 Dis 2021', kategori: 'pemulihan', tajuk: 'Hartanah UJSB jatuh nilai 46%', teks: 'Dipindah pada RM2.25 bilion; nilai pasaran semasa hanya RM1.20 bilion.', src: { pdf: 161, ms: '123' } },
    { tarikh: '20 Jan 2022', kategori: 'siasatan', tajuk: 'Pesuruhjaya RCI dilantik', teks: 'Enam Pesuruhjaya dilantik oleh KDYMM Yang di-Pertuan Agong; tempoh enam bulan.', src: { pdf: 43, ms: '5' } },
    { tarikh: '2022', kategori: 'haji', tajuk: 'Bayaran haji dinaikkan (dua lapisan)', teks: 'RM10,980 (B40) dan RM12,980 (bukan B40) — kenaikan pertama sejak 2009.', src: { pdf: 205, ms: '167' } },
    { tarikh: '18 Apr 2022', kategori: 'amaran', tajuk: 'Cadangan baharu BNM', teks: 'Aktiviti pelaburan LTH dijalankan entiti berasingan. Suruhanjaya menolak — ia menjadikan LTH "glorified travel agent".', src: { pdf: 217, ms: '179' } },
    { tarikh: '21 Mei 2022', kategori: 'kewangan', tajuk: 'Deposit mencecah RM88 bilion', teks: 'Liabiliti kepada pendeposit yang dijamin Kerajaan di bawah seksyen 24 Akta 535.', src: { pdf: 167, ms: '129' } },
    { tarikh: '19 Julai 2022', kategori: 'siasatan', tajuk: 'Laporan RCI disiapkan', teks: 'Dipersembahkan kepada KDYMM Yang di-Pertuan Agong pada 30 Ogos 2022.', src: { pdf: 238, ms: '200' } },
    { tarikh: '2026', kategori: 'risiko', tajuk: 'Sukuk Siri 1 matang — RM13.2 bilion', teks: 'Suruhanjaya: kegagalan melunaskan obligasi ini ialah risiko terbesar LTH.', src: { pdf: 171, ms: '133' } },
    { tarikh: '2029', kategori: 'risiko', tajuk: 'Sukuk Siri 2 matang — RM14.3 bilion', teks: 'Bayaran pukal kedua yang perlu ditanggung Kerajaan.', src: { pdf: 171, ms: '133' } },
    { tarikh: '2030', kategori: 'risiko', tajuk: 'HAFIS dijangka RM742 juta setahun', teks: 'Subsidi menelan 65.6% daripada kos haji jika bayaran kekal RM12,980.', src: { pdf: 205, ms: '167' } }
  ];

  var KATEGORI = {
    institusi: { label: 'Institusi', warna: '#6B7280' },
    kewangan: { label: 'Kewangan', warna: '#B4342A' },
    tadbir: { label: 'Tadbir urus', warna: '#824182' },
    audit: { label: 'Audit', warna: '#C97B1F' },
    amaran: { label: 'Amaran pengawal selia', warna: '#2C6E8A' },
    pelaburan: { label: 'Pelaburan', warna: '#8A5A2C' },
    pemulihan: { label: 'Pelan pemulihan', warna: '#1E7A5E' },
    haji: { label: 'Haji & HAFIS', warna: '#2F7A2F' },
    syariah: { label: 'Syariah & zakat', warna: '#4B5CA8' },
    undang: { label: 'Undang-undang', warna: '#7A2C4A' },
    siasatan: { label: 'Siasatan RCI', warna: '#111827' },
    risiko: { label: 'Risiko akan datang', warna: '#A11D1D' }
  };

  // ---------------------------------------------------------------- SYOR RCI
  var SYOR = [
    { id: '4.4.1a', sasaran: 'Akta 535', tajuk: 'Kriteria khusus anggota Lembaga', teks: 'Nyatakan kriteria khusus dan kaedah pemilihan anggota Lembaga dalam Akta.', punca: 'Seksyen 6(2) hanya menetapkan "Muslim dan warganegara Malaysia".' },
    { id: '4.4.1b', sasaran: 'Akta 535', tajuk: 'Bidang kepakaran dinyatakan', teks: 'Perbankan, perniagaan, ekonomi, syariah, perundangan dan perakaunan.', punca: 'Komposisi Lembaga tidak seimbang; Menteri bergantung sepenuhnya kepada cadangan pengurusan.' },
    { id: '4.4.1c', sasaran: 'Akta 535', tajuk: 'Larangan ahli politik aktif', teks: 'Ahli politik aktif dilarang dilantik sebagai Pengerusi/anggota Lembaga dan anak syarikat.', punca: 'Tiga anggota Lembaga dalam tempoh siasatan ialah ahli politik aktif.' },
    { id: '4.4.1d', sasaran: 'Akta 535', tajuk: 'Rujukan sebelum pembatalan pelantikan', teks: 'Pembatalan pelantikan perlu dirujuk kepada badan penasihat bebas.', punca: 'Seksyen 6(5) membenarkan pembatalan tanpa sebab; digunakan dua kali pada 2021.' },
    { id: '4.4.1e', sasaran: 'Akta 535', tajuk: 'Sebab munasabah untuk penamatan', teks: 'Penamatan perkhidmatan anggota Lembaga mesti diberi sebab yang munasabah.', punca: 'Penamatan mengejut menjejaskan proses penambahbaikan yang sedang berjalan.' },
    { id: '4.4.1f', sasaran: 'Akta 535', tajuk: 'Kanunkan tiga jawatankuasa', teks: 'Jawatankuasa Urusan Haji, Jawatankuasa Penasihat Syariah dan Panel Pelaburan dikanunkan.', punca: 'Panel Pelaburan dibubar secara pentadbiran pada Mei 2018 dan diganti struktur yang tidak selari dengan Akta.' },
    { id: '4.4.1g', sasaran: 'Akta 535', tajuk: 'Peruntukan jelas pengiraan hibah', teks: 'Hibah mesti berpandukan penyata kewangan tahunan yang telah diaudit mengikut piawaian MIA.', punca: 'Seksyen 22 tidak mendefinisikan "aset" — dijadikan justifikasi penggunaan RAV.' },
    { id: '4.4.1h', sasaran: 'Akta 535', tajuk: 'Tubuhkan jabatan "Dana Haji"', teks: 'Jabatan pelaburan dalam LTH yang dikawal selia Suruhanjaya Sekuriti Malaysia.', punca: 'Fungsi pelaburan perlu bebas dan profesional tanpa campur tangan.' },
    { id: '4.4.1i', sasaran: 'Akta 535', tajuk: 'Pengecualian Akta 240', teks: 'Pinda seksyen 26 supaya Akta Badan Berkanun (Akuan dan Laporan Tahunan) 1980 tidak terpakai.', punca: 'Membolehkan LTH melantik firma akauntan swasta.' },
    { id: '4.4.2', sasaran: 'Kerajaan', tajuk: 'Kuasa dibahagi dua Menteri', teks: 'Menteri Hal Ehwal Agama untuk haji; Menteri Kewangan untuk kewangan, dana dan pelaburan. Pelantikan oleh Perdana Menteri atas syor badan penasihat bebas.', punca: 'Kepakaran ketiga-tiga Menteri Hal Ehwal Agama hanya terhad kepada hal ehwal agama.' },
    { id: '4.4.3', sasaran: 'LTH', tajuk: 'Hadkan jawatan dalam anak syarikat', teks: 'Penglibatan anggota Lembaga dan pengurusan dalam anak syarikat dihadkan.', punca: 'Seorang pegawai memegang sehingga 23 jawatan anak syarikat serentak.' },
    { id: '4.4.4', sasaran: 'BNM', tajuk: 'Kawal selia BNM dihadkan', teks: 'Jika perlu, hanya kawalan rizab dan pengurusan kecairan — bukan di bawah Akta 759/758/618.', punca: 'BNM sendiri mengakui tiada kepakaran penuh untuk mengawal selia pengurusan haji dan pelaburan.' },
    { id: '4.4.5', sasaran: 'Kerajaan', tajuk: 'Audit oleh firma swasta', teks: 'Pengauditan penyata kewangan LTH tidak lagi oleh Jabatan Audit Negara.', punca: 'JAN memberi Sijil Audit Bersih 2014–2017 walaupun terdapat ketidakpatuhan material.' },
    { id: '4.4.6', sasaran: 'LTH', tajuk: 'Hibah berasaskan penyata beraudit', teks: 'Bukan Laporan Proforma; RAV tidak boleh dijadikan asas.', punca: 'RAV menokok RM4,466 juta kepada nilai aset 2017.' },
    { id: '4.4.7', sasaran: 'LTH', tajuk: 'Patuh piawaian pelaporan sepenuhnya', teks: 'Termasuk Garis Panduan PA 3.1 bagi Badan Berkanun Persekutuan.', punca: 'Kumpulan Wang Pendeposit salah dikelaskan sebagai ekuiti sejak 2010.' },
    { id: '4.4.8', sasaran: 'LTH', tajuk: 'Hentikan bonus terlalu tinggi', teks: 'Amalan pemberian bonus yang terlalu tinggi kepada kakitangan dihentikan.', punca: 'Bonus sehingga 13 bulan gaji (RM74 juta) pada 2014 — tahun aset mula jatuh di bawah liabiliti.' },
    { id: '4.4.9', sasaran: 'LTH', tajuk: 'Dapatkan semula bonus TH Properties', teks: 'Bonus RM2.2 juta kepada Lembaga dan pengurusan TH Properties dituntut semula.', punca: 'Melanggar seksyen 230 Akta Syarikat 2016.' },
    { id: '4.4.10', sasaran: 'Kerajaan', tajuk: 'Audit forensik 14 pelaburan', teks: 'Meneliti bagaimana keputusan pelaburan lalu dibuat sehingga berlaku penurunan nilai aset yang teruk.', punca: 'Suruhanjaya mendapati wujud transaksi mencurigakan dan penyembunyian maklumat.' },
    { id: '4.4.11', sasaran: 'Penguatkuasa', tajuk: 'Tindakan tegas ke atas laporan polis', teks: 'Setiap laporan polis atau aduan berkaitan salah laku di LTH.', punca: 'Empat laporan polis sejak 2018 — sebahagian masih dalam siasatan.' },
    { id: '4.4.12', sasaran: 'LTH', tajuk: 'Percepatkan tindakan tatatertib', teks: 'Termasuk durasi penahanan kerja.', punca: 'Satu kluster mengambil 19 bulan daripada surat representasi ke keputusan.' },
    { id: '4.4.13', sasaran: 'LTH', tajuk: 'Pantau kes mahkamah & timbang tara', teks: 'Penyelesaian di luar mahkamah harus dipertingkatkan.', punca: 'Kes THIP dan Al-Rawda masih berjalan.' },
    { id: '4.4.14', sasaran: 'LTH', tajuk: 'Rujuk isu zakat kepada Muzakarah MKI', teks: 'Kerana berlaku perubahan akad simpanan.', punca: 'Akad bertukar tiga kali: Mudarabah → Wadi\'ah Yad Dhamanah → Wakalah.' },
    { id: '4.4.15', sasaran: 'Kerajaan', tajuk: 'Pastikan Pelan Pemulihan berjaya', teks: 'Instrumen Sukuk boleh ditambah baik dengan jaminan Kerajaan.', punca: 'Jika LTH gagal, jaminan Kerajaan bernilai RM88 bilion terpaksa diaktifkan.' },
    { id: '4.4.16', sasaran: 'Kerajaan', tajuk: 'Sukuk baharu boleh diniagakan', teks: 'Ciri tradeable memberi fleksibiliti kepada LTH mengurus aset.', punca: 'Sukuk sedia ada tidak boleh diniaga, tidak boleh dipindah milik, tanpa penarafan.' },
    { id: '4.4.17', sasaran: 'Kerajaan', tajuk: 'Tawar Sukuk kepada institusi lain', teks: 'Bukan hanya kepada LTH atau Kerajaan.', punca: 'Mengurangkan risiko pegangan tertumpu.' },
    { id: '4.4.18', sasaran: 'Kerajaan', tajuk: 'Peruntukan RM1.73 bilion setahun', teks: 'Seperti dipersetujui Jemaah Menteri, bagi penebusan awal Sukuk UJSB.', punca: 'Setakat laporan, hanya RM500 juta diterima; RM1.5 bilion pada 2021 tidak disalurkan.' },
    { id: '4.4.19', sasaran: 'UJSB', tajuk: 'Penebusan awal daripada pelupusan aset', teks: 'Hasil jualan aset digunakan untuk menebus Sukuk lebih awal.', punca: 'Hanya satu hartanah berjaya dijual sejak 2018.' },
    { id: '4.4.20', sasaran: 'LTH', tajuk: 'Ubah dasar deposit, bayaran haji & HAFIS', teks: 'Deposit minimum naik RM1,300 → RM12,980; hadkan pengeluaran besar dengan notis sebulan; subsidi hanya kepada yang memerlukan.', punca: '65% pendeposit menyimpan RM2,000 atau kurang; 75% deposit dimiliki 5% pendeposit.' },
    { id: '4.4.21', sasaran: 'LTH', tajuk: 'Guna sepenuhnya kuota haji', teks: 'Kuota dijangka meningkat 30,000 → 60,000 menjelang 2030.', punca: 'Pandemik Covid-19 mengganggu operasi haji.' },
    { id: '4.4.22', sasaran: 'LTH', tajuk: 'Naikkan minimum pendaftaran haji', teks: 'RM1,300 → RM12,980. Tempoh menunggu dijangka turun daripada 130 tahun kepada 33 tahun.', punca: 'Tempoh menunggu semasa melebihi jangka hayat pendeposit.' },
    { id: '4.4.23', sasaran: 'LTH', tajuk: 'Pelaburan bebas & profesional dalam entiti sama', teks: 'Fungsi pelaburan dikekalkan dalam LTH sebagai jabatan "Dana Haji" di bawah Suruhanjaya Sekuriti.', punca: 'Terdapat unsur subsidi silang antara dana dan operasi haji.' },
    { id: '4.4.24', sasaran: 'LTH', tajuk: 'Fokus portfolio; keluar dari pelaburan strategik', teks: 'Kecuali Bank Islam, Syarikat Takaful dan syarikat yang menyokong operasi haji.', punca: 'Kajian EY 2018: hampir kesemua "pelaburan strategik" mengalami kerugian.' },
    { id: '4.4.25', sasaran: 'Kerajaan', tajuk: 'Perkukuh model perniagaan tanpa campur tangan politik', teks: 'Langkah penambahbaikan menyeluruh termasuk memperkasa tadbir urus.', punca: 'Tekanan politik disebut sebagai pendorong keputusan hibah, bayaran haji dan HAFIS.' }
  ];

  // ------------------------------------------------------ NOTA INTEGRITI DATA
  var PERCANGGAHAN = [
    {
      tajuk: 'Kadar hibah 2017 disebut dua nilai berbeza',
      teks: 'Jadual kadar hibah (ms 82) menyatakan 4.50% + 1.75% bagi 2017. Namun perenggan 3.11.10 (ms 93) menyebut Lembaga menukar kepada baki minima bulanan "dengan kadar yang lebih tinggi iaitu 6.25%". 6.25% ialah kadar tahun 2014.',
      kesan: 'Jumlah RM (RM3.31 bilion dibayar vs RM2.70 bilion keupayaan) adalah konsisten dengan jadual agihan. Dashboard ini menggunakan 4.50% + 1.75% untuk 2017.',
      src: [{ pdf: 120, ms: '82' }, { pdf: 131, ms: '93' }]
    },
    {
      tajuk: 'Peruntukan bonus 2015: RM65 juta atau RM61 juta?',
      teks: 'Jadual kadar bonus (ms 99) menyatakan RM65 juta; jadual keuntungan-vs-bonus (ms 101) menyatakan RM61 juta.',
      kesan: 'Dashboard memaparkan kedua-duanya mengikut jadual asal masing-masing dan tidak mencampurkannya.',
      src: [{ pdf: 137, ms: '99' }, { pdf: 139, ms: '101' }]
    },
    {
      tajuk: 'Keuntungan bersih 2017: RM2,798 juta atau RM3,412 juta?',
      teks: 'Jadual bonus (ms 101) menyatakan keuntungan bersih 2017 RM2,798 juta. Petikan laporan PwC (ms 111) menyatakan "Profit for the year (2017) 3,412".',
      kesan: 'Laporan tidak menjelaskan asas perbezaan (contohnya sebelum/selepas zakat atau peringkat LTH vs kumpulan). Dashboard tidak menggabungkan kedua-dua angka dalam satu carta.',
      src: [{ pdf: 139, ms: '101' }, { pdf: 149, ms: '111' }]
    },
    {
      tajuk: 'Nilai Sukuk: RM27.5 bilion atau RM27.56 bilion?',
      teks: 'Perenggan 3.13.23 menyebut "RM27.56 bilion"; perenggan lain menyebut RM27.5 bilion. Nilai nominal dua siri (13.2 + 14.3) berjumlah RM27.5 bilion.',
      kesan: 'Dashboard menggunakan RM27.5 bilion. Juga: 27.5 − 19.6 (prinsipal) = RM7.9 bilion, tetapi laporan menyatakan yield tertunggak RM7.65 bilion.',
      src: [{ pdf: 157, ms: '119' }, { pdf: 159, ms: '121' }]
    },
    {
      tajuk: 'Kos haji asas: 2013 atau 2003?',
      teks: 'Ringkasan Eksekutif menyatakan kos haji 2013 ialah RM15,553. Perenggan 3.16.1 menyatakan kos haji 2003 ialah RM15,555.',
      kesan: 'Dashboard hanya menggunakan siri 2014–2019 dan unjuran 2022–2030 yang mempunyai jadual penuh.',
      src: [{ pdf: 23, ms: 'xxi' }, { pdf: 203, ms: '165' }]
    },
    {
      tajuk: 'Tempoh menunggu haji: 130 atau 135 tahun?',
      teks: 'Ringkasan Eksekutif dan syor 4.4.22 menyebut 130 tahun; perenggan 3.16.17 menyebut 135 tahun.',
      kesan: 'Kedua-duanya merujuk kiraan EY berasaskan bayaran RM9,980. Dashboard memaparkan julat 130–135 tahun.',
      src: [{ pdf: 209, ms: '171' }, { pdf: 236, ms: '198' }]
    },
    {
      tajuk: 'Pembelian tambahan FGV 2012 — angka tidak konsisten',
      teks: 'Laporan menyatakan 232,010,800 unit dibeli pada purata RM5.01/unit dengan "jumlah pelaburan tambahan RM116,202,310". 232 juta unit × RM5.01 ialah lebih kurang RM1.16 bilion, bukan RM116 juta.',
      kesan: 'Dashboard tidak menggunakan angka ini dalam sebarang jumlah terbitan. Jumlah kos pegangan FGV yang digunakan ialah RM1,310,020,819 seperti dinyatakan laporan.',
      src: [{ pdf: 192, ms: '154' }]
    },
    {
      tajuk: 'Dua asas liabiliti 2017 yang berbeza',
      teks: 'Jadual PwC menyatakan liabiliti RM71,086 juta; jadual RAV menyatakan RM74,410 juta. Bezanya RM3,324 juta — tepat sama dengan jumlah agihan hibah 2017.',
      kesan: 'Ini bukan percanggahan tetapi perbezaan asas: satu sebelum agihan, satu selepas agihan. Dashboard menerangkan perkara ini secara terbuka kerana ia mudah disalah tafsir.',
      src: [{ pdf: 116, ms: '78' }, { pdf: 147, ms: '109' }]
    },
    {
      tajuk: 'Nama penerima bonus dieja berbeza antara dua jadual',
      teks: 'Jadual 2017 menyenaraikan "Datuk Azizan bin Abdul Rahman"; jadual 2018 menyenaraikan "Dato’ Azizan bin Abd Rahman". Konteks laporan (Pengerusi Mesyuarat Exco TH Properties) menunjukkan ia individu yang sama.',
      kesan: 'Papan ini menyeragamkan "Abdul" kepada "Abd" supaya seorang individu tidak dikira dua kali. Kiraan: 21 bayaran kepada 11 individu, bukan 21 individu.',
      src: [{ pdf: 142, ms: '104' }, { pdf: 143, ms: '105' }]
    },
    {
      tajuk: 'Nombor jujukan penerima bonus TH Properties 2017 tidak berturutan',
      teks: 'Jadual asal (hasil OCR) melompat daripada bil. 4 terus ke bil. 8. Terdapat 11 baris nama dengan jumlah RM1,148,400.',
      kesan: 'Dashboard menyenaraikan 11 nama seperti dalam jadual dan tidak menganggap ada nama yang hilang.',
      src: [{ pdf: 142, ms: '104' }]
    }
  ];

  var BATASAN = [
    'Laporan ini disiapkan pada 19 Julai 2022. Semua angka "sekarang" bermaksud keadaan pada pertengahan 2022.',
    'Ekshibit laporan (Jilid 1–12) DIKLASIFIKASIKAN RAHSIA dan tidak boleh disemak — termasuk Laporan PwC, Roland Berger, EY dan surat-surat BNM.',
    'Laporan TIDAK memberikan satu angka "jumlah kerugian LTH". Angka yang boleh dijumlahkan hanyalah rosot nilai yang dinyatakan secara berasingan.',
    'Laporan TIDAK memberikan penyata kewangan penuh — hanya jumlah aset, liabiliti, agihan dan beberapa baris pelarasan.',
    'Laporan TIDAK menetapkan liabiliti undang-undang mana-mana individu. Ia mengesyorkan audit forensik dan tindakan pihak berkuasa.',
    'Teks sumber ialah hasil OCR daripada PDF. Beberapa angka dan simbol peratus terjejas dalam proses ini; dashboard menggunakan angka yang boleh disahkan silang dengan jadual.',
    'Bilangan jemaah haji dan beberapa nisbah dalam dashboard ini ialah data TERBITAN — dikira daripada angka laporan dan sentiasa ditanda.'
  ];

  var ISTILAH = [
    { istilah: 'Hibah', maksud: 'Bayaran keuntungan tahunan kepada pendeposit. Bukan faedah — ia agihan daripada untung pelaburan.' },
    { istilah: 'RAV (Realisable Asset Value)', maksud: 'Nilai aset yang "boleh direalisasi". Anggaran pengurusan tentang harga aset jika dijual — bukan harga pasaran sebenar dan tiada piawaian khusus untuk mengiranya.' },
    { istilah: 'Rosot nilai (impairment)', maksud: 'Mengakui dalam akaun bahawa nilai sesuatu aset sudah jatuh. Jika tidak diakui, akaun kelihatan lebih sihat daripada keadaan sebenar.' },
    { istilah: 'Sijil Audit Bersih', maksud: 'Pengesahan juruaudit bahawa penyata kewangan memberi gambaran benar dan saksama.' },
    { istilah: 'Emphasis of Matter', maksud: 'Nota juruaudit menarik perhatian kepada sesuatu perkara TANPA mengubah pendapat bersih. Ia lebih lembut daripada "Pendapat Berteguran".' },
    { istilah: 'Sukuk berkupon sifar', maksud: 'Bon patuh syariah yang tidak membayar apa-apa tunai setiap tahun. Semua bayaran hanya berlaku pada tarikh matang.' },
    { istilah: 'SPV (Special Purpose Vehicle)', maksud: 'Syarikat yang ditubuhkan untuk satu tujuan khusus — di sini, memegang dan memulihkan aset bermasalah LTH.' },
    { istilah: 'Bank run', maksud: 'Keadaan ramai pendeposit mengeluarkan wang serentak kerana hilang keyakinan.' },
    { istilah: 'Hak Penolakan Pertama (ROFR)', maksud: 'Hak keutamaan LTH membeli semula aset sebelum ia ditawarkan kepada orang lain.' },
    { istilah: 'HAFIS', maksud: 'Hajj Financial Support — subsidi kos haji yang ditanggung LTH daripada keuntungan pelaburan.' },
    { istilah: 'Muassasah', maksud: 'Kategori jemaah haji yang diuruskan sepenuhnya oleh Tabung Haji (bukan pakej swasta).' },
    { istilah: 'Concentration risk', maksud: 'Risiko tertumpu — apabila sebahagian besar deposit dipegang oleh segelintir pendeposit sahaja.' },
    { istilah: 'Put Option (Hak Jual)', maksud: 'Hak LTH memaksa penjual membeli semula saham pada harga tetap jika syarat tertentu gagal dipenuhi.' },
    { istilah: 'Pendapatan tertunggak (deferred income)', maksud: 'Keuntungan yang direkod dalam akaun tetapi belum diterima dalam bentuk tunai.' },
    { istilah: 'Kumpulan Wang Disatukan', maksud: 'Akaun utama Kerajaan Persekutuan. Jaminan deposit LTH akhirnya dibayar dari sini jika diaktifkan.' }
  ];

  // ------------------------------------------------------------ ANGKA UTAMA
  var SOROTAN = [
    {
      nilai: '−RM4.09b', label: 'Jurang aset vs liabiliti pada akhir 2017',
      teks: 'Selepas hibah diagihkan. Pada 2013 kedudukan masih lebihan +RM2.45 bilion.',
      nada: 'neg', src: { pdf: 147, ms: '109' }, ke: 'jurang'
    },
    {
      nilai: 'RM12.65b', label: 'Hibah dibayar 2014–2017',
      teks: 'Dalam tempoh sama, lebihan sebenar sebelum agihan hanya berjumlah RM0.99 bilion.',
      nada: 'neg', src: { pdf: 130, ms: '92' }, ke: 'hibah', terbitan: true
    },
    {
      nilai: 'RM10.2b', label: 'Premium pemindahan aset kepada UJSB',
      teks: 'Aset bernilai pasaran RM9.7 bilion dipindah pada RM19.9 bilion.',
      nada: 'neg', src: { pdf: 159, ms: '121' }, ke: 'ujsb'
    },
    {
      nilai: 'RM27.5b', label: 'Obligasi Sukuk UJSB, matang 2026 & 2029',
      teks: 'Suruhanjaya: risiko terbesar LTH. Bersamaan ~31% aset LTH.',
      nada: 'neg', src: { pdf: 171, ms: '133' }, ke: 'ujsb'
    },
    {
      nilai: 'RM88b', label: 'Deposit yang dijamin Kerajaan',
      teks: 'Jika LTH gagal, jaminan seksyen 24 Akta 535 terpaksa diaktifkan.',
      nada: 'amaran', src: { pdf: 167, ms: '129' }, ke: 'ringkasan'
    },
    {
      nilai: 'RM742j', label: 'HAFIS setahun menjelang 2030',
      teks: '65.6% daripada kos haji, jika bayaran haji kekal RM12,980.',
      nada: 'amaran', src: { pdf: 205, ms: '167' }, ke: 'haji'
    },
    {
      nilai: '14', label: 'Pelaburan disyorkan audit forensik',
      teks: 'Suruhanjaya mendapati wujud transaksi mencurigakan dan penyembunyian maklumat.',
      nada: 'neg', src: { pdf: 234, ms: '196' }, ke: 'pelaburan'
    },
    {
      nilai: 'RM2.19j', label: 'Bonus istimewa TH Properties 2017–2018',
      teks: 'Kepada 21 nama (11 + 10). Pandangan guaman: melanggar seksyen 230 Akta Syarikat 2016.',
      nada: 'neg', src: { pdf: 142, ms: '104' }, ke: 'bonus', terbitan: true
    }
  ];

  window.RCI = {
    srcUrl: srcUrl,
    META: META,
    KEWANGAN: KEWANGAN,
    PANDANGAN2017: PANDANGAN2017,
    JAMBATAN2017: JAMBATAN2017,
    ROSOTNILAI: ROSOTNILAI,
    RAV: RAV,
    HIBAH: HIBAH,
    DEPOSIT: DEPOSIT,
    BONUS: BONUS,
    UJSB: UJSB,
    HAJI: HAJI,
    PELABURAN: PELABURAN,
    JAWATAN: JAWATAN,
    AHLIPOLITIK: AHLIPOLITIK,
    JAWATANANAK: JAWATANANAK,
    TATATERTIB: TATATERTIB,
    LAPORANPOLIS: LAPORANPOLIS,
    KRONOLOGI: KRONOLOGI,
    KATEGORI: KATEGORI,
    SYOR: SYOR,
    PERCANGGAHAN: PERCANGGAHAN,
    BATASAN: BATASAN,
    ISTILAH: ISTILAH,
    SOROTAN: SOROTAN
  };
})();
