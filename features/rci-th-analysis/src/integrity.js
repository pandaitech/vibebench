/**
 * Integriti data: percanggahan dalam laporan, jurang data, dan had kesimpulan.
 *
 * Ini adalah aset analitik utama, BUKAN nota kaki. Dashboard EDA yang jujur
 * mesti memaparkan bahagian ini dengan keutamaan yang sama seperti carta.
 */
import { sourceRef } from "./meta.js";

/**
 * Percanggahan yang benar-benar wujud DALAM laporan (bukan ralat OCR).
 * `resolution`: "resolved" | "explained" | "unresolved"
 */
export const dataConflicts = [
  {
    id: "conflict-hajj-cost-baseline",
    severity: "medium",
    topic: "Kos haji asas",
    a: { claim: "Kos haji bagi jemaah Muassasah pada tahun 2013 adalah RM15,553", source: [sourceRef("Ringkasan Eksekutif ¶22(v)", 23, "xxi")] },
    b: { claim: "Kos haji bagi setiap jemaah bagi tahun 2003 hanya pada kadar RM15,555", source: [sourceRef("3.16.1", 203, 165)] },
    difference: "Tahun berbeza (2013 vs 2003) DAN jumlah berbeza (RM15,553 vs RM15,555).",
    resolution: "unresolved",
    guidance:
      "JANGAN gunakan mana-mana angka ini sebagai titik permulaan siri kos haji. Siri kos haji yang boleh dipercayai bermula pada 2014 (RM16,155) daripada jadual 3.16.3.",
  },
  {
    id: "conflict-waiting-time",
    severity: "medium",
    topic: "Tempoh menunggu giliran haji",
    a: { claim: "Masa menunggu dijangka dapat dikurangkan dari 135 tahun kepada 33 tahun sahaja", source: [sourceRef("3.16.17", 208, 170)] },
    b: { claim: "Mengurangkan tempoh menunggu giliran haji daripada 130 tahun kepada 33 tahun", source: [sourceRef("4.4.22 / Ringkasan Eksekutif ¶35(v)", 236, 198)] },
    difference: "135 tahun berbanding 130 tahun untuk keadaan semasa.",
    resolution: "unresolved",
    guidance:
      "Papar sebagai julat '130–135 tahun' dengan nota. Laporan juga menyatakan EY menggunakan RM9,980 dalam pengiraannya, jadi angka ini adalah anggaran model, bukan ukuran.",
  },
  {
    id: "conflict-bonus-2015",
    severity: "low",
    topic: "Peruntukan bonus kakitangan 2015",
    a: { claim: "RM65 juta", source: [sourceRef("3.12.7", 136, 98)] },
    b: { claim: "RM61 juta", source: [sourceRef("3.12.10", 139, 101)] },
    difference: "RM4 juta.",
    resolution: "explained",
    guidance:
      "Nisbah bonus/keuntungan 1.7% yang disenaraikan dalam jadual 3.12.10 menepati RM61 juta (61 ÷ 3,537 = 1.72%) tetapi tidak menepati RM65 juta (1.84%). Untuk carta nisbah, gunakan RM61 juta; untuk carta peruntukan mentah, papar kedua-dua dengan nota.",
  },
  {
    id: "conflict-hibah-2017-cost",
    severity: "medium",
    topic: "Kos hibah 2017",
    a: { claim: "Hibah tahunan 4.50% dan hibah haji 1.75% telah menelan belanja sehingga RM2.75 bilion bagi tahun kewangan 2017", source: [sourceRef("Ringkasan Eksekutif ¶22(iii)", 22, "xx")] },
    b: { claim: "Jumlah agihan hibah 2017 = RM3,323,741 ribu (RM3.324 bilion)", source: [sourceRef("3.11.7", 130, 92)] },
    c: { claim: "Kemampuan LTH membayar hibah hanya RM2.70 bilion; LTH membayar RM3.31 bilion", source: [sourceRef("3.11.10", 131, 93)] },
    difference:
      "Tiga angka berbeza untuk perkara yang berkaitan: RM2.75b, RM3.324b dan RM3.31b.",
    resolution: "unresolved",
    guidance:
      "RM3.324 bilion (jadual 3.11.7) ialah angka yang paling terperinci dan boleh direkonsiliasikan dengan jadual PwC — gunakan ini sebagai nilai kanonik. RM3.31 bilion ialah pembundaran JAN. Asal RM2.75 bilion tidak dapat direkonsiliasikan.",
  },
  {
    id: "conflict-2017-impairment-frs139",
    severity: "low",
    topic: "Rosot nilai FRS 139 yang sepatutnya direkod pada 2017",
    a: { claim: "RM1.310 bilion (kenyataan Puan Mona binti Othman, JAN)", source: [sourceRef("3.9.13 / 3.11.16", 116, 78)] },
    b: { claim: "RM1,313 juta (senario ambang >70% dalam jadual PwC)", source: [sourceRef("3.13.8", 147, 109)] },
    difference: "RM3 juta.",
    resolution: "unresolved",
    guidance:
      "Perbezaan kecil tetapi kedua-duanya datang daripada sumber berbeza (JAN vs PwC) dengan asas yang mungkin sedikit berbeza. Jangan gunakan secara bergantian dalam pengiraan yang sama.",
  },
  {
    id: "conflict-net-liability-2017",
    severity: "high",
    topic: "Liabiliti bersih LTH pada 2017",
    a: { claim: "RM1.164 bilion (RAV terlaras RM373 juta ditolak rosot nilai tidak direkod RM1,537 juta)", source: [sourceRef("3.9.13", 117, 79)] },
    b: { claim: "PwC menganggarkan liabiliti bersih yang lebih besar berjumlah RM4.093 bilion", source: [sourceRef("3.9.13 / 3.13.7", 117, 79)] },
    difference: "RM2.93 bilion.",
    resolution: "explained",
    guidance:
      "Kedua-duanya betul dalam asas masing-masing: (a) bermula daripada RAV (aset dinilai lebih tinggi), (b) bermula daripada penyata kewangan. Ini BUKAN percanggahan sebenar tetapi ia mesti dilabel dengan jelas dalam dashboard, kerana pembaca akan menganggap kedua-duanya mengukur perkara yang sama.",
  },
  {
    id: "conflict-total-loss-10b",
    severity: "high",
    topic: "'Kerugian yang dialami LTH meningkat kepada RM10 bilion'",
    a: { claim: "Kerugian yang dialami LTH meningkat kepada RM10 bilion telah menyebabkan Kerajaan terpaksa melaksanakan pelan pemulihan dengan kadar segera", source: [sourceRef("3.13.12", 149, 111)] },
    b: {
      claim:
        "Angka yang boleh direkonsiliasikan dalam laporan: kekurangan selepas agihan 2017 RM4.093 bilion; kerugian terkumpul terlaras RM4.683 bilion; jurang premium pemindahan aset RM10.2 bilion; kerugian UJSB 2019 RM9.9 bilion.",
    },
    difference:
      "Angka RM10 bilion tidak sepadan dengan mana-mana jadual dalam laporan sebagai 'kerugian LTH'. Ia paling hampir dengan jurang premium pemindahan aset (RM10.2 bilion) dan kerugian UJSB 2019 (RM9.9 bilion) — tetapi kedua-dua itu ditanggung UJSB, bukan LTH.",
    resolution: "unresolved",
    guidance:
      "JANGAN gunakan 'RM10 bilion' sebagai angka kerugian LTH dalam mana-mana kad statistik atau tajuk. Jika ia disebut, ia mesti dipetik sebagai pernyataan naratif laporan dengan nota bahawa asasnya tidak ditunjukkan.",
  },
  {
    id: "conflict-ata-date",
    severity: "low",
    topic: "Tarikh Perjanjian Pemindahan Aset (ATA)",
    a: { claim: "Perjanjian Pemindahan Aset telah ditandatangani pada 27 Disember 2018", source: [sourceRef("3.13.23 / Ringkasan Eksekutif ¶26", 156, 118)] },
    b: { claim: "LTH telah menandatangani Perjanjian Pemindahan Aset (ATA) dengan UJSB pada 28 Disember 2018", source: [sourceRef("3.14.6(13)", 191, 153)] },
    difference: "Satu hari.",
    resolution: "unresolved",
    guidance: "Gunakan 27 Disember 2018 (disebut dua kali termasuk dalam Ringkasan Eksekutif); tandakan 28 Disember sebagai varian.",
  },
  {
    id: "conflict-sukuk-total",
    severity: "low",
    topic: "Jumlah obligasi Sukuk UJSB",
    a: { claim: "RM27.5 bilion (naratif, berulang kali)", source: [sourceRef("3.13.26 / 3.13.62", 158, 120)] },
    b: { claim: "Perjanjian Sukuk berkenaan langganan RM27.56 bilion UJSB Sukuk oleh LTH", source: [sourceRef("3.13.23(d)", 157, 119)] },
    difference: "RM60 juta.",
    resolution: "explained",
    guidance:
      "RM27.5 bilion ialah jumlah nilai nominal dua siri (13.2 + 14.3). RM27.56 bilion ialah nilai perjanjian penuh. Pengiraan 19.9 + 7.65 = 27.55 menyokong RM27.55/27.56 bilion sebagai jumlah tepat. Gunakan RM27.5 bilion untuk paparan dan nyatakan RM27.56 bilion sebagai nilai perjanjian.",
  },
  {
    id: "conflict-sukuk-issue-year",
    severity: "low",
    topic: "Tahun penerbitan Sukuk UJSB",
    a: { claim: "Sukuk UJSB diterbitkan pada tahun 2018", source: [sourceRef("3.13.63", 172, 134)] },
    b: { claim: "Semenjak Sukuk UJSB diterbitkan pada tahun 2019", source: [sourceRef("3.13.45", 164, 126)] },
    difference: "Satu tahun.",
    resolution: "explained",
    guidance:
      "Perjanjian Langganan Sukuk dimeterai 15 Mei 2019. Rujukan '2018' berkemungkinan merujuk kepada tahun keputusan/pemindahan aset. Gunakan 2019 sebagai tahun penerbitan dan 2018 sebagai tahun pemindahan aset.",
  },
  {
    id: "conflict-hafis-2019",
    severity: "low",
    topic: "HAFIS 2019",
    a: { claim: "RM300 juta pada tahun 2019 (Ringkasan Eksekutif)", source: [sourceRef("Ringkasan Eksekutif ¶22(v)", 23, "xxi")] },
    b: { claim: "RM299 juta (jadual 3.16.3); 'hampir RM300 juta' (3.16.4)", source: [sourceRef("3.16.3–3.16.4", 203, 165)] },
    difference: "RM1 juta (pembundaran).",
    resolution: "resolved",
    guidance: "Gunakan RM299 juta daripada jadual.",
  },
  {
    id: "conflict-subsidy-share",
    severity: "medium",
    topic: "Peratus subsidi haji semasa",
    a: { claim: "Jumlah HAFIS masih tinggi, iaitu mencecah hampir 57% daripada kos haji", source: [sourceRef("3.16.8 / 3.17.4", 205, 167)] },
    b: { claim: "Jadual unjuran 2022 menunjukkan HAFIS 49.2% daripada kos haji", source: [sourceRef("3.16.8", 205, 167)] },
    difference: "57% berbanding 49.2% untuk tahun yang sama.",
    resolution: "resolved",
    guidance:
      "TERBITAN yang menyelesaikan percanggahan: 57% sepadan dengan kadar B40 (25,540 − 10,980) ÷ 25,540 = 57.0%; 49.2% sepadan dengan kadar bukan-B40 (RM12,980). Kedua-dua betul untuk kumpulan berbeza. Dashboard MESTI melabel kumpulan mana yang dirujuk.",
  },
  {
    id: "conflict-fgv-units",
    severity: "high",
    topic: "Pembelian semula saham FGV Julai–Oktober 2012",
    a: { claim: "232,010,800 unit pada purata harga kos RM5.01/unit; jumlah pelaburan tambahan RM116,202,310", source: [sourceRef("3.14.6(14)", 192, 154)] },
    b: { claim: "232,010,800 × RM5.01 = RM1,162,374,108 — sepuluh kali ganda jumlah yang dinyatakan." },
    difference:
      "Jika bilangan unit sebenarnya 23,201,080, pengiraan menepati (23,201,080 × RM5.01 = RM116,237,411).",
    resolution: "unresolved",
    guidance:
      "JANGAN gunakan bilangan unit ini dalam sebarang pengiraan pegangan FGV. Papar kedua-dua angka seperti dalam laporan dengan amaran ketidakkonsistenan.",
  },
  {
    id: "conflict-bluechip-units",
    severity: "high",
    topic: "Jadual saham mewah yang dipindahkan kepada UJSB",
    a: { claim: "Jadual memberi harga seunit, jumlah nilai pemindahan, dan jumlah nilai pasaran bagi lima kaunter.", source: [sourceRef("3.13.37", 162, 124)] },
    b: {
      claim:
        "Bilangan unit tersirat berbeza antara lajur nilai pemindahan dan lajur nilai pasaran. Contoh Axiata: 1,422,605,154 ÷ 6.00 = 237.1 juta unit, tetapi 931,803,255 ÷ 3.63 = 256.7 juta unit.",
    },
    difference:
      "Lajur agregat tidak konsisten dengan harga seunit bagi kesemua lima kaunter.",
    resolution: "unresolved",
    guidance:
      "Bilangan unit TIDAK boleh diterbitkan. Peratus kejatuhan yang disenaraikan adalah untuk HARGA SEUNIT; peratus kejatuhan NILAI AGREGAT berbeza (contoh TM: −60.9% harga tetapi −55.4% nilai). Label paksi carta dengan tepat.",
  },
  {
    id: "conflict-net-profit-2017",
    severity: "medium",
    topic: "Keuntungan LTH 2017",
    a: { claim: "Keuntungan bersih RM2,798 juta (jadual justifikasi bonus)", source: [sourceRef("3.12.10", 139, 101)] },
    b: { claim: "Profit for the year (2017) RM3,412 juta (jadual PwC)", source: [sourceRef("3.13.11", 149, 111)] },
    c: { claim: "'Keuntungan RM3.4 bilion seperti yang direkodkan dalam Laporan Kewangan 2017' (naratif)", source: [sourceRef("Ringkasan Eksekutif ¶21", 19, "xvii")] },
    difference: "RM614 juta antara RM2,798 juta dan RM3,412 juta.",
    resolution: "unresolved",
    guidance:
      "Laporan tidak menjelaskan asas berbeza (kemungkinan sebelum/selepas zakat, atau LTH sahaja berbanding kumpulan). JANGAN letak kedua-dua siri dalam satu carta 'keuntungan LTH' tanpa nota asas yang berbeza.",
  },
  {
    id: "conflict-depositor-count",
    severity: "medium",
    topic: "Bilangan pendeposit",
    a: { claim: "Lebih 9.2 juta pendeposit (2018) / hampir 9.3 juta pendeposit (2018)", source: [sourceRef("3.13.14 / 3.13.18", 150, 112)] },
    b: { claim: "Jumlah pendeposit sehingga 22 Julai 2022 ialah seramai 8.6 juta", source: [sourceRef("BAB EMPAT ¶4.2", 229, 191)] },
    difference:
      "Penurunan ~0.6–0.7 juta akaun antara 2018 dan 2022, pada masa deposit meningkat daripada RM73b kepada RM88b.",
    resolution: "unresolved",
    guidance:
      "Laporan TIDAK menerangkan sebab penurunan. Ia boleh disebabkan pembersihan akaun tidak aktif, penutupan akaun, kematian pendeposit, atau definisi berbeza. JANGAN tafsir sebagai 'kehilangan pendeposit'. Papar sebagai soalan terbuka.",
  },
  {
    id: "conflict-hafis-pilgrim-count",
    severity: "high",
    topic: "Bilangan jemaah tersirat dalam jadual HAFIS 2014–2019",
    a: { claim: "Jadual memberi HAFIS seorang dan jumlah HAFIS untuk setiap tahun.", source: [sourceRef("3.16.3", 203, 165)] },
    b: {
      claim:
        "Bilangan jemaah tersirat (jumlah ÷ seorang) melompat: ~17,166 (2014), ~18,519 (2015), ~17,957 (2016), ~31,139 (2017), ~25,180 (2018), ~23,142 (2019).",
    },
    difference:
      "Lonjakan 73% antara 2016 dan 2017 tidak dijelaskan, dan angka 2014–2016 jauh di bawah kuota ~30,000.",
    resolution: "unresolved",
    guidance:
      "Bilangan jemaah TIDAK boleh diterbitkan dengan yakin. Jika dashboard memaparkan pengiraan ini, ia MESTI dilabel sebagai terbitan yang tidak konsisten dan disertakan amaran. Jadual unjuran 2022–2030 pula menggunakan andaian tetap 30,000 jemaah.",
  },
  {
    id: "conflict-quota-vs-projection",
    severity: "medium",
    topic: "Kuota haji berbanding andaian unjuran HAFIS",
    a: { claim: "Unjuran HAFIS 2022–2030 mengandaikan 30,000 jemaah setahun (terbitan, disahkan secara aritmetik).", source: [sourceRef("3.16.8", 205, 167)] },
    b: { claim: "Kuota haji Malaysia dijangka meningkat kepada 60,000 menjelang 2030.", source: [sourceRef("3.16.20", 209, 171)] },
    difference:
      "Jika kuota berganda kepada 60,000 dan bayaran haji kekal, jumlah HAFIS 2030 akan menjadi kira-kira dua kali ganda RM742.47 juta.",
    resolution: "unresolved",
    guidance:
      "Kedua-dua kenyataan wujud dalam laporan yang sama tetapi TIDAK diselaraskan. Ini adalah peluang simulasi yang sah untuk dashboard — tetapi hasilnya mesti dilabel SIMULASI, bukan unjuran laporan.",
  },
];

/**
 * Data yang laporan TIDAK sediakan. Ini menentukan carta apa yang
 * TIDAK boleh dibina. Dashboard perlu memaparkan ini sebagai
 * keadaan kosong yang bermaklumat, bukan menyembunyikannya.
 */
export const dataGaps = [
  { id: "gap-monthly", topic: "Kekerapan data", missing: "Tiada data bulanan atau suku tahunan untuk mana-mana metrik.", consequence: "Semua siri masa adalah tahunan. Carta trend intra-tahun tidak boleh dibina.", severity: "high" },
  { id: "gap-full-fs", topic: "Penyata kewangan", missing: "Tiada penyata pendapatan penuh, penyata aliran tunai, atau kunci kira-kira terperinci untuk mana-mana tahun.", consequence: "Nisbah kewangan standard (ROA, margin, nisbah kecairan) tidak boleh dikira.", severity: "high" },
  { id: "gap-reserves-series", topic: "Rizab", missing: "Tiada nilai RM Kumpulan Wang Rizab atau RPK untuk mana-mana tahun kecuali sasaran RM3.5 bilion (2019).", consequence: "Carta 'trend rizab' tidak boleh dibina walaupun laporan menyebut rizab menyusut.", severity: "high" },
  { id: "gap-portfolio-mix", topic: "Komposisi portfolio", missing: "Tiada pecahan Alokasi Aset Strategik (SAA) atau komposisi portfolio pelaburan mengikut kelas aset dan tahun.", consequence: "Kenyataan 'pelaburan LTH lebih berat kepada ekuiti' tidak boleh divisualkan dengan angka.", severity: "high" },
  { id: "gap-106-counters", topic: "Ekuiti dipindahkan", missing: "Hanya 5 daripada 106 kaunter yang dipindahkan kepada UJSB dinamakan dengan nilai.", consequence: "Analisis portfolio pemindahan tidak boleh dibina; 5 kaunter itu bukan sampel wakil.", severity: "high" },
  { id: "gap-29-properties", topic: "Hartanah dipindahkan", missing: "29 hartanah hanya dikumpulkan kepada 5 jenis aset. Tiada senarai individu, lokasi, atau nilai per hartanah.", consequence: "Peta atau analisis geografi hartanah tidak boleh dibina. 11 hartanah yang di bawah nilaian JPPHM tidak dinamakan.", severity: "medium" },
  { id: "gap-deposit-distribution", topic: "Taburan deposit", missing: "Hanya dua titik: 65% pendeposit ≤RM2,000, dan 75% deposit dimiliki 5% pendeposit.", consequence: "Histogram atau lengkung Lorenz tidak boleh dibina. Hanya dua penunjuk tumpuan.", severity: "medium" },
  { id: "gap-zakat", topic: "Zakat", missing: "Tiada jumlah RM zakat yang dibayar LTH untuk mana-mana tahun.", consequence: "Kesan kewangan perubahan akad (Mudarabah → Wadi'ah → Wakalah) tidak boleh dikira.", severity: "medium" },
  { id: "gap-subsidiary-financials", topic: "Anak syarikat", missing: "Tiada penyata untung rugi anak syarikat, dan tiada senarai lengkap 'pelaburan strategik'.", consequence: "Kenyataan 'hampir kesemua anak syarikat menghadapi kerugian' tidak boleh disokong dengan angka.", severity: "high" },
  { id: "gap-hibah-2021", topic: "Hibah 2021", missing: "Kadar hibah 2021 (3.10%) diberikan tetapi tiada jumlah RM.", consequence: "Siri jumlah hibah terhenti pada 2020.", severity: "medium" },
  { id: "gap-assets-post-2017", topic: "Aset/liabiliti selepas 2017", missing: "Jadual aset vs liabiliti hanya meliputi 2013–2017.", consequence: "Tiada bukti berangka tentang keadaan kunci kira-kira LTH selepas pelan pemulihan.", severity: "high" },
  { id: "gap-hafis-2020-2021", topic: "HAFIS 2020–2021", missing: "Tiada penghantaran jemaah haji pada 2020 dan 2021; tiada angka HAFIS.", consequence: "Siri HAFIS mempunyai jurang dua tahun. Ini jurang SEBENAR (tiada aktiviti), bukan data hilang — labelkan dengan tepat.", severity: "low" },
  { id: "gap-fx", topic: "Kadar tukaran", missing: "Tiada kadar tukaran USD/RM, SR/RM (kecuali satu titik 2013), atau AUD/RM.", consequence: "Pendedahan THIP (USD910j), Trurich (USD179j), Al-Rawda (SR1,426j), TH Marine (USD20.27j) dan The Bay Pavilion (AUD11.6j) tidak boleh dijumlahkan dalam RM.", severity: "high" },
  { id: "gap-implementation", topic: "Status pelaksanaan syor", missing: "Laporan bertarikh Julai 2022. Tiada maklumat sama ada mana-mana daripada 25 syor telah dilaksanakan.", consequence: "Dashboard TIDAK boleh menunjukkan 'progres pelaksanaan'. Jika ciri itu dikehendaki, ia memerlukan sumber data luar yang berasingan.", severity: "high" },
  { id: "gap-recovery", topic: "Nilai pemulihan", missing: "Bagi kebanyakan pelaburan bermasalah, tiada nilai pemulihan akhir dilaporkan (hanya PwC untuk TH Marine: RM70.4 juta).", consequence: "Kerugian bersih akhir kepada pendeposit tidak boleh dikira.", severity: "high" },
  { id: "gap-hibah-pre-2014", topic: "Hibah sebelum 2014", missing: "Hanya jumlah agihan 2013 (RM2,632 juta) daripada jadual PwC. Tiada kadar atau jumlah 1966–2012.", consequence: "Kumulatif RM37.52 bilion (1966–2021) tidak boleh dipecahkan mengikut tahun.", severity: "medium" },
  { id: "gap-ujsb-post-2019", topic: "Kewangan UJSB", missing: "Hanya kerugian FY2019 (RM9.9 bilion) dan julat pendapatan portfolio (RM200–300 juta setahun).", consequence: "Prestasi UJSB dari semasa ke semasa tidak boleh dijejaki.", severity: "medium" },
].map((g) => ({ factType: "gap", ...g }));

/**
 * Persoalan analitik utama. Setiap satu menyatakan dengan jelas
 * APA yang boleh dan TIDAK boleh disimpulkan.
 *
 * `answerability`: "answerable" | "partial" | "not-answerable"
 */
export const analyticalQuestions = [
  {
    id: "q-overpay",
    rank: 1,
    theme: "Hibah",
    question: "Berapa banyak hibah yang dibayar melebihi kemampuan kewangan LTH?",
    answerability: "partial",
    canConclude:
      "Bagi 2014–2017, jumlah kekurangan selepas agihan boleh dibaca terus daripada jadual PwC: −RM352j (2014), −RM3,086j (2015), −RM4,131j (2016), −RM4,093j (2017). Bagi 2016 dan 2017, aset SUDAH kurang daripada liabiliti sebelum sebarang agihan dibuat.",
    cannotConclude:
      "Angka 'kekurangan selepas agihan' adalah kedudukan kumulatif setiap tahun, BUKAN jumlah lebihan bayar tahunan yang boleh dijumlahkan. Menjumlahkan −352 −3,086 −4,131 −4,093 = −11,662 adalah SALAH kerana ia mengira kekurangan yang sama berkali-kali.",
    correctMetric:
      "Ukuran lebihan bayar tahunan yang paling defensif: bagi 2016 dan 2017, SELURUH agihan (RM2,871j dan RM3,324j) dibuat sedangkan syarat seksyen 22(3)(a) tidak dipenuhi. Bagi 2014 dan 2015, lebihan bayar = agihan − lebihan sebelum agihan (RM352j dan RM3,086j).",
    evidenceLinks: ["assets-liabilities", "hibah-amounts", "s22-3a"],
  },
  {
    id: "q-when-known",
    rank: 2,
    theme: "Amaran",
    question: "Bilakah masalah ini mula diketahui, dan oleh siapa?",
    answerability: "answerable",
    canConclude:
      "Amaran bertulis BNM yang pertama bertarikh 21 Ogos 2014 — tahun pertama jurang defisit muncul. Empat lagi surat menyusul (Dis 2014, Dis 2015 ×2, Dis 2016, Feb 2017). Laporan Roland Berger disiapkan sebelum agihan hibah 2017 diisytiharkan. Krisis hanya menjadi isu awam selepas 'Emphasis of Matter' KAN pada 16 Julai 2018.",
    cannotConclude:
      "Kandungan penuh surat BNM tidak didedahkan (Ekshibit Jilid 12, RAHSIA). Kita tidak tahu sejauh mana amaran itu spesifik atau berapa banyak yang diketahui pihak lain sebelum 2014.",
    derived: "Jurang antara amaran bertulis pertama dan pendedahan awam: ~3 tahun 11 bulan.",
    evidenceLinks: ["regulator-warnings", "bnm-warnings-ignored", "timeline"],
  },
  {
    id: "q-rav-effect",
    rank: 3,
    theme: "Perakaunan",
    question: "Berapa besar kesan RAV dan polisi rosot nilai ke atas gambaran kewangan 2017?",
    answerability: "answerable",
    canConclude:
      "Tiga pelarasan boleh dijejak: (1) RAV menambah RM4,466 juta kepada nilai aset; (2) polisi rosot nilai yang longgar mengurangkan rosot nilai daripada RM1,313 juta (ambang 70%) kepada RM1 juta (ambang 90%); (3) PwC menganggarkan gabungan kesan menukar keuntungan RM3,412 juta kepada kerugian RM1,433 juta.",
    cannotConclude:
      "Kita TIDAK boleh menyatakan berapa banyak setiap pelaburan individu menyumbang kepada angka ini, kerana pecahan tidak diberikan (kecuali TH Plantations RM2,294 juta dalam RAV dan TH Heavy Engineering RM164.58 juta dalam rosot nilai subsidiari).",
    evidenceLinks: ["rav-2017", "impairment-policy-2017", "pwc-adjustment-2017"],
  },
  {
    id: "q-transfer-premium",
    rank: 4,
    theme: "UJSB",
    question: "Siapa menanggung jurang RM10.2 bilion antara nilai pemindahan dan nilai pasaran?",
    answerability: "answerable",
    canConclude:
      "UJSB menanggungnya: UJSB merekodkan kerugian RM9.9 bilion bagi tahun berakhir 2019 kerana perbezaan nilai pemindahan dan nilai pasaran. Obligasi Sukuk RM27.5 bilion pula tersenarai dalam Komitmen Jaminan Kerajaan, bermakna Kerajaan yang akhirnya menanggung.",
    cannotConclude:
      "Kita TIDAK boleh menyatakan jumlah akhir kos kepada pembayar cukai, kerana ia bergantung kepada berapa banyak UJSB berjaya memulihkan melalui pelupusan aset — dan setakat laporan, hanya SATU hartanah (RM920 ribu) berjaya dijual dan 75 daripada 106 kaunter dilupuskan tanpa nilai yang dinyatakan.",
    evidenceLinks: ["asset-transfer", "ujsb-disposals", "guarantee-commitments"],
  },
  {
    id: "q-sukuk-risk",
    rank: 5,
    theme: "UJSB",
    question: "Sejauh mana LTH bergantung kepada Sukuk UJSB, dan apa yang berlaku jika ia gagal ditebus?",
    answerability: "answerable",
    canConclude:
      "Sukuk RM27.5 bilion ialah hampir 31% daripada keseluruhan aset LTH. Hasil pengakruannya menyumbang hampir 26% pendapatan tahunan LTH dan melebihi satu pertiga jumlah agihan hibah tahunan — semuanya TANPA aliran tunai. Pendapatan tertunggak terkumpul melebihi RM2.1 bilion setakat 31 Disember 2021, bertambah ~RM840 juta setahun. Jika gagal, tunggakan keuntungan akan mencecah RM7.65 bilion dan jaminan Kerajaan RM88 bilion terpaksa diaktifkan.",
    cannotConclude:
      "Kita TIDAK boleh mengira kebarangkalian kegagalan. Laporan hanya menyatakan bahawa suntikan RM1.5 bilion pada 2021 tidak diterima — satu titik data, bukan trend.",
    evidenceLinks: ["ujsb-sukuk", "sukuk-accrual", "government-funding", "government-guarantee-exposure"],
  },
  {
    id: "q-hafis-sustainable",
    rank: 6,
    theme: "HAFIS",
    question: "Adakah subsidi haji mampan?",
    answerability: "partial",
    canConclude:
      "Bahagian HAFIS daripada kos haji meningkat secara konsisten daripada 38% (2014) kepada 56% (2019), dan diunjurkan mencapai 65.6% pada 2030 jika bayaran haji kekal RM12,980. Bayaran haji dibekukan 13 tahun (2009–2021). LTH memerlukan dana minima RM60 bilion untuk menampung subsidi pada tahap sekarang.",
    cannotConclude:
      "Unjuran laporan mengunci DUA pembolehubah (bayaran RM12,980 dan 30,000 jemaah) yang laporan sendiri jangka akan berubah (kuota dijangka 60,000 menjelang 2030). Unjuran RM742.47 juta pada 2030 adalah senario 'tiada perubahan', bukan ramalan. Ia juga tidak mengambil kira inflasi kos haji melebihi unjuran LTH.",
    evidenceLinks: ["hafis-actual", "hafis-projection", "hajj-quota", "deposit-concentration"],
  },
  {
    id: "q-conflict-of-interest",
    rank: 7,
    theme: "Tadbir urus",
    question: "Sejauh mana konflik kepentingan wujud dalam Lembaga dan pengurusan LTH?",
    answerability: "partial",
    canConclude:
      "Sebelas individu dinamakan dengan senarai jawatan di anak syarikat. Datuk Rozaida binti Omar memegang 23 jawatan pengarah, Datuk Seri Johan bin Abdullah 18 jawatan. Dasar baharu LTH mengehadkan kepada 5 anak syarikat sahaja.",
    cannotConclude:
      "Senarai ini menggunakan perkataan 'antaranya' — ia CONTOH, bukan senarai lengkap. Bilangan jawatan tidak boleh dilayan sebagai kiraan muktamad, dan tiada data untuk individu yang tidak dinamakan. Kita juga tidak boleh mengaitkan mana-mana jawatan secara langsung dengan mana-mana keputusan pelaburan tertentu.",
    evidenceLinks: ["subsidiary-directorships", "subsidiary-cap-policy"],
  },
  {
    id: "q-political",
    rank: 8,
    theme: "Tadbir urus",
    question: "Apakah bukti pengaruh politik ke atas keputusan LTH?",
    answerability: "partial",
    canConclude:
      "Suruhanjaya menamakan tiga ahli politik dalam Lembaga dan menyatakan secara langsung bahawa keputusan mengenai hibah, bayaran haji dan HAFIS 'didorong oleh unsur-unsur politik'. Laporan RB yang memberi amaran disiapkan SEBELUM hibah 2017 diisytiharkan tetapi tiada rekod menunjukkan ia dibentangkan kepada Lembaga; laporan mengaitkan ini dengan tekanan pilihan raya.",
    cannotConclude:
      "Ini adalah PANDANGAN Suruhanjaya berdasarkan keterangan tertutup, bukan bukti dokumen yang boleh disemak umum. Tiada minit mesyuarat atau arahan bertulis yang dipetik menunjukkan arahan politik langsung. Jangan persembahkan sebagai fakta yang telah dibuktikan di mahkamah.",
    evidenceLinks: ["political-influence", "crisis-drivers"],
  },
  {
    id: "q-accountability",
    rank: 9,
    theme: "Penguatkuasaan",
    question: "Apakah akibat yang dikenakan ke atas mereka yang bertanggungjawab?",
    answerability: "answerable",
    canConclude:
      "Setakat laporan: 4 laporan polis (2 dirujuk kepada Peguam Negara, 2 masih disiasat kerana melibatkan Indonesia); 6 aduan SPRM masih disiasat; 5 pegawai dikenakan tindakan tatatertib dalam 4 kluster. Dalam kesemua tiga kluster yang dirayu, hukuman DIKURANGKAN — dua kes buang kerja bertukar kepada turun pangkat. Kesemua lima pegawai masih bekerja dengan LTH atau anak syarikatnya.",
    cannotConclude:
      "Tiada pendakwaan jenayah dilaporkan. Kita TIDAK boleh menyatakan sama ada mana-mana pihak akhirnya didapati bersalah, kerana laporan diserahkan sebelum sebarang keputusan mahkamah.",
    evidenceLinks: ["police-reports", "disciplinary-actions", "sprm-reports"],
  },
  {
    id: "q-what-changed",
    rank: 10,
    theme: "Pemulihan",
    question: "Apa yang benar-benar berubah selepas 2018?",
    answerability: "partial",
    canConclude:
      "Kadar hibah turun daripada purata 6.4% (2014–2017, termasuk hibah haji) kepada 1.25%–3.10%; hibah haji dihentikan sepenuhnya sejak 2018. Bonus kakitangan turun daripada RM74 juta (2014) kepada RM10.8–14.1 juta (2018–2020). Polisi rizab diformalkan (2019). Akad ditukar kepada Wakalah (Dis 2019). Deposit pulih daripada RM69b (2019) kepada RM88b (2022).",
    cannotConclude:
      "Kita TIDAK boleh mengesahkan sama ada kunci kira-kira LTH kini sihat, kerana jadual aset vs liabiliti berhenti pada 2017 dan tiada penyata kewangan selepas itu. Suruhanjaya sendiri menyatakan pelan pemulihan 'bukan solusi jangka panjang' dan pelbagai aset bermasalah masih dimiliki LTH.",
    evidenceLinks: ["hibah-rates", "staff-bonus", "reserve-policy", "deposit-trajectory"],
  },
  {
    id: "q-cost-to-public",
    rank: 11,
    theme: "Kesan awam",
    question: "Berapa kos akhir kepada pendeposit dan pembayar cukai?",
    answerability: "not-answerable",
    canConclude:
      "Beberapa komponen diketahui: geran Kerajaan RM500 juta (2020); komitmen RM1.73 bilion setahun sehingga 2030; obligasi Sukuk RM27.5 bilion; jaminan seksyen 24 bernilai RM88 bilion.",
    cannotConclude:
      "Kos AKHIR tidak boleh dikira. Ia bergantung kepada nilai pemulihan aset UJSB (sebahagian besar belum dijual), keputusan litigasi yang belum selesai, dan sama ada Kerajaan menunaikan peruntukan tahunan. JANGAN cipta angka 'jumlah kerugian' tunggal.",
    evidenceLinks: ["government-funding", "ujsb-sukuk", "government-guarantee-exposure", "problematic-investments"],
  },
  {
    id: "q-investment-losses",
    rank: 12,
    theme: "Pelaburan",
    question: "Berapa jumlah kerugian daripada 14 pelaburan bermasalah?",
    answerability: "not-answerable",
    canConclude:
      "Rosot nilai yang dinyatakan secara jelas dalam RM boleh dijumlahkan untuk sebahagian kes sahaja (contoh Trurich RM364.31j, PPB RM145.3j, Al-Rawda RM202.8j, TH Marine RM278j terbitan, DSSB RM225j terbitan, Al-Fareeda RM63j, THP RM170j, Emrail RM19.3j, Wellspring RM19.03j, Abraj RM40.25j).",
    cannotConclude:
      "Jumlah keseluruhan TIDAK boleh dikira dengan sah kerana: (a) empat kes utama (THIP, Al-Rawda sebahagian, Trurich pinjaman, TH Marine) mempunyai komponen dalam USD/SR tanpa kadar tukaran; (b) FGV dilaporkan sebagai 'kerugian tidak nyata' bukan rosot nilai, dan kerugian itu DIELAKKAN kerana UJSB mengambil alih pada kos; (c) tarikh pengukuran berbeza antara kes (2019, 2020, 2021); (d) sesetengah kes mempunyai pemulihan separa yang belum dimuktamadkan. Sebarang 'jumlah kerugian' akan mencampurkan asas yang tidak serasi.",
    evidenceLinks: ["problematic-investments", "gap-fx", "gap-recovery"],
  },
];

/**
 * Pemeriksaan silang yang telah dijalankan ke atas data ini.
 * Entiti hiliran boleh menjalankan semula pemeriksaan ini melalui
 * fungsi `runIntegrityChecks()` dalam derive.js.
 */
export const integrityCheckSpecs = [
  { id: "chk-al-rows", description: "Setiap baris aset/liabiliti: aset + liabiliti = lebihan pra-agihan; lebihan pra-agihan + agihan = lebihan pasca-agihan.", expected: "pass" },
  { id: "chk-hibah-rows", description: "Setiap baris hibah: hibah tahunan + hibah haji = jumlah.", expected: "pass" },
  { id: "chk-hibah-vs-al", description: "Agihan dalam jadual aset/liabiliti (RM juta) sepadan dengan jumlah hibah (RM'000 ÷ 1,000) dalam had pembundaran ±1.", expected: "pass" },
  { id: "chk-rav", description: "RAV: aset + tambahan RAV = jumlah RAV; jumlah RAV − liabiliti = nilai bersih terlaras.", expected: "pass" },
  { id: "chk-rav-liability", description: "Liabiliti RAV 2017 (74,410) = liabiliti PwC pra-agihan (71,086) + agihan 2017 (3,324).", expected: "pass" },
  { id: "chk-pwc-bridge", description: "Jambatan keuntungan PwC menjumlah kepada kerugian terlaras yang dinyatakan.", expected: "pass" },
  { id: "chk-asset-transfer", description: "Jumlah lajur jadual pemindahan aset menepati baris.", expected: "pass" },
  { id: "chk-property-detail", description: "Jumlah lajur jadual hartanah terperinci menepati baris.", expected: "pass" },
  { id: "chk-bluechip-totals", description: "Jumlah lajur jadual saham mewah menepati baris.", expected: "pass" },
  { id: "chk-bluechip-units", description: "Bilangan unit tersirat konsisten antara lajur pemindahan dan pasaran.", expected: "fail", note: "Kegagalan yang DIJANGKA — didokumenkan dalam conflict-bluechip-units." },
  { id: "chk-guarantee-totals", description: "Jumlah lajur Komitmen Jaminan 2020 dan 2021 menepati baris.", expected: "pass" },
  { id: "chk-sukuk-ytm", description: "Prinsipal × (1 + YTM)^tempoh = nilai nominal, dalam had ±1%.", expected: "pass" },
  { id: "chk-sukuk-consideration", description: "Sukuk Siri 1 + Siri 2 + tunai = nilai pemindahan aset RM19.9 bilion.", expected: "pass" },
  { id: "chk-hafis-rows", description: "Setiap baris HAFIS: kos haji − bayaran haji = HAFIS seorang; HAFIS ÷ kos = peratus.", expected: "pass" },
  { id: "chk-hafis-projection-count", description: "Setiap baris unjuran HAFIS: HAFIS seorang × 30,000 = jumlah (RM'000).", expected: "pass" },
  { id: "chk-hafis-actual-count", description: "Bilangan jemaah tersirat konsisten merentas tahun dalam jadual HAFIS sebenar.", expected: "fail", note: "Kegagalan yang DIJANGKA — didokumenkan dalam conflict-hafis-pilgrim-count." },
  { id: "chk-bonus-ratio", description: "Nisbah bonus/keuntungan bersih dalam jadual 3.12.10 menepati pengiraan.", expected: "pass" },
  { id: "chk-bonus-2015", description: "Peruntukan bonus 2015 konsisten antara jadual 3.12.7 dan 3.12.10.", expected: "fail", note: "Kegagalan yang DIJANGKA — didokumenkan dalam conflict-bonus-2015." },
  { id: "chk-thp-bonus-2017", description: "Jumlah penerima bonus TH Properties 2017 = RM1,148,400.", expected: "pass" },
  { id: "chk-thp-bonus-2018", description: "Jumlah penerima bonus THP Australia 2018 = RM1,045,000.", expected: "pass" },
  { id: "chk-rofr-premium", description: "Premium ROFR = harga ROFR ÷ harga pasaran − 1, dalam had ±0.5 mata peratus.", expected: "pass" },
  { id: "chk-ppb-nbv", description: "PPB: kos RM193.5j − rosot nilai RM145.3j = nilai buku bersih RM48.2j.", expected: "pass" },
  { id: "chk-dssb-approval", description: "DSSB: ekuiti RM231.00j + pembiayaan RM295.16j = kelulusan RM526.16j.", expected: "pass" },
  { id: "chk-marine-total", description: "TH Marine: ekuiti RM198j + pembiayaan RM136j = jumlah RM334j.", expected: "pass" },
];
