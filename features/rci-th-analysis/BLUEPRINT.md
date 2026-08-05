# Blueprint pelaksanaan — Dashboard EDA Laporan RCI Tabung Haji

Dokumen ini menerangkan **apa yang perlu dibina dan mengapa**. Versi data bagi setiap
bahagian ada dalam `src/views.js` (`rciThAnalysis.blueprint`), supaya kod boleh membacanya
terus tanpa menghurai markdown.

Blueprint ini tidak mengikat anda kepada mana-mana perpustakaan carta. Setiap visualisasi
diterangkan melalui `markType` generik dan `encoding` (data → saluran visual). Pemetaan kepada
D3, Chart.js, Vega-Lite, Recharts atau SVG tulen terpulang kepada pelaksana.

---

## 1. Prinsip reka bentuk

Lima prinsip ini mengatasi keutamaan estetika apabila berlaku pertembungan.

**P1 — Kebolehkesanan mengatasi kekemasan.**
Setiap angka mesti membawa laluan ke perenggan laporan asalnya. Jika sesuatu reka bentuk
menyukarkan penjejakan sumber, reka bentuk itu yang berubah.

**P2 — Ketidakpastian adalah kandungan, bukan nota kaki.**
Percanggahan dan jurang data mendapat halaman sendiri (`view-limits`) yang boleh dicapai
dari mana-mana halaman. Ia bukan disorok di kaki halaman.

**P3 — Jangan pernah campur jenis maklumat tanpa isyarat visual.**
Fakta laporan, data terbitan, unjuran laporan, anggaran pihak ketiga, dan simulasi pengguna
mesti dibezakan dengan corak DAN warna DAN label. Lalai: hanya fakta dan terbitan dipaparkan.

**P4 — Tulis untuk pembaca yang tidak tahu apa itu 'rosot nilai'.**
Setiap istilah teknikal mempunyai penjelasan satu ayat pada sentuhan pertama. Jika sesuatu
istilah tidak boleh diterangkan dalam satu ayat, ia tidak boleh muncul dalam tajuk carta.

**P5 — Apa yang tidak boleh disimpulkan sama pentingnya dengan apa yang boleh.**
Setiap carta membawa medan `limits`. Ia tidak pernah boleh kosong.

---

## 2. Susunan naratif

Sebelas pandangan, disusun mengikut **soalan pembaca**, bukan mengikut susunan bab laporan.
Rujuk `content.narrativeOrder`.

| # | Pandangan | Soalan | Isi teras |
| --- | --- | --- | --- |
| 1 | `view-overview` | Apa yang berlaku? | Enam kad statistik + kronologi ringkas + jalur insight |
| 2 | `view-solvency` | Bila masalah bermula? | Aset vs liabiliti 2013–2017, hibah, lebihan bayaran |
| 3 | `view-accounting` | Bagaimana ia tidak kelihatan? | RAV, ambang rosot nilai, jambatan keuntungan PwC |
| 4 | `view-audit` | Siapa sepatutnya menangkapnya? | Surat BNM/KAN, keputusan audit 2017, laporan RB yang diabaikan |
| 5 | `view-ujsb` | Bagaimana ia diselamatkan? | Pemindahan aset, Sukuk, ROFR, komitmen jaminan |
| 6 | `view-investments` | Ke mana wang itu pergi? | 14 pelaburan bermasalah + punca sistemik |
| 7 | `view-hajj` | Apa kaitannya dengan haji? | Pembekuan bayaran, HAFIS, unjuran 2030 |
| 8 | `view-governance` | Siapa yang membuat keputusan? | Kuasa Menteri, tempoh jawatan, konflik kepentingan |
| 9 | `view-enforcement` | Apa yang berlaku selepas itu? | Laporan polis, SPRM, tatatertib, litigasi |
| 10 | `view-recommendations` | Apa yang disyorkan? | 25 syor + model yang ditolak + cadangan Dana Haji |
| 11 | `view-limits` | Apa yang kita tidak tahu? | 18 percanggahan, 17 jurang, 9 metrik yang sengaja diabaikan |

Dua pandangan sokongan: `view-timeline` (kronologi penuh) dan `view-source` (tentang data ini).

**Kenapa susunan ini.** Laporan bermula dengan penubuhan Suruhanjaya dan latar belakang LTH —
maklumat yang penting untuk kesahihan tetapi lemah sebagai pembukaan. Pembaca awam datang
dengan satu soalan: *apa yang berlaku kepada wang saya?* Susunan di atas menjawab soalan itu
dahulu, kemudian menerangkan mekanismenya, kemudian akauntabiliti.

---

## 3. Hierarki maklumat: gambaran besar → bukti

Lima peringkat. Setiap peringkat boleh dicapai daripada peringkat sebelumnya dalam **satu**
tindakan, dan pengguna sentiasa boleh naik semula.

```
Peringkat 1  Kad statistik      6 angka, satu ayat setiap satu
     ↓ klik
Peringkat 2  Pandangan          11 halaman naratif
     ↓ skrol
Peringkat 3  Carta              1–5 carta setiap pandangan
     ↓ klik bar/titik
Peringkat 4  Jadual data        baris mentah, boleh disusun dan ditapis
     ↓ klik baris
Peringkat 5  Sumber             perenggan laporan + muka surat PDF + pautan anchor
```

**Kriteria:** pengguna mesti boleh sampai daripada mana-mana kad hero kepada petikan laporan
dalam **tiga klik atau kurang**.

**Pendedahan berperingkat:** muat awal hanya memuatkan Peringkat 1 dan 2 (`rciThAnalysisCore`).
Peringkat 3 dimuatkan apabila pandangan dibuka. Peringkat 4 dan 5 atas permintaan.

---

## 4. Model data

Modul ini menyediakan **fakta yang telah dinormalisasi**, bukan pangkalan data relasional.
Bentuknya:

```
Traceable        { factType, source[] }             ← asas setiap rekod
DataSeries       { id, unit, basis, rows[], totals, reconciliationNotes[], cautions[] }
TimelineEvent    { id, date, precision, track, impact, title, body, links[] }
Investment       { id, sector, currency, exposure_rm_million|null, impairment…, dataGaps[] }
Conflict         { id, severity, a, b, difference, resolution, guidance }
Gap              { id, topic, missing, consequence, severity }
Metric           { id, formula, inputs[], unit, factType, assumptions[], cannotConclude }
```

**Konvensyen unit** (dikuatkuasakan dalam nama medan, bukan dalam dokumentasi):

- `*_rm_million`, `*_rm_thousand`, `*_rm_billion`, `*_rm` — nilai kewangan
- `*_pct` — peratus sebagai nombor (4.5 bermaksud 4.5%)
- `*_sqft` — keluasan
- Nilai negatif menggunakan tanda tolak, bukan kurungan

Menukar unit **mesti** menukar nama medan. Ini menghalang carta memaparkan RM juta pada paksi
yang dilabel RM bilion.

**Hubungan silang** dinyatakan secara eksplisit dalam `blueprint.crossLinks` dan dalam medan
`links[]` peristiwa kronologi. Sepuluh hubungan yang telah disahkan, contohnya:

- Liabiliti RAV 2017 (74,410) = liabiliti PwC pra-agihan (71,086) + agihan hibah (3,324)
- Baris "Hotel" RM804,058,625 dalam jadual hartanah = nilai pemindahan THHR RM804.1 juta
- Baris ROFR FGV 283,710,100 syer = bilangan syer FGV yang diambil alih UJSB

---

## 5. Metrik dan dimensi

**32 metrik** ditakrifkan dalam `analytics.metrics`, setiap satu dengan formula, input, unit,
`factType`, andaian, julat sah, dan `cannotConclude`.

Metrik yang paling penting:

| Metrik | Apa ia ukur | Perangkap yang dielakkan |
| --- | --- | --- |
| `m-surplus-pre` | Aset − liabiliti sebelum hibah | Asas PwC ≠ penyata beraudit yang diterbitkan |
| `m-overpayment` | Hibah melebihi syarat berkanun | Jumlah kumulatif ≠ kekurangan kunci kira-kira |
| `m-impairment-avoided` | Kerugian yang tidak diakui | Ambang 70% sendiri sudah longgar — ini had bawah |
| `m-rav-inflation` | Nilai yang ditambah RAV | Hanya 2017 dipecahkan |
| `m-transfer-premium` | Premium pemindahan aset | Premium ≠ kerugian yang direalisasikan |
| `m-hafis-share` | Bahagian kos haji ditanggung LTH | B40 vs bukan B40 memberi peratus berbeza |
| `m-implied-pilgrims` | Bilangan jemaah tersirat | **TIDAK BOLEH DIPERCAYAI** — lompatan 73% tanpa penjelasan |
| `m-investment-exposure` | Wang terlibat setiap pelaburan | **TIDAK BOLEH DIJUMLAHKAN** — asas dan mata wang berbeza |

**Sebelas dimensi**: tahun, fasa, jenis maklumat, tema, pihak, kelas aset, sektor, lokasi,
mata wang, keterukan, lorong kronologi.

**Sembilan penapis** dengan lalai yang dipilih dengan sengaja. Yang paling penting:

- `f-fact-type` lalai kepada `["fact", "derived"]` — unjuran dan simulasi **dimatikan**
  supaya pembaca tidak keliru antara apa yang berlaku dan apa yang diramalkan.
- `f-currency` lalai kepada `"RM"` dan memaksa satu pilihan — ini secara struktur menghalang
  penjumlahan silang mata wang yang tidak sah.

---

## 6. Perbandingan

Sebelas perbandingan dalam `analytics.comparisons`, setiap satu dengan medan `validity`.
Dua daripadanya ditanda `factType: "gap"` — ia **tidak boleh** dibina:

- LTH berbanding kadar deposit bank Islam — tiada kadar bank dalam laporan
- LTH berbanding ASB dan KWSP — tiada kadar pihak ketiga dalam laporan

Kedua-duanya mesti ditunjukkan sebagai **tidak tersedia dengan penjelasan**, bukan disembunyikan.
Suruhanjaya membuat kedua-dua perbandingan ini secara naratif; pembaca akan mencarinya.

Perbandingan paling kuat: **RM3,412 juta keuntungan dilaporkan → RM1,433 juta kerugian terlaras**.
Satu angka menjadi terbalik sepenuhnya, dan hibah RM3.3 bilion dibayar berdasarkan angka pertama.

---

## 7. Visualisasi

**26 visualisasi** ditakrifkan dalam `blueprint.visualisations`. Setiap satu mempunyai teks
lengkap dalam `content.chartCopy` dengan lima medan wajib: `title`, `whatItShows`, `whyItMatters`,
`reasonableConclusion`, `limits`.

Pilihan bentuk yang perlu dipatuhi:

| Carta | Bentuk | Sebab bentuk ini |
| --- | --- | --- |
| `chart-solvency-bridge` | Bar berkumpulan + garis sifar | Garis sifar ialah had undang-undang, bukan sekadar paksi |
| `chart-rav-waterfall` | Air terjun | Menunjukkan setiap langkah pengiraan yang membenarkan hibah |
| `chart-profit-bridge` | Air terjun melintasi sifar | Menunjukkan untung bertukar rugi, bukan hanya nilai akhir |
| `chart-impairment-scenarios` | Tiga bar berasingan | **Tiada garis** — hanya tiga titik diskret wujud |
| `chart-property-erosion` | Dumbbell | Dua titik masa setiap kategori; dumbbell lebih jelas daripada bar berkumpulan |
| `chart-bluechip` | Slope | Tiga titik harga setiap kaunter; slope menunjukkan arah dengan segera |
| `chart-rofr` | Lollipop dengan garis sifar | Sifar = harga pasaran; premium di atas, diskaun di bawah |
| `chart-deposits` | Titik + penyambung putus-putus | **Bukan garis pepejal** — hanya empat titik pemerhatian |
| `chart-concentration` | Dua kad statistik | **Bukan pai atau Lorenz** — hanya dua titik wujud |
| `chart-investments` | Bar melintang berfaset mengikut mata wang | Faset menghalang penjumlahan silang mata wang |
| `chart-timeline` | Timeline lapan lorong | Lorong memisahkan benang naratif yang berjalan serentak |

**12 visualisasi dilarang** disenaraikan dalam `blueprint.prohibitedVisualisations`, setiap satu
dengan sebab dan alternatif. Semak senarai ini sebelum menambah mana-mana carta baharu.

---

## 8. Interaksi analitik

Sepuluh interaksi dalam `blueprint.interactions`. Lima ditanda **wajib**:

1. **Jejak sumber** — klik mana-mana angka membuka panel dengan nombor perenggan, muka surat PDF
   dan pautan anchor.
2. **Tapis jenis maklumat** — hidupkan/matikan fakta, terbitan, unjuran, anggaran, simulasi.
3. **Panel formula** — untuk setiap angka terbitan; dibuka secara lalai pada carta yang
   keseluruhannya terbitan.
4. **Lencana percanggahan** — pada angka yang mempunyai nilai bercanggah dalam laporan; klik
   menunjukkan kesemua nilai dan panduan nilai mana yang patut digunakan.
5. **Laluan drill** — empat peringkat, mengekalkan konteks penapis.

Yang lain: penapis silang, mod perbandingan, simulasi parameter, glosari dalam teks, carian global,
salin-dengan-sumber.

**Simulasi** mempunyai pengawal yang ketat:

- Butang "Kembali kepada andaian laporan" sentiasa kelihatan
- Disclaimer tetap (bukan tooltip)
- Kelegapan berbeza pada elemen carta
- Nilai simulasi **tidak pernah** muncul dalam kad hero atau ringkasan
- Interpolasi dilarang di mana hanya titik diskret wujud (ambang rosot nilai, tempoh menunggu)

---

## 9. Keadaan

Sepuluh keadaan dalam `blueprint.stateMatrix`. Yang paling kerap disalah tangani:

| Keadaan | Salah | Betul |
| --- | --- | --- |
| Laporan tiada data | Carta kosong dengan paksi | Mesej "Laporan tidak menyediakan data ini" + pautan ke senarai jurang |
| Tiada aktiviti (haji 2020–2021) | Nilai sifar pada carta | Jurang berlabel "Tiada haji (Covid-19)" |
| Siri separa | Garis merentasi jurang | Garis putus-putus + label pada jurang |
| Lajur tidak boleh dijumlahkan | Baris jumlah dipaparkan | Baris jumlah **tidak dipaparkan langsung** + nota penjelasan |
| Percanggahan | Satu angka dipilih senyap | Lencana + kesemua nilai + panduan |
| Simulasi aktif | Kelihatan seperti data lain | Kelegapan berbeza + disclaimer tetap |

Keadaan `loading` menggunakan skeleton dengan **dimensi carta yang betul** supaya tiada anjakan
susun atur apabila data tiba.

---

## 10. Keperluan mudah alih

Asas reka bentuk: **360px dahulu**, kemudian 768px dan 1200px.

Peraturan yang tidak boleh dilanggar:

- Satu carta setiap skrin di bawah 768px
- Bar melintang mengalahkan bar menegak apabila label ialah tahun atau nama syarikat
- Timeline mendatar → senarai menegak dikumpulkan mengikut tahun
- Kawalan penapis dan peluncur simulasi masuk ke **bottom sheet** yang boleh ditarik
- Legenda di **atas** carta, bukan di sebelah
- Tooltip hover → **tap-to-pin** (sentuhan pertama membuka panel yang kekal)
- Jadual → senarai kad; **tiada skrol mendatar** untuk data
- Sasaran sentuh minimum 44×44px, termasuk titik data pada carta
- Teks asas 16px; label carta tidak lebih kecil daripada 12px

**Prestasi.** Modul penuh kira-kira 430 KB sebagai JSON. Muatkan `rciThAnalysisCore` dahulu
(metadata + kandungan + navigasi), kemudian muatkan modul data setiap pandangan atas permintaan.
Elakkan animasi pada timeline penuh — ia mempunyai 111 peristiwa.

**Luar talian.** Modul ini statik sepenuhnya. Tiada permintaan rangkaian selepas muat awal;
ia boleh dicache sepenuhnya.

---

## 11. Menerangkan istilah teknikal

Tiga peringkat, dalam `content.explainerStrategy`:

1. **Tooltip satu ayat** pada sentuhan pertama setiap istilah
2. **Panel "Terangkan istilah ini"** dengan tiga bahagian: apa maksudnya, kenapa ia penting di sini,
   angka yang berkaitan
3. **Halaman glosari penuh** yang boleh dicari, dengan pautan ke setiap carta yang menggunakannya

16 istilah dalam `source.glossary`, setiap satu dengan medan `plain` (untuk tooltip) dan `why`
(untuk konteks kes ini). Contoh:

> **RAV** — Anggaran dalaman LTH tentang berapa nilai asetnya "jika dijual", yang lebih tinggi
> daripada nilai dalam penyata kewangan beraudit.
> *Kenapa penting:* RAV digunakan untuk menjustifikasikan pembayaran hibah walaupun penyata
> beraudit menunjukkan liabiliti melebihi aset. Tiada piawaian pasaran untuk RAV.

Senarai elakan (`explainerStrategy.avoidList`) menyenaraikan lima istilah yang tidak boleh muncul
tanpa gandingan penjelasan: MFRS 9, zero coupon, SPV, impairment, Emphasis of Matter.

---

## 12. Kebolehcapaian

Tujuh keperluan dalam `blueprint.accessibilityRequirements`. Yang paling mudah terlepas:

- **Setiap carta mesti mempunyai alternatif jadual** yang boleh dicapai dengan satu klik
- **Warna tidak boleh menjadi satu-satunya pembawa maklumat** — ini kritikal untuk pembezaan
  fakta vs unjuran, yang mesti menggunakan corak (pepejal vs putus-putus) bersama warna
- `lang="ms"` pada halaman; istilah Inggeris dalam kurungan ditandakan `lang="en"`
- Hormati `prefers-reduced-motion`

---

## 13. Kriteria penerimaan

**24 kriteria** dalam `blueprint.acceptanceCriteria`, setiap satu dengan ujian yang boleh
dijalankan. Dikumpulkan kepada lapan kategori: Kebolehkesanan, Kejujuran, Integriti,
Kebolehfahaman, Mobile, Kebolehcapaian, Keadaan, Prestasi, Naratif, Bahasa.

Yang mesti lulus sebelum pelancaran:

| # | Kriteria |
| --- | --- |
| AC-1 | Setiap angka boleh dijejak kepada perenggan laporan dalam tiga klik atau kurang |
| AC-2 | Tiada angka dalam UI yang tidak wujud dalam modul data |
| AC-4 | Tiada unjuran atau simulasi dalam kad hero |
| AC-8 | `runIntegrityChecks()` berjalan semasa muat dengan `unexpected.length === 0` |
| AC-9 | Tiada lajur yang ditanda "tidak boleh dijumlahkan" memaparkan baris jumlah |
| AC-10 | Mata wang asing tidak pernah dicampur dengan RM dalam satu paksi atau jumlah |
| AC-13 | Setiap carta menjawab empat soalan: apa, kenapa, kesimpulan, batas |
| AC-14 | Tiada skrol mendatar pada mana-mana halaman pada 360px |
| AC-20 | Keadaan "kosong mengikut reka bentuk" tidak pernah menunjukkan carta kosong |
| AC-23 | Halaman "Apa yang kita tidak tahu" boleh dicapai dari mana-mana halaman |

Jalankan `node scripts/validate.mjs` untuk mengesahkan AC-8, AC-13, AC-16 dan integriti rujukan
dalaman secara automatik. Selebihnya memerlukan semakan manual atau ujian UI.

---

## 14. Persoalan analitik yang dashboard perlu jawab

Dua belas persoalan dalam `integrity.questions`, disusun mengikut keutamaan, setiap satu dengan
medan `answerability`, `canConclude` dan `cannotConclude`.

**Boleh dijawab penuh (5):** bila masalah mula diketahui; kesan RAV dan rosot nilai; siapa
menanggung jurang RM10.2 bilion; kebergantungan LTH kepada Sukuk; akibat ke atas mereka yang
bertanggungjawab.

**Boleh dijawab sebahagian (5):** berapa hibah dibayar melebihi kemampuan; adakah subsidi haji
mampan; sejauh mana konflik kepentingan; bukti pengaruh politik; apa yang berubah selepas 2018.

**Tidak boleh dijawab (2):**

- *Berapa kos akhir kepada pendeposit dan pembayar cukai?* — bergantung kepada nilai pemulihan
  aset UJSB (sebahagian besar belum dijual), keputusan litigasi yang belum selesai, dan sama ada
  Kerajaan menunaikan peruntukan tahunan.
- *Berapa jumlah kerugian daripada 14 pelaburan bermasalah?* — asas tidak serasi, empat kes dalam
  mata wang asing tanpa kadar tukaran, tarikh pengukuran berbeza, dan sebahagian mempunyai
  pemulihan separa yang belum dimuktamadkan.

Dashboard **tidak boleh** mencipta satu angka "jumlah kerugian". Jika pengguna mencarinya,
tunjukkan komponen yang diketahui dengan asas masing-masing, dan nyatakan mengapa jumlah tunggal
tidak sah.

---

## 15. Nada dan bahasa

- Bahasa Melayu mudah. Ayat pendek. Perkataan biasa.
- Angka besar ditulis "RM3.3 bilion", bukan "RM3,323,741,000".
- Nilai negatif menggunakan tanda tolak, bukan kurungan (kurungan tidak difahami umum).
- Jangan gunakan singkatan "b", "j", "k" — tulis "bilion", "juta", "ribu".
- **Jangan** gunakan perkataan seperti "skandal", "rompakan" atau "penipuan". Laporan sendiri
  menggunakan istilah yang lebih tepat: "salah nyataan", "penyembunyian maklumat",
  "amalan perakaunan kreatif", "transaksi yang mencurigakan".
- Pandangan Suruhanjaya dilabel sebagai pandangan, bukan sebagai fakta yang telah dibuktikan
  di mahkamah. Tiada pendakwaan jenayah dilaporkan setakat tarikh laporan.

Semua peraturan format dalam `content.formatting.rules`.

---

## 16. Urutan pelaksanaan yang disyorkan

| Fasa | Bina | Kenapa dahulu |
| --- | --- | --- |
| 1 | Kerangka + `view-overview` + `view-limits` | Menetapkan kontrak kejujuran sebelum apa-apa carta |
| 2 | Komponen jejak sumber + lencana factType | Setiap carta selepas ini mewarisinya secara percuma |
| 3 | `view-solvency` + `view-accounting` | Teras naratif; carta paling kuat |
| 4 | `view-ujsb` + `view-hajj` | Kedua-duanya mempunyai simulasi — bina enjin simulasi sekali |
| 5 | `view-investments` + `view-governance` | Banyak data, sedikit pengiraan |
| 6 | `view-audit` + `view-enforcement` + `view-recommendations` | Sokongan naratif |
| 7 | `view-timeline` + `view-source` | Rujukan; paling berat, paling kurang kerap dilihat |
| 8 | Audit kebolehcapaian + audit mudah alih + jalankan 24 kriteria penerimaan | Sebelum lancar |

Membina `view-limits` pada fasa 1 adalah sengaja: ia memaksa pasukan menghadapi ketidakpastian
data lebih awal, dan bukan menampalnya di penghujung.
