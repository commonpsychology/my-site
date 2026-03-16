import { useState } from 'react'
import { useRouter } from '../context/RouterContext'

const CATEGORIES = [
  {
    id: 'depressive', title: 'Depressive Disorders', icon: '🌧', color: '#6e90b8',
    disorders: [
      { name: 'Major Depressive Disorder (MDD)', severity: 'common',
        symptoms: ['Depressed mood most of the day, nearly every day','Markedly diminished interest or pleasure in all activities','Significant weight loss/gain or appetite change','Insomnia or hypersomnia nearly every day','Psychomotor agitation or retardation','Fatigue or loss of energy nearly every day','Feelings of worthlessness or excessive guilt','Diminished ability to think or concentrate','Recurrent thoughts of death or suicidal ideation'],
        threshold: '≥5 symptoms for ≥2 weeks; must include depressed mood or loss of interest',
        therapy: ['CBT (gold standard)','Behavioral Activation','Interpersonal Therapy (IPT)','EMDR (if trauma-related)','Group therapy'],
        medications: ['SSRIs: Sertraline, Escitalopram, Fluoxetine','SNRIs: Venlafaxine, Duloxetine','Bupropion','Mirtazapine (if insomnia)'],
        lifestyle: ['Regular aerobic exercise 30 min 3–5x/week','Consistent sleep schedule','Social connection','Sunlight exposure','Limit alcohol','Journaling & gratitude practice'],
      },
      { name: 'Persistent Depressive Disorder (Dysthymia)', severity: 'common',
        symptoms: ['Depressed mood for most of the day, ≥2 years','Poor appetite or overeating','Insomnia or hypersomnia','Low energy or fatigue','Low self-esteem','Poor concentration or indecisiveness','Feelings of hopelessness'],
        threshold: '≥2 symptoms + depressed mood for ≥2 years',
        therapy: ['CBASP (specifically for dysthymia)','CBT','Interpersonal therapy','Schema therapy'],
        medications: ['SSRIs/SNRIs — combined with therapy most effective'],
        lifestyle: ['Exercise','Social engagement','Purpose and meaning activities','Self-compassion practices'],
      },
    ],
  },
  {
    id: 'anxiety', title: 'Anxiety Disorders', icon: '😰', color: '#3fb950',
    disorders: [
      { name: 'Generalized Anxiety Disorder (GAD)', severity: 'common',
        symptoms: ['Excessive anxiety and worry about multiple events','Difficulty controlling the worry','Restlessness or feeling keyed up','Being easily fatigued','Difficulty concentrating or mind going blank','Irritability','Muscle tension','Sleep disturbance — difficulty falling or staying asleep','Symptoms for ≥6 months'],
        threshold: '≥3 symptoms (≥1 for children) + worry for ≥6 months',
        therapy: ['CBT (most evidence-based)','Acceptance and Commitment Therapy (ACT)','Mindfulness-Based Stress Reduction (MBSR)','Relaxation training'],
        medications: ['SSRIs: Escitalopram, Paroxetine','SNRIs: Venlafaxine, Duloxetine','Buspirone','Pregabalin'],
        lifestyle: ['Diaphragmatic breathing','Progressive muscle relaxation','Limit caffeine and alcohol','Regular exercise','Worry time scheduling','Mindfulness apps'],
      },
      { name: 'Panic Disorder', severity: 'moderate',
        symptoms: ['Recurrent unexpected panic attacks','Heart palpitations or racing heart','Sweating','Trembling or shaking','Shortness of breath','Chest pain or discomfort','Nausea or abdominal distress','Dizziness or lightheadedness','Derealization or depersonalization','Fear of losing control or dying','≥1 month of persistent concern about future attacks'],
        threshold: 'Recurrent unexpected panic attacks + ≥1 month of concern or behavior change',
        therapy: ['CBT with interoceptive exposure (gold standard)','Breathing retraining'],
        medications: ['SSRIs: Sertraline, Paroxetine','SNRIs: Venlafaxine'],
        lifestyle: ['Avoid caffeine','Box breathing technique','Gradual exposure to feared situations'],
      },
      { name: 'Social Anxiety Disorder', severity: 'common',
        symptoms: ['Marked fear of social situations where scrutinized','Fear of acting in a humiliating or embarrassing way','Social situations almost always provoke fear','Situations are avoided or endured with intense fear','Fear is out of proportion to actual threat','Persistent, typically ≥6 months'],
        threshold: 'Marked fear of social situations causing avoidance/distress for ≥6 months',
        therapy: ['CBT with social exposure','Social skills training','Group CBT'],
        medications: ['SSRIs: Paroxetine, Sertraline','Beta-blockers for performance anxiety (Propranolol)'],
        lifestyle: ['Gradual exposure to feared social situations','Mindfulness','Challenge negative self-predictions'],
      },
    ],
  },
  {
    id: 'ocd', title: 'OCD & Related Disorders', icon: '🔄', color: '#f0883e',
    disorders: [
      { name: 'Obsessive-Compulsive Disorder (OCD)', severity: 'moderate',
        symptoms: ['Recurrent, persistent, intrusive, unwanted thoughts or urges (obsessions)','Obsessions cause marked anxiety or distress','Attempts to suppress or neutralize obsessions','Repetitive behaviors (hand-washing, ordering, checking) — compulsions','Compulsions performed in response to obsession or rigid rules','Obsessions/compulsions are time-consuming (>1 hr/day)','Common themes: contamination, symmetry, forbidden thoughts, harm'],
        threshold: 'Presence of obsessions or compulsions that are time-consuming or distressing',
        therapy: ['Exposure and Response Prevention (ERP) — gold standard','CBT for OCD','Acceptance and Commitment Therapy'],
        medications: ['SSRIs at higher doses: Fluvoxamine, Sertraline, Fluoxetine','Clomipramine (highly effective)'],
        lifestyle: ['ERP practice outside sessions','Peer support groups','Limit reassurance-seeking','Mindfulness without ritualistic neutralizing'],
      },
    ],
  },
  {
    id: 'bipolar', title: 'Bipolar & Related Disorders', icon: '⚡', color: '#d29922',
    disorders: [
      { name: 'Bipolar I Disorder', severity: 'severe',
        symptoms: ['At least one manic episode (≥7 days, most of the day)','Elevated, expansive, or irritable mood + increased energy','Inflated self-esteem or grandiosity','Decreased need for sleep','More talkative than usual or pressured speech','Racing thoughts or flight of ideas','Distractibility','Increased goal-directed activity or psychomotor agitation','Excessive involvement in risky activities'],
        threshold: '≥1 manic episode (+ depressive episodes typically occur)',
        therapy: ['CBT for bipolar','Interpersonal and Social Rhythm Therapy (IPSRT)','Family-Focused Therapy','Psychoeducation on early warning signs'],
        medications: ['Mood stabilizers: Lithium, Valproate, Lamotrigine','Antipsychotics: Quetiapine, Olanzapine, Aripiprazole'],
        lifestyle: ['Regular sleep schedule (crucial)','Mood/symptom tracking journals','Avoid alcohol and recreational drugs','Learn personal triggers'],
      },
    ],
  },
  {
    id: 'trauma', title: 'Trauma & Stress-Related', icon: '⚡', color: '#f85149',
    disorders: [
      { name: 'PTSD (Post-Traumatic Stress Disorder)', severity: 'severe',
        symptoms: ['Exposure to actual or threatened death, serious injury, or sexual violence','Intrusive memories or flashbacks of the traumatic event','Nightmares related to the trauma','Intense or prolonged psychological distress at trauma cues','Marked physiological reactions to trauma cues','Avoidance of distressing memories, thoughts, or feelings','Avoidance of external reminders (people, places, situations)','Negative beliefs about self or world','Persistent negative emotional states','Markedly diminished interest in significant activities','Feelings of detachment from others','Hypervigilance','Exaggerated startle response','Sleep disturbance','Duration of more than 1 month'],
        threshold: '≥1 intrusion, ≥1 avoidance, ≥2 negative cognition, ≥2 hyperarousal symptoms for >1 month',
        therapy: ['Trauma-Focused CBT (TF-CBT)','EMDR — gold standard','Prolonged Exposure (PE)','Cognitive Processing Therapy (CPT)'],
        medications: ['SSRIs: Sertraline, Paroxetine (FDA-approved)','Prazosin for nightmares'],
        lifestyle: ['Physical activity','Grounding techniques','Safe social connections','Avoid alcohol self-medication','Peer support groups'],
      },
    ],
  },
  {
    id: 'psychotic', title: 'Schizophrenia & Psychotic', icon: '🌀', color: '#bc8cff',
    disorders: [
      { name: 'Schizophrenia', severity: 'severe',
        symptoms: ['Delusions (fixed false beliefs)','Hallucinations (seeing/hearing things not there)','Disorganized speech','Grossly disorganized or catatonic behavior','Negative symptoms: flat affect, avolition, alogia, anhedonia, asociality','Significant decline in functioning','Continuous disturbance for ≥6 months'],
        threshold: '≥2 symptoms (including ≥1 from first 3) for ≥1 month; 6-month total duration',
        therapy: ['CBT for psychosis (CBTp)','Family therapy and psychoeducation','Assertive Community Treatment (ACT)','Social skills training'],
        medications: ['Antipsychotics: Risperidone, Olanzapine, Quetiapine, Aripiprazole','Clozapine for treatment-resistant cases'],
        lifestyle: ['Stable housing and routine','Avoid cannabis and stimulants','Regular sleep schedule','Peer support groups'],
      },
    ],
  },
  {
    id: 'neurodevelopmental', title: 'Neurodevelopmental', icon: '🧩', color: '#58a6ff',
    disorders: [
      { name: 'ADHD — Attention-Deficit/Hyperactivity Disorder', severity: 'common',
        symptoms: ['Inattention: fails to give close attention to detail, careless mistakes','Difficulty sustaining attention in tasks or play activities','Does not seem to listen when spoken to directly','Does not follow through on instructions, fails to finish tasks','Difficulty organizing tasks and activities','Avoids tasks requiring sustained mental effort','Loses things necessary for tasks','Easily distracted by extraneous stimuli','Forgetful in daily activities','Hyperactivity: fidgets, squirms, or taps hands/feet','Leaves seat when remaining seated is expected','Runs or climbs in inappropriate situations','Unable to play or engage quietly','Often "on the go" as if "driven by a motor"','Talks excessively, blurts out answers','Difficulty waiting turn, interrupts or intrudes on others'],
        threshold: '≥6 symptoms (≥5 for adults) in ≥2 settings for ≥6 months, onset before age 12',
        therapy: ['CBT for adults','Behavioral therapy for children','Parent training','ADHD coaching','Social skills training'],
        medications: ['Stimulants: Methylphenidate (Ritalin), Amphetamines (Adderall)','Non-stimulants: Atomoxetine, Guanfacine, Clonidine'],
        lifestyle: ['Structured daily routines','Body doubling and accountability','Physical exercise (especially aerobic)','Reduce screen time before bed','Timer-based work intervals (Pomodoro)','External organization systems'],
      },
    ],
  },
]

const SEVERITY_COLOR = { common: 'var(--sky)', moderate: 'var(--earth-warm)', severe: '#e53935' }

export default function DisordersPage() {
  // eslint-disable-next-line no-unused-vars
  const { navigate } = useRouter()
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id)
  const [expandedDisorder, setExpandedDisorder] = useState(null)
  const [checkedSymptoms, setCheckedSymptoms] = useState({})
  const [search, setSearch] = useState('')

  const category = CATEGORIES.find(c => c.id === activeCategory)

  function toggleSymptom(dName, sIdx) {
    const key = `${dName}__${sIdx}`
    setCheckedSymptoms(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function countChecked(dName, symptoms) {
    return symptoms.filter((_, i) => checkedSymptoms[`${dName}__${i}`]).length
  }

  const filtered = search.trim()
    ? CATEGORIES.flatMap(c => c.disorders.map(d => ({ ...d, catTitle: c.title, catIcon: c.icon }))).filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.symptoms.some(s => s.toLowerCase().includes(search.toLowerCase())))
    : null

  return (
    <div className="page-wrapper" style={{ paddingTop: 72 }}>
      {/* Header */}
      <div style={{ background: 'var(--blue-deep)', color: 'white', padding: '3rem 6rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <span className="section-tag" style={{ color: 'var(--blue-pale)' }}>Clinical Reference</span>
            <h1 className="section-title" style={{ color: 'white' }}>DSM-5 Disorder <em>Checklist</em></h1>
            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginTop: 4 }}>
              Educational reference only — not a diagnostic tool. Always consult a licensed clinician.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search disorders or symptoms…"
              style={{ padding: '0.65rem 1rem 0.65rem 2.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-md)', color: 'white', fontFamily: 'var(--font-body)', fontSize: '0.88rem', outline: 'none', width: 280 }}
            />
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)' }}>🔍</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 72px)' }}>

        {/* Sidebar */}
        {!filtered && (
          <div style={{ width: 240, flexShrink: 0, background: 'var(--white)', borderRight: '1px solid var(--blue-pale)', padding: '1.25rem 0', overflowY: 'auto', position: 'sticky', top: 72, height: 'calc(100vh - 72px)' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-light)', padding: '0 1.25rem', marginBottom: '0.5rem' }}>Categories</div>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setExpandedDisorder(null) }} style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                width: '100%', padding: '0.65rem 1.25rem',
                background: 'none', border: 'none', borderLeft: `3px solid ${activeCategory === cat.id ? cat.color : 'transparent'}`,
                cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                backgroundColor: activeCategory === cat.id ? `${cat.color}18` : 'transparent',
              }}>
                <span style={{ fontSize: '1rem' }}>{cat.icon}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: activeCategory === cat.id ? 700 : 500, color: activeCategory === cat.id ? cat.color : 'var(--text-mid)', lineHeight: 1.3 }}>{cat.title}</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-body)', fontSize: '0.68rem', background: 'var(--off-white)', borderRadius: 100, padding: '2px 6px', color: 'var(--text-light)' }}>{cat.disorders.length}</span>
              </button>
            ))}
          </div>
        )}

        {/* Main */}
        <div style={{ flex: 1, padding: '2rem 2.5rem', overflowY: 'auto', background: 'var(--off-white)' }}>

          {/* Search results */}
          {filtered && (
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '1.5rem' }}>
                {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "<strong style={{ color: 'var(--blue-deep)' }}>{search}</strong>" — <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: 'var(--sky)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.85rem' }}>Clear</button>
              </div>
              {filtered.map((d, i) => <DisorderCard key={i} d={d} expandedDisorder={expandedDisorder} setExpandedDisorder={setExpandedDisorder} checkedSymptoms={checkedSymptoms} toggleSymptom={toggleSymptom} countChecked={countChecked} />)}
            </div>
          )}

          {/* Category view */}
          {!filtered && category && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', paddingBottom: '1rem', borderBottom: `2px solid ${category.color}30` }}>
                <span style={{ fontSize: '1.8rem' }}>{category.icon}</span>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--blue-deep)' }}>{category.title}</h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-light)' }}>{category.disorders.length} disorder{category.disorders.length !== 1 ? 's' : ''} in this category</p>
                </div>
              </div>
              {category.disorders.map((d, i) => (
                <DisorderCard key={i} d={d} catColor={category.color} expandedDisorder={expandedDisorder} setExpandedDisorder={setExpandedDisorder} checkedSymptoms={checkedSymptoms} toggleSymptom={toggleSymptom} countChecked={countChecked} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function DisorderCard({ d, catColor = 'var(--sky)', expandedDisorder, setExpandedDisorder, checkedSymptoms, toggleSymptom, countChecked }) {
  const isExpanded = expandedDisorder === d.name
  const checked = countChecked(d.name, d.symptoms)
  const pct = Math.round((checked / d.symptoms.length) * 100)
  const sevColor = { common: 'var(--sky)', moderate: 'var(--earth-warm)', severe: '#e53935' }[d.severity] || 'var(--sky)'

  return (
    <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--blue-pale)', marginBottom: '1.25rem', overflow: 'hidden', transition: 'box-shadow 0.2s', boxShadow: isExpanded ? 'var(--shadow-mid)' : 'var(--shadow-soft)' }}>

      {/* Card header */}
      <div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.1rem 1.5rem', cursor: 'pointer', borderLeft: `4px solid ${catColor}` }}
        onClick={() => setExpandedDisorder(isExpanded ? null : d.name)}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--blue-deep)' }}>{d.name}</h3>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '2px 8px', borderRadius: 100, background: `${sevColor}20`, color: sevColor }}>{d.severity}</span>
          </div>
          {checked > 0 && (
            <div style={{ marginTop: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ flex: 1, height: 4, background: 'var(--blue-pale)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: sevColor, borderRadius: 2, transition: 'width 0.4s' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: sevColor, fontWeight: 700, whiteSpace: 'nowrap' }}>{checked}/{d.symptoms.length} checked</span>
              </div>
            </div>
          )}
        </div>
        <svg width="16" height="16" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginLeft: '1rem', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }}>
          <path d="M2 4l4 4 4-4" stroke="var(--text-light)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Expanded body */}
      {isExpanded && (
        <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--blue-pale)' }}>

          {/* Threshold */}
          <div style={{ margin: '1rem 0', padding: '0.75rem 1rem', background: `${catColor}12`, borderRadius: 'var(--radius-sm)', border: `1px solid ${catColor}30` }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: catColor }}>Diagnostic Threshold</span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-dark)', marginTop: 3, lineHeight: 1.5 }}>{d.threshold}</p>
          </div>

          {/* Symptom checklist */}
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '0.75rem' }}>Symptom Checklist</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem' }}>
            {d.symptoms.map((sym, si) => {
              const key = `${d.name}__${si}`
              const isChecked = checkedSymptoms[key]
              return (
                <label key={si} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)', background: isChecked ? `${catColor}12` : 'transparent', transition: 'background 0.15s' }}>
                  <input type="checkbox" checked={!!isChecked} onChange={() => toggleSymptom(d.name, si)} style={{ marginTop: 2, accentColor: catColor, width: 14, height: 14, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: isChecked ? 'var(--text-dark)' : 'var(--text-mid)', lineHeight: 1.5, textDecoration: isChecked ? 'none' : 'none', fontWeight: isChecked ? 600 : 400 }}>{sym}</span>
                </label>
              )
            })}
          </div>

          {/* Treatment grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            {[['🛋', 'Therapy', d.therapy], ['💊', 'Medications', d.medications], ['🌿', 'Lifestyle', d.lifestyle]].map(([icon, label, items]) => (
              <div key={label} style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-md)', padding: '1rem', border: '1px solid var(--earth-cream)' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '0.5rem' }}>{icon} {label}</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {items.map((item, ii) => (
                    <li key={ii} style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-mid)', lineHeight: 1.45, display: 'flex', gap: '0.4rem' }}>
                      <span style={{ color: catColor, flexShrink: 0, fontSize: '0.65rem', marginTop: 3 }}>▸</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'var(--earth-cream)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--earth-mid)', lineHeight: 1.5 }}>
            ⚕️ This checklist is for educational purposes only. Only a licensed mental health professional can provide an accurate diagnosis.
          </div>
        </div>
      )}
    </div>
  )
}