/**
 * Kandungan UI siap guna dalam Bahasa Melayu.
 *
 * Semua teks di sini boleh terus dipaparkan tanpa penulisan semula.
 * Gaya: ayat pendek, perkataan biasa, tiada jargon tanpa penjelasan.
 *
 * Peraturan penulisan yang dipatuhi:
 *   - Angka besar ditulis "RM3.3 bilion", bukan "RM3,323,741,000".
 *   - Setiap tuntutan yang kuat disertai sumber atau kelayakan.
 *   - Tiada perkataan seperti "skandal", "rompakan", "penipuan" melainkan
 *     laporan sendiri menggunakannya. Laporan menggunakan "salah nyataan",
 *     "penyembunyian maklumat", "amalan perakaunan kreatif".
 */

export const appMeta = {
  title: "Laporan RCI Tabung Haji — Penerokaan Data",
  subtitle: "Apa yang berlaku kepada wang pendeposit Tabung Haji, 2014–2020",
  tagline:
    "Setiap angka di sini datang daripada Laporan Suruhanjaya Siasatan Diraja Tabung Haji. Klik mana-mana angka untuk melihat perenggan asalnya.",
  sourceLine:
    "Sumber: Laporan Suruhanjaya Siasatan Diraja bagi Menyiasat Isu Pengurusan dan Operasi Lembaga Tabung Haji dari Tahun 2014 hingga 2020, bertarikh 19 Julai 2022.",
};

/** Kad statistik utama untuk halaman ringkasan. */
export const heroStats = [
  {
    id: "hero-swing",
    value: "RM3.4 bilion untung → RM1.4 bilion rugi",
    label: "Keuntungan 2017 selepas piawaian perakaunan penuh digunakan",
    tooltip:
      "LTH melaporkan untung RM3.4 bilion bagi tahun 2017. PwC mendapati jika piawaian perakaunan MFRS digunakan sepenuhnya, ia sepatutnya kerugian RM1.4 bilion.",
    factType: "thirdPartyEstimate",
    sourceLabel: "Laporan 3.13.11",
    drillTo: "view-accounting",
  },
  {
    id: "hero-shortfall",
    value: "RM4.09 bilion",
    label: "Kekurangan aset berbanding liabiliti pada akhir 2017",
    tooltip:
      "Selepas hibah dibayar, aset LTH kurang RM4.09 bilion berbanding jumlah yang perlu dibayar kepada pendeposit.",
    factType: "fact",
    sourceLabel: "Laporan 3.13.7",
    drillTo: "view-solvency",
  },
  {
    id: "hero-transfer",
    value: "RM19.9 bilion",
    label: "Nilai aset lemah yang dipindahkan kepada UJSB",
    tooltip:
      "Nilai pasaran aset yang sama pada masa itu ialah RM9.7 bilion. Bezanya RM10.2 bilion ditanggung UJSB, sebuah syarikat milik Menteri Kewangan.",
    factType: "fact",
    sourceLabel: "Laporan 3.13.28–3.13.29",
    drillTo: "view-ujsb",
  },
  {
    id: "hero-sukuk",
    value: "RM27.5 bilion",
    label: "Obligasi Sukuk UJSB yang perlu ditebus menjelang 2029",
    tooltip:
      "Ini hampir 31% daripada keseluruhan aset LTH. Sukuk ini tidak membayar tunai setiap tahun — LTH hanya menerima wang pada tarikh matang (2026 dan 2029).",
    factType: "fact",
    sourceLabel: "Laporan 3.13.62",
    drillTo: "view-ujsb",
  },
  {
    id: "hero-guarantee",
    value: "RM88 bilion",
    label: "Nilai jaminan Kerajaan ke atas deposit LTH",
    tooltip:
      "Di bawah seksyen 24 Akta Tabung Haji 1995, jika LTH tidak mampu membayar pengeluaran pendeposit, Kerajaan yang menanggungnya.",
    factType: "fact",
    sourceLabel: "Laporan 3.13.50 / 4.4.15",
    drillTo: "view-ujsb",
  },
  {
    id: "hero-warning",
    value: "3 tahun 11 bulan",
    label: "Jurang antara amaran bertulis pertama BNM dan pendedahan awam",
    tooltip:
      "BNM menulis kepada Pengerusi LTH pada 21 Ogos 2014. Masalah hanya menjadi isu awam selepas teguran Ketua Audit Negara pada 16 Julai 2018.",
    factType: "derived",
    sourceLabel: "Terbitan daripada Laporan 3.6.2 dan 3.11.15",
    drillTo: "view-timeline",
  },
];

/** Tajuk, penerangan dan nota bagi setiap visual. */
export const chartCopy = {
  "chart-solvency-bridge": {
    title: "Aset berbanding liabiliti, sebelum dan selepas hibah dibayar",
    subtitle: "2013–2017, dalam RM juta",
    whatItShows:
      "Setiap tahun ditunjukkan dua kali: kedudukan LTH sebelum hibah dibayar, dan selepas. Garis sifar ialah titik di mana aset sama dengan liabiliti.",
    whyItMatters:
      "Undang-undang (seksyen 22(3)(a) Akta Tabung Haji 1995) hanya membenarkan hibah dibayar jika aset tidak kurang daripada liabiliti. Carta ini menunjukkan bila syarat itu dilanggar.",
    reasonableConclusion:
      "Pada 2016 dan 2017, aset LTH sudah kurang daripada liabiliti SEBELUM sebarang hibah dibayar. Hibah tetap diisytiharkan pada kedua-dua tahun.",
    limits:
      "Angka ini daripada analisis PwC, yang mengelaskan wang pendeposit sebagai liabiliti. Penyata kewangan beraudit yang diterbitkan mengelaskannya sebagai ekuiti sejak 2010, jadi penyata itu menunjukkan gambaran yang berbeza.",
    axisX: "Tahun",
    axisY: "RM juta",
    legend: ["Sebelum agihan hibah", "Selepas agihan hibah"],
    emptyState: "Tiada data untuk julat tahun yang dipilih. Siri ini hanya meliputi 2013 hingga 2017.",
  },
  "chart-hibah-rates": {
    title: "Kadar hibah yang diumumkan setiap tahun",
    subtitle: "2014–2021, dalam peratus",
    whatItShows:
      "Kadar hibah tahunan (untuk semua pendeposit) dan hibah haji (tambahan untuk pendeposit yang layak).",
    whyItMatters:
      "Kadar tinggi 2014–2017 menarik pendeposit yang mencari pulangan tinggi. Suruhanjaya mendapati ini menyebabkan LTH tergelincir daripada matlamat asalnya.",
    reasonableConclusion:
      "Kadar jatuh mendadak daripada 6.25% (2018 untuk tahun 2017) kepada 1.25%, dan hibah haji dihentikan sepenuhnya sejak 2018.",
    limits:
      "Hibah haji ialah kadar TAMBAHAN, bukan kadar untuk semua pendeposit. Jangan tafsir jumlah kedua-dua kadar sebagai pulangan sebenar setiap pendeposit.",
    axisX: "Tahun kewangan",
    axisY: "Kadar (%)",
    legend: ["Hibah tahunan", "Hibah haji"],
    emptyState: "Tiada kadar untuk tahun yang dipilih. Siri ini meliputi 2014 hingga 2021.",
  },
  "chart-hibah-amounts": {
    title: "Jumlah wang yang diagihkan kepada pendeposit",
    subtitle: "2014–2020, dalam RM juta",
    whatItShows: "Jumlah sebenar hibah tahunan dan hibah haji yang dibayar setiap tahun.",
    whyItMatters:
      "Menunjukkan skala sebenar dalam ringgit, bukan hanya peratus. RM3.3 bilion pada 2017 lebih daripada jumlah kekurangan aset pada tahun yang sama.",
    reasonableConclusion:
      "Pembayaran kekal antara RM2.9 bilion dan RM3.3 bilion setahun sepanjang 2014–2017, walaupun kedudukan kewangan LTH semakin merosot.",
    limits: "Tiada data 2021 walaupun kadarnya (3.10%) diberikan dalam laporan.",
    axisX: "Tahun kewangan",
    axisY: "RM juta",
    legend: ["Hibah tahunan", "Hibah haji"],
    emptyState: "Tiada jumlah RM untuk tahun ini. Bagi 2021 laporan hanya memberi kadar, bukan jumlah.",
  },
  "chart-overpayment": {
    title: "Berapa banyak hibah dibayar melebihi syarat undang-undang",
    subtitle: "2014–2017, dalam RM juta",
    whatItShows:
      "Bahagian hibah yang dibayar walaupun syarat seksyen 22(3)(a) tidak dipenuhi. Bagi 2016 dan 2017 seluruh agihan dikira, kerana aset sudah kurang daripada liabiliti sebelum sebarang hibah dibayar.",
    whyItMatters:
      "Ini mengukur jurang antara apa yang undang-undang benarkan dan apa yang sebenarnya dibayar.",
    reasonableConclusion:
      "Jumlah kumulatif RM9.63 bilion dibayar dalam keadaan syarat berkanun tidak dipenuhi sepenuhnya.",
    limits:
      "Ini BUKAN 'wang yang hilang' dan BUKAN jumlah kerugian. Ia mengukur pelanggaran syarat berkanun. Kekurangan sebenar dalam kunci kira-kira pada akhir 2017 ialah RM4.09 bilion, bukan RM9.63 bilion.",
    axisX: "Tahun",
    axisY: "RM juta",
    emptyState: "Metrik ini hanya boleh dikira untuk 2014 hingga 2017.",
    factType: "derived",
  },
  "chart-impairment-scenarios": {
    title: "Kesan ambang rosot nilai ke atas akaun 2017",
    subtitle: "Tiga senario yang diberikan laporan",
    whatItShows:
      "'Rosot nilai' bermaksud mengakui dalam akaun bahawa pelaburan sudah jatuh nilai. Ambang ialah tahap kejatuhan sebelum ia perlu diakui. Semakin longgar ambang, semakin kecil kerugian yang perlu direkod.",
    whyItMatters:
      "LTH mengubah ambang dua kali dalam tahun 2017 sahaja: daripada 70% kepada 85%, kemudian 90%. Ini mengurangkan rosot nilai yang perlu direkod daripada RM1,313 juta kepada RM1 juta.",
    reasonableConclusion:
      "Perubahan ambang menghapuskan RM1,312 juta kerugian daripada akaun 2017.",
    limits:
      "Panduan Institut Akauntan Malaysia (FRSIC 14) menetapkan kerugian signifikan pada penurunan 20% dan berlanjutan pada 12 bulan. Ambang 70% pun sudah jauh lebih longgar. Laporan tidak memberi angka pada ambang 20%, jadi RM1,312 juta ialah had bawah — kesan sebenar mungkin lebih besar.",
    axisX: "Ambang rosot nilai (% di bawah kos)",
    axisY: "Kesan rosot nilai (RM juta)",
    emptyState: "Hanya tiga ambang (70%, 85%, 90%) mempunyai angka dalam laporan.",
    hardRule: "Jangan tarik garis antara tiga titik ini — hubungannya tidak linear dan interpolasi akan mengelirukan.",
  },
  "chart-rav-waterfall": {
    title: "Bagaimana RAV mengubah gambaran kewangan 2017",
    subtitle: "Daripada RM70.3 bilion aset kepada RM373 juta 'boleh diagihkan'",
    whatItShows:
      "RAV bermaksud 'Nilai Aset Boleh Direalisasi' — anggaran dalaman LTH tentang berapa nilai asetnya jika dijual. Carta ini menunjukkan setiap langkah pengiraan.",
    whyItMatters:
      "Tanpa tambahan RAV sebanyak RM4.47 bilion, LTH tidak akan mempunyai apa-apa untuk diagihkan. RAV inilah yang menjustifikasikan pembayaran hibah 2017.",
    reasonableConclusion:
      "Baki 'boleh diagihkan' hanya RM373 juta — jauh lebih kecil daripada RM3.3 bilion hibah yang sebenarnya dibayar pada tahun itu.",
    limits:
      "Tiada piawaian pasaran untuk mengira RAV. Daripada penilaian hartanah TH Plantations sebanyak RM4.6 bilion, hanya RM556 juta (12%) disokong laporan penilai profesional; bakinya adalah anggaran pengurusan.",
    emptyState: "Pecahan RAV hanya tersedia untuk tahun 2017.",
  },
  "chart-profit-bridge": {
    title: "Daripada untung RM3.4 bilion kepada rugi RM1.4 bilion",
    subtitle: "Pelarasan PwC ke atas akaun 2017",
    whatItShows:
      "Setiap bar menunjukkan satu pelarasan yang PwC dapati sepatutnya dibuat jika piawaian perakaunan MFRS diikuti sepenuhnya.",
    whyItMatters:
      "Ini perbandingan paling penting dalam keseluruhan laporan — satu angka menjadi terbalik sepenuhnya, dan hibah RM3.3 bilion dibayar berdasarkan angka yang pertama.",
    reasonableConclusion:
      "Jurang RM4.85 bilion antara angka yang dilaporkan dan angka terlaras, terutamanya daripada rosot nilai pelaburan ekuiti (RM4.26 bilion).",
    limits:
      "Ini analisis PwC (Financial Review), bukan audit semula. Menurut laporan, tujuannya ialah mengesahkan penemuan Jabatan Audit Negara.",
    emptyState: "Pelarasan terperinci hanya tersedia untuk tahun 2017.",
  },
  "chart-asset-transfer": {
    title: "Nilai aset yang dipindahkan kepada UJSB",
    subtitle: "Disember 2018, dalam RM juta",
    whatItShows:
      "Tiga nilai untuk aset yang sama: nilai dalam buku LTH, nilai yang dibayar UJSB, dan nilai pasaran pada masa itu.",
    whyItMatters:
      "UJSB membayar RM19.9 bilion untuk aset bernilai pasaran RM9.7 bilion. Bezanya RM10.2 bilion inilah yang membolehkan kunci kira-kira LTH pulih.",
    reasonableConclusion:
      "Hampir keseluruhan jurang datang daripada ekuiti tersenarai: RM16.85 bilion nilai pemindahan berbanding RM7.60 bilion nilai pasaran.",
    limits:
      "Bagi hartanah dan perladangan, lajur 'nilai pasaran' dalam laporan sama dengan nilai buku. Laporan tidak menjelaskan sama ada ini bermakna nilai pasaran memang sama, atau ia tidak dinilai secara berasingan.",
    axisX: "Kelas aset",
    axisY: "RM juta",
    legend: ["Nilai buku LTH", "Nilai pemindahan", "Nilai pasaran"],
    emptyState: "Tiada pecahan lanjut. Laporan hanya memberi tiga kelas aset.",
  },
  "chart-property-erosion": {
    title: "Nilai hartanah selepas dipindahkan: Disember 2018 vs Disember 2021",
    subtitle: "29 hartanah, dikumpulkan kepada lima jenis",
    whatItShows:
      "Nilai pemindahan pada Disember 2018 berbanding nilai pasaran pada Disember 2021 mengikut penilaian jurunilai bebas bertauliah.",
    whyItMatters:
      "Menunjukkan sama ada nilai premium yang dibayar UJSB dapat dipulihkan. Setakat ini, tidak.",
    reasonableConclusion:
      "Nilai jatuh daripada RM2.25 bilion kepada RM1.20 bilion — kehilangan 46.5% dalam tiga tahun. Menara pejabat paling teruk (−55.9%).",
    limits:
      "Tempoh tiga tahun ini merangkumi kesan pandemik Covid-19 ke atas pasaran hartanah domestik. Kita tidak boleh memisahkan berapa banyak kejatuhan disebabkan penilaian pemindahan yang terlalu tinggi berbanding keadaan pasaran.",
    axisX: "Jenis hartanah",
    axisY: "RM juta",
    legend: ["Nilai pemindahan (Dis 2018)", "Nilai pasaran (Dis 2021)"],
    emptyState: "Laporan tidak menyenaraikan 29 hartanah secara individu.",
  },
  "chart-bluechip": {
    title: "Lima saham mewah yang dipindahkan kepada UJSB",
    subtitle: "Harga seunit pada tarikh pemindahan berbanding 31 Disember 2018",
    whatItShows: "Harga pemindahan seunit dan harga pasaran seunit bagi Axiata, Maxis, MISC, Digi dan TM.",
    whyItMatters:
      "Menunjukkan sejauh mana harga pemindahan melebihi harga pasaran untuk saham yang paling dikenali dalam portfolio.",
    reasonableConclusion:
      "Kelima-lima saham dipindahkan pada harga lebih tinggi daripada harga pasaran, dengan TM paling ketara (−60.9%). Sehingga 8 Jun 2022, harga pasaran semua lima masih di bawah harga pemindahan.",
    limits:
      "AMARAN: lajur nilai agregat dalam jadual asal tidak boleh direkonsiliasikan dengan harga seunit — bilangan unit tersirat berbeza antara lajur. Oleh itu bilangan unit tidak boleh dikira, dan peratus kejatuhan nilai agregat berbeza daripada peratus kejatuhan harga. Ini juga hanya 5 daripada 106 kaunter yang dipindahkan.",
    axisX: "Kaunter",
    axisY: "RM seunit",
    legend: ["Harga pemindahan", "Harga pasaran 31 Dis 2018", "Harga pasaran 8 Jun 2022"],
    emptyState: "Laporan hanya menamakan lima kaunter daripada 106 yang dipindahkan.",
  },
  "chart-rofr": {
    title: "Harga tawaran beli semula berbanding harga pasaran",
    subtitle: "Sembilan tawaran Hak Penolakan Pertama, 2020–2022",
    whatItShows:
      "'Hak Penolakan Pertama' bermaksud UJSB perlu menawarkan aset kepada LTH dahulu sebelum menjual kepada orang lain. Carta ini membandingkan harga tawaran dengan harga pasaran pada hari yang sama.",
    whyItMatters:
      "Jika harga tawaran lebih tinggi daripada harga pasaran, LTH tidak mendapat apa-apa faedah — ia boleh membeli saham yang sama lebih murah di pasaran terbuka.",
    reasonableConclusion:
      "Tujuh daripada sembilan tawaran adalah pada harga premium, tertinggi 40.6% (WZ Satu). Suruhanjaya mengesyorkan LTH melepaskan kesemua Hak Penolakan Pertama.",
    limits:
      "Ini bukan senarai lengkap tawaran ROFR — ia contoh yang dikemukakan kepada Suruhanjaya. Kebanyakan tarikh adalah Mac–Mei 2020, semasa kemuncak kejatuhan pasaran Covid-19.",
    axisX: "Tarikh tawaran",
    axisY: "Premium berbanding harga pasaran (%)",
    emptyState: "Tiada tawaran ROFR dalam julat tarikh yang dipilih.",
  },
  "chart-sukuk-timeline": {
    title: "Bila Sukuk UJSB perlu ditebus, dan berapa banyak telah dibayar",
    subtitle: "Dua siri Sukuk berkupon sifar",
    whatItShows:
      "'Berkupon sifar' bermaksud Sukuk ini tidak membayar tunai setiap tahun. LTH hanya menerima wang pada tarikh matang: RM13.2 bilion pada 2026 dan RM14.3 bilion pada 2029.",
    whyItMatters:
      "Sementara menunggu, LTH mengakru pendapatan RM840 juta setahun yang tidak disertai tunai. Pendapatan ini digunakan untuk membayar hibah kepada pendeposit.",
    reasonableConclusion:
      "Setakat 31 Disember 2021, pendapatan tertunggak terkumpul melebihi RM2.1 bilion. Bayaran tunai yang benar-benar diterima LTH setakat laporan hanya RM500 juta.",
    limits:
      "Simulasi laluan penebusan mengabaikan hasil pelupusan aset UJSB (laporan tidak memberi nilai bagi 75 kaunter yang dijual) dan pilihan penebusan dalam bentuk aset.",
    axisX: "Tahun",
    axisY: "RM bilion",
    emptyState: "Tiada jadual penebusan terperinci dalam laporan — hanya dua tarikh matang.",
  },
  "chart-hafis-share": {
    title: "Berapa peratus kos haji ditanggung LTH, bukan jemaah",
    subtitle: "2014–2019 sebenar, 2022–2030 unjuran",
    whatItShows:
      "Bahagian kos haji yang dibayar oleh LTH melalui subsidi HAFIS, berbanding bahagian yang dibayar jemaah sendiri.",
    whyItMatters:
      "HAFIS diambil daripada keuntungan pelaburan LTH. Setiap ringgit subsidi ialah satu ringgit kurang untuk hibah pendeposit.",
    reasonableConclusion:
      "Bahagian LTH naik daripada 38% (2014) kepada 56% (2019) kerana bayaran haji dibekukan pada RM9,980 selama 13 tahun sementara kos terus naik.",
    limits:
      "Bahagian 2022 ke atas ialah unjuran yang mengunci bayaran haji pada RM12,980. Untuk kumpulan B40 (RM10,980), bahagian 2022 ialah 57.0%, bukan 49.2%. Sentiasa periksa kumpulan mana yang ditunjukkan.",
    axisX: "Tahun",
    axisY: "Bahagian kos haji (%)",
    legend: ["Ditanggung jemaah", "Ditanggung LTH (HAFIS)"],
    emptyState: "Tiada haji pada 2020 dan 2021 — jurang ini adalah nyata, bukan data hilang.",
  },
  "chart-hafis-total": {
    title: "Jumlah subsidi haji setahun",
    subtitle: "2014–2019 sebenar, 2022–2030 unjuran",
    whatItShows: "Jumlah wang yang dibelanjakan LTH untuk mensubsidi kos haji setiap tahun.",
    whyItMatters:
      "Suruhanjaya menganggarkan LTH memerlukan dana minimum RM60 bilion semata-mata untuk menampung subsidi pada tahap sekarang.",
    reasonableConclusion:
      "Subsidi naik daripada RM106 juta (2014) kepada RM299 juta (2019), dan diunjurkan mencecah RM742 juta menjelang 2030.",
    limits:
      "PENTING: unjuran laporan mengandaikan 30,000 jemaah setiap tahun (kami sahkan ini secara aritmetik untuk kesemua sembilan tahun). Laporan yang sama menyatakan kuota Malaysia dijangka meningkat kepada 60,000 menjelang 2030 — jika begitu, jumlah sebenar boleh menjadi kira-kira dua kali ganda.",
    axisX: "Tahun",
    axisY: "RM juta",
    emptyState: "Tiada haji pada 2020 dan 2021.",
  },
  "chart-hajj-cost-vs-payment": {
    title: "Kos haji terus naik, bayaran jemaah tidak berubah",
    subtitle: "2014–2019",
    whatItShows:
      "Kos sebenar mengerjakan haji seorang, berbanding bayaran yang dikenakan kepada jemaah.",
    whyItMatters:
      "Bayaran haji Muassasah dibekukan pada RM9,980 dari 2009 hingga 2021 — tiga belas tahun tanpa kenaikan.",
    reasonableConclusion:
      "Kos naik 41.8% antara 2014 dan 2019 (RM16,155 → RM22,900) sementara bayaran kekal sama. Seluruh perbezaan ditanggung LTH.",
    limits:
      "Laporan memberi dua angka bercanggah untuk kos haji asas: RM15,553 pada 2013 (Ringkasan Eksekutif) dan RM15,555 pada 2003 (perenggan 3.16.1). Siri yang boleh dipercayai bermula 2014.",
    axisX: "Tahun",
    axisY: "RM seorang",
    legend: ["Kos haji sebenar", "Bayaran jemaah", "Subsidi LTH"],
    emptyState: "Siri ini meliputi 2014 hingga 2019 sahaja.",
  },
  "chart-bonus": {
    title: "Peruntukan bonus kakitangan berbanding kedudukan kewangan",
    subtitle: "2010–2020, dalam RM juta",
    whatItShows:
      "Jumlah peruntukan bonus setiap tahun, ditindih dengan penunjuk sama ada aset LTH melebihi liabiliti pada tahun itu.",
    whyItMatters:
      "Suruhanjaya mendapati pemberian bonus tinggi berlaku kerana LTH menilai asetnya berdasarkan RAV, yang menunjukkan keuntungan besar.",
    reasonableConclusion:
      "Bonus memuncak RM74 juta pada 2014 dan kekal RM56.7 juta pada 2017 — tahun yang sama aset kurang daripada liabiliti. Selepas 2018, peruntukan turun kepada RM10.8–14.1 juta, penurunan purata 77%.",
    limits:
      "Laporan memberi dua angka untuk 2015: RM65 juta (jadual 3.12.7) dan RM61 juta (jadual 3.12.10). Nisbah bonus/keuntungan yang disenaraikan menepati RM61 juta.",
    axisX: "Tahun",
    axisY: "RM juta",
    emptyState: "Siri bonus meliputi 2010 hingga 2020.",
  },
  "chart-deposits": {
    title: "Pergerakan deposit LTH",
    subtitle: "Empat titik data yang diberikan laporan",
    whatItShows: "Jumlah deposit pendeposit pada empat tarikh yang disebut laporan.",
    whyItMatters:
      "Selepas kadar hibah diumumkan pada 1.25% untuk tahun 2018, deposit mengecut kira-kira RM4 bilion — bukti risiko 'bank run' yang dikhuatiri.",
    reasonableConclusion:
      "Deposit jatuh daripada ~RM73 bilion kepada RM69 bilion pada akhir 2019, kemudian pulih kepada RM88 bilion menjelang Mei 2022.",
    limits:
      "Hanya EMPAT titik data — jangan lukis garis trend licin antara titik. Pertumbuhan selepas 2019 juga termasuk hibah yang dikreditkan semula ke akaun (menjadi deposit baharu), bukan hanya wang baharu.",
    axisX: "Tarikh",
    axisY: "RM bilion",
    emptyState: "Laporan hanya memberi empat titik deposit.",
  },
  "chart-concentration": {
    title: "Siapa memiliki deposit LTH",
    subtitle: "Dua penunjuk tumpuan yang diberikan laporan",
    whatItShows:
      "65% pendeposit mempunyai RM2,000 atau kurang. Dianggarkan 5% pendeposit memegang 75% daripada semua deposit.",
    whyItMatters:
      "Ini 'risiko tertumpu' — jika sebilangan kecil pendeposit besar mengeluarkan wang serentak, LTH menghadapi masalah kecairan. Tetapi kumpulan yang sama juga menanggung beban subsidi haji.",
    reasonableConclusion:
      "Kebergantungan LTH kepada pendeposit besar adalah tinggi, dan Suruhanjaya menyatakan ia akan bertambah apabila kos subsidi meningkat.",
    limits:
      "Hanya dua titik data. Histogram atau lengkung taburan penuh TIDAK boleh dibina — laporan tidak menyediakan taburan deposit.",
    emptyState: "Laporan tidak menyediakan taburan deposit yang lengkap.",
  },
  "chart-investments": {
    title: "14 pelaburan yang memerlukan audit forensik",
    subtitle: "Pendedahan LTH mengikut kes",
    whatItShows:
      "Jumlah wang LTH yang terlibat dalam setiap pelaburan yang Suruhanjaya syorkan diaudit secara forensik.",
    whyItMatters:
      "Suruhanjaya mendapati 'wujudnya transaksi yang mencurigakan dan penyembunyian maklumat' dan mengesyorkan setiap anggota Lembaga serta pengurusan yang terlibat dipertanggungjawabkan.",
    reasonableConclusion:
      "Kes terbesar dalam RM ialah FGV (RM1.31 bilion nilai kos) dan TH Plantations (Sukuk RM1.2 bilion).",
    limits:
      "AMARAN KERAS: jangan jumlahkan lajur ini. Asas berbeza antara kes — ada yang kos pemerolehan, ada yang jumlah dikeluarkan, ada yang nilai pemindahan. Empat kes utama (THIP, Trurich, Al-Rawda, TH Marine) mempunyai komponen USD atau Saudi Riyal, dan laporan tidak memberi sebarang kadar tukaran.",
    axisX: "Pelaburan",
    axisY: "RM juta",
    emptyState: "Tiada pelaburan sepadan dengan penapis yang dipilih.",
    hardRule: "Jumlah keseluruhan tidak boleh dipaparkan.",
  },
  "chart-timeline": {
    title: "Kronologi: daripada amaran pertama kepada laporan RCI",
    subtitle: "2014–2030, dipecahkan kepada lapan lorong naratif",
    whatItShows:
      "Setiap peristiwa penting mengikut tarikh, dikumpulkan mengikut tema: tadbir urus, kewangan, audit, pemulihan, pelaburan, penguatkuasaan, haji dan siasatan.",
    whyItMatters:
      "Kronologi menunjukkan bahawa amaran datang bertahun-tahun sebelum tindakan diambil, dan bahawa keputusan terbesar dibuat dalam tempoh yang sangat singkat.",
    reasonableConclusion:
      "Amaran bertulis BNM bermula Ogos 2014. Pelan pemulihan RM19.9 bilion dimuktamadkan dalam masa 20 hari pada Disember 2018.",
    limits:
      "Beberapa peristiwa hanya mempunyai tahun atau bulan, bukan tarikh penuh. Peristiwa selepas Julai 2022 adalah unjuran, bukan fakta.",
    emptyState: "Tiada peristiwa dalam julat dan penapis yang dipilih.",
  },
  "chart-timeline-compact": {
    title: "Sepuluh peristiwa yang paling menentukan",
    subtitle: "Daripada amaran pertama 2014 hingga tarikh matang Sukuk 2029",
    whatItShows: "Hanya peristiwa yang ditandakan paling kritikal, dalam satu baris masa.",
    whyItMatters: "Memberi bentuk keseluruhan cerita sebelum pembaca masuk ke butiran.",
    reasonableConclusion:
      "Masalah dikenal pasti pada 2014, tetapi tindakan besar hanya diambil pada penghujung 2018 — dan akibatnya masih perlu diselesaikan pada 2026 dan 2029.",
    limits:
      "Ini pilihan yang dibuat oleh kami berdasarkan medan 'impact' dalam data. Kronologi penuh mengandungi lebih 100 peristiwa.",
    emptyState: "Tiada peristiwa kritikal dalam julat yang dipilih.",
  },
  "chart-warning-timeline": {
    title: "Bila pengawal selia memberi amaran",
    subtitle: "Surat BNM dan Ketua Audit Negara, 2014–2022",
    whatItShows: "Setiap surat rasmi daripada Bank Negara Malaysia dan Ketua Audit Negara, mengikut tarikh dan penerima.",
    whyItMatters:
      "Ia menunjukkan bahawa masalah bukan sesuatu yang mengejutkan — ia dikenal pasti bertahun-tahun lebih awal.",
    reasonableConclusion:
      "Amaran bertulis pertama bertarikh 21 Ogos 2014. Suruhanjaya mendapati surat-surat BNM 'tidak mendapat perhatian yang sewajarnya'.",
    limits:
      "Kandungan penuh surat tidak didedahkan — kesemuanya ekshibit yang diklasifikasikan RAHSIA. Kita tahu tarikh dan tajuk, bukan isi.",
    axisX: "Tarikh",
    axisY: "Pengirim",
    emptyState: "Tiada surat dalam julat tarikh yang dipilih.",
  },
  "chart-tenure-gantt": {
    title: "Siapa memegang jawatan, dan bila",
    subtitle: "Pengerusi, Ketua Pegawai Eksekutif, Menteri dan anggota Lembaga, 2004–2022",
    whatItShows: "Tempoh perkhidmatan setiap individu yang memegang jawatan penting dalam LTH.",
    whyItMatters:
      "Menunjukkan pusing ganti kepimpinan yang tinggi selepas 2018, dan dua penamatan mengejut pada 2021 yang dibuat tanpa memberi sebab.",
    reasonableConclusion:
      "Ketua Pegawai Eksekutif ditamatkan pada 5 Mei 2021 dan Pengerusi pada 15 Oktober 2021, kedua-duanya sebelum tempoh mereka tamat. Suruhanjaya mendapati kedua-dua mereka sedang melaksanakan penambahbaikan.",
    limits:
      "Warna 'ahli politik aktif' hanya ditetapkan untuk tiga individu yang dinamakan Suruhanjaya. Untuk yang lain, laporan tidak menyatakan — jangan tafsir sebagai 'bukan ahli politik'.",
    axisX: "Tahun",
    axisY: "Individu",
    emptyState: "Tiada jawatan dalam julat tahun yang dipilih.",
  },
  "chart-disciplinary-flow": {
    title: "Apa yang berlaku kepada pegawai yang dikenakan tindakan tatatertib",
    subtitle: "Empat kluster isu, lima pegawai",
    whatItShows: "Aliran daripada kertas pertuduhan, kepada keputusan Jawatankuasa Tatatertib, kepada keputusan rayuan.",
    whyItMatters:
      "Suruhanjaya mendapati proses tatatertib mengambil masa terlalu lama dan perlu diperkemas agar dilihat berkesan, cekap, adil dan telus.",
    reasonableConclusion:
      "Dalam tiga daripada empat kluster, hukuman dikurangkan selepas rayuan. Dua kes buang kerja bertukar menjadi turun pangkat. Kesemua lima pegawai masih bekerja dengan LTH atau anak syarikatnya.",
    limits:
      "Saiz sampel sangat kecil — empat kluster dan lima pegawai. Ini bukan kadar statistik dan tidak boleh digeneralisasikan.",
    emptyState: "Tiada tindakan tatatertib dalam penapis yang dipilih.",
  },
  "chart-guarantee-commitments": {
    title: "Kedudukan UJSB dalam senarai Komitmen Jaminan Kerajaan",
    subtitle: "2020 dan 2021, dalam RM juta",
    whatItShows:
      "'Komitmen Jaminan' ialah senarai hutang syarikat kerajaan yang kemungkinan besar perlu ditanggung Kerajaan.",
    whyItMatters:
      "Sukuk UJSB tidak dijamin secara rasmi oleh Kerajaan — ia hanya mempunyai 'Surat Sokongan Kewangan'. Tetapi ia tersenarai di sini, bermakna Kerajaan mengiktiraf tanggungjawabnya.",
    reasonableConclusion:
      "UJSB ialah komitmen keempat terbesar (RM21.1 bilion pada 2021, 11.1% daripada jumlah), selepas DanaInfra, Prasarana dan Malaysia Rail Link.",
    limits:
      "Angka UJSB di sini (RM21.1 bilion) BUKAN nilai matang Sukuk (RM27.5 bilion). Jaminan deposit LTH di bawah seksyen 24 (RM88 bilion) TIDAK tersenarai dalam jadual ini langsung.",
    axisX: "Entiti",
    axisY: "RM juta",
    legend: ["2020", "2021"],
    emptyState: "Jadual ini hanya meliputi 2020 dan 2021.",
  },
  "chart-directorships": {
    title: "Berapa banyak jawatan pengarah dipegang serentak",
    subtitle: "Sebelas individu yang dinamakan laporan",
    whatItShows:
      "Bilangan jawatan di anak syarikat LTH yang dipegang oleh setiap anggota Lembaga atau pegawai pengurusan tertinggi.",
    whyItMatters:
      "Suruhanjaya mendapati penglibatan ini menyebabkan mereka kurang memberi fokus kepada tugas hakiki di LTH dan menimbulkan konflik kepentingan.",
    reasonableConclusion:
      "Ketua Pegawai Kewangan Kumpulan memegang 23 jawatan pengarah, dan seorang Ketua Pegawai Eksekutif memegang 18. LTH kini mengehadkan kepada lima anak syarikat.",
    limits:
      "Laporan menggunakan perkataan 'antaranya' — senarai ini adalah CONTOH, bukan senarai lengkap. Bilangan jawatan tidak boleh dilayan sebagai kiraan muktamad.",
    axisX: "Individu",
    axisY: "Bilangan jawatan",
    emptyState: "Laporan hanya menamakan sebelas individu dengan senarai jawatan.",
  },
};

/** Insight siap guna yang boleh dipaparkan sebagai kad. */
export const insights = [
  {
    id: "ins-2016-threshold",
    headline: "Pada 2016, syarat undang-undang untuk membayar hibah sudah tidak dipenuhi",
    body:
      "Seksyen 22(3)(a) Akta Tabung Haji 1995 hanya membenarkan hibah dibayar jika aset tidak kurang daripada liabiliti. Analisis PwC menunjukkan pada 2016 terdapat kekurangan RM1.26 bilion SEBELUM sebarang hibah dibayar. Hibah RM2.87 bilion tetap diisytiharkan.",
    strength: "kuat",
    factType: "fact",
    sourceLabel: "Laporan 3.13.7, 3.11.2",
    drillTo: "chart-solvency-bridge",
  },
  {
    id: "ins-rav-gap",
    headline: "RAV menambah RM4.47 bilion kepada nilai aset — tanpa piawaian pasaran",
    body:
      "LTH menggunakan 'Nilai Aset Boleh Direalisasi' untuk menunjukkan aset melebihi liabiliti. Laporan menyatakan tiada piawaian khusus di pasaran untuk mengira RAV. Daripada penilaian hartanah TH Plantations sebanyak RM4.6 bilion yang dimasukkan, hanya RM556 juta disokong penilai profesional bertauliah.",
    strength: "kuat",
    factType: "fact",
    sourceLabel: "Laporan 3.9.4, 3.9.12",
    drillTo: "chart-rav-waterfall",
  },
  {
    id: "ins-rav-timing",
    headline: "Semakan RAV dibuat 54 hari sebelum akaun sebenarnya diaudit",
    body:
      "Pengurusan LTH mendakwa Laporan Proforma berasaskan penyata kewangan yang telah diaudit. Suruhanjaya mendapati ini tidak benar: Laporan Semakan RAV oleh EY dikeluarkan pada 23 Mei 2018, manakala Penyata Kewangan Beraudit hanya dimuktamadkan pada 16 Julai 2018.",
    strength: "kuat",
    factType: "fact",
    sourceLabel: "Laporan 3.9.19",
    drillTo: "view-accounting",
  },
  {
    id: "ins-audit-outside-scope",
    headline: "Ketua Audit Negara mengakui mempertimbangkan persepsi pendeposit",
    body:
      "Dalam surat kepada Perdana Menteri bertarikh 19 Disember 2018, KAN menjelaskan bahawa Pendapat Berteguran telah dicadangkan, tetapi kerana ia 'akan mempengaruhi espektasi dan persepsi negatif pihak berkepentingan, khususnya pendeposit', Pendapat Tanpa Teguran dengan 'Emphasis of Matter' diberikan. Suruhanjaya menyifatkan ini sebagai pertimbangan di luar skop audit.",
    strength: "kuat",
    factType: "fact",
    sourceLabel: "Laporan 3.11.15–3.11.16",
    drillTo: "view-audit",
  },
  {
    id: "ins-warnings",
    headline: "BNM menulis sekurang-kurangnya enam kali sebelum krisis menjadi awam",
    body:
      "Surat bertarikh 21 Ogos 2014, 19 Disember 2014, 23 Disember 2015 (dua surat, satu kepada Pengerusi dan satu kepada Menteri), 14 Disember 2016 dan 17 Februari 2017. Suruhanjaya mendapati surat-surat ini 'tidak mendapat perhatian yang sewajarnya'.",
    strength: "kuat",
    factType: "fact",
    sourceLabel: "Laporan 3.6.2, 3.17.10",
    drillTo: "chart-timeline",
  },
  {
    id: "ins-rb-ignored",
    headline: "Laporan perunding yang memberi amaran tidak pernah dibentangkan kepada Lembaga",
    body:
      "Laporan Roland Berger disiapkan dan diberikan kepada pengurusan LTH SEBELUM agihan hibah 2017 diisytiharkan. Suruhanjaya mendapati tiada rekod yang menunjukkan ia dibentangkan kepada Lembaga.",
    strength: "kuat",
    factType: "fact",
    sourceLabel: "Laporan 3.17.13",
    drillTo: "view-audit",
  },
  {
    id: "ins-classification",
    headline: "Wang pendeposit dikelaskan sebagai ekuiti sejak 2010",
    body:
      "Wang pendeposit sepatutnya dikelaskan sebagai liabiliti kerana ia perlu dibayar balik. Ia dikelaskan sebagai 'dana (ekuiti)' sejak 2010, yang bersama rosot nilai yang tidak mencukupi menyebabkan penyata kewangan menunjukkan aset melebihi liabiliti. Suruhanjaya menyifatkan pengelasan ini sebagai satu representasi salah.",
    strength: "kuat",
    factType: "fact",
    sourceLabel: "Laporan 3.11.12–3.11.13",
    drillTo: "view-accounting",
  },
  {
    id: "ins-bonus-while-insolvent",
    headline: "Bonus RM56.7 juta dibayar pada tahun aset kurang daripada liabiliti",
    body:
      "Pada 2017, LTH mempunyai kekurangan RM769 juta sebelum agihan hibah. Peruntukan bonus kakitangan pada tahun yang sama ialah RM56.7 juta. Suruhanjaya menyimpulkan pemberian bonus dengan jumlah yang tinggi adalah tidak wajar.",
    strength: "kuat",
    factType: "derived",
    sourceLabel: "Terbitan daripada Laporan 3.12.7 dan 3.13.7",
    drillTo: "chart-bonus",
  },
  {
    id: "ins-non-cash-income",
    headline: "Lebih satu pertiga hibah dibayar daripada pendapatan yang belum diterima tunai",
    body:
      "Sukuk UJSB tidak membayar tunai setiap tahun. LTH mengakru RM840 juta setahun, yang menyumbang hampir 26% pendapatan tahunannya dan melebihi satu pertiga daripada jumlah agihan hibah. Setakat 31 Disember 2021, pendapatan tertunggak terkumpul melebihi RM2.1 bilion.",
    strength: "kuat",
    factType: "fact",
    sourceLabel: "Laporan 3.13.60, 3.13.62",
    drillTo: "chart-sukuk-timeline",
  },
  {
    id: "ins-cash-received",
    headline: "LTH menerima RM500 juta tunai untuk aset bernilai pasaran RM9.7 bilion",
    body:
      "Setakat laporan, satu-satunya tunai yang LTH terima daripada UJSB ialah RM500 juta. Bakinya dipegang dalam bentuk Sukuk yang hanya matang pada 2026 dan 2029. Suntikan RM1.5 bilion yang diperuntukkan dalam Belanjawan 2021 tidak diterima.",
    strength: "kuat",
    factType: "fact",
    sourceLabel: "Laporan 3.13.48–3.13.49",
    drillTo: "view-ujsb",
  },
  {
    id: "ins-projection-assumption",
    headline: "Unjuran subsidi haji laporan mengandaikan 30,000 jemaah — tetapi kuota dijangka berganda",
    body:
      "Kami mengesahkan secara aritmetik bahawa setiap baris jadual unjuran HAFIS 2022–2030 mengandaikan tepat 30,000 jemaah setahun. Andaian ini tidak dinyatakan secara tersurat. Laporan yang sama menyatakan kuota Malaysia dijangka meningkat kepada 60,000 menjelang 2030. Kedua-dua kenyataan ini tidak diselaraskan.",
    strength: "sederhana",
    factType: "derived",
    sourceLabel: "Terbitan daripada Laporan 3.16.8; bandingkan dengan 3.16.20",
    drillTo: "chart-hafis-total",
  },
  {
    id: "ins-payment-freeze",
    headline: "Bayaran haji tidak naik selama 13 tahun",
    body:
      "Kerajaan membekukan kenaikan bayaran haji Muassasah pada 2009. Bayaran kekal RM9,980 sehingga 2021 sementara kos haji naik daripada RM16,155 (2014) kepada RM22,900 (2019). Bahagian yang ditanggung LTH naik daripada 38% kepada 56%.",
    strength: "kuat",
    factType: "fact",
    sourceLabel: "Laporan 3.16.3, 3.16.5, 3.17.4",
    drillTo: "chart-hajj-cost-vs-payment",
  },
  {
    id: "ins-penalties-reduced",
    headline: "Dalam tiga daripada empat kes tatatertib, hukuman dikurangkan selepas rayuan",
    body:
      "Dua kes hukuman buang kerja bertukar menjadi turun pangkat. Kesemua lima pegawai yang dikenakan tindakan tatatertib masih bekerja dengan LTH atau anak syarikatnya pada tarikh laporan. Proses tatatertib mengambil masa 10 hingga 19 bulan.",
    strength: "kuat",
    factType: "fact",
    sourceLabel: "Laporan 3.15.14–3.15.19",
    drillTo: "view-enforcement",
  },
  {
    id: "ins-rofr-premium",
    headline: "Tawaran beli semula aset kepada LTH sering pada harga lebih tinggi daripada pasaran",
    body:
      "Tujuh daripada sembilan tawaran Hak Penolakan Pertama adalah pada harga premium, tertinggi 40.6%. Suruhanjaya menyarankan LTH melepaskan kesemua Hak Penolakan Pertama sekiranya aset ini tidak memberi pulangan yang kompetitif.",
    strength: "kuat",
    factType: "fact",
    sourceLabel: "Laporan 3.13.57, 3.13.68",
    drillTo: "chart-rofr",
  },
  {
    id: "ins-depositor-drop",
    headline: "Bilangan pendeposit turun 0.6 juta walaupun jumlah deposit naik — laporan tidak menjelaskan",
    body:
      "Pada 2018, laporan menyebut lebih 9.2 juta pendeposit. Sehingga 22 Julai 2022, jumlahnya 8.6 juta, sedangkan deposit naik daripada RM73 bilion kepada RM88 bilion. Laporan tidak menerangkan sebab penurunan ini.",
    strength: "lemah",
    factType: "gap",
    sourceLabel: "Laporan 3.13.14 dan BAB EMPAT ¶4.2",
    drillTo: "view-limits",
    caution: "Jangan tafsir sebagai 'kehilangan pendeposit'. Ia mungkin pembersihan akaun tidak aktif atau perubahan definisi.",
  },
];

/** Rumusan naratif untuk setiap bahagian. */
export const sectionSummaries = {
  overview:
    "Antara 2014 dan 2017, Lembaga Tabung Haji membayar hibah antara RM2.9 bilion dan RM3.3 bilion setiap tahun. Pada dua tahun terakhir tempoh itu, aset LTH sudah kurang daripada liabiliti sebelum sebarang hibah dibayar — bermakna syarat undang-undang untuk mengisytiharkan hibah tidak dipenuhi. Suruhanjaya mendapati LTH menggunakan kaedah penilaian dalaman (RAV) dan melonggarkan ambang rosot nilai untuk menunjukkan keuntungan. Pada 2018, Kerajaan memindahkan aset lemah bernilai RM19.9 bilion kepada sebuah syarikat khas, UJSB, walaupun nilai pasarannya hanya RM9.7 bilion.",
  solvency:
    "Analisis PwC menunjukkan jurang antara aset dan liabiliti LTH bermula pada 2014. Pada 2014 dan 2015, LTH masih mempunyai lebihan sebelum hibah dibayar, tetapi hibah yang diagihkan melebihi lebihan itu. Pada 2016 dan 2017, aset sudah kurang daripada liabiliti sebelum sebarang hibah dibayar.",
  accounting:
    "Tiga kaedah membolehkan LTH menunjukkan gambaran yang lebih baik daripada keadaan sebenar: wang pendeposit dikelaskan sebagai ekuiti (sejak 2010), nilai aset dikira menggunakan RAV yang tiada piawaian pasaran, dan ambang rosot nilai dilonggarkan daripada 70% kepada 90% dalam tahun 2017 sahaja.",
  audit:
    "Penyata kewangan LTH 2014–2017 semuanya menerima Sijil Audit Bersih daripada Jabatan Audit Negara. Bagi 2017, Ketua Audit Negara mengakui Pendapat Berteguran telah dicadangkan tetapi tidak diberikan kerana kesan kepada persepsi pendeposit. Suruhanjaya mengesyorkan pengauditan LTH tidak lagi dipertanggungjawabkan kepada Jabatan Audit Negara.",
  ujsb:
    "Urusharta Jamaah Sdn. Bhd. ditubuhkan pada 14 Disember 2018, dan Perjanjian Pemindahan Aset ditandatangani 13 hari kemudian. UJSB mengeluarkan Sukuk berkupon sifar berjumlah RM27.5 bilion nilai matang. LTH tidak menerima tunai tahunan daripada Sukuk ini — hanya pendapatan yang diakru. Suruhanjaya menyifatkan kegagalan melunaskan obligasi Sukuk ini sebagai 'risiko terbesar LTH'.",
  investments:
    "Suruhanjaya mengesyorkan audit forensik ke atas 14 pelaburan, dan mendapati 'wujudnya transaksi yang mencurigakan dan penyembunyian maklumat'. Punca yang dikenal pasti termasuk proses pelaburan yang tidak teratur, Panel Pelaburan yang tidak menjalankan semakan mencukupi, dan Menteri yang bergantung sepenuhnya kepada memo pengurusan.",
  hajj:
    "Bayaran haji Muassasah dibekukan pada RM9,980 dari 2009 hingga 2021. Kos haji terus naik, jadi bahagian yang ditanggung LTH melalui subsidi HAFIS naik daripada 38% kepada 56%. Subsidi ini diambil daripada keuntungan pelaburan, jadi ia terus mengurangkan hibah pendeposit.",
  governance:
    "Akta Tabung Haji 1995 hanya menetapkan dua kriteria untuk menjadi anggota Lembaga: Muslim dan warganegara Malaysia. Menteri boleh membatalkan pelantikan pada bila-bila masa tanpa memberi sebab, dan kuasa ini digunakan dua kali pada 2021. Tiga anggota Lembaga dalam tempoh siasatan adalah ahli politik aktif.",
  enforcement:
    "Empat laporan polis dibuat, dua telah dirujuk kepada Peguam Negara. Enam aduan dibuat kepada SPRM, semuanya masih disiasat. Lima pegawai dikenakan tindakan tatatertib; dalam tiga daripada empat kluster, hukuman dikurangkan selepas rayuan.",
  limits:
    "Analisis ini dibina daripada satu dokumen sahaja. Kesemua 12 jilid ekshibit — termasuk laporan penuh PwC, EY, Roland Berger dan Jabatan Audit Negara — diklasifikasikan RAHSIA dan tidak boleh disemak. Prosiding dijalankan secara tertutup. Beberapa angka dalam laporan bercanggah antara satu sama lain, dan kami senaraikan setiap satu.",
};

/** Nota batasan yang wajib dipaparkan. */
export const limitationNotices = {
  global:
    "Semua angka di halaman ini datang daripada Laporan RCI Tabung Haji sahaja. Kami tidak menambah data luar. Di mana laporan bercanggah dengan dirinya sendiri, kami tunjukkan kedua-dua angka.",
  derived:
    "Angka ini DIKIRA daripada laporan, bukan disebut secara terus. Formula dan andaian ditunjukkan di bawah.",
  projection:
    "Angka ini ialah UNJURAN dalam laporan, bukan angka sejarah. Ia bergantung kepada andaian yang mungkin tidak berlaku.",
  simulation:
    "Angka ini ialah SIMULASI yang anda cipta dengan mengubah tetapan. Ia bukan unjuran Suruhanjaya dan bukan ramalan.",
  opinion:
    "Ini PANDANGAN atau syor Suruhanjaya berdasarkan keterangan yang tidak didedahkan kepada umum, bukan keputusan mahkamah.",
  estimate:
    "Angka ini ialah anggaran pihak ketiga (PwC, EY, Roland Berger, Jabatan Audit Negara atau BNM) yang dipetik dalam laporan, tertakluk kepada skop kerja masing-masing.",
  gap: "Laporan tidak menyediakan data ini. Kami tidak mengisinya dengan andaian.",
  currency:
    "Laporan tidak memberikan kadar tukaran. Nilai dalam USD, Saudi Riyal atau AUD tidak boleh ditukar kepada Ringgit di sini.",
  cannotSum:
    "Angka dalam lajur ini TIDAK boleh dijumlahkan — asas pengiraan berbeza antara baris.",
  ocr:
    "Teks sumber ialah hasil OCR daripada PDF. Beberapa angka rosak dalam teks asal. Setiap pembetulan yang kami buat direkodkan dan boleh disemak.",
};

/** Keadaan kosong dan ralat. */
export const states = {
  emptyFilter: {
    title: "Tiada data untuk pilihan ini",
    body: "Cuba luaskan julat tahun atau tanggalkan sebahagian penapis.",
    action: "Set semula penapis",
  },
  emptyByDesign: {
    title: "Laporan tidak menyediakan data ini",
    body:
      "Ini bukan ralat. Laporan RCI tidak mengandungi maklumat ini, dan kami tidak akan mengisinya dengan andaian.",
    action: "Lihat senarai penuh jurang data",
  },
  emptyNoActivity: {
    title: "Tiada aktiviti pada tahun ini",
    body: "Tiada penghantaran jemaah haji pada 2020 dan 2021 akibat pandemik Covid-19. Jurang ini adalah nyata.",
  },
  loading: { title: "Memuatkan data…", body: "Sebentar." },
  error: {
    title: "Data tidak dapat dimuatkan",
    body: "Cuba muat semula halaman. Jika masalah berterusan, data mungkin rosak.",
    action: "Muat semula",
  },
  searchNoResult: {
    title: "Tiada hasil untuk carian anda",
    body: "Cuba nama syarikat, nama individu, atau nombor perenggan laporan seperti '3.9.12'.",
  },
  conflictWarning: {
    title: "Laporan memberi lebih daripada satu angka untuk perkara ini",
    body: "Kami tunjukkan kesemuanya. Klik untuk melihat setiap sumber dan mengapa ia berbeza.",
  },
  cannotSumWarning: {
    title: "Jumlah tidak dipaparkan",
    body:
      "Angka dalam lajur ini menggunakan asas pengiraan yang berbeza, jadi menjumlahkannya akan memberi angka yang mengelirukan.",
  },
};

/** Label mikro yang berulang. */
export const labels = {
  year: "Tahun",
  amount: "Jumlah",
  rate: "Kadar",
  source: "Sumber",
  sourceParagraph: "Perenggan laporan",
  viewSource: "Lihat dalam laporan asal",
  formula: "Formula",
  assumptions: "Andaian",
  whatItShows: "Apa yang ditunjukkan",
  whyItMatters: "Kenapa ia penting",
  conclusion: "Kesimpulan yang munasabah",
  limits: "Batas kesimpulan",
  reset: "Set semula",
  showAll: "Tunjuk semua",
  showLess: "Tunjuk kurang",
  compare: "Bandingkan",
  drillDown: "Lihat butiran",
  backToOverview: "Kembali ke ringkasan",
  glossary: "Istilah",
  explainThis: "Terangkan istilah ini",
  factTypeLegend: "Jenis maklumat",
  dataQuality: "Kualiti data",
  conflicts: "Percanggahan",
  gaps: "Jurang data",
  before: "Sebelum",
  after: "Selepas",
  reported: "Seperti dilaporkan",
  restated: "Selepas pelarasan",
  actual: "Sebenar",
  projected: "Unjuran",
  simulated: "Simulasi",
  notAvailable: "Tiada dalam laporan",
  notApplicable: "Tidak berkenaan",
  undefined: "Tidak tertakrif",
};

/** Format nombor. */
export const formatting = {
  locale: "ms-MY",
  currency: "MYR",
  rules: [
    "RM juta: papar satu tempat perpuluhan jika < 100, sifar tempat perpuluhan jika >= 100.",
    "RM bilion: sentiasa satu atau dua tempat perpuluhan (RM19.9 bilion, RM27.5 bilion).",
    "Peratus: dua tempat perpuluhan untuk kadar hibah (4.50%), satu untuk perubahan (−46.5%).",
    "Tarikh: '19 Julai 2022' dalam teks; '19 Jul 2022' dalam label carta yang sempit.",
    "Nilai negatif: gunakan tanda tolak (−RM4.09 bilion), bukan kurungan, kerana kurungan tidak difahami umum.",
    "Jangan gunakan singkatan 'b', 'j', 'k' — tulis 'bilion', 'juta', 'ribu'.",
  ],
  thresholds: {
    billion: 1_000_000_000,
    million: 1_000_000,
    thousand: 1_000,
  },
};

/** Susunan naratif yang disyorkan. */
export const narrativeOrder = [
  { step: 1, view: "view-overview", question: "Apa yang berlaku?", oneLiner: "Enam angka besar yang meringkaskan keseluruhan kes." },
  { step: 2, view: "view-solvency", question: "Bila masalah bermula?", oneLiner: "Jurang antara aset dan liabiliti, tahun demi tahun." },
  { step: 3, view: "view-accounting", question: "Bagaimana ia tidak kelihatan?", oneLiner: "Tiga kaedah perakaunan yang mengubah gambaran." },
  { step: 4, view: "view-audit", question: "Siapa sepatutnya menangkapnya?", oneLiner: "Amaran yang datang, dan mengapa ia tidak menghentikan apa-apa." },
  { step: 5, view: "view-ujsb", question: "Bagaimana ia diselamatkan?", oneLiner: "RM19.9 bilion aset, RM27.5 bilion Sukuk, dan bil yang matang pada 2026 dan 2029." },
  { step: 6, view: "view-investments", question: "Ke mana wang itu pergi?", oneLiner: "14 pelaburan yang memerlukan audit forensik." },
  { step: 7, view: "view-hajj", question: "Apa kaitannya dengan haji?", oneLiner: "Bayaran beku 13 tahun dan subsidi yang terus membesar." },
  { step: 8, view: "view-governance", question: "Siapa yang membuat keputusan?", oneLiner: "Kuasa Menteri, ahli politik dalam Lembaga, dan konflik kepentingan." },
  { step: 9, view: "view-enforcement", question: "Apa yang berlaku selepas itu?", oneLiner: "Laporan polis, aduan SPRM, dan tindakan tatatertib." },
  { step: 10, view: "view-recommendations", question: "Apa yang disyorkan?", oneLiner: "25 syor Suruhanjaya kepada Kerajaan dan LTH." },
  { step: 11, view: "view-limits", question: "Apa yang kita tidak tahu?", oneLiner: "Percanggahan dalam laporan dan data yang tiada." },
];

/** Cadangan penjelasan istilah teknikal secara berperingkat. */
export const explainerStrategy = {
  tier1:
    "Tooltip satu ayat pada sentuhan pertama setiap istilah. Contoh: 'Hibah = bayaran tahunan LTH kepada pendeposit, seperti dividen.'",
  tier2:
    "Panel 'Terangkan istilah ini' yang boleh dibuka, dengan tiga bahagian: Apa maksudnya, Kenapa ia penting di sini, Angka yang berkaitan.",
  tier3:
    "Halaman glosari penuh yang boleh dicari, dengan pautan ke setiap carta yang menggunakan istilah itu.",
  rule:
    "Tiada istilah teknikal muncul dalam tajuk carta tanpa penjelasan dalam subtajuk atau tooltip. Jika istilah itu tidak boleh diterangkan dalam satu ayat, jangan gunakannya dalam tajuk.",
  avoidList: [
    "Jangan tulis 'MFRS 9' tanpa 'piawaian perakaunan'.",
    "Jangan tulis 'zero coupon' tanpa 'tidak membayar tunai setiap tahun'.",
    "Jangan tulis 'SPV' tanpa 'syarikat yang ditubuhkan khas'.",
    "Jangan tulis 'impairment' — gunakan 'rosot nilai' dan terangkan.",
    "Jangan tulis 'Emphasis of Matter' tanpa 'nota amaran juruaudit'.",
  ],
};
