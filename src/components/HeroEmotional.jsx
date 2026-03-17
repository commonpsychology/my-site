import { useEffect, useState } from 'react'
import { useRouter } from '../context/RouterContext'

/* ─────────────────────────────────────────────────────────────
   CSS — all keyframes + component classes, injected once
───────────────────────────────────────────────────────────── */
const HEART_CSS = `
  @keyframes hb-beat {
    0%,100% { transform: scale(1); }
    15%      { transform: scale(1.13); }
    30%      { transform: scale(1.01); }
    45%      { transform: scale(1.08); }
    60%      { transform: scale(1); }
  }
  @keyframes hb-pulse-ring {
    0%   { transform: translate(-50%,-50%) scale(0.82); opacity: 0.65; }
    100% { transform: translate(-50%,-50%) scale(1.6);  opacity: 0; }
  }
  @keyframes hb-flow {
    from { stroke-dashoffset: 600; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes hb-ekg {
    from { stroke-dashoffset: 520; }
    to   { stroke-dashoffset: -520; }
  }
  @keyframes hb-drop {
    0%   { opacity: 0; transform: translateY(-10px) scale(0.8) rotate(-45deg); }
    30%  { opacity: 0.9; }
    100% { opacity: 0; transform: translateY(14px) scale(1.1) rotate(-45deg); }
  }
  @keyframes hb-glow-pulse {
    0%,100% { opacity: 0.3; transform: translate(-50%,-50%) scale(1); }
    50%      { opacity: 0.55; transform: translate(-50%,-50%) scale(1.08); }
  }
  @keyframes hb-float {
    0%,100% { transform: translateY(0px); }
    50%     { transform: translateY(-7px); }
  }
  @keyframes hb-float-r {
    0%,100% { transform: translateY(0px); }
    50%     { transform: translateY(-5px); }
  }
  @keyframes hb-card-in-l {
    from { opacity: 0; transform: translateX(-24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes hb-card-in-r {
    from { opacity: 0; transform: translateX(24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes hb-fadein-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Heart wrapper ── */
  .hb-visual-root {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Ambient glow blob */
  .hb-glow-blob {
    position: absolute;
    top: 50%; left: 50%;
    width: 380px; height: 380px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,191,255,0.28) 0%, rgba(0,159,212,0.12) 50%, transparent 75%);
    animation: hb-glow-pulse 2.4s ease-in-out infinite;
    pointer-events: none;
    z-index: 1;
  }

  /* Pulse rings */
  .hb-pulse {
    position: absolute;
    top: 50%; left: 50%;
    border-radius: 50%;
    border: 1.5px solid rgba(0,191,255,0.4);
    pointer-events: none;
    z-index: 2;
    animation: hb-pulse-ring 2.2s ease-out infinite;
  }

  /* Heart SVG itself */
  .hb-heart-svg {
    position: relative;
    z-index: 6;
    animation: hb-beat 1.5s ease-in-out infinite;
    filter: drop-shadow(0 0 32px rgba(0,191,255,0.5)) drop-shadow(0 6px 18px rgba(0,80,130,0.3));
  }

  /* Flow veins inside heart */
  .hb-vein {
    stroke-dasharray: 600;
    animation: hb-flow 2s linear infinite;
  }

  /* EKG pulse strip */
  .hb-ekg-strip {
    stroke-dasharray: 520;
    animation: hb-ekg 2.4s linear infinite;
  }

  /* Floating drops */
  .hb-drop-particle {
    position: absolute;
    border-radius: 50% 50% 50% 0;
    pointer-events: none;
    z-index: 4;
    animation: hb-drop ease-in-out infinite;
  }

  /* Persona cards — now below heart, side by side */
  .hb-persona-card {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 18px;
    padding: 16px 20px;
    cursor: pointer;
    z-index: 35;
    width: 175px;
    transition: background 0.28s ease, border-color 0.28s ease,
                box-shadow 0.28s ease,
                transform 0.32s cubic-bezier(0.34,1.56,0.64,1);
  }
  .hb-persona-card:hover {
    transform: translateY(calc(-50% - 6px)) scale(1.04) !important;
  }
  .hb-persona-card-parent {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translateY(-50%);
    animation: hb-card-in-l 0.7s 0.5s ease both,
               hb-float 4.2s 0.5s ease-in-out infinite;
  }
  .hb-persona-card-teen {
    position: absolute;
    top: 50%;
    right: 0%;
    transform: translateY(-50%);
    animation: hb-card-in-r 0.7s 0.8s ease both,
               hb-float-r 3.7s 1s ease-in-out infinite;
  }

  /* Stat pills */
  .hb-stat-pill {
    position: absolute;
    background: rgba(255,255,255,0.14);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.28);
    border-radius: 100px;
    padding: 5px 14px;
    z-index: 18;
    pointer-events: none;
    white-space: nowrap;
  }

`

function injectCSS(id, css) {
  if (typeof document === 'undefined') return
  if (document.getElementById(id)) return
  const el = document.createElement('style')
  el.id = id
  el.textContent = css
  document.head.appendChild(el)
}

/* ══════════════════════════════════════════════════════════════
   HEART VISUAL COMPONENT
══════════════════════════════════════════════════════════════ */
function HeartVisual({ onParentClick, onTeenClick, onAssessClick }) {
  const [hovered, setHovered] = useState(null)

  /*
   * PARENT card — warm earthy tones: deep forest green + amber gold
   * evokes maturity, stability, warmth, trust — colours parents respond to
   */
  const parentBase = {
    background: 'linear-gradient(135deg, rgba(45,74,62,0.82) 0%, rgba(61,107,90,0.78) 100%)',
    border: '1.5px solid rgba(184,213,200,0.35)',
    boxShadow: '0 8px 28px rgba(0,0,0,0.18)',
  }
  const parentHovered = {
    background: 'linear-gradient(135deg, rgba(45,74,62,0.95) 0%, rgba(61,107,90,0.92) 100%)',
    border: '1.5px solid rgba(184,213,200,0.65)',
    boxShadow: '0 20px 48px rgba(0,0,0,0.22), inset 0 1px 0 rgba(184,213,200,0.3)',
  }

  /*
   * TEEN card — electric violet + magenta pop
   * vibrant, youthful, bold — colours teens actually resonate with
   */
  const teenBase = {
    background: 'linear-gradient(135deg, rgba(88,28,135,0.82) 0%, rgba(147,51,234,0.75) 100%)',
    border: '1.5px solid rgba(216,180,254,0.35)',
    boxShadow: '0 8px 28px rgba(88,28,135,0.25)',
  }
  const teenHovered = {
    background: 'linear-gradient(135deg, rgba(88,28,135,0.96) 0%, rgba(147,51,234,0.92) 100%)',
    border: '1.5px solid rgba(216,180,254,0.65)',
    boxShadow: '0 20px 48px rgba(88,28,135,0.35), inset 0 1px 0 rgba(216,180,254,0.3)',
  }

  return (
    <div className="hb-visual-root">

      {/* Ambient glow */}
      <div className="hb-glow-blob" />

      {/* Three pulse rings at different delays */}
      {[
        { size: 260, delay: '0s' },
        { size: 320, delay: '0.7s' },
        { size: 390, delay: '1.4s' },
      ].map((r, i) => (
        <div key={i} className="hb-pulse" style={{
          width: r.size, height: r.size,
          animationDelay: r.delay,
        }} />
      ))}

      {/* ── HEART SVG ── */}
      <svg
        className="hb-heart-svg"
        viewBox="0 0 200 185"
        width="300"
        height="278"
        style={{ position: 'relative', zIndex: 30 }}
      >
        <defs>
          <linearGradient id="hg-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#007BA8" />
            <stop offset="30%"  stopColor="#009FD4" />
            <stop offset="65%"  stopColor="#00BFFF" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="hg-depth" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(0,55,100,0.45)" />
          </linearGradient>
          <linearGradient id="hg-shine" x1="15%" y1="0%" x2="75%" y2="100%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.55)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id="hg-vein" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
            <stop offset="45%"  stopColor="rgba(255,255,255,0.65)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <clipPath id="hc-clip">
            <path d="M100,165 C58,133 8,102 8,57 C8,27 29,8 55,8 C70,8 85,16 100,31 C115,16 130,8 145,8 C171,8 192,27 192,57 C192,102 142,133 100,165 Z" />
          </clipPath>
        </defs>

        {/* Base fill */}
        <path
          d="M100,165 C58,133 8,102 8,57 C8,27 29,8 55,8 C70,8 85,16 100,31 C115,16 130,8 145,8 C171,8 192,27 192,57 C192,102 142,133 100,165 Z"
          fill="url(#hg-body)"
        />

        {/* Depth shadow */}
        <path
          d="M100,165 C58,133 8,102 8,57 C8,27 29,8 55,8 C70,8 85,16 100,31 C115,16 130,8 145,8 C171,8 192,27 192,57 C192,102 142,133 100,165 Z"
          fill="url(#hg-depth)"
        />

        {/* Flowing veins — clipped inside heart */}
        <g clipPath="url(#hc-clip)" opacity="0.55">
          <path d="M55,8 Q38,42 33,78 Q30,105 52,138"
            fill="none" stroke="url(#hg-vein)" strokeWidth="6" strokeLinecap="round"
            className="hb-vein" style={{ animationDelay: '0s', animationDuration: '2.2s' }} />
          <path d="M145,8 Q162,42 167,78 Q170,105 148,138"
            fill="none" stroke="url(#hg-vein)" strokeWidth="6" strokeLinecap="round"
            className="hb-vein" style={{ animationDelay: '0.5s', animationDuration: '2.2s' }} />
          <path d="M100,31 Q94,68 88,95 Q85,115 100,145"
            fill="none" stroke="url(#hg-vein)" strokeWidth="4.5" strokeLinecap="round"
            className="hb-vein" style={{ animationDelay: '1s', animationDuration: '2.2s' }} />
          <path d="M25,62 Q62,56 100,59 Q138,56 175,62"
            fill="none" stroke="url(#hg-vein)" strokeWidth="4" strokeLinecap="round"
            className="hb-vein" style={{ animationDelay: '1.5s', animationDuration: '2.2s' }} />
          <path d="M38,42 Q70,78 100,90 Q130,78 162,42"
            fill="none" stroke="url(#hg-vein)" strokeWidth="3" strokeLinecap="round"
            className="hb-vein" style={{ animationDelay: '0.3s', animationDuration: '2.8s' }} />
        </g>

        {/* EKG pulse inside heart */}
        <g clipPath="url(#hc-clip)" opacity="0.4">
          <polyline
            points="18,90 38,90 48,70 58,110 66,76 74,100 84,90 116,90 124,68 134,114 142,72 150,98 160,90 182,90"
            fill="none" stroke="white" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            className="hb-ekg-strip"
            style={{ animationDuration: '2.4s' }}
          />
        </g>

        {/* Glossy shine overlay */}
        <path
          d="M100,165 C58,133 8,102 8,57 C8,27 29,8 55,8 C70,8 85,16 100,31 C115,16 130,8 145,8 C171,8 192,27 192,57 C192,102 142,133 100,165 Z"
          fill="url(#hg-shine)"
          opacity="0.38"
        />

        {/* Highlight stroke on upper-left lobe */}
        <path
          d="M63,18 C52,27 45,44 45,58 C45,66 48,73 53,78"
          fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="6"
          strokeLinecap="round"
        />
        <ellipse cx="70" cy="36" rx="9" ry="5.5"
          fill="rgba(255,255,255,0.22)" transform="rotate(-28,70,36)" />
      </svg>

      {/* ── Floating blood drops ── */}
      {[
        { left: '30%', top: '14%', size: 11, delay: '0s',    dur: '2.6s' },
        { left: '66%', top: '18%', size: 8,  delay: '0.8s',  dur: '3.0s' },
        { left: '20%', top: '52%', size: 7,  delay: '1.5s',  dur: '2.4s' },
        { left: '74%', top: '58%', size: 10, delay: '0.4s',  dur: '2.9s' },
        { left: '48%', top: '10%', size: 6,  delay: '1.9s',  dur: '2.2s' },
        { left: '82%', top: '35%', size: 7,  delay: '1.1s',  dur: '3.1s' },
      ].map((d, i) => (
        <div key={i} className="hb-drop-particle" style={{
          left: d.left, top: d.top,
          width: d.size, height: d.size,
          background: 'radial-gradient(circle at 32% 32%, rgba(255,255,255,0.85), rgba(0,191,255,0.65))',
          animationDelay: d.delay,
          animationDuration: d.dur,
        }} />
      ))}

      {/* ── EKG strip below heart ── */}
      <svg
        viewBox="0 0 360 44"
        width="360" height="44"
        style={{ position: 'absolute', bottom: '13%', left: '50%', transform: 'translateX(-50%)', opacity: 0.45, zIndex: 7, pointerEvents: 'none' }}
      >
        <polyline
          points="0,22 30,22 42,8 56,36 66,10 76,30 88,22 180,22 194,6 208,38 218,8 230,32 242,22 360,22"
          fill="none" stroke="white" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          className="hb-ekg-strip"
          style={{ animationDuration: '2.4s', strokeDasharray: 520 }}
        />
      </svg>

      {/* ── Stat pills ── */}
      <div className="hb-stat-pill" style={{ top: '6%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.92)', border: '1.5px solid rgba(0,123,168,0.3)', zIndex: 32 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, color: '#007BA8', letterSpacing: '0.06em' }}>
          ❤️  500+ families healed
        </span>
      </div>
      <div className="hb-stat-pill" style={{ bottom: '8%', right: '2%', background: 'rgba(255,255,255,0.92)', border: '1.5px solid rgba(0,123,168,0.3)', zIndex: 32 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 800, color: '#007BA8' }}>
          4.9 ★ rated
        </span>
      </div>

      {/* ── I'm a Parent card (bottom-left) ── */}
      <div
        className="hb-persona-card hb-persona-card-parent"
        style={hovered === 'parent' ? parentHovered : parentBase}
        onMouseEnter={() => setHovered('parent')}
        onMouseLeave={() => setHovered(null)}
        onClick={onParentClick}
      >
        {/* Icon + title row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(184,213,200,0.25)',
            border: '1.5px solid rgba(184,213,200,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px',
            transition: 'transform 0.3s ease',
            transform: hovered === 'parent' ? 'scale(1.15) rotate(-6deg)' : 'scale(1)',
          }}>🌿</div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem',
              color: '#d4f0e0',
              lineHeight: 1.15,
              fontWeight: 400,
            }}>I'm a Parent</div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.58rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(184,213,200,0.6)',
              marginTop: '2px',
            }}>For families</div>
          </div>
        </div>
        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem',
          color: 'rgba(212,240,224,0.82)',
          lineHeight: 1.6,
          margin: '0 0 12px',
          fontWeight: 400,
        }}>
          My child has changed. I don't know how to reach them.
        </p>
        {/* CTA row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: '1px solid rgba(184,213,200,0.22)',
          paddingTop: '10px',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.62rem', fontWeight: 800,
            letterSpacing: '0.09em', textTransform: 'uppercase',
            color: hovered === 'parent' ? '#b8d5c8' : 'rgba(184,213,200,0.5)',
            transition: 'color 0.2s',
          }}>Free 15-min call</span>
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            background: hovered === 'parent' ? 'rgba(184,213,200,0.35)' : 'rgba(184,213,200,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.7rem', color: '#b8d5c8',
            transition: 'background 0.2s',
          }}>→</div>
        </div>
      </div>

      {/* ── I'm a Teen card (bottom-right) ── */}
      <div
        className="hb-persona-card hb-persona-card-teen"
        style={hovered === 'teen' ? teenHovered : teenBase}
        onMouseEnter={() => setHovered('teen')}
        onMouseLeave={() => setHovered(null)}
        onClick={onTeenClick}
      >
        {/* Icon + title row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(216,180,254,0.2)',
            border: '1.5px solid rgba(216,180,254,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px',
            transition: 'transform 0.3s ease',
            transform: hovered === 'teen' ? 'scale(1.15) rotate(6deg)' : 'scale(1)',
          }}>✨</div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem',
              color: '#ede9fe',
              lineHeight: 1.15,
              fontWeight: 400,
            }}>I'm a Teen</div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.58rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(216,180,254,0.6)',
              marginTop: '2px',
            }}>For adolescents</div>
          </div>
        </div>
        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem',
          color: 'rgba(237,233,254,0.82)',
          lineHeight: 1.6,
          margin: '0 0 12px',
          fontWeight: 400,
        }}>
          I feel so much but can't explain it to anyone.
        </p>
        {/* CTA row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: '1px solid rgba(216,180,254,0.22)',
          paddingTop: '10px',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.62rem', fontWeight: 800,
            letterSpacing: '0.09em', textTransform: 'uppercase',
            color: hovered === 'teen' ? '#ddd6fe' : 'rgba(221,214,254,0.5)',
            transition: 'color 0.2s',
          }}>Someone who listens</span>
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            background: hovered === 'teen' ? 'rgba(216,180,254,0.3)' : 'rgba(216,180,254,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.7rem', color: '#ddd6fe',
            transition: 'background 0.2s',
          }}>→</div>
        </div>
      </div>

      {/* ── PHQ-9 floating card — top right, clear of heart ── */}
      <div
        className="floating-card"
        
        onClick={onAssessClick}
      >
       
      </div>

    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   MAIN HERO — original left side + heart right side
══════════════════════════════════════════════════════════════ */
export default function Hero() {
  const { navigate } = useRouter()

  useEffect(() => {
    injectCSS('hb-heart-css', HEART_CSS)
  }, [])

  return (
    <section className="hero">

      {/* ══ LEFT — 100% original, nothing changed ══ */}
      <div className="hero-content">
        <div className="hero-badge">
          <span>🌿</span> Nepal's Trusted Mental Wellness Platform
        </div>

        <h1>
          We Are Here To <i>Help</i>
        </h1>

        <p className="hero-desc">
          Professional therapy, self-assessment tools, and wellness resources —{' '}
          all in one compassionate space. Connect with certified therapists from
          the comfort of your home.
        </p>

        <div className="hero-actions">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/book')}
          >
            Book a Free Consultation →
          </button>
          <button
            className="btn btn-outline btn-lg"
            onClick={() => navigate('/assessments')}
          >
            Take an Assessment
          </button>
        </div>

        <div className="hero-stats">
          <div>
            <div className="hero-stat-num">500+</div>
            <div className="hero-stat-label">Clients Helped</div>
          </div>
          <div>
            <div className="hero-stat-num">12</div>
            <div className="hero-stat-label">Expert Therapists</div>
          </div>
          <div>
            <div className="hero-stat-num">4.9★</div>
            <div className="hero-stat-label">Average Rating</div>
          </div>
        </div>
      </div>

      {/* ══ RIGHT — beating heart replaces hp.png image ══ */}
      <div className="hero-visual">
        <div className="hero-card-stack" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '500px' }}>
          <HeartVisual
            onParentClick={() => navigate('/book', { intent: 'parent' })}
            onTeenClick={()   => navigate('/book', { intent: 'teen' })}
            onAssessClick={() => navigate('/assessments')}
          />
        </div>
      </div>

    </section>
  )
}