import { useState } from 'react'
import { useRouter } from '../context/RouterContext'

const TABS = ['Overview','Appointments','Mood Diary','Resources','Messages','Progress']

const UPCOMING = [
  { therapist:'Dr. Anita Shrestha', type:'Individual Therapy', mode:'Online', date:'Wed 18 Jun', time:'10:00 AM', status:'confirmed' },
  { therapist:'Dr. Anita Shrestha', type:'Individual Therapy', mode:'Online', date:'Wed 25 Jun', time:'10:00 AM', status:'pending' },
]

const PAST = [
  { therapist:'Dr. Anita Shrestha', date:'Wed 11 Jun', time:'10:00 AM', notes:'Discussed CBT techniques for anxiety management.' },
  { therapist:'Dr. Anita Shrestha', date:'Wed 4 Jun',  time:'10:00 AM', notes:'Explored thought distortions and reframing.' },
]

const MOODS = [
  { day:'Mon', score:6, emoji:'😐' },
  { day:'Tue', score:8, emoji:'😊' },
  { day:'Wed', score:5, emoji:'😔' },
  { day:'Thu', score:7, emoji:'🙂' },
  { day:'Fri', score:9, emoji:'😄' },
  { day:'Sat', score:7, emoji:'🙂' },
  { day:'Sun', score:6, emoji:'😐' },
]

const WORKSHEETS = [
  { title:'Thought Record Sheet',   type:'CBT',        uploaded:'Jun 10', status:'reviewed' },
  { title:'Anxiety Trigger Log',    type:'Homework',   uploaded:'Jun 5',  status:'pending' },
  { title:'Sleep Diary — Week 3',   type:'Tracking',   uploaded:'May 28', status:'reviewed' },
]

const MESSAGES = [
  { from:'Dr. Anita Shrestha', time:'2h ago',  text:'Great progress this week! Please complete the thought record before our next session.', mine:false },
  { from:'You',                time:'1d ago',  text:"I've been feeling much more grounded after practicing the breathing exercises. Thank you!", mine:true },
  { from:'Dr. Anita Shrestha', time:'1d ago',  text:"That's wonderful to hear! Keep up the practice. See you Wednesday.", mine:false },
]

const GOALS = [
  { label:'Anxiety management',  pct:72 },
  { label:'Sleep quality',       pct:58 },
  { label:'Social confidence',   pct:45 },
  { label:'Mindfulness practice',pct:80 },
]

function ProgressBar({ pct, color='var(--sky)' }) {
  return (
    <div style={{ height:8, background:'var(--blue-pale)', borderRadius:4, overflow:'hidden' }}>
      <div style={{ height:'100%', width:`${pct}%`, background:color, borderRadius:4, transition:'width 1s ease' }}/>
    </div>
  )
}

export default function ClientPortalPage() {
  // eslint-disable-next-line no-unused-vars
  const { navigate } = useRouter()
  const [tab, setTab] = useState('Overview')
  const [moodToday, setMoodToday] = useState(null)
  const [msg, setMsg] = useState('')
  const [messages, setMessages] = useState(MESSAGES)

  function sendMsg() {
    if (!msg.trim()) return
    setMessages(prev => [...prev, { from:'You', time:'just now', text:msg, mine:true }])
    setMsg('')
  }

  return (
    <div className="page-wrapper" style={{ background:'var(--off-white)' }}>
      {/* Portal header */}
      <div style={{ background:'var(--white)', borderBottom:'1px solid var(--blue-pale)', padding:'1.5rem 4rem', display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:0 }}>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', color:'var(--blue-deep)' }}>Welcome back, <em>Priya</em> 👋</div>
          <div style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:'var(--text-light)', marginTop:2 }}>Next session: Wednesday 18 Jun · 10:00 AM with Dr. Anita</div>
        </div>
        
      </div>

      {/* Tab bar */}
      <div style={{ background:'var(--white)', borderBottom:'1px solid var(--blue-pale)', padding:'0 4rem', display:'flex', gap:0 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding:'1rem 1.5rem', border:'none', background:'none',
            fontFamily:'var(--font-body)', fontSize:'0.85rem', fontWeight: tab === t ? 700 : 500,
            color: tab === t ? 'var(--sky)' : 'var(--text-light)',
            borderBottom: tab === t ? '2.5px solid var(--sky)' : '2.5px solid transparent',
            cursor:'pointer', transition:'all 0.2s', whiteSpace:'nowrap',
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding:'2.5rem 4rem', maxWidth:1100, margin:'0 auto' }}>

        {/* OVERVIEW */}
        {tab === 'Overview' && (
          <div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.25rem', marginBottom:'2rem' }}>
              {[
                { label:'Sessions Completed', val:12, icon:'✅', color:'var(--sky-light)' },
                { label:'Next Appointment',   val:'Wed 18', icon:'📅', color:'var(--green-mist)' },
                { label:'Current Streak',     val:'5 days', icon:'🔥', color:'#fff5e6' },
                { label:'Avg Mood (week)',     val:'7.0 / 10', icon:'😊', color:'var(--blue-mist)' },
              ].map((c, i) => (
                <div key={i} style={{ background:c.color, borderRadius:'var(--radius-md)', padding:'1.25rem', border:'1px solid var(--blue-pale)' }}>
                  <div style={{ fontSize:'1.5rem', marginBottom:'0.4rem' }}>{c.icon}</div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', color:'var(--blue-deep)' }}>{c.val}</div>
                  <div style={{ fontFamily:'var(--font-body)', fontSize:'0.75rem', color:'var(--text-light)', fontWeight:600 }}>{c.label}</div>
                </div>
              ))}
            </div>

            {/* Today's mood check-in */}
            <div style={{ background:'var(--white)', borderRadius:'var(--radius-lg)', padding:'2rem', border:'1px solid var(--blue-pale)', marginBottom:'1.5rem' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', color:'var(--blue-deep)', marginBottom:'1rem' }}>How are you feeling today?</div>
              <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                {['😞','😔','😐','🙂','😊','😄','🤩'].map((e, i) => (
                  <button key={i} onClick={() => setMoodToday(i)} style={{
                    fontSize:'1.8rem', padding:'0.5rem', border:`2px solid ${moodToday === i ? 'var(--sky)' : 'var(--blue-pale)'}`,
                    borderRadius:'var(--radius-sm)', background: moodToday === i ? 'var(--sky-light)' : 'var(--off-white)',
                    cursor:'pointer', transition:'all 0.2s',
                  }}>{e}</button>
                ))}
              </div>
              {moodToday !== null && <p style={{ marginTop:'0.75rem', color:'var(--green-deep)', fontFamily:'var(--font-body)', fontSize:'0.85rem', fontWeight:600 }}>✓ Mood logged. Keep it up!</p>}
            </div>

            {/* Goals progress */}
            <div style={{ background:'var(--white)', borderRadius:'var(--radius-lg)', padding:'2rem', border:'1px solid var(--blue-pale)' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', color:'var(--blue-deep)', marginBottom:'1.5rem' }}>Therapy Goals Progress</div>
              <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
                {GOALS.map((g,i) => (
                  <div key={i}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.4rem' }}>
                      <span style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', fontWeight:600, color:'var(--text-mid)' }}>{g.label}</span>
                      <span style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:'var(--sky)', fontWeight:700 }}>{g.pct}%</span>
                    </div>
                    <ProgressBar pct={g.pct}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* APPOINTMENTS */}
        {tab === 'Appointments' && (
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', color:'var(--blue-deep)', marginBottom:'1.25rem' }}>Upcoming Sessions</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem', marginBottom:'2.5rem' }}>
              {UPCOMING.map((a,i) => (
                <div key={i} style={{ background:'var(--white)', borderRadius:'var(--radius-md)', padding:'1.25rem 1.5rem', border:'1px solid var(--blue-pale)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div style={{ display:'flex', gap:'1rem', alignItems:'center' }}>
                    <div style={{ width:48, height:48, borderRadius:'50%', background:'var(--sky-light)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem' }}>📅</div>
                    <div>
                      <div style={{ fontFamily:'var(--font-body)', fontWeight:700, color:'var(--blue-deep)' }}>{a.type} · {a.mode}</div>
                      <div style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:'var(--text-light)' }}>{a.therapist} · {a.date} at {a.time}</div>
                    </div>
                  </div>
                  <div style={{ display:'flex', gap:'0.75rem', alignItems:'center' }}>
                    <span style={{ fontSize:'0.72rem', fontWeight:800, padding:'3px 10px', borderRadius:100, background: a.status==='confirmed' ? 'var(--green-mist)' : 'var(--earth-cream)', color: a.status==='confirmed' ? 'var(--green-deep)' : 'var(--earth-warm)', textTransform:'uppercase', letterSpacing:'0.06em' }}>{a.status}</span>
                    {a.status === 'confirmed' && <button className="btn btn-primary" style={{ fontSize:'0.8rem', padding:'0.4rem 1rem' }}>Join Call →</button>}
                    <button className="btn btn-outline" style={{ fontSize:'0.78rem', padding:'0.35rem 0.9rem' }}>Reschedule</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', color:'var(--blue-deep)', marginBottom:'1.25rem' }}>Past Sessions</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              {PAST.map((a,i) => (
                <div key={i} style={{ background:'var(--off-white)', borderRadius:'var(--radius-md)', padding:'1.25rem 1.5rem', border:'1px solid var(--earth-cream)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ fontFamily:'var(--font-body)', fontWeight:600, color:'var(--text-mid)' }}>{a.therapist} · {a.date} at {a.time}</div>
                    <div style={{ fontFamily:'var(--font-body)', fontSize:'0.8rem', color:'var(--text-light)', marginTop:2 }}>{a.notes}</div>
                  </div>
                  <button className="btn btn-outline" style={{ fontSize:'0.78rem', padding:'0.35rem 0.9rem' }}>View Notes</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MOOD DIARY */}
        {tab === 'Mood Diary' && (
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', color:'var(--blue-deep)', marginBottom:'1.5rem' }}>This Week's Mood Log</div>
            <div style={{ background:'var(--white)', borderRadius:'var(--radius-lg)', padding:'2rem', border:'1px solid var(--blue-pale)', marginBottom:'2rem' }}>
              <div style={{ display:'flex', alignItems:'flex-end', gap:'1.25rem', height:140 }}>
                {MOODS.map((m,i) => (
                  <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                    <span style={{ fontSize:'0.82rem', fontWeight:700, color:'var(--sky)' }}>{m.score}</span>
                    <div style={{ width:'100%', background:'var(--sky)', borderRadius:'var(--radius-sm) var(--radius-sm) 0 0', height: m.score * 11, transition:'height 1s' }}/>
                    <span style={{ fontSize:'1.1rem' }}>{m.emoji}</span>
                    <span style={{ fontSize:'0.7rem', color:'var(--text-light)', fontWeight:700 }}>{m.day}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:'var(--white)', borderRadius:'var(--radius-lg)', padding:'2rem', border:'1px solid var(--blue-pale)' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'1rem', color:'var(--blue-deep)', marginBottom:'1rem' }}>Log Today's Mood</div>
              <div style={{ display:'flex', gap:'0.75rem', marginBottom:'1rem', flexWrap:'wrap' }}>
                {['😞','😔','😐','🙂','😊','😄','🤩'].map((e,i) => (
                  <button key={i} onClick={() => setMoodToday(i)} style={{
                    fontSize:'2rem', padding:'0.6rem', border:`2px solid ${moodToday===i ? 'var(--sky)' : 'var(--blue-pale)'}`,
                    borderRadius:'var(--radius-sm)', background: moodToday===i ? 'var(--sky-light)' : 'var(--off-white)', cursor:'pointer',
                  }}>{e}</button>
                ))}
              </div>
              <button className="btn btn-primary" onClick={() => moodToday !== null && alert('Mood saved!')}>Save Today's Mood</button>
            </div>
          </div>
        )}

        {/* RESOURCES */}
        {tab === 'Resources' && (
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', color:'var(--blue-deep)', marginBottom:'1.5rem' }}>Therapy Materials</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              {WORKSHEETS.map((w,i) => (
                <div key={i} style={{ background:'var(--white)', borderRadius:'var(--radius-md)', padding:'1.25rem 1.5rem', border:'1px solid var(--blue-pale)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div style={{ display:'flex', gap:'1rem', alignItems:'center' }}>
                    <div style={{ width:42, height:42, borderRadius:'var(--radius-sm)', background:'var(--blue-mist)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem' }}>📄</div>
                    <div>
                      <div style={{ fontFamily:'var(--font-body)', fontWeight:700, color:'var(--blue-deep)' }}>{w.title}</div>
                      <div style={{ fontFamily:'var(--font-body)', fontSize:'0.78rem', color:'var(--text-light)' }}>{w.type} · Uploaded {w.uploaded}</div>
                    </div>
                  </div>
                  <div style={{ display:'flex', gap:'0.75rem', alignItems:'center' }}>
                    <span style={{ fontSize:'0.72rem', fontWeight:800, padding:'3px 10px', borderRadius:100, background: w.status==='reviewed' ? 'var(--green-mist)' : 'var(--earth-cream)', color: w.status==='reviewed' ? 'var(--green-deep)' : 'var(--earth-warm)', textTransform:'uppercase', letterSpacing:'0.06em' }}>{w.status}</span>
                    <button className="btn btn-outline" style={{ fontSize:'0.78rem', padding:'0.35rem 0.9rem' }}>Download</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:'1.5rem' }}>
              <button className="btn btn-primary" style={{ gap:8 }}>
                ↑ Upload Assignment
              </button>
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {tab === 'Messages' && (
          <div style={{ display:'flex', flexDirection:'column', height:'60vh' }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', color:'var(--blue-deep)', marginBottom:'1rem' }}>Secure Messaging · Dr. Anita Shrestha</div>
            <div style={{ flex:1, overflowY:'auto', background:'var(--white)', borderRadius:'var(--radius-lg)', padding:'1.5rem', border:'1px solid var(--blue-pale)', display:'flex', flexDirection:'column', gap:'1rem', marginBottom:'1rem' }}>
              {messages.map((m,i) => (
                <div key={i} style={{ display:'flex', justifyContent: m.mine ? 'flex-end' : 'flex-start' }}>
                  <div style={{ maxWidth:'70%', background: m.mine ? 'var(--sky)' : 'var(--off-white)', borderRadius: m.mine ? '16px 16px 4px 16px' : '16px 16px 16px 4px', padding:'0.85rem 1.1rem', border: m.mine ? 'none' : '1px solid var(--blue-pale)' }}>
                    {!m.mine && <div style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', fontWeight:700, color:'var(--sky)', marginBottom:4 }}>{m.from}</div>}
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'0.88rem', color: m.mine ? 'white' : 'var(--text-dark)', margin:0, lineHeight:1.5 }}>{m.text}</p>
                    <div style={{ fontFamily:'var(--font-body)', fontSize:'0.68rem', color: m.mine ? 'rgba(255,255,255,0.7)' : 'var(--text-light)', marginTop:4, textAlign:'right' }}>{m.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:'0.75rem' }}>
              <input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMsg()} placeholder="Type a message... (Enter to send)" style={{ flex:1, padding:'0.7rem 1rem', border:'1.5px solid var(--blue-pale)', borderRadius:'var(--radius-sm)', fontFamily:'var(--font-body)', fontSize:'0.9rem', background:'var(--off-white)', outline:'none' }}/>
              <button className="btn btn-primary" onClick={sendMsg}>Send →</button>
            </div>
          </div>
        )}

        {/* PROGRESS */}
        {tab === 'Progress' && (
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', color:'var(--blue-deep)', marginBottom:'1.5rem' }}>Your Therapy Progress</div>
            <div style={{ background:'var(--white)', borderRadius:'var(--radius-lg)', padding:'2rem', border:'1px solid var(--blue-pale)', marginBottom:'1.5rem' }}>
              <div style={{ fontFamily:'var(--font-body)', fontWeight:700, color:'var(--text-mid)', marginBottom:'1.5rem', fontSize:'0.85rem', textTransform:'uppercase', letterSpacing:'0.08em' }}>Goal Progress</div>
              <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
                {GOALS.map((g,i) => (
                  <div key={i}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.5rem' }}>
                      <span style={{ fontFamily:'var(--font-body)', fontSize:'0.9rem', fontWeight:600, color:'var(--text-dark)' }}>{g.label}</span>
                      <span style={{ fontFamily:'var(--font-body)', fontSize:'0.88rem', color:'var(--sky)', fontWeight:700 }}>{g.pct}%</span>
                    </div>
                    <ProgressBar pct={g.pct} color={i%2===0?'var(--sky)':'var(--green-soft)'}/>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:'var(--white)', borderRadius:'var(--radius-lg)', padding:'2rem', border:'1px solid var(--blue-pale)' }}>
              <div style={{ fontFamily:'var(--font-body)', fontWeight:700, color:'var(--text-mid)', marginBottom:'1rem', fontSize:'0.85rem', textTransform:'uppercase', letterSpacing:'0.08em' }}>Therapist's Notes Summary</div>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'0.88rem', color:'var(--text-mid)', lineHeight:1.75 }}>
                Significant improvement in anxiety management over the past 6 weeks. Client demonstrates growing ability to identify and challenge cognitive distortions. Sleep quality has improved following implementation of sleep hygiene protocols. Continue CBT exercises and mindfulness practices.
              </p>
              <div style={{ marginTop:'1rem', padding:'0.75rem 1rem', background:'var(--green-mist)', borderRadius:'var(--radius-sm)', fontSize:'0.8rem', color:'var(--green-deep)', fontWeight:600 }}>
                ✓ 12 sessions completed · Next review: Session 15
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}