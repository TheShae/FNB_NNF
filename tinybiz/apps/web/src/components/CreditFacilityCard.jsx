import React from 'react';
import { Landmark, Check, CheckCircle2 } from 'lucide-react';

export default function CreditFacilityCard({ offer, onAccept }) {
  if (!offer) return null;

  const isAccepted = offer.status === 'ACCEPTED' || offer.status === 'ACTIVE';
  const outstanding = Number(offer.outstandingAmount || offer.outstanding_amount || 800).toFixed(2);
  const total = Number(offer.amount || 800).toFixed(2);

  return (
    <div className="card-white" style={{ borderLeft: '4px solid var(--accent-blue)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="card-inset" style={{ padding: 8, borderRadius: 10, color: 'var(--accent-blue)' }}>
            <Landmark size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>Restock credit</h4>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Simulated FNB offer</span>
          </div>
        </div>
        <span className="badge-pill badge-blue">Available</span>
      </div>

      <h2 style={{ fontSize: 32, fontWeight: 800, margin: '12px 0 4px 0', color: 'var(--text-main)', fontVariantNumeric: 'tabular-nums' }}>
        R{total}
      </h2>
      <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Available restock credit facility</span>

      <div style={{ borderTop: '1px solid var(--border-slate)', margin: '16px 0', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
        <div>
          <span style={{ color: 'var(--text-muted)', display: 'block' }}>Daily repayment</span>
          <strong style={{ color: 'var(--text-main)', fontSize: 13 }}>15% of sales</strong>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ color: 'var(--text-muted)', display: 'block' }}>Outstanding</span>
          <strong style={{ color: 'var(--text-main)', fontSize: 13 }}>R{outstanding}</strong>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        {!isAccepted ? (
          <button className="btn-blue" style={{ width: '100%', padding: 12 }} onClick={() => onAccept(offer.id)}>
            <Check size={16} /> Accept R800.00 credit
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--color-success)', fontWeight: 700 }}>
            <CheckCircle2 size={18} /> Credit Facility Active
          </div>
        )}
      </div>
    </div>
  );
}
