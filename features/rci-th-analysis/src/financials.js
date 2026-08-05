/**
 * Data kewangan yang dinormalisasi.
 *
 * KONVENSYEN UNIT (patuhi dengan ketat):
 *   - `*_rm_million`  : nilai dalam RM juta
 *   - `*_rm`          : nilai dalam RM penuh (ringgit)
 *   - `*_pct`         : peratus, dinyatakan sebagai nombor (4.5 bermaksud 4.5%)
 *   - Nilai negatif   : kekurangan / liabiliti / kejatuhan (bukan kurungan)
 *
 * Setiap siri membawa `unit`, `basis`, `factType` dan `source`.
 * Jangan tukar unit tanpa menukar nama medan.
 */
import { sourceRef } from "./meta.js";

const F = "fact";

/* ------------------------------------------------------------------ *
 * 1. ASET vs LIABILITI (analisis PwC, asas penyata kewangan)
 * ------------------------------------------------------------------ */

/**
 * Sumber: jadual PwC di 3.13.7 (2013–2017) dan jadual 3.9.2 (2014–2017).
 * Kedua-dua jadual konsisten untuk 2014–2017; 3.13.7 menambah 2013.
 *
 * `surplusPreDistribution` = totalAssets + totalLiabilities (liabiliti negatif)
 * `surplusPostDistribution` = surplusPreDistribution + distribution (negatif)
 */
export const assetsLiabilities = {
  id: "assets-liabilities",
  unit: "RM juta",
  basis:
    "Analisis PwC Financial Position Review ke atas penyata kewangan LTH. Liabiliti termasuk dana simpanan pendeposit.",
  factType: F,
  source: [sourceRef("3.13.7", 147, 109), sourceRef("3.9.2", 112, 74)],
  rows: [
    { year: 2013, totalAssets_rm_million: 48778, totalLiabilities_rm_million: -43696, surplusPreDistribution_rm_million: 5082, distribution_rm_million: -2632, surplusPostDistribution_rm_million: 2450 },
    { year: 2014, totalAssets_rm_million: 54751, totalLiabilities_rm_million: -51866, surplusPreDistribution_rm_million: 2885, distribution_rm_million: -3237, surplusPostDistribution_rm_million: -352 },
    { year: 2015, totalAssets_rm_million: 60196, totalLiabilities_rm_million: -60062, surplusPreDistribution_rm_million: 134, distribution_rm_million: -3220, surplusPostDistribution_rm_million: -3086 },
    { year: 2016, totalAssets_rm_million: 64321, totalLiabilities_rm_million: -65581, surplusPreDistribution_rm_million: -1260, distribution_rm_million: -2871, surplusPostDistribution_rm_million: -4131 },
    { year: 2017, totalAssets_rm_million: 70317, totalLiabilities_rm_million: -71086, surplusPreDistribution_rm_million: -769, distribution_rm_million: -3324, surplusPostDistribution_rm_million: -4093 },
  ],
  reconciliationNotes: [
    "Semua baris menepati: aset + liabiliti = lebihan/kekurangan sebelum agihan; kemudian tolak agihan = selepas agihan. Disahkan secara aritmetik.",
    "Angka agihan dalam jadual ini (2,632 / 3,237 / 3,220 / 2,871 / 3,324) sepadan dengan jadual pembayaran hibah 3.11.7 (dibundarkan daripada RM'000).",
  ],
  cautions: [
    "Jadual ini ialah analisis PwC, bukan penyata kewangan beraudit yang diterbitkan. Penyata beraudit LTH mengelaskan Kumpulan Wang Pendeposit sebagai EKUITI, bukan liabiliti (sejak 2010) — itulah sebabnya penyata beraudit menunjukkan aset melebihi liabiliti.",
    "2013 hanya muncul dalam jadual 3.13.7. Tiada data 2018–2021 dalam format yang sama.",
  ],
};

/**
 * Salah klasifikasi Kumpulan Wang Pendeposit.
 * Ini ialah "kunci" kepada seluruh krisis — tanpa memahaminya, jadual di atas
 * kelihatan bercanggah dengan Sijil Audit Bersih.
 */
export const depositorFundClassification = {
  id: "depositor-fund-classification",
  since: 2010,
  reportedAs: "Dana (ekuiti)",
  shouldBe: "Liabiliti",
  effect:
    "Bersama rosot nilai yang tidak mencukupi, pengelasan ini menyebabkan penyata kewangan tahunan menunjukkan aset melebihi liabiliti, dan dengan itu membolehkan hibah diisytiharkan di bawah seksyen 22(3)(a) Akta 535.",
  commissionView:
    "Suruhanjaya mendapati pengelasan tersebut adalah satu representasi salah dan tidak selari dengan piawaian perakaunan.",
  factType: F,
  source: [sourceRef("3.11.12–3.11.13", 132, 94)],
};

/* ------------------------------------------------------------------ *
 * 2. HIBAH — KADAR DAN JUMLAH
 * ------------------------------------------------------------------ */

export const hibahRates = {
  id: "hibah-rates",
  unit: "%",
  basis: "Kadar agihan keuntungan tahunan dan hibah haji yang diisytiharkan.",
  factType: F,
  source: [sourceRef("3.9.22", 120, 82)],
  rows: [
    { year: 2014, annual_pct: 6.25, hajj_pct: 2.0 },
    { year: 2015, annual_pct: 5.0, hajj_pct: 3.0 },
    { year: 2016, annual_pct: 4.25, hajj_pct: 1.5 },
    { year: 2017, annual_pct: 4.5, hajj_pct: 1.75 },
    { year: 2018, annual_pct: 1.25, hajj_pct: 0 },
    { year: 2019, annual_pct: 3.05, hajj_pct: 0 },
    { year: 2020, annual_pct: 3.1, hajj_pct: 0 },
    { year: 2021, annual_pct: 3.1, hajj_pct: 0 },
  ],
  cautions: [
    "Hibah haji ialah kadar TAMBAHAN kepada baki yang layak, bukan kadar berasingan untuk semua pendeposit. Jangan campur kedua-dua kadar sebagai satu 'kadar pulangan' tanpa nota.",
    "Untuk 2014–2017 laporan sendiri merujuk jumlah kadar (cth 4.50 + 1.75 = 6.25 bagi 2017) apabila membincangkan kemampuan kewangan.",
    "Tiada jumlah RM diberikan untuk 2021; hanya kadar.",
  ],
};

export const hibahAmounts = {
  id: "hibah-amounts",
  unit: "RM ribu (RM'000)",
  basis: "Pembayaran hibah sebenar 2014–2020.",
  factType: F,
  source: [sourceRef("3.11.7", 130, 92)],
  rows: [
    { year: 2014, rateLabel: "6.25 + 2.00", annual_rm_thousand: 2988053, hajj_rm_thousand: 249143, total_rm_thousand: 3237196 },
    { year: 2015, rateLabel: "5.00 + 3.00", annual_rm_thousand: 2807369, hajj_rm_thousand: 413005, total_rm_thousand: 3220374 },
    { year: 2016, rateLabel: "4.25 + 1.50", annual_rm_thousand: 2645625, hajj_rm_thousand: 225197, total_rm_thousand: 2870822 },
    { year: 2017, rateLabel: "4.50 + 1.75", annual_rm_thousand: 3042184, hajj_rm_thousand: 281557, total_rm_thousand: 3323741 },
    { year: 2018, rateLabel: "1.25", annual_rm_thousand: 922959, hajj_rm_thousand: null, total_rm_thousand: 922959 },
    { year: 2019, rateLabel: "3.05", annual_rm_thousand: 2140538, hajj_rm_thousand: null, total_rm_thousand: 2140538 },
    { year: 2020, rateLabel: "3.10", annual_rm_thousand: 2242141, hajj_rm_thousand: null, total_rm_thousand: 2242141 },
  ],
  reconciliationNotes: [
    "Setiap baris: annual + hajj = total. Disahkan secara aritmetik untuk semua tahun.",
  ],
  cautions: [
    "Tiada data 2021 walaupun kadar 2021 (3.10%) diberikan. Tandakan sebagai jurang data.",
    "Tiada data sebelum 2014 kecuali angka agihan 2013 (RM2,632 juta) dalam jadual PwC.",
  ],
};

export const hibahCalculationChange2017 = {
  id: "hibah-calc-change-2017",
  announcedDate: "2018-02-07",
  change: "Daripada purata baki deposit BULANAN kepada purata baki TAHUNAN",
  outcome: "Ditarik balik selepas reaksi negatif pendeposit; kaedah bulanan digunakan semula.",
  excessCashPaid_rm_million: 600,
  janAssessment: {
    capacityAtAnnualBasis_rm_billion: 2.7,
    capacityRate_pct: 4.0,
    actualPaid_rm_billion: 3.31,
    excess_rm_billion: 0.61,
    excess_pct: 22.5,
    witness: "Puan Mona binti Othman, Timbalan Pengarah Audit Kewangan, JAN",
  },
  derivedCheck:
    "3.31 − 2.70 = 0.61 dan 0.61 / 2.70 = 22.6% — konsisten dengan '22.5%' yang dinyatakan. 'Kadar 6.25%' yang disebut JAN merujuk jumlah 4.50% + 1.75% bagi 2017, bukan kadar tahunan 2014.",
  factType: F,
  source: [sourceRef("3.9.9 / 3.11.10", 115, 77)],
};

/* ------------------------------------------------------------------ *
 * 3. RAV — REKONSILIASI 2017
 * ------------------------------------------------------------------ */

export const ravReconciliation2017 = {
  id: "rav-2017",
  unit: "RM juta",
  year: 2017,
  factType: F,
  source: [sourceRef("3.9.12", 116, 78)],
  rows: [
    { label: "Jumlah aset (penyata kewangan)", value_rm_million: 70317 },
    {
      label:
        "Tambahan RAV untuk anak syarikat, syarikat bersekutu, usaha sama, hartanah dan aset dipegang sehingga matang",
      value_rm_million: 4466,
    },
    { label: "Jumlah aset berdasarkan RAV", value_rm_million: 74783, isSubtotal: true },
    { label: "Jumlah liabiliti termasuk deposit pendeposit", value_rm_million: -74410 },
    { label: "Nilai bersih aset terlaras untuk diagihkan", value_rm_million: 373, isTotal: true },
  ],
  reconciliationNotes: [
    "70,317 + 4,466 = 74,783 ✓",
    "74,783 − 74,410 = 373 ✓",
    "Liabiliti RAV (74,410) = liabiliti PwC pra-agihan (71,086) + agihan hibah 2017 (3,324). Ini menjelaskan kenapa dua angka liabiliti berbeza muncul dalam laporan untuk tahun yang sama.",
    "70,317 − 74,410 = −4,093 ✓ sepadan dengan kekurangan selepas agihan dalam jadual PwC.",
  ],
  thpComponent: {
    amount_rm_million: 2294,
    entity: "TH Plantations Berhad",
    underlyingPropertyValuation_rm_million: 4600,
    professionallyValued_rm_million: 556,
    managementEstimateOnly_rm_million: 4044,
    note:
      "Daripada penilaian hartanah RM4.6 bilion, hanya RM556 juta berdasarkan laporan penilai profesional; baki RM4.044 bilion adalah anggaran pengurusan semata-mata.",
    source: [sourceRef("3.9.4", 113, 75)],
  },
  cautions: [
    "Tiada piawaian pasaran untuk mengira RAV. Angka RAV ialah anggaran pengurusan LTH, bukan harga pasaran atau penilaian bebas.",
    "Suruhanjaya menyimpulkan RAV tidak boleh dijadikan asas bayaran hibah.",
  ],
};

export const unrecordedImpairment2017 = {
  id: "unrecorded-impairment-2017",
  unit: "RM juta",
  year: 2017,
  factType: F,
  source: [sourceRef("3.9.13 / 3.11.16", 116, 78)],
  items: [
    {
      label: "Rosot nilai aset kewangan yang sepatutnya direkod di bawah FRS 139",
      amount_rm_million: 1310,
      attributedTo: "Puan Mona binti Othman (JAN), Akuan Berkanun Saksi",
    },
    {
      label: "Rosot nilai pelaburan dalam 3 syarikat subsidiari dan 3 syarikat bersekutu",
      amount_rm_million: 227.81,
      attributedTo: "Ketua Audit Negara, teguran 'Emphasis of Matter' 16 Julai 2018",
      breakdown: [{ entity: "TH Heavy Engineering Berhad", amount_rm_million: 164.58 }],
    },
  ],
  total_rm_million: 1537.81,
  netLiabilityAfterRav_rm_million: -1164,
  netLiabilityAfterRavNote:
    "Laporan mengira 1,537 − 373 = 1,164 (nilai bersih aset terlaras RAV ditolak rosot nilai tidak direkod).",
  pwcAlternativeNetLiability_rm_million: -4093,
  pwcAlternativeNote: "PwC menganggarkan liabiliti bersih yang lebih besar iaitu RM4.093 bilion.",
  cautions: [
    "Dua angka liabiliti bersih 2017 wujud dalam laporan (RM1.164 bilion dan RM4.093 bilion) kerana asas pengiraan berbeza: yang pertama bermula daripada RAV, yang kedua daripada penyata kewangan. Kedua-duanya sah dalam konteks masing-masing — JANGAN campurkan.",
  ],
};

export const impairmentPolicy2017 = {
  id: "impairment-policy-2017",
  unit: "RM juta",
  year: 2017,
  policyChangesInYear: 2,
  factType: F,
  source: [sourceRef("3.13.8–3.13.9", 147, 109)],
  thresholds: [
    { significantBelowCost_pct: 70, prolongedMonths: ">24", impairmentImpact_rm_million: 1313 },
    { significantBelowCost_pct: 85, prolongedMonths: null, impairmentImpact_rm_million: 171 },
    { significantBelowCost_pct: 90, prolongedMonths: null, impairmentImpact_rm_million: 1 },
  ],
  actualRecorded_rm_million: 1.0,
  benchmark: {
    guidance: "FRSIC 14 (Institut Akauntan Malaysia)",
    significantThreshold_pct: 20,
    prolongedMonths: 12,
    note:
      "FRSIC 14 mentakrifkan kerugian signifikan sebagai penurunan 20% atau lebih, dan berlanjutan sebagai melebihi dua belas bulan. LTH menggunakan 70%, kemudian 85%, kemudian 90% — jauh lebih longgar.",
  },
  illustration:
    "Pada ambang 90%: pelaburan berkos RM1,000 hanya dirosotnilaikan apabila harga pasaran jatuh ke RM100.",
  cautions: [
    "Angka 1,313 (senario >70%) hampir sama tetapi TIDAK sama dengan RM1,310 juta yang disebut JAN. Laporan tidak menjelaskan perbezaan RM3 juta ini.",
    "Ketiga-tiga baris ialah senario alternatif, bukan tiga rosot nilai berasingan. Jangan jumlahkan.",
  ],
};

export const pwcAdjustment2017 = {
  id: "pwc-adjustment-2017",
  unit: "RM juta",
  year: 2017,
  factType: "thirdPartyEstimate",
  source: [sourceRef("3.13.11", 149, 111)],
  profitBridge: [
    { label: "Keuntungan tahun 2017 (seperti direkod)", value_rm_million: 3412 },
    { label: "Tolak: rosot nilai pelaburan ekuiti AFS", value_rm_million: -4258 },
    { label: "Tolak: rosot nilai instrumen sekuriti hutang AFS", value_rm_million: -7 },
    { label: "Tolak: pelarasan lain", value_rm_million: -580 },
    { label: "Kerugian terlaras", value_rm_million: -1433, isTotal: true },
  ],
  retainedEarningsBridge: [
    { label: "Pendapatan tertahan pada 31.12.2017", value_rm_million: 162 },
    { label: "Tolak: pelarasan", value_rm_million: -4845 },
    { label: "Kerugian terkumpul terlaras", value_rm_million: -4683, isTotal: true },
  ],
  reconciliationNotes: [
    "3,412 − 4,258 − 7 − 580 = −1,433 ✓ (laporan menyebut 'kerugian bersih RM1.4 bilion')",
    "162 − 4,845 = −4,683 ✓ (laporan menyebut 'kerugian terkumpul RM4.7 bilion')",
  ],
  headline:
    "Jika piawaian MFRS diguna pakai sepenuhnya bagi tahun kewangan 2017, LTH sepatutnya merekodkan kerugian bersih RM1.4 bilion, bukan keuntungan RM3.4 bilion.",
  cautions: [
    "Ini ialah analisis PwC (Financial Review), bukan audit semula. Tujuannya menurut laporan ialah mengesahkan penemuan JAN.",
    "Laporan juga menyebut 'kerugian yang dialami LTH meningkat kepada RM10 bilion' (3.13.12) tanpa menunjukkan pengiraan. Angka RM10 bilion tidak boleh direkonsiliasikan dengan jadual mana-mana dalam laporan — tandakan sebagai tidak dapat disahkan.",
  ],
};

/* ------------------------------------------------------------------ *
 * 4. BONUS
 * ------------------------------------------------------------------ */

export const staffBonus = {
  id: "staff-bonus",
  unit: "RM juta",
  basis: "Peruntukan bonus kakitangan LTH dan kadar yang diluluskan MOF.",
  factType: F,
  source: [sourceRef("3.12.7", 136, 98)],
  rows: [
    { year: 2010, allocation_rm_million: 25, approvedRateLabel: "2.5 (Tahunan) + 1 (Khas)", distributionMonthsLabel: "2–6" },
    { year: 2011, allocation_rm_million: 35, approvedRateLabel: "3 (Tahunan) + 1 (Khas)", distributionMonthsLabel: "2–6" },
    { year: 2012, allocation_rm_million: 38, approvedRateLabel: "3.5 (Tahunan) + 1 (Khas)", distributionMonthsLabel: "2.5–8" },
    { year: 2013, allocation_rm_million: 49, approvedRateLabel: "2.5–10", distributionMonthsLabel: "2.5–10" },
    { year: 2014, allocation_rm_million: 74, approvedRateLabel: "1–11 (Tahunan) + 2 (Khas)", distributionMonthsLabel: "1–11 + 2" },
    { year: 2015, allocation_rm_million: 65, approvedRateLabel: "1–10", distributionMonthsLabel: "1–10" },
    { year: 2016, allocation_rm_million: 25, approvedRateLabel: "1–3", distributionMonthsLabel: "1–3" },
    { year: 2017, allocation_rm_million: 56.7, approvedRateLabel: "1–6", distributionMonthsLabel: "1–6" },
    { year: 2018, allocation_rm_million: 10.8, approvedRateLabel: "1", distributionMonthsLabel: "1" },
    { year: 2019, allocation_rm_million: 11.6, approvedRateLabel: "1", distributionMonthsLabel: "1" },
    { year: 2020, allocation_rm_million: 14.1, approvedRateLabel: "1", distributionMonthsLabel: "1" },
  ],
  policyBaseline: {
    circular: "Pekeliling Perbendaharaan WP 7.2",
    ceilingMonthsNonExecutive: 2,
    ceilingNote:
      "Bagi anggota Bukan Eksekutif, siling purata pembayaran bonus sebagai panduan tidak lebih daripada dua bulan gaji; melebihi dua bulan boleh dipertimbangkan jika ramai pegawai menunjukkan prestasi cemerlang.",
    approvalChain: ["Lembaga LTH", "Menteri Hal Ehwal Agama", "Kementerian Kewangan (MOF)"],
    source: [sourceRef("3.12.2–3.12.6", 135, 97)],
  },
  cautions: [
    "Peruntukan 2015 dilaporkan sebagai RM65 juta di 3.12.7 tetapi RM61 juta di 3.12.10. Lihat `dataConflicts`.",
    "'Bulan' merujuk bulan gaji, bukan tempoh masa.",
  ],
};

export const bonusVersusProfit = {
  id: "bonus-vs-profit",
  unit: "RM juta",
  basis: "Justifikasi bonus: peratus keuntungan bersih tahun semasa.",
  factType: F,
  source: [sourceRef("3.12.10", 139, 101)],
  rows: [
    { year: 2013, netProfit_rm_million: 2634, bonusAllocation_rm_million: 49, bonusToProfit_pct: 1.9, distributionMonthsLabel: "2.5–10" },
    { year: 2014, netProfit_rm_million: 2979, bonusAllocation_rm_million: 74, bonusToProfit_pct: 2.5, distributionMonthsLabel: "1–11 (Tahunan) + 2 (Khas)" },
    { year: 2015, netProfit_rm_million: 3537, bonusAllocation_rm_million: 61, bonusToProfit_pct: 1.7, distributionMonthsLabel: "1–10" },
    { year: 2016, netProfit_rm_million: 2481, bonusAllocation_rm_million: 25, bonusToProfit_pct: 1.0, distributionMonthsLabel: "1–3" },
    { year: 2017, netProfit_rm_million: 2798, bonusAllocation_rm_million: 57, bonusToProfit_pct: 2.0, distributionMonthsLabel: "1–6" },
  ],
  reconciliationNotes: [
    "Nisbah yang disenaraikan menepati pengiraan bagi setiap tahun apabila menggunakan angka bonus dalam jadual INI (49/2,634=1.9%, 74/2,979=2.5%, 61/3,537=1.7%, 25/2,481=1.0%, 57/2,798=2.0%).",
    "Ini menunjukkan angka bonus 2015 yang konsisten dengan nisbah ialah RM61 juta, bukan RM65 juta.",
  ],
  cautions: [
    "Keuntungan bersih di sini (cth 2017: RM2,798 juta) BERBEZA daripada 'Profit for the year' PwC 2017 (RM3,412 juta). Laporan tidak menjelaskan perbezaan asas. Jangan gunakan kedua-duanya dalam carta yang sama tanpa nota.",
    "Suruhanjaya menyatakan pemberian bonus tinggi berlaku kerana penilaian aset berasaskan RAV menunjukkan LTH untung besar.",
  ],
};

export const bonusDistributionBands = {
  id: "bonus-distribution-bands",
  unit: "bulan gaji",
  basis: "Contoh pecahan agihan bonus mengikut prestasi (5 kumpulan).",
  factType: F,
  source: [sourceRef("3.12.8", 137, 99)],
  rows: [
    { band: "A", staffShare_pct: 5, months2014Label: "9–11", months2015Label: "8–10" },
    { band: "B", staffShare_pct: 15, months2014Label: "7–8", months2015Label: "6–7" },
    { band: "C", staffShare_pct: 60, months2014Label: "5–6", months2015Label: "4–5" },
    { band: "D", staffShare_pct: 15, months2014Label: "3–4", months2015Label: "2–3" },
    { band: "E", staffShare_pct: 5, months2014Label: "1", months2015Label: "1" },
  ],
  cautions: ["Hanya 2014 dan 2015 disediakan; jangan ekstrapolasi ke tahun lain."],
};

export const thPropertiesBonus2017 = {
  id: "thp-bonus-2017",
  unit: "RM",
  year: 2017,
  approvedBy: "Mesyuarat Exco TH Properties",
  approvalDate: "2017-04-12",
  attendees: [
    "Dato' Azizan bin Abd Rahman (Pengerusi)",
    "Dato' Roszali bin Othman",
    "Dato' Mohd Fazillah bin Mohd Ali",
    "Haji Abd Kadir bin Sahlan",
  ],
  justification:
    "Kejayaan projek 'The Bay Pavillion' di Australia yang disiapkan 2015 dan dijual sepenuhnya; sehingga Disember 2016 didakwa membawa pulangan AUD11.6 juta kepada TH Properties.",
  recipients: [
    { no: 1, name: "Datuk Azizan bin Abdul Rahman", amount_rm: 231000.0 },
    { no: 2, name: "Dato' Roszali bin Othman", amount_rm: 189750.0 },
    { no: 3, name: "Haji Abd Kadir bin Sahlan", amount_rm: 189750.0 },
    { no: 4, name: "Nik Badrul Hisham bin Nik Hassan", amount_rm: 99000.0 },
    { no: 8, name: "Anuarifaei bin Mustapa", amount_rm: 99000.0 },
    { no: 9, name: "Nur Adlan bin Taib", amount_rm: 99000.0 },
    { no: 10, name: "Zaidi bin Baharudin", amount_rm: 56100.0 },
    { no: 11, name: "Haji Mohamed Rahim bin Ismail", amount_rm: 52800.0 },
    { no: 12, name: "Aida binti Karim", amount_rm: 49500.0 },
    { no: 13, name: "Marhaizah binti Mohamed Yusuf", amount_rm: 49500.0 },
    { no: 14, name: "Dato' Mohd Fazillah bin Mohd Ali", amount_rm: 33000.0 },
  ],
  total_rm: 1148400.0,
  recipientCount: 11,
  factType: F,
  source: [sourceRef("3.12.19–3.12.22", 141, 103)],
  reconciliationNotes: [
    "Jumlah 11 baris = RM1,148,400 ✓ menepati jumlah yang dinyatakan laporan.",
    "Penomboran dalam sumber melompat (4 → 8 → …14) kerana artifak OCR, tetapi jumlah menepati, jadi senarai penerima adalah lengkap.",
  ],
};

export const thpAustraliaBonus2018 = {
  id: "thp-australia-bonus-2018",
  unit: "RM",
  year: 2018,
  approvedBy: "Lembaga Pengarah THP Australia Capital Sdn. Bhd.",
  approvalDate: "2018-04-23",
  ratifiedAtAgm: "2018-11-30",
  ratificationNote:
    "Resolusi Mesyuarat Agong dikemukakan tujuh bulan selepas resolusi Lembaga.",
  attendees: [
    "Dato' Roszali bin Othman",
    "Haji Abd Kadir bin Sahlan",
    "Nik Badrul Hisham bin Nik Hassan",
    "Anuarifaei bin Mustapa",
  ],
  justification:
    "Pengurusan berjaya memastikan operasi dan kewangan syarikat baik sehingga TH Properties memperoleh keuntungan sebelum cukai RM34.84 juta pada tahun 2017.",
  recipientComposition: "2 Pengarah, 2 bekas Pengarah, 6 pegawai",
  recipients: [
    { no: 1, name: "Dato' Azizan bin Abd Rahman", amount_rm: 167250.0 },
    { no: 2, name: "Dato' Roszali bin Othman", amount_rm: 176500.0 },
    { no: 3, name: "Haji Abd Kadir bin Sahlan", amount_rm: 176500.0 },
    { no: 4, name: "Nik Badrul Hisham bin Nik Hassan", amount_rm: 101500.0 },
    { no: 5, name: "Anuarifaei bin Mustapa", amount_rm: 101500.0 },
    { no: 6, name: "Nur Adlan bin Taib", amount_rm: 101500.0 },
    { no: 7, name: "Zaidi bin Baharudin", amount_rm: 63000.0 },
    { no: 8, name: "Aida binti Karim", amount_rm: 63000.0 },
    { no: 9, name: "Marhaizah binti Mohamed Yusuf", amount_rm: 63000.0 },
    { no: 10, name: "Haji Mohamed Rahim bin Ismail", amount_rm: 31250.0 },
  ],
  total_rm: 1045000.0,
  recipientCount: 10,
  factType: F,
  source: [sourceRef("3.12.23–3.12.26", 142, 104)],
  reconciliationNotes: ["Jumlah 10 baris = RM1,045,000 ✓"],
};

export const thPropertiesBonusLegalFindings = {
  id: "thp-bonus-legal",
  combinedTotal_rm: 2193400.0,
  combinedTotalReportedAs: "RM2.2 juta",
  lawFirmOpinion: "MD. Tajuddin & Co (dirujuk 2020)",
  findings: [
    "Kelulusan Mesyuarat Exco tidak mematuhi resolusi dan terma rujukan Lembaga Pengarah TH Properties bertarikh 19 Ogos 2015 — Exco tiada kuasa memutuskan transaksi yang memerlukan kelulusan pemegang saham.",
    "Kelulusan bayaran bonus 2017 tidak mematuhi Memorandum and Articles of Association dan gagal memperoleh resolusi pemegang saham seperti dikehendaki seksyen 230(2) Akta Syarikat 2016 (Akta 777).",
    "Bonus 2018: notifikasi kepada pemegang saham THP Australia berasaskan resolusi Mesyuarat Agong yang dikemukakan tujuh bulan selepas resolusi Lembaga — tidak mematuhi seksyen 230(3) Akta 777.",
  ],
  commissionConclusion: [
    "Bayaran bonus 2017 melanggar seksyen 230(2) dan 230(4) Akta 777.",
    "Bayaran bonus 2018 melanggar seksyen 230(3) Akta 777.",
    "Usaha perlu dibuat untuk mendapatkan semula bonus tersebut.",
  ],
  boardRecoveryDecisionDate: "2020-08-12",
  internalAuditReportDate: "2020-02-05",
  internalAuditReportTitle:
    "Payment of Special Appreciation Bonus to Certain Directors & Seven Staff Members",
  factType: F,
  source: [sourceRef("3.12.27–3.12.29 / 3.14.6(11)", 143, 105)],
};

/* ------------------------------------------------------------------ *
 * 5. PELAN PEMULIHAN & UJSB
 * ------------------------------------------------------------------ */

export const rescueOptions2018 = {
  id: "rescue-options-2018",
  evaluatedBy:
    "Jawatankuasa Khas: wakil Pejabat Perdana Menteri, BNM, MOF dan pengurusan kanan LTH",
  criteria: [
    "Melindungi kepentingan hampir 9.3 juta pendeposit LTH ketika itu",
    "Memastikan kelangsungan fungsi utama LTH iaitu pengurusan haji",
    "Mengembalikan keupayaan LTH mengagihkan hibah dengan mematuhi sepenuhnya Akta 535",
    "Mengurangkan impak kepada kedudukan fiskal negara",
  ],
  options: [
    {
      no: 1,
      title: "Suntikan dana / geran oleh Kerajaan",
      amountRequired_rm_billion: 10,
      amountNote: "Lebih RM10 bilion secara terus melalui geran tunai (MFRS 120).",
      rejectionReason:
        "Jumlah terlalu besar pada satu-satu masa; menjejaskan peruntukan projek pembangunan lain; mendedahkan Kerajaan kepada risiko penarafan ketika siling hutang negara pada 55% KDNK.",
      selected: false,
    },
    {
      no: 2,
      title: "Mengaktifkan jaminan Kerajaan di bawah seksyen 24 Akta 535",
      rejectionReason:
        "Solusi jangka pendek sahaja; tidak menutup jurang defisit malah menambah liabiliti LTH kerana ia menjadi hutang kepada Kerajaan.",
      selected: false,
    },
    {
      no: 3,
      title: "Mewujudkan aset tertunda (deferred asset) untuk mengagihkan kerugian ke masa hadapan",
      rejectionReason:
        "Tidak dibenarkan di bawah MFRS 9 — kerugian mesti direkod pada tahun semasa. LTH tetap tidak mampu mengagihkan hibah 2018.",
      selected: false,
    },
    {
      no: 4,
      title: "Memindahkan aset kurang berdaya saing kepada SPV",
      rationale:
        "Solusi jangka panjang; aset lemah digantikan instrumen berpendapatan lebih stabil pada nilai premium; berdasarkan model Danaharta Nasional Berhad (krisis 1998).",
      selected: true,
    },
  ],
  factType: F,
  source: [sourceRef("3.13.18–3.13.20", 152, 114)],
};

export const ujsb = {
  id: "ujsb",
  name: "Urusharta Jamaah Sdn. Bhd.",
  incorporatedDate: "2018-12-14",
  ownership: "Milik penuh Menteri Kewangan Diperbadankan",
  mandate: [
    "Melaksanakan pelan pemulihan",
    "Memaksimumkan nilai pemulihan aset",
    "Meneruskan kelangsungan operasi aset yang diambil alih",
  ],
  keyDates: [
    { date: "2018-11-30", event: "Jemaah Menteri bersetuju secara dasar terhadap rangka kerja Pelan Pemulihan" },
    { date: "2018-12-07", event: "Jemaah Menteri meluluskan Pelan Pemulihan dan Penstrukturan LTH; arahan laksana sebelum akhir 2018" },
    { date: "2018-12-14", event: "UJSB ditubuhkan" },
    { date: "2018-12-19", event: "Perdana Menteri meluluskan pemindahan aset berprestasi rendah kepada SPV" },
    { date: "2018-12-27", event: "Perjanjian Pemindahan Aset ditandatangani" },
    { date: "2019-05-15", event: "Perjanjian Langganan Sukuk dan Perjanjian Hak Penolakan Pertama dimeterai" },
    { date: "2019-05-27", event: "Surat Sokongan Kewangan Menteri Kewangan Diperbadankan (bukan jaminan penuh)" },
  ],
  executionWindowNote:
    "LTH mempunyai kurang dari dua minggu untuk memuktamadkan pelan tersebut selepas kelulusan 7 Disember 2018.",
  factType: F,
  source: [sourceRef("3.13.1–3.13.23", 145, 107)],
};

export const assetTransfer = {
  id: "asset-transfer",
  unit: "RM juta",
  transferDate: "2018-12-27",
  scope: "106 saham tersenarai, sebuah syarikat perladangan, dan 29 aset hartanah",
  factType: F,
  source: [sourceRef("3.13.29", 159, 121)],
  rows: [
    { assetClass: "Hartanah dan tanah", bookValue_rm_million: 1411, transferValue_rm_million: 2247, marketValue_rm_million: 1411 },
    { assetClass: "Syarikat perladangan", bookValue_rm_million: 718, transferValue_rm_million: 802, marketValue_rm_million: 718 },
    { assetClass: "Ekuiti (tersenarai di Bursa Malaysia)", bookValue_rm_million: 16852, transferValue_rm_million: 16851, marketValue_rm_million: 7600 },
  ],
  totals: { bookValue_rm_million: 18981, transferValue_rm_million: 19900, marketValue_rm_million: 9729 },
  premiumOverMarket_rm_million: 10171,
  premiumOverMarketReportedAs: "RM10.2 bilion",
  reconciliationNotes: [
    "1,411 + 718 + 16,852 = 18,981 ✓ ; 2,247 + 802 + 16,851 = 19,900 ✓ ; 1,411 + 718 + 7,600 = 9,729 ✓",
    "19,900 − 9,729 = 10,171 ≈ RM10.2 bilion seperti dinyatakan laporan ✓",
    "Nilai pemindahan RM19.9 bilion = Sukuk Siri 1 (RM10.0b) + Sukuk Siri 2 (RM9.6b) + tunai (RM0.3b) ✓",
  ],
  cautions: [
    "Untuk hartanah dan perladangan, lajur 'nilai pasaran' sama dengan lajur 'nilai buku'. Laporan tidak menjelaskan sama ada ini bermakna nilai pasaran = nilai buku, atau nilai pasaran tidak ditentukan secara berasingan. Jangan tafsir jurang premium sebagai jurang berasaskan pasaran untuk kelas aset ini.",
    "Jurang RM10.2 bilion hampir sepenuhnya datang daripada ekuiti tersenarai (16,851 vs 7,600 = 9,251).",
  ],
};

export const propertyTransferDetail = {
  id: "property-transfer-detail",
  unit: "RM (penuh)",
  areaUnit: "kaki persegi",
  marketValueAsOf: "2021-12-31",
  valuer: "Jurunilai bebas bertauliah",
  factType: F,
  source: [sourceRef("3.13.34", 161, 123)],
  rows: [
    { assetType: "Tanah", area_sqft: 1353361.48, transferValue_rm: 627006479.0, marketValueDec2021_rm: 401080000.0 },
    { assetType: "Menara pejabat", area_sqft: 354021, transferValue_rm: 737399698.0, marketValueDec2021_rm: 325000000.0 },
    { assetType: "Lot kedai", area_sqft: 120062, transferValue_rm: 46301759.0, marketValueDec2021_rm: 33330000.0 },
    { assetType: "Hotel", area_sqft: 354134, transferValue_rm: 804058625.0, marketValueDec2021_rm: 424270000.0 },
    { assetType: "Perindustrian", area_sqft: 35019, transferValue_rm: 31914386.0, marketValueDec2021_rm: 19000000.0 },
  ],
  totals: { area_sqft: 2216597.48, transferValue_rm: 2246680947.0, marketValueDec2021_rm: 1202680000.0 },
  reconciliationNotes: [
    "Jumlah lajur menepati baris ✓ (2,246,680,947 dan 1,202,680,000).",
    "Baris 'Hotel' RM804,058,625 sepadan dengan nilai pemindahan hotel & kompleks haji THHR RM804.1 juta yang disebut di 3.14.6(13) — pautan silang yang sah.",
    "Jumlah nilai pemindahan RM2,246.7 juta sepadan dengan baris 'Hartanah dan tanah' RM2,247 juta dalam jadual `assetTransfer` ✓",
  ],
  jppmComparison: {
    propertiesBelowJppmValuation: 11,
    totalProperties: 29,
    netAboveJppm_rm_million: 543.65,
    janQuote:
      "Secara keseluruhannya, nilai pindahan hartanah adalah melebihi penilaian JPPHM sejumlah RM543.65 juta walaupun pindahan bagi 11 daripada 29 hartanah adalah lebih rendah daripada nilaian JPPHM.",
    lthResponse:
      "Penilaian hartanah tahunan dilaksanakan oleh jurunilai bebas profesional bertauliah dan tidak perlu dilaksanakan oleh JPPHM bagi memenuhi piawaian MFRS semasa. LTH juga tiada akses kepada penilaian JPPHM pada masa pemindahan.",
    source: [sourceRef("3.13.30–3.13.33", 159, 121)],
  },
  cautions: [
    "Perbandingan nilai pemindahan (Dis 2018) dengan nilai pasaran (Dis 2021) merangkumi kesan pandemik Covid-19 ke atas pasaran hartanah domestik. Ia bukan ukuran tulen ketepatan penilaian asal.",
  ],
};

export const bluechipTransfer = {
  id: "bluechip-transfer",
  unit: "RM (penuh)",
  transferredBefore: "2018-12-31",
  marketValueAsOf: "2018-12-31",
  criteria:
    "Saham mewah (bluechips) yang mengalami kejatuhan nilai melebihi 20% atau kejatuhan melebihi RM45 juta, atau diklasifikasikan tidak patuh syariah.",
  factType: F,
  source: [sourceRef("3.13.37", 162, 124)],
  rows: [
    { ticker: "Axiata", transferPricePerUnit_rm: 6.0, marketPricePerUnit_rm: 3.63, priceDrop_pct: -39.5, transferValue_rm: 1422605154, marketValue_rm: 931803255, valueDrop_rm: -490801899 },
    { ticker: "Maxis", transferPricePerUnit_rm: 6.84, marketPricePerUnit_rm: 5.43, priceDrop_pct: -20.6, transferValue_rm: 879395994, marketValue_rm: 681197584, valueDrop_rm: -198198410 },
    { ticker: "MISC", transferPricePerUnit_rm: 7.43, marketPricePerUnit_rm: 6.15, priceDrop_pct: -17.2, transferValue_rm: 486532216, marketValue_rm: 438925710, valueDrop_rm: -47606506 },
    { ticker: "Digi", transferPricePerUnit_rm: 5.13, marketPricePerUnit_rm: 4.24, priceDrop_pct: -17.3, transferValue_rm: 576240738, marketValue_rm: 500328955, valueDrop_rm: -75911783 },
    { ticker: "TM", transferPricePerUnit_rm: 5.96, marketPricePerUnit_rm: 2.33, priceDrop_pct: -60.9, transferValue_rm: 241202959, marketValue_rm: 107650200, valueDrop_rm: -133552759 },
  ],
  totals: { transferValue_rm: 3605977061, marketValue_rm: 2659905704, valueDrop_rm: -946071357 },
  laterPrices: {
    asOf: "2022-06-08",
    prices_rm: { Axiata: 3.04, Maxis: 3.52, MISC: 7.3, Digi: 3.27, TM: 5.2 },
    commissionFinding:
      "Harga pasaran semasa bagi saham-saham di atas masih di bawah harga pemindahan.",
    source: [sourceRef("3.13.38–3.13.39", 163, 125)],
  },
  nonShariahCompliantBluechips: [
    "YTL Power International Berhad",
    "Bumi Armada Berhad",
    "Integrated Logistics Berhad",
    "Yi-Lai Berhad",
  ],
  reconciliationNotes: [
    "Lajur jumlah menepati baris ✓ (3,605,977,061 / 2,659,905,704 / −946,071,357).",
    "Peratus kejatuhan HARGA SEUNIT menepati pengiraan bagi kelima-lima kaunter ✓",
  ],
  cautions: [
    "PENTING: lajur nilai agregat TIDAK boleh direkonsiliasikan dengan harga seunit. Contoh: 1,422,605,154 ÷ 6.00 = 237.1 juta unit, tetapi 931,803,255 ÷ 3.63 = 256.7 juta unit. Bilangan unit tersirat berbeza antara dua lajur. Oleh itu bilangan unit TIDAK boleh diterbitkan daripada jadual ini, dan peratus kejatuhan nilai agregat (cth TM −55.4%) berbeza daripada peratus kejatuhan harga seunit (TM −60.9%).",
    "MISC (−17.2%) dan Digi (−17.3%) tidak memenuhi kriteria 'kejatuhan melebihi 20%' — kemungkinan dimasukkan atas kriteria 'kejatuhan melebihi RM45 juta'. Laporan tidak menyatakan kriteria mana yang terpakai bagi setiap kaunter.",
    "Ini hanya 5 daripada 106 kaunter yang dipindahkan. Ia bukan sampel wakil.",
  ],
};

export const sukukSeries = {
  id: "ujsb-sukuk",
  instrument: "Sukuk Murabahah berkupon sifar (zero coupon), dilanggan sepenuhnya oleh LTH",
  registration:
    "Didaftarkan di bawah Suruhanjaya Sekuriti Malaysia tetapi TIDAK diberi penarafan, TIDAK boleh diniagakan, TIDAK boleh dipindah milik, dan merupakan unsecured zero coupon.",
  factType: F,
  source: [sourceRef("3.13.41 / 3.13.62", 163, 125)],
  series: [
    {
      id: "siri-1",
      label: "Sukuk Siri 1",
      principal_rm_billion: 10.0,
      nominalValue_rm_billion: 13.2,
      tenorYears: 7,
      yieldToMaturity_pct: 4.05,
      maturityYear: 2026,
    },
    {
      id: "siri-2",
      label: "Sukuk Siri 2",
      principal_rm_billion: 9.6,
      nominalValue_rm_billion: 14.3,
      tenorYears: 10,
      yieldToMaturity_pct: 4.1,
      maturityYear: 2029,
    },
  ],
  cashPayment: {
    total_rm_million: 300,
    purpose:
      "Pengambilan saham yang tidak patuh syariah (Bumi Armada, Integrated Logistics, Yi-Lai, YTL Power International) — Sukuk berteraskan syariah tidak boleh digunakan untuk ini.",
    tranches: [
      { date: "2019-12-30", amount_rm_million: 100 },
      { date: "2020-12-30", amount_rm_million: 200 },
    ],
  },
  totalObligation_rm_billion: 27.5,
  totalObligationAlternateFigure_rm_billion: 27.56,
  totalObligationNote:
    "Laporan menggunakan 'RM27.5 bilion' dalam naratif tetapi Perjanjian Sukuk disebut sebagai 'langganan RM27.56 bilion' (3.13.23(d)). Nilai nominal 13.2 + 14.3 = 27.5.",
  deferredYieldComponent_rm_billion: 7.65,
  deferredYieldNote:
    "Obligasi RM27.5 bilion termasuk kadar keuntungan bagi bayaran tertunggak oleh Kerajaan kepada LTH sebanyak RM7.65 bilion.",
  reconciliationNotes: [
    "10.0 + 9.6 + 0.3 = RM19.9 bilion = nilai pemindahan aset ✓",
    "Semakan hasil: 10.0 × (1.0405)^7 = 13.20 ✓ ; 9.6 × (1.041)^10 = 14.35 ≈ 14.3 ✓ — kadar YTM yang dinyatakan konsisten dengan nilai nominal dan tempoh.",
    "27.55 − 19.9 = 7.65 ✓ menyokong angka RM27.55/27.56 bilion sebagai jumlah tepat.",
  ],
  redemptionOptions: [
    "Tunai",
    "Pemindahan semula aset-aset LTH (redemption in-kind via LTH assets)",
    "Pemindahan aset-aset Kerajaan termasuk saham syarikat atau hartanah (redemption in-kind via Government assets)",
  ],
  guaranteeStatus: {
    governmentGuaranteed: false,
    instrument: "Surat Sokongan Kewangan Menteri Kewangan bertarikh 27 Mei 2019 (Letter of Comfort)",
    legalBasis: "Seksyen 14 Akta 61",
    listedInGuaranteeCommitments: true,
    source: [sourceRef("3.13.45", 164, 126)],
  },
  issuanceYearConflict:
    "Laporan menyebut Sukuk 'diterbitkan pada tahun 2018' (3.13.63) dan juga 'diterbitkan pada tahun 2019' (3.13.45). Perjanjian Langganan Sukuk bertarikh 15 Mei 2019.",
};

export const sukukAccrual = {
  id: "sukuk-accrual",
  annualDeferredIncome_rm_million: 840,
  cumulativeDeferredIncome_rm_billion: 2.1,
  cumulativeAsOf: "2021-12-31",
  cumulativeQualifier: "melebihi",
  shareOfLthAnnualIncome_pct: 26,
  shareOfLthAnnualIncomeQualifier: "hampir",
  shareOfAnnualHibahDistribution: "melebihi satu pertiga",
  shareOfTotalLthAssets_pct: 31,
  shareOfTotalLthAssetsQualifier: "hampir",
  accountingBasis:
    "Pengakruan mematuhi MFRS 9 dan memenuhi ujian 'Solely Payments on Principal and Interest'.",
  commissionConcern:
    "Keuntungan Sukuk yang diagihkan kepada LTH tidak dibayar secara tunai. Pengagihan keuntungan LTH bertukar kepada tanggungan/liabiliti apabila ia menjadi sebahagian deposit baharu.",
  hurdleRate: {
    definition: "Islamic Fixed Deposit Rate + 75 mata asas",
    riskNote:
      "Jika inflasi melebihi 4% dan kadar asas melonjak melebihi 4%, kadar tetap Sukuk (4.05% dan 4.10%) menyebabkan LTH tidak berupaya mencapai kadar halangan ini.",
  },
  factType: F,
  source: [sourceRef("3.13.60 / 3.13.62 / 3.13.67", 170, 132)],
  derivedChecks: [
    "Jika RM27.5 bilion ≈ 31% aset LTH, maka jumlah aset ≈ RM88.7 bilion — konsisten dengan saiz deposit RM88 bilion.",
    "RM840 juta ÷ hibah 2020 (RM2,242 juta) = 37.5% — konsisten dengan 'melebihi satu pertiga'.",
    "Kupon tahunan tersirat tahun pertama: 10.0 × 4.05% + 9.6 × 4.10% ≈ RM799 juta, meningkat setiap tahun kerana pengkompaunan — konsisten dengan RM840 juta.",
  ],
};

export const governmentFunding = {
  id: "government-funding",
  cabinetApprovalDate: "2019-04-05",
  totalApproved_rm_billion: 17.8,
  totalApprovedQualifier: "sekurang-kurangnya",
  breakdown: [
    { plan: "RMK-11", year: 2020, amount_rm_million: 500 },
    {
      plan: "RMK-12 & RMK-13",
      years: "2021–2030",
      amount_rm_billion: 17.3,
      annualAverage_rm_billion: 1.73,
      qualifier: "sekurang-kurangnya",
    },
  ],
  actualReceived: [
    {
      year: 2020,
      amount_rm_million: 500,
      form: "Geran Kerajaan",
      usage: [
        { amount_rm_million: 300, purpose: "Bayaran kepada LTH bagi saham yang berubah taraf patuh syariah" },
        { amount_rm_million: 200, purpose: "Penebusan awal Sukuk UJSB kepada LTH pada 30 November 2020" },
      ],
    },
    {
      year: 2021,
      amount_rm_billion: 1.5,
      received: false,
      note:
        "UJSB TIDAK menerima suntikan RM1.5 bilion yang diperuntukkan dalam Belanjawan 2021. Alasan Kerajaan: keutamaan diberi kepada perbelanjaan pemulihan ekonomi ekoran Covid-19.",
    },
  ],
  cashReceivedByLthToDate_rm_million: 500,
  cashReceivedComparison:
    "RM500 juta tunai berbanding nilai perpindahan aset RM9.73 bilion (nilai pasaran).",
  reconciliationNotes: ["17.3 ÷ 1.73 = 10 tahun ✓"],
  factType: F,
  source: [sourceRef("3.13.46–3.13.49", 165, 127)],
};

export const guaranteeCommitments = {
  id: "guarantee-commitments",
  unit: "RM juta",
  tableTitle: "Komitmen Jaminan, 2020–2021",
  tableTitleNote: "Tajuk asal tertera '2021–2021' — ralat OCR.",
  documentSource: "Tinjauan Fiskal & Anggaran Hasil Kerajaan Persekutuan (tahunan)",
  footnote: "¹ Angka 2021 adalah anggaran/awalan seperti dalam dokumen asal.",
  factType: F,
  source: [sourceRef("3.13.45", 165, 127)],
  rows: [
    { entity: "DanaInfra Nasional Berhad", y2020_rm_million: 72320, y2021_rm_million: 76020, share2020_pct: 38.9, share2021_pct: 39.9 },
    { entity: "Prasarana Malaysia Berhad", y2020_rm_million: 38914, y2021_rm_million: 38914, share2020_pct: 21.0, share2021_pct: 20.4 },
    { entity: "Malaysia Rail Link Sdn. Bhd.", y2020_rm_million: 21530, y2021_rm_million: 23177, share2020_pct: 11.6, share2021_pct: 12.2 },
    { entity: "Urusharta Jamaah Sdn. Bhd.", y2020_rm_million: 20683, y2021_rm_million: 21097, share2020_pct: 11.1, share2021_pct: 11.1, highlight: true },
    { entity: "Suria Strategic Energy Resources Sdn. Bhd.", y2020_rm_million: 6951, y2021_rm_million: 7276, share2020_pct: 3.7, share2021_pct: 3.8 },
    { entity: "GovCo Holdings Berhad", y2020_rm_million: 7200, y2021_rm_million: 5700, share2020_pct: 3.9, share2021_pct: 3.0 },
    { entity: "Jambatan Kedua Sdn. Bhd.", y2020_rm_million: 5528, y2021_rm_million: 5514, share2020_pct: 3.0, share2021_pct: 2.9 },
    { entity: "Turus Pesawat Sdn. Bhd.", y2020_rm_million: 5310, y2021_rm_million: 5310, share2020_pct: 2.9, share2021_pct: 2.8 },
    { entity: "MKD Kencana Sdn. Bhd.", y2020_rm_million: 3500, y2021_rm_million: 4500, share2020_pct: 1.9, share2021_pct: 2.4 },
    { entity: "SRC Kencana Sdn. Bhd.", y2020_rm_million: 2485, y2021_rm_million: 1785, share2020_pct: 1.4, share2021_pct: 0.9 },
    { entity: "Sentuhan Budiman Sdn. Bhd.", y2020_rm_million: 800, y2021_rm_million: 750, share2020_pct: 0.4, share2021_pct: 0.4 },
    { entity: "TRX City Sdn. Bhd.", y2020_rm_million: 253, y2021_rm_million: 192, share2020_pct: 0.1, share2021_pct: 0.1 },
    { entity: "Assets Global Network Sdn. Bhd.", y2020_rm_million: 253, y2021_rm_million: 202, share2020_pct: 0.1, share2021_pct: 0.1 },
  ],
  totals: { y2020_rm_million: 185727, y2021_rm_million: 190437, share2020_pct: 100.0, share2021_pct: 100.0 },
  reconciliationNotes: ["Jumlah lajur 2020 dan 2021 menepati baris ✓"],
  cautions: [
    "Angka UJSB dalam jadual ini (RM20.68b / RM21.10b) ialah nilai komitmen jaminan pada tarikh laporan fiskal, BUKAN nilai matang Sukuk RM27.5 bilion. Kedua-duanya bukan perkara yang sama.",
  ],
};

export const ujsbDisposals = {
  id: "ujsb-disposals",
  factType: F,
  source: [sourceRef("3.13.51–3.13.57", 167, 129)],
  property: {
    soldCount: 1,
    soldDetail: {
      location: "Mukim Sungai Segamat, Daerah Segamat, Johor",
      year: 2020,
      method: "Tender terbuka",
      value_rm: 920000,
    },
    offeredForTender: 19,
    rofrReleased: 18,
    rofrInitiallyRetained: "Sebidang tanah di Jalan Hill, Seremban (kemudian juga dilepaskan)",
    unsoldAfterTender: 17,
    stillToBeOfferedToLth: 10,
  },
  equities: {
    transferredCounters: 106,
    disposedCounters: 75,
    reinvestedCounters: 329,
    reinvestmentNote:
      "UJSB melabur semula dalam 329 kaunter saham tersenarai dalam negara dan pasaran antarabangsa.",
    disposalBasis: "Klausa 3.1, Perjanjian Hak Penolakan Pertama — dijual pada harga pasaran semasa.",
  },
  plantation: {
    entity: "Syarikat perladangan kelapa sawit di Sri Aman, Sarawak",
    rofrNoticeDate: "2020-01-07",
    rofrMinimumPrice_rm_million: 280,
    lthDeclinedDate: "2020-01-24",
  },
  ujsbPortfolioIncome_rm_million_range: [200, 300],
  ujsbPortfolioIncomeNote:
    "Pendapatan tahunan hasil penstrukturan portfolio, mencukupi untuk menampung operasi UJSB tanpa suntikan modal kerja Kerajaan.",
  ujsbLoss2019_rm_billion: 9.9,
  ujsbLoss2019Note:
    "UJSB menanggung kerugian RM9.9 bilion bagi tahun berakhir 2019 kerana perbezaan nilai pemindahan dan nilai pasaran semasa aset.",
};

export const rofrOffers = {
  id: "rofr-offers",
  unit: "RM seunit",
  basis: "Tawaran Hak Penolakan Pertama kepada LTH oleh UJSB.",
  factType: F,
  source: [sourceRef("3.13.57", 169, 131)],
  rows: [
    { ticker: "WENG MK", company: "WZ Satu", date: "2020-03-24", shares: 25999115, rofrPrice_rm: 0.09, marketPrice_rm: 0.064, premium_pct: 40.6 },
    { ticker: "EAST MK", company: "Eastern & Oriental", date: "2020-03-25", shares: 46400000, rofrPrice_rm: 0.365, marketPrice_rm: 0.335, premium_pct: 9.0 },
    { ticker: "WENG MK", company: "WZ Satu", date: "2020-03-31", shares: 16570923, rofrPrice_rm: 0.085, marketPrice_rm: 0.075, premium_pct: 13.3 },
    { ticker: "WCTHG MK", company: "WCT Holdings", date: "2020-04-02", shares: 42477625, rofrPrice_rm: 0.4, marketPrice_rm: 0.377, premium_pct: 6.1 },
    { ticker: "KSL MK", company: "KSL Holdings", date: "2020-05-06", shares: 71800000, rofrPrice_rm: 0.61, marketPrice_rm: 0.63, premium_pct: -3.2 },
    { ticker: "KSL MK", company: "KSL Holdings", date: "2020-05-21", shares: 35900000, rofrPrice_rm: 0.58, marketPrice_rm: 0.605, premium_pct: -4.1 },
    { ticker: "HAPL MK", company: "Hap Seng Plantations", date: "2020-05-29", shares: 66074500, rofrPrice_rm: 1.65, marketPrice_rm: 1.57, premium_pct: 5.1 },
    { ticker: "FGV MK", company: "FGV Holdings", date: "2020-12-09", shares: 283710100, rofrPrice_rm: 1.3, marketPrice_rm: 1.27, premium_pct: 2.4 },
    { ticker: "ILB MK", company: "Integrated Logistics", date: "2022-03-14", shares: 20500000, rofrPrice_rm: 0.38, marketPrice_rm: 0.365, premium_pct: 4.1 },
  ],
  commissionFinding:
    "Saham yang ditawarkan melalui ROFR ditawarkan pada harga premium berbanding nilai pasaran semasa; LTH boleh membeli saham yang sama di pasaran terbuka pada harga lebih rendah.",
  reconciliationNotes: [
    "Peratus premium menepati (rofrPrice ÷ marketPrice − 1) untuk semua sembilan baris ✓ (dua baris KSL adalah diskaun, bukan premium).",
    "Baris FGV 283,710,100 syer sepadan dengan bilangan syer FGV yang diambil alih UJSB di 3.14.6(14) — pautan silang yang sah.",
  ],
  cautions: [
    "Ini bukan senarai lengkap tawaran ROFR; ia contoh yang dikemukakan kepada Suruhanjaya.",
    "Tarikh tersebar antara Mac 2020 dan Mac 2022 — sebahagian besar semasa kemuncak kejatuhan pasaran Covid-19.",
  ],
};

/* ------------------------------------------------------------------ *
 * 6. DEPOSIT DAN PENDEPOSIT
 * ------------------------------------------------------------------ */

export const depositTrajectory = {
  id: "deposit-trajectory",
  unit: "RM bilion",
  factType: F,
  source: [sourceRef("3.9.29–3.9.30 / 3.13.50 / 3.17.20", 122, 84)],
  points: [
    {
      asOf: "2018-12",
      label: "Sebelum pengumuman hibah 2018",
      deposits_rm_billion: 73,
      qualifier: "kira-kira",
    },
    { asOf: "2019-12-31", label: "Akhir 2019 (selepas hibah 1.25%)", deposits_rm_billion: 69 },
    { asOf: "2020-12-31", label: "Akhir 2020", deposits_rm_billion: 76, qualifier: "lebih kurang" },
    { asOf: "2022-05-21", label: "Setakat 21 Mei 2022", deposits_rm_billion: 88, qualifier: "melebihi" },
  ],
  projection: {
    value_rm_billion: 100,
    horizon: "dalam tempoh dua tahun",
    factType: "reportProjection",
    note: "Unjuran LTH/Suruhanjaya, bukan angka sejarah.",
  },
  contraction2019: {
    drop_rm_billion: 4,
    drop_pct: -5.5,
    driver: "Pengumuman kadar hibah 1.25% bagi tahun 2018",
    concentration: "Terutamanya dalam kalangan pendeposit yang mempunyai deposit besar",
    commissionNote:
      "LTH bernasib baik kerana jumlah pengeluaran dan kesannya lebih kecil daripada apa yang dikhuatiri.",
  },
  cautions: [
    "Hanya empat titik data — jangan lukis garis trend yang mengandaikan pergerakan licin antara titik.",
    "Titik 2018 adalah 'kira-kira RM73 bilion' tanpa tarikh tepat.",
  ],
};

export const depositorCounts = {
  id: "depositor-counts",
  factType: F,
  source: [sourceRef("3.13.14 / 3.13.18 / BAB EMPAT ¶4.2", 150, 112)],
  points: [
    { asOf: "2018", count_million: 9.2, qualifier: "lebih", context: "Ketika pelan pemulihan dirangka" },
    { asOf: "2018", count_million: 9.3, qualifier: "hampir", context: "Kriteria Jawatankuasa Khas" },
    { asOf: "2022-07-22", count_million: 8.6, context: "Jumlah pendeposit sehingga 22 Julai 2022" },
  ],
  openQuestion:
    "Bilangan pendeposit menurun daripada ~9.2–9.3 juta (2018) kepada 8.6 juta (2022) — penurunan ~0.6–0.7 juta — pada masa yang sama jumlah deposit meningkat daripada RM73b kepada RM88b. Laporan TIDAK menerangkan sebab penurunan bilangan akaun. Jangan andaikan ia bermakna pengeluaran besar-besaran.",
  cautions: [
    "Dua angka 2018 (9.2 dan 9.3 juta) datang daripada perenggan berbeza dengan kelayakan berbeza ('lebih' vs 'hampir'). Layan sebagai julat, bukan dua titik data.",
  ],
};

export const depositConcentration = {
  id: "deposit-concentration",
  factType: F,
  source: [sourceRef("3.16.14 / 3.17.15(b)", 207, 169)],
  facts: [
    {
      statement: "65% pendeposit mempunyai deposit RM2,000 atau kurang dalam akaun mereka.",
      value_pct: 65,
      threshold_rm: 2000,
      metric: "peratus pendeposit",
    },
    {
      statement: "Dianggarkan 75% deposit di LTH dimiliki oleh hanya 5% daripada pendepositnya.",
      value_pct: 75,
      holderShare_pct: 5,
      metric: "peratus nilai deposit",
      factType: "thirdPartyEstimate",
      qualifier: "dianggarkan",
    },
  ],
  minimumFundToSustainSubsidy_rm_billion: 60,
  minimumFundNote:
    "LTH memerlukan dana minima RM60 bilion untuk menampung subsidi haji pada tahap sekarang; apabila kos subsidi meningkat, dana yang lebih besar diperlukan dan kebergantungan kepada pendeposit besar bertambah.",
  cautions: [
    "Kedua-dua angka ini ialah titik tunggal tanpa taburan penuh. Tiada data deciles/quantiles dalam laporan — histogram taburan deposit TIDAK boleh dibina.",
  ],
};

export const reservePolicy = {
  id: "reserve-policy",
  factType: F,
  source: [sourceRef("3.7.6–3.7.11", 104, 66)],
  statutoryGap:
    "Perbendaharaan tidak pernah meluluskan apa-apa baki minima dalam Kumpulan Wang Rizab LTH sebelum keuntungan boleh diagihkan, walaupun terdapat wakil Perbendaharaan dalam Lembaga. Tiada mekanisme diwujudkan untuk menilai polisi rizab LTH.",
  policy2019: {
    year: 2019,
    statutoryReserveAnnualTransfer_pct: 0.1,
    profitEqualisationReserveTarget_pct_of_nav: 5,
    profitEqualisationReserveTarget_rm_billion: 3.5,
    targetBasis: "Rekod turun naik nilai aset bersih LTH antara tahun 2010 hingga 2018",
    fundingRule: "Memindahkan 2% daripada keuntungan tahun semasa selepas zakat ke akaun RPK",
    permittedUse:
      "Hanya untuk membiayai pengagihan hibah bagi mengekalkan tahap deposit dan menampung jika berlaku pengeluaran deposit besar-besaran.",
    derivedNote:
      "Jika RM3.5 bilion = 5% NAV, maka NAV tersirat ≈ RM70 bilion — konsisten dengan skala LTH pada 2019.",
  },
  reserveUsedForHibah: {
    yearsPerRolandBerger: [2012, 2014, 2016],
    rbFinding: "Arah aliran rizab yang menurun selepas tahun 2016.",
    yearsPerCommission: [2020, 2021],
    commissionFinding:
      "LTH telah menggunakan rizab yang ada bagi menampung pengagihan hibah kepada pendeposit dalam tahun 2020 dan 2021.",
  },
  pressureFactors: [
    "Pertambahan saiz dana LTH",
    "Kadar faedah yang meningkat yang akan meningkatkan kadar pulangan asas deposit perbankan Islam",
    "Rosot nilai aset-aset lemah yang masih dimiliki oleh LTH",
  ],
  targetSpreadOverIslamicBanks_bps: [50, 100],
  cautions: [
    "Laporan TIDAK memberikan siri masa nilai rizab (RM) untuk mana-mana tahun. Carta 'trend rizab' tidak boleh dibina — hanya pernyataan kualitatif.",
  ],
};

export const shariahContractChanges = {
  id: "shariah-contract-changes",
  factType: F,
  source: [sourceRef("3.7.13–3.7.24", 106, 68)],
  timeline: [
    {
      year: 1979,
      contract: "Mudarabah",
      trigger:
        "Keputusan Jawatankuasa Fatwa Majlis Kebangsaan: LTH perlu membayar zakat bagi pihak pendeposit daripada aktiviti pelaburan dan perniagaan sebelum agihan hibah.",
      issue:
        "Tiada dokumen akad antara LTH dengan pendeposit; rukun penting Mudarabah iaitu kadar pembahagian keuntungan (profit sharing ratio) tidak ditemui dalam mana-mana dokumen.",
    },
    {
      year: 2016,
      contract: "Wadi'ah Yad Dhamanah",
      trigger:
        "Tiada penjelasan mengapa perubahan dilakukan; Suruhanjaya mendapati antara faktornya ialah LTH mula menggunakan sebahagian keuntungan pelaburan untuk membiayai subsidi.",
      issue:
        "LTH menjadi peminjam kepada deposit. Zakat yang dibayar LTH hanya mewakili zakat perniagaan LTH sendiri; pendeposit sepatutnya membayar zakat simpanan 2.5%. Akta 535 pula tidak membenarkan LTH meminjam. Tiada kajian menyeluruh dilaksanakan sebelum perubahan.",
    },
    {
      month: "2019-12",
      contract: "Wakalah",
      trigger: "Kajian menyeluruh untuk menyelaraskan dengan model perniagaan LTH.",
      resolution:
        "LTH menjadi ejen pendeposit untuk menguruskan dana bagi pelaburan, subsidi, kos pengurusan dan zakat perniagaan. Mengembalikan hubungan LTH–pendeposit kepada kedudukan dalam Akta 535.",
    },
  ],
  zakatRates: { savingsZakat_pct: 2.5, businessZakatNote: "Formula zakat perniagaan menghasilkan nilai zakat lebih rendah daripada zakat simpanan." },
  bnmConcernLetterDate: "2019-06-26",
  cautions: [
    "Laporan tidak memberikan sebarang angka RM untuk zakat yang dibayar LTH pada mana-mana tahun. Kesan kewangan perubahan akad TIDAK boleh dikira.",
  ],
};

/* ------------------------------------------------------------------ *
 * 7. HAJI, KOS DAN HAFIS
 * ------------------------------------------------------------------ */

export const hafisActual = {
  id: "hafis-actual",
  unit: "RM seorang; jumlah dalam RM juta",
  basis: "Perbandingan kos haji, bayaran haji dan HAFIS bagi jemaah Muassasah.",
  factType: F,
  source: [sourceRef("3.16.3", 203, 165)],
  rows: [
    { year: 2014, hajjCost_rm: 16155, pilgrimPayment_rm: 9980, pilgrimPaymentShare_pct: 62, hafisPerPerson_rm: 6175, hafisShare_pct: 38, hafisTotal_rm_million: 106 },
    { year: 2015, hajjCost_rm: 17270, pilgrimPayment_rm: 9980, pilgrimPaymentShare_pct: 58, hafisPerPerson_rm: 7290, hafisShare_pct: 42, hafisTotal_rm_million: 135 },
    { year: 2016, hajjCost_rm: 18890, pilgrimPayment_rm: 9980, pilgrimPaymentShare_pct: 53, hafisPerPerson_rm: 8910, hafisShare_pct: 47, hafisTotal_rm_million: 160 },
    { year: 2017, hajjCost_rm: 19550, pilgrimPayment_rm: 9980, pilgrimPaymentShare_pct: 51, hafisPerPerson_rm: 9570, hafisShare_pct: 49, hafisTotal_rm_million: 298 },
    { year: 2018, hajjCost_rm: 22450, pilgrimPayment_rm: 9980, pilgrimPaymentShare_pct: 44, hafisPerPerson_rm: 12470, hafisShare_pct: 56, hafisTotal_rm_million: 314 },
    { year: 2019, hajjCost_rm: 22900, pilgrimPayment_rm: 9980, pilgrimPaymentShare_pct: 44, hafisPerPerson_rm: 12920, hafisShare_pct: 56, hafisTotal_rm_million: 299 },
  ],
  noPilgrimageYears: [2020, 2021],
  noPilgrimageNote: "Tiada penghantaran jemaah haji pada tahun 2020 dan 2021 (Covid-19).",
  paymentFreeze: {
    amount_rm: 9980,
    from: 2009,
    to: 2021,
    years: 13,
    note:
      "Tiada kenaikan bayaran haji Muassasah bagi jemaah kali pertama selama tiga belas tahun walaupun kos haji terus meningkat.",
    origin: "Kerajaan membekukan kenaikan bayaran haji Muassasah pada tahun 2009.",
  },
  reconciliationNotes: [
    "Setiap baris: kos haji − bayaran haji = HAFIS seorang ✓ untuk semua enam tahun.",
    "Peratus bahagian menepati pembahagian (dibundarkan) ✓",
  ],
  cautions: [
    "PENTING: `hafisTotal_rm_million` ÷ `hafisPerPerson_rm` memberi bilangan jemaah tersirat yang TIDAK konsisten: ~17,166 (2014), ~18,519 (2015), ~17,957 (2016), ~31,139 (2017), ~25,180 (2018), ~23,142 (2019). Lonjakan 2017 tidak dijelaskan oleh laporan. Bilangan jemaah TIDAK boleh diterbitkan dengan yakin daripada jadual ini.",
    "Ringkasan eksekutif menyebut HAFIS 'hampir RM300 juta pada tahun 2019' manakala jadual memberi RM299 juta — konsisten. Tetapi ringkasan eksekutif juga menyebut kos haji 2013 RM15,553 manakala 3.16.1 menyebut tahun 2003 RM15,555. Lihat `dataConflicts`.",
  ],
};

export const hajjCostProjection = {
  id: "hajj-cost-projection",
  unit: "RM seorang",
  factType: "reportProjection",
  projectedBy: "Lembaga Tabung Haji (dikemukakan kepada Suruhanjaya)",
  source: [sourceRef("3.16.2", 203, 165)],
  rows: [
    { year: 2022, hajjCost_rm: 25540 },
    { year: 2023, hajjCost_rm: 26280 },
    { year: 2024, hajjCost_rm: 28160 },
    { year: 2025, hajjCost_rm: 29570 },
    { year: 2026, hajjCost_rm: 31040 },
    { year: 2027, hajjCost_rm: 32592 },
    { year: 2028, hajjCost_rm: 34221 },
    { year: 2029, hajjCost_rm: 35932 },
    { year: 2030, hajjCost_rm: 37729 },
  ],
  longerHorizonStatements: [
    { year: 2030, hajjCost_rm: 35000, qualifier: "mencecah sehingga", note: "Pernyataan naratif di 3.16.1 — BERBEZA daripada jadual (RM37,729)." },
    { year: 2050, hajjCost_rm: 50000, qualifier: "boleh meningkat kepada", note: "Pernyataan naratif; tiada jadual sokongan." },
  ],
  cautions: [
    "Ini unjuran, bukan kos sebenar. Tiada kadar inflasi atau andaian asas didedahkan.",
    "Kadar pertumbuhan tersirat tidak sekata (2022→2023: +2.9%; 2023→2024: +7.2%; selepas 2026 tetap ~5.0% setahun). Laporan tidak menjelaskan model yang digunakan.",
  ],
};

export const hafisProjection = {
  id: "hafis-projection",
  unit: "RM seorang; jumlah dalam RM ribu (RM'000)",
  factType: "reportProjection",
  source: [sourceRef("3.16.8", 205, 167)],
  fixedAssumptions: {
    pilgrimPayment_rm: 12980,
    pilgrimPaymentNote: "Kadar bukan-B40 tahun 2022, diandaikan kekal sehingga 2030.",
    impliedPilgrimCount: 30000,
    impliedPilgrimCountNote:
      "TERBITAN: setiap baris 'Jumlah' = HAFIS seorang × 30,000 tepat (cth 2030: 24,749 × 30,000 = 742,470 ribu = RM742.47 juta). Laporan TIDAK menyatakan andaian ini secara tersurat, tetapi ia boleh disahkan secara aritmetik bagi kesemua sembilan baris.",
  },
  rows: [
    { year: 2022, hajjCost_rm: 25540, pilgrimPayment_rm: 12980, hafisPerPerson_rm: 12560, hafisShare_pct: 49.2, hafisTotal_rm_thousand: 376800 },
    { year: 2023, hajjCost_rm: 26280, pilgrimPayment_rm: 12980, hafisPerPerson_rm: 13300, hafisShare_pct: 50.6, hafisTotal_rm_thousand: 399000 },
    { year: 2024, hajjCost_rm: 28160, pilgrimPayment_rm: 12980, hafisPerPerson_rm: 15180, hafisShare_pct: 53.9, hafisTotal_rm_thousand: 455400 },
    { year: 2025, hajjCost_rm: 29570, pilgrimPayment_rm: 12980, hafisPerPerson_rm: 16590, hafisShare_pct: 56.1, hafisTotal_rm_thousand: 497700 },
    { year: 2026, hajjCost_rm: 31040, pilgrimPayment_rm: 12980, hafisPerPerson_rm: 18060, hafisShare_pct: 58.2, hafisTotal_rm_thousand: 541800 },
    { year: 2027, hajjCost_rm: 32592, pilgrimPayment_rm: 12980, hafisPerPerson_rm: 19612, hafisShare_pct: 60.2, hafisTotal_rm_thousand: 588360 },
    { year: 2028, hajjCost_rm: 34221, pilgrimPayment_rm: 12980, hafisPerPerson_rm: 21241, hafisShare_pct: 62.1, hafisTotal_rm_thousand: 637230 },
    { year: 2029, hajjCost_rm: 35932, pilgrimPayment_rm: 12980, hafisPerPerson_rm: 22952, hafisShare_pct: 63.9, hafisTotal_rm_thousand: 688560 },
    { year: 2030, hajjCost_rm: 37729, pilgrimPayment_rm: 12980, hafisPerPerson_rm: 24749, hafisShare_pct: 65.6, hafisTotal_rm_thousand: 742470 },
  ],
  headlines: [
    "Jumlah HAFIS boleh mencecah hampir RM400 juta setahun bermula 2022.",
    "Peratusan HAFIS boleh meningkat melebihi 65% daripada kos haji pada 2030 jika kadar bayaran haji kekal.",
    "Kos HAFIS dijangka mencecah RM742.47 juta setahun menjelang 2030.",
  ],
  reconciliationNotes: [
    "kos haji − bayaran haji = HAFIS seorang ✓ semua baris.",
    "HAFIS seorang ÷ kos haji = peratus ✓ semua baris.",
    "HAFIS seorang × 30,000 = jumlah (RM'000) ✓ semua baris.",
  ],
  cautions: [
    "Unjuran ini mengunci bayaran haji pada RM12,980 selama sembilan tahun. Ia adalah senario 'jika tiada perubahan dasar', bukan ramalan.",
    "Ia juga mengunci bilangan jemaah pada 30,000 setahun, walaupun laporan sendiri menyatakan kuota dijangka meningkat kepada 60,000 menjelang 2030. Kedua-dua kenyataan ini tidak diselaraskan dalam laporan.",
  ],
};

export const hajjPaymentTiers2022 = {
  id: "hajj-payment-tiers-2022",
  year: 2022,
  tiers: [
    { group: "B40", payment_rm: 10980 },
    { group: "Bukan B40", payment_rm: 12980 },
  ],
  approvalNote: "Kadar baru dikemukakan LTH dan telah dipersetujui oleh Kerajaan.",
  derivedNote:
    "TERBITAN: pernyataan 'subsidi dalam lingkungan 57% daripada kos sebenar' (3.17.4) sepadan dengan kadar B40: (25,540 − 10,980) ÷ 25,540 = 57.0%. Jadual unjuran HAFIS pula menggunakan kadar bukan-B40 (49.2%). Kedua-dua peratus adalah betul untuk kumpulan berbeza — jangan bandingkan tanpa nota.",
  factType: F,
  source: [sourceRef("3.16.6 / 3.17.4", 205, 167)],
};

export const hajjRegistrationPolicy = {
  id: "hajj-registration-policy",
  currentMinimumDeposit_rm: 1300,
  proposedMinimumDeposit_rm: 12980,
  topUpRequiredIfSelected_rm: 11680,
  fullPackageValue_rm: 25000,
  fullPackageValueNote: "Anggaran kos sebenar yang ditanggung LTH.",
  benefitPerPilgrim_rm: 12020,
  benefitNote: "RM12,020 melebihi bayaran haji — pendeposit menyumbang jumlah kecil tetapi mendapat pulangan besar dalam tempoh singkat.",
  waitingTimeCurrent_years: [130, 135],
  waitingTimeProposed_years: 33,
  waitingTimeNote:
    "Laporan memberi dua angka untuk tempoh menunggu semasa: 135 tahun (3.16.17) dan 130 tahun (4.4.22 dan Ringkasan Eksekutif). EY menggunakan RM9,980 dalam pengiraannya.",
  proposals: [
    "Deposit minimum untuk giliran haji automatik dinaikkan daripada RM1,300 kepada kos yang dikenakan kepada jemaah Muassasah semasa (RM12,980).",
    "Jumlah pengeluaran deposit yang besar dihadkan; pendeposit perlu memberi notis pengeluaran sebulan.",
    "Bantuan haji atau subsidi hanya diberikan kepada jemaah yang memerlukan sahaja (prinsip istito'ah).",
  ],
  reconciliationNotes: ["12,980 − 1,300 = 11,680 ✓ ; 25,000 − 12,980 = 12,020 ✓"],
  factType: F,
  source: [sourceRef("3.16.13–3.16.17", 206, 168)],
};

export const hajjQuota = {
  id: "hajj-quota",
  currentQuota: 30000,
  currentQuotaQualifier: "dalam lingkungan ... sahaja (sebelum pandemik Covid-19)",
  plannedQuota2030: 60000,
  plannedQuotaSource: "Pelan induk Kerajaan Arab Saudi (Saudi Vision 2030)",
  factType: F,
  source: [sourceRef("3.16.20", 209, 171)],
};

export const hajjSubsidyImpactOnHibah = {
  id: "hajj-subsidy-impact",
  annualSubsidy_rm_million: 400,
  annualSubsidyQualifier: "dalam lingkungan",
  equivalentHibahReduction_pct: 0.4,
  statement:
    "Jumlah subsidi dalam lingkungan RM400 juta setahun bersamaan dengan pengurangan sebanyak 0.4% daripada kadar hibah yang dibayar kepada pendeposit.",
  derivedCheck:
    "TERBITAN: RM400 juta ÷ 0.4% menyiratkan asas deposit ≈ RM100 bilion. Deposit sebenar pada 2022 ialah RM88 bilion, yang akan memberi ~0.45%. Angka 0.4% adalah anggaran kasar — jangan gunakan sebagai penukaran tepat.",
  factType: F,
  source: [sourceRef("3.7.24 / 3.16.11 / 3.17.4", 110, 72)],
};

/* ------------------------------------------------------------------ *
 * 8. JUMLAH KUMULATIF (BAB EMPAT)
 * ------------------------------------------------------------------ */

export const cumulativeTotals = {
  id: "cumulative-totals",
  factType: F,
  source: [sourceRef("BAB EMPAT ¶4.2", 229, 191)],
  items: [
    {
      id: "pilgrims-managed",
      label: "Jemaah haji Malaysia diuruskan",
      value: 1.46,
      unit: "juta orang",
      period: "1963–2021",
      entityScope: "PWSBH, LUTH dan LTH",
    },
    {
      id: "hafis-cumulative",
      label: "Subsidi HAFIS kepada jemaah Muassasah",
      value: 2.02,
      unit: "RM bilion",
      period: "sejak 2001",
    },
    {
      id: "hibah-cumulative",
      label: "Agihan keuntungan (hibah) termasuk hibah haji",
      value: 37.52,
      unit: "RM bilion",
      period: "1966–2021",
    },
    {
      id: "depositors-2022",
      label: "Jumlah pendeposit",
      value: 8.6,
      unit: "juta",
      period: "sehingga 22 Julai 2022",
    },
    {
      id: "deposits-2022",
      label: "Deposit dimobilisasi",
      value: 88,
      unit: "RM bilion",
      period: "sehingga 2022",
    },
  ],
  derivedContext: [
    "TERBITAN: hibah 2014–2020 sahaja berjumlah RM17.96 bilion daripada RM37.52 bilion kumulatif (1966–2021) — iaitu ~47.9% daripada semua hibah dalam sejarah LTH dibayar dalam tempoh tujuh tahun siasatan. Formula: jumlah `hibahAmounts.rows[].total_rm_thousand` ÷ 1,000,000 ÷ 37.52.",
    "Kaveat: tahun 2021 tiada nilai RM dalam laporan, jadi nisbah di atas mengecualikan 2021. Angka sebenar bagi 2014–2021 akan lebih tinggi.",
  ],
};

export const governmentGuaranteeExposure = {
  id: "government-guarantee-exposure",
  provision: "Seksyen 24 Akta 535",
  currentValue_rm_billion: 88,
  mechanism:
    "Jika perbelanjaan Lembaga berhubung pengeluaran pendeposit tidak dapat ditampung daripada Kumpulan Wang atau Kumpulan Wang Rizab, ia dipertanggungkan kepada Kumpulan Wang Disatukan sebagai pinjaman kepada LTH, menjadi hutang kepada Kerajaan dan tanggungan pertama atas aset LTH.",
  consequence:
    "Jika diaktifkan, bukan sahaja LTH menanggung akibatnya tetapi kedudukan kewangan Kerajaan turut terjejas dan ini mengancam kestabilan sistemik kewangan negara.",
  factType: F,
  source: [sourceRef("3.13.16 / 4.4.15", 172, 134)],
};

export const debtCeiling = {
  id: "debt-ceiling",
  at2018_pct_of_gdp: 55,
  raisedTo_pct_of_gdp: 65,
  relevance:
    "Menjadi sebab mengapa suntikan geran RM10 bilion terus ditolak pada 2018, dan mengapa Sukuk Jaminan Kerajaan kini dianggap boleh dilaksanakan.",
  factType: F,
  source: [sourceRef("3.13.63 / 3.13.19(a)", 172, 134)],
};
