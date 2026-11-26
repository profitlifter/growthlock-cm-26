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
| `ad-perk.html` | 15% off Nov8rs.io ad campaign explainer. The landing page's Partner Perk card goes here | Buttons → `LINKS.adPerk` (`https://nov8rs.io/growthlock-bfcm`, hosted on the Nov8rs.io site) |
| `profit-lifter.html` | **Unlinked, `noindex`.** Profit Lifter page: same layout as the landing page, with 35% Free Starter plus Premier Monthly and Yearly at 50%. Profit Lifter sends traffic here (lead capture, L1 email). Never link it from the landing page, menus or any public page | Buttons → `https://partner.growthlock.com/auth/sign-up` |
| `book-call.html` | Consultant call page: shows the GHL booking calendar (`CALENDAR_EMBED_URL`) | Calendar booking happens in GHL |
| `offer-ended.html` | Shown after the deadline | n/a |

Retired in v2: `premier.html`, `ad-campaign.html`, `thank-you-starter.html`, `thank-you-premier.html`, `thank-you-ad.html`, `thank-you-call.html`. Enrollment, payment and the contact/tag creation now happen on the partner portal.

## Setup: edit `assets/config.js` only

1. **Sign-up links:** `LINKS.signup` is used by every enroll button. `LINKS.adPerk` is where the Partner Perk page's buttons go (the page on nov8rs.io).
2. **Calendar:** `CALENDAR_EMBED_URL` is the GHL booking widget (`api.growthlock.com/widget/booking/...`). `book-call.html` shows it and loads GHL's `form_embed.js` to auto-size it. If the URL is emptied, the page shows a short notice with a sign-up button.
3. **Exit pop-up:** `EXIT_POPUP_ENABLED: true` shows it once per visit on `index.html`, only when the cursor leaves the browser window through the top edge. No timer, and it never shows on phones. It is skipped if the visitor already clicked a sign-up button. Set to `false` to turn it off.

## Deadline behavior

- Countdowns run to `DEADLINE`.
- After the deadline, `index.html`, `join.html`, `ad-perk.html` and `profit-lifter.html` redirect to `offer-ended.html` (turn off with `REDIRECT_AFTER_DEADLINE: false`). Promo banners and countdowns hide everywhere.

## Files

- `assets/config.js`: settings (the only file to edit)
- `assets/site.js`: countdown, deadline, links, calendar embed, exit-intent pop-up
- `assets/styles.css`: all styles; brand colors are under `BRAND TOKENS` (green `#05E432` matches the logo)
- `assets/growthlock-logo.png`: logo

## Deploying

- **GitHub Pages / Vercel / Netlify:** deploy the folder as-is.
- **GHL:** host the folder (any of the above) and point a GHL/custom domain at it, or paste each page into a Custom HTML step with the `assets/` files hosted alongside.

## Rules

- The fee-deferral offer is sales-team only. It must never appear on these pages, in emails or in any written promo.
- Keep the footer disclaimer on every page.

## Analytics

Google Tag Manager container `GTM-NJK5N3V2` is installed on every page (head snippet plus the noscript tag after `<body>`). Add GA4 and any other tags inside GTM.
