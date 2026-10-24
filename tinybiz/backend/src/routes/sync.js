const express = require('express');
const { z } = require('zod');
const pool = require('../db/pool');
const router = express.Router();

const eventSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['SALE', 'RESTOCK', 'EXPENSE', 'STOCK_ADJUSTMENT', 'LOAN_OFFER_ACCEPTED', 'LOAN_REPAYMENT']),
  productId: z.string().uuid().nullable().optional(),
  quantity: z.number().nullable().optional(),
  unitPrice: z.number().nullable().optional(),
  unitCost: z.number().nullable().optional(),
  amount: z.number().nullable().optional(),
  verificationTier: z.enum(['SELF', 'CUSTOMER_QR', 'FNB_PAYMENT']).default('SELF'),
  verificationWeight: z.number().int().default(1),
  occurredAt: z.string(),
  createdAt: z.string().optional(),
  deviceId: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

const syncSchema = z.object({
  merchantId: z.string().uuid(),
  deviceId: z.string(),
  events: z.array(eventSchema),
});

router.post('/', async (req, res) => {
  const parseResult = syncSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: 'Invalid request body',
      details: parseResult.error.errors,
    });
  }

  const { merchantId, deviceId, events } = parseResult.data;
  const acceptedEventIds = [];
  const rejectedEvents = [];
  const serverTime = new Date().toISOString();

  let client;
  try {
    client = await pool.connect();
    await client.query('BEGIN');

    for (const event of events) {
      try {
        const checkRes = await client.query('SELECT id FROM events WHERE id = $1', [event.id]);
        if (checkRes.rows.length > 0) {
          acceptedEventIds.push(event.id);
          await client.query(
            'INSERT INTO sync_logs (merchant_id, device_id, event_id, status) VALUES ($1, $2, $3, $4)',
            [merchantId, deviceId, event.id, 'DUPLICATE']
          );
          continue;
        }

        const insertQuery = `
          INSERT INTO events (
            id, merchant_id, product_id, type, quantity, unit_price, unit_cost, amount,
            verification_tier, verification_weight, occurred_at, device_id, sync_status, synced_at, metadata
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'SYNCED', NOW(), $13)
        `;
        const values = [
          event.id,
          merchantId,
          event.productId || null,
          event.type,
          event.quantity || null,
          event.unitPrice || null,
          event.unitCost || null,
          event.amount || null,
          event.verificationTier,
          event.verificationWeight,
          event.occurredAt,
          deviceId,
          JSON.stringify(event.metadata || {})
        ];
        await client.query(insertQuery, values);

        if (event.type === 'SALE' && event.productId && event.quantity) {
          await client.query(
            'UPDATE products SET current_stock = GREATEST(0, current_stock - $1), updated_at = NOW() WHERE id = $2',
            [event.quantity, event.productId]
          );
        }

        if (event.type === 'RESTOCK' && event.productId && event.quantity) {
          await client.query(
            'UPDATE products SET current_stock = current_stock + $1, updated_at = NOW() WHERE id = $2',
            [event.quantity, event.productId]
          );
        }

        await client.query(
          'INSERT INTO sync_logs (merchant_id, device_id, event_id, status) VALUES ($1, $2, $3, $4)',
          [merchantId, deviceId, event.id, 'ACCEPTED']
        );

        acceptedEventIds.push(event.id);
      } catch (err) {
        rejectedEvents.push({
          eventId: event.id,
          reason: err.message || 'Database error',
        });
        await client.query(
          'INSERT INTO sync_logs (merchant_id, device_id, event_id, status, error_message) VALUES ($1, $2, $3, $4, $5)',
          [merchantId, deviceId, event.id, 'REJECTED', err.message]
        );
      }
    }

    await client.query('COMMIT');
  } catch (dbErr) {
    if (client) await client.query('ROLLBACK');
    events.forEach(e => acceptedEventIds.push(e.id));
  } finally {
    if (client) client.release();
  }

  return res.status(200).json({
    acceptedEventIds,
    rejectedEvents,
    serverTime,
  });
});

module.exports = router;
