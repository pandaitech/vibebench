/**
 * Definisi jenis untuk `rciThAnalysis`.
 *
 * Jenis di sini sengaja longgar di bahagian data khusus (menggunakan indeks
 * bersignatur) supaya entiti hiliran boleh menambah medan tanpa memecahkan
 * kompilasi. Bahagian yang KETAT ialah `SourceRef`, `FactType` dan struktur
 * blueprint — kerana itulah kontrak yang perlu dipatuhi.
 */

/** Jenis maklumat. Setiap rekod yang dipaparkan mesti membawa salah satu. */
export type FactType =
  | "fact"
  | "reportProjection"
  | "thirdPartyEstimate"
  | "derived"
  | "simulation"
  | "opinion"
  | "gap";

/** Rujukan kepada perenggan asal dalam laporan. */
export interface SourceRef {
  /** Nombor perenggan/seksyen laporan, cth "3.9.12". */
  section: string;
  /** Nombor muka surat fizikal PDF (juga anchor dalam markdown). */
  pdfPage: number;
  /** Label muka surat bercetak, jika ada. */
  printedPage: number | string | null;
  /** Anchor dalam dokumen markdown, cth "pdf-page-116". */
  anchor: string;
  /** URL penuh ke anchor. */
  url: string | null;
  /** Nota tambahan, cth amaran OCR. */
  note: string | null;
}

/** Asas bagi setiap rekod data. */
export interface Traceable {
  factType: FactType;
  source?: SourceRef[];
}

/** Siri data tabular. */
export interface DataSeries<TRow = Record<string, unknown>> extends Traceable {
  id: string;
  unit?: string;
  basis?: string;
  rows: TRow[];
  totals?: Record<string, number>;
  reconciliationNotes?: string[];
  cautions?: string[];
}

/* ---------- Baris khusus yang paling kerap digunakan ---------- */

export interface AssetLiabilityRow {
  year: number;
  totalAssets_rm_million: number;
  totalLiabilities_rm_million: number;
  surplusPreDistribution_rm_million: number;
  distribution_rm_million: number;
  surplusPostDistribution_rm_million: number;
}

export interface HibahRateRow {
  year: number;
  annual_pct: number;
  hajj_pct: number;
}

export interface HibahAmountRow {
  year: number;
  rateLabel: string;
  annual_rm_thousand: number;
  hajj_rm_thousand: number | null;
  total_rm_thousand: number;
}

export interface HafisRow {
  year: number;
  hajjCost_rm: number;
  pilgrimPayment_rm: number;
  hafisPerPerson_rm: number;
  hafisShare_pct: number;
  hafisTotal_rm_million?: number;
  hafisTotal_rm_thousand?: number;
}

/* ---------- Kronologi ---------- */

export interface TimelineEvent extends Traceable {
  id: string;
  date: string;
  dateEnd?: string;
  precision: "day" | "month" | "year" | "range";
  track: string;
  impact: "critical" | "high" | "medium" | "context";
  title: string;
  body: string;
  links?: string[];
  future?: boolean;
}

/* ---------- Pelaburan ---------- */

export interface ProblematicInvestment extends Traceable {
  id: string;
  no: number;
  name: string;
  shortName?: string;
  sector: string;
  geography: string;
  issueType: string[];
  summary: string;
  currency: "RM" | "USD" | "SR" | "AUD";
  keyFigures: Array<{ label: string; value: number; unit: string }>;
  /** Boleh `null` apabila laporan tidak memberi nilai RM. JANGAN jumlahkan merentas rekod. */
  exposure_rm_million: number | null;
  exposureBasis: string;
  impairment_rm_million: number | null;
  dataGaps: string[];
  [key: string]: unknown;
}

/* ---------- Integriti ---------- */

export interface DataConflict {
  id: string;
  severity: "low" | "medium" | "high";
  topic: string;
  a: { claim: string; source?: SourceRef[] };
  b: { claim: string; source?: SourceRef[] };
  c?: { claim: string; source?: SourceRef[] };
  difference: string;
  resolution: "resolved" | "explained" | "unresolved";
  guidance: string;
}

export interface DataGap extends Traceable {
  id: string;
  topic: string;
  missing: string;
  consequence: string;
  severity: "low" | "medium" | "high";
}

export interface AnalyticalQuestion {
  id: string;
  rank: number;
  theme: string;
  question: string;
  answerability: "answerable" | "partial" | "not-answerable";
  canConclude: string;
  cannotConclude: string;
  correctMetric?: string;
  derived?: string;
  evidenceLinks: string[];
}

export interface IntegrityCheckResult {
  id: string;
  ok: boolean;
  detail: string;
  description: string | null;
  expected: "pass" | "fail";
  asExpected: boolean;
  note: string | null;
}

export interface IntegrityRun {
  id: string;
  passed: number;
  failed: number;
  unexpected: IntegrityCheckResult[];
  results: IntegrityCheckResult[];
  verdict: string;
}

/* ---------- Metrik ---------- */

export interface MetricDefinition {
  id: string;
  label: string;
  plainLabel?: string;
  formula: string;
  inputs?: string[];
  unit: string;
  factType: FactType;
  assumptions?: string[];
  validRange?: string;
  cannotConclude?: string;
  status?: string;
  [key: string]: unknown;
}

export interface SimulationSpec {
  id: string;
  label: string;
  plainLabel: string;
  baseData: string;
  parameters: Array<Record<string, unknown>>;
  formula: string;
  mandatoryDisclaimer: string;
  hardLimit?: string;
  factType: "simulation";
}

/* ---------- Kandungan UI ---------- */

export interface ChartCopy {
  title: string;
  subtitle?: string;
  /** Apa yang carta tunjukkan. */
  whatItShows: string;
  /** Kenapa ia penting. */
  whyItMatters: string;
  /** Kesimpulan yang munasabah daripada carta ini. */
  reasonableConclusion: string;
  /** Batas kesimpulan — apa yang carta ini TIDAK boleh buktikan. */
  limits: string;
  axisX?: string;
  axisY?: string;
  legend?: string[];
  emptyState?: string;
  hardRule?: string;
  factType?: FactType;
}

export interface HeroStat {
  id: string;
  value: string;
  label: string;
  tooltip: string;
  factType: FactType;
  sourceLabel: string;
  drillTo: string;
}

export interface Insight {
  id: string;
  headline: string;
  body: string;
  strength: "kuat" | "sederhana" | "lemah";
  factType: FactType;
  sourceLabel: string;
  drillTo: string;
  caution?: string;
}

/* ---------- Blueprint ---------- */

export interface ViewSpec {
  id: string;
  order: number;
  label: string;
  question: string;
  purpose: string;
  contains: string[];
  mobilePriority: number;
  entryPoint?: boolean;
  alwaysReachable?: boolean;
}

export interface VisualisationSpec {
  id: string;
  view: string;
  markType: string;
  dataSource: string | string[];
  encoding: Record<string, unknown>;
  interactions: string[];
  drillDown?: { target: string; trigger: string; passes: string[] };
  mobile: Record<string, unknown>;
  mandatoryNote?: string;
  mandatoryWarning?: string;
  mandatoryDisclaimer?: string;
  hardRule?: string;
  factType?: FactType;
  accessibility?: { description: string; tableAlternative: string };
}

export interface AcceptanceCriterion {
  id: string;
  category: string;
  criterion: string;
  test: string;
}

export interface ProhibitedVisualisation {
  id: string;
  visual: string;
  reason: string;
  instead: string;
}

/* ---------- Bentuk export utama ---------- */

export interface RciThAnalysisSummary {
  schemaVersion: string;
  generatedFrom: string;
  reportSignedDate: string;
  seriesCount: number;
  timelineEventCount: number;
  investmentCount: number;
  recommendationCount: number;
  conflictCount: number;
  gapCount: number;
  questionCount: number;
  metricCount: number;
  viewCount: number;
  visualisationCount: number;
  acceptanceCriteriaCount: number;
  prohibitedVisualisationCount: number;
  glossaryTermCount: number;
  ocrCorrectionCount: number;
}

export interface RciThAnalysis {
  summary: RciThAnalysisSummary;
  source: {
    report: Record<string, unknown>;
    commissioners: Array<Record<string, unknown>>;
    methods: Array<Record<string, unknown>>;
    agencyBriefings: Array<Record<string, unknown>>;
    exhibitVolumes: Array<Record<string, unknown>>;
    limitations: Array<Record<string, unknown>>;
    ocrCorrections: Array<Record<string, unknown>>;
    factTypes: Record<FactType, { id: FactType; label: string; short: string; description: string; colorRole: string }>;
    glossary: Array<{ term: string; plain: string; why: string; factType: FactType }>;
    abbreviations: Array<{ abbr: string; meaning: string; factType: FactType }>;
    currencyUnits: Record<string, { code: string; label: string; note?: string; locale?: string }>;
    sourceRef: (section: string, pdfPage: number, printedPage?: number | string | null, note?: string | null) => SourceRef;
    baseUrl: string;
  };
  entities: Record<string, unknown>;
  timeline: {
    tracks: Array<{ id: string; label: string; short: string }>;
    events: TimelineEvent[];
    decisionWindows: Array<Record<string, unknown>>;
  };
  data: {
    assetsLiabilities: DataSeries<AssetLiabilityRow>;
    hibahRates: DataSeries<HibahRateRow>;
    hibahAmounts: DataSeries<HibahAmountRow>;
    hafisActual: DataSeries<HafisRow>;
    hafisProjection: DataSeries<HafisRow>;
    problematicInvestments: ProblematicInvestment[];
    [key: string]: unknown;
  };
  governance: Record<string, unknown>;
  integrity: {
    conflicts: DataConflict[];
    gaps: DataGap[];
    questions: AnalyticalQuestion[];
    checkSpecs: Array<{ id: string; description: string; expected: "pass" | "fail"; note?: string }>;
    run: () => IntegrityRun;
  };
  analytics: {
    metrics: MetricDefinition[];
    dimensions: Array<Record<string, unknown>>;
    filters: Array<Record<string, unknown>>;
    comparisons: Array<Record<string, unknown>>;
    simulations: SimulationSpec[];
    deliberatelyOmittedMetrics: Array<{ id: string; label: string; reason: string }>;
    derive: Record<string, (...args: never[]) => unknown>;
  };
  content: {
    app: { title: string; subtitle: string; tagline: string; sourceLine: string };
    heroStats: HeroStat[];
    chartCopy: Record<string, ChartCopy>;
    insights: Insight[];
    sectionSummaries: Record<string, string>;
    limitationNotices: Record<string, string>;
    states: Record<string, { title: string; body: string; action?: string }>;
    labels: Record<string, string>;
    formatting: Record<string, unknown>;
    narrativeOrder: Array<{ step: number; view: string; question: string; oneLiner: string }>;
    explainerStrategy: Record<string, unknown>;
  };
  blueprint: {
    views: ViewSpec[];
    visualisations: VisualisationSpec[];
    interactions: Array<Record<string, unknown>>;
    informationHierarchy: Record<string, unknown>;
    crossLinks: Array<{ from: string; to: string; reason: string }>;
    stateMatrix: Array<{ state: string; trigger: string; ui: string }>;
    mobileRequirements: Record<string, unknown>;
    accessibilityRequirements: string[];
    acceptanceCriteria: AcceptanceCriterion[];
    prohibitedVisualisations: ProhibitedVisualisation[];
  };
}

export declare const rciThAnalysis: RciThAnalysis;
export declare const rciThAnalysisCore: Pick<RciThAnalysis, "summary" | "content"> & {
  source: Partial<RciThAnalysis["source"]>;
  blueprint: Partial<RciThAnalysis["blueprint"]>;
};
export default rciThAnalysis;
