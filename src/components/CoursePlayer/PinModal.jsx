// src/components/CoursePlayer/PinModal.jsx
import { useState, useEffect, useCallback } from 'react'
import styles from './CoursePlayer.module.css'

const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, '⌫']

export default function PinModal({ playlist, onSuccess, onClose, onSubmit }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)

  const handleKey = useCallback((k) => {
    if (loading) return
    setError('')
    if (k === '⌫') {
      setPin(p => p.slice(0, -1))
    } else if (k !== null && pin.length < 4) {
      setPin(p => p + String(k))
    }
  }, [pin, loading])

  // Keyboard support
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') { onClose(); return }
      if (/^[0-9]$/.test(e.key)) handleKey(Number(e.key))
      if (e.key === 'Backspace') handleKey('⌫')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleKey, onClose])

  // Auto-submit when 4 digits entered
  useEffect(() => {
    if (pin.length === 4) {
      submitPin()
    }
  }, [pin]) // eslint-disable-line

  async function submitPin() {
    setLoading(true)
    setError('')
    try {
      const result = await onSubmit(playlist.id, pin)
      if (result.success) {
        onSuccess(playlist.id)
      } else {
        setError('Incorrect PIN. Please try again.')
        setShake(true)
        setTimeout(() => { setShake(false); setPin('') }, 600)
      }
    } catch {
      setError('Something went wrong. Try again.')
      setPin('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.pinBackdrop} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className={`${styles.pinModal} ${shake ? styles.shake : ''}`}>
        <button className={styles.pinClose} onClick={onClose} aria-label="Close">✕</button>

        <div className={styles.pinEmoji}>{playlist.emoji}</div>
        <h2 className={styles.pinTitle}>Enter PIN</h2>
        <p className={styles.pinSub}>{playlist.title}</p>

        {/* Dot indicators */}
        <div className={styles.pinDots} aria-label={`${pin.length} of 4 digits entered`}>
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className={`${styles.pinDot} ${i < pin.length ? styles.pinDotFilled : ''} ${loading ? styles.pinDotLoading : ''}`}
            />
          ))}
        </div>

        {/* Error message */}
        <p className={styles.pinError} role="alert">{error}</p>

        {/* Keypad */}
        <div className={styles.pinKeypad}>
          {KEYS.map((k, i) => (
            <button
              key={i}
              className={`${styles.pinKey} ${k === null ? styles.pinKeyHidden : ''} ${k === '⌫' ? styles.pinKeyDelete : ''}`}
              onClick={() => handleKey(k)}
              disabled={k === null || loading}
              aria-label={k === '⌫' ? 'Delete' : k === null ? '' : String(k)}
            >
              {k === '⌫' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
                  <line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/>
                </svg>
              ) : k}
            </button>
          ))}
        </div>

        {loading && <p className={styles.pinLoading}>Verifying…</p>}
      </div>
    </div>
  )
}
