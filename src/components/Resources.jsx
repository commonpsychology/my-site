import { useRouter } from '../context/RouterContext'

function IllustrationWorksheet() {
  return (
    <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
      <rect width="56" height="56" rx="12" fill="#e6f2f8"/>
      <rect x="14" y="10" width="28" height="36" rx="4" fill="white" stroke="#b0d4e8" strokeWidth="1.5"/>
      <rect x="18" y="16" width="20" height="2.5" rx="1.25" fill="#5b9ab5"/>
      <rect x="18" y="21" width="16" height="2" rx="1" fill="#b0d4e8"/>
      <rect x="18" y="26" width="18" height="2" rx="1" fill="#b0d4e8"/>
      <rect x="18" y="31" width="12" height="2" rx="1" fill="#b0d4e8"/>
      <rect x="18" y="36" width="14" height="2" rx="1" fill="#b0d4e8"/>
      <circle cx="42" cy="42" r="8" fill="#00BFFF"/>
      <path d="M38.5 42l2.5 2.5 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IllustrationAudio() {
  return (
    <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
      <rect width="56" height="56" rx="12" fill="#e8f3ee"/>
      <circle cx="28" cy="26" r="12" fill="white" stroke="#b8d5c8" strokeWidth="1.5"/>
      <circle cx="28" cy="26" r="5" fill="#3d6b5a"/>
      <circle cx="28" cy="26" r="2" fill="white"/>
      {/* headphone arc */}
      <path d="M18 26a10 10 0 0 1 20 0" fill="none" stroke="#3d6b5a" strokeWidth="2" strokeLinecap="round"/>
      <rect x="16" y="24" width="4" height="7" rx="2" fill="#6a9e88"/>
      <rect x="36" y="24" width="4" height="7" rx="2" fill="#6a9e88"/>
      {/* sound waves */}
      <path d="M10 38 Q12 36 10 34" fill="none" stroke="#6a9e88" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 40 Q11 36 7 32" fill="none" stroke="#b8d5c8" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M46 38 Q44 36 46 34" fill="none" stroke="#6a9e88" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M49 40 Q45 36 49 32" fill="none" stroke="#b8d5c8" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function IllustrationEbook() {
  return (
    <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
      <rect width="56" height="56" rx="12" fill="#f5ede0"/>
      {/* book body */}
      <rect x="10" y="10" width="24" height="36" rx="3" fill="#a67c5b"/>
      <rect x="12" y="10" width="4" height="36" rx="2" fill="#6b4f35"/>
      {/* pages */}
      <rect x="16" y="12" width="16" height="32" rx="2" fill="white"/>
      <rect x="18" y="17" width="12" height="1.8" rx="0.9" fill="#d4b896"/>
      <rect x="18" y="21" width="10" height="1.5" rx="0.75" fill="#f5ede0"/>
      <rect x="18" y="25" width="11" height="1.5" rx="0.75" fill="#f5ede0"/>
      <rect x="18" y="29" width="8" height="1.5" rx="0.75" fill="#f5ede0"/>
      {/* heart */}
      <path d="M22 34 C22 32.5, 20 32, 20 33.5 C20 35 22 36.5 22 36.5 C22 36.5 24 35 24 33.5 C24 32 22 32.5 22 34Z" fill="#e07a5f"/>
      {/* bookmark */}
      <polygon points="36,10 44,10 44,30 40,26 36,30" fill="#00BFFF"/>
    </svg>
  )
}

function IllustrationMoodTracker() {
  return (
    <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
      <rect width="56" height="56" rx="12" fill="#e0f7ff"/>
      {/* calendar grid */}
      <rect x="8" y="12" width="40" height="34" rx="4" fill="white" stroke="#b0d4e8" strokeWidth="1.5"/>
      <rect x="8" y="12" width="40" height="9" rx="4" fill="#00BFFF"/>
      <rect x="8" y="17" width="40" height="4" fill="#009FD4"/>
      {/* calendar header dots */}
      <circle cx="16" cy="16" r="2.5" fill="white" opacity="0.7"/>
      <circle cx="40" cy="16" r="2.5" fill="white" opacity="0.7"/>
      {/* mood dots */}
      <circle cx="17" cy="29" r="3.5" fill="#81c784"/>
      <circle cx="25" cy="29" r="3.5" fill="#81c784"/>
      <circle cx="33" cy="29" r="3.5" fill="#ffb74d"/>
      <circle cx="41" cy="29" r="3.5" fill="#e57373"/>
      <circle cx="17" cy="38" r="3.5" fill="#ffb74d"/>
      <circle cx="25" cy="38" r="3.5" fill="#81c784"/>
      <circle cx="33" cy="38" r="3.5" fill="#81c784"/>
      <circle cx="41" cy="38" r="3.5" fill="#64b5f6"/>
    </svg>
  )
}

const resources = [
  {
    type: 'Worksheet',
    illustration: <IllustrationWorksheet />,
    title: 'Anxiety Management Worksheet',
    desc: 'Practical CBT exercises to manage anxious thoughts.',
    downloads: '1.2k downloads',
    free: true,
    route: '/resources',
  },
  {
    type: 'Audio',
    illustration: <IllustrationAudio />,
    title: 'Guided Meditation — 10 min',
    desc: 'Calm your mind with this Nepali-language guided session.',
    downloads: '890 listens',
    free: true,
    route: '/resources',
  },
  {
    type: 'eBook',
    illustration: <IllustrationEbook />,
    title: 'Understanding Depression',
    desc: 'A compassionate guide to understanding and living with depression.',
    downloads: '650 downloads',
    free: false,
    route: '/store',
  },
  {
    type: 'Tool',
    illustration: <IllustrationMoodTracker />,
    title: 'Mood Tracker Template',
    desc: 'Daily mood logging template for consistent mental health tracking.',
    downloads: '2.1k uses',
    free: true,
    route: '/resources',
  },
]

export default function Resources() {
  const { navigate } = useRouter()

  return (
    <section className="section resources" id="resources">
      <div className="section-header">
        <div>
          <span className="section-tag">Free Resources</span>
          <h2 className="section-title">Tools to Support Your <em>Everyday</em> Wellness</h2>
          <p className="section-desc">
            Download worksheets, guided audios, eBooks, and trackers — curated by our clinical team.
          </p>
        </div>
        <button className="btn btn-outline" onClick={() => navigate('/resources')}>
          View All Resources
        </button>
      </div>

      <div className="resources-grid">
        {resources.map((r, i) => (
          <div
            className="resource-card"
            key={i}
            onClick={() => navigate(r.route)}
          >
            <span className="resource-type">{r.type}</span>
            <div className="resource-illustration">{r.illustration}</div>
            <h4>{r.title}</h4>
            <p>{r.desc}</p>
            <div className="resource-meta">
              <span>{r.downloads}</span>
              <span className={r.free ? 'resource-free' : ''}>
                {r.free ? 'FREE' : 'Premium'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
