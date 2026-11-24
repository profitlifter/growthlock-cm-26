/* =========================================================
   GrowthLock Cyber Monday 2026: SITE SETTINGS
   This is the only file the team needs to edit before launch.
   ========================================================= */
window.GL_CONFIG = {

  // Promo deadline: Dec 7, 2026, 11:59:59 PM Central (CST = UTC-6).
  DEADLINE: "2026-12-07T23:59:59-06:00",

  // After the deadline, send visitors of promo pages (landing, join,
  // premier, ad campaign) to offer-ended.html automatically.
  REDIRECT_AFTER_DEADLINE: true,

  // GHL Inbound Webhook URLs (Automation > Workflows > trigger "Inbound Webhook").
  // Each form posts its fields + a "tags" value to its webhook.
  // Use one webhook for all forms (put it in "default") or one per form.
  // Leave empty to run in preview mode: forms skip posting and go
  // straight to the thank-you page.
  WEBHOOKS: {
    default: "",
    starter: "",   // join.html         → tag CM26-Starter
    premier: "",   // premier.html      → tag CM26-CheckoutStarted
    call:    "",   // book-call.html    → tag CM26-CallBooked
    ads:     ""    // ad-campaign.html  → tag CM26-AdCampaign
  },

  // Premier Partner $499/mo payment page (GHL order form or Stripe Payment Link).
  // Set its success / thank-you redirect to: thank-you-premier.html
  // The visitor's name and email are added to the URL so the checkout can prefill.
  PREMIER_PAYMENT_URL: "",

  // Optional: GHL consultant calendar embed URL
  // (e.g. https://api.leadconnectorhq.com/widget/booking/XXXX).
  // If set, book-call.html shows the live calendar instead of the request form.
  CALENDAR_EMBED_URL: "",

  // Other links used on the pages.
  LINKS: {
    portal:         "",                               // partner portal / affiliate link page
    onboarding:     "",                               // Premier onboarding calendar
    standardSignup: "https://growthlock.com/partner", // used on offer-ended.html
    legal:          "",
    privacy:        "",
    terms:          "",
    cookies:        ""
  }
};
