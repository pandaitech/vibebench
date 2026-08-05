/* =========================================================================
   VIEWS — setiap pandangan menganalisis satu tema laporan
   Semua fungsi dipanggil oleh app.js; setiap satu memulangkan nod DOM.
   ========================================================================= */
window.V = (function () {
  const D = window.D, L = window.L;
  const { el, esc, wang, juta, peratus, card, srcLine, badgeJenis, bantuan, insight, kpi } = L;

  /* ------------------------------------------------------------------ */
  /* HELPER: segmen butang (toggle)                                      */
  /* ------------------------------------------------------------------ */
  function segmen(opts, aktif) {
    const box = el('div', { cls: 'seg' });
    opts.forEach(o => {
      const b = el('button', { text: o.label, cls: o.id === aktif ? 'on' : '' });
      b.onclick = () => { box.querySelectorAll('button').forEach(x => x.classList.remove('on')); b.classList.add('on'); o.fn(); };
      box.appendChild(b);
    });
    return box;
  }

  /* ------------------------------------------------------------------ */
  /* RINGKASAN — cerita & peta analisis                                  */
  /* ------------------------------------------------------------------ */
  function ringkasan() {
    const frag = document.createDocumentFragment();

    frag.appendChild(el('div', { cls: 'hero' }, [
      el('span', { cls: 'hero-tag', text: 'Dashboard Penerokaan Data · Laporan RCI Tabung Haji (2014–2020)' }),
      el('h1', { text: 'Krisis Tabung Haji: apa yang berlaku, dan mengapa' }),
      el('p', { cls: 'hero-intro', text: 'Laporan Suruhanjaya Siasatan Diraja (RCI) setebal ±240 muka surat menyiasat pengurusan dan operasi Lembaga Tabung Haji (LTH) dari 2014 hingga 2020. Dashboard ini menterjemah laporan itu kepada data yang boleh diteroka: setiap angka di sini ada sumbernya, dan anda boleh jejak terus ke muka surat laporan asal.' }),
      el('div', { cls: 'hero-actions' }, [
        el('button', { cls: 'btn pri', text: '▶ Mula dari kronologi', onclick: () => window.pergi('ringkasan', 'kronologi') }),
        el('button', { cls: 'btn', text: 'Lihat 5 faktor krisis ↓', onclick: () => document.getElementById('faktor').scrollIntoView({ behavior: 'smooth' }) })
      ])
    ]));

    /* KPI utama */
    const kpis = el('div', { cls: 'kpis' }, [
      kpi('Deposit pendeposit (2022)', 'RM88 bilion', '8.6 juta pendeposit · dijamin Kerajaan (s.24 Akta 535)', '#0e7a4d'),
      kpi('Defisit selepas agihan 2017', '−RM4.09 bilion', 'Aset RM70.3b < liabiliti RM71.1b (analisis PwC)', '#c93a3a'),
      kpi('Hibah tertinggi (2014)', '6.25% + 2.00%', 'Melebihi kemampuan — rizab menyusut', '#d99a2b'),
      kpi('Aset dipindah ke UJSB', 'RM19.9 bilion', 'Nilai pasaran RM9.7b — premium RM10.2b', '#2f6fbf')
    ]);
    frag.appendChild(el('div', { cls: 'kpis-wrap' }, [kpis]));

    /* Peta cerita */
    frag.appendChild(el('div', { cls: 'sect', id: 'faktor' }, [
      el('h2', { text: 'Bagaimana krisis 2017 berlaku' }),
      el('p', { cls: 'sect-sub', text: 'Suruhanjaya mengenal pasti lima faktor yang membawa LTH ke krisis kewangan serius pada tahun kewangan 2017. Setiap faktor boleh dikembangkan — pautan membawa kepada analisis penuh.' }),
      el('div', { cls: 'faktor-grid' }, D.cerita.faktor.map((f, i) => {
        const tujuan = { hibah: ['krisis', 'fhibah'], akaun: ['krisis', 'fakaun'], audit: ['krisis', 'faudit'], visi: ['pelaburan', null], hafis: ['haji', null] }[f.id] || ['krisis', null];
        return el('a', { href: '#' + tujuan[0], cls: 'faktor', onclick: (e) => { e.preventDefault(); window.pergi(tujuan[0], tujuan[1]); } }, [
          el('span', { cls: 'f-num', text: String(i + 1) }),
          el('b', { text: f.nama }),
          el('p', { text: f.teras }),
          el('span', { cls: 'f-go', text: 'Analisis penuh →' })
        ]);
      })),
      el('a', { href: '#ujsb', cls: 'faktor bailout', onclick: (e) => { e.preventDefault(); window.pergi('ujsb'); } }, [
        el('span', { cls: 'f-num', text: '6' }),
        el('b', { text: 'Penyelamat: Urusharta Jamaah (UJSB)' }),
        el('p', { text: D.cerita.jadualUJSB.teras }),
        el('span', { cls: 'f-go', text: 'Struktur bailout penuh →' })
      ])
    ]));

    /* 5 soalan penerokaan */
    frag.appendChild(el('div', { cls: 'sect' }, [
      el('h2', { text: 'Lima soalan utama yang boleh diteroka' }),
      el('div', { cls: 'qlist' }, [
        q('Berapa besarkah jurang kewangan LTH, dan bila ia mula berlaku?', 'Bandingkan aset, liabiliti dan agihan hibah 2013–2017 mengikut analisis PwC.', 'krisis'),
        q('Apakah maksud "perakaunan kreatif"?', 'Dua versi angka 2017: RM3.4b untung dilaporkan vs RM1.4b rugi terlaras — dan bagaimana polisi rosot nilai diubah.', 'krisis', 'fakaun'),
        q('Bagaimana kerajaan menyelamatkan LTH — dan pada kos apa?', 'Aset RM19.9b dipindah ke UJSB, Sukuk RM27.5b, komitmen RM17.8b, dan risiko berterusan sehingga 2029.', 'ujsb'),
        q('Pelaburan mana yang gagal, dan berapa kerugiannya?', '14 pelaburan bermasalah dikenal pasti — daripada ladang di Indonesia hingga hotel di Mekah.', 'pelaburan'),
        q('Adakah wang pendeposit selama ini digunakan untuk subsidi haji?', 'HAFIS naik daripada RM106j (2014) ke unjuran RM742j (2030) — diambil daripada keuntungan pelaburan.', 'haji')
      ])
    ]));

    /* Kronologi */
    frag.appendChild(el('div', { cls: 'sect', id: 'kronologi' }, [
      el('h2', { text: 'Kronologi penuh: 1951 – 2022' }),
      el('p', { cls: 'sect-sub', text: 'Garis masa siasatan, disusun daripada laporan. Sentuh/tetikus pada peristiwa untuk butiran dan sumber.' }),
      el('div', { cls: 'tl' }, D.timeline.map(t => {
        const it = el('div', { cls: 'tl-item' });
        it.appendChild(el('div', { cls: 'tl-dot' }));
        it.appendChild(el('div', { cls: 'tl-t', text: t.t }));
        const body = el('div', { cls: 'tl-b' });
        body.appendChild(el('p', { text: t.e }));
        if (t.src) body.appendChild(srcLine(t.src));
        it.appendChild(body);
        return it;
      }))
    ]));

    /* Soal jawab ringkas */
    frag.appendChild(el('div', { cls: 'sect' }, [
      el('h2', { text: 'Apakah kesimpulan Suruhanjaya?' }),
      el('div', { cls: 'card' }, [
        el('p', { text: 'Suruhanjaya berpandangan struktur LTH wajar dikekalkan, tetapi pengurusan dan operasi perlu diperbaiki. Antara syor utama:' }),
        el('ul', { cls: 'list' }, [
          el('li', { text: 'Akta 535 dipinda: kriteria kelayakan anggota Lembaga, larangan ahli politik aktif, dan jawatankuasa penting (Panel Pelaburan, JPS, Urusan Haji) dikanunkan.' }),
          el('li', { text: 'Kuasa Menteri dibahagi: Menteri Hal Ehwal Agama (haji) dan Menteri Kewangan (kewangan, dana, pelaburan).' }),
          el('li', { text: 'Hibah berdasarkan penyata kewangan beraudit — bukan RAV atau laporan proforma.' }),
          el('li', { text: 'Audit penyata kewangan tidak lagi di bawah JAN; LTH boleh lantik firma akauntan swasta.' }),
          el('li', { text: 'Fungsi pelaburan diasingkan sebagai "Dana Haji" dalam LTH, dikawal selia Suruhanjaya Sekuriti Malaysia.' }),
          el('li', { text: 'Deposit minimum daftar haji dinaikkan RM1,300 → RM12,980; subsidi hanya untuk yang memerlukan.' })
        ]),
        srcLine({ s: 'Ringkasan Eksekutif, para 35', p: 27, url: 'https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md#pdf-page-27' })
      ])
    ]));

    return frag;
  }

  function q(soalan, teras, view, anc) {
    return el('a', { href: '#' + view, cls: 'q', onclick: (e) => { e.preventDefault(); window.pergi(view, anc); } }, [
      el('b', { text: soalan }),
      el('p', { text: teras }),
      el('span', { cls: 'q-go', text: 'Teroka →' })
    ]);
  }

  /* ------------------------------------------------------------------ */
  /* KRISIS — analisis kewangan                                          */
  /* ------------------------------------------------------------------ */
  function krisis() {
    const frag = document.createDocumentFragment();

    frag.appendChild(el('div', { cls: 'sect-head' }, [
      el('h1', { text: 'Krisis Kewangan' }),
      el('p', { text: 'Bila wang pendeposit lebih besar daripada aset LTH — dan hibah tetap dibayar. Bahagian ini membandingkan tiga sumber angka: penyata kewangan, analisis PwC, dan pengiraan RAV pengurusan LTH.' })
    ]));

    /* --- KPI --- */
    frag.appendChild(el('div', { cls: 'kpis' }, [
      kpi('2017 — seperti dilaporkan', '+RM3.41 bilion untung', 'Penyata kewangan diaudit JAN', '#0e7a4d'),
      kpi('2017 — terlaras MFRS (PwC)', '−RM1.43 bilion rugi', 'Jika rosot nilai & nilai saksama diambil kira', '#c93a3a'),
      kpi('Kerugian terkumpul (PwC)', 'RM4.68 bilion', 'Setakat 31 Dis 2017', '#c93a3a'),
      kpi('Rosot nilai tidak direkod 2017', 'RM1.54 bilion', 'RM1.31b (AFS) + RM227.81j (anak & bersekutu)', '#d99a2b')
    ]));

    /* --- Carta 1: aset vs liabiliti --- */
    const c1box = el('div');
    const c1a = () => L.barChart({
      data: D.pwc.map(d => ({ label: d.y, Aset: d.aset, Liabiliti: d.liabiliti })),
      keys: [{ k: 'Aset', nama: 'Jumlah aset', warna: L.W.hijau }, { k: 'Liabiliti', nama: 'Liabiliti (termasuk deposit)', warna: L.W.merah }],
      unit: 'j', tinggi: 320,
      legend: true
    });
    const c1b = () => L.barChart({
      data: D.pwc.map(d => ({ label: d.y, Sebelum: d.sebelum, Selepas: d.selepas })),
      keys: [{ k: 'Sebelum', nama: 'Lebihan/(kurangan) sebelum agihan', warna: L.W.biru }, { k: 'Selepas', nama: 'Selepas agihan hibah', warna: L.W.merah }],
      unit: 'j', tinggi: 320,
      legend: true
    });
    c1box.appendChild(c1a());
    frag.appendChild(card(
      'Jurang aset vs liabiliti (2013–2017)',
      'Analisis PwC (Financial Review) — RM juta',
      el('div', {}, [
        segmen([
          { id: 'a', label: 'Aset vs liabiliti', fn: () => { c1box.innerHTML = ''; c1box.appendChild(c1a()); } },
          { id: 'b', label: 'Lebihan sebelum & selepas agihan', fn: () => { c1box.innerHTML = ''; c1box.appendChild(c1b()); } }
        ], 'a'),
        c1box,
        bantuan([
          { j: 'Apa yang ditunjukkan', i: 'Dua cara melihat kedudukan LTH. Kiri: jumlah aset berbanding liabiliti. Kanan: lebihan aset SEBELUM hibah dibayar, dan kedudukan SELEPAS hibah dibayar.' },
          { j: 'Kenapa penting', i: 'Undang-undang (s.22 Akta 535) hanya membenarkan hibah diagih jika aset ≥ liabiliti. Carta kanan menunjukkan LTH sudah "merah" selepas agihan sejak 2014, dan sebelum agihan pun mulai 2016.' },
          { j: 'Apa yang boleh disimpulkan', i: 'Dari 2014–2017, hibah dibayar walaupun kedudukan sebenar (analisis PwC) menunjukkan kekurangan. 2015–2017: aset kurang daripada liabiliti walaupun SEBELUM hibah.' },
          { j: 'Apa yang TIDAK boleh disimpulkan', i: 'Angka ini adalah analisis PwC, bukan penyata kewangan diaudit. Ia tidak menunjukkan aliran tunai harian LTH — hanya kedudukan akhir tahun.' }
        ])
      ]),
      { badge: 'T', badgeText: 'Terbitan data laporan', src: D.pwc[3].src }
    ));

    /* --- Carta 2: kadar hibah --- */
    frag.appendChild(card(
      'Kadar hibah 2014–2021',
      'Agihan tahunan dan hibah haji (%). Penurunan mendadak 2018 (1.25%) selepas penstrukturan.',
      el('div', {}, [
        L.lineChart({
          data: D.hibah.map(d => ({ label: String(d.y), v: d.tahun })),
          unit: 'raw', tinggi: 260, warna: L.W.hijau, titik: true,
          fmt: v => v.toFixed(2) + '%',
          target: [
            { label: 'Hibah 2018: 1.25% — titik krisis', v: 1.25, warna: L.W.merah }
          ]
        }),
        bantuan([
          { j: 'Apa yang ditunjukkan', i: 'Kadar hibah tahunan (garisan hijau) dan hibah haji (bar kecil di bawah, jika ada).' },
          { j: 'Kenapa penting', i: 'Hibah ialah "gaji bulanan" pendeposit. Sejak 2014–2017 LTH bayar 6.25%–4.25% — lebih tinggi daripada kadar deposit bank Islam, walaupun pendapatan mula menurun (2014–2015).' },
          { j: 'Apa yang boleh disimpulkan', i: 'Selepas 2018, LTH menetapkan sasaran 0.5–1.0% di atas kadar deposit bank Islam. Kadar 2020–2021 (3.10%) kekal stabil.' },
          { j: 'Apa yang TIDAK boleh disimpulkan', i: 'Kadar bank Islam tepat bagi setiap tahun tidak dinyatakan dalam laporan — kita tidak boleh bandingkan angka tepat, hanya arah.' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', id: 'fhibah', src: D.hibah[0].src }
    ));

    /* --- Carta 3: jumlah hibah dibayar --- */
    frag.appendChild(card(
      'Jumlah wang hibah dibayar (RM juta)',
      'Setahun, LTH membayar sekitar RM3 bilion hibah — lebih daripada keuntungan sebenar dalam beberapa tahun.',
      el('div', {}, [
        L.barChart({
          data: D.hibahJumlah.map(d => ({ label: String(d.y), Tahunan: d.tahun, 'Hibah haji': d.haji })),
          keys: [{ k: 'Tahunan', nama: 'Hibah tahunan', warna: L.W.hijau }, { k: 'Hibah haji', nama: 'Hibah haji', warna: L.W.teal }],
          unit: 'k', tinggi: 300, mode: 'stacked', legend: true
        }),
        insight('ya', '<b>Yang boleh disimpulkan:</b> 2017 — LTH membayar RM3.32 bilion hibah pada tahun yang sama analisis PwC menunjukkan kekurangan RM769 juta SEBELUM agihan. Dengan kata lain, agihan itu dibayar daripada simpanan/deposit, bukan daripada keuntungan baharu.'),
        insight('tidak', '<b>Yang tidak boleh disimpulkan:</b> Jumlah di atas ialah wang yang dibayar kepada pendeposit — bukan kadar pulangan sebenar pelaburan LTH.'),
        bantuan([
          { j: 'Apa yang ditunjukkan', i: 'Jumlah wang sebenar (RM juta) diagihkan setiap tahun — pecahan hibah tahunan dan hibah haji.' },
          { j: 'Kenapa penting', i: 'Kadar (%) sahaja tidak cukup — kita perlu lihat jumlah wang yang keluar. RM3.2 bilion setahun adalah aliran keluar yang besar.' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.hibahJumlah[3].src }
    ));

    /* --- Perakaunan kreatif: RAV & rosot nilai --- */
    frag.appendChild(card(
      'Perakaunan "kreatif": dua versi angka 2017',
      'Bagaimana LTH boleh mengisytiharkan hibah 4.50% + 1.75% walaupun aset < liabiliti?',      el('div', {}, [
        el('div', { cls: 'dual' }, [
          el('div', { cls: 'dual-item' }, [
            el('b', { cls: 'dual-t', text: 'Kedudukan sebenar (analisis PwC / RAV)' }),
            el('p', { text: 'Aset RM70,317j − Liabiliti RM74,410j (termasuk deposit) → bersih: −RM4,093j' }),
            el('p', { cls: 'dual-neg', text: 'Defisit RM4.09 bilion — tidak layak hibah' })
          ]),
          el('div', { cls: 'dual-item ok' }, [
            el('b', { cls: 'dual-t', text: 'Versi RAV (nilai terlaras pengurusan)' }),
            el('p', { text: 'Aset RM70,317j + pelarasan RAV RM4,466j = RM74,783j − liabiliti RM74,410j → bersih: RM373j' }),
            el('p', { cls: 'dual-pos', text: 'Lebihan RM373 juta — cukup untuk hibah' })
          ])
        ]),
        el('div', { cls: 'note', text: 'Penting: penyata kewangan yang diaudit JAN pula menunjukkan aset MELEBIHI liabiliti — kerana Kumpulan Wang Pendeposit dikelaskan sebagai ekuiti (bukan liabiliti) sejak 2010, satu representasi salah yang dibangkitkan Suruhanjaya. Pelarasan RAV RM4,466j termasuk RM2,294j berkaitan TH Plantations — penilaian hartanah RM4.6b yang hanya RM556j berdasarkan penilai profesional; RM4.044b adalah anggaran pengurusan semata-mata.' }),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Dengan menambah "nilai realisasi" (RAV) yang bukan daripada penyata diaudit, LTH mengubah kedudukan daripada defisit RM4.09b kepada lebihan RM373j — lalu layak mengisytiharkan hibah.'),
        bantuan([
          { j: 'Apa itu RAV?', i: 'Realisable Asset Value — nilai aset yang dianggarkan pengurusan boleh "direalisasi" (dijual). Bukan harga pasaran, bukan penyata diaudit. Tiada piawaian perakaunan yang mengiktiraf RAV.' },
          { j: 'Apa yang tidak boleh disimpulkan', i: 'RM373j adalah pengiraan pengurusan LTH; PwC menganggarkan liabiliti bersih sebenar RM4.09b. Kedua-duanya bukan "betul" — satu ikut laporan diaudit, satu ikut anggaran pengurusan.' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', id: 'fakaun', src: D.rav2017.src }
    ));

    /* --- Polisi rosot nilai --- */
    const c4box = el('div');
    const c4a = () => L.barChart({
      data: D.rosotNilai.polisi.map(d => ({ label: d.ambang, Impak: d.impak })),
      keys: [{ k: 'Impak', nama: 'Kesan rosot nilai (RM juta)', warna: L.W.merah }],
      unit: 'j', tinggi: 240
    });
    c4box.appendChild(c4a());
    frag.appendChild(card(
      'Polisi rosot nilai yang dilonggarkan (2017)',
      'LTH mengubah ambang rosot nilai dua kali dalam tempoh sehari — daripada 70% kepada 85% lalu 90%.',
      el('div', {}, [
        c4box,
        el('div', { cls: 'note', text: 'PwC: dengan polisi asal (>70% jatuh, >24 bulan), rosot nilai RM1,313j perlu direkod. Dengan polisi baru (>90%), hanya RM1j direkod. PwC menganggarkan RM1,310j rosot nilai AFS tidak direkod, ditambah RM227.81j anak syarikat/bersekutu.' }),
        el('div', { cls: 'exbox' }, [
          el('b', { text: 'Contoh mudah daripada laporan' }),
          el('p', { text: D.rosotNilai.contoh })
        ]),
        insight('tidak', '<b>Yang tidak boleh disimpulkan:</b> Ini bukan "penipuan" yang disabitkan — ini penemuan PwC & Suruhanjaya bahawa amalan itu tidak mematuhi piawaian perakaunan (FRS 139). Keputusan muktamad mahkamah adalah di luar skop laporan.'),
        bantuan([
          { j: 'Apa yang ditunjukkan', i: 'Jika polisi rosot nilai dikekalkan (>70%), kesan kepada penyata 2017 ialah RM1.31 bilion. Setiap kali ambang dinaikkan, kesan rosot nilai mengecil.' },
          { j: 'Kenapa penting', i: 'Rosot nilai ialah "pengakuan jujur" bahawa aset jatuh nilai. Dengan melonggarkan ambang, LTH mengelak mencatat kerugian — lalu nampak untung dan boleh bayar hibah.' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.rosotNilai.src }
    ));

    /* --- Keuntungan vs kerugian terlaras --- */
    frag.appendChild(card(
      '2017: untung RM3.4b atau rugi RM1.4b?',
      'Perbezaan antara penyata kewangan dan pengiraan terlaras piawaian FRS (PwC).',
      el('div', {}, [
        L.waterfall({
          data: [
            { label: 'Untung dilaporkan', v: 3412, warna: L.W.hijau },
            { label: 'Rosot nilai ekuiti AFS', v: -4258, warna: L.W.merah },
            { label: 'Rosot nilai hutang AFS', v: -7, warna: L.W.merah },
            { label: 'Pelarasan lain', v: -580, warna: L.W.merah },
            { label: 'Rugi terlaras', v: -1433, warna: L.W.merahMuda }
          ],
          unit: 'j', tinggi: 300, fmt: v => (v >= 0 ? '+' : '') + wang(Math.abs(v), 'j')
        }),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Jika piawaian MFRS digunakan sepenuhnya, LTH sepatutnya mencatat kerugian bersih RM1.4 bilion bagi 2017, dan kerugian terkumpul RM4.68 bilion setakat 31 Dis 2017.'),
        bantuan([
          { j: 'Apa yang ditunjukkan', i: 'Untung yang dilaporkan RM3,412j, ditolak pelarasan rosot nilai dan nilai saksama, menjadi rugi RM1,433j.' },
          { j: 'Apa yang tidak boleh disimpulkan', i: 'Angka PwC ialah anggaran berdasarkan semakan — bukan audit semula. Perbezaan tepat dengan penyata LTH bergantung pada andaian penilaian.' }
        ])
      ]),
      { badge: 'T', badgeText: 'Terbitan data laporan', src: D.rosotNilai.src }
    ));

    /* --- Audit JAN --- */
    frag.appendChild(card(
      'Apa kata auditor? Sijil Audit 2014–2017',
      'Keempat-empat tahun diberi Sijil Audit Bersih — walaupun 2017 disertakan "Emphasis of Matter".',
      el('div', {}, [
        el('table', { cls: 'tbl' }, [
          el('thead', {}, [el('tr', {}, [el('th', { text: 'Tahun' }), el('th', { text: 'Sijil audit' }), el('th', { text: 'Catatan laporan' })])]),
          el('tbody', {}, D.audit.map(a =>
            el('tr', {}, [
              el('td', { text: String(a.y) }),
              el('td', { html: a.eom ? `<span class="warn">${esc(a.sijil)}</span>` : esc(a.sijil) }),
              el('td', { text: a.nota })
            ])
          ))
        ]),
        el('div', { cls: 'quote' }, [
          el('p', { text: '“' + D.kanSurat.petikan + '”' }),
          el('span', { cls: 'quote-src', text: 'Surat KAN kepada Perdana Menteri, 19 Dis 2018' })
        ]),
        insight('ya', '<b>Yang boleh disimpulkan:</b> KAN sendiri mengakui sepatutnya "Pendapat Berteguran" (qualified opinion) dikeluarkan — bukan Sijil Bersih. Pertimbangan "persepsi pendeposit" diambil kira dalam keputusan audit, yang sepatutnya tidak dilakukan.'),
        bantuan([
          { j: 'Apa yang tidak boleh disimpulkan', i: 'Suruhanjaya tidak membuat kesimpulan bahawa JAN terlibat dalam salah laku — ia menilai JAN tidak tegas dan mencadangkan audit LTH dipindah kepada firma swasta.' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', id: 'faudit', src: D.audit[3].src }
    ));

    /* --- Deposit & risiko tertumpu --- */
    frag.appendChild(card(
      'Reaksi pendeposit & risiko tertumpu',
      'Apa yang berlaku apabila hibah rendah diumumkan — dan siapa yang memegang wang LTH.',
      el('div', {}, [
        el('div', { cls: 'two-col' }, [
          el('div', {}, [
            el('h4', { text: 'Deposit LTH (RM bilion)' }),
            L.lineChart({
              data: D.deposit.map(d => ({ label: String(d.y), v: d.nilai / 1000 })),
              unit: 'b', tinggi: 220, warna: L.W.biru, titik: true,
              fmt: v => v.toFixed(1) + 'b'
            }),
            el('p', { cls: 'note', text: 'Pengumuman hibah 1.25% untuk 2018 → deposit susut ±RM4b (RM73b → RM69b). Pulih ke ±RM76b (2020), kemudian RM88b (2022).' })
          ]),
          el('div', {}, [
            el('h4', { text: 'Risiko tertumpu: siapa pegang deposit?' }),
            L.donut({
              data: [
                { label: '5% pendeposit terbesar', v: 75, warna: L.W.merah },
                { label: '95% pendeposit lain', v: 25, warna: L.W.hijauPudar }
              ],
              tengah: '75%', tengahSub: 'deposit',
              fmt: v => v + '%'
            }),
            el('p', { cls: 'note', text: 'Anggaran laporan: 75% deposit dimiliki 5% pendeposit. 65% pendeposit pula ada RM2,000 atau kurang. Jika pendeposit besar keluar serentak — bank run.' })
          ])
        ]),
        bantuan([
          { j: 'Apa yang boleh disimpulkan', i: 'Struktur deposit LTH rapuh: bergantung kepada segelintir pendeposit besar, dan hibah rendah boleh mencetus pengeluaran besar.' },
          { j: 'Apa yang tidak boleh disimpulkan', i: 'Donut ialah anggaran laporan (para 3.17.15) — bukan data tepat daripada penyata LTH.' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.deposit[1].src }
    ));

    return frag;
  }

  /* ------------------------------------------------------------------ */
  /* UJSB — bailout                                                      */
  /* ------------------------------------------------------------------ */
  function ujsb() {
    const frag = document.createDocumentFragment();

    frag.appendChild(el('div', { cls: 'sect-head' }, [
      el('h1', { text: 'Penyelamat: Urusharta Jamaah (UJSB)' }),
      el('p', { text: 'Pada Disember 2018, Kerajaan memindahkan aset bermasalah LTH ke syarikat khas UJSB. LTH menerima Sukuk RM27.5 bilion sebagai pertukaran. Bahagian ini membedah struktur penyelamatan itu dan risikonya.' })
    ]));

    frag.appendChild(el('div', { cls: 'kpis' }, [
      kpi('Aset dipindah (nilai buku)', 'RM18.98 bilion', 'Nilai pemindahan RM19.9b', '#2f6fbf'),
      kpi('Nilai pasaran aset itu', 'RM9.73 bilion', 'Premium RM10.2b kepada pasaran', '#d99a2b'),
      kpi('Sukuk diterima LTH', 'RM27.5 bilion', 'Siri 1 matang 2026 · Siri 2 matang 2029', '#0e7a4d'),
      kpi('Komitmen Kerajaan', 'RM17.8 bilion', 'RM1.73b/tahun (RMK-12 & RMK-13)', '#c93a3a')
    ]));

    /* --- komposisi pemindahan --- */
    frag.appendChild(card(
      'Apa yang dipindahkan — dan pada nilai apa',
      'RM juta · tiga ukuran berbeza untuk aset yang sama.',
      el('div', {}, [
        L.barChart({
          data: D.ujsb.pemindahan.map(d => ({ label: d.jenis.split('(')[0].trim(), Buku: d.buku, 'Nilai pindah': d.pindah, Pasaran: d.pasaran })),
          keys: [
            { k: 'Buku', nama: 'Nilai buku LTH', warna: L.W.kelabu },
            { k: 'Nilai pindah', nama: 'Nilai pemindahan ke UJSB', warna: L.W.hijau },
            { k: 'Pasaran', nama: 'Nilai pasaran ketika itu', warna: L.W.merah }
          ],
          unit: 'j', tinggi: 320, legend: true
        }),
        el('div', { cls: 'note', text: 'Ekuiti tersenarai (106 kaunter) dipindah pada RM16.85b tetapi nilai pasaran RM7.6b — selisih RM9.25b. Keseluruhan pemindahan RM19.9b berbanding nilai pasaran RM9.7b (premium RM10.2b).' }),
        insight('tidak', '<b>Apa yang tidak boleh disimpulkan:</b> Premium RM10.2b bukan "wang tunai yang masuk" — ia ialah nilai tawaran Sukuk yang LTH terima sebagai ganti aset. UJSB pula mencatat kerugian RM9.9b pada 2019 kerana perbezaan nilai pindah vs nilai pasaran.'),
        bantuan([
          { j: 'Apa yang ditunjukkan', i: 'Setiap kategori aset diukur tiga cara: nilai buku (dalam penyata LTH), nilai pemindahan (harga tawaran ke UJSB), nilai pasaran (nilai sebenar ketika itu).' },
          { j: 'Kenapa penting', i: 'Jurang antara nilai pemindahan dan nilai pasaran menunjukkan saiz "bantuan tersembunyi" — Kerajaan menanggung beban itu melalui UJSB.' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.ujsb.pemindahan[2].src }
    ));

    /* --- struktur sukuk --- */
    frag.appendChild(card(
      'Struktur Sukuk UJSB',
      'Dua siri Sukuk Murabahah berkupon sifar, dilanggan penuh oleh LTH.',
      el('div', {}, [
        el('div', { cls: 'sukuk-grid' }, D.ujsb.sukuk.map(s =>
          el('div', { cls: 'sukuk' }, [
            el('b', { cls: 'sukuk-s', text: 'Sukuk ' + s.siri }),
            el('div', { cls: 'sukuk-big', text: wang(s.nominal, 'j') }),
            el('p', { text: 'Nilai langganan ' + wang(s.nilai, 'j') + ' · tempoh ' + s.tempoh + ' tahun' }),
            el('p', { text: 'Pulangan ketika matang: ' + s.ytm.toFixed(2) + '% setahun' }),
            el('p', { cls: 'sukuk-m', text: 'Matang: ' + s.matang })
          ])
        )),
        el('div', { cls: 'note', text: '+ tunai RM300j (RM100j Dis 2019 + RM200j Dis 2020) untuk saham tidak patuh syariah (Bumi Armada, Integrated Logistics, Yi-Lai, YTL Power).' }),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Sukuk ini "berkupon sifar" — LTH tidak terima bayaran tunai tahunan; pulangan diakru (dicatat sebagai pendapatan) dan dibayar ketika matang 2026/2029. Ini bermakna "pendapatan" LTH daripada UJSB adalah bukan tunai.'),
        bantuan([
          { j: 'Apa yang tidak boleh disimpulkan', i: 'Sukuk tidak dijamin Kerajaan secara sah — hanya "Surat Sokongan Kewangan" Menteri Kewangan (27 Mei 2019). Namun ia tersenarai dalam Komitmen Jaminan Kerajaan (Jadual 5.3 dokumen fiskal).' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.ujsb.sukuk[0].src }
    ));

    /* --- aliran wang: komitmen kerajaan --- */
    frag.appendChild(card(
      'Aliran wang: komitmen Kerajaan 2020–2030',
      'RM juta · peruntukan tahunan untuk penebusan awal Sukuk UJSB.',
      el('div', {}, [
        L.barChart({
          data: [
            { label: '2020', diterima: 500 },
            { label: '2021', diterima: 0 },
            { label: '2022–2030', diterima: 1730 }
          ],
          keys: [{ k: 'diterima', nama: 'Peruntukan (RM juta)', warna: L.W.hijau }],
          unit: 'j', tinggi: 240
        }),
        el('div', { cls: 'exbox neg' }, [
          el('b', { text: 'Peruntukan 2021 TIDAK diterima' }),
          el('p', { text: D.ujsb.komitmen.nota2021 })
        ]),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Jika Kerajaan tidak konsisten membayar, LTH berdepan dua risiko besar: (1) pendapatan akruan tanpa tunai; (2) bayaran pukal RM27.5b apabila matang 2026 & 2029. Suruhanjaya menyebut kegagalan UJSB sebagai "risiko terbesar LTH".'),
        bantuan([
          { j: 'Apa yang ditunjukkan', i: 'Jemaah Menteri meluluskan RM17.8b: RM500j (2020, RMK-11) + RM17.3b (±RM1.73b setahun, RMK-12 & RMK-13).' },
          { j: 'Apa yang tidak boleh disimpulkan', i: 'Bar 2022–2030 ialah purata setahun, bukan jumlah sebenar setiap tahun — laporan hanya menyatakan anggaran purata.' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.ujsb.komitmen.src }
    ));

    /* --- saham mewah --- */
    frag.appendChild(card(
      'Saham "mewah" yang dipindah — nilainya terus jatuh',
      'Lima saham utama dipindah pada akhir 2018; harga pasaran ketika itu jauh lebih rendah.',
      el('div', {}, [
        L.hBarChart({
          data: D.bluechips.map(d => ({ label: d.nama, v: d.kejatuhan / 1e6 })),
          unit: 'j', tinggi: 240,
          tipLabel: 'Kejatuhan nilai',
          fmt: v => wang(v, 'j'),
          nota: 'Jumlah kejatuhan nilai 5 saham ini: RM946.07 juta (nilai pindah RM3.61b → pasaran RM2.66b, 31 Dis 2018).'
        }),
        el('p', { cls: 'note', text: 'Contoh: TM dipindah pada RM5.96/unit tetapi bernilai RM2.33/unit pada 31 Dis 2018 (−60.9%). Harga Jun 2022: Axiata RM3.04, Maxis RM3.52, MISC RM7.30, Digi RM3.27, TM RM5.20.' }),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Walaupun LTH "terlepas" kerugian ini kerana aset dipindah, ia menunjukkan saiz masalah: nilai aset yang dipindah jauh di bawah harga tawaran.'),
        bantuan([
          { j: 'Apa yang tidak boleh disimpulkan', i: 'Ini ialah 5 daripada 106 kaunter — dipilih laporan sebagai contoh "saham mewah" yang jatuh >20% atau >RM45j. Bukan keseluruhan portfolio.' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.bluechips[0].src }
    ));

    /* --- hartanah --- */
    frag.appendChild(card(
      'Hartanah yang dipindah: RM2.25b → RM1.20b',
      'Nilai pasaran 29 aset hartanah jatuh hampir separuh menjelang Disember 2021.',
      el('div', {}, [
        L.barChart({
          data: D.hartanah.map(d => ({ label: d.jenis, Pindah: d.pindah / 1e6, 'Dis 2021': d.pasaran / 1e6 })),
          keys: [{ k: 'Pindah', nama: 'Nilai pemindahan', warna: L.W.hijau }, { k: 'Dis 2021', nama: 'Nilai pasaran Dis 2021', warna: L.W.merah }],
          unit: 'j', tinggi: 300, legend: true,
          fmt: v => wang(v, 'j')
        }),
        el('div', { cls: 'note', text: 'Jika LTH masih memegang hartanah ini, ia perlu mencatat rosot nilai tambahan. Pemindahan melindungi penyata kewangan LTH daripada kejatuhan ini.' }),
        insight('tidak', '<b>Apa yang tidak boleh disimpulkan:</b> Kejatuhan nilai berlaku selepas pemindahan — bukan bukti nilai pemindahan "salah" pada masa itu; ia mencerminkan pasaran hartanah yang lemah (termasuk kesan Covid-19).')
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.hartanah[3].src }
    ));

    /* --- risiko berterusan --- */
    frag.appendChild(card(
      'Risiko berterusan: RM27.5b ≈ 31% aset LTH',
      'Kebergantungan LTH kepada UJSB amat tinggi — dan kebanyakannya bukan tunai.',
      el('div', {}, [
        el('div', { cls: 'risk-list' }, [
          el('div', { cls: 'risk' }, [el('b', { text: '31% aset' }), el('p', { text: 'Sukuk RM27.5b bersamaan ±31% daripada jumlah aset LTH.' })]),
          el('div', { cls: 'risk' }, [el('b', { text: '26% pendapatan' }), el('p', { text: 'Akruan keuntungan Sukuk menyumbang hampir 26% pendapatan tahunan LTH — melebihi 1/3 daripada agihan tahunan kepada pendeposit.' })]),
          el('div', { cls: 'risk' }, [el('b', { text: 'RM840j/tahun bukan tunai' }), el('p', { text: 'Pendapatan tertunggak (deferred income) RM840j setahun; kumulatif melebihi RM2.1b setakat 31 Dis 2021.' })]),
          el('div', { cls: 'risk' }, [el('b', { text: '2026 & 2029' }), el('p', { text: 'Bayaran pukal matang: Siri 1 (RM13.2b nominal) 2026, Siri 2 (RM14.3b nominal) 2029.' })])
        ]),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Penyelamatan ini mengalihkan risiko daripada LTH kepada Kerajaan — tetapi LTH kini bergantung kepada keupayaan Kerajaan membayar. Jika gagal, LTH kembali terdedah kepada krisis, dan jaminan Kerajaan (s.24 Akta 535, kini RM88b) terpaksa diaktifkan.'),
        bantuan([
          { j: 'Apa yang tidak boleh disimpulkan', i: 'Kegagalan UJSB bukan sesuatu yang pasti berlaku — laporan menekankan ia sebagai risiko yang perlu dipantau, bukan ramalan.' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.ujsb.risiko.src }
    ));

    /* --- ROFR --- */
    frag.appendChild(card(
      'Hak Penolakan Pertama (ROFR): tawaran beli semula',
      'Apabila UJSB mahu melupuskan aset, LTH diberi hak membeli semula — tetapi biasanya pada harga premium.',
      el('div', {}, [
        el('table', { cls: 'tbl small' }, [
          el('thead', {}, [el('tr', {}, [el('th', { text: 'Syarikat' }), el('th', { text: 'Tarikh' }), el('th', { text: 'Tawaran (RM)' }), el('th', { text: 'Pasaran (RM)' }), el('th', { text: 'Premium' })])]),
          el('tbody', {}, D.rofr.map(r =>
            el('tr', {}, [
              el('td', { text: r.nama }),
              el('td', { text: r.tarikh }),
              el('td', { text: r.tawaran.toFixed(3) }),
              el('td', { text: r.pasaran.toFixed(3) }),
              el('td', { html: `<span class="${r.premium > 0 ? 'neg' : 'pos'}">${r.premium > 0 ? '+' : ''}${r.premium.toFixed(1)}%</span>` })
            ])
          ))
        ]),
        el('p', { cls: 'note', text: 'Suruhanjaya: LTH boleh beli saham di pasaran terbuka pada harga lebih rendah berbanding tawaran ROFR. Sebahagian besar tawaran ROFR dilepaskan oleh LTH.' })
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.rofr[0].src }
    ));

    return frag;
  }

  /* ------------------------------------------------------------------ */
  /* PELABURAN — 14 pelaburan bermasalah                                 */
  /* ------------------------------------------------------------------ */
  const KAT = {
    perladangan: ['#0e7a4d', 'Perladangan'],
    hartanah: ['#8a5a2b', 'Hartanah'],
    hotel: ['#7b5dbd', 'Hotel'],
    marin: ['#1b8f97', 'Marin'],
    ekuiti: ['#2f6fbf', 'Ekuiti'],
    dana: ['#d99a2b', 'Dana'],
    infrastruktur: ['#6b7280', 'Infrastruktur']
  };

  function pelaburan() {
    const frag = document.createDocumentFragment();

    frag.appendChild(el('div', { cls: 'sect-head' }, [
      el('h1', { text: '14 Pelaburan Bermasalah' }),
      el('p', { text: 'Suruhanjaya menerima laporan LTH tentang pelaburan bermasalah dan mendapati "wujud transaksi yang mencurigakan dan penyembunyian maklumat". Setiap pelaburan di bawah disyorkan untuk audit forensik.' })
    ]));

    /* KPI ringkas */
    frag.appendChild(el('div', { cls: 'kpis' }, [
      kpi('Pelaburan dikenal pasti', '14', 'Semua disyorkan audit forensik', '#0e7a4d'),
      kpi('Negara terlibat', '4', 'Malaysia, Indonesia, Arab Saudi, Labuan', '#2f6fbf'),
      kpi('Dalam litigasi/timbang tara', '4', 'Emrail, Al-Rawda, Wellspring, THIP', '#c93a3a'),
      kpi('Rosot nilai penuh/hampir penuh', '5', 'Trurich, Wellspring, Al-Fareeda, TH Marine + FGV (diambil UJSB)', '#d99a2b')
    ]));

    /* Filter */
    const listBox = el('div', { cls: 'prob-list' });
    const countBox = el('div', { cls: 'prob-count' });
    function render(filter, q) {
      q = (q || '').toLowerCase();
      const items = D.masalah.filter(m =>
        (!filter || m.kategori === filter) &&
        (!q || (m.nama + ' ' + m.ringkas + ' ' + m.status).toLowerCase().includes(q))
      );
      countBox.textContent = items.length + ' daripada 14 pelaburan';
      listBox.innerHTML = '';
      items.forEach(m => listBox.appendChild(probCard(m)));
    }
    const filterRow = el('div', { cls: 'filter-row' }, [
      el('div', { cls: 'seg' }, [
        (function () {
          const btns = [{ id: '', label: 'Semua' }].concat(Object.keys(KAT).map(k => ({ id: k, label: KAT[k][1] })));
          const box = el('div', { cls: 'seg chips' });
          let aktif = '';
          btns.forEach(o => {
            const b = el('button', { text: o.label, cls: !o.id ? 'on' : '' });
            b.onclick = () => {
              box.querySelectorAll('button').forEach(x => x.classList.remove('on'));
              b.classList.add('on');
              aktif = o.id; render(aktif, searchBox.value);
            };
            box.appendChild(b);
          });
          return box;
        })()
      ]),
      (function () {
        const box = el('div', { cls: 'search' });
        const inp = el('input', { placeholder: 'Cari… (cth. "FGV", "hotel")' });
        box.appendChild(inp);
        inp.oninput = () => render(aktifF, inp.value);
        return box;
      })()
    ]);
    let aktifF = '';
    let searchBox = filterRow.querySelector('input');
    // patch: pastikan render boleh guna search box
    const origRender = render;
    render = function (f, q) {
      aktifF = f;
      q = (q == null ? searchBox.value : q);
      const items = D.masalah.filter(m =>
        (!f || m.kategori === f) &&
        (!q || (m.nama + ' ' + m.ringkas + ' ' + m.status).toLowerCase().includes(q.toLowerCase()))
      );
      countBox.textContent = items.length + ' daripada 14 pelaburan';
      listBox.innerHTML = '';
      items.forEach(m => listBox.appendChild(probCard(m)));
    };
    render('', '');

    frag.appendChild(card(
      'Senarai interaktif',
      'Tapis mengikut sektor atau cari nama. Setiap kad boleh dikembangkan untuk butiran penuh dan sumber.',
      el('div', {}, [filterRow, countBox, listBox]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.masalah[0].src }
    ));

    return frag;
  }

  function probCard(m) {
    const kat = KAT[m.kategori] || ['#6b7280', m.kategori];
    const det = el('div', { cls: 'prob-detail' });
    det.appendChild(el('div', { cls: 'prob-row' }, [el('b', { text: 'Jumlah pelaburan' }), el('span', { text: m.pelaburan })]));
    det.appendChild(el('div', { cls: 'prob-row' }, [el('b', { text: 'Kesan / kerugian' }), el('span', { text: m.kerugian })]));
    det.appendChild(el('div', { cls: 'prob-row' }, [el('b', { text: 'Status kini' }), el('span', { text: m.status })]));
    det.appendChild(el('div', { cls: 'prob-row' }, [el('b', { text: 'Tindakan' }), el('span', { text: m.tindakan })]));
    det.appendChild(srcLine(m.src));

    const cardEl = el('div', { cls: 'prob' });
    cardEl.appendChild(el('div', { cls: 'prob-top' }, [
      el('span', { cls: 'prob-kat', style: 'background:' + kat[0] + '22;color:' + kat[0], text: kat[1] }),
      el('span', { cls: 'prob-neg', text: m.negara })
    ]));
    cardEl.appendChild(el('h4', { text: m.nama }));
    cardEl.appendChild(el('p', { cls: 'prob-ringkas', text: m.ringkas }));
    const btn = el('button', { cls: 'prob-toggle', text: 'Butiran penuh + sumber ▾' });
    btn.onclick = () => {
      const open = det.classList.toggle('open');
      btn.textContent = open ? 'Tutup butiran ▴' : 'Butiran penuh + sumber ▾';
    };
    cardEl.appendChild(btn);
    cardEl.appendChild(det);
    return cardEl;
  }

  /* ------------------------------------------------------------------ */
  /* TADBIR URUS                                                        */
  /* ------------------------------------------------------------------ */
  function tadbir() {
    const frag = document.createDocumentFragment();

    frag.appendChild(el('div', { cls: 'sect-head' }, [
      el('h1', { text: 'Tadbir Urus' }),
      el('p', { text: 'Siapa yang mengurus LTH 2014–2022, berapa banyak jawatan mereka pegang, dan apakah masalah struktur yang ditemui Suruhanjaya.' })
    ]));

    /* Barisan kepimpinan */
    frag.appendChild(card(
      'Barisan kepimpinan LTH (2013–kini)',
      'Pengerusi, Ketua Pegawai Eksekutif, dan Menteri penyelia.',
      el('div', {}, [
        el('h4', { text: 'Pengerusi Lembaga' }),
        el('table', { cls: 'tbl small' }, [
          el('thead', {}, [el('tr', {}, [el('th', { text: 'Nama' }), el('th', { text: 'Tempoh' }), el('th', { text: 'Catatan' })])]),
          el('tbody', {}, D.tadbirUrus.pengerusi.map(p =>
            el('tr', {}, [el('td', { text: p.nama }), el('td', { text: p.mula + ' – ' + p.tamat }), el('td', { text: p.nota })]))
          )
        ]),
        el('h4', { cls: 'mt', text: 'Ketua Pegawai Eksekutif' }),
        el('table', { cls: 'tbl small' }, [
          el('thead', {}, [el('tr', {}, [el('th', { text: 'Nama' }), el('th', { text: 'Tempoh' }), el('th', { text: 'Catatan' })])]),
          el('tbody', {}, D.tadbirUrus.ceo.map(p =>
            el('tr', {}, [el('td', { text: p.nama }), el('td', { text: p.mula + ' – ' + p.tamat }), el('td', { text: p.nota })]))
          )
        ]),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Dua pemimpin diberhentikan awal tanpa sebab diberikan (CEO Hasyudeen, Pengerusi Md Nor) — kuasa s.6(5) Akta 535. Suruhanjaya menilai kedua-duanya sedang melaksanakan penambahbaikan.'),
        bantuan([
          { j: 'Apa yang tidak boleh disimpulkan', i: 'Penamatan bukan bukti salah laku — laporan menekankan proses itu menjejaskan penambahbaikan yang sedang berjalan.' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.tadbirUrus.pengerusi[0].src }
    ));

    /* Penglibatan anak syarikat */
    frag.appendChild(card(
      'Bilangan jawatan anak syarikat yang dipegang serentak',
      'Penglibatan meluas dalam anak syarikat mengurangkan fokus dan menimbulkan konflik kepentingan.',
      el('div', {}, [
        L.hBarChart({
          data: D.tadbirUrus.penglibatan.map(p => ({ label: p.nama, v: p.bil })),
          unit: 'raw', tinggi: 420,
          tipLabel: 'Jawatan',
          fmt: v => v + ' jawatan',
          nota: 'Dasar baharu LTH: had 5 jawatan anak syarikat bagi setiap pemimpin.'
        }),
        el('div', { cls: 'note', text: 'Contoh: Datuk Rozaida (CFO) memegang 23 jawatan sebagai proksi LTH di anak syarikat — daripada Bank Islam hingga hartanah di London (10 Queen Street, Wilton, Marston, Luton, Oxford).' }),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Orang yang sama mengawasi kedua-dua pihak dalam urus niaga (LTH dan anak syarikat) — konflik kepentingan berstruktur. Suruhanjaya mencadangkan had kepada 5 jawatan.'),
        bantuan([
          { j: 'Apa yang tidak boleh disimpulkan', i: 'Bilangan jawatan tidak bersamaan salah laku — tetapi ia menunjukkan beban tugas dan risiko konflik.' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.tadbirUrus.penglibatan[0].src }
    ));

    /* Ahli politik */
    frag.appendChild(card(
      'Ahli politik dalam Lembaga',
      'Laporan menyenaraikan tiga ahli politik yang memegang jawatan Lembaga 2014–2018.',
      el('div', {}, [
        el('table', { cls: 'tbl' }, [
          el('thead', {}, [el('tr', {}, [el('th', { text: 'Nama' }), el('th', { text: 'Jawatan politik' }), el('th', { text: 'Tempoh di LTH' })])]),
          el('tbody', {}, D.tadbirUrus.ahliPolitik.map(a =>
            el('tr', {}, [el('td', { text: a.nama }), el('td', { text: a.jawatan }), el('td', { text: a.tempoh })]))
          )
        ]),
        el('div', { cls: 'quote' }, [
          el('p', { text: '“Penglibatan ahli politik dalam pengurusan LTH telah menimbulkan pelbagai persepsi dalam kalangan masyarakat… ada pihak yang mengambil kesempatan dengan menjadikan keputusan-keputusan Lembaga sebagai bahan kritikan sehingga menjejaskan kredibiliti LTH.”' }),
          el('span', { cls: 'quote-src', text: 'Para 3.2.14' })
        ]),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Suruhanjaya mencadangkan larangan kanun: ahli politik aktif tidak boleh dilantik sebagai Pengerusi/anggota Lembaga dan anak syarikat.'),
        insight('tidak', '<b>Apa yang tidak boleh disimpulkan:</b> Laporan tidak menyatakan ahli politik itu secara peribadi terlibat dalam salah laku — fokusnya pada struktur dan persepsi.' )
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.tadbirUrus.ahliPolitik[0].src }
    ));

    /* Jawatankuasa */
    frag.appendChild(card(
      'Jawatankuasa: dibubar dan diganti',
      'Panel Pelaburan (penjaga kualiti keputusan pelaburan) dibubarkan pada Mei 2018.',
      el('div', {}, [
        el('div', { cls: 'two-col' }, [
          el('div', { cls: 'mini-panel bad' }, [
            el('b', { text: 'Dibubarkan 2018' }),
            el('ul', { cls: 'list' }, D.tadbirUrus.jawatankuasa2018.dibubarkan.map(x => el('li', { text: x })))
          ]),
          el('div', { cls: 'mini-panel good' }, [
            el('b', { text: 'Dicadangkan Suruhanjaya' }),
            el('p', { text: D.tadbirUrus.jawatankuasa2018.saranan })
          ])
        ]),
        el('div', { cls: 'note', text: 'Panel Pelaburan diganti dengan "Exco Perniagaan" yang dipengerusikan Menteri Hal Ehwal Ekonomi — saksi mengakui ia tidak pernah berfungsi. Keputusan pelaburan kemudian bergantung sepenuhnya kepada pengurusan LTH.' }),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Tanpa Panel Pelaburan yang berfungsi, semakan bebas ke atas cadangan pelaburan hilang — selari dengan banyaknya pelaburan bermasalah.'),
        insight('tidak', '<b>Apa yang tidak boleh disimpulkan:</b> Pembubaran Panel Pelaburan tidak semestinya punca semua kerugian — tetapi ia mengeluarkan satu lapisan semakan.' )
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.tadbirUrus.jawatankuasa2018.src }
    ));

    /* Menteri */
    frag.appendChild(card(
      'Menteri penyelia dan kepakaran',
      'Empat Menteri Hal Ehwal Agama menyelia LTH sepanjang tempoh siasatan.',
      el('div', {}, [
        el('table', { cls: 'tbl small' }, [
          el('thead', {}, [el('tr', {}, [el('th', { text: 'Menteri' }), el('th', { text: 'Tempoh' })])]),
          el('tbody', {}, D.tadbirUrus.menteri.map(m =>
            el('tr', {}, [el('td', { text: m.nama }), el('td', { text: m.mula + ' – ' + m.tamat })]))
          )
        ]),
        el('div', { cls: 'note', text: 'Suruhanjaya mendapati kepakaran Menteri Hal Ehwal Agama terhad kepada bidang agama, tetapi kuasa Akta 535 meliputi dana dan pelaburan. Semua Menteri mengaku bergantung sepenuhnya kepada cadangan pengurusan LTH — tiada input pihak ketiga.' }),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Cadangan utama: bahagikan kuasa — Menteri Hal Ehwal Agama (haji), Menteri Kewangan (kewangan & pelaburan).')
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.tadbirUrus.menteri[0].src }
    ));

    return frag;
  }

  /* ------------------------------------------------------------------ */
  /* HAJI — kos haji & HAFIS                                             */
  /* ------------------------------------------------------------------ */
  function haji() {
    const frag = document.createDocumentFragment();

    frag.appendChild(el('div', { cls: 'sect-head' }, [
      el('h1', { text: 'Kos Haji & Subsidi (HAFIS)' }),
      el('p', { text: 'Bayaran haji dibekukan pada RM9,980 selama 13 tahun (2009–2021) sementara kos sebenar naik setiap tahun. Perbezaannya ditanggung oleh LTH — daripada keuntungan pelaburan yang sepatutnya menjadi hibah pendeposit.' })
    ]));

    frag.appendChild(el('div', { cls: 'kpis' }, [
      kpi('Kos haji 2022', 'RM25,540', 'Bagi setiap jemaah Muassasah', '#c93a3a'),
      kpi('Bayaran jemaah 2022', 'RM12,980', 'Bukan B40 (B40: RM10,980)', '#0e7a4d'),
      kpi('HAFIS 2014 → 2019', 'RM106j → RM299j', '+182% dalam 5 tahun', '#d99a2b'),
      kpi('HAFIS unjuran 2030', 'RM742.47 juta', '65.6% daripada kos haji', '#7b5dbd')
    ]));

    /* Actual 2014-2019 */
    frag.appendChild(card(
      'Kos vs bayaran vs subsidi (2014–2019)',
      'RM seorang · kawasan hijau = bayaran jemaah; kawasan merah = subsidi (HAFIS) yang ditanggung LTH.',
      el('div', {}, [
        L.barChart({
          data: D.hafis.map(d => ({ label: String(d.y), Bayaran: d.bayaran, 'Subsidi (HAFIS)': d.hafis })),
          keys: [{ k: 'Bayaran', nama: 'Bayaran jemaah (RM)', warna: L.W.hijau }, { k: 'Subsidi (HAFIS)', nama: 'Subsidi HAFIS (RM)', warna: L.W.merah }],
          unit: 'raw', tinggi: 300, mode: 'stacked', legend: true,
          fmt: v => 'RM' + ribuInt(v)
        }),
        el('div', { cls: 'note', text: '2014: kos RM16,155 — jemaah bayar RM9,980 (62%), LTH subsidi RM6,175 (38%). 2019: kos RM22,900 — jemaah bayar RM9,980 (44%), subsidi RM12,920 (56%). 2020 & 2021: tiada penghantaran jemaah (Covid-19).' }),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Bahagian subsidi meningkat dari 38% ke 56% dalam 5 tahun — beban semakin besar pada setiap jemaah.'),
        bantuan([
          { j: 'Apa yang tidak boleh disimpulkan', i: 'Jumlah RM juta dalam laporan (106, 135, 160, 298, 314, 299) bergantung pada bilangan jemaah setiap tahun — bukan kadar tetap.' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.hafis[0].src }
    ));

    /* Kos unjuran */
    frag.appendChild(card(
      'Unjuran kos haji 2022–2030 (laporan LTH)',
      'Kos seorang jemaah dijangka naik RM25,540 → RM37,729. Laporan juga menyebut ±RM35,000 (2030) dan RM50,000 (2050).',
      el('div', {}, [
        L.lineChart({
          data: D.kosUnjuran.map(d => ({ label: String(d.y), v: d.kos })),
          unit: 'raw', tinggi: 260, warna: L.W.merah, titik: true,
          fmt: v => 'RM' + ribuInt(v)
        }),
        insight('tidak', '<b>Apa yang tidak boleh disimpulkan:</b> Ini unjuran LTH dalam laporan, bukan ramalan bebas. Kos sebenar bergantung kepada dasar Arab Saudi dan kadar tukaran.'),
        bantuan([
          { j: 'Apa yang ditunjukkan', i: 'Jadual unjuran kos haji LTH 2022–2030 (para 3.16.2). Angka 2050 (RM50,000) disebut berasingan dalam para 3.16.1.' }
        ])
      ]),
      { badge: 'U', badgeText: 'Unjuran dalam laporan', src: D.kosUnjuran[0].src }
    ));

    /* HAFIS projection */
    frag.appendChild(card(
      'Unjuran HAFIS 2022–2030 (dengan bayaran baharu RM12,980)',
      'Walaupun bayaran haji dinaikkan, subsidi masih meningkat — dan bahagiannya mencecah 65.6% pada 2030.',
      el('div', {}, [
        L.barChart({
          data: D.hafisUnjuran.map(d => ({ label: String(d.y), 'Jumlah HAFIS': d.jumlah / 1000 })),
          keys: [{ k: 'Jumlah HAFIS', nama: 'HAFIS (RM juta)', warna: L.W.ungu }],
          unit: 'j', tinggi: 300
        }),
        el('div', { cls: 'note', text: 'Bahagian subsidi daripada kos haji: 49.2% (2022) → 65.6% (2030). Laporan: RM400j setahun bersamaan pengurangan ±0.4% daripada kadar hibah.' }),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Subsidi haji bertukar menjadi "cukai senyap" ke atas pendeposit: RM400j setahun ≈ 0.4% daripada kadar hibah yang boleh dibayar.'),
        insight('tidak', '<b>Apa yang tidak boleh disimpulkan:</b> Jumlah RM juta diandaikan 30,000 jemaah setahun (kuota semasa). Jika kuota naik ke 60,000 (2030), jumlahnya berbeza.' )
      ]),
      { badge: 'U', badgeText: 'Unjuran dalam laporan', src: D.hafisUnjuran[8].src }
    ));

    /* Penyelesaian cadangan */
    frag.appendChild(card(
      'Cadangan Suruhanjaya & impaknya',
      'Bagaimana mengurangkan masa menunggu haji dan beban subsidi.',
      el('div', {}, [
        el('div', { cls: 'dual' }, [
          el('div', { cls: 'dual-item' }, [
            el('b', { cls: 'dual-t', text: 'Kini' }),
            el('p', { text: 'Daftar haji: simpanan minimum RM1,300' }),
            el('p', { text: 'Masa menunggu giliran: 130–135 tahun' }),
            el('p', { text: 'Subsidi: semua jemaah Muassasah' })
          ]),
          el('div', { cls: 'dual-item ok' }, [
            el('b', { cls: 'dual-t', text: 'Cadangan' }),
            el('p', { text: 'Daftar haji: simpanan penuh RM12,980' }),
            el('p', { text: 'Masa menunggu: ±33 tahun' }),
            el('p', { text: 'Subsidi: hanya yang memerlukan' })
          ])
        ]),
        el('p', { cls: 'note', text: 'Deposit minimum naik akan menggalak tabungan berdisiplin; pengeluaran besar perlu notis sebulan; subsidi mengikut prinsip istito’ah (mampu sahaja diwajibkan).' }),
        insight('ya', '<b>Yang boleh disimpulkan:</b> 65% pendeposit ada RM2,000 atau kurang — dengan had daftar baharu, mereka digalak menabung lebih serius. Kuota haji Malaysia ±30,000 kini, disasarkan 60,000 menjelang 2030.')
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.haji.src }
    ));

    return frag;
  }

  function ribuInt(n) { return Math.round(n).toLocaleString('ms-MY'); }

  /* ------------------------------------------------------------------ */
  /* BONUS                                                               */
  /* ------------------------------------------------------------------ */
  function bonus() {
    const frag = document.createDocumentFragment();

    frag.appendChild(el('div', { cls: 'sect-head' }, [
      el('h1', { text: 'Bonus' }),
      el('p', { text: 'Kakitangan LTH menerima bonus sehingga 13 bulan gaji pada 2014 — pada tahun yang sama kedudukan aset sudah kurang daripada liabiliti. Bahagian ini membandingkan bonus dengan keuntungan dan melihat bonus istimewa TH Properties.' })
    ]));

    frag.appendChild(el('div', { cls: 'kpis' }, [
      kpi('Bonus tertinggi (2014)', '13 bulan gaji', '1–11 bulan (tahunan) + 2 bulan (khas) · RM74j', '#c93a3a'),
      kpi('Bonus 2018–2020', '1 bulan', 'Selepas penstrukturan — dikawal kemampuan', '#0e7a4d'),
      kpi('Bonus TH Properties 2017–18', 'RM2.19 juta', '11 + 10 penerima · tanpa kelulusan LTH', '#d99a2b'),
      kpi('Kadar 2014 = 2.5% keuntungan', 'RM74j / RM2,979j', 'Keuntungan bersih tahun 2014', '#2f6fbf')
    ]));

    /* Bonus vs profit */
    frag.appendChild(card(
      'Bonus vs keuntungan bersih (2013–2017)',
      'RM juta · LTH membayar bonus tinggi walaupun aset < liabiliti (2015–2017).',
      el('div', {}, [
        L.barChart({
          data: D.bonusProfit.map(d => ({ label: String(d.y), 'Keuntungan bersih': d.untung, Bonus: d.bonus })),
          keys: [{ k: 'Keuntungan bersih', nama: 'Keuntungan bersih (RM juta)', warna: L.W.hijau }, { k: 'Bonus', nama: 'Peruntukan bonus (RM juta)', warna: L.W.ambar }],
          unit: 'j', tinggi: 300, legend: true
        }),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Justifikasi bonus adalah keuntungan tinggi — tetapi keuntungan itu dikira menggunakan RAV (nilai anggaran pengurusan), bukan penyata diaudit. Pada 2017, LTH membayar RM57j bonus pada tahun yang PwC kira rugi RM1.4b.'),
        bantuan([
          { j: 'Apa yang tidak boleh disimpulkan', i: 'Keuntungan bersih di sini adalah seperti dilaporkan LTH (jadual 3.12.10) — bukan angka terlaras PwC.' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.bonusProfit[0].src }
    ));

    /* Bonus allocation 2010-2020 */
    frag.appendChild(card(
      'Peruntukan bonus 2010–2020 (RM juta)',
      'Dari 13 bulan (2014) kepada 1 bulan (2018–2020).',
      el('div', {}, [
        L.barChart({
          data: D.bonus.map(d => ({ label: String(d.y), Bonus: d.peruntukan })),
          keys: [{ k: 'Bonus', nama: 'Peruntukan bonus (RM juta)', warna: L.W.ambar }],
          unit: 'j', tinggi: 280,
          maks: 80
        }),
        el('table', { cls: 'tbl small' }, [
          el('thead', {}, [el('tr', {}, [el('th', { text: 'Tahun' }), el('th', { text: 'Peruntukan (RMj)' }), el('th', { text: 'Kadar dilulus MOF' }), el('th', { text: 'Agihan mengikut KPI' })])]),
          el('tbody', {}, D.bonus.map(b =>
            el('tr', {}, [el('td', { text: String(b.y) }), el('td', { text: b.peruntukan.toLocaleString('ms-MY') }), el('td', { text: b.dilulus + ' bulan' }), el('td', { text: b.agihan + ' bulan' })]))
          )
        ]),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Sejak 2018 bonus dikawal kepada 1 bulan — selari dengan kemampuan LTH selepas penstrukturan.'),
        bantuan([
          { j: 'Apa yang tidak boleh disimpulkan', i: 'Peruntukan bonus (RM) tidak menunjukkan bonus setiap individu — ia jumlah keseluruhan.' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.bonus[4].src }
    ));

    /* TH Properties bonus — interactive */
    function bonusList(b, warna) {
      const box = el('div', { cls: 'bonus-table' });
      box.appendChild(el('div', { cls: 'bonus-head' }, [
        el('b', { text: 'Bonus istimewa ' + b.tahun }),
        el('span', { text: 'Jumlah: RM' + b.jumlah.toLocaleString('ms-MY') })
      ]));
      box.appendChild(el('p', { cls: 'note', text: b.sumber }));
      const rows = el('div', { cls: 'bonus-rows' });
      b.penerima.forEach(p => {
        rows.appendChild(el('div', { cls: 'bonus-row' }, [
          el('span', { text: p.nama }),
          el('b', { text: 'RM' + p.jumlah.toLocaleString('ms-MY') })
        ]));
      });
      box.appendChild(rows);
      box.appendChild(el('div', { cls: 'exbox neg' }, [
        el('b', { text: 'Kelulusan' }),
        el('p', { text: b.kelulusan })
      ]));
      box.appendChild(srcLine(b.src));
      return box;
    }

    frag.appendChild(card(
      'Bonus istimewa TH Properties (2017 & 2018)',
      'RM2.19 juta dibayar kepada 11 + 10 penerima — tanpa kelulusan LTH sebagai pemegang saham utama.',
      el('div', {}, [
        (function () {
          const box = el('div');
          box.appendChild(bonusList(D.thpBonus2017));
          const btn = el('button', { cls: 'btn', text: 'Tukar ke bonus 2018 →' });
          btn.onclick = () => {
            box.innerHTML = '';
            box.appendChild(bonusList(D.thpBonus2018));
            btn.textContent = 'Tukar ke bonus 2017 ←';
            btn.onclick = () => {
              box.innerHTML = '';
              box.appendChild(bonusList(D.thpBonus2017));
              btn.textContent = 'Tukar ke bonus 2018 →';
            };
          };
          box.appendChild(btn);
          return box;
        })(),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Firma guaman MD Tajuddin & Co mengesahkan kelulusan bonus ini melanggar Akta Syarikat 2016 (s.230). Suruhanjaya mencadangkan usaha mendapatkan semula wang itu.'),
        insight('tidak', '<b>Apa yang tidak boleh disimpulkan:</b> Penerima belum disabitkan salah — ini penemuan tadbir urus dan pelanggaran peraturan, bukan keputusan mahkamah.' )
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.thpBonus2017.src }
    ));

    return frag;
  }

  /* ------------------------------------------------------------------ */
  /* SIASATAN & PENGUATKUASAAN                                           */
  /* ------------------------------------------------------------------ */
  function siasatan() {
    const frag = document.createDocumentFragment();

    frag.appendChild(el('div', { cls: 'sect-head' }, [
      el('h1', { text: 'Siasatan & Penguatkuasaan' }),
      el('p', { text: 'Selepas perubahan pengurusan (Julai 2018), LTH membuat laporan polis, melapor kepada SPRM, mengambil tindakan tatatertib, dan membawa pertikaian ke mahkamah/timbang tara.' })
    ]));

    /* Laporan polis */
    frag.appendChild(card(
      '4 laporan polis (2018–2019)',
      'Semua dibuat selepas pengurusan baharu mengambil alih.',
      el('div', {}, [
        el('table', { cls: 'tbl small' }, [
          el('thead', {}, [el('tr', {}, [el('th', { text: 'Tarikh' }), el('th', { text: 'Kes' }), el('th', { text: 'Status' })])]),
          el('tbody', {}, D.penguatkuasaan.laporanPolis.map(l =>
            el('tr', {}, [
              el('td', { text: l.tarikh }),
              el('td', { html: esc(l.kes) + `<div class="sub">${esc(l.rujukan)}</div>` }),
              el('td', { text: l.status })
            ]))
          )
        ]),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Dua kertas siasatan dirujuk ke Jabatan Peguam Negara; dua lagi (rentas sempadan Indonesia) masih berjalan. Suruhanjaya: pihak berkuasa wajib bertindak tegas dan segera.'),
        bantuan([
          { j: 'Apa yang tidak boleh disimpulkan', i: 'Laporan polis ≠ pertuduhan. Status terkini laporan ialah setakat masa laporan RCI ditulis (2022).' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.penguatkuasaan.laporanPolis[0].src }
    ));

    /* SPRM */
    frag.appendChild(card(
      '6 perkara dilaporkan kepada SPRM',
      'Semua siasatan SPRM masih berjalan pada masa laporan ditulis.',
      el('div', {}, [
        el('ul', { cls: 'list' }, D.penguatkuasaan.sprm.map(x => el('li', { text: x }))),
        insight('tidak', '<b>Apa yang tidak boleh disimpulkan:</b> Dakwaan belum disiasat sepenuhnya — laporan meminta SPRM diberi ruang menyiapkan siasatan.')
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: { s: '3.15.21', p: 201, url: 'https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md#pdf-page-201' } }
    ));

    /* Tatatertib */
    frag.appendChild(card(
      'Tindakan tatatertib: 5 pegawai pengurusan',
      '4 kluster isu · proses mengambil masa 10–19 bulan · hukuman kebanyakannya dikurangkan selepas rayuan.',
      el('div', {}, [
        el('h4', { text: 'Pegawai terlibat' }),
        el('ul', { cls: 'list' }, D.penguatkuasaan.tatatertib.pegawai.map(x => el('li', { text: x }))),
        el('h4', { cls: 'mt', text: 'Kluster isu & keputusan' }),
        el('table', { cls: 'tbl small' }, [
          el('thead', {}, [el('tr', {}, [el('th', { text: 'Kluster' }), el('th', { text: 'Isu' }), el('th', { text: 'Keputusan' }), el('th', { text: 'Tempoh' })])]),
          el('tbody', {}, D.penguatkuasaan.tatatertib.kluster.map(k =>
            el('tr', {}, [el('td', { text: k.nama }), el('td', { text: k.isu }), el('td', { text: k.keputusan }), el('td', { text: k.tempoh })]))
          )
        ]),
        el('div', { cls: 'note', text: D.penguatkuasaan.tatatertib.hasil }),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Proses tatatertib terlalu lama (10–19 bulan) dan hukuman awal (buang kerja) hampir semuanya diringankan kepada turun pangkat/amaran selepas rayuan — semua pegawai masih berkhidmat. Suruhanjaya mahu proses diperkemas.'),
        bantuan([
          { j: 'Apa yang tidak boleh disimpulkan', i: 'Laporan tidak menilai kesahihan setiap keputusan tatatertib — ia menilai kepantasan dan keberkesanan proses.' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: D.penguatkuasaan.tatatertib.src }
    ));

    /* Mahkamah */
    frag.appendChild(card(
      'Pertikaian di mahkamah & timbang tara',
      'Transaksi yang bertukar menjadi pertikaian undang-undang.',
      el('div', {}, [
        el('table', { cls: 'tbl small' }, [
          el('thead', {}, [el('tr', {}, [el('th', { text: 'Kes' }), el('th', { text: 'Bentuk' }), el('th', { text: 'Status' })])]),
          el('tbody', {}, D.penguatkuasaan.mahkamah.map(m =>
            el('tr', {}, [el('td', { text: m.kes }), el('td', { text: m.bentuk }), el('td', { text: m.status })]))
          )
        ]),
        insight('ya', '<b>Yang boleh disimpulkan:</b> Suruhanjaya mencadangkan pertikaian dipantau rapat oleh Lembaga, dan penyelesaian luar mahkamah dipertingkatkan.'),
        bantuan([
          { j: 'Apa yang tidak boleh disimpulkan', i: 'Status kes boleh berubah selepas laporan diterbitkan.' }
        ])
      ]),
      { badge: 'F', badgeText: 'Fakta laporan', src: { s: '3.15.23', p: 202, url: 'https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md#pdf-page-202' } }
    ));

    return frag;
  }

  /* ------------------------------------------------------------------ */
  /* SUMBER & GLOSARI                                                    */
  /* ------------------------------------------------------------------ */
  function sumber() {
    const frag = document.createDocumentFragment();

    frag.appendChild(el('div', { cls: 'sect-head' }, [
      el('h1', { text: 'Sumber & Glosari' }),
      el('p', { text: 'Setiap angka dalam dashboard ini boleh dijejak ke laporan asal. Glosari menerangkan istilah teknikal dalam bahasa mudah.' })
    ]));

    /* Glosari */
    frag.appendChild(card(
      'Glosari: istilah dalam bahasa mudah',
      'Sentuh/senarai istilah untuk memahami istilah kewangan dan perakaunan yang digunakan dalam laporan.',
      el('div', { cls: 'glos' }, D.glosari.map(g =>
        el('div', { cls: 'glos-item' }, [
          el('b', { text: g.istilah }),
          el('p', { text: g.maksud })
        ])
      ))
    ));

    /* Penanda jenis data */
    frag.appendChild(card(
      'Bagaimana membaca penanda data',
      'Setiap carta ditanda dengan jenis data untuk membezakan fakta, terbitan, unjuran dan simulasi.',
      el('div', { cls: 'jleg' }, [
        el('div', { cls: 'jleg-item' }, [el('span', { cls: 'jbadge fakta', text: 'Fakta laporan' }), el('p', { text: 'Angka terus daripada laporan RCI.' })]),
        el('div', { cls: 'jleg-item' }, [el('span', { cls: 'jbadge terbit', text: 'Terbitan data laporan' }), el('p', { text: 'Dikira/diterbitkan daripada angka laporan (cth. perbezaan, peratusan).' })]),
        el('div', { cls: 'jleg-item' }, [el('span', { cls: 'jbadge unjur', text: 'Unjuran dalam laporan' }), el('p', { text: 'Unjuran yang direkodkan dalam laporan — bukan ramalan kami.' })]),
        el('div', { cls: 'jleg-item' }, [el('span', { cls: 'jbadge simul', text: 'Simulasi/ilustrasi' }), el('p', { text: 'Ilustrasi untuk penjelasan — jelas ditanda jika wujud.' })])
      ]),
      el('div', { cls: 'note', text: 'Nota penting: dashboard ini TIDAK mencipta data. Semua nilai bersumberkan laporan; apa-apa pengiraan tambahan ditanda sebagai terbitan.' })
    ));

    /* Senarai sumber utama */
    frag.appendChild(card(
      'Peta sumber utama laporan',
      'Seksyen rujukan utama yang digunakan dalam dashboard ini.',
      el('div', { cls: 'srclist' }, [
        ['3.2', 'Tadbir urus: anggota Lembaga, kuasa Menteri, ahli politik', 69],
        ['3.5', 'Jawatankuasa: Panel Pelaburan, JPS, Urusan Haji', 91],
        ['3.6', 'Kawal selia BNM', 99],
        ['3.7', 'Pengurusan deposit: perlindungan, zakat, risiko tertumpu', 102],
        ['3.9', 'Hibah: kadar, jumlah, RAV, polisi rosot nilai', 112],
        ['3.11', 'Penyata kewangan diaudit JAN', 125],
        ['3.12', 'Bonus kakitangan & TH Properties', 135],
        ['3.13', 'Pelan pemulihan 2018 & UJSB', 145],
        ['3.14', 'Pelaburan bermasalah (14) & audit forensik', 176],
        ['3.15', 'Laporan polis, SPRM, tatatertib, mahkamah', 193],
        ['3.16', 'Tanggungan HAFIS & unjuran kos haji', 203],
        ['3.17', 'Penambahbaikan LTH 2017–2022', 210],
        ['3.18', 'Pandangan Suruhanjaya: struktur Dana Haji', 221],
        ['4', 'Rumusan & syor akhir', 229]
      ].map(r =>
        el('a', { cls: 'srcitem', href: D.meta.pengenalan.url.replace('#pdf-page-43', '#pdf-page-' + r[2]), target: '_blank', rel: 'noopener' }, [
          el('b', { text: r[0] }),
          el('span', { text: r[1] }),
          el('small', { text: 'm/s PDF ' + r[2] + ' ↗' })
        ])
      ))
    ));

    return frag;
  }

  return { ringkasan, krisis, ujsb, pelaburan, tadbir, haji, bonus, siasatan, sumber };
})();
