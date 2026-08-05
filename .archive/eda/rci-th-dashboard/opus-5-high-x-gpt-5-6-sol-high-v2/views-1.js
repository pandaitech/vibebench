/* ===== PAPARAN 1: Ringkasan · Garis masa · Neraca · Hibah ===== */
(function () {
  'use strict';
  const { fmt, el, s } = L;
  const D = window.RCI, X = window.RCI_DETAIL, T = window.T, C = window.C;
  window.V = window.V || {};

  const head = (kicker, tajuk, teks) => el('div', { class: 'pane-h' },
    el('div', { class: 'kicker' }, kicker), el('h2', null, tajuk), el('p', { html: teks }));
  const pane = (...k) => el('div', { class: 'pane' }, k.flat().filter(Boolean));
  const box = () => el('div');
  const cw = (v) => (v < 0 ? 'var(--neg)' : 'var(--pos)');

  /* ================= 1. RINGKASAN ================= */
  V.ringkasan = () => {
    const kpi = (v, l, ke, pv) => el('button', { class: 'kpi', onclick: () => window.pergi(ke) },
      C.pv(pv || 'f'), el('span', { class: 'v' }, v), el('span', { class: 'l', html: l }),
      el('span', { class: 'go' }, 'Teroka →'));

    const angka = el('div', { class: 'grid g4' },
      kpi('RM4.09b', 'Kekurangan aset berbanding liabiliti pada 2017, selepas agihan keuntungan dibuat', 'neraca'),
      kpi('4 tahun', 'Berturut-turut agihan keuntungan dibayar walaupun neraca sudah defisit (2014–2017)', 'neraca'),
      kpi('RM3.4b → −RM1.4b', 'Keuntungan 2017 yang dilaporkan, berbanding kerugian sebenar jika piawaian perakaunan dipatuhi', 'perakaunan'),
      kpi('RM10.2b', 'Premium melebihi nilai pasaran ketika aset dipindahkan kepada UJSB', 'ujsb'),
      kpi('RM1,313j → RM1j', 'Rosot nilai yang perlu diiktiraf 2017, sebelum dan selepas polisi diubah dua kali', 'perakaunan'),
      kpi(fmt.juta(T.rugiJumlah), `Jumlah kerugian yang dinyatakan dalam Ringgit merentas ${T.rugiRM.length} pelaburan bermasalah`, 'pelaburan', 't'),
      kpi('56%', 'Bahagian kos haji yang ditanggung LTH menjelang 2019, naik daripada 38% pada 2014', 'hafis'),
      kpi('RM88b', 'Jaminan Kerajaan kepada pendeposit yang perlu diaktifkan jika LTH gagal', 'ujsb'));

    const cerita = C.card('Apa sebenarnya berlaku — dalam lima ayat',
      null,
      el('div', { html: `
        <p style="margin:0 0 10px">Tabung Haji membayar agihan keuntungan yang tinggi kepada pendeposit dari 2014 hingga 2017.
        Masalahnya, wang untuk membayarnya tidak cukup — nilai aset sudah kurang daripada nilai liabiliti.</p>
        <p style="margin:0 0 10px">Undang-undang (seksyen 22 Akta Tabung Haji 1995) hanya membenarkan agihan dibuat apabila aset
        melebihi liabiliti. Untuk menunjukkan aset mencukupi, pengurusan menggunakan kaedah penilaian aset yang berbeza daripada
        penyata kewangan beraudit, dan melonggarkan polisi mengiktiraf kejatuhan nilai pelaburan.</p>
        <p style="margin:0 0 10px">Menjelang 2018, jurang itu sudah terlalu besar untuk ditutup. Kerajaan menubuhkan sebuah syarikat
        khas, Urusharta Jamaah, yang mengambil alih aset bermasalah pada harga jauh melebihi nilai pasarannya, dibayar dengan
        Sukuk yang perlu dilunaskan bertahun-tahun kemudian.</p>
        <p style="margin:0 0 10px">Krisis Tabung Haji tidak hilang — ia bertukar bentuk menjadi obligasi yang kini tersenarai antara
        lima komitmen jaminan terbesar Kerajaan Persekutuan.</p>
        <p style="margin:0"><b>Suruhanjaya tidak mencadangkan Tabung Haji dipecahkan.</b> Ia berpendapat institusi itu perlu dikekalkan,
        tetapi cara ia ditadbir, diaudit dan melabur perlu diubah — dan mengemukakan 25 cadangan.</p>` }),
      C.srcbar(C.src(19, 'Ringkasan Eksekutif'), C.src(146, 'Analisa neraca'), C.src(229, 'Rumusan')));

    const caraGuna = C.card('Cara menggunakan dashboard ini', null,
      el('div', { class: 'grid g2' },
        el('div', null, el('p', { style: 'margin:0 0 9px', html: '<b>Setiap angka membawa labelnya sendiri.</b> Sebelum mempercayai mana-mana nombor, lihat labelnya:' }),
          el('div', { style: 'display:grid;gap:8px' },
            el('div', null, C.pv('f'), ' ', el('span', { class: 'sub', style: 'display:inline' }, 'disalin terus daripada laporan')),
            el('div', null, C.pv('t'), ' ', el('span', { class: 'sub', style: 'display:inline' }, 'dikira oleh dashboard, formula ditunjukkan')),
            el('div', null, C.pv('u'), ' ', el('span', { class: 'sub', style: 'display:inline' }, 'unjuran masa depan oleh laporan itu sendiri')),
            el('div', null, C.pv('s'), ' ', el('span', { class: 'sub', style: 'display:inline' }, 'hasil tetapan yang anda pilih — bukan kandungan laporan')))),
        el('div', null, el('p', { style: 'margin:0 0 9px', html: '<b>Setiap carta boleh dijejak.</b>' }),
          el('ul', { style: 'margin:0; padding-left:19px; color:var(--ink2); font-size:13.5px; line-height:1.75' },
            el('li', null, 'Butang bertanda "Laporan ms ___" membuka laporan asal pada muka surat berkenaan.'),
            el('li', null, 'Kotak "Apa ditunjuk / Jangan simpul" di bawah setiap carta menerangkan had tafsiran.'),
            el('li', null, 'Perkataan bergaris putus-putus boleh dihurungkan tetikus untuk penjelasan bahasa mudah.'),
            el('li', null, 'Jadual boleh disusun dengan klik pada tajuk lajur, dan dimuat turun sebagai CSV.')))));

    const amaran = C.note('w', `<b>Sebelum meneruskan.</b> Laporan ini menyiasat pengurusan dan operasi Lembaga Tabung Haji
      dari 2014 hingga 2020. Ia mengandungi penemuan, pandangan dan cadangan Suruhanjaya. Terdapat siasatan polis, SPRM dan
      kes mahkamah yang masih berjalan ketika laporan disiapkan — dashboard ini memaparkan status seperti dinyatakan dalam
      laporan pada Julai 2022, bukan status semasa. Penyebutan nama seseorang dalam laporan tidak bermakna orang itu bersalah.`);

    return pane(
      head('Gambaran besar', 'Ringkasan siasatan',
        'Lapan angka yang menerangkan keseluruhan krisis. Klik mana-mana untuk terus ke analisis penuh di sebaliknya.'),
      amaran, angka, cerita, caraGuna,
      C.card('Angka rujukan besar yang disebut laporan', 'Konteks skala institusi — berguna untuk menilai saiz setiap masalah di modul lain.',
        el('div', { class: 'grid g3' }, X.angkaBesar.map((a) =>
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('f'),
            el('span', { class: 'v' }, `${fmt.n(a.nilai, a.nilai % 1 ? 2 : 0)} ${a.unit.replace('RM ', 'RM').replace('juta orang', 'juta')}`),
            el('span', { class: 'l' }, a.label),
            a.nota ? el('span', { class: 'go', style: 'color:var(--warn); white-space:normal; line-height:1.4' }, '⚠ ' + a.nota) : null,
            el('div', { style: 'margin-top:9px' }, C.src(a.ms)))))));
  };

  /* ================= 2. GARIS MASA ================= */
  V.masa = () => {
    const tema = [...new Set(D.kronologi.map((k) => k.tema))];
    let pilih = new Set(tema);
    const senarai = box();

    function lukis() {
      senarai.innerHTML = '';
      const data = D.kronologi.filter((k) => pilih.has(k.tema));
      const tl = el('div', { class: 'tl' }, data.map((k) =>
        el('div', { class: 'ev' },
          el('div', { class: 'd' }, fmt.tarikh(k.tarikh), ' · ', el('span', { class: 'tag', style: 'margin-left:6px' }, k.tema)),
          el('div', { class: 't' }, k.label),
          el('div', { style: 'margin-top:6px' }, C.src(k.ms)))));
      senarai.appendChild(data.length ? tl : el('div', { class: 'empty' }, 'Tiada peristiwa untuk tapisan ini.'));
    }

    const tapis = el('div', { class: 'ctl' }, tema.map((t) => {
      const b = el('button', { class: 'chip on', onclick: () => {
        pilih.has(t) ? pilih.delete(t) : pilih.add(t);
        b.classList.toggle('on'); lukis();
      } }, t);
      return b;
    }));
    lukis();

    return pane(
      head('Kronologi', 'Garis masa penuh',
        'Susunan peristiwa dari penubuhan Tabung Haji hingga laporan Suruhanjaya diserahkan. Tapis mengikut tema untuk mengikuti satu jalan cerita sahaja — contohnya pilih "Perakaunan" dan "Audit" sahaja untuk melihat bagaimana isu akaun berkembang.'),
      C.card(null, null, tapis, senarai,
        C.baca({
          tunjuk: 'Setiap peristiwa penting yang bertarikh dalam laporan, disusun mengikut masa.',
          penting: 'Urutan masa mendedahkan perkara yang tidak kelihatan dalam angka: keputusan Jemaah Menteri meluluskan pelan pemulihan dibuat pada <b>7 Disember 2018</b>, syarikat UJSB ditubuhkan <b>tujuh hari kemudian</b>, dan perjanjian pemindahan aset ditandatangani <b>13 hari selepas itu</b> — kesemuanya sebelum tahun 2018 berakhir.',
          simpul: 'Pelan pemulihan dilaksanakan dalam tempoh yang sangat singkat pada penghujung tahun 2018.',
          jangan: 'Garis masa ini tidak lengkap — ia hanya memuatkan peristiwa yang bertarikh dalam bahagian laporan yang tersedia untuk umum. Ekshibit laporan diklasifikasikan sebagai rahsia.',
        })));
  };

  /* ================= 3. NERACA / SEKSYEN 22 ================= */
  V.neraca = () => {
    let mod = 'neraca';      // neraca | jurang | kumulatif
    let simOn = false, kaedah = 'undang', faktor = 100, berganda = true;

    const carta = box(), ringkas = box(), jadual = box();

    /* Model simulasi: kira semula agihan mengikut peraturan pilihan pengguna */
    function kiraSim() {
      let simpan = 0;
      return D.neraca.map((n) => {
        const asetSim = berganda ? n.aset + simpan : n.aset;
        const praSim = asetSim - n.liabiliti;
        let agihSim;
        if (kaedah === 'undang') agihSim = Math.max(0, Math.min(n.agihan, praSim));
        else agihSim = n.agihan * (faktor / 100);
        const pascaSim = praSim - agihSim;
        const jimat = n.agihan - agihSim;
        simpan += jimat;
        return { ...n, asetSim, praSim, agihSim, pascaSim, jimat, simpanKumulatif: simpan };
      });
    }

    function lukis() {
      const sim = kiraSim();
      const guna = simOn ? sim : D.neraca.map((n) => ({ ...n, praSim: n.lebihanPra, agihSim: n.agihan, pascaSim: n.lebihanPasca }));

      /* --- Carta --- */
      carta.innerHTML = '';
      const host = el('div');
      carta.appendChild(host);

      L.chart(host, { h: (w) => (w < 560 ? 300 : 380), m: { t: 26, r: 16, b: 46, l: 62 } }, (g, w, h) => {
        const thn = D.neraca.map((n) => n.tahun);
        const x = L.band(thn, [0, w], 0.28);

        if (mod === 'neraca') {
          const maxv = Math.max(...D.neraca.map((n) => Math.max(n.aset, n.liabiliti)));
          const y = L.linear([0, maxv * 1.08], [h, 0]);
          L.axisY(g, y, w, { label: 'RM juta', fmt: (v) => fmt.n(v / 1000, 0) + 'b' });
          thn.forEach((t) => {
            const n = D.neraca.find((r) => r.tahun === t);
            const bw = x.bandwidth / 2 - 2;
            const mk = (v, off, warna, nama) => {
              const r = s('rect', { x: x(t) + off, y: y(v), width: bw, height: h - y(v), rx: 3, fill: warna, class: 'bar' });
              r.addEventListener('mouseenter', (e) => L.showTip(e, `<b>${t}</b><div class="kv"><span>${nama}</span><span>${fmt.juta(v)}</span></div>`));
              r.addEventListener('mousemove', L.moveTip); r.addEventListener('mouseleave', L.hideTip);
              g.appendChild(r);
            };
            mk(n.aset, 0, 'var(--fakta)', 'Jumlah aset');
            mk(n.liabiliti, bw + 4, 'var(--warn)', 'Jumlah liabiliti');
            // penanda kekurangan
            if (n.liabiliti > n.aset) g.appendChild(s('text', { x: x(t) + x.bandwidth / 2, y: y(n.liabiliti) - 6,
              class: 'val', fill: 'var(--neg)', 'text-anchor': 'middle', text: '▲ liabiliti lebih' }));
          });
          L.axisX(g, x, thn, h);
        } else if (mod === 'jurang') {
          const vals = guna.flatMap((n) => [n.praSim, n.pascaSim]);
          const y = L.linear(L.extent(vals), [h, 0]);
          L.axisY(g, y, w, { label: 'Lebihan / (kekurangan) RM juta', fmt: (v) => fmt.n(v / 1000, 1) + 'b' });
          const bw = x.bandwidth / 2 - 2;
          guna.forEach((n) => {
            const mk = (v, off, warna, nama) => {
              const y0 = y(0), y1 = y(v);
              const r = s('rect', { x: x(n.tahun) + off, y: Math.min(y0, y1), width: bw, height: Math.abs(y1 - y0), rx: 3, fill: warna, class: 'bar' });
              r.addEventListener('mouseenter', (e) => L.showTip(e, `<b>${n.tahun}</b><div class="kv"><span>${nama}</span><span style="color:${cw(v)}">${fmt.juta(v)}</span></div>`));
              r.addEventListener('mousemove', L.moveTip); r.addEventListener('mouseleave', L.hideTip);
              g.appendChild(r);
            };
            mk(n.praSim, 0, n.praSim < 0 ? 'var(--neg)' : 'var(--pos)', 'Sebelum agihan');
            mk(n.pascaSim, bw + 4, n.pascaSim < 0 ? 'color-mix(in srgb,var(--neg) 60%,transparent)' : 'color-mix(in srgb,var(--pos) 60%,transparent)', 'Selepas agihan');
          });
          L.axisX(g, x, thn, h);
        } else {
          let k = 0;
          const pts = guna.map((n) => { k += Math.min(0, n.pascaSim); return { t: n.tahun, v: k }; });
          const y = L.linear(L.extent(pts.map((p) => p.v)), [h, 0]);
          L.axisY(g, y, w, { label: 'Defisit terkumpul RM juta', fmt: (v) => fmt.n(v / 1000, 1) + 'b' });
          const line = pts.map((p, i) => `${i ? 'L' : 'M'}${x(p.t) + x.bandwidth / 2},${y(p.v)}`).join(' ');
          g.appendChild(s('path', { d: `${line} L${x(pts[pts.length - 1].t) + x.bandwidth / 2},${y(0)} L${x(pts[0].t) + x.bandwidth / 2},${y(0)} Z`,
            fill: 'color-mix(in srgb,var(--neg) 16%,transparent)' }));
          g.appendChild(s('path', { d: line, fill: 'none', stroke: 'var(--neg)', 'stroke-width': 2.5 }));
          pts.forEach((p) => {
            const c = s('circle', { cx: x(p.t) + x.bandwidth / 2, cy: y(p.v), r: 5, fill: 'var(--neg)', stroke: 'var(--bg)', 'stroke-width': 2 });
            c.addEventListener('mouseenter', (e) => L.showTip(e, `<b>${p.t}</b><div class="kv"><span>Defisit terkumpul</span><span style="color:var(--neg)">${fmt.juta(p.v)}</span></div>`));
            c.addEventListener('mousemove', L.moveTip); c.addEventListener('mouseleave', L.hideTip);
            g.appendChild(c);
          });
          L.axisX(g, x, thn, h);
        }
      });

      carta.appendChild(L.legend(mod === 'neraca'
        ? [{ label: 'Jumlah aset', warna: 'var(--fakta)' }, { label: 'Jumlah liabiliti', warna: 'var(--warn)' }]
        : mod === 'jurang'
          ? [{ label: 'Sebelum agihan keuntungan', warna: 'var(--pos)' }, { label: 'Selepas agihan keuntungan', warna: 'color-mix(in srgb,var(--pos) 60%,transparent)' }, { label: 'Nilai negatif = kekurangan', warna: 'var(--neg)' }]
          : [{ label: 'Defisit terkumpul selepas agihan', warna: 'var(--neg)' }]));

      /* --- Ringkasan simulasi --- */
      ringkas.innerHTML = '';
      if (simOn) {
        const akhir = sim[sim.length - 1];
        const jimatJum = sim.reduce((a, n) => a + n.jimat, 0);
        ringkas.appendChild(el('div', { class: 'grid g3', style: 'margin-top:14px' },
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('s'),
            el('span', { class: 'v', style: `color:${cw(akhir.pascaSim)}` }, fmt.juta(akhir.pascaSim)),
            el('span', { class: 'l' }, 'Kedudukan 2017 selepas agihan, di bawah peraturan yang anda pilih')),
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('s'),
            el('span', { class: 'v', style: 'color:var(--pri)' }, fmt.juta(jimatJum)),
            el('span', { class: 'l' }, 'Jumlah agihan yang tidak dibayar berbanding apa yang sebenarnya berlaku')),
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('f'),
            el('span', { class: 'v', style: 'color:var(--neg)' }, fmt.juta(D.neraca[D.neraca.length - 1].lebihanPasca)),
            el('span', { class: 'l' }, 'Kedudukan 2017 yang sebenarnya berlaku, mengikut laporan'))));
      }

      /* --- Jadual --- */
      jadual.innerHTML = '';
      const kol = [
        { key: 'tahun', label: 'Tahun' },
        { key: 'aset', label: 'Jumlah aset', num: true, sel: (r) => fmt.n(r.aset) },
        { key: 'liabiliti', label: 'Jumlah liabiliti', num: true, sel: (r) => '(' + fmt.n(r.liabiliti) + ')' },
        { key: 'lebihanPra', label: 'Lebihan sebelum agihan', num: true, sel: (r) => fmt.n(r.lebihanPra), warna: (r) => (r.lebihanPra < 0 ? 'neg' : 'pos') },
        { key: 'agihan', label: 'Agihan dibayar', num: true, sel: (r) => '(' + fmt.n(r.agihan) + ')' },
        { key: 'lebihanPasca', label: 'Lebihan selepas agihan', num: true, sel: (r) => fmt.n(r.lebihanPasca), warna: (r) => (r.lebihanPasca < 0 ? 'neg' : 'pos') },
        { key: 'ujian', label: 'Ujian seksyen 22', sel: (r) => el('span', { class: 'tag', style: `color:${r.lebihanPra > 0 ? 'var(--pos)' : 'var(--neg)'}` },
            r.lebihanPra > 0 ? 'Aset melebihi liabiliti' : 'Aset TIDAK melebihi liabiliti') },
      ];
      jadual.appendChild(C.tbl(kol, D.neraca, { susun: 'tahun', arah: 1 }));
      jadual.appendChild(el('div', { class: 'ctl', style: 'margin-top:10px' },
        C.csv('rci-th-neraca.csv', ['Tahun', 'Aset RM juta', 'Liabiliti RM juta', 'Lebihan sebelum agihan', 'Agihan', 'Lebihan selepas agihan'],
          D.neraca.map((n) => [n.tahun, n.aset, n.liabiliti, n.lebihanPra, n.agihan, n.lebihanPasca])),
        C.src(146, 'Sumber: analisa PwC, laporan ms 146')));
    }

    /* Kawalan */
    const ctlMod = C.seg([
      { id: 'neraca', label: 'Aset lawan liabiliti' },
      { id: 'jurang', label: 'Jurang sebelum & selepas agihan' },
      { id: 'kumulatif', label: 'Defisit terkumpul' },
    ], mod, (v) => { mod = v; bina(); });

    const simUI = el('div');
    function bina() {
      ctlWrap.innerHTML = '';
      ctlWrap.appendChild(C.seg([
        { id: 'neraca', label: 'Aset lawan liabiliti' },
        { id: 'jurang', label: 'Jurang sebelum & selepas agihan' },
        { id: 'kumulatif', label: 'Defisit terkumpul' },
      ], mod, (v) => { mod = v; bina(); }));
      lukis();
    }
    const ctlWrap = el('div', { class: 'ctl' });

    /* Panel simulasi */
    const panelSim = el('div', { style: 'margin-top:6px' });
    function binaSim() {
      panelSim.innerHTML = '';
      const togol = el('button', { class: 'chip' + (simOn ? ' on' : ''),
        onclick: () => { simOn = !simOn; binaSim(); lukis(); } }, simOn ? '● Simulasi hidup' : '○ Hidupkan simulasi');
      panelSim.appendChild(el('div', { class: 'ctl' }, togol,
        simOn ? el('span', { class: 'sub', style: 'display:inline;margin:0' }, 'Carta "Jurang" dan "Defisit terkumpul" kini mengikut tetapan anda.') : null));
      if (!simOn) return;

      const pilihKaedah = C.seg([
        { id: 'undang', label: 'Ikut had undang-undang', nota: 'Agih hanya sebanyak lebihan yang ada. Jika tiada lebihan, tiada agihan.' },
        { id: 'peratus', label: 'Kurangkan agihan secara berkadar' },
      ], kaedah, (v) => { kaedah = v; binaSim(); lukis(); });

      const slider = kaedah === 'peratus' ? el('div', { style: 'margin-top:10px;max-width:420px' },
        el('label', { class: 'fld', id: 'lblF' }, 'Bayar hanya ', el('b', null, faktor + '%'), ' daripada agihan yang sebenarnya dibuat'),
        el('input', { type: 'range', min: '0', max: '100', step: '5', value: faktor,
          oninput: (e) => { faktor = +e.target.value; document.getElementById('lblF').querySelector('b').textContent = faktor + '%'; lukis(); } })) : null;

      const gandaan = el('label', { class: 'fld', style: 'margin-top:12px;display:flex;gap:8px;align-items:flex-start;cursor:pointer' },
        el('input', { type: 'checkbox', checked: berganda ? 'checked' : null, style: 'margin-top:3px',
          onchange: (e) => { berganda = e.target.checked; lukis(); } }),
        el('span', null, el('b', null, 'Kira kesan berganda'), ' — wang yang tidak diagihkan kekal sebagai aset dan menambah baik kedudukan tahun berikutnya.'));

      panelSim.appendChild(el('div', { style: 'background:var(--panel2);border:1px solid var(--line);border-radius:10px;padding:13px' },
        pilihKaedah, slider, gandaan));
    }

    bina(); binaSim();

    return pane(
      head('Seksyen 22 Akta Tabung Haji 1995', 'Adakah wang cukup untuk membayar agihan keuntungan?',
        `Undang-undang membenarkan Tabung Haji mengagihkan keuntungan hanya apabila nilai asetnya melebihi nilai liabilitinya.
         Modul ini menguji tahun demi tahun sama ada syarat itu dipenuhi — dan membenarkan anda mensimulasikan apa yang berlaku
         sekiranya peraturan berbeza digunakan.`),

      C.card('Aset, liabiliti dan kesan agihan keuntungan',
        'Tukar pandangan menggunakan butang di bawah. Hurungkan tetikus atau sentuh mana-mana bar untuk angka tepat.',
        ctlWrap, carta, ringkas,
        C.baca({
          tunjuk: 'Nilai aset dan liabiliti Tabung Haji bagi 2013 hingga 2017, dan kesan agihan keuntungan ke atas baki neraca.',
          penting: 'Pada 2016 dan 2017, liabiliti sudah melebihi aset <b>sebelum</b> sebarang agihan dibuat. Ertinya tiada lebihan langsung untuk diagihkan, tetapi agihan tetap dibayar.',
          simpul: 'Dari 2014 hingga 2017, setiap tahun berakhir dengan aset kurang daripada liabiliti selepas agihan dibuat. Kedudukan itu bertambah buruk setiap tahun, daripada kekurangan RM352 juta pada 2014 kepada RM4,093 juta pada 2017.',
          jangan: 'Jadual ini tidak memberitahu <i>sebab</i> nilai aset rendah — sama ada kerana pelaburan rugi, penilaian berbeza, atau kedua-duanya. Untuk itu lihat modul <b>Cara akaun dibentuk</b>. Angka ini juga datang daripada semakan PwC, bukan penyata kewangan bertarikh asal.',
        })),

      C.card('Simulasi: bagaimana jika peraturan berbeza dipatuhi?',
        'Ini alat "bagaimana jika". Ia bukan kandungan laporan — ia menggunakan angka laporan untuk menguji andaian anda sendiri.',
        panelSim,
        C.note('w', `<b>Had simulasi ini.</b> Model ini hanya melaraskan nilai aset dengan jumlah yang tidak diagihkan.
          Ia <b>tidak</b> mengira semula pulangan pelaburan, kesan ke atas keyakinan pendeposit, atau kemungkinan pengeluaran
          deposit sekiranya agihan dikurangkan secara mendadak. Laporan sendiri menunjukkan bahawa apabila kadar diturunkan
          kepada 1.25% pada 2019, deposit menyusut daripada RM73 bilion kepada RM69 bilion. Jadi simulasi ini memberi jawapan
          perakaunan, bukan ramalan tingkah laku sebenar.`)),

      C.card('Data penuh', null, jadual));
  };

  /* ================= 4. HIBAH ================= */
  V.hibah = () => {
    let mod = 'kadar';
    const carta = box();

    function lukis() {
      carta.innerHTML = '';
      const host = el('div'); carta.appendChild(host);
      const thn = D.kadarHibah.map((k) => k.tahun);

      if (mod === 'kadar') {
        L.chart(host, { h: (w) => (w < 560 ? 290 : 350), m: { t: 22, r: 16, b: 42, l: 50 } }, (g, w, h) => {
          const x = L.band(thn, [0, w], 0.3);
          const y = L.linear([0, 9], [h, 0]);
          L.axisY(g, y, w, { label: 'Kadar setahun (%)', fmt: (v) => fmt.n(v, 1) + '%' });
          D.kadarHibah.forEach((k) => {
            const jum = k.tahunan + k.haji;
            const yb = y(k.tahunan);
            const r1 = s('rect', { x: x(k.tahun), y: yb, width: x.bandwidth, height: h - yb, rx: 3, fill: 'var(--pri)', class: 'bar' });
            g.appendChild(r1);
            if (k.haji) {
              const yt = y(jum);
              const r2 = s('rect', { x: x(k.tahun), y: yt, width: x.bandwidth, height: yb - yt, rx: 3, fill: 'var(--unjur)', class: 'bar' });
              g.appendChild(r2);
            }
            g.appendChild(s('text', { x: x(k.tahun) + x.bandwidth / 2, y: y(jum) - 7, class: 'val',
              fill: 'var(--ink2)', 'text-anchor': 'middle', text: fmt.n(jum, 2) + '%' }));
            const hit = s('rect', { x: x(k.tahun), y: 0, width: x.bandwidth, height: h, fill: 'transparent' });
            hit.addEventListener('mouseenter', (e) => L.showTip(e, `<b>${k.tahun}</b>
              <div class="kv"><span>Agihan tahunan</span><span>${fmt.n(k.tahunan, 2)}%</span></div>
              <div class="kv"><span>Hibah haji</span><span>${k.haji ? fmt.n(k.haji, 2) + '%' : 'tiada'}</span></div>
              <div class="kv"><span><b>Jumlah</b></span><span><b>${fmt.n(jum, 2)}%</b></span></div>`));
            hit.addEventListener('mousemove', L.moveTip); hit.addEventListener('mouseleave', L.hideTip);
            g.appendChild(hit);
          });
          L.axisX(g, x, thn, h);
        });
        carta.appendChild(L.legend([{ label: 'Agihan keuntungan tahunan', warna: 'var(--pri)' }, { label: 'Hibah haji (dihentikan selepas 2017)', warna: 'var(--unjur)' }]));

      } else if (mod === 'jumlah') {
        L.chart(host, { h: (w) => (w < 560 ? 290 : 350), m: { t: 22, r: 16, b: 42, l: 62 } }, (g, w, h) => {
          const t2 = D.bayaranHibah.map((b) => b.tahun);
          const x = L.band(t2, [0, w], 0.3);
          const y = L.linear([0, 3600], [h, 0]);
          L.axisY(g, y, w, { label: 'RM juta', fmt: (v) => fmt.n(v / 1000, 1) + 'b' });
          // garis keuntungan bersih
          D.bayaranHibah.forEach((b) => {
            const tot = b.jumlah / 1000, tahunan = b.tahunan / 1000;
            const yb = y(tahunan);
            g.appendChild(s('rect', { x: x(b.tahun), y: yb, width: x.bandwidth, height: h - yb, rx: 3, fill: 'var(--pri)', class: 'bar' }));
            if (b.haji) g.appendChild(s('rect', { x: x(b.tahun), y: y(tot), width: x.bandwidth, height: yb - y(tot), rx: 3, fill: 'var(--unjur)', class: 'bar' }));
            const u = D.untungBersih.find((r) => r.tahun === b.tahun);
            if (u) {
              g.appendChild(s('line', { x1: x(b.tahun) - 3, x2: x(b.tahun) + x.bandwidth + 3, y1: y(u.untung), y2: y(u.untung),
                stroke: 'var(--terbit)', 'stroke-width': 2.5, 'stroke-dasharray': '5 3' }));
            }
            const hit = s('rect', { x: x(b.tahun), y: 0, width: x.bandwidth, height: h, fill: 'transparent' });
            hit.addEventListener('mouseenter', (e) => L.showTip(e, `<b>${b.tahun}</b>
              <div class="kv"><span>Agihan tahunan</span><span>${fmt.juta(tahunan)}</span></div>
              ${b.haji ? `<div class="kv"><span>Hibah haji</span><span>${fmt.juta(b.haji / 1000)}</span></div>` : ''}
              <div class="kv"><span><b>Jumlah dibayar</b></span><span><b>${fmt.juta(tot)}</b></span></div>
              ${u ? `<div class="kv"><span>Keuntungan bersih</span><span>${fmt.juta(u.untung)}</span></div>
              <div class="note">Bayaran bersamaan ${fmt.n((tot / u.untung) * 100, 0)}% daripada keuntungan bersih tahun itu.</div>` : ''}`));
            hit.addEventListener('mousemove', L.moveTip); hit.addEventListener('mouseleave', L.hideTip);
            g.appendChild(hit);
          });
          L.axisX(g, x, t2, h);
        });
        carta.appendChild(L.legend([{ label: 'Agihan tahunan', warna: 'var(--pri)' }, { label: 'Hibah haji', warna: 'var(--unjur)' }, { label: 'Keuntungan bersih tahun itu (garis putus)', warna: 'var(--terbit)' }]));

      } else {
        /* Asas deposit tersirat */
        L.chart(host, { h: (w) => (w < 560 ? 300 : 350), m: { t: 22, r: 16, b: 42, l: 62 } }, (g, w, h) => {
          const dt = T.asasDeposit.filter((d) => d.asasRM);
          const t2 = dt.map((d) => d.tahun);
          const x = L.band(t2, [0, w], 0.35);
          const y = L.linear([0, 92000], [h, 0]);
          L.axisY(g, y, w, { label: 'RM juta', fmt: (v) => fmt.n(v / 1000, 0) + 'b' });
          dt.forEach((d) => {
            g.appendChild(s('rect', { x: x(d.tahun), y: y(d.asasRM), width: x.bandwidth, height: h - y(d.asasRM), rx: 3, fill: 'var(--terbit)', class: 'bar' }));
            const hit = s('rect', { x: x(d.tahun), y: 0, width: x.bandwidth, height: h, fill: 'transparent' });
            hit.addEventListener('mouseenter', (e) => L.showTip(e, `<b>${d.tahun}</b>
              <div class="kv"><span>Anggaran asas deposit</span><span>${fmt.juta(d.asasRM)}</span></div>
              <div class="note">Dikira: agihan tahunan ${fmt.juta(d.asasRM * d.kadar / 100)} ÷ kadar ${fmt.n(d.kadar, 2)}%</div>`));
            hit.addEventListener('mousemove', L.moveTip); hit.addEventListener('mouseleave', L.hideTip);
            g.appendChild(hit);
          });
          // titik deposit yang disebut laporan
          X.depositDisebut.forEach((p) => {
            const tt = Math.round(p.anggarTahun);
            if (!t2.includes(tt)) return;
            const cx = x(tt) + x.bandwidth / 2, cy = y(p.rm * 1000);
            const c = s('circle', { cx, cy, r: 6, fill: 'var(--fakta)', stroke: 'var(--bg)', 'stroke-width': 2 });
            c.addEventListener('mouseenter', (e) => L.showTip(e, `<b>Disebut dalam laporan</b><div class="kv"><span>${p.titik}</span><span>RM${p.rm} bilion</span></div><div class="note">Laporan ms ${p.ms}</div>`));
            c.addEventListener('mousemove', L.moveTip); c.addEventListener('mouseleave', L.hideTip);
            g.appendChild(c);
          });
          L.axisX(g, x, t2, h);
        });
        carta.appendChild(L.legend([{ label: 'Anggaran asas deposit (dikira daripada agihan ÷ kadar)', warna: 'var(--terbit)' },
          { label: 'Angka deposit yang disebut dalam teks laporan', warna: 'var(--fakta)' }]));
      }
    }

    const ctl = el('div', { class: 'ctl' });
    function bina() {
      ctl.innerHTML = '';
      ctl.appendChild(C.seg([
        { id: 'kadar', label: 'Kadar peratus' },
        { id: 'jumlah', label: 'Jumlah Ringgit dibayar' },
        { id: 'asas', label: 'Anggaran saiz deposit' },
      ], mod, (v) => { mod = v; bina(); }));
      lukis();
    }
    bina();

    /* Jadual nisbah bayaran */
    const nisbah = T.nisbahBayar.filter((n) => n.nisbah);
    const tblN = C.tbl([
      { key: 'tahun', label: 'Tahun' },
      { key: 'untung', label: 'Keuntungan bersih (RM juta)', num: true, sel: (r) => fmt.n(r.untung) },
      { key: 'agihan', label: 'Agihan dibayar (RM juta)', num: true, sel: (r) => fmt.n(r.agihan) },
      { key: 'nisbah', label: 'Bayaran sebagai % keuntungan', num: true, sel: (r) => fmt.n(r.nisbah, 0) + '%',
        warna: (r) => (r.nisbah > 100 ? 'neg' : '') },
      { key: 'k', label: 'Maksud', sel: (r) => r.nisbah > 100
        ? el('span', { style: 'color:var(--neg)' }, 'Bayar lebih daripada untung tahun itu')
        : el('span', { style: 'color:var(--ink2)' }, 'Bayar dalam lingkungan untung') },
    ], nisbah, { susun: 'tahun', arah: 1 });

    return pane(
      head('Bayaran kepada pendeposit', 'Agihan keuntungan (hibah)',
        `Berapa banyak dibayar kepada pendeposit setiap tahun, dan adakah ia berpadanan dengan keuntungan sebenar.
         Orang ramai sering menyebutnya "dividen Tabung Haji"; laporan menggunakan istilah agihan keuntungan.`),

      C.card('Berapa yang dibayar setiap tahun', 'Tiga cara melihat perkara yang sama — kadar peratus, jumlah Ringgit sebenar, dan saiz simpanan yang menerimanya.',
        ctl, carta,
        C.baca({
          tunjuk: 'Kadar dan jumlah agihan keuntungan 2014–2021, berbanding keuntungan bersih tahun berkenaan.',
          penting: 'Kadar jatuh mendadak daripada 6.25% (2014) kepada 1.25% (2018) — penurunan lebih 80%. Ini bukan kejatuhan beransur-ansur, tetapi pemberhentian mengejut apabila kaedah perakaunan yang menyokong kadar tinggi tidak lagi boleh diteruskan.',
          simpul: 'Pada 2014, 2016 dan 2017, jumlah yang dibayar melebihi keuntungan bersih tahun berkenaan. Hibah haji tambahan dihentikan sepenuhnya selepas 2017 dan tidak pernah dikembalikan sehingga 2021.',
          jangan: 'Kadar peratus <b>tidak</b> boleh dibandingkan terus dengan kadar simpanan bank kerana asas pengiraan berbeza — laporan menyebut LTH menggunakan baki minima bulanan, bukan tahunan (ms 131). Anggaran saiz deposit pula ialah pengiraan dashboard yang mengandaikan kadar dikenakan sama rata ke atas keseluruhan simpanan.',
        }),
        C.srcbar(C.src(120, 'Kadar: ms 120'), C.src(131, 'Jumlah: ms 131'), C.src(139, 'Keuntungan: ms 139'))),

      C.card('Adakah bayaran melebihi keuntungan?', null, tblN,
        C.note('w', `<b>Amaran padanan data.</b> Laporan memberi dua angka keuntungan 2017 yang berbeza:
          RM2,798 juta dalam jadual bonus (ms 139) dan RM3,412 juta dalam analisa PwC (ms 154). Jadual di atas menggunakan
          angka ms 139 kerana ia satu-satunya siri lengkap 2013–2017. Jika angka PwC digunakan, nisbah 2017 menjadi 97% dan
          bukan 119%. Laporan tidak menjelaskan perbezaan ini.`)),

      C.card('Apa berlaku apabila kadar diturunkan', null,
        el('div', { class: 'grid g4' }, X.depositDisebut.map((p) =>
          el('div', { class: 'kpi', style: 'cursor:default' }, C.pv('f'),
            el('span', { class: 'v' }, 'RM' + p.rm + 'b'),
            el('span', { class: 'l' }, p.titik), el('div', { style: 'margin-top:8px' }, C.src(p.ms))))),
        C.baca({
          tunjuk: 'Jumlah deposit pada empat titik masa yang disebut dalam teks laporan.',
          penting: 'Selepas kadar 1.25% diumumkan, deposit menyusut RM4 bilion — terutamanya dalam kalangan pendeposit besar. Laporan menyatakan 75% daripada deposit dimiliki oleh hanya 5% pendeposit, jadi keputusan sekumpulan kecil orang boleh menggegarkan keseluruhan institusi.',
          simpul: 'Keyakinan pendeposit sensitif kepada kadar agihan, dan ia pulih semula selepas penstrukturan kewangan dijelaskan kepada umum — deposit meningkat kepada RM88 bilion menjelang 2022.',
          jangan: 'Ini bukan siri tahunan yang lengkap. Ia hanya empat titik yang kebetulan disebut dalam teks, jadi ia tidak boleh digunakan untuk mengira kadar pertumbuhan deposit.',
        })));
  };
})();
