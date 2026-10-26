import React, { useState } from 'react';
import ProductTile from '../components/ProductTile';

export default function SellPage({ products, onRecordSale }) {
  const [cart, setCart] = useState({});

  const handleProductClick = (product) => {
    if (product.currentStock <= 0) return;
    setCart((prev) => {
      const currentQty = prev[product.id] || 0;
      if (currentQty >= product.currentStock) return prev;
      return { ...prev, [product.id]: currentQty + 1 };
    });
  };

  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [pId, qty]) => {
    const prod = products.find((p) => p.id === pId);
    return sum + (prod ? prod.sellPrice * qty : 0);
  }, 0);

  const handleCheckout = () => {
    if (cartItemCount === 0) return;
    const items = Object.entries(cart).map(([productId, quantity]) => {
      const prod = products.find((p) => p.id === productId);
      return { productId, quantity, unitPrice: prod ? prod.sellPrice : 0 };
    });

    onRecordSale({
      items,
      total: cartTotal,
      paymentMethod: 'Cash',
      verificationTier: 'SELF',
      verificationWeight: 1,
    });

    setCart({});
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', margin: '0 0 4px 0' }}>Make a sale</h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>Tap a product to add it to the cart.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 16 }}>
        {products.map((p) => (
          <ProductTile key={p.id} product={p} cartQty={cart[p.id] || 0} onClick={() => handleProductClick(p)} />
        ))}
      </div>

      {cartItemCount > 0 && (
        <div className="card-white" style={{ position: 'sticky', bottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', boxShadow: 'var(--shadow-hover)', border: '2px solid var(--accent-blue)' }}>
          <div>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>{cartItemCount} items selected</span>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent-blue)', fontVariantNumeric: 'tabular-nums' }}>
              R {cartTotal.toFixed(2)}
            </div>
          </div>
          <button className="btn-blue" onClick={handleCheckout}>
            Complete Sale
          </button>
        </div>
      )}
    </div>
  );
}
