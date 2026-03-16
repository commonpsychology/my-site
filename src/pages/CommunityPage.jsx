import { useState } from 'react'
import { useRouter } from '../context/RouterContext'

const GROUPS = [
  { id:1, name:'Anxiety & Stress Support', emoji:'😰', members:142, posts:38, desc:'A safe space for sharing experiences with anxiety, panic, and stress management techniques.', color:'var(--blue-mist)', tags:['Anxiety','Stress','Panic'] },
  { id:2, name:'Depression Recovery Circle', emoji:'🌱', members:98, posts:24, desc:'Peer support and shared stories from those navigating depression. Moderated by a licensed counselor.', color:'var(--green-mist)', tags:['Depression','Recovery','Hope'] },
  { id:3, name:'Family & Relationship Issues', emoji:'👨‍👩‍👧', members:76, posts:19, desc:'Discuss family conflict, communication challenges, and relationship patterns in a confidential setting.', color:'var(--earth-cream)', tags:['Family','Relationships','Communication'] },
  { id:4, name:'Student Mental Health', emoji:'🎓', members:213, posts:55, desc:'For students dealing with academic pressure, exam stress, career anxiety, and campus life challenges.', color:'var(--sky-light)', tags:['Students','Stress','Academic'] },
  { id:5, name:'Grief & Loss', emoji:'💙', members:54, posts:12, desc:'A gentle space for those processing loss — of loved ones, relationships, or life transitions.', color:'var(--blue-mist)', tags:['Grief','Loss','Healing'] },
  { id:6, name:'Mindfulness & Wellness', emoji:'🧘', members:187, posts:44, desc:'Share mindfulness practices, meditation experiences, and everyday wellness strategies.', color:'var(--green-mist)', tags:['Mindfulness','Wellness','Meditation'] },
]

const ANNOUNCEMENTS = [
  { title:'Group Therapy — Anxiety Management', date:'Wed 18 Jun · 6:00 PM', mode:'Online (Zoom)', facilitator:'Dr. Anita Shrestha', spots:4 },
  { title:'Mindfulness Circle — Weekly Session', date:'Fri 20 Jun · 5:30 PM', mode:'In-Person, Kathmandu', facilitator:'Ms. Priya Tamang', spots:8 },
  { title:'Student Stress Workshop', date:'Sat 21 Jun · 10:00 AM', mode:'Online (Zoom)', facilitator:'Mr. Roshan Karki', spots:12 },
]

const RECENT_POSTS = [
  { group:'Anxiety & Stress Support', author:'Anonymous', time:'2h ago', text:"I tried the 4-7-8 breathing technique during my presentation today and it actually worked. First time I didn't freeze up!", likes:14, replies:6 },
  { group:'Student Mental Health', author:'Student23', time:'5h ago', text:"Exam week is brutal. Anyone else feeling completely overwhelmed? How do you all manage?", likes:22, replies:11 },
  { group:'Depression Recovery Circle', author:'HealingSlowly', time:'1d ago', text:"100 days of consistently taking my medication. Small win but I'm proud of it.", likes:48, replies:18 },
]

export default function CommunityPage() {
  const { navigate } = useRouter()
  const [joined, setJoined] = useState([])
  const [activeTab, setActiveTab] = useState('groups')

  function toggleJoin(id) {
    setJoined(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id])
  }

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ background:'var(--sky-light)' }}>
        <span className="section-tag">Community</span>
        <h1 className="section-title">You Are Not <em>Alone</em></h1>
        <p className="section-desc">Connect with peers, share your journey, and find support in moderated community spaces. All groups are facilitated by our clinical team.</p>
        <div style={{ display:'flex', gap:'0.75rem', marginTop:'1.5rem', alignItems:'center' }}>
          <div style={{ display:'flex', gap:4 }}>
            {['😊','🙂','😄','🌱','💙'].map((e,i)=>(
              <span key={i} style={{ width:32, height:32, borderRadius:'50%', background:'var(--white)', border:'2px solid var(--blue-pale)', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:'0.9rem', marginLeft: i>0?-8:0 }}>{e}</span>
            ))}
          </div>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:'var(--text-mid)' }}>
            <strong>770+ members</strong> actively supporting each other
          </span>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background:'var(--white)', borderBottom:'1px solid var(--blue-pale)', padding:'0 6rem', display:'flex', gap:0 }}>
        {[['groups','Support Groups'],['announcements','Group Sessions'],['feed','Recent Posts']].map(([id,label])=>(
          <button key={id} onClick={()=>setActiveTab(id)} style={{
            padding:'1rem 1.5rem', border:'none', background:'none',
            fontFamily:'var(--font-body)', fontSize:'0.85rem', fontWeight: activeTab===id ? 700 : 500,
            color: activeTab===id ? 'var(--sky)' : 'var(--text-light)',
            borderBottom: activeTab===id ? '2.5px solid var(--sky)' : '2.5px solid transparent',
            cursor:'pointer', transition:'all 0.2s',
          }}>{label}</button>
        ))}
      </div>

      <div className="section" style={{ background:'var(--off-white)', paddingTop:'3rem' }}>

        {/* GROUPS */}
        {activeTab === 'groups' && (
          <div>
            <div style={{ background:'rgba(0,191,255,0.08)', border:'1px solid var(--blue-pale)', borderRadius:'var(--radius-md)', padding:'1rem 1.5rem', marginBottom:'2rem', display:'flex', gap:'0.75rem', alignItems:'center' }}>
              <span style={{ fontSize:'1.2rem' }}>🛡️</span>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:'var(--blue-deep)', margin:0 }}>
                All community spaces are <strong>moderated by licensed professionals</strong>. Anonymous participation is supported. Please read our <a href="#" style={{ color:'var(--sky)' }}>Community Guidelines</a> before posting.
              </p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}>
              {GROUPS.map(g=>(
                <div key={g.id} style={{ background:'var(--white)', borderRadius:'var(--radius-lg)', overflow:'hidden', border:'1px solid var(--blue-pale)', boxShadow:'var(--shadow-soft)', transition:'all 0.25s' }}
                  onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
                >
                  <div style={{ background:g.color, padding:'1.5rem', fontSize:'2.5rem', textAlign:'center' }}>{g.emoji}</div>
                  <div style={{ padding:'1.25rem' }}>
                    <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1rem', color:'var(--blue-deep)', marginBottom:'0.4rem' }}>{g.name}</h3>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'0.8rem', color:'var(--text-light)', lineHeight:1.6, marginBottom:'0.75rem' }}>{g.desc}</p>
                    <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginBottom:'0.75rem' }}>
                      {g.tags.map((t,j)=><span key={j} className="tag" style={{ fontSize:'0.65rem' }}>{t}</span>)}
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
                      <span style={{ fontFamily:'var(--font-body)', fontSize:'0.75rem', color:'var(--text-light)' }}>👥 {g.members} members · 💬 {g.posts} posts</span>
                    </div>
                    <button
                      className={joined.includes(g.id) ? 'btn btn-earth' : 'btn btn-primary'}
                      style={{ width:'100%', justifyContent:'center' }}
                      onClick={()=>toggleJoin(g.id)}
                    >
                      {joined.includes(g.id) ? '✓ Joined' : 'Join Group'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', color:'var(--blue-deep)', marginBottom:'1.5rem' }}>Upcoming Group Therapy Sessions</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
              {ANNOUNCEMENTS.map((a,i)=>(
                <div key={i} style={{ background:'var(--white)', borderRadius:'var(--radius-lg)', padding:'1.75rem', border:'1px solid var(--blue-pale)', boxShadow:'var(--shadow-soft)', display:'grid', gridTemplateColumns:'1fr auto', gap:'1.5rem', alignItems:'center' }}>
                  <div>
                    <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', color:'var(--blue-deep)', marginBottom:'0.4rem' }}>{a.title}</h3>
                    <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap' }}>
                      <span style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:'var(--text-light)' }}>📅 {a.date}</span>
                      <span style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:'var(--text-light)' }}>💻 {a.mode}</span>
                      <span style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:'var(--text-light)' }}>👤 {a.facilitator}</span>
                    </div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontFamily:'var(--font-body)', fontSize:'0.78rem', color:'var(--earth-warm)', fontWeight:700, marginBottom:'0.5rem' }}>{a.spots} spots left</div>
                    <button className="btn btn-primary" onClick={()=>navigate('/book')}>Reserve Spot →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FEED */}
        {activeTab === 'feed' && (
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', color:'var(--blue-deep)', marginBottom:'1.5rem' }}>Recent Community Posts</div>
            <div style={{ background:'rgba(0,191,255,0.06)', border:'1px solid var(--blue-pale)', borderRadius:'var(--radius-md)', padding:'1rem 1.5rem', marginBottom:'2rem', fontSize:'0.82rem', color:'var(--blue-mid)' }}>
              💡 All posts are anonymous by default. Your privacy is protected. Please be kind and supportive.
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
              {RECENT_POSTS.map((p,i)=>(
                <div key={i} style={{ background:'var(--white)', borderRadius:'var(--radius-lg)', padding:'1.5rem', border:'1px solid var(--blue-pale)' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.75rem', alignItems:'center' }}>
                    <div style={{ display:'flex', gap:'0.5rem', alignItems:'center' }}>
                      <div style={{ width:34, height:34, borderRadius:'50%', background:'var(--sky-light)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.9rem' }}>😊</div>
                      <div>
                        <div style={{ fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.82rem', color:'var(--blue-deep)' }}>{p.author}</div>
                        <div style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', color:'var(--text-light)' }}>{p.group} · {p.time}</div>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.9rem', color:'var(--text-mid)', lineHeight:1.7, marginBottom:'1rem' }}>{p.text}</p>
                  <div style={{ display:'flex', gap:'1rem' }}>
                    <button style={{ border:'none', background:'none', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:'0.8rem', color:'var(--text-light)', display:'flex', alignItems:'center', gap:4 }}>❤️ {p.likes}</button>
                    <button style={{ border:'none', background:'none', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:'0.8rem', color:'var(--text-light)', display:'flex', alignItems:'center', gap:4 }}>💬 {p.replies} replies</button>
                    <button style={{ border:'none', background:'none', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:'0.8rem', color:'var(--sky)' }}>Reply</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}