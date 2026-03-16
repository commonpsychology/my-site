import { useState, useEffect, useCallback } from 'react'

function AvatarSita() {
  return (
    <svg viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" width="42" height="42">
      <circle cx="21" cy="21" r="21" fill="#E0F7FF"/>
      <ellipse cx="21" cy="19" rx="8" ry="9" fill="#f5cba7"/>
      <ellipse cx="21" cy="13" rx="8.5" ry="5" fill="#4a148c"/>
      <rect x="13" y="13" width="3" height="10" rx="1.5" fill="#4a148c"/>
      <rect x="26" y="13" width="3" height="10" rx="1.5" fill="#4a148c"/>
      <ellipse cx="21" cy="33" rx="10" ry="6" fill="#e91e63"/>
      <rect x="15" y="27" width="12" height="10" rx="3" fill="#e91e63"/>
      <circle cx="21" cy="16" r="1.5" fill="#e91e63"/>
      <ellipse cx="17" cy="19" rx="1.5" ry="1.8" fill="white"/>
      <ellipse cx="25" cy="19" rx="1.5" ry="1.8" fill="white"/>
      <circle cx="17.5" cy="19" r="1" fill="#4a148c"/>
      <circle cx="25.5" cy="19" r="1" fill="#4a148c"/>
      <path d="M18 23 Q21 26 24 23" fill="none" stroke="#c0704a" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function AvatarBikram() {
  return (
    <svg viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" width="42" height="42">
      <circle cx="21" cy="21" r="21" fill="#e6f2f8"/>
      <ellipse cx="21" cy="19" rx="8" ry="9" fill="#d4a574"/>
      <ellipse cx="21" cy="13" rx="8.5" ry="4.5" fill="#212121"/>
      <rect x="14" y="27" width="14" height="10" rx="3" fill="#1565c0"/>
      <ellipse cx="21" cy="33" rx="10" ry="5" fill="#1a237e"/>
      <ellipse cx="17" cy="19" rx="1.5" ry="1.8" fill="white"/>
      <ellipse cx="25" cy="19" rx="1.5" ry="1.8" fill="white"/>
      <circle cx="17.5" cy="19" r="1" fill="#212121"/>
      <circle cx="25.5" cy="19" r="1" fill="#212121"/>
      <path d="M18 23 Q21 26 24 23" fill="none" stroke="#b07a4c" strokeWidth="1.2" strokeLinecap="round"/>
      <rect x="14.5" y="17" width="5" height="4" rx="2" fill="none" stroke="#1565c0" strokeWidth="1"/>
      <rect x="22.5" y="17" width="5" height="4" rx="2" fill="none" stroke="#1565c0" strokeWidth="1"/>
      <line x1="19.5" y1="19" x2="22.5" y2="19" stroke="#1565c0" strokeWidth="1"/>
    </svg>
  )
}

function AvatarKamala() {
  return (
    <svg viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" width="42" height="42">
      <circle cx="21" cy="21" r="21" fill="#b0d4e8"/>
      <ellipse cx="21" cy="19" rx="8" ry="9" fill="#f5cba7"/>
      <ellipse cx="21" cy="13" rx="8.5" ry="5" fill="#3e2723"/>
      <rect x="13" y="13" width="3" height="12" rx="1.5" fill="#3e2723"/>
      <rect x="26" y="13" width="3" height="12" rx="1.5" fill="#3e2723"/>
      <ellipse cx="21" cy="33" rx="10" ry="5" fill="#00897b"/>
      <rect x="15" y="27" width="12" height="10" rx="3" fill="#00897b"/>
      <circle cx="21" cy="15.5" r="1.5" fill="#c62828"/>
      <ellipse cx="17" cy="19" rx="1.5" ry="1.8" fill="white"/>
      <ellipse cx="25" cy="19" rx="1.5" ry="1.8" fill="white"/>
      <circle cx="17.5" cy="19" r="1" fill="#3e2723"/>
      <circle cx="25.5" cy="19" r="1" fill="#3e2723"/>
      <path d="M18 23 Q21 26 24 23" fill="none" stroke="#c0704a" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="13.5" cy="21" r="2" fill="#ffd54f" stroke="#00897b" strokeWidth="0.8"/>
    </svg>
  )
}

function AvatarArjun() {
  return (
    <svg viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" width="42" height="42">
      <circle cx="21" cy="21" r="21" fill="#e8f3ee"/>
      <ellipse cx="21" cy="19" rx="8" ry="9" fill="#d4a574"/>
      <ellipse cx="21" cy="13" rx="8.5" ry="4" fill="#1a1a1a"/>
      <rect x="14" y="27" width="14" height="10" rx="3" fill="#2d4a3e"/>
      <ellipse cx="21" cy="33" rx="10" ry="5" fill="#2d4a3e"/>
      <ellipse cx="17" cy="19" rx="1.5" ry="1.8" fill="white"/>
      <ellipse cx="25" cy="19" rx="1.5" ry="1.8" fill="white"/>
      <circle cx="17.5" cy="19" r="1" fill="#1a1a1a"/>
      <circle cx="25.5" cy="19" r="1" fill="#1a1a1a"/>
      <path d="M18 23 Q21 26 24 23" fill="none" stroke="#b07a4c" strokeWidth="1.2" strokeLinecap="round"/>
      <rect x="27" y="10" width="8" height="5" rx="1" fill="#2d4a3e" opacity="0.7"/>
    </svg>
  )
}

function AvatarNisha() {
  return (
    <svg viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" width="42" height="42">
      <circle cx="21" cy="21" r="21" fill="#f5ede0"/>
      <ellipse cx="21" cy="19" rx="8" ry="9" fill="#f5cba7"/>
      <ellipse cx="21" cy="13" rx="8.5" ry="5" fill="#6d4c41"/>
      <ellipse cx="21" cy="10" rx="5" ry="5" fill="#6d4c41"/>
      <rect x="13" y="13" width="3" height="10" rx="1.5" fill="#6d4c41"/>
      <rect x="26" y="13" width="3" height="10" rx="1.5" fill="#6d4c41"/>
      <rect x="15" y="27" width="12" height="10" rx="3" fill="#f06292"/>
      <ellipse cx="21" cy="33" rx="10" ry="5" fill="#e91e63"/>
      <circle cx="21" cy="15.5" r="1.5" fill="#e91e63"/>
      <ellipse cx="17" cy="19" rx="1.5" ry="1.8" fill="white"/>
      <ellipse cx="25" cy="19" rx="1.5" ry="1.8" fill="white"/>
      <circle cx="17.5" cy="19" r="1" fill="#6d4c41"/>
      <circle cx="25.5" cy="19" r="1" fill="#6d4c41"/>
      <path d="M18 23 Q21 27 24 23" fill="none" stroke="#c0704a" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="28.5" cy="21" r="2" fill="#ffd54f" stroke="#e91e63" strokeWidth="0.8"/>
    </svg>
  )
}

const testimonials = [
  { text: 'The therapists here truly understand the cultural context of mental health in Nepal. I felt heard and supported from the very first session.', name: 'Sita M.', detail: 'Anxiety & Stress · 3 months', avatarClass: 'av1', Avatar: AvatarSita, stars: 5 },
  { text: 'The PHQ-9 assessment helped me realize I needed professional support. Booking was simple and my therapist was incredibly compassionate.', name: 'Bikram T.', detail: 'Depression · 6 months', avatarClass: 'av2', Avatar: AvatarBikram, stars: 5 },
  { text: 'The online sessions fit perfectly into my busy schedule. The platform is easy to use and the resources they offer are genuinely helpful.', name: 'Kamala R.', detail: 'Relationship Counseling · 2 months', avatarClass: 'av3', Avatar: AvatarKamala, stars: 5 },
  { text: "I was skeptical at first, but the DASS-21 assessment gave me real clarity. My therapist tailored the sessions exactly to my needs.", name: 'Arjun S.', detail: 'Stress & Burnout · 4 months', avatarClass: 'av1', Avatar: AvatarArjun, stars: 5 },
  { text: "As someone dealing with grief, I needed a safe space. Puja Samargi gave me that — and so much more. Truly life-changing support.", name: 'Nisha G.', detail: 'Grief Counseling · 5 months', avatarClass: 'av2', Avatar: AvatarNisha, stars: 5 },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((idx) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setActive(idx)
      setAnimating(false)
    }, 300)
  }, [animating])

  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length)
  const next = () => goTo((active + 1) % testimonials.length)

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [active])

  const t = testimonials[active]

  return (
    <section className="section testimonials">
      <div className="section-header">
        <div>
          <span className="section-tag">Client Stories</span>
          <h2 className="section-title">Voices of <em>Healing</em></h2>
          <p className="section-desc">Real experiences from real people who took the first step toward better mental health.</p>
        </div>
      </div>

      <div className="slider-wrapper">
        <div className={`slider-card ${animating ? 'slider-fade-out' : 'slider-fade-in'}`}>
          <div className="testimonial-quote">"</div>
          <p className="testimonial-text">{t.text}</p>
          <div className="testimonial-author">
            <div className={`testimonial-avatar ${t.avatarClass}`}>
              <t.Avatar />
            </div>
            <div>
              <div className="testimonial-name">{t.name}</div>
              <div className="testimonial-detail">{t.detail}</div>
              <div className="testimonial-stars">{'★'.repeat(t.stars)}</div>
            </div>
          </div>
        </div>

        <div className="slider-controls">
          <button className="slider-btn" onClick={prev} aria-label="Previous">‹</button>
          <div className="slider-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`slider-dot ${i === active ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button className="slider-btn" onClick={next} aria-label="Next">›</button>
        </div>
      </div>
    </section>
  )
}