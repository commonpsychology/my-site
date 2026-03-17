import { useState } from 'react'
import { useRouter } from '../context/RouterContext'

/* ── Palette ── */
const C = {
  skyBright:  '#00BFFF',
  skyMid:     '#009FD4',
  skyDeep:    '#007BA8',
  skyFaint:   '#E0F7FF',
  skyFainter: '#F0FBFF',
  skyGhost:   '#F8FEFF',
  white:      '#ffffff',
  mint:       '#e8f3ee',
  textDark:   '#1a3a4a',
  textMid:    '#2e6080',
  textLight:  '#7a9aaa',
  border:     '#b0d4e8',
  borderFaint:'#daeef8',
}

const heroGrad    = `linear-gradient(135deg, ${C.skyDeep} 0%, ${C.skyMid} 40%, ${C.skyBright} 80%, #22d3ee 100%)`
const sectionGrad = `linear-gradient(135deg, ${C.skyFainter} 0%, ${C.mint} 60%, ${C.skyFaint} 100%)`
const btnGrad     = `linear-gradient(135deg, ${C.skyDeep} 0%, ${C.skyBright} 100%)`

/* ── Workshop data with placeholder image gradients ── */
const CATEGORIES = ['All', 'Upcoming', 'Stress & Anxiety', 'Relationships', 'Mindfulness', 'Trauma', 'Youth & Parenting', 'Professional']

const WORKSHOPS = [
  {
    id: 1,
    title: 'Stress-Free Living: A Weekend Immersion',
    category: 'Stress & Anxiety',
    type: 'Live Workshop',
    date: 'Jul 19–20, 2025',
    time: '9:00 AM – 5:00 PM',
    venue: 'Puja Samargi Center, Baneshwor',
    seats: 12,
    seatsLeft: 4,
    price: 'NPR 3,500',
    instructor: 'Dr. Anita Shrestha',
    duration: '2 Days',
    upcoming: true,
    img: 'linear-gradient(135deg, #007BA8 0%, #00BFFF 60%, #22d3ee 100%)',
    emoji: '🧘',
    desc: 'A transformative two-day immersion into evidence-based stress management. Learn breathwork, CBT tools, and somatic techniques in a supportive group environment.',
    tags: ['CBT', 'Breathwork', 'Group'],
  },
  {
    id: 2,
    title: 'Mindful Parenting: Raising Emotionally Resilient Children',
    category: 'Youth & Parenting',
    type: 'Live Workshop',
    date: 'Aug 2, 2025',
    time: '10:00 AM – 2:00 PM',
    venue: 'Online (Zoom)',
    seats: 20,
    seatsLeft: 11,
    price: 'NPR 1,800',
    instructor: 'Rohan Karki',
    duration: '4 Hours',
    upcoming: true,
    img: 'linear-gradient(135deg, #2d4a3e 0%, #3d6b5a 60%, #6a9e88 100%)',
    emoji: '👨‍👩‍👧',
    desc: 'Practical tools for parents to model emotional regulation, manage meltdowns with compassion, and nurture secure attachment with children of all ages.',
    tags: ['Parenting', 'Attachment', 'Online'],
  },
  {
    id: 3,
    title: 'Introduction to Mindfulness-Based Stress Reduction (MBSR)',
    category: 'Mindfulness',
    type: 'Online Course',
    date: 'Aug 10 – Sep 7, 2025',
    time: 'Self-Paced',
    venue: 'Online Portal',
    seats: 50,
    seatsLeft: 23,
    price: 'NPR 2,200',
    instructor: 'Prabha Thapa',
    duration: '4 Weeks',
    upcoming: true,
    img: 'linear-gradient(135deg, #0f4c6b 0%, #009FD4 60%, #22d3ee 100%)',
    emoji: '🌿',
    desc: 'The globally-validated 8-week MBSR programme, compressed into 4 weeks with daily guided meditations, body scans, and mindful movement videos.',
    tags: ['MBSR', 'Self-Paced', 'Meditation'],
  },
  {
    id: 4,
    title: 'Communication & Conflict: Couples Workshop',
    category: 'Relationships',
    type: 'Live Workshop',
    date: 'Aug 23, 2025',
    time: '11:00 AM – 4:00 PM',
    venue: 'Puja Samargi Center, Baneshwor',
    seats: 8,
    seatsLeft: 2,
    price: 'NPR 5,000',
    instructor: 'Dr. Anita Shrestha',
    duration: '5 Hours',
    upcoming: true,
    img: 'linear-gradient(135deg, #b56a28 0%, #d4a574 60%, #f5ede0 100%)',
    emoji: '💑',
    desc: 'For couples who want to fight better, listen deeper, and reconnect. Based on Gottman Method principles, this half-day session is practical and immediately applicable.',
    tags: ['Gottman', 'Couples', 'Communication'],
  },
  {
    id: 5,
    title: 'Trauma-Informed Yoga: Movement for Healing',
    category: 'Trauma',
    type: 'Recurring Class',
    date: 'Every Saturday',
    time: '7:30 AM – 9:00 AM',
    venue: 'Puja Samargi Center, Baneshwor',
    seats: 15,
    seatsLeft: 7,
    price: 'NPR 600/session',
    instructor: 'Prabha Thapa',
    duration: '90 Min',
    upcoming: false,
    img: 'linear-gradient(135deg, #1a3a4a 0%, #2e6080 60%, #5b9ab5 100%)',
    emoji: '🕊️',
    desc: 'A gentle, trauma-sensitive yoga class designed for survivors and those experiencing chronic stress. No prior yoga experience required. Mats provided.',
    tags: ['Yoga', 'Somatic', 'Recurring'],
  },
  {
    id: 6,
    title: 'Burnout to Balance: A Guide for Mental Health Professionals',
    category: 'Professional',
    type: 'CPD Workshop',
    date: 'Sep 6, 2025',
    time: '9:00 AM – 1:00 PM',
    venue: 'Online (Zoom)',
    seats: 30,
    seatsLeft: 14,
    price: 'NPR 2,800',
    instructor: 'Dr. Sunita Rai',
    duration: '4 Hours',
    upcoming: true,
    img: 'linear-gradient(135deg, #006b8f 0%, #00BFFF 80%, #a0e9ff 100%)',
    emoji: '⚕️',
    desc: 'A CPD-certified session for counsellors, social workers, and healthcare staff. Covers vicarious trauma, supervision models, and sustainable self-care frameworks.',
    tags: ['CPD', 'Professionals', 'Burnout'],
  },
  {
    id: 7,
    title: 'Teen Minds: Emotional Intelligence for Adolescents',
    category: 'Youth & Parenting',
    type: 'School Programme',
    date: 'Sep 13–14, 2025',
    time: '10:00 AM – 12:00 PM',
    venue: 'Partner Schools, Kathmandu',
    seats: 40,
    seatsLeft: 18,
    price: 'NPR 800',
    instructor: 'Rohan Karki',
    duration: '2 × 2 Hours',
    upcoming: true,
    img: 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 60%, #7dd3fc 100%)',
    emoji: '🧠',
    desc: 'Interactive sessions for students aged 13–18 on understanding emotions, peer pressure, social media anxiety, and building resilience tools they will actually use.',
    tags: ['Teens', 'Schools', 'EQ'],
  },
  {
    id: 8,
    title: 'Grief & Loss: Finding Your Way Through',
    category: 'Trauma',
    type: 'Support Group',
    date: 'Every 2nd Sunday',
    time: '3:00 PM – 5:00 PM',
    venue: 'Puja Samargi Center, Baneshwor',
    seats: 10,
    seatsLeft: 5,
    price: 'NPR 400/session',
    instructor: 'Dr. Sunita Rai',
    duration: '2 Hours',
    upcoming: false,
    img: 'linear-gradient(135deg, #2c3e50 0%, #4a6fa5 60%, #b0d4e8 100%)',
    emoji: '🕯️',
    desc: 'A facilitated support group for those navigating bereavement, loss of relationship, or major life transitions. A safe, confidential circle with clinical oversight.',
    tags: ['Grief', 'Group', 'Support'],
  },
]

/* ══════════════════════════════════════
   WORKSHOP CARD with floating label + bevel hover
══════════════════════════════════════ */
function WorkshopCard({ ws, onBook }) {
  const [hovered, setHovered] = useState(false)
  const pct = Math.round((ws.seatsLeft / ws.seats) * 100)
  const urgent = ws.seatsLeft <= 3

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20,
        background: C.white,
        position: 'relative',
        overflow: 'visible',
        cursor: 'pointer',
        /* bevel / lifted shadow on hover */
        boxShadow: hovered
          ? `0 2px 0 0 ${C.skyDeep},
             0 4px 0 0 ${C.skyMid}cc,
             0 8px 0 0 ${C.skyBright}66,
             0 20px 48px rgba(0,191,255,0.22),
             inset 0 1px 0 rgba(255,255,255,0.9)`
          : `0 2px 12px rgba(0,191,255,0.07), inset 0 1px 0 rgba(255,255,255,0.8)`,
        border: `1.5px solid ${hovered ? C.skyBright : C.borderFaint}`,
        transform: hovered ? 'translateY(-6px) scale(1.012)' : 'translateY(0) scale(1)',
        transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      {/* ── Image area ── */}
      <div style={{
        height: 180, borderRadius: '18px 18px 0 0',
        background: ws.img,
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* shimmer overlay on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered ? 'rgba(255,255,255,0.08)' : 'transparent',
          transition: 'background 0.3s',
        }} />

        {/* big emoji */}
        <span style={{ fontSize: '3.5rem', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))', position: 'relative' }}>
          {ws.emoji}
        </span>

        {/* type badge top-left */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: 100, padding: '3px 10px',
          fontSize: '0.68rem', fontWeight: 700, color: 'white',
          letterSpacing: '0.06em', fontFamily: 'var(--font-body)',
        }}>{ws.type}</div>

        {/* upcoming badge top-right */}
        {ws.upcoming && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: btnGrad,
            borderRadius: 100, padding: '3px 10px',
            fontSize: '0.65rem', fontWeight: 800, color: 'white',
            letterSpacing: '0.06em', fontFamily: 'var(--font-body)',
            boxShadow: '0 2px 8px rgba(0,191,255,0.4)',
          }}>UPCOMING</div>
        )}
      </div>

      {/* ── Floating label ── */}
      <div style={{
        position: 'absolute',
        bottom: 'calc(100% - 210px)',
        left: '50%', transform: 'translateX(-50%)',
        zIndex: 10,
        background: hovered ? btnGrad : C.white,
        border: `1.5px solid ${hovered ? C.skyBright : C.border}`,
        borderRadius: 100,
        padding: '5px 16px',
        boxShadow: hovered
          ? `0 4px 20px rgba(0,191,255,0.35), 0 1px 0 rgba(255,255,255,0.4) inset`
          : `0 4px 16px rgba(0,0,0,0.12)`,
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 800,
          color: hovered ? 'white' : C.textMid,
          letterSpacing: '0.05em',
          transition: 'color 0.3s',
        }}>{ws.category}</span>
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: '1.5rem 1.4rem 1.4rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: '1rem',
          color: C.textDark, lineHeight: 1.35, marginBottom: '0.6rem',
        }}>{ws.title}</h3>

        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.8rem',
          color: C.textLight, lineHeight: 1.6, marginBottom: '1rem',
        }}>{ws.desc}</p>

        {/* Meta rows */}
        {[
          { icon: '📅', val: ws.date },
          { icon: '🕐', val: ws.time },
          { icon: '📍', val: ws.venue },
          { icon: '👩‍⚕️', val: ws.instructor },
        ].map((m, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            marginBottom: '0.3rem',
          }}>
            <span style={{ fontSize: '0.8rem', width: 18, flexShrink: 0 }}>{m.icon}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: C.textMid }}>{m.val}</span>
          </div>
        ))}

        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', margin: '0.85rem 0' }}>
          {ws.tags.map(t => (
            <span key={t} style={{
              fontSize: '0.65rem', fontWeight: 700, padding: '2px 9px',
              borderRadius: 100,
              background: hovered ? C.skyFaint : C.skyFainter,
              color: C.skyMid, border: `1px solid ${C.borderFaint}`,
              transition: 'background 0.3s',
            }}>#{t}</span>
          ))}
        </div>

        {/* Seats bar */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: 'var(--font-body)', fontSize: '0.7rem',
            color: urgent ? '#c62828' : C.textLight, marginBottom: '0.3rem',
          }}>
            <span>{urgent ? '🔥 Only ' + ws.seatsLeft + ' seats left!' : ws.seatsLeft + ' seats available'}</span>
            <span>{ws.duration}</span>
          </div>
          <div style={{ height: 4, borderRadius: 4, background: C.skyFaint, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 4,
              width: `${100 - pct}%`,
              background: urgent ? 'linear-gradient(90deg,#e53e3e,#f97316)' : btnGrad,
              transition: 'width 0.6s ease',
            }} />
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '0.75rem',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: C.textDark, fontWeight: 700 }}>{ws.price}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: C.textLight }}>per person</div>
          </div>
          <button
            onClick={() => onBook(ws)}
            style={{
              padding: '0.55rem 1.2rem', borderRadius: 10, border: 'none',
              background: hovered ? btnGrad : C.skyFaint,
              color: hovered ? 'white' : C.skyMid,
              fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.3s ease',
              boxShadow: hovered ? '0 4px 16px rgba(0,191,255,0.35)' : 'none',
            }}>
            Register →
          </button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function WorkshopsPage() {
  const { navigate } = useRouter()
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = WORKSHOPS.filter(w => {
    if (activeCategory === 'All') return true
    if (activeCategory === 'Upcoming') return w.upcoming
    return w.category === activeCategory
  })

  return (
    <div className="page-wrapper" style={{ background: C.skyGhost }}>

      {/* ── Hero ── */}
      <div style={{ background: heroGrad, padding: '5rem 4rem 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: '50%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 100, padding: '0.3rem 1rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.92)', textTransform: 'uppercase' }}>🎓 Workshops & Events</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
            Learn, Heal &<br />Grow Together
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.75, maxWidth: 520, marginBottom: '2rem' }}>
            Expert-led workshops, immersive courses, and support groups — designed to give you practical tools for a healthier mind. All levels welcome.
          </p>
          {/* Quick stats */}
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
            {[
              { icon: '🎓', val: '24+', label: 'Workshops / yr' },
              { icon: '👥', val: '800+', label: 'Participants' },
              { icon: '🌐', val: 'Online & In-Person', label: 'Formats available' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'white', fontWeight: 700 }}>{s.icon} {s.val}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)', fontWeight: 600, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 4rem 5rem' }}>

        {/* ── Category filter ── */}
        <div style={{
          background: sectionGrad, borderRadius: 16, padding: '1.25rem 1.5rem',
          border: `1px solid ${C.borderFaint}`, marginBottom: '2.5rem',
          display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center',
        }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, color: C.textLight, marginRight: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Filter:</span>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.4rem 1rem', borderRadius: 100,
                border: `1.5px solid ${activeCategory === cat ? C.skyBright : C.border}`,
                background: activeCategory === cat ? btnGrad : C.white,
                color: activeCategory === cat ? 'white' : C.textMid,
                fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: activeCategory === cat ? '0 4px 14px rgba(0,191,255,0.3)' : 'none',
              }}>{cat}</button>
          ))}
        </div>

        {/* ── Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem',
          paddingTop: '0.5rem', /* space for floating labels */
        }}>
          {filtered.map(ws => (
            <WorkshopCard key={ws.id} ws={ws} onBook={setSelected} />
          ))}
        </div>

        {/* ── CTA strip ── */}
        <div style={{
          marginTop: '4rem', padding: '3rem',
          background: heroGrad, borderRadius: 20,
          display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap',
          boxShadow: '0 16px 48px rgba(0,191,255,0.2)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
          <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'white', marginBottom: '0.5rem' }}>Want a Custom Workshop?</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.65 }}>
              We design bespoke mental health workshops for organisations, schools, and corporates. Get in touch to discuss your needs.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', position: 'relative' }}>
            <button onClick={() => navigate('/contact')} style={{ padding: '0.65rem 1.5rem', borderRadius: 10, border: 'none', background: C.white, color: C.skyDeep, fontFamily: 'var(--font-body)', fontWeight: 700, cursor: 'pointer' }}>
              Enquire Now →
            </button>
          </div>
        </div>
      </div>

      {/* ── Booking modal ── */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{
          position: 'fixed', inset: 0, zIndex: 500,
          background: 'rgba(26,58,74,0.55)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: C.white, borderRadius: 24, padding: '2.5rem',
            maxWidth: 480, width: '100%',
            boxShadow: '0 32px 80px rgba(0,0,0,0.2)',
            border: `1.5px solid ${C.skyBright}`,
          }}>
            <div style={{ height: 6, background: btnGrad, borderRadius: 3, marginBottom: '1.5rem' }} />
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{selected.emoji}</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: C.textDark, marginBottom: '0.5rem' }}>{selected.title}</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: C.textMid, lineHeight: 1.65, marginBottom: '1.5rem' }}>{selected.desc}</p>
            <div style={{ background: sectionGrad, borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.5rem', border: `1px solid ${C.borderFaint}` }}>
              {[
                ['Date', selected.date], ['Time', selected.time],
                ['Venue', selected.venue], ['Instructor', selected.instructor],
                ['Duration', selected.duration], ['Price', selected.price],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: `1px solid ${C.borderFaint}` }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: C.textLight, fontWeight: 700 }}>{k}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: C.textDark, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setSelected(null)} style={{ flex: 1, padding: '0.7rem', borderRadius: 10, border: `1.5px solid ${C.border}`, background: C.white, color: C.textMid, fontFamily: 'var(--font-body)', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { navigate('/book'); setSelected(null) }} style={{ flex: 2, padding: '0.7rem', borderRadius: 10, border: 'none', background: btnGrad, color: 'white', fontFamily: 'var(--font-body)', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,191,255,0.35)' }}>Confirm Registration →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}