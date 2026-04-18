// src/pages/OnlineCourses.jsx
// Full course playlist player page.
// - YouTube/Vimeo: iframe embed with autoplay
// - MP4/direct: custom HTML5 player (play/pause, scrub, volume, speed, PiP, fullscreen)
// - Playlists with PIN gate: PIN verified server-side, unlock persisted to DB
//
// Requires in your api.js / services:
//   import { playlists as playlistsApi } from '../services/playlistsApi'
// Or inline the fetch calls as shown below.

import { useEffect, useState, useCallback, useRef } from 'react'
import VideoPlayer from '../components/CoursePlayer/VideoPlayer'
import PinModal from '../components/CoursePlayer/PinModal'
import styles from '../components/CoursePlayer/CoursePlayer.module.css'
import { playlists as playlistsApi } from '../services/playlistsApi'

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtSecs(totalSecs) {
  if (!totalSecs) return ''
  const h = Math.floor(totalSecs / 3600)
  const m = Math.floor((totalSecs % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

function fmtDuration(secs) {
  if (!secs) return ''
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

// ── LockIcon ──────────────────────────────────────────────────────────────────

function LockIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

function CheckIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

// ── PlaylistSidebar ───────────────────────────────────────────────────────────

function PlaylistSidebar({ playlists, activeId, onSelect, onLockClick }) {
  return (
    <aside className={styles.sidebar}>
      <p className={styles.sidebarLabel}>Playlists</p>
      {playlists.map(pl => {
        const locked = pl.requires_pin && !pl.is_unlocked
        const active = pl.id === activeId
        return (
          <div
            key={pl.id}
            className={`${styles.playlistItem} ${active ? styles.active : ''} ${locked ? styles.locked : ''}`}
            onClick={() => locked ? onLockClick(pl) : onSelect(pl)}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') locked ? onLockClick(pl) : onSelect(pl) }}
            aria-label={`${pl.title}${locked ? ' — PIN required' : ''}`}
            aria-current={active ? 'true' : undefined}
          >
            <div className={styles.playlistEmoji}>{pl.emoji || '📚'}</div>
            <div className={styles.playlistMeta}>
              <div className={styles.playlistTitle}>{pl.title}</div>
              <div className={styles.playlistSub}>
                {pl.video_count} video{pl.video_count !== 1 ? 's' : ''}
                {pl.total_duration_secs ? ` · ${fmtSecs(pl.total_duration_secs)}` : ''}
              </div>
            </div>
            <span className={`${styles.lockBadge} ${locked ? styles.locked : styles.unlocked}`}>
              {locked ? <LockIcon /> : <CheckIcon />}
            </span>
          </div>
        )
      })}
    </aside>
  )
}

// ── VideoList ─────────────────────────────────────────────────────────────────

function VideoList({ videos, activeId, onSelect, playlistTitle }) {
  return (
    <div>
      <div className={styles.videoListHeader}>
        <span className={styles.videoListTitle}>{playlistTitle}</span>
        <span className={styles.videoListCount}>{videos.length} videos</span>
      </div>
      {videos.length === 0 && (
        <p style={{ fontSize: 13, color: 'rgba(180,195,230,0.4)', padding: '1rem 0' }}>
          No videos in this playlist yet.
        </p>
      )}
      {videos.map((v, i) => (
        <div
          key={v.id}
          className={`${styles.videoRow} ${v.id === activeId ? styles.active : ''}`}
          onClick={() => onSelect(v)}
          role="button"
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onSelect(v) }}
          aria-label={`Play ${v.title}`}
          aria-current={v.id === activeId ? 'true' : undefined}
        >
          <span className={styles.videoNum}>{i + 1}</span>
          <div className={styles.videoThumb}>
            {v.thumbnail_url && (
              <img src={v.thumbnail_url} alt="" loading="lazy" />
            )}
            {v.duration_secs && (
              <span className={styles.durationBadge}>{fmtDuration(v.duration_secs)}</span>
            )}
          </div>
          <div className={styles.videoDetails}>
            <div className={styles.videoTitle}>{v.title}</div>
            {v.description && (
              <div className={styles.videoDesc}>{v.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function OnlineCourses() {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [activePlaylist, setActivePlaylist] = useState(null)
  const [videos, setVideos] = useState([])
  const [videosLoading, setVideosLoading] = useState(false)

  const [activeVideo, setActiveVideo] = useState(null)

  // PIN modal state
  const [pinPlaylist, setPinPlaylist] = useState(null)  // playlist awaiting PIN

  // ── Load playlists ──────────────────────────────────────────────────────────

  const loadPlaylists = useCallback(() => {
    setLoading(true)
    setError(null)
    playlistsApi.getAll()
      .then(data => {
        const list = Array.isArray(data) ? data : (data.playlists || [])
        setPlaylists(list)
        // Auto-select first unlocked playlist
        const first = list.find(p => p.is_unlocked)
        if (first) selectPlaylist(first, list)
      })
      .catch(err => setError(err.message || 'Failed to load playlists'))
      .finally(() => setLoading(false))
  }, []) // eslint-disable-line

  useEffect(() => { loadPlaylists() }, [loadPlaylists])

  // ── Select playlist → load its videos ──────────────────────────────────────

  const selectPlaylist = useCallback((pl, currentPlaylists) => {
    setActivePlaylist(pl)
    setActiveVideo(null)
    setVideos([])
    setVideosLoading(true)

    playlistsApi.getVideos(pl.id)
      .then(data => {
        const list = Array.isArray(data) ? data : (data.videos || [])
        setVideos(list)
        // Auto-play first video
        if (list.length > 0) setActiveVideo(list[0])
      })
      .catch(err => {
        if (err.status === 403 || (err.message || '').toLowerCase().includes('pin')) {
          // Should not happen — guard handled by PIN modal — but safety fallback
          setPinPlaylist(pl)
        } else {
          setError(err.message || 'Failed to load videos')
        }
      })
      .finally(() => setVideosLoading(false))
  }, [])

  // ── PIN unlock ──────────────────────────────────────────────────────────────

  const handleLockClick = useCallback((pl) => {
    setPinPlaylist(pl)
  }, [])

  const handlePinSuccess = useCallback((playlistId) => {
    // Mark playlist as unlocked in local state
    setPlaylists(prev => prev.map(p =>
      p.id === playlistId ? { ...p, is_unlocked: true } : p
    ))
    const pl = playlists.find(p => p.id === playlistId)
    setPinPlaylist(null)
    if (pl) selectPlaylist({ ...pl, is_unlocked: true }, playlists)
  }, [playlists, selectPlaylist])

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className={styles.page}>

      {/* Hero */}
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>Course Video Library</h1>
        <p className={styles.heroSub}>
          Browse your playlists. Click a video to start watching.
        </p>
      </header>

      {loading && (
        <div className={styles.loadingWrap}>
          <div className={styles.spinner} />
          <span style={{ fontSize: 13 }}>Loading your playlists…</span>
        </div>
      )}

      {error && !loading && (
        <div style={{ padding: '2rem' }}>
          <div className={styles.errorBox}>
            <p>{error}</p>
            <button className={styles.retryBtn} onClick={loadPlaylists}>Retry</button>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className={styles.layout}>
          {/* ── Sidebar ── */}
          <PlaylistSidebar
            playlists={playlists}
            activeId={activePlaylist?.id}
            onSelect={pl => selectPlaylist(pl, playlists)}
            onLockClick={handleLockClick}
          />

          {/* ── Main ── */}
          <main className={styles.mainContent}>
            {!activePlaylist ? (
              <div className={styles.welcome}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <path d="M8 21h8M12 17v4"/>
                  <polygon points="10 8 16 11 10 14" fill="currentColor" stroke="none"/>
                </svg>
                <p>Select a playlist from the sidebar to get started</p>
              </div>
            ) : (
              <>
                {/* Player */}
                <div className={styles.playerWrap}>
                  {videosLoading ? (
                    <div className={styles.playerEmpty}>
                      <div className={styles.spinner} />
                    </div>
                  ) : (
                    <VideoPlayer video={activeVideo} />
                  )}
                </div>

                {/* Now playing info */}
                {activeVideo && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p className={styles.nowPlayingLabel}>Now playing</p>
                    <h2 className={styles.nowPlayingTitle}>{activeVideo.title}</h2>
                    {activeVideo.description && (
                      <p className={styles.nowPlayingDesc}>{activeVideo.description}</p>
                    )}
                  </div>
                )}

                {/* Video list */}
                {!videosLoading && (
                  <VideoList
                    videos={videos}
                    activeId={activeVideo?.id}
                    onSelect={setActiveVideo}
                    playlistTitle={activePlaylist.title}
                  />
                )}
              </>
            )}
          </main>
        </div>
      )}

      {/* PIN modal — rendered at page level so it overlays everything */}
      {pinPlaylist && (
        <PinModal
          playlist={pinPlaylist}
          onSubmit={playlistsApi.unlock}
          onSuccess={handlePinSuccess}
          onClose={() => setPinPlaylist(null)}
        />
      )}
    </div>
  )
}