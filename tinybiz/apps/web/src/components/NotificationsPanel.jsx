import React from 'react';
import { X, Bell, AlertTriangle, AlertCircle, Info, Check } from 'lucide-react';

export default function NotificationsPanel({ open, onClose, notifications, onMarkRead }) {
  if (!open) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle size={18} color="var(--color-warning)" />;
      case 'danger': return <AlertCircle size={18} color="var(--color-danger)" />;
      default: return <Info size={18} color="var(--accent-blue)" />;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ height: '100vh', borderRadius: 0, maxWidth: 380, animation: 'slideLeft 0.15s ease-out' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--border-slate)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Bell size={18} color="var(--accent-blue)" /> Notifications
          </h3>
          <button className="btn-outline" style={{ padding: 6 }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
          {notifications.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 24 }}>No notifications</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className="card-white"
                style={{ padding: 14, borderRadius: 12, opacity: n.read ? 0.65 : 1, backgroundColor: n.read ? 'var(--surface-inset)' : 'var(--card-bg)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {getIcon(n.type)}
                    <div>
                      <h4 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-main)' }}>{n.title}</h4>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>{n.message}</p>
                    </div>
                  </div>
                  {!n.read && (
                    <button className="btn-outline" style={{ padding: 4 }} onClick={() => onMarkRead(n.id)} title="Mark as read">
                      <Check size={12} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
