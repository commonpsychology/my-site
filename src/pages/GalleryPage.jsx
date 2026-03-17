import { useState, useCallback } from 'react'

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

const FILTERS = ['All', 'Workshops', 'Community Outreach', 'Team', 'Events', 'Therapy Spaces', 'Award & Recognition']

/* ── Gallery items — rich gradient placeholders with emoji art ── */
const ITEMS = [
  { id:1,  title: 'Annual Mental Health Awareness Walk 2024',     category: 'Events',               date: 'Mar 2024',  emoji: '🚶‍♀️', cols: 2, rows: 2, grad: 'linear-gradient(135deg,#007BA8 0%,#00BFFF 60%,#a0e9ff 100%)',    desc: '600+ participants walked 5km across Kathmandu in solidarity with mental health. Featured live music, art stalls, and free mood screenings.' },
  { id:2,  title: 'Rural Outreach Camp — Sindhupalchok',          category: 'Community Outreach',   date: 'Jan 2024',  emoji: '🏕️', cols: 1, rows: 1, grad: 'linear-gradient(135deg,#2d4a3e 0%,#3d6b5a 60%,#6a9e88 100%)',  desc: 'Our team conducted psychosocial first aid sessions for 80 families in earthquake-affected Sindhupalchok district.' },
  { id:3,  title: 'Dr. Anita Shrestha at WHO Conference',         category: 'Award & Recognition',  date: 'Dec 2023',  emoji: '🏆', cols: 1, rows: 1, grad: 'linear-gradient(135deg,#b56a28 0%,#d4a574 60%,#f5ede0 100%)',  desc: 'Our Director presented research on teletherapy efficacy in LMICs at the WHO South-East Asia Regional Forum, Geneva.' },
  { id:4,  title: 'Calm Room — Our Therapy Lounge',               category: 'Therapy Spaces',       date: 'Nov 2023',  emoji: '🛋️', cols: 1, rows: 2, grad: 'linear-gradient(135deg,#0f4c6b 0%,#009FD4 60%,#22d3ee 100%)', desc: 'The new sensory calm room at our Baneshwor center — designed with biophilic elements to ease pre-session anxiety.' },
  { id:5,  title: 'Mindfulness Workshop — Corporate Group',       category: 'Workshops',            date: 'Oct 2023',  emoji: '🧘', cols: 1, rows: 1, grad: 'linear-gradient(135deg,#1a3a4a 0%,#2e6080 60%,#5b9ab5 100%)',   desc: '35 employees from a leading Kathmandu bank completed a full-day mindfulness and stress management workshop.' },
  { id:6,  title: 'Team Building Retreat — Nagarkot',             category: 'Team',                 date: 'Sep 2023',  emoji: '🌄', cols: 1, rows: 1, grad: 'linear-gradient(135deg,#006b8f 0%,#00BFFF 60%,#a0e9ff 100%)',  desc: 'Our clinical team spent a weekend in Nagarkot for reflective practice, team bonding, and continuing education sessions.' },
  { id:7,  title: 'School Mental Health Day — Lalitpur',          category: 'Community Outreach',   date: 'Aug 2023',  emoji: '🏫', cols: 2, rows: 1, grad: 'linear-gradient(135deg,#0369a1 0%,#0ea5e9 60%,#7dd3fc 100%)',  desc: 'Interactive art and discussion sessions with 300 students at 4 schools in Lalitpur as part of our School Mental Health Programme.' },
  { id:8,  title: 'Art Therapy Group Session',                    category: 'Therapy Spaces',       date: 'Jul 2023',  emoji: '🎨', cols: 1, rows: 1, grad: 'linear-gradient(135deg,#c45b2a 0%,#e8834d 60%,#f5c5a3 100%)',  desc: 'Participants in our trauma recovery group creating expressive art pieces. Facilitated by our licensed art therapist.' },
  { id:9,  title: 'Women\'s Resilience Circle — Bhaktapur',       category: 'Community Outreach',   date: 'Jun 2023',  emoji: '💜', cols: 1, rows: 1, grad: 'linear-gradient(135deg,#5b2d8e 0%,#9b59b6 60%,#d7bde2 100%)',  desc: 'Monthly safe circle for women survivors facilitated by our trained social workers and partner NGO Saathi.' },
  { id:10, title: 'New Center Opening — Baneshwor',               category: 'Events',               date: 'May 2023',  emoji: '🎉', cols: 1, rows: 1, grad: 'linear-gradient(135deg,#007BA8 0%,#22d3ee 60%,#e0f7ff 100%)',  desc: 'Ribbon-cutting ceremony for our expanded Baneshwor facility, now featuring 6 therapy rooms, a group hall, and the calm room.' },
  { id:11, title: 'Trainee Cohort — Class of 2023',               category: 'Team',                 date: 'Apr 2023',  emoji: '👩‍🎓', cols: 1, rows: 1, grad: 'linear-gradient(135deg,#2d4a3e 0%,#6a9e88 60%,#b8d5c8 100%)', desc: 'Our 2023 trainee psychologists completing their supervised clinical placements and receiving their certificates.' },
  { id:12, title: 'Couples Workshop — Gottman Method',            category: 'Workshops',            date: 'Mar 2023',  emoji: '💑', cols: 2, rows: 1, grad: 'linear-gradient(135deg,#0f2c3f 0%,#009FD4 60%,#22d3ee 100%)',  desc: '4 couples completed our intensive half-day Gottman Method workshop on communication, conflict, and emotional connection.' },
]

/* ══════════════════════════════════════
   GALLERY CARD
══════════════════════════════════════ */
function GalleryCard({ item, onOpen, colSpan = 1, rowSpan = 1 }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(item)}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        borderRadius: 20,
        background: C.white,
        position: 'relative',
        overflow: 'visible',
        cursor: 'pointer',
        /* multi-layer bevel on hover */
        boxShadow: hovered
          ? `0 2px 0 0 ${C.skyDeep},
             0 5px 0 0 ${C.skyMid}bb,
             0 9px 0 0 ${C.skyBright}55,
             0 24px 56px rgba(0,191,255,0.22),
             inset 0 1px 0 rgba(255,255,255,0.95)`
          : `0 2px 14px rgba(0,191,255,0.07), inset 0 1px 0 rgba(255,255,255,0.8)`,
        border: `1.5px solid ${hovered ? C.skyBright : C.borderFaint}`,
        transform: hovered ? 'translateY(-8px) scale(1.015)' : 'translateY(0) scale(1)',
        transition: 'all 0.32s cubic-bezier(0.34,1.56,0.64,1)',
        minHeight: rowSpan > 1 ? 380 : 220,
      }}
    >
      {/* ── Photo area ── */}
      <div style={{
        borderRadius: '18px 18px 0 0',
        background: item.grad,
        height: rowSpan > 1 ? 280 : 180,
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'height 0.3s ease',
      }}>
        {/* shimmer layer */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered ? 'rgba(255,255,255,0.09)' : 'transparent',
          transition: 'background 0.3s',
        }} />

        {/* emoji art */}
        <span style={{
          fontSize: rowSpan > 1 ? '5rem' : '3.5rem',
          filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.22))',
          position: 'relative',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.3s ease',
          display: 'block',
        }}>{item.emoji}</span>

        {/* date badge top-left */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: 100, padding: '3px 10px',
          fontSize: '0.65rem', fontWeight: 700, color: 'white',
          fontFamily: 'var(--font-body)',
        }}>{item.date}</div>

        {/* zoom icon on hover top-right */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          width: 30, height: 30, borderRadius: '50%',
          background: hovered ? btnGrad : 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${hovered ? 'transparent' : 'rgba(255,255,255,0.3)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.8rem', color: 'white',
          transition: 'all 0.3s ease',
          boxShadow: hovered ? '0 4px 14px rgba(0,191,255,0.4)' : 'none',
        }}>🔍</div>
      </div>

      {/* ── Floating category label ── */}
      <div style={{
        position: 'absolute',
        /* sits right at the seam between image and body */
        bottom: rowSpan > 1 ? 'calc(100% - 302px)' : 'calc(100% - 202px)',
        left: '50%', transform: 'translateX(-50%)',
        zIndex: 10,
        background: hovered ? btnGrad : C.white,
        border: `1.5px solid ${hovered ? C.skyBright : C.border}`,
        borderRadius: 100,
        padding: '5px 18px',
        boxShadow: hovered
          ? '0 4px 20px rgba(0,191,255,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
          : '0 4px 16px rgba(0,0,0,0.12)',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 800,
          color: hovered ? 'white' : C.textMid,
          letterSpacing: '0.05em',
          transition: 'color 0.3s',
        }}>{item.category}</span>
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: '1.3rem 1.4rem 1.25rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: colSpan > 1 ? '1.05rem' : '0.92rem',
          color: C.textDark, lineHeight: 1.35, marginBottom: '0.5rem',
        }}>{item.title}</h3>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.78rem',
          color: C.textLight, lineHeight: 1.6, margin: 0,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{item.desc}</p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════ */
function Lightbox({ item, items, onClose, onNav }) {
  if (!item) return null
  const idx = items.findIndex(i => i.id === item.id)

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 600,
        background: 'rgba(10,25,40,0.88)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{
        background: C.white, borderRadius: 24,
        maxWidth: 680, width: '100%',
        boxShadow: `0 0 0 2px ${C.skyBright}, 0 40px 100px rgba(0,0,0,0.4)`,
        overflow: 'hidden', position: 'relative',
      }}>
        {/* Large image area */}
        <div style={{
          height: 320, background: item.grad,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <span style={{ fontSize: '6rem', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.25))' }}>{item.emoji}</span>
          {/* gradient accent bar */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: btnGrad }} />
          {/* Date */}
          <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 100, padding: '4px 12px', fontSize: '0.7rem', fontWeight: 700, color: 'white', fontFamily: 'var(--font-body)' }}>{item.date}</div>
          {/* Category pill */}
          <div style={{ position: 'absolute', top: 16, right: 54, background: btnGrad, borderRadius: 100, padding: '4px 12px', fontSize: '0.68rem', fontWeight: 800, color: 'white', fontFamily: 'var(--font-body)', boxShadow: '0 2px 10px rgba(0,191,255,0.4)' }}>{item.category}</div>
          {/* Close */}
          <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: 'white', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: C.textDark, marginBottom: '0.75rem', lineHeight: 1.3 }}>{item.title}</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: C.textMid, lineHeight: 1.72, marginBottom: '1.5rem' }}>{item.desc}</p>

          {/* Nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <button
              onClick={() => onNav(items[(idx - 1 + items.length) % items.length])}
              style={{ padding: '0.55rem 1.2rem', borderRadius: 10, border: `1.5px solid ${C.border}`, background: C.white, color: C.textMid, fontFamily: 'var(--font-body)', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.skyBright; e.currentTarget.style.color = C.skyMid }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMid }}
            >← Prev</button>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: C.textLight }}>{idx + 1} / {items.length}</span>
            <button
              onClick={() => onNav(items[(idx + 1) % items.length])}
              style={{ padding: '0.55rem 1.2rem', borderRadius: 10, border: 'none', background: btnGrad, color: 'white', fontFamily: 'var(--font-body)', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,191,255,0.35)' }}
            >Next →</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = ITEMS.filter(i => activeFilter === 'All' || i.category === activeFilter)

  const openLightbox = useCallback(item => setLightbox(item), [])
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const navLightbox = useCallback(item => setLightbox(item), [])

  return (
    <div className="page-wrapper" style={{ background: C.skyGhost }}>

      {/* ── Hero ── */}
      <div style={{ background: heroGrad, padding: '5rem 4rem 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: '50%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 100, padding: '0.3rem 1rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.92)', textTransform: 'uppercase' }}>🖼️ Photo Gallery</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
            Moments That<br />Matter
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.75, maxWidth: 520 }}>
            A glimpse into our workshops, community programs, team life, and the spaces we've built — captured in moments of connection, learning, and growth.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 4rem 5rem' }}>

        {/* ── Filter bar ── */}
        <div style={{
          background: sectionGrad, borderRadius: 16, padding: '1.25rem 1.5rem',
          border: `1px solid ${C.borderFaint}`, marginBottom: '3rem',
          display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center',
        }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, color: C.textLight, marginRight: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Filter:</span>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{
                padding: '0.4rem 1rem', borderRadius: 100,
                border: `1.5px solid ${activeFilter === f ? C.skyBright : C.border}`,
                background: activeFilter === f ? btnGrad : C.white,
                color: activeFilter === f ? 'white' : C.textMid,
                fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: activeFilter === f ? '0 4px 14px rgba(0,191,255,0.3)' : 'none',
              }}>{f}</button>
          ))}
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: C.textLight }}>
            {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* ── Masonry-style grid — paddingTop for floating labels ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '220px',
          gap: '1.75rem',
          paddingTop: '0.5rem',
        }}>
          {filtered.map((item, i) => {
            /* Give first and every 7th item a 2-col span for variety */
            const bigCol = i === 0 || i === 6 || i === 11
            const bigRow = i === 0 || i === 3 || i === 9
            return (
              <GalleryCard
                key={item.id}
                item={item}
                onOpen={openLightbox}
                colSpan={bigCol ? 2 : 1}
                rowSpan={bigRow ? 2 : 1}
              />
            )
          })}
        </div>

        {/* ── Submit photo CTA ── */}
        <div style={{
          marginTop: '4rem', padding: '3rem',
          background: heroGrad, borderRadius: 20,
          textAlign: 'center',
          boxShadow: '0 16px 48px rgba(0,191,255,0.2)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -30, left: -30, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📸</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'white', marginBottom: '0.75rem' }}>Share a Memory With Us</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.82)', marginBottom: '1.5rem', maxWidth: 440, margin: '0 auto 1.5rem' }}>
              Attended one of our events? We'd love to feature your photos. Send them to us and celebrate the moment together.
            </p>
            <a href="mailto:hello@pujasamargi.com.np" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '0.75rem 2rem', borderRadius: 12, border: 'none', background: C.white, color: C.skyDeep, fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                📨 Send Your Photos
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox item={lightbox} items={filtered} onClose={closeLightbox} onNav={navLightbox} />
    </div>
  )
}