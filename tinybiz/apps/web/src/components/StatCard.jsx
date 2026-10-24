import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = '#009A9B' }) {
  return (
    <div className="card" style={{ borderLeft: `4px solid ${color}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>{title}</span>
          <h2 style={{ fontSize: 28, fontWeight: 800, margin: '8px 0 4px 0', color: '#F1F5F9' }}>{value}</h2>
          {subtitle && <span style={{ fontSize: 12, color: color, fontWeight: 600 }}>{subtitle}</span>}
        </div>
        {Icon && (
          <div style={{ backgroundColor: `${color}20`, padding: 10, borderRadius: 12, color: color }}>
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  );
}
