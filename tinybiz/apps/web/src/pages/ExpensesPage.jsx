import React, { useState } from 'react';
import { DollarSign, Plus, Receipt } from 'lucide-react';

export default function ExpensesPage({ expenses, onAddExpense }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [desc, setDesc] = useState('');
  const [amt, setAmt] = useState('');
  const [cat, setCat] = useState('Stock purchase');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amt > 0) {
      onAddExpense({
        description: desc || cat,
        amount: parseFloat(amt),
        category: cat,
        note,
      });
      setModalOpen(false);
      setDesc('');
      setAmt('');
      setNote('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Expenses</h3>
        <button className="btn-blue" style={{ padding: 8 }} onClick={() => setModalOpen(true)}>
          <Plus size={18} />
        </button>
      </div>

      {expenses.length === 0 ? (
        <div className="card-white" style={{ textAlign: 'center', padding: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div className="card-inset" style={{ padding: 12, borderRadius: '50%', color: 'var(--accent-blue)' }}>
            <Receipt size={28} />
          </div>
          <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>No expenses yet</h4>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, maxWidth: 300 }}>
            Add your first expense to start tracking costs.
          </p>
        </div>
      ) : (
        <div className="card-white">
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e) => (
                  <tr key={e.id}>
                    <td style={{ fontWeight: 600 }}>{e.description}</td>
                    <td><span className="badge-pill badge-blue">{e.category}</span></td>
                    <td style={{ fontWeight: 700, color: 'var(--color-danger)' }}>R{e.amount.toFixed(2)}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{new Date(e.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--text-main)' }}>Add expense</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <input type="text" className="input-field" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-blue)', display: 'block', marginBottom: 4 }}>Category</label>
                <select className="input-field" value={cat} onChange={(e) => setCat(e.target.value)}>
                  <option value="Stock purchase">Stock purchase</option>
                  <option value="Transport">Transport</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Packaging">Packaging</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <input type="number" step="0.01" className="input-field" placeholder="Amount (ZAR)" required value={amt} onChange={(e) => setAmt(e.target.value)} />
              </div>
              <div>
                <input type="text" className="input-field" placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
              </div>
              <button type="submit" className="btn-blue" style={{ marginTop: 8 }}>
                Save expense
              </button>
              <button type="button" className="btn-outline" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
