# Hyperlocal Price Comparison + Service Connection Tool (UK)

Lean MVP to validate demand and convert requests into paid jobs **without paid APIs, custom apps, or complex automation**.

## What this repo now contains

- A zero-cost operating model for UK hyperlocal service matching.
- A static request form page that can be connected to Google Forms.
- A lightweight matching script for semi-automated recommendations.
- Google Sheets-ready templates for provider and request management.
- WhatsApp message templates and daily operations playbook.

## MVP stack (free tools only)

- **Demand capture:** Google Form (or the included static form UI mirroring those fields)
- **Data store & operations:** Google Sheets
- **Communication:** WhatsApp Business
- **Matching support:** Manual operator decision + optional Node script in this repo

---

## 1) Fast setup (under 2 hours)

### Step A — Create Google Form
Use fields from `ops/google-form-fields.md`.

Set destination to Google Sheets.

### Step B — Create Google Sheet tabs
Copy structures from:

- `ops/templates/providers.csv`
- `ops/templates/requests.csv`
- `ops/templates/jobs.csv`

### Step C — Populate first provider pool
Start with one city + one service (recommended: London plumbing). Add 20–50 providers.

### Step D — Set up WhatsApp Business templates
Copy templates from `ops/whatsapp-templates.md`.

### Step E — Start handling leads manually
Use `ops/daily-ops-playbook.md` end-to-end.

---

## 2) Decision-engine behavior (not a directory)

For each request:

1. Filter to providers by service + postcode coverage.
2. Remove providers above budget (if budget provided).
3. Rank by:
   - availability fit with urgency,
   - expected price,
   - trust rating.
4. Send user **one recommended provider** + **one backup option**.

This keeps user effort near zero and focuses on transaction conversion.

---

## 3) Semi-automated local matching helper

A local script is included for operator support:

```bash
cd backend
npm run match -- ../ops/data/sample-request.json ../ops/data/sample-providers.json
```

It outputs best + backup recommendation using weighted scoring.

> Note: this helper is optional. The core MVP works fully with Google Form + Sheet + WhatsApp.

---

## 4) Monetisation model

1. **Lead commission (primary):** £5–£40/job depending on service type.
2. **Featured placement (phase 2):** monthly fee for priority routing.
3. **Margin model (advanced):** quote spread between provider cost and user price.

Track all confirmed jobs in `jobs` tab to measure realised revenue.

---

## 5) Success metrics to track weekly

- Daily inbound requests
- Request → booked job conversion rate
- Average revenue per confirmed job
- Repeat usage rate
- Time-to-first-provider-recommendation

---

## 6) Growth sequence

- **Phase 1:** one city + one service
- **Phase 2:** add 2–3 adjacent services
- **Phase 3:** increase matching automation
- **Phase 4:** evaluate full marketplace build

Keep focus on real booked jobs and unit economics before scaling product complexity.

## Repository structure

- `frontend/` static form prototype (Google Form-compatible fields)
- `backend/` lightweight matching engine helper
- `ops/` operating instructions, templates, scripts, and sample data

## GitHub Pages deployment

To make this show as a website on GitHub Pages, keep `index.html` at repo root and configure:

1. GitHub → **Settings** → **Pages**
2. Source: **Deploy from branch**
3. Branch: your main branch, folder: **/(root)**

After saving, GitHub Pages serves the static landing form from `index.html`.


## End-to-end automation after form submission

The flow is now automated once a request is submitted from `index.html`:

1. Form submits to `POST /api/submit-request`.
2. Backend auto-matches providers from `backend/data/providers.json`.
3. Request and job are logged to:
   - `backend/data/requests-log.json`
   - `backend/data/jobs-log.json`
4. API returns:
   - best provider + backup,
   - WhatsApp-ready links for user and provider messages.

### Run locally

```bash
cd backend && npm install && npm start
# in another terminal from repo root:
python -m http.server 8080
```

Then open `http://localhost:8080`.

If backend is hosted elsewhere, set in browser console:

```js
localStorage.setItem('API_BASE', 'https://your-backend-url')
```


## Resolving GitHub PR conflicts quickly

If GitHub reports conflicts in:

- `README.md`
- `backend/index.js`
- `backend/package.json`
- `index.html`

run this from the repo root during an active merge/rebase:

```bash
bash scripts/resolve_pr_conflicts.sh
```

This script keeps the hyperlocal MVP implementation from this branch for those files and stages them.
