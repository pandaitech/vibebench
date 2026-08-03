/* ===== PAPARAN 2: Perakaunan · Urusharta Jamaah ===== */
(function () {
  'use strict';
  const { fmt, el, s } = L;
  const D = window.RCI, X = window.RCI_DETAIL, T = window.T, C = window.C;
  window.V = window.V || {};

  const head = (kicker, tajuk, teks) => el('div', { class: 'pane-h' },
    el('div', { class: 'kicker' }, kicker), el('h2', null, tajuk), el('p', { html: teks }));
  const pane = (...k) => el('div', { class: 'pane' }, k.flat().filter(Boolean));
  const box = () => el('div');

  /* ---------- Carta air terjun (waterfall) ---------- */
  function airTerjun(host, langkah, opsi = {}) {
    L.chart(host, { h: (w) => (w < 620 ? 340 : 330), m: { t: 24, r: 12, b: opsi.b || 92, l: 62 } }, (g, w, h) => {
      // kira kedudukan tiap batang
      let jalan = 0; const kotak = [];
      langkah.forEach((st, i) => {
        if (st.jenis === 'mula' || st.jenis === 'subjumlah' || st.jenis === 'akhir') {
          const v = st.jenis === 'mula' ? st.nilai : st.nilai;
          kotak.push({ ...st, dari: 0, ke: v, i });
          jalan = v;
        } else {
          kotak.push({ ...st, dari: jalan, ke: jalan + st.nilai, i });
          jalan += st.nilai;
        }
      });
      const semua = kotak.flatMap((k) => [k.dari, k.ke]);
      const y = L.linear(L.extent(semua), [h, 0]);
      const idx = kotak.map((k) => k.i);
      const x = L.band(idx, [0, w], 0.34);
      L.axisY(g, y, w, { label: opsi.unit || 'RM juta', fmt: (v) => fmt.n(v / 1000, 1) + 'b' });

      kotak.forEach((k) => {
        const y0 = y(k.dari), y1 = y(k.ke);
        const naik = k.ke >= k.dari;
        const warna = k.jenis === 'mula' ? 'var(--fakta)'
          : k.jenis === 'akhir' ? (k.ke < 0 ? 'var(--neg)' : 'var(--pos)')
          : k.jenis === 'subjumlah' ? 'var(--unjur)'
          : naik ? 'var(--pos)' : 'var(--neg)';
        const r = s('rect', { x: x(k.i), y: Math.min(y0, y1), width: x.bandwidth,
          height: Math.max(2, Math.abs(y1 - y0)), rx: 3, fill: warna, class: 'bar' });
        r.addEventListener('mouseenter', (e) => L.showTip(e,
          `<b>${k.label}</b><div class="kv"><span>Nilai</span><span>${fmt.juta(k.nilai)}</span></div>` +
          (k.jenis === 'naik' || k.jenis === 'turun' ? `<div class="kv"><span>Baki selepas</span><span>${fmt.juta(k.ke)}</span></div>` : '') +
          `<div class="note">Laporan ms ${k.ms}</div>`));
        r.addEventListener('mousemove', L.moveTip); r.addEventListener('mouseleave', L.hideTip);
        g.appendChild(r);
        // sambungan
        if (k.i < kotak.length - 1 && k.jenis !== 'akhir') {
          g.appendChild(s('line', { x1: x(k.i) + x.bandwidth, x2: x(k.i + 1), y1: y(k.ke), y2: y(k.ke),
            stroke: 'var(--ink3)', 'stroke-width': 1, 'stroke-dasharray': '3 3' }));
        }
        // nilai
        g.appendChild(s('text', { x: x(k.i) + x.bandwidth / 2, y: Math.min(y0, y1) - 7, class: 'val',
          fill: warna, 'text-anchor': 'middle', text: (k.nilai > 0 && k.jenis === 'naik' ? '+' : '') + fmt.n(k.nilai) }));
        // label pendek
        const kata = (opsi.pendek && opsi.pendek[k.i]) || k.label;
        const maks = Math.max(8, Math.floor(x.bandwidth / 6.4));
        let ln = [], cur = '';
        kata.split(' ').forEach((b) => { if ((cur + ' ' + b).trim().length > maks) { ln.push(cur.trim()); cur = b; } else cur += ' ' + b; });
        ln.push(cur.trim());
        ln.slice(0, 4).forEach((t, j) => g.appendChild(s('text', { x: x(k.i) + x.bandwidth / 2, y: h + 16 + j * 12,
          class: 'axis', 'text-anchor': 'middle', text: t })));
      });
    });
  }

  /* ================= PERAKAUNAN ================= */
  V.perakaunan = () => {
    const wRAV = box(), wUntung = box(), wRosot = box(), wTertahan = box();

    airTerjun(wRAV, D.jambatanRAV, {
      pendek: ['Aset penyata', 'Tambah RAV', 'Aset + RAV', 'Tolak liabiliti', 'Baki diagihkan'] });

    airTerjun(wUntung, D.jambatanUntung2017, {
      pendek: ['Untung dilapor', 'Rosot ekuiti', 'Rosot hutang', 'Pelarasan lain', 'Kerugian sebenar'] });

    airTerjun(wTertahan, D.perolehanTertahan2017, { b: 62,
      pendek: ['Perolehan tertahan', 'Tolak pelarasan', 'Kerugian terkumpul'] });

    /* Pemilih polisi rosot nilai */
    let pilihP = 3;
    const wrapP = box();
    function lukisP() {
      wrapP.innerHTML = '';
      const p = D.polisiRosotNilai[pilihP - 1];
      const asal = D.polisiRosotNilai[0].kesan;
      wrapP.appendChild(C.seg(D.polisiRosotNilai.map((r, i) => ({
        id: String(i + 1), label: `Polisi ${i + 1}: ${r.ketara}`, nota: `Ujian tempoh: ${r.tempoh}`,
      })), String(pilihP), (v) => { pilihP = +v; lukisP(); }));

      const host = el('div', { style: 'margin-top:14px' });
      wrapP.appendChild(host);
      L.chart(host, { h: 190, m: { t: 22, r: 12, b: 34, l: 62 } }, (g, w, h) => {
        const idx = D.polisiRosotNilai.map((_, i) => i);
        const x = L.band(idx, [0, w], 0.4);
        const y = L.linear([0, 1450], [h, 0]);
        L.axisY(g, y, w, { label: 'Rosot nilai diiktiraf (RM juta)', fmt: (v) => fmt.n(v) });
        D.polisiRosotNilai.forEach((r, i) => {
          const on = i === pilihP - 1;
          const rect = s('rect', { x: x(i), y: y(r.kesan), width: x.bandwidth, height: Math.max(2, h - y(r.kesan)), rx: 3,
            fill: on ? 'var(--neg)' : 'color-mix(in srgb,var(--neg) 26%,transparent)', class: 'bar', style: 'cursor:pointer' });
          rect.addEventListener('click', () => { pilihP = i + 1; lukisP(); });
          rect.addEventListener('mouseenter', (e) => L.showTip(e, `<b>Polisi ${i + 1}</b>
            <div class="kv"><span>Takrif "ketara"</span><span>${r.ketara}</span></div>
            <div class="kv"><span>Ujian tempoh</span><span>${r.tempoh}</span></div>
            <div class="kv"><span>Rosot nilai</span><span>${fmt.juta(r.kesan)}</span></div>`));
          rect.addEventListener('mousemove', L.moveTip); rect.addEventListener('mouseleave', L.hideTip);
          g.appendChild(rect);
          g.appendChild(s('text', { x: x(i) + x.bandwidth / 2, y: y(r.kesan) - 7, class: 'val',
            fill: on ? 'var(--neg)' : 'var(--ink3)', 'text-anchor': 'middle', text: fmt.n(r.kesan) }));
          g.appendChild(s('text', { x: x(i) + x.bandwidth / 2, y: h + 18, class: 'axis', 'text-anchor': 'middle', text: `Polisi ${i + 1}` }));
        });
      });

      wrapP.appendChild(el('div', { class: 'grid g3', style: 'margin-top:12px' },
        el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('f'),
          el('span', { class: 'v', style: 'color:var(--neg)' }, fmt.juta(p.kesan)),
          el('span', { class: 'l' }, `Rosot nilai yang perlu diiktiraf di bawah polisi ${pilihP}`)),
        el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('t'),
          el('span', { class: 'v', style: 'color:var(--pri)' }, fmt.juta(asal - p.kesan)),
          el('span', { class: 'l' }, 'Kerugian yang "hilang" daripada akaun berbanding polisi asal')),
        el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('t'),
          el('span', { class: 'v' }, fmt.n((1 - p.kesan / asal) * 100, 1) + '%'),
          el('span', { class: 'l' }, 'Pengurangan rosot nilai berbanding polisi asal'))));
    }
    lukisP();

    return pane(
      head('RAV, rosot nilai dan penyata semula', 'Cara akaun dibentuk',
        `Modul sebelum ini menunjukkan wang tidak cukup. Modul ini menunjukkan <i>bagaimana</i> akaun tetap kelihatan cukup.
         Tiga keputusan perakaunan — cara aset dinilai, cara kejatuhan nilai diiktiraf, dan cara wang pendeposit dikelaskan —
         mengubah gambaran sepenuhnya.`),

      C.card('Keputusan 1: menggunakan nilai aset yang berbeza (RAV)',
        `Penyata kewangan beraudit menunjukkan aset RM70,317 juta. Pengurusan menambah anggaran "nilai jika dijual" bagi anak
         syarikat, syarikat bersekutu, usaha sama dan hartanah — dipanggil ${''}<b>RAV</b> — sebanyak RM4,466 juta. Hasilnya,
         kedudukan kekurangan bertukar menjadi baki positif RM373 juta.`,
        wRAV,
        C.baca({
          tunjuk: 'Bagaimana nilai aset 2017 dinaikkan langkah demi langkah sehingga menjadi baki positif untuk diagihkan.',
          penting: 'Beza antara "lulus" dan "gagal" ujian undang-undang bagi tahun 2017 ialah satu keputusan penilaian bernilai RM4,466 juta yang tidak wujud dalam penyata kewangan beraudit.',
          simpul: 'Baki RM373 juta yang "membenarkan" agihan sepenuhnya bergantung kepada tambahan RAV. Tanpanya, angka itu ialah kekurangan RM769 juta. Suruhanjaya menyimpulkan RAV tidak boleh dijadikan asas pembayaran agihan.',
          jangan: 'Ini <b>tidak</b> bermakna aset itu tiada nilai. RAV ialah anggaran nilai jika aset dijual — ia mungkin munasabah sebagai maklumat pengurusan. Isunya ialah menggunakannya sebagai asas ujian undang-undang, bukan kewujudan nilai itu sendiri.',
        }),
        C.note('w', `<b>Perhatikan angka liabiliti.</b> Jadual RAV (ms 119) menyatakan liabiliti RM74,410 juta, sedangkan analisa
          neraca PwC (ms 146) menyatakan RM71,086 juta bagi tahun yang sama. Bezanya RM3,324 juta — tepat sama dengan jumlah
          agihan keuntungan 2017. Ini menunjukkan satu jadual mengambil kira agihan yang diisytiharkan sebagai liabiliti dan satu
          lagi tidak. <b>Tafsiran ini adalah oleh dashboard;</b> laporan sendiri tidak menjelaskannya.`),
        C.srcbar(C.src(119, 'Jadual RAV: ms 119'), C.src(146, 'Neraca PwC: ms 146'), C.src(20, 'Pandangan Suruhanjaya: ms 20'))),

      C.card('Keputusan 2: melonggarkan takrif "kejatuhan nilai yang ketara"',
        `Pelaburan yang jatuh nilai perlu diiktiraf sebagai kerugian. Berapa banyak diiktiraf bergantung kepada takrif "ketara"
         dan "berpanjangan". Polisi ini diubah <b>dua kali dalam tahun 2017 yang sama</b>. Klik setiap polisi untuk melihat kesannya.`,
        wrapP,
        C.baca({
          tunjuk: 'Jumlah kerugian yang perlu diiktiraf di bawah tiga takrif berbeza yang digunakan dalam tahun 2017.',
          penting: 'Polisi pertama memerlukan pelaburan jatuh lebih 70% <i>dan</i> kekal begitu lebih 24 bulan. Polisi terakhir hanya mengambil kira kejatuhan melebihi 90%, tanpa ujian tempoh langsung. Kesannya: rosot nilai jatuh daripada RM1,313 juta kepada RM1 juta — pengurangan 99.9%.',
          simpul: 'Perubahan takrif — bukan perubahan nilai pelaburan sebenar — menghapuskan hampir RM1.3 bilion kerugian daripada akaun 2017. Suruhanjaya menyatakan polisi diubah bagi memastikan LTH merekod keuntungan yang mencukupi untuk membuat agihan.',
          jangan: 'Jadual ini <b>tidak</b> menunjukkan bahawa pelaburan itu benar-benar rugi RM1,313 juta secara muktamad. Ia menunjukkan berapa banyak kerugian perlu <i>dicatat dalam akaun tahun itu</i> di bawah setiap takrif. Nilai pelaburan boleh pulih atau merosot selepas itu.',
        }),
        C.srcbar(C.src(148, 'Jadual polisi: ms 148'), C.src(18, 'Teguran Ketua Audit Negara: ms 18'))),

      C.card('Kesan gabungan: keuntungan RM3.4 bilion menjadi kerugian RM1.4 bilion',
        'Analisa PwC melaraskan keuntungan 2017 yang dilaporkan dengan rosot nilai dan pelarasan nilai saksama yang sepatutnya diambil kira di bawah piawaian perakaunan.',
        wUntung,
        el('h4', { style: 'margin:22px 0 6px; font-size:14.5px' }, 'Kesan ke atas perolehan terkumpul'),
        el('p', { class: 'sub' }, 'Bukan sahaja tahun 2017 bertukar rugi — keseluruhan simpanan keuntungan terkumpul turut terhakis.'),
        wTertahan,
        C.baca({
          tunjuk: 'Keuntungan 2017 seperti direkod, ditolak setiap pelarasan yang dikenal pasti PwC, sehingga menjadi kerugian.',
          penting: 'Beza antara angka yang dilaporkan dan angka terlaras ialah RM4,845 juta. Ini bukan perbezaan pendapat kecil — ia perbezaan antara institusi yang untung dan institusi yang rugi.',
          simpul: 'Jika piawaian MFRS dipatuhi sepenuhnya, LTH sepatutnya merekod kerugian bersih RM1,433 juta bagi 2017 dan kerugian terkumpul RM4,683 juta, bukan perolehan tertahan positif RM162 juta.',
          jangan: 'Angka ini ialah <b>anggaran semakan</b> oleh PwC, bukan penyata kewangan yang telah diaudit semula dan diluluskan. Laporan menyebut Suruhanjaya mendapati beberapa perkara yang dilaporkan PwC adalah benar — bukan bahawa setiap angka telah disahkan secara muktamad.',
        }),
        C.srcbar(C.src(154, 'Analisa PwC: ms 154'), C.src(19, 'Ringkasan: ms 19'), C.src(149, 'Kesimpulan: ms 149'))),

      C.card('Keputusan 3: wang pendeposit dikelaskan sebagai ekuiti, bukan hutang',
        null,
        el('p', { style: 'margin:0 0 12px; color:var(--ink2)' , html:
          `Suruhanjaya mendapati Kumpulan Wang Pendeposit dikelaskan sebagai <b>ekuiti</b> dalam penyata kewangan sejak 2010,
           sedangkan wang pendeposit ialah <b>liabiliti</b> — ia wang orang lain yang perlu dipulangkan.` }),
        el('div', { class: 'grid g2' },
          el('div', { class: 'kpi', style: 'cursor:default;border-color:var(--neg)' },
            el('span', { class: 'l', style: 'font-weight:600;color:var(--ink)' }, 'Jika dikira sebagai ekuiti'),
            el('span', { class: 'l', style: 'margin-top:7px' }, 'Wang pendeposit menjadi sebahagian "milik" institusi. Nilai aset bersih kelihatan jauh lebih besar, dan ujian seksyen 22 lebih mudah dilepasi.')),
          el('div', { class: 'kpi', style: 'cursor:default;border-color:var(--pos)' },
            el('span', { class: 'l', style: 'font-weight:600;color:var(--ink)' }, 'Jika dikira sebagai liabiliti'),
            el('span', { class: 'l', style: 'margin-top:7px' }, 'Wang pendeposit ialah hutang yang perlu dibayar balik. Ini gambaran sebenar — dan ia yang menghasilkan jurang defisit yang dilihat dalam modul sebelum ini.'))),
        C.note('', `Suruhanjaya menyimpulkan pengelasan silap ini membolehkan agihan keuntungan diisytiharkan seolah-olah ia sah.
          Bersama RAV dan perubahan polisi rosot nilai, ketiga-tiga keputusan ini bekerja ke arah hasil yang sama:
          menjadikan neraca kelihatan cukup kuat untuk membenarkan bayaran.`),
        C.srcbar(C.src(132, 'Laporan ms 132'))));
  };

  /* ================= URUSHARTA JAMAAH ================= */
  V.ujsb = () => {
    const wKelas = box(), wHarta = box(), wSaham = box(), wJamin = box(), wSukuk = box();

    /* --- 1. Perbandingan mengikut kelas aset --- */
    const kelasPendek = { 'Hartanah dan tanah': 'Hartanah & tanah', 'Syarikat perladangan': 'Perladangan', 'Ekuiti (tersenarai di Bursa Malaysia)': 'Ekuiti tersenarai' };
    L.chart(wKelas, { h: (w) => (w < 620 ? 320 : 310), m: { t: 22, r: 14, b: 46, l: 64 } }, (g, w, h) => {
      const kelas = D.pindahanAset.map((k) => k.kelas);
      const x = L.band(kelas, [0, w], 0.3);
      const y = L.linear([0, 18500], [h, 0]);
      L.axisY(g, y, w, { label: 'RM juta', fmt: (v) => fmt.n(v / 1000, 0) + 'b' });
      const seri = [
        { k: 'nilaiBuku', label: 'Nilai buku LTH', warna: 'var(--ink3)' },
        { k: 'nilaiPindahan', label: 'Nilai pemindahan', warna: 'var(--terbit)' },
        { k: 'nilaiPasaran', label: 'Nilai pasaran ketika itu', warna: 'var(--fakta)' },
      ];
      const bw = x.bandwidth / 3 - 2;
      D.pindahanAset.forEach((a) => {
        seri.forEach((sr, i) => {
          const v = a[sr.k];
          const r = s('rect', { x: x(a.kelas) + i * (bw + 3), y: y(v), width: bw, height: Math.max(1, h - y(v)), rx: 2, fill: sr.warna, class: 'bar' });
          r.addEventListener('mouseenter', (e) => L.showTip(e, `<b>${a.kelas}</b>
            <div class="kv"><span>${sr.label}</span><span>${fmt.juta(v)}</span></div>
            <div class="kv"><span>Premium atas pasaran</span><span>${fmt.juta(a.nilaiPindahan - a.nilaiPasaran)}</span></div>
            <div class="note">Laporan ms ${a.ms}</div>`));
          r.addEventListener('mousemove', L.moveTip); r.addEventListener('mouseleave', L.hideTip);
          g.appendChild(r);
        });
      });
      L.axisX(g, x, kelas, h, { label: (k) => kelasPendek[k] || k });
    });

    /* --- 2. Hartanah: harga seunit kaki persegi --- */
    L.chart(wHarta, { h: (w) => (w < 620 ? 320 : 300), m: { t: 22, r: 18, b: 44, l: 96 } }, (g, w, h) => {
      const jenis = T.hartanahKps.map((r) => r.jenis);
      const y = L.band(jenis, [0, h], 0.42);
      const maxv = Math.max(...T.hartanahKps.map((r) => r.kpsPindahan));
      const x = L.linear([0, maxv * 1.12], [0, w]);
      // paksi X
      L.ticks(0, maxv * 1.12, 5).forEach((t) => {
        g.appendChild(s('line', { x1: x(t), x2: x(t), y1: 0, y2: h, class: 'grid' }));
        g.appendChild(s('text', { x: x(t), y: h + 18, class: 'axis', 'text-anchor': 'middle', text: 'RM' + fmt.n(t) }));
      });
      g.appendChild(s('text', { x: 0, y: -6, class: 'axis-label', text: 'Harga seunit kaki persegi' }));
      T.hartanahKps.forEach((r) => {
        const cy = y(r.jenis) + y.bandwidth / 2;
        g.appendChild(s('line', { x1: x(r.kpsPasaran), x2: x(r.kpsPindahan), y1: cy, y2: cy, stroke: 'var(--neg)', 'stroke-width': 3, opacity: .45 }));
        const mk = (v, warna, nama) => {
          const c = s('circle', { cx: x(v), cy, r: 7, fill: warna, stroke: 'var(--bg)', 'stroke-width': 2 });
          c.addEventListener('mouseenter', (e) => L.showTip(e, `<b>${r.jenis}</b>
            <div class="kv"><span>${nama}</span><span>RM${fmt.n(v)}/kps</span></div>
            <div class="kv"><span>Keluasan</span><span>${fmt.n(r.kps)} kps</span></div>
            <div class="kv"><span>Nilai pemindahan</span><span>${fmt.rm(r.pindahan)}</span></div>
            <div class="kv"><span>Nilai pasaran Dis 2021</span><span>${fmt.rm(r.pasaran)}</span></div>
            <div class="kv"><span>Kejatuhan</span><span style="color:var(--neg)">${fmt.n(r.jatuhPct, 1)}%</span></div>
            <div class="note">Harga seunit kaki persegi dikira oleh dashboard: nilai ÷ keluasan. Laporan ms ${r.ms}</div>`));
          c.addEventListener('mousemove', L.moveTip); c.addEventListener('mouseleave', L.hideTip);
          g.appendChild(c);
        };
        mk(r.kpsPindahan, 'var(--terbit)', 'Harga pemindahan');
        mk(r.kpsPasaran, 'var(--fakta)', 'Harga pasaran Dis 2021');
        g.appendChild(s('text', { x: -10, y: cy + 4, class: 'axis', 'text-anchor': 'end', text: r.jenis }));
      });
    });

    /* --- 3. Saham mewah: tiga titik masa --- */
    let paparSaham = 'harga';
    const wrapSaham = box();
    function lukisSaham() {
      wrapSaham.innerHTML = '';
      wrapSaham.appendChild(C.seg([
        { id: 'harga', label: 'Harga seunit (RM)' },
        { id: 'nilai', label: 'Nilai portfolio (RM juta)' },
      ], paparSaham, (v) => { paparSaham = v; lukisSaham(); }));
      const host = el('div', { style: 'margin-top:12px' }); wrapSaham.appendChild(host);

      L.chart(host, { h: (w) => (w < 620 ? 330 : 350), m: { t: 24, r: 96, b: 44, l: 58 } }, (g, w, h) => {
        const titik = [
          { id: 0, label: '27 Dis 2018', sub: 'nilai pemindahan' },
          { id: 1, label: '31 Dis 2018', sub: 'nilai pasaran' },
          { id: 2, label: '8 Jun 2022', sub: 'harga semasa laporan' },
        ];
        const x = L.linear([0, 2], [0, w]);
        const nilai = (b, i) => paparSaham === 'harga'
          ? [b.hargaPindahan, b.hargaDis18, b.hargaJun22][i]
          : [b.jumlahPindahan, b.jumlahDis18, b.jumlahJun22][i] / 1e6;
        const semua = T.bluechip.flatMap((b) => [0, 1, 2].map((i) => nilai(b, i)));
        const y = L.linear([0, Math.max(...semua) * 1.1], [h, 0]);
        L.axisY(g, y, w, { label: paparSaham === 'harga' ? 'RM seunit' : 'RM juta', fmt: (v) => (paparSaham === 'harga' ? fmt.n(v, 2) : fmt.n(v)) });
        titik.forEach((t) => {
          g.appendChild(s('line', { x1: x(t.id), x2: x(t.id), y1: 0, y2: h, class: 'grid' }));
          g.appendChild(s('text', { x: x(t.id), y: h + 18, class: 'axis', 'text-anchor': t.id === 0 ? 'start' : t.id === 2 ? 'end' : 'middle', text: t.label }));
          g.appendChild(s('text', { x: x(t.id), y: h + 32, class: 'axis', 'text-anchor': t.id === 0 ? 'start' : t.id === 2 ? 'end' : 'middle',
            style: 'font-size:10px', text: t.sub }));
        });
        const warna = ['#60a5fa', '#2dd4bf', '#c084fc', '#fbbf24', '#f87171'];
        T.bluechip.forEach((b, bi) => {
          const pts = [0, 1, 2].map((i) => ({ x: x(i), y: y(nilai(b, i)) }));
          const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join(' ');
          const path = s('path', { d, fill: 'none', stroke: warna[bi], 'stroke-width': 2.4, 'stroke-linejoin': 'round', style: 'cursor:pointer' });
          const info = (e) => L.showTip(e, `<b>${b.kaunter}</b>
            <div class="kv"><span>Harga pemindahan</span><span>RM${fmt.n(b.hargaPindahan, 2)}</span></div>
            <div class="kv"><span>31 Dis 2018</span><span>RM${fmt.n(b.hargaDis18, 2)} (${fmt.n(b.jatuhPct, 1)}%)</span></div>
            <div class="kv"><span>8 Jun 2022</span><span>RM${fmt.n(b.hargaJun22, 2)} (${fmt.n(b.jatuhJun22Pct, 1)}%)</span></div>
            <div class="kv"><span>Nilai pemindahan</span><span>${fmt.rm(b.jumlahPindahan)}</span></div>
            <div class="note">Unit tersirat ${fmt.n(b.unit)} saham dikira oleh dashboard: nilai pemindahan ÷ harga pemindahan. Laporan ms ${b.ms}</div>`);
          path.addEventListener('mouseenter', info); path.addEventListener('mousemove', L.moveTip); path.addEventListener('mouseleave', L.hideTip);
          g.appendChild(path);
          pts.forEach((p) => g.appendChild(s('circle', { cx: p.x, cy: p.y, r: 4, fill: warna[bi] })));
          g.appendChild(s('text', { x: w + 8, y: pts[2].y + 4, class: 'val', fill: warna[bi], text: b.kaunter }));
        });
      });
      wrapSaham.appendChild(el('div', { class: 'mini' },
        paparSaham === 'nilai'
          ? 'Nilai pada 8 Jun 2022 dikira oleh dashboard: unit tersirat × harga hari itu. Unit tersirat = nilai pemindahan ÷ harga pemindahan.'
          : 'Harga pemindahan dan harga pasaran seperti dicetak dalam laporan.'));
    }
    lukisSaham();

    /* --- 4. Komitmen jaminan Kerajaan --- */
    L.chart(wJamin, { h: (w) => Math.max(300, D.jaminanKerajaan.length * 26 + 40), m: { t: 20, r: 70, b: 34, l: 168 } }, (g, w, h) => {
      const data = D.jaminanKerajaan.slice().sort((a, b) => b.y2021 - a.y2021);
      const y = L.band(data.map((d) => d.entiti), [0, h], 0.24);
      const x = L.linear([0, Math.max(...data.map((d) => d.y2021)) * 1.06], [0, w]);
      L.ticks(0, Math.max(...data.map((d) => d.y2021)), 4).forEach((t) => {
        g.appendChild(s('line', { x1: x(t), x2: x(t), y1: 0, y2: h, class: 'grid' }));
        g.appendChild(s('text', { x: x(t), y: h + 18, class: 'axis', 'text-anchor': 'middle', text: fmt.n(t / 1000) + 'b' }));
      });
      data.forEach((d) => {
        const yy = y(d.entiti);
        const r = s('rect', { x: 0, y: yy, width: Math.max(1, x(d.y2021)), height: y.bandwidth, rx: 2,
          fill: d.sorot ? 'var(--neg)' : 'color-mix(in srgb,var(--fakta) 45%,transparent)', class: 'bar' });
        r.addEventListener('mouseenter', (e) => L.showTip(e, `<b>${d.entiti}</b>
          <div class="kv"><span>2020</span><span>${fmt.juta(d.y2020)} (${fmt.n(d.pct2020, 1)}%)</span></div>
          <div class="kv"><span>2021</span><span>${fmt.juta(d.y2021)} (${fmt.n(d.pct2021, 1)}%)</span></div>`));
        r.addEventListener('mousemove', L.moveTip); r.addEventListener('mouseleave', L.hideTip);
        g.appendChild(r);
        g.appendChild(s('text', { x: -8, y: yy + y.bandwidth / 2 + 4, class: 'axis', 'text-anchor': 'end',
          fill: d.sorot ? 'var(--neg)' : null, text: d.entiti.length > 26 ? d.entiti.slice(0, 24) + '…' : d.entiti }));
        g.appendChild(s('text', { x: x(d.y2021) + 7, y: yy + y.bandwidth / 2 + 4, class: 'val',
          fill: d.sorot ? 'var(--neg)' : 'var(--ink3)', text: fmt.n(d.pct2021, 1) + '%' }));
      });
    });

    /* --- 5. Simulator penebusan Sukuk --- */
    let peruntukan = 1.73;
    const wrapSk = box();
    function lukisSk() {
      wrapSk.innerHTML = '';
      const nominal = D.sukuk.reduce((a, b) => a + b.nominal, 0) / 1000; // RM bilion
      const tahun = Math.ceil(nominal / peruntukan);
      wrapSk.appendChild(el('div', { style: 'max-width:460px' },
        el('label', { class: 'fld', id: 'lblSk' }, 'Peruntukan Kerajaan setahun: ', el('b', null, `RM${fmt.n(peruntukan, 2)} bilion`)),
        el('input', { type: 'range', min: '0.5', max: '5', step: '0.05', value: peruntukan,
          oninput: (e) => { peruntukan = +e.target.value; lukisSk(); } })));
      wrapSk.appendChild(el('div', { class: 'grid g3', style: 'margin-top:14px' },
        el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('f'),
          el('span', { class: 'v' }, `RM${fmt.n(nominal, 1)}b`), el('span', { class: 'l' }, 'Jumlah nilai nominal Sukuk yang perlu dilunaskan')),
        el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('s'),
          el('span', { class: 'v', style: 'color:var(--warn)' }, `${tahun} tahun`),
          el('span', { class: 'l' }, 'Tempoh diperlukan pada kadar peruntukan yang anda pilih')),
        el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('f'),
          el('span', { class: 'v' }, '7 & 10 tahun'), el('span', { class: 'l' }, 'Tempoh matang sebenar Sukuk Siri 1 dan Siri 2'))));
      wrapSk.appendChild(C.note(peruntukan < 2.5 ? 'w' : '',
        `Pada kadar RM${fmt.n(peruntukan, 2)} bilion setahun, peruntukan Kerajaan mengambil masa <b>${tahun} tahun</b> untuk
         menyamai nilai nominal Sukuk. Sukuk Siri 1 matang selepas 7 tahun dan Siri 2 selepas 10 tahun.
         ${tahun > 10 ? 'Ini bermakna peruntukan pada kadar ini <b>tidak mencukupi</b> untuk menepati tarikh matang.'
           : 'Pada kadar ini peruntukan mencukupi dalam tempoh matang.'}`));
    }
    lukisSk();

    /* --- ROFR --- */
    const kolROFR = [
      { key: 'syarikat', label: 'Syarikat' },
      { key: 'tarikh', label: 'Tarikh', sel: (r) => fmt.tarikh(r.tarikh) },
      { key: 'unit', label: 'Unit saham', num: true, sel: (r) => fmt.n(r.unit) },
      { key: 'hargaROFR', label: 'Harga tawaran', num: true, sel: (r) => fmt.n(r.hargaROFR, 3) },
      { key: 'hargaPasaran', label: 'Harga pasaran', num: true, sel: (r) => fmt.n(r.hargaPasaran, 3) },
      { key: 'premium', label: 'Premium', num: true, sel: (r) => fmt.n(r.premium, 1) + '%', warna: (r) => (r.premium > 0 ? 'neg' : 'pos') },
      { key: 'lebihan', label: 'Kos lebihan jika dibeli', num: true, sel: (r) => fmt.rm(r.lebihan), warna: (r) => (r.lebihan > 0 ? 'neg' : 'pos'),
        nota: 'Dikira: unit × (harga tawaran − harga pasaran)' },
    ];

    return pane(
      head('Pemindahan aset', 'Urusharta Jamaah Sdn. Bhd. (UJSB)',
        `Pada penghujung 2018, aset bermasalah Tabung Haji dipindahkan kepada sebuah syarikat khas milik Kerajaan.
         Ini menutup jurang defisit dalam akaun LTH — tetapi memindahkan masalah itu, bukan menghapuskannya.`),

      C.card('Berapa aset itu benar-benar bernilai',
        'Aset dipindahkan pada RM19.9 bilion. Nilai pasarannya ketika itu RM9.7 bilion. Perbezaan RM10.2 bilion inilah yang menutup jurang defisit LTH.',
        wKelas,
        L.legend([{ label: 'Nilai buku LTH', warna: 'var(--ink3)' }, { label: 'Nilai pemindahan', warna: 'var(--terbit)' }, { label: 'Nilai pasaran ketika itu', warna: 'var(--fakta)' }]),
        el('div', { class: 'grid g3', style: 'margin-top:16px' },
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('f'), el('span', { class: 'v' }, fmt.juta(D.pindahanJumlah.nilaiPindahan)), el('span', { class: 'l' }, 'Nilai pemindahan')),
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('f'), el('span', { class: 'v' }, fmt.juta(D.pindahanJumlah.nilaiPasaran)), el('span', { class: 'l' }, 'Nilai pasaran ketika itu')),
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('t'),
            el('span', { class: 'v', style: 'color:var(--neg)' }, fmt.juta(D.pindahanJumlah.nilaiPindahan - D.pindahanJumlah.nilaiPasaran)),
            el('span', { class: 'l' }, 'Premium melebihi nilai pasaran'))),
        C.baca({
          tunjuk: 'Tiga penilaian berbeza bagi aset yang sama, mengikut kelas aset.',
          penting: 'Perhatikan hartanah dan tanah: nilai pemindahan RM2,247 juta melebihi <i>kedua-dua</i> nilai buku dan nilai pasaran yang sama-sama RM1,411 juta — premium 59%. Ekuiti pula dipindahkan hampir pada nilai buku (RM16,851 juta) sedangkan nilai pasarannya hanya RM7,600 juta.',
          simpul: 'Premium RM10.2 bilion bukan tersebar sama rata. Ia datang terutamanya daripada ekuiti tersenarai, iaitu aset yang harga pasarannya paling mudah disemak.',
          jangan: 'Premium ini bukan bermakna wang RM10.2 bilion hilang serta-merta. Ia bermakna UJSB perlu memulihkan nilai itu, atau Kerajaan perlu menanggung bezanya. Kesudahan sebenar bergantung kepada harga jualan aset pada masa hadapan.',
        }),
        C.srcbar(C.src(159, 'Jadual kelas aset: ms 159'), C.src(25, 'Ringkasan Eksekutif: ms 25'))),

      C.card('Portfolio hartanah: harga seunit kaki persegi',
        `Laporan memberi keluasan dan nilai bagi setiap jenis hartanah. Membahagikan nilai dengan keluasan mendedahkan berapa
         yang dibayar bagi setiap kaki persegi — cara paling telus untuk membandingkan hartanah yang berbeza saiz.`,
        wHarta,
        L.legend([{ label: 'Harga pemindahan seunit kps', warna: 'var(--terbit)' }, { label: 'Harga pasaran Dis 2021 seunit kps', warna: 'var(--fakta)' }]),
        C.baca({
          tunjuk: 'Harga seunit kaki persegi pada nilai pemindahan berbanding nilai pasaran Disember 2021. Panjang garis merah menunjukkan saiz jurang.',
          penting: 'Hotel dan menara pejabat dipindahkan pada lebih RM2,000 sekaki persegi, dua kali ganda harga pasaran tiga tahun kemudian. Keseluruhan portfolio jatuh 46% — daripada RM2.25 bilion kepada RM1.20 bilion.',
          simpul: 'Jurang penilaian paling besar pada hartanah komersial bernilai tinggi, bukan tanah kosong. Setiap jenis hartanah tanpa kecuali bernilai kurang pada 2021 berbanding nilai pemindahannya.',
          jangan: 'Harga seunit kaki persegi <b>dikira oleh dashboard</b>, bukan diterbitkan dalam laporan. Ia juga tidak mengambil kira lokasi, umur bangunan atau kadar sewa — jadi ia berguna untuk perbandingan kasar, bukan penilaian hartanah.',
        }),
        C.srcbar(C.src(161, 'Laporan ms 161'),
          C.csv('rci-th-hartanah-ujsb.csv', ['Jenis', 'Keluasan kps', 'Nilai pemindahan RM', 'Nilai pasaran Dis 2021 RM', 'RM/kps pemindahan', 'RM/kps pasaran', 'Kejatuhan %'],
            T.hartanahKps.map((r) => [r.jenis, r.kps, r.pindahan, r.pasaran, r.kpsPindahan.toFixed(2), r.kpsPasaran.toFixed(2), r.jatuhPct.toFixed(1)])))),

      C.card('Lima saham mewah: tiga tarikh, satu arah',
        `Antara aset yang dipindahkan ialah lima saham mewah. Laporan memberi harganya pada tiga tarikh berbeza,
         membolehkan kita mengikuti perjalanan setiap kaunter.`,
        wrapSaham,
        el('div', { class: 'grid g3', style: 'margin-top:16px' },
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('f'), el('span', { class: 'v' }, fmt.rm(D.bluechipJumlah.jumlahPindahan)), el('span', { class: 'l' }, 'Nilai pemindahan, 27 Disember 2018')),
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('f'),
            el('span', { class: 'v', style: 'color:var(--neg)' }, fmt.rm(D.bluechipJumlah.jatuhRM)),
            el('span', { class: 'l' }, 'Kejatuhan nilai menjelang 31 Disember 2018 — dalam masa beberapa hari')),
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('t'),
            el('span', { class: 'v', style: 'color:var(--neg)' }, fmt.rm(T.bluechipJun22 - D.bluechipJumlah.jumlahPindahan)),
            el('span', { class: 'l' }, 'Kejatuhan menjelang 8 Jun 2022, jika unit yang sama masih dipegang'))),
        C.baca({
          tunjuk: 'Harga setiap saham pada tarikh pemindahan, empat hari kemudian, dan tiga setengah tahun kemudian.',
          penting: 'Perjanjian pemindahan ditandatangani 27 Disember 2018. Menjelang 31 Disember 2018 — empat hari kemudian — nilai lima saham ini sudah jatuh RM946 juta. Ini bukan kejatuhan pasaran secara beransur-ansur; ia menunjukkan harga pemindahan sudah jauh melebihi harga pasaran sejak hari pertama.',
          simpul: 'Empat daripada lima kaunter masih jauh di bawah harga pemindahan pada Jun 2022. TM pulih daripada kejatuhan 60.9% kepada 12.8% di bawah harga pemindahan; Axiata dan Maxis kekal hampir separuh nilai.',
          jangan: 'Ini <b>bukan</b> ukuran prestasi pelaburan. Ia tidak mengambil kira dividen yang diterima, dan laporan tidak menyatakan sama ada UJSB masih memegang saham yang sama pada Jun 2022. Angka nilai portfolio Jun 2022 mengandaikan unit tidak berubah — andaian dashboard, bukan fakta laporan.',
        }),
        C.srcbar(C.src(162, 'Laporan ms 162'))),

      C.card('Bayaran untuk aset itu: Sukuk berkupon sifar',
        `LTH tidak menerima tunai. Ia menerima Sukuk — janji bertulis untuk dibayar bertahun-tahun kemudian — dan hanya
         RM300 juta tunai. Sukuk ini <b>berkupon sifar</b>: tiada bayaran tahunan langsung sehingga tarikh matang.`,
        el('div', { class: 'tblwrap' }, el('table', null,
          el('thead', null, el('tr', null, ['Instrumen', 'Nilai langganan', 'Nilai nominal (dibayar ketika matang)', 'Tempoh', 'Pulangan ketika matang'].map((t, i) =>
            el('th', { class: i > 0 && i < 3 ? 'num' : '' }, t)))),
          el('tbody', null, [
            ...D.sukuk.map((sk) => el('tr', null,
              el('td', null, sk.siri), el('td', { class: 'num' }, fmt.juta(sk.prinsipal)),
              el('td', { class: 'num' }, fmt.juta(sk.nominal)), el('td', null, sk.tempohTahun + ' tahun'),
              el('td', null, fmt.n(sk.ytm, 2) + '% setahun'))),
            el('tr', null, el('td', null, 'Bayaran tunai'), el('td', { class: 'num' }, fmt.juta(300)),
              el('td', { class: 'num' }, '—'), el('td', null, 'RM100 juta pada 30 Dis 2019, RM200 juta pada 30 Dis 2020'), el('td', null, '—')),
            el('tr', { class: 'tot' }, el('td', null, 'Jumlah'), el('td', { class: 'num' }, fmt.juta(19900)),
              el('td', { class: 'num' }, fmt.juta(27500)), el('td', null, ''), el('td', null, '')),
          ]))),
        C.note('', `<b>Semakan silang yang menenangkan.</b> Jumlah balasan (RM10 bilion + RM9.6 bilion + RM300 juta) menyamai
          tepat nilai pemindahan aset RM19.9 bilion. Dua angka daripada bahagian laporan yang berbeza padan sempurna.`),
        el('h4', { style: 'margin:20px 0 5px; font-size:14.5px' }, 'Simulasi: berapa lama untuk melunaskannya?'),
        el('p', { class: 'sub' }, 'Jemaah Menteri bersetuju memperuntukkan kira-kira RM1.73 bilion setahun. Laraskan slider untuk menguji kadar lain.'),
        wrapSk,
        C.baca({
          tunjuk: 'Struktur pembayaran yang diterima LTH sebagai ganti asetnya, dan berapa lama peruntukan Kerajaan mengambil masa untuk melunaskannya.',
          penting: 'Kerana Sukuk berkupon sifar, hasil yang direkod LTH setiap tahun ialah <i>pengakruan</i> — nilai yang bertambah di atas kertas, bukan wang masuk. Laporan menyatakan pengakruan ini menyumbang hampir 26% daripada pendapatan tahunan LTH dan melebihi satu pertiga daripada agihan tahunan kepada pendeposit.',
          simpul: 'Sebahagian besar "pendapatan" LTH selepas 2019 bergantung kepada janji bayaran masa depan daripada sebuah syarikat Kerajaan. Suruhanjaya menyifatkan kegagalan melunaskan obligasi UJSB sebagai risiko terbesar LTH.',
          jangan: 'Simulasi ini hanya membahagikan nilai nominal dengan peruntukan tahunan. Ia tidak mengambil kira hasil pelupusan aset UJSB, penebusan awal, atau penstrukturan semula Sukuk yang sedang dibincangkan ketika laporan disiapkan.',
        }),
        C.srcbar(C.src(25, 'Struktur Sukuk: ms 25'), C.src(26, 'Peruntukan Kerajaan: ms 26'))),

      C.card('Di manakah UJSB berdiri dalam risiko fiskal negara',
        'Sukuk UJSB disenaraikan dalam Komitmen Jaminan Kerajaan Persekutuan — senarai hutang yang perlu ditanggung Kerajaan sekiranya entiti berkenaan gagal membayar.',
        wJamin,
        C.baca({
          tunjuk: 'Semua entiti dalam senarai Komitmen Jaminan Kerajaan Persekutuan bagi 2021, disusun mengikut saiz. UJSB ditandakan merah.',
          penting: 'UJSB ialah komitmen jaminan keempat terbesar Kerajaan pada RM21.1 bilion, iaitu 11.1% daripada keseluruhan RM190.4 bilion — setara dengan projek infrastruktur besar negara.',
          simpul: 'Masalah kewangan Tabung Haji kini merupakan sebahagian daripada risiko fiskal negara, bukan lagi masalah sebuah badan berkanun sahaja.',
          jangan: 'Berada dalam senarai jaminan <b>tidak</b> bermakna Kerajaan sudah membelanjakan wang itu. Ia bermakna Kerajaan bertanggungjawab jika UJSB gagal membayar.',
        }),
        C.srcbar(C.src(168, 'Jadual 5.3, laporan ms 168'))),

      C.card('Hak Penolakan Pertama: tawaran membeli semula pada harga premium',
        `Perjanjian ROFR memberi LTH hak keutamaan membeli semula aset sebelum UJSB menjualnya kepada pihak lain.
         Laporan mendapati tawaran ini dibuat pada harga lebih tinggi daripada harga pasaran terbuka.`,
        C.tbl(kolROFR, T.rofr, { susun: 'lebihan' }),
        el('div', { class: 'grid g3', style: 'margin-top:14px' },
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('f'), el('span', { class: 'v' }, '9'), el('span', { class: 'l' }, 'Tawaran ROFR direkodkan dalam laporan')),
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('t'), el('span', { class: 'v' }, fmt.rm(T.rofrNilai)), el('span', { class: 'l' }, 'Jumlah nilai jika semua tawaran diterima')),
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('t'),
            el('span', { class: 'v', style: 'color:var(--neg)' }, fmt.rm(T.rofrLebihan)),
            el('span', { class: 'l' }, 'Kos lebihan berbanding membeli terus di pasaran terbuka'))),
        C.baca({
          tunjuk: 'Setiap tawaran ROFR yang direkodkan, harga tawaran berbanding harga pasaran pada hari yang sama, dan kos lebihannya.',
          penting: 'Tujuh daripada sembilan tawaran berharga lebih tinggi daripada pasaran. WZ Satu ditawarkan pada premium 40.6%. Jika LTH menerima kesemuanya, ia membayar kira-kira RM15 juta lebih daripada harga pasaran untuk saham yang sama.',
          simpul: 'Hak yang sepatutnya melindungi kepentingan LTH sebenarnya kurang berguna, kerana saham yang sama boleh dibeli lebih murah di pasaran terbuka. Suruhanjaya membuat pemerhatian yang sama.',
          jangan: 'Kos lebihan RM15 juta ialah <b>pengiraan dashboard</b> yang mengandaikan LTH menerima kesemua sembilan tawaran. Laporan tidak menyatakan berapa banyak tawaran yang benar-benar diterima. Ia juga mengabaikan sebarang nilai strategik daripada memiliki blok saham besar sekali gus.',
        }),
        C.srcbar(C.src(176, 'Laporan ms 176'),
          C.csv('rci-th-rofr.csv', ['Syarikat', 'Tarikh', 'Unit', 'Harga ROFR', 'Harga pasaran', 'Premium %', 'Kos lebihan RM'],
            T.rofr.map((r) => [r.syarikat, r.tarikh, r.unit, r.hargaROFR, r.hargaPasaran, r.premium, r.lebihan.toFixed(0)])))));
  };
})();
