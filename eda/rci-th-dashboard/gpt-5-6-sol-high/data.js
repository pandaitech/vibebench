window.RCI_DATA = {
  meta: {
    title: "Laporan Suruhanjaya Siasatan Diraja Tabung Haji",
    shortTitle: "RCI Tabung Haji",
    reportDate: "30 Ogos 2022",
    inquiryPeriod: "2014–2020",
    sourceUrl: "https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md",
    pdfPages: 240,
    witnessesIdentified: 45,
    witnessesCalled: 16,
    briefingAgencies: 8,
    depositors2022: 8.6,
    deposits2022: 88,
    sourceNote: "Transkripsi OCR laporan RCI. Rujukan halaman ialah nombor halaman fizikal PDF."
  },

  balance: [
    { year: 2013, assets: 48.778, liabilitiesBefore: 43.696, distribution: 2.632, gapBefore: 5.082, gapAfter: 2.450, page: 147 },
    { year: 2014, assets: 54.751, liabilitiesBefore: 51.866, distribution: 3.237, gapBefore: 2.885, gapAfter: -0.352, page: 147 },
    { year: 2015, assets: 60.196, liabilitiesBefore: 60.062, distribution: 3.220, gapBefore: 0.134, gapAfter: -3.086, page: 147 },
    { year: 2016, assets: 64.321, liabilitiesBefore: 65.581, distribution: 2.871, gapBefore: -1.260, gapAfter: -4.131, page: 147 },
    { year: 2017, assets: 70.317, liabilitiesBefore: 71.086, distribution: 3.324, gapBefore: -0.769, gapAfter: -4.093, page: 147 }
  ],

  hibah: [
    { year: 2014, annualRate: 6.25, hajjRate: 2.00, annualAmount: 2.988053, hajjAmount: 0.249143, totalAmount: 3.237196, pageRate: 120, pageAmount: 130 },
    { year: 2015, annualRate: 5.00, hajjRate: 3.00, annualAmount: 2.807369, hajjAmount: 0.413005, totalAmount: 3.220374, pageRate: 120, pageAmount: 130 },
    { year: 2016, annualRate: 4.25, hajjRate: 1.50, annualAmount: 2.645625, hajjAmount: 0.225197, totalAmount: 2.870822, pageRate: 120, pageAmount: 130 },
    { year: 2017, annualRate: 4.50, hajjRate: 1.75, annualAmount: 3.042184, hajjAmount: 0.281557, totalAmount: 3.323741, pageRate: 120, pageAmount: 130 },
    { year: 2018, annualRate: 1.25, hajjRate: 0, annualAmount: 0.922959, hajjAmount: 0, totalAmount: 0.922959, pageRate: 120, pageAmount: 130 },
    { year: 2019, annualRate: 3.05, hajjRate: 0, annualAmount: 2.140538, hajjAmount: 0, totalAmount: 2.140538, pageRate: 120, pageAmount: 130 },
    { year: 2020, annualRate: 3.10, hajjRate: 0, annualAmount: 2.242141, hajjAmount: 0, totalAmount: 2.242141, pageRate: 120, pageAmount: 130 },
    { year: 2021, annualRate: 3.10, hajjRate: 0, annualAmount: null, hajjAmount: 0, totalAmount: null, pageRate: 120, pageAmount: null }
  ],

  depositMoments: [
    { label: "Sebelum pengumuman 1.25%", year: 2019, value: 73, qualifier: "kira-kira", page: 122 },
    { label: "Akhir 2019", year: 2019, value: 69, qualifier: "kira-kira", page: 122 },
    { label: "Akhir 2020", year: 2020, value: 76, qualifier: "lebih kurang", page: 122 },
    { label: "Ketika laporan", year: 2022, value: 88, qualifier: "dilaporkan", page: 122 }
  ],

  rav2017: {
    auditedAssets: 70.317,
    ravAddition: 4.466,
    ravAssets: 74.783,
    liabilitiesAfterDistribution: 74.410,
    ravSurplus: 0.373,
    janUnrecordedImpairment: 1.537,
    janNetLiability: 1.164,
    pwcNetLiability: 4.093,
    recordedProfit: 3.412,
    afsEquityImpairment: 4.258,
    debtImpairment: 0.007,
    otherAdjustments: 0.580,
    adjustedLoss: 1.433,
    retainedEarnings: 0.162,
    retainedAdjustments: 4.845,
    accumulatedLoss: 4.683,
    professionalValuation: 0.556,
    managementEstimate: 4.044,
    pageRav: 116,
    pageImpairment: 117,
    pageProfit: 149,
    pageValuation: 113
  },

  impairmentPolicy2017: [
    { threshold: 70, months: ">24 bulan", impact: 1.313, label: "Polisi awal", page: 148 },
    { threshold: 85, months: "Tiada", impact: 0.171, label: "Pindaan pertama", page: 148 },
    { threshold: 90, months: "Tiada", impact: 0.001, label: "Pindaan kedua", page: 148 }
  ],

  ujsb: {
    transferred: { listedEquities: 106, plantationCompanies: 1, properties: 29, page: 156 },
    valuation: [
      { asset: "Hartanah & tanah", book: 1.411, transfer: 2.247, market: 1.411 },
      { asset: "Syarikat perladangan", book: 0.718, transfer: 0.802, market: 0.718 },
      { asset: "Ekuiti tersenarai", book: 16.852, transfer: 16.851, market: 7.600 }
    ],
    totals: { book: 18.981, transfer: 19.900, market: 9.729, premium: 10.171, page: 159 },
    sukuk: [
      { series: "Siri 1", issue: 10.0, nominal: 13.2, maturity: 2026, years: 7, yield: 4.05, page: 163 },
      { series: "Siri 2", issue: 9.6, nominal: 14.3, maturity: 2029, years: 10, yield: 4.10, page: 163 }
    ],
    cash: 0.300,
    deferredYield: 7.65,
    governmentCommitment: 17.8,
    government2020: 0.5,
    annualPlanned: 1.73,
    missed2021: 1.5,
    redeemed2020: 0.2,
    accruedIncomeAnnual: 0.84,
    accruedIncome2021: 2.1,
    assetShare: 31,
    incomeShare: 26,
    disposedCounters: 75,
    reinvestedCounters: 329,
    reinvestmentIncomeLow: 0.2,
    reinvestmentIncomeHigh: 0.3,
    pageCommitment: 166,
    pageRisk: 171,
    pageDisposal: 168,
    bluechips: [
      { name: "Axiata", transferPrice: 6.00, market2018: 3.63, decline: 39.5, transferValue: 1.422605154, marketValue: 0.931803255, loss: 0.490801899, market2022: 3.04 },
      { name: "Maxis", transferPrice: 6.84, market2018: 5.43, decline: 20.6, transferValue: 0.879395994, marketValue: 0.681197584, loss: 0.198198410, market2022: 3.52 },
      { name: "MISC", transferPrice: 7.43, market2018: 6.15, decline: 17.2, transferValue: 0.486532216, marketValue: 0.438925710, loss: 0.047606506, market2022: 7.30 },
      { name: "Digi", transferPrice: 5.13, market2018: 4.24, decline: 17.3, transferValue: 0.576240738, marketValue: 0.500328955, loss: 0.075911783, market2022: 3.27 },
      { name: "TM", transferPrice: 5.96, market2018: 2.33, decline: 60.9, transferValue: 0.241202959, marketValue: 0.107650200, loss: 0.133552759, market2022: 5.20 }
    ],
    rofr: [
      { company: "WZ Satu", date: "24 Mac 2020", rofr: 0.090, market: 0.064, premium: 40.6 },
      { company: "Eastern & Oriental", date: "25 Mac 2020", rofr: 0.365, market: 0.335, premium: 9.0 },
      { company: "WZ Satu", date: "31 Mac 2020", rofr: 0.085, market: 0.075, premium: 13.3 },
      { company: "WCT Holdings", date: "2 Apr 2020", rofr: 0.400, market: 0.377, premium: 6.1 },
      { company: "KSL Holdings", date: "6 Mei 2020", rofr: 0.610, market: 0.630, premium: -3.2 },
      { company: "KSL Holdings", date: "21 Mei 2020", rofr: 0.580, market: 0.605, premium: -4.1 },
      { company: "Hap Seng Plantations", date: "29 Mei 2020", rofr: 1.650, market: 1.570, premium: 5.1 },
      { company: "FGV Holdings", date: "9 Dis 2020", rofr: 1.300, market: 1.270, premium: 2.4 },
      { company: "Integrated Logistics", date: "14 Mac 2022", rofr: 0.380, market: 0.365, premium: 4.1 }
    ],
    pageBluechips: 162,
    pageRofr: 169
  },

  investments: [
    {
      id: "thip", name: "PT TH Indo Plantations", sector: "Perladangan", geography: "Indonesia", issue: "Tadbir urus", status: "Siasatan / pertikaian",
      metric: { value: 178.6, currency: "USD", unit: "juta", label: "Pendahuluan kepada pembeli", kind: "Pendedahan", provenance: "Fakta laporan" },
      summary: "Pegangan 95% dipindah sebelum bayaran penuh; harga asal USD910 juta dikurangkan USD100 juta.",
      impact: "LTH juga memberi pendahuluan USD178.6 juta yang sepatutnya dilunaskan pembeli.",
      action: "Siasatan dalaman, siasatan forensik dan laporan polis; proses rentas sempadan masih disebut berjalan ketika laporan disiapkan.", page: 177
    },
    {
      id: "emrail", name: "Emrail Sdn. Bhd.", sector: "Infrastruktur", geography: "Malaysia", issue: "Opsyen jual gagal", status: "Timbang tara",
      metric: { value: 19.3, currency: "RM", unit: "juta", label: "Rosot nilai", kind: "Rosot nilai", provenance: "Fakta laporan" },
      summary: "LTH membeli 15.3% pada RM20.17 juta; penyenaraian gagal dan pembeli asal hanya membayar RM2 juta di bawah opsyen jual.",
      impact: "Keseluruhan baki opsyen jual RM19.3 juta diperuntukkan sebagai rosot nilai pada 2020.",
      action: "Kes dirujuk ke AIAC; pemilihan penimbang tara sedang dinilai ketika laporan disiapkan.", page: 178
    },
    {
      id: "wellspring", name: "Wellspring Worldwide Limited", sector: "Pelaburan", geography: "Malaysia", issue: "Opsyen jual gagal", status: "Penguatkuasaan mahkamah",
      metric: { value: 19.03, currency: "RM", unit: "juta", label: "Rosot nilai", kind: "Rosot nilai", provenance: "Fakta laporan" },
      summary: "Pelaburan 10% bernilai RM18.4 juta; syarikat gagal disenaraikan dan promoter tidak membayar opsyen jual.",
      impact: "Rosot nilai RM19.03 juta direkodkan pada 2019.",
      action: "Mahkamah memerintah bayaran RM20.8 juta; notis kebankrapan dibenarkan pada Januari 2022.", page: 179
    },
    {
      id: "dssb", name: "Deru Semangat Sdn. Bhd.", sector: "Perladangan", geography: "Malaysia", issue: "Risiko alam sekitar", status: "Dirungkai",
      metric: { value: 225, currency: "RM", unit: "juta", label: "Susut nilai tersirat (257 → 32)", kind: "Susut nilai", provenance: "Data terbitan" },
      summary: "Usaha sama ladang sawit menghadapi isu pembalakan hutan simpan dan polisi NDPE pembeli utama.",
      impact: "RM257 juta yang telah dikeluarkan dinilai tinggal RM32 juta; beza RM225 juta ialah kiraan dashboard.",
      action: "Pegangan dirungkai dengan pembayaran RM259 juta dan komitmen lanjutan RM258 juta diketepikan.", page: 180
    },
    {
      id: "trurich", name: "Trurich Resources Sdn. Bhd.", sector: "Perladangan", geography: "Indonesia", issue: "Usaha sama insolven", status: "Pelupusan",
      metric: { value: 364.31, currency: "RM", unit: "juta", label: "Rosot nilai penuh", kind: "Rosot nilai", provenance: "Fakta laporan" },
      summary: "Usaha sama dengan FGV di Kalimantan tidak memberi hasil dan menjadi insolven.",
      impact: "Keseluruhan pelaburan LTH RM364.31 juta dirosot nilai; pinjaman USD179 juta kepada Maybank turut tertunggak.",
      action: "Laporan polis dibuat dan proses pelupusan anak syarikat dilaporkan di peringkat akhir.", page: 182
    },
    {
      id: "abraj", name: "Abraj Sdn. Bhd.", sector: "Hartanah", geography: "Malaysia", issue: "Pendapatan tidak cukup", status: "Keluar pelaburan",
      metric: { value: 40.25, currency: "RM", unit: "juta", label: "Kerugian rosot nilai", kind: "Rosot nilai", provenance: "Fakta laporan" },
      summary: "Usaha sama hartanah gagal menjana pendapatan mencukupi selepas penyewa utama berpindah.",
      impact: "Kerugian rosot nilai RM40.25 juta daripada pegangan ekuiti RM85 juta.",
      action: "Amanah Raya membeli pegangan 50% LTH pada Disember 2020.", page: 183
    },
    {
      id: "ppb", name: "Putrajaya Perdana Berhad", sector: "Pembinaan", geography: "Malaysia", issue: "Penyenaraian gagal", status: "Rundingan penyelesaian",
      metric: { value: 145.3, currency: "RM", unit: "juta", label: "Rosot nilai", kind: "Rosot nilai", provenance: "Fakta laporan" },
      summary: "LTH membeli 30% pada RM193.5 juta dengan sasaran penyenaraian dalam setahun; sasaran itu tidak tercapai.",
      impact: "Rosot nilai RM145.3 juta setakat 2020; nilai buku bersih tinggal RM48.2 juta.",
      action: "Cadangan pengaturan penyelesaian sedang melalui kelulusan dalaman ketika laporan disiapkan.", page: 183
    },
    {
      id: "alrawda", name: "Al-Rawda Real Estates", sector: "Hotel", geography: "Arab Saudi", issue: "Sewa tertunggak", status: "Mahkamah / timbang tara",
      metric: { value: 202.8, currency: "RM", unit: "juta", label: "Jangkaan kerugian kredit 2020", kind: "Kerugian kredit", provenance: "Fakta laporan" },
      summary: "Empat hotel dipajak untuk haji dan umrah; pengendali gagal membayar sewa sejak Mac 2019.",
      impact: "Sewa tertunggak SR560.7 juta setakat 2021; ECL RM202.8 juta dan tambahan rosot nilai RM184 juta dijangka, tertakluk penilaian lanjut.",
      action: "Penguatkuasaan nota janji, likuidasi aset, rundingan dan timbang tara dijalankan serentak.", page: 185
    },
    {
      id: "alfareeda", name: "Al-Fareeda Residential Fund", sector: "Hartanah", geography: "Arab Saudi", issue: "Dana gagal", status: "Hapus kira",
      metric: { value: 63, currency: "RM", unit: "juta", label: "Modal asal (bersamaan SR76 juta)", kind: "Hapus kira", provenance: "Fakta laporan" },
      summary: "Dana perumahan menghadapi masalah kontraktor, buruh, kos binaan dan harga minyak; pengurus dana tidak dapat dikesan.",
      impact: "Pelaburan SR76 juta (dinyatakan bersamaan RM63 juta) dihapus kira sepenuhnya.",
      action: "Dana dicairkan dan aset berada di bawah Alinma Bank.", page: 188
    },
    {
      id: "thp", name: "TH Plantations Berhad", sector: "Perladangan", geography: "Malaysia / Indonesia", issue: "Tadbir urus", status: "Siasatan",
      metric: { value: 170, currency: "RM", unit: "juta", label: "Rosot nilai di LTH", kind: "Rosot nilai", provenance: "Fakta laporan" },
      summary: "Laporan forensik PwC mengenal pasti kegagalan tanggungjawab fidusiari dalam beberapa pengambilalihan.",
      impact: "Hanya 58% ladang produktif; rosot nilai RM170 juta direkodkan di peringkat LTH.",
      action: "Laporan dibuat kepada PDRM, SPRM dan Suruhanjaya Sekuriti.", page: 188
    },
    {
      id: "thproperties", name: "TH Properties Sdn. Bhd.", sector: "Hartanah", geography: "Malaysia / Australia", issue: "Bonus tanpa aturan", status: "Tuntutan semula",
      metric: { value: 2.1934, currency: "RM", unit: "juta", label: "Bonus 2017 + 2018", kind: "Bayaran", provenance: "Data terbitan" },
      summary: "Bonus istimewa dibayar kepada individu terpilih tanpa kelulusan pemegang saham yang diperlukan.",
      impact: "RM1.1484 juta pada 2017 dan RM1.045 juta pada 2018; jumlah dashboard RM2.1934 juta.",
      action: "Lembaga memutuskan mendapatkan semula bonus pada Ogos 2020.", page: 189
    },
    {
      id: "thmarine", name: "Alam Maritim / TH Marine", sector: "Maritim", geography: "Malaysia", issue: "Pelaburan tidak pulih", status: "Semakan kebolehpulihan",
      metric: { value: 278, currency: "RM", unit: "juta", label: "Ekuiti + pembiayaan dirosot nilai", kind: "Rosot nilai", provenance: "Data terbitan" },
      summary: "LTH melabur RM334 juta dalam lapan kapal sokongan luar pesisir.",
      impact: "RM198 juta ekuiti dan RM80 juta pembiayaan dirosot nilai; jumlah RM278 juta ialah kiraan dashboard.",
      action: "PwC menganggarkan hanya RM70.4 juta boleh diperoleh semula.", page: 190
    },
    {
      id: "thhr", name: "TH Hotel & Residences", sector: "Hotel", geography: "Malaysia", issue: "Pulangan rendah", status: "Dipindah ke UJSB",
      metric: { value: 5.9, currency: "RM", unit: "juta", label: "Kerugian bersih selepas cukai", kind: "Kerugian operasi", provenance: "Fakta laporan" },
      summary: "Lima hotel dan kompleks haji dipindah pada RM804.1 juta; aset dikenal pasti memberi pulangan bawah 2%.",
      impact: "Sewaan 2020 merosot 62% kepada RM6.2 juta; laporan menyebut kerugian bersih RM5.9 juta pada tahun sebelumnya.",
      action: "Aset berkaitan dipindahkan kepada UJSB di bawah pelan pemulihan.", page: 191
    },
    {
      id: "fgv", name: "FGV Berhad", sector: "Perladangan", geography: "Malaysia", issue: "Pegangan terlalu lama", status: "Dipindah ke UJSB",
      metric: { value: 1058.93738, currency: "RM", unit: "juta", label: "Kerugian tidak nyata", kind: "Kerugian tidak nyata", provenance: "Fakta laporan" },
      summary: "Harga saham jatuh daripada kos purata kepada RM0.885 seunit sementara LTH terus memegangnya.",
      impact: "Kerugian tidak nyata RM1.059 bilion; UJSB mengambil 283.71 juta saham pada nilai kos RM4.62 seunit.",
      action: "Laporan menyatakan tanpa pengambilalihan UJSB, kerugian LTH dianggarkan sekitar RM1.1 bilion.", page: 192
    }
  ],

  governance: {
    policyLimit: 5,
    policyPage: 90,
    people: [
      { name: "Datuk Rozaida Omar", role: "CFO Kumpulan", count: 23, page: 89, entities: ["Syarikat Takaful Malaysia", "Pelikan International", "BIMB Holdings", "Premia Cards", "TH Hotel & Residence", "THV Management Services", "151 BPR One", "151 BPR Two", "LTH Property Investment", "Leatherhead Properties", "TH Heavy Engineering", "Putrajaya Perdana", "Millstream Property", "LTH Property Holdings", "LTH Property Holdings 2", "LTH Property Holdings 3", "LTH Property Holdings 4", "LTH Residence", "10 Queen Street Place London", "Wilton Property", "Marston Development", "Luton Investment", "LTH Oxford"] },
      { name: "Datuk Seri Johan Abdullah", role: "CEO / Anggota Lembaga", count: 18, page: 86, entities: ["TH Heavy Engineering", "Trurich Resources", "Deru Semangat", "TH Properties", "TH Hotel & Residence", "TH Plantations", "Malakoff", "LTH Property Holdings", "LTH Property Holdings 2", "Express Rail Link", "YTL THP JV", "Glomac", "Yayasan Tabung Haji", "Premia Cards", "LTH Property Holdings 3", "LTH Property Holdings 4", "LTH Property Holdings 5", "PT TH Felda Nusantara"] },
      { name: "Dato’ Noordin Sulaiman", role: "Anggota Lembaga", count: 9, page: 85, entities: ["TH Hotel & Residence", "TH Travel & Services", "THV Management Services", "Premia Cards", "Theta Edge", "TH Hotel Sarawak", "Express Rail Link", "Putrajaya Perdana", "TH Alam Holding"] },
      { name: "Datuk Seri Abdul Azeez", role: "Pengerusi / Anggota Lembaga", count: 8, page: 84, entities: ["TH Real Estate LLC", "TH Hotel & Residence", "Putrajaya Perdana", "Theta Edge", "Yayasan Tabung Haji", "LTH Property Holdings 3", "LTH Property Holdings 4", "LTH Property Holdings 5"] },
      { name: "Tan Sri Ismee Ismail", role: "CEO / Anggota Lembaga", count: 7, page: 86, entities: ["TH Plantations", "Trurich Resources", "BIMB Holdings", "Bank Islam Malaysia", "Syarikat Takaful Malaysia", "LTH Property Holdings", "TH Travel"] },
      { name: "Datuk Zaiton Mohd Hassan", role: "Anggota Lembaga", count: 7, page: 84, entities: ["TH Properties", "THP Enstek Development", "LTH Property Holdings", "LTH Property Holdings 2", "LTH Property Holdings 3", "LTH Property Holdings 4", "LTH Property Holdings 5"] },
      { name: "Dato’ Sri Zukri Samat", role: "CEO / Anggota Lembaga", count: 4, page: 87, entities: ["TH Plantations", "TH Estates Holding", "TH Properties", "Yayasan Tabung Haji"] },
      { name: "Datuk Nik Mohd Hasyudeen", role: "CEO / Anggota Lembaga", count: 4, page: 88, entities: ["Bank Islam Malaysia", "BIMB Holdings", "TH Plantations", "TH Properties"] },
      { name: "Tan Sri Badruddin Amiruldin", role: "Anggota Lembaga", count: 3, page: 84, entities: ["TH Travel & Services", "TH Hotel & Residence", "TH Global Services"] },
      { name: "Datuk Sri Amrin Awaluddin", role: "CEO / Anggota Lembaga", count: 3, page: 88, entities: ["TH Plantations", "TH Properties", "Bank Islam Malaysia"] },
      { name: "Abd Kadir Sahlan", role: "Ketua Pegawai Pelaburan", count: 3, page: 90, entities: ["TH Properties Group", "Syarikat Perladangan Sabah Sarawak", "BIMB Securities"] }
    ]
  },

  hafis: {
    actual: [
      { year: 2014, cost: 16155, payment: 9980, perPerson: 6175, share: 38, total: 106, page: 204 },
      { year: 2015, cost: 17270, payment: 9980, perPerson: 7290, share: 42, total: 135, page: 204 },
      { year: 2016, cost: 18890, payment: 9980, perPerson: 8910, share: 47, total: 160, page: 204 },
      { year: 2017, cost: 19550, payment: 9980, perPerson: 9570, share: 49, total: 298, page: 204 },
      { year: 2018, cost: 22450, payment: 9980, perPerson: 12470, share: 56, total: 314, page: 204 },
      { year: 2019, cost: 22900, payment: 9980, perPerson: 12920, share: 56, total: 299, page: 204 }
    ],
    projection: [
      { year: 2022, cost: 25540, payment: 12980, perPerson: 12560, share: 49.2, total: 376.80, page: 205 },
      { year: 2023, cost: 26280, payment: 12980, perPerson: 13300, share: 50.6, total: 399.00, page: 205 },
      { year: 2024, cost: 28160, payment: 12980, perPerson: 15180, share: 53.9, total: 455.40, page: 205 },
      { year: 2025, cost: 29570, payment: 12980, perPerson: 16590, share: 56.1, total: 497.70, page: 205 },
      { year: 2026, cost: 31040, payment: 12980, perPerson: 18060, share: 58.2, total: 541.80, page: 205 },
      { year: 2027, cost: 32592, payment: 12980, perPerson: 19612, share: 60.2, total: 588.36, page: 205 },
      { year: 2028, cost: 34221, payment: 12980, perPerson: 21241, share: 62.1, total: 637.23, page: 205 },
      { year: 2029, cost: 35932, payment: 12980, perPerson: 22952, share: 63.9, total: 688.56, page: 205 },
      { year: 2030, cost: 37729, payment: 12980, perPerson: 24749, share: 65.6, total: 742.47, page: 205 }
    ],
    b40Payment2022: 10980,
    nonB40Payment2022: 12980,
    noPilgrims: [2020, 2021],
    minimumFund: 60,
    reportDepositBase: 88,
    lowBalanceAccounts: 65,
    lowBalanceThreshold: 2000,
    concentratedDeposits: 75,
    concentratedDepositors: 5,
    currentRegistration: 1300,
    proposedRegistration: 12980,
    waitNowReport: 135,
    waitNowSummary: 130,
    waitProposed: 33,
    pageConcentrationAccounts: 208,
    pageConcentrationValue: 216,
    pageWait: 208
  },

  bonus: [
    { year: 2010, allocation: 25.0, maxMonths: 6, approved: "2.5 + 1 khas", page: 137 },
    { year: 2011, allocation: 35.0, maxMonths: 6, approved: "3 + 1 khas", page: 137 },
    { year: 2012, allocation: 38.0, maxMonths: 8, approved: "3.5 + 1 khas", page: 137 },
    { year: 2013, allocation: 49.0, maxMonths: 10, approved: "2.5–10", page: 137 },
    { year: 2014, allocation: 74.0, maxMonths: 13, approved: "1–11 + 2 khas", page: 137 },
    { year: 2015, allocation: 65.0, maxMonths: 10, approved: "1–10", page: 137 },
    { year: 2016, allocation: 25.0, maxMonths: 3, approved: "1–3", page: 137 },
    { year: 2017, allocation: 56.7, maxMonths: 6, approved: "1–6", page: 137 },
    { year: 2018, allocation: 10.8, maxMonths: 1, approved: "1", page: 137 },
    { year: 2019, allocation: 11.6, maxMonths: 1, approved: "1", page: 137 },
    { year: 2020, allocation: 14.1, maxMonths: 1, approved: "1", page: 137 }
  ],

  timeline: [
    { year: 2001, theme: "Haji", title: "HAFIS bermula", detail: "Sebelum itu jemaah Muassasah membayar kos sebenar.", page: 207 },
    { year: 2009, theme: "Haji", title: "Bayaran haji dibekukan", detail: "RM9,980 kekal hingga 2021 walaupun kos meningkat.", page: 204 },
    { year: 2010, theme: "Audit", title: "Deposit dikelas sebagai ekuiti", detail: "Laporan menyatakan salah pengelasan ini diterima sejak 2010.", page: 132 },
    { year: 2012, theme: "Hibah", title: "Rizab digunakan untuk hibah", detail: "RB melaporkan penggunaan rizab pada 2012, 2014 dan 2016.", page: 104 },
    { year: 2014, theme: "Kewangan", title: "Defisit selepas agihan bermula", detail: "Lebihan RM2.885b bertukar defisit RM352j selepas agihan.", page: 147 },
    { year: 2014, theme: "Kawal selia", title: "BNM mula memberi amaran", detail: "Surat 19 Disember menyentuh deposit dan kecairan.", page: 213 },
    { year: 2015, theme: "Kawal selia", title: "Amaran hibah & rizab", detail: "BNM menulis kepada LTH dan Menteri Hal Ehwal Agama.", page: 213 },
    { year: 2016, theme: "Deposit", title: "Akad bertukar kepada Wadi’ah", detail: "Laporan tidak menemui penjelasan menyeluruh bagi perubahan itu.", page: 107 },
    { year: 2017, theme: "Audit", title: "Polisi rosot nilai diubah dua kali", detail: "Ambang bergerak daripada 70% kepada 85% kemudian 90%.", page: 148 },
    { year: 2017, theme: "Kewangan", title: "Krisis memuncak", detail: "PwC melaras keuntungan RM3.412b menjadi kerugian RM1.433b.", page: 149 },
    { year: 2017, theme: "Tadbir urus", title: "Laporan RB tidak dibawa ke Lembaga", detail: "Tiada rekod ia dibentangkan sebelum hibah 2017 diumumkan.", page: 214 },
    { year: 2018, theme: "Hibah", title: "Kaedah agihan ditukar lalu ditarik balik", detail: "Pertukaran baki bulanan/tahunan dikaitkan dengan tambahan RM600j.", page: 115 },
    { year: 2018, theme: "Audit", title: "KAN beri ‘Emphasis of Matter’", detail: "Pendapat tanpa teguran dikeluarkan pada 16 Julai.", page: 133 },
    { year: 2018, theme: "Pemulihan", title: "Pelan pemulihan diluluskan", detail: "Jemaah Menteri meluluskan pelan pada 7 Disember.", page: 145 },
    { year: 2018, theme: "Pemulihan", title: "UJSB ditubuhkan", detail: "Ditubuhkan 14 Disember; perjanjian aset ditandatangani 27 Disember.", page: 156 },
    { year: 2018, theme: "Penguatkuasaan", title: "Empat laporan polis bermula", detail: "Dua laporan pada 30 November, satu pada 13 Disember dan satu lagi pada 16 Januari 2019.", page: 194 },
    { year: 2019, theme: "Pemulihan", title: "Sukuk & ROFR dimeterai", detail: "Perjanjian ditandatangani pada 15 Mei.", page: 156 },
    { year: 2019, theme: "Deposit", title: "Reaksi kepada hibah 1.25%", detail: "Deposit menyusut daripada kira-kira RM73b kepada RM69b.", page: 122 },
    { year: 2019, theme: "Deposit", title: "Akad Wakalah diperkenal", detail: "Hubungan deposit diselaraskan semula pada Disember.", page: 109 },
    { year: 2020, theme: "Pemulihan", title: "RM200j Sukuk ditebus awal", detail: "Dibiayai daripada geran Kerajaan RM500j.", page: 166 },
    { year: 2020, theme: "Deposit", title: "Deposit pulih ke RM76b", detail: "Jumlah pada akhir 2020 dilaporkan lebih kurang RM76b.", page: 122 },
    { year: 2021, theme: "Pemulihan", title: "Peruntukan RM1.5b tidak diterima", detail: "Keutamaan tunai beralih kepada pemulihan pandemik.", page: 166 },
    { year: 2021, theme: "Pemulihan", title: "Pendapatan terakru melebihi RM2.1b", detail: "Pendapatan Sukuk ini belum bersandarkan tunai.", page: 170 },
    { year: 2021, theme: "Penguatkuasaan", title: "Hukuman berubah selepas rayuan", detail: "Dalam beberapa kluster, buang kerja atau turun pangkat dikurangkan; lima pegawai masih bertugas ketika laporan.", page: 199 },
    { year: 2022, theme: "Haji", title: "Bayaran dua lapisan", detail: "RM10,980 untuk B40 dan RM12,980 untuk bukan B40.", page: 205 },
    { year: 2022, theme: "RCI", title: "Laporan diserahkan", detail: "Laporan dipersembahkan pada 30 Ogos 2022.", page: 5 },
    { year: 2026, theme: "Pemulihan", title: "Sukuk Siri 1 matang", detail: "Nilai nominal RM13.2b.", page: 171 },
    { year: 2029, theme: "Pemulihan", title: "Sukuk Siri 2 matang", detail: "Nilai nominal RM14.3b.", page: 171 }
  ],

  recommendations: [
    { id: "4.4.1", category: "Akta & tadbir urus", title: "Pinda Akta 535", detail: "Tetapkan kriteria dan kepakaran Lembaga, larangan ahli politik aktif, perlindungan penamatan, jawatankuasa berkanun, asas hibah, Dana Haji dan aturan audit.", page: 230 },
    { id: "4.4.2", category: "Akta & tadbir urus", title: "Pisahkan mandat Menteri", detail: "Hal Ehwal Agama untuk haji; Kewangan untuk dana dan pelaburan; PM melantik Lembaga dan CEO atas syor badan bebas.", page: 231 },
    { id: "4.4.3", category: "Akta & tadbir urus", title: "Hadkan jawatan anak syarikat", detail: "Kurangkan beban tugas dan konflik kepentingan.", page: 232 },
    { id: "4.4.4", category: "Kawal selia", title: "Hadkan peranan BNM", detail: "Jika masih perlu, hanya untuk rizab dan kecairan, bukan rangka perbankan penuh.", page: 232 },
    { id: "4.4.5", category: "Audit & hibah", title: "Lantik firma audit swasta", detail: "Pengauditan tidak lagi diletakkan pada JAN.", page: 232 },
    { id: "4.4.6", category: "Audit & hibah", title: "Guna penyata beraudit, bukan RAV", detail: "Agihan mesti bersandar aset dan liabiliti dalam penyata tahunan beraudit.", page: 232 },
    { id: "4.4.7", category: "Audit & hibah", title: "Patuh piawaian pelaporan", detail: "Penyata kewangan perlu mematuhi sepenuhnya Akta 240 dan garis panduan berkaitan.", page: 233 },
    { id: "4.4.8", category: "Ganjaran", title: "Hentikan bonus terlalu tinggi", detail: "Amalan bonus kakitangan yang melampau perlu dihentikan.", page: 233 },
    { id: "4.4.9", category: "Ganjaran", title: "Dapatkan semula bonus TH Properties", detail: "Tuntut semula bonus yang diberi tanpa mematuhi aturan.", page: 233 },
    { id: "4.4.10", category: "Pelaburan", title: "Audit forensik 14 pelaburan", detail: "Teliti bagaimana keputusan lalu membawa kepada penurunan nilai aset yang teruk.", page: 233 },
    { id: "4.4.11", category: "Penguatkuasaan", title: "Tindakan tegas dan segera", detail: "Setiap laporan polis atau aduan salah laku perlu ditangani segera.", page: 234 },
    { id: "4.4.12", category: "Penguatkuasaan", title: "Percepat tatatertib", detail: "Proses perlu lebih berkesan, cekap, adil dan telus.", page: 234 },
    { id: "4.4.13", category: "Penguatkuasaan", title: "Pantau litigasi dan timbang tara", detail: "Jadikan pertikaian agenda khusus dan tingkatkan penyelesaian di luar proses formal.", page: 234 },
    { id: "4.4.14", category: "Syariah & zakat", title: "Semak pelaksanaan zakat", detail: "Rujuk perubahan akad dan kesan zakat kepada Muzakarah MKI.", page: 234 },
    { id: "4.4.15", category: "UJSB & Sukuk", title: "Pastikan pelan pemulihan berjaya", detail: "Pertimbang jaminan Kerajaan untuk Sukuk dan risiko jaminan deposit RM88b.", page: 234 },
    { id: "4.4.16", category: "UJSB & Sukuk", title: "Jadikan Sukuk boleh diniagakan", detail: "Beri LTH fleksibiliti mengurus aset dan pendapatan.", page: 235 },
    { id: "4.4.17", category: "UJSB & Sukuk", title: "Luaskan pembeli Sukuk", detail: "Tawarkan juga kepada institusi kewangan lain.", page: 235 },
    { id: "4.4.18", category: "UJSB & Sukuk", title: "Sediakan RM1.73b setahun", detail: "Pastikan peruntukan tahunan bagi penebusan awal Sukuk UJSB.", page: 235 },
    { id: "4.4.19", category: "UJSB & Sukuk", title: "Tebus awal melalui pelupusan aset", detail: "Gunakan hasil aset yang dipindahkan untuk mengurangkan Sukuk.", page: 235 },
    { id: "4.4.20", category: "Deposit & haji", title: "Ubah dasar deposit, bayaran dan HAFIS", detail: "Naikkan baki pendaftaran, beri notis pengeluaran besar dan sasarkan bantuan kepada yang memerlukan.", page: 235 },
    { id: "4.4.21", category: "Deposit & haji", title: "Bawa lebih ramai jemaah", detail: "Rancang menggunakan kuota tambahan Arab Saudi sepenuhnya.", page: 236 },
    { id: "4.4.22", category: "Deposit & haji", title: "Naikkan minimum pendaftaran", detail: "Daripada RM1,300 kepada RM12,980; laporan mengaitkannya dengan tempoh menunggu 130 → 33 tahun.", page: 236 },
    { id: "4.4.23", category: "Model perniagaan", title: "Wujudkan Dana Haji dalam LTH", detail: "Pelaburan kekal dalam entiti sama tetapi bebas, profesional dan dikawal selia Suruhanjaya Sekuriti.", page: 236 },
    { id: "4.4.24", category: "Pelaburan", title: "Elak pelaburan strategik berisiko tinggi", detail: "Fokus kepada portfolio pengurusan dana.", page: 236 },
    { id: "4.4.25", category: "Model perniagaan", title: "Profesional tanpa campur tangan politik", detail: "Perkukuh model perniagaan, pelaburan dan tadbir urus secara menyeluruh.", page: 237 }
  ],

  integrityNotes: [
    {
      title: "Kos haji: tahun dan angka berbeza",
      detail: "Ringkasan eksekutif menyebut 2013 pada RM15,553, manakala Bab 3.16 menyebut 2003 pada RM15,555. Dashboard tidak menggabungkan dua kenyataan ini.",
      pages: [23, 203]
    },
    {
      title: "Tempoh menunggu: 130 atau 135 tahun",
      detail: "Bab terperinci menyebut 135 → 33 tahun; ringkasan dan Bab Empat menyebut 130 → 33 tahun. Kedua-duanya ditunjukkan sebagai percanggahan dalaman laporan.",
      pages: [33, 208, 236]
    },
    {
      title: "RM9.73b ialah nilai pasaran, bukan nilai pemindahan",
      detail: "Jadual terperinci menetapkan nilai pemindahan RM19.9b dan nilai pasaran RM9.729b. Satu perenggan kemudian menyebut RM9.73b sebagai nilai pemindahan; dashboard mengutamakan jadual berlabel.",
      pages: [159, 166]
    },
    {
      title: "OCR bukan naskhah typeset",
      detail: "Beberapa simbol peratus dan nombor seksyen rosak dalam OCR. Nilai dinormalisasi hanya apabila jadual atau konteks bersebelahan menjadikannya jelas.",
      pages: [1]
    },
    {
      title: "Status bukan maklumat semasa",
      detail: "Status siasatan, mahkamah, aset dan Sukuk ialah sebagaimana dilaporkan pada 2022. Dashboard ini tidak mengesahkan perkembangan selepas laporan.",
      pages: [5]
    }
  ]
};
