/* GrowthLock Cyber Monday 2026: shared page behavior.
   Settings live in assets/config.js. No edits needed here. */
(function () {
  "use strict";
  var C = window.GL_CONFIG || {};
  var LINKS = C.LINKS || {};
  var WEBHOOKS = C.WEBHOOKS || {};
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

  /* ---------- Personalize thank-you pages ---------- */
  var savedFirst = store.getItem("gl_first_name");
  document.querySelectorAll("[data-first-name]").forEach(function (el) {
    if (savedFirst) el.textContent = el.dataset.firstName.replace("{name}", savedFirst);
  });

  /* ---------- Calendar embed (book-call.html) ---------- */
  var cal = document.querySelector("[data-calendar-frame]");
  if (cal && C.CALENDAR_EMBED_URL) {
    cal.src = C.CALENDAR_EMBED_URL;
    body.classList.add("has-calendar");
  }

  /* ---------- Date inputs: no past dates ---------- */
  document.querySelectorAll('input[type="date"][data-min-today]').forEach(function (el) {
    var t = new Date(); el.min = t.getFullYear() + "-" + pad(t.getMonth() + 1) + "-" + pad(t.getDate());
  });


  /* ---------- Exit-intent pop-up (landing page only) ---------- */
  var modal = document.getElementById("exit-modal");
  if (modal && C.EXIT_POPUP_ENABLED !== false && !ended) {
    var shown = false, armed = false, lastFocus = null;
    try { shown = sessionStorage.getItem("gl_exit_shown") === "1"; } catch (e) {}

    var closeModal = function () {
      modal.hidden = true; document.body.classList.remove("modal-open");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    var openModal = function () {
      if (shown || !armed) return;
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

    setTimeout(function () { armed = true; }, 4000);

    // Desktop: cursor leaves through the top of the window.
    document.addEventListener("mouseout", function (e) {
      if (!e.relatedTarget && e.clientY <= 0) openModal();
    });
    // Mobile: fast scroll back up after reading a good part of the page.
    var lastY = window.scrollY, lastT = Date.now(), maxY = 0;
    window.addEventListener("scroll", function () {
      var y = window.scrollY, t = Date.now(); maxY = Math.max(maxY, y);
      var vel = (lastY - y) / Math.max(t - lastT, 1);
      if (matchMedia("(pointer: coarse)").matches && maxY > 900 && vel > 1.2 && y > 100) openModal();
      lastY = y; lastT = t;
    }, { passive: true });
  }

  /* ---------- Forms ---------- */
  function fieldWrap(el) { return el.closest(".field") || el.closest(".check"); }

  function validate(form) {
    var ok = true, first = null;
    form.querySelectorAll("input, select, textarea").forEach(function (el) {
      if (el.closest(".hp") || el.type === "hidden") return;
      var wrap = fieldWrap(el); if (!wrap) return;
      var bad = !el.checkValidity();
      if (!bad && el.type === "tel" && el.value.trim()) {
        bad = el.value.replace(/\D/g, "").length < 10;
      }
      wrap.classList.toggle("invalid", bad);
      if (bad) { ok = false; if (!first) first = el; }
    });
    if (first) first.focus();
    return ok;
  }

  function post(url, data) {
    var params = new URLSearchParams();
    Object.keys(data).forEach(function (k) { params.append(k, data[k]); });
    var ctrl = "AbortController" in window ? new AbortController() : null;
    var to = ctrl ? setTimeout(function () { ctrl.abort(); }, 12000) : null;
    // "no-cors" + form encoding lets the browser deliver to GHL without a CORS preflight.
    return fetch(url, {
      method: "POST", mode: "no-cors", body: params,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: ctrl ? ctrl.signal : undefined
    }).finally(function () { if (to) clearTimeout(to); });
  }

  document.querySelectorAll("form[data-gl-form]").forEach(function (form) {
    form.setAttribute("novalidate", "");
    form.addEventListener("input", function (e) {
      var w = fieldWrap(e.target); if (w && w.classList.contains("invalid") && e.target.checkValidity()) w.classList.remove("invalid");
    });
    form.addEventListener("change", function (e) {
      var w = fieldWrap(e.target); if (w && w.classList.contains("invalid") && e.target.checkValidity()) w.classList.remove("invalid");
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var errBox = form.querySelector(".form-error");
      if (errBox) errBox.classList.remove("show");
      if (!validate(form)) return;

      var key = form.dataset.glForm;
      var btn = form.querySelector('button[type="submit"]');
      var label = btn ? btn.textContent : "";
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = typeof v === "string" ? v.trim() : v; });

      // Honeypot: bots fill the hidden field. Pretend success, send nothing.
      var bot = !!data.company_website; delete data.company_website;

      // Checkboxes: send yes/no
      form.querySelectorAll('input[type="checkbox"]').forEach(function (cb) { data[cb.name] = cb.checked ? "yes" : "no"; });

      data.tags = form.dataset.tags || "";
      data.campaign = "CM26 Partner Drive";
      data.form = key;
      data.page = window.location.pathname.split("/").pop() || "index.html";
      data.submitted_at = new Date().toISOString();
      UTM_KEYS.forEach(function (k) { var v = store.getItem(k); if (v) data[k] = v; });

      store.setItem("gl_first_name", data.first_name || "");
      store.setItem("gl_email", data.email || "");

      var next = form.dataset.next || "index.html";

      var url = WEBHOOKS[key] || WEBHOOKS["default"];
      if (bot || !url) {
        if (!url && !bot) console.info("[GrowthLock] Preview mode: no webhook set for '" + key + "'. Payload:", data);
        window.location.href = next;
        return;
      }

      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      post(url, data).then(function () {
        window.location.href = next;
      }).catch(function () {
        if (btn) { btn.disabled = false; btn.textContent = label; }
        if (errBox) errBox.classList.add("show");
      });
    });
  });
})();
