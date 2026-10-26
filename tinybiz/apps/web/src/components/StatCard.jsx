import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'var(--accent-blue)' }) {
  return (
    <div className="card-white">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {title}
          </span>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: '8px 0 4px 0', color: 'var(--text-main)', fontVariantNumeric: 'tabular-nums' }}>
            {value}
          </h2>
          {subtitle && <span style={{ fontSize: 12, color: color, fontWeight: 600 }}>{subtitle}</span>}
        </div>
        {Icon && (
          <div className="card-inset" style={{ padding: 10, borderRadius: 12, color: color, display: 'flex' }}>
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  );
}
