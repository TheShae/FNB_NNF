import React from 'react';
import ReadinessGauge from '../components/ReadinessGauge';
import ScoreBreakdownBar from '../components/ScoreBreakdownBar';
import CreditFacilityCard from '../components/CreditFacilityCard';
import { CheckCircle2 } from 'lucide-react';
import { businessServices } from '../data/businessServices';

export default function ScoreCreditPage({ sales, offer, repayments, onAcceptOffer }) {
  const readiness = businessServices.calculateReadinessScore(sales, 6);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', margin: '0 0 4px 0' }}>Business score</h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>Four explainable factors shape your access to restock credit.</p>
      </div>

      <div className="grid-2">
        {/* Score Breakdown Card */}
        <div className="card-white">
          <ReadinessGauge score={readiness.totalScore} />

          <div style={{ marginTop: 20 }}>
            <h4 style={{ fontSize: 15, fontWeight: 800, marginBottom: 14, color: 'var(--text-main)' }}>Score breakdown</h4>

            <ScoreBreakdownBar label="Active days share" weightLabel="25%" value={readiness.activeDaysScore} maxVal={25} />
            <ScoreBreakdownBar label="Average daily sales" weightLabel="30%" value={readiness.avgSalesScore} maxVal={30} />
            <ScoreBreakdownBar label="Profit growth trend" weightLabel="20%" value={readiness.profitTrendScore} maxVal={20} />
            <ScoreBreakdownBar label="Verified sales share" weightLabel="25%" value={readiness.verifiedSalesScore} maxVal={25} />

            <div className="card-inset" style={{ marginTop: 16, backgroundColor: 'var(--color-success-bg)', border: '1px solid rgba(21, 128, 61, 0.2)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-success)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                📈 Helping your score
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--text-main)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={14} color="var(--color-success)" /> Active trading on 6/14 days
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={14} color="var(--color-success)" /> 5 verified customer/FNB sales
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FNB Credit Offer Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <CreditFacilityCard offer={offer} onAccept={onAcceptOffer} />

          <div className="card-white">
            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: 'var(--text-main)' }}>Recent automatic deductions</h4>
            {repayments.length === 0 ? (
              <div style={{ fontSize: 12, color: 'var(--text-muted)', padding: 12 }} className="card-inset">
                No automatic repayments recorded yet. They will appear here after your next sale.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {repayments.map((r) => (
                  <div key={r.id} className="card-inset" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>15% Sales Repayment</div>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{new Date(r.date).toLocaleString()}</span>
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--color-success)', fontVariantNumeric: 'tabular-nums' }}>- R{r.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
