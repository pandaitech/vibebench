/* =====================================================================
   DATA LAYER — Laporan Suruhanjaya Siasatan Diraja (RCI) Lembaga Tabung Haji
   Sumber tunggal: rci-tabung-haji.md (OCR laporan rasmi, 240 muka surat)
   https://github.com/SyahmiRafsan/rci-tabunghaji

   PERATURAN INTEGRITI DATA
   -------------------------
   Setiap rekod dilabel dengan `k` (kelas maklumat):
     "F"  = FAKTA LAPORAN  — angka/kenyataan tersurat dalam laporan
     "T"  = DATA TERBITAN  — dikira oleh dashboard daripada angka fakta
     "A"  = ANGGARAN LAPORAN — unjuran/anggaran yang laporan sendiri sebut
     "S"  = SIMULASI       — dijana pengguna, BUKAN dalam laporan
   `ms` = muka surat bercetak laporan. PDF = ms + 38 (bahagian utama).
   ===================================================================== */

(function () {
  "use strict";

  var REPO = "https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md";

  // ms bercetak -> pautan anchor pdf
  function src(ms, pdfOverride) {
    var pdf = pdfOverride || (typeof ms === "number" ? ms + 38 : null);
    return pdf ? REPO + "#pdf-page-" + pdf : REPO;
  }

  var D = {};

  D.SRC = src;
  D.REPO = REPO;

  /* ------------------------------------------------------------------
     0. META
     ------------------------------------------------------------------ */
  D.meta = {
    tajuk: "Laporan Suruhanjaya Siasatan Diraja Tabung Haji",
    skop: "Isu pengurusan dan operasi Lembaga Tabung Haji (LTH) tahun 2014–2020",
    tarikhLapor: "19 Julai 2022",
    tarikhPersembah: "30 Ogos 2022",
    tempoh: "20 Januari 2022 – 19 Julai 2022 (6 bulan)",
    pesuruhjaya: [
      { nama: "Tun Md Raus bin Sharif", jawatan: "Pengerusi — Mantan Ketua Hakim Negara" },
      { nama: "Tan Sri Samsudin bin Osman", jawatan: "Mantan Ketua Setiausaha Negara" },
      { nama: "Tan Sri Abdul Rashid bin Hussain", jawatan: "Pengasas RHB Group" },
      { nama: "Tan Sri Dr. Mohd Munir bin Abdul Majid", jawatan: "Pengerusi CARI ASEAN Research & Advocacy" },
      { nama: "Profesor Dr. Asmadi bin Mohamed Naim", jawatan: "Naib Canselor UniSHAMS" },
      { nama: "Norsyahrin bin Hamidon", jawatan: "Akauntan Bertauliah" }
    ],
    setiausaha: "Datuk Hajah Hakimah binti Mohd Yusoff (Ketua Pengarah JAKIM)",
    metodologi: [
      "Pengumpulan rekod dan dokumen",
      "Taklimat daripada 8 agensi",
      "Akuan Berkanun daripada 45 saksi",
      "Prosiding tertutup — 16 saksi dipanggil beri keterangan"
    ],
    saksiABS: 45,
    saksiDipanggil: 16,
    agensiTaklimat: [
      { nama: "Lembaga Tabung Haji", tarikh: "23 Feb, 8 Apr, 28 Apr 2022" },
      { nama: "Ernst & Young", tarikh: "24 Feb & 7 Julai 2022" },
      { nama: "Roland Berger", tarikh: "25 Feb 2022" },
      { nama: "PricewaterhouseCoopers", tarikh: "10 Mac 2022" },
      { nama: "Bank Negara Malaysia", tarikh: "14 Mac 2022" },
      { nama: "Jabatan Audit Negara", tarikh: "25 Mac 2022" },
      { nama: "Kementerian Kewangan", tarikh: "1 Apr 2022" },
      { nama: "Urusharta Jamaah Sdn. Bhd.", tarikh: "1 Apr 2022" }
    ]
  };

  /* ------------------------------------------------------------------
     1. GLOSARI — istilah susah, diterangkan cara orang biasa faham
     ------------------------------------------------------------------ */
  D.glosari = {
    "hibah": "Bahagian keuntungan yang TH bayar kepada pendeposit setiap tahun. Macam 'dividen' tetapi TH tak wajib bayar — ia budi bicara Lembaga.",
    "rosot nilai": "Pengakuan dalam akaun bahawa satu pelaburan sudah jatuh nilai dan tak akan pulih. Kalau tak diakui, akaun nampak untung sedangkan sebenarnya rugi.",
    "RAV": "Realisable Asset Value — 'nilai aset yang boleh direalisasikan'. Anggaran pengurusan TH tentang berapa nilai aset kalau dijual. Bukan piawaian perakaunan; tiada standard rasmi untuk mengiranya.",
    "MFRS": "Malaysian Financial Reporting Standards — peraturan perakaunan rasmi Malaysia. Kalau ikut MFRS sepenuhnya, aset mesti dinilai pada harga pasaran sebenar.",
    "FRS 139": "Peraturan perakaunan (guna pakai sehingga 2017) tentang bila aset kewangan mesti dirosotnilaikan.",
    "Emphasis of Matter": "Nota dalam laporan audit yang menarik perhatian kepada sesuatu isu — TETAPI auditor tetap kata akaun itu 'benar dan saksama'. Ia bukan teguran rasmi.",
    "Sijil Audit Bersih": "Pengesahan auditor bahawa penyata kewangan memberi gambaran benar dan saksama. Tanpa sijil ini, TH tak boleh isytihar hibah.",
    "bank run": "Keadaan ramai pendeposit keluarkan duit serentak kerana hilang keyakinan. Institusi terpaksa jual aset cepat-cepat pada harga murah.",
    "Sukuk": "Bon patuh syariah. Sukuk UJSB ialah 'surat hutang' yang UJSB beri kepada TH sebagai bayaran untuk aset yang dipindahkan.",
    "kupon sifar": "Sukuk yang tidak bayar faedah tahunan secara tunai. Semua pulangan hanya diterima pada tarikh matang.",
    "UJSB": "Urusharta Jamaah Sdn. Bhd. — syarikat milik penuh Menteri Kewangan Diperbadankan, ditubuh 14 Dis 2018 untuk mengambil alih aset TH yang bermasalah.",
    "HAFIS": "Hajj Financial Support — subsidi kos haji yang TH tanggung bagi pihak jemaah. Diambil daripada keuntungan pelaburan, iaitu daripada duit pendeposit.",
    "Muassasah": "Jemaah haji yang diuruskan sepenuhnya oleh TH mengikut kuota rasmi kerajaan (bukan pakej swasta).",
    "Akta 535": "Akta Tabung Haji 1995 — undang-undang yang mengawal TH. Seksyen 22 ialah syarat sebelum hibah boleh diisytiharkan.",
    "seksyen 22(3)(a)": "Syarat undang-undang: hibah HANYA boleh diisytiharkan kalau aset TH tidak kurang daripada jumlah liabiliti (termasuk semua deposit yang boleh dikeluarkan serta-merta).",
    "seksyen 24": "Peruntukan jaminan Kerajaan. Kalau TH tak mampu bayar pengeluaran pendeposit, Kumpulan Wang Disatukan (duit Kerajaan) yang tanggung.",
    "Kumpulan Wang Rizab": "Simpanan penampan TH untuk serap kerugian. Akta wajibkan ia wujud sebelum hibah boleh diisytiharkan.",
    "RPK": "Rizab Penyamaan Keuntungan — simpanan khas untuk ratakan bayaran hibah antara tahun baik dan tahun teruk.",
    "Mudarabah": "Akad perkongsian untung: pendeposit beri modal, TH usahakan. Nisbah untung mesti dipersetujui awal.",
    "Wadi'ah Yad Dhamanah": "Akad simpanan bercagar. Di bawah akad ini TH jadi 'peminjam' duit pendeposit dan bebas guna keuntungan.",
    "Wakalah": "Akad wakil: TH jadi ejen yang uruskan dana pendeposit dan boleh tolak kos, zakat dan subsidi daripada keuntungan.",
    "ROFR": "Right of First Refusal — hak TH untuk membeli semula dahulu aset yang telah dipindahkan ke UJSB sebelum ia dijual kepada orang lain.",
    "concentration risk": "Risiko tertumpu — bila sebahagian besar deposit dimiliki oleh segelintir kecil pendeposit besar.",
    "deferred income": "Pendapatan yang direkod dalam akaun tetapi belum diterima dalam bentuk tunai."
  };

  /* ------------------------------------------------------------------
     2. KRONOLOGI
     ------------------------------------------------------------------ */
  D.kronologi = [
    { t: "1951", g: "asas", tajuk: "Ordinan Haji 1951", teks: "Pejabat Urusan Haji Pulau Pinang ditubuhkan untuk melindungi jemaah haji.", ms: 15 },
    { t: "1962", g: "asas", tajuk: "PWSBH ditubuhkan", teks: "Perbadanan Wang Simpanan Bakal-Bakal Haji — mobilisasi simpanan bakal haji.", ms: 15 },
    { t: "1969", g: "asas", tajuk: "LUTH ditubuhkan", teks: "Gabungan fungsi PWSBH dengan Pejabat Urusan Haji.", ms: 16 },
    { t: "1 Jun 1995", g: "asas", tajuk: "LTH ditubuhkan (Akta 535)", teks: "LUTH dimansuhkan, Lembaga Tabung Haji lahir di bawah Akta Tabung Haji 1995.", ms: 16 },
    { t: "2001", g: "haji", tajuk: "Subsidi haji (HAFIS) bermula", teks: "Sebelum ini jemaah Muassasah bayar kos haji sebenar. Selepas ini keuntungan pelaburan mula digunakan untuk subsidi.", ms: 169 },
    { t: "2009", g: "haji", tajuk: "Bayaran haji dibekukan", teks: "Kerajaan bekukan kenaikan bayaran haji Muassasah pada RM9,980. Kekal beku 13 tahun.", ms: 173 },
    { t: "2013", g: "kewangan", tajuk: "Tahun terakhir lebihan sihat", teks: "Lebihan aset selepas agihan +RM2,450 juta. Selepas ini merosot setiap tahun.", ms: 109 },
    { t: "1 Julai 2013", g: "tadbir", tajuk: "Ahli politik jadi Pengerusi", teks: "Datuk Seri Panglima Abdul Azeez bin Abdul Rahim (Ahli Parlimen Baling, Majlis Tertinggi UMNO) dilantik Pengerusi LTH.", ms: 21 },
    { t: "2014", g: "kewangan", tajuk: "Defisit bermula", teks: "Hibah 6.25%+2.00% dibayar (RM3,237 juta). Lebihan bertukar kepada kekurangan −RM352 juta.", ms: 82 },
    { t: "21 Ogos 2014", g: "amaran", tajuk: "Amaran BNM pertama", teks: "Surat BNM kepada Pengerusi LTH — 'Deposit Taking and Management of Liquidity'.", ms: 62 },
    { t: "19 Dis 2014", g: "amaran", tajuk: "Amaran BNM kedua", teks: "Pengambilan Deposit dan Pengurusan Kecairan.", ms: 62 },
    { t: "2014", g: "bonus", tajuk: "Bonus rekod RM74 juta", teks: "Sehingga 13 bulan gaji (11 bulan tahunan + 2 bulan khas) — 2.5% daripada keuntungan bersih.", ms: 100 },
    { t: "23 Dis 2015", g: "amaran", tajuk: "BNM menulis kepada Menteri", teks: "'Keperluan Merumus Dasar Rizab' — dihantar kepada Pengerusi LTH dan Menteri Hal Ehwal Agama.", ms: 62 },
    { t: "2016", g: "kewangan", tajuk: "Aset jatuh bawah liabiliti", teks: "Sebelum agihan pun sudah kekurangan −RM1,260 juta. Hibah 4.25%+1.50% tetap dibayar.", ms: 109 },
    { t: "30 Jun 2016", g: "kewangan", tajuk: "EY perkenalkan rangka RAV", teks: "EY syorkan metodologi menilai aset; TH guna 'Realisable Asset Value' untuk penuhi seksyen 22(3)(a).", ms: 89 },
    { t: "2016", g: "syariah", tajuk: "Akad tukar ke Wadi'ah", teks: "Akad deposit ditukar daripada Mudarabah kepada Wadi'ah Yad Dhamanah — tiada kajian bertulis ditemui.", ms: 69 },
    { t: "3 Mac 2017", g: "amaran", tajuk: "Laporan Roland Berger", teks: "Kajian pelan perniagaan 5 tahun. Laporan tidak pernah dibentangkan kepada Lembaga.", ms: 176 },
    { t: "6 & 9 Feb 2018", g: "kewangan", tajuk: "Dua mesyuarat khas Lembaga", teks: "Kertas kerja dibentang bagi membolehkan hibah 2017 diisytiharkan. Kemudian jadi asas laporan polis.", ms: 158 },
    { t: "7 Feb 2018", g: "kewangan", tajuk: "Kaedah kira hibah diubah, kemudian ditarik balik", teks: "Purata baki bulanan ditukar ke purata baki tahunan, ditarik balik selepas bantahan pendeposit. Kesannya TH keluarkan lebihan RM600 juta.", ms: 77 },
    { t: "16 Julai 2018", g: "audit", tajuk: "Sijil Audit Bersih + Emphasis of Matter", teks: "KAN beri pendapat tanpa teguran walaupun dua penemuan material (RM227.81 juta tidak dirosotnilai; polisi ditukar 2 kali).", ms: 95 },
    { t: "23 Mei 2018", g: "audit", tajuk: "Laporan RAV EY dikeluarkan", teks: "Dikeluarkan SEBELUM penyata kewangan beraudit dimuktamadkan (16 Julai 2018) — jadi ia tak mungkin berasaskan akaun beraudit.", ms: 81 },
    { t: "Mei 2018", g: "tadbir", tajuk: "Panel Pelaburan dibubarkan", teks: "Diganti 'Exco Perniagaan' yang saksi akui tidak pernah berfungsi.", ms: 54 },
    { t: "9 Nov 2018", g: "audit", tajuk: "Laporan PwC Financial Review", teks: "Mengesahkan jurang defisit antara aset dan liabiliti sejak 2014.", ms: 110 },
    { t: "30 Nov 2018", g: "akauntabiliti", tajuk: "Dua laporan polis", teks: "Yayasan Tabung Haji; dan penjualan 95% saham PT TH Indo Plantations kepada PT Borneo Pacific.", ms: 156 },
    { t: "7 Dis 2018", g: "pemulihan", tajuk: "Jemaah Menteri luluskan Pelan Pemulihan", teks: "Diarah dilaksanakan sebelum akhir 2018 — TH ada kurang dua minggu.", ms: 114 },
    { t: "14 Dis 2018", g: "pemulihan", tajuk: "UJSB ditubuhkan", teks: "SPV milik penuh Menteri Kewangan Diperbadankan.", ms: 107 },
    { t: "19 Dis 2018", g: "audit", tajuk: "Surat KAN kepada Perdana Menteri", teks: "Mengakui Pendapat Berteguran sepatutnya diberi, tetapi tidak diberi kerana bimbang persepsi negatif pendeposit.", ms: 95 },
    { t: "27 Dis 2018", g: "pemulihan", tajuk: "Perjanjian Pemindahan Aset", teks: "106 saham tersenarai + 1 syarikat perladangan + 29 aset hartanah dipindah pada RM19.9 bilion (nilai pasaran RM9.7 bilion).", ms: 118 },
    { t: "2018", g: "kewangan", tajuk: "Hibah jatuh ke 1.25%", teks: "Daripada 4.50%+1.75% kepada 1.25% sahaja. Jumlah agihan turun daripada RM3.32 bilion kepada RM0.92 bilion.", ms: 82 },
    { t: "1 Jan 2019", g: "tadbir", tajuk: "LTH diletak di bawah pemantauan BNM", teks: "Secara pentadbiran sahaja — Suruhanjaya dapati ia tidak selari dengan Akta 535.", ms: 62 },
    { t: "2019", g: "kewangan", tajuk: "Deposit mengecut", teks: "Daripada ~RM73 bilion sebelum pengumuman hibah kepada RM69 bilion akhir 2019.", ms: 84 },
    { t: "15 Mei 2019", g: "pemulihan", tajuk: "Perjanjian Sukuk & ROFR", teks: "Langganan Sukuk RM27.56 bilion oleh LTH; hak beli semula aset diberi kepada LTH.", ms: 119 },
    { t: "27 Mei 2019", g: "pemulihan", tajuk: "Surat Sokongan Kewangan MOF", teks: "Bukan jaminan penuh — hanya 'Letter of Comfort'. Sukuk UJSB tidak dijamin Kerajaan.", ms: 126 },
    { t: "Dis 2019", g: "syariah", tajuk: "Akad tukar ke Wakalah", teks: "Selepas kajian menyeluruh. Menyelesaikan isu zakat dan subsidi.", ms: 71 },
    { t: "2020", g: "kewangan", tajuk: "Deposit pulih", teks: "Naik semula ke ~RM76 bilion pada akhir 2020.", ms: 84 },
    { t: "30 Nov 2020", g: "pemulihan", tajuk: "Penebusan awal Sukuk pertama", teks: "RM200 juta ditebus daripada geran Kerajaan RM500 juta.", ms: 128 },
    { t: "2021", g: "pemulihan", tajuk: "Suntikan RM1.5 bilion tidak diterima", teks: "Diperuntukkan dalam Belanjawan 2021 tetapi tidak disalurkan — dialih ke pemulihan ekonomi Covid-19.", ms: 128 },
    { t: "5 Mei 2021", g: "tadbir", tajuk: "KPE ditamatkan tanpa sebab", teks: "Datuk Nik Mohd Hasyudeen bin Yusoff ditamatkan sebelum kontrak tamat (31 Ogos 2021).", ms: 44 },
    { t: "15 Okt 2021", g: "tadbir", tajuk: "Pengerusi ditamatkan tanpa sebab", teks: "Tan Sri Md Nor bin Md Yusof ditamatkan walaupun kontrak baru disambung dua tahun mulai 20 Julai 2020.", ms: 44 },
    { t: "20 Jan 2022", g: "rci", tajuk: "Suruhanjaya dilantik", teks: "Enam Pesuruhjaya dilantik oleh KDYMM Yang di-Pertuan Agong.", ms: 5 },
    { t: "21 Mei 2022", g: "kewangan", tajuk: "Liabiliti pendeposit melebihi RM88 bilion", teks: "Jaminan Kerajaan di bawah seksyen 24 kini bernilai RM88 bilion.", ms: 134 },
    { t: "19 Julai 2022", g: "rci", tajuk: "Laporan ditandatangani", teks: "25 syor utama dikemukakan kepada Kerajaan.", ms: 200 }
  ];

  D.kronoKategori = {
    asas: { label: "Asal usul", warna: "#8593a8" },
    kewangan: { label: "Kewangan", warna: "#d9534f" },
    audit: { label: "Audit", warna: "#c084fc" },
    amaran: { label: "Amaran diabai", warna: "#e8912d" },
    tadbir: { label: "Tadbir urus", warna: "#2f9e8f" },
    pemulihan: { label: "Pemulihan/UJSB", warna: "#4f8ef7" },
    haji: { label: "Haji & subsidi", warna: "#69a84f" },
    syariah: { label: "Syariah", warna: "#00a3a3" },
    akauntabiliti: { label: "Akauntabiliti", warna: "#b3593f" },
    rci: { label: "Suruhanjaya", warna: "#6b7280" },
    bonus: { label: "Bonus", warna: "#dfa000" }
  };

  /* ------------------------------------------------------------------
     3. KEWANGAN TERAS — Jadual PwC (RM juta), m/s 109
     ------------------------------------------------------------------ */
  D.kewangan = {
    k: "F", ms: 109,
    nota: "Jadual PwC Financial Review yang dibentangkan kepada Suruhanjaya. Jadual serupa di m/s 74 meliputi 2014–2017.",
    baris: [
      { tahun: 2013, aset: 48778, liabiliti: -43696, praAgih: 5082, agih: -2632, pascaAgih: 2450 },
      { tahun: 2014, aset: 54751, liabiliti: -51866, praAgih: 2885, agih: -3237, pascaAgih: -352 },
      { tahun: 2015, aset: 60196, liabiliti: -60062, praAgih: 134, agih: -3220, pascaAgih: -3086 },
      { tahun: 2016, aset: 64321, liabiliti: -65581, praAgih: -1260, agih: -2871, pascaAgih: -4131 },
      { tahun: 2017, aset: 70317, liabiliti: -71086, praAgih: -769, agih: -3324, pascaAgih: -4093 }
    ]
  };

  /* ------------------------------------------------------------------
     4. HIBAH — kadar (m/s 82) & jumlah (m/s 92)
     ------------------------------------------------------------------ */
  D.hibah = {
    k: "F", msKadar: 82, msJumlah: 92,
    baris: [
      { tahun: 2014, kadar: 6.25, kadarHaji: 2.00, jumTahunan: 2988053, jumHaji: 249143, jumlah: 3237196 },
      { tahun: 2015, kadar: 5.00, kadarHaji: 3.00, jumTahunan: 2807369, jumHaji: 413005, jumlah: 3220374 },
      { tahun: 2016, kadar: 4.25, kadarHaji: 1.50, jumTahunan: 2645625, jumHaji: 225197, jumlah: 2870822 },
      { tahun: 2017, kadar: 4.50, kadarHaji: 1.75, jumTahunan: 3042184, jumHaji: 281557, jumlah: 3323741 },
      { tahun: 2018, kadar: 1.25, kadarHaji: 0, jumTahunan: 922959, jumHaji: 0, jumlah: 922959 },
      { tahun: 2019, kadar: 3.05, kadarHaji: 0, jumTahunan: 2140538, jumHaji: 0, jumlah: 2140538 },
      { tahun: 2020, kadar: 3.10, kadarHaji: 0, jumTahunan: 2242141, jumHaji: 0, jumlah: 2242141 },
      { tahun: 2021, kadar: 3.10, kadarHaji: 0, jumTahunan: null, jumHaji: null, jumlah: null }
    ],
    kumulatif1966_2021: 37.52, // RM bilion, m/s 191
    msKumulatif: 191
  };

  /* Apa yang TH SEPATUTNYA mampu bayar bagi 2017 — kenyataan JAN, m/s 93 */
  D.hibah2017Kemampuan = {
    k: "F", ms: 93,
    mampuRM: 2.70, mampuKadar: 4.0, kaedahMampu: "purata baki minima tahunan",
    dibayarRM: 3.31, dibayarKadar: 6.25, kaedahDibayar: "purata baki minima bulanan",
    lebihanRM: 0.61, lebihanPeratus: 22.5,
    nota: "Angka 6.25% di sini merujuk kaedah pengiraan baki minima bulanan yang dinyatakan JAN. Kadar hibah tahunan 2017 yang diisytiharkan ialah 4.50% + 1.75% hibah haji."
  };

  /* ------------------------------------------------------------------
     5. DEPOSIT & PENDEPOSIT
     ------------------------------------------------------------------ */
  D.deposit = {
    k: "F",
    siri: [
      { label: "Sebelum pengumuman hibah 2018", nilai: 73, ms: 84, nota: "Kira-kira RM73 bilion" },
      { label: "Akhir 2019", nilai: 69, ms: 84, nota: "Selepas hibah 1.25% diumumkan — pengecutan deposit" },
      { label: "Akhir 2020", nilai: 76, ms: 84, nota: "Lebih kurang RM76 bilion — keyakinan pulih" },
      { label: "21 Mei 2022", nilai: 88, ms: 134, nota: "Liabiliti pendeposit melebihi RM88 bilion" },
      { label: "Unjuran ~2024", nilai: 100, ms: 180, nota: "ANGGARAN laporan: berkemungkinan RM100 bilion dalam dua tahun", anggaran: true }
    ],
    pendeposit: [
      { label: "2018 (ketika pelan pemulihan)", nilai: 9.3, ms: 114 },
      { label: "22 Julai 2022", nilai: 8.6, ms: 191 }
    ],
    tumpuan: {
      k: "F",
      p65: { peratusPendeposit: 65, syarat: "deposit RM2,000 atau kurang", ms: 170 },
      p75: { peratusDeposit: 75, olehPeratusPendeposit: 5, ms: 178 }
    },
    danaMinima: { nilai: 60, unit: "RM bilion", nota: "Dana minima diperlukan untuk menampung subsidi haji pada tahap sekarang", ms: 73 }
  };

  /* ------------------------------------------------------------------
     6. TIGA CARA MELIHAT TAHUN 2017 — jantung analisis
     ------------------------------------------------------------------ */
  D.lensa2017 = {
    ms: 78,
    lensa: [
      {
        id: "rav",
        nama: "Cara TH (guna RAV)",
        ringkas: "Nilai aset ditokok dengan anggaran pengurusan sendiri",
        k: "F", ms: 78,
        baris: [
          { label: "Jumlah aset (penyata kewangan)", nilai: 70317 },
          { label: "Tambah: nilai RAV anak syarikat, bersekutu, usaha sama, hartanah, aset dipegang hingga matang", nilai: 4466 },
          { label: "Jumlah aset berdasarkan RAV", nilai: 74783, subtotal: true },
          { label: "Jumlah liabiliti termasuk deposit", nilai: -74410 },
          { label: "Nilai bersih aset terlaras untuk diagihkan", nilai: 373, hasil: true }
        ],
        kesimpulan: "Aset nampak melebihi liabiliti sebanyak RM373 juta — cukup (nipis) untuk isytihar hibah.",
        warna: "#e8912d"
      },
      {
        id: "audit",
        nama: "Ikut penyata beraudit",
        ringkas: "Angka yang JAN sendiri sahkan dalam audit",
        k: "F", ms: 94,
        baris: [
          { label: "Nilai aset (penyata kewangan beraudit)", nilai: 70317 },
          { label: "Nilai liabiliti", nilai: -74409 },
          { label: "Kedudukan bersih", nilai: -4092, hasil: true }
        ],
        kesimpulan: "Aset SUDAH kurang daripada liabiliti sebanyak lebih RM4 bilion. Syarat seksyen 22(3)(a) tidak dipenuhi.",
        warna: "#4f8ef7"
      },
      {
        id: "mfrs",
        nama: "Ikut MFRS penuh (cara PwC)",
        ringkas: "Semua rosot nilai diambil kira sepenuhnya",
        k: "F", ms: 79,
        baris: [
          { label: "Nilai bersih aset terlaras (cara RAV)", nilai: 373 },
          { label: "Tolak: rosot nilai aset kewangan tidak direkod (FRS 139)", nilai: -1310 },
          { label: "Tolak: rosot nilai subsidiari & syarikat bersekutu tidak direkod", nilai: -227 },
          { label: "Liabiliti bersih LTH", nilai: -1164, hasil: true },
          { label: "Anggaran PwC — liabiliti bersih sebenar", nilai: -4093, alt: true }
        ],
        kesimpulan: "Jumlah rosot nilai yang tidak diambil kira (RM1,537 juta) jauh lebih besar daripada 'lebihan' RM373 juta yang digunakan untuk justifikasi hibah.",
        warna: "#d9534f"
      }
    ]
  };

  /* Polisi rosot nilai — ditukar 2 kali dalam tahun kewangan 2017, m/s 110 */
  D.rosotNilai = {
    k: "F", ms: 110,
    nota: "Rosot nilai hanya dibuat apabila nilai pasaran jatuh sebanyak ambang di bawah. Ambang dinaikkan dua kali dalam satu tahun kewangan — dalam tempoh satu hari bagi perubahan terakhir.",
    ambang: [
      { peratus: 70, tempoh: ">24 bulan", kesan: 1313, label: "Polisi asal" },
      { peratus: 85, tempoh: "tiada syarat tempoh", kesan: 171, label: "Perubahan pertama" },
      { peratus: 90, tempoh: "tiada syarat tempoh", kesan: 1, label: "Perubahan kedua (diguna pakai)" }
    ],
    direkodSebenar: 1.0,
    contoh: "Bagi pelaburan saham asal RM1,000, rosot nilai hanya dibuat apabila harga pasaran jatuh kepada RM100. Kalau dijual pada masa itu, TH hanya dapat RM100 — bukan RM1,000 seperti dalam penyata kewangan.",
    msContoh: 77,
    frsic14: "Garis panduan MIA (FRSIC 14): kerugian dikira signifikan apabila nilai turun 20% atau lebih; berlanjutan apabila melebihi 12 bulan.",
    msFrsic: 76
  };

  /* PwC — kesan penuh ke atas untung 2017, m/s 111 */
  D.pwcPelarasan = {
    k: "F", ms: 111,
    untungRugi: [
      { label: "Untung tahun 2017 seperti dilapor", nilai: 3412 },
      { label: "Tolak: rosot nilai pelaburan ekuiti AFS", nilai: -4258 },
      { label: "Tolak: rosot nilai instrumen hutang AFS", nilai: -7 },
      { label: "Tolak: pelarasan lain", nilai: -580 },
      { label: "Kerugian terlaras", nilai: -1433, hasil: true }
    ],
    terkumpul: [
      { label: "Perolehan tertahan pada 31.12.2017", nilai: 162 },
      { label: "Tolak: pelarasan", nilai: -4845 },
      { label: "Kerugian terkumpul terlaras", nilai: -4683, hasil: true }
    ],
    ringkas: "Sekiranya MFRS diguna pakai sepenuhnya bagi tahun kewangan 2017, LTH sepatutnya merekod kerugian bersih RM1.4 bilion, berbanding keuntungan RM3.4 bilion yang dilaporkan.",
    msRingkas: 111,
    kerugianMeningkat: { nilai: 10, unit: "RM bilion", nota: "Kerugian yang dialami LTH meningkat kepada RM10 bilion — menyebabkan Kerajaan terpaksa laksanakan pelan pemulihan segera", ms: 111 }
  };

  /* ------------------------------------------------------------------
     7. BONUS
     ------------------------------------------------------------------ */
  D.bonusKakitangan = {
    k: "F", ms: 99,
    baris: [
      { tahun: 2010, peruntukan: 25.0, kadar: "2.5 tahunan + 1 khas", taburan: "2–6 bulan", maxBulan: 6 },
      { tahun: 2011, peruntukan: 35.0, kadar: "3 tahunan + 1 khas", taburan: "2–6 bulan", maxBulan: 6 },
      { tahun: 2012, peruntukan: 38.0, kadar: "3.5 tahunan + 1 khas", taburan: "2.5–8 bulan", maxBulan: 8 },
      { tahun: 2013, peruntukan: 49.0, kadar: "2.5–10", taburan: "2.5–10 bulan", maxBulan: 10 },
      { tahun: 2014, peruntukan: 74.0, kadar: "1–11 tahunan + 2 khas", taburan: "sehingga 13 bulan", maxBulan: 13 },
      { tahun: 2015, peruntukan: 65.0, kadar: "1–10", taburan: "1–10 bulan", maxBulan: 10 },
      { tahun: 2016, peruntukan: 25.0, kadar: "1–3", taburan: "1–3 bulan", maxBulan: 3 },
      { tahun: 2017, peruntukan: 56.7, kadar: "1–6", taburan: "1–6 bulan", maxBulan: 6 },
      { tahun: 2018, peruntukan: 10.8, kadar: "1", taburan: "1 bulan", maxBulan: 1 },
      { tahun: 2019, peruntukan: 11.6, kadar: "1", taburan: "1 bulan", maxBulan: 1 },
      { tahun: 2020, peruntukan: 14.1, kadar: "1", taburan: "1 bulan", maxBulan: 1 }
    ],
    siling: "Pekeliling Perbendaharaan WP 7.2: siling panduan tidak lebih 2 bulan gaji; melebihi dua bulan hanya jika ramai pegawai berprestasi cemerlang.",
    msSiling: 99
  };

  D.bonusVsUntung = {
    k: "F", ms: 101,
    baris: [
      { tahun: 2013, untungBersih: 2634, bonus: 49, nisbah: 1.9, taburan: "2.5–10 bulan" },
      { tahun: 2014, untungBersih: 2979, bonus: 74, nisbah: 2.5, taburan: "1–11 + 2 khas" },
      { tahun: 2015, untungBersih: 3537, bonus: 61, nisbah: 1.7, taburan: "1–10 bulan" },
      { tahun: 2016, untungBersih: 2481, bonus: 25, nisbah: 1.0, taburan: "1–3 bulan" },
      { tahun: 2017, untungBersih: 2798, bonus: 57, nisbah: 2.0, taburan: "1–6 bulan" }
    ],
    nota: "Angka 'keuntungan bersih' di sini ialah keuntungan seperti direkod. Bandingkan dengan kedudukan sebenar aset lawan liabiliti pada tahun yang sama."
  };

  D.bonusTHProperties = [
    {
      tajuk: "TH Properties Sdn. Bhd. — bonus istimewa 2017",
      k: "F", ms: 104, jumlah: 1148400, tarikhLulus: "12 April 2017",
      badanLulus: "Mesyuarat Exco TH Properties",
      alasan: "Kejayaan projek 'The Bay Pavillion' di Australia yang disiapkan 2015 dan dijual sepenuhnya; dakwa pulangan AUD11.6 juta sehingga Disember 2016.",
      hadir: ["Dato' Azizan bin Abd Rahman (Pengerusi)", "Dato' Roszali bin Othman", "Dato' Mohd Fazillah bin Mohd Ali", "Haji Abd Kadir bin Sahlan"],
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
      ],
      pelanggaran: "Melanggar seksyen 230(2) dan 230(4) Akta Syarikat 2016 — Exco tiada kuasa; gagal peroleh resolusi pemegang saham."
    },
    {
      tajuk: "THP Australia Capital Sdn. Bhd. — bonus istimewa 2018",
      k: "F", ms: 105, jumlah: 1045000, tarikhLulus: "23 April 2018",
      badanLulus: "Lembaga Pengarah THP Australia Capital Sdn. Bhd.",
      alasan: "TH Properties memperoleh keuntungan sebelum cukai RM34.84 juta pada tahun 2017.",
      hadir: ["Dato' Roszali bin Othman", "Haji Abd Kadir bin Sahlan", "Nik Badrul Hisham bin Nik Hassan", "Anuarifaei bin Mustapa"],
      penerima: [
        { nama: "Dato' Roszali bin Othman", jumlah: 176500 },
        { nama: "Haji Abd Kadir bin Sahlan", jumlah: 176500 },
        { nama: "Dato' Azizan bin Abd Rahman", jumlah: 167250 },
        { nama: "Nik Badrul Hisham bin Nik Hassan", jumlah: 101500 },
        { nama: "Anuarifaei bin Mustapa", jumlah: 101500 },
        { nama: "Nur Adlan bin Taib", jumlah: 101500 },
        { nama: "Zaidi bin Baharudin", jumlah: 63000 },
        { nama: "Aida binti Karim", jumlah: 63000 },
        { nama: "Marhaizah binti Mohamed Yusuf", jumlah: 63000 },
        { nama: "Haji Mohamed Rahim bin Ismail", jumlah: 31250 }
      ],
      pelanggaran: "Melanggar seksyen 230(3) Akta Syarikat 2016 — notifikasi pemegang saham dibuat tujuh bulan selepas resolusi Lembaga."
    }
  ];

  /* ------------------------------------------------------------------
     8. UJSB & SUKUK
     ------------------------------------------------------------------ */
  D.ujsb = {
    k: "F",
    ditubuh: "14 Disember 2018",
    pemilik: "Menteri Kewangan Diperbadankan (milik penuh)",
    mandat: ["Melaksanakan pelan pemulihan", "Memaksimumkan nilai pemulihan aset", "Meneruskan kelangsungan operasi aset yang diambil alih"],
    model: "Berdasarkan model Danaharta Nasional Berhad yang menangani krisis kewangan 1998",
    ms: 107,

    pemindahan: {
      k: "F", ms: 122,
      baris: [
        { aset: "Hartanah dan tanah", buku: 1411, pindah: 2247, pasaran: 1411 },
        { aset: "Syarikat perladangan", buku: 718, pindah: 802, pasaran: 718 },
        { aset: "Ekuiti tersenarai Bursa Malaysia", buku: 16852, pindah: 16851, pasaran: 7600 }
      ],
      jumlah: { buku: 18981, pindah: 19900, pasaran: 9729 },
      premium: 10171,
      nota: "Aset dipindah pada RM19.9 bilion berbanding nilai pasaran RM9.7 bilion — premium RM10.2 bilion.",
      kandungan: "106 saham tersenarai, 1 syarikat perladangan (TH Estate, Sri Aman Sarawak), 29 aset hartanah"
    },

    sukuk: {
      k: "F", ms: 125,
      siri: [
        { nama: "Sukuk Siri 1", pokok: 10.0, nominal: 13.2, tempoh: 7, ytm: 4.05, matang: 2026 },
        { nama: "Sukuk Siri 2", pokok: 9.6, nominal: 14.3, tempoh: 10, ytm: 4.10, matang: 2029 }
      ],
      tunai: 0.3,
      jumlahObligasi: 27.5,
      hasilTertunggak: 7.65,
      ciri: "Berkupon sifar, tidak diberi penarafan, tidak boleh diniagakan, tidak boleh dipindah milik, unsecured",
      msCiri: 126,
      jaminan: "TIDAK dijamin Kerajaan. Hanya ada Surat Sokongan Kewangan MOF bertarikh 27 Mei 2019 — 'Letter of Comfort'.",
      msJaminan: 126
    },

    bayaranTunai: [
      { tarikh: "30 Disember 2019", jumlah: 100, tujuan: "Saham tidak patuh syariah" },
      { tarikh: "30 Disember 2020", jumlah: 200, tujuan: "Saham tidak patuh syariah" },
      { tarikh: "30 November 2020", jumlah: 200, tujuan: "Penebusan awal Sukuk" }
    ],
    msBayaran: 128,

    peruntukanKerajaan: {
      k: "F", ms: 128,
      diluluskan: "Jemaah Menteri 5 April 2019 — sekurang-kurangnya RM17.8 bilion",
      pecahan: [
        { pelan: "RMK-11 (2020)", jumlah: 0.5 },
        { pelan: "RMK-12 & RMK-13", jumlah: 17.3, nota: "anggaran purata RM1.73 bilion setahun" }
      ],
      diterima2020: 0.5,
      gagal2021: 1.5,
      alasanGagal: "Keutamaan peruntukan dialihkan kepada perbelanjaan pemulihan ekonomi negara ekoran pandemik Covid-19."
    },

    deferredIncome: {
      k: "F", ms: 132,
      tahunan: 840, // RM juta
      terkumpul2021: 2100, // RM juta
      nota: "Pendapatan pengakruan Sukuk yang TH rekod tetapi TIDAK diterima sebagai tunai. Sebahagian daripada ini telah diagihkan kepada pendeposit sebagai hibah."
    },

    risiko: {
      k: "F", ms: 133,
      sukukPeratusAset: 31,
      hasilPeratusPendapatan: 26,
      nota: "RM27.5 bilion Sukuk merupakan hampir 31% daripada keseluruhan aset LTH. Hasil pengakruan Sukuk menyumbang hampir 26% daripada keseluruhan pendapatan tahunan LTH — lebih satu pertiga daripada jumlah agihan keuntungan tahunan kepada pendeposit."
    },

    kerugianUJSB: { nilai: 9.9, unit: "RM bilion", tahun: 2019, ms: 130, nota: "Kerugian UJSB bagi tahun berakhir 2019 kerana perbezaan nilai pemindahan dan nilai pasaran semasa aset." },

    empatCadangan: {
      k: "F", ms: 115,
      senarai: [
        { no: 1, tajuk: "Suntikan dana/geran Kerajaan", jumlah: "Lebih RM10 bilion tunai", tolak: "Terlalu besar untuk satu masa; jejas peruntukan projek pembangunan lain; risiko penarafan kredit ketika siling hutang negara 55% KDNK.", diterima: false },
        { no: 2, tajuk: "Aktifkan jaminan Kerajaan (seksyen 24)", jumlah: "Mengikut keperluan kecairan", tolak: "Solusi jangka pendek. Tidak tutup jurang defisit — malah tambah liabiliti kerana jadi hutang kepada Kerajaan.", diterima: false },
        { no: 3, tajuk: "Aset tertunda (deferred asset)", jumlah: "Agih kerugian ke masa hadapan", tolak: "Tidak dibenarkan di bawah MFRS 9. Kerugian mesti direkod pada tahun semasa.", diterima: false },
        { no: 4, tajuk: "Pindah aset kurang berdaya saing kepada SPV", jumlah: "RM19.9 bilion", tolak: "DIPILIH — solusi jangka panjang berdasarkan model Danaharta 1998.", diterima: true }
      ]
    },

    empatTeras: {
      ms: 114,
      senarai: [
        "Melindungi kepentingan hampir 9.3 juta pendeposit ketika itu",
        "Memastikan kelangsungan fungsi utama LTH iaitu pengurusan haji",
        "Mengembalikan keupayaan LTH mengagih hibah dengan mematuhi Akta 535",
        "Mengurangkan impak kepada kedudukan fiskal negara"
      ]
    }
  };

  /* Hartanah dipindah: nilai pemindahan vs nilai pasaran Dis 2021, m/s 123 */
  D.hartanahUJSB = {
    k: "F", ms: 123,
    baris: [
      { jenis: "Tanah", kps: 1353361.48, pindah: 627006479, pasaran2021: 401080000 },
      { jenis: "Menara pejabat", kps: 354021, pindah: 737399698, pasaran2021: 325000000 },
      { jenis: "Lot kedai", kps: 120062, pindah: 46301759, pasaran2021: 33330000 },
      { jenis: "Hotel", kps: 354134, pindah: 804058625, pasaran2021: 424270000 },
      { jenis: "Perindustrian", kps: 35019, pindah: 31914386, pasaran2021: 19000000 }
    ],
    jumlah: { kps: 2216597.48, pindah: 2246680947, pasaran2021: 1202680000 },
    jppmh: { lebihan: 543.65, unit: "RM juta", nota: "Nilai pindahan hartanah melebihi penilaian JPPHM sejumlah RM543.65 juta — walaupun 11 daripada 29 hartanah dipindah lebih rendah daripada nilaian JPPHM.", ms: 122 }
  };

  /* Saham mewah dipindah — m/s 124 */
  D.bluechip = {
    k: "F", ms: 124,
    baris: [
      { kaunter: "Axiata", pindahUnit: 6.00, pasaran2018: 3.63, harga2022: 3.04, jumPindah: 1422605154, jumPasaran2018: 931803255 },
      { kaunter: "Maxis", pindahUnit: 6.84, pasaran2018: 5.43, harga2022: 3.52, jumPindah: 879395994, jumPasaran2018: 681197584 },
      { kaunter: "MISC", pindahUnit: 7.43, pasaran2018: 6.15, harga2022: 7.30, jumPindah: 486532216, jumPasaran2018: 438925710 },
      { kaunter: "Digi", pindahUnit: 5.13, pasaran2018: 4.24, harga2022: 3.27, jumPindah: 576240738, jumPasaran2018: 500328955 },
      { kaunter: "TM", pindahUnit: 5.96, pasaran2018: 2.33, harga2022: 5.20, jumPindah: 241202959, jumPasaran2018: 107650200 }
    ],
    jumlah: { pindah: 3605977061, pasaran2018: 2659905704, jatuh: -946071357 },
    tarikhHarga2022: "8 Jun 2022",
    tidakPatuhSyariah: ["YTL Power International Berhad", "Bumi Armada Berhad", "Integrated Logistics Berhad", "Yi-Lai Berhad"],
    msSyariah: 124
  };

  /* Komitmen Jaminan Kerajaan — m/s 127 */
  D.komitmenJaminan = {
    k: "F", ms: 127,
    tajuk: "Jadual 5.3 Komitmen Jaminan Kerajaan Persekutuan",
    baris: [
      { entiti: "DanaInfra Nasional Berhad", y2020: 72320, y2021: 76020 },
      { entiti: "Prasarana Malaysia Berhad", y2020: 38914, y2021: 38914 },
      { entiti: "Malaysia Rail Link Sdn. Bhd.", y2020: 21530, y2021: 23177 },
      { entiti: "Urusharta Jamaah Sdn. Bhd.", y2020: 20683, y2021: 21097, sorot: true },
      { entiti: "Suria Strategic Energy Resources Sdn. Bhd.", y2020: 6951, y2021: 7276 },
      { entiti: "GovCo Holdings Berhad", y2020: 7200, y2021: 5700 },
      { entiti: "Jambatan Kedua Sdn. Bhd.", y2020: 5528, y2021: 5514 },
      { entiti: "Turus Pesawat Sdn. Bhd.", y2020: 5310, y2021: 5310 },
      { entiti: "MKD Kencana Sdn. Bhd.", y2020: 3500, y2021: 4500 },
      { entiti: "SRC Kencana Sdn. Bhd.", y2020: 2485, y2021: 1785 },
      { entiti: "Sentuhan Budiman Sdn. Bhd.", y2020: 800, y2021: 750 },
      { entiti: "TRX City Sdn. Bhd.", y2020: 253, y2021: 192 },
      { entiti: "Assets Global Network Sdn. Bhd.", y2020: 253, y2021: 202 }
    ],
    jumlah: { y2020: 185727, y2021: 190437 }
  };

  /* Tawaran ROFR — m/s 131 */
  D.rofr = {
    k: "F", ms: 131,
    baris: [
      { syarikat: "WZ Satu", tarikh: "24-Mac-20", unit: 25999115, hargaRofr: 0.090, hargaPasaran: 0.064, premium: 40.6 },
      { syarikat: "Eastern & Oriental", tarikh: "25-Mac-20", unit: 46400000, hargaRofr: 0.365, hargaPasaran: 0.335, premium: 9.0 },
      { syarikat: "WZ Satu", tarikh: "31-Mac-20", unit: 16570923, hargaRofr: 0.085, hargaPasaran: 0.075, premium: 13.3 },
      { syarikat: "WCT Holdings", tarikh: "02-Apr-20", unit: 42477625, hargaRofr: 0.400, hargaPasaran: 0.377, premium: 6.1 },
      { syarikat: "KSL Holdings", tarikh: "06-Mei-20", unit: 71800000, hargaRofr: 0.610, hargaPasaran: 0.630, premium: -3.2 },
      { syarikat: "KSL Holdings", tarikh: "21-Mei-20", unit: 35900000, hargaRofr: 0.580, hargaPasaran: 0.605, premium: -4.1 },
      { syarikat: "Hap Seng Plantations", tarikh: "29-Mei-20", unit: 66074500, hargaRofr: 1.650, hargaPasaran: 1.570, premium: 5.1 },
      { syarikat: "FGV Holdings", tarikh: "09-Dis-20", unit: 283710100, hargaRofr: 1.300, hargaPasaran: 1.270, premium: 2.4 },
      { syarikat: "Integrated Logistics", tarikh: "14-Mac-22", unit: 20500000, hargaRofr: 0.380, hargaPasaran: 0.365, premium: 4.1 }
    ],
    pelupusan: {
      hartanahDijual: 1, hartanahJumlah: 29,
      contohJualan: "Mukim Sungai Segamat, Johor — RM920 ribu (tender terbuka 2020)",
      ekuitiDilupus: 75, ekuitiJumlah: 106,
      dilaburSemula: 329,
      pendapatanBaharu: "RM200–300 juta setahun",
      ms: 130
    }
  };

  /* ------------------------------------------------------------------
     9. HAJI, KOS & HAFIS
     ------------------------------------------------------------------ */
  D.hafisSebenar = {
    k: "F", ms: 166,
    baris: [
      { tahun: 2014, kos: 16155, bayaran: 9980, hafis: 6175, jumlahJuta: 106 },
      { tahun: 2015, kos: 17270, bayaran: 9980, hafis: 7290, jumlahJuta: 135 },
      { tahun: 2016, kos: 18890, bayaran: 9980, hafis: 8910, jumlahJuta: 160 },
      { tahun: 2017, kos: 19550, bayaran: 9980, hafis: 9570, jumlahJuta: 298 },
      { tahun: 2018, kos: 22450, bayaran: 9980, hafis: 12470, jumlahJuta: 314 },
      { tahun: 2019, kos: 22900, bayaran: 9980, hafis: 12920, jumlahJuta: 299 }
    ],
    nota: "Tiada penghantaran jemaah haji pada tahun 2020 dan 2021 (pandemik Covid-19)."
  };

  D.hafisUnjuran = {
    k: "A", ms: 167,
    nota: "UNJURAN laporan berdasarkan maklumat LTH, dengan andaian bayaran haji kekal RM12,980.",
    baris: [
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
    bilanganJemaah: 30000,
    notaJemaah: "Kuota semasa Malaysia ~30,000 jemaah (sebelum pandemik). Kerajaan Arab Saudi merancang meningkatkannya kepada 60,000 menjelang 2030.",
    msJemaah: 172
  };

  D.kosHajiSejarah = {
    k: "F",
    titik: [
      { tahun: 2003, kos: 15555, ms: 165 },
      { tahun: 2013, kos: 15553, ms: 21, nota: "Angka Ringkasan Eksekutif menyebut RM15,553.00 bagi 2013" },
      { tahun: 2022, kos: 25540, ms: 165 },
      { tahun: 2030, kos: 35000, ms: 165, anggaran: true, nota: "Anggaran laporan: kos haji akan mencecah RM35,000 pada 2030" },
      { tahun: 2050, kos: 50000, ms: 165, anggaran: true, nota: "Anggaran laporan: kos haji boleh meningkat kepada RM50,000" }
    ]
  };

  D.bayaranHaji = {
    k: "F",
    kadar: [
      { tempoh: "2009–2021", jumlah: 9980, nota: "Beku 13 tahun bagi jemaah kali pertama", ms: 166 },
      { tempoh: "2022 (B40)", jumlah: 10980, ms: 167 },
      { tempoh: "2022 (bukan B40)", jumlah: 12980, ms: 167 }
    ],
    depositMinima: { sekarang: 1300, dicadang: 12980, ms: 169 },
    masaMenunggu: { sekarang: 130, dicadang: 33, ms: 198, notaEY: "EY menggunakan RM9,980 dalam pengiraannya; teks laporan menyebut 130 tahun (Bab Empat) dan 135 tahun (perenggan 3.16.17) bagi keadaan sekarang.", msAlt: 170 },
    subsidiSemasa: { jumlahJuta: 400, kesanHibah: 0.4, ms: 72, nota: "Subsidi ~RM400 juta setahun bersamaan pengurangan 0.4% daripada kadar hibah kepada pendeposit." },
    hafisKumulatif: { nilai: 2.02, unit: "RM bilion", tempoh: "sejak 2001", ms: 191 },
    jemaahDiurus: { nilai: 1.46, unit: "juta rakyat Malaysia", tempoh: "1963–2021", ms: 191 }
  };

  /* ------------------------------------------------------------------
     10. 14 PELABURAN BERMASALAH (disyorkan audit forensik)
     ------------------------------------------------------------------ */
  D.pelaburan = [
    {
      id: "thip", nama: "PT TH Indo Plantations (THIP)", sektor: "Perladangan", lokasi: "Riau, Sumatera, Indonesia", ms: 139,
      pelaburan: null, kerugian: null, matawang: "USD",
      angka: [
        { label: "Harga jualan asal 95% ekuiti", nilai: "USD910 juta" },
        { label: "Pengurangan harga", nilai: "−USD100 juta" },
        { label: "Pendahuluan yang TH terpaksa beri", nilai: "USD178.6 juta" },
        { label: "Keluasan tanah", nilai: "83,000 hektar" }
      ],
      isu: "Tadbir urus dalam penjualan pegangan 95% ekuiti LTH kepada PT Borneo Pacific. Syer dipindahkan kepada pembeli SEBELUM bayaran penuh diterima.",
      tindakan: ["Siasatan dalaman + peguam untuk siasatan forensik", "Laporan polis (Dang Wangi/31331/2018) — masih dalam siasatan PDRM", "Kes juga dalam pertikaian undang-undang"],
      status: "Siasatan PDRM berterusan (rentas sempadan — perlu kebenaran pihak berkuasa Indonesia)",
      berat: 5, kategori: ["Laporan polis", "Mahkamah/timbang tara"]
    },
    {
      id: "emrail", nama: "Emrail Sdn. Bhd.", sektor: "Pembinaan/kereta api", lokasi: "Malaysia", ms: 140,
      pelaburanJuta: 20.17, kerugianJuta: 19.3,
      angka: [
        { label: "Pelaburan (15.3% ekuiti, 7 Jun 2016)", nilai: "RM20.17 juta" },
        { label: "Harga Put Option", nilai: "RM20.3 juta" },
        { label: "Dibayar oleh LHSB", nilai: "RM2 juta sahaja" },
        { label: "Rosot nilai direkod (31 Dis 2020)", nilai: "RM19.3 juta" }
      ],
      isu: "Penyenaraian awam dibatalkan dan Emrail gagal capai sasaran keuntungan RM36.1 juta bagi 2016. Put Option dilaksanakan tetapi Lingkaran Hartaniaga Sdn. Bhd. hanya bayar RM2 juta.",
      tindakan: ["Writ di Mahkamah Tinggi KL (8 Sep 2021)", "Mahkamah arah kes melalui timbang tara", "Pendaftaran di AIAC pada 22 April 2022"],
      status: "Proses timbang tara — masih menilai lima calon penimbang tara",
      berat: 2, kategori: ["Put Option gagal", "Mahkamah/timbang tara"]
    },
    {
      id: "wellspring", nama: "Wellspring Worldwide Limited", sektor: "Teknologi", lokasi: "Malaysia", ms: 141,
      pelaburanJuta: 18.4, kerugianJuta: 19.03,
      angka: [
        { label: "Pelaburan (10% ekuiti, 21 Sep 2014)", nilai: "RM18.4 juta" },
        { label: "Harga Put Option", nilai: "RM19.03 juta" },
        { label: "Perintah Mahkamah (5 Okt 2018)", nilai: "RM20.8 juta" },
        { label: "Dibayar Promoters", nilai: "RM0" }
      ],
      isu: "Syarikat gagal disenaraikan di Bursa Malaysia. Put Option dilaksanakan terhadap Promoters (Mohamed Ridzuan Nor Mohamed & Andy Farouk Muhamad Nasim) yang gagal bayar langsung.",
      tindakan: ["Tuntutan Mahkamah Tinggi KL", "Notis kebankrapan terhadap Promoters — dibenarkan Mahkamah 25 Januari 2022"],
      status: "Rosot nilai penuh RM19.03 juta direkod pada 31 Dis 2019",
      berat: 2, kategori: ["Put Option gagal", "Mahkamah/timbang tara"]
    },
    {
      id: "dssb", nama: "Deru Semangat Sdn. Bhd. (DSSB)", sektor: "Perladangan", lokasi: "Mukim Tembeling, Pahang", ms: 142,
      pelaburanJuta: 257, kerugianJuta: 225,
      angka: [
        { label: "Kelulusan pelaburan Menteri", nilai: "RM526.16 juta" },
        { label: "Pengambilalihan 55% ekuiti", nilai: "RM231.00 juta" },
        { label: "Pembiayaan pembangunan ladang", nilai: "RM295.16 juta" },
        { label: "Sebenarnya dikeluarkan (Jan 2021)", nilai: "RM257 juta" },
        { label: "Dirosotnilai kepada", nilai: "RM32 juta" },
        { label: "Baki komitmen berisiko", nilai: "RM258 juta" }
      ],
      isu: "Pembangunan ladang melibatkan pembalakan hutan simpan — melanggar polisi 'No Deforestation, No Peat and No Exploitation' (NDPE) pembeli utama Wilmar International. Hasil sawit tidak boleh dijual.",
      tindakan: ["Pegangan ekuiti dirungkai kepada YAM Tengku Muda Pahang — bayaran keseluruhan RM259 juta", "YAM TMP setuju mengenepikan komitmen RM258 juta (ekuiti RM71 juta + pembiayaan RM187 juta)"],
      status: "Diselesaikan melalui pemulangan saham",
      berat: 4, kategori: ["Usaha sama gagal"]
    },
    {
      id: "trurich", nama: "Trurich Resources Sdn. Bhd.", sektor: "Perladangan", lokasi: "Kalimantan, Indonesia", ms: 143,
      pelaburanJuta: 364.31, kerugianJuta: 364.31,
      angka: [
        { label: "Pelaburan LTH", nilai: "RM364.31 juta — dirosotnilai SEPENUHNYA" },
        { label: "Liabiliti semasa bersih 31 Dis 2017", nilai: "RM119.67 juta" },
        { label: "Liabiliti semasa bersih 31 Dis 2018", nilai: "RM92.78 juta" },
        { label: "Pinjaman tertunggak kepada Maybank", nilai: "USD179 juta" },
        { label: "Sasaran tanah", nilai: "sehingga 200,000 hektar" }
      ],
      isu: "Usaha sama dengan Felda Global Ventures Kalimantan (ditubuh 30 Nov 2009) tidak memberikan hasil; Trurich menjadi insolven.",
      tindakan: ["Laporan polis oleh anggota Lembaga Pengarah (Dang Wangi/32724/2018)", "Menteri luluskan pelupusan anak syarikat (22 Dis 2020)", "FGV & Maybank dalam proses akhir melupuskan kepada PT Karya Teknik Agro"],
      status: "Dalam proses pelupusan; siasatan PDRM berterusan",
      berat: 5, kategori: ["Laporan polis", "Usaha sama gagal"]
    },
    {
      id: "abraj", nama: "Abraj Sdn. Bhd.", sektor: "Hartanah", lokasi: "Malaysia", ms: 144,
      pelaburanJuta: 85, kerugianJuta: 40.25,
      angka: [
        { label: "Pegangan ekuiti keseluruhan", nilai: "RM85 juta" },
        { label: "Kerugian rosot nilai", nilai: "RM40.25 juta" }
      ],
      isu: "Usaha sama dengan Amanah Raya Berhad (sejak 11 Nov 2009) untuk pembelian hartanah. Sejak 2015 tidak mampu jana pendapatan untuk bayar pinjaman bank; penyewa utama berpindah.",
      tindakan: ["Cari penyewa baru, jual bangunan, penstrukturan pembiayaan", "Amanah Raya Berhad beli 50% pegangan LTH pada Disember 2020"],
      status: "Keluar daripada pelaburan (Disember 2020)",
      berat: 2, kategori: ["Usaha sama gagal"]
    },
    {
      id: "ppb", nama: "Putrajaya Perdana Berhad (PPB)", sektor: "Pembinaan", lokasi: "Malaysia", ms: 145,
      pelaburanJuta: 193.5, kerugianJuta: 145.3,
      angka: [
        { label: "Pelaburan 30% ekuiti (Dis 2014)", nilai: "RM193.50 juta" },
        { label: "Harga Put Option (7 Mac 2018)", nilai: "RM210.7 juta" },
        { label: "Rosot nilai (31 Dis 2020)", nilai: "RM145.3 juta" },
        { label: "Nilai buku bersih semasa", nilai: "RM48.2 juta" },
        { label: "Sasaran keuntungan 2015 yang gagal", nilai: "RM86 juta" }
      ],
      isu: "Dibeli daripada Cendana Destini Sdn. Bhd. dengan objektif penyenaraian awam dalam setahun. Gagal disenaraikan dan gagal capai sasaran keuntungan. CDSB gagal bayar Put Option.",
      tindakan: ["Kelulusan Portfolio Review Committee untuk tindakan undang-undang (12 Nov 2020)", "CDSB kemuka cadangan penyelesaian baharu (15 Jan 2021)", "Cadangan Pengaturan Penyelesaian dalam proses kelulusan dalaman"],
      status: "Rundingan penyelesaian",
      berat: 3, kategori: ["Put Option gagal"]
    },
    {
      id: "alrawda", nama: "Al-Rawda Real Estates Development & Project Management Co. Ltd.", sektor: "Hotel/pajakan", lokasi: "Makkah & Madinah, Arab Saudi", ms: 147,
      pelaburanJuta: null, kerugianJuta: 202.8, matawang: "SR",
      angka: [
        { label: "Nilai perjanjian pajakan dibayar", nilai: "SR1,426 juta" },
        { label: "Pendapatan sewa pajakan sepatutnya", nilai: "SR2,490 juta" },
        { label: "Sewa tertunggak (31 Dis 2021)", nilai: "SR560.7 juta" },
        { label: "Tindakan PN terhadap Al-Rawda", nilai: "9 tindakan, SR344.0 juta" },
        { label: "Tindakan PN terhadap Dr. Mashhoor", nilai: "7 tindakan, SR255.1 juta" },
        { label: "Perjanjian penyelesaian April 2021", nilai: "SR1,748 juta" },
        { label: "Tawaran Al-Rawda (ditolak LTH)", nilai: "SR968.0 juta" },
        { label: "Kerugian kredit dijangka (31 Dis 2020)", nilai: "RM202.8 juta" },
        { label: "Rosot nilai tambahan dijangka 2021", nilai: "RM184 juta" }
      ],
      isu: "Pajakan jangka panjang 10–18 tahun bagi empat hotel (Al-Aqiq, Al-Haram, Al-Saha di Madinah; Rawdat Al-Bait di Makkah). Al-Rawda gagal bayar pendapatan sewa sejak Mac 2019.",
      tindakan: ["Perintah penguatkuasaan Mahkamah Arab Saudi terhadap Al-Rawda dan Dr. Mashhoor", "Aset Dr. Mashhoor dibekukan; sekatan perjalanan dikenakan", "20 hartanah di Jeddah/Madinah/Makkah dikenal pasti untuk likuidasi (jangka 2 tahun)", "Al-Rawda kemuka notis timbang tara mendakwa perjanjian bertentangan syariah — dinafikan keras LTH"],
      status: "Timbang tara + likuidasi aset berjalan serentak",
      berat: 5, kategori: ["Mahkamah/timbang tara"]
    },
    {
      id: "alfareeda", nama: "Al-Fareeda Residential Fund", sektor: "Dana hartanah", lokasi: "Arab Saudi", ms: 150,
      pelaburanJuta: 63, kerugianJuta: 63, matawang: "SR",
      angka: [
        { label: "Langganan (21 Feb 2013)", nilai: "SR76 juta ≈ RM63 juta" },
        { label: "Bahagian dalam dana", nilai: "13.8% daripada SR550 juta" },
        { label: "Kerugian", nilai: "SR76 juta — dihapus kira sepenuhnya" }
      ],
      isu: "Undang-undang baharu buruh & imigresen Arab Saudi, kontraktor bermasalah, kenaikan harga bahan binaan, kejatuhan harga minyak mentah. Dana dicairkan; aset kini di bawah Alinma Bank.",
      tindakan: ["Tiada perkembangan sejak 2017", "Pengurus dana (Anfaal Capital) tidak dapat dikesan"],
      status: "Dihapus kira sepenuhnya",
      berat: 3, kategori: ["Dana luar negara"]
    },
    {
      id: "thp", nama: "TH Plantations Berhad (THP)", sektor: "Perladangan", lokasi: "Malaysia/Indonesia", ms: 151,
      pelaburanJuta: null, kerugianJuta: 170,
      angka: [
        { label: "Sukuk yang dikeluarkan LTH untuk THP", nilai: "RM1.2 bilion" },
        { label: "Rosot nilai di peringkat LTH", nilai: "RM170 juta" },
        { label: "Ladang produktif", nilai: "hanya 58%" }
      ],
      isu: "Laporan Forensik PwC (25 April 2019): pengurusan kanan dan Lembaga THP gagal memenuhi tanggungjawab fidusiari. Isu tertumpu pada pengambilalihan Bumi Suria Ventures, Maju Warisanmas dan PT Persada Kencana Prima. THP beli ladang 2012–2014 secara pembiayaan, kemudian terpaksa jual estet untuk bayar hutang.",
      tindakan: ["PwC lantik untuk siasatan forensik", "Laporan kepada PDRM, SPRM dan Suruhanjaya Sekuriti", "KPE THP diletak garden leave, letak jawatan 20 Ogos 2018"],
      status: "Siasatan SC dan PDRM berterusan",
      berat: 5, kategori: ["Laporan polis", "SPRM", "Audit forensik"]
    },
    {
      id: "thproperties", nama: "TH Properties Sdn. Bhd.", sektor: "Hartanah", lokasi: "Malaysia", ms: 151,
      pelaburanJuta: null, kerugianJuta: 2.2,
      angka: [
        { label: "Bonus istimewa dibayar 2017 & 2018", nilai: "RM2.2 juta" },
        { label: "Bilangan syarikat subsidiari", nilai: "26 subsidiari + 5 usaha sama" },
        { label: "Keuntungan sebelum cukai 2017", nilai: "RM34.84 juta" }
      ],
      isu: "Bonus istimewa dibayar kepada Ahli Lembaga dan pengurusan tanpa kelulusan LTH sebagai pemegang ekuiti utama. Exco tiada mandat membuat keputusan tersebut.",
      tindakan: ["Siasatan dalaman (5 Feb 2020)", "Tetuan Tajuddin & Co. dilantik", "Lembaga Pengarah putus untuk dapatkan kembali bonus (12 Ogos 2020)"],
      status: "Usaha mendapatkan semula bonus",
      berat: 2, kategori: ["Bonus tidak wajar"]
    },
    {
      id: "thmarine", nama: "Alam Maritim Resources / TH Marine", sektor: "Perkapalan luar pesisir", lokasi: "Malaysia", ms: 152,
      pelaburanJuta: 334, kerugianJuta: 278,
      angka: [
        { label: "Jumlah pelaburan Kumpulan TH Marine", nilai: "RM334 juta (ekuiti RM198 juta + pembiayaan RM136 juta)" },
        { label: "Ekuiti dirosotnilai", nilai: "RM198 juta — sepenuhnya" },
        { label: "Pembiayaan dirosotnilai", nilai: "RM80 juta daripada RM136 juta" },
        { label: "Dijangka diperoleh semula (PwC)", nilai: "RM70.4 juta sahaja" },
        { label: "Nilai pelaburan usaha sama", nilai: "USD20.27 juta (6 kapal AHTS)" }
      ],
      isu: "Usaha sama 51% ekuiti dengan Alam Maritim Resources Berhad diluluskan Menteri pada 18 Jun 2015 — enam kapal AHTS usaha sama dan dua AHTS milik penuh.",
      tindakan: ["PwC dilantik menilai kebolehpulihan pelaburan"],
      status: "Rosot nilai besar; pemulihan terhad",
      berat: 4, kategori: ["Usaha sama gagal"]
    },
    {
      id: "thhr", nama: "TH Hotel & Residences Sdn. Bhd. (THHR)", sektor: "Hotel", lokasi: "Malaysia", ms: 153,
      pelaburanJuta: null, kerugianJuta: 5.9,
      angka: [
        { label: "Nilai pemindahan hartanah ke UJSB", nilai: "RM804.1 juta" },
        { label: "Premium ke atas nilai buku", nilai: "lebih kurang 55%" },
        { label: "Hasil sewaan 2020", nilai: "RM6.2 juta (turun 62% daripada RM16.5 juta pada 2019)" },
        { label: "Kerugian bersih selepas cukai", nilai: "RM5.9 juta" }
      ],
      isu: "Hotel dan kompleks haji di Alor Setar, Kuching, Pulau Pinang, Kuala Terengganu dan Kota Kinabalu dikenal pasti memberi pulangan rendah (kurang 2%) lalu dipindahkan ke UJSB.",
      tindakan: ["Perjanjian Pemindahan Aset dengan UJSB (28 Dis 2018)"],
      status: "Sebahagian aset dipindah; Hotel Movenpick Sepang & Kompleks Haji Kelana Jaya kekal dengan LTH",
      berat: 2, kategori: ["Pulangan rendah"]
    },
    {
      id: "fgv", nama: "FGV Berhad", sektor: "Perladangan", lokasi: "Malaysia", ms: 154,
      pelaburanJuta: 1310.02, kerugianJuta: 1058.94,
      angka: [
        { label: "Langganan IPO (9 Mei 2012)", nilai: "276 juta unit @ RM4.65 (7.5% pegangan)" },
        { label: "Langganan tambahan (26 Jun 2012)", nilai: "273,579,700 unit @ RM4.55" },
        { label: "Jumlah pelaburan IPO", nilai: "RM1,253,742,809 @ kos RM4.58/unit" },
        { label: "Pembelian semula (Jul–Okt 2012)", nilai: "232,010,800 unit @ RM5.01 = RM116.2 juta" },
        { label: "Keuntungan jualan awal (Jun–Jul 2012)", nilai: "RM11,739,835" },
        { label: "Jumlah kos keseluruhan", nilai: "RM1,310,020,819" },
        { label: "Kerugian tidak nyata", nilai: "RM1,058,937,380" },
        { label: "Harga pasaran (Feb 2022)", nilai: "RM0.69/unit" },
        { label: "Diambil alih UJSB pada kos", nilai: "283,710,100 unit @ RM4.62" }
      ],
      isu: "Harga saham jatuh sehingga RM0.885/unit. Suruhanjaya bertanya mengapa LTH terus memegang saham dan tidak menjual sehingga harga jatuh serendah itu.",
      tindakan: ["Saham diambil alih UJSB pada nilai kos — menyelamatkan LTH daripada kerugian ~RM1.1 bilion"],
      status: "Dipindahkan ke UJSB",
      berat: 5, kategori: ["Kerugian pasaran"]
    }
  ];

  D.pelaburanNota = {
    ms: 138,
    punca: [
      "Proses membuat keputusan pelaburan tidak teratur; tiada koordinasi antara Ketua Pegawai Pelaburan, Ketua Kewangan Korporat, Ketua Pegawai Hartanah dan Ketua Bahagian Perbendaharaan.",
      "Terlalu banyak lapisan pertimbangan tetapi tidak menghasilkan keputusan pelaburan yang baik.",
      "Panel Pelaburan bergantung kepada input Pengurusan LTH dan tidak menyemak cadangan dengan secukupnya. Pengerusi Panel Pelaburan, Dato' Mohzani, mengakui pendekatan yang digunakan longgar dan tidak menyeluruh.",
      "Menteri bergantung sepenuhnya kepada memo Lembaga dan Pengurusan; tiada input pihak ketiga. Semua dokumen menunjukkan 'dipersetujui seperti dicadangkan'."
    ],
    pandangan: "Setiap anggota Lembaga dan Lembaga Pengarah anak syarikat, pengurusan serta kakitangan yang terlibat patut dipertanggungjawabkan atas kerugian yang dialami.",
    msPandangan: 155
  };

  /* ------------------------------------------------------------------
     11. TADBIR URUS — jawatan & tempoh
     ------------------------------------------------------------------ */
  function p(nama, mula, tamat, extra) {
    var o = { nama: nama, mula: mula, tamat: tamat };
    if (extra) for (var kk in extra) o[kk] = extra[kk];
    return o;
  }

  D.jawatan = {
    ms: 18,
    kumpulan: [
      {
        id: "menteri", label: "Menteri Hal Ehwal Agama", warna: "#8b5cf6", ms: 18,
        orang: [
          p("Mejar Jeneral (B) Dato' Seri Jamil Khir bin Haji Baharom", "2009-02-10", "2018-05-09"),
          p("Tun Dr. Mahathir bin Mohamad (kuasa Menteri dijalankan PM)", "2018-05-10", "2018-07-01", { nota: "P.U.(A) 125/2018" }),
          p("Datuk Seri Dr. Mujahid bin Yusof Rawa", "2018-07-02", "2020-03-09"),
          p("Datuk Dr. Zulkifli bin Mohamad al-Bakri", "2020-03-10", "2021-08-29"),
          p("Datuk Haji Idris bin Ahmad", "2021-08-30", "2022-07-19", { semasa: true })
        ]
      },
      {
        id: "pengerusi", label: "Pengerusi Lembaga", warna: "#0ea5a4", ms: 21,
        orang: [
          p("Datuk Seri Panglima Abdul Azeez bin Abdul Rahim", "2013-07-01", "2018-05-23", { politik: true, nota: "Ahli Parlimen Baling; Majlis Tertinggi UMNO" }),
          p("Tan Sri Md Nor bin Md Yusof", "2018-07-10", "2021-10-15", { tamatAwal: true, nota: "Ditamatkan sebelum tamat kontrak yang baru disambung dua tahun mulai 20 Julai 2020" }),
          p("Tan Sri Azman bin Mokhtar", "2021-12-20", "2022-07-19", { semasa: true })
        ]
      },
      {
        id: "kpe", label: "Ketua Pegawai Eksekutif", warna: "#f59e0b", ms: 27,
        orang: [
          p("Tan Sri Ismee bin Ismail", "2006-01-01", "2016-06-30"),
          p("Datuk Seri Johan bin Abdullah", "2016-07-01", "2018-06-30"),
          p("Dato' Sri Zukri bin Samat", "2018-07-10", "2019-08-31"),
          p("Datuk Nik Mohd Hasyudeen bin Yusoff", "2019-09-01", "2021-05-05", { tamatAwal: true, nota: "Ditamatkan 5 Mei 2021 sebelum tempoh sebenar 31 Ogos 2021" }),
          p("Datuk Sri Amrin bin Awaluddin", "2021-05-06", "2022-07-19", { semasa: true })
        ]
      },
      {
        id: "jpm", label: "Wakil Jabatan Perdana Menteri", warna: "#64748b", ms: 22,
        orang: [
          p("Tan Sri Othman bin Mahmood", "2012-01-16", "2017-07-31"),
          p("Tan Sri Dato' Seri Mohd Zuki bin Ali", "2017-08-01", "2019-04-16"),
          p("Datuk Seri Hasnol Zam Zam bin Haji Ahmad", "2019-06-11", "2020-02-01"),
          p("Datuk Seri Mohd Sallehhuddin bin Hassan", "2020-06-16", "2021-07-31"),
          p("Datuk Jamil bin Rakon", "2021-08-01", "2022-04-18", { nota: "Selepas ini kosong — belum dilantik" })
        ]
      },
      {
        id: "perbendaharaan", label: "Wakil Perbendaharaan", warna: "#0369a1", ms: 22,
        orang: [
          p("Tan Sri Dr. Mohd Irwan Serigar bin Abdullah", "2011-03-01", "2018-05-14"),
          p("Tan Sri Ahmad Badri bin Mohd Zahir", "2018-10-31", "2020-05-01"),
          p("Datuk Seri Asri bin Hamidon", "2020-06-15", "2022-07-19", { semasa: true })
        ]
      }
    ]
  };

  D.anggotaLembaga = {
    ms: 23,
    orang: [
      p("Prof. Emeritus Tan Sri Dato' Dr. Abdul Shukor bin Husin", "2004-10-15", "2018-10-14"),
      p("Tan Sri Dato' Paduka Haji Badruddin bin Amiruldin", "2005-01-01", "2018-06-30", { politik: true, nota: "Ahli Parlimen Yan/Jerai 2004–2008; Pengerusi Tetap Perhimpunan Agong UMNO" }),
      p("Tan Sri Ismee bin Ismail", "2006-01-01", "2016-06-30"),
      p("Datuk Seri Panglima Haji Abdul Azeez bin Haji Abdul Rahim", "2011-01-01", "2013-04-17", { politik: true }),
      p("Allahyarham Tan Sri Datuk Haji Mohamad bin Haji Aziz", "2011-01-01", "2018-06-30"),
      p("Tan Sri Dato' Hashim bin Meon", "2011-01-01", "2015-12-31"),
      p("Dato' Haji Ghazali bin Awang", "2011-09-01", "2015-08-31"),
      p("Datuk Rosni binti Sohar", "2014-02-01", "2018-05-23", { politik: true, nota: "ADUN Hulu Bernam; Majlis Kerja Tertinggi & Setiausaha Wanita UMNO Malaysia" }),
      p("Tan Sri Haji Syukry bin Mohd Salleh", "2015-09-01", "2018-08-31"),
      p("Tan Sri Dato' Sri Haji Mohamed Apandi bin Ali", "2016-01-15", "2018-06-04"),
      p("Datuk Seri Johan bin Abdullah", "2016-07-01", "2018-06-30"),
      p("Dato' Sri Zukri bin Samat", "2018-07-10", "2019-08-31"),
      p("Tan Sri Abu Talib bin Othman", "2018-08-10", "2020-08-09"),
      p("Datuk Zaiton binti Mohd Hassan", "2018-08-10", "2020-08-09"),
      p("Profesor Dr. Ashraf bin Md Hashim", "2018-08-10", "2022-07-19", { semasa: true }),
      p("Dato' Noordin bin Sulaiman", "2018-08-15", "2022-07-19", { semasa: true }),
      p("Datuk Haji Ahamed Basheer bin Mohd Hussain", "2019-03-26", "2021-03-25"),
      p("Datuk Akbar bin Samon", "2019-06-11", "2021-06-10"),
      p("Datuk Nik Mohd Hasyudeen bin Yusoff", "2019-09-01", "2021-05-05"),
      p("Dato' Abdul Mutalib bin Datuk Seri Mohamed Razak", "2020-08-10", "2022-07-19", { semasa: true }),
      p("YM Tengku Dato' Seri Hasmuddin bin Tengku Othman", "2021-03-16", "2022-07-19", { semasa: true }),
      p("Datuk Sri Amrin bin Awaluddin", "2021-05-06", "2022-07-19", { semasa: true }),
      p("Dato' Abdul Hamid bin Sh. Mohamed", "2021-08-01", "2022-07-19", { semasa: true }),
      p("Datin Paduka Kartini binti Haji Abdul Manaf", "2021-08-01", "2022-07-19", { semasa: true })
    ]
  };

  /* Penglibatan dalam anak syarikat — konflik kepentingan */
  D.jawatanAnakSyarikat = {
    ms: 46,
    dasarBaharu: { had: 5, nota: "LTH telah tetapkan dasar baharu mengehadkan jawatan di anak syarikat kepada lima buah sahaja.", ms: 52 },
    orang: [
      {
        nama: "Datuk Seri Panglima Abdul Azeez bin Abdul Rahim", peranan: "Pengerusi LTH (2013–2018)", ms: 46,
        syarikat: ["TH Real Estate LLC (Pengerusi)", "TH Hotel & Residence (ALP & Pengerusi)", "Putrajaya Perdana Berhad (ALP & Pengerusi)", "The Edge Berhad (ALP)", "Yayasan Tabung Haji (ALP)", "LTH Property Holdings 3 Limited (ALP)", "LTH Property Holdings 4 Limited (ALP)", "LTH Property Holdings 5 Limited (ALP)"]
      },
      {
        nama: "Tan Sri Dato' Paduka Haji Badruddin bin Amiruldin", peranan: "Anggota Lembaga (2005–2018)", ms: 46,
        syarikat: ["TH Travel & Services Sdn. Bhd. (ALP)", "TH Hotel & Residence Sdn. Bhd. (ALP)", "TH Global Services Sdn. Bhd. (ALP)"]
      },
      {
        nama: "Datuk Zaiton binti Mohd Hassan", peranan: "Anggota Lembaga (2018–2020)", ms: 47,
        syarikat: ["TH Properties Sdn. Bhd. (Pengerusi)", "THP Enstek Development Sdn. Bhd. (ALP)", "LTH Property Holdings Limited (ALP)", "LTH Property Holdings 2 Limited (ALP)", "LTH Property Holdings 3 Limited (ALP)", "LTH Property Holdings 4 Limited (ALP)", "LTH Property 5 Limited (ALP)"]
      },
      {
        nama: "Dato' Noordin bin Sulaiman", peranan: "Anggota Lembaga (2018–kini)", ms: 47,
        syarikat: ["TH Hotel and Residence (Pengerusi)", "TH Travel & Services (Pengerusi)", "THV Management Services Sdn. Bhd. (Pengerusi)", "Premia Cards Sdn. Bhd. (Pengerusi)", "Theta Edge Berhad (Pengerusi)", "TH Hotel Sarawak (ALP)", "Express Rail Link Sdn. Bhd. (ALP)", "Putrajaya Perdana Berhad (ALP)", "TH Alam Holding (ALP)"]
      },
      {
        nama: "Tan Sri Ismee bin Ismail", peranan: "KPE & Anggota Lembaga (2006–2016)", ms: 48,
        syarikat: ["TH Plantations Berhad (ALP)", "Trurich Resources Sdn. Bhd. (ALP)", "BIMB Holdings Berhad (ALP)", "Bank Islam Malaysia Berhad (ALP)", "Syarikat Takaful Malaysia Berhad (ALP)", "LTH Property Holdings Ltd. (ALP)", "TH Travel Sdn. Bhd. (ALP)"],
        nota: "Walaupun tamat perkhidmatan 30 Jun 2016, beliau terus memegang jawatan di TH Plantations, Trurich dan TH Travel & Services sehingga Mei 2018."
      },
      {
        nama: "Datuk Seri Johan bin Abdullah", peranan: "KPE & Anggota Lembaga (2016–2018)", ms: 48,
        syarikat: ["TH Heavy Engineering Bhd. (Pengerusi)", "Trurich Resources Sdn. Bhd. (Pengerusi)", "Deru Semangat Sdn. Bhd. (Pengerusi)", "TH Properties Sdn. Bhd. (ALP)", "TH Hotel & Residence Sdn. Bhd. (ALP)", "TH Plantations Berhad (ALP)", "Malakoff Corporation Bhd. (ALP)", "LTH Property Holdings Ltd. (ALP)", "LTH Property Holdings 2 Ltd. (ALP)", "Express Rail Link Sdn. Bhd. (ALP)", "YTL THP JV Sdn. Bhd. (ALP)", "Glomac Berhad (ALP)", "Yayasan Tabung Haji (ALP)", "Premia Cards Sdn. Bhd. (ALP)", "LTH Property Holdings 3 Ltd. (ALP)", "LTH Property Holdings 4 Ltd. (ALP)", "LTH Property Holdings 5 Ltd. (ALP)", "PT TH Felda Nusantara (ALP)"]
      },
      {
        nama: "Dato' Sri Zukri bin Samat", peranan: "KPE & Anggota Lembaga (2018–2019)", ms: 49,
        syarikat: ["TH Plantations Berhad (Pengerusi)", "TH Estates Holding Sdn. Bhd. (Pengerusi)", "TH Properties Sdn. Bhd. (Pengerusi)", "Yayasan Tabung Haji (ALP)"],
        nota: "Memaklumkan Suruhanjaya bahawa beliau telah melepaskan jawatan tersebut untuk mengelak konflik kepentingan."
      },
      {
        nama: "Datuk Nik Mohd Hasyudeen bin Yusoff", peranan: "KPE & Anggota Lembaga (2019–2021)", ms: 50,
        syarikat: ["Bank Islam Malaysia Berhad (ALP)", "BIMB Holdings Berhad (ALP)", "TH Plantations Berhad (ALP)", "TH Properties Sdn. Bhd. (ALP)"]
      },
      {
        nama: "Datuk Sri Amrin bin Awaluddin", peranan: "KPE & Anggota Lembaga (2021–kini)", ms: 50,
        syarikat: ["TH Plantations Bhd. (ALP)", "TH Properties Sdn. Bhd. (ALP)", "Bank Islam Malaysia Berhad (ALP)"]
      },
      {
        nama: "Datuk Rozaida binti Omar", peranan: "Ketua Pegawai Kewangan Kumpulan (2004–2021)", ms: 51,
        syarikat: ["Syarikat Takaful Malaysia Berhad (ALP)", "Pelikan International Corporation Berhad (ALP)", "BIMB Holdings Berhad (ALP)", "Premia Cards Sdn. Bhd. (ALP)", "TH Hotel & Residence Sdn. Bhd. (ALP)", "THV Management Services Sdn. Bhd. (ALP)", "151 BPR One Limited (ALP)", "151 BPR Two Limited (ALP)", "LTH Property Investment (L) Inc (ALP)", "Leatherhead Properties Limited (ALP)", "TH Heavy Engineering Berhad (ALP)", "Putrajaya Perdana Berhad (ALP)", "Millstream Property Limited (ALP)", "LTH Property Holdings Limited (ALP)", "LTH Property Holdings 2 Limited (ALP)", "LTH Property Holdings 3 Limited (ALP)", "LTH Property Holdings 4 Limited (ALP)", "LTH Residence Limited (ALP)", "10 Queen Street Place London Limited (ALP)", "Wilton Property Limited (ALP)", "Marston Development Limited (ALP)", "Luton Investment Limited (ALP)", "LTH Oxford Limited (ALP)"],
        nota: "Menyandang jawatan sebagai proksi mewakili LTH."
      },
      {
        nama: "Encik Abd Kadir bin Sahlan", peranan: "Ketua Pegawai Pelaburan (2010–2018)", ms: 52,
        syarikat: ["TH Properties Group (ALP)", "Syarikat Perladangan Sabah Sarawak (ALP)", "BIMB Securities Sdn. Bhd. (ALP)"]
      }
    ]
  };

  /* ------------------------------------------------------------------
     12. AKAUNTABILITI
     ------------------------------------------------------------------ */
  D.laporanPolis = {
    ms: 156,
    baris: [
      { tarikh: "30 November 2018", repot: "Dang Wangi/31347/2018", pengadu: "Idrus bin Ismail (mantan Setiausaha Syarikat LTH)", isu: "Penganjuran aktiviti dan penggunaan wang oleh Yayasan Tabung Haji yang didakwa menyalahi Memorandum and Articles of Association.", status: "Siasatan lengkap — kertas siasatan dirujuk kepada Jabatan Peguam Negara" },
      { tarikh: "30 November 2018", repot: "Dang Wangi/31331/2018", pengadu: "Idrus bin Ismail", isu: "Salah nyataan dan penyembunyian maklumat berkaitan penjualan 95% saham LTH dalam PT TH Indo Plantations kepada PT Borneo Pacific (dianggarkan USD910 juta).", status: "Siasatan PDRM berterusan — memerlukan kebenaran pihak berkuasa Indonesia" },
      { tarikh: "13 Disember 2018", repot: "Dang Wangi/32724/2018", pengadu: "Aliatun binti Mahmud (mantan Setiausaha Trurich)", isu: "Dakwaan manipulasi laporan kesesuaian tanah bagi 40,880 hektar di Kalimantan Utara & Tengah, menyebabkan Trurich memperoleh ladang bernilai sekitar USD58 juta (2008–2009).", status: "Siasatan PDRM berterusan — menunggu kebenaran pihak berkuasa Indonesia" },
      { tarikh: "16 Januari 2019", repot: "Dang Wangi/1484/2019", pengadu: "Idrus bin Ismail", isu: "Pengisytiharan hibah bagi tahun kewangan 2017 yang bercanggah dengan seksyen 22 Akta 535; dakwaan salah nyataan dalam dua kertas kerja kepada Mesyuarat Khas Lembaga pada 6 & 9 Februari 2018.", status: "Siasatan lengkap — kertas siasatan dirujuk kepada Jabatan Peguam Negara" }
    ]
  };

  D.laporanSPRM = {
    ms: 163,
    baris: [
      "Dakwaan rasuah dalam pembelian Ladang Weida Bhd oleh TH Plantation",
      "Dakwaan penyelewengan dan salah guna kuasa dalam penyewaan Restoran Opah, KL Sentral",
      "Dakwaan penyelewengan dan salah guna kuasa dalam penyewaan Restoran Nasi Dalca, Lantai 2 Ibu Pejabat LTH",
      "Dakwaan penyelewengan dan rasuah oleh mantan Ketua Pegawai Operasi LTH dalam kerja pengubahsuaian",
      "Dakwaan pemalsuan dokumen pembekalan rubber seedlings TH Plantation di Ladang TH-Usia Jatimas, Sandakan",
      "Dakwaan salah laku dan penyelewengan pegawai THP Bina Sdn. Bhd. dan THP Timur Sdn. Bhd."
    ],
    status: "SPRM masih menjalankan siasatan bagi semua dakwaan."
  };

  D.tatatertib = {
    ms: 159,
    kluster: [
      { id: 1, tajuk: "Penjualan saham dalam PT TH Indo Plantations" },
      { id: 2, tajuk: "Pelanggaran Akta Syarikat 1965 — sumbangan RM22.12 juta kepada Yayasan Tabung Haji tanpa kelulusan awal Menteri KPDNHEP" },
      { id: 3, tajuk: "Perisytiharan hibah bagi tahun kewangan berakhir 2017" },
      { id: 4, tajuk: "Pengemukaan tuntutan mengandungi butiran palsu kepada Pengurus Unit Bayaran" }
    ],
    kes: [
      { pegawai: "Datuk Rozaida binti Omar", jawatanAsal: "Ketua Pegawai Kewangan Kumpulan (Gred K)", kluster: 1, pertuduhan: "29 Mei 2020", keputusan: "Buang kerja (21 April 2021)", rayuan: "Turun pangkat (6 September 2021)", kini: "Pengurus Besar Strategik Modal Insan (Gred J), Jabatan Modal Insan LTH" },
      { pegawai: "Datuk Rozaida binti Omar", jawatanAsal: "Ketua Pegawai Kewangan Kumpulan (Gred K)", kluster: 2, pertuduhan: "15/19 Mac 2019", keputusan: "Turun pangkat (31 Mei 2019 / 1 Nov 2019)", rayuan: "Amaran keras (18 Jul 2019 / 28 Jan 2020)", kini: "—" },
      { pegawai: "Datuk Rozaida binti Omar", jawatanAsal: "Ketua Pegawai Kewangan Kumpulan (Gred K)", kluster: 3, pertuduhan: "3 Januari 2020", keputusan: "Buang kerja (16 April 2021)", rayuan: "Turun pangkat (6 September 2021)", kini: "—", lambatBulan: 15 },
      { pegawai: "Dato' Adi Azuan Abdul Ghani", jawatanAsal: "Ketua Pegawai Operasi (Gred K)", kluster: 2, pertuduhan: "15/19 Mac 2019", keputusan: "Turun pangkat", rayuan: "Amaran keras", kini: "Pengurus Besar Kanan Kafe & Pembangunan Perniagaan (Gred K), TH Hotel & Residence Sdn. Bhd.", lambatBulan: 19 },
      { pegawai: "Rifina binti Md Ariff", jawatanAsal: "Pengurus Besar Kanan Perkhidmatan Korporat & Hartanah (Gred K)", kluster: 1, pertuduhan: "29 Mei 2020", keputusan: "Buang kerja (21 April 2021)", rayuan: "Turun pangkat (6 September 2021)", kini: "Ketua Bahagian Risiko dan Pematuhan (Gred J), TH Plantations Berhad" },
      { pegawai: "Mohd Hisham bin Harun", jawatanAsal: "Ketua Pegawai Sumber Manusia (Gred K)", kluster: 1, pertuduhan: "29 Mei 2020", keputusan: "Buang kerja (21 April 2021)", rayuan: "Turun pangkat (6 September 2021)", kini: "Head, Business and Corporate Affairs (Gred J), TH Properties Sdn. Bhd." },
      { pegawai: "Mohd Hisham bin Harun", jawatanAsal: "Ketua Pegawai Sumber Manusia (Gred K)", kluster: 2, pertuduhan: "15/19 Mac 2019", keputusan: "Turun pangkat", rayuan: "Amaran + tangguh kenaikan gaji", kini: "—" },
      { pegawai: "Hazlina binti Mohd Khalid", jawatanAsal: "Penasihat Undang-Undang (Gred J)", kluster: 1, pertuduhan: "29 Mei 2020", keputusan: "Buang kerja (21 April 2021)", rayuan: "Turun pangkat (6 September 2021)", kini: "Timbalan Pengurus Besar (Gred H2), TH Plantations Berhad" },
      { pegawai: "Hazlina binti Mohd Khalid", jawatanAsal: "Penasihat Undang-Undang (Gred J)", kluster: 4, pertuduhan: "11 Januari 2019", keputusan: "Turun pangkat (1 Nov 2019)", rayuan: "Hukuman turun pangkat DIKEKALKAN (28 Jan 2020)", kini: "—", lambatBulan: 10 }
    ],
    pemerhatian: "Semua pegawai yang dikenakan tindakan tatatertib masih kekal bertugas dengan LTH atau anak syarikatnya. Proses tatatertib mengambil masa 10 hingga 19 bulan daripada tarikh surat representasi sebelum Jawatankuasa Tatatertib bersidang.",
    msPemerhatian: 163
  };

  /* ------------------------------------------------------------------
     13. 25 SYOR (Bab Empat 4.4.1 – 4.4.25)
     ------------------------------------------------------------------ */
  D.syor = [
    { no: "4.4.1", kategori: "Undang-undang", tajuk: "Pindaan menyeluruh Akta 535", teks: "Sembilan perkara perlu dikanunkan: kriteria khusus anggota Lembaga; bidang kepakaran; larangan ahli politik aktif; rujukan kepada badan bebas sebelum pembatalan pelantikan; sebab munasabah sebelum penamatan; pengkanunan Jawatankuasa Urusan Haji, Jawatankuasa Penasihat Syariah dan Panel Pelaburan; peruntukan jelas pengiraan hibah berpandu penyata beraudit; penubuhan jabatan Dana Haji di bawah kawal selia SC; pindaan seksyen 26 mengecualikan Akta 240.", ms: 192, kepada: "Kerajaan/Parlimen", berat: 5 },
    { no: "4.4.2", kategori: "Tadbir urus", tajuk: "Kuasa dibahagi kepada dua Menteri", teks: "Menteri Hal Ehwal Agama untuk pengurusan haji; Menteri Kewangan untuk kewangan, dana dan pelaburan. Pelantikan anggota Lembaga dan KPE dibuat oleh Perdana Menteri atas syor badan penasihat bebas.", ms: 193, kepada: "Kerajaan", berat: 5 },
    { no: "4.4.3", kategori: "Tadbir urus", tajuk: "Hadkan jawatan di anak syarikat", teks: "Penglibatan anggota Lembaga dan pengurusan LTH dalam pengurusan anak syarikat hendaklah dihadkan bagi mengelak konflik kepentingan.", ms: 194, kepada: "LTH", berat: 4 },
    { no: "4.4.4", kategori: "Kawal selia", tajuk: "BNM tidak seharusnya mengawal selia LTH", teks: "Jika masih perlu, hadkan kepada kawalan rizab dan pengurusan kecairan sahaja — dan tidak tertakluk kepada Akta 759, Akta 758 dan Akta 618.", ms: 194, kepada: "Kerajaan/BNM", berat: 3 },
    { no: "4.4.5", kategori: "Audit", tajuk: "Audit oleh firma akauntan swasta", teks: "Pengauditan penyata kewangan LTH tidak lagi dipertanggungjawabkan kepada Jabatan Audit Negara.", ms: 194, kepada: "Kerajaan/LTH", berat: 5 },
    { no: "4.4.6", kategori: "Kewangan", tajuk: "Hibah mesti berdasarkan penyata beraudit", teks: "Bukan Laporan Proforma. RAV tidak boleh dijadikan asas — gunakan nilai aset dan liabiliti seperti dilaporkan dalam Penyata Kewangan.", ms: 194, kepada: "LTH", berat: 5 },
    { no: "4.4.7", kategori: "Pelaporan", tajuk: "Patuh sepenuhnya piawaian pelaporan", teks: "Mematuhi Akta 240 dan PA 3.1 Garis Panduan Penyediaan Laporan Tahunan Badan Berkanun Persekutuan.", ms: 195, kepada: "LTH", berat: 3 },
    { no: "4.4.8", kategori: "Bonus", tajuk: "Hentikan bonus terlalu tinggi", teks: "Amalan pemberian bonus yang terlalu tinggi kepada kakitangan hendaklah dihentikan.", ms: 195, kepada: "LTH", berat: 3 },
    { no: "4.4.9", kategori: "Bonus", tajuk: "Dapatkan semula bonus TH Properties", teks: "Bonus kepada ahli Lembaga dan Pengurusan TH Properties diberikan tanpa mematuhi peraturan — perlu didapatkan semula.", ms: 195, kepada: "LTH/TH Properties", berat: 3 },
    { no: "4.4.10", kategori: "Akauntabiliti", tajuk: "Audit forensik ke atas 14 pelaburan", teks: "Meneliti bagaimana keputusan pelaburan lalu dibuat sehingga menyebabkan penurunan nilai aset yang teruk.", ms: 195, kepada: "LTH/Kerajaan", berat: 5 },
    { no: "4.4.11", kategori: "Akauntabiliti", tajuk: "Tindakan tegas atas laporan polis", teks: "Pihak berkuasa wajib mengambil tindakan tegas dan segera ke atas setiap laporan polis atau aduan berkaitan salah laku di LTH.", ms: 196, kepada: "PDRM/AGC/SPRM", berat: 4 },
    { no: "4.4.12", kategori: "Akauntabiliti", tajuk: "Percepat proses tatatertib", teks: "Proses penyempurnaan tindakan tatatertib termasuk durasi penahanan kerja perlu diperkemas dan disegerakan.", ms: 196, kepada: "LTH", berat: 3 },
    { no: "4.4.13", kategori: "Akauntabiliti", tajuk: "Pantau kes mahkamah & timbang tara", teks: "Transaksi yang masih dipertikaikan perlu dipantau rapat; penyelesaian di luar mahkamah harus dipertingkatkan.", ms: 196, kepada: "LTH", berat: 3 },
    { no: "4.4.14", kategori: "Syariah", tajuk: "Rujuk isu zakat kepada Muzakarah MKI", teks: "Memandangkan telah berlaku perubahan akad simpanan, LTH perlu kemukakan kepada Jawatankuasa Muzakarah MKI untuk pandangan hukum.", ms: 196, kepada: "LTH", berat: 3 },
    { no: "4.4.15", kategori: "UJSB/Sukuk", tajuk: "Perhatian serius kepada Pelan Pemulihan 2018", teks: "Instrumen Sukuk boleh ditambah baik jika mempunyai jaminan Kerajaan. Jika LTH gagal, jaminan seksyen 24 bernilai RM88 bilion terpaksa diaktifkan.", ms: 197, kepada: "Kerajaan", berat: 5 },
    { no: "4.4.16", kategori: "UJSB/Sukuk", tajuk: "Sukuk baharu mesti boleh diniagakan", teks: "Ciri tradeable memberi fleksibiliti kepada LTH mengurus aset dan mengoptimumkan pendapatan.", ms: 197, kepada: "Kerajaan/UJSB", berat: 3 },
    { no: "4.4.17", kategori: "UJSB/Sukuk", tajuk: "Tawar Sukuk kepada institusi kewangan lain", teks: "Bukan hanya kepada LTH atau Kerajaan — mengurangkan risiko pegangan tertumpu.", ms: 197, kepada: "Kerajaan/UJSB", berat: 3 },
    { no: "4.4.18", kategori: "UJSB/Sukuk", tajuk: "Pastikan peruntukan RM1.73 bilion setahun", teks: "Seperti dipersetujui Jemaah Menteri bagi tujuan penebusan awal Sukuk UJSB.", ms: 197, kepada: "Kerajaan", berat: 5 },
    { no: "4.4.19", kategori: "UJSB/Sukuk", tajuk: "Penebusan awal daripada hasil pelupusan aset", teks: "UJSB digalakkan membuat penebusan awal Sukuk hasil pelupusan aset yang dipindahkan.", ms: 197, kepada: "UJSB", berat: 3 },
    { no: "4.4.20", kategori: "Haji & deposit", tajuk: "Ubah dasar deposit, bayaran haji dan HAFIS", teks: "Deposit minimum untuk giliran haji dinaikkan daripada RM1,300 kepada RM12,980; pengeluaran besar dihadkan dengan notis sebulan; bantuan haji hanya kepada yang memerlukan.", ms: 197, kepada: "LTH", berat: 5 },
    { no: "4.4.21", kategori: "Haji & deposit", tajuk: "Bawa lebih ramai jemaah haji", teks: "Guna sepenuhnya kuota tambahan yang ditawarkan Kerajaan Arab Saudi (kuota dijangka naik ke 60,000 menjelang 2030).", ms: 198, kepada: "LTH", berat: 3 },
    { no: "4.4.22", kategori: "Haji & deposit", tajuk: "Naikkan minimum pendaftaran haji ke RM12,980", teks: "Akan menambah deposit LTH dan mengurangkan tempoh menunggu daripada 130 tahun kepada 33 tahun.", ms: 198, kepada: "LTH", berat: 4 },
    { no: "4.4.23", kategori: "Pelaburan", tajuk: "Wujudkan jabatan Dana Haji", teks: "Fungsi pelaburan kekal dalam LTH sebagai jabatan bernama Dana Haji, dikawal selia oleh Suruhanjaya Sekuriti Malaysia. Kedua-dua fungsi (dana & haji) kekal dalam entiti yang sama kerana wujud subsidi silang.", ms: 198, kepada: "LTH/Kerajaan", berat: 5 },
    { no: "4.4.24", kategori: "Pelaburan", tajuk: "Fokus portfolio, elak pelaburan strategik berisiko", teks: "LTH tidak seharusnya terlibat dengan pelaburan berisiko tinggi khususnya yang diklasifikasikan sebagai 'strategik'.", ms: 198, kepada: "LTH", berat: 4 },
    { no: "4.4.25", kategori: "Tadbir urus", tajuk: "Perkukuh model perniagaan tanpa campur tangan politik", teks: "Kerajaan hendaklah mengambil langkah penambahbaikan menyeluruh termasuk memperkasa tadbir urus melalui pengurusan profesional.", ms: 199, kepada: "Kerajaan", berat: 5 }
  ];

  /* ------------------------------------------------------------------
     14. PUNCA KRISIS — rangkaian sebab-akibat (untuk peta isu)
     ------------------------------------------------------------------ */
  D.rantaiPunca = {
    ms: 17,
    nod: [
      { id: "visi", label: "Visi 'tonggak ekonomi ummah'", jenis: "punca", teks: "Peranan LTH diperluas melangkaui tujuan asal — melabur besar-besaran dalam hartanah dan perladangan tanpa kepakaran.", ms: 20 },
      { id: "politik", label: "Ahli politik dalam Lembaga", jenis: "punca", teks: "Pengerusi dan beberapa anggota Lembaga 2014–2018 daripada kalangan ahli politik aktif. Keputusan hibah, bayaran haji dan HAFIS didorong unsur politik.", ms: 14 },
      { id: "beku", label: "Bayaran haji dibeku sejak 2009", jenis: "punca", teks: "Kos haji naik, bayaran kekal RM9,980 selama 13 tahun. Jurang ditanggung LTH melalui HAFIS.", ms: 173 },
      { id: "hibahtinggi", label: "Hibah terlalu tinggi", jenis: "kesan", teks: "Kadar 6.25%, 5.00%, 4.25%, 4.50% dibayar 2014–2017 walaupun aset sudah kurang daripada liabiliti.", ms: 82 },
      { id: "risiko", label: "Ambil risiko pelaburan berlebihan", jenis: "kesan", teks: "Untuk kejar pulangan tinggi, portfolio berat kepada ekuiti domestik yang terdedah turun naik pasaran.", ms: 83 },
      { id: "kreatif", label: "Perakaunan kreatif (RAV)", jenis: "kesan", teks: "Nilai aset ditokok dengan anggaran pengurusan; polisi rosot nilai ditukar dua kali dalam satu tahun.", ms: 18 },
      { id: "audit", label: "Ketidaktegasan Ketua Audit Negara", jenis: "kesan", teks: "Sijil Audit Bersih diberi 2014–2017. KAN mengakui Pendapat Berteguran sepatutnya diberi bagi 2017.", ms: 19 },
      { id: "rizab", label: "Rizab menyusut", jenis: "kesan", teks: "Rizab digunakan untuk bayar hibah pada 2012, 2014 dan 2016; arah aliran menurun selepas 2016.", ms: 66 },
      { id: "krisis", label: "Krisis kewangan 2017", jenis: "akibat", teks: "Kerugian bersih sebenar RM1.4 bilion (bukan untung RM3.4 bilion). Kerugian terkumpul RM4.7 bilion. Kerugian keseluruhan meningkat kepada RM10 bilion.", ms: 111 },
      { id: "bailout", label: "Pemulihan RM19.9 bilion melalui UJSB", jenis: "akibat", teks: "Aset dipindah pada premium RM10.2 bilion ke atas nilai pasaran; Sukuk RM27.5 bilion menjadi obligasi Kerajaan.", ms: 122 },
      { id: "beban", label: "Beban berpindah kepada Kerajaan & pendeposit", jenis: "akibat", teks: "Jaminan seksyen 24 kini bernilai RM88 bilion. RM27.5 bilion Sukuk = 31% aset LTH; hasilnya 26% pendapatan tahunan tetapi bukan tunai.", ms: 133 }
    ],
    hubungan: [
      ["visi", "risiko"], ["politik", "hibahtinggi"], ["politik", "beku"],
      ["beku", "hibahtinggi"], ["hibahtinggi", "risiko"], ["hibahtinggi", "rizab"],
      ["risiko", "kreatif"], ["hibahtinggi", "kreatif"], ["kreatif", "audit"],
      ["kreatif", "krisis"], ["audit", "krisis"], ["rizab", "krisis"],
      ["krisis", "bailout"], ["bailout", "beban"]
    ]
  };

  /* ------------------------------------------------------------------
     15. AMARAN YANG DIABAIKAN
     ------------------------------------------------------------------ */
  D.amaran = {
    ms: 175,
    baris: [
      { tarikh: "21 Ogos 2014", dari: "BNM", kepada: "Pengerusi LTH", tajuk: "Deposit Taking and Management of Liquidity", tindakan: "Tidak mendapat perhatian sewajarnya" },
      { tarikh: "19 Disember 2014", dari: "BNM", kepada: "Pengerusi LTH", tajuk: "Pengambilan Deposit dan Pengurusan Kecairan", tindakan: "Tidak mendapat perhatian sewajarnya" },
      { tarikh: "23 Disember 2015", dari: "BNM", kepada: "Pengerusi LTH", tajuk: "Keperluan Merumus Dasar Rizab", tindakan: "Tidak mendapat perhatian sewajarnya" },
      { tarikh: "23 Disember 2015", dari: "BNM", kepada: "Menteri Hal Ehwal Agama", tajuk: "Pengurusan Kewangan Lembaga Tabung Haji", tindakan: "LTH lantik EY sediakan Laporan Proforma — yang kemudiannya jadi asas RAV" },
      { tarikh: "14 Disember 2016", dari: "BNM", kepada: "LTH", tajuk: "Keperluan Merumus Dasar Rizab", tindakan: "Tidak mendapat perhatian sewajarnya" },
      { tarikh: "17 Februari 2017", dari: "BNM", kepada: "LTH", tajuk: "Keperluan Merumus Dasar Rizab", tindakan: "Tidak mendapat perhatian sewajarnya" },
      { tarikh: "3 Mac 2017", dari: "Roland Berger", kepada: "Pengurusan LTH", tajuk: "5-Year Strategic Business Plan Review", tindakan: "Tiada rekod ia dibentangkan kepada Lembaga. Disiapkan SEBELUM hibah 2017 diisytiharkan." },
      { tarikh: "2 Februari 2018", dari: "Roland Berger", kepada: "Pengurusan LTH", tajuk: "Strategic Plan Review — Final Report (Revised)", tindakan: "Tidak diberi perhatian dan tidak dimanfaatkan" },
      { tarikh: "25 Oktober 2018", dari: "Ketua Audit Negara", kepada: "Pengerusi LTH", tajuk: "Ulasan JAN mengenai pandangan Lembaga terhadap Penyata Kewangan 2017", tindakan: "Selepas Sijil Audit Bersih sudah dikeluarkan" },
      { tarikh: "28 Disember 2018", dari: "BNM", kepada: "Perdana Menteri", tajuk: "Pengawalseliaan dan Cadangan Langkah Kehematan ke atas LTH", tindakan: "LTH diletak di bawah pemantauan BNM mulai 1 Jan 2019" },
      { tarikh: "26 Jun 2019", dari: "BNM", kepada: "Perdana Menteri", tajuk: "Outcome of the Supervisory Review of LTH", tindakan: "Membangkitkan isu penzahiran zakat di bawah akad Wadi'ah" },
      { tarikh: "18 April 2022", dari: "BNM", kepada: "Pengerusi Suruhanjaya", tajuk: "Recommendation on the Future Business Model for LTH", tindakan: "Suruhanjaya tidak menyokong — akan jadikan LTH 'glorified travel agent'" }
    ]
  };

  /* Roland Berger & anggaran kerugian */
  D.rolandBerger = {
    ms: 79,
    amaran: "RB memberi amaran LTH akan menghadapi masalah apabila MFRS 9 berkuat kuasa pada 2018, dengan anggaran kerugian RM2.6 bilion menjadi ancaman kepada pendapatan masa hadapan LTH.",
    rizab: "RB mendapati dalam tahun 2012, 2014 dan 2016 LTH menggunakan rizabnya untuk membayar hibah, dengan arah aliran rizab menurun selepas 2016.",
    msRizab: 66
  };

  /* Polisi rizab 2019 */
  D.polisiRizab = {
    ms: 67, k: "F",
    butir: [
      { label: "Pemindahan tahunan ke Rizab Berkanun", nilai: "0.1% (dikekalkan)" },
      { label: "Sasaran Rizab Penyamaan Keuntungan (RPK)", nilai: "5% daripada nilai aset bersih ≈ RM3.5 bilion" },
      { label: "Pemindahan tahunan ke RPK", nilai: "2% daripada keuntungan tahun semasa selepas zakat" },
      { label: "Asas pengiraan", nilai: "Rekod turun naik nilai aset bersih LTH 2010–2018" }
    ],
    isu: "Walaupun sasaran ditetapkan pada 2019, Suruhanjaya mendapati LTH tetap menggunakan rizab untuk menampung hibah dalam tahun 2020 dan 2021.",
    msIsu: 68,
    perbendaharaan: "Perbendaharaan tidak pernah meluluskan sebarang baki minima dalam Kumpulan Wang Rizab LTH — walaupun ada wakil Perbendaharaan dalam Lembaga. Tiada mekanisme untuk menilai polisi rizab LTH.",
    msPerbendaharaan: 66
  };

  /* Akad & zakat */
  D.akad = {
    ms: 68,
    fasa: [
      { tempoh: "1979–2016", akad: "Mudarabah", teks: "Konsep perkongsian untung. LTH bayar zakat bagi pihak pendeposit berdasarkan keputusan Jawatankuasa Fatwa Majlis Kebangsaan pada 1979.", isu: "Tiada dokumen akad; rukun penting Mudarabah iaitu nisbah pembahagian keuntungan (profit sharing ratio) tidak ditemui dalam mana-mana dokumen.", ms: 68 },
      { tempoh: "2016–Dis 2019", akad: "Wadi'ah Yad Dhamanah", teks: "Deposit dikira sebagai simpanan; LTH bayar hibah untuk elak riba.", isu: "Tiada penjelasan mengapa akad ditukar dan tiada dokumen kajian. Di bawah akad ini LTH jadi peminjam — sedangkan Akta 535 tidak benarkan LTH meminjam. Pendeposit sepatutnya bayar zakat simpanan sendiri (2.5%), lebih tinggi daripada zakat perniagaan.", ms: 70 },
      { tempoh: "Dis 2019–kini", akad: "Wakalah", teks: "LTH jadi ejen pendeposit untuk urus dana bagi tujuan pelaburan, subsidi, kos pengurusan dan zakat perniagaan.", isu: "Pembetulan ini menyelesaikan isu tanggungan zakat pendeposit dan pemberian subsidi — struktur Wakalah mengembalikan hubungan seperti dalam Akta 535.", ms: 71 }
    ]
  };

  /* ------------------------------------------------------------------
     16. JAWATANKUASA — pembubaran & cadangan pengkanunan
     ------------------------------------------------------------------ */
  D.jawatankuasa = {
    ms: 25,
    sedia: ["Jawatankuasa Audit", "Jawatankuasa Risiko", "Lembaga Tender", "Jawatankuasa Urusan Haji", "Jawatankuasa Penasihat Syariah", "Jawatankuasa Penamaan", "Jawatankuasa Perkhidmatan", "Panel Pelaburan", "Majlis Penasihat Haji", "Jawatankuasa Penasihat Ibadah", "Jawatankuasa Tatatertib", "Jawatankuasa Rayuan Tatatertib"],
    dimansuh: [
      { nama: "Panel Pelaburan", tahun: 2018, kesan: "Diganti Exco Perniagaan yang dipengerusikan Menteri Hal Ehwal Ekonomi — saksi akui ia tidak pernah berfungsi. Panel Pelaburan kini telah diwujudkan semula.", ms: 54 },
      { nama: "Majlis Penasihat Haji", tahun: 2018, kesan: "Diganti Jawatankuasa Urusan Haji. Majlis ini wujud sejak 1969 di bawah Akta 8.", ms: 60 }
    ],
    dicadangDikanun: ["Panel Pelaburan", "Jawatankuasa Penasihat Syariah", "Jawatankuasa Urusan Haji"],
    panelCadangan: {
      ms: 55,
      komposisi: ["Seorang Pengerusi dilantik oleh Menteri Kewangan", "Seorang Timbalan Pengerusi daripada wakil Perbendaharaan", "Ketua Pegawai Eksekutif sebagai ahli ex-officio", "Empat orang anggota lain dilantik oleh Menteri Kewangan"]
    }
  };

  /* Model perniagaan yang dicadang & ditolak */
  D.modelDicadang = {
    ms: 176,
    cadangan: [
      { sumber: "BNM (2018)", tajuk: "Model 1 — Deposit haji + akaun pelaburan berasingan", pandangan: "Meluaskan skop LTH; wujud perbezaan pulangan; risiko pengeluaran tinggi kerana akaun pelaburan baharu tidak dijamin Kerajaan.", diterima: false, ms: 177 },
      { sumber: "BNM (2018)", tajuk: "Model 2 — Deposit haji sahaja; subsidi ditanggung Kerajaan", pandangan: "Pendeposit besar terpaksa keluarkan deposit; tumpuan risiko meningkat. Dianggarkan 75% deposit dimiliki hanya 5% pendeposit.", diterima: false, ms: 178 },
      { sumber: "BNM (2018)", tajuk: "Model 3 — LTH urus operasi haji sahaja; deposit & pelaburan oleh Bank Islam", pandangan: "Menjadikan LTH 'syarikat pelancongan berskala besar'. Risiko haji ditanggung sepenuhnya Kerajaan yang sudah menanggung Sukuk RM27 bilion.", diterima: false, ms: 178 },
      { sumber: "BNM (18 April 2022)", tajuk: "Model 4 — Pelaburan LTH oleh entiti berasingan dikawal selia BNM/SC", pandangan: "Suruhanjaya: hanya akan jadikan LTH 'glorified travel agent'; LTH hilang keupayaan subsidi silang.", diterima: false, ms: 179 },
      { sumber: "EY + ZICO (2021)", tajuk: "Pecah LTH kepada tiga entiti: Pengurus Dana, Dana Hak Milik, Akaun Dana Pendeposit", pandangan: "Suruhanjaya: berisiko percanggahan kepentingan, tambah kos, ketirisan cukai, dan mengundang lebih banyak campur tangan politik kerana tiga Lembaga Pengarah diperlukan.", diterima: false, ms: 181 },
      { sumber: "Suruhanjaya", tajuk: "Kekalkan struktur LTH; wujudkan jabatan Dana Haji dikawal selia SC", pandangan: "DITERIMA — kedua-dua fungsi kekal dalam entiti sama kerana wujud subsidi silang. Dana Haji ditadbir lembaga berbeza yang dilantik Menteri Kewangan; ahli politik aktif tidak dibenarkan.", diterima: true, ms: 184 }
    ]
  };

  /* ------------------------------------------------------------------
     17. SUMBER / EKSHIBIT
     ------------------------------------------------------------------ */
  D.ekshibit = [
    { jilid: "Jilid 1–3", isi: "Akuan Berkanun Saksi bagi mereka yang TIDAK dipanggil memberi keterangan" },
    { jilid: "Jilid 4–7", isi: "Akuan Berkanun Saksi berserta Nota Keterangan bagi 16 saksi yang dipanggil" },
    { jilid: "Jilid 8–10", isi: "Laporan Ernst & Young — Penilaian Anak Syarikat (28 Okt 2018) dan laporan audit anak syarikat" },
    { jilid: "Jilid 11", isi: "Laporan PwC (Financial Position Review 2017 & Jun 2018), Laporan Roland Berger (2017 & 2018), Laporan Jabatan Audit Negara" },
    { jilid: "Jilid 12", isi: "Surat agensi (KAN, BNM, MOF), perjanjian pemindahan aset, Perjanjian Sukuk RM27.56 bilion, ROFR, Proforma EY, Penyata Kewangan Beraudit 2017" }
  ];

  window.RCI = D;
})();
