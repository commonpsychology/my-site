/* eslint-disable no-dupe-keys */
import { useState, useRef } from 'react'
import { useRouter } from '../context/RouterContext'

/* ─────────────────────────────────────────
   PALETTE  (matches site's sky / slate theme)
───────────────────────────────────────── */
const SKY   = '#0ea5e9'
const SKY_L = '#e0f2fe'
const SKY_D = '#0369a1'
const MINT  = '#10b981'
const MINT_L = '#d1fae5'
const SLATE  = '#1e293b'
const SLATE_M = '#64748b'
const SLATE_L = '#94a3b8'
const BORDER  = '#e2e8f0'
const BG      = '#f8fafc'
const WHITE   = '#ffffff'
const GOLD    = '#d97706'
const GOLD_L  = '#fef3c7'

const btnGrad  = `linear-gradient(135deg,${SKY_D} 0%,${SKY} 100%)`
const goldGrad = `linear-gradient(135deg,#92400e 0%,${GOLD} 60%,#fbbf24 100%)`

/* ─────────────────────────────────────────
   PLACE DATA
───────────────────────────────────────── */
const PLACE = {
  name:    'The Serenity Room',
  tagline: 'A calm, private space for healing, reflection & community.',
  caption: 'Our in-house wellness space in the heart of Lazimpat, Kathmandu',
  description: `The Serenity Room is PsycheCare Nepal's dedicated in-house venue — a thoughtfully designed, fully sound-proofed space built for therapeutic group sessions, private one-on-ones, mindfulness workshops, and small community gatherings focused on mental wellbeing.

Bathed in natural light with living-wall greenery, adjustable ambient lighting, and noise-cancelling panels, every detail was chosen to lower cortisol and invite openness. Whether you're a facilitator running a DBT skills group, a couple attending mediation, or an individual who simply needs a neutral, safe environment away from home or office — The Serenity Room is for you.

The space seats up to 12 in a circle arrangement and can be reconfigured for presentations, yoga, or bilateral movement therapy. A private anteroom with tea station, writing desk, and charging points is included with every booking.`,
  amenities: [
    { icon: '🔇', label: 'Sound-proofed walls'       },
    { icon: '🌿', label: 'Living wall greenery'       },
    { icon: '💡', label: 'Adjustable ambient lighting' },
    { icon: '🛋️', label: 'Therapeutic-grade furniture' },
    { icon: '📶', label: 'High-speed private Wi-Fi'    },
    { icon: '☕', label: 'Tea & water station'         },
    { icon: '🖥️', label: '65" display screen'          },
    { icon: '♿', label: 'Fully accessible'            },
  ],
  images: [
    { src: '/images/place-main.jpg',   alt: 'The Serenity Room — main circle space' },
    { src: '/images/place-corner.jpg', alt: 'Window corner with writing desk'        },
    { src: '/images/place-green.jpg',  alt: 'Living wall & ambient lighting'         },
  ],
}

/* ─────────────────────────────────────────
   PACKAGES
───────────────────────────────────────── */
const PACKAGES = [
  {
    id: 'hour',
    name: 'Single Hour',
    emoji: '⏱️',
    price: 'NPR 1,500',
    num: 1500,
    period: 'per hour',
    color: SKY_D,
    faint: SKY_L,
    grad: btnGrad,
    features: [
      { label: '1 hour room access',          on: true  },
      { label: 'Up to 6 people',              on: true  },
      { label: 'Tea & water included',        on: true  },
      { label: 'Basic A/V setup',             on: true  },
      { label: 'Anteroom access',             on: false },
      { label: 'Extended seating (12 seats)', on: false },
      { label: 'Facilitator whiteboard kit',  on: false },
      { label: 'Recording (audio only)',      on: false },
    ],
  },
  {
    id: 'halfday',
    name: 'Half-Day',
    emoji: '🌤️',
    price: 'NPR 4,500',
    num: 4500,
    period: '4 hours',
    color: MINT,
    faint: MINT_L,
    grad: `linear-gradient(135deg,#059669 0%,${MINT} 100%)`,
    popular: true,
    features: [
      { label: '1 hour room access',          on: true  },
      { label: 'Up to 6 people',              on: true  },
      { label: 'Tea & water included',        on: true  },
      { label: 'Basic A/V setup',             on: true  },
      { label: 'Anteroom access',             on: true  },
      { label: 'Extended seating (12 seats)', on: true  },
      { label: 'Facilitator whiteboard kit',  on: false },
      { label: 'Recording (audio only)',      on: false },
    ],
  },
  {
    id: 'fullday',
    name: 'Full Day',
    emoji: '☀️',
    price: 'NPR 7,500',
    num: 7500,
    period: '8 hours',
    color: GOLD,
    faint: GOLD_L,
    grad: goldGrad,
    features: [
      { label: '1 hour room access',          on: true },
      { label: 'Up to 6 people',              on: true },
      { label: 'Tea & water included',        on: true },
      { label: 'Basic A/V setup',             on: true },
      { label: 'Anteroom access',             on: true },
      { label: 'Extended seating (12 seats)', on: true },
      { label: 'Facilitator whiteboard kit',  on: true },
      { label: 'Recording (audio only)',      on: true },
    ],
  },
]

const METHODS = [
  { id: 'qr',     label: 'QR / Fonepay', emoji: '📷', color: SKY,       faint: SKY_L    },
  { id: 'esewa',  label: 'eSewa',        emoji: '🟢', color: '#22c55e', faint: '#d1fae5' },
  { id: 'khalti', label: 'Khalti',       emoji: '🟣', color: '#a855f7', faint: '#f0e6ff' },
  { id: 'cod',    label: 'Pay on Day',   emoji: '💵', color: GOLD,      faint: GOLD_L    },
]

const QR_IMAGE  = '/images/payment-qr.png'
const ESEWA_ID  = '9849350088'
const KHALTI_ID = '9849350088'

function genRef() {
  return `PS-PLACE-${new Date().getFullYear()}-${String(Math.floor(Math.random()*90000)+10000)}`
}

/* ─────────────────────────────────────────
   COPY BUTTON
───────────────────────────────────────── */
function CopyBtn({ text, id, copied, onCopy }) {
  const active = copied === id
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text).catch(() => {}); onCopy(id) }}
      style={{
        padding: '0.3rem 0.85rem', borderRadius: 8,
        border: `1.5px solid ${active ? '#22c55e' : BORDER}`,
        background: active ? '#d1fae5' : WHITE,
        color: active ? '#065f46' : SLATE_M,
        fontFamily: 'inherit', fontSize: '0.74rem', fontWeight: 700,
        cursor: 'pointer', transition: 'all 0.18s', whiteSpace: 'nowrap',
      }}
    >
      {active ? '✓ Copied' : '⎘ Copy'}
    </button>
  )
}

/* ─────────────────────────────────────────
   IMAGE PLACEHOLDER (when real img missing)
───────────────────────────────────────── */
function PlaceholderImg({ label, style }) {
  return (
    <div style={{
      ...style,
      background: `linear-gradient(135deg,#0c4a6e 0%,${SKY_D} 50%,#0284c7 100%)`,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
    }}>
      <span style={{ fontSize: '3rem', opacity: 0.6 }}>🏛️</span>
      <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', fontFamily: 'inherit' }}>{label}</span>
    </div>
  )
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function OurPlacePage() {
  const { navigate } = useRouter()

  const [screen,      setScreen]      = useState('place')   // place | book | pay | done
  const [selPkg,      setSelPkg]      = useState(null)
  const [method,      setMethod]      = useState('qr')
  const [copied,      setCopied]      = useState('')
  const [saving,      setSaving]      = useState(false)
  const [imgIdx,      setImgIdx]      = useState(0)
  const [bookDate,    setBookDate]    = useState('')
  const [bookTime,    setBookTime]    = useState('')
  const [clientName,  setClientName]  = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [notes,       setNotes]       = useState('')
  const [ref]                         = useState(genRef)
  const confirmed                     = useRef(false)
  const bookEl                        = useRef(null)
  const payEl                         = useRef(null)

  const pkg = PACKAGES.find(p => p.id === selPkg)
  const sel = METHODS.find(m => m.id === method)

  const formOK = bookDate && bookTime && clientName.trim() && clientPhone.trim().length >= 7

  function copy(text, id) {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(id)
    setTimeout(() => setCopied(''), 2200)
  }

  function goBook() {
    setScreen('book')
    setTimeout(() => bookEl.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  function goPay(pkgId) {
    setSelPkg(pkgId)
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

  const minDate = new Date().toISOString().split('T')[0]

  /* ── INPUT style helper ── */
  const inp = (focused) => ({
    width: '100%', padding: '0.72rem 1rem',
    border: `1.5px solid ${focused ? SKY : BORDER}`,
    borderRadius: 12, fontFamily: 'inherit', fontSize: '0.88rem',
    color: SLATE, background: focused ? '#f0f9ff' : BG,
    outline: 'none', boxSizing: 'border-box',
    boxShadow: focused ? `0 0 0 3px ${SKY_L}` : 'none',
    transition: 'all 0.2s',
  })

  function FocusInput({ type, value, onChange, placeholder, min }) {
    const [focused, setFocused] = useState(false)
    return (
      <input
        type={type || 'text'} value={value} onChange={onChange}
        placeholder={placeholder} min={min}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={inp(focused)}
      />
    )
  }

  function FocusTextarea({ value, onChange, placeholder, rows }) {
    const [focused, setFocused] = useState(false)
    return (
      <textarea
        value={value} onChange={onChange} placeholder={placeholder}
        rows={rows || 3}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ ...inp(focused), resize: 'vertical' }}
      />
    )
  }

  /* ═══════════════════════════════
     SUCCESS SCREEN
  ═══════════════════════════════ */
  if (screen === 'done') return (
    <div className="page-wrapper" style={{ background: BG }}>
      <div style={{ maxWidth: 500, margin: '0 auto', padding: '5rem 1.5rem' }}>
        <div style={{ background: WHITE, borderRadius: 24, border: `1.5px solid ${BORDER}`, boxShadow: '0 8px 40px rgba(14,165,233,0.12)', overflow: 'hidden' }}>
          <div style={{ height: 5, background: pkg?.grad || btnGrad }} />
          <div style={{ padding: '3rem 2.5rem', textAlign: 'center' }}>
            <div style={{ width: 76, height: 76, borderRadius: '50%', background: pkg?.grad || btnGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2rem', boxShadow: '0 8px 28px rgba(14,165,233,0.28)' }}>
              {pkg?.emoji || '🏛️'}
            </div>
            <div style={{ display: 'inline-block', background: MINT_L, border: `1px solid ${MINT}`, borderRadius: 100, padding: '0.28rem 1rem', marginBottom: '0.85rem' }}>
              <span style={{ fontFamily: 'inherit', fontSize: '0.65rem', fontWeight: 800, color: '#065f46', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {method === 'cod' ? '📅 Booking Confirmed' : '💳 Payment Submitted'}
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: SLATE, marginBottom: '0.65rem' }}>
              {method === 'cod' ? 'Booking Placed!' : 'Thank You!'}
            </h2>
            <p style={{ fontFamily: 'inherit', fontSize: '0.9rem', color: SLATE_M, lineHeight: 1.75, marginBottom: '1.5rem' }}>
              {method === 'cod'
                ? `Your booking for ${bookDate} at ${bookTime} is confirmed. We'll call ${clientPhone} to confirm.`
                : `Thank you, ${clientName}! We'll verify your payment and confirm your booking for ${bookDate} at ${bookTime}.`}
            </p>
            <div style={{ background: SKY_L, borderRadius: 14, padding: '1rem 1.5rem', border: `1px solid ${BORDER}`, marginBottom: '1.75rem' }}>
              <div style={{ fontFamily: 'inherit', fontSize: '0.62rem', fontWeight: 800, color: SLATE_L, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>Booking Reference</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: SKY_D, fontWeight: 700, letterSpacing: '0.05em' }}>{ref}</div>
              <div style={{ fontFamily: 'inherit', fontSize: '0.68rem', color: SLATE_L, marginTop: '0.2rem' }}>Screenshot this to confirm your booking</div>
            </div>
            <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '0.9rem 1.1rem', marginBottom: '1.75rem', textAlign: 'left' }}>
              {[
                ['Package', `${pkg?.emoji} ${pkg?.name}`],
                ['Date',    bookDate],
                ['Time',    bookTime],
                ['Total',   pkg?.price],
                ['Payment', sel?.label],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: `1px solid ${BORDER}`, fontFamily: 'inherit', fontSize: '0.82rem' }}>
                  <span style={{ color: SLATE_L, fontWeight: 600 }}>{k}</span>
                  <span style={{ color: SLATE, fontWeight: 700 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/')} style={{ padding: '0.75rem 2rem', borderRadius: 12, border: 'none', background: btnGrad, color: WHITE, fontFamily: 'inherit', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(14,165,233,0.28)' }}>
                🏠 Back to Home
              </button>
              <button onClick={() => { setScreen('place'); confirmed.current = false }} style={{ padding: '0.75rem 1.5rem', borderRadius: 12, border: `1.5px solid ${BORDER}`, background: WHITE, color: SLATE_M, fontFamily: 'inherit', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
                View Space
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="page-wrapper" style={{ background: BG }}>

      {/* ══════════════════════════════════
          HERO IMAGE SECTION — no navbar
          padding because this starts at top
      ══════════════════════════════════ */}
      <div style={{ position: 'relative', width: '100%', paddingTop: 72 }}>

        {/* Main image */}
        <div style={{ position: 'relative', width: '100%', height: 'clamp(260px,55vw,620px)', overflow: 'hidden' }}>
          <img
            src={PLACE.images[imgIdx].src}
            alt={PLACE.images[imgIdx].alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
          />
          <PlaceholderImg
            label={PLACE.images[imgIdx].alt}
            style={{ position: 'absolute', inset: 0, display: 'none' }}
          />

          {/* Dark gradient overlay for caption */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to top,rgba(0,0,0,0.72) 0%,transparent 100%)' }} />

          {/* Caption */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(1rem,3vw,2rem) clamp(1rem,3vw,2.5rem)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 100, padding: '0.25rem 0.85rem', marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: 'inherit', fontSize: '0.68rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>📍 {PLACE.caption}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,4vw,2.8rem)', color: WHITE, margin: 0, lineHeight: 1.1, textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
              {PLACE.name}
            </h1>
            <p style={{ fontFamily: 'inherit', fontSize: 'clamp(0.82rem,1.8vw,1rem)', color: 'rgba(255,255,255,0.82)', marginTop: '0.3rem', textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>
              {PLACE.tagline}
            </p>
          </div>

          {/* Thumbnail nav */}
          {PLACE.images.length > 1 && (
            <div style={{ position: 'absolute', bottom: '1rem', right: '1.25rem', display: 'flex', gap: '0.4rem' }}>
              {PLACE.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  style={{
                    width: imgIdx === i ? 24 : 8, height: 8, borderRadius: 4, border: 'none',
                    background: imgIdx === i ? WHITE : 'rgba(255,255,255,0.45)',
                    cursor: 'pointer', padding: 0, transition: 'all 0.25s',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {PLACE.images.length > 1 && (
          <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1.25rem', background: SLATE, overflowX: 'auto' }}>
            {PLACE.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setImgIdx(i)}
                style={{
                  width: 80, height: 52, borderRadius: 8, overflow: 'hidden', flexShrink: 0,
                  border: `2px solid ${imgIdx === i ? SKY : 'transparent'}`,
                  cursor: 'pointer', transition: 'border-color 0.2s', opacity: imgIdx === i ? 1 : 0.6,
                }}
              >
                <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { e.target.style.display = 'none'; e.target.parentElement.style.background = SKY_D }} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════
          DESCRIPTION SECTION
      ══════════════════════════════════ */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(2rem,5vw,4rem) clamp(1rem,4vw,2rem)' }}>

        {/* Description text */}
        <div style={{ marginBottom: '3rem' }}>
          {PLACE.description.split('\n\n').map((para, i) => (
            <p key={i} style={{ fontFamily: 'inherit', fontSize: 'clamp(0.9rem,2vw,1.02rem)', color: SLATE_M, lineHeight: 1.88, marginBottom: '1.25rem' }}>
              {para}
            </p>
          ))}
        </div>

        {/* Amenities */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: SLATE, marginBottom: '1.25rem' }}>
            What's Included
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '0.65rem' }}>
            {PLACE.amenities.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.7rem 1rem', background: WHITE, borderRadius: 12, border: `1.5px solid ${BORDER}` }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{a.icon}</span>
                <span style={{ fontFamily: 'inherit', fontSize: '0.84rem', color: SLATE_M, fontWeight: 500 }}>{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {screen === 'place' && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ background: `linear-gradient(135deg,${SKY_L} 0%,${MINT_L} 100%)`, borderRadius: 20, padding: '2.5rem', border: `1.5px solid ${BORDER}`, marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🏛️</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: SLATE, marginBottom: '0.5rem' }}>
                Ready to book The Serenity Room?
              </h3>
              <p style={{ fontFamily: 'inherit', fontSize: '0.9rem', color: SLATE_M, lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: 440, margin: '0 auto 1.5rem' }}>
                Choose a package that fits your needs — from a single hour to a full-day retreat.
              </p>
              <button
                onClick={goBook}
                style={{ padding: '0.9rem 3rem', borderRadius: 14, border: 'none', background: btnGrad, color: WHITE, fontFamily: 'inherit', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 6px 24px rgba(14,165,233,0.35)', letterSpacing: '0.02em', transition: 'opacity 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                📅 Book This Place
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════
          BOOKING — PACKAGE SELECTION
      ══════════════════════════════════ */}
      {(screen === 'book' || screen === 'pay') && (
        <div ref={bookEl} style={{ background: WHITE, borderTop: `3px solid ${SKY}` }}>

          {/* Section header */}
          <div style={{ background: `linear-gradient(135deg,${SKY_D} 0%,${SKY} 55%,#22d3ee 100%)`, padding: 'clamp(1.5rem,4vw,2.5rem) clamp(1rem,4vw,2.5rem)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
            <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ fontFamily: 'inherit', fontSize: '0.68rem', fontWeight: 700, color: 'rgba(255,255,255,0.72)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>Step 1 — Choose your package</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: WHITE, margin: 0 }}>Select a Booking Package</h2>
              </div>
              <button
                onClick={() => setScreen('place')}
                style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', color: WHITE, borderRadius: 100, padding: '0.38rem 1.1rem', fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
              >
                ← Back
              </button>
            </div>
          </div>

          {/* Package cards */}
          <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(1.5rem,4vw,2.5rem) clamp(1rem,4vw,1.5rem)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {PACKAGES.map(p => {
                const isSel = selPkg === p.id
                return (
                  <div
                    key={p.id}
                    style={{
                      background: WHITE, borderRadius: 20, overflow: 'hidden',
                      border: `2px solid ${isSel ? p.color : BORDER}`,
                      boxShadow: isSel ? `0 0 0 4px ${p.color}22, 0 8px 32px ${p.color}22` : p.popular ? '0 8px 32px rgba(14,165,233,0.1)' : '0 2px 10px rgba(0,0,0,0.04)',
                      transform: p.popular && !isSel ? 'translateY(-4px)' : isSel ? 'translateY(-3px)' : 'none',
                      transition: 'all 0.25s', position: 'relative',
                    }}
                  >
                    {p.popular && (
                      <div style={{ position: 'absolute', top: 14, right: 14, background: btnGrad, color: WHITE, fontSize: '0.6rem', fontWeight: 800, padding: '0.2rem 0.65rem', borderRadius: 100, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'inherit' }}>
                        Best Value
                      </div>
                    )}
                    <div style={{ height: 5, background: p.grad }} />
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
                        <div style={{ width: 42, height: 42, borderRadius: 12, background: p.faint, border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                          {p.emoji}
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: SLATE }}>{p.name}</div>
                          <div style={{ fontFamily: 'inherit', fontSize: '0.7rem', color: SLATE_L }}>{p.period}</div>
                        </div>
                      </div>
                      <div style={{ marginBottom: '1.1rem' }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.65rem', color: SLATE }}>{p.price}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem' }}>
                        {p.features.map((f, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                            <div style={{ width: 16, height: 16, borderRadius: '50%', flexShrink: 0, background: f.on ? p.faint : BG, border: `1px solid ${f.on ? p.color : BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: 800, color: f.on ? p.color : SLATE_L }}>
                              {f.on ? '✓' : '✕'}
                            </div>
                            <span style={{ fontFamily: 'inherit', fontSize: '0.79rem', color: f.on ? SLATE_M : SLATE_L }}>{f.label}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => goPay(p.id)}
                        style={{
                          width: '100%', padding: '0.75rem', borderRadius: 12, border: 'none',
                          background: isSel ? p.grad : p.popular ? btnGrad : `linear-gradient(135deg,${SKY_L},#bae6fd)`,
                          color: isSel || p.popular ? WHITE : SKY_D,
                          fontFamily: 'inherit', fontWeight: 700, fontSize: '0.88rem',
                          cursor: 'pointer',
                          border: isSel || p.popular ? 'none' : `1.5px solid ${BORDER}`,
                          boxShadow: isSel || p.popular ? `0 4px 18px ${p.color}44` : 'none',
                          transition: 'all 0.2s',
                        }}
                      >
                        {isSel ? '✓ Selected — Pay Now' : `Book ${p.name} →`}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          PAYMENT SECTION
      ══════════════════════════════════ */}
      {screen === 'pay' && pkg && (
        <div ref={payEl} style={{ background: BG, borderTop: `3px solid ${pkg.color}` }}>

          {/* Pay header */}
          <div style={{ background: pkg.grad, padding: 'clamp(1.25rem,3vw,2rem) clamp(1rem,4vw,2.5rem)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
            <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ fontFamily: 'inherit', fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.72)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>Step 2 — Details & Payment</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem,3vw,1.65rem)', color: WHITE, margin: 0 }}>
                  {pkg.emoji} {pkg.name} — {pkg.price}
                </h2>
              </div>
              <button
                onClick={() => setScreen('book')}
                style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', color: WHITE, borderRadius: 100, padding: '0.38rem 1.1rem', fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
              >
                ← Change Package
              </button>
            </div>
          </div>

          {/* Two-col pay body */}
          <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(1.5rem,4vw,2.5rem) clamp(1rem,4vw,1.5rem) 5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.75rem', alignItems: 'start' }}>

            {/* LEFT: booking details + method + instructions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Date / time / contact */}
              <div style={{ background: WHITE, borderRadius: 18, border: `1px solid ${BORDER}`, overflow: 'hidden', boxShadow: '0 4px 20px rgba(14,165,233,0.06)' }}>
                <div style={{ padding: '0.85rem 1.4rem', background: `linear-gradient(135deg,${SKY_L},${MINT_L})`, borderBottom: `1px solid ${BORDER}` }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: SLATE }}>Booking Details</span>
                </div>
                <div style={{ padding: '1.25rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {[
                    { label: 'Date',           type: 'date', value: bookDate,    set: setBookDate,    min: minDate      },
                    { label: 'Start Time',     type: 'time', value: bookTime,    set: setBookTime                       },
                    { label: 'Your Name',      type: 'text', value: clientName,  set: setClientName,  ph: 'Priya Sharma' },
                    { label: 'Phone / WhatsApp', type: 'tel', value: clientPhone, set: setClientPhone, ph: '98XXXXXXXX'  },
                    { label: 'Email',          type: 'email',value: clientEmail, set: setClientEmail, ph: 'you@email.com'},
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ display: 'block', fontFamily: 'inherit', fontSize: '0.68rem', fontWeight: 800, color: SLATE_L, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                        {f.label} {f.label !== 'Email' && <span style={{ color: SKY }}>*</span>}
                      </label>
                      <FocusInput type={f.type} value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.ph} min={f.min} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', fontFamily: 'inherit', fontSize: '0.68rem', fontWeight: 800, color: SLATE_L, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                      Purpose / Notes
                    </label>
                    <FocusTextarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. Group DBT session for 8 people, need chairs in circle…" rows={3} />
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div>
                <div style={{ fontFamily: 'inherit', fontSize: '0.65rem', fontWeight: 800, color: SLATE_L, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.65rem' }}>
                  Payment Method
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.55rem' }}>
                  {METHODS.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      style={{
                        padding: '0.75rem 0.4rem', borderRadius: 12,
                        border: `1.5px solid ${method === m.id ? m.color : BORDER}`,
                        background: method === m.id ? m.faint : WHITE,
                        cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
                        boxShadow: method === m.id ? `0 4px 14px ${m.color}33` : 'none',
                        transform: method === m.id ? 'translateY(-2px)' : 'none',
                        transition: 'all 0.2s', fontFamily: 'inherit',
                      }}
                    >
                      <span style={{ fontSize: '1.3rem' }}>{m.emoji}</span>
                      <span style={{ fontFamily: 'inherit', fontSize: '0.62rem', fontWeight: method === m.id ? 800 : 600, color: method === m.id ? m.color : SLATE_M, textAlign: 'center', lineHeight: 1.2 }}>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment instructions */}
              <div style={{ background: WHITE, borderRadius: 18, border: `1px solid ${BORDER}`, overflow: 'hidden', boxShadow: '0 4px 20px rgba(14,165,233,0.06)' }}>
                <div style={{ padding: '0.85rem 1.4rem', background: `linear-gradient(135deg,${SKY_L},${MINT_L})`, borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{sel.emoji}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: SLATE }}>Pay via {sel.label}</span>
                </div>
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>

                  {method === 'qr' && (
                    <>
                      <div style={{ width: 170, aspectRatio: '1', margin: '0 auto 1rem', borderRadius: 14, border: `2px solid ${BORDER}`, padding: 8, overflow: 'hidden', boxShadow: '0 4px 20px rgba(14,165,233,0.1)' }}>
                        <img src={QR_IMAGE} alt="Scan to pay" style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          onError={e => { e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;font-size:11px;color:${SLATE_L};text-align:center"><span style="font-size:2rem">📷</span><span>Add QR image to<br/>/public/images/payment-qr.png</span></div>` }} />
                      </div>
                      <p style={{ fontFamily: 'inherit', fontSize: '0.85rem', color: SLATE_M, lineHeight: 1.78, maxWidth: 340, margin: '0 auto' }}>
                        Open any bank app → <strong>Scan QR</strong> → Amount <strong style={{ color: SKY_D }}>{pkg.price}</strong> → Remarks: <strong style={{ color: SKY_D }}>{ref}</strong>
                      </p>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                        {['Fonepay','eSewa','Khalti','ConnectIPS'].map(a => (
                          <span key={a} style={{ fontSize: '0.63rem', fontWeight: 700, padding: '3px 9px', borderRadius: 100, background: SKY_L, color: SKY_D, border: `1px solid ${BORDER}` }}>{a}</span>
                        ))}
                      </div>
                    </>
                  )}

                  {method === 'esewa' && (
                    <>
                      <div style={{ fontSize: '2.8rem', marginBottom: '0.6rem' }}>🟢</div>
                      <p style={{ fontFamily: 'inherit', fontSize: '0.78rem', color: SLATE_L, marginBottom: '0.7rem' }}>Send to this eSewa ID:</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: SLATE, fontWeight: 700, padding: '0.5rem 1.2rem', background: SKY_L, borderRadius: 12, border: `1px solid ${BORDER}` }}>{ESEWA_ID}</div>
                        <CopyBtn text={ESEWA_ID} id="esewa" copied={copied} onCopy={copy} />
                      </div>
                      <p style={{ fontFamily: 'inherit', fontSize: '0.82rem', color: SLATE_M, lineHeight: 1.75, maxWidth: 340, margin: '0 auto 0.85rem' }}>
                        Amount: <strong style={{ color: SKY_D }}>{pkg.price}</strong> · Remarks: <strong style={{ color: SKY_D }}>{ref}</strong>
                      </p>
                      <a href="https://esewa.com.np" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0.45rem 1.2rem', borderRadius: 100, border: '1.5px solid #22c55e', color: '#22c55e', background: '#d1fae5', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}>
                        🟢 Open eSewa App →
                      </a>
                    </>
                  )}

                  {method === 'khalti' && (
                    <>
                      <div style={{ fontSize: '2.8rem', marginBottom: '0.6rem' }}>🟣</div>
                      <p style={{ fontFamily: 'inherit', fontSize: '0.78rem', color: SLATE_L, marginBottom: '0.7rem' }}>Send to this Khalti ID:</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: SLATE, fontWeight: 700, padding: '0.5rem 1.2rem', background: SKY_L, borderRadius: 12, border: `1px solid ${BORDER}` }}>{KHALTI_ID}</div>
                        <CopyBtn text={KHALTI_ID} id="khalti" copied={copied} onCopy={copy} />
                      </div>
                      <p style={{ fontFamily: 'inherit', fontSize: '0.82rem', color: SLATE_M, lineHeight: 1.75, maxWidth: 340, margin: '0 auto 0.85rem' }}>
                        Amount: <strong style={{ color: SKY_D }}>{pkg.price}</strong> · Remarks: <strong style={{ color: SKY_D }}>{ref}</strong>
                      </p>
                      <a href="https://khalti.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0.45rem 1.2rem', borderRadius: 100, border: '1.5px solid #a855f7', color: '#a855f7', background: '#f0e6ff', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}>
                        🟣 Open Khalti App →
                      </a>
                    </>
                  )}

                  {method === 'cod' && (
                    <>
                      <div style={{ fontSize: '2.8rem', marginBottom: '0.6rem' }}>💵</div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: SLATE, marginBottom: '0.6rem' }}>Pay on the Day</h3>
                      <p style={{ fontFamily: 'inherit', fontSize: '0.85rem', color: SLATE_M, lineHeight: 1.8, maxWidth: 320, margin: '0 auto' }}>
                        Your booking is confirmed immediately. Please have <strong style={{ color: SKY_D }}>{pkg.price}</strong> ready on your booking date.
                        <br /><br />
                        <span style={{ fontSize: '0.76rem', color: SLATE_L }}>We'll call {clientPhone || 'your number'} to confirm timing.</span>
                      </p>
                    </>
                  )}

                </div>
              </div>
            </div>

            {/* RIGHT: sticky summary + confirm */}
            <div style={{ position: 'sticky', top: '5.5rem' }}>
              <div style={{ background: WHITE, borderRadius: 20, border: `1px solid ${BORDER}`, overflow: 'hidden', boxShadow: '0 6px 32px rgba(14,165,233,0.1)' }}>

                <div style={{ background: pkg.grad, padding: '1.4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 85, height: 85, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.2rem' }}>{pkg.emoji}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: WHITE, marginBottom: '0.1rem' }}>{pkg.name}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', color: WHITE, fontWeight: 800, lineHeight: 1 }}>{pkg.price}</div>
                  <div style={{ fontFamily: 'inherit', fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)', marginTop: '0.2rem' }}>{pkg.period}</div>
                </div>

                <div style={{ padding: '1rem 1.1rem' }}>
                  {/* Ref */}
                  <div style={{ background: SKY_L, borderRadius: 10, padding: '0.6rem 0.85rem', marginBottom: '0.85rem', border: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontFamily: 'inherit', fontSize: '0.55rem', fontWeight: 800, color: SLATE_L, textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: '0.1rem' }}>Booking Ref</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', color: SKY_D, fontWeight: 700 }}>{ref}</div>
                    </div>
                    <CopyBtn text={ref} id="ref" copied={copied} onCopy={copy} />
                  </div>

                  {/* Summary rows */}
                  {[
                    ['Date',    bookDate    || '—'],
                    ['Time',    bookTime    || '—'],
                    ['Name',    clientName  || '—'],
                    ['Phone',   clientPhone || '—'],
                    ['Payment', sel.label       ],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: `1px solid ${BORDER}`, fontFamily: 'inherit', fontSize: '0.76rem' }}>
                      <span style={{ color: SLATE_L, fontWeight: 700 }}>{k}</span>
                      <span style={{ color: SLATE, fontWeight: 600, textAlign: 'right', maxWidth: '55%', wordBreak: 'break-word' }}>{v}</span>
                    </div>
                  ))}

                  {/* Confirm */}
                  <button
                    onClick={confirmPayment}
                    disabled={saving || !formOK}
                    style={{
                      width: '100%', marginTop: '1rem', padding: '0.88rem',
                      borderRadius: 12, border: 'none',
                      background: saving || !formOK ? BORDER : pkg.grad,
                      color: saving || !formOK ? SLATE_L : WHITE,
                      fontFamily: 'inherit', fontWeight: 700, fontSize: '0.9rem',
                      cursor: saving || !formOK ? 'not-allowed' : 'pointer',
                      boxShadow: saving || !formOK ? 'none' : `0 6px 22px ${pkg.color}44`,
                      transition: 'all 0.2s', letterSpacing: '0.02em',
                    }}
                    onMouseEnter={e => { if (!saving && formOK) e.currentTarget.style.opacity = '0.88' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                  >
                    {saving
                      ? '⏳ Confirming…'
                      : !formOK
                        ? 'Fill in date, time & name'
                        : method === 'cod'
                          ? '✓ Confirm Booking'
                          : `✓ I've Paid — Confirm`}
                  </button>

                  <p style={{ fontFamily: 'inherit', fontSize: '0.63rem', color: SLATE_L, textAlign: 'center', marginTop: '0.65rem', lineHeight: 1.55 }}>
                    🔒 Secure · Confirmed within 24 hrs<br />Free cancellation 48 hrs before booking
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