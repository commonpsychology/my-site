/* eslint-disable react-hooks/static-components */
import { useState } from 'react'
import { useRouter } from '../context/RouterContext'
import { therapistsData } from '../data/therapists'

const C = {
  skyBright:  '#00BFFF', skyMid: '#009FD4', skyDeep: '#007BA8',
  skyFaint:   '#E0F7FF', skyFainter: '#F0FBFF', skyGhost: '#F8FEFF',
  white:      '#ffffff', mint: '#e8f3ee',
  textDark:   '#1a3a4a', textMid: '#2e6080', textLight: '#7a9aaa',
  border:     '#b0d4e8', borderFaint: '#daeef8',
}
const btnGrad     = `linear-gradient(135deg, ${C.skyDeep} 0%, ${C.skyBright} 100%)`
const sectionGrad = `linear-gradient(135deg, ${C.skyFainter} 0%, ${C.mint} 60%, ${C.skyFaint} 100%)`
const heroGrad    = `linear-gradient(135deg, ${C.skyDeep} 0%, ${C.skyMid} 45%, ${C.skyBright} 85%, #22d3ee 100%)`

const timeSlots = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM']
const sessionTypes = [
  { label: 'Online Video', icon: '💻', desc: 'Secure video call from home' },
  { label: 'In-Person',    icon: '🏢', desc: 'Visit our Kathmandu office' },
  { label: 'Phone Call',   icon: '📞', desc: 'Audio-only session' },
]

const STEPS = ['Therapist', 'Session Type', 'Date & Time', 'Your Details']

// ── Field wrapper ──
function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <label style={{
        display:'block', fontFamily:'var(--font-body)', fontSize:'0.7rem',
        fontWeight:800, color:C.textLight, textTransform:'uppercase',
        letterSpacing:'0.09em', marginBottom:'0.45rem',
      }}>
        {label}{required && <span style={{color:C.skyBright,marginLeft:2}}>*</span>}
      </label>
      {children}
    </div>
  )
}

// ── Input ──
function Input({ type='text', value, onChange, placeholder, min, style }) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      type={type} value={value} onChange={onChange}
      placeholder={placeholder} min={min}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{
        width:'100%', padding:'0.78rem 1rem',
        border:`1.5px solid ${focused ? C.skyBright : C.borderFaint}`,
        borderRadius:10, fontFamily:'var(--font-body)', fontSize:'0.9rem',
        color:C.textDark, background: focused ? C.skyGhost : C.white,
        outline:'none', boxSizing:'border-box',
        boxShadow: focused ? `0 0 0 3px rgba(0,191,255,0.1)` : 'none',
        transition:'all 0.2s ease', ...style,
      }}
    />
  )
}

// ── Step bar ──
function StepBar({ step }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:0, marginTop:'1.25rem' }}>
      {STEPS.map((label, i) => {
        const num = i + 1
        const done   = step > num
        const active = step === num
        return (
          <div key={i} style={{ display:'flex', alignItems:'center', flex: i < STEPS.length-1 ? 1 : 'none' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', flexShrink:0 }}>
              <div style={{
                width:30, height:30, borderRadius:'50%',
                background: done||active ? btnGrad : 'rgba(255,255,255,0.2)',
                border: done||active ? 'none' : '1.5px solid rgba(255,255,255,0.4)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'0.72rem', fontWeight:800,
                color: done||active ? 'white' : 'rgba(255,255,255,0.7)',
                boxShadow: active ? '0 3px 12px rgba(0,191,255,0.4)' : 'none',
                transition:'all 0.25s',
              }}>
                {done ? '✓' : num}
              </div>
              <span style={{
                fontFamily:'var(--font-body)', fontSize:'0.78rem',
                fontWeight: active ? 700 : 500,
                color: active ? 'white' : done ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)',
                whiteSpace:'nowrap',
              }}>{label}</span>
            </div>
            {i < STEPS.length-1 && (
              <div style={{ flex:1, height:1.5, background: done ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)', margin:'0 0.6rem' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Therapist card ──
function TherapistCard({ therapist, selected, onSelect }) {
  const active = selected?.id === therapist.id
  return (
    <div
      onClick={() => onSelect(therapist)}
      style={{
        border:`1.5px solid ${active ? C.skyBright : C.borderFaint}`,
        borderRadius:16, padding:'1.25rem',
        background: active ? C.skyFaint : C.white,
        cursor:'pointer',
        boxShadow: active
          ? `0 0 0 3px rgba(0,191,255,0.1), 0 4px 18px rgba(0,191,255,0.1)`
          : `0 2px 8px rgba(0,0,0,0.04)`,
        transition:'all 0.2s ease',
        display:'flex', flexDirection:'column', gap:'0.85rem',
      }}
    >
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:'0.85rem' }}>
        <div style={{
          width:52, height:52, borderRadius:'50%', flexShrink:0,
          background: active ? btnGrad : sectionGrad,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'1.5rem',
          boxShadow: active ? '0 3px 12px rgba(0,191,255,0.3)' : 'none',
          transition:'all 0.2s',
        }}>
          {therapist.emoji || '👩‍⚕️'}
        </div>
        <div style={{ flex:1 }}>
          <div style={{
            fontFamily:'var(--font-display)', fontSize:'1rem',
            color: active ? C.skyDeep : C.textDark, fontWeight:600,
          }}>{therapist.name}</div>
          <div style={{ fontFamily:'var(--font-body)', fontSize:'0.78rem', color:C.textLight, marginTop:2 }}>
            {therapist.role}
          </div>
        </div>
        <div style={{
          padding:'0.25rem 0.65rem', borderRadius:100, fontSize:'0.7rem', fontWeight:700,
          background: therapist.available ? '#e8f8f0' : '#f8f0e8',
          color: therapist.available ? '#1a7a4a' : '#8a5a1a',
          fontFamily:'var(--font-body)', flexShrink:0,
        }}>
          {therapist.available ? '● Available' : '○ Busy'}
        </div>
      </div>

      {/* Specialties */}
      {therapist.specialties?.length > 0 && (
        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
          {therapist.specialties.map((spec, i) => (
            <span key={i} style={{
              padding:'0.22rem 0.65rem', borderRadius:100,
              fontSize:'0.72rem', fontWeight:600,
              background: active ? 'rgba(0,191,255,0.12)' : C.skyFainter,
              color: active ? C.skyDeep : C.textMid,
              border:`1px solid ${active ? 'rgba(0,191,255,0.25)' : C.borderFaint}`,
              fontFamily:'var(--font-body)', transition:'all 0.2s',
            }}>{spec}</span>
          ))}
        </div>
      )}

      {/* Stats */}
      <div style={{
        display:'flex', gap:'1rem',
        padding:'0.65rem 0.85rem', borderRadius:10,
        background: active ? 'rgba(0,191,255,0.06)' : C.skyFainter,
        border:`1px solid ${C.borderFaint}`,
      }}>
        {[
          ['Experience', therapist.experience || '—'],
          ['Sessions',   therapist.sessionsCompleted ? `${therapist.sessionsCompleted}+` : '—'],
          ['Rating',     therapist.rating ? `${therapist.rating}★` : '—'],
          ['Fee',        therapist.fee || '—'],
        ].map(([k, v]) => (
          <div key={k} style={{ flex:1, textAlign:'center' }}>
            <div style={{ fontFamily:'var(--font-body)', fontSize:'0.88rem', fontWeight:700, color: active ? C.skyDeep : C.textDark }}>{v}</div>
            <div style={{ fontFamily:'var(--font-body)', fontSize:'0.65rem', color:C.textLight, textTransform:'uppercase', letterSpacing:'0.07em', marginTop:2 }}>{k}</div>
          </div>
        ))}
      </div>

      {/* Selected indicator */}
      {active && (
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontFamily:'var(--font-body)', fontSize:'0.8rem', fontWeight:700, color:C.skyDeep }}>
          <div style={{ width:18, height:18, borderRadius:'50%', background:btnGrad, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <span style={{ color:'white', fontSize:'0.6rem', fontWeight:800 }}>✓</span>
          </div>
          Selected
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════
export default function BookingPage() {
  const { params, navigate } = useRouter()

  const serviceTitle       = params?.serviceTitle       || ''
  const serviceSpecialties = params?.serviceSpecialties || []

  // ── Pre-filter by service specialties (set when navigating from /services) ──
  // If no service context, show everyone.
  const preFiltered = serviceSpecialties.length > 0
    ? therapistsData.filter(t =>
        t.specialties?.some(s =>
          serviceSpecialties.some(ss => s.toLowerCase().includes(ss.toLowerCase()))
        )
      )
    : therapistsData

  // Fall back to all therapists if the filter is too strict
  const baseList = preFiltered.length > 0 ? preFiltered : therapistsData

  // ── Collect every unique serviceType across the base list ──
  // Each therapist should have a `serviceTypes` array like:
  //   ['Individual Therapy', 'Mindfulness & Stress']
  // This drives the filter pills shown to the user.
  const allServiceTypes = [...new Set(
    baseList.flatMap(t => t.serviceTypes || [])
  )].sort()

  const [step, setStep]                       = useState(1)
  const [selectedTherapist, setSelectedTherapist] = useState(params?.therapist || null)
  const [activeFilter, setActiveFilter]       = useState('All')  // 'All' or a serviceType string
  const [selected, setSelected]               = useState({
    type:  'Online Video',
    slot:  params?.slot || '',
    date:  '',
    name:  '',
    email: '',
    phone: '',
    notes: '',
  })

  const update = (k, v) => setSelected(s => ({ ...s, [k]: v }))

  // ── Apply the pill filter on top of the pre-filter ──
  const visibleTherapists = activeFilter === 'All'
    ? baseList
    : baseList.filter(t => t.serviceTypes?.includes(activeFilter))

  function parseFee(feeStr) {
    if (typeof feeStr === 'number') return feeStr
    const n = Number(String(feeStr).replace(/[^0-9]/g, ''))
    return isNaN(n) ? 2000 : n
  }

  function handleProceedToPay() {
    const t = selectedTherapist
    const bookingData = {
      therapistName:  t.name,
      therapistEmoji: t.emoji || '👩‍⚕️',
      therapistRole:  t.role  || 'Therapist',
      therapistId:    t.id    || '',
      type:           selected.type,
      date:           selected.date,
      time:           selected.slot,
      sessionNo:      (t.sessionsCompleted || 0) + 1,
      clientName:     selected.name.trim()  || 'Guest',
      clientEmail:    selected.email.trim() || '',
      clientPhone:    selected.phone.trim() || '',
      notes:          selected.notes.trim() || '',
      fee:            parseFee(t.fee),
    }
    sessionStorage.setItem('pendingBooking', JSON.stringify(bookingData))
    navigate('/payment', { booking: bookingData })
  }

  const step2Valid = selected.date && selected.slot
  const step3Valid = (
    selected.name.trim().length > 1 &&
    selected.email.includes('@') &&
    selected.phone.trim().length >= 7
  )

  const t = selectedTherapist

  // ── Summary sidebar ──
  const SummaryCard = () => (
    <div style={{
      background:C.white, borderRadius:18, border:`1.5px solid ${C.borderFaint}`,
      overflow:'hidden', height:'fit-content', position:'sticky', top:'5.5rem',
      boxShadow:`0 4px 24px rgba(0,191,255,0.08)`,
    }}>
      <div style={{ background:heroGrad, padding:'1.25rem 1.4rem', display:'flex', alignItems:'center', gap:'0.85rem' }}>
        <div style={{ width:46, height:46, borderRadius:'50%', background:'rgba(255,255,255,0.2)', border:'2.5px solid rgba(255,255,255,0.4)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', flexShrink:0 }}>
          {t?.emoji || '👩‍⚕️'}
        </div>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'0.95rem', color:'white', lineHeight:1.2 }}>
            {t?.name || 'No therapist selected'}
          </div>
          <div style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', color:'rgba(255,255,255,0.75)', marginTop:2 }}>
            {t?.role || '—'}
          </div>
        </div>
      </div>
      <div style={{ padding:'1.1rem 1.4rem' }}>
        <div style={{ fontFamily:'var(--font-body)', fontSize:'0.65rem', fontWeight:800, color:C.textLight, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>Your Session</div>
        {[
          ['Service', serviceTitle  || '—'],
          ['Type',    selected.type || '—'],
          ['Date',    selected.date || '—'],
          ['Time',    selected.slot || '—'],
          ['Name',    selected.name || '—'],
          ['Fee',     t?.fee        || '—'],
        ].map(([k, v]) => (
          <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', padding:'0.42rem 0', borderBottom:`1px solid ${C.borderFaint}`, gap:'0.5rem' }}>
            <span style={{ fontFamily:'var(--font-body)', fontSize:'0.78rem', color:C.textLight, fontWeight:700, flexShrink:0 }}>{k}</span>
            <span style={{ fontFamily:'var(--font-body)', fontSize:'0.78rem', fontWeight:600, color: v==='—' ? C.textLight : C.textDark, textAlign:'right', wordBreak:'break-word' }}>{v}</span>
          </div>
        ))}
        <div style={{ marginTop:'0.85rem', background:sectionGrad, borderRadius:10, padding:'0.75rem 0.9rem', border:`1px solid ${C.borderFaint}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', fontWeight:800, color:C.textLight, textTransform:'uppercase', letterSpacing:'0.08em' }}>Total</span>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', color:C.skyDeep, fontWeight:700 }}>{t?.fee || '—'}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="page-wrapper" style={{ background:C.skyGhost }}>

      {/* Hero */}
      <div style={{ background:heroGrad, padding:'5rem 4rem 3.5rem', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-60, right:-60, width:300, height:300, borderRadius:'50%', background:'rgba(255,255,255,0.07)', pointerEvents:'none' }} />
        <div style={{ maxWidth:860, margin:'0 auto', position:'relative' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.15)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, padding:'0.3rem 0.9rem', marginBottom:'0.9rem' }}>
            <span style={{ fontFamily:'var(--font-body)', fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.1em', color:'rgba(255,255,255,0.9)', textTransform:'uppercase' }}>
              📅 {serviceTitle ? `Book — ${serviceTitle}` : 'Book a Session'}
            </span>
          </div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.6rem,3vw,2.2rem)', color:'white', marginBottom:'0.3rem', lineHeight:1.2 }}>
            {step === 1
              ? (serviceTitle ? `Therapists for ${serviceTitle}` : 'Choose Your Therapist')
              : selectedTherapist
                ? `Schedule with ${selectedTherapist.name.split(' ').slice(-1)[0]}`
                : 'Book a Session'}
          </h1>
          {serviceTitle && step === 1 && (
            <p style={{ fontFamily:'var(--font-body)', fontSize:'0.88rem', color:'rgba(255,255,255,0.75)', marginBottom:'0.2rem' }}>
              Showing {visibleTherapists.length} therapist{visibleTherapists.length !== 1 ? 's' : ''} for <strong style={{color:'white'}}>{serviceTitle}</strong>
            </p>
          )}
          <StepBar step={step} />
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth:920, margin:'2.5rem auto', padding:'0 2rem 4rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:'1.75rem', alignItems:'start' }}>

          {/* Left panel */}
          <div style={{ background:C.white, borderRadius:20, border:`1.5px solid ${C.borderFaint}`, padding:'2rem', boxShadow:`0 4px 24px rgba(0,191,255,0.07)` }}>

            {/* ══ STEP 1: Therapist Selection ══ */}
            {step === 1 && (
              <div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', color:C.textDark, marginBottom:'0.4rem' }}>
                  {serviceTitle ? `Therapists for ${serviceTitle}` : 'Choose Your Therapist'}
                </h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:C.textLight, marginBottom:'1.25rem' }}>
                  Select the therapist that feels right for you.
                </p>

                {/* ── Service type filter pills ──
                    Only shown when NOT coming from a specific service
                    (because the list is already pre-filtered in that case).
                    When coming from /services, the pills let the user
                    narrow further within the matched therapists. */}
                {allServiceTypes.length > 1 && (
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'0.45rem', marginBottom:'1.25rem' }}>
                    {['All', ...allServiceTypes].map(type => {
                      const isActive = activeFilter === type
                      return (
                        <button
                          key={type}
                          onClick={() => setActiveFilter(type)}
                          style={{
                            padding:'0.3rem 0.85rem',
                            borderRadius:100,
                            border:`1.5px solid ${isActive ? C.skyBright : C.borderFaint}`,
                            background: isActive ? btnGrad : C.white,
                            color: isActive ? 'white' : C.textMid,
                            fontFamily:'var(--font-body)',
                            fontSize:'0.78rem',
                            fontWeight: isActive ? 700 : 500,
                            cursor:'pointer',
                            boxShadow: isActive ? '0 2px 10px rgba(0,191,255,0.25)' : 'none',
                            transition:'all 0.15s ease',
                          }}
                        >
                          {type}
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Therapist cards */}
                <div style={{ display:'flex', flexDirection:'column', gap:'0.85rem', marginBottom:'2rem' }}>
                  {visibleTherapists.length > 0 ? (
                    visibleTherapists.map((therapist, i) => (
                      <TherapistCard
                        key={therapist.id || i}
                        therapist={therapist}
                        selected={selectedTherapist}
                        onSelect={setSelectedTherapist}
                      />
                    ))
                  ) : (
                    <div style={{
                      textAlign:'center', padding:'2.5rem 1rem',
                      color:C.textLight, fontFamily:'var(--font-body)', fontSize:'0.88rem',
                      background:C.skyFainter, borderRadius:12,
                      border:`1.5px dashed ${C.borderFaint}`,
                    }}>
                      No therapists match <strong>"{activeFilter}"</strong> right now.
                      <br />
                      <button
                        onClick={() => setActiveFilter('All')}
                        style={{ marginTop:'0.75rem', background:'none', border:'none', color:C.skyMid, fontFamily:'var(--font-body)', fontSize:'0.85rem', fontWeight:700, cursor:'pointer', textDecoration:'underline' }}
                      >
                        Show all therapists
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => selectedTherapist && setStep(2)}
                  disabled={!selectedTherapist}
                  style={{
                    padding:'0.8rem 2rem', borderRadius:12, border:'none',
                    background: selectedTherapist ? btnGrad : C.borderFaint,
                    color: selectedTherapist ? 'white' : C.textLight,
                    fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.92rem',
                    cursor: selectedTherapist ? 'pointer' : 'not-allowed',
                    boxShadow: selectedTherapist ? '0 4px 18px rgba(0,191,255,0.32)' : 'none',
                    transition:'all 0.2s',
                  }}
                >
                  Continue →
                </button>
              </div>
            )}

            {/* ══ STEP 2: Session Type ══ */}
            {step === 2 && (
              <div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', color:C.textDark, marginBottom:'0.4rem' }}>Choose Session Type</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:C.textLight, marginBottom:'1.5rem' }}>How would you like to connect with your therapist?</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.85rem', marginBottom:'2rem' }}>
                  {sessionTypes.map((st, i) => {
                    const active = selected.type === st.label
                    return (
                      <div key={i} onClick={() => update('type', st.label)} style={{
                        border:`1.5px solid ${active ? C.skyBright : C.borderFaint}`,
                        borderRadius:14, padding:'1.1rem 1.25rem', cursor:'pointer',
                        background: active ? C.skyFaint : C.white,
                        display:'flex', alignItems:'center', gap:'1rem',
                        boxShadow: active ? `0 0 0 3px rgba(0,191,255,0.1), 0 4px 18px rgba(0,191,255,0.1)` : 'none',
                        transition:'all 0.2s ease',
                      }}>
                        <div style={{ width:46, height:46, borderRadius:12, background: active ? btnGrad : sectionGrad, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.35rem', flexShrink:0, transition:'all 0.2s' }}>{st.icon}</div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontFamily:'var(--font-body)', fontWeight:700, color: active ? C.skyDeep : C.textDark, marginBottom:'0.15rem', fontSize:'0.92rem' }}>{st.label}</div>
                          <div style={{ fontFamily:'var(--font-body)', fontSize:'0.8rem', color:C.textLight }}>{st.desc}</div>
                        </div>
                        <div style={{ width:22, height:22, borderRadius:'50%', border:`2px solid ${active ? C.skyBright : C.borderFaint}`, background: active ? btnGrad : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s' }}>
                          {active && <span style={{ color:'white', fontSize:'0.65rem', fontWeight:800 }}>✓</span>}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div style={{ display:'flex', gap:'0.75rem' }}>
                  <button onClick={() => setStep(1)} style={{ padding:'0.75rem 1.4rem', borderRadius:12, border:`1.5px solid ${C.border}`, background:C.white, color:C.textMid, fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.88rem', cursor:'pointer' }}>← Back</button>
                  <button onClick={() => setStep(3)} style={{ padding:'0.8rem 2rem', borderRadius:12, border:'none', background:btnGrad, color:'white', fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.92rem', cursor:'pointer', boxShadow:'0 4px 18px rgba(0,191,255,0.32)' }}>Continue →</button>
                </div>
              </div>
            )}

            {/* ══ STEP 3: Date & Time ══ */}
            {step === 3 && (
              <div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', color:C.textDark, marginBottom:'0.4rem' }}>Pick a Date & Time</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:C.textLight, marginBottom:'1.5rem' }}>Choose when you'd like your session.</p>
                <Field label="Select Date" required>
                  <Input type="date" value={selected.date} onChange={e => update('date', e.target.value)} min={new Date().toISOString().split('T')[0]} />
                </Field>
                <Field label="Select Time" required>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'0.5rem' }}>
                    {timeSlots.map((slot, i) => {
                      const active = selected.slot === slot
                      return (
                        <button key={i} onClick={() => update('slot', slot)} style={{
                          padding:'0.65rem 0.5rem', borderRadius:10,
                          border:`1.5px solid ${active ? C.skyBright : C.borderFaint}`,
                          background: active ? btnGrad : C.white,
                          color: active ? 'white' : C.textMid,
                          fontFamily:'var(--font-body)', fontSize:'0.82rem', fontWeight: active ? 700 : 500,
                          cursor:'pointer', boxShadow: active ? '0 3px 12px rgba(0,191,255,0.28)' : 'none',
                          transition:'all 0.15s ease',
                        }}>{slot}</button>
                      )
                    })}
                  </div>
                </Field>
                <div style={{ display:'flex', gap:'0.75rem', marginTop:'1.75rem' }}>
                  <button onClick={() => setStep(2)} style={{ padding:'0.75rem 1.4rem', borderRadius:12, border:`1.5px solid ${C.border}`, background:C.white, color:C.textMid, fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.88rem', cursor:'pointer' }}>← Back</button>
                  <button onClick={() => step2Valid && setStep(4)} disabled={!step2Valid} style={{
                    padding:'0.75rem 2rem', borderRadius:12, border:'none',
                    background: step2Valid ? btnGrad : C.borderFaint,
                    color: step2Valid ? 'white' : C.textLight,
                    fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.92rem',
                    cursor: step2Valid ? 'pointer' : 'not-allowed',
                    boxShadow: step2Valid ? '0 4px 18px rgba(0,191,255,0.3)' : 'none',
                    transition:'all 0.2s',
                  }}>Continue →</button>
                </div>
              </div>
            )}

            {/* ══ STEP 4: Your Details ══ */}
            {step === 4 && (
              <div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', color:C.textDark, marginBottom:'0.4rem' }}>Your Details</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:C.textLight, marginBottom:'1.5rem' }}>We need a few details to confirm your booking.</p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 1rem' }}>
                  <div style={{ gridColumn:'1 / -1' }}>
                    <Field label="Full Name" required>
                      <Input placeholder="Priya Sharma" value={selected.name} onChange={e => update('name', e.target.value)} />
                    </Field>
                  </div>
                  <Field label="Email Address" required>
                    <Input type="email" placeholder="you@email.com" value={selected.email} onChange={e => update('email', e.target.value)} />
                  </Field>
                  <Field label="Phone / WhatsApp" required>
                    <Input type="tel" placeholder="98XXXXXXXX" value={selected.phone} onChange={e => update('phone', e.target.value)} />
                  </Field>
                  <div style={{ gridColumn:'1 / -1' }}>
                    <Field label="Notes for Therapist (optional)">
                      <textarea
                        value={selected.notes}
                        onChange={e => update('notes', e.target.value)}
                        placeholder="Anything you'd like your therapist to know beforehand…"
                        rows={3}
                        style={{ width:'100%', padding:'0.78rem 1rem', border:`1.5px solid ${C.borderFaint}`, borderRadius:10, fontFamily:'var(--font-body)', fontSize:'0.88rem', color:C.textDark, background:C.white, outline:'none', resize:'vertical', boxSizing:'border-box', transition:'border-color 0.2s' }}
                        onFocus={e => e.target.style.borderColor = C.skyBright}
                        onBlur={e => e.target.style.borderColor = C.borderFaint}
                      />
                    </Field>
                  </div>
                </div>
                <div style={{ display:'flex', gap:'0.75rem', marginTop:'0.5rem', alignItems:'center' }}>
                  <button onClick={() => setStep(3)} style={{ padding:'0.75rem 1.4rem', borderRadius:12, border:`1.5px solid ${C.border}`, background:C.white, color:C.textMid, fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.88rem', cursor:'pointer' }}>← Back</button>
                  <button
                    onClick={() => step3Valid && handleProceedToPay()}
                    disabled={!step3Valid}
                    style={{
                      flex:1, padding:'0.85rem 1.5rem', borderRadius:12, border:'none',
                      background: step3Valid ? btnGrad : C.borderFaint,
                      color: step3Valid ? 'white' : C.textLight,
                      fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.95rem',
                      cursor: step3Valid ? 'pointer' : 'not-allowed',
                      boxShadow: step3Valid ? '0 6px 22px rgba(0,191,255,0.35)' : 'none',
                      letterSpacing:'0.02em', transition:'all 0.2s',
                      display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
                    }}
                  >
                    💳 Proceed to Pay — {selectedTherapist?.fee}
                  </button>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginTop:'0.85rem', justifyContent:'flex-end' }}>
                  <span style={{ fontSize:'0.72rem', color:C.textLight, fontFamily:'var(--font-body)' }}>🔒 Secure & encrypted · Cancel anytime</span>
                </div>
              </div>
            )}

          </div>

          {/* Right: summary card */}
          <SummaryCard />
        </div>
      </div>
    </div>
  )
}