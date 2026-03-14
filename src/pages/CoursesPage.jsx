import { useRouter } from '../context/RouterContext'

const courses = [
  { icon:'🧘', title:'Mindfulness-Based Stress Reduction', instructor:'Dr. Anita Shrestha', level:'Beginner', duration:'8 hrs', lessons:24, price:'NPR 1,500', free:false, tags:['Mindfulness','Stress','Meditation'], color:'var(--green-mist)' },
  { icon:'😌', title:'Overcoming Anxiety: A CBT Approach', instructor:'Mr. Roshan Karki', level:'Intermediate', duration:'6 hrs', lessons:18, price:'FREE', free:true, tags:['Anxiety','CBT','Skills'], color:'var(--blue-mist)' },
  { icon:'🌱', title:'Building Emotional Resilience', instructor:'Ms. Priya Tamang', level:'Beginner', duration:'5 hrs', lessons:15, price:'NPR 1,200', free:false, tags:['Resilience','Emotions','Wellbeing'], color:'var(--earth-cream)' },
  { icon:'😴', title:'Sleep Better: CBT for Insomnia', instructor:'Dr. Anita Shrestha', level:'Beginner', duration:'4 hrs', lessons:12, price:'NPR 800', free:false, tags:['Sleep','Insomnia','CBT'], color:'var(--green-mist)' },
  { icon:'💼', title:'Workplace Mental Health', instructor:'Mr. Roshan Karki', level:'Advanced', duration:'7 hrs', lessons:21, price:'FREE', free:true, tags:['Work','Burnout','Boundaries'], color:'var(--blue-mist)' },
  { icon:'💑', title:'Healthy Relationships Workshop', instructor:'Ms. Priya Tamang', level:'Intermediate', duration:'5 hrs', lessons:16, price:'NPR 1,000', free:false, tags:['Relationships','Communication','Boundaries'], color:'var(--earth-cream)' },
]

const levelColor = { Beginner:'var(--green-deep)', Intermediate:'var(--blue-mid)', Advanced:'var(--earth-mid)' }

export default function CoursesPage() {
  const { navigate } = useRouter()
  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{background:'var(--earth-cream)'}}>
        <span className="section-tag">Online Learning</span>
        <h1 className="section-title">Trainings for <em>Every</em> Journey</h1>
        <p className="section-desc">Self-paced, expert-led programs designed to support your mental wellness from home.</p>
      </div>
      <div className="section" style={{background:'var(--white)'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.5rem'}}>
          {courses.map((c,i)=>(
            <div key={i} style={{background:'var(--off-white)',borderRadius:'var(--radius-lg)',overflow:'hidden',border:'1px solid var(--earth-cream)',boxShadow:'var(--shadow-soft)',transition:'all 0.25s',cursor:'pointer'}}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-5px)'}
              onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
              <div style={{background:c.color,padding:'2rem',fontSize:'3rem',textAlign:'center'}}>{c.icon}</div>
              <div style={{padding:'1.5rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.75rem'}}>
                  <span style={{fontSize:'0.72rem',fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',color:levelColor[c.level]}}>{c.level}</span>
                  {c.free ? <span className="resource-free">FREE</span> : <span style={{fontFamily:'var(--font-display)',fontWeight:700,color:'var(--green-deep)',fontSize:'0.95rem'}}>{c.price}</span>}
                </div>
                <h3 style={{fontFamily:'var(--font-display)',fontSize:'1.05rem',fontWeight:600,color:'var(--green-deep)',marginBottom:'0.5rem',lineHeight:1.3}}>{c.title}</h3>
                <p style={{fontSize:'0.8rem',color:'var(--text-light)',marginBottom:'0.75rem'}}>By {c.instructor}</p>
                <div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'1rem'}}>
                  {c.tags.map((t,j)=><span key={j} className="tag" style={{fontSize:'0.68rem'}}>{t}</span>)}
                </div>
                <div style={{display:'flex',gap:'1rem',fontSize:'0.78rem',color:'var(--text-light)',padding:'0.75rem 0',borderTop:'1px solid var(--earth-cream)',marginBottom:'1rem'}}>
                  <span>📚 {c.lessons} lessons</span>
                  <span>⏱ {c.duration}</span>
                </div>
                <button className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} onClick={()=>navigate('/book')}>
                  {c.free ? 'Enroll Free →' : 'Enroll Now →'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}