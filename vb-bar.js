/* VibeBench navigation bar — injected at the top of every result page.
   Usage: <script src="/data.js"></script>
          <script src="/vb-bar.js"></script>
   data.js is the standalone repo's navigation-data snapshot.
   The bar is static (not sticky) so it never collides with a page's own sticky topbar. */
(function () {
  var HOME_URL = "https://pandaitech.my/vibebench";
  var D = window.VIBEBENCH;
  if (!D) return;

  var path = normalizePath(location.pathname);
  var job = null, current = null;

  (D.jobs || []).forEach(function (j) {
    (j.entries || []).forEach(function (e) {
      if (e.url && normalizePath(e.url) === path) { job = j; current = e; }
    });
  });

  var css = document.createElement("style");
  css.textContent = [
    /* Brand tokens: offblack #091717, offwhite #FBFAF4, offpurple #824182 */
    ".vb-bar{all:initial;display:block;box-sizing:border-box;width:100%;background:#091717;color:#FBFAF4;",
    "font-family:'Plus Jakarta Sans',Inter,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;font-size:13px;line-height:1.4;position:relative;z-index:2147483000}",
    ".vb-bar *{box-sizing:border-box;font-family:inherit}",
    ".vb-in{max-width:1500px;margin:0 auto;padding:9px 20px;display:flex;align-items:center;gap:14px;overflow-x:auto;scrollbar-width:none}",
    ".vb-in::-webkit-scrollbar{display:none}",
    ".vb-home{display:inline-flex;align-items:center;gap:8px;color:#FBFAF4;text-decoration:none;font-weight:700;white-space:nowrap;letter-spacing:-.01em}",
    ".vb-home:hover{color:#A555A5}",
    ".vb-dot{width:7px;height:7px;border-radius:50%;background:#824182;flex:none}",
    ".vb-case{color:rgba(251,250,244,.5);white-space:nowrap;font-size:12.5px;border-left:1px solid rgba(251,250,244,.16);padding-left:14px}",
    ".vb-case b{color:rgba(251,250,244,.88);font-weight:600}",
    ".vb-pills{display:flex;align-items:center;gap:8px;margin-left:auto;white-space:nowrap}",
    ".vb-lab{color:rgba(251,250,244,.42);font-size:10.5px;text-transform:uppercase;letter-spacing:.18em;font-weight:700;margin-right:2px}",
    ".vb-pill{display:inline-flex;align-items:center;gap:7px;padding:6px 14px;border-radius:999px;text-decoration:none;",
    "color:rgba(251,250,244,.78);border:1px solid rgba(251,250,244,.2);font-size:12.5px;font-weight:600;white-space:nowrap;",
    "transition:background .15s,color .15s,border-color .15s}",
    ".vb-pill:hover{background:#824182;border-color:#824182;color:#FBFAF4}",
    ".vb-pill.on{background:#FBFAF4;color:#091717;border-color:#FBFAF4;cursor:default}",
    ".vb-tick{width:7px;height:7px;border-radius:50%;flex:none}",
    "@media(max-width:760px){.vb-in{padding:8px 14px;gap:10px}.vb-case,.vb-lab{display:none}.vb-pills{margin-left:auto}}"
  ].join("");
  document.head.appendChild(css);

  var bar = document.createElement("div");
  bar.className = "vb-bar";

  var html = '<div class="vb-in">' +
    '<a class="vb-home" href="' + esc(HOME_URL) + '"><span class="vb-dot"></span>VibeBench</a>';

  if (job) {
    html += '<span class="vb-case">The job &middot; <b>' + esc(job.title) + '</b></span>';
    html += '<span class="vb-pills"><span class="vb-lab">Compare</span>';
    job.entries.filter(function (e) { return !!e.url; }).forEach(function (e) {
      var c = D.contenders[e.contender] || { name: e.contender, accent: "#824182" };
      var on = e === current;
      html += on
        ? '<span class="vb-pill on"><span class="vb-tick" style="background:' + esc(c.accent) + '"></span>' + esc(c.name) + '</span>'
        : '<a class="vb-pill" href="' + esc(e.url) + '"><span class="vb-tick" style="background:' + esc(c.accent) + '"></span>' + esc(c.name) + '</a>';
    });
    html += "</span>";
  } else {
    html += '<span class="vb-pills"><a class="vb-pill" href="' + esc(HOME_URL) + '">All results</a></span>';
  }
  html += "</div>";
  bar.innerHTML = html;

  function mount() { document.body.insertBefore(bar, document.body.firstChild); }
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);

  function normalizePath(value) {
    try {
      var parsed = new URL(value, location.origin);
      return parsed.pathname.replace(/\/index\.html$/, "").replace(/\/+$/, "") || "/";
    } catch (error) {
      return String(value).replace(/\/index\.html$/, "").replace(/\/+$/, "") || "/";
    }
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }
})();
