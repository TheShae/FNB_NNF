import React, { useState } from 'react';
import {
  Store, RefreshCw, HardDriveUpload, Download, Share2, Lock,
  ChevronRight, Shield, HelpCircle, Star, RotateCcw, AlertTriangle, Check
} from 'lucide-react';

export default function SettingsPage({ businessSetup, onSaveBusinessSetup, onReloadDemoData, onExportBackup, onRestoreBackup, pinSet, onSetPin }) {
  const [activeDrawer, setActiveDrawer] = useState(null); // 'business', 'backup', 'pin', 'resetModal'
  const [bName, setBName] = useState(businessSetup.businessName || 'My shop');
  const [bType, setBType] = useState(businessSetup.businessType || 'Retail');
  const [bCurr, setBCurr] = useState(businessSetup.currency || 'ZAR');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinSaved, setPinSaved] = useState(false);
  const [backupMsg, setBackupMsg] = useState('');

  const handleSaveBusiness = (e) => {
    e.preventDefault();
    onSaveBusinessSetup({ businessName: bName, businessType: bType, currency: bCurr });
    setActiveDrawer(null);
  };

  const handleSavePinSubmit = (e) => {
    e.preventDefault();
    if (newPin && newPin === confirmPin) {
      onSetPin(newPin);
      setPinSaved(true);
      setTimeout(() => { setPinSaved(false); setActiveDrawer(null); }, 1500);
    }
  };

  const handleTriggerBackupDownload = () => {
    const jsonStr = onExportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tinybiz_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    setBackupMsg('Backup saved to tinybiz_backup.json!');
    setTimeout(() => setBackupMsg(''), 3000);
  };

  const handleRestoreFileSelected = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const success = onRestoreBackup(event.target.result);
        if (success) {
          setBackupMsg('Backup restored successfully!');
          setTimeout(() => { setBackupMsg(''); setActiveDrawer(null); }, 2000);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 600, margin: '0 auto' }}>
      <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Settings</h3>

      {backupMsg && (
        <div className="card-white" style={{ backgroundColor: 'var(--accent-blue)', color: '#FFF', padding: 12, borderRadius: 12, textAlign: 'center', fontWeight: 600 }}>
          {backupMsg}
        </div>
      )}

      {/* Business Section */}
      <div className="card-white" style={{ padding: 0 }}>
        <div style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-slate)', textTransform: 'uppercase' }}>
          Business
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer', borderBottom: '1px solid var(--border-slate)' }} onClick={() => setActiveDrawer('business')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="card-inset" style={{ padding: 8, borderRadius: 10, color: 'var(--accent-blue)' }}><Store size={18} /></div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Business setup</div>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Name, business type, currency, and opening date</span>
            </div>
          </div>
          <ChevronRight size={18} color="var(--text-muted)" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid var(--border-slate)', fontSize: 14 }}>
          <span style={{ color: 'var(--text-muted)' }}>Business name</span>
          <strong style={{ fontWeight: 700 }}>{businessSetup.businessName || 'My shop'}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid var(--border-slate)', fontSize: 14 }}>
          <span style={{ color: 'var(--text-muted)' }}>Currency</span>
          <strong style={{ fontWeight: 700 }}>{businessSetup.currency || 'ZAR'}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', fontSize: 14 }}>
          <span style={{ color: 'var(--text-muted)' }}>Tax rate</span>
          <strong style={{ fontWeight: 700 }}>0.00%</strong>
        </div>
      </div>

      {/* Network & Data Section */}
      <div className="card-white" style={{ padding: 0 }}>
        <div style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-slate)', textTransform: 'uppercase' }}>
          Network & data
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid var(--border-slate)', fontSize: 14 }}>
          <span style={{ color: 'var(--text-muted)' }}>Connection status</span>
          <span className="badge-pill badge-success">Online</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer', borderBottom: '1px solid var(--border-slate)' }} onClick={() => setActiveDrawer('backup')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="card-inset" style={{ padding: 8, borderRadius: 10, color: 'var(--accent-blue)' }}><HardDriveUpload size={18} /></div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Backup & restore</div>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Export or import your local JSON data</span>
            </div>
          </div>
          <ChevronRight size={18} color="var(--text-muted)" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer' }} onClick={() => setActiveDrawer('resetModal')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="card-inset" style={{ padding: 8, borderRadius: 10, color: 'var(--color-danger)' }}><RotateCcw size={18} /></div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Reset demo data</div>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Re-seed with demo products and events</span>
            </div>
          </div>
          <ChevronRight size={18} color="var(--text-muted)" />
        </div>
      </div>

      {/* Security Section */}
      <div className="card-white" style={{ padding: 0 }}>
        <div style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-slate)', textTransform: 'uppercase' }}>
          Security
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer', borderBottom: '1px solid var(--border-slate)' }} onClick={() => setActiveDrawer('pin')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="card-inset" style={{ padding: 8, borderRadius: 10, color: 'var(--accent-blue)' }}><Lock size={18} /></div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>PIN and app lock</div>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{pinSet ? 'App PIN is active' : 'Set up, change, or turn off PIN'}</span>
            </div>
          </div>
          <ChevronRight size={18} color="var(--text-muted)" />
        </div>
      </div>

      {/* Business Setup Modal */}
      {activeDrawer === 'business' && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Business setup</h3>
            <form onSubmit={handleSaveBusiness} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-blue)', display: 'block', marginBottom: 4 }}>Business name</label>
                <input type="text" className="input-field" value={bName} onChange={(e) => setBName(e.target.value)} required />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-blue)', display: 'block', marginBottom: 4 }}>Business type</label>
                <select className="input-field" value={bType} onChange={(e) => setBType(e.target.value)}>
                  <option value="Retail">Retail</option>
                  <option value="Wholesale">Wholesale</option>
                  <option value="Services">Services</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-blue)', display: 'block', marginBottom: 4 }}>Currency</label>
                <select className="input-field" value={bCurr} onChange={(e) => setBCurr(e.target.value)}>
                  <option value="ZAR">ZAR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <button type="submit" className="btn-blue" style={{ marginTop: 8 }}>Save business details</button>
              <button type="button" className="btn-outline" onClick={() => setActiveDrawer(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Backup Drawer */}
      {activeDrawer === 'backup' && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Backup & restore</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button className="btn-outline" style={{ justifyContent: 'flex-start', padding: 12 }} onClick={handleTriggerBackupDownload}>
                <Download size={18} color="var(--color-success)" /> Export backup to JSON file
              </button>
              <label className="btn-outline" style={{ justifyContent: 'flex-start', padding: 12, cursor: 'pointer' }}>
                <HardDriveUpload size={18} color="var(--accent-blue)" /> Restore from JSON file
                <input type="file" accept=".json" style={{ display: 'none' }} onChange={handleRestoreFileSelected} />
              </label>
              <button className="btn-outline" onClick={() => setActiveDrawer(null)} style={{ marginTop: 8 }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* PIN Setup Drawer */}
      {activeDrawer === 'pin' && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Set up PIN</h3>
            <form onSubmit={handleSavePinSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <input type="password" maxLength={4} className="input-field" placeholder="New PIN (4 digits)" value={newPin} onChange={(e) => setNewPin(e.target.value)} required />
              </div>
              <div>
                <input type="password" maxLength={4} className="input-field" placeholder="Confirm PIN" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} required />
              </div>
              {pinSaved ? (
                <div style={{ color: 'var(--color-success)', fontSize: 13, fontWeight: 700, textAlign: 'center' }}>✓ PIN Saved!</div>
              ) : (
                <button type="submit" className="btn-blue">Save PIN</button>
              )}
              <button type="button" className="btn-outline" onClick={() => setActiveDrawer(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Reset Demo Data Modal */}
      {activeDrawer === 'resetModal' && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8, color: 'var(--text-main)' }}>Reset demo data?</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
              This will add the demo products and events to your current local store. It will not delete your existing data.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button className="btn-outline" onClick={() => setActiveDrawer(null)}>Cancel</button>
              <button className="btn-blue" onClick={() => { onReloadDemoData(); setActiveDrawer(null); }}>Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
