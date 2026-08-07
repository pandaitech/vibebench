/* ===========================================================================
   PAPARAN 1 — Ringkasan · Jurang · Tuas perakaunan · Hibah
   =========================================================================== */
(function () {
  'use strict';
  var R = window.RCI, U = window.UI, C = window.Ch;
  var V = window.VIEWS = window.VIEWS || {};

  /* ====================================================== RINGKASAN ====== */
  V.ringkasan = {
    label: 'Ringkasan',
    title: 'Apa sebenarnya berlaku kepada Tabung Haji?',
    render: function (root) {
      var h = '';

      h += '<div class="sec-head">' +
        '<div class="eyebrow">Laporan RCI Tabung Haji · 240 muka surat · 19 Julai 2022</div>' +
        '<h2>Apa sebenarnya berlaku kepada Tabung Haji?</h2>' +
        '<p class="lede">Papan ini membongkar semula angka-angka dalam laporan Suruhanjaya Siasatan Diraja. ' +
        'Setiap nombor boleh diklik kembali ke muka surat asalnya. Tiada angka direka — apa yang kami kira sendiri ' +
        'sentiasa ditanda sebagai <span class="tag accent">terbitan</span>.</p></div>';

      // Cerita ringkas
      h += '<div class="card"><h3>Cerita dalam lima ayat</h3>' +
        '<div class="sub">Bahasa mudah, tanpa mengubah maksud laporan.</div>' +
        '<ol style="margin:0;padding-left:20px;font-size:14.4px;line-height:1.62">' +
        '<li style="margin-bottom:7px">Antara 2014–2017, Tabung Haji membayar <b>hibah lebih besar daripada keuntungan sebenar</b> — sehingga aset jatuh di bawah jumlah wang yang dihutang kepada pendeposit.</li>' +
        '<li style="margin-bottom:7px">Supaya bayaran itu kelihatan sah, nilai aset <b>dinaikkan menggunakan anggaran sendiri (RAV)</b> dan dasar mengaku kerugian aset (<i>rosot nilai</i>) dilonggarkan dua kali dalam satu tahun.</li>' +
        '<li style="margin-bottom:7px">Ketua Audit Negara mengesan masalah ini tetapi tetap memberi <b>Sijil Audit Bersih</b> — atas kebimbangan kesan kepada persepsi pendeposit, bukan atas alasan teknikal audit.</li>' +
        '<li style="margin-bottom:7px">Pada penghujung 2018, Kerajaan memindahkan aset lemah bernilai pasaran RM9.7 bilion kepada sebuah syarikat khas (UJSB) pada harga <b>RM19.9 bilion</b> — masalah TH bertukar menjadi obligasi Kerajaan RM27.5 bilion yang matang pada 2026 dan 2029.</li>' +
        '<li>Pada masa sama, kos subsidi haji terus naik. Menjelang 2030 ia dijangka menelan <b>65.6% daripada kos haji</b> setiap jemaah.</li>' +
        '</ol></div>';

      // KPI
      h += '<div class="grid g4" style="margin-bottom:14px">';
      R.SOROTAN.forEach(function (s, i) {
        h += '<button class="kpi ' + s.nada + '" data-go="' + s.ke + '">' +
          '<span class="v">' + U.esc(s.nilai) + '</span>' +
          '<span class="l">' + U.esc(s.label) + (s.terbitan ? ' <span class="tag accent" style="vertical-align:1px">terbitan</span>' : '') + '</span>' +
          '<span class="t">' + U.esc(s.teks) + '</span></button>';
      });
      h += '</div>';

      // Rantaian sebab
      h += '<div class="card"><h3>Rantaian sebab–akibat</h3>' +
        '<div class="sub">Setiap kotak adalah penemuan laporan, bukan tafsiran kami. Klik untuk pergi ke bahagian penuh.</div>' +
        '<div class="grid g3">' +
        chainCard('1', 'Tekanan untuk bayar hibah tinggi', 'Hibah tinggi menarik pendeposit besar. Laporan menyebut tekanan politik dan persaingan dengan ASB/KWSP sebagai pendorong.', 'hibah', R.HIBAH.srcKadar) +
        chainCard('2', 'Perakaunan "kreatif"', 'RAV menokok RM4.47 bilion kepada nilai aset 2017. Dasar rosot nilai diubah 70% → 85% → 90%.', 'tuas', R.RAV.src) +
        chainCard('3', 'Pengawal selia tidak tegas', 'Sijil Audit Bersih diberi walaupun dua penemuan material dibangkitkan. Surat amaran BNM sejak 2014 tidak diberi perhatian.', 'orang', { pdf: 134, ms: '96' }) +
        chainCard('4', 'Jurang aset–liabiliti terbuka', 'Daripada lebihan +RM2.45 bilion (2013) kepada kekurangan −RM4.09 bilion (2017).', 'jurang', R.KEWANGAN.src) +
        chainCard('5', 'Risiko dipindah kepada Kerajaan', 'Aset lemah dijual kepada UJSB pada premium RM10.2 bilion. Sukuk RM27.5 bilion kini komitmen jaminan Kerajaan.', 'ujsb', R.UJSB.src) +
        chainCard('6', 'Masalah struktur belum selesai', 'Subsidi haji, pendapatan tanpa tunai RM840 juta setahun, dan 14 pelaburan bermasalah masih menunggu penyelesaian.', 'haji', R.HAJI.srcUnjuran) +
        '</div></div>';

      // Carta mini jurang
      h += U.card('Satu carta yang merangkumi keseluruhan cerita',
        'Lajur = lebihan/kekurangan aset berbanding liabiliti selepas hibah diagihkan (RM juta)',
        U.chartBox('ch-ring-gap') +
        U.reading({
          apa: 'Setiap lajur ialah baki aset tolak liabiliti pada hujung tahun, <b>selepas</b> hibah dibayar. Hijau bermakna aset melebihi liabiliti; merah bermakna sebaliknya.',
          kenapa: 'Seksyen 22 Akta 535 hanya membenarkan hibah diagihkan apabila aset <b>tidak kurang</b> daripada liabiliti. Lajur merah bermakna syarat ini tidak dipenuhi.',
          simpul: 'Kedudukan bertukar negatif seawal 2014 dan kekal negatif sehingga 2017. Ia bukan kejutan satu tahun.',
          hati: 'Carta ini <b>bukan</b> untung rugi tahunan, dan <b>tidak</b> bermakna wang pendeposit hilang — deposit dijamin Kerajaan di bawah seksyen 24 Akta 535.'
        }), R.KEWANGAN.src);

      // Cara guna
      h += '<div class="card"><h3>Cara membaca papan ini</h3><div class="grid g2">' +
        '<div>' + U.note('baca', 'Label kepastian', '<span class="tag">laporan</span> angka tersurat dalam laporan · ' +
          '<span class="tag accent">terbitan</span> dikira oleh kami daripada angka laporan (formula sentiasa ditunjuk) · ' +
          '<span class="tag warn">simulasi</span> hasil andaian anda, bukan fakta.') + '</div>' +
        '<div>' + U.note('penting', 'Jejak ke sumber', 'Setiap pautan <span class="src">ms 109</span> membuka teks asal laporan pada muka surat berkenaan di GitHub.') + '</div>' +
        '</div>' +
        '<div style="margin-top:12px">' + U.note('hati', 'Batasan yang perlu diketahui',
          '<ul style="margin:6px 0 0;padding-left:18px">' + R.BATASAN.slice(0, 4).map(function (b) { return '<li style="margin-bottom:3px">' + U.esc(b) + '</li>'; }).join('') +
          '</ul><div style="margin-top:6px"><a class="src" href="#sumber" data-go="sumber">Lihat semua batasan &amp; percanggahan dalam laporan</a></div>') + '</div></div>';

      root.innerHTML = h;

      C.bars(root.querySelector('#ch-ring-gap'), {
        cats: R.KEWANGAN.tahun.map(String),
        series: [{
          name: 'Lebihan / (kekurangan) selepas agihan', color: C.css('--c1'),
          colorFn: posNeg, data: R.KEWANGAN.selepasAgihan
        }],
        height: 230, valueLabels: true, ticks: 4,
        fmtV: function (v) { return U.n(v); },
        tipTitle: function (c) { return 'Tahun ' + c; },
        tipExtra: function (i) {
          return '<div class="r"><span>Aset</span><span>' + U.n(R.KEWANGAN.aset[i]) + '</span></div>' +
            '<div class="r"><span>Liabiliti</span><span>' + U.n(-R.KEWANGAN.liabiliti[i]) + '</span></div>' +
            '<div class="r"><span>Hibah diagih</span><span>' + U.n(-R.KEWANGAN.agihan[i]) + '</span></div>';
        }
      });
    }
  };

  function posNeg(v) { return v >= 0 ? C.css('--c4') : C.css('--c1'); }

  function chainCard(no, title, body, go, s) {
    return '<button class="kpi" data-go="' + go + '" style="gap:6px">' +
      '<span class="tag accent">Langkah ' + no + '</span>' +
      '<span class="l" style="font-size:14px">' + U.esc(title) + '</span>' +
      '<span class="t">' + U.esc(body) + '</span>' +
      '<span class="mini" style="margin-top:2px">' + U.src(s) + '</span></button>';
  }

  /* ========================================================= JURANG ====== */
  V.jurang = {
    label: 'Jurang',
    title: 'Jurang aset dan liabiliti',
    render: function (root) {
      var K = R.KEWANGAN;
      var lebihBayar = K.tahun.map(function (_, i) { return K.agihan[i] - Math.max(0, K.sebelumAgihan[i]); });
      var jum1417 = K.agihan.slice(1).reduce(function (a, b) { return a + b; }, 0);
      var lebihan1417 = K.sebelumAgihan.slice(1).reduce(function (a, b) { return a + Math.max(0, b); }, 0);

      var h = '<div class="sec-head"><div class="eyebrow">Bab 3.9 &amp; 3.13 · analisa PwC</div>' +
        '<h2>Jurang aset dan liabiliti</h2>' +
        '<p class="lede">Undang-undang membenarkan Tabung Haji mengagih untung hanya jika aset tidak kurang daripada ' +
        'liabiliti. Bahagian ini menunjukkan bila syarat itu mula gagal, dan berapa besar jurangnya.</p></div>';

      h += '<div class="callout neg"><b class="h">Angka teras</b>' +
        'Antara 2014 dan 2017, Tabung Haji mengagihkan <b>' + U.rmJuta(jum1417) + '</b> sebagai hibah. ' +
        'Dalam tempoh yang sama, lebihan sebenar sebelum agihan hanya berjumlah <b>' + U.rmJuta(lebihan1417) + '</b>. ' +
        '<span class="tag accent">terbitan</span> — jumlah baris "Tolak: Pengagihan keuntungan" dan baris "lebihan sebelum agihan" ' +
        'daripada jadual PwC (' + U.src(K.src) + ').</div>';

      h += U.card('Aset, liabiliti dan agihan hibah',
        'Semua nilai RM juta. Guna butang untuk menukar perspektif.',
        '<div class="ctrl"><div class="ctrl-row"><label>Papar sebagai</label>' +
        U.seg('mode', [
          { v: 'al', l: 'Aset lwn liabiliti' },
          { v: 'gap', l: 'Jurang sahaja' },
          { v: 'flow', l: 'Lebihan lwn agihan' }
        ], 'al') + '</div></div>' +
        U.chartBox('ch-jurang') +
        '<div id="lg-jurang"></div>' +
        U.reading({
          apa: '<span data-r="al">Lajur biru = jumlah aset, lajur merah = jumlah liabiliti (termasuk simpanan pendeposit). Garisan = jurang antara keduanya <b>sebelum</b> hibah dibayar.</span>' +
            '<span data-r="gap" class="hidden">Jurang bersih pada hujung tahun selepas hibah dibayar.</span>' +
            '<span data-r="flow" class="hidden">Lajur kelabu = lebihan sebenar yang ada untuk diagihkan. Lajur merah = hibah yang benar-benar dibayar.</span>',
          kenapa: 'Ini ujian undang-undang yang sebenar. Jika lajur agihan lebih tinggi daripada lebihan, bayaran itu datang daripada wang pendeposit sendiri — bukan daripada keuntungan.',
          simpul: 'Pada 2015 lebihan hanya RM134 juta tetapi hibah RM3,220 juta dibayar. Pada 2016 dan 2017, lebihan sudah negatif sebelum sesen pun diagihkan.',
          hati: 'Angka ini datang daripada <i>financial review</i> PwC yang menggunakan piawaian perakaunan penuh. Ia berbeza daripada angka yang dibentangkan LTH sendiri pada masa itu — perbezaan itu diterangkan dalam bahagian <a href="#tuas" data-go="tuas">Tuas perakaunan</a>.'
        }), K.src);

      // Jadual penuh
      var rows = K.tahun.map(function (t, i) {
        return {
          t: t, aset: K.aset[i], lia: -K.liabiliti[i], seb: K.sebelumAgihan[i],
          agih: -K.agihan[i], sel: K.selepasAgihan[i], lebih: lebihBayar[i],
          _c_seb: K.sebelumAgihan[i] < 0 ? 'neg' : 'pos',
          _c_sel: K.selepasAgihan[i] < 0 ? 'neg' : 'pos',
          _cls: K.selepasAgihan[i] < 0 ? 'hi' : ''
        };
      });
      h += U.card('Jadual penuh', 'Nilai dalam kurungan = negatif. RM juta.',
        U.table([
          { h: 'Tahun', k: 't' },
          { h: 'Jumlah aset', k: 'aset', n: true, fmt: U.n },
          { h: 'Jumlah liabiliti', k: 'lia', n: true, fmt: function (v) { return '(' + U.n(v) + ')'; } },
          { h: 'Lebihan sebelum agihan', k: 'seb', n: true, fmt: fmtParen },
          { h: 'Hibah diagih', k: 'agih', n: true, fmt: function (v) { return '(' + U.n(-v) + ')'; } },
          { h: 'Baki selepas agihan', k: 'sel', n: true, fmt: fmtParen },
          { h: 'Agihan melebihi kemampuan', k: 'lebih', n: true, fmt: function (v) { return v > 0 ? U.n(v) : '—'; } }
        ], rows) +
        '<div class="mini" style="margin-top:9px">Lajur terakhir <span class="tag accent">terbitan</span>: hibah diagih tolak lebihan sebelum agihan (dianggap sifar jika lebihan negatif).</div>',
        K.src);

      // Simulator
      h += U.card('Simulasi: bagaimana jika hibah dihadkan kepada kemampuan sebenar?',
        'Ini <b>bukan</b> fakta laporan. Ia alat untuk menguji andaian anda sendiri.',
        '<div class="ctrl">' +
        U.slider('sl-cap', {
          label: 'Had agihan (peratus daripada lebihan sebelum agihan)',
          min: 0, max: 150, step: 5, value: 100,
          display: function (v) { return v + '%'; }
        }) +
        '<div class="mini">Contoh: 100% bermaksud TH hanya mengagih setakat lebihan yang ada. 0% bermaksud tiada hibah langsung dalam tempoh itu.</div>' +
        '</div>' +
        '<div id="sim-out"></div>' +
        U.chartBox('ch-sim') +
        U.reading({
          apa: 'Membandingkan baki sebenar (garisan merah) dengan baki jika agihan dihadkan mengikut peraturan yang anda tetapkan (garisan hijau).',
          kenapa: 'Ia menunjukkan bahagian mana daripada jurang RM4.09 bilion itu datang daripada keputusan agihan, dan bahagian mana daripada prestasi pelaburan.',
          simpul: 'Pada had 100%, jurang akhir 2017 hilang sepenuhnya — bermakna hampir keseluruhan jurang adalah kesan agihan berlebihan, bukan kerugian pelaburan semata-mata.',
          hati: '<span class="tag warn">simulasi</span> Kiraan ini menganggap semua perkara lain kekal sama. Dalam realiti, hibah rendah boleh mencetuskan pengeluaran deposit besar-besaran — risiko yang laporan sendiri bincangkan. Jangan gunakan angka ini sebagai anggaran sebenar.'
        }), K.src);

      root.innerHTML = h;

      var mode = 'al';
      drawJurang(root, mode);
      U.bindSeg(root, 'mode', function (v) {
        mode = v;
        drawJurang(root, v);
        root.querySelectorAll('[data-r]').forEach(function (n2) {
          n2.classList.toggle('hidden', n2.dataset.r !== v);
        });
      });

      var sl = root.querySelector('#sl-cap');
      function runSim() {
        var capPct = +sl.value;
        root.querySelector('#sl-cap-out').textContent = capPct + '%';
        // Pecahan: perubahan bersih tahun i = lebihan sebelum agihan(i) − baki selepas agihan(i−1).
        // Dalam simulasi, asas agihan ialah kedudukan simulasi sebelum agihan tahun itu.
        var simSel = [K.selepasAgihan[0]];
        var simAgih = [K.agihan[0]];
        var carry = K.selepasAgihan[0];
        for (var i = 1; i < K.tahun.length; i++) {
          var lebihTahun = K.sebelumAgihan[i] - K.selepasAgihan[i - 1];
          var pre = carry + lebihTahun;
          var agihSim = Math.max(0, pre) * capPct / 100;
          simAgih.push(agihSim);
          carry = pre - agihSim;
          simSel.push(carry);
        }
        var jimat = K.agihan.slice(1).reduce(function (a, b) { return a + b; }, 0) -
          simAgih.slice(1).reduce(function (a, b) { return a + b; }, 0);
        root.querySelector('#sim-out').innerHTML = U.readout([
          { k: 'Baki akhir 2017 (sebenar)', v: U.rmJuta(K.selepasAgihan[4]), cls: 'neg' },
          { k: 'Baki akhir 2017 (simulasi)', v: U.rmJuta(simSel[4]), cls: simSel[4] >= 0 ? 'pos' : 'neg' },
          { k: 'Hibah tidak dibayar', v: U.rmJuta(jimat), cls: jimat > 0 ? 'pos' : '', d: '2014–2017' },
          { k: 'Hibah dibayar (simulasi)', v: U.rmJuta(simAgih.slice(1).reduce(function (a, b) { return a + b; }, 0)), d: 'berbanding ' + U.rmJuta(12652) }
        ]);
        C.lines(root.querySelector('#ch-sim'), {
          x: K.tahun.map(String),
          zero: true, height: 240,
          series: [
            { name: 'Sebenar', color: C.css('--c1'), data: K.selepasAgihan },
            { name: 'Simulasi', color: C.css('--c4'), data: simSel, dash: '6 4' }
          ],
          fmtV: function (v) { return U.n(v, 0); },
          tipTitle: function (c) { return 'Tahun ' + c; }
        });
      }
      sl.addEventListener('input', runSim);
      runSim();

      function drawJurang(root2, m) {
        var box = root2.querySelector('#ch-jurang');
        var lg = root2.querySelector('#lg-jurang');
        if (m === 'al') {
          C.bars(box, {
            cats: K.tahun.map(String), height: 270, padL: 52,
            series: [
              { name: 'Jumlah aset', color: C.css('--c2'), data: K.aset },
              { name: 'Jumlah liabiliti', color: C.css('--c1'), data: K.liabiliti },
              { name: 'Lebihan sebelum agihan', color: C.css('--c3'), data: K.sebelumAgihan, type: 'line' }
            ],
            fmtV: function (v) { return U.n(v); },
            tipTitle: function (c) { return 'Tahun ' + c; }
          });
          lg.innerHTML = U.legend([
            { name: 'Jumlah aset', color: C.css('--c2') },
            { name: 'Jumlah liabiliti', color: C.css('--c1') },
            { name: 'Lebihan sebelum agihan hibah', color: C.css('--c3') }
          ]);
        } else if (m === 'gap') {
          C.bars(box, {
            cats: K.tahun.map(String), height: 250, valueLabels: true,
            series: [{ name: 'Baki selepas agihan', color: C.css('--c1'), colorFn: posNeg, data: K.selepasAgihan }],
            fmtV: function (v) { return U.n(v); },
            tipTitle: function (c) { return 'Tahun ' + c; }
          });
          lg.innerHTML = U.legend([
            { name: 'Lebihan (aset > liabiliti)', color: C.css('--c4') },
            { name: 'Kekurangan (aset < liabiliti)', color: C.css('--c1') }
          ]);
        } else {
          C.bars(box, {
            cats: K.tahun.map(String), height: 260,
            series: [
              { name: 'Lebihan sebelum agihan', color: C.css('--c6'), data: K.sebelumAgihan },
              { name: 'Hibah dibayar', color: C.css('--c1'), data: K.agihan }
            ],
            fmtV: function (v) { return U.n(v); },
            tipTitle: function (c) { return 'Tahun ' + c; }
          });
          lg.innerHTML = U.legend([
            { name: 'Lebihan sebenar untuk diagih', color: C.css('--c6') },
            { name: 'Hibah yang dibayar', color: C.css('--c1') }
          ]);
        }
      }
    }
  };

  function fmtParen(v) {
    if (v === null || v === undefined) return '—';
    return v < 0 ? '(' + U.n(-v) + ')' : U.n(v);
  }

  /* =========================================================== TUAS ====== */
  V.tuas = {
    label: 'Tuas perakaunan',
    title: 'Tiga tuas yang mengubah gambaran 2017',
    render: function (root) {
      var P = R.PANDANGAN2017, RV = R.RAV, RN = R.ROSOTNILAI, J = R.JAMBATAN2017;

      var h = '<div class="sec-head"><div class="eyebrow">Bab 3.9 – 3.13</div>' +
        '<h2>Tiga tuas yang mengubah gambaran 2017</h2>' +
        '<p class="lede">Tahun kewangan yang sama boleh kelihatan untung besar atau rugi besar — bergantung kepada ' +
        'tiga keputusan perakaunan. Bahagian ini membenarkan anda menarik setiap tuas dan melihat kesannya.</p></div>';

      h += '<div class="callout warn"><b class="h">Fahami dulu: apa itu "rosot nilai"?</b>' +
        'Jika anda beli saham RM1,000 dan harganya jatuh ke RM100, akaun anda sepatutnya menunjukkan RM100. ' +
        'Mengakui kejatuhan itu dipanggil <b>rosot nilai</b>. Laporan mendapati LTH hanya mengaku kerugian apabila ' +
        'harga jatuh <b>90%</b> — bermakna saham RM1,000 yang tinggal RM150 masih dicatat sebagai RM1,000. ' +
        U.src(RN.src) + '</div>';

      // ---- Panel tuas interaktif
      h += U.card('Panel tuas: kedudukan bersih Tabung Haji pada 31 Disember 2017',
        'Mula dengan angka yang LTH sendiri gunakan (+RM373 juta), kemudian tarik setiap tuas.',
        '<div class="grid g3" style="margin-bottom:12px">' +
        U.switchBox('lv-rav', 'Buang tokokan RAV', '−RM4,466 juta · nilai tambahan yang dianggar sendiri oleh pengurusan, bukan harga pasaran', false) +
        U.switchBox('lv-fin', 'Ambil kira rosot nilai aset kewangan', '−RM1,310 juta · yang sepatutnya direkod mengikut FRS 139 (kenyataan JAN)', false) +
        U.switchBox('lv-sub', 'Ambil kira rosot nilai anak &amp; syarikat bersekutu', '−RM227 juta · termasuk TH Heavy Engineering RM164.58 juta (surat KAN menyebut RM227.81 juta)', false) +
        '</div>' +
        '<div id="tuas-out"></div>' +
        U.chartBox('ch-tuas') +
        '<div id="tuas-note" style="margin-top:12px"></div>' +
        U.reading({
          apa: 'Bar menunjukkan kedudukan bersih (aset tolak liabiliti) pada hujung 2017 mengikut kombinasi tuas yang anda pilih, berbanding tiga kedudukan rasmi yang disebut dalam laporan.',
          kenapa: 'Ketiga-tiga pihak — LTH, Jabatan Audit Negara dan PwC — melihat tahun yang sama tetapi menghasilkan angka berbeza sebanyak RM4.47 bilion. Perbezaannya bukan pendapat, tetapi pilihan tuas.',
          simpul: 'Membuang tokokan RAV sahaja sudah menghasilkan tepat angka PwC (−RM4,093 juta). Mengambil kira kedua-dua rosot nilai sahaja menghasilkan tepat angka JAN (−RM1,164 juta). Ini mengesahkan ketiga-tiga angka itu konsisten antara satu sama lain.',
          hati: 'Kombinasi ketiga-tiga tuas serentak (−RM5,630 juta) <b>tidak disebut dalam laporan</b> — ia kiraan kami <span class="tag accent">terbitan</span> dan mungkin mengandungi pertindihan antara pelarasan.'
        }), P.src);

      // ---- Tuas 1: RAV
      h += U.card('Tuas 1 — RAV: menokok nilai aset dengan anggaran sendiri',
        'RM juta, tahun kewangan 2017',
        U.readout([
          { k: 'Aset dalam penyata kewangan', v: U.n(RV.jumlahAset) },
          { k: 'Tokokan RAV', v: '+' + U.n(RV.tokokan), cls: 'neg' },
          { k: 'Aset selepas RAV', v: U.n(RV.asetRAV) },
          { k: 'Baki "boleh diagih"', v: '+' + U.n(RV.bersih), cls: 'pos' }
        ]) +
        '<div style="margin-top:12px">' + U.note('penting', 'Nisbah yang perlu diperhatikan',
          'Tokokan RAV (RM' + U.n(RV.tokokan) + ' juta) ialah <b>' + U.n(RV.tokokan / RV.bersih, 1) + ' kali ganda</b> ' +
          'baki bersih yang membolehkan hibah diisytiharkan (RM' + U.n(RV.bersih) + ' juta). ' +
          '<span class="tag accent">terbitan</span> Tanpa tokokan itu, tiada baki langsung.') + '</div>' +
        '<div style="margin-top:10px">' + U.note('hati', 'Contoh yang laporan berikan',
          'Bagi 2017, RM' + U.n(RV.contohTHP.jumlah) + ' juta berkaitan TH Plantations dimasukkan dalam kiraan RAV. ' +
          'Ia berasaskan penilaian hartanah RM' + U.n(RV.contohTHP.penilaianHartanah) + ' juta — tetapi hanya ' +
          '<b>RM' + U.n(RV.contohTHP.olehPenilaiProfesional) + ' juta</b> (' + U.pct(RV.contohTHP.olehPenilaiProfesional / RV.contohTHP.penilaianHartanah * 100) +
          ' <span class="tag accent">terbitan</span>) disokong laporan penilai profesional. Bakinya anggaran pengurusan semata-mata. ' + U.src(RV.contohTHP.src)) + '</div>' +
        '<div style="margin-top:10px">' + U.note('baca', 'Nota masa yang penting',
          'Laporan Semakan RAV oleh EY dikeluarkan <b>23 Mei 2018</b>. Penyata kewangan beraudit hanya dimuktamadkan ' +
          '<b>16 Julai 2018</b> — lapan minggu kemudian. Justeru dakwaan bahawa RAV berasaskan penyata beraudit tidak tepat. ' + U.src({ pdf: 119, ms: '81' })) + '</div>',
        RV.src);

      // ---- Tuas 2: ambang rosot nilai
      h += U.card('Tuas 2 — ambang rosot nilai: satu nombor, kesan RM1.3 bilion',
        'Berapa banyak kerugian perlu diakui pada 2017, mengikut ambang yang dipilih',
        '<div class="ctrl"><div class="ctrl-row"><label>Ambang rosot nilai</label>' +
        U.seg('amb', RN.pilihan.map(function (p) { return { v: String(p.ambang), l: p.ambang + '% di bawah kos' }; }), '90') +
        '</div></div>' +
        '<div id="amb-out"></div>' +
        U.chartBox('ch-amb') +
        '<div style="margin-top:12px">' + U.note('penting', 'Apa yang berlaku',
          U.esc(RN.nota) + ' Akhirnya hanya <b>RM1.0 juta</b> rosot nilai direkod bagi tahun itu.') + '</div>' +
        '<div style="margin-top:10px">' + U.note('baca', 'Panduan industri', U.esc(RN.panduanFRSIC) + ' ' + U.src(RN.srcFRSIC) +
          '<br>Bermakna ambang 90% adalah <b>4.5 kali lebih longgar</b> daripada ambang panduan 20%. <span class="tag accent">terbitan</span>') + '</div>' +
        U.reading({
          apa: 'Berapa banyak kerugian saham perlu diakui dalam akaun 2017, mengikut peraturan yang dipilih.',
          kenapa: 'Kerugian yang diakui mengurangkan keuntungan. Keuntungan yang rendah bermakna hibah tidak boleh dibayar tinggi.',
          simpul: 'Beza antara ambang 70% dan 90% ialah RM1,312 juta — lebih besar daripada baki RM373 juta yang membenarkan hibah 2017 diisytiharkan.',
          hati: 'Angka 1,313 / 171 / 1 ialah <b>kesan rosot nilai bagi portfolio 2017 sahaja</b>, seperti dilaporkan PwC. Ia bukan anggaran kerugian keseluruhan LTH.'
        }), RN.src);

      // ---- Waterfall untung 2017
      h += U.card('Kesan penuh: daripada untung RM3.41 bilion kepada rugi RM1.43 bilion',
        'Jambatan pelarasan mengikut piawaian FRS, seperti dilaporkan PwC (RM juta)',
        U.chartBox('ch-wf') +
        '<div style="margin-top:12px">' + U.readout([
          { k: 'Untung dilaporkan 2017', v: U.rmJuta(J.langkah[0].nilai), cls: 'pos' },
          { k: 'Kerugian terlaras', v: U.rmJuta(J.langkah[4].nilai), cls: 'neg' },
          { k: 'Beza', v: U.rmJuta(J.langkah[0].nilai - J.langkah[4].nilai), d: 'terbitan' },
          { k: 'Kerugian terkumpul terlaras', v: U.rmJuta(-J.terkumpul.hasil), cls: 'neg', d: 'setakat 31 Dis 2017' }
        ]) + '</div>' +
        U.reading({
          apa: 'Bermula dengan untung yang dilaporkan, kemudian menolak setiap pelarasan yang PwC dapati sepatutnya dibuat.',
          kenapa: 'Bonus kakitangan, hibah dan keyakinan pendeposit semuanya berpaut pada angka "untung" ini.',
          simpul: 'Perbezaannya RM4.85 bilion. Tahun yang dilaporkan sebagai tahun untung sebenarnya tahun rugi.',
          hati: 'Ini <b>anggaran PwC</b> dalam <i>financial review</i>, bukan audit semula. Laporan sendiri menyatakan tujuannya adalah mengesahkan penemuan JAN, bukan mengaudit semula.'
        }), J.src);

      // ---- Tuas 3: pengelasan
      h += U.card('Tuas 3 — pengelasan Kumpulan Wang Pendeposit', '',
        '<p>Sejak <b>2010</b>, wang pendeposit dikelaskan dalam penyata kewangan sebagai <b>dana (ekuiti)</b> ' +
        'dan bukan sebagai <b>liabiliti</b>. Suruhanjaya menyifatkannya sebagai "satu representasi salah".</p>' +
        '<p class="mini">Kesannya mudah difahami: jika wang yang anda pegang untuk orang lain dikira sebagai milik anda, ' +
        'kunci kira-kira anda sentiasa kelihatan cukup. Bersama rosot nilai yang tidak mencukupi, ini membolehkan ' +
        'penyata kewangan menunjukkan aset melebihi liabiliti — syarat untuk mengisytiharkan hibah di bawah seksyen 22(3)(a).</p>' +
        U.note('hati', 'Nota kejujuran data', 'Laporan <b>tidak</b> memberikan angka kuantitatif bagi kesan pengelasan ini secara berasingan. ' +
          'Kerana itu tuas ini tidak dimasukkan dalam panel interaktif di atas.'),
        { pdf: 132, ms: '94' });

      root.innerHTML = h;

      // --- panel tuas
      var levers = { rav: false, fin: false, sub: false };
      function drawTuas() {
        var base = RV.bersih;
        var v = base
          - (levers.rav ? RV.tokokan : 0)
          - (levers.fin ? 1310 : 0)
          - (levers.sub ? 227 : 0);
        var label = 'Pilihan anda';
        var match = '';
        if (!levers.rav && !levers.fin && !levers.sub) match = 'Sama dengan angka yang LTH gunakan.';
        else if (!levers.rav && levers.fin && levers.sub) match = 'Sepadan dengan angka Jabatan Audit Negara: −RM1,164 juta.';
        else if (levers.rav && !levers.fin && !levers.sub) match = 'Sepadan dengan angka PwC: −RM4,093 juta.';
        else if (levers.rav && levers.fin && levers.sub) match = 'Kombinasi maksimum — angka ini tidak disebut dalam laporan.';

        root.querySelector('#tuas-out').innerHTML = U.readout([
          { k: 'Titik mula (cara LTH)', v: '+' + U.n(base), d: 'RM juta' },
          { k: 'Tuas ditarik', v: String([levers.rav, levers.fin, levers.sub].filter(Boolean).length) + ' / 3' },
          { k: 'Kedudukan bersih', v: (v >= 0 ? '+' : '−') + U.n(Math.abs(v)), cls: v >= 0 ? 'pos' : 'neg', d: 'RM juta' },
          { k: 'Perubahan', v: U.n(v - base), cls: 'neg', d: 'RM juta' }
        ]);
        root.querySelector('#tuas-note').innerHTML = match
          ? U.note(v >= 0 ? 'simpul' : 'penting', 'Padanan', match) : '';

        var rows = P.baris.map(function (b) {
          return { label: b.label, value: b.nilai, color: b.nilai >= 0 ? C.css('--c4') : C.css('--c1'), dim: true, note: b.formula };
        });
        rows.push({ label: label, value: Math.round(v), color: C.css('--c5'), note: 'Kiraan interaktif anda' });
        C.hbars(root.querySelector('#ch-tuas'), {
          rows: rows, rowH: 34, labW: 128, valW: 64, minW: 470,
          fmtV: function (x) { return U.n(x); }, unit: 'RM juta'
        });
      }
      ['rav', 'fin', 'sub'].forEach(function (k) {
        var inp = root.querySelector('#lv-' + k);
        inp.addEventListener('change', function () {
          levers[k] = inp.checked;
          inp.closest('.switch').dataset.on = inp.checked;
          drawTuas();
        });
      });
      drawTuas();

      // --- ambang
      function drawAmb(a) {
        var p = RN.pilihan.filter(function (x) { return String(x.ambang) === String(a); })[0];
        var top = RN.pilihan[0].kesan;
        root.querySelector('#amb-out').innerHTML = U.readout([
          { k: 'Ambang dipilih', v: p.ambang + '%' },
          { k: 'Rosot nilai perlu diakui', v: U.rmJuta(p.kesan), cls: p.kesan > 500 ? 'neg' : '' },
          { k: 'Kerugian "tersembunyi"', v: U.rmJuta(top - p.kesan), d: 'berbanding ambang 70%' },
          { k: 'Digunakan LTH pada 2017', v: p.ambang === RN.diguna ? 'Ya' : 'Tidak', cls: p.ambang === RN.diguna ? 'neg' : '' }
        ]);
        C.bars(root.querySelector('#ch-amb'), {
          cats: RN.pilihan.map(function (x) { return x.ambang + '%'; }),
          series: [{
            name: 'Rosot nilai diakui (RM juta)', color: C.css('--c1'),
            opacityFn: function (v, i) { return String(RN.pilihan[i].ambang) === String(a) ? 1 : 0.28; },
            data: RN.pilihan.map(function (x) { return x.kesan; })
          }],
          height: 220, valueLabels: true, slot: 90,
          fmtV: function (v) { return U.n(v); },
          tipTitle: function (c) { return 'Ambang ' + c; }
        });
      }
      U.bindSeg(root, 'amb', drawAmb);
      drawAmb('90');

      C.waterfall(root.querySelector('#ch-wf'), {
        steps: J.langkah, height: 300, minW: 430,
        fmtV: function (v) { return U.n(v); }
      });
    }
  };

  /* ========================================================== HIBAH ====== */
  V.hibah = {
    label: 'Hibah',
    title: 'Hibah: kadar, kos dan kesannya',
    render: function (root) {
      var H = R.HIBAH, D = R.DEPOSIT, K = R.KEWANGAN;

      var h = '<div class="sec-head"><div class="eyebrow">Bab 3.9 &amp; 3.11</div>' +
        '<h2>Hibah: kadar, kos dan kesannya</h2>' +
        '<p class="lede">Hibah ialah bayaran keuntungan tahunan kepada pendeposit. Ia bukan faedah — ia sepatutnya ' +
        'datang daripada untung pelaburan. Bahagian ini melihat berapa yang dijanjikan, berapa yang mampu dibayar, ' +
        'dan apa berlaku apabila kadar dipotong.</p></div>';

      h += U.card('Kadar hibah 2014–2021',
        'Peratus setahun. Hibah haji ialah bayaran tambahan kepada pendeposit yang menunaikan haji tahun itu.',
        '<div class="ctrl"><div class="ctrl-row"><label>Papar</label>' +
        U.seg('hb', [{ v: 'kadar', l: 'Kadar (%)' }, { v: 'jum', l: 'Jumlah (RM juta)' }], 'kadar') + '</div></div>' +
        U.chartBox('ch-hibah') + '<div id="lg-hibah"></div>' +
        U.reading({
          apa: 'Kadar hibah tahunan dan hibah haji bagi setiap tahun. Selepas 2018 hibah haji dihentikan sepenuhnya.',
          kenapa: 'Kadar 2014 (6.25% + 2.00%) berbanding 2018 (1.25%) menunjukkan seberapa jauh bayaran sebelum ini melebihi kemampuan sebenar.',
          simpul: 'Kejatuhan mendadak pada 2018 bukan kerana prestasi pelaburan tiba-tiba merudum, tetapi kerana piawaian perakaunan mula dipatuhi sepenuhnya selepas penstrukturan.',
          hati: 'Kadar peratus <b>tidak</b> boleh dibandingkan terus dengan kadar bank kerana asas pengiraannya (baki bulanan vs tahunan) pernah berubah — perkara yang laporan sendiri bangkitkan.'
        }), H.srcKadar);

      // Bandingan kemampuan
      var tahunP = [2014, 2015, 2016, 2017];
      h += U.card('Yang dibayar berbanding yang mampu dibayar',
        'RM juta, 2014–2017',
        U.chartBox('ch-mampu') +
        U.legend([{ name: 'Lebihan sebenar sebelum agihan', color: C.css('--c6') }, { name: 'Hibah dibayar', color: C.css('--c1') }]) +
        '<div style="margin-top:12px">' + U.readout([
          { k: 'Hibah 2014–2017', v: U.rmJuta(12652), d: 'jumlah 4 tahun' },
          { k: 'Lebihan sebenar', v: U.rmJuta(3019), d: '2014 + 2015 sahaja' },
          { k: 'Nisbah bayar : mampu', v: '4.2×', d: 'terbitan' },
          { k: 'Tahun lebihan negatif', v: '2016 & 2017', cls: 'neg' }
        ]) + '</div>' +
        U.reading({
          apa: 'Lajur kelabu ialah lebihan yang benar-benar wujud sebelum agihan. Lajur merah ialah hibah yang dibayar.',
          kenapa: 'Perbezaan antara dua lajur ini ialah wang pendeposit sendiri yang dipulangkan sebagai "keuntungan".',
          simpul: 'Bagi keempat-empat tahun, agihan melebihi lebihan. Pada 2016 dan 2017 tiada lebihan langsung untuk diagih.',
          hati: 'Bukan bermakna 4.2 kali ganda wang "hilang". Sebahagiannya diserap oleh kenaikan nilai aset yang tidak direalisasi dan kemudian oleh Pelan Pemulihan.'
        }), K.src);

      // 2017 zoom
      h += U.card('Zum ke 2017: RM610 juta yang tidak sepatutnya dibayar',
        'Kenyataan Timbalan Pengarah Audit Kewangan JAN kepada Suruhanjaya',
        U.readout([
          { k: 'Keupayaan mengikut baki minima tahunan', v: 'RM2.70b', d: 'pada kadar 4%' },
          { k: 'Hibah yang benar-benar dibayar', v: 'RM3.31b', cls: 'neg', d: 'kaedah baki minima bulanan' },
          { k: 'Lebihan', v: 'RM0.61b', cls: 'neg', d: '+22.5%' },
          { k: 'Dasar rosot nilai diubah', v: '2 kali', cls: 'neg', d: 'dalam tahun kewangan yang sama' }
        ]) +
        '<div style="margin-top:12px">' + U.note('penting', 'Urutan peristiwa', U.esc(H.perubahanKaedah.teks) + ' ' + U.src(H.perubahanKaedah.src)) + '</div>' +
        '<div style="margin-top:10px">' + U.note('hati', 'Percanggahan dalam laporan',
          'Perenggan yang sama menyebut kadar "6.25%" untuk 2017, sedangkan jadual kadar rasmi menyatakan 4.50% + 1.75%. ' +
          'Jumlah RM (2.70 lwn 3.31 bilion) konsisten dengan jadual agihan. ' +
          '<a class="src" href="#sumber" data-go="sumber">Lihat senarai penuh percanggahan</a>') + '</div>',
        H.kupasan2017.src);

      // Deposit
      h += U.card('Apa berlaku apabila hibah dipotong kepada 1.25%',
        'Saiz deposit LTH, RM bilion',
        U.chartBox('ch-dep') +
        '<div style="margin-top:12px">' + U.readout([
          { k: 'Sebelum pengumuman', v: 'RM73b' },
          { k: 'Akhir 2019', v: 'RM69b', cls: 'neg', d: '−RM4b' },
          { k: 'Akhir 2020', v: 'RM76b', cls: 'pos', d: 'pulih' },
          { k: 'Mei 2022', v: 'RM88b', cls: 'pos' }
        ]) + '</div>' +
        U.reading({
          apa: 'Pergerakan jumlah deposit sekitar pengumuman hibah 1.25% untuk tahun 2018.',
          kenapa: 'Ini ujian sebenar terhadap risiko "bank run" yang menjadi alasan utama pelan pemulihan tergesa-gesa pada Disember 2018.',
          simpul: 'Deposit mengecut ~RM4 bilion, kemudian pulih dan melepasi paras asal. Laporan sendiri menyatakan "LTH bernasib baik kerana jumlah pengeluaran lebih kecil daripada yang dikhuatiri".',
          hati: 'Titik-titik ini ialah <b>anggaran</b> yang disebut dalam teks laporan ("kira-kira RM73 bilion", "lebih kurang RM76 bilion") — bukan siri data bulanan yang tepat. Jangan tafsir kecerunan garisan sebagai aliran sebenar.'
        }), D.src);

      // Tumpuan
      h += U.card('Siapa sebenarnya pendeposit Tabung Haji?', '',
        '<div class="grid g2">' +
        '<div>' + U.chartBox('ch-tumpu') + '</div>' +
        '<div>' + U.note('baca', '65% pendeposit menyimpan RM2,000 atau kurang',
          'Majoriti besar pendeposit ialah penyimpan kecil. ' + U.src(D.tumpuan.kecil.src)) +
        U.note('penting', '75% deposit dimiliki 5% pendeposit',
          'Wang sebenar tertumpu kepada segelintir. Inilah <i>concentration risk</i> yang BNM bimbangkan sejak 2014. ' + U.src(D.tumpuan.besar.src)) +
        U.note('hati', 'Dua ukuran berbeza',
          'Dua angka ini datang daripada bahagian laporan yang berbeza dan tidak dinyatakan sebagai satu taburan yang sama. ' +
          'Kami tidak menggabungkannya menjadi satu graf taburan kerana itu akan mencipta data yang tiada dalam laporan.') +
        '</div></div>',
        D.tumpuan.besar.src);

      root.innerHTML = h;

      function drawHibah(m) {
        var box = root.querySelector('#ch-hibah'), lg = root.querySelector('#lg-hibah');
        if (m === 'kadar') {
          C.bars(box, {
            cats: H.tahun.map(String), stacked: true, height: 250,
            series: [
              { name: 'Hibah tahunan (%)', color: C.css('--c2'), data: H.kadarTahunan },
              { name: 'Hibah haji (%)', color: C.css('--c3'), data: H.kadarHaji }
            ],
            fmtV: function (v) { return U.n(v, 2) + '%'; },
            fmtAxis: function (v) { return U.n(v, 0) + '%'; },
            tipTitle: function (c) { return 'Tahun ' + c; }
          });
          lg.innerHTML = U.legend([
            { name: 'Hibah tahunan', color: C.css('--c2') },
            { name: 'Hibah haji (tambahan)', color: C.css('--c3') }
          ]);
        } else {
          C.bars(box, {
            cats: H.tahun.map(String), stacked: true, height: 250, padL: 54,
            series: [
              { name: 'Hibah tahunan (RM juta)', color: C.css('--c2'), data: H.jumlahTahunan.map(toJuta) },
              { name: 'Hibah haji (RM juta)', color: C.css('--c3'), data: H.jumlahHaji.map(toJuta) }
            ],
            fmtV: function (v) { return U.n(v); },
            tipTitle: function (c) { return 'Tahun ' + c; }
          });
          lg.innerHTML = U.legend([
            { name: 'Hibah tahunan', color: C.css('--c2') },
            { name: 'Hibah haji', color: C.css('--c3') }
          ]) + '<div class="mini" style="margin-top:6px">Data 2021 tidak disenaraikan dalam jadual laporan.</div>';
        }
      }
      function toJuta(v) { return v === null || v === undefined ? null : v / 1000; }
      U.bindSeg(root, 'hb', drawHibah);
      drawHibah('kadar');

      C.bars(root.querySelector('#ch-mampu'), {
        cats: ['2014', '2015', '2016', '2017'], height: 250,
        series: [
          { name: 'Lebihan sebelum agihan', color: C.css('--c6'), data: K.sebelumAgihan.slice(1) },
          { name: 'Hibah dibayar', color: C.css('--c1'), data: K.agihan.slice(1) }
        ],
        fmtV: function (v) { return U.n(v); },
        tipTitle: function (c) { return 'Tahun ' + c; }
      });

      C.lines(root.querySelector('#ch-dep'), {
        x: D.titik.map(function (t) { return t.label; }),
        series: [{ name: 'Deposit (RM bilion)', color: C.css('--c2'), data: D.titik.map(function (t) { return t.nilai; }) }],
        height: 230, area: true, padL: 38,
        fmtV: function (v) { return 'RM' + U.n(v) + 'b'; },
        tipExtra: function (i) { return '<div style="margin-top:4px;opacity:.85">' + D.titik[i].nota + '</div>'; }
      });

      C.hbars(root.querySelector('#ch-tumpu'), {
        rows: [
          { label: '5% pendeposit', value: 75, color: C.css('--c1'), note: 'memegang 75% daripada jumlah deposit' },
          { label: '95% pendeposit', value: 25, color: C.css('--c6'), note: 'memegang baki 25%' }
        ],
        rowH: 38, labW: 104, minW: 280,
        fmtV: function (v) { return v + '%'; }, unit: 'Bahagian deposit'
      });
    }
  };
})();
