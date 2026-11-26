/* GrowthLock Cyber Monday 2026: shared page behavior.
   Settings live in assets/config.js. No edits needed here. */
(function () {
  "use strict";
  var C = window.GL_CONFIG || {};
  var LINKS = C.LINKS || {};
  var DEADLINE = new Date(C.DEADLINE || "2026-12-07T23:59:59-06:00").getTime();
  var body = document.body;
  var store = (function () {
    try { var t = "__gl"; sessionStorage.setItem(t, t); sessionStorage.removeItem(t); return sessionStorage; }
    catch (e) { var m = {}; return { getItem: function (k) { return m[k] || null; }, setItem: function (k, v) { m[k] = String(v); } }; }
  })();

  /* ---------- Deadline ---------- */
  var ended = Date.now() > DEADLINE;
  if (ended) {
    body.classList.add("ended");
    if (body.dataset.promo === "true" && C.REDIRECT_AFTER_DEADLINE !== false) {
      window.location.replace("offer-ended.html");
      return;
    }
  }

  /* ---------- Links from config ---------- */
  document.querySelectorAll("[data-link]").forEach(function (a) {
    var url = LINKS[a.dataset.link];
    if (url) a.href = url;
  });

  /* ---------- UTM capture (kept for the whole visit) ---------- */
  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var qs = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach(function (k) { if (qs.get(k)) store.setItem(k, qs.get(k)); });

  /* ---------- Countdown ---------- */
  var pad = function (n) { return String(n).padStart(2, "0"); };
  function tick() {
    var left = DEADLINE - Date.now();
    if (left <= 0) { body.classList.add("ended"); return false; }
    var d = Math.floor(left / 864e5), h = Math.floor(left / 36e5) % 24,
        m = Math.floor(left / 6e4) % 60, s = Math.floor(left / 1e3) % 60;
    document.querySelectorAll("[data-countdown]").forEach(function (el) {
      el.querySelector("[data-d]").textContent = pad(d);
      el.querySelector("[data-h]").textContent = pad(h);
      el.querySelector("[data-m]").textContent = pad(m);
      el.querySelector("[data-s]").textContent = pad(s);
    });
    document.querySelectorAll("[data-countdown-inline]").forEach(function (el) {
      el.textContent = d + "d " + pad(h) + "h " + pad(m) + "m left";
    });
    return true;
  }
  if (tick()) { var timer = setInterval(function () { if (!tick()) clearInterval(timer); }, 1000); }

  /* ---------- Calendar embed (book-call.html) ---------- */
  var cal = document.querySelector("[data-calendar-frame]");
  if (cal && C.CALENDAR_EMBED_URL) {
    // GHL's form_embed.js finds the iframe by an id of "<widgetId>_<timestamp>" and auto-sizes it.
    cal.id = C.CALENDAR_EMBED_URL.split("/").pop().split("?")[0] + "_" + Date.now();
    cal.src = C.CALENDAR_EMBED_URL;
    body.classList.add("has-calendar");
    var s = document.createElement("script");
    s.src = "https://api.growthlock.com/js/form_embed.js"; s.async = true;
    document.body.appendChild(s);
  }

  /* ---------- Exit-intent pop-up (landing page only) ----------
     Opens only when the cursor leaves the browser window through the top edge.
     No timer. Once per visit. Skipped after a sign-up click. */
  var modal = document.getElementById("exit-modal");
  if (modal && C.EXIT_POPUP_ENABLED !== false && !ended) {
    var shown = false, lastFocus = null;
    try { shown = sessionStorage.getItem("gl_exit_shown") === "1"; } catch (e) {}

    var closeModal = function () {
      modal.hidden = true; document.body.classList.remove("modal-open");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    var openModal = function () {
      if (shown) return;
      shown = true;
      try { sessionStorage.setItem("gl_exit_shown", "1"); } catch (e) {}
      lastFocus = document.activeElement;
      modal.hidden = false; document.body.classList.add("modal-open");
      var go = modal.querySelector("[data-exit-cta]"); if (go) go.focus();
    };

    // Don't interrupt people who are already heading to sign up.
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a");
      if (a && (a.dataset.link === "signup" || a.hasAttribute("data-exit-cta"))) shown = true;
    });
    modal.addEventListener("click", function (e) { if (e.target === modal || e.target.closest("[data-exit-close]")) closeModal(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) closeModal(); });

    // Cursor leaves the window through the top (toward tabs, address bar or close button).
    document.addEventListener("mouseout", function (e) {
      if (!e.relatedTarget && e.clientY <= 0) openModal();
    });
  }
})();
