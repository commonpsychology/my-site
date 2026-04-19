// NamasteLoader.jsx
// Full-screen loading overlay with namaste animation.
// Usage: render before your homepage mounts, then unmount when ready.
//
// Example in your HomePage:
//   const [loading, setLoading] = useState(true)
//   useEffect(() => { const t = setTimeout(() => setLoading(false), 2800); return () => clearTimeout(t) }, [])
//   if (loading) return <NamasteLoader />

import { useEffect, useState } from 'react'

export default function NamasteLoader({ duration = 2800, onDone }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeAt = duration - 600
    const t1 = setTimeout(() => setFading(true), fadeAt)
    const t2 = setTimeout(() => onDone?.(), duration)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [duration, onDone])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');

        .nm-root {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: linear-gradient(135deg, #003d5c 0%, #007BA8 45%, #00BFFF 100%);
          transition: opacity 0.6s ease;
          overflow: hidden;
        }
        .nm-root.nm-fade { opacity: 0; pointer-events: none; }

        /* ---- Mandala ---- */
        .nm-mandala {
          position: absolute;
          width: 380px; height: 380px;
          opacity: 0;
          animation: nm-appear 1.2s ease 0.3s forwards;
        }
        .nm-ring-1 {
          transform-origin: 180px 180px;
          animation: nm-spin 18s linear infinite;
        }
        .nm-ring-2 {
          transform-origin: 180px 180px;
          animation: nm-spin-rev 24s linear infinite;
        }
        .nm-ring-3 {
          transform-origin: 180px 180px;
          animation: nm-spin 10s linear infinite;
        }
        @keyframes nm-spin     { to { transform: rotate(360deg); } }
        @keyframes nm-spin-rev { to { transform: rotate(-360deg); } }

        /* ---- Glow ---- */
        .nm-glow {
          position: absolute;
          width: 220px; height: 220px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(0,191,255,0.08) 60%, transparent 100%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: nm-glow-pulse 2.8s ease-in-out infinite;
        }

        /* ---- Content ---- */
        .nm-content {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; align-items: center;
          animation: nm-rise 1s cubic-bezier(0.22,1,0.36,1) 0.2s both;
        }

        /* ---- Text ---- */
        .nm-word {
          color: #ffffff;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-style: italic;
          font-size: 52px;
          letter-spacing: 0.12em;
          text-shadow: 0 0 40px rgba(0,191,255,0.8), 0 2px 16px rgba(0,0,0,0.25);
          line-height: 1;
        }
        .nm-sub {
          color: rgba(255, 255, 255, 0.82);
          font-family: Arial, sans-serif;
          font-weight: 400;
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-top: 10px;
          text-shadow: 0 1px 8px rgba(0,0,0,0.2);
        }
        .nm-dots {
          display: flex;
          gap: 8px;
          margin-top: 18px;
          justify-content: center;
        }
        .nm-dot {
          width: 7px; height: 7px;
          background: #ffffff;
          border-radius: 50%;
          opacity: 0;
          animation: nm-dot-pulse 1.4s ease-in-out infinite;
        }
        .nm-dot:nth-child(1) { animation-delay: 0s; }
        .nm-dot:nth-child(2) { animation-delay: 0.22s; }
        .nm-dot:nth-child(3) { animation-delay: 0.44s; }

        /* ---- Keyframes ---- */
        @keyframes nm-appear { to { opacity: 1; } }
        @keyframes nm-rise {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nm-dot-pulse {
          0%,100% { opacity: 0.25; transform: scale(0.8); }
          50%     { opacity: 1;    transform: scale(1.5); }
        }
        @keyframes nm-glow-pulse {
          0%,100% { opacity: 0.5; transform: translate(-50%,-50%) scale(1);    }
          50%     { opacity: 1;   transform: translate(-50%,-50%) scale(1.35); }
        }
      `}</style>

      <div className={`nm-root${fading ? ' nm-fade' : ''}`}>

        {/* Radial glow behind everything */}
        <div className="nm-glow" />

        {/* Spinning mandala */}
        <svg className="nm-mandala" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="petalgrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#ffffff"  stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#00BFFF"  stopOpacity="0.2"/>
            </radialGradient>
          </defs>

          {/* Outer 8-petal ring */}
          <g className="nm-ring-1" opacity="0.22">
            {[0,45,90,135,180,225,270,315].map(r => (
              <ellipse key={r} cx="180" cy="112" rx="12" ry="40"
                fill="url(#petalgrad)"
                transform={`rotate(${r} 180 180)`}
              />
            ))}
          </g>

          {/* Inner 12-petal ring */}
          <g className="nm-ring-2" opacity="0.18">
            {Array.from({ length: 12 }, (_, i) => i * 30).map(r => (
              <ellipse key={r} cx="180" cy="82" rx="7" ry="22"
                fill="#E0F7FF"
                transform={`rotate(${r} 180 180)`}
              />
            ))}
          </g>

          {/* Dot ring */}
          <g className="nm-ring-3" opacity="0.30">
            {[0,45,90,135,180,225,270,315].map(r => (
              <circle key={r} cx="180" cy="136" r="5"
                fill="#ffffff"
                transform={`rotate(${r} 180 180)`}
              />
            ))}
          </g>

          {/* Concentric rings */}
          <circle cx="180" cy="180" r="22"  fill="none" stroke="#ffffff" strokeWidth="1"   opacity="0.35"/>
          <circle cx="180" cy="180" r="58"  fill="none" stroke="#00BFFF" strokeWidth="0.8" opacity="0.4"/>
          <circle cx="180" cy="180" r="98"  fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.2"/>
          <circle cx="180" cy="180" r="136" fill="none" stroke="#00BFFF" strokeWidth="0.5" opacity="0.15"/>
          <circle cx="180" cy="180" r="165" fill="none" stroke="#ffffff" strokeWidth="0.4" opacity="0.1"/>

          {/* Centre dot */}
          <circle cx="180" cy="180" r="10" fill="#ffffff" opacity="0.9"/>
          <circle cx="180" cy="180" r="4"  fill="#007BA8"/>
        </svg>

        {/* Text content */}
        <div className="nm-content">
          <div className="nm-word">Namaste</div>
          <div className="nm-sub">We Bow to You</div>
          <div className="nm-dots">
            <div className="nm-dot"/>
            <div className="nm-dot"/>
            <div className="nm-dot"/>
          </div>
        </div>

      </div>
    </>
  )
}
