# GrowthLock Cyber Monday Partner Page

A single self-contained landing page for the GrowthLock Cyber Monday partner promo (sign-ups close Dec 7, 2026, 11:59 PM CT).

## Files

- `index.html`: the whole page (HTML, CSS and JS in one file)

## Before going live

1. **Links:** open `index.html`, find the `LINKS` object near the bottom and paste in the real URLs:
   - `starter`: Starter (free) sign-up form (tags `CM26-Starter`)
   - `premier`: Premier Partner $499/mo checkout (tags `CM26-Premier`)
   - `call`: consultant calendar (tags `CM26-CallBooked`)
   - `ads`: Nov8rs.io ad campaign intake (tags `CM26-AdCampaign`)
   - `legal`, `privacy`, `terms`, `cookies`: GrowthLock's legal pages
2. **Brand colors:** swap the values under `BRAND TOKENS` at the top of the `<style>` block for GrowthLock's exact colors.
3. **Logo:** loads from growthlock.com. If it fails, the page shows a "GrowthLock" text logo instead.

## How it behaves

- Countdown timers (top bar, hero card, final section) count down to Dec 7, 2026, 11:59:59 PM CT.
- After the deadline, the countdowns hide and the top bar switches to an "offers have ended" message.

## Putting it live

- **GHL:** create a funnel step with a Custom HTML/JS element and paste the full file, or host it and point a GHL domain at it.
- **GitHub Pages / Vercel / Netlify:** deploy this folder as-is. No build step.

## Rules

- The fee-deferral offer is sales-team only. It must never appear on this page.
- Keep the footer disclaimer on the page.
