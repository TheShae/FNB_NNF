# Shared API Contracts

## Data Entities & Enums

### Event Types
- `SALE`
- `RESTOCK`
- `EXPENSE`
- `STOCK_ADJUSTMENT`
- `LOAN_OFFER_ACCEPTED`
- `LOAN_REPAYMENT`

### Verification Tiers
- `SELF`: Weight = 1
- `CUSTOMER_QR`: Weight = 2
- `FNB_PAYMENT`: Weight = 3

### Offer Status
- `OFFERED`
- `ACCEPTED`
- `ACTIVE`
- `REPAID`
- `DECLINED`

### Sync Status
- `PENDING`
- `SYNCED`
- `FAILED`
