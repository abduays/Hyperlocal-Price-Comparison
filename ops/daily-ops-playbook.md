# Daily operations playbook (speed-first)

## Objective
Turn inbound requests into confirmed jobs as fast as possible.

## Daily workflow

1. Check new requests tab every 15–30 minutes.
2. For each request, shortlist 2–3 providers by:
   - service category,
   - postcode coverage,
   - urgency fit.
3. Compare price ranges and rating.
4. Select one recommendation + one backup.
5. Send user WhatsApp recommendation template.
6. Confirm user acceptance and connect provider.
7. Update `jobs` tab with status and commission.
8. Send post-job feedback prompt after completion.

## Matching rules

- Prioritise same-day reliability for immediate jobs.
- Reject providers with repeated no-shows.
- If prices are similar, prefer higher trust rating.
- If no provider fits budget, propose nearest alternative clearly.

## Service level targets

- First response: under 10 minutes (business hours).
- Recommendation sent: under 30 minutes for immediate requests.
- Booking confirmation: same conversation where possible.
