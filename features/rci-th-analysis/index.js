/**
 * rciThAnalysis — asas analitik untuk Laporan Suruhanjaya Siasatan Diraja
 * Tabung Haji (2014–2020).
 *
 * Import utama:
 *   import { rciThAnalysis } from "./features/rci-th-analysis/index.js";
 *
 * Modul ini adalah ESM tulen, tanpa kebergantungan luar, dan tidak terikat
 * kepada mana-mana perpustakaan visualisasi.
 *
 * Peraturan yang WAJIB dipatuhi oleh entiti hiliran:
 *   1. Setiap angka yang dipaparkan mesti membawa laluan ke `source`.
 *   2. Setiap angka mesti dilabel mengikut `factType` — jangan campurkan
 *      fakta laporan dengan data terbitan, unjuran atau simulasi.
 *   3. Lajur yang ditanda `hardRule` atau `cannotSum` TIDAK boleh dijumlahkan.
 *   4. Data yang tiada dalam laporan kekal tiada. Jangan anggar.
 */

import * as meta from "./src/meta.js";
import * as entities from "./src/entities.js";
import * as timeline from "./src/timeline.js";
import * as financials from "./src/financials.js";
import * as investments from "./src/investments.js";
import * as governance from "./src/governance.js";
import * as integrity from "./src/integrity.js";
import * as metricsModule from "./src/metrics.js";
import * as derive from "./src/derive.js";
import * as ui from "./src/ui.js";
import * as views from "./src/views.js";

/** Metadata dan peraturan sumber. */
const source = {
  report: meta.reportMeta,
  commissioners: meta.commissioners,
  methods: meta.investigationMethods,
  agencyBriefings: meta.agencyBriefings,
  exhibitVolumes: meta.exhibitVolumes,
  limitations: meta.sourceLimitations,
  ocrCorrections: meta.ocrCorrections,
  factTypes: meta.factTypes,
  glossary: meta.glossary,
  abbreviations: meta.abbreviations,
  currencyUnits: meta.currencyUnits,
  sourceRef: meta.sourceRef,
  baseUrl: meta.SOURCE_BASE,
};

/** Entiti: orang, jawatan, organisasi, jawatankuasa. */
const entitiesBundle = {
  supervisingMinisters: entities.supervisingMinisters,
  ministerialGap: entities.ministerialGap,
  chairmen: entities.chairmen,
  chiefExecutives: entities.chiefExecutives,
  treasuryRepresentatives: entities.treasuryRepresentatives,
  pmDepartmentRepresentatives: entities.pmDepartmentRepresentatives,
  pmDepartmentSeatVacancy: entities.pmDepartmentSeatVacancy,
  appointedBoardMembers: entities.appointedBoardMembers,
  subsidiaryDirectorships: entities.subsidiaryDirectorships,
  subsidiaryCapPolicy: entities.subsidiaryCapPolicy,
  committees: entities.committees,
  investmentPanel: entities.investmentPanel,
  shariahAdvisoryCommittee: entities.shariahAdvisoryCommittee,
  hajjCommittees: entities.hajjCommittees,
  organisations: entities.organisations,
  institutionalHistory: entities.institutionalHistory,
};

/** Data mentah yang dinormalisasi. */
const data = {
  // Kesolvenan dan hibah
  assetsLiabilities: financials.assetsLiabilities,
  depositorFundClassification: financials.depositorFundClassification,
  hibahRates: financials.hibahRates,
  hibahAmounts: financials.hibahAmounts,
  hibahCalculationChange2017: financials.hibahCalculationChange2017,

  // Perakaunan 2017
  ravReconciliation2017: financials.ravReconciliation2017,
  unrecordedImpairment2017: financials.unrecordedImpairment2017,
  impairmentPolicy2017: financials.impairmentPolicy2017,
  pwcAdjustment2017: financials.pwcAdjustment2017,

  // Bonus
  staffBonus: financials.staffBonus,
  bonusVersusProfit: financials.bonusVersusProfit,
  bonusDistributionBands: financials.bonusDistributionBands,
  thPropertiesBonus2017: financials.thPropertiesBonus2017,
  thpAustraliaBonus2018: financials.thpAustraliaBonus2018,
  thPropertiesBonusLegalFindings: financials.thPropertiesBonusLegalFindings,

  // Pemulihan dan UJSB
  rescueOptions2018: financials.rescueOptions2018,
  ujsb: financials.ujsb,
  assetTransfer: financials.assetTransfer,
  propertyTransferDetail: financials.propertyTransferDetail,
  bluechipTransfer: financials.bluechipTransfer,
  sukukSeries: financials.sukukSeries,
  sukukAccrual: financials.sukukAccrual,
  governmentFunding: financials.governmentFunding,
  guaranteeCommitments: financials.guaranteeCommitments,
  ujsbDisposals: financials.ujsbDisposals,
  rofrOffers: financials.rofrOffers,

  // Deposit
  depositTrajectory: financials.depositTrajectory,
  depositorCounts: financials.depositorCounts,
  depositConcentration: financials.depositConcentration,
  reservePolicy: financials.reservePolicy,
  shariahContractChanges: financials.shariahContractChanges,

  // Haji
  hafisActual: financials.hafisActual,
  hajjCostProjection: financials.hajjCostProjection,
  hafisProjection: financials.hafisProjection,
  hajjPaymentTiers2022: financials.hajjPaymentTiers2022,
  hajjRegistrationPolicy: financials.hajjRegistrationPolicy,
  hajjQuota: financials.hajjQuota,
  hajjSubsidyImpactOnHibah: financials.hajjSubsidyImpactOnHibah,

  // Kumulatif dan risiko
  cumulativeTotals: financials.cumulativeTotals,
  governmentGuaranteeExposure: financials.governmentGuaranteeExposure,
  debtCeiling: financials.debtCeiling,

  // Pelaburan
  problematicInvestments: investments.problematicInvestments,
  investmentProcessFailures: investments.investmentProcessFailures,
  strategicInvestmentAssessment: investments.strategicInvestmentAssessment,
};

/** Tadbir urus, kawal selia, penguatkuasaan dan syor. */
const governanceBundle = {
  keyLegalProvisions: governance.keyLegalProvisions,
  ministerialPowers: governance.ministerialPowers,
  politicalInfluence: governance.politicalInfluence,
  bnmOversight: governance.bnmOversight,
  regulatorWarnings: governance.regulatorWarnings,
  bnmWarningsIgnored: governance.bnmWarningsIgnored,
  auditFailure: governance.auditFailure,
  eyRavRole: governance.eyRavRole,
  cfoPosition: governance.cfoPosition,
  policeReports: governance.policeReports,
  disciplinaryActions: governance.disciplinaryActions,
  macpReports: governance.macpReports,
  litigation: governance.litigation,
  businessModelProposals: governance.businessModelProposals,
  externalFundManagerPerformance: governance.externalFundManagerPerformance,
  crisisDrivers: governance.crisisDrivers,
  recommendations: governance.recommendations,
  improvementsSince2017: governance.improvementsSince2017,
};

/** Kronologi. */
const timelineBundle = {
  tracks: timeline.timelineTracks,
  events: timeline.timelineEvents,
  decisionWindows: timeline.decisionWindows,
};

/** Integriti data. */
const integrityBundle = {
  conflicts: integrity.dataConflicts,
  gaps: integrity.dataGaps,
  questions: integrity.analyticalQuestions,
  checkSpecs: integrity.integrityCheckSpecs,
  run: derive.runIntegrityChecks,
};

/** Metrik, dimensi, penapis, perbandingan, simulasi. */
const analytics = {
  metrics: metricsModule.metrics,
  dimensions: metricsModule.dimensions,
  filters: metricsModule.filters,
  comparisons: metricsModule.comparisons,
  simulations: metricsModule.simulations,
  deliberatelyOmittedMetrics: metricsModule.deliberatelyOmittedMetrics,
  derive: derive.derivations,
};

/** Kandungan UI Bahasa Melayu siap guna. */
const content = {
  app: ui.appMeta,
  heroStats: ui.heroStats,
  chartCopy: ui.chartCopy,
  insights: ui.insights,
  sectionSummaries: ui.sectionSummaries,
  limitationNotices: ui.limitationNotices,
  states: ui.states,
  labels: ui.labels,
  formatting: ui.formatting,
  narrativeOrder: ui.narrativeOrder,
  explainerStrategy: ui.explainerStrategy,
};

/** Blueprint pelaksanaan. */
const blueprint = {
  views: views.views,
  visualisations: views.visualisations,
  interactions: views.interactions,
  informationHierarchy: views.informationHierarchy,
  crossLinks: views.crossLinks,
  stateMatrix: views.stateMatrix,
  mobileRequirements: views.mobileRequirements,
  accessibilityRequirements: views.accessibilityRequirements,
  acceptanceCriteria: views.acceptanceCriteria,
  prohibitedVisualisations: views.prohibitedVisualisations,
};

/** Ringkasan kiraan — berguna untuk ujian dan paparan meta. */
const summary = {
  schemaVersion: "1.0.0",
  generatedFrom: meta.SOURCE_BASE,
  reportSignedDate: meta.reportMeta.signedDate,
  seriesCount: Object.keys(data).length,
  timelineEventCount: timeline.timelineEvents.length,
  investmentCount: investments.problematicInvestments.length,
  recommendationCount: governance.recommendations.length,
  conflictCount: integrity.dataConflicts.length,
  gapCount: integrity.dataGaps.length,
  questionCount: integrity.analyticalQuestions.length,
  metricCount: metricsModule.metrics.length,
  viewCount: views.views.length,
  visualisationCount: views.visualisations.length,
  acceptanceCriteriaCount: views.acceptanceCriteria.length,
  prohibitedVisualisationCount: views.prohibitedVisualisations.length,
  glossaryTermCount: meta.glossary.length,
  ocrCorrectionCount: meta.ocrCorrections.length,
};

/**
 * Export utama.
 */
export const rciThAnalysis = {
  summary,
  source,
  entities: entitiesBundle,
  timeline: timelineBundle,
  data,
  governance: governanceBundle,
  integrity: integrityBundle,
  analytics,
  content,
  blueprint,
};

/**
 * Subset ringan untuk muat awal (lihat `blueprint.mobileRequirements.performance`).
 * Mengandungi hanya apa yang diperlukan untuk merender pandangan ringkasan
 * dan navigasi, tanpa siri data penuh.
 */
export const rciThAnalysisCore = {
  summary,
  source: { report: source.report, factTypes: source.factTypes, limitations: source.limitations, baseUrl: source.baseUrl },
  content,
  blueprint: { views: blueprint.views, informationHierarchy: blueprint.informationHierarchy, mobileRequirements: blueprint.mobileRequirements },
};

export default rciThAnalysis;

// Export bernama untuk import terpilih tanpa memuatkan keseluruhan objek.
export { meta, entities, timeline, financials, investments, governance, integrity, metricsModule as metrics, derive, ui, views };
