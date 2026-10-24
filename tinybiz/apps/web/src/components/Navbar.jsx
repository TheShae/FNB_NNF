import React from 'react';
import { Store, BarChart3, Package, History, Award } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Products & Stock', icon: Package },
    { id: 'events', label: 'Synced Events', icon: History },
    { id: 'score', label: 'Readiness & Offer', icon: Award },
  ];

  return (
    <nav style={{ backgroundColor: '#1E262B', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ backgroundColor: '#EAAA00', padding: 8, borderRadius: 10, display: 'flex', color: '#000' }}>
            <Store size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: '#F1F5F9' }}>TinyBiz</h1>
            <span style={{ fontSize: 11, color: '#94A3B8' }}>Sipho Spaza Shop • FNB Merchant</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn ${isActive ? 'btn-primary' : 'btn-outline'}`}
                style={{ border: isActive ? 'none' : '1px solid transparent' }}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
