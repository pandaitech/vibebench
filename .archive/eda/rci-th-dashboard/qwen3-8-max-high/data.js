/* =========================================================================
   DATA — Laporan Suruhanjaya Siasatan Diraja (RCI) Tabung Haji
   Semua angka diekstrak daripada laporan RCI (OCR markdown) di
   github.com/SyahmiRafsan/rci-tabunghaji — rci-tabung-haji.md

   Label integriti data (jenis):
     F = Fakta laporan   — angka/pernyataan terus daripada laporan
     T = Terbitan        — dikira semula daripada angka laporan (oleh dashboard ini)
     U = Unjuran/Anggaran laporan — anggaran atau unjuran yang disebut dalam laporan
   Setiap fakta ada `src` → perenggan laporan; petikan dalam RCI.SRC.
   ========================================================================= */
window.RCI = {

META: {
  tajuk: "Laporan Suruhanjaya Siasatan Diraja Tabung Haji",
  skop: "Pengurusan dan operasi Lembaga Tabung Haji (LTH) 2014–2020",
  diserahkan: "30 Ogos 2022 (kepada KDYMM Yang di-Pertuan Agong)",
  bertarikh: "19 Julai 2022",
  sumber: "github.com/SyahmiRafsan/rci-tabunghaji (rci-tabung-haji.md, OCR daripada PDF)",
  pesuruhjaya: [
    { nama: "Tun Md Raus bin Sharif", peran: "Pengerusi — Mantan Ketua Hakim Negara" },
    { nama: "Tan Sri Samsudin bin Osman", peran: "Mantan Ketua Setiausaha Negara" },
    { nama: "Tan Sri Abdul Rashid bin Hussain", peran: "Pengasas RHB Group" },
    { nama: "Tan Sri Dr. Mohd Munir bin Abdul Majid", peran: "Pengerusi CARI ASEAN Research & Advocacy" },
    { nama: "Profesor Dr. Asmadi bin Mohamed Naim", peran: "Naib Canselor UniSHAMS" },
    { nama: "Norsyahrin bin Hamidon", peran: "Akauntan Bertauliah" }
  ],
  setiausaha: "Datuk Hajah Hakimah binti Mohd Yusoff (Ketua Pengarah JAKIM)",
  tempoh: "20 Januari 2022 – 19 Julai 2022 (6 bulan)",
  saksi_abs: 45, saksi_dipanggil: 16,
  terma_rujukan: [
    "Meneliti isu LTH 2014–2020 dengan merujuk penemuan PwC, Ernst & Young (EY) dan Roland Berger (RB), tidak termasuk pelan penstrukturan/pemulihan sedang dijalankan",
    "Meneliti semua dokumen & bukti; menentukan sama ada ada perbuatan menyembunyikan maklumat atau memberi kenyataan mengelirukan",
    "Mengesyorkan tindakan terhadap pihak yang melanggar undang-undang",
    "Mengemukakan laporan dan syor penambahbaikan kepada Kerajaan"
  ]
},

/* ---------------------------------------------------------------- SRC
   Petikan sumber. pdf = muka surat PDF (muka surat cetakan + 38).
   ---------------------------------------------------------------- */
SRC: {
  "ringkasan": { p: "Ringkasan Eksekutif", pdf: 13, q: "Suruhanjaya telah mendapati beberapa penemuan penting mengenai pengurusan dan operasi LTH sepanjang tempoh siasatan." },
  "2.1": { p: "Ringkasan Eksekutif §2.1", pdf: 19, q: "Sekiranya piawaian MFRS diguna pakai sepenuhnya bagi tahun kewangan 2017, LTH sepatutnya merekodkan kerugian bersih sebanyak RM1.4 bilion berbanding keuntungan RM3.4 bilion seperti yang direkodkan dalam Laporan Kewangan 2017." },
  "2.2(i)": { p: "Ringkasan Eksekutif §2.2(i)", pdf: 20, q: "Keghairahan untuk membayar agihan keuntungan (hibah) yang tinggi sejak tahun 2014 hingga 2017 telah melampaui kemampuan kewangan LTH. Pembayaran agihan keuntungan (hibah) yang tinggi... telah menyebabkan rizab LTH menyusut." },
  "2.2(ii)": { p: "Ringkasan Eksekutif §2.2(ii)", pdf: 20, q: "Pengurusan LTH telah membuat amalan perakaunan kreatif bagi pengisytiharan agihan keuntungan (hibah) yang tinggi... menggunakan nilai aset yang boleh direalisasikan (Realisable Asset Value (RAV))." },
  "2.2(iii)": { p: "Ringkasan Eksekutif §2.2(iii)", pdf: 21, q: "Sepatutnya untuk tahun kewangan 2017, JAN tidak sepatutnya memberi Sijil Audit Bersih... Tanpa Sijil Audit Bersih, LTH tidak sepatutnya mengisytiharkan agihan keuntungan (hibah) tahunan pada kadar 4.50% dan agihan keuntungan (hibah) haji 1.75% yang telah menelan belanja sehingga RM2.75 bilion." },
  "2.2(v)": { p: "Ringkasan Eksekutif §2.2(v)", pdf: 23, q: "Jumlah HAFIS yang ditanggung oleh LTH telah meningkat daripada RM106 juta pada tahun 2014 kepada RM300 juta pada tahun 2019... Kos HAFIS... dijangka mencecah RM742.47 juta setahun menjelang tahun 2030." },
  "3.6.2": { p: "Perenggan 3.6.2", pdf: 100, q: "Hasil daripada pemantauan BNM, beberapa teguran telah dibuat kepada LTH bermula pada tahun 2014 melalui surat BNM kepada Pengerusi LTH bertarikh 21 Ogos 2014, 19 Disember 2014 dan 23 Disember 2015." },
  "3.7.8": { p: "Perenggan 3.7.8", pdf: 104, q: "Laporan RB mendapati bahawa dalam tahun 2012, 2014 dan 2016, LTH telah menggunakan rizabnya untuk membayar keuntungan (hibah) kepada pendeposit. RB juga mendapati arah aliran rizab yang menurun selepas tahun 2016." },
  "3.7.9": { p: "Perenggan 3.7.9", pdf: 105, q: "Dalam tahun 2019, LTH telah mengukuhkan polisi rizabnya... RPK telah ditetapkan pada tahap 5% daripada nilai aset bersih LTH atau RM3.5 bilion berdasarkan rekod turun naik nilai aset bersih LTH antara tahun 2010 hingga 2018." },
  "3.7.11": { p: "Perenggan 3.7.11", pdf: 106, q: "Berdasarkan maklumat kewangan yang dikemukakan, LTH telah menggunakan rizab yang ada bagi menampung pengagihan keuntungan (hibah) kepada pendeposit dalam tahun 2020 dan 2021." },
  "3.9.2": { p: "Perenggan 3.9.2", pdf: 112, q: "Berdasarkan kepada laporan PwC yang dibentangkan kepada Suruhanjaya ini, pengagihan keuntungan (hibah) boleh diringkaskan seperti berikut: [jadual aset, liabiliti, kekurangan/kelebihan 2014–2017]." },
  "3.9.4": { p: "Perenggan 3.9.4", pdf: 113, q: "Bagi tahun kewangan 2017, sejumlah RM2.294 bilion yang berkaitan dengan TH Plantations Berhad telah dicampurkan dalam pengiraan RAV... hanya RM556 juta adalah berdasarkan laporan penilaian yang dikeluarkan oleh penilai-penilai profesional, sedangkan baki penilaian bernilai RM4.044 bilion hanyalah berdasarkan anggaran pengurusan semata-mata." },
  "3.9.8": { p: "Perenggan 3.9.8", pdf: 115, q: "Untuk LTH, rosot nilai hanya dibuat apabila nilai pasaran jatuh sebanyak 70% daripada kos pelaburan asal. Ini kemudiannya diubah kepada 85% dan seterusnya 90% dalam tempoh satu hari bagi tahun kewangan 2017." },
  "3.9.9": { p: "Perenggan 3.9.9", pdf: 115, q: "Pada tahun 2017, kaedah pengiraan keuntungan (hibah) telah ditukar daripada purata baki deposit bulanan kepada purata baki tahunan... Dengan pertukaran ini LTH telah mengeluarkan lebihan wang sebanyak RM600 juta untuk bayaran agihan keuntungan (hibah) pada tahun 2017." },
  "3.9.12": { p: "Perenggan 3.9.12", pdf: 116, q: "Pada tahun 2017, pihak pengurusan LTH telah menggunakan RAV bagi menjustifikasikan bayaran agihan keuntungan (hibah): Jumlah aset 70,317 + RAV 4,466 = 74,783; liabiliti (74,410); nilai bersih aset terlaras untuk diagihkan 373 (RM juta)." },
  "3.9.13": { p: "Perenggan 3.9.13", pdf: 117, q: "Sekiranya FRS 139 dipatuhi dengan betul, rosot nilai tambahan aset kewangan berjumlah RM1.310 bilion sepatutnya direkodkan... Jumlah rosot nilai terkumpul yang tidak diambil kira oleh LTH adalah RM1.537 bilion yang jauh lebih besar dari nilai bersih aset terlaras berjumlah RM373 juta." },
  "3.9.15": { p: "Perenggan 3.9.15", pdf: 117, q: "Laporan RB... memberi amaran bahawa LTH akan menghadapi masalah apabila MFRS 9 mula berkuat kuasa pada tahun 2018. Pada tarikh laporannya, RB telah menganggarkan kerugian berjumlah RM2.6 bilion akan menjadi ancaman kepada pendapatan masa hadapan LTH." },
  "3.9.22": { p: "Perenggan 3.9.22", pdf: 120, q: "Kadar-kadar pengagihan keuntungan (hibah) untuk tahun-tahun 2014 hingga 2021: [jadual 6.25/5.00/4.25/4.50/1.25/3.05/3.10/3.10]." },
  "3.9.29": { p: "Perenggan 3.9.29", pdf: 122, q: "Para pendeposit LTH telah memberikan reaksi jangka pendek dalam tahun 2019 selepas pengumuman agihan keuntungan (hibah) 1.25% dibuat... Saiz deposit LTH menurun dari kira-kira RM73 bilion sebelum pengumuman... kepada RM69 bilion pada akhir tahun 2019." },
  "3.9.30": { p: "Perenggan 3.9.30", pdf: 122, q: "Pada akhir tahun 2020, jumlah deposit telah kembali meningkat ke tahap lebih kurang RM76 bilion. Pada ketika ini, jumlah dana yang didepositkan dengan LTH sudah mencapai RM88 bilion." },
  "3.11.7": { p: "Perenggan 3.11.7", pdf: 130, q: "Pembayaran keuntungan (hibah) antara 2014 hingga 2020 adalah seperti berikut: [jadual kadar dan jumlah agihan]." },
  "3.11.10": { p: "Perenggan 3.11.10", pdf: 131, q: "Kemampuan LTH membayar keuntungan (hibah) hanya berjumlah RM2.70 bilion, iaitu pada kadar 4% mengikut perkiraan baki minima tahunan... LTH telah membayar keuntungan (hibah) berjumlah RM3.31 bilion. Ia melebihi keupayaan kewangan LTH dan melibatkan pertambahan dana berjumlah RM0.61 bilion (22.5%)." },
  "3.11.12": { p: "Perenggan 3.11.12", pdf: 132, q: "JAN menerima penyata kewangan LTH dalam keadaan kesilapan mengenai pengelasan Kumpulan Wang Pendeposit sebagai dana (ekuiti) dalam penyata kewangan sejak 2010... Sepatutnya, Kumpulan Wang Pendeposit dikelaskan sebagai liabiliti." },
  "3.11.15": { p: "Perenggan 3.11.15", pdf: 133, q: "Pendapat Berteguran telah dicadangkan terhadap Penyata Kewangan TH bagi tahun berakhir 31 Disember 2017 sekiranya tiada pelarasan dibuat... Dengan mengambil kira perkara tersebut, Pendapat Tanpa Teguran dengan 'Emphasis of Matter' telah diberikan pada 16 Julai 2018. (Surat KAN kepada Perdana Menteri, 19 Disember 2018)" },
  "3.12.7": { p: "Perenggan 3.12.7", pdf: 137, q: "Kadar bonus yang diberikan kepada kakitangan LTH adalah amat tinggi pada tahun 2010 hingga 2017. Kadar bonus yang diberikan adalah antara dua hingga tiga belas bulan termasuk bonus tahunan dan bonus khas." },
  "3.12.10": { p: "Perenggan 3.12.10", pdf: 139, q: "Justifikasi yang diberikan ialah keuntungan yang besar diperolehi oleh LTH... bonus yang disyorkan mengambil kira peratus keuntungan tahun semasa iaitu antara 1.7% hingga 2.5%." },
  "3.12.12": { p: "Perenggan 3.12.12", pdf: 139, q: "Mengambil kira isu kewangan yang dihadapi oleh LTH bermula pada tahun 2014 hingga 2017 di mana nilai aset adalah lebih rendah daripada liabiliti... ini membuktikan bahawa pemberian bonus dengan jumlah yang tinggi oleh LTH adalah tidak wajar." },
  "3.12.19": { p: "Perenggan 3.12.19", pdf: 141, q: "Beberapa orang terpilih telah diberikan bonus istimewa dengan jumlah sebanyak RM1,148,400 pada tahun 2017 dan RM1,045,000 pada tahun 2018." },
  "3.12.28": { p: "Perenggan 3.12.28", pdf: 144, q: "Bayaran bonus pada tahun 2017 Lembaga Pengarah TH Properties telah melanggar seksyen 230(2) dan 230(4) Akta 777; dan bayaran bonus pada tahun 2018... melanggar seksyen 230(3) Akta 777." },
  "3.13.7": { p: "Perenggan 3.13.7", pdf: 147, q: "Berikut adalah analisa yang dilaksanakan oleh PwC berkenaan jurang defisit antara nilai aset dan liabiliti sejak tahun 2014 sehingga 2017 [jadual 2013–2017]." },
  "3.13.8": { p: "Perenggan 3.13.8", pdf: 148, q: "Pada tahun 2017, LTH telah mengubah polisi rosot nilai sebanyak dua kali dalam tahun yang sama bagi memastikan LTH merekod keuntungan yang mencukupi untuk membuat agihan keuntungan (hibah)." },
  "3.13.11": { p: "Perenggan 3.13.11", pdf: 149, q: "Bagi tahun kewangan 2017, sekiranya piawaian MFRS digunapakai secara sepenuhnya, LTH sepatutnya merekodkan kerugian bersih RM1.4 bilion, berbanding keuntungan sebanyak RM3.4 bilion... kerugian terkumpul sebanyak RM4.7 bilion setakat 31 Disember 2017." },
  "3.13.19": { p: "Perenggan 3.13.19", pdf: 153, q: "Terdapat empat cadangan yang telah dikemukakan dan dibincangkan bagi penilaian dan pertimbangan oleh Jawatankuasa Khas tersebut." },
  "3.13.28": { p: "Perenggan 3.13.28", pdf: 160, q: "Aset-aset LTH yang kurang berdaya maju ini dipindahkan pada nilai sebanyak RM19.9 bilion (berbanding nilai pasaran ketika itu sebanyak RM9.7 bilion, atau pada premium sebanyak RM10.2 bilion kepada nilai pasaran)." },
  "3.13.29": { p: "Perenggan 3.13.29", pdf: 160, q: "Nilai aset yang dipindahkan berbanding nilai pasaran sewaktu aset dipindahkan: [jadual hartanah, perladangan, ekuiti]." },
  "3.13.34": { p: "Perenggan 3.13.34", pdf: 161, q: "Selepas aset-aset hartanah ini dipindahkan, UJSB terus menanggung rosot nilai yang tinggi di mana hartanah yang dipindahkan pada nilai RM2.25 bilion kini hanya bernilai RM1.2 bilion pada nilai pasaran semasa... setakat 31 Disember 2021." },
  "3.13.37": { p: "Perenggan 3.13.37", pdf: 162, q: "Kaunter-kaunter saham yang diklasifikasikan sebagai saham mewah (bluechips) yang telah mengalami kejatuhan nilai melebihi 20%... [jadual Axiata, Maxis, MISC, Digi, TM]." },
  "3.13.45": { p: "Perenggan 3.13.45", pdf: 164, q: "Sukuk UJSB hanya mendapat Surat Sokongan Kewangan daripada Menteri Kewangan bertarikh 27 Mei 2019... semenjak Sukuk UJSB diterbitkan pada tahun 2019, Kerajaan telah memasukkan UJSB dalam senarai Komitmen Jaminan." },
  "3.13.48": { p: "Perenggan 3.13.48", pdf: 166, q: "UJSB tidak menerima suntikan RM1.5 bilion pada tahun 2021 seperti yang diperuntukkan dan diluluskan dalam Belanjawan 2021. Alasan yang diberikan... keutamaan peruntukan... diberikan kepada perbelanjaan pemulihan ekonomi negara ekoran daripada kesan pandemik Covid-19." },
  "3.13.52": { p: "Perenggan 3.13.52", pdf: 168, q: "Tujuh puluh lima kaunter daripada seratus enam kaunter ekuiti yang tersenarai di Bursa Malaysia telah dilupuskan... UJSB terpaksa menelan kerugian sebanyak RM9.9 bilion bagi tahun berakhir 2019 bagi perbezaan nilai pemindahan dan nilai pasaran semasa aset-aset tersebut." },
  "3.13.60": { p: "Perenggan 3.13.60", pdf: 170, q: "LTH akan menanggung pendapatan tertunggak atau deferred income tahunan sebanyak RM840 juta setahun. Pendapatan ini tidak bersandarkan tunai, dan kini jumlah pendapatan tertunggak terkumpul melebihi RM2.1 bilion setakat 31 Disember 2021." },
  "3.13.62": { p: "Perenggan 3.13.62", pdf: 171, q: "RM27.5 bilion merupakan hampir 31% daripada keseluruhan aset yang dipegang oleh LTH. Selain itu, hasil pengakruan Sukuk UJSB juga menyumbang hampir 26% daripada keseluruhan pendapatan tahunan LTH. Malah ia lebih dari satu pertiga daripada jumlah pengagihan keuntungan tahunan kepada pendeposit." },
  "3.14.1": { p: "Perenggan 3.14.1", pdf: 176, q: "Suruhanjaya telah menerima laporan daripada LTH mengenai pelaburan-pelaburannya yang bermasalah. Suruhanjaya mendapati wujudnya transaksi yang mencurigakan dan penyembunyian maklumat." },
  "3.14.6": { p: "Perenggan 3.14.6", pdf: 177, q: "Menteri, semasa membuat keputusan, bergantung sepenuhnya kepada memo yang disediakan oleh Lembaga dan Pengurusan LTH... Semua dokumen menunjukkan kenyataan 'dipersetujui seperti dicadangkan'." },
  "3.15.1": { p: "Perenggan 3.15.1", pdf: 193, q: "Pengurusan LTH pada pertengahan tahun 2018, telah memulakan proses siasatan dalaman dan berikutan dengan itu telah membuat empat laporan polis." },
  "3.15.21": { p: "Perenggan 3.15.21", pdf: 201, q: "Lanjutan daripada proses siasatan dalaman yang dilaksanakan oleh LTH beberapa laporan telah dibuat kepada Suruhanjaya Pencegahan Rasuah Malaysia (SPRM)." },
  "3.16.3": { p: "Perenggan 3.16.3", pdf: 203, q: "Perbandingan kos haji, bayaran haji dan juga HAFIS bagi tahun 2014 hingga 2019 [jadual]. (tiada penghantaran jemaah haji pada tahun 2020 dan 2021)." },
  "3.16.8": { p: "Perenggan 3.16.8", pdf: 205, q: "Unjuran kos haji dan HAFIS bagi tahun 2022 hingga 2030 [jadual]." },
  "3.16.17": { p: "Perenggan 3.16.17", pdf: 208, q: "Masa menunggu untuk mengerjakan haji dijangka dapat dikurangkan dari 135 tahun kepada 33 tahun sahaja (EY menggunakan RM9,980 dalam pengiraannya)." },
  "3.17.15b": { p: "Perenggan 3.17.15(b)", pdf: 215, q: "Dianggarkan 75% deposit di LTH dimiliki oleh hanya 5% daripada pendepositnya. Dengan kata lain, jumlah deposit LTH tertumpu kepada mereka yang menyimpan dan memiliki dana yang besar." },
  "3.16.14": { p: "Perenggan 3.16.14", pdf: 207, q: "65% pendeposit mempunyai deposit sebanyak RM2,000 atau kurang dalam akaun mereka." },
  "4.2": { p: "Perenggan 4.2", pdf: 229, q: "Sejak tahun 1963 hingga tahun 2021 mengurus seramai 1.46 juta rakyat Malaysia mengerjakan haji... LTH juga sejak 2001 telah memberi subsidi atau HAFIS... sebanyak RM2.02 bilion... Sejak tahun 1966 hingga tahun 2021, LTH telah membuat agihan keuntungan (hibah) termasuk hibah haji sebanyak RM37.52 bilion... jumlah pendeposit sehingga 22 Julai 2022 ialah seramai 8.6 juta." }
},

/* ---------------------------------------------------------------- GLOSARI
   ---------------------------------------------------------------- */
GLOSARI: {
  "Hibah": "Keuntungan tahunan yang diagihkan kepada pendeposit Tabung Haji — macam 'dividen' untuk simpanan, tetapi dalam akad Islam ia diberi secara sukarela, bukan dijanjikan.",
  "Rosot nilai (impairment)": "Pengakuan dalam akaun bahawa nilai sesuatu pelaburan telah jatuh dan tidak akan pulih — iaitu 'menulis turun' nilai aset kepada nilai yang lebih realistik.",
  "RAV (Realisable Asset Value)": "Nilai aset yang 'boleh direalisasikan' — kaedah kiraan sendiri oleh pengurusan LTH, bukan nilai dalam penyata kewangan yang diaudit. Laporan mendapati banyak nilainya hanya anggaran pengurusan.",
  "Defisit": "Keadaan apabila jumlah liabiliti (hutang + deposit) lebih besar daripada jumlah aset — iaitu secara teknikal 'muflis' jika semua pendeposit menuntut wang serentak.",
  "Liabiliti": "Segala yang perlu dibayar balik oleh organisasi — bagi TH, deposit pendeposit ialah liabiliti kerana ia wang orang ramai yang perlu dipulangkan bila diminta.",
  "Aset": "Segala yang dimiliki dan bernilai — saham, hartanah, sukuk, tunai dan sebagainya.",
  "Rizab": "Simpanan kecemasan organisasi — wang yang diketepikan untuk menyerap kerugian atau menampung pembayaran bila tahun buruk.",
  "Sukuk": "Bon patuh syariah — sijil hutang yang menjanjikan pulangan. Dalam kes ini, UJSB 'berhutang' dengan TH melalui sukuk bernilai RM27.5 bilion.",
  "UJSB (Urusharta Jamaah Sdn Bhd)": "Syarikat khas milik Kerajaan (ditubuhkan Dis 2018) untuk mengambil alih aset bermasalah TH — konsepnya macam Danaharta semasa krisis 1998.",
  "Bank run": "Pengeluaran deposit secara besar-besaran oleh pendeposit dalam masa singkat kerana hilang keyakinan — boleh menjatuhkan institusi walaupun asalnya sihat.",
  "Emphasis of Matter (EoM)": "Nota tambahan dalam laporan audit yang menarik perhatian kepada sesuatu perkara, tanpa mengubah pendapat 'bersih' auditor.",
  "Pendapat Berteguran (qualified opinion)": "Pendapat audit yang menyatakan penyata kewangan ada masalah material — lebih serius daripada nota EoM.",
  "MFRS / FRS": "Piawaian pelaporan kewangan yang diiktiraf di Malaysia — 'peraturan kiraan' yang semua syarikat patut ikut supaya angka boleh dibanding dan dipercayai.",
  "Proforma": "Penyata kewangan alternatif yang disediakan mengikut andaian/kaedah tertentu — dalam kes ini, penyata berasaskan RAV, bukan penyata beraudit.",
  "Put option": "Hak untuk menjual balik pelaburan kepada pihak tertentu pada harga yang dipersetujui lebih awal — macam 'jaminan beli balik'.",
  "ROFR (Right of First Refusal)": "Hak keutamaan untuk membeli sesuatu aset sebelum ia dijual kepada pihak lain.",
  "HAFIS (Hajj Financial Support)": "Bantuan Kewangan Haji — subsidi yang ditanggung TH daripada keuntungan pelaburannya untuk menampung sebahagian kos haji jemaah.",
  "Muassasah": "Pakej haji biasa yang diuruskan TH (berbeza dengan pakej khas/swasta).",
  "B40": "Kumpulan isi rumah berpendapatan rendah 40% terbawah — kumpulan sasaran subsidi.",
  "Kecairian (liquidity)": "Keupayaan mendapatkan tunai dengan cepat untuk membayar pengeluaran — aset seperti hartanah 'kurang cair' kerana lambat dijual.",
  "Timbang tara (arbitration)": "Penyelesaian pertikaian di luar mahkamah melalui penimbang tara yang dilantik kedua-dua pihak.",
  "Tatatertib": "Prosiding disiplin dalaman terhadap kakitangan yang didakwa melanggar peraturan.",
  "Fire-sale": "Jualan aset secara tergesa-gesa pada harga rendah kerana terdesak mendapatkan tunai.",
  "Komitmen Jaminan": "Senarai obligasi yang ditanggung Kerajaan — jika entiti gagal bayar, Kerajaan yang perlu menanggungnya.",
  "Pendapatan tertunggak (deferred income)": "Keuntungan yang direkodkan dalam akaun tetapi belum diterima sebagai tunai — dalam kes sukuk UJSB, TH 'untung atas kertas' sahaja.",
  "Premium": "Harga lebih tinggi daripada nilai pasaran — aset TH dipindahkan pada nilai RM19.9b walaupun nilai pasarannya RM9.7b (premium RM10.2b).",
  "Nilai buku": "Nilai aset seperti direkodkan dalam akaun organisasi.",
  "Nilai pasaran": "Nilai aset jika dijual di pasaran terbuka pada masa itu.",
  "IKBB": "Institusi Kewangan Bukan Bank — TH bukan bank, jadi ia tidak dikawal selia sepenuhnya oleh Bank Negara.",
  "Akad": "Kontrak syariah antara TH dan pendeposit: Mudarabah (perkongsian untung) → Wadi'ah Yad Dhamanah (simpanan, 2016) → Wakalah (agensi, 2019).",
  "Zakat": "TH membayar zakat bagi pihak pendeposit daripada keuntungan pelaburan — salah satu kelebihan menyimpan di TH."
},

/* ---------------------------------------------------------------- KEWANGAN
   ---------------------------------------------------------------- */
KEWANGAN: {
  // Jadual PwC: aset vs liabiliti 2013–2017 (RM juta) [3.9.2, 3.13.7]
  defisit_pwc: [
    { y: 2013, aset: 48778, liabiliti: 43696, hibah: 2632, pre: 5082, post: 2450 },
    { y: 2014, aset: 54751, liabiliti: 51866, hibah: 3237, pre: 2885, post: -352 },
    { y: 2015, aset: 60196, liabiliti: 60062, hibah: 3220, pre: 134, post: -3086 },
    { y: 2016, aset: 64321, liabiliti: 65581, hibah: 2871, pre: -1260, post: -4131 },
    { y: 2017, aset: 70317, liabiliti: 71086, hibah: 3324, pre: -769, post: -4093 }
  ],
  defisit_src: ["3.9.2", "3.13.7"],

  // Kadar hibah 2014–2021 (%) [3.9.22]
  hibah_kadar: [
    { y: 2014, tahunan: 6.25, haji: 2.00 },
    { y: 2015, tahunan: 5.00, haji: 3.00 },
    { y: 2016, tahunan: 4.25, haji: 1.50 },
    { y: 2017, tahunan: 4.50, haji: 1.75 },
    { y: 2018, tahunan: 1.25, haji: 0 },
    { y: 2019, tahunan: 3.05, haji: 0 },
    { y: 2020, tahunan: 3.10, haji: 0 },
    { y: 2021, tahunan: 3.10, haji: 0 }
  ],
  hibah_kadar_src: ["3.9.22"],

  // Jumlah hibah dibayar (RM ribu) [3.11.7]
  hibah_bayar: [
    { y: 2014, kadar: "6.25 + 2.00", tahunan: 2988053, haji: 249143, jumlah: 3237196 },
    { y: 2015, kadar: "5.00 + 3.00", tahunan: 2807369, haji: 413005, jumlah: 3220374 },
    { y: 2016, kadar: "4.25 + 1.50", tahunan: 2645625, haji: 225197, jumlah: 2870822 },
    { y: 2017, kadar: "4.50 + 1.75", tahunan: 3042184, haji: 281557, jumlah: 3323741 },
    { y: 2018, kadar: "1.25", tahunan: 922959, haji: 0, jumlah: 922959 },
    { y: 2019, kadar: "3.05", tahunan: 2140538, haji: 0, jumlah: 2140538 },
    { y: 2020, kadar: "3.10", tahunan: 2242141, haji: 0, jumlah: 2242141 }
  ],
  hibah_bayar_src: ["3.11.7"],
  hibah_jumlah_sejarah: { nilai: 37520, unit: "juta", nota: "Jumlah hibah (termasuk hibah haji) 1966–2021", src: "4.2" },

  // Pengiraan RAV 2017 (RM juta) [3.9.12]
  rav_2017: {
    aset_beraudit: 70317,
    pelarasan_rav: 4466,
    aset_rav: 74783,
    liabiliti: 74410,
    baki_terlaras: 373,
    nota_rav_thp: { tambahan: 2294, penilaian: 4600, profesional: 556, anggaran_pengurusan: 4044, src: "3.9.4" },
    src: "3.9.12"
  },

  // Rosot nilai tidak direkodkan 2017 (RM juta) [3.9.13]
  rosot_nilai_2017: {
    frs139_tambahan: 1310,
    subsidiari_bersekutu: 227.81,
    th_heavy_eng: 164.58,
    jumlah: 1537.81,
    liabiliti_bersih_jan: 1164,
    liabiliti_bersih_pwc: 4093,
    src: "3.9.13"
  },

  // Jika MFRS dipatuhi 2017 (RM juta) [3.13.11]
  mfrs_2017: {
    untung_dilapor: 3412,
    tolak_afs_ekuiti: -4258,
    tolak_afs_hutang: -7,
    tolak_lain: -580,
    rugi_terlaras: -1433,
    untung_terkumpul_dilapor: 162,
    pelarasan: -4845,
    rugi_terkumpul_terlaras: -4683,
    src: "3.13.11"
  },

  // Polisi rosot nilai diubah 2017 [3.13.8]
  polisi_rosotnilai: [
    { ambang: ">70% jatuh (dan >24 bulan)", impak: 1313 },
    { ambang: ">85% jatuh", impak: 171 },
    { ambang: ">90% jatuh", impak: 1 }
  ],
  polisi_rosotnilai_src: ["3.13.8", "3.9.8"],
  polisi_nota: "FRSIC 14 (panduan MIA): kerugian 'signifikan' = jatuh 20%+, 'berlanjutan' = lebih 12 bulan. LTH guna ambang jauh lebih longgar.",
  polisi_nota_src: "3.9.6",

  // Kemampuan vs bayaran sebenar 2017 [3.11.10]
  kemampuan_2017: {
    kemampuan: 2700, kadar_kemampuan: "4% (baki minima tahunan)",
    dibayar: 3310, kadar_dibayar: "6.25% (baki minima bulanan)",
   lebihan: 610, lebihan_pct: 22.5,
    src: "3.11.10"
  },

  // Deposit [3.9.29, 3.9.30, 3.13.50, 4.2]
  deposit: {
    trend: [
      { label: "Sebelum pengumuman hibah 2018", nilai: 73, src: "3.9.29" },
      { label: "Akhir 2019", nilai: 69, src: "3.9.29" },
      { label: "Akhir 2020", nilai: 76, src: "3.9.30" },
      { label: "21 Mei 2022", nilai: 88, src: "3.13.50" }
    ],
    unjuran_100b: "berkemungkinan meningkat kepada RM100 bilion dalam tempoh dua tahun",
    unjuran_src: "4.2",
    pendeposit: [
      { label: "2018", nilai: 9.2, src: "3.13.14" },
      { label: "22 Julai 2022", nilai: 8.6, src: "4.2" }
    ],
    konsentrasi: { pct_deposit_oleh_5pct: 75, pct_pendeposit: 5, src: "3.17.15b" },
    kecil: { pct: 65, had: 2000, src: "3.16.14" },
    minima_dana_untuk_subsidi: 60, minima_src: "3.16.12",
    jaminan_kerajaan: { akta: "Seksyen 24 Akta 535", nilai: 88, src: "3.13.16" }
  },

  // Rizab [3.7.8, 3.7.9, 3.7.11]
  rizab: {
    nota_rb: "RB: LTH guna rizab untuk bayar hibah pada 2012, 2014 dan 2016; arah aliran rizab menurun selepas 2016",
    nota_rb_src: "3.7.8",
    polisi_2019: "RPK disasar 5% daripada nilai aset bersih ≈ RM3.5 bilion (berasaskan turun naik 2010–2018)",
    polisi_2019_src: "3.7.9",
    guna_2020_2021: "LTH guna rizab untuk menampung hibah 2020 dan 2021",
    guna_src: "3.7.11"
  },

  // Bonus kakitangan [3.12.7]
  bonus_kakitangan: [
    { y: 2010, peruntukan: 25, moft: "2.5 bulan + 1 khas", taburan: "2–6 bulan" },
    { y: 2011, peruntukan: 35, moft: "3 + 1 khas", taburan: "2–6 bulan" },
    { y: 2012, peruntukan: 38, moft: "3.5 + 1 khas", taburan: "2.5–8 bulan" },
    { y: 2013, peruntukan: 49, moft: "2.5–10", taburan: "2.5–10 bulan" },
    { y: 2014, peruntukan: 74, moft: "1–11 + 2 khas", taburan: "1–11 + 2 khas" },
    { y: 2015, peruntukan: 65, moft: "1–10", taburan: "1–10 bulan" },
    { y: 2016, peruntukan: 25, moft: "1–3", taburan: "1–3 bulan" },
    { y: 2017, peruntukan: 56.7, moft: "1–6", taburan: "1–6 bulan" },
    { y: 2018, peruntukan: 10.8, moft: "1", taburan: "1 bulan" },
    { y: 2019, peruntukan: 11.6, moft: "1", taburan: "1 bulan" },
    { y: 2020, peruntukan: 14.1, moft: "1", taburan: "1 bulan" }
  ],
  bonus_kakitangan_src: ["3.12.7"],

  // Bonus vs keuntungan bersih [3.12.10]
  bonus_vs_untung: [
    { y: 2013, untung: 2634, bonus: 49, pct: 1.9, bulan: "2.5–10" },
    { y: 2014, untung: 2979, bonus: 74, pct: 2.5, bulan: "1–11 + 2 khas" },
    { y: 2015, untung: 3537, bonus: 61, pct: 1.7, bulan: "1–10" },
    { y: 2016, untung: 2481, bonus: 25, pct: 1.0, bulan: "1–3" },
    { y: 2017, untung: 2798, bonus: 57, pct: 2.0, bulan: "1–6" }
  ],
  bonus_vs_untung_src: ["3.12.10"],
  bonus_percanggahan: "Nota: Jadual 3.12.7 menyebut peruntukan bonus 2015 = RM65 juta, tetapi jadual 3.12.10 menyebut RM61 juta. Kedua-dua angka dipaparkan seperti dalam laporan.",
  bonus_kpi_2014: [
    { gred: "A", pct_staf: 5, bulan_2014: "9–11", bulan_2015: "8–10" },
    { gred: "B", pct_staf: 15, bulan_2014: "7–8", bulan_2015: "6–7" },
    { gred: "C", pct_staf: 60, bulan_2014: "5–6", bulan_2015: "4–5" },
    { gred: "D", pct_staf: 15, bulan_2014: "3–4", bulan_2015: "2–3" },
    { gred: "E", pct_staf: 5, bulan_2014: "1", bulan_2015: "1" }
  ],
  bonus_kpi_src: "3.12.8",

  // Bonus istimewa TH Properties [3.12.19–3.12.26]
  thp_bonus: {
    t2017: {
      jumlah: 1148400, dilulus: "Mesyuarat Exco TH Properties, 12 April 2017",
      alasan: "Kejayaan projek 'The Bay Pavilion' (siap 2015, dijual sepenuhnya; pulangan AUD11.6 juta kepada TH Properties sehingga Dis 2016)",
      penerima: [
        { nama: "Datuk Azizan bin Abdul Rahman", rm: 231000 },
        { nama: "Dato' Roszali bin Othman", rm: 189750 },
        { nama: "Haji Abd Kadir bin Sahlan", rm: 189750 },
        { nama: "Nik Badrul Hisham bin Nik Hassan", rm: 99000 },
        { nama: "Anuarifaei bin Mustapa", rm: 99000 },
        { nama: "Nur Adlan bin Taib", rm: 99000 },
        { nama: "Zaidi bin Baharudin", rm: 56100 },
        { nama: "Haji Mohamed Rahim bin Ismail", rm: 52800 },
        { nama: "Aida binti Karim", rm: 49500 },
        { nama: "Marhaizah binti Mohamed Yusuf", rm: 49500 },
        { nama: "Dato' Mohd Fazillah bin Mohd Ali", rm: 33000 }
      ],
      src: "3.12.19"
    },
    t2018: {
      jumlah: 1045000, dilulus: "Lembaga Pengarah THP Australia Capital, 23 April 2018; Mesyuarat Agong 30 Nov 2018",
      alasan: "TH Properties memperolehi keuntungan sebelum cukai RM34.84 juta pada 2017",
      penerima: [
        { nama: "Dato' Azizan bin Abd Rahman", rm: 167250 },
        { nama: "Dato' Roszali bin Othman", rm: 176500 },
        { nama: "Haji Abd Kadir bin Sahlan", rm: 176500 },
        { nama: "Nik Badrul Hisham bin Nik Hassan", rm: 101500 },
        { nama: "Anuarifaei bin Mustapa", rm: 101500 },
        { nama: "Nur Adlan bin Taib", rm: 101500 },
        { nama: "Zaidi bin Baharudin", rm: 63000 },
        { nama: "Aida binti Karim", rm: 63000 },
        { nama: "Marhaizah binti Mohamed Yusuf", rm: 63000 },
        { nama: "Haji Mohamed Rahim bin Ismail", rm: 31250 }
      ],
      src: "3.12.19"
    },
    salah_laku: "Firma guaman MD. Tajuddin & Co (2020): kelulusan bonus 2017 melanggar seksyen 230(2) & 230(4) Akta Syarikat 2016; bonus 2018 melanggar seksyen 230(3). Suruhanjaya syor dapatkan semula bonus ini.",
    salah_src: "3.12.28"
  },

  // Surat-surat BNM [3.6.2, 3.17.10, Jilid 12]
  surat_bnm: [
    { tarikh: "21 Ogos 2014", kepada: "Pengerusi LTH", perkara: "Deposit Taking and Management of Liquidity" },
    { tarikh: "19 Disember 2014", kepada: "Pengerusi LTH", perkara: "Pengambilan Deposit dan Pengurusan Kecairan" },
    { tarikh: "23 Disember 2015", kepada: "Pengerusi LTH", perkara: "Keperluan Merumus Dasar Rizab" },
    { tarikh: "23 Disember 2015", kepada: "Menteri (JPM)", perkara: "Pengurusan Kewangan LTH" },
    { tarikh: "14 Disember 2016", kepada: "LTH", perkara: "Keperluan Merumus Dasar Rizab" },
    { tarikh: "17 Februari 2017", kepada: "LTH", perkara: "Keperluan Merumus Dasar Rizab" },
    { tarikh: "28 Disember 2018", kepada: "Perdana Menteri", perkara: "Pengawalseliaan & Cadangan Langkah Kehematan ke atas LTH" },
    { tarikh: "26 Jun 2019", kepada: "Perdana Menteri", perkara: "Outcome of the Supervisory Review of LTH" },
    { tarikh: "18 April 2022", kepada: "Pengerusi RCI", perkara: "Recommendation on the Future Business Model for LTH" }
  ],
  surat_bnm_src: ["3.6.2", "3.17.10"]
},

/* ---------------------------------------------------------------- PELABURAN BERMASALAH (14)
   ---------------------------------------------------------------- */
PELABURAN: [
  {
    id: "thip", nama: "PT TH Indo Plantations (THIP)", sektor: "Perladangan", lokasi: "Riau, Sumatera, Indonesia",
    isu: "Tadbir urus penjualan 95% ekuiti kepada PT Borneo Pacific (83,000 hektar)",
    angka: [
      { l: "Harga asal jualan", v: "USD910 juta", t: "F" },
      { l: "Pengurangan harga", v: "USD100 juta", t: "F" },
      { l: "Pendahuluan diberi kepada pembeli (sepatnya pembeli bayar)", v: "USD178.6 juta", t: "F" }
    ],
    kesan: "Syer dipindahkan sebelum bayaran penuh diterima; LTH terpaksa beri pendahuluan USD178.6 juta.",
    tindakan: "Siasatan dalaman + forensik peguam; laporan polis Dang Wangi/31331/2018 (30 Nov 2018) — masih dalam siasatan (kekangan rentas sempadan Indonesia).",
    status: "Siasatan polis", src: "3.14.6(1)"
  },
  {
    id: "emrail", nama: "Emrail Sdn. Bhd.", sektor: "Lain-lain", lokasi: "Malaysia",
    isu: "15.3% ekuiti dibeli 7 Jun 2016 (RM20.17 juta); IPO dibatalkan; sasaran untung RM36.1 juta (2016) tidak dicapai",
    angka: [
      { l: "Harga belian", v: "RM20.17 juta", t: "F" },
      { l: "Harga Put Option", v: "RM20.3 juta", t: "F" },
      { l: "Dibayar oleh LHSB setakat ini", v: "RM2 juta", t: "F" },
      { l: "Rosot nilai direkod (31 Dis 2020)", v: "RM19.3 juta", t: "F" }
    ],
    kesan: "Baki Put Option tidak dilangsaikan; rosot nilai penuh baki.",
    tindakan: "Writ difailkan 8 Sep 2021 (Mahkamah Tinggi KL); mahkamah arah timbang tara — didaftarkan di AIAC 22 April 2022; LTH masih menilai 5 calon penimbang tara.",
    status: "Timbang tara", rugi: 19.3, src: "3.14.6(2)"
  },
  {
    id: "wellspring", nama: "Wellspring Worldwide Limited", sektor: "Lain-lain", lokasi: "Malaysia",
    isu: "10% ekuiti dibeli 21 Sep 2014 (RM18.4 juta); gagal disenaraikan di Bursa",
    angka: [
      { l: "Harga belian", v: "RM18.4 juta", t: "F" },
      { l: "Harga Put Option", v: "RM19.03 juta", t: "F" },
      { l: "Rosot nilai (31 Dis 2019)", v: "RM19.03 juta", t: "F" },
      { l: "Mahkamah arah promoters bayar", v: "RM20.8 juta", t: "F" }
    ],
    kesan: "Promoters gagal bayar langsung; mahkamah benarkan notis kebankrapan (25 Jan 2022).",
    tindakan: "Tuntutan mahkamah; perintah mahkamah 5 Okt 2018; kebankrapan promoters.",
    status: "Mahkamah / kebankrapan", rugi: 19.03, src: "3.14.6(3)"
  },
  {
    id: "dssb", nama: "Deru Semangat Sdn. Bhd. (DSSB)", sektor: "Perladangan", lokasi: "Mukim Tembeling, Pahang",
    isu: "Usahasama ladang kelapa sawit (55% ekuiti); diluluskan Okt 2014 & Jan 2015",
    angka: [
      { l: "Jumlah diluluskan", v: "RM526.16 juta", t: "F" },
      { l: "Ekuiti (dari YAM Tengku Muda Pahang)", v: "RM231 juta", t: "F" },
      { l: "Dikeluarkan setakat Jan 2021", v: "RM257 juta", t: "F" },
      { l: "Nilai selepas rosot nilai", v: "RM32 juta", t: "F" },
      { l: "Baki komitmen (kini dikecualikan)", v: "RM258 juta", t: "F" }
    ],
    kesan: "Pembangunan ladang libatkan pembalakan hutan simpan → langgar polisi NOPE → Wilmar enggan beli hasil sawit. RM257 juta dirosotnilai kepada RM32 juta.",
    tindakan: "Pegangan dirungkaikan kepada YAM TMP (RM259 juta); YAM TMP kecualikan baki komitmen RM258 juta (ekuiti RM71j + pembiayaan RM187j).",
    status: "Selesai (rugi besar)", rugi: 225, src: "3.14.6(4)"
  },
  {
    id: "trurich", nama: "Trurich Resources Sdn. Bhd.", sektor: "Perladangan", lokasi: "Kalimantan, Indonesia",
    isu: "Usahasama dengan FGV Kalimantan (30 Nov 2009) untuk sehingga 200,000 hektar sawit",
    angka: [
      { l: "Pelaburan LTH (dirosotnilai penuh)", v: "RM364.31 juta", t: "F" },
      { l: "Liabiliti semasa bersih 2017", v: "RM119.67 juta", t: "F" },
      { l: "Liabiliti semasa bersih 2018", v: "RM92.78 juta", t: "F" },
      { l: "Baki pinjaman Trurich kepada Maybank", v: "USD179 juta", t: "F" }
    ],
    kesan: "Usaha sama tidak memberi hasil; Trurich insolven.",
    tindakan: "Laporan polis (ketidakaturan pemerolehan); Menteri lulus pelupusan 22 Dis 2020; FGV & Maybank dalam proses akhir jual kepada PT Karya Teknik Agro.",
    status: "Insolven / pelupusan", rugi: 364.31, src: "3.14.6(5)"
  },
  {
    id: "abraj", nama: "Abraj Sdn. Bhd.", sektor: "Hartanah", lokasi: "Malaysia",
    isu: "Usahasama 50% dengan Amanah Raya (11 Nov 2009) untuk pembelian hartanah",
    angka: [
      { l: "Pegangan ekuiti LTH", v: "RM85 juta", t: "F" },
      { l: "Kerugian rosot nilai", v: "RM40.25 juta", t: "F" }
    ],
    kesan: "Sejak 2015 tidak mampu jana pendapatan untuk bayar pinjaman; penyewa utama berpindah.",
    tindakan: "Cari penyewa baru, cuba jual bangunan, struktural semula pembiayaan; akhirnya Amanah Raya beli 50% pegangan LTH (Dis 2020).",
    status: "Dilupuskan (rugi)", rugi: 40.25, src: "3.14.6(6)"
  },
  {
    id: "ppb", nama: "Putrajaya Perdana Berhad (PPB)", sektor: "Hartanah", lokasi: "Malaysia",
    isu: "30% ekuiti dibeli Dis 2014 (RM193.5 juta) daripada Cendana Destini (CDSB); sasaran IPO dalam 1 tahun",
    angka: [
      { l: "Harga belian", v: "RM193.5 juta", t: "F" },
      { l: "Sasaran untung 2015 (tidak dicapai)", v: "RM86 juta", t: "F" },
      { l: "Harga Put Option", v: "RM210.7 juta", t: "F" },
      { l: "Rosot nilai (31 Dis 2020)", v: "RM145.3 juta", t: "F" },
      { l: "Nilai buku bersih kini", v: "RM48.2 juta", t: "F" }
    ],
    kesan: "Gagal IPO dalam tempoh; gagal capai sasaran keuntungan; CDSB gagal bayar Put Option.",
    tindakan: "Notis Put Option 7 Mac 2018; kelulusan PRC untuk tindakan undang-undang (12 Nov 2020); Cadangan Pengaturan Penyelesaian sedang diproses.",
    status: "Penyelesaian dalam proses", rugi: 145.3, src: "3.14.6(7)"
  },
  {
    id: "alrawda", nama: "Al-Rawda Real Estates (4 hotel)", sektor: "Hartanah / Haji", lokasi: "Mekah & Madinah, Arab Saudi",
    isu: "Pajakan 10–18 tahun 4 hotel (Al-Aqiq, Al-Haram, Al-Saha, Rawdat Al-Bait); perjanjian 2015–2017",
    angka: [
      { l: "Nilai perjanjian pajakan dibayar", v: "SR1,426 juta", t: "F" },
      { l: "Pendapatan sewa dijanjikan", v: "SR2,490 juta", t: "F" },
      { l: "Sewa tertunggak (31 Dis 2021)", v: "SR560.7 juta", t: "F" },
      { l: "Tindakan PN terhadap Al-Rawda", v: "SR344.0 juta (9 tindakan)", t: "F" },
      { l: "Tindakan terhadap penjamin (Dr Mashhoor)", v: "SR255.1 juta (7 tindakan)", t: "F" },
      { l: "Anggaran kerugian kredit (31 Dis 2020)", v: "RM202.8 juta", t: "F" },
      { l: "Jangkaan rosot nilai tambahan 2021", v: "RM184 juta", t: "U" }
    ],
    kesan: "Gagal bayar sewa sejak Mac 2019. Tawaran penyelesaian SR1,748 juta (Apr 2021) kemudian diturunkan sendiri oleh Al-Rawda kepada SR968 juta — ditolak LTH.",
    tindakan: "Perintah penguatkuasaan diperoleh; aset Dr Mashhoor dibeku, sekatan perjalanan; likuidasi 20 hartanah dimulakan; timbang tara berjalan (Al-Rawda dakwa kontrak bertentangan syariah — dinafikan LTH).",
    status: "Mahkamah & timbang tara", rugi: 202.8, src: "3.14.6(8)"
  },
  {
    id: "alfareeda", nama: "Al-Fareeda Residential Fund", sektor: "Hartanah", lokasi: "Arab Saudi",
    isu: "Langganan SR76 juta (≈RM63 juta; 13.8% daripada dana SR550 juta) melalui Anfaal Capital, 21 Feb 2013",
    angka: [
      { l: "Pelaburan (setara)", v: "RM63 juta", t: "F" },
      { l: "Dihapus kira", v: "sepenuhnya", t: "F" }
    ],
    kesan: "Undang-undang buruh/imigresen baharu Arab Saudi, kontraktor bermasalah, kejatuhan harga minyak. Dana dicairkan; aset di bawah Alinma Bank; pengurus dana tidak dapat dikesan sejak 2017.",
    tindakan: "Dihapus kira sepenuhnya.",
    status: "Hapus kira", rugi: 63, src: "3.14.6(9)"
  },
  {
    id: "thp", nama: "TH Plantations Berhad (THP)", sektor: "Perladangan", lokasi: "Malaysia",
    isu: "Laporan forensik PwC (25 Apr 2019): pengurusan kanan & Lembaga gagal tanggungjawab fidusiari — pengambilalihan Bumi Suria Ventures, Maju Warisanmas, PT Persada Kencana Prima",
    angka: [
      { l: "Pembiayaan ladang 2012–2014 (Sukuk dilanggan LTH)", v: "RM1.2 bilion", t: "F" },
      { l: "Ladang produktif", v: "58% sahaja", t: "F" },
      { l: "Rosot nilai di peringkat LTH", v: "RM170 juta", t: "F" },
      { l: "Nilai THP dicampur dalam RAV 2017", v: "RM2.294 bilion", t: "F" }
    ],
    kesan: "Estet terpaksa dijual untuk bayar hutang; perbelanjaan perladangan dikurangkan → hasil sawit turun.",
    tindakan: "Laporan kepada PDRM, SPRM & Suruhanjaya Sekuriti (siasatan berterusan); CEO diletakkan garden leave, letak jawatan 20 Ogos 2018.",
    status: "Siasatan PDRM/SPRM/SC", rugi: 170, src: "3.14.6(10)"
  },
  {
    id: "thprop", nama: "TH Properties Sdn. Bhd.", sektor: "Hartanah", lokasi: "Malaysia",
    isu: "Bonus istimewa RM2.2 juta (2017 & 2018) kepada Lembaga & pengurusan tanpa kelulusan LTH sebagai pemegang saham utama",
    angka: [
      { l: "Bonus istimewa 2017", v: "RM1,148,400", t: "F" },
      { l: "Bonus istimewa 2018", v: "RM1,045,000", t: "F" }
    ],
    kesan: "Kelulusan Exco tidak mematuhi resolusi Lembaga; melanggar Akta Syarikat 2016.",
    tindakan: "Siasatan dalaman 5 Feb 2020; keputusan 12 Ogos 2020 untuk dapatkan semula bonus.",
    status: "Usaha dapatkan semula", rugi: 2.2, src: "3.14.6(11)"
  },
  {
    id: "thmarine", nama: "Alam Maritim / TH Marine", sektor: "Marin", lokasi: "Malaysia (luar persisiran)",
    isu: "51% JV dengan Alam Maritim (diluluskan 18 Jun 2015); 6 kapal AHTS + 2 milik penuh",
    angka: [
      { l: "Jumlah pelaburan", v: "RM334 juta (ekuiti RM198j + pembiayaan RM136j)", t: "F" },
      { l: "Ekuiti dirosotnilai", v: "RM198 juta (penuh)", t: "F" },
      { l: "Pembiayaan dirosotnilai (Dis 2021)", v: "RM80 juta", t: "F" },
      { l: "Dijangka boleh diperoleh semula (PwC)", v: "RM70.4 juta", t: "F" }
    ],
    kesan: "Hampir keseluruhan pelaburan lebur; hanya RM70.4 juta dijangka pulih.",
    tindakan: "PwC dilantik untuk kajian kebolehpulihan.",
    status: "Rosot nilai besar", rugi: 278, src: "3.14.6(12)"
  },
  {
    id: "thhr", nama: "TH Hotel & Residences (THHR)", sektor: "Hartanah / Haji", lokasi: "Malaysia",
    isu: "Hotel & kompleks haji dipindahkan ke UJSB (28 Dis 2018): Alor Setar, Kuching, Pulau Pinang, Kuala Terengganu, Kota Kinabalu",
    angka: [
      { l: "Nilai pemindahan", v: "RM804.1 juta", t: "F" },
      { l: "Premium atas nilai buku", v: "≈55%", t: "F" },
      { l: "Pulangan aset", v: "<2%", t: "F" },
      { l: "Hasil sewaan 2019 → 2020 (Kelana Jaya)", v: "RM16.5j → RM6.2j (−62%)", t: "F" }
    ],
    kesan: "Aset dipindahkan pada premium ~55% daripada nilai buku; hasil sewaan menjunam semasa pandemik.",
    tindakan: "Dipindahkan kepada UJSB di bawah Pelan Pemulihan 2018.",
    status: "Dipindahkan ke UJSB", src: "3.14.6(13)"
  },
  {
    id: "fgv", nama: "FGV Berhad", sektor: "Perladangan (tersenarai)", lokasi: "Malaysia",
    isu: "Langganan IPO 2012: 276 juta unit @ RM4.65 + 273.6 juta unit @ RM4.55; jumlah kos RM1,253.7 juta",
    angka: [
      { l: "Jumlah pelaburan (IPO + tambahan)", v: "RM1,253.7 juta + RM116.2 juta", t: "F" },
      { l: "Keuntungan jualan awal (Jul 2012)", v: "RM11.7 juta", t: "F" },
      { l: "Harga jatuh kepada", v: "RM0.885/unit", t: "F" },
      { l: "Kerugian tidak nyata", v: "RM1,058.9 juta", t: "F" },
      { l: "UJSB ambil alih (kos)", v: "RM4.62/unit × 283.7 juta unit = RM1,310 juta", t: "F" },
      { l: "Harga pasaran Feb 2022", v: "≈RM0.69/unit", t: "F" }
    ],
    kesan: "Tanpa pengambilalihan UJSB pada harga kos, LTH sepatutnya menanggung kerugian ~RM1.1 bilion.",
    tindakan: "Dipindahkan kepada UJSB (Dis 2018).",
    status: "Dipindahkan ke UJSB", rugi: 1058.9, src: "3.14.6(14)"
  }
],
PELABURAN_NOTA: "Jumlah kerugian/rosot nilai yang disebut secara eksplisit dalam laporan bagi pelaburan di atas ialah ≈ RM2.59 bilion (hasil tambah angka berlabel F oleh dashboard ini). Tidak termasuk: item berdenominasi USD (THIP), kerugian lanjutan FGV selepas pemindahan, dan kesan keseluruhan di peringkat kumpulan.",
PELABURAN_NOTA_SRC: "3.14",

/* ---------------------------------------------------------------- UJSB / PENYELAMATAN
   ---------------------------------------------------------------- */
UJSB: {
  // 4 pilihan dipertimbangkan [3.13.19]
  pilihan: [
    { id: 1, nama: "Suntikan dana/geran Kerajaan", huraian: "Kerajaan suntik >RM10 bilion tunai secara terus", kenapa_ditolak: "Jumlah terlalu besar; perlu tunai (MFRS 120); kesan kepada peruntukan lain; risiko penarafan negara (siling hutang 55% KDNK ketika itu)" },
    { id: 2, nama: "Aktifkan jaminan Kerajaan (Seksyen 24)", huraian: "Guna Kumpulan Wang Disatukan untuk bayar pengeluaran", kenapa_ditolak: "Solusi jangka pendek sahaja; tidak tutup defisit; jadi hutang LTH kepada Kerajaan; halang pemulihan pelaburan" },
    { id: 3, nama: "Aset tertunda (deferred asset)", huraian: "Agihkan kerugian ke masa hadapan", kenapa_ditolak: "Tidak dibenarkan oleh MFRS 9 — kerugian mesti direkod tahun semasa; LTH tetap tidak boleh agih hibah 2018" },
    { id: 4, nama: "Pindah aset ke SPV (UJSB) — DIPILIH", huraian: "Aset kurang berdaya saing diganti instrumen berpendapatan stabil pada nilai premium", kenapa_ditolak: "Diterima pakai — solusi jangka panjang berdasarkan model Danaharta (1998)" }
  ],
  pilihan_src: "3.13.19",
  kronologi: [
    { tarikh: "30 Nov 2018", peristiwa: "Jemaah Menteri setuju secara dasar rangka kerja pemulihan" },
    { tarikh: "7 Dis 2018", peristiwa: "Jemaah Menteri lulus pelan; arah laksana sebelum akhir 2018 (<2 minggu)" },
    { tarikh: "14 Dis 2018", peristiwa: "UJSB ditubuhkan (milik penuh Menteri Kewangan Diperbadankan)" },
    { tarikh: "27 Dis 2018", peristiwa: "Perjanjian Pemindahan Aset ditandatangani (106 saham tersenarai, 1 syarikat perladangan, 29 hartanah)" },
    { tarikh: "15 Mei 2019", peristiwa: "Perjanjian Langganan Sukuk & Right of First Refusal dimeterai" }
  ],
  kronologi_src: "3.13.21–3.13.23",

  // Pemindahan aset [3.13.29]
  pemindahan: [
    { kelas: "Hartanah dan tanah", buku: 1411, pindah: 2247, pasaran: 1411 },
    { kelas: "Syarikat perladangan", buku: 718, pindah: 802, pasaran: 718 },
    { kelas: "Ekuiti tersenarai Bursa", buku: 16852, pindah: 16851, pasaran: 7600 }
  ],
  pemindahan_jumlah: { buku: 18981, pindah: 19900, pasaran: 9729 },
  pemindahan_src: "3.13.29",
  premium: 10200, premium_src: "3.13.28",

  // Sukuk [3.13.41]
  sukuk: {
    siri1: { nilai: 10000, nominal: 13200, tempoh: "7 tahun", ytm: 4.05, matang: 2026 },
    siri2: { nilai: 9600, nominal: 14300, tempoh: "10 tahun", ytm: 4.10, matang: 2029 },
    tunai: 300,
    tunai_nota: "RM300 juta untuk saham tidak patuh syariah (Bumi Armada, Integrated Logistics, Yi-Lai, YTL Power) — dibayar 30 Dis 2019 (RM100j) & 30 Dis 2020 (RM200j)",
    jumlah_langganan: 27560,
    yield_tertunggak: 7650,
    ciri: "Zero coupon, tidak dijamin Kerajaan, tiada penarafan, tidak boleh diniaga, tidak boleh pindah milik (unsecured)",
    ciri_src: "3.13.44",
    surat_sokongan: "Surat Sokongan Kewangan Menteri Kewangan 27 Mei 2019 ('Letter of Comfort')",
    src: "3.13.41"
  },

  // Komitmen Kerajaan [3.13.46–3.13.49]
  komitmen: {
    jumlah: 17800,
    rmk11_2020: 500,
    rmk12_13: 17300,
    tahunan: 1730,
    geran_2020: { jumlah: 500, guna: "RM300j saham berubah taraf patuh syariah + RM200j tebus awal sukuk (30 Nov 2020)" },
    tercicir_2021: { nilai: 1500, nota: "UJSB tidak terima suntikan RM1.5 bilion yang diluluskan Belanjawan 2021 — alasan: keutamaan pemulihan ekonomi pasca Covid-19" },
    src: "3.13.46"
  },

  // Risiko [3.13.60, 3.13.62]
  risiko: {
    pct_aset: 31, nota_aset: "RM27.5 bilion ≈ 31% daripada keseluruhan aset LTH",
    pct_pendapatan: 26, nota_pendapatan: "Pengakruan sukuk ≈ 26% daripada pendapatan tahunan LTH",
    hibah: "Lebih 1/3 daripada jumlah pengagihan keuntungan tahunan kepada pendeposit",
    deferred_setahun: 840, deferred_terkumpul: 2100, deferred_nota: "Pendapatan tertunggak RM840 juta/tahun tidak bersandarkan tunai; terkumpul >RM2.1 bilion (31 Dis 2021)",
    ujsb_rugi_2019: 9900,
    ujsb_pendapatan: "RM200–300 juta setahun hasil penstrukturan portfolio",
    src: "3.13.62"
  },

  // Bluechips [3.13.37, 3.13.38]
  bluechips: [
    { nama: "Axiata", transfer: 6.00, mkt_dis18: 3.63, jatuh: -39.5, jml_transfer: 1422.6, jml_mkt: 931.8, jml_jatuh: -490.8, mkt_jun22: 3.04 },
    { nama: "Maxis", transfer: 6.84, mkt_dis18: 5.43, jatuh: -20.6, jml_transfer: 879.4, jml_mkt: 681.2, jml_jatuh: -198.2, mkt_jun22: 3.52 },
    { nama: "MISC", transfer: 7.43, mkt_dis18: 6.15, jatuh: -17.2, jml_transfer: 486.5, jml_mkt: 438.9, jml_jatuh: -47.6, mkt_jun22: 7.30 },
    { nama: "Digi", transfer: 5.13, mkt_dis18: 4.24, jatuh: -17.3, jml_transfer: 576.2, jml_mkt: 500.3, jml_jatuh: -75.9, mkt_jun22: 3.27 },
    { nama: "TM", transfer: 5.96, mkt_dis18: 2.33, jatuh: -60.9, jml_transfer: 241.2, jml_mkt: 107.7, jml_jatuh: -133.6, mkt_jun22: 5.20 }
  ],
  bluechips_jumlah: { transfer: 3606.0, mkt_dis18: 2659.9, jatuh: -946.1 },
  bluechips_src: ["3.13.37", "3.13.38"],
  bluechips_nota: "Harga 8 Jun 2022 masih di bawah harga pemindahan (kecuali MISC yang hampir pulih).",

  // Hartanah UJSB [3.13.34]
  hartanah_ujsb: [
    { kelas: "Tanah", kps: 1353361, transfer: 627.0, mkt_dis21: 401.1 },
    { kelas: "Menara pejabat", kps: 354021, transfer: 737.4, mkt_dis21: 325.0 },
    { kelas: "Lot kedai", kps: 120062, transfer: 46.3, mkt_dis21: 33.3 },
    { kelas: "Hotel", kps: 354134, transfer: 804.1, mkt_dis21: 424.3 },
    { kelas: "Perindustrian", kps: 35019, transfer: 31.9, mkt_dis21: 19.0 }
  ],
  hartanah_jumlah: { transfer: 2246.7, mkt_dis21: 1202.7 },
  hartanah_src: "3.13.34",
  hartanah_jpphm: { bawah_paras: 11, jumlah_hartanah: 29, lebihan_keseluruhan: 543.65, nota: "11 daripada 29 hartanah dipindah di bawah penilaian JPPHM, tetapi secara keseluruhan nilai pemindahan RM543.65 juta lebih tinggi daripada penilaian JPPHM", src: "3.13.32" },

  // Pelupusan [3.13.51–3.13.57]
  pelupusan: {
    kaunter_dilupus: 75, kaunter_jumlah: 106,
    labur_semula: 329,
    hartanah_dijual: { bil: 1, tempat: "Mukim Sungai Segamat, Johor", nilai: 0.92, tahun: 2020 },
    rofr_dilepas: "LTH lepas Hak Penolakan Pertama untuk 18 daripada 19 hartanah (3 Dis 2019); baki (Seremban Hill) dilepas kemudian; ladang Sri Aman (min RM280 juta) dilepas 24 Jan 2020",
    src: "3.13.52"
  },
  rofr_tawaran: [
    { ticker: "WENG MK", syarikat: "WZ Satu", tarikh: "24 Mac 2020", syer: 25999115, rofr: 0.090, pasaran: 0.064, premium: 40.6 },
    { ticker: "EAST MK", syarikat: "Eastern & Oriental", tarikh: "25 Mac 2020", syer: 46400000, rofr: 0.365, pasaran: 0.335, premium: 9.0 },
    { ticker: "WENG MK", syarikat: "WZ Satu", tarikh: "31 Mac 2020", syer: 16570923, rofr: 0.085, pasaran: 0.075, premium: 13.3 },
    { ticker: "WCTHG MK", syarikat: "WCT Holdings", tarikh: "2 Apr 2020", syer: 42477625, rofr: 0.400, pasaran: 0.377, premium: 6.1 },
    { ticker: "KSL MK", syarikat: "KSL Holdings", tarikh: "6 Mei 2020", syer: 71800000, rofr: 0.610, pasaran: 0.630, premium: -3.2 },
    { ticker: "KSL MK", syarikat: "KSL Holdings", tarikh: "21 Mei 2020", syer: 35900000, rofr: 0.580, pasaran: 0.605, premium: -4.1 },
    { ticker: "HAPL MK", syarikat: "Hap Seng Plantations", tarikh: "29 Mei 2020", syer: 66074500, rofr: 1.650, pasaran: 1.570, premium: 5.1 },
    { ticker: "FGV MK", syarikat: "FGV Holdings", tarikh: "9 Dis 2020", syer: 283710100, rofr: 1.300, pasaran: 1.270, premium: 2.4 },
    { ticker: "ILB MK", syarikat: "Integrated Logistics", tarikh: "14 Mac 2022", syer: 20500000, rofr: 0.380, pasaran: 0.365, premium: 4.1 }
  ],
  rofr_src: "3.13.57",

  // Komitmen Jaminan Kerajaan — perbandingan entiti [3.13.45, Jadual 5.3]
  komitmen_jaminan_2020: [
    { entiti: "DanaInfra Nasional", rm: 72320, pct: 38.9 },
    { entiti: "Prasarana Malaysia", rm: 38914, pct: 21.0 },
    { entiti: "Malaysia Rail Link", rm: 21530, pct: 11.6 },
    { entiti: "Urusharta Jamaah (UJSB)", rm: 20683, pct: 11.1, fokus: true },
    { entiti: "Suria Strategic Energy", rm: 6951, pct: 3.7 },
    { entiti: "GovCo Holdings", rm: 7200, pct: 3.9 },
    { entiti: "Jambatan Kedua", rm: 5528, pct: 3.0 },
    { entiti: "Turus Pesawat", rm: 5310, pct: 2.9 },
    { entiti: "MKD Kencana", rm: 3500, pct: 1.9 },
    { entiti: "SRC Kencana", rm: 2485, pct: 1.4 },
    { entiti: "Lain-lain (3 entiti)", rm: 1306, pct: 0.6 }
  ],
  komitmen_jaminan_src: "3.13.45"
},

/* ---------------------------------------------------------------- HAJI / HAFIS
   ---------------------------------------------------------------- */
HAJI: {
  // 2014–2019 [3.16.3]
  sejarah: [
    { y: 2014, kos: 16155, bayar: 9980, hafis: 6175, pct_bayar: 62, pct_subsidi: 38, jumlah: 106 },
    { y: 2015, kos: 17270, bayar: 9980, hafis: 7290, pct_bayar: 58, pct_subsidi: 42, jumlah: 135 },
    { y: 2016, kos: 18890, bayar: 9980, hafis: 8910, pct_bayar: 53, pct_subsidi: 47, jumlah: 160 },
    { y: 2017, kos: 19550, bayar: 9980, hafis: 9570, pct_bayar: 51, pct_subsidi: 49, jumlah: 298 },
    { y: 2018, kos: 22450, bayar: 9980, hafis: 12470, pct_bayar: 44, pct_subsidi: 56, jumlah: 314 },
    { y: 2019, kos: 22900, bayar: 9980, hafis: 12920, pct_bayar: 44, pct_subsidi: 56, jumlah: 299 }
  ],
  sejarah_src: "3.16.3",
  sejarah_nota: "Tiada penghantaran jemaah haji pada 2020 dan 2021 (pandemik).",

  // Unjuran 2022–2030 [3.16.8] — U (unjuran laporan)
  unjuran: [
    { y: 2022, kos: 25540, bayar: 12980, hafis: 12560, pct_subsidi: 49.2, jumlah: 376.8 },
    { y: 2023, kos: 26280, bayar: 12980, hafis: 13300, pct_subsidi: 50.6, jumlah: 399.0 },
    { y: 2024, kos: 28160, bayar: 12980, hafis: 15180, pct_subsidi: 53.9, jumlah: 455.4 },
    { y: 2025, kos: 29570, bayar: 12980, hafis: 16590, pct_subsidi: 56.1, jumlah: 497.7 },
    { y: 2026, kos: 31040, bayar: 12980, hafis: 18060, pct_subsidi: 58.2, jumlah: 541.8 },
    { y: 2027, kos: 32592, bayar: 12980, hafis: 19612, pct_subsidi: 60.2, jumlah: 588.4 },
    { y: 2028, kos: 34221, bayar: 12980, hafis: 21241, pct_subsidi: 62.1, jumlah: 637.2 },
    { y: 2029, kos: 35932, bayar: 12980, hafis: 22952, pct_subsidi: 63.9, jumlah: 688.6 },
    { y: 2030, kos: 37729, bayar: 12980, hafis: 24749, pct_subsidi: 65.6, jumlah: 742.5 }
  ],
  unjuran_src: "3.16.8",

  fakta: {
    hafis_sejak_2001: 2020, // RM juta
    jemaah_sejak_1963: 1.46, // juta orang
    daftar_minimum: 1300,
    bayaran_2022: { b40: 10980, bukan_b40: 12980 },
    bayaran_beku: "Bayaran haji RM9,980 tidak berubah selama 13 tahun (2009–2021) walaupun kos naik hampir setiap tahun",
    pakej_anggaran: 25000,
    tunggu_semasa: "130–135 tahun",
    tunggu_jika_reformasi: "33 tahun",
    kuota: { semasa: 30000, visi_2030: 60000 },
    kos_2050_anggaran: 50000,
    src: ["4.2", "3.16.5", "3.16.16", "3.16.17", "3.16.20"]
  },
  reformasi: [
    "Deposit minimum pendaftaran haji dinaikkan daripada RM1,300 kepada RM12,980 (bayaran Muassasah semasa)",
    "Pengeluaran deposit besar dihadkan; notis sebulan sebelum pengeluaran",
    "Subsidi haji hanya kepada jemaah yang memerlukan (prinsip istito'ah — haji hanya wajib bagi yang mampu)"
  ],
  reformasi_src: "3.16.13"
},

/* ---------------------------------------------------------------- TADBIR URUS
   ---------------------------------------------------------------- */
TADBIRURUS: {
  menteri: [
    { nama: "Mejar Jeneral (B) Dato' Seri Jamil Khir bin Haji Baharom", dari: "2009-02-10", hingga: "2018-05-09", nota: "Menyelia LTH sepanjang krisis bermula; bidang kepakaran terhad kepada hal ehwal agama" },
    { nama: "Tun Dr. Mahathir bin Mohamad (PM)", dari: "2018-05-10", hingga: "2018-07-01", nota: "Kuasa Menteri dilaksanakan sementara oleh Perdana Menteri" },
    { nama: "Datuk Seri Dr. Mujahid bin Yusof Rawa", dari: "2018-07-02", hingga: "2020-03-09", nota: "" },
    { nama: "Senator Datuk Dr. Zulkifli bin Mohamad Al-Bakri", dari: "2020-03-10", hingga: "2021-08-29", nota: "" },
    { nama: "Senator Datuk Haji Idris bin Ahmad", dari: "2021-08-30", hingga: "2022-07-19", nota: "Menyelia semasa laporan disediakan" }
  ],
  menteri_src: "2.2.6",
  menteri_nota: "RCI: kepakaran ketiga-tiga Menteri Hal Ehwal Agama hanya terhad dalam bidang agama; mereka bergantung sepenuhnya kepada cadangan pengurusan dan Lembaga untuk keputusan dana & pelaburan, tanpa input pihak ketiga.",
  menteri_nota_src: "ringkasan",

  pengerusi: [
    { nama: "Datuk Seri Panglima Abdul Azeez bin Abdul Rahim", dari: "2013-07-01", hingga: "2018-05-23", nota: "Ahli Parlimen Baling; Ahli Majlis Tertinggi UMNO" },
    { nama: "Tan Sri Md Nor bin Md Yusoff", dari: "2018-07-10", hingga: "2021-10-15", nota: "Ditamatkan perkhidmatan sebelum kontrak (sambungan 2 tahun dari 20 Jul 2020) tamat" },
    { nama: "Tan Sri Azman bin Mokhtar", dari: "2021-12-20", hingga: "2022-07-19", nota: "Menyelia semasa laporan" }
  ],
  pengerusi_src: "2.2.15",

  ceo: [
    { nama: "Tan Sri Ismee bin Ismail", dari: "2006-01-01", hingga: "2016-06-30" },
    { nama: "Datuk Seri Johan bin Abdullah", dari: "2016-07-01", hingga: "2018-06-30" },
    { nama: "Dato' Sri Zukri bin Samat", dari: "2018-07-10", hingga: "2019-08-31" },
    { nama: "Datuk Nik Mohd Hasyudeen bin Yusoff", dari: "2019-09-01", hingga: "2021-05-05", nota: "Ditamatkan awal (sepatutnya 31 Ogos 2021)" },
    { nama: "Datuk Sri Amrin bin Awaluddin", dari: "2021-05-06", hingga: "2022-07-19" }
  ],
  ceo_src: "2.2.24",

  ahli_politik: [
    { nama: "Abdul Azeez bin Abdul Rahim", jawatan: "Pengerusi (2013–2018); ALP sejak 2011", politik: "Ahli Parlimen Baling; Ahli Majlis Tertinggi UMNO" },
    { nama: "Tan Sri Badruddin bin Amiruldin", jawatan: "ALP (2005–Jun 2018)", politik: "Ahli Parlimen Yan/Jerai 2004–2008; Pengerusi Tetap Perhimpunan Agong UMNO" },
    { nama: "Datuk Rosni binti Sohar", jawatan: "ALP (2014–Mei 2018)", politik: "ADUN Hulu Bernam; Majlis Kerja Tertinggi & Setiausaha Wanita UMNO" }
  ],
  ahli_politik_src: "3.2.13",

  // Penglibatan dalam anak syarikat [3.3.2, 3.4.1]
  anak_syarikat: [
    { nama: "Datuk Rozaida binti Omar", peran: "Pengurus Besar Kanan (Kewangan) / CFO", bil: 23, nota: "Proksi LTH di 23 anak syarikat" },
    { nama: "Datuk Seri Johan bin Abdullah", peran: "CEO (2016–2018)", bil: 18, nota: "Termasuk Pengerusi TH Heavy Engineering, Trurich, Deru Semangat" },
    { nama: "Dato' Noordin bin Sulaiman", peran: "ALP (2018–kini)", bil: 9, nota: "" },
    { nama: "Abdul Azeez bin Abdul Rahim", peran: "Pengerusi (2013–2018)", bil: 8, nota: "Termasuk TH Real Estate LLC, TH Hotel & Residence, Putrajaya Perdana, The Edge" },
    { nama: "Tan Sri Ismee bin Ismail", peran: "CEO (2006–2016)", bil: 7, nota: "Terus pegang 3 jawatan anak syarikat sehingga Mei 2018" },
    { nama: "Datuk Zaiton binti Mohd Hassan", peran: "ALP (2018–2020)", bil: 7, nota: "Pengerusi TH Properties" },
    { nama: "Dato' Sri Zukri bin Samat", peran: "CEO (2018–2019)", bil: 4, nota: "Melepas jawatan untuk elak konflik kepentingan" },
    { nama: "Datuk Nik Mohd Hasyudeen bin Yusoff", peran: "CEO (2019–2021)", bil: 4, nota: "" },
    { nama: "Tan Sri Badruddin bin Amiruldin", peran: "ALP (2005–2018)", bil: 3, nota: "" },
    { nama: "Datuk Sri Amrin bin Awaluddin", peran: "CEO (2021–kini)", bil: 3, nota: "" },
    { nama: "Encik Abd Kadir bin Sahlan", peran: "Ketua Pegawai Pelaburan (2010–2018)", bil: 3, nota: "" }
  ],
  anak_syarikat_src: ["3.3.2", "3.4.1"],
  anak_syarikat_dasar: "Dasar baharu LTH: Pengerusi, ALP dan pengurusan tertinggi dihadkan kepada maksimum 5 jawatan anak syarikat.",
  anak_syarikat_dasar_src: "3.4.3",

  // Laporan polis [3.15.1–3.15.10]
  polis: [
    { tarikh: "30 Nov 2018", repot: "Dang Wangi/31347/2018", pengadu: "Idrus bin Ismail (mantan Setiausaha Syarikat LTH)", perkara: "Aktiviti & penggunaan wang Yayasan Tabung Haji didakwa menyalahi Memorandum & Articles", status: "Siasatan selesai; dirujuk kepada Jabatan Peguam Negara" },
    { tarikh: "30 Nov 2018", repot: "Dang Wangi/31331/2018", pengadu: "Idrus bin Ismail", perkara: "Salah nyataan & penyembunyian maklumat penjualan 95% saham THIP kepada PT Borneo Pacific (≈USD910 juta)", status: "Siasatan berterusan; kekangan rentas sempadan (Indonesia)" },
    { tarikh: "13 Dis 2018", repot: "Dang Wangi/32724/2018", pengadu: "Aliatun binti Mahmud (mantan Setiausaha Trurich)", perkara: "Manipulasi laporan kesesuaian tanah 40,880 hektar (Kalimantan) untuk justifikasi pemerolehan ≈USD58 juta (2008–2009)", status: "Siasatan berterusan; menunggu kebenaran pihak berkuasa Indonesia" },
    { tarikh: "16 Jan 2019", repot: "Dang Wangi/1484/2019", pengadu: "Idrus bin Ismail", perkara: "Salah nyataan dalam dua kertas kerja Mesyuarat Khas Lembaga (6 & 9 Feb 2018) untuk isytihar hibah 2017 yang bercanggah seksyen 22 Akta 535", status: "Siasatan lengkap; dirujuk kepada Jabatan Peguam Negara" }
  ],
  polis_src: "3.15.1",

  // Laporan SPRM [3.15.21]
  sprm: [
    "Dakwaan rasuah pembelian Ladang Weida oleh TH Plantation",
    "Dakwaan penyelewengan & salah guna kuasa penyewaan Restoran Opah, KL Sentral",
    "Dakwaan penyelewengan & salah guna kuasa penyewaan Restoran Nasi Dalca, Bangunan Ibu Pejabat LTH",
    "Dakwaan penyelewengan & rasuah mantan Ketua Pegawai Operasi dalam pengubahsuaian",
    "Dakwaan pemalsuan dokumen pembekalan rubber seedlings TH Plantation di Ladang TH-Usia Jatimas, Sandakan",
    "Dakwaan salah laku pegawai THP Bina & THP Timur (anak syarikat TH Properties)"
  ],
  sprm_status: "SPRM masih menjalankan siasatan; perbincangan LTH–SPRM berterusan.",
  sprm_src: "3.15.21",

  // Tindakan tatatertib [3.15.12–3.15.19]
  tatatertib: [
    {
      nama: "Datuk Rozaida binti Omar", jawatan_asal: "Ketua Pegawai Kewangan Kumpulan (Gred K)",
      kluster: [1, 2, 3],
      ringkas: "K1: dibuang kerja (21 Apr 2021) → rayuan: turun pangkat (6 Sep 2021). K2: turun pangkat (31 Mei 2019) → rayuan: amaran keras (18 Jul 2019). K3: dibuang kerja (16 Apr 2021) → rayuan: turun pangkat (6 Sep 2021).",
      kini: "Pengurus Besar Strategik Modal Insan (Gred J), Jabatan Modal Insan LTH"
    },
    {
      nama: "Dato' Adi Azuan Abdul Ghani", jawatan_asal: "Ketua Pegawai Operasi (Gred K)",
      kluster: [2],
      ringkas: "Turun pangkat (31 Mei/1 Nov 2019) → rayuan: amaran keras (28 Jan 2020).",
      kini: "Pengurus Besar Kanan Kafe & Pembangunan Perniagaan (Gred K), TH Hotel & Residence"
    },
    {
      nama: "Rifina binti Md Ariff", jawatan_asal: "Pengurus Besar Kanan Perkhidmatan Korporat & Hartanah (Gred K)",
      kluster: [1],
      ringkas: "Dibuang kerja (21 Apr 2021) → rayuan: turun pangkat (6 Sep 2021).",
      kini: "Ketua Bahagian Risiko & Pematuhan (Gred J), TH Plantations"
    },
    {
      nama: "Mohd Hisham bin Harun", jawatan_asal: "Ketua Pegawai Sumber Manusia (Gred K)",
      kluster: [1, 2],
      ringkas: "K1: dibuang kerja → turun pangkat (rayuan). K2: turun pangkat → amaran & tangguh kenaikan gaji (rayuan).",
      kini: "Head, Business & Corporate Affairs (Gred J), TH Properties"
    },
    {
      nama: "Hazlina binti Mohd Khalid", jawatan_asal: "Penasihat Undang-Undang (Gred J)",
      kluster: [1, 4],
      ringkas: "K4: turun pangkat (1 Nov 2019); rayuan dikekalkan (28 Jan 2020). K1: dibuang kerja → turun pangkat (rayuan).",
      kini: "Timbalan Pengurus Besar (Gred H2), TH Plantations"
    }
  ],
  kluster_def: {
    1: "Penjualan saham PT TH Indo Plantations",
    2: "Sumbangan RM22.12 juta kepada Yayasan TH tanpa kelulusan KPDNHEP (melanggar Akta Syarikat 1965)",
    3: "Perisytiharan hibah tahun kewangan 2017",
    4: "Tuntutan bayaran mengandungi butiran palsu"
  },
  tatatertib_nota: "RCI: proses tatatertib mengambil masa terlalu lama — 19 bulan (K2), 15 bulan (K3), 10 bulan (K4) dari surat representasi hingga keputusan. Semua pegawai masih bertugas di LTH/anak syarikat.",
  tatatertib_src: "3.15.12",

  // Jawatankuasa & Panel Pelaburan
  panel_pelaburan: {
    dibubar: "Mei 2018 — diganti Exco Perniagaan (dipengerusikan Menteri Hal Ehwal Ekonomi) yang diakui saksi tidak pernah berfungsi",
    dihidup_semula: "Panel Pelaburan diwujudkan semula oleh pengurusan kemudiannya",
    pengakuan: "Pengerusi Panel Pelaburan Dato' Mohzani mengakui mereka tidak cukup tegas; pendekatan longgar dan tidak menyeluruh",
    src: "3.5.7"
  },
  saksi: {
    dipanggil: [
      { nama: "Jamil Khir Baharom", tarikh: "9 Mei 2022" },
      { nama: "Abdul Azeez Abdul Rahim", tarikh: "9 Mei 2022" },
      { nama: "Tan Sri Ismee Ismail", tarikh: "9 Mei 2022" },
      { nama: "Datuk Seri Johan Abdullah", tarikh: "11 Mei 2022" },
      { nama: "Datuk Rozaida Omar", tarikh: "11 Mei 2022" },
      { nama: "Dr. Mujahid Yusof Rawa", tarikh: "12 Mei 2022" },
      { nama: "Tan Sri Md Nor Md Yusof", tarikh: "12 Mei 2022" },
      { nama: "Datuk Zaiton Mohd Hassan", tarikh: "12 Mei 2022" },
      { nama: "Dato' Sri Zukri Samat", tarikh: "23 Mei 2022" },
      { nama: "Dato' Mohzani Abdul Wahab", tarikh: "23 Mei 2022" },
      { nama: "Ahmad Qadri Jahubar Sathik (EY)", tarikh: "23 Mei 2022" },
      { nama: "Puan Mona Othman (JAN)", tarikh: "1 Jun 2022" },
      { nama: "Datuk Sri Amrin Awaluddin", tarikh: "2 & 27 Jun 2022" },
      { nama: "Hizamuddin Jamalluddin", tarikh: "2 Jun 2022" },
      { nama: "Datuk Nik Mohd Hasyudeen Yusoff", tarikh: "4 Jun 2022" },
      { nama: "Abd Kadir Sahlan", tarikh: "4 Jun 2022" }
    ],
    src: "1.12.3"
  }
},

/* ---------------------------------------------------------------- GARIS MASA
   ---------------------------------------------------------------- */
GARISMASA: [
  { t: "1951", e: "Ordinan Haji; Pejabat Urusan Haji Pulau Pinang", c: "sejarah" },
  { t: "1962", e: "PWSBH ditubuhkan (Akta 34/62)", c: "sejarah" },
  { t: "1969", e: "LUTH ditubuhkan (Akta 8)", c: "sejarah" },
  { t: "1 Jun 1995", e: "LTH ditubuhkan (Akta 535)", c: "sejarah" },
  { t: "2001", e: "Skim subsidi haji (HAFIS) bermula", c: "haji" },
  { t: "2009", e: "Kerajaan beku kenaikan bayaran haji (RM9,980 sehingga 2021)", c: "haji" },
  { t: "Jun–Jul 2012", e: "LTH langgan IPO FGV (jumlah kos ≈RM1.37 bilion)", c: "pelaburan" },
  { t: "21 Ogos 2014", e: "Surat teguran pertama BNM kepada Pengerusi LTH (deposit & kecairan)", c: "amaran" },
  { t: "2014–2017", e: "Hibah tinggi (4.25%–6.25% + hibah haji); rizab menyusut", c: "kewangan" },
  { t: "Dis 2014 & Dis 2015", e: "BNM tegur semula: deposit, kecairan, dasar rizab", c: "amaran" },
  { t: "2016", e: "Akad deposit ditukar kepada Wadi'ah Yad Dhamanah; rangka kerja RAV (EY, Jun 2016)", c: "kewangan" },
  { t: "2017", e: "Polisi rosot nilai diubah 2 kali (70%→85%→90%); laporan RB disiapkan tetapi tidak dibentang kepada Lembaga", c: "kewangan" },
  { t: "Mei 2018", e: "Panel Pelaburan dibubarkan; Exco Perniagaan ganti (tidak berfungsi)", c: "tadbirurus" },
  { t: "16 Jul 2018", e: "KAN keluarkan 'Emphasis of Matter' untuk penyata 2018 bagi tahun 2017; PwC dilantik untuk financial review", c: "kewangan" },
  { t: "30 Nov 2018", e: "2 laporan polis pertama; Jemaah Menteri setuju pelan pemulihan secara dasar", c: "akauntabiliti" },
  { t: "7 Dis 2018", e: "Jemaah Menteri lulus Pelan Pemulihan & Penstrukturan LTH; LTH bawah kawal selia BNM (pentadbiran)", c: "penyelamatan" },
  { t: "14 Dis 2018", e: "UJSB ditubuhkan", c: "penyelamatan" },
  { t: "27 Dis 2018", e: "Perjanjian Pemindahan Aset: RM19.9b (pasaran RM9.7b)", c: "penyelamatan" },
  { t: "Feb 2019", e: "Pengumuman hibah 1.25% (2018); deposit susut RM73b → RM69b", c: "kewangan" },
  { t: "5 Apr 2019", e: "Jemaah Menteri lulus peruntukan RM17.8 bilion untuk tebus sukuk", c: "penyelamatan" },
  { t: "15 Mei 2019", e: "Perjanjian Sukuk RM27.56b & ROFR dimeterai", c: "penyelamatan" },
  { t: "Dis 2019", e: "Akad ditukar kepada Wakalah selepas kajian menyeluruh", c: "kewangan" },
  { t: "2020", e: "Geran Kerajaan RM500 juta; tebus awal sukuk RM200 juta (30 Nov)", c: "penyelamatan" },
  { t: "2021", e: "Suntikan RM1.5 bilion yang diluluskan tidak diterima UJSB (alasan: Covid-19)", c: "penyelamatan" },
  { t: "20 Jan 2022", e: "RCI ditubuhkan; 6 Pesuruhjaya dilantik (6 bulan)", c: "rci" },
  { t: "9 Mei – 27 Jun 2022", e: "Prosiding: 16 saksi dipanggil secara tertutup", c: "rci" },
  { t: "19 Jul 2022", e: "Laporan RCI ditandatangani", c: "rci" },
  { t: "30 Ogos 2022", e: "Laporan dipersembahkan kepada KDYMM Yang di-Pertuan Agong", c: "rci" }
],

/* ---------------------------------------------------------------- SYOR (25)
   ---------------------------------------------------------------- */
SYOR: [
  { id: 1, tema: "Undang-undang", teks: "Pinda Akta 535: kriteria khusus & kaedah pemilihan anggota Lembaga", src: "4.4.1(a)" },
  { id: 2, tema: "Undang-undang", teks: "Pinda Akta 535: bidang kepakaran anggota Lembaga dinyatakan secara khusus", src: "4.4.1(b)" },
  { id: 3, tema: "Undang-undang", teks: "Peruntukan melarang ahli politik aktif dilantik sebagai Pengerusi/anggota Lembaga & anak syarikat", src: "4.4.1(c)" },
  { id: 4, tema: "Undang-undang", teks: "Pembatalan pelantikan anggota Lembaga perlu dirujuk kepada jawatankuasa/badan penasihat bebas", src: "4.4.1(d)" },
  { id: 5, tema: "Undang-undang", teks: "Penamatan perkhidmatan anggota Lembaga mesti diberi sebab munasabah", src: "4.4.1(e)" },
  { id: 6, tema: "Undang-undang", teks: "Jawatankuasa Urusan Haji, Jawatankuasa Penasihat Syariah & Panel Pelaburan dikanunkan dalam Akta 535 (termasuk kuorum, undi pemutus, kekosongan, penzahiran kepentingan)", src: "4.4.1(f)" },
  { id: 7, tema: "Kewangan", teks: "Peruntukan jelas tentang pengiraan hibah — berpandukan penyata kewangan tahunan yang diaudit mengikut piawaian MIA", src: "4.4.1(g)" },
  { id: 8, tema: "Kewangan", teks: "Penubuhan jabatan 'Dana Haji' untuk pelaburan LTH, dikawal selia Suruhanjaya Sekuriti Malaysia", src: "4.4.1(h)" },
  { id: 9, tema: "Undang-undang", teks: "Pinda seksyen 26 Akta 535: kecualikan pemakaian Akta 240 (Badan Berkanun) terhadap LTH", src: "4.4.1(i)" },
  { id: 10, tema: "Tadbir urus", teks: "Kuasa dikongsi: Menteri Hal Ehwal Agama (pengurusan haji) + Menteri Kewangan (kewangan, dana, pelaburan); Pengerusi/ALP/CEO dilantik PM atas syor badan bebas", src: "4.4.2" },
  { id: 11, tema: "Tadbir urus", teks: "Penglibatan anggota Lembaga & pengurusan dalam anak syarikat dihadkan (elak konflik kepentingan)", src: "4.4.3" },
  { id: 12, tema: "Tadbir urus", teks: "BNM tidak patut kawal selia LTH; jika perlu, hanya kawalan rizab & pengurusan kecairan (bukan di bawah Akta 758/759/618)", src: "4.4.4" },
  { id: 13, tema: "Kewangan", teks: "Audit penyata kewangan LTH oleh Firma Akauntan Swasta, bukan Jabatan Audit Negara", src: "4.4.5" },
  { id: 14, tema: "Kewangan", teks: "Hibah berdasarkan penyata kewangan diaudit — bukan Laporan Proforma; RAV tidak boleh jadi asas", src: "4.4.6" },
  { id: 15, tema: "Kewangan", teks: "Penyata kewangan patuh sepenuhnya Akta 240 & Garis Panduan PA 3.1", src: "4.4.7" },
  { id: 16, tema: "Akauntabiliti", teks: "Amalan bonus terlalu tinggi kepada kakitangan dihentikan", src: "4.4.8" },
  { id: 17, tema: "Akauntabiliti", teks: "Dapatkan semula bonus TH Properties yang diberi tanpa ikut peraturan", src: "4.4.9" },
  { id: 18, tema: "Akauntabiliti", teks: "Audit forensik ke atas 14 pelaburan bermasalah (THIP, Emrail, Wellspring, DSSB, Trurich, Abraj, PPB, Al-Rawda, Al-Fareeda, THP, TH Properties, TH Marine, THHR, FGV)", src: "4.4.10" },
  { id: 19, tema: "Akauntabiliti", teks: "Pihak berkuasa wajib ambil tindakan tegas & segera atas setiap laporan polis/aduan", src: "4.4.11" },
  { id: 20, tema: "Akauntabiliti", teks: "Proses tatatertib (termasuk durasi penahanan kerja) diperkemas & disegerakan", src: "4.4.12" },
  { id: 21, tema: "Akauntabiliti", teks: "Transaksi dalam pertikaian mahkamah/timbang tara dipantau dekat; penyelesaian luar mahkamah dipertingkatkan", src: "4.4.13" },
  { id: 22, tema: "Kewangan", teks: "Bayaran zakat disempurnakan; isu perubahan akad dirujuk kepada Muzakarah MKI", src: "4.4.14" },
  { id: 23, tema: "Penyelamatan", teks: "Kerajaan ambil perhatian serius pelaksanaan Pelan Pemulihan 2018; Sukuk ditambah baik dengan jaminan Kerajaan (jaminan seksyen 24 kini menanggung RM88 bilion)", src: "4.4.15" },
  { id: 24, tema: "Penyelamatan", teks: "Sukuk baharu boleh diniaga (tradeable); ditawarkan juga kepada institusi kewangan lain; Kerajaan pastikan peruntukan RM1.73 bilion/setahun; UJSB digalakkan tebus awal dari hasil pelupusan", src: "4.4.16–4.4.19" },
  { id: 25, tema: "Haji", teks: "Dasar deposit/haji/HAFIS: minimum pendaftaran RM1,300 → RM12,980; had pengeluaran besar + notis sebulan; subsidi hanya kepada yang memerlukan", src: "4.4.20" },
  { id: 26, tema: "Haji", teks: "Rancang bawa lebih ramai jemaah; guna sepenuhnya kuota tambahan Arab Saudi", src: "4.4.21" },
  { id: 27, tema: "Haji", teks: "Naikkan minimum pendaftaran kepada RM12,980 untuk kurangkan tempoh menunggu 130 tahun → 33 tahun", src: "4.4.22" },
  { id: 28, tema: "Pelaburan", teks: "Fungsi pelaburan & agihan bebas dan profesional; Dana Haji dalam LTH dikawal selia SC; kekal subsidi silang dalam satu entiti", src: "4.4.23" },
  { id: 29, tema: "Pelaburan", teks: "Fokus pengurusan dana portfolio; keluar daripada 'pelaburan strategik' berisiko tinggi", src: "4.4.24" },
  { id: 30, tema: "Tadbir urus", teks: "Penambahbaikan menyeluruh model perniagaan & pelaburan; tadbir urus profesional tanpa campur tangan politik", src: "4.4.25" }
],
SYOR_TEMA: ["Semua", "Undang-undang", "Tadbir urus", "Kewangan", "Pelaburan", "Penyelamatan", "Haji", "Akauntabiliti"],

/* ---------------------------------------------------------------- KISAH (story mode)
   ---------------------------------------------------------------- */
KISAH: [
  {
    id: "asas", tajuk: "Apa itu Tabung Haji — dan kenapa ada RCI?",
    ringkas: "Tabung Haji (TH) mengurus simpanan haji rakyat Malaysia sejak 1963. Pada 2022, satu Suruhanjaya Siasatan Diraja (RCI) ditubuhkan untuk menyiasat apa yang berlaku antara 2014–2020.",
    poin: [
      "8.6 juta pendeposit dengan simpanan RM88 bilion (Julai 2022) — semua deposit dijamin Kerajaan.",
      "Sejak 1966–2021, TH telah mengagihkan hibah berjumlah RM37.52 bilion; sejak 2001 menanggung subsidi haji (HAFIS) RM2.02 bilion.",
      "RCI: 6 Pesuruhjaya, 45 saksi bertulis, 16 saksi dipanggil, prosiding tertutup selama 6 bulan.",
      "Skop: isu pengurusan & operasi 2014–2020, merujuk penemuan PwC, Ernst & Young dan Roland Berger."
    ],
    caveat: "Laporan ini ialah hasil siasatan, bukan keputusan mahkamah. Penemuan RCI adalah berdasarkan bukti yang dikemukakan kepadanya.",
    srcs: ["4.2", "ringkasan"], goto: { label: "Lihat tadbir urus", view: "tadbir" }
  },
  {
    id: "krisis", tajuk: "Krisis dalam satu carta: aset < liabiliti",
    ringkas: "Kiraan PwC menunjukkan mulai 2015, jumlah aset TH sebenarnya lebih rendah daripada liabilitinya (termasuk deposit) — sebelum hibah dibayar lagi. Tetapi hibah tetap diagihkan setiap tahun.",
    poin: [
      "2013: lebihan RM5.08 bilion sebelum agihan. 2016: defisit RM1.26 bilion. 2017: defisit RM769 juta — sebelum hibah.",
      "Selepas hibah dibayar, defisit melonjak: RM4.13 bilion (2016) dan RM4.09 bilion (2017).",
      "Menurut Akta 535 (seksyen 22), hibah hanya boleh diisytihar jika aset melebihi liabiliti.",
      "PwC: sekiranya piawaian MFRS dipatuhi, 2017 sepatutnya mencatat kerugian RM1.4 bilion — bukan keuntungan RM3.4 bilion seperti dilaporkan."
    ],
    caveat: "Angka PwC adalah semakan kewangan (financial review), bukan audit semula. RCI menyatakan beberapa penemuan PwC adalah benar.",
    srcs: ["3.9.2", "3.13.7", "2.1"], goto: { label: "Teroka kewangan", view: "kewangan" }
  },
  {
    id: "hibah", tajuk: "Hibah yang melebihi kemampuan",
    ringkas: "Antara 2014–2017, TH membayar hibah 4.25%–6.25% setahun (campur hibah haji) — lebih tinggi daripada deposit bank Islam. Untuk tahun 2017, TH membayar RM610 juta lebih daripada kemampuan sebenarnya.",
    poin: [
      "Hibah 2014: 6.25% + 2% (haji). Jumlah dibayar 2014–2017: RM12.65 bilion.",
      "Kiraan JAN (audit negara): kemampuan sebenar 2017 hanya RM2.70 bilion (kadar 4%), tetapi TH membayar RM3.31 bilion (kadar 6.25%) — lebih 22.5%.",
      "Kaedah kiraan ditukar pada 2017 (purata tahunan → bulanan) dan diumumkan Feb 2018, kemudian ditarik balik selepas reaksi negatif.",
      "Hibah tinggi menarik pendeposit besar yang mencari pulangan — TH tersasar daripada matlamat asal membantu bakal haji."
    ],
    caveat: "Hibah yang tinggi bukan jenayah dalam dirinya; isu RCI ialah ia dibayar walaupun angka sebenar tidak menyokongnya.",
    srcs: ["3.9.22", "3.11.7", "3.11.10", "3.9.9"], goto: { label: "Butiran hibah", view: "kewangan" }
  },
  {
    id: "solek", tajuk: "Bagaimana angka 'dicantikkan'",
    ringkas: "Tiga mekanisme utama: (1) guna kiraan RAV sendiri dan bukan penyata beraudit, (2) ubah polisi rosot nilai supaya kerugian tidak perlu direkod, (3) audit 'bersih' walaupun ada masalah besar.",
    poin: [
      "RAV 2017 menambah RM4.47 bilion kepada nilai aset — termasuk RM4.04 bilion penilaian hartanah THP yang hanya anggaran pengurusan, bukan penilai profesional.",
      "Polisi rosot nilai diubah dua kali dalam 2017: ambang 70% → 85% → 90%. Hasilnya, hanya RM1 juta rosot nilai direkod — sepatutnya RM1.3 bilion.",
      "Jumlah rosot nilai tidak direkod 2017: RM1.54 bilion — jauh melebihi 'baki boleh agih' RAV RM373 juta.",
      "Ketua Audit Negara mengakui 'Pendapat Berteguran' dicadangkan, tetapi ditukar kepada pendapat bersih + Emphasis of Matter kerana bimbang persepsi pendeposit.",
      "Kumpulan Wang Pendeposit dikelaskan sebagai ekuiti (seperti modal) sejak 2010 — sepatutnya liabiliti."
    ],
    caveat: "RCI tidak membuat kesimpulan jenayah; ia mengesyorkan audit forensik dan tindakan pihak berkuasa.",
    srcs: ["3.9.12", "3.9.13", "3.13.8", "3.11.15", "3.11.12"], goto: { label: "Lihat mekanisme", view: "kewangan" }
  },
  {
    id: "pelaburan", tajuk: "Ke mana wang pergi: 14 pelaburan bermasalah",
    ringkas: "RCI mengenal pasti 14 pelaburan bermasalah yang memerlukan audit forensik — dari ladang sawit di Indonesia, kapal luar persisiran, hingga hotel di Mekah. Kerugian & rosot nilai yang disebut secara eksplisit berjumlah ≈ RM2.6 bilion.",
    poin: [
      "FGV: kerugian tidak nyata RM1.06 bilion; diselamatkan apabila UJSB ambil alih pada harga kos.",
      "Trurich (Kalimantan): RM364 juta dirosotnilai penuh; syarikat insolven.",
      "TH Marine: daripada RM334 juta dilabur, hanya RM70.4 juta dijangka pulih.",
      "Deru Semangat: RM257 juta dirosotnilai kepada RM32 juta selepas langgar polisi alam sekitar.",
      "Al-Rawda (4 hotel Mekah/Madinah): sewa tertunggak SR560.7 juta; kes di mahkamah Arab Saudi.",
      "RCI: proses keputusan pelaburan tidak teratur; Panel Pelaburan 'tidak cukup tegas'; Menteri tandatangan 'dipersetujui seperti dicadangkan' tanpa input bebas."
    ],
    caveat: "Jumlah RM2.6 bilion ialah hasil tambah angka kerugian yang disebut laporan; kerugian sebenar di peringkat kumpulan mungkin berbeza.",
    srcs: ["3.14.1", "3.14.6", "3.14.4"], goto: { label: "Teroka 14 pelaburan", view: "pelaburan" }
  },
  {
    id: "ujsb", tajuk: "Operasi menyelamat: UJSB & sukuk RM27.5 bilion",
    ringkas: "Hujung 2018, Kerajaan menubuhkan UJSB untuk mengambil alih aset bermasalah TH pada nilai RM19.9 bilion — walaupun nilai pasarannya hanya RM9.7 bilion. Sebagai balasan, TH menerima sukuk RM27.5 bilion yang hanya mampu dibayar oleh Kerajaan.",
    poin: [
      "4 pilihan dikaji; pemindahan ke SPV (model Danaharta) dipilih.",
      "Premium RM10.2 bilion atas nilai pasaran menutup defisit — membolehkan hibah 2018 (1.25%) diisytihar.",
      "Sukuk matang berpukal: RM13.2 bilion (2026) dan RM14.3 bilion (2029). Kerajaan janji RM1.73 bilion setahun — tetapi suntikan RM1.5 bilion 2021 tidak diterima.",
      "Kini sukuk = 31% aset TH; keuntungan sukuk (atas kertas) = 26% pendapatan tahunan TH. Pendapatan tertunggak terkumpul >RM2.1 bilion.",
      "Hartanah dipindah pada RM2.25 bilion kini bernilai RM1.2 bilion (Dis 2021)."
    ],
    caveat: "RCI akui pelan ini solusi interim yang penting, tetapi bukan penyelesaian jangka panjang — risiko penebusan sukuk kekal besar.",
    srcs: ["3.13.28", "3.13.62", "3.13.48", "3.13.34"], goto: { label: "Bedah siasat UJSB", view: "ujsb" }
  },
  {
    id: "haji", tajuk: "Subsidi haji yang makin membesar",
    ringkas: "Kos haji naik setiap tahun, tetapi bayaran jemaah dibekukan RM9,980 selama 13 tahun. Jurangnya ditanggung TH melalui HAFIS — daripada keuntungan yang sepatutnya dikongsi dengan pendeposit.",
    poin: [
      "HAFIS: RM106 juta (2014) → RM299 juta (2019). Unjuran laporan: RM742 juta setahun menjelang 2030.",
      "Jika bayaran kekal RM12,980, subsidi akan menjadi 65.6% daripada kos haji pada 2030.",
      "RM400 juta subsidi setahun ≈ tolakan 0.4% daripada kadar hibah semua pendeposit.",
      "Dengan deposit minimum RM1,300, giliran haji kini ~130 tahun; RCI syor naikkan kepada RM12,980 → giliran jadi ~33 tahun.",
      "65% pendeposit ada simpanan RM2,000 atau kurang."
    ],
    caveat: "Angka 2022–2030 ialah unjuran LTH yang disebut dalam laporan, bukan fakta sejarah.",
    srcs: ["3.16.3", "3.16.8", "3.16.17", "3.16.14"], goto: { label: "Teroka HAFIS", view: "haji" }
  },
  {
    id: "siapa", tajuk: "Siapa yang bertanggungjawab?",
    ringkas: "RCI menyorot tadbir urus: ahli politik dalam Lembaga, kuasa Menteri yang terlalu luas, bonus kakitangan sehingga 13 bulan ketika TH defisit, dan tindakan tatatertib yang perlahan.",
    poin: [
      "2014–2018: Pengerusi & 2 anggota Lembaga adalah ahli politik aktif.",
      "Bonus kakitangan 2010–2017 sehingga 13 bulan (RM74 juta pada 2014) — ketika aset < liabiliti.",
      "Bonus istimewa TH Properties RM2.2 juta (2017–18) melanggar Akta Syarikat; RCI syor dapatkan semula.",
      "4 laporan polis, 6 laporan SPRM, 5 pegawai dikenakan tatatertib — semua masih bertugas.",
      "Pengurusan atasan pegang banyak jawatan anak syarikat (sehingga 23 jawatan seorang)."
    ],
    caveat: "Individu yang dinamakan dalam laporan belum tentu bersalah di sisi undang-undang; siasatan masih berjalan untuk kebanyakan kes.",
    srcs: ["3.2.13", "3.12.7", "3.12.28", "3.15.1", "3.15.21"], goto: { label: "Lihat tadbir urus", view: "tadbir" }
  },
  {
    id: "hadapan", tajuk: "Apa seterusnya? 30 syor RCI",
    ringkas: "RCI syor kekalkan struktur TH, tetapi dengan perubahan besar: kuasa Menteri dikongsi dengan Menteri Kewangan, 'Dana Haji' dikawal selia Suruhanjaya Sekuriti, hibah ikut penyata diaudit, dan ahli politik dilarang daripada Lembaga.",
    poin: [
      "Pinda Akta 535 (9 perkara) — termasuk larangan ahli politik aktif dan kriteria pelantikan.",
      "Audit oleh firma swasta, bukan Jabatan Audit Negara.",
      "Audit forensik 14 pelaburan bermasalah.",
      "Dasar haji baharu: pendaftaran RM12,980, subsidi bersasar, notis pengeluaran.",
      "Kerajaan mesti konsisten dengan RM1.73 bilion setahun untuk tebus sukuk — jika tidak, risiko kembali berulang."
    ],
    caveat: "Syor RCI adalah nasihat kepada Kerajaan; pelaksanaan bergantung kepada tindakan Kerajaan dan Parlimen.",
    srcs: ["4.4.1", "4.4.23", "4.4.18"], goto: { label: "Semua syor", view: "syor" }
  }
]
};
