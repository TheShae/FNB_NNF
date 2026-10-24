const request = require('supertest');
const app = require('../src/app');
const { v4: uuidv4 } = require('uuid');

describe('POST /api/v1/sync', () => {
  it('accepts valid batch events', async () => {
    const eventId = uuidv4();
    const merchantId = uuidv4();
    const productId = uuidv4();

    const payload = {
      merchantId,
      deviceId: 'device-test-1',
      events: [
        {
          id: eventId,
          type: 'SALE',
          productId,
          quantity: 2,
          unitPrice: 18.0,
          unitCost: 12.0,
          amount: 36.0,
          verificationTier: 'SELF',
          verificationWeight: 1,
          occurredAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          metadata: {},
        },
      ],
    };

    const res = await request(app).post('/api/v1/sync').send(payload);
    expect(res.status).toBe(200);
    expect(res.body.acceptedEventIds).toContain(eventId);
    expect(res.body.rejectedEvents).toHaveLength(0);
    expect(res.body.serverTime).toBeDefined();
  });

  it('rejects invalid payload format', async () => {
    const res = await request(app).post('/api/v1/sync').send({ merchantId: 'invalid' });
    expect(res.status).toBe(400);
  });
});
