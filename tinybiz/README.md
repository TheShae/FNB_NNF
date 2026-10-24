# TinyBiz - Offline-First Mobile App & Backend for Informal Retail Traders

TinyBiz is an offline-first Flutter application paired with an Express/PostgreSQL backend, designed specifically for township retail traders in South Africa.

## Architecture & Features
1. **Sub-5-Second Offline Sales**: Record sales without internet access.
2. **Local-First Sync Engine**: Local Drift/SQLite writes with idempotent background batch sync.
3. **QR & Payment Verification**: Customer QR scanning and simulated FNB payment verification.
4. **Stock Prediction**: 7-day stock-out estimation without machine learning.
5. **Trader Readiness Score**: 0–100 score based on sales volume, active days, profit trend, and verified sales share.
6. **Simulated FNB Restock Credit**: R800 credit offer with automatic 15% daily sales deduction for repayments.

## Directory Structure
- `apps/mobile`: Flutter mobile app (Drift, Riverpod, GoRouter).
- `backend`: Express REST API, PostgreSQL database migrations (`backend/db/migrations`), and demo seed files (`backend/db/seeds`).
- `docs`: System architecture, API documentation, and hackathon demo script.
- `packages/shared`: Shared API contracts and documentation.

## Getting Started

### 1. Unified Backend Setup (Express API + PostgreSQL Migrations)
Navigate to `backend`:
```bash
cd backend
npm install
```

Apply PostgreSQL database migrations and demo seed data:
```bash
psql -U postgres -d tinybiz -f db/migrations/001_create_merchants.sql
psql -U postgres -d tinybiz -f db/migrations/002_create_products.sql
psql -U postgres -d tinybiz -f db/migrations/003_create_events.sql
psql -U postgres -d tinybiz -f db/migrations/004_create_offers.sql
psql -U postgres -d tinybiz -f db/migrations/005_create_repayments.sql
psql -U postgres -d tinybiz -f db/migrations/006_create_sync_logs.sql
psql -U postgres -d tinybiz -f db/seeds/demo_seed.sql
```

Start the Express API server:
```bash
npm run dev
```

### 2. Flutter Mobile App
```bash
cd apps/mobile
flutter pub get
dart run build_runner build --delete-conflicting-outputs
flutter run
```
