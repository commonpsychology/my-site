import { useState, useRef } from 'react'
import { useRouter } from '../context/RouterContext'

const C = {
  skyBright: '#00BFFF', skyMid: '#009FD4', skyDeep: '#007BA8',
  skyFaint: '#E0F7FF', skyFainter: '#F0FBFF', skyGhost: '#F8FEFF',
  white: '#ffffff', mint: '#e8f3ee',
  textDark: '#1a3a4a', textMid: '#2e6080', textLight: '#7a9aaa',
  border: '#b0d4e8', borderFaint: '#daeef8',
}
const btnGrad     = `linear-gradient(135deg,#007BA8 0%,#00BFFF 100%)`
const heroGrad    = `linear-gradient(135deg,#007BA8 0%,#009FD4 45%,#00BFFF 85%,#22d3ee 100%)`
const sectionGrad = `linear-gradient(135deg,${C.skyFainter} 0%,${C.mint} 60%,${C.skyFaint} 100%)`
const goldGrad    = `linear-gradient(135deg,#b45309 0%,#d97706 50%,#f59e0b 100%)`

const QR_IMAGE  = '/images/payment-qr.png'
const ESEWA_ID  = '9849350088'
const KHALTI_ID = '9849350088'

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    emoji: '🌱',
    price: 'NPR 0',
    num: 0,
    period: 'Forever free',
    color: C.skyMid,
    faint: C.skyFaint,
    grad: `linear-gradient(135deg,${C.skyFainter},${C.skyFaint})`,
    current: true,
    features: [
      { label: '2 sessions / month',           on: true  },
      { label: 'Online video only',             on: true  },
      { label: 'Basic therapist matching',      on: true  },
      { label: 'Access to free resources',      on: true  },
      { label: 'Priority booking',              on: false },
      { label: 'In-person sessions',            on: false },
      { label: 'Unlimited sessions',            on: false },
      { label: 'Dedicated therapist',           on: false },
      { label: 'Monthly progress report',       on: false },
      { label: 'Family add-on (2 members)',     on: false },
      { label: '24/7 crisis support line',      on: false },
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    emoji: '🌿',
    price: 'NPR 4,999',
    num: 4999,
    period: 'per month',
    color: C.skyDeep,
    faint: C.skyFaint,
    grad: btnGrad,
    popular: true,
    features: [
      { label: '2 sessions / month',            on: true  },
      { label: 'Online video only',             on: true  },
      { label: 'Basic therapist matching',      on: true  },
      { label: 'Access to free resources',      on: true  },
      { label: 'Priority booking',              on: true  },
      { label: 'In-person sessions',            on: true  },
      { label: 'Unlimited sessions',            on: false },
      { label: 'Dedicated therapist',           on: false },
      { label: 'Monthly progress report',       on: false },
      { label: 'Family add-on (2 members)',     on: false },
      { label: '24/7 crisis support line',      on: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    emoji: '🌟',
    price: 'NPR 9,999',
    num: 9999,
    period: 'per month',
    color: '#b45309',
    faint: '#fef3c7',
    grad: goldGrad,
    features: [
      { label: '2 sessions / month',            on: true  },
      { label: 'Online video only',             on: true  },
      { label: 'Basic therapist matching',      on: true  },
      { label: 'Access to free resources',      on: true  },
      { label: 'Priority booking',              on: true  },
      { label: 'In-person sessions',            on: true  },
      { label: 'Unlimited sessions',            on: true  },
      { label: 'Dedicated therapist',           on: true  },
      { label: 'Monthly progress report',       on: true  },
      { label: 'Family add-on (2 members)',     on: true  },
      { label: '24/7 crisis support line',      on: true  },
    ],
  },
]

const METHODS = [
  { id: 'qr',     label: 'QR Code',  emoji: '📷', color: C.skyBright,  faint: C.skyFaint  },
  { id: 'esewa',  label: 'eSewa',    emoji: '🟢', color: '#22c55e',    faint: '#d1fae5'   },
  { id: 'khalti', label: 'Khalti',   emoji: '🟣', color: '#a855f7',    faint: '#f0e6ff'   },
]

function genRef() {
  return `PS-UPGRADE-${new Date().getFullYear()}-${String(Math.floor(Math.random()*90000)+10000)}`
}

function CopyBtn({ text, id, copied, onCopy }) {
  const active = copied === id
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text).catch(()=>{}); onCopy(id) }}
      style={{ padding: '0.3rem 0.85rem', borderRadius: 8, border: `1.5px solid ${active?'#22c55e':C.border}`, background: active?'#d1fae5':C.white, color: active?'#065f46':C.textMid, fontFamily: 'var(--font-body)', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.18s', whiteSpace: 'nowrap' }}
    >
      {active ? '✓ Copied' : '⎘ Copy'}
    </button>
  )
}

export default function UpgradePage() {
  const { navigate } = useRouter()

  const [selectedPlan, setSelectedPlan] = useState(null)
  const [screen, setScreen]             = useState('plans')  // plans | pay | done
  const [method, setMethod]             = useState('qr')
  const [copied, setCopied]             = useState('')
  const [saving, setSaving]             = useState(false)
  const [ref]                           = useState(genRef)
  const confirmed                       = useRef(false)
  const payEl                           = useRef(null)

  const plan = selectedPlan ? PLANS.find(p => p.id === selectedPlan) : null

  function copy(text, id) {
    navigator.clipboard.writeText(text).catch(()=>{})
    setCopied(id)
    setTimeout(() => setCopied(''), 2200)
  }

  function goToPay(planId) {
    setSelectedPlan(planId)
    setScreen('pay')
    setTimeout(() => payEl.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  async function confirmPayment() {
    if (confirmed.current || saving) return
    setSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    confirmed.current = true
    setSaving(false)
    setScreen('done')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const sel = METHODS.find(m => m.id === method)

  // ── Success ──
  if (screen === 'done') return (
    <div className="page-wrapper" style={{ background: C.skyGhost }}>
      <div style={{ maxWidth: 500, margin: '0 auto', padding: '5rem 1.5rem' }}>
        <div style={{ background: C.white, borderRadius: 24, border: `1.5px solid ${C.borderFaint}`, boxShadow: `0 8px 40px rgba(0,191,255,0.12)`, overflow: 'hidden' }}>
          <div style={{ height: 4, background: plan?.grad || btnGrad }} />
          <div style={{ padding: '3rem 2.5rem', textAlign: 'center' }}>
            <div style={{ width: 76, height: 76, borderRadius: '50%', background: plan?.grad || heroGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2rem', boxShadow: '0 8px 28px rgba(0,191,255,0.35)' }}>
              {plan?.emoji}
            </div>
            <div style={{ display: 'inline-block', background: sectionGrad, border: `1px solid ${C.borderFaint}`, borderRadius: 100, padding: '0.28rem 1rem', marginBottom: '0.85rem' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 800, color: C.skyDeep, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                ✓ Plan Activated
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: C.textDark, marginBottom: '0.65rem' }}>
              Welcome to {plan?.name}!
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: C.textMid, lineHeight: 1.75, marginBottom: '1.5rem' }}>
              Your payment has been submitted. We'll verify and activate your <strong>{plan?.name}</strong> plan within 24 hours.
            </p>
            <div style={{ background: sectionGrad, borderRadius: 14, padding: '1rem 1.5rem', border: `1px solid ${C.borderFaint}`, marginBottom: '1.75rem' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 800, color: C.textLight, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>Payment Reference</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: C.skyDeep, fontWeight: 700, letterSpacing: '0.05em' }}>{ref}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: C.textLight, marginTop: '0.2rem' }}>Screenshot this to confirm payment</div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/account')} style={{ padding: '0.75rem 2rem', borderRadius: 12, border: 'none', background: btnGrad, color: 'white', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,191,255,0.3)' }}>
                Go to Account
              </button>
              <button onClick={() => navigate('/')} style={{ padding: '0.75rem 1.5rem', borderRadius: 12, border: `1.5px solid ${C.border}`, background: C.white, color: C.textMid, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="page-wrapper" style={{ background: C.skyGhost }}>

      {/* Hero */}
      <div style={{ background: heroGrad, padding: '4.5rem 4rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
          <button
            onClick={() => navigate('/account')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)', borderRadius: 100, padding: '0.3rem 1rem', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', marginBottom: '1.25rem' }}
          >
            ← Back to Account
          </button>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 100, padding: '0.3rem 0.9rem', marginBottom: '0.9rem', marginLeft: '0.75rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' }}>⭐ Upgrade Plan</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem,3.5vw,2.4rem)', color: 'white', marginBottom: '0.5rem', lineHeight: 1.2 }}>
            Choose Your <em style={{ fontStyle: 'italic' }}>Plan</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.72)', maxWidth: 480 }}>
            Unlock more sessions, dedicated therapists, and premium features.
          </p>
        </div>
      </div>

      {/* ── PLANS SECTION ── */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '3rem 1.5rem 2rem' }}>

        {/* Plan cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {PLANS.map(p => {
            const isSelected = selectedPlan === p.id
            return (
              <div
                key={p.id}
                style={{
                  background: C.white, borderRadius: 20, overflow: 'hidden',
                  border: `2px solid ${isSelected ? p.color : p.current ? C.borderFaint : C.borderFaint}`,
                  boxShadow: isSelected
                    ? `0 0 0 4px ${p.color}22, 0 8px 32px ${p.color}22`
                    : p.popular ? `0 8px 32px rgba(0,191,255,0.12)` : `0 2px 12px rgba(0,0,0,0.04)`,
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  transform: p.popular && !isSelected ? 'translateY(-6px)' : isSelected ? 'translateY(-4px)' : 'none',
                }}
              >
                {/* Popular badge */}
                {p.popular && (
                  <div style={{ position: 'absolute', top: 16, right: 16, background: btnGrad, color: 'white', fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.65rem', borderRadius: 100, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                    Most Popular
                  </div>
                )}

                {/* Card top gradient band */}
                <div style={{ height: 5, background: p.grad }} />

                <div style={{ padding: '1.75rem 1.5rem' }}>
                  {/* Plan name & price */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: p.faint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', border: `1px solid ${C.borderFaint}` }}>
                      {p.emoji}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: C.textDark }}>{p.name}</div>
                      {p.current && <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, color: C.skyMid, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Current Plan</div>}
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: p.num === 0 ? C.textMid : C.textDark }}>{p.price}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: C.textLight, marginLeft: 6 }}>{p.period}</span>
                  </div>

                  {/* Features */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {p.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{
                          width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                          background: f.on ? (p.num === 0 ? C.skyFaint : p.faint) : '#f3f4f6',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.55rem', fontWeight: 800,
                          color: f.on ? p.color : '#9ca3af',
                        }}>
                          {f.on ? '✓' : '✕'}
                        </div>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: f.on ? C.textMid : '#9ca3af', fontWeight: f.on ? 500 : 400 }}>
                          {f.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  {p.current ? (
                    <div style={{ width: '100%', padding: '0.75rem', borderRadius: 12, background: C.skyFainter, border: `1.5px solid ${C.borderFaint}`, color: C.textLight, fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.88rem', textAlign: 'center' }}>
                      ✓ Your current plan
                    </div>
                  ) : (
                    <button
                      onClick={() => goToPay(p.id)}
                     style={{
  width: '100%', padding: '0.8rem', borderRadius: 12,
  background: isSelected ? p.grad : p.popular ? btnGrad : `linear-gradient(135deg,${C.skyFainter},${C.skyFaint})`,
  color: isSelected || p.popular ? 'white' : C.skyDeep,
  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem',
  cursor: 'pointer',
  boxShadow: isSelected || p.popular ? `0 4px 18px ${p.color}44` : 'none',
  border: isSelected || p.popular ? 'none' : `1.5px solid ${C.border}`,
  transition: 'all 0.2s',
}}
                    >
                      {isSelected ? '✓ Selected — Pay Now' : `Upgrade to ${p.name} →`}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── PAYMENT SECTION ── */}
      {screen === 'pay' && plan && (
        <div ref={payEl} style={{ background: C.white, borderTop: `3px solid ${plan.color}` }}>

          {/* Payment hero bar */}
          <div style={{ background: plan.grad, padding: '2rem 2.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
            <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>Completing payment for</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: 'white', margin: 0 }}>
                  {plan.emoji} {plan.name} Plan — {plan.price}
                </h2>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.72)', marginTop: '0.25rem' }}>{plan.period}</div>
              </div>
              <button
                onClick={() => setScreen('plans')}
                style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: 100, padding: '0.38rem 1.1rem', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
              >
                ← Change Plan
              </button>
            </div>
          </div>

          <div style={{ maxWidth: 860, margin: '0 auto', padding: '2.5rem 1.5rem 5rem', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.75rem', alignItems: 'start' }}>

            {/* Left: payment methods + instructions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Method selector */}
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 800, color: C.textLight, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                  Choose Payment Method
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem' }}>
                  {METHODS.map(m => (
                    <button key={m.id} onClick={() => setMethod(m.id)} style={{
                      padding: '0.9rem 0.5rem', borderRadius: 14,
                      border: `1.5px solid ${method === m.id ? m.color : C.borderFaint}`,
                      background: method === m.id ? m.faint : C.white,
                      cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem',
                      boxShadow: method === m.id ? `0 4px 14px ${m.color}33` : 'none',
                      transform: method === m.id ? 'translateY(-2px)' : 'none',
                      transition: 'all 0.2s ease', fontFamily: 'inherit',
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>{m.emoji}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: method === m.id ? 800 : 600, color: method === m.id ? m.color : C.textMid }}>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment instructions */}
              <div style={{ background: C.white, borderRadius: 20, border: `1px solid ${C.borderFaint}`, overflow: 'hidden', boxShadow: `0 4px 24px rgba(0,191,255,0.07)` }}>
                <div style={{ padding: '0.9rem 1.5rem', background: sectionGrad, borderBottom: `1px solid ${C.borderFaint}`, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{sel.emoji}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.92rem', color: C.textDark }}>Pay via {sel.label}</span>
                </div>
                <div style={{ padding: '1.75rem', textAlign: 'center' }}>

                  {method === 'qr' && (
                    <>
                      <div style={{ width: 180, aspectRatio: '1', margin: '0 auto 1.1rem', borderRadius: 16, border: `2px solid ${C.borderFaint}`, background: C.white, padding: 8, overflow: 'hidden', boxShadow: `0 4px 20px rgba(0,191,255,0.1)` }}>
                        <img src={QR_IMAGE} alt="Scan to pay" style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          onError={e => { e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:11px;color:#7a9aaa;text-align:center;gap:8px"><span style="font-size:2rem">📷</span><span>Add QR to /public/images/payment-qr.png</span></div>` }} />
                      </div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.86rem', color: C.textMid, lineHeight: 1.78, maxWidth: 380, margin: '0 auto' }}>
                        Open any bank app → <strong>Scan QR</strong> → Amount <strong style={{ color: C.skyDeep }}>{plan.price}</strong> → Remarks: <strong style={{ color: C.skyDeep }}>{ref}</strong>
                      </p>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', marginTop: '0.85rem', flexWrap: 'wrap' }}>
                        {['Fonepay', 'eSewa', 'Khalti', 'ConnectIPS'].map(a => (
                          <span key={a} style={{ fontSize: '0.65rem', fontWeight: 700, padding: '3px 9px', borderRadius: 100, background: C.skyFaint, color: C.skyMid, border: `1px solid ${C.borderFaint}` }}>{a}</span>
                        ))}
                      </div>
                    </>
                  )}

                  {method === 'esewa' && (
                    <>
                      <div style={{ fontSize: '3rem', marginBottom: '0.65rem' }}>🟢</div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: C.textLight, marginBottom: '0.75rem' }}>Send to this eSewa ID:</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', marginBottom: '0.9rem', flexWrap: 'wrap' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: C.textDark, fontWeight: 700, padding: '0.5rem 1.2rem', background: sectionGrad, borderRadius: 12, border: `1px solid ${C.borderFaint}` }}>{ESEWA_ID}</div>
                        <CopyBtn text={ESEWA_ID} id="esewa" copied={copied} onCopy={copy} />
                      </div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: C.textMid, lineHeight: 1.78, maxWidth: 380, margin: '0 auto 0.9rem' }}>
                        eSewa → Send Money → ID: <strong style={{ color: C.skyDeep }}>{ESEWA_ID}</strong> → Amount: <strong style={{ color: C.skyDeep }}>{plan.price}</strong> → Remarks: <strong style={{ color: C.skyDeep }}>{ref}</strong>
                      </p>
                      <a href="https://esewa.com.np" target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0.48rem 1.2rem', borderRadius: 100, border: '1.5px solid #22c55e', color: '#22c55e', background: '#d1fae5', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}>
                        🟢 Open eSewa App →
                      </a>
                    </>
                  )}

                  {method === 'khalti' && (
                    <>
                      <div style={{ fontSize: '3rem', marginBottom: '0.65rem' }}>🟣</div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: C.textLight, marginBottom: '0.75rem' }}>Send to this Khalti ID:</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', marginBottom: '0.9rem', flexWrap: 'wrap' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: C.textDark, fontWeight: 700, padding: '0.5rem 1.2rem', background: sectionGrad, borderRadius: 12, border: `1px solid ${C.borderFaint}` }}>{KHALTI_ID}</div>
                        <CopyBtn text={KHALTI_ID} id="khalti" copied={copied} onCopy={copy} />
                      </div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: C.textMid, lineHeight: 1.78, maxWidth: 380, margin: '0 auto 0.9rem' }}>
                        Khalti → Send Money → ID: <strong style={{ color: C.skyDeep }}>{KHALTI_ID}</strong> → Amount: <strong style={{ color: C.skyDeep }}>{plan.price}</strong> → Remarks: <strong style={{ color: C.skyDeep }}>{ref}</strong>
                      </p>
                      <a href="https://khalti.com" target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0.48rem 1.2rem', borderRadius: 100, border: '1.5px solid #a855f7', color: '#a855f7', background: '#f0e6ff', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}>
                        🟣 Open Khalti App →
                      </a>
                    </>
                  )}

                </div>
              </div>
            </div>

            {/* Right: sticky summary */}
            <div style={{ position: 'sticky', top: '5.5rem' }}>
              <div style={{ background: C.white, borderRadius: 20, border: `1px solid ${C.borderFaint}`, overflow: 'hidden', boxShadow: `0 6px 32px rgba(0,191,255,0.1)` }}>

                <div style={{ background: plan.grad, padding: '1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
                  <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{plan.emoji}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'white', marginBottom: '0.15rem' }}>{plan.name} Plan</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'white', fontWeight: 800, lineHeight: 1 }}>{plan.price}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)', marginTop: '0.25rem' }}>{plan.period}</div>
                </div>

                <div style={{ padding: '1.1rem' }}>
                  {/* Ref */}
                  <div style={{ background: sectionGrad, borderRadius: 10, padding: '0.65rem 0.85rem', marginBottom: '0.9rem', border: `1px solid ${C.borderFaint}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.56rem', fontWeight: 800, color: C.textLight, textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: '0.1rem' }}>Payment Ref</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', color: C.skyDeep, fontWeight: 700 }}>{ref}</div>
                    </div>
                    <CopyBtn text={ref} id="ref" copied={copied} onCopy={copy} />
                  </div>

                  {/* What you get */}
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 800, color: C.textLight, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
                    What's included
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem', marginBottom: '1rem' }}>
                    {plan.features.filter(f => f.on).map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.65rem', color: plan.color, fontWeight: 800 }}>✓</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: C.textMid }}>{f.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Confirm button */}
                  <button
                    onClick={confirmPayment}
                    disabled={saving}
                    style={{
                      width: '100%', padding: '0.88rem 1rem', borderRadius: 12, border: 'none',
                      background: saving ? C.borderFaint : plan.grad,
                      color: saving ? C.textLight : 'white',
                      fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem',
                      cursor: saving ? 'not-allowed' : 'pointer',
                      boxShadow: saving ? 'none' : `0 6px 22px ${plan.color}44`,
                      transition: 'all 0.2s', letterSpacing: '0.02em',
                    }}
                  >
                    {saving ? '⏳ Confirming…' : `✓ I've Paid — Activate ${plan.name}`}
                  </button>

                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.64rem', color: C.textLight, textAlign: 'center', marginTop: '0.75rem', lineHeight: 1.55 }}>
                    🔒 Secure · Verified within 24 hrs<br />Cancel anytime from account settings
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
