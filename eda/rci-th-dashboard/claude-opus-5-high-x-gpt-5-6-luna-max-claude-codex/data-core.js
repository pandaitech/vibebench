/* =====================================================================
   PANGKALAN DATA TERAS — Laporan Suruhanjaya Siasatan Diraja Tabung Haji
   ---------------------------------------------------------------------
   Semua angka di sini disalin terus daripada teks/jadual laporan.
   Setiap rekod membawa `ms` = nombor muka surat PDF laporan.
   TIADA angka direka. Angka yang dikira oleh dashboard diasingkan
   sepenuhnya dan dilabel "terbitan" atau "simulasi" di lapisan aplikasi.
   ===================================================================== */

window.RCI = (function () {
  const SRC = 'https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md#pdf-page-';

  /* ---------------------------------------------------------------
     1. NERACA — Aset vs Liabiliti & Ujian Seksyen 22
     Sumber utama: analisa PwC, ms 146 (jadual 2013–2017)
     Disahsilang dengan jadual ms 111 (2014–2017). Kedua-duanya padan.
     Unit: RM juta
  --------------------------------------------------------------- */
  const neraca = [
    { tahun: 2013, aset: 48778, liabiliti: 43696, lebihanPra: 5082, agihan: 2632, lebihanPasca: 2450, ms: 146 },
    { tahun: 2014, aset: 54751, liabiliti: 51866, lebihanPra: 2885, agihan: 3237, lebihanPasca: -352, ms: 146 },
    { tahun: 2015, aset: 60196, liabiliti: 60062, lebihanPra: 134, agihan: 3220, lebihanPasca: -3086, ms: 146 },
    { tahun: 2016, aset: 64321, liabiliti: 65581, lebihanPra: -1260, agihan: 2871, lebihanPasca: -4131, ms: 146 },
    { tahun: 2017, aset: 70317, liabiliti: 71086, lebihanPra: -769, agihan: 3324, lebihanPasca: -4093, ms: 146 },
  ];

  /* ---------------------------------------------------------------
     2. KADAR AGIHAN KEUNTUNGAN (HIBAH) — % setahun
     Sumber: jadual ms 120. Unit: peratus
  --------------------------------------------------------------- */
  const kadarHibah = [
    { tahun: 2014, tahunan: 6.25, haji: 2.00, ms: 120 },
    { tahun: 2015, tahunan: 5.00, haji: 3.00, ms: 120 },
    { tahun: 2016, tahunan: 4.25, haji: 1.50, ms: 120 },
    { tahun: 2017, tahunan: 4.50, haji: 1.75, ms: 120 },
    { tahun: 2018, tahunan: 1.25, haji: 0, ms: 120 },
    { tahun: 2019, tahunan: 3.05, haji: 0, ms: 120 },
    { tahun: 2020, tahunan: 3.10, haji: 0, ms: 120 },
    { tahun: 2021, tahunan: 3.10, haji: 0, ms: 120 },
  ];

  /* ---------------------------------------------------------------
     3. JUMLAH AGIHAN DIBAYAR — RM'000
     Sumber: jadual ms 131 (seksyen 3.11.7)
  --------------------------------------------------------------- */
  const bayaranHibah = [
    { tahun: 2014, tahunan: 2988053, haji: 249143, jumlah: 3237196, ms: 131 },
    { tahun: 2015, tahunan: 2807369, haji: 413005, jumlah: 3220374, ms: 131 },
    { tahun: 2016, tahunan: 2645625, haji: 225197, jumlah: 2870822, ms: 131 },
    { tahun: 2017, tahunan: 3042184, haji: 281557, jumlah: 3323741, ms: 131 },
    { tahun: 2018, tahunan: 922959, haji: null, jumlah: 922959, ms: 131 },
    { tahun: 2019, tahunan: 2140538, haji: null, jumlah: 2140538, ms: 131 },
    { tahun: 2020, tahunan: 2242141, haji: null, jumlah: 2242141, ms: 131 },
  ];

  /* ---------------------------------------------------------------
     4. KEUNTUNGAN BERSIH vs PERUNTUKAN BONUS ANGGOTA
     Sumber: jadual ms 139. Unit: RM juta
  --------------------------------------------------------------- */
  const untungBersih = [
    { tahun: 2013, untung: 2634, bonus: 49, nisbah: 1.9, bulan: '2.5–10', ms: 139 },
    { tahun: 2014, untung: 2979, bonus: 74, nisbah: 2.5, bulan: '1–11 (Tahunan) + 2 (Bonus Khas)', ms: 139 },
    { tahun: 2015, untung: 3537, bonus: 61, nisbah: 1.7, bulan: '1–10', ms: 139 },
    { tahun: 2016, untung: 2481, bonus: 25, nisbah: 1.0, bulan: '1–3', ms: 139 },
    { tahun: 2017, untung: 2798, bonus: 57, nisbah: 2.0, bulan: '1–6', ms: 139 },
  ];

  /* ---------------------------------------------------------------
     5. BONUS KAKITANGAN 2010–2020
     Sumber: jadual ms 137. Unit: RM juta
  --------------------------------------------------------------- */
  const bonusKakitangan = [
    { tahun: 2010, rm: 25, lulusMOF: '2.5 (Tahunan) + 1 (Khas)', taburan: '2–6', maks: 6, ms: 137 },
    { tahun: 2011, rm: 35, lulusMOF: '3 (Tahunan) + 1 (Khas)', taburan: '2–6', maks: 6, ms: 137 },
    { tahun: 2012, rm: 38, lulusMOF: '3.5 (Tahunan) + 1 (Khas)', taburan: '2.5–8', maks: 8, ms: 137 },
    { tahun: 2013, rm: 49, lulusMOF: '2.5–10', taburan: '2.5–10', maks: 10, ms: 137 },
    { tahun: 2014, rm: 74, lulusMOF: '1–11 (Tahunan) + 2 (Khas)', taburan: '1–11 (Tahunan) + 2 (Khas)', maks: 13, ms: 137 },
    { tahun: 2015, rm: 65, lulusMOF: '1–10', taburan: '1–10', maks: 10, ms: 137 },
    { tahun: 2016, rm: 25, lulusMOF: '1–3', taburan: '1–3', maks: 3, ms: 137 },
    { tahun: 2017, rm: 56.7, lulusMOF: '1–6', taburan: '1–6', maks: 6, ms: 137 },
    { tahun: 2018, rm: 10.8, lulusMOF: '1', taburan: '1', maks: 1, ms: 137 },
    { tahun: 2019, rm: 11.6, lulusMOF: '1', taburan: '1', maks: 1, ms: 137 },
    { tahun: 2020, rm: 14.1, lulusMOF: '1', taburan: '1', maks: 1, ms: 137 },
  ];

  /* Taburan bonus mengikut gred prestasi (bulan gaji) — ms 138 */
  const gredPrestasi = [
    { gred: 'A', peratusKakitangan: 5, y2014: '9–11', y2015: '8–10', ms: 138 },
    { gred: 'B', peratusKakitangan: 15, y2014: '7–8', y2015: '6–7', ms: 138 },
    { gred: 'C', peratusKakitangan: 60, y2014: '5–6', y2015: '4–5', ms: 138 },
    { gred: 'D', peratusKakitangan: 15, y2014: '3–4', y2015: '2–3', ms: 138 },
    { gred: 'E', peratusKakitangan: 5, y2014: '1', y2015: '1', ms: 138 },
  ];

  /* ---------------------------------------------------------------
     6. BONUS BERNAMA — dua skim berasingan yang dipersoal Suruhanjaya
     Unit: RM (ringgit penuh)
  --------------------------------------------------------------- */
  const bonusTHProperties2017 = [
    { bil: 1, nama: 'Datuk Azizan bin Abdul Rahman', rm: 231000 },
    { bil: 2, nama: 'Dato’ Roszali bin Othman', rm: 189750 },
    { bil: 3, nama: 'Haji Abd Kadir bin Sahlan', rm: 189750 },
    { bil: 4, nama: 'Nik Badrul Hisham bin Nik Hassan', rm: 99000 },
    { bil: 8, nama: 'Anuarifaei bin Mustapa', rm: 99000 },
    { bil: 9, nama: 'Nur Adlan bin Taib', rm: 99000 },
    { bil: 10, nama: 'Zaidi bin Baharudin', rm: 56100 },
    { bil: 11, nama: 'Haji Mohamed Rahim bin Ismail', rm: 52800 },
    { bil: 12, nama: 'Aida binti Karim', rm: 49500 },
    { bil: 13, nama: 'Marhaizah binti Mohamed Yusuf', rm: 49500 },
    { bil: 14, nama: 'Dato’ Mohd Fazillah bin Mohd Ali', rm: 33000 },
  ];
  const bonusTHPAustralia2018 = [
    { bil: 1, nama: 'Dato’ Azizan bin Abd Rahman', rm: 167250 },
    { bil: 2, nama: 'Dato’ Roszali bin Othman', rm: 176500 },
    { bil: 3, nama: 'Haji Abd Kadir bin Sahlan', rm: 176500 },
    { bil: 4, nama: 'Nik Badrul Hisham bin Nik Hassan', rm: 101500 },
    { bil: 5, nama: 'Anuarifaei bin Mustapa', rm: 101500 },
    { bil: 6, nama: 'Nur Adlan bin Taib', rm: 101500 },
    { bil: 7, nama: 'Zaidi bin Baharudin', rm: 63000 },
    { bil: 8, nama: 'Aida binti Karim', rm: 63000 },
    { bil: 9, nama: 'Marhaizah binti Mohamed Yusuf', rm: 63000 },
    { bil: 10, nama: 'Haji Mohamed Rahim bin Ismail', rm: 31250 },
  ];

  /* Kunci padanan nama merentas dua jadual (ejaan gelaran berbeza dalam laporan) */
  const kunciNama = {
    'Datuk Azizan bin Abdul Rahman': 'azizan',
    'Dato’ Azizan bin Abd Rahman': 'azizan',
    'Dato’ Roszali bin Othman': 'roszali',
    'Haji Abd Kadir bin Sahlan': 'abdkadir',
    'Nik Badrul Hisham bin Nik Hassan': 'nikbadrul',
    'Anuarifaei bin Mustapa': 'anuarifaei',
    'Nur Adlan bin Taib': 'nuradlan',
    'Zaidi bin Baharudin': 'zaidi',
    'Haji Mohamed Rahim bin Ismail': 'mohamedrahim',
    'Aida binti Karim': 'aida',
    'Marhaizah binti Mohamed Yusuf': 'marhaizah',
    'Dato’ Mohd Fazillah bin Mohd Ali': 'fazillah',
  };

  /* ---------------------------------------------------------------
     7. PERAKAUNAN 2017
  --------------------------------------------------------------- */

  /* 7a. Jambatan RAV — bagaimana nilai aset "dinaikkan" untuk lulus ujian
     seksyen 22 pada 2017. Sumber: jadual ms 119. Unit: RM juta */
  const jambatanRAV = [
    { label: 'Jumlah aset (penyata kewangan)', nilai: 70317, jenis: 'mula', ms: 119 },
    { label: 'Tambah: Nilai Aset Boleh Direalisasi (RAV) — anak syarikat, syarikat bersekutu, usaha sama, hartanah & aset dipegang sehingga matang', nilai: 4466, jenis: 'naik', ms: 119 },
    { label: 'Jumlah aset berdasarkan RAV', nilai: 74783, jenis: 'subjumlah', ms: 119 },
    { label: 'Tolak: Jumlah liabiliti termasuk deposit pendeposit', nilai: -74410, jenis: 'turun', ms: 119 },
    { label: 'Nilai bersih aset terlaras untuk diagihkan', nilai: 373, jenis: 'akhir', ms: 119 },
  ];

  /* 7b. Kesan rosot nilai ke atas keuntungan 2017 (analisa PwC). ms 154. RM juta */
  const jambatanUntung2017 = [
    { label: 'Keuntungan tahun 2017 (seperti direkod)', nilai: 3412, jenis: 'mula', ms: 154 },
    { label: 'Tolak: Rosot nilai pelaburan ekuiti AFS', nilai: -4258, jenis: 'turun', ms: 154 },
    { label: 'Tolak: Rosot nilai instrumen sekuriti hutang AFS', nilai: -7, jenis: 'turun', ms: 154 },
    { label: 'Tolak: Pelarasan lain', nilai: -580, jenis: 'turun', ms: 154 },
    { label: 'Kerugian terlaras 2017', nilai: -1433, jenis: 'akhir', ms: 154 },
  ];

  /* 7c. Perolehan tertahan terlaras pada 31.12.2017. ms 154. RM juta */
  const perolehanTertahan2017 = [
    { label: 'Perolehan tertahan pada 31.12.2017', nilai: 162, jenis: 'mula', ms: 154 },
    { label: 'Tolak: Pelarasan', nilai: -4845, jenis: 'turun', ms: 154 },
    { label: 'Kerugian terkumpul terlaras', nilai: -4683, jenis: 'akhir', ms: 154 },
  ];

  /* 7d. Polisi rosot nilai — diubah dua kali dalam tahun 2017. ms 148. RM juta
     Setiap baris ialah satu takrif "ketara" (significant) & "berpanjangan"
     (prolonged). Semakin longgar takrif, semakin kecil rosot nilai diiktiraf. */
  const polisiRosotNilai = [
    { ketara: '>70% di bawah kos', tempoh: '>24 bulan', kesan: 1313, urutan: 1, ms: 148 },
    { ketara: '>85% di bawah kos', tempoh: 'Tiada', kesan: 171, urutan: 2, ms: 148 },
    { ketara: '>90% di bawah kos', tempoh: 'Tiada', kesan: 1, urutan: 3, ms: 148 },
  ];

  /* ---------------------------------------------------------------
     8. URUSHARTA JAMAAH SDN. BHD. (UJSB)
  --------------------------------------------------------------- */

  /* 8a. Nilai aset dipindahkan mengikut kelas. ms 159. RM juta */
  const pindahanAset = [
    { kelas: 'Hartanah dan tanah', nilaiBuku: 1411, nilaiPindahan: 2247, nilaiPasaran: 1411, ms: 159 },
    { kelas: 'Syarikat perladangan', nilaiBuku: 718, nilaiPindahan: 802, nilaiPasaran: 718, ms: 159 },
    { kelas: 'Ekuiti (tersenarai di Bursa Malaysia)', nilaiBuku: 16852, nilaiPindahan: 16851, nilaiPasaran: 7600, ms: 159 },
  ];
  const pindahanJumlah = { nilaiBuku: 18981, nilaiPindahan: 19900, nilaiPasaran: 9729, ms: 159 };

  /* 8b. Portfolio hartanah UJSB — nilai pemindahan vs nilai pasaran Dis 2021.
     ms 161. Unit: RM (ringgit penuh), keluasan kaki persegi */
  const hartanahUJSB = [
    { jenis: 'Tanah', kps: 1353361.48, pindahan: 627006479, pasaran: 401080000, ms: 161 },
    { jenis: 'Menara pejabat', kps: 354021, pindahan: 737399698, pasaran: 325000000, ms: 161 },
    { jenis: 'Lot kedai', kps: 120062, pindahan: 46301759, pasaran: 33330000, ms: 161 },
    { jenis: 'Hotel', kps: 354134, pindahan: 804058625, pasaran: 424270000, ms: 161 },
    { jenis: 'Perindustrian', kps: 35019, pindahan: 31914386, pasaran: 19000000, ms: 161 },
  ];
  const hartanahUJSBJumlah = { kps: 2216597.48, pindahan: 2246680947, pasaran: 1202680000, ms: 161 };

  /* 8c. Lima saham mewah (bluechip) yang dipindahkan. ms 162.
     hargaPindahan & hargaDis18 = RM seunit; jumlah = RM penuh.
     hargaJun22 daripada jadual berasingan ms 162 (harga pada 8 Jun 2022). */
  const bluechip = [
    { kaunter: 'Axiata', hargaPindahan: 6.00, hargaDis18: 3.63, jatuhPct: -39.5, jumlahPindahan: 1422605154, jumlahDis18: 931803255, jatuhRM: -490801899, hargaJun22: 3.04, ms: 162 },
    { kaunter: 'Maxis', hargaPindahan: 6.84, hargaDis18: 5.43, jatuhPct: -20.6, jumlahPindahan: 879395994, jumlahDis18: 681197584, jatuhRM: -198198410, hargaJun22: 3.52, ms: 162 },
    { kaunter: 'MISC', hargaPindahan: 7.43, hargaDis18: 6.15, jatuhPct: -17.2, jumlahPindahan: 486532216, jumlahDis18: 438925710, jatuhRM: -47606506, hargaJun22: 7.30, ms: 162 },
    { kaunter: 'Digi', hargaPindahan: 5.13, hargaDis18: 4.24, jatuhPct: -17.3, jumlahPindahan: 576240738, jumlahDis18: 500328955, jatuhRM: -75911783, hargaJun22: 3.27, ms: 162 },
    { kaunter: 'TM', hargaPindahan: 5.96, hargaDis18: 2.33, jatuhPct: -60.9, jumlahPindahan: 241202959, jumlahDis18: 107650200, jatuhRM: -133552759, hargaJun22: 5.20, ms: 162 },
  ];
  const bluechipJumlah = { jumlahPindahan: 3605977061, jumlahDis18: 2659905704, jatuhRM: -946071357, ms: 162 };

  /* 8d. Struktur Sukuk UJSB. ms 25 (Ringkasan Eksekutif, perenggan 27) */
  const sukuk = [
    { siri: 'Sukuk Siri 1', prinsipal: 10000, nominal: 13200, tempohTahun: 7, ytm: 4.05, ms: 25 },
    { siri: 'Sukuk Siri 2', prinsipal: 9600, nominal: 14300, tempohTahun: 10, ytm: 4.10, ms: 25 },
  ];
  const bayaranTunaiUJSB = [
    { tarikh: '2019-12-30', rm: 100, ms: 25 },
    { tarikh: '2020-12-30', rm: 200, ms: 25 },
  ];

  /* 8e. Komitmen Jaminan Kerajaan Persekutuan (JADUAL 5.3). ms 168. RM juta */
  const jaminanKerajaan = [
    { entiti: 'DanaInfra Nasional Berhad', y2020: 72320, y2021: 76020, pct2020: 38.9, pct2021: 39.9 },
    { entiti: 'Prasarana Malaysia Berhad', y2020: 38914, y2021: 38914, pct2020: 21.0, pct2021: 20.4 },
    { entiti: 'Malaysia Rail Link Sdn. Bhd.', y2020: 21530, y2021: 23177, pct2020: 11.6, pct2021: 12.2 },
    { entiti: 'Urusharta Jamaah Sdn. Bhd.', y2020: 20683, y2021: 21097, pct2020: 11.1, pct2021: 11.1, sorot: true },
    { entiti: 'Suria Strategic Energy Resources Sdn. Bhd.', y2020: 6951, y2021: 7276, pct2020: 3.7, pct2021: 3.8 },
    { entiti: 'GovCo Holdings Berhad', y2020: 7200, y2021: 5700, pct2020: 3.9, pct2021: 3.0 },
    { entiti: 'Jambatan Kedua Sdn. Bhd.', y2020: 5528, y2021: 5514, pct2020: 3.0, pct2021: 2.9 },
    { entiti: 'Turus Pesawat Sdn. Bhd.', y2020: 5310, y2021: 5310, pct2020: 2.9, pct2021: 2.8 },
    { entiti: 'MKD Kencana Sdn. Bhd.', y2020: 3500, y2021: 4500, pct2020: 1.9, pct2021: 2.4 },
    { entiti: 'SRC Kencana Sdn. Bhd.', y2020: 2485, y2021: 1785, pct2020: 1.4, pct2021: 0.9 },
    { entiti: 'Sentuhan Budiman Sdn. Bhd.', y2020: 800, y2021: 750, pct2020: 0.4, pct2021: 0.4 },
    { entiti: 'TRX City Sdn. Bhd.', y2020: 253, y2021: 192, pct2020: 0.1, pct2021: 0.1 },
    { entiti: 'Assets Global Network Sdn. Bhd.', y2020: 253, y2021: 202, pct2020: 0.1, pct2021: 0.1 },
  ];
  const jaminanJumlah = { y2020: 185727, y2021: 190437, ms: 168 };

  /* 8f. Tawaran Hak Penolakan Pertama (ROFR) kepada LTH. ms 176.
     harga = RM seunit. premium seperti dicetak dalam laporan. */
  const rofr = [
    { ticker: 'WENG MK', syarikat: 'WZ Satu', tarikh: '2020-03-24', unit: 25999115, hargaROFR: 0.090, hargaPasaran: 0.064, premium: 40.6, ms: 176 },
    { ticker: 'EAST MK', syarikat: 'Eastern & Oriental', tarikh: '2020-03-25', unit: 46400000, hargaROFR: 0.365, hargaPasaran: 0.335, premium: 9.0, ms: 176 },
    { ticker: 'WENG MK', syarikat: 'WZ Satu', tarikh: '2020-03-31', unit: 16570923, hargaROFR: 0.085, hargaPasaran: 0.075, premium: 13.3, ms: 176 },
    { ticker: 'WCTHG MK', syarikat: 'WCT Holdings', tarikh: '2020-04-02', unit: 42477625, hargaROFR: 0.400, hargaPasaran: 0.377, premium: 6.1, ms: 176 },
    { ticker: 'KSL MK', syarikat: 'KSL Holdings', tarikh: '2020-05-06', unit: 71800000, hargaROFR: 0.610, hargaPasaran: 0.630, premium: -3.2, ms: 176 },
    { ticker: 'KSL MK', syarikat: 'KSL Holdings', tarikh: '2020-05-21', unit: 35900000, hargaROFR: 0.580, hargaPasaran: 0.605, premium: -4.1, ms: 176 },
    { ticker: 'HAPL MK', syarikat: 'Hap Seng Plantations', tarikh: '2020-05-29', unit: 66074500, hargaROFR: 1.650, hargaPasaran: 1.570, premium: 5.1, ms: 176 },
    { ticker: 'FGV MK', syarikat: 'FGV Holdings', tarikh: '2020-12-09', unit: 283710100, hargaROFR: 1.300, hargaPasaran: 1.270, premium: 2.4, ms: 176 },
    { ticker: 'ILB MK', syarikat: 'Integrated Logistics', tarikh: '2022-03-14', unit: 20500000, hargaROFR: 0.380, hargaPasaran: 0.365, premium: 4.1, ms: 176 },
  ];

  /* ---------------------------------------------------------------
     9. SUBSIDI HAJI (HAFIS)
  --------------------------------------------------------------- */

  /* 9a. Sebenar 2014–2019. ms 199. RM seorang; jumlah dalam RM juta */
  const hafisSebenar = [
    { tahun: 2014, kos: 16155, bayaran: 9980, bayaranPct: 62, hafis: 6175, hafisPct: 38, jumlahJuta: 106, ms: 199 },
    { tahun: 2015, kos: 17270, bayaran: 9980, bayaranPct: 58, hafis: 7290, hafisPct: 42, jumlahJuta: 135, ms: 199 },
    { tahun: 2016, kos: 18890, bayaran: 9980, bayaranPct: 53, hafis: 8910, hafisPct: 47, jumlahJuta: 160, ms: 199 },
    { tahun: 2017, kos: 19550, bayaran: 9980, bayaranPct: 51, hafis: 9570, hafisPct: 49, jumlahJuta: 298, ms: 199 },
    { tahun: 2018, kos: 22450, bayaran: 9980, bayaranPct: 44, hafis: 12470, hafisPct: 56, jumlahJuta: 314, ms: 199 },
    { tahun: 2019, kos: 22900, bayaran: 9980, bayaranPct: 44, hafis: 12920, hafisPct: 56, jumlahJuta: 299, ms: 199 },
  ];

  /* 9b. Unjuran laporan 2022–2030. ms 200.
     NOTA UNIT: lajur "Jumlah" dalam laporan adalah RM'000 (contoh 742,470
     = RM742.47 juta, selaras dengan teks Ringkasan Eksekutif ms 24). */
  const hafisUnjuran = [
    { tahun: 2022, kos: 25540, bayaran: 12980, hafis: 12560, hafisPct: 49.2, jumlahRibu: 376800, ms: 200 },
    { tahun: 2023, kos: 26280, bayaran: 12980, hafis: 13300, hafisPct: 50.6, jumlahRibu: 399000, ms: 200 },
    { tahun: 2024, kos: 28160, bayaran: 12980, hafis: 15180, hafisPct: 53.9, jumlahRibu: 455400, ms: 200 },
    { tahun: 2025, kos: 29570, bayaran: 12980, hafis: 16590, hafisPct: 56.1, jumlahRibu: 497700, ms: 200 },
    { tahun: 2026, kos: 31040, bayaran: 12980, hafis: 18060, hafisPct: 58.2, jumlahRibu: 541800, ms: 200 },
    { tahun: 2027, kos: 32592, bayaran: 12980, hafis: 19612, hafisPct: 60.2, jumlahRibu: 588360, ms: 200 },
    { tahun: 2028, kos: 34221, bayaran: 12980, hafis: 21241, hafisPct: 62.1, jumlahRibu: 637230, ms: 200 },
    { tahun: 2029, kos: 35932, bayaran: 12980, hafis: 22952, hafisPct: 63.9, jumlahRibu: 688560, ms: 200 },
    { tahun: 2030, kos: 37729, bayaran: 12980, hafis: 24749, hafisPct: 65.6, jumlahRibu: 742470, ms: 200 },
  ];

  /* 9c. Titik rujukan kos haji lain yang disebut dalam teks */
  const kosHajiRujukan = [
    { tahun: 2013, kos: 15553, nota: 'Kos haji jemaah Muassasah', ms: 23 },
    { tahun: 2022, kos: 25540, nota: 'Kos haji jemaah Muassasah', ms: 23 },
    { tahun: 2050, kos: 50000, nota: 'Unjuran laporan: kos haji boleh meningkat kepada RM50,000', ms: 199, jenis: 'unjuran' },
  ];

  /* 9d. Kadar bayaran haji baharu 2022 (dua lapisan). ms 23 */
  const bayaranHaji2022 = [
    { kumpulan: 'Jemaah kumpulan B40', rm: 10980, ms: 23 },
    { kumpulan: 'Jemaah kumpulan bukan B40', rm: 12980, ms: 23 },
  ];

  /* ---------------------------------------------------------------
     10. 14 PELABURAN BERMASALAH YANG DISYORKAN AUDIT FORENSIK
     Sumber: Ringkasan Eksekutif perenggan 35(j), ms 30–31
  --------------------------------------------------------------- */
  const auditForensik = [
    { nama: 'PT TH Indo Plantations (THIP)', singkatan: 'THIP', kategori: 'Perladangan', lokasi: 'Indonesia', ms: 31 },
    { nama: 'Emrail Sdn. Bhd.', singkatan: 'Emrail', kategori: 'Pembinaan / Infrastruktur', lokasi: 'Malaysia', ms: 31 },
    { nama: 'Wellspring Worldwide Limited', singkatan: 'Wellspring', kategori: 'Pelaburan luar negara', lokasi: 'Luar negara', ms: 31 },
    { nama: 'Deru Semangat Sdn. Bhd. (DSSB)', singkatan: 'DSSB', kategori: 'Hartanah / Pelaburan', lokasi: 'Malaysia', ms: 31 },
    { nama: 'Trurich Resources Sdn. Bhd.', singkatan: 'Trurich', kategori: 'Perladangan', lokasi: 'Indonesia / Malaysia', ms: 31 },
    { nama: 'Abraj Sdn. Bhd.', singkatan: 'Abraj', kategori: 'Hartanah', lokasi: 'Arab Saudi', ms: 31 },
    { nama: 'Putrajaya Perdana Berhad', singkatan: 'PPB', kategori: 'Pembinaan / Hartanah', lokasi: 'Malaysia', ms: 31 },
    { nama: 'Al-Rawda Real Estates Development & Project Management Co. Ltd.', singkatan: 'Al-Rawda', kategori: 'Hartanah', lokasi: 'Arab Saudi', ms: 31 },
    { nama: 'Al-Fareeda Residential Fund', singkatan: 'Al-Fareeda', kategori: 'Dana hartanah', lokasi: 'Arab Saudi', ms: 31 },
    { nama: 'TH Plantations Berhad (THP)', singkatan: 'THP', kategori: 'Perladangan (tersenarai)', lokasi: 'Malaysia', ms: 31 },
    { nama: 'TH Properties Sdn. Bhd.', singkatan: 'TH Properties', kategori: 'Hartanah', lokasi: 'Malaysia', ms: 31 },
    { nama: 'Alam Maritim Resources / TH Marine', singkatan: 'TH Marine', kategori: 'Marin / Minyak & gas', lokasi: 'Malaysia', ms: 31 },
    { nama: 'TH Hotel & Residences Sdn. Bhd. (THHR)', singkatan: 'THHR', kategori: 'Hotel', lokasi: 'Malaysia', ms: 31 },
    { nama: 'FGV Berhad', singkatan: 'FGV', kategori: 'Perladangan (tersenarai)', lokasi: 'Malaysia', ms: 31 },
  ];

  /* ---------------------------------------------------------------
     11. KRONOLOGI
  --------------------------------------------------------------- */
  const kronologi = [
    { tarikh: '1951', label: 'Ordinan Haji 1951 diperkenalkan; Pejabat Urusan Haji Pulau Pinang ditubuhkan.', tema: 'Sejarah', ms: 14 },
    { tarikh: '1962', label: 'Perbadanan Wang Simpanan Bakal-Bakal Haji Tanah Melayu (PWSBH) ditubuhkan melalui Akta 34/62.', tema: 'Sejarah', ms: 14 },
    { tarikh: '1969', label: 'Lembaga Urusan dan Tabung Haji (LUTH) ditubuhkan menerusi Akta 8, menggantikan PWSBH.', tema: 'Sejarah', ms: 14 },
    { tarikh: '1995-06-01', label: 'LUTH dimansuhkan; Lembaga Tabung Haji (LTH) ditubuhkan melalui Akta Tabung Haji 1995 (Akta 535).', tema: 'Sejarah', ms: 15 },
    { tarikh: '2001', label: 'Bantuan Kewangan Haji (HAFIS) mula diberikan. Sebelum ini jemaah Muassasah membayar kos haji sebenar.', tema: 'Operasi Haji', ms: 23 },
    { tarikh: '2014', label: 'Kadar agihan keuntungan 6.25% + hibah haji 2.00% diisytiharkan — kadar tertinggi dalam tempoh siasatan. Neraca mula defisit selepas agihan (RM352 juta).', tema: 'Kewangan', ms: 146 },
    { tarikh: '2016', label: 'Buat pertama kali liabiliti melebihi aset sebelum sebarang agihan dibuat (kekurangan RM1,260 juta).', tema: 'Kewangan', ms: 146 },
    { tarikh: '2017', label: 'Polisi rosot nilai aset kewangan diubah dua kali dalam tahun yang sama. Agihan 4.50% + 1.75% tetap diisytiharkan.', tema: 'Perakaunan', ms: 148 },
    { tarikh: '2018-07-04', label: 'Perbincangan Ketua Audit Negara dengan Perdana Menteri mengenai cadangan Pendapat Berteguran ke atas Penyata Kewangan 2017.', tema: 'Audit', ms: 21 },
    { tarikh: '2018-07-16', label: 'Ketua Audit Negara mengeluarkan Pendapat Tanpa Teguran dengan “Emphasis of Matter” bagi Penyata Kewangan 2017.', tema: 'Audit', ms: 18 },
    { tarikh: '2018-12-07', label: 'Mesyuarat Jemaah Menteri meluluskan pelan pemulihan dan penstrukturan semula LTH.', tema: 'Pemulihan', ms: 24 },
    { tarikh: '2018-12-14', label: 'Urusharta Jamaah Sdn. Bhd. (UJSB) ditubuhkan.', tema: 'Pemulihan', ms: 24 },
    { tarikh: '2018-12-19', label: 'Surat Ketua Audit Negara kepada Perdana Menteri menjelaskan sebab Pendapat Tanpa Teguran diberikan.', tema: 'Audit', ms: 21 },
    { tarikh: '2018-12-27', label: 'Perjanjian pemindahan aset ditandatangani: 106 saham tersenarai, sebuah syarikat perladangan dan 29 aset hartanah dipindahkan kepada UJSB.', tema: 'Pemulihan', ms: 25 },
    { tarikh: '2018-12-31', label: 'Nilai pasaran lima saham mewah yang dipindahkan sudah jatuh RM946 juta berbanding nilai pemindahan.', tema: 'Pemulihan', ms: 162 },
    { tarikh: '2019', label: 'Pengumuman agihan keuntungan 1.25% bagi 2018. Deposit menyusut daripada kira-kira RM73 bilion kepada RM69 bilion pada akhir 2019.', tema: 'Kewangan', ms: 20 },
    { tarikh: '2019-04-05', label: 'Jemaah Menteri meluluskan peruntukan RM17.8 bilion bagi menampung kekurangan penebusan Sukuk UJSB.', tema: 'Pemulihan', ms: 26 },
    { tarikh: '2019-05-15', label: 'Perjanjian Langganan Sukuk dan Perjanjian Hak Penolakan Pertama (ROFR) ditandatangani antara LTH dan UJSB.', tema: 'Pemulihan', ms: 25 },
    { tarikh: '2019-12-30', label: 'UJSB membayar RM100 juta tunai kepada LTH.', tema: 'Pemulihan', ms: 25 },
    { tarikh: '2020-08-14', label: 'Mesyuarat Jemaah Menteri berpandangan terdapat keperluan menubuhkan Suruhanjaya Siasatan Diraja.', tema: 'Siasatan', ms: 13 },
    { tarikh: '2020-11-30', label: 'Penebusan awal Sukuk UJSB sebanyak RM200 juta dilaksanakan menggunakan Geran Kerajaan.', tema: 'Pemulihan', ms: 26 },
    { tarikh: '2020-12-30', label: 'UJSB membayar RM200 juta tunai kepada LTH.', tema: 'Pemulihan', ms: 25 },
    { tarikh: '2021-05-05', label: 'Perkhidmatan Datuk Nik Mohd Hasyudeen bin Yusoff sebagai Ketua Pegawai Eksekutif ditamatkan, sebelum tamat tempoh sebenar 31 Ogos 2021.', tema: 'Tadbir Urus', ms: 17 },
    { tarikh: '2021-07-14', label: 'Jemaah Menteri bersetuju menubuhkan Suruhanjaya di bawah Akta Suruhanjaya Siasatan 1950 (Akta 119).', tema: 'Siasatan', ms: 13 },
    { tarikh: '2021-10-08', label: 'Jemaah Menteri menetapkan objektif dan skop siasatan Suruhanjaya.', tema: 'Siasatan', ms: 13 },
    { tarikh: '2021-10-15', label: 'Perkhidmatan Tan Sri Md Nor bin Md Yusof sebagai Pengerusi Lembaga ditamatkan sebelum tamat kontrak dua tahun yang bermula 20 Julai 2020.', tema: 'Tadbir Urus', ms: 17 },
    { tarikh: '2022-01-20', label: 'Yang di-Pertuan Agong melantik enam Pesuruhjaya.', tema: 'Siasatan', ms: 13 },
    { tarikh: '2022-06-08', label: 'Harga pasaran saham mewah yang dipindahkan disemak semula semasa laporan disediakan.', tema: 'Pemulihan', ms: 162 },
    { tarikh: '2022-07-19', label: 'Laporan Suruhanjaya ditandatangani oleh Pengerusi.', tema: 'Siasatan', ms: 12 },
    { tarikh: '2022-08-30', label: 'Laporan dipersembahkan kepada Yang di-Pertuan Agong.', tema: 'Siasatan', ms: 5 },
  ];

  /* ---------------------------------------------------------------
     12. PESURUHJAYA & PEGAWAI SURUHANJAYA
  --------------------------------------------------------------- */
  const pesuruhjaya = [
    { nama: 'Tun Md Raus bin Sharif', peranan: 'Pengerusi Suruhanjaya', ms: 5 },
    { nama: 'Tan Sri Samsudin bin Osman', peranan: 'Pesuruhjaya', ms: 5 },
    { nama: 'Tan Sri Abdul Rashid bin Hussain', peranan: 'Pesuruhjaya', ms: 5 },
    { nama: 'Tan Sri Dr. Mohd. Munir bin Abdul Majid', peranan: 'Pesuruhjaya', ms: 5 },
    { nama: 'Profesor Dr. Asmadi bin Mohamed Naim', peranan: 'Pesuruhjaya', ms: 5 },
    { nama: 'Norsyahrin bin Hamidon', peranan: 'Pesuruhjaya', ms: 5 },
    { nama: 'Datuk Hajah Hakimah binti Mohd Yusoff', peranan: 'Setiausaha Suruhanjaya (Ketua Pengarah JAKIM)', ms: 14 },
    { nama: 'Datin Asmah binti Musa', peranan: 'Pegawai Pengendali', ms: 14 },
    { nama: 'Datuk Nazran bin Mohd Sham', peranan: 'Pegawai Pengendali', ms: 14 },
    { nama: 'Budiman Lutfi bin Mohamad', peranan: 'Pegawai Pengendali', ms: 14 },
  ];

  /* ---------------------------------------------------------------
     13. SAKSI YANG MENGEMUKAKAN AKUAN BERKANUN (Jilid 2 & 3) — ms 240–241
  --------------------------------------------------------------- */
  const saksiABS = [
    { nama: 'Encik S. Elias bin Abd Rahman Alhabshi', jilid: 2, ms: 240 },
    { nama: 'Datuk Azizan bin Abdul Rahman', jilid: 2, ms: 240 },
    { nama: 'Dato’ Merina binti Abu Tahir', jilid: 2, ms: 240 },
    { nama: 'Encik Mustakim bin Mohamad', jilid: 2, ms: 240 },
    { nama: 'Puan Hazlina binti Mohd Khalid', jilid: 2, ms: 240 },
    { nama: 'Encik Idrus bin Ismail', jilid: 2, ms: 240 },
    { nama: 'Puan Rozita Khamsiah binti Othman', jilid: 3, ms: 241 },
    { nama: 'Encik Azirruan bin Arifin', jilid: 3, ms: 241 },
    { nama: 'Tan Sri Dato’ Setia Haji Ambrin bin Buang', jilid: 3, ms: 241 },
    { nama: 'Tan Sri Madinah binti Mohamad', jilid: 3, ms: 241 },
    { nama: 'Datuk Seri Nik Azman bin Nik Abdul Majid', jilid: 3, ms: 241 },
    { nama: 'Encik Azizan bin Zakaria', jilid: 3, ms: 241 },
    { nama: 'Encik Ahmad Ridhwan bin Azizan', jilid: 3, ms: 241 },
  ];

  /* ---------------------------------------------------------------
     14. GLOSARI — daripada Senarai Definisi dan Singkatan (ms 35–38)
     + penjelasan ringkas bahasa mudah oleh dashboard (ditanda `mudah`)
  --------------------------------------------------------------- */
  const glosari = [
    { istilah: 'Akta 535', penuh: 'Akta Tabung Haji 1995', mudah: 'Undang-undang utama yang mengawal Tabung Haji: apa fungsinya, siapa boleh dilantik, dan bila keuntungan boleh diagihkan.', ms: 35 },
    { istilah: 'Seksyen 22 Akta 535', penuh: 'Peruntukan mengenai pengagihan keuntungan', mudah: 'Peraturan yang bermaksud: Tabung Haji hanya boleh mengagihkan keuntungan jika nilai asetnya melebihi nilai liabilitinya. Kalau tidak cukup, agihan sepatutnya tidak dibuat.', ms: 145 },
    { istilah: 'Seksyen 24 Akta 535', penuh: 'Jaminan Kerajaan ke atas deposit', mudah: 'Peruntukan yang bermaksud Kerajaan menjamin wang pendeposit. Laporan menyebut jaminan ini kini bernilai kira-kira RM88 bilion.', ms: 32 },
    { istilah: 'Hibah', penuh: 'Agihan keuntungan kepada pendeposit', mudah: 'Bayaran keuntungan tahunan kepada pendeposit — orang ramai selalunya menyebutnya "dividen Tabung Haji". Dalam laporan ia dipanggil agihan keuntungan.', ms: 120 },
    { istilah: 'Hibah haji', penuh: 'Agihan keuntungan tambahan kepada jemaah haji', mudah: 'Bayaran keuntungan tambahan khusus kepada pendeposit yang menunaikan haji. Ia dihentikan selepas 2017.', ms: 120 },
    { istilah: 'RAV', penuh: 'Realisable Asset Value / Nilai Aset yang Boleh Direalisasikan', mudah: 'Anggaran nilai aset "kalau dijual", bukan nilai yang tercatat dalam penyata kewangan beraudit. Pengurusan LTH menggunakan nilai ini untuk menunjukkan aset mencukupi bagi membayar hibah.', ms: 35 },
    { istilah: 'Rosot nilai', penuh: 'Impairment', mudah: 'Pengakuan dalam akaun bahawa sesuatu pelaburan sudah jatuh nilai dan mungkin tidak akan pulih. Kalau tidak diakui, keuntungan nampak lebih besar daripada sebenar.', ms: 18 },
    { istilah: 'AFS', penuh: 'Available for Sale', mudah: 'Kategori pelaburan yang boleh dijual pada bila-bila masa — kebanyakannya saham. Nilai kategori ini turun naik ikut pasaran.', ms: 35 },
    { istilah: 'Emphasis of Matter', penuh: 'Penekanan Perkara dalam laporan audit', mudah: 'Nota amaran juruaudit yang menarik perhatian kepada sesuatu isu, tetapi TIDAK sama dengan kegagalan audit. Akaun masih dianggap "bersih".', ms: 18 },
    { istilah: 'Pendapat Berteguran', penuh: 'Qualified Opinion', mudah: 'Pendapat juruaudit bahawa ada perkara serius yang tidak betul dalam akaun. Ini lebih berat daripada Emphasis of Matter.', ms: 21 },
    { istilah: 'MFRS / FRS', penuh: 'Malaysian Financial Reporting Standards', mudah: 'Piawaian perakaunan rasmi yang perlu diikuti supaya penyata kewangan menggambarkan keadaan sebenar.', ms: 36 },
    { istilah: 'Sukuk', penuh: 'Instrumen kewangan patuh syariah', mudah: 'Semacam bon patuh syariah — satu janji bertulis untuk membayar sejumlah wang pada masa hadapan. Sukuk UJSB berkupon sifar, bermakna tiada bayaran tahunan; semuanya dibayar pada tarikh matang.', ms: 25 },
    { istilah: 'Sukuk berkupon sifar', penuh: 'Zero-coupon sukuk', mudah: 'Sukuk yang tidak membayar apa-apa setiap tahun. Pemegangnya hanya menerima wang pada akhir tempoh. Ertinya LTH tidak menerima tunai sebenar setiap tahun daripada Sukuk UJSB.', ms: 25 },
    { istilah: 'Yield to maturity', penuh: 'Pulangan ketika matang', mudah: 'Kadar pulangan tahunan purata jika sukuk dipegang sehingga tarikh matang.', ms: 25 },
    { istilah: 'SPV', penuh: 'Special Purpose Vehicle / Syarikat Bertujuan Khas', mudah: 'Syarikat yang ditubuhkan khas untuk satu tujuan sahaja. UJSB ialah SPV untuk memegang aset bermasalah LTH.', ms: 37 },
    { istilah: 'ROFR', penuh: 'Right of First Refusal / Hak Penolakan Pertama', mudah: 'Hak LTH untuk membeli semula aset dahulu sebelum UJSB menjualnya kepada orang lain — tetapi pada harga yang dipersetujui, bukan harga pasaran.', ms: 37 },
    { istilah: 'Bank run', penuh: 'Pengeluaran deposit beramai-ramai', mudah: 'Keadaan ramai pendeposit mengeluarkan wang serentak kerana hilang keyakinan. Ini boleh melumpuhkan mana-mana institusi kewangan.', ms: 20 },
    { istilah: 'Risiko tertumpu', penuh: 'Concentration risk', mudah: 'Bahaya apabila terlalu banyak wang bergantung kepada sedikit sumber atau sedikit pendeposit besar.', ms: 106 },
    { istilah: 'HAFIS', penuh: 'Hajj Financial Support / Bantuan Kewangan Haji', mudah: 'Subsidi yang ditanggung LTH supaya jemaah membayar kurang daripada kos haji sebenar. Wangnya datang daripada keuntungan pelaburan LTH.', ms: 36 },
    { istilah: 'Muassasah', penuh: 'Jemaah haji di bawah urusan rasmi', mudah: 'Kategori jemaah haji yang diuruskan sepenuhnya oleh Tabung Haji dengan kadar bayaran yang ditetapkan.', ms: 23 },
    { istilah: 'Mudarabah', penuh: 'Akad perkongsian untung', mudah: 'Perjanjian di mana satu pihak beri modal dan satu pihak uruskan. Untung dikongsi ikut nisbah yang dipersetujui; rugi ditanggung pemberi modal.', ms: 96 },
    { istilah: 'UJSB', penuh: 'Urusharta Jamaah Sdn. Bhd.', mudah: 'Syarikat milik Kerajaan yang ditubuhkan pada 14 Disember 2018 untuk mengambil alih aset bermasalah LTH.', ms: 38 },
    { istilah: 'JAN / KAN', penuh: 'Jabatan Audit Negara / Ketua Audit Negara', mudah: 'Badan kerajaan yang mengaudit akaun badan berkanun seperti LTH.', ms: 36 },
    { istilah: 'PwC', penuh: 'PricewaterhouseCoopers', mudah: 'Firma perakaunan swasta yang dilantik LTH pada 2018 untuk mengkaji semula kedudukan kewangan 2014–2017.', ms: 37 },
    { istilah: 'Komitmen Jaminan', penuh: 'Guarantee commitment Kerajaan Persekutuan', mudah: 'Senarai hutang syarikat/agensi yang dijamin Kerajaan. Kalau syarikat gagal bayar, Kerajaan yang tanggung.', ms: 168 },
    { istilah: 'Rizab', penuh: 'Reserve', mudah: 'Simpanan keuntungan terkumpul yang belum diagihkan — penampan apabila pelaburan merugikan.', ms: 20 },
    { istilah: 'Akta 240', penuh: 'Akta Badan Berkanun (Akuan dan Laporan Tahunan) 1980', mudah: 'Undang-undang yang menetapkan bagaimana badan berkanun perlu menyediakan akaun dan laporan tahunan.', ms: 35 },
    { istilah: 'Akta 61', penuh: 'Akta Tatacara Kewangan 1957', mudah: 'Undang-undang kewangan Kerajaan; di bawahnya jaminan Kerajaan kepada Sukuk UJSB disenaraikan.', ms: 35 },
  ];

  return {
    src: SRC,
    neraca, kadarHibah, bayaranHibah, untungBersih,
    bonusKakitangan, gredPrestasi, bonusTHProperties2017, bonusTHPAustralia2018, kunciNama,
    jambatanRAV, jambatanUntung2017, perolehanTertahan2017, polisiRosotNilai,
    pindahanAset, pindahanJumlah, hartanahUJSB, hartanahUJSBJumlah,
    bluechip, bluechipJumlah, sukuk, bayaranTunaiUJSB, jaminanKerajaan, jaminanJumlah, rofr,
    hafisSebenar, hafisUnjuran, kosHajiRujukan, bayaranHaji2022,
    auditForensik, kronologi, pesuruhjaya, saksiABS, glosari,
  };
})();
