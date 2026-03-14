const resources = [
  {
    type: 'Worksheet',
    emoji: '📄',
    title: 'Anxiety Management Worksheet',
    desc: 'Practical CBT exercises to manage anxious thoughts.',
    downloads: '1.2k downloads',
    free: true,
  },
  {
    type: 'Audio',
    emoji: '🎧',
    title: 'Guided Meditation — 10 min',
    desc: 'Calm your mind with this Nepali-language guided session.',
    downloads: '890 listens',
    free: true,
  },
  {
    type: 'eBook',
    emoji: '📖',
    title: 'Understanding Depression',
    desc: 'A compassionate guide to understanding and living with depression.',
    downloads: '650 downloads',
    free: false,
  },
  {
    type: 'Tool',
    emoji: '🧩',
    title: 'Mood Tracker Template',
    desc: 'Daily mood logging template for consistent mental health tracking.',
    downloads: '2.1k uses',
    free: true,
  },
]

export default function Resources() {
  return (
    <section className="section resources" id="resources">
      <div className="section-header">
        <div>
          <span className="section-tag">Free Resources</span>
          <h2 className="section-title">Tools to Support Your <em>Everyday</em> Wellness</h2>
          <p className="section-desc">
            Download worksheets, guided audios, eBooks, and trackers — curated by our clinical team.
          </p>
        </div>
        <button className="btn btn-outline">View All Resources</button>
      </div>

      <div className="resources-grid">
        {resources.map((r, i) => (
          <div className="resource-card" key={i}>
            <span className="resource-type">{r.type}</span>
            <div className="resource-emoji">{r.emoji}</div>
            <h4>{r.title}</h4>
            <p>{r.desc}</p>
            <div className="resource-meta">
              <span>{r.downloads}</span>
              <span className={r.free ? 'resource-free' : ''}>
                {r.free ? 'FREE' : 'Premium'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}