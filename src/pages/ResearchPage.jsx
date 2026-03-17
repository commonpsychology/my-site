import { useState, useMemo } from 'react'
// eslint-disable-next-line no-unused-vars
import { useRouter } from '../context/RouterContext'

const RESEARCH_TYPES = ['All', 'Clinical Study', 'Meta-Analysis', 'Case Report', 'Review Article', 'Policy Brief']

const PAPERS = [
  { id: 1, title: 'Prevalence of Depression and Anxiety Among University Students in Kathmandu: A Cross-Sectional Study', authors: ['Shrestha, A.', 'Karki, R.', 'Rai, S.'], journal: 'Nepal Journal of Medical Sciences', year: 2024, volume: '13(2)', pages: '45–54', type: 'Clinical Study', doi: '10.3126/njms.2024.001', abstract: 'This cross-sectional study examined the prevalence of depression and anxiety symptoms among 824 university students in Kathmandu Valley. Using the PHQ-9 and GAD-7 scales, 34.2% screened positive for moderate-to-severe depression and 28.7% for anxiety. Academic pressure and social isolation were the strongest predictors.', keywords: ['depression', 'anxiety', 'university students', 'Nepal', 'PHQ-9'], citations: 47, downloads: 1230, open: true },
  { id: 2, title: 'Effectiveness of Teletherapy for Depression in Low- and Middle-Income Countries: A Systematic Review', authors: ['Rai, S.', 'Thapa, P.'], journal: 'Lancet Digital Health (South Asia Supplement)', year: 2024, volume: '6(1)', pages: 'e12–e21', type: 'Meta-Analysis', doi: '10.1016/S2589-7500(24)00012-3', abstract: 'A systematic review of 18 RCTs (n=3,412) examining the efficacy of video-based psychotherapy in LMICs. Results demonstrated significant reductions in PHQ-9 scores (SMD −0.68, 95% CI −0.89 to −0.47). Teletherapy was non-inferior to in-person delivery for mild-to-moderate depression.', keywords: ['teletherapy', 'depression', 'LMICs', 'RCT', 'meta-analysis'], citations: 83, downloads: 3540, open: true },
  { id: 3, title: 'Cultural Adaptation of CBT for Nepali Populations: A Pilot Feasibility Study', authors: ['Shrestha, A.', 'Karki, R.'], journal: 'Asian Journal of Psychiatry', year: 2023, volume: '89', pages: '103765', type: 'Clinical Study', doi: '10.1016/j.ajp.2023.103765', abstract: 'Standard CBT protocols were adapted for cultural competency in a Nepali context, incorporating concepts of "mann ko dukha" (mental suffering) and family-centered coping. The 12-session adapted protocol showed significantly higher retention rates (82% vs 61%) compared to standard CBT.', keywords: ['CBT', 'cultural adaptation', 'Nepal', 'psychotherapy'], citations: 31, downloads: 890, open: false },
  { id: 4, title: 'Mental Health Stigma in Nepali Rural Communities: Barriers to Help-Seeking Behaviour', authors: ['Thapa, P.', 'Rai, S.', 'Shrestha, A.'], journal: 'Global Mental Health', year: 2023, volume: '10', pages: 'e58', type: 'Review Article', doi: '10.1017/gmh.2023.48', abstract: 'Qualitative data from 12 focus groups across 4 districts reveals that spiritual attribution of mental illness, fear of social exclusion, and lack of confidentiality in small communities are the primary barriers to help-seeking in rural Nepal.', keywords: ['stigma', 'rural', 'help-seeking', 'barriers', 'qualitative'], citations: 65, downloads: 2100, open: true },
  { id: 5, title: 'Post-Earthquake PTSD Trajectories in Sindhupalchok: A 5-Year Longitudinal Follow-Up', authors: ['Karki, R.', 'Shrestha, A.'], journal: 'Psychological Medicine', year: 2023, volume: '53(14)', pages: '6891–6901', type: 'Clinical Study', doi: '10.1017/S0033291722003574', abstract: 'Five-year follow-up of 312 survivors of the 2015 Gorkha earthquake in Sindhupalchok district. While PTSD rates declined from 38% to 14%, complex grief and somatic symptoms persisted. Community-based psychosocial support programmes were associated with better long-term outcomes.', keywords: ['PTSD', 'earthquake', 'Nepal', 'longitudinal', 'trauma'], citations: 92, downloads: 4210, open: true },
  { id: 6, title: 'Integrating Mental Health Into Nepal\'s Primary Healthcare System: Policy Recommendations', authors: ['Rai, S.', 'Thapa, P.', 'Karki, R.'], journal: 'WHO South-East Asia Journal of Public Health', year: 2022, volume: '11(2)', pages: '78–86', type: 'Policy Brief', doi: '10.4103/2224-3151.360900', abstract: 'Drawing on implementation science and stakeholder interviews across 3 provinces, this brief outlines seven actionable recommendations for integrating mental health screening and basic psychosocial support into Nepal\'s existing primary health care infrastructure at ward-level health posts.', keywords: ['policy', 'primary care', 'integration', 'Nepal', 'health system'], citations: 28, downloads: 1560, open: true },
]

const STATS = [
  { label: 'Publications', val: '24+', icon: '📄' },
  { label: 'Citations', val: '1,200+', icon: '🔗' },
  { label: 'Research Partners', val: '8', icon: '🤝' },
  { label: 'Participants (total)', val: '12,000+', icon: '👥' },
]

/* ── Shared palette ── */
const C = {
  skyBright:  '#00BFFF',
  skyMid:     '#009FD4',
  skyDeep:    '#007BA8',
  skyFaint:   '#E0F7FF',
  skyFainter: '#F0FBFF',
  skyGhost:   '#F8FEFF',
  white:      '#ffffff',
  mint:       '#e8f3ee',
  textDark:   '#1a3a4a',
  textMid:    '#2e6080',
  textLight:  '#7a9aaa',
  border:     '#b0d4e8',
  borderFaint:'#daeef8',
}

const heroGrad    = `linear-gradient(135deg, #0f2c3f 0%, ${C.skyDeep} 40%, ${C.skyMid} 80%, ${C.skyBright} 100%)`
const sectionGrad = `linear-gradient(135deg, ${C.skyFainter} 0%, ${C.mint} 60%, ${C.skyFaint} 100%)`
const btnGrad     = `linear-gradient(135deg, ${C.skyDeep} 0%, ${C.skyBright} 100%)`

const TYPE_COLORS = {
  'Clinical Study':  { bg: C.skyFaint,   text: C.skyMid  },
  'Meta-Analysis':   { bg: '#f0e6ff',    text: '#6c3fc5' },
  'Case Report':     { bg: '#fff3e0',    text: '#e65100' },
  'Review Article':  { bg: '#e8f3ee',    text: '#2d4a3e' },
  'Policy Brief':    { bg: '#fce4ec',    text: '#c62828' },
}

function PaperCard({ paper }) {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const typeColor = TYPE_COLORS[paper.type] || { bg: C.skyFaint, text: C.skyMid }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.white, borderRadius: 16,
        border: `1px solid ${hovered ? C.skyBright : C.borderFaint}`,
        padding: '1.75rem',
        boxShadow: hovered ? `0 8px 28px rgba(0,191,255,0.12)` : `0 2px 12px rgba(0,191,255,0.04)`,
        transition: 'all 0.25s ease',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '3px 10px', borderRadius: 100, background: typeColor.bg, color: typeColor.text, whiteSpace: 'nowrap' }}>
          {paper.type}
        </span>
        <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: paper.open ? C.mint : '#f5ede0', color: paper.open ? '#2d4a3e' : '#6b4f35' }}>
          {paper.open ? '🔓 Open Access' : '🔒 Subscription'}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: C.textLight }}>{paper.year}</span>
      </div>

      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: C.textDark, lineHeight: 1.4, marginBottom: '0.5rem' }}>
        {paper.title}
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: C.textLight, marginBottom: '0.25rem' }}>
        {paper.authors.join(', ')}
      </p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: C.skyMid, fontStyle: 'italic', marginBottom: '1rem' }}>
        {paper.journal}, Vol. {paper.volume}, pp. {paper.pages}
      </p>

      {expanded && (
        <div style={{ background: sectionGrad, borderRadius: 10, padding: '1rem', marginBottom: '1rem', borderLeft: `3px solid ${C.skyBright}` }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: C.textMid, lineHeight: 1.7, margin: 0 }}>
            {paper.abstract}
          </p>
        </div>
      )}

      {expanded && (
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {paper.keywords.map(k => (
            <span key={k} style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 100, background: C.skyFaint, color: C.skyMid, fontWeight: 600 }}>
              #{k}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '1.25rem' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: C.textLight }}>🔗 {paper.citations} citations</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: C.textLight }}>⬇️ {paper.downloads.toLocaleString()} downloads</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setExpanded(e => !e)}
            style={{ padding: '0.35rem 0.9rem', borderRadius: 8, border: `1.5px solid ${C.skyBright}`, background: 'transparent', color: C.skyMid, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = C.skyFaint}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {expanded ? 'Hide Abstract' : 'View Abstract'}
          </button>
          <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '0.35rem 0.9rem', borderRadius: 8, border: 'none', background: btnGrad, color: C.white, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', boxShadow: `0 3px 12px rgba(0,191,255,0.3)` }}>
              DOI →
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ResearchPage() {
  const [activeType, setActiveType] = useState('All')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('year')

  const filtered = useMemo(() => {
    let list = PAPERS
    if (activeType !== 'All') list = list.filter(p => p.type === activeType)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.authors.some(a => a.toLowerCase().includes(q)) ||
        p.keywords.some(k => k.includes(q)) ||
        p.abstract.toLowerCase().includes(q)
      )
    }
    return [...list].sort((a, b) => {
      if (sortBy === 'year') return b.year - a.year
      if (sortBy === 'citations') return b.citations - a.citations
      if (sortBy === 'downloads') return b.downloads - a.downloads
      return 0
    })
  }, [activeType, search, sortBy])

  return (
    <div className="page-wrapper" style={{ background: C.skyGhost }}>

      {/* ── Hero ── */}
      <div style={{ background: heroGrad, padding: '5rem 4rem 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: '40%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 100, padding: '0.3rem 0.9rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' }}>🔬 Research & Publications</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
            Evidence-Based<br />Mental Health Research
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, maxWidth: 520, marginBottom: '2rem' }}>
            Peer-reviewed studies, meta-analyses, and policy briefs produced by the Puja Samargi clinical team — advancing the science of mental health in Nepal and South Asia.
          </p>
          {/* Stats row */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '0.15rem' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'white', fontWeight: 700 }}>{s.val}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 4rem' }}>

        {/* Toolbar */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search title, author, keyword…"
            style={{
              flex: 1, minWidth: 220, padding: '0.7rem 1rem',
              border: `1.5px solid ${C.borderFaint}`, borderRadius: 10,
              fontFamily: 'var(--font-body)', fontSize: '0.88rem',
              background: C.white, outline: 'none', color: C.textDark,
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = C.skyBright}
            onBlur={e => e.target.style.borderColor = C.borderFaint}
          />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            style={{ padding: '0.7rem 1rem', border: `1.5px solid ${C.borderFaint}`, borderRadius: 10, fontFamily: 'var(--font-body)', fontSize: '0.85rem', background: C.white, color: C.textMid, cursor: 'pointer', outline: 'none' }}>
            <option value="year">Sort: Newest</option>
            <option value="citations">Sort: Most Cited</option>
            <option value="downloads">Sort: Most Downloaded</option>
          </select>
        </div>

        {/* Type filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          {RESEARCH_TYPES.map(t => (
            <button key={t} onClick={() => setActiveType(t)}
              style={{
                padding: '0.4rem 1rem', borderRadius: 100,
                border: `1.5px solid ${activeType === t ? C.skyBright : C.borderFaint}`,
                background: activeType === t ? btnGrad : C.white,
                color: activeType === t ? C.white : C.textMid,
                fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: activeType === t ? `0 4px 16px rgba(0,191,255,0.3)` : 'none',
              }}>{t}</button>
          ))}
        </div>

        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: C.textLight, marginBottom: '1.5rem' }}>
          {filtered.length} publication{filtered.length !== 1 ? 's' : ''} found
        </div>

        {/* Papers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: C.textLight }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔬</div>
              <p style={{ fontFamily: 'var(--font-body)' }}>No publications match your search.</p>
            </div>
          ) : (
            filtered.map(p => <PaperCard key={p.id} paper={p} />)
          )}
        </div>

        {/* Collaboration CTA */}
        <div style={{
          background: heroGrad, borderRadius: 20, padding: '3rem',
          display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap',
          boxShadow: `0 16px 48px rgba(0,191,255,0.2)`,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
          <div style={{ flex: 1, minWidth: 260, position: 'relative' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'white', marginBottom: '0.75rem' }}>Collaborate With Us</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.65 }}>
              We welcome research partnerships with universities, NGOs, and international health organisations. If you're working in mental health in Nepal or South Asia, let's connect.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', position: 'relative' }}>
            <button style={{ padding: '0.6rem 1.5rem', borderRadius: 10, border: 'none', background: C.white, color: C.skyDeep, fontFamily: 'var(--font-body)', fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Submit a Paper
            </button>
            <button style={{ padding: '0.6rem 1.5rem', borderRadius: 10, border: '1.5px solid rgba(255,255,255,0.35)', background: 'transparent', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 600, cursor: 'pointer' }}>
              Research Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}