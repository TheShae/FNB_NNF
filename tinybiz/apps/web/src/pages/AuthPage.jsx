import React, { useState } from 'react';
import { Lock, Mail, Store, Eye, Check } from 'lucide-react';

export default function AuthPage({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('sipho@spaza.co.za');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [businessName, setBusinessName] = useState('My shop');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      isAuthenticated: true,
      user: { email, shop: businessName, name: 'Sipho Ndlovu' },
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-canvas)', padding: 16 }}>
      <div className="card-white" style={{ width: '100%', maxWidth: 420, padding: 28, borderRadius: 20 }}>
        {/* Sign in / Create account Toggle */}
        <div style={{ display: 'flex', backgroundColor: 'var(--surface-inset)', padding: 4, borderRadius: 14, marginBottom: 20 }}>
          <button
            onClick={() => setIsRegister(false)}
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 700,
              backgroundColor: !isRegister ? '#FFFFFF' : 'transparent',
              color: !isRegister ? 'var(--text-main)' : 'var(--text-muted)',
              border: !isRegister ? '1px solid var(--border-slate)' : 'none',
              boxShadow: !isRegister ? 'var(--shadow-card)' : 'none',
            }}
          >
            {!isRegister && '✓ '}Sign in
          </button>
          <button
            onClick={() => setIsRegister(true)}
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 700,
              backgroundColor: isRegister ? 'var(--color-success-bg)' : 'transparent',
              color: isRegister ? 'var(--color-success)' : 'var(--text-muted)',
              border: isRegister ? '1px solid rgba(21, 128, 61, 0.2)' : 'none',
            }}
          >
            {isRegister && '✓ '}Create account
          </button>
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-main)' }}>
          {isRegister ? 'Create your TinyBiz account' : 'Welcome back'}
        </h3>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>
          Sign-in is optional. Your local business records continue to work offline.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {isRegister && (
            <div>
              <input type="text" className="input-field" placeholder="Business name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
            </div>
          )}

          <div>
            <input type="email" className="input-field" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div style={{ position: 'relative' }}>
            <input type={showPass ? 'text' : 'password'} className="input-field" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: 12, background: 'none', border: 'none', color: 'var(--text-muted)' }}>
              <Eye size={16} />
            </button>
          </div>

          {isRegister && (
            <div>
              <input type="password" className="input-field" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          )}

          <button type="submit" className="btn-blue" style={{ padding: 12, marginTop: 8 }}>
            {isRegister ? 'Create account' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
