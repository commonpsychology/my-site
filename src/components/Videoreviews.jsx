import { useState, useRef, useEffect } from 'react'
import { useRouter } from '../context/RouterContext'

/*
  HOW TO ADD YOUR LOCAL VIDEOS
  ─────────────────────────────
  1. Put your .mp4 files inside:  /public/videos/
     e.g.  /public/videos/sita.mp4
           /public/videos/bikram.mp4  etc.

  2. Set the `videoSrc` field below to match:
     videoSrc: '/videos/sita.mp4'

  3. Optionally add a poster thumbnail:
     posterSrc: '/videos/sita-thumb.jpg'

  The video will play inline with native browser controls.
*/

const VIDEOS = [
  {
    name: 'Sita Maharjan',
    city: 'Kathmandu',
    duration: '2:14',
    topic: 'Anxiety Recovery',
    thumb: '😊',
    bg: 'var(--blue-mist)',
    quote: '"I was drowning in anxiety. After 3 months with Dr. Anita, I finally feel like myself again."',
    stars: 5,
    videoSrc: '/videos/sita.mp4',         // ← rename to match your file
    // posterSrc: '/videos/sita-thumb.jpg',
  },
  {
    name: 'Bikram Thapa',
    city: 'Pokhara',
    duration: '1:58',
    topic: 'Depression',
    thumb: '🙂',
    bg: 'var(--green-mist)',
    quote: '"The PHQ-9 assessment showed me exactly what was happening. The care here changed my life."',
    stars: 5,
    videoSrc: '/videos/bikram.mp4',
    // posterSrc: '/videos/bikram-thumb.jpg',
  },
  {
    name: 'Kamala Rai',
    city: 'Lalitpur',
    duration: '3:02',
    topic: 'Relationship Counselling',
    thumb: '😄',
    bg: 'var(--earth-cream)',
    quote: '"My husband and I were on the verge of separating. Puja Samargi saved our marriage."',
    stars: 5,
    videoSrc: '/videos/kamala.mp4',
    // posterSrc: '/videos/kamala-thumb.jpg',
  },
  {
    name: 'Arjun Basnet',
    city: 'Butwal',
    duration: '2:30',
    topic: 'Burnout & Stress',
    thumb: '😌',
    bg: 'var(--sky-light)',
    quote: '"I learned tools I actually use every day. No jargon — just real, practical help."',
    stars: 5,
    videoSrc: '/videos/arjun.mp4',
    // posterSrc: '/videos/arjun-thumb.jpg',
  },
  {
    name: 'Nisha Gurung',
    city: 'Dharan',
    duration: '1:45',
    topic: 'Grief Counselling',
    thumb: '🌱',
    bg: 'var(--blue-mist)',
    quote: '"Losing my mother was unbearable. Ms. Priya helped me grieve with dignity and hope."',
    stars: 5,
    videoSrc: '/videos/nisha.mp4',
    // posterSrc: '/videos/nisha-thumb.jpg',
  },
  {
    name: 'Rajan Shrestha',
    city: 'Hetauda',
    duration: '2:52',
    topic: 'PTSD Recovery',
    thumb: '💪',
    bg: 'var(--green-mist)',
    quote: '"I never thought I could talk about the earthquake. Now I can. Truly transformative."',
    stars: 5,
    videoSrc: '/videos/rajan.mp4',
    // posterSrc: '/videos/rajan-thumb.jpg',
  },
]

const GAP = 20

function getVisible(w) {
  if (w < 640)  return 1
  if (w < 1024) return 2
  return 3
}

/* ══════════════════════════════════════
   VIDEO THUMBNAIL
   • videoSrc set → native <video> with controls
   • no videoSrc  → styled emoji placeholder (no forbidden sign)
══════════════════════════════════════ */
function VideoThumbnail({ v }) {
  const [errored, setErrored] = useState(false)

  if (v.videoSrc && !errored) {
    return (
      <div style={{ position: 'relative', width: '100%', background: '#111' }}>
        {/* Topic pill */}
        <div style={{
          position: 'absolute', top: 10, left: 10, zIndex: 2,
          background: 'var(--white)', borderRadius: 100,
          padding: '3px 9px',
          fontFamily: 'var(--font-body)', fontSize: '0.65rem',
          fontWeight: 700, color: 'var(--blue-deep)',
          border: '1px solid var(--blue-pale)',
          pointerEvents: 'none',
        }}>
          {v.topic}
        </div>

        <video
          src={v.videoSrc}
          poster={v.posterSrc || undefined}
          controls
          playsInline
          preload="metadata"
          onError={() => setErrored(true)}
          style={{
            display: 'block',
            width: '100%',
            height: 200,
            objectFit: 'cover',
            background: '#111',
          }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

  /* Fallback — no file set or file failed to load */
  return (
    <div style={{
      position: 'relative',
      height: 200,
      background: v.bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    }}>
      <span style={{ fontSize: '3rem' }}>{v.thumb}</span>

      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.72rem',
        fontWeight: 600,
        color: 'var(--text-light)',
        background: 'rgba(255,255,255,0.8)',
        padding: '4px 12px',
        borderRadius: 100,
      }}>
        {errored ? 'Video unavailable' : 'Video coming soon'}
      </span>

      {/* Topic pill */}
      <div style={{
        position: 'absolute', top: 10, left: 10,
        background: 'var(--white)', borderRadius: 100,
        padding: '3px 9px',
        fontFamily: 'var(--font-body)', fontSize: '0.65rem',
        fontWeight: 700, color: 'var(--blue-deep)',
        border: '1px solid var(--blue-pale)',
      }}>
        {v.topic}
      </div>

      {/* Duration */}
      <div style={{
        position: 'absolute', bottom: 8, right: 10,
        background: 'rgba(0,0,0,0.45)', borderRadius: 4,
        padding: '2px 6px',
        fontFamily: 'var(--font-body)', fontSize: '0.7rem',
        color: 'white', fontWeight: 600,
      }}>
        {v.duration}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   SINGLE VIDEO CARD
══════════════════════════════════════ */
function VideoCard({ v, cardW }) {
  return (
    <div
      style={{
        width: cardW,
        minWidth: cardW,
        flexShrink: 0,
        background: 'var(--off-white)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--blue-pale)',
        boxShadow: 'var(--shadow-soft)',
        transition: 'box-shadow 0.25s, transform 0.25s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-mid)'
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-soft)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <VideoThumbnail v={v} />

      {/* Text body */}
      <div style={{ padding: '1.1rem' }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.83rem',
          color: 'var(--text-mid)', fontStyle: 'italic',
          lineHeight: 1.65, marginBottom: '0.8rem',
        }}>
          {v.quote}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '0.83rem',
              fontWeight: 700, color: 'var(--blue-deep)',
            }}>
              {v.name}
            </div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '0.7rem',
              color: 'var(--text-light)',
            }}>
              {v.city}
            </div>
          </div>
          <div style={{ color: 'var(--earth-warm)', fontSize: '0.75rem', letterSpacing: 1 }}>
            {'★'.repeat(v.stars)}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════ */
export default function VideoReviews() {
  const { navigate } = useRouter()
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState(960)
  const wrapRef = useRef(null)

  useEffect(() => {
    function measure() {
      if (wrapRef.current) setWidth(wrapRef.current.offsetWidth)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [])

  const visible  = getVisible(width)
  const cardW    = Math.floor((width - GAP * (visible - 1)) / visible)
  const maxIndex = Math.max(0, VIDEOS.length - visible)

  function prev() { setIndex(i => Math.max(0, i - visible)) }
  function next() { setIndex(i => Math.min(maxIndex, i + visible)) }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIndex(i => Math.min(i, maxIndex))
  }, [maxIndex])

  const touchX = useRef(null)
  function onTouchStart(e) { touchX.current = e.touches[0].clientX }
  function onTouchEnd(e) {
    if (touchX.current === null) return
    const dx = touchX.current - e.changedTouches[0].clientX
    if (dx >  40) next()
    if (dx < -40) prev()
    touchX.current = null
  }

  const pageCount  = Math.ceil(VIDEOS.length / visible)
  const activePage = Math.floor(index / visible)
  const canPrev    = index > 0
  const canNext    = index < maxIndex

  return (
    <section className="section" style={{ background: 'var(--white)', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem',
      }}>
        <div>
          <span className="section-tag">Proof of Trust</span>
          <h2 className="section-title">Real Stories, Real <em>Healing</em></h2>
          <p className="section-desc">Hear directly from clients who took the first step.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
          <button
            onClick={prev}
            disabled={!canPrev}
            aria-label="Previous"
            style={{
              width: 42, height: 42, borderRadius: '50%',
              border: '2px solid var(--blue-pale)',
              background: 'var(--white)',
              cursor: canPrev ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.3rem', color: 'var(--blue-deep)',
              opacity: canPrev ? 1 : 0.3, transition: 'all 0.2s',
            }}
          >‹</button>
          <button
            onClick={next}
            disabled={!canNext}
            aria-label="Next"
            style={{
              width: 42, height: 42, borderRadius: '50%',
              border: '2px solid var(--blue-pale)',
              background: canNext ? 'var(--sky)' : 'var(--white)',
              cursor: canNext ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.3rem', color: canNext ? 'white' : 'var(--blue-deep)',
              opacity: canNext ? 1 : 0.3, transition: 'all 0.2s',
            }}
          >›</button>
        </div>
      </div>

      {/* Slider viewport */}
      <div
        ref={wrapRef}
        style={{ overflow: 'hidden', width: '100%' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div style={{
          display: 'flex',
          gap: GAP,
          transition: 'transform 0.44s cubic-bezier(0.4,0,0.2,1)',
          transform: `translateX(${-index * (cardW + GAP)}px)`,
          willChange: 'transform',
          alignItems: 'stretch',
        }}>
          {VIDEOS.map((v, i) => (
            <VideoCard key={i} v={v} cardW={cardW} />
          ))}
        </div>
      </div>

      {/* Page dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: '1.5rem' }}>
        {Array.from({ length: pageCount }).map((_, p) => (
          <button
            key={p}
            onClick={() => setIndex(Math.min(p * visible, maxIndex))}
            aria-label={`Go to page ${p + 1}`}
            style={{
              width: p === activePage ? 24 : 8,
              height: 8, borderRadius: 4, border: 'none',
              background: p === activePage ? 'var(--sky)' : 'var(--blue-pale)',
              cursor: 'pointer', transition: 'all 0.25s', padding: 0,
            }}
          />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <button className="btn btn-outline" onClick={() => navigate('/community')}>
          Read All Stories →
        </button>
      </div>
    </section>
  )
}