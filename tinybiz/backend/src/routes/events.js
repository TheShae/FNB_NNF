const express = require('express');
const pool = require('../db/pool');
const router = express.Router();

router.get('/', async (req, res) => {
  const { merchantId = '11111111-1111-1111-1111-111111111111', since } = req.query;
  try {
    let query = 'SELECT * FROM events WHERE merchant_id = $1';
    const params = [merchantId];
    if (since) {
      query += ' AND occurred_at > $2';
      params.push(since);
    }
    query += ' ORDER BY occurred_at DESC';
    const { rows } = await pool.query(query, params);
    return res.json(rows);
  } catch (err) {
    return res.json([]);
  }
});

router.post('/:eventId/verify/customer-qr', async (req, res) => {
  const { eventId } = req.params;
  try {
    const query = `
      UPDATE events
      SET verification_tier = 'CUSTOMER_QR', verification_weight = 2
      WHERE id = $1
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [eventId]);
    return res.json(rows[0] || { id: eventId, verification_tier: 'CUSTOMER_QR', verification_weight: 2 });
  } catch (err) {
    return res.json({ id: eventId, verification_tier: 'CUSTOMER_QR', verification_weight: 2 });
  }
});

router.post('/:eventId/verify/fnb-payment', async (req, res) => {
  const { eventId } = req.params;
  try {
    const query = `
      UPDATE events
      SET verification_tier = 'FNB_PAYMENT', verification_weight = 3
      WHERE id = $1
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [eventId]);
    return res.json(rows[0] || { id: eventId, verification_tier: 'FNB_PAYMENT', verification_weight: 3 });
  } catch (err) {
    return res.json({ id: eventId, verification_tier: 'FNB_PAYMENT', verification_weight: 3 });
  }
});

module.exports = router;
