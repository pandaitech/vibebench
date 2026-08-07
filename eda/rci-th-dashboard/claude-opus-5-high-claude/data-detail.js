/* =====================================================================
   PANGKALAN DATA TERPERINCI — penemuan, pelaburan bermasalah, tindakan
   undang-undang, cadangan, dan siri data naratif.
   Semua `ms` = muka surat PDF laporan.
   ===================================================================== */

window.RCI_DETAIL = (function () {

  /* ---------------------------------------------------------------
     A. ANGKA UTAMA YANG DISEBUT DALAM TEKS LAPORAN
  --------------------------------------------------------------- */
  const angkaBesar = [
    { id: 'pendeposit', label: 'Bilangan pendeposit LTH', nilai: 8.6, unit: 'juta orang', ms: 229,
      nota: 'Laporan juga menyebut angka 9.2 juta (ms 150) dan 9.3 juta (ms 152) dalam konteks tahun 2018. Angka berbeza ini tidak diselaraskan dalam laporan.' },
    { id: 'deposit', label: 'Jumlah deposit LTH ketika laporan disiapkan', nilai: 88, unit: 'RM bilion', ms: 229 },
    { id: 'jemaah', label: 'Jemaah haji diuruskan LTH sejak 1963 hingga 2021', nilai: 1.46, unit: 'juta orang', ms: 229 },
    { id: 'hibahKumulatif', label: 'Jumlah agihan keuntungan sejak 1966 hingga 2021', nilai: 37.52, unit: 'RM bilion', ms: 229 },
    { id: 'hafisKumulatif', label: 'Jumlah subsidi HAFIS sejak 2001', nilai: 2.02, unit: 'RM bilion', ms: 229 },
    { id: 'sukuk', label: 'Nilai langganan Sukuk UJSB oleh LTH', nilai: 27.56, unit: 'RM bilion', ms: 157 },
    { id: 'jaminan', label: 'Nilai jaminan Kerajaan kepada pendeposit (seksyen 24 Akta 535)', nilai: 88, unit: 'RM bilion', ms: 152 },
    { id: 'peruntukan', label: 'Peruntukan Kerajaan diluluskan bagi kekurangan penebusan Sukuk UJSB', nilai: 17.8, unit: 'RM bilion', ms: 26 },
    { id: 'tumpuan', label: 'Bahagian deposit dimiliki oleh 5% pendeposit terbesar', nilai: 75, unit: '%', ms: 216 },
    { id: 'menunggu', label: 'Tempoh menunggu giliran haji pada kadar pendaftaran RM1,300', nilai: 130, unit: 'tahun', ms: 236 },
  ];

  /* ---------------------------------------------------------------
     B. SIRI DEPOSIT — angka yang disebut dalam teks (bukan jadual).
     Bukan siri tahunan penuh; hanya titik yang dinyatakan laporan.
  --------------------------------------------------------------- */
  const depositDisebut = [
    { titik: 'Sebelum pengumuman agihan 2018', anggarTahun: 2018.9, rm: 73, ms: 122, nota: 'Laporan menyebut "kira-kira RM73 bilion".' },
    { titik: 'Akhir 2019', anggarTahun: 2019.9, rm: 69, ms: 122, nota: 'Selepas kadar agihan 1.25% diumumkan.' },
    { titik: 'Akhir 2020', anggarTahun: 2020.9, rm: 76, ms: 122, nota: 'Laporan menyebut "lebih kurang RM76 bilion".' },
    { titik: 'Ketika laporan disiapkan (2022)', anggarTahun: 2022.5, rm: 88, ms: 122 },
  ];

  /* ---------------------------------------------------------------
     C. 14 PELABURAN BERMASALAH — butiran penuh
     `rugiRM` hanya diisi jika laporan menyatakan angka dalam Ringgit.
     Transaksi dalam USD/SR dibiarkan dalam mata wang asal; laporan
     tidak memberi kadar tukaran, jadi dashboard TIDAK menukarnya.
  --------------------------------------------------------------- */
  const pelaburanBermasalah = [
    {
      no: 1, nama: 'PT TH Indo Plantations (THIP)', ringkas: 'THIP', kategori: 'Perladangan', lokasi: 'Riau, Indonesia',
      tahun: 2016, pelaburanRM: null, rugiRM: null, mataWangLain: 'USD',
      apaJadi: 'LTH menjual 95% ekuitinya dalam THIP (ladang seluas 83,000 hektar di Riau, Sumatera) kepada PT Borneo Pacific. Syer dipindahkan sebelum bayaran penuh diterima, harga asal USD910 juta dikurangkan sebanyak USD100 juta, dan LTH terpaksa memberi pendahuluan USD178.6 juta yang sepatutnya ditanggung pembeli.',
      punca: 'Kelemahan tadbir urus dalam urus niaga penjualan — syer berpindah tangan sebelum bayaran selesai.',
      kelemahan: ['Syer dipindah sebelum bayaran penuh', 'Terma dipinda memihak pembeli', 'LTH menanggung kos yang sepatutnya ditanggung pembeli'],
      tindakan: 'Siasatan dalaman, siasatan forensik oleh peguam, dan laporan polis. Siasatan PDRM masih berterusan.',
      ms: 177,
    },
    {
      no: 2, nama: 'Emrail Sdn. Bhd.', ringkas: 'Emrail', kategori: 'Pembinaan / Infrastruktur', lokasi: 'Malaysia',
      tahun: 2016, pelaburanRM: 20.17, rugiRM: 19.3,
      apaJadi: 'LTH membeli 15.3% ekuiti Emrail pada 7 Jun 2016 (RM20.17 juta) daripada Lingkaran Hartaniaga Sdn. Bhd. Rancangan penyenaraian dibatalkan dan sasaran keuntungan RM36.1 juta bagi 2016 tidak tercapai. LTH melaksanakan Put Option bernilai RM20.3 juta pada 26 April 2017, tetapi penjual hanya membayar RM2 juta.',
      punca: 'Put Option — hak menjual semula saham pada harga tetap — tidak dapat dikuatkuasakan kerana pihak yang berjanji membeli semula tidak mampu membayar.',
      kelemahan: ['Jaminan pulangan bergantung kepada satu pihak swasta', 'Tiada cagaran ke atas Put Option'],
      tindakan: 'Rosot nilai RM19.3 juta direkod pada 31 Dis 2020. Writ difailkan 8 Sept 2021; kes dirujuk ke timbang tara di AIAC (didaftar 22 April 2022).',
      ms: 178,
    },
    {
      no: 3, nama: 'Wellspring Worldwide Limited', ringkas: 'Wellspring', kategori: 'Ekuiti swasta', lokasi: 'Luar negara',
      tahun: 2014, pelaburanRM: 18.4, rugiRM: 19.03,
      apaJadi: 'LTH membeli 10% ekuiti Wellspring pada 21 September 2014 berjumlah RM18.4 juta. Syarikat gagal disenaraikan. LTH melaksanakan Put Option pada 19 September 2016 bernilai RM19.03 juta terhadap para Promoter, tetapi mereka gagal membayar.',
      punca: 'Corak yang sama dengan Emrail — pulangan bergantung sepenuhnya kepada janji membeli semula oleh individu.',
      kelemahan: ['Put Option tidak bercagar', 'Kebergantungan kepada janji individu'],
      tindakan: 'Rosot nilai RM19.03 juta pada 31 Dis 2019. Mahkamah memutuskan pada 5 Okt 2018 supaya Promoter membayar RM20.8 juta; mereka gagal. Notis kebankrapan dibenarkan mahkamah pada 25 Januari 2022.',
      ms: 179,
    },
    {
      no: 4, nama: 'Deru Semangat Sdn. Bhd. (DSSB)', ringkas: 'DSSB', kategori: 'Perladangan', lokasi: 'Tembeling, Pahang',
      tahun: 2014, pelaburanRM: 526.16, rugiRM: 225,
      rugiNota: 'Laporan menyatakan pelaburan RM257 juta yang telah dikeluarkan dirosot nilai kepada RM32 juta. Angka RM225 juta di sini ialah beza antara kedua-duanya (dikira oleh dashboard).',
      apaJadi: 'LTH meluluskan RM526.16 juta bagi usaha sama ladang kelapa sawit di Tembeling, Pahang — mengambil 55% ekuiti dalam DSSB (RM231 juta) serta pembiayaan pembangunan RM295.16 juta. Setakat Januari 2021 hanya RM257 juta dikeluarkan. Ladang melanggar polisi "No Deforestation, No Peat and No Exploitation" (NOPE) sehingga pembeli utama Wilmar International enggan membeli hasil sawitnya.',
      punca: 'Risiko kelestarian tidak dinilai. Tanpa pembeli utama, ladang kehilangan nilai komersialnya.',
      kelemahan: ['Risiko alam sekitar & kelestarian tidak dinilai', 'Kelulusan berperingkat oleh Menteri', 'Nilai jatuh sebelum projek matang'],
      tindakan: 'LTH merungkaikan pegangan ekuiti dengan bayaran RM259 juta; pihak rakan kongsi mengenepikan komitmen LTH mengeluarkan baki RM258 juta.',
      ms: 180,
    },
    {
      no: 5, nama: 'Trurich Resources Sdn. Bhd.', ringkas: 'Trurich', kategori: 'Perladangan', lokasi: 'Kalimantan, Indonesia',
      tahun: 2009, pelaburanRM: 364.31, rugiRM: 364.31,
      apaJadi: 'Usaha sama dengan Felda Global Ventures ditubuhkan 30 November 2009 untuk membangunkan 200,000 hektar ladang sawit di Kalimantan. Syarikat menjadi insolven: liabiliti semasa bersih RM119.67 juta (2017) dan RM92.78 juta (2018). Pinjaman Trurich kepada Maybank sebanyak USD179 juta tertunggak.',
      punca: 'Usaha sama tidak menghasilkan pulangan; laporan turut menyebut dakwaan manipulasi laporan kesesuaian tanah.',
      kelemahan: ['Laporan kesesuaian tanah didakwa dimanipulasi', 'Usaha sama tanpa kawalan operasi', 'Beban hutang di peringkat syarikat usaha sama'],
      tindakan: 'Pelaburan dirosot nilai sepenuhnya. Lembaga Pengarah membuat laporan polis. Menteri meluluskan pelupusan pada 22 Disember 2020.',
      ms: 181,
    },
    {
      no: 6, nama: 'Abraj Sdn. Bhd.', ringkas: 'Abraj', kategori: 'Hartanah', lokasi: 'Malaysia',
      tahun: 2009, pelaburanRM: 85, rugiRM: 40.25,
      apaJadi: 'Usaha sama hartanah 50:50 dengan Amanah Raya Berhad sejak 11 November 2009. Kedudukan kewangan terjejas sejak 2015 apabila penyewa utama berpindah keluar. LTH menjual 50% pegangannya kepada rakan kongsi pada Disember 2020.',
      punca: 'Kebergantungan kepada satu penyewa utama.',
      kelemahan: ['Risiko penyewa tunggal', 'Tiada pelan ganti apabila penyewa keluar'],
      tindakan: 'Kerugian rosot nilai RM40.25 juta daripada pegangan ekuiti keseluruhan RM85 juta.',
      ms: 182,
    },
    {
      no: 7, nama: 'Putrajaya Perdana Berhad (PPB)', ringkas: 'PPB', kategori: 'Pembinaan / Hartanah', lokasi: 'Malaysia',
      tahun: 2014, pelaburanRM: 193.50, rugiRM: 145.3,
      apaJadi: 'LTH membeli 30% ekuiti PPB pada Disember 2014 (RM193.50 juta) daripada Cendana Destini Sdn. Bhd., dengan harapan menyenaraikan syarikat itu dalam tempoh setahun. Penyenaraian gagal dan sasaran keuntungan RM86 juta bagi 2015 tidak tercapai. Put Option bernilai RM210.7 juta dilaksanakan pada 7 Mac 2018 tetapi penjual gagal membayar.',
      punca: 'Ketiga-tiga kes Emrail, Wellspring dan PPB berkongsi corak yang sama: pulangan dijanjikan melalui penyenaraian atau Put Option yang akhirnya tidak dapat dikuatkuasakan.',
      kelemahan: ['Put Option tidak bercagar', 'Sasaran keuntungan tidak dicapai', 'Rancangan penyenaraian gagal'],
      tindakan: 'Rosot nilai RM145.3 juta setakat 31 Dis 2020; nilai buku bersih tinggal RM48.2 juta. Tindakan undang-undang diluluskan 12 Nov 2020.',
      ms: 183,
    },
    {
      no: 8, nama: 'Al-Rawda Real Estates Development & Project Management Co. Ltd.', ringkas: 'Al-Rawda', kategori: 'Hotel / Pajakan', lokasi: 'Makkah & Madinah, Arab Saudi',
      tahun: 2015, pelaburanRM: null, rugiRM: null, mataWangLain: 'SR',
      apaJadi: 'LTH memeterai pajakan jangka panjang (10–18 tahun) bagi empat hotel — Al-Aqiq, Al-Haram dan Al-Saha di Madinah serta Rawdat Al-Bait di Makkah — bernilai SR1,426 juta yang dibayar kepada Al-Rawda. Al-Rawda turut dilantik sebagai pengendali hotel dengan janji pendapatan sewa SR2,490 juta, dijamin peribadi oleh seorang individu melalui Nota Janji. Sejak Mac 2019 bayaran sewa gagal dijelaskan; tunggakan mencecah SR560.7 juta menjelang 31 Disember 2021.',
      punca: 'Seluruh struktur bergantung kepada satu rakan niaga yang sama sebagai pemajak, pengendali dan sumber bayaran.',
      kelemahan: ['Rakan niaga tunggal memegang berbilang peranan', 'Jaminan peribadi sebagai sandaran utama', 'Penguatkuasaan rentas sempadan yang sukar'],
      tindakan: 'LTH memfailkan sembilan tindakan Nota Janji melibatkan SR344.0 juta di Mahkamah Penguatkuasaan Arab Saudi. Aset penjamin dibekukan dan sekatan perjalanan dikenakan; proses likuidasi 20 hartanah sedang berjalan. Al-Rawda pula mencabar keesahan perjanjian melalui timbang tara atas alasan bercanggah syariah.',
      ms: 184,
    },
    {
      no: 9, nama: 'Al-Fareeda Residential Fund', ringkas: 'Al-Fareeda', kategori: 'Dana hartanah', lokasi: 'Arab Saudi',
      tahun: 2013, pelaburanRM: 63, rugiRM: 63,
      apaJadi: 'LTH melanggan SR76 juta (RM63 juta), iaitu 13.8% daripada dana keseluruhan SR550 juta, dalam dana hartanah perumahan Arab Saudi melalui pengurus dana Anfaal Capital. Dana bermasalah akibat undang-undang buruh dan imigresen baharu, kontraktor bermasalah, kenaikan harga bahan binaan dan kejatuhan harga minyak. Aset diserahkan kepada bank pemberi pinjaman.',
      punca: 'Tiada perkembangan sejak 2017 dan pengurus dana tidak dapat dikesan.',
      kelemahan: ['Pemantauan pelaburan luar negara tidak memadai', 'Pengurus dana hilang dikesan'],
      tindakan: 'Pelaburan dihapus kira secara keseluruhan.',
      ms: 188,
    },
    {
      no: 10, nama: 'TH Plantations Berhad (THP)', ringkas: 'THP', kategori: 'Perladangan (tersenarai)', lokasi: 'Malaysia',
      tahun: 2012, pelaburanRM: 1200, rugiRM: 170,
      pelaburanNota: 'RM1.2 bilion ialah nilai Sukuk yang dikeluarkan LTH bagi membiayai pembelian ladang THP 2012–2014, bukan nilai pelaburan ekuiti LTH dalam THP.',
      apaJadi: 'Laporan forensik PwC bertarikh 25 April 2019 mendapati pengurusan kanan dan Lembaga THP gagal memenuhi tanggungjawab fidusiari, terutamanya dalam pengambilalihan Bumi Suria Ventures, Maju Warisanmas dan PT Persada Kencana Prima. THP membiayai pembelian ladang baharu melalui Sukuk RM1.2 bilion daripada LTH, namun hanya 58% ladang yang produktif.',
      punca: 'Ladang dibeli dengan hutang besar tetapi sebahagian besarnya belum menghasilkan pendapatan.',
      kelemahan: ['Tiada due diligence menyeluruh', 'Kegagalan tanggungjawab fidusiari Lembaga', 'Pembelian dibiayai hutang tanpa aliran tunai padanan'],
      tindakan: 'Laporan dibuat kepada PDRM, SPRM dan Suruhanjaya Sekuriti. Ketua Pegawai Eksekutif THP diletakkan cuti dan meletak jawatan pada 20 Ogos 2018. Rosot nilai RM170 juta di peringkat LTH.',
      ms: 189,
    },
    {
      no: 11, nama: 'TH Properties Sdn. Bhd. — bonus istimewa', ringkas: 'TH Properties', kategori: 'Tadbir urus anak syarikat', lokasi: 'Malaysia',
      tahun: 2017, pelaburanRM: null, rugiRM: 2.2,
      apaJadi: 'Bonus istimewa berjumlah RM2.2 juta dibayar pada 2017 dan 2018 kepada Ahli Lembaga dan pengurusan TH Properties tanpa kelulusan LTH sebagai pemegang ekuiti utama. Kelulusan dibuat oleh Exco TH Properties dan Lembaga THP Australia Capital, sedangkan Exco tidak diberi mandat sedemikian.',
      punca: 'Kelulusan dibuat oleh badan yang tidak mempunyai kuasa untuk meluluskannya.',
      kelemahan: ['Melebihi had mandat', 'Kelulusan tanpa kuasa yang sah', 'Konflik kepentingan — penerima turut membuat keputusan'],
      tindakan: 'Siasatan dalaman bermula 5 Februari 2020. Pada 12 Ogos 2020 Lembaga memutuskan untuk mendapatkan kembali bonus 2017–2018. Suruhanjaya mengesahkan berlaku pelanggaran seksyen 230 Akta 777.',
      ms: 190,
    },
    {
      no: 12, nama: 'Alam Maritim Resources Berhad / Kumpulan TH Marine', ringkas: 'TH Marine', kategori: 'Marin / Minyak & gas', lokasi: 'Malaysia',
      tahun: 2015, pelaburanRM: 334, rugiRM: 198,
      apaJadi: 'Pelaburan dalam sektor marin dan kapal sokongan pelantar (AHTS). Sektor ini terjejas teruk oleh kejatuhan harga minyak.',
      punca: 'Pendedahan kepada kitaran harga minyak dalam sektor yang LTH tidak mempunyai kepakaran.',
      kelemahan: ['Pelaburan dalam sektor di luar kepakaran', 'Pendedahan kepada kitaran komoditi'],
      tindakan: 'Kerugian rosot nilai RM198 juta.',
      ms: 191,
    },
    {
      no: 13, nama: 'TH Hotel & Residences Sdn. Bhd. (THHR)', ringkas: 'THHR', kategori: 'Hotel', lokasi: 'Malaysia',
      tahun: 2018, pelaburanRM: 804.1, rugiRM: 5.9,
      apaJadi: 'Aset hotel dipindahkan kepada UJSB sebagai sebahagian daripada pelan pemulihan.',
      punca: 'Sebahagian daripada portfolio hartanah yang dipindahkan pada nilai premium.',
      kelemahan: ['Nilai pemindahan melebihi nilai pasaran'],
      tindakan: 'Rosot nilai RM5.9 juta.',
      ms: 191,
    },
    {
      no: 14, nama: 'FGV Holdings Berhad (FGV)', ringkas: 'FGV', kategori: 'Perladangan (tersenarai)', lokasi: 'Malaysia',
      tahun: 2012, pelaburanRM: 1310.02, rugiRM: 1058.94,
      apaJadi: 'Pelaburan dalam terbitan awam awam (IPO) FGV pada 2012 berjumlah RM1,310.02 juta. Harga saham merosot jauh di bawah harga IPO dan tidak pulih.',
      punca: 'Pelaburan tertumpu bersaiz besar dalam satu kaunter yang kemudian jatuh nilai secara berpanjangan.',
      kelemahan: ['Saiz pelaburan tertumpu', 'Tiada strategi keluar', 'Kerugian dibiarkan berpanjangan tanpa rosot nilai penuh'],
      tindakan: 'Rosot nilai RM1,058.94 juta — kerugian tunggal terbesar antara 14 pelaburan bermasalah yang dinyatakan dalam Ringgit.',
      ms: 193,
    },
  ];

  /* ---------------------------------------------------------------
     D. TINDAKAN UNDANG-UNDANG & TATATERTIB
  --------------------------------------------------------------- */
  const tindakan = [
    { jenis: 'Laporan Polis', perkara: 'Aktiviti dan penggunaan wang Yayasan Tabung Haji didakwa menyalahi Memorandum and Articles of Association.', tarikh: '2018-11-30', status: 'Siasatan lengkap; kertas siasatan dirujuk kepada Jabatan Peguam Negara untuk arahan Pendakwa Raya.', ms: 193 },
    { jenis: 'Laporan Polis', perkara: 'Penjualan pegangan ekuiti LTH dalam THIP kepada PT Borneo Pacific — dakwaan salah nyataan dan penyembunyian maklumat.', tarikh: '2018-11-30', status: 'Siasatan berterusan; menunggu kebenaran pihak berkuasa Indonesia bagi soal siasat dan dokumen rentas sempadan.', ms: 194 },
    { jenis: 'Laporan Polis', perkara: 'Dakwaan manipulasi laporan kesesuaian tanah bagi perolehan ladang Trurich di Kalimantan.', tarikh: '2018-12-13', status: 'Siasatan berterusan; menunggu kebenaran pihak berkuasa Indonesia.', ms: 195 },
    { jenis: 'Laporan Polis', perkara: 'Dakwaan salah nyataan dalam kertas kerja pengisytiharan hibah tahun kewangan 2017, melanggar seksyen 22 Akta 535.', tarikh: '2019-01-16', status: 'Siasatan lengkap; kertas siasatan dirujuk kepada Jabatan Peguam Negara untuk arahan Pendakwa Raya.', ms: 196 },
    { jenis: 'Tindakan Tatatertib', perkara: 'Kluster Pertama — penjualan saham PT TH Indo Plantations. Empat pegawai dipertuduh.', tarikh: '2020-05-29', status: 'Keputusan buang kerja pada 21 April 2021; selepas rayuan pada 6 September 2021 hukuman dikurangkan kepada turun pangkat.', ms: 198 },
    { jenis: 'Tindakan Tatatertib', perkara: 'Kluster Kedua — sumbangan RM22.12 juta kepada Yayasan Tabung Haji tanpa kelulusan awal Menteri (seksyen 24(3)(5) Akta Syarikat 1965). Tiga pegawai dipertuduh.', tarikh: '2019-03-15', status: 'Keputusan turun pangkat; selepas rayuan dikurangkan kepada amaran keras dan amaran serta tangguh kenaikan gaji.', ms: 198 },
    { jenis: 'Tindakan Tatatertib', perkara: 'Kluster Ketiga — pengisytiharan untung boleh agih (hibah) tahun kewangan 2017.', tarikh: '2020-01-03', status: 'Keputusan buang kerja pada 16 April 2021; selepas rayuan pada 6 September 2021 dikurangkan kepada turun pangkat.', ms: 199 },
    { jenis: 'Tindakan Tatatertib', perkara: 'Kluster Keempat — tuntutan kepada Pengurus Unit Bayaran didakwa mengandungi butiran palsu.', tarikh: '2019-01-11', status: 'Turun pangkat pada 1 November 2019; dikekalkan selepas rayuan pada 28 Januari 2020.', ms: 199 },
    { jenis: 'Laporan SPRM', perkara: 'Dakwaan rasuah dalam pembelian Ladang Weida Bhd oleh TH Plantation.', tarikh: null, status: 'Siasatan SPRM berterusan.', ms: 201 },
    { jenis: 'Laporan SPRM', perkara: 'Dakwaan penyelewengan dan salah guna kuasa dalam penyewaan Restoran Opah, KL Sentral.', tarikh: null, status: 'Siasatan SPRM berterusan.', ms: 201 },
    { jenis: 'Laporan SPRM', perkara: 'Dakwaan penyelewengan dan salah guna kuasa dalam penyewaan Restoran Nasi Dalca di Ibu Pejabat LTH.', tarikh: null, status: 'Siasatan SPRM berterusan.', ms: 201 },
    { jenis: 'Laporan SPRM', perkara: 'Dakwaan penyelewengan dan rasuah oleh mantan Ketua Pegawai Operasi LTH dalam kerja pengubahsuaian.', tarikh: null, status: 'Siasatan SPRM berterusan.', ms: 202 },
    { jenis: 'Laporan SPRM', perkara: 'Dakwaan pemalsuan dokumen pembekalan anak benih getah TH Plantation di Ladang TH-Usia Jatimas, Sandakan.', tarikh: null, status: 'Siasatan SPRM berterusan.', ms: 202 },
    { jenis: 'Laporan SPRM', perkara: 'Dakwaan salah laku dan penyelewengan oleh pegawai THP Bina Sdn. Bhd. dan THP Timur Sdn. Bhd.', tarikh: null, status: 'Siasatan SPRM berterusan.', ms: 202 },
    { jenis: 'Timbang Tara', perkara: 'Al-Rawda mencabar Perjanjian Pengurusan dan Operasi atas alasan bertentangan syariah.', tarikh: '2021-07-01', status: 'Proses timbang tara berlangsung; LTH menafikan dakwaan tersebut.', ms: 187 },
    { jenis: 'Tindakan Mahkamah', perkara: 'Penguatkuasaan Nota Janji terhadap Al-Rawda dan penjamin di Mahkamah Penguatkuasaan Arab Saudi (SR344.0 juta).', tarikh: '2019-03-01', status: 'Perintah penguatkuasaan diperoleh; aset penjamin dibekukan; sekatan perjalanan dikenakan; likuidasi 20 hartanah dijangka mengambil masa sehingga dua tahun.', ms: 186 },
    { jenis: 'Tindakan Mahkamah', perkara: 'Isu berbangkit daripada penjualan ekuiti LTH dalam PT TH Indo Plantations kepada PT Borneo Pacific.', tarikh: null, status: 'Sedang melalui proses undang-undang.', ms: 202 },
    { jenis: 'Tindakan Mahkamah', perkara: 'Writ terhadap penjual Emrail; kes kemudian dirujuk ke timbang tara di AIAC.', tarikh: '2021-09-08', status: 'Didaftar di AIAC pada 22 April 2022; penimbang tara dalam proses pemilihan.', ms: 178 },
    { jenis: 'Tindakan Mahkamah', perkara: 'Tuntutan terhadap Promoter Wellspring; mahkamah memerintahkan bayaran RM20.8 juta.', tarikh: '2018-10-05', status: 'Promoter gagal membayar; notis kebankrapan dibenarkan mahkamah pada 25 Januari 2022.', ms: 179 },
  ];

  /* ---------------------------------------------------------------
     E. PENEMUAN UTAMA — disusun mengikut tema
  --------------------------------------------------------------- */
  const penemuan = [
    // — Tadbir Urus —
    { id: 'P01', tema: 'Tadbir Urus', tajuk: 'Akta 535 memberi kuasa yang sangat luas kepada Menteri', isu: 'Akta Tabung Haji 1995 memberi Menteri kuasa merangkumi operasi haji, dana dan pelaburan. Ketiga-tiga Menteri Hal Ehwal Agama yang menyelia LTH dalam tempoh siasatan mempunyai kepakaran terhad kepada bidang hal ehwal agama sahaja.', kesan: 'Menteri bergantung sepenuhnya kepada cadangan pengurusan dan Lembaga tanpa input tambahan sebelum membuat keputusan mengenai dana dan pelaburan.', ms: 15 },
    { id: 'P02', tema: 'Tadbir Urus', tajuk: 'Tiada kriteria khusus untuk melantik anggota Lembaga', isu: 'Seksyen 6(2) Akta 535 hanya menetapkan Pengerusi atau anggota Lembaga hendaklah seorang muslim dan warganegara Malaysia. Tiada syarat pengetahuan atau pengalaman dalam kewangan, perniagaan, ekonomi atau perakaunan.', kesan: 'Membuka ruang pelantikan ahli politik sebagai Pengerusi dan anggota Lembaga bagi tempoh 2014 hingga 2018.', ms: 16 },
    { id: 'P03', tema: 'Tadbir Urus', tajuk: 'Beberapa keputusan LTH didorong unsur politik', isu: 'Suruhanjaya mendapati keputusan seperti bayaran agihan keuntungan (hibah), penentuan bayaran haji dan Bantuan Kewangan Haji didorong oleh unsur-unsur politik.', kesan: 'Keputusan kewangan dibuat atas pertimbangan selain kemampuan kewangan LTH.', ms: 16 },
    { id: 'P04', tema: 'Tadbir Urus', tajuk: 'Menteri boleh menamatkan perkhidmatan tanpa memberi sebab', isu: 'Akta 535 membenarkan Menteri membatalkan pelantikan mana-mana anggota Lembaga pada bila-bila masa tanpa memberikan apa-apa sebab. Kuasa ini digunakan dua kali: penamatan Ketua Pegawai Eksekutif pada 5 Mei 2021 dan Pengerusi Lembaga pada 15 Oktober 2021, kedua-duanya sebelum tamat tempoh.', kesan: 'Menjejaskan kestabilan dan kebebasan kepimpinan LTH.', ms: 17 },
    { id: 'P05', tema: 'Tadbir Urus', tajuk: 'Anggota Lembaga terlalu banyak memegang jawatan dalam anak syarikat', isu: 'Pegawai dan anggota Lembaga LTH terlibat dalam banyak anak syarikat sama ada sebagai Pengerusi atau Ahli Lembaga Pengarah, di samping jawatan dalam jawatankuasa Lembaga.', kesan: 'Kurang fokus kepada tugas hakiki di LTH dan menimbulkan konflik kepentingan.', ms: 17 },
    { id: 'P06', tema: 'Tadbir Urus', tajuk: 'Jawatankuasa penting tidak dikanunkan dalam Akta 535', isu: 'Panel Pelaburan, Jawatankuasa Penasihat Syariah dan Jawatankuasa Pengurusan Haji ditubuhkan hanya melalui seksyen 11 Akta 535, bukan diperuntukkan secara khusus.', kesan: 'Jawatankuasa boleh dibubarkan secara pentadbiran — seperti berlaku kepada Panel Pelaburan yang dibubarkan pada 2018 dan diganti dengan jawatankuasa lain yang tidak selari dengan Akta 535.', ms: 17 },
    { id: 'P07', tema: 'Tadbir Urus', tajuk: 'Proses membuat keputusan pelaburan tidak teratur', isu: 'Tiada koordinasi antara Ketua Pegawai Pelaburan, Ketua Kewangan Korporat, Ketua Pegawai Hartanah dan Ketua Bahagian Perbendaharaan. Panel Pelaburan bergantung sepenuhnya kepada input pengurusan tanpa semakan mencukupi; Pengerusi Panel Pelaburan mengakui pendekatan yang longgar dan tidak menyeluruh.', kesan: 'Semua dokumen kelulusan Menteri menunjukkan catatan "dipersetujui seperti dicadangkan" — tiada bukti penilaian bebas.', ms: 176 },

    // — Kewangan —
    { id: 'P08', tema: 'Kewangan', tajuk: 'Liabiliti melebihi aset sejak 2016, walaupun sebelum sebarang agihan', isu: 'Analisa PwC menunjukkan jurang defisit antara nilai aset dan liabiliti sejak 2014 selepas agihan keuntungan diambil kira; menjelang 2016 dan 2017 liabiliti sudah melebihi aset walaupun sebelum sebarang agihan dibuat.', kesan: 'Seksyen 22 Akta 535 hanya membenarkan agihan keuntungan apabila aset melebihi liabiliti.', ms: 146 },
    { id: 'P09', tema: 'Kewangan', tajuk: 'Agihan keuntungan melampaui kemampuan kewangan', isu: 'Keghairahan membayar agihan keuntungan yang tinggi sejak 2014 hingga 2017 telah melampaui kemampuan kewangan LTH dan menyusutkan rizab.', kesan: 'Menarik pendeposit yang mencari pulangan tinggi, mendedahkan LTH kepada risiko pengeluaran deposit beramai-ramai.', ms: 19 },
    { id: 'P10', tema: 'Kewangan', tajuk: 'Kemampuan sebenar 2017 hanya RM2.70 bilion, tetapi RM3.31 bilion dibayar', isu: 'Berdasarkan draf penyata kewangan pada kadar 4% baki minima tahunan, kemampuan sebenar LTH bagi 2017 ialah RM2.70 bilion. Yang dibayar ialah RM3.31 bilion pada kadar berasaskan baki minima bulanan.', kesan: 'Lebihan RM0.61 bilion, iaitu 22.6% melebihi keupayaan sebenar.', ms: 131 },
    { id: 'P11', tema: 'Kewangan', tajuk: 'Deposit mengecut selepas kadar 1.25% diumumkan', isu: 'Selepas pengumuman agihan 1.25% bagi 2018, deposit menurun daripada kira-kira RM73 bilion kepada RM69 bilion pada akhir 2019, terutamanya dalam kalangan pendeposit besar.', kesan: 'Menunjukkan LTH terdedah kepada tingkah laku pendeposit besar. Deposit pulih ke RM76 bilion pada akhir 2020 dan RM88 bilion ketika laporan disiapkan.', ms: 122 },
    { id: 'P12', tema: 'Kewangan', tajuk: 'Tekanan membayar hibah tinggi memaksa LTH mengambil risiko pelaburan berlebihan', isu: 'Pelaburan LTH lebih berat kepada ekuiti, khususnya ekuiti domestik, yang terdedah kepada turun naik pasaran. Pendedahan sebenar melebihi apa yang disarankan dalam Alokasi Aset Strategik.', kesan: 'Portfolio menjadi lebih tidak stabil pada masa LTH paling memerlukan kestabilan.', ms: 121 },

    // — Perakaunan & Audit —
    { id: 'P13', tema: 'Perakaunan', tajuk: 'RAV digunakan untuk menjustifikasikan agihan keuntungan', isu: 'Pengurusan LTH tidak menggunakan nilai aset seperti dilaporkan dalam Penyata Kewangan beraudit. Sebaliknya digunakan Nilai Aset Yang Boleh Direalisasi (RAV) yang menambah RM4,466 juta kepada nilai aset 2017.', kesan: 'Kedudukan kekurangan bertukar menjadi "nilai bersih untuk diagihkan" sebanyak RM373 juta. Pengurusan berhujah seksyen 22 tidak mempunyai definisi aset yang jelas.', ms: 119 },
    { id: 'P14', tema: 'Perakaunan', tajuk: 'Polisi rosot nilai diubah dua kali dalam tahun 2017', isu: 'Takrif "ketara" dilonggarkan daripada lebih 70% di bawah kos (dengan ujian tempoh 24 bulan) kepada lebih 85%, kemudian lebih 90%, tanpa ujian tempoh.', kesan: 'Rosot nilai yang perlu diiktiraf jatuh daripada RM1,313 juta kepada RM171 juta, dan akhirnya RM1 juta sahaja.', ms: 148 },
    { id: 'P15', tema: 'Perakaunan', tajuk: 'Keuntungan 2017 sepatutnya kerugian RM1.4 bilion', isu: 'Jika piawaian MFRS dipatuhi sepenuhnya, LTH sepatutnya merekod kerugian bersih RM1,433 juta bagi 2017 berbanding keuntungan RM3,412 juta yang dilaporkan.', kesan: 'Perolehan tertahan RM162 juta sepatutnya menjadi kerugian terkumpul RM4,683 juta.', ms: 154 },
    { id: 'P16', tema: 'Perakaunan', tajuk: 'Rosot nilai RM227.81 juta tidak direkodkan', isu: 'Dalam tahun kewangan 2017 LTH tidak merekodkan rosot nilai berjumlah RM227.81 juta terhadap pelaburan dalam tiga syarikat subsidiari dan tiga syarikat bersekutu, termasuk RM164.58 juta bagi TH Heavy Engineering Berhad.', kesan: 'Ini antara dua penemuan material yang menyebabkan Ketua Audit Negara mempertimbangkan Pendapat Berteguran.', ms: 18 },
    { id: 'P17', tema: 'Perakaunan', tajuk: 'Kumpulan Wang Pendeposit disalah-kelas sebagai ekuiti sejak 2010', isu: 'Wang pendeposit sepatutnya dikira sebagai liabiliti, tetapi dikelaskan sebagai ekuiti dalam penyata kewangan sejak 2010.', kesan: 'Pengelasan ini membolehkan kedudukan aset kelihatan lebih baik daripada sebenar, dan agihan keuntungan kelihatan "sah".', ms: 132 },
    { id: 'P18', tema: 'Audit', tajuk: 'Sijil Audit Bersih diberikan walaupun ada penemuan material', isu: 'Penyata kewangan 2014 hingga 2017 diberi Sijil Audit Bersih. Bagi 2017, Pendapat Tanpa Teguran dengan "Emphasis of Matter" dikeluarkan pada 16 Julai 2018.', kesan: 'Surat Ketua Audit Negara kepada Perdana Menteri bertarikh 19 Disember 2018 menyatakan Pendapat Berteguran tidak diberikan kerana ia akan mempengaruhi persepsi pendeposit.', ms: 21 },
    { id: 'P19', tema: 'Audit', tajuk: 'Ketua Audit Negara mempertimbangkan perkara di luar skop audit', isu: 'Suruhanjaya mendapati Jabatan Audit Negara tidak tegas. Bagi tahun kewangan 2017, Sijil Audit Bersih tidak sepatutnya diberikan dan perkara dalam "Emphasis of Matter" sepatutnya dinyatakan sebagai ketidakpatuhan.', kesan: 'Tanpa Sijil Audit Bersih, LTH tidak sepatutnya mengisytiharkan agihan 4.50% dan hibah haji 1.75% yang menelan belanja sehingga RM2.75 bilion bagi 2017.', ms: 22 },
    { id: 'P20', tema: 'Audit', tajuk: 'JAN gagal menegur kadar hibah yang terlalu tinggi', isu: 'Pegawai JAN menyatakan JAN tidak bertanggungjawab ke atas pengisytiharan agihan keuntungan yang dibuat oleh LTH.', kesan: 'Suruhanjaya menilai kenyataan itu tidak selari dengan tanggungjawab JAN dalam mengaudit sesebuah badan berkanun.', ms: 22 },

    // — Bonus —
    { id: 'P21', tema: 'Bonus', tajuk: 'Bonus kakitangan amat tinggi pada 2010 hingga 2017', isu: 'Kadar bonus antara dua hingga tiga belas bulan termasuk bonus tahunan dan bonus khas. Peruntukan memuncak pada RM74 juta pada 2014.', kesan: 'Bonus tinggi dibayar dalam tahun-tahun yang sama apabila aset LTH sebenarnya kurang daripada liabiliti.', ms: 137 },
    { id: 'P22', tema: 'Bonus', tajuk: 'Bonus tinggi berpunca daripada penilaian aset berasaskan RAV', isu: 'Keuntungan yang menjadi asas bonus dikira menggunakan penilaian RAV, bukan nilai penyata kewangan beraudit.', kesan: 'Bonus dibayar atas keuntungan yang tidak wujud sepenuhnya di bawah piawaian perakaunan.', ms: 140 },
    { id: 'P23', tema: 'Bonus', tajuk: 'Bonus istimewa kepada kumpulan terpilih tanpa kelulusan sah', isu: 'RM1,148,400 dibayar kepada 11 orang di TH Properties bagi 2017 dan RM1,045,000 kepada 10 orang di THP Australia Capital bagi 2018, diluluskan oleh badan yang tidak mempunyai mandat.', kesan: 'Suruhanjaya mengesahkan berlaku pelanggaran seksyen 230 Akta 777 dan mengesyorkan bonus itu dituntut semula.', ms: 141 },

    // — Pemulihan / UJSB —
    { id: 'P24', tema: 'Pemulihan', tajuk: 'Aset dipindahkan pada premium RM10.2 bilion melebihi nilai pasaran', isu: 'Aset LTH dipindahkan kepada UJSB pada nilai RM19.9 bilion berbanding nilai pasaran ketika itu RM9.7 bilion.', kesan: 'Jurang RM10.2 bilion inilah yang menutup defisit LTH — tetapi ia menjadi obligasi yang perlu dilunaskan oleh UJSB dan akhirnya Kerajaan.', ms: 25 },
    { id: 'P25', tema: 'Pemulihan', tajuk: 'Sukuk UJSB berkupon sifar — LTH tidak menerima tunai tahunan', isu: 'Sukuk Siri 1 RM10 bilion (nilai nominal RM13.2 bilion, 7 tahun, 4.05%) dan Siri 2 RM9.6 bilion (nominal RM14.3 bilion, 10 tahun, 4.10%), ditambah bayaran tunai RM300 juta.', kesan: 'Hasil pengakruan Sukuk menyumbang hampir 26% daripada pendapatan tahunan LTH — melebihi satu pertiga daripada jumlah agihan tahunan kepada pendeposit — tetapi ia bukan tunai sebenar.', ms: 26 },
    { id: 'P26', tema: 'Pemulihan', tajuk: 'Sukuk UJSB pada asalnya tidak dijamin Kerajaan', isu: 'Sukuk hanya disokong Surat Sokongan Kewangan, bukan jaminan penuh. Sukuk juga tidak dinilai (unrated) dan tidak boleh diniagakan.', kesan: 'Suruhanjaya menilai kegagalan melunaskan obligasi UJSB sebagai risiko terbesar LTH, yang boleh membawa ekosistem kewangan negara kepada krisis lebih besar.', ms: 26 },
    { id: 'P27', tema: 'Pemulihan', tajuk: 'Nilai hartanah UJSB jatuh 46% berbanding nilai pemindahan', isu: 'Portfolio hartanah dipindahkan pada RM2.247 bilion; nilai pasaran pada Disember 2021 hanya RM1.203 bilion.', kesan: 'Jurang RM1.04 bilion perlu ditanggung UJSB apabila aset dilupuskan.', ms: 161 },
    { id: 'P28', tema: 'Pemulihan', tajuk: 'Saham mewah yang dipindahkan jatuh RM946 juta dalam beberapa hari', isu: 'Lima saham mewah (Axiata, Maxis, MISC, Digi, TM) dipindahkan pada RM3.606 bilion; nilai pasaran pada 31 Disember 2018 hanya RM2.660 bilion.', kesan: 'Kejatuhan RM946 juta berlaku sebelum tahun 2018 berakhir — iaitu dalam masa beberapa hari selepas perjanjian pemindahan 27 Disember 2018.', ms: 162 },
    { id: 'P29', tema: 'Pemulihan', tajuk: 'Hak Penolakan Pertama ditawarkan pada harga premium', isu: 'Saham ditawarkan kembali kepada LTH melalui ROFR pada harga lebih tinggi berbanding harga pasaran semasa.', kesan: 'Jika LTH ingin membeli semula saham itu, ia boleh berbuat demikian di pasaran terbuka pada harga lebih rendah.', ms: 176 },
    { id: 'P30', tema: 'Pemulihan', tajuk: 'UJSB antara lima komitmen jaminan terbesar Kerajaan', isu: 'UJSB disenaraikan dalam Komitmen Jaminan Kerajaan Persekutuan pada RM20,683 juta (2020) dan RM21,097 juta (2021), iaitu 11.1% daripada keseluruhan komitmen jaminan.', kesan: 'Masalah LTH kini menjadi sebahagian daripada risiko fiskal negara.', ms: 168 },

    // — Operasi Haji —
    { id: 'P31', tema: 'Operasi Haji', tajuk: 'Bayaran haji dibekukan pada RM9,980 walaupun kos meningkat', isu: 'Dari 2014 hingga 2019 jemaah Muassasah hanya membayar RM9,980 sedangkan kos haji meningkat daripada RM16,155 kepada RM22,900.', kesan: 'Bahagian yang ditanggung LTH melalui HAFIS meningkat daripada 38% kepada 56% daripada kos haji.', ms: 199 },
    { id: 'P32', tema: 'Operasi Haji', tajuk: 'HAFIS diambil daripada keuntungan pelaburan', isu: 'Subsidi haji dibiayai daripada keuntungan pelaburan LTH, bukan sumber berasingan.', kesan: 'Setiap kenaikan subsidi terus mengurangkan kadar agihan keuntungan kepada pendeposit. Suruhanjaya menganggarkan LTH memerlukan dana minimum RM60 bilion untuk menampung HAFIS pada tahap semasa.', ms: 24 },
    { id: 'P33', tema: 'Operasi Haji', tajuk: 'Deposit pendaftaran RM1,300 menyebabkan giliran haji 130 tahun', isu: 'Deposit minimum untuk layak diberi giliran haji secara automatik hanyalah RM1,300.', kesan: 'Suruhanjaya menganggarkan menaikkan kadar itu kepada RM12,980 akan memendekkan tempoh menunggu daripada 130 tahun kepada 33 tahun.', ms: 236 },
    { id: 'P34', tema: 'Operasi Haji', tajuk: 'Visi "tonggak ekonomi ummah" menyimpang daripada tujuan asal', isu: 'Peranan LTH diperluaskan melangkaui dua tujuan asalnya — membantu rakyat menunaikan haji dan membolehkan jemaah menabung.', kesan: 'LTH melibatkan diri dalam pelaburan hartanah dan perladangan secara besar-besaran tanpa kepakaran, mengakibatkan kerugian besar terutamanya dalam anak syarikat.', ms: 22 },

    // — Kawal Selia —
    { id: 'P35', tema: 'Kawal Selia', tajuk: 'BNM menyatakan kebimbangan tetapi kuasanya terhad', isu: 'BNM menyatakan kebimbangan berkenaan kadar agihan keuntungan yang tidak boleh dipertahankan, mula-mula atas kesan sistemik ke atas perbankan Islam, kemudian atas ketiadaan polisi rizab di LTH.', kesan: 'Suruhanjaya berpandangan BNM tidak seharusnya mengawal selia LTH; jika masih diperlukan, ia patut dihadkan kepada kawalan rizab dan pengurusan kecairan sahaja.', ms: 121 },
    { id: 'P36', tema: 'Kawal Selia', tajuk: 'Risiko tertumpu kepada pendeposit besar', isu: '75% daripada jumlah deposit dimiliki oleh hanya 5% pendeposit.', kesan: 'Tingkah laku sekumpulan kecil pendeposit boleh menggugat kedudukan kecairan LTH secara mendadak.', ms: 216 },
  ];

  /* ---------------------------------------------------------------
     F. 25 CADANGAN UTAMA — Ringkasan Eksekutif perenggan 35(a)–(y)
  --------------------------------------------------------------- */
  const cadangan = [
    { kod: 'a', tema: 'Undang-undang', teks: 'Pinda Akta 535 bagi menetapkan kriteria khusus dan bidang kepakaran anggota Lembaga, melarang ahli politik aktif, mewajibkan sebab munasabah sebelum penamatan, mengkanunkan jawatankuasa utama, memperjelas pengiraan agihan keuntungan, menubuhkan jabatan Dana Haji, dan mengecualikan LTH daripada Akta 240.', ms: 28 },
    { kod: 'b', tema: 'Tadbir Urus', teks: 'Susun semula struktur tadbir urus: Menteri Hal Ehwal Agama mengurus haji, Menteri Kewangan mengurus kewangan, dana dan pelaburan. Pelantikan anggota Lembaga dan Ketua Pegawai Eksekutif dibuat oleh Perdana Menteri atas syor badan penasihat bebas.', ms: 29 },
    { kod: 'c', tema: 'Tadbir Urus', teks: 'Hadkan penglibatan anggota Lembaga dan pengurusan LTH dalam pengurusan anak-anak syarikat bagi mengelak konflik kepentingan.', ms: 29 },
    { kod: 'd', tema: 'Kawal Selia', teks: 'BNM tidak seharusnya mengawal selia LTH. Jika masih diperlukan, hadkan kepada kawalan rizab dan pengurusan kecairan sahaja, tanpa tertakluk kepada Akta 759, Akta 758 dan Akta 618.', ms: 29 },
    { kod: 'e', tema: 'Audit', teks: 'Pengauditan penyata kewangan LTH tidak lagi dipertanggungjawabkan kepada Jabatan Audit Negara; LTH boleh melantik firma akauntan swasta.', ms: 30 },
    { kod: 'f', tema: 'Kewangan', teks: 'Kadar agihan keuntungan mesti berdasarkan penyata kewangan tahunan beraudit, bukan Laporan Proforma. RAV tidak boleh dijadikan asas pembayaran.', ms: 30 },
    { kod: 'g', tema: 'Perakaunan', teks: 'Laporan Penyata Kewangan LTH hendaklah mematuhi sepenuhnya piawaian pelaporan Akta 240 dan Garis Panduan PA 3.1 bagi badan berkanun persekutuan.', ms: 30 },
    { kod: 'h', tema: 'Bonus', teks: 'Amalan pemberian bonus yang terlalu tinggi kepada kakitangan hendaklah dihentikan.', ms: 30 },
    { kod: 'i', tema: 'Bonus', teks: 'Usaha perlu dibuat bagi mendapatkan semula bonus yang diberi kepada ahli Lembaga dan pengurusan TH Properties kerana ia diberikan tanpa mematuhi peraturan.', ms: 30 },
    { kod: 'j', tema: 'Pelaburan', teks: 'Audit forensik dilaksanakan ke atas 14 pelaburan bermasalah untuk meneliti bagaimana keputusan pelaburan lalu dibuat.', ms: 30 },
    { kod: 'k', tema: 'Penguatkuasaan', teks: 'Pihak berkuasa wajib mengambil tindakan tegas dan segera ke atas setiap laporan polis atau aduan berkaitan salah laku di LTH.', ms: 31 },
    { kod: 'l', tema: 'Penguatkuasaan', teks: 'Proses tindakan tatatertib di LTH termasuk durasi penahanan kerja perlu diperkemas dan disegerakan supaya dilihat berkesan, cekap, adil dan telus.', ms: 31 },
    { kod: 'm', tema: 'Penguatkuasaan', teks: 'Transaksi pelaburan yang masih dipertikaikan di mahkamah atau timbang tara perlu dipantau rapat; penyelesaian di luar mahkamah dipertingkatkan.', ms: 31 },
    { kod: 'n', tema: 'Syariah', teks: 'LTH perlu memastikan bayaran zakat dilaksanakan sempurna dan merujuk isu perubahan akad simpanan kepada Jawatankuasa Muzakarah MKI.', ms: 32 },
    { kod: 'o', tema: 'Pemulihan', teks: 'Kerajaan hendaklah memberi perhatian serius kepada pelaksanaan Pelan Pemulihan 2018. Jika LTH gagal, jaminan Kerajaan kepada pendeposit yang kini bernilai RM88 bilion terpaksa diaktifkan.', ms: 32 },
    { kod: 'p', tema: 'Pemulihan', teks: 'Sukuk yang diterbitkan semula perlu mempunyai ciri-ciri boleh diniagakan supaya LTH lebih fleksibel mengurus asetnya.', ms: 32 },
    { kod: 'q', tema: 'Pemulihan', teks: 'Penerbitan Sukuk tidak hanya ditawarkan kepada LTH atau Kerajaan tetapi juga kepada institusi kewangan lain.', ms: 32 },
    { kod: 'r', tema: 'Pemulihan', teks: 'Kerajaan hendaklah memastikan peruntukan RM1.73 bilion setahun dibuat seperti dipersetujui Jemaah Menteri bagi penebusan awal Sukuk UJSB.', ms: 32 },
    { kod: 's', tema: 'Pemulihan', teks: 'UJSB digalakkan membuat penebusan awal Sukuk daripada hasil pelupusan aset yang dipindahkan dari LTH.', ms: 33 },
    { kod: 't', tema: 'Operasi Haji', teks: 'Naikkan deposit minimum layak giliran haji daripada RM1,300 kepada kos semasa (RM12,980); hadkan pengeluaran deposit besar dengan notis sebulan; bantuan haji hanya kepada yang memerlukan.', ms: 33 },
    { kod: 'u', tema: 'Operasi Haji', teks: 'LTH perlu merancang membawa lebih ramai jemaah haji dan menggunakan sepenuhnya kuota tambahan yang ditawarkan Kerajaan Arab Saudi.', ms: 33 },
    { kod: 'v', tema: 'Operasi Haji', teks: 'Naikkan minimum bayaran pendaftaran haji Muassasah kepada RM12,980 — ini menambah deposit LTH dan memendekkan tempoh menunggu daripada 130 tahun kepada 33 tahun.', ms: 33 },
    { kod: 'w', tema: 'Pelaburan', teks: 'Fungsi pelaburan LTH dijalankan secara bebas dan profesional sebagai jabatan bernama Dana Haji, dikawal selia oleh Suruhanjaya Sekuriti Malaysia; pengurusan dana dan haji kekal dalam entiti yang sama kerana wujud subsidi silang.', ms: 33 },
    { kod: 'x', tema: 'Pelaburan', teks: 'LTH hendaklah fokus kepada portfolio pengurusan dana dan tidak terlibat dengan pelaburan berisiko tinggi, khususnya yang diklasifikasikan sebagai strategik.', ms: 34 },
    { kod: 'y', tema: 'Tadbir Urus', teks: 'Kerajaan hendaklah memperkukuh model perniagaan dan pelaburan LTH termasuk memperkasa tadbir urus melalui pengurusan profesional tanpa campur tangan politik.', ms: 34 },
  ];

  /* ---------------------------------------------------------------
     G. PENAMBAHBAIKAN LTH 2017 KE ATAS
  --------------------------------------------------------------- */
  const penambahbaikan = [
    { tahun: 2017, bidang: 'Pelaburan', tajuk: 'Roland Berger dilantik mengkaji model perniagaan', teks: 'LTH melantik firma Roland Berger sebagai perunding untuk mengkaji model perniagaan selepas masalah pengurusan pelaburan mula ketara sejak 2014.', ms: 213 },
    { tahun: 2018, bidang: 'Kewangan', tajuk: 'Penstrukturan kewangan melalui UJSB', teks: 'Kedudukan kewangan LTH dipulihkan pada akhir 2018 dengan penubuhan Urusharta Jamaah Sdn. Bhd. dan penerbitan Sukuk.', ms: 215 },
    { tahun: 2018, bidang: 'Kawal Selia', tajuk: 'Jemaah Menteri mengarahkan BNM memantau LTH', teks: 'Pada 7 Disember 2018 Jemaah Menteri memutuskan supaya Bank Negara Malaysia memantau LTH; BNM turut mencadangkan tiga model perniagaan baharu untuk dinilai.', ms: 215 },
    { tahun: 2019, bidang: 'Tadbir Urus', tajuk: 'LTH kekalkan model sedia ada dengan komitmen reformasi', teks: 'LTH menolak tiga cadangan BNM sebagai tidak praktikal dan meneruskan model sedia ada, sambil mengakui subsidi haji dan pembaharuan tadbir urus perlu dilakukan.', ms: 217 },
    { tahun: 2019, bidang: 'Kewangan', tajuk: 'Polisi agihan keuntungan dipinda', teks: 'Polisi dipinda supaya LTH mensasarkan agihan sedikit melepasi kadar purata deposit institusi kewangan Islam di Malaysia (antara 50 hingga 100 mata asas).', ms: 122 },
    { tahun: 2021, bidang: 'Tadbir Urus', tajuk: 'EY dan ZICO dilantik mengkaji semula model perniagaan', teks: 'Pengurusan LTH melantik Ernst & Young bersama firma guaman Zaid Ibrahim & Co untuk mengkaji semula model perniagaan dan mencadangkan pindaan kepada Akta 535.', ms: 220 },
    { tahun: 2022, bidang: 'Operasi Haji', tajuk: 'Bayaran haji dua lapisan diperkenalkan', teks: 'Kadar baharu diperkenalkan: RM10,980 bagi jemaah kumpulan B40 dan RM12,980 bagi bukan B40 — kenaikan pertama selepas dibekukan pada RM9,980 sejak 2014.', ms: 23 },
  ];

  /* ---------------------------------------------------------------
     H. RUMUSAN BAB EMPAT
  --------------------------------------------------------------- */
  const rumusan = [
    { no: 1, teks: 'LTH telah menjadi jenama unggul di mata rakyat Malaysia dan negara Islam lain, dengan pengurusan dan perkhidmatan haji yang mendapat pengiktirafan Kerajaan Arab Saudi dan dunia Islam.', ms: 229 },
    { no: 2, teks: 'Sejak 1963 hingga 2021 LTH menguruskan 1.46 juta rakyat Malaysia mengerjakan haji dengan bayaran rendah; subsidi HAFIS sejak 2001 berjumlah RM2.02 bilion; deposit kini RM88 bilion; agihan keuntungan 1966–2021 berjumlah RM37.52 bilion.', ms: 229 },
    { no: 3, teks: 'Walaupun berlaku krisis kewangan serius pada 2017 yang mencetuskan cadangan memecahkan LTH kepada entiti berasingan, Suruhanjaya berpendapat institusi LTH perlu dikekalkan kerana kelemahan yang berlaku boleh diperbaiki tanpa perubahan besar kepada struktur sedia ada.', ms: 229 },
    { no: 4, teks: 'Syor Suruhanjaya diringkaskan sebagai 25 cadangan meliputi pindaan Akta 535, penyusunan semula tadbir urus, penghadan penglibatan Lembaga dalam anak syarikat, had pengawalseliaan BNM, penukaran juruaudit, penghentian bonus berlebihan, dan audit forensik pelaburan bermasalah.', ms: 230 },
    { no: 5, teks: 'Kerajaan dan pengurusan LTH perlu memberi perhatian serius terhadap penambahbaikan yang dicadangkan. Urus tadbir cekap dan berintegriti akan menarik lebih ramai pendeposit.', ms: 237 },
    { no: 6, teks: 'Suruhanjaya berharap Kerajaan menimbang supaya laporan ini diumumkan kepada awam mengikut bahagian yang bersesuaian.', ms: 237 },
  ];

  /* ---------------------------------------------------------------
     I. NOTA INTEGRITI DATA — perkara yang pengguna perlu tahu
        sebelum mempercayai mana-mana angka.
  --------------------------------------------------------------- */
  const notaIntegriti = [
    {
      tahap: 'sah', tajuk: 'Jumlah agihan keuntungan padan tepat antara dua jadual berasingan',
      teks: 'Jadual bayaran hibah (ms 131) memberi jumlah RM3,237,196 ribu bagi 2014. Jadual neraca PwC (ms 146) memberi agihan RM3,237 juta bagi tahun yang sama. Keempat-empat tahun 2014–2017 padan tepat. Ini menaikkan keyakinan terhadap kedua-dua set angka.',
    },
    {
      tahap: 'sah', tajuk: 'Nilai pemindahan aset padan dengan nilai balasan yang diterima',
      teks: 'Aset dipindahkan pada RM19.9 bilion. Balasan: Sukuk Siri 1 RM10 bilion + Sukuk Siri 2 RM9.6 bilion + tunai RM300 juta = RM19.9 bilion. Padan tepat.',
    },
    {
      tahap: 'amaran', tajuk: 'Dua angka liabiliti 2017 yang berbeza muncul dalam laporan',
      teks: 'Jadual defisit PwC (ms 146) menyatakan liabiliti 2017 sebanyak RM71,086 juta. Jadual justifikasi RAV (ms 119) menyatakan RM74,410 juta. Bezanya RM3,324 juta — jumlah yang sama tepat dengan agihan keuntungan 2017. Tafsiran dashboard: satu jadual mengambil kira agihan yang diisytiharkan sebagai liabiliti dan satu lagi tidak. Laporan sendiri tidak menjelaskan perbezaan ini.',
    },
    {
      tahap: 'amaran', tajuk: 'Dua angka keuntungan 2017 yang berbeza',
      teks: 'Jadual bonus (ms 139) menyatakan keuntungan bersih 2017 sebanyak RM2,798 juta. Analisa PwC (ms 154) menggunakan "Profit for the year 2017" sebanyak RM3,412 juta. Kedua-duanya kemungkinan mengukur perkara berbeza (contohnya sebelum atau selepas zakat dan cukai) tetapi laporan tidak menyatakannya. Jangan campurkan kedua-dua angka ini dalam pengiraan yang sama.',
    },
    {
      tahap: 'amaran', tajuk: 'Bilangan pendeposit disebut dengan tiga angka berbeza',
      teks: 'Laporan menyebut 9.2 juta pendeposit (ms 150), 9.3 juta (ms 152) dan 8.6 juta (ms 229). Angka-angka ini merujuk tahun yang berlainan tetapi laporan tidak menyelaraskannya.',
    },
    {
      tahap: 'amaran', tajuk: 'Unit jadual unjuran HAFIS berbeza daripada jadual sebenar',
      teks: 'Jadual HAFIS 2014–2019 (ms 199) memberi jumlah dalam RM juta (contoh: 106). Jadual unjuran 2022–2030 (ms 200) memberi jumlah dalam RM ribu (contoh: 742,470 = RM742.47 juta). Dashboard menyeragamkan kedua-duanya kepada RM juta. Tanpa penyeragaman ini, carta gabungan akan mengelirukan sepenuhnya.',
    },
    {
      tahap: 'amaran', tajuk: 'Nombor "Bil." dalam jadual bonus TH Properties tidak berturutan',
      teks: 'Jadual asal (ms 142) melompat daripada 4 kepada 8. Namun jumlah 11 baris yang tersenarai berjumlah tepat RM1,148,400 seperti dicetak. Kesimpulan dashboard: semua penerima hadir; lompatan nombor ialah masalah pembacaan teks daripada PDF, bukan data yang hilang.',
    },
    {
      tahap: 'amaran', tajuk: 'Sebahagian urus niaga dinyatakan dalam mata wang asing',
      teks: 'THIP dinyatakan dalam Dolar Amerika dan Al-Rawda serta Al-Fareeda dalam Riyal Saudi. Laporan tidak memberikan kadar tukaran. Dashboard TIDAK menukar mata wang ini kepada Ringgit dan mengecualikannya daripada semua jumlah Ringgit.',
    },
    {
      tahap: 'amaran', tajuk: 'Nilai pasaran saham dibandingkan pada tarikh yang berbeza',
      teks: 'Nilai pemindahan ialah pada 27 Disember 2018, nilai pasaran pertama pada 31 Disember 2018, dan set harga ketiga pada 8 Jun 2022. Perbandingan merentas tarikh ini sah, tetapi ia bukan pengukuran prestasi pelaburan kerana tiada maklumat mengenai dividen diterima atau sama ada saham masih dipegang.',
    },
    {
      tahap: 'info', tajuk: 'Laporan ini dijana daripada pembacaan teks PDF (OCR)',
      teks: 'Teks sumber dijana secara automatik daripada PDF asal, jadi terdapat kesilapan ejaan dan penomboran kecil. Setiap angka dalam dashboard ini disemak semula terhadap teks sumber dan membawa rujukan muka surat supaya anda boleh mengesahkannya sendiri.',
    },
    {
      tahap: 'info', tajuk: 'Ekshibit laporan diklasifikasikan sebagai RAHSIA',
      teks: 'Senarai Ekshibit laporan dinyatakan sebagai terperingkat. Ini bermakna sebahagian bukti asas di sebalik penemuan tidak boleh disemak oleh orang awam.',
    },
  ];

  return {
    angkaBesar, depositDisebut, pelaburanBermasalah, tindakan,
    penemuan, cadangan, penambahbaikan, rumusan, notaIntegriti,
  };
})();
