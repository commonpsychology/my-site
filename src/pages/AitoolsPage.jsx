import { useState } from 'react'
import { useRouter } from '../context/RouterContext'

const TOOLS = [
  { id:'checkin',    icon:'🌤️', title:'Daily Emotional Check-In',      desc:'A 60-second guided reflection on how you\'re feeling right now.',             color:'var(--sky-light)',   tag:'60 sec' },
  { id:'cbt',        icon:'🧠', title:'CBT Thought Challenger',         desc:'Identify cognitive distortions and reframe negative thinking patterns.',       color:'var(--green-mist)',  tag:'5 min' },
  { id:'stress',     icon:'📊', title:'Stress Detection Questionnaire',  desc:'Validated tool that analyses your stress level and gives personalized tips.',  color:'var(--blue-mist)',   tag:'3 min' },
  { id:'mood',       icon:'📈', title:'Mood Tracking Chatbot',          desc:'Track your daily mood patterns with an intelligent conversational guide.',     color:'var(--earth-cream)', tag:'Ongoing' },
]

/* Daily Check-in tool */
const CHECKIN_Qs = [
  { q:'How would you rate your overall mood today?', type:'scale', min:'Very low',  max:'Excellent' },
  { q:'How well did you sleep last night?',          type:'scale', min:'Terrible',  max:'Amazing' },
  { q:'How is your energy level right now?',         type:'scale', min:'Exhausted', max:'Energized' },
  { q:'Are you experiencing any significant stress?',type:'yesno' },
  { q:'Did you do something kind for yourself today?',type:'yesno' },
]

/* CBT distortions */
const DISTORTIONS = [
  'All-or-Nothing Thinking','Catastrophising','Mind Reading','Fortune Telling',
  'Emotional Reasoning','Should Statements','Personalisation','Overgeneralisation',
]

/* Stress questions (PSS-10 simplified) */
const STRESS_Qs = [
  'In the last month, how often have you felt unable to control important things in your life?',
  'How often have you felt nervous and stressed?',
  'How often have you felt difficulties were piling up so high you could not overcome them?',
  'How often have you felt confident about your ability to handle personal problems?',
  'How often have you been able to control irritations in your life?',
]

function ScaleInput({ val, onChange }) {
  return (
    <div>
      <div style={{ display:'flex', gap:'0.5rem', justifyContent:'center', marginBottom:'0.5rem' }}>
        {[1,2,3,4,5,6,7,8,9,10].map(n => (
          <button key={n} onClick={()=>onChange(n)} style={{
            width:38, height:38, borderRadius:'var(--radius-sm)', border:`2px solid ${val===n?'var(--sky)':'var(--blue-pale)'}`,
            background: val===n?'var(--sky)':'var(--white)', color: val===n?'white':'var(--text-mid)',
            fontFamily:'var(--font-body)', fontWeight:700, cursor:'pointer', fontSize:'0.85rem',
          }}>{n}</button>
        ))}
      </div>
    </div>
  )
}

function DailyCheckIn({ onDone }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const q = CHECKIN_Qs[step]

  function answer(val) {
    const next = { ...answers, [step]: val }
    setAnswers(next)
    if (step < CHECKIN_Qs.length - 1) setStep(step + 1)
    else onDone(next)
  }

  return (
    <div style={{ textAlign:'center', padding:'2rem' }}>
      <div style={{ fontFamily:'var(--font-body)', fontSize:'0.75rem', color:'var(--text-light)', marginBottom:'1rem' }}>Question {step+1} of {CHECKIN_Qs.length}</div>
      <div style={{ width:'100%', height:4, background:'var(--blue-pale)', borderRadius:2, marginBottom:'2rem' }}>
        <div style={{ width:`${((step)/CHECKIN_Qs.length)*100}%`, height:'100%', background:'var(--sky)', borderRadius:2, transition:'width 0.4s' }}/>
      </div>
      <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', color:'var(--blue-deep)', marginBottom:'2rem', lineHeight:1.4 }}>{q.q}</h3>
      {q.type === 'scale' && (
        <div>
          <ScaleInput val={answers[step]} onChange={answer}/>
          <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'var(--font-body)', fontSize:'0.72rem', color:'var(--text-light)', marginTop:'0.5rem' }}>
            <span>{q.min}</span><span>{q.max}</span>
          </div>
        </div>
      )}
      {q.type === 'yesno' && (
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center' }}>
          <button className="btn btn-outline btn-lg" onClick={()=>answer('no')}>No</button>
          <button className="btn btn-primary btn-lg" onClick={()=>answer('yes')}>Yes</button>
        </div>
      )}
    </div>
  )
}

function CBTChallenger() {
  const [thought, setThought] = useState('')
  const [distortion, setDistortion] = useState('')
  const [evidence, setEvidence] = useState('')
  const [reframe, setReframe] = useState('')
  const [step, setStep] = useState(0)

  return (
    <div style={{ padding:'1rem' }}>
      {step === 0 && (
        <div>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', color:'var(--blue-deep)', marginBottom:'0.5rem' }}>What's the negative thought?</h3>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:'var(--text-light)', marginBottom:'1rem' }}>Write it exactly as it appears in your mind — don't filter it.</p>
          <textarea value={thought} onChange={e=>setThought(e.target.value)} rows={3} placeholder='e.g. "I always fail at everything I try."' style={{ width:'100%', padding:'0.75rem 1rem', border:'1.5px solid var(--blue-pale)', borderRadius:'var(--radius-sm)', fontFamily:'var(--font-body)', fontSize:'0.9rem', background:'var(--off-white)', outline:'none', resize:'vertical' }}/>
          <button className="btn btn-primary" style={{ marginTop:'1rem' }} disabled={!thought.trim()} onClick={()=>setStep(1)}>Next →</button>
        </div>
      )}
      {step === 1 && (
        <div>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', color:'var(--blue-deep)', marginBottom:'0.5rem' }}>Identify the distortion</h3>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:'var(--text-light)', marginBottom:'1rem' }}>Which cognitive distortion does this thought contain?</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginBottom:'1rem' }}>
            {DISTORTIONS.map(d=>(
              <button key={d} onClick={()=>setDistortion(d)} style={{
                padding:'0.65rem 1rem', border:`2px solid ${distortion===d?'var(--sky)':'var(--blue-pale)'}`,
                borderRadius:'var(--radius-sm)', background: distortion===d?'var(--sky-light)':'var(--white)',
                fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.82rem', color:'var(--blue-deep)', cursor:'pointer',
              }}>{d}</button>
            ))}
          </div>
          <div style={{ display:'flex', gap:'0.75rem' }}>
            <button className="btn btn-outline" onClick={()=>setStep(0)}>← Back</button>
            <button className="btn btn-primary" disabled={!distortion} onClick={()=>setStep(2)}>Next →</button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', color:'var(--blue-deep)', marginBottom:'0.5rem' }}>What's the evidence?</h3>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:'var(--text-light)', marginBottom:'1rem' }}>List real evidence FOR and AGAINST the thought.</p>
          <textarea value={evidence} onChange={e=>setEvidence(e.target.value)} rows={4} placeholder='Evidence FOR: ...\nEvidence AGAINST: ...' style={{ width:'100%', padding:'0.75rem 1rem', border:'1.5px solid var(--blue-pale)', borderRadius:'var(--radius-sm)', fontFamily:'var(--font-body)', fontSize:'0.9rem', background:'var(--off-white)', outline:'none', resize:'vertical' }}/>
          <div style={{ display:'flex', gap:'0.75rem', marginTop:'1rem' }}>
            <button className="btn btn-outline" onClick={()=>setStep(1)}>← Back</button>
            <button className="btn btn-primary" disabled={!evidence.trim()} onClick={()=>setStep(3)}>Next →</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', color:'var(--blue-deep)', marginBottom:'0.5rem' }}>Reframe the thought</h3>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:'var(--text-light)', marginBottom:'1rem' }}>Write a more balanced, realistic version of the original thought.</p>
          <div style={{ background:'var(--sky-light)', borderRadius:'var(--radius-sm)', padding:'0.75rem 1rem', marginBottom:'1rem', fontSize:'0.82rem', color:'var(--blue-mid)' }}>
            Original: "<em>{thought}</em>" · Distortion: <strong>{distortion}</strong>
          </div>
          <textarea value={reframe} onChange={e=>setReframe(e.target.value)} rows={3} placeholder='e.g. "I sometimes struggle, but I have also succeeded at many things."' style={{ width:'100%', padding:'0.75rem 1rem', border:'1.5px solid var(--blue-pale)', borderRadius:'var(--radius-sm)', fontFamily:'var(--font-body)', fontSize:'0.9rem', background:'var(--off-white)', outline:'none', resize:'vertical' }}/>
          <div style={{ display:'flex', gap:'0.75rem', marginTop:'1rem' }}>
            <button className="btn btn-outline" onClick={()=>setStep(2)}>← Back</button>
            <button className="btn btn-primary" disabled={!reframe.trim()} onClick={()=>setStep(4)}>Complete ✓</button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div style={{ textAlign:'center', padding:'2rem' }}>
          <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🎉</div>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', color:'var(--green-deep)', marginBottom:'0.5rem' }}>Great work!</h3>
          <div style={{ background:'var(--green-mist)', borderRadius:'var(--radius-md)', padding:'1.25rem', textAlign:'left', marginBottom:'1.5rem' }}>
            <div style={{ fontFamily:'var(--font-body)', fontSize:'0.78rem', fontWeight:700, color:'var(--green-deep)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.4rem' }}>Your reframe</div>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'0.92rem', color:'var(--green-deep)', margin:0, lineHeight:1.6 }}>{reframe}</p>
          </div>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:'var(--text-light)', marginBottom:'1.5rem' }}>Practicing this regularly rewires thought patterns. Consider saving this to your portal.</p>
          <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center' }}>
            <button className="btn btn-outline" onClick={()=>{ setStep(0); setThought(''); setDistortion(''); setEvidence(''); setReframe(''); }}>Try Another</button>
            <button className="btn btn-primary">Save to Portal →</button>
          </div>
        </div>
      )}
    </div>
  )
}

function StressCheck() {
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(false)
  const allAnswered = STRESS_Qs.every((_,i) => answers[i] !== undefined)
  const total = Object.values(answers).reduce((a,b) => a + b, 0)

  function getLevel() {
    if (total <= 8)  return { label:'Low Stress',      color:'var(--green-deep)', tip:'Great resilience. Keep your current self-care practices.' }
    if (total <= 18) return { label:'Moderate Stress', color:'var(--earth-warm)', tip:'Consider adding mindfulness or relaxation techniques to your routine.' }
    return               { label:'High Stress',        color:'#e53935',           tip:'We strongly recommend speaking with one of our therapists.' }
  }

  if (done) {
    const level = getLevel()
    return (
      <div style={{ textAlign:'center', padding:'2rem' }}>
        <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>📊</div>
        <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', color:'var(--blue-deep)', marginBottom:'0.5rem' }}>Your Stress Level</h3>
        <div style={{ fontFamily:'var(--font-display)', fontSize:'2rem', color:level.color, marginBottom:'0.5rem' }}>{level.label}</div>
        <div style={{ fontFamily:'var(--font-body)', fontSize:'0.88rem', color:'var(--text-light)', marginBottom:'1.5rem' }}>Score: {total} / {STRESS_Qs.length * 4}</div>
        <div style={{ background:'var(--blue-mist)', borderRadius:'var(--radius-md)', padding:'1.25rem', marginBottom:'1.5rem', textAlign:'left' }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'0.88rem', color:'var(--blue-deep)', margin:0 }}>{level.tip}</p>
        </div>
        <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center' }}>
          <button className="btn btn-outline" onClick={()=>{ setDone(false); setAnswers({}); }}>Retake</button>
          <button className="btn btn-primary">Book Session →</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding:'1rem' }}>
      <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', color:'var(--blue-deep)', marginBottom:'0.5rem' }}>Perceived Stress Scale (PSS-10)</h3>
      <p style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:'var(--text-light)', marginBottom:'1.5rem' }}>Rate each question 0 (Never) to 4 (Very Often)</p>
      <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
        {STRESS_Qs.map((q,i)=>(
          <div key={i}>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'0.88rem', color:'var(--text-dark)', marginBottom:'0.75rem', lineHeight:1.5 }}>{q}</p>
            <div style={{ display:'flex', gap:'0.5rem' }}>
              {[0,1,2,3,4].map(n=>(
                <button key={n} onClick={()=>setAnswers({...answers,[i]:n})} style={{
                  flex:1, padding:'0.5rem 0', border:`2px solid ${answers[i]===n?'var(--sky)':'var(--blue-pale)'}`,
                  borderRadius:'var(--radius-sm)', background: answers[i]===n?'var(--sky)':'var(--white)',
                  color: answers[i]===n?'white':'var(--text-mid)', fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.82rem', cursor:'pointer',
                }}>
                  <div>{n}</div>
                  <div style={{ fontSize:'0.6rem', fontWeight:400, marginTop:1 }}>{['Never','Rarely','Sometimes','Often','Always'][n]}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-primary btn-lg" style={{ marginTop:'2rem' }} disabled={!allAnswered} onClick={()=>setDone(true)}>
        See My Results →
      </button>
    </div>
  )
}

export default function AIToolsPage() {
  const { navigate } = useRouter()
  const [active, setActive] = useState(null)
  const [checkinDone, setCheckinDone] = useState(false)

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ background:'var(--blue-mist)' }}>
        <span className="section-tag">AI Mental Health Tools</span>
        <h1 className="section-title">Smart Tools for <em>Self-Awareness</em></h1>
        <p className="section-desc">Interactive, evidence-based tools designed to support — not replace — professional therapy. Use them anytime, anywhere.</p>
        <div style={{ marginTop:'1.25rem', padding:'0.75rem 1.25rem', background:'rgba(0,191,255,0.1)', borderRadius:'var(--radius-md)', border:'1px solid var(--blue-pale)', display:'inline-flex', gap:'0.5rem', alignItems:'center' }}>
          <span style={{ fontSize:'0.9rem' }}>⚠️</span>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'0.8rem', color:'var(--blue-deep)', fontWeight:600 }}>These tools are for self-reflection only. They do not provide clinical diagnoses. Always consult a licensed therapist for mental health concerns.</span>
        </div>
      </div>

      <div className="section" style={{ background:'var(--off-white)', paddingTop:'3rem' }}>
        {!active && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1.5rem' }}>
            {TOOLS.map(t=>(
              <div key={t.id} style={{ background:'var(--white)', borderRadius:'var(--radius-xl)', overflow:'hidden', border:'1px solid var(--blue-pale)', boxShadow:'var(--shadow-soft)', cursor:'pointer', transition:'all 0.25s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='translateY(-5px)'}
                onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
                onClick={()=>setActive(t.id)}
              >
                <div style={{ background:t.color, padding:'2rem', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'3.5rem', height:120 }}>{t.icon}</div>
                <div style={{ padding:'1.5rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.5rem' }}>
                    <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', color:'var(--blue-deep)' }}>{t.title}</h3>
                    <span style={{ fontSize:'0.68rem', fontWeight:800, padding:'2px 8px', borderRadius:100, background:'var(--sky-light)', color:'var(--blue-mid)', textTransform:'uppercase', letterSpacing:'0.06em', whiteSpace:'nowrap' }}>{t.tag}</span>
                  </div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:'var(--text-light)', lineHeight:1.65, marginBottom:'1rem' }}>{t.desc}</p>
                  <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }}>Start →</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {active && (
          <div style={{ maxWidth:720, margin:'0 auto' }}>
            <button className="btn btn-outline" style={{ marginBottom:'1.5rem' }} onClick={()=>{ setActive(null); setCheckinDone(false); }}>← Back to Tools</button>
            <div style={{ background:'var(--white)', borderRadius:'var(--radius-xl)', padding:'2rem', border:'1px solid var(--blue-pale)', boxShadow:'var(--shadow-mid)' }}>
              {active === 'checkin' && !checkinDone && <DailyCheckIn onDone={()=>setCheckinDone(true)}/>}
              {active === 'checkin' && checkinDone && (
                <div style={{ textAlign:'center', padding:'2rem' }}>
                  <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🌤️</div>
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', color:'var(--green-deep)', marginBottom:'0.5rem' }}>Check-in complete!</h3>
                  <p style={{ color:'var(--text-light)', marginBottom:'1.5rem' }}>Your responses have been logged. Keep showing up for yourself — daily check-ins build powerful self-awareness over time.</p>
                  <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center' }}>
                    <button className="btn btn-outline" onClick={()=>setCheckinDone(false)}>Do Again</button>
                    <button className="btn btn-primary" onClick={()=>navigate('/signin')}>View in Portal →</button>
                  </div>
                </div>
              )}
              {active === 'cbt'    && <CBTChallenger />}
              {active === 'stress' && <StressCheck />}
              {active === 'mood'   && (
                <div style={{ textAlign:'center', padding:'2rem' }}>
                  <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>📈</div>
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', color:'var(--blue-deep)', marginBottom:'0.5rem' }}>Mood Tracking</h3>
                  <p style={{ color:'var(--text-light)', marginBottom:'1.5rem' }}>Full mood tracking with charts, patterns, and insights is available in your secure client portal.</p>
                  <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center' }}>
                    <button className="btn btn-outline" onClick={()=>setActive(null)}>← Back</button>
                    <button className="btn btn-primary" onClick={()=>navigate('/signin')}>Open My Portal →</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}