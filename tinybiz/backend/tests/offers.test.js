const request = require('supertest');
const app = require('../src/app');
const { v4: uuidv4 } = require('uuid');

describe('Offers and Repayments API', () => {
  it('checks eligibility and accepts restock offer', async () => {
    const offerId = uuidv4();
    const eligRes = await request(app).get('/api/v1/offers/eligibility');
    expect(eligRes.status).toBe(200);
    expect(eligRes.body.eligible).toBe(true);

    const acceptRes = await request(app).post(`/api/v1/offers/${offerId}/accept`);
    expect(acceptRes.status).toBe(200);
    expect(acceptRes.body.status).toBe('ACCEPTED');
  });

  it('processes repayment', async () => {
    const offerId = uuidv4();
    const repaymentRes = await request(app).post('/api/v1/repayments').send({
      offerId,
      amount: 120.0,
      sourceEventIds: [uuidv4()],
    });
    expect(repaymentRes.status).toBe(201);
    expect(repaymentRes.body.amount).toBe(120.0);
  });
});
