/**
 * Definisi metrik, dimensi, penapis, perbandingan dan spesifikasi simulasi.
 *
 * Setiap metrik membawa:
 *   - `formula`      : formula yang boleh dibaca manusia
 *   - `inputs`       : id siri/rekod yang diperlukan
 *   - `unit`         : unit output
 *   - `factType`     : "fact" (terus daripada laporan) atau "derived"
 *   - `assumptions`  : andaian yang mesti dinyatakan pada paparan
 *   - `validRange`   : tahun/skop di mana metrik ini sah
 *   - `cannotConclude`: apa yang metrik ini TIDAK boleh buktikan
 */

export const metrics = [
  /* ---------- Metrik fakta (dibaca terus) ---------- */
  {
    id: "m-hibah-rate-total",
    label: "Jumlah kadar hibah",
    plainLabel: "Kadar pulangan yang diumumkan setiap tahun",
    formula: "annual_pct + hajj_pct",
    inputs: ["hibah-rates"],
    unit: "%",
    factType: "derived",
    assumptions: [
      "Hibah haji ialah kadar TAMBAHAN kepada baki layak, bukan kadar untuk semua pendeposit. Menjumlahkan kedua-duanya menghasilkan kadar 'muka depan' yang dirujuk laporan (cth 6.25% bagi 2017), BUKAN pulangan efektif purata setiap pendeposit.",
    ],
    validRange: "2014–2021",
    cannotConclude:
      "Bukan pulangan sebenar mana-mana pendeposit individu. Pendeposit yang tidak layak menerima hibah haji hanya menerima kadar tahunan.",
  },
  {
    id: "m-hibah-total-rm",
    label: "Jumlah hibah dibayar",
    plainLabel: "Berapa banyak wang yang diagihkan kepada pendeposit",
    formula: "annual_rm_thousand + hajj_rm_thousand",
    inputs: ["hibah-amounts"],
    unit: "RM ribu",
    factType: "fact",
    validRange: "2014–2020",
    cannotConclude: "Tiada data 2021 walaupun kadarnya diberikan.",
  },
  {
    id: "m-surplus-pre",
    label: "Lebihan/kekurangan sebelum agihan",
    plainLabel: "Adakah LTH mempunyai aset melebihi liabiliti SEBELUM membayar hibah?",
    formula: "totalAssets_rm_million + totalLiabilities_rm_million",
    inputs: ["assets-liabilities"],
    unit: "RM juta",
    factType: "fact",
    validRange: "2013–2017",
    threshold: {
      value: 0,
      meaning:
        "Nilai negatif bermakna syarat seksyen 22(3)(a) Akta 535 TIDAK dipenuhi — tiada hibah sepatutnya diisytiharkan langsung.",
    },
    cannotConclude:
      "Ini asas PwC. Penyata kewangan beraudit yang diterbitkan menunjukkan gambaran berbeza kerana Kumpulan Wang Pendeposit dikelaskan sebagai ekuiti.",
  },
  {
    id: "m-surplus-post",
    label: "Lebihan/kekurangan selepas agihan",
    plainLabel: "Kedudukan LTH selepas hibah dibayar",
    formula: "surplusPreDistribution_rm_million + distribution_rm_million",
    inputs: ["assets-liabilities"],
    unit: "RM juta",
    factType: "fact",
    validRange: "2013–2017",
    cannotConclude:
      "JANGAN jumlahkan merentas tahun. Setiap nilai ialah kedudukan pada akhir tahun itu, bukan aliran tahunan.",
  },
  /* ---------- Metrik terbitan ---------- */
  {
    id: "m-overpayment",
    label: "Lebihan bayaran hibah",
    plainLabel: "Berapa banyak hibah dibayar melebihi keuntungan sebenar",
    formula:
      "Jika surplusPre >= 0: max(0, distribution_abs − surplusPre). Jika surplusPre < 0: distribution_abs (kerana TIADA hibah sepatutnya dibayar langsung).",
    inputs: ["assets-liabilities"],
    unit: "RM juta",
    factType: "derived",
    assumptions: [
      "Menggunakan ujian seksyen 22(3)(a) sahaja (aset >= liabiliti). Syarat kedua di bawah 22(3)(b) tidak boleh diuji kerana Perbendaharaan tidak pernah menetapkan peratusan rizab minima.",
      "Menggunakan asas PwC, bukan penyata kewangan beraudit yang diterbitkan.",
    ],
    expectedValues: {
      2014: 352,
      2015: 3086,
      2016: 2871,
      2017: 3324,
      note:
        "2014 dan 2015: agihan melebihi lebihan sedia ada. 2016 dan 2017: aset sudah kurang daripada liabiliti sebelum sebarang agihan, jadi keseluruhan agihan adalah lebihan bayar.",
    },
    validRange: "2014–2017",
    cannotConclude:
      "Ini BUKAN 'wang yang dicuri' atau 'kerugian bersih'. Ia ialah ukuran sejauh mana pembayaran melebihi syarat berkanun. Jumlah kumulatif metrik ini (RM9.63 bilion) mengukur pelanggaran berkanun kumulatif, BUKAN kekurangan kunci kira-kira (yang RM4.09 bilion pada akhir 2017).",
  },
  {
    id: "m-hibah-vs-capacity",
    label: "Nisbah hibah kepada kapasiti",
    plainLabel: "Hibah dibayar berbanding hibah yang mampu dibayar",
    formula: "distribution_abs ÷ max(surplusPre, 0)",
    inputs: ["assets-liabilities"],
    unit: "kali ganda (×)",
    factType: "derived",
    validRange: "2014–2015 sahaja",
    assumptions: ["Tidak boleh dikira untuk 2016 dan 2017 kerana pembahagi adalah negatif (pembahagian dengan sifar/negatif)."],
    cannotConclude:
      "Untuk 2016 dan 2017, metrik ini TIDAK tertakrif. Paparkan sebagai '∞ / tidak tertakrif' dengan penjelasan, jangan paparkan 0 atau kosong.",
  },
  {
    id: "m-hibah-cumulative-share",
    label: "Bahagian hibah tempoh siasatan",
    plainLabel: "Berapa peratus daripada semua hibah dalam sejarah LTH dibayar dalam tempoh 2014–2020",
    formula: "SUM(hibahAmounts.total_rm_thousand) ÷ 1,000,000 ÷ 37,520",
    inputs: ["hibah-amounts", "cumulative-totals"],
    unit: "%",
    factType: "derived",
    expectedValue: 47.9,
    assumptions: [
      "Pengangka: RM17,957.8 juta (2014–2020). Penyebut: RM37.52 bilion kumulatif 1966–2021.",
      "Mengecualikan 2021 kerana jumlah RM 2021 tidak diberikan — nisbah sebenar bagi 2014–2021 akan LEBIH TINGGI.",
    ],
    validRange: "2014–2020 berbanding 1966–2021",
    cannotConclude:
      "Tidak menyesuaikan inflasi atau saiz dana. Bahagian yang tinggi sebahagiannya dijangka kerana dana LTH tumbuh dari semasa ke semasa.",
  },
  {
    id: "m-impairment-avoided",
    label: "Rosot nilai yang dielakkan melalui perubahan polisi",
    plainLabel: "Kerugian yang tidak diakui kerana ambang rosot nilai dilonggarkan",
    formula: "impairmentAt70pct − actualRecorded = 1,313 − 1 = 1,312",
    inputs: ["impairment-policy-2017"],
    unit: "RM juta",
    factType: "derived",
    expectedValue: 1312,
    validRange: "2017 sahaja",
    assumptions: ["Menggunakan senario ambang 70% sebagai penanda aras kerana itulah polisi LTH sebelum perubahan 2017."],
    cannotConclude:
      "Ambang 70% sendiri JAUH lebih longgar daripada panduan FRSIC 14 (20% penurunan, 12 bulan). Rosot nilai 'sepatutnya' di bawah FRSIC 14 tidak dikira dalam laporan, jadi RM1,312 juta ialah HAD BAWAH, bukan jumlah penuh.",
  },
  {
    id: "m-rav-inflation",
    label: "Inflasi nilai aset melalui RAV",
    plainLabel: "Berapa banyak nilai aset ditambah oleh anggaran RAV",
    formula: "ravAddition ÷ totalAssets = 4,466 ÷ 70,317",
    inputs: ["rav-2017"],
    unit: "%",
    factType: "derived",
    expectedValue: 6.35,
    validRange: "2017 sahaja",
    cannotConclude:
      "Hanya nilai RAV 2017 diberikan dengan pecahan. Nilai RAV 2015 dan 2016 tidak didedahkan walaupun rangka kerja yang sama digunakan.",
  },
  {
    id: "m-thp-rav-unverified",
    label: "Bahagian penilaian THP yang tidak disahkan penilai profesional",
    plainLabel: "Berapa peratus penilaian hartanah TH Plantations hanya anggaran pengurusan",
    formula: "managementEstimateOnly ÷ underlyingPropertyValuation = 4,044 ÷ 4,600",
    inputs: ["rav-2017"],
    unit: "%",
    factType: "derived",
    expectedValue: 87.9,
    validRange: "2017",
    cannotConclude: "Hanya komponen TH Plantations didedahkan. Komponen RAV lain tidak dipecahkan.",
  },
  {
    id: "m-transfer-premium",
    label: "Premium pemindahan aset",
    plainLabel: "Berapa banyak lebih daripada harga pasaran yang dibayar UJSB untuk aset LTH",
    formula: "transferValue − marketValue",
    inputs: ["asset-transfer"],
    unit: "RM juta",
    factType: "derived",
    expectedValue: 10171,
    validRange: "Pada tarikh pemindahan Disember 2018",
    assumptions: [
      "Untuk hartanah dan perladangan, lajur 'nilai pasaran' dalam laporan sama dengan nilai buku — jadi premium untuk kelas aset ini mungkin bukan premium berasaskan pasaran sebenar.",
    ],
    cannotConclude:
      "Premium bukan kerugian yang direalisasikan. Ia menjadi kerugian apabila UJSB melupuskan aset di bawah nilai pemindahan — sesuatu yang sebahagian besarnya belum berlaku setakat laporan.",
  },
  {
    id: "m-property-value-erosion",
    label: "Hakisan nilai hartanah selepas pemindahan",
    plainLabel: "Berapa banyak nilai hartanah jatuh antara Disember 2018 dan Disember 2021",
    formula: "(marketValueDec2021 − transferValue) ÷ transferValue",
    inputs: ["property-transfer-detail"],
    unit: "%",
    factType: "derived",
    expectedValue: -46.5,
    byAssetType: { Tanah: -36.0, "Menara pejabat": -55.9, "Lot kedai": -28.0, Hotel: -47.2, Perindustrian: -40.5 },
    validRange: "Dis 2018 → Dis 2021",
    assumptions: ["Perbandingan tiga tahun yang merangkumi kesan pandemik Covid-19 ke atas pasaran hartanah domestik."],
    cannotConclude:
      "TIDAK boleh memisahkan berapa banyak hakisan disebabkan penilaian pemindahan yang terlalu tinggi berbanding kejatuhan pasaran sebenar. Laporan sendiri menyatakan kedua-dua faktor.",
  },
  {
    id: "m-price-per-sqft",
    label: "Harga sekaki persegi",
    plainLabel: "Nilai setiap kaki persegi hartanah, semasa dipindahkan dan sekarang",
    formula: "transferValue_rm ÷ area_sqft ; marketValueDec2021_rm ÷ area_sqft",
    inputs: ["property-transfer-detail"],
    unit: "RM/kps",
    factType: "derived",
    validRange: "5 jenis aset",
    cannotConclude:
      "Membandingkan RM/kps merentas jenis aset (tanah vs menara pejabat vs hotel) adalah mengelirukan kerana asas keluasan berbeza (keluasan tanah vs keluasan lantai). Gunakan hanya untuk perbandingan dalam jenis aset yang sama, atau untuk menunjukkan magnitud, bukan kecekapan.",
  },
  {
    id: "m-sukuk-share-of-assets",
    label: "Bahagian Sukuk daripada aset LTH",
    plainLabel: "Berapa besar Sukuk UJSB berbanding keseluruhan aset LTH",
    formula: "27,500 ÷ totalAssets ≈ 31% (dinyatakan laporan)",
    inputs: ["ujsb-sukuk", "sukuk-accrual"],
    unit: "%",
    factType: "fact",
    derivedCorollary:
      "Jika 27,500 = 31%, aset tersirat ≈ RM88.7 bilion — konsisten dengan deposit RM88 bilion.",
    cannotConclude:
      "Nilai RM27.5 bilion ialah nilai MATANG, bukan nilai dibawa dalam kunci kira-kira LTH hari ini. Nisbah ini bercampur asas.",
  },
  {
    id: "m-non-cash-income-share",
    label: "Bahagian pendapatan bukan tunai",
    plainLabel: "Berapa besar 'keuntungan' LTH yang hanya di atas kertas",
    formula: "annualDeferredIncome ÷ annual income ≈ 26% (dinyatakan laporan)",
    inputs: ["sukuk-accrual"],
    unit: "%",
    factType: "fact",
    derivedCorollary:
      "RM840 juta ÷ hibah 2020 (RM2,242 juta) = 37.5%, konsisten dengan 'melebihi satu pertiga jumlah agihan keuntungan tahunan'.",
    cannotConclude:
      "Laporan tidak memberi jumlah pendapatan tahunan LTH, jadi 26% tidak boleh disahkan secara bebas. Ia adalah nombor yang dinyatakan, bukan yang dikira.",
  },
  {
    id: "m-warning-lag",
    label: "Jurang amaran",
    plainLabel: "Berapa lama antara amaran pertama dan pendedahan awam",
    formula: "16 Julai 2018 − 21 Ogos 2014",
    inputs: ["regulator-warnings", "audit-failure"],
    unit: "tahun/bulan",
    factType: "derived",
    expectedValue: "3 tahun 11 bulan",
    cannotConclude:
      "Kandungan surat BNM tidak didedahkan (RAHSIA). Kita tidak tahu sama ada amaran awal sudah spesifik tentang krisis kesolvenan atau hanya tentang kecairan.",
  },
  {
    id: "m-hafis-share",
    label: "Bahagian HAFIS daripada kos haji",
    plainLabel: "Berapa peratus kos haji ditanggung LTH, bukan jemaah",
    formula: "hafisPerPerson_rm ÷ hajjCost_rm",
    inputs: ["hafis-actual", "hafis-projection"],
    unit: "%",
    factType: "fact",
    trend: "38% (2014) → 56% (2019) → 49.2% (2022, bukan-B40) → 65.6% (2030, unjuran)",
    assumptions: [
      "Angka 2022 ke atas ialah UNJURAN yang mengunci bayaran haji pada RM12,980.",
      "Untuk kumpulan B40 (RM10,980), bahagian 2022 ialah 57.0% — bukan 49.2%.",
    ],
    cannotConclude:
      "Penurunan daripada 56% (2019) kepada 49.2% (2022) BUKAN penambahbaikan berterusan — ia hasil kenaikan bayaran haji sekali sahaja pada 2022. Trend menaik disambung semula selepas itu.",
  },
  {
    id: "m-payment-freeze-erosion",
    label: "Hakisan nilai bayaran haji",
    plainLabel: "Berapa banyak bayaran RM9,980 menjadi kurang bermakna apabila kos naik",
    formula: "pilgrimPayment_rm ÷ hajjCost_rm",
    inputs: ["hafis-actual"],
    unit: "%",
    factType: "fact",
    trend: "62% (2014) → 44% (2019)",
    derivedNote:
      "TERBITAN: kos haji naik daripada RM16,155 (2014) kepada RM22,900 (2019) = +41.8% dalam lima tahun (CAGR ~7.2%), sedangkan bayaran haji tidak berubah langsung.",
    cannotConclude: "Tidak menyesuaikan inflasi am Malaysia atau perubahan kadar tukaran MYR/SAR.",
  },
  {
    id: "m-implied-pilgrims",
    label: "Bilangan jemaah tersirat",
    plainLabel: "Berapa ramai jemaah tersirat daripada jumlah subsidi",
    formula: "hafisTotal_rm_million × 1,000,000 ÷ hafisPerPerson_rm",
    inputs: ["hafis-actual"],
    unit: "orang",
    factType: "derived",
    status: "TIDAK BOLEH DIPERCAYAI",
    computedValues: { 2014: 17166, 2015: 18519, 2016: 17957, 2017: 31139, 2018: 25180, 2019: 23142 },
    assumptions: ["Mengandaikan jumlah HAFIS hanya merangkumi jemaah Muassasah pada kadar seorang yang dinyatakan."],
    cannotConclude:
      "Nilai melompat 73% antara 2016 dan 2017 tanpa penjelasan, dan 2014–2016 jauh di bawah kuota ~30,000. Metrik ini WAJIB dipaparkan dengan amaran keras atau tidak dipaparkan langsung. Ia berguna sebagai bukti bahawa jadual HAFIS mempunyai ketidakkonsistenan dalaman, bukan sebagai anggaran bilangan jemaah.",
  },
  {
    id: "m-bonus-intensity",
    label: "Intensiti bonus",
    plainLabel: "Bonus sebagai peratus keuntungan",
    formula: "bonusAllocation_rm_million ÷ netProfit_rm_million",
    inputs: ["bonus-vs-profit"],
    unit: "%",
    factType: "fact",
    validRange: "2013–2017",
    cannotConclude:
      "Keuntungan bersih yang digunakan sebagai penyebut ialah keuntungan yang DILAPORKAN — yang PwC kemudiannya tunjukkan sepatutnya kerugian bagi 2017. Nisbah ini mengukur justifikasi yang digunakan, bukan keupayaan sebenar.",
  },
  {
    id: "m-bonus-drop",
    label: "Penurunan bonus selepas krisis",
    plainLabel: "Berapa banyak peruntukan bonus turun selepas 2018",
    formula: "purata(2018–2020) ÷ purata(2013–2017) − 1",
    inputs: ["staff-bonus"],
    unit: "%",
    factType: "derived",
    computation:
      "Purata 2013–2017 = (49 + 74 + 65 + 25 + 56.7) ÷ 5 = RM53.94 juta. Purata 2018–2020 = (10.8 + 11.6 + 14.1) ÷ 3 = RM12.17 juta. Penurunan = −77.4%.",
    expectedValue: -77.4,
    assumptions: ["Menggunakan angka 2015 RM65 juta daripada jadual 3.12.7. Menggunakan RM61 juta memberikan −77.2% — perbezaan tidak material."],
    cannotConclude: "Tidak menyesuaikan bilangan kakitangan, yang tidak diberikan.",
  },
  {
    id: "m-deposit-shock",
    label: "Kejutan deposit 2019",
    plainLabel: "Berapa banyak wang keluar selepas hibah 1.25% diumumkan",
    formula: "(69 − 73) ÷ 73",
    inputs: ["deposit-trajectory"],
    unit: "%",
    factType: "derived",
    expectedValue: -5.5,
    absoluteValue_rm_billion: -4,
    cannotConclude:
      "Titik permulaan ialah 'kira-kira RM73 bilion' tanpa tarikh tepat. Kita juga tidak boleh mengasingkan berapa banyak pengeluaran disebabkan kadar hibah berbanding sebab lain. Laporan menyatakan pengecutan tertumpu dalam kalangan pendeposit besar tetapi tidak memberi pecahan.",
  },
  {
    id: "m-deposit-recovery",
    label: "Pemulihan deposit",
    plainLabel: "Berapa cepat deposit pulih selepas kejutan",
    formula: "(88 − 69) ÷ 69",
    inputs: ["deposit-trajectory"],
    unit: "%",
    factType: "derived",
    expectedValue: 27.5,
    period: "Dis 2019 → Mei 2022 (~2.4 tahun)",
    cannotConclude:
      "Pertumbuhan ini termasuk hibah yang dikreditkan semula ke dalam akaun (yang menjadi deposit baharu), bukan hanya wang baharu daripada pendeposit. Laporan secara khusus memberi amaran bahawa pengagihan keuntungan LTH 'bertukar kepada tanggungan/liabiliti apabila ia menjadi sebahagian deposit yang baharu'.",
  },
  {
    id: "m-deposit-per-depositor",
    label: "Purata deposit setiap pendeposit",
    plainLabel: "Purata simpanan setiap orang",
    formula: "deposits_rm_billion × 1,000,000,000 ÷ depositorCount",
    inputs: ["deposit-trajectory", "depositor-counts"],
    unit: "RM",
    factType: "derived",
    computedValues: { "2018 (73b ÷ 9.25j)": 7892, "2022 (88b ÷ 8.6j)": 10233 },
    assumptions: ["Menggunakan titik masa yang paling hampir; tarikh tidak sepadan dengan tepat."],
    cannotConclude:
      "PURATA sangat mengelirukan di sini kerana taburan sangat pincang: 65% pendeposit mempunyai ≤RM2,000 manakala 5% pendeposit memegang 75% deposit. Median akan jauh lebih rendah daripada purata. Paparkan HANYA bersama-sama penunjuk tumpuan.",
  },
  {
    id: "m-guarantee-coverage",
    label: "Liputan jaminan Kerajaan",
    plainLabel: "Berapa besar jaminan deposit berbanding komitmen jaminan Kerajaan yang lain",
    formula: "88,000 (jaminan s.24) berbanding 190,437 (jumlah Komitmen Jaminan 2021)",
    inputs: ["government-guarantee-exposure", "guarantee-commitments"],
    unit: "RM juta",
    factType: "derived",
    expectedValue: 46.2,
    expectedValueUnit: "% daripada jumlah Komitmen Jaminan 2021",
    cannotConclude:
      "Jaminan seksyen 24 TIDAK tersenarai dalam jadual Komitmen Jaminan — hanya Sukuk UJSB (RM21.1 bilion) yang tersenarai. Perbandingan ini menunjukkan skala, BUKAN bahawa jaminan s.24 adalah sebahagian daripada jumlah RM190 bilion itu. Labelkan dengan sangat jelas.",
  },
  {
    id: "m-ujsb-share-of-commitments",
    label: "Bahagian UJSB daripada Komitmen Jaminan",
    plainLabel: "Kedudukan UJSB dalam senarai hutang syarikat kerajaan",
    formula: "ujsb ÷ total",
    inputs: ["guarantee-commitments"],
    unit: "%",
    factType: "fact",
    values: { 2020: 11.1, 2021: 11.1 },
    rank: 4,
    rankNote: "Keempat terbesar selepas DanaInfra, Prasarana dan Malaysia Rail Link.",
  },
  {
    id: "m-funding-shortfall",
    label: "Jurang peruntukan Kerajaan",
    plainLabel: "Berapa banyak wang yang dijanjikan tetapi belum diterima",
    formula: "Dijanjikan setakat 2021 (500 + 1,500) − diterima (500)",
    inputs: ["government-funding"],
    unit: "RM juta",
    factType: "derived",
    expectedValue: 1500,
    validRange: "2020–2021 sahaja",
    cannotConclude:
      "Kita hanya mempunyai dua tahun data. Kita TIDAK boleh menyimpulkan corak kegagalan berterusan daripada satu tahun yang terlepas. Laporan sendiri hanya melaporkan tahun 2021 sebagai tidak diterima.",
  },
  {
    id: "m-cash-vs-value",
    label: "Nisbah tunai kepada nilai aset dipindahkan",
    plainLabel: "Berapa banyak tunai sebenar yang LTH terima berbanding aset yang diserahkan",
    formula: "500 ÷ 9,730 (nilai pasaran) ; 500 ÷ 19,900 (nilai pemindahan)",
    inputs: ["government-funding", "asset-transfer"],
    unit: "%",
    factType: "derived",
    expectedValues: { vsMarketValue: 5.1, vsTransferValue: 2.5 },
    cannotConclude:
      "Ini BUKAN ukuran kerugian. Baki nilai dipegang dalam bentuk Sukuk yang matang pada 2026 dan 2029. Metrik ini mengukur KECAIRAN, bukan nilai.",
  },
  {
    id: "m-disciplinary-duration",
    label: "Tempoh proses tatatertib",
    plainLabel: "Berapa lama tindakan disiplin mengambil masa",
    formula: "Tarikh keputusan Jawatankuasa Tatatertib − tarikh surat representasi",
    inputs: ["disciplinary-actions"],
    unit: "bulan",
    factType: "fact",
    values: { "Kluster 2": 19, "Kluster 3": 15, "Kluster 4": 10 },
    cannotConclude:
      "Tarikh surat representasi tidak diberikan bagi semua pegawai dalam setiap kluster. Angka yang diberikan laporan merujuk kes tertentu sahaja.",
  },
  {
    id: "m-penalty-reduction",
    label: "Kadar pengurangan hukuman di peringkat rayuan",
    plainLabel: "Berapa kerap hukuman disiplin dikurangkan selepas rayuan",
    formula: "Bilangan kluster dengan hukuman dikurangkan ÷ bilangan kluster yang dirayu",
    inputs: ["disciplinary-actions"],
    unit: "nisbah",
    factType: "derived",
    expectedValue: "3 daripada 4 kluster (Kluster 4 dikekalkan)",
    cannotConclude:
      "Saiz sampel sangat kecil (4 kluster, 5 pegawai). Ini BUKAN kadar statistik dan tidak boleh digeneralisasikan.",
  },
  {
    id: "m-investment-exposure",
    label: "Pendedahan pelaburan bermasalah",
    plainLabel: "Berapa banyak wang terlibat dalam setiap pelaburan bermasalah",
    formula: "exposure_rm_million bagi setiap pelaburan",
    inputs: ["problematic-investments"],
    unit: "RM juta",
    factType: "fact",
    status: "TIDAK BOLEH DIJUMLAHKAN",
    cannotConclude:
      "JANGAN jumlahkan lajur ini. Asas berbeza antara kes (kos pemerolehan, jumlah dikeluarkan, nilai pemindahan, jumlah pelaburan). Empat kes utama mempunyai komponen mata wang asing tanpa kadar tukaran. Sebarang jumlah akan mencampurkan asas yang tidak serasi dan memberi angka palsu.",
  },
  {
    id: "m-investment-impairment-rate",
    label: "Kadar rosot nilai",
    plainLabel: "Berapa peratus daripada wang yang dilaburkan sudah dihapus nilainya",
    formula: "impairment_rm_million ÷ exposure_rm_million",
    inputs: ["problematic-investments"],
    unit: "%",
    factType: "derived",
    computableFor: ["emrail", "wellspring", "dssb", "trurich", "abraj", "ppb", "al-fareeda", "th-marine"],
    notComputableFor: ["thip", "al-rawda", "thp", "th-properties", "thhr", "fgv"],
    assumptions: ["Hanya boleh dikira jika KEDUA-DUA pendedahan dan rosot nilai dinyatakan dalam RM."],
    cannotConclude:
      "Nisbah 100% (Trurich, Al-Fareeda) bermakna dihapus kira sepenuhnya, tetapi TIDAK bermakna wang itu hilang selamanya jika litigasi atau pelupusan masih berjalan.",
  },
];

/* ------------------------------------------------------------------ *
 * DIMENSI DAN PENAPIS
 * ------------------------------------------------------------------ */

export const dimensions = [
  { id: "year", label: "Tahun", type: "ordinal", range: [2010, 2030], note: "Liputan berbeza mengikut siri. Sentiasa tunjukkan julat sebenar setiap siri." },
  { id: "period", label: "Fasa", type: "categorical", values: [
    { id: "pre-2014", label: "Sebelum siasatan (≤2013)", years: "≤2013" },
    { id: "crisis-build", label: "Pembinaan krisis (2014–2017)", years: "2014–2017" },
    { id: "rescue", label: "Pendedahan & pemulihan (2018–2019)", years: "2018–2019" },
    { id: "post-rescue", label: "Selepas pemulihan (2020–2022)", years: "2020–2022" },
    { id: "projected", label: "Unjuran (2023–2030)", years: "2023–2030" },
  ] },
  { id: "factType", label: "Jenis maklumat", type: "categorical", values: ["fact", "reportProjection", "thirdPartyEstimate", "derived", "simulation", "opinion", "gap"] },
  { id: "theme", label: "Tema", type: "categorical", values: ["Tadbir urus", "Hibah & kewangan", "Audit & pengawal selia", "Pelaburan", "UJSB & Sukuk", "Haji & HAFIS", "Penguatkuasaan"] },
  { id: "actor", label: "Pihak terlibat", type: "categorical", values: ["LTH", "Lembaga", "Menteri", "Pengurusan", "BNM", "JAN/KAN", "MOF", "UJSB", "PwC", "EY", "Roland Berger", "PDRM", "SPRM", "SC"] },
  { id: "assetClass", label: "Kelas aset", type: "categorical", values: ["Hartanah dan tanah", "Syarikat perladangan", "Ekuiti tersenarai"] },
  { id: "sector", label: "Sektor pelaburan", type: "categorical", values: ["Perladangan", "Hartanah", "Hotel", "Maritim", "Pembinaan", "Teknologi", "Dana"] },
  { id: "geography", label: "Lokasi", type: "categorical", values: ["Malaysia", "Indonesia", "Arab Saudi", "Australia", "United Kingdom"], note: "Hanya untuk pelaburan; laporan tidak memberi lokasi hartanah individu." },
  { id: "currency", label: "Mata wang", type: "categorical", values: ["RM", "USD", "SR", "AUD"], note: "Tiada kadar tukaran dalam laporan — jangan tukar antara mata wang." },
  { id: "severity", label: "Keterukan", type: "ordinal", values: ["low", "medium", "high", "critical"] },
  { id: "track", label: "Lorong kronologi", type: "categorical", values: ["governance", "financial", "audit", "rescue", "investment", "enforcement", "hajj", "inquiry"] },
];

export const filters = [
  { id: "f-year-range", label: "Julat tahun", control: "range-slider", dimension: "year", default: [2014, 2022], appliesTo: ["timeline", "series", "events"] },
  { id: "f-phase", label: "Fasa", control: "segmented", dimension: "period", default: "all", appliesTo: ["timeline", "series"] },
  { id: "f-fact-type", label: "Tunjukkan hanya", control: "multi-toggle", dimension: "factType", default: ["fact", "derived"], appliesTo: ["all"], note: "Lalai: fakta + terbitan. Unjuran dan simulasi dimatikan secara lalai supaya pembaca tidak keliru." },
  { id: "f-theme", label: "Tema", control: "chips", dimension: "theme", default: "all", appliesTo: ["timeline", "findings", "recommendations"] },
  { id: "f-actor", label: "Pihak", control: "chips", dimension: "actor", default: "all", appliesTo: ["timeline", "entities", "findings"] },
  { id: "f-sector", label: "Sektor", control: "chips", dimension: "sector", default: "all", appliesTo: ["investments"] },
  { id: "f-currency", label: "Mata wang", control: "chips", dimension: "currency", default: "RM", appliesTo: ["investments"], note: "Memaksa pengguna memilih satu mata wang menghalang penjumlahan silang mata wang yang tidak sah." },
  { id: "f-severity", label: "Keterukan", control: "chips", dimension: "severity", default: "all", appliesTo: ["conflicts", "gaps", "timeline"] },
  { id: "f-search", label: "Cari", control: "text", appliesTo: ["all"], note: "Cari nama, syarikat, seksyen laporan, atau nombor perenggan." },
];

/* ------------------------------------------------------------------ *
 * PERBANDINGAN
 * ------------------------------------------------------------------ */

export const comparisons = [
  {
    id: "cmp-reported-vs-restated",
    label: "Seperti dilaporkan vs seperti sepatutnya",
    description: "Keuntungan 2017 RM3,412 juta (dilaporkan) berbanding kerugian RM1,433 juta (piawaian MFRS penuh, PwC).",
    swing_rm_million: 4845,
    why: "Ini perbandingan paling penting dalam keseluruhan laporan — satu angka menjadi terbalik sepenuhnya.",
    validity: "Sah. Kedua-dua angka merujuk tahun kewangan yang sama daripada sumber yang sama (jadual PwC).",
  },
  {
    id: "cmp-statutory-vs-rav",
    label: "Penyata kewangan vs RAV",
    description: "Aset RM70,317 juta (penyata) berbanding RM74,783 juta (RAV) untuk tahun 2017.",
    gap_rm_million: 4466,
    why: "Menunjukkan berapa banyak nilai 'tambahan' yang dicipta oleh kaedah penilaian dalaman.",
    validity: "Sah — kedua-duanya dalam jadual yang sama di 3.9.12.",
  },
  {
    id: "cmp-hibah-before-after",
    label: "Kadar hibah sebelum dan selepas krisis",
    description: "Purata 2014–2017 (kadar tahunan sahaja): 5.00%. Purata 2018–2021: 2.63%. Termasuk hibah haji, purata 2014–2017 ialah 7.06%.",
    why: "Menunjukkan magnitud penyesuaian yang terpaksa dibuat.",
    validity: "Sah tetapi mesti dilabel sama ada hibah haji dimasukkan.",
    factType: "derived",
  },
  {
    id: "cmp-lth-vs-islamic-banks",
    label: "LTH berbanding bank Islam",
    description:
      "Suruhanjaya menyatakan pendeposit LTH dibayar hibah lebih tinggi berbanding kadar deposit bank Islam, walaupun deposit LTH dijamin Kerajaan, patuh syariah, zakat dibayar LTH, dan sebahagian keuntungan digunakan untuk subsidi haji.",
    validity:
      "TIDAK BOLEH DIVISUALKAN. Laporan TIDAK memberikan kadar deposit bank Islam untuk mana-mana tahun. Hanya sasaran polisi 2018 (50–100 mata asas di atas purata) yang diberikan.",
    factType: "gap",
  },
  {
    id: "cmp-lth-vs-asb-epf",
    label: "LTH berbanding ASB dan KWSP",
    description:
      "Suruhanjaya mendapati LTH meletakkan dirinya dalam kelompok yang sama dengan Amanah Saham Bumiputera dan KWSP dalam pengagihan keuntungan, walaupun peranan, fungsi dan ciri-cirinya berbeza.",
    validity:
      "TIDAK BOLEH DIVISUALKAN. Tiada kadar ASB atau KWSP diberikan dalam laporan. Jika dashboard mahu menunjukkannya, ia memerlukan sumber luar — dan itu MESTI dilabel sebagai data luar laporan.",
    factType: "gap",
  },
  {
    id: "cmp-transfer-vs-market-2018",
    label: "Nilai pemindahan vs nilai pasaran (Dis 2018)",
    description: "RM19,900 juta berbanding RM9,729 juta — premium RM10,171 juta.",
    validity: "Sah untuk agregat. Untuk hartanah dan perladangan, 'nilai pasaran' sama dengan nilai buku — labelkan.",
  },
  {
    id: "cmp-transfer-vs-market-2021",
    label: "Nilai pemindahan hartanah vs nilai pasaran (Dis 2021)",
    description: "RM2,246.7 juta berbanding RM1,202.7 juta — hakisan RM1,044.0 juta (−46.5%).",
    validity: "Sah, tetapi jurang tiga tahun merangkumi kesan Covid-19.",
  },
  {
    id: "cmp-rofr-vs-market",
    label: "Harga ROFR vs harga pasaran",
    description: "Tujuh daripada sembilan tawaran ROFR pada premium (2.4% hingga 40.6%); dua pada diskaun (−3.2%, −4.1%).",
    validity: "Sah — kedua-dua harga dalam jadual yang sama pada tarikh yang sama.",
  },
  {
    id: "cmp-bluechip-price-vs-value",
    label: "Kejatuhan harga seunit vs kejatuhan nilai agregat",
    description:
      "Contoh TM: harga seunit jatuh 60.9% tetapi nilai agregat jatuh 55.4%. Perbezaan ini WUJUD kerana bilangan unit tersirat tidak konsisten dalam jadual.",
    validity:
      "Paparkan KEDUA-DUANYA dengan nota amaran. Perbandingan ini sebenarnya mendedahkan ketidakkonsistenan data, dan itu sendiri adalah penemuan.",
  },
  {
    id: "cmp-hafis-b40",
    label: "Beban HAFIS: B40 vs bukan B40 (2022)",
    description: "B40 (RM10,980): HAFIS 57.0% daripada kos. Bukan B40 (RM12,980): HAFIS 49.2%.",
    validity: "Sah dan penting — ia menjelaskan mengapa dua peratus berbeza muncul dalam laporan untuk tahun yang sama.",
    factType: "derived",
  },
  {
    id: "cmp-min-deposit",
    label: "Deposit minimum sekarang vs dicadangkan",
    description: "RM1,300 berbanding RM12,980 — kenaikan 9.98 kali ganda; tempoh menunggu turun daripada 130–135 tahun kepada 33 tahun.",
    validity:
      "Angka tempoh menunggu ialah anggaran model EY menggunakan RM9,980, bukan ukuran. Laporan memberi dua nilai berbeza (130 dan 135).",
  },
  {
    id: "cmp-bonus-vs-solvency",
    label: "Bonus dibayar vs kedudukan kesolvenan",
    description:
      "Pada tahun-tahun yang aset kurang daripada liabiliti (2016: −RM1,260j pra-agihan; 2017: −RM769j pra-agihan), LTH tetap membayar bonus kakitangan RM25 juta dan RM56.7 juta.",
    validity:
      "Sah dan kuat. Suruhanjaya sendiri membuat kaitan ini: 'pemberian bonus dengan jumlah yang tinggi oleh LTH adalah tidak wajar'.",
    factType: "derived",
  },
];

/* ------------------------------------------------------------------ *
 * SPESIFIKASI SIMULASI (parameter sahaja — tiada nombor direka)
 * ------------------------------------------------------------------ */

export const simulations = [
  {
    id: "sim-hafis",
    label: "Apa jadi jika bayaran haji berubah?",
    plainLabel: "Cuba ubah bayaran haji dan lihat kesannya kepada subsidi",
    baseData: "hafis-projection",
    parameters: [
      { id: "pilgrimPayment_rm", label: "Bayaran haji seorang", min: 9980, max: 37729, step: 500, default: 12980, note: "Nilai lalai ialah kadar bukan-B40 2022. RM10,980 ialah kadar B40." },
      { id: "pilgrimCount", label: "Bilangan jemaah setahun", min: 10000, max: 60000, step: 1000, default: 30000, note: "Lalai 30,000 ialah andaian tersirat dalam unjuran laporan. Laporan juga menyatakan kuota dijangka 60,000 menjelang 2030." },
      { id: "costGrowthOverride_pct", label: "Kadar kenaikan kos haji", min: 0, max: 12, step: 0.5, default: null, note: "Kosongkan untuk menggunakan unjuran kos haji laporan." },
    ],
    formula:
      "hafisPerPerson = max(0, hajjCost − pilgrimPayment); hafisTotal = hafisPerPerson × pilgrimCount; hafisShare = hafisPerPerson ÷ hajjCost",
    outputLabels: {
      hafisPerPerson: "Subsidi seorang jemaah",
      hafisTotal: "Jumlah subsidi setahun",
      hafisShare: "Bahagian kos yang ditanggung LTH",
    },
    mandatoryDisclaimer:
      "Ini SIMULASI yang anda cipta, bukan unjuran Suruhanjaya. Ia mengandaikan kos haji mengikut unjuran LTH dan tidak mengambil kira perubahan dasar, inflasi luar jangka, atau perubahan kadar tukaran.",
    factType: "simulation",
  },
  {
    id: "sim-hibah-capacity",
    label: "Apa jadi jika hibah mengikut kapasiti sebenar?",
    plainLabel: "Lihat berapa hibah yang boleh dibayar jika mengikut syarat undang-undang",
    baseData: "assets-liabilities",
    parameters: [
      { id: "complianceMode", label: "Kaedah", control: "select", options: [
        { id: "strict", label: "Ketat (seksyen 22(3)(a))", description: "Hibah = 0 jika aset kurang daripada liabiliti; jika tidak, hibah maksimum = lebihan pra-agihan." },
        { id: "actual", label: "Seperti berlaku", description: "Hibah sebenar yang dibayar." },
      ], default: "strict" },
    ],
    formula: "maxHibah = max(0, surplusPreDistribution); gap = actualDistribution − maxHibah",
    expectedOutput: {
      2014: { maxHibah: 2885, actual: 3237, gap: 352 },
      2015: { maxHibah: 134, actual: 3220, gap: 3086 },
      2016: { maxHibah: 0, actual: 2871, gap: 2871 },
      2017: { maxHibah: 0, actual: 3324, gap: 3324 },
      cumulativeGap: 9633,
    },
    mandatoryDisclaimer:
      "Simulasi ini menggunakan ujian seksyen 22(3)(a) sahaja. Syarat kedua di bawah 22(3)(b) tidak boleh diuji kerana Perbendaharaan tidak pernah menetapkan peratusan rizab minima. Jurang kumulatif RM9.63 bilion mengukur pelanggaran berkanun kumulatif, BUKAN kekurangan kunci kira-kira (RM4.09 bilion pada akhir 2017).",
    factType: "simulation",
  },
  {
    id: "sim-sukuk",
    label: "Apa jadi jika peruntukan Kerajaan berubah?",
    plainLabel: "Lihat kesan jika Kerajaan bayar lebih atau kurang setiap tahun",
    baseData: "ujsb-sukuk",
    parameters: [
      { id: "annualAllocation_rm_billion", label: "Peruntukan tahunan Kerajaan", min: 0, max: 4, step: 0.1, default: 1.73, note: "RM1.73 bilion ialah jumlah yang diluluskan Jemaah Menteri. Sifar mewakili tahun 2021 yang terlepas." },
      { id: "startYear", label: "Tahun mula", min: 2022, max: 2029, step: 1, default: 2022 },
    ],
    formula:
      "cumulativeAllocation(t) = annualAllocation × (t − startYear + 1); shortfallAtMaturity(2026) = 13.2 − cumulativeAllocation(2026) − 0.2 (penebusan awal 2020); shortfallAtMaturity(2029) = 27.5 − cumulativeAllocation(2029) − 0.2",
    mandatoryDisclaimer:
      "Simulasi ini mengabaikan hasil pelupusan aset UJSB (yang laporan tidak berikan angka bagi 75 kaunter yang dijual) dan pilihan 'Redemption in Kind'. Ia menunjukkan hanya laluan tunai, bukan keseluruhan struktur penebusan.",
    knownConstraints: [
      "UJSB menerima RM500 juta pada 2020 (RM200 juta digunakan untuk penebusan awal Sukuk).",
      "UJSB TIDAK menerima RM1.5 bilion pada 2021.",
      "Pendapatan portfolio UJSB RM200–300 juta setahun digunakan untuk operasi UJSB, bukan penebusan.",
    ],
    factType: "simulation",
  },
  {
    id: "sim-impairment",
    label: "Apa jadi jika ambang rosot nilai berbeza?",
    plainLabel: "Lihat kesan ambang rosot nilai ke atas keuntungan 2017",
    baseData: "impairment-policy-2017",
    parameters: [
      { id: "threshold_pct", label: "Ambang rosot nilai (% di bawah kos)", control: "select", options: [70, 85, 90], default: 90, note: "Hanya tiga nilai ini boleh disimulasikan kerana hanya tiga senario diberikan laporan." },
    ],
    formula: "impairmentImpact daripada jadual; adjustedProfit = reportedProfit − impairmentImpact",
    mandatoryDisclaimer:
      "Hanya tiga ambang (70%, 85%, 90%) mempunyai angka dalam laporan. Ambang FRSIC 14 (20%) TIDAK boleh disimulasikan kerana laporan tidak memberikan kesan rosot nilai pada ambang tersebut. Jangan interpolasi antara titik — hubungan antara ambang dan rosot nilai tidak linear.",
    factType: "simulation",
    hardLimit: "Interpolasi DILARANG. Hanya tiga titik diskret.",
  },
  {
    id: "sim-min-deposit",
    label: "Apa jadi jika deposit minimum pendaftaran haji dinaikkan?",
    plainLabel: "Lihat kesan menaikkan simpanan minimum untuk mendaftar haji",
    baseData: "hajj-registration-policy",
    parameters: [
      { id: "minDeposit_rm", label: "Deposit minimum", min: 1300, max: 25000, step: 100, default: 12980 },
    ],
    formula: "topUpRequired = fullPayment − minDeposit",
    mandatoryDisclaimer:
      "Kesan ke atas TEMPOH MENUNGGU tidak boleh disimulasikan. Laporan hanya memberi dua titik (130–135 tahun pada RM1,300; 33 tahun pada RM12,980) dan menyatakan EY menggunakan RM9,980 dalam pengiraannya. Model asas EY tidak didedahkan, jadi sebarang nilai antara dua titik itu adalah rekaan.",
    hardLimit: "Interpolasi tempoh menunggu DILARANG.",
    factType: "simulation",
  },
];

/**
 * Metrik yang SENGAJA TIDAK disediakan, dan sebabnya.
 * Ini menghalang entiti hiliran daripada 'melengkapkan' analisis dengan rekaan.
 */
export const deliberatelyOmittedMetrics = [
  { id: "omit-total-loss", label: "Jumlah kerugian LTH", reason: "Tiada asas yang konsisten. Lihat `q-cost-to-public` dan `q-investment-losses`." },
  { id: "omit-roi", label: "Pulangan atas pelaburan (ROI) LTH", reason: "Tiada data pendapatan pelaburan tahunan atau nilai portfolio." },
  { id: "omit-portfolio-mix", label: "Komposisi portfolio mengikut kelas aset", reason: "Tiada data SAA atau pecahan portfolio dalam laporan." },
  { id: "omit-reserve-series", label: "Trend rizab", reason: "Tiada nilai RM rizab untuk mana-mana tahun kecuali sasaran RM3.5 bilion (2019)." },
  { id: "omit-benchmark", label: "Perbandingan dengan ASB/KWSP/bank Islam", reason: "Tiada kadar pihak ketiga dalam laporan. Memerlukan sumber luar." },
  { id: "omit-inflation-adjusted", label: "Angka diselaraskan inflasi", reason: "Tiada indeks harga pengguna dalam laporan. Memerlukan sumber luar." },
  { id: "omit-per-capita", label: "Kesan setiap pendeposit", reason: "Taburan deposit terlalu pincang (5% memegang 75%) — purata akan mengelirukan." },
  { id: "omit-fx-consolidated", label: "Pendedahan pelaburan asing dalam RM", reason: "Tiada kadar tukaran USD/SR/AUD dalam laporan." },
  { id: "omit-implementation", label: "Progres pelaksanaan syor", reason: "Laporan bertarikh Julai 2022; tiada data pelaksanaan." },
];
