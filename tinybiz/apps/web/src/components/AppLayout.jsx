import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import NotificationsPanel from './NotificationsPanel';

export default function AppLayout({ activePage, setActivePage, children, notifications, onMarkNotificationRead }) {
  const [collapsed, setCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const pageTitles = {
    sell: 'Make a sale',
    stock: 'Stock health',
    dashboard: 'Business overview',
    reports: 'Business report',
    insights: 'Buddy insights',
    customers: 'Customer debts',
    expenses: 'Expenses',
    expiry: 'Product Batches & Expiry (FEFO)',
    sales: 'Sales history & transactions',
    'food-safety': 'Food safety & assessment',
    score: 'Business score',
    credit: 'Restock credit',
    settings: 'Settings & Security',
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="layout-wrapper">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          pageTitle={pageTitles[activePage] || 'Business overview'}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          unreadCount={unreadCount}
          toggleNotifications={() => setNotificationsOpen(!notificationsOpen)}
        />

        <main className="main-content">{children}</main>

        <NotificationsPanel
          open={notificationsOpen}
          onClose={() => setNotificationsOpen(false)}
          notifications={notifications}
          onMarkRead={onMarkNotificationRead}
        />
      </div>
    </div>
  );
}
