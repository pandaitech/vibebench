/* =========================================================================
   DATA — Laporan Suruhanjaya Siasatan Diraja (RCI) Tabung Haji 2014–2020
   -------------------------------------------------------------------------
   Setiap entri data membawa `src` = rujukan kepada laporan asal:
     s : seksyen/perenggan laporan (cth. "3.9.22")
     p : nombor muka surat PDF laporan (cth. 120)
   Sumber boleh dibuka terus di:
     https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md#pdf-page-<p>

   Penanda jenis data:
     FAKTA    — angka terus daripada laporan
     TERBITAN — dikira/diterbitkan daripada angka laporan (ditanda dalam UI)
     UNJURAN  — unjuran yang direkodkan dalam laporan (bukan ramalan kami)
     SIMULASI — ilustrasi kira-kira untuk tujuan penjelasan (ditanda jelas)
   Tiada data dicipta. Semua nilai bersumberkan laporan.
   ========================================================================= */
window.D = (function () {

  const URL = 'https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md';
  const src = (s, p) => ({ s, p, url: `${URL}#pdf-page-${p}` });

  return {

    /* ---------- METADATA LAPORAN ---------- */
    meta: {
      tajuk: 'Laporan Suruhanjaya Siasatan Diraja bagi Menyiasat Isu Pengurusan dan Operasi Lembaga Tabung Haji dari Tahun 2014 hingga 2020',
      tarikh: '30 Ogos 2022',
      tempohSiasatan: '2014–2020',
      mukasurat: '±240 muka surat (OCR)',
      pesuruhjaya: ['Tun Md Raus bin Sharif (Pengerusi)', 'Tan Sri Samsudin bin Osman', 'Tan Sri Abdul Rashid bin Hussain', 'Tan Sri Dr. Mohd. Munir bin Abdul Majid', 'Profesor Dr. Asmadi bin Mohamed Naim', 'Norsyahrin bin Hamidon'],
      skop: src('1.3', 43),
      pengenalan: src('Ringkasan Eksekutif', 13)
    },

    /* ---------- 1. KEDUDUKAN KEWANGAN (PwC) ---------- */
    /* Jurang aset vs liabiliti 2013–2017 — analisis PwC (Financial Review) */
    pwc: [
      { y: 2013, aset: 48778, liabiliti: 43696, sebelum: 5082, agihan: 2632, selepas: 2450, src: src('3.13.7', 147) },
      { y: 2014, aset: 54751, liabiliti: 51866, sebelum: 2885, agihan: 3237, selepas: -352, src: src('3.9.2', 112) },
      { y: 2015, aset: 60196, liabiliti: 60062, sebelum: 134,  agihan: 3220, selepas: -3086, src: src('3.9.2', 112) },
      { y: 2016, aset: 64321, liabiliti: 65581, sebelum: -1260, agihan: 2871, selepas: -4131, src: src('3.9.2', 112) },
      { y: 2017, aset: 70317, liabiliti: 71086, sebelum: -769,  agihan: 3324, selepas: -4093, src: src('3.9.2', 112) }
    ],
    pwcNota: 'Jadual PwC mula digunakan LTH sebagai rujukan kedudukan sebenar selepas teguran Ketua Audit Negara pada 16 Julai 2018. "Sebelum" = lebihan/(kurangan) aset sebelum agihan hibah; "Selepas" = kedudukan selepas hibah dibayar.',

    /* ---------- 2. HIBAH (agihan keuntungan) ---------- */
    hibah: [
      { y: 2014, tahun: 6.25, haji: 2.00, src: src('3.9.22', 120) },
      { y: 2015, tahun: 5.00, haji: 3.00, src: src('3.9.22', 120) },
      { y: 2016, tahun: 4.25, haji: 1.50, src: src('3.9.22', 120) },
      { y: 2017, tahun: 4.50, haji: 1.75, src: src('3.9.22', 120) },
      { y: 2018, tahun: 1.25, haji: 0,    src: src('3.9.22', 120) },
      { y: 2019, tahun: 3.05, haji: 0,    src: src('3.9.22', 120) },
      { y: 2020, tahun: 3.10, haji: 0,    src: src('3.9.22', 120) },
      { y: 2021, tahun: 3.10, haji: 0,    src: src('3.9.22', 120) }
    ],
    /* Jumlah hibah dibayar (RM'000) — jadual laporan */
    hibahJumlah: [
      { y: 2014, tahun: 2988053, haji: 249143, jumlah: 3237196, src: src('3.11.7', 130) },
      { y: 2015, tahun: 2807369, haji: 413005, jumlah: 3220374, src: src('3.11.7', 130) },
      { y: 2016, tahun: 2645625, haji: 225197, jumlah: 2870822, src: src('3.11.7', 130) },
      { y: 2017, tahun: 3042184, haji: 281557, jumlah: 3323741, src: src('3.11.7', 130) },
      { y: 2018, tahun: 922959,  haji: 0,      jumlah: 922959,  src: src('3.11.7', 130) },
      { y: 2019, tahun: 2140538, haji: 0,      jumlah: 2140538, src: src('3.11.7', 130) },
      { y: 2020, tahun: 2242141, haji: 0,      jumlah: 2242141, src: src('3.11.7', 130) }
    ],
    /* Kumulatif 1966–2021 (Ringkasan Eksekutif / Bab 4) */
    hibahKumulatif: { jumlah: 37.52, unit: 'bilion', tempoh: '1966–2021', src: src('Bab 4, para 4.2', 229) },

    /* ---------- 3. PERAKAUNAN KREATIF / RAV ---------- */
    rav2017: {
      aset: 70317,
      pelarasan: 4466,
      asetRAV: 74783,
      liabiliti: 74410,
      bersih: 373,
      src: src('3.9.12', 116)
    },
    /* Kesan perubahan polisi rosot nilai pada 2017 (PwC) */
    rosotNilai: {
      polisi: [
        { ambang: '>70%', tempoh: '>24 bulan', impak: 1313 },
        { ambang: '>85%', tempoh: '—', impak: 171 },
        { ambang: '>90%', tempoh: '—', impak: 1 }
      ],
      direkod2017: 1.0,           // RM juta (hanya RM1j direkod)
      tidakDirekodAFS: 1310,      // RM juta (FRS139)
      tidakDirekodSubsid: 227.81, // RM juta (3 subsidiari + 3 bersekutu)
      tidakDirekodTHHE: 164.58,   // RM juta — TH Heavy Engineering
      contoh: 'Andaian laporan: saham dibeli RM1,000 hanya dirosot nilai apabila harga pasaran jatuh kepada RM100 (polisi 90%). Jika dijual ketika itu, LTH hanya dapat RM100 — bukan RM1,000 seperti dalam penyata.',
      contohSrc: src('3.9.8', 115),
      keuntungan2017: 3412,       // RM juta (dilaporkan)
      kerugianMFRS2017: 1433,     // RM juta (terlaras FRS)
      kerugianTerkumpul: 4683,    // RM juta (terkumpul setakat 31.12.2017)
      src: src('3.13.11', 149)
    },
    thhe: { nilai: 164.58, src: src('3.13.5', 146) },

    /* ---------- 4. AUDIT ---------- */
    audit: [
      { y: 2014, sijil: 'Bersih', eom: false, nota: 'Deposit dikelaskan sebagai ekuiti sejak 2010 (isu representasi salah).', src: src('3.11.12', 132) },
      { y: 2015, sijil: 'Bersih', eom: false, nota: 'Aset < liabiliti selepas agihan hibah (analisis PwC).', src: src('3.11.2', 125) },
      { y: 2016, sijil: 'Bersih', eom: false, nota: 'Aset < liabiliti sebelum agihan hibah (analisis PwC).', src: src('3.11.2', 125) },
      { y: 2017, sijil: 'Bersih + "Emphasis of Matter"', eom: true, nota: 'Polisi rosot nilai diubah 2 kali dalam setahun; RM227.81j rosot nilai tidak direkod.', src: src('3.13.5', 146) }
    ],
    kanSurat: {
      petikan: '…sekiranya Pendapat Berteguran diberikan, secara tidak langsung ianya akan mempengaruhi ekspektasi dan persepsi negatif pihak berkepentingan, khususnya pendeposit untuk terus menyimpan di TH. Dengan mengambil kira perkara tersebut, Pendapat Tanpa Teguran dengan "Emphasis of Matter" telah diberikan pada 16 Julai 2018.',
      src: src('3.11.15', 133)
    },

    /* ---------- 5. DEPOSIT & RISIKO TERTUMPU ---------- */
    deposit: [
      { y: 2018, nilai: 73000, nota: 'Sebelum pengumuman hibah 1.25%', src: src('3.9.29', 122) },
      { y: 2019, nilai: 69000, nota: 'Akhir 2019 — selepas pengumuman hibah rendah', src: src('3.9.29', 122) },
      { y: 2020, nilai: 76000, nota: 'Akhir 2020 — pulih', src: src('3.9.30', 122) },
      { y: 2022, nilai: 88000, nota: 'Setakat 21 Mei/22 Julai 2022 (8.6 juta pendeposit)', src: src('3.13.50', 167) }
    ],
    konsentrasi: {
      depositPct: 75, pendepositPct: 5,
      nota: 'Anggaran laporan: 75% deposit LTH dimiliki oleh hanya 5% pendeposit (risiko tertumpu).',
      src: src('3.17.15(c)', 178)
    },
    depositKecil: { pct: 65, jumlah: 2000, nota: '65% pendeposit mempunyai deposit RM2,000 atau kurang.', src: src('3.16.14', 207) },
    danaMinimum: { nilai: 60, unit: 'bilion', nota: 'LTH dianggarkan perlukan dana minimum RM60 bilion untuk menampung subsidi haji pada tahap semasa.', src: src('3.7.27', 110) },

    /* ---------- 6. BONUS KAKITANGAN ---------- */
    bonus: [
      { y: 2010, peruntukan: 25,   dilulus: '2.5 + 1', agihan: '2–6',   src: src('3.12.7', 137) },
      { y: 2011, peruntukan: 35,   dilulus: '3 + 1',   agihan: '2–6',   src: src('3.12.7', 137) },
      { y: 2012, peruntukan: 38,   dilulus: '3.5 + 1', agihan: '2.5–8', src: src('3.12.7', 137) },
      { y: 2013, peruntukan: 49,   dilulus: '2.5–10',  agihan: '2.5–10', src: src('3.12.7', 137) },
      { y: 2014, peruntukan: 74,   dilulus: '1–11 + 2', agihan: '1–11 + 2', src: src('3.12.7', 137) },
      { y: 2015, peruntukan: 65,   dilulus: '1–10',    agihan: '1–10',  src: src('3.12.7', 137) },
      { y: 2016, peruntukan: 25,   dilulus: '1–3',     agihan: '1–3',   src: src('3.12.7', 137) },
      { y: 2017, peruntukan: 56.7, dilulus: '1–6',     agihan: '1–6',   src: src('3.12.7', 137) },
      { y: 2018, peruntukan: 10.8, dilulus: '1',       agihan: '1',     src: src('3.12.7', 137) },
      { y: 2019, peruntukan: 11.6, dilulus: '1',       agihan: '1',     src: src('3.12.7', 137) },
      { y: 2020, peruntukan: 14.1, dilulus: '1',       agihan: '1',     src: src('3.12.7', 137) }
    ],
    bonusProfit: [
      { y: 2013, untung: 2634, bonus: 49, pct: 1.9, bulan: '2.5–10',  src: src('3.12.10', 138) },
      { y: 2014, untung: 2979, bonus: 74, pct: 2.5, bulan: '1–11 + 2', src: src('3.12.10', 138) },
      { y: 2015, untung: 3537, bonus: 61, pct: 1.7, bulan: '1–10',    src: src('3.12.10', 138) },
      { y: 2016, untung: 2481, bonus: 25, pct: 1.0, bulan: '1–3',     src: src('3.12.10', 138) },
      { y: 2017, untung: 2798, bonus: 57, pct: 2.0, bulan: '1–6',     src: src('3.12.10', 138) }
    ],

    /* ---------- 7. BONUS TH PROPERTIES ---------- */
    thpBonus2017: {
      tahun: 2017, jumlah: 1148400, sumber: 'Bonus istimewa — projek The Bay Pavilion (AUD11.6j)',
      penerima: [
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
      kelulusan: 'Mesyuarat Exco TH Properties, 12 April 2017 — tanpa kuasa Exco (melanggar s.230(2) & 230(4) Akta Syarikat 2016)',
      src: src('3.12.19–3.12.21', 141)
    },
    thpBonus2018: {
      tahun: 2018, jumlah: 1045000, sumber: 'Bonus istimewa — keuntungan sebelum cukai TH Properties RM34.84j (2017)',
      penerima: [
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
      kelulusan: 'Lembaga THP Australia Capital, 23 April 2018; disahkan EGM 30 Nov 2018 — notifikasi 7 bulan selepas resolusi (melanggar s.230(3))',
      src: src('3.12.23–3.12.26', 142)
    },

    /* ---------- 8. UJSB — PEMINDAHAN ASET ---------- */
    ujsb: {
      penubuhan: '14 Disember 2018',
      pemindahan: [
        { jenis: 'Hartanah & tanah (29 aset)', buku: 1411, pindah: 2247, pasaran: 1411, src: src('3.13.29', 159) },
        { jenis: 'Syarikat perladangan (Sri Aman)', buku: 718, pindah: 802, pasaran: 718, src: src('3.13.29', 159) },
        { jenis: 'Ekuiti tersenarai (106 kaunter)', buku: 16852, pindah: 16851, pasaran: 7600, src: src('3.13.29', 159) }
      ],
      jumlah: { buku: 18981, pindah: 19900, pasaran: 9729, premium: 10200 },
      sukuk: [
        { siri: 'Siri 1', nilai: 10000, nominal: 13200, tempoh: 7, ytm: 4.05, matang: '2026', src: src('3.13.41', 162) },
        { siri: 'Siri 2', nilai: 9600, nominal: 14300, tempoh: 10, ytm: 4.10, matang: '2029', src: src('3.13.41', 162) }
      ],
      tunai: { jumlah: 300, butiran: 'RM100j (30 Dis 2019) + RM200j (30 Dis 2020) — bayaran saham tidak patuh syariah', src: src('3.13.42', 163) },
      komitmen: {
        total: 17800, rm500: 2020, setahun: 1730,
        nota2021: 'RM1.5 bilion peruntukan 2021 TIDAK diterima (keutamaan kepada pemulihan Covid-19).',
        src: src('3.13.46–3.13.48', 165)
      },
      risiko: {
        bahagianAset: 0.31, bahagianPendapatan: 0.26,
        nota: 'Sukuk RM27.5b ≈ 31% daripada jumlah aset LTH; hasil akruan sukuk ≈ 26% daripada pendapatan tahunan LTH; melebihi 1/3 daripada agihan tahunan kepada pendeposit.',
        src: src('3.13.62', 171)
      },
      pendapatanTertunggak: { setahun: 840, kumulatif: 2100, tarikh: '31 Disember 2021', src: src('3.13.60', 170) },
      kerugianUJSB2019: 9900
    },

    /* Saham mewah yang dipindahkan (nilai kejatuhan) */
    bluechips: [
      { nama: 'Axiata', pindahUnit: 6.00, pasaranUnit: 3.63, turun: -39.5, pindah: 1422605154, pasaran: 931803255, kejatuhan: -490801899, jun22: 3.04, src: src('3.13.37', 161) },
      { nama: 'Maxis', pindahUnit: 6.84, pasaranUnit: 5.43, turun: -20.6, pindah: 879395994, pasaran: 681197584, kejatuhan: -198198410, jun22: 3.52, src: src('3.13.37', 161) },
      { nama: 'MISC', pindahUnit: 7.43, pasaranUnit: 6.15, turun: -17.2, pindah: 486532216, pasaran: 438925710, kejatuhan: -47606506, jun22: 7.30, src: src('3.13.37', 161) },
      { nama: 'Digi', pindahUnit: 5.13, pasaranUnit: 4.24, turun: -17.3, pindah: 576240738, pasaran: 500328955, kejatuhan: -75911783, jun22: 3.27, src: src('3.13.37', 161) },
      { nama: 'TM', pindahUnit: 5.96, pasaranUnit: 2.33, turun: -60.9, pindah: 241202959, pasaran: 107650200, kejatuhan: -133552759, jun22: 5.20, src: src('3.13.37', 161) }
    ],
    bluechipsJumlah: { pindah: 3605977061, pasaran: 2659905704, kejatuhan: -946071357, src: src('3.13.37', 161) },

    /* Hartanah dipindah → nilai Dis 2021 */
    hartanah: [
      { jenis: 'Tanah', pindah: 627006479, pasaran: 401080000, src: src('3.13.34', 161) },
      { jenis: 'Menara pejabat', pindah: 737399698, pasaran: 325000000, src: src('3.13.34', 161) },
      { jenis: 'Lot kedai', pindah: 46301759, pasaran: 33330000, src: src('3.13.34', 161) },
      { jenis: 'Hotel', pindah: 804058625, pasaran: 424270000, src: src('3.13.34', 161) },
      { jenis: 'Perindustrian', pindah: 31914386, pasaran: 19000000, src: src('3.13.34', 161) }
    ],
    hartanahJumlah: { pindah: 2246680947, pasaran: 1202680000, src: src('3.13.34', 161) },
    hartanahLebihJPPHM: 543.65, // RM juta

    /* ROFR — tawaran beli semula kepada LTH */
    rofr: [
      { nama: 'WZ Satu', tarikh: '24-Mac-20', saham: '25,999,115', tawaran: 0.090, pasaran: 0.064, premium: 40.6 },
      { nama: 'Eastern & Oriental', tarikh: '25-Mac-20', saham: '46,400,000', tawaran: 0.365, pasaran: 0.335, premium: 9.0 },
      { nama: 'WZ Satu', tarikh: '31-Mac-20', saham: '16,570,923', tawaran: 0.085, pasaran: 0.075, premium: 13.3 },
      { nama: 'WCT Holdings', tarikh: '02-Apr-20', saham: '42,477,625', tawaran: 0.400, pasaran: 0.377, premium: 6.1 },
      { nama: 'KSL Holdings', tarikh: '06-Mei-20', saham: '71,800,000', tawaran: 0.610, pasaran: 0.630, premium: -3.2 },
      { nama: 'KSL Holdings', tarikh: '21-Mei-20', saham: '35,900,000', tawaran: 0.580, pasaran: 0.605, premium: -4.1 },
      { nama: 'Hap Seng Plantations', tarikh: '29-Mei-20', saham: '66,074,500', tawaran: 1.650, pasaran: 1.570, premium: 5.1 },
      { nama: 'FGV Holdings', tarikh: '09-Dis-20', saham: '283,710,100', tawaran: 1.300, pasaran: 1.270, premium: 2.4 },
      { nama: 'Integrated Logistics', tarikh: '14-Mac-22', saham: '20,500,000', tawaran: 0.380, pasaran: 0.365, premium: 4.1 }
    ],

    /* ---------- 9. PELABURAN BERMASALAH (14) ---------- */
    masalah: [
      {
        id: 'thip', nama: 'PT TH Indo Plantations (THIP)', kategori: 'perladangan', negara: 'Indonesia',
        pelaburan: 'USD910 juta (95% ekuiti, 83,000 ha, Riau)',
        kerugian: 'Potongan USD100j daripada harga; pendahuluan USD178.6j kepada pembeli; syer dipindah sebelum bayaran penuh',
        status: 'Laporan polis — siasatan berterusan (rentas sempadan)',
        tindakan: 'Siasatan dalaman + forensik; laporan polis 30 Nov 2018',
        ringkas: 'Penjualan ladang kepada PT Borneo Pacific tidak mengikut jadual bayaran.',
        src: src('3.14.4(1)', 177)
      },
      {
        id: 'emrail', nama: 'Emrail Sdn. Bhd.', kategori: 'infrastruktur', negara: 'Malaysia',
        pelaburan: 'RM20.17j — 15.3% ekuiti (7 Jun 2016)',
        kerugian: 'Put option RM20.3j; hanya RM2j dibayar; rosot nilai RM19.3j (31 Dis 2020)',
        status: 'Timbang tara AIAC (didaftar 22 Apr 2022)',
        tindakan: 'Writ Mahkamah Tinggi 8 Sep 2021 → diputuskan timbang tara',
        ringkas: 'Syarikat gagal disenaraikan & sasar keuntungan RM36.1j; penjual tak bayar.',
        src: src('3.14.4(2)', 178)
      },
      {
        id: 'wellspring', nama: 'Wellspring Worldwide Limited', kategori: 'ekuiti', negara: 'Malaysia',
        pelaburan: 'RM18.4j — 10% ekuiti (21 Sep 2014)',
        kerugian: 'Put option RM19.03j tidak dibayar; rosot nilai penuh RM19.03j (2019)',
        status: 'Perintah mahkamah RM20.8j (5 Okt 2018); notis kebankrapan dibenarkan 25 Jan 2022',
        tindakan: 'Tuntutan mahkamah; notis kebankrapan kepada promoter',
        ringkas: 'Gagal disenaraikan; promoter tidak bayar di bawah hak jual balik.',
        src: src('3.14.4(3)', 179)
      },
      {
        id: 'dssb', nama: 'Deru Semangat Sdn. Bhd. (DSSB)', kategori: 'perladangan', negara: 'Malaysia',
        pelaburan: 'RM526.16j diluluskan (55% ekuiti RM231j + pembiayaan RM295.16j)',
        kerugian: 'RM257j dikeluarkan → dirosot kepada RM32j; baki komitmen RM258j',
        status: 'Rungkaian: ekuiti & pembiayaan dipulangkan RM259j; komitmen RM258j diwaive',
        tindakan: 'Rundingan dengan YAM Tengku Muda Pahang',
        ringkas: 'Ladang sawit melanggar polisi NDPE (pembalakan hutan simpan) → tidak boleh jual ke Wilmar.',
        src: src('3.14.4(4)', 180)
      },
      {
        id: 'trurich', nama: 'Trurich Resources Sdn. Bhd.', kategori: 'perladangan', negara: 'Indonesia',
        pelaburan: 'Usaha sama dgn FGV Kalimantan — sasaran 200,000 ha',
        kerugian: 'RM364.31j dirosot sepenuhnya; pinjaman Maybank USD179j tertunggak',
        status: 'Insolven; pelupusan anak syarikat kepada PT Karya Teknik Agro',
        tindakan: 'Laporan polis; kelulusan pelupusan 22 Dis 2020',
        ringkas: 'Usaha sama tidak berhasil; manipulasi laporan kesesuaian tanah (40,880 ha).',
        src: src('3.14.4(5)', 181)
      },
      {
        id: 'abraj', nama: 'Abraj Sdn. Bhd.', kategori: 'hartanah', negara: 'Malaysia',
        pelaburan: 'Usaha sama 50% dengan Amanah Raya — ekuiti RM85j',
        kerugian: 'Rosot nilai RM40.25j',
        status: 'Pegangan 50% dijual kepada Amanah Raya (Dis 2020)',
        tindakan: 'Jual balik pegangan kepada rakan usaha sama',
        ringkas: 'Bangunan tidak cukup sewa untuk bayar pinjaman; penyewa utama keluar.',
        src: src('3.14.4(6)', 182)
      },
      {
        id: 'ppb', nama: 'Putrajaya Perdana Berhad (PPB)', kategori: 'ekuiti', negara: 'Malaysia',
        pelaburan: 'RM193.50j — 30% ekuiti (Dis 2014)',
        kerugian: 'Rosot nilai RM145.3j; nilai buku bersih tinggal RM48.2j (Dis 2020)',
        status: 'Put option RM210.7j tidak dibayar; cadangan penyelesaian sedang dinilai',
        tindakan: 'Kelulusan tindakan undang-undang 12 Nov 2020; rundingan penyelesaian',
        ringkas: 'Gagal disenaraikan dalam setahun; sasaran untung RM86j tidak tercapai.',
        src: src('3.14.4(7)', 183)
      },
      {
        id: 'alrawda', nama: 'Al-Rawda Real Estates (4 hotel, Makkah/Madinah)', kategori: 'hotel', negara: 'Arab Saudi',
        pelaburan: 'SR1,426j dibayar (pajakan 10–18 tahun, 4 hotel)',
        kerugian: 'Sewa tertunggak SR560.7j (Dis 2021); ECL RM202.8j (2020); tambahan ±RM184j (2021)',
        status: 'Timbang tara berjalan; likuidasi aset Dr. Mashhoor (20 hartanah); tawaran SR968j ditolak',
        tindakan: '9 tindakan PN (SR344j) + 7 tindakan penjamin (SR255.1j); sekatan perjalanan',
        ringkas: 'Pengendali hotel berhenti bayar sewa sejak Mac 2019.',
        src: src('3.14.4(8)', 184)
      },
      {
        id: 'alfareeda', nama: 'Al-Fareeda Residential Fund', kategori: 'dana', negara: 'Arab Saudi',
        pelaburan: 'SR76j (RM63j) — 13.8% dana SR550j (21 Feb 2013)',
        kerugian: 'Hapus kira penuh SR76j',
        status: 'Dana dicairkan; aset di bawah Alinma Bank; pengurus dana tidak dapat dikesan',
        tindakan: '—',
        ringkas: 'Undang-undang buruh baharu, kontraktor bermasalah & harga minyak jatuh.',
        src: src('3.14.4(9)', 187)
      },
      {
        id: 'thp', nama: 'TH Plantations Berhad (THP)', kategori: 'perladangan', negara: 'Malaysia',
        pelaburan: 'Sukuk RM1.2b (LTH) untuk belian ladang 2012–2014',
        kerugian: 'Hanya 58% ladang produktif; rosot nilai RM170j di peringkat LTH; jual estet untuk bayar hutang',
        status: 'Laporan forensik PwC (25 Apr 2019); laporan kepada PDRM/SPRM/SC; siasatan berterusan; CEO letak jawatan 20 Ogos 2018',
        tindakan: 'Siasatan forensik; laporan kepada penguatkuasa',
        ringkas: 'Pengambilan Bumi Suria Ventures, Maju Warisanmas & PT Persada Kencana Prima bermasalah.',
        src: src('3.14.4(10)', 188)
      },
      {
        id: 'thprops', nama: 'TH Properties Sdn. Bhd.', kategori: 'hartanah', negara: 'Malaysia',
        pelaburan: '26 subsidiari + 5 usaha sama (pembinaan, pembangunan)',
        kerugian: 'Bonus istimewa RM2.2j dibayar tanpa kelulusan LTH (2017 & 2018)',
        status: 'Keputusan dapat semula bonus (12 Ogos 2020); audit dalaman; firma guaman MD Tajuddin & Co',
        tindakan: 'Siasatan dalaman; usaha mendapatkan semula bonus',
        ringkas: 'Kelulusan Exco melebihi kuasa; melanggar Akta Syarikat 2016.',
        src: src('3.14.4(11)', 189)
      },
      {
        id: 'thmarine', nama: 'Alam Maritim Resources / TH Marine', kategori: 'marin', negara: 'Malaysia',
        pelaburan: 'RM334j (ekuiti RM198j + pembiayaan RM136j); 6+2 kapal AHTS (USD20.27j)',
        kerugian: 'Ekuiti RM198j dirosot penuh; RM80j daripada RM136j pembiayaan dirosot; jangka pulih hanya RM70.4j',
        status: 'PwC dilantik untuk penilaian kebolehpulihan',
        tindakan: '—',
        ringkas: 'Pasaran kapal sokongan luar pesisir merosot.',
        src: src('3.14.4(12)', 190)
      },
      {
        id: 'thhr', nama: 'TH Hotel & Residences Sdn. Bhd. (THHR)', kategori: 'hotel', negara: 'Malaysia',
        pelaburan: '5 hotel/kompleks haji dipindah ke UJSB — nilai RM804.1j (premium ±55%)',
        kerugian: 'Sewaan 2020 jatuh 62% (RM16.5j → RM6.2j); rugi bersih RM5.9j',
        status: 'Movenpick Sepang & Kompleks Kelana Jaya kekal dengan LTH; pembangunan semula THKJ',
        tindakan: 'Pemindahan aset ke UJSB (28 Dis 2018)',
        ringkas: 'Aset hotel pulangan <2%; kesan Covid-19 pada sewaan.',
        src: src('3.14.4(13)', 191)
      },
      {
        id: 'fgv', nama: 'FGV Berhad', kategori: 'ekuiti', negara: 'Malaysia',
        pelaburan: 'RM1,253,742,809 — 7.5% pegangan (IPO 2012, purata RM4.58/unit)',
        kerugian: 'Kerugian tidak nyata RM1,058,937,380 (harga jatuh ke RM0.885)',
        status: '283,710,100 unit diambil alih UJSB pada kos RM4.62/unit (RM1.31b); harga pasaran ±RM0.69 (Feb 2022); elak kerugian ±RM1.1b',
        tindakan: 'Pemindahan ke UJSB',
        ringkas: 'Soalan Suruhanjaya: kenapa saham tidak dijual lebih awal.',
        src: src('3.14.4(14)', 192)
      }
    ],

    /* ---------- 10. TADBIR URUS ---------- */
    tadbirUrus: {
      pengerusi: [
        { nama: 'Datuk Seri Panglima Abdul Azeez bin Abdul Rahim', mula: '1 Jul 2013', tamat: '23 Mei 2018', nota: 'Ahli Parlimen Baling (UMNO) — ahli politik aktif', src: src('2.2.15', 59) },
        { nama: 'Tan Sri Md Nor bin Md Yusof', mula: '10 Jul 2018', tamat: '15 Okt 2021', nota: 'Diberhentikan awal — kontrak disambung 2 tahun dari 20 Jul 2020', src: src('3.2.27', 82) },
        { nama: 'Tan Sri Azman bin Mokhtar', mula: '20 Dis 2021', tamat: 'kini', nota: '', src: src('2.2.15', 59) }
      ],
      ceo: [
        { nama: 'Tan Sri Ismee bin Ismail', mula: '1 Jan 2006', tamat: '30 Jun 2016', nota: '', src: src('2.2.24', 65) },
        { nama: 'Datuk Seri Johan bin Abdullah', mula: '1 Jul 2016', tamat: '30 Jun 2018', nota: 'Pegang 18 jawatan anak syarikat serentak', src: src('3.4.1(b)', 86) },
        { nama: 'Dato’ Sri Zukri bin Samat', mula: '10 Jul 2018', tamat: '31 Ogos 2019', nota: 'Lepas jawatan anak syarikat untuk elak konflik kepentingan', src: src('3.4.1(c)', 87) },
        { nama: 'Datuk Nik Mohd Hasyudeen bin Yusoff', mula: '1 Sep 2019', tamat: '5 Mei 2021', nota: 'Diberhentikan awal (kontrak asal hingga 31 Ogos 2021)', src: src('3.2.27', 82) },
        { nama: 'Datuk Sri Amrin bin Awaluddin', mula: '6 Mei 2021', tamat: 'kini', nota: '', src: src('2.2.24', 65) }
      ],
      menteri: [
        { nama: 'YB Jamil Khir bin Haji Baharom', mula: '10 Feb 2009', tamat: '9 Mei 2018', nota: '', src: src('2.2.6', 56) },
        { nama: 'Tun Dr. Mahathir (Perdana Menteri — pegang portfolio)', mula: '10 Mei 2018', tamat: '1 Jul 2018', nota: '', src: src('2.2.7', 56) },
        { nama: 'YB Dr. Mujahid bin Yusof Rawa', mula: '2 Jul 2018', tamat: '9 Mac 2020', nota: '', src: src('2.2.6', 56) },
        { nama: 'YB Dr. Zulkifli bin Mohamad al-Bakri', mula: '10 Mac 2020', tamat: '29 Ogos 2021', nota: '', src: src('2.2.6', 56) },
        { nama: 'YB Idris bin Ahmad', mula: '30 Ogos 2021', tamat: 'kini', nota: '', src: src('2.2.6', 56) }
      ],
      /* Penglibatan pemimpin LTH dalam anak syarikat (bilangan jawatan) */
      penglibatan: [
        { nama: 'Datuk Rozaida Omar (CFO 2004–2021)', bil: 23, butiran: 'Proksi LTH di anak syarikat: Takaful, Pelikan, BIMB, Premia Cards, THHR, THV, 151 BPR 1&2, LTH Property Inv (L), Leatherhead, THHE, PPB, Millstream, LTH PH 1–4, LTH Residence, 10 Queen Street, Wilton, Marston, Luton, LTH Oxford', src: src('3.4.1(f)', 89) },
        { nama: 'Datuk Seri Johan Abdullah (CEO 2016–18)', bil: 18, butiran: 'THHE (Pengerusi), Trurich (Pengerusi), DSSB (Pengerusi), TH Properties, THHR, TH Plantations, Malakoff, LTH PH 1–5, ERL, YTL THP JV, Glomac, Yayasan TH, Premia Cards, PT TH Felda Nusantara', src: src('3.4.1(b)', 86) },
        { nama: 'Dato’ Noordin Sulaiman (Lembaga 2018–kini)', bil: 9, butiran: 'THHR (Pengerusi), TH Travel (Pengerusi), THV (Pengerusi), Premia Cards (Pengerusi), Theta Edge (Pengerusi), TH Hotel Sarawak, ERL, PPB, TH Alam', src: src('3.3.2(d)', 85) },
        { nama: 'Datuk Seri Abdul Azeez (Pengerusi 2013–18)', bil: 8, butiran: 'TH Real Estate LLC (Pengerusi), THHR (Pengerusi), PPB (Pengerusi), The Edge, Yayasan TH, LTH PH 3–5', src: src('3.3.2(a)', 84) },
        { nama: 'Datuk Zaiton Hassan (Lembaga 2018–20)', bil: 7, butiran: 'TH Properties (Pengerusi), THP Enstek, LTH PH 1–5', src: src('3.3.2(c)', 84) },
        { nama: 'Tan Sri Ismee Ismail (CEO 2006–16)', bil: 7, butiran: 'TH Plantations, Trurich, BIMB, Bank Islam, Takaful, LTH PH, TH Travel — kekal 3 jawatan sehingga Mei 2018 selepas tamat kontrak', src: src('3.4.1(a)', 85) },
        { nama: 'Dato’ Sri Zukri Samat (CEO 2018–19)', bil: 4, butiran: 'TH Plantations (Pengerusi), TH Estates (Pengerusi), TH Properties (Pengerusi), Yayasan TH — dilepaskan untuk elak konflik', src: src('3.4.1(c)', 87) },
        { nama: 'Datuk Nik Mohd Hasyudeen (CEO 2019–21)', bil: 4, butiran: 'Bank Islam, BIMB, TH Plantations, TH Properties', src: src('3.4.1(d)', 88) },
        { nama: 'Tan Sri Badruddin Amiruldin (Lembaga 2005–18)', bil: 3, butiran: 'TH Travel, THHR, TH Global Services', src: src('3.3.2(b)', 84) },
        { nama: 'Encik Abd Kadir Sahlan (CIO 2010–18)', bil: 3, butiran: 'TH Properties Group, Perladangan Sabah Sarawak, BIMB Securities', src: src('3.4.1(g)', 90) },
        { nama: 'Datuk Sri Amrin Awaluddin (CEO 2021–kini)', bil: 3, butiran: 'TH Plantations, TH Properties, Bank Islam', src: src('3.4.1(e)', 88) }
      ],
      ahliPolitik: [
        { nama: 'Abdul Azeez bin Abdul Rahim', jawatan: 'Ahli Parlimen Baling & Ahli Majlis Tertinggi UMNO', tempoh: 'Lembaga 2011, Pengerusi 2013–2018', src: src('3.2.13(a)', 77) },
        { nama: 'Tan Sri Badruddin bin Amiruldin', jawatan: 'Bekas MP Yan/Jerai (2004–08) & Pengerusi Tetap Perhimpunan Agong UMNO', tempoh: 'Lembaga 2005–2018', src: src('3.2.13(b)', 77) },
        { nama: 'Datuk Rosni binti Sohar', jawatan: 'ADUN Hulu Bernam & Setiausaha Wanita UMNO (2013–kini)', tempoh: 'Lembaga 2014–2018', src: src('3.2.13(c)', 77) }
      ],
      jawatankuasa2018: {
        dibubarkan: ['Panel Pelaburan (Mei 2018) — diganti Exco Perniagaan yang "tidak pernah berfungsi"', 'Majlis Penasihat Haji (2018) — diganti Jawatankuasa Urusan Haji'],
        saranan: 'Panel Pelaburan, JPS & Jawatankuasa Urusan Haji dicadang dikanunkan dalam Akta 535.',
        src: src('3.5.7–3.5.10', 92)
      },
      dasarBaharu: { nota: 'Dasar baharu LTH: had 5 jawatan anak syarikat bagi setiap pemimpin.', src: src('3.4.3', 90) }
    },

    /* ---------- 11. KOS HAJI & HAFIS ---------- */
    hafis: [
      { y: 2014, kos: 16155, bayaran: 9980, hafis: 6175, pct: 38, jumlah: 106, src: src('3.16.3', 204) },
      { y: 2015, kos: 17270, bayaran: 9980, hafis: 7290, pct: 42, jumlah: 135, src: src('3.16.3', 204) },
      { y: 2016, kos: 18890, bayaran: 9980, hafis: 8910, pct: 47, jumlah: 160, src: src('3.16.3', 204) },
      { y: 2017, kos: 19550, bayaran: 9980, hafis: 9570, pct: 49, jumlah: 298, src: src('3.16.3', 204) },
      { y: 2018, kos: 22450, bayaran: 9980, hafis: 12470, pct: 56, jumlah: 314, src: src('3.16.3', 204) },
      { y: 2019, kos: 22900, bayaran: 9980, hafis: 12920, pct: 56, jumlah: 299, src: src('3.16.3', 204) }
    ],
    kosUnjuran: [
      { y: 2022, kos: 25540 }, { y: 2023, kos: 26280 }, { y: 2024, kos: 28160 }, { y: 2025, kos: 29570 },
      { y: 2026, kos: 31040 }, { y: 2027, kos: 32592 }, { y: 2028, kos: 34221 }, { y: 2029, kos: 35932 }, { y: 2030, kos: 37729 }
    ],
    hafisUnjuran: [
      { y: 2022, kos: 25540, bayaran: 12980, hafis: 12560, pct: 49.2, jumlah: 376800, src: src('3.16.8', 205) },
      { y: 2023, kos: 26280, bayaran: 12980, hafis: 13300, pct: 50.6, jumlah: 399000, src: src('3.16.8', 205) },
      { y: 2024, kos: 28160, bayaran: 12980, hafis: 15180, pct: 53.9, jumlah: 455400, src: src('3.16.8', 205) },
      { y: 2025, kos: 29570, bayaran: 12980, hafis: 16590, pct: 56.1, jumlah: 497700, src: src('3.16.8', 205) },
      { y: 2026, kos: 31040, bayaran: 12980, hafis: 18060, pct: 58.2, jumlah: 541800, src: src('3.16.8', 205) },
      { y: 2027, kos: 32592, bayaran: 12980, hafis: 19612, pct: 60.2, jumlah: 588360, src: src('3.16.8', 205) },
      { y: 2028, kos: 34221, bayaran: 12980, hafis: 21241, pct: 62.1, jumlah: 637230, src: src('3.16.8', 205) },
      { y: 2029, kos: 35932, bayaran: 12980, hafis: 22952, pct: 63.9, jumlah: 688560, src: src('3.16.8', 205) },
      { y: 2030, kos: 37729, bayaran: 12980, hafis: 24749, pct: 65.6, jumlah: 742470, src: src('3.16.8', 205) }
    ],
    haji: {
      bayaranDibekukan: 'RM9,980 — tiada kenaikan 2009 hingga 2021 (13 tahun)',
      bayaran2022: [ { kumpulan: 'B40', bayaran: 10980 }, { kumpulan: 'Bukan B40', bayaran: 12980 } ],
      daftarMinimum: 1300,
      tungguKini: '130–135 tahun',
      tungguCadangan: '33 tahun',
      kos2030: 37729, kos2050: 50000,
      kuotaKini: '±30,000 jemaah', kuota2030: '60,000 jemaah',
      src: src('3.16.5–3.16.20', 206)
    },

    /* ---------- 12. PENGUATKUASAAN & TATATERTIB ---------- */
    penguatkuasaan: {
      laporanPolis: [
        { tarikh: '30 Nov 2018', rujukan: 'Dang Wangi/31347/2018', kes: 'Aktiviti & penggunaan wang Yayasan Tabung Haji (RM22.12j sumbangan tanpa kelulusan awal)', status: 'Kertas siasatan dirujuk ke Jabatan Peguam Negara', src: src('3.15.2', 194) },
        { tarikh: '30 Nov 2018', rujukan: 'Dang Wangi/31331/2018', kes: 'Penjualan 95% saham THIP (USD910j) kepada PT Borneo Pacific — salah nyataan & penyembunyian maklumat', status: 'Siasatan berterusan (rentas sempadan, Indonesia)', src: src('3.15.3', 194) },
        { tarikh: '13 Dis 2018', rujukan: 'Dang Wangi/32724/2018', kes: 'Manipulasi laporan kesesuaian tanah Trurich (40,880 ha, ±USD58j)', status: 'Siasatan berterusan (rentas sempadan, Indonesia)', src: src('3.15.5', 195) },
        { tarikh: '16 Jan 2019', rujukan: 'Dang Wangi/1484/2019', kes: 'Salah nyataan hibah 2017 — melanggar seksyen 22 Akta 535', status: 'Kertas siasatan dirujuk ke Jabatan Peguam Negara', src: src('3.15.8', 196) }
      ],
      sprm: [
        'Dakwaan rasuah pembelian Ladang Weida oleh TH Plantations',
        'Penyelewengan & salah guna kuasa — penyewaan Restoran Opah, KL Sentral',
        'Penyelewengan & salah guna kuasa — Restoran Nasi Dalca, ibu pejabat LTH',
        'Penyelewengan & rasuah oleh mantan Ketua Pegawai Operasi (pengubahsuaian)',
        'Pemalsuan dokumen pembekalan rubber seedlings, Ladang TH-Usia Jatimas, Sandakan',
        'Salah laku pegawai THP Bina & THP Timur (anak TH Properties)'
      ],
      tatatertib: {
        pegawai: [
          'Datuk Rozaida Omar (Ketua Pegawai Kewangan Kumpulan, Gred K)',
          'Dato’ Adi Azuan Abdul Ghani (Ketua Pegawai Operasi, Gred K)',
          'Rifina Md Ariff (Pengurus Besar Kanan Perkhidmatan Korporat & Hartanah, Gred K)',
          'Mohd Hisham Harun (Ketua Pegawai Sumber Manusia, Gred K)',
          'Hazlina Mohd Khalid (Penasihat Undang-Undang, Gred J)'
        ],
        kluster: [
          { nama: 'Kluster 1', isu: 'Penjualan saham PT TH Indo Plantations', keputusan: 'Buang kerja → rayuan: turun pangkat', tempoh: '±15 bulan' },
          { nama: 'Kluster 2', isu: 'Sumbangan RM22.12j tanpa kelulusan awal (Yayasan TH)', keputusan: 'Turun pangkat → rayuan: amaran keras / amaran + tangguh gaji', tempoh: 'sehingga 19 bulan' },
          { nama: 'Kluster 3', isu: 'Pengisytiharan hibah 2017', keputusan: 'Buang kerja → rayuan: turun pangkat', tempoh: '15 bulan' },
          { nama: 'Kluster 4', isu: 'Tuntutan dengan butiran palsu', keputusan: 'Turun pangkat (dikekalkan)', tempoh: '10 bulan' }
        ],
        hasil: 'Semua 5 pegawai masih kekal bertugas di LTH/anak syarikat (dalam jawatan lebih rendah).',
        src: src('3.15.12–3.15.18', 197)
      },
      mahkamah: [
        { kes: 'Emrail', bentuk: 'Timbang tara (AIAC) — didaftar 22 Apr 2022', status: 'Berjalan' },
        { kes: 'Al-Rawda (Arab Saudi)', bentuk: 'Penguatkuasaan PN + likuidasi aset + timbang tara', status: 'Berjalan (likuidasi ±2 tahun)' },
        { kes: 'Wellspring Worldwide', bentuk: 'Perintah mahkamah RM20.8j (2018) + notis kebankrapan', status: 'Notis kebankrapan dibenarkan 25 Jan 2022' },
        { kes: 'THIP', bentuk: 'Laporan polis / siasatan rentas sempadan', status: 'Berjalan' }
      ]
    },

    /* ---------- 13. KRONOLOGI ---------- */
    timeline: [
      { t: '1951', e: 'Ordinan Haji 1951 — pengurusan haji mula dikawal; Pejabat Urusan Haji Pulau Pinang ditubuhkan.', src: src('2.1.1', 53) },
      { t: '1962', e: 'PWSBH ditubuhkan — tabung simpanan bakal haji pertama.', src: src('2.1.2', 53) },
      { t: '1969', e: 'LUTH ditubuhkan (Akta 8) — gabungan PWSBH dengan urusan haji.', src: src('2.1.3', 54) },
      { t: '1995', e: 'LTH ditubuhkan melalui Akta Tabung Haji 1995 (Akta 535).', src: src('2.1.4', 54) },
      { t: '2001', e: 'HAFIS (subsidi haji) mula diperkenalkan — sebelum ini jemaah bayar kos sebenar.', src: src('Ringkasan Eksekutif, para 22', 23) },
      { t: '2009', e: 'Bayaran haji dibekukan pada RM9,980 — kekal 13 tahun (2009–2021) walaupun kos naik.', src: src('3.16.5', 206) },
      { t: '2013', e: 'Abdul Azeez dilantik Pengerusi LTH (bekas/ahli politik aktif).', src: src('2.2.15', 59) },
      { t: '21 Ogos 2014', e: 'BNM surat pertama kepada Pengerusi LTH — pengambilan deposit & kecairan.', src: src('3.6.2', 100) },
      { t: '19 Dis 2014', e: 'BNM surat kedua — deposit & pengurusan kecairan. Hibah 6.25% + 2% (RM3.24b) dibayar walaupun aset selepas agihan kurang daripada liabiliti.', src: src('3.9.2', 112) },
      { t: '23 Dis 2015', e: 'BNM surat kepada Menteri — keperluan merumus dasar rizab.', src: src('3.6.2', 100) },
      { t: '2016', e: 'Akad deposit ditukar Mudharabah → Wadi’ah Yad Dhamanah (tiada kajian menyeluruh).', src: src('3.7.16', 107) },
      { t: '30 Jun 2016', e: 'EY keluarkan rangka kerja RAV (laporan akhir) — asas "nilai aset terlaras" LTH.', src: src('3.11.5', 127) },
      { t: '2017', e: 'Polisi rosot nilai diubah 2 kali (70% → 85% → 90%) dalam satu hari; hanya RM1j rosot nilai direkod.', src: src('3.13.8–3.13.9', 147) },
      { t: '3 Mac 2017', e: 'Laporan Roland Berger siap — amaran model perniagaan berisiko; tidak dibentang kepada Lembaga.', src: src('3.17.13', 214) },
      { t: '23 Mei 2018', e: 'EY keluarkan Proforma RAV 2017 — sebelum penyata beraudit JAN dimuktamadkan (16 Jul 2018).', src: src('3.9.19', 118) },
      { t: 'Mei 2018', e: 'Panel Pelaburan dibubarkan; diganti Exco Perniagaan yang "tidak pernah berfungsi".', src: src('3.5.7', 92) },
      { t: '16 Jul 2018', e: 'KAN: Sijil Audit Bersih + "Emphasis of Matter" — polisi rosot nilai diubah 2 kali; RM227.81j tidak direkod.', src: src('3.13.5', 146) },
      { t: '2018', e: 'Hibah 2018 hanya 1.25% — selepas penstrukturan; hibah haji 0%.', src: src('3.9.28', 122) },
      { t: '7 Dis 2018', e: 'Jemaah Menteri lulus Pelan Pemulihan & Penstrukturan LTH (kurang 2 minggu untuk siap sebelum akhir 2018).', src: src('3.13.22', 156) },
      { t: '14 Dis 2018', e: 'UJSB ditubuhkan (SPV milik Menteri Kewangan Diperbadankan).', src: src('3.13.2', 145) },
      { t: '27 Dis 2018', e: 'Perjanjian pemindahan aset: 106 saham tersenarai, 1 syarikat perladangan, 29 hartanah.', src: src('3.13.23', 156) },
      { t: '2019', e: 'Hibah 1.25% diumumkan untuk 2018 → deposit susut RM73b → RM69b (risiko bank run). LTH di bawah pemantauan BNM secara pentadbiran (1 Jan 2019).', src: src('3.9.29', 122) },
      { t: '15 Mei 2019', e: 'Perjanjian Sukuk (RM27.56b) & Hak Penolakan Pertama (ROFR) dimeterai.', src: src('3.13.23', 156) },
      { t: '5 Apr 2019', e: 'Jemaah Menteri lulus komitmen RM17.8b (RM500j RMK-11; ±RM1.73b/tahun RMK-12/13).', src: src('3.13.46', 165) },
      { t: 'Dis 2019', e: 'Akad deposit tukar kepada Wakalah (kajian menyeluruh); RM100j bayaran tunai pertama UJSB.', src: src('3.7.22', 109) },
      { t: '2020', e: 'RM500j geran (RM300j saham tak patuh syariah, RM200j tebus awal 30 Nov 2020); deposit pulih ±RM76b. RM1.5b peruntukan 2021 tidak diterima.', src: src('3.13.47–3.13.48', 166) },
      { t: '2021', e: 'Hasyudeen diberhentikan (5 Mei); Md Nor diberhentikan (15 Okt); Azman Mokhtar jadi Pengerusi (20 Dis).', src: src('3.2.27', 82) },
      { t: '2022', e: 'Deposit mencecah RM88b (8.6j pendeposit). Laporan RCI dikemukakan pada 30 Ogos 2022.', src: src('4.2', 229) }
    ],

    /* ---------- 14. PENEMUAN UTAMA (peta cerita) ---------- */
    cerita: {
      faktor: [
        { id: 'hibah', nama: 'Hibah terlalu tinggi', teras: 'Agihan keuntungan (hibah) melebihi kemampuan — rizab susut, LTH terpaksa ambil risiko lebih tinggi.', s: 'Ringkasan Eksekutif, para 22(i)', p: 19 },
        { id: 'akaun', nama: 'Perakaunan "kreatif"', teras: 'RAV digunakan (bukan penyata diaudit) + polisi rosot nilai dilonggarkan untuk kekalkan hibah tinggi.', s: 'Ringkasan Eksekutif, para 22(ii)', p: 20 },
        { id: 'audit', nama: 'JAN tidak tegas', teras: 'Sijil Audit Bersih 2014–2017 walaupun aset < liabiliti; "Emphasis of Matter" 2017.', s: 'Ringkasan Eksekutif, para 22(iii)', p: 21 },
        { id: 'visi', nama: 'Visi "tonggak ekonomi ummah"', teras: 'LTH melabur besar dalam hartanah & perladangan tanpa kepakaran — kerugian besar dalam anak syarikat.', s: 'Ringkasan Eksekutif, para 22(iv)', p: 22 },
        { id: 'hafis', nama: 'Subsidi haji (HAFIS)', teras: 'Kos haji naik tapi bayaran dibekukan — subsidi naik RM106j (2014) → ±RM300j (2019), mencecah RM742j (2030).', s: 'Ringkasan Eksekutif, para 22(v)', p: 23 }
      ],
      jadualUJSB: {
        nama: 'UJSB (Urusharta Jamaah Sdn. Bhd.)',
        teras: 'Aset RM19.9b dipindah (nilai pasaran RM9.7b) sebagai pertukaran Sukuk RM27.5b + tunai RM300j.',
        s: 'Ringkasan Eksekutif, para 27', p: 25
      }
    },

    /* ---------- 15. GLOSARI (bahasa mudah) ---------- */
    glosari: [
      { istilah: 'Hibah', maksud: 'Agihan keuntungan tahunan kepada pendeposit — seperti dividen, tapi patuh syariah.' },
      { istilah: 'Hibah haji', maksud: 'Agihan tambahan khusus kepada bakal jemaah haji.' },
      { istilah: 'Rosot nilai (impairment)', maksud: 'Pengiktirafan rasmi bahawa aset telah jatuh nilai — aset ditulis pada nilai yang lebih rendah.' },
      { istilah: 'RAV (Realisable Asset Value)', maksud: '"Nilai aset yang boleh direalisasi" — nilai anggaran pengurusan LTH, bukan nilai penyata kewangan diaudit.' },
      { istilah: 'Defisit aset-liabiliti', maksud: 'Keadaan di mana liabiliti (termasuk deposit) lebih besar daripada aset — wang pendeposit terancam.' },
      { istilah: 'Sukuk', maksud: 'Sijil pelaburan Islam (setara bon). Pemegang dapat pulangan daripada aset/syarikat asas.' },
      { istilah: 'Sukuk berkupon sifar', maksud: 'Sukuk yang tidak bayar faedah/kupon berkala — pulangan sekali gus ketika matang.' },
      { istilah: 'SPV (Syarikat Bertujuan Khas)', maksud: 'Syarikat khas ditubuhkan untuk satu tujuan, misalnya menerima dan memulihkan aset bermasalah.' },
      { istilah: 'UJSB (Urusharta Jamaah)', maksud: 'SPV milik Kerajaan yang menerima aset bermasalah LTH untuk dipulihkan/dilupuskan.' },
      { istilah: 'HAFIS (Bantuan Kewangan Haji)', maksud: 'Subsidi kerajaan/LTH untuk menampung sebahagian kos haji jemaah.' },
      { istilah: 'Bank run', maksud: 'Pengeluaran deposit secara besar-besaran serentak — boleh menyebabkan institusi kehabisan tunai.' },
      { istilah: 'Put option', maksud: 'Hak menjual balik saham pada harga yang dipersetujui kepada penjual asal (jika janji tidak ditepati).' },
      { istilah: 'Akad', maksud: 'Kontrak/perjanjian dalam urus niaga Islam (cth. Mudharabah, Wadi’ah, Wakalah).' },
      { istilah: 'Emphasis of Matter', maksud: 'Nota dalam laporan audit yang menarik perhatian kepada isu penting — tanpa mengubah pendapat audit.' },
      { istilah: 'Sijil Audit Bersih', maksud: 'Pengisytiharan auditor bahawa penyata kewangan memberi gambaran benar dan saksama.' },
      { istilah: 'ROFR (Hak Penolakan Pertama)', maksud: 'Hak LTH untuk membeli semula aset yang dipindahkan dahulu sebelum UJSB menjual kepada pihak lain.' },
      { istilah: 'Yield to maturity', maksud: 'Jumlah pulangan tahunan jika sukuk dipegang sehingga matang.' },
      { istilah: 'Rizab', maksud: 'Simpanan keuntungan untuk menyerap kerugian atau menampung agihan pada masa hadapan.' },
      { istilah: 'Risiko tertumpu', maksud: 'Kebergantungan kepada segelintir pendeposit besar — jika mereka keluar serentak, institusi terancam.' },
      { istilah: 'Defisit fiskal', maksud: 'Keadaan perbelanjaan kerajaan melebihi pendapatan.' },
      { istilah: 'JAN', maksud: 'Jabatan Audit Negara — badan yang mengaudit badan berkanun seperti LTH.' },
      { istilah: 'KAN', maksud: 'Ketua Audit Negara.' },
      { istilah: 'BNM', maksud: 'Bank Negara Malaysia — bank pusat negara.' },
      { istilah: 'MFRS/FRS', maksud: 'Piawaian pelaporan kewangan Malaysia — peraturan cara angka kewangan dikira dan dilaporkan.' }
    ]
  };
})();
