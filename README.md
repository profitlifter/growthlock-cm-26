# GrowthLock Cyber Monday 2026: Partner Funnel

Static site for the GrowthLock Cyber Monday partner promo. Sign-ups close **Dec 7, 2026 at 11:59 PM CT**. Premier Monthly pays 50% for the first 3 months from sign-up (first 30 days free, then $499/month). Premier Yearly ($3,995/year) pays 50% for the first 6 months. Free Starter (public) pays 30% for 90 days; Profit Lifter partners get 35%.

**Live domain:** `https://bf.growthlock.com` (each page at `/page-name.html`; every page has its canonical URL and social share tags set to this domain).

No build step: plain HTML, CSS and JavaScript. Deploy the whole folder.

**Email templates** for the GHL workflows are in [`emails/`](emails/README.md). They're for pasting into GHL, not part of the site. Leave the folder out of the deploy if you don't want it public.

## Pages

| Page | Purpose | Sign-up / next step |
| --- | --- | --- |
| `index.html` | Landing page: Premier Monthly and Yearly, 15% ad perk, countdown, FAQ, **exit-intent pop-up** (Free Starter) | Enroll buttons → `https://partner.growthlock.com/auth/sign-up`; Partner Perk card → `ad-perk.html` |
| `join.html` | Free Starter explainer (30% for 90 days). Reached from the exit pop-up and from emails; not linked from the offer cards | Buttons → `https://partner.growthlock.com/auth/sign-up` |
| `ad-perk.html` | 15% off Nov8rs.io ad campaign explainer. The landing page's Partner Perk card goes here | Buttons → `LINKS.adPerk` (`http://profitlifter.com/growthlock-bfcm`, hosted on the Profit Lifter site) |
| `profit-lifter.html` | **Unlinked, `noindex`.** Profit Lifter page: same layout as the landing page, with 35% Free Starter plus Premier Monthly and Yearly at 50%. Profit Lifter sends traffic here (lead capture, L1 email). Never link it from the landing page, menus or any public page | Buttons → `https://partner.growthlock.com/auth/sign-up` |
| `book-call.html` | Consultant call request, or live GHL calendar | Form → tag `CM26-CallBooked` → `thank-you-call.html` |
| `thank-you-call.html` | Call confirmation | n/a |
| `offer-ended.html` | Shown after the deadline | n/a |

Retired in v2: `premier.html`, `ad-campaign.html`, `thank-you-starter.html`, `thank-you-premier.html`, `thank-you-ad.html`. Enrollment, payment and the contact/tag creation now happen on the partner portal.

## Setup: edit `assets/config.js` only

1. **Sign-up links:** `LINKS.signup` is used by every enroll button. `LINKS.adPerk` is where the Partner Perk page's buttons go (the page on profitlifter.com).
2. **Call form webhook (optional):** create a GHL workflow with the **Inbound Webhook** trigger and put its URL in `WEBHOOKS.call`. Submit the form once so GHL can map the fields.
3. **Calendar (optional):** set `CALENDAR_EMBED_URL` to the GHL booking widget URL. `book-call.html` then shows the live calendar instead of the request form.
4. **Exit pop-up:** `EXIT_POPUP_ENABLED: true` shows it once per visit on `index.html` (desktop: cursor leaves the top of the window; mobile: fast scroll back up). It is skipped if the visitor already clicked a sign-up button. Set to `false` to turn it off.

**Preview mode:** while `WEBHOOKS.call` is empty, the call form skips sending and goes straight to the thank-you page (the payload is logged in the browser console).

## What the call form sends

All fields on the form, plus:

`tags`, `campaign` (CM26 Partner Drive), `form`, `page`, `submitted_at`, `sms_consent` (yes/no), `terms_agree` (yes/no), and any `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` from the visitor's first page.

Forms post as standard form-encoded data in `no-cors` mode, so the browser can't confirm GHL's response. **Test the form once after setup.** Spam: the form has a hidden honeypot field; bot submissions are dropped silently.

## Deadline behavior

- Countdowns run to `DEADLINE`.
- After the deadline, `index.html` and `join.html` redirect to `offer-ended.html` (turn off with `REDIRECT_AFTER_DEADLINE: false`). Promo banners and countdowns hide everywhere.

## Files

- `assets/config.js`: settings (the only file to edit)
- `assets/site.js`: call form, countdown, deadline, links, exit-intent pop-up
- `assets/styles.css`: all styles; brand colors are under `BRAND TOKENS` (green `#05E432` matches the logo)
- `assets/growthlock-logo.png`: logo

## Deploying

- **GitHub Pages / Vercel / Netlify:** deploy the folder as-is.
- **GHL:** host the folder (any of the above) and point a GHL/custom domain at it, or paste each page into a Custom HTML step with the `assets/` files hosted alongside.

## Rules

- The fee-deferral offer is sales-team only. It must never appear on these pages, in emails or in any written promo.
- Keep the footer disclaimer on every page.
