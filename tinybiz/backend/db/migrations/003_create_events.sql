CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY,
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  product_id UUID NULL REFERENCES products(id) ON DELETE SET NULL,
  type TEXT NOT NULL
    CHECK (type IN ('SALE','RESTOCK','EXPENSE','STOCK_ADJUSTMENT','LOAN_OFFER_ACCEPTED','LOAN_REPAYMENT')),
  quantity INTEGER NULL,
  unit_price NUMERIC(12,2) NULL,
  unit_cost NUMERIC(12,2) NULL,
  amount NUMERIC(12,2) NULL,
  verification_tier TEXT NOT NULL
    CHECK (verification_tier IN ('SELF','CUSTOMER_QR','FNB_PAYMENT')),
  verification_weight INTEGER NOT NULL
    CHECK (verification_weight IN (1,2,3)),
  occurredAt TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  device_id TEXT NOT NULL,
  sync_status TEXT NOT NULL DEFAULT 'PENDING'
    CHECK (sync_status IN ('PENDING','SYNCED','FAILED')),
  synced_at TIMESTAMPTZ NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_events_merchant_occurred ON events(merchant_id, occurredAt);
CREATE INDEX IF NOT EXISTS idx_events_product_occurred ON events(product_id, occurredAt);
CREATE INDEX IF NOT EXISTS idx_events_sync_status ON events(sync_status);
CREATE INDEX IF NOT EXISTS idx_events_type_occurred ON events(type, occurredAt);
