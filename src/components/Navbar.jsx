import { useState } from 'react'
import { useRouter } from '../context/RouterContext'

const navLinks = [
  ['Services',        '/services'],
  ['Therapists',      '/therapists'],
  ['Assessments',     '/assessments'],
  ['Resources',       '/resources'],
  ['Trainings',         '/courses'],
  ['Blog & Research', '/blog'],
]

const authPages = ['/signin', '/register']

// Therapist avatar pills shown in the header
const avatarPills = [
  { emoji: '👩‍⚕️', name: 'Dr. Anita', color: '#e8f3ee' },
  { emoji: '👨‍💼', name: 'Roshan',    color: '#e6f2f8' },
  { emoji: '👩‍🏫', name: 'Priya',     color: '#f5ede0' },
  { emoji: '👨‍⚕️', name: 'Dr. Suresh',color: '#e8f3ee' },
]

// Fallback SVG shown when logo image hasn't been added yet
function LogoFallbackSvg() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: 20, height: 20, fill: 'white' }}>
      <path d="M12 2C8.5 2 5.5 4.5 5 8c-.3 2 .5 4 2 5.5L12 22l5-8.5c1.5-1.5 2.3-3.5 2-5.5C18.5 4.5 15.5 2 12 2zm0 9a3 3 0 110-6 3 3 0 010 6z"/>
    </svg>
  )
}

function LogoMark() {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div
      className="logo-mark"
      style={{
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        /* Dashed border hint so you know where to drop your logo */
        outline: imgFailed ? 'none' : '2px dashed var(--green-pale)',
        outlineOffset: '-3px',
      }}
    >
      {!imgFailed ? (
        <img
          src="/header.png"          /* ← replace with your logo path */
          alt="Puja Samargi Logo"
          onError={() => setImgFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      ) : (
        <LogoFallbackSvg />
      )}
    </div>
  )
}

export default function Navbar() {
  const { navigate, currentPath } = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  if (authPages.includes(currentPath)) return null

  const go = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => go('/')} style={{ cursor: 'pointer' }}>
          <LogoMark />
          <div>
            {/* "Puja Samargi" in green to match the navbar background palette */}
            <div className="logo-text" style={{ color: 'var(--green-only)' }}>PUJA SHAMAGRI</div>
            <div className="logo-sub">Mental Wellness Center</div>
          </div>
        </div>

        {/* Desktop links */}
        <ul className="navbar-links">
          {navLinks.map(([label, path]) => (
            <li key={path}>
              <a
                href="#"
                onClick={e => { e.preventDefault(); go(path) }}
                className={currentPath === path ? 'nav-active' : ''}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Image pill + CTA — desktop */}
        <div className="navbar-right">
          {/* Therapist avatar pill */}
          <div className="avatar-pill" onClick={() => go('/therapists')} title="Meet our therapists">
            <div className="avatar-pill-faces">
              {avatarPills.map((a, i) => (
                <div
                  key={i}
                  className="avatar-pill-face"
                  style={{ background: a.color, zIndex: avatarPills.length - i }}
                  title={a.name}
                >
                  {a.emoji}
                </div>
              ))}
            </div>
            <div className="avatar-pill-text">
              <span className="avatar-pill-count">12+</span>
              <span className="avatar-pill-label">Therapists</span>
            </div>
          </div>

          <div className="navbar-cta">
            <button className="btn btn-outline" onClick={() => go('/signin')}>Sign In</button>
            <button className="btn btn-primary" onClick={() => go('/book')}>Book a Session</button>
          </div>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
          <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
          <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>
        {/* Mini avatar pill in mobile drawer */}
        <div className="mobile-avatar-pill" onClick={() => go('/therapists')}>
          <div className="avatar-pill-faces">
            {avatarPills.slice(0, 3).map((a, i) => (
              <div key={i} className="avatar-pill-face" style={{ background: a.color, zIndex: 3 - i }}>{a.emoji}</div>
            ))}
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--green-deep)', fontWeight: 600 }}>
            Meet our 12+ therapists →
          </span>
        </div>

        <ul className="mobile-links">
          {navLinks.map(([label, path]) => (
            <li key={path}>
              <a
                href="#"
                onClick={e => { e.preventDefault(); go(path) }}
                className={currentPath === path ? 'nav-active' : ''}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-cta">
          <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => go('/signin')}>Sign In</button>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => go('/book')}>Book a Session</button>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
      )}
    </>
  )
}