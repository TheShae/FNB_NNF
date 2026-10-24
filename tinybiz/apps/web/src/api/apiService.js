const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api/v1';
const DEFAULT_MERCHANT_ID = '11111111-1111-1111-1111-111111111111';

export const apiService = {
  async getProducts() {
    try {
      const res = await fetch(`${API_BASE_URL}/products?merchantId=${DEFAULT_MERCHANT_ID}`);
      if (!res.ok) throw new Error('API failed');
      return await res.json();
    } catch (e) {
      return [
        { id: 'a1111111-1111-1111-1111-111111111111', name: 'White Bread 700g', emoji: '🍞', unit: 'loaf', cost_price: 12.00, sell_price: 18.00, current_stock: 3, low_stock_threshold: 5 },
        { id: 'a2222222-2222-2222-2222-222222222222', name: 'Full Cream Milk 2L', emoji: '🥛', unit: 'bottle', cost_price: 22.00, sell_price: 32.00, current_stock: 12, low_stock_threshold: 5 },
        { id: 'a3333333-3333-3333-3333-333333333333', name: 'Coke 1.25L', emoji: '🥤', unit: 'bottle', cost_price: 14.00, sell_price: 20.00, current_stock: 18, low_stock_threshold: 6 },
        { id: 'a4444444-4444-4444-4444-444444444444', name: 'Maize Meal 2.5kg', emoji: '🌽', unit: 'bag', cost_price: 28.00, sell_price: 42.00, current_stock: 10, low_stock_threshold: 4 },
        { id: 'a5555555-5555-5555-5555-555555555555', name: 'Eggs 10s', emoji: '🥚', unit: 'pack', cost_price: 25.00, sell_price: 36.00, current_stock: 8, low_stock_threshold: 3 },
      ];
    }
  },

  async getEvents() {
    try {
      const res = await fetch(`${API_BASE_URL}/events?merchantId=${DEFAULT_MERCHANT_ID}`);
      if (!res.ok) throw new Error('API failed');
      return await res.json();
    } catch (e) {
      return [
        { id: 'e1', type: 'SALE', amount: 54.00, verification_tier: 'FNB_PAYMENT', verification_weight: 3, occurred_at: new Date().toISOString() },
        { id: 'e2', type: 'SALE', amount: 64.00, verification_tier: 'CUSTOMER_QR', verification_weight: 2, occurred_at: new Date(Date.now() - 3600000).toISOString() },
        { id: 'e3', type: 'RESTOCK', amount: 120.00, verification_tier: 'SELF', verification_weight: 1, occurred_at: new Date(Date.now() - 7200000).toISOString() },
        { id: 'e4', type: 'EXPENSE', amount: 45.00, verification_tier: 'SELF', verification_weight: 1, occurred_at: new Date(Date.now() - 10800000).toISOString() },
      ];
    }
  },

  async getOfferEligibility() {
    try {
      const res = await fetch(`${API_BASE_URL}/offers/eligibility?merchantId=${DEFAULT_MERCHANT_ID}`);
      if (!res.ok) throw new Error('API failed');
      return await res.json();
    } catch (e) {
      return { eligible: true, amount: 800.00, repaymentPercent: 0.15, readinessScore: 76 };
    }
  },

  async getActiveOffer() {
    try {
      const res = await fetch(`${API_BASE_URL}/offers/active?merchantId=${DEFAULT_MERCHANT_ID}`);
      if (!res.ok) throw new Error('API failed');
      return await res.json();
    } catch (e) {
      return { id: 'o1111111-1111-1111-1111-111111111111', amount: 800.00, status: 'OFFERED', outstanding_amount: 800.00, repayment_percent: 0.15 };
    }
  },

  async acceptOffer(offerId) {
    try {
      const res = await fetch(`${API_BASE_URL}/offers/${offerId}/accept`, { method: 'POST' });
      return await res.json();
    } catch (e) {
      return { id: offerId, status: 'ACCEPTED' };
    }
  },

  async updateProductStock(id, newStock) {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentStock: newStock }),
      });
      return await res.json();
    } catch (e) {
      return { id, currentStock: newStock };
    }
  }
};
