import React from 'react';
import StatCard from '../components/StatCard';
import ProductsTable from '../components/ProductsTable';
import EventsFeed from '../components/EventsFeed';
import { DollarSign, ShoppingBag, TrendingUp, ShieldCheck } from 'lucide-react';

export default function DashboardPage({ products, events, onRestock }) {
  const totalSales = events
    .filter((e) => e.type === 'SALE')
    .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  const expenses = events
    .filter((e) => e.type === 'EXPENSE')
    .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  const estimatedCost = totalSales * 0.65;
  const grossProfit = totalSales - estimatedCost;
  const netProfit = grossProfit - expenses;

  const verifiedSales = events
    .filter((e) => e.type === 'SALE' && (e.verification_tier === 'CUSTOMER_QR' || e.verification_tier === 'FNB_PAYMENT'))
    .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  const verifiedPercent = totalSales > 0 ? ((verifiedSales / totalSales) * 100).toFixed(0) : '0';

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="grid-4">
        <StatCard title="Gross Sales Revenue" value={`R ${totalSales.toFixed(2)}`} subtitle="Total daily sales" icon={DollarSign} color="#009A9B" />
        <StatCard title="Cost of Goods Sold" value={`R ${estimatedCost.toFixed(2)}`} subtitle="Estimated COGS" icon={ShoppingBag} color="#94A3B8" />
        <StatCard title="Net Profit" value={`R ${netProfit.toFixed(2)}`} subtitle="Revenue - COGS - Expenses" icon={TrendingUp} color="#EAAA00" />
        <StatCard title="Verified Sales Share" value={`${verifiedPercent}%`} subtitle="Customer QR & FNB Pay" icon={ShieldCheck} color="#009A9B" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <ProductsTable products={products} onRestock={onRestock} />
        <EventsFeed events={events.slice(0, 5)} />
      </div>
    </div>
  );
}
