import { useState } from 'react'
import { useRouter } from '../context/RouterContext'
import { therapistsData } from '../data/therapists'

const timeSlots = ['9:00 AM','10:00 AM','11:00 AM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM']
const sessionTypes = [
  { label:'Online Video', icon:'💻', desc:'Secure video call from home' },
  { label:'In-Person', icon:'🏢', desc:'Visit our Kathmandu office' },
  { label:'Phone Call', icon:'📞', desc:'Audio-only session' },
]

export default function BookingPage() {
  const { params, navigate } = useRouter()
  const t = params.therapist || therapistsData[0]
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState({ type:'Online Video', slot: params.slot || '', date:'', name:'', email:'', phone:'', notes:'' })

  const update = (k, v) => setSelected(s => ({...s, [k]: v}))

  if (step === 3) return (
    <div className="page-wrapper">
      <div className="section" style={{background:'var(--white)',minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center',maxWidth:480}}>
          <div style={{fontSize:'4rem',marginBottom:'1rem'}}>✅</div>
          <h2 style={{fontFamily:'var(--font-display)',fontSize:'2rem',color:'var(--green-deep)',marginBottom:'0.75rem'}}>Booking Confirmed!</h2>
          <p style={{color:'var(--text-light)',fontSize:'1rem',lineHeight:1.7,marginBottom:'2rem'}}>
            Your session with <strong>{t.name}</strong> is booked for <strong>{selected.date}</strong> at <strong>{selected.slot}</strong>.<br/>
            A confirmation email will be sent to <strong>{selected.email}</strong>.
          </p>
          <div style={{background:'var(--green-mist)',borderRadius:'var(--radius-md)',padding:'1.25rem',border:'1px solid var(--green-pale)',marginBottom:'2rem',textAlign:'left'}}>
            <div style={{fontSize:'0.78rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--green-deep)',marginBottom:'0.75rem'}}>Booking Summary</div>
            {[['Therapist',t.name],['Type',selected.type],['Date',selected.date],['Time',selected.slot],['Fee',t.fee]].map(([k,v],i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:'0.88rem',padding:'0.35rem 0',borderBottom:'1px solid var(--green-pale)'}}>
                <span style={{color:'var(--text-light)'}}>{k}</span><span style={{fontWeight:500,color:'var(--text-dark)'}}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center'}}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/')}>Back to Home</button>
            <button className="btn btn-outline btn-lg" onClick={() => navigate('/assessments')}>Take an Assessment</button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{background:'var(--green-mist)',paddingBottom:'3rem'}}>
        <span className="section-tag">Book a Session</span>
        <h1 className="section-title">Schedule with <em>{t.name.split(' ').slice(-1)}</em></h1>
        <div style={{display:'flex',gap:'0.5rem',marginTop:'1rem'}}>
          {['Choose Type','Pick Date & Time','Your Details'].map((s,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
              <div style={{width:28,height:28,borderRadius:'50%',background:step>i?'var(--green-deep)':'var(--green-pale)',color:step>i?'white':'var(--green-deep)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.75rem',fontWeight:700}}>{i+1}</div>
              <span style={{fontSize:'0.8rem',color:step===i+1?'var(--green-deep)':'var(--text-light)',fontWeight:step===i+1?600:400}}>{s}</span>
              {i<2 && <span style={{color:'var(--green-pale)',margin:'0 0.25rem'}}>›</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="section" style={{background:'var(--white)',paddingTop:'3rem'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:'3rem',maxWidth:900,margin:'0 auto'}}>
          <div>
            {step === 1 && (
              <div>
                <h3 style={{fontFamily:'var(--font-display)',fontSize:'1.3rem',color:'var(--green-deep)',marginBottom:'1.5rem'}}>Choose Session Type</h3>
                <div style={{display:'flex',flexDirection:'column',gap:'1rem',marginBottom:'2rem'}}>
                  {sessionTypes.map((st,i)=>(
                    <div key={i} onClick={()=>update('type',st.label)} style={{border:`2px solid ${selected.type===st.label?'var(--green-deep)':'var(--earth-cream)'}`,borderRadius:'var(--radius-md)',padding:'1.25rem',cursor:'pointer',background:selected.type===st.label?'var(--green-mist)':'var(--white)',display:'flex',alignItems:'center',gap:'1rem',transition:'all 0.2s'}}>
                      <div style={{fontSize:'1.8rem'}}>{st.icon}</div>
                      <div><div style={{fontWeight:600,color:'var(--green-deep)',marginBottom:'0.2rem'}}>{st.label}</div><div style={{fontSize:'0.82rem',color:'var(--text-light)'}}>{st.desc}</div></div>
                      {selected.type===st.label && <div style={{marginLeft:'auto',color:'var(--green-deep)',fontSize:'1.2rem'}}>✓</div>}
                    </div>
                  ))}
                </div>
                <button className="btn btn-primary btn-lg" onClick={()=>setStep(2)}>Continue →</button>
              </div>
            )}
            {step === 2 && (
              <div>
                <h3 style={{fontFamily:'var(--font-display)',fontSize:'1.3rem',color:'var(--green-deep)',marginBottom:'1.5rem'}}>Pick a Date & Time</h3>
                <label style={{display:'block',fontSize:'0.82rem',fontWeight:600,color:'var(--text-mid)',marginBottom:'0.5rem'}}>Select Date</label>
                <input type="date" value={selected.date} onChange={e=>update('date',e.target.value)} style={{width:'100%',padding:'0.75rem 1rem',border:'2px solid var(--earth-cream)',borderRadius:'var(--radius-md)',fontFamily:'var(--font-body)',fontSize:'0.95rem',marginBottom:'1.5rem',outline:'none',color:'var(--text-dark)'}} min={new Date().toISOString().split('T')[0]} />
                <label style={{display:'block',fontSize:'0.82rem',fontWeight:600,color:'var(--text-mid)',marginBottom:'0.75rem'}}>Select Time</label>
                <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0.5rem',marginBottom:'2rem'}}>
                  {timeSlots.map((slot,i)=>(
                    <button key={i} onClick={()=>update('slot',slot)} style={{border:`2px solid ${selected.slot===slot?'var(--green-deep)':'var(--earth-cream)'}`,borderRadius:'var(--radius-sm)',padding:'0.6rem',fontSize:'0.82rem',fontWeight:500,cursor:'pointer',background:selected.slot===slot?'var(--green-deep)':'var(--white)',color:selected.slot===slot?'white':'var(--text-mid)',transition:'all 0.15s'}}>{slot}</button>
                  ))}
                </div>
                <div style={{display:'flex',gap:'1rem'}}>
                  <button className="btn btn-outline btn-lg" onClick={()=>setStep(1)}>← Back</button>
                  <button className="btn btn-primary btn-lg" onClick={()=>selected.date&&selected.slot&&setStep(3)} style={{opacity:selected.date&&selected.slot?1:0.5}}>Continue →</button>
                </div>
              </div>
            )}
          </div>

          <div style={{background:'var(--off-white)',borderRadius:'var(--radius-lg)',padding:'1.5rem',border:'1px solid var(--earth-cream)',height:'fit-content',position:'sticky',top:'100px'}}>
            <div style={{fontSize:'0.72rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--text-light)',marginBottom:'1rem'}}>Your Session</div>
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'1.25rem'}}>
              <div style={{width:48,height:48,borderRadius:'50%',background:'var(--green-mist)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem'}}>{t.emoji}</div>
              <div><div style={{fontWeight:600,color:'var(--green-deep)',fontSize:'0.95rem'}}>{t.name}</div><div style={{fontSize:'0.78rem',color:'var(--text-light)'}}>{t.role}</div></div>
            </div>
            {[['Type',selected.type||'—'],['Date',selected.date||'—'],['Time',selected.slot||'—'],['Fee',t.fee]].map(([k,v],i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:'0.85rem',padding:'0.5rem 0',borderBottom:'1px solid var(--earth-cream)'}}>
                <span style={{color:'var(--text-light)'}}>{k}</span><span style={{fontWeight:500,color:'var(--text-dark)'}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
