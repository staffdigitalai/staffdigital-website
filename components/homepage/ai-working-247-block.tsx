"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"

// ============================================
// STATIC CARD MOCKUP COMPONENTS
// ============================================

/** Card 0 — WhatsApp-style chat mockup */
const ChatMockup = () => (
  <div className="bg-[#F0F2F5] dark:bg-[#1A1D21] rounded-xl p-3 h-36 overflow-hidden">
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
      {/* User bubble — right */}
      <div className="flex justify-end">
        <div className="bg-[#DCF8C6] dark:bg-[#005C4B] text-slate-800 dark:text-white rounded-xl rounded-tr-sm px-3 py-1.5 text-xs max-w-[80%]">
          {"\""}{"?"}Puedo reservar para este viernes?
        </div>
      </div>
      {/* AI bubble — left */}
      <div className="flex justify-start">
        <div className="bg-white dark:bg-[#1F2937] text-slate-700 dark:text-slate-200 rounded-xl rounded-tl-sm px-3 py-1.5 text-xs max-w-[80%]">
          {"!"}Claro! He verificado disponibilidad.
        </div>
      </div>
      {/* AI action bubble — left */}
      <div className="flex justify-start">
        <div className="bg-white dark:bg-[#1F2937] text-slate-700 dark:text-slate-200 rounded-xl rounded-tl-sm px-3 py-1.5 text-xs max-w-[80%]">
          {"⚡"} Reserva confirmada: Viernes 16:30 <span className="text-green-600 dark:text-green-400">{"✓"}</span>
        </div>
      </div>
    </div>
  </div>
)

/** Card 1 — Phone call interface mockup */
const PhoneMockup = () => (
  <div className="bg-[#F0F2F5] dark:bg-[#1A1D21] rounded-xl p-3 h-36 overflow-hidden flex flex-col">
    {/* Top label */}
    <div className="flex items-center gap-1.5 mb-3">
      <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
      <span className="text-[10px] text-slate-500 dark:text-slate-400">Llamada entrante</span>
    </div>
    {/* Center: avatar + waveform */}
    <div className="flex-1 flex items-center justify-center gap-4">
      <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-600" />
      <div className="flex items-end gap-0.5 h-8">
        {[14, 22, 10, 28, 16].map((h, i) => (
          <div key={i} className="w-1 rounded-full bg-green-500" style={{ height: `${h}px` }} />
        ))}
      </div>
    </div>
    {/* Bottom */}
    <div className="flex items-center justify-between mt-2">
      <span className="text-[10px] text-slate-500 dark:text-slate-400">{"En curso \u00B7 2:34"}</span>
      <span className="text-[10px] text-slate-400 dark:text-slate-500">Llamadas: 14</span>
    </div>
  </div>
)

/** Card 2 — Calendar/booking mockup */
const CalendarMockup = () => {
  const days = Array.from({ length: 21 }, (_, i) => i + 1)
  return (
    <div className="bg-[#F0F2F5] dark:bg-[#1A1D21] rounded-xl p-3 h-36 overflow-hidden flex flex-col">
      {/* Mini calendar grid: 3 rows x 7 cols */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((d) => (
          <div
            key={d}
            className={`flex items-center justify-center text-[10px] w-5 h-5 ${
              d === 15
                ? "bg-blue-500 text-white rounded-full font-bold"
                : "text-slate-400 dark:text-slate-500"
            }`}
          >
            {d}
          </div>
        ))}
      </div>
      {/* Confirmation banner */}
      <div className="mt-auto bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs rounded-lg px-2 py-1.5">
        {"✓"} Cita confirmada: {"día"} 15, 10:00
      </div>
    </div>
  )
}

/** Card 3 — Email inbox mockup */
const EmailMockup = () => {
  const rows = [
    { icon: "\uD83D\uDCCB", label: "Solicitud recibida", badge: "Clasificada" },
    { icon: "\uD83D\uDCE7", label: "Consulta cliente", badge: "Respondida" },
    { icon: "\uD83D\uDCC4", label: "Documento adjunto", badge: "Procesado" },
  ]
  return (
    <div className="bg-[#F0F2F5] dark:bg-[#1A1D21] rounded-xl p-3 h-36 overflow-hidden">
      <div className="space-y-2">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-500 rounded-r-lg px-2.5 py-2"
          >
            <span className="text-xs text-slate-700 dark:text-slate-200">
              {row.icon} {row.label}
            </span>
            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] px-1.5 py-0.5 rounded-full font-medium">
              {"✓"} {row.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Card 4 — Hub-and-spoke integrations mockup */
const IntegrationsMockup = () => {
  const nodes = [
    { label: "WhatsApp", color: "bg-green-500", x: "50%", y: "8%" },
    { label: "Email", color: "bg-blue-500", x: "88%", y: "45%" },
    { label: "Tel", color: "bg-slate-500", x: "50%", y: "82%" },
    { label: "Web", color: "bg-purple-500", x: "12%", y: "45%" },
  ]
  return (
    <div className="bg-[#F0F2F5] dark:bg-[#1A1D21] rounded-xl p-3 h-36 overflow-hidden">
      <div className="relative w-full h-full">
        {/* Center hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center z-10">
          <span className="text-white text-xs font-bold">S</span>
        </div>
        {/* Connecting lines + nodes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {nodes.map((n, i) => (
            <line key={i} x1="50" y1="50" x2={parseFloat(n.x)} y2={parseFloat(n.y)} stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-600" />
          ))}
        </svg>
        {nodes.map((n, i) => (
          <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5" style={{ left: n.x, top: n.y }}>
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

/** Card 5 — Analytics dashboard mockup */
const AnalyticsMockup = () => {
  const bars = [65, 80, 45, 90, 55]
  return (
    <div className="bg-[#F0F2F5] dark:bg-[#1A1D21] rounded-xl p-3 h-36 overflow-hidden flex flex-col">
      {/* Stat boxes */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-white dark:bg-[#1F2937] rounded-lg px-2 py-1.5">
          <div className="text-[10px] text-slate-400 dark:text-slate-500">Resueltos</div>
          <div className="text-sm font-bold text-slate-800 dark:text-white">94%</div>
        </div>
        <div className="bg-white dark:bg-[#1F2937] rounded-lg px-2 py-1.5">
          <div className="text-[10px] text-slate-400 dark:text-slate-500">Tiempo</div>
          <div className="text-sm font-bold text-slate-800 dark:text-white">2.3s</div>
        </div>
      </div>
      {/* Bar chart */}
      <div className="flex-1 flex items-end gap-1.5 px-1">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 bg-blue-500 rounded-t" style={{ height: `${h}%` }} />
        ))}
      </div>
      {/* Bottom label */}
      <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 text-center">
        Mejora continua basada en datos
      </div>
    </div>
  )
}

// ============================================
// FEATURES CONFIG
// ============================================

const featuresConfig = [
  { key: "chat", Mockup: ChatMockup, size: "large", microLabelKey: "chat" },
  { key: "phone", Mockup: PhoneMockup, size: "medium", microLabelKey: "phone" },
  { key: "calendar", Mockup: CalendarMockup, size: "medium", microLabelKey: "calendar" },
  { key: "email", Mockup: EmailMockup, size: "large", microLabelKey: "email" },
  { key: "leads", Mockup: IntegrationsMockup, size: "medium", microLabelKey: "leads" },
  { key: "integrations", Mockup: AnalyticsMockup, size: "medium", microLabelKey: "integrations" },
]

// ============================================
// MAIN COMPONENT
// ============================================

export function AIWorking247Block() {
  const t = useTranslations("ai_working_247")
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  return (
    <section id="features" ref={sectionRef} className="relative z-10">
      <div className="bg-[#F8FAFC] dark:bg-[#0A0E1A] pt-24 sm:pt-32 pb-24 sm:pb-32 px-6 sm:px-8 relative overflow-hidden">
        {/* Refined dot pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 0.5px, transparent 0)`, backgroundSize: "32px 32px" }} />
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Header */}
          <div className={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF4FF] dark:bg-[#0F1B2E] border border-[#0062CC]/25 dark:border-[#38BDF8]/40 mb-8">
              <span className="text-[#0062CC] dark:text-[#7DD3FC] text-sm">{"✦"}</span>
              <span className="text-xs font-semibold tracking-widest text-[#0062CC] dark:text-[#7DD3FC] uppercase">
                {t("badge")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white text-balance mb-6 leading-[1.1] tracking-tight">
              {t("title_1")}{" "}
              <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
                {t("title_2")}
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            {featuresConfig.map((feature, index) => (
              <div
                key={feature.key}
                className={`group transition-all duration-700 ${feature.size === "large" ? "md:col-span-2" : ""}`}
                style={{ transitionDelay: isVisible ? `${300 + index * 80}ms` : "0ms" }}
              >
                <div className="relative bg-white dark:bg-[#111827] rounded-2xl p-6 sm:p-7 h-full shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_12px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-400 hover:-translate-y-1 border border-slate-200/60 dark:border-white/[0.08] hover:border-[#0078AA]/20 dark:hover:border-[#00D4FF]/20 overflow-hidden">
                  {/* Micro-label */}
                  <div className="relative mb-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#0078AA]/[0.06] dark:bg-[#00D4FF]/[0.08] text-[10px] font-bold uppercase tracking-[0.1em] text-[#0078AA] dark:text-[#00D4FF]">
                      {t(`features.${feature.microLabelKey}.micro_label`)}
                    </span>
                  </div>
                  
                  {/* Mockup area */}
                  <div className="relative mb-5 rounded-xl overflow-hidden ring-1 ring-slate-200/40 dark:ring-white/[0.06]">
                    <feature.Mockup />
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
