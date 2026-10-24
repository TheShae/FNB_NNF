CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL,
  status TEXT NOT NULL
    CHECK (status IN ('OFFERED','ACCEPTED','ACTIVE','REPAID','DECLINED')),
  repayment_percent NUMERIC(5,4) NOT NULL,
  outstanding_amount NUMERIC(12,2) NOT NULL,
  accepted_at TIMESTAMPTZ NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  average_weekly_verified_sales NUMERIC(12,2) NOT NULL,
  readiness_score INTEGER NOT NULL,
  credit_fraction NUMERIC(5,4) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
