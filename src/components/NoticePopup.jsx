import { useEffect, useState } from 'react'

const NOTICES = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#0F6E56" strokeWidth="1.2"/>
        <path d="M5 3V2M11 3V2M2 6.5h12" stroke="#0F6E56" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    iconBg: '#E1F5EE',
    title: '2026-04-30 AWARNESS PROGRAM IN COLLABORATION WITH ABC FOUNDATION AT TRIBHUVAN UNIVERSITY',
    // body: 'In-person sessions will not be available next week. Please reschedule any upcoming appointments.',
//   },
// //   {
// //     icon: (
// //       <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
// //         <circle cx="8" cy="8" r="5.5" stroke="#0F6E56" strokeWidth="1.2"/>
// //         <path d="M8 5v3.5l2 1" stroke="#0F6E56" strokeWidth="1.2" strokeLinecap="round"/>
// //       </svg>
// //     ),
//     // iconBg: '#E1F5EE',
//     // title: 'Online services fully available 24/7',
//     // body: 'Assessments, resources, and therapist messaging remain uninterrupted throughout.',
//   },
//   {
//     icon: (
//       <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//         <path d="M8 2L9.5 6h4l-3.25 2.5L11.5 13 8 10.5 4.5 13l1.25-4.5L2.5 6h4z"
//           stroke="#854F0B" strokeWidth="1.2" strokeLinejoin="round"/>
//       </svg>
//     ),
//     // iconBg: '#FAEEDA',
//     // title: 'New: crisis support now available',
//     // body: 'Reach our on-call therapist any time via the crisis button on the home page.',
},
]

export default function NoticePopup({ storageKey = 'notice_v2' }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem(storageKey)) setVisible(true)
  }, [storageKey])

  const dismiss = () => {
    sessionStorage.setItem(storageKey, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(4,52,44,0.92)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
    }}>
      <div style={{
        background: 'var(--color-background-primary, #fff)',
        borderRadius: 16, width: '100%', maxWidth: 460,
        overflow: 'hidden',
        border: '0.5px solid var(--color-border-tertiary, #e0e0e0)',
        animation: 'noticeIn 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
      }}>
        <style>{`
          @keyframes noticeIn {
            from { opacity:0; transform:scale(0.96) translateY(8px); }
            to   { opacity:1; transform:scale(1) translateY(0); }
          }
          @keyframes noticePulse {
            0%,100% { opacity:1; } 50% { opacity:0.4; }
          }
        `}</style>

        {/* Header */}
        <div style={{
          background: '#04342C', padding: '1.5rem 1.5rem 1.25rem',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -30, right: -30,
            width: 130, height: 130, borderRadius: '50%',
            border: '1px solid rgba(29,158,117,0.3)',
          }} />
          <div style={{
            position: 'absolute', top: -10, right: -10,
            width: 80, height: 80, borderRadius: '50%',
            border: '1px solid rgba(29,158,117,0.2)',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#5DCAA5', display: 'inline-block',
                animation: 'noticePulse 1.8s ease-in-out infinite',
              }} />
              <span style={{ fontSize: 11, fontWeight: 500, color: '#5DCAA5', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Live notice
              </span>
            </div>
            <button
              onClick={dismiss}
              aria-label="Close"
              style={{
                width: 28, height: 28, borderRadius: '50%',
                border: '0.5px solid rgba(93,202,165,0.35)',
                background: 'transparent', color: '#5DCAA5',
                fontSize: 14, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 0,
              }}
            >✕</button>
          </div>

          <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 500, color: '#E1F5EE', lineHeight: 1.25 }}>
            Important announcement
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: '#5DCAA5' }}>
            From the team — please read before continuing
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem' }}>
          {NOTICES.map((n, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              padding: '10px 0',
              borderBottom: i < NOTICES.length - 1 ? '0.5px solid var(--color-border-tertiary, #eee)' : 'none',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: n.iconBg, flexShrink: 0, marginTop: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{n.icon}</div>
              <div>
                <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>
                  {n.title}
                </p>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {n.body}
                </p>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '1.25rem', display: 'flex', gap: 8 }}>
            <button
              onClick={dismiss}
              style={{
                flex: 2, padding: '10px 0', borderRadius: 8,
                background: '#1D9E75', border: 'none',
                color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer',
              }}
            >Understood, continue</button>
            <button
              onClick={dismiss}
              style={{
                flex: 1, padding: '10px 0', borderRadius: 8,
                background: 'transparent',
                border: '0.5px solid var(--color-border-secondary, #ccc)',
                color: 'var(--color-text-secondary)', fontSize: 13, cursor: 'pointer',
              }}
            >Dismiss</button>
          </div>
        </div>
      </div>
    </div>
  )
}