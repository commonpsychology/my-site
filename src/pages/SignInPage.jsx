import { useState } from 'react'
import { useRouter } from '../context/RouterContext'

export default function SignInPage() {
  const { navigate } = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const inputStyle = {
    width: '100%', padding: '0.85rem 1rem',
    border: '2px solid var(--earth-cream)',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-body)', fontSize: '0.95rem',
    outline: 'none', color: 'var(--text-dark)',
    transition: 'border 0.2s', background: 'var(--white)',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--green-mist)', display: 'flex' }}>
      {/* Left decorative panel */}
      <div className="auth-panel-left">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🌿</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--green-deep)', marginBottom: '1rem', lineHeight: 1.3 }}>
            Your Wellness<br />Journey Awaits
          </h2>
          <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 280, margin: '0 auto' }}>
            Access your therapy sessions, assessments, mood tracker, and wellness resources — all in one place.
          </p>
          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {['🧠 Book therapy sessions online', '📋 Take free mental health assessments', '📖 Access 50+ wellness resources', '📊 Track your mood daily'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--text-mid)', fontWeight: 500 }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', width: '100%', maxWidth: 420, boxShadow: 'var(--shadow-strong)' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div style={{ width: 46, height: 46, background: 'var(--green-deep)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
              <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, fill: 'white' }}>
                <path d="M12 2C8.5 2 5.5 4.5 5 8c-.3 2 .5 4 2 5.5L12 22l5-8.5c1.5-1.5 2.3-3.5 2-5.5C18.5 4.5 15.5 2 12 2zm0 9a3 3 0 110-6 3 3 0 010 6z"/>
              </svg>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--green-deep)' }}>Puja Samargi</div>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--green-deep)', textAlign: 'center', marginBottom: '0.4rem' }}>Welcome Back</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: '0.88rem', marginBottom: '2rem' }}>Sign in to your wellness account</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-mid)', marginBottom: '0.4rem' }}>Email</label>
              <input type="email" placeholder="your@email.com" value={form.email} onChange={e => update('email', e.target.value)} style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--green-soft)'}
                onBlur={e => e.target.style.borderColor = 'var(--earth-cream)'} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-mid)' }}>Password</label>
                <a href="#" style={{ fontSize: '0.78rem', color: 'var(--green-mid)' }}>Forgot password?</a>
              </div>
              <input type="password" placeholder="••••••••" value={form.password} onChange={e => update('password', e.target.value)} style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--green-soft)'}
                onBlur={e => e.target.style.borderColor = 'var(--earth-cream)'} />
            </div>

            <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '0.25rem' }} onClick={() => navigate('/')}>
              Sign In →
            </button>

            <div style={{ textAlign: 'center', position: 'relative', margin: '0.25rem 0' }}>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--earth-cream)' }} />
              <span style={{ position: 'relative', background: 'white', padding: '0 0.75rem', fontSize: '0.78rem', color: 'var(--text-light)' }}>or continue with</span>
            </div>

            <button className="btn btn-outline btn-lg" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/')}>
              🌐 Google
            </button>
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-light)', marginTop: '1.5rem' }}>
            Don't have an account?{' '}
            <span style={{ color: 'var(--green-mid)', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/register')}>
              Create one →
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}