import { useRouter } from '../context/RouterContext'

const assessments = [
  { slug:'phq9', title:'PHQ-9 Depression Screening', icon:'🧠', color:'var(--green-mist)', border:'var(--green-pale)', time:'5 min', questions:9, desc:'The Patient Health Questionnaire-9 is the gold standard for detecting and measuring depression severity.', tags:['Depression','Mood','Clinical'] },
  { slug:'gad7', title:'GAD-7 Anxiety Assessment', icon:'😰', color:'var(--blue-mist)', border:'var(--blue-pale)', time:'4 min', questions:7, desc:'The Generalized Anxiety Disorder scale helps identify and measure the severity of anxiety disorders.', tags:['Anxiety','Worry','Stress'] },
  { slug:'dass21', title:'DASS-21 Stress Scale', icon:'💭', color:'var(--earth-cream)', border:'var(--earth-light)', time:'8 min', questions:21, desc:'Measures the three related negative emotional states of depression, anxiety and stress simultaneously.', tags:['Depression','Anxiety','Stress'] },
  { slug:'burnout', title:'Burnout Assessment', icon:'🔥', color:'var(--green-mist)', border:'var(--green-pale)', time:'6 min', questions:16, desc:'Evaluate physical, emotional, and mental exhaustion caused by prolonged stress or overwork.', tags:['Work','Burnout','Energy'] },
  { slug:'pcl5', title:'PCL-5 Trauma Screening', icon:'🌊', color:'var(--blue-mist)', border:'var(--blue-pale)', time:'7 min', questions:20, desc:'The PTSD Checklist screens for post-traumatic stress disorder symptoms following difficult events.', tags:['Trauma','PTSD','Recovery'] },
  { slug:'stress', title:'Perceived Stress Scale', icon:'⚡', color:'var(--earth-cream)', border:'var(--earth-light)', time:'3 min', questions:10, desc:'Measures how situations in your life are appraised as stressful over the past month.', tags:['Stress','Coping','Lifestyle'] },
]

export default function AssessmentsPage() {
  const { navigate } = useRouter()
  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{background:'var(--green-deep)',color:'white'}}>
        <span className="section-tag" style={{color:'var(--green-pale)'}}>Mental Health Screenings</span>
        <h1 className="section-title" style={{color:'white'}}>Free <em style={{color:'var(--earth-light)'}}>Validated</em> Assessments</h1>
        <p className="section-desc" style={{color:'rgba(255,255,255,0.7)'}}>Clinically validated tools used by mental health professionals worldwide — completely free and confidential.</p>
      </div>
      <div className="section" style={{background:'var(--off-white)'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.5rem'}}>
          {assessments.map((a,i) => (
            <div key={i} style={{background:'var(--white)',borderRadius:'var(--radius-lg)',overflow:'hidden',border:'1px solid var(--earth-cream)',boxShadow:'var(--shadow-soft)',transition:'all 0.25s',cursor:'pointer'}}
              onClick={() => navigate('/assessment-take', {slug:a.slug, title:a.title})}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-5px)'}
              onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
              <div style={{background:a.color,padding:'2rem',borderBottom:`1px solid ${a.border}`,fontSize:'2.5rem',textAlign:'center'}}>{a.icon}</div>
              <div style={{padding:'1.5rem'}}>
                <h3 style={{fontFamily:'var(--font-display)',fontSize:'1.05rem',fontWeight:600,color:'var(--green-deep)',marginBottom:'0.5rem'}}>{a.title}</h3>
                <p style={{fontSize:'0.83rem',color:'var(--text-light)',lineHeight:1.6,marginBottom:'1rem'}}>{a.desc}</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:'5px',marginBottom:'1rem'}}>
                  {a.tags.map((tag,j)=><span key={j} className="tag">{tag}</span>)}
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'0.75rem',borderTop:'1px solid var(--earth-cream)'}}>
                  <div style={{fontSize:'0.78rem',color:'var(--text-light)'}}>{a.questions} questions · {a.time}</div>
                  <span className="resource-free">FREE</span>
                </div>
                <button className="btn btn-primary" style={{width:'100%',marginTop:'1rem',justifyContent:'center'}}
                  onClick={e=>{e.stopPropagation();navigate('/assessment-take',{slug:a.slug,title:a.title})}}>
                  Start Assessment →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}