import { useRouter } from '../context/RouterContext'

function IllustrationMindfulness() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
      <rect width="80" height="80" rx="16" fill="#e8f3ee"/>
      <circle cx="40" cy="38" r="16" fill="none" stroke="#3d6b5a" strokeWidth="2.5"/>
      <path d="M40 22 L40 16" stroke="#ffd54f" strokeWidth="2" strokeLinecap="round"/>
      <path d="M54 28 L58 24" stroke="#ffd54f" strokeWidth="2" strokeLinecap="round"/>
      <path d="M56 40 L62 40" stroke="#ffd54f" strokeWidth="2" strokeLinecap="round"/>
      <path d="M26 28 L22 24" stroke="#ffd54f" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 40 L18 40" stroke="#ffd54f" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="40" cy="38" r="6" fill="#6a9e88"/>
      <circle cx="40" cy="38" r="2.5" fill="white"/>
      <path d="M32 52 Q40 60 48 52" fill="none" stroke="#b8d5c8" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function IllustrationCBT() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
      <rect width="80" height="80" rx="16" fill="#e6f2f8"/>
      {/* thought bubble */}
      <ellipse cx="40" cy="30" rx="20" ry="14" fill="white" stroke="#5b9ab5" strokeWidth="2"/>
      {/* negative → positive arrow */}
      <text x="28" y="34" fontFamily="sans-serif" fontSize="11" fill="#e57373" fontWeight="bold">✗</text>
      <text x="44" y="34" fontFamily="sans-serif" fontSize="11" fill="#81c784" fontWeight="bold">✓</text>
      <line x1="37" y1="30" x2="42" y2="30" stroke="#5b9ab5" strokeWidth="1.5" markerEnd="url(#arr)"/>
      {/* bubble tail */}
      <circle cx="34" cy="46" r="3" fill="white" stroke="#5b9ab5" strokeWidth="1.5"/>
      <circle cx="30" cy="52" r="2" fill="white" stroke="#5b9ab5" strokeWidth="1.5"/>
      <circle cx="27" cy="57" r="1.5" fill="white" stroke="#5b9ab5" strokeWidth="1.5"/>
      {/* person head */}
      <circle cx="40" cy="65" r="6" fill="#f5cba7" stroke="#d4b896" strokeWidth="1.5"/>
      <ellipse cx="40" cy="73" rx="8" ry="4" fill="#5b9ab5"/>
    </svg>
  )
}

function IllustrationResilience() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
      <rect width="80" height="80" rx="16" fill="#f5ede0"/>
      {/* growing plant */}
      <rect x="36" y="55" width="8" height="14" rx="3" fill="#6b4f35"/>
      <ellipse cx="40" cy="55" rx="12" ry="8" fill="#3d6b5a"/>
      <ellipse cx="28" cy="48" rx="9" ry="6" fill="#6a9e88"/>
      <ellipse cx="52" cy="44" rx="9" ry="6" fill="#6a9e88"/>
      <ellipse cx="40" cy="38" rx="10" ry="7" fill="#3d6b5a"/>
      <ellipse cx="40" cy="28" rx="7" ry="5" fill="#6a9e88"/>
      <ellipse cx="40" cy="22" rx="5" ry="4" fill="#3d6b5a"/>
      <circle cx="40" cy="18" r="3" fill="#ffd54f"/>
    </svg>
  )
}

function IllustrationSleep() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
      <rect width="80" height="80" rx="16" fill="#e8f3ee"/>
      {/* moon */}
      <path d="M50 20 C42 22, 36 30, 38 40 C40 50, 50 56, 58 52 C48 54, 40 46, 40 36 C40 28 44 22 50 20Z" fill="#ffd54f"/>
      {/* stars */}
      <circle cx="22" cy="26" r="2" fill="#ffd54f"/>
      <circle cx="30" cy="18" r="1.5" fill="#ffd54f"/>
      <circle cx="18" cy="38" r="1" fill="#ffd54f"/>
      {/* zzz */}
      <text x="16" y="58" fontFamily="sans-serif" fontSize="10" fill="#5b9ab5" fontWeight="bold" opacity="0.8">z</text>
      <text x="24" y="50" fontFamily="sans-serif" fontSize="8" fill="#5b9ab5" fontWeight="bold" opacity="0.6">z</text>
      <text x="30" y="44" fontFamily="sans-serif" fontSize="6" fill="#5b9ab5" fontWeight="bold" opacity="0.4">z</text>
      {/* pillow */}
      <rect x="10" y="60" width="60" height="14" rx="7" fill="#b0d4e8"/>
      <ellipse cx="40" cy="60" rx="18" ry="5" fill="#e6f2f8"/>
    </svg>
  )
}

function IllustrationWorkplace() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
      <rect width="80" height="80" rx="16" fill="#e6f2f8"/>
      {/* desk */}
      <rect x="10" y="52" width="60" height="6" rx="3" fill="#6b4f35"/>
      <rect x="16" y="58" width="5" height="16" rx="2" fill="#6b4f35"/>
      <rect x="59" y="58" width="5" height="16" rx="2" fill="#6b4f35"/>
      {/* laptop */}
      <rect x="24" y="38" width="32" height="18" rx="3" fill="#2e6080"/>
      <rect x="26" y="40" width="28" height="13" rx="2" fill="#e6f2f8"/>
      <rect x="20" y="56" width="40" height="3" rx="1.5" fill="#1a3a4a"/>
      {/* chart bars on screen */}
      <rect x="30" y="48" width="4" height="5" rx="1" fill="#5b9ab5"/>
      <rect x="36" y="44" width="4" height="9" rx="1" fill="#00BFFF"/>
      <rect x="42" y="46" width="4" height="7" rx="1" fill="#5b9ab5"/>
      {/* person */}
      <circle cx="40" cy="26" r="7" fill="#f5cba7" stroke="#d4b896" strokeWidth="1.2"/>
      <path d="M33 37 C33 31, 47 31, 47 37" fill="#3d6b5a"/>
    </svg>
  )
}

function IllustrationRelationships() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
      <rect width="80" height="80" rx="16" fill="#f5ede0"/>
      {/* two people */}
      <circle cx="28" cy="25" r="8" fill="#f5cba7" stroke="#d4b896" strokeWidth="1.5"/>
      <circle cx="52" cy="25" r="8" fill="#f5cba7" stroke="#d4b896" strokeWidth="1.5"/>
      <path d="M20 50 C20 40, 36 40, 36 50 L36 70 L20 70 Z" fill="#e91e63" opacity="0.8"/>
      <path d="M44 50 C44 40, 60 40, 60 50 L60 70 L44 70 Z" fill="#3d6b5a"/>
      {/* hands */}
      <path d="M36 58 Q40 55 44 58" fill="none" stroke="#f5cba7" strokeWidth="3.5" strokeLinecap="round"/>
      {/* heart */}
      <path d="M40 18 C40 16, 37 14.5, 37 17 C37 19 40 21 40 21 C40 21 43 19 43 17 C43 14.5 40 16 40 18Z" fill="#e53935"/>
    </svg>
  )
}

const courses = [
  { illustration: <IllustrationMindfulness />, title: 'Mindfulness-Based Stress Reduction', instructor: 'Dr. Anita Shrestha', level: 'Beginner', duration: '8 hrs', lessons: 24, price: 'NPR 1,500', free: false, tags: ['Mindfulness', 'Stress', 'Meditation'], color: 'var(--green-mist)' },
  { illustration: <IllustrationCBT />, title: 'Overcoming Anxiety: A CBT Approach', instructor: 'Mr. Roshan Karki', level: 'Intermediate', duration: '6 hrs', lessons: 18, price: 'FREE', free: true, tags: ['Anxiety', 'CBT', 'Skills'], color: 'var(--blue-mist)' },
  { illustration: <IllustrationResilience />, title: 'Building Emotional Resilience', instructor: 'Ms. Priya Tamang', level: 'Beginner', duration: '5 hrs', lessons: 15, price: 'NPR 1,200', free: false, tags: ['Resilience', 'Emotions', 'Wellbeing'], color: 'var(--earth-cream)' },
  { illustration: <IllustrationSleep />, title: 'Sleep Better: CBT for Insomnia', instructor: 'Dr. Anita Shrestha', level: 'Beginner', duration: '4 hrs', lessons: 12, price: 'NPR 800', free: false, tags: ['Sleep', 'Insomnia', 'CBT'], color: 'var(--green-mist)' },
  { illustration: <IllustrationWorkplace />, title: 'Workplace Mental Health', instructor: 'Mr. Roshan Karki', level: 'Advanced', duration: '7 hrs', lessons: 21, price: 'FREE', free: true, tags: ['Work', 'Burnout', 'Boundaries'], color: 'var(--blue-mist)' },
  { illustration: <IllustrationRelationships />, title: 'Healthy Relationships Workshop', instructor: 'Ms. Priya Tamang', level: 'Intermediate', duration: '5 hrs', lessons: 16, price: 'NPR 1,000', free: false, tags: ['Relationships', 'Communication', 'Boundaries'], color: 'var(--earth-cream)' },
]

const levelColor = { Beginner: 'var(--green-deep)', Intermediate: 'var(--blue-mid)', Advanced: 'var(--earth-mid)' }

export default function CoursesPage() {
  const { navigate } = useRouter()

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ background: 'var(--earth-cream)' }}>
        <span className="section-tag">Online Learning</span>
        <h1 className="section-title">Trainings for <em>Every</em> Journey</h1>
        <p className="section-desc">Self-paced, expert-led programs designed to support your mental wellness from home.</p>
      </div>

      <div className="section" style={{ background: 'var(--white)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
          {courses.map((c, i) => (
            <div
              key={i}
              style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--earth-cream)', boxShadow: 'var(--shadow-soft)', transition: 'all 0.25s', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ background: c.color, padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 110 }}>
                {c.illustration}
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: levelColor[c.level] }}>{c.level}</span>
                  {c.free
                    ? <span className="resource-free">FREE</span>
                    : <span style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--green-deep)', fontSize: '0.95rem' }}>{c.price}</span>
                  }
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 400, color: 'var(--green-deep)', marginBottom: '0.5rem', lineHeight: 1.3 }}>{c.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '0.75rem' }}>By {c.instructor}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {c.tags.map((t, j) => <span key={j} className="tag" style={{ fontSize: '0.68rem' }}>{t}</span>)}
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: 'var(--text-light)', padding: '0.75rem 0', borderTop: '1px solid var(--earth-cream)', marginBottom: '1rem' }}>
                  <span>📚 {c.lessons} lessons</span>
                  <span>⏱ {c.duration}</span>
                </div>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/book')}>
                  {c.free ? 'Enroll Free →' : 'Enroll Now →'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}