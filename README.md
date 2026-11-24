# GrowthLock Cyber Monday 2026: Partner Funnel

Static site for the GrowthLock Cyber Monday partner promo. Sign-ups close **Dec 7, 2026 at 11:59 PM CT**, and promo rates last 90 days from sign-up.

**Live domain:** `https://bf.growthlock.com` (each page at `/page-name.html`; every page has its canonical URL and social share tags set to this domain).

No build step: plain HTML, CSS and JavaScript. Deploy the whole folder.

**Email templates** for the GHL workflows are in [`emails/`](emails/README.md). They're for pasting into GHL, not part of the site. Leave the folder out of the deploy if you don't want it public.

## Pages

| Page | Purpose | Form → GHL tag | Next page |
| --- | --- | --- | --- |
| `index.html` | Landing page: 3 offers, countdown, FAQ | (none) | n/a |
| `join.html` | Starter (free) sign-up, 35% for 90 days | `CM26-Starter` | `thank-you-starter.html` |
| `premier.html` | Premier details, step 1 of checkout | `CM26-CheckoutStarted` | Payment page → `thank-you-premier.html` |
| `book-call.html` | Consultant call request, or live GHL calendar | `CM26-CallBooked` | `thank-you-call.html` |
| `ad-campaign.html` | 15% off Nov8rs.io ad campaign intake (partners) | `CM26-AdCampaign` | `thank-you-ad.html` |
| `thank-you-starter.html` | Next steps + Premier upsell **through the landing page** | (none) | n/a |
| `thank-you-premier.html` | Onboarding steps + ad perk | (none) | n/a |
| `thank-you-call.html` | Call confirmation | (none) | n/a |
| `thank-you-ad.html` | Intake confirmation | (none) | n/a |
| `offer-ended.html` | Shown after the deadline | (none) | n/a |

## Setup: edit `assets/config.js` only

1. **Webhooks:** in GHL, create a workflow with the **Inbound Webhook** trigger and copy its URL into `WEBHOOKS.default` (or give each form its own URL). Submit each form once so GHL can map the fields, then add actions in the workflow:
   - Create/update contact from `first_name`, `last_name`, `email`, `phone`
   - Add the tag(s) from the `tags` field
   - Add to the **CM26 Partner Drive** pipeline at the right stage
2. **Premier payment:** set `PREMIER_PAYMENT_URL` to the $499/mo GHL order form or Stripe Payment Link. Set its success redirect to `thank-you-premier.html`, and have the payment add the `CM26-Premier` tag. The visitor's `first_name`, `last_name`, `name`, `email` and `phone` are added to the URL for prefill.
   - Abandoned checkout: contacts tagged `CM26-CheckoutStarted` without `CM26-Premier` after 1 hour → add `CM26-Abandoned`.
3. **Calendar (optional):** set `CALENDAR_EMBED_URL` to the GHL booking widget URL. `book-call.html` then shows the live calendar instead of the request form.
4. **Links:** fill in `LINKS.portal`, `LINKS.onboarding` and the legal pages.

**Preview mode:** while a webhook is empty, forms skip sending and go straight to the thank-you page (the payload is logged in the browser console). Good for testing; fill in the webhooks before launch.

## What every form sends

All fields on the form, plus:

`tags`, `campaign` (CM26 Partner Drive), `form`, `page`, `submitted_at`, `sms_consent` (yes/no), `terms_agree` (yes/no), and any `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` from the visitor's first page.

Forms post as standard form-encoded data in `no-cors` mode, so the browser can't confirm GHL's response. **Test every form once after setup** and check the contact appears in GHL with the right tags.

Spam: each form has a hidden honeypot field; bot submissions are dropped silently.

## Deadline behavior

- Countdowns run to `DEADLINE`.
- After the deadline, `index.html`, `join.html`, `premier.html` and `ad-campaign.html` redirect to `offer-ended.html` (turn off with `REDIRECT_AFTER_DEADLINE: false`). Promo banners and countdowns hide everywhere.

## Files

- `assets/config.js`: settings (the only file to edit)
- `assets/site.js`: forms, countdown, deadline, links
- `assets/styles.css`: all styles; brand colors are under `BRAND TOKENS` (green `#05E432` matches the logo)
- `assets/growthlock-logo.png`: logo

## Deploying

- **GitHub Pages / Vercel / Netlify:** deploy the folder as-is.
- **GHL:** host the folder (any of the above) and point a GHL/custom domain at it, or paste each page into a Custom HTML step with the `assets/` files hosted alongside.

## Rules

- The fee-deferral offer is sales-team only. It must never appear on these pages, in emails or in any written promo.
- Keep the footer disclaimer on every page.
