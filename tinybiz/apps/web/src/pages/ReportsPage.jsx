import React, { useState } from 'react';
import { DollarSign, Download, Share2, BarChart2 } from 'lucide-react';
import { businessServices } from '../data/businessServices';

export default function ReportsPage({ sales, expenses, products, setActivePage }) {
  const [period, setPeriod] = useState('today'); // 'today', 'week', 'month'

  const { totalRevenue, totalCostOfGoods, grossProfit, totalExpenses, netProfit } =
    businessServices.calculateNetProfit(sales, expenses, products, period);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Business report</h3>
        <button className="btn-outline" style={{ padding: 8 }}>
          <Share2 size={16} />
        </button>
      </div>

      {/* Period Toggles */}
      <div className="card-white" style={{ display: 'flex', gap: 8, padding: 6, borderRadius: 14 }}>
        {['today', 'week', 'month'].map((p) => {
          const isActive = period === p;
          const label = p === 'today' ? 'Today' : p === 'week' ? 'This week' : 'This month';
          return (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                backgroundColor: isActive ? 'var(--color-success-bg)' : 'transparent',
                color: isActive ? 'var(--color-success)' : 'var(--text-muted)',
                border: isActive ? '1px solid rgba(21, 128, 61, 0.2)' : 'none',
              }}
            >
              {isActive && '✓ '}{label}
            </button>
          );
        })}
      </div>

      {/* Performance Summary Breakdown */}
      <div className="card-white" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
          {period === 'today' ? 'Today' : period === 'week' ? 'This week' : 'This month'} performance
        </h4>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, borderBottom: '1px solid var(--border-slate)', paddingBottom: 10 }}>
          <span style={{ color: 'var(--text-main)' }}>Sales</span>
          <strong style={{ fontVariantNumeric: 'tabular-nums' }}>R{totalRevenue.toFixed(2)}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, borderBottom: '1px solid var(--border-slate)', paddingBottom: 10 }}>
          <span style={{ color: 'var(--text-main)' }}>Less: cost of goods sold</span>
          <strong style={{ color: 'var(--color-danger)', fontVariantNumeric: 'tabular-nums' }}>R{totalCostOfGoods.toFixed(2)}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 800, borderBottom: '1px solid var(--border-slate)', paddingBottom: 10 }}>
          <span>Gross profit</span>
          <strong style={{ fontVariantNumeric: 'tabular-nums' }}>R{grossProfit.toFixed(2)}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, borderBottom: '1px solid var(--border-slate)', paddingBottom: 10 }}>
          <span style={{ color: 'var(--text-main)' }}>Less: recorded expenses</span>
          <strong style={{ color: 'var(--color-danger)', fontVariantNumeric: 'tabular-nums' }}>R{totalExpenses.toFixed(2)}</strong>
        </div>

        <div className="card-inset" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Estimated net profit</div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Gross profit minus recorded expenses</span>
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-success)', fontVariantNumeric: 'tabular-nums' }}>
            R{netProfit.toFixed(2)}
          </span>
        </div>
      </div>

      <button className="btn-outline" style={{ justifyContent: 'center' }} onClick={() => setActivePage('expenses')}>
        Review recorded expenses
      </button>

      {/* Best Sellers */}
      <div className="card-white">
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Best sellers</h4>
        {products.slice(0, 3).map((p) => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-slate)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>{p.emoji}</span>
              <div>
                <strong style={{ fontSize: 14, display: 'block' }}>{p.name}</strong>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>15 {p.unit} sold</span>
              </div>
            </div>
            <span style={{ fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>R270.00</span>
          </div>
        ))}
      </div>
    </div>
  );
}
