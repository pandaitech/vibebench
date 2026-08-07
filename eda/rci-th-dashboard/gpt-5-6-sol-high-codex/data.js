window.TH_DATA = {
  source: "https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md",
  financial: [
    { year: 2013, assets: 48778, liabilities: 43696, pre: 5082, distribution: 2632, post: 2450 },
    { year: 2014, assets: 54751, liabilities: 51866, pre: 2885, distribution: 3237, post: -352 },
    { year: 2015, assets: 60196, liabilities: 60062, pre: 134, distribution: 3220, post: -3086 },
    { year: 2016, assets: 64321, liabilities: 65581, pre: -1260, distribution: 2871, post: -4131 },
    { year: 2017, assets: 70317, liabilities: 71086, pre: -769, distribution: 3324, post: -4093 }
  ],
  impairmentPolicies: [
    { threshold: "Jatuh >70% dan >24 bulan", impact: 1313, note: "Polisi pertama yang dinilai PwC" },
    { threshold: "Jatuh >85%", impact: 171, note: "Polisi diubah pada 2017" },
    { threshold: "Jatuh >90%", impact: 1, note: "Polisi kedua dalam tahun yang sama" }
  ],
  adjusted2017: {
    reportedProfit: 3412,
    equityImpairment: -4258,
    debtImpairment: -7,
    otherAdjustments: -580,
    adjustedLoss: -1433,
    retainedEarnings: 162,
    retainedAdjustments: -4845,
    accumulatedLoss: -4683
  },
  hibah: [
    { year: 2014, annual: 6.25, hajj: 2.00, payout: 3237.196, note: "Agihan melebihi lebihan sebelum hibah sebanyak RM352 juta." },
    { year: 2015, annual: 5.00, hajj: 3.00, payout: 3220.374, note: "Lebihan sebelum hibah hanya RM134 juta; selepas agihan, jurang menjadi RM3.09 bilion." },
    { year: 2016, annual: 4.25, hajj: 1.50, payout: 2870.822, note: "Aset sudah RM1.26 bilion lebih rendah daripada liabiliti sebelum agihan." },
    { year: 2017, annual: 4.50, hajj: 1.75, payout: 3323.741, note: "RCI menyatakan agihan dibuat tanpa mengambil kira sepenuhnya rosot nilai dan kejatuhan nilai saksama." },
    { year: 2018, annual: 1.25, hajj: 0, payout: 922.959, note: "Kadar jatuh selepas penstrukturan dan pemakaian piawaian perakaunan berkaitan." },
    { year: 2019, annual: 3.05, hajj: 0, payout: 2140.538, note: "Deposit dilapor mengecil daripada sekitar RM73b sebelum pengumuman kepada RM69b pada hujung 2019." },
    { year: 2020, annual: 3.10, hajj: 0, payout: 2242.141, note: "Deposit pulih kepada kira-kira RM76b pada hujung 2020." },
    { year: 2021, annual: 3.10, hajj: 0, payout: null, note: "Kadar dinyatakan dalam laporan; jumlah agihan tidak terdapat dalam jadual 2014–2020." }
  ],
  hafisActual: [
    { year: 2014, cost: 16155, payment: 9980, hafis: 6175, share: 38.0, total: 106, kind: "Fakta" },
    { year: 2015, cost: 17270, payment: 9980, hafis: 7290, share: 42.0, total: 135, kind: "Fakta" },
    { year: 2016, cost: 18890, payment: 9980, hafis: 8910, share: 47.0, total: 160, kind: "Fakta" },
    { year: 2017, cost: 19550, payment: 9980, hafis: 9570, share: 49.0, total: 298, kind: "Fakta" },
    { year: 2018, cost: 22450, payment: 9980, hafis: 12470, share: 56.0, total: 314, kind: "Fakta" },
    { year: 2019, cost: 22900, payment: 9980, hafis: 12920, share: 56.0, total: 299, kind: "Fakta" }
  ],
  hafisProjection: [
    { year: 2022, cost: 25540, payment: 12980, hafis: 12560, share: 49.2, total: 376.80, kind: "Unjuran laporan" },
    { year: 2023, cost: 26280, payment: 12980, hafis: 13300, share: 50.6, total: 399.00, kind: "Unjuran laporan" },
    { year: 2024, cost: 28160, payment: 12980, hafis: 15180, share: 53.9, total: 455.40, kind: "Unjuran laporan" },
    { year: 2025, cost: 29570, payment: 12980, hafis: 16590, share: 56.1, total: 497.70, kind: "Unjuran laporan" },
    { year: 2026, cost: 31040, payment: 12980, hafis: 18060, share: 58.2, total: 541.80, kind: "Unjuran laporan" },
    { year: 2027, cost: 32592, payment: 12980, hafis: 19612, share: 60.2, total: 588.36, kind: "Unjuran laporan" },
    { year: 2028, cost: 34221, payment: 12980, hafis: 21241, share: 62.1, total: 637.23, kind: "Unjuran laporan" },
    { year: 2029, cost: 35932, payment: 12980, hafis: 22952, share: 63.9, total: 688.56, kind: "Unjuran laporan" },
    { year: 2030, cost: 37729, payment: 12980, hafis: 24749, share: 65.6, total: 742.47, kind: "Unjuran laporan" }
  ],
  transfers: [
    { id: "all", name: "Semua aset", book: 18981, transfer: 19900, market: 9729 },
    { id: "property", name: "Hartanah & tanah", book: 1411, transfer: 2247, market: 1411 },
    { id: "plantation", name: "Syarikat perladangan", book: 718, transfer: 802, market: 718 },
    { id: "equity", name: "Ekuiti tersenarai", book: 16852, transfer: 16851, market: 7600 }
  ],
  bluechips: [
    { name: "Axiata", transferUnit: 6.00, market2018: 3.63, market2022: 3.04, drop2018: 39.5, valueDrop: 490.802 },
    { name: "Maxis", transferUnit: 6.84, market2018: 5.43, market2022: 3.52, drop2018: 20.6, valueDrop: 198.198 },
    { name: "MISC", transferUnit: 7.43, market2018: 6.15, market2022: 7.30, drop2018: 17.2, valueDrop: 47.607 },
    { name: "Digi", transferUnit: 5.13, market2018: 4.24, market2022: 3.27, drop2018: 17.3, valueDrop: 75.912 },
    { name: "TM", transferUnit: 5.96, market2018: 2.33, market2022: 5.20, drop2018: 60.9, valueDrop: 133.553 }
  ],
  investments: [
    { id:"thip", name:"PT TH Indo Plantations", place:"Indonesia", region:"Luar negara", sector:"Perladangan", status:"Siasatan", severity:5, signal:"USD178.6j pendahuluan", sortValue:178.6, currency:"USD", metric:"Harga asal USD910j dikurangkan USD100j", issue:"Pegangan 95% dipindahkan sebelum bayaran penuh; jadual bayaran tidak dipatuhi dan LTH memberi pendahuluan yang sepatutnya dilunaskan pembeli.", action:"Siasatan dalaman, peguam forensik dan laporan polis; siasatan masih berjalan ketika laporan disediakan.", page:177 },
    { id:"emrail", name:"Emrail Sdn. Bhd.", place:"Malaysia", region:"Malaysia", sector:"Infrastruktur", status:"Timbang tara", severity:3, signal:"RM19.3j rosot nilai", sortValue:19.3, currency:"RM", metric:"RM20.17j pembelian; hanya RM2j dibayar balik", issue:"Penyenaraian awam dibatalkan dan sasaran keuntungan RM36.1j tidak dicapai. Baki opsyen jual belum dilangsaikan.", action:"Kes diarahkan ke timbang tara AIAC; proses pemilihan penimbang tara sedang dibuat.", page:178 },
    { id:"wellspring", name:"Wellspring Worldwide", place:"Malaysia", region:"Malaysia", sector:"Ekuiti persendirian", status:"Mahkamah", severity:3, signal:"RM19.03j rosot nilai", sortValue:19.03, currency:"RM", metric:"RM18.4j pelaburan bagi 10% ekuiti", issue:"Syarikat gagal disenaraikan dan pihak penganjur gagal membayar pelaksanaan opsyen jual.", action:"Mahkamah mengarahkan bayaran RM20.8j; notis kebankrapan kemudian dibenarkan.", page:179 },
    { id:"dssb", name:"Deru Semangat Sdn. Bhd.", place:"Malaysia", region:"Malaysia", sector:"Perladangan", status:"Penyelesaian", severity:4, signal:"RM257j turun kepada RM32j", sortValue:225, currency:"RM", metric:"Komitmen asal RM526.16j", issue:"Pembangunan ladang melibatkan isu polisi NDPE; nilai ekuiti dan pembiayaan yang telah dikeluarkan merosot besar, dengan baki komitmen masih berisiko.", action:"Pegangan dirungkai dengan pembayaran RM259j; baki komitmen RM258j diketepikan.", page:180 },
    { id:"trurich", name:"Trurich Resources Sdn. Bhd.", place:"Indonesia", region:"Luar negara", sector:"Perladangan", status:"Pelupusan", severity:5, signal:"RM364.31j dirosot nilai penuh", sortValue:364.31, currency:"RM", metric:"USD179j baki pinjaman Maybank", issue:"Usaha sama perladangan tidak memberikan hasil dan menjadi tidak solven.", action:"Laporan polis dibuat; pelupusan anak syarikat diluluskan dan rundingan akhir dengan pembeli sedang berjalan.", page:181 },
    { id:"abraj", name:"Abraj Sdn. Bhd.", place:"Malaysia", region:"Malaysia", sector:"Hartanah", status:"Selesai", severity:2, signal:"RM40.25j rosot nilai", sortValue:40.25, currency:"RM", metric:"Daripada RM85j pegangan ekuiti", issue:"Usaha sama tidak mampu menjana pendapatan untuk membayar pinjaman selepas penyewa utama berpindah.", action:"Amanah Raya membeli 50% pegangan LTH pada Disember 2020.", page:182 },
    { id:"ppb", name:"Putrajaya Perdana Berhad", place:"Malaysia", region:"Malaysia", sector:"Pembinaan", status:"Rundingan", severity:4, signal:"RM145.3j rosot nilai", sortValue:145.3, currency:"RM", metric:"RM193.5j pelaburan; nilai buku bersih RM48.2j", issue:"Syarikat gagal disenaraikan dan gagal mencapai sasaran keuntungan; pihak penjual tidak membayar opsyen jual RM210.7j.", action:"Cadangan pengaturan penyelesaian sedang melalui kelulusan dalaman.", page:183 },
    { id:"rawda", name:"Al-Rawda", place:"Arab Saudi", region:"Luar negara", sector:"Hotel", status:"Mahkamah", severity:5, signal:"RM202.8j kerugian kredit", sortValue:202.8, currency:"RM", metric:"SR560.7j sewa tertunggak pada 2021", issue:"Pengendali empat hotel gagal membayar sewa; pertikaian melibatkan nota janji, timbang tara dan aset penjamin.", action:"Penguatkuasaan, likuidasi aset, rundingan dan timbang tara dijalankan serentak; tambahan rosot nilai RM184j dijangka.", page:184 },
    { id:"fareeda", name:"Al-Fareeda Residential Fund", place:"Arab Saudi", region:"Luar negara", sector:"Hartanah", status:"Hapus kira", severity:4, signal:"SR76j kerugian", sortValue:76, currency:"SR", metric:"Bersamaan RM63j ketika dilabur", issue:"Dana terjejas oleh isu buruh, imigresen, kontraktor, kos binaan dan harga minyak; pengurus dana tidak dapat dikesan.", action:"Pelaburan dihapus kira sepenuhnya.", page:188 },
    { id:"thp", name:"TH Plantations Berhad", place:"Malaysia", region:"Malaysia", sector:"Perladangan", status:"Siasatan", severity:4, signal:"RM170j rosot nilai", sortValue:170, currency:"RM", metric:"Hanya 58% ladang produktif", issue:"PwC mengenal pasti kegagalan tanggungjawab fidusiari berkaitan beberapa pengambilalihan; pembelian ladang dibiayai terutamanya melalui sukuk RM1.2b.", action:"Laporan kepada PDRM, SPRM dan SC; siasatan PDRM dan SC masih berjalan.", page:188 },
    { id:"thprop", name:"TH Properties Sdn. Bhd.", place:"Malaysia", region:"Malaysia", sector:"Hartanah", status:"Tuntutan semula", severity:2, signal:"RM2.2j bonus istimewa", sortValue:2.2, currency:"RM", metric:"Bayaran 2017 & 2018", issue:"Bonus kepada pengurusan dan ahli lembaga diluluskan tanpa mematuhi mandat dan tanpa kelulusan LTH sebagai pemegang saham utama.", action:"Siasatan dalaman dan keputusan untuk mendapatkan semula bonus.", page:189 },
    { id:"marine", name:"Alam Maritim / TH Marine", place:"Malaysia", region:"Malaysia", sector:"Maritim", status:"Penilaian", severity:5, signal:"RM278j dirosot nilai", sortValue:278, currency:"RM", metric:"RM334j jumlah pelaburan; RM70.4j dijangka pulih", issue:"Keseluruhan ekuiti RM198j dan RM80j daripada pembiayaan RM136j telah dirosot nilai.", action:"PwC dilantik menilai kebolehpulihan pelaburan.", page:190 },
    { id:"thhr", name:"TH Hotel & Residences", place:"Malaysia", region:"Malaysia", sector:"Hotel", status:"Pemulihan", severity:2, signal:"Hasil sewa jatuh 62%", sortValue:10.3, currency:"RM", metric:"RM16.5j (2019) → RM6.2j (2020)", issue:"Lima hotel dan kompleks haji yang berpulangan rendah dipindahkan; aset selebihnya mengalami kejatuhan hasil sewa.", action:"Sebahagian aset dipindahkan kepada UJSB di bawah pelan pemulihan.", page:191 },
    { id:"fgv", name:"FGV Berhad", place:"Malaysia", region:"Malaysia", sector:"Perladangan", status:"Dipindah UJSB", severity:5, signal:"RM1.059b rugi tidak nyata", sortValue:1058.94, currency:"RM", metric:"Harga kos RM4.62/unit; pasaran sekitar RM0.69 pada Feb 2022", issue:"LTH terus memegang saham ketika harga jatuh dengan ketara. Laporan mempersoalkan mengapa pegangan tidak dijual lebih awal.", action:"283.71j saham diambil alih UJSB pada nilai kos; RCI menyatakan ini mengelakkan kira-kira RM1.1b kerugian di LTH.", page:192 }
  ],
  story: [
    { id:"mandate", n:"01", type:"Konteks", title:"Mandat melebar", short:"Daripada simpanan haji kepada ‘tonggak ekonomi ummah’.", detail:"RCI menyatakan peluasan visi membawa LTH ke hartanah dan perladangan berskala besar walaupun kepakaran dinilai terhad.", page:22 },
    { id:"return", n:"02", type:"Tekanan", title:"Hibah dikejar tinggi", short:"Pulangan tinggi menarik deposit tetapi membina jangkaan.", detail:"RCI menyatakan tekanan mengekalkan hibah mendorong risiko pelaburan lebih tinggi dan mengurangkan rizab.", page:20 },
    { id:"accounting", n:"03", type:"Kaedah", title:"Nilai aset dipertikai", short:"RAV dan polisi rosot nilai mengubah gambaran akaun.", detail:"Pada 2017 polisi rosot nilai berubah daripada ambang 70% kepada 85% dan 90%, mengurangkan kesan rosot nilai yang direkodkan.", page:147 },
    { id:"gap", n:"04", type:"Dapatan", title:"Jurang terserlah", short:"Selepas hibah 2017: aset bersih −RM4.09b.", detail:"Analisis PwC yang dipetik RCI menunjukkan kekurangan selepas agihan sejak 2014, dan kerugian terlaras RM1.43b bagi 2017.", page:147 },
    { id:"transfer", n:"05", type:"Pemulihan", title:"Aset dipindahkan", short:"Nilai pasaran RM9.73b dipindah pada RM19.9b.", detail:"Premium menutup jurang LTH pada masa itu. UJSB menerima 106 saham, satu syarikat ladang dan 29 hartanah.", page:156 },
    { id:"sukuk", n:"06", type:"Risiko baharu", title:"Sukuk menangguh tekanan", short:"RM27.5b nilai matang; RM7.65b ialah hasil tertangguh.", detail:"RCI memberi amaran bahawa pendapatan akruan tidak bersandarkan tunai dan penebusan bergantung kepada sokongan Kerajaan serta prestasi aset UJSB.", page:166 },
    { id:"public", n:"07", type:"Pendedahan", title:"Risiko beralih ke awam", short:"Deposit dijamin Kerajaan di bawah seksyen 24.", detail:"Jika LTH tidak mampu memenuhi pengeluaran, wang Kumpulan Wang Disatukan boleh digunakan sebagai pinjaman kepada LTH.", page:102 }
  ],
  recommendations: [
    { area:"Pelantikan", title:"Kriteria kepakaran yang jelas", plain:"Tetapkan syarat kewangan, perniagaan, ekonomi atau perakaunan untuk ahli Lembaga; larang ahli politik aktif.", page:28 },
    { area:"Kawal selia", title:"Pisahkan mandat menteri", plain:"Hal haji kepada Menteri Agama; kewangan, dana dan pelaburan kepada Menteri Kewangan.", page:29 },
    { area:"Pelaburan", title:"Wujudkan Dana Haji", plain:"Jabatan pelaburan profesional dalam LTH yang dikawal selia Suruhanjaya Sekuriti.", page:29 },
    { area:"Hibah", title:"Guna akaun yang telah diaudit", plain:"Jangan guna RAV atau laporan proforma sebagai asas mengisytiharkan hibah.", page:30 },
    { area:"Audit", title:"Audit oleh firma swasta", plain:"RCI menyarankan pengauditan LTH tidak lagi dipertanggungjawabkan kepada JAN.", page:30 },
    { area:"Risiko", title:"Hadkan pelaburan strategik", plain:"Fokus pada portfolio dana dan elak pelaburan berisiko tinggi yang diklasifikasikan strategik.", page:34 },
    { area:"Haji", title:"Sasar bantuan kepada yang perlu", plain:"Bantuan atau subsidi haji dicadangkan hanya kepada jemaah yang memerlukan.", page:33 },
    { area:"Deposit", title:"Naikkan minimum pendaftaran", plain:"RCI mencadangkan RM1,300 dinaikkan kepada bayaran semasa RM12,980; anggaran masa menunggu turun 130 ke 33 tahun.", page:33 },
    { area:"Pemulihan", title:"Pastikan RM1.73b setahun", plain:"Kerajaan disaran menyediakan peruntukan tahunan bagi penebusan awal sukuk UJSB.", page:32 },
    { area:"Siasatan", title:"Audit forensik 14 pelaburan", plain:"Teliti bagaimana keputusan lalu menghasilkan kejatuhan nilai aset yang teruk.", page:30 }
  ],
  timeline: [
    { date:"2012–2016", type:"Amaran", title:"Rizab digunakan", text:"Laporan RB mendapati rizab digunakan membayar hibah pada 2012, 2014 dan 2016.", page:104 },
    { date:"2014", type:"Kewangan", title:"Kekurangan bermula selepas hibah", text:"Analisis PwC: lebihan RM2.885b menjadi kekurangan RM352j selepas agihan.", page:112 },
    { date:"23 Dis 2015", type:"Amaran", title:"BNM menulis kepada Menteri", text:"Isu deposit, kecairan dan keupayaan hibah dibangkitkan.", page:99 },
    { date:"2016", type:"Akad", title:"Akad bertukar kepada Wadi'ah", text:"RCI menyatakan tiada penjelasan atau kajian menyeluruh ditemui.", page:107 },
    { date:"2017", type:"Kewangan", title:"Polisi rosot nilai diubah dua kali", text:"Ambang berubah 70% → 85% → 90%; kesan dianggarkan jatuh RM1.313b → RM1j.", page:147 },
    { date:"7 Feb 2018", type:"Hibah", title:"Kaedah baki tahunan ditarik balik", text:"Penggunaan semula baki bulanan menambah kira-kira RM600j bayaran hibah.", page:115 },
    { date:"16 Jul 2018", type:"Audit", title:"Emphasis of Matter", text:"KAN menegur polisi rosot nilai tidak konsisten dan RM227.81j tidak direkod.", page:146 },
    { date:"30 Nov 2018", type:"Pemulihan", title:"Pelan dipersetujui secara dasar", text:"Jemaah Menteri meminta perincian dengan MOF.", page:156 },
    { date:"7 Dis 2018", type:"Pemulihan", title:"Pelan pemulihan diluluskan", text:"Pelaksanaan diarahkan siap sebelum akhir 2018.", page:156 },
    { date:"14 Dis 2018", type:"Pemulihan", title:"UJSB ditubuhkan", text:"SPV diwujudkan untuk menerima aset kurang berdaya saing.", page:24 },
    { date:"27 Dis 2018", type:"Pemulihan", title:"Aset dipindahkan", text:"106 saham, satu syarikat ladang dan 29 hartanah.", page:156 },
    { date:"15 Mei 2019", type:"Pemulihan", title:"Sukuk & ROFR dimeterai", text:"LTH mendapat hak pertama membeli semula aset pada ambang ditetapkan.", page:156 },
    { date:"Dis 2019", type:"Akad", title:"Akad Wakalah digunakan", text:"RCI menyatakan perubahan ini menyelesaikan isu model deposit, zakat dan bantuan haji yang dibangkitkan.", page:109 },
    { date:"30 Nov 2020", type:"Bayaran", title:"RM200j sukuk ditebus awal", text:"Sebahagian daripada geran Kerajaan RM500j tahun 2020.", page:166 },
    { date:"2021", type:"Amaran", title:"RM1.5b tidak diterima UJSB", text:"Keutamaan tunai diberi kepada pemulihan ekonomi akibat Covid-19.", page:166 },
    { date:"21 Mei 2022", type:"Risiko", title:"Liabiliti pendeposit >RM88b", text:"RCI mengaitkan saiz ini dengan risiko jika obligasi sukuk tidak dipenuhi.", page:166 }
  ]
};
