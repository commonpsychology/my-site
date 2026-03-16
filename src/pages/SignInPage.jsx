import { useState } from 'react'
import { useRouter } from '../context/RouterContext'

export default function SignInPage() {
  const { navigate } = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const inputStyle = {
    width: '100%',
    padding: '0.85rem 1rem',
    border: '2px solid var(--earth-cream)',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    outline: 'none',
    color: 'var(--text-dark)',
    transition: 'border-color 0.2s',
    background: 'var(--white)',
    boxSizing: 'border-box',
  }

  return (
    /*
     * Outer shell: fills viewport height, allows scroll if content overflows.
     * flexbox with stretch so both panels fill full height on tall screens.
     */
    <div style={{
      minHeight: '100vh',
      background: 'var(--green-mist)',
      display: 'flex',
      alignItems: 'stretch',
      overflow: 'hidden',      /* clip outer; inner panels handle their own scroll */
    }}>

      {/* ══════════════════════════════
          LEFT DECORATIVE PANEL
          Hidden below 900 px via CSS class
      ══════════════════════════════ */}
      <div className="auth-panel-left" style={{
        overflowY: 'auto',     /* scroll if viewport is very short */
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2.5rem',
      }}>
        <div style={{ textAlign: 'center', width: '100%', maxWidth: 320 }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1.25rem' }}>🌿</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.9rem',
            color: 'var(--green-deep)',
            marginBottom: '0.9rem',
            lineHeight: 1.3,
          }}>
            Your Wellness<br />Journey Awaits
          </h2>
          <p style={{
            color: 'var(--text-light)',
            fontSize: '0.92rem',
            lineHeight: 1.75,
            maxWidth: 280,
            margin: '0 auto',
          }}>
            Access your therapy sessions, assessments, mood tracker, and wellness
            resources — all in one place.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {[
              '🧠 Book therapy sessions online',
              '📋 Take free mental health assessments',
              '📖 Access 50+ wellness resources',
              '📊 Track your mood daily',
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: 'var(--white)',
                borderRadius: 'var(--radius-md)',
                padding: '0.7rem 1rem',
                fontSize: '0.83rem',
                color: 'var(--text-mid)',
                fontWeight: 500,
                textAlign: 'left',
              }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          RIGHT FORM PANEL
          Scrolls independently so card is never cut off
      ══════════════════════════════ */}
      <div style={{
        flex: 1,
        overflowY: 'auto',         /* THIS is the key fix — panel scrolls, not window */
        display: 'flex',
        alignItems: 'flex-start',  /* align-start + padding = card never clips */
        justifyContent: 'center',
        padding: '3rem 1.5rem',    /* top/bottom padding ensures card isn't flush against edges */
      }}>
        <div style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          width: '100%',
          maxWidth: 420,
          boxShadow: 'var(--shadow-strong)',
          boxSizing: 'border-box',
        }}>

          {/* Logo */}
          <div
            style={{ textAlign: 'center', marginBottom: '1.75rem', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <div style={{
              width: 46, height: 46,
              background: 'var(--green-deep)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 0.75rem',
            }}>
              <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, fill: 'white' }}>
                <path d="M12 2C8.5 2 5.5 4.5 5 8c-.3 2 .5 4 2 5.5L12 22l5-8.5c1.5-1.5 2.3-3.5 2-5.5C18.5 4.5 15.5 2 12 2zm0 9a3 3 0 110-6 3 3 0 010 6z" />
              </svg>
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              color: 'var(--green-deep)',
            }}>
              Puja Samargi
            </div>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.55rem',
            color: 'var(--green-deep)',
            textAlign: 'center',
            marginBottom: '0.35rem',
          }}>
            Welcome Back
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-light)',
            fontSize: '0.88rem',
            marginBottom: '1.75rem',
          }}>
            Sign in to your wellness account
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Email */}
            <div>
              <label style={{
                display: 'block', fontSize: '0.82rem',
                fontWeight: 600, color: 'var(--text-mid)', marginBottom: '0.4rem',
              }}>
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--green-soft)'}
                onBlur={e  => e.target.style.borderColor = 'var(--earth-cream)'}
              />
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-mid)' }}>
                  Password
                </label>
                <a href="#" style={{ fontSize: '0.78rem', color: 'var(--green-mid)', textDecoration: 'none' }}>
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => update('password', e.target.value)}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--green-soft)'}
                onBlur={e  => e.target.style.borderColor = 'var(--earth-cream)'}
              />
            </div>

            {/* Submit */}
            <button
              className="btn btn-primary btn-lg"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.25rem' }}
              onClick={() => navigate('/')}
            >
              Sign In →
            </button>

            {/* Divider */}
            <div style={{ textAlign: 'center', position: 'relative', margin: '0.1rem 0' }}>
              <div style={{
                position: 'absolute', top: '50%', left: 0, right: 0,
                height: 1, background: 'var(--earth-cream)',
              }} />
              <span style={{
                position: 'relative', background: 'var(--white)',
                padding: '0 0.75rem', fontSize: '0.78rem', color: 'var(--text-light)',
              }}>
                or continue with
              </span>
            </div>

            {/* Google */}
            <button
              className="btn btn-outline btn-lg"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => navigate('/')}
            >
              🌐 Google
            </button>
          </div>

          <p style={{
            textAlign: 'center', fontSize: '0.82rem',
            color: 'var(--text-light)', marginTop: '1.5rem',
          }}>
            Don't have an account?{' '}
            <span
              style={{ color: 'var(--green-mid)', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => navigate('/register')}
            >
              Create one →
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}