(function () {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const nf0 = new Intl.NumberFormat("ms-MY", { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat("ms-MY", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const nf2 = new Intl.NumberFormat("ms-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const nf3 = new Intl.NumberFormat("ms-MY", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  const sourceUrl = "https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md";

  const sources = {
    5: { title: "Laporan dipersembahkan", note: "Laporan Suruhanjaya Siasatan Diraja bagi menyiasat isu pengurusan dan operasi LTH dari tahun 2014 hingga 2020 dipersembahkan pada 30 Ogos 2022.", section: "Pengenalan", label: "PDF 5" },
    13: { title: "Objektif dan skop siasatan", note: "Skop siasatan meliputi isu 2014 hingga 2020, dokumen dan bukti berkaitan, kemungkinan penyembunyian maklumat serta syor tindakan terhadap pelanggaran undang-undang.", section: "Pengenalan", label: "PDF 13" },
    18: { title: "Krisis kewangan 2017", note: "Ringkasan eksekutif menyatakan KAN menegur perubahan polisi rosot nilai yang tidak konsisten dan RM227.81 juta pelaburan yang tidak direkodkan sebagai rosot nilai.", section: "Krisis kewangan", label: "PDF 18" },
    24: { title: "UJSB ditubuhkan", note: "UJSB ditubuhkan pada 14 Disember 2018 untuk melaksanakan pelan pemulihan, memaksimumkan nilai pemulihan aset dan meneruskan operasi aset yang diambil alih.", section: "UJSB", label: "PDF 24" },
    17: { title: "Jawatankuasa yang tidak dikanunkan", note: "Suruhanjaya menyatakan Panel Pelaburan, Jawatankuasa Penasihat Syariah dan Jawatankuasa Pengurusan Haji tidak dikanunkan secara khusus dalam Akta 535.", section: "Tadbir urus", label: "PDF 17" },
    25: { title: "Pemindahan aset kepada UJSB", note: "Laporan menerangkan 106 saham tersenarai, sebuah syarikat perladangan dan 29 aset hartanah dipindahkan dalam pelan pemulihan.", section: "UJSB", label: "PDF 25" },
    26: { title: "Sukuk dan komitmen Kerajaan", note: "Jemaah Menteri meluluskan RM17.8 bilion untuk membiayai shortfall penebusan Sukuk UJSB: RM500 juta pada 2020 dan RM17.3 bilion di bawah RMK 12 dan RMK 13.", section: "UJSB", label: "PDF 26" },
    112: { title: "Jadual jurang PwC, 2014–2017", note: "Jadual PwC menunjukkan aset, liabiliti, lebihan/kekurangan sebelum agihan, nilai hibah dan baki selepas agihan bagi empat tahun.", section: "Hibah", label: "PDF 112" },
    116: { title: "RAV 2017", note: "Untuk 2017, aset RM70.317b ditambah RAV RM4.466b menjadi RM74.783b. Selepas liabiliti RM74.410b, nilai bersih aset terlaras yang dilaporkan ialah RM373m.", section: "Hibah", label: "PDF 116" },
    125: { title: "Penyata kewangan yang diaudit JAN", note: "Laporan menyatakan penyata kewangan 2014 hingga 2017 menerima Sijil Audit Bersih, walaupun 2017 disertai ‘Emphasis of Matter’.", section: "Pelaporan kewangan", label: "PDF 125" },
    138: { title: "Senarai pelaburan bermasalah", note: "Bab 3.14 mengumpulkan transaksi yang dicadangkan untuk semakan forensik, termasuk saham, perladangan, hotel, maritim dan hartanah.", section: "Pelaburan", label: "PDF 138" },
    148: { title: "Polisi rosot nilai 2017", note: "Jadual PwC menunjukkan ambang lebih 70%, lebih 85% dan lebih 90% menghasilkan impak rosot nilai RM1.313 bilion, RM171 juta dan RM1 juta.", section: "Pelan pemulihan", label: "PDF 148" },
    149: { title: "Pelarasan untung 2017 oleh PwC", note: "PwC meletakkan untung tahun 2017 RM3.412 bilion, kemudian menolak RM4.258 bilion rosot nilai ekuiti, RM7 juta instrumen hutang dan RM580 juta pelarasan lain, menghasilkan kerugian terlaras RM1.433 bilion.", section: "Pelan pemulihan", label: "PDF 149" },
    122: { title: "Deposit selepas hibah 1.25%", note: "Deposit disebut turun daripada kira-kira RM73 bilion sebelum pengumuman kepada RM69 bilion pada akhir 2019; pada akhir 2020 jumlah dana yang didepositkan disebut mencapai RM88 bilion.", section: "Hibah", label: "PDF 122" },
    130: { title: "Bayaran hibah 2014–2020", note: "Jadual menunjukkan kadar, jumlah hibah tahunan, hibah haji dan jumlah agihan bagi 2014 hingga 2020.", section: "Pelaporan kewangan", label: "PDF 130" },
    193: { title: "FGV Berhad", note: "Laporan menyebut kerugian tidak nyata RM1,058,937,380, sebelum 283.7 juta unit saham diambil alih UJSB pada nilai kos RM1.31 bilion.", section: "Pelaburan", label: "PDF 193" },
    204: { title: "Kos haji dan HAFIS", note: "Jadual membandingkan kos haji, bayaran jemaah, HAFIS seorang dan jumlah HAFIS bagi 2014 hingga 2019.", section: "HAFIS", label: "PDF 204" },
    205: { title: "Unjuran HAFIS 2022–2030", note: "Jadual unjuran menunjukkan HAFIS keseluruhan meningkat daripada RM376.8 juta pada 2022 kepada RM742.47 juta pada 2030 jika bayaran RM12,980 kekal.", section: "HAFIS", label: "PDF 205" },
    206: { title: "HAFIS dan ruang hibah", note: "Suruhanjaya menyatakan HAFIS diambil daripada keuntungan pelaburan dan jumlah sekitar RM400 juta setahun bersamaan kira-kira pengurangan 0.4% pada kadar hibah.", section: "HAFIS", label: "PDF 206" },
    208: { title: "Cadangan minimum pendaftaran haji", note: "Suruhanjaya mengunjurkan tempoh menunggu boleh berkurang daripada 135 tahun kepada 33 tahun jika simpanan minimum untuk pendaftaran dinaikkan kepada RM12,980.", section: "HAFIS", label: "PDF 208" }
  };

  const state = {
    story: 0,
    balanceYear: 2017,
    payout: 100,
    deal: "asset",
    investmentSearch: "",
    sector: "Semua",
    status: "Semua",
    openCase: null,
    hajiMode: "actual",
    hajiYear: 2019,
    entity: "LTH",
    timeline: "Semua"
  };

  const story = [
    { no: "01", title: "Hibah jadi janji pulangan", short: "Hibah 2014–17 berjumlah RM12.65b.", metric: "RM12.65b", text: "Suruhanjaya mendapati kadar tinggi menyusutkan rizab dan menarik pendeposit yang mencari pulangan tinggi. Tekanan ini mendorong LTH mengambil risiko pelaburan yang lebih besar.", source: 112 },
    { no: "02", title: "Nilai aset jadi penentu", short: "RAV menambah RM4.466b pada 2017.", metric: "+RM4.466b", text: "Untuk pengiraan RAV, pengurusan menambah anggaran aset kepada angka kewangan. Laporan menyatakan nilai itu bukan semata-mata harga pasaran atau penilaian profesional bebas.", source: 116 },
    { no: "03", title: "2017 mendedahkan jurang", short: "Untung rasmi jadi rugi terlaras.", metric: "+3.412 → −1.433", text: "Dalam analisis PwC, pelarasan rosot nilai dan nilai saksama menukar untung rasmi RM3.412b kepada kerugian terlaras RM1.433b. Krisis itu sudah berada dalam angka 2017 sebelum pemindahan aset.", source: 149 },
    { no: "04", title: "Jurang dipindah ke hadapan", short: "Aset berpindah, Sukuk matang 2026/2029.", metric: "RM19.9b", text: "UJSB menukar aset kurang berdaya saing kepada Sukuk dan tunai. Mekanisme ini menutup jurang segera, tetapi menumpukan komitmen pembayaran pada LTH dan Kerajaan.", source: 25 }
  ];

  const balances = [
    { year: 2014, assets: 54751, liabilities: 51866, before: 2885, distribution: 3237, after: -352 },
    { year: 2015, assets: 60196, liabilities: 60062, before: 134, distribution: 3220, after: -3086 },
    { year: 2016, assets: 64321, liabilities: 65581, before: -1260, distribution: 2871, after: -4131 },
    { year: 2017, assets: 70317, liabilities: 71086, before: -769, distribution: 3324, after: -4093 }
  ];

  const actualHaji = [
    { year: 2014, cost: 16155, payment: 9980, hafisPer: 6175, total: 106 },
    { year: 2015, cost: 17270, payment: 9980, hafisPer: 7290, total: 135 },
    { year: 2016, cost: 18890, payment: 9980, hafisPer: 8910, total: 160 },
    { year: 2017, cost: 19550, payment: 9980, hafisPer: 9570, total: 298 },
    { year: 2018, cost: 22450, payment: 9980, hafisPer: 12470, total: 314 },
    { year: 2019, cost: 22900, payment: 9980, hafisPer: 12920, total: 299 }
  ];
  const projectedHaji = [
    { year: 2022, cost: 25540, payment: 12980, hafisPer: 12560, total: 376.8 },
    { year: 2023, cost: 26280, payment: 12980, hafisPer: 13300, total: 399 },
    { year: 2024, cost: 28160, payment: 12980, hafisPer: 15180, total: 455.4 },
    { year: 2025, cost: 29570, payment: 12980, hafisPer: 16590, total: 497.7 },
    { year: 2026, cost: 31040, payment: 12980, hafisPer: 18060, total: 541.8 },
    { year: 2027, cost: 32592, payment: 12980, hafisPer: 19612, total: 588.36 },
    { year: 2028, cost: 34221, payment: 12980, hafisPer: 21241, total: 637.23 },
    { year: 2029, cost: 35932, payment: 12980, hafisPer: 22952, total: 688.56 },
    { year: 2030, cost: 37729, payment: 12980, hafisPer: 24749, total: 742.47 }
  ];

  const investments = [
    { id: "fgv", name: "FGV Berhad", sector: "Ekuiti", status: "Nilai susut", amount: "RM1.059b tidak nyata", barValue: 1058.937, barType: "loss", meta: "283.7m unit diambil alih UJSB", text: "Kos saham RM1.310b; harga pasaran sekitar RM0.69 seunit pada Februari 2022. UJSB mengambil alih pada kos, jadi kerugian ini tidak direalisasi sepenuhnya di LTH.", source: 193 },
    { id: "thmarine", name: "Kumpulan TH Marine", sector: "Maritim", status: "Nilai susut", amount: "RM278m dirosot nilai", barValue: 278, barType: "loss", meta: "RM70.4m dijangka pulih", text: "Ekuiti RM198m dirosot nilai sepenuhnya dan RM80m daripada pembiayaan RM136m dirosot nilai sehingga Disember 2021.", source: 191 },
    { id: "trurich", name: "Trurich Resources", sector: "Perladangan", status: "Nilai susut", amount: "RM364.31m dihapus kira", barValue: 364.31, barType: "loss", meta: "USD179m pinjaman tertunggak", text: "Pelaburan LTH dihapus kira sepenuhnya. Syarikat usaha sama menjadi insolven dan masih mempunyai pinjaman Maybank dalam USD.", source: 182 },
    { id: "dssb", name: "Deru Semangat", sector: "Perladangan", status: "Nilai susut", amount: "RM225m susut nilai*", barValue: 225, barType: "loss", meta: "RM257m dikeluarkan → RM32m", text: "*Data terbitan: RM257m yang dikeluarkan dirosot nilai kepada RM32m. Baki komitmen RM258m pula diketepikan oleh rakan usaha sama.", source: 181 },
    { id: "alrawda", name: "Al-Rawda (4 hotel)", sector: "Hartanah / hotel", status: "Undang-undang", amount: "RM202.8m kerugian kredit", barValue: 202.8, barType: "loss", meta: "SR560.7m sewa tertunggak", text: "Sewa tertunggak setakat 31 Disember 2021; proses penguatkuasaan di Arab Saudi dan timbang tara berjalan serentak.", source: 187 },
    { id: "thp", name: "TH Plantations", sector: "Perladangan", status: "Tadbir urus", amount: "RM170m rosot nilai", barValue: 170, barType: "loss", meta: "58% ladang produktif", text: "PwC mengenal pasti isu fidusiari dalam beberapa pengambilalihan. Lembaga THP membuat laporan kepada PDRM, SPRM dan Suruhanjaya Sekuriti.", source: 189 },
    { id: "thhr", name: "TH Hotel & Residences", sector: "Hartanah / hotel", status: "Aset dipindah", amount: "RM804.1m nilai pindahan", barValue: 804.1, barType: "exposure", meta: "Hartanah pulangan <2%", text: "Hotel dan kompleks haji di beberapa lokasi dipindahkan kepada UJSB pada premium kira-kira 55% berbanding nilai buku.", source: 191 },
    { id: "ppb", name: "Putrajaya Perdana", sector: "Ekuiti", status: "Nilai susut", amount: "RM145.3m peruntukan", barValue: 145.3, barType: "loss", meta: "Nilai buku bersih RM48.2m", text: "Pelaburan RM193.5m gagal disenaraikan dan put option RM210.7m masih belum dibayar oleh pihak lawan.", source: 184 },
    { id: "thip", name: "PT TH Indo Plantations", sector: "Perladangan", status: "Undang-undang", amount: "USD910m harga asal", barValue: null, barType: "none", meta: "USD178.6m pendahuluan", text: "95% pegangan dijual sebelum bayaran penuh. Harga asal dikurangkan USD100m dan laporan polis merentas sempadan masih disiasat.", source: 178 },
    { id: "abraj", name: "Abraj", sector: "Hartanah / hotel", status: "Nilai susut", amount: "RM40.25m rosot nilai", barValue: 40.25, barType: "loss", meta: "50% pegangan dijual 2020", text: "Usaha sama hartanah tidak menjana pendapatan cukup untuk membayar pinjaman. LTH menjual 50% pegangan kepada Amanah Raya.", source: 183 },
    { id: "wellspring", name: "Wellspring Worldwide", sector: "Ekuiti", status: "Undang-undang", amount: "RM19.03m peruntukan", barValue: 19.03, barType: "loss", meta: "Put option tidak dibayar", text: "LTH menuntut semula RM19.03m selepas syarikat gagal disenaraikan. Mahkamah mengarahkan bayaran RM20.8m tetapi masih tiada bayaran.", source: 180 },
    { id: "emrail", name: "Emrail", sector: "Ekuiti", status: "Undang-undang", amount: "RM19.3m peruntukan", barValue: 19.3, barType: "loss", meta: "RM20.17m beli · RM2m diterima", text: "Put option dilaksanakan selepas sasaran penyenaraian dan keuntungan tidak tercapai. Kes beralih kepada timbang tara.", source: 179 },
    { id: "alfareeda", name: "Al-Fareeda Residential Fund", sector: "Hartanah / hotel", status: "Nilai susut", amount: "SR76m dihapus kira", barValue: null, barType: "none", meta: "13.8% daripada dana", text: "Pelaburan perumahan Arab Saudi dihapus kira selepas tiada perkembangan sejak 2017 dan pengurus dana tidak dapat dikesan.", source: 188 },
    { id: "thproperties", name: "TH Properties / THP Australia", sector: "Hartanah / hotel", status: "Tadbir urus", amount: "RM2.2m bonus khas", barValue: 2.2, barType: "exposure", meta: "2017 & 2018", text: "Bonus istimewa dibayar tanpa kelulusan LTH sebagai pemegang utama. Laporan audit dalaman menyentuh bayaran kepada pengarah dan kakitangan.", source: 190 }
  ];

  const entities = {
    LTH: { title: "Lembaga Tabung Haji", type: "core", role: "Pemegang deposit, pengurus pelaburan dan pengelola urusan haji.", text: "Institusi pusat dalam laporan: dana pendeposit dilabur, pulangan digunakan untuk kos operasi, zakat, hibah dan HAFIS.", links: [["Input", "Pengurusan, Panel Pelaburan, anak syarikat"], ["Keputusan", "Hibah, pelaburan, bayaran haji"], ["Titik isu", "Aset–liabiliti, proses pelaburan, konflik peranan"]], source: 112 },
    Menteri: { title: "Menteri Hal Ehwal Agama", type: "state", role: "Pemegang kuasa statutori di bawah Akta 535.", text: "Laporan menyatakan tiga Menteri yang menyelia LTH dalam tempoh siasatan bergantung sepenuhnya kepada memo Lembaga dan pengurusan untuk keputusan dana dan pelaburan.", links: [["Kuasa", "Pelantikan Lembaga dan keputusan tertentu"], ["Input", "Memo LTH; tiada input pihak ketiga"], ["Syor", "Kawal selia dikongsi dengan Menteri Kewangan"]], source: 176 },
    Pengurusan: { title: "Pengurusan LTH", type: "core", role: "Menyedia cadangan, penilaian dan pelaksanaan operasi.", text: "Suruhanjaya mendapati proses pelaburan tidak jelas dan koordinasi antara CIO, Ketua Kewangan Korporat, Ketua Hartanah dan Perbendaharaan tidak mencukupi.", links: [["Input", "Memo dan kertas cadangan"], ["Keputusan", "RAV, polisi rosot nilai, pelaburan"], ["Titik isu", "Terlalu banyak lapisan; koordinasi lemah"]], source: 176 },
    "Panel Pelaburan": { title: "Panel Pelaburan", type: "core", role: "Sepatutnya menyemak dan menasihati keputusan pelaburan.", text: "Panel diharap bebas dan berkepakaran, tetapi keterangan saksi menyebut pendekatan yang longgar dan semakan cadangan yang tidak mencukupi.", links: [["Perubahan", "Dibubarkan pada 2018"], ["Kesan", "Jawatankuasa pengganti tidak selari dengan Akta 535"], ["Syor", "Dikanunkan dan diperkasa"]], source: 17 },
    JAN: { title: "Jabatan Audit Negara", type: "external", role: "Mengaudit penyata kewangan LTH.", text: "Penyata 2014–2017 menerima Sijil Audit Bersih. Untuk 2017, terdapat Emphasis of Matter berkaitan perubahan polisi rosot nilai dan RM227.81m yang tidak direkodkan.", links: [["Audit", "Sijil bersih 2014–2017"], ["2017", "Polisi rosot nilai berubah 2 kali"], ["Titik isu", "Suruhanjaya berpandangan teguran lebih wajar"]], source: 125 },
    PwC: { title: "PricewaterhouseCoopers", type: "external", role: "Financial Review dan analisis pelarasan.", text: "PwC mengenal pasti jurang aset–liabiliti sejak 2014 dan mengira kesan rosot nilai serta pelarasan yang menukar untung rasmi 2017 kepada kerugian terlaras.", links: [["Skop", "Financial Review 2014–2017"], ["Dapatan", "Defisit dan rosot nilai tidak direkod"], ["Bukti", "Jadual jurang dan adjusted loss"]], source: 149 },
    EY: { title: "Ernst & Young", type: "external", role: "Konsultan dan penyemak rangka kerja RAV.", text: "Laporan RCI membezakan semakan Pro Forma Financial Information EY daripada audit penyata kewangan JAN. Suruhanjaya menyatakan RAV tidak patut menjadi asas bayaran hibah.", links: [["Produk", "Laporan RAV / pro forma"], ["Had", "Bukan audit penyata kewangan JAN"], ["Syor", "Hibah berdasarkan penyata diaudit"]], source: 130 },
    BNM: { title: "Bank Negara Malaysia", type: "external", role: "Pengawal selia yang membangkitkan deposit, kecairan dan rizab.", text: "Surat BNM pada 2014–2015 membangkitkan pengambilan deposit, pengurusan kecairan dan keperluan merumus dasar rizab.", links: [["Kebimbangan", "Hibah tinggi dan risiko tumpuan"], ["Konteks", "Deposit besar boleh keluar serentak"], ["Syor", "Model perniagaan dan kawal selia diperbaiki"]], source: 121 },
    UJSB: { title: "Urusharta Jamaah Sdn. Bhd.", type: "state", role: "SPV milik penuh Menteri Kewangan Diperbadankan.", text: "UJSB ditubuhkan pada 14 Disember 2018 untuk melaksanakan pelan pemulihan, memaksimumkan nilai pemulihan aset dan meneruskan operasi aset yang diambil alih.", links: [["Terima", "106 saham, 1 perladangan, 29 hartanah"], ["Terbit", "Sukuk Siri 1 dan Siri 2"], ["Risiko", "Penebusan dan kebergantungan LTH"]], source: 24 },
    "Anak syarikat": { title: "Anak-anak syarikat", type: "core", role: "Rangkaian pelaburan: perladangan, hartanah, hotel dan maritim.", text: "Penglibatan anggota Lembaga dan pengurusan tertinggi dalam banyak anak syarikat menimbulkan risiko fokus dan konflik kepentingan menurut dapatan RCI.", links: [["Contoh", "THP, TH Properties, TH Marine, THHR"], ["Risiko", "Kerugian dan tanggungjawab bertindih"], ["Jejak", "Pelaburan bermasalah dan bonus"]], source: 17 }
  };

  const networkNodes = [
    ["LTH", "LTH", 50, 49], ["Menteri", "Menteri\nAgama", 19, 21], ["Pengurusan", "Pengurusan", 20, 76], ["Panel Pelaburan", "Panel\nPelaburan", 50, 78], ["JAN", "JAN", 82, 20], ["PwC", "PwC", 81, 52], ["EY", "EY", 81, 78], ["BNM", "BNM", 50, 14], ["UJSB", "UJSB", 19, 50], ["Anak syarikat", "Anak\nsyarikat", 50, 24]
  ];
  const networkEdges = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[1,7],[1,8],[2,9],[3,9],[5,0],[6,0],[8,0],[9,0]];

  const timeline = [
    { date: "2014", tag: "Kewangan", title: "Jurang mula kelihatan dalam analisis PwC", text: "Aset RM54.751b berbanding liabiliti RM51.866b; selepas hibah RM3.237b, baki berubah menjadi −RM352m.", source: 112 },
    { date: "2015", tag: "Kewangan", title: "Agihan tinggi terus menekan lebihan", text: "Lebihan sebelum agihan hanya RM134m, tetapi hibah yang diagih berjumlah RM3.220b.", source: 112 },
    { date: "2017", tag: "Kewangan", title: "Polisi rosot nilai diubah dua kali", text: "Ambang bergerak daripada lebih 70% kepada lebih 85% kemudian lebih 90%; jadual PwC merekod impak RM1.313b, RM171m dan RM1m.", source: 148 },
    { date: "16 Jul 2018", tag: "Kewangan", title: "KAN keluarkan Emphasis of Matter", text: "Teguran menyentuh polisi yang tidak konsisten dan RM227.81m rosot nilai yang tidak direkodkan.", source: 18 },
    { date: "7 Dis 2018", tag: "UJSB", title: "Pelan pemulihan diluluskan", text: "Jemaah Menteri meluluskan pelan pemulihan dan penstrukturan untuk menangani defisit aset–liabiliti.", source: 24 },
    { date: "14 Dis 2018", tag: "UJSB", title: "UJSB ditubuhkan", text: "Syarikat pegangan pelaburan dan pengurusan aset milik penuh Menteri Kewangan Diperbadankan mula beroperasi sebagai SPV pemulihan.", source: 24 },
    { date: "27 Dis 2018", tag: "UJSB", title: "Perjanjian pemindahan aset ditandatangani", text: "106 saham tersenarai, satu syarikat perladangan dan 29 aset hartanah masuk ke dalam struktur pemulihan.", source: 25 },
    { date: "5 Apr 2019", tag: "UJSB", title: "RM17.8b shortfall diluluskan", text: "RM500m untuk 2020 dan RM17.3b untuk RMK 12/RMK 13 diluluskan bagi membiayai shortfall penebusan Sukuk.", source: 26 },
    { date: "2019", tag: "Haji", title: "Deposit turun selepas hibah 1.25%", text: "Deposit disebut turun daripada kira-kira RM73b sebelum pengumuman kepada RM69b pada akhir 2019; pada akhir 2020 ia kembali sekitar RM76b dan jumlah dana RM88b.", source: 122 },
    { date: "2020", tag: "UJSB", title: "RM300m tunai dibayar; RM200m Sukuk ditebus", text: "UJSB membayar RM100m pada 2019 dan RM200m pada 2020; geran Kerajaan 2020 berjumlah RM500m.", source: 26 },
    { date: "20 Jan 2022", tag: "Siasatan", title: "Enam Pesuruhjaya dilantik", text: "Suruhanjaya ditubuhkan untuk meneliti isu pengurusan dan operasi LTH bagi tempoh 2014 hingga 2020.", source: 13 },
    { date: "30 Ogos 2022", tag: "Siasatan", title: "Laporan dipersembahkan", text: "Laporan RCI dipersembahkan selepas proses siasatan enam bulan dan merumuskan penemuan serta cadangan penambahbaikan.", source: 5 }
  ];

  function esc(value) { return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c])); }
  function fmtM(value, digits = 0) { const n = Math.abs(Number(value)); return `RM${(digits === 0 ? nf0 : digits === 1 ? nf1 : digits === 2 ? nf2 : nf3).format(n)}m`; }
  function fmtB(value, digits = 2) { return `RM${(digits === 1 ? nf1 : digits === 2 ? nf2 : nf3).format(Math.abs(Number(value)) / 1000)}b`; }
  function signedM(value, digits = 0) { return `${value < 0 ? "−" : value > 0 ? "+" : ""}${fmtM(value, digits)}`; }
  function signedB(value, digits = 2) { return `${value < 0 ? "−" : value > 0 ? "+" : ""}${fmtB(value, digits)}`; }
  function sourceButton(page, label) { return `<button class="source-link" data-source="${page}">${label || (sources[page] && sources[page].label) || `PDF ${page}`}</button>`; }
  function sourceAnchor(page) { return `${sourceUrl}#pdf-page-${page}`; }

  function renderStory() {
    $("#storyRail").innerHTML = story.map((item, i) => `<button class="story-step ${i === state.story ? "is-active" : ""}" role="tab" aria-selected="${i === state.story}" data-story="${i}"><span class="story-step__no">${item.no}</span><strong>${item.title}</strong><small>${item.short}</small></button>`).join("");
    const item = story[state.story];
    $("#storyReading").innerHTML = `<div class="story-reading__grid"><div><h3>${item.title}</h3><p>${item.text}</p><span class="story-reading__source">${sources[item.source].section} · ${sourceButton(item.source, sources[item.source].label)}</span></div><div class="story-reading__metric">${item.metric}</div></div>`;
  }

  function renderBalance() {
    $("#balanceYears").innerHTML = balances.map((row) => `<button class="${row.year === state.balanceYear ? "is-active" : ""}" data-balance-year="${row.year}" aria-pressed="${row.year === state.balanceYear}">${row.year}</button>`).join("");
    const row = balances.find((item) => item.year === state.balanceYear) || balances[3];
    const max = 75000;
    $("#balanceViz").innerHTML = `<div class="balance-viz__canvas"><div class="balance-viz__axis"><span>RM75b</span><span>RM50b</span><span>RM25b</span><span>RM0</span></div>${balances.map((item) => `<div class="balance-viz__column"><div class="balance-viz__bar balance-viz__bar--asset" style="height:${item.assets / max * 100}%" data-label="${fmtB(item.assets, 1)}"></div><div class="balance-viz__bar balance-viz__bar--liability" style="height:${item.liabilities / max * 100}%" data-label="${fmtB(item.liabilities, 1)}"></div><div class="balance-viz__bar balance-viz__bar--post" style="height:${Math.max(Math.abs(item.after) / 7500 * 100, 4)}%" data-label="${signedB(item.after, 2)}"></div><span class="balance-viz__year">${item.year}</span></div>`).join("")}</div>`;
    $("#balanceCallout").innerHTML = `<b>${row.year}:</b> sebelum agihan, kedudukan ialah ${signedM(row.before)}. Selepas ${fmtB(row.distribution, 2)} agihan, baki menjadi <b>${signedB(row.after, 2)}</b>. ${row.year === 2017 ? "Ini selari dengan dapatan bahawa liabiliti sudah melebihi aset sebelum hibah." : "Bandingkan dengan tahun lain untuk melihat bila lebihan bertukar menjadi kekurangan."}`;
    renderProfit();
  }

  function renderProfit() {
    const max = 3412;
    $("#profitCompare").innerHTML = [{ label: "Untung direkod", value: 3412, display: "+RM3.412b", className: "official" }, { label: "Kerugian terlaras PwC", value: 1433, display: "−RM1.433b", className: "adjusted" }].map((row) => `<div class="compare-row"><div class="compare-row__top"><span>${row.label}</span><strong>${row.display}</strong></div><div class="compare-row__track"><div class="compare-row__fill compare-row__fill--${row.className}" style="width:${row.value / max * 100}%"></div></div></div>`).join("");
  }

  function renderPayout() {
    const row = balances.find((item) => item.year === 2017);
    const after = row.before - (row.distribution * state.payout / 100);
    $("#payoutValue").textContent = `${state.payout}%`;
    $("#payoutSlider").value = state.payout;
    $("#payoutResult").innerHTML = `<strong>${signedB(after, 2)}</strong><span>baki terlaras selepas membayar ${state.payout}% daripada agihan 2017. ${state.payout === 0 ? "Tanpa agihan, jurang sebelum agihan masih wujud." : "Simulasi ini hanya mengubah agihan; ia tidak mengubah nilai aset atau liabiliti."}</span>`;
  }

  function renderDeal() {
    $("#dealBoard").innerHTML = state.deal === "asset" ? `<div class="deal-tile"><span class="deal-tile__label">PEMINDAHAN</span><strong>106</strong><p>saham tersenarai dipindahkan kepada UJSB.</p></div><div class="deal-tile"><span class="deal-tile__label">TANAH & BANGUNAN</span><strong>1 + 29</strong><p>syarikat perladangan dan aset hartanah.</p></div><div class="deal-tile deal-tile--dark"><span class="deal-tile__label">NILAI PERJANJIAN</span><strong>RM19.9b</strong><p>dibayar melalui Sukuk Murabahah dan tunai.</p></div>` : `<div class="deal-tile deal-tile--dark"><span class="deal-tile__label">SUKUK SIRI 1</span><strong>RM13.2b</strong><p>nilai nominal · tempoh 7 tahun · pulangan matang 4.05%.</p></div><div class="deal-tile deal-tile--dark"><span class="deal-tile__label">SUKUK SIRI 2</span><strong>RM14.3b</strong><p>nilai nominal · tempoh 10 tahun · pulangan matang 4.10%.</p></div><div class="deal-tile"><span class="deal-tile__label">TUNAI KEPADA LTH</span><strong>RM300m</strong><p>RM100m pada 2019 dan RM200m pada 2020.</p></div>`;
    $("#transferCompare").innerHTML = `<div class="bar-compare__row"><label>Nilai pindahan</label><div class="bar-compare__track"><div class="bar-compare__fill" style="width:100%"></div></div><strong>RM19.9b</strong></div><div class="bar-compare__row"><label>Nilai pasaran</label><div class="bar-compare__track"><div class="bar-compare__fill bar-compare__fill--market" style="width:${9700 / 19900 * 100}%"></div></div><strong>RM9.7b</strong></div>`;
    $("#transferText").innerHTML = `Premium yang disebut laporan ialah <b>RM10.2b</b> berbanding nilai pasaran ketika itu. Ini ialah nilai perjanjian pemindahan — bukan bukti bahawa aset tersebut menghasilkan pulangan sebanyak premium itu.`;
    $("#maturityTrack").innerHTML = `<div class="maturity-card"><strong>RM13.2b</strong><span>Siri 1 · nominal matang</span><small>~ 2026 · 4.05%</small></div><div class="maturity-card"><strong>RM14.3b</strong><span>Siri 2 · nominal matang</span><small>~ 2029 · 4.10%</small></div>`;
    $$("[data-deal]").forEach((button) => button.classList.toggle("is-active", button.dataset.deal === state.deal));
  }

  function filteredInvestments() {
    const query = state.investmentSearch.trim().toLowerCase();
    return investments.filter((item) => (!query || `${item.name} ${item.text} ${item.meta}`.toLowerCase().includes(query)) && (state.sector === "Semua" || item.sector === state.sector) && (state.status === "Semua" || item.status === state.status));
  }

  function renderPortfolio() {
    const list = filteredInvestments();
    $("#caseCount").textContent = `${list.length}/${investments.length}`;
    $("#portfolioSummary").innerHTML = `<span class="summary-pill"><strong>${list.length}</strong> kes dipaparkan</span><span class="summary-pill"><strong>${list.filter((item) => item.barValue !== null).length}</strong> angka RM boleh diplot</span><span class="summary-pill">USD / SR kekal berasingan</span>`;
    const ranked = list.filter((item) => item.barValue !== null).sort((a, b) => b.barValue - a.barValue).slice(0, 8);
    const max = ranked[0] ? ranked[0].barValue : 1;
    $("#investmentBars").innerHTML = ranked.length ? ranked.map((item) => `<div class="investment-bar"><div class="investment-bar__top"><span>${item.name}</span><strong>${item.amount}</strong></div><div class="investment-bar__track"><div class="investment-bar__fill investment-bar__fill--${item.barType === "exposure" ? "exposure" : "loss"}" style="width:${item.barValue / max * 100}%"></div></div></div>`).join("") : `<p class="panel-intro">Tiada angka RM yang setara untuk penapis ini. Buka fail kes untuk membaca ukuran asal.</p>`;
    $("#caseList").innerHTML = list.map((item) => `<article class="case-item ${item.id === state.openCase ? "is-open" : ""}" data-case="${item.id}"><div class="case-item__top"><h4>${item.name}</h4><span class="case-item__status">${item.status}</span></div><div class="case-item__meta"><span>${item.sector}</span><span>${item.amount}</span></div><div class="case-item__detail">${item.text}<br><span>${esc(item.meta)}</span><br>${sourceButton(item.source, sources[item.source] ? sources[item.source].label : `PDF ${item.source}`)}</div></article>`).join("") || `<p class="panel-intro">Tiada kes sepadan.</p>`;
  }

  function renderHaji() {
    const data = state.hajiMode === "actual" ? actualHaji : projectedHaji;
    const row = data.find((item) => item.year === state.hajiYear) || data[data.length - 1];
    const max = state.hajiMode === "actual" ? 24000 : 39000;
    $("#hajiYears").innerHTML = data.map((item) => `<button class="${item.year === row.year ? "is-active" : ""}" data-haji-year="${item.year}">${item.year}</button>`).join("");
    $("#hajiChartTitle").textContent = state.hajiMode === "actual" ? "Kos sebenar dan HAFIS" : "Beban HAFIS yang diunjurkan";
    $("#hajiTag").className = `tag ${state.hajiMode === "actual" ? "tag--fact" : "tag--sim"}`;
    $("#hajiTag").textContent = state.hajiMode === "actual" ? "FAKTA LAPORAN" : "UNJURAN LAPORAN";
    $("#hajiViz").innerHTML = `<div class="haji-viz__stage"><div class="haji-viz__axis"><span>RM${state.hajiMode === "actual" ? "24k" : "39k"}</span><span>RM${state.hajiMode === "actual" ? "16k" : "26k"}</span><span>RM${state.hajiMode === "actual" ? "8k" : "13k"}</span><span>RM0</span></div>${data.map((item) => `<div class="haji-col"><div class="haji-bars"><div class="haji-bar haji-bar--pay" style="height:${item.payment / max * 100}%" title="Bayaran RM${nf0.format(item.payment)}"></div><div class="haji-bar haji-bar--hafis" style="height:${item.hafisPer / max * 100}%" title="HAFIS seorang RM${nf0.format(item.hafisPer)}"></div></div><div class="haji-col__total" style="width:${item.total / (state.hajiMode === "actual" ? 320 : 760) * 100}%"></div><label>${item.year}</label></div>`).join("")}</div><div class="haji-total-scale"><span>HAFIS keseluruhan · RM juta</span><span>skala relatif dalam siri terpilih</span></div>`;
    const share = (row.hafisPer / row.cost * 100).toFixed(1);
    $("#hajiReadout").innerHTML = `<div><p class="kicker">${state.hajiMode === "actual" ? "SEBENAR" : "UNJURAN"} · ${row.year}</p><h3>${state.hajiMode === "actual" ? "Kos yang LTH tanggung" : "Jika bayaran kekal RM12,980"}</h3><div class="haji-readout__big">RM${row.total >= 1000 ? nf2.format(row.total / 1000) + "b" : nf2.format(row.total) + "m"}<small>jumlah HAFIS setahun</small></div><div class="haji-readout__facts"><div><span>Kos seorang</span><strong>RM${nf0.format(row.cost)}</strong></div><div><span>Bayaran jemaah</span><strong>RM${nf0.format(row.payment)}</strong></div><div><span>HAFIS seorang</span><strong>RM${nf0.format(row.hafisPer)} · ${share}%</strong></div></div><p class="haji-readout__note">${state.hajiMode === "actual" ? "Angka 2014–2019 ialah perbandingan kos sebenar dan bayaran yang dikenakan." : "Ini unjuran yang dipetik daripada laporan; ia bergantung pada kos dan bayaran yang digunakan dalam jadual."}</p></div>`;
  }

  function renderNetwork() {
    const stage = $("#networkStage");
    const lines = networkEdges.map(([a, b]) => {
      const from = networkNodes[a], to = networkNodes[b];
      const dx = to[2] - from[2], dy = to[3] - from[3];
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      return `<span class="network-line" style="left:${from[2]}%;top:${from[3]}%;width:${length}%;transform:rotate(${angle}deg)"></span>`;
    }).join("");
    const nodes = networkNodes.map(([id, label, x, y]) => { const item = entities[id]; return `<button class="network-node network-node--${item.type} ${state.entity === id ? "is-active" : ""}" style="left:${x}%;top:${y}%" data-entity="${esc(id)}">${label.replace("\n", "<br>")}</button>`; }).join("");
    stage.innerHTML = lines + nodes;
    const item = entities[state.entity] || entities.LTH;
    $("#entityDetail").innerHTML = `<p class="kicker">ENTITI DIPILIH</p><h3>${item.title}</h3><p>${item.text}</p><div class="entity-detail__role">${item.role}</div><dl class="entity-detail__list">${item.links.map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join("")}</dl>${sourceButton(item.source, sources[item.source] ? sources[item.source].label : `PDF ${item.source}`)}`;
  }

  function renderTimeline() {
    const rows = state.timeline === "Semua" ? timeline : timeline.filter((item) => item.tag === state.timeline);
    $("#timeline").innerHTML = rows.map((item) => `<article class="timeline-item"><div class="timeline-item__date">${item.date}</div><span class="timeline-item__dot"></span><div class="timeline-item__card"><div class="timeline-item__top"><h3>${item.title}</h3><span class="timeline-item__tag">${item.tag}</span></div><p>${item.text}</p>${sourceButton(item.source, sources[item.source] ? sources[item.source].label : `PDF ${item.source}`)}</div></article>`).join("");
    $$("[data-timeline-filter]").forEach((button) => button.classList.toggle("is-active", button.dataset.timelineFilter === state.timeline));
  }

  function openSource(page) {
    const item = sources[page] || { title: `Halaman ${page}`, note: "Buka halaman sumber untuk membaca konteks penuh daripada laporan asal.", section: "Laporan RCI", label: `PDF ${page}` };
    const dialog = $("#sourceDialog");
    $("#dialogBody").innerHTML = `<div class="dialog-inner"><p class="kicker">${item.section} · JEJAK SUMBER</p><h2>${item.title}</h2><p>${item.note}</p><div class="dialog-proof">Sumber yang dipaut ialah dokumen OCR laporan RCI. Nombor halaman merujuk halaman PDF fizikal, bukan nombor halaman yang dicetak dalam kandungan.</div><a href="${sourceAnchor(page)}" target="_blank" rel="noreferrer">Buka ${item.label} dalam laporan asal ↗</a></div>`;
    if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
  }

  function initInteractions() {
    document.addEventListener("click", (event) => {
      const scrollTarget = event.target.closest("[data-scroll]");
      if (scrollTarget) { const target = $(scrollTarget.dataset.scroll); if (target) target.scrollIntoView({ behavior: "smooth", block: "start" }); }
      const source = event.target.closest("[data-source]");
      if (source) { event.preventDefault(); openSource(Number(source.dataset.source)); }
      const storyButton = event.target.closest("[data-story]");
      if (storyButton) { state.story = Number(storyButton.dataset.story); renderStory(); }
      const balanceButton = event.target.closest("[data-balance-year]");
      if (balanceButton) { state.balanceYear = Number(balanceButton.dataset.balanceYear); renderBalance(); }
      const dealButton = event.target.closest("[data-deal]");
      if (dealButton) { state.deal = dealButton.dataset.deal; renderDeal(); }
      const caseItem = event.target.closest("[data-case]");
      if (caseItem) { state.openCase = state.openCase === caseItem.dataset.case ? null : caseItem.dataset.case; renderPortfolio(); }
      const hajiButton = event.target.closest("[data-haji-year]");
      if (hajiButton) { state.hajiYear = Number(hajiButton.dataset.hajiYear); renderHaji(); }
      const hajiMode = event.target.closest("[data-haji-mode]");
      if (hajiMode) { state.hajiMode = hajiMode.dataset.hajiMode; state.hajiYear = state.hajiMode === "actual" ? 2019 : 2030; $$("[data-haji-mode]").forEach((button) => button.classList.toggle("is-active", button === hajiMode)); renderHaji(); }
      const entity = event.target.closest("[data-entity]");
      if (entity) { state.entity = entity.dataset.entity; renderNetwork(); }
      const timelineFilter = event.target.closest("[data-timeline-filter]");
      if (timelineFilter) { state.timeline = timelineFilter.dataset.timelineFilter; renderTimeline(); }
      if (event.target.closest("#resetFilters")) { state.investmentSearch = ""; state.sector = "Semua"; state.status = "Semua"; $("#investmentSearch").value = ""; $("#sectorFilter").value = "Semua"; $("#statusFilter").value = "Semua"; renderPortfolio(); }
    });
    $("#payoutSlider").addEventListener("input", (event) => { state.payout = Number(event.target.value); renderPayout(); });
    $("#investmentSearch").addEventListener("input", (event) => { state.investmentSearch = event.target.value; renderPortfolio(); });
    $("#sectorFilter").addEventListener("change", (event) => { state.sector = event.target.value; renderPortfolio(); });
    $("#statusFilter").addEventListener("change", (event) => { state.status = event.target.value; renderPortfolio(); });
    $("#dialogClose").addEventListener("click", () => $("#sourceDialog").close ? $("#sourceDialog").close() : $("#sourceDialog").removeAttribute("open"));
    $("#sourceDialog").addEventListener("click", (event) => { if (event.target === $("#sourceDialog")) $("#sourceDialog").close(); });
    if ("IntersectionObserver" in window) {
      const links = $$(".topic-nav a"), sections = $$("[data-section]");
      const observer = new IntersectionObserver((entries) => { const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (!current) return; links.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${current.target.id}`)); }, { rootMargin: "-20% 0px -65%", threshold: [0, .15, .35] });
      sections.forEach((section) => observer.observe(section));
    }
  }

  function init() { renderStory(); renderBalance(); renderPayout(); renderDeal(); renderPortfolio(); renderHaji(); renderNetwork(); renderTimeline(); initInteractions(); }
  init();
})();
