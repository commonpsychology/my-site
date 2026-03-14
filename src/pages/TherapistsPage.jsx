import { useRouter } from '../context/RouterContext'
import { therapistsData } from '../data/therapists'

const extended = [
  ...therapistsData,
  { id:4, name:'Dr. Suresh Adhikari', role:'Psychiatrist', emoji:'👨‍⚕️', imgClass:'t1', tags:['Medication','Bipolar','Schizophrenia'], tagClass:'blue-tag', rating:'4.7', reviews:52, fee:'NPR 3,000', available:true, exp:'12 yrs', bio:'Dr. Suresh is a board-certified psychiatrist offering medication management alongside psychotherapy.' },
  { id:5, name:'Ms. Deepa Rai', role:'Art Therapist', emoji:'🎨', imgClass:'t2', tags:['Art Therapy','Trauma','Youth'], tagClass:'', rating:'4.9', reviews:41, fee:'NPR 1,600', available:true, exp:'4 yrs', bio:'Deepa uses creative arts as a therapeutic medium, particularly effective for trauma and non-verbal processing.' },
  { id:6, name:'Mr. Bikash Thapa', role:'Addiction Counselor', emoji:'🤝', imgClass:'t3', tags:['Addiction','Recovery','CBT'], tagClass:'blue-tag', rating:'4.8', reviews:63, fee:'NPR 1,700', available:false, exp:'7 yrs', bio:'Bikash specializes in substance use disorders and behavioral addictions, using motivational interviewing.' },
]

export default function TherapistsPage() {
  const { navigate } = useRouter()
  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{background:'var(--earth-cream)'}}>
        <span className="section-tag">Our Team</span>
        <h1 className="section-title">Meet All Our <em>Therapists</em></h1>
        <p className="section-desc">Every practitioner is licensed, verified, and committed to culturally sensitive mental health care.</p>
      </div>
      <div className="section therapists" style={{paddingTop:'3rem'}}>
        <div className="therapists-grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
          {extended.map((t) => (
            <div className="therapist-card" key={t.id} onClick={() => navigate('/therapist-detail', {therapist:t})} style={{cursor:'pointer'}}>
              <div className={`therapist-img ${t.imgClass}`}>
                <span>{t.emoji}</span>
                {t.available
                  ? <span className="therapist-avail-badge">● Available</span>
                  : <span className="therapist-avail-badge" style={{background:'var(--earth-warm)'}}>Unavailable</span>}
              </div>
              <div className="therapist-body">
                <div className="therapist-name">{t.name}</div>
                <div className="therapist-role">{t.role} · {t.exp}</div>
                <div className="therapist-tags">{t.tags.map((tag,j)=><span className={`tag ${t.tagClass}`} key={j}>{tag}</span>)}</div>
                <div className="therapist-footer">
                  <div className="therapist-rating">⭐ {t.rating}</div>
                  <div className="therapist-fee">{t.fee} <small>/ session</small></div>
                </div>
                <button className="btn btn-primary" style={{width:'100%',marginTop:'1rem',justifyContent:'center'}}
                  onClick={e=>{e.stopPropagation();navigate('/book',{therapist:t})}}>Book Session</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
