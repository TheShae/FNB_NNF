import React from 'react';

export default function ReadinessGauge({ score = 76 }) {
  const color = score >= 70 ? '#009A9B' : score >= 50 ? '#EAAA00' : '#EF4444';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: '50%',
          border: `8px solid ${color}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 20px ${color}30`,
        }}
      >
        <span style={{ fontSize: 44, fontWeight: 800, color: color }}>{score}</span>
        <span style={{ fontSize: 12, color: '#94A3B8' }}>/ 100</span>
      </div>
      <h3 style={{ marginTop: 16, fontSize: 18, fontWeight: 700 }}>Trader Readiness Score</h3>
      <span style={{ fontSize: 12, color: '#94A3B8' }}>4-Factor Explainable Calculation</span>
    </div>
  );
}
