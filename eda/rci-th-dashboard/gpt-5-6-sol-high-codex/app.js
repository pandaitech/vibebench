(() => {
  const D = window.TH_DATA;
  const $ = (q, el = document) => el.querySelector(q);
  const $$ = (q, el = document) => [...el.querySelectorAll(q)];
  const rm = n => `RM${Math.round(n).toLocaleString("ms-MY")}`;
  const rmMillions = (n, digits = 2) => {
    const sign = n < 0 ? "−" : "";
    const abs = Math.abs(n);
    return abs >= 1000 ? `${sign}RM${(abs / 1000).toFixed(digits)}b` : `${sign}RM${abs.toFixed(abs % 1 ? 1 : 0)}j`;
  };
  const sourceUrl = page => `${D.source}#pdf-page-${page}`;

  function openSource(page) {
    window.open(sourceUrl(page), "_blank", "noopener,noreferrer");
  }
  $$('[data-source-page]').forEach(button => button.addEventListener("click", () => openSource(button.dataset.sourcePage)));
  $$('[data-jump]').forEach(button => button.addEventListener("click", () => $(button.dataset.jump).scrollIntoView({ behavior: "smooth" })));

  const menuButton = $("#menuButton");
  const mobileMenu = $("#mobileMenu");
  menuButton.addEventListener("click", () => {
    mobileMenu.hidden = !mobileMenu.hidden;
    menuButton.setAttribute("aria-expanded", String(!mobileMenu.hidden));
  });
  $$("a", mobileMenu).forEach(link => link.addEventListener("click", () => {
    mobileMenu.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
  }));

  const dialog = $("#evidenceDialog");
  $(".dialog-close", dialog).addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
  $$('[data-open-method]').forEach(button => button.addEventListener("click", () => {
    $("#dialogContent").innerHTML = `
      <p class="kicker">Cara membaca dashboard</p>
      <h2>Bukti dahulu, tafsiran kemudian</h2>
      <p>Semua fakta asas diekstrak daripada laporan RCI. Angka terbitan hanya menggunakan operasi mudah yang boleh disemak—contohnya beza atau peratus. Simulasi HAFIS dilabel dan tidak dicampur dengan fakta sejarah.</p>
      <ul>
        <li><b>Fakta laporan</b> mengekalkan sifat kenyataan asal: “mendapati”, “berpandangan” atau “mengambil maklum”.</li>
        <li><b>Data terbitan</b> tidak menambah input di luar laporan.</li>
        <li><b>Anggaran laporan</b> kekal anggaran RCI, bukan fakta masa depan.</li>
        <li><b>Had:</b> fail sumber ialah OCR. Kesilapan jelas hanya dibetulkan apabila jadual atau bahagian lain mengesahkan angka yang sama.</li>
      </ul>
      <button class="primary-button" id="dialogSource">Baca laporan asal ↗</button>`;
    $("#dialogSource").addEventListener("click", () => openSource(1));
    dialog.showModal();
  }));

  // Story map
  let activeStory = "mandate";
  function renderStory() {
    $("#storyTrack").innerHTML = D.story.map(item => `
      <button class="story-node ${item.id === activeStory ? "active" : ""}" data-story="${item.id}" role="listitem" aria-pressed="${item.id === activeStory}">
        <span class="story-n">${item.n}</span><span class="story-type">${item.type}</span>
        <h3>${item.title}</h3><p>${item.short}</p>
      </button>`).join("");
    const item = D.story.find(row => row.id === activeStory);
    const index = D.story.indexOf(item);
    const next = D.story[index + 1];
    $("#storyDetail").innerHTML = `
      <span class="detail-type">${item.type} · langkah ${item.n}</span>
      <h3>${item.title}</h3><p>${item.detail}</p>
      <button class="evidence-link inverse" data-story-source="${item.page}">Buka bukti halaman ${item.page} ↗</button>
      ${next ? `<div class="next-step">Langkah seterusnya → <b>${next.title}</b></div>` : `<div class="next-step">Hujung rantaian → risiko akhirnya kembali kepada kemampuan awam.</div>`}`;
    $$('[data-story]').forEach(button => button.addEventListener("click", () => {
      activeStory = button.dataset.story;
      renderStory();
    }));
    $('[data-story-source]').addEventListener("click", event => openSource(event.currentTarget.dataset.storySource));
  }
  renderStory();

  // Financial gap explorer
  let gapMode = "post";
  let financialYear = 2017;
  $("#financialYear").innerHTML = D.financial.map(row => `<option value="${row.year}" ${row.year === financialYear ? "selected" : ""}>${row.year}</option>`).join("");
  function financialExplanation(row) {
    if (gapMode === "pre") {
      if (row.pre >= 0) return `Sebelum agihan, aset masih melebihi liabiliti sebanyak ${rmMillions(row.pre)}.`;
      return `Sebelum hibah pun aset sudah kurang ${rmMillions(row.pre)} berbanding liabiliti.`;
    }
    if (row.post >= 0) return `Selepas hibah, masih ada lebihan ${rmMillions(row.post)}.`;
    return `Selepas agihan ${rmMillions(row.distribution)}, kedudukan menjadi kekurangan ${rmMillions(row.post)}.`;
  }
  function renderFinancial() {
    const max = Math.max(...D.financial.map(row => Math.abs(row[gapMode])));
    $("#gapChart").innerHTML = D.financial.map(row => {
      const value = row[gapMode];
      const height = Math.max(2, Math.abs(value) / max * 45);
      const style = value >= 0 ? `bottom:50%;height:${height}%` : `top:50%;height:${height}%`;
      const valueStyle = value >= 0 ? `bottom:${52 + height}%` : `top:${52 + height}%`;
      return `<div class="zero-column ${row.year === financialYear ? "active" : ""}">
        <span class="value" style="${valueStyle}">${rmMillions(value, 1)}</span>
        <button class="${value < 0 ? "negative" : ""}" data-fin-year="${row.year}" style="${style}" aria-label="${row.year}: ${rmMillions(value)}"></button>
        <span class="year">${row.year}</span>
      </div>`;
    }).join("");
    const row = D.financial.find(item => item.year === financialYear);
    $("#gapLabel").textContent = `Kelebihan / kekurangan ${gapMode === "post" ? "selepas" : "sebelum"} hibah`;
    $("#gapHeadline").textContent = rmMillions(row[gapMode]);
    $("#yearCard").innerHTML = `
      <span class="year-tag">TAHUN ${row.year}</span><h3>${rmMillions(row[gapMode])}</h3>
      <div class="balance-list">
        <div><span>Jumlah aset</span><strong>${rmMillions(row.assets)}</strong></div>
        <div><span>Liabiliti & simpanan</span><strong>${rmMillions(row.liabilities)}</strong></div>
        <div><span>Agihan hibah</span><strong>${rmMillions(row.distribution)}</strong></div>
      </div><p class="plain">${financialExplanation(row)}</p>
      <button class="evidence-link inverse" data-year-source="112">Bukti halaman 112 ↗</button>`;
    $$('[data-fin-year]').forEach(button => button.addEventListener("click", () => {
      financialYear = Number(button.dataset.finYear);
      $("#financialYear").value = financialYear;
      renderFinancial();
    }));
    $('[data-year-source]').addEventListener("click", event => openSource(event.currentTarget.dataset.yearSource));
  }
  $$("#gapToggle button").forEach(button => button.addEventListener("click", () => {
    gapMode = button.dataset.gap;
    $$("#gapToggle button").forEach(item => item.classList.toggle("active", item === button));
    renderFinancial();
  }));
  $("#financialYear").addEventListener("change", event => { financialYear = Number(event.target.value); renderFinancial(); });
  renderFinancial();

  // Impairment policy
  let activePolicy = 0;
  function renderPolicy() {
    $("#policySwitch").innerHTML = D.impairmentPolicies.map((item, index) => `
      <button class="${index === activePolicy ? "active" : ""}" data-policy="${index}">
        <span>POLISI ${index + 1}</span><strong>${item.threshold}</strong>
      </button>`).join("");
    const item = D.impairmentPolicies[activePolicy];
    $("#policyImpact").textContent = rmMillions(item.impact, 3);
    $("#policyNote").textContent = item.note;
    $$('[data-policy]').forEach(button => button.addEventListener("click", () => { activePolicy = Number(button.dataset.policy); renderPolicy(); }));
  }
  renderPolicy();

  // Hibah
  let activeHibahYear = 2017;
  function renderHibah() {
    const maxRate = 8.25;
    $("#hibahChart").innerHTML = D.hibah.map(row => {
      const totalRate = row.annual + row.hajj;
      const annualHeight = row.annual / maxRate * 225;
      const totalHeight = totalRate / maxRate * 225;
      const hajjHeight = Math.max(0, totalHeight - annualHeight);
      return `<div class="hibah-year ${row.year === activeHibahYear ? "active" : ""}">
        <strong>${totalRate.toFixed(2)}%</strong>
        <button data-hibah-year="${row.year}" style="height:${totalHeight}px" aria-label="${row.year}: ${totalRate.toFixed(2)} peratus">
          <i style="height:${hajjHeight}px" title="Hibah haji ${row.hajj}%"></i>
        </button><span>${row.year}</span>
      </div>`;
    }).join("");
    const row = D.hibah.find(item => item.year === activeHibahYear);
    $("#hibahDetail").innerHTML = `
      <span class="kicker">Tahun ${row.year}</span>
      <div class="rate">${(row.annual + row.hajj).toFixed(2)}% <small>jumlah kadar</small></div>
      <div class="hibah-detail-grid"><div><span>Hibah tahunan</span><strong>${row.annual.toFixed(2)}%</strong></div><div><span>Hibah haji</span><strong>${row.hajj.toFixed(2)}%</strong></div><div><span>Jumlah diagih</span><strong>${row.payout === null ? "Tiada dalam jadual" : rmMillions(row.payout, 2)}</strong></div><div><span>Jenis data</span><strong>Fakta laporan</strong></div></div>
      <p>${row.note}</p><button class="evidence-link" data-hibah-source="120">Bukti halaman 120 & 130 ↗</button>`;
    $$('[data-hibah-year]').forEach(button => button.addEventListener("click", () => { activeHibahYear = Number(button.dataset.hibahYear); renderHibah(); }));
    $('[data-hibah-source]').addEventListener("click", event => openSource(event.currentTarget.dataset.hibahSource));
  }
  renderHibah();

  // HAFIS simulation
  const hajjYear = $("#hajjYear");
  const paymentInput = $("#paymentInput");
  const pilgrimsInput = $("#pilgrimsInput");
  function projectionForYear() { return D.hafisProjection.find(row => row.year === Number(hajjYear.value)); }
  function setScenario(kind) {
    const row = projectionForYear();
    if (kind === "report") paymentInput.value = row.payment;
    if (kind === "b40") paymentInput.value = 10980;
    if (kind === "full") paymentInput.value = row.cost;
    $$("[data-scenario]").forEach(button => button.classList.toggle("active", button.dataset.scenario === kind));
    updateHajj();
  }
  function updateHajj() {
    const row = projectionForYear();
    paymentInput.max = row.cost;
    const payment = Math.min(Number(paymentInput.value), row.cost);
    if (Number(paymentInput.value) !== payment) paymentInput.value = payment;
    const pilgrims = Number(pilgrimsInput.value);
    const gap = Math.max(0, row.cost - payment);
    const share = gap / row.cost * 100;
    const total = gap * pilgrims / 1e6;
    $("#hajjYearOut").textContent = row.year;
    $("#paymentOut").textContent = rm(payment);
    $("#pilgrimsOut").textContent = pilgrims.toLocaleString("ms-MY");
    $("#costOut").textContent = rm(row.cost);
    $("#gapOut").textContent = rm(gap);
    $("#shareOut").textContent = `${share.toFixed(1)}%`;
    $("#shareRing").style.setProperty("--share", share.toFixed(1));
    $("#totalOut").textContent = `RM${total.toFixed(2)}j`;
    const delta = total - row.total;
    $("#compareOut").textContent = Math.abs(delta) < .05 ? `Sama seperti unjuran laporan ${row.year}` : `${delta > 0 ? "+" : "−"}RM${Math.abs(delta).toFixed(1)}j berbanding unjuran laporan ${row.year}`;
  }
  hajjYear.addEventListener("input", () => {
    const activeScenario = $("[data-scenario].active")?.dataset.scenario;
    if (activeScenario === "report" || activeScenario === "full") setScenario(activeScenario);
    else updateHajj();
  });
  [paymentInput, pilgrimsInput].forEach(input => input.addEventListener("input", () => {
    $$("[data-scenario]").forEach(button => button.classList.remove("active"));
    updateHajj();
  }));
  $$("[data-scenario]").forEach(button => button.addEventListener("click", () => setScenario(button.dataset.scenario)));
  updateHajj();

  const allHajj = [...D.hafisActual, ...D.hafisProjection];
  function renderHajjTable() {
    $("#hajjTableWrap").innerHTML = `<table class="data-table"><thead><tr><th>Tahun</th><th>Jenis</th><th>Kos</th><th>Bayaran</th><th>HAFIS seorang</th><th>Jumlah RMj</th></tr></thead><tbody>${allHajj.map(row => `<tr><td>${row.year}</td><td>${row.kind}</td><td>${rm(row.cost)}</td><td>${rm(row.payment)}</td><td>${rm(row.hafis)} (${row.share}%)</td><td>${row.total.toFixed(2)}</td></tr>`).join("")}</tbody></table>`;
  }
  renderHajjTable();
  $("#hajjTableToggle").addEventListener("click", event => {
    const wrap = $("#hajjTableWrap");
    wrap.hidden = !wrap.hidden;
    event.currentTarget.setAttribute("aria-expanded", String(!wrap.hidden));
    event.currentTarget.textContent = wrap.hidden ? "Lihat jadual angka" : "Sembunyikan jadual";
  });

  function drawHajjChart() {
    const canvas = $("#hajjCanvas");
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(320, rect.width) * ratio;
    canvas.height = 280 * ratio;
    const ctx = canvas.getContext("2d");
    ctx.scale(ratio, ratio);
    const width = canvas.width / ratio;
    const height = 280;
    const pad = { l: 45, r: 14, t: 18, b: 34 };
    const innerW = width - pad.l - pad.r;
    const innerH = height - pad.t - pad.b;
    const max = 40000;
    const x = index => pad.l + index * innerW / (allHajj.length - 1);
    const y = value => pad.t + innerH - value / max * innerH;
    ctx.font = "9px system-ui";
    ctx.fillStyle = "#6b747a";
    ctx.strokeStyle = "#ded8ce";
    ctx.lineWidth = 1;
    [0, 10000, 20000, 30000, 40000].forEach(value => {
      ctx.beginPath(); ctx.moveTo(pad.l, y(value)); ctx.lineTo(width - pad.r, y(value)); ctx.stroke();
      ctx.fillText(value === 0 ? "RM0" : `${value / 1000}k`, 8, y(value) + 3);
    });
    const drawSegment = (from, to, key, color, dashed = false) => {
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.setLineDash(dashed ? [6, 5] : []);
      for (let i = from; i <= to; i++) {
        const px = x(i), py = y(allHajj[i][key]);
        if (i === from) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke(); ctx.setLineDash([]);
    };
    drawSegment(0, D.hafisActual.length - 1, "cost", "#2b5f75");
    drawSegment(0, D.hafisActual.length - 1, "payment", "#ef7b45");
    drawSegment(D.hafisActual.length, allHajj.length - 1, "cost", "#2b5f75", true);
    drawSegment(D.hafisActual.length, allHajj.length - 1, "payment", "#ef7b45", true);
    ctx.strokeStyle = "#a9a198"; ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
    const divideX = (x(D.hafisActual.length - 1) + x(D.hafisActual.length)) / 2;
    ctx.beginPath(); ctx.moveTo(divideX, pad.t); ctx.lineTo(divideX, height - pad.b); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = "#6b747a";
    allHajj.forEach((row, index) => {
      if (index % 2 === 0 || index === allHajj.length - 1) ctx.fillText(String(row.year), x(index) - 10, height - 13);
    });
    ctx.fillText("UNJURAN LAPORAN", Math.min(divideX + 10, width - 105), 12);
  }
  new ResizeObserver(drawHajjChart).observe($("#hajjCanvas"));

  // Asset transfer explorer
  let activeTransfer = "all";
  function renderTransfer() {
    $("#transferTabs").innerHTML = D.transfers.map(row => `<button class="${row.id === activeTransfer ? "active" : ""}" data-transfer="${row.id}">${row.name}</button>`).join("");
    const row = D.transfers.find(item => item.id === activeTransfer);
    const max = Math.max(row.book, row.transfer, row.market);
    const bars = [
      ["Nilai buku LTH", row.book], ["Nilai pindahan", row.transfer], ["Nilai pasaran", row.market]
    ];
    $("#valuationBars").innerHTML = bars.map(([label, value]) => `<div class="valuation-bar"><strong>${rmMillions(value)}</strong><i style="height:${value / max * 185}px"></i><span>${label}</span></div>`).join("");
    const premium = row.transfer - row.market;
    const pct = premium / row.market * 100;
    $("#premiumValue").textContent = `+${rmMillions(premium)}`;
    $("#premiumPct").textContent = `+${pct.toFixed(1)}%`;
    $$('[data-transfer]').forEach(button => button.addEventListener("click", () => { activeTransfer = button.dataset.transfer; renderTransfer(); }));
  }
  renderTransfer();

  function renderBluechips() {
    const maxPrice = Math.max(...D.bluechips.flatMap(row => [row.transferUnit, row.market2018, row.market2022]));
    $("#bluechipGrid").innerHTML = D.bluechips.map(row => `
      <div class="bluechip-item"><strong>${row.name}</strong>
        <div class="price-track" title="Oren: pindahan, biru: Dis 2018, hijau: Jun 2022">
          <i style="left:${row.transferUnit / maxPrice * 100}%"></i><b style="left:${row.market2018 / maxPrice * 100}%"></b><em style="left:${row.market2022 / maxPrice * 100}%"></em>
        </div><span>−${row.drop2018}%</span>
      </div>`).join("");
  }
  renderBluechips();

  // Investigative case explorer
  let caseRegion = "Semua";
  let caseSector = "Semua sektor";
  let caseSort = "severity";
  let caseSearch = "";
  let activeCase = "fgv";
  const sectors = [...new Set(D.investments.map(row => row.sector))].sort((a, b) => a.localeCompare(b, "ms"));
  $("#sectorFilter").innerHTML += sectors.map(sector => `<option>${sector}</option>`).join("");
  function filteredCases() {
    const term = caseSearch.toLocaleLowerCase("ms");
    const rows = D.investments.filter(row =>
      (caseRegion === "Semua" || row.region === caseRegion) &&
      (caseSector === "Semua sektor" || row.sector === caseSector) &&
      `${row.name} ${row.issue} ${row.sector} ${row.status}`.toLocaleLowerCase("ms").includes(term)
    );
    return rows.sort((a, b) => {
      if (caseSort === "name") return a.name.localeCompare(b.name, "ms");
      if (caseSort === "value") return b.sortValue - a.sortValue;
      return b.severity - a.severity || b.sortValue - a.sortValue;
    });
  }
  function renderCases() {
    const rows = filteredCases();
    if (!rows.some(row => row.id === activeCase) && rows[0]) activeCase = rows[0].id;
    $("#caseList").innerHTML = `<p class="case-count">${rows.length} daripada 14 kes</p>` + (rows.length ? rows.map(row => `
      <button class="case-item ${row.id === activeCase ? "active" : ""}" data-case="${row.id}">
        <span class="case-meta">${row.place} · ${row.sector}</span><strong>${row.name}</strong><span class="case-signal">${row.signal}</span>
        <span class="severity" aria-label="Tahap isu ${row.severity} daripada 5">${[1,2,3,4,5].map(n => `<i class="${n <= row.severity ? "on" : ""}"></i>`).join("")}</span>
      </button>`).join("") : `<div class="empty-state">Tiada kes sepadan dengan tapisan ini.</div>`);
    const row = D.investments.find(item => item.id === activeCase);
    if (row && rows.length) {
      $("#caseDetail").innerHTML = `
        <span class="detail-meta">${row.place} · ${row.sector} · ${row.status}</span><h3>${row.name}</h3>
        <div class="signal">${row.signal}</div>
        <div class="case-metric"><span>Angka konteks</span><strong>${row.metric}</strong></div>
        <div class="case-block"><span>APA MASALAHNYA</span><p>${row.issue}</p></div>
        <div class="case-block"><span>TINDAKAN KETIKA LAPORAN</span><p>${row.action}</p></div>
        <button class="primary-button" data-case-source="${row.page}">Buka bukti halaman ${row.page} ↗</button>`;
      $('[data-case-source]').addEventListener("click", event => openSource(event.currentTarget.dataset.caseSource));
    } else {
      $("#caseDetail").innerHTML = `<div class="empty-state">Longgarkan carian atau tapisan untuk membuka rekod.</div>`;
    }
    $$('[data-case]').forEach(button => button.addEventListener("click", () => { activeCase = button.dataset.case; renderCases(); }));
  }
  $("#caseSearch").addEventListener("input", event => { caseSearch = event.target.value; renderCases(); });
  $$("#regionFilters button").forEach(button => button.addEventListener("click", () => {
    caseRegion = button.dataset.region;
    $$("#regionFilters button").forEach(item => item.classList.toggle("active", item === button));
    renderCases();
  }));
  $("#sectorFilter").addEventListener("change", event => { caseSector = event.target.value; renderCases(); });
  $("#caseSort").addEventListener("change", event => {
    caseSort = event.target.value;
    $("#sortWarning").hidden = caseSort !== "value";
    renderCases();
  });
  renderCases();

  // Recommendations and timeline
  let recArea = "Semua";
  const recAreas = ["Semua", ...new Set(D.recommendations.map(row => row.area))];
  function renderRecommendations() {
    $("#recommendationFilters").innerHTML = recAreas.map(area => `<button class="${area === recArea ? "active" : ""}" data-rec-area="${area}">${area}</button>`).join("");
    const rows = D.recommendations.filter(row => recArea === "Semua" || row.area === recArea);
    $("#recommendationGrid").innerHTML = rows.map(row => `<article class="recommendation-card"><span>${row.area.toUpperCase()}</span><h3>${row.title}</h3><p>${row.plain}</p><button class="evidence-link" data-rec-source="${row.page}">Bukti hlm. ${row.page} ↗</button></article>`).join("");
    $$('[data-rec-area]').forEach(button => button.addEventListener("click", () => { recArea = button.dataset.recArea; renderRecommendations(); }));
    $$('[data-rec-source]').forEach(button => button.addEventListener("click", () => openSource(button.dataset.recSource)));
  }
  renderRecommendations();

  const timelineTypes = ["Semua", ...new Set(D.timeline.map(row => row.type))];
  $("#timelineFilter").innerHTML = timelineTypes.map(type => `<option value="${type}">${type}</option>`).join("");
  function renderTimeline() {
    const filter = $("#timelineFilter").value;
    const rows = D.timeline.filter(row => filter === "Semua" || row.type === filter);
    $("#timeline").innerHTML = rows.map(row => `<article class="timeline-item"><time>${row.date}</time><span>${row.type}</span><h3>${row.title}</h3><p>${row.text}</p><button class="evidence-link" data-time-source="${row.page}">hlm. ${row.page} ↗</button></article>`).join("");
    $$('[data-time-source]').forEach(button => button.addEventListener("click", () => openSource(button.dataset.timeSource)));
  }
  $("#timelineFilter").addEventListener("change", renderTimeline);
  renderTimeline();

  // Lightweight scroll spy for desktop navigation.
  const navLinks = $$(".topnav a");
  const observed = navLinks.map(link => $(link.getAttribute("href"))).filter(Boolean);
  const observer = new IntersectionObserver(entries => {
    const current = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!current) return;
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current.target.id}`));
  }, { rootMargin: "-25% 0px -65%", threshold: [0, .15, .5] });
  observed.forEach(section => observer.observe(section));
})();
