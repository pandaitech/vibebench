/* ===== PAPARAN 4: Subsidi haji · Penemuan & cadangan · Data mentah ===== */
(function () {
  'use strict';
  const { fmt, el, s } = L;
  const D = window.RCI, X = window.RCI_DETAIL, T = window.T, C = window.C;
  window.V = window.V || {};

  const head = (kicker, tajuk, teks) => el('div', { class: 'pane-h' },
    el('div', { class: 'kicker' }, kicker), el('h2', null, tajuk), el('p', { html: teks }));
  const pane = (...k) => el('div', { class: 'pane' }, k.flat().filter(Boolean));
  const box = () => el('div');

  /* ================= HAFIS ================= */
  V.hafis = () => {
    let mod = 'seorang';
    const carta = box();

    function lukis() {
      carta.innerHTML = '';
      const host = el('div'); carta.appendChild(host);
      const data = T.hafisJemaah;
      const thn = data.map((d) => d.tahun);

      L.chart(host, { h: (w) => (w < 620 ? 320 : 360), m: { t: 24, r: 16, b: 48, l: 64 } }, (g, w, h) => {
        const x = L.band(thn, [0, w], 0.26);
        if (mod === 'seorang') {
          const y = L.linear([0, 40000], [h, 0]);
          L.axisY(g, y, w, { label: 'RM seorang', fmt: (v) => 'RM' + fmt.n(v / 1000) + 'k' });
          data.forEach((d) => {
            const unjur = d.jenis === 'unjuran';
            const yB = y(d.bayaran), yK = y(d.kos);
            g.appendChild(s('rect', { x: x(d.tahun), y: yB, width: x.bandwidth, height: h - yB, rx: 2,
              fill: 'var(--pri)', opacity: unjur ? .45 : 1, class: 'bar' }));
            g.appendChild(s('rect', { x: x(d.tahun), y: yK, width: x.bandwidth, height: yB - yK, rx: 2,
              fill: 'var(--neg)', opacity: unjur ? .45 : 1, class: 'bar' }));
            const hit = s('rect', { x: x(d.tahun), y: 0, width: x.bandwidth, height: h, fill: 'transparent' });
            hit.addEventListener('mouseenter', (e) => L.showTip(e, `<b>${d.tahun}${unjur ? ' (unjuran laporan)' : ''}</b>
              <div class="kv"><span>Kos haji sebenar</span><span>RM${fmt.n(d.kos)}</span></div>
              <div class="kv"><span>Dibayar jemaah</span><span>RM${fmt.n(d.bayaran)}</span></div>
              <div class="kv"><span>Ditanggung LTH</span><span style="color:var(--neg)">RM${fmt.n(d.hafis)}</span></div>
              <div class="kv"><span>Bahagian LTH</span><span>${fmt.n((d.hafis / d.kos) * 100, 1)}%</span></div>`));
            hit.addEventListener('mousemove', L.moveTip); hit.addEventListener('mouseleave', L.hideTip);
            g.appendChild(hit);
          });
        } else if (mod === 'bahagian') {
          const y = L.linear([0, 100], [h, 0]);
          L.axisY(g, y, w, { label: 'Bahagian kos haji (%)', fmt: (v) => v + '%' });
          data.forEach((d) => {
            const unjur = d.jenis === 'unjuran';
            const p = (d.hafis / d.kos) * 100;
            g.appendChild(s('rect', { x: x(d.tahun), y: y(100), width: x.bandwidth, height: h - y(100), rx: 2, fill: 'var(--pri)', opacity: unjur ? .45 : 1 }));
            g.appendChild(s('rect', { x: x(d.tahun), y: y(p), width: x.bandwidth, height: h - y(p), rx: 2, fill: 'var(--neg)', opacity: unjur ? .45 : 1 }));
            g.appendChild(s('text', { x: x(d.tahun) + x.bandwidth / 2, y: y(p) - 6, class: 'val',
              fill: 'var(--ink2)', 'text-anchor': 'middle', text: fmt.n(p, 0) + '%' }));
            const hit = s('rect', { x: x(d.tahun), y: 0, width: x.bandwidth, height: h, fill: 'transparent' });
            hit.addEventListener('mouseenter', (e) => L.showTip(e, `<b>${d.tahun}${unjur ? ' (unjuran)' : ''}</b>
              <div class="kv"><span>Ditanggung LTH</span><span>${fmt.n(p, 1)}%</span></div>
              <div class="kv"><span>Dibayar jemaah</span><span>${fmt.n(100 - p, 1)}%</span></div>`));
            hit.addEventListener('mousemove', L.moveTip); hit.addEventListener('mouseleave', L.hideTip);
            g.appendChild(hit);
          });
          g.appendChild(s('line', { x1: 0, x2: w, y1: y(50), y2: y(50), stroke: 'var(--terbit)', 'stroke-width': 1.6, 'stroke-dasharray': '6 4' }));
          g.appendChild(s('text', { x: w - 4, y: y(50) - 6, class: 'val', fill: 'var(--terbit)', 'text-anchor': 'end', text: 'paras separuh kos' }));
        } else {
          const maxv = Math.max(...data.map((d) => d.jumlahJuta));
          const y = L.linear([0, maxv * 1.1], [h, 0]);
          L.axisY(g, y, w, { label: 'Jumlah subsidi setahun (RM juta)', fmt: (v) => fmt.n(v) });
          data.forEach((d) => {
            const unjur = d.jenis === 'unjuran';
            g.appendChild(s('rect', { x: x(d.tahun), y: y(d.jumlahJuta), width: x.bandwidth, height: Math.max(1, h - y(d.jumlahJuta)),
              rx: 2, fill: unjur ? 'var(--unjur)' : 'var(--neg)', class: 'bar' }));
            const hit = s('rect', { x: x(d.tahun), y: 0, width: x.bandwidth, height: h, fill: 'transparent' });
            hit.addEventListener('mouseenter', (e) => L.showTip(e, `<b>${d.tahun}${unjur ? ' (unjuran)' : ''}</b>
              <div class="kv"><span>Jumlah subsidi</span><span>${fmt.juta(d.jumlahJuta)}</span></div>
              <div class="kv"><span>Subsidi seorang</span><span>RM${fmt.n(d.hafis)}</span></div>
              <div class="kv"><span>Bilangan jemaah tersirat</span><span>${fmt.n(d.jemaah)}</span></div>
              <div class="note">Bilangan jemaah dikira oleh dashboard: jumlah subsidi ÷ subsidi seorang.</div>`));
            hit.addEventListener('mousemove', L.moveTip); hit.addEventListener('mouseleave', L.hideTip);
            g.appendChild(hit);
          });
        }
        L.axisX(g, x, thn, h, { every: w < 560 ? 2 : 1 });
        // pemisah antara data sebenar dan unjuran
        const p2022 = x(2022);
        g.appendChild(s('line', { x1: p2022 - x.step * 0.13, x2: p2022 - x.step * 0.13, y1: 14, y2: h,
          stroke: 'var(--unjur)', 'stroke-width': 1.6, 'stroke-dasharray': '4 4' }));
        g.appendChild(s('text', { x: p2022 - x.step * 0.13 + 5, y: 10, class: 'val', fill: 'var(--unjur)', text: 'unjuran →' }));
      });
    }

    const ctl = el('div', { class: 'ctl' });
    function bina() {
      ctl.innerHTML = '';
      ctl.appendChild(C.seg([
        { id: 'seorang', label: 'Kos seorang jemaah' },
        { id: 'bahagian', label: 'Siapa tanggung berapa (%)' },
        { id: 'jumlah', label: 'Jumlah setahun' },
      ], mod, (v) => { mod = v; bina(); }));
      lukis();
    }
    bina();

    /* Pendedahan: unjuran mengandaikan 30,000 jemaah */
    const jemaahUnjur = T.hafisJemaah.filter((d) => d.jenis === 'unjuran').map((d) => Math.round(d.jemaah));
    const semuaSama = jemaahUnjur.every((v) => v === jemaahUnjur[0]);

    const tblJemaah = C.tbl([
      { key: 'tahun', label: 'Tahun' },
      { key: 'jenis', label: 'Jenis', sel: (r) => el('span', { class: 'tag' }, r.jenis === 'unjuran' ? 'Unjuran laporan' : 'Data sebenar') },
      { key: 'kos', label: 'Kos haji (RM)', num: true, sel: (r) => fmt.n(r.kos) },
      { key: 'bayaran', label: 'Bayaran jemaah (RM)', num: true, sel: (r) => fmt.n(r.bayaran) },
      { key: 'hafis', label: 'Subsidi seorang (RM)', num: true, sel: (r) => fmt.n(r.hafis) },
      { key: 'jumlahJuta', label: 'Jumlah setahun (RM juta)', num: true, sel: (r) => fmt.n(r.jumlahJuta, 1) },
      { key: 'jemaah', label: 'Jemaah tersirat', num: true, sel: (r) => fmt.n(r.jemaah), nota: 'Dikira: jumlah ÷ subsidi seorang' },
    ], T.hafisJemaah, { susun: 'tahun', arah: 1 });

    /* Simulator unjuran */
    let simBayar = 12980, simJemaah = 30000;
    const wSim = box();
    function lukisSim() {
      wSim.innerHTML = '';
      wSim.appendChild(el('div', { class: 'grid g2' },
        el('div', null,
          el('label', { class: 'fld', id: 'lb1' }, 'Bayaran setiap jemaah: ', el('b', null, 'RM' + fmt.n(simBayar))),
          el('input', { type: 'range', min: '9980', max: '30000', step: '500', value: simBayar,
            oninput: (e) => { simBayar = +e.target.value; lukisSim(); } })),
        el('div', null,
          el('label', { class: 'fld', id: 'lb2' }, 'Bilangan jemaah setahun: ', el('b', null, fmt.n(simJemaah))),
          el('input', { type: 'range', min: '10000', max: '60000', step: '1000', value: simJemaah,
            oninput: (e) => { simJemaah = +e.target.value; lukisSim(); } }))));

      const unj = D.hafisUnjuran.map((u) => {
        const sub = Math.max(0, u.kos - simBayar);
        return { tahun: u.tahun, kos: u.kos, sub, jum: (sub * simJemaah) / 1e6, pct: (sub / u.kos) * 100 };
      });
      const asal = D.hafisUnjuran.map((u) => u.jumlahRibu / 1000);
      const host = el('div', { style: 'margin-top:14px' }); wSim.appendChild(host);
      L.chart(host, { h: 260, m: { t: 20, r: 14, b: 40, l: 64 } }, (g, w, h) => {
        const thn = unj.map((u) => u.tahun);
        const x = L.band(thn, [0, w], 0.3);
        const maxv = Math.max(...unj.map((u) => u.jum), ...asal) * 1.1;
        const y = L.linear([0, maxv], [h, 0]);
        L.axisY(g, y, w, { label: 'RM juta setahun', fmt: (v) => fmt.n(v) });
        unj.forEach((u, i) => {
          g.appendChild(s('rect', { x: x(u.tahun), y: y(asal[i]), width: x.bandwidth, height: Math.max(1, h - y(asal[i])),
            rx: 2, fill: 'color-mix(in srgb,var(--unjur) 32%,transparent)' }));
          const r = s('rect', { x: x(u.tahun) + x.bandwidth * .22, y: y(u.jum), width: x.bandwidth * .56,
            height: Math.max(1, h - y(u.jum)), rx: 2, fill: 'var(--simul)', class: 'bar' });
          r.addEventListener('mouseenter', (e) => L.showTip(e, `<b>${u.tahun}</b>
            <div class="kv"><span>Unjuran laporan</span><span>${fmt.juta(asal[i])}</span></div>
            <div class="kv"><span>Simulasi anda</span><span style="color:var(--simul)">${fmt.juta(u.jum)}</span></div>
            <div class="kv"><span>Subsidi seorang</span><span>RM${fmt.n(u.sub)}</span></div>
            <div class="kv"><span>Bahagian kos</span><span>${fmt.n(u.pct, 1)}%</span></div>`));
          r.addEventListener('mousemove', L.moveTip); r.addEventListener('mouseleave', L.hideTip);
          g.appendChild(r);
        });
        L.axisX(g, x, thn, h, { every: 2 });
      });
      const j2030 = unj[unj.length - 1];
      wSim.appendChild(el('div', { class: 'grid g3', style: 'margin-top:14px' },
        el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('u'), el('span', { class: 'v' }, fmt.juta(asal[asal.length - 1])),
          el('span', { class: 'l' }, 'Beban subsidi 2030 mengikut unjuran laporan')),
        el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('s'),
          el('span', { class: 'v', style: 'color:var(--simul)' }, fmt.juta(j2030.jum)),
          el('span', { class: 'l' }, 'Beban subsidi 2030 mengikut tetapan anda')),
        el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('s'),
          el('span', { class: 'v', style: `color:${j2030.pct > 50 ? 'var(--neg)' : 'var(--pos)'}` }, fmt.n(j2030.pct, 1) + '%'),
          el('span', { class: 'l' }, 'Bahagian kos haji yang ditanggung LTH pada 2030'))));
      wSim.appendChild(L.legend([{ label: 'Unjuran laporan', warna: 'color-mix(in srgb,var(--unjur) 32%,transparent)' },
        { label: 'Simulasi anda', warna: 'var(--simul)' }]));
    }
    lukisSim();

    return pane(
      head('Kos lawan bayaran', 'Subsidi haji (HAFIS)',
        `Setiap jemaah haji membayar kurang daripada kos sebenar. Bezanya ditanggung Tabung Haji melalui skim HAFIS,
         yang diambil daripada keuntungan pelaburan — wang yang sama yang sepatutnya diagihkan kepada pendeposit.`),

      C.card('Jurang antara kos sebenar dan bayaran jemaah',
        'Tiga cara melihat jurang yang sama. Bar lebih pudar selepas 2022 ialah unjuran laporan, bukan data sebenar.',
        ctl, carta,
        L.legend([{ label: 'Dibayar jemaah', warna: 'var(--pri)' }, { label: 'Ditanggung LTH (HAFIS)', warna: 'var(--neg)' }]),
        C.baca({
          tunjuk: 'Kos haji sebenar seorang jemaah, berapa yang dibayar jemaah, dan berapa yang ditanggung Tabung Haji, dari 2014 hingga unjuran 2030.',
          penting: 'Bayaran jemaah dibekukan pada RM9,980 selama enam tahun (2014–2019) sedangkan kos naik daripada RM16,155 kepada RM22,900. Bahagian yang ditanggung LTH melonjak daripada 38% kepada 56% — melepasi paras separuh kos pada 2018.',
          simpul: 'Subsidi bukan bertambah kerana LTH memberi lebih banyak, tetapi kerana bayaran tidak dinaikkan sementara kos terus naik. Kenaikan bayaran pada 2022 kepada RM12,980 hanya menurunkan bahagian LTH kepada 49.2% — dan mengikut unjuran ia naik semula melepasi 65% menjelang 2030 jika bayaran kekal.',
          jangan: 'Angka selepas 2022 ialah <b>unjuran laporan</b>, bukan data sebenar. Unjuran ini mengandaikan kos meningkat pada kadar tertentu dan bayaran kekal RM12,980. Jika mana-mana andaian itu berubah, angkanya berubah.',
        }),
        C.srcbar(C.src(199, 'Data sebenar: ms 199'), C.src(200, 'Unjuran: ms 200'), C.src(23, 'Latar belakang: ms 23'))),

      C.card('Membongkar andaian di sebalik unjuran laporan',
        `Laporan memberi subsidi seorang jemaah dan jumlah setahun, tetapi tidak menyatakan berapa ramai jemaah diandaikan.
         Membahagikan satu dengan yang lain mendedahkannya.`,
        semuaSama ? C.note('', `<b>Penemuan.</b> Membahagikan jumlah subsidi tahunan dengan subsidi seorang jemaah memberi
          <b>tepat ${fmt.n(jemaahUnjur[0])} jemaah</b> bagi <b>setiap</b> tahun dari 2022 hingga 2030 — tanpa sebarang perubahan.
          Ini bermakna unjuran laporan ialah model kenaikan harga semata-mata: ia mengandaikan bilangan jemaah kekal
          malar sepanjang sembilan tahun. Angka sebenar 2014–2019 pula berubah-ubah antara kira-kira
          ${fmt.n(Math.min(...T.hafisJemaah.filter((d) => d.jenis === 'sebenar').map((d) => d.jemaah)))} dan
          ${fmt.n(Math.max(...T.hafisJemaah.filter((d) => d.jenis === 'sebenar').map((d) => d.jemaah)))} jemaah.`) : null,
        tblJemaah,
        C.baca({
          tunjuk: 'Setiap tahun dengan bilangan jemaah yang tersirat daripada angka laporan sendiri.',
          penting: 'Bilangan jemaah tersirat melonjak daripada kira-kira 18,000 (2016) kepada 31,000 (2017) — kenaikan 73% dalam setahun. Laporan tidak menjelaskan lonjakan ini. Ia patut disiasat lanjut oleh sesiapa yang menggunakan data ini.',
          simpul: 'Unjuran 2022–2030 ialah model harga, bukan model permintaan. Ia berguna untuk menunjukkan kesan kenaikan kos, tetapi tidak mengambil kira perubahan kuota haji atau bilangan jemaah.',
          jangan: 'Bilangan jemaah ini <b>dikira oleh dashboard</b>, bukan diterbitkan dalam laporan. Ia mengandaikan setiap jemaah menerima subsidi penuh yang sama — jika ada jemaah yang menerima subsidi berbeza, angka sebenar akan berbeza.',
        })),

      C.card('Simulasi: apa jadi jika bayaran atau bilangan jemaah berubah?',
        'Gunakan slider untuk menguji dasar berbeza terhadap unjuran kos haji laporan. Kos haji setiap tahun kekal mengikut unjuran laporan; hanya bayaran dan bilangan jemaah yang anda ubah.',
        wSim,
        C.note('w', `<b>Had simulasi.</b> Model ini hanya mendarab subsidi seorang dengan bilangan jemaah. Ia tidak mengambil kira
          kesan kenaikan bayaran terhadap bilangan orang yang mampu menunaikan haji, cadangan Suruhanjaya supaya bantuan hanya
          diberi kepada yang memerlukan, atau kadar bayaran dua lapisan B40 dan bukan B40 yang diperkenalkan pada 2022.`),
        C.srcbar(C.src(200, 'Asas unjuran: ms 200'), C.src(24, 'Anggaran RM742 juta menjelang 2030: ms 24'))),

      C.card('Kaitan dengan pendeposit', null,
        el('p', { style: 'margin:0 0 12px;color:var(--ink2)', html:
          `Laporan menyatakan Tabung Haji memerlukan dana <b>sekurang-kurangnya RM60 bilion</b> untuk menampung HAFIS pada tahap
           semasa. Apabila kos subsidi meningkat, dana yang lebih besar diperlukan — dan kebergantungan kepada pendeposit besar
           bertambah. Inilah gelung yang mengaitkan modul ini dengan modul agihan keuntungan: setiap Ringgit subsidi haji ialah
           satu Ringgit yang tidak diagihkan kepada pendeposit.` }),
        el('div', { class: 'grid g3' },
          el('button', { class: 'kpi', onclick: () => window.pergi('hibah') }, C.pv('f'),
            el('span', { class: 'v' }, 'RM60b'), el('span', { class: 'l' }, 'Dana minimum diperlukan untuk menampung HAFIS'), el('span', { class: 'go' }, 'Lihat agihan keuntungan →')),
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('f'),
            el('span', { class: 'v' }, 'RM2.02b'), el('span', { class: 'l' }, 'Jumlah subsidi HAFIS sejak 2001')),
          el('button', { class: 'kpi', onclick: () => window.pergi('penemuan') }, C.pv('f'),
            el('span', { class: 'v' }, '130 → 33'), el('span', { class: 'l' }, 'Tahun menunggu giliran haji jika deposit pendaftaran dinaikkan kepada RM12,980'), el('span', { class: 'go' }, 'Lihat cadangan →'))),
        C.srcbar(C.src(24, 'Laporan ms 24'), C.src(236, 'Cadangan: ms 236'))));
  };

  /* ================= PENEMUAN & CADANGAN ================= */
  V.penemuan = () => {
    let jenis = 'penemuan', tapisTema = 'semua', carian = '';
    const senarai = box(), ctlTema = el('div', { class: 'ctl' });

    const temaP = ['semua', ...new Set(X.penemuan.map((p) => p.tema))];
    const temaC = ['semua', ...new Set(X.cadangan.map((c) => c.tema))];

    function lukis() {
      /* chip tema */
      const tema = jenis === 'penemuan' ? temaP : jenis === 'cadangan' ? temaC : ['semua'];
      ctlTema.innerHTML = '';
      if (jenis !== 'rumusan' && jenis !== 'baik') {
        tema.forEach((t) => {
          const b = el('button', { class: 'chip' + (t === tapisTema ? ' on' : ''), onclick: () => { tapisTema = t; lukis(); } },
            t === 'semua' ? 'Semua tema' : t);
          ctlTema.appendChild(b);
        });
      }

      senarai.innerHTML = '';
      const q = carian.trim().toLowerCase();

      if (jenis === 'penemuan') {
        const data = X.penemuan.filter((p) => (tapisTema === 'semua' || p.tema === tapisTema) &&
          (!q || (p.tajuk + p.isu + p.kesan).toLowerCase().includes(q)));
        if (!data.length) { senarai.appendChild(el('div', { class: 'empty' }, 'Tiada penemuan sepadan.')); return; }
        data.forEach((p) => senarai.appendChild(el('details', { class: 'acc' },
          el('summary', null, el('span', { class: 'tag', style: 'flex:none' }, p.tema),
            el('span', { style: 'flex:1;min-width:0' }, p.tajuk)),
          el('div', { class: 'body' },
            el('h4', { style: 'font-size:12px;font-family:var(--mono);color:var(--ink3);letter-spacing:.05em;text-transform:uppercase;margin-bottom:6px' }, 'Apa yang ditemui'),
            el('p', { style: 'margin:0 0 14px;color:var(--ink2)' }, p.isu),
            el('h4', { style: 'font-size:12px;font-family:var(--mono);color:var(--ink3);letter-spacing:.05em;text-transform:uppercase;margin-bottom:6px' }, 'Kenapa ia penting'),
            el('p', { style: 'margin:0 0 8px;color:var(--ink2)' }, p.kesan),
            C.srcbar(C.src(p.ms), C.pv('f'))))));

      } else if (jenis === 'cadangan') {
        const data = X.cadangan.filter((c) => (tapisTema === 'semua' || c.tema === tapisTema) &&
          (!q || c.teks.toLowerCase().includes(q)));
        if (!data.length) { senarai.appendChild(el('div', { class: 'empty' }, 'Tiada cadangan sepadan.')); return; }
        data.forEach((c) => senarai.appendChild(el('div', { class: 'card', style: 'margin-bottom:10px' },
          el('div', { style: 'display:flex;gap:11px;align-items:flex-start' },
            el('span', { class: 'tag', style: 'flex:none;color:var(--pri);border-color:var(--pri)' }, '(' + c.kod + ')'),
            el('div', null, el('span', { class: 'tag', style: 'margin-bottom:7px;display:inline-block' }, c.tema),
              el('p', { style: 'margin:0;color:var(--ink2)' }, c.teks),
              C.srcbar(C.src(c.ms)))))));

      } else if (jenis === 'baik') {
        X.penambahbaikan.slice().sort((a, b) => a.tahun - b.tahun).forEach((p) =>
          senarai.appendChild(el('div', { class: 'card', style: 'margin-bottom:10px' },
            el('div', { style: 'display:flex;gap:11px;align-items:flex-start;flex-wrap:wrap' },
              el('span', { class: 'tag', style: 'flex:none;color:var(--pos);border-color:var(--pos)' }, p.tahun),
              el('span', { class: 'tag', style: 'flex:none' }, p.bidang),
              el('div', { style: 'flex:1;min-width:220px' }, el('b', null, p.tajuk),
                el('p', { style: 'margin:5px 0 0;color:var(--ink2)' }, p.teks), C.srcbar(C.src(p.ms)))))));

      } else {
        X.rumusan.forEach((r) => senarai.appendChild(el('div', { class: 'card', style: 'margin-bottom:10px' },
          el('div', { style: 'display:flex;gap:11px;align-items:flex-start' },
            el('span', { class: 'tag', style: 'flex:none' }, String(r.no)),
            el('div', null, el('p', { style: 'margin:0;color:var(--ink2)' }, r.teks), C.srcbar(C.src(r.ms)))))));
      }
    }

    const ctlJenis = el('div', { class: 'ctl' });
    function binaJenis() {
      ctlJenis.innerHTML = '';
      ctlJenis.appendChild(C.seg([
        { id: 'penemuan', label: `Penemuan (${X.penemuan.length})` },
        { id: 'cadangan', label: `Cadangan (${X.cadangan.length})` },
        { id: 'baik', label: `Penambahbaikan (${X.penambahbaikan.length})` },
        { id: 'rumusan', label: `Rumusan (${X.rumusan.length})` },
      ], jenis, (v) => { jenis = v; tapisTema = 'semua'; binaJenis(); }));
      ctlJenis.appendChild(el('input', { type: 'search', placeholder: 'Cari…', style: 'min-width:170px',
        value: carian, oninput: (e) => { carian = e.target.value; lukis(); } }));
      lukis();
    }
    binaJenis();

    /* Taburan penemuan mengikut tema */
    const wTema = box();
    const kiraTema = [...new Set(X.penemuan.map((p) => p.tema))]
      .map((t) => ({ tema: t, n: X.penemuan.filter((p) => p.tema === t).length }))
      .sort((a, b) => b.n - a.n);
    L.chart(wTema, { h: () => kiraTema.length * 28 + 26, m: { t: 12, r: 40, b: 20, l: 122 } }, (g, w, h) => {
      const y = L.band(kiraTema.map((k) => k.tema), [0, h], 0.3);
      const x = L.linear([0, Math.max(...kiraTema.map((k) => k.n))], [0, w]);
      kiraTema.forEach((k) => {
        const yy = y(k.tema);
        const r = s('rect', { x: 0, y: yy, width: Math.max(2, x(k.n)), height: y.bandwidth, rx: 2, fill: 'var(--pri)', class: 'bar', style: 'cursor:pointer' });
        r.addEventListener('click', () => { jenis = 'penemuan'; tapisTema = k.tema; binaJenis(); senarai.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
        g.appendChild(r);
        g.appendChild(s('text', { x: -8, y: yy + y.bandwidth / 2 + 4, class: 'axis', 'text-anchor': 'end', text: k.tema }));
        g.appendChild(s('text', { x: x(k.n) + 7, y: yy + y.bandwidth / 2 + 4, class: 'val', fill: 'var(--pri)', text: k.n }));
      });
    });

    return pane(
      head('Rujukan lengkap', 'Penemuan, cadangan dan rumusan',
        `Semua penemuan utama Suruhanjaya, 25 cadangannya, penambahbaikan yang telah dilaksanakan Tabung Haji,
         dan rumusan akhir Bab Empat. Setiap satu membawa rujukan muka surat.`),
      C.card('Di mana masalahnya tertumpu', 'Bilangan penemuan mengikut tema. Klik mana-mana bar untuk menapis senarai di bawah.',
        wTema,
        C.baca({
          tunjuk: 'Taburan penemuan Suruhanjaya mengikut bidang.',
          penting: 'Tadbir urus dan perakaunan menyumbang bahagian terbesar. Ini menyokong kesimpulan Suruhanjaya bahawa masalah utama bukan pada satu keputusan pelaburan yang buruk, tetapi pada sistem yang membenarkan keputusan itu dibuat dan direkodkan.',
          simpul: 'Suruhanjaya tidak mencadangkan Tabung Haji dipecahkan — ia mencadangkan cara ia ditadbir, diaudit dan melabur diubah.',
          jangan: 'Bilangan penemuan bukan ukuran keseriusan. Satu penemuan perakaunan boleh melibatkan bilion Ringgit manakala beberapa penemuan tadbir urus mungkin bersifat prosedur. Pengelasan tema juga dibuat oleh dashboard.',
        })),
      C.card(null, null, ctlJenis, ctlTema, senarai));
  };

  /* ================= DATA MENTAH ================= */
  V.data = () => {
    const jadualSemua = [
      { nama: 'Neraca dan ujian seksyen 22 (2013–2017)', ms: 146,
        kol: ['Tahun', 'Aset RM juta', 'Liabiliti RM juta', 'Lebihan sebelum agihan', 'Agihan', 'Lebihan selepas agihan'],
        baris: D.neraca.map((n) => [n.tahun, n.aset, n.liabiliti, n.lebihanPra, n.agihan, n.lebihanPasca]) },
      { nama: 'Kadar agihan keuntungan (2014–2021)', ms: 120,
        kol: ['Tahun', 'Kadar tahunan %', 'Hibah haji %'], baris: D.kadarHibah.map((k) => [k.tahun, k.tahunan, k.haji]) },
      { nama: 'Jumlah agihan dibayar (2014–2020)', ms: 131,
        kol: ['Tahun', "Tahunan RM'000", "Hibah haji RM'000", "Jumlah RM'000"],
        baris: D.bayaranHibah.map((b) => [b.tahun, b.tahunan, b.haji, b.jumlah]) },
      { nama: 'Keuntungan bersih dan bonus anggota (2013–2017)', ms: 139,
        kol: ['Tahun', 'Keuntungan bersih RM juta', 'Bonus RM juta', 'Bonus/untung %', 'Bulan'],
        baris: D.untungBersih.map((u) => [u.tahun, u.untung, u.bonus, u.nisbah, u.bulan]) },
      { nama: 'Bonus kakitangan (2010–2020)', ms: 137,
        kol: ['Tahun', 'Peruntukan RM juta', 'Kadar diluluskan MOF', 'Taburan bulan'],
        baris: D.bonusKakitangan.map((b) => [b.tahun, b.rm, b.lulusMOF, b.taburan]) },
      { nama: 'Bonus TH Properties 2017', ms: 142, kol: ['Bil', 'Nama', 'Jumlah RM'],
        baris: D.bonusTHProperties2017.map((b) => [b.bil, b.nama, b.rm]) },
      { nama: 'Bonus THP Australia Capital 2018', ms: 143, kol: ['Bil', 'Nama', 'Jumlah RM'],
        baris: D.bonusTHPAustralia2018.map((b) => [b.bil, b.nama, b.rm]) },
      { nama: 'Jambatan RAV 2017', ms: 119, kol: ['Perkara', 'RM juta'], baris: D.jambatanRAV.map((r) => [r.label, r.nilai]) },
      { nama: 'Kesan rosot nilai ke atas keuntungan 2017', ms: 154, kol: ['Perkara', 'RM juta'],
        baris: D.jambatanUntung2017.map((r) => [r.label, r.nilai]) },
      { nama: 'Polisi rosot nilai 2017', ms: 148, kol: ['Takrif ketara', 'Ujian tempoh', 'Kesan RM juta'],
        baris: D.polisiRosotNilai.map((p) => [p.ketara, p.tempoh, p.kesan]) },
      { nama: 'Pemindahan aset kepada UJSB mengikut kelas', ms: 159,
        kol: ['Kelas aset', 'Nilai buku RM juta', 'Nilai pemindahan RM juta', 'Nilai pasaran RM juta'],
        baris: D.pindahanAset.map((a) => [a.kelas, a.nilaiBuku, a.nilaiPindahan, a.nilaiPasaran]) },
      { nama: 'Portfolio hartanah UJSB', ms: 161,
        kol: ['Jenis', 'Keluasan kps', 'Nilai pemindahan RM', 'Nilai pasaran Dis 2021 RM'],
        baris: D.hartanahUJSB.map((h) => [h.jenis, h.kps, h.pindahan, h.pasaran]) },
      { nama: 'Lima saham mewah dipindahkan', ms: 162,
        kol: ['Kaunter', 'Harga pemindahan RM', 'Harga 31 Dis 2018 RM', 'Kejatuhan %', 'Jumlah pemindahan RM', 'Jumlah 31 Dis 2018 RM', 'Harga 8 Jun 2022 RM'],
        baris: D.bluechip.map((b) => [b.kaunter, b.hargaPindahan, b.hargaDis18, b.jatuhPct, b.jumlahPindahan, b.jumlahDis18, b.hargaJun22]) },
      { nama: 'Komitmen Jaminan Kerajaan Persekutuan', ms: 168,
        kol: ['Entiti', '2020 RM juta', '2021 RM juta', '2020 %', '2021 %'],
        baris: D.jaminanKerajaan.map((j) => [j.entiti, j.y2020, j.y2021, j.pct2020, j.pct2021]) },
      { nama: 'Tawaran Hak Penolakan Pertama (ROFR)', ms: 176,
        kol: ['Ticker', 'Syarikat', 'Tarikh', 'Unit', 'Harga ROFR', 'Harga pasaran', 'Premium %'],
        baris: D.rofr.map((r) => [r.ticker, r.syarikat, r.tarikh, r.unit, r.hargaROFR, r.hargaPasaran, r.premium]) },
      { nama: 'HAFIS sebenar (2014–2019)', ms: 199,
        kol: ['Tahun', 'Kos haji RM', 'Bayaran RM', 'HAFIS RM', 'Jumlah RM juta'],
        baris: D.hafisSebenar.map((h) => [h.tahun, h.kos, h.bayaran, h.hafis, h.jumlahJuta]) },
      { nama: 'HAFIS unjuran (2022–2030)', ms: 200,
        kol: ['Tahun', 'Kos haji RM', 'Bayaran RM', 'HAFIS RM', "Jumlah RM'000"],
        baris: D.hafisUnjuran.map((h) => [h.tahun, h.kos, h.bayaran, h.hafis, h.jumlahRibu]) },
    ];

    const senaraiJadual = el('div', null, jadualSemua.map((j) =>
      el('details', { class: 'acc' },
        el('summary', null, el('span', { style: 'flex:1' }, j.nama),
          el('span', { class: 'tag', style: 'flex:none' }, 'ms ' + j.ms)),
        el('div', { class: 'body' },
          el('div', { class: 'tblwrap' }, el('table', null,
            el('thead', null, el('tr', null, j.kol.map((c, i) => el('th', { class: i > 0 ? 'num' : '' }, c)))),
            el('tbody', null, j.baris.map((r) => el('tr', null, r.map((c, i) =>
              el('td', { class: i > 0 && typeof c === 'number' ? 'num' : '' },
                typeof c === 'number' ? fmt.n(c, c % 1 ? 2 : 0) : String(c ?? '—')))))))),
          el('div', { class: 'ctl', style: 'margin-top:11px' },
            C.csv(`rci-th-${j.ms}.csv`, j.kol, j.baris), C.src(j.ms), C.pv('f'))))));

    const nota = el('div', null, X.notaIntegriti.map((n) =>
      el('div', { class: 'card', style: `margin-bottom:10px;border-left:3px solid ${n.tahap === 'sah' ? 'var(--pos)' : n.tahap === 'amaran' ? 'var(--warn)' : 'var(--ink3)'}` },
        el('div', { style: 'display:flex;gap:10px;align-items:flex-start;flex-wrap:wrap' },
          el('span', { class: 'tag', style: `flex:none;color:${n.tahap === 'sah' ? 'var(--pos)' : n.tahap === 'amaran' ? 'var(--warn)' : 'var(--ink3)'}` },
            n.tahap === 'sah' ? '✓ Disahsilang' : n.tahap === 'amaran' ? '⚠ Perlu berhati-hati' : 'ℹ Maklumat'),
          el('div', { style: 'flex:1;min-width:230px' }, el('b', null, n.tajuk),
            el('p', { style: 'margin:5px 0 0;color:var(--ink2);font-size:13.6px' }, n.teks))))));

    const kamus = el('div', { id: 'kamus' },
      el('div', { class: 'tblwrap' }, el('table', null,
        el('thead', null, el('tr', null, el('th', null, 'Istilah'), el('th', null, 'Maksud dalam bahasa mudah'), el('th', null, 'Sumber'))),
        el('tbody', null, D.glosari.map((g) => el('tr', null,
          el('td', null, el('b', null, g.istilah), g.penuh ? el('div', { style: 'font-size:11.8px;color:var(--ink3);margin-top:2px' }, g.penuh) : null),
          el('td', null, g.mudah),
          el('td', null, C.src(g.ms))))))));

    const orang = el('div', { class: 'tblwrap' }, el('table', null,
      el('thead', null, el('tr', null, el('th', null, 'Nama'), el('th', null, 'Peranan'), el('th', null, 'Sumber'))),
      el('tbody', null, [
        ...D.pesuruhjaya.map((p) => ({ ...p, k: 'Suruhanjaya' })),
        ...D.saksiABS.map((p) => ({ nama: p.nama, peranan: `Akuan Berkanun Saksi, Jilid ${p.jilid}`, ms: p.ms })),
      ].map((p) => el('tr', null, el('td', null, p.nama), el('td', null, p.peranan), el('td', null, C.src(p.ms)))))));

    return pane(
      head('Semak sendiri', 'Data mentah dan nota integriti',
        `Setiap jadual daripada laporan, boleh dimuat turun sebagai CSV. Bahagian nota integriti mendedahkan percanggahan dan
         masalah unit yang ditemui semasa menyusun data ini — perkara yang perlu anda tahu sebelum mempercayai mana-mana angka.`),

      C.card('Nota integriti data', 'Dibaca dahulu sebelum menggunakan mana-mana angka dalam analisis anda sendiri.', nota),

      C.card('Semua jadual laporan', `${jadualSemua.length} jadual, disalin sepenuhnya daripada laporan tanpa sebarang perubahan.`,
        senaraiJadual),

      C.card('Kamus istilah', 'Setiap istilah teknikal dalam dashboard ini, diterangkan dalam bahasa harian.', kamus),

      C.card('Nama yang disebut', 'Pesuruhjaya, pegawai Suruhanjaya, dan saksi yang mengemukakan Akuan Berkanun.',
        orang,
        C.note('w', `Penyebutan nama seseorang dalam laporan ini <b>tidak</b> bermakna orang itu didapati bersalah atas
          apa-apa kesalahan. Saksi memberi keterangan; sebahagian nama muncul kerana jawatan yang dipegang.`)),

      C.card('Tentang dashboard ini', null,
        el('div', { style: 'color:var(--ink2)' },
          el('p', { style: 'margin:0 0 10px', html:
            `Semua data berasal daripada satu sumber sahaja: teks penuh <b>Laporan Suruhanjaya Siasatan Diraja Tabung Haji</b>
             yang diterbitkan secara terbuka di
             <a href="https://github.com/SyahmiRafsan/rci-tabunghaji" target="_blank" rel="noopener">github.com/SyahmiRafsan/rci-tabunghaji</a>.
             Laporan asal ditandatangani pada 19 Julai 2022 dan dipersembahkan kepada Yang di-Pertuan Agong pada 30 Ogos 2022.` }),
          el('p', { style: 'margin:0 0 10px', html:
            `Tiada angka direka. Angka yang tidak wujud dalam laporan tetapi dikira daripada angka laporan dilabel
             <b>Data terbitan</b> dengan formulanya ditunjukkan. Angka yang datang daripada tetapan pengguna dilabel
             <b>Simulasi anda</b>. Unjuran masa depan yang dibuat oleh laporan sendiri dilabel <b>Unjuran laporan</b>.` }),
          el('p', { style: 'margin:0', html:
            `Dashboard ini bukan terbitan rasmi Lembaga Tabung Haji, Suruhanjaya Siasatan Diraja, atau mana-mana agensi Kerajaan.
             Ia alat pembacaan data yang bertujuan menjadikan laporan awam ini lebih mudah difahami dan disemak oleh orang ramai.` }))));
  };
})();
