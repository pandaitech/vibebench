/*
 * Data ekstrak daripada Laporan Suruhanjaya Siasatan Diraja (RCI) Tabung Haji, 2022.
 * Sumber: https://github.com/SyahmiRafsan/rci-tabunghaji (OCR laporan rasmi).
 *
 * Setiap rekod dilabel `kind`:
 *   "fakta"    — angka/kenyataan yang tertulis terus dalam laporan
 *   "terbitan" — dikira daripada dua atau lebih angka fakta dalam laporan (cth. peratus, beza)
 *   "anggaran" — unjuran/simulasi masa depan yang dinyatakan sendiri oleh laporan sebagai unjuran
 * Rujukan m/s merujuk kepada label "pdf-page-N" dalam OCR sumber (m/s fizikal PDF, bukan m/s bercetak).
 */
window.RCI_DATA = {

  meta: {
    title: "Laporan Suruhanjaya Siasatan Diraja Tabung Haji",
    signed: "19 Julai 2022",
    chairman: "Tun Md Raus bin Sharif",
    presentedToAgong: "30 Ogos 2022",
    sourceUrl: "https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md",
  },

  // ---------------------------------------------------------------------
  // KRONOLOGI — peristiwa penting, dilabel kategori untuk penapisan (filter)
  // kategori: "akta" (undang-undang/struktur), "kepimpinan" (lantikan/pemecatan),
  //           "kewangan" (hibah/audit/impairment), "ujsb" (penyelamatan/UJSB),
  //           "pelaburan" (pelaburan bermasalah), "siasatan" (RCI/laporan polis)
  // ---------------------------------------------------------------------
  timeline: [
    { date: "1951", cat: "akta", title: "Ordinan Haji 1951", detail: "Ordinan Orang-Orang Islam Menunaikan Haji berkuat kuasa; Pejabat Urusan Haji ditubuhkan di Pulau Pinang.", page: 14, kind: "fakta" },
    { date: "1962", cat: "akta", title: "PWSBH ditubuhkan", detail: "Perbadanan Wang Simpanan Bakal-Bakal Haji Tanah Melayu ditubuhkan menerusi Akta Parlimen 34/62 — cikal bakal Tabung Haji.", page: 53, kind: "fakta" },
    { date: "1969-08-08", cat: "akta", title: "LUTH ditubuhkan", detail: "Akta Lembaga Urusan dan Tabung Haji 1969 berkuat kuasa, menggantikan PWSBH.", page: 54, kind: "fakta" },
    { date: "1995-06-01", cat: "akta", title: "LTH menggantikan LUTH", detail: "Akta Tabung Haji 1995 (Akta 535) berkuat kuasa; Lembaga Tabung Haji (LTH) ditubuhkan.", page: 15, kind: "fakta" },
    { date: "2001", cat: "kewangan", title: "HAFIS bermula", detail: "Skim subsidi kos haji (Hajj Financial Support) mula diperkenalkan — sebelum ini prinsip istito'ah (mampu bayar) diamalkan tanpa subsidi.", page: 23, kind: "fakta" },
    { date: "2009", cat: "kewangan", title: "Bayaran haji dibekukan", detail: "Kerajaan bekukan kenaikan bayaran haji Muassasah pada RM9,980 — subsidi HAFIS mula membesar kerana kos sebenar terus naik.", page: 210, kind: "fakta" },
    { date: "2013", cat: "pelaburan", title: "LTH masuk Al-Fareeda Residential Fund", detail: "Pelaburan SR76 juta (≈RM63 juta) dalam dana hartanah Arab Saudi — akhirnya hilang sepenuhnya.", page: 175, kind: "fakta" },
    { date: "2014-12-19", cat: "kewangan", title: "Amaran pertama BNM", detail: "Surat pertama BNM kepada Pengerusi LTH mengenai pengambilan deposit dan pengurusan kecairan — tidak diambil tindakan serius.", page: 212, kind: "fakta" },
    { date: "2014", cat: "kewangan", title: "Hibah tahunan 6.25% + hibah haji 2.00%", detail: "Kadar hibah tertinggi dalam tempoh disiasat; mula melebihi keupayaan sebenar LTH.", page: 172, kind: "fakta" },
    { date: "2015-12-23", cat: "kewangan", title: "Amaran kedua BNM", detail: "BNM tulis semula kepada Pengerusi LTH dan turut menyurat terus kepada Menteri Hal Ehwal Agama.", page: 212, kind: "fakta" },
    { date: "2016", cat: "kewangan", title: "Akad deposit ditukar", detail: "Kontrak deposit ditukar daripada Mudarabah kepada Wadi'ah Yad Dhamanah.", page: 122, kind: "fakta" },
    { date: "2016-06-30", cat: "kewangan", title: "EY perkenal rangka kerja RAV", detail: "Ernst & Young mengeluarkan 'Reserving Options and Realisable Asset Value (RAV) Reporting Framework' — asas kaedah yang kemudian disalahguna untuk mengesahkan hibah.", page: 113, kind: "fakta" },
    { date: "2017", cat: "kewangan", title: "Laporan Roland Berger disorok", detail: "Firma perunding memberi amaran model perniagaan tidak sesuai dan subsidi haji terlalu tinggi — laporan siap sebelum hibah 2017 diisytiharkan tetapi tidak pernah dibentang kepada Lembaga Pengarah.", page: 214, kind: "fakta" },
    { date: "2017", cat: "kewangan", title: "Ambang penjejasan ditukar dua kali", detail: "Dasar penjejasan nilai (impairment) FY2017 ditukar dua kali dalam tahun yang sama: 70% → 85% → 90%, mengurangkan jumlah kerugian yang perlu diiktiraf.", page: 115, kind: "fakta" },
    { date: "2018-02-07", cat: "kewangan", title: "Kaedah pengiraan hibah ditukar", detail: "LTH tukar kaedah daripada purata baki bulanan kepada purata baki tahunan — membenarkan hibah lebih tinggi dibayar walaupun keupayaan sebenar lebih rendah.", page: 172, kind: "fakta" },
    { date: "2018-07-16", cat: "kewangan", title: "KAN keluar 'Emphasis of Matter'", detail: "Ketua Audit Negara mengesahkan penyata kewangan 2017 tetapi dengan 'Pendapat Tanpa Teguran dengan Penekanan Perkara' — mengesan dasar penjejasan tidak konsisten dan RM227.81 juta penjejasan tidak direkodkan.", page: 18, kind: "fakta" },
    { date: "2018-12-07", cat: "ujsb", title: "Kabinet luluskan Pelan Pemulihan LTH", detail: "Jemaah Menteri meluluskan rangka Pelan Pemulihan dan Penstrukturan LTH; turut putuskan BNM memantau LTH secara pentadbiran mulai 1 Januari 2019.", page: 24, kind: "fakta" },
    { date: "2018-12-14", cat: "ujsb", title: "UJSB ditubuhkan", detail: "Urusharta Jamaah Sdn Bhd ditubuhkan sebagai SPV milik penuh Menteri Kewangan Diperbadankan, berkonsepkan Danaharta (krisis kewangan 1998), untuk menyerap aset LTH yang bermasalah.", page: 24, kind: "fakta" },
    { date: "2018-12-27", cat: "ujsb", title: "Perjanjian Pemindahan Aset ditandatangani", detail: "106 saham tersenarai, satu syarikat perladangan dan 29 aset hartanah dipindah kepada UJSB pada nilai RM19.9 bilion — nilai pasaran sebenar hanya RM9.7 bilion.", page: 25, kind: "fakta" },
    { date: "2019-04-05", cat: "ujsb", title: "Kabinet luluskan RM17.8 bilion", detail: "Peruntukan sekurang-kurangnya RM17.8 bilion diluluskan untuk membiayai jurang penebusan Sukuk UJSB (RM500 juta di bawah RMK-11, ~RM17.3 bilion di bawah RMK-12/13).", page: 26, kind: "fakta" },
    { date: "2019-05-15", cat: "ujsb", title: "Perjanjian Sukuk UJSB ditandatangani", detail: "Perjanjian Langganan Sukuk dan Perjanjian Hak Keutamaan Pertama (ROFR) antara LTH dan UJSB.", page: 25, kind: "fakta" },
    { date: "2019-05-27", cat: "ujsb", title: "Surat Sokongan Kewangan MOF", detail: "Menteri Kewangan keluarkan 'Letter of Comfort' untuk Sukuk UJSB — bukan jaminan kerajaan penuh, sekadar 'keselesaan'.", page: 165, kind: "fakta" },
    { date: "2019", cat: "kewangan", title: "Hibah jatuh ke 1.25% — deposit lari", detail: "Selepas kadar hibah direalistikkan kepada 1.25%, deposit LTH menyusut daripada ~RM73 bilion kepada RM69 bilion — tanda awal 'bank run' oleh pendeposit besar.", page: 20, kind: "fakta" },
    { date: "2019-11", cat: "siasatan", title: "4 laporan polis difailkan", detail: "Membabitkan penjualan THIP, salah guna dana Yayasan Tabung Haji, manipulasi kesesuaian tanah Trurich, dan pengisytiharan hibah 2017.", page: 194, kind: "fakta" },
    { date: "2020-11-30", cat: "ujsb", title: "Penebusan awal Sukuk RM200 juta", detail: "UJSB tebus awal RM200 juta Sukuk kepada LTH menggunakan geran kerajaan RM500 juta yang diterima tahun itu.", page: 26, kind: "fakta" },
    { date: "2021-05-05", cat: "kepimpinan", title: "CEO Nik Mohd Hasyudeen dipecat", detail: "Dipecat sebelum tamat kontrak (31 Ogos 2021) menerusi kuasa mutlak s.6(5) Akta 535 — Suruhanjaya dapati beliau sedang melaksanakan penambahbaikan ketika itu.", page: 17, kind: "fakta" },
    { date: "2021-10-15", cat: "kepimpinan", title: "Pengerusi Md Nor Md Yusof dipecat", detail: "Turut dipecat sebelum tamat kontrak lanjutan (2 tahun dari 20 Julai 2020) — Suruhanjaya dapati tiada sebab munasabah diberikan.", page: 17, kind: "fakta" },
    { date: "2021-06-26", cat: "kewangan", title: "BNM bimbang isu zakat", detail: "BNM menyurat kepada PM mengenai potensi salah faham pendeposit tentang zakat di bawah akad Wadi'ah Yad Dhamanah.", page: 155, kind: "fakta" },
    { date: "2022-01-20", cat: "siasatan", title: "6 Pesuruhjaya dilantik Agong", detail: "Suruhanjaya Siasatan Diraja dilantik untuk tempoh 6 bulan (20 Jan – 19 Julai 2022), diketuai Tun Md Raus Sharif.", page: 13, kind: "fakta" },
    { date: "2022-05-21", cat: "kewangan", title: "Liabiliti pendeposit lebih RM88 bilion", detail: "Jumlah tanggungan LTH kepada pendeposit disahkan melebihi RM88 bilion — turut menyamai jumlah jaminan kerajaan di bawah s.24 Akta 535.", page: 167, kind: "fakta" },
    { date: "2022", cat: "kewangan", title: "Bayaran haji dinaikkan buat kali pertama sejak 2009", detail: "Bayaran Muassasah dinaikkan kepada RM10,980 (B40) / RM12,980 (bukan-B40) — kos sebenar sudah RM25,540.", page: 210, kind: "fakta" },
    { date: "2022-07-19", cat: "siasatan", title: "Laporan Suruhanjaya ditandatangani", detail: "Laporan akhir 6 bab ditandatangani Tun Md Raus Sharif dan 5 Pesuruhjaya lain.", page: 1, kind: "fakta" },
    { date: "2022-08-30", cat: "siasatan", title: "Laporan dipersembahkan kepada Agong", detail: "Laporan lengkap diserahkan kepada Seri Paduka Baginda Yang di-Pertuan Agong.", page: 1, kind: "fakta" },
  ],

  // ---------------------------------------------------------------------
  // KEDUDUKAN KEWANGAN — jadual aset/liabiliti sebelum agihan hibah (RM juta)
  // Sumber: Kajian Kewangan PwC, disahkan Suruhanjaya (para 3.9.2 / 3.13.7)
  // ---------------------------------------------------------------------
  balanceSheet: {
    unit: "RM juta",
    page: 145,
    kind: "fakta",
    rows: [
      { year: 2013, assets: 48778, liabilities: 43696, surplusPre: 5082, distribution: 2632, surplusPost: 2450 },
      { year: 2014, assets: 54751, liabilities: 51866, surplusPre: 2885, distribution: 3237, surplusPost: -352 },
      { year: 2015, assets: 60196, liabilities: 60062, surplusPre: 134, distribution: 3220, surplusPost: -3086 },
      { year: 2016, assets: 64321, liabilities: 65581, surplusPre: -1260, distribution: 2871, surplusPost: -4131 },
      { year: 2017, assets: 70317, liabilities: 71086, surplusPre: -769, distribution: 3324, surplusPost: -4093 },
    ],
  },

  // Pelarasan untung/rugi 2017 mengikut PwC vs seperti dilaporkan
  restatement2017: {
    kind: "fakta",
    page: 19,
    reported: { label: "Untung seperti dilaporkan (2017)", value: 3400 },
    restated: { label: "Rugi bersih jika MFRS dipatuhi penuh (2017)", value: -1400 },
    unrecordedImpairment: 227.81,
    unit: "RM juta",
  },

  // ---------------------------------------------------------------------
  // HIBAH — kadar & jumlah bayaran setahun
  // ---------------------------------------------------------------------
  hibah: {
    kind: "fakta",
    page: 172,
    unit: "RM juta",
    rows: [
      { year: 2014, annualRate: 6.25, hajjRate: 2.00, annualAmount: 2988.053, hajjAmount: 249.143, total: 3237.196 },
      { year: 2015, annualRate: 5.00, hajjRate: 3.00, annualAmount: 2807.369, hajjAmount: 413.005, total: 3220.374 },
      { year: 2016, annualRate: 4.25, hajjRate: 1.50, annualAmount: 2645.625, hajjAmount: 225.197, total: 2870.822 },
      { year: 2017, annualRate: 4.50, hajjRate: 1.75, annualAmount: 3042.184, hajjAmount: 281.557, total: 3323.741 },
      { year: 2018, annualRate: 1.25, hajjRate: 0, annualAmount: 922.959, hajjAmount: 0, total: 922.959 },
      { year: 2019, annualRate: 3.05, hajjRate: 0, annualAmount: 2140.538, hajjAmount: 0, total: 2140.538 },
      { year: 2020, annualRate: 3.10, hajjRate: 0, annualAmount: 2242.141, hajjAmount: 0, total: 2242.141 },
      { year: 2021, annualRate: 3.10, hajjRate: 0, annualAmount: null, hajjAmount: 0, total: null },
    ],
    depositShock: {
      kind: "fakta", page: 20,
      before: { label: "Deposit sebelum pengumuman hibah 1.25% (2018)", value: 73000 },
      after: { label: "Deposit akhir 2019 selepas pengumuman", value: 69000 },
      recovered2020: { label: "Deposit akhir 2020", value: 76000 },
      current: { label: "Deposit semasa (2022)", value: 88000 },
      unit: "RM juta",
    },
  },

  // ---------------------------------------------------------------------
  // PEMINDAHAN ASET KE UJSB
  // ---------------------------------------------------------------------
  ujsbTransfer: {
    kind: "fakta",
    page: 160,
    unit: "RM juta",
    categories: [
      { name: "Hartanah & tanah", bookValue: 1411, transferValue: 2247, marketValue: 1411 },
      { name: "Syarikat perladangan", bookValue: 718, transferValue: 802, marketValue: 718 },
      { name: "Ekuiti tersenarai (Bursa)", bookValue: 16852, transferValue: 16851, marketValue: 7600 },
    ],
    total: { bookValue: 18981, transferValue: 19900, marketValue: 9729 },
    premium: { kind: "terbitan", value: 10171, note: "Beza nilai pindahan (RM19,900 juta) dengan nilai pasaran (RM9,729 juta)." },
    sukuk: {
      kind: "fakta", page: 165,
      series1: { label: "Sukuk Siri 1", nominal: 13200, tenor: "7 tahun", maturity: 2026, yield: 4.05 },
      series2: { label: "Sukuk Siri 2", nominal: 14300, tenor: "10 tahun", maturity: 2029, yield: 4.10 },
      totalObligation: 27500,
      shareOfAnnualIncome: 26,
      shareOfProfitDistribution: 34,
      note: "Sukuk tidak bertaraf, tidak boleh niaga, tidak boleh pindah milik, dan HANYA disokong 'Surat Sokongan Kewangan' MOF — bukan jaminan kerajaan penuh.",
    },
    propertyRevaluation: {
      kind: "fakta", page: 161,
      transferValue: 2246.68, marketValueDec2021: 1202.68, date: "31 Disember 2021",
    },
    cashReceived: { kind: "fakta", page: 26, value: 500, note: "Jumlah tunai sebenar diterima LTH daripada UJSB setakat laporan — berbanding nilai pasaran aset yang dipindah RM9.7 bilion." },
  },

  // Saham blue-chip yang dipindah ke UJSB sebelum 31 Dis 2018 (rugi belum terealisasi)
  blueChipShares: {
    kind: "fakta",
    page: 190,
    unit: "RM",
    rows: [
      { ticker: "Axiata", transferPrice: 6.00, priceDec2018: 3.63, price2022: 3.04, totalTransferValue: 1422605154, totalMarketValueDec2018: 931803255 },
      { ticker: "Maxis", transferPrice: 6.84, priceDec2018: 5.43, price2022: 3.52, totalTransferValue: 879395994, totalMarketValueDec2018: 681197584 },
      { ticker: "MISC", transferPrice: 7.43, priceDec2018: 6.15, price2022: 7.30, totalTransferValue: 486532216, totalMarketValueDec2018: 438925710 },
      { ticker: "Digi", transferPrice: 5.13, priceDec2018: 4.24, price2022: 3.27, totalTransferValue: 576240738, totalMarketValueDec2018: 500328955 },
      { ticker: "TM", transferPrice: 5.96, priceDec2018: 2.33, price2022: 5.20, totalTransferValue: 241202959, totalMarketValueDec2018: 107650200 },
    ],
    totalLossDec2018: 946071357,
  },

  // ---------------------------------------------------------------------
  // PELABURAN BERMASALAH — untuk jadual boleh-tapis
  // ---------------------------------------------------------------------
  investments: {
    kind: "fakta",
    page: 176,
    unit: "RM juta (melainkan dinyatakan SR/USD)",
    rows: [
      {
        name: "PT TH Indo Plantations (THIP)", sector: "Perladangan (Indonesia)", status: "Dijual rugi",
        detail: "95% ekuiti dijual kepada PT Borneo Pacific ~USD910 juta (dikurangkan USD100 juta drpd harga asal); LTH mendahulukan USD178.6 juta yang tidak dibayar pembeli. Tanah 83,000 hektar, Riau.",
        loss: null, lossLabel: "USD178.6 juta belum dibayar pembeli", page: 188,
      },
      {
        name: "Emrail Sdn Bhd", sector: "Infrastruktur (kereta api)", status: "Rugi & tindakan mahkamah",
        detail: "15.3% ekuiti dibeli RM20.17 juta (2016) drpd LHSB. Notis Put Option RM20.3 juta hanya RM2 juta dibayar. Penjejasan RM19.3 juta (2020). Kes ditimbang-tara di AIAC 2022.",
        loss: 19.3, lossLabel: "RM19.3 juta dijejaskan", page: 176,
      },
      {
        name: "Wellspring Worldwide", sector: "Pelaburan ekuiti", status: "Kebankrapan promoter",
        detail: "10% ekuiti dibeli RM18.4 juta (2014). Put Option RM19.03 juta gagal dibayar; Mahkamah Tinggi arah bayar RM20.8 juta (2018) — masih tidak dibayar; permohonan kebankrapan diluluskan 2022.",
        loss: 19.03, lossLabel: "RM19.03 juta dijejaskan", page: 176,
      },
      {
        name: "Deru Semangat Sdn Bhd (DSSB)", sector: "Perladangan (usaha sama diraja Pahang)", status: "Penyelesaian rugi",
        detail: "Pelaburan diluluskan RM526.16 juta (ekuiti RM231 juta + pembiayaan RM295.16 juta); hanya RM257 juta dikeluarkan; nilai dijejas ke RM32 juta; baki komitmen RM258 juta diketepikan pihak diraja; bayaran penyelesaian RM259 juta.",
        loss: 267, lossLabel: "≈RM267 juta (RM526m diluluskan − RM259m diselesaikan)", page: 176,
      },
      {
        name: "Trurich Resources", sector: "Perladangan (Kalimantan)", status: "Dijejas sepenuhnya",
        detail: "Usaha sama dengan Felda Global Ventures Kalimantan. Pelaburan LTH RM364.31 juta dijejas SEPENUHNYA. Liabiliti semasa bersih RM119.67 juta (2017). Skandal manipulasi kesesuaian tanah (2008-09) bernilai ~USD58 juta, 40,880 hektar.",
        loss: 364.31, lossLabel: "RM364.31 juta dijejas 100%", page: 176,
      },
      {
        name: "Abraj Sdn Bhd", sector: "Hartanah (usaha sama Amanah Raya)", status: "Pegangan dijual",
        detail: "Jumlah ekuiti RM85 juta; penjejasan RM40.25 juta; 50% pegangan LTH dijual kepada Amanah Raya Berhad, Disember 2020.",
        loss: 40.25, lossLabel: "RM40.25 juta dijejas", page: 176,
      },
      {
        name: "Putrajaya Perdana Berhad (PPB)", sector: "Pembinaan", status: "Jauh bawah sasaran",
        detail: "30% ekuiti dibeli RM193.50 juta; sasaran untung FY2015 terlepas sebanyak RM86 juta; Put Option RM210.7 juta dikeluarkan; penjejasan RM145.3 juta (2020); nilai buku bersih tinggal RM48.2 juta.",
        loss: 145.3, lossLabel: "RM145.3 juta dijejas", page: 176,
      },
      {
        name: "Al-Rawda (4 hotel Makkah/Madinah)", sector: "Hospitaliti (Arab Saudi)", status: "Tunggakan sewa besar",
        detail: "Perjanjian pajakan SR1,426 juta; tunggakan sewa SR560.7 juta (2021); pemilik (Dr. Mashhoor) tawar penyelesaian SR968.0 juta — ditolak LTH; Estimated Credit Loss RM202.8 juta (2020) + RM184 juta tambahan dijangka (2021).",
        loss: 202.8, lossLabel: "RM202.8 juta ECL + tunggakan SR560.7 juta", page: 176,
      },
      {
        name: "Al-Fareeda Residential Fund", sector: "Dana hartanah (Arab Saudi)", status: "Hilang sepenuhnya",
        detail: "Langganan SR76 juta (≈RM63 juta), 13.8% drpd dana SR550 juta — seluruh pelaburan dihapus kira, tiada pemulihan.",
        loss: 63, lossLabel: "RM63 juta hilang sepenuhnya", page: 176,
      },
      {
        name: "TH Plantations Berhad (THP)", sector: "Perladangan (tersenarai)", status: "Produktiviti rendah",
        detail: "Sukuk pembiayaan RM1.2 bilion untuk beli ladang baharu; hanya 58% ladang produktif; penjejasan di peringkat LTH RM170 juta.",
        loss: 170, lossLabel: "RM170 juta dijejas (peringkat LTH)", page: 176,
      },
      {
        name: "TH Properties Sdn Bhd", sector: "Hartanah & pembinaan", status: "Bonus tanpa mandat",
        detail: "Laporan forensik PwC (2019) dapati Lembaga & pengurusan kanan 'gagal memenuhi tanggungjawab fidusiari'; bonus istimewa RM2.2 juta dibayar 2017-2018 tanpa kelulusan pemegang saham yang sah.",
        loss: 2.2, lossLabel: "RM2.2 juta bonus tanpa mandat (dituntut semula)", page: 189,
      },
      {
        name: "Alam Maritim / TH Marine", sector: "Perkapalan (marin)", status: "Ekuiti dijejas penuh",
        detail: "51% ekuiti usaha sama (2015); jumlah pelaburan kumpulan RM334 juta (ekuiti RM198 juta + pembiayaan RM136 juta); ekuiti RM198 juta dijejas sepenuhnya; RM80 juta drpd RM136 juta pembiayaan turut dijejas.",
        loss: 278, lossLabel: "RM278 juta dijejas (ekuiti + sebahagian pembiayaan)", page: 176,
      },
      {
        name: "TH Hotel & Residences (THHR)", sector: "Hospitaliti", status: "Hasil sewa jatuh 62%",
        detail: "Dipindah ke UJSB pada premium ~55% atas nilai buku (RM804.1 juta); hasil sewa FY2020 jatuh 62% (RM16.5 juta → RM6.2 juta) akibat COVID-19; rugi bersih selepas cukai RM5.9 juta.",
        loss: 5.9, lossLabel: "RM5.9 juta rugi bersih (FY2020)", page: 176,
      },
      {
        name: "FGV Berhad", sector: "Perladangan (tersenarai, Bursa)", status: "Dipegang semasa harga jatuh",
        detail: "Pelaburan asal RM1.31 bilion (kos purata RM4.62-5.01/unit); harga jatuh ke RM0.885/unit (2018) — rugi belum terealisasi RM1.06 bilion. Suruhanjaya persoal kenapa LTH terus memegang walaupun harga jatuh teruk. UJSB mengambil alih pada kos (mengelak kerugian direalisasikan).",
        loss: 1058.9, lossLabel: "RM1,058.9 juta rugi belum terealisasi (sebelum diambil alih UJSB)", page: 192,
      },
    ],
  },

  // ---------------------------------------------------------------------
  // BEBAN SUBSIDI HAJI (HAFIS) — sejarah + unjuran
  // ---------------------------------------------------------------------
  hafis: {
    unit: "RM",
    history: {
      kind: "fakta", page: 210,
      rows: [
        { year: 2014, actualCost: 16155, feeCharged: 9980, subsidyPct: 38 },
        { year: 2015, actualCost: 17270, feeCharged: 9980, subsidyPct: 42 },
        { year: 2016, actualCost: 18890, feeCharged: 9980, subsidyPct: 47 },
        { year: 2017, actualCost: 19550, feeCharged: 9980, subsidyPct: 49 },
        { year: 2018, actualCost: 22450, feeCharged: 9980, subsidyPct: 56 },
        { year: 2019, actualCost: 22900, feeCharged: 9980, subsidyPct: 56 },
        { year: 2022, actualCost: 25540, feeCharged: 12980, subsidyPct: 49 },
      ],
    },
    projection: {
      kind: "anggaran",
      page: 211,
      note: "Unjuran rasmi Suruhanjaya — ANDAIAN kos naik & bayaran kekal RM12,980; BUKAN jaminan ia akan berlaku sebegini.",
      rows: [
        { year: 2022, actualCost: 25540, feeCharged: 12980, subsidyRM: 376800, subsidyPct: 49.2 },
        { year: 2023, actualCost: 26280, feeCharged: 12980, subsidyRM: 399000, subsidyPct: 50.6 },
        { year: 2024, actualCost: 28160, feeCharged: 12980, subsidyRM: 455400, subsidyPct: 53.9 },
        { year: 2025, actualCost: 29570, feeCharged: 12980, subsidyRM: 497700, subsidyPct: 56.1 },
        { year: 2026, actualCost: 31040, feeCharged: 12980, subsidyRM: 541800, subsidyPct: 58.2 },
        { year: 2027, actualCost: 32592, feeCharged: 12980, subsidyRM: 588360, subsidyPct: 60.2 },
        { year: 2028, actualCost: 34221, feeCharged: 12980, subsidyRM: 637230, subsidyPct: 62.1 },
        { year: 2029, actualCost: 35932, feeCharged: 12980, subsidyRM: 688560, subsidyPct: 63.9 },
        { year: 2030, actualCost: 37729, feeCharged: 12980, subsidyRM: 742470, subsidyPct: 65.6 },
      ],
    },
    minimumFundNeeded: { kind: "fakta", page: 211, value: 60000, unit: "RM juta", note: "Anggaran dana minimum yang perlu ada untuk LTH terus menampung subsidi haji pada tahap semasa." },
    cumulativeSince2001: { kind: "fakta", page: 211, value: 2.02, unit: "RM bilion" },
  },

  // ---------------------------------------------------------------------
  // BARISAN KEPIMPINAN
  // ---------------------------------------------------------------------
  leadership: {
    chairman: [
      { name: "Abdul Azeez bin Abdul Rahim", start: "2013-07-01", end: "2018-05-23", note: "Ahli Parlimen Baling & Ahli Majlis Tertinggi UMNO semasa menjadi Pengerusi." },
      { name: "Md Nor bin Md Yusof", start: "2018-07-10", end: "2021-10-15", note: "Dipecat sebelum tamat kontrak lanjutan — Suruhanjaya dapati tiada sebab munasabah." },
      { name: "Azman Mokhtar", start: "2021-12-20", end: null, note: "Pengerusi semasa laporan ditulis." },
    ],
    ceo: [
      { name: "Ismee bin Ismail", start: "2006-01-01", end: "2016-06-30", note: "Terus memegang beberapa jawatan anak syarikat sehingga Mei 2018 — 2 tahun selepas tamat tempoh CEO." },
      { name: "Johan bin Abdullah", start: "2016-07-01", end: "2018-06-30", note: "Memegang 18 jawatan anak syarikat/bersekutu serentak." },
      { name: "Zukri bin Samat", start: "2018-07-10", end: "2019-08-31", note: "Satu-satunya CEO direkodkan secara sukarela melepaskan jawatan anak syarikat bagi mengelak konflik kepentingan." },
      { name: "Nik Mohd Hasyudeen bin Yusoff", start: "2019-09-01", end: "2021-05-05", note: "Dipecat sebelum tamat kontrak — sedang melaksanakan penambahbaikan." },
      { name: "Amrin bin Awaluddin", start: "2021-05-06", end: null, note: "CEO semasa laporan ditulis." },
    ],
    politicalAppointees: [
      { name: "Datuk Seri Panglima Abdul Azeez bin Abdul Rahim", role: "Ahli Lembaga (2011-2018), Pengerusi (2013-2018)", politicalRole: "Ahli Parlimen Baling; Ahli Majlis Tertinggi UMNO" },
      { name: "Tan Sri Dato' Paduka Haji Badruddin bin Amiruldin", role: "Ahli Lembaga (2005-2018)", politicalRole: "Bekas Ahli Parlimen Yan/Jerai; Pengerusi Tetap Perhimpunan Agung UMNO" },
      { name: "Datuk Rosni binti Sohar", role: "Ahli Lembaga (2014-2018)", politicalRole: "Ahli Dewan Undangan Negeri Hulu Bernam; Ahli Majlis Tertinggi/Setiausaha Wanita UMNO" },
    ],
  },

  // ---------------------------------------------------------------------
  // KONFLIK KEPENTINGAN — jawatan rangkap dalam anak syarikat
  // ---------------------------------------------------------------------
  crossDirectorships: {
    kind: "fakta",
    page: 84,
    note: "Bilangan jawatan serentak dalam anak syarikat/syarikat bersekutu LTH yang direkodkan dalam laporan. Suruhanjaya mengesyorkan had maksimum 5 jawatan.",
    rows: [
      { name: "Abdul Azeez bin Abdul Rahim", role: "Pengerusi LTH (2013-2018)", count: 6, examples: "TH Real Estate LLC, TH Hotel & Residence, Putrajaya Perdana Berhad, The Edge Berhad, Yayasan Tabung Haji, LTH Property Holdings" },
      { name: "Ismee bin Ismail", role: "CEO LTH (2006-2016)", count: 7, examples: "TH Plantations, Trurich Resources, BIMB Holdings, Bank Islam Malaysia, Syarikat Takaful Malaysia, LTH Property Holdings Ltd, TH Travel" },
      { name: "Johan bin Abdullah", role: "CEO LTH (2016-2018)", count: 18, examples: "TH Heavy Engineering (Pengerusi), Trurich Resources (Pengerusi), Deru Semangat (Pengerusi), Malakoff Corporation, Glomac Berhad, PT TH Felda Nusantara" },
      { name: "Noordin bin Sulaiman", role: "Ahli Lembaga", count: 9, examples: "TH Hotel & Residence (Pengerusi), TH Travel & Services (Pengerusi), THV Management (Pengerusi), Premia Cards (Pengerusi), Theta Edge Berhad (Pengerusi)" },
      { name: "Zaiton binti Mohd Hassan", role: "Ahli Lembaga", count: 5, examples: "TH Properties (Pengerusi), THP Enstek Development, LTH Property Holdings (berbilang)" },
      { name: "Datuk Rozaida binti Omar", role: "Ketua Pegawai Kewangan Kumpulan", count: 12, examples: "Syarikat Takaful Malaysia, Pelikan International, BIMB Holdings, Premia Cards, TH Hotel & Residence, LTH Property Investment (L) Inc" },
      { name: "Zukri bin Samat", role: "CEO LTH (2018-2019)", count: 0, examples: "Melepaskan semua jawatan anak syarikat secara sukarela bagi mengelak konflik kepentingan." },
    ],
  },

  // ---------------------------------------------------------------------
  // TATATERTIB — 5 kakitangan kanan, 4 kluster
  // ---------------------------------------------------------------------
  discipline: {
    kind: "fakta",
    page: 198,
    note: "Kesemua 5 pegawai kekal berkhidmat dalam kumpulan LTH selepas rayuan — keputusan asal buang kerja/turun pangkat dilonggarkan pada peringkat rayuan.",
    clusters: [
      { id: 1, issue: "Tatakelola penjualan saham THIP", officersCount: 4 },
      { id: 2, issue: "Pelanggaran s.24(3)(5) Akta Syarikat 1965 — sumbangan RM22.12 juta kepada Yayasan TH tanpa kelulusan Menteri", officersCount: 2 },
      { id: 3, issue: "Pengisytiharan hibah 2017", officersCount: 1 },
      { id: 4, issue: "Tuntutan palsu kepada Unit Pengurus Bayaran", officersCount: 1 },
    ],
    officers: [
      { name: "Datuk Rozaida binti Omar", roleAtTime: "Ketua Pegawai Kewangan Kumpulan (Gred K)", clusters: "1, 2, 3", initialOutcome: "Buang kerja", finalOutcome: "Turun pangkat (selepas rayuan)", monthsToDecide: 19, currentRole: "Pengurus Besar Strategik Modal Insan (Gred J)" },
      { name: "Dato' Adi Azuan Abdul Ghani", roleAtTime: "Ketua Pegawai Operasi (Gred K)", clusters: "1, 2", initialOutcome: "Buang kerja", finalOutcome: "Turun pangkat (selepas rayuan)", monthsToDecide: 19, currentRole: "Pengurus Besar Kanan, TH Hotel & Residence" },
      { name: "Rifina binti Md Ariff", roleAtTime: "Pengurus Besar Kanan Perkhidmatan Korporat & Hartanah (Gred K)", clusters: "1", initialOutcome: "Buang kerja", finalOutcome: "Turun pangkat (selepas rayuan)", monthsToDecide: 15, currentRole: "Ketua Bahagian Risiko & Pematuhan, TH Plantations" },
      { name: "Mohd Hisham bin Harun", roleAtTime: "Ketua Pegawai Sumber Manusia (Gred K)", clusters: "1, 2", initialOutcome: "Buang kerja", finalOutcome: "Turun pangkat (selepas rayuan)", monthsToDecide: 19, currentRole: "Head, Business & Corporate Affairs, TH Properties" },
      { name: "Hazlina binti Mohd Khalid", roleAtTime: "Penasihat Undang-Undang (Gred J)", clusters: "1, 4", initialOutcome: "Amaran keras", finalOutcome: "Amaran keras (dikekalkan)", monthsToDecide: 10, currentRole: "Timbalan Pengurus Besar, TH Plantations" },
    ],
  },

  // ---------------------------------------------------------------------
  // CADANGAN — disusun ikut tema untuk paparan senarai semak
  // ---------------------------------------------------------------------
  recommendations: [
    { theme: "Struktur & Akta 535", items: [
      "Wujudkan kriteria khusus kelayakan Ahli Lembaga (bukan sekadar 'Islam & warganegara').",
      "Halang ahli politik aktif menjadi Pengerusi/Ahli Lembaga LTH dan anak syarikat.",
      "Wajibkan rujukan kepada badan penasihat bebas sebelum sebarang pemecatan Ahli Lembaga/CEO — mesti ada sebab munasabah.",
      "Bahagikan mandat menteri: Menteri Hal Ehwal Agama (pengurusan haji) vs Menteri Kewangan (kewangan & pelaburan).",
      "Lantikan Lembaga & CEO oleh PM atas cadangan jawatankuasa penasihat bebas (model Suruhanjaya Pelantikan Kehakiman).",
    ]},
    { theme: "Tadbir urus & jawatankuasa", items: [
      "Wujudkan semula & kukuhkan Panel Pelaburan secara berkanun dalam Akta 535 (komposisi, kuorum, konflik kepentingan).",
      "Kodkan Jawatankuasa Penasihat Syariah dan Jawatankuasa Urusan Haji dalam Akta 535.",
      "Hadkan jawatan rangkap Ahli Lembaga/pengurusan dalam anak syarikat kepada maksimum 5.",
    ]},
    { theme: "Kewangan & audit", items: [
      "Kadar hibah MESTI berdasarkan penyata kewangan diaudit — bukan RAV/Proforma.",
      "Pindahkan tanggungjawab audit berkanun daripada Jabatan Audit Negara kepada firma perakaunan swasta.",
      "Hentikan bonus kakitangan berlebihan; tuntut semula bonus TH Properties 2017-2018 yang tidak sah.",
      "Jalankan audit forensik ke atas 14 pelaburan bermasalah yang disenaraikan.",
    ]},
    { theme: "UJSB & Sukuk", items: [
      "Pastikan peruntukan RM1.73 bilion/tahun untuk penebusan awal Sukuk UJSB dipatuhi Kerajaan.",
      "Galakkan UJSB buat penebusan awal Sukuk menerusi hasil pelupusan aset.",
      "Struktur semula Sukuk supaya boleh diniagakan & dibuka kepada institusi kewangan lain (bukan LTH/Kerajaan sahaja).",
    ]},
    { theme: "Dasar haji", items: [
      "Naikkan deposit minimum pendaftaran giliran haji daripada RM1,300 kepada RM12,980 (kadar Muassasah semasa).",
      "Hadkan pengeluaran deposit besar dengan notis sebulan.",
      "Hadkan subsidi/bantuan haji kepada yang benar-benar memerlukan (prinsip istito'ah).",
    ]},
  ],

  // Anggaran kesan dasar (jika deposit minimum dinaikkan) — dinyatakan sendiri dalam laporan sbg unjuran
  queuePolicySimulation: {
    kind: "anggaran",
    page: 211,
    current: { depositMin: 1300, waitYears: 130 },
    proposed: { depositMin: 12980, waitYears: 33 },
    note: "Unjuran Suruhanjaya berdasarkan model EY — bergantung kepada andaian kuota haji & kadar pendaftaran baharu kekal malar.",
  },

  ministerTimeline: [
    { name: "Dato' Seri Jamil Khir bin Haji Baharom", start: "2009-02-10", end: "2018-05-09" },
    { name: "PM Tun Dr. Mahathir Mohamad (interim)", start: "2018-05-10", end: "2018-07-01" },
    { name: "Datuk Seri Dr. Mujahid bin Yusof Rawa", start: "2018-07-02", end: "2020-03-09" },
    { name: "Datuk Dr. Zulkifli bin Mohamad al-Bakri", start: "2020-03-10", end: "2021-08-29" },
    { name: "Datuk Haji Idris bin Ahmad", start: "2021-08-30", end: null },
  ],

  glossary: [
    { term: "Hibah", def: "'Hadiah' keuntungan yang diagihkan LTH kepada pendeposit tiap tahun — seakan dividen, tapi bukan jaminan kontraktual." },
    { term: "RAV (Realisable Asset Value)", def: "Kaedah anggaran nilai aset oleh pengurusan sendiri (bukan harga pasaran/penilaian bebas) — digunakan untuk 'buktikan' LTH mampu bayar hibah walaupun sebenarnya rugi." },
    { term: "Impairment (Penjejasan nilai)", def: "Pengiktirafan bahawa nilai sesuatu aset sudah jatuh berbanding kos asal — bila tidak direkod, syarikat kelihatan lebih untung daripada realiti." },
    { term: "UJSB", def: "Urusharta Jamaah Sdn Bhd — syarikat 'tong sampah' (SPV) milik kerajaan yang menyerap aset bermasalah LTH pada 2018, dibiayai Sukuk yang LTH sendiri melanggan." },
    { term: "Sukuk", def: "Bon patuh syariah — dalam kes ini, LTH 'meminjamkan' RM19.9 bilion aset kepada UJSB, dan sebagai balasan menerima Sukuk (janji bayaran masa depan) daripada UJSB." },
    { term: "HAFIS", def: "Hajj Financial Support — subsidi yang ditanggung LTH kerana bayaran haji dikenakan (RM9,980-RM12,980) jauh lebih rendah daripada kos sebenar (kini RM25,540)." },
    { term: "Emphasis of Matter", def: "Nota tambahan dalam laporan audit yang menarik perhatian kepada isu penting — TANPA menjadikannya 'teguran' (qualified opinion) rasmi. Suruhanjaya kata sepatutnya ia satu teguran." },
    { term: "Konflik kepentingan", def: "Keadaan seorang individu memegang lebih daripada satu jawatan yang kepentingannya boleh bercanggah — cth. Ahli Lembaga LTH yang juga Pengerusi anak syarikat yang menerima pelaburan LTH." },
  ],
};
