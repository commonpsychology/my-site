import { useRouter } from '../context/RouterContext'

const SKY_D  = '#0369a1'
const SKY    = '#0ea5e9'
const SKY_L  = '#e0f2fe'
const SLATE  = '#1e293b'
const SLATE_M = '#64748b'
const SLATE_L = '#94a3b8'
const BORDER = '#e2e8f0'
const BG     = '#f8fafc'
const WHITE  = '#ffffff'
const MINT   = '#10b981'
const MINT_L = '#d1fae5'

const heroGrad = `linear-gradient(135deg,${SKY_D} 0%,${SKY} 55%,#22d3ee 100%)`
const btnGrad  = `linear-gradient(135deg,${SKY_D} 0%,${SKY} 100%)`

const SECTIONS = [
  {
    icon: '🔒',
    title: 'Data We Collect',
    body: `We collect only the information necessary to provide and improve our mental health services. This includes your name, contact details, session preferences, and payment references. We do not collect or store sensitive financial credentials such as card numbers or banking passwords.`,
  },
  {
    icon: '💳',
    title: 'Payment Processing',
    body: `All payments are processed through trusted Nepali platforms — eSewa, Khalti, Fonepay, and ConnectIPS. PsycheCare Nepal does not store your payment credentials. We only record a payment reference number to verify your transaction. Cash-on-delivery orders are confirmed by phone.`,
  },
  {
    icon: '🏥',
    title: 'Confidentiality of Sessions',
    body: `All therapy sessions and their contents are strictly confidential. Session notes are shared only with your assigned therapist. We do not share clinical information with third parties without your explicit written consent, except where required by law (e.g. risk of harm to self or others).`,
  },
  {
    icon: '📂',
    title: 'How We Use Your Data',
    body: `Your data is used exclusively to schedule and manage therapy appointments, send appointment reminders, process payments and refunds, and improve service quality. We do not sell, rent, or share personal data with advertisers or third parties for commercial purposes.`,
  },
  {
    icon: '🛡️',
    title: 'Data Security',
    body: `All data is encrypted in transit (TLS 1.3) and at rest. Access to personal data is restricted to authorised staff only. We conduct regular security reviews and follow Nepal's Electronic Transactions Act (2063) and relevant data protection guidelines.`,
  },
  {
    icon: '🔄',
    title: 'Refund Policy',
    body: `Sessions cancelled at least 24 hours in advance are eligible for a full refund. Late cancellations (under 24 hrs) may incur a 50% fee. Store products can be returned within 7 days if unused and in original condition. Refunds are processed to the original payment method within 5–7 business days.`,
  },
  {
    icon: '✉️',
    title: 'Your Rights',
    body: `You have the right to access, correct, or delete your personal data at any time. To submit a data request, email us at privacy@psychecare.com.np. We will respond within 7 business days. You may also withdraw consent for marketing communications at any time.`,
  },
  {
    icon: '📅',
    title: 'Policy Updates',
    body: `This policy was last updated in March 2025. We will notify registered users of significant changes via email or in-app notification at least 14 days before they take effect.`,
  },
]

const COMMITMENTS = [
  { icon: '🚫', label: 'No ads, ever'               },
  { icon: '🔐', label: 'End-to-end encrypted'        },
  { icon: '🤝', label: 'Never sold to third parties' },
  { icon: '🇳🇵', label: 'Nepali platforms only'      },
]

export default function PrivacyPage() {
  const { navigate } = useRouter()

  return (
    <div className="page-wrapper" style={{ background: BG }}>

      {/* Hero */}
      <div style={{ background: heroGrad, padding: 'calc(72px + 2rem) 2rem 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: '10%', width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          {/* Back button */}
          <button
            onClick={() => navigate('/account')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.9)', borderRadius: 100, padding: '0.32rem 1rem', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', marginBottom: '1.5rem' }}
          >
            ← Back to Account
          </button>

          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 100, padding: '0.3rem 0.9rem', marginBottom: '1rem', marginLeft: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' }}>🛡️ Privacy & Data</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,2.5rem)', color: WHITE, marginBottom: '0.6rem', lineHeight: 1.15 }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: 520, marginBottom: '2rem' }}>
            How we protect your data, handle payments, and respect your confidentiality as a PsycheCare Nepal user.
          </p>

          {/* Commitment pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {COMMITMENTS.map((c, i) => (
              <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 100, padding: '0.3rem 0.85rem' }}>
                <span style={{ fontSize: '0.88rem' }}>{c.icon}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700, color: 'rgba(255,255,255,0.95)' }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Last updated banner */}
      <div style={{ background: MINT_L, borderBottom: `1px solid ${MINT}` }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0.65rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem' }}>📅</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#065f46', fontWeight: 600 }}>
            Last updated: March 2025 · Effective immediately for all users
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '2.5rem 2rem 6rem' }}>

        {/* Quick summary card */}
        <div style={{ background: btnGrad, borderRadius: 18, padding: '1.5rem 2rem', marginBottom: '2rem', boxShadow: '0 6px 28px rgba(3,105,161,0.22)' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.85rem' }}>In plain language</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {[
              { icon: '✓', text: 'We only collect what\'s needed to run your sessions' },
              { icon: '✓', text: 'Your therapy content is never shared or sold'       },
              { icon: '✓', text: 'You can delete your data at any time'               },
              { icon: '✓', text: 'Payments go through eSewa, Khalti, or Fonepay'     },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 800, color: WHITE, flexShrink: 0, marginTop: 1 }}>✓</div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.92)', lineHeight: 1.55 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Policy sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {SECTIONS.map((s, i) => (
            <div key={i} style={{ background: WHITE, borderRadius: 16, border: `1.5px solid ${BORDER}`, padding: '1.5rem 1.75rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.9rem' }}>
                {/* Numbered icon */}
                <div style={{ width: 40, height: 40, borderRadius: 12, background: SKY_L, border: `1.5px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 800, color: SLATE_L, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Section {i + 1}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: SLATE, margin: 0 }}>
                    {s.title}
                  </h3>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: SLATE_M, lineHeight: 1.82, margin: 0 }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* Contact + back footer */}
        <div style={{ marginTop: '2rem', background: WHITE, borderRadius: 18, border: `1.5px solid ${BORDER}`, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          <div style={{ background: `linear-gradient(135deg,${SKY_L},${MINT_L})`, padding: '1.25rem 1.75rem', borderBottom: `1px solid ${BORDER}` }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: SLATE, margin: 0 }}>Questions or Requests?</h3>
          </div>
          <div style={{ padding: '1.5rem 1.75rem' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.86rem', color: SLATE_M, lineHeight: 1.75, marginBottom: '1.25rem' }}>
              For data access, correction, or deletion requests — or any question about this policy — contact our privacy team:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {[
                { icon: '✉️', label: 'Email',   val: 'privacy@psychecare.com.np'  },
                { icon: '📞', label: 'Phone',   val: '+977 1-XXXXXXX'              },
                { icon: '🕐', label: 'Response', val: 'Within 7 business days'     },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.85rem', background: BG, borderRadius: 10, border: `1px solid ${BORDER}` }}>
                  <span style={{ fontSize: '1rem', flexShrink: 0 }}>{r.icon}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, color: SLATE_L, textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0, minWidth: 60 }}>{r.label}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 600, color: SKY_D }}>{r.val}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/account')}
              style={{ padding: '0.7rem 2rem', borderRadius: 10, border: 'none', background: btnGrad, color: WHITE, fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(3,105,161,0.25)' }}
            >
              ← Back to Account
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}