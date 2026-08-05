/**
 * Blueprint pelaksanaan dalam bentuk data.
 *
 * Modul ini TIDAK mengikat entiti hiliran kepada mana-mana perpustakaan
 * visualisasi. Ia menerangkan:
 *   - `encoding` : hubungan data → saluran visual (x, y, warna, saiz)
 *   - `markType` : jenis tanda generik ("bar", "line", "waterfall", …)
 * Pemetaan kepada D3 / Chart.js / Vega / SVG tulen terpulang kepada pelaksana.
 */

/* ------------------------------------------------------------------ *
 * PANDANGAN (VIEWS)
 * ------------------------------------------------------------------ */

export const views = [
  {
    id: "view-overview",
    order: 1,
    label: "Ringkasan",
    question: "Apa yang berlaku?",
    purpose: "Memberi enam angka yang meringkaskan keseluruhan kes, setiap satu boleh diklik untuk mendalami.",
    contains: ["heroStats", "chart-timeline-compact", "insight-strip"],
    entryPoint: true,
    mobilePriority: 1,
  },
  {
    id: "view-solvency",
    order: 2,
    label: "Aset vs liabiliti",
    question: "Bila masalah bermula, dan sejauh mana?",
    purpose: "Menunjukkan jurang defisit tahun demi tahun dan hubungannya dengan syarat berkanun.",
    contains: ["chart-solvency-bridge", "chart-hibah-amounts", "chart-overpayment", "table-assets-liabilities"],
    mobilePriority: 2,
  },
  {
    id: "view-accounting",
    order: 3,
    label: "Bagaimana ia tidak kelihatan",
    question: "Kaedah perakaunan apa yang mengubah gambaran?",
    purpose: "Menerangkan tiga mekanisme: pengelasan wang pendeposit, RAV, dan ambang rosot nilai.",
    contains: ["chart-rav-waterfall", "chart-impairment-scenarios", "chart-profit-bridge", "panel-classification", "panel-ey-timing"],
    mobilePriority: 3,
  },
  {
    id: "view-audit",
    order: 4,
    label: "Amaran & audit",
    question: "Siapa memberi amaran, dan mengapa ia tidak menghentikan apa-apa?",
    purpose: "Menjejaki surat pengawal selia, keputusan audit, dan laporan perunding yang diabaikan.",
    contains: ["chart-warning-timeline", "panel-kan-quote", "panel-rb-ignored", "table-regulator-letters"],
    mobilePriority: 5,
  },
  {
    id: "view-ujsb",
    order: 5,
    label: "Pemulihan & UJSB",
    question: "Bagaimana LTH diselamatkan, dan siapa menanggung kosnya?",
    purpose: "Menunjukkan pemindahan aset, struktur Sukuk, dan risiko penebusan.",
    contains: ["chart-asset-transfer", "chart-property-erosion", "chart-bluechip", "chart-sukuk-timeline", "chart-rofr", "chart-guarantee-commitments", "sim-sukuk"],
    mobilePriority: 4,
  },
  {
    id: "view-investments",
    order: 6,
    label: "Pelaburan bermasalah",
    question: "Ke mana wang itu pergi?",
    purpose: "Meneroka 14 pelaburan yang memerlukan audit forensik.",
    contains: ["chart-investments", "grid-investment-cards", "panel-process-failures", "detail-investment"],
    mobilePriority: 6,
  },
  {
    id: "view-hajj",
    order: 7,
    label: "Haji & subsidi",
    question: "Apa kaitannya dengan ibadah haji?",
    purpose: "Menghubungkan pembekuan bayaran haji dengan beban subsidi dan kesannya kepada hibah.",
    contains: ["chart-hajj-cost-vs-payment", "chart-hafis-share", "chart-hafis-total", "sim-hafis", "panel-registration-policy"],
    mobilePriority: 7,
  },
  {
    id: "view-governance",
    order: 8,
    label: "Tadbir urus",
    question: "Siapa yang membuat keputusan?",
    purpose: "Memetakan kuasa Menteri, komposisi Lembaga, dan konflik kepentingan.",
    contains: ["chart-tenure-gantt", "chart-directorships", "panel-ministerial-powers", "panel-political-members", "panel-committees"],
    mobilePriority: 8,
  },
  {
    id: "view-enforcement",
    order: 9,
    label: "Penguatkuasaan",
    question: "Apa yang berlaku selepas itu?",
    purpose: "Menjejaki laporan polis, aduan SPRM, tindakan tatatertib dan litigasi.",
    contains: ["table-police-reports", "chart-disciplinary-flow", "table-litigation", "table-sprm"],
    mobilePriority: 9,
  },
  {
    id: "view-recommendations",
    order: 10,
    label: "Syor",
    question: "Apa yang disyorkan Suruhanjaya?",
    purpose: "Menyenaraikan 25 syor, dikumpulkan mengikut tema, dengan pautan ke penemuan yang mendasarinya.",
    contains: ["grid-recommendations", "panel-dana-haji", "panel-rejected-models"],
    mobilePriority: 10,
  },
  {
    id: "view-limits",
    order: 11,
    label: "Apa yang kita tidak tahu",
    question: "Di mana batas data ini?",
    purpose:
      "Memaparkan percanggahan dalam laporan, jurang data, dan metrik yang sengaja tidak dikira. Bahagian ini adalah kandungan, bukan nota kaki.",
    contains: ["table-conflicts", "table-gaps", "table-omitted-metrics", "panel-source-limitations", "panel-ocr-corrections", "panel-integrity-run"],
    mobilePriority: 11,
    alwaysReachable: true,
    alwaysReachableNote: "Mesti boleh dicapai dari mana-mana halaman melalui pautan tetap di kaki halaman.",
  },
  {
    id: "view-timeline",
    order: 12,
    label: "Kronologi penuh",
    question: "Susunan peristiwa dari 2014 hingga 2030",
    purpose: "Timeline berbilang lorong dengan penapis tema, pihak dan keterukan.",
    contains: ["chart-timeline", "panel-decision-windows"],
    mobilePriority: 12,
  },
  {
    id: "view-source",
    order: 13,
    label: "Tentang data ini",
    question: "Dari mana angka ini datang?",
    purpose: "Metadata laporan, senarai ekshibit, kaedah siasatan, dan pautan ke dokumen asal.",
    contains: ["panel-report-meta", "table-exhibits", "table-methods", "table-witnesses", "glossary-full"],
    mobilePriority: 13,
    alwaysReachable: true,
  },
];

/* ------------------------------------------------------------------ *
 * VISUALISASI
 * ------------------------------------------------------------------ */

export const visualisations = [
  {
    id: "chart-solvency-bridge",
    view: "view-solvency",
    markType: "grouped-bar-with-zero-line",
    dataSource: "assetsLiabilities",
    encoding: {
      x: { field: "year", type: "ordinal", title: "Tahun" },
      y: { field: ["surplusPreDistribution_rm_million", "surplusPostDistribution_rm_million"], type: "quantitative", title: "RM juta", includeZero: true },
      color: { field: "series", type: "nominal", domain: ["Sebelum agihan", "Selepas agihan"] },
      annotation: { type: "reference-line", value: 0, label: "Aset = liabiliti (had seksyen 22(3)(a))" },
    },
    interactions: ["hover-tooltip", "click-to-source", "toggle-series"],
    drillDown: { target: "table-assets-liabilities", trigger: "click-bar", passes: ["year"] },
    accessibility: {
      description:
        "Carta bar berkumpulan menunjukkan lebihan atau kekurangan aset berbanding liabiliti bagi setiap tahun 2013 hingga 2017, sebelum dan selepas hibah dibayar.",
      tableAlternative: "table-assets-liabilities",
    },
    mobile: { layout: "horizontal-bars", reason: "Label tahun lebih mudah dibaca pada paksi menegak dalam skrin sempit." },
  },
  {
    id: "chart-hibah-rates",
    view: "view-solvency",
    markType: "stacked-bar",
    dataSource: "hibahRates",
    encoding: {
      x: { field: "year", type: "ordinal" },
      y: { field: ["annual_pct", "hajj_pct"], type: "quantitative", title: "Kadar (%)" },
      color: { field: "component", domain: ["Hibah tahunan", "Hibah haji"] },
      annotation: { type: "band", from: 2014, to: 2017, label: "Tempoh kadar tinggi" },
    },
    interactions: ["hover-tooltip", "click-to-source"],
    mandatoryNote:
      "Tooltip WAJIB menyatakan hibah haji ialah kadar tambahan untuk pendeposit yang layak, bukan untuk semua pendeposit.",
    mobile: { layout: "horizontal-bars" },
  },
  {
    id: "chart-hibah-amounts",
    view: "view-solvency",
    markType: "stacked-bar",
    dataSource: "hibahAmounts",
    encoding: {
      x: { field: "year", type: "ordinal" },
      y: { field: ["annual_rm_thousand", "hajj_rm_thousand"], type: "quantitative", title: "RM juta", transform: "÷1000" },
      color: { field: "component" },
    },
    interactions: ["hover-tooltip", "click-to-source", "link-to-rates"],
    emptyStateFor: [2021],
    emptyStateReason: "Laporan memberi kadar 2021 tetapi bukan jumlah RM.",
    mobile: { layout: "horizontal-bars" },
  },
  {
    id: "chart-overpayment",
    view: "view-solvency",
    markType: "bar-with-annotation",
    dataSource: "derivations.computeHibahOverpayment",
    factType: "derived",
    encoding: {
      x: { field: "year", type: "ordinal" },
      y: { field: "overpayment_rm_million", type: "quantitative", title: "RM juta" },
      pattern: { field: "statutoryTestPassed", values: { false: "hatched", true: "solid" }, legend: "Berlorek = syarat berkanun tidak dipenuhi langsung" },
    },
    interactions: ["hover-tooltip", "show-formula"],
    mandatoryNote:
      "Panel formula WAJIB dibuka secara lalai pada carta ini kerana ia data terbitan, bukan angka laporan.",
    mobile: { layout: "horizontal-bars" },
  },
  {
    id: "chart-rav-waterfall",
    view: "view-accounting",
    markType: "waterfall",
    dataSource: "ravReconciliation2017",
    encoding: {
      x: { field: "label", type: "nominal" },
      y: { field: "value_rm_million", type: "quantitative", title: "RM juta" },
      color: { field: "sign", domain: ["tambah", "tolak", "jumlah"] },
    },
    interactions: ["hover-tooltip", "click-to-source", "expand-thp-component"],
    drillDown: { target: "panel-thp-valuation", trigger: "click-rav-addition" },
    mobile: { layout: "vertical-waterfall", reason: "Air terjun menegak lebih mudah diikuti pada skrin sempit." },
  },
  {
    id: "chart-impairment-scenarios",
    view: "view-accounting",
    markType: "bar",
    dataSource: "impairmentPolicy2017",
    encoding: {
      x: { field: "significantBelowCost_pct", type: "ordinal", title: "Ambang (% di bawah kos)" },
      y: { field: "impairmentImpact_rm_million", type: "quantitative", title: "Kesan rosot nilai (RM juta)" },
      annotation: { type: "marker", at: 90, label: "Yang digunakan LTH pada 2017 → RM1 juta direkod" },
    },
    interactions: ["hover-tooltip", "compare-with-frsic14"],
    hardRule: "JANGAN sambungkan titik dengan garis. Hanya tiga senario diskret wujud; interpolasi mengelirukan.",
    mobile: { layout: "horizontal-bars" },
  },
  {
    id: "chart-profit-bridge",
    view: "view-accounting",
    markType: "waterfall",
    dataSource: "pwcAdjustment2017",
    encoding: {
      x: { field: "label", type: "nominal" },
      y: { field: "value_rm_million", type: "quantitative", title: "RM juta", includeZero: true },
      color: { field: "sign" },
      annotation: { type: "reference-line", value: 0, label: "Titik pulang modal" },
    },
    interactions: ["hover-tooltip", "toggle-retained-earnings-bridge"],
    factType: "thirdPartyEstimate",
    mobile: { layout: "vertical-waterfall" },
  },
  {
    id: "chart-asset-transfer",
    view: "view-ujsb",
    markType: "grouped-bar",
    dataSource: "assetTransfer",
    encoding: {
      x: { field: "assetClass", type: "nominal" },
      y: { field: ["bookValue_rm_million", "transferValue_rm_million", "marketValue_rm_million"], type: "quantitative", title: "RM juta" },
      color: { field: "valuation", domain: ["Nilai buku", "Nilai pemindahan", "Nilai pasaran"] },
    },
    interactions: ["hover-tooltip", "click-to-source", "toggle-total"],
    mandatoryNote:
      "Nota WAJIB: bagi hartanah dan perladangan, nilai pasaran dalam laporan sama dengan nilai buku.",
    mobile: { layout: "horizontal-bars", collapseTo: "total-only-with-expand" },
  },
  {
    id: "chart-property-erosion",
    view: "view-ujsb",
    markType: "dumbbell",
    dataSource: "derivations.computePropertyErosion",
    encoding: {
      y: { field: "assetType", type: "nominal" },
      x: { field: ["transferValue_rm", "marketValueDec2021_rm"], type: "quantitative", title: "RM juta", transform: "÷1e6" },
      color: { field: "endpoint", domain: ["Dis 2018", "Dis 2021"] },
      label: { field: "erosion_pct", format: "+0.0%" },
    },
    interactions: ["hover-tooltip", "toggle-per-sqft"],
    mandatoryNote:
      "Apabila mod RM sekaki persegi dihidupkan, nota WAJIB muncul: nilai ini tidak boleh dibandingkan merentas jenis aset kerana asas keluasan berbeza.",
    mobile: { layout: "dumbbell-stacked" },
  },
  {
    id: "chart-bluechip",
    view: "view-ujsb",
    markType: "slope",
    dataSource: "bluechipTransfer",
    encoding: {
      x: { field: "pricePoint", type: "ordinal", domain: ["Harga pemindahan", "31 Dis 2018", "8 Jun 2022"] },
      y: { field: "price_rm", type: "quantitative", title: "RM seunit" },
      color: { field: "ticker", type: "nominal" },
    },
    interactions: ["hover-tooltip", "highlight-series", "toggle-aggregate-view"],
    mandatoryWarning:
      "Apabila pandangan agregat dihidupkan, amaran WAJIB muncul: lajur nilai agregat tidak boleh direkonsiliasikan dengan harga seunit; bilangan unit tidak boleh diterbitkan.",
    mobile: { layout: "small-multiples", reason: "Lima garis bertindih terlalu padat pada skrin sempit." },
  },
  {
    id: "chart-rofr",
    view: "view-ujsb",
    markType: "lollipop",
    dataSource: "rofrOffers",
    encoding: {
      x: { field: "date", type: "temporal" },
      y: { field: "premium_pct", type: "quantitative", title: "Premium berbanding pasaran (%)", includeZero: true },
      color: { field: "isDiscount", domain: [true, false], labels: ["Diskaun", "Premium"] },
      size: { field: "shares", type: "quantitative", title: "Bilangan syer" },
      annotation: { type: "reference-line", value: 0, label: "Harga pasaran" },
    },
    interactions: ["hover-tooltip", "click-to-source"],
    mobile: { layout: "horizontal-lollipop-by-company" },
  },
  {
    id: "chart-sukuk-timeline",
    view: "view-ujsb",
    markType: "stepped-area-with-milestones",
    dataSource: "derivations.computeSukukRedemptionPath",
    factType: "simulation",
    encoding: {
      x: { field: "year", type: "ordinal", domain: [2019, 2030] },
      y: { field: "cumulativeRedemption_rm_billion", type: "quantitative", title: "RM bilion" },
      annotation: [
        { type: "marker", at: 2026, value: 13.2, label: "Sukuk Siri 1 matang: RM13.2 bilion" },
        { type: "marker", at: 2029, value: 27.5, label: "Sukuk Siri 2 matang: kumulatif RM27.5 bilion" },
        { type: "marker", at: 2021, label: "Suntikan RM1.5 bilion tidak diterima" },
      ],
    },
    interactions: ["parameter-slider", "reset-to-approved-plan", "hover-tooltip"],
    linkedSimulation: "sim-sukuk",
    mandatoryDisclaimer: "Disclaimer simulasi WAJIB dipaparkan secara tetap, bukan dalam tooltip.",
    mobile: { layout: "compact-area", controlsPosition: "bottom-sheet" },
  },
  {
    id: "chart-guarantee-commitments",
    view: "view-ujsb",
    markType: "horizontal-bar",
    dataSource: "guaranteeCommitments",
    encoding: {
      y: { field: "entity", type: "nominal", sort: "-y2021_rm_million" },
      x: { field: ["y2020_rm_million", "y2021_rm_million"], type: "quantitative", title: "RM juta" },
      color: { field: "highlight", values: { true: "accent", false: "muted" } },
    },
    interactions: ["hover-tooltip", "toggle-year"],
    mobile: { layout: "top-5-with-expand" },
  },
  {
    id: "chart-hajj-cost-vs-payment",
    view: "view-hajj",
    markType: "stacked-area-with-line",
    dataSource: "hafisActual",
    encoding: {
      x: { field: "year", type: "ordinal", domain: [2014, 2019] },
      y: { field: ["pilgrimPayment_rm", "hafisPerPerson_rm"], type: "quantitative", title: "RM seorang" },
      color: { field: "component", domain: ["Ditanggung jemaah", "Ditanggung LTH"] },
      overlay: { field: "hajjCost_rm", markType: "line", label: "Kos haji sebenar" },
    },
    interactions: ["hover-tooltip", "click-to-source"],
    mobile: { layout: "stacked-area", legendPosition: "top" },
  },
  {
    id: "chart-hafis-share",
    view: "view-hajj",
    markType: "line-with-projection-split",
    dataSource: ["hafisActual", "hafisProjection"],
    encoding: {
      x: { field: "year", type: "ordinal", domain: [2014, 2030] },
      y: { field: "hafisShare_pct", type: "quantitative", title: "Bahagian kos ditanggung LTH (%)" },
      strokeDash: { field: "factType", values: { fact: "solid", reportProjection: "dashed" } },
      annotation: [
        { type: "gap", from: 2020, to: 2021, label: "Tiada haji (Covid-19)" },
        { type: "marker", at: 2022, label: "Bayaran haji dinaikkan buat kali pertama sejak 2009" },
      ],
    },
    interactions: ["hover-tooltip", "toggle-b40-view"],
    mandatoryNote:
      "Apabila pandangan B40 dihidupkan, tunjukkan 57.0% untuk 2022 dan nyatakan ia menggunakan kadar RM10,980.",
    mobile: { layout: "line", annotationsAsMarkers: true },
  },
  {
    id: "chart-hafis-total",
    view: "view-hajj",
    markType: "bar-with-projection-split",
    dataSource: ["hafisActual", "hafisProjection", "derivations.simulateHafis"],
    encoding: {
      x: { field: "year", type: "ordinal", domain: [2014, 2030] },
      y: { field: "hafisTotal_rm_million", type: "quantitative", title: "RM juta" },
      opacity: { field: "factType", values: { fact: 1.0, reportProjection: 0.6, simulation: 0.4 } },
    },
    interactions: ["parameter-slider", "hover-tooltip", "reset-to-report-assumption"],
    linkedSimulation: "sim-hafis",
    mandatoryNote:
      "Nota tetap: unjuran laporan mengandaikan 30,000 jemaah setahun. Laporan yang sama menjangka kuota 60,000 menjelang 2030.",
    mobile: { layout: "horizontal-bars", controlsPosition: "bottom-sheet" },
  },
  {
    id: "chart-bonus",
    view: "view-governance",
    markType: "bar-with-status-strip",
    dataSource: ["staffBonus", "assetsLiabilities"],
    encoding: {
      x: { field: "year", type: "ordinal", domain: [2010, 2020] },
      y: { field: "allocation_rm_million", type: "quantitative", title: "RM juta" },
      strip: { field: "solvencyStatus", values: { solvent: "neutral", insolvent: "warning", unknown: "muted" }, label: "Aset melebihi liabiliti?" },
    },
    interactions: ["hover-tooltip", "toggle-bonus-vs-profit"],
    mandatoryNote:
      "Jalur status hanya boleh dilukis untuk 2013–2017; tahun lain WAJIB ditandakan 'tiada data'.",
    mobile: { layout: "horizontal-bars" },
  },
  {
    id: "chart-deposits",
    view: "view-overview",
    markType: "point-with-connector",
    dataSource: "depositTrajectory",
    encoding: {
      x: { field: "asOf", type: "temporal" },
      y: { field: "deposits_rm_billion", type: "quantitative", title: "RM bilion" },
      annotation: [{ type: "marker", at: "2019", label: "Hibah 1.25% diumumkan" }],
    },
    interactions: ["hover-tooltip"],
    hardRule:
      "Gunakan titik dengan penyambung putus-putus, BUKAN garis pepejal. Hanya empat titik data wujud dan garis pepejal akan menyiratkan pemerhatian berterusan.",
    mobile: { layout: "vertical-timeline" },
  },
  {
    id: "chart-concentration",
    view: "view-overview",
    markType: "two-stat-comparison",
    dataSource: "depositConcentration",
    encoding: { stat1: "65% pendeposit memegang ≤RM2,000", stat2: "5% pendeposit memegang 75% deposit" },
    interactions: ["hover-tooltip"],
    hardRule:
      "JANGAN lukis lengkung Lorenz, pai, atau histogram. Hanya dua titik wujud; sebarang lengkung akan direka.",
    mobile: { layout: "stacked-stats" },
  },
  {
    id: "chart-investments",
    view: "view-investments",
    markType: "horizontal-bar-grouped-by-currency",
    dataSource: "problematicInvestments",
    encoding: {
      y: { field: "name", type: "nominal", sort: "-exposure" },
      x: { field: "exposure_rm_million", type: "quantitative", title: "RM juta" },
      color: { field: "sector", type: "nominal" },
      overlay: { field: "impairment_rm_million", markType: "bar-inset", label: "Telah dirosotnilai" },
      facet: { field: "currency", note: "Mata wang berbeza WAJIB difasetkan, tidak pernah digabungkan." },
    },
    interactions: ["hover-tooltip", "click-for-detail", "filter-by-sector", "filter-by-issue-type"],
    drillDown: { target: "detail-investment", trigger: "click-bar", passes: ["id"] },
    hardRule: "TIADA baris jumlah. Asas berbeza antara kes dan empat kes mempunyai komponen mata wang asing.",
    mobile: { layout: "card-list", reason: "Nama syarikat panjang; kad lebih baik daripada bar pada skrin sempit." },
  },
  {
    id: "chart-timeline",
    view: "view-timeline",
    markType: "multi-track-timeline",
    dataSource: "timelineEvents",
    encoding: {
      x: { field: "date", type: "temporal", domain: [2014, 2030] },
      y: { field: "track", type: "nominal", domain: "timelineTracks" },
      size: { field: "impact", scale: { critical: 4, high: 3, medium: 2, context: 1 } },
      opacity: { field: "future", values: { true: 0.5, false: 1.0 } },
    },
    interactions: ["zoom-pan", "filter-by-track", "filter-by-impact", "click-for-detail", "hover-tooltip"],
    drillDown: { target: "linked-record", trigger: "click-event", passes: ["links"] },
    mobile: {
      layout: "vertical-scroll-list",
      reason: "Timeline mendatar dengan lapan lorong mustahil dibaca pada skrin sempit.",
      grouping: "mengikut tahun, dengan lorong sebagai lencana warna",
    },
  },
  {
    id: "chart-timeline-compact",
    view: "view-overview",
    markType: "single-track-timeline",
    dataSource: "timelineEvents",
    filter: "impact === 'critical'",
    encoding: { x: { field: "date", type: "temporal" } },
    interactions: ["click-to-full-timeline"],
    mobile: { layout: "horizontal-scroll" },
  },
  {
    id: "chart-warning-timeline",
    view: "view-audit",
    markType: "event-strip",
    dataSource: "regulatorWarnings",
    encoding: {
      x: { field: "date", type: "temporal", domain: ["2014-01-01", "2022-12-31"] },
      y: { field: "from", type: "nominal", domain: ["BNM", "KAN"] },
      annotation: [
        { type: "span", from: "2014-08-21", to: "2018-07-16", label: "3 tahun 11 bulan sebelum pendedahan awam" },
      ],
    },
    interactions: ["hover-tooltip", "click-to-source"],
    mobile: { layout: "vertical-list" },
  },
  {
    id: "chart-tenure-gantt",
    view: "view-governance",
    markType: "gantt",
    dataSource: ["chairmen", "chiefExecutives", "supervisingMinisters", "appointedBoardMembers"],
    encoding: {
      x: { field: "from-to", type: "temporal", domain: ["2004-01-01", "2022-12-31"] },
      y: { field: "name", type: "nominal", group: "role" },
      color: { field: "politicallyActive", values: { true: "warning", false: "neutral", null: "muted" } },
      annotation: [
        { type: "marker", at: "2021-05-05", label: "KPE ditamatkan tanpa sebab" },
        { type: "marker", at: "2021-10-15", label: "Pengerusi ditamatkan tanpa sebab" },
      ],
    },
    interactions: ["hover-tooltip", "filter-by-role", "highlight-overlaps"],
    mandatoryNote:
      "Warna 'ahli politik aktif' hanya ditetapkan untuk tiga individu yang DINAMAKAN Suruhanjaya. Untuk yang lain, medan ini tiada data — WAJIB dilabel 'tidak dinyatakan', bukan 'bukan ahli politik'.",
    mobile: { layout: "grouped-list-with-date-range-text" },
  },
  {
    id: "chart-directorships",
    view: "view-governance",
    markType: "horizontal-bar",
    dataSource: "subsidiaryDirectorships",
    encoding: {
      y: { field: "person", type: "nominal", sort: "-count" },
      x: { field: "companies.length", type: "quantitative", title: "Bilangan jawatan" },
      annotation: { type: "reference-line", value: 5, label: "Had dasar baharu LTH" },
    },
    interactions: ["hover-tooltip", "click-to-expand-companies"],
    mandatoryNote:
      "Laporan menggunakan perkataan 'antaranya' — senarai ini adalah contoh, bukan kiraan muktamad.",
    mobile: { layout: "card-list" },
  },
  {
    id: "chart-disciplinary-flow",
    view: "view-enforcement",
    markType: "sankey-or-step-flow",
    dataSource: "disciplinaryActions",
    encoding: {
      stages: ["Kertas pertuduhan", "Keputusan Jawatankuasa Tatatertib", "Keputusan Rayuan"],
      flow: { field: "penalty", domain: ["Buang kerja", "Turun pangkat", "Amaran keras", "Amaran + tangguh gaji"] },
    },
    interactions: ["hover-tooltip", "filter-by-cluster"],
    mandatoryNote: "Saiz sampel sangat kecil (4 kluster, 5 pegawai). Ini bukan kadar statistik.",
    mobile: { layout: "vertical-step-list" },
  },
];

/* ------------------------------------------------------------------ *
 * INTERAKSI ANALITIK
 * ------------------------------------------------------------------ */

export const interactions = [
  {
    id: "int-source-trace",
    label: "Klik angka → lihat perenggan asal",
    description:
      "Setiap angka, label dan insight boleh diklik untuk membuka panel sisi yang menunjukkan nombor perenggan laporan, nombor muka surat PDF, dan pautan ke anchor dalam dokumen asal.",
    appliesTo: "semua",
    priority: "wajib",
    acceptance: "Tiada angka dalam UI tanpa laluan ke sumbernya.",
  },
  {
    id: "int-fact-type-toggle",
    label: "Tapis mengikut jenis maklumat",
    description:
      "Pengguna boleh menghidupkan/mematikan fakta, terbitan, unjuran, anggaran pihak ketiga, dan simulasi. Lalai: fakta + terbitan sahaja.",
    appliesTo: "semua carta dan kad",
    priority: "wajib",
    acceptance:
      "Mematikan 'unjuran' mesti mengeluarkan semua data 2022–2030 daripada carta HAFIS, dan carta mesti kekal boleh dibaca dengan keadaan kosong yang betul.",
  },
  {
    id: "int-formula-panel",
    label: "Tunjuk formula",
    description:
      "Untuk mana-mana angka terbitan, panel 'Bagaimana ini dikira' menunjukkan formula, input, andaian, dan apa yang tidak boleh disimpulkan.",
    appliesTo: "semua metrik terbitan",
    priority: "wajib",
    acceptance: "Panel dibuka secara lalai pada carta yang keseluruhannya terbitan.",
  },
  {
    id: "int-conflict-badge",
    label: "Lencana percanggahan",
    description:
      "Angka yang mempunyai nilai bercanggah dalam laporan membawa lencana. Klik menunjukkan kesemua nilai, sumber masing-masing, dan panduan nilai mana yang patut digunakan.",
    appliesTo: "angka yang tersenarai dalam dataConflicts",
    priority: "wajib",
    acceptance: "Setiap entri dalam dataConflicts mempunyai sekurang-kurangnya satu lencana yang boleh dicapai dalam UI.",
  },
  {
    id: "int-cross-filter",
    label: "Penapis silang",
    description:
      "Memilih tahun dalam mana-mana carta menapis semua carta lain dalam pandangan yang sama, DAN menyerlahkan peristiwa timeline pada tahun itu.",
    appliesTo: "view-solvency, view-ujsb, view-hajj",
    priority: "tinggi",
  },
  {
    id: "int-drill-path",
    label: "Laluan gambaran besar → bukti",
    description:
      "Empat peringkat: (1) kad statistik → (2) carta → (3) jadual baris data → (4) petikan perenggan laporan. Setiap peringkat mengekalkan konteks penapis.",
    appliesTo: "semua",
    priority: "wajib",
    acceptance: "Pengguna boleh sampai daripada mana-mana kad hero kepada petikan laporan dalam tiga klik atau kurang.",
  },
  {
    id: "int-compare-mode",
    label: "Mod perbandingan",
    description:
      "Membolehkan pengguna meletakkan dua tahun, dua kelas aset, atau dua senario bersebelahan. Senarai perbandingan yang SAH diberikan dalam `comparisons`.",
    appliesTo: "view-solvency, view-ujsb, view-accounting",
    priority: "sederhana",
    guard:
      "Perbandingan yang ditandakan `factType: 'gap'` dalam `comparisons` (contoh LTH vs bank Islam) MESTI ditunjukkan sebagai tidak tersedia dengan penjelasan, bukan disembunyikan.",
  },
  {
    id: "int-simulation",
    label: "Simulasi parameter",
    description:
      "Peluncur untuk bayaran haji, bilangan jemaah, peruntukan Kerajaan, dan ambang rosot nilai. Setiap simulasi membawa disclaimer tetap.",
    appliesTo: "view-hajj, view-ujsb, view-accounting",
    priority: "sederhana",
    guard:
      "Butang 'Kembali kepada andaian laporan' mesti sentiasa kelihatan. Nilai simulasi TIDAK PERNAH dipaparkan dalam kad hero atau ringkasan.",
  },
  {
    id: "int-glossary-inline",
    label: "Glosari dalam teks",
    description: "Istilah teknikal digariskan putus-putus; sentuh atau hover membuka penjelasan satu ayat.",
    appliesTo: "semua teks",
    priority: "wajib",
  },
  {
    id: "int-search",
    label: "Carian global",
    description:
      "Cari nama individu, nama syarikat, nombor perenggan laporan (cth '3.9.12'), atau istilah. Hasil dikumpulkan mengikut jenis.",
    appliesTo: "global",
    priority: "sederhana",
  },
  {
    id: "int-export",
    label: "Salin dengan sumber",
    description:
      "Menyalin mana-mana angka turut menyalin rujukan sumbernya. Ini mengurangkan risiko angka dipetik semula tanpa konteks.",
    appliesTo: "semua angka",
    priority: "rendah",
  },
];

/* ------------------------------------------------------------------ *
 * HIERARKI MAKLUMAT
 * ------------------------------------------------------------------ */

export const informationHierarchy = {
  levels: [
    { level: 1, name: "Tajuk", content: "Enam kad statistik hero. Satu angka, satu ayat penjelasan.", maxItems: 6 },
    { level: 2, name: "Naratif", content: "Sebelas pandangan mengikut susunan soalan, bukan mengikut susunan bab laporan.", maxItems: 11 },
    { level: 3, name: "Visual", content: "Satu hingga lima carta setiap pandangan, setiap satu menjawab satu soalan.", maxItems: 5 },
    { level: 4, name: "Jadual", content: "Data mentah yang menyokong setiap carta, boleh disusun dan ditapis." },
    { level: 5, name: "Sumber", content: "Petikan perenggan laporan dengan nombor muka surat dan pautan anchor." },
  ],
  rule:
    "Setiap peringkat mesti boleh dicapai daripada peringkat sebelumnya dalam satu tindakan. Tiada peringkat boleh dilangkau ke atas — pengguna sentiasa boleh naik semula.",
  progressiveDisclosure:
    "Muat awal hanya memuatkan Level 1 dan 2. Level 3 dimuatkan apabila pandangan dibuka. Level 4 dan 5 dimuatkan atas permintaan.",
};

export const crossLinks = [
  { from: "chart-hibah-amounts", to: "chart-solvency-bridge", reason: "Jumlah hibah ialah baris 'agihan' dalam jadual aset/liabiliti." },
  { from: "chart-rav-waterfall", to: "chart-solvency-bridge", reason: "Liabiliti RAV = liabiliti PwC + agihan hibah tahun itu." },
  { from: "chart-property-erosion", to: "detail-investment:thhr", reason: "Baris 'Hotel' RM804.1 juta ialah aset THHR yang sama." },
  { from: "chart-rofr", to: "detail-investment:fgv", reason: "Baris FGV 283,710,100 syer ialah pegangan yang sama yang diambil UJSB." },
  { from: "chart-bluechip", to: "chart-asset-transfer", reason: "Lima kaunter ini sebahagian daripada RM16.85 bilion ekuiti tersenarai." },
  { from: "chart-impairment-scenarios", to: "chart-profit-bridge", reason: "Rosot nilai yang tidak direkod ialah komponen terbesar pelarasan PwC." },
  { from: "chart-hafis-total", to: "chart-hibah-rates", reason: "Subsidi RM400 juta setahun bersamaan pengurangan ~0.4% kadar hibah." },
  { from: "chart-directorships", to: "chart-investments", reason: "Individu yang sama muncul sebagai pengarah dalam syarikat pelaburan bermasalah." },
  { from: "chart-warning-timeline", to: "chart-solvency-bridge", reason: "Setiap surat amaran boleh dipetakan kepada tahun kewangan yang berkaitan." },
  { from: "chart-timeline", to: "semua", reason: "Setiap peristiwa membawa medan `links` kepada rekod data yang berkaitan." },
];

/* ------------------------------------------------------------------ *
 * KEADAAN
 * ------------------------------------------------------------------ */

export const stateMatrix = [
  { state: "loading", trigger: "Muat awal atau tukar pandangan", ui: "Rangka skeleton dengan dimensi carta yang betul supaya tiada anjakan susun atur." },
  { state: "ready", trigger: "Data dimuatkan", ui: "Carta penuh dengan legenda, nota dan pautan sumber." },
  { state: "empty-filter", trigger: "Penapis mengecualikan semua data", ui: "states.emptyFilter dengan butang set semula." },
  { state: "empty-by-design", trigger: "Laporan tidak menyediakan data ini", ui: "states.emptyByDesign dengan pautan ke senarai jurang data. JANGAN tunjuk carta kosong." },
  { state: "empty-no-activity", trigger: "Tiada aktiviti sebenar (haji 2020–2021)", ui: "states.emptyNoActivity — jurang dilabel pada carta, bukan diisi dengan sifar." },
  { state: "partial", trigger: "Sebahagian siri mempunyai data", ui: "Lukis yang ada; tandakan jurang dengan jelas menggunakan corak putus-putus dan label." },
  { state: "conflict", trigger: "Nilai bercanggah dalam laporan", ui: "states.conflictWarning + lencana pada angka." },
  { state: "cannot-sum", trigger: "Pengguna cuba menjumlahkan lajur yang tidak serasi", ui: "states.cannotSumWarning; baris jumlah tidak dipaparkan langsung." },
  { state: "simulation-active", trigger: "Pengguna mengubah parameter", ui: "Disclaimer tetap + butang 'Kembali kepada andaian laporan' + penanda visual berbeza (kelegapan lebih rendah)." },
  { state: "error", trigger: "Data gagal dimuatkan atau pemeriksaan integriti gagal secara tidak dijangka", ui: "states.error + jangan render carta separa." },
];

/* ------------------------------------------------------------------ *
 * MOBILE-FIRST
 * ------------------------------------------------------------------ */

export const mobileRequirements = {
  baseline: "Reka untuk 360px lebar dahulu, kemudian tingkatkan untuk 768px dan 1200px.",
  principles: [
    "Satu carta setiap skrin. Jangan letak dua carta bersebelahan di bawah 768px.",
    "Bar mendatar mengalahkan bar menegak apabila label adalah tahun atau nama syarikat.",
    "Timeline mendatar bertukar kepada senarai menegak yang dikumpulkan mengikut tahun di bawah 768px.",
    "Kawalan penapis dan peluncur simulasi masuk ke dalam 'bottom sheet' yang boleh ditarik, bukan bar sisi.",
    "Legenda di ATAS carta, bukan di sebelah, supaya lebar carta dimaksimumkan.",
    "Tooltip hover diganti dengan 'tap-to-pin' — sentuhan pertama membuka panel yang kekal sehingga ditutup.",
    "Jadual bertukar kepada senarai kad; tiada skrol mendatar untuk jadual data.",
    "Kad statistik hero disusun satu lajur, boleh diskrol menegak, bukan carousel.",
  ],
  touchTargets: "Minimum 44×44px untuk semua elemen yang boleh disentuh, termasuk titik data pada carta.",
  performance: [
    "Modul data ini kira-kira 250 KB tanpa mampatan. Muatkan `rciThAnalysis.core` (metadata, ui, views) dahulu; muatkan modul data berat atas permintaan setiap pandangan.",
    "Elakkan animasi pada carta timeline penuh; ia mempunyai lebih 80 peristiwa.",
  ],
  textSizing: "Saiz asas 16px minimum. Label carta tidak lebih kecil daripada 12px.",
  orientation:
    "Sokong potret sahaja untuk aliran naratif. Landskap boleh membuka kunci pandangan timeline mendatar penuh sebagai bonus, bukan keperluan.",
  offline:
    "Modul ini statik sepenuhnya — tiada permintaan rangkaian selepas muat awal. Ia boleh dicache sepenuhnya.",
};

export const accessibilityRequirements = [
  "Setiap carta mesti mempunyai alternatif jadual yang boleh dicapai dengan satu klik.",
  "Setiap carta mesti mempunyai `aria-label` yang menerangkan apa yang ditunjukkan dan kesimpulan utamanya.",
  "Warna tidak boleh menjadi satu-satunya pembawa maklumat — gunakan corak, bentuk atau label bersama warna (khususnya untuk fakta vs unjuran).",
  "Nisbah kontras minimum 4.5:1 untuk teks, 3:1 untuk elemen grafik.",
  "Navigasi papan kekunci penuh untuk semua penapis, peluncur dan drill-down.",
  "Hormati `prefers-reduced-motion` — matikan peralihan carta.",
  "Bahasa halaman ditetapkan `lang=\"ms\"`. Istilah Inggeris dalam kurungan ditandakan `lang=\"en\"`.",
];

/* ------------------------------------------------------------------ *
 * KRITERIA PENERIMAAN
 * ------------------------------------------------------------------ */

export const acceptanceCriteria = [
  { id: "ac-1", category: "Kebolehkesanan", criterion: "Setiap angka yang dipaparkan boleh dijejak kepada perenggan laporan dalam tiga klik atau kurang.", test: "Ambil 20 angka rawak daripada UI; setiap satu mesti mempunyai laluan ke sumbernya." },
  { id: "ac-2", category: "Kebolehkesanan", criterion: "Tiada angka dalam UI yang tidak wujud dalam modul data.", test: "Cari kod UI untuk literal berangka; setiap satu mesti datang daripada import." },
  { id: "ac-3", category: "Kejujuran", criterion: "Setiap angka terbitan dilabel 'Terbitan' dan menunjukkan formulanya.", test: "Tapis mengikut factType='derived'; setiap satu mesti mempunyai panel formula." },
  { id: "ac-4", category: "Kejujuran", criterion: "Setiap unjuran dilabel 'Unjuran' dan tidak muncul dalam kad hero.", test: "Periksa kad hero; tiada satu pun boleh mempunyai factType='reportProjection' atau 'simulation'." },
  { id: "ac-5", category: "Kejujuran", criterion: "Nilai simulasi tidak pernah kelihatan sebagai fakta.", test: "Aktifkan simulasi; nilai mesti mempunyai kelegapan berbeza dan disclaimer tetap yang kelihatan." },
  { id: "ac-6", category: "Kejujuran", criterion: "Setiap percanggahan dalam `dataConflicts` boleh dicapai dalam UI.", test: "Setiap id percanggahan mesti muncul sekurang-kurangnya sekali sebagai lencana atau baris jadual. Gunakan `rciThAnalysis.summary.conflictCount` sebagai jumlah rujukan." },
  { id: "ac-7", category: "Kejujuran", criterion: "Setiap jurang data dalam `dataGaps` dipaparkan, bukan disembunyikan.", test: "Halaman 'Apa yang kita tidak tahu' mesti menyenaraikan kesemuanya (rujuk `rciThAnalysis.summary.gapCount`)." },
  { id: "ac-8", category: "Integriti", criterion: "`runIntegrityChecks()` berjalan semasa muat dan setiap pemeriksaan berkelakuan seperti dijangka.", test: "verdict mesti 'Semua pemeriksaan berkelakuan seperti dijangka'." },
  { id: "ac-9", category: "Integriti", criterion: "Tiada lajur yang ditanda 'tidak boleh dijumlahkan' memaparkan baris jumlah.", test: "Carta pelaburan dan jadual pelaburan tidak boleh mempunyai baris jumlah." },
  { id: "ac-10", category: "Integriti", criterion: "Nilai mata wang asing tidak pernah dicampur dengan RM dalam satu paksi atau satu jumlah.", test: "Carta pelaburan mesti difasetkan mengikut mata wang." },
  { id: "ac-11", category: "Kebolehfahaman", criterion: "Setiap istilah teknikal mempunyai penjelasan satu ayat yang boleh dicapai daripada tempat ia pertama kali muncul.", test: "Semak setiap istilah dalam `glossary` muncul dengan penanda penjelasan." },
  { id: "ac-12", category: "Kebolehfahaman", criterion: "Tiada istilah teknikal dalam tajuk carta tanpa penjelasan dalam subtajuk.", test: "Semak kesemua tajuk dalam `chartCopy`." },
  { id: "ac-13", category: "Kebolehfahaman", criterion: "Setiap carta menjawab empat soalan: apa yang ditunjukkan, kenapa penting, kesimpulan munasabah, batas kesimpulan.", test: "Setiap entri `chartCopy` mesti mempunyai keempat-empat medan." },
  { id: "ac-14", category: "Mobile", criterion: "Tiada skrol mendatar pada mana-mana halaman pada 360px.", test: "Uji setiap pandangan pada 360×640." },
  { id: "ac-15", category: "Mobile", criterion: "Semua sasaran sentuh sekurang-kurangnya 44×44px.", test: "Audit elemen interaktif." },
  { id: "ac-16", category: "Mobile", criterion: "Setiap carta mempunyai susun atur mudah alih yang ditakrifkan dalam `visualisations[].mobile`.", test: "Setiap visualisasi mesti mempunyai medan `mobile`." },
  { id: "ac-17", category: "Kebolehcapaian", criterion: "Setiap carta mempunyai alternatif jadual dan aria-label.", test: "Audit dengan pembaca skrin." },
  { id: "ac-18", category: "Kebolehcapaian", criterion: "Fakta dan unjuran dibezakan oleh corak, bukan warna sahaja.", test: "Lihat dalam mod skala kelabu." },
  { id: "ac-19", category: "Keadaan", criterion: "Setiap keadaan dalam `stateMatrix` boleh dicetuskan dan mempunyai UI yang ditakrifkan.", test: "Cetuskan setiap keadaan secara manual." },
  { id: "ac-20", category: "Keadaan", criterion: "Keadaan 'kosong mengikut reka bentuk' tidak pernah menunjukkan carta kosong.", test: "Tapis kepada tahun tanpa data; mesti menunjukkan mesej, bukan paksi kosong." },
  { id: "ac-21", category: "Prestasi", criterion: "Muat awal di bawah 200 KB JavaScript untuk pandangan ringkasan.", test: "Ukur berat bundle." },
  { id: "ac-22", category: "Naratif", criterion: "Susunan pandangan mengikut `narrativeOrder`, bukan susunan bab laporan.", test: "Bandingkan navigasi dengan `narrativeOrder`." },
  { id: "ac-23", category: "Naratif", criterion: "Halaman 'Apa yang kita tidak tahu' boleh dicapai dari mana-mana halaman.", test: "Semak kaki halaman setiap pandangan." },
  { id: "ac-24", category: "Bahasa", criterion: "Semua teks UI dalam Bahasa Melayu; istilah Inggeris hanya dalam kurungan selepas terjemahan.", test: "Audit teks; tiada tajuk atau label Inggeris sahaja." },
];

/* ------------------------------------------------------------------ *
 * PERKARA YANG TIDAK BOLEH DIBINA
 * ------------------------------------------------------------------ */

export const prohibitedVisualisations = [
  { id: "no-lorenz", visual: "Lengkung Lorenz atau histogram taburan deposit", reason: "Hanya dua titik tumpuan wujud dalam laporan.", instead: "Dua kad statistik dengan teks penjelasan." },
  { id: "no-total-loss", visual: "Satu angka 'jumlah kerugian LTH'", reason: "Tiada asas yang konsisten; angka RM10 bilion dalam laporan tidak boleh direkonsiliasikan.", instead: "Beberapa angka berlabel dengan asas masing-masing." },
  { id: "no-investment-sum", visual: "Jumlah pendedahan 14 pelaburan", reason: "Asas berbeza antara kes; empat kes dalam mata wang asing tanpa kadar tukaran.", instead: "Bar berfaset mengikut mata wang, tiada jumlah." },
  { id: "no-reserve-trend", visual: "Garis trend nilai rizab", reason: "Tiada nilai RM rizab untuk mana-mana tahun kecuali sasaran 2019.", instead: "Garis masa naratif polisi rizab." },
  { id: "no-portfolio-pie", visual: "Pai komposisi portfolio pelaburan", reason: "Tiada data SAA atau pecahan kelas aset dalam laporan.", instead: "Petikan kualitatif Roland Berger dengan label 'tiada data berangka'." },
  { id: "no-benchmark", visual: "Perbandingan kadar LTH dengan ASB, KWSP atau bank Islam", reason: "Tiada kadar pihak ketiga dalam laporan.", instead: "Nyatakan pemerhatian Suruhanjaya sebagai teks dengan nota bahawa data pembanding tidak disediakan." },
  { id: "no-unit-derivation", visual: "Bilangan unit saham daripada jadual saham mewah", reason: "Lajur agregat tidak konsisten dengan harga seunit.", instead: "Papar harga seunit dan nilai agregat secara berasingan dengan amaran." },
  { id: "no-pilgrim-count", visual: "Carta bilangan jemaah 2014–2019 daripada jadual HAFIS", reason: "Nilai tersirat melompat 73% tanpa penjelasan.", instead: "Papar sebagai bukti ketidakkonsistenan dalam halaman 'Apa yang kita tidak tahu'." },
  { id: "no-interpolation", visual: "Garis antara tiga senario ambang rosot nilai", reason: "Hanya tiga titik diskret; hubungan tidak linear.", instead: "Tiga bar berasingan." },
  { id: "no-waiting-time-curve", visual: "Lengkung tempoh menunggu berbanding deposit minimum", reason: "Hanya dua titik wujud dan model EY tidak didedahkan.", instead: "Dua nilai dengan nota tentang percanggahan 130 vs 135 tahun." },
  { id: "no-smooth-deposit-line", visual: "Garis pepejal trend deposit", reason: "Hanya empat titik data pada tarikh tidak sekata.", instead: "Titik dengan penyambung putus-putus." },
  { id: "no-implementation-progress", visual: "Bar kemajuan pelaksanaan syor", reason: "Laporan bertarikh Julai 2022; tiada data pelaksanaan.", instead: "Senarai syor dengan status 'tidak diketahui daripada laporan ini'." },
];
