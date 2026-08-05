/* ============================================================
   RCI Tabung Haji 2022 — dataset terjejak
   Jenis data: fakta (dinyatakan laporan) / terbitan (pengiraan
   daripada angka laporan) / unjuran (ramalan laporan) / simulasi
   (senario pengiraan kami). Setiap angka disertai PDF ms.
   ============================================================ */
window.RCIDATA = {

sections: [
  {id:"gambaran",  label:"Gambaran",   t:"Cerita besar & peta dashboard"},
  {id:"krisis",    label:"Krisis 2017",t:"Dua buku akaun: untung palsu vs rugi benar"},
  {id:"hibah",     label:"Hibah & Deposit",t:"Pulangan dijanjikan vs kemampuan sebenar"},
  {id:"pelaburan", label:"Pelaburan Bermasalah",t:"14 lubang wang & coraknya"},
  {id:"ujsb",      label:"Penyelamatan UJSB",t:"Aset dipindah, hutang jadi sukuk"},
  {id:"haji",      label:"Kos Haji & HAFIS",t:"Subsidi yang menekan pendeposit"},
  {id:"tadbir",    label:"Tadbir Urus",t:"Orang, kuasa & konflik kepentingan"},
  {id:"cadangan",  label:"Cadangan & Masa Depan",t:"Apa kena berubah & kesannya kepada awak"}
],

kpi: [
  {t:"Deposit pendeposit (2022)", v:"RM88",  s:"bilion · PDF ms 122/210", a:"#0d5c46"},
  {t:"Pendeposit (22 Jul 2022)",  v:"8.6",   s:"juta orang · PDF ms 229", a:"#2b5d8a"},
  {t:"Hibah dibayar 1966–2021",   v:"RM37.52",s:"bilion · PDF ms 230", a:"#b06a1b"},
  {t:"Kerugian tersembunyi 2017", v:"−RM1.4", s:"bilion jika MFRS dipatuhi · PDF ms 19/149", a:"#b3382c"},
  {t:"Rosot nilai tak direkod 2017",v:"RM227.81",s:"juta · PDF ms 18/133", a:"#b3382c"},
  {t:"Aset dipindah ke UJSB",     v:"RM19.9", s:"bilion (nilai pasaran RM9.7bn) · PDF ms 121", a:"#0d5c46"},
  {t:"HAFIS unjuran 2030",        v:"RM742", s:"juta/tahun · PDF ms 206", a:"#b06a1b"},
  {t:"Pelaburan bermasalah",      v:"14",    s:"syarikat perlu audit forensik · PDF ms 193", a:"#6a4a9a"}
],

/* ==== Bab 1 — KRISIS (dua buku) ==== */
pwc2017: [
  {label:"Untung dilapor (buku rasmi)", val:3412, kind:"pos", note:"Keuntungan dicatat Laporan Kewangan 2017"},
  {label:"− Rosot nilai ekuiti AFS",     val:-4258, kind:"neg", note:"Pelaburan ekuiti yang sepatutnya dirosotkan"},
  {label:"− Rosot nilai hutang AFS",     val:-7,   kind:"neg", note:"Instrumen pendapatan tetap"},
  {label:"− Pelarasan lain",             val:-580, kind:"neg", note:"Dividen tak dibayar & kejatuhan nilai saksama hartanah dll."},
  {label:"Kerugian terlaras (MFRS)",     val:-1433, kind:"neg", note:"= −RM1.4 bilion"}
],
deficit: [
  {y:"2013", aset:48778, liab:43696, pra:5082, agih:2632, pasca:2450},
  {y:"2014", aset:54751, liab:51866, pra:2885, agih:3237, pasca:-352},
  {y:"2015", aset:60196, liab:60062, pra:134,  agih:3220, pasca:-3086},
  {y:"2016", aset:64321, liab:65581, pra:-1260,agih:2871, pasca:-4131},
  {y:"2017", aset:70317, liab:71086, pra:-769, agih:3324, pasca:-4093}
],
impairPolicy: [
  {ambang:">70%",  tempoh:">24 bulan", kesan:1313, nota:"Polisi asal"},
  {ambang:">85%",  tempoh:"Tiada",     kesan:171,  nota:"Tukaran #1 (2017)"},
  {ambang:">90%",  tempoh:"Tiada",     kesan:1,    nota:"Tukaran #2 (2017) — LTH catat rosot hanya RM1j"}
],
rav2017: {aset:70317, topup:4466, asetRAV:74783, liab:74410, bersih:373},
unrecordedImp: {jumlah:227.81, thhe:164.58, lain:63.23, nota:"3 subsidiari + 3 bersekutu"},
krisisTimeline: [
  {d:"2009–2017", h:"Bonus 2–13 bulan + hibah tinggi", t:"Kadar agihan 4.25–6.25% setahun melebihi kemampuan kewangan LTH.", k:""},
  {d:"2014–2017", h:"Defisit aset berbanding liabiliti", t:"Jurang defisit mula wujud; hibah terus diagih walaupun aset < liabiliti (2016, 2017).", k:"crisis"},
  {d:"Okt 2015", h:"BNM mula bimbang", t:"BNM menulis kepada Pengerusi & Menteri berkaitan pengambilan deposit & rizab.", k:""},
  {d:"2017", h:"Polisi rosot nilai diubah 2× dalam setahun", t:"Ambang 70% → 85% → 90% supaya LTH boleh catat untung & bayar hibah (rosot jadi RM1j sahaja).", k:"crisis"},
  {d:"23 Mei 2018", h:"EY keluarkan laporan Proforma (RAV)", t:"Berdasarkan Proforma, bukan penyata beraudit (yang baru dimuktamad 16 Julai 2018).", k:""},
  {d:"16 Jul 2018", h:"JAN tegur — ‘Emphasis of Matter’", t:"Rosot nilai RM227.81j tidak direkod; polisi diubah 2×; JAN tetap beri Sijil Audit Bersih.", k:"crisis"},
  {d:"Jul–Ogo 2018", h:"PwC buat Financial Review 2014–2017", t:"Jumpai defisit; 2017 sepatutnya RUGI RM1.4bn bukan UNTUNG RM3.4bn.", k:""},
  {d:"19 Dis 2018", h:"Surat KAN kepada PM", t:"Mengaku jika ‘Pendapat Berteguran’ diberi, ia akan mencetuskan kebimbangan pendeposit.", k:""}
],

/* ==== Bab 3 — HIBAH & DEPOSIT ==== */
hibahRates: [
  {y:"2014", hb:6.25, hj:2.00},{y:"2015", hb:5.00, hj:3.00},
  {y:"2016", hb:4.25, hj:1.50},{y:"2017", hb:4.50, hj:1.75},
  {y:"2018", hb:1.25, hj:0},{y:"2019", hb:3.05, hj:0},
  {y:"2020", hb:3.10, hj:0},{y:"2021", hb:3.10, hj:0}
],
hibahTotal: [
  {y:"2014", agih:3237, haji:249},{y:"2015", agih:2807, haji:413},
  {y:"2016", agih:2646, haji:225},{y:"2017", agih:3042, haji:282},
  {y:"2018", agih:923,  haji:0},{y:"2019", agih:2141, haji:0},
  {y:"2020", agih:2242, haji:0}
],
deposit: [
  {d:"Awal 2019 (sebelum hebahan hibah 1.25%)", v:73, t:"fakta", p:122},
  {d:"Akhir 2019", v:69, t:"fakta", p:122},
  {d:"Akhir 2020", v:76, t:"fakta", p:122},
  {d:"2022 (semasa laporan)", v:88, t:"fakta", p:122}
],
hibahCapacity: [
  {y:"2013", kap:5082, bayar:2632},{y:"2014", kap:2885, bayar:3237},
  {y:"2015", kap:134,  bayar:3220},{y:"2016", kap:-1260,bayar:2871},
  {y:"2017", kap:-769, bayar:3324}
],
excess600: {nota:"Kiraan tukar dari purata baki bulanan kepada purata tahunan pada 2017 menjadikan hibah dibayar RM600j lebih tinggi. Ditarik balik selepas reaksi negatif pendeposit.", p:115},

/* ==== Bab 4 — PELABURAN BERMASALAH ==== */
investments: [
  {n:"Trurich Resources (JV perladangan Kalimantan)", cat:"Perladangan/JV", jenis:"Ekuiti + pembiayaan",
   amaun:"RM364.31j (pelaburan)", rosot:"RM364.31j — hapus kira penuh", tahun:"2009–2018",
   status:"Insolven · Maybank hutang USD179j · polis dilaporkan · pelupusan diluluskan Dis 2020", p:181,
   corak:"JV luar negara, tiada hasil, hutang bank"},
  {n:"FGV Holdings (saham tersenarai)", cat:"Ekuiti pasaran", jenis:"Saham tersenarai",
   amaun:"RM1,310j (kos 283.7j unit @ RM4.62)", rosot:"Kerugian belum realisasi RM1,059j (harga jatuh ke RM0.885)", tahun:"2012–",
   status:"Dipindah ke UJSB pada kos — LTH selamat ~RM1.1bn; harga pasaran ~RM0.69 (Feb 2022)", p:192,
   corak:"Belian besar masa IPO, harga merudum"},
  {n:"PT TH Indo Plantations (THIP)", cat:"Perladangan/JV", jenis:"Pelaburan luar negara",
   amaun:"Jualan 95% ~USD910m (dikurang USD100m)", rosot:"LTH terpaksa muka USD178.6m pendahuluan pembeli", tahun:"2012",
   status:"Saham dipindah sebelum bayaran penuh · laporan polis 2018 · pertikaian undang-undang", p:177,
   corak:"Pembeli tak bayar, saham dah pindah"},
  {n:"Al-Rawda (4 hotel Tanah Suci)", cat:"Hartanah/JV", jenis:"Pajakan jangka panjang",
   amaun:"Pajakan SR1,426m; sewa tertunggak SR560.7m", rosot:"ECL RM202.8m (2020) + RM184m lagi (2021)", tahun:"2015–",
   status:"Default sejak Mac 2019 · 16 tindakan mahkamah · timbang tara dibuka Al-Rawda", p:184,
   corak:"Penyewa tak bayar, langkah mahkamah berpanjangan"},
  {n:"Alam Maritim / TH Marine", cat:"Maritim", jenis:"Ekuiti + pembiayaan",
   amaun:"RM334j (ekuiti RM198j + biayaan RM136j)", rosot:"Ekuiti RM198j hapus kira; RM80j biayaan dirosot", tahun:"2015–",
   status:"PwC: hanya RM70.4j boleh pulih (Dis 2021)", p:190,
   corak:"Perniagaan kapal, pasaran runtuh"},
  {n:"TH Plantations (THP)", cat:"Perladangan", jenis:"Subsidiari tersenarai",
   amaun:"Biaya belanja modal lewat sukuk RM1.2bn", rosot:"Rosot RM170j di peringkat LTH", tahun:"2012–2019",
   status:"Hanya 58% ladang produktif · audit forensik 2019 · laporan ke PDRM/SPRM/SC", p:188,
   corak:"Beli ladang tanpa kepakaran, hutang tinggi"},
  {n:"Putrajaya Perdana Berhad", cat:"Hartanah", jenis:"30% ekuiti",
   amaun:"RM193.5j (Dis 2014); put option RM210.7j", rosot:"RM145.3j (nilai buku tinggal RM48.2j)", tahun:"2014–",
   status:"IPO & target untung gagal · put option tak dihormati · tindakan undang-undang", p:183,
   corak:"Put option gagal, IPO dibatalkan"},
  {n:"Abraj (JV Amanah Raya)", cat:"Hartanah/JV", jenis:"Ekuiti JV",
   amaun:"RM85j ekuiti LTH", rosot:"Kerugian RM40.25j", tahun:"2009–2020",
   status:"Sewa tak boleh bayar sejak 2015 · 50% saham dijual ke Amanah Raya", p:182,
   corak:"JV hartanah, penyewa utama keluar"},
  {n:"Deru Semangat (DSSB)", cat:"Perladangan/JV", jenis:"Ekuiti 55% + biayaan",
   amaun:"RM526.16j diluluskan (ekuiti RM231j + biayaan RM295.16j)", rosot:"RM257j ditarik → dirosot ke RM32j", tahun:"2014–2021",
   status:"Langkah NOPE → Wilmar tak beli · baki RM258j dilepaskan (waiver)", p:180,
   corak:"Pelanggaran dasar alam sekitar, pembeli tarik diri"},
  {n:"Emrail", cat:"Perkhidmatan", jenis:"15.3% ekuiti",
   amaun:"RM20.17j (Jun 2016); put RM20.3j", rosot:"RM19.3j dirosot (Dis 2020)", tahun:"2016–",
   status:"Hanya RM2j dibayar · writ & timbang tara (AIAC 2022)", p:178,
   corak:"Put option gagal, IPO dibatalkan"},
  {n:"Al-Fareeda Residential Fund", cat:"Hartanah/JV", jenis:"Dana luar negara (13.8%)",
   amaun:"Langgan SR76m ≈ RM63j", rosot:"Hapus kira penuh SR76m", tahun:"2013–",
   status:"Dana dibubarkan · pengurus dana tidak dapat dikesan · aset di bawah Alinma Bank", p:187,
   corak:"Dana luar, pengurus hilang"},
  {n:"Wellspring Worldwide", cat:"Ekuiti", jenis:"10% ekuiti",
   amaun:"RM18.4j (Sep 2014); put RM19.03j", rosot:"RM19.03j hapus kira", tahun:"2014–2019",
   status:"Mahkamah arah bayar RM20.8j, tak diendah · notis bankrap dimenangi Jan 2022", p:179,
   corak:"Put option gagal, IPO dibatalkan"},
  {n:"TH Hotel & Residences (THHR)", cat:"Hartanah", jenis:"Subsidiari",
   amaun:"Nilai pindah RM804.1j ke UJSB", rosot:"Sewa 2020 RM6.2j (−62% dari 2019); rugi bersih RM5.9j", tahun:"2007–",
   status:"Hotel dipindah ke UJSB; pulangan hotel <2%", p:191,
   corak:"Aset hartanah hasil rendah"},
  {n:"TH Properties (bonus tanpa kelulusan)", cat:"Hartanah", jenis:"Subsidiari",
   amaun:"Bonus RM2.2j (2017 & 2018)", rosot:"Bonus dibayar tanpa kelulusan pemegang saham", tahun:"2017–2018",
   status:"Suruhanjaya syor pulihkan bonus · siasatan dalaman 2020", p:189,
   corak:"Tadbir urus bonus cair"}
],
investPatterns:[
  "JV di luar negara tanpa kepakaran pengurusan",
  "Put option / janji beli semula yang tak dihormati",
  "IPO dibatalkan selepas LTH beli saham",
  "Bayaran penuh diterima selepas aset dipindah",
  "Pembiayaan besar kepada projek berisiko tinggi",
  "Status patuh syariah berubah → aset dipindah ke UJSB"
],

/* ==== Bab 5 — UJSB ==== */
ujsbTransfer: {buku:18981, pindah:19900, pasaran:9729, premium:10200},
ujsbBreakdown:[
  {aset:"Hartanah & tanah", buku:1411, pindah:2247, pasaran:1411},
  {aset:"Syarikat perladangan", buku:718, pindah:802, pasaran:718},
  {aset:"Ekuiti (Bursa Malaysia)", buku:16852, pindah:16851, pasaran:7600}
],
ujsbSukuk:{siri1:10000, nominal1:13200, tempoh1:"7 tahun", ytm1:"4.05%",
  siri2:9600, nominal2:14300, tempoh2:"10 tahun", ytm2:"4.10%",
  tunai:300, total:27500, yield:7650, nota:"Jumlah obligasi sukuk RM27.5bn termasuk RM7.65bn hasil tertangguh"},
ujsbTimeline:[
  {d:"30 Nov 2018", h:"Kerajaan setuju prinsip", t:"Jemaah Menteri terima rangka pelan pemulihan & penstrukturan."},
  {d:"7 Dis 2018", h:"Pelan diluluskan", t:"Jemaah Menteri lulus pelan; arah dilaksana sebelum akhir 2018 — LTH ada <2 minggu."},
  {d:"14 Dis 2018", h:"UJSB ditubuhkan", t:"Syarikat pegangan pelaburan & pengurusan aset milik penuh Menteri Kewangan Diperbadankan."},
  {d:"19 Dis 2018", h:"PM lulus pemindahan aset", t:"Aset kurang berdaya saing dipindah ke SPV milik Kerajaan."},
  {d:"27 Dis 2018", h:"Perjanjian pemindahan", t:"106 saham tersenarai, 1 syarikat perladangan, 29 aset hartanah."},
  {d:"5 Apr 2019", h:"Peruntukan Kerajaan RM17.8bn", t:"Untuk menampung penebusan sukuk: RM500j (2020) + RM17.3bn (RMK12 & 13, ≈RM1.73bn/tahun)."},
  {d:"15 Mei 2019", h:"Langganan Sukuk + Hak Penolakan Pertama", t:"LTH langgan penuh sukuk UJSB; ROFR beri LTH hak utamakan beli semula aset yang mahu dilupuskan."},
  {d:"30 Dis 2019", h:"Tunai RM100j", t:"Bayaran tunai pertama kepada LTH."},
  {d:"30 Nov 2020", h:"Tebusan awal RM200j", t:"Daripada geran RM500j Kerajaan (RM300j lagi untuk saham bertukar status)."},
  {d:"30 Dis 2020", h:"Tunai RM200j", t:"Bayaran tunai kedua (jumlah tunai RM300j) kepada LTH."}
],
ujsbFunding: {jumlah:17800, rmk11:500, rmk12:17300, tahunan:1730,
  actual2020:500, shortfall2021:1500, nota2021:"UJSB tak terima RM1.5bn peruntukan 2021 (diberi keutamaan kepada pemulihan Covid-19)."},
ujsbRisk: {accrual:26, agihan:">1/3", defer:840, deferKum:2100, cash:500, nilaiAset:9730, nota:"Hasil pengakruan sukuk ≈26% pendapatan tahunan LTH dan >1/3 jumlah agihan hibah. Pendapatan tertunda RM840j/tahun, kumulatif >RM2.1bn (31 Dis 2021), tidak disokong tunai."},
rofr:[
  {d:"24-Mac-20", co:"WZ Satu", rofr:0.090, mkt:0.064, premium:"40.6%"},
  {d:"25-Mac-20", co:"Eastern & Oriental", rofr:0.365, mkt:0.335, premium:"9.0%"},
  {d:"31-Mac-20", co:"WZ Satu", rofr:0.085, mkt:0.075, premium:"13.3%"},
  {d:"02-Apr-20", co:"WCT Holdings", rofr:0.400, mkt:0.377, premium:"6.1%"},
  {d:"06-Mei-20", co:"KSL Holdings", rofr:0.610, mkt:0.630, premium:"−3.2%"},
  {d:"21-Mei-20", co:"KSL Holdings", rofr:0.580, mkt:0.605, premium:"−4.1%"},
  {d:"29-Mei-20", co:"Hap Seng Plant.", rofr:1.650, mkt:1.570, premium:"5.1%"},
  {d:"09-Dis-20", co:"FGV Holdings", rofr:1.300, mkt:1.270, premium:"2.4%"},
  {d:"14-Mac-22", co:"Integrated Logistics", rofr:0.380, mkt:0.365, premium:"4.1%"}
],
ujsbBluechips:[
  {co:"Axiata", pindah:3.63, kini2022:3.04, turun:"−16.3%"},
  {co:"Maxis", pindah:5.43, kini2022:3.52, turun:"−35.2%"},
  {co:"MISC", pindah:6.15, kini2022:7.30, turun:"+18.7%"},
  {co:"Digi", pindah:4.24, kini2022:3.27, turun:"−22.9%"},
  {co:"TM", pindah:2.33, kini2022:5.20, turun:"+123%" }
],
ujsbProperty:[
  {jenis:"Tanah", luas:"1,353,361 kps", sebelum:627006479, kini:401080000},
  {jenis:"Menara pejabat", luas:"354,021 kps", sebelum:737399698, kini:325000000},
  {jenis:"Lot kedai", luas:"120,062 kps", sebelum:46301759, kini:33330000},
  {jenis:"Hotel", luas:"354,134 kps", sebelum:804058625, kini:424270000},
  {jenis:"Perindustrian", luas:"35,019 kps", sebelum:31914386, kini:19000000},
  {jenis:"Jumlah", luas:"2,216,597 kps", sebelum:2246680947, kini:1202680000}
],

/* ==== Bab 6 — HAJI & HAFIS ==== */
hajiCostPoints:[
  {y:2003, v:15555, t:"fakta", p:203},
  {y:2014, v:16155, t:"fakta", p:204},
  {y:2015, v:17270, t:"fakta", p:204},
  {y:2016, v:18890, t:"fakta", p:204},
  {y:2017, v:19550, t:"fakta", p:204},
  {y:2018, v:22450, t:"fakta", p:204},
  {y:2019, v:22900, t:"fakta", p:204},
  {y:2022, v:25540, t:"fakta", p:205},
  {y:2030, v:35000, t:"unjuran", p:203},
  {y:2050, v:50000, t:"unjuran", p:203}
],
hafisActual:[
  {y:"2014", kos:16155, bayar:9980, hafis:6175, jumlah:106},
  {y:"2015", kos:17270, bayar:9980, hafis:7290, jumlah:135},
  {y:"2016", kos:18890, bayar:9980, hafis:8910, jumlah:160},
  {y:"2017", kos:19550, bayar:9980, hafis:9570, jumlah:298},
  {y:"2018", kos:22450, bayar:9980, hafis:12470, jumlah:314},
  {y:"2019", kos:22900, bayar:9980, hafis:12920, jumlah:299}
],
hafisProj:[
  {y:"2022", kos:25540, bayar:12980, hafis:12560, pct:49.2, jum:376800},
  {y:"2023", kos:26280, bayar:12980, hafis:13300, pct:50.6, jum:399000},
  {y:"2024", kos:28160, bayar:12980, hafis:15180, pct:53.9, jum:455400},
  {y:"2025", kos:29570, bayar:12980, hafis:16590, pct:56.1, jum:497700},
  {y:"2026", kos:31040, bayar:12980, hafis:18060, pct:58.2, jum:541800},
  {y:"2027", kos:32592, bayar:12980, hafis:19612, pct:60.2, jum:588360},
  {y:"2028", kos:34221, bayar:12980, hafis:21241, pct:62.1, jum:637230},
  {y:"2029", kos:35932, bayar:12980, hafis:22952, pct:63.9, jum:688560},
  {y:"2030", kos:37729, bayar:12980, hafis:24749, pct:65.6, jum:742470}
],
hajiWaiting:{lama:130, baru:33, depositKini:1300, depositBaru:12980, nota:"Sekarang, deposit RM1,300 cukup untuk masuk giliran haji pertama. Jika dinaikkan ke kos Muassasah semasa (RM12,980), tempoh menunggu turun dari ~130 tahun kepada 33 tahun (kini giliran melebihi 100 tahun)."},
hajiKonsentrasi:{pendepositKecil:65, saham5:75, nota:"65% pendeposit menyimpan RM2,000 atau kurang; 75% daripada jumlah deposit dipegang oleh hanya 5% pendeposit."},
kuota:{sekarang:30000, 2030:60000, nota:"Saudi Vision 2030 — kuota haji Malaysia dinaikkan dari 30,000 kepada 60,000 menjelang 2030."},

/* ==== Bab 7 — TADBIR URUS ==== */
ministers:[
  {n:"YB Mejar Jeneral (B) Dato' Seri Jamil Khir Baharom", tempoh:"10 Feb 2009 – 9 Mei 2018", p:56},
  {n:"YB Datuk Seri Dr. Mujahid Yusof Rawa", tempoh:"2 Jul 2018 – 9 Mac 2020", p:56},
  {n:"YB Senator Datuk Dr. Zulkifli Mohamad al-Bakri", tempoh:"10 Mac 2020 – 29 Ogo 2021", p:56},
  {n:"YB Senator Datuk Haji Idris Ahmad", tempoh:"30 Ogo 2021 – kini", p:56}
],
chairmen:[
  {n:"Datuk Seri Panglima Abdul Azeez Abdul Rahim", tempoh:"Pengerusi 2013–2018", nota:"Ahli Parlimen Baling, MKT UMNO — ahli politik aktif.", pol:"ya", p:77},
  {n:"Tan Sri Md Nor Md Yusof", tempoh:"Pengerusi (dari 2018)", nota:"Kontrak disambung 2 tahun (Jul 2020), ditamatkan 15 Okt 2021 tanpa sebab — kuasa s6(5) Akta 535.", pol:"tak", p:82}
],
boardPolitik:[
  {n:"Datuk Seri Panglima Abdul Azeez A. Rahim", peranan:"Pengerusi LTH", tempoh:"2013–2018", jwtn:"Politik (MP Baling / MKT UMNO)"},
  {n:"Tan Sri Dato' Paduka Badruddin Amiruldin", peranan:"Ahli Lembaga", tempoh:"2005–2018", jwtn:"Politik (MP Yan/Jerai 2004–08)"},
  {n:"Datuk Rosni Sohar", peranan:"Ahli Lembaga", tempoh:"2014–2018", jwtn:"Politik (ADUN Hulu Bernam, UMNO)"}
],
ceos:[
  {n:"Tan Sri Ismee Ismail", tempoh:"2006–Jun 2016", jj:"Pegang jawatan anak syarikat: THP, Trurich, BIMB, Bank Islam, Takaful, LTH Property, TH Travel (7); kekal di 3 anak syarikat sehingga Mei 2018."},
  {n:"Datuk Seri Johan Abdullah", tempoh:"Jun 2016–Jun 2018", jj:"18 jawatan serentak — Pengerusi TH Heavy Eng, Trurich, Deru Semangat; ALP Malakoff, Glomac, ERL, PT TH Felda Nusantara, dll."},
  {n:"Dato' Sri Zukri Samat", tempoh:"Jul 2018–Ogo 2019", jj:"Pengerusi THP, TH Estates, TH Properties; Yayasan TH. Lepas jawatan untuk elak konflik kepentingan."},
  {n:"Datuk Nik Mohd Hasyudeen Yusoff", tempoh:"Sep 2019–5 Mei 2021", jj:"ALP Bank Islam, BIMB, THP, TH Properties. Ditamatkan awal oleh Menteri tanpa sebab."},
  {n:"Datuk Sri Amrin Awaluddin", tempoh:"6 Mei 2021–", jj:"ALP THP, TH Properties, Bank Islam."}
],
cfo:{n:"Datuk Rozaida Omar", tempoh:"CFO 2004–16 Apr 2021", jj:"Proksi (PIC) LTH di 23 anak syarikat — termasuk 10 LTH Property Holdings/Ltd London, TH Heavy Eng, Putrajaya Perdana, Takaful, Pelikan."},
subsidiaryRoles:[
  {p:"Abdul Azeez (Pengerusi LTH)", s:"TH Real Estate (Pengerusi) · THHR · Putrajaya Perdana · Theta Edge · Yayasan TH · LTH Property 3/4/5", n:"8 jawatan"},
  {p:"Badruddin (Ahli)", s:"TH Travel & Services · THHR · TH Global Services", n:"3 jawatan"},
  {p:"Datuk Zaiton (Ahli 2018–20)", s:"TH Properties (Pengerusi) · THP Enstek · LTH Property 1–5", n:"7 jawatan"},
  {p:"Dato' Noordin Sulaiman (Ahli)", s:"THHR · TH Travel · THV · Premia · Theta Edge (Pengerusi semua) · ERL · Putrajaya Perdana · TH Alam", n:"9 jawatan"},
  {p:"Dato' Rozaida (CFO)", s:"23 anak syarikat sebagai proksi", n:"23 jawatan"}
],
bonusStaff:[
  {y:"2010", j:25},{y:"2011", j:35},{y:"2012", j:38},{y:"2013", j:49},
  {y:"2014", j:74},{y:"2015", j:65},{y:"2016", j:25},{y:"2017", j:56.7},
  {y:"2018", j:10.8},{y:"2019", j:11.6},{y:"2020", j:14.1}
],
bonusProfit:[
  {y:"2013", untung:2634, bonus:49, pct:1.9},{y:"2014", untung:2979, bonus:74, pct:2.5},
  {y:"2015", untung:3537, bonus:61, pct:1.7},{y:"2016", untung:2481, bonus:25, pct:1.0},
  {y:"2017", untung:2798, bonus:57, pct:2.0}
],
bonusThp2017:[
  {n:"Datuk Azizan Abdul Rahman", v:231000},{n:"Dato' Roszali Othman", v:189750},
  {n:"Hj Abd Kadir Sahlan", v:189750},{n:"Nik Badrul Hisham Nik Hassan", v:99000},
  {n:"Anuarifaei Mustapa", v:99000},{n:"Nur Adlan Taib", v:99000},
  {n:"Zaidi Baharudin", v:56100},{n:"Hj Mohamed Rahim Ismail", v:52800},
  {n:"Aida Karim", v:49500},{n:"Marhaizah Mohd Yusuf", v:49500},
  {n:"Dato' Mohd Fazillah Mohd Ali", v:33000}
],
bonusThpa2018:[
  {n:"Dato' Azizan Abdul Rahman", v:167250},{n:"Dato' Roszali Othman", v:176500},
  {n:"Hj Abd Kadir Sahlan", v:176500},{n:"Nik Badrul Hisham Nik Hassan", v:101500},
  {n:"Anuarifaei Mustapa", v:101500},{n:"Nur Adlan Taib", v:101500},
  {n:"Zaidi Baharudin", v:63000},{n:"Aida Karim", v:63000},
  {n:"Marhaizah Mohd Yusuf", v:63000},{n:"Hj Mohamed Rahim Ismail", v:31250}
],
akad:[
  {d:"1979", h:"Akad Mudarabah", t:"LTH bayar zakat bagi pihak pendeposit (keputusan Muzakarah MKI). Pendeposit promosi “tak perlu bayar zakat”."},
  {d:"2016", h:"Tukar ke Wadi'ah Yad Dhamanah", t:"Deposit jadi hutang; pendeposit terdedah kepada tanggungan zakat. Tiada dokumen persetujuan pendeposit."},
  {d:"Dis 2019", h:"Tukar ke Akad Wakalah", t:"LTH jadi ejen; menyelesaikan isu zakat & subsidi. Pendeposit beri kuasa untuk LTH urus dana."}
],
bnmWarnings:[
  {d:"21 Ogo 2014", t:"Teguran kepada Pengerusi LTH", p:100},
  {d:"19 Dis 2014", t:"Teguran pengambilan deposit & kecairan", p:100},
  {d:"23 Dis 2015", t:"Teguran kepada Pengerusi & Menteri", p:100},
  {d:"14 Dis 2016", t:"Surat berhubung rizab & pendeposit besar", p:210},
  {d:"17 Feb 2017", t:"Surat polisi rizab", p:210}
],
police:[
  {d:"30 Nov 2018", no:"Dang Wangi/31347/2018", kes:"Aktiviti & penggunaan dana Yayasan Tabung Haji", st:"Siasatan selesai → dirujuk AGC"},
  {d:"30 Nov 2018", no:"Dang Wangi/31331/2018", kes:"Jualan 95% THIP ke PT Borneo Pacific (syak menipu & menyembunyi)", st:"Siasatan berjalan (rentas sempadan)"},
  {d:"13 Dis 2018", no:"Dang Wangi/32724/2018", kes:"Perjanjian Trurich dengan syarikat Indonesia (manipulasi laporan tanah 40,880 hektar)", st:"Siasatan berjalan"},
  {d:"16 Jan 2019", no:"Dang Wangi/1484/2019", kes:"Pengisytiharan hibah 2017 dikatakan melanggar s22 Akta 535", st:"Siasatan selesai → dirujuk AGC"}
],
disciplinary:[
  {kes:"Kluster 1 — jualan saham THIP", tindakan:"Buang kerja (Apr 2021) → turun pangkat (Rayuan Sep 2021)", tempoh:"—", p:199},
  {kes:"Kluster 2 — sumbangan RM22.12j tanpa kelulusan Menteri", tindakan:"Turun pangkat → amaran berat / amaran + tangguh gaji", tempoh:"≈19 bulan", p:199},
  {kes:"Kluster 3 — pengisytiharan hibah 2017", tindakan:"Buang kerja → turun pangkat", tempoh:"≈15 bulan", p:199},
  {kes:"Kluster 4 — tuntutan perincian palsu", tindakan:"Turun pangkat (kekal)", tempoh:"≈10 bulan", p:200}
],
sprm:[
  "Rasuah dalam belian Ladang Weida (TH Plantations)",
  "Salah guna kuasa sewa Restoran Opah, KL Sentral",
  "Salah guna kuasa sewa Restoran Nasi Dalca, LTH HQ",
  "Salah guna kuasa & rasuah pegawai kanan LTH — kerja baik pulih",
  "Pemalsuan dokumen bekalan anak benih getah, TH-Usia Jatimas (Sandakan)",
  "Salah laku pegawai THP Bina & THP Timur (anak TH Properties)"
],

/* ==== Bab 8 — CADANGAN ==== */
recGroups:[
  {tema:"Pindaan Akta 535", b:"#0d5c46", rec:[
    "Kriteria pelantikan Lembaga dijelaskan — bukan sekadar “Muslim & warganegara”.",
    "Bidang kepakaran anggota Lembaga dinyatakan (perbankan, perniagaan, ekonomi, syariah, undang-undang, perakaunan).",
    "Ahli politik aktif dilarang jadi Pengerusi/anggota Lembaga & anak syarikat.",
    "Pembatalan pelantikan perlu dirujuk badan penasihat bebas; penamatan perlu sebab munasabah.",
    "Panel Pelaburan, Jawatankuasa Penasihat Syariah & Jawatankuasa Urusan Haji dikanunkan dalam Akta.",
    "Pengiraan hibah berpandu penyata kewangan beraudit (piawaian MIA).",
    "Jabatan “Dana Haji” diwujudkan, dikawal selia Suruhanjaya Sekuriti.",
    "LTH dikecualikan daripada Akta 240 (boleh audit oleh firma swasta)."
  ]},
  {tema:"Kuasa Menteri", b:"#2b5d8a", rec:[
    "Kuasa dipecah: Menteri Hal Ehwal Agama (urus haji) + Menteri Kewangan (dana, kewangan, pelaburan).",
    "Pelantikan Pengerusi, anggota & KPE oleh Perdana Menteri atas syor badan penasihat bebas."
  ]},
  {tema:"Kawal selia", b:"#6a4a9a", rec:[
    "BNM tak sesuai kawal selia LTH secara menyeluruh; jika perlu, hadkan kepada rizab & kecairan sahaja.",
    "Pengauditan oleh firma akauntan swasta, bukan JAN."
  ]},
  {tema:"Hibah & perakaunan", b:"#b06a1b", rec:[
    "Kadar hibah berdasarkan penyata kewangan beraudit — RAV / Laporan Proforma tidak boleh jadi asas.",
    "Penyata patuh sepenuhnya piawaian pelaporan (PA 3.1).",
    "Zakat: bawa isu akad simpanan ke Muzakarah MKI untuk keputusan hukum."
  ]},
  {tema:"Pelaburan", b:"#b3382c", rec:[
    "Audit forensik 14 pelaburan bermasalah.",
    "Fokus pengurusan portfolio dana; elak pelaburan strategik berisiko tinggi.",
    "Pihak berkuasa bertindak tegas atas laporan polis.",
    "Pantau rapat kes mahkamah & timbang tara."
  ]},
  {tema:"Deposit & haji", b:"#11938a", rec:[
    "Deposit minima RM1,300 → RM12,980 (kos Muassasah semasa).",
    "Pengeluaran besar perlu notis sebulan.",
    "Subsidi hanya untuk yang memerlukan.",
    "Bawa lebih ramai jemaah & guna kuota tambahan (60,000 menjelang 2030)."
  ]},
  {tema:"Bonus & kakitangan", b:"#6a4a9a", rec:[
    "Amalan bonus terlalu tinggi dihentikan.",
    "Pulihkan bonus TH Properties & pengurusan yang dibayar tanpa peraturan.",
    "Perkemas & percepat proses tatatertib."
  ]},
  {tema:"Penyelamatan & risiko", b:"#b3382c", rec:[
    "Kerajaan pastikan peruntukan RM1.73bn/tahun untuk penebusan sukuk UJSB.",
    "Sukuk baru: boleh diniagakan, jaminan Kerajaan, tawarkan ke institusi lain.",
    "UJSB digalak buat penebusan awal dari hasil pelupusan aset."
  ]}
],

/* ==== Kamus ==== */
glossary:[
  {t:"Hibah", d:"Pemberian pulangan tahunan kepada pendeposit, macam dividen. LTH guna istilah “hibah” (hadiah) kerana tiada bunga. Dibayar atas baki simpanan."},
  {t:"Hibah haji", d:"Pulangan tambahan yang dikaitkan dengan tabungan untuk ibadah haji, diberi selain hibah tahunan."},
  {t:"HAFIS", d:"Hajj Financial Support — subsidi kos haji yang ditanggung LTH kerana bayaran jemaah lebih rendah daripada kos sebenar. Diambil daripada keuntungan pelaburan, bukannya wang Kerajaan."},
  {t:"RAV", d:"Realisable Asset Value — nilai aset yang “boleh direalisasikan” (boleh jadi jika dijual). LTH guna nilai ini untuk menghitung hibah, bukan nilai dalam penyata kewangan beraudit. Ini yang membuat nilai aset kelihatan lebih tinggi."},
  {t:"Rosot nilai", d:"Impairment — pengiktirafan bahawa sesuatu pelaburan telah merosot nilainya, dan kerugian itu dicatat. Jika tidak dirosotkan, keuntungan kelihatan lebih tinggi."},
  {t:"MFRS", d:"Malaysian Financial Reporting Standards — piawaian perakaunan semasa. Sekiranya dipatuhi penuh 2017, LTH rugi RM1.4bn."},
  {t:"FRS", d:"Piawaian perakaunan lama (FRS 139) yang berkuat kuasa sehingga 2017, diganti MFRS 9 pada 2018."},
  {t:"AFS", d:"Available for Sale — klasifikasi pelaburan (ekuiti/hutang) yang nilainya mengikut pasaran. Rosot AFS menjadi isu utama 2017."},
  {t:"Ekuiti", d:"Saham atau kepentingan pemilikan dalam syarikat. Nilainya naik turun ikut pasaran."},
  {t:"Liabiliti", d:"Hutang dan tanggungan. Untuk LTH, sebahagian besar liabiliti ialah wang simpanan pendeposit."},
  {t:"Defisit", d:"Apabila hutang/tanggungan (liabiliti) melebihi aset. LTH tak boleh bayar hibah jika aset < liabiliti mengikut s22 Akta 535."},
  {t:"Sukuk", d:"Sijil pelaburan Islam (macam bon). UJSB terbit sukuk untuk membayar LTH bagi aset yang dipindahkan."},
  {t:"Sukuk kupon sifar", d:"Sukuk yang tak bayar faedah berkala; pulangan diberi sekali gus pada tarikh matang."},
  {t:"ROFR", d:"Right of First Refusal — Hak Penolakan Pertama. LTH berhak tawar beli semula aset sebelum UJSB menjualnya kepada orang lain."},
  {t:"UJSB", d:"Urusharta Jamaah Sdn. Bhd. — syarikat khas (SPV) milik Kerajaan yang mengambil alih aset bermasalah LTH pada 2018."},
  {t:"SPV", d:"Special Purpose Vehicle — syarikat bertujuan khas, ditubuhkan untuk satu tujuan (di sini: urus aset bermasalah)."},
  {t:"JAN", d:"Jabatan Audit Negara — juruaudit penyata kewangan badan berkanun seperti LTH."},
  {t:"KAN", d:"Ketua Audit Negara — ketua JAN."},
  {t:"Emphasis of Matter", d:"Nota dalam laporan audit yang menegur sesuatu isu tetapi sijil audit masih “bersih”. Dalam kes 2017, isu itu sepatutnya dianggap pelanggaran serius."},
  {t:"Sijil Audit Bersih", d:"Pengesahan juruaudit bahawa penyata kewangan memberi gambaran benar dan saksama."},
  {t:"Put option", d:"Hak untuk memaksa pihak lain membeli semula saham yang LTH beli pada harga yang dipersetujui (biasanya bila IPO gagal atau target tak tercapai)."},
  {t:"Bank run", d:"Situasi ramai pendeposit serentak mengeluarkan wang kerana tak percaya institusi boleh bayar."},
  {t:"Pendeposit besar", d:"Segelintir pendeposit dengan simpanan sangat besar. 5% pendeposit memegang 75% deposit LTH."},
  {t:"Konsentrasi risiko", d:"Risiko tertumpu — bila sebilangan kecil pendeposit memegang sebahagian besar wang, pengeluaran mereka boleh tumbangkan institusi."},
  {t:"Akta 535", d:"Akta Tabung Haji 1995 — undang-undang yang menubuhkan dan mengawal LTH."},
  {t:"Akad", d:"Kontrak/urus niaga mengikut syariah antara LTH dan pendeposit. Berubah dari Mudarabah (1979) → Wadi'ah (2016) → Wakalah (2019)."},
  {t:"Mudarabah", d:"Perkongsian untung — pengurus dana urus modal, untung dibahagi ikut nisbah dipersetujui."},
  {t:"Wadi'ah Yad Dhamanah", d:"Simpanan yang menjadi hutang kepada bank/LTH — bank boleh guna wang itu, dan perlu pulangkan penuh bila diminta."},
  {t:"Wakalah", d:"Perwakilan — LTH bertindak sebagai ejen/wakil pendeposit untuk melabur dan mengurus dana."},
  {t:"Zakat", d:"Cukai ibadah tahunan atas harta. LTH dulu membayar zakat bagi pihak pendeposit; bila akad bertukar, isu ini dibangkitkan."},
  {t:"Muassasah", d:"Skim haji yang dikendalikan Kerajaan Malaysia di Tanah Suci untuk jemaah kali pertama."},
  {t:"Muzakarah MKI", d:"Jawatankuasa Muzakarah Majlis Kebangsaan Bagi Hal Ehwal Ugama Islam — badan fatwa kebangsaan."},
  {t:"B40", d:"Kumpulan isi rumah berpendapatan 40% terendah."},
  {t:"Panel Pelaburan", d:"Jawatankuasa yang menasihati LTH tentang pelaburan. Dibubarkan Mei 2018, diganti Exco Perniagaan yang “tak pernah berfungsi”, kemudian diwujudkan semula."},
  {t:"JPS", d:"Jawatankuasa Penasihat Syariah LTH — pastikan urus niaga patuh syariah."},
  {t:"Dana Haji", d:"Cadangan jabatan baharu dalam LTH yang khas mengurus pelaburan, dikawal selia Suruhanjaya Sekuriti."}
],

/* ==== Sumber & senarai fakta untuk carian ==== */
facts:[
  {s:"Suruhanjaya siasat pengurusan LTH 2014–2020; pesuruhjaya dilantik 20 Jan 2022; laporan 30 Ogo 2022.", p:13, t:"fakta"},
  {s:"Skop siasatan: rujuk penemuan PwC, EY, Roland Berger; isu antara 2014–2020.", p:13, t:"fakta"},
  {s:"LTH dahulu PWSBH (1962) → LUTH (1969) → LTH (1995, Akta 535).", p:14, t:"fakta"},
  {s:"Pengerusi & anggota Lembaga hanya perlu “Muslim & warganegara Malaysia” (s6(2) Akta 535).", p:16, t:"fakta"},
  {s:"Ahli politik dilantik jadi Pengerusi/anggota Lembaga 2014–2018.", p:16, t:"fakta"},
  {s:"CEO Nik Hasyudeen ditamatkan 5 Mei 2021 (kontrak asal tamat 31 Ogo 2021).", p:17, t:"fakta"},
  {s:"Pengerusi Tan Sri Md Nor ditamatkan 15 Okt 2021 tanpa sebab (s6(5)).", p:17, t:"fakta"},
  {s:"Panel Pelaburan dibubarkan 2018, diganti jawatankuasa lain yang tak selari Akta 535.", p:17, t:"fakta"},
  {s:"KAN tegur: polisi rosot nilai diubah 2× dalam 2017; RM227.81j rosot tak direkod.", p:18, t:"fakta"},
  {s:"TH Heavy Engineering: RM164.58j rosot nilai tidak direkod (2017).", p:18, t:"fakta"},
  {s:"PwC: 2017 sepatutnya rugi bersih RM1.4bn, bukan untung RM3.4bn.", p:19, t:"terbitan"},
  {s:"Defisit aset vs liabiliti wujud sejak 2014 (analisis PwC).", p:18, t:"terbitan"},
  {s:"LTH gunakan RAV (Realisable Asset Value) untuk sahkan hibah, bukan penyata beraudit.", p:20, t:"fakta"},
  {s:"Penyata kewangan 2014–2017 diberi Sijil Audit Bersih walaupun ada isu besar.", p:21, t:"fakta"},
  {s:"KAN surat ke PM 19 Dis 2018: jika ‘Pendapat Berteguran’ diberi, ia pengaruhi persepsi pendeposit.", p:21, t:"fakta"},
  {s:"Hibah 4.50% + 1.75% 2017 menelan RM2.75bn; sepatutnya tak boleh isytihar tanpa Sijil Bersih.", p:22, t:"fakta"},
  {s:"Deposit mengecut RM73bn → RM69bn selepas hibah 1.25% (2019).", p:20, t:"fakta"},
  {s:"HAFIS: RM106j (2014) → RM300j (2019); unjuran RM742.47j/tahun (2030).", p:23, t:"fakta"},
  {s:"Kos haji Muassasah: RM15,553 (2013) → RM25,540 (2022).", p:23, t:"fakta"},
  {s:"Bayaran haji RM9,980 beku 13 tahun (2009–2021); 2022 jadi RM10,980 (B40) / RM12,980.", p:23, t:"fakta"},
  {s:"LTH perlukan dana minima RM60bn untuk tampung HAFIS pada paras semasa.", p:24, t:"fakta"},
  {s:"UJSB ditubuh 14 Dis 2018; aset dipindah 27 Dis 2018 (106 saham, 1 ladang, 29 hartanah).", p:24, t:"fakta"},
  {s:"Aset dipindah pada RM19.9bn vs pasaran RM9.7bn — premium RM10.2bn.", p:25, t:"fakta"},
  {s:"Sukuk Siri 1: RM10bn (nominal RM13.2bn), 7 tahun, 4.05% YTM.", p:25, t:"fakta"},
  {s:"Sukuk Siri 2: RM9.6bn (nominal RM14.3bn), 10 tahun, 4.10% YTM.", p:25, t:"fakta"},
  {s:"Kerajaan lulus RM17.8bn untuk penebusan sukuk (RM500j 2020 + RM17.3bn RMK12/13).", p:26, t:"fakta"},
  {s:"Pengakruan Sukuk UJSB ≈26% pendapatan tahunan LTH; >1/3 jumlah agihan hibah.", p:26, t:"fakta"},
  {s:"Jaminan Kerajaan s24 Akta 535 kepada pendeposit kini RM88bn.", p:32, t:"fakta"},
  {s:"Deposit minima RM1,300 → RM12,980 mengurangkan giliran haji 130 → 33 tahun.", p:33, t:"terbitan"},
  {s:"Siling hutang negara naik 55% → 65% KDNK (memungkinkan jaminan Kerajaan).", p:26, t:"fakta"},
  {s:"RAV 2017: aset RM70,317j + top-up RM4,466j = RM74,783j; liabiliti RM74,410j; bersih RM373j.", p:116, t:"terbitan"},
  {s:"Polisi rosot: 70%→RM1,313j; 85%→RM171j; 90%→RM1j (2017).", p:110, t:"terbitan"},
  {s:"RM1,310j rosot aset kewangan tambahan sepatutnya dicatat 2017 (FRS 139).", p:116, t:"fakta"},
  {s:"RM1,537j jumlah rosot tak direkod — jauh lebih besar daripada nilai bersih RM373j.", p:117, t:"fakta"},
  {s:"Kiraan hibah tukar ke purata tahunan 2017 tambah RM600j (ditarik balik).", p:115, t:"fakta"},
  {s:"Roland Berger anggar RM2.6bn kerugian bakal mengancam pendapatan bila MFRS 9 berkuat kuasa 2018.", p:117, t:"fakta"},
  {s:"2015: RM1,411j aset hartanah dipindah RM2,247j; JAN: 11 hartanah bawah penilaian JPPHM; lebihan kolektif RM543.65j.", p:121, t:"fakta"},
  {s:"UJSB kekal tanggung rosot hartanah: RM2.25bn → RM1.2bn (Dis 2021).", p:122, t:"fakta"},
  {s:"UJSB reinvet 329 kaunter; kerugian RM9.9bn FY2019 (beza nilai pindah vs pasaran).", p:129, t:"fakta"},
  {s:"Hanya RM500j tunai diterima LTH setakat kini vs nilai aset RM9.73bn.", p:128, t:"fakta"},
  {s:"UJSB tak terima RM1.5bn peruntukan 2021 (keutamaan Covid-19).", p:128, t:"fakta"},
  {s:"Deferred income sukuk RM840j/tahun; kumulatif >RM2.1bn (Dis 2021), tak disokong tunai.", p:132, t:"fakta"},
  {s:"Tidak ada 90%+ atau “pengakruan” — sukuk UJSB tidak terjamin Kerajaan ketika terbit (hanya Surat Sokongan Kewangan 27 Mei 2019).", p:126, t:"fakta"},
  {s:"Jumlah agihan hibah 2014–2020 (RMj): 3,237 · 3,220 · 2,871 · 3,324 · 923 · 2,141 · 2,242.", p:130, t:"fakta"},
  {s:"Bonus kakitangan 2010–2017 antara 2–13 bulan; peruntukan puncak RM74j (2014).", p:137, t:"fakta"},
  {s:"TH Properties bonus khas 2017: RM1,148,400 (11 penerima); THP Australia 2018: RM1,045,000 (10 penerima).", p:142, t:"fakta"},
  {s:"Trurich: pelaburan RM364.31j dihapus kira penuh; hutang Maybank USD179j.", p:181, t:"fakta"},
  {s:"FGV: kerugian belum realisasi RM1,059j; UJSB ambil alih 283.7j unit @ RM4.62.", p:192, t:"fakta"},
  {s:"THIP: harga jualan dikurang USD100j; LTH muka pendahuluan USD178.6j.", p:177, t:"fakta"},
  {s:"Al-Rawda: sewa tertunggak SR560.7j; ECL RM202.8j + RM184j.", p:184, t:"fakta"},
  {s:"4 laporan polis dibuat (2018–2019); 6 aduan SPRM; semua masih dalam siasatan.", p:193, t:"fakta"},
  {s:"Proses tatatertib ambil 10–19 bulan; semua 5 pegawai masih bekerja.", p:199, t:"fakta"},
  {s:"Kos haji 2003 RM15,555 → 2030 RM35,000 → 2050 RM50,000 (unjuran).", p:203, t:"fakta"},
  {s:"HAFIS 2022 ≈ 57% kos; unjuran 2030 = 65.6% kos.", p:205, t:"unjuran"},
  {s:"65% pendeposit simpan ≤RM2,000; 75% deposit dipegang 5% pendeposit.", p:168, t:"fakta"},
  {s:"1.46 juta jemaah diurus LTH 1963–2021; HAFIS sejak 2001 berjumlah RM2.02bn.", p:229, t:"fakta"},
  {s:"Deposit RM88bn → dijangka RM100bn dalam 2 tahun.", p:210, t:"unjuran"},
  {s:"Kuota haji Malaysia 30,000 → 60,000 menjelang 2030 (Saudi Vision 2030).", p:208, t:"fakta"},
  {s:"Menteri bertanggungjawab pegang kuasa luas: urusan haji, dana & pelaburan di bawah satu Kementerian (s6 & s7 Akta 535).", p:15, t:"fakta"},
  {s:"Ringkasan cadangan Suruhanjaya: pinda Akta 535, pecah kuasa Menteri, wujud Dana Haji, hadkan BNM kepada rizab & kecairan.", p:28, t:"fakta"},
  {s:"Akad simpanan 2016 ditukar ke Wadi'ah Yad Dhamanah — deposit jadi hutang; pendeposit terdedah kepada tanggungan zakat (2.5%).", p:108, t:"fakta"},
  {s:"Dis 2019 akad tukar ke Wakalah — menyelesaikan isu zakat & subsidi; Suruhanjaya cadang isu ini dirujuk ke Muzakarah MKI.", p:109, t:"fakta"},
  {s:"PwC 3.9.2: dari 2014 hibah melebihi kapasiti LTH; pada 2016 & 2017 kapasiti negatif — LTH bayar hibah walaupun defisit.", p:112, t:"fakta"},
  {s:"Jadual 3.9.22 kadar hibah tahunan: 6.25% (2014), 5.00% (2015), 4.25% (2016), 4.50% (2017), 1.25% (2018), 3.05% (2019), 3.10% (2020–21).", p:120, t:"fakta"},
  {s:"Terma sukuk UJSB: Siri 1 RM10b (nominal RM13.2b, 7 tahun, 4.05%) & Siri 2 RM9.6b (nominal RM14.3b, 10 tahun, 4.10%).", p:125, t:"fakta"},
  {s:"Jemaah Menteri 5 Apr 2019 lulus RM17.8b: RM500j (2020) + RM17.3b untuk RMK12 & RMK13 (≈RM1.73b/tahun) bagi penebusan sukuk.", p:127, t:"fakta"},
  {s:"Jadual ROFR: 8 daripada 9 tawaran pada premium berbanding pasaran; KSL Holdings satu-satunya ditawarkan di bawah pasaran.", p:131, t:"fakta"},
  {s:"Pengakruan sukuk UJSB ≈26% pendapatan tahunan LTH dan >1/3 jumlah agihan hibah — hasil yang belum diterima secara tunai.", p:133, t:"fakta"},
  {s:"Bonus 2010–2017 antara 2–13 bulan; sebagai % keuntungan bersih antara 1.0%–2.5% (2013–2017).", p:139, t:"terbitan"},
  {s:"Bonus besar didasarkan keuntungan RAV (nilai “dilaras”); bila RAV dibuang, asas pemberian bonus runtuh.", p:140, t:"terbitan"},
  {s:"Bonus khas THP Australia 2018 RM1,045,000 kepada 10 penerima — dimaklumkan lewat 7 bulan, langgar s230(3) Akta Syarikat 2016.", p:143, t:"fakta"},
  {s:"Suruhanjaya syorkan pulihkan bonus yang dibayar tanpa mematuhi peraturan s230 Akta 777 (TH Properties) & Akta Syarikat 2016 (THP Australia).", p:145, t:"fakta"},
  {s:"PwC — jadual lebihan/kekurangan aset vs liabiliti 2013–2017: defisit mula 2014; 2017 pra-agihan −769, pasca-agihan −4,093.", p:147, t:"terbitan"},
  {s:"PwC Financial Review: jika MFRS dipatuhi penuh, 2017 kerugian terlaras RM1,433j berbanding untung dilapor RM3,412j.", p:149, t:"terbitan"},
  {s:"Nilai pemindahan UJSB: buku RM18,981j → pindah RM19,900j → pasaran RM9,729j (ekuiti tersenarai RM16,852j→RM16,851j→RM7,600j).", p:159, t:"fakta"}
]
};
