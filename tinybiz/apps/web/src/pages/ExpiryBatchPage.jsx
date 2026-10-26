import React, { useState } from 'react';
import { Clock, AlertTriangle, ShieldAlert, Plus, CheckCircle2 } from 'lucide-react';

export default function ExpiryBatchPage({ batches, products, onAddBatch, onQuarantineBatch }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newBatch, setNewBatch] = useState({ productId: products[0]?.id || '', batchNumber: '', quantity: 10, expiryDate: '' });

  const getProduct = (id) => products.find((p) => p.id === id) || { name: 'Unknown Item', emoji: '📦' };

  const getStatus = (expiryDate, quarantined) => {
    if (quarantined) {
      return <span className="morphic-badge morphic-badge-danger"><ShieldAlert size={12} /> Quarantined</span>;
    }
    const daysLeft = (new Date(expiryDate).getTime() - new Date().getTime()) / 86400000;
    if (daysLeft < 0) {
      return <span className="morphic-badge morphic-badge-danger"><AlertTriangle size={12} /> Expired</span>;
    }
    if (daysLeft <= 3) {
      return <span className="morphic-badge morphic-badge-warning"><Clock size={12} /> Expiring Soon ({Math.ceil(daysLeft)}d)</span>;
    }
    return <span className="morphic-badge morphic-badge-success"><CheckCircle2 size={12} /> Fresh ({Math.ceil(daysLeft)}d)</span>;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBatch(newBatch);
    setModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)' }}>Batch & Expiry Management (FEFO)</h3>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>First-Expired-First-Out stock handling</span>
        </div>
        <button className="morphic-btn morphic-btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Receive New Batch
        </button>
      </div>

      <div className="morphic-card">
        <div className="morphic-table-container">
          <table className="morphic-table">
            <thead>
              <tr>
                <th>Batch Number</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((b) => {
                const prod = getProduct(b.productId);
                return (
                  <tr key={b.id}>
                    <td style={{ fontWeight: 700 }}>{b.batchNumber}</td>
                    <td><span style={{ marginRight: 6 }}>{prod.emoji}</span> {prod.name}</td>
                    <td style={{ fontWeight: 700 }}>{b.quantity}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{new Date(b.expiryDate).toLocaleDateString()}</td>
                    <td>{getStatus(b.expiryDate, b.quarantined)}</td>
                    <td>
                      {!b.quarantined && (
                        <button className="morphic-btn morphic-btn-danger" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => onQuarantineBatch(b.id, 'Safety Quarantine')}>
                          Quarantine
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="morphic-modal-backdrop">
          <div className="morphic-modal">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--text-main)' }}>Receive Product Batch</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Product</label>
                <select className="morphic-input" value={newBatch.productId} onChange={(e) => setNewBatch({ ...newBatch, productId: e.target.value })}>
                  {products.map((p) => (<option key={p.id} value={p.id}>{p.emoji} {p.name}</option>))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Batch Number / Lot</label>
                <input type="text" className="morphic-input" required placeholder="BAT-2026-005" value={newBatch.batchNumber} onChange={(e) => setNewBatch({ ...newBatch, batchNumber: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Quantity</label>
                <input type="number" className="morphic-input" required value={newBatch.quantity} onChange={(e) => setNewBatch({ ...newBatch, quantity: parseInt(e.target.value, 10) })} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Expiry Date</label>
                <input type="date" className="morphic-input" required value={newBatch.expiryDate} onChange={(e) => setNewBatch({ ...newBatch, expiryDate: e.target.value })} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
                <button type="button" className="morphic-btn" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="morphic-btn morphic-btn-primary">Save Batch</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
