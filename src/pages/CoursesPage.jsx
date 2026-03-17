import { useState, useRef, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { useRouter } from '../context/RouterContext'

/* ── Palette ── */
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
  green:      '#3d6b5a',
  greenLight: '#6a9e88',
}

const heroGrad    = `linear-gradient(135deg,#007BA8 0%,#009FD4 45%,#00BFFF 85%,#22d3ee 100%)`
const btnGrad     = `linear-gradient(135deg,#007BA8 0%,#00BFFF 100%)`
const sectionGrad = `linear-gradient(135deg,${C.skyFainter} 0%,${C.mint} 60%,${C.skyFaint} 100%)`

const QR_IMAGE  = '/images/payment-qr.png'
const ESEWA_ID  = '9849350088'
const KHALTI_ID = '9849350088'

const METHODS = [
  { id:'qr',     label:'QR Code',         emoji:'📷', color:C.skyBright, faint:C.skyFaint  },
  { id:'esewa',  label:'eSewa',            emoji:'🟢', color:'#22c55e',   faint:'#d1fae5'   },
  { id:'khalti', label:'Khalti',           emoji:'🟣', color:'#a855f7',   faint:'#f0e6ff'   },
  { id:'cod',    label:'Pay on Call',      emoji:'📞', color:'#f97316',   faint:'#fff7ed'   },
]

/* ── CSS injected once ── */
const COURSES_CSS = `
  @keyframes course-modal-in {
    from { opacity:0; transform:translateY(32px) scale(0.97); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes course-overlay-in {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes course-success-pop {
    0%   { transform:scale(0.7); opacity:0; }
    65%  { transform:scale(1.08); }
    100% { transform:scale(1); opacity:1; }
  }
  @keyframes course-enroll-pulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(0,191,255,0.4); }
    50%     { box-shadow: 0 0 0 8px rgba(0,191,255,0); }
  }
  @keyframes free-badge-glow {
    0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
    50%     { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
  }
  @keyframes tick-draw {
    from { stroke-dashoffset: 40; }
    to   { stroke-dashoffset: 0; }
  }

  .courses-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  .course-card {
    background: var(--off-white);
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 1.5px solid var(--earth-cream);
    box-shadow: var(--shadow-soft);
    transition: all 0.28s cubic-bezier(0.34,1.56,0.64,1);
    cursor: pointer;
    position: relative;
  }
  .course-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 48px rgba(0,123,168,0.13);
    border-color: rgba(0,191,255,0.3);
  }
  .course-card.enrolled {
    border-color: #22c55e;
    box-shadow: 0 8px 32px rgba(34,197,94,0.15);
  }
  .course-card.paid-enrolled {
    border-color: ${C.skyBright};
    box-shadow: 0 8px 32px rgba(0,191,255,0.15);
  }

  /* Modal overlay */
  .pay-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,10,20,0.65);
    backdrop-filter: blur(8px);
    z-index: 9200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    animation: course-overlay-in 0.22s ease both;
  }
  .pay-modal {
    width: min(680px, 100%);
    max-height: 90vh;
    overflow-y: auto;
    background: ${C.white};
    border-radius: 24px;
    box-shadow: 0 32px 80px rgba(0,0,0,0.4), 0 0 0 1.5px rgba(0,191,255,0.15);
    animation: course-modal-in 0.38s cubic-bezier(0.34,1.56,0.64,1) both;
    position: relative;
  }
  .pay-modal::-webkit-scrollbar { width: 4px; }
  .pay-modal::-webkit-scrollbar-track { background: transparent; }
  .pay-modal::-webkit-scrollbar-thumb { background: ${C.borderFaint}; border-radius: 4px; }

  /* Payment method buttons */
  .pay-methods-grid {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 0.6rem;
  }

  /* Success tick */
  .success-tick {
    stroke-dasharray: 40;
    stroke-dashoffset: 40;
    animation: tick-draw 0.5s 0.3s ease forwards;
  }

  /* Enrolled badge on card */
  .enrolled-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 5;
    padding: 4px 10px;
    border-radius: 100px;
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  @media (max-width: 900px) {
    .courses-grid { grid-template-columns: repeat(2,1fr); gap: 1.25rem; }
    .pay-methods-grid { grid-template-columns: repeat(2,1fr); }
  }
  @media (max-width: 600px) {
    .courses-grid { grid-template-columns: 1fr; gap: 1rem; }
    .pay-methods-grid { grid-template-columns: repeat(2,1fr); }
  }
`

function injectCSS(id, css) {
  if (typeof document === 'undefined') return
  if (document.getElementById(id)) return
  const s = document.createElement('style')
  s.id = id; s.textContent = css
  document.head.appendChild(s)
}

function genRef() {
  return `PS-EDU-${new Date().getFullYear()}-${String(Math.floor(Math.random()*90000)+10000)}`
}

/* ── Copy button ── */
function CopyBtn({ text, id, copied, onCopy }) {
  const active = copied === id
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text).catch(()=>{}); onCopy(id) }}
      style={{ padding:'0.3rem 0.85rem', borderRadius:8, border:`1.5px solid ${active?'#22c55e':C.border}`, background:active?'#d1fae5':C.white, color:active?'#065f46':C.textMid, fontFamily:'var(--font-body)', fontSize:'0.74rem', fontWeight:700, cursor:'pointer', transition:'all 0.18s', whiteSpace:'nowrap' }}>
      {active ? '✓ Copied' : '⎘ Copy'}
    </button>
  )
}

/* ── Form field ── */
function Field({ label, required, type='text', placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label style={{ display:'block', fontFamily:'var(--font-body)', fontSize:'0.64rem', fontWeight:800, color:C.textLight, textTransform:'uppercase', letterSpacing:'0.09em', marginBottom:'0.35rem' }}>
        {label}{required && <span style={{ color:C.skyBright, marginLeft:2 }}>*</span>}
      </label>
      <input
        type={type} placeholder={placeholder} value={value} onChange={onChange}
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{ width:'100%', padding:'0.72rem 1rem', border:`1.5px solid ${focused?C.skyBright:C.borderFaint}`, borderRadius:10, fontFamily:'var(--font-body)', fontSize:'0.88rem', color:C.textDark, background:focused?C.skyGhost:C.white, outline:'none', boxSizing:'border-box', boxShadow:focused?`0 0 0 3px rgba(0,191,255,0.1)`:'none', transition:'all 0.2s' }}
      />
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   PAYMENT MODAL — slides up when enrolling in a paid course
════════════════════════════════════════════════════════════ */
function PaymentModal({ course, onClose, onSuccess }) {
  const [method, setMethod] = useState('qr')
  const [copied, setCopied] = useState('')
  const [form, setForm]     = useState({ name:'', email:'', phone:'' })
  const [saving, setSaving] = useState(false)
  const [done, setDone]     = useState(false)
  // eslint-disable-next-line react-hooks/refs
  const ref                  = useRef(genRef()).current
  const sel                  = METHODS.find(m=>m.id===method)
  const formOK               = form.name.trim() && form.phone.trim()

  useEffect(() => {
    const h = (e) => { if (e.key==='Escape') onClose() }
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow='' }
  }, [onClose])

  function copy(text, id) {
    navigator.clipboard.writeText(text).catch(()=>{})
    setCopied(id)
    setTimeout(()=>setCopied(''),2200)
  }

  async function handleConfirm() {
    if (saving || !formOK) return
    setSaving(true)
    await new Promise(r=>setTimeout(r, 950))
    setSaving(false)
    setDone(true)
  }

  /* ── Success screen inside modal ── */
  if (done) return (
    <div className="pay-overlay" onClick={(e)=>{ if(e.target===e.currentTarget) { onSuccess(); onClose() } }}>
      <div className="pay-modal" style={{ maxWidth:440 }}>
        <div style={{ padding:'2.5rem 2rem', textAlign:'center' }}>

          {/* Animated checkmark */}
          <div style={{ width:80, height:80, borderRadius:'50%', background:'linear-gradient(135deg,#22c55e,#16a34a)', margin:'0 auto 1.5rem', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 28px rgba(34,197,94,0.35)', animation:'course-success-pop 0.55s ease both' }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <polyline className="success-tick" points="8,19 15,26 28,11" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div style={{ display:'inline-block', background:'#d1fae5', border:'1px solid #a7f3d0', borderRadius:100, padding:'0.28rem 1rem', marginBottom:'0.9rem' }}>
            <span style={{ fontFamily:'var(--font-body)', fontSize:'0.65rem', fontWeight:800, color:'#065f46', letterSpacing:'0.1em', textTransform:'uppercase' }}>🎓 Enrollment Confirmed</span>
          </div>

          <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', color:C.textDark, marginBottom:'0.6rem', lineHeight:1.25 }}>
            You're enrolled!
          </h3>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'0.86rem', color:C.textMid, lineHeight:1.75, marginBottom:'1.25rem' }}>
            Thank you, <strong>{form.name}</strong>! Your payment for <strong style={{ color:C.skyDeep }}>{course.title}</strong> is being verified. We'll send access details to <strong>{form.phone}</strong>.
          </p>

          <div style={{ background:sectionGrad, borderRadius:14, padding:'0.9rem 1.25rem', border:`1px solid ${C.borderFaint}`, marginBottom:'1.5rem' }}>
            <div style={{ fontFamily:'var(--font-body)', fontSize:'0.6rem', fontWeight:800, color:C.textLight, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.3rem' }}>Order Reference</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.05rem', color:C.skyDeep, fontWeight:700 }}>{ref}</div>
            <div style={{ fontFamily:'var(--font-body)', fontSize:'0.66rem', color:C.textLight, marginTop:'0.2rem' }}>Screenshot · Share to confirm payment</div>
          </div>

          <button
            onClick={()=>{ onSuccess(); onClose() }}
            style={{ padding:'0.8rem 2rem', borderRadius:12, border:'none', background:btnGrad, color:'white', fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.95rem', cursor:'pointer', boxShadow:'0 4px 18px rgba(0,191,255,0.32)', width:'100%' }}>
            Start Learning →
          </button>
        </div>
      </div>
    </div>
  )

  /* ── Payment modal ── */
  return (
    <div className="pay-overlay" onClick={(e)=>{ if(e.target===e.currentTarget) onClose() }}>
      <div className="pay-modal">

        {/* Header */}
        <div style={{ background:heroGrad, padding:'1.75rem 1.75rem 1.5rem', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-40, right:-40, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,0.07)', pointerEvents:'none' }} />

          {/* Close btn */}
          <button
            onClick={onClose}
            style={{ position:'absolute', top:14, right:14, width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.18)', border:'1px solid rgba(255,255,255,0.3)', color:'white', fontSize:'1rem', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, transition:'all 0.18s', zIndex:10 }}
            onMouseEnter={e=>{ e.currentTarget.style.background='rgba(220,38,38,0.8)'; e.currentTarget.style.transform='rotate(90deg)' }}
            onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.18)'; e.currentTarget.style.transform='rotate(0)' }}>
            ✕
          </button>

          <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.15)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, padding:'0.25rem 0.8rem', marginBottom:'0.75rem' }}>
            <span style={{ fontFamily:'var(--font-body)', fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.1em', color:'rgba(255,255,255,0.9)', textTransform:'uppercase' }}>💳 Enroll Now</span>
          </div>

          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.1rem,3vw,1.5rem)', color:'white', lineHeight:1.25, marginBottom:'0.3rem', maxWidth:'85%' }}>
            {course.title}
          </h2>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:'rgba(255,255,255,0.75)', lineHeight:1.5 }}>
            By {course.instructor} · {course.duration} · {course.lessons} lessons
          </p>
          <div style={{ marginTop:'0.85rem', display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.18)', borderRadius:100, padding:'0.38rem 1.1rem' }}>
            <span style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', color:'white', fontWeight:700 }}>{course.price}</span>
            <span style={{ fontFamily:'var(--font-body)', fontSize:'0.7rem', color:'rgba(255,255,255,0.65)' }}>one-time · lifetime access</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding:'1.5rem 1.75rem', display:'flex', flexDirection:'column', gap:'1.2rem' }}>

          {/* Student details */}
          <div>
            <div style={{ fontFamily:'var(--font-body)', fontSize:'0.63rem', fontWeight:800, color:C.textLight, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>Your Details</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              <Field label="Full Name" required placeholder="Priya Sharma" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                <Field label="Phone / WhatsApp" required placeholder="98XXXXXXXX" type="tel" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} />
                <Field label="Email (optional)" placeholder="you@email.com" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} />
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div>
            <div style={{ fontFamily:'var(--font-body)', fontSize:'0.63rem', fontWeight:800, color:C.textLight, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.65rem' }}>Payment Method</div>
            <div className="pay-methods-grid">
              {METHODS.map(m => (
                <button key={m.id} onClick={()=>setMethod(m.id)} style={{
                  padding:'0.8rem 0.4rem', borderRadius:13,
                  border:`1.5px solid ${method===m.id?m.color:C.borderFaint}`,
                  background:method===m.id?m.faint:C.white,
                  cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.3rem',
                  boxShadow:method===m.id?`0 4px 14px ${m.color}33`:'none',
                  transform:method===m.id?'translateY(-2px)':'none',
                  transition:'all 0.2s ease', fontFamily:'inherit',
                }}>
                  <span style={{ fontSize:'1.3rem' }}>{m.emoji}</span>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'0.65rem', fontWeight:method===m.id?800:600, color:method===m.id?m.color:C.textMid, textAlign:'center', lineHeight:1.2 }}>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Payment instructions */}
          <div style={{ background:C.skyFainter, borderRadius:16, border:`1.5px solid ${C.borderFaint}`, overflow:'hidden' }}>
            <div style={{ padding:'0.75rem 1.25rem', background:sectionGrad, borderBottom:`1px solid ${C.borderFaint}`, display:'flex', alignItems:'center', gap:'0.4rem' }}>
              <span>{sel.emoji}</span>
              <span style={{ fontFamily:'var(--font-display)', fontSize:'0.88rem', color:C.textDark }}>Pay via {sel.label}</span>
              <span style={{ marginLeft:'auto', fontFamily:'var(--font-body)', fontSize:'0.72rem', fontWeight:700, color:C.skyDeep }}>{course.price}</span>
            </div>

            <div style={{ padding:'1.25rem', textAlign:'center' }}>

              {method === 'qr' && (
                <>
                  <div style={{ width:160, aspectRatio:'1', margin:'0 auto 0.9rem', borderRadius:14, border:`2px solid ${C.borderFaint}`, background:C.white, padding:8, overflow:'hidden', boxShadow:`0 4px 16px rgba(0,191,255,0.1)` }}>
                    <img src={QR_IMAGE} alt="Scan to pay" style={{ width:'100%', height:'100%', objectFit:'contain' }}
                      onError={e=>{ e.target.parentElement.innerHTML=`<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:10px;color:#7a9aaa;text-align:center;gap:6px"><span style="font-size:1.8rem">📷</span><span>Add QR to /public/images/payment-qr.png</span></div>` }} />
                  </div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:C.textMid, lineHeight:1.75, maxWidth:360, margin:'0 auto' }}>
                    Open any bank app → <strong>Scan QR</strong> → Amount <strong style={{ color:C.skyDeep }}>{course.price}</strong> → Remarks: <strong style={{ color:C.skyDeep }}>{ref}</strong>
                  </p>
                  <div style={{ display:'flex', gap:'0.35rem', justifyContent:'center', marginTop:'0.75rem', flexWrap:'wrap' }}>
                    {['Fonepay','eSewa','Khalti','ConnectIPS'].map(a=>(
                      <span key={a} style={{ fontSize:'0.62rem', fontWeight:700, padding:'2px 8px', borderRadius:100, background:C.skyFaint, color:C.skyMid, border:`1px solid ${C.borderFaint}` }}>{a}</span>
                    ))}
                  </div>
                </>
              )}

              {method === 'esewa' && (
                <>
                  <div style={{ fontSize:'2.5rem', marginBottom:'0.6rem' }}>🟢</div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.76rem', color:C.textLight, marginBottom:'0.65rem' }}>Send to this eSewa ID:</p>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.6rem', marginBottom:'0.8rem', flexWrap:'wrap' }}>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', color:C.textDark, fontWeight:700, padding:'0.45rem 1.1rem', background:sectionGrad, borderRadius:10, border:`1px solid ${C.borderFaint}` }}>{ESEWA_ID}</div>
                    <CopyBtn text={ESEWA_ID} id="esewa" copied={copied} onCopy={copy} />
                  </div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.8rem', color:C.textMid, lineHeight:1.75, maxWidth:360, margin:'0 auto 0.8rem' }}>
                    eSewa → Send Money → ID: <strong style={{ color:C.skyDeep }}>{ESEWA_ID}</strong> → Amount: <strong style={{ color:C.skyDeep }}>{course.price}</strong> → Remarks: <strong style={{ color:C.skyDeep }}>{ref}</strong>
                  </p>
                  <a href="https://esewa.com.np" target="_blank" rel="noopener noreferrer"
                    style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'0.44rem 1.1rem', borderRadius:100, border:'1.5px solid #22c55e', color:'#22c55e', background:'#d1fae5', fontFamily:'var(--font-body)', fontSize:'0.8rem', fontWeight:700, textDecoration:'none' }}>
                    🟢 Open eSewa App →
                  </a>
                </>
              )}

              {method === 'khalti' && (
                <>
                  <div style={{ fontSize:'2.5rem', marginBottom:'0.6rem' }}>🟣</div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.76rem', color:C.textLight, marginBottom:'0.65rem' }}>Send to this Khalti ID:</p>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.6rem', marginBottom:'0.8rem', flexWrap:'wrap' }}>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', color:C.textDark, fontWeight:700, padding:'0.45rem 1.1rem', background:sectionGrad, borderRadius:10, border:`1px solid ${C.borderFaint}` }}>{KHALTI_ID}</div>
                    <CopyBtn text={KHALTI_ID} id="khalti" copied={copied} onCopy={copy} />
                  </div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.8rem', color:C.textMid, lineHeight:1.75, maxWidth:360, margin:'0 auto 0.8rem' }}>
                    Khalti → Send Money → ID: <strong style={{ color:C.skyDeep }}>{KHALTI_ID}</strong> → Amount: <strong style={{ color:C.skyDeep }}>{course.price}</strong> → Remarks: <strong style={{ color:C.skyDeep }}>{ref}</strong>
                  </p>
                  <a href="https://khalti.com" target="_blank" rel="noopener noreferrer"
                    style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'0.44rem 1.1rem', borderRadius:100, border:'1.5px solid #a855f7', color:'#a855f7', background:'#f0e6ff', fontFamily:'var(--font-body)', fontSize:'0.8rem', fontWeight:700, textDecoration:'none' }}>
                    🟣 Open Khalti App →
                  </a>
                </>
              )}

              {method === 'cod' && (
                <>
                  <div style={{ fontSize:'2.5rem', marginBottom:'0.6rem' }}>📞</div>
                  <h4 style={{ fontFamily:'var(--font-display)', fontSize:'1.05rem', color:C.textDark, marginBottom:'0.55rem' }}>Pay on Call</h4>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:C.textMid, lineHeight:1.8, maxWidth:340, margin:'0 auto' }}>
                    We'll call you on <strong style={{ color:C.skyDeep }}>{form.phone||'your number'}</strong> to confirm your enrollment. Have <strong style={{ color:C.skyDeep }}>{course.price}</strong> ready for online transfer at that time.
                  </p>
                </>
              )}

            </div>
          </div>

          {/* Order ref row */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:sectionGrad, borderRadius:12, padding:'0.7rem 1rem', border:`1px solid ${C.borderFaint}`, flexWrap:'wrap', gap:'0.5rem' }}>
            <div>
              <div style={{ fontFamily:'var(--font-body)', fontSize:'0.58rem', fontWeight:800, color:C.textLight, textTransform:'uppercase', letterSpacing:'0.09em' }}>Ref</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'0.85rem', color:C.skyDeep, fontWeight:700 }}>{ref}</div>
            </div>
            <CopyBtn text={ref} id="ref" copied={copied} onCopy={copy} />
          </div>

          {/* Confirm button */}
          <button
            onClick={handleConfirm}
            disabled={saving || !formOK}
            style={{
              width:'100%', padding:'0.95rem', borderRadius:14, border:'none',
              background:saving||!formOK?C.borderFaint:btnGrad,
              color:saving||!formOK?C.textLight:'white',
              fontFamily:'var(--font-body)', fontWeight:800, fontSize:'1rem',
              cursor:saving||!formOK?'not-allowed':'pointer',
              boxShadow:saving||!formOK?'none':'0 6px 22px rgba(0,191,255,0.38)',
              transition:'all 0.2s', letterSpacing:'0.02em',
              animation:!saving&&formOK?'course-enroll-pulse 2.5s ease infinite':'none',
            }}
            onMouseEnter={e=>{ if(!saving&&formOK){e.currentTarget.style.opacity='0.88'; e.currentTarget.style.animation='none'} }}
            onMouseLeave={e=>{ e.currentTarget.style.opacity='1'; if(!saving&&formOK) e.currentTarget.style.animation='course-enroll-pulse 2.5s ease infinite' }}
          >
            {saving ? '⏳ Confirming enrollment…'
             : !formOK ? 'Fill your details above'
             : method==='cod' ? '✓ Request Callback & Enroll'
             : `✓ I've Paid — Confirm Enrollment`}
          </button>

          <p style={{ fontFamily:'var(--font-body)', fontSize:'0.62rem', color:C.textLight, textAlign:'center', lineHeight:1.55 }}>
            🔒 Secure · Payment verified within 24 hrs · Lifetime access granted on confirmation
          </p>
        </div>

      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   FREE ENROLL TOAST — instant success for free courses
════════════════════════════════════════════════════════════ */
function FreeToast({ course, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div style={{
      position:'fixed', bottom:32, left:'50%', transform:'translateX(-50%)',
      zIndex:9500, animation:'course-modal-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
      maxWidth:'min(440px,92vw)', width:'100%',
    }}>
      <div style={{ background:C.white, borderRadius:18, border:`2px solid #22c55e`, boxShadow:'0 16px 48px rgba(0,0,0,0.2), 0 0 0 4px rgba(34,197,94,0.1)', padding:'1.1rem 1.4rem', display:'flex', alignItems:'center', gap:'1rem' }}>
        <div style={{ width:46, height:46, borderRadius:'50%', background:'linear-gradient(135deg,#22c55e,#16a34a)', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 14px rgba(34,197,94,0.4)', animation:'course-success-pop 0.5s ease both' }}>
          <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
            <polyline className="success-tick" points="8,19 15,26 28,11" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:'var(--font-body)', fontSize:'0.65rem', fontWeight:800, color:'#16a34a', textTransform:'uppercase', letterSpacing:'0.09em', marginBottom:'0.15rem' }}>🎓 Enrolled — Free Access!</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'0.92rem', color:C.textDark, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{course.title}</div>
          <div style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', color:C.textLight, marginTop:'0.1rem' }}>Start learning right away — no payment needed.</div>
        </div>
        <button onClick={onDone} style={{ background:'none', border:'none', color:C.textLight, cursor:'pointer', fontSize:'1rem', padding:'0.2rem', flexShrink:0, lineHeight:1 }}>✕</button>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   ILLUSTRATIONS (unchanged from original)
════════════════════════════════════════════════════════════ */
function IllustrationMindfulness() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
      <rect width="80" height="80" rx="16" fill="#e8f3ee"/>
      <circle cx="40" cy="38" r="16" fill="none" stroke="#3d6b5a" strokeWidth="2.5"/>
      <path d="M40 22 L40 16" stroke="#ffd54f" strokeWidth="2" strokeLinecap="round"/>
      <path d="M54 28 L58 24" stroke="#ffd54f" strokeWidth="2" strokeLinecap="round"/>
      <path d="M56 40 L62 40" stroke="#ffd54f" strokeWidth="2" strokeLinecap="round"/>
      <path d="M26 28 L22 24" stroke="#ffd54f" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 40 L18 40" stroke="#ffd54f" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="40" cy="38" r="6" fill="#6a9e88"/>
      <circle cx="40" cy="38" r="2.5" fill="white"/>
      <path d="M32 52 Q40 60 48 52" fill="none" stroke="#b8d5c8" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}
function IllustrationCBT() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
      <rect width="80" height="80" rx="16" fill="#e6f2f8"/>
      <ellipse cx="40" cy="30" rx="20" ry="14" fill="white" stroke="#5b9ab5" strokeWidth="2"/>
      <text x="28" y="34" fontFamily="sans-serif" fontSize="11" fill="#e57373" fontWeight="bold">✗</text>
      <text x="44" y="34" fontFamily="sans-serif" fontSize="11" fill="#81c784" fontWeight="bold">✓</text>
      <line x1="37" y1="30" x2="42" y2="30" stroke="#5b9ab5" strokeWidth="1.5"/>
      <circle cx="34" cy="46" r="3" fill="white" stroke="#5b9ab5" strokeWidth="1.5"/>
      <circle cx="30" cy="52" r="2" fill="white" stroke="#5b9ab5" strokeWidth="1.5"/>
      <circle cx="27" cy="57" r="1.5" fill="white" stroke="#5b9ab5" strokeWidth="1.5"/>
      <circle cx="40" cy="65" r="6" fill="#f5cba7" stroke="#d4b896" strokeWidth="1.5"/>
      <ellipse cx="40" cy="73" rx="8" ry="4" fill="#5b9ab5"/>
    </svg>
  )
}
function IllustrationResilience() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
      <rect width="80" height="80" rx="16" fill="#f5ede0"/>
      <rect x="36" y="55" width="8" height="14" rx="3" fill="#6b4f35"/>
      <ellipse cx="40" cy="55" rx="12" ry="8" fill="#3d6b5a"/>
      <ellipse cx="28" cy="48" rx="9" ry="6" fill="#6a9e88"/>
      <ellipse cx="52" cy="44" rx="9" ry="6" fill="#6a9e88"/>
      <ellipse cx="40" cy="38" rx="10" ry="7" fill="#3d6b5a"/>
      <ellipse cx="40" cy="28" rx="7" ry="5" fill="#6a9e88"/>
      <ellipse cx="40" cy="22" rx="5" ry="4" fill="#3d6b5a"/>
      <circle cx="40" cy="18" r="3" fill="#ffd54f"/>
    </svg>
  )
}
function IllustrationSleep() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
      <rect width="80" height="80" rx="16" fill="#e8f3ee"/>
      <path d="M50 20 C42 22, 36 30, 38 40 C40 50, 50 56, 58 52 C48 54, 40 46, 40 36 C40 28 44 22 50 20Z" fill="#ffd54f"/>
      <circle cx="22" cy="26" r="2" fill="#ffd54f"/>
      <circle cx="30" cy="18" r="1.5" fill="#ffd54f"/>
      <circle cx="18" cy="38" r="1" fill="#ffd54f"/>
      <text x="16" y="58" fontFamily="sans-serif" fontSize="10" fill="#5b9ab5" fontWeight="bold" opacity="0.8">z</text>
      <text x="24" y="50" fontFamily="sans-serif" fontSize="8" fill="#5b9ab5" fontWeight="bold" opacity="0.6">z</text>
      <text x="30" y="44" fontFamily="sans-serif" fontSize="6" fill="#5b9ab5" fontWeight="bold" opacity="0.4">z</text>
      <rect x="10" y="60" width="60" height="14" rx="7" fill="#b0d4e8"/>
      <ellipse cx="40" cy="60" rx="18" ry="5" fill="#e6f2f8"/>
    </svg>
  )
}
function IllustrationWorkplace() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
      <rect width="80" height="80" rx="16" fill="#e6f2f8"/>
      <rect x="10" y="52" width="60" height="6" rx="3" fill="#6b4f35"/>
      <rect x="16" y="58" width="5" height="16" rx="2" fill="#6b4f35"/>
      <rect x="59" y="58" width="5" height="16" rx="2" fill="#6b4f35"/>
      <rect x="24" y="38" width="32" height="18" rx="3" fill="#2e6080"/>
      <rect x="26" y="40" width="28" height="13" rx="2" fill="#e6f2f8"/>
      <rect x="20" y="56" width="40" height="3" rx="1.5" fill="#1a3a4a"/>
      <rect x="30" y="48" width="4" height="5" rx="1" fill="#5b9ab5"/>
      <rect x="36" y="44" width="4" height="9" rx="1" fill="#00BFFF"/>
      <rect x="42" y="46" width="4" height="7" rx="1" fill="#5b9ab5"/>
      <circle cx="40" cy="26" r="7" fill="#f5cba7" stroke="#d4b896" strokeWidth="1.2"/>
      <path d="M33 37 C33 31, 47 31, 47 37" fill="#3d6b5a"/>
    </svg>
  )
}
function IllustrationRelationships() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
      <rect width="80" height="80" rx="16" fill="#f5ede0"/>
      <circle cx="28" cy="25" r="8" fill="#f5cba7" stroke="#d4b896" strokeWidth="1.5"/>
      <circle cx="52" cy="25" r="8" fill="#f5cba7" stroke="#d4b896" strokeWidth="1.5"/>
      <path d="M20 50 C20 40, 36 40, 36 50 L36 70 L20 70 Z" fill="#e91e63" opacity="0.8"/>
      <path d="M44 50 C44 40, 60 40, 60 50 L60 70 L44 70 Z" fill="#3d6b5a"/>
      <path d="M36 58 Q40 55 44 58" fill="none" stroke="#f5cba7" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M40 18 C40 16, 37 14.5, 37 17 C37 19 40 21 40 21 C40 21 43 19 43 17 C43 14.5 40 16 40 18Z" fill="#e53935"/>
    </svg>
  )
}

const courses = [
  { illustration:<IllustrationMindfulness/>, title:'Mindfulness-Based Stress Reduction', instructor:'Dr. Anita Shrestha', level:'Beginner',     duration:'8 hrs', lessons:24, price:'NPR 1,500', num:1500, free:false, tags:['Mindfulness','Stress','Meditation'],   color:'var(--green-mist)' },
  { illustration:<IllustrationCBT/>,         title:'Overcoming Anxiety: A CBT Approach',  instructor:'Mr. Roshan Karki',   level:'Intermediate', duration:'6 hrs', lessons:18, price:'FREE',      num:0,    free:true,  tags:['Anxiety','CBT','Skills'],              color:'var(--blue-mist)'  },
  { illustration:<IllustrationResilience/>,  title:'Building Emotional Resilience',        instructor:'Ms. Priya Tamang',   level:'Beginner',     duration:'5 hrs', lessons:15, price:'NPR 1,200', num:1200, free:false, tags:['Resilience','Emotions','Wellbeing'],   color:'var(--earth-cream)'},
  { illustration:<IllustrationSleep/>,       title:'Sleep Better: CBT for Insomnia',       instructor:'Dr. Anita Shrestha', level:'Beginner',     duration:'4 hrs', lessons:12, price:'NPR 800',   num:800,  free:false, tags:['Sleep','Insomnia','CBT'],              color:'var(--green-mist)' },
  { illustration:<IllustrationWorkplace/>,   title:'Workplace Mental Health',              instructor:'Mr. Roshan Karki',   level:'Advanced',     duration:'7 hrs', lessons:21, price:'FREE',      num:0,    free:true,  tags:['Work','Burnout','Boundaries'],          color:'var(--blue-mist)'  },
  { illustration:<IllustrationRelationships/>,title:'Healthy Relationships Workshop',      instructor:'Ms. Priya Tamang',   level:'Intermediate', duration:'5 hrs', lessons:16, price:'NPR 1,000', num:1000, free:false, tags:['Relationships','Communication','Boundaries'], color:'var(--earth-cream)'},
]

const levelColor = { Beginner:'var(--green-deep)', Intermediate:'var(--blue-mid)', Advanced:'var(--earth-mid)' }

/* ════════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════════ */
export default function CoursesPage() {
  useEffect(() => { injectCSS('courses-css', COURSES_CSS) }, [])

  // Track which courses are enrolled (by index)
  const [enrolled, setEnrolled]   = useState(new Set())
  // Currently open payment modal
  const [payTarget, setPayTarget] = useState(null)   // course object | null
  // Free toast
  const [freeToast, setFreeToast] = useState(null)   // course object | null

  function handleEnroll(course, idx) {
    if (enrolled.has(idx)) return  // already enrolled — do nothing

    if (course.free) {
      // Instant enroll for free courses
      setEnrolled(prev => new Set([...prev, idx]))
      setFreeToast(course)
    } else {
      // Open payment modal for paid courses
      setPayTarget({ course, idx })
    }
  }

  function handlePaySuccess() {
    if (!payTarget) return
    setEnrolled(prev => new Set([...prev, payTarget.idx]))
    setPayTarget(null)
  }

  return (
    <div className="page-wrapper">

      {/* ── Hero ── */}
      <div className="page-hero" style={{ background:'var(--earth-cream)' }}>
        <span className="section-tag">Online Learning</span>
        <h1 className="section-title">Trainings for <em>Every</em> Journey</h1>
        <p className="section-desc">Self-paced, expert-led programs designed to support your mental wellness from home.</p>

        {/* Enrolled count pill */}
        {enrolled.size > 0 && (
          <div style={{ marginTop:'1.25rem', display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#22c55e,#16a34a)', color:'white', padding:'0.5rem 1.2rem', borderRadius:100, fontFamily:'var(--font-body)', fontSize:'0.82rem', fontWeight:700, boxShadow:'0 4px 18px rgba(34,197,94,0.35)' }}>
            🎓 {enrolled.size} course{enrolled.size>1?'s':''} enrolled — start learning!
          </div>
        )}
      </div>

      {/* ── Courses grid ── */}
      <div className="section" style={{ background:'var(--white)' }}>
        <div className="courses-grid">
          {courses.map((c, i) => {
            const isEnrolled = enrolled.has(i)
            return (
              <div
                key={i}
                className={`course-card${isEnrolled?(c.free?' enrolled':' paid-enrolled'):''}`}
              >
                {/* Enrolled badge */}
                {isEnrolled && (
                  <div className="enrolled-badge" style={{ background:c.free?'#d1fae5':C.skyFaint, color:c.free?'#065f46':C.skyDeep, border:`1.5px solid ${c.free?'#a7f3d0':C.border}` }}>
                    {c.free ? '✓ Enrolled Free' : '✓ Enrolled'}
                  </div>
                )}

                {/* Illustration header */}
                <div style={{ background:isEnrolled?(c.free?'linear-gradient(135deg,#d1fae5,#a7f3d0)':sectionGrad):c.color, padding:'2rem', display:'flex', alignItems:'center', justifyContent:'center', height:110, transition:'background 0.4s ease', position:'relative' }}>
                  {c.illustration}
                  {/* shimmer strip on enrolled */}
                  {isEnrolled && <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(255,255,255,0.15),transparent)', pointerEvents:'none' }} />}
                </div>

                <div style={{ padding:'1.5rem' }}>
                  {/* Level + price row */}
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
                    <span style={{ fontSize:'0.72rem', fontWeight:800, letterSpacing:'0.06em', textTransform:'uppercase', color:levelColor[c.level] }}>{c.level}</span>
                    {c.free
                      ? <span style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', fontWeight:800, padding:'3px 10px', borderRadius:100, background:'#d1fae5', color:'#065f46', border:'1.5px solid #a7f3d0', animation:'free-badge-glow 2.5s ease infinite' }}>FREE</span>
                      : <span style={{ fontFamily:'var(--font-display)', fontWeight:700, color:isEnrolled?C.skyDeep:'var(--green-deep)', fontSize:'0.95rem' }}>{c.price}</span>
                    }
                  </div>

                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.05rem', fontWeight:400, color:'var(--green-deep)', marginBottom:'0.5rem', lineHeight:1.3 }}>{c.title}</h3>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.8rem', color:'var(--text-light)', marginBottom:'0.75rem' }}>By {c.instructor}</p>

                  <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'1rem' }}>
                    {c.tags.map((t, j) => <span key={j} className="tag" style={{ fontSize:'0.68rem' }}>{t}</span>)}
                  </div>

                  <div style={{ display:'flex', gap:'1rem', fontSize:'0.78rem', color:'var(--text-light)', padding:'0.75rem 0', borderTop:'1px solid var(--earth-cream)', marginBottom:'1rem' }}>
                    <span>📚 {c.lessons} lessons</span>
                    <span>⏱ {c.duration}</span>
                  </div>

                  {/* ── THE SMART BUTTON ── */}
                  {isEnrolled ? (
                    /* Already enrolled → "Go to Course" */
                    <button
                      style={{ width:'100%', padding:'0.72rem', borderRadius:12, border:`2px solid ${c.free?'#22c55e':C.skyBright}`, background:c.free?'#d1fae5':C.skyFainter, color:c.free?'#065f46':C.skyDeep, fontFamily:'var(--font-body)', fontWeight:800, fontSize:'0.88rem', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6, transition:'all 0.2s' }}
                      onMouseEnter={e=>{ e.currentTarget.style.background=c.free?'#a7f3d0':C.skyFaint }}
                      onMouseLeave={e=>{ e.currentTarget.style.background=c.free?'#d1fae5':C.skyFainter }}>
                      ▶ Go to Course
                    </button>
                  ) : c.free ? (
                    /* Free → instant green enroll button */
                    <button
                      className="btn"
                      style={{ width:'100%', justifyContent:'center', background:'linear-gradient(135deg,#22c55e,#16a34a)', border:'none', color:'white', fontWeight:800, boxShadow:'0 4px 16px rgba(34,197,94,0.35)', animation:'free-badge-glow 2.5s ease infinite' }}
                      onClick={()=>handleEnroll(c,i)}>
                      🎓 Enroll Free →
                    </button>
                  ) : (
                    /* Paid → open payment modal */
                    <button
                      className="btn btn-primary"
                      style={{ width:'100%', justifyContent:'center', animation:'course-enroll-pulse 3s ease infinite' }}
                      onClick={()=>handleEnroll(c,i)}>
                      💳 Enroll Now — {c.price} →
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Payment modal (paid courses) ── */}
      {payTarget && (
        <PaymentModal
          course={payTarget.course}
          onClose={()=>setPayTarget(null)}
          onSuccess={handlePaySuccess}
        />
      )}

      {/* ── Free enrollment toast ── */}
      {freeToast && (
        <FreeToast
          course={freeToast}
          onDone={()=>setFreeToast(null)}
        />
      )}

    </div>
  )
}