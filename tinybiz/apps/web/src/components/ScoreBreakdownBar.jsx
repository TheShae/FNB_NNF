import React from 'react';

export default function ScoreBreakdownBar({ label, weightLabel, value, maxVal }) {
  const percent = Math.min(100, Math.max(0, (value / maxVal) * 100));

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
        <span style={{ color: 'var(--text-main)' }}>{label}</span>
        <div style={{ display: 'flex', gap: 12 }}>
          <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{weightLabel}</span>
          <span style={{ color: 'var(--accent-blue)', fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>{value} / {maxVal}</span>
        </div>
      </div>
      <div className="card-inset" style={{ height: 8, padding: 0, borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${percent}%`, height: '100%', backgroundColor: 'var(--accent-blue)', borderRadius: 4, transition: 'width 0.3s ease' }} />
      </div>
    </div>
  );
}
