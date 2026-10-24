import React from 'react';
import { Landmark, CheckCircle2 } from 'lucide-react';

export default function CreditFacilityCard({ offer, onAccept }) {
  if (!offer) return null;

  const isAccepted = offer.status === 'ACCEPTED' || offer.status === 'ACTIVE';
  const outstanding = Number(offer.outstanding_amount || offer.amount || 800).toFixed(2);
  const total = Number(offer.amount || 800).toFixed(2);
  const progress = (((800 - Number(outstanding)) / 800) * 100).toFixed(0);

  return (
    <div className="card card-amber">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#EAAA00', fontWeight: 700 }}>
          <Landmark size={20} /> Simulated FNB Restock Credit
        </div>
        <span className="badge badge-amber">{offer.status}</span>
      </div>

      <h2 style={{ fontSize: 32, fontWeight: 800, margin: '8px 0' }}>R {total}</h2>
      <span style={{ color: '#94A3B8', fontSize: 13 }}>Credit Facility • Repayment 15% of daily sales</span>

      {isAccepted && (
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
            <span style={{ color: '#009A9B' }}>Repaid: R {(800 - Number(outstanding)).toFixed(2)}</span>
            <span style={{ color: '#EF4444' }}>Outstanding: R {outstanding}</span>
          </div>
          <div style={{ width: '100%', height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#009A9B', borderRadius: 4 }} />
          </div>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        {!isAccepted ? (
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => onAccept(offer.id)}>
            Accept R800 Restock Credit
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#009A9B', fontWeight: 700 }}>
            <CheckCircle2 size={18} /> Credit Facility Active
          </div>
        )}
      </div>
    </div>
  );
}
