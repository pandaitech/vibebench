/* ===========================================================================
   PAPARAN 2 — Bonus · Pelan pemulihan (UJSB) · Haji & HAFIS
   =========================================================================== */
(function () {
  'use strict';
  var R = window.RCI, U = window.UI, C = window.Ch;
  var V = window.VIEWS = window.VIEWS || {};

  /* ========================================================== BONUS ====== */
  V.bonus = {
    label: 'Bonus',
    title: 'Bonus dalam tahun-tahun defisit',
    render: function (root) {
      var B = R.BONUS, K = R.KEWANGAN;

      var h = '<div class="sec-head"><div class="eyebrow">Bab 3.12</div>' +
        '<h2>Bonus dalam tahun-tahun defisit</h2>' +
        '<p class="lede">Pekeliling Perbendaharaan menetapkan bonus badan berkanun tidak melebihi dua bulan gaji ' +
        'melainkan ramai pekerja menunjukkan prestasi cemerlang. Bahagian ini membandingkan apa yang dibayar dengan ' +
        'keadaan kewangan sebenar pada tahun yang sama.</p></div>';

      h += '<div class="callout warn"><b class="h">Peraturan asas</b>' + U.esc(B.peraturan) + ' ' + U.src(B.srcPeraturan) + '</div>';

      h += U.card('Peruntukan bonus kakitangan, 2010–2020',
        'RM juta. Garisan menunjukkan bilangan bulan gaji tertinggi yang diluluskan.',
        U.chartBox('ch-bonus') +
        U.legend([
          { name: 'Peruntukan bonus (RM juta)', color: C.css('--c5') },
          { name: 'Bulan gaji tertinggi', color: C.css('--c3') }
        ]) +
        U.reading({
          apa: 'Jumlah wang yang diperuntukkan untuk bonus kakitangan setiap tahun, dan berapa bulan gaji ia bersamaan bagi penerima tertinggi.',
          kenapa: 'Puncak bonus (2014, RM74 juta, sehingga 13 bulan gaji) berlaku pada tahun yang sama kedudukan aset mula jatuh di bawah liabiliti.',
          simpul: 'Selepas 2018, bonus dikawal ketat kepada satu bulan sahaja — turun 85% daripada paras 2014. Ini menunjukkan paras sebelumnya memang boleh dikurangkan tanpa merosakkan operasi.',
          hati: 'Angka ini ialah <b>peruntukan keseluruhan</b>, bukan bonus seorang pekerja. Julat "1–11 bulan" bermakna sebahagian kakitangan hanya menerima sebulan.'
        }), B.src);

      // Bonus vs jurang
      h += U.card('Bonus berbanding keadaan kewangan sebenar',
        'Melapiskan bonus di atas jurang aset–liabiliti selepas agihan hibah',
        U.chartBox('ch-bonus-gap') +
        U.legend([
          { name: 'Baki selepas agihan (RM juta)', color: C.css('--c1') },
          { name: 'Peruntukan bonus (RM juta)', color: C.css('--c5') }
        ]) +
        U.reading({
          apa: 'Lajur merah = kedudukan aset tolak liabiliti. Titik ungu = peruntukan bonus tahun berkenaan.',
          kenapa: 'Justifikasi bonus yang diberikan kepada MOF ialah "keuntungan yang besar". Keuntungan itu dikira menggunakan RAV.',
          simpul: 'Bonus tertinggi dibayar tepat pada tahun-tahun kedudukan kewangan paling teruk. Suruhanjaya menyimpulkan pemberian bonus tinggi adalah "tidak wajar".',
          hati: 'Skala kedua-dua siri sangat berbeza (bilion lawan juta). Carta ini menunjukkan <b>masa</b>, bukan magnitud relatif.'
        }), B.untungVsBonus.src);

      // Jadual untung vs bonus
      var uv = B.untungVsBonus;
      h += U.card('Keuntungan yang dilaporkan lawan bonus', 'RM juta',
        U.table([
          { h: 'Tahun', k: 't' },
          { h: 'Keuntungan bersih dilaporkan', k: 'u', n: true, fmt: U.n },
          { h: 'Peruntukan bonus', k: 'b', n: true, fmt: U.n },
          { h: 'Bonus / keuntungan', k: 'p', n: true, fmt: function (v) { return U.n(v, 1) + '%'; } },
          { h: 'Baki aset–liabiliti tahun sama', k: 'g', n: true, fmt: function (v) { return v === null ? '—' : (v < 0 ? '(' + U.n(-v) + ')' : U.n(v)); } },
          { h: 'Agihan bulan gaji', k: 'm' }
        ], uv.tahun.map(function (t, i) {
          var gi = K.tahun.indexOf(t);
          return {
            t: t, u: uv.untungBersih[i], b: uv.bonus[i], p: uv.peratus[i],
            g: gi >= 0 ? K.selepasAgihan[gi] : null, m: uv.tahun[i] ? bulanFor(t) : '',
            _c_g: gi >= 0 && K.selepasAgihan[gi] < 0 ? 'neg' : 'pos',
            _cls: gi >= 0 && K.selepasAgihan[gi] < 0 ? 'hi' : ''
          };
        })) +
        '<div class="mini" style="margin-top:9px">Baris berlorek = tahun aset kurang daripada liabiliti selepas hibah diagihkan. ' +
        'Lajur "Baki aset–liabiliti" digabungkan daripada jadual PwC <span class="tag accent">terbitan</span>.</div>',
        uv.src);

      // TH Properties
      var jum = B.thProperties.jum2017 + B.thProperties.jum2018;
      h += U.card('Bonus istimewa TH Properties: RM' + U.n(jum),
        'Dua kelulusan berasingan, 2017 dan 2018 · 11 individu, 21 bayaran',
        '<div class="ctrl"><div class="ctrl-row"><label>Tahun</label>' +
        U.seg('thp', [{ v: '2017', l: '2017 · RM1,148,400' }, { v: '2018', l: '2018 · RM1,045,000' }, { v: 'both', l: 'Gabungan' }], 'both') +
        '</div></div>' +
        U.chartBox('ch-thp') +
        '<div id="thp-note" style="margin-top:12px"></div>' +
        '<div style="margin-top:12px">' + U.note('hati', 'Pandangan undang-undang', U.esc(B.thProperties.undang) + ' ' + U.src(B.thProperties.srcUndang)) + '</div>' +
        '<div style="margin-top:10px">' + U.note('penting', 'Perhatikan',
          '<b>Sepuluh</b> daripada 11 individu menerima bayaran pada kedua-dua tahun. Kesemua <b>empat</b> ahli yang menghadiri ' +
          'Mesyuarat Exco TH Properties pada 12 April 2017 menerima bonus 2017, dan kesemua <b>empat</b> ahli Lembaga ' +
          'THP Australia yang bermesyuarat pada 23 April 2018 menerima bonus 2018. ' +
          '<span class="tag accent">terbitan</span> — dibandingkan daripada senarai kehadiran mesyuarat dan senarai penerima dalam laporan.') + '</div>' +
        '<div style="margin-top:10px">' + U.note('hati', 'Nota ejaan nama', U.esc(B.thProperties.notaNama)) + '</div>' +
        U.reading({
          apa: 'Jumlah bonus istimewa yang diterima setiap individu.',
          kenapa: 'Suruhanjaya mengesyorkan wang ini dituntut semula kerana ia diberikan tanpa mematuhi peraturan syarikat.',
          simpul: 'Bayaran ini berlaku pada 2017 dan 2018 — tempoh yang sama kedudukan kewangan induk LTH paling teruk.',
          hati: 'Laporan tidak menyatakan sama ada wang ini sudah berjaya dituntut semula setakat tarikh laporan.'
        }), B.thProperties.src2017);

      root.innerHTML = h;

      C.bars(root.querySelector('#ch-bonus'), {
        cats: B.tahun.map(String), height: 260, slot: 52,
        series: [
          { name: 'Peruntukan bonus (RM juta)', color: C.css('--c5'), data: B.peruntukan },
          { name: 'Bulan gaji tertinggi', color: C.css('--c3'), data: B.bulanMax, type: 'line' }
        ],
        fmtV: function (v) { return U.n(v, 1); },
        tipTitle: function (c) { return 'Tahun ' + c; },
        tipExtra: function (i) { return '<div style="margin-top:4px;opacity:.85">Agihan: ' + B.bulan[i] + ' bulan</div>'; }
      });

      C.bars(root.querySelector('#ch-bonus-gap'), {
        cats: K.tahun.map(String), height: 250,
        series: [
          { name: 'Baki selepas agihan (RM juta)', color: C.css('--c1'), data: K.selepasAgihan },
          {
            name: 'Peruntukan bonus (RM juta)', color: C.css('--c5'), type: 'line',
            data: K.tahun.map(function (t) { var i = B.tahun.indexOf(t); return i >= 0 ? B.peruntukan[i] : null; })
          }
        ],
        fmtV: function (v) { return U.n(v, 1); },
        tipTitle: function (c) { return 'Tahun ' + c; }
      });

      function drawTHP(m) {
        var map = {};
        function norm(s) {
          // buang gelaran, dan seragamkan "Abd" / "Abdul" yang dieja berbeza
          // antara dua jadual dalam laporan bagi individu yang sama
          return s.replace(/^(Datuk|Dato’|Dato'|Haji|Encik|Puan)\s+/, '')
            .replace(/\bAbdul\b/g, 'Abd');
        }
        function add(list, key) {
          list.forEach(function (x) {
            var nm = norm(x.nama);
            map[nm] = map[nm] || { nama: nm, y2017: 0, y2018: 0 };
            map[nm][key] = x.jumlah;
          });
        }
        add(B.thProperties.y2017, 'y2017');
        add(B.thProperties.y2018, 'y2018');
        var list = Object.keys(map).map(function (k) { return map[k]; });
        list.forEach(function (x) { x.jum = x.y2017 + x.y2018; });
        var key = m === '2017' ? 'y2017' : (m === '2018' ? 'y2018' : 'jum');
        list.sort(function (a, b) { return b[key] - a[key]; });
        C.hbars(root.querySelector('#ch-thp'), {
          rows: list.filter(function (x) { return x[key] > 0; }).map(function (x) {
            return {
              label: x.nama, value: x[key],
              color: (x.y2017 > 0 && x.y2018 > 0) ? C.css('--c1') : C.css('--c2'),
              note: (x.y2017 > 0 && x.y2018 > 0 ? 'Menerima pada kedua-dua tahun. ' : '') +
                '2017: ' + (x.y2017 ? 'RM' + U.n(x.y2017) : '—') + ' · 2018: ' + (x.y2018 ? 'RM' + U.n(x.y2018) : '—')
            };
          }),
          rowH: 27, labW: 150, valW: 78, minW: 400,
          fmtV: function (v) { return U.n(v); }, unit: 'Bonus (RM)'
        });
        var total = list.reduce(function (a, x) { return a + x[key]; }, 0);
        root.querySelector('#thp-note').innerHTML = U.readout([
          { k: 'Jumlah dipaparkan', v: 'RM' + U.n(total) },
          { k: 'Bilangan penerima', v: String(list.filter(function (x) { return x[key] > 0; }).length) },
          { k: 'Penerima dua tahun', v: String(list.filter(function (x) { return x.y2017 > 0 && x.y2018 > 0; }).length), cls: 'neg' },
          { k: 'Bayaran tertinggi', v: 'RM' + U.n(Math.max.apply(null, list.map(function (x) { return x[key]; }))) }
        ]) + U.legend([
          { name: 'Menerima pada kedua-dua tahun', color: C.css('--c1') },
          { name: 'Satu tahun sahaja', color: C.css('--c2') }
        ]);
      }
      U.bindSeg(root, 'thp', drawTHP);
      drawTHP('both');

      function bulanFor(t) {
        var i = B.tahun.indexOf(t);
        return i >= 0 ? B.bulan[i] : '—';
      }
    }
  };

  /* =========================================================== UJSB ====== */
  V.ujsb = {
    label: 'Pelan pemulihan',
    title: 'Pelan pemulihan 2018 dan Urusharta Jamaah',
    render: function (root) {
      var W = R.UJSB;

      var h = '<div class="sec-head"><div class="eyebrow">Bab 3.13</div>' +
        '<h2>Pelan pemulihan 2018 dan Urusharta Jamaah</h2>' +
        '<p class="lede">Untuk menutup jurang, aset lemah Tabung Haji dijual kepada sebuah syarikat milik Kerajaan ' +
        'pada harga jauh melebihi nilai pasaran. Bayarannya bukan tunai, tetapi sukuk yang perlu dilunaskan pada 2026 ' +
        'dan 2029. Bahagian ini menjejaki di mana wang itu berada sekarang.</p></div>';

      h += '<div class="callout neg"><b class="h">Transaksi teras</b>' +
        'Aset bernilai pasaran <b>' + U.rmJuta(W.aset.jumlah.pasaran) + '</b> dipindahkan pada harga <b>' + U.rmJuta(W.aset.jumlah.pindah) + '</b>. ' +
        'Premium <b>RM10.2 bilion</b> — iaitu ' + U.pct(W.aset.premium / W.aset.jumlah.pasaran * 100, 0) + ' di atas nilai pasaran ' +
        '<span class="tag accent">terbitan</span>. Bayarannya: sukuk berkupon sifar bernilai nominal RM27.5 bilion. ' + U.src(W.src) + '</div>';

      // Pemindahan aset
      h += U.card('Apa yang dipindahkan, dan pada harga berapa',
        W.kandungan + ' Semua nilai RM juta.',
        U.chartBox('ch-ujsb-aset') +
        U.legend([
          { name: 'Nilai buku LTH', color: C.css('--c6') },
          { name: 'Harga pemindahan', color: C.css('--c1') },
          { name: 'Nilai pasaran ketika itu', color: C.css('--c2') }
        ]) +
        '<div style="margin-top:12px">' + U.table([
          { h: 'Kelas aset', k: 'l' },
          { h: 'Nilai buku', k: 'b', n: true, fmt: U.n },
          { h: 'Harga pemindahan', k: 'p', n: true, fmt: U.n },
          { h: 'Nilai pasaran', k: 'm', n: true, fmt: U.n },
          { h: 'Premium', k: 'pr', n: true, fmt: function (v) { return U.n(v); } },
          { h: 'Premium %', k: 'pc', n: true, fmt: function (v) { return U.n(v, 0) + '%'; } }
        ], W.aset.baris.map(function (b) {
          return {
            l: b.label, b: b.buku, p: b.pindah, m: b.pasaran,
            pr: b.pindah - b.pasaran, pc: (b.pindah - b.pasaran) / b.pasaran * 100,
            _c_pr: 'neg'
          };
        }).concat([{
          l: 'Jumlah', b: W.aset.jumlah.buku, p: W.aset.jumlah.pindah, m: W.aset.jumlah.pasaran,
          pr: W.aset.premium, pc: W.aset.premium / W.aset.jumlah.pasaran * 100, _cls: 'tot'
        }])) + '</div>' +
        U.reading({
          apa: 'Tiga penilaian bagi aset yang sama: nilai dalam buku LTH, harga jualan kepada UJSB, dan nilai pasaran sebenar pada masa itu.',
          kenapa: 'Ekuiti tersenarai membentuk hampir keseluruhan premium — dipindah pada RM16,851 juta sedangkan nilai pasaran hanya RM7,600 juta.',
          simpul: 'Premium RM9,251 juta pada ekuiti sahaja <span class="tag accent">terbitan</span> ialah 91% daripada jumlah premium. Ini bukan isu penilaian hartanah, ia isu saham.',
          hati: 'Premium bukan bermakna wang diberi percuma. Ia bayaran tertunda yang akhirnya perlu ditanggung Kerajaan melalui penebusan sukuk.'
        }), W.src);

      // Sukuk
      h += U.card('Bayarannya: sukuk berkupon sifar, bukan tunai',
        U.esc(W.sukuk.ciri) + ' ' + U.src(W.sukuk.srcCiri),
        '<div class="grid g2">' +
        W.sukuk.siri.map(function (s) {
          return '<div style="background:var(--bg-3);border-radius:var(--r-sm);padding:13px">' +
            '<div style="font-weight:800;font-size:15px">' + s.nama + '</div>' +
            '<div class="mini" style="margin-bottom:8px">Matang ' + s.matang + ' · tempoh ' + s.tempoh + ' tahun · pulangan ' + s.ytm + '% setahun</div>' +
            U.readout([
              { k: 'Nilai langganan', v: 'RM' + U.n(s.prinsipal, 1) + 'b' },
              { k: 'Nilai nominal matang', v: 'RM' + U.n(s.nominal, 1) + 'b', cls: 'neg' }
            ]) + '</div>';
        }).join('') + '</div>' +
        '<div style="margin-top:12px">' + U.note('hati', 'Ini bermakna apa untuk pendeposit?',
          'Berkupon sifar bermaksud <b>tiada tunai masuk setiap tahun</b>. LTH tetap merekod keuntungan RM840 juta setahun ' +
          'daripada sukuk ini dan mengagihkan sebahagiannya sebagai hibah — tetapi wang tunai untuk membayarnya datang ' +
          'daripada deposit baharu, bukan daripada sukuk. Pendapatan tertunggak terkumpul melebihi RM2.1 bilion setakat ' +
          '31 Disember 2021. ' + U.src(W.risiko.src)) + '</div>' +
        '<div style="margin-top:10px">' + U.note('penting', 'Status jaminan', U.esc(W.sukuk.jaminan) + ' ' + U.src(W.sukuk.srcJaminan)) + '</div>',
        W.sukuk.src);

      // Jejak tunai
      h += U.card('Jejak tunai: berapa sebenarnya LTH terima?',
        'Berbanding nilai pasaran aset yang diserahkan',
        U.chartBox('ch-ujsb-tunai') +
        '<div style="margin-top:12px">' + U.readout([
          { k: 'Nilai pasaran aset diserah', v: U.rmJuta(W.tunaiDiterima.nilaiPasaranDipindah) },
          { k: 'Tunai diterima setakat laporan', v: U.rmJuta(W.tunaiDiterima.jumlah), cls: 'neg' },
          { k: 'Nisbah tunai', v: U.pct(W.tunaiDiterima.jumlah / W.tunaiDiterima.nilaiPasaranDipindah * 100, 1), d: 'terbitan' },
          { k: 'Baki sebagai sukuk', v: 'RM27.5b', d: 'matang 2026 & 2029' }
        ]) + '</div>' +
        U.reading({
          apa: 'Semua bayaran tunai yang diterima LTH daripada UJSB setakat tarikh laporan.',
          kenapa: 'Pelan pemulihan menyelamatkan kunci kira-kira LTH, tetapi tidak memberi wang tunai untuk dilaburkan semula.',
          simpul: 'Hanya 5.1% daripada nilai pasaran aset yang diserahkan telah kembali dalam bentuk tunai. Selebihnya bergantung sepenuhnya kepada peruntukan Kerajaan.',
          hati: 'Ini bukan bermakna RM9.2 bilion "hilang". Ia bermakna ia belum dibayar dan bergantung kepada belanjawan tahunan Kerajaan.'
        }), W.tunaiDiterima.src);

      // Komitmen kerajaan
      h += U.card('Komitmen Kerajaan berbanding realiti',
        'Jemaah Menteri (5 April 2019) meluluskan sekurang-kurangnya RM17.8 bilion',
        U.chartBox('ch-ujsb-komit') +
        '<div style="margin-top:12px">' + U.note('hati', 'Apa berlaku pada 2021',
          U.esc(W.komitmenKerajaan.sebab2021) + ' ' + U.src(W.komitmenKerajaan.src)) + '</div>' +
        U.reading({
          apa: 'Peruntukan tahunan RM1.73 bilion yang dijanjikan berbanding jumlah yang benar-benar disalurkan setakat laporan.',
          kenapa: 'Suruhanjaya menyifatkan kegagalan melunaskan obligasi ini sebagai "risiko terbesar LTH".',
          simpul: 'Dalam dua tahun pertama, RM500 juta diterima daripada RM2.23 bilion yang sepatutnya <span class="tag accent">terbitan</span>. Jurang ini terkumpul ke arah 2026.',
          hati: 'Laporan hanya meliputi sehingga pertengahan 2022. Peruntukan selepas tarikh itu tidak diketahui daripada dokumen ini.'
        }), W.komitmenKerajaan.src);

      // Komitmen jaminan negara
      var jn = W.jaminanNegara;
      h += U.card('Di mana UJSB berdiri dalam senarai jaminan Kerajaan',
        'Komitmen Jaminan Kerajaan Persekutuan, RM juta (2021)',
        U.chartBox('ch-ujsb-jn') +
        '<div style="margin-top:12px">' + U.readout([
          { k: 'UJSB (2021)', v: U.rmJuta(jn.entiti[3].y2021), cls: 'neg' },
          { k: 'Bahagian', v: U.pct(jn.entiti[3].y2021 / jn.jumlah.y2021 * 100, 1) },
          { k: 'Kedudukan', v: 'ke-4', d: 'daripada 13 entiti' },
          { k: 'Jumlah semua', v: U.rmJuta(jn.jumlah.y2021) }
        ]) + '</div>' +
        U.reading({
          apa: 'Semua entiti yang hutangnya dijamin oleh Kerajaan Persekutuan, mengikut saiz.',
          kenapa: 'Ia meletakkan penyelamatan Tabung Haji dalam konteks kewangan negara — setara dengan projek infrastruktur besar.',
          simpul: 'UJSB kekal antara empat komitmen jaminan terbesar Kerajaan, meningkat sedikit daripada 2020 ke 2021 kerana keuntungan sukuk terus terakru.',
          hati: 'Nilai UJSB di sini (RM21.1 bilion) ialah nilai terakru semasa, bukan nilai nominal matang RM27.5 bilion.'
        }), jn.src);

      // Hartanah
      h += U.card('Apa jadi kepada aset selepas dipindahkan? (1) Hartanah',
        'Harga pemindahan berbanding nilai pasaran 31 Disember 2021',
        U.chartBox('ch-ujsb-hart') +
        U.legend([{ name: 'Harga pemindahan', color: C.css('--c1') }, { name: 'Nilai pasaran Dis 2021', color: C.css('--c2') }]) +
        '<div style="margin-top:12px">' + U.readout([
          { k: 'Harga pemindahan', v: U.rm(W.hartanah.jumlah.pindah / 1e6, 0) + 'j' },
          { k: 'Nilai pasaran Dis 2021', v: U.rm(W.hartanah.jumlah.pasaran / 1e6, 0) + 'j', cls: 'neg' },
          { k: 'Kejatuhan', v: U.pct((W.hartanah.jumlah.pasaran - W.hartanah.jumlah.pindah) / W.hartanah.jumlah.pindah * 100, 1), cls: 'neg' },
          { k: 'Keluasan', v: U.n(W.hartanah.jumlah.kps / 1000, 0) + 'k kps' }
        ]) + '</div>' +
        '<div style="margin-top:12px">' + U.note('baca', 'Nota penilaian', U.esc(W.hartanah.jppham)) + '</div>' +
        U.reading({
          apa: 'Nilai 29 hartanah yang dipindah, mengikut jenis, pada dua titik masa.',
          kenapa: 'Ia menguji sama ada premium pemindahan berjaya "dipulihkan" seperti yang diharapkan pelan pemulihan.',
          simpul: 'Setiap kategori hartanah kehilangan nilai. Hotel dan menara pejabat paling teruk (−47% dan −56%).',
          hati: 'Sebahagian kejatuhan ini berlaku kerana pandemik Covid-19, seperti yang laporan sendiri nyatakan. Ia bukan semata-mata bukti penilaian asal yang salah.'
        }), W.hartanah.src);

      // Blue chips
      h += U.card('Apa jadi kepada aset selepas dipindahkan? (2) Saham mewah',
        'Lima kaunter "bluechip" — harga pemindahan, harga 31 Dis 2018, dan harga ' + W.bluechip.tarikh2022,
        U.chartBox('ch-ujsb-bc') +
        U.legend([
          { name: 'Harga pemindahan', color: C.css('--c1') },
          { name: '31 Dis 2018', color: C.css('--c3') },
          { name: W.bluechip.tarikh2022, color: C.css('--c2') }
        ]) +
        '<div id="bc-out" style="margin-top:12px"></div>' +
        '<div style="margin-top:12px">' + U.note('hati', 'Kaedah kiraan kami',
          '<span class="tag accent">terbitan</span> Bilangan unit dikira sebagai (jumlah nilai pemindahan ÷ harga pemindahan seunit), ' +
          'kemudian didarab dengan harga ' + W.bluechip.tarikh2022 + '. Laporan hanya memberi harga seunit bagi tarikh 2022, ' +
          'tidak memberi jumlah nilai. Kiraan ini menganggap bilangan unit tidak berubah — laporan tidak menyatakan ' +
          'sama ada UJSB telah menjual sebahagian daripada kaunter-kaunter ini.') + '</div>' +
        U.reading({
          apa: 'Perjalanan harga bagi lima saham terbesar yang dipindahkan.',
          kenapa: 'Saham inilah yang membentuk sebahagian besar premium RM10.2 bilion.',
          simpul: 'Pada Jun 2022 — tiga setengah tahun selepas pemindahan — kelima-lima kaunter masih di bawah harga pemindahan. Laporan menyatakan perkara ini secara langsung.',
          hati: 'Harga saham naik turun. Snapshot dua tarikh tidak sama dengan pulangan sebenar, dan tidak mengambil kira dividen yang diterima.'
        }), W.bluechip.src);

      // ROFR
      h += U.card('Hak Penolakan Pertama: tawaran pada harga premium',
        'Sembilan tawaran belian semula yang direkodkan dalam laporan',
        U.chartBox('ch-ujsb-rofr') +
        '<div style="margin-top:12px">' + U.note('penting', 'Kenapa ini penting',
          'Hak Penolakan Pertama sepatutnya melindungi LTH. Tetapi dalam tujuh daripada sembilan tawaran, ' +
          'harga yang ditawarkan <b>lebih tinggi</b> daripada harga pasaran terbuka pada hari yang sama — ' +
          'bermakna LTH boleh membeli saham yang sama lebih murah di pasaran. ' + U.src(W.rofr.src)) + '</div>' +
        '<div style="margin-top:10px">' + U.table([
          { h: 'Syarikat', k: 's' }, { h: 'Tarikh', k: 't' },
          { h: 'Unit', k: 'u', n: true, fmt: U.n },
          { h: 'Harga ROFR', k: 'hr', n: true, fmt: function (v) { return U.n(v, 3); } },
          { h: 'Harga pasaran', k: 'hp', n: true, fmt: function (v) { return U.n(v, 3); } },
          { h: 'Premium', k: 'p', n: true, fmt: function (v) { return U.n(v, 1) + '%'; } }
        ], W.rofr.baris.map(function (b) {
          return {
            s: b.syarikat, t: b.tarikh, u: b.unit, hr: b.hargaRofr, hp: b.hargaPasaran, p: b.premium,
            _c_p: b.premium > 0 ? 'neg' : 'pos'
          };
        })) + '</div>',
        W.rofr.src);

      // Pelupusan
      h += U.card('Prestasi pelupusan aset setakat laporan', '',
        U.readout([
          { k: 'Hartanah dijual', v: '1', cls: 'neg', d: 'RM920 ribu' },
          { k: 'Hartanah tanpa bidaan', v: String(W.pelupusan.hartanahTiadaBidaan) },
          { k: 'Kaunter dilupuskan', v: W.pelupusan.kaunterDilupus + ' / ' + W.pelupusan.kaunterAsal },
          { k: 'Kerugian UJSB 2019', v: U.rmJuta(W.pelupusan.kerugianUJSB2019), cls: 'neg' }
        ]) +
        '<div style="margin-top:12px">' + U.note('baca', 'Apa UJSB lakukan dengan hasil jualan',
          'UJSB melabur semula dalam ' + W.pelupusan.kaunterDilaburSemula + ' kaunter tempatan dan antarabangsa. ' +
          'Portfolio baharu menjana ' + W.pelupusan.pendapatanPortfolio + ' — cukup untuk menampung operasi UJSB ' +
          'tanpa bergantung kepada modal kerja Kerajaan, tetapi jauh daripada mencukupi untuk menebus sukuk RM27.5 bilion. ' + U.src(W.pelupusan.src)) + '</div>' +
        '<div style="margin-top:10px">' + U.note('hati', 'Nota',
          U.esc(W.pelupusan.sriAman) + ' Sepuluh hartanah lagi masih perlu ditawarkan kepada LTH.') + '</div>',
        W.pelupusan.src);

      root.innerHTML = h;

      C.bars(root.querySelector('#ch-ujsb-aset'), {
        cats: W.aset.baris.map(function (b) { return b.label.length > 18 ? b.label.slice(0, 17) + '…' : b.label; }),
        height: 260, padL: 52, slot: 110,
        series: [
          { name: 'Nilai buku', color: C.css('--c6'), data: W.aset.baris.map(function (b) { return b.buku; }) },
          { name: 'Harga pemindahan', color: C.css('--c1'), data: W.aset.baris.map(function (b) { return b.pindah; }) },
          { name: 'Nilai pasaran', color: C.css('--c2'), data: W.aset.baris.map(function (b) { return b.pasaran; }) }
        ],
        fmtV: function (v) { return U.n(v); },
        tipTitle: function (c, i) { return W.aset.baris[i].label; }
      });

      C.hbars(root.querySelector('#ch-ujsb-tunai'), {
        rows: [
          { label: 'Nilai pasaran aset diserah', value: W.tunaiDiterima.nilaiPasaranDipindah, color: C.css('--c2') },
          { label: 'Tunai diterima LTH', value: W.tunaiDiterima.jumlah, color: C.css('--c1') }
        ],
        rowH: 42, labW: 148, valW: 84, minW: 340,
        fmtV: function (v) { return U.rmJuta(v); }, unit: 'RM juta'
      });

      C.bars(root.querySelector('#ch-ujsb-komit'), {
        cats: ['2020', '2021'], height: 220, slot: 120,
        series: [
          { name: 'Dijanjikan (RM juta)', color: C.css('--c6'), data: [500, 1730] },
          { name: 'Diterima (RM juta)', color: C.css('--c1'), data: [500, 0] }
        ],
        fmtV: function (v) { return U.n(v); },
        tipTitle: function (c) { return 'Tahun ' + c; }
      });

      C.hbars(root.querySelector('#ch-ujsb-jn'), {
        rows: jn.entiti.map(function (e) {
          return {
            label: e.nama.replace(/ (Sdn\.|Berhad|Bhd\.).*$/, ''), value: e.y2021,
            color: e.sorot ? C.css('--c1') : C.css('--c6'), dim: !e.sorot,
            note: U.pct(e.y2021 / jn.jumlah.y2021 * 100, 1) + ' daripada jumlah'
          };
        }),
        rowH: 26, labW: 128, valW: 74, minW: 400,
        fmtV: function (v) { return U.n(v); }, unit: 'RM juta (2021)'
      });

      C.bars(root.querySelector('#ch-ujsb-hart'), {
        cats: W.hartanah.baris.map(function (b) { return b.label; }),
        height: 250, padL: 50, slot: 88,
        series: [
          { name: 'Harga pemindahan (RM juta)', color: C.css('--c1'), data: W.hartanah.baris.map(function (b) { return b.pindah / 1e6; }) },
          { name: 'Nilai pasaran Dis 2021 (RM juta)', color: C.css('--c2'), data: W.hartanah.baris.map(function (b) { return b.pasaran / 1e6; }) }
        ],
        fmtV: function (v) { return U.n(v, 0); },
        tipExtra: function (i) {
          var b = W.hartanah.baris[i];
          return '<div class="r"><span>Perubahan</span><span>' + U.pct((b.pasaran - b.pindah) / b.pindah * 100, 1) + '</span></div>' +
            '<div class="r"><span>Keluasan</span><span>' + U.n(b.kps) + ' kps</span></div>';
        }
      });

      var bcRows = W.bluechip.baris.map(function (b) {
        return {
          label: b.kaunter,
          points: [
            { v: b.hargaPindah, color: C.css('--c1'), name: 'Harga pemindahan' },
            { v: b.harga2018, color: C.css('--c3'), name: '31 Dis 2018' },
            { v: b.harga2022, color: C.css('--c2'), name: W.bluechip.tarikh2022 }
          ],
          right: U.pct((b.harga2022 - b.hargaPindah) / b.hargaPindah * 100, 0),
          rightColor: b.harga2022 < b.hargaPindah ? C.css('--c1') : C.css('--c4'),
          note: 'Nilai pemindahan RM' + U.n(b.jumPindah)
        };
      });
      C.dumbbell(root.querySelector('#ch-ujsb-bc'), {
        rows: bcRows, rowH: 40, labW: 66, minW: 330,
        fmtV: function (v) { return 'RM' + U.n(v, 2); },
        fmtAxis: function (v) { return U.n(v, 1); }
      });

      var unit2022 = W.bluechip.baris.reduce(function (a, b) {
        return a + (b.jumPindah / b.hargaPindah) * b.harga2022;
      }, 0);
      root.querySelector('#bc-out').innerHTML = U.readout([
        { k: 'Nilai pemindahan', v: U.rmJuta(W.bluechip.jumPindah / 1e6) },
        { k: 'Nilai 31 Dis 2018', v: U.rmJuta(W.bluechip.jum2018 / 1e6), cls: 'neg', d: U.pct(W.bluechip.jatuh2018 / W.bluechip.jumPindah * 100, 1) },
        { k: 'Nilai ' + W.bluechip.tarikh2022, v: U.rmJuta(unit2022 / 1e6), cls: 'neg', d: 'terbitan' },
        { k: 'Beza vs pemindahan', v: U.pct((unit2022 - W.bluechip.jumPindah) / W.bluechip.jumPindah * 100, 1), cls: 'neg', d: 'terbitan' }
      ]);

      C.hbars(root.querySelector('#ch-ujsb-rofr'), {
        rows: W.rofr.baris.map(function (b) {
          return {
            label: b.syarikat + ' · ' + b.tarikh.slice(0, 6),
            value: b.premium,
            color: b.premium > 0 ? C.css('--c1') : C.css('--c4'),
            note: 'ROFR RM' + U.n(b.hargaRofr, 3) + ' vs pasaran RM' + U.n(b.hargaPasaran, 3)
          };
        }),
        rowH: 27, labW: 148, valW: 58, minW: 470,
        max: 45,
        fmtV: function (v) { return U.n(v, 1) + '%'; }, unit: 'Premium'
      });
    }
  };

  /* =========================================================== HAJI ====== */
  V.haji = {
    label: 'Haji & HAFIS',
    title: 'Kos haji dan beban subsidi',
    render: function (root) {
      var HJ = R.HAJI;
      var semua = HJ.sejarah.concat(HJ.unjuran.map(function (u) {
        return { tahun: u.tahun, kos: u.kos, bayaran: u.bayaran, hafis: u.hafis, jumlahJuta: u.jumlahRibu / 1000, unjuran: true };
      }));

      var h = '<div class="sec-head"><div class="eyebrow">Bab 3.16</div>' +
        '<h2>Kos haji dan beban subsidi (HAFIS)</h2>' +
        '<p class="lede">Setiap jemaah membayar kurang daripada kos sebenar. Bezanya ditanggung Tabung Haji ' +
        'daripada keuntungan pelaburan — bermakna ia dibayar oleh pendeposit lain melalui hibah yang lebih rendah.</p></div>';

      h += '<div class="callout warn"><b class="h">Punca asas</b>' +
        'Bayaran haji dibekukan pada <b>RM' + U.n(HJ.bekuBayaran.kadar) + '</b> selama <b>' + HJ.bekuBayaran.tahun + ' tahun</b> ' +
        '(' + HJ.bekuBayaran.dari + '–' + HJ.bekuBayaran.hingga + ') sedangkan kos haji naik hampir setiap tahun. ' +
        'Setiap ringgit perbezaan ditanggung LTH. ' + U.src(HJ.bekuBayaran.src) + '</div>';

      h += U.card('Kos haji, bayaran jemaah dan subsidi',
        'RM seorang. Kawasan berlorek = unjuran LTH bagi 2022–2030 (bukan data sebenar). Tiada data 2020 &amp; 2021 — tiada penghantaran jemaah haji.',
        U.chartBox('ch-haji-kos') +
        U.legend([
          { name: 'Kos haji sebenar', color: C.css('--c1') },
          { name: 'Dibayar jemaah', color: C.css('--c4') },
          { name: 'Ditanggung LTH (HAFIS)', color: C.css('--c3') }
        ]) +
        U.reading({
          apa: 'Berapa kos sebenar seorang jemaah, berapa yang dia bayar, dan berapa yang ditampung Tabung Haji.',
          kenapa: 'Jurang antara garisan merah dan hijau ialah subsidi. Ia datang daripada keuntungan pelaburan yang sepatutnya diagihkan sebagai hibah.',
          simpul: 'Bahagian subsidi naik daripada 38% (2014) kepada 56% (2019). Kenaikan bayaran 2022 hanya mengurangkan sedikit — ia dijangka naik semula melebihi 65% menjelang 2030.',
          hati: 'Dua perkara. Pertama, data 2022–2030 ialah <b>unjuran LTH</b> yang disalin ke dalam laporan, bukan hasil sebenar — ia menganggap bayaran haji kekal RM12,980. Kedua, <b>2020 dan 2021 tiada langsung</b> kerana tiada penghantaran jemaah haji akibat pandemik; paksi mendatar melompat terus daripada 2019 ke 2022, jadi kecerunan antara dua titik itu bukan kadar tahunan sebenar.'
        }), HJ.srcSejarah);

      h += U.card('Berapa bahagian kos yang ditanggung Tabung Haji',
        'Peratus daripada kos haji seorang jemaah',
        U.chartBox('ch-haji-pct') +
        U.reading({
          apa: 'Bahagian kos haji yang tidak dibayar oleh jemaah sendiri.',
          kenapa: 'Suruhanjaya menghubungkan langsung nisbah ini dengan prinsip <i>istito\'ah</i> — ibadah haji hanya diwajibkan kepada yang mampu.',
          simpul: 'Trend hanya satu arah: naik. Tanpa perubahan dasar, jemaah akan membayar kurang daripada satu pertiga kos sebenarnya menjelang 2030.',
          hati: 'Peratus 2020 dan 2021 tiada kerana tiada penghantaran jemaah haji akibat pandemik.'
        }), HJ.srcUnjuran);

      // Simulator HAFIS
      h += U.card('Simulasi: apa jadi jika bayaran haji diubah?',
        'Guna unjuran kos haji LTH (2022–2030) dan andaian 30,000 jemaah setahun',
        '<div class="ctrl">' +
        U.slider('sl-bayar', {
          label: 'Bayaran haji seorang jemaah', min: 9980, max: 37729, step: 500, value: 12980,
          display: function (v) { return 'RM' + U.n(v); }
        }) +
        '<div class="ctrl-row"><label>Tetapan pantas</label>' +
        U.seg('preset', [
          { v: '9980', l: 'Kadar beku (RM9,980)' },
          { v: '10980', l: 'B40 2022 (RM10,980)' },
          { v: '12980', l: 'Semasa (RM12,980)' },
          { v: 'full', l: 'Kos penuh (tiada subsidi)' }
        ], '12980') + '</div>' +
        '</div>' +
        '<div id="hafis-out"></div>' +
        U.chartBox('ch-hafis-sim') +
        U.legend([
          { name: 'HAFIS mengikut unjuran laporan', color: C.css('--c6') },
          { name: 'HAFIS dengan bayaran anda', color: C.css('--c5') }
        ]) +
        U.reading({
          apa: 'Jumlah subsidi tahunan yang perlu ditanggung Tabung Haji, mengikut bayaran haji yang anda tetapkan.',
          kenapa: 'Ia memaparkan pertukaran sebenar: setiap ringgit subsidi ialah ringgit yang tidak boleh diagihkan sebagai hibah kepada 8.6 juta pendeposit.',
          simpul: 'Pada bayaran semasa RM12,980, subsidi mencecah RM742 juta menjelang 2030. Menaikkan bayaran seiring kos akan menghapuskan subsidi sepenuhnya.',
          hati: '<span class="tag warn">simulasi</span> Kiraan mudah: (kos haji − bayaran) × 30,000 jemaah. Ia <b>tidak</b> mengambil kira bahawa bayaran lebih tinggi mungkin mengurangkan bilangan jemaah yang mampu, kesan kepada kumpulan B40, atau perubahan kos akibat kadar tukaran.'
        }), HJ.srcUnjuran);

      // Kesan kepada hibah + tempoh menunggu
      h += '<div class="grid g2">' +
        U.card('Kesan kepada hibah pendeposit', '',
          U.readout([
            { k: 'Subsidi semasa', v: 'RM' + HJ.kesanHibah.juta + 'j', d: 'setahun' },
            { k: 'Bersamaan potongan hibah', v: '−' + HJ.kesanHibah.peratusHibah + '%', cls: 'neg' },
            { k: 'Dana minimum diperlukan', v: 'RM' + HJ.danaMinimum.bilion + 'b', d: 'untuk menampung subsidi' },
            { k: 'Deposit semasa', v: 'RM88b', cls: 'pos' }
          ]) +
          '<div style="margin-top:12px">' + U.note('baca', 'Maksudnya',
            'Setiap pendeposit menerima hibah 0.4 mata peratus lebih rendah supaya jemaah haji tahun itu ' +
            'boleh membayar kurang. Ini subsidi silang — laporan menyokongnya diteruskan tetapi mahu ia disasarkan ' +
            'kepada yang benar-benar memerlukan.') + '</div>',
          HJ.kesanHibah.src) +
        U.card('Tempoh menunggu giliran haji', '',
          U.chartBox('ch-tunggu') +
          '<div style="margin-top:12px">' + U.note('penting', 'Cadangan Suruhanjaya',
            'Naikkan deposit minimum untuk mendaftar haji daripada <b>RM' + U.n(HJ.depositMinimum.sekarang) + '</b> kepada ' +
            '<b>RM' + U.n(HJ.depositMinimum.cadangan) + '</b>. Tempoh menunggu dijangka turun daripada 130–135 tahun ' +
            'kepada 33 tahun. ' + U.src(HJ.menunggu.src)) + '</div>' +
          '<div style="margin-top:10px">' + U.note('hati', 'Kenapa ini berkesan',
            'Bukan kerana kuota bertambah — tetapi kerana lebih sedikit orang layak mendaftar. Laporan menyatakan ' +
            '65% pendeposit menyimpan RM2,000 atau kurang. Menaikkan ambang menapis senarai giliran, bukan mempercepatkan giliran.') + '</div>',
          HJ.depositMinimum.src) +
        '</div>';

      // Rekod perkhidmatan
      h += U.card('Konteks: apa yang Tabung Haji berjaya lakukan', '',
        U.readout([
          { k: 'Jemaah diurus 1963–2021', v: HJ.jemaahDiurus.jumlah + ' juta', cls: 'pos' },
          { k: 'HAFIS diberi sejak 2001', v: 'RM' + HJ.hafisKumulatif.nilai + 'b' },
          { k: 'Hibah diagih 1966–2021', v: 'RM' + R.HIBAH.kumulatif.nilai + 'b' },
          { k: 'Kuota 2030 (Saudi)', v: U.n(HJ.kuota.sasaran2030), d: 'daripada ' + U.n(HJ.kuota.sekarang) }
        ]) +
        '<div style="margin-top:12px">' + U.note('baca', 'Kenapa ini dimasukkan',
          'Laporan yang sama yang mengkritik pengurusan LTH juga mengesahkan pencapaiannya. Suruhanjaya menolak ' +
          'cadangan memecahkan LTH dan mengesyorkan struktur sedia ada dikekalkan dengan penambahbaikan. ' +
          'Papan ini memaparkan kedua-dua belah supaya gambaran tidak berat sebelah.') + '</div>',
        { pdf: 229, ms: '191' });

      root.innerHTML = h;

      var kx = semua.map(function (s) { return String(s.tahun); });
      var idx2022 = semua.findIndex(function (s) { return s.unjuran; });
      C.lines(root.querySelector('#ch-haji-kos'), {
        x: kx, height: 270, padL: 50,
        series: [
          { name: 'Kos haji', color: C.css('--c1'), data: semua.map(function (s) { return s.kos; }) },
          { name: 'Dibayar jemaah', color: C.css('--c4'), data: semua.map(function (s) { return s.bayaran; }) },
          { name: 'HAFIS seorang', color: C.css('--c3'), data: semua.map(function (s) { return s.hafis; }) }
        ],
        bands: [{ from: idx2022 - 0.0, to: semua.length - 1, color: C.css('--c3'), label: 'unjuran' }],
        fmtV: function (v) { return 'RM' + U.n(v); },
        fmtAxis: function (v) { return U.n(v / 1000, 0) + 'k'; },
        tipTitle: function (c) { return 'Tahun ' + c; },
        tipExtra: function (i) {
          return '<div class="r"><span>Bahagian subsidi</span><span>' + U.pct(semua[i].hafis / semua[i].kos * 100, 1) + '</span></div>' +
            (semua[i].unjuran ? '<div style="margin-top:4px;opacity:.8">Unjuran LTH</div>' : '');
        }
      });

      C.bars(root.querySelector('#ch-haji-pct'), {
        cats: kx, height: 240, slot: 40,
        series: [{
          name: 'Bahagian kos ditanggung LTH', color: C.css('--c3'),
          opacityFn: function (v, i) { return semua[i] && semua[i].unjuran ? 0.45 : 1; },
          data: semua.map(function (s) { return +(s.hafis / s.kos * 100).toFixed(1); })
        }],
        fmtV: function (v) { return U.n(v, 1) + '%'; },
        fmtAxis: function (v) { return U.n(v, 0) + '%'; },
        tipTitle: function (c) { return 'Tahun ' + c; }
      });

      // Simulator HAFIS
      var sl = root.querySelector('#sl-bayar');
      function runHafis(v) {
        root.querySelector('#sl-bayar-out').textContent = 'RM' + U.n(v);
        var base = HJ.unjuran.map(function (u) { return u.jumlahRibu / 1000; });
        var sim = HJ.unjuran.map(function (u) {
          var per = Math.max(0, u.kos - v);
          return per * HJ.jemaahAndaian / 1e6;
        });
        var d2030 = sim[sim.length - 1];
        var totBase = base.reduce(function (a, b) { return a + b; }, 0);
        var totSim = sim.reduce(function (a, b) { return a + b; }, 0);
        root.querySelector('#hafis-out').innerHTML = U.readout([
          { k: 'HAFIS 2030 (unjuran laporan)', v: U.rmJuta(base[base.length - 1]) },
          { k: 'HAFIS 2030 (simulasi anda)', v: U.rmJuta(d2030), cls: d2030 > base[base.length - 1] ? 'neg' : 'pos' },
          { k: 'Jumlah 2022–2030 (simulasi)', v: U.rmJuta(totSim), d: 'berbanding ' + U.rmJuta(totBase) },
          { k: 'Bahagian kos 2030', v: U.pct(Math.max(0, HJ.unjuran[8].kos - v) / HJ.unjuran[8].kos * 100, 1) }
        ]);
        C.bars(root.querySelector('#ch-hafis-sim'), {
          cats: HJ.unjuran.map(function (u) { return String(u.tahun); }),
          height: 240, padL: 48,
          series: [
            { name: 'Unjuran laporan (RM juta)', color: C.css('--c6'), data: base },
            { name: 'Simulasi anda (RM juta)', color: C.css('--c5'), data: sim }
          ],
          fmtV: function (x) { return U.n(x, 0); },
          tipTitle: function (c) { return 'Tahun ' + c; }
        });
      }
      sl.addEventListener('input', function () { runHafis(+sl.value); });
      U.bindSeg(root, 'preset', function (v) {
        if (v === 'full') {
          // kos penuh: guna kos 2030 supaya subsidi ~0 sepanjang tempoh
          sl.value = HJ.unjuran[8].kos;
        } else sl.value = v;
        runHafis(+sl.value);
      });
      runHafis(12980);

      C.hbars(root.querySelector('#ch-tunggu'), {
        rows: [
          { label: 'Sekarang', value: 132.5, color: C.css('--c1'), note: 'Laporan menyebut 130 tahun dan 135 tahun di tempat berbeza' },
          { label: 'Jika deposit minimum RM12,980', value: 33, color: C.css('--c4'), note: 'Anggaran EY' }
        ],
        rowH: 40, labW: 118, valW: 66, minW: 280,
        fmtV: function (v) { return U.n(v, 0) + ' thn'; }, unit: 'Tempoh menunggu'
      });
    }
  };
})();
