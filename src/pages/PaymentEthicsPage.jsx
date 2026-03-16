import { useState } from 'react'
import { useRouter } from '../context/RouterContext'

const PLANS = [
  {
    name: 'Single Session',
    price: 'NPR 2,500',
    priceNote: 'per session',
    color: 'var(--blue-mist)',
    accentColor: '#2980b9',
    features: [
      '50-minute therapy session',
      'Any registered therapist',
      'Online or in-person',
      'Session notes provided',
      'No commitment required',
    ],
    cta: 'Book Now', popular: false,
  },
  {
    name: 'Monthly Plan',
    price: 'NPR 8,500',
    priceNote: '4 sessions / month',
    color: 'linear-gradient(135deg, #0f3460 0%, #2980b9 100%)',
    accentColor: 'white',
    features: [
      '4 × 50-minute sessions',
      'Same therapist continuity',
      'Priority booking',
      'Secure messaging access',
      'Monthly progress report',
      '15% saving vs single rate',
    ],
    cta: 'Get Started', popular: true,
  },
  {
    name: 'Couples / Family',
    price: 'NPR 3,500',
    priceNote: 'per session',
    color: 'var(--green-mist)',
    accentColor: 'var(--green-deep)',
    features: [
      '80-minute joint session',
      'Specialist couples therapist',
      'Online or in-person',
      'Homework & exercises',
      'Flexible scheduling',
    ],
    cta: 'Book Session', popular: false,
  },
  {
    name: 'Sliding Scale',
    price: 'NPR 500–1,500',
    priceNote: 'income-based',
    color: '#fff5e6',
    accentColor: '#e65100',
    features: [
      'For low-income applicants',
      'Application required',
      'Limited spots available',
      'Full 50-minute sessions',
      'Same quality of care',
    ],
    cta: 'Apply', popular: false,
  },
]

const ETHICS = [
  {
    icon: '🔒', title: 'Confidentiality',
    body: 'All communications between clients and therapists are strictly confidential. We will never share your information with third parties without your explicit written consent, except where required by law (imminent risk to life).',
  },
  {
    icon: '🤝', title: 'Informed Consent',
    body: 'Before any therapy begins, clients receive a full explanation of the therapeutic process, its limitations, and their rights. Ongoing consent is obtained throughout treatment. Clients may withdraw at any time.',
  },
  {
    icon: '⚖️', title: 'Professional Standards',
    body: 'All our therapists are licensed under the Nepal Medical Council or the Nepal Psychological Society. We follow the ethical guidelines set by the Nepal Health Professional Council.',
  },
  {
    icon: '🌐', title: 'Data Privacy',
    body: 'Client data is stored on encrypted servers compliant with Nepal\'s privacy legislation. We follow the principles of data minimisation, purpose limitation, and storage limitation. See our Privacy Policy for full details.',
  },
  {
    icon: '🚫', title: 'No Discrimination',
    body: 'We provide services without discrimination on the basis of gender, sexuality, caste, religion, ethnicity, disability, or socioeconomic status. Inclusive care is fundamental to our mission.',
  },
  {
    icon: '📣', title: 'Complaints & Redress',
    body: 'If you have a complaint about a therapist or service, you may contact our Ethics Officer directly at ethics@pujasamargi.com.np. All complaints are investigated within 10 business days.',
  },
]

const BILLING_FAQS = [
  { q: 'What payment methods do you accept?', a: 'We accept eSewa, Khalti, bank transfer (NABIL, NIC Asia, Global IME), and cash payments at our office. Credit/debit cards are accepted online.' },
  { q: 'Is there a cancellation policy?', a: 'Sessions cancelled with 24+ hours notice receive a full refund or rescheduling. Sessions cancelled within 24 hours are charged 50% of the session fee.' },
  { q: 'Can I get an insurance receipt?', a: 'Yes. We provide detailed tax receipts for all sessions. Some Nepali health insurance providers partially cover psychotherapy — check your policy or ask us to assist.' },
  { q: 'Do you offer student discounts?', a: 'Yes. Students with a valid student ID receive 20% off single sessions. This cannot be combined with the sliding scale programme.' },
  { q: 'How does the sliding scale application work?', a: 'Submit a brief financial hardship application via our portal. Our team reviews applications within 3 business days. Approved clients select from available reduced-rate slots.' },
]

export default function PaymentEthicsPage() {
  const { navigate } = useRouter()
  const [activeTab, setActiveTab] = useState('Pricing')
  const [openFaq, setOpenFaq] = useState(null)

  const TABS = ['Pricing', 'Billing & FAQ', 'Ethics & Legal']

  return (
    <div className="page-wrapper" style={{ background: 'var(--off-white)' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0f3460 0%, #1a5276 40%, #2980b9 100%)',
        padding: '5rem 4rem 4rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(93,173,226,0.2) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 620 }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>🔒 Payments & Ethics</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
            Transparent Pricing,<br />Ethical Care
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: 480 }}>
            We believe quality mental healthcare should be accessible and honest. No hidden fees, no surprises — just clear pricing and unwavering ethical standards.
          </p>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--blue-pale)', padding: '0 4rem', display: 'flex', gap: 0 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            padding: '1rem 1.75rem', border: 'none', background: 'none',
            fontFamily: 'var(--font-body)', fontSize: '0.88rem',
            fontWeight: activeTab === t ? 700 : 500,
            color: activeTab === t ? 'var(--sky)' : 'var(--text-light)',
            borderBottom: activeTab === t ? '2.5px solid var(--sky)' : '2.5px solid transparent',
            cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
          }}>{t}</button>
        ))}
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3.5rem 4rem' }}>

        {/* ─── PRICING ─── */}
        {activeTab === 'Pricing' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--blue-deep)', marginBottom: '0.5rem' }}>Session Fees</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-light)' }}>All prices in Nepalese Rupees (NPR). Includes GST where applicable.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              {PLANS.map((plan, i) => (
                <div key={i} style={{
                  borderRadius: 20, padding: '2rem',
                  background: plan.popular ? plan.color : 'var(--white)',
                  border: plan.popular ? 'none' : '1px solid var(--blue-pale)',
                  boxShadow: plan.popular ? '0 16px 48px rgba(15,52,96,0.25)' : '0 2px 12px rgba(15,52,96,0.06)',
                  position: 'relative', overflow: 'hidden',
                  transform: plan.popular ? 'scale(1.03)' : 'scale(1)',
                }}>
                  {plan.popular && (
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '0.68rem', fontWeight: 800, padding: '3px 10px', borderRadius: 100, letterSpacing: '0.06em' }}>
                      MOST POPULAR
                    </div>
                  )}
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: plan.popular ? 'rgba(255,255,255,0.85)' : 'var(--text-mid)', marginBottom: '0.5rem' }}>{plan.name}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: plan.popular ? 'white' : 'var(--blue-deep)', marginBottom: '0.2rem', fontWeight: 800 }}>{plan.price}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: plan.popular ? 'rgba(255,255,255,0.65)' : 'var(--text-light)', marginBottom: '1.5rem' }}>{plan.priceNote}</div>
                  <div style={{ borderTop: `1px solid ${plan.popular ? 'rgba(255,255,255,0.2)' : 'var(--blue-pale)'}`, paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                    {plan.features.map((f, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                        <span style={{ color: plan.popular ? 'rgba(255,255,255,0.8)' : 'var(--sky)', fontSize: '0.8rem' }}>✓</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: plan.popular ? 'rgba(255,255,255,0.85)' : 'var(--text-mid)' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate('/book')}
                    style={{
                      width: '100%', padding: '0.8rem', borderRadius: 10, border: 'none', cursor: 'pointer',
                      background: plan.popular ? 'white' : 'linear-gradient(135deg, #0f3460, #2980b9)',
                      color: plan.popular ? '#0f3460' : 'white',
                      fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 700,
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => e.target.style.opacity = '0.88'}
                    onMouseLeave={e => e.target.style.opacity = '1'}
                  >
                    {plan.cta} →
                  </button>
                </div>
              ))}
            </div>

            {/* Payment methods */}
            <div style={{ background: 'var(--white)', borderRadius: 16, padding: '2rem', border: '1px solid var(--blue-pale)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--blue-deep)', marginBottom: '1rem' }}>Accepted Payment Methods</div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {['💚 eSewa', '🟣 Khalti', '🏦 Bank Transfer', '💳 Card (Online)', '💵 Cash (Office)'].map((m, i) => (
                  <div key={i} style={{ padding: '0.5rem 1.1rem', borderRadius: 10, background: 'var(--off-white)', border: '1px solid var(--blue-pale)', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-mid)' }}>{m}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── BILLING FAQ ─── */}
        {activeTab === 'Billing & FAQ' && (
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--blue-deep)', marginBottom: '1.75rem' }}>Billing & Payment Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {BILLING_FAQS.map((faq, i) => (
                <div key={i} style={{ background: 'var(--white)', borderRadius: 12, border: `1px solid ${openFaq === i ? '#2980b9' : 'var(--blue-pale)'}`, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.1rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
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
            <div style={{ marginTop: '2.5rem', background: 'var(--sky-light)', borderRadius: 14, padding: '1.5rem', border: '1px solid var(--blue-pale)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.86rem', color: 'var(--blue-deep)', lineHeight: 1.65, margin: 0 }}>
                💬 <strong>Still have questions?</strong> Our billing team is available Mon–Fri 9 AM–5 PM. Email <strong>billing@pujasamargi.com.np</strong> or call our reception.
              </p>
            </div>
          </div>
        )}

        {/* ─── ETHICS & LEGAL ─── */}
        {activeTab === 'Ethics & Legal' && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--blue-deep)', marginBottom: '0.5rem' }}>Our Ethical Commitments</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-light)', marginBottom: '2.5rem', maxWidth: 600 }}>
              We hold ourselves to the highest professional and ethical standards. Below are the core principles that guide every interaction at Puja Samargi.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              {ETHICS.map((e, i) => (
                <div key={i} style={{ background: 'var(--white)', borderRadius: 16, padding: '1.75rem', border: '1px solid var(--blue-pale)' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: 'var(--sky-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: '1rem' }}>{e.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--blue-deep)', marginBottom: '0.6rem' }}>{e.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: 'var(--text-mid)', lineHeight: 1.7, margin: 0 }}>{e.body}</p>
                </div>
              ))}
            </div>

            {/* Legal documents */}
            <div style={{ background: 'var(--white)', borderRadius: 16, padding: '2rem', border: '1px solid var(--blue-pale)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--blue-deep)', marginBottom: '1.25rem' }}>Legal Documents</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { doc: 'Privacy Policy', updated: 'Last updated Jan 2025', icon: '📄' },
                  { doc: 'Terms of Service', updated: 'Last updated Jan 2025', icon: '📋' },
                  { doc: 'Informed Consent Form', updated: 'Last updated Mar 2025', icon: '✍️' },
                  { doc: 'Data Processing Agreement', updated: 'Last updated Jan 2025', icon: '🔒' },
                  { doc: 'Therapist Code of Conduct', updated: 'Last updated Feb 2025', icon: '⚖️' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', borderRadius: 10, background: 'var(--off-white)', border: '1px solid var(--blue-pale)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                      <div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.86rem', fontWeight: 700, color: 'var(--blue-deep)' }}>{item.doc}</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-light)' }}>{item.updated}</div>
                      </div>
                    </div>
                    <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.3rem 0.85rem' }}>View PDF</button>
                  </div>
                ))}
              </div>
            </div>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-light)', lineHeight: 1.6, marginTop: '2rem' }}>
              Puja Samargi Mental Wellness Center is registered under the Companies Act 2006 of Nepal. Company Registration No. XXXXX. All therapists are licensed and regulated by the Nepal Health Professional Council. For regulatory queries, contact <strong>ethics@pujasamargi.com.np</strong>.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}