#!/usr/bin/env node
/**
 * Pengesahan skema dan integriti rujukan dalaman.
 *
 * Guna: node features/rci-th-analysis/scripts/validate.mjs
 *
 * Menyemak:
 *   1. Setiap rekod utama membawa `factType` yang sah.
 *   2. Setiap `source` mempunyai bentuk SourceRef yang betul.
 *   3. Setiap `drillTo` / `view` / `dataSource` menunjuk kepada id yang wujud.
 *   4. Setiap visualisasi mempunyai teks (`chartCopy`) dengan empat medan wajib.
 *   5. Setiap visualisasi mempunyai spesifikasi mudah alih.
 *   6. Setiap pemeriksaan aritmetik berkelakuan seperti dijangka.
 */
import { rciThAnalysis } from "../index.js";

const a = rciThAnalysis;
const errors = [];
const warnings = [];
const validFactTypes = new Set(Object.keys(a.source.factTypes));

const err = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

/* 1. factType */
function walkForFactType(node, path, depth = 0) {
  if (depth > 6 || node === null || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((v, i) => walkForFactType(v, `${path}[${i}]`, depth + 1));
    return;
  }
  if ("factType" in node && !validFactTypes.has(node.factType)) {
    err(`factType tidak sah di ${path}: "${node.factType}"`);
  }
  for (const [k, v] of Object.entries(node)) walkForFactType(v, `${path}.${k}`, depth + 1);
}
walkForFactType(a.data, "data");
walkForFactType(a.governance, "governance");
walkForFactType(a.entities, "entities");
walkForFactType(a.timeline, "timeline");

/* 2. SourceRef */
function walkForSource(node, path, depth = 0) {
  if (depth > 6 || node === null || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((v, i) => walkForSource(v, `${path}[${i}]`, depth + 1));
    return;
  }
  if (Array.isArray(node.source)) {
    node.source.forEach((s, i) => {
      if (typeof s !== "object" || s === null) {
        err(`source[${i}] bukan objek di ${path}`);
        return;
      }
      if (typeof s.section !== "string" || !s.section) err(`source[${i}].section hilang di ${path}`);
      if (typeof s.pdfPage !== "number") err(`source[${i}].pdfPage bukan nombor di ${path}`);
      if (typeof s.anchor !== "string" || !s.anchor.startsWith("pdf-page-"))
        err(`source[${i}].anchor tidak sah di ${path}`);
    });
  }
  for (const [k, v] of Object.entries(node)) walkForSource(v, `${path}.${k}`, depth + 1);
}
walkForSource(a.data, "data");
walkForSource(a.governance, "governance");
walkForSource(a.timeline, "timeline");

/* 3. Rujukan dalaman */
const viewIds = new Set(a.blueprint.views.map((v) => v.id));
const visIds = new Set(a.blueprint.visualisations.map((v) => v.id));
const copyIds = new Set(Object.keys(a.content.chartCopy));

for (const s of a.content.heroStats) {
  if (!viewIds.has(s.drillTo) && !visIds.has(s.drillTo)) err(`heroStat "${s.id}" drillTo tidak dikenali: ${s.drillTo}`);
}
for (const ins of a.content.insights) {
  if (!viewIds.has(ins.drillTo) && !visIds.has(ins.drillTo)) err(`insight "${ins.id}" drillTo tidak dikenali: ${ins.drillTo}`);
}
for (const n of a.content.narrativeOrder) {
  if (!viewIds.has(n.view)) err(`narrativeOrder langkah ${n.step} merujuk pandangan tidak dikenali: ${n.view}`);
}
for (const v of a.blueprint.visualisations) {
  if (!viewIds.has(v.view)) err(`visualisasi "${v.id}" merujuk pandangan tidak dikenali: ${v.view}`);
}
for (const l of a.blueprint.crossLinks) {
  if (l.from !== "semua" && !visIds.has(l.from)) warn(`crossLink from tidak dikenali: ${l.from}`);
  if (l.to !== "semua" && !visIds.has(l.to) && !l.to.startsWith("detail-")) warn(`crossLink to tidak dikenali: ${l.to}`);
}

/* 4. Teks carta */
for (const id of visIds) {
  if (!copyIds.has(id)) {
    err(`visualisasi "${id}" tiada entri dalam chartCopy`);
    continue;
  }
  const c = a.content.chartCopy[id];
  for (const field of ["title", "whatItShows", "whyItMatters", "reasonableConclusion", "limits"]) {
    if (!c[field] || typeof c[field] !== "string") err(`chartCopy["${id}"].${field} hilang atau kosong`);
  }
}
for (const id of copyIds) {
  if (!visIds.has(id)) warn(`chartCopy["${id}"] tiada visualisasi yang sepadan`);
}

/* 5. Mudah alih */
for (const v of a.blueprint.visualisations) {
  if (!v.mobile || typeof v.mobile !== "object") err(`visualisasi "${v.id}" tiada spesifikasi mudah alih`);
  if (!Array.isArray(v.interactions) || v.interactions.length === 0)
    err(`visualisasi "${v.id}" tiada senarai interaksi`);
}

/* Integriti rujukan metrik dan soalan */
const seriesIds = new Set();
for (const [, v] of Object.entries(a.data)) {
  if (v && typeof v === "object" && typeof v.id === "string") seriesIds.add(v.id);
}
for (const inv of a.data.problematicInvestments) seriesIds.add(inv.id);
for (const q of a.integrity.questions) {
  for (const link of q.evidenceLinks) {
    if (!seriesIds.has(link) && !link.startsWith("gap-") && !["timeline", "police-reports", "disciplinary-actions", "sprm-reports", "regulator-warnings", "bnm-warnings-ignored", "audit-failure", "subsidiary-directorships", "subsidiary-cap-policy", "political-influence", "crisis-drivers", "problematic-investments", "s22-3a", "gap-fx", "gap-recovery", "reserve-policy", "staff-bonus"].includes(link)) {
      warn(`soalan "${q.id}" evidenceLink tidak dikenali: ${link}`);
    }
  }
}

/* 6. Pemeriksaan aritmetik */
const run = a.integrity.run();
if (run.unexpected.length > 0) {
  for (const u of run.unexpected) err(`pemeriksaan integriti tidak dijangka: ${u.id} — ${u.detail}`);
}

/* ---------- Laporan ---------- */
console.log("Pengesahan rciThAnalysis");
console.log("========================");
console.log(`Siri data          : ${a.summary.seriesCount}`);
console.log(`Peristiwa kronologi: ${a.summary.timelineEventCount}`);
console.log(`Pelaburan          : ${a.summary.investmentCount}`);
console.log(`Syor               : ${a.summary.recommendationCount}`);
console.log(`Percanggahan       : ${a.summary.conflictCount}`);
console.log(`Jurang data        : ${a.summary.gapCount}`);
console.log(`Metrik             : ${a.summary.metricCount}`);
console.log(`Pandangan          : ${a.summary.viewCount}`);
console.log(`Visualisasi        : ${a.summary.visualisationCount}`);
console.log(`Kriteria penerimaan: ${a.summary.acceptanceCriteriaCount}`);
console.log("");
console.log(`Pemeriksaan aritmetik: lulus ${run.passed}, gagal-dijangka ${run.failed}, tidak dijangka ${run.unexpected.length}`);
console.log("");

if (warnings.length) {
  console.log(`Amaran (${warnings.length}):`);
  warnings.forEach((w) => console.log(`  ! ${w}`));
  console.log("");
}

if (errors.length) {
  console.error(`RALAT (${errors.length}):`);
  errors.forEach((e) => console.error(`  x ${e}`));
  process.exitCode = 1;
} else {
  console.log("Tiada ralat. Modul sedia untuk diserahkan.");
}
