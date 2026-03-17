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

/* ── Shared palette mirroring the navbar gradient language ── */
const C = {
  skyBright:  '#00BFFF',
  skyMid:     '#009FD4',
  skyDeep:    '#007BA8',
  skyFaint:   '#E0F7FF',
  skyFainter: '#F0FBFF',
  skyGhost:   '#F8FEFF',
  white:      '#ffffff',
  mint:       '#e8f3ee',
  mintMid:    '#b8d5c8',
  textDark:   '#1a3a4a',
  textMid:    '#2e6080',
  textLight:  '#7a9aaa',
  border:     '#b0d4e8',
  borderFaint:'#daeef8',
}

const heroGrad   = `linear-gradient(135deg, ${C.skyDeep} 0%, ${C.skyMid} 40%, ${C.skyBright} 80%, #22d3ee 100%)`
const sectionGrad = `linear-gradient(135deg, ${C.skyFainter} 0%, ${C.mint} 60%, ${C.skyFaint} 100%)`
// eslint-disable-next-line no-unused-vars
const cardGrad    = `linear-gradient(135deg, ${C.skyGhost} 0%, ${C.mint} 100%)`
const btnGrad     = `linear-gradient(135deg, ${C.skyDeep} 0%, ${C.skyBright} 100%)`

export default function ContactPage() {
  // eslint-disable-next-line no-unused-vars
  const { navigate } = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' })
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  function handleSubmit() {
    if (!form.name || !form.email || !form.message) return
    setSent(true)
  }

  const inputStyle = {
    width: '100%', padding: '0.85rem 1rem',
    border: `1.5px solid ${C.border}`, borderRadius: 10,
    fontFamily: 'var(--font-body)', fontSize: '0.9rem',
    background: C.white, color: C.textDark,
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  return (
    <div className="page-wrapper" style={{ background: C.skyGhost }}>

      {/* ── Hero ── */}
      <div style={{
        background: heroGrad,
        padding: '5rem 4rem 4rem', position: 'relative', overflow: 'hidden',
      }}>
        {/* decorative circles */}
        <div style={{ position: 'absolute', bottom: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -40, left: '60%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 620, position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 100, padding: '0.3rem 0.9rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' }}>📞 Get In Touch</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
            We're Here<br />to Help
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, maxWidth: 460 }}>
            Whether you have a question, need to book a session, or just want to learn more — our team is ready to help. Reach out anytime.
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem' }}>

        {/* Contact info + Form grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', marginBottom: '4rem', alignItems: 'start' }}>

          {/* Left: Contact details */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: C.textDark, marginBottom: '1.5rem' }}>Contact Information</h2>

            {[
              { icon: '📍', label: 'Office Address', lines: ['Puja Samargi Mental Wellness Center', 'New Baneshwor, Kathmandu 44600', 'Bagmati Province, Nepal'] },
              { icon: '📞', label: 'Phone', lines: ['+977 1-4XXXXXX (Reception)', '+977 98XXXXXXXX (WhatsApp)'] },
              { icon: '📧', label: 'Email', lines: ['hello@pujasamargi.com.np', 'appointments@pujasamargi.com.np'] },
              { icon: '🕐', label: 'Office Hours', lines: ['Sun–Fri: 9:00 AM – 6:00 PM', 'Saturday: 10:00 AM – 2:00 PM', 'Public Holidays: Closed'] },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `linear-gradient(135deg, ${C.skyFaint} 0%, ${C.mint} 100%)`,
                  border: `1px solid ${C.borderFaint}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, color: C.skyBright, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>{item.label}</div>
                  {item.lines.map((l, j) => (
                    <div key={j} style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: C.textMid, lineHeight: 1.6 }}>{l}</div>
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
          <div style={{
            background: C.white, borderRadius: 20, padding: '2.5rem',
            border: `1px solid ${C.borderFaint}`,
            boxShadow: `0 8px 40px rgba(0,191,255,0.08), 0 2px 12px rgba(0,0,0,0.04)`,
          }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: C.textDark, marginBottom: '0.75rem' }}>Message Sent!</h3>
                <p style={{ fontFamily: 'var(--font-body)', color: C.textLight, lineHeight: 1.65 }}>
                  Thank you for reaching out. A member of our team will reply within 24 hours.
                </p>
                <button style={{ marginTop: '1.5rem', padding: '0.7rem 1.8rem', borderRadius: 10, border: 'none', background: btnGrad, color: C.white, fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }} onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: C.textDark, marginBottom: '1.5rem' }}>Send Us a Message</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: C.textMid, marginBottom: '0.35rem' }}>Full Name *</label>
                      <input style={inputStyle} placeholder="Your name" value={form.name} onChange={e => update('name', e.target.value)}
                        onFocus={e => { e.target.style.borderColor = C.skyBright; e.target.style.boxShadow = `0 0 0 3px rgba(0,191,255,0.12)` }}
                        onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: C.textMid, marginBottom: '0.35rem' }}>Email *</label>
                      <input style={inputStyle} type="email" placeholder="your@email.com" value={form.email} onChange={e => update('email', e.target.value)}
                        onFocus={e => { e.target.style.borderColor = C.skyBright; e.target.style.boxShadow = `0 0 0 3px rgba(0,191,255,0.12)` }}
                        onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: C.textMid, marginBottom: '0.35rem' }}>Phone (optional)</label>
                    <input style={inputStyle} type="tel" placeholder="98XXXXXXXX" value={form.phone} onChange={e => update('phone', e.target.value)}
                      onFocus={e => { e.target.style.borderColor = C.skyBright; e.target.style.boxShadow = `0 0 0 3px rgba(0,191,255,0.12)` }}
                      onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: C.textMid, marginBottom: '0.35rem' }}>Subject</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.subject} onChange={e => update('subject', e.target.value)}>
                      {['General Enquiry', 'Book a Session', 'Therapy Information', 'Billing & Payments', 'Research Collaboration', 'Media & Press', 'Complaint / Feedback'].map(s => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: C.textMid, marginBottom: '0.35rem' }}>Message *</label>
                    <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }} placeholder="How can we help you?" value={form.message} onChange={e => update('message', e.target.value)}
                      onFocus={e => { e.target.style.borderColor = C.skyBright; e.target.style.boxShadow = `0 0 0 3px rgba(0,191,255,0.12)` }}
                      onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = 'none' }} />
                  </div>
                  <button
                    style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', background: btnGrad, border: 'none', borderRadius: 10, fontSize: '0.95rem', color: C.white, fontFamily: 'var(--font-body)', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.02em', transition: 'opacity 0.2s' }}
                    onClick={handleSubmit}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Send Message →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Meet the Team ── */}
        <div style={{ marginBottom: '4rem' }}>
          {/* Section header strip */}
          <div style={{ background: sectionGrad, borderRadius: 16, padding: '1.5rem 2rem', marginBottom: '1.75rem', border: `1px solid ${C.borderFaint}` }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: C.textDark, margin: 0 }}>Meet Our Team</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: C.textMid, margin: '0.3rem 0 0' }}>You can reach any team member directly for specialist enquiries.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {TEAM.map((member, i) => (
              <div key={i} style={{
                background: C.white, borderRadius: 16, padding: '1.5rem',
                border: `1px solid ${C.borderFaint}`, textAlign: 'center',
                boxShadow: `0 4px 20px rgba(0,191,255,0.06)`,
                transition: 'transform 0.22s, box-shadow 0.22s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 36px rgba(0,191,255,0.12)` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 20px rgba(0,191,255,0.06)` }}
              >
                <div style={{
                  width: 60, height: 60, borderRadius: '50%',
                  background: btnGrad,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: C.white,
                  boxShadow: `0 4px 16px rgba(0,191,255,0.3)`,
                }}>
                  {member.avatar}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: C.textDark, marginBottom: '0.2rem' }}>{member.name}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: C.textLight, marginBottom: '1rem' }}>{member.role}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: C.skyMid, fontWeight: 600 }}>{member.email}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ background: sectionGrad, borderRadius: 16, padding: '1.5rem 2rem', marginBottom: '1.5rem', border: `1px solid ${C.borderFaint}` }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: C.textDark, margin: 0 }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{
                background: C.white, borderRadius: 12,
                border: `1px solid ${openFaq === i ? C.skyBright : C.borderFaint}`,
                overflow: 'hidden', transition: 'border-color 0.2s',
                boxShadow: openFaq === i ? `0 4px 20px rgba(0,191,255,0.1)` : 'none',
              }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.1rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 700, color: C.textDark }}>{faq.q}</span>
                  <span style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    background: openFaq === i ? btnGrad : C.skyFaint,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: openFaq === i ? C.white : C.skyMid,
                    fontSize: '1.1rem', fontWeight: 700,
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform 0.2s, background 0.2s',
                  }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 1.25rem 1.1rem', fontFamily: 'var(--font-body)', fontSize: '0.86rem', color: C.textMid, lineHeight: 1.7, borderTop: `1px solid ${C.borderFaint}` }}>
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