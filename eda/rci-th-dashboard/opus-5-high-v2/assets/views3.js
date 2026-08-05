/* ===========================================================================
   PAPARAN 3 — Pelaburan bermasalah · Orang & tadbir urus · Kronologi ·
                Syor · Sumber & integriti data
   =========================================================================== */
(function () {
  'use strict';
  var R = window.RCI, U = window.UI, C = window.Ch;
  var V = window.VIEWS = window.VIEWS || {};

  /* ====================================================== PELABURAN ====== */
  V.pelaburan = {
    label: 'Pelaburan bermasalah',
    title: '14 pelaburan yang disyorkan audit forensik',
    render: function (root) {
      var P = R.PELABURAN;
      var totalRosot = P.reduce(function (a, p) { return a + (p.rosotNilaiRM || 0); }, 0);
      var berAngka = P.filter(function (p) { return p.rosotNilaiRM; }).length;

      var h = '<div class="sec-head"><div class="eyebrow">Bab 3.14 &amp; syor 4.4.10</div>' +
        '<h2>14 pelaburan yang disyorkan audit forensik</h2>' +
        '<p class="lede">Suruhanjaya mendapati proses membuat keputusan pelaburan "tidak teratur dan tiada koordinasi", ' +
        'dan wujud "transaksi yang mencurigakan dan penyembunyian maklumat". Bahagian ini menyusun setiap kes dengan ' +
        'angka yang laporan berikan — dan menandakan dengan jelas di mana laporan tidak memberi angka.</p></div>';

      h += '<div class="callout warn"><b class="h">Baca ini dahulu</b>' +
        'Laporan <b>tidak</b> memberikan satu jumlah kerugian keseluruhan. Kes-kes ini menggunakan ukuran berbeza — ' +
        'rosot nilai, kerugian tidak nyata, hapus kira, tunggakan sewa dalam mata wang asing. ' +
        'Jumlah <b>' + U.rmJuta(totalRosot) + '</b> di bawah hanyalah campuran ' + berAngka + ' angka rosot nilai/hapus kira ' +
        'yang dinyatakan dalam Ringgit <span class="tag accent">terbitan</span>. Ia <b>bukan</b> jumlah kerugian LTH.</div>';

      h += U.card('Rosot nilai dan hapus kira yang dinyatakan dalam laporan',
        'RM juta. Hanya kes yang mempunyai angka Ringgit dipaparkan.',
        U.chartBox('ch-inv') +
        U.reading({
          apa: 'Nilai rosot nilai atau hapus kira yang laporan nyatakan secara eksplisit bagi setiap pelaburan.',
          kenapa: 'Ia menunjukkan bahawa kerugian tidak tersebar rata — beberapa kes besar mendominasi.',
          simpul: 'Trurich (RM364 juta, dirosot nilai penuh), TH Marine (RM278 juta) dan Deru Semangat (RM225 juta) ialah tiga terbesar yang mempunyai angka jelas.',
          hati: 'FGV mempunyai <b>kerugian tidak nyata RM1,059 juta</b> yang tidak dimasukkan di sini kerana ia bukan rosot nilai — kerugian itu akhirnya dipindahkan kepada UJSB pada nilai kos. THIP dan Al-Rawda melibatkan mata wang asing dan tiada angka rosot nilai Ringgit yang lengkap.'
        }), { pdf: 176, ms: '138' });

      // Kawalan
      var kategori = [];
      P.forEach(function (p) { if (kategori.indexOf(p.kategori) < 0) kategori.push(p.kategori); });
      h += '<div class="card"><h3>Terokai setiap kes</h3>' +
        '<div class="sub">Tapis, susun, dan buka setiap kes untuk melihat butiran penuh dan pautan ke laporan.</div>' +
        '<div class="ctrl">' +
        '<div class="ctrl-row"><label>Susun ikut</label>' +
        U.seg('sort', [
          { v: 'rosot', l: 'Rosot nilai' }, { v: 'pel', l: 'Saiz pelaburan' },
          { v: 'nama', l: 'Nama' }, { v: 'kat', l: 'Kategori' }
        ], 'rosot') + '</div>' +
        '<div class="ctrl-row"><label>Kategori</label><div id="kat-chips">' +
        '<button class="chip" data-kat="*" aria-pressed="true">Semua</button>' +
        kategori.map(function (k) { return '<button class="chip" data-kat="' + U.esc(k) + '" aria-pressed="false">' + U.esc(k) + '</button>'; }).join('') +
        '</div></div>' +
        '<div class="ctrl-row"><label>Cari</label><input class="searchbox" id="inv-q" placeholder="Nama syarikat, negara, atau isu…" style="flex:1;min-width:180px"></div>' +
        '</div><div id="inv-count" class="mini" style="margin-bottom:10px"></div>' +
        '<div class="grid g2" id="inv-list"></div></div>';

      // Status
      h += U.card('Status tindakan undang-undang', 'Berapa kes berada dalam setiap peringkat',
        U.chartBox('ch-inv-status') +
        '<div style="margin-top:12px">' + U.note('hati', 'Cara kami mengelaskan',
          '<span class="tag accent">terbitan</span> Kami membaca senarai "tindakan" bagi setiap kes dan mengelaskannya. ' +
          'Satu kes boleh muncul dalam lebih daripada satu kategori. Laporan tidak menyediakan jadual status seperti ini.') + '</div>',
        { pdf: 176, ms: '138' });

      // Punca
      h += U.card('Kenapa keputusan pelaburan boleh jadi begini', 'Penemuan Suruhanjaya tentang proses',
        '<div class="grid g2">' +
        U.note('penting', 'Proses berlapis tetapi tidak berkesan',
          'Terlalu banyak lapisan pertimbangan tetapi tiada koordinasi antara Ketua Pegawai Pelaburan, Ketua Kewangan Korporat, Ketua Pegawai Hartanah dan Ketua Bahagian Perbendaharaan. Aliran proses tidak jelas.') +
        U.note('penting', 'Panel Pelaburan bergantung kepada pengurusan',
          'Pengerusi Panel Pelaburan sendiri mengakui pendekatan mereka "longgar dan tidak menyeluruh". Panel tidak menyemak cadangan dengan secukupnya.') +
        U.note('penting', 'Menteri tiada input bebas',
          'Semua Menteri yang memberi keterangan mengakui mereka tidak mempunyai input pihak ketiga. Semua dokumen menunjukkan catatan "dipersetujui seperti dicadangkan".') +
        U.note('penting', 'Panel Pelaburan dibubarkan 2018',
          'Digantikan Exco Perniagaan yang diakui saksi "tidak pernah berfungsi". Panel hanya dihidupkan semula selepas 2019.') +
        '</div>', { pdf: 177, ms: '139' });

      root.innerHTML = h;

      // Carta rosot nilai
      var withNum = P.filter(function (p) { return p.rosotNilaiRM; })
        .sort(function (a, b) { return b.rosotNilaiRM - a.rosotNilaiRM; });
      C.hbars(root.querySelector('#ch-inv'), {
        rows: withNum.map(function (p) {
          return {
            label: p.ringkas, value: p.rosotNilaiRM,
            color: C.css('--c1'),
            note: p.kategori + ' · ' + p.lokasi + (p.pelaburanRM ? ' · pelaburan RM' + U.n(p.pelaburanRM, 2) + ' juta' : '')
          };
        }),
        rowH: 28, labW: 112, valW: 68, minW: 380,
        fmtV: function (v) { return U.n(v, v < 10 ? 2 : 0); }, unit: 'Rosot nilai (RM juta)'
      });

      // Status chart
      var buckets = { 'Laporan polis / SPRM': 0, 'Mahkamah': 0, 'Timbang tara': 0, 'Siasatan forensik': 0, 'Sudah diselesaikan / dilupus': 0 };
      P.forEach(function (p) {
        var s = p.status.join(' ').toLowerCase() + ' ' + p.bendera.join(' ').toLowerCase();
        if (/polis|sprm|pdrm/.test(s)) buckets['Laporan polis / SPRM']++;
        if (/mahkamah|writ|bankrap|penguatkuasaan/.test(s)) buckets['Mahkamah']++;
        if (/timbang tara|arbitration|aiac/.test(s)) buckets['Timbang tara']++;
        if (/forensik/.test(s)) buckets['Siasatan forensik']++;
        if (/dilupus|membeli|dirungkai|hapus kira|diambil alih|dipindah/.test(s)) buckets['Sudah diselesaikan / dilupus']++;
      });
      C.hbars(root.querySelector('#ch-inv-status'), {
        rows: Object.keys(buckets).map(function (k, i) {
          return { label: k, value: buckets[k], color: [C.css('--c1'), C.css('--c5'), C.css('--c3'), C.css('--c2'), C.css('--c4')][i] };
        }),
        rowH: 32, labW: 150, valW: 46, minW: 320,
        fmtV: function (v) { return U.n(v) + ' kes'; }, unit: 'Bilangan kes'
      });

      // Senarai interaktif
      var state = { sort: 'rosot', kat: '*', q: '' };
      function renderList() {
        var list = P.filter(function (p) {
          if (state.kat !== '*' && p.kategori !== state.kat) return false;
          if (state.q) {
            var hay = (p.nama + ' ' + p.lokasi + ' ' + p.kategori + ' ' + p.isu + ' ' + p.kesan.join(' ') + ' ' + p.status.join(' ')).toLowerCase();
            if (hay.indexOf(state.q) < 0) return false;
          }
          return true;
        });
        list.sort(function (a, b) {
          if (state.sort === 'rosot') return (b.rosotNilaiRM || -1) - (a.rosotNilaiRM || -1);
          if (state.sort === 'pel') return (b.pelaburanRM || -1) - (a.pelaburanRM || -1);
          if (state.sort === 'kat') return a.kategori.localeCompare(b.kategori) || a.nama.localeCompare(b.nama);
          return a.nama.localeCompare(b.nama);
        });
        root.querySelector('#inv-count').textContent = list.length + ' daripada ' + P.length + ' kes dipaparkan';
        root.querySelector('#inv-list').innerHTML = list.map(function (p) {
          var nums = [];
          if (p.pelaburanRM) nums.push({ k: 'Pelaburan', v: 'RM' + U.n(p.pelaburanRM, 2) + 'j' });
          if (p.rosotNilaiRM) nums.push({ k: 'Rosot nilai', v: 'RM' + U.n(p.rosotNilaiRM, 2) + 'j', neg: true });
          if (p.kerugianTidakNyata) nums.push({ k: 'Rugi tidak nyata', v: 'RM' + U.n(p.kerugianTidakNyata, 2) + 'j', neg: true });
          if (p.pulihRM !== null && p.pulihRM !== undefined) nums.push({ k: 'Dipulih', v: 'RM' + U.n(p.pulihRM, 1) + 'j', pos: p.pulihRM > 0 });
          if (p.nilaiBuku) nums.push({ k: 'Nilai buku kini', v: 'RM' + U.n(p.nilaiBuku, 1) + 'j' });
          if (p.pindahRM) nums.push({ k: 'Nilai pemindahan', v: 'RM' + U.n(p.pindahRM, 1) + 'j' });
          if (p.sukuk) nums.push({ k: 'Sukuk LTH', v: 'RM' + U.n(p.sukuk) + 'j' });
          if (p.angkaUSD) nums.push({ k: 'Pendahuluan', v: 'USD' + U.n(p.angkaUSD.pendahuluan, 1) + 'j', neg: true });
          if (p.angkaSR) nums.push({ k: 'Sewa tertunggak', v: 'SR' + U.n(p.angkaSR.tertunggak, 1) + 'j', neg: true });

          return '<details class="inv" style="margin:0">' +
            '<summary style="list-style:none;cursor:pointer">' +
            '<h4>' + U.esc(p.nama) + '</h4>' +
            '<div class="meta">' + U.esc(p.kategori) + ' · ' + U.esc(p.lokasi) + '</div>' +
            (nums.length ? '<div class="nums">' + nums.map(function (x) {
              return '<span class="b"><b style="color:' + (x.neg ? 'var(--neg)' : (x.pos ? 'var(--pos)' : 'inherit')) + '">' + x.v + '</b>' + x.k + '</span>';
            }).join('') + '</div>' : '<div class="nums"><span class="b"><b>—</b>tiada angka RM dalam laporan</span></div>') +
            '<div class="pill-list">' + p.bendera.map(function (b) { return '<span class="tag neg">' + U.esc(b) + '</span>'; }).join('') +
            '<span class="mini" style="color:var(--accent);font-weight:700">butiran ▾</span></div>' +
            '</summary>' +
            '<div style="margin-top:11px;border-top:1px solid var(--line);padding-top:11px">' +
            '<div style="font-size:13.2px;color:var(--ink-2)"><b>Isu:</b> ' + U.esc(p.isu) + '</div>' +
            '<div style="margin-top:8px;font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)">Kesan kepada LTH</div>' +
            '<ul>' + p.kesan.map(function (k) { return '<li>' + U.esc(k) + '</li>'; }).join('') + '</ul>' +
            '<div style="margin-top:8px;font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)">Tindakan / status</div>' +
            '<ul>' + p.status.map(function (k) { return '<li>' + U.esc(k) + '</li>'; }).join('') + '</ul>' +
            '<div style="margin-top:9px">' + U.src(p.src) + '</div>' +
            '</div></details>';
        }).join('');
      }
      U.bindSeg(root, 'sort', function (v) { state.sort = v; renderList(); });
      root.querySelector('#kat-chips').addEventListener('click', function (e) {
        var b = e.target.closest('.chip'); if (!b) return;
        root.querySelectorAll('#kat-chips .chip').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        state.kat = b.dataset.kat; renderList();
      });
      root.querySelector('#inv-q').addEventListener('input', function (e) {
        state.q = e.target.value.trim().toLowerCase(); renderList();
      });
      renderList();
    }
  };

  /* =========================================================== ORANG ====== */
  V.orang = {
    label: 'Orang & tadbir urus',
    title: 'Siapa memegang jawatan, dan bila',
    render: function (root) {
      var J = R.JAWATAN, AN = R.JAWATANANAK, TT = R.TATATERTIB, LP = R.LAPORANPOLIS;

      var h = '<div class="sec-head"><div class="eyebrow">Bab 3.2 – 3.5, 3.15</div>' +
        '<h2>Siapa memegang jawatan, dan bila</h2>' +
        '<p class="lede">Kebanyakan keputusan yang dibincangkan dalam laporan ini boleh dipetakan kepada tempoh ' +
        'seseorang memegang jawatan. Garis masa di bawah membolehkan anda menyilangkan kedua-duanya.</p></div>';

      h += U.card('Garis masa jawatan utama, 2013–2022',
        'Garisan bertitik merah = peristiwa penting. Bulatan merah = penamatan sebelum tempoh tamat.',
        '<div class="ctrl"><div class="ctrl-row"><label>Tanda peristiwa</label>' +
        U.seg('mark', [
          { v: 'krisis', l: 'Titik krisis kewangan' },
          { v: 'audit', l: 'Peristiwa audit' },
          { v: 'none', l: 'Tiada' }
        ], 'krisis') + '</div></div>' +
        U.chartBox('ch-gantt') +
        '<div id="gantt-marks" class="mini" style="margin-top:8px"></div>' +
        U.reading({
          apa: 'Setiap bar ialah tempoh seseorang memegang jawatan berkenaan.',
          kenapa: 'Kekosongan jawatan dan pusing ganti pantas menjejaskan kesinambungan. Terdapat lima Ketua Pegawai Eksekutif dalam tempoh siasatan.',
          simpul: 'Dua penamatan mendadak berlaku pada 2021 — Ketua Pegawai Eksekutif (5 Mei) dan Pengerusi (15 Oktober) — kedua-duanya sebelum tempoh tamat dan tanpa sebab diberikan.',
          hati: 'Bertindih dengan sesuatu peristiwa tidak bermakna seseorang bertanggungjawab atas peristiwa itu. Laporan tidak menetapkan liabiliti individu.'
        }), J.src);

      // Ahli politik
      h += U.card('Anggota Lembaga daripada kalangan ahli politik',
        'Seksyen 6(2) Akta 535 hanya menetapkan syarat "Muslim dan warganegara Malaysia"',
        R.AHLIPOLITIK.senarai.map(function (p) {
          return '<div style="padding:10px 0;border-bottom:1px solid var(--line)">' +
            '<div style="font-weight:750">' + U.esc(p.nama) + '</div>' +
            '<div class="mini">' + U.esc(p.jawatan) + '</div>' +
            '<div style="font-size:13px;color:var(--ink-2);margin-top:3px">' + U.esc(p.politik) + '</div></div>';
        }).join('') +
        '<div style="margin-top:12px">' + U.note('penting', 'Syor Suruhanjaya',
          'Peruntukan khusus yang melarang ahli politik aktif daripada dilantik sebagai Pengerusi atau anggota ' +
          'Lembaga <b>dan anak-anak syarikat</b> hendaklah dikanunkan dalam Akta 535.') + '</div>' +
        '<div style="margin-top:10px">' + U.note('hati', 'Perlu jelas',
          'Laporan menyatakan penglibatan ahli politik "menimbulkan pelbagai persepsi" dan menjejaskan kredibiliti. ' +
          'Ia <b>tidak</b> mendakwa mana-mana individu bertindak menyalahi undang-undang semata-mata kerana status politik mereka.') + '</div>',
        R.AHLIPOLITIK.src);

      // Jawatan anak syarikat
      h += U.card('Berapa banyak jawatan anak syarikat dipegang serentak',
        'Bilangan jawatan yang disenaraikan dalam laporan bagi setiap individu',
        U.chartBox('ch-anak') +
        '<div style="margin-top:12px">' + U.readout([
          { k: 'Paling banyak', v: '23 jawatan', cls: 'neg', d: 'Ketua Pegawai Kewangan Kumpulan' },
          { k: 'Had dasar baharu LTH', v: '5 jawatan', cls: 'pos' },
          { k: 'Melebihi had baharu', v: String(AN.orang.filter(function (o) { return o.bil > AN.hadBaharu; }).length) + ' daripada ' + AN.orang.length },
          { k: 'Purata', v: U.n(AN.orang.reduce(function (a, o) { return a + o.bil; }, 0) / AN.orang.length, 1), d: 'terbitan' }
        ]) + '</div>' +
        '<div style="margin-top:12px">' + U.note('hati', 'Batasan data', U.esc(AN.nota)) + '</div>' +
        '<div style="margin-top:10px">' + U.note('penting', 'Kes selepas tamat perkhidmatan', U.esc(AN.ismeeSelepas) + ' ' + U.src(AN.src2)) + '</div>' +
        U.reading({
          apa: 'Bilangan kerusi lembaga pengarah anak syarikat yang dipegang oleh setiap individu semasa memegang jawatan utama di LTH.',
          kenapa: 'Suruhanjaya menyatakan ini menyebabkan mereka "kurang memberi fokus kepada tugas hakiki" dan menimbulkan konflik kepentingan.',
          simpul: 'Sepuluh daripada sebelas individu yang disenaraikan melebihi had lima jawatan yang kini dikenakan LTH.',
          hati: 'Angka ini datang daripada senarai contoh dalam laporan yang menggunakan perkataan "antaranya" — jumlah sebenar mungkin lebih tinggi.'
        }), AN.src);

      // Tatatertib
      h += U.card('Tindakan tatatertib: keputusan dan rayuan',
        'Lima pegawai pengurusan, empat kluster isu',
        '<div class="tbl-wrap"><table class="t"><thead><tr>' +
        '<th>Kluster</th><th>Pegawai terlibat</th><th>Keputusan Jawatankuasa Tatatertib</th><th>Selepas rayuan</th></tr></thead><tbody>' +
        TT.kluster.map(function (k) {
          return '<tr><td style="min-width:180px"><b>' + U.esc(k.nama) + '</b><div class="mini">Pertuduhan ' + U.esc(k.pertuduhan) + '</div></td>' +
            '<td>' + k.terlibat.map(U.esc).join('<br>') + '</td>' +
            '<td style="color:var(--neg)">' + U.esc(k.keputusan) + '</td>' +
            '<td style="color:var(--warn)">' + U.esc(k.rayuan) + '</td></tr>';
        }).join('') + '</tbody></table></div>' +
        '<div style="margin-top:14px">' + U.chartBox('ch-lewat') + '</div>' +
        '<div style="margin-top:12px">' + U.note('penting', 'Di mana mereka sekarang',
          U.esc(TT.rumusan) + '<ul style="margin:6px 0 0;padding-left:18px">' +
          TT.pegawai.map(function (p) { return '<li style="margin-bottom:3px">' + U.esc(p.nama) + ' — ' + U.esc(p.jawatanKini) + '</li>'; }).join('') +
          '</ul>') + '</div>' +
        U.reading({
          apa: 'Keputusan asal jawatankuasa tatatertib berbanding keputusan selepas rayuan, dan berapa lama proses mengambil masa.',
          kenapa: 'Dalam ketiga-tiga kes buang kerja, hukuman dikurangkan selepas rayuan. Suruhanjaya menyifatkan proses ini terlalu lama.',
          simpul: 'Tiada seorang pun daripada lima pegawai kehilangan pekerjaan. Semua kekal dalam LTH atau anak syarikatnya.',
          hati: 'Proses tatatertib adalah proses pentadbiran dalaman. Ia berasingan daripada siasatan polis dan SPRM yang masih berjalan.'
        }), TT.src);

      // Laporan polis
      h += U.card('Laporan kepada pihak berkuasa', 'Empat laporan polis dan enam aduan kepada SPRM',
        '<div class="tl">' + LP.senarai.map(function (l) {
          return '<div class="tl-item"><div class="d">' + U.esc(l.tarikh) + ' · ' + U.esc(l.rujukan) + '</div>' +
            '<div class="h">' + U.esc(l.isu) + '</div>' +
            '<div class="b">Pengadu: ' + U.esc(l.pengadu) + '<br><span class="tag warn">' + U.esc(l.status) + '</span></div></div>';
        }).join('') + '</div>' +
        '<details class="acc" style="margin-top:12px"><summary>Enam aduan kepada SPRM</summary><div class="acc-body"><ul>' +
        LP.sprm.senarai.map(function (s) { return '<li>' + U.esc(s) + '</li>'; }).join('') +
        '</ul><div style="margin-top:8px">' + U.src(LP.sprm.src) + '</div></div></details>',
        LP.src);

      root.innerHTML = h;

      // Gantt
      function yr(d) {
        var p = d.split('-');
        return +p[0] + (+p[1] - 1) / 12 + (+p[2] - 1) / 365;
      }
      var rows = J.siri.map(function (s) {
        return {
          name: s.peranan,
          bars: s.orang.filter(function (o) { return yr(o.tamat) > 2013; }).map(function (o, i) {
            return {
              from: Math.max(2013, yr(o.mula)), to: yr(o.tamat),
              label: o.nama, short: o.nama.split(' ')[0],
              range: o.mula + ' → ' + o.tamat,
              color: [C.css('--c2'), C.css('--c5'), C.css('--c3'), C.css('--c4'), C.css('--c1'), C.css('--c6')][i % 6],
              flag: o.tamatAwal,
              note: (o.nota ? o.nota + '. ' : '') + (o.tamatAwal ? 'Ditamatkan sebelum tempoh tamat.' : '') + (o.politik ? ' Ahli politik aktif ketika memegang jawatan.' : '')
            };
          })
        };
      });
      var MARKS = {
        krisis: [
          { t: 2014.0, l: '2014 · jurang mula terbuka' },
          { t: 2016.0, l: '2016 · aset < liabiliti sebelum agihan' },
          { t: 2018.98, l: 'Dis 2018 · pemindahan aset ke UJSB' },
          { t: 2019.2, l: '2019 · hibah 1.25%, deposit mengecut' }
        ],
        audit: [
          { t: 2018.54, l: 'Julai 2018 · Sijil Audit Bersih dengan Emphasis of Matter' },
          { t: 2018.39, l: 'Mei 2018 · Laporan Semakan RAV oleh EY' },
          { t: 2018.96, l: 'Dis 2018 · surat KAN kepada Perdana Menteri' }
        ],
        none: []
      };
      function drawGantt(m) {
        var marks = MARKS[m] || [];
        C.gantt(root.querySelector('#ch-gantt'), {
          rows: rows, from: 2013, to: 2022.6, minW: 700, labW: 150,
          ticks: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
          marks: marks.map(function (x) { return { t: x.t, color: C.css('--c1') }; })
        });
        root.querySelector('#gantt-marks').innerHTML = marks.length
          ? 'Garisan bertitik: ' + marks.map(function (x) { return U.esc(x.l); }).join(' · ')
          : '';
      }
      U.bindSeg(root, 'mark', drawGantt);
      drawGantt('krisis');

      C.hbars(root.querySelector('#ch-anak'), {
        rows: AN.orang.map(function (o) {
          return {
            label: o.nama, value: o.bil,
            color: o.bil > AN.hadBaharu ? C.css('--c1') : C.css('--c4'),
            note: o.peranan + ' · ' + o.tempoh
          };
        }),
        rowH: 27, labW: 152, valW: 44, minW: 380,
        fmtV: function (v) { return U.n(v); }, unit: 'Jawatan anak syarikat'
      });

      C.hbars(root.querySelector('#ch-lewat'), {
        rows: TT.kelewatan.map(function (k) {
          return { label: k.kluster, value: k.bulan, color: C.css('--c3'), note: 'Daripada surat representasi ke keputusan' };
        }),
        rowH: 30, labW: 90, valW: 70, minW: 300,
        fmtV: function (v) { return U.n(v) + ' bulan'; }, unit: 'Tempoh'
      });
    }
  };

  /* ======================================================= KRONOLOGI ====== */
  V.kronologi = {
    label: 'Kronologi',
    title: 'Kronologi penuh',
    render: function (root) {
      var K = R.KRONOLOGI, KAT = R.KATEGORI;

      var h = '<div class="sec-head"><div class="eyebrow">' + K.length + ' peristiwa · 1951–2030</div>' +
        '<h2>Kronologi penuh</h2>' +
        '<p class="lede">Setiap peristiwa yang bertarikh dalam laporan, boleh ditapis mengikut tema. ' +
        'Gunakannya untuk menguji urutan sebab dan akibat sendiri.</p></div>';

      h += '<div class="card"><div class="ctrl">' +
        '<div class="ctrl-row"><label>Tema</label><div id="kr-chips">' +
        '<button class="chip" data-k="*" aria-pressed="true">Semua</button>' +
        Object.keys(KAT).map(function (k) {
          return '<button class="chip" data-k="' + k + '" aria-pressed="false"><i style="background:' + KAT[k].warna + '"></i>' + U.esc(KAT[k].label) + '</button>';
        }).join('') + '</div></div>' +
        '<div class="ctrl-row"><label>Cari</label><input class="searchbox" id="kr-q" placeholder="Contoh: RAV, sukuk, hibah, BNM…" style="flex:1;min-width:180px"></div>' +
        '</div><div id="kr-count" class="mini" style="margin-bottom:12px"></div>' +
        '<div class="tl" id="kr-list"></div></div>';

      root.innerHTML = h;

      var st = { k: '*', q: '' };
      function render() {
        var list = K.filter(function (e) {
          if (st.k !== '*' && e.kategori !== st.k) return false;
          if (st.q) {
            var hay = (e.tarikh + ' ' + e.tajuk + ' ' + e.teks).toLowerCase();
            if (hay.indexOf(st.q) < 0) return false;
          }
          return true;
        });
        root.querySelector('#kr-count').textContent = list.length + ' daripada ' + K.length + ' peristiwa';
        root.querySelector('#kr-list').innerHTML = list.map(function (e) {
          var c = KAT[e.kategori] || { warna: '#888', label: e.kategori };
          return '<div class="tl-item" style="--dot:' + c.warna + '">' +
            '<style></style>' +
            '<div class="d" style="color:' + c.warna + '">' + U.esc(e.tarikh) + ' · ' + U.esc(c.label) + '</div>' +
            '<div class="h">' + U.esc(e.tajuk) + '</div>' +
            '<div class="b">' + U.esc(e.teks) + ' ' + U.src(e.src) + '</div></div>';
        }).join('');
        // warnakan bulatan
        root.querySelectorAll('#kr-list .tl-item').forEach(function (n, i) {
          var c = KAT[list[i].kategori];
          if (c) n.style.setProperty('--c', c.warna);
        });
        var sheet = root.querySelector('#kr-style');
        if (!sheet) {
          sheet = document.createElement('style');
          sheet.id = 'kr-style';
          document.head.appendChild(sheet);
        }
        sheet.textContent = list.map(function (e, i) {
          var c = (KAT[e.kategori] || {}).warna || '#888';
          return '#kr-list .tl-item:nth-child(' + (i + 1) + ')::before{border-color:' + c + '}';
        }).join('');
      }
      root.querySelector('#kr-chips').addEventListener('click', function (e) {
        var b = e.target.closest('.chip'); if (!b) return;
        root.querySelectorAll('#kr-chips .chip').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        st.k = b.dataset.k; render();
      });
      root.querySelector('#kr-q').addEventListener('input', function (e) {
        st.q = e.target.value.trim().toLowerCase(); render();
      });
      render();
    }
  };

  /* ============================================================ SYOR ====== */
  V.syor = {
    label: 'Syor',
    title: 'Syor Suruhanjaya',
    render: function (root) {
      var S = R.SYOR;
      var sasaran = [];
      S.forEach(function (s) { if (sasaran.indexOf(s.sasaran) < 0) sasaran.push(s.sasaran); });
      var kira = {};
      sasaran.forEach(function (k) { kira[k] = S.filter(function (s) { return s.sasaran === k; }).length; });

      var h = '<div class="sec-head"><div class="eyebrow">Bab 4 · Rumusan</div>' +
        '<h2>Syor Suruhanjaya</h2>' +
        '<p class="lede">Laporan menyenaraikan <b>25 syor bernombor</b> (4.4.1 hingga 4.4.25). Syor 4.4.1 mengandungi ' +
        'sembilan pindaan Akta 535 yang berasingan, jadi papan ini memecahkannya menjadi <b>' + S.length + ' tindakan</b>. ' +
        'Setiap satu dipadankan dengan penemuan yang menyebabkannya — supaya anda boleh menyemak sama ada cadangan itu ' +
        'benar-benar menyelesaikan masalah yang dikenal pasti.</p></div>';

      h += U.card('Kepada siapa syor ditujukan', '',
        U.chartBox('ch-syor') +
        '<div style="margin-top:12px">' + U.note('hati', 'Status pelaksanaan',
          'Laporan ini bertarikh 19 Julai 2022 dan hanya <b>mengesyorkan</b>. Ia tidak mempunyai kuasa untuk melaksanakan. ' +
          'Papan ini <b>tidak</b> menjejaki sama ada mana-mana syor telah dilaksanakan — maklumat itu tiada dalam dokumen sumber.') + '</div>',
        { pdf: 229, ms: '191' });

      h += '<div class="card"><h3>Semua syor</h3>' +
        '<div class="sub">Klik untuk melihat penemuan yang menjadi puncanya.</div>' +
        '<div class="ctrl"><div class="ctrl-row"><label>Ditujukan kepada</label><div id="sy-chips">' +
        '<button class="chip" data-s="*" aria-pressed="true">Semua (' + S.length + ' tindakan)</button>' +
        sasaran.map(function (k) { return '<button class="chip" data-s="' + U.esc(k) + '" aria-pressed="false">' + U.esc(k) + ' (' + kira[k] + ')</button>'; }).join('') +
        '</div></div></div>' +
        '<div id="sy-list"></div></div>';

      root.innerHTML = h;

      C.hbars(root.querySelector('#ch-syor'), {
        rows: sasaran.map(function (k, i) {
          return { label: k, value: kira[k], color: [C.css('--c5'), C.css('--c2'), C.css('--c1'), C.css('--c3'), C.css('--c4'), C.css('--c6')][i % 6] };
        }).sort(function (a, b) { return b.value - a.value; }),
        rowH: 30, labW: 110, valW: 50, minW: 300,
        fmtV: function (v) { return U.n(v) + ' syor'; }, unit: 'Bilangan syor'
      });

      var cur = '*';
      function renderSyor() {
        root.querySelector('#sy-list').innerHTML = S.filter(function (s) { return cur === '*' || s.sasaran === cur; })
          .map(function (s) {
            return '<details class="acc"><summary><span class="tag accent">' + U.esc(s.id) + '</span>' + U.esc(s.tajuk) + '</summary>' +
              '<div class="acc-body"><p><b>Syor:</b> ' + U.esc(s.teks) + '</p>' +
              '<p style="margin-bottom:0"><b>Penemuan yang menjadi puncanya:</b> ' + U.esc(s.punca) + '</p>' +
              '<div style="margin-top:8px"><span class="tag">' + U.esc(s.sasaran) + '</span></div></div></details>';
          }).join('');
      }
      root.querySelector('#sy-chips').addEventListener('click', function (e) {
        var b = e.target.closest('.chip'); if (!b) return;
        root.querySelectorAll('#sy-chips .chip').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        cur = b.dataset.s; renderSyor();
      });
      renderSyor();
    }
  };

  /* ========================================================== SUMBER ====== */
  V.sumber = {
    label: 'Sumber & nota',
    title: 'Sumber, batasan dan percanggahan',
    render: function (root) {
      var h = '<div class="sec-head"><div class="eyebrow">Integriti data</div>' +
        '<h2>Sumber, batasan dan percanggahan</h2>' +
        '<p class="lede">Analisis hanya sebaik data di belakangnya. Bahagian ini mendedahkan setiap kelemahan yang ' +
        'kami jumpa dalam data sumber, dan setiap kiraan yang kami buat sendiri.</p></div>';

      h += '<div class="callout blue"><b class="h">Dokumen sumber tunggal</b>' +
        R.META.tajuk + ' — ' + R.META.skop + '. Bertarikh ' + R.META.tarikhLaporan + ', dipersembahkan ' +
        R.META.tarikhPersembahan + '. ' + R.META.mukaSurat + ' muka surat. ' +
        '<a href="https://github.com/SyahmiRafsan/rci-tabunghaji" target="_blank" rel="noopener" style="font-weight:700">Teks penuh di GitHub ↗</a><br>' +
        '<span style="opacity:.85">Tiada data luar digunakan. Tiada anggaran daripada sumber lain dicampurkan.</span></div>';

      h += U.card('Percanggahan dalam laporan yang kami jumpa',
        'Kami tidak "membetulkan" mana-mana angka. Semua percanggahan dilaporkan seadanya.',
        R.PERCANGGAHAN.map(function (p, i) {
          return '<details class="acc"><summary><span class="tag warn">' + (i + 1) + '</span>' + U.esc(p.tajuk) + '</summary>' +
            '<div class="acc-body"><p>' + U.esc(p.teks) + '</p>' +
            '<p style="margin-bottom:0"><b>Bagaimana papan ini mengendalikannya:</b> ' + U.esc(p.kesan) + '</p>' +
            '<div style="margin-top:8px">' + U.srcs(p.src) + '</div></div></details>';
        }).join(''));

      h += U.card('Batasan yang perlu difahami', '',
        '<ul style="margin:0;padding-left:19px;font-size:13.8px;line-height:1.6">' +
        R.BATASAN.map(function (b) { return '<li style="margin-bottom:7px">' + U.esc(b) + '</li>'; }).join('') + '</ul>');

      h += U.card('Setiap kiraan terbitan dalam papan ini',
        'Semua ditanda <span class="tag accent">terbitan</span> di tempat ia muncul',
        U.table([
          { h: 'Kiraan', k: 'k' }, { h: 'Formula', k: 'f' }, { h: 'Digunakan di', k: 'd' }
        ], [
          { k: 'Agihan melebihi kemampuan', f: 'Hibah diagih − maks(0, lebihan sebelum agihan)', d: 'Jurang' },
          { k: 'Hibah 2014–2017 (RM12.65b)', f: 'Jumlah baris agihan 2014+2015+2016+2017', d: 'Jurang, Hibah' },
          { k: 'Nisbah bayar : mampu (4.2×)', f: '12,652 ÷ 3,019 (lebihan positif 2014+2015)', d: 'Hibah' },
          { k: 'Kombinasi tiga tuas (−RM5,630j)', f: '373 − 4,466 − 1,310 − 227', d: 'Tuas perakaunan' },
          { k: 'Simulasi had agihan hibah', f: 'baki(i) = baki(i−1) + perubahan bersih(i) − agihan terhad(i); perubahan bersih(i) = lebihan sebelum agihan(i) − baki selepas agihan(i−1)', d: 'Jurang' },
          { k: 'Nisbah tokokan RAV', f: '4,466 ÷ 373', d: 'Tuas perakaunan' },
          { k: 'Bahagian penilaian profesional THP', f: '556 ÷ 4,600', d: 'Tuas perakaunan' },
          { k: 'Premium mengikut kelas aset', f: 'Harga pemindahan − nilai pasaran, setiap baris', d: 'Pelan pemulihan' },
          { k: 'Nisbah tunai UJSB (5.1%)', f: '500 ÷ 9,730', d: 'Pelan pemulihan' },
          { k: 'Nilai saham mewah pada Jun 2022', f: '(jumlah pemindahan ÷ harga pemindahan) × harga Jun 2022', d: 'Pelan pemulihan' },
          { k: 'Bilangan jemaah dalam unjuran HAFIS', f: 'Jumlah HAFIS ÷ HAFIS seorang = 30,000 setiap tahun', d: 'Haji & HAFIS' },
          { k: 'Jumlah rosot nilai 14 pelaburan', f: 'Campuran angka RM yang dinyatakan sahaja', d: 'Pelaburan bermasalah' },
          { k: 'Pengelasan status undang-undang', f: 'Padanan kata kunci pada senarai tindakan setiap kes', d: 'Pelaburan bermasalah' },
          { k: 'Bonus TH Properties gabungan', f: '1,148,400 + 1,045,000 = 2,193,400; nama diseragamkan (Abdul → Abd) sebelum digabung', d: 'Bonus' },
          { k: 'Individu vs bayaran (11 vs 21)', f: 'Bilangan nama unik selepas penyeragaman ejaan, berbanding jumlah baris dalam dua jadual', d: 'Bonus' }
        ]));

      h += U.card('Istilah dalam bahasa mudah', 'Semua istilah teknikal yang digunakan dalam papan ini',
        '<div class="grid g2">' + R.ISTILAH.map(function (i) {
          return '<div style="padding:9px 0;border-bottom:1px solid var(--line)">' +
            '<div style="font-weight:750;font-size:13.6px">' + U.esc(i.istilah) + '</div>' +
            '<div style="font-size:13px;color:var(--ink-2);margin-top:2px">' + U.esc(i.maksud) + '</div></div>';
        }).join('') + '</div>');

      h += U.card('Tentang Suruhanjaya', '',
        '<div class="grid g2"><div>' +
        U.table([{ h: 'Pesuruhjaya', k: 'n' }, { h: 'Latar belakang', k: 'l' }],
          R.META.pesuruhjaya.map(function (p) { return { n: p.nama, l: p.latar }; })) +
        '</div><div>' +
        U.readout([
          { k: 'Tempoh siasatan', v: '6 bulan', d: R.META.tempoh },
          { k: 'Saksi Akuan Berkanun', v: String(R.META.saksiABS) },
          { k: 'Saksi dipanggil', v: String(R.META.saksiProsiding) },
          { k: 'Agensi ditaklimat', v: String(R.META.agensiTaklimat.length) }
        ]) +
        '<div style="margin-top:12px">' + U.note('baca', 'Prosiding tertutup',
          'Semua prosiding dijalankan secara tertutup dan tertakluk kepada Akta Rahsia Rasmi 1972. ' +
          'Nota keterangan saksi dan semua ekshibit diklasifikasikan RAHSIA. Hanya laporan akhir ini tersedia untuk umum.') + '</div>' +
        '<div style="margin-top:10px">' + U.note('penting', 'Permintaan terakhir Suruhanjaya',
          '"Suruhanjaya berharap Kerajaan akan menimbang supaya laporan Suruhanjaya ini diumumkan kepada awam ' +
          'mengikut mana-mana bahagian yang bersesuaian." ' + U.src({ pdf: 237, ms: '199' })) + '</div>' +
        '</div></div>', R.META.src);

      root.innerHTML = h;
    }
  };
})();
