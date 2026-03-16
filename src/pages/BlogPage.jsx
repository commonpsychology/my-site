import { useState, useMemo } from 'react'
import { useRouter } from '../context/RouterContext'

/* ─── DB-READY DATA LAYER ───────────────────────────────────────────
   Replace these arrays with API calls:
     GET /api/posts          → all posts
     GET /api/posts/:slug    → single post
     GET /api/categories     → tag list
   Each post shape mirrors a typical CMS / Supabase / MongoDB doc.
──────────────────────────────────────────────────────────────────── */
const CATEGORIES = ['All', 'Anxiety', 'Depression', 'Relationships', 'Self-Care', 'Mindfulness', 'Trauma', 'Parenting']

const POSTS = [
  {
    id: 1, slug: 'understanding-anxiety-nepal',
    title: 'Understanding Anxiety in the Nepali Context',
    excerpt: 'Anxiety presents differently across cultures. We explore how societal pressures, family expectations, and stigma shape how Nepalis experience and express anxiety — and what helps.',
    category: 'Anxiety', author: 'Dr. Anita Shrestha', authorRole: 'Clinical Psychologist',
    date: 'Jun 12, 2025', readTime: '7 min', featured: true,
    tags: ['anxiety', 'culture', 'nepal'], views: 3241,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 2, slug: 'cbt-techniques-beginners',
    title: '5 CBT Techniques You Can Start Using Today',
    excerpt: 'Cognitive Behavioural Therapy has decades of evidence behind it. Here are five practical exercises therapists recommend for managing negative thought patterns at home.',
    category: 'Self-Care', author: 'Rohan Karki', authorRole: 'CBT Therapist',
    date: 'Jun 8, 2025', readTime: '5 min', featured: true,
    tags: ['cbt', 'self-help', 'techniques'], views: 5102,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 3, slug: 'depression-more-than-sadness',
    title: 'Depression Is More Than Just Sadness',
    excerpt: 'Many people dismiss depression as "just feeling sad". This piece breaks down what clinical depression actually looks like — and why seeking help is a sign of strength.',
    category: 'Depression', author: 'Dr. Sunita Rai', authorRole: 'Psychiatrist',
    date: 'Jun 3, 2025', readTime: '8 min', featured: false,
    tags: ['depression', 'awareness', 'stigma'], views: 2780,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 4, slug: 'mindfulness-for-busy-people',
    title: 'Mindfulness for People Who Think They Have No Time',
    excerpt: 'A 5-minute commute. A lunch break. Even a bathroom visit. Mindfulness doesn\'t need a meditation cushion — it just needs intention.',
    category: 'Mindfulness', author: 'Prabha Thapa', authorRole: 'Mindfulness Coach',
    date: 'May 28, 2025', readTime: '4 min', featured: false,
    tags: ['mindfulness', 'meditation', 'busy'], views: 4390,
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    id: 5, slug: 'relationship-communication',
    title: 'The One Communication Skill That Transforms Relationships',
    excerpt: 'Most conflicts don\'t come from disagreement — they come from feeling unheard. Reflective listening is simple to learn and profound in impact.',
    category: 'Relationships', author: 'Dr. Anita Shrestha', authorRole: 'Clinical Psychologist',
    date: 'May 21, 2025', readTime: '6 min', featured: false,
    tags: ['relationships', 'communication', 'couples'], views: 3890,
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  {
    id: 6, slug: 'childhood-trauma-adults',
    title: 'How Childhood Trauma Shows Up in Adult Relationships',
    excerpt: 'Attachment wounds from early life don\'t disappear — they resurface. Understanding your attachment style is the first step toward healthier connections.',
    category: 'Trauma', author: 'Dr. Sunita Rai', authorRole: 'Psychiatrist',
    date: 'May 15, 2025', readTime: '9 min', featured: false,
    tags: ['trauma', 'attachment', 'childhood'], views: 6120,
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  },
  {
    id: 7, slug: 'parenting-anxious-child',
    title: 'Raising an Anxious Child: What Parents Need to Know',
    excerpt: 'One in eight children experiences anxiety. Parents often unknowingly reinforce avoidance. Here\'s how to support your child without fuelling their fears.',
    category: 'Parenting', author: 'Rohan Karki', authorRole: 'Child Psychologist',
    date: 'May 9, 2025', readTime: '7 min', featured: false,
    tags: ['parenting', 'children', 'anxiety'], views: 2960,
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  },
  {
    id: 8, slug: 'sleep-mental-health',
    title: 'Why Sleep Is the Most Underrated Mental Health Tool',
    excerpt: 'Chronic sleep deprivation mimics depression and anxiety. The science is clear: fixing your sleep may be the highest-leverage intervention available.',
    category: 'Self-Care', author: 'Prabha Thapa', authorRole: 'Wellness Coach',
    date: 'May 2, 2025', readTime: '5 min', featured: false,
    tags: ['sleep', 'wellbeing', 'science'], views: 4870,
    gradient: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
  },
]

function PostCard({ post, onNavigate, featured = false }) {
  const [hovered, setHovered] = useState(false)

  if (featured) {
    return (
      <div
        onClick={() => onNavigate(`/blog/${post.slug}`)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
          boxShadow: hovered ? '0 24px 56px rgba(15,52,96,0.18)' : '0 8px 24px rgba(15,52,96,0.1)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.3s ease',
          border: '1px solid var(--blue-pale)',
          background: 'var(--white)',
        }}
      >
        <div style={{ height: 200, background: post.gradient, position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
          <span style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: 'white', fontSize: '0.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.3)' }}>
            {post.category}
          </span>
          <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: 'white', fontSize: '0.68rem', fontWeight: 600, padding: '3px 10px', borderRadius: 100 }}>
            ⭐ Featured
          </span>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--blue-deep)', marginBottom: '0.6rem', lineHeight: 1.35 }}>{post.title}</h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: 'var(--text-light)', lineHeight: 1.65, marginBottom: '1.25rem' }}>{post.excerpt}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #0f3460, #2980b9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: 'white', fontWeight: 700 }}>
                {post.author.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)' }}>{post.author}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'var(--text-light)' }}>{post.date} · {post.readTime} read</div>
              </div>
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-light)' }}>👁 {post.views.toLocaleString()}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={() => onNavigate(`/blog/${post.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', gap: '1rem', padding: '1.25rem',
        background: 'var(--white)', borderRadius: 14,
        border: `1px solid ${hovered ? 'var(--sky)' : 'var(--blue-pale)'}`,
        cursor: 'pointer',
        boxShadow: hovered ? '0 8px 24px rgba(15,52,96,0.1)' : 'none',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        transition: 'all 0.25s ease',
      }}
    >
      <div style={{ width: 72, height: 72, borderRadius: 12, background: post.gradient, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--sky)', background: 'var(--sky-light)', padding: '2px 8px', borderRadius: 100 }}>{post.category}</span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-light)' }}>{post.readTime} read</span>
        </div>
        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--blue-deep)', marginBottom: '0.3rem', lineHeight: 1.3 }}>{post.title}</h4>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-light)', lineHeight: 1.5, margin: 0 }}>{post.excerpt.slice(0, 100)}…</p>
        <div style={{ marginTop: '0.5rem', fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text-light)' }}>
          {post.author} · {post.date}
        </div>
      </div>
    </div>
  )
}

export default function BlogPage() {
  const { navigate } = useRouter()
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const PER_PAGE = 6

  const filtered = useMemo(() => {
    let list = POSTS
    if (activeCategory !== 'All') list = list.filter(p => p.category === activeCategory)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      )
    }
    return list
  }, [activeCategory, search])

  const featured = POSTS.filter(p => p.featured)
  const paginated = filtered.slice(0, page * PER_PAGE)

  return (
    <div className="page-wrapper" style={{ background: 'var(--off-white)' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0f3460 0%, #1a5276 40%, #2980b9 100%)',
        padding: '5rem 4rem 4rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(93,173,226,0.2) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 700 }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>✍️ Puja Samargi Journal</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
            Insights for a<br />Healthier Mind
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: 520, marginBottom: '2rem' }}>
            Expert-written articles on mental health, therapy techniques, and wellbeing — grounded in science, written for Nepal.
          </p>
          {/* Search */}
          <div style={{ display: 'flex', gap: '0.75rem', maxWidth: 480 }}>
            <input
              value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search articles, topics, or tags…"
              style={{
                flex: 1, padding: '0.85rem 1.1rem',
                border: '2px solid rgba(255,255,255,0.25)',
                borderRadius: 12, background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)', color: 'white',
                fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none',
              }}
            />
            <button className="btn btn-primary" style={{ borderRadius: 12, background: 'white', color: '#0f3460', fontWeight: 700, border: 'none', padding: '0.85rem 1.5rem' }}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 4rem' }}>

        {/* Featured */}
        {!search && activeCategory === 'All' && (
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--blue-deep)', marginBottom: '1.5rem' }}>⭐ Featured Articles</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {featured.map(p => <PostCard key={p.id} post={p} onNavigate={navigate} featured />)}
            </div>
          </div>
        )}

        {/* Category filter */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setPage(1) }}
              style={{
                padding: '0.45rem 1.1rem', borderRadius: 100,
                border: `1.5px solid ${activeCategory === cat ? '#2980b9' : 'var(--blue-pale)'}`,
                background: activeCategory === cat ? 'linear-gradient(135deg, #0f3460, #2980b9)' : 'var(--white)',
                color: activeCategory === cat ? 'white' : 'var(--text-mid)',
                fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
              }}>{cat}</button>
          ))}
        </div>

        {/* Results count */}
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: '1.5rem' }}>
          {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
          {activeCategory !== 'All' && ` in ${activeCategory}`}
          {search && ` for "${search}"`}
        </div>

        {/* Post list */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-light)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem' }}>No articles found. Try a different search or category.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {paginated.map(p => <PostCard key={p.id} post={p} onNavigate={navigate} />)}
          </div>
        )}

        {/* Load more */}
        {paginated.length < filtered.length && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button className="btn btn-outline" onClick={() => setPage(p => p + 1)} style={{ padding: '0.8rem 2.5rem' }}>
              Load More Articles
            </button>
          </div>
        )}

        {/* Newsletter */}
        <div style={{
          marginTop: '4rem', padding: '3rem',
          background: 'linear-gradient(135deg, #0f3460 0%, #2980b9 100%)',
          borderRadius: 20, textAlign: 'center',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📬</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'white', marginBottom: '0.75rem' }}>Get Wellness Insights Weekly</h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', marginBottom: '1.5rem' }}>
            Join 4,000+ readers. No spam, just thoughtful mental health content.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', maxWidth: 420, margin: '0 auto' }}>
            <input placeholder="your@email.com" style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: 10, border: 'none', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none' }} />
            <button style={{ padding: '0.8rem 1.5rem', borderRadius: 10, border: 'none', background: 'white', color: '#0f3460', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  )
}