import { useState } from 'react'
import { useRouter } from '../context/RouterContext'

const ANALYSES = [
  {
    category: 'Global Politics',
    icon: '🌍',
    color: 'var(--blue-mist)',
    title: 'Why Populism Keeps Rising: A Social Psychology Lens',
    date: 'Jun 2025',
    readTime: '6 min',
    excerpt: 'Social identity theory, in-group favoritism, and threat perception explain the surge of populist movements across democracies. When economic anxiety activates tribal psychology, charismatic leaders offering simple narratives gain outsized power.',
    concepts: ['Social Identity Theory', 'Scapegoating', 'Fear Appeals', 'Cognitive Simplification'],
  },
  {
    category: 'Social Media',
    icon: '📱',
    color: 'var(--sky-light)',
    title: 'Doom-Scrolling and the Negativity Bias of the Human Brain',
    date: 'May 2025',
    readTime: '5 min',
    excerpt: 'Our brains evolved to prioritize threat detection. Social media algorithms exploit negativity bias, intermittent reinforcement, and FOMO to create compulsive usage patterns that mirror behavioral addiction.',
    concepts: ['Negativity Bias', 'Intermittent Reinforcement', 'Variable Reward Schedules', 'FOMO'],
  },
  {
    category: 'Climate & Society',
    icon: '🌱',
    color: 'var(--green-mist)',
    title: 'Climate Grief and Eco-Anxiety: The New Existential Crisis',
    date: 'Apr 2025',
    readTime: '7 min',
    excerpt: 'Climate psychology identifies a spectrum of responses — from eco-anxiety to ecological grief. Solastalgia (distress caused by environmental change to one\'s home) is emerging as a new clinical concern globally.',
    concepts: ['Solastalgia', 'Existential Anxiety', 'Denial as Defense', 'Ecological Grief'],
  },
  {
    category: 'Post-Pandemic',
    icon: '😷',
    color: 'var(--earth-cream)',
    title: 'Collective Trauma: How COVID-19 Rewired Social Psychology',
    date: 'Mar 2025',
    readTime: '8 min',
    excerpt: 'Collective trauma operates differently from individual PTSD. COVID exposed fundamental tensions between individualism and collectivism, between scientific authority and epistemic mistrust — reshaping social contracts globally.',
    concepts: ['Collective Trauma', 'Moral Injury', 'Trust in Institutions', 'Intergenerational Trauma'],
  },
  {
    category: 'Nepal',
    icon: '🏔',
    color: 'var(--blue-mist)',
    title: 'Earthquake Trauma and Resilience: Lessons from Gorkha',
    date: 'Feb 2025',
    readTime: '6 min',
    excerpt: 'A decade after the 2015 earthquake, Nepal offers a unique study in post-disaster collective recovery, the role of cultural rituals in grief processing, and how community bonding moderates PTSD outcomes.',
    concepts: ['Post-Traumatic Growth', 'Cultural Healing', 'Community Resilience', 'Survivor Guilt'],
  },
  {
    category: 'Conflict & War',
    icon: '⚖️',
    color: 'var(--blue-mist)',
    title: 'Moral Disengagement: How Ordinary People Commit Extraordinary Harm',
    date: 'Jan 2025',
    readTime: '9 min',
    excerpt: 'Bandura\'s moral disengagement theory explains how individuals distance themselves from the human consequences of their actions — through dehumanization, diffusion of responsibility, and euphemistic labeling — in war and beyond.',
    concepts: ['Moral Disengagement', 'Dehumanization', 'Obedience to Authority', 'Bystander Effect'],
  },
]

const CONCEPTS = [
  { term: 'Cognitive Dissonance', def: 'The mental discomfort experienced when holding two contradictory beliefs simultaneously — and the unconscious drive to resolve it, often by distorting reality.' },
  { term: 'Fundamental Attribution Error', def: 'The tendency to overestimate personal causes and underestimate situational factors when explaining others\' behavior — the root of much social judgment.' },
  { term: 'Groupthink', def: 'The deterioration of rational decision-making within a highly cohesive group, driven by conformity pressure and collective rationalization of poor choices.' },
  { term: 'Learned Helplessness', def: 'A state in which an organism repeatedly subjected to uncontrollable adversity stops attempting to escape — applicable to systemic oppression, chronic poverty, and institutional barriers.' },
]

export default function PsychologicalViewPage() {
  const { navigate } = useRouter()
  // eslint-disable-next-line no-unused-vars
  const [active, setActive] = useState(null)

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(145deg, #0c1e2b 0%, #1a3a4a 50%, #1a2e1a 100%)',
        padding: '5rem 6rem 3rem',
        position: 'relative',
        overflow: 'hidden',
        color: 'white',
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-tag" style={{ color: 'rgba(176,212,232,0.7)' }}>Psychological View</span>
          <h1 className="section-title" style={{ color: 'white', fontSize: 'clamp(2rem,4vw,3rem)', marginBottom: '1rem' }}>
            The World, Seen Through <em style={{ color: 'var(--sky)' }}>Psychology</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.55)', maxWidth: 580, lineHeight: 1.8, marginBottom: '2rem' }}>
            Events do not happen in a vacuum. Behind every social crisis, political upheaval, and cultural shift lie deep psychological forces — fear, identity, trauma, and power. This is our analysis.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-primary" onClick={() => navigate('/research')}>Our Research →</button>
            <button className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.8)' }} onClick={() => navigate('/blog')}>Blog & Articles</button>
          </div>
        </div>
        {/* Decorative circles */}
        {[280, 200, 120].map((r, i) => (
          <div key={i} style={{ position: 'absolute', right: -r/2, top: '50%', transform: 'translateY(-50%)', width: r*2, height: r*2, borderRadius: '50%', border: `1px solid rgba(0,191,255,${0.06 + i*0.02})`, pointerEvents: 'none' }} />
        ))}
      </div>

      {/* Articles grid */}
      <div className="section" style={{ background: 'var(--off-white)', paddingTop: '3rem' }}>
        <div className="section-header">
          <div>
            <span className="section-tag">Analyses</span>
            <h2 className="section-title">World Events, <em>Decoded</em></h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
          {ANALYSES.map((a, i) => (
            <div key={i} style={{
              background: 'var(--white)', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
              border: '1px solid var(--blue-pale)', boxShadow: 'var(--shadow-soft)',
              cursor: 'pointer', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-mid)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-soft)' }}
            >
              <div style={{ background: a.color, padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '2rem' }}>{a.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--blue-mid)' }}>{a.category}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-light)' }}>{a.date} · {a.readTime} read</div>
                </div>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--blue-deep)', marginBottom: '0.6rem', lineHeight: 1.35 }}>{a.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-light)', lineHeight: 1.65, marginBottom: '0.75rem' }}>{a.excerpt}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {a.concepts.map((c, j) => <span key={j} className="tag" style={{ fontSize: '0.65rem' }}>{c}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Concept glossary */}
      <div className="section" style={{ background: 'var(--green-deep)', color: 'white' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-tag" style={{ color: 'var(--green-pale)' }}>Psychology 101</span>
          <h2 className="section-title" style={{ color: 'white' }}>Key Concepts to <em>Understand the World</em></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.25rem' }}>
          {CONCEPTS.map((c, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.07)', borderRadius: 'var(--radius-md)',
              padding: '1.5rem', border: '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer', transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
            >
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--sky)', marginBottom: '0.5rem' }}>{c.term}</h4>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>{c.def}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}