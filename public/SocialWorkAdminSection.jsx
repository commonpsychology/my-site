// SocialWorkAdminSection.jsx
// Drop-in admin section for managing Social Work Programs.
//
// USAGE in AdminDashboardPage.jsx:
//   1. Import:  import SocialWorkAdminSection from './SocialWorkAdminSection'
//   2. Add sidebar entry: { id: 'social_work', label: 'Social Work', icon: '🤝' }
//   3. Render:  {tab === 'social_work' && <SocialWorkAdminSection />}
//
// Requires the same CSS injected by AdminDashboardPage (adm-v2-css).
// All helpers (apiFetch, getToken) are re-declared locally so this file
// is completely self-contained.

import { useState, useEffect, useCallback } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const getToken = () => localStorage.getItem('accessToken')
const apiFetch = async (path, opts = {}) => {
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
      ...(opts.headers || {}),
    },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`)
  return data
}

// ── Tiny shared helpers ───────────────────────────────────────
function Badge({ s }) {
  const map = { active: 'badge-green', Active: 'badge-green', inactive: 'badge-gray', draft: 'badge-gray', true: 'badge-green', false: 'badge-gray' }
  return <span className={`badge ${map[String(s)] || 'badge-blue'}`}>{String(s)}</span>
}
function Toggle({ on, onChange }) {
  return <button type="button" className={`toggle${on ? ' on' : ''}`} onClick={() => onChange(!on)} />
}
function Confirm({ msg, onConfirm, onCancel }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal confirm-dialog" onClick={e => e.stopPropagation()}>
        <div className="modal-head"><span className="modal-head-title">⚠️ Confirm</span></div>
        <div className="modal-body"><p className="confirm-msg">{msg}</p></div>
        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

// ── JSON array field helpers ──────────────────────────────────
// Converts array ↔ newline-separated string for textarea editing
const arrToText = arr => (Array.isArray(arr) ? arr : []).join('\n')
const textToArr = txt => txt.split('\n').map(s => s.trim()).filter(Boolean)

// ── Gradient presets ─────────────────────────────────────────
const GRADIENT_PRESETS = [
  { label: 'Sky Blue',   val: 'linear-gradient(135deg, #007BA8 0%, #00BFFF 60%, #a0e9ff 100%)' },
  { label: 'Deep Blue',  val: 'linear-gradient(135deg, #0f4c6b 0%, #009FD4 60%, #22d3ee 100%)' },
  { label: 'Warm Earth', val: 'linear-gradient(135deg, #b56a28 0%, #d4a574 60%, #f5ede0 100%)' },
  { label: 'Dark Navy',  val: 'linear-gradient(135deg, #1a3a4a 0%, #2e6080 60%, #5b9ab5 100%)' },
  { label: 'Forest',     val: 'linear-gradient(135deg, #2d4a3e 0%, #3d6b5a 60%, #6a9e88 100%)' },
  { label: 'Ocean',      val: 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 60%, #7dd3fc 100%)' },
  { label: 'Purple',     val: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 60%, #c4b5fd 100%)' },
  { label: 'Rose',       val: 'linear-gradient(135deg, #881337 0%, #e11d48 60%, #fda4af 100%)' },
]

const EMPTY_FORM = {
  title: '', region: '', type: '', status: 'Active', since: '', beneficiaries: '',
  emoji: '🤝', img_gradient: GRADIENT_PRESETS[0].val,
  short_desc: '', full_desc: '',
  tags_text: '', partners_text: '', outcomes_text: '',
  sort_order: 0, is_active: true,
}

function formToPayload(form) {
  return {
    title:         form.title,
    region:        form.region,
    type:          form.type,
    status:        form.status,
    since:         form.since,
    beneficiaries: form.beneficiaries,
    emoji:         form.emoji,
    img_gradient:  form.img_gradient,
    short_desc:    form.short_desc,
    full_desc:     form.full_desc,
    tags:          textToArr(form.tags_text),
    partners:      textToArr(form.partners_text),
    outcomes:      textToArr(form.outcomes_text),
    sort_order:    Number(form.sort_order) || 0,
    is_active:     form.is_active,
  }
}

function itemToForm(item) {
  return {
    title:          item.title         || '',
    region:         item.region        || '',
    type:           item.type          || '',
    status:         item.status        || 'Active',
    since:          item.since         || '',
    beneficiaries:  item.beneficiaries || '',
    emoji:          item.emoji         || '🤝',
    img_gradient:   item.img_gradient  || GRADIENT_PRESETS[0].val,
    short_desc:     item.short_desc    || '',
    full_desc:      item.full_desc     || '',
    tags_text:      arrToText(item.tags),
    partners_text:  arrToText(item.partners),
    outcomes_text:  arrToText(item.outcomes),
    sort_order:     item.sort_order    ?? 0,
    is_active:      item.is_active     !== false,
  }
}

// ── Mini gradient preview ─────────────────────────────────────
function GradientPreview({ gradient }) {
  return (
    <div style={{
      width: '100%', height: 48, borderRadius: 8,
      background: gradient, border: '1px solid var(--border)',
      marginTop: '.25rem',
    }} />
  )
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function SocialWorkAdminSection() {
  const [programs, setPrograms] = useState([])
  const [total,    setTotal]    = useState(0)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const [modal,    setModal]    = useState(null)   // null | { data: item|null }
  const [form,     setForm]     = useState(EMPTY_FORM)
  const [saving,   setSaving]   = useState(false)
  const [saveErr,  setSaveErr]  = useState('')

  const [delConf,  setDelConf]  = useState(null)   // null | { id, label }
  const [preview,  setPreview]  = useState(null)   // null | item  (card preview)
  const [toast,    setToast]    = useState(null)
  const [search,   setSearch]   = useState('')

  const flash = (msg, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }

  const fld = k => e => setForm(f => ({ ...f, [k]: e?.target ? e.target.value : e }))

  // ── Load ──────────────────────────────────────────────────
  const load = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const params = new URLSearchParams({ limit: 100, include_inactive: 'true' })
      if (search) params.set('search', search)
      const d = await apiFetch(`/admin/social-work-programs?${params}`)
      const items = d.items || d.programs || d.data || []
      setPrograms(items)
      setTotal(d.pagination?.total || items.length)
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }, [search])

  useEffect(() => { load() }, [load])

  // ── Modal open/close ─────────────────────────────────────
  const openCreate = () => {
    setForm({ ...EMPTY_FORM, sort_order: programs.length + 1 })
    setSaveErr(''); setModal({ data: null })
  }
  const openEdit = item => {
    setForm(itemToForm(item)); setSaveErr(''); setModal({ data: item })
  }
  const closeModal = () => { setModal(null); setSaveErr('') }

  // ── Save ─────────────────────────────────────────────────
  const save = async () => {
    if (!form.title?.trim()) return setSaveErr('Title is required')
    setSaving(true); setSaveErr('')
    try {
      const body = formToPayload(form)
      if (modal.data) {
        await apiFetch(`/admin/social-work-programs/${modal.data.id}`, {
          method: 'PUT', body: JSON.stringify(body),
        })
        flash('Program updated ✓')
      } else {
        await apiFetch('/admin/social-work-programs', {
          method: 'POST', body: JSON.stringify(body),
        })
        flash('Program created ✓')
      }
      closeModal(); load()
    } catch (e) { setSaveErr(e.message) }
    finally { setSaving(false) }
  }

  // ── Delete ───────────────────────────────────────────────
  const doDelete = async () => {
    try {
      await apiFetch(`/admin/social-work-programs/${delConf.id}`, { method: 'DELETE' })
      flash('Program deactivated')
      setDelConf(null); load()
    } catch (e) { flash(e.message, false); setDelConf(null) }
  }

  // ── Quick toggle active ───────────────────────────────────
  const toggleActive = async (item) => {
    try {
      await apiFetch(`/admin/social-work-programs/${item.id}`, {
        method: 'PUT', body: JSON.stringify({ is_active: !item.is_active }),
      })
      load()
    } catch (e) { flash(e.message, false) }
  }

  // ─────────────────────────────────────────────────────────
  return (
    <div style={{ position: 'relative' }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9999,
          background: toast.ok ? 'var(--green)' : 'var(--red)',
          color: 'white', padding: '.65rem 1.1rem', borderRadius: 'var(--radius)',
          fontWeight: 600, fontSize: '.82rem', boxShadow: 'var(--shadow-md)',
        }}>{toast.msg}</div>
      )}

      {/* Header */}
      <div className="sec-head">
        <div>
          <h1 className="sec-title">Social Work Programs <span className="sec-count">({total})</span></h1>
          <p className="sec-sub">Manage the program cards and modal content shown on the Social Work page</p>
        </div>
        <div className="sec-actions">
          <button className="btn btn-ghost" onClick={load}>↺ Refresh</button>
          <button className="btn btn-primary" onClick={openCreate}>+ New Program</button>
        </div>
      </div>

      {/* Search */}
      <div className="filters">
        <input className="inp" value={search} onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && load()}
          placeholder="Search title / region / type…" style={{ width: 240 }} />
        {search && <button className="btn btn-ghost" onClick={() => setSearch('')}>✕ Clear</button>}
      </div>

      {error && <div className="alert alert-error" style={{ marginBottom: '.85rem' }}>⚠️ {error}</div>}

      {/* Table */}
      <div className="tbl-wrap">
        <div className="tbl-scroll">
          <table className="tbl">
            <thead>
              <tr>{['#', 'Preview', 'Program', 'Type', 'Region', 'Since', 'Active', 'Actions'].map(h => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {loading
                ? <tr><td className="tbl-loading" colSpan={8}><span className="spinner" /> Loading…</td></tr>
                : programs.length === 0
                  ? <tr><td colSpan={8}><div className="empty-state"><div className="empty-icon">🤝</div><div className="empty-text">No programs yet. Click + New Program to add one.</div></div></td></tr>
                  : programs.map(p => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '.78rem', width: 32 }}>{p.sort_order}</td>

                        {/* Gradient preview swatch */}
                        <td style={{ width: 72 }}>
                          <div style={{
                            width: 56, height: 36, borderRadius: 8,
                            background: p.img_gradient,
                            border: '1px solid var(--border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.1rem',
                          }}>{p.emoji}</div>
                        </td>

                        <td>
                          <div style={{ fontWeight: 600, fontSize: '.83rem' }}>{p.title}</div>
                          <div style={{ fontSize: '.7rem', color: 'var(--text-muted)', marginTop: '.1rem' }}>
                            {p.beneficiaries && <span style={{ marginRight: '.5rem' }}>👥 {p.beneficiaries}</span>}
                            {Array.isArray(p.tags) && p.tags.slice(0, 2).map(t => (
                              <span key={t} style={{ marginRight: '.3rem', background: 'var(--blue-lt)', color: 'var(--blue-dk)', padding: '1px 6px', borderRadius: 100, fontSize: '.62rem', fontWeight: 700 }}>#{t}</span>
                            ))}
                          </div>
                        </td>

                        <td style={{ fontSize: '.76rem' }}>{p.type || '—'}</td>
                        <td style={{ fontSize: '.74rem', color: 'var(--text-muted)' }}>{p.region || '—'}</td>
                        <td style={{ fontSize: '.74rem' }}>{p.since || '—'}</td>

                        <td>
                          <Toggle on={p.is_active} onChange={() => toggleActive(p)} />
                        </td>

                        <td>
                          <div style={{ display: 'flex', gap: '.3rem', flexWrap: 'wrap' }}>
                            <button className="btn btn-ghost btn-sm" title="Preview card" onClick={() => setPreview(p)}>👁</button>
                            <button className="btn btn-ghost btn-sm btn-icon" title="Edit" onClick={() => openEdit(p)}>✏️</button>
                            <button className="btn btn-danger btn-sm btn-icon" title="Delete" onClick={() => setDelConf({ id: p.id, label: p.title })}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* ── EDIT / CREATE MODAL ─────────────────────────────── */}
      {modal && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()} style={{ maxWidth: 900 }}>
            <div className="modal-head">
              <span className="modal-head-title">{modal.data ? '✏️ Edit Program' : '+ New Social Work Program'}</span>
              <button className="btn btn-ghost btn-sm" onClick={closeModal}>✕</button>
            </div>

            <div className="modal-body" style={{ maxHeight: '75vh', overflowY: 'auto' }}>

              {/* ── Row 1: emoji + title ── */}
              <div className="field-row">
                <div className="field" style={{ flex: '0 0 80px' }}>
                  <label>Emoji</label>
                  <input className="inp" value={form.emoji} onChange={fld('emoji')}
                    style={{ textAlign: 'center', fontSize: '1.4rem' }} />
                </div>
                <div className="field" style={{ flex: 1 }}>
                  <label>Title *</label>
                  <input className="inp" value={form.title} onChange={fld('title')} placeholder="e.g. Rural Mental Health Outreach" />
                </div>
              </div>

              {/* ── Row 2: type + status ── */}
              <div className="field-row">
                <div className="field">
                  <label>Program Type</label>
                  <input className="inp" value={form.type} onChange={fld('type')} placeholder="e.g. Community Outreach" />
                </div>
                <div className="field">
                  <label>Status</label>
                  <select className="inp" value={form.status} onChange={fld('status')}>
                    {['Active', 'Paused', 'Completed', 'Upcoming'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* ── Row 3: region + since + beneficiaries ── */}
              <div className="field-row3" style={{ gridTemplateColumns: '2fr 1fr 1fr' }}>
                <div className="field">
                  <label>Region / Location</label>
                  <input className="inp" value={form.region} onChange={fld('region')} placeholder="e.g. Sindhupalchok & Dolakha" />
                </div>
                <div className="field">
                  <label>Since (year)</label>
                  <input className="inp" value={form.since} onChange={fld('since')} placeholder="2020" />
                </div>
                <div className="field">
                  <label>Beneficiaries</label>
                  <input className="inp" value={form.beneficiaries} onChange={fld('beneficiaries')} placeholder="1,200+" />
                </div>
              </div>

              {/* ── Gradient picker ── */}
              <div className="field">
                <label>Card Gradient</label>
                <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '.4rem' }}>
                  {GRADIENT_PRESETS.map(g => (
                    <button key={g.label} type="button"
                      onClick={() => setForm(f => ({ ...f, img_gradient: g.val }))}
                      style={{
                        width: 48, height: 32, borderRadius: 6,
                        background: g.val,
                        border: form.img_gradient === g.val ? '2.5px solid var(--blue)' : '1.5px solid var(--border)',
                        cursor: 'pointer', position: 'relative',
                      }}
                      title={g.label}
                    />
                  ))}
                </div>
                <input className="inp mono" value={form.img_gradient} onChange={fld('img_gradient')}
                  placeholder="linear-gradient(…)" style={{ fontSize: '.72rem' }} />
                <GradientPreview gradient={form.img_gradient} />
              </div>

              {/* ── Short description (card) ── */}
              <div className="field">
                <label>Short Description (shown on card)</label>
                <textarea className="inp" rows={3} value={form.short_desc} onChange={fld('short_desc')}
                  placeholder="Brief 2-3 sentence summary shown on the card" />
                <div className="field-hint">{form.short_desc.length}/300 chars recommended</div>
              </div>

              {/* ── Full description (modal) ── */}
              <div className="field">
                <label>Full Description (shown in detail modal)</label>
                <textarea className="inp" rows={5} value={form.full_desc} onChange={fld('full_desc')}
                  placeholder="Detailed description shown when user clicks 'Learn More'" />
              </div>

              {/* ── Tags / Partners / Outcomes ── */}
              <div className="field-row3">
                <div className="field">
                  <label>Tags (one per line)</label>
                  <textarea className="inp" rows={4} value={form.tags_text} onChange={fld('tags_text')}
                    placeholder={'Trauma\nRural\nPost-Disaster'} style={{ resize: 'vertical' }} />
                  <div className="field-hint">Shown as #hashtags on the card</div>
                </div>
                <div className="field">
                  <label>Partners (one per line)</label>
                  <textarea className="inp" rows={4} value={form.partners_text} onChange={fld('partners_text')}
                    placeholder={'WHO Nepal\nTPO Nepal\nFCHVs'} style={{ resize: 'vertical' }} />
                  <div className="field-hint">Shown in detail modal</div>
                </div>
                <div className="field">
                  <label>Key Outcomes (one per line)</label>
                  <textarea className="inp" rows={4} value={form.outcomes_text} onChange={fld('outcomes_text')}
                    placeholder={'1,200 screenings\n340 referred to care\n80 FCHVs trained'} style={{ resize: 'vertical' }} />
                  <div className="field-hint">Shown with ✓ checkmarks</div>
                </div>
              </div>

              {/* ── Sort order + Active ── */}
              <div className="field-row">
                <div className="field">
                  <label>Sort Order</label>
                  <input className="inp" type="number" min="0" value={form.sort_order} onChange={fld('sort_order')} />
                  <div className="field-hint">Lower = shown first on the page</div>
                </div>
                <div className="field" style={{ justifyContent: 'flex-end', paddingBottom: '.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem', cursor: 'pointer', marginTop: 'auto' }}>
                    <Toggle on={form.is_active} onChange={v => setForm(f => ({ ...f, is_active: v }))} />
                    <span style={{ fontSize: '.78rem' }}>Active (visible on site)</span>
                  </label>
                </div>
              </div>

              {saveErr && <div className="alert alert-error">{saveErr}</div>}
            </div>

            <div className="modal-foot">
              <button className="btn btn-ghost" onClick={() => setPreview(formToPayload({ ...form, tags: textToArr(form.tags_text), partners: textToArr(form.partners_text), outcomes: textToArr(form.outcomes_text) }))}>
                👁 Preview
              </button>
              <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>
                {saving ? <><span className="spinner" /> Saving…</> : modal.data ? 'Save Changes' : 'Create Program'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CARD PREVIEW MODAL ─────────────────────────────── */}
      {preview && (
        <div className="overlay" onClick={() => setPreview(null)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'var(--surface)', borderRadius: 'var(--radius-xl)',
            padding: '1.5rem', maxWidth: 480, width: '100%',
            boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border)',
            maxHeight: '90vh', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 700, fontSize: '.9rem' }}>Card Preview</span>
              <button className="btn btn-ghost btn-sm" onClick={() => setPreview(null)}>✕</button>
            </div>

            {/* Simulated card */}
            <div style={{ borderRadius: 16, background: 'white', border: '1.5px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              {/* Image area */}
              <div style={{ height: 140, background: preview.img_gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <span style={{ fontSize: '2.8rem' }}>{preview.emoji}</span>
                <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,255,120,0.2)', border: '1px solid rgba(0,255,120,0.35)', borderRadius: 100, padding: '2px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00e676', display: 'inline-block' }} />
                  <span style={{ fontSize: '.6rem', fontWeight: 800, color: 'white' }}>{preview.status?.toUpperCase() || 'ACTIVE'}</span>
                </div>
                {preview.since && (
                  <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 100, padding: '2px 8px', fontSize: '.6rem', fontWeight: 700, color: 'white' }}>Since {preview.since}</div>
                )}
                {/* Floating type label */}
                <div style={{ position: 'absolute', bottom: -12, left: '50%', transform: 'translateX(-50%)', background: 'white', border: '1.5px solid #b0d4e8', borderRadius: 100, padding: '4px 14px', whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(0,0,0,.1)', zIndex: 2 }}>
                  <span style={{ fontSize: '.68rem', fontWeight: 800, color: '#2e6080' }}>{preview.type || 'Program Type'}</span>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '1.25rem 1.25rem 1rem', paddingTop: '1.5rem' }}>
                <div style={{ fontWeight: 700, fontSize: '.9rem', color: '#1a3a4a', marginBottom: '.25rem' }}>{preview.title || 'Program Title'}</div>
                <div style={{ fontSize: '.7rem', color: '#007BA8', fontWeight: 700, marginBottom: '.6rem' }}>📍 {preview.region || 'Region'}</div>
                <p style={{ fontSize: '.76rem', color: '#7a9aaa', lineHeight: 1.6, marginBottom: '.75rem' }}>
                  {(preview.short_desc || preview.desc || '').slice(0, 120)}{(preview.short_desc || '').length > 120 ? '…' : ''}
                </p>

                {/* Tags */}
                {Array.isArray(preview.tags) && preview.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '.3rem', flexWrap: 'wrap', marginBottom: '.75rem' }}>
                    {preview.tags.map(t => (
                      <span key={t} style={{ fontSize: '.62rem', fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: '#F0FBFF', color: '#009FD4', border: '1px solid #daeef8' }}>#{t}</span>
                    ))}
                  </div>
                )}

                {/* Outcomes */}
                {Array.isArray(preview.outcomes) && preview.outcomes.length > 0 && (
                  <div style={{ background: '#F0FBFF', borderRadius: 8, padding: '.6rem .8rem', marginBottom: '.85rem', border: '1px solid #daeef8' }}>
                    <div style={{ fontSize: '.62rem', fontWeight: 800, color: '#7a9aaa', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '.35rem' }}>Key Outcomes</div>
                    {preview.outcomes.slice(0, 3).map((o, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.35rem', marginBottom: '.2rem' }}>
                        <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'linear-gradient(135deg,#007BA8,#00BFFF)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: '.45rem', color: 'white', fontWeight: 800 }}>✓</span>
                        </span>
                        <span style={{ fontSize: '.72rem', color: '#2e6080' }}>{o}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '.9rem', color: '#1a3a4a' }}>{preview.beneficiaries || '—'}</div>
                    <div style={{ fontSize: '.62rem', color: '#7a9aaa' }}>beneficiaries</div>
                  </div>
                  <div style={{ padding: '.45rem 1rem', borderRadius: 8, background: '#E0F7FF', color: '#009FD4', fontSize: '.76rem', fontWeight: 700 }}>Learn More →</div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '.75rem' }}>
              This is an approximate preview. The live page may look slightly different.
            </p>
            <div style={{ textAlign: 'center', marginTop: '.5rem' }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setPreview(null)}>Close Preview</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {delConf && (
        <Confirm
          msg={`Deactivate program "${delConf.label}"? It will be hidden from the site but not permanently deleted.`}
          onConfirm={doDelete}
          onCancel={() => setDelConf(null)}
        />
      )}
    </div>
  )
}
