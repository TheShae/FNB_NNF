import React from 'react';
import { AlertTriangle, CheckCircle2, Plus } from 'lucide-react';
import { businessServices } from '../data/businessServices';

export default function StockPage({ products, sales, onRestock, setActivePage }) {
  const lowStockCount = products.filter((p) => p.currentStock <= p.lowStockThreshold).length;
  const healthyCount = products.length - lowStockCount;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', margin: '0 0 4px 0' }}>Stock health</h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>Live predictions from your last 7 days of sales.</p>
      </div>

      {/* Summary Pills */}
      <div className="grid-2">
        <div className="card-white" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16 }}>
          <div className="card-inset" style={{ padding: 10, borderRadius: 12, color: 'var(--color-warning)' }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)' }}>{lowStockCount}</div>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Low stock</span>
          </div>
        </div>

        <div className="card-white" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16 }}>
          <div className="card-inset" style={{ padding: 10, borderRadius: 12, color: 'var(--color-success)' }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)' }}>{healthyCount}</div>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Healthy</span>
          </div>
        </div>
      </div>

      {/* Product Prediction List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {products.map((p) => {
          const pred = businessServices.predictProductStockOut(p, sales);
          return (
            <div key={p.id} className="card-white" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ backgroundColor: 'var(--surface-inset)', width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                  {p.emoji || '📦'}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>{p.name}</h4>
                    {pred.isLowStock ? (
                      <span className="badge-pill badge-warning">Low stock</span>
                    ) : (
                      <span className="badge-pill badge-success">Healthy</span>
                    )}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: pred.isLowStock ? 'var(--color-warning)' : 'var(--color-success)', marginTop: 2 }}>
                    {pred.statusMessage}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    {p.currentStock} {p.unit}s left • {pred.unitsSold7Days} sold in 7 days
                  </div>
                </div>
              </div>

              <button className="btn-blue" style={{ padding: 10, borderRadius: '50%' }} onClick={() => onRestock(p.id, p.name)} title="Restock item">
                <Plus size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
