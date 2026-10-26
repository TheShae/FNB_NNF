import React from 'react';
import { History, CheckCircle2, QrCode, CreditCard, Shield } from 'lucide-react';

export default function EventsFeed({ events }) {
  const getBadge = (tier) => {
    if (tier === 'FNB_PAYMENT') {
      return (
        <span className="morphic-badge morphic-badge-info">
          <CreditCard size={12} /> FNB Pay (3x)
        </span>
      );
    }
    if (tier === 'CUSTOMER_QR') {
      return (
        <span className="morphic-badge morphic-badge-warning">
          <QrCode size={12} /> Customer QR (2x)
        </span>
      );
    }
    return (
      <span className="morphic-badge" style={{ backgroundColor: 'var(--surface-inset)', color: 'var(--text-muted)' }}>
        <Shield size={12} /> Self (1x)
      </span>
    );
  };

  return (
    <div className="morphic-card">
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)' }}>
        <History size={18} color="var(--accent-amber)" /> Synced Audit Events Feed
      </h3>
      <div className="morphic-table-container">
        <table className="morphic-table">
          <thead>
            <tr>
              <th>Reference / Type</th>
              <th>Amount</th>
              <th>Verification Tier</th>
              <th>Occurred At</th>
              <th>Sync</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <td style={{ fontWeight: 600 }}>
                  <div>{e.type}</div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{e.reference || e.id.slice(0, 8)}</span>
                </td>
                <td style={{ fontWeight: 700, color: e.type === 'EXPENSE' ? 'var(--color-danger)' : 'var(--accent-emerald)' }}>
                  R {Number(e.total || e.amount || 0).toFixed(2)}
                </td>
                <td>{getBadge(e.verificationTier || e.verification_tier)}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                  {new Date(e.timestamp || e.occurred_at || e.occurredAt).toLocaleString()}
                </td>
                <td>
                  <span style={{ color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600 }}>
                    <CheckCircle2 size={14} /> SYNCED
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
