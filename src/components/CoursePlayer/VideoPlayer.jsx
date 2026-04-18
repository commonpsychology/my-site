// src/components/CoursePlayer/VideoPlayer.jsx
// Handles both YouTube/Vimeo embeds and direct MP4 URLs.
// For MP4: full custom controls (play/pause, scrub, volume, speed, fullscreen, PiP).
// For YouTube/Vimeo: iframe embed with autoplay.

import { useRef, useState, useEffect, useCallback } from 'react'
import styles from './CoursePlayer.module.css'

// ── helpers ───────────────────────────────────────────────────────────────────

function fmtTime(secs) {
  if (!secs || isNaN(secs)) return '0:00'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function getEmbedUrl(url) {
  if (!url) return null
  if (url.includes('/embed/') || url.includes('player.vimeo')) return url
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1`
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`
  return null  // treat as direct MP4
}

function isDirectVideo(url) {
  if (!url) return false
  return !getEmbedUrl(url) || /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
)
const PauseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
  </svg>
)
const VolumeIcon = ({ muted, level }) => {
  if (muted || level === 0) return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2"/>
      <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
  if (level < 0.5) return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}
const FullscreenIcon = ({ active }) => active ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
  </svg>
)
const PipIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <rect x="12" y="9" width="9" height="6" rx="1"/>
  </svg>
)
const SkipIcon = ({ forward }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ transform: forward ? 'none' : 'scaleX(-1)' }}>
    <path d="M6 18L14.5 12 6 6v12zM16 6v12h2V6h-2z"/>
  </svg>
)

// ── Native MP4 player ─────────────────────────────────────────────────────────

function NativePlayer({ video }) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const progressRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const [buffered, setBuffered] = useState(0)
  const hideTimer = useRef(null)

  const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2]

  function resetHideTimer() {
    setShowControls(true)
    clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => {
      if (playing) setShowControls(false)
    }, 3000)
  }

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    const onLoaded = () => setDuration(vid.duration)
    const onTime = () => {
      setCurrentTime(vid.currentTime)
      if (vid.buffered.length) setBuffered(vid.buffered.end(vid.buffered.length - 1))
    }
    const onPlay = () => setPlaying(true)
    const onPause = () => { setPlaying(false); setShowControls(true) }
    const onEnded = () => { setPlaying(false); setShowControls(true) }
    const onFs = () => setFullscreen(!!document.fullscreenElement)

    vid.addEventListener('loadedmetadata', onLoaded)
    vid.addEventListener('timeupdate', onTime)
    vid.addEventListener('play', onPlay)
    vid.addEventListener('pause', onPause)
    vid.addEventListener('ended', onEnded)
    document.addEventListener('fullscreenchange', onFs)

    return () => {
      vid.removeEventListener('loadedmetadata', onLoaded)
      vid.removeEventListener('timeupdate', onTime)
      vid.removeEventListener('play', onPlay)
      vid.removeEventListener('pause', onPause)
      vid.removeEventListener('ended', onEnded)
      document.removeEventListener('fullscreenchange', onFs)
      clearTimeout(hideTimer.current)
    }
  }, [])

  // Reset on video change
  useEffect(() => {
    const vid = videoRef.current
    if (vid) {
      vid.load()
      setCurrentTime(0)
      setDuration(0)
      setPlaying(false)
    }
  }, [video.url])

  const togglePlay = useCallback(() => {
    const vid = videoRef.current
    if (!vid) return
    if (vid.paused) vid.play()
    else vid.pause()
    resetHideTimer()
  }, [playing]) // eslint-disable-line

  const seek = useCallback((e) => {
    const vid = videoRef.current
    const bar = progressRef.current
    if (!vid || !bar || !duration) return
    const rect = bar.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    vid.currentTime = (x / rect.width) * duration
    resetHideTimer()
  }, [duration]) // eslint-disable-line

  const skip = useCallback((secs) => {
    const vid = videoRef.current
    if (!vid) return
    vid.currentTime = Math.max(0, Math.min(vid.currentTime + secs, duration))
    resetHideTimer()
  }, [duration]) // eslint-disable-line

  const changeVolume = (v) => {
    const vid = videoRef.current
    if (!vid) return
    const clamped = Math.max(0, Math.min(1, v))
    vid.volume = clamped
    vid.muted = clamped === 0
    setVolume(clamped)
    setMuted(clamped === 0)
  }

  const toggleMute = () => {
    const vid = videoRef.current
    if (!vid) return
    vid.muted = !vid.muted
    setMuted(vid.muted)
  }

  const toggleFullscreen = () => {
    const el = containerRef.current
    if (!document.fullscreenElement) el.requestFullscreen()
    else document.exitFullscreen()
  }

  const togglePip = async () => {
    const vid = videoRef.current
    if (!vid) return
    if (document.pictureInPictureElement) await document.exitPictureInPicture()
    else await vid.requestPictureInPicture()
  }

  const cycleSpeed = () => {
    const vid = videoRef.current
    if (!vid) return
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length]
    vid.playbackRate = next
    setSpeed(next)
    resetHideTimer()
  }

  const progress = duration ? (currentTime / duration) * 100 : 0
  const bufferProgress = duration ? (buffered / duration) * 100 : 0

  return (
    <div
      ref={containerRef}
      className={styles.nativePlayer}
      onMouseMove={resetHideTimer}
      onMouseLeave={() => { if (playing) setShowControls(false) }}
    >
      <video
        ref={videoRef}
        className={styles.videoEl}
        onClick={togglePlay}
        onDoubleClick={toggleFullscreen}
        preload="metadata"
        playsInline
      >
        <source src={video.url} />
        Your browser does not support this video format.
      </video>

      {/* Big play button overlay */}
      {!playing && (
        <button className={styles.bigPlayBtn} onClick={togglePlay} aria-label="Play">
          <PlayIcon />
        </button>
      )}

      {/* Controls bar */}
      <div className={`${styles.controls} ${showControls ? styles.controlsVisible : ''}`}>
        {/* Progress / scrub bar */}
        <div
          ref={progressRef}
          className={styles.progressTrack}
          onClick={seek}
          role="slider"
          aria-label="Video progress"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(currentTime)}
        >
          <div className={styles.progressBuffer} style={{ width: `${bufferProgress}%` }} />
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          <div className={styles.progressThumb} style={{ left: `${progress}%` }} />
        </div>

        <div className={styles.controlsRow}>
          {/* Left controls */}
          <div className={styles.controlsLeft}>
            <button className={styles.ctrlBtn} onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button className={styles.ctrlBtn} onClick={() => skip(-10)} aria-label="Rewind 10 seconds">
              <SkipIcon forward={false} />
            </button>
            <button className={styles.ctrlBtn} onClick={() => skip(10)} aria-label="Skip forward 10 seconds">
              <SkipIcon forward={true} />
            </button>

            {/* Volume */}
            <button className={styles.ctrlBtn} onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
              <VolumeIcon muted={muted} level={volume} />
            </button>
            <input
              type="range" min="0" max="1" step="0.05"
              value={muted ? 0 : volume}
              onChange={e => changeVolume(parseFloat(e.target.value))}
              className={styles.volSlider}
              aria-label="Volume"
            />

            <span className={styles.timeDisplay}>
              {fmtTime(currentTime)} / {fmtTime(duration)}
            </span>
          </div>

          {/* Right controls */}
          <div className={styles.controlsRight}>
            <button className={styles.ctrlBtn} onClick={cycleSpeed} aria-label="Playback speed" title="Playback speed">
              <span className={styles.speedLabel}>{speed}×</span>
            </button>
            {'pictureInPictureEnabled' in document && (
              <button className={styles.ctrlBtn} onClick={togglePip} aria-label="Picture in picture">
                <PipIcon />
              </button>
            )}
            <button className={styles.ctrlBtn} onClick={toggleFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
              <FullscreenIcon active={fullscreen} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Embed player (YouTube / Vimeo) ────────────────────────────────────────────

function EmbedPlayer({ video, embedUrl }) {
  return (
    <div className={styles.embedWrapper}>
      <iframe
        src={embedUrl}
        title={video.title}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        className={styles.embedIframe}
      />
    </div>
  )
}

// ── Main VideoPlayer export ───────────────────────────────────────────────────

export default function VideoPlayer({ video }) {
  if (!video) return (
    <div className={styles.playerEmpty}>
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <polygon points="10 8 16 11 10 14" fill="currentColor" stroke="none"/>
      </svg>
      <p>Select a video to begin</p>
    </div>
  )

  const embedUrl = getEmbedUrl(video.url || video.video_url)
  const direct = isDirectVideo(video.url || video.video_url)

  if (direct) {
    return <NativePlayer video={{ ...video, url: video.url || video.video_url }} />
  }
  return <EmbedPlayer video={video} embedUrl={embedUrl} />
}