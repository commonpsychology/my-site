import { useState } from 'react'
import { useRouter } from '../context/RouterContext'

const products = [
  { emoji:'📘', title:'The Anxiety Workbook', desc:'A structured 12-week CBT workbook for managing anxiety at home.', price:'NPR 850', type:'Workbook', cat:'Anxiety', stock:true },
  { emoji:'📗', title:'Mindful Living Journal', desc:'A guided daily journal for building mindfulness habits over 90 days.', price:'NPR 650', type:'Journal', cat:'Mindfulness', stock:true },
  { emoji:'📙', title:'Depression Recovery Guide', desc:'A compassionate self-help guide written for the Nepali context.', price:'NPR 750', type:'eBook', cat:'Depression', stock:true },
  { emoji:'🎴', title:'Emotion Regulation Cards', desc:'52 flashcard exercises to identify, name, and regulate emotions.', price:'NPR 1,200', type:'Tool', cat:'Wellness', stock:true },
  { emoji:'📕', title:'Relationships & Attachment', desc:'Understanding attachment styles and building secure connections.', price:'NPR 900', type:'Book', cat:'Relationships', stock:false },
  { emoji:'🧘', title:'Mindfulness Audio Pack', desc:'10 guided meditation audios from 5 to 30 minutes each.', price:'NPR 500', type:'Audio', cat:'Mindfulness', stock:true },
]

export default function StorePage() {
  const [cart, setCart] = useState([])
  const { navigate } = useRouter()
  const add = (p) => setCart(c => c.find(x=>x.title===p.title) ? c : [...c, p])

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{background:'var(--earth-cream)'}}>
        <span className="section-tag">Wellness Store</span>
        <h1 className="section-title">Books, Tools & <em>Workbooks</em></h1>
        <p className="section-desc">Curated resources to support your mental health journey — delivered across Nepal.</p>
        {cart.length > 0 && (
          <div style={{marginTop:'1.5rem',display:'inline-flex',alignItems:'center',gap:'0.75rem',background:'var(--green-deep)',color:'white',padding:'0.6rem 1.25rem',borderRadius:'var(--radius-md)',fontSize:'0.88rem',fontWeight:500}}>
            🛒 {cart.length} item{cart.length>1?'s':''} in cart
            <button style={{background:'rgba(255,255,255,0.2)',border:'none',color:'white',padding:'0.2rem 0.75rem',borderRadius:'100px',cursor:'pointer',fontSize:'0.8rem'}} onClick={()=>navigate('/book')}>Checkout</button>
          </div>
        )}
      </div>
      <div className="section" style={{background:'var(--white)'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.5rem'}}>
          {products.map((p,i)=>(
            <div key={i} style={{background:'var(--off-white)',borderRadius:'var(--radius-lg)',border:'1px solid var(--earth-cream)',overflow:'hidden',transition:'all 0.25s',opacity:p.stock?1:0.7}}
              onMouseEnter={e=>p.stock&&(e.currentTarget.style.transform='translateY(-4px)')}
              onMouseLeave={e=>(e.currentTarget.style.transform='translateY(0)')}>
              <div style={{background:'var(--earth-cream)',padding:'2rem',fontSize:'3rem',textAlign:'center',borderBottom:'1px solid var(--earth-light)'}}>{p.emoji}</div>
              <div style={{padding:'1.5rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.5rem'}}>
                  <span style={{fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--earth-warm)'}}>{p.type}</span>
                  {!p.stock && <span style={{fontSize:'0.68rem',color:'#c0392b',fontWeight:600}}>Out of Stock</span>}
                </div>
                <h3 style={{fontFamily:'var(--font-display)',fontSize:'1.05rem',fontWeight:600,color:'var(--green-deep)',marginBottom:'0.5rem'}}>{p.title}</h3>
                <p style={{fontSize:'0.82rem',color:'var(--text-light)',lineHeight:1.6,marginBottom:'1rem'}}>{p.desc}</p>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <span style={{fontFamily:'var(--font-display)',fontSize:'1.1rem',fontWeight:700,color:'var(--green-deep)'}}>{p.price}</span>
                  <button className={p.stock?'btn btn-earth':'btn btn-outline'} style={{fontSize:'0.8rem',padding:'0.45rem 1rem'}}
                    onClick={()=>p.stock&&add(p)} disabled={!p.stock}>
                    {cart.find(x=>x.title===p.title) ? '✓ Added' : p.stock ? 'Add to Cart' : 'Unavailable'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}