(function () {
  "use strict";

  const D = window.RCI_DATA;
  if (!D) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const nf0 = new Intl.NumberFormat("ms-MY", { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat("ms-MY", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const nf2 = new Intl.NumberFormat("ms-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const nf3 = new Intl.NumberFormat("ms-MY", { minimumFractionDigits: 3, maximumFractionDigits: 3 });

  const state = {
    story: 0,
    balanceYear: 2017,
    distributionPct: 100,
    ravLens: "pwc",
    hibahYear: 2018,
    ujsbValue: "transfer",
    investmentSearch: "",
    investmentSector: "Semua",
    investmentStatus: "Semua",
    investmentSort: "report",
    governancePerson: D.governance.people[0].name,
    bonusYear: 2014,
    hafisMode: "projection",
    hafisYear: 2030,
    hafisPayment: 12980,
    hafisPilgrims: 30000,
    timelineTheme: "Semua",
    recommendationCategory: "Semua",
    recommendationSearch: ""
  };

  const story = [
    {
      number: "01",
      title: "Pulangan tinggi menjadi jangkaan",
      short: "Hibah 2014–17 berjumlah RM12.65b.",
      metric: "RM12.65b",
      detail: "Agihan tinggi menyusutkan rizab dan menarik pendeposit yang mengejar pulangan. Apabila pendapatan melemah, mengekalkan jangkaan itu memerlukan risiko pelaburan yang lebih besar.",
      source: 112,
      tag: "Sintesis + jumlah terbitan"
    },
    {
      number: "02",
      title: "Cara mengukur aset dilonggarkan",
      short: "Ambang rosot nilai berubah dua kali pada 2017.",
      metric: "70% → 90%",
      detail: "Polisi rosot nilai bergerak daripada lebih 70% di bawah kos kepada 85%, kemudian 90%. Dalam analisis PwC, impak rosot nilai yang direkodkan jatuh daripada RM1.313b kepada RM1j.",
      source: 148,
      tag: "Fakta laporan"
    },
    {
      number: "03",
      title: "Untung bertukar rugi selepas pelarasan",
      short: "PwC melaras untung 2017 kepada kerugian.",
      metric: "+3.412 → −1.433",
      detail: "Selepas rosot nilai dan pelarasan nilai saksama, keuntungan direkod RM3.412b menjadi kerugian terlaras RM1.433b. Perbezaan pelarasan ialah RM4.845b.",
      source: 149,
      tag: "Fakta laporan"
    },
    {
      number: "04",
      title: "Jurang ditutup, risiko tertumpu ke hadapan",
      short: "Aset berpindah; Sukuk matang pada dua tarikh.",
      metric: "RM27.5b",
      detail: "Pemindahan aset kepada UJSB membolehkan jurang ditutup, tetapi nilai nominal Sukuk RM27.5b tertumpu pada 2026 dan 2029. Laporan menyebutnya hampir 31% daripada aset LTH.",
      source: 171,
      tag: "Fakta laporan + hubungan terbitan"
    }
  ];

  function pageUrl(page) {
    return `${D.meta.sourceUrl}#pdf-page-${page}`;
  }

  function fmtB(value, digits) {
    const formatter = digits === 1 ? nf1 : digits === 2 ? nf2 : nf3;
    return `RM${formatter.format(Math.abs(value))}b`;
  }

  function signedB(value) {
    const sign = value > 0 ? "+" : value < 0 ? "−" : "";
    return `${sign}RM${nf3.format(Math.abs(value))}b`;
  }

  function metricText(metric) {
    const value = metric.value;
    const prefix = metric.currency === "RM" ? "RM" : `${metric.currency}`;
    if (metric.currency === "RM" && value >= 1000) return `${prefix}${nf3.format(value / 1000)}b`;
    const formatter = value >= 100 ? nf1 : value >= 10 ? nf2 : nf3;
    return `${prefix}${formatter.format(value)}j`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    })[char]);
  }

  function setActiveButton(selector, activeButton, root = document) {
    $$(selector, root).forEach((item) => {
      const isActive = item === activeButton;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
  }

  function initGlobalNavigation() {
    document.addEventListener("click", (event) => {
      const scroller = event.target.closest("[data-scroll]");
      if (scroller) {
        const target = $(scroller.dataset.scroll);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      const source = event.target.closest("[data-source-page]");
      if (source) openSourceDialog(Number(source.dataset.sourcePage), source.textContent.trim());
    });

    const links = $$(".topic-bar a");
    const sections = $$('[data-section]');
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        links.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${visible.target.id}`;
          link.classList.toggle("is-active", isActive);
          if (isActive) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }, { rootMargin: "-20% 0px -65%", threshold: [0, .1, .35] });
      sections.forEach((section) => observer.observe(section));
    }
  }

  function initDialog() {
    const dialog = $("#evidenceDialog");
    $("#dialogClose").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  function showDialog(html) {
    $("#dialogContent").innerHTML = html;
    const dialog = $("#evidenceDialog");
    if (dialog.open) dialog.close();
    dialog.showModal();
  }

  function openSourceDialog(page, label) {
    showDialog(`
      <p class="dialog-kicker">Jejak ke sumber asal</p>
      <h2 id="dialogTitle">PDF halaman ${page}</h2>
      <div class="dialog-section">
        <h3>Apa yang akan dibuka</h3>
        <p>${escapeHtml(label || "Bukti laporan")} merujuk transkripsi OCR pada halaman fizikal PDF ${page}. Pautan di bawah pergi terus ke penanda halaman dalam fail sumber.</p>
      </div>
      <div class="dialog-section">
        <h3>Cara baca</h3>
        <p>OCR mungkin mempunyai kesilapan aksara. Dashboard mengutamakan jadual berlabel dan menyatakan percanggahan yang ditemui; semak PDF asal untuk penggunaan formal.</p>
      </div>
      <a class="dialog-source-link" href="${pageUrl(page)}" target="_blank" rel="noreferrer">Buka laporan · PDF ${page} ↗</a>
    `);
  }

  function renderStory() {
    $("#storyChain").innerHTML = story.map((item, index) => `
      <button class="story-step ${index === state.story ? "is-active" : ""}" data-story="${index}" aria-pressed="${index === state.story}">
        <span class="story-step__num">${item.number}</span>
        <strong>${item.title}</strong>
        <small>${item.short}</small>
        <span class="story-step__metric">${item.metric}</span>
      </button>
    `).join("");

    const active = story[state.story];
    $("#storyDetail").innerHTML = `
      <div><span class="data-tag data-tag--derived">${active.tag}</span><h3>${active.title}</h3><p>${active.detail}</p></div>
      <div><div class="story-detail__metric">${active.metric}</div><button class="source-button" data-source-page="${active.source}">Jejak bukti · PDF ${active.source}</button></div>
    `;

    $$("[data-story]", $("#storyChain")).forEach((button) => {
      button.addEventListener("click", () => {
        state.story = Number(button.dataset.story);
        renderStory();
      });
    });
  }

  function initBalance() {
    $("#balanceYears").innerHTML = D.balance.map((row) => `
      <button data-balance-year="${row.year}" class="${row.year === state.balanceYear ? "is-active" : ""}" aria-pressed="${row.year === state.balanceYear}">${row.year}</button>
    `).join("");

    $$("[data-balance-year]").forEach((button) => {
      button.addEventListener("click", () => {
        state.balanceYear = Number(button.dataset.balanceYear);
        setActiveButton("[data-balance-year]", button);
        renderBalance();
      });
    });

    $("#distributionSlider").addEventListener("input", (event) => {
      state.distributionPct = Number(event.target.value);
      renderBalance();
    });

    renderSustainableList();
    renderBalance();
  }

  function renderBalance() {
    const row = D.balance.find((item) => item.year === state.balanceYear);
    const scale = state.distributionPct / 100;
    const simulatedDistribution = row.distribution * scale;
    const simulatedLiability = row.liabilitiesBefore + simulatedDistribution;
    const simulatedGap = row.assets - simulatedLiability;
    const max = Math.max(row.assets, row.liabilitiesBefore + row.distribution) * 1.04;
    const assetWidth = (row.assets / max) * 100;
    const liabilityWidth = (row.liabilitiesBefore / max) * 100;
    const distributionWidth = (simulatedDistribution / max) * 100;

    $("#distributionPercent").textContent = `${state.distributionPct}%`;
    $("#distributionOutput").textContent = `${fmtB(simulatedDistribution)} daripada ${fmtB(row.distribution)}`;

    $("#balanceVisual").innerHTML = `
      <div class="balance-bars">
        <div class="balance-row">
          <div class="balance-row__label"><span>Aset dilaporkan</span><strong>${fmtB(row.assets)}</strong></div>
          <div class="bar-track"><div class="bar-fill bar-fill--asset" style="width:${assetWidth}%"></div></div>
        </div>
        <div class="balance-row">
          <div class="balance-row__label"><span>Liabiliti + agihan simulasi</span><strong>${fmtB(simulatedLiability)}</strong></div>
          <div class="bar-track">
            <div class="bar-fill bar-fill--liability" style="position:absolute;left:0;width:${liabilityWidth}%"></div>
            <div class="bar-fill bar-fill--simulation" style="position:absolute;left:${liabilityWidth}%;width:${distributionWidth}%"></div>
            <i class="bar-track__marker" title="Paras aset" style="left:${assetWidth}%"></i>
          </div>
        </div>
      </div>
      <div class="balance-legend"><span>Aset</span><span>Liabiliti sebelum agihan</span><span>Agihan dipilih</span></div>
    `;

    const finding = $("#balanceFinding");
    finding.classList.toggle("is-danger", simulatedGap < 0);
    const status = simulatedGap >= 0 ? "Aset masih melebihi liabiliti" : "Aset lebih rendah daripada liabiliti";
    const qualification = state.distributionPct === 100 ? "pada agihan sebenar" : "dalam simulasi ini";
    finding.innerHTML = `<strong>${status}: ${signedB(simulatedGap)}</strong> ${qualification}. Sebelum sebarang agihan, kedudukan tahun ${row.year} ialah ${signedB(row.gapBefore)}.`;
  }

  function renderSustainableList() {
    $("#sustainableList").innerHTML = D.balance.map((row) => {
      const sustainable = Math.max(0, Math.min(100, (row.gapBefore / row.distribution) * 100));
      return `
        <div class="sustainable-item ${sustainable === 0 ? "is-zero" : ""}">
          <span>${row.year}</span>
          <div class="sustainable-item__track"><div class="sustainable-item__fill" style="width:${sustainable}%"></div></div>
          <strong>${nf1.format(sustainable)}%</strong>
        </div>
      `;
    }).join("");
  }

  function initRav() {
    setActiveButton("#ravLens [data-lens]", $(`#ravLens [data-lens="${state.ravLens}"]`));
    $$("#ravLens [data-lens]").forEach((button) => {
      button.addEventListener("click", () => {
        state.ravLens = button.dataset.lens;
        setActiveButton("#ravLens [data-lens]", button);
        renderRav();
      });
    });
    renderRav();
  }

  function renderRav() {
    const r = D.rav2017;
    const views = {
      reported: {
        label: "Nilai bersih selepas agihan",
        value: -r.pwcNetLiability,
        note: "Aset penyata dibandingkan dengan liabiliti selepas agihan. Ini sama dengan defisit pasca-agihan dalam analisis PwC.",
        steps: [["Aset penyata", r.auditedAssets], ["Liabiliti selepas agihan", -r.liabilitiesAfterDistribution]]
      },
      rav: {
        label: "Lebihan mengikut RAV",
        value: r.ravSurplus,
        note: "Tambahan RAV mewujudkan lebihan kecil. Laporan mempertikai asasnya kerana banyak nilai datang daripada anggaran pengurusan.",
        steps: [["Aset penyata", r.auditedAssets], ["Tambahan RAV", r.ravAddition], ["Liabiliti termasuk deposit", -r.liabilitiesAfterDistribution]]
      },
      jan: {
        label: "Liabiliti bersih selepas rosot nilai JAN",
        value: -r.janNetLiability,
        note: "Kiraan ini bermula daripada lebihan RAV RM373j lalu memasukkan RM1.537b rosot nilai yang tidak direkodkan.",
        steps: [["Lebihan RAV", r.ravSurplus], ["Rosot nilai tidak direkod", -r.janUnrecordedImpairment]]
      },
      pwc: {
        label: "Untung/(rugi) 2017 terlaras",
        value: -r.adjustedLoss,
        note: "Ini ukuran untung rugi, bukan nilai aset bersih. Jumlah pelarasan RM4.845b menukar untung direkod kepada rugi.",
        steps: [["Untung direkod", r.recordedProfit], ["Rosot nilai ekuiti AFS", -r.afsEquityImpairment], ["Rosot nilai instrumen hutang", -r.debtImpairment], ["Pelarasan lain", -r.otherAdjustments]]
      }
    };
    const view = views[state.ravLens];
    $("#ravBridge").innerHTML = `
      <div class="rav-headline ${view.value < 0 ? "is-negative" : "is-positive"}"><span>${view.label}</span><strong>${signedB(view.value)}</strong></div>
      <div class="rav-steps">${view.steps.map(([label, value]) => `<div class="rav-step"><span>${label}</span><strong>${value >= 0 ? "+" : "−"}${fmtB(value)}</strong></div>`).join("")}</div>
      <p class="rav-note">${view.note}</p>
    `;
  }

  function initHibah() {
    renderHibah();
    $("#depositPath").innerHTML = D.depositMoments.map((point) => `
      <div class="deposit-point"><span>${point.label}</span><strong>${point.qualifier === "dilaporkan" ? "" : "≈"}RM${nf0.format(point.value)}b</strong></div>
    `).join("");
  }

  function renderHibah() {
    const maxRate = Math.max(...D.hibah.map((row) => row.annualRate + row.hajjRate));
    $("#hibahChart").innerHTML = D.hibah.map((row) => {
      const totalRate = row.annualRate + row.hajjRate;
      const totalHeight = (totalRate / maxRate) * 160;
      const annualHeight = totalRate ? (row.annualRate / totalRate) * totalHeight : 0;
      const hajjHeight = totalRate ? (row.hajjRate / totalRate) * totalHeight : 0;
      return `
        <button class="hibah-bar ${row.year === state.hibahYear ? "is-active" : ""}" data-hibah-year="${row.year}" aria-pressed="${row.year === state.hibahYear}" aria-label="${row.year}: jumlah kadar ${nf2.format(totalRate)} peratus">
          <span class="hibah-bar__value">${nf2.format(totalRate)}%</span>
          <span class="hibah-bar__annual" style="height:${annualHeight}px"></span>
          <span class="hibah-bar__hajj" style="height:${hajjHeight}px"></span>
          <span class="hibah-bar__year">${String(row.year).slice(2)}</span>
        </button>
      `;
    }).join("");

    $$("[data-hibah-year]").forEach((button) => button.addEventListener("click", () => {
      state.hibahYear = Number(button.dataset.hibahYear);
      renderHibah();
    }));

    const selected = D.hibah.find((row) => row.year === state.hibahYear);
    const totalRate = selected.annualRate + selected.hajjRate;
    const amount = selected.totalAmount == null ? "Jumlah agihan tidak diberikan dalam jadual amaun" : `Kos agihan: <strong>${fmtB(selected.totalAmount)}</strong>`;
    $("#hibahDetail").innerHTML = `<strong>${selected.year}</strong> · Hibah tahunan ${nf2.format(selected.annualRate)}%${selected.hajjRate ? ` + hibah haji ${nf2.format(selected.hajjRate)}%` : ""} = <strong>${nf2.format(totalRate)}%</strong>. ${amount}.`;
  }

  function initUjsb() {
    setActiveButton("#ujsbValueMode [data-value]", $(`#ujsbValueMode [data-value="${state.ujsbValue}"]`));
    $$("#ujsbValueMode [data-value]").forEach((button) => button.addEventListener("click", () => {
      state.ujsbValue = button.dataset.value;
      setActiveButton("#ujsbValueMode [data-value]", button);
      renderUjsbValues();
    }));
    renderUjsbValues();
    renderMaturity();
    renderBluechips();
  }

  function renderUjsbValues() {
    const modeLabels = { market: "Nilai pasaran", book: "Nilai buku", transfer: "Nilai pemindahan" };
    const max = Math.max(...D.ujsb.valuation.map((row) => row.transfer));
    const total = D.ujsb.valuation.reduce((sum, row) => sum + row[state.ujsbValue], 0);
    $("#ujsbValueChart").innerHTML = D.ujsb.valuation.map((row) => `
      <div class="asset-row">
        <div class="asset-row__head"><span>${row.asset}</span><strong>${fmtB(row[state.ujsbValue])}</strong></div>
        <div class="asset-row__track"><div class="asset-row__fill is-${state.ujsbValue}" style="width:${(row[state.ujsbValue] / max) * 100}%"></div></div>
      </div>
    `).join("");

    const equityPremium = D.ujsb.valuation[2].transfer - D.ujsb.valuation[2].market;
    const premiumShare = equityPremium / D.ujsb.totals.premium * 100;
    $("#ujsbValueFinding").innerHTML = state.ujsbValue === "transfer"
      ? `<strong>${modeLabels[state.ujsbValue]}: ${fmtB(total)}</strong>Ekuiti tersenarai menerangkan ${nf1.format(premiumShare)}% daripada beza keseluruhan RM10.171b berbanding nilai pasaran. Ini ialah kiraan dashboard.`
      : `<strong>${modeLabels[state.ujsbValue]}: ${fmtB(total)}</strong>Gunakan butang di atas untuk membandingkan lensa yang sama bagi ketiga-tiga jenis aset.`;
  }

  function renderMaturity() {
    $("#maturityTimeline").innerHTML = D.ujsb.sukuk.map((sukuk) => `
      <div class="maturity-event"><span>${sukuk.series} · ${sukuk.maturity}</span><strong>${fmtB(sukuk.nominal, 1)}</strong><small>Terbit ${fmtB(sukuk.issue, 1)} · hasil ${nf2.format(sukuk.yield)}%</small></div>
    `).join("");
  }

  function renderBluechips() {
    const maxPrice = Math.max(...D.ujsb.bluechips.map((row) => row.transferPrice));
    $("#bluechipChart").innerHTML = D.ujsb.bluechips.map((row) => `
      <div class="bluechip-row" title="Harga pindah RM${nf2.format(row.transferPrice)}, pasaran 2018 RM${nf2.format(row.market2018)}, pasaran Jun 2022 RM${nf2.format(row.market2022)}">
        <strong>${row.name}</strong>
        <div class="bluechip-track"><span style="width:${row.decline}%"></span><i style="left:${(row.market2022 / maxPrice) * 100}%"></i></div>
        <small>−${nf1.format(row.decline)}%</small>
      </div>
    `).join("");
  }

  function initInvestments() {
    const sectors = ["Semua", ...new Set(D.investments.map((item) => item.sector))];
    const statuses = ["Semua", ...new Set(D.investments.map((item) => item.status))];
    $("#investmentSector").innerHTML = sectors.map((value) => `<option value="${escapeHtml(value)}">${value === "Semua" ? "Semua sektor" : escapeHtml(value)}</option>`).join("");
    $("#investmentStatus").innerHTML = statuses.map((value) => `<option value="${escapeHtml(value)}">${value === "Semua" ? "Semua status" : escapeHtml(value)}</option>`).join("");

    $("#investmentSearch").addEventListener("input", (event) => { state.investmentSearch = event.target.value.toLowerCase().trim(); renderInvestments(); });
    $("#investmentSector").addEventListener("change", (event) => { state.investmentSector = event.target.value; renderInvestments(); });
    $("#investmentStatus").addEventListener("change", (event) => { state.investmentStatus = event.target.value; renderInvestments(); });
    $("#investmentSort").addEventListener("change", (event) => { state.investmentSort = event.target.value; renderInvestments(); });
    renderInvestments();
  }

  function filteredInvestments() {
    const query = state.investmentSearch;
    const originalOrder = new Map(D.investments.map((item, index) => [item.id, index]));
    const list = D.investments.filter((item) => {
      const haystack = `${item.name} ${item.sector} ${item.geography} ${item.issue} ${item.status} ${item.summary}`.toLowerCase();
      return (!query || haystack.includes(query)) &&
        (state.investmentSector === "Semua" || item.sector === state.investmentSector) &&
        (state.investmentStatus === "Semua" || item.status === state.investmentStatus);
    });
    if (state.investmentSort === "name") list.sort((a, b) => a.name.localeCompare(b.name, "ms"));
    if (state.investmentSort === "magnitude") list.sort((a, b) => {
      const aValue = a.metric.currency === "RM" ? a.metric.value : -1;
      const bValue = b.metric.currency === "RM" ? b.metric.value : -1;
      return bValue - aValue || originalOrder.get(a.id) - originalOrder.get(b.id);
    });
    return list;
  }

  function renderInvestments() {
    const list = filteredInvestments();
    $("#investmentSummary").innerHTML = `<span><strong>${list.length}</strong> daripada 14 kes dipaparkan</span><span>Unit, jenis ukuran dan mata wang kekal pada setiap kad.</span>`;
    $("#investmentGrid").innerHTML = list.length ? list.map((item) => `
      <button class="investment-card" data-investment="${item.id}">
        <span class="investment-card__top"><span>${item.sector} · ${item.geography}</span><span>PDF ${item.page}</span></span>
        <h3>${item.name}</h3>
        <p>${item.summary}</p>
        <span class="investment-card__metric"><strong>${metricText(item.metric)}</strong><span>${item.metric.label}<br>${item.metric.provenance}</span></span>
        <span class="investment-card__open" aria-hidden="true">↗</span>
      </button>
    `).join("") : `<div class="empty-state"><strong>Tiada padanan.</strong><br>Cuba buang satu penapis atau guna kata carian lain.</div>`;

    $$("[data-investment]").forEach((button) => button.addEventListener("click", () => {
      const item = D.investments.find((investment) => investment.id === button.dataset.investment);
      openInvestment(item);
    }));
  }

  function openInvestment(item) {
    showDialog(`
      <p class="dialog-kicker">${escapeHtml(item.sector)} · ${escapeHtml(item.geography)} · status dalam laporan 2022</p>
      <h2 id="dialogTitle">${escapeHtml(item.name)}</h2>
      <div class="dialog-tags"><span>${escapeHtml(item.issue)}</span><span>${escapeHtml(item.status)}</span><span>${escapeHtml(item.metric.provenance)}</span></div>
      <div class="dialog-metric"><span>${escapeHtml(item.metric.label)}</span><strong>${metricText(item.metric)}</strong></div>
      <div class="dialog-section"><h3>Apa yang laporan tunjukkan</h3><p>${escapeHtml(item.summary)}</p></div>
      <div class="dialog-section"><h3>Impak berangka</h3><p>${escapeHtml(item.impact)}</p></div>
      <div class="dialog-section"><h3>Tindakan / kedudukan ketika laporan</h3><p>${escapeHtml(item.action)}</p></div>
      <div class="dialog-section"><h3>Apa yang angka ini tidak buktikan</h3><p>Ukuran ini tidak semestinya kerugian tunai muktamad dan tidak dengan sendiri membuktikan salah laku jenayah. Bandingkan jenis ukuran sebelum membandingkan magnitud.</p></div>
      <a class="dialog-source-link" href="${pageUrl(item.page)}" target="_blank" rel="noreferrer">Buka bukti · PDF ${item.page} ↗</a>
    `);
  }

  function initGovernance() {
    renderGovernance();
    renderBonus();
  }

  function renderGovernance() {
    const max = Math.max(...D.governance.people.map((person) => person.count));
    $("#governanceChart").innerHTML = [...D.governance.people]
      .sort((a, b) => b.count - a.count)
      .map((person) => `
        <button class="governance-row ${person.count > D.governance.policyLimit ? "is-over" : ""} ${person.name === state.governancePerson ? "is-active" : ""}" data-person="${escapeHtml(person.name)}" aria-pressed="${person.name === state.governancePerson}">
          <span title="${escapeHtml(person.name)}">${person.name}</span>
          <div class="governance-row__track"><div class="governance-row__fill" style="width:${(person.count / max) * 100}%"></div></div>
          <strong>${person.count}</strong>
        </button>
      `).join("");

    $$("[data-person]").forEach((button) => button.addEventListener("click", () => {
      state.governancePerson = button.dataset.person;
      renderGovernance();
    }));

    const person = D.governance.people.find((item) => item.name === state.governancePerson);
    const delta = person.count - D.governance.policyLimit;
    $("#governanceDetail").innerHTML = `
      <span class="data-tag data-tag--fact">PDF ${person.page}</span>
      <h3>${person.name}</h3>
      <p>${person.role} · ${person.count} jawatan disenaraikan</p>
      <div class="governance-delta">${delta > 0 ? `${delta} jawatan melebihi had baharu 5 jika had itu digunakan sebagai tanda aras.` : `Bilangan ini berada dalam had baharu 5.`} Perbandingan ini terbitan dashboard dan tidak mengambil kira tempoh setiap jawatan.</div>
      <div class="entity-chips">${person.entities.map((entity) => `<span>${entity}</span>`).join("")}</div>
      <button class="source-button source-button--dark source-button--block" data-source-page="${person.page}">Jejak senarai · PDF ${person.page}</button>
    `;
  }

  function renderBonus() {
    const maxAllocation = Math.max(...D.bonus.map((row) => row.allocation));
    const maxMonths = Math.max(...D.bonus.map((row) => row.maxMonths));
    $("#bonusChart").innerHTML = D.bonus.map((row) => {
      const barHeight = (row.allocation / maxAllocation) * 165;
      const dotBottom = 28 + (row.maxMonths / maxMonths) * 165;
      return `
        <button class="bonus-year ${row.year === state.bonusYear ? "is-active" : ""}" data-bonus-year="${row.year}" aria-pressed="${row.year === state.bonusYear}" aria-label="${row.year}: RM${nf1.format(row.allocation)} juta, maksimum ${row.maxMonths} bulan">
          <span class="bonus-year__months" style="bottom:${dotBottom}px" title="Maksimum ${row.maxMonths} bulan"></span>
          <span class="bonus-year__bar" style="height:${barHeight}px"></span>
          <span class="bonus-year__label">${String(row.year).slice(2)}</span>
        </button>
      `;
    }).join("");
    $$("[data-bonus-year]").forEach((button) => button.addEventListener("click", () => {
      state.bonusYear = Number(button.dataset.bonusYear);
      renderBonus();
    }));
    const selected = D.bonus.find((row) => row.year === state.bonusYear);
    const balance = D.balance.find((row) => row.year === state.bonusYear);
    const balanceText = balance ? ` Analisis PwC menunjukkan kedudukan selepas agihan ${signedB(balance.gapAfter)}.` : "";
    $("#bonusDetail").innerHTML = `<strong>${selected.year}</strong> · Peruntukan RM${nf1.format(selected.allocation)}j · taburan sehingga <strong>${selected.maxMonths} bulan</strong> (${selected.approved}).${balanceText}`;
  }

  function initHafis() {
    setActiveButton("#hafisMode [data-mode]", $(`#hafisMode [data-mode="${state.hafisMode}"]`));
    setActiveButton("[data-payment]", $(`[data-payment="${state.hafisPayment}"]`));
    $$("#hafisMode [data-mode]").forEach((button) => button.addEventListener("click", () => {
      state.hafisMode = button.dataset.mode;
      state.hafisYear = state.hafisMode === "actual" ? 2019 : 2030;
      setActiveButton("#hafisMode [data-mode]", button);
      renderHafisChart();
    }));

    $$("[data-payment]").forEach((button) => button.addEventListener("click", () => {
      state.hafisPayment = Number(button.dataset.payment);
      $("#hafisPayment").value = state.hafisPayment;
      setActiveButton("[data-payment]", button);
      renderHafisSimulation();
    }));

    $("#hafisPayment").addEventListener("input", (event) => {
      state.hafisPayment = Number(event.target.value);
      setActiveButton("[data-payment]", $(`[data-payment="${state.hafisPayment}"]`));
      renderHafisSimulation();
    });
    $("#hafisPilgrims").addEventListener("input", (event) => { state.hafisPilgrims = Number(event.target.value); renderHafisSimulation(); });
    $("#hafisReset").addEventListener("click", () => {
      state.hafisPayment = 12980;
      state.hafisPilgrims = 30000;
      $("#hafisPayment").value = 12980;
      $("#hafisPilgrims").value = 30000;
      setActiveButton("[data-payment]", $('[data-payment="12980"]'));
      renderHafisSimulation();
    });
    renderHafisChart();
    renderHafisSimulation();
  }

  function renderHafisChart() {
    const rows = D.hafis[state.hafisMode];
    const maxCost = Math.max(...rows.map((row) => row.cost));
    $("#hafisChart").style.gridTemplateColumns = `repeat(${rows.length}, minmax(35px, 1fr))`;
    $("#hafisChart").innerHTML = rows.map((row) => {
      const stackHeight = (row.cost / maxCost) * 190;
      const payHeight = (row.payment / row.cost) * stackHeight;
      const subsidyHeight = (row.perPerson / row.cost) * stackHeight;
      return `
        <button class="hafis-year ${row.year === state.hafisYear ? "is-active" : ""}" data-hafis-year="${row.year}" aria-pressed="${row.year === state.hafisYear}" aria-label="${row.year}: kos RM${nf0.format(row.cost)}, HAFIS RM${nf0.format(row.perPerson)}">
          <span class="hafis-year__stack" style="height:${stackHeight}px"><span class="hafis-year__subsidy" style="height:${subsidyHeight}px"></span><span class="hafis-year__pay" style="height:${payHeight}px"></span></span>
          <span class="hafis-year__label">${String(row.year).slice(2)}</span>
        </button>
      `;
    }).join("");
    $$("[data-hafis-year]").forEach((button) => button.addEventListener("click", () => {
      state.hafisYear = Number(button.dataset.hafisYear);
      renderHafisChart();
    }));

    const selected = rows.find((row) => row.year === state.hafisYear);
    $("#hafisChartDetail").innerHTML = `<strong>${selected.year}</strong> · Kos RM${nf0.format(selected.cost)} seorang = bayaran RM${nf0.format(selected.payment)} + HAFIS <strong>RM${nf0.format(selected.perPerson)} (${nf1.format(selected.share)}%)</strong>. Jumlah HAFIS ${selected.total >= 100 ? `RM${nf2.format(selected.total)}j` : `RM${nf1.format(selected.total)}j`}.`;
  }

  function renderHafisSimulation() {
    const cost = D.hafis.projection.find((row) => row.year === 2030).cost;
    const gap = Math.max(0, cost - state.hafisPayment);
    const share = cost ? (gap / cost) * 100 : 0;
    const total = (gap * state.hafisPilgrims) / 1e6;
    const hibahPoints = (total / (D.hafis.reportDepositBase * 1000)) * 100;
    $("#hafisPaymentOutput").textContent = `RM${nf0.format(state.hafisPayment)}`;
    $("#hafisPilgrimsOutput").textContent = nf0.format(state.hafisPilgrims);
    $("#hafisSimulation").innerHTML = `
      <div class="sim-result"><span>HAFIS seorang</span><strong>RM${nf0.format(gap)}</strong></div>
      <div class="sim-result ${share > 50 ? "is-alert" : ""}"><span>Bahagian kos</span><strong>${nf1.format(share)}%</strong></div>
      <div class="sim-result ${total > 742.47 ? "is-alert" : ""}"><span>Jumlah simulasi</span><strong>RM${nf1.format(total)}j</strong></div>
      <div class="sim-result"><span>Setara % deposit RM88b</span><strong>≈${nf2.format(hibahPoints)} mata</strong></div>
    `;
  }

  function initTimeline() {
    const themes = ["Semua", ...new Set(D.timeline.map((event) => event.theme))];
    $("#timelineFilters").innerHTML = themes.map((theme) => `<button data-timeline-theme="${escapeHtml(theme)}" class="${theme === state.timelineTheme ? "is-active" : ""}" aria-pressed="${theme === state.timelineTheme}">${theme}</button>`).join("");
    $$("[data-timeline-theme]").forEach((button) => button.addEventListener("click", () => {
      state.timelineTheme = button.dataset.timelineTheme;
      setActiveButton("[data-timeline-theme]", button);
      renderTimeline();
    }));
    renderTimeline();
  }

  function renderTimeline() {
    const events = D.timeline.filter((event) => state.timelineTheme === "Semua" || event.theme === state.timelineTheme);
    $("#timelineList").innerHTML = events.map((event) => `
      <article class="timeline-card" data-theme="${escapeHtml(event.theme)}">
        <span class="timeline-card__year">${event.year}</span><span class="timeline-card__theme">${event.theme}</span>
        <h3>${event.title}</h3><p>${event.detail}</p>
        <button class="source-button" data-source-page="${event.page}">PDF ${event.page}</button>
      </article>
    `).join("");
  }

  function initRecommendations() {
    const categories = ["Semua", ...new Set(D.recommendations.map((item) => item.category))];
    $("#recommendationFilters").innerHTML = categories.map((category) => `<button data-recommendation-category="${escapeHtml(category)}" class="${category === state.recommendationCategory ? "is-active" : ""}" aria-pressed="${category === state.recommendationCategory}">${category}</button>`).join("");
    $$("[data-recommendation-category]").forEach((button) => button.addEventListener("click", () => {
      state.recommendationCategory = button.dataset.recommendationCategory;
      setActiveButton("[data-recommendation-category]", button);
      renderRecommendations();
    }));
    $("#recommendationSearch").addEventListener("input", (event) => { state.recommendationSearch = event.target.value.toLowerCase().trim(); renderRecommendations(); });
    renderRecommendations();
  }

  function renderRecommendations() {
    const rows = D.recommendations.filter((item) => {
      const matchesCategory = state.recommendationCategory === "Semua" || item.category === state.recommendationCategory;
      const haystack = `${item.id} ${item.category} ${item.title} ${item.detail}`.toLowerCase();
      return matchesCategory && (!state.recommendationSearch || haystack.includes(state.recommendationSearch));
    });
    $("#recommendationCount").textContent = `${rows.length} daripada ${D.recommendations.length} syor ditunjukkan`;
    $("#recommendationList").innerHTML = rows.length ? rows.map((item) => `
      <article class="recommendation-item">
        <span class="recommendation-item__id">${item.id}</span>
        <div><h3>${item.title}</h3><p>${item.detail}</p></div>
        <button class="source-button" data-source-page="${item.page}">PDF ${item.page}</button>
      </article>
    `).join("") : `<div class="empty-state">Tiada syor sepadan dengan carian ini.</div>`;
  }

  function renderIntegrityNotes() {
    $("#integrityNotes").innerHTML = D.integrityNotes.map((note, index) => `
      <details class="integrity-item" ${index === 0 ? "open" : ""}>
        <summary>${note.title}</summary>
        <p>${note.detail}</p>
        <div class="integrity-links">${note.pages.map((page) => `<button class="source-button source-button--dark" data-source-page="${page}">PDF ${page}</button>`).join("")}</div>
      </details>
    `).join("");
  }

  function init() {
    initDialog();
    initGlobalNavigation();
    renderStory();
    initBalance();
    initRav();
    initHibah();
    initUjsb();
    initInvestments();
    initGovernance();
    initHafis();
    initTimeline();
    initRecommendations();
    renderIntegrityNotes();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
