/* =========================================================
   GrowthLock Cyber Monday 2026: SITE SETTINGS
   This is the only file the team needs to edit before launch.
   ========================================================= */
window.GL_CONFIG = {

  // Promo deadline: Dec 7, 2026, 11:59:59 PM Central (CST = UTC-6).
  DEADLINE: "2026-12-07T23:59:59-06:00",

  // After the deadline, send visitors of promo pages (landing, join)
  // to offer-ended.html automatically.
  REDIRECT_AFTER_DEADLINE: true,

  // Exit-intent pop-up on the landing page (Free Starter tripwire).
  // It shows once per visit when someone is about to leave without clicking a sign-up button.
  EXIT_POPUP_ENABLED: true,

  // GHL consultant calendar embed URL (e.g. https://api.leadconnectorhq.com/widget/booking/XXXX).
  // book-call.html shows this calendar. If it is ever emptied, the page shows a short notice instead.
  CALENDAR_EMBED_URL: "https://api.growthlock.com/widget/booking/l6ilq2P8ceikfS82W65t",

  // Links used on the pages.
  LINKS: {
    signup:         "https://partner.growthlock.com/auth/sign-up",  // every sign-up / enroll button
    adPerk:         "https://nov8rs.io/growthlock-bfcm",      // 15% off ad campaign landing page
    standardSignup: "https://growthlock.com/partner",               // used on offer-ended.html
    legal:          "https://growthlock.com/legal-disclaimer",
    privacy:        "https://growthlock.com/privacy-policy",
    terms:          "https://growthlock.com/terms-of-service",
    cookies:        "https://growthlock.com/cookie-policy"
  }
};
