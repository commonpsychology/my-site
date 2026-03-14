import { useRouter } from '../context/RouterContext'

const posts = [
  { emoji:'🧠', cat:'Depression', title:'5 Signs You Might Be Experiencing Depression — And What To Do', author:'Dr. Anita Shrestha', date:'Mar 10, 2025', readTime:'5 min read', excerpt:'Depression often presents in subtle ways that are easy to overlook. Understanding the signs early can make a significant difference in outcomes.', color:'var(--green-mist)' },
  { emoji:'😰', cat:'Anxiety', title:'Understanding Anxiety: Why Your Brain Is Trying to Protect You', author:'Mr. Roshan Karki', date:'Feb 28, 2025', readTime:'7 min read', excerpt:'Anxiety is not the enemy — it is your brain in overdrive. Learning to work with it rather than against it changes everything.', color:'var(--blue-mist)' },
  { emoji:'🌿', cat:'Mindfulness', title:'A Beginner\'s Guide to Mindfulness Meditation in Nepali Culture', author:'Ms. Priya Tamang', date:'Feb 15, 2025', readTime:'4 min read', excerpt:'Mindfulness has ancient roots that align beautifully with Nepali traditions. Here is how to start a sustainable practice.', color:'var(--earth-cream)' },
  { emoji:'💔', cat:'Relationships', title:'How to Set Healthy Boundaries Without Feeling Guilty', author:'Mr. Roshan Karki', date:'Jan 30, 2025', readTime:'6 min read', excerpt:'Boundaries are not walls — they are bridges to healthier, more honest relationships. This guide shows you how.', color:'var(--green-mist)' },
  { emoji:'🔥', cat:'Burnout', title:'Are You Burned Out? The Warning Signs and How to Recover', author:'Dr. Anita Shrestha', date:'Jan 18, 2025', readTime:'8 min read', excerpt:'Burnout is more than just tiredness. It affects your identity, values, and sense of purpose — and recovery takes intentional work.', color:'var(--blue-mist)' },
  { emoji:'🧒', cat:'Child Psychology', title:'Talking to Children About Mental Health: A Parent\'s Guide', author:'Ms. Priya Tamang', date:'Jan 5, 2025', readTime:'5 min read', excerpt:'Children understand more than we think. Here is how to have age-appropriate, honest conversations about emotions and mental health.', color:'var(--earth-cream)' },
]

export default function BlogPage() {
  const { navigate } = useRouter()
  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{background:'var(--white)'}}>
        <span className="section-tag">Blog & Research</span>
        <h1 className="section-title">Insights for Your <em>Wellness</em> Journey</h1>
        <p className="section-desc">Evidence-based articles written by our clinical team to support your everyday mental health.</p>
      </div>
      <div className="section" style={{background:'var(--off-white)',paddingTop:'3rem'}}>
        {/* Featured */}
        <div style={{background:'var(--white)',borderRadius:'var(--radius-xl)',overflow:'hidden',border:'1px solid var(--earth-cream)',boxShadow:'var(--shadow-soft)',display:'grid',gridTemplateColumns:'1fr 1fr',marginBottom:'3rem',cursor:'pointer'}}
          onMouseEnter={e=>e.currentTarget.style.boxShadow='var(--shadow-mid)'}
          onMouseLeave={e=>e.currentTarget.style.boxShadow='var(--shadow-soft)'}>
          <div style={{background:featured.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'5rem',minHeight:280}}>{featured.emoji}</div>
          <div style={{padding:'2.5rem'}}>
            <div style={{display:'flex',gap:'0.75rem',marginBottom:'1rem',alignItems:'center'}}>
              <span className="tag">{featured.cat}</span>
              <span style={{fontSize:'0.72rem',color:'var(--text-light)'}}>Featured</span>
            </div>
            <h2 style={{fontFamily:'var(--font-display)',fontSize:'1.4rem',fontWeight:700,color:'var(--green-deep)',lineHeight:1.3,marginBottom:'0.75rem'}}>{featured.title}</h2>
            <p style={{fontSize:'0.88rem',color:'var(--text-light)',lineHeight:1.7,marginBottom:'1.25rem'}}>{featured.excerpt}</p>
            <div style={{fontSize:'0.78rem',color:'var(--text-light)',marginBottom:'1.5rem'}}>By {featured.author} · {featured.date} · {featured.readTime}</div>
            <button className="btn btn-primary" onClick={()=>navigate('/blog')}>Read Article →</button>
          </div>
        </div>
        {/* Rest */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.5rem'}}>
          {rest.map((p,i)=>(
            <div key={i} style={{background:'var(--white)',borderRadius:'var(--radius-lg)',overflow:'hidden',border:'1px solid var(--earth-cream)',cursor:'pointer',transition:'all 0.25s'}}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'}
              onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
              <div style={{background:p.color,padding:'2rem',fontSize:'2.5rem',textAlign:'center'}}>{p.emoji}</div>
              <div style={{padding:'1.25rem'}}>
                <span className="tag" style={{marginBottom:'0.75rem',display:'inline-block'}}>{p.cat}</span>
                <h3 style={{fontFamily:'var(--font-display)',fontSize:'1rem',fontWeight:600,color:'var(--green-deep)',lineHeight:1.35,marginBottom:'0.5rem'}}>{p.title}</h3>
                <p style={{fontSize:'0.8rem',color:'var(--text-light)',lineHeight:1.6,marginBottom:'1rem'}}>{p.excerpt}</p>
                <div style={{fontSize:'0.72rem',color:'var(--text-light)',paddingTop:'0.75rem',borderTop:'1px solid var(--earth-cream)'}}>
                  {p.author} · {p.readTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}