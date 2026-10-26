import React, { useState } from 'react';
import ProductsTable from '../components/ProductsTable';
import { Plus, PackagePlus, X } from 'lucide-react';

export default function ProductsPage({ products, onSaveProduct, onRestock, searchTerm }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newProd, setNewProd] = useState({ name: '', emoji: '📦', category: 'General', barcode: '', unit: 'item', costPrice: '', sellPrice: '', currentStock: 10, lowStockThreshold: 5 });

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.barcode && p.barcode.includes(searchTerm))
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProduct({
      ...newProd,
      costPrice: parseFloat(newProd.costPrice) || 0,
      sellPrice: parseFloat(newProd.sellPrice) || 0,
      currentStock: parseInt(newProd.currentStock, 10) || 0,
    });
    setModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)' }}>Catalog & Inventory ({filtered.length})</h3>
        <button className="morphic-btn morphic-btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Add New Product
        </button>
      </div>

      <ProductsTable products={filtered} onRestock={onRestock} />

      {/* Add Product Modal */}
      {modalOpen && (
        <div className="morphic-modal-backdrop">
          <div className="morphic-modal">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)' }}>
                <PackagePlus size={18} color="var(--accent-emerald)" /> Add New Inventory Product
              </h3>
              <button className="morphic-btn" style={{ padding: 6 }} onClick={() => setModalOpen(false)}><X size={16} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Product Name</label>
                <input type="text" className="morphic-input" required value={newProd.name} onChange={(e) => setNewProd({ ...newProd, name: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Emoji Icon</label>
                <input type="text" className="morphic-input" value={newProd.emoji} onChange={(e) => setNewProd({ ...newProd, emoji: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Category</label>
                <input type="text" className="morphic-input" value={newProd.category} onChange={(e) => setNewProd({ ...newProd, category: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Cost Price (ZAR)</label>
                <input type="number" step="0.01" className="morphic-input" required value={newProd.costPrice} onChange={(e) => setNewProd({ ...newProd, costPrice: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Selling Price (ZAR)</label>
                <input type="number" step="0.01" className="morphic-input" required value={newProd.sellPrice} onChange={(e) => setNewProd({ ...newProd, sellPrice: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Initial Stock</label>
                <input type="number" className="morphic-input" required value={newProd.currentStock} onChange={(e) => setNewProd({ ...newProd, currentStock: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Barcode / EAN</label>
                <input type="text" className="morphic-input" value={newProd.barcode} onChange={(e) => setNewProd({ ...newProd, barcode: e.target.value })} />
              </div>

              <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
                <button type="button" className="morphic-btn" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="morphic-btn morphic-btn-primary">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
