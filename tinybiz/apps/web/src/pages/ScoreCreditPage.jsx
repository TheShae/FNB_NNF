import React from 'react';
import ReadinessGauge from '../components/ReadinessGauge';
import CreditFacilityCard from '../components/CreditFacilityCard';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function ScoreCreditPage({ offer, onAcceptOffer }) {
  const positiveFactors = [
    'Active trading on 10/14 days',
    'Average daily sales above R300',
    '4 customer-verified or FNB-verified sales',
  ];

  const nextActions = [
    'Ask customers to scan your sale QR code for higher readiness score',
    'Record expenses daily to keep complete financial records',
  ];

  return (
    <div className="container grid-2">
      <div className="card">
        <ReadinessGauge score={76} />
        <div style={{ marginTop: 24 }}>
          <h4 style={{ color: '#009A9B', fontSize: 14, marginBottom: 12 }}>What is helping your score</h4>
          {positiveFactors.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 8 }}>
              <CheckCircle2 size={16} color="#009A9B" /> {f}
            </div>
          ))}

          <h4 style={{ color: '#EAAA00', fontSize: 14, marginTop: 20, marginBottom: 12 }}>Next Actions</h4>
          {nextActions.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 8 }}>
              <ArrowRight size={16} color="#EAAA00" /> {a}
            </div>
          ))}
        </div>
      </div>

      <div>
        <CreditFacilityCard offer={offer} onAccept={onAcceptOffer} />
      </div>
    </div>
  );
}
