# CM26 email templates for GHL

19 paste-ready HTML emails for the Cyber Monday workflows. Open `index.html` in a browser to review them all.

## Adding one to a GHL workflow

1. In the workflow, add a **Send Email** action and switch the editor to **Code / HTML**.
2. Open the matching file (e.g. `L3.html`), copy everything, and paste it in.
3. Set the **Subject** and **Preview text** from the table below (both are also in a comment at the top of each file).
4. Keep GHL's footer on. It adds the unsubscribe link and mailing address.

## Before sending

- **Images** load from `https://bf.growthlock.com/assets/growthlock-logo.png`, so the site must be live first.
- **Custom values:** create these in GHL (Settings → Custom Values):
  - `partner_portal_url`: used in S1, P1, D75
  - `onboarding_url`: used in P1
- **Merge fields used:** `{{contact.first_name}}`, `{{appointment.start_time}}` (C1).
- **Links** point to `https://bf.growthlock.com/...` with UTM tags (`utm_source=ghl&utm_medium=email&utm_campaign=cm26&utm_content=<email code>`), so the site's forms pass the source into GHL.

## Emails

| Code | Workflow | When | Subject | Preview text | Main link |
| --- | --- | --- | --- | --- | --- |
| L1 | Launch (`SEG-ProfitLifter`) | Wed Nov 25, 10 AM | You're in early, {{contact.first_name}} | Top-tier partner rates, before anyone else. | Landing page offers |
| L2 | Launch | Fri Nov 27, 10 AM | Monday, partner rates go to the top | Mark your calendar for Cyber Monday. | Landing page offers |
| L3 | Launch | Mon Nov 30, 8 AM | It's live: top-tier commissions for 90 days | Three Cyber Monday offers for partners. Ends Dec 7. | Landing page offers |
| L4 | Launch | Wed Dec 2, 10 AM | Who in your network needs funding? | The easiest referral you'll make this year. | join.html |
| L5 | Launch | Fri Dec 4, 10 AM | The 50% tier, without the climb | Premier Partners start at the top through Dec 7. | premier.html |
| L6 | Launch | Sun Dec 6, 6 PM | 24 hours left at the top tier | Cyber Monday partner rates end tomorrow night. | Landing page offers |
| L7 | Launch | Mon Dec 7, 9 AM | Last call: offers end tonight | Midnight CT. After that, standard tiers. | Landing page offers |
| S1 | Starter upgrade | Immediately | You're in. Here's your partner link | Your 35% rate is locked for 90 days. | Partner portal |
| S2 | Starter upgrade | +1 day | Here's what 50% looks like | Same deals, 15 more points of commission. | Landing page offers |
| S3 | Starter upgrade | +3 days | Want to talk it through? | 15 minutes with a partner consultant. | book-call.html |
| S4 | Starter upgrade | Mon Dec 7, 12 PM | Last chance to upgrade at 50% | The Premier offer closes at midnight. | Landing page offers |
| P1 | Premier onboarding | Immediately | Welcome, Premier Partner | Your 50% rate is locked for 90 days. | Onboarding calendar |
| P2 | Premier onboarding | +2 days | Your 15% ad campaign perk | More leads for your own business, 15% off. | ad-campaign.html |
| A1 | Abandoned checkout | +1 hour | Your Premier spot is still open | Finish your sign-up and lock in 50%. | premier.html |
| A2 | Abandoned checkout | +24 hours | Questions? Talk to a partner consultant | We'll help you decide in 15 minutes. | book-call.html |
| C1 | Call booked | Immediately | Your partner call is booked | Here's what to have ready. | Landing page offers |
| D75 | Rate reminders | Day 75 | 15 days left at your top tier | Get your deals in before day 90. | Partner portal |
| D90 | Rate reminders | Day 90 | Your 90 days are up: here's your tier | Your rate now follows your deal volume. | book-call.html |
| M1 | Missed deadline | Tue Dec 8, 10 AM | The Cyber Monday rates closed, but the door's open | You can still join free today. | growthlock.com/partner |

Starter upgrade emails (S2, S4) send people back through the landing page, not straight to checkout.

## SMS (paste as text)

- **L7s** (Mon Dec 7, 6 PM): GrowthLock: Cyber Monday partner rates end at midnight. Lock in 35%–50% for 90 days: https://bf.growthlock.com/?utm_source=ghl&utm_medium=sms&utm_campaign=cm26&utm_content=L7s#offers Reply STOP to opt out
- **A1s** (+1 hour): GrowthLock: your Premier Partner sign-up isn't finished. 50% for 90 days is still open until Dec 7: https://bf.growthlock.com/premier.html?utm_source=ghl&utm_medium=sms&utm_campaign=cm26&utm_content=A1s Reply STOP to opt out
- **C2** (1 hour before the call): GrowthLock: your partner call starts at {{appointment.start_time}}. Talk soon! Reply STOP to opt out

Send SMS only to contacts with SMS consent (`sms_consent` = yes from the site forms).

## Rule

The fee-deferral offer is sales-team only. It never goes in an email or SMS.
