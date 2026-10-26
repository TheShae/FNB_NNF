import React from 'react';
import StatCard from '../components/StatCard';
import { DollarSign, ShieldAlert, ShieldCheck, Plus, BarChart3, AlertTriangle, Users } from 'lucide-react';
import { businessServices } from '../data/businessServices';

export default function DashboardPage({ products, sales, expenses, customers, setActivePage }) {
  const { totalRevenue, totalCostOfGoods, grossProfit, totalExpenses, netProfit } =
    businessServices.calculateNetProfit(sales, expenses, products);

  const totalCustomerDebt = customers.reduce((sum, c) => sum + (c.debtBalance || 0), 0);
  const lowStockCount = products.filter((p) => p.currentStock <= p.lowStockThreshold).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', margin: '0 0 4px 0' }}>Business overview</h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>A clear view of how your business is doing.</p>
      </div>

      {/* Net Profit Card */}
      <div className="card-white" style={{ borderLeft: '4px solid var(--accent-blue)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-main)' }}>Net profit today</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>ZAR</span>
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: 'var(--text-main)', fontVariantNumeric: 'tabular-nums', margin: '4px 0 16px 0' }}>
          R{netProfit.toFixed(2)}
        </h2>
        <div style={{ borderTop: '1px solid var(--border-slate)', paddingTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: 12 }}>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>Revenue</span>
            <strong style={{ color: 'var(--text-main)' }}>R{totalRevenue.toFixed(2)}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>Cost of goods</span>
            <strong style={{ color: 'var(--text-main)' }}>R{totalCostOfGoods.toFixed(2)}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>Expenses</span>
            <strong style={{ color: 'var(--text-main)' }}>R{totalExpenses.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      {/* Customer Debt & Low Stock Row */}
      <div className="grid-2">
        <div className="card-white" style={{ cursor: 'pointer' }} onClick={() => setActivePage('customers')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, color: 'var(--accent-amber)' }}>
            <Users size={18} />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>Customer debt</span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)', fontVariantNumeric: 'tabular-nums' }}>
            R{totalCustomerDebt.toFixed(2)}
          </div>
        </div>

        <div className="card-white" style={{ cursor: 'pointer' }} onClick={() => setActivePage('stock')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, color: 'var(--color-danger)' }}>
            <AlertTriangle size={18} />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>Low-stock items</span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)', fontVariantNumeric: 'tabular-nums' }}>
            {lowStockCount}
          </div>
        </div>
      </div>

      {/* Verified Sales Card */}
      <div className="card-white">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="card-inset" style={{ padding: 8, borderRadius: 10, color: 'var(--color-success)' }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Verified sales</h4>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Customer QR & FNB payments</span>
            </div>
          </div>
          <span className="badge-pill badge-success">0%</span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className="btn-outline" style={{ justifyContent: 'center', padding: 12 }} onClick={() => setActivePage('expenses')}>
          <Plus size={16} color="var(--accent-blue)" /> Add business expense
        </button>
        <button className="btn-outline" style={{ justifyContent: 'center', padding: 12 }} onClick={() => setActivePage('reports')}>
          <BarChart3 size={16} color="var(--accent-blue)" /> View business report
        </button>
      </div>
    </div>
  );
}
