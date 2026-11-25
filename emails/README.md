# CM26 email templates for GHL

20 paste-ready HTML emails for the Cyber Monday workflows. Open `index.html` in a browser to review them all.

## Adding one to a GHL workflow

1. In the workflow, add a **Send Email** action and switch the editor to **Code / HTML**.
2. Open the matching file (e.g. `L3.html`), copy everything, and paste it in.
3. Set the **Subject** and **Preview text** from the table below (both are also in a comment at the top of each file).
4. Keep GHL's footer on. It adds the unsubscribe link and mailing address.

## Before sending

- **Images** load from `https://bf.growthlock.com/assets/growthlock-logo.png`, so the site must be live first.
- **Custom values:** create these in GHL (Settings → Custom Values):
  - `partner_portal_url`: used in S1, P1, P1Y, D75, D165
  - `onboarding_url`: used in P1, P1Y
- **Merge fields used:** `{{contact.first_name}}`, `{{appointment.start_time}}` (C1).
- **Links** point to `https://bf.growthlock.com/...` with UTM tags (`utm_source=ghl&utm_medium=email&utm_campaign=cm26&utm_content=<email code>`), so the site's forms pass the source into GHL.

## Emails

| Code | Workflow | When | Subject | Preview text | Main link |
| --- | --- | --- | --- | --- | --- |
| L1 | Launch | Wed Nov 25, 10 AM | You're in early, {{contact.first_name}} | Top-tier partner rates, before anyone else. | Landing page offers + profit-lifter.html |
| L2 | Launch | Fri Nov 27, 10 AM | Monday, partner rates go to the top | Mark your calendar for Cyber Monday. | Landing page offers |
| L3 | Launch | Mon Nov 30, 8 AM | It's live: start at 50% from day one | Two Premier plans plus 15% off ads. Ends Dec 7. | Landing page offers |
| L4 | Launch | Wed Dec 2, 10 AM | Who in your network needs funding? | The easiest referral you'll make this year. | Landing page offers |
| L5 | Launch | Fri Dec 4, 10 AM | The 50% tier, without the climb | Premier Partners start at the top through Dec 7. | Landing page offers |
| L6 | Launch | Sun Dec 6, 6 PM | 24 hours left at the top tier | Cyber Monday partner rates end tomorrow night. | Landing page offers |
| L7 | Launch | Mon Dec 7, 9 AM | Last call: offers end tonight | Midnight CT. After that, standard tiers. | Landing page offers |
| S1 | Starter upgrade | Immediately | You're in. Here's your partner link | Your Starter rate is locked for 90 days. | Partner portal |
| S2 | Starter upgrade | +1 day | Here's what 50% looks like | Same deals, a much bigger commission. | Landing page offers |
| S3 | Starter upgrade | +3 days | Want to talk it through? | 15 minutes with a partner consultant. | book-call.html |
| S4 | Starter upgrade | Mon Dec 7, 12 PM | Last chance to upgrade at 50% | The Premier offer closes at midnight. | Landing page offers |
| P1 | Premier onboarding (Monthly) | Immediately | Welcome, Premier Partner | Your 50% rate is locked for 3 months. | Onboarding calendar |
| P1Y | Premier onboarding (Yearly) | Immediately | Welcome, Premier Partner | Your 50% rate is locked for 6 months. | Onboarding calendar |
| P2 | Premier onboarding | +2 days | Your 15% ad campaign perk | More leads for your own business, 15% off. | ad-perk.html |
| C1 | Call booked | Immediately | Your partner call is booked | Here's what to have ready. | Landing page offers |
| D75 | Rate reminders (Starter + Premier Monthly) | Day 75 from sign-up | 15 days left at your top rate | Get your deals in before your window ends. | Partner portal |
| D90 | Rate reminders (Starter + Premier Monthly) | Day 90 from sign-up (Monthly: 3-month mark) | Your top-rate window is up: here's your tier | Your rate now follows your deal volume. | book-call.html |
| D165 | Rate reminders (Premier Yearly) | Day 165 from sign-up | 15 days left at your 50% rate | Get your deals in before your 6 months are up. | Partner portal |
| D180 | Rate reminders (Premier Yearly) | Day 180 from sign-up (6-month mark) | Your 50% window is up: here's your tier | Your rate now follows your deal volume. | book-call.html |
| M1 | Missed deadline | Tue Dec 8, 10 AM | The Cyber Monday rates closed, but the door's open | You can still join free today. | growthlock.com/partner |

**What changed in v2:** Premier now has Monthly (30 days free, then $499/mo, 50% for 3 months) and Yearly ($3,995, 50% for 6 months). Sign-up and enroll buttons live on the landing page (`bf.growthlock.com/#offers`), which sends people to `https://partner.growthlock.com/auth/sign-up`. Abandoned-checkout emails (A1, A2) and their SMS are retired because the checkout forms no longer exist. P1Y, D165 and D180 are new for the Yearly plan.

## GHL workflow triggers

Enrollment happens on the partner portal, which creates the contact and a tag in GHL. Trigger each workflow from the tag it adds:

| Workflow | Trigger | Emails | Exit when |
| --- | --- | --- | --- |
| Starter upgrade | Tag: Starter sign-up | S1 to S4 | Premier tag added |
| Premier onboarding (Monthly) | Tag: Premier Monthly | P1, P2, then D75, D90 | n/a |
| Premier onboarding (Yearly) | Tag: Premier Yearly | P1Y, P2, then D165, D180 | n/a |
| Launch | Segment `SEG-ProfitLifter` (or your launch list) | L1 to L7 | Any Premier tag added |
| Rate reminders (Starter) | Starter sign-up + 75 / 90 day waits | D75, D90 | n/a |

Add a stop condition on L2 to L7 and S2 to S4 for contacts who already hold a Premier tag.

**Starter rates:** the public Starter offer is 30%; Profit Lifter clients get 35% through `profit-lifter.html` (L1 links there). S1 and S2 are rate-neutral because both groups land in the Starter upgrade workflow.

## SMS (paste as text)

- **L7s** (Mon Dec 7, 6 PM): GrowthLock: Cyber Monday partner offers end at midnight. Start at 50% as a Premier Partner: https://bf.growthlock.com/?utm_source=ghl&utm_medium=sms&utm_campaign=cm26&utm_content=L7s#offers Reply STOP to opt out
- **C2** (1 hour before the call): GrowthLock: your partner call starts at {{appointment.start_time}}. Talk soon! Reply STOP to opt out

Send SMS only to contacts with SMS consent. The consultant call form (`book-call.html`) still sends `sms_consent`; contacts who sign up on the partner portal need their own SMS consent captured there.

## Rule

The fee-deferral offer is sales-team only. It never goes in an email or SMS.
