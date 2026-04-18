import { useState } from 'react'

const FAQS = [
  { q: 'What is  Mental Wellness Center?', a: 'Puja Samargi is Nepal\'s leading digital mental health platform, connecting individuals with licensed psychologists, counselors, and psychiatrists. We offer online and in-person therapy, free assessments, educational resources, and community support — all rooted in Nepali culture.' },
  { q: 'Are the therapists licensed and qualified?', a: 'Yes. Every therapist on our platform is verified by the Nepal Psychologists\' Council (NPC) and adheres to the Nepal Psychological Association\'s Code of Ethics. You can view each therapist\'s credentials, experience, and specializations on their profile page.' },
  { q: 'Is everything I share completely confidential?', a: 'Absolutely. All sessions and communications are strictly confidential under Nepali professional ethics standards. Information is only disclosed in rare cases required by law — such as imminent risk of harm. We use encrypted systems to protect your data.' },
  { q: 'How do I book a session?', a: 'Click "Book Session" from any page. You\'ll choose your session type (individual, couples, family, group), preferred therapist, and a convenient time slot. We offer both online (video/audio) and in-person sessions at our Kathmandu clinic.' },
  { q: 'How much does a session cost?', a: 'Session fees range from NPR 1,500 to NPR 3,000 depending on the therapist and session type. Group sessions start from NPR 500. We also offer sliding-scale fees for those with financial hardship — contact us to discuss.' },
  { q: 'What payment methods do you accept?', a: 'We accept eSewa, Khalti, credit/debit cards (Visa, Mastercard), and direct bank transfers. Payment is collected securely at the time of booking.' },
  { q: 'Can I use this platform if I\'m not in Kathmandu?', a: 'Yes! Our online sessions are accessible from anywhere in Nepal and abroad. You only need a stable internet connection and a private space. In-person sessions are available at our Kathmandu and Pokhara locations.' },
  { q: 'What if I need help urgently or I\'m in crisis?', a: 'If you are in immediate danger, please call Nepal Police (100) or the Mental Health Helpline (1800-210-1494). Our crisis section lists emergency contacts. Our team also offers same-day emergency consultations where possible — contact us directly.' },
  { q: 'Do you offer services in Nepali language?', a: 'Yes. All our therapists are fluent in Nepali and provide therapy in Nepali, English, or Hindi depending on your preference. Our platform also supports Nepali-language content throughout.' },
  { q: 'What mental health conditions do you treat?', a: 'Our therapists work with anxiety, depression, trauma/PTSD, OCD, bipolar disorder, relationship issues, grief, burnout, addiction, child and adolescent issues, and many more. Use our Disorders section to learn about specific conditions, or contact us if you are unsure.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="section" id="faq" style={{ background: 'var(--off-white)' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-tag">FAQ</span>
          <h2 className="section-title">Frequently Asked <em>Questions</em></h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>Everything you need to know before taking the first step.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-md)',
                  border: `1.5px solid ${isOpen ? 'var(--sky)' : 'var(--blue-pale)'}`,
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    width: '100%', padding: '1rem 1.25rem',
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', gap: '1rem',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', fontWeight: 700, color: isOpen ? 'var(--sky)' : 'var(--blue-deep)', lineHeight: 1.4 }}>
                    {faq.q}
                  </span>
                  <span style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: isOpen ? 'var(--sky)' : 'var(--blue-mist)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontSize: '0.8rem', color: isOpen ? 'white' : 'var(--blue-deep)',
                    transition: 'all 0.2s',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>+</span>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 1.25rem 1rem', borderTop: '1px solid var(--blue-pale)' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-mid)', lineHeight: 1.75, marginTop: '0.75rem' }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}