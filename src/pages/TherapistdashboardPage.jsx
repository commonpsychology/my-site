// eslint-disable-next-line no-unused-vars
import { useState, useMemo } from 'react'
import { useRouter } from '../context/RouterContext'
import { MOCK_CLIENTS, MOCK_BOOKINGS, THERAPISTS } from '../data/Mockdata'

const C = {
  skyBright: '#00BFFF', skyMid: '#009FD4', skyDeep: '#007BA8',
  skyFaint: '#E0F7FF', skyFainter: '#F0FBFF', skyGhost: '#F8FEFF',
  white: '#ffffff', mint: '#e8f3ee',
  textDark: '#1a3a4a', textMid: '#2e6080', textLight: '#7a9aaa',
  border: '#b0d4e8', borderFaint: '#daeef8', green: '#0B6623',
}
const navbarGrad  = `linear-gradient(to right,#00BFFF 0%,#00BFFF 2%,#e8f3ee 40%,#f0f8f4 60%,#f8fcfa 80%,#ffffff 100%)`
const heroGrad    = `linear-gradient(135deg,${C.skyDeep} 0%,${C.skyMid} 45%,${C.skyBright} 85%,#22d3ee 100%)`
const btnGrad     = `linear-gradient(135deg,${C.skyDeep} 0%,${C.skyBright} 100%)`
const sectionGrad = `linear-gradient(135deg,${C.skyFainter} 0%,${C.mint} 60%,${C.skyFaint} 100%)`

const TABS = [
  { id: 'home',     icon: '🏠', label: 'My Dashboard' },
  { id: 'schedule', icon: '📅', label: 'My Schedule' },
  { id: 'clients',  icon: '👥', label: 'My Clients' },
  { id: 'notes',    icon: '📝', label: 'Session Notes' },
]

const STATUS_STYLE = {
  upcoming:  { bg: C.skyFaint, color: C.skyDeep, label: 'Upcoming' },
  completed: { bg: '#d1fae5',  color: '#065f46', label: 'Done' },
  cancelled: { bg: '#fff5f5',  color: '#c62828', label: 'Cancelled' },
}

function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.upcoming
  return <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '2px 9px', borderRadius: 100, background: s.bg, color: s.color, whiteSpace: 'nowrap' }}>{s.label}</span>
}

export default function TherapistDashboard() {
  const { navigate } = useRouter()
  const [tab, setTab] = useState('home')
  const [selectedClient, setSC] = useState(null)
  const [editingNote, setEN] = useState(null)
  const [noteText, setNT] = useState('')

  const staffUser = JSON.parse(sessionStorage.getItem('staffUser') || '{}')
  const therapist = THERAPISTS.find(t => t.id === staffUser.id) || THERAPISTS[0]

  function logout() {
    sessionStorage.removeItem('staffUser')
    navigate('/staff')
  }

  /* Filter to this therapist's data */
  const myBookings = MOCK_BOOKINGS.filter(b => b.therapistId === therapist.id)
  const myClients  = MOCK_CLIENTS.filter(c => c.therapistId === therapist.id)
  const upcoming   = myBookings.filter(b => b.status === 'upcoming').sort((a, b) => a.date.localeCompare(b.date))
  // eslint-disable-next-line no-unused-vars
  const completed  = myBookings.filter(b => b.status === 'completed')
  const todayStr   = '2025-06-18' // mock today
  const todaySessions = upcoming.filter(b => b.date === todayStr)

  /* Calendar days for June 2025 */
  const calDays = Array.from({ length: 30 }, (_, i) => {
    const d = String(i + 1).padStart(2, '0')
    const dateStr = `2025-06-${d}`
    const sessions = upcoming.filter(b => b.date === dateStr)
    return { day: i + 1, dateStr, sessions }
  })
  const firstDayOffset = 0 // June 2025 starts on Sunday

  return (
    <div style={{ minHeight: '100vh', background: C.skyGhost, display: 'flex', flexDirection: 'column' }}>

      {/* ── Navbar ── */}
      <nav style={{ background: navbarGrad, borderBottom: `1px solid ${C.borderFaint}`, padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100, boxShadow: `0 2px 16px rgba(0,191,255,0.08)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: btnGrad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
              <path d="M12 2C8.5 2 5.5 4.5 5 8c-.3 2 .5 4 2 5.5L12 22l5-8.5c1.5-1.5 2.3-3.5 2-5.5C18.5 4.5 15.5 2 12 2zm0 9a3 3 0 110-6 3 3 0 010 6z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: C.green }}>Puja Samargi</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 700, color: C.textLight, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Therapist Portal</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: btnGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'white', fontWeight: 800 }}>{therapist.avatar}</div>
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700, color: C.textDark, lineHeight: 1 }}>{therapist.name.split(' ').slice(0,2).join(' ')}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', color: C.textLight }}>{therapist.role.split(' ').slice(0,2).join(' ')}</div>
            </div>
          </div>
          <button onClick={logout} style={{ padding: '0.38rem 0.85rem', borderRadius: 8, border: `1px solid ${C.border}`, background: C.white, color: C.textMid, fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>Log Out</button>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside style={{ width: 200, background: C.white, borderRight: `1px solid ${C.borderFaint}`, padding: '1.5rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', position: 'sticky', top: 64, height: 'calc(100vh - 64px)' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setSC(null) }} style={{
              display: 'flex', alignItems: 'center', gap: '0.65rem',
              width: '100%', padding: '0.65rem 0.85rem', borderRadius: 10,
              border: 'none', background: tab === t.id ? C.skyFaint : 'transparent',
              cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'background 0.15s',
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

        <main style={{ flex: 1, padding: '2rem', overflowX: 'hidden' }}>

          {/* ══ HOME ══ */}
          {tab === 'home' && (
            <div>
              {/* Personal hero */}
              <div style={{ background: heroGrad, borderRadius: 20, padding: '2rem', marginBottom: '1.75rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', position: 'relative' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '3px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'white', fontWeight: 800, flexShrink: 0 }}>{therapist.avatar}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>Welcome back</div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'white', margin: 0, lineHeight: 1.2 }}>{therapist.name}</h2>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', marginTop: '0.2rem' }}>{therapist.role}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: '1.5rem', position: 'relative' }}>
                    {[{l:'Sessions Today',v:todaySessions.length},{l:'Upcoming',v:upcoming.length},{l:'My Clients',v:myClients.length}].map(s => (
                      <div key={s.l} style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'white', fontWeight: 800 }}>{s.v}</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Today's sessions */}
                <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.borderFaint}`, overflow: 'hidden' }}>
                  <div style={{ padding: '1rem 1.25rem', borderBottom: `1px solid ${C.borderFaint}`, background: sectionGrad }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: C.textDark }}>Today's Sessions — {todayStr}</span>
                  </div>
                  {todaySessions.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: C.textLight }}>No sessions today 🌿</div>
                  ) : todaySessions.map(b => (
                    <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.9rem 1.1rem', borderBottom: `1px solid ${C.borderFaint}` }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: btnGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'white', fontWeight: 800, flexShrink: 0 }}>
                        {b.clientName.split(' ').map(w=>w[0]).join('').slice(0,2)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 700, color: C.textDark }}>{b.clientName}</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: C.textLight }}>{b.type} · Session #{b.sessionNo}</div>
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700, color: C.skyMid }}>{b.time}</div>
                      <StatusBadge status={b.status} />
                    </div>
                  ))}
                </div>

                {/* Upcoming */}
                <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.borderFaint}`, overflow: 'hidden' }}>
                  <div style={{ padding: '1rem 1.25rem', borderBottom: `1px solid ${C.borderFaint}`, background: sectionGrad, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: C.textDark }}>Upcoming Sessions</span>
                    <button onClick={() => setTab('schedule')} style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: C.skyMid, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button>
                  </div>
                  {upcoming.slice(0, 5).map(b => (
                    <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1.1rem', borderBottom: `1px solid ${C.borderFaint}` }}>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: C.textLight, width: 44, flexShrink: 0, textAlign: 'center' }}>
                        <div style={{ fontWeight: 700, color: C.skyMid }}>{b.date.split('-')[2]}</div>
                        <div>Jun</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', fontWeight: 700, color: C.textDark }}>{b.clientName}</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.71rem', color: C.textLight }}>{b.time} · {b.type}</div>
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: b.paid ? '#065f46' : '#c62828', fontWeight: 700 }}>{b.paid ? '✓ Paid' : '⚠ Unpaid'}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ SCHEDULE ══ */}
          {tab === 'schedule' && (
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: C.textDark, marginBottom: '1.5rem' }}>My Schedule</h1>
              {/* Mini calendar */}
              <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.borderFaint}`, overflow: 'hidden', marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem 1.25rem', borderBottom: `1px solid ${C.borderFaint}`, background: sectionGrad }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: C.textDark }}>June 2025</span>
                </div>
                <div style={{ padding: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '0.3rem', marginBottom: '0.3rem' }}>
                    {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                      <div key={d} style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 800, color: C.textLight, padding: '0.35rem 0' }}>{d}</div>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '0.3rem' }}>
                    {Array(firstDayOffset).fill(null).map((_, i) => <div key={`e${i}`} />)}
                    {calDays.map(({ day, dateStr, sessions }) => {
                      const isToday = dateStr === todayStr
                      return (
                        <div key={day} style={{
                          textAlign: 'center', padding: '0.45rem 0.25rem', borderRadius: 10,
                          background: isToday ? btnGrad : sessions.length > 0 ? C.skyFaint : 'transparent',
                          border: sessions.length > 0 && !isToday ? `1px solid ${C.borderFaint}` : isToday ? 'none' : 'none',
                          cursor: sessions.length > 0 ? 'pointer' : 'default',
                        }}>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: isToday ? 800 : sessions.length > 0 ? 700 : 400, color: isToday ? 'white' : sessions.length > 0 ? C.skyDeep : C.textLight }}>{day}</div>
                          {sessions.length > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
                              {sessions.slice(0,3).map((_, i) => (
                                <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: isToday ? 'rgba(255,255,255,0.7)' : C.skyBright }} />
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* All sessions list */}
              <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.borderFaint}`, overflow: 'hidden' }}>
                <div style={{ padding: '1rem 1.25rem', borderBottom: `1px solid ${C.borderFaint}`, background: sectionGrad }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: C.textDark }}>All My Bookings</span>
                </div>
                {myBookings.map(b => (
                  <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.9rem 1.1rem', borderBottom: `1px solid ${C.borderFaint}`, flexWrap: 'wrap' }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: btnGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'white', fontWeight: 800, flexShrink: 0 }}>
                      {b.clientName.split(' ').map(w=>w[0]).join('').slice(0,2)}
                    </div>
                    <div style={{ flex: 1, minWidth: 120 }}>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 700, color: C.textDark }}>{b.clientName}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: C.textLight }}>Session #{b.sessionNo} · {b.type}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: C.textMid, textAlign: 'center' }}>
                      <div style={{ fontWeight: 600 }}>{b.date}</div>
                      <div style={{ color: C.textLight }}>{b.time}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: b.paid ? '#065f46' : '#c62828', fontWeight: 700 }}>{b.paid ? '✓ Paid' : '⚠ Unpaid'}</div>
                    <StatusBadge status={b.status} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ CLIENTS ══ */}
          {tab === 'clients' && (
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: C.textDark, marginBottom: '1.5rem' }}>My Clients</h1>
              {selectedClient ? (
                <div>
                  <button onClick={() => setSC(null)} style={{ marginBottom: '1.25rem', padding: '0.45rem 1rem', borderRadius: 8, border: `1.5px solid ${C.border}`, background: C.white, color: C.textMid, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>← Back to my clients</button>
                  <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem' }}>
                    <div>
                      <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.borderFaint}`, overflow: 'hidden' }}>
                        <div style={{ background: heroGrad, padding: '1.5rem', textAlign: 'center' }}>
                          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '3px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'white', fontWeight: 700, margin: '0 auto 0.75rem' }}>
                            {selectedClient.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
                          </div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'white' }}>{selectedClient.name}</div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.72)', marginTop: 4 }}>{selectedClient.email}</div>
                          <div style={{ marginTop: '0.5rem' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '2px 10px', borderRadius: 100, background: 'rgba(255,255,255,0.2)', color: 'white' }}>{selectedClient.status.toUpperCase()}</span>
                          </div>
                        </div>
                        <div style={{ padding: '1.1rem 1.25rem' }}>
                          {[['Phone',selectedClient.phone],['Age',selectedClient.age],['Gender',selectedClient.gender],['District',selectedClient.district],['Total Sessions',selectedClient.totalSessions],['Last Session',selectedClient.lastSession||'—'],['Next Session',selectedClient.nextSession||'—']].map(([k,v]) => (
                            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: `1px solid ${C.borderFaint}`, fontFamily: 'var(--font-body)', fontSize: '0.79rem' }}>
                              <span style={{ color: C.textLight, fontWeight: 700 }}>{k}</span>
                              <span style={{ color: C.textDark, fontWeight: 600 }}>{v}</span>
                            </div>
                          ))}
                          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {selectedClient.tags.map(t => <span key={t} style={{ fontSize: '0.65rem', fontWeight: 700, padding: '2px 9px', borderRadius: 100, background: C.skyFaint, color: C.skyMid }}>{t}</span>)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {/* My notes card */}
                      <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.borderFaint}`, overflow: 'hidden', marginBottom: '1rem' }}>
                        <div style={{ padding: '1rem 1.25rem', borderBottom: `1px solid ${C.borderFaint}`, background: sectionGrad, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: C.textDark }}>My Clinical Notes</span>
                          <button onClick={() => { setEN(selectedClient.id); setNT(selectedClient.notes) }} style={{ padding: '0.3rem 0.8rem', borderRadius: 8, border: 'none', background: btnGrad, color: 'white', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}>✏️ Edit</button>
                        </div>
                        <div style={{ padding: '1.1rem 1.25rem' }}>
                          {editingNote === selectedClient.id ? (
                            <div>
                              <textarea value={noteText} onChange={e => setNT(e.target.value)}
                                style={{ width: '100%', minHeight: 120, padding: '0.75rem', border: `1.5px solid ${C.skyBright}`, borderRadius: 10, fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: C.textDark, resize: 'vertical', outline: 'none', boxSizing: 'border-box', background: C.skyGhost }} />
                              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                                <button onClick={() => setEN(null)} style={{ padding: '0.4rem 0.85rem', borderRadius: 8, border: `1px solid ${C.border}`, background: C.white, color: C.textMid, fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                                <button onClick={() => { setEN(null); }} style={{ padding: '0.4rem 1rem', borderRadius: 8, border: 'none', background: btnGrad, color: 'white', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>Save Notes</button>
                              </div>
                            </div>
                          ) : (
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: C.textMid, lineHeight: 1.72, margin: 0 }}>{selectedClient.notes || 'No notes yet. Click Edit to add notes.'}</p>
                          )}
                        </div>
                      </div>
                      {/* Session history */}
                      <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.borderFaint}`, overflow: 'hidden' }}>
                        <div style={{ padding: '1rem 1.25rem', borderBottom: `1px solid ${C.borderFaint}`, background: sectionGrad }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: C.textDark }}>Session History</span>
                        </div>
                        {myBookings.filter(b => b.clientId === selectedClient.id).map(b => (
                          <div key={b.id} style={{ padding: '0.85rem 1.1rem', borderBottom: `1px solid ${C.borderFaint}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: b.notes ? '0.4rem' : 0 }}>
                              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700, color: C.textDark }}>Session #{b.sessionNo} — {b.date} @ {b.time}</div>
                              <StatusBadge status={b.status} />
                            </div>
                            {b.notes && <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: C.textLight, lineHeight: 1.6, fontStyle: 'italic' }}>{b.notes}</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1rem' }}>
                  {myClients.map(c => (
                    <div key={c.id} onClick={() => setSC(c)} style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.borderFaint}`, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s', boxShadow: `0 2px 10px rgba(0,191,255,0.05)` }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,191,255,0.12)` }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 2px 10px rgba(0,191,255,0.05)` }}
                    >
                      <div style={{ background: heroGrad, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'white', fontWeight: 700, flexShrink: 0 }}>
                          {c.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'white' }}>{c.name}</div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.72)' }}>{c.email}</div>
                        </div>
                      </div>
                      <div style={{ padding: '1rem 1.1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 800, color: C.skyDeep }}>{c.totalSessions}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: C.textLight }}>Sessions</div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700, color: C.textDark }}>{c.nextSession || '—'}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: C.textLight }}>Next</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '2px 9px', borderRadius: 100, background: c.status === 'active' ? C.skyFaint : c.status === 'new' ? '#f0e6ff' : '#fef9c3', color: c.status === 'active' ? C.skyDeep : c.status === 'new' ? '#6c3fc5' : '#854d0e' }}>
                              {c.status.charAt(0).toUpperCase()+c.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                          {c.tags.map(t => <span key={t} style={{ fontSize: '0.62rem', fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: C.skyFainter, color: C.skyMid, border: `1px solid ${C.borderFaint}` }}>{t}</span>)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ══ NOTES ══ */}
          {tab === 'notes' && (
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: C.textDark, marginBottom: '1.5rem' }}>Session Notes</h1>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {myBookings.filter(b => b.notes).map(b => (
                  <div key={b.id} style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.borderFaint}`, padding: '1.1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: btnGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: 'white', fontWeight: 800, flexShrink: 0 }}>
                        {b.clientName.split(' ').map(w=>w[0]).join('').slice(0,2)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 700, color: C.textDark }}>{b.clientName} — Session #{b.sessionNo}</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: C.textLight }}>{b.date} · {b.time} · {b.type}</div>
                      </div>
                      <StatusBadge status={b.status} />
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: C.textMid, lineHeight: 1.7, padding: '0.75rem', background: `linear-gradient(135deg,${C.skyFainter},${C.mint})`, borderRadius: 10, borderLeft: `3px solid ${C.skyBright}` }}>
                      {b.notes}
                    </div>
                  </div>
                ))}
                {myBookings.filter(b => b.notes).length === 0 && (
                  <div style={{ textAlign: 'center', padding: '4rem', fontFamily: 'var(--font-body)', color: C.textLight }}>No session notes recorded yet.</div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}