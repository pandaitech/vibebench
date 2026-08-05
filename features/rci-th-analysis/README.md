# rci-th-analysis

Asas analitik untuk **Laporan Suruhanjaya Siasatan Diraja Tabung Haji (2014–2020)**.

Modul ini mengandungi data laporan yang telah dinormalisasi, metadata sumber, data terbitan
berformula, definisi metrik, kandungan UI dalam Bahasa Melayu, dan blueprint pelaksanaan
dashboard EDA. Ia **tidak** mengandungi sebarang UI atau route — itu tugas entiti seterusnya.

**Sumber tunggal:** <https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md>
(252 muka surat PDF, hasil OCR). Tiada data luar ditambah.

---

## Lokasi fail

```
features/rci-th-analysis/
├── index.js                    Export utama: rciThAnalysis
├── index.d.ts                  Definisi jenis TypeScript
├── package.json                type: module, exports, skrip
├── README.md                   Fail ini
├── BLUEPRINT.md                Blueprint pelaksanaan (naratif penuh)
├── src/
│   ├── meta.js                 Metadata laporan, sourceRef(), factTypes, glosari, pembetulan OCR
│   ├── entities.js             Orang, jawatan, tempoh perkhidmatan, organisasi, jawatankuasa
│   ├── timeline.js             111 peristiwa kronologi + jendela keputusan
│   ├── financials.js           Semua siri kewangan yang dinormalisasi (44 siri)
│   ├── investments.js          14 pelaburan bermasalah + punca sistemik
│   ├── governance.js           Peruntukan undang-undang, kawal selia, penguatkuasaan, 25 syor
│   ├── integrity.js            18 percanggahan, 17 jurang data, 12 persoalan analitik
│   ├── metrics.js              32 definisi metrik, dimensi, penapis, perbandingan, simulasi
│   ├── derive.js               Fungsi terbitan tulen + runIntegrityChecks()
│   ├── ui.js                   Kandungan Bahasa Melayu siap guna (tajuk, tooltip, insight, nota)
│   └── views.js                Blueprint sebagai data: pandangan, visualisasi, interaksi, kriteria
├── scripts/
│   ├── validate.mjs            Pengesahan skema + integriti rujukan dalaman
│   └── export-json.mjs         Menjana dist/*.json daripada modul ESM
└── dist/
    ├── rci-th-analysis.json    Snapshot JSON (terbitan — jangan edit)
    └── integrity-report.json   Keputusan pemeriksaan aritmetik
```

---

## Cara import

### ESM (disyorkan)

```js
import { rciThAnalysis } from "./features/rci-th-analysis/index.js";
```

### Import terpilih (bundle lebih kecil)

```js
import { hibahRates, assetsLiabilities } from "./features/rci-th-analysis/src/financials.js";
import { chartCopy, heroStats } from "./features/rci-th-analysis/src/ui.js";
import { derivations } from "./features/rci-th-analysis/src/derive.js";
```

### Muat awal ringan

```js
// Metadata + kandungan + navigasi sahaja, tanpa siri data penuh.
import { rciThAnalysisCore } from "./features/rci-th-analysis/index.js";
```

### JSON (untuk stack bukan-JavaScript)

```js
import data from "./features/rci-th-analysis/dist/rci-th-analysis.json" with { type: "json" };
```

Fungsi terbitan tidak wujud dalam JSON — gunakan modul ESM jika anda perlukan `derive`.

---

## Bentuk objek

```js
rciThAnalysis = {
  summary,      // kiraan: siri, peristiwa, percanggahan, jurang, metrik, pandangan
  source,       // metadata laporan, factTypes, glosari, singkatan, pembetulan OCR, sourceRef()
  entities,     // orang, jawatan, organisasi, jawatankuasa
  timeline,     // tracks, events, decisionWindows
  data,         // 44 siri kewangan + 14 pelaburan bermasalah
  governance,   // undang-undang, kawal selia, penguatkuasaan, 25 syor, punca krisis
  integrity,    // conflicts, gaps, questions, checkSpecs, run()
  analytics,    // metrics, dimensions, filters, comparisons, simulations, derive
  content,      // teks Bahasa Melayu siap guna
  blueprint,    // views, visualisations, interactions, states, mobile, acceptance criteria
}
```

---

## Contoh penggunaan

### 1. Render kad statistik utama

```js
import { rciThAnalysis } from "./features/rci-th-analysis/index.js";

for (const stat of rciThAnalysis.content.heroStats) {
  console.log(stat.value, "—", stat.label);
  console.log("  jenis :", rciThAnalysis.source.factTypes[stat.factType].label);
  console.log("  sumber:", stat.sourceLabel);
}
// RM3.4 bilion untung → RM1.4 bilion rugi — Keuntungan 2017 selepas piawaian perakaunan penuh digunakan
//   jenis : Anggaran pihak ketiga
//   sumber: Laporan 3.13.11
```

### 2. Bina carta aset vs liabiliti dengan teks siap guna

```js
const series = rciThAnalysis.data.assetsLiabilities;
const copy = rciThAnalysis.content.chartCopy["chart-solvency-bridge"];

renderChart({
  title: copy.title,
  subtitle: copy.subtitle,
  xLabel: copy.axisX,
  yLabel: copy.axisY,
  legend: copy.legend,
  rows: series.rows,        // { year, totalAssets_rm_million, ... }
  footnote: copy.limits,    // batas kesimpulan — WAJIB dipaparkan
  emptyState: copy.emptyState,
});
```

### 3. Jejak sumber setiap angka

```js
const s = rciThAnalysis.data.ravReconciliation2017.source[0];
console.log(s.section, "· PDF m/s", s.pdfPage, "·", s.url);
// 3.9.12 · PDF m/s 116 · https://github.com/.../rci-tabung-haji.md#pdf-page-116
```

### 4. Kira data terbitan (dengan formula dan andaian)

```js
const d = rciThAnalysis.analytics.derive;

const over = d.computeHibahOverpayment();
console.log(over.formula);
console.log(over.rows.map((r) => `${r.year}: RM${r.overpayment_rm_million} juta`));
console.log("Kumulatif:", over.cumulative_rm_million, "RM juta");
console.log("Batas:", over.cannotConclude);
// 2014: RM352 juta … 2017: RM3324 juta ; Kumulatif: 9633
```

### 5. Jalankan simulasi (dengan disclaimer wajib)

```js
const sim = rciThAnalysis.analytics.derive.simulateHafis({
  pilgrimPayment_rm: 10980,   // kadar B40
  pilgrimCount: 60000,        // kuota yang dijangka menjelang 2030
});
console.log(sim.rows.at(-1)); // { year: 2030, hafisPerPerson_rm: 26749, hafisTotal_rm_million: 1604.94, ... }
console.log(sim.mandatoryDisclaimer); // WAJIB dipaparkan bersama hasil
```

### 6. Semak integriti data semasa muat

```js
const run = rciThAnalysis.integrity.run();
if (run.unexpected.length > 0) throw new Error("Data rosak: " + run.verdict);
console.log(run.verdict);
// "Semua pemeriksaan berkelakuan seperti dijangka. Kegagalan yang ada adalah
//  percanggahan yang telah didokumenkan dalam laporan asal, bukan ralat dalam modul ini."
```

### 7. Papar percanggahan dan jurang data

```js
for (const c of rciThAnalysis.integrity.conflicts.filter((c) => c.severity === "high")) {
  console.log(`[${c.resolution}] ${c.topic}`);
  console.log("  a:", c.a.claim);
  console.log("  b:", c.b.claim);
  console.log("  panduan:", c.guidance);
}
```

### 8. Elak visualisasi yang tidak sah

```js
const banned = rciThAnalysis.blueprint.prohibitedVisualisations;
// Semak senarai ini SEBELUM membina apa-apa carta baharu.
// Contoh: lengkung Lorenz taburan deposit — hanya dua titik wujud dalam laporan.
```

---

## Peraturan yang WAJIB dipatuhi entiti hiliran

1. **Setiap angka mesti boleh dijejak.** Setiap rekod membawa `source[]` dengan nombor perenggan,
   muka surat PDF dan URL anchor. Tiada angka dalam UI tanpa laluan ke sumbernya.
2. **Setiap angka mesti dilabel `factType`.** Tujuh jenis: `fact`, `reportProjection`,
   `thirdPartyEstimate`, `derived`, `simulation`, `opinion`, `gap`. Jangan campur dalam satu paksi
   tanpa pembezaan visual.
3. **Jangan jumlahkan lajur yang ditanda `hardRule` atau `cannotSum`.** Terutamanya pendedahan
   14 pelaburan bermasalah — asas berbeza dan empat kes dalam mata wang asing tanpa kadar tukaran.
4. **Jangan tukar mata wang.** Laporan hanya memberi satu titik tukaran tersirat (SR76 juta =
   RM63 juta, 2013). Faset carta mengikut mata wang.
5. **Jangan isi jurang data dengan anggaran.** Rujuk `integrity.gaps` (17 jurang) dan
   `analytics.deliberatelyOmittedMetrics` (9 metrik yang sengaja tidak dikira).
6. **Jangan bina visualisasi dalam `blueprint.prohibitedVisualisations`** (12 larangan dengan
   sebab dan alternatif).
7. **Simulasi tidak pernah muncul sebagai fakta.** Nilai simulasi tidak boleh masuk ke kad hero
   atau ringkasan, dan disclaimer mesti kekal kelihatan.

---

## Skrip

```bash
node features/rci-th-analysis/scripts/validate.mjs
```

Menyemak factType, bentuk SourceRef, rujukan silang antara pandangan/visualisasi/teks,
kelengkapan spesifikasi mudah alih, dan menjalankan 24 pemeriksaan aritmetik.
Keluar dengan kod 1 jika ada ralat.

```bash
node features/rci-th-analysis/scripts/export-json.mjs
```

Menjana semula `dist/rci-th-analysis.json` dan `dist/integrity-report.json`.
**Jangan edit fail dalam `dist/` secara manual** — edit `src/` dan jalankan semula.

---

## Nota tentang pemeriksaan yang "gagal"

`runIntegrityChecks()` melaporkan 21 lulus dan **3 gagal**. Ketiga-tiga kegagalan itu **dijangka**
dan ia adalah penemuan, bukan pepijat:

| Pemeriksaan | Apa yang gagal | Didokumenkan dalam |
| --- | --- | --- |
| `chk-bluechip-units` | Bilangan unit tersirat berbeza antara lajur nilai pemindahan dan lajur nilai pasaran dalam jadual saham mewah | `conflict-bluechip-units` |
| `chk-hafis-actual-count` | Bilangan jemaah tersirat melompat 73% antara 2016 dan 2017 tanpa penjelasan | `conflict-hafis-pilgrim-count` |
| `chk-bonus-2015` | Peruntukan bonus 2015 dilaporkan sebagai RM65 juta di 3.12.7 tetapi RM61 juta di 3.12.10 | `conflict-bonus-2015` |

Medan `run.unexpected` mesti sentiasa kosong. Jika ia tidak kosong, modul telah diubah dan
data mungkin rosak.

---

## Yang laporan TIDAK sediakan

Ringkasan pendek; senarai penuh dalam `integrity.gaps`.

- Tiada data bulanan atau suku tahunan — semua siri adalah tahunan.
- Tiada penyata kewangan penuh; jadual aset vs liabiliti berhenti pada 2017.
- Tiada nilai RM rizab untuk mana-mana tahun (kecuali sasaran RM3.5 bilion, 2019).
- Tiada komposisi portfolio pelaburan atau Alokasi Aset Strategik.
- Hanya 5 daripada 106 kaunter ekuiti yang dipindahkan dinamakan.
- 29 hartanah hanya dikumpulkan kepada 5 jenis — tiada senarai individu atau lokasi.
- Tiada kadar tukaran USD/SR/AUD.
- Tiada status pelaksanaan mana-mana daripada 25 syor (laporan bertarikh Julai 2022).
- Kesemua 12 jilid ekshibit diklasifikasikan RAHSIA dan tidak boleh disemak.

---

## Versi skema

`summary.schemaVersion = "1.0.0"`. Perubahan yang memecahkan (menukar nama medan, mengubah unit,
membuang siri) menaikkan nombor major. Menambah siri atau medan menaikkan nombor minor.
