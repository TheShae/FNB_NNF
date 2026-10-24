import React from 'react';
import { Package, AlertTriangle, Plus } from 'lucide-react';

export default function ProductsTable({ products, onRestock }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Package size={18} color="#009A9B" /> Product Inventory ({products.length})
        </h3>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Unit</th>
            <th>Cost Price</th>
            <th>Sell Price</th>
            <th>Current Stock</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const isLow = p.current_stock <= (p.low_stock_threshold || 5);
            return (
              <tr key={p.id}>
                <td style={{ fontWeight: 600 }}>
                  <span style={{ fontSize: 18, marginRight: 8 }}>{p.emoji || '📦'}</span> {p.name}
                </td>
                <td style={{ color: '#94A3B8' }}>{p.unit}</td>
                <td>R {Number(p.cost_price).toFixed(2)}</td>
                <td style={{ fontWeight: 600, color: '#009A9B' }}>R {Number(p.sell_price).toFixed(2)}</td>
                <td style={{ fontWeight: 700, color: isLow ? '#EF4444' : '#F1F5F9' }}>{p.current_stock}</td>
                <td>
                  {isLow ? (
                    <span className="badge badge-amber">
                      <AlertTriangle size={12} /> Low Stock
                    </span>
                  ) : (
                    <span className="badge badge-turquoise">Healthy</span>
                  )}
                </td>
                <td>
                  <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => onRestock(p.id, p.name)}>
                    <Plus size={12} /> Restock
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
