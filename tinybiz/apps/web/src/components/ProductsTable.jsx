import React from 'react';
import { Package, AlertTriangle, Plus } from 'lucide-react';

export default function ProductsTable({ products, onRestock }) {
  return (
    <div className="morphic-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)' }}>
          <Package size={18} color="var(--accent-emerald)" /> Inventory Products ({products.length})
        </h3>
      </div>
      <div className="morphic-table-container">
        <table className="morphic-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Cost Price</th>
              <th>Sell Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const isLow = p.currentStock <= (p.lowStockThreshold || 5);
              return (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600 }}>
                    <span style={{ fontSize: 18, marginRight: 8 }}>{p.emoji || '📦'}</span> {p.name}
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{p.category || 'General'}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{p.unit}</td>
                  <td>R {Number(p.costPrice).toFixed(2)}</td>
                  <td style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>R {Number(p.sellPrice).toFixed(2)}</td>
                  <td style={{ fontWeight: 800, color: isLow ? 'var(--color-danger)' : 'var(--text-main)' }}>{p.currentStock}</td>
                  <td>
                    {isLow ? (
                      <span className="morphic-badge morphic-badge-warning">
                        <AlertTriangle size={12} /> Low Stock
                      </span>
                    ) : (
                      <span className="morphic-badge morphic-badge-success">Healthy</span>
                    )}
                  </td>
                  <td>
                    <button className="morphic-btn" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => onRestock(p.id, p.name)}>
                      <Plus size={12} /> Restock
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
