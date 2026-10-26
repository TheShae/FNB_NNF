import React from 'react';
import {
  ShoppingBag, Package, Clock, History, Users, DollarSign,
  BarChart3, Lightbulb, Award, Landmark, ShieldAlert, Settings, ChevronLeft, ChevronRight, Store
} from 'lucide-react';

export default function Sidebar({ activePage, setActivePage, collapsed, setCollapsed }) {
  const menuItems = [
    { id: 'sell', label: 'Make a sale', icon: ShoppingBag },
    { id: 'stock', label: 'Stock health', icon: Package },
    { id: 'dashboard', label: 'Business overview', icon: BarChart3 },
    { id: 'reports', label: 'Business report', icon: BarChart3 },
    { id: 'insights', label: 'Buddy insights', icon: Lightbulb },
    { id: 'customers', label: 'Customer debts', icon: Users },
    { id: 'expenses', label: 'Expenses', icon: DollarSign },
    { id: 'expiry', label: 'Batches & Expiry', icon: Clock },
    { id: 'sales', label: 'Sales history', icon: History },
    { id: 'food-safety', label: 'Food safety', icon: ShieldAlert },
    { id: 'score', label: 'Business score', icon: Award },
    { id: 'credit', label: 'Restock credit', icon: Landmark },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      style={{
        width: collapsed ? 76 : 256,
        height: '100vh',
        position: 'sticky',
        top: 0,
        backgroundColor: '#0F172A',
        color: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 12px',
        transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 100,
        boxShadow: '1px 0 3px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      <div>
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', padding: '8px 4px', marginBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ backgroundColor: 'var(--accent-blue)', color: '#FFF', padding: 8, borderRadius: 12, display: 'flex' }}>
              <Store size={20} />
            </div>
            {!collapsed && (
              <div>
                <h1 style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', margin: 0 }}>TinyBiz</h1>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>Merchant console</span>
              </div>
            )}
          </div>
          <button
            style={{ padding: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: '#94A3B8' }}
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation List */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto', maxHeight: 'calc(100vh - 160px)' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  width: '100%',
                  padding: collapsed ? '12px' : '10px 14px',
                  borderRadius: 12,
                  backgroundColor: isActive ? 'var(--accent-blue)' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 14,
                  transition: 'all 0.15s ease',
                  border: 'none',
                }}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={18} color={isActive ? '#FFFFFF' : '#94A3B8'} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Merchant Profile */}
      {!collapsed && (
        <div style={{ padding: 12, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 11, color: '#94A3B8' }}>
          <div style={{ fontWeight: 700, color: '#FFFFFF' }}>My shop</div>
          <div>Merchant ID: 11111111-1111</div>
        </div>
      )}
    </aside>
  );
}
