import { useRouter } from '../context/RouterContext'

const allServices = [
  {
    icon: '🧠', iconClass: 'si-green',
    title: 'Individual Therapy',
    desc: 'One-on-one sessions tailored to your unique needs, delivered by certified clinical psychologists. Available online or in-person across Kathmandu.',
    features: ['CBT & DBT approaches', '60-minute sessions', 'Flexible scheduling', 'Session notes shared securely'],
    specialties: ['Anxiety', 'Depression', 'CBT', 'Trauma'],
  },
  {
    icon: '💑', iconClass: 'si-earth',
    title: 'Couples Counseling',
    desc: 'Rebuild trust, communication, and intimacy with your partner through evidence-based relationship therapy.',
    features: ['Gottman Method', 'Joint & separate sessions', 'Conflict resolution', 'Relationship assessment'],
    specialties: ['Relationship', 'Couples', 'Gottman', 'Communication'],
  },
  {
    icon: '👨‍👩‍👧', iconClass: 'si-blue',
    title: 'Family Therapy',
    desc: 'Strengthen family bonds and work through dynamics that affect everyone in the household.',
    features: ['Family systems approach', 'Parenting support', 'Communication skills', 'Crisis intervention'],
    specialties: ['Family', 'Parenting', 'Crisis', 'Communication'],
  },
  {
    icon: '🧒', iconClass: 'si-green',
    title: 'Child Psychology',
    desc: 'Specialized support for children aged 5–18, using play therapy and age-appropriate techniques.',
    features: ['Play therapy', 'Behavioral assessment', 'School-related issues', 'Parent coaching'],
    specialties: ['Children', 'Play Therapy', 'Behavioral', 'Adolescents'],
  },
  {
    icon: '🌿', iconClass: 'si-earth',
    title: 'Mindfulness & Stress',
    desc: 'Learn practical mindfulness techniques to manage stress, anxiety, and emotional regulation.',
    features: ['MBSR program', 'Breathing techniques', 'Stress audit', 'Daily practice tools'],
    specialties: ['Mindfulness', 'Stress', 'Anxiety', 'MBSR'],
  },
  {
    icon: '😴', iconClass: 'si-blue',
    title: 'Sleep & Mood',
    desc: 'Address insomnia, burnout, and mood disorders with targeted therapeutic interventions.',
    features: ['CBT for insomnia', 'Mood charting', 'Sleep hygiene coaching', 'Lifestyle integration'],
    specialties: ['Insomnia', 'Sleep', 'Mood', 'Burnout'],
  },
  {
    icon: '💼', iconClass: 'si-blue',
    title: 'Organizational Wellness',
    desc: 'Support for workplace mental health and employee well-being.',
    features: ['Workplace assessments', 'Employee assistance', 'Leadership training', 'Culture of care'],
    specialties: ['Workplace', 'Employee', 'Leadership', 'Culture'],
  },
]

export default function ServicesPage() {
  const { navigate } = useRouter()

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ background: 'var(--green-mist)' }}>
        <span className="section-tag">All Services</span>
        <h1 className="section-title">Everything You Need for <em>Mental Wellness</em></h1>
        <p className="section-desc">
          Comprehensive, evidence-based mental health services designed for the Nepali community.
        </p>
      </div>

      <div className="section" style={{ background: 'var(--white)' }}>
        <div className="services-grid-full">
          {allServices.map((s, i) => (
            <div className="service-card-full" key={i}>

              <div className={`service-icon ${s.iconClass}`}>{s.icon}</div>

              <h3 className="service-card-title">{s.title}</h3>

              <p className="service-card-desc">{s.desc}</p>

              {/* className="service-card-features" is what gives this flex:1 */}
              <ul className="service-card-features">
                {s.features.map((f, j) => (
                  <li key={j}>
                    <span className="service-card-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className="btn btn-primary service-card-btn"
                onClick={() => navigate('/book', {
                  serviceTitle: s.title,
                  serviceSpecialties: s.specialties,
                })}
              >
                Book This Service
              </button>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}