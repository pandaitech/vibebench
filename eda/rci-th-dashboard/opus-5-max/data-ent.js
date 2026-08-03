/* ==========================================================================
   data-ent.js — Entiti, orang, kronologi, amaran, pelaburan, syor, glosari,
   dan daftar percanggahan. Diekstrak daripada Laporan RCI Tabung Haji.
   ========================================================================== */
var RD = (window.RD = window.RD || {});

/* --------------------------------------------------------------------------
   PELABURAN BERMASALAH — 14 kes yang disyorkan untuk audit forensik
   (p177–193; senarai p234)
   -------------------------------------------------------------------------- */
RD.pelaburan = [
  {
    id: 'thip', n: 'PT TH Indo Plantations (THIP)', sektor: 'Perladangan', lokasi: 'Riau, Sumatera, Indonesia',
    p: [177, 178, 194], status: 'polis',
    modus: 'Penjualan aset', pegangan: '95% ekuiti LTH dijual kepada PT Borneo Pacific',
    skala: { label: 'Harga jualan asal', v: 910, mata: 'USD juta' },
    angka: [
      { k: 'Keluasan tanah', v: '83,000 hektar' },
      { k: 'Harga asal', v: 'USD910 juta (dianggarkan)' },
      { k: 'Pengurangan harga', v: 'USD100 juta' },
      { k: 'Pendahuluan diberi LTH', v: 'USD178.6 juta' }
    ],
    isu: 'Syer dipindahkan kepada pembeli SEBELUM bayaran penuh diterima; harga dikurangkan USD100 juta ' +
         'daripada USD910 juta; LTH tidak menerima bayaran ikut jadual asal dan terpaksa memberi ' +
         'pendahuluan USD178.6 juta yang sepatutnya dilunaskan oleh pembeli.',
    tindakan: 'Siasatan dalaman + siasatan forensik oleh peguam; laporan polis (Dang Wangi/31331/2018, 30 Nov 2018) ' +
              'masih dalam siasatan PDRM. Siasatan rentas sempadan memerlukan kebenaran pihak berkuasa Indonesia. ' +
              'Juga isu tatatertib Kluster Pertama dan prosiding timbang tara.',
    rugiRm: null
  },
  {
    id: 'emrail', n: 'Emrail Sdn. Bhd.', sektor: 'Kejuruteraan / kereta api', lokasi: 'Malaysia',
    p: [178, 179], status: 'timbangtara',
    modus: 'Put option gagal', pegangan: '15.3% ekuiti dibeli 7 Jun 2016',
    skala: { label: 'Rosot nilai', v: 19.3, mata: 'RM juta' },
    angka: [
      { k: 'Bayaran pembelian', v: 'RM20.17 juta' },
      { k: 'Harga put option', v: 'RM20.3 juta' },
      { k: 'Diterima daripada penjual', v: 'RM2 juta' },
      { k: 'Rosot nilai (31 Dis 2020)', v: 'RM19.3 juta' }
    ],
    isu: 'Penyenaraian awam Emrail dibatalkan dan sasaran keuntungan RM36.1 juta (2016) tidak dicapai. ' +
         'LTH melaksanakan Hak Opsyen Jual terhadap Lingkaran Hartaniaga Sdn. Bhd. (LHSB), ' +
         'tetapi LHSB hanya bayar RM2 juta daripada RM20.3 juta.',
    tindakan: 'Writ di Mahkamah Tinggi KL (8 Sep 2021); mahkamah arahkan proses timbang tara. ' +
              'Didaftarkan di AIAC pada 22 April 2022; pemilihan penimbang tara masih berjalan.',
    rugiRm: 19.3, laburRm: 20.17
  },
  {
    id: 'wellspring', n: 'Wellspring Worldwide Limited', sektor: 'Teknologi / perkhidmatan', lokasi: 'Malaysia',
    p: [179, 180], status: 'mahkamah',
    modus: 'Put option gagal', pegangan: '10.0% ekuiti dibeli 21 Sep 2014',
    skala: { label: 'Rosot nilai', v: 19.03, mata: 'RM juta' },
    angka: [
      { k: 'Bayaran pembelian', v: 'RM18.4 juta' },
      { k: 'Harga put option', v: 'RM19.03 juta' },
      { k: 'Diterima', v: 'RM0' },
      { k: 'Perintah mahkamah (5 Okt 2018)', v: 'RM20.8 juta' }
    ],
    isu: 'Syarikat gagal disenaraikan di Bursa Malaysia. Promoters (Mohamed Ridzuan Nor Mohamed dan ' +
         'Andy Farouk Muhamad Nasim) gagal membuat SEBARANG bayaran walaupun diperintah mahkamah.',
    tindakan: 'Rosot nilai penuh RM19.03 juta (31 Dis 2019). Notis kebankrapan terhadap Promoters ' +
              'dibenarkan mahkamah pada 25 Januari 2022.',
    rugiRm: 19.03, laburRm: 18.4
  },
  {
    id: 'dssb', n: 'Deru Semangat Sdn. Bhd. (DSSB)', sektor: 'Perladangan kelapa sawit', lokasi: 'Mukim Tembeling, Pahang',
    p: [180, 181], status: 'selesai',
    modus: 'Usaha sama', pegangan: '55% ekuiti daripada pemilik asal',
    skala: { label: 'Dikeluarkan lalu dirosotnilai ke RM32j', v: 257, mata: 'RM juta' },
    angka: [
      { k: 'Kelulusan pelaburan', v: 'RM526.16 juta' },
      { k: '— ambil alih 55% ekuiti', v: 'RM231.00 juta' },
      { k: '— pembiayaan ladang', v: 'RM295.16 juta' },
      { k: 'Benar-benar dikeluarkan', v: 'RM257 juta' },
      { k: 'Dirosotnilai kepada', v: 'RM32 juta' },
      { k: 'Diselesaikan (pulangan saham + pembiayaan)', v: 'RM259 juta' },
      { k: 'Komitmen baki dikenepikan', v: 'RM258 juta' }
    ],
    isu: 'Pembangunan ladang melibatkan pembalakan hutan simpan, menyebabkan LTH dan THP melanggar polisi ' +
         '"No Deforestation, No Peat and No Exploitation" (NDPE) pembeli utama Wilmar International — ' +
         'maka hasil kelapa sawit tidak dapat dijual. Pelaburan RM257 juta dirosotnilai kepada RM32 juta.',
    tindakan: 'LTH merungkaikan pegangan ekuiti kepada YAM Tengku Muda Pahang dengan bayaran keseluruhan RM259 juta; ' +
              'baki komitmen RM258 juta (ekuiti RM71 juta + pembiayaan RM187 juta) dikenepikan.',
    rugiRm: 225, rugiRmNota: 'Data terbitan: RM257 juta dikeluarkan − RM32 juta nilai selepas rosot nilai.', laburRm: 257
  },
  {
    id: 'trurich', n: 'Trurich Resources Sdn. Bhd.', sektor: 'Perladangan kelapa sawit', lokasi: 'Kalimantan, Indonesia',
    p: [181, 182, 195], status: 'polis',
    modus: 'Usaha sama', pegangan: 'Usaha sama dengan Felda Global Ventures Kalimantan Sdn. Bhd. (30 Nov 2009)',
    skala: { label: 'Rosot nilai penuh', v: 364.31, mata: 'RM juta' },
    angka: [
      { k: 'Pelaburan LTH (rosot nilai penuh)', v: 'RM364.31 juta' },
      { k: 'Pinjaman Trurich kepada Maybank', v: 'USD179 juta tertunggak' },
      { k: 'Liabiliti semasa bersih 31 Dis 2017', v: 'RM119.67 juta' },
      { k: 'Liabiliti semasa bersih 31 Dis 2018', v: 'RM92.78 juta' },
      { k: 'Sasaran tanah asal', v: 'sehingga 200,000 hektar' }
    ],
    isu: 'Usaha sama tidak memberi hasil; Trurich menjadi insolven. Laporan polis (Dang Wangi/32724/2018, ' +
         '13 Dis 2018) mendakwa laporan kesesuaian tanah dimanipulasi bagi menjustifikasi potensi tanah ' +
         '40,880 hektar di Kalimantan Utara dan Tengah, bernilai sekitar USD58 juta (2008–2009).',
    tindakan: 'Laporan polis oleh anggota Lembaga Pengarah. Menteri meluluskan pelupusan anak syarikat Trurich ' +
              '(22 Dis 2020); urusan diserahkan kepada FGV dan Maybank. Pembeli akhir: PT Karya Teknik Agro.',
    rugiRm: 364.31, laburRm: 364.31
  },
  {
    id: 'abraj', n: 'Abraj Sdn. Bhd.', sektor: 'Hartanah', lokasi: 'Malaysia',
    p: [182, 183], status: 'selesai',
    modus: 'Usaha sama', pegangan: 'Usaha sama 50/50 dengan Amanah Raya Berhad (11 Nov 2009)',
    skala: { label: 'Rosot nilai', v: 40.25, mata: 'RM juta' },
    angka: [
      { k: 'Jumlah pegangan ekuiti', v: 'RM85 juta' },
      { k: 'Rosot nilai', v: 'RM40.25 juta' },
      { k: 'Pelupusan 50% pegangan', v: 'Disember 2020, kepada Amanah Raya Berhad' }
    ],
    isu: 'Sejak 2015 syarikat usaha sama tidak mampu menjana pendapatan cukup untuk membayar pinjaman bank. ' +
         'Keadaan bertambah buruk apabila salah satu penyewa utama berpindah.',
    tindakan: 'Cari penyewa baru, penstrukturan semula pembiayaan, akhirnya jual 50% pegangan kepada ' +
              'Amanah Raya Berhad pada Disember 2020.',
    rugiRm: 40.25, laburRm: 85
  },
  {
    id: 'ppb', n: 'Putrajaya Perdana Berhad (PPB)', sektor: 'Pembinaan', lokasi: 'Malaysia',
    p: [183, 184], status: 'pantau',
    modus: 'Put option gagal', pegangan: '30% ekuiti dibeli Disember 2014',
    skala: { label: 'Rosot nilai', v: 145.3, mata: 'RM juta' },
    angka: [
      { k: 'Bayaran pembelian 30%', v: 'RM193.50 juta' },
      { k: 'Harga put option (7 Mac 2018)', v: 'RM210.7 juta' },
      { k: 'Rosot nilai (31 Dis 2020)', v: 'RM145.3 juta' },
      { k: 'Nilai buku bersih pegangan LTH', v: 'RM48.2 juta' },
      { k: 'Sasaran keuntungan 2015 tidak dicapai', v: 'RM86 juta' }
    ],
    isu: 'Objektif LTH ialah merealisasikan nilai melalui penyenaraian awam dalam tempoh setahun. ' +
         'PPB gagal disenaraikan dan gagal capai sasaran keuntungan. Cendana Destini Sdn. Bhd. (CDSB) ' +
         'gagal membayar put option RM210.7 juta.',
    tindakan: 'Kelulusan Portfolio Review Committee LTH (12 Nov 2020) untuk tindakan undang-undang; ' +
              'CDSB kemudian kemuka cadangan penyelesaian baharu (15 Jan 2021). Proses kelulusan dalaman ' +
              'terhadap Cadangan Pengaturan Penyelesaian sedang berjalan.',
    rugiRm: 145.3, laburRm: 193.5
  },
  {
    id: 'alrawda', n: 'Al-Rawda Real Estates Development & Project Management', sektor: 'Hotel / pajakan', lokasi: 'Makkah & Madinah, Arab Saudi',
    p: [184, 185, 186, 187], status: 'timbangtara',
    modus: 'Pajakan jangka panjang', pegangan: 'Penerima pajakan/sub-pajakan 4 hotel, 10–18 tahun',
    skala: { label: 'Jangkaan kerugian kredit', v: 202.8, mata: 'RM juta' },
    angka: [
      { k: 'Nilai perjanjian dibayar LTH', v: 'SR1,426 juta' },
      { k: 'Pendapatan sewa dijangka', v: 'SR2,490 juta' },
      { k: 'Sewa tertunggak (31 Dis 2021)', v: 'SR560.7 juta' },
      { k: '9 tindakan Nota Janji vs Al-Rawda', v: 'SR344.0 juta' },
      { k: '7 tindakan vs penjamin peribadi', v: 'SR255.1 juta' },
      { k: 'Pelan penyelesaian April 2021', v: 'SR1,748 juta' },
      { k: 'Tawaran balas Al-Rawda (ditolak)', v: 'SR968.0 juta' },
      { k: 'Jangkaan kerugian kredit (31 Dis 2020)', v: 'RM202.8 juta' },
      { k: 'Rosot nilai tambahan dijangka FY2021', v: 'RM184 juta' }
    ],
    isu: 'Empat hotel: Al-Aqiq, Al-Haram, Al-Saha (Madinah) dan Rawdat Al-Bait (Makkah) untuk penginapan ' +
         'jemaah haji/umrah. Al-Rawda dilantik SEKALIGUS sebagai pengendali hotel. Sejak Mac 2019 ' +
         'Al-Rawda gagal membayar pendapatan sewa. Semasa rundingan, Al-Rawda kemuka notis timbang tara ' +
         'mendakwa Perjanjian Pengurusan dan Operasi bertentangan dengan syariah — dakwaan yang ' +
         'ditolak sekeras-kerasnya oleh LTH.',
    tindakan: 'Perintah penguatkuasaan Nota Janji diperoleh di Mahkamah Penguatkuasaan Arab Saudi. ' +
              'Al-Rawda dilarang berniaga; aset penjamin dibekukan; sekatan perjalanan dikenakan. ' +
              '20 hartanah di Jeddah, Madinah dan Makkah dikenal pasti untuk likuidasi (dijangka ' +
              'mengambil masa sehingga dua tahun). Timbang tara sedang berlangsung.',
    rugiRm: 202.8, laburRm: null, laburSr: 1426
  },
  {
    id: 'alfareeda', n: 'Al-Fareeda Residential Fund', sektor: 'Dana hartanah', lokasi: 'Arab Saudi',
    p: [188], status: 'hapus',
    modus: 'Dana diuruskan pihak luar', pegangan: '13.8% daripada dana SR550 juta, melalui Anfaal Capital',
    skala: { label: 'Hapus kira penuh', v: 63, mata: 'RM juta' },
    angka: [
      { k: 'Langganan LTH (21 Feb 2013)', v: 'SR76 juta ≈ RM63 juta' },
      { k: 'Peratus daripada dana', v: '13.8% (dana SR550 juta)' },
      { k: 'Status', v: 'Dihapus kira secara keseluruhan' }
    ],
    isu: 'Undang-undang baharu buruh dan imigresen Arab Saudi, kontraktor bermasalah, kenaikan harga bahan ' +
         'binaan dan kejatuhan harga minyak mentah. Dana dicairkan; semua aset di bawah Alinma Bank. ' +
         'Tiada perkembangan sejak 2017 dan PENGURUS DANA TIDAK DAPAT DIKESAN.',
    tindakan: 'Pelaburan dihapus kira sepenuhnya. Kerugian SR76 juta.',
    rugiRm: 63, laburRm: 63, laburSr: 76
  },
  {
    id: 'thp', n: 'TH Plantations Berhad (THP)', sektor: 'Perladangan (tersenarai)', lokasi: 'Malaysia / Indonesia',
    p: [188, 189], status: 'polis',
    modus: 'Tadbir urus anak syarikat', pegangan: 'Syarikat tersenarai milik LTH',
    skala: { label: 'Rosot nilai di peringkat LTH', v: 170, mata: 'RM juta' },
    angka: [
      { k: 'Sukuk dikeluarkan LTH untuk THP', v: 'RM1.2 bilion' },
      { k: 'Ladang THP yang produktif', v: '58% sahaja' },
      { k: 'Rosot nilai di peringkat LTH', v: 'RM170 juta' },
      { k: 'Laporan forensik PwC', v: '25 April 2019' }
    ],
    isu: 'PwC dapati pengurusan kanan dan Lembaga THP GAGAL memenuhi tanggungjawab fidusiari. ' +
         'Kegagalan dikenal pasti terutamanya dalam pengambilalihan Bumi Suria Ventures Sdn. Bhd., ' +
         'Maju Warisanmas Sdn. Bhd. dan PT Persada Kencana Prima. THP membiayai pembelian ladang ' +
         '2012–2014 dengan hutang, kemudian terpaksa jual estet untuk bayar hutang dan mengurangkan ' +
         'perbelanjaan perladangan — menyebabkan hasil sawit jatuh.',
    tindakan: 'Laporan kepada PDRM, SPRM dan Suruhanjaya Sekuriti Malaysia oleh Lembaga Pengarah THP. ' +
              'Siasatan SC dan PDRM masih berterusan. CEO THP diletakkan garden leave dan meletak jawatan ' +
              '20 Ogos 2018. Aduan berasingan ke SPRM mengenai pembelian Ladang Weida Bhd.',
    rugiRm: 170, laburRm: null
  },
  {
    id: 'thprop', n: 'TH Properties Sdn. Bhd.', sektor: 'Hartanah / pembinaan', lokasi: 'Malaysia / Australia',
    p: [189, 190, 144], status: 'pantau',
    modus: 'Bonus tanpa kelulusan', pegangan: 'Subsidiari milik penuh LTH (diperbadankan 31 Okt 1980)',
    skala: { label: 'Bonus istimewa tanpa kelulusan', v: 2.2, mata: 'RM juta' },
    angka: [
      { k: 'Bonus istimewa 2017 + 2018', v: 'RM2.2 juta' },
      { k: 'Struktur kumpulan', v: '26 subsidiari + 5 syarikat usaha sama' },
      { k: 'Keuntungan sebelum cukai 2017', v: 'RM34.84 juta' }
    ],
    isu: 'Bonus istimewa dibayar kepada Ahli Lembaga dan pengurusan tanpa kelulusan LTH sebagai pemegang ' +
         'ekuiti utama. Kelulusan Exco tidak mematuhi resolusi Lembaga TH Properties bertarikh 19 Ogos 2015 ' +
         '— Exco tidak diberi mandat memutuskan transaksi sedemikian.',
    tindakan: 'Siasatan dalaman 5 Feb 2020; firma guaman MD. Tajuddin & Co dilantik. Pada 12 Ogos 2020, ' +
              'Lembaga Pengarah TH Properties memutuskan untuk MENDAPATKAN KEMBALI bonus 2017–2018.',
    rugiRm: 2.2, laburRm: null
  },
  {
    id: 'thmarine', n: 'Alam Maritim Resources / Kumpulan TH Marine', sektor: 'Perkhidmatan marin', lokasi: 'Malaysia',
    p: [190, 191], status: 'pantau',
    modus: 'Usaha sama', pegangan: '51% ekuiti usaha sama, diluluskan Menteri 18 Jun 2015',
    skala: { label: 'Rosot nilai (ekuiti + pembiayaan)', v: 278, mata: 'RM juta' },
    angka: [
      { k: 'Jumlah pelaburan LTH', v: 'RM334 juta' },
      { k: '— ekuiti', v: 'RM198 juta (rosot nilai penuh)' },
      { k: '— pembiayaan', v: 'RM136 juta (RM80 juta dirosotnilai)' },
      { k: 'Nilai pelaburan usaha sama', v: 'USD20.27 juta' },
      { k: 'Aset', v: '6 AHTS usaha sama + 2 AHTS milik penuh' },
      { k: 'Dijangka diperoleh semula (PwC)', v: 'RM70.4 juta sahaja' }
    ],
    isu: 'Keseluruhan pelaburan ekuiti RM198 juta dirosotnilai; RM80 juta daripada RM136 juta pembiayaan ' +
         'juga dirosotnilai sehingga Disember 2021. PwC menganggarkan hanya RM70.4 juta boleh diperoleh semula ' +
         'daripada RM334 juta.',
    tindakan: 'PwC dilantik menilai kebolehpulihan pelaburan LTH dalam Kumpulan TH Marine.',
    rugiRm: 278, rugiRmNota: 'Data terbitan: ekuiti RM198j + pembiayaan dirosotnilai RM80j.', laburRm: 334
  },
  {
    id: 'thhr', n: 'TH Hotel & Residences Sdn. Bhd. (THHR)', sektor: 'Hotel', lokasi: 'Malaysia',
    p: [191, 192], status: 'pantau',
    modus: 'Aset pulangan rendah', pegangan: 'Subsidiari milik penuh LTH sejak Mei 2007',
    skala: { label: 'Nilai hartanah dipindah ke UJSB', v: 804.1, mata: 'RM juta' },
    angka: [
      { k: 'Nilai pemindahan hartanah ke UJSB', v: 'RM804.1 juta' },
      { k: 'Premium ke atas nilai buku LTH', v: '~55%' },
      { k: 'Pulangan aset yang dipindah', v: 'kurang daripada 2%' },
      { k: 'Sewa Kelana Jaya 2019', v: 'RM16.5 juta' },
      { k: 'Sewa Kelana Jaya 2020', v: 'RM6.2 juta (−62%)' },
      { k: 'Kerugian bersih selepas cukai', v: 'RM5.9 juta' }
    ],
    isu: 'Hotel dan kompleks haji di Alor Setar, Kuching, Pulau Pinang, Kuala Terengganu dan Kota Kinabalu ' +
         'dikenal pasti sebagai aset berpulangan rendah (<2%) dan dipindahkan ke UJSB. ' +
         'Hotel Movenpick Sepang dan Kompleks Haji Kelana Jaya tidak dipindahkan.',
    tindakan: 'Perjanjian Pemindahan Aset dengan UJSB, 28 Disember 2018.',
    rugiRm: null, laburRm: null
  },
  {
    id: 'fgv', n: 'FGV Berhad (dahulu Felda Global Ventures)', sektor: 'Perladangan (tersenarai)', lokasi: 'Malaysia',
    p: [192, 193], status: 'selesai',
    modus: 'Pelaburan IPO dipegang terlalu lama', pegangan: '7.5% selepas IPO 2012',
    skala: { label: 'Kerugian tidak nyata', v: 1058.94, mata: 'RM juta' },
    angka: [
      { k: 'Langganan IPO (9 Mei 2012)', v: '276 juta unit @ RM4.65' },
      { k: 'Langganan 26 Jun 2012', v: '273,579,700 unit @ RM4.55' },
      { k: 'Jumlah pelaburan IPO', v: 'RM1,253,742,809 @ purata RM4.58/unit' },
      { k: 'Jualan 28 Jun – 19 Jul 2012', v: '14,709,400 unit @ purata RM5.38 → untung RM11,739,835' },
      { k: 'Beli semula 23 Jul – 3 Okt 2012', v: '232,010,800 unit @ purata RM5.01 = RM116,202,310' },
      { k: 'Harga jatuh ke', v: 'RM0.885/unit' },
      { k: 'Kerugian tidak nyata', v: 'RM1,058,937,380' },
      { k: 'Diambil UJSB (9 Dis 2020)', v: '283,710,100 unit @ kos RM4.62' },
      { k: 'Jumlah kos dalam FGV', v: 'RM1,310,020,819' },
      { k: 'Harga pasaran Feb 2022', v: '~RM0.69/unit' }
    ],
    isu: 'Suruhanjaya bertanya secara langsung: mengapa LTH terus memegang saham FGV dan tidak menjualnya ' +
         'sehingga harga jatuh serendah itu? LTH "bernasib baik" kerana UJSB mengambil alih saham pada ' +
         'HARGA KOS, bukan harga pasaran. Jika tidak, LTH sepatutnya menanggung kerugian lebih kurang RM1.1 bilion.',
    tindakan: 'Saham dipindahkan kepada UJSB pada harga kos. Kerugian sebenar dipindahkan kepada UJSB (dan Kerajaan).',
    rugiRm: 1058.94, laburRm: 1310.02
  }
];

RD.pelaburanMeta = {
  p: [176, 177, 234],
  jumlahKes: 14,
  prosesRosak: [
    'Tiada koordinasi antara Ketua Pegawai Pelaburan, Ketua Kewangan Korporat, Ketua Pegawai Hartanah dan Ketua Bahagian Perbendaharaan.',
    'Aliran proses pelaburan tidak jelas; terlalu banyak lapisan pertimbangan.',
    'Keputusan setiap peringkat amat bergantung kepada nasihat Pengurusan Tertinggi LTH.',
    'Panel Pelaburan tidak menyemak cadangan pelaburan dengan secukupnya. Pengerusinya, Dato’ Mohzani, ' +
      'mengakui pendekatan yang digunakan "longgar dan tidak menyeluruh".',
    'Menteri bergantung sepenuhnya kepada memo Lembaga dan Pengurusan. Semua dokumen menunjukkan ' +
      'kenyataan "dipersetujui seperti dicadangkan".'
  ],
  dapatanUtama: 'Suruhanjaya mendapati wujudnya transaksi yang mencurigakan dan penyembunyian maklumat.',
  status: {
    polis: 'Laporan polis / siasatan penguatkuasaan',
    mahkamah: 'Tindakan mahkamah',
    timbangtara: 'Timbang tara',
    selesai: 'Sudah diselesaikan / dilupuskan',
    hapus: 'Dihapus kira sepenuhnya',
    pantau: 'Dalam pemantauan / rundingan'
  }
};

/* --------------------------------------------------------------------------
   ORANG & JAWATAN
   -------------------------------------------------------------------------- */
RD.jawatan = {
  p: [56, 59, 60, 61, 62, 63, 64, 65],
  siri: [
    {
      k: 'Menteri Hal Ehwal Agama', warna: 'sim',
      orang: [
        { n: "Mejar Jeneral (B) Dato' Seri Jamil Khir bin Haji Baharom", dari: '2009-02-10', hingga: '2018-05-09' },
        { n: 'Perdana Menteri Tun Dr. Mahathir bin Mohamad (memegang kuasa Menteri)', dari: '2018-05-10', hingga: '2018-07-01', khas: true },
        { n: 'Datuk Seri Dr. Mujahid bin Yusof Rawa', dari: '2018-07-02', hingga: '2020-03-09' },
        { n: 'Datuk Dr. Zulkifli bin Mohamad al-Bakri', dari: '2020-03-10', hingga: '2021-08-29' },
        { n: 'Datuk Haji Idris bin Ahmad', dari: '2021-08-30', hingga: null }
      ]
    },
    {
      k: 'Pengerusi Lembaga', warna: 'accent',
      orang: [
        { n: 'Datuk Seri Panglima Abdul Azeez bin Abdul Rahim', dari: '2013-07-01', hingga: '2018-05-23', politik: true },
        { n: 'Tan Sri Md Nor bin Md Yusof', dari: '2018-07-10', hingga: '2021-10-15', tamatAwal: true },
        { n: 'Tan Sri Azman bin Mokhtar', dari: '2021-12-20', hingga: null }
      ]
    },
    {
      k: 'Ketua Pegawai Eksekutif', warna: 'neutral',
      orang: [
        { n: 'Tan Sri Ismee bin Ismail', dari: '2006-01-01', hingga: '2016-06-30' },
        { n: 'Datuk Seri Johan bin Abdullah', dari: '2016-07-01', hingga: '2018-06-30' },
        { n: "Dato' Sri Zukri bin Samat", dari: '2018-07-10', hingga: '2019-08-31' },
        { n: 'Datuk Nik Mohd Hasyudeen bin Yusoff', dari: '2019-09-01', hingga: '2021-05-05', tamatAwal: true },
        { n: 'Datuk Sri Amrin bin Awaluddin', dari: '2021-05-06', hingga: null }
      ]
    },
    {
      k: 'Wakil Jabatan Perdana Menteri', warna: 'warn',
      orang: [
        { n: 'Tan Sri Othman bin Mahmood', dari: '2012-01-16', hingga: '2017-07-31' },
        { n: "Tan Sri Dato' Seri Mohd Zuki bin Ali", dari: '2017-08-01', hingga: '2019-04-16' },
        { n: 'Datuk Seri Hasnol Zam Zam bin Haji Ahmad', dari: '2019-06-11', hingga: '2020-02-01' },
        { n: 'Datuk Seri Mohd Sallehhuddin bin Hassan', dari: '2020-06-16', hingga: '2021-07-31' },
        { n: 'Datuk Jamil bin Rakon', dari: '2021-08-01', hingga: '2022-04-18' },
        { n: '(kosong — belum dilantik semasa laporan)', dari: '2022-04-19', hingga: null, kosong: true }
      ]
    },
    {
      k: 'Wakil Perbendaharaan', warna: 'bad',
      orang: [
        { n: 'Tan Sri Dr. Mohd Irwan Serigar bin Abdullah', dari: '2011-03-01', hingga: '2018-05-14' },
        { n: 'Tan Sri Ahmad Badri bin Mohd Zahir', dari: '2018-10-31', hingga: '2020-05-01' },
        { n: 'Datuk Seri Asri bin Hamidon', dari: '2020-06-15', hingga: null }
      ]
    }
  ],
  tamatAwalNota: 'Dua penamatan awal tanpa sebab menggunakan seksyen 6(5) Akta 535: KPE Nik Mohd Hasyudeen ' +
    '(5 Mei 2021, sepatutnya 31 Ogos 2021) dan Pengerusi Md Nor bin Md Yusof (15 Okt 2021, kontrak baru ' +
    'disambung dua tahun mulai 20 Julai 2020). Suruhanjaya: kedua-duanya "telah memberikan perkhidmatan yang baik ' +
    'dan sebenarnya sedang melaksanakan penambahbaikan terhadap LTH".',
  tamatAwalP: [16, 17, 82, 83]
};

RD.politik = {
  p: [77],
  orang: [
    { n: 'Datuk Seri Panglima Abdul Azeez bin Abdul Rahim', peranan: 'Anggota Lembaga 2011, Pengerusi 2013–2018',
      politik: 'Ahli Parlimen Baling; Ahli Majlis Tertinggi UMNO' },
    { n: "Tan Sri Dato' Paduka Haji Badruddin bin Amiruldin", peranan: 'Anggota Lembaga 2005–2018',
      politik: 'Ahli Parlimen Yan/Jerai 2004–2008; Pengerusi Tetap Perhimpunan Agong UMNO' },
    { n: 'Datuk Rosni binti Sohar', peranan: 'Anggota Lembaga 2014–2018',
      politik: 'ADUN Hulu Bernam; Ahli Majlis Kerja Tertinggi & Setiausaha Wanita UMNO Malaysia sejak 2013' }
  ],
  dapatan: 'Suruhanjaya: keputusan LTH seperti bayaran agihan keuntungan (hibah), penentuan bayaran haji, ' +
    'dan HAFIS "didorong oleh unsur-unsur politik". Syor: peruntukan khusus melarang ahli politik aktif ' +
    'daripada dilantik sebagai Pengerusi/anggota Lembaga LTH dan anak-anak syarikat.',
  dapatanP: [16, 78]
};

/* Jawatan dalam anak syarikat — kiraan (p84–p90) */
RD.anakSyarikat = {
  p: [84, 85, 86, 87, 88, 89, 90],
  had: { baru: 5, p: 90, nota: 'Dasar baharu LTH: hadkan pegangan jawatan anak syarikat kepada 5 sahaja.' },
  orang: [
    { n: 'Datuk Rozaida binti Omar', peranan: 'Ketua Pegawai Kewangan Kumpulan (2004–2021)', bil: 23, jenis: 'pengurusan',
      syarikat: ['Syarikat Takaful Malaysia', 'Pelikan International', 'BIMB Holdings', 'Premia Cards', 'TH Hotel & Residence', 'THV Management Services', '151 BPR One', '151 BPR Two', 'LTH Property Investment (L)', 'Leatherhead Properties', 'TH Heavy Engineering', 'Putrajaya Perdana', 'Millstream Property', 'LTH Property Holdings', 'LTH Property Holdings 2', 'LTH Property Holdings 3', 'LTH Property Holdings 4', 'LTH Residence', '10 Queen Street Place London', 'Wilton Property', 'Marston Development', 'Luton Investment', 'LTH Oxford'] },
    { n: 'Datuk Seri Johan bin Abdullah', peranan: 'KPE 2016–2018', bil: 18, jenis: 'kpe',
      syarikat: ['TH Heavy Engineering (Pengerusi)', 'Trurich Resources (Pengerusi)', 'Deru Semangat (Pengerusi)', 'TH Properties', 'TH Hotel & Residence', 'TH Plantations', 'Malakoff Corporation', 'LTH Property Holdings', 'LTH Property Holdings 2', 'Express Rail Link', 'YTL THP JV', 'Glomac Berhad', 'Yayasan Tabung Haji', 'Premia Cards', 'LTH Property Holdings 3', 'LTH Property Holdings 4', 'LTH Property Holdings 5', 'PT TH Felda Nusantara'] },
    { n: "Dato' Noordin bin Sulaiman", peranan: 'Anggota Lembaga 2018–kini', bil: 9, jenis: 'lembaga',
      syarikat: ['TH Hotel and Residence (Pengerusi)', 'TH Travel & Services (Pengerusi)', 'THV Management Services (Pengerusi)', 'Premia Cards (Pengerusi)', 'Theta Edge (Pengerusi)', 'TH Hotel Sarawak', 'Express Rail Link', 'Putrajaya Perdana', 'TH Alam Holding'] },
    { n: 'Datuk Seri Panglima Abdul Azeez bin Abdul Rahim', peranan: 'Pengerusi 2013–2018', bil: 8, jenis: 'lembaga',
      syarikat: ['TH Real Estate LLC (Pengerusi)', 'TH Hotel & Residence (Pengerusi)', 'Putrajaya Perdana (Pengerusi)', 'The Edge Berhad', 'Yayasan Tabung Haji', 'LTH Property Holdings 3', 'LTH Property Holdings 4', 'LTH Property Holdings 5'] },
    { n: 'Datuk Zaiton binti Mohd Hassan', peranan: 'Anggota Lembaga 2018–2020', bil: 7, jenis: 'lembaga',
      syarikat: ['TH Properties (Pengerusi)', 'THP Enstek Development', 'LTH Property Holdings', 'LTH Property Holdings 2', 'LTH Property Holdings 3', 'LTH Property Holdings 4', 'LTH Property 5'] },
    { n: 'Tan Sri Ismee bin Ismail', peranan: 'KPE 2006–2016', bil: 7, jenis: 'kpe',
      syarikat: ['TH Plantations', 'Trurich Resources', 'BIMB Holdings', 'Bank Islam Malaysia', 'Syarikat Takaful Malaysia', 'LTH Property Holdings', 'TH Travel'],
      nota: 'Terus memegang 3 jawatan (TH Plantations, Trurich, TH Travel & Services) sehingga Mei 2018 — ' +
            'hampir dua tahun SELEPAS tamat perkhidmatan pada 30 Jun 2016.' },
    { n: 'Datuk Nik Mohd Hasyudeen bin Yusoff', peranan: 'KPE 2019–2021', bil: 4, jenis: 'kpe',
      syarikat: ['Bank Islam Malaysia', 'BIMB Holdings', 'TH Plantations', 'TH Properties'] },
    { n: "Dato' Sri Zukri bin Samat", peranan: 'KPE 2018–2019', bil: 4, jenis: 'kpe',
      syarikat: ['TH Plantations (Pengerusi)', 'TH Estates Holding (Pengerusi)', 'TH Properties (Pengerusi)', 'Yayasan Tabung Haji'],
      nota: 'Memaklumkan Suruhanjaya bahawa beliau melepaskan jawatan-jawatan tersebut untuk mengelak konflik kepentingan.' },
    { n: "Tan Sri Dato' Paduka Haji Badruddin bin Amiruldin", peranan: 'Anggota Lembaga 2005–2018', bil: 3, jenis: 'lembaga',
      syarikat: ['TH Travel & Services', 'TH Hotel & Residence', 'TH Global Services'] },
    { n: 'Datuk Sri Amrin bin Awaluddin', peranan: 'KPE 2021–kini', bil: 3, jenis: 'kpe',
      syarikat: ['TH Plantations', 'TH Properties', 'Bank Islam Malaysia'] },
    { n: 'Encik Abd Kadir bin Sahlan', peranan: 'Ketua Pegawai Pelaburan 2010–2018', bil: 3, jenis: 'pengurusan',
      syarikat: ['TH Properties Group', 'Syarikat Perladangan Sabah Sarawak', 'BIMB Securities'] }
  ],
  dapatan: 'Penglibatan anggota Lembaga dan pengurusan tertinggi dalam anak syarikat menyebabkan mereka ' +
    'kurang fokus kepada tugas hakiki di LTH dan menimbulkan konflik kepentingan.',
  dapatanP: [90]
};

/* Jawatankuasa (p63, p64) */
RD.jawatankuasa = {
  p: [63, 64, 91, 92, 97, 98],
  asal: ['Jawatankuasa Audit', 'Jawatankuasa Risiko', 'Lembaga Tender', 'Jawatankuasa Urusan Haji',
    'Jawatankuasa Penasihat Syariah', 'Jawatankuasa Penamaan', 'Jawatankuasa Perkhidmatan',
    'Panel Pelaburan', 'Majlis Penasihat Haji', 'Jawatankuasa Penasihat Ibadah',
    'Jawatankuasa Tatatertib', 'Jawatankuasa Rayuan Tatatertib'],
  dimansuh: [
    { n: 'Panel Pelaburan', bila: 'Mei 2018',
      kesan: 'Diganti dengan Exco Perniagaan yang dipengerusikan Menteri Hal Ehwal Ekonomi — ' +
             'diakui saksi-saksi bahawa Exco Perniagaan TIDAK PERNAH BERFUNGSI. Kini telah diwujudkan semula.' },
    { n: 'Majlis Penasihat Haji', bila: '2018',
      kesan: 'Wujud sejak 1969 di bawah Akta 8. Diganti dengan Jawatankuasa Urusan Haji.' }
  ],
  baru2018: ['Jawatankuasa Penamaan dan Saraan', 'Jawatankuasa Tatatertib Kumpulan Pengurusan dan Eksekutif',
    'Jawatankuasa Tatatertib Kumpulan Bukan Eksekutif', 'Jawatankuasa Rayuan Kumpulan Pengurusan dan Eksekutif',
    'Jawatankuasa Rayuan Kumpulan Bukan Eksekutif', 'Jawatankuasa Penasihat Syariah', 'Jawatankuasa Urusan Haji'],
  dikanunkan: ['Panel Pelaburan', 'Jawatankuasa Penasihat Syariah', 'Jawatankuasa Urusan Haji'],
  masalah: 'Jawatankuasa penting tidak dikanunkan dalam Akta 535, jadi boleh dibubarkan secara pentadbiran sahaja.'
};

/* Kuasa Menteri (p78–79) → cadangan pembahagian (p81, p231) */
RD.kuasaMenteri = {
  p: [78, 79, 81, 231],
  senarai: [
    { k: 'Pelantikan & pembatalan Pengerusi Lembaga', jenis: 'tadbir', cadang: 'PM (atas syor badan bebas)' },
    { k: 'Pelantikan & pembatalan anggota Lembaga', jenis: 'tadbir', cadang: 'PM (atas syor badan bebas)' },
    { k: 'Menentukan honorarium & elaun anggota Lembaga', jenis: 'tadbir', cadang: 'Menteri Hal Ehwal Agama' },
    { k: 'Memberi arahan am kepada Lembaga', jenis: 'tadbir', cadang: 'Kedua-dua Menteri' },
    { k: 'Pelantikan Ketua Pegawai Eksekutif + gaji/elaun', jenis: 'tadbir', cadang: 'PM (atas syor badan bebas)' },
    { k: 'Meluluskan peraturan syarat perkhidmatan & tatatertib', jenis: 'tadbir', cadang: 'Menteri Hal Ehwal Agama' },
    { k: 'Meluluskan pembiayaan/bantuan kewangan kepada syarikat LTH', jenis: 'wang', cadang: 'Menteri Kewangan' },
    { k: 'Meluluskan peraturan deposit dan pengeluaran', jenis: 'wang', cadang: 'Menteri Kewangan' },
    { k: 'Meluluskan SETIAP aktiviti pelaburan LTH (dalam & luar negara)', jenis: 'wang', cadang: 'Menteri Kewangan' },
    { k: 'Menentukan pemindahan wang daripada Kumpulan Wang Rizab', jenis: 'wang', cadang: 'Menteri Kewangan' },
    { k: 'Meluluskan pengisytiharan untung boleh agih (hibah)', jenis: 'wang', cadang: 'Menteri Kewangan' },
    { k: 'Meluluskan pembuatan peraturan di bawah Akta 535', jenis: 'tadbir', cadang: 'Kedua-dua Menteri' }
  ],
  dapatan: 'Kuasa Menteri terlalu luas — merangkumi bukan sahaja bidang haji tetapi urus tadbir, pengurusan ' +
    'dana pendeposit dan pelaburan. Kepakaran ketiga-tiga Menteri Hal Ehwal Agama dalam tempoh siasatan ' +
    'hanya terhad dalam bidang hal ehwal agama. Tiada input tambahan diperoleh sebelum keputusan dibuat.',
  dapatanP: [15, 16, 70],
  kelayakan: {
    sekarang: 'Seksyen 6(2) Akta 535: "Tiada seorang pun boleh dilantik menjadi anggota Lembaga melainkan ' +
      'jika dia seorang Muslim dan warganegara Malaysia." — itu sahaja kriterianya.',
    cadangan: ['perbankan', 'perniagaan', 'ekonomi', 'syariah', 'perundangan', 'perakaunan'],
    bandingan: [
      { akta: 'Akta KWSP 1991 (Akta 452)', kriteria: 'pengetahuan/pengalaman dalam kewangan, perniagaan, ekonomi, keselamatan sosial' },
      { akta: 'Akta LHDN 1995 (Akta 533)', kriteria: 'berkedudukan/berpengalaman dalam kewangan, komersial, percukaian atau undang-undang' },
      { akta: 'Akta Suruhanjaya Sekuriti 1993 (Akta 498)', kriteria: 'integriti dan reputasi amat baik; pengetahuan diiktiraf dalam kewangan atau pasaran modal' },
      { akta: 'Akta PTPTN 1997 (Akta 566)', kriteria: 'berjaya, berkedudukan dan berpengalaman; pengalaman relevan dalam pendidikan, kewangan atau komersial' },
      { akta: 'Akta KWAP 2007 (Akta 662)', kriteria: 'pengalaman dan kepakaran dalam perniagaan atau kewangan' },
      { akta: 'Akta LPPSA 2015 (Akta 767)', kriteria: 'layak dan sesuai; kedudukan dan pengalaman dalam perbankan, kewangan atau undang-undang' },
      { akta: 'Akta Suruhanjaya Penerbangan 2015 (Akta 771)', kriteria: 'pengalaman/profesionalisme dalam ekonomi, kewangan, penerbangan, perniagaan, pentadbiran, undang-undang' }
    ],
    bandinganP: [71, 72, 73, 74, 75, 76]
  }
};

/* Tindakan tatatertib (p197–201) */
RD.tatatertib = {
  p: [197, 198, 199, 200, 201],
  kluster: [
    { id: 1, n: 'Penjualan saham dalam PT TH Indo Plantations' },
    { id: 2, n: 'Pelanggaran Akta Syarikat 1965 — tiada kelulusan awal Menteri sebelum sumbangan RM22.12 juta (Yayasan Tabung Haji)' },
    { id: 3, n: 'Perisytiharan untung boleh agih (hibah) tahun kewangan 2017' },
    { id: 4, n: 'Tuntutan kepada Unit Bayaran mengandungi butiran palsu' }
  ],
  kes: [
    { n: 'Datuk Rozaida binti Omar', jw: 'Ketua Pegawai Kewangan Kumpulan (Gred K)', kluster: [1, 2, 3],
      hukumanAsal: 'Buang kerja (Kluster 1: 21 Apr 2021; Kluster 3: 16 Apr 2021) / Turun pangkat (Kluster 2)',
      hukumanRayuan: 'Dikurangkan kepada turun pangkat (Kluster 1 & 3, 6 Sep 2021); amaran keras sahaja (Kluster 2)',
      kini: 'Pengurus Besar Strategik Modal Insan (Gred J), Jabatan Modal Insan LTH' },
    { n: "Dato' Adi Azuan Abdul Ghani", jw: 'Ketua Pegawai Operasi (Gred K)', kluster: [2],
      hukumanAsal: 'Turun pangkat', hukumanRayuan: 'Dikurangkan kepada amaran keras sahaja',
      kini: 'Pengurus Besar Kanan Kafe & Pembangunan Perniagaan (Gred K), TH Hotel & Residence Sdn. Bhd.' },
    { n: 'Rifina binti Md Ariff', jw: 'Pengurus Besar Kanan Perkhidmatan Korporat dan Hartanah (Gred K)', kluster: [1],
      hukumanAsal: 'Buang kerja (21 Apr 2021)', hukumanRayuan: 'Dikurangkan kepada turun pangkat (6 Sep 2021)',
      kini: 'Ketua Bahagian Risiko dan Pematuhan (Gred J), TH Plantations Berhad' },
    { n: 'Mohd Hisham bin Harun', jw: 'Ketua Pegawai Sumber Manusia (Gred K)', kluster: [1, 2],
      hukumanAsal: 'Buang kerja (Kluster 1) / Turun pangkat (Kluster 2)',
      hukumanRayuan: 'Dikurangkan kepada turun pangkat (Kluster 1); amaran dan tangguh kenaikan gaji (Kluster 2)',
      kini: 'Head, Business and Corporate Affairs (Gred J), TH Properties Sdn. Bhd.' },
    { n: 'Hazlina binti Mohd Khalid', jw: 'Penasihat Undang-Undang (Gred J)', kluster: [1, 4],
      hukumanAsal: 'Buang kerja (Kluster 1) / Turun pangkat (Kluster 4, 1 Nov 2019)',
      hukumanRayuan: 'Dikurangkan kepada turun pangkat (Kluster 1); turun pangkat DIKEKALKAN (Kluster 4, 28 Jan 2020)',
      kini: 'Timbalan Pengurus Besar (Gred H2), TH Plantations Berhad' }
  ],
  lengah: [
    { kluster: 2, bulan: 19, sesiapa: "Dato' Adi Azuan Abdul Ghani" },
    { kluster: 3, bulan: 15, sesiapa: 'Datuk Rozaida binti Omar' },
    { kluster: 4, bulan: 10, sesiapa: 'Hazlina binti Mohd Khalid' }
  ],
  lengahNota: 'Tempoh dari tarikh surat representasi dikemukakan sehingga Jawatankuasa Tatatertib bersidang untuk memutuskan hukuman.',
  kesimpulan: 'Kesemua lima pegawai masih kekal bertugas dengan LTH atau anak syarikatnya. ' +
    'Suruhanjaya: proses tatatertib "mengambil masa yang terlalu lama" dan perlu diperkemas serta disegerakan.'
};

RD.laporanPolis = {
  p: [193, 194, 195, 196],
  rows: [
    { tarikh: '30 Nov 2018', repot: 'Dang Wangi/31347/2018', pengadu: 'Idrus bin Ismail (mantan Setiausaha Syarikat LTH)',
      isu: 'Penganjuran aktiviti dan penggunaan wang oleh Yayasan Tabung Haji, didakwa menyalahi Memorandum and Articles of Association Yayasan.',
      status: 'PDRM siasatan selesai; kertas siasatan dirujuk kepada Jabatan Peguam Negara.' },
    { tarikh: '30 Nov 2018', repot: 'Dang Wangi/31331/2018', pengadu: 'Idrus bin Ismail',
      isu: 'Salah nyataan dan penyembunyian maklumat berkaitan penjualan 95% saham LTH dalam THIP kepada PT Borneo Pacific (2012), dianggarkan USD910 juta.',
      status: 'Siasatan PDRM berterusan — memerlukan kebenaran pihak berkuasa Indonesia untuk rakam keterangan dan dokumen di sana.' },
    { tarikh: '13 Dis 2018', repot: 'Dang Wangi/32724/2018', pengadu: 'Aliatun binti Mahmud (mantan Setiausaha Trurich)',
      isu: 'Dakwaan manipulasi laporan kesesuaian tanah 40,880 hektar di Kalimantan, mengelirukan Trurich sehingga memperoleh ladang bernilai ~USD58 juta (2008–2009).',
      status: 'Siasatan PDRM berterusan — menunggu kebenaran pihak berkuasa Indonesia.' },
    { tarikh: '16 Jan 2019', repot: 'Dang Wangi/1484/2019', pengadu: 'Idrus bin Ismail',
      isu: 'Pengisytiharan hibah tahun kewangan 2017 yang bercanggah dengan seksyen 22 Akta 535; dakwaan salah nyataan oleh pengurusan dalam dua kertas kerja yang dibentangkan kepada Mesyuarat Khas Lembaga pada 6 dan 9 Februari 2018.',
      status: 'PDRM siasatan selesai; kertas siasatan dirujuk kepada Jabatan Peguam Negara.' }
  ],
  sprm: {
    p: [201, 202],
    rows: [
      'Dakwaan rasuah dalam pembelian Ladang Weida Bhd oleh TH Plantation',
      'Dakwaan penyelewengan dan salah guna kuasa dalam penyewaan Restoran Opah, KL Sentral',
      'Dakwaan penyelewengan dan salah guna kuasa dalam penyewaan Restoran Nasi Dalca, Lantai 2 Ibu Pejabat LTH',
      'Dakwaan penyelewengan dan rasuah oleh mantan Ketua Pegawai Operasi LTH dalam pengubahsuaian',
      'Dakwaan pemalsuan dokumen pembekalan rubber seedlings TH Plantation di Ladang TH-Usia Jatimas, Sandakan',
      'Dakwaan salah laku dan penyelewengan pegawai THP Bina Sdn. Bhd. dan THP Timur Sdn. Bhd.'
    ],
    status: 'Semua dakwaan masih dalam siasatan SPRM semasa laporan disiapkan.'
  }
};

/* --------------------------------------------------------------------------
   AMARAN & TINDAK BALAS — matriks kegagalan institusi
   -------------------------------------------------------------------------- */
RD.amaran = {
  p: [99, 100, 101, 104, 121, 212, 213, 214],
  rows: [
    { dari: 'BNM', tarikh: '2014-08-21', kepada: 'Pengerusi LTH', tajuk: 'Deposit Taking and Management of Liquidity',
      isu: 'Pengambilan deposit dan pengurusan kecairan', hasil: 'diabai', p: 247 },
    { dari: 'BNM', tarikh: '2014-12-19', kepada: 'Pengerusi LTH', tajuk: 'Pengambilan Deposit dan Pengurusan Kecairan',
      isu: 'Pengambilan deposit, pengurusan kecairan, pendeposit besar', hasil: 'diabai', p: 247 },
    { dari: 'BNM', tarikh: '2015-12-23', kepada: 'Pengerusi LTH', tajuk: 'Keperluan Merumus Dasar Rizab',
      isu: 'Ketiadaan polisi rizab; kemampuan LTH bayar hibah tinggi', hasil: 'sebahagian',
      hasilNota: 'LTH melantik EY untuk sediakan Laporan Proforma — tetapi laporan itu kemudian dijadikan asas bayaran hibah.', p: 247 },
    { dari: 'BNM', tarikh: '2015-12-23', kepada: 'Menteri di JPM', tajuk: 'Pengurusan Kewangan Lembaga Tabung Haji',
      isu: 'Kebimbangan menyeluruh mengenai pengurusan kewangan LTH', hasil: 'diabai', p: 247 },
    { dari: 'BNM', tarikh: '2016-12-14', kepada: 'LTH', tajuk: 'Keperluan Merumus Dasar Rizab',
      isu: 'Dasar rizab', hasil: 'diabai', p: 213 },
    { dari: 'BNM', tarikh: '2017-02-17', kepada: 'LTH', tajuk: 'Keperluan Merumus Dasar Rizab',
      isu: 'Dasar rizab', hasil: 'diabai', p: 213 },
    { dari: 'Roland Berger', tarikh: '2017-03-03', kepada: 'Pengurusan LTH', tajuk: '5-Year Strategic Business Plan Review',
      isu: 'Model perniagaan tidak sesuai dan berisiko; subsidi haji tinggi; rizab menurun selepas 2016; anggaran kerugian RM2.6 bilion mengancam pendapatan masa hadapan',
      hasil: 'diabai', hasilNota: 'TIADA rekod menunjukkan laporan RB dibentangkan kepada Lembaga. Laporan siap SEBELUM hibah 2017 diisytiharkan.', p: 214 },
    { dari: 'Roland Berger', tarikh: '2018-02-02', kepada: 'Pengurusan LTH', tajuk: 'Strategic Plan Review (Revised)',
      isu: 'Sama seperti di atas', hasil: 'diabai', p: 246 },
    { dari: 'Ketua Audit Negara', tarikh: '2018-07-16', kepada: 'LTH (laporan audit)', tajuk: 'Emphasis of Matter, bukan Pendapat Berteguran',
      isu: 'Polisi rosot nilai tidak konsisten (diubah 2× dalam 2017); rosot nilai RM227.81 juta tidak direkod',
      hasil: 'lembut', hasilNota: 'Pendapat Berteguran DICADANGKAN tetapi tidak diberi. KAN mengaku dalam surat 19 Dis 2018 bahawa keputusan itu mengambil kira "espektasi dan persepsi negatif pihak berkepentingan, khususnya pendeposit untuk terus menyimpan di TH" — perkara di luar skop audit.', p: 22 },
    { dari: 'Ketua Audit Negara', tarikh: '2018-10-25', kepada: 'Pengerusi LTH', tajuk: 'Ulasan JAN mengenai pandangan Lembaga',
      isu: 'Penyata kewangan 2017', hasil: 'lembut', p: 247 },
    { dari: 'Ketua Audit Negara', tarikh: '2018-12-19', kepada: 'Perdana Menteri', tajuk: 'Penjelasan isu penyata kewangan 2017',
      isu: 'Mengaku Pendapat Berteguran sepatutnya diberi', hasil: 'lembut', p: 133 },
    { dari: 'PwC', tarikh: '2018-11-09', kepada: 'Pengurusan LTH', tajuk: 'Financial Position Review (Final)',
      isu: 'Jurang defisit aset vs liabiliti sejak 2014; hibah sejak 2014 bercanggah dengan seksyen 22 Akta 535',
      hasil: 'bertindak', hasilNota: 'Menjadi asas Pelan Pemulihan dan penubuhan UJSB.', p: 147 },
    { dari: 'BNM', tarikh: '2018-12-28', kepada: 'Perdana Menteri', tajuk: 'Pengawalseliaan dan Cadangan Langkah Kehematan',
      isu: 'Cadangan meletakkan LTH di bawah kawal selia BNM', hasil: 'bertindak',
      hasilNota: 'Jemaah Menteri 7 Dis 2018 letakkan LTH di bawah kawal selia BNM mulai 1 Jan 2019 — tetapi TANPA menyatakan skop dengan jelas. Suruhanjaya: arahan ini tidak selari dengan Akta 535.', p: 100 },
    { dari: 'BNM', tarikh: '2019-06-26', kepada: 'Perdana Menteri', tajuk: 'Outcome of the Supervisory Review',
      isu: 'Isu penzahiran zakat kepada pendeposit di bawah akad Wadi’ah Yad Dhamanah', hasil: 'bertindak',
      hasilNota: 'LTH menukar akad kepada Wakalah pada Disember 2019 selepas kajian menyeluruh.', p: 108 },
    { dari: 'BNM', tarikh: '2022-04-18', kepada: 'Pengerusi Suruhanjaya', tajuk: 'Recommendation on the Future Business Model',
      isu: 'Cadangan aktiviti pelaburan LTH dijalankan entiti berasingan dikawal selia BNM/SC', hasil: 'ditolak',
      hasilNota: 'Suruhanjaya menolak: cadangan itu hanya akan menjadikan LTH "glorified travel agent".', p: 217 }
  ],
  hasilLabel: {
    diabai: { l: 'Tidak diberi perhatian', c: 'bad' },
    sebahagian: { l: 'Tindakan sebahagian', c: 'warn' },
    lembut: { l: 'Teguran dilembutkan', c: 'warn' },
    bertindak: { l: 'Ditindaklanjuti', c: 'good' },
    ditolak: { l: 'Ditolak Suruhanjaya', c: 'neutral' }
  },
  ringkasan: 'Suruhanjaya: surat-surat BNM bertarikh 19 Disember 2014, 23 Disember 2015, 14 Disember 2016 dan ' +
    '17 Februari 2017 "telah dihantar kepada LTH tetapi tidak mendapat perhatian yang sewajarnya".',
  ringkasanP: [213]
};

/* Peranan pihak ketiga */
RD.pihak = [
  { n: 'Bank Negara Malaysia (BNM)', peranan: 'Pemantau (bukan pengawal selia sah sebelum 2019)',
    dapatan: 'Menghantar sekurang-kurangnya 6 surat amaran 2014–2017 tanpa kuasa penguatkuasaan. LTH adalah ' +
      'Institusi Kewangan Bukan Bank, tidak tertakluk kepada IFSA 2013. BNM mengaku sendiri "tidak mempunyai ' +
      'kepakaran yang sepenuhnya bagi mengawal selia LTH khususnya dalam aspek pengurusan haji dan pelaburan".',
    syor: 'BNM tidak seharusnya mengawal selia LTH. Jika perlu, dihadkan kepada kawalan rizab dan pengurusan kecairan sahaja.',
    p: [99, 101, 102, 232] },
  { n: 'Jabatan Audit Negara (JAN) / Ketua Audit Negara', peranan: 'Juruaudit statutori LTH',
    dapatan: 'Memberi Sijil Audit Bersih untuk 2014–2017. Untuk 2017, Pendapat Berteguran dicadangkan tetapi ' +
      'tidak diberi selepas mempertimbangkan kesan kepada persepsi pendeposit — perkara di luar skop audit. ' +
      'Juga menerima pengelasan Kumpulan Wang Pendeposit sebagai EKUITI (bukan liabiliti) sejak 2010, yang ' +
      'Suruhanjaya nilai sebagai "satu representasi salah". JAN juga gagal menegur hibah tinggi 2014–2017.',
    syor: 'Pengauditan penyata kewangan LTH tidak lagi dipertanggungjawabkan kepada JAN; LTH boleh melantik ' +
      'Firma Akauntan Swasta. Seksyen 26 Akta 535 dipinda untuk mengecualikan Akta 240.',
    p: [21, 22, 125, 132, 134, 135] },
  { n: 'Ernst & Young (EY)', peranan: 'Konsultan rangka kerja RAV & Laporan Proforma',
    dapatan: 'Menyemak RAV ke atas Laporan Proforma. Rakan kongsi EY mendakwa Proforma berasaskan penyata kewangan ' +
      'yang telah diaudit KAN — Suruhanjaya dapati kenyataan itu TIDAK BENAR, kerana Laporan Semakan RAV EY ' +
      'dikeluarkan 23 Mei 2018 sedangkan Penyata Kewangan Beraudit hanya dimuktamadkan 16 Julai 2018. ' +
      'EY sendiri menyatakan laporan Pro Forma bukanlah untuk dijadikan asas bayaran hibah.',
    syor: 'RAV tidak boleh dijadikan asas pembayaran hibah; gunakan Penyata Kewangan yang diaudit.',
    p: [114, 118, 119, 130] },
  { n: 'PricewaterhouseCoopers (PwC)', peranan: 'Financial review 2014–2017; audit forensik THP dan TH Marine',
    dapatan: 'Mengesahkan jurang defisit antara aset dan liabiliti sejak 2014, dan bahawa hibah yang diagihkan ' +
      'sejak 2014 bercanggah dengan seksyen 22 Akta 535. Menyediakan kiraan kerugian terlaras 2017 (RM1.4 bilion) ' +
      'dan kerugian terkumpul (RM4.7 bilion).',
    syor: 'Penemuan PwC menjadi teras Pelan Pemulihan.', p: [147, 148, 149] },
  { n: 'Roland Berger (RB)', peranan: 'Kajian pelan perniagaan strategik 2017–2018',
    dapatan: 'Mengesan model perniagaan berisiko, polisi pelaburan berat kepada ekuiti domestik, subsidi haji ' +
      'tinggi, dan rizab menurun selepas 2016. Menganggarkan kerugian RM2.6 bilion akan menjadi ancaman kepada ' +
      'pendapatan masa hadapan. Suruhanjaya: analisis RB "baik dan menyeluruh" tetapi laporan itu ' +
      '"tidak diberikan perhatian dan dimanfaatkan"; tiada rekod ia dibentangkan kepada Lembaga.',
    syor: 'Sebahagian pandangan RB sesuai diterima pakai.', p: [104, 117, 213, 214] },
  { n: 'Perbendaharaan / Kementerian Kewangan', peranan: 'Wakil dalam Lembaga; pelulus bonus; pelulus baki rizab minima',
    dapatan: 'TIDAK PERNAH meluluskan apa-apa baki minima Kumpulan Wang Rizab walaupun disyaratkan seksyen 22(3)(b) ' +
      'Akta 535, dan walaupun ada wakil Perbendaharaan dalam Lembaga. Tiada mekanisme untuk menilai polisi rizab LTH. ' +
      'Bagi bonus, MOF menyatakan kelulusan melebihi dua bulan adalah "budi bicara Menteri Kewangan".',
    syor: 'Menteri Kewangan dipertanggungjawabkan pengurusan kewangan, dana dan pelaburan LTH.',
    p: [104, 139, 231] },
  { n: 'Panel Pelaburan', peranan: 'Menyemak dan meluluskan kertas cadangan pelaburan sebelum ke Lembaga & Menteri',
    dapatan: 'Bergantung kepada input Pengurusan LTH; tidak menyemak cadangan pelaburan dengan secukupnya. ' +
      'Pengerusinya Dato’ Mohzani mengakui mereka "tidak cukup tegas kerana pendekatan yang digunakan adalah ' +
      'longgar dan tidak menyeluruh". Dibubarkan Mei 2018 dan diganti Exco Perniagaan yang tidak pernah berfungsi.',
    syor: 'Panel Pelaburan dikanunkan dalam Akta 535; Pengerusi dilantik Menteri Kewangan.',
    p: [92, 93, 176, 177] }
];

/* --------------------------------------------------------------------------
   KRONOLOGI
   -------------------------------------------------------------------------- */
RD.kronologi = [
  { d: '1951', tema: 'asas', t: 'Ordinan Haji 1951', b: 'Pejabat Urusan Haji ditubuhkan di Pulau Pinang untuk melindungi kepentingan jemaah haji.', p: 53 },
  { d: '1962', tema: 'asas', t: 'PWSBH ditubuhkan', b: 'Perbadanan Wang Simpanan Bakal-Bakal Haji Tanah Melayu (Akta 34/62) — memobilisasi simpanan bakal haji.', p: 53 },
  { d: '1969-08-08', tema: 'asas', t: 'LUTH ditubuhkan', b: 'Akta Lembaga Urusan dan Tabung Haji 1969 (Akta 8) menggabungkan fungsi PWSBH dengan Pejabat Urusan Haji.', p: 54 },
  { d: '1995-06-01', tema: 'asas', t: 'Lembaga Tabung Haji (LTH) ditubuhkan', b: 'Akta Tabung Haji 1995 (Akta 535) menggantikan LUTH. Akta 535 berkuat kuasa 16 Februari 1995.', p: 54 },
  { d: '2001', tema: 'hafis', t: 'HAFIS dimulakan', b: 'Sebelum ini jemaah Muassasah membayar kos haji sebenar. Subsidi kemudian diambil daripada keuntungan yang boleh diagihkan kepada pendeposit — bukan suntikan Kerajaan.', p: 207 },
  { d: '2009', tema: 'hafis', t: 'Bayaran haji dibekukan pada RM9,980', b: 'Kerajaan membekukan kenaikan bayaran haji Muassasah. Beku ini kekal 13 tahun hingga 2021 walaupun kos haji terus naik.', p: 211 },
  { d: '2010', tema: 'krisis', t: 'Kumpulan Wang Pendeposit dikelaskan sebagai ekuiti', b: 'Sejak 2010 JAN menerima penyata kewangan LTH dengan Kumpulan Wang Pendeposit dikelaskan sebagai dana (ekuiti), bukan liabiliti. Suruhanjaya: "satu representasi salah".', p: 132 },
  { d: '2013-07-01', tema: 'tadbir', t: 'Abdul Azeez dilantik Pengerusi LTH', b: 'Ahli Parlimen Baling dan Ahli Majlis Tertinggi UMNO. Anggota Lembaga sejak 2011.', p: 59 },
  { d: '2014-08-21', tema: 'amaran', t: 'Amaran BNM #1', b: 'Surat kepada Pengerusi LTH mengenai pengambilan deposit dan pengurusan kecairan.', p: 100 },
  { d: '2014-12-19', tema: 'amaran', t: 'Amaran BNM #2', b: 'Surat kedua tahun yang sama — pengambilan deposit dan pengurusan kecairan.', p: 100 },
  { d: '2014', tema: 'krisis', t: 'Jurang defisit bermula', b: 'Hibah 2014 (RM3,237 juta) melebihi lebihan sebelum agihan (RM2,885 juta) — kedudukan bersih menjadi −RM352 juta.', p: 147 },
  { d: '2015-12-23', tema: 'amaran', t: 'Amaran BNM #3 dan #4', b: 'Dua surat pada hari sama: kepada Pengerusi LTH ("Keperluan Merumus Dasar Rizab") dan kepada Menteri di JPM ("Pengurusan Kewangan LTH").', p: 100 },
  { d: '2016-06-30', tema: 'krisis', t: 'EY mengeluarkan rangka kerja RAV', b: 'EY mengesyorkan metodologi menilai aset LTH. LTH mula guna Nilai Aset Yang Boleh Direalisasi (RAV) untuk Laporan Proforma bagi tahun berakhir 2015.', p: 127 },
  { d: '2016', tema: 'krisis', t: 'Akad ditukar kepada Wadi’ah Yad Dhamanah', b: 'Deposit dikira sebagai simpanan; LTH menjadi peminjam. Tiada penjelasan mengapa perubahan dibuat dan tiada kajian menyeluruh dilaksanakan.', p: 107 },
  { d: '2016-12-14', tema: 'amaran', t: 'Amaran BNM #5', b: 'Keperluan merumus dasar rizab.', p: 213 },
  { d: '2017-02-17', tema: 'amaran', t: 'Amaran BNM #6', b: 'Keperluan merumus dasar rizab.', p: 213 },
  { d: '2017-03-03', tema: 'amaran', t: 'Laporan Roland Berger', b: 'Kajian 5-Year Strategic Business Plan. Mengesan model perniagaan berisiko dan anggaran kerugian RM2.6 bilion. TIADA rekod ia dibentangkan kepada Lembaga.', p: 214 },
  { d: '2017', tema: 'krisis', t: 'Polisi rosot nilai diubah dua kali', b: 'Ambang rosot nilai dinaikkan daripada 70% kepada 85% kemudian 90% dalam tempoh satu hari. Rosot nilai yang direkod akhirnya RM1 juta sahaja, berbanding RM1,313 juta di bawah ambang lama.', p: 148 },
  { d: '2018-02-06', tema: 'krisis', t: 'Dua Mesyuarat Khas Lembaga (6 & 9 Feb)', b: 'Dua kertas kerja dibentangkan. Laporan polis kemudian mendakwa terdapat salah nyataan dalam kertas kerja ini bagi membolehkan hibah tinggi diisytiharkan untuk 2017.', p: 196 },
  { d: '2018-02-07', tema: 'krisis', t: 'Kaedah kiraan hibah ditukar — lalu ditarik balik', b: 'Kaedah purata baki bulanan ditukar kepada purata baki tahunan, diumumkan 7 Februari 2018 tetapi ditarik balik selepas reaksi negatif pendeposit. Kaedah baki bulanan digunakan semula, menyebabkan lebihan wang RM600 juta dikeluarkan untuk hibah 2017.', p: 115 },
  { d: '2018-05', tema: 'tadbir', t: 'Panel Pelaburan dibubarkan', b: 'Diganti Exco Perniagaan yang dipengerusikan Menteri Hal Ehwal Ekonomi — diakui saksi bahawa ia tidak pernah berfungsi.', p: 92 },
  { d: '2018-05-10', tema: 'tadbir', t: 'PM memegang kuasa Menteri', b: 'Dari 10 Mei hingga 1 Julai 2018, kuasa Menteri di bawah Akta 535 dijalankan oleh Perdana Menteri Tun Dr. Mahathir melalui P.U.(A) 125.', p: 56 },
  { d: '2018-07-04', tema: 'krisis', t: 'Perbincangan KAN dengan Perdana Menteri', b: 'KAN memaklumkan PM tentang dua penemuan material. Hasil perbincangan: Pendapat Tanpa Teguran dengan "Emphasis of Matter" diberikan.', p: 133 },
  { d: '2018-07-16', tema: 'krisis', t: 'Sijil Audit Bersih 2017 dengan "Emphasis of Matter"', b: 'KAN mengeluarkan pendapat tanpa teguran walaupun Pendapat Berteguran telah dicadangkan. Suruhanjaya: perkara-perkara itu "seharusnya dinyatakan sebagai ketidakpatuhan yang serius".', p: 132 },
  { d: '2018-11-09', tema: 'krisis', t: 'Laporan akhir PwC', b: 'Financial Position Review mengesahkan jurang defisit sejak 2014 dan bahawa hibah sejak 2014 bercanggah dengan seksyen 22 Akta 535.', p: 147 },
  { d: '2018-11-30', tema: 'selamat', t: 'Jemaah Menteri bersetuju dasarnya + 2 laporan polis', b: 'Rangka kerja Pelan Pemulihan diterima secara dasar. Pada hari sama, dua laporan polis dibuat mengenai Yayasan Tabung Haji dan penjualan THIP.', p: 156 },
  { d: '2018-12-07', tema: 'selamat', t: 'Jemaah Menteri meluluskan Pelan Pemulihan', b: 'Diarah dilaksanakan sebelum berakhir 2018 — LTH mempunyai kurang dua minggu. Jemaah Menteri juga meletakkan LTH di bawah kawal selia BNM mulai 1 Januari 2019, tanpa menyatakan skop dengan jelas.', p: 156 },
  { d: '2018-12-14', tema: 'selamat', t: 'Urusharta Jamaah Sdn. Bhd. (UJSB) ditubuhkan', b: 'SPV milik penuh Menteri Kewangan Diperbadankan, berdasarkan model Danaharta Nasional Berhad (1998).', p: 145 },
  { d: '2018-12-27', tema: 'selamat', t: 'Perjanjian Pemindahan Aset ditandatangani', b: '106 saham tersenarai, 1 syarikat perladangan dan 29 aset hartanah dipindahkan pada nilai RM19.9 bilion — berbanding nilai pasaran RM9.7 bilion.', p: 156 },
  { d: '2019-01-17', tema: 'tadbir', t: 'BNM memeriksa LTH', b: 'Pemeriksaan 17 Januari – 28 Februari 2019 di bawah seksyen 33 Akta BNM 2009 dan seksyen 25 AMLA 2001.', p: 101 },
  { d: '2019', tema: 'krisis', t: 'Hibah 2018 diumumkan pada 1.25% — deposit mengecut', b: 'Deposit LTH menurun dari kira-kira RM73 bilion kepada RM69 bilion pada akhir 2019. Suruhanjaya: "LTH bernasib baik kerana jumlah pengeluaran dan kesannya adalah lebih kecil daripada apa yang dikhuatiri."', p: 122 },
  { d: '2019-04-05', tema: 'selamat', t: 'Jemaah Menteri luluskan RM17.8 bilion', b: 'Untuk membiayai kekurangan penebusan Sukuk UJSB: RM500 juta (2020, RMK-11) + RM17.3 bilion (RMK-12 & RMK-13), anggaran purata RM1.73 bilion setahun.', p: 165 },
  { d: '2019-05-15', tema: 'selamat', t: 'Perjanjian Sukuk & Hak Penolakan Pertama', b: 'Langganan Sukuk RM27.56 bilion oleh LTH, dan ROFR memberi LTH hak keutamaan mengambil semula aset yang dipindahkan.', p: 157 },
  { d: '2019-05-27', tema: 'selamat', t: 'Surat Sokongan Kewangan MOF', b: 'Sukuk UJSB TIDAK dijamin Kerajaan. Hanya ada surat sokongan Menteri Kewangan di bawah seksyen 14 Akta 61 — dinilai Suruhanjaya sebagai "Letter of Comfort" sahaja.', p: 164 },
  { d: '2019-12', tema: 'tadbir', t: 'Akad ditukar kepada Wakalah', b: 'Selepas kajian menyeluruh. LTH menjadi ejen pendeposit; menyelesaikan isu tanggungan zakat dan pemberian subsidi.', p: 109 },
  { d: '2019-12-03', tema: 'selamat', t: 'LTH melepaskan Hak Penolakan Pertama', b: 'Melepaskan ROFR bagi 18 daripada 19 hartanah yang hendak ditender UJSB (kecuali tanah Jalan Hill, Seremban — kemudian juga dilepaskan).', p: 168 },
  { d: '2020', tema: 'selamat', t: 'Tender terbuka hartanah UJSB — hanya 1 terjual', b: 'Hanya sebidang tanah di Mukim Sungai Segamat, Johor terjual pada RM920,000. Baki 17 hartanah tidak mendapat bidaan.', p: 167 },
  { d: '2020-11-30', tema: 'selamat', t: 'Penebusan awal Sukuk RM200 juta', b: 'Daripada geran Kerajaan RM500 juta yang diterima UJSB pada 2020. RM300 juta lagi digunakan untuk bayaran saham tukar taraf syariah.', p: 166 },
  { d: '2021', tema: 'selamat', t: 'UJSB TIDAK menerima RM1.5 bilion', b: 'Peruntukan yang diluluskan dalam Belanjawan 2021 tidak diterima; keutamaan diberikan kepada pemulihan ekonomi Covid-19.', p: 166 },
  { d: '2021-05-05', tema: 'tadbir', t: 'KPE Nik Mohd Hasyudeen ditamatkan', b: 'Tanpa sebab di bawah seksyen 6(5) Akta 535, sebelum tamat tempoh sebenar 31 Ogos 2021. Suruhanjaya: beliau "sedang melaksanakan penambahbaikan terhadap LTH".', p: 82 },
  { d: '2021-10-15', tema: 'tadbir', t: 'Pengerusi Md Nor bin Md Yusof ditamatkan', b: 'Tanpa sebab, sebelum tamat kontrak yang baru disambung dua tahun mulai 20 Julai 2020.', p: 82 },
  { d: '2020-08-14', tema: 'rci', t: 'Jemaah Menteri: perlu ada RCI', b: 'Susulan Nota Bersama Perdana Menteri dan Menteri Kewangan berdasarkan penemuan BNM, KAN, PwC, EY dan RB.', p: 41 },
  { d: '2021-07-14', tema: 'rci', t: 'Jemaah Menteri bersetuju menubuhkan RCI', b: 'Di bawah Akta Suruhanjaya Siasatan 1950 (Akta 119).', p: 41 },
  { d: '2021-10-08', tema: 'rci', t: 'Objektif dan skop siasatan ditetapkan', b: 'Meneliti isu 2014–2020 dengan merujuk penemuan PwC, EY dan RB; menentukan sama ada ada penyembunyian maklumat; mengesyorkan tindakan.', p: 42 },
  { d: '2021-12-20', tema: 'tadbir', t: 'Tan Sri Azman bin Mokhtar dilantik Pengerusi', b: 'Pengerusi Lembaga semasa laporan disiapkan.', p: 60 },
  { d: '2022-01-20', tema: 'rci', t: 'Enam Pesuruhjaya dilantik', b: 'Tempoh kuat kuasa enam bulan: 20 Januari – 19 Julai 2022. Prosiding dijalankan secara TERTUTUP di Kompleks Islam Putrajaya.', p: 42 },
  { d: '2022-02-23', tema: 'rci', t: 'Taklimat agensi bermula', b: 'Lapan agensi dipanggil: LTH, EY, Roland Berger, PwC, BNM, JAN, MOF dan UJSB (23 Februari – 7 Julai 2022).', p: 46 },
  { d: '2022-04-18', tema: 'amaran', t: 'BNM kemuka cadangan model perniagaan baharu', b: 'Aktiviti pelaburan LTH dijalankan entiti berasingan dikawal selia BNM atau SC. Suruhanjaya menolak — akan jadikan LTH "glorified travel agent".', p: 217 },
  { d: '2022-05-09', tema: 'rci', t: 'Prosiding: 16 saksi memberi keterangan', b: 'Daripada 45 orang yang membuat Akuan Berkanun Saksi, 16 dipanggil memberi keterangan (9 Mei – 27 Jun 2022).', p: 48 },
  { d: '2022-07-19', tema: 'rci', t: 'Laporan ditandatangani', b: 'Suruhanjaya berharap Kerajaan menimbang supaya laporan diumumkan kepada awam mengikut bahagian yang bersesuaian.', p: 238 },
  { d: '2022-08-30', tema: 'rci', t: 'Laporan dipersembahkan kepada Yang di-Pertuan Agong', b: 'Laporan Suruhanjaya Siasatan Diraja bagi Menyiasat Isu Pengurusan dan Operasi Lembaga Tabung Haji dari Tahun 2014 hingga 2020.', p: 5 }
];
RD.kronologiTema = {
  asas: { l: 'Asal usul institusi', c: 'accent' },
  krisis: { l: 'Krisis kewangan', c: 'bad' },
  amaran: { l: 'Amaran diabaikan', c: 'warn' },
  selamat: { l: 'Penyelamatan / UJSB', c: 'neutral' },
  tadbir: { l: 'Tadbir urus', c: 'sim' },
  hafis: { l: 'Kos haji & subsidi', c: 'good' },
  rci: { l: 'Proses RCI', c: 'ink' }
};

/* --------------------------------------------------------------------------
   SYOR / CADANGAN (Bab 4, p230–237)
   -------------------------------------------------------------------------- */
RD.syor = [
  { id: '4.4.1(a)', t: 'Pinda Akta 535: nyatakan kriteria khusus dan kaedah pemilihan anggota Lembaga.', siapa: ['Kerajaan'], tema: 'Akta 535', p: 230 },
  { id: '4.4.1(b)', t: 'Pinda Akta 535: nyatakan secara khusus bidang kepakaran yang diperlukan bagi anggota Lembaga.', siapa: ['Kerajaan'], tema: 'Akta 535', p: 230 },
  { id: '4.4.1(c)', t: 'Pinda Akta 535: larang ahli politik AKTIF daripada dilantik atau memegang jawatan sebagai Pengerusi/anggota Lembaga LTH dan anak-anak syarikat.', siapa: ['Kerajaan'], tema: 'Akta 535', p: 230 },
  { id: '4.4.1(d)', t: 'Pinda Akta 535: sebelum pembatalan pelantikan mana-mana anggota Lembaga, perlu dirujuk kepada jawatankuasa atau badan penasihat bebas.', siapa: ['Kerajaan'], tema: 'Akta 535', p: 230 },
  { id: '4.4.1(e)', t: 'Pinda Akta 535: penamatan perkhidmatan anggota Lembaga hendaklah diberi sebab yang munasabah.', siapa: ['Kerajaan'], tema: 'Akta 535', p: 231 },
  { id: '4.4.1(f)', t: 'Kanunkan Jawatankuasa Urusan Haji, Jawatankuasa Penasihat Syariah dan Panel Pelaburan dalam Akta 535, berserta peruntukan lazim (kuorum, undi pemutus, penzahiran kepentingan).', siapa: ['Kerajaan'], tema: 'Akta 535', p: 231 },
  { id: '4.4.1(g)', t: 'Pinda Akta 535: peruntukan lebih jelas mengenai pengiraan hibah — bayaran hibah hendaklah berpandukan penyata kewangan tahunan yang telah DIAUDIT mengikut piawaian MIA.', siapa: ['Kerajaan'], tema: 'Akta 535', p: 231, kunci: true },
  { id: '4.4.1(h)', t: 'Pinda Akta 535: tubuhkan jabatan bernama "Dana Haji" yang bertanggungjawab kepada pelaburan LTH dan dikawal selia oleh Suruhanjaya Sekuriti Malaysia.', siapa: ['Kerajaan'], tema: 'Struktur pelaburan', p: 231, kunci: true },
  { id: '4.4.1(i)', t: 'Pinda seksyen 26 Akta 535 untuk mengecualikan pemakaian Akta Badan Berkanun (Akaun dan Laporan Tahunan) 1980 (Akta 240) terhadap LTH.', siapa: ['Kerajaan'], tema: 'Akta 535', p: 231 },
  { id: '4.4.2', t: 'Susun semula struktur tadbir urus: Menteri Hal Ehwal Agama bagi pengurusan haji; Menteri Kewangan bagi pengurusan kewangan, dana dan pelaburan. Pelantikan anggota Lembaga dan KPE oleh Perdana Menteri atas syor badan penasihat bebas.', siapa: ['Kerajaan'], tema: 'Tadbir urus', p: 231, kunci: true },
  { id: '4.4.3', t: 'Hadkan penglibatan anggota Lembaga dan pengurusan LTH dalam pengurusan anak-anak syarikat LTH.', siapa: ['LTH'], tema: 'Tadbir urus', p: 232 },
  { id: '4.4.4', t: 'BNM tidak seharusnya mengawal selia LTH. Jika masih diperlukan, dihadkan kepada kawalan rizab dan pengurusan kecairan — dan tidak tertakluk kepada Akta 759, Akta 758 atau Akta 618.', siapa: ['Kerajaan', 'BNM'], tema: 'Kawal selia', p: 232 },
  { id: '4.4.5', t: 'Pengauditan penyata kewangan LTH tidak lagi dipertanggungjawabkan kepada JAN; LTH boleh melantik Firma Akauntan Swasta.', siapa: ['Kerajaan', 'LTH'], tema: 'Pelaporan kewangan', p: 232, kunci: true },
  { id: '4.4.6', t: 'Kadar hibah hendaklah berdasarkan penyata kewangan tahunan yang telah diaudit, BUKAN Laporan Proforma. RAV tidak boleh dijadikan asas bayaran hibah.', siapa: ['LTH'], tema: 'Pelaporan kewangan', p: 232, kunci: true },
  { id: '4.4.7', t: 'Laporan Penyata Kewangan LTH hendaklah mematuhi sepenuhnya piawaian pelaporan dalam Akta 240 dan Garis Panduan PA 3.1.', siapa: ['LTH'], tema: 'Pelaporan kewangan', p: 233 },
  { id: '4.4.8', t: 'Amalan pemberian bonus yang terlalu tinggi kepada kakitangan hendaklah DIHENTIKAN.', siapa: ['LTH'], tema: 'Bonus', p: 233 },
  { id: '4.4.9', t: 'Dapatkan SEMULA bonus yang telah diberi kepada ahli Lembaga dan Pengurusan TH Properties, kerana bonus itu diberikan tanpa mematuhi peraturan.', siapa: ['LTH'], tema: 'Bonus', p: 233, kunci: true },
  { id: '4.4.10', t: 'Laksanakan AUDIT FORENSIK terhadap 14 pelaburan bermasalah untuk meneliti bagaimana keputusan pelaburan lalu dibuat.', siapa: ['LTH', 'Kerajaan'], tema: 'Pelaburan', p: 233, kunci: true },
  { id: '4.4.11', t: 'Pihak berkuasa wajib mengambil tindakan tegas dan segera ke atas setiap laporan polis atau aduan berkaitan salah laku di LTH.', siapa: ['Pihak berkuasa'], tema: 'Penguatkuasaan', p: 234 },
  { id: '4.4.12', t: 'Proses tindakan tatatertib di LTH (termasuk durasi penahanan kerja) perlu diperkemas dan disegerakan.', siapa: ['LTH'], tema: 'Penguatkuasaan', p: 234 },
  { id: '4.4.13', t: 'Transaksi pelaburan yang masih dalam pertikaian mahkamah/timbang tara perlu dipantau secara dekat; penyelesaian di luar mahkamah dipertingkatkan.', siapa: ['LTH'], tema: 'Pelaburan', p: 234 },
  { id: '4.4.14', t: 'Pastikan bayaran zakat dilaksanakan dengan sempurna. Kemukakan isu perubahan akad simpanan kepada Jawatankuasa Muzakarah MKI untuk pandangan hukum.', siapa: ['LTH'], tema: 'Syariah & zakat', p: 234 },
  { id: '4.4.15', t: 'Kerajaan ambil perhatian serius mengenai pelaksanaan Pelan Pemulihan 2018. Instrumen Sukuk boleh ditambah baik jika mempunyai jaminan Kerajaan. Jika LTH gagal, jaminan Kerajaan bernilai RM88 bilion terpaksa diaktifkan.', siapa: ['Kerajaan'], tema: 'UJSB & Sukuk', p: 234, kunci: true },
  { id: '4.4.16', t: 'Sukuk yang diterbitkan semula perlulah mempunyai ciri boleh diniagakan (tradeable).', siapa: ['Kerajaan', 'UJSB'], tema: 'UJSB & Sukuk', p: 235 },
  { id: '4.4.17', t: 'Penerbitan Sukuk tidak hanya ditawarkan kepada LTH atau Kerajaan tetapi juga kepada institusi kewangan lain.', siapa: ['UJSB'], tema: 'UJSB & Sukuk', p: 235 },
  { id: '4.4.18', t: 'Kerajaan pastikan peruntukan RM1.73 bilion setahun dibuat seperti dipersetujui Jemaah Menteri bagi penebusan awal Sukuk UJSB.', siapa: ['Kerajaan'], tema: 'UJSB & Sukuk', p: 235, kunci: true },
  { id: '4.4.19', t: 'UJSB digalakkan membuat penebusan awal Sukuk hasil daripada pelupusan aset yang dipindahkan dari LTH.', siapa: ['UJSB'], tema: 'UJSB & Sukuk', p: 235 },
  { id: '4.4.20', t: 'Ubah dasar deposit, bayaran haji dan HAFIS: (a) deposit minimum untuk giliran haji automatik dinaikkan dari RM1,300 kepada RM12,980; (b) pengeluaran besar dihadkan dengan notis sebulan; (c) bantuan haji hanya kepada jemaah yang MEMERLUKAN.', siapa: ['LTH'], tema: 'Deposit & HAFIS', p: 235, kunci: true },
  { id: '4.4.21', t: 'LTH perlu merancang membawa lebih ramai jemaah haji dan menggunakan sepenuhnya kuota tambahan yang ditawarkan Kerajaan Arab Saudi.', siapa: ['LTH'], tema: 'Deposit & HAFIS', p: 236 },
  { id: '4.4.22', t: 'Naikkan minimum bayaran pendaftaran haji Muassasah dari RM1,300 kepada RM12,980 — akan menambah deposit dan mengurangkan tempoh menunggu daripada 130 tahun kepada 33 tahun.', siapa: ['LTH'], tema: 'Deposit & HAFIS', p: 236 },
  { id: '4.4.23', t: 'Fungsi pelaburan LTH dijalankan dengan bebas dan profesional. Pengurusan dana dan pengurusan haji kekal dalam entiti sama kerana ada subsidi silang. Fungsi pelaburan sebagai jabatan "Dana Haji" dikawal selia SC.', siapa: ['LTH', 'Kerajaan'], tema: 'Struktur pelaburan', p: 236 },
  { id: '4.4.24', t: 'LTH fokus kepada portfolio pengurusan dana. LTH tidak seharusnya terlibat dengan pelaburan berisiko tinggi khususnya "pelaburan strategik".', siapa: ['LTH'], tema: 'Struktur pelaburan', p: 236, kunci: true },
  { id: '4.4.25', t: 'Kerajaan ambil langkah penambahbaikan menyeluruh untuk memperkukuh model perniagaan dan pelaburan LTH, termasuk memperkasa tadbir urus melalui pengurusan profesional TANPA CAMPUR TANGAN POLITIK.', siapa: ['Kerajaan'], tema: 'Tadbir urus', p: 237, kunci: true }
];

RD.danaHaji = {
  p: [222, 223, 224],
  struktur: {
    lth: ['Menerima deposit bagi tujuan mengerjakan haji', 'Menguruskan operasi haji'],
    dana: ['Berada DI DALAM Tabung Haji (bukan syarikat subsidiari)', 'Ditadbir oleh lembaga yang BERBEZA',
      'Ahli lembaga dilantik oleh Menteri Kewangan', 'Ahli lembaga mestilah berpadanan dan bersesuaian',
      'Ahli politik aktif TIDAK dibenarkan', 'Dikawal selia oleh Suruhanjaya Sekuriti Malaysia',
      'Bertindak dengan bebas dan profesional']
  },
  panelTugas: ['Alokasi aset', 'Pengurusan portfolio', 'Pencapaian prestasi pelaburan', 'Pengurusan risiko',
    'Pelantikan pengurus portfolio luar'],
  ditolak: [
    { cad: 'Cadangan BNM #1: LTH terima deposit haji + akaun pelaburan berasingan',
      tolak: 'Akan meluaskan skop LTH, meningkatkan risiko, dan dana dalam akaun pelaburan baharu tidak dijamin Kerajaan — berkemungkinan membawa pengeluaran dana yang tinggi.', p: 215 },
    { cad: 'Cadangan BNM #2: LTH hanya terima deposit haji; subsidi ditampung Kerajaan',
      tolak: 'Pendeposit besar terpaksa keluarkan deposit. Risiko tumpuan meningkat — dianggarkan 75% deposit dipegang hanya 5% pendeposit.', p: 216 },
    { cad: 'Cadangan BNM #3: LTH urus operasi haji sahaja; deposit dan pelaburan oleh Bank Islam',
      tolak: 'Menjadikan LTH sebuah syarikat pelancongan berskala besar sahaja. Risiko pembiayaan haji ditanggung sepenuhnya Kerajaan, yang sudah menanggung Sukuk RM27 bilion.', p: 216 },
    { cad: 'Cadangan EY 2021: pecahkan LTH kepada 3 entiti (Pengurus Dana, Dana Hak Milik, Akaun Dana Pendeposit)',
      tolak: 'Tiga entiti dengan tanggungjawab fidusiari berasingan berkemungkinan bercanggah kepentingan, meningkatkan kos, mengundang campur tangan politik LEBIH BESAR (tiga Lembaga Pengarah), dan berisiko ketirisan cukai kerana LTH kini diberi pengecualian cukai.', p: 219 }
  ]
};

/* --------------------------------------------------------------------------
   DAFTAR PERCANGGAHAN & HAD DATA
   -------------------------------------------------------------------------- */
RD.integriti = [
  { jenis: 'Percanggahan angka', tajuk: 'Keuntungan bersih 2017: tiga angka berbeza',
    detail: 'Jadual bonus (p139) menyebut keuntungan bersih 2017 = RM2,798 juta. Laporan PwC (p149) menyebut ' +
      '"Profit for the year (2017)" = RM3,412 juta. Ringkasan Eksekutif (p21) menyebut "keuntungan RM3.4 bilion".',
    kesan: 'Kemungkinan besar definisi berbeza (keuntungan bersih selepas zakat vs keuntungan tahun). ' +
      'Laporan tidak menjelaskan. Kami memaparkan kedua-dua siri secara berasingan dan tidak mencampurnya.',
    p: [139, 149, 21], berat: 'sedang' },
  { jenis: 'Percanggahan angka', tajuk: 'Peruntukan bonus 2015: RM65 juta atau RM61 juta?',
    detail: 'Jadual p137 menyebut peruntukan bonus kakitangan 2015 = RM65 juta. Jadual p139 menyebut ' +
      'peruntukan bonus anggota 2015 = RM61 juta (1.7% daripada keuntungan RM3,537 juta).',
    kesan: 'Kami menggunakan RM65 juta (jadual siri masa penuh 2010–2020) dan menandakan perbezaan ini pada baris berkenaan.',
    p: [137, 139], berat: 'rendah' },
  { jenis: 'Percanggahan angka', tajuk: 'Tempoh menunggu haji: 130 tahun atau 135 tahun?',
    detail: 'Perenggan 3.16.17 (p208) menyebut masa menunggu dijangka dikurangkan "dari 135 tahun kepada 33 tahun". ' +
      'Ringkasan Eksekutif (p33) dan perenggan 4.4.22 (p236) menyebut "daripada 130 tahun kepada 33 tahun". ' +
      'Perenggan 3.16.17 juga menyebut EY menggunakan RM9,980 dalam kiraannya.',
    kesan: 'Kedua-dua angka merujuk keadaan yang sama. Kami memaparkan 135 dan menandakan 130 sebagai versi ' +
      'Ringkasan Eksekutif. Angka 33 tahun konsisten di semua tempat.',
    p: [208, 33, 236], berat: 'rendah' },
  { jenis: 'Percanggahan angka', tajuk: 'Kos haji: 2003 atau 2013?',
    detail: 'Perenggan 3.16.1 (p203) menyebut "kos haji bagi setiap jemaah bagi tahun 2003 hanya pada kadar RM15,555". ' +
      'Ringkasan Eksekutif (p23) menyebut "kos haji bagi jemaah Muassasah pada tahun 2013 adalah pada kadar RM15,553".',
    kesan: 'Tahun dan angka kedua-duanya berbeza. Kos haji 2014 dalam jadual rasmi ialah RM16,155 — lebih ' +
      'konsisten dengan RM15,55x pada 2013 daripada 2003. Kami TIDAK menggunakan angka ini dalam mana-mana carta.',
    p: [203, 23], berat: 'sedang' },
  { jenis: 'Tidak berbaki (jadual)', tajuk: 'Saham mewah: harga seunit tidak berbaki dengan jumlah nilai',
    detail: 'Dalam jadual p162, jika bilangan unit dikira balik daripada (jumlah nilai pemindahan ÷ harga pemindahan seunit), ' +
      'jumlah itu TIDAK sama dengan (jumlah nilai pasaran ÷ harga pasaran seunit). Contoh Axiata: ' +
      '237.1 juta unit vs 256.7 juta unit — beza ~8%. Perbezaan serupa berlaku bagi kesemua lima kaunter.',
    kesan: 'Ini bermakna kami TIDAK BOLEH mengira bilangan unit yang dipegang, jadi kami TIDAK membuat ' +
      'simulasi "berapa nilai portfolio ini pada Jun 2022". Kami hanya membandingkan HARGA SEUNIT, ' +
      'kerana lajur peratus kejatuhan berbaki tepat dengan harga seunit, dan jumlah kejatuhan RM946 juta ' +
      'berbaki tepat dengan lajur jumlah.',
    p: [162], berat: 'tinggi' },
  { jenis: 'Percanggahan angka', tajuk: 'Nilai Sukuk UJSB: RM27.5 bilion atau RM27.56 bilion?',
    detail: 'Nama Perjanjian Sukuk (p157, p249) menyebut "langganan RM27.56 bilion UJSB Sukuk oleh LTH". ' +
      'Semua tempat lain menyebut RM27.5 bilion. Nilai nominal dua siri (RM13.2b + RM14.3b) = RM27.5 bilion.',
    kesan: 'Kami menggunakan RM27.5 bilion (berbaki dengan pecahan siri).',
    p: [157, 162, 249], berat: 'rendah' },
  { jenis: 'Tidak berbaki (kiraan)', tajuk: 'Keuntungan tertunggak Sukuk: RM7.65 bilion atau RM7.9 bilion?',
    detail: 'Laporan menyebut obligasi RM27.5 bilion "termasuk kadar keuntungan bagi bayaran tertunggak ' +
      'oleh Kerajaan kepada LTH sebanyak RM7.65 bilion". Tetapi nominal RM27.5b tolak prinsipal Sukuk ' +
      '(RM10b + RM9.6b = RM19.6b) = RM7.9 bilion. RM27.5b − RM19.85b ≈ RM7.65b, iaitu jika asas termasuk tunai RM300 juta ' +
      'dan pembundaran nilai pemindahan RM19.9b.',
    kesan: 'Kami memaparkan angka laporan (RM7.65 bilion) dan menunjukkan kiraan alternatif secara berasingan sebagai data terbitan.',
    p: [159, 162], berat: 'sedang' },
  { jenis: 'Percanggahan angka', tajuk: 'Bilangan pendeposit 2018: 9.2 juta atau 9.3 juta?',
    detail: 'Perenggan 3.13.14 (p150) menyebut "lebih 9.2 juta pendeposit (pada masa itu)". ' +
      'Perenggan 3.13.18 (p152) menyebut "hampir 9.3 juta pendeposit LTH ketika itu".',
    kesan: 'Kedua-dua angka bersifat anggaran ("lebih", "hampir") pada tempoh yang sama. Kami memaparkan ' +
      'kedua-duanya. Jumlah pendeposit turun kepada 8.6 juta pada 22 Julai 2022.',
    p: [150, 152, 229], berat: 'rendah' },
  { jenis: 'Ralat OCR / taip', tajuk: 'Siling hutang negara "5%" sepatutnya 55%',
    detail: 'Perenggan 3.13.63 (p172) menyebut "ketika Sukuk UJSB diterbitkan pada tahun 2018, kadar siling ' +
      'hutang negara hanya pada 5% daripada KDNK". Semua tempat lain dalam laporan menyebut 55% (dinaikkan kepada 65%).',
    kesan: 'Jelas ralat taip/OCR. Kami menggunakan 55%.', p: [172, 26, 154], berat: 'rendah' },
  { jenis: 'Ralat OCR / taip', tajuk: 'Rujukan "seksyen 2.2 Akta 535" sepatutnya seksyen 22',
    detail: 'Beberapa tempat (p22, p131, p132) menulis "seksyen 2.2 Akta 535" apabila merujuk peruntukan ' +
      'pengisytiharan untung boleh agih, yang sebenarnya seksyen 22.',
    kesan: 'Kami menggunakan seksyen 22 secara konsisten.', p: [22, 131, 132], berat: 'rendah' },
  { jenis: 'Ralat OCR / taip', tajuk: 'Akta Tabung Haji 1995 disebut "Akta 536" sekali',
    detail: 'Perenggan 2.1.4 (p54) menulis "Akta Tabung Haji 1995 (Akta 536)". Semua tempat lain: Akta 535.',
    kesan: 'Kami menggunakan Akta 535.', p: [54], berat: 'rendah' },
  { jenis: 'Ralat OCR / taip', tajuk: 'Nombor dengan "96" sepatutnya tanda peratus',
    detail: 'OCR menukar simbol % kepada "96" di banyak tempat: "1.259." (1.25%), "0.196" (0.1%), "296" (2%), ' +
      '"9096" (90%), "5196" (51%), "0.496" (0.4%), "58%"/"5196" dan lain-lain.',
    kesan: 'Kami membaca semula setiap kes daripada konteks. Semua nilai peratus dalam dashboard ini telah ' +
      'disemak silang dengan jadual atau ayat lain dalam laporan.', p: [20, 105, 191, 211], berat: 'sedang' },
  { jenis: 'Angka meragukan', tajuk: 'Pengubahsuaian tapak Kelana Jaya "RM1.5 juta"',
    detail: 'Perenggan mengenai THHR (p191) menyebut Pelan pembangunan semula tapak LTH Kelana Jaya ' +
      '"termasuk pengubahsuaian yang berjumlah RM1.5 juta". Angka ini kelihatan sangat kecil untuk ' +
      'skala projek pembangunan semula yang dimaksudkan.',
    kesan: 'Kami memaparkan angka seperti dalam laporan tetapi tidak menggunakannya dalam apa-apa agregat atau carta.',
    p: [191], berat: 'sedang' },
  { jenis: 'Nombor senarai tidak berurutan', tajuk: 'Senarai penerima bonus 2017 melangkau nombor 5, 6, 7',
    detail: 'Jadual penerima bonus TH Properties 2017 (p142) bernombor 1, 2, 3, 4, 8, 9, 10, 11, 12, 13, 14 — ' +
      'melangkau 5, 6 dan 7.',
    kesan: 'Jumlah 11 baris yang tersenarai berjumlah TEPAT RM1,148,400 seperti baris jumlah. ' +
      'Jadi tiada penerima yang tertinggal — hanya penomboran yang tidak berurutan (kemungkinan artifak OCR ' +
      'atau penomboran asal). Kami menyemak jumlah dan ia berbaki.', p: [142], berat: 'rendah' }
];

RD.had = [
  { t: 'Ekshibit diklasifikasikan rahsia',
    d: 'Kesemua 12 Jilid ekshibit (Akuan Berkanun Saksi, Nota Keterangan Saksi, laporan penuh EY/PwC/RB/JAN, ' +
       'surat-surat BNM, perjanjian UJSB) diklasifikasikan RAHSIA. Kita hanya boleh melihat apa yang ' +
       'Suruhanjaya pilih untuk kutip dalam laporan utama.' },
  { t: 'Prosiding dijalankan secara tertutup',
    d: 'Semua peringkat prosiding adalah rahsia di bawah Akta 119 dan Akta Rahsia Rasmi 1972. Tiada transkrip awam.' },
  { t: 'Tiada baki rizab tahun demi tahun',
    d: 'Laporan menyebut rizab menyusut dan digunakan pada 2012, 2014, 2016, 2020 dan 2021, dan sasaran RPK ' +
       'RM3.5 bilion (5% nilai aset bersih) — tetapi TIDAK memberikan baki rizab sebenar setiap tahun. ' +
       'Jadi trend rizab tidak boleh dipetakan.' },
  { t: 'Tiada data kadar deposit bank Islam',
    d: 'Laporan berkali-kali membandingkan hibah LTH dengan kadar deposit bank Islam, dan menyebut sasaran ' +
       'baharu "50 hingga 100 mata asas di atas purata bank Islam" — tetapi TIDAK memberikan kadar bank Islam ' +
       'sebenar. Jadi kami tidak boleh melukis jalur perbandingan itu.' },
  { t: 'Data 2021 tidak lengkap',
    d: 'Kadar hibah 2021 diberikan (3.10%) tetapi jumlah ringgitnya tidak. Kedudukan aset/liabiliti 2018–2021 ' +
       'juga tidak diberikan dalam bentuk jadual — hanya 2013–2017.' },
  { t: 'Status pelaksanaan syor TIDAK diketahui',
    d: 'Laporan ini bertarikh 19 Julai 2022. Ia hanya mengandungi SYOR. Laporan tidak (dan tidak boleh) ' +
       'memberitahu syor mana yang telah dilaksanakan. Dashboard ini tidak menunjukkan status pelaksanaan ' +
       'kerana tiada data untuk itu.' },
  { t: 'Bilangan jemaah tidak diberi setiap tahun',
    d: 'Jumlah HAFIS setahun diberikan, dan HAFIS seorang diberikan, tetapi bilangan jemaah setiap tahun tidak. ' +
       'Bahagi jumlah dengan kadar seorang tidak berbaki bagi tahun 2014–2019 — jadi bilangan jemaah tidak ' +
       'boleh diterbitkan dengan yakin bagi tahun-tahun itu.' },
  { t: 'Kadar tukaran mata wang tidak diberi',
    d: 'Laporan menggunakan RM, USD dan Saudi Riyal (SR) tanpa memberikan kadar tukaran, kecuali satu titik ' +
       '(SR76 juta ≈ RM63 juta, iaitu ~RM0.83 per SR). Kami TIDAK menukar mata wang dalam apa-apa jumlah besar; ' +
       'nilai USD dan SR dipaparkan dalam mata wang asalnya.' }
];

/* --------------------------------------------------------------------------
   GLOSARI — istilah teknikal dalam bahasa mudah
   -------------------------------------------------------------------------- */
RD.glosari = {
  'hibah': 'Bahagian keuntungan yang LTH agihkan kepada pendeposit setiap tahun. Dalam laporan ini ia dipanggil "agihan keuntungan (hibah)" atau "untung boleh agih". Ia bukan faedah/bunga, dan bukan jaminan — Lembaga yang tentukan.',
  'rosot nilai': 'Pengakuan dalam akaun bahawa sesuatu pelaburan sudah jatuh nilai dan tidak akan kembali. Contoh mudah: anda beli saham RM1,000, harga sekarang RM300 dan tidak nampak akan pulih — anda "rosotnilai" RM700 supaya akaun tunjuk nilai sebenar.',
  'RAV': 'Realisable Asset Value atau Nilai Aset Yang Boleh Direalisasi. Anggaran pengurusan LTH tentang berapa nilai aset "sebenarnya", lebih tinggi daripada nilai dalam penyata kewangan yang diaudit. Tiada piawaian pasaran untuk mengiranya.',
  'Emphasis of Matter': 'Nota dalam laporan audit yang menarik perhatian kepada sesuatu perkara TANPA mengatakan akaun itu salah. Ia lebih lembut daripada "Pendapat Berteguran" (qualified opinion) yang bermakna juruaudit tidak berpuas hati.',
  'Sijil Audit Bersih': 'Juruaudit mengesahkan penyata kewangan memberi gambaran benar dan saksama. Ia perlu sebelum LTH boleh mengisytiharkan hibah.',
  'Sukuk': 'Instrumen kewangan Islam yang berfungsi seperti bon — pengeluarnya berjanji membayar pemegangnya pada masa hadapan. Sukuk UJSB "berkupon sifar" bermakna tiada bayaran tahunan; semua dibayar pada tarikh matang.',
  'berkupon sifar': 'Tiada bayaran tunai tahunan. Semua keuntungan hanya diterima apabila instrumen itu matang — jadi LTH mencatat "pendapatan" tanpa menerima duit.',
  'SPV': 'Special Purpose Vehicle atau Syarikat Bertujuan Khas — syarikat yang ditubuhkan untuk satu tujuan tertentu sahaja. UJSB ialah SPV untuk mengambil alih aset lemah LTH.',
  'defisit': 'Keadaan di mana nilai aset LEBIH RENDAH daripada nilai liabiliti (hutang dan wang pendeposit). Bermakna kalau semua pendeposit minta duit serentak, aset tidak cukup.',
  'liabiliti': 'Semua yang perlu dibayar. Untuk LTH, wang pendeposit adalah liabiliti — ia hutang LTH kepada pendeposit, bukan modal LTH.',
  'akad': 'Kontrak syariah antara LTH dan pendeposit. Ia berubah tiga kali: Mudarabah (perkongsian untung) → Wadi’ah Yad Dhamanah (simpanan/pinjaman, 2016) → Wakalah (LTH sebagai ejen, Disember 2019).',
  'Mudarabah': 'Kontrak perkongsian: pendeposit beri modal, LTH usahakan, untung dibahagi mengikut nisbah yang dipersetujui. Suruhanjaya dapati nisbah pembahagian ini tidak pernah didokumenkan.',
  'Wakalah': 'LTH menjadi EJEN pendeposit untuk menguruskan dana mereka. Di bawah akad ini LTH boleh menolak zakat, kos pengurusan dan kos haji daripada keuntungan pelaburan.',
  'HAFIS': 'Hajj Financial Support atau Bantuan Kewangan Haji. Beza antara kos haji sebenar dan bayaran yang dikenakan kepada jemaah — ditanggung LTH daripada keuntungan pelaburan (bukan wang Kerajaan).',
  'Muassasah': 'Jemaah haji yang menggunakan pakej urusan LTH (bukan pakej swasta). Merekalah yang menerima subsidi HAFIS.',
  'bank run': 'Keadaan di mana ramai pendeposit mengeluarkan duit serentak kerana hilang keyakinan, sehingga institusi kehabisan tunai.',
  'risiko tertumpu': 'Concentration risk — bahaya kerana terlalu bergantung kepada sedikit pihak. Di LTH, dianggarkan 75% deposit dipegang oleh hanya 5% pendeposit.',
  'ROFR': 'Right of First Refusal atau Hak Penolakan Pertama. LTH diberi hak untuk membeli semula aset yang dipindahkan ke UJSB SEBELUM aset itu ditawarkan kepada orang lain.',
  'FRS 139': 'Piawaian perakaunan yang berkuat kuasa sehingga 2017 untuk melaporkan nilai aset kewangan. Ia menetapkan bila rosot nilai perlu direkod.',
  'MFRS 9': 'Piawaian yang menggantikan FRS 139 pada 2018. Di bawah MFRS 9, aset dinilai berdasarkan harga pasaran — tiada lagi ruang untuk menetapkan sendiri ambang rosot nilai.',
  'FRSIC 14': 'Garis panduan Institut Akauntan Malaysia: kerugian dianggap "signifikan" bila nilai turun 20% atau lebih, dan "berlanjutan" bila melebihi 12 bulan. LTH pula guna ambang 70%, 85% kemudian 90%.',
  'RPK': 'Rizab Penyamaan Keuntungan — simpanan keuntungan yang diketepikan untuk menyerap penurunan nilai aset atau membiayai hibah pada tahun susah. Pada 2019 sasarannya ditetapkan RM3.5 bilion (5% nilai aset bersih).',
  'Komitmen Jaminan': 'Senarai rasmi Kerajaan tentang hutang syarikat yang dijamin atau perlu ditanggung Kerajaan. Sukuk UJSB masuk dalam senarai ini, walaupun ia sendiri tidak dijamin secara formal.',
  'pendapatan tertunggak': 'Deferred income — keuntungan yang dicatat dalam akaun tetapi wangnya belum diterima. LTH mencatat RM840 juta setahun daripada Sukuk UJSB tanpa menerima tunai.',
  'put option': 'Hak untuk memaksa pihak lain membeli balik saham anda pada harga tertentu. LTH guna hak ini dalam Emrail, Wellspring dan Putrajaya Perdana — tetapi ketiga-tiga pihak gagal bayar.',
  'audit forensik': 'Penyiasatan mendalam ke atas rekod kewangan untuk mencari bukti salah laku atau kesilapan besar, bukan sekadar mengesahkan akaun.',
  'nilai buku': 'Nilai aset seperti dicatat dalam akaun. Boleh berbeza jauh daripada nilai pasaran (harga yang orang benar-benar mahu bayar).',
  'premium': 'Bayaran LEBIH daripada nilai pasaran. Aset LTH dipindahkan ke UJSB pada premium RM10.2 bilion di atas nilai pasaran — itulah yang menutup jurang defisit.',
  'istito’ah': 'Prinsip syariah bahawa haji hanya difardukan kepada mereka yang mampu — termasuk mampu dari segi kewangan. Suruhanjaya guna prinsip ini untuk menyokong syor bahawa subsidi hanya untuk yang memerlukan.',
  'seksyen 22': 'Peruntukan Akta 535 yang mengawal pengisytiharan hibah. Seksyen 22(3)(a): hibah hanya boleh diisytiharkan jika aset TIDAK KURANG daripada liabiliti. Seksyen 22(3)(b): aset Kumpulan Wang Rizab tidak kurang daripada peratusan yang diluluskan Perbendaharaan.',
  'seksyen 24': 'Peruntukan Akta 535: jika LTH tidak mampu membayar pengeluaran pendeposit, perbelanjaan itu dibayar daripada Kumpulan Wang Disatukan Kerajaan — inilah jaminan Kerajaan yang kini bernilai RM88 bilion.',
  'Akta 240': 'Akta Badan Berkanun (Akaun dan Laporan Tahunan) 1980 — mewajibkan badan berkanun menyimpan akaun mengikut prinsip perakaunan yang diakui umum.',
  'IKBB': 'Institusi Kewangan Bukan Bank. LTH adalah IKBB — ia menerima deposit tetapi bukan bank, jadi tidak tertakluk kepada undang-undang perbankan atau kawal selia penuh BNM.',
  'Danaharta': 'Danaharta Nasional Berhad — syarikat yang ditubuhkan Kerajaan untuk mengambil alih aset lemah bank semasa krisis 1998. UJSB dibina berdasarkan model yang sama.'
};

/* Metodologi RCI */
RD.rci = {
  p: [41, 42, 43, 44, 46, 47, 48],
  objektif: 'Menyiasat isu berbangkit mengenai pengurusan dan operasi LTH dari tahun 2014 hingga 2020.',
  skop: [
    'Meneliti isu LTH 2014–2020 dengan merujuk penemuan PwC, EY dan Roland Berger — TIDAK termasuk pelan penstrukturan dan pemulihan yang sedang dijalankan.',
    'Meneliti dokumen dan bukti, serta menentukan sama ada terdapat perbuatan MENYEMBUNYIKAN maklumat dan memberi kenyataan yang MENGELIRUKAN.',
    'Mengesyorkan tindakan terhadap mana-mana pihak yang melanggar peruntukan undang-undang.',
    'Mengemukakan laporan hasil siasatan dan syor penambahbaikan kepada Kerajaan.'
  ],
  pesuruhjaya: [
    { n: 'Tun Md Raus bin Sharif', j: 'Pengerusi — Mantan Ketua Hakim Negara' },
    { n: 'Tan Sri Samsudin bin Osman', j: 'Mantan Ketua Setiausaha Negara' },
    { n: 'Tan Sri Abdul Rashid bin Hussain', j: 'Pengasas RHB Group' },
    { n: 'Tan Sri Dr. Mohd Munir bin Abdul Majid', j: 'Pengerusi CARI ASEAN Research and Advocacy' },
    { n: 'Profesor Dr. Asmadi bin Mohamed Naim', j: 'Naib Canselor UniSHAMS' },
    { n: 'Norsyahrin bin Hamidon', j: 'Akauntan Bertauliah' }
  ],
  setiausaha: 'Datuk Hajah Hakimah binti Mohd Yusoff — Ketua Pengarah JAKIM',
  metodologi: ['Pengumpulan rekod dan dokumen', 'Taklimat agensi', 'Akuan Berkanun Saksi', 'Prosiding Suruhanjaya'],
  tempoh: '20 Januari 2022 – 19 Julai 2022 (enam bulan)',
  saksiAbs: 45, saksiProsiding: 16, agensi: 8, kuorum: 5,
  agensiSenarai: [
    { n: 'Lembaga Tabung Haji', t: '23 Feb, 8 Apr & 28 Apr 2022' },
    { n: 'Ernst & Young', t: '24 Feb & 7 Jul 2022' },
    { n: 'Roland Berger', t: '25 Feb 2022' },
    { n: 'PricewaterhouseCoopers', t: '10 Mac 2022' },
    { n: 'Bank Negara Malaysia', t: '14 Mac 2022' },
    { n: 'Jabatan Audit Negara', t: '25 Mac 2022' },
    { n: 'Kementerian Kewangan Malaysia', t: '1 Apr 2022' },
    { n: 'Urusharta Jamaah Sdn. Bhd.', t: '1 Apr 2022' }
  ],
  ekshibit: [
    { j: 'Jilid 1–3', d: 'Akuan Berkanun Saksi — mereka yang TIDAK dipanggil memberi keterangan (29 orang)' },
    { j: 'Jilid 4–7', d: 'Akuan Berkanun Saksi + Nota Keterangan — 16 saksi yang dipanggil' },
    { j: 'Jilid 8–10', d: 'Laporan Ernst & Young (analisis hibah 2018, audit anak syarikat, penilaian syarikat pelaburan, THIP)' },
    { j: 'Jilid 11', d: 'Laporan PwC (Financial Position Review), Laporan Roland Berger, Laporan Jabatan Audit Negara' },
    { j: 'Jilid 12', d: 'Surat-surat agensi (KAN, BNM, MOF), perjanjian UJSB, Proforma EY, Penyata Kewangan Beraudit 2017' }
  ]
};
