import { useRouter } from '../context/RouterContext'
import { therapistsData } from '../data/therapists'

export default function TherapistDetailPage() {
  const { params, navigate } = useRouter()
  const t = params.therapist || therapistsData[0]

  return (
    <div className="page-wrapper">
      <div className="section" style={{background:'var(--white)',paddingTop:'5rem'}}>
        <button className="btn btn-outline" style={{marginBottom:'2rem'}} onClick={() => navigate('/therapists')}>← Back to Therapists</button>
        <div className="detail-grid">
          <div className="detail-sidebar">
            <div className={`therapist-img ${t.imgClass}`} style={{height:260,borderRadius:'var(--radius-lg)',fontSize:'5rem',marginBottom:'1.5rem',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
              <span>{t.emoji}</span>
              {t.available
                ? <span className="therapist-avail-badge">● Available</span>
                : <span className="therapist-avail-badge" style={{background:'var(--earth-warm)'}}>Unavailable</span>}
            </div>
            <div style={{background:'var(--off-white)',borderRadius:'var(--radius-md)',padding:'1.5rem',border:'1px solid var(--earth-cream)'}}>
              <div style={{fontFamily:'var(--font-display)',fontSize:'1.4rem',fontWeight:700,color:'var(--green-deep)',marginBottom:'0.25rem'}}>{t.name}</div>
              <div style={{fontSize:'0.85rem',color:'var(--earth-warm)',marginBottom:'1rem'}}>{t.role} · {t.exp} experience</div>
              <div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'1rem'}}>
                {t.tags.map((tag,j)=><span className={`tag ${t.tagClass}`} key={j}>{tag}</span>)}
              </div>
              <div style={{fontSize:'0.9rem',color:'var(--text-mid)',marginBottom:'0.5rem'}}>⭐ {t.rating} ({t.reviews} reviews)</div>
              <div style={{fontFamily:'var(--font-display)',fontSize:'1.3rem',fontWeight:700,color:'var(--green-deep)',marginBottom:'1.5rem'}}>{t.fee} <span style={{fontFamily:'var(--font-body)',fontSize:'0.75rem',fontWeight:400,color:'var(--text-light)'}}>per session</span></div>
              <button className="btn btn-primary btn-lg" style={{width:'100%',justifyContent:'center'}} onClick={() => navigate('/book', {therapist:t})}>
                Book a Session
              </button>
            </div>
          </div>
          <div className="detail-content">
            <span className="section-tag">About</span>
            <h2 className="section-title" style={{fontSize:'1.8rem',marginBottom:'1rem'}}>About {t.name.split(' ')[0]}</h2>
            <p style={{fontSize:'1rem',color:'var(--text-mid)',lineHeight:1.8,marginBottom:'2rem'}}>{t.bio}</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginBottom:'2rem'}}>
              {[['🎓','Education','Masters in Clinical Psychology'],['🏆','License','NPC Certified Psychologist'],['🌍','Languages','Nepali, English, Hindi'],['📅','Session Type','Online & In-Person']].map(([icon,label,val],i)=>(
                <div key={i} style={{background:'var(--off-white)',borderRadius:'var(--radius-md)',padding:'1.25rem',border:'1px solid var(--earth-cream)'}}>
                  <div style={{fontSize:'1.2rem',marginBottom:'0.4rem'}}>{icon}</div>
                  <div style={{fontSize:'0.72rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-light)',marginBottom:'0.25rem'}}>{label}</div>
                  <div style={{fontSize:'0.88rem',color:'var(--text-dark)',fontWeight:500}}>{val}</div>
                </div>
              ))}
            </div>
            <h3 style={{fontFamily:'var(--font-display)',fontSize:'1.2rem',fontWeight:600,color:'var(--green-deep)',marginBottom:'1rem'}}>Available Time Slots</h3>
            <div style={{display:'flex',flexWrap:'wrap',gap:'0.75rem',marginBottom:'2rem'}}>
              {['Mon 10am','Mon 2pm','Tue 11am','Wed 9am','Wed 3pm','Thu 1pm','Fri 10am','Fri 4pm'].map((slot,i)=>(
                <button key={i} className="btn btn-outline" style={{fontSize:'0.8rem',padding:'0.4rem 1rem'}} onClick={() => navigate('/book', {therapist:t, slot})}>{slot}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
