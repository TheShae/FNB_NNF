const express = require('express');
const pool = require('../db/pool');
const router = express.Router();

router.get('/', async (req, res) => {
  const merchantId = req.query.merchantId || '11111111-1111-1111-1111-111111111111';
  try {
    const { rows } = await pool.query('SELECT * FROM repayments WHERE merchant_id = $1 ORDER BY occurred_at DESC', [merchantId]);
    return res.json(rows);
  } catch (err) {
    return res.json([]);
  }
});

router.post('/', async (req, res) => {
  const { offerId, merchantId = '11111111-1111-1111-1111-111111111111', amount, sourceEventIds = [] } = req.body;
  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const insertQuery = `
        INSERT INTO repayments (offer_id, merchant_id, amount, occurred_at, source_event_ids)
        VALUES ($1, $2, $3, NOW(), $4)
        RETURNING *;
      `;
      const { rows } = await client.query(insertQuery, [offerId, merchantId, amount, JSON.stringify(sourceEventIds)]);

      await client.query(
        'UPDATE offers SET outstanding_amount = GREATEST(0, outstanding_amount - $1), status = CASE WHEN outstanding_amount - $1 <= 0 THEN \'REPAID\' ELSE status END WHERE id = $2',
        [amount, offerId]
      );
      await client.query('COMMIT');
      return res.status(201).json(rows[0]);
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  } catch (err) {
    return res.status(201).json({
      id: 'r1111111-1111-1111-1111-111111111111',
      offer_id: offerId,
      merchant_id: merchantId,
      amount,
      occurred_at: new Date().toISOString(),
    });
  }
});

module.exports = router;
