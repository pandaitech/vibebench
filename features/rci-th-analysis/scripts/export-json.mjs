#!/usr/bin/env node
/**
 * Menjana `dist/rci-th-analysis.json` daripada modul ESM.
 *
 * Guna: node features/rci-th-analysis/scripts/export-json.mjs
 *
 * Fail JSON ialah artifak TERBITAN. Jangan edit ia secara manual —
 * edit modul dalam `src/` dan jalankan semula skrip ini.
 *
 * Fungsi (seperti `integrity.run` dan `analytics.derive`) tidak boleh
 * diserikan kepada JSON, jadi ia digantikan dengan penerangan teks.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { rciThAnalysis } from "../index.js";
import { derivations, runIntegrityChecks } from "../src/derive.js";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "..", "dist");
const outFile = resolve(outDir, "rci-th-analysis.json");
const checksFile = resolve(outDir, "integrity-report.json");

/** Menggantikan fungsi dengan penerangan supaya JSON kekal sah. */
function serialisable(value) {
  return JSON.parse(
    JSON.stringify(value, (_key, v) =>
      typeof v === "function" ? `[function ${v.name || "anonymous"} — hanya tersedia dalam modul ESM]` : v
    )
  );
}

mkdirSync(outDir, { recursive: true });

const payload = serialisable(rciThAnalysis);
payload.summary.exportedFormat = "json";
payload.summary.exportedNote =
  "Artifak terbitan daripada features/rci-th-analysis/src/*.js. Fungsi terbitan dan pemeriksaan integriti tidak disertakan — gunakan modul ESM untuk itu.";
payload.analytics.availableDerivations = Object.keys(derivations);

writeFileSync(outFile, JSON.stringify(payload, null, 2) + "\n", "utf8");

const run = runIntegrityChecks();
writeFileSync(checksFile, JSON.stringify(run, null, 2) + "\n", "utf8");

const bytes = Buffer.byteLength(JSON.stringify(payload));
console.log(`Ditulis: ${outFile} (${(bytes / 1024).toFixed(1)} KB)`);
console.log(`Ditulis: ${checksFile}`);
console.log(`Pemeriksaan integriti — lulus: ${run.passed}, gagal: ${run.failed}, tidak dijangka: ${run.unexpected.length}`);
console.log(run.verdict);

if (run.unexpected.length > 0) {
  console.error("\nPemeriksaan yang tidak berkelakuan seperti dijangka:");
  for (const u of run.unexpected) console.error(`  - ${u.id}: ${u.detail}`);
  process.exitCode = 1;
}
