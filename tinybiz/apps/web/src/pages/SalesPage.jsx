import React, { useState } from 'react';
import EventsFeed from '../components/EventsFeed';
import { ShoppingCart, Plus } from 'lucide-react';

export default function SalesPage({ sales, products, onRecordSale }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [qty, setQty] = useState(1);
  const [verificationTier, setVerificationTier] = useState('SELF');

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const total = selectedProduct.sellPrice * qty;
    onRecordSale({
      items: [{ productId: selectedProduct.id, quantity: qty, unitPrice: selectedProduct.sellPrice }],
      total,
      paymentMethod: verificationTier === 'FNB_PAYMENT' ? 'FNB Pay' : verificationTier === 'CUSTOMER_QR' ? 'Customer QR' : 'Cash',
      verificationTier,
      verificationWeight: verificationTier === 'FNB_PAYMENT' ? 3 : verificationTier === 'CUSTOMER_QR' ? 2 : 1,
    });
    setModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)' }}>Sales Transactions & History ({sales.length})</h3>
        <button className="morphic-btn morphic-btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Record POS Sale
        </button>
      </div>

      <EventsFeed events={sales} />

      {modalOpen && (
        <div className="morphic-modal-backdrop">
          <div className="morphic-modal">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)' }}>
              <ShoppingCart size={18} color="var(--accent-emerald)" /> Record Sale Transaction
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Select Product</label>
                <select className="morphic-input" value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
                  {products.map((p) => (<option key={p.id} value={p.id}>{p.emoji} {p.name} - R{p.sellPrice.toFixed(2)} ({p.currentStock} left)</option>))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Quantity</label>
                <input type="number" min="1" max={selectedProduct?.currentStock || 99} className="morphic-input" value={qty} onChange={(e) => setQty(parseInt(e.target.value, 10) || 1)} />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Verification Tier</label>
                <select className="morphic-input" value={verificationTier} onChange={(e) => setVerificationTier(e.target.value)}>
                  <option value="SELF">SELF (1x Weight - Self reported sale)</option>
                  <option value="CUSTOMER_QR">CUSTOMER_QR (2x Weight - Customer scanned receipt QR)</option>
                  <option value="FNB_PAYMENT">FNB_PAYMENT (3x Weight - Verified FNB Digital Payment)</option>
                </select>
              </div>

              <div className="morphic-inset" style={{ padding: 12, borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-main)' }}>Total Sale Amount:</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent-emerald)', fontVariantNumeric: 'tabular-nums' }}>
                  R {((selectedProduct?.sellPrice || 0) * qty).toFixed(2)}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
                <button type="button" className="morphic-btn" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="morphic-btn morphic-btn-primary">Complete Sale</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
