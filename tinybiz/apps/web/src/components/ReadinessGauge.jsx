import React from 'react';
import { Lock } from 'lucide-react';

export default function ReadinessGauge({ score = 36 }) {
  const color = score >= 70 ? 'var(--color-success)' : score >= 50 ? 'var(--color-warning)' : 'var(--color-danger)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px 0' }}>
      <div
        style={{
          width: 150,
          height: 150,
          borderRadius: '50%',
          border: `8px solid #E2E8F0`,
          borderTopColor: color,
          borderRightColor: color,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          boxShadow: 'var(--shadow-card)',
          transform: 'rotate(-45deg)',
        }}
      >
        <div style={{ transform: 'rotate(45deg)', textAlign: 'center' }}>
          <span style={{ fontSize: 44, fontWeight: 800, color: color, fontVariantNumeric: 'tabular-nums', display: 'block', lineHeight: 1 }}>{score}</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>out of 100</span>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <span className="badge-pill badge-warning" style={{ gap: 6, fontSize: 12 }}>
          <Lock size={12} /> Keep trading to unlock credit
        </span>
      </div>
    </div>
  );
}
