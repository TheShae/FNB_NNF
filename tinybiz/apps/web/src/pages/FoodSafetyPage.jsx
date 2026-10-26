import React, { useState } from 'react';
import { ShieldAlert, Plus, CheckCircle2 } from 'lucide-react';

export default function FoodSafetyPage({ reports, batches, products, onAddReport }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState(batches[0]?.id || '');
  const [condition, setCondition] = useState('Clear under checks');
  const [notes, setNotes] = useState('');

  const getProductForBatch = (batchId) => {
    const batch = batches.find((b) => b.id === batchId);
    if (!batch) return 'Item';
    const prod = products.find((p) => p.id === batch.productId);
    return prod ? `${prod.emoji} ${prod.name} (${batch.batchNumber})` : batch.batchNumber;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReport({
      batchId: selectedBatchId,
      condition,
      notes,
      inspector: 'Sipho Ndlovu',
      status: condition === 'Expired' || condition === 'Damaged' ? 'Quarantined' : 'Clear',
    });
    setModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)' }}>Food Safety & Packaging Inspection Log</h3>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Quality condition assessments and quarantine records</span>
        </div>
        <button className="morphic-btn morphic-btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Record Inspection
        </button>
      </div>

      <div className="morphic-card">
        <div className="morphic-table-container">
          <table className="morphic-table">
            <thead>
              <tr>
                <th>Batch / Product</th>
                <th>Assessment Condition</th>
                <th>Inspector</th>
                <th>Safety Status</th>
                <th>Notes</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 700 }}>{getProductForBatch(r.batchId)}</td>
                  <td>{r.condition}</td>
                  <td>{r.inspector}</td>
                  <td>
                    {r.status === 'Quarantined' ? (
                      <span className="morphic-badge morphic-badge-danger"><ShieldAlert size={12} /> Quarantined</span>
                    ) : (
                      <span className="morphic-badge morphic-badge-success"><CheckCircle2 size={12} /> Clear</span>
                    )}
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{r.notes || 'Routine check'}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{new Date(r.assessmentDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="morphic-modal-backdrop">
          <div className="morphic-modal">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--text-main)' }}>Record Condition Assessment</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Select Batch</label>
                <select className="morphic-input" value={selectedBatchId} onChange={(e) => setSelectedBatchId(e.target.value)}>
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>{getProductForBatch(b.id)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Condition Assessment</label>
                <select className="morphic-input" value={condition} onChange={(e) => setCondition(e.target.value)}>
                  <option value="Clear under configured checks">Clear under configured checks</option>
                  <option value="Requires Inspection">Requires Inspection</option>
                  <option value="Damaged Packaging">Damaged Packaging</option>
                  <option value="Expired">Expired</option>
                  <option value="Storage Temperature Warning">Storage Temperature Warning</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Notes / Action</label>
                <input type="text" className="morphic-input" placeholder="e.g. Seal torn, moved to quarantine" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
                <button type="button" className="morphic-btn" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="morphic-btn morphic-btn-primary">Save Assessment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
