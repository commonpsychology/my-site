import { useRouter } from '../context/RouterContext'

const C = {
  skyBright: '#00BFFF', skyMid: '#009FD4', skyDeep: '#007BA8',
  skyFaint: '#E0F7FF', skyFainter: '#F0FBFF', skyGhost: '#F8FEFF',
  white: '#ffffff', mint: '#e8f3ee',
  textDark: '#1a3a4a', textMid: '#2e6080', textLight: '#7a9aaa',
  border: '#b0d4e8', borderFaint: '#daeef8',
}
const btnGrad  = `linear-gradient(135deg,#007BA8 0%,#00BFFF 100%)`
const heroGrad = `linear-gradient(135deg,#007BA8 0%,#009FD4 45%,#00BFFF 85%,#22d3ee 100%)`
const sectionGrad = `linear-gradient(135deg,${C.skyFainter} 0%,${C.mint} 60%,${C.skyFaint} 100%)`

const sections = [
  {
    icon: '🔒', title: 'Data We Collect',
    body: `We collect only the information necessary to provide and improve our mental health services. This includes your name, contact details, session preferences, and payment references. We do not collect or store sensitive financial credentials such as card numbers or banking passwords.`,
  },
  {
    icon: '💳', title: 'Payment Processing',
    body: `All payments are processed through trusted Nepali platforms — eSewa, Khalti, Fonepay, and ConnectIPS. PsycheCare Nepal does not store your payment credentials. We only record a payment reference number to verify your transaction. Cash-on-delivery orders are confirmed by phone.`,
  },
  {
    icon: '🏥', title: 'Confidentiality of Sessions',
    body: `All therapy sessions and their contents are strictly confidential. Session notes are shared only with your assigned therapist. We do not share clinical information with third parties without your explicit written consent, except where required by law (e.g. risk of harm to self or others).`,
  },
  {
    icon: '📂', title: 'How We Use Your Data',
    body: `Your data is used exclusively to: schedule and manage therapy appointments, send appointment reminders, process payments and refunds, and improve service quality. We do not sell, rent, or share personal data with advertisers or third parties for commercial purposes.`,
  },
  {
    icon: '🛡️', title: 'Data Security',
    body: `All data is encrypted in transit (TLS 1.3) and at rest. Access to personal data is restricted to authorised staff only. We conduct regular security reviews and follow Nepal's Electronic Transactions Act (2063) and relevant data protection guidelines.`,
  },
  {
    icon: '🔄', title: 'Refund Policy',
    body: `Sessions cancelled at least 24 hours in advance are eligible for a full refund. Late cancellations (under 24 hrs) may incur a 50% fee. Store products can be returned within 7 days if unused and in original condition. Refunds are processed to the original payment method within 5–7 business days.`,
  },
  {
    icon: '✉️', title: 'Your Rights',
    body: `You have the right to access, correct, or delete your personal data at any time. To submit a data request, email us at privacy@psychecare.com.np. We will respond within 7 business days. You may also withdraw consent for marketing communications at any time.`,
  },
  {
    icon: '📅', title: 'Policy Updates',
    body: `This policy was last updated in March 2025. We will notify registered users of significant changes via email or in-app notification at least 14 days before they take effect.`,
  },
]

function Section({ icon, title, body }) {
  return (
    <div style={{
      background: C.white, borderRadius: 16,
      border: `1.5px solid ${C.borderFaint}`,
      padding: '1.5rem 1.75rem',
      boxShadow: `0 2px 12px rgba(0,191,255,0.05)`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: sectionGrad, border: `1px solid ${C.borderFaint}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
          {icon}
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: C.textDark, margin: 0 }}>
          {title}
        </h3>
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: C.textMid, lineHeight: 1.8, margin: 0 }}>
        {body}
      </p>
    </div>
  )
}

export default function PaymentInfoPage() {
  const { navigate } = useRouter()

  return (
    <div className="page-wrapper" style={{ background: C.skyGhost }}>

      {/* Hero */}
      <div style={{ background: heroGrad, padding: '4.5rem 4rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          <button
            onClick={() => navigate('/account')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)', borderRadius: 100, padding: '0.3rem 1rem', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', marginBottom: '1.25rem' }}
          >
            ← Back to Account
          </button>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 100, padding: '0.3rem 0.9rem', marginBottom: '0.9rem', marginLeft: '0.75rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' }}>🔒 Privacy & Payments</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'white', marginBottom: '0.5rem', lineHeight: 1.2 }}>
            Privacy Policy & Payment Info
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>
            How we protect your data, handle payments, and respect your confidentiality.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '2.5rem auto', padding: '0 1.5rem 5rem' }}>

        {/* Quick summary banner */}
        <div style={{ background: btnGrad, borderRadius: 16, padding: '1.25rem 1.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', boxShadow: '0 6px 24px rgba(0,191,255,0.25)' }}>
          {['No ads, ever', 'End-to-end encrypted', 'Never sold to third parties', 'Nepali platforms only'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: 'white', fontWeight: 800 }}>✓</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {sections.map((s, i) => <Section key={i} {...s} />)}
        </div>

        {/* Contact footer */}
        <div style={{ marginTop: '2rem', background: C.white, borderRadius: 16, border: `1.5px solid ${C.borderFaint}`, padding: '1.5rem 1.75rem', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: C.textDark, marginBottom: '0.5rem' }}>Questions about your data?</div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: C.textMid, marginBottom: '1rem' }}>
            Contact our privacy team at <strong style={{ color: C.skyDeep }}>privacy@psychecare.com.np</strong> or call <strong style={{ color: C.skyDeep }}>+977 1-XXXXXXX</strong>
          </p>
          <button
            onClick={() => navigate('/account')}
            style={{ padding: '0.7rem 2rem', borderRadius: 10, border: 'none', background: btnGrad, color: 'white', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,191,255,0.28)' }}
          >
            Back to Account
          </button>
        </div>
      </div>
    </div>
  )
}