// src/components/Therapists.jsx
import { useState } from 'react'
import { useRouter } from '../context/RouterContext'
import { useTherapists } from '../context/TherapistsContext'

function Avatar({ name, size = 88 }) {
  const initials = (name || 'T').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const PALETTES = [
    { bg: 'linear-gradient(135deg,#c8e6c9,#a5d6a7)', c: '#1b5e20' },
    { bg: 'linear-gradient(135deg,#bbdefb,#90caf9)',  c: '#0d47a1' },
    { bg: 'linear-gradient(135deg,#f8bbd0,#f48fb1)',  c: '#880e4f' },
    { bg: 'linear-gradient(135deg,#fff9c4,#fff176)',   c: '#f57f17' },
    { bg: 'linear-gradient(135deg,#d1c4e9,#b39ddb)',   c: '#4a148c' },
    { bg: 'linear-gradient(135deg,#b2dfdb,#80cbc4)',   c: '#004d40' },
  ]
  const p = PALETTES[(name?.charCodeAt(0) || 0) % PALETTES.length]
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: p.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-display)', fontWeight: 800,
      fontSize: size * 0.3, color: p.c, flexShrink: 0,
      boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
    }}>{initials}</div>
  )
}

function cleanUrl(raw) {
  if (!raw) return null
  return String(raw).trim().replace(/^["']+|["']+$/g, '') || null
}

function Stars({ rating }) {
  const r = Math.round(Number(rating) * 2) / 2
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i <= r ? '#f59e0b' : '#e2e8f0'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#78716c', marginLeft: 3 }}>
        {Number(rating || 0).toFixed(1)}
      </span>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
      <div style={{ height: 220, background: 'linear-gradient(90deg,#f0f4f8 25%,#e2e8f0 50%,#f0f4f8 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }}/>
      <div style={{ padding: '1.5rem' }}>
        {[['60%','1rem'],['45%','0.75rem'],['100%','2.5rem'],['80%','0.75rem']].map(([w,h],i) => (
          <div key={i} style={{ height: h, width: w, background: '#f0f4f8', borderRadius: 8, marginBottom: '0.65rem', animation: 'shimmer 1.4s infinite' }}/>
        ))}
      </div>
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </div>
  )
}

export default function Therapists() {
  const { navigate } = useRouter()
  const { therapists, loading } = useTherapists()
  const list = therapists.filter(t => t.is_available).slice(0, 3)

  return (
    <section style={{ background: 'linear-gradient(180deg,#f8fafc 0%,#f0f9ff 50%,#f8fafc 100%)', padding: 'clamp(3rem,8vw,6rem) clamp(1rem,5vw,4rem)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position:'absolute', top:-120, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(14,165,233,0.06) 0%,transparent 70%)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(16,185,129,0.06) 0%,transparent 70%)', pointerEvents:'none' }}/>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'clamp(2rem,5vw,3.5rem)', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'linear-gradient(135deg,#e0f2fe,#d1fae5)', border:'1px solid #bae6fd', borderRadius:100, padding:'0.3rem 1rem', marginBottom:'0.85rem' }}>
              <span style={{ fontSize:'0.68rem', fontWeight:800, letterSpacing:'0.1em', color:'#0369a1', textTransform:'uppercase' }}>👩‍⚕️ Our Team</span>
            </div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.75rem,4vw,2.6rem)', color:'#1e293b', lineHeight:1.2, margin:0 }}>
              Meet Our <em style={{ fontStyle:'normal', color:'#0ea5e9' }}>Therapists</em>
            </h2>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'clamp(0.88rem,2vw,1rem)', color:'#64748b', marginTop:'0.65rem', maxWidth:500, lineHeight:1.75 }}>
              Licensed, experienced professionals trained in culturally sensitive mental health care for Nepal.
            </p>
          </div>
          <button onClick={() => navigate('/therapists')}
            style={{ padding:'0.7rem 1.75rem', borderRadius:12, border:'2px solid #0ea5e9', background:'transparent', color:'#0369a1', fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.9rem', cursor:'pointer', transition:'all 0.2s', whiteSpace:'nowrap' }}
            onMouseEnter={e => { e.currentTarget.style.background='#0ea5e9'; e.currentTarget.style.color='white' }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#0369a1' }}>
            View All Therapists →
          </button>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap:'clamp(1rem,3vw,1.75rem)' }}>
          {loading
            ? [0,1,2].map(i => <SkeletonCard key={i}/>)
            : list.length === 0
              ? <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'4rem 2rem', color:'#94a3b8' }}>
                  <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>👩‍⚕️</div>
                  <p style={{ fontFamily:'var(--font-body)' }}>Therapist profiles coming soon.</p>
                </div>
              : list.map(t => <TherapistCard key={t.id} therapist={t} onNavigate={navigate}/>)
          }
        </div>

        {!loading && list.length > 0 && (
          <div style={{ textAlign:'center', marginTop:'clamp(2rem,5vw,3.5rem)' }}>
            <button onClick={() => navigate('/book')}
              style={{ padding:'0.95rem 3rem', borderRadius:14, border:'none', background:'linear-gradient(135deg,#0369a1 0%,#0ea5e9 100%)', color:'white', fontFamily:'var(--font-body)', fontWeight:800, fontSize:'1rem', cursor:'pointer', boxShadow:'0 8px 28px rgba(14,165,233,0.35)', transition:'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='none' }}>
              📅 Book a Session Now
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function TherapistCard({ therapist: t, onNavigate }) {
  const [hovered, setHovered] = useState(false)
  const [imgErr,  setImgErr]  = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background:'#fff', borderRadius:24, overflow:'hidden', border:`1.5px solid ${hovered?'#7dd3fc':'#e2e8f0'}`, boxShadow:hovered?'0 20px 60px rgba(14,165,233,0.15)':'0 2px 16px rgba(0,0,0,0.05)', transform:hovered?'translateY(-6px)':'translateY(0)', transition:'all 0.3s cubic-bezier(0.34,1.56,0.64,1)', display:'flex', flexDirection:'column' }}
    >
      <div style={{ position:'relative', height:220, background:'linear-gradient(135deg,#0c4a6e 0%,#0369a1 50%,#0ea5e9 100%)', overflow:'hidden', flexShrink:0 }}>
        {cleanUrl(t.avatar_url) && !imgErr
  ? <img src={cleanUrl(t.avatar_url)} alt={t.full_name} onError={() => setImgErr(true)} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', display:'block', transition:'transform 0.4s', transform:hovered?'scale(1.04)':'scale(1)' }}/>
          : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}><Avatar name={t.full_name} size={96}/></div>
        }
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'40%', background:'linear-gradient(to top,rgba(0,0,0,0.55),transparent)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:14, left:14, display:'flex', alignItems:'center', gap:5, background:t.is_available?'rgba(16,185,129,0.9)':'rgba(100,116,139,0.85)', backdropFilter:'blur(8px)', borderRadius:100, padding:'0.28rem 0.75rem' }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:t.is_available?'#ecfdf5':'#cbd5e1', animation:t.is_available?'pulse 2s infinite':'none' }}/>
          <span style={{ fontSize:'0.65rem', fontWeight:800, color:'white', letterSpacing:'0.06em', textTransform:'uppercase' }}>{t.is_available?'Available':'Busy'}</span>
        </div>
        {t.consultation_fee && (
          <div style={{ position:'absolute', top:14, right:14, background:'rgba(255,255,255,0.18)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.3)', borderRadius:100, padding:'0.25rem 0.7rem' }}>
            <span style={{ fontSize:'0.68rem', fontWeight:700, color:'white' }}>NPR {Number(t.consultation_fee).toLocaleString()}</span>
          </div>
        )}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'0.85rem 1.1rem' }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', color:'white', fontWeight:700, textShadow:'0 1px 6px rgba(0,0,0,0.4)' }}>{t.full_name}</div>
          <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.82)', marginTop:2 }}>{t.license_type}</div>
        </div>
      </div>

      <div style={{ padding:'1.25rem 1.3rem', display:'flex', flexDirection:'column', gap:'0.85rem', flex:1 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'0.4rem' }}>
          {t.rating ? <Stars rating={t.rating}/> : <span style={{ fontSize:'0.75rem', color:'#94a3b8' }}>No reviews yet</span>}
          <span style={{ fontSize:'0.72rem', fontWeight:600, color:'#64748b' }}>
            {t.total_reviews ? `${t.total_reviews} reviews` : ''}
            {t.total_reviews && t.experience_years ? ' · ' : ''}
            {t.experience_years ? `${t.experience_years} yrs exp` : ''}
          </span>
        </div>

        {t.specializations.length > 0 && (
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.35rem' }}>
            {t.specializations.slice(0,4).map((s,i) => (
              <span key={i} style={{ fontSize:'0.68rem', fontWeight:700, padding:'0.22rem 0.65rem', borderRadius:100, background:i===0?'#e0f2fe':'#f1f5f9', color:i===0?'#0369a1':'#475569', border:`1px solid ${i===0?'#bae6fd':'#e2e8f0'}` }}>{s}</span>
            ))}
            {t.specializations.length > 4 && <span style={{ fontSize:'0.68rem', fontWeight:700, padding:'0.22rem 0.65rem', borderRadius:100, background:'#f8fafc', color:'#94a3b8', border:'1px solid #e2e8f0' }}>+{t.specializations.length-4}</span>}
          </div>
        )}

        {t.bio && (
          <p style={{ fontFamily:'var(--font-body)', fontSize:'0.8rem', color:'#64748b', lineHeight:1.65, margin:0, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{t.bio}</p>
        )}

        <div style={{ flex:1 }}/>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.6rem' }}>
          <button onClick={() => onNavigate('/book', { therapist: t._raw || t })}
            style={{ padding:'0.65rem 0.5rem', borderRadius:10, border:'none', background:hovered?'linear-gradient(135deg,#0369a1,#0ea5e9)':'linear-gradient(135deg,#0c4a6e,#0369a1)', color:'white', fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.82rem', cursor:'pointer', transition:'all 0.25s' }}>
            📅 Book Now
          </button>
          <button onClick={() => onNavigate('/therapists', { therapistId: t.id })}
            style={{ padding:'0.65rem 0.5rem', borderRadius:10, border:`1.5px solid ${hovered?'#7dd3fc':'#e2e8f0'}`, background:'transparent', color:hovered?'#0369a1':'#64748b', fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.82rem', cursor:'pointer', transition:'all 0.25s' }}>
            View Profile
          </button>
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
    </div>
  )
}
