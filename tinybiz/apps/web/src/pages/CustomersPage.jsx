import React, { useState } from 'react';
import { Users, Plus, DollarSign } from 'lucide-react';

export default function CustomersPage({ customers, onAddCustomerDebt, onRecordPayment }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const [payModal, setPayModal] = useState(false);
  const [selectedCust, setSelectedCust] = useState(null);
  const [payAmt, setPayAmt] = useState('');

  const handleAddDebtSubmit = (e) => {
    e.preventDefault();
    if (name && amount > 0) {
      onAddCustomerDebt(name, parseFloat(amount), note);
      setModalOpen(false);
      setName('');
      setAmount('');
      setNote('');
    }
  };

  const handlePaySubmit = (e) => {
    e.preventDefault();
    if (selectedCust && payAmt > 0) {
      onRecordPayment(selectedCust.id, parseFloat(payAmt));
      setPayModal(false);
    }
  };

  const debtCustomers = customers.filter((c) => c.debtBalance > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Customer Debts</h3>
        <button className="btn-blue" style={{ padding: 8 }} onClick={() => setModalOpen(true)}>
          <Plus size={18} />
        </button>
      </div>

      {debtCustomers.length === 0 ? (
        <div className="card-white" style={{ textAlign: 'center', padding: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div className="card-inset" style={{ padding: 12, borderRadius: '50%', color: 'var(--accent-blue)' }}>
            <Users size={28} />
          </div>
          <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>No customer debts</h4>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, maxWidth: 300 }}>
            Record a credit sale to start tracking who owes you.
          </p>
        </div>
      ) : (
        <div className="card-white">
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Phone Number</th>
                  <th>Total Purchases</th>
                  <th>Outstanding Debt</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {debtCustomers.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 700 }}>{c.name}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{c.phone}</td>
                    <td>R{c.totalPurchases.toFixed(2)}</td>
                    <td style={{ fontWeight: 800, color: 'var(--color-danger)' }}>R{c.debtBalance.toFixed(2)}</td>
                    <td>
                      <button className="btn-blue" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => { setSelectedCust(c); setPayAmt(c.debtBalance.toFixed(2)); setPayModal(true); }}>
                        <DollarSign size={12} /> Pay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Customer Debt Modal */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--text-main)' }}>Add customer debt</h3>
            <form onSubmit={handleAddDebtSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <input type="text" className="input-field" placeholder="Customer name" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <input type="number" step="0.01" className="input-field" placeholder="Amount owed (ZAR)" required value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
              <div>
                <input type="text" className="input-field" placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
              </div>
              <button type="submit" className="btn-blue" style={{ marginTop: 8 }}>
                Add debt
              </button>
              <button type="button" className="btn-outline" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {payModal && selectedCust && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--text-main)' }}>Record Payment for {selectedCust.name}</h3>
            <form onSubmit={handlePaySubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Amount Received (ZAR)</label>
                <input type="number" step="0.01" className="input-field" required value={payAmt} onChange={(e) => setPayAmt(e.target.value)} />
              </div>
              <button type="submit" className="btn-blue" style={{ marginTop: 8 }}>
                Confirm Payment
              </button>
              <button type="button" className="btn-outline" onClick={() => setPayModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
