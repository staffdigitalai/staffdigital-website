"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Phone } from "lucide-react"
import { useReducedMotion } from "framer-motion"
import { useTranslations } from "next-intl"

/**
 * AI-working-24/7 showcase.
 *
 * Six live mockups animating in-place once the section scrolls into
 * view:
 *   1. chat_support        — WhatsApp chat with sequential bubbles
 *   2. phone_receptionist  — call state cycle + counter
 *   3. appointment_booking — calendar booking cycling days/times
 *   4. email_automation    — inbox rows processing sequentially
 *   5. lead_qualification  — 3 leads with progress bars filling
 *   6. platform_integration — CRM/Calendar/WhatsApp/SMS hub with
 *                              data pulse dots
 *
 * Prop-driven surface:
 *   - mode="all" (default) → 6-card grid, used on the homepage
 *   - mode="<single>"       → one mockup expanded, used on
 *                              /soluciones/[slug]
 *
 * Reduced-motion policy:
 *   This is a demo component — its entire purpose is to show the
 *   product in motion. The state-cycling timers (typing → bubble,
 *   call → counter, email sequence, lead progress tween, calendar
 *   cycle, hub pulse) run unconditionally so the mockup remains
 *   informative for every visitor. Only the *decorative* infinite
 *   CSS animations (animate-pulse on status dots, animate-bounce on
 *   typing dots, animate-spin on the spinner glyph) are gated on
 *   `useReducedMotion()`. This follows CLAUDE.md's intent
 *   ("respect prefers-reduced-motion without leaving elements
 *   stuck invisible") while keeping the demo valuable for users who
 *   have the OS toggle on — they still see the flow, just without
 *   the jarring pulsing/bouncing accents.
 *
 * Content source: the `ai_working_247` i18n namespace in
 * messages/{es,en,pt}.json. Strings mirror the v0 template exactly
 * (cards.chat_support.title, cards.phone_receptionist.description,
 * etc.). Only three labels remain hardcoded because they're placeholders
 * in the original template: the three lead names ("Sarah M.", "John D.",
 * "Mike R.") and their percentages.
 */

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
// Showcase mode — controls which mockup(s) render
// ============================================
export type ShowcaseMode =
  | "all"
  | "whatsapp"       // chat_support
  | "voice"          // phone_receptionist
  | "calendar"       // appointment_booking
  | "email"          // email_automation
  | "leads"          // lead_qualification
  | "integrations"   // platform_integration

// ============================================
// Mockup texts pulled from the i18n cards namespace
// ============================================
interface MockupTexts {
  chat_greeting: string
  chat_user_reply: string
  phone_calls_counter: string
  phone_call_status: string
  calendar_confirmation: string
  email_label_service: string
  email_label_appointment: string
  email_label_quote: string
  integration_connected_status: string
}

// ============================================
// Card 1 — WhatsApp Chat
// ============================================
const ChatMockup = ({ active, m }: { active: boolean; m: MockupTexts }) => {
  const reduce = useReducedMotion()
  // Two-bubble conversation: AI greeting, user reply. Loops.
  const [visibleBubbles, setVisibleBubbles] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const runCycle = useCallback(() => {
    const clear = () => { if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null } }
    clear()
    setVisibleBubbles(0)
    setShowTyping(false)

    const step1 = () => {
      // AI types → greeting appears
      setShowTyping(true)
      timerRef.current = setTimeout(() => {
        setShowTyping(false)
        setVisibleBubbles(1)
        timerRef.current = setTimeout(step2, 1200)
      }, 1000)
    }
    const step2 = () => {
      // User reply appears
      setVisibleBubbles(2)
      // Hold, then loop
      timerRef.current = setTimeout(runCycle, 3500)
    }
    timerRef.current = setTimeout(step1, 500)
  }, [])

  useEffect(() => {
    if (!active) return
    runCycle()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [active, runCycle])

  return (
    <div className="bg-whatsapp-bg-chat dark:bg-bg-card rounded-xl p-3 h-36 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-foreground/10 dark:border-white/[0.06]">
        <div className="w-1 h-3 rounded-full bg-accent-green" />
        <span className="text-[10px] font-semibold text-fg-secondary dark:text-fg-secondary">WhatsApp Business</span>
        <div className="ml-auto flex items-center gap-1">
          <div className={`w-1.5 h-1.5 bg-accent-green rounded-full ${reduce ? "" : "animate-pulse"}`} />
          <span className="text-[10px] text-fg-muted">24/7</span>
        </div>
      </div>

      <div className="space-y-1.5">
        {/* Bubble 1 — AI greeting */}
        <div
          className={`flex justify-start transition-all duration-500 ${visibleBubbles >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <div className="bg-bg-card dark:bg-bg-card-hover text-fg-secondary dark:text-fg-secondary rounded-xl rounded-tl-sm px-3 py-1.5 text-xs max-w-[80%]">
            {m.chat_greeting}
          </div>
        </div>
        {/* Bubble 2 — user reply */}
        <div
          className={`flex justify-end transition-all duration-500 ${visibleBubbles >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <div className="bg-whatsapp-green-bubble dark:bg-whatsapp-bubble-dark text-fg-primary dark:text-white rounded-xl rounded-tr-sm px-3 py-1.5 text-xs max-w-[80%]">
            {m.chat_user_reply}
          </div>
        </div>
        {/* Typing indicator */}
        {showTyping && (
          <div className="flex justify-start">
            <div className="bg-bg-card dark:bg-bg-card-hover rounded-xl rounded-tl-sm px-3 py-2 flex gap-1">
              <span className={`w-1.5 h-1.5 bg-fg-muted rounded-full ${reduce ? "" : "animate-bounce"}`} style={{ animationDelay: "0ms" }} />
              <span className={`w-1.5 h-1.5 bg-fg-muted rounded-full ${reduce ? "" : "animate-bounce"}`} style={{ animationDelay: "150ms" }} />
              <span className={`w-1.5 h-1.5 bg-fg-muted rounded-full ${reduce ? "" : "animate-bounce"}`} style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// Card 2 — Phone call state cycling
// ============================================
const PhoneMockup = ({ active, m }: { active: boolean; m: MockupTexts }) => {
  const reduce = useReducedMotion()
  const callStates = [
    { color: "text-accent-amber", status: "ringing" as const },
    { color: "text-accent-green", status: "active" as const },
    { color: "text-accent-blue", status: "done" as const },
  ]
  const [stateIdx, setStateIdx] = useState(0)

  useEffect(() => {
    if (!active) return
    const iv = setInterval(() => {
      setStateIdx((prev) => (prev + 1) % 3)
    }, 2500)
    return () => clearInterval(iv)
  }, [active])

  const state = callStates[stateIdx]
  const waveHeights = [14, 22, 10, 28, 16]

  return (
    <div className="bg-whatsapp-bg-chat dark:bg-bg-card rounded-xl p-3 h-36 overflow-hidden flex flex-col">
      {/* Top: status + call counter */}
      <div className="flex items-center justify-between gap-1.5 mb-2">
        <div className="flex items-center gap-1.5">
          <svg className={`w-3.5 h-3.5 ${state.color} transition-colors duration-500 ${state.status === "ringing" && !reduce ? "animate-pulse" : ""}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <span className={`text-[10px] ${state.color} transition-colors duration-500`}>
            {state.status === "done" ? `\u2713 ${m.phone_call_status}` : state.status === "ringing" ? m.phone_call_status : m.phone_call_status}
          </span>
        </div>
        <span className="text-[10px] text-fg-muted">{m.phone_calls_counter}</span>
      </div>
      {/* Center: avatar + waveform */}
      <div className="flex-1 flex items-center justify-center gap-4">
        <div className="w-10 h-10 rounded-full bg-accent-green flex items-center justify-center">
          <Phone className="w-5 h-5 text-white" />
        </div>
        <div className="flex items-end gap-0.5 h-8">
          {waveHeights.map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${state.status === "active" ? "bg-accent-green" : "bg-fg-muted/40"}`}
              style={{
                height: state.status === "active" ? `${h}px` : "4px",
                animation: state.status === "active" && !reduce ? `waveform-bar 0.8s ease-in-out ${i * 0.15}s infinite alternate` : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// Card 3 — Calendar booking cycling
// ============================================
const bookings = [
  { day: 15, time: "10:00" },
  { day: 18, time: "14:30" },
  { day: 22, time: "09:00" },
]

const CalendarMockup = ({ active, m }: { active: boolean; m: MockupTexts }) => {
  const reduce = useReducedMotion()
  const [bookingIdx, setBookingIdx] = useState(0)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const days = Array.from({ length: 21 }, (_, i) => i + 1)

  useEffect(() => {
    if (!active) return
    const t1 = setTimeout(() => setShowConfirmation(true), 800)
    const iv = setInterval(() => {
      setShowConfirmation(false)
      setTimeout(() => {
        setBookingIdx((prev) => (prev + 1) % bookings.length)
        setTimeout(() => setShowConfirmation(true), 600)
      }, 400)
    }, 4500)
    return () => { clearTimeout(t1); clearInterval(iv) }
  }, [active])

  const booking = bookings[bookingIdx]
  const confirmationText = m.calendar_confirmation
    .replace("{day}", String(booking.day))
    .replace("{time}", booking.time)
    .replace("15th", `${booking.day}th`)
    .replace("el día 15", `el día ${booking.day}`)
    .replace("o dia 15", `o dia ${booking.day}`)

  return (
    <div className="bg-whatsapp-bg-chat dark:bg-bg-card rounded-xl p-3 h-36 overflow-hidden flex flex-col">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((d) => (
          <div
            key={d}
            className={`flex items-center justify-center text-[10px] w-5 h-5 transition-all duration-500 ${
              d === booking.day
                ? `bg-accent-blue text-white rounded-full font-bold ring-2 ring-accent-blue/30 ${reduce ? "" : "animate-pulse"}`
                : "text-fg-muted"
            }`}
          >
            {d}
          </div>
        ))}
      </div>
      <div className={`mt-auto bg-accent-green/10 dark:bg-accent-green/20 text-accent-green text-xs rounded-lg px-2 py-1.5 transition-all duration-500 ${showConfirmation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
        {confirmationText}
      </div>
    </div>
  )
}

// ============================================
// Card 4 — Email sequential processing
// ============================================
const EmailMockup = ({ active, m }: { active: boolean; m: MockupTexts }) => {
  const reduce = useReducedMotion()
  const emailRows = [
    { icon: "\uD83D\uDCCB", label: m.email_label_service },
    { icon: "\uD83D\uDCE7", label: m.email_label_appointment },
    { icon: "\uD83D\uDCC4", label: m.email_label_quote },
  ]
  const [processed, setProcessed] = useState(0)
  const [processing, setProcessing] = useState(0)

  useEffect(() => {
    if (!active) return
    let step = 0
    setProcessed(0)
    setProcessing(0)
    const iv = setInterval(() => {
      step++
      if (step <= 3) {
        setProcessed(step)
        setProcessing(step < 3 ? step : -1)
      } else if (step === 5) {
        step = 0
        setProcessed(0)
        setProcessing(0)
      }
    }, 1400)
    return () => clearInterval(iv)
  }, [active])

  return (
    <div className="bg-whatsapp-bg-chat dark:bg-bg-card rounded-xl p-3 h-36 overflow-hidden">
      <div className="space-y-2">
        {emailRows.map((row, i) => {
          const isDone = i < processed
          const isProcessing = i === processing
          return (
            <div
              key={i}
              className={`flex items-center justify-between border-l-2 rounded-r-lg px-2.5 py-2 transition-all duration-500 ${
                isDone
                  ? "bg-accent-blue/10 dark:bg-accent-blue/20 border-accent-blue"
                  : isProcessing
                    ? "bg-accent-amber/10 dark:bg-accent-amber/15 border-accent-amber"
                    : "bg-bg-subtle dark:bg-bg-card/50 border-foreground/20 opacity-50"
              }`}
            >
              <span className="text-xs text-fg-secondary dark:text-fg-secondary">
                {row.icon} {row.label}
              </span>
              {isDone && (
                <span className="bg-accent-green/15 dark:bg-accent-green/20 text-accent-green text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                  {"\u2713"}
                </span>
              )}
              {isProcessing && (
                <svg className={`w-3.5 h-3.5 text-accent-amber ${reduce ? "" : "animate-spin"}`} fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================
// Card 5 — Lead qualification: 3 leads with progress bars
// ============================================
const LEADS = [
  { name: "Sarah M.", target: 85 },
  { name: "John D.",  target: 90 },
  { name: "Mike R.",  target: 78 },
] as const

const LeadQualificationMockup = ({ active }: { active: boolean; m: MockupTexts }) => {
  // Progress 0 → 1 drives all three bars. Loops every 4s.
  const [progress, setProgress] = useState(0)
  const cycleKey = useRef(0)

  useEffect(() => {
    if (!active) return
    let rafId: number
    let cancelled = false
    const tween = () => {
      let start: number | null = null
      const duration = 1800
      const step = (ts: number) => {
        if (cancelled) return
        if (start === null) start = ts
        const p = Math.min((ts - start) / duration, 1)
        setProgress(p)
        if (p < 1) {
          rafId = requestAnimationFrame(step)
        } else {
          // Hold, then restart
          setTimeout(() => {
            if (!cancelled) {
              cycleKey.current += 1
              setProgress(0)
              tween()
            }
          }, 2000)
        }
      }
      rafId = requestAnimationFrame(step)
    }
    tween()
    return () => {
      cancelled = true
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [active])

  return (
    <div className="bg-whatsapp-bg-chat dark:bg-bg-card rounded-xl p-3 h-36 overflow-hidden flex flex-col justify-center gap-2">
      {LEADS.map((lead) => {
        const pct = Math.round(progress * lead.target)
        return (
          <div key={lead.name} className="flex items-center gap-2">
            <span className="w-14 shrink-0 text-[10px] font-semibold text-fg-secondary dark:text-fg-secondary">{lead.name}</span>
            <div className="flex-1 h-2 bg-foreground/10 dark:bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-green to-accent-blue rounded-full transition-[width] duration-300 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-8 shrink-0 text-right text-[10px] font-bold text-fg-primary dark:text-white tabular-nums">{pct}%</span>
            {pct === lead.target && (
              <span className="text-accent-green text-[10px]">{"\u2713"}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ============================================
// Card 6 — Platform integration hub (CRM · Calendar · WhatsApp · SMS)
// ============================================
const hubNodes = [
  { label: "CRM",      color: "bg-accent-violet", dotColor: "bg-accent-violet/70", x: 50, y: 8 },
  { label: "Calendar", color: "bg-accent-blue",   dotColor: "bg-accent-blue/70",   x: 88, y: 45 },
  { label: "WhatsApp", color: "bg-accent-green",  dotColor: "bg-accent-green/70",  x: 50, y: 82 },
  { label: "SMS",      color: "bg-accent-amber",  dotColor: "bg-accent-amber/70",  x: 12, y: 45 },
]

const PlatformIntegrationMockup = ({ active, m }: { active: boolean; m: MockupTexts }) => {
  const reduce = useReducedMotion()
  const [connected, setConnected] = useState(0)

  useEffect(() => {
    if (!active) return
    let step = 0
    setConnected(0)
    const iv = setInterval(() => {
      step++
      if (step <= 4) {
        setConnected(step)
      } else if (step === 6) {
        step = 0
        setConnected(0)
      }
    }, 900)
    return () => clearInterval(iv)
  }, [active])

  return (
    <div className="bg-whatsapp-bg-chat dark:bg-bg-card rounded-xl p-3 h-36 overflow-hidden">
      <div className="relative w-full h-full">
        {/* Center hub */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center z-10 shadow-[0_0_12px_rgba(147,51,234,0.4)]"
          style={{ animation: reduce ? "none" : "hub-glow 2s ease-in-out infinite" }}
        >
          <span className="text-white text-xs font-bold">S</span>
        </div>
        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {hubNodes.map((n, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={n.x}
              y2={n.y}
              stroke="currentColor"
              strokeWidth="0.5"
              className={`${i < connected ? "text-foreground/40" : "text-foreground/15"} transition-colors duration-300`}
            />
          ))}
        </svg>
        {/* Data pulse dots (decorative, gated on reduced-motion) */}
        {!reduce && hubNodes.map((n, i) => (
          i < connected && (
            <div
              key={`pulse-${i}`}
              className={`absolute w-1.5 h-1.5 rounded-full ${n.dotColor} z-20`}
              style={{ animation: `data-pulse-${i} 2s ease-in-out ${i * 0.5}s infinite` }}
            />
          )
        ))}
        {/* Channel nodes */}
        {hubNodes.map((n, i) => (
          <div
            key={i}
            className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5 transition-opacity duration-300 ${i < connected ? "opacity-100" : "opacity-40"}`}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <div className={`w-6 h-6 rounded-full ${n.color} flex items-center justify-center`}>
              <span className="text-white text-[8px] font-bold">{n.label[0]}</span>
            </div>
            <span className="text-[8px] text-fg-muted">{n.label}</span>
          </div>
        ))}
        {/* Connection counter */}
        <div className="absolute bottom-0 right-0 text-[10px] text-fg-muted tabular-nums">
          {m.integration_connected_status.replace("4/4", `${connected}/4`)}
        </div>
      </div>
    </div>
  )
}

// ============================================
// CARD META — maps ShowcaseMode to its card slug + mockup
// ============================================
interface CardMeta {
  mode: Exclude<ShowcaseMode, "all">
  cardKey: "chat_support" | "phone_receptionist" | "appointment_booking" | "email_automation" | "lead_qualification" | "platform_integration"
  MockupComponent: React.ComponentType<{ active: boolean; m: MockupTexts }>
  /** Grid column span when rendered in the 4-col xl grid. */
  size: "large" | "medium"
  /** True when the card should render the "24/7" badge pill in the
   *  top-right — only the chat card does per the template. */
  has24Badge: boolean
}

const CARDS: CardMeta[] = [
  { mode: "whatsapp",     cardKey: "chat_support",         MockupComponent: ChatMockup,                 size: "large",  has24Badge: true },
  { mode: "voice",        cardKey: "phone_receptionist",   MockupComponent: PhoneMockup,                size: "medium", has24Badge: false },
  { mode: "calendar",     cardKey: "appointment_booking",  MockupComponent: CalendarMockup,             size: "medium", has24Badge: false },
  { mode: "email",        cardKey: "email_automation",     MockupComponent: EmailMockup,                size: "large",  has24Badge: false },
  { mode: "leads",        cardKey: "lead_qualification",   MockupComponent: LeadQualificationMockup,    size: "medium", has24Badge: false },
  { mode: "integrations", cardKey: "platform_integration", MockupComponent: PlatformIntegrationMockup,  size: "medium", has24Badge: false },
]

// ============================================
// ANIMATED CARD WRAPPER
// ============================================
function AnimatedCard({
  card,
  index,
  t,
  m,
  expanded = false,
}: {
  card: CardMeta
  index: number
  t: ReturnType<typeof useTranslations>
  m: MockupTexts
  expanded?: boolean
}) {
  const { ref, inView } = useInView()

  return (
    <div
      ref={ref}
      className={`group transition-all duration-700 ${!expanded && card.size === "large" ? "md:col-span-2" : ""} ${expanded ? "md:col-span-full max-w-3xl mx-auto w-full" : ""}`}
      style={{ transitionDelay: inView ? `${index * 80}ms` : "0ms" }}
    >
      <div className={`relative bg-bg-card dark:bg-bg-elevated rounded-2xl p-6 sm:p-7 h-full shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_12px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-400 hover:-translate-y-1 border border-foreground/10 dark:border-white/[0.08] hover:border-brand-secondary/20 dark:hover:border-brand-secondary/20 overflow-hidden ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* 24/7 badge (chat_support only) */}
        {card.has24Badge && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-accent-green/15 text-accent-green text-[10px] font-bold tracking-wide">
              {t(`cards.${card.cardKey}.badge`)}
            </span>
          </div>
        )}

        {/* Mockup area */}
        <div className="relative mb-5 rounded-xl overflow-hidden ring-1 ring-foreground/10 dark:ring-white/[0.06]">
          <card.MockupComponent active={inView} m={m} />
        </div>

        {/* Title */}
        <h3 className="relative text-base sm:text-lg font-bold text-fg-primary dark:text-white mb-2 leading-snug tracking-tight">
          {t(`cards.${card.cardKey}.title`)}
        </h3>

        {/* Description */}
        <p className="relative text-fg-muted text-sm leading-relaxed">
          {t(`cards.${card.cardKey}.description`)}
        </p>
      </div>
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================
interface AIWorking247BlockProps {
  /**
   * Which mockup(s) to show.
   * - "all" (default) → full 6-card grid (homepage)
   * - "<single>"     → one mockup expanded (/soluciones/[slug])
   */
  mode?: ShowcaseMode
  /** Optional: override the i18n-driven title. */
  title?: string
  /** Optional: override the i18n-driven description. */
  subtitle?: string
}

export function AIWorking247Block({
  mode = "all",
  title,
  subtitle,
}: AIWorking247BlockProps = {}) {
  const t = useTranslations("ai_working_247")
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Pull mockup strings from the nested cards.* keys
  const m: MockupTexts = {
    chat_greeting:                t("cards.chat_support.mockup_greeting"),
    chat_user_reply:              t("cards.chat_support.mockup_user_reply"),
    phone_calls_counter:          t("cards.phone_receptionist.mockup_calls_counter"),
    phone_call_status:            t("cards.phone_receptionist.mockup_call_status"),
    calendar_confirmation:        t("cards.appointment_booking.mockup_confirmation"),
    email_label_service:          t("cards.email_automation.mockup_label_service"),
    email_label_appointment:      t("cards.email_automation.mockup_label_appointment"),
    email_label_quote:            t("cards.email_automation.mockup_label_quote"),
    integration_connected_status: t("cards.platform_integration.mockup_connected_status"),
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current) }
  }, [])

  const resolvedTitle = title ?? t("title")
  const resolvedSubtitle = subtitle ?? t("description")

  const shownCards = mode === "all" ? CARDS : CARDS.filter((c) => c.mode === mode)
  const isSingle = shownCards.length === 1

  return (
    <section id="features" ref={sectionRef} className="relative z-10">
      <div className="bg-bg-page dark:bg-bg-page pt-24 sm:pt-32 pb-24 sm:pb-32 px-6 sm:px-8 relative overflow-hidden">
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 0.5px, transparent 0)`, backgroundSize: "32px 32px" }} />
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Header */}
          <div className={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-subtle dark:bg-bg-subtle border border-brand-secondary-hover/25 dark:border-accent-cyan/40 mb-8">
              <span className="text-brand-secondary-hover dark:text-accent-cyan text-sm">{"\u2726"}</span>
              <span className="text-xs font-semibold tracking-widest text-brand-secondary-hover dark:text-accent-cyan uppercase">
                {t("eyebrow")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-fg-primary dark:text-white text-balance mb-6 leading-[1.1] tracking-tight">
              {resolvedTitle}
            </h2>
            <p className="text-base sm:text-lg text-fg-muted max-w-2xl mx-auto leading-relaxed">
              {resolvedSubtitle}
            </p>
          </div>

          {/* Cards grid */}
          <div className={`grid gap-4 lg:gap-5 ${isSingle ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"}`}>
            {shownCards.map((card, index) => (
              <AnimatedCard
                key={card.cardKey}
                card={card}
                index={index}
                t={t}
                m={m}
                expanded={isSingle}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
