/*
 * RCI TABUNG HAJI — SET DATA
 * Sumber: Laporan Suruhanjaya Siasatan Diraja bagi Menyiasat Isu Pengurusan dan
 * Operasi Lembaga Tabung Haji dari Tahun 2014 hingga 2020 (30 Ogos 2022).
 * OCR: github.com/SyahmiRafsan/rci-tabunghaji
 * Setiap angka disertakan rujukan "p" = nombor halaman PDF laporan.
 *
 * Jenis data: fakta = terus dari laporan; terbitan = dikira oleh dashboard ini;
 * unjuran = anggaran masa depan yang dipetik dari laporan; simulasi = andaian yang boleh diuji.
 */
window.RCI = {

/* ============================== IDENTITI & GAMBARAN ============================== */

hero: [
  { label: "Pendeposit", value: "8.6 juta", note: "setakat 22 Julai 2022", p: 229, icon: "people" },
  { label: "Deposit pendeposit", value: "RM88 bilion", note: "dan diunjurkan RM100 bilion dalam 2 tahun", p: 218, icon: "coins" },
  { label: "Hibah dibayar 1966–2021", value: "RM37.52 bilion", note: "termasuk hibah haji", p: 229, icon: "gift" },
  { label: "Jemaah haji 1963–2021", value: "1.46 juta orang", note: "orang Islam Malaysia", p: 229, icon: "kaaba" },
  { label: "Subsidi haji (HAFIS) sejak 2001", value: "RM2.02 bilion", note: "diambil daripada keuntungan pelaburan", p: 229, icon: "heart" },
  { label: "Sukuk UJSB dilanggan LTH", value: "RM27.5 bilion", note: "≈31% daripada jumlah aset LTH", p: 171, icon: "bond" }
],

/* Kronologi lima babak — "kisah dalam 30 saat" */
babak: [
  { no: 1, judul: "Zaman gah (2014–2017)", warna: "gold",
    ringkas: "Hibah 6.25%→4.50%, bonus kakitangan sehingga 13 bulan gaji, LTH bersaing dengan KWSP dan ASB dalam pemberian pulangan.",
    peristiwa: ["2014: hibah 6.25% + 2.00% — tertinggi dalam tempoh ini", "2014: bonus kakitangan sehingga 13 bulan (RM74 juta)", "2015: BNM mula menulis surat amaran tentang rizab dan hibah", "2015–2016: EY siapkan laporan proforma (RAV) untuk tunjuk kedudukan sihat"] },
  { no: 2, judul: "Amaran awal diabaikan (2015–2017)", warna: "warn",
    ringkas: "BNM, perunding Roland Berger dan Jabatan Audit Negara sudah memberi amaran — tetapi tidak diendahkan sepenuhnya.",
    peristiwa: ["19 Dis 2014, 23 Dis 2015, 14 Dis 2016, 17 Feb 2017: surat BNM", "2017: Laporan Roland Berger tidak pernah dibentang kepada Lembaga", "2017: polisi rosot nilai diubah dua kali supaya kerugian tidak direkod"] },
  { no: 3, judul: "Krisis tersembunyi (2017–2018)", warna: "neg",
    ringkas: "Mengikut piawaian penuh, LTH rugi RM1.4 bilion pada 2017 — bukan untung RM3.4 bilion. Aset sudah kurang daripada liabiliti.",
    peristiwa: ["16 Jul 2018: KAN keluarkan teguran 'Emphasis of Matter'", "RM227.81 juta rosot nilai tidak direkod (TH Heavy Engineering RM164.58 juta)", "PwC: defisit aset vs liabiliti berlaku sejak 2014", "RAV tambah RM4.47 bilion 'nilai' untuk menampakkan LTH solven"] },
  { no: 4, judul: "Penyelamatan UJSB (2018–2019)", warna: "pos",
    ringkas: "Kerajaan pindahkan aset kurang berdaya saing ke Urusharta Jamaah (UJSB) dengan nilai premium dan menerbitkan sukuk RM27.5 bilion.",
    peristiwa: ["7 Dis 2018: Jemaah Menteri lulus pelan pemulihan", "14 Dis 2018: UJSB ditubuhkan; 27 Dis 2018: aset dipindah", "106 saham tersenarai + 1 syarikat perladangan + 29 hartanah", "Nilai pindah RM19.9 bilion vs nilai pasaran RM9.7 bilion (premium RM10.2 bilion)"] },
  { no: 5, judul: "Ujian keyakinan & pemulihan (2019–2022)", warna: "info",
    ringkas: "Hibah 1.25% menyebabkan deposit mengecut RM73→RM69 bilion. Deposit kembali pulih ke RM88 bilion, kemudian RCI dibentuk.",
    peristiwa: ["2019: hibah 1.25% — pendeposit besar tarik keluar deposit", "2020: hibah 3.10%; deposit ~RM76 bilion akhir 2020", "5 Mei 2021: CEO ditamatkan tanpa sebab; 15 Okt 2021: Pengerusi ditamatkan", "20 Jan 2022: 6 Pesuruhjaya RCI dilantik; 30 Ogos 2022: laporan dibentang"] }
],

/* Soalan panduan untuk penerokaan */
soalan: [
  { t: "Kenapa LTH yang melaporkan untung RM3.4 bilion sebenarnya rugi RM1.4 bilion pada 2017?", j: "Krisis Kewangan", tab: "krisis" },
  { t: "Macam mana 14 pelaburan utama boleh membawa kerugian begitu besar?", j: "Pelaburan Bermasalah", tab: "pelaburan" },
  { t: "Adakah pelan penyelamatan UJSB benar-benar menyelamatkan LTH — atau memindahkan risiko kepada Kerajaan?", j: "Penyelamatan UJSB", tab: "penyelamatan" },
  { t: "Siapa sebenarnya menanggung subsidi haji, dan bolehkah ia berterusan?", j: "Haji & Pendeposit", tab: "haji" },
  { t: "Di mana sistem tadbir urus gagal — dan apa cadangan RCI?", j: "Tadbir Urus & Integriti", tab: "tadbir" }
],

/* ============================== KRISIS KEWANGAN ============================== */

/* Kadar hibah tahunan (PDF 120) */
hibahRates: {
  tahun: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
  tahunan: [6.25, 5.00, 4.25, 4.50, 1.25, 3.05, 3.10, 3.10],
  haji: [2.00, 3.00, 1.50, 1.75, 0, 0, 0, 0],
  p: 120
},

/* Jumlah hibah dibayar (PDF 130) */
hibahBayar: {
  tahun: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
  tahunan: [2988053, 2807369, 2645625, 3042184, 922959, 2140538, 2242141],
  haji: [249143, 413005, 225197, 281557, 0, 0, 0],
  p: 130
},

/* Analisa PwC: aset vs liabiliti (PDF 147) — RM juta */
pwca: {
  tahun: [2013, 2014, 2015, 2016, 2017],
  aset: [48778, 54751, 60196, 64321, 70317],
  liabiliti: [43696, 51866, 60062, 65581, 71086],
  sebelum: [5082, 2885, 134, -1260, -769],
  agihan: [2632, 3237, 3220, 2871, 3324],
  selepas: [2450, -352, -3086, -4131, -4093],
  p: 147
},

/* Polisi rosot nilai 2017 — apa yang sepatutnya vs direkod (PDF 148) */
impairment: {
  polisi: [
    { label: "Jika kekal 70% (jatuh >70% selama 2 tahun)", nilai: 1313, warna: "neg" },
    { label: "Jika kekal 85%", nilai: 171, warna: "warn" },
    { label: "Jika kekal 90% (polisi akhir)", nilai: 1, warna: "info" }
  ],
  direkod: 1.0,
  p: 148
},

/* Pelarasan MFRS 2017 — keratan PwC (PDF 149) — RM juta */
mfrs: {
  untung: 3412,
  item: [
    { label: "Rosot nilai saham (AFS ekuiti)", v: -4258, jenis: "down" },
    { label: "Rosot nilai hutang (AFS)", v: -7, jenis: "down" },
    { label: "Pelarasan lain", v: -580, jenis: "down" }
  ],
  rugi: -1433,
  p: 149
},

/* RAV 2017 (PDF 116) — RM juta */
rav: {
  aset: 70317,
  tambah: 4466,
  jumlah: 74783,
  liabiliti: 74410,
  bersih: 373,
  p: 116
},

/* RAV TH Plantations (PDF 113) */
ravTHP: {
  jumlah: 2294,
  penilaian: 4600,
  profesional: 556,
  anggaran: 4044,
  p: 113
},

/* Sijil audit */
audit: {
  tahun: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
  keputusan: ["Bersih", "Bersih", "Bersih", "Bersih + teguran", "n/a (Penyata disemak KAN)", "n/a", "n/a"],
  p: 125
},

/* ============================== PELABURAN BERMASALAH ============================== */

pelaburan: [
  { nama: "FGV Berhad", sektor: "Perladangan", tahun: 2012,
    duit: 1253742809, kerugian: 1058937380, jenis: "Tidak nyata",
    status: "Diambil alih UJSB",
    ringkas: "LTH melanggan IPO FGV 273.6 juta unit (RM4.55/unit), kemudian beli semula 232 juta unit pada RM5.01 — dan harga jatuh ke RM0.885. Kerugian tidak nyata RM1.06 bilion sebelum UJSB mengambil alih 283.7 juta unit pada RM4.62.",
    kronologi: ["9 Mei 2012: kelulusan langganan sehingga 276 juta unit pada RM4.65", "26 Jun 2012: langgan 273,579,700 unit @ RM4.55 — kos penuh RM1.254 bilion", "28 Jun–19 Jul 2012: jual 14.7 juta unit @ purata RM5.38 (untung RM11.7 juta)", "23 Jul–3 Okt 2012: beli semula 232 juta unit @ purata RM5.01 (tambah RM116.2 juta)", "Harga jatuh ke RM0.885 — kerugian tidak nyata RM1.06 bilion", "UJSB ambil alih 283,710,100 unit @ RM4.62 (RM1.31 bilion); harga pasaran ~RM0.69 (Feb 2022)"],
    soalan: "Persoalannya, mengapa LTH terus memegang saham tersebut dan tidak menjualnya sehingga harganya telah turun dengan rendahnya? — Laporan RCI",
    p: [192, 193] },
  { nama: "PT TH Indo Plantations (THIP)", sektor: "Perladangan (Indonesia)", tahun: 2012,
    duit: 0, kerugian: 100000000, jenis: "USD 100 juta", status: "Laporan polis; siasatan PDRM",
    ringkas: "Penjualan 95% pegangan LTH dalam ladang Riau (83,000 hektar) kepada PT Borneo Pacific bermasalah: syer dipindah sebelum bayaran penuh, harga dikurang USD100 juta (dari USD910 juta), dan LTH terpaksa mendahulukan USD178.6 juta yang sepatutnya dibayar pembeli.",
    kronologi: ["2012: perjanjian jual 95% ekuiti THIP (83,000 ha, Riau) — ~USD910 juta", "Syer dipindah sebelum bayaran penuh diterima", "Harga dikurangkan USD100 juta", "LTH tidak terima bayaran ikut jadual dan terpaksa beri pendahuluan USD178.6 juta", "30 Nov 2018: laporan polis Dang Wangi/31331/2018 (salah nyata & penyembunyian maklumat)", "Siasatan PDRM rentas sempadan Indonesia masih berjalan"],
    p: [177, 178, 194] },
  { nama: "Deru Semangat Sdn. Bhd. (DSSB)", sektor: "Sawit (Pahang)", tahun: 2014,
    duit: 526160000, kerugian: 225000000, jenis: "RM257 juta → RM32 juta", status: "Dirungkai; YAM TMP waive RM258 juta",
    ringkas: "LTH labur RM526.16 juta untuk ambil alih 55% ladang sawit milik Sultan Pahang (kini YAM Tengku Muda Pahang). Pembalakan hutan simpan melanggar polisi NOPE hingga Wilmar enggan beli hasil. RM257 juta dirosot nilai kepada RM32 juta.",
    kronologi: ["21 Okt 2014 & 19 Jan 2015: kelulusan Menteri — pelaburan RM526.16 juta", "Ambil alih 55% ekuiti: RM231 juta + pembiayaan pembangunan RM295.16 juta", "Hanya RM257 juta dikeluarkan sehingga Jan 2021", "Pembalakan hutan simpan langgar polisi NOPE — Wilmar International tak beli hasil", "RM257 juta dirosot nilai kepada RM32 juta; baki komitmen RM258 juta berisiko", "Rungkaian: LTH bayar RM259 juta; YAM TMP waive RM258 juta (ekuiti RM71 juta + pembiayaan RM187 juta)"],
    p: [180, 181] },
  { nama: "Trurich Resources Sdn. Bhd.", sektor: "Sawit (Kalimantan)", tahun: 2009,
    duit: 364310000, kerugian: 364310000, jenis: "Rosot penuh", status: "Dalam pelupusan; laporan polis",
    ringkas: "Usaha sama dengan FGV untuk sehingga 200,000 hektar di Kalimantan. Insolven — pelaburan RM364.31 juta dirosot nilai sepenuhnya; baki pinjaman Maybank USD179 juta tertunggak.",
    kronologi: ["30 Nov 2009: JV ditubuhkan (sehingga 200,000 ha, Kalimantan)", "Pelaburan RM364.31 juta dirosot nilai sepenuhnya", "Liabiliti bersih semasa: RM119.67 juta (2017), RM92.78 juta (2018)", "13 Dis 2018: laporan polis — laporan kesesuaian tanah 40,880 ha dimanipulasi", "22 Dis 2020: kelulusan Menteri untuk pelupusan anak syarikat", "Pelupusan kepada PT Karya Teknik Agro (nomini PT Karya Teknik Utama) — urusan FGV & Maybank"],
    p: [181, 182, 195, 196] },
  { nama: "Putrajaya Perdana Berhad (PPB)", sektor: "Hartanah", tahun: 2014,
    duit: 193500000, kerugian: 145300000, jenis: "Peruntukan rosot nilai", status: "Tindakan undang-undang / rundingan",
    ringkas: "LTH beli 30% ekuiti (RM193.5 juta) dengan harapan PPB disenaraikan dalam setahun. Listing gagal dan sasaran untung RM86 juta tidak tercapai. Peruntukan rosot nilai RM145.3 juta; nilai buku tinggal RM48.2 juta.",
    kronologi: ["Dis 2014: beli 30% ekuiti — RM193.50 juta daripada Cendana Destini (CDSB)", "PPB gagal disenaraikan dan gagal sasaran untung RM86 juta (FY2015)", "7 Mac 2018: notis Put Option — CDSB ambil alih pada RM210.7 juta", "CDSB gagal bayar; 12 Nov 2020: kelulusan tindakan undang-undang", "15 Jan 2021: CDSB hantar cadangan penyelesaian baru — sedang diproses", "Peruntukan rosot nilai RM145.3 juta (setakat Dis 2020); nilai buku RM48.2 juta"],
    p: [183, 184] },
  { nama: "Al-Rawda Real Estates (Arab Saudi)", sektor: "Hotel (Mekah & Madinah)", tahun: 2015,
    duit: 1426000000, kerugian: 202800000, jenis: "ECL RM202.8 juta (SR)", status: "Timbang tara; penyitaan aset di Mahkamah Arab Saudi",
    ringkas: "LTH bayar SR1,426 juta untuk pajakan 4 hotel di Mekah & Madinah. Al-Rawda mungkir sejak Mac 2019; sewa tertunggak SR560.7 juta. LTH menang pelbagai perintah penguatkuasaan tetapi pemulihan perlahan.",
    kronologi: ["3 Apr 2015 / 21 Dis 2016 / 4 Sep 2017: perjanjian pajakan 10–18 tahun (4 hotel)", "Nilai perjanjian SR1,426 juta; pendapatan sewa dijangka SR2,490 juta", "Mungkir sejak Mac 2019; tunggakan sewa SR560.7 juta (Dis 2021)", "9 tindakan undang-undang vs Al-Rawda (SR344 juta) + 7 vs penjamin Dr. Mashhoor (SR255.1 juta)", "29 Jun 2021: tawaran penyelesaian lebih rendah (SR968 juta) ditolak LTH", "ECL RM202.8 juta (Dis 2020); unjuran rosot tambahan RM184 juta (FY2021)", "Al-Rawda cabar perjanjian atas alasan syariah — ditolak LTH; timbang tara berjalan"],
    p: [184, 185, 186, 187] },
  { nama: "TH Marine (Alam Maritim)", sektor: "Kapal luar pesisir", tahun: 2015,
    duit: 334000000, kerugian: 278000000, jenis: "RM198 juta + RM80 juta", status: "Rosot penuh ekuiti",
    ringkas: "Usaha sama 51% dengan Alam Maritim Resources untuk 6 kapal AHTS (USD20.27 juta) + 2 kapal milik penuh. Jumlah pelaburan RM334 juta — keseluruhan ekuiti RM198 juta dirosot; RM80 juta daripada RM136 juta pembiayaan juga dirosot.",
    kronologi: ["18 Jun 2015: kelulusan Menteri — 51% ekuiti JV dengan Alam Maritim", "6 kapal AHTS (USD20.27 juta) + 2 kapal milik penuh LTH", "Jumlah pelaburan RM334 juta (ekuiti RM198 juta + pembiayaan RM136 juta)", "Seluruh ekuiti RM198 juta dirosot nilai", "RM80 juta daripada RM136 juta pembiayaan dirosot (hingga Dis 2021)", "Semakan PwC: hanya RM70.4 juta dijangka dapat kembali"],
    p: [190, 191] },
  { nama: "Emrail Sdn. Bhd.", sektor: "Logistik / kereta api", tahun: 2016,
    duit: 20170000, kerugian: 19300000, jenis: "Rosot penuh baki", status: "Timbang tara (AIAC)",
    ringkas: "LTH beli 15.3% ekuiti (RM20.17 juta) tetapi IPO dibatalkan dan sasaran untung RM36.1 juta gagal. Notis put RM20.3 juta dikeluarkan; penjual hanya bayar RM2 juta.",
    kronologi: ["7 Jun 2016: beli 15.3% ekuiti — RM20.17 juta daripada Lingkaran Hartaniaga (LHSB)", "IPO Emrail dibatalkan; sasaran untung RM36.1 juta (FY2016) gagal", "26 Apr 2017: notis Put Option — harga put RM20.3 juta", "LHSB hanya bayar RM2 juta", "31 Dis 2020: peruntukan rosot nilai RM19.3 juta", "8 Sep 2021: writ Mahkamah Tinggi; 22 Apr 2022: daftar timbang tara AIAC"],
    p: [178, 179] },
  { nama: "Wellspring Worldwide Ltd.", sektor: "Ekuiti / kejuruteraan", tahun: 2014,
    duit: 18400000, kerugian: 19030000, jenis: "Rosot penuh", status: "Perintah kebankrapan (Jan 2022)",
    ringkas: "LTH beli 10% ekuiti (RM18.4 juta) dengan janji penyenaraian. Listing gagal; notis put RM19.03 juta tidak dibayar. Mahkamah arah bayar RM20.8 juta — masih gagal; notis kebankrapan dibenarkan.",
    kronologi: ["21 Sep 2014: beli 10% ekuiti — RM18.4 juta", "19 Sep 2016: notis Put Option selepas gagal disenaraikan — RM19.03 juta", "Tiada bayaran langsung daripada penaja", "5 Okt 2018: Mahkamah arah bayar RM20.8 juta — gagal", "31 Dis 2019: rosot nilai RM19.03 juta", "25 Jan 2022: notis kebankrapan terhadap penaja dibenarkan"],
    p: [179, 180] },
  { nama: "Abraj Sdn. Bhd.", sektor: "Hartanah", tahun: 2009,
    duit: 85000000, kerugian: 40250000, jenis: "Kerugian rosot nilai", status: "50% dijual kepada Amanah Raya",
    ringkas: "Usaha sama hartanah dengan Amanah Raya sejak 2009 terjejas sejak 2015 (penyewa utama keluar). Amanah Raya beli 50% pegangan LTH pada Dis 2020 — kerugian rosot nilai RM40.25 juta daripada pegangan RM85 juta.",
    kronologi: ["11 Nov 2009: JV dengan Amanah Raya Berhad (pembelian hartanah)", "Terjejas sejak 2015 — penyewa utama keluar", "Percubaan: penyewa baru, jual bangunan, struktur semula pembiayaan", "Dis 2020: Amanah Raya beli 50% pegangan LTH", "Kerugian rosot nilai RM40.25 juta daripada pegangan RM85 juta"],
    p: [182, 183] },
  { nama: "Al-Fareeda Residential Fund", sektor: "Dana hartanah (Arab Saudi)", tahun: 2013,
    duit: 63000000, kerugian: 63000000, jenis: "Hapus kira penuh", status: "Kerugian ditanggung",
    ringkas: "LTH melanggan SR76 juta (=RM63 juta, 13.8% daripada dana SR550 juta) untuk sektor perumahan Arab Saudi. Dana dicairkan selepas masalah buruh, kontraktor dan kejatuhan harga minyak; pengurus dana tidak dapat dikesan — dihapus kira sepenuhnya.",
    kronologi: ["21 Feb 2013: langganan sehingga SR76 juta (=RM63 juta; 13.8% dana SR550 juta)", "Pengurus dana: Anfaal Capital", "Masalah: undang-undang buruh/imigresen, kontraktor, kos binaan, harga minyak jatuh", "Dana dicairkan; aset di bawah Alinma Bank", "Tiada perkembangan sejak 2017; pengurus dana tidak dapat dikesan", "Hapus kira penuh — kerugian SR76 juta"],
    p: [187, 188] },
  { nama: "TH Plantations Berhad (THP)", sektor: "Sawit", tahun: 2012,
    duit: 1200000000, kerugian: 170000000, jenis: "Rosot peringkat LTH RM170 juta", status: "Laporan forensik PwC; siasatan PDRM/SPRM/SC",
    ringkas: "Laporan forensik PwC (25 Apr 2019): pengurusan kanan & Lembaga gagal tanggungjawab fidusiari dalam pengambilalihan ladang. Pembelian 2012–2014 dibiayai terutama Sukuk RM1.2 bilion terbitan LTH; hanya 58% ladang produktif.",
    kronologi: ["2012–2014: pengambilalihan ladang (Bumi Suria Ventures, Maju Warismas, PT Persada Kencana Prima)", "Pembiayaan terutama Sukuk RM1.2 bilion terbitan LTH", "Hanya 58% ladang produktif; estet dijual untuk bayar hutang", "25 Apr 2019: Laporan Forensik PwC — pelanggaran tanggungjawab fidusiari", "20 Ogos 2018: CEO diletakkan garden leave dan letak jawatan", "Rosot nilai peringkat LTH: RM170 juta; laporan kepada PDRM, SPRM, Suruhanjaya Sekuriti"],
    p: [188, 189] },
  { nama: "TH Properties Sdn. Bhd.", sektor: "Hartanah & pembinaan", tahun: 2017,
    duit: 2200000, kerugian: 2200000, jenis: "Bonus tanpa kelulusan", status: "Keputusan pulihkan bonus (Ogos 2020)",
    ringkas: "Bonus istimewa RM2.2 juta dibayar 2017 & 2018 kepada Pengurusan dan Lembaga tanpa kelulusan LTH sebagai pemegang ekuiti utama dan melanggar Akta Syarikat 2016. Keputusan untuk mendapatkan semula dibuat 12 Ogos 2020.",
    kronologi: ["2017: bonus RM1,148,400 — diluluskan Exco, bukan Lembaga/pemegang saham", "2018: bonus RM1,045,000 (THP Australia) — kelulusan selepas 7 bulan", "Pandangan undang-undang: langgar s.230(2), s.230(3), s.230(4) Akta Syarikat 2016", "5 Feb 2020: Laporan Audit Dalam + siasatan Tetuan Tajuddin & Co", "12 Ogos 2020: keputusan mendapatkan kembali bonus 2017–2018"],
    p: [189, 190] },
  { nama: "TH Hotel & Residences (THHR)", sektor: "Hotel", tahun: 2018,
    duit: 804100000, kerugian: 0, jenis: "Dipindah ke UJSB", status: "Dipindah ke UJSB",
    ringkas: "Lima hotel & kompleks haji (Alor Setar, Kuching, Pulau Pinang, Kuala Terengganu, Kota Kinabalu) dipindahkan ke UJSB pada RM804.1 juta (premium ~55% atas nilai buku) kerana pulangan kurang 2%.",
    kronologi: ["28 Dis 2018: perjanjian pemindahan (ATA) dengan UJSB", "5 hotel & kompleks haji: Alor Setar, Kuching, Pulau Pinang, Kuala Terengganu, Kota Kinabalu", "Pulangan aset <2% — sebab pemindahan", "Nilai pindahan RM804.1 juta (premium ~55%)", "Tidak dipindah: Hotel Movenpick Sepang & Kompleks Haji Kelana Jaya", "FY2020: hasil sewaan RM6.2 juta, jatuh 62% (RM16.5 juta pada 2019)"],
    p: [191, 192] }
],

/* Sumber babak ringkas pelaburan */
pelaburanTemuan: {
  petikan: "Suruhanjaya mendapati wujudnya transaksi yang mencurigakan dan penyembunyian maklumat.",
  p: 176,
  petikan2: "Semua dokumen menunjukkan kenyataan 'dipersetujui seperti dicadangkan'.",
  p2: 177,
  panel: "Pengerusi Panel Pelaburan mengakui pendekatannya longgar dan tidak menyeluruh — Panel terlalu bergantung kepada input pengurusan dan tidak menyemak cadangan.",
  p3: 176
},

/* ============================== FGV DEEP DIVE ============================== */
fgv: {
  titik: [
    { tarikh: "26 Jun 2012", label: "Langgan IPO 273.6 juta unit", harga: 4.55, jenis: "beli", kos: "RM1.254 bilion" },
    { tarikh: "28 Jun–19 Jul 2012", label: "Jual 14.7 juta unit (untung RM11.7 juta)", harga: 5.38, jenis: "jual" },
    { tarikh: "23 Jul–3 Okt 2012", label: "Beli semula 232 juta unit", harga: 5.01, jenis: "beli", kos: "+RM116.2 juta" },
    { tarikh: "2015–2018", label: "Harga jatuh ke paras rendah", harga: 0.885, jenis: "paras" },
    { tarikh: "2018", label: "UJSB ambil alih 283.7 juta unit", harga: 4.62, jenis: "ujsb", kos: "RM1.31 bilion" },
    { tarikh: "Feb 2022", label: "Harga pasaran", harga: 0.69, jenis: "paras" }
  ],
  p: [192, 193]
},

/* ============================== PENYELAMATAN UJSB ============================== */

ujsb: {
  kronologi: [
    { t: "30 Nov 2018", e: "Jemaah Menteri bersetuju secara dasarnya terhadap rangka kerja pelan pemulihan LTH", p: 156 },
    { t: "7 Dis 2018", e: "Jemaah Menteri meluluskan Pelan Pemulihan & Penstrukturan LTH dan mengarahkan ia dilaksanakan sebelum akhir 2018 — kurang dua minggu; LTH diletakkan di bawah pengawasan BNM mulai 1 Jan 2019", p: 156 },
    { t: "14 Dis 2018", e: "UJSB ditubuhkan — dimiliki penuh oleh Menteri Kewangan Diperbadankan", p: 145 },
    { t: "19 Dis 2018", e: "Perdana Menteri meluluskan pemindahan aset berprestasi rendah kepada UJSB", p: 145 },
    { t: "27 Dis 2018", e: "Perjanjian Pemindahan Aset ditandatangani: 106 saham tersenarai + 1 syarikat perladangan + 29 aset hartanah", p: 156 },
    { t: "5 Apr 2019", e: "Jemaah Menteri meluluskan peruntukan sekurang-kurangnya RM17.8 bilion untuk kekurangan penebusan sukuk", p: 165 },
    { t: "15 Mei 2019", e: "Perjanjian Langganan Sukuk & Perjanjian Hak Penolakan Pertama (ROFR)", p: 156 },
    { t: "30 Dis 2019", e: "Pembayaran tunai pertama RM100 juta daripada RM300 juta", p: 163 },
    { t: "30 Nov 2020", e: "Penebusan awal Sukuk RM200 juta kepada LTH (dari geran RM500 juta)", p: 166 },
    { t: "30 Dis 2020", e: "Pembayaran tunai baki RM200 juta", p: 163 }
  ],
  aset: {
    baris: [
      { label: "Hartanah & tanah", buku: 1411, pindah: 2247, pasaran: 1411 },
      { label: "Syarikat perladangan", buku: 718, pindah: 802, pasaran: 718 },
      { label: "Ekuiti tersenarai (Bursa)", buku: 16852, pindah: 16851, pasaran: 7600 }
    ],
    jumlah: { buku: 18981, pindah: 19900, pasaran: 9729 },
    p: 159
  },
  sukuk: [
    { siri: "Siri 1", terbit: 10000, nominal: 13200, tempoh: "7 tahun", ytm: "4.05% setahun", matang: 2026, p: 162 },
    { siri: "Siri 2", terbit: 9600, nominal: 14300, tempoh: "10 tahun", ytm: "4.10% setahun", matang: 2029, p: 162 }
  ],
  tunai: 300,
  tunaiNota: "pembayaran tunai RM300 juta: RM100 juta (30 Dis 2019) + RM200 juta (30 Dis 2020); jumlah nominal Sukuk RM27.5 bilion termasuk kadar keuntungan tertunggak Kerajaan kepada LTH sebanyak RM7.65 bilion",
  tunaiP: [162, 163, 159],
  kerajaan: {
    jaminan: 17800,
    tahunan: 1730,
    p: 165,
    terima: "LTH hanya menerima RM500 juta tunai setakat laporan — berbanding nilai pemindahan aset RM9.73 bilion pada nilai pasaran",
    terimaP: 166
  },
  kepentingan: [
    { item: "Hasil pengakruan Sukuk UJSB vs jumlah pendapatan tahunan LTH", nilai: "≈26%", p: 171 },
    { item: "Pengakruan Sukuk UJSB vs jumlah agihan keuntungan tahunan kepada pendeposit", nilai: ">1/3", p: 171 },
    { item: "Sukuk UJSB vs keseluruhan aset LTH", nilai: "≈31%", p: 171 }
  ],
  hartanah: {
    baris: [
      { label: "Tanah", kel: "1,353,361 kaki persegi", pindah: 627006479, pasaran: 401080000 },
      { label: "Menara pejabat", kel: "354,021 kp", pindah: 737399698, pasaran: 325000000 },
      { label: "Lot kedai", kel: "120,062 kp", pindah: 46301759, pasaran: 33330000 },
      { label: "Hotel", kel: "354,134 kp", pindah: 804058625, pasaran: 424270000 },
      { label: "Perindustrian", kel: "35,019 kp", pindah: 31914386, pasaran: 19000000 }
    ],
    jumlah: { pindah: 2246680947, pasaran: 1202680000 },
    p: 161,
    nota: "11 daripada 29 hartanah dinilai jurunilai bebas di bawah paras penilaian JPPHM; secara keseluruhan nilai pindahan lebih tinggi RM543.65 juta daripada nilaian JPPHM (JAN). Selepas pindahan, nilai hartanah ini jatuh kepada RM1.2 bilion (setakat Dis 2021)."
  },
  bluechips: {
    baris: [
      { nama: "Axiata", hargaPindah: 6.00, hargaDis: 3.63, jatuh: 39.5, nilaiPindah: 1422605154, nilaiDis: 931803255 },
      { nama: "Maxis", hargaPindah: 6.84, hargaDis: 5.43, jatuh: 20.6, nilaiPindah: 879395994, nilaiDis: 681197584 },
      { nama: "MISC", hargaPindah: 7.43, hargaDis: 6.15, jatuh: 17.2, nilaiPindah: 486532216, nilaiDis: 438925710 },
      { nama: "Digi", hargaPindah: 5.13, hargaDis: 4.24, jatuh: 17.3, nilaiPindah: 576240738, nilaiDis: 500328955 },
      { nama: "TM", hargaPindah: 5.96, hargaDis: 2.33, jatuh: 60.9, nilaiPindah: 241202959, nilaiDis: 107650200 }
    ],
    jumlah: { pindah: 3605977061, dis: 2659905704 },
    p: 161,
    nota: "Harga pasaran 8 Jun 2022 masih di bawah harga pemindahan: Axiata RM3.04, Maxis RM3.52, MISC RM7.30, Digi RM3.27, TM RM5.20."
  },
  rofr: {
    baris: [
      { syarikat: "WZ Satu", tarikh: "24 Mac 2020", harga: 0.090, pasaran: 0.064, premium: 40.6 },
      { syarikat: "Eastern & Oriental", tarikh: "25 Mac 2020", harga: 0.365, pasaran: 0.335, premium: 9.0 },
      { syarikat: "WZ Satu", tarikh: "31 Mac 2020", harga: 0.085, pasaran: 0.075, premium: 13.3 },
      { syarikat: "WCT Holdings", tarikh: "2 Apr 2020", harga: 0.400, pasaran: 0.377, premium: 6.1 },
      { syarikat: "KSL Holdings", tarikh: "6 Mei 2020", harga: 0.610, pasaran: 0.630, premium: -3.2 },
      { syarikat: "KSL Holdings", tarikh: "21 Mei 2020", harga: 0.580, pasaran: 0.605, premium: -4.1 },
      { syarikat: "Hap Seng Plantations", tarikh: "29 Mei 2020", harga: 1.650, pasaran: 1.570, premium: 5.1 },
      { syarikat: "FGV Holdings", tarikh: "9 Dis 2020", harga: 1.300, pasaran: 1.270, premium: 2.4 },
      { syarikat: "Integrated Logistics", tarikh: "14 Mac 2022", harga: 0.380, pasaran: 0.365, premium: 4.1 }
    ],
    p: 169,
    nota: "ROFR (hak penolakan pertama) memberi LTH hak keutamaan untuk membeli semula aset jika UJSB mahu menjualnya — tetapi pada harga premium berbanding pasaran. Hanya satu hartanah terjual setakat laporan: tanah Segamat RM920 ribu (tender 2020). 75 daripada 106 kaunter dilupuskan UJSB dan dilabur semula dalam 329 kaunter."
  },
  model: "Model Danaharta Nasional Berhad 1998 — syarikat pemulihan aset Kerajaan",
  pModel: 152,
  pilihan: "Jawatankuasa khas (Pejabat PM, BNM, MOF, pengurusan kanan LTH) mempertimbang 4 pilihan: (1) geran langsung >RM10 bilion; (2) aktifkan jaminan s.24 Akta 535; (3) aset tertangguh (deferred asset); (4) pindah aset ke SPV — dipilih",
  pPilihan: 152
},

/* ============================== HAJI & PENDEPOSIT ============================== */

hafis: {
  sebenar: {
    tahun: [2014, 2015, 2016, 2017, 2018, 2019],
    kos: [16155, 17270, 18890, 19550, 22450, 22900],
    bayaran: [9980, 9980, 9980, 9980, 9980, 9980],
    total: [106, 135, 160, 298, 314, 299],
    p: 204
  },
  unjuran: {
    tahun: [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
    kos: [25540, 26280, 28160, 29570, 31040, 32592, 34221, 35932, 37729],
    bayaran: [12980, 12980, 12980, 12980, 12980, 12980, 12980, 12980, 12980],
    total: [376800, 399000, 455400, 497700, 541800, 588360, 637230, 688560, 742470],
    p: 205
  },
  kadar2022: [
    { kumpulan: "B40", bayaran: 10980, p: 205 },
    { kumpulan: "Bukan B40", bayaran: 12980, p: 205 }
  ],
  nota: "Bayaran haji RM9,980 kekal selama 13 tahun (2009–2021) walaupun kos naik. Tiada pemberangkatan haji pada 2020 dan 2021 (pandemik).",
  pNota: [204, 205]
},

deposit: {
  titik: [
    { t: "Sebelum pengumuman hibah 2018", v: 73, p: 122, jenis: "fakta" },
    { t: "Akhir 2019", v: 69, p: 122, jenis: "fakta" },
    { t: "Akhir 2020", v: 76, p: 122, jenis: "fakta" },
    { t: "2022 (semasa RCI)", v: 88, p: 218, jenis: "fakta" },
    { t: "Unjuran 2 tahun lagi", v: 100, p: 218, jenis: "unjuran" }
  ],
  tumpuan: [
    { label: "Deposit dipegang oleh 5% pendeposit terbesar", nilai: "75%", p: 216 },
    { label: "Pendeposit yang menyimpan RM2,000 atau kurang", nilai: "65% daripada pendeposit", p: 207 }
  ],
  bilion: 88,
  bilionP: 32
},

zakat: [
  { t: "1979", e: "Konsep Mudarabah digunakan untuk membayar zakat bagi pendeposit", p: 106 },
  { t: "2016", e: "Akad deposit ditukar kepada Wadi'ah Yad Dhamanah — tiada penjelasan rasmi mengapa", p: 107 },
  { t: "Dis 2019", e: "Akad ditukar kepada Wakalah", p: 109 },
  { t: "26 Jun 2019", e: "BNM menulis kepada Perdana Menteri berhubung isu zakat", p: 108 }
],

/* ============================== TADBIR URUS ============================== */

menteri: [
  { nama: "Jamil Khir Baharom", mula: 2009.1, tamat: 2018.35, catatan: "Mejar Jeneral (B); 10 Feb 2009 – 9 Mei 2018", p: 56 },
  { nama: "PM Mahathir (interim)", mula: 2018.35, tamat: 2018.5, catatan: "10 Mei – 1 Jul 2018 — kuasa Menteri dijalankan PM", p: 56 },
  { nama: "Mujahid Yusof Rawa", mula: 2018.5, tamat: 2020.18, catatan: "2 Jul 2018 – 9 Mac 2020", p: 56 },
  { nama: "Zulkifli Mohamad al-Bakri", mula: 2020.18, tamat: 2021.65, catatan: "10 Mac 2020 – 29 Ogos 2021", p: 56 },
  { nama: "Idris Ahmad", mula: 2021.65, tamat: 2022.6, catatan: "30 Ogos 2021 – sehingga kini", p: 56 }
],

pengerusi: [
  { nama: "Abdul Azeez Abdul Rahim", mula: 2013.5, tamat: 2018.39, catatan: "Ahli Parlimen Baling; 1 Jul 2013 – 23 Mei 2018", p: 59 },
  { nama: "Md Nor Md Yusof", mula: 2018.52, tamat: 2021.78, catatan: "10 Jul 2018 – 15 Okt 2021 (ditamatkan awal)", p: 59 },
  { nama: "Azman Mokhtar", mula: 2021.97, tamat: 2022.6, catatan: "20 Dis 2021 – sehingga kini", p: 60 }
],

ceo: [
  { nama: "Ismee Ismail", mula: 2006, tamat: 2016.5, catatan: "1 Jan 2006 – 30 Jun 2016", p: 65 },
  { nama: "Johan Abdullah", mula: 2016.5, tamat: 2018.5, catatan: "1 Jul 2016 – 30 Jun 2018", p: 65 },
  { nama: "Zukri Samat", mula: 2018.52, tamat: 2019.65, catatan: "10 Jul 2018 – 31 Ogos 2019", p: 65 },
  { nama: "Nik Mohd Hasyudeen Yusoff", mula: 2019.66, tamat: 2021.34, catatan: "1 Sep 2019 – 5 Mei 2021 (ditamatkan awal)", p: 65 },
  { nama: "Amrin Awaluddin", mula: 2021.34, tamat: 2022.6, catatan: "6 Mei 2021 – sehingga kini", p: 65 }
],

politisi: [
  { nama: "Abdul Azeez Abdul Rahim", jawatan: "Pengerusi LTH 2013–2018; Ahli Parlimen Baling; Ahli Majlis Tertinggi UMNO", p: 77 },
  { nama: "Badruddin Amiruldin", jawatan: "Anggota Lembaga 2005–2018; Pengerusi Tetap Perhimpunan Agong UMNO; bekas MP Yan", p: 77 },
  { nama: "Rosni Sohar", jawatan: "Anggota Lembaga 2014–2018; ADUN Hulu Bernam; Setiausaha Wanita UMNO", p: 77 }
],

kuasaMenteri: [
  "Melantik / membatalkan Pengerusi dan anggota Lembaga (tanpa perlu beri sebab untuk pembatalan)",
  "Menetapkan honorarium dan elaun anggota",
  "Memberi arahan am kepada LTH",
  "Melantik Ketua Pegawai Eksekutif dan meluluskan gaji/elaun CEO",
  "Menetapkan peraturan syarat perkhidmatan dan tatatertib",
  "Meluluskan pembiayaan / bantuan kewangan kepada syarikat",
  "Menetapkan peraturan deposit dan pengeluaran pendeposit",
  "Meluluskan setiap aktiviti pelaburan — dalam dan luar negara",
  "Memindahkan wang dari Kumpulan Wang Rizab",
  "Meluluskan pengisytiharan untung boleh diagih (hibah)",
  "Membuat peraturan di bawah Akta 535"
],
kuasaP: [57, 58],

penamatan: [
  { siapa: "Datuk Nik Mohd Hasyudeen Yusoff (CEO)", tarikh: "5 Mei 2021", nota: "Ditamatkan sebelum tamat tempoh sebenar (31 Ogos 2021). RCI: kedua-duanya memberi perkhidmatan baik dan sedang melaksanakan penambahbaikan.", p: 82 },
  { siapa: "Tan Sri Md Nor Md Yusof (Pengerusi)", tarikh: "15 Okt 2021", nota: "Ditamatkan sebelum tamat kontrak yang disambung 2 tahun (mulai 20 Julai 2020).", p: 82 }
],

direktorat: [
  { nama: "Datuk Rozaida Omar (CFO)", jumlah: 23, nota: "Pegangan jawatan proksi mewakili LTH", p: 89 },
  { nama: "Johan Abdullah (CEO 2016–2018)", jumlah: 18, nota: "Termasuk Pengerusi TH Heavy Engineering, Trurich, Deru Semangat", p: 86 },
  { nama: "Noordin Sulaiman (ALP)", jumlah: 11, nota: "Pengerusi 5 syarikat + ALP 6 syarikat", p: 85 },
  { nama: "Abdul Azeez (Pengerusi 2013–2018)", jumlah: 8, nota: "TH Real Estate, THHR, Putrajaya Perdana, The Edge dll.", p: 84 },
  { nama: "Ismee Ismail (CEO 2006–2016)", jumlah: 7, nota: "THP, Trurich, BIMB, Bank Islam, Takaful dll.", p: 85 },
  { nama: "Zukri Samat (CEO 2018–2019)", jumlah: 4, nota: "Pengerusi THP, TH Estates, TH Properties", p: 87 }
],

bonusStaff: {
  tahun: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
  peruntukan: [25, 35, 38, 49, 74, 65, 25, 56.7, 10.8, 11.6, 14.1],
  taburan: ["2–6", "2–6", "2.5–8", "2.5–10", "1–11 + 2 khas", "1–10", "1–3", "1–6", "1", "1", "1"],
  p: 137,
  nota: "Pekeliling Perbendaharaan WP 7.2: siling lazim tidak lebih 2 bulan gaji (boleh lebih jika prestasi cemerlang); kelulusan tiga peringkat — Lembaga, Kementerian Pengawal, MOF. 2014: sehingga 13 bulan gaji (1–11 bulan + 2 bulan bonus khas), peruntukan RM74 juta."
},

bonusProfit: {
  tahun: [2013, 2014, 2015, 2016, 2017],
  untung: [2634, 2979, 3537, 2481, 2798],
  bonus: [49, 74, 61, 25, 57],
  p: 139,
  nota: "Bonus tinggi ini dibayar pada tahun yang sama LTH sebenarnya tidak solven (nilai aset kurang daripada liabiliti). Mulai FY2018, bonus dikawal mengikut kemampuan kewangan LTH."
},

bonusTHP: {
  thp2017: {
    jumlah: 1148400,
    penerima: [
      ["Datuk Azizan Abdul Rahman", 231000],
      ["Dato' Roszali Othman", 189750],
      ["Haji Abd Kadir Sahlan", 189750],
      ["Nik Badrul Hisham Nik Hassan", 99000],
      ["Anuarifaei Mustapa", 99000],
      ["Nur Adlan Taib", 99000],
      ["Zaidi Baharudin", 56100],
      ["Haji Mohamed Rahim Ismail", 52800],
      ["Aida Karim", 49500],
      ["Marhaizah Mohamed Yusuf", 49500],
      ["Dato' Mohd Fazillah Mohd Ali", 33000]
    ],
    p: 142,
    sebab: "Projek 'The Bay Pavilion' (Australia) dikatakan membawa AUD$11.6 juta sehingga Dis 2016. Diluluskan Mesyuarat Exco TH Properties 12 Apr 2017 — tanpa kuasa Lembaga/pemegang saham."
  },
  thp2018: {
    jumlah: 1045000,
    penerima: [
      ["Dato' Roszali Othman", 176500],
      ["Haji Abd Kadir Sahlan", 176500],
      ["Dato' Azizan Abdul Rahman", 167250],
      ["Nik Badrul Hisham Nik Hassan", 101500],
      ["Anuarifaei Mustapa", 101500],
      ["Nur Adlan Taib", 101500],
      ["Zaidi Baharudin", 63000],
      ["Aida Karim", 63000],
      ["Marhaizah Mohamed Yusuf", 63000],
      ["Haji Mohamed Rahim Ismail", 31250]
    ],
    p: 143,
    sebab: "Diluluskan Lembaga THP Australia 23 Apr 2018; notifikasi pemegang saham tujuh bulan selepas resolusi — langgar s.230(3) Akta Syarikat 2016."
  },
  undang: "Bonus 2017 melanggar s.230(2) dan s.230(4) Akta Syarikat 2016 (perlu resolusi pemegang saham); bonus 2018 melanggar s.230(3). Keputusan memulihkan bonus: 12 Ogos 2020.",
  undangP: [143, 144, 190]
},

bnm: [
  { t: "21 Ogos 2014", e: "Surat BNM kepada Pengerusi LTH — teguran berhubung pengambilan deposit & pengurusan kecairan", p: 100 },
  { t: "19 Dis 2014", e: "Surat lanjutan — pengambilan deposit & pengurusan kecairan", p: 212 },
  { t: "23 Dis 2015", e: "Surat kepada Pengerusi LTH dan Menteri — kemampuan LTH membayar hibah tinggi dipersoal", p: 100 },
  { t: "14 Dis 2016", e: "Surat lanjutan — tekanan rizab", p: 212 },
  { t: "17 Feb 2017", e: "Surat — keperluan merumus dasar rizab; isu dibangkitkan dengan Perdana Menteri", p: 212 },
  { t: "1 Jan 2019", e: "LTH diletakkan di bawah kawal selia BNM (keputusan Jemaah Menteri 7 Dis 2018)", p: 100 }
],

/* ============================== INTEGRITI & PENGUATKUASAAN ============================== */

laporanPolis: [
  { ref: "Dang Wangi/31347/2018", t: "30 Nov 2018", oleh: "Idrus Ismail (mantan Setiausaha Syarikat LTH)", isi: "Aktiviti / penggunaan dana Yayasan Tabung Haji didakwa melanggar memorandum dan artikel persatuan (M&A)", status: "Siasatan selesai; dirujuk ke Jabatan Peguam Negara untuk keputusan pendakwaan", p: 194 },
  { ref: "Dang Wangi/31331/2018", t: "30 Nov 2018", oleh: "LTH", isi: "Penjualan 95% ekuiti THIP kepada PT Borneo Pacific (2012, ~USD910 juta) — disyaki salah nyata & penyembunyian maklumat", status: "Siasatan PDRM berterusan (rentas sempadan Indonesia)", p: 194 },
  { ref: "Dang Wangi/32724/2018", t: "13 Dis 2018", oleh: "Aliatun Mahmud (mantan Setiausaha Trurich)", isi: "Laporan kesesuaian tanah 40,880 ha (Kalimantan) didakwa dimanipulasi — Trurich terpedaya membeli ladang ~USD58 juta (2008–2009)", status: "Siasatan; menunggu kebenaran siasatan rentas sempadan Indonesia", p: 195 },
  { ref: "Dang Wangi/1484/2019", t: "16 Jan 2019", oleh: "Idrus Ismail (mantan Setiausaha Syarikat LTH)", isi: "Pengisytiharan hibah FY2017 didakwa melanggar s.22 Akta 535; kertas kerja Mesyuarat Khas 6 & 9 Feb 2018 dikatakan mengelirukan", status: "Siasatan selesai; dirujuk ke Jabatan Peguam Negara", p: 196 }
],

sprm: [
  { isi: "Pembelian Ladang Weida Bhd oleh TH Plantations — disyaki rasuah", status: "Dalam siasatan", p: 201 },
  { isi: "Penyewaan Restoran Opah, KL Sentral — disyaki penyelewengan / salah guna kuasa", status: "Dalam siasatan", p: 201 },
  { isi: "Penyewaan Restoran Nasi Dalca, Bangunan Ibu Pejabat LTH — disyaki penyelewengan", status: "Dalam siasatan", p: 201 },
  { isi: "Pengubahsuaian oleh bekas Ketua Pegawai Operasi LTH — disyaki penyelewengan/rasuah", status: "Dalam siasatan", p: 202 },
  { isi: "Pemalsuan dokumen bekalan anak benih getah di Ladang TH-Usia Jatimas, Sandakan", status: "Dalam siasatan", p: 202 },
  { isi: "Salah laku / penyelewengan pegawai THP Bina & THP Timur (anak syarikat TH Properties)", status: "Dalam siasatan", p: 202 }
],

disiplin: {
  pegawai: ["Datuk Rozaida Omar (CFO)", "Dato' Adi Azuan Abdul Ghani (COO)", "Rifina Md Ariff (PBS Korporat)", "Mohd Hisham Harun (PBS Sumber Manusia)", "Hazlina Mohd Khalid (Penasihat Undang-Undang)"],
  kluster: [
    { tajuk: "Penjualan saham THIP", butiran: "Surat pertuduhan 29 Mei 2020 kepada 4 pegawai (Rozaida, Rifina, Mohd Hisham, Hazlina). Jawatankuasa Tatatertib 21 Apr 2021: BUANG KERJA semua; Rayuan 6 Sep 2021: dikurangkan kepada turun pangkat.", p: 198 },
    { tajuk: "Sumbangan RM22.12 juta kepada Yayasan TH tanpa kelulusan awal", butiran: "Surat pertuduhan 15 & 19 Mac 2019 kepada Rozaida, Adi Azuan, Mohd Hisham. TT 31 Mei 2019 & 1 Nov 2019: turun pangkat; Rayuan: dikurangkan kepada amaran keras / amaran.", p: 198 },
    { tajuk: "Pengisytiharan hibah FY2017", butiran: "Surat pertuduhan 3 Jan 2020 kepada Rozaida. TT 16 Apr 2021: BUANG KERJA; Rayuan 6 Sep 2021: turun pangkat.", p: 199 },
    { tajuk: "Tuntutan maklumat palsu", butiran: "Surat pertuduhan 11 Jan 2019 kepada Hazlina. TT 1 Nov 2019: turun pangkat; Rayuan 28 Jan 2020: kekal turun pangkat.", p: 199 }
  ],
  kesimpulan: "Kesemua 5 pegawai masih bekerja (dalam jawatan lain). Proses tatatertib lambat: sehingga 19 bulan (kluster 2), 15 bulan (kluster 3), 10 bulan (kluster 4).",
  p: [198, 200]
},

mahkamah: [
  { kes: "THIP vs PT Borneo Pacific", isi: "Pertikaian penjualan ladang Indonesia; laporan polis + siasatan; timbang tara/persekitaran undang-undang Indonesia", status: "Dalam siasatan PDRM", p: 202 },
  { kes: "Al-Rawda (4 hotel Mekah & Madinah)", isi: "Tunggakan sewa SR560.7 juta; 9 tindakan PN vs Al-Rawda + 7 vs penjamin; Al-Rawda cabar perjanjian atas alasan syariah", status: "Timbang tara; likuidasi aset penjamin sedang berjalan", p: 202 },
  { kes: "Emrail", isi: "Baki put RM18.3 juta tidak dibayar; writ Mahkamah Tinggi 8 Sep 2021; daftar AIAC 22 Apr 2022", status: "Timbang tara", p: 179 },
  { kes: "Wellspring", isi: "Perintah Mahkamah 5 Okt 2018: bayar RM20.8 juta — tidak dibayar", status: "Notis kebankrapan dibenarkan 25 Jan 2022", p: 180 }
],

/* ============================== CADANGAN RCI ============================== */

cadangan: [
  { no: 1, tema: "Undang-undang", ringkas: "Pinda Akta 535: (a) kriteria & kaedah pemilihan anggota Lembaga; (b) bidang kepakaran ditetapkan; (c) larang ahli politik aktif; (d) rujuk badan penasihat bebas sebelum buang anggota; (e) beri sebab munasabah sebelum penamatan; (f) kanun Jawatankuasa Urusan Haji, Penasihat Syariah & Panel Pelaburan; (g) asas kiraan hibah jelas (penyata beraudit, piawaian MIA); (h) tubuh 'Dana Haji' dikawal Suruhanjaya Sekuriti; (i) kecualikan LTH daripada Akta 240", p: 230 },
  { no: 2, tema: "Struktur", ringkas: "Menteri Hal Ehwal Agama urus haji; Menteri Kewangan urus kewangan, dana & pelaburan. Pelantikan anggota Lembaga & CEO oleh Perdana Menteri atas syor badan penasihat bebas", p: 231 },
  { no: 3, tema: "Struktur", ringkas: "Hadkan penglibatan anggota Lembaga & pengurusan dalam pengurusan anak syarikat (elak konflik kepentingan)", p: 232 },
  { no: 4, tema: "Struktur", ringkas: "BNM tidak sepatutnya mengawal selia LTH; jika perlu, hadkan kepada kawalan rizab & pengurusan kecairan sahaja", p: 232 },
  { no: 5, tema: "Audit", ringkas: "Audit penyata kewangan LTH oleh firma akauntan swasta — bukan Jabatan Audit Negara", p: 232 },
  { no: 6, tema: "Undang-undang", ringkas: "Kadar hibah berdasarkan penyata kewangan tahunan beraudit, bukan laporan proforma; RAV tidak boleh dijadikan asas", p: 232 },
  { no: 7, tema: "Audit", ringkas: "Penyata kewangan patuh sepenuhnya piawaian pelaporan Akta 240 & PA 3.1", p: 233 },
  { no: 8, tema: "Kakitangan", ringkas: "Hentikan amalan bonus terlalu tinggi kepada kakitangan", p: 233 },
  { no: 9, tema: "Kakitangan", ringkas: "Dapatkan semula bonus yang diberi kepada Lembaga & Pengurusan TH Properties tanpa mematuhi peraturan", p: 233 },
  { no: 10, tema: "Penguatkuasaan", ringkas: "Audit forensik ke atas keputusan pelaburan lalu — 14 pelaburan bermasalah disenaraikan", p: 233 },
  { no: 11, tema: "Penguatkuasaan", ringkas: "Pihak berkuasa wajib bertindak tegas & segera ke atas setiap laporan polis/aduuan berkaitan salah laku LTH", p: 234 },
  { no: 12, tema: "Kakitangan", ringkas: "Permudah & segerakan proses tatatertib supaya berkesan, cekap, adil dan telus", p: 234 },
  { no: 13, tema: "Penguatkuasaan", ringkas: "Pantau rapat transaksi pelaburan dalam pertikaian mahkamah/timbang tara; pertingkatkan penyelesaian luar mahkamah", p: 234 },
  { no: 14, tema: "Zakat", ringkas: "Pastikan bayaran zakat dilaksanakan sempurna; perubahan akad simpanan dirujuk kepada Jawatankuasa Muzakarah MKI", p: 234 },
  { no: 15, tema: "Kerajaan & UJSB", ringkas: "Kerajaan ambil serius pelaksanaan Pelan Pemulihan 2018; jika LTH gagal, jaminan Kerajaan RM88 bilion (s.24 Akta 535) terpaksa diaktifkan — ancaman sistemik", p: 234 },
  { no: 16, tema: "Kerajaan & UJSB", ringkas: "Sukuk penstrukturan semula hendaklah boleh diniagakan (tradeable)", p: 235 },
  { no: 17, tema: "Kerajaan & UJSB", ringkas: "Penerbitan sukuk bukan hanya untuk LTH/Kerajaan — boleh ditawarkan kepada institusi kewangan lain", p: 235 },
  { no: 18, tema: "Kerajaan & UJSB", ringkas: "Kerajaan pastikan peruntukan RM1.73 bilion setahun untuk penebusan awal sukuk UJSB", p: 235 },
  { no: 19, tema: "Kerajaan & UJSB", ringkas: "UJSB galakkan penebusan awal sukuk hasil pelupusan aset", p: 235 },
  { no: 20, tema: "Haji & Pendeposit", ringkas: "Deposit minimum giliran haji dinaikkan RM1,300 → RM12,980; hadkan pengeluaran besar (notis sebulan); subsidi hanya untuk yang memerlukan", p: 235 },
  { no: 21, tema: "Haji & Pendeposit", ringkas: "Rancang bawa lebih ramai jemaah; gunakan sepenuhnya kuota tambahan Arab Saudi", p: 236 },
  { no: 22, tema: "Haji & Pendeposit", ringkas: "Naikkan minimum pendaftaran haji RM1,300 → RM12,980 — potong tempoh menunggu dari 130 tahun kepada 33 tahun", p: 236 },
  { no: 23, tema: "Struktur", ringkas: "Fungsi pelaburan dijalankan bebas & profesional; kekalkan dalam LTH sebagai jabatan 'Dana Haji' dikawal Suruhanjaya Sekuriti", p: 236 },
  { no: 24, tema: "Pelaburan", ringkas: "Fokus kepada portfolio pengurusan dana; elak pelaburan berisiko tinggi yang diklasifikasikan strategik", p: 236 },
  { no: 25, tema: "Pelaburan", ringkas: "Kerajaan perbaiki model perniagaan & pelaburan LTH secara menyeluruh; pengurusan profesional tanpa campur tangan politik", p: 237 }
],
cadanganTema: ["Undang-undang", "Struktur", "Audit", "Kakitangan", "Penguatkuasaan", "Zakat", "Kerajaan & UJSB", "Haji & Pendeposit", "Pelaburan"],

/* ============================== PETIKAN ============================== */

petikan: [
  { teks: "Sepertimana YAB Tun sedia maklum, Pendapat Berteguran telah dicadangkan terhadap Penyata Kewangan TH bagi tahun berakhir 31 Disember 2017 sekiranya tiada pelarasan dibuat untuk dua penemuan material... Bagaimanapun, hasil perbincangan tersebut, sekiranya Pendapat Berteguran diberikan, secara tidak langsung ianya akan mempengaruhi ekspektasi dan persepsi negatif pihak berkepentingan (stakeholder), khususnya pendeposit untuk terus menyimpan di TH. Dengan mengambil kira perkara tersebut, Pendapat Tanpa Teguran dengan 'Emphasis of Matter' telah diberikan pada 16 Julai 2018.", sumber: "Surat Ketua Audit Negara kepada Perdana Menteri, 19 Dis 2018", p: 133 },
  { teks: "Suruhanjaya mendapati wujudnya transaksi yang mencurigakan dan penyembunyian maklumat.", sumber: "Bab 3.14 — Pelaburan yang Bermasalah", p: 176 },
  { teks: "Semua dokumen menunjukkan kenyataan 'dipersetujui seperti dicadangkan'.", sumber: "Bab 3.14 — cara keputusan pelaburan diluluskan", p: 177 },
  { teks: "Dianggarkan 75% deposit di LTH dimiliki oleh hanya 5% daripada pendepositnya. Dengan kata lain, jumlah deposit LTH tertumpu kepada mereka yang menyimpan dan memiliki dana yang besar.", sumber: "Bab 3.18 — Pandangan Suruhanjaya", p: 216 },
  { teks: "Persoalannya, mengapa LTH terus memegang saham tersebut dan tidak menjualnya sehingga harganya telah turun dengan rendahnya. Ini menyebabkan LTH menanggung kerugian yang amat besar.", sumber: "Bab 3.14 — FGV Berhad", p: 193 },
  { teks: "Selagi bayaran haji yang dikenakan kepada jemaah haji ditetapkan pada kadar yang tidak munasabah, masalah peningkatan jumlah HAFIS akan berterusan.", sumber: "Bab 3.16 — Tanggungan Bantuan Kewangan Haji", p: 206 },
  { teks: "Apabila kos subsidi meningkat, jumlah dana yang lebih besar diperlukan dan pergantungan ke atas pendeposit besar akan bertambah.", sumber: "Bab 3.16 — Tanggungan Bantuan Kewangan Haji", p: 206 }
],

/* ============================== GLOSARI ============================== */

glosari: [
  { istilah: "Hibah", makna: "Keuntungan tahunan yang LTH kongsi dengan pendeposit — macam dividen bank, tetapi bukan dividen kerana kontraknya patuh syariah." },
  { istilah: "Rosot nilai (impairment)", makna: "Catatan kerugian dalam buku apabila nilai aset (misalnya saham) jatuh berbanding harga belian." },
  { istilah: "Aset vs Liabiliti", makna: "Aset = apa yang LTH miliki (saham, bangunan, wang). Liabiliti = apa yang LTH hutang (termasuk deposit pendeposit). Jika liabiliti lebih besar daripada aset, institusi dikira muflis teknikal." },
  { istilah: "Defisit / jurang", makna: "Kekurangan — hutang lebih besar daripada harta. Laporan RCI mendapati jurang ini wujud sejak 2014." },
  { istilah: "MFRS / FRS", makna: "Piawaian perakaunan yang menentukan cara institusi melaporkan kewangan supaya konsisten dan tidak boleh 'pilih-pilih' angka." },
  { istilah: "RAV (Realisable Asset Value)", makna: "Nilai aset yang 'boleh direalisasikan' — angka anggaran sendiri oleh pengurusan LTH, bukan nilai dalam penyata kewangan yang diaudit. Penggunaannya menyebabkan nilai aset kelihatan lebih tinggi." },
  { istilah: "Emphasis of Matter (EoM)", makna: "Nota amaran dalam laporan juruaudit — laporan audit tidak 'bersih sepenuhnya' tetapi juga tidak gagal." },
  { istilah: "Sijil Audit Bersih", makna: "Pengesahan juruaudit bahawa penyata kewangan memberi gambaran benar. LTH diberi sijil bersih 2014–2017 walaupun isu besar wujud." },
  { istilah: "Sukuk", makna: "Sijil hutang patuh syariah — LTH memberi pinjaman melalui sukuk dan menerima pulangan tetap. Sukuk UJSB: LTH 'menukar' aset bermasalah dengan janji hutang Kerajaan." },
  { istilah: "UJSB (Urusharta Jamaah Sdn. Bhd.)", makna: "Syarikat khas milik penuh Kerajaan yang ditubuhkan Dis 2018 untuk mengambil alih aset kurang berdaya saing LTH." },
  { istilah: "HAFIS (Bantuan Kewangan Haji)", makna: "Subsidi yang LTH tanggung supaya jemaah tidak perlu bayar kos haji penuh. Diambil daripada keuntungan pelaburan — bukan duit kerajaan." },
  { istilah: "Muassasah", makna: "Jemaah haji yang berdaftar melalui LTH (kuota rasmi Malaysia)." },
  { istilah: "Akad", makna: "Kontrak dalam Islam. Deposit LTH pernah menggunakan akad Mudarabah (perkongsian untung), kemudian Wadi'ah Yad Dhamanah (simpanan) dan Wakalah (perwakilan)." },
  { istilah: "Put Option", makna: "Hak untuk menjual semula saham kepada penjual asal pada harga tertentu — perlindungan jika harga jatuh atau janji tidak ditepati." },
  { istilah: "AFS (Available-for-Sale)", makna: "Klasifikasi saham yang dipegang untuk dijual — perubahannya memberi kesan kepada polisi rosot nilai." },
  { istilah: "ROFR (Hak Penolakan Pertama)", makna: "Hak LTH untuk membeli semula aset yang telah dipindahkan kepada UJSB sebelum dijual kepada orang lain." },
  { istilah: "NOPE", makna: "Dasar sawit tanpa penebangan hutan, tanpa gambut, tanpa eksploitasi — pelanggarannya menyebabkan pembeli besar enggan beli hasil ladang." },
  { istilah: "ECL (Expected Credit Loss)", makna: "Anggaran kerugian yang dijangka jika penghutang tidak membayar — kaedah standard perakaunan untuk mengukur risiko." },
  { istilah: "Siling hutang negara", makna: "Had jumlah hutang Kerajaan dibenarkan oleh undang-undang, diukur sebagai peratusan KDNK (55% → 65%)." },
  { istilah: "Hurdle rate", makna: "Kadar pulangan minimum yang diperlukan oleh LTH supaya pelaburannya berbaloi — ditetapkan kadar deposit Islam + 0.75%." },
  { istilah: "Bank run", makna: "Keadaan ramai pendeposit serentak menarik keluar wang kerana hilang keyakinan — boleh memusnahkan institusi kewangan." },
  { istilah: "Akta 535", makna: "Akta Tabung Haji 1995 — undang-undang yang mengawal LTH. RCI mencadangkan pindaan besar." },
  { istilah: "Kumpulan Wang Rizab", makna: "Simpanan kecemasan LTH. Rizab digunakan untuk membayar hibah pada 2012, 2014, 2016, 2020 dan 2021 — tanda keuntungan tidak mencukupi." },
  { istilah: "Zakat", makna: "Kewajipan Islam. LTH membayar zakat bagi pendeposit — sebab utama ramai menyimpan di LTH." },
  { istilah: "Subsidi silang", makna: "Keuntungan daripada dana pelaburan digunakan untuk menampung kos operasi haji — mengurangkan keuntungan yang boleh dikongsi dengan pendeposit." }
]

};
