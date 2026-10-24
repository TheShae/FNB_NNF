import React from 'react';
import { History, CheckCircle2, QrCode, CreditCard, Shield } from 'lucide-react';

export default function EventsFeed({ events }) {
  const getBadge = (tier) => {
    if (tier === 'FNB_PAYMENT') {
      return (
        <span className="badge badge-turquoise">
          <CreditCard size={12} /> FNB Pay (3x)
        </span>
      );
    }
    if (tier === 'CUSTOMER_QR') {
      return (
        <span className="badge badge-amber">
          <QrCode size={12} /> Customer QR (2x)
        </span>
      );
    }
    return (
      <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#94A3B8' }}>
        <Shield size={12} /> Self (1x)
      </span>
    );
  };

  return (
    <div className="card">
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <History size={18} color="#EAAA00" /> Synced Events Log
      </h3>
      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Verification Tier</th>
            <th>Occurred At</th>
            <th>Sync Status</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id}>
              <td style={{ fontWeight: 600 }}>{e.type}</td>
              <td style={{ fontWeight: 700, color: e.type === 'EXPENSE' ? '#EF4444' : '#009A9B' }}>
                R {Number(e.amount || 0).toFixed(2)}
              </td>
              <td>{getBadge(e.verification_tier)}</td>
              <td style={{ color: '#94A3B8', fontSize: 13 }}>
                {new Date(e.occurred_at || e.occurredAt).toLocaleString()}
              </td>
              <td>
                <span style={{ color: '#009A9B', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600 }}>
                  <CheckCircle2 size={14} /> SYNCED
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
