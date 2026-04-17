"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Phone } from "lucide-react"
import { useTranslations } from "next-intl"

// ============================================
// HOOK: IntersectionObserver trigger
// ============================================
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.25, ...options },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, inView }
}

// ============================================
// Card 0 — WhatsApp Chat (sequential bubbles, 3 scenarios, loops)
// ============================================
interface MockupTexts {
  chat_question: string; chat_response: string; chat_confirmation: string;
  chat_info_question: string; chat_info_response: string; chat_info_confirmation: string;
  chat_agent_question: string; chat_agent_response: string; chat_agent_confirmation: string;
  call_incoming: string; call_in_progress: string; call_completed: string;
  call_finished: string; call_connecting: string; call_listening: string; call_label: string;
  calendar_confirmed: string;
  inbox_request: string; inbox_query: string; inbox_document: string;
  inbox_classified: string; inbox_responded: string; inbox_processed: string; inbox_pending: string;
  analytics_resolved: string; analytics_time: string; analytics_insight: string;
}

function getConversations(m: MockupTexts) {
  return [
    [
      { from: "user", text: m.chat_question },
      { from: "ai",   text: m.chat_response },
      { from: "ai",   text: m.chat_confirmation },
    ],
    [
      { from: "user", text: m.chat_info_question },
      { from: "ai",   text: m.chat_info_response },
      { from: "ai",   text: m.chat_info_confirmation },
    ],
    [
      { from: "user", text: m.chat_agent_question },
      { from: "ai",   text: m.chat_agent_response },
      { from: "ai",   text: m.chat_agent_confirmation },
    ],
  ]
}

const ChatMockup = ({ active, m }: { active: boolean; m: MockupTexts }) => {
  const conversations = getConversations(m)
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [visibleBubbles, setVisibleBubbles] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const runScenario = useCallback(() => {
    const convo = conversations[scenarioIdx]
    let step = 0
    setVisibleBubbles(0)
    setShowTyping(false)

    const next = () => {
      if (step < convo.length) {
        const msg = convo[step]
        if (msg.from === "ai") {
          setShowTyping(true)
          timerRef.current = setTimeout(() => {
            setShowTyping(false)
            step++
            setVisibleBubbles(step)
            timerRef.current = setTimeout(next, 1000)
          }, 1000)
        } else {
          step++
          setVisibleBubbles(step)
          timerRef.current = setTimeout(next, 1000)
        }
      } else {
        // hold, then advance scenario
        timerRef.current = setTimeout(() => {
          setScenarioIdx((prev) => (prev + 1) % conversations.length)
        }, 4000)
      }
    }
    timerRef.current = setTimeout(next, 500)
  }, [scenarioIdx])

  useEffect(() => {
    if (!active) return
    runScenario()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [active, runScenario])

  const convo = conversations[scenarioIdx]

  return (
    <div className="bg-[#F0F2F5] dark:bg-bg-card rounded-xl p-3 h-36 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-slate-200/60 dark:border-white/[0.06]">
        <div className="w-1 h-3 rounded-full bg-green-500" />
        <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">WhatsApp Business</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] text-slate-400">24/7</span>
        </div>
      </div>
      {/* Chat bubbles */}
      <div className="space-y-1.5">
        {convo.map((msg, i) => (
          <div
            key={`${scenarioIdx}-${i}`}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} transition-all duration-500 ${i < visibleBubbles ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
          >
            <div className={`rounded-xl px-3 py-1.5 text-xs max-w-[80%] ${
              msg.from === "user"
                ? "bg-[#DCF8C6] dark:bg-[#005C4B] text-slate-800 dark:text-white rounded-tr-sm"
                : "bg-white dark:bg-bg-card-hover text-slate-700 dark:text-slate-200 rounded-tl-sm"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {/* Typing indicator */}
        {showTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-bg-card-hover rounded-xl rounded-tl-sm px-3 py-2 flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// Card 1 — Phone call state cycling
// ============================================
const PhoneMockup = ({ active, m }: { active: boolean; m: MockupTexts }) => {
  const callStates = [
    { label: m.call_incoming, color: "text-yellow-500", icon: "ring", status: "ringing" },
    { label: `${m.call_in_progress} \u00B7 2:34`, color: "text-green-500", icon: "active", status: "active" },
    { label: m.call_completed, color: "text-blue-500", icon: "done", status: "done" },
  ] as const
  const [stateIdx, setStateIdx] = useState(0)
  const [callCount, setCallCount] = useState(14)

  useEffect(() => {
    if (!active) return
    const iv = setInterval(() => {
      setStateIdx((prev) => {
        const next = (prev + 1) % 3
        if (next === 0) setCallCount((c) => c + 1)
        return next
      })
    }, 3000)
    return () => clearInterval(iv)
  }, [active])

  const state = callStates[stateIdx]
  const waveHeights = [14, 22, 10, 28, 16]

  return (
    <div className="bg-[#F0F2F5] dark:bg-bg-card rounded-xl p-3 h-36 overflow-hidden flex flex-col">
      {/* Top label */}
      <div className="flex items-center gap-1.5 mb-3">
        <svg className={`w-3.5 h-3.5 ${state.color} transition-colors duration-500 ${state.status === "ringing" ? "animate-pulse" : ""}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
        <span className={`text-[10px] ${state.color} transition-colors duration-500`}>{state.label}</span>
      </div>
      {/* Center: avatar + waveform */}
      <div className="flex-1 flex items-center justify-center gap-4">
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
          <Phone className="w-5 h-5 text-white" />
        </div>
        <div className="flex items-end gap-0.5 h-8">
          {waveHeights.map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${state.status === "active" ? "bg-green-500" : "bg-slate-300 dark:bg-slate-600"}`}
              style={{
                height: state.status === "active" ? `${h}px` : "4px",
                animation: state.status === "active" ? `waveform-bar 0.8s ease-in-out ${i * 0.15}s infinite alternate` : "none",
              }}
            />
          ))}
        </div>
      </div>
      {/* Bottom */}
      <div className="flex items-center justify-between mt-2">
        <span className={`text-[10px] ${state.color} transition-colors duration-500`}>
          {state.status === "done" ? `\u2713 ${m.call_finished}` : state.status === "ringing" ? m.call_connecting : m.call_listening}
        </span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500">{m.call_label}: {callCount}</span>
      </div>
    </div>
  )
}

// ============================================
// Card 2 — Calendar booking cycling
// ============================================
const bookings = [
  { day: 15, time: "10:00" },
  { day: 18, time: "14:30" },
  { day: 22, time: "09:00" },
]

const CalendarMockup = ({ active, m }: { active: boolean; m: MockupTexts }) => {
  const [bookingIdx, setBookingIdx] = useState(0)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const days = Array.from({ length: 21 }, (_, i) => i + 1)

  useEffect(() => {
    if (!active) return
    // Show confirmation after 1s
    const t1 = setTimeout(() => setShowConfirmation(true), 1000)
    // Cycle every 5s
    const iv = setInterval(() => {
      setShowConfirmation(false)
      setTimeout(() => {
        setBookingIdx((prev) => (prev + 1) % bookings.length)
        setTimeout(() => setShowConfirmation(true), 1000)
      }, 500)
    }, 5000)
    return () => { clearTimeout(t1); clearInterval(iv) }
  }, [active])

  const booking = bookings[bookingIdx]

  return (
    <div className="bg-[#F0F2F5] dark:bg-bg-card rounded-xl p-3 h-36 overflow-hidden flex flex-col">
      {/* Mini calendar grid */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((d) => (
          <div
            key={d}
            className={`flex items-center justify-center text-[10px] w-5 h-5 transition-all duration-500 ${
              d === booking.day
                ? "bg-blue-500 text-white rounded-full font-bold ring-2 ring-blue-500/30 animate-pulse"
                : "text-slate-400 dark:text-slate-500"
            }`}
          >
            {d}
          </div>
        ))}
      </div>
      {/* Confirmation banner */}
      <div className={`mt-auto bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs rounded-lg px-2 py-1.5 transition-all duration-500 ${showConfirmation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
        {m.calendar_confirmed.replace("{day}", String(booking.day)).replace("{time}", booking.time)}
      </div>
    </div>
  )
}

// ============================================
// Card 3 — Email sequential processing
// ============================================
const EmailMockup = ({ active, m }: { active: boolean; m: MockupTexts }) => {
  const emailRows = [
    { icon: "\uD83D\uDCCB", label: m.inbox_request, badge: m.inbox_classified },
    { icon: "\uD83D\uDCE7", label: m.inbox_query, badge: m.inbox_responded },
    { icon: "\uD83D\uDCC4", label: m.inbox_document, badge: m.inbox_processed },
  ]
  const [processed, setProcessed] = useState(0) // 0=none processing, 1-3 = rows done
  const [processing, setProcessing] = useState(-1) // which row is currently spinning

  useEffect(() => {
    if (!active) return
    let step = 0
    setProcessed(0)
    setProcessing(0) // start processing row 0

    const iv = setInterval(() => {
      step++
      if (step <= 3) {
        setProcessed(step)
        setProcessing(step < 3 ? step : -1)
      } else if (step === 5) {
        // Reset
        step = 0
        setProcessed(0)
        setProcessing(0)
      }
    }, 1500)

    return () => clearInterval(iv)
  }, [active])

  return (
    <div className="bg-[#F0F2F5] dark:bg-bg-card rounded-xl p-3 h-36 overflow-hidden">
      <div className="space-y-2">
        {emailRows.map((row, i) => {
          const isDone = i < processed
          const isProcessing = i === processing
          const isPending = !isDone && !isProcessing
          return (
            <div
              key={i}
              className={`flex items-center justify-between border-l-2 rounded-r-lg px-2.5 py-2 transition-all duration-500 ${
                isDone
                  ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500"
                  : isProcessing
                    ? "bg-yellow-50/60 dark:bg-yellow-900/10 border-yellow-400"
                    : "bg-slate-50 dark:bg-slate-800/30 border-slate-300 dark:border-slate-600 opacity-50"
              }`}
            >
              <span className="text-xs text-slate-700 dark:text-slate-200">
                {row.icon} {row.label}
              </span>
              {isDone && (
                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] px-1.5 py-0.5 rounded-full font-medium transition-opacity duration-500">
                  {"\u2713"} {row.badge}
                </span>
              )}
              {isProcessing && (
                <svg className="w-3.5 h-3.5 text-yellow-500 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {isPending && (
                <span className="text-[10px] text-slate-400">{m.inbox_pending}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================
// Card 4 — Hub-and-spoke with data pulse animation
// ============================================
const hubNodes = [
  { label: "WhatsApp", color: "bg-green-500", dotColor: "bg-green-400", x: 50, y: 8 },
  { label: "Email", color: "bg-blue-500", dotColor: "bg-blue-400", x: 88, y: 45 },
  { label: "Tel", color: "bg-slate-500", dotColor: "bg-slate-400", x: 50, y: 82 },
  { label: "Web", color: "bg-purple-500", dotColor: "bg-purple-400", x: 12, y: 45 },
]

const IntegrationsMockup = ({ active }: { active: boolean; m: MockupTexts }) => {
  const [pulseActive, setPulseActive] = useState(false)

  useEffect(() => {
    if (!active) return
    setPulseActive(true)
  }, [active])

  return (
    <div className="bg-[#F0F2F5] dark:bg-bg-card rounded-xl p-3 h-36 overflow-hidden">
      <div className="relative w-full h-full">
        {/* Center hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center z-10 shadow-[0_0_12px_rgba(147,51,234,0.4)]"
          style={{ animation: pulseActive ? "hub-glow 2s ease-in-out infinite" : "none" }}
        >
          <span className="text-white text-xs font-bold">S</span>
        </div>
        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {hubNodes.map((n, i) => (
            <line key={i} x1="50" y1="50" x2={n.x} y2={n.y} stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-600" />
          ))}
        </svg>
        {/* Animated data pulse dots */}
        {pulseActive && hubNodes.map((n, i) => (
          <div
            key={`pulse-${i}`}
            className={`absolute w-1.5 h-1.5 rounded-full ${n.dotColor} z-20`}
            style={{
              animation: `data-pulse-${i} 2s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
        {/* Channel nodes */}
        {hubNodes.map((n, i) => (
          <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
            <div className={`w-6 h-6 rounded-full ${n.color} flex items-center justify-center`}>
              <span className="text-white text-[8px] font-bold">{n.label[0]}</span>
            </div>
            <span className="text-[8px] text-slate-400 dark:text-slate-500">{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// Card 5 — Analytics with count-up + bar grow
// ============================================
const AnalyticsMockup = ({ active, m }: { active: boolean; m: MockupTexts }) => {
  const [progress, setProgress] = useState(0) // 0 to 1
  const bars = [65, 80, 45, 90, 55]

  useEffect(() => {
    if (!active) return
    let start: number
    const duration = 1500
    const step = (ts: number) => {
      if (!start) start = ts
      const elapsed = ts - start
      const p = Math.min(elapsed / duration, 1)
      setProgress(p)
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active])

  const resolved = Math.round(progress * 94)
  const time = (progress * 2.3).toFixed(1)

  return (
    <div className="bg-[#F0F2F5] dark:bg-bg-card rounded-xl p-3 h-36 overflow-hidden flex flex-col">
      {/* Stat boxes */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-white dark:bg-bg-card-hover rounded-lg px-2 py-1.5">
          <div className="text-[10px] text-slate-400 dark:text-slate-500">{m.analytics_resolved}</div>
          <div className="text-sm font-bold text-slate-800 dark:text-white">{resolved}%</div>
        </div>
        <div className="bg-white dark:bg-bg-card-hover rounded-lg px-2 py-1.5">
          <div className="text-[10px] text-slate-400 dark:text-slate-500">{m.analytics_time}</div>
          <div className="text-sm font-bold text-slate-800 dark:text-white">{time}s</div>
        </div>
      </div>
      {/* Bar chart */}
      <div className="flex-1 flex items-end gap-1.5 px-1">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-blue-500 rounded-t transition-all duration-700 ease-out"
            style={{
              height: `${progress * h}%`,
              transitionDelay: `${i * 100}ms`,
            }}
          />
        ))}
      </div>
      {/* Bottom label */}
      <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 text-center">
        {m.analytics_insight}
      </div>
    </div>
  )
}

// ============================================
// FEATURES CONFIG
// ============================================
interface FeatureConfig {
  key: string
  MockupComponent: React.ComponentType<{ active: boolean; m: MockupTexts }>
  size: string
  microLabelKey: string
}

const featuresConfig: FeatureConfig[] = [
  { key: "chat", MockupComponent: ChatMockup, size: "large", microLabelKey: "chat" },
  { key: "phone", MockupComponent: PhoneMockup, size: "medium", microLabelKey: "phone" },
  { key: "calendar", MockupComponent: CalendarMockup, size: "medium", microLabelKey: "calendar" },
  { key: "email", MockupComponent: EmailMockup, size: "large", microLabelKey: "email" },
  { key: "leads", MockupComponent: IntegrationsMockup, size: "medium", microLabelKey: "leads" },
  { key: "integrations", MockupComponent: AnalyticsMockup, size: "medium", microLabelKey: "integrations" },
]

// ============================================
// ANIMATED CARD WRAPPER
// ============================================
function AnimatedCard({ feature, index, t, m }: { feature: FeatureConfig; index: number; t: ReturnType<typeof useTranslations>; m: MockupTexts }) {
  const { ref, inView } = useInView()

  return (
    <div
      ref={ref}
      className={`group transition-all duration-700 ${feature.size === "large" ? "md:col-span-2" : ""}`}
      style={{ transitionDelay: inView ? `${index * 80}ms` : "0ms" }}
    >
      <div className={`relative bg-white dark:bg-bg-elevated rounded-2xl p-6 sm:p-7 h-full shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_12px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-400 hover:-translate-y-1 border border-slate-200/60 dark:border-white/[0.08] hover:border-brand-secondary/20 dark:hover:border-brand-secondary/20 overflow-hidden ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Micro-label */}
        <div className="relative mb-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-brand-secondary/[0.06] dark:bg-brand-secondary/[0.08] text-[10px] font-bold uppercase tracking-[0.1em] text-brand-secondary dark:text-brand-secondary">
            {t(`features.${feature.microLabelKey}.micro_label`)}
          </span>
        </div>
        
        {/* Mockup area */}
        <div className="relative mb-5 rounded-xl overflow-hidden ring-1 ring-slate-200/40 dark:ring-white/[0.06]">
          <feature.MockupComponent active={inView} m={m} />
        </div>
        
        {/* Title */}
        <h3 className="relative text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug tracking-tight">
          {t(`features.${feature.key}.title`)}
        </h3>
        
        {/* Description */}
        <p className="relative text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          {t(`features.${feature.key}.description`)}
        </p>
      </div>
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================
export function AIWorking247Block() {
  const t = useTranslations("ai_working_247")
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const m: MockupTexts = {
    chat_question: t("mockup.chat_question"),
    chat_response: t("mockup.chat_response"),
    chat_confirmation: t("mockup.chat_confirmation"),
    chat_info_question: t("mockup.chat_info_question"),
    chat_info_response: t("mockup.chat_info_response"),
    chat_info_confirmation: t("mockup.chat_info_confirmation"),
    chat_agent_question: t("mockup.chat_agent_question"),
    chat_agent_response: t("mockup.chat_agent_response"),
    chat_agent_confirmation: t("mockup.chat_agent_confirmation"),
    call_incoming: t("mockup.call_incoming"),
    call_in_progress: t("mockup.call_in_progress"),
    call_completed: t("mockup.call_completed"),
    call_finished: t("mockup.call_finished"),
    call_connecting: t("mockup.call_connecting"),
    call_listening: t("mockup.call_listening"),
    call_label: t("mockup.call_label"),
    calendar_confirmed: t.raw("mockup.calendar_confirmed") as string,
    inbox_request: t("mockup.inbox_request"),
    inbox_query: t("mockup.inbox_query"),
    inbox_document: t("mockup.inbox_document"),
    inbox_classified: t("mockup.inbox_classified"),
    inbox_responded: t("mockup.inbox_responded"),
    inbox_processed: t("mockup.inbox_processed"),
    inbox_pending: t("mockup.inbox_pending"),
    analytics_resolved: t("mockup.analytics_resolved"),
    analytics_time: t("mockup.analytics_time"),
    analytics_insight: t("mockup.analytics_insight"),
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current) }
  }, [])

  return (
    <section id="features" ref={sectionRef} className="relative z-10">
      {/* Transition overlay removed -- aurora flows through */}
      <div className="bg-bg-page dark:bg-bg-page pt-24 sm:pt-32 pb-24 sm:pb-32 px-6 sm:px-8 relative overflow-hidden">
        {/* Refined dot pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 0.5px, transparent 0)`, backgroundSize: "32px 32px" }} />
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Header */}
          <div className={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-subtle dark:bg-bg-subtle border border-brand-secondary-hover/25 dark:border-accent-cyan/40 mb-8">
              <span className="text-brand-secondary-hover dark:text-accent-cyan text-sm">{"\u2726"}</span>
              <span className="text-xs font-semibold tracking-widest text-brand-secondary-hover dark:text-accent-cyan uppercase">
                {t("badge")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white text-balance mb-6 leading-[1.1] tracking-tight">
              {t("title_1")}{" "}
              <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">
                {t("title_2")}
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
            {featuresConfig.map((feature, index) => (
              <AnimatedCard key={feature.key} feature={feature} index={index} t={t} m={m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
