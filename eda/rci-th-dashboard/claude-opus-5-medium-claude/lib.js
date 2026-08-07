/* =====================================================================
   LIB — pembantu DOM, format nombor, dan carta SVG ringan.
   Tiada kebergantungan luar. Semua carta responsif (viewBox + preserveAspect).
   ===================================================================== */
(function () {
  "use strict";

  var L = {};

  /* ---------------- DOM ---------------- */
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === "class") n.className = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== null && attrs[k] !== undefined) n.setAttribute(k, attrs[k]);
    }
    if (kids) ratakan(kids).forEach(function (c) {
      n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return n;
  }
  /* Ratakan senarai anak bersarang dan buang nilai kosong. */
  function ratakan(kids) {
    var out = [];
    (Array.isArray(kids) ? kids : [kids]).forEach(function (c) {
      if (c === null || c === undefined || c === false || c === true) return;
      if (Array.isArray(c)) out = out.concat(ratakan(c));
      else out.push(c);
    });
    return out;
  }
  L.el = el;
  L.ratakan = ratakan;

  var SVGNS = "http://www.w3.org/2000/svg";
  function s(tag, attrs, kids) {
    var n = document.createElementNS(SVGNS, tag);
    if (attrs) for (var k in attrs) {
      if (k === "text") n.textContent = attrs[k];
      else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== null && attrs[k] !== undefined) n.setAttribute(k, attrs[k]);
    }
    if (kids) ratakan(kids).forEach(function (c) { n.appendChild(c); });
    return n;
  }
  L.s = s;

  L.clear = function (node) { while (node.firstChild) node.removeChild(node.firstChild); return node; };

  /* ---------------- Format ---------------- */
  function num(v, dp) {
    if (v === null || v === undefined || isNaN(v)) return "—";
    dp = dp === undefined ? 0 : dp;
    var neg = v < 0, a = Math.abs(v).toFixed(dp);
    var parts = a.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (neg ? "−" : "") + parts.join(".");
  }
  L.num = num;

  /* RM juta -> teks mesra */
  L.rmJuta = function (v, dp) {
    if (v === null || v === undefined) return "—";
    var a = Math.abs(v);
    if (a >= 1000) return (v < 0 ? "−" : "") + "RM" + num(a / 1000, dp === undefined ? 2 : dp) + " bilion";
    return (v < 0 ? "−" : "") + "RM" + num(a, dp === undefined ? 0 : dp) + " juta";
  };
  L.rm = function (v, dp) { return (v < 0 ? "−RM" : "RM") + num(Math.abs(v), dp || 0); };
  L.pct = function (v, dp) { return num(v, dp === undefined ? 1 : dp) + "%"; };

  /* ---------------- Sumber chip ---------------- */
  L.sumber = function (ms, label) {
    if (ms === null || ms === undefined) return null;
    return el("a", {
      class: "src", href: window.RCI.SRC(ms), target: "_blank", rel: "noopener",
      title: "Buka muka surat " + ms + " dalam laporan asal"
    }, label || ("m/s " + ms));
  };

  /* Label kelas data */
  var KELAS = {
    F: { t: "Fakta laporan", c: "k-f", d: "Angka tersurat dalam laporan RCI." },
    T: { t: "Data terbitan", c: "k-t", d: "Dikira oleh dashboard ini daripada angka fakta laporan." },
    A: { t: "Anggaran laporan", c: "k-a", d: "Unjuran atau anggaran yang laporan sendiri nyatakan." },
    S: { t: "Simulasi", c: "k-s", d: "Dijana oleh anda melalui kawalan di skrin. BUKAN angka laporan." }
  };
  L.KELAS = KELAS;
  L.tag = function (k) {
    var m = KELAS[k]; if (!m) return null;
    return el("span", { class: "ktag " + m.c, title: m.d, text: m.t });
  };

  /* ---------------- Tooltip glosari ---------------- */
  L.istilah = function (kata, papar) {
    var def = window.RCI.glosari[kata];
    if (!def) return document.createTextNode(papar || kata);
    return el("button", {
      class: "istilah", type: "button", "data-kata": kata,
      onclick: function (e) { e.stopPropagation(); L.popGlosari(kata, e.currentTarget); }
    }, papar || kata);
  };

  L.popGlosari = function (kata, anchor) {
    var old = document.getElementById("glosari-pop");
    if (old) old.remove();
    var def = window.RCI.glosari[kata];
    if (!def) return;
    var pop = el("div", { class: "glosari-pop", id: "glosari-pop" }, [
      el("div", { class: "gp-kata", text: kata }),
      el("div", { class: "gp-def", text: def }),
      el("button", { class: "gp-tutup", type: "button", text: "Tutup", onclick: function () { pop.remove(); } })
    ]);
    document.body.appendChild(pop);
    var r = anchor.getBoundingClientRect();
    var top = r.bottom + window.scrollY + 6;
    var left = Math.max(10, Math.min(r.left + window.scrollX, window.innerWidth - pop.offsetWidth - 10));
    pop.style.top = top + "px"; pop.style.left = left + "px";
    setTimeout(function () {
      document.addEventListener("click", function h() { var p = document.getElementById("glosari-pop"); if (p) p.remove(); document.removeEventListener("click", h); });
    }, 0);
  };

  /* ---------------- Blok bangunan UI ---------------- */
  L.kad = function (opts) {
    var head = el("div", { class: "kad-head" }, [
      el("div", {}, [
        el("h3", { class: "kad-tajuk", text: opts.tajuk }),
        opts.sub ? el("p", { class: "kad-sub", html: opts.sub }) : null
      ]),
      el("div", { class: "kad-meta" }, [
        opts.kelas ? L.tag(opts.kelas) : null,
        opts.ms !== undefined ? L.sumber(opts.ms) : null
      ])
    ]);
    var body = el("div", { class: "kad-body" });
    var kad = el("section", { class: "kad" + (opts.lebar ? " kad-lebar" : "") }, [head, body]);
    if (opts.soalan) body.appendChild(el("p", { class: "soalan", html: "<strong>Soalan yang dijawab:</strong> " + opts.soalan }));
    kad.body = body;
    return kad;
  };

  L.bacaan = function (isi) {
    return el("div", { class: "bacaan" }, [
      el("div", { class: "bacaan-tajuk", text: "Cara membaca carta ini" }),
      el("div", { class: "bacaan-isi", html: isi })
    ]);
  };

  L.amaranTafsir = function (isi) {
    return el("div", { class: "hadbaca" }, [
      el("div", { class: "hadbaca-tajuk", text: "Apa yang TIDAK boleh disimpulkan" }),
      el("div", { class: "hadbaca-isi", html: isi })
    ]);
  };

  L.stat = function (nilai, label, nota, warna) {
    return el("div", { class: "stat" }, [
      el("div", { class: "stat-nilai", text: nilai, style: warna ? "color:" + warna : null }),
      el("div", { class: "stat-label", text: label }),
      nota ? el("div", { class: "stat-nota", html: nota }) : null
    ]);
  };

  L.jadual = function (kepala, baris, opts) {
    opts = opts || {};
    var thead = s ? null : null;
    var th = el("thead", {}, [el("tr", {}, kepala.map(function (h) {
      return el("th", { class: h.kanan ? "kanan" : "", text: typeof h === "string" ? h : h.t });
    }))]);
    var tb = el("tbody", {}, baris.map(function (r) {
      return el("tr", { class: r.__kelas || "" }, r.sel.map(function (c) {
        var attrs = { class: (c.kanan ? "kanan " : "") + (c.kelas || "") };
        if (c.html) attrs.html = c.html; else attrs.text = c.t;
        return el("td", attrs);
      }));
    }));
    var tbl = el("table", { class: "jad " + (opts.kelas || "") }, [th, tb]);
    return el("div", { class: "jad-bekas" }, [tbl]);
  };

  /* ---------------- Carta ---------------- */
  var PAL = ["#2f9e8f", "#4f8ef7", "#e8912d", "#d9534f", "#8b5cf6", "#0ea5a4", "#dfa000", "#64748b"];
  L.PAL = PAL;

  function axisText(x, y, t, cls, anchor) {
    return s("text", { x: x, y: y, class: cls || "ax", "text-anchor": anchor || "middle", text: t });
  }
  L.axisText = axisText;

  function nice(max) {
    if (max <= 0) return 1;
    var e = Math.pow(10, Math.floor(Math.log10(max)));
    var m = max / e;
    var n = m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10;
    return n * e;
  }
  L.nice = nice;

  /* Carta bar berkumpulan / bertindan / garis gabungan.
     siri: [{nama, warna, data:[n], jenis:'bar'|'garis', paksi:'kiri'|'kanan'}]  */
  L.cartaKombo = function (o) {
    var W = 720, H = o.tinggi || 320;
    var M = { t: 18, r: o.paksiKanan ? 54 : 14, b: 40, l: 56 };
    var iw = W - M.l - M.r, ih = H - M.t - M.b;
    var labels = o.labels;
    var n = labels.length;

    var kiri = o.siri.filter(function (x) { return x.paksi !== "kanan"; });
    var kanan = o.siri.filter(function (x) { return x.paksi === "kanan"; });

    function jangkauan(list, mestiSifar) {
      var mx = -Infinity, mn = Infinity;
      list.forEach(function (sr) {
        sr.data.forEach(function (v) { if (v === null || v === undefined) return; if (v > mx) mx = v; if (v < mn) mn = v; });
      });
      if (mx === -Infinity) { mx = 1; mn = 0; }
      if (mestiSifar !== false) { if (mn > 0) mn = 0; if (mx < 0) mx = 0; }
      var span = mx - mn || 1;
      return { mn: mn - (mn < 0 ? span * 0.04 : 0), mx: mx + span * 0.08 };
    }
    var rk = jangkauan(kiri), rr = kanan.length ? jangkauan(kanan, o.kananSifar) : null;

    function yK(v) { return M.t + ih - (v - rk.mn) / (rk.mx - rk.mn) * ih; }
    function yR(v) { return M.t + ih - (v - rr.mn) / (rr.mx - rr.mn) * ih; }

    var g = [];
    // grid
    var TICK = 5;
    for (var i = 0; i <= TICK; i++) {
      var v = rk.mn + (rk.mx - rk.mn) * i / TICK;
      var y = yK(v);
      g.push(s("line", { x1: M.l, x2: M.l + iw, y1: y, y2: y, class: Math.abs(v) < 1e-9 ? "grid grid-0" : "grid" }));
      g.push(axisText(M.l - 8, y + 4, o.fmtKiri ? o.fmtKiri(v) : num(v), "ax", "end"));
    }
    if (rr) {
      for (var j = 0; j <= TICK; j++) {
        var v2 = rr.mn + (rr.mx - rr.mn) * j / TICK;
        g.push(axisText(M.l + iw + 8, yR(v2) + 4, o.fmtKanan ? o.fmtKanan(v2) : num(v2), "ax ax-kanan", "start"));
      }
    }

    var bandW = iw / n;
    var bars = o.siri.filter(function (x) { return x.jenis !== "garis"; });
    var bw = Math.min(38, (bandW * 0.68) / Math.max(1, bars.length));

    labels.forEach(function (lb, idx) {
      var cx = M.l + bandW * (idx + 0.5);
      g.push(axisText(cx, M.t + ih + 22, lb, "ax"));
    });

    var bi = 0;
    o.siri.forEach(function (sr) {
      var yf = sr.paksi === "kanan" ? yR : yK;
      if (sr.jenis === "garis") {
        var d = "", pts = [];
        sr.data.forEach(function (v, idx) {
          if (v === null || v === undefined) return;
          var cx = M.l + bandW * (idx + 0.5), cy = yf(v);
          d += (d ? " L" : "M") + cx + "," + cy;
          pts.push([cx, cy, v, idx]);
        });
        g.push(s("path", { d: d, fill: "none", stroke: sr.warna, "stroke-width": 2.4, "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-dasharray": sr.putus ? "6 4" : null }));
        pts.forEach(function (pp) {
          g.push(s("circle", { cx: pp[0], cy: pp[1], r: 4, fill: "var(--bg-kad)", stroke: sr.warna, "stroke-width": 2.2 }));
        });
      } else {
        var off = (bi - (bars.length - 1) / 2) * bw;
        sr.data.forEach(function (v, idx) {
          if (v === null || v === undefined) return;
          var cx = M.l + bandW * (idx + 0.5) + off;
          var y0 = yf(0), y1 = yf(v);
          g.push(s("rect", {
            x: cx - bw / 2, y: Math.min(y0, y1), width: bw, height: Math.max(1.5, Math.abs(y1 - y0)),
            fill: sr.warna, rx: 2, opacity: sr.lut || 1
          }, [s("title", { text: sr.nama + " · " + labels[idx] + ": " + (o.fmtTip ? o.fmtTip(v, sr) : num(v)) })]));
        });
        bi++;
      }
    });

    // axis lines
    g.push(s("line", { x1: M.l, x2: M.l + iw, y1: M.t + ih, y2: M.t + ih, class: "axline" }));

    var svg = s("svg", { viewBox: "0 0 " + W + " " + H, class: "carta", preserveAspectRatio: "xMidYMid meet", role: "img", "aria-label": o.alt || "" }, g);
    var wrap = el("div", { class: "carta-bekas" }, [svg]);
    if (o.siri.length > 1 || o.legenPaksa) wrap.appendChild(L.legen(o.siri));
    return wrap;
  };

  L.legen = function (siri) {
    return el("div", { class: "legen" }, siri.map(function (sr) {
      return el("span", { class: "legen-item" }, [
        el("span", { class: "legen-kotak" + (sr.jenis === "garis" ? " legen-garis" : ""), style: "background:" + sr.warna }),
        el("span", { text: sr.nama })
      ]);
    }));
  };

  /* Carta air terjun (waterfall) */
  L.cartaAirTerjun = function (o) {
    var baris = o.baris; // [{label, nilai, jenis:'delta'|'jumlah'}]
    var W = 720, H = o.tinggi || 340;
    var M = { t: 22, r: 14, b: 74, l: 62 };
    var iw = W - M.l - M.r, ih = H - M.t - M.b;

    var run = 0, segs = [];
    baris.forEach(function (b) {
      if (b.jenis === "jumlah") { segs.push({ b: b, dari: 0, ke: b.nilai, jumlah: true }); run = b.nilai; }
      else { segs.push({ b: b, dari: run, ke: run + b.nilai }); run += b.nilai; }
    });
    var mx = -Infinity, mn = Infinity;
    segs.forEach(function (sg) { mx = Math.max(mx, sg.dari, sg.ke); mn = Math.min(mn, sg.dari, sg.ke); });
    if (mn > 0) mn = 0; if (mx < 0) mx = 0;
    var span = (mx - mn) || 1; mx += span * 0.1; mn -= span * 0.1;
    function y(v) { return M.t + ih - (v - mn) / (mx - mn) * ih; }

    var g = [];
    for (var i = 0; i <= 4; i++) {
      var v = mn + (mx - mn) * i / 4, yy = y(v);
      g.push(s("line", { x1: M.l, x2: M.l + iw, y1: yy, y2: yy, class: Math.abs(v) < 1e-9 ? "grid grid-0" : "grid" }));
      g.push(axisText(M.l - 8, yy + 4, o.fmt ? o.fmt(v) : num(v), "ax", "end"));
    }
    var bandW = iw / segs.length, bw = Math.min(58, bandW * 0.6);
    segs.forEach(function (sg, idx) {
      var cx = M.l + bandW * (idx + 0.5);
      var y0 = y(sg.dari), y1 = y(sg.ke);
      var naik = sg.ke >= sg.dari;
      var warna = sg.jumlah ? (o.warnaJumlah || "#4f8ef7") : (naik ? (o.warnaNaik || "#2f9e8f") : (o.warnaTurun || "#d9534f"));
      g.push(s("rect", {
        x: cx - bw / 2, y: Math.min(y0, y1), width: bw, height: Math.max(2, Math.abs(y1 - y0)),
        fill: warna, rx: 2
      }, [s("title", { text: sg.b.label + ": " + (o.fmt ? o.fmt(sg.b.nilai) : num(sg.b.nilai)) })]));
      g.push(axisText(cx, Math.min(y0, y1) - 6, (o.fmtNilai || o.fmt || num)(sg.b.nilai), "nilai-atas"));
      if (idx < segs.length - 1 && !segs[idx + 1].jumlah) {
        g.push(s("line", { x1: cx + bw / 2, x2: M.l + bandW * (idx + 1.5) - bw / 2, y1: y1, y2: y1, class: "penghubung" }));
      }
      // label pecah 2 baris
      var kata = sg.b.pendek || sg.b.label;
      var pecah = wrapKata(kata, 16);
      pecah.slice(0, 3).forEach(function (ln, li) {
        g.push(axisText(cx, M.t + ih + 18 + li * 12, ln, "ax ax-kecil"));
      });
    });
    g.push(s("line", { x1: M.l, x2: M.l + iw, y1: y(0), y2: y(0), class: "axline" }));
    return el("div", { class: "carta-bekas" }, [s("svg", { viewBox: "0 0 " + W + " " + H, class: "carta", preserveAspectRatio: "xMidYMid meet" }, g)]);
  };

  function wrapKata(t, lebar) {
    var kata = String(t).split(/\s+/), baris = [], k = "";
    kata.forEach(function (w) {
      if ((k + " " + w).trim().length > lebar) { if (k) baris.push(k); k = w; }
      else k = (k + " " + w).trim();
    });
    if (k) baris.push(k);
    return baris;
  }
  L.wrapKata = wrapKata;

  /* Bar mendatar berbanding */
  L.barMendatar = function (o) {
    var baris = o.baris; // [{label, nilai, nilai2?, nota?}]
    var mx = o.maks || 0;
    if (!o.maks) baris.forEach(function (b) { mx = Math.max(mx, Math.abs(b.nilai), Math.abs(b.nilai2 || 0)); });
    mx = mx || 1;
    return el("div", { class: "hbars" }, baris.map(function (b) {
      var w1 = Math.abs(b.nilai) / mx * 100;
      var w2 = b.nilai2 !== undefined ? Math.abs(b.nilai2) / mx * 100 : null;
      return el("div", { class: "hbar" + (b.sorot ? " hbar-sorot" : ""), onclick: b.onclick || null, tabindex: b.onclick ? "0" : null }, [
        el("div", { class: "hbar-atas" }, [
          el("span", { class: "hbar-label", text: b.label }),
          el("span", { class: "hbar-nilai", text: o.fmt ? o.fmt(b.nilai) : num(b.nilai) })
        ]),
        el("div", { class: "hbar-trek" }, [
          el("div", { class: "hbar-isi", style: "width:" + w1 + "%;background:" + (b.warna || o.warna || "#2f9e8f") }),
          w2 !== null ? el("div", { class: "hbar-isi2", style: "width:" + w2 + "%;background:" + (o.warna2 || "#94a3b8") }) : null
        ]),
        b.nota ? el("div", { class: "hbar-nota", html: b.nota }) : null
      ]);
    }));
  };

  /* Carta serak (scatter) */
  L.cartaSerak = function (o) {
    var W = 720, H = o.tinggi || 380;
    var M = { t: 20, r: 20, b: 52, l: 66 };
    var iw = W - M.l - M.r, ih = H - M.t - M.b;
    var xs = o.titik.map(function (t) { return t.x; }), ys = o.titik.map(function (t) { return t.y; });
    var xmx = nice(Math.max.apply(null, xs) * 1.05), ymx = nice(Math.max.apply(null, ys) * 1.05);
    function X(v) { return M.l + v / xmx * iw; }
    function Y(v) { return M.t + ih - v / ymx * ih; }
    var g = [];
    for (var i = 0; i <= 4; i++) {
      var yy = Y(ymx * i / 4);
      g.push(s("line", { x1: M.l, x2: M.l + iw, y1: yy, y2: yy, class: "grid" }));
      g.push(axisText(M.l - 8, yy + 4, o.fmtY ? o.fmtY(ymx * i / 4) : num(ymx * i / 4), "ax", "end"));
      var xx = X(xmx * i / 4);
      g.push(axisText(xx, M.t + ih + 20, o.fmtX ? o.fmtX(xmx * i / 4) : num(xmx * i / 4), "ax"));
    }
    // garis pandu 100% kerugian
    if (o.garisPandu) {
      var p = "M" + X(0) + "," + Y(0) + " L" + X(Math.min(xmx, ymx)) + "," + Y(Math.min(xmx, ymx));
      g.push(s("path", { d: p, class: "pandu" }));
      g.push(axisText(X(Math.min(xmx, ymx)) - 60, Y(Math.min(xmx, ymx)) - 8, "rugi 100%", "ax ax-kecil"));
    }
    o.titik.forEach(function (t) {
      var r = t.r || 8;
      g.push(s("circle", {
        cx: X(t.x), cy: Y(t.y), r: r, fill: t.warna || "#d9534f", opacity: 0.78,
        stroke: "var(--bg-kad)", "stroke-width": 1.5, class: "serak-titik",
        onclick: t.onclick || null, style: t.onclick ? "cursor:pointer" : null
      }, [s("title", { text: t.label + " — " + (o.fmtTip ? o.fmtTip(t) : "") })]));
      if (t.teks) g.push(axisText(X(t.x), Y(t.y) - r - 5, t.teks, "ax ax-kecil"));
    });
    g.push(s("line", { x1: M.l, x2: M.l + iw, y1: M.t + ih, y2: M.t + ih, class: "axline" }));
    g.push(s("line", { x1: M.l, x2: M.l, y1: M.t, y2: M.t + ih, class: "axline" }));
    g.push(axisText(M.l + iw / 2, H - 8, o.tajukX || "", "ax ax-tajuk"));
    g.push(s("text", { x: 14, y: M.t + ih / 2, class: "ax ax-tajuk", "text-anchor": "middle", transform: "rotate(-90 14 " + (M.t + ih / 2) + ")", text: o.tajukY || "" }));
    return el("div", { class: "carta-bekas" }, [s("svg", { viewBox: "0 0 " + W + " " + H, class: "carta", preserveAspectRatio: "xMidYMid meet" }, g)]);
  };

  /* Gantt tempoh jawatan */
  L.gantt = function (o) {
    var t0 = new Date(o.dari).getTime(), t1 = new Date(o.hingga).getTime();
    var rows = o.baris;
    var LW = 0; // label di atas bar untuk mobile
    var tahun = [];
    for (var y = new Date(o.dari).getFullYear(); y <= new Date(o.hingga).getFullYear(); y++) tahun.push(y);

    var skala = el("div", { class: "gantt-skala" }, tahun.map(function (yy) {
      var p = (new Date(yy + "-01-01").getTime() - t0) / (t1 - t0) * 100;
      return el("span", { class: "gantt-tahun", style: "left:" + p + "%", text: String(yy).slice(2) });
    }));

    var body = el("div", { class: "gantt-body" }, rows.map(function (r) {
      var a = Math.max(t0, new Date(r.mula).getTime());
      var b = Math.min(t1, new Date(r.tamat).getTime());
      var left = (a - t0) / (t1 - t0) * 100;
      var w = Math.max(0.6, (b - a) / (t1 - t0) * 100);
      var lama = ((b - a) / (365.25 * 864e5));
      return el("div", { class: "gantt-baris" }, [
        el("div", { class: "gantt-nama" }, [
          el("span", { text: r.nama }),
          r.politik ? el("span", { class: "pil pil-politik", text: "ahli politik" }) : null,
          r.tamatAwal ? el("span", { class: "pil pil-tamat", text: "ditamatkan awal" }) : null
        ]),
        el("div", { class: "gantt-trek" }, [
          el("div", {
            class: "gantt-bar", style: "left:" + left + "%;width:" + w + "%;background:" + r.warna,
            title: r.nama + " · " + r.mula + " → " + r.tamat + " (" + lama.toFixed(1) + " tahun)"
          }),
          (o.penanda || []).map(function (m) {
            var mp = (new Date(m.t).getTime() - t0) / (t1 - t0) * 100;
            return el("span", { class: "gantt-tanda", style: "left:" + mp + "%", title: m.label });
          })
        ]),
        r.nota ? el("div", { class: "gantt-nota", text: r.nota }) : null
      ]);
    }));
    return el("div", { class: "gantt" }, [skala, body]);
  };

  /* Butang segmen */
  L.segmen = function (pilihan, aktif, onPilih, opts) {
    opts = opts || {};
    var wrap = el("div", { class: "segmen " + (opts.kelas || "") });
    pilihan.forEach(function (p) {
      wrap.appendChild(el("button", {
        type: "button", class: "segmen-btn" + (p.id === aktif ? " aktif" : ""),
        "data-id": p.id, title: p.tip || "",
        onclick: function () { onPilih(p.id); }
      }, p.label));
    });
    return wrap;
  };

  /* Slider berlabel */
  L.slider = function (o) {
    var out = el("output", { class: "slider-nilai", text: o.fmt ? o.fmt(o.nilai) : String(o.nilai) });
    var inp = el("input", {
      type: "range", min: o.min, max: o.max, step: o.step || 1, value: o.nilai, class: "slider",
      oninput: function (e) { var v = parseFloat(e.target.value); out.textContent = o.fmt ? o.fmt(v) : String(v); o.onubah(v); }
    });
    return el("div", { class: "slider-bekas" }, [
      el("div", { class: "slider-atas" }, [el("label", { class: "slider-label", text: o.label }), out]),
      inp,
      o.nota ? el("div", { class: "slider-nota", html: o.nota }) : null
    ]);
  };

  window.L = L;
})();
