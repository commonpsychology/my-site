import { useRouter } from '../context/RouterContext'

export default function Hero() {
  const { navigate } = useRouter()

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span>🌿</span> Nepal's Trusted Mental Wellness Platform
        </div>

        <h1>
          We Are Here To <i>Help</i>
        </h1>

        <p className="hero-desc">
          Professional therapy, self-assessment tools, and wellness resources — 
          all in one compassionate space. Connect with certified therapists from the comfort of your home.
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

      <div className="hero-visual">
        <div className="hero-card-stack">
          <div className="hero-main-card">
            <div className="hero-card-img">
              <svg className="leaf-art" viewBox="0 0 200 200" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 10 C60 10, 10 60, 10 100 C10 155, 60 190, 100 190 C140 190, 190 155, 190 100 C190 60, 140 10, 100 10 Z"/>
                <path d="M100 40 C80 40, 40 80, 40 100 C40 130, 70 160, 100 160 C130 160, 160 130, 160 100 C160 80, 120 40, 100 40 Z" fill="none" stroke="white" strokeWidth="2" opacity="0.4"/>
                <line x1="100" y1="40" x2="100" y2="160" stroke="white" strokeWidth="1.5" opacity="0.5"/>
                <line x1="100" y1="80" x2="130" y2="65" stroke="white" strokeWidth="1" opacity="0.4"/>
                <line x1="100" y1="100" x2="140" y2="90" stroke="white" strokeWidth="1" opacity="0.4"/>
                <line x1="100" y1="120" x2="135" y2="115" stroke="white" strokeWidth="1" opacity="0.4"/>
                <line x1="100" y1="80" x2="70" y2="65" stroke="white" strokeWidth="1" opacity="0.4"/>
                <line x1="100" y1="100" x2="60" y2="90" stroke="white" strokeWidth="1" opacity="0.4"/>
                <line x1="100" y1="120" x2="65" y2="115" stroke="white" strokeWidth="1" opacity="0.4"/>
              </svg>
            </div>
            <div className="hero-card-overlay">
              <div className="hero-card-name">Dr. Anita Shrestha</div>
              <div className="hero-card-role">Clinical Psychologist · 8 yrs exp.</div>
              <div className="hero-card-avail">
                <span className="dot" /> Available Today — NPR 2,000/session
              </div>
            </div>
          </div>

          <div className="floating-card fc-1" style={{ cursor: 'pointer' }} onClick={() => navigate('/resources')}>
            <div className="fc-icon green">🧘</div>
            <div>
              <div className="fc-label">Mood Tracker</div>
              <div className="fc-sub">Log your daily mood</div>
            </div>
          </div>

          <div className="floating-card fc-2" style={{ cursor: 'pointer' }} onClick={() => navigate('/assessments')}>
            <div className="fc-label" style={{ marginBottom: '4px' }}>📋 PHQ-9 Completed</div>
            <div className="fc-sub">Score: Mild — See recommendations →</div>
          </div>
        </div>
      </div>
    </section>
  )
}