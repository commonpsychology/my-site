import { useState } from 'react'
import { useRouter } from '../context/RouterContext'

const TEAM = [
  { name: 'Dr. Anita Shrestha', role: 'Clinical Psychologist & Director', email: 'anita@pujasamargi.com.np', phone: '+977 1-4XXXXXX', avatar: 'AS' },
  { name: 'Dr. Sunita Rai', role: 'Consultant Psychiatrist', email: 'sunita@pujasamargi.com.np', phone: '+977 1-4XXXXXX', avatar: 'SR' },
  { name: 'Rohan Karki', role: 'CBT & Child Psychologist', email: 'rohan@pujasamargi.com.np', phone: '+977 1-4XXXXXX', avatar: 'RK' },
  { name: 'Prabha Thapa', role: 'Mindfulness & Wellness Coach', email: 'prabha@pujasamargi.com.np', phone: '+977 1-4XXXXXX', avatar: 'PT' },
]

const FAQS = [
  { q: 'How do I book a session?', a: 'You can book online through our Book Session page, call our reception, or send us a message. We respond within 24 hours.' },
  { q: 'Is therapy confidential?', a: 'Yes, everything discussed in therapy is strictly confidential. We only break confidentiality in rare cases involving imminent risk to life, as required by law.' },
  { q: 'Do you offer online therapy?', a: 'Absolutely. We offer secure video therapy sessions for clients anywhere in Nepal or abroad via Zoom or our in-app calling.' },
  { q: 'What is the cost of a session?', a: 'Session fees vary by therapist and type. Please see our Payments & Fees page or contact us directly for a detailed breakdown and subsidy options.' },
  { q: 'I\'m in crisis right now. What should I do?', a: 'Please call iCall Nepal at 9152987821, TPO Nepal at 01-4460 052, or go to your nearest emergency room. We also have an emergency contact option below.' },
]

export default function ContactPage() {
  // eslint-disable-next-line no-unused-vars
  const { navigate } = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' })
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  function handleSubmit() {
    if (!form.name || !form.email || !form.message) return
    // TODO: POST /api/contact with form data
    setSent(true)
  }

  const inputStyle = {
    width: '100%', padding: '0.85rem 1rem',
    border: '1.5px solid var(--blue-pale)', borderRadius: 10,
    fontFamily: 'var(--font-body)', fontSize: '0.9rem',
    background: 'var(--white)', color: 'var(--text-dark)',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  return (
    <div className="page-wrapper" style={{ background: 'var(--off-white)' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0f3460 0%, #1a5276 40%, #2980b9 100%)',
        padding: '5rem 4rem 4rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', bottom: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(93,173,226,0.2) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 620 }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>📞 Get In Touch</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
            We're Here<br />to Help
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: 460 }}>
            Whether you have a question, need to book a session, or just want to learn more — our team is ready to help. Reach out anytime.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem' }}>

        {/* Contact info + Form grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', marginBottom: '4rem', alignItems: 'start' }}>

          {/* Left: Contact details */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--blue-deep)', marginBottom: '1.5rem' }}>Contact Information</h2>

            {[
              { icon: '📍', label: 'Office Address', lines: ['Puja Samargi Mental Wellness Center', 'New Baneshwor, Kathmandu 44600', 'Bagmati Province, Nepal'] },
              { icon: '📞', label: 'Phone', lines: ['+977 1-4XXXXXX (Reception)', '+977 98XXXXXXXX (WhatsApp)'] },
              { icon: '📧', label: 'Email', lines: ['hello@pujasamargi.com.np', 'appointments@pujasamargi.com.np'] },
              { icon: '🕐', label: 'Office Hours', lines: ['Sun–Fri: 9:00 AM – 6:00 PM', 'Saturday: 10:00 AM – 2:00 PM', 'Public Holidays: Closed'] },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--sky-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--sky)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>{item.label}</div>
                  {item.lines.map((l, j) => (
                    <div key={j} style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-mid)', lineHeight: 1.6 }}>{l}</div>
                  ))}
                </div>
              </div>
            ))}

            {/* Emergency box */}
            <div style={{ background: '#fff5f5', border: '1.5px solid #ffcccc', borderRadius: 12, padding: '1.1rem 1.25rem' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 800, color: '#c62828', marginBottom: '0.5rem' }}>🚨 Crisis & Emergency</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#721c24', lineHeight: 1.6, margin: 0 }}>
                iCall Nepal: <strong>9152987821</strong><br />
                TPO Nepal: <strong>01-4460 052</strong><br />
                Emergency Services: <strong>100</strong>
              </p>
            </div>
          </div>

          {/* Right: Contact form */}
          <div style={{ background: 'var(--white)', borderRadius: 20, padding: '2.5rem', border: '1px solid var(--blue-pale)', boxShadow: '0 8px 32px rgba(15,52,96,0.08)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--blue-deep)', marginBottom: '0.75rem' }}>Message Sent!</h3>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-light)', lineHeight: 1.65 }}>
                  Thank you for reaching out. A member of our team will reply within 24 hours.
                </p>
                <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--blue-deep)', marginBottom: '1.5rem' }}>Send Us a Message</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Full Name *</label>
                      <input style={inputStyle} placeholder="Your name" value={form.name} onChange={e => update('name', e.target.value)}
                        onFocus={e => { e.target.style.borderColor = '#2980b9'; e.target.style.boxShadow = '0 0 0 3px rgba(41,128,185,0.12)' }}
                        onBlur={e => { e.target.style.borderColor = 'var(--blue-pale)'; e.target.style.boxShadow = 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Email *</label>
                      <input style={inputStyle} type="email" placeholder="your@email.com" value={form.email} onChange={e => update('email', e.target.value)}
                        onFocus={e => { e.target.style.borderColor = '#2980b9'; e.target.style.boxShadow = '0 0 0 3px rgba(41,128,185,0.12)' }}
                        onBlur={e => { e.target.style.borderColor = 'var(--blue-pale)'; e.target.style.boxShadow = 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Phone (optional)</label>
                    <input style={inputStyle} type="tel" placeholder="98XXXXXXXX" value={form.phone} onChange={e => update('phone', e.target.value)}
                      onFocus={e => { e.target.style.borderColor = '#2980b9'; e.target.style.boxShadow = '0 0 0 3px rgba(41,128,185,0.12)' }}
                      onBlur={e => { e.target.style.borderColor = 'var(--blue-pale)'; e.target.style.boxShadow = 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Subject</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.subject} onChange={e => update('subject', e.target.value)}>
                      {['General Enquiry', 'Book a Session', 'Therapy Information', 'Billing & Payments', 'Research Collaboration', 'Media & Press', 'Complaint / Feedback'].map(s => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Message *</label>
                    <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }} placeholder="How can we help you?" value={form.message} onChange={e => update('message', e.target.value)}
                      onFocus={e => { e.target.style.borderColor = '#2980b9'; e.target.style.boxShadow = '0 0 0 3px rgba(41,128,185,0.12)' }}
                      onBlur={e => { e.target.style.borderColor = 'var(--blue-pale)'; e.target.style.boxShadow = 'none' }} />
                  </div>
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', background: 'linear-gradient(135deg, #0f3460, #2980b9)', border: 'none', borderRadius: 10, fontSize: '0.95rem' }}
                    onClick={handleSubmit}
                  >
                    Send Message →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Meet the Team */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--blue-deep)', marginBottom: '0.5rem' }}>Meet Our Team</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-light)', marginBottom: '1.75rem' }}>You can reach any team member directly for specialist enquiries.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {TEAM.map((member, i) => (
              <div key={i} style={{ background: 'var(--white)', borderRadius: 16, padding: '1.5rem', border: '1px solid var(--blue-pale)', textAlign: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #0f3460, #2980b9)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'white' }}>
                  {member.avatar}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--blue-deep)', marginBottom: '0.2rem' }}>{member.name}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '1rem' }}>{member.role}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--sky)' }}>{member.email}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--blue-deep)', marginBottom: '1.5rem' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: 'var(--white)', borderRadius: 12, border: `1px solid ${openFaq === i ? '#2980b9' : 'var(--blue-pale)'}`, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.1rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--blue-deep)' }}>{faq.q}</span>
                  <span style={{ color: 'var(--sky)', fontSize: '1.2rem', flexShrink: 0, transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 1.25rem 1.1rem', fontFamily: 'var(--font-body)', fontSize: '0.86rem', color: 'var(--text-mid)', lineHeight: 1.7, borderTop: '1px solid var(--blue-pale)' }}>
                    <div style={{ paddingTop: '0.85rem' }}>{faq.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}