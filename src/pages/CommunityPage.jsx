// src/pages/CommunityPage.jsx  — fully dynamic version
import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from '../context/RouterContext'
import { useAuth } from '../context/AuthContext'
import { community as communityApi } from '../services/api'

const C = {
  skyBright:'#00BFFF', skyMid:'#009FD4', skyDeep:'#007BA8',
  skyFaint:'#E0F7FF', skyFainter:'#F0FBFF', white:'#ffffff', mint:'#e8f3ee',
  textDark:'#1a3a4a', textMid:'#2e6080', textLight:'#7a9aaa',
  border:'#b0d4e8', borderFaint:'#daeef8',
}
const btnGrad     = `linear-gradient(135deg,#007BA8 0%,#00BFFF 100%)`
const sectionGrad = `linear-gradient(135deg,${C.skyFainter} 0%,${C.mint} 60%,${C.skyFaint} 100%)`

// ── Toast ────────────────────────────────────────────────────
function Toast({ msg, emoji, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t) }, [onClose])
  return (
    <div style={{ position:'fixed', bottom:32, right:32, zIndex:1000, background:C.white,
      borderRadius:16, padding:'1rem 1.25rem', boxShadow:`0 8px 32px rgba(0,0,0,0.15)`,
      border:`1.5px solid ${C.borderFaint}`, display:'flex', alignItems:'center',
      gap:'0.85rem', maxWidth:320 }}>
      <span style={{ fontSize:'1.8rem', flexShrink:0 }}>{emoji}</span>
      <div style={{ flex:1, fontFamily:'var(--font-body)', fontSize:'0.82rem', fontWeight:700, color:C.textDark }}>{msg}</div>
      <button onClick={onClose} style={{ background:'none', border:'none', color:C.textLight, cursor:'pointer', fontSize:'1rem' }}>✕</button>
    </div>
  )
}

// ── Join Group Modal ─────────────────────────────────────────
function JoinModal({ group, onConfirm, onCancel, loading }) {
  const [name, setName]   = useState('')
  const [email, setEmail] = useState('')
  const [anon, setAnon]   = useState(false)
  const [fN, setFN] = useState(false)
  const [fE, setFE] = useState(false)
  const valid = anon || (name.trim() && email.includes('@'))

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:1000,
      display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}
      onClick={onCancel}>
      <div style={{ background:C.white, borderRadius:22, padding:'2.25rem', maxWidth:420,
        width:'100%', boxShadow:`0 20px 60px rgba(0,0,0,0.22)`, position:'relative' }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onCancel} style={{ position:'absolute', top:14, right:16,
          background:'none', border:'none', fontSize:'1.2rem', cursor:'pointer', color:C.textLight }}>✕</button>

        <div style={{ display:'flex', alignItems:'center', gap:'0.85rem', marginBottom:'1.5rem',
          padding:'0.9rem', background:sectionGrad, borderRadius:14, border:`1px solid ${C.borderFaint}` }}>
          <span style={{ fontSize:'2rem' }}>{group.emoji}</span>
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'0.95rem', color:C.textDark }}>{group.name}</div>
            <div style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', color:C.textLight }}>{group.member_count ?? 0} members · Moderated</div>
          </div>
        </div>

        <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.25rem', color:C.textDark, marginBottom:'0.35rem' }}>Join this Group</h3>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:C.textMid, lineHeight:1.65, marginBottom:'1.25rem' }}>
          Join anonymously or with your name. All groups are moderated by licensed professionals.
        </p>

        <div style={{ display:'flex', alignItems:'center', gap:'0.65rem', marginBottom:'1.1rem',
          padding:'0.75rem 1rem', background:anon?C.skyFainter:C.white,
          border:`1.5px solid ${anon?C.skyBright:C.borderFaint}`, borderRadius:12,
          cursor:'pointer', transition:'all 0.2s' }}
          onClick={() => setAnon(a => !a)}>
          <div style={{ width:20, height:20, borderRadius:'50%',
            border:`2px solid ${anon?C.skyBright:C.border}`,
            background:anon?btnGrad:'transparent', display:'flex', alignItems:'center',
            justifyContent:'center', flexShrink:0, transition:'all 0.2s' }}>
            {anon && <span style={{ color:'white', fontSize:'0.6rem', fontWeight:800 }}>✓</span>}
          </div>
          <div>
            <div style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', fontWeight:700, color:anon?C.skyDeep:C.textDark }}>Join Anonymously</div>
            <div style={{ fontFamily:'var(--font-body)', fontSize:'0.7rem', color:C.textLight }}>Your identity will never be shared</div>
          </div>
        </div>

        {!anon && (
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'1.1rem' }}>
            <div>
              <label style={{ display:'block', fontFamily:'var(--font-body)', fontSize:'0.65rem',
                fontWeight:800, color:C.textLight, textTransform:'uppercase', letterSpacing:'0.09em', marginBottom:'0.35rem' }}>
                Name <span style={{ color:C.skyBright }}>*</span>
              </label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" type="text"
                onFocus={() => setFN(true)} onBlur={() => setFN(false)}
                style={{ width:'100%', padding:'0.7rem 0.9rem', border:`1.5px solid ${fN?C.skyBright:C.borderFaint}`,
                  borderRadius:10, fontFamily:'var(--font-body)', fontSize:'0.88rem', color:C.textDark,
                  background:fN?C.skyFainter:C.white, outline:'none', boxSizing:'border-box', transition:'all 0.2s' }} />
            </div>
            <div>
              <label style={{ display:'block', fontFamily:'var(--font-body)', fontSize:'0.65rem',
                fontWeight:800, color:C.textLight, textTransform:'uppercase', letterSpacing:'0.09em', marginBottom:'0.35rem' }}>
                Email <span style={{ color:C.skyBright }}>*</span>
              </label>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" type="email"
                onFocus={() => setFE(true)} onBlur={() => setFE(false)}
                style={{ width:'100%', padding:'0.7rem 0.9rem', border:`1.5px solid ${fE?C.skyBright:C.borderFaint}`,
                  borderRadius:10, fontFamily:'var(--font-body)', fontSize:'0.88rem', color:C.textDark,
                  background:fE?C.skyFainter:C.white, outline:'none', boxSizing:'border-box', transition:'all 0.2s' }} />
            </div>
          </div>
        )}

        <div style={{ display:'flex', gap:'0.65rem' }}>
          <button onClick={onCancel} disabled={loading}
            style={{ flex:1, padding:'0.75rem', borderRadius:12, border:`1.5px solid ${C.border}`,
              background:C.white, color:C.textMid, fontFamily:'var(--font-body)', fontWeight:600,
              fontSize:'0.88rem', cursor:'pointer' }}>Cancel</button>
          <button
            onClick={() => valid && onConfirm({ display_name: anon?'Anonymous':name, email: anon?'':email, is_anonymous: anon })}
            disabled={!valid || loading}
            style={{ flex:2, padding:'0.75rem', borderRadius:12, border:'none',
              background:valid?btnGrad:C.borderFaint, color:valid?'white':C.textLight,
              fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.88rem',
              cursor:valid?'pointer':'not-allowed',
              boxShadow:valid?`0 4px 16px rgba(0,191,255,0.3)`:'none', transition:'all 0.2s' }}>
            {loading ? 'Joining…' : '🤝 Join Group'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Reserve Session Modal ────────────────────────────────────
function ReserveModal({ session, onConfirm, onCancel, loading }) {
  const [name, setName]   = useState('')
  const [email, setEmail] = useState('')
  const [anon, setAnon]   = useState(false)
  const valid = anon || (name.trim() && email.includes('@'))

  const fmt = d => new Date(d).toLocaleString('en-US', { weekday:'short', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:1000,
      display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}
      onClick={onCancel}>
      <div style={{ background:C.white, borderRadius:22, padding:'2.25rem', maxWidth:420,
        width:'100%', boxShadow:`0 20px 60px rgba(0,0,0,0.22)`, position:'relative' }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onCancel} style={{ position:'absolute', top:14, right:16,
          background:'none', border:'none', fontSize:'1.2rem', cursor:'pointer', color:C.textLight }}>✕</button>

        <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', color:C.textDark, marginBottom:'0.35rem' }}>Reserve a Spot</h3>
        <div style={{ background:sectionGrad, borderRadius:12, padding:'0.85rem', marginBottom:'1.25rem', border:`1px solid ${C.borderFaint}` }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'0.9rem', color:C.textDark }}>{session.title}</div>
          <div style={{ fontFamily:'var(--font-body)', fontSize:'0.75rem', color:C.textLight, marginTop:4 }}>
            📅 {fmt(session.scheduled_at)} · 💻 {session.mode}
          </div>
          <div style={{ fontFamily:'var(--font-body)', fontSize:'0.75rem', color:'#22c55e', fontWeight:700, marginTop:4 }}>
            {session.spots_left} spot{session.spots_left !== 1 ? 's' : ''} remaining
          </div>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:'0.65rem', marginBottom:'1.1rem',
          padding:'0.75rem 1rem', background:anon?C.skyFainter:C.white,
          border:`1.5px solid ${anon?C.skyBright:C.borderFaint}`, borderRadius:12, cursor:'pointer' }}
          onClick={() => setAnon(a => !a)}>
          <div style={{ width:20, height:20, borderRadius:'50%',
            border:`2px solid ${anon?C.skyBright:C.border}`, background:anon?btnGrad:'transparent',
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            {anon && <span style={{ color:'white', fontSize:'0.6rem', fontWeight:800 }}>✓</span>}
          </div>
          <div style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', fontWeight:700, color:anon?C.skyDeep:C.textDark }}>
            Reserve Anonymously
          </div>
        </div>

        {!anon && (
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'1.1rem' }}>
            {[['Name','text',name,setName,'Your name'],['Email','email',email,setEmail,'you@email.com']].map(([label,type,val,set,ph]) => (
              <div key={label}>
                <label style={{ display:'block', fontFamily:'var(--font-body)', fontSize:'0.65rem',
                  fontWeight:800, color:C.textLight, textTransform:'uppercase', letterSpacing:'0.09em', marginBottom:'0.35rem' }}>
                  {label} <span style={{ color:C.skyBright }}>*</span>
                </label>
                <input value={val} onChange={e => set(e.target.value)} placeholder={ph} type={type}
                  style={{ width:'100%', padding:'0.7rem 0.9rem', border:`1.5px solid ${C.borderFaint}`,
                    borderRadius:10, fontFamily:'var(--font-body)', fontSize:'0.88rem', outline:'none',
                    boxSizing:'border-box' }} />
              </div>
            ))}
          </div>
        )}

        <div style={{ display:'flex', gap:'0.65rem' }}>
          <button onClick={onCancel} disabled={loading}
            style={{ flex:1, padding:'0.75rem', borderRadius:12, border:`1.5px solid ${C.border}`,
              background:C.white, color:C.textMid, fontFamily:'var(--font-body)', fontWeight:600,
              fontSize:'0.88rem', cursor:'pointer' }}>Cancel</button>
          <button onClick={() => valid && onConfirm({ display_name: anon?'Anonymous':name, email: anon?'':email, is_anonymous: anon })}
            disabled={!valid || loading}
            style={{ flex:2, padding:'0.75rem', borderRadius:12, border:'none',
              background:valid?btnGrad:C.borderFaint, color:valid?'white':C.textLight,
              fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.88rem', cursor:valid?'pointer':'not-allowed',
              transition:'all 0.2s' }}>
            {loading ? 'Reserving…' : '✅ Reserve Spot'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Post Composer ────────────────────────────────────────────
function PostComposer({ groups, onPost }) {
  const [content, setContent] = useState('')
  const [groupId, setGroupId] = useState(groups[0]?.id || '')
  const [anon, setAnon]       = useState(true)
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => { if (groups.length && !groupId) setGroupId(groups[0].id) }, [groups])

  async function handleSubmit() {
    if (!content.trim() || !groupId) return
    setLoading(true); setErr('')
    try {
      const post = await onPost({ group_id: groupId, content, is_anonymous: anon, display_name: anon ? 'Anonymous' : displayName })
      if (post) { setContent(''); }
    } catch (e) { setErr(e.message) }
    finally { setLoading(false) }
  }

  return (
    <div style={{ background:C.white, borderRadius:16, border:`1.5px solid ${C.borderFaint}`,
      padding:'1.25rem 1.5rem', marginBottom:'1.5rem',
      boxShadow:`0 4px 20px rgba(0,191,255,0.06)` }}>
      <div style={{ fontFamily:'var(--font-display)', fontSize:'0.95rem', color:C.textDark, marginBottom:'0.85rem' }}>
        ✍️ Share with the Community
      </div>
      <div style={{ display:'flex', gap:'0.65rem', marginBottom:'0.75rem', flexWrap:'wrap' }}>
        <select value={groupId} onChange={e => setGroupId(e.target.value)}
          style={{ padding:'0.45rem 0.75rem', border:`1.5px solid ${C.borderFaint}`, borderRadius:8,
            fontFamily:'var(--font-body)', fontSize:'0.82rem', color:C.textMid, outline:'none', background:C.white }}>
          {groups.map(g => <option key={g.id} value={g.id}>{g.emoji} {g.name}</option>)}
        </select>
        <button onClick={() => setAnon(a => !a)}
          style={{ padding:'0.45rem 0.9rem', border:`1.5px solid ${anon?C.skyBright:C.borderFaint}`,
            borderRadius:8, background:anon?C.skyFainter:C.white, color:anon?C.skyDeep:C.textLight,
            fontFamily:'var(--font-body)', fontSize:'0.78rem', fontWeight:700, cursor:'pointer', transition:'all 0.2s' }}>
          {anon ? '🕵️ Anonymous' : '👤 Named'}
        </button>
        {!anon && (
          <input value={displayName} onChange={e => setDisplayName(e.target.value)}
            placeholder="Your display name"
            style={{ padding:'0.45rem 0.75rem', border:`1.5px solid ${C.borderFaint}`, borderRadius:8,
              fontFamily:'var(--font-body)', fontSize:'0.82rem', outline:'none', flex:1, minWidth:140 }} />
        )}
      </div>
      <textarea value={content} onChange={e => setContent(e.target.value)}
        placeholder="Share your thoughts, experiences, or a question…" rows={3}
        style={{ width:'100%', padding:'0.75rem', border:`1.5px solid ${C.borderFaint}`, borderRadius:10,
          fontFamily:'var(--font-body)', fontSize:'0.88rem', color:C.textDark, resize:'vertical',
          outline:'none', boxSizing:'border-box', lineHeight:1.65 }} />
      {err && <div style={{ color:'#c0392b', fontFamily:'var(--font-body)', fontSize:'0.78rem', marginTop:'0.4rem' }}>{err}</div>}
      <div style={{ display:'flex', justifyContent:'flex-end', marginTop:'0.65rem' }}>
        <button onClick={handleSubmit} disabled={!content.trim() || loading}
          style={{ padding:'0.6rem 1.4rem', borderRadius:10, border:'none',
            background:content.trim()?btnGrad:C.borderFaint,
            color:content.trim()?'white':C.textLight,
            fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.85rem',
            cursor:content.trim()?'pointer':'not-allowed', transition:'all 0.2s' }}>
          {loading ? 'Posting…' : '📤 Post'}
        </button>
      </div>
    </div>
  )
}

// ── Post Card ────────────────────────────────────────────────
function PostCard({ post, onLike, likedIds, onDelete, canDelete }) {
  const liked = likedIds.has(post.id)
  const timeAgo = t => {
    const s = Math.floor((Date.now() - new Date(t)) / 1000)
    if (s < 60) return 'just now'
    if (s < 3600) return `${Math.floor(s/60)}m ago`
    if (s < 86400) return `${Math.floor(s/3600)}h ago`
    return `${Math.floor(s/86400)}d ago`
  }
  return (
    <div style={{ background:C.white, borderRadius:14, padding:'1.4rem 1.5rem',
      border:`1px solid ${C.borderFaint}`, marginBottom:'0.85rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.75rem' }}>
        <div style={{ display:'flex', gap:'0.5rem', alignItems:'center' }}>
          <div style={{ width:34, height:34, borderRadius:'50%', background:C.skyFaint,
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.9rem', flexShrink:0 }}>
            {post.is_anonymous ? '🕵️' : '😊'}
          </div>
          <div>
            <div style={{ fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.82rem', color:C.textDark }}>
              {post.display_name}
            </div>
            <div style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', color:C.textLight }}>
              {post.community_groups?.emoji} {post.community_groups?.name} · {timeAgo(post.created_at)}
            </div>
          </div>
        </div>
        {canDelete && (
          <button onClick={() => onDelete(post.id)}
            style={{ background:'none', border:'none', color:C.textLight, cursor:'pointer', fontSize:'0.78rem', padding:'0.2rem 0.5rem' }}>
            🗑
          </button>
        )}
      </div>
      <p style={{ fontFamily:'var(--font-body)', fontSize:'0.9rem', color:C.textMid, lineHeight:1.7, margin:'0 0 1rem' }}>
        {post.content}
      </p>
      <div style={{ display:'flex', gap:'1rem' }}>
        <button onClick={() => onLike(post.id)}
          style={{ border:'none', background:'none', cursor:'pointer', fontFamily:'var(--font-body)',
            fontSize:'0.8rem', color:liked?'#e53935':C.textLight,
            display:'flex', alignItems:'center', gap:4, transition:'color 0.2s' }}>
          {liked ? '❤️' : '🤍'} {post.like_count + (liked ? 0 : 0)}
        </button>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function CommunityPage() {
  const { navigate }  = useRouter()
  const { user }      = useAuth()

  const [activeTab, setActiveTab] = useState('groups')
  const [groups, setGroups]       = useState([])
  const [sessions, setSessions]   = useState([])
  const [posts, setPosts]         = useState([])
  const [myGroupIds, setMyGroupIds]   = useState(new Set())
  const [mySessionIds, setMySessionIds] = useState(new Set())
  const [likedPostIds, setLikedPostIds] = useState(new Set())
  const [loading, setLoading]     = useState({ groups:true, sessions:true, posts:true })
  const [toast, setToast]         = useState(null)
  const [joinModal, setJoinModal] = useState(null)
  const [reserveModal, setReserveModal] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [totalMembers, setTotalMembers] = useState(0)

  const setL = (k,v) => setLoading(l => ({ ...l, [k]:v }))
  const showToast = (emoji, msg) => setToast({ emoji, msg })

  // ── Fetch all data ─────────────────────────────────────────
  const fetchGroups = useCallback(async () => {
    setL('groups', true)
    try {
      const d = await communityApi.groups()
      setGroups(d.groups || [])
      setTotalMembers((d.groups || []).reduce((s, g) => s + (g.member_count || 0), 0))
    } catch {}
    finally { setL('groups', false) }
  }, [])

  const fetchSessions = useCallback(async () => {
    setL('sessions', true)
    try {
      const d = await communityApi.sessions()
      setSessions(d.sessions || [])
    } catch {}
    finally { setL('sessions', false) }
  }, [])

  const fetchPosts = useCallback(async () => {
    setL('posts', true)
    try {
      const d = await communityApi.posts({ limit: 30 })
      setPosts(d.posts || [])
    } catch {}
    finally { setL('posts', false) }
  }, [])

  const fetchMyData = useCallback(async () => {
    if (!user) return
    try {
      const [grpRes, sessRes] = await Promise.allSettled([
        communityApi.myGroups(),
        communityApi.myReservations(),
      ])
      if (grpRes.status === 'fulfilled') setMyGroupIds(new Set(grpRes.value.groupIds || []))
      if (sessRes.status === 'fulfilled') setMySessionIds(new Set(sessRes.value.sessionIds || []))
    } catch {}
  }, [user])

  useEffect(() => {
    fetchGroups()
    fetchSessions()
    fetchPosts()
    fetchMyData()
  }, [fetchGroups, fetchSessions, fetchPosts, fetchMyData])

  // ── Join / Leave group ─────────────────────────────────────
  async function handleJoinConfirm(body) {
    setActionLoading(true)
    try {
      await communityApi.joinGroup(joinModal.id, body)
      setMyGroupIds(s => new Set([...s, joinModal.id]))
      setJoinModal(null)
      showToast(joinModal.emoji, `Joined ${joinModal.name}!`)
      fetchGroups()
    } catch (e) { showToast('⚠️', e.message) }
    finally { setActionLoading(false) }
  }

  async function handleLeave(group) {
    if (!user) { showToast('ℹ️', 'Please sign in to manage memberships.'); return }
    try {
      await communityApi.leaveGroup(group.id)
      setMyGroupIds(s => { const ns = new Set(s); ns.delete(group.id); return ns })
      showToast(group.emoji, `Left ${group.name}`)
      fetchGroups()
    } catch (e) { showToast('⚠️', e.message) }
  }

  function openJoin(group) {
    if (myGroupIds.has(group.id)) { handleLeave(group); return }
    setJoinModal(group)
  }

  // ── Reserve / Cancel session ───────────────────────────────
  async function handleReserveConfirm(body) {
    setActionLoading(true)
    try {
      await communityApi.reserveSession(reserveModal.id, body)
      setMySessionIds(s => new Set([...s, reserveModal.id]))
      setReserveModal(null)
      showToast('✅', `Spot reserved for "${reserveModal.title}"!`)
      fetchSessions()
    } catch (e) { showToast('⚠️', e.message) }
    finally { setActionLoading(false) }
  }

  async function handleCancelReservation(session) {
    if (!user) { showToast('ℹ️', 'Please sign in to manage reservations.'); return }
    try {
      await communityApi.cancelReservation(session.id)
      setMySessionIds(s => { const ns = new Set(s); ns.delete(session.id); return ns })
      showToast('❌', 'Reservation cancelled.')
      fetchSessions()
    } catch (e) { showToast('⚠️', e.message) }
  }

  // ── Posts ──────────────────────────────────────────────────
  async function handlePost(body) {
    const d = await communityApi.createPost(body)
    if (d.post) { setPosts(p => [d.post, ...p]); showToast('✍️', 'Post shared!') }
    return d.post
  }

  async function handleLike(postId) {
    try {
      const d = await communityApi.likePost(postId, {})
      setLikedPostIds(s => {
        const ns = new Set(s)
        if (d.liked) ns.add(postId); else ns.delete(postId)
        return ns
      })
      setPosts(ps => ps.map(p => p.id === postId
        ? { ...p, like_count: p.like_count + (d.liked ? 1 : -1) }
        : p))
    } catch {}
  }

  async function handleDeletePost(postId) {
    if (!confirm('Delete this post?')) return
    try {
      await communityApi.deletePost(postId)
      setPosts(ps => ps.filter(p => p.id !== postId))
    } catch (e) { showToast('⚠️', e.message) }
  }

  const fmtSession = d => new Date(d).toLocaleString('en-US', { weekday:'short', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })

  return (
    <div className="page-wrapper">
      <style>{`
        .community-groups-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; }
        @media(max-width:1024px){ .community-groups-grid{ grid-template-columns:repeat(2,1fr); } }
        @media(max-width:600px){ .community-groups-grid{ grid-template-columns:1fr; } }
      `}</style>

      {/* Hero */}
      <div className="page-hero" style={{ background:'var(--sky-light)' }}>
        <span className="section-tag">Community</span>
        <h1 className="section-title">You Are Not <em>Alone</em></h1>
        <p className="section-desc">Connect with peers, share your journey, and find support in moderated community spaces facilitated by our clinical team.</p>
        <div style={{ display:'flex', gap:'0.75rem', marginTop:'1.5rem', alignItems:'center', flexWrap:'wrap' }}>
          <div style={{ display:'flex', gap:4 }}>
            {['😊','🙂','😄','🌱','💙'].map((e,i) => (
              <span key={i} style={{ width:32, height:32, borderRadius:'50%', background:'var(--white)',
                border:'2px solid var(--blue-pale)', display:'inline-flex', alignItems:'center',
                justifyContent:'center', fontSize:'0.9rem', marginLeft:i>0?-8:0 }}>{e}</span>
            ))}
          </div>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:'var(--text-mid)' }}>
            <strong>{totalMembers.toLocaleString()}+ members</strong> actively supporting each other
          </span>
          {myGroupIds.size > 0 && (
            <div style={{ background:btnGrad, borderRadius:100, padding:'3px 12px',
              fontFamily:'var(--font-body)', fontSize:'0.72rem', fontWeight:800, color:'white' }}>
              ✓ {myGroupIds.size} group{myGroupIds.size>1?'s':''} joined
            </div>
          )}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background:'var(--white)', borderBottom:'1px solid var(--blue-pale)',
        padding:'0 1rem', display:'flex', gap:0, overflowX:'auto' }}>
        {[['groups','Support Groups'],['announcements','Group Sessions'],['feed','Recent Posts']].map(([id,label]) => (
          <button key={id} onClick={() => setActiveTab(id)}
            style={{ padding:'1rem 1.5rem', border:'none', background:'none',
              fontFamily:'var(--font-body)', fontSize:'0.85rem',
              fontWeight:activeTab===id?700:500,
              color:activeTab===id?'var(--sky)':'var(--text-light)',
              borderBottom:activeTab===id?'2.5px solid var(--sky)':'2.5px solid transparent',
              cursor:'pointer', transition:'all 0.2s', whiteSpace:'nowrap' }}>
            {label}
          </button>
        ))}
      </div>

      <div className="section" style={{ background:'var(--off-white)', paddingTop:'3rem' }}>

        {/* ── GROUPS ── */}
        {activeTab === 'groups' && (
          <div>
            <div style={{ background:'rgba(0,191,255,0.08)', border:'1px solid var(--blue-pale)',
              borderRadius:'var(--radius-md)', padding:'1rem 1.5rem', marginBottom:'2rem',
              display:'flex', gap:'0.75rem', alignItems:'center' }}>
              <span style={{ fontSize:'1.2rem' }}>🛡️</span>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:'var(--blue-deep)', margin:0 }}>
                All community spaces are <strong>moderated by licensed professionals</strong>. Anonymous participation is supported.
              </p>
            </div>

            {loading.groups ? (
              <div style={{ textAlign:'center', padding:'3rem', color:C.textLight, fontFamily:'var(--font-body)' }}>Loading groups…</div>
            ) : (
              <div className="community-groups-grid">
                {groups.map(g => {
                  const isJoined = myGroupIds.has(g.id)
                  return (
                    <div key={g.id}
                      style={{ background:isJoined?C.skyFainter:'var(--white)', borderRadius:'var(--radius-lg)',
                        overflow:'hidden', border:`1.5px solid ${isJoined?C.skyBright:'var(--blue-pale)'}`,
                        boxShadow:isJoined?`0 4px 20px rgba(0,191,255,0.12)`:'var(--shadow-soft)', transition:'all 0.25s' }}
                      onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
                      onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ background:isJoined?`linear-gradient(135deg,${C.skyFaint},${C.skyFainter})`:g.color,
                        padding:'1.5rem', fontSize:'2.5rem', textAlign:'center', position:'relative' }}>
                        {g.emoji}
                        {isJoined && (
                          <div style={{ position:'absolute', top:10, right:10, background:btnGrad,
                            borderRadius:100, padding:'3px 10px',
                            fontFamily:'var(--font-body)', fontSize:'0.62rem', fontWeight:800, color:'white' }}>
                            ✓ JOINED
                          </div>
                        )}
                      </div>
                      <div style={{ padding:'1.25rem' }}>
                        <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1rem', color:'var(--blue-deep)', marginBottom:'0.4rem' }}>{g.name}</h3>
                        <p style={{ fontFamily:'var(--font-body)', fontSize:'0.8rem', color:'var(--text-light)', lineHeight:1.6, marginBottom:'0.75rem' }}>{g.description}</p>
                        <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginBottom:'0.75rem' }}>
                          {(g.tags || []).map((t,j) => <span key={j} className="tag" style={{ fontSize:'0.65rem' }}>{t}</span>)}
                        </div>
                        <div style={{ fontFamily:'var(--font-body)', fontSize:'0.75rem', color:'var(--text-light)', marginBottom:'1rem' }}>
                          👥 {isJoined ? (g.member_count||0) : (g.member_count||0)} members
                        </div>
                        <button onClick={() => openJoin(g)}
                          style={{ width:'100%', padding:'0.6rem', borderRadius:12,
                            border:`1.5px solid ${isJoined?C.skyBright:'var(--green-deep)'}`,
                            background:isJoined?C.skyFaint:'var(--green-deep)',
                            color:isJoined?C.skyDeep:'white',
                            fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.82rem',
                            cursor:'pointer', transition:'all 0.2s' }}>
                          {isJoined ? '✓ Joined — Leave Group' : '🤝 Join Group'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {myGroupIds.size > 0 && (
              <div style={{ marginTop:'2.5rem', background:C.white, borderRadius:18,
                border:`1px solid ${C.borderFaint}`, padding:'1.4rem 1.75rem',
                boxShadow:`0 4px 20px rgba(0,191,255,0.07)` }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'1rem', color:C.textDark, marginBottom:'0.9rem' }}>
                  My Groups ({myGroupIds.size})
                </div>
                <div style={{ display:'flex', gap:'0.65rem', flexWrap:'wrap' }}>
                  {groups.filter(g => myGroupIds.has(g.id)).map(g => (
                    <div key={g.id} style={{ display:'inline-flex', alignItems:'center', gap:'0.45rem',
                      background:sectionGrad, border:`1px solid ${C.borderFaint}`,
                      borderRadius:100, padding:'5px 14px 5px 8px' }}>
                      <span style={{ fontSize:'1rem' }}>{g.emoji}</span>
                      <span style={{ fontFamily:'var(--font-body)', fontSize:'0.75rem', fontWeight:700, color:C.skyDeep }}>{g.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── SESSIONS ── */}
        {activeTab === 'announcements' && (
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', color:'var(--blue-deep)', marginBottom:'1.5rem' }}>
              Upcoming Group Therapy Sessions
            </div>
            {loading.sessions ? (
              <div style={{ textAlign:'center', padding:'3rem', color:C.textLight, fontFamily:'var(--font-body)' }}>Loading sessions…</div>
            ) : sessions.length === 0 ? (
              <div style={{ textAlign:'center', padding:'3rem', color:C.textLight, fontFamily:'var(--font-body)' }}>No upcoming sessions scheduled.</div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
                {sessions.map(s => {
                  const reserved = mySessionIds.has(s.id)
                  const full = s.spots_left <= 0
                  return (
                    <div key={s.id} style={{ background:'var(--white)', borderRadius:'var(--radius-lg)',
                      padding:'1.75rem', border:`1.5px solid ${reserved?C.skyBright:'var(--blue-pale)'}`,
                      boxShadow:'var(--shadow-soft)' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'1rem' }}>
                        <div>
                          <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.05rem', color:'var(--blue-deep)', marginBottom:'0.4rem' }}>{s.title}</h3>
                          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                            <span style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:'var(--text-light)' }}>📅 {fmtSession(s.scheduled_at)}</span>
                            <span style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:'var(--text-light)' }}>💻 {s.mode}</span>
                            <span style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:'var(--text-light)' }}>👤 {s.facilitator}</span>
                            {s.community_groups && (
                              <span style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:C.skyDeep }}>
                                {s.community_groups.emoji} {s.community_groups.name}
                              </span>
                            )}
                          </div>
                        </div>
                        <div style={{ textAlign:'right', flexShrink:0 }}>
                          <div style={{ fontFamily:'var(--font-body)', fontSize:'0.78rem',
                            color: full ? '#c0392b' : reserved ? '#1a7a4a' : '#8a6a1a',
                            fontWeight:700, marginBottom:'0.5rem' }}>
                            {reserved ? '✓ Reserved' : full ? 'Full' : `${s.spots_left} spot${s.spots_left!==1?'s':''} left`}
                          </div>
                          {reserved ? (
                            <button onClick={() => handleCancelReservation(s)}
                              style={{ padding:'0.5rem 1rem', borderRadius:8, border:`1.5px solid ${C.skyBright}`,
                                background:C.skyFaint, color:C.skyDeep,
                                fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.82rem', cursor:'pointer' }}>
                              Cancel Reservation
                            </button>
                          ) : (
                            <button onClick={() => !full && setReserveModal(s)} disabled={full}
                              style={{ padding:'0.5rem 1rem', borderRadius:8, border:'none',
                                background:full?C.borderFaint:btnGrad,
                                color:full?C.textLight:'white',
                                fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.82rem',
                                cursor:full?'not-allowed':'pointer',
                                boxShadow:full?'none':`0 4px 14px rgba(0,191,255,0.25)` }}>
                              {full ? 'Full' : 'Reserve Spot →'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── FEED ── */}
        {activeTab === 'feed' && (
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', color:'var(--blue-deep)', marginBottom:'1.25rem' }}>
              Community Feed
            </div>
            <div style={{ background:'rgba(0,191,255,0.06)', border:'1px solid var(--blue-pale)',
              borderRadius:'var(--radius-md)', padding:'1rem 1.5rem', marginBottom:'1.5rem',
              fontSize:'0.82rem', color:'var(--blue-mid)' }}>
              💡 All posts are anonymous by default. Your privacy is protected. Please be kind and supportive.
            </div>

            <PostComposer groups={groups} onPost={handlePost} />

            {loading.posts ? (
              <div style={{ textAlign:'center', padding:'3rem', color:C.textLight, fontFamily:'var(--font-body)' }}>Loading posts…</div>
            ) : posts.length === 0 ? (
              <div style={{ textAlign:'center', padding:'3rem', color:C.textLight, fontFamily:'var(--font-body)' }}>No posts yet. Be the first to share!</div>
            ) : (
              posts.map(p => (
                <PostCard key={p.id} post={p} onLike={handleLike} likedIds={likedPostIds}
                  onDelete={handleDeletePost}
                  canDelete={user && (p.user_id === user?.sub || ['admin','staff'].includes(user?.role))} />
              ))
            )}
          </div>
        )}
      </div>

      {joinModal && (
        <JoinModal group={joinModal} loading={actionLoading}
          onConfirm={handleJoinConfirm}
          onCancel={() => setJoinModal(null)} />
      )}

      {reserveModal && (
        <ReserveModal session={reserveModal} loading={actionLoading}
          onConfirm={handleReserveConfirm}
          onCancel={() => setReserveModal(null)} />
      )}

      {toast && <Toast emoji={toast.emoji} msg={toast.msg} onClose={() => setToast(null)} />}
    </div>
  )
}