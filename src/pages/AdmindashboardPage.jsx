import { useState, useMemo } from 'react'
import { useRouter } from '../context/RouterContext'
import { MOCK_CLIENTS, MOCK_BOOKINGS, THERAPISTS, REVENUE } from '../data/Mockdata'

const C = {
  skyBright:  '#00BFFF', skyMid: '#009FD4', skyDeep: '#007BA8',
  skyFaint:   '#E0F7FF', skyFainter: '#F0FBFF', skyGhost: '#F8FEFF',
  white:      '#ffffff', mint: '#e8f3ee', mintPale: '#b8d5c8',
  textDark:   '#1a3a4a', textMid: '#2e6080', textLight: '#7a9aaa',
  border:     '#b0d4e8', borderFaint: '#daeef8', green: '#0B6623',
}
const navbarGrad  = `linear-gradient(to right,#00BFFF 0%,#00BFFF 2%,#e8f3ee 40%,#f0f8f4 60%,#f8fcfa 80%,#ffffff 100%)`
const heroGrad    = `linear-gradient(135deg,${C.skyDeep} 0%,${C.skyMid} 45%,${C.skyBright} 85%,#22d3ee 100%)`
const btnGrad     = `linear-gradient(135deg,${C.skyDeep} 0%,${C.skyBright} 100%)`
const sectionGrad = `linear-gradient(135deg,${C.skyFainter} 0%,${C.mint} 60%,${C.skyFaint} 100%)`

const TABS = [
  { id: 'overview',   icon: '📊', label: 'Overview' },
  { id: 'bookings',   icon: '📅', label: 'Bookings' },
  { id: 'clients',    icon: '👥', label: 'Clients' },
  { id: 'therapists', icon: '👩‍⚕️', label: 'Therapists' },
  { id: 'revenue',    icon: '💰', label: 'Revenue' },
]

const STATUS_STYLE = {
  upcoming:  { bg: C.skyFaint,   color: C.skyDeep,  label: 'Upcoming' },
  completed: { bg: '#d1fae5',    color: '#065f46',  label: 'Completed' },
  cancelled: { bg: '#fff5f5',    color: '#c62828',  label: 'Cancelled' },
  active:    { bg: C.skyFaint,   color: C.skyDeep,  label: 'Active' },
  paused:    { bg: '#fef9c3',    color: '#854d0e',  label: 'Paused' },
  new:       { bg: '#f0e6ff',    color: '#6c3fc5',  label: 'New' },
}

function StatCard({ icon, label, value, sub, color = C.skyMid }) {
  return (
    <div style={{ background: C.white, borderRadius: 16, padding: '1.4rem 1.5rem', border: `1px solid ${C.borderFaint}`, boxShadow: `0 2px 12px rgba(0,191,255,0.06)` }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: sectionGrad, border: `1px solid ${C.borderFaint}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{icon}</div>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: color, fontWeight: 800, lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700, color: C.textDark, marginTop: '0.3rem' }}>{label}</div>
      {sub && <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: C.textLight, marginTop: '0.2rem' }}>{sub}</div>}
    </div>
  )
}

function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.upcoming
  return (
    <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '3px 10px', borderRadius: 100, background: s.bg, color: s.color, whiteSpace: 'nowrap' }}>
      {s.label}
    </span>
  )
}

function BookingRow({ b, showTherapist = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', borderBottom: `1px solid ${C.borderFaint}`, flexWrap: 'wrap' }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: btnGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', color: 'white', fontWeight: 800, flexShrink: 0 }}>
        {b.clientName.split(' ').map(w => w[0]).join('').slice(0,2)}
      </div>
      <div style={{ flex: 1, minWidth: 140 }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 700, color: C.textDark }}>{b.clientName}</div>
        {showTherapist && <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: C.textLight }}>{b.therapistName}</div>}
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: C.textMid, minWidth: 90, textAlign: 'center' }}>
        <div style={{ fontWeight: 600 }}>{b.date}</div>
        <div style={{ color: C.textLight }}>{b.time}</div>
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: C.textLight, minWidth: 80 }}>{b.type}</div>
      <div style={{ minWidth: 70, textAlign: 'right' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700, color: C.textDark }}>NPR {b.fee.toLocaleString()}</div>
        <div style={{ fontSize: '0.65rem', color: b.paid ? '#065f46' : '#c62828', fontWeight: 700 }}>{b.paid ? '✓ Paid' : '⚠ Unpaid'}</div>
      </div>
      <StatusBadge status={b.status} />
    </div>
  )
}

export default function AdminDashboard() {
  const { navigate } = useRouter()
  const [tab, setTab]         = useState('overview')
  const [bookingFilter, setBF] = useState('all')
  const [clientSearch, setCS]  = useState('')
  const [selectedClient, setSC] = useState(null)

  const staffUser = JSON.parse(sessionStorage.getItem('staffUser') || '{}')

  function logout() {
    sessionStorage.removeItem('staffUser')
    navigate('/staff')
  }

  /* Derived stats */
  const upcoming   = MOCK_BOOKINGS.filter(b => b.status === 'upcoming')
  const completed  = MOCK_BOOKINGS.filter(b => b.status === 'completed')
  const totalRev   = MOCK_BOOKINGS.filter(b => b.paid).reduce((s, b) => s + b.fee, 0)
  const activeClients = MOCK_CLIENTS.filter(c => c.status === 'active').length
  const maxRev = Math.max(...REVENUE.map(r => r.amount))

  const filteredBookings = useMemo(() => {
    if (bookingFilter === 'all') return MOCK_BOOKINGS
    return MOCK_BOOKINGS.filter(b => b.status === bookingFilter)
  }, [bookingFilter])

  const filteredClients = useMemo(() => {
    if (!clientSearch.trim()) return MOCK_CLIENTS
    const q = clientSearch.toLowerCase()
    return MOCK_CLIENTS.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    )
  }, [clientSearch])

  return (
    <div style={{ minHeight: '100vh', background: C.skyGhost, display: 'flex', flexDirection: 'column' }}>

      {/* ── Top navbar ── */}
      <nav style={{ background: navbarGrad, borderBottom: `1px solid ${C.borderFaint}`, padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100, boxShadow: `0 2px 16px rgba(0,191,255,0.08)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: btnGrad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
              <path d="M12 2C8.5 2 5.5 4.5 5 8c-.3 2 .5 4 2 5.5L12 22l5-8.5c1.5-1.5 2.3-3.5 2-5.5C18.5 4.5 15.5 2 12 2zm0 9a3 3 0 110-6 3 3 0 010 6z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: C.green, lineHeight: 1 }}>Puja Samargi</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 700, color: C.textLight, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin Portal</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: C.textMid }}>👋 {staffUser.name}</div>
          <button onClick={logout} style={{ padding: '0.4rem 0.9rem', borderRadius: 8, border: `1px solid ${C.border}`, background: C.white, color: C.textMid, fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>Log Out</button>
        </div>
      </nav>

      {/* ── Sidebar + content ── */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* Sidebar */}
        <aside style={{ width: 200, background: C.white, borderRight: `1px solid ${C.borderFaint}`, padding: '1.5rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', position: 'sticky', top: 64, height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: 'flex', alignItems: 'center', gap: '0.65rem',
              width: '100%', padding: '0.65rem 0.85rem', borderRadius: 10,
              border: 'none', background: tab === t.id ? C.skyFaint : 'transparent',
              cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => { if (tab !== t.id) e.currentTarget.style.background = C.skyFainter }}
              onMouseLeave={e => { if (tab !== t.id) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ fontSize: '0.95rem' }}>{t.icon}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', fontWeight: tab === t.id ? 700 : 500, color: tab === t.id ? C.skyDeep : C.textMid }}>{t.label}</span>
              {tab === t.id && <div style={{ marginLeft: 'auto', width: 4, height: 16, borderRadius: 2, background: btnGrad }} />}
            </button>
          ))}
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: '2rem', overflowX: 'hidden' }}>

          {/* ══ OVERVIEW ══ */}
          {tab === 'overview' && (
            <div>
              <div style={{ marginBottom: '1.75rem' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: C.textDark, marginBottom: '0.2rem' }}>Dashboard Overview</h1>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: C.textLight }}>June 2025 — All therapists</p>
              </div>

              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <StatCard icon="📅" label="Upcoming Sessions" value={upcoming.length} sub={`This week`} />
                <StatCard icon="✅" label="Completed Sessions" value={completed.length} sub="This month" color="#065f46" />
                <StatCard icon="👥" label="Active Clients" value={activeClients} sub={`${MOCK_CLIENTS.length} total`} />
                <StatCard icon="💰" label="Revenue Collected" value={`NPR ${(totalRev/1000).toFixed(0)}k`} sub="From paid sessions" color="#854d0e" />
              </div>

              {/* Two-column */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Upcoming bookings */}
                <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.borderFaint}`, overflow: 'hidden' }}>
                  <div style={{ padding: '1.1rem 1.25rem', borderBottom: `1px solid ${C.borderFaint}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: sectionGrad }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: C.textDark }}>Upcoming Sessions</span>
                    <button onClick={() => setTab('bookings')} style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: C.skyMid, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button>
                  </div>
                  {upcoming.slice(0, 5).map(b => <BookingRow key={b.id} b={b} />)}
                </div>

                {/* Revenue sparkline */}
                <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.borderFaint}`, overflow: 'hidden' }}>
                  <div style={{ padding: '1.1rem 1.25rem', borderBottom: `1px solid ${C.borderFaint}`, background: sectionGrad }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: C.textDark }}>Revenue — 6 Months</span>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: 120 }}>
                      {REVENUE.map((r, i) => (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: C.textLight }}>{(r.amount/1000).toFixed(0)}k</div>
                          <div style={{
                            width: '100%', borderRadius: '4px 4px 0 0',
                            height: `${(r.amount / maxRev) * 80}px`,
                            background: i === REVENUE.length - 1 ? btnGrad : C.skyFaint,
                            border: `1px solid ${C.borderFaint}`,
                            transition: 'height 0.4s ease',
                          }} />
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', color: C.textLight }}>{r.month}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Therapist quick view */}
              <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.borderFaint}`, overflow: 'hidden', marginTop: '1.5rem' }}>
                <div style={{ padding: '1.1rem 1.25rem', borderBottom: `1px solid ${C.borderFaint}`, background: sectionGrad }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: C.textDark }}>Therapist Status</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 0 }}>
                  {THERAPISTS.map((t, i) => (
                    <div key={t.id} style={{ padding: '1.1rem 1.25rem', borderRight: i < THERAPISTS.length - 1 ? `1px solid ${C.borderFaint}` : 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                        <div style={{ width: 38, height: 38, borderRadius: '50%', background: btnGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: 'white', fontWeight: 800, flexShrink: 0 }}>{t.avatar}</div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700, color: C.textDark, lineHeight: 1.2 }}>{t.name.split(' ').slice(0,2).join(' ')}</div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: C.textLight }}>{t.speciality.split(',')[0]}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <div style={{ flex: 1, background: C.skyFainter, borderRadius: 8, padding: '0.4rem 0.5rem', textAlign: 'center' }}>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, color: C.skyDeep }}>{t.activeClients}</div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: C.textLight }}>Active</div>
                        </div>
                        <div style={{ flex: 1, background: '#d1fae520', borderRadius: 8, padding: '0.4rem 0.5rem', textAlign: 'center' }}>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, color: '#065f46' }}>{t.totalSessions}</div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: C.textLight }}>Sessions</div>
                        </div>
                        <div style={{ flex: 1, background: '#fef9c3', borderRadius: 8, padding: '0.4rem 0.5rem', textAlign: 'center' }}>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, color: '#854d0e' }}>{t.rating}★</div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: C.textLight }}>Rating</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ BOOKINGS ══ */}
          {tab === 'bookings' && (
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: C.textDark, marginBottom: '1.5rem' }}>All Bookings</h1>
              {/* Filters */}
              <div style={{ background: `linear-gradient(135deg,${C.skyFainter} 0%,${C.mint} 100%)`, borderRadius: 14, padding: '1rem 1.25rem', border: `1px solid ${C.borderFaint}`, marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                {['all', 'upcoming', 'completed', 'cancelled'].map(f => (
                  <button key={f} onClick={() => setBF(f)} style={{
                    padding: '0.38rem 0.9rem', borderRadius: 100,
                    border: `1.5px solid ${bookingFilter === f ? C.skyBright : C.border}`,
                    background: bookingFilter === f ? btnGrad : C.white,
                    color: bookingFilter === f ? 'white' : C.textMid,
                    fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600,
                    cursor: 'pointer', textTransform: 'capitalize',
                    boxShadow: bookingFilter === f ? '0 3px 12px rgba(0,191,255,0.28)' : 'none',
                    transition: 'all 0.18s',
                  }}>{f === 'all' ? `All (${MOCK_BOOKINGS.length})` : `${f.charAt(0).toUpperCase()+f.slice(1)} (${MOCK_BOOKINGS.filter(b=>b.status===f).length})`}</button>
                ))}
              </div>
              <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.borderFaint}`, overflow: 'hidden' }}>
                <div style={{ padding: '0.75rem 1rem', display: 'grid', gridTemplateColumns: '36px 1fr 120px 110px 80px 80px 90px', gap: '0.5rem', background: sectionGrad, borderBottom: `1px solid ${C.borderFaint}` }}>
                  {['', 'Client / Therapist', 'Date & Time', 'Type', 'Amount', 'Payment', 'Status'].map((h, i) => (
                    <span key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 800, color: C.textLight, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</span>
                  ))}
                </div>
                {filteredBookings.map(b => <BookingRow key={b.id} b={b} />)}
              </div>
            </div>
          )}

          {/* ══ CLIENTS ══ */}
          {tab === 'clients' && (
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: C.textDark, marginBottom: '1.5rem' }}>Client Records</h1>
              {/* Search */}
              <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: C.textLight, fontSize: '0.9rem' }}>🔍</span>
                <input value={clientSearch} onChange={e => setCS(e.target.value)} placeholder="Search clients by name, email, or tag…"
                  style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', border: `1.5px solid ${C.borderFaint}`, borderRadius: 12, fontFamily: 'var(--font-body)', fontSize: '0.88rem', background: C.white, outline: 'none', color: C.textDark, boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = C.skyBright}
                  onBlur={e => e.target.style.borderColor = C.borderFaint}
                />
              </div>

              {selectedClient ? (
                /* Client detail view */
                <div>
                  <button onClick={() => setSC(null)} style={{ marginBottom: '1.25rem', padding: '0.45rem 1rem', borderRadius: 8, border: `1.5px solid ${C.border}`, background: C.white, color: C.textMid, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>← Back to list</button>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.borderFaint}`, overflow: 'hidden', marginBottom: '1rem' }}>
                        <div style={{ background: heroGrad, padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '2.5px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'white', fontWeight: 700, flexShrink: 0 }}>
                            {selectedClient.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
                          </div>
                          <div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'white' }}>{selectedClient.name}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)' }}>{selectedClient.email}</div>
                            <StatusBadge status={selectedClient.status} />
                          </div>
                        </div>
                        <div style={{ padding: '1.25rem' }}>
                          {[['Phone', selectedClient.phone], ['Age', selectedClient.age], ['Gender', selectedClient.gender], ['District', selectedClient.district], ['Registered', selectedClient.registeredDate], ['Total Sessions', selectedClient.totalSessions]].map(([k,v]) => (
                            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0', borderBottom: `1px solid ${C.borderFaint}`, fontFamily: 'var(--font-body)', fontSize: '0.82rem' }}>
                              <span style={{ color: C.textLight, fontWeight: 700 }}>{k}</span>
                              <span style={{ color: C.textDark, fontWeight: 600 }}>{v}</span>
                            </div>
                          ))}
                          <div style={{ marginTop: '0.75rem' }}>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, color: C.textLight, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>Tags</div>
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                              {selectedClient.tags.map(t => (
                                <span key={t} style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 9px', borderRadius: 100, background: C.skyFaint, color: C.skyMid, border: `1px solid ${C.borderFaint}` }}>{t}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.borderFaint}`, overflow: 'hidden', marginBottom: '1rem' }}>
                        <div style={{ padding: '1rem 1.25rem', borderBottom: `1px solid ${C.borderFaint}`, background: sectionGrad }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: C.textDark }}>Therapist Notes</span>
                        </div>
                        <div style={{ padding: '1.1rem 1.25rem' }}>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: C.textMid, lineHeight: 1.7, margin: 0 }}>{selectedClient.notes || 'No notes recorded yet.'}</p>
                        </div>
                      </div>
                      <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.borderFaint}`, overflow: 'hidden' }}>
                        <div style={{ padding: '1rem 1.25rem', borderBottom: `1px solid ${C.borderFaint}`, background: sectionGrad }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: C.textDark }}>Session History</span>
                        </div>
                        {MOCK_BOOKINGS.filter(b => b.clientId === selectedClient.id).map(b => <BookingRow key={b.id} b={b} showTherapist={false} />)}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.borderFaint}`, overflow: 'hidden' }}>
                  {filteredClients.map((c, i) => (
                    <div key={c.id} onClick={() => setSC(c)} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.95rem 1.1rem', borderBottom: i < filteredClients.length - 1 ? `1px solid ${C.borderFaint}` : 'none', cursor: 'pointer', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = C.skyFainter}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: btnGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', color: 'white', fontWeight: 800, flexShrink: 0 }}>
                        {c.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.86rem', fontWeight: 700, color: C.textDark }}>{c.name}</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: C.textLight }}>{c.email}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {c.tags.slice(0,2).map(t => <span key={t} style={{ fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: C.skyFaint, color: C.skyMid }}>{t}</span>)}
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: C.textLight, textAlign: 'right', minWidth: 80 }}>
                        <div>{c.totalSessions} sessions</div>
                        <div>Next: {c.nextSession || '—'}</div>
                      </div>
                      <StatusBadge status={c.status} />
                      <span style={{ color: C.textLight, fontSize: '0.8rem' }}>›</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ══ THERAPISTS ══ */}
          {tab === 'therapists' && (
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: C.textDark, marginBottom: '1.5rem' }}>Therapist Management</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '1.25rem' }}>
                {THERAPISTS.map(t => (
                  <div key={t.id} style={{ background: C.white, borderRadius: 18, border: `1px solid ${C.borderFaint}`, overflow: 'hidden', boxShadow: `0 4px 20px rgba(0,191,255,0.06)` }}>
                    <div style={{ background: heroGrad, padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '2.5px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'white', fontWeight: 700, flexShrink: 0 }}>{t.avatar}</div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'white' }}>{t.name}</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)' }}>{t.role}</div>
                      </div>
                    </div>
                    <div style={{ padding: '1.25rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                        {[{l:'Active Clients',v:t.activeClients,c:C.skyDeep},{l:'Total Sessions',v:t.totalSessions,c:'#065f46'},{l:'Rating',v:`${t.rating}★`,c:'#854d0e'}].map(s => (
                          <div key={s.l} style={{ textAlign: 'center', background: C.skyFainter, borderRadius: 10, padding: '0.6rem 0.4rem', border: `1px solid ${C.borderFaint}` }}>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 800, color: s.c }}>{s.v}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: C.textLight, marginTop: 2 }}>{s.l}</div>
                          </div>
                        ))}
                      </div>
                      {[['Email', t.email],['Phone', t.phone],['Speciality', t.speciality],['Joined', t.joinDate]].map(([k,v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: `1px solid ${C.borderFaint}`, fontFamily: 'var(--font-body)', fontSize: '0.78rem' }}>
                          <span style={{ color: C.textLight, fontWeight: 700 }}>{k}</span>
                          <span style={{ color: C.textDark, fontWeight: 600, textAlign: 'right', maxWidth: '60%', wordBreak: 'break-all' }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ REVENUE ══ */}
          {tab === 'revenue' && (
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: C.textDark, marginBottom: '1.5rem' }}>Revenue & Financials</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <StatCard icon="💰" label="Total Collected" value={`NPR ${(totalRev/1000).toFixed(1)}k`} sub="All paid sessions" color="#854d0e" />
                <StatCard icon="⚠️" label="Pending Payments" value={`NPR ${(MOCK_BOOKINGS.filter(b=>!b.paid).reduce((s,b)=>s+b.fee,0)/1000).toFixed(1)}k`} sub="Unpaid sessions" color="#c62828" />
                <StatCard icon="📈" label="Jun Revenue" value={`NPR 38.8k`} sub="−5.8% vs May" color={C.skyDeep} />
                <StatCard icon="🏆" label="Best Month" value="May 2025" sub="NPR 41,200 collected" color="#065f46" />
              </div>
              <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.borderFaint}`, overflow: 'hidden' }}>
                <div style={{ padding: '1.1rem 1.5rem', borderBottom: `1px solid ${C.borderFaint}`, background: sectionGrad }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: C.textDark }}>Monthly Breakdown</span>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: 160, marginBottom: '0.75rem' }}>
                    {REVENUE.map((r, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: C.textMid, fontWeight: 700 }}>NPR {(r.amount/1000).toFixed(0)}k</div>
                        <div style={{
                          width: '100%', borderRadius: '6px 6px 0 0',
                          height: `${(r.amount / maxRev) * 120}px`,
                          background: i === REVENUE.length - 1 ? btnGrad : `linear-gradient(180deg, ${C.skyFaint} 0%, ${C.skyFainter} 100%)`,
                          border: `1.5px solid ${i === REVENUE.length - 1 ? C.skyBright : C.borderFaint}`,
                        }} />
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: C.textLight }}>{r.month}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Payment breakdown table */}
                <div style={{ borderTop: `1px solid ${C.borderFaint}` }}>
                  <div style={{ padding: '0.75rem 1.5rem', background: sectionGrad, fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 800, color: C.textLight, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 80px' }}>
                    <span>Client</span><span>Therapist</span><span>Date</span><span>Amount</span><span>Status</span>
                  </div>
                  {MOCK_BOOKINGS.filter(b => b.status !== 'cancelled').map(b => (
                    <div key={b.id} style={{ padding: '0.75rem 1.5rem', borderBottom: `1px solid ${C.borderFaint}`, fontFamily: 'var(--font-body)', fontSize: '0.8rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 80px', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{ color: C.textDark, fontWeight: 600 }}>{b.clientName}</span>
                      <span style={{ color: C.textLight }}>{b.therapistName.split(' ').slice(-1)[0]}</span>
                      <span style={{ color: C.textLight }}>{b.date}</span>
                      <span style={{ color: C.textDark, fontWeight: 700 }}>NPR {b.fee.toLocaleString()}</span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: b.paid ? '#065f46' : '#c62828' }}>{b.paid ? '✓ Paid' : 'Pending'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}