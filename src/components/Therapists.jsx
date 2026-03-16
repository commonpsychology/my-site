import { useRouter } from '../context/RouterContext'
import { therapistsData } from '../data/therapists'

// Professionally designed SVG portrait avatars for each therapist
function AvatarAnita() {
  return (
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="bg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c8e6c9" />
          <stop offset="100%" stopColor="#81c784" />
        </radialGradient>
        <clipPath id="circle1">
          <circle cx="80" cy="80" r="80" />
        </clipPath>
      </defs>
      <circle cx="80" cy="80" r="80" fill="url(#bg1)" />
      {/* Coat */}
      <ellipse cx="80" cy="148" rx="52" ry="30" fill="#e8f5e9" />
      <rect x="52" y="118" width="56" height="40" rx="6" fill="white" />
      {/* Stethoscope hint */}
      <path d="M68 122 Q80 134 92 122" fill="none" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="80" cy="134" r="4" fill="none" stroke="#4caf50" strokeWidth="2"/>
      {/* Neck */}
      <rect x="72" y="105" width="16" height="18" rx="6" fill="#f5cba7" />
      {/* Head */}
      <ellipse cx="80" cy="88" rx="26" ry="28" fill="#f5cba7" />
      {/* Hair — long, dark */}
      <ellipse cx="80" cy="68" rx="27" ry="16" fill="#3e2723" />
      <rect x="53" y="68" width="8" height="34" rx="4" fill="#3e2723" />
      <rect x="99" y="68" width="8" height="34" rx="4" fill="#3e2723" />
      {/* Eyes */}
      <ellipse cx="71" cy="88" rx="4" ry="4.5" fill="white" />
      <ellipse cx="89" cy="88" rx="4" ry="4.5" fill="white" />
      <circle cx="72" cy="88" r="2.5" fill="#3e2723" />
      <circle cx="90" cy="88" r="2.5" fill="#3e2723" />
      <circle cx="72.8" cy="87.2" r="0.8" fill="white" />
      <circle cx="90.8" cy="87.2" r="0.8" fill="white" />
      {/* Eyebrows */}
      <path d="M66 82 Q71 80 76 82" fill="none" stroke="#3e2723" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M84 82 Q89 80 94 82" fill="none" stroke="#3e2723" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Nose */}
      <path d="M78 93 Q80 97 82 93" fill="none" stroke="#c49a6c" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Smile */}
      <path d="M73 100 Q80 106 87 100" fill="none" stroke="#c0704a" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Bindi */}
      <circle cx="80" cy="79" r="2" fill="#e53935" />
    </svg>
  )
}

function AvatarRoshan() {
  return (
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="bg2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#bbdefb" />
          <stop offset="100%" stopColor="#64b5f6" />
        </radialGradient>
      </defs>
      <circle cx="80" cy="80" r="80" fill="url(#bg2)" />
      {/* Suit */}
      <ellipse cx="80" cy="150" rx="52" ry="28" fill="#1a237e" />
      <rect x="52" y="118" width="56" height="40" rx="4" fill="#1565c0" />
      {/* Tie */}
      <polygon points="80,118 75,128 80,148 85,128" fill="#e53935" />
      {/* Shirt collar */}
      <polygon points="72,118 80,126 88,118 84,112 76,112" fill="white" />
      {/* Neck */}
      <rect x="72" y="104" width="16" height="18" rx="6" fill="#d4a574" />
      {/* Head */}
      <ellipse cx="80" cy="86" rx="27" ry="29" fill="#d4a574" />
      {/* Hair — short, dark */}
      <ellipse cx="80" cy="66" rx="27" ry="13" fill="#212121" />
      {/* Ear */}
      <ellipse cx="53" cy="88" rx="4" ry="6" fill="#c49a6c" />
      <ellipse cx="107" cy="88" rx="4" ry="6" fill="#c49a6c" />
      {/* Eyes */}
      <ellipse cx="70" cy="87" rx="4.5" ry="4.5" fill="white" />
      <ellipse cx="90" cy="87" rx="4.5" ry="4.5" fill="white" />
      <circle cx="71" cy="87" r="2.8" fill="#212121" />
      <circle cx="91" cy="87" r="2.8" fill="#212121" />
      <circle cx="71.8" cy="86.2" r="0.9" fill="white" />
      <circle cx="91.8" cy="86.2" r="0.9" fill="white" />
      {/* Eyebrows */}
      <path d="M65 81 Q70 78 75 81" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round"/>
      <path d="M85 81 Q90 78 95 81" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round"/>
      {/* Nose */}
      <path d="M77 93 Q80 98 83 93" fill="none" stroke="#b07a4c" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Smile */}
      <path d="M73 100 Q80 107 87 100" fill="none" stroke="#b07a4c" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Glasses */}
      <rect x="62" y="83" width="15" height="10" rx="4" fill="none" stroke="#1565c0" strokeWidth="1.5"/>
      <rect x="83" y="83" width="15" height="10" rx="4" fill="none" stroke="#1565c0" strokeWidth="1.5"/>
      <line x1="77" y1="87" x2="83" y2="87" stroke="#1565c0" strokeWidth="1.5"/>
    </svg>
  )
}

function AvatarPriya() {
  return (
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="bg3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff9c4" />
          <stop offset="100%" stopColor="#f9a825" />
        </radialGradient>
      </defs>
      <circle cx="80" cy="80" r="80" fill="url(#bg3)" />
      {/* Kurta / top */}
      <ellipse cx="80" cy="150" rx="52" ry="28" fill="#e91e63" />
      <rect x="52" y="118" width="56" height="40" rx="6" fill="#e91e63" />
      {/* Pattern on kurta */}
      <circle cx="80" cy="128" r="4" fill="#f48fb1" opacity="0.6"/>
      <circle cx="68" cy="134" r="3" fill="#f48fb1" opacity="0.5"/>
      <circle cx="92" cy="134" r="3" fill="#f48fb1" opacity="0.5"/>
      {/* Neck */}
      <rect x="72" y="104" width="16" height="18" rx="6" fill="#f5cba7" />
      {/* Head */}
      <ellipse cx="80" cy="87" rx="26" ry="28" fill="#f5cba7" />
      {/* Hair — bun style */}
      <ellipse cx="80" cy="67" rx="26" ry="14" fill="#4a148c" />
      <ellipse cx="80" cy="56" rx="13" ry="12" fill="#4a148c" />
      <circle cx="80" cy="46" r="7" fill="#7b1fa2" />
      {/* Hair sides */}
      <rect x="54" y="67" width="7" height="28" rx="3" fill="#4a148c" />
      <rect x="99" y="67" width="7" height="28" rx="3" fill="#4a148c" />
      {/* Eyes */}
      <ellipse cx="71" cy="88" rx="4" ry="4.5" fill="white" />
      <ellipse cx="89" cy="88" rx="4" ry="4.5" fill="white" />
      <circle cx="72" cy="88" r="2.8" fill="#4a148c" />
      <circle cx="90" cy="88" r="2.8" fill="#4a148c" />
      <circle cx="72.8" cy="87.2" r="0.9" fill="white" />
      <circle cx="90.8" cy="87.2" r="0.9" fill="white" />
      {/* Eyebrows */}
      <path d="M66 82 Q71 79 76 82" fill="none" stroke="#4a148c" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M84 82 Q89 79 94 82" fill="none" stroke="#4a148c" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Nose */}
      <path d="M78 93 Q80 97 82 93" fill="none" stroke="#c49a6c" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Smile — wide, warm */}
      <path d="M72 101 Q80 109 88 101" fill="none" stroke="#c0704a" strokeWidth="2" strokeLinecap="round"/>
      {/* Bindi */}
      <circle cx="80" cy="79" r="2.2" fill="#e91e63" />
      {/* Earring */}
      <circle cx="54" cy="92" r="3" fill="#f9a825" stroke="#e91e63" strokeWidth="1"/>
      <circle cx="106" cy="92" r="3" fill="#f9a825" stroke="#e91e63" strokeWidth="1"/>
    </svg>
  )
}

const avatarMap = {
  'Dr. Anita Shrestha': AvatarAnita,
  'Mr. Roshan Karki': AvatarRoshan,
  'Ms. Priya Tamang': AvatarPriya,
}

export default function Therapists() {
  const { navigate } = useRouter()

  // Use first 3 from therapistsData
  const therapists = therapistsData.slice(0, 3)

  return (
    <section className="section therapists" id="therapists">
      <div className="section-header">
        <div>
          <span className="section-tag">Our Practitioners</span>
          <h2 className="section-title">Meet Our <em>Caring</em> Therapists</h2>
          <p className="section-desc">
            All our therapists are licensed, verified, and trained to provide culturally sensitive care for Nepali clients.
          </p>
        </div>
        <button className="btn btn-earth" onClick={() => navigate('/therapists')}>
          Browse All Therapists
        </button>
      </div>

      <div className="therapists-grid">
        {therapists.map((t, i) => {
          const Avatar = avatarMap[t.name]
          return (
            <div
              className="therapist-card"
              key={i}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/therapist-detail', { therapist: t })}
            >
              <div
                className={`therapist-img ${t.imgClass}`}
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'stretch',
                  justifyContent: 'stretch',
                }}
              >
                {Avatar ? (
                  <Avatar />
                ) : (
                  <span style={{ fontSize: '3rem', margin: 'auto' }}>{t.emoji}</span>
                )}
                {t.available
                  ? <span className="therapist-avail-badge">● Available</span>
                  : <span className="therapist-avail-badge" style={{ background: 'var(--earth-warm)' }}>Unavailable</span>
                }
              </div>

              <div className="therapist-body">
                <div className="therapist-name">{t.name}</div>
                <div className="therapist-role">{t.role} · {t.exp}</div>
                <div className="therapist-tags">
                  {t.tags.map((tag, j) => (
                    <span className={`tag ${t.tagClass}`} key={j}>{tag}</span>
                  ))}
                </div>
                <div className="therapist-footer">
                  <div className="therapist-rating">
                    ⭐ {t.rating} <span style={{ fontWeight: 400, color: 'var(--text-light)' }}>({t.reviews} reviews)</span>
                  </div>
                  <div className="therapist-fee">
                    {t.fee} <small>/ session</small>
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
                  onClick={e => {
                    e.stopPropagation()
                    navigate('/book', { therapist: t })
                  }}
                >
                  Book Session
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}