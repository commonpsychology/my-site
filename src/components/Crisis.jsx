const lines = [
  { icon: '☎️', name: 'TPO Nepal Helpline', phone: '1660-01-11002' },
  { icon: '💬', name: 'Saathi Helpline', phone: '16600-11-100' },
  { icon: '🏥', name: 'Mental Health Helpline', phone: '1800-274-1234' },
]

export default function Crisis() {
  return (
    <section className="crisis">
      <div className="crisis-inner">
        <div className="crisis-left">
          <div className="crisis-tag">🆘 Crisis Support</div>
          <h2 className="crisis-title">You Are Not Alone</h2>
          <p className="crisis-desc">
            If you or someone you know is in emotional distress or crisis, 
            please reach out to these free, confidential helplines available in Nepal.
          </p>
        </div>

        <div className="crisis-numbers">
          {lines.map((l, i) => (
            <div className="crisis-number" key={i}>
              <span className="crisis-number-icon">{l.icon}</span>
              <div>
                <div className="crisis-number-name">{l.name}</div>
                <div className="crisis-number-phone">{l.phone}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}