/*
 * counters.js — impact badges for the blog.
 *
 * Renders a small counter next to published work, sourced from GoatCounter's
 * public (CORS-enabled) counter endpoint. Counts are grouped by content type,
 * and each group gets its own log-scaled heat colormap so the most-read item
 * stands out:
 *   - blog posts  -> pageviews    (home + archive post lists, and the post page)
 *   - papers      -> click events (research menu entries)
 *   - open source -> click events (open-source menu entries)
 *
 * Display rules: hide anything < 10, show 10-999 exactly, and 1.2k / 12k / 1.2M
 * above that.
 *
 * No backend, no dependencies. If GoatCounter isn't configured (no meta tag),
 * this file no-ops. The *write* side (pageviews + click events) is handled by
 * GoatCounter's count.js, which is only loaded in production — so dev browsing
 * never inflates the numbers. This file only *reads*, and runs everywhere.
 */
(function () {
  "use strict";

  var meta = document.querySelector('meta[name="goatcounter-code"]');
  var CODE = meta && meta.content && meta.content.trim();
  if (!CODE) return; // not configured -> graceful no-op

  var BASE = "https://" + CODE + ".goatcounter.com/counter/";
  var MIN_SHOW = 10; // hide anything below this
  var CACHE_PREFIX = "gc:";
  var CACHE_TTL = 6 * 3600 * 1000; // 6h (GoatCounter caches counts ~4h server-side)

  // ---- number formatting -------------------------------------------------
  // <10 -> null (hidden); 10-999 -> exact; then 1.2k / 12k / 1.2M.
  function format(n) {
    if (n == null || n < MIN_SHOW) return null;
    if (n < 1000) return String(n);
    if (n < 10000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    if (n < 1e6) return Math.round(n / 1000) + "k";
    return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  }

  // ---- heat colormap -----------------------------------------------------
  function isDark() {
    var a = document.body.getAttribute("a");
    if (a === "dark") return true;
    if (a === "light") return false;
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  // t in [0,1]: 0 = coolest (least read) -> 1 = hottest (most read).
  // Warm "heat" ramp: muted grey -> amber -> red (no cool/green midtones).
  function heatColor(t) {
    t = Math.max(0, Math.min(1, t));
    var hue = 30 - 25 * t;                        // amber -> red
    var sat = 12 + 68 * t;                        // near-grey -> saturated
    var light = isDark() ? 58 + 10 * t : 50 - 8 * t;
    return "hsl(" + hue.toFixed(0) + ", " + sat.toFixed(0) + "%, " + light.toFixed(0) + "%)";
  }

  // Build a count -> color mapper, log-normalized over a group's counts.
  function makeHeat(values) {
    var pos = values.filter(function (v) { return v != null && v >= MIN_SHOW; });
    if (!pos.length) return function () { return null; };
    var logs = pos.map(Math.log);
    var lo = Math.min.apply(null, logs);
    var hi = Math.max.apply(null, logs);
    return function (n) {
      if (n == null || n < MIN_SHOW) return null;
      var t = hi === lo ? 0.5 : (Math.log(n) - lo) / (hi - lo);
      return heatColor(t);
    };
  }

  // ---- fetching (with a light localStorage cache) ------------------------
  function cacheGet(key) {
    try {
      var raw = localStorage.getItem(CACHE_PREFIX + key);
      if (!raw) return null;
      var o = JSON.parse(raw);
      return Date.now() - o.t > CACHE_TTL ? null : o.v;
    } catch (e) { return null; }
  }
  function cacheSet(key, v) {
    try {
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ v: v, t: Date.now() }));
    } catch (e) { /* private mode / quota — ignore */ }
  }

  // Encode each path segment but keep "/" so pageview paths stay structured.
  function counterUrl(key) {
    return BASE + key.split("/").map(encodeURIComponent).join("/") + ".json";
  }

  // Promise<number|null>. null on network failure. The endpoint returns valid
  // JSON even with HTTP 404 (no data yet), so we don't gate on res.ok.
  function fetchCount(key) {
    var cached = cacheGet(key);
    if (cached != null) return Promise.resolve(cached);
    return fetch(counterUrl(key))
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var n = parseInt(String(data.count).replace(/[^0-9]/g, ""), 10);
        if (isNaN(n)) n = 0;
        cacheSet(key, n);
        return n;
      })
      .catch(function () { return null; });
  }

  // ---- rendering ---------------------------------------------------------
  function insertAfter(el, badge) { el.insertAdjacentElement("afterend", badge); }
  function fillSlot(el, badge) { el.appendChild(badge); }

  function makeBadge(text, color, title) {
    var span = document.createElement("span");
    span.className = "count";
    span.textContent = text;
    if (color) span.style.color = color;
    span.title = title;
    return span;
  }

  // items: [{ el, key, insert }]. noun labels the tooltip ("views" | "clicks").
  function renderGroup(items, noun) {
    if (!items.length) return;
    Promise.all(items.map(function (it) {
      return fetchCount(it.key).then(function (n) { it.count = n; return it; });
    })).then(function (resolved) {
      var heat = makeHeat(resolved.map(function (it) { return it.count; }));
      resolved.forEach(function (it) {
        var text = format(it.count);
        if (!text) return; // below threshold or failed fetch
        var title = it.count.toLocaleString() + " " + noun;
        it.insert(it.el, makeBadge(text, heat(it.count), title));
      });
    });
  }

  // ---- click writes (papers + repos) -------------------------------------
  function wireClick(a, event) {
    a.addEventListener("click", function () {
      // count.js is production-only; guarded so dev clicks don't count.
      if (window.goatcounter && window.goatcounter.count) {
        window.goatcounter.count({ path: event, title: a.textContent.trim(), event: true });
      }
    });
  }

  // ---- event-name derivation ---------------------------------------------
  function paperEvent(href) {
    // /assets/papers/2020-foo.pdf -> paper-2020-foo
    return "paper-" + href.split("/").pop().replace(/\.pdf$/i, "");
  }
  function repoEvent(href) {
    // https://github.com/microsoft/foo(/...) -> code-foo
    var m = href.replace(/\/+$/, "").match(/github\.com\/[^/]+\/([^/?#]+)/i);
    return m ? "code-" + m[1] : null;
  }

  // ---- group collectors --------------------------------------------------
  function postViewItems() {
    var items = [];
    document.querySelectorAll("ul.post-list li a[data-count-path]").forEach(function (a) {
      items.push({ el: a, key: a.getAttribute("data-count-path"), insert: insertAfter });
    });
    document.querySelectorAll("span.count-slot[data-count-path]").forEach(function (s) {
      items.push({ el: s, key: s.getAttribute("data-count-path"), insert: fillSlot });
    });
    return items;
  }
  function paperClickItems() {
    var items = [];
    document.querySelectorAll('nav.menu a[href$=".pdf"]').forEach(function (a) {
      var ev = paperEvent(a.getAttribute("href"));
      wireClick(a, ev);
      items.push({ el: a, key: ev, insert: insertAfter });
    });
    return items;
  }
  function repoClickItems() {
    var items = [];
    document.querySelectorAll('nav.menu a[href*="github.com/microsoft/"]').forEach(function (a) {
      var ev = repoEvent(a.getAttribute("href"));
      if (!ev) return;
      wireClick(a, ev);
      items.push({ el: a, key: ev, insert: insertAfter });
    });
    return items;
  }

  function run() {
    renderGroup(postViewItems(), "views");
    renderGroup(paperClickItems(), "clicks");
    renderGroup(repoClickItems(), "clicks");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
