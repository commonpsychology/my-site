import { useState } from 'react'
import { useRouter } from '../context/RouterContext'

const phq9Questions = [
  'Little interest or pleasure in doing things?',
  'Feeling down, depressed, or hopeless?',
  'Trouble falling or staying asleep, or sleeping too much?',
  'Feeling tired or having little energy?',
  'Poor appetite or overeating?',
  'Feeling bad about yourself — or that you are a failure?',
  'Trouble concentrating on things?',
  'Moving or speaking so slowly that other people could have noticed?',
  'Thoughts that you would be better off dead, or of hurting yourself?',
]
const options = [
  {label:'Not at all', value:0},
  {label:'Several days', value:1},
  {label:'More than half the days', value:2},
  {label:'Nearly every day', value:3},
]
const scoring = [
  {max:4, label:'Minimal or no depression', color:'var(--green-soft)', rec:'Continue healthy habits and self-care.'},
  {max:9, label:'Mild depression', color:'var(--blue-soft)', rec:'Consider speaking with a counselor soon.'},
  {max:14, label:'Moderate depression', color:'var(--earth-warm)', rec:'We recommend speaking with a therapist soon.'},
  {max:19, label:'Moderately severe depression', color:'#c0392b', rec:'Please book an appointment with a therapist.'},
  {max:27, label:'Severe depression', color:'#922b21', rec:'Please seek professional help immediately.'},
]

export default function AssessmentTakePage() {
  const { params, navigate } = useRouter()
  const title = params.title || 'PHQ-9 Depression Screening'
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const total = Object.values(answers).reduce((a,b)=>a+b, 0)
  const result = scoring.find(s => total <= s.max) || scoring[scoring.length-1]
  const progress = (Object.keys(answers).length / phq9Questions.length) * 100

  if (submitted) return (
    <div className="page-wrapper">
      <div className="section" style={{background:'var(--white)',minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{maxWidth:520,textAlign:'center'}}>
          <div style={{fontSize:'3.5rem',marginBottom:'1rem'}}>📊</div>
          <h2 style={{fontFamily:'var(--font-display)',fontSize:'2rem',color:'var(--green-deep)',marginBottom:'0.5rem'}}>Your Results</h2>
          <p style={{color:'var(--text-light)',marginBottom:'2rem',fontSize:'0.9rem'}}>{title}</p>
          <div style={{background:'var(--off-white)',borderRadius:'var(--radius-xl)',padding:'2.5rem',border:'1px solid var(--earth-cream)',marginBottom:'2rem'}}>
            <div style={{fontSize:'3.5rem',fontFamily:'var(--font-display)',fontWeight:700,color:result.color,lineHeight:1}}>{total}</div>
            <div style={{fontSize:'0.75rem',color:'var(--text-light)',marginBottom:'1rem'}}>out of 27</div>
            <div style={{display:'inline-block',padding:'0.4rem 1.2rem',borderRadius:'100px',background:result.color,color:'white',fontWeight:600,fontSize:'0.88rem',marginBottom:'1rem'}}>{result.label}</div>
            <p style={{fontSize:'0.9rem',color:'var(--text-mid)',lineHeight:1.7}}>{result.rec}</p>
          </div>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <button className="btn btn-primary btn-lg" onClick={()=>navigate('/book')}>Book a Therapist</button>
            <button className="btn btn-outline btn-lg" onClick={()=>navigate('/assessments')}>Take Another</button>
            <button className="btn btn-outline" onClick={()=>navigate('/')}>Home</button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{background:'var(--green-deep)',paddingBottom:'2.5rem'}}>
        <button onClick={()=>navigate('/assessments')} style={{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',color:'white',borderRadius:'var(--radius-sm)',padding:'0.4rem 1rem',cursor:'pointer',fontSize:'0.82rem',marginBottom:'1rem'}}>← Back</button>
        <span className="section-tag" style={{color:'var(--green-pale)'}}>Free Screening</span>
        <h1 className="section-title" style={{color:'white',fontSize:'1.8rem'}}>{title}</h1>
        <div style={{marginTop:'1rem',background:'rgba(255,255,255,0.1)',borderRadius:'100px',height:'6px',maxWidth:400}}>
          <div style={{height:'100%',borderRadius:'100px',background:'var(--green-pale)',width:`${progress}%`,transition:'width 0.3s'}} />
        </div>
        <div style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.6)',marginTop:'0.5rem'}}>{Object.keys(answers).length} of {phq9Questions.length} answered</div>
      </div>
      <div className="section" style={{background:'var(--off-white)',paddingTop:'3rem'}}>
        <div style={{maxWidth:680,margin:'0 auto'}}>
          <p style={{fontSize:'0.9rem',color:'var(--text-light)',marginBottom:'2rem',padding:'1rem 1.25rem',background:'var(--blue-mist)',borderRadius:'var(--radius-md)',border:'1px solid var(--blue-pale)'}}>
            Over the last 2 weeks, how often have you been bothered by any of the following problems?
          </p>
          {phq9Questions.map((q, qi) => (
            <div key={qi} style={{background:'var(--white)',borderRadius:'var(--radius-md)',padding:'1.5rem',marginBottom:'1rem',border:`2px solid ${answers[qi]!==undefined?'var(--green-pale)':'var(--earth-cream)'}`,transition:'border 0.2s'}}>
              <div style={{fontFamily:'var(--font-display)',fontSize:'1rem',fontWeight:500,color:'var(--green-deep)',marginBottom:'1rem'}}>{qi+1}. {q}</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0.5rem'}}>
                {options.map((opt,oi)=>(
                  <button key={oi} onClick={()=>setAnswers(a=>({...a,[qi]:opt.value}))}
                    style={{border:`2px solid ${answers[qi]===opt.value?'var(--green-deep)':'var(--earth-cream)'}`,borderRadius:'var(--radius-sm)',padding:'0.6rem 0.4rem',fontSize:'0.75rem',fontWeight:answers[qi]===opt.value?600:400,cursor:'pointer',background:answers[qi]===opt.value?'var(--green-deep)':'var(--white)',color:answers[qi]===opt.value?'white':'var(--text-mid)',transition:'all 0.15s',lineHeight:1.3,textAlign:'center'}}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button className="btn btn-primary btn-lg"
            style={{width:'100%',justifyContent:'center',marginTop:'1rem',opacity:Object.keys(answers).length===phq9Questions.length?1:0.5}}
            onClick={()=>Object.keys(answers).length===phq9Questions.length&&setSubmitted(true)}>
            Submit & See Results →
          </button>
        </div>
      </div>
    </div>
  )
}