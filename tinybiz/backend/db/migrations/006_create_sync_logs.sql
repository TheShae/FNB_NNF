CREATE TABLE IF NOT EXISTS sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL,
  device_id TEXT NOT NULL,
  event_id UUID NOT NULL,
  status TEXT NOT NULL
    CHECK (status IN ('ACCEPTED','REJECTED','DUPLICATE')),
  error_message TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
