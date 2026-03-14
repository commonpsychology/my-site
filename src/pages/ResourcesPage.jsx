import { useState } from 'react'

const allResources = [
  { type:'Worksheet', emoji:'📄', title:'Anxiety Management Worksheet', desc:'Practical CBT exercises to manage anxious thoughts and reframe negative patterns.', downloads:'1.2k', free:true, cat:'Anxiety' },
  { type:'Audio', emoji:'🎧', title:'Guided Meditation — 10 min', desc:'Calm your mind with this Nepali-language guided body scan meditation session.', downloads:'890', free:true, cat:'Mindfulness' },
  { type:'eBook', emoji:'📖', title:'Understanding Depression', desc:'A compassionate guide to understanding, accepting and navigating depression.', downloads:'650', free:false, cat:'Depression' },
  { type:'Tool', emoji:'🧩', title:'Mood Tracker Template', desc:'Daily mood logging template for consistent mental health tracking and pattern recognition.', downloads:'2.1k', free:true, cat:'Wellness' },
  { type:'Worksheet', emoji:'📝', title:'Thought Record Sheet', desc:'A CBT tool to identify and challenge unhelpful thoughts and cognitive distortions.', downloads:'940', free:true, cat:'Anxiety' },
  { type:'Audio', emoji:'🎵', title:'Sleep Relaxation Audio', desc:'A 20-minute progressive muscle relaxation audio designed for better sleep.', downloads:'760', free:true, cat:'Sleep' },
  { type:'eBook', emoji:'📚', title:'Mindful Relationships', desc:'Practical guidance for building healthier, more present relationships with loved ones.', downloads:'430', free:false, cat:'Relationships' },
  { type:'Tool', emoji:'📊', title:'Stress Audit Worksheet', desc:'Identify your top stress triggers and design a personalised coping strategy.', downloads:'1.4k', free:true, cat:'Stress' },
]

const cats = ['All','Anxiety','Depression','Mindfulness','Wellness','Sleep','Stress','Relationships']

export default function ResourcesPage() {
  const [active, setActive] = useState('All')
  
  const filtered = active === 'All' ? allResources : allResources.filter(r => r.cat === active)

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{background:'var(--blue-mist)'}}>
        <span className="section-tag">Library</span>
        <h1 className="section-title">Free <em>Wellness</em> Resources</h1>
        <p className="section-desc">Worksheets, guided audios, eBooks, and trackers — all curated by our clinical team.</p>
      </div>
      <div className="section" style={{background:'var(--off-white)'}}>
        <div style={{display:'flex',gap:'0.6rem',flexWrap:'wrap',marginBottom:'2.5rem'}}>
          {cats.map(c=>(
            <button key={c} onClick={()=>setActive(c)}
              style={{padding:'0.45rem 1.1rem',borderRadius:'100px',border:`2px solid ${active===c?'var(--blue-mid)':'var(--blue-pale)'}`,background:active===c?'var(--blue-mid)':'white',color:active===c?'white':'var(--blue-mid)',fontSize:'0.82rem',fontWeight:500,cursor:'pointer',transition:'all 0.2s'}}>
              {c}
            </button>
          ))}
        </div>
        <div className="resources-grid" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
          {filtered.map((r,i)=>(
            <div key={i} className="resource-card" style={{cursor:'pointer'}}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'}
              onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
              <span className="resource-type">{r.type}</span>
              <div className="resource-emoji">{r.emoji}</div>
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
              <div className="resource-meta">
                <span>{r.downloads} downloads</span>
                <span className={r.free?'resource-free':''}>{r.free?'FREE':'Premium'}</span>
              </div>
              <button className="btn btn-outline" style={{width:'100%',marginTop:'1rem',justifyContent:'center',fontSize:'0.8rem'}}>
                {r.free ? '⬇ Download Free' : '🔒 Get Premium'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}