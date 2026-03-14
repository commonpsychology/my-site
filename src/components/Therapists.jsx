const therapists = [
  {
    name: 'Dr. Anita Shrestha',
    role: 'Clinical Psychologist',
    emoji: '👩‍⚕️',
    imgClass: 't1',
    tags: ['Anxiety', 'Depression', 'Trauma'],
    tagClass: '',
    rating: '4.9',
    reviews: 128,
    fee: 'NPR 2,000',
    available: true,
    exp: '8 yrs'
  },
  {
    name: 'Mr. Roshan Karki',
    role: 'Counseling Psychologist',
    emoji: '👨‍💼',
    imgClass: 't2',
    tags: ['Relationships', 'PTSD', 'Grief'],
    tagClass: 'blue-tag',
    rating: '4.8',
    reviews: 96,
    fee: 'NPR 1,800',
    available: true,
    exp: '6 yrs'
  },
  {
    name: 'Ms. Priya Tamang',
    role: 'Child & Adolescent Therapist',
    emoji: '👩‍🏫',
    imgClass: 't3',
    tags: ['Child Psychology', 'Family', 'Behavior'],
    tagClass: '',
    rating: '5.0',
    reviews: 74,
    fee: 'NPR 1,500',
    available: false,
    exp: '5 yrs'
  },
]

export default function Therapists() {
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
        <button className="btn btn-earth">Browse All Therapists</button>
      </div>

      <div className="therapists-grid">
        {therapists.map((t, i) => (
          <div className="therapist-card" key={i}>
            <div className={`therapist-img ${t.imgClass}`}>
              <span>{t.emoji}</span>
              {t.available
                ? <span className="therapist-avail-badge">● Available</span>
                : <span className="therapist-avail-badge" style={{background:'var(--earth-warm)'}}>Unavailable</span>
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
                  ⭐ {t.rating} <span style={{fontWeight:400, color:'var(--text-light)'}}>({t.reviews} reviews)</span>
                </div>
                <div className="therapist-fee">
                  {t.fee} <small>/ session</small>
                </div>
              </div>
              <button className="btn btn-primary" style={{width:'100%', marginTop:'1rem', justifyContent:'center'}}>
                Book Session
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}