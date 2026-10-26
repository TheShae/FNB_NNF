import React from 'react';
import { Search, Bell, Cloud, User } from 'lucide-react';

export default function Topbar({ pageTitle, searchTerm, setSearchTerm, unreadCount, toggleNotifications }) {
  return (
    <header
      style={{
        height: 64,
        backgroundColor: 'var(--card-bg)',
        borderBottom: '1px solid var(--border-slate)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Title / Breadcrumb */}
      <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)' }}>{pageTitle}</h2>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Global Search */}
        <div style={{ position: 'relative', width: 240 }}>
          <input
            type="text"
            className="input-field"
            placeholder="Search products & sales..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: 36, padding: '8px 12px 8px 36px', fontSize: 13 }}
          />
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: 10 }} />
        </div>

        {/* Sync Status Badge */}
        <div className="badge-pill badge-success" title="Local-first offline persistent storage">
          <Cloud size={14} /> Synced
        </div>

        {/* Notification Bell */}
        <button className="btn-outline" style={{ padding: 8, position: 'relative' }} onClick={toggleNotifications}>
          <Bell size={18} />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: -2,
                right: -2,
                backgroundColor: 'var(--color-danger)',
                color: '#FFF',
                fontSize: 10,
                fontWeight: 700,
                borderRadius: '50%',
                width: 16,
                height: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 8, borderLeft: '1px solid var(--border-slate)' }}>
          <div className="card-inset" style={{ padding: 8, borderRadius: '50%', display: 'flex' }}>
            <User size={16} color="var(--accent-blue)" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-main)' }}>Sipho</span>
        </div>
      </div>
    </header>
  );
}
