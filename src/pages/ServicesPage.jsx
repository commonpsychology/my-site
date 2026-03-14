import { useRouter } from '../context/RouterContext'

const allServices = [
  { icon:'🧠', iconClass:'si-green', title:'Individual Therapy', desc:'One-on-one sessions tailored to your unique needs, delivered by certified clinical psychologists. Available online or in-person across Kathmandu.', features:['CBT & DBT approaches','60-minute sessions','Flexible scheduling','Session notes shared securely'], path:'/book' },
  { icon:'💑', iconClass:'si-earth', title:'Couples Counseling', desc:'Rebuild trust, communication, and intimacy with your partner through evidence-based relationship therapy.', features:['Gottman Method','Joint & separate sessions','Conflict resolution','Relationship assessment'], path:'/book' },
  { icon:'👨‍👩‍👧', iconClass:'si-blue', title:'Family Therapy', desc:'Strengthen family bonds and work through dynamics that affect everyone in the household.', features:['Family systems approach','Parenting support','Communication skills','Crisis intervention'], path:'/book' },
  { icon:'🧒', iconClass:'si-green', title:'Child Psychology', desc:'Specialized support for children aged 5–18, using play therapy and age-appropriate techniques.', features:['Play therapy','Behavioral assessment','School-related issues','Parent coaching'], path:'/book' },
  { icon:'🌿', iconClass:'si-earth', title:'Mindfulness & Stress', desc:'Learn practical mindfulness techniques to manage stress, anxiety, and emotional regulation.', features:['MBSR program','Breathing techniques','Stress audit','Daily practice tools'], path:'/book' },
  { icon:'😴', iconClass:'si-blue', title:'Sleep & Mood', desc:'Address insomnia, burnout, and mood disorders with targeted therapeutic interventions.', features:['CBT for insomnia','Mood charting','Sleep hygiene coaching','Lifestyle integration'], path:'/book' },
]

export default function ServicesPage() {
  const { navigate } = useRouter()
  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{background:'var(--green-mist)'}}>
        <span className="section-tag">All Services</span>
        <h1 className="section-title">Everything You Need for <em>Mental Wellness</em></h1>
        <p className="section-desc">Comprehensive, evidence-based mental health services designed for the Nepali community.</p>
      </div>
      <div className="section" style={{background:'var(--white)'}}>
        <div className="services-grid-full">
          {allServices.map((s, i) => (
            <div className="service-card-full" key={i}>
              <div className={`service-icon ${s.iconClass}`} style={{marginBottom:'1.25rem'}}>{s.icon}</div>
              <h3 style={{fontFamily:'var(--font-display)',fontSize:'1.2rem',fontWeight:600,color:'var(--green-deep)',marginBottom:'0.6rem'}}>{s.title}</h3>
              <p style={{fontSize:'0.88rem',color:'var(--text-light)',lineHeight:1.65,marginBottom:'1rem'}}>{s.desc}</p>
              <ul style={{display:'flex',flexDirection:'column',gap:'0.4rem',marginBottom:'1.5rem'}}>
                {s.features.map((f, j) => (
                  <li key={j} style={{fontSize:'0.82rem',color:'var(--text-mid)',display:'flex',alignItems:'center',gap:'6px'}}>
                    <span style={{color:'var(--green-soft)',fontSize:'0.9rem'}}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} onClick={() => navigate('/book')}>Book This Service</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}