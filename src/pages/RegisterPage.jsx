import { useState } from 'react'
import { useRouter } from '../context/RouterContext'

export default function RegisterPage() {
  const { navigate } = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'client' })
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const inputStyle = {
    width: '100%', padding: '0.85rem 1rem',
    border: '2px solid var(--earth-cream)',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-body)', fontSize: '0.95rem',
    outline: 'none', color: 'var(--text-dark)',
    transition: 'border 0.2s', background: 'var(--white)',
  }
  const focus = e => e.target.style.borderColor = 'var(--green-soft)'
  const blur  = e => e.target.style.borderColor = 'var(--earth-cream)'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--earth-cream)', display: 'flex' }}>
      {/* Left decorative panel */}
      <div className="auth-panel-left">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🧠</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--green-deep)', marginBottom: '1rem', lineHeight: 1.3 }}>
            Start Your<br />Healing Journey
          </h2>
          <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 280, margin: '0 auto' }}>
            Join thousands of Nepalis who have taken the first step toward better mental health with Puja Samargi.
          </p>
          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {['✅ Free mental health assessments', '🔒 Private & confidential sessions', '🌿 Culturally sensitive therapists', '📱 Access from anywhere in Nepal'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--text-mid)', fontWeight: 500 }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', width: '100%', maxWidth: 440, boxShadow: 'var(--shadow-strong)' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '1.75rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div style={{ width: 46, height: 46, background: 'var(--green-deep)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
              <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, fill: 'white' }}>
                <path d="M12 2C8.5 2 5.5 4.5 5 8c-.3 2 .5 4 2 5.5L12 22l5-8.5c1.5-1.5 2.3-3.5 2-5.5C18.5 4.5 15.5 2 12 2zm0 9a3 3 0 110-6 3 3 0 010 6z"/>
              </svg>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--green-deep)' }}>Puja Samargi</div>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--green-deep)', textAlign: 'center', marginBottom: '0.4rem' }}>Create Account</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>Start your mental wellness journey today</p>

          {/* Role toggle */}
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', background: 'var(--off-white)', padding: '4px', borderRadius: 'var(--radius-sm)' }}>
            {['client', 'therapist'].map(r => (
              <button key={r} onClick={() => update('role', r)}
                style={{ flex: 1, padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 500, background: form.role === r ? 'var(--green-deep)' : 'transparent', color: form.role === r ? 'white' : 'var(--text-mid)', transition: 'all 0.2s' }}>
                {r === 'client' ? '🙋 I am a Client' : '👩‍⚕️ I am a Therapist'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {[['Full Name', 'name', 'text', 'Your full name'], ['Email', 'email', 'email', 'your@email.com'], ['Phone', 'phone', 'tel', '98XXXXXXXX'], ['Password', 'password', 'password', 'Create a strong password']].map(([label, key, type, ph]) => (
              <div key={key}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>{label}</label>
                <input type={type} placeholder={ph} value={form[key]} onChange={e => update(key, e.target.value)} style={inputStyle} onFocus={focus} onBlur={blur} />
              </div>
            ))}

            <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', lineHeight: 1.5 }}>
              By registering you agree to our{' '}
              <span style={{ color: 'var(--green-mid)', cursor: 'pointer' }}>Terms of Service</span> and{' '}
              <span style={{ color: 'var(--green-mid)', cursor: 'pointer' }}>Privacy Policy</span>.
            </p>

            <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/')}>
              Create Account →
            </button>
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-light)', marginTop: '1.25rem' }}>
            Already have an account?{' '}
            <span style={{ color: 'var(--green-mid)', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/signin')}>
              Sign in →
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}