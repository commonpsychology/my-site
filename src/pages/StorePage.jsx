// eslint-disable-next-line no-unused-vars
import { useState, useRef, useEffect } from 'react'
import { useRouter } from '../context/RouterContext'

/* ── Palette — exact site match ── */
const C = {
  skyBright:  '#00BFFF',
  skyMid:     '#009FD4',
  skyDeep:    '#007BA8',
  skyFaint:   '#E0F7FF',
  skyFainter: '#F0FBFF',
  skyGhost:   '#F8FEFF',
  white:      '#ffffff',
  mint:       '#e8f3ee',
  textDark:   '#1a3a4a',
  textMid:    '#2e6080',
  textLight:  '#7a9aaa',
  border:     '#b0d4e8',
  borderFaint:'#daeef8',
}
const heroGrad    = `linear-gradient(135deg,#007BA8 0%,#009FD4 45%,#00BFFF 85%,#22d3ee 100%)`
const btnGrad     = `linear-gradient(135deg,#007BA8 0%,#00BFFF 100%)`
const sectionGrad = `linear-gradient(135deg,${C.skyFainter} 0%,${C.mint} 60%,${C.skyFaint} 100%)`
// eslint-disable-next-line no-unused-vars
const navbarGrad  = `linear-gradient(to right,#00BFFF 0%,#00BFFF 2%,#e8f3ee 40%,#f0f8f4 60%,#f8fcfa 80%,#fff 100%)`

const QR_IMAGE  = '/images/payment-qr.png'
const ESEWA_ID  = '9849350088'
const KHALTI_ID = '9849350088'

const METHODS = [
  { id:'qr',     label:'QR Code',         emoji:'📷', color:C.skyBright, faint:C.skyFaint  },
  { id:'esewa',  label:'eSewa',            emoji:'🟢', color:'#22c55e',   faint:'#d1fae5'   },
  { id:'khalti', label:'Khalti',           emoji:'🟣', color:'#a855f7',   faint:'#f0e6ff'   },
  { id:'cod',    label:'Cash on Delivery', emoji:'💵', color:'#f97316',   faint:'#fff7ed'   },
]

/* ── products — original data kept exactly ── */
const products = [
  { emoji:'📘', title:'The Anxiety Workbook',      desc:'A structured 12-week CBT workbook for managing anxiety at home.',         price:'NPR 850',   num:850,  type:'Workbook', cat:'Anxiety',       stock:true  },
  { emoji:'📗', title:'Mindful Living Journal',     desc:'A guided daily journal for building mindfulness habits over 90 days.',    price:'NPR 650',   num:650,  type:'Journal',  cat:'Mindfulness',   stock:true  },
  { emoji:'📙', title:'Depression Recovery Guide',  desc:'A compassionate self-help guide written for the Nepali context.',         price:'NPR 750',   num:750,  type:'eBook',    cat:'Depression',    stock:true  },
  { emoji:'🎴', title:'Emotion Regulation Cards',   desc:'52 flashcard exercises to identify, name, and regulate emotions.',        price:'NPR 1,200', num:1200, type:'Tool',     cat:'Wellness',      stock:true  },
  { emoji:'📕', title:'Relationships & Attachment', desc:'Understanding attachment styles and building secure connections.',         price:'NPR 900',   num:900,  type:'Book',     cat:'Relationships', stock:false },
  { emoji:'🧘', title:'Mindfulness Audio Pack',     desc:'10 guided meditation audios from 5 to 30 minutes each.',                 price:'NPR 500',   num:500,  type:'Audio',    cat:'Mindfulness',   stock:true  },
]

function genRef() {
  return `PS-STORE-${new Date().getFullYear()}-${String(Math.floor(Math.random()*90000)+10000)}`
}

/* ── small copy button ── */
function CopyBtn({ text, id, copied, onCopy }) {
  const active = copied === id
  return (
    <button onClick={() => { navigator.clipboard.writeText(text).catch(()=>{}); onCopy(id) }}
      style={{ padding:'0.3rem 0.85rem', borderRadius:8, border:`1.5px solid ${active?'#22c55e':C.border}`, background:active?'#d1fae5':C.white, color:active?'#065f46':C.textMid, fontFamily:'var(--font-body)', fontSize:'0.74rem', fontWeight:700, cursor:'pointer', transition:'all 0.18s', whiteSpace:'nowrap' }}>
      {active ? '✓ Copied' : '⎘ Copy'}
    </button>
  )
}

/* ── Input field ── */
function Field({ label, required, type='text', placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label style={{ display:'block', fontFamily:'var(--font-body)', fontSize:'0.66rem', fontWeight:800, color:C.textLight, textTransform:'uppercase', letterSpacing:'0.09em', marginBottom:'0.4rem' }}>
        {label}{required && <span style={{ color:C.skyBright, marginLeft:2 }}>*</span>}
      </label>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange}
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{ width:'100%', padding:'0.78rem 1rem', border:`1.5px solid ${focused?C.skyBright:C.borderFaint}`, borderRadius:10, fontFamily:'var(--font-body)', fontSize:'0.9rem', color:C.textDark, background:focused?C.skyGhost:C.white, outline:'none', boxSizing:'border-box', boxShadow:focused?`0 0 0 3px rgba(0,191,255,0.1)`:'none', transition:'all 0.2s' }} />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function StorePage() {
  const { navigate } = useRouter()
  const [cart, setCart]     = useState([])
  const [screen, setScreen] = useState('store')   // 'store' | 'checkout' | 'done'
  const [method, setMethod] = useState('qr')
  const [copied, setCopied] = useState('')
  const [saving, setSaving] = useState(false)
  const [ref]               = useState(genRef)
  const [form, setForm]     = useState({ name:'', phone:'', address:'' })
  const confirmed           = useRef(false)
  const checkoutEl          = useRef(null)

  const upForm = (k, v) => setForm(f => ({ ...f, [k]:v }))
  const add    = p => setCart(c => c.find(x=>x.title===p.title) ? c : [...c,p])
  const remove = p => setCart(c => c.filter(x=>x.title!==p.title))
  const total  = cart.reduce((s,p) => s+p.num, 0)
  const feeStr = `NPR ${total.toLocaleString()}`
  const sel    = METHODS.find(m=>m.id===method)
  const formOK = form.name.trim() && form.phone.trim() && form.address.trim()

  function copy(text, id) {
    navigator.clipboard.writeText(text).catch(()=>{})
    setCopied(id)
    setTimeout(()=>setCopied(''), 2200)
  }

  function goCheckout() {
    setScreen('checkout')
    setTimeout(()=>checkoutEl.current?.scrollIntoView({ behavior:'smooth', block:'start' }), 80)
  }

  async function confirm() {
    if (confirmed.current || saving || !formOK) return
    setSaving(true)
    await new Promise(r=>setTimeout(r, 900))
    confirmed.current = true
    setSaving(false)
    setScreen('done')
    window.scrollTo({ top:0, behavior:'smooth' })
  }

  /* ══════════════════════════════════════════════
     SUCCESS SCREEN
  ══════════════════════════════════════════════ */
  if (screen === 'done') return (
    <div className="page-wrapper" style={{ background:C.skyGhost }}>
      <div style={{ maxWidth:520, margin:'0 auto', padding:'5rem 2rem' }}>
        <div style={{ background:C.white, borderRadius:24, border:`1.5px solid ${C.borderFaint}`, boxShadow:`0 8px 40px rgba(0,191,255,0.12)`, overflow:'hidden' }}>
          <div style={{ height:4, background:btnGrad }} />
          <div style={{ padding:'3rem 2.5rem', textAlign:'center' }}>

            {/* Big tick */}
            <div style={{ width:76, height:76, borderRadius:'50%', background:heroGrad, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.75rem', boxShadow:`0 8px 28px rgba(0,191,255,0.35)`, fontSize:'2rem' }}>✓</div>

            {/* Badge */}
            <div style={{ display:'inline-block', background:sectionGrad, border:`1px solid ${C.borderFaint}`, borderRadius:100, padding:'0.28rem 1rem', marginBottom:'0.9rem' }}>
              <span style={{ fontFamily:'var(--font-body)', fontSize:'0.65rem', fontWeight:800, color:C.skyDeep, letterSpacing:'0.1em', textTransform:'uppercase' }}>
                {method==='cod' ? '📦 Order Confirmed' : '💳 Payment Submitted'}
              </span>
            </div>

            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'1.9rem', color:C.textDark, marginBottom:'0.75rem', lineHeight:1.2 }}>
              {method==='cod' ? 'Order Placed!' : 'Thank You!'}
            </h2>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'0.9rem', color:C.textMid, lineHeight:1.78, marginBottom:'1.5rem' }}>
              {method==='cod'
                ? `Your order will be delivered to ${form.address}. We'll call ${form.phone} to confirm.`
                : `Thank you, ${form.name}! We'll verify your payment and dispatch to ${form.address}.`}
            </p>

            {/* Order ref */}
            <div style={{ background:sectionGrad, borderRadius:14, padding:'1rem 1.5rem', border:`1px solid ${C.borderFaint}`, marginBottom:'1.5rem' }}>
              <div style={{ fontFamily:'var(--font-body)', fontSize:'0.62rem', fontWeight:800, color:C.textLight, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.3rem' }}>Order Reference</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', color:C.skyDeep, fontWeight:700, letterSpacing:'0.05em' }}>{ref}</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize:'0.68rem', color:C.textLight, marginTop:'0.2rem' }}>Screenshot this page · Share with us to confirm payment</div>
            </div>

            {/* Items */}
            <div style={{ background:C.white, border:`1px solid ${C.borderFaint}`, borderRadius:12, padding:'0.9rem 1.1rem', marginBottom:'1.75rem', textAlign:'left' }}>
              {cart.map((p,i)=>(
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.38rem 0', borderBottom:i<cart.length-1?`1px solid ${C.borderFaint}`:'none', fontFamily:'var(--font-body)', fontSize:'0.8rem' }}>
                  <span style={{ color:C.textDark }}>{p.emoji} {p.title}</span>
                  <span style={{ color:C.skyDeep, fontWeight:700 }}>{p.price}</span>
                </div>
              ))}
              <div style={{ display:'flex', justifyContent:'space-between', paddingTop:'0.65rem', fontFamily:'var(--font-body)', fontSize:'0.88rem' }}>
                <span style={{ color:C.textLight, fontWeight:700 }}>Total Paid</span>
                <span style={{ color:C.skyDeep, fontWeight:800 }}>{feeStr}</span>
              </div>
            </div>

            <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center', flexWrap:'wrap' }}>
              <button onClick={()=>navigate('/')}
                style={{ padding:'0.7rem 1.75rem', borderRadius:12, border:'none', background:btnGrad, color:'white', fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.9rem', cursor:'pointer', boxShadow:'0 4px 16px rgba(0,191,255,0.3)' }}>
                🏠 Back to Home
              </button>
              <button onClick={()=>{ setCart([]); setScreen('store'); confirmed.current=false }}
                style={{ padding:'0.7rem 1.4rem', borderRadius:12, border:`1.5px solid ${C.border}`, background:C.white, color:C.textMid, fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.9rem', cursor:'pointer' }}>
                Shop More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  /* ══════════════════════════════════════════════
     STORE + CHECKOUT (same page)
  ══════════════════════════════════════════════ */
  return (
    <div className="page-wrapper">

      {/* ── Hero — original style kept ── */}
      <div className="page-hero" style={{ background:'var(--earth-cream)' }}>
        <span className="section-tag">Wellness Store</span>
        <h1 className="section-title">Books, Tools & <em>Workbooks</em></h1>
        <p className="section-desc">Curated resources to support your mental health journey — delivered across Nepal.</p>

        {cart.length > 0 && (
          <div style={{ marginTop:'1.5rem', display:'inline-flex', alignItems:'center', gap:'0.75rem', background: btnGrad, color:'white', padding:'0.55rem 0.6rem 0.55rem 1.2rem', borderRadius:100, fontSize:'0.88rem', fontWeight:600, boxShadow:'0 4px 18px rgba(0,191,255,0.3)' }}>
            <span>🛒 {cart.length} item{cart.length>1?'s':''} · {feeStr}</span>
            <button
              onClick={goCheckout}
              style={{ background:'white', border:'none', color:C.skyDeep, padding:'0.35rem 1.1rem', borderRadius:100, cursor:'pointer', fontSize:'0.82rem', fontWeight:800, transition:'opacity 0.18s' }}
              onMouseEnter={e=>e.currentTarget.style.opacity='0.88'}
              onMouseLeave={e=>e.currentTarget.style.opacity='1'}
            >Checkout →</button>
          </div>
        )}
      </div>

      {/* ── Products grid — original layout ── */}
      <div className="section" style={{ background:'var(--white)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}>
          {products.map((p,i) => {
            const inCart = !!cart.find(x=>x.title===p.title)
            return (
              <div key={i}
                style={{ background: inCart ? C.skyFainter : 'var(--off-white)', borderRadius:'var(--radius-lg)', border:`1.5px solid ${inCart?C.skyBright:'var(--earth-cream)'}`, overflow:'hidden', transition:'all 0.25s', opacity:p.stock?1:0.7, boxShadow:inCart?`0 4px 20px rgba(0,191,255,0.12)`:'none' }}
                onMouseEnter={e=>p.stock&&(e.currentTarget.style.transform='translateY(-4px)')}
                onMouseLeave={e=>(e.currentTarget.style.transform='translateY(0)')}>

                {/* Product image area */}
                <div style={{ background: inCart?`linear-gradient(135deg,${C.skyFaint},${C.skyFainter})`:'var(--earth-cream)', padding:'2rem', fontSize:'3rem', textAlign:'center', borderBottom:'1px solid var(--earth-light)', position:'relative' }}>
                  {p.emoji}
                  {inCart && (
                    <div style={{ position:'absolute', top:10, right:10, width:24, height:24, borderRadius:'50%', background:btnGrad, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.65rem', color:'white', fontWeight:800, boxShadow:`0 3px 10px rgba(0,191,255,0.4)` }}>✓</div>
                  )}
                </div>

                <div style={{ padding:'1.5rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.5rem' }}>
                    <span style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--earth-warm)' }}>{p.type}</span>
                    {!p.stock && <span style={{ fontSize:'0.68rem', color:'#c0392b', fontWeight:600 }}>Out of Stock</span>}
                  </div>
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.05rem', fontWeight:600, color:'var(--green-deep)', marginBottom:'0.5rem' }}>{p.title}</h3>
                  <p style={{ fontSize:'0.82rem', color:'var(--text-light)', lineHeight:1.6, marginBottom:'1rem' }}>{p.desc}</p>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', fontWeight:700, color:'var(--green-deep)' }}>{p.price}</span>

                    {p.stock ? (
                      inCart ? (
                        <button
                          onClick={()=>remove(p)}
                          style={{ fontSize:'0.8rem', padding:'0.45rem 1rem', borderRadius:'var(--radius-sm)', border:`1.5px solid ${C.skyBright}`, background:C.skyFaint, color:C.skyDeep, fontFamily:'var(--font-body)', fontWeight:700, cursor:'pointer' }}>
                          ✓ Added · Remove
                        </button>
                      ) : (
                        <button className="btn btn-earth" style={{ fontSize:'0.8rem', padding:'0.45rem 1rem' }} onClick={()=>add(p)}>
                          Add to Cart
                        </button>
                      )
                    ) : (
                      <button className="btn btn-outline" style={{ fontSize:'0.8rem', padding:'0.45rem 1rem' }} disabled>Unavailable</button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom checkout CTA when items in cart */}
        {cart.length > 0 && screen !== 'checkout' && (
          <div style={{ marginTop:'2.5rem', display:'flex', justifyContent:'center' }}>
            <button
              onClick={goCheckout}
              style={{ padding:'0.9rem 2.5rem', borderRadius:14, border:'none', background:btnGrad, color:'white', fontFamily:'var(--font-body)', fontWeight:800, fontSize:'1rem', cursor:'pointer', boxShadow:'0 6px 24px rgba(0,191,255,0.35)', letterSpacing:'0.02em', transition:'all 0.2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 10px 32px rgba(0,191,255,0.45)' }}
              onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 6px 24px rgba(0,191,255,0.35)' }}
            >
              💳 Proceed to Checkout · {feeStr} →
            </button>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════
          INLINE CHECKOUT — appears below products on same page
      ══════════════════════════════════════════════════════════ */}
      {screen === 'checkout' && (
        <div ref={checkoutEl} style={{ background:C.skyGhost, borderTop:`3px solid ${C.skyBright}` }}>

          {/* Checkout hero strip */}
          <div style={{ background:heroGrad, padding:'2.5rem 3rem 3rem', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:-50, right:-50, width:250, height:250, borderRadius:'50%', background:'rgba(255,255,255,0.07)', pointerEvents:'none' }} />
            <div style={{ maxWidth:860, margin:'0 auto', position:'relative' }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.15)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, padding:'0.28rem 0.9rem', marginBottom:'0.85rem' }}>
                <span style={{ fontFamily:'var(--font-body)', fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.1em', color:'rgba(255,255,255,0.9)', textTransform:'uppercase' }}>💳 Secure Checkout</span>
              </div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.5rem,3vw,2.2rem)', color:'white', marginBottom:'0.4rem', lineHeight:1.2 }}>
                Complete Your Order
              </h2>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'0.9rem', color:'rgba(255,255,255,0.78)', lineHeight:1.65 }}>
                {cart.length} item{cart.length>1?'s':''} · Total {feeStr} · Delivery across Nepal
              </p>
              <button onClick={()=>setScreen('store')}
                style={{ marginTop:'1rem', fontFamily:'var(--font-body)', fontSize:'0.78rem', color:'rgba(255,255,255,0.7)', background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, padding:'0.32rem 1rem', cursor:'pointer' }}>
                ← Continue Shopping
              </button>
            </div>
          </div>

          {/* Two-column checkout body */}
          <div style={{ maxWidth:920, margin:'0 auto', padding:'2.5rem 2rem 5rem', display:'grid', gridTemplateColumns:'1fr 300px', gap:'1.75rem', alignItems:'start' }}>

            {/* ─── LEFT COLUMN ─── */}
            <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>

              {/* Order summary card */}
              <div style={{ background:C.white, borderRadius:20, border:`1px solid ${C.borderFaint}`, overflow:'hidden', boxShadow:`0 4px 24px rgba(0,191,255,0.07)` }}>
                <div style={{ padding:'0.9rem 1.5rem', background:sectionGrad, borderBottom:`1px solid ${C.borderFaint}` }}>
                  <span style={{ fontFamily:'var(--font-display)', fontSize:'0.92rem', color:C.textDark }}>Order Summary</span>
                </div>
                <div>
                  {cart.map((p,i)=>(
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.85rem', padding:'0.9rem 1.4rem', borderBottom:i<cart.length-1?`1px solid ${C.borderFaint}`:'none' }}>
                      <div style={{ width:44, height:44, borderRadius:12, background:sectionGrad, border:`1px solid ${C.borderFaint}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', flexShrink:0 }}>{p.emoji}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontFamily:'var(--font-body)', fontSize:'0.86rem', fontWeight:700, color:C.textDark }}>{p.title}</div>
                        <div style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', color:C.textLight }}>{p.type} · {p.cat}</div>
                      </div>
                      <span style={{ fontFamily:'var(--font-display)', fontSize:'0.95rem', color:C.textDark, fontWeight:700, flexShrink:0 }}>{p.price}</span>
                      <button onClick={()=>remove(p)}
                        style={{ background:'none', border:'none', color:C.textLight, cursor:'pointer', fontSize:'0.82rem', padding:'0.2rem 0.4rem', borderRadius:4, transition:'color 0.15s' }}
                        onMouseEnter={e=>e.currentTarget.style.color='#e53e3e'}
                        onMouseLeave={e=>e.currentTarget.style.color=C.textLight}>✕</button>
                    </div>
                  ))}
                </div>
                {/* Total */}
                <div style={{ padding:'0.9rem 1.4rem', background:sectionGrad, borderTop:`1px solid ${C.borderFaint}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'0.78rem', fontWeight:700, color:C.textLight, textTransform:'uppercase', letterSpacing:'0.08em' }}>Order Total</span>
                  <span style={{ fontFamily:'var(--font-display)', fontSize:'1.25rem', color:C.skyDeep, fontWeight:700 }}>{feeStr}</span>
                </div>
              </div>

              {/* Delivery details */}
              <div style={{ background:C.white, borderRadius:20, border:`1px solid ${C.borderFaint}`, overflow:'hidden', boxShadow:`0 4px 24px rgba(0,191,255,0.07)` }}>
                <div style={{ padding:'0.9rem 1.5rem', background:sectionGrad, borderBottom:`1px solid ${C.borderFaint}` }}>
                  <span style={{ fontFamily:'var(--font-display)', fontSize:'0.92rem', color:C.textDark }}>Delivery Details</span>
                </div>
                <div style={{ padding:'1.4rem 1.5rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
                  <Field label="Full Name"            required placeholder="Priya Sharma"          value={form.name}    onChange={e=>upForm('name',e.target.value)} />
                  <Field label="Phone / WhatsApp"     required placeholder="98XXXXXXXX" type="tel"  value={form.phone}   onChange={e=>upForm('phone',e.target.value)} />
                  <Field label="Delivery Address"     required placeholder="Street / Area / District" value={form.address} onChange={e=>upForm('address',e.target.value)} />
                </div>
              </div>

              {/* Payment method selector */}
              <div>
                <div style={{ fontFamily:'var(--font-body)', fontSize:'0.66rem', fontWeight:800, color:C.textLight, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>
                  Choose Payment Method
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0.65rem' }}>
                  {METHODS.map(m => (
                    <button key={m.id} onClick={()=>setMethod(m.id)} style={{
                      padding:'0.9rem 0.5rem', borderRadius:14,
                      border:`1.5px solid ${method===m.id?m.color:C.borderFaint}`,
                      background:method===m.id?m.faint:C.white,
                      cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.4rem',
                      boxShadow:method===m.id?`0 4px 14px ${m.color}33`:'none',
                      transform:method===m.id?'translateY(-2px)':'none',
                      transition:'all 0.2s ease', fontFamily:'inherit',
                    }}>
                      <span style={{ fontSize:'1.5rem' }}>{m.emoji}</span>
                      <span style={{ fontFamily:'var(--font-body)', fontSize:'0.7rem', fontWeight:method===m.id?800:600, color:method===m.id?m.color:C.textMid, textAlign:'center', lineHeight:1.2 }}>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment instructions panel */}
              <div style={{ background:C.white, borderRadius:20, border:`1px solid ${C.borderFaint}`, overflow:'hidden', boxShadow:`0 4px 24px rgba(0,191,255,0.07)` }}>
                <div style={{ padding:'0.9rem 1.5rem', background:sectionGrad, borderBottom:`1px solid ${C.borderFaint}`, display:'flex', alignItems:'center', gap:'0.5rem' }}>
                  <span style={{ fontSize:'1rem' }}>{sel.emoji}</span>
                  <span style={{ fontFamily:'var(--font-display)', fontSize:'0.92rem', color:C.textDark }}>Pay via {sel.label}</span>
                </div>
                <div style={{ padding:'1.75rem 2rem', textAlign:'center' }}>

                  {/* QR */}
                  {method === 'qr' && (
                    <>
                      <div style={{ width:190, height:190, margin:'0 auto 1.25rem', borderRadius:16, border:`2px solid ${C.borderFaint}`, background:C.white, padding:8, overflow:'hidden', boxShadow:`0 4px 20px rgba(0,191,255,0.1)` }}>
                        <img src={QR_IMAGE} alt="Scan to pay" style={{ width:'100%', height:'100%', objectFit:'contain' }}
                          onError={e=>{ e.target.parentElement.innerHTML=`<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:11px;color:#7a9aaa;text-align:center;gap:8px"><span style="font-size:2rem">📷</span><span>Add your QR to<br/>/public/images/<br/>payment-qr.png</span></div>` }} />
                      </div>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'0.86rem', color:C.textMid, lineHeight:1.78, maxWidth:380, margin:'0 auto' }}>
                        Open any bank app → <strong>Scan QR</strong> → Amount <strong style={{ color:C.skyDeep }}>{feeStr}</strong> → Remarks: <strong style={{ color:C.skyDeep }}>{ref}</strong>
                      </p>
                      <div style={{ display:'flex', gap:'0.5rem', justifyContent:'center', marginTop:'1rem', flexWrap:'wrap' }}>
                        {['Fonepay','eSewa','Khalti','ConnectIPS'].map(a=>(
                          <span key={a} style={{ fontSize:'0.68rem', fontWeight:700, padding:'3px 10px', borderRadius:100, background:C.skyFaint, color:C.skyMid, border:`1px solid ${C.borderFaint}` }}>{a}</span>
                        ))}
                      </div>
                    </>
                  )}

                  {/* eSewa */}
                  {method === 'esewa' && (
                    <>
                      <div style={{ fontSize:'3.5rem', marginBottom:'0.75rem' }}>🟢</div>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:C.textLight, marginBottom:'0.85rem' }}>Send to this eSewa ID:</p>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.75rem', marginBottom:'1rem', flexWrap:'wrap' }}>
                        <div style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', color:C.textDark, fontWeight:700, padding:'0.6rem 1.4rem', background:sectionGrad, borderRadius:12, border:`1px solid ${C.borderFaint}` }}>{ESEWA_ID}</div>
                        <CopyBtn text={ESEWA_ID} id="esewa" copied={copied} onCopy={copy} />
                      </div>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'0.83rem', color:C.textMid, lineHeight:1.78, maxWidth:380, margin:'0 auto 1rem' }}>
                        eSewa → Send Money → ID: <strong style={{ color:C.skyDeep }}>{ESEWA_ID}</strong> → Amount: <strong style={{ color:C.skyDeep }}>{feeStr}</strong> → Remarks: <strong style={{ color:C.skyDeep }}>{ref}</strong>
                      </p>
                      <a href="https://esewa.com.np" target="_blank" rel="noopener noreferrer"
                        style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'0.5rem 1.3rem', borderRadius:100, border:'1.5px solid #22c55e', color:'#22c55e', background:'#d1fae5', fontFamily:'var(--font-body)', fontSize:'0.82rem', fontWeight:700, textDecoration:'none' }}>
                        🟢 Open eSewa App →
                      </a>
                    </>
                  )}

                  {/* Khalti */}
                  {method === 'khalti' && (
                    <>
                      <div style={{ fontSize:'3.5rem', marginBottom:'0.75rem' }}>🟣</div>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:C.textLight, marginBottom:'0.85rem' }}>Send to this Khalti ID:</p>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.75rem', marginBottom:'1rem', flexWrap:'wrap' }}>
                        <div style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', color:C.textDark, fontWeight:700, padding:'0.6rem 1.4rem', background:sectionGrad, borderRadius:12, border:`1px solid ${C.borderFaint}` }}>{KHALTI_ID}</div>
                        <CopyBtn text={KHALTI_ID} id="khalti" copied={copied} onCopy={copy} />
                      </div>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'0.83rem', color:C.textMid, lineHeight:1.78, maxWidth:380, margin:'0 auto 1rem' }}>
                        Khalti → Send Money → ID: <strong style={{ color:C.skyDeep }}>{KHALTI_ID}</strong> → Amount: <strong style={{ color:C.skyDeep }}>{feeStr}</strong> → Remarks: <strong style={{ color:C.skyDeep }}>{ref}</strong>
                      </p>
                      <a href="https://khalti.com" target="_blank" rel="noopener noreferrer"
                        style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'0.5rem 1.3rem', borderRadius:100, border:'1.5px solid #a855f7', color:'#a855f7', background:'#f0e6ff', fontFamily:'var(--font-body)', fontSize:'0.82rem', fontWeight:700, textDecoration:'none' }}>
                        🟣 Open Khalti App →
                      </a>
                    </>
                  )}

                  {/* COD */}
                  {method === 'cod' && (
                    <>
                      <div style={{ fontSize:'3.5rem', marginBottom:'0.75rem' }}>💵</div>
                      <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.15rem', color:C.textDark, marginBottom:'0.75rem' }}>Cash on Delivery</h3>
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'0.88rem', color:C.textMid, lineHeight:1.82, maxWidth:340, margin:'0 auto' }}>
                        Your order is confirmed immediately. Have exactly <strong style={{ color:C.skyDeep }}>{feeStr}</strong> ready when our delivery partner arrives.
                        <br/><br/>
                        <span style={{ fontSize:'0.78rem', color:C.textLight }}>Our team will call {form.phone||'your number'} to confirm timing.</span>
                      </p>
                    </>
                  )}

                </div>
              </div>
            </div>

            {/* ─── RIGHT COLUMN — sticky summary + confirm ─── */}
            <div style={{ position:'sticky', top:'5.5rem' }}>
              <div style={{ background:C.white, borderRadius:20, border:`1px solid ${C.borderFaint}`, overflow:'hidden', boxShadow:`0 6px 32px rgba(0,191,255,0.1)` }}>

                {/* Amount header */}
                <div style={{ background:heroGrad, padding:'1.6rem', textAlign:'center', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:-30, right:-30, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,0.07)', pointerEvents:'none' }} />
                  <div style={{ fontFamily:'var(--font-body)', fontSize:'0.65rem', fontWeight:700, color:'rgba(255,255,255,0.7)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.35rem' }}>Order Total</div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'2.2rem', color:'white', fontWeight:800, lineHeight:1 }}>{feeStr}</div>
                  <div style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', color:'rgba(255,255,255,0.65)', marginTop:'0.4rem' }}>{cart.length} item{cart.length>1?'s':''}</div>
                </div>

                <div style={{ padding:'1.2rem' }}>

                  {/* Order ref */}
                  <div style={{ background:sectionGrad, borderRadius:10, padding:'0.7rem 0.9rem', marginBottom:'0.9rem', border:`1px solid ${C.borderFaint}`, display:'flex', justifyContent:'space-between', alignItems:'center', gap:'0.5rem', flexWrap:'wrap' }}>
                    <div>
                      <div style={{ fontFamily:'var(--font-body)', fontSize:'0.58rem', fontWeight:800, color:C.textLight, textTransform:'uppercase', letterSpacing:'0.09em', marginBottom:'0.12rem' }}>Order Reference</div>
                      <div style={{ fontFamily:'var(--font-display)', fontSize:'0.82rem', color:C.skyDeep, fontWeight:700, letterSpacing:'0.03em' }}>{ref}</div>
                    </div>
                    <CopyBtn text={ref} id="ref" copied={copied} onCopy={copy} />
                  </div>

                  {/* Summary rows */}
                  {[
                    ['Payment', sel.label],
                    ['Deliver to', form.address||'—'],
                    ['Contact', form.phone||'—'],
                  ].map(([k,v])=>(
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'0.4rem 0', borderBottom:`1px solid ${C.borderFaint}`, fontFamily:'var(--font-body)', fontSize:'0.78rem' }}>
                      <span style={{ color:C.textLight, fontWeight:700 }}>{k}</span>
                      <span style={{ color:C.textDark, fontWeight:600, textAlign:'right', maxWidth:'60%', wordBreak:'break-word' }}>{v}</span>
                    </div>
                  ))}

                  {/* Confirm button */}
                  <button
                    onClick={confirm}
                    disabled={saving || !formOK}
                    style={{
                      width:'100%', marginTop:'1.1rem', padding:'0.9rem 1rem',
                      borderRadius:12, border:'none',
                      background: saving||!formOK ? C.borderFaint : btnGrad,
                      color: saving||!formOK ? C.textLight : 'white',
                      fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.9rem',
                      cursor: saving||!formOK ? 'not-allowed' : 'pointer',
                      boxShadow: saving||!formOK ? 'none' : '0 6px 22px rgba(0,191,255,0.35)',
                      transition:'all 0.2s', letterSpacing:'0.02em',
                    }}
                    onMouseEnter={e=>{ if(!saving&&formOK) e.currentTarget.style.opacity='0.88' }}
                    onMouseLeave={e=>e.currentTarget.style.opacity='1'}
                  >
                    {saving         ? '⏳ Placing order…'
                    : !formOK       ? 'Fill delivery details first'
                    : method==='cod'? '✓ Confirm — Pay on Delivery'
                    :                 `✓ I've Paid — Confirm Order`}
                  </button>

                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.66rem', color:C.textLight, textAlign:'center', marginTop:'0.8rem', lineHeight:1.55 }}>
                    🔒 Secure · Delivered across Nepal<br />
                    Payment verified within 24 hrs
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}