import { useState, useEffect } from 'react'
import { useRouter } from '../context/RouterContext'

const SKY     = '#0ea5e9'
const SKY_L   = '#e0f2fe'
const SKY_D   = '#0369a1'
const MINT    = '#10b981'
const MINT_L  = '#d1fae5'
const SLATE   = '#1e293b'
const SLATE_M = '#64748b'
const SLATE_L = '#94a3b8'
const BORDER  = '#e2e8f0'
const BG      = '#f8fafc'
const WHITE   = '#ffffff'

const CSS = `
  .account-root {
    background: ${BG};
    min-height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
  }
  .account-hero {
    background: linear-gradient(135deg, ${SKY_D} 0%, ${SKY} 55%, #22d3ee 100%) !important;
    padding: calc(72px + 1.5rem) 1rem 4.5rem;
    position: relative;
    overflow: hidden;
  }
  .account-hero-inner {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    position: relative;
  }
  .account-hero-inner h1 { color: #ffffff !important; }
  .account-hero-inner p  { color: rgba(255,255,255,0.75) !important; }
  .account-hero-inner button {
    color: #ffffff !important;
    border-color: rgba(255,255,255,0.35) !important;
    background: rgba(255,255,255,0.12) !important;
  }
  .account-hero-avatar { color: #ffffff !important; }
  .account-stats {
    max-width: 1100px;
    margin: -2rem auto 0;
    padding: 0 1rem;
    position: relative;
    z-index: 10;
  }
  .account-stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
  .account-layout {
    max-width: 1100px;
    margin: 1.5rem auto 0;
    padding: 0 1rem 5rem;
    display: block;
  }
  .account-sidebar { display: none; }
  .account-tab-pills {
    display: flex;
    gap: 0.35rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    margin-bottom: 1.25rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .account-tab-pills::-webkit-scrollbar { display: none; }
  .account-tab-pill {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.9rem;
    border-radius: 100px;
    border: 1.5px solid ${BORDER};
    background: ${WHITE};
    color: ${SLATE_M};
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: all 0.15s;
    font-family: inherit;
  }
  .account-tab-pill.active {
    border-color: ${SKY};
    background: ${SKY_L};
    color: ${SKY_D};
    font-weight: 700;
  }
  .account-bottom-tabs {
    display: flex;
    position: fixed;
    bottom: 0; left: 0; right: 0;
    background: ${WHITE};
    border-top: 1px solid ${BORDER};
    z-index: 200;
    box-shadow: 0 -4px 16px rgba(0,0,0,0.06);
  }
  .account-bottom-tab {
    flex: 1;
    padding: 0.55rem 0.25rem;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    border-top: 2.5px solid transparent;
    font-family: inherit;
    transition: all 0.15s;
  }
  .account-bottom-tab.active { border-top-color: ${SKY}; }
  .account-bottom-tab-label {
    font-size: 0.58rem;
    font-weight: 500;
    color: ${SLATE_L};
    line-height: 1;
  }
  .account-bottom-tab.active .account-bottom-tab-label {
    color: ${SKY_D};
    font-weight: 700;
  }
  .field-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0 1.25rem;
  }
  .field-full { grid-column: 1 / -1; }
  .plan-mini-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
  }
  .stat-badge {
    background: ${WHITE};
    border-radius: 14px;
    padding: 0.85rem 0.5rem;
    border: 1.5px solid ${BORDER};
    text-align: center;
    min-width: 0;
    cursor: pointer;
    transition: box-shadow 0.15s, transform 0.15s;
  }
  .stat-badge:hover {
    box-shadow: 0 4px 16px rgba(14,165,233,0.12);
    transform: translateY(-2px);
  }
  .danger-card {
    background: #fff5f5;
    border: 1.5px solid #fecaca;
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1.1rem;
  }
  .action-btn { width: 100%; box-sizing: border-box; }

  @media (min-width: 640px) {
    .account-hero    { padding: calc(72px + 1.5rem) 2rem 4.5rem; }
    .account-stats   { padding: 0 2rem; }
    .account-stats-grid { grid-template-columns: repeat(4, 1fr); }
    .account-layout  { padding: 0 2rem 3rem; }
    .account-bottom-tabs { display: none; }
    .field-grid      { grid-template-columns: 1fr 1fr; }
    .action-btn      { width: auto; }
  }
  @media (min-width: 1024px) {
    .account-hero   { padding: calc(72px + 2rem) 3rem 5rem; }
    .account-stats  { padding: 0 3rem; }
    .account-layout {
      padding: 0 3rem 3rem;
      display: grid;
      grid-template-columns: 210px 1fr;
      gap: 1.75rem;
      align-items: start;
    }
    .account-sidebar {
      display: block;
      background: ${WHITE};
      border-radius: 16px;
      border: 1.5px solid ${BORDER};
      padding: 0.5rem;
      position: sticky;
      top: 5rem;
    }
    .account-tab-pills   { display: none; }
    .account-bottom-tabs { display: none !important; }
  }
`

function injectCSS() {
  if (document.getElementById('account-page-css')) return
  const el = document.createElement('style')
  el.id = 'account-page-css'
  el.textContent = CSS
  document.head.appendChild(el)
}

const TABS = [
  { id: 'profile',  label: 'Profile',        short: 'Profile',  icon: '👤' },
  { id: 'security', label: 'Security',        short: 'Security', icon: '🔒' },
  { id: 'sessions', label: 'Sessions & Plan', short: 'Plan',     icon: '📅' },
  { id: 'notifs',   label: 'Notifications',   short: 'Alerts',   icon: '🔔' },
  { id: 'privacy',  label: 'Privacy & Data',  short: 'Privacy',  icon: '🛡️' },
]

function Btn({ onClick, variant, size, children, fullWidth, danger, disabled, style }) {
  variant = variant || 'primary'
  size    = size    || 'md'

  const pad   = size === 'sm' ? '0.38rem 0.9rem'  : size === 'lg' ? '0.75rem 2rem'  : '0.55rem 1.25rem'
  const fsize = size === 'sm' ? '0.76rem'          : size === 'lg' ? '0.95rem'       : '0.82rem'

  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    padding: pad, borderRadius: 10, fontFamily: 'inherit', fontSize: fsize,
    fontWeight: 700, cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1, border: 'none',
    transition: 'all 0.18s', whiteSpace: 'nowrap',
    width: fullWidth ? '100%' : undefined,
    boxSizing: 'border-box',
  }

  const variants = {
    primary:    { background: `linear-gradient(135deg,${SKY_D},${SKY})`, color: WHITE, boxShadow: '0 3px 12px rgba(14,165,233,0.28)' },
    outline:    { background: WHITE,   color: SKY_D,     border: `1.5px solid ${SKY}`    },
    ghost:      { background: SKY_L,   color: SKY_D,     border: `1.5px solid ${BORDER}` },
    muted:      { background: WHITE,   color: SLATE_M,   border: `1.5px solid ${BORDER}` },
    danger:     { background: WHITE,   color: '#e53e3e', border: '1.5px solid #e53e3e'   },
    dangerFill: { background: '#e53e3e', color: WHITE,   boxShadow: '0 3px 10px rgba(229,62,62,0.3)' },
    white:      { background: 'rgba(255,255,255,0.18)', color: WHITE, border: '1.5px solid rgba(255,255,255,0.35)' },
  }

  const chosen = danger ? variants.danger : (variants[variant] || variants.primary)

  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{ ...base, ...chosen, ...style }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.opacity = '0.85' }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.opacity = '1'    }}
    >
      {children}
    </button>
  )
}

function Card({ children, className, style }) {
  return (
    <div
      className={className}
      style={{ background: WHITE, borderRadius: 16, border: `1.5px solid ${BORDER}`, padding: '1.5rem', marginBottom: '1.1rem', ...style }}
    >
      {children}
    </div>
  )
}

function SectionTitle({ children, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: SLATE, margin: 0 }}>{children}</h3>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  )
}

function Field({ label, value, type, editing, onChange, placeholder, hint, fullWidth }) {
  type = type || 'text'
  return (
    <div style={{ marginBottom: '0.9rem' }} className={fullWidth ? 'field-full' : ''}>
      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: SLATE_M, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.3rem' }}>
        {label}
      </label>
      {editing ? (
        <input
          type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={{ width: '100%', padding: '0.65rem 0.9rem', border: `1.5px solid ${SKY}`, borderRadius: 10, fontFamily: 'inherit', fontSize: '0.88rem', color: SLATE, background: WHITE, outline: 'none', boxSizing: 'border-box', boxShadow: `0 0 0 3px ${SKY_L}` }}
        />
      ) : (
        <div style={{ padding: '0.65rem 0.9rem', background: BG, borderRadius: 10, border: `1.5px solid ${BORDER}`, fontSize: '0.88rem', color: value ? SLATE : SLATE_L, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
          {value || '—'}
        </div>
      )}
      {hint && <p style={{ fontSize: '0.68rem', color: SLATE_L, margin: '0.2rem 0 0' }}>{hint}</p>}
    </div>
  )
}

function Toggle({ on, onChange, label, desc }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '0.85rem 0', borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.86rem', fontWeight: 600, color: SLATE }}>{label}</div>
        {desc && <div style={{ fontSize: '0.72rem', color: SLATE_L, marginTop: '0.1rem' }}>{desc}</div>}
      </div>
      <button
        onClick={() => onChange(!on)}
        style={{ width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', background: on ? MINT : BORDER, position: 'relative', flexShrink: 0, transition: 'background 0.25s', padding: 0 }}
      >
        <span style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: WHITE, boxShadow: '0 1px 4px rgba(0,0,0,0.18)', transition: 'left 0.25s', display: 'block' }} />
      </button>
    </div>
  )
}

function Toast({ msg }) {
  return (
    <div style={{ background: MINT_L, border: `1.5px solid ${MINT}`, borderRadius: 10, padding: '0.65rem 1rem', marginBottom: '1rem', fontSize: '0.83rem', color: '#065f46', fontWeight: 600 }}>
      ✓ {msg}
    </div>
  )
}

export default function MyAccountPage() {
  const { navigate } = useRouter()

  const [tab,        setTab]        = useState('profile')
  const [editing,    setEditing]    = useState(false)
  const [saved,      setSaved]      = useState(false)
  const [notifSaved, setNotifSaved] = useState(false)

  const [profile, setProfile] = useState({
    name: 'Priya Sharma',   email: 'priya.sharma@gmail.com',
    phone: '9841234567',    dob: '1995-06-14',
    gender: 'Female',       address: 'Lazimpat, Kathmandu',
    bio: 'Seeking therapy for stress management and work-life balance.',
    language: 'English',    emergencyContact: 'Rohan Sharma — 9812345678',
  })

  const [notifs, setNotifs] = useState({
    sessionReminder: true,  moodReminder: true,
    newsletter: false,      smsAlerts: true,
    therapistMessage: true, promotions: false,
  })

  useEffect(() => {
    const old = document.getElementById('account-page-css')
    if (old) old.remove()
    injectCSS()
  }, [])

  const up = k => v => setProfile(p => ({ ...p, [k]: v }))

  function handleSave() {
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 2500)
  }

  function handleNotifSave() {
    setNotifSaved(true)
    setTimeout(() => setNotifSaved(false), 2500)
  }

  function SidebarBtn({ t }) {
    return (
      <button
        onClick={() => setTab(t.id)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          width: '100%', padding: '0.65rem 0.85rem', borderRadius: 10,
          border: 'none', cursor: 'pointer', textAlign: 'left',
          background: tab === t.id ? SKY_L : 'transparent',
          transition: 'background 0.15s', marginBottom: '0.1rem', fontFamily: 'inherit',
        }}
        onMouseEnter={e => { if (tab !== t.id) e.currentTarget.style.background = BG }}
        onMouseLeave={e => { if (tab !== t.id) e.currentTarget.style.background = 'transparent' }}
      >
        <span style={{ fontSize: '0.95rem', width: 20, textAlign: 'center' }}>{t.icon}</span>
        <span style={{ fontSize: '0.84rem', fontWeight: tab === t.id ? 700 : 500, color: tab === t.id ? SKY_D : SLATE_M }}>
          {t.label}
        </span>
      </button>
    )
  }

  return (
    <div className="account-root">

      {/* HERO */}
      <div className="account-hero">
        <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
        <div className="account-hero-inner">

          <div
            className="account-hero-avatar"
            onClick={() => setTab('profile')}
            title="Edit profile photo"
            style={{
              width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
              background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
              border: '3px solid rgba(255,255,255,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: WHITE, fontWeight: 800,
              cursor: 'pointer', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'   }}
          >
            PS
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h1
              onClick={() => { setTab('profile'); setEditing(true) }}
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem,4vw,1.6rem)', color: WHITE, margin: 0, lineHeight: 1.2, cursor: 'pointer' }}
            >
              {profile.name}
            </h1>
            <p
              onClick={() => { setTab('profile'); setEditing(true) }}
              style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', margin: '0.25rem 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}
            >
              {profile.email}
            </p>
          </div>

          <button
            onClick={() => navigate('/signin')}
            style={{ padding: '0.45rem 1rem', borderRadius: 9, border: '1.5px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.12)', color: WHITE, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit' }}
          >
            🚪 Log Out
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="account-stats">
        <div className="account-stats-grid">
          {[
            { icon: '✅', val: '12',     label: 'Sessions', color: SKY_D     },
            { icon: '🔥', val: '5',      label: 'Streak',   color: '#f97316' },
            { icon: '😊', val: '7.2',    label: 'Avg Mood', color: MINT      },
            { icon: '📅', val: 'Jun 18', label: 'Next',     color: SKY_D     },
          ].map((s, i) => (
            <div
              key={i}
              className="stat-badge"
              onClick={() => setTab('sessions')}
              title="Go to Sessions"
            >
              <div style={{ fontSize: '1.2rem', marginBottom: '0.15rem' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.9rem,2.5vw,1.2rem)', color: s.color, fontWeight: 800, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: '0.6rem', color: SLATE_L, fontWeight: 600, marginTop: '0.15rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="account-layout">

        {/* Sidebar */}
        <div className="account-sidebar">
          {TABS.map(t => <SidebarBtn key={t.id} t={t} />)}
          <div style={{ height: 1, background: BORDER, margin: '0.5rem 0.4rem' }} />
          <button
            onClick={() => navigate('/signin')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%', padding: '0.65rem 0.85rem', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'transparent', fontFamily: 'inherit', transition: 'background 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff5f5' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            <span style={{ width: 20, textAlign: 'center' }}>🚪</span>
            <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#e53e3e' }}>Log Out</span>
          </button>
        </div>

        {/* Content */}
        <div style={{ minWidth: 0 }}>

          <div className="account-tab-pills">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`account-tab-pill${tab === t.id ? ' active' : ''}`}
              >
                <span>{t.icon}</span><span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* ── PROFILE ── */}
          {tab === 'profile' && (
            <>
              {saved && <Toast msg="Profile saved successfully!" />}

              <Card>
                <SectionTitle
                  action={
                    editing ? (
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <Btn variant="muted" size="sm" onClick={() => setEditing(false)}>Cancel</Btn>
                        <Btn variant="primary" size="sm" onClick={handleSave}>Save Changes</Btn>
                      </div>
                    ) : (
                      <Btn variant="ghost" size="sm" onClick={() => setEditing(true)}>✏️ Edit</Btn>
                    )
                  }
                >
                  Personal Information
                </SectionTitle>
                <div className="field-grid">
                  <Field label="Full Name"         value={profile.name}             editing={editing} onChange={up('name')}             placeholder="Your full name" />
                  <Field label="Email"             value={profile.email}            editing={editing} onChange={up('email')}            placeholder="your@email.com" type="email" hint="Used for confirmations" />
                  <Field label="Phone"             value={profile.phone}            editing={editing} onChange={up('phone')}            placeholder="98XXXXXXXX" type="tel" />
                  <Field label="Date of Birth"     value={profile.dob}              editing={editing} onChange={up('dob')}              type="date" />
                  <Field label="Gender"            value={profile.gender}           editing={editing} onChange={up('gender')}           placeholder="Prefer not to say" />
                  <Field label="Language"          value={profile.language}         editing={editing} onChange={up('language')}         placeholder="English" />
                  <Field label="Address"           value={profile.address}          editing={editing} onChange={up('address')}          placeholder="City / district" fullWidth />
                  <Field label="Emergency Contact" value={profile.emergencyContact} editing={editing} onChange={up('emergencyContact')} placeholder="Name — Phone" hint="Only in emergencies" fullWidth />
                  <Field label="About / Goals"     value={profile.bio}              editing={editing} onChange={up('bio')}              placeholder="What brings you to therapy?" fullWidth />
                </div>
              </Card>

              <Card>
                <SectionTitle>Profile Photo</SectionTitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <div
                    onClick={() => alert('Replace with your file-picker / upload handler')}
                    title="Click to upload photo"
                    style={{
                      width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
                      background: `linear-gradient(135deg,${SKY_D},${SKY})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: WHITE, fontWeight: 800,
                      cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.75' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                  >
                    PS
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <Btn variant="ghost" size="sm" onClick={() => alert('Replace with your upload handler')}>Upload Photo</Btn>
                      <Btn variant="muted" size="sm" onClick={() => alert('Replace with your remove-photo handler')}>Remove</Btn>
                    </div>
                    <p style={{ fontSize: '0.68rem', color: SLATE_L, marginTop: '0.3rem' }}>JPG, PNG or WebP · max 2 MB</p>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* ── SECURITY ── */}
          {tab === 'security' && (
            <>
              <Card>
                <SectionTitle>Password</SectionTitle>
                <p style={{ fontSize: '0.84rem', color: SLATE_M, lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  Keep your account safe with a strong, unique password.
                </p>
                <Btn variant="primary" onClick={() => navigate('/update-password')} fullWidth>
                  🔑 Update Password
                </Btn>
              </Card>

              <Card>
                <SectionTitle>Two-Factor Authentication</SectionTitle>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1rem', background: BG, borderRadius: 10, border: `1.5px solid ${BORDER}`, flexWrap: 'wrap' }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: SLATE }}>Authenticator App (TOTP)</div>
                    <div style={{ fontSize: '0.72rem', color: SLATE_L, marginTop: '0.1rem' }}>Not enabled — adds a second layer of security</div>
                  </div>
                  <Btn variant="ghost" size="sm" onClick={() => alert('Replace with your /enable-2fa route')}>Enable</Btn>
                </div>
              </Card>

              <Card>
                <SectionTitle
                  action={<Btn variant="danger" size="sm" onClick={() => alert('Replace with your revoke-all-sessions handler')}>Revoke All</Btn>}
                >
                  Active Sessions
                </SectionTitle>
                {[
                  { device: 'Chrome · Windows 11', location: 'Kathmandu, NP', time: 'Now',        current: true  },
                  { device: 'Safari · iPhone 15',  location: 'Lalitpur, NP',  time: '2 days ago', current: false },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0.9rem', background: BG, borderRadius: 10, border: `1.5px solid ${BORDER}`, marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '0.84rem', fontWeight: 700, color: SLATE, display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                        <span style={{ wordBreak: 'break-word' }}>{s.device}</span>
                        {s.current && (
                          <span style={{ fontSize: '0.62rem', background: MINT_L, color: MINT, fontWeight: 800, padding: '1px 7px', borderRadius: 100, flexShrink: 0 }}>THIS DEVICE</span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: SLATE_L, marginTop: '0.1rem' }}>{s.location} · {s.time}</div>
                    </div>
                    {!s.current && (
                      <Btn variant="danger" size="sm" onClick={() => alert(`Replace with revoke handler for: ${s.device}`)}>Revoke</Btn>
                    )}
                  </div>
                ))}
              </Card>

              <div className="danger-card">
                <SectionTitle><span style={{ color: '#e53e3e' }}>Danger Zone</span></SectionTitle>
                <p style={{ fontSize: '0.83rem', color: SLATE_M, marginBottom: '1rem', lineHeight: 1.6 }}>
                  Deleting your account is permanent. All data and session history will be removed.
                </p>
                <Btn danger onClick={() => alert('Replace with your delete-account confirmation flow')}>
                  Delete My Account
                </Btn>
              </div>
            </>
          )}

          {/* ── SESSIONS & PLAN ── */}
          {tab === 'sessions' && (
            <>
              <Card>
                <SectionTitle>Current Plan</SectionTitle>
                <div style={{ background: `linear-gradient(135deg,${SKY_D},${SKY})`, borderRadius: 14, padding: '1.25rem', color: WHITE, marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, opacity: 0.75, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Active Plan</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem,3vw,1.45rem)', fontWeight: 800, marginBottom: '0.2rem' }}>Monthly Plan</div>
                  <div style={{ opacity: 0.8, fontSize: '0.82rem' }}>4 sessions / month · NPR 8,500 · Renews Jul 1, 2025</div>
                  <div style={{ marginTop: '0.85rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <Btn variant="white" size="sm" onClick={() => navigate('/upgrade')}>⭐ Upgrade Plan</Btn>
                    <button
                      onClick={() => alert('Replace with your cancel-plan confirmation flow')}
                      style={{ padding: '0.38rem 0.9rem', borderRadius: 8, border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      Cancel Plan
                    </button>
                  </div>
                </div>

                <div className="plan-mini-grid">
                  {[
                    { label: 'Sessions Used',   val: '2 / 4', icon: '✅', bg: SKY_L,     col: SKY_D     },
                    { label: 'Remaining',        val: '2',     icon: '📅', bg: MINT_L,    col: MINT      },
                    { label: 'Total Completed',  val: '12',    icon: '🏆', bg: '#fef9c3', col: '#854d0e' },
                    { label: 'Next Billing',     val: 'Jul 1', icon: '💳', bg: BG,        col: SLATE     },
                  ].map((s, i) => (
                    <div
                      key={i}
                      onClick={() => alert(`Replace with handler for: ${s.label}`)}
                      style={{ background: s.bg, borderRadius: 12, padding: '0.85rem', border: `1px solid ${BORDER}`, display: 'flex', gap: '0.6rem', alignItems: 'center', minWidth: 0, cursor: 'pointer', transition: 'opacity 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '1'   }}
                    >
                      <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{s.icon}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: s.col, fontWeight: 800 }}>{s.val}</div>
                        <div style={{ fontSize: '0.65rem', color: SLATE_L, fontWeight: 600 }}>{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <SectionTitle
                  action={<Btn variant="ghost" size="sm" onClick={() => alert('Replace with download-all-invoices handler')}>⬇ Download All</Btn>}
                >
                  Payment History
                </SectionTitle>
                {[
                  { date: 'Jun 1, 2025', desc: 'Monthly Plan × 1', amount: 'NPR 8,500', status: 'Paid', id: 'INV-2025-001' },
                  { date: 'May 1, 2025', desc: 'Monthly Plan × 1', amount: 'NPR 8,500', status: 'Paid', id: 'INV-2025-002' },
                  { date: 'Apr 3, 2025', desc: 'Single Session',   amount: 'NPR 2,500', status: 'Paid', id: 'INV-2025-003' },
                ].map((p, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 0', borderBottom: `1px solid ${BORDER}`, flexWrap: 'wrap' }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '0.84rem', fontWeight: 600, color: SLATE }}>{p.desc}</div>
                      <div style={{ fontSize: '0.7rem', color: SLATE_L, marginTop: '0.1rem' }}>{p.date} · {p.id}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: 700, color: SLATE }}>{p.amount}</span>
                      <span style={{ fontSize: '0.63rem', fontWeight: 800, padding: '2px 8px', borderRadius: 100, background: MINT_L, color: MINT, whiteSpace: 'nowrap' }}>✓ {p.status}</span>
                      <button
                        onClick={() => alert(`Replace with download handler for ${p.id}`)}
                        title="Download invoice"
                        style={{ background: 'none', border: 'none', color: SLATE_L, cursor: 'pointer', fontSize: '0.9rem', padding: '0.1rem 0.3rem', borderRadius: 4, transition: 'color 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.color = SKY_D  }}
                        onMouseLeave={e => { e.currentTarget.style.color = SLATE_L }}
                      >
                        ⬇
                      </button>
                    </div>
                  </div>
                ))}
              </Card>
            </>
          )}

          {/* ── NOTIFICATIONS ── */}
          {tab === 'notifs' && (
            <Card>
              <SectionTitle>Notification Preferences</SectionTitle>
              {notifSaved && <Toast msg="Preferences saved!" />}
              {[
                { key: 'sessionReminder',  label: 'Session Reminders',   desc: '24 hours before each appointment'   },
                { key: 'moodReminder',     label: 'Daily Mood Check-in', desc: 'Gentle reminder to log your mood'    },
                { key: 'therapistMessage', label: 'Therapist Messages',  desc: 'When your therapist sends a message' },
                { key: 'smsAlerts',        label: 'SMS Alerts',          desc: 'Critical reminders via text message' },
                { key: 'newsletter',       label: 'Weekly Newsletter',   desc: 'Mental health tips and resources'    },
                { key: 'promotions',       label: 'Promotions & Offers', desc: 'Special deals and new services'      },
              ].map(n => (
                <Toggle
                  key={n.key}
                  on={notifs[n.key]}
                  onChange={v => setNotifs(prev => ({ ...prev, [n.key]: v }))}
                  label={n.label}
                  desc={n.desc}
                />
              ))}
              <div style={{ marginTop: '1.25rem' }}>
                <Btn variant="primary" onClick={handleNotifSave}>Save Preferences</Btn>
              </div>
            </Card>
          )}

          {/* ── PRIVACY ── */}
          {tab === 'privacy' && (
            <>
              <Card>
                <SectionTitle>Your Data</SectionTitle>
                <p style={{ fontSize: '0.84rem', color: SLATE_M, lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  You own your data. Everything is encrypted and never shared without your explicit consent.
                </p>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <Btn variant="ghost" onClick={() => alert('Replace with your data-export / download handler')}>
                    ⬇ Download My Data
                  </Btn>
                  <Btn variant="muted" onClick={() => navigate('/privacy')}>
                    🛡️ Privacy Policy
                  </Btn>
                </div>
              </Card>

              <Card>
                <SectionTitle>Consent & Sharing</SectionTitle>
                <Toggle on={true} onChange={() => {}} label="Anonymised Research Data"   desc="Help improve services — no personally identifiable info" />
                <Toggle on={true} onChange={() => {}} label="Share Notes With Therapist" desc="Portal notes visible to your assigned therapist" />
              </Card>

              <div className="danger-card">
                <SectionTitle><span style={{ color: '#e53e3e' }}>Account Removal</span></SectionTitle>
                <p style={{ fontSize: '0.83rem', color: SLATE_M, marginBottom: '1rem', lineHeight: 1.6 }}>
                  Request full deletion of all your data. Cannot be undone and will cancel any active plan.
                </p>
                <Btn danger onClick={() => alert('Replace with your delete-account confirmation flow')}>
                  Request Data Deletion
                </Btn>
              </div>
            </>
          )}

        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="account-bottom-tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`account-bottom-tab${tab === t.id ? ' active' : ''}`}
          >
            <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{t.icon}</span>
            <span className="account-bottom-tab-label">{t.short}</span>
          </button>
        ))}
      </div>

    </div>
  )
}