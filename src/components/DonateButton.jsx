import { useState } from 'react'

export default function DonateButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating Donate Button */}
      <button
        onClick={() => setOpen(true)}
        title="Donate to support us"
        style={{
          position: 'fixed',
          bottom: '28px',
          left: '28px',
          zIndex: 1000,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f97316, #ef4444)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(249,115,22,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.12)'
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(249,115,22,0.6)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(249,115,22,0.45)'
        }}
      >
        {/* Heart + hand donate icon */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21C12 21 3 14.5 3 8.5C3 6.01 5.01 4 7.5 4C9.24 4 10.91 5.01 11.72 6.5H12.28C13.09 5.01 14.76 4 16.5 4C18.99 4 21 6.01 21 8.5C21 14.5 12 21 12 21Z" fill="white" opacity="0.9"/>
          <path d="M8 17H6C5.45 17 5 17.45 5 18V20C5 20.55 5.45 21 6 21H8" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7"/>
        </svg>
      </button>

      {/* Tooltip label */}
      <div
        style={{
          position: 'fixed',
          bottom: '36px',
          left: '96px',
          zIndex: 999,
          background: 'rgba(0,0,0,0.75)',
          color: '#fff',
          fontSize: '12px',
          fontWeight: 600,
          padding: '4px 10px',
          borderRadius: '20px',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          letterSpacing: '0.03em',
        }}
      >
        Support Us 🙏
      </div>

      {/* Modal Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(4px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            padding: '0 0 100px 24px',
          }}
        >
          {/* Card */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: '20px',
              width: '320px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
              overflow: 'hidden',
              animation: 'slideUp 0.3s ease',
            }}
          >
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #f97316, #ef4444)',
              padding: '18px 20px 14px',
              position: 'relative',
            }}>
              <button
                onClick={() => setOpen(false)}
                style={{
                  position: 'absolute', top: '12px', right: '14px',
                  background: 'rgba(255,255,255,0.25)', border: 'none',
                  color: '#fff', borderRadius: '50%', width: '26px', height: '26px',
                  cursor: 'pointer', fontSize: '14px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontWeight: 700,
                }}
              >✕</button>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Support Our Mission</p>
              <h2 style={{ margin: '4px 0 0', color: '#fff', fontSize: '20px', fontWeight: 800, lineHeight: 1.2 }}>
                Donate to Puja Samargi 🙏
              </h2>
            </div>

            {/* QR Code */}
            <div style={{ padding: '18px 20px 12px', textAlign: 'center' }}>
              <div style={{
                background: '#fef9f5',
                border: '2px dashed #f97316',
                borderRadius: '14px',
                padding: '14px',
                display: 'inline-block',
              }}>
                <img
                  src="/payment-qr.png"
                  alt="Payment QR Code"
                  style={{ width: '160px', height: '160px', objectFit: 'contain', display: 'block' }}
                />
              </div>
              <p style={{ margin: '10px 0 0', fontSize: '12px', color: '#888', fontWeight: 500 }}>
                Scan with any UPI / payment app
              </p>
            </div>

            {/* What your donation does */}
            <div style={{ padding: '0 20px 20px' }}>
              <p style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 700, color: '#333', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Your donation helps us:
              </p>
              {[
                { icon: '🧠', text: 'Provide free mental health resources to those in need' },
                { icon: '💬', text: 'Subsidise therapy sessions for low-income families' },
                { icon: '📚', text: 'Create awareness programs in schools & communities' },
                { icon: '🤝', text: 'Train local mental health volunteers across Nepal' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '16px', lineHeight: 1.4 }}>{icon}</span>
                  <p style={{ margin: 0, fontSize: '13px', color: '#555', lineHeight: 1.5 }}>{text}</p>
                </div>
              ))}
              <p style={{
                marginTop: '14px', padding: '10px 14px',
                background: 'linear-gradient(135deg, #fff7ed, #fef3c7)',
                borderRadius: '10px', fontSize: '12px',
                color: '#92400e', textAlign: 'center', fontWeight: 600,
                border: '1px solid #fed7aa',
              }}>
                Every rupee makes a difference. Thank you! ❤️
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}