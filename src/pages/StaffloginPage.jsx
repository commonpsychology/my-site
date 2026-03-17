import { useState } from 'react'
import { useRouter } from '../context/RouterContext'

/* ── Palette matching navbar exactly ── */
const C = {
  skyBright:  '#00BFFF',
  skyMid:     '#009FD4',
  skyDeep:    '#007BA8',
  skyFaint:   '#E0F7FF',
  skyFainter: '#F0FBFF',
  skyGhost:   '#F8FEFF',
  white:      '#ffffff',
  mint:       '#e8f3ee',
  mintPale:   '#b8d5c8',
  textDark:   '#1a3a4a',
  textMid:    '#2e6080',
  textLight:  '#7a9aaa',
  border:     '#b0d4e8',
  borderFaint:'#daeef8',
  green:      '#0B6623',
}

const navbarGrad = `linear-gradient(to right,
  #00BFFF 0%, #00BFFF 2%,
  #e8f3ee 40%, #f0f8f4 60%,
  #f8fcfa 80%, #ffffff 100%)`

const heroGrad = `linear-gradient(135deg,
  ${C.skyDeep} 0%, ${C.skyMid} 45%,
  ${C.skyBright} 85%, #22d3ee 100%)`

const btnGrad = `linear-gradient(135deg, ${C.skyDeep} 0%, ${C.skyBright} 100%)`
// eslint-disable-next-line no-unused-vars
const sectionGrad = `linear-gradient(135deg, ${C.skyFainter} 0%, ${C.mint} 60%, ${C.skyFaint} 100%)`

/* Mock staff credentials */
const STAFF = [
  { id: 'admin-1',      email: 'admin@pujasamargi.com.np',   password: 'admin123',   role: 'admin',     name: 'Admin — Puja Samargi' },
  { id: 'therapist-1',  email: 'anita@pujasamargi.com.np',   password: 'anita123',   role: 'therapist', name: 'Dr. Anita Shrestha' },
  { id: 'therapist-2',  email: 'sunita@pujasamargi.com.np',  password: 'sunita123',  role: 'therapist', name: 'Dr. Sunita Rai' },
  { id: 'therapist-3',  email: 'rohan@pujasamargi.com.np',   password: 'rohan123',   role: 'therapist', name: 'Rohan Karki' },
  { id: 'therapist-4',  email: 'prabha@pujasamargi.com.np',  password: 'prabha123',  role: 'therapist', name: 'Prabha Thapa' },
]

function FloatingInput({ label, type = 'text', value, onChange, placeholder, required }) {
  const [focused, setFocused] = useState(false)
  const active = focused || value

  return (
    <div style={{ position: 'relative', marginBottom: '1.4rem' }}>
      <label style={{
        position: 'absolute',
        left: '1rem',
        top: active ? '-0.55rem' : '0.85rem',
        fontSize: active ? '0.68rem' : '0.9rem',
        fontWeight: active ? 800 : 400,
        color: active ? C.skyMid : C.textLight,
        background: active ? C.white : 'transparent',
        padding: active ? '0 0.35rem' : '0',
        pointerEvents: 'none',
        transition: 'all 0.18s ease',
        letterSpacing: active ? '0.08em' : '0',
        textTransform: active ? 'uppercase' : 'none',
        fontFamily: 'var(--font-body)',
        zIndex: 1,
      }}>
        {label}{required && <span style={{ color: C.skyBright, marginLeft: 2 }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ''}
        style={{
          width: '100%',
          padding: '0.85rem 1rem',
          border: `1.5px solid ${focused ? C.skyBright : C.borderFaint}`,
          borderRadius: 12,
          fontFamily: 'var(--font-body)',
          fontSize: '0.92rem',
          color: C.textDark,
          background: focused ? C.skyGhost : C.white,
          outline: 'none',
          boxSizing: 'border-box',
          boxShadow: focused ? `0 0 0 3.5px rgba(0,191,255,0.12)` : 'none',
          transition: 'all 0.2s ease',
        }}
      />
    </div>
  )
}

export default function StaffLoginPage() {
  const { navigate } = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise(r => setTimeout(r, 800)) // simulate network

    const staff = STAFF.find(s => s.email === email.trim().toLowerCase() && s.password === password)
    if (!staff) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
      return
    }

    /* Store session */
    sessionStorage.setItem('staffUser', JSON.stringify(staff))

    setLoading(false)
    if (staff.role === 'admin') navigate('/staff/admin')
    else navigate('/staff/therapist')
  }

  return (
    <div style={{ minHeight: '100vh', background: C.skyGhost, display: 'flex', flexDirection: 'column' }}>

      {/* Top strip matching navbar */}
      <div style={{ height: 4, background: navbarGrad }} />

      {/* Split layout */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 4px)' }}>

        {/* Left — gradient hero panel */}
        <div style={{
          background: heroGrad,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '4rem 3rem', position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative circles */}
          <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '40%', left: '60%', width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '3rem', position: 'relative' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', border: '2px solid rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
                <path d="M12 2C8.5 2 5.5 4.5 5 8c-.3 2 .5 4 2 5.5L12 22l5-8.5c1.5-1.5 2.3-3.5 2-5.5C18.5 4.5 15.5 2 12 2zm0 9a3 3 0 110-6 3 3 0 010 6z"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'white', lineHeight: 1.1 }}>Puja Samargi</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Mental Wellness Center</div>
            </div>
          </div>

          {/* Headline */}
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 100, padding: '0.3rem 1rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>🔐 Staff Portal</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: 'white', lineHeight: 1.2, marginBottom: '1rem' }}>
              Welcome Back,<br />Team Samargi
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.75, maxWidth: 360 }}>
              Your secure portal for managing client sessions, appointments, and care records.
            </p>
          </div>

          {/* Feature pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '2.5rem', width: '100%', maxWidth: 340, position: 'relative' }}>
            {[
              { icon: '📅', text: 'Manage & view all bookings' },
              { icon: '👥', text: 'Access client profiles & notes' },
              { icon: '📊', text: 'Track session history & progress' },
              { icon: '🔔', text: 'Receive real-time notifications' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, padding: '0.65rem 1rem' }}>
                <span style={{ fontSize: '1rem' }}>{f.icon}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.88)', fontWeight: 500 }}>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Demo credentials hint */}
          <div style={{ marginTop: '2rem', position: 'relative', background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '1rem 1.25rem', border: '1px solid rgba(255,255,255,0.2)', width: '100%', maxWidth: 340 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 800, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Demo Credentials</div>
            {[
              { role: 'Admin', email: 'admin@pujasamargi.com.np', pw: 'admin123' },
              { role: 'Therapist', email: 'anita@pujasamargi.com.np', pw: 'anita123' },
            ].map((c, i) => (
              <div key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)', marginBottom: i === 0 ? '0.4rem' : 0 }}>
                <strong style={{ color: 'rgba(255,255,255,0.95)' }}>{c.role}:</strong> {c.email} / {c.pw}
              </div>
            ))}
          </div>
        </div>

        {/* Right — login form */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 3rem', background: C.white }}>
          <div style={{ width: '100%', maxWidth: 400 }}>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', color: C.textDark, marginBottom: '0.4rem' }}>Sign In</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: C.textLight, marginBottom: '2.5rem' }}>
              Use your staff credentials to continue.
            </p>

            {error && (
              <div style={{ background: '#fff5f5', border: '1.5px solid #ffcccc', borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '1.25rem', fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: '#c62828', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <FloatingInput label="Staff Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@pujasamargi.com.np" required />
              <div style={{ position: 'relative' }}>
                <FloatingInput label="Password" type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" required />
                <button type="button" onClick={() => setShowPw(s => !s)} style={{ position: 'absolute', right: '1rem', top: '0.82rem', background: 'none', border: 'none', cursor: 'pointer', color: C.textLight, fontSize: '0.8rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                  {showPw ? 'Hide' : 'Show'}
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.75rem', marginTop: '-0.5rem' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: C.skyMid, fontWeight: 600, cursor: 'pointer' }}>Forgot password?</span>
              </div>

              <button type="submit" disabled={loading || !email || !password} style={{
                width: '100%', padding: '0.9rem', borderRadius: 12, border: 'none',
                background: loading || !email || !password ? C.borderFaint : btnGrad,
                color: loading || !email || !password ? C.textLight : 'white',
                fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem',
                cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
                boxShadow: !loading && email && password ? '0 6px 22px rgba(0,191,255,0.32)' : 'none',
                transition: 'all 0.2s',
                letterSpacing: '0.02em',
              }}>
                {loading ? '⏳ Signing in…' : 'Sign In to Portal →'}
              </button>
            </form>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: `1px solid ${C.borderFaint}` }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: C.textLight, textAlign: 'center' }}>
                Having trouble? Contact{' '}
                <span style={{ color: C.skyMid, fontWeight: 600 }}>admin@pujasamargi.com.np</span>
              </p>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <span onClick={() => navigate('/')} style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: C.textLight, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                ← Back to main site
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}