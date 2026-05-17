import { useState, useRef, useEffect } from "react"

const API_URL = "https://api.anthropic.com/v1/messages"
const MODEL = "claude-sonnet-4-20250514"

const TOOLS = [
  { id: "checkin",  icon: "🌤️", title: "Daily Emotional Check-In",      desc: "A 60-second guided reflection. AI analyses your answers and gives personalised insights.",            color: "var(--sky-light)",   tag: "60 sec",  ai: true },
  { id: "cbt",      icon: "🧠", title: "CBT Thought Challenger",         desc: "AI identifies cognitive distortions in your thinking and co-creates a realistic reframe with you.",   color: "var(--green-mist)",  tag: "5 min",   ai: true },
  { id: "stress",   icon: "📊", title: "Stress Detection Questionnaire", desc: "PSS-10 validated tool. AI analyses your results and writes a personalised action plan.",             color: "var(--blue-mist)",   tag: "3 min",   ai: true },
  { id: "mood",     icon: "💬", title: "Mood Tracking Chatbot",          desc: "Talk freely with an AI therapist companion. It tracks patterns, reflects feelings, and guides you.", color: "var(--earth-cream)", tag: "Live AI", ai: true },
]

const CHECKIN_Qs = [
  { q: "How would you rate your overall mood today?",       type: "scale", min: "Very low",  max: "Excellent" },
  { q: "How well did you sleep last night?",               type: "scale", min: "Terrible",  max: "Amazing" },
  { q: "How is your energy level right now?",              type: "scale", min: "Exhausted", max: "Energised" },
  { q: "Are you experiencing any significant stress?",     type: "yesno" },
  { q: "Did you do something kind for yourself today?",    type: "yesno" },
]

const DISTORTIONS = [
  "All-or-Nothing Thinking", "Catastrophising", "Mind Reading", "Fortune Telling",
  "Emotional Reasoning", "Should Statements", "Personalisation", "Overgeneralisation",
]

const STRESS_Qs = [
  "How often have you felt unable to control important things in your life?",
  "How often have you felt nervous and stressed?",
  "How often have you felt difficulties were piling up so high you could not overcome them?",
  "How often have you felt confident about your ability to handle personal problems?",
  "How often have you been able to control irritations in your life?",
]

async function callClaude(messages, system, onChunk) {
  const body = { model: MODEL, max_tokens: 1000, system, messages, stream: !!onChunk }
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  if (!onChunk) {
    const d = await res.json()
    return d.content.find(b => b.type === "text")?.text || ""
  }
  const reader = res.body.getReader()
  const dec = new TextDecoder()
  let buf = ""
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buf += dec.decode(value, { stream: true })
    const lines = buf.split("\n")
    buf = lines.pop()
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue
      const data = line.slice(6)
      if (data === "[DONE]") return
      try {
        const evt = JSON.parse(data)
        if (evt.type === "content_block_delta" && evt.delta?.text) onChunk(evt.delta.text)
      } catch {}
    }
  }
}

function Spinner() {
  return (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "var(--sky)", opacity: 0.5,
          animation: "pulse 1.2s ease-in-out infinite",
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}
      <style>{`@keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}`}</style>
    </span>
  )
}

function AIBadge() {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      fontSize: "0.65rem", fontWeight: 800, padding: "2px 7px",
      borderRadius: 100, background: "var(--sky-light)", color: "var(--sky)",
      border: "1px solid var(--sky)", textTransform: "uppercase", letterSpacing: "0.08em",
    }}>✦ AI</span>
  )
}

function ScaleInput({ val, onChange }) {
  return (
    <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", flexWrap: "wrap" }}>
      {[1,2,3,4,5,6,7,8,9,10].map(n => (
        <button key={n} onClick={() => onChange(n)} style={{
          width: 40, height: 40, borderRadius: "var(--radius-sm)",
          border: `2px solid ${val === n ? "var(--sky)" : "var(--blue-pale)"}`,
          background: val === n ? "var(--sky)" : "var(--white)",
          color: val === n ? "white" : "var(--text-mid)",
          fontFamily: "var(--font-body)", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem",
          transition: "all 0.15s",
        }}>{n}</button>
      ))}
    </div>
  )
}

/* ─── DAILY CHECK-IN ──────────────────────────────────────────────── */
function DailyCheckIn() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [insight, setInsight] = useState("")
  const [loading, setLoading] = useState(false)
  const q = CHECKIN_Qs[step]

  function answer(val) {
    const next = { ...answers, [step]: val }
    setAnswers(next)
    if (step < CHECKIN_Qs.length - 1) setStep(step + 1)
    else analyseAnswers(next)
  }

  async function analyseAnswers(ans) {
    setLoading(true)
    setStep(CHECKIN_Qs.length)
    const summary = CHECKIN_Qs.map((q, i) => `${q.q} → ${ans[i]}`).join("\n")
    const system = `You are a compassionate mental health check-in assistant. 
Analyse the user's emotional check-in answers and provide a warm, personalised 3-4 paragraph reflection. 
Cover: what their scores suggest about their current state, one specific coping suggestion for today, and a brief affirmation. 
Be empathetic, conversational, and non-clinical. Do NOT use bullet points. Do NOT diagnose. Keep under 200 words.`
    try {
      let text = ""
      await callClaude([{ role: "user", content: `My check-in answers:\n${summary}` }], system, chunk => {
        text += chunk
        setInsight(text)
      })
    } catch {
      setInsight("Something went wrong fetching your insight. Please try again.")
    }
    setLoading(false)
  }

  if (step === CHECKIN_Qs.length) {
    return (
      <div style={{ padding: "2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🌤️</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--blue-deep)", marginBottom: "0.25rem" }}>
            Your AI Insight
          </h3>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem" }}><AIBadge /></div>
        </div>
        <div style={{
          background: "var(--sky-light)", borderRadius: "var(--radius-md)", padding: "1.5rem",
          fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--blue-deep)",
          lineHeight: 1.75, minHeight: 80, border: "1px solid var(--blue-pale)",
        }}>
          {loading && !insight ? <Spinner /> : insight}
        </div>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "1.5rem" }}>
          <button className="btn btn-outline" onClick={() => { setStep(0); setAnswers({}); setInsight(""); }}>Start Over</button>
          <button className="btn btn-primary">Save to Portal →</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--text-light)", marginBottom: "1rem" }}>
        Question {step + 1} of {CHECKIN_Qs.length}
      </div>
      <div style={{ width: "100%", height: 4, background: "var(--blue-pale)", borderRadius: 2, marginBottom: "2rem" }}>
        <div style={{ width: `${(step / CHECKIN_Qs.length) * 100}%`, height: "100%", background: "var(--sky)", borderRadius: 2, transition: "width 0.4s" }} />
      </div>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--blue-deep)", marginBottom: "2rem", lineHeight: 1.4 }}>{q.q}</h3>
      {q.type === "scale" && (
        <div>
          <ScaleInput val={answers[step]} onChange={answer} />
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--text-light)", marginTop: "0.75rem" }}>
            <span>{q.min}</span><span>{q.max}</span>
          </div>
        </div>
      )}
      {q.type === "yesno" && (
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button className="btn btn-outline btn-lg" onClick={() => answer("no")}>No</button>
          <button className="btn btn-primary btn-lg" onClick={() => answer("yes")}>Yes</button>
        </div>
      )}
    </div>
  )
}

/* ─── CBT CHALLENGER ──────────────────────────────────────────────── */
function CBTChallenger() {
  const [thought, setThought] = useState("")
  const [distortion, setDistortion] = useState("")
  const [aiDistortions, setAiDistortions] = useState(null)
  const [detectingDistortion, setDetectingDistortion] = useState(false)
  const [evidence, setEvidence] = useState("")
  const [reframe, setReframe] = useState("")
  const [aiReframe, setAiReframe] = useState("")
  const [generatingReframe, setGeneratingReframe] = useState(false)
  const [step, setStep] = useState(0)

  async function detectDistortions() {
    setDetectingDistortion(true)
    const system = `You are a CBT expert. Given a negative thought, identify which cognitive distortions are present from this list: ${DISTORTIONS.join(", ")}.
Return ONLY a JSON array of the matching distortion names, max 3. Example: ["Catastrophising","All-or-Nothing Thinking"]`
    try {
      const raw = await callClaude([{ role: "user", content: `Thought: "${thought}"` }], system, null)
      const cleaned = raw.replace(/```json|```/g, "").trim()
      const parsed = JSON.parse(cleaned)
      setAiDistortions(parsed)
    } catch {
      setAiDistortions([])
    }
    setDetectingDistortion(false)
  }

  async function generateReframe() {
    setGeneratingReframe(true)
    setAiReframe("")
    const system = `You are a compassionate CBT therapist. Given a negative thought, its cognitive distortion, and the user's evidence, write a single balanced, realistic reframe sentence (1–2 sentences max). 
Do NOT use bullet points. Write in first person. Be warm, grounded, and specific to the evidence provided.`
    const content = `Original thought: "${thought}"\nDistortion: ${distortion}\nEvidence:\n${evidence}`
    try {
      await callClaude([{ role: "user", content }], system, chunk => setAiReframe(r => r + chunk))
    } catch {
      setAiReframe("Could not generate reframe. Please try writing your own.")
    }
    setGeneratingReframe(false)
  }

  return (
    <div style={{ padding: "1rem" }}>
      {step === 0 && (
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--blue-deep)", marginBottom: "0.5rem" }}>What's the negative thought?</h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text-light)", marginBottom: "1rem" }}>Write it exactly as it appears in your mind — don't filter it.</p>
          <textarea value={thought} onChange={e => setThought(e.target.value)} rows={3}
            placeholder='e.g. "I always fail at everything I try."'
            style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid var(--blue-pale)", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-body)", fontSize: "0.9rem", background: "var(--off-white)", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
          <button className="btn btn-primary" style={{ marginTop: "1rem" }} disabled={!thought.trim()}
            onClick={() => { detectDistortions(); setStep(1) }}>Next →</button>
        </div>
      )}

      {step === 1 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--blue-deep)", margin: 0 }}>Identify the distortion</h3>
            <AIBadge />
          </div>
          {detectingDistortion
            ? <div style={{ padding: "1rem 0", display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text-light)" }}><Spinner /> AI is analysing your thought…</div>
            : aiDistortions?.length > 0 && (
              <div style={{ background: "var(--sky-light)", borderRadius: "var(--radius-sm)", padding: "0.75rem 1rem", marginBottom: "1rem", fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--blue-mid)", border: "1px solid var(--blue-pale)" }}>
                <strong>AI detected:</strong> {aiDistortions.join(", ")}
              </div>
            )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
            {DISTORTIONS.map(d => {
              const aiMatch = aiDistortions?.includes(d)
              return (
                <button key={d} onClick={() => setDistortion(d)} style={{
                  padding: "0.65rem 1rem", border: `2px solid ${distortion === d ? "var(--sky)" : aiMatch ? "var(--sky)" : "var(--blue-pale)"}`,
                  borderRadius: "var(--radius-sm)", background: distortion === d ? "var(--sky)" : aiMatch ? "var(--sky-light)" : "var(--white)",
                  fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.82rem",
                  color: distortion === d ? "white" : "var(--blue-deep)", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.25rem",
                }}>
                  <span>{d}</span>
                  {aiMatch && <span style={{ fontSize: "0.6rem", background: "var(--sky)", color: "white", padding: "1px 5px", borderRadius: 100 }}>AI</span>}
                </button>
              )
            })}
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button className="btn btn-outline" onClick={() => setStep(0)}>← Back</button>
            <button className="btn btn-primary" disabled={!distortion} onClick={() => setStep(2)}>Next →</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--blue-deep)", marginBottom: "0.5rem" }}>What's the evidence?</h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text-light)", marginBottom: "1rem" }}>List real evidence FOR and AGAINST the thought.</p>
          <textarea value={evidence} onChange={e => setEvidence(e.target.value)} rows={4}
            placeholder={"Evidence FOR: ...\nEvidence AGAINST: ..."}
            style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid var(--blue-pale)", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-body)", fontSize: "0.9rem", background: "var(--off-white)", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
            <button className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
            <button className="btn btn-primary" disabled={!evidence.trim()} onClick={() => setStep(3)}>Next →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--blue-deep)", margin: 0 }}>Reframe the thought</h3>
            <AIBadge />
          </div>
          <div style={{ background: "var(--sky-light)", borderRadius: "var(--radius-sm)", padding: "0.75rem 1rem", marginBottom: "1rem", fontSize: "0.82rem", color: "var(--blue-mid)", border: "1px solid var(--blue-pale)" }}>
            Original: "<em>{thought}</em>" · Distortion: <strong>{distortion}</strong>
          </div>

          <button className="btn btn-outline" style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
            disabled={generatingReframe} onClick={generateReframe}>
            {generatingReframe ? <><Spinner /> Generating…</> : "✦ Generate AI Reframe"}
          </button>

          {aiReframe && (
            <div style={{ background: "var(--green-mist)", borderRadius: "var(--radius-sm)", padding: "0.75rem 1rem", marginBottom: "1rem", fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--green-deep)", lineHeight: 1.65, border: "1px solid rgba(0,180,120,0.2)", cursor: "pointer" }}
              onClick={() => setReframe(aiReframe)}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--green-deep)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>✦ AI Suggestion · Click to use</div>
              {aiReframe}
            </div>
          )}

          <textarea value={reframe} onChange={e => setReframe(e.target.value)} rows={3}
            placeholder='Write your own reframe or click the AI suggestion above…'
            style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid var(--blue-pale)", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-body)", fontSize: "0.9rem", background: "var(--off-white)", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
            <button className="btn btn-outline" onClick={() => setStep(2)}>← Back</button>
            <button className="btn btn-primary" disabled={!reframe.trim()} onClick={() => setStep(4)}>Complete ✓</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--green-deep)", marginBottom: "0.5rem" }}>Great work!</h3>
          <div style={{ background: "var(--green-mist)", borderRadius: "var(--radius-md)", padding: "1.25rem", textAlign: "left", marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 700, color: "var(--green-deep)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>Your reframe</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--green-deep)", margin: 0, lineHeight: 1.6 }}>{reframe}</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <button className="btn btn-outline" onClick={() => { setStep(0); setThought(""); setDistortion(""); setEvidence(""); setReframe(""); setAiDistortions(null); setAiReframe(""); }}>Try Another</button>
            <button className="btn btn-primary">Save to Portal →</button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── STRESS CHECK ────────────────────────────────────────────────── */
function StressCheck() {
  const [answers, setAnswers] = useState({})
  const [insight, setInsight] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const allAnswered = STRESS_Qs.every((_, i) => answers[i] !== undefined)
  const total = Object.values(answers).reduce((a, b) => a + b, 0)
  const maxScore = STRESS_Qs.length * 4

  function getLevel() {
    if (total <= 8)  return { label: "Low Stress",      color: "var(--green-deep)" }
    if (total <= 18) return { label: "Moderate Stress", color: "var(--earth-warm)" }
    return               { label: "High Stress",        color: "#e53935" }
  }

  async function analyse() {
    setDone(true)
    setLoading(true)
    const qSummary = STRESS_Qs.map((q, i) => `${q} → ${["Never","Rarely","Sometimes","Often","Always"][answers[i]]}`).join("\n")
    const level = getLevel().label
    const system = `You are a compassionate psychologist. A user completed the PSS-10 stress questionnaire.
Their score is ${total}/${maxScore} (${level}). 
Provide a personalised 3-paragraph AI stress analysis: 
1) What their specific answers reveal about their stress patterns
2) Three concrete, actionable coping strategies tailored to their responses 
3) A warm closing with encouragement. 
Do NOT use bullet points. Be specific to their answers. Keep under 250 words.`
    try {
      await callClaude([{ role: "user", content: `PSS-10 answers:\n${qSummary}\nTotal score: ${total}/${maxScore}` }], system, chunk => setInsight(t => t + chunk))
    } catch {
      setInsight("Unable to load AI analysis. Please try again.")
    }
    setLoading(false)
  }

  if (done) {
    const level = getLevel()
    return (
      <div style={{ padding: "1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📊</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--blue-deep)", marginBottom: "0.25rem" }}>Your Stress Profile</h3>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: level.color, marginBottom: "0.25rem" }}>{level.label}</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--text-light)", marginBottom: "0.75rem" }}>Score: {total} / {maxScore}</div>
          <div style={{ width: "100%", height: 8, background: "var(--blue-pale)", borderRadius: 4, marginBottom: "1.5rem" }}>
            <div style={{ width: `${(total / maxScore) * 100}%`, height: "100%", background: level.color, borderRadius: 4, transition: "width 1s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem" }}><AIBadge /></div>
        </div>
        <div style={{
          background: "var(--blue-mist)", borderRadius: "var(--radius-md)", padding: "1.5rem",
          fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--blue-deep)",
          lineHeight: 1.8, minHeight: 80, border: "1px solid var(--blue-pale)",
        }}>
          {loading && !insight ? <Spinner /> : insight}
        </div>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "1.5rem" }}>
          <button className="btn btn-outline" onClick={() => { setDone(false); setAnswers({}); setInsight(""); }}>Retake</button>
          <button className="btn btn-primary">Book Session →</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--blue-deep)", margin: 0 }}>Perceived Stress Scale (PSS-10)</h3>
        <AIBadge />
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--text-light)", marginBottom: "1.5rem" }}>Rate each 0 (Never) → 4 (Very Often). AI will personalise your results.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {STRESS_Qs.map((q, i) => (
          <div key={i}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--text-dark)", marginBottom: "0.75rem", lineHeight: 1.5 }}>{q}</p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {[0, 1, 2, 3, 4].map(n => (
                <button key={n} onClick={() => setAnswers({ ...answers, [i]: n })} style={{
                  flex: 1, padding: "0.5rem 0", border: `2px solid ${answers[i] === n ? "var(--sky)" : "var(--blue-pale)"}`,
                  borderRadius: "var(--radius-sm)", background: answers[i] === n ? "var(--sky)" : "var(--white)",
                  color: answers[i] === n ? "white" : "var(--text-mid)", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer",
                }}>
                  <div>{n}</div>
                  <div style={{ fontSize: "0.6rem", fontWeight: 400, marginTop: 1 }}>{["Never", "Rarely", "Sometimes", "Often", "Always"][n]}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-primary btn-lg" style={{ marginTop: "2rem" }} disabled={!allAnswered} onClick={analyse}>
        Get AI Analysis →
      </button>
    </div>
  )
}

/* ─── MOOD CHATBOT ────────────────────────────────────────────────── */
function MoodChatbot() {
  const [msgs, setMsgs] = useState([
    { role: "assistant", content: "Hi, I'm here with you 💙 I'm your mood tracking companion — feel free to tell me how you're feeling right now, what's been on your mind, or just what kind of day it's been. There's no wrong answer. Where would you like to start?" }
  ])
  const [input, setInput] = useState("")
  const [streaming, setStreaming] = useState(false)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [msgs])

  async function send() {
    if (!input.trim() || streaming) return
    const userMsg = { role: "user", content: input.trim() }
    const nextMsgs = [...msgs, userMsg]
    setMsgs(nextMsgs)
    setInput("")
    setStreaming(true)
    const system = `You are a warm, emotionally intelligent AI mood tracking companion for a mental health platform.
Your role: help the user reflect on their feelings, track emotional patterns, and feel heard.
Guidelines:
- Always validate feelings before offering any advice
- Ask ONE thoughtful follow-up question at a time
- Notice and reflect back emotional patterns across the conversation
- Occasionally (not always) offer a brief coping micro-technique (breathing, grounding, journalling prompt)
- Never diagnose, never minimise, never tell them how to feel
- Keep responses under 120 words — warm, conversational, not clinical
- Use natural language. You are a gentle companion, not a clinical chatbot.`
    const apiMsgs = nextMsgs.map(m => ({ role: m.role, content: m.content }))
    let buffer = ""
    try {
      setMsgs(prev => [...prev, { role: "assistant", content: "" }])
      await callClaude(apiMsgs, system, chunk => {
        buffer += chunk
        setMsgs(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: "assistant", content: buffer }
          return updated
        })
      })
    } catch {
      setMsgs(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: "assistant", content: "I'm having trouble connecting right now. Please try again in a moment." }
        return updated
      })
    }
    setStreaming(false)
  }

  const QUICK_STARTS = ["I'm feeling anxious today", "I had a rough day", "I'm not sure how I feel", "Things have been stressful"]

  return (
    <div style={{ display: "flex", flexDirection: "column", height: 480 }}>
      <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--blue-pale)", display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--sky-light)" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--sky)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>💙</div>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", color: "var(--blue-deep)", fontWeight: 700 }}>Mood Companion</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "var(--text-light)", display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4caf50", display: "inline-block" }} />
            AI-powered · Always here
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "78%", padding: "0.65rem 1rem",
              borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: m.role === "user" ? "var(--sky)" : "var(--white)",
              color: m.role === "user" ? "white" : "var(--text-dark)",
              fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.65,
              border: m.role === "user" ? "none" : "1px solid var(--blue-pale)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
              {m.content || (streaming && i === msgs.length - 1 ? <Spinner /> : "")}
            </div>
          </div>
        ))}
        {msgs.length === 1 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.5rem" }}>
            {QUICK_STARTS.map(q => (
              <button key={q} onClick={() => { setInput(q) }} style={{
                padding: "0.35rem 0.85rem", border: "1px solid var(--sky)", borderRadius: 100,
                background: "var(--sky-light)", color: "var(--sky)", fontFamily: "var(--font-body)",
                fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
              }}>{q}</button>
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid var(--blue-pale)", display: "flex", gap: "0.5rem", background: "var(--white)" }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() } }}
          placeholder="Share how you're feeling… (Enter to send)"
          rows={1}
          disabled={streaming}
          style={{
            flex: 1, padding: "0.6rem 0.85rem", border: "1.5px solid var(--blue-pale)",
            borderRadius: 20, fontFamily: "var(--font-body)", fontSize: "0.88rem",
            background: "var(--off-white)", outline: "none", resize: "none",
            lineHeight: 1.5,
          }}
        />
        <button
          onClick={send}
          disabled={!input.trim() || streaming}
          style={{
            width: 40, height: 40, borderRadius: "50%", border: "none",
            background: input.trim() && !streaming ? "var(--sky)" : "var(--blue-pale)",
            color: "white", fontSize: "1.1rem", cursor: input.trim() && !streaming ? "pointer" : "default",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            transition: "background 0.2s",
          }}>↑</button>
      </div>
    </div>
  )
}

/* ─── MAIN PAGE ───────────────────────────────────────────────────── */
export default function AIToolsPage() {
  const [active, setActive] = useState(null)
  const activeTool = TOOLS.find(t => t.id === active)

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ background: "var(--blue-mist)" }}>
        <span className="section-tag">AI Mental Health Tools</span>
        <h1 className="section-title">Smart Tools for <em>Self-Awareness</em></h1>
        <p className="section-desc">Real AI — not scripted responses. Every tool uses live intelligence to personalise your experience.</p>
        <div style={{ marginTop: "1.25rem", padding: "0.75rem 1.25rem", background: "rgba(0,191,255,0.1)", borderRadius: "var(--radius-md)", border: "1px solid var(--blue-pale)", display: "inline-flex", gap: "0.5rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.9rem" }}>⚠️</span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--blue-deep)", fontWeight: 600 }}>These tools are for self-reflection only and do not provide clinical diagnoses. Always consult a licensed therapist for mental health concerns.</span>
        </div>
      </div>

      <div className="section" style={{ background: "var(--off-white)", paddingTop: "3rem" }}>
        {!active && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem" }}>
            {TOOLS.map(t => (
              <div key={t.id}
                style={{ background: "var(--white)", borderRadius: "var(--radius-xl)", overflow: "hidden", border: "1px solid var(--blue-pale)", boxShadow: "var(--shadow-soft)", cursor: "pointer", transition: "all 0.25s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                onClick={() => setActive(t.id)}
              >
                <div style={{ background: t.color, padding: "2rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem", height: 120 }}>{t.icon}</div>
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", color: "var(--blue-deep)", margin: 0 }}>{t.title}</h3>
                    <div style={{ display: "flex", gap: "0.35rem", alignItems: "center", flexShrink: 0, marginLeft: "0.5rem" }}>
                      <AIBadge />
                      <span style={{ fontSize: "0.68rem", fontWeight: 800, padding: "2px 8px", borderRadius: 100, background: "var(--sky-light)", color: "var(--blue-mid)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{t.tag}</span>
                    </div>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text-light)", lineHeight: 1.65, marginBottom: "1rem" }}>{t.desc}</p>
                  <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Start →</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {active && (
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <button className="btn btn-outline" style={{ marginBottom: "1.5rem" }} onClick={() => setActive(null)}>← Back to Tools</button>
            <div style={{ background: "var(--white)", borderRadius: "var(--radius-xl)", overflow: "hidden", border: "1px solid var(--blue-pale)", boxShadow: "var(--shadow-mid)" }}>
              <div style={{ background: activeTool.color, padding: "1.25rem 2rem", display: "flex", alignItems: "center", gap: "0.75rem", borderBottom: "1px solid var(--blue-pale)" }}>
                <span style={{ fontSize: "1.75rem" }}>{activeTool.icon}</span>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--blue-deep)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {activeTool.title} <AIBadge />
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--text-light)" }}>Powered by Claude AI · Results are personalised to you</div>
                </div>
              </div>
              <div style={{ padding: "0.5rem" }}>
                {active === "checkin" && <DailyCheckIn key="checkin" />}
                {active === "cbt"     && <CBTChallenger key="cbt" />}
                {active === "stress"  && <StressCheck key="stress" />}
                {active === "mood"    && <MoodChatbot key="mood" />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}