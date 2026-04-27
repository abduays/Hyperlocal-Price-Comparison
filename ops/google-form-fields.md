# Google Form field blueprint (UK hyperlocal MVP)

Create a Google Form titled: **Find the Best Local Service (UK)**.

## Fields

1. Service category (required, dropdown)
   - Plumbing
   - Electrical
   - Cleaning
   - Tutoring
   - Appliance repair

2. Postcode (required, short answer)
   - Validation: UK postcode pattern (or minimum 5 chars)

3. Budget min (£) (optional, number)
4. Budget max (£) (optional, number)

5. Urgency (required, multiple choice)
   - Immediate (same day)
   - Within 24 hours
   - Flexible

6. Preferred contact method (required, multiple choice)
   - WhatsApp
   - Phone

7. WhatsApp/Phone number (required, short answer)

8. Problem description (required, paragraph)

9. Consent to be contacted (required)
   - Yes

## Form settings

- Collect timestamp automatically.
- Response destination: Google Sheets.
- Confirmation message:
  "Thanks — we’re comparing trusted local providers now. You’ll get your best option shortly."
