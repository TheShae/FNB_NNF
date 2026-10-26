import React from 'react';
import { Lightbulb, Package, ShieldCheck, DollarSign } from 'lucide-react';

export default function InsightsPage({ products, sales }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', margin: '0 0 4px 0' }}>Buddy insights</h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>Contextual tips to grow your business.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card-white" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div className="card-inset" style={{ padding: 10, borderRadius: 12, color: 'var(--accent-blue)' }}>
            <Lightbulb size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Today's readiness</h4>
              <span className="badge-pill badge-success">Getting started</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
              Try a quick sale to build your daily picture and continuous trading record.
            </p>
          </div>
        </div>

        <div className="card-white" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div className="card-inset" style={{ padding: 10, borderRadius: 12, color: 'var(--color-warning)' }}>
            <Package size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Stock tip</h4>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
              You have 1 product running low. Restock them today to avoid losing sales tomorrow.
            </p>
            <div className="card-inset" style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>🍞 White Bread 700g</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-warning)' }}>3d left</span>
            </div>
          </div>
        </div>

        <div className="card-white" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div className="card-inset" style={{ padding: 10, borderRadius: 12, color: 'var(--color-success)' }}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Verification tip</h4>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
              Scanning customer QR or accepting FNB payments counts as verified sales and improves trust in your readiness score.
            </p>
          </div>
        </div>

        <div className="card-white" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div className="card-inset" style={{ padding: 10, borderRadius: 12, color: 'var(--accent-blue)' }}>
            <DollarSign size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Money tip</h4>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
              Profit is positive today. Watch expenses and clear customer debts to keep cash flowing steadily.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
