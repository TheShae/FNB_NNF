# TinyBiz System Architecture

## Core Philosophy: Local-First & Idempotent Sync

TinyBiz operates on a **Local-First** model. All business transactions (sales, stock updates, expense tracking, credit acceptance) are saved directly to the local SQLite database using Drift before any network requests are attempted.

```
┌─────────────────────────────────────────────────────────────┐
│                    Flutter Mobile Client                    │
│                                                             │
│   ┌───────────────┐     Local Writes    ┌───────────────┐   │
│   │  UI / Screen  │ ──────────────────► │  Drift Local  │   │
│   │   Components  │ ◄────────────────── │   Database    │   │
│   └───────────────┘     Live Streams    └───────┬───────┘   │
│                                                 │           │
│                                            Pending Queue    │
│                                                 │           │
└─────────────────────────────────────────────────┼───────────┘
                                                  │ (Connectivity Detected)
                                                  ▼
                                       ┌─────────────────────┐
                                       │ POST /api/v1/sync   │
                                       └──────────┬──────────┘
                                                  │
                                                  ▼
                                       ┌─────────────────────┐
                                       │   Express Backend   │
                                       └──────────┬──────────┘
                                                  │ (Transaction + Idempotency)
                                                  ▼
                                       ┌─────────────────────┐
                                       │ PostgreSQL Database │
                                       └─────────────────────┘
```

## Readiness Score Matrix
The readiness score ($0-100$) is calculated continuously using pure Dart domain logic:
1. **Active Days Share (25%)**: Ratio of active selling days in the last 14 days ($14 \text{ days} = 100\%$).
2. **Average Daily Sales (30%)**: Scaled against a benchmark of R500/day.
3. **Profit Trend (20%)**: Comparison of second 7 days vs. first 7 days profit growth.
4. **Verified Sales Share (25%)**: Share of sales revenue verified by Customer QR (weight 2) or FNB Payment (weight 3) vs. Self-reported (weight 1).

## Automatic Credit Repayment Flow
When a trader accepts an R800 simulated FNB restock credit:
1. A `LOAN_OFFER_ACCEPTED` event is created and synced.
2. The loan status becomes `ACTIVE` with `outstanding_amount = 800.00`.
3. Subsequent `SALE` events automatically deduct $15\%$ of revenue towards a `LOAN_REPAYMENT` event.
4. When `outstanding_amount` reaches zero, the loan transitions to `REPAID`.
