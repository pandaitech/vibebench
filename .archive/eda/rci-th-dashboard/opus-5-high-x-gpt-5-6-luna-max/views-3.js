/* ===== PAPARAN 3: Bonus · Pelaburan bermasalah · Tindakan ===== */
(function () {
  'use strict';
  const { fmt, el, s } = L;
  const D = window.RCI, X = window.RCI_DETAIL, T = window.T, C = window.C;
  window.V = window.V || {};

  const head = (kicker, tajuk, teks) => el('div', { class: 'pane-h' },
    el('div', { class: 'kicker' }, kicker), el('h2', null, tajuk), el('p', { html: teks }));
  const pane = (...k) => el('div', { class: 'pane' }, k.flat().filter(Boolean));
  const box = () => el('div');

  /* ================= BONUS ================= */
  V.bonus = () => {
    const wTrend = box(), wOrang = box();

    /* Trend bonus kakitangan + penanda kedudukan neraca */
    L.chart(wTrend, { h: (w) => (w < 620 ? 320 : 340), m: { t: 24, r: 52, b: 44, l: 56 } }, (g, w, h) => {
      const thn = D.bonusKakitangan.map((b) => b.tahun);
      const x = L.band(thn, [0, w], 0.3);
      const y = L.linear([0, 82], [h, 0]);
      const y2 = L.linear([0, 14], [h, 0]);
      L.axisY(g, y, w, { label: 'Peruntukan bonus (RM juta)', fmt: (v) => fmt.n(v) });
      D.bonusKakitangan.forEach((b) => {
        const n = D.neraca.find((r) => r.tahun === b.tahun);
        const defisit = n && n.lebihanPasca < 0;
        const r = s('rect', { x: x(b.tahun), y: y(b.rm), width: x.bandwidth, height: Math.max(1, h - y(b.rm)), rx: 3,
          fill: defisit ? 'var(--neg)' : 'color-mix(in srgb,var(--fakta) 55%,transparent)', class: 'bar' });
        r.addEventListener('mouseenter', (e) => L.showTip(e, `<b>${b.tahun}</b>
          <div class="kv"><span>Peruntukan bonus</span><span>${fmt.juta(b.rm)}</span></div>
          <div class="kv"><span>Kadar diluluskan</span><span>${b.lulusMOF} bulan</span></div>
          ${n ? `<div class="kv"><span>Kedudukan neraca</span><span style="color:${n.lebihanPasca < 0 ? 'var(--neg)' : 'var(--pos)'}">${fmt.juta(n.lebihanPasca)}</span></div>` : ''}
          ${defisit ? '<div class="note">Bonus dibayar dalam tahun yang neraca berakhir defisit.</div>' : ''}`));
        r.addEventListener('mousemove', L.moveTip); r.addEventListener('mouseleave', L.hideTip);
        g.appendChild(r);
      });
      // garis bilangan bulan maksimum
      const pts = D.bonusKakitangan.map((b) => ({ x: x(b.tahun) + x.bandwidth / 2, y: y2(b.maks) }));
      g.appendChild(s('path', { d: pts.map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join(' '),
        fill: 'none', stroke: 'var(--terbit)', 'stroke-width': 2.4, 'stroke-dasharray': '5 3' }));
      pts.forEach((p, i) => {
        const c = s('circle', { cx: p.x, cy: p.y, r: 4, fill: 'var(--terbit)' });
        const b = D.bonusKakitangan[i];
        c.addEventListener('mouseenter', (e) => L.showTip(e, `<b>${b.tahun}</b><div class="kv"><span>Bonus maksimum</span><span>${b.maks} bulan gaji</span></div><div class="kv"><span>Julat agihan</span><span>${b.taburan}</span></div>`));
        c.addEventListener('mousemove', L.moveTip); c.addEventListener('mouseleave', L.hideTip);
        g.appendChild(c);
      });
      L.ticks(0, 14, 4).forEach((t) => g.appendChild(s('text', { x: w + 8, y: y2(t) + 4, class: 'axis', fill: 'var(--terbit)', text: t + ' bln' })));
      L.axisX(g, x, thn, h, { every: w < 520 ? 2 : 1 });
    });

    /* Cantuman penerima bonus */
    L.chart(wOrang, { h: () => T.bonusOrang.length * 30 + 46, m: { t: 20, r: 108, b: 30, l: 178 } }, (g, w, h) => {
      const nama = T.bonusOrang.map((o) => o.kunci);
      const y = L.band(nama, [0, h], 0.26);
      const maxv = Math.max(...T.bonusOrang.map((o) => o.jumlah));
      const x = L.linear([0, maxv * 1.05], [0, w]);
      L.ticks(0, maxv, 4).forEach((t) => {
        g.appendChild(s('line', { x1: x(t), x2: x(t), y1: 0, y2: h, class: 'grid' }));
        g.appendChild(s('text', { x: x(t), y: h + 16, class: 'axis', 'text-anchor': 'middle', text: 'RM' + fmt.n(t / 1000) + 'k' }));
      });
      T.bonusOrang.forEach((o) => {
        const yy = y(o.kunci);
        const w1 = x(o.y2017), w2 = x(o.y2018);
        const mk = (x0, ww, warna, label, amaun) => {
          if (ww <= 0) return;
          const r = s('rect', { x: x0, y: yy, width: ww, height: y.bandwidth, rx: 2, fill: warna, class: 'bar' });
          r.addEventListener('mouseenter', (e) => L.showTip(e, `<b>${o.nama}</b>
            <div class="kv"><span>${label}</span><span>${fmt.rmTepat(amaun)}</span></div>
            <div class="kv"><span>Jumlah kedua-dua skim</span><span>${fmt.rmTepat(o.jumlah)}</span></div>`));
          r.addEventListener('mousemove', L.moveTip); r.addEventListener('mouseleave', L.hideTip);
          g.appendChild(r);
        };
        mk(0, w1, 'var(--terbit)', 'TH Properties 2017', o.y2017);
        mk(w1, w2, 'var(--unjur)', 'THP Australia Capital 2018', o.y2018);
        const pendek = o.nama.replace(/^(Datuk|Dato’|Dato'|Haji|Tan Sri)\s+/g, '');
        g.appendChild(s('text', { x: -8, y: yy + y.bandwidth / 2 + 4, class: 'axis', 'text-anchor': 'end',
          text: pendek.length > 25 ? pendek.slice(0, 23) + '…' : pendek }));
        g.appendChild(s('text', { x: x(o.jumlah) + 7, y: yy + y.bandwidth / 2 + 4, class: 'val',
          fill: o.skim === 2 ? 'var(--neg)' : 'var(--ink3)', text: fmt.rmTepat(o.jumlah) }));
      });
    });

    const dua = T.bonusOrang.filter((o) => o.skim === 2).length;
    const jumDua = T.bonusOrang.reduce((a, o) => a + o.jumlah, 0);

    return pane(
      head('Siapa dapat berapa', 'Bonus dan ganjaran',
        `Bonus dibayar kepada kakitangan setiap tahun. Persoalan yang Suruhanjaya kemukakan bukan sama ada bonus patut dibayar,
         tetapi sama ada ia berpadanan dengan kedudukan kewangan sebenar institusi pada masa itu.`),

      C.card('Bonus kakitangan berbanding kedudukan neraca',
        'Batang merah menandakan tahun yang berakhir dengan aset kurang daripada liabiliti selepas agihan keuntungan dibuat.',
        wTrend,
        L.legend([{ label: 'Bonus pada tahun neraca defisit', warna: 'var(--neg)' },
          { label: 'Bonus pada tahun lain (atau tanpa data neraca)', warna: 'color-mix(in srgb,var(--fakta) 55%,transparent)' },
          { label: 'Bonus maksimum dalam bulan gaji (paksi kanan)', warna: 'var(--terbit)' }]),
        C.baca({
          tunjuk: 'Peruntukan bonus kakitangan 2010–2020, dan bilangan bulan gaji tertinggi yang dibayar.',
          penting: 'Bonus memuncak pada RM74 juta dan sehingga 13 bulan gaji pada 2014 — tahun yang sama neraca mula berakhir defisit sebanyak RM352 juta. Selepas krisis didedahkan, bonus jatuh kepada satu bulan sahaja dari 2018 hingga 2020.',
          simpul: 'Bonus tertinggi dibayar dalam tempoh yang sama apabila kedudukan kewangan sebenar paling lemah. Suruhanjaya mendapati ini berpunca daripada keuntungan yang dikira berdasarkan penilaian RAV, bukan penyata kewangan beraudit.',
          jangan: 'Ini <b>tidak</b> bermakna kakitangan bersalah. Bonus diluluskan mengikut prosedur yang melibatkan Kementerian Kewangan. Isunya ialah asas keuntungan yang digunakan untuk mewajarkannya.',
        }),
        C.srcbar(C.src(137, 'Jadual bonus: ms 137'), C.src(140, 'Kaitan dengan RAV: ms 140'))),

      C.card('Bonus istimewa: menggabungkan dua senarai nama',
        `Laporan mengandungi dua jadual berasingan — bonus TH Properties bagi 2017 dan bonus THP Australia Capital bagi 2018.
         Menggabungkan kedua-duanya mengikut nama mendedahkan sesuatu yang tidak kelihatan dalam mana-mana jadual secara berasingan.`,
        wOrang,
        L.legend([{ label: 'Bonus TH Properties 2017', warna: 'var(--terbit)' }, { label: 'Bonus THP Australia Capital 2018', warna: 'var(--unjur)' }]),
        el('div', { class: 'grid g3', style: 'margin-top:16px' },
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('t'), el('span', { class: 'v' }, String(dua)),
            el('span', { class: 'l' }, 'Individu yang menerima bonus daripada <b>kedua-dua</b> skim')),
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('t'), el('span', { class: 'v' }, fmt.rmTepat(jumDua)),
            el('span', { class: 'l' }, 'Jumlah kedua-dua skim yang digabungkan')),
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('t'), el('span', { class: 'v' }, fmt.rmTepat(T.bonusOrang[0].jumlah)),
            el('span', { class: 'l' }, 'Jumlah tertinggi diterima oleh seorang individu'))),
        C.baca({
          tunjuk: 'Setiap individu yang dinamakan dalam kedua-dua jadual bonus istimewa, dengan jumlah gabungan.',
          penting: `Sepuluh daripada ${T.bonusOrang.length} individu muncul dalam kedua-dua senarai. Corak ini hanya kelihatan
            apabila dua jadual daripada muka surat berbeza digabungkan — kumpulan orang yang hampir sama menerima bonus istimewa
            dua tahun berturut-turut, daripada dua syarikat berbeza dalam kumpulan yang sama.`,
          simpul: 'Bonus istimewa ini bukan kejadian terpencil. Suruhanjaya mendapati kelulusan dibuat oleh badan yang tidak mempunyai mandat, mengesahkan pelanggaran seksyen 230 Akta 777, dan mengesyorkan bonus itu dituntut semula.',
          jangan: 'Senarai ini <b>tidak</b> menunjukkan sesiapa telah disabitkan kesalahan. Ia menunjukkan siapa menerima bayaran yang Suruhanjaya dapati diluluskan tanpa kuasa yang sah. Padanan nama merentas dua jadual dibuat oleh dashboard kerana gelaran yang digunakan sedikit berbeza antara kedua-duanya.',
        }),
        C.note('', `<b>Nota bacaan data.</b> Lajur "Bil." dalam jadual asal TH Properties (ms 142) melompat daripada 4 kepada 8.
          Namun 11 baris yang tersenarai berjumlah tepat RM1,148,400 seperti dicetak dalam laporan — jadi tiada penerima yang hilang;
          lompatan itu hanyalah masalah pembacaan teks daripada PDF.`),
        C.srcbar(C.src(142, 'TH Properties 2017: ms 142'), C.src(143, 'THP Australia 2018: ms 143'), C.src(144, 'Pandangan Suruhanjaya: ms 144'),
          C.csv('rci-th-bonus-nama.csv', ['Nama', 'TH Properties 2017 RM', 'THP Australia 2018 RM', 'Jumlah RM'],
            T.bonusOrang.map((o) => [o.nama, o.y2017, o.y2018, o.jumlah])))),

      C.card('Bagaimana bonus diagihkan mengikut prestasi', 'Jadual laporan bagi 2014 dan 2015 menunjukkan hubungan antara gred prestasi dan bilangan bulan gaji.',
        C.tbl([
          { key: 'gred', label: 'Gred prestasi' },
          { key: 'peratusKakitangan', label: '% kakitangan', num: true, sel: (r) => r.peratusKakitangan + '%' },
          { key: 'y2014', label: 'Bulan gaji 2014' },
          { key: 'y2015', label: 'Bulan gaji 2015' },
        ], D.gredPrestasi),
        C.note('', `Kakitangan gred terendah pun menerima sekurang-kurangnya satu bulan bonus, manakala gred tertinggi menerima
          sehingga 11 bulan pada 2014. Enam puluh peratus kakitangan berada dalam gred C.`),
        C.srcbar(C.src(138, 'Laporan ms 138'))));
  };

  /* ================= PELABURAN BERMASALAH ================= */
  V.pelaburan = () => {
    let tapisKat = 'semua', carian = '';
    const senarai = box(), wPunca = box(), wSaiz = box();

    const kategori = ['semua', ...new Set(X.pelaburanBermasalah.map((p) => p.kategori))];

    /* Carta saiz kerugian */
    L.chart(wSaiz, { h: () => T.rugiRM.length * 30 + 44, m: { t: 18, r: 96, b: 30, l: 150 } }, (g, w, h) => {
      const data = T.rugiRM.slice().sort((a, b) => b.rugiRM - a.rugiRM);
      const y = L.band(data.map((p) => p.ringkas), [0, h], 0.26);
      const x = L.linear([0, Math.max(...data.map((p) => p.rugiRM)) * 1.04], [0, w]);
      L.ticks(0, Math.max(...data.map((p) => p.rugiRM)), 4).forEach((t) => {
        g.appendChild(s('line', { x1: x(t), x2: x(t), y1: 0, y2: h, class: 'grid' }));
        g.appendChild(s('text', { x: x(t), y: h + 16, class: 'axis', 'text-anchor': 'middle', text: fmt.n(t) }));
      });
      g.appendChild(s('text', { x: 0, y: -5, class: 'axis-label', text: 'Kerugian / rosot nilai (RM juta)' }));
      data.forEach((p) => {
        const yy = y(p.ringkas);
        const r = s('rect', { x: 0, y: yy, width: Math.max(1, x(p.rugiRM)), height: y.bandwidth, rx: 2,
          fill: p.rugiRM > 500 ? 'var(--neg)' : 'color-mix(in srgb,var(--neg) 55%,transparent)', class: 'bar', style: 'cursor:pointer' });
        r.addEventListener('mouseenter', (e) => L.showTip(e, `<b>${p.nama}</b>
          <div class="kv"><span>Kerugian / rosot nilai</span><span>${fmt.juta(p.rugiRM)}</span></div>
          ${p.pelaburanRM ? `<div class="kv"><span>Jumlah terlibat</span><span>${fmt.juta(p.pelaburanRM)}</span></div>` : ''}
          <div class="kv"><span>Kategori</span><span>${p.kategori}</span></div>
          <div class="note">Klik untuk butiran penuh. Laporan ms ${p.ms}</div>`));
        r.addEventListener('mousemove', L.moveTip); r.addEventListener('mouseleave', L.hideTip);
        r.addEventListener('click', () => { const d = document.getElementById('pl' + p.no); if (d) { d.open = true; d.scrollIntoView({ behavior: 'smooth', block: 'center' }); } });
        g.appendChild(r);
        g.appendChild(s('text', { x: -8, y: yy + y.bandwidth / 2 + 4, class: 'axis', 'text-anchor': 'end', text: p.ringkas }));
        g.appendChild(s('text', { x: x(p.rugiRM) + 7, y: yy + y.bandwidth / 2 + 4, class: 'val', fill: 'var(--ink3)', text: fmt.juta(p.rugiRM) }));
      });
    });

    /* Kekerapan punca */
    L.chart(wPunca, { h: () => T.puncaPeta.length * 30 + 30, m: { t: 16, r: 40, b: 24, l: 260 } }, (g, w, h) => {
      const data = T.puncaPeta.slice().sort((a, b) => b.no.length - a.no.length);
      const y = L.band(data.map((p) => p.tag), [0, h], 0.3);
      const x = L.linear([0, 5], [0, w]);
      [0, 1, 2, 3, 4].forEach((t) => g.appendChild(s('line', { x1: x(t), x2: x(t), y1: 0, y2: h, class: 'grid' })));
      data.forEach((p) => {
        const yy = y(p.tag);
        const r = s('rect', { x: 0, y: yy, width: Math.max(2, x(p.no.length)), height: y.bandwidth, rx: 2, fill: 'var(--warn)', class: 'bar' });
        r.addEventListener('mouseenter', (e) => L.showTip(e, `<b>${p.tag}</b>
          <div class="kv"><span>Bilangan pelaburan terjejas</span><span>${p.no.length}</span></div>
          <div class="note">${p.no.map((n) => X.pelaburanBermasalah.find((q) => q.no === n).ringkas).join(', ')}</div>`));
        r.addEventListener('mousemove', L.moveTip); r.addEventListener('mouseleave', L.hideTip);
        g.appendChild(r);
        const t = p.tag.length > 40 ? p.tag.slice(0, 38) + '…' : p.tag;
        g.appendChild(s('text', { x: -8, y: yy + y.bandwidth / 2 + 4, class: 'axis', 'text-anchor': 'end', text: t }));
        g.appendChild(s('text', { x: x(p.no.length) + 7, y: yy + y.bandwidth / 2 + 4, class: 'val', fill: 'var(--warn)', text: p.no.length }));
      });
    });

    function lukisSenarai() {
      senarai.innerHTML = '';
      const q = carian.trim().toLowerCase();
      const data = X.pelaburanBermasalah.filter((p) =>
        (tapisKat === 'semua' || p.kategori === tapisKat) &&
        (!q || (p.nama + p.apaJadi + p.punca + p.lokasi + (p.tindakan || '')).toLowerCase().includes(q)));
      if (!data.length) { senarai.appendChild(el('div', { class: 'empty' }, 'Tiada pelaburan sepadan dengan tapisan ini.')); return; }
      data.forEach((p) => {
        senarai.appendChild(el('details', { class: 'acc', id: 'pl' + p.no },
          el('summary', null,
            el('span', { class: 'tag', style: 'flex:none' }, String(p.no).padStart(2, '0')),
            el('span', { style: 'flex:1;min-width:0' }, el('b', null, p.nama),
              el('div', { style: 'font-size:12.3px;color:var(--ink3);margin-top:3px' },
                `${p.kategori} · ${p.lokasi}${p.tahun ? ' · bermula ' + p.tahun : ''}`)),
            p.rugiRM !== null ? el('span', { class: 'tag', style: 'color:var(--neg);border-color:var(--neg);flex:none' }, fmt.juta(p.rugiRM))
              : el('span', { class: 'tag', style: 'flex:none' }, p.mataWangLain || 'tiada angka RM')),
          el('div', { class: 'body' },
            el('h4', { style: 'font-size:12px;font-family:var(--mono);color:var(--ink3);letter-spacing:.05em;text-transform:uppercase;margin-bottom:6px' }, 'Apa yang berlaku'),
            el('p', { style: 'margin:0 0 14px;color:var(--ink2)' }, p.apaJadi),
            el('h4', { style: 'font-size:12px;font-family:var(--mono);color:var(--ink3);letter-spacing:.05em;text-transform:uppercase;margin-bottom:6px' }, 'Punca yang dikenal pasti'),
            el('p', { style: 'margin:0 0 14px;color:var(--ink2)' }, p.punca),
            el('h4', { style: 'font-size:12px;font-family:var(--mono);color:var(--ink3);letter-spacing:.05em;text-transform:uppercase;margin-bottom:7px' }, 'Kelemahan proses'),
            el('div', { style: 'display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px' }, p.kelemahan.map((k) => el('span', { class: 'tag' }, k))),
            p.tindakan ? el('div', null,
              el('h4', { style: 'font-size:12px;font-family:var(--mono);color:var(--ink3);letter-spacing:.05em;text-transform:uppercase;margin-bottom:6px' }, 'Tindakan diambil'),
              el('p', { style: 'margin:0 0 12px;color:var(--ink2)' }, p.tindakan)) : null,
            (p.rugiNota || p.pelaburanNota) ? C.note('w', `<b>Nota angka.</b> ${p.rugiNota || ''} ${p.pelaburanNota || ''}`) : null,
            C.srcbar(C.src(p.ms), C.pv('f')))));
      });
    }

    const ctl = el('div', { class: 'ctl' },
      el('input', { type: 'search', placeholder: 'Cari nama, negara atau punca…', style: 'flex:1;min-width:190px',
        oninput: (e) => { carian = e.target.value; lukisSenarai(); } }));
    const chips = el('div', { class: 'ctl' }, kategori.map((k) => {
      const b = el('button', { class: 'chip' + (k === 'semua' ? ' on' : ''), onclick: () => {
        tapisKat = k; [...chips.children].forEach((c) => c.classList.remove('on')); b.classList.add('on'); lukisSenarai();
      } }, k === 'semua' ? 'Semua kategori' : k);
      return b;
    }));
    lukisSenarai();

    return pane(
      head('Apa yang rugi', '14 pelaburan bermasalah',
        `Suruhanjaya menyenaraikan 14 pelaburan yang disyorkan menjalani audit forensik — pemeriksaan mendalam terhadap
         bagaimana keputusan pelaburan itu dibuat. Modul ini menyusun setiap satunya, saiz kerugiannya, dan corak yang berulang.`),

      C.card('Saiz kerugian yang dinyatakan dalam Ringgit',
        'Klik mana-mana batang untuk terus ke butiran penuh pelaburan berkenaan.',
        wSaiz,
        el('div', { class: 'grid g3', style: 'margin-top:16px' },
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('t'),
            el('span', { class: 'v', style: 'color:var(--neg)' }, fmt.juta(T.rugiJumlah)),
            el('span', { class: 'l' }, `Jumlah kerugian merentas ${T.rugiRM.length} pelaburan yang mempunyai angka Ringgit`)),
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('f'),
            el('span', { class: 'v' }, fmt.juta(X.pelaburanBermasalah.find((p) => p.no === 14).rugiRM)),
            el('span', { class: 'l', html: `Kerugian tunggal terbesar: FGV — <b>${fmt.n((X.pelaburanBermasalah.find((p) => p.no === 14).rugiRM / T.rugiJumlah) * 100, 0)}%</b> daripada keseluruhan jumlah di sebelah` })),
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('f'),
            el('span', { class: 'v', style: 'color:var(--warn)' }, String(T.tanpaRM.length)),
            el('span', { class: 'l' }, 'Pelaburan tanpa angka kerugian dalam Ringgit — jumlah sebenar lebih tinggi'))),
        C.baca({
          tunjuk: 'Kerugian atau rosot nilai bagi setiap pelaburan yang laporannya memberikan angka dalam Ringgit.',
          penting: 'Kerugian tidak tersebar sama rata. FGV seorang diri menyumbang lebih separuh daripada jumlah keseluruhan. Sepuluh pelaburan lain digabungkan pun masih kurang daripada FGV.',
          simpul: 'Satu keputusan pelaburan tunggal yang besar memberi kesan lebih besar daripada gabungan sepuluh keputusan yang lebih kecil. Ini menyokong pemerhatian Suruhanjaya mengenai bahaya pelaburan yang terlalu tertumpu.',
          jangan: `Jumlah RM${fmt.n(T.rugiJumlah)} juta <b>bukan</b> jumlah kerugian keseluruhan Tabung Haji. Ia hanya
            merangkumi ${T.rugiRM.length} daripada 14 pelaburan ini. THIP dinyatakan dalam Dolar Amerika dan Al-Rawda dalam Riyal Saudi;
            laporan tidak memberi kadar tukaran, jadi dashboard tidak menukarnya. Ia juga tidak termasuk kerugian pelaburan lain
            di luar senarai 14 ini.`,
        })),

      C.card('Corak yang berulang: punca kegagalan merentas 14 pelaburan',
        'Setiap pelaburan gagal atas sebabnya sendiri — tetapi sebab-sebab itu berulang. Carta ini mengira berapa banyak pelaburan berkongsi setiap kelemahan.',
        wPunca,
        C.baca({
          tunjuk: 'Bilangan pelaburan yang berkongsi setiap jenis kelemahan proses.',
          penting: 'Empat pelaburan gagal kerana penilaian bebas tidak dibuat, dan empat lagi kerana LTH melabur di luar bidang kepakarannya. Tiga pelaburan — Emrail, Wellspring dan Putrajaya Perdana — gagal dengan corak yang <i>hampir sama</i>: pulangan dijanjikan melalui penyenaraian atau janji beli balik yang akhirnya tidak dapat dikuatkuasakan.',
          simpul: 'Ini bukan siri kemalangan yang tidak berkaitan. Kelemahan yang sama berulang dalam pelaburan berbeza sepanjang bertahun-tahun, yang menunjukkan masalah pada proses membuat keputusan, bukan pada nasib.',
          jangan: '<b>Pengelasan ini dibuat oleh dashboard</b>, bukan oleh laporan. Laporan menerangkan setiap kes secara berasingan tanpa mengumpulkannya kepada kategori. Pengelasan ini ialah tafsiran yang boleh dipertikaikan — semak butiran setiap kes di bawah untuk menilai sendiri.',
        }),
        C.srcbar(C.src(176, 'Proses membuat keputusan: ms 176'))),

      C.card('Butiran setiap pelaburan', 'Cari atau tapis, kemudian buka mana-mana untuk membaca kisah penuh berserta rujukan muka surat.',
        ctl, chips, senarai));
  };

  /* ================= TINDAKAN ================= */
  V.tindakan = () => {
    let tapis = 'semua';
    const senarai = box();
    const jenis = ['semua', ...new Set(X.tindakan.map((t) => t.jenis))];
    const kira = (j) => (j === 'semua' ? X.tindakan.length : X.tindakan.filter((t) => t.jenis === j).length);

    function lukis() {
      senarai.innerHTML = '';
      const data = X.tindakan.filter((t) => tapis === 'semua' || t.jenis === tapis)
        .slice().sort((a, b) => (b.tarikh || '').localeCompare(a.tarikh || ''));
      senarai.appendChild(C.tbl([
        { key: 'jenis', label: 'Jenis', sel: (r) => el('span', { class: 'tag' }, r.jenis) },
        { key: 'perkara', label: 'Perkara' },
        { key: 'tarikh', label: 'Tarikh', sel: (r) => (r.tarikh ? fmt.tarikh(r.tarikh) : 'tidak dinyatakan') },
        { key: 'status', label: 'Status ketika laporan disiapkan' },
        { key: 'ms', label: 'Sumber', sel: (r) => C.src(r.ms) },
      ], data, { susun: 'tarikh' }));
    }

    const chips = el('div', { class: 'ctl' }, jenis.map((j) => {
      const b = el('button', { class: 'chip' + (j === 'semua' ? ' on' : ''), onclick: () => {
        tapis = j; [...chips.children].forEach((c) => c.classList.remove('on')); b.classList.add('on'); lukis();
      } }, `${j === 'semua' ? 'Semua' : j} (${kira(j)})`);
      return b;
    }));
    lukis();

    const ringkasan = el('div', { class: 'grid g4' }, jenis.slice(1).map((j) =>
      el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('f'),
        el('span', { class: 'v' }, String(kira(j))), el('span', { class: 'l' }, j))));

    return pane(
      head('Polis, SPRM, mahkamah', 'Tindakan undang-undang dan tatatertib',
        `Laporan merekodkan tindakan yang telah diambil terhadap perkara-perkara yang dibangkitkan.
         Status di bawah ialah status <b>pada Julai 2022</b> ketika laporan disiapkan, bukan status semasa.`),
      C.note('w', `<b>Baca dengan berhati-hati.</b> Laporan polis atau aduan bermakna sesuatu perkara <i>dilaporkan</i> untuk
        disiasat. Ia tidak bermakna sesiapa telah didakwa atau disabitkan kesalahan. Beberapa perkara masih dalam siasatan
        ketika laporan disiapkan. Suruhanjaya sendiri mencadangkan supaya pihak berkuasa mengambil tindakan tegas dan segera
        ke atas setiap laporan.`),
      ringkasan,
      C.card('Semua tindakan yang direkodkan', 'Klik tajuk lajur untuk menyusun. Tapis mengikut jenis di bawah.',
        chips, senarai,
        C.baca({
          tunjuk: 'Setiap laporan polis, tindakan tatatertib, laporan SPRM, kes mahkamah dan timbang tara yang disebut dalam laporan.',
          penting: 'Perhatikan corak keputusan tatatertib: dalam tiga daripada empat kluster, hukuman asal buang kerja atau turun pangkat <b>dikurangkan selepas rayuan</b>. Suruhanjaya mengesyorkan proses tatatertib diperkemas supaya dilihat berkesan, cekap, adil dan telus.',
          simpul: 'Kebanyakan siasatan masih berjalan ketika laporan disiapkan pada Julai 2022. Dua kes berkaitan Indonesia tergendala kerana memerlukan kebenaran pihak berkuasa negara berkenaan.',
          jangan: 'Jadual ini <b>tidak</b> menunjukkan keputusan akhir mana-mana kes. Ia juga tidak lengkap — ekshibit laporan yang mengandungi butiran penuh diklasifikasikan sebagai rahsia.',
        })));
  };
})();
