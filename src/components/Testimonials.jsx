import { useState, useEffect, useCallback } from 'react'

const testimonials = [
  { text:'The therapists here truly understand the cultural context of mental health in Nepal. I felt heard and supported from the very first session.', name:'Sita M.', detail:'Anxiety & Stress · 3 months', avatarClass:'av1', avatar:'🙋‍♀️', stars:5 },
  { text:'The PHQ-9 assessment helped me realize I needed professional support. Booking was simple and my therapist was incredibly compassionate.', name:'Bikram T.', detail:'Depression · 6 months', avatarClass:'av2', avatar:'🙋‍♂️', stars:5 },
  { text:'The online sessions fit perfectly into my busy schedule. The platform is easy to use and the resources they offer are genuinely helpful.', name:'Kamala R.', detail:'Relationship Counseling · 2 months', avatarClass:'av3', avatar:'👩', stars:5 },
  { text:'I was skeptical at first, but the DASS-21 assessment gave me real clarity. My therapist tailored the sessions exactly to my needs.', name:'Arjun S.', detail:'Stress & Burnout · 4 months', avatarClass:'av1', avatar:'👨', stars:5 },
  { text:'As someone dealing with grief, I needed a safe space. Puja Samargi gave me that — and so much more. Truly life-changing support.', name:'Nisha G.', detail:'Grief Counseling · 5 months', avatarClass:'av2', avatar:'🙍‍♀️', stars:5 },
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
            <div className={`testimonial-avatar ${t.avatarClass}`}>{t.avatar}</div>
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