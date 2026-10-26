// Local Persistence & Backup/Restore Repository for TinyBiz Web Application

const STORAGE_KEYS = {
  PRODUCTS: 'tinybiz_products',
  BATCHES: 'tinybiz_batches',
  SALES: 'tinybiz_sales',
  CUSTOMERS: 'tinybiz_customers',
  EXPENSES: 'tinybiz_expenses',
  NOTIFICATIONS: 'tinybiz_notifications',
  FOOD_SAFETY: 'tinybiz_food_safety',
  CREDIT_OFFER: 'tinybiz_credit_offer',
  REPAYMENTS: 'tinybiz_repayments',
  USER_SESSION: 'tinybiz_user_session',
  BUSINESS_SETUP: 'tinybiz_business_setup',
  APP_PIN: 'tinybiz_app_pin',
};

const DEFAULT_PRODUCTS = [
  { id: 'p1', name: 'White Bread 700g', emoji: '🍞', category: 'Bakery', barcode: '6001234567890', unit: 'loaf', costPrice: 12.00, sellPrice: 18.00, currentStock: 3, lowStockThreshold: 5, active: true },
  { id: 'p2', name: 'Full Cream Milk 2L', emoji: '🥛', category: 'Dairy', barcode: '6001234567891', unit: 'bottle', costPrice: 22.00, sellPrice: 32.00, currentStock: 12, lowStockThreshold: 5, active: true },
  { id: 'p3', name: 'Coke 1.25L', emoji: '🥤', category: 'Beverages', barcode: '6001234567892', unit: 'bottle', costPrice: 14.00, sellPrice: 20.00, currentStock: 18, lowStockThreshold: 6, active: true },
  { id: 'p4', name: 'Maize Meal 2.5kg', emoji: '🌽', category: 'Staples', barcode: '6001234567893', unit: 'bag', costPrice: 28.00, sellPrice: 42.00, currentStock: 10, lowStockThreshold: 4, active: true },
  { id: 'p5', name: 'Eggs 10s', emoji: '🥚', category: 'Dairy', barcode: '6001234567894', unit: 'pack', costPrice: 25.00, sellPrice: 36.00, currentStock: 8, lowStockThreshold: 5, active: true },
  { id: 'p6', name: 'Potato Chips 125g', emoji: '🥔', category: 'Snacks', barcode: '6001234567895', unit: 'packet', costPrice: 10.00, sellPrice: 16.00, currentStock: 25, lowStockThreshold: 8, active: true },
];

const now = new Date();
const DEFAULT_BATCHES = [
  { id: 'b1', productId: 'p1', batchNumber: 'BAT-2026-001', quantity: 3, expiryDate: new Date(now.getTime() + 1 * 86400000).toISOString(), receivedDate: new Date(now.getTime() - 2 * 86400000).toISOString(), quarantined: false },
  { id: 'b2', productId: 'p1', batchNumber: 'BAT-2026-002', quantity: 5, expiryDate: new Date(now.getTime() + 5 * 86400000).toISOString(), receivedDate: new Date(now.getTime() - 1 * 86400000).toISOString(), quarantined: false },
  { id: 'b3', productId: 'p2', batchNumber: 'BAT-2026-003', quantity: 12, expiryDate: new Date(now.getTime() + 7 * 86400000).toISOString(), receivedDate: new Date(now.getTime() - 1 * 86400000).toISOString(), quarantined: false },
  { id: 'b4', productId: 'p5', batchNumber: 'BAT-2026-004', quantity: 4, expiryDate: new Date(now.getTime() - 1 * 86400000).toISOString(), receivedDate: new Date(now.getTime() - 10 * 86400000).toISOString(), quarantined: true, quarantineReason: 'Past best-before date' },
];

const DEFAULT_SALES = [
  { id: 's1', reference: 'TXN-9081', timestamp: new Date(now.getTime() - 2 * 3600000).toISOString(), items: [{ productId: 'p1', quantity: 2, unitPrice: 18.00 }, { productId: 'p2', quantity: 1, unitPrice: 32.00 }], total: 68.00, paymentMethod: 'Cash', verificationTier: 'FNB_PAYMENT', verificationWeight: 3, syncStatus: 'SYNCED' },
  { id: 's2', reference: 'TXN-9082', timestamp: new Date(now.getTime() - 5 * 3600000).toISOString(), items: [{ productId: 'p3', quantity: 3, unitPrice: 20.00 }], total: 60.00, paymentMethod: 'Customer QR', verificationTier: 'CUSTOMER_QR', verificationWeight: 2, syncStatus: 'SYNCED' },
  { id: 's3', reference: 'TXN-9083', timestamp: new Date(now.getTime() - 24 * 3600000).toISOString(), items: [{ productId: 'p4', quantity: 1, unitPrice: 42.00 }], total: 42.00, paymentMethod: 'Cash', verificationTier: 'SELF', verificationWeight: 1, syncStatus: 'SYNCED' },
];

const DEFAULT_CUSTOMERS = [
  { id: 'c1', name: 'Thabo Mbeki', phone: '+27 82 111 2233', totalPurchases: 450.00, debtBalance: 120.00, debtHistory: [{ id: 'dh1', date: new Date(now.getTime() - 3 * 86400000).toISOString(), amount: 120.00, description: 'Groceries credit' }] },
  { id: 'c2', name: 'Nomvula Mokonyane', phone: '+27 83 444 5566', totalPurchases: 890.00, debtBalance: 0.00, debtHistory: [] },
];

const DEFAULT_EXPENSES = [
  { id: 'e1', description: 'Stock Transport from Wholesale', amount: 85.00, category: 'Stock purchase', date: new Date(now.getTime() - 1 * 86400000).toISOString() },
  { id: 'e2', description: 'Shop Electricity Pre-paid', amount: 150.00, category: 'Utilities', date: new Date(now.getTime() - 3 * 86400000).toISOString() },
];

const DEFAULT_NOTIFICATIONS = [
  { id: 'n1', title: 'Stock alerts', message: 'White Bread 700g gone by Thursday (3 left)', type: 'warning', read: false, link: '/inventory' },
  { id: 'n2', title: 'Batch Expired', message: 'Batch BAT-2026-004 expired yesterday and was quarantined', type: 'danger', read: false, link: '/inventory/expiry' },
  { id: 'n3', title: 'Restock Credit Available', message: 'Simulated FNB R800.00 Restock Credit ready to claim', type: 'info', read: false, link: '/credit' },
];

const DEFAULT_OFFER = {
  id: 'o1111111-1111-1111-1111-111111111111',
  amount: 800.00,
  status: 'OFFERED',
  repaymentPercent: 0.15,
  outstandingAmount: 800.00,
  averageWeeklyVerifiedSales: 650.00,
  readinessScore: 36,
};

const DEFAULT_BUSINESS_SETUP = {
  businessName: 'My shop',
  businessType: 'Retail',
  currency: 'ZAR',
  taxRate: '0.00%',
  openingDate: '26 Oct',
  merchantId: '11111111-1111-1111-1111-111111111111',
};

function getItem(key, defaultValue) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

export const storageRepository = {
  initDemoData(force = false) {
    if (force || !localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      setItem(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
      setItem(STORAGE_KEYS.BATCHES, DEFAULT_BATCHES);
      setItem(STORAGE_KEYS.SALES, DEFAULT_SALES);
      setItem(STORAGE_KEYS.CUSTOMERS, DEFAULT_CUSTOMERS);
      setItem(STORAGE_KEYS.EXPENSES, DEFAULT_EXPENSES);
      setItem(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS);
      setItem(STORAGE_KEYS.CREDIT_OFFER, DEFAULT_OFFER);
      setItem(STORAGE_KEYS.BUSINESS_SETUP, DEFAULT_BUSINESS_SETUP);
      setItem(STORAGE_KEYS.REPAYMENTS, []);
    }
  },

  getProducts() {
    this.initDemoData();
    return getItem(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
  },
  saveProduct(product) {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = { ...products[index], ...product };
    } else {
      products.push({ ...product, id: product.id || `p_${Date.now()}` });
    }
    setItem(STORAGE_KEYS.PRODUCTS, products);
    return products;
  },
  adjustProductStock(productId, delta) {
    const products = this.getProducts();
    const prod = products.find(p => p.id === productId);
    if (prod) {
      prod.currentStock = Math.max(0, prod.currentStock + delta);
      setItem(STORAGE_KEYS.PRODUCTS, products);
    }
    return products;
  },

  getBatches() {
    this.initDemoData();
    return getItem(STORAGE_KEYS.BATCHES, DEFAULT_BATCHES);
  },
  saveBatch(batch) {
    const batches = this.getBatches();
    const index = batches.findIndex(b => b.id === batch.id);
    if (index >= 0) {
      batches[index] = { ...batches[index], ...batch };
    } else {
      batches.push({ ...batch, id: batch.id || `b_${Date.now()}` });
    }
    setItem(STORAGE_KEYS.BATCHES, batches);
    return batches;
  },
  quarantineBatch(batchId, reason) {
    const batches = this.getBatches();
    const b = batches.find(x => x.id === batchId);
    if (b) {
      b.quarantined = true;
      b.quarantineReason = reason || 'Safety check quarantine';
      setItem(STORAGE_KEYS.BATCHES, batches);
    }
    return batches;
  },

  getSales() {
    this.initDemoData();
    return getItem(STORAGE_KEYS.SALES, DEFAULT_SALES);
  },
  recordSale(sale) {
    const sales = this.getSales();
    const newSale = {
      ...sale,
      id: sale.id || `s_${Date.now()}`,
      reference: sale.reference || `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: sale.timestamp || new Date().toISOString(),
      syncStatus: sale.syncStatus || 'SYNCED',
    };
    sales.unshift(newSale);
    setItem(STORAGE_KEYS.SALES, sales);

    if (newSale.items) {
      newSale.items.forEach(item => {
        this.adjustProductStock(item.productId, -item.quantity);
      });
    }

    const offer = this.getCreditOffer();
    if (offer && (offer.status === 'ACCEPTED' || offer.status === 'ACTIVE')) {
      const deduction = newSale.total * (offer.repaymentPercent || 0.15);
      const newOutstanding = Math.max(0, offer.outstandingAmount - deduction);
      const updatedOffer = {
        ...offer,
        outstandingAmount: newOutstanding,
        status: newOutstanding <= 0 ? 'REPAID' : 'ACTIVE',
      };
      setItem(STORAGE_KEYS.CREDIT_OFFER, updatedOffer);

      const repayments = getItem(STORAGE_KEYS.REPAYMENTS, []);
      repayments.unshift({
        id: `r_${Date.now()}`,
        saleId: newSale.id,
        amount: deduction,
        date: new Date().toISOString(),
      });
      setItem(STORAGE_KEYS.REPAYMENTS, repayments);
    }

    return newSale;
  },

  getCustomers() {
    this.initDemoData();
    return getItem(STORAGE_KEYS.CUSTOMERS, DEFAULT_CUSTOMERS);
  },
  addCustomerDebt(customerName, amount, note) {
    const customers = this.getCustomers();
    let cust = customers.find(c => c.name.toLowerCase() === customerName.toLowerCase());
    if (!cust) {
      cust = { id: `c_${Date.now()}`, name: customerName, phone: '+27 82 000 0000', totalPurchases: 0, debtBalance: 0, debtHistory: [] };
      customers.push(cust);
    }
    cust.debtBalance += amount;
    cust.debtHistory.unshift({
      id: `dh_${Date.now()}`,
      date: new Date().toISOString(),
      amount,
      description: note || 'Credit purchase',
    });
    setItem(STORAGE_KEYS.CUSTOMERS, customers);
    return customers;
  },
  recordCustomerPayment(customerId, amount) {
    const customers = this.getCustomers();
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      customer.debtBalance = Math.max(0, customer.debtBalance - amount);
      customer.debtHistory.unshift({
        id: `dh_${Date.now()}`,
        date: new Date().toISOString(),
        amount: -amount,
        description: 'Debt payment received',
      });
      setItem(STORAGE_KEYS.CUSTOMERS, customers);
    }
    return customers;
  },

  getExpenses() {
    this.initDemoData();
    return getItem(STORAGE_KEYS.EXPENSES, DEFAULT_EXPENSES);
  },
  addExpense(expense) {
    const expenses = this.getExpenses();
    expenses.unshift({
      ...expense,
      id: `e_${Date.now()}`,
      date: expense.date || new Date().toISOString(),
    });
    setItem(STORAGE_KEYS.EXPENSES, expenses);
    return expenses;
  },

  getNotifications() {
    this.initDemoData();
    return getItem(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS);
  },
  markNotificationRead(id) {
    const notifs = this.getNotifications();
    const notif = notifs.find(n => n.id === id);
    if (notif) {
      notif.read = true;
      setItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
    }
    return notifs;
  },

  getCreditOffer() {
    this.initDemoData();
    return getItem(STORAGE_KEYS.CREDIT_OFFER, DEFAULT_OFFER);
  },
  acceptCreditOffer() {
    const offer = this.getCreditOffer();
    const updated = {
      ...offer,
      status: 'ACCEPTED',
      acceptedAt: new Date().toISOString(),
    };
    setItem(STORAGE_KEYS.CREDIT_OFFER, updated);
    return updated;
  },
  getRepayments() {
    return getItem(STORAGE_KEYS.REPAYMENTS, []);
  },

  getBusinessSetup() {
    return getItem(STORAGE_KEYS.BUSINESS_SETUP, DEFAULT_BUSINESS_SETUP);
  },
  saveBusinessSetup(setup) {
    const current = this.getBusinessSetup();
    const updated = { ...current, ...setup };
    setItem(STORAGE_KEYS.BUSINESS_SETUP, updated);
    return updated;
  },

  getPin() {
    return getItem(STORAGE_KEYS.APP_PIN, null);
  },
  setPin(pin) {
    setItem(STORAGE_KEYS.APP_PIN, pin);
  },

  // JSON Backup & Restore
  exportBackupToJson() {
    const backup = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      products: this.getProducts(),
      batches: this.getBatches(),
      sales: this.getSales(),
      customers: this.getCustomers(),
      expenses: this.getExpenses(),
      offer: this.getCreditOffer(),
      repayments: this.getRepayments(),
      businessSetup: this.getBusinessSetup(),
    };
    return JSON.stringify(backup, null, 2);
  },

  restoreBackupFromJson(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.products) setItem(STORAGE_KEYS.PRODUCTS, data.products);
      if (data.batches) setItem(STORAGE_KEYS.BATCHES, data.batches);
      if (data.sales) setItem(STORAGE_KEYS.SALES, data.sales);
      if (data.customers) setItem(STORAGE_KEYS.CUSTOMERS, data.customers);
      if (data.expenses) setItem(STORAGE_KEYS.EXPENSES, data.expenses);
      if (data.offer) setItem(STORAGE_KEYS.CREDIT_OFFER, data.offer);
      if (data.repayments) setItem(STORAGE_KEYS.REPAYMENTS, data.repayments);
      if (data.businessSetup) setItem(STORAGE_KEYS.BUSINESS_SETUP, data.businessSetup);
      return true;
    } catch (e) {
      console.error('Backup restore failed', e);
      return false;
    }
  },

  getSession() {
    return getItem(STORAGE_KEYS.USER_SESSION, { isAuthenticated: true, user: { name: 'Sipho Ndlovu', shop: 'My shop' } });
  },
  setSession(session) {
    setItem(STORAGE_KEYS.USER_SESSION, session);
  }
};
