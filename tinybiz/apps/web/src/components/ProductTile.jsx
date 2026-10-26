import React from 'react';

export default function ProductTile({ product, cartQty, onClick }) {
  const isLow = product.currentStock <= product.lowStockThreshold;

  return (
    <div
      className="card-white card-white-interactive"
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 16,
        height: 150,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ backgroundColor: 'var(--surface-inset)', width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
          {product.emoji || '📦'}
        </div>
        {cartQty > 0 && (
          <span style={{ backgroundColor: 'var(--accent-blue)', color: '#FFF', fontSize: 12, fontWeight: 700, borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {cartQty}
          </span>
        )}
      </div>

      <div>
        <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)', margin: '0 0 4px 0' }}>{product.name}</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--accent-blue)', fontVariantNumeric: 'tabular-nums' }}>
            R{Number(product.sellPrice).toFixed(2)}
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, color: isLow ? 'var(--color-warning)' : 'var(--text-muted)' }}>
            {product.currentStock} left
          </span>
        </div>
      </div>
    </div>
  );
}
