/**
 * Tadbir urus, kawal selia, penguatkuasaan dan syor.
 */
import { sourceRef } from "./meta.js";

const F = "fact";

/* ------------------------------------------------------------------ *
 * PERUNTUKAN UNDANG-UNDANG YANG MENJADI TERAS ISU
 * ------------------------------------------------------------------ */

export const keyLegalProvisions = [
  {
    id: "s4-1",
    provision: "Seksyen 4(1) Akta 535",
    subject: "Fungsi LTH",
    substance:
      "(a) mentadbirkan Kumpulan Wang; (b) mentadbirkan segala perkara berkenaan kebajikan jemaah haji dan merumuskan dasar berkaitan; (c) melakukan apa-apa benda lain yang dikehendaki di bawah Akta 535.",
    source: [sourceRef("2.2.2", 54, 16)],
  },
  {
    id: "s6-2",
    provision: "Seksyen 6(2) Akta 535",
    subject: "Kelayakan anggota Lembaga",
    substance:
      "\"Tiada seorang pun boleh dilantik menjadi anggota Lembaga melainkan jika dia seorang Muslim dan warganegara Malaysia.\"",
    commissionIssue:
      "Ini satu-satunya kriteria khusus. Suruhanjaya mendapati ia terlalu umum dan tidak memadai — tiada keperluan kepakaran kewangan, perniagaan, ekonomi atau perakaunan.",
    source: [sourceRef("3.2.7–3.2.8", 70, 32)],
  },
  {
    id: "s6-5",
    provision: "Seksyen 6(5) Akta 535",
    subject: "Pembatalan pelantikan",
    substance:
      "Menteri boleh pada bila-bila masa membatalkan pelantikan mana-mana anggota Lembaga TANPA memberi apa-apa sebab.",
    usageInstances: [
      { date: "2021-05-05", person: "Datuk Nik Mohd Hasyudeen bin Yusoff", role: "Ketua Pegawai Eksekutif", scheduledEnd: "2021-08-31" },
      { date: "2021-10-15", person: "Tan Sri Md Nor bin Md Yusof", role: "Pengerusi Lembaga", scheduledEnd: "kontrak dua tahun mulai 20 Julai 2020" },
    ],
    commissionIssue:
      "Suruhanjaya mendapati kedua-dua mereka telah memberikan perkhidmatan yang baik dan sedang melaksanakan penambahbaikan. Penamatan secara mengejut tanpa sebab memberi kesan kepada proses penambahbaikan.",
    source: [sourceRef("3.2.27–3.2.30", 82, 44)],
  },
  {
    id: "s11",
    provision: "Seksyen 11 Akta 535",
    subject: "Penubuhan jawatankuasa",
    substance:
      "Lembaga boleh menubuhkan jawatankuasa dengan bilangan anggota dan bidang tugas yang ditentukannya.",
    commissionIssue:
      "Kerana jawatankuasa penting tidak dikanunkan secara spesifik, ia boleh dibubarkan secara pentadbiran — seperti yang berlaku kepada Panel Pelaburan (2018).",
    source: [sourceRef("3.5.1–3.5.2", 90, 52)],
  },
  {
    id: "s20",
    provision: "Seksyen 20 Akta 535",
    subject: "Kuasa pelaburan",
    substance: "Kuasa pelaburan hanya boleh dijalankan dengan keizinan Menteri.",
    historicalComparison:
      "Seksyen 8 Akta PWSBH 1962 mewajibkan PWSBH mengambil kira laporan/cadangan Panel Pelaburan; seksyen 23(2) Akta 8 (LUTH) mewajibkan mengambil kira Majlis Penasihat Kewangan. Kedua-dua perlindungan ini dimansuhkan dalam Akta 535.",
    source: [sourceRef("3.8.1", 111, 73)],
  },
  {
    id: "s21",
    provision: "Seksyen 21 Akta 535",
    subject: "Kumpulan Wang Rizab",
    substance: "Mewajibkan Kumpulan Wang Rizab ditubuhkan dan peraturan pemindahan masuk/keluar diadakan.",
    source: [sourceRef("3.7.5(b)", 103, 65)],
  },
  {
    id: "s22-3a",
    provision: "Seksyen 22(3)(a) Akta 535",
    subject: "Syarat pertama pengisytiharan untung boleh agih",
    substance:
      "Tiada untung boleh agih boleh diisytiharkan melainkan pada akhir tahun itu aset Kumpulan Wang tidak kurang daripada jumlah liabiliti Kumpulan Wang, amaun yang kena dibayar kepada pendeposit dikira seolah-olah kena dibayar dengan serta-merta.",
    commissionIssue:
      "Pengurusan LTH mendakwa seksyen ini tidak mentakrifkan 'aset', lalu menggunakan RAV. Suruhanjaya menolak tafsiran ini.",
    source: [sourceRef("3.11.3", 125, 87)],
  },
  {
    id: "s22-3b",
    provision: "Seksyen 22(3)(b) Akta 535",
    subject: "Syarat kedua pengisytiharan untung boleh agih",
    substance:
      "Aset Kumpulan Wang Rizab tidak kurang daripada apa-apa peratusan amaun yang sebenarnya terkredit untuk pendeposit, sebagaimana yang diluluskan oleh Perbendaharaan.",
    commissionIssue:
      "Perbendaharaan TIDAK PERNAH meluluskan apa-apa baki minima, walaupun ada wakil Perbendaharaan dalam Lembaga. Syarat kedua ini secara praktikal tidak pernah dikuatkuasakan.",
    source: [sourceRef("3.7.6", 104, 66)],
  },
  {
    id: "s24",
    provision: "Seksyen 24 Akta 535",
    subject: "Jaminan Kerajaan ke atas deposit",
    substance:
      "Jika perbelanjaan Lembaga berhubung pengeluaran pendeposit tidak dapat ditampung daripada Kumpulan Wang atau Kumpulan Wang Rizab, ia dipertanggungkan kepada Kumpulan Wang Disatukan; pembayaran itu menjadi hutang kepada Kerajaan dan tanggungan pertama atas aset LTH.",
    currentExposure_rm_billion: 88,
    source: [sourceRef("3.13.15 / 3.7.1", 151, 113)],
  },
  {
    id: "s26",
    provision: "Seksyen 26 Akta 535",
    subject: "Pemakaian Akta 240",
    substance:
      "Memperuntukkan LTH tertakluk kepada Akta Badan Berkanun (Akaun dan Laporan Tahunan) 1980 (Akta 240), termasuk pengauditan oleh JAN.",
    commissionRecommendation:
      "Pinda seksyen 26 untuk mengecualikan pemakaian Akta 240 supaya LTH boleh melantik firma akauntan swasta.",
    source: [sourceRef("3.11.17", 134, 96)],
  },
  {
    id: "s17-18",
    provision: "Seksyen 17 dan 18 Akta 535",
    subject: "Peranan sedia ada Menteri Kewangan",
    substance:
      "Seksyen 17: tiada jaminan atau surat tanggung rugi boleh dikeluarkan tanpa kebenaran bertulis Menteri Kewangan. Seksyen 18: pinjaman memerlukan kelulusan Menteri dan Menteri Kewangan.",
    relevance:
      "Digunakan Suruhanjaya untuk menunjukkan bahawa Akta 535 sudah pun melibatkan Menteri Kewangan, menyokong cadangan pembahagian kuasa dua Menteri.",
    source: [sourceRef("3.2.20", 79, 41)],
  },
].map((p) => ({ factType: F, ...p }));

export const ministerialPowers = {
  id: "ministerial-powers",
  holder: "Menteri di Jabatan Perdana Menteri (Hal Ehwal Agama)",
  powers: [
    "Pelantikan dan pembatalan pelantikan Pengerusi Lembaga",
    "Pelantikan dan pembatalan pelantikan anggota-anggota Lembaga",
    "Menentukan pembayaran honorarium, elaun perjalanan dan sara hidup anggota Lembaga",
    "Memberi LTH arahan bersifat am berhubung pelaksanaan fungsi LTH",
    "Pelantikan Ketua Pegawai Eksekutif, termasuk persetujuan gaji dan elaun",
    "Meluluskan peraturan syarat perkhidmatan dan tatatertib pegawai",
    "Meluluskan pemberian pembiayaan atau bantuan kewangan kepada syarikat di bawah seksyen 4(3)(d)",
    "Meluluskan peraturan berhubung deposit dan pengeluaran",
    "Meluluskan SETIAP aktiviti pelaburan LTH dalam atau luar negara",
    "Menentukan pemindahan wang daripada Kumpulan Wang Rizab",
    "Meluluskan pengisytiharan untung boleh agih (hibah)",
    "Meluluskan pembuatan apa-apa peraturan di bawah Akta 535",
  ],
  commissionFinding:
    "Kuasa Menteri terlalu luas — bukan sahaja merangkumi bidang haji, tetapi urus tadbir, pengurusan dana pendeposit dan pelaburan. Kepakaran ketiga-tiga Menteri Hal Ehwal Agama dalam tempoh siasatan hanya terhad dalam bidang hal ehwal agama, menjadikan Menteri bergantung sepenuhnya kepada cadangan pengurusan dan Lembaga. Tiada input tambahan diperoleh sebelum keputusan mengenai pengurusan dana dan pelaburan.",
  recommendation:
    "Kuasa dibahagikan: Menteri Hal Ehwal Agama untuk pengurusan haji; Menteri Kewangan untuk pengurusan kewangan, dana dan pelaburan. Pelantikan anggota Lembaga dan KPE oleh Perdana Menteri atas syor jawatankuasa/badan penasihat bebas.",
  factType: F,
  source: [sourceRef("2.2.8 / 3.2.17–3.2.23", 57, 19)],
};

export const politicalInfluence = {
  id: "political-influence",
  namedPoliticians: [
    "Datuk Seri Panglima Abdul Azeez bin Abdul Rahim (Ahli Parlimen Baling; Ahli Majlis Tertinggi UMNO) — anggota Lembaga 2011, Pengerusi 2013–2018",
    "Tan Sri Dato' Paduka Haji Badruddin bin Amiruldin (Ahli Parlimen Yan/Jerai 2004–2008; Pengerusi Tetap Perhimpunan Agong UMNO) — anggota Lembaga 2005–2018",
    "Datuk Rosni binti Sohar (ADUN Hulu Bernam; Ahli Majlis Kerja Tertinggi dan Setiausaha Wanita UMNO) — anggota Lembaga 2014–2018",
  ],
  decisionsAttributedToPolitics: [
    "Bayaran agihan keuntungan (hibah)",
    "Penentuan bayaran haji",
    "Bantuan Kewangan Haji (HAFIS)",
  ],
  commissionFinding:
    "Terdapat beberapa keputusan LTH seperti bayaran hibah, penentuan bayaran haji, dan HAFIS yang didorong oleh unsur-unsur politik. Penglibatan ahli politik menimbulkan keresahan masyarakat akibat pertembungan politik dan menjejaskan kredibiliti LTH.",
  electionPressure:
    "Laporan RB disiapkan dan diberikan kepada pengurusan LTH SEBELUM agihan hibah 2017 diisytiharkan. Pada ketika itu, tekanan politik dalam menghadapi pilihan raya turut mendorong kepada keputusan yang menjadi punca utama krisis kewangan LTH.",
  recommendation:
    "Peruntukan khusus melarang ahli politik yang aktif daripada dilantik dan memegang jawatan sebagai Pengerusi atau anggota Lembaga dan anak-anak syarikat, hendaklah dikanunkan dalam Akta 535.",
  factType: F,
  source: [sourceRef("3.2.13–3.2.16 / 3.17.13 / Ringkasan Eksekutif ¶13", 77, 39)],
};

export const bnmOversight = {
  id: "bnm-oversight",
  legalPosition:
    "LTH ialah Institusi Kewangan Bukan Bank (IKBB) dan tidak tertakluk kepada Akta Perkhidmatan Kewangan Islam 2013 — ia bukan institusi di bawah kawalan BNM.",
  monitoringBasis:
    "BNM memantau IKBB yang mempunyai kesalinghubungan tinggi dengan sistem kewangan negara. LTH memegang aset kewangan isi rumah dalam bentuk deposit yang tinggi, melabur dalam aset kewangan yang sama dengan institusi kewangan lain, dan merupakan pemegang saham utama Bank Islam dan Syarikat Takaful Malaysia.",
  cabinetDecision: {
    date: "2018-12-07",
    decision: "Meletakkan LTH secara pentadbiran di bawah kawal selia BNM mulai 1 Januari 2019.",
    gap: "Jemaah Menteri TIDAK menyatakan secara jelas skop kawal selia yang sepatutnya dilaksanakan oleh BNM.",
  },
  examination: {
    from: "2019-01-17",
    to: "2019-02-28",
    legalBasis:
      "Seksyen 33 Akta Bank Negara Malaysia 2009 (Akta 701) dan seksyen 25 Akta Pencegahan Pengubahan Wang Haram (Akta 613/673 seperti dinyatakan laporan)",
  },
  commissionFinding:
    "Arahan Jemaah Menteri 7 Disember 2018 tidak selari dengan Akta 535 yang memberi tanggungjawab kawal selia LTH kepada Menteri Hal Ehwal Agama. BNM sendiri mengakui dalam sesi inkuiri bahawa ia tidak mempunyai kepakaran sepenuhnya untuk mengawal selia LTH khususnya dalam aspek pengurusan haji dan pelaburan.",
  recommendation:
    "BNM tidak seharusnya mengawal selia LTH. Jika masih diperlukan, hadkan kepada (a) kawalan rizab dan (b) pengurusan kecairan — dan tidak tertakluk kepada Akta 759, Akta 758 atau Akta 618.",
  factType: F,
  source: [sourceRef("3.6.1–3.6.7", 99, 61)],
};

/**
 * Surat amaran pengawal selia. Ini ialah "jejak amaran" — bukti bahawa
 * masalah dikenal pasti bertahun-tahun sebelum krisis diisytiharkan.
 */
export const regulatorWarnings = [
  { date: "2014-08-21", from: "BNM", to: "Pengerusi LTH", subject: "Deposit Taking and Management of Liquidity" },
  { date: "2014-12-19", from: "BNM", to: "Pengerusi LTH", subject: "Pengambilan Deposit dan Pengurusan Kecairan" },
  { date: "2015-12-23", from: "BNM", to: "Pengerusi LTH", subject: "Keperluan Merumus Dasar Rizab" },
  { date: "2015-12-23", from: "BNM", to: "Menteri di Jabatan Perdana Menteri", subject: "Pengurusan Kewangan Lembaga Tabung Haji" },
  { date: "2016-12-14", from: "BNM", to: "LTH", subject: "Keperluan Merumus Dasar Rizab (disebut dalam 3.17.10)" },
  { date: "2017-02-17", from: "BNM", to: "LTH", subject: "Keperluan Merumus Dasar Rizab (disebut dalam 3.17.10)" },
  { date: "2018-07-04", from: "KAN", to: "Perdana Menteri", subject: "Perbincangan mengenai Pendapat Berteguran yang dicadangkan" },
  { date: "2018-07-16", from: "KAN", to: "LTH", subject: "Sijil Audit dengan 'Emphasis of Matter' bagi tahun kewangan 2017" },
  { date: "2018-10-25", from: "KAN", to: "Pengerusi LTH", subject: "Ulasan JAN mengenai pandangan Lembaga Pengarah terhadap Penyata Kewangan 2017" },
  { date: "2018-12-19", from: "KAN", to: "Perdana Menteri", subject: "Penjelasan JAN terhadap isu berbangkit mengenai Penyata Kewangan 2017" },
  { date: "2018-12-28", from: "BNM", to: "Perdana Menteri", subject: "Pengawalseliaan dan Cadangan Langkah-langkah Kehematan ke atas LTH" },
  { date: "2019-06-26", from: "BNM", to: "Perdana Menteri", subject: "Outcome of the Supervisory Review of Lembaga Tabung Haji (termasuk isu zakat di bawah akad Wadi'ah)" },
  { date: "2022-04-18", from: "BNM", to: "Pengerusi Suruhanjaya", subject: "Recommendation on the Future Business Model for Lembaga Tabung Haji" },
].map((w) => ({
  ...w,
  factType: F,
  exhibitVolume: "Jilid 12",
  source: [sourceRef("3.6.2 / 3.17.10 / Senarai Ekshibit Jilid 12", 247, 209)],
}));

export const bnmWarningsIgnored = {
  id: "bnm-warnings-ignored",
  finding:
    "Surat-surat BNM bertarikh 19 Disember 2014, 23 Disember 2015, 14 Disember 2016 dan 17 Februari 2017 dihantar kepada LTH tetapi tidak mendapat perhatian yang sewajarnya.",
  derivedNote:
    "TERBITAN: amaran bertulis BNM yang pertama bertarikh 21 Ogos 2014. Krisis diisytiharkan awam melalui 'Emphasis of Matter' KAN pada 16 Julai 2018 — jurang kira-kira 3 tahun 11 bulan.",
  factType: F,
  source: [sourceRef("3.17.10", 212, 174)],
};

export const auditFailure = {
  id: "audit-failure",
  auditorGeneralYears: "2014–2017 diberi Sijil Audit Bersih",
  emphasisOfMatterDate: "2018-07-16",
  emphasisOfMatterContent: [
    "Kaedah penetapan polisi rosot nilai aset kewangan LTH adalah tidak konsisten; terdapat perubahan polisi rosot nilai pada setiap tahun khususnya dalam tahun berakhir 31 Disember 2017 di mana polisi diubah sebanyak 2 kali.",
    "Dalam tahun berakhir 31 Disember 2017 LTH tidak merekodkan rosot nilai berjumlah RM227.81 juta terhadap pelaburan dalam 3 syarikat subsidiari dan 3 syarikat bersekutu, khususnya TH Heavy Engineering Berhad berjumlah RM164.58 juta.",
  ],
  kanExplanationQuote:
    "\"Pendapat Berteguran telah dicadangkan terhadap Penyata Kewangan TH bagi tahun berakhir 31 Disember 2017 sekiranya tiada pelarasan dibuat untuk dua penemuan material… Bagaimanapun, hasil perbincangan tersebut, sekiranya Pendapat Berteguran diberikan, secara tidak langsung ianya akan mempengaruhi espektasi dan persepsi negatif pihak berkepentingan (stakeholder), khususnya pendeposit untuk terus menyimpan di TH. Dengan mengambil kira perkara tersebut, Pendapat Tanpa Teguran dengan 'Emphasis of Matter' telah diberikan pada 16 Julai 2018.\"",
  kanAtTheTime: "Tan Sri Madinah binti Mohamad (KAN 23 Februari 2017 – 22 Februari 2019)",
  commissionFinding:
    "KAN telah mempertimbangkan perkara-perkara di luar skop audit dalam penemuannya. JAN tidak tegas dalam pengauditan. Untuk tahun kewangan 2017, JAN tidak sepatutnya memberi Sijil Audit Bersih; perkara yang dinyatakan sebagai 'Emphasis of Matter' sepatutnya dinyatakan sebagai ketidakpatuhan yang serius.",
  consequenceStated:
    "Tanpa Sijil Audit Bersih, LTH tidak sepatutnya mengisytiharkan hibah tahunan 4.50% dan hibah haji 1.75% yang menelan belanja sehingga RM2.75 bilion bagi tahun kewangan 2017.",
  consequenceNote:
    "PERHATIAN: angka 'RM2.75 bilion' dalam Ringkasan Eksekutif tidak sepadan dengan jumlah hibah 2017 sebenar dalam jadual 3.11.7 (RM3.324 bilion) mahupun dengan kapasiti RM2.70 bilion yang dianggarkan JAN. Lihat `dataConflicts`.",
  janPositionOnHibah:
    "Pegawai JAN menyatakan JAN tidak bertanggungjawab ke atas pengisytiharan hibah kerana ia di bawah bidang kuasa Lembaga mengikut seksyen 22 Akta 535. Suruhanjaya menolak pandangan ini.",
  recommendation:
    "Pengauditan penyata kewangan LTH tidak lagi dipertanggungjawabkan kepada JAN; LTH boleh melantik Firma Akauntan Swasta.",
  factType: F,
  source: [sourceRef("3.11.1–3.11.18 / Ringkasan Eksekutif ¶22(iii)", 125, 87)],
};

export const eyRavRole = {
  id: "ey-rav-role",
  eyPartner: "Encik Ahmad Qadri bin Jahubar Sathik",
  eyScopeClaim:
    "Skop tugasan EY adalah menyemak Proforma Penyata Kewangan dan TIDAK merangkumi sebarang semakan ke atas penyata kewangan beraudit LTH yang diaudit oleh KAN. Tugasan terhad kepada menyemak kesan pelaburan dalam usaha sama, syarikat berkaitan, syarikat subsidiari, sekuriti dipegang sehingga matang, dan harta/loji/kelengkapan yang telah diselaraskan LTH untuk mengira RAV berdasarkan kriteria yang ditetapkan LTH.",
  eyAdmission:
    "Ahmad Qadri tidak mempertikaikan bahawa berdasarkan penyata kewangan beraudit LTH bagi tahun 2015–2017, nilai liabiliti LTH lebih besar daripada nilai asetnya.",
  timelineContradiction: {
    eyRavReviewIssued: "2018-05-23",
    janAuditedFsFinalised: "2018-07-16",
    gapDays: 54,
    finding:
      "Suruhanjaya mendapati kenyataan bahawa Proforma Penyata Kewangan berasaskan penyata kewangan yang telah diaudit KAN adalah TIDAK BENAR — Laporan Semakan RAV oleh EY dikeluarkan 23 Mei 2018, manakala Penyata Kewangan Beraudit JAN dimuktamadkan 16 Julai 2018.",
    derivedNote: "TERBITAN: jurang 54 hari antara kedua-dua tarikh.",
  },
  contradiction:
    "Kenyataan Ahmad Qadri bercanggah dengan kenyataan pihak pengurusan LTH yang mendakwa mereka bergantung semata-mata kepada rangka kerja RAV seperti yang diperakui oleh EY.",
  eyOwnDisclaimer:
    "EY sendiri menyatakan laporan Pro Forma Financial Information bukanlah untuk dijadikan asas untuk LTH membayar hibah.",
  proformaReportDates: ["2016-09-30 (FY2015)", "2017-07-12 (FY2016)", "2018-05-23 (FY2017)"],
  factType: F,
  source: [sourceRef("3.9.18–3.9.21 / 3.11.8", 118, 80)],
};

export const cfoPosition = {
  id: "cfo-position",
  person: "Datuk Rozaida binti Omar, Ketua Pegawai Kewangan Kumpulan",
  argument:
    "Kaedah asas pengiraan hibah tahunan tidak dinyatakan dalam Akta 535, jadi ia boleh ditentukan oleh Lembaga. Seksyen 22(3)(a) tidak menyatakan bahawa pengiraan aset melebihi liabiliti hanya perlu merujuk kepada Penyata Kewangan. Walaupun terma 'Nilai Aset Terlaras (Net Worth Adjusted)' tidak disebut secara eksplisit dalam seksyen 22(3)(a), kaedah perkiraannya memenuhi maksud 'dikira seolah-olah kena dibayar dengan serta merta'.",
  supportingEvidenceCited: [
    "Laporan EY 30 Jun 2016 mencadangkan metodologi menilai aset; EY merujuk seksyen 22(3)(a) tiada definisi atau garis panduan jelas.",
    "Istilah Nilai Aset Terlaras diperkenalkan dalam Laporan Tahunan TH 2015 (m/s 127), dibentangkan ke Dewan Rakyat 19 Oktober 2016.",
    "Istilah yang sama digunakan dalam Laporan Tahunan TH 2016 (m/s 102), dibentangkan ke Dewan Rakyat 2 Ogos 2017.",
    "Kedua-dua laporan tahunan dimuat naik di laman web Tabung Haji untuk rujukan orang awam.",
    "Rujukan mantan Pengerusi dalam minit mesyuarat KKTH1/MK3-18(Bil1) bertarikh 14 Februari 2018.",
  ],
  commissionResponse:
    "Suruhanjaya berpendapat pembayaran hibah 2014–2017 yang berpandukan RAV tidak selaras dengan kehendak seksyen 22 Akta 535. Pengiraan RAV bukanlah pengiraan yang mematuhi standard piawaian perakaunan yang diakui umum.",
  factType: F,
  source: [sourceRef("3.11.3–3.11.9", 125, 87)],
};

/* ------------------------------------------------------------------ *
 * PENGUATKUASAAN
 * ------------------------------------------------------------------ */

export const policeReports = [
  {
    id: "pr-yth",
    date: "2018-11-30",
    reference: "Dang Wangi/31347/2018",
    complainant: "Idrus bin Ismail, mantan Setiausaha Syarikat LTH",
    subject:
      "Penganjuran aktiviti dan penggunaan wang oleh Yayasan Tabung Haji yang didakwa menyalahi Memorandum and Articles of Association Yayasan.",
    status: "Siasatan PDRM selesai; kertas siasatan dirujuk kepada Jabatan Peguam Negara untuk arahan Pendakwa Raya.",
  },
  {
    id: "pr-thip",
    date: "2018-11-30",
    reference: "Dang Wangi/31331/2018",
    complainant: "Idrus bin Ismail, mantan Setiausaha Syarikat LTH",
    subject:
      "Dakwaan salah nyataan (misrepresentation) dan penyembunyian maklumat berkaitan penjualan 95% saham LTH dalam PT TH Indo Plantations kepada PT Borneo Pacific pada tahun 2012, dianggarkan berjumlah USD910 juta. Saham asalnya dipegang oleh TH Indopalms Sdn. Bhd. dan TH Indo Industries Sdn. Bhd.",
    status:
      "Siasatan berterusan; PDRM masih dalam proses soal siasat dan memerlukan persetujuan pihak berkuasa Indonesia untuk siasatan rentas sempadan.",
  },
  {
    id: "pr-trurich",
    date: "2018-12-13",
    reference: "Dang Wangi/32724/2018",
    complainant: "Aliatun binti Mahmud, mantan Setiausaha Trurich",
    subject:
      "Tindakan Trurich memasuki perjanjian pembelian saham dengan lima syarikat di Indonesia; dakwaan manipulasi laporan kesesuaian tanah bagi 40,880 hektar di Kalimantan Utara dan Tengah, menyebabkan Trurich memperoleh ladang bernilai sekitar USD58 juta (2008–2009).",
    status: "Siasatan berterusan; menunggu kebenaran pihak berkuasa Indonesia.",
  },
  {
    id: "pr-hibah-2017",
    date: "2019-01-16",
    reference: "Dang Wangi/1484/2019",
    complainant: "Idrus bin Ismail, mantan Setiausaha Syarikat LTH",
    subject:
      "Pemberian/pengisytiharan untung boleh agih (hibah) bagi tahun kewangan 2017 yang bercanggah dengan seksyen 22 Akta 535; dakwaan salah nyataan dalam dua kertas kerja yang dibentangkan kepada dua Mesyuarat Khas Lembaga Pengarah LTH pada 6 dan 9 Februari 2018.",
    status: "Siasatan PDRM selesai; kertas siasatan dirujuk kepada Jabatan Peguam Negara untuk arahan Pendakwa Raya.",
  },
].map((p) => ({ factType: F, source: [sourceRef("3.15.1–3.15.10", 193, 155)], ...p }));

export const disciplinaryActions = {
  id: "disciplinary-actions",
  officers: [
    { name: "Datuk Rozaida binti Omar", roleThen: "Ketua Pegawai Kewangan Kumpulan (Gred K)", roleNow: "Pengurus Besar Strategik Modal Insan (Gred J), Jabatan Modal Insan, LTH" },
    { name: "Dato' Adi Azuan Abdul Ghani", roleThen: "Ketua Pegawai Operasi (Gred K)", roleNow: "Pengurus Besar Kanan Kafe & Pembangunan Perniagaan (Gred K), TH Hotel & Residence Sdn. Bhd." },
    { name: "Rifina binti Md Ariff", roleThen: "Pengurus Besar Kanan Perkhidmatan Korporat dan Hartanah (Gred K)", roleNow: "Ketua Bahagian Risiko dan Pematuhan (Gred J), TH Plantation Berhad" },
    { name: "Mohd Hisham bin Harun", roleThen: "Ketua Pegawai Sumber Manusia (Gred K)", roleNow: "Head, Business and Corporate Affairs (Gred J), TH Properties Sdn. Bhd." },
    { name: "Hazlina binti Mohd Khalid", roleThen: "Penasihat Undang-Undang (Gred J)", roleNow: "Timbalan Pengurus Besar (Gred H2), TH Plantations Berhad" },
  ],
  allStillEmployed: true,
  allStillEmployedNote:
    "Kesemua pegawai pengurusan yang pernah diambil tindakan tatatertib masih kekal bertugas dengan LTH atau anak syarikatnya pada tarikh laporan.",
  clusters: [
    {
      cluster: 1,
      issue: "Penjualan saham dalam PT TH Indo Plantations",
      chargeDate: "2020-05-29",
      chargedOfficers: ["Datuk Rozaida binti Omar", "Rifina binti Md Ariff", "Mohd Hisham bin Harun", "Hazlina binti Mohd Khalid"],
      committeeDecisionDate: "2021-04-21",
      committeeDecision: "Buang kerja",
      appealDecisionDate: "2021-09-06",
      appealDecision: "Dikurangkan kepada turun pangkat",
    },
    {
      cluster: 2,
      issue:
        "Pelanggaran seksyen 24(3)(5) Akta Syarikat 1965 (Akta 125) — tiada permohonan awal kelulusan kepada Menteri Perdagangan Dalam Negeri dan Hal Ehwal Pengguna sebelum sumbangan RM22.12 juta dibuat (Yayasan Tabung Haji)",
      contributionAmount_rm_million: 22.12,
      chargeDates: ["2019-03-15", "2019-03-19"],
      chargedOfficers: ["Datuk Rozaida binti Omar", "Dato' Adi Azuan Abdul Ghani", "Mohd Hisham bin Harun"],
      committeeDecisionDates: ["2019-05-31", "2019-11-01"],
      committeeDecision: "Turun pangkat",
      appealDecisionDates: ["2019-07-18", "2020-01-28"],
      appealDecision:
        "Amaran keras sahaja (Datuk Rozaida binti Omar dan Dato' Adi Azuan Abdul Ghani); amaran dan tangguh kenaikan gaji (Mohd Hisham bin Harun)",
      delayMonths: 19,
      delayNote:
        "19 bulan daripada tarikh surat representasi Dato' Adi Azuan Abdul Ghani sebelum Jawatankuasa Tatatertib bersidang.",
    },
    {
      cluster: 3,
      issue: "Perisytiharan untung boleh agih (hibah) bagi tahun kewangan 2017",
      chargeDate: "2020-01-03",
      representationDate: "2020-01-17",
      chargedOfficers: ["Datuk Rozaida binti Omar"],
      committeeDecisionDate: "2021-04-16",
      committeeDecision: "Buang kerja",
      appealDecisionDate: "2021-09-06",
      appealDecision: "Dikurangkan kepada turun pangkat",
      delayMonths: 15,
    },
    {
      cluster: 4,
      issue:
        "Pengemukaan tuntutan kepada Pengurus Unit Bayaran, Bahagian Perkhidmatan LTH yang mengandungi butiran palsu",
      chargeDate: "2019-01-11",
      representationDate: "2019-01-21",
      chargedOfficers: ["Hazlina binti Mohd Khalid"],
      committeeDecisionDate: "2019-11-01",
      committeeDecision: "Turun pangkat",
      appealDecisionDate: "2020-01-28",
      appealDecision: "Hukuman turun pangkat dikekalkan",
      delayMonths: 10,
    },
  ],
  commissionFinding:
    "Proses tindakan tatatertib mengambil masa yang terlalu lama. Proses penyempurnaan tindakan tatatertib termasuk durasi penahanan kerja perlu diperkemas dan disegerakan agar dilihat berkesan, cekap, adil dan telus.",
  derivedObservation:
    "TERBITAN: dalam ketiga-tiga kluster yang membabitkan rayuan (1, 2 dan 3), hukuman asal dikurangkan pada peringkat rayuan. Bagi Kluster 1 dan 3, hukuman buang kerja bertukar menjadi turun pangkat.",
  factType: F,
  source: [sourceRef("3.15.12–3.15.20", 197, 159)],
};

export const macpReports = {
  id: "sprm-reports",
  agency: "Suruhanjaya Pencegahan Rasuah Malaysia (SPRM)",
  allegations: [
    "Dakwaan rasuah dalam pembelian Ladang Weida Bhd oleh TH Plantation",
    "Dakwaan penyelewengan dan salah guna kuasa dalam penyewaan Restoran Opah, KL Sentral",
    "Dakwaan penyelewengan dan salah guna kuasa dalam penyewaan Restoran Nasi Dalca, Lantai 2 Bangunan Ibu Pejabat LTH",
    "Dakwaan penyelewengan dan rasuah oleh mantan Ketua Pegawai Operasi LTH dalam melakukan pengubahsuaian (renovation)",
    "Dakwaan pemalsuan dokumen pembekalan rubber seedlings TH Plantation di Ladang TH-Usia Jatimas, Sandakan",
    "Dakwaan salah laku dan penyelewengan pegawai THP Bina Sdn. Bhd. dan THP Timur Sdn. Bhd.",
  ],
  status: "SPRM masih menjalankan siasatan; perbincangan dan konsultasi antara LTH dan SPRM berterusan.",
  factType: F,
  source: [sourceRef("3.15.21–3.15.22", 201, 163)],
};

export const litigation = {
  id: "litigation",
  activeDisputes: [
    { entity: "PT TH Indo Plantations / PT Borneo Pacific", forum: "Mahkamah / siasatan", status: "Isu berbangkit daripada penjualan pegangan ekuiti LTH" },
    { entity: "Al-Rawda Real Estates Development & Project Management Co. Ltd.", forum: "Mahkamah Penguatkuasaan Arab Saudi dan timbang tara", status: "Timbang tara sedang berlangsung; likuidasi aset dimulakan" },
    { entity: "Emrail Sdn. Bhd. / Lingkaran Hartaniaga Sdn. Bhd.", forum: "AIAC (timbang tara)", status: "Penimbang tara belum dilantik" },
    { entity: "Wellspring Worldwide Limited (Promoters)", forum: "Mahkamah Tinggi Kuala Lumpur", status: "Perintah kebankrapan dibenarkan 25 Januari 2022" },
    { entity: "Putrajaya Perdana Berhad / Cendana Destini Sdn. Bhd.", forum: "Rundingan penyelesaian", status: "Cadangan Pengaturan Penyelesaian dalam proses kelulusan dalaman" },
  ],
  commissionView:
    "Transaksi pelaburan yang masih dalam pertikaian perlu dipantau secara dekat dan dijadikan agenda khusus oleh LTH. Penyelesaian di luar mahkamah dan timbang tara harus dipertingkatkan.",
  factType: F,
  source: [sourceRef("3.15.23–3.15.25", 202, 164)],
};

/* ------------------------------------------------------------------ *
 * MODEL PERNIAGAAN: CADANGAN YANG DITOLAK DAN DITERIMA
 * ------------------------------------------------------------------ */

export const businessModelProposals = [
  {
    id: "bnm-1",
    proposer: "BNM",
    year: 2018,
    proposal:
      "LTH hanya menerima deposit bagi tujuan mengerjakan haji dan memperkenalkan akaun pelaburan yang memberikan pulangan berbeza daripada deposit haji.",
    commissionAssessment:
      "Akan meluaskan skop LTH; mewujudkan perbezaan kadar pulangan antara dua jenis pendeposit; meningkatkan risiko; dana dalam akaun pelaburan baharu tidak dijamin Kerajaan sehingga berkemungkinan membawa kepada pengeluaran dana yang tinggi.",
    accepted: false,
  },
  {
    id: "bnm-2",
    proposer: "BNM",
    year: 2018,
    proposal:
      "LTH hanya menerima deposit bagi tujuan mengerjakan haji dan menguruskan operasi haji; jika subsidi diteruskan, ia perlu ditampung Kerajaan.",
    commissionAssessment:
      "Mengehadkan deposit yang boleh diterima; pendeposit besar terpaksa mengeluarkan deposit; meningkatkan risiko tumpuan. Dianggarkan 75% deposit LTH dimiliki oleh hanya 5% pendeposit.",
    accepted: false,
  },
  {
    id: "bnm-3",
    proposer: "BNM",
    year: 2018,
    proposal:
      "LTH hanya menguruskan operasi haji; pengambilan deposit dan pelaburan dijalankan oleh Bank Islam (anak syarikat LTH). Komitmen Kerajaan diperlukan untuk menampung kos dan subsidi haji.",
    commissionAssessment:
      "Menjadikan LTH sebuah syarikat pelancongan berskala besar sahaja; risiko membiayai urusan haji ditanggung sepenuhnya oleh Kerajaan yang sudah menanggung Sukuk RM27 bilion; pengasingan dana sukar kerana dana telah dilaburkan dalam ekuiti, hartanah dan pelaburan pendapatan tetap yang tidak mudah dicairkan.",
    accepted: false,
  },
  {
    id: "bnm-2022",
    proposer: "BNM",
    date: "2022-04-18",
    proposal:
      "Aktiviti pelaburan LTH dijalankan oleh sebuah entiti berasingan yang dikawal selia oleh BNM atau Suruhanjaya Sekuriti Malaysia. Disertai keperluan: mengkaji semula polisi subsidi haji; mewujudkan tadbir urus korporat dan syariah yang mantap; memodenkan Akta 535 dengan piawaian berhemah.",
    commissionAssessment:
      "Hanya akan menjadikan LTH sebagai 'glorified travel agent' kerana fungsi pelaburan diuruskan pihak luar, menjadikan LTH hilang kemampuan mengkoordinasi penggunaan keuntungan pelaburan untuk membiayai operasi hajinya. Model semasa bergantung kepada subsidi silang (cross-subsidy).",
    accepted: false,
  },
  {
    id: "ey-3-entities",
    proposer: "Ernst & Young (bersama ZICO)",
    year: 2021,
    proposal:
      "LTH dipecahkan kepada tiga entiti berasingan: Pengurus Dana (Fund Manager), Dana Hak Milik (Own Fund Proprietary), dan Akaun Dana Pendeposit (Depositors Fund Account).",
    proposerJustification: [
      "Menjadikan aktiviti pengurusan haji dan pengurusan dana lebih telus",
      "Pengasingan mengikut amalan tadbir urus terbaik",
      "Pengurusan dana akan dikawal selia",
      "Mewujudkan dana persendirian (proprietary fund) sebagai modal bayangan (pseudo capital) LTH",
    ],
    commissionAssessment:
      "Tiga entiti dengan tanggungjawab fidusiari berasingan berkemungkinan mencipta percanggahan kepentingan; meningkatkan kos keseluruhan; boleh menjejaskan operasi haji; berisiko ketirisan cukai kerana LTH kini diberikan pengecualian cukai; penambahan rizab akan bergantung sepenuhnya kepada lebihan operasi haji; tiga Lembaga Pengarah akan mengundang campur tangan politik yang LEBIH besar, bukan berkurangan.",
    accepted: false,
  },
  {
    id: "rci-dana-haji",
    proposer: "Suruhanjaya Siasatan Diraja",
    year: 2022,
    proposal:
      "Kekalkan struktur LTH sedia ada. Asingkan fungsi pengurusan pelaburan sebagai sebuah JABATAN dalam LTH bernama 'Dana Haji' — bukan syarikat subsidiari — yang dikanunkan dalam Akta 535 dan dikawal selia oleh Suruhanjaya Sekuriti Malaysia.",
    design: [
      "Dana Haji berada di dalam Tabung Haji tetapi ditadbir oleh lembaga yang berbeza",
      "Ahli lembaga dilantik oleh Menteri Kewangan",
      "Ahli lembaga mestilah berpadanan dan bersesuaian; ahli politik aktif tidak dibenarkan",
      "Dikawal selia oleh Suruhanjaya Sekuriti; bertindak dengan bebas dan profesional",
      "Lembaga LTH TIADA kuasa mengarah perkara berkaitan pelaburan Dana Haji, tetapi Dana Haji perlu melapor pencapaiannya kepada Lembaga secara berkala",
      "Jabatan Audit dan Jawatankuasa Audit LTH diberi kuasa mengakses dokumen kewangan Dana Haji",
      "Dipimpin dan dipantau oleh Panel Pelaburan yang bertanggungjawab ke atas alokasi aset, pengurusan portfolio, pencapaian prestasi pelaburan, pengurusan risiko, dan pelantikan pengurus portfolio luar",
    ],
    rationale:
      "Kedua-dua fungsi pengurusan dana dan pengurusan haji perlu berada dalam entiti yang sama kerana terdapat unsur subsidi silang (cross subsidy) seperti yang diamalkan sekarang. Selagi subsidi menjadi amalan, pengasingan antara pembiaya dan pengurus haji akan menimbulkan masalah dalam operasi haji.",
    accepted: true,
  },
].map((p) => ({ factType: F, source: [sourceRef("3.17.14–3.17.28 / 3.18", 214, 176)], ...p }));

export const externalFundManagerPerformance = {
  id: "external-fund-manager",
  finding:
    "Rekod menunjukkan prestasi pengurusan dana LTH oleh pengurus dana luar terutamanya bagi portfolio ekuiti luar negara adalah tidak memberangsangkan.",
  reason:
    "Mereka diberikan mandat untuk melabur di pasaran baru muncul (emerging markets) dan bukannya pasaran global. Mandat juga hanya pada pasaran Asia Pasifik di mana ciri risiko pasaran hampir sama dengan pasaran tempatan dan tidak menepati kepelbagaian risiko pasaran.",
  factType: F,
  source: [sourceRef("3.17.22", 219, 181)],
  cautions: ["Tiada angka prestasi (pulangan %, AUM, tempoh) diberikan. Pernyataan ini kualitatif sahaja."],
};

/* ------------------------------------------------------------------ *
 * PUNCA KRISIS (RINGKASAN EKSEKUTIF ¶22)
 * ------------------------------------------------------------------ */

export const crisisDrivers = [
  {
    id: "driver-hibah",
    rank: 1,
    title: "Pembayaran hibah yang tinggi",
    mechanism:
      "Keghairahan membayar hibah tinggi sejak 2014 hingga 2017 melampaui kemampuan kewangan LTH, menyebabkan rizab menyusut. Kadar tinggi menarik pendeposit yang mencari pulangan tinggi, menjadikan LTH tergelincir daripada matlamat penubuhannya dan mendedahkannya kepada risiko bank run.",
    evidenceLinks: ["hibah-rates", "hibah-amounts", "assets-liabilities", "deposit-trajectory"],
  },
  {
    id: "driver-accounting",
    rank: 2,
    title: "Kreatif dalam amalan perakaunan",
    mechanism:
      "Pengurusan LTH menggunakan RAV, bukan nilai aset dalam Penyata Kewangan Tahunan beraudit, untuk menentukan pematuhan kepada seksyen 22. Tiada pelarasan dibuat ke atas nilai pelaburan yang telah susut. Polisi rosot nilai diubah dua kali dalam tahun kewangan 2017.",
    evidenceLinks: ["rav-2017", "impairment-policy-2017", "unrecorded-impairment-2017", "pwc-adjustment-2017"],
  },
  {
    id: "driver-audit",
    rank: 3,
    title: "Ketidaktegasan Ketua Audit Negara",
    mechanism:
      "Penyata kewangan 2014–2017 diberi Sijil Audit Bersih. KAN mempertimbangkan kesan persepsi pihak berkepentingan — perkara di luar skop audit — semasa memutuskan untuk tidak memberi Pendapat Berteguran.",
    evidenceLinks: ["audit-failure"],
  },
  {
    id: "driver-vision",
    rank: 4,
    title: "Visi LTH sebagai tonggak ekonomi ummah",
    mechanism:
      "Peranan LTH diperluaskan melangkaui dua tujuan asalnya. Dengan visi ini LTH melibatkan diri dalam pelaburan hartanah dan perladangan secara besar-besaran sedangkan LTH tidak mempunyai kepakaran dan kemahiran, mengakibatkan kerugian besar terutamanya dalam anak-anak syarikat.",
    evidenceLinks: ["strategic-investment-assessment", "problematic-investments"],
  },
  {
    id: "driver-hafis",
    rank: 5,
    title: "Tanggungan Bantuan Kewangan Haji (HAFIS)",
    mechanism:
      "HAFIS bermula 2001. Bayaran haji dibekukan pada RM9,980 dari 2009 hingga 2021 sedangkan kos haji terus meningkat. HAFIS diambil daripada keuntungan pelaburan, jadi peningkatannya terus menjejaskan kadar hibah kepada pendeposit.",
    evidenceLinks: ["hafis-actual", "hafis-projection", "hajj-subsidy-impact"],
  },
].map((d) => ({
  factType: "opinion",
  attribution: "Penemuan Suruhanjaya",
  source: [sourceRef("Ringkasan Eksekutif ¶22", 19, "xvii")],
  ...d,
}));

/* ------------------------------------------------------------------ *
 * SYOR
 * ------------------------------------------------------------------ */

export const recommendations = [
  { id: "r-4.4.1", ref: "4.4.1", theme: "Pindaan Akta 535", text: "Pindaan Akta 535 untuk menambah baik tadbir urus dan kawal selia LTH.", subItems: [
    "Kriteria khusus dan kaedah pemilihan anggota Lembaga",
    "Bidang kepakaran anggota Lembaga dinyatakan secara khusus (perbankan, perniagaan, ekonomi, syariah, perundangan, perakaunan)",
    "Larangan khusus ahli politik aktif daripada dilantik sebagai Pengerusi/anggota Lembaga dan anak syarikat",
    "Pembatalan pelantikan perlu dirujuk kepada jawatankuasa/badan penasihat bebas",
    "Penamatan perkhidmatan hendaklah diberi sebab yang munasabah",
    "Jawatankuasa Urusan Haji, Jawatankuasa Penasihat Syariah dan Panel Pelaburan dikanunkan, berserta peruntukan lazim (kuorum, undi pemutus, kekosongan jawatan, hilang kelayakan, penzahiran kepentingan)",
    "Peruntukan lebih jelas mengenai pengiraan hibah, berpandukan penyata kewangan tahunan beraudit mengikut piawaian MIA",
    "Penubuhan jabatan 'Dana Haji' yang dikawal selia Suruhanjaya Sekuriti Malaysia",
    "Pindaan seksyen 26 untuk mengecualikan pemakaian Akta 240 terhadap LTH",
  ] },
  { id: "r-4.4.2", ref: "4.4.2", theme: "Struktur tadbir urus", text: "Mandat Menteri Hal Ehwal Agama untuk pengurusan haji; Menteri Kewangan untuk pengurusan kewangan, dana dan pelaburan. Pelantikan anggota Lembaga dan KPE oleh Perdana Menteri atas syor badan penasihat bebas." },
  { id: "r-4.4.3", ref: "4.4.3", theme: "Konflik kepentingan", text: "Penglibatan anggota Lembaga dan pengurusan LTH dalam pengurusan anak-anak syarikat dihadkan." },
  { id: "r-4.4.4", ref: "4.4.4", theme: "Kawal selia", text: "BNM tidak seharusnya mengawal selia LTH. Jika perlu, hadkan kepada kawalan rizab dan pengurusan kecairan, tidak tertakluk kepada Akta 759, 758 dan 618." },
  { id: "r-4.4.5", ref: "4.4.5", theme: "Audit", text: "Pengauditan penyata kewangan LTH tidak lagi dipertanggungjawabkan kepada JAN; LTH boleh melantik Firma Akauntan Swasta." },
  { id: "r-4.4.6", ref: "4.4.6", theme: "Hibah", text: "Kadar hibah perlu berdasarkan penyata kewangan tahunan yang telah diaudit, bukan Laporan Proforma. RAV tidak boleh dijadikan asas." },
  { id: "r-4.4.7", ref: "4.4.7", theme: "Pelaporan kewangan", text: "Laporan Penyata Kewangan LTH mematuhi sepenuhnya piawaian dalam Akta 240 dan PA 3.1 Garis Panduan Badan Berkanun Persekutuan." },
  { id: "r-4.4.8", ref: "4.4.8", theme: "Bonus", text: "Amalan pemberian bonus yang terlalu tinggi kepada kakitangan hendaklah dihentikan." },
  { id: "r-4.4.9", ref: "4.4.9", theme: "Bonus", text: "Usaha mendapatkan semula bonus yang diberi kepada ahli Lembaga dan Pengurusan TH Properties." },
  { id: "r-4.4.10", ref: "4.4.10", theme: "Audit forensik", text: "Audit forensik ke atas 14 pelaburan bermasalah untuk meneliti bagaimana keputusan pelaburan yang lalu dibuat." },
  { id: "r-4.4.11", ref: "4.4.11", theme: "Penguatkuasaan", text: "Pihak berkuasa wajib mengambil tindakan tegas dan segera ke atas setiap laporan polis atau aduan berkaitan salah laku di LTH." },
  { id: "r-4.4.12", ref: "4.4.12", theme: "Tatatertib", text: "Proses tindakan tatatertib termasuk durasi penahanan kerja perlu diperkemas dan disegerakan." },
  { id: "r-4.4.13", ref: "4.4.13", theme: "Litigasi", text: "Transaksi dalam pertikaian dipantau secara dekat; penyelesaian di luar mahkamah dipertingkatkan." },
  { id: "r-4.4.14", ref: "4.4.14", theme: "Zakat", text: "LTH memastikan bayaran zakat dilaksanakan dengan sempurna dan mengemukakan isu perubahan akad kepada Muzakarah MKI." },
  { id: "r-4.4.15", ref: "4.4.15", theme: "Pelan pemulihan", text: "Kerajaan mengambil perhatian serius terhadap pelaksanaan Pelan Pemulihan 2018. Instrumen Sukuk ditambah baik dengan jaminan Kerajaan." },
  { id: "r-4.4.16", ref: "4.4.16", theme: "Sukuk", text: "Sukuk yang diterbitkan semula perlu mempunyai ciri boleh diniagakan (tradeable)." },
  { id: "r-4.4.17", ref: "4.4.17", theme: "Sukuk", text: "Penerbitan Sukuk boleh ditawarkan kepada institusi kewangan lain, bukan hanya LTH atau Kerajaan." },
  { id: "r-4.4.18", ref: "4.4.18", theme: "Peruntukan", text: "Kerajaan memastikan peruntukan RM1.73 bilion setahun dibuat bagi penebusan awal Sukuk UJSB." },
  { id: "r-4.4.19", ref: "4.4.19", theme: "Sukuk", text: "UJSB digalakkan membuat penebusan awal Sukuk hasil pelupusan aset yang dipindahkan." },
  { id: "r-4.4.20", ref: "4.4.20", theme: "Deposit & HAFIS", text: "Deposit minimum dinaikkan daripada RM1,300 kepada RM12,980; pengeluaran besar dihadkan dengan notis sebulan; subsidi hanya kepada jemaah yang memerlukan." },
  { id: "r-4.4.21", ref: "4.4.21", theme: "Operasi haji", text: "LTH merancang membawa lebih ramai jemaah dan menggunakan sepenuhnya kuota tambahan Kerajaan Arab Saudi." },
  { id: "r-4.4.22", ref: "4.4.22", theme: "Pendaftaran haji", text: "Menaikkan minimum bayaran pendaftaran haji Muassasah daripada RM1,300 kepada RM12,980; mengurangkan tempoh menunggu daripada 130 tahun kepada 33 tahun." },
  { id: "r-4.4.23", ref: "4.4.23", theme: "Dana Haji", text: "Fungsi pelaburan dijalankan bebas dan profesional; pengurusan dana dan pengurusan haji kekal dalam entiti yang sama; fungsi pengurusan pelaburan dikekalkan sebagai jabatan 'Dana Haji' di bawah kawal selia SC." },
  { id: "r-4.4.24", ref: "4.4.24", theme: "Pelaburan", text: "LTH fokus kepada portfolio pengurusan dana; tidak terlibat dengan pelaburan berisiko tinggi khususnya yang diklasifikasikan sebagai strategik." },
  { id: "r-4.4.25", ref: "4.4.25", theme: "Reformasi menyeluruh", text: "Kerajaan mengambil langkah penambahbaikan menyeluruh memperkukuh model perniagaan dan pelaburan LTH termasuk memperkasa tadbir urus melalui pengurusan profesional tanpa campur tangan politik." },
].map((r) => ({
  factType: "opinion",
  attribution: "Syor Suruhanjaya",
  implementationStatus: null,
  implementationStatusNote:
    "Laporan diserahkan 30 Ogos 2022. Status pelaksanaan setiap syor TIDAK diketahui daripada laporan ini sahaja.",
  source: [sourceRef(`BAB EMPAT ${r.ref}`, 230, 192)],
  ...r,
}));

export const improvementsSince2017 = {
  id: "improvements",
  items: [
    { year: 2018, item: "Pemberian bonus kepada kakitangan dikawal mengikut kemampuan kewangan LTH (1 bulan bagi 2018–2020)." },
    { year: 2018, item: "Polisi hibah dipinda; LTH mensasarkan hibah sedikit melepasi kadar purata deposit bank Islam (50–100 mata asas)." },
    { year: 2019, item: "Polisi rizab diperkukuh: RPK ditetapkan 5% NAV atau RM3.5 bilion; pemindahan 2% keuntungan selepas zakat." },
    { year: 2019, item: "Langkah pemulihan keyakinan pendeposit: penerangan media dan perjumpaan bersemuka dengan pihak berkepentingan." },
    { year: 2019, item: "Akad deposit ditukar kepada Wakalah (Disember 2019) selepas kajian menyeluruh." },
    { year: null, item: "Panel Pelaburan diwujudkan semula." },
    { year: null, item: "Dasar baharu mengehadkan jawatan anggota Lembaga/pengurusan di anak syarikat kepada lima syarikat." },
    { year: 2021, item: "LTH melantik EY bersama ZICO mengkaji semula model perniagaan LTH." },
    { year: 2022, item: "Kadar bayaran haji baharu dua lapisan: RM10,980 (B40) dan RM12,980 (bukan B40)." },
  ],
  factType: F,
  source: [sourceRef("3.17 / 3.9.28 / 3.7.9 / 3.12.14", 210, 172)],
};
