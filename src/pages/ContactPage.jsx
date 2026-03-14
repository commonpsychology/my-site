import { useState } from 'react'
import { useRouter } from '../context/RouterContext'

export default function ContactPage() {
  const { navigate } = useRouter()
  const [form, setForm] = useState({ name:'', email:'', phone:'', type:'general', message:'' })
  const [sent, setSent] = useState(false)
  const update = (k,v) => setForm(f=>({...f,[k]:v}))

  if (sent) return (
    <div className="page-wrapper">
      <div className="section" style={{background:'var(--white)',minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center',maxWidth:440}}>
          <div style={{fontSize:'4rem',marginBottom:'1rem'}}>💚</div>
          <h2 style={{fontFamily:'var(--font-display)',fontSize:'2rem',color:'var(--green-deep)',marginBottom:'0.75rem'}}>Message Received!</h2>
          <p style={{color:'var(--text-light)',lineHeight:1.7,marginBottom:'2rem'}}>Thank you for reaching out. Our team will respond within 24 hours.</p>
          <button className="btn btn-primary btn-lg" onClick={()=>navigate('/')}>Back to Home</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{background:'var(--green-mist)'}}>
        <span className="section-tag">Get In Touch</span>
        <h1 className="section-title">We Are Here to <em>Help</em></h1>
        <p className="section-desc">Reach out with any questions, feedback, or to learn more about our services.</p>
      </div>
      <div className="section" style={{background:'var(--white)',paddingTop:'3rem'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4rem',maxWidth:900,margin:'0 auto'}}>
          <div>
            <h3 style={{fontFamily:'var(--font-display)',fontSize:'1.3rem',color:'var(--green-deep)',marginBottom:'1.5rem'}}>Send Us a Message</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
              {[['Name','name','text','Your full name'],['Email','email','email','your@email.com'],['Phone','phone','tel','98XXXXXXXX']].map(([label,key,type,ph])=>(
                <div key={key}>
                  <label style={{display:'block',fontSize:'0.82rem',fontWeight:600,color:'var(--text-mid)',marginBottom:'0.4rem'}}>{label}</label>
                  <input type={type} placeholder={ph} value={form[key]} onChange={e=>update(key,e.target.value)}
                    style={{width:'100%',padding:'0.75rem 1rem',border:'2px solid var(--earth-cream)',borderRadius:'var(--radius-md)',fontFamily:'var(--font-body)',fontSize:'0.9rem',outline:'none',color:'var(--text-dark)',transition:'border 0.2s'}}
                    onFocus={e=>e.target.style.borderColor='var(--green-soft)'}
                    onBlur={e=>e.target.style.borderColor='var(--earth-cream)'} />
                </div>
              ))}
              <div>
                <label style={{display:'block',fontSize:'0.82rem',fontWeight:600,color:'var(--text-mid)',marginBottom:'0.4rem'}}>Type of Inquiry</label>
                <select value={form.type} onChange={e=>update('type',e.target.value)}
                  style={{width:'100%',padding:'0.75rem 1rem',border:'2px solid var(--earth-cream)',borderRadius:'var(--radius-md)',fontFamily:'var(--font-body)',fontSize:'0.9rem',outline:'none',color:'var(--text-dark)',background:'white'}}>
                  <option value="general">General Inquiry</option>
                  <option value="appointment">Appointment</option>
                  <option value="support">Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="complaint">Complaint</option>
                </select>
              </div>
              <div>
                <label style={{display:'block',fontSize:'0.82rem',fontWeight:600,color:'var(--text-mid)',marginBottom:'0.4rem'}}>Message</label>
                <textarea rows={5} placeholder="How can we help you?" value={form.message} onChange={e=>update('message',e.target.value)}
                  style={{width:'100%',padding:'0.75rem 1rem',border:'2px solid var(--earth-cream)',borderRadius:'var(--radius-md)',fontFamily:'var(--font-body)',fontSize:'0.9rem',outline:'none',color:'var(--text-dark)',resize:'vertical',transition:'border 0.2s'}}
                  onFocus={e=>e.target.style.borderColor='var(--green-soft)'}
                  onBlur={e=>e.target.style.borderColor='var(--earth-cream)'} />
              </div>
              <button className="btn btn-primary btn-lg" style={{justifyContent:'center'}} onClick={()=>form.name&&form.email&&form.message&&setSent(true)}>
                Send Message →
              </button>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
            <h3 style={{fontFamily:'var(--font-display)',fontSize:'1.3rem',color:'var(--green-deep)'}}>Contact Information</h3>
            {[['📍','Address','Thamel, Kathmandu, Nepal'],['📞','Phone','+977-01-XXXXXXX'],['📧','Email','hello@pujasamargi.com'],['🕐','Hours','Sun–Fri: 9AM – 6PM (NPT)']].map(([icon,label,val],i)=>(
              <div key={i} style={{display:'flex',gap:'1rem',alignItems:'flex-start',padding:'1.25rem',background:'var(--off-white)',borderRadius:'var(--radius-md)',border:'1px solid var(--earth-cream)'}}>
                <div style={{fontSize:'1.4rem',flexShrink:0}}>{icon}</div>
                <div><div style={{fontSize:'0.72rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--earth-warm)',marginBottom:'0.2rem'}}>{label}</div><div style={{fontSize:'0.9rem',color:'var(--text-mid)'}}>{val}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}