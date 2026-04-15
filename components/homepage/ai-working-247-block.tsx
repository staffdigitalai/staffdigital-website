"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"

// ============================================
// ANIMATED DEMO COMPONENTS
// ============================================

const AnimatedChatDemo = ({ isActive }: { isActive: boolean }) => {
  const [messages, setMessages] = useState([
    { text: "Hola, estoy disponible para ayudarte en cualquier momento.", isBot: true, visible: false },
    { text: "¿Podrían decirme si puedo reservar para este viernes?", isBot: false, visible: false },
    { text: "Claro, estoy verificando disponibilidad en tiempo real.", isBot: true, visible: false },
    { text: "Hay disponibilidad a las 16:30. ¿Deseas confirmar la reserva?", isBot: true, visible: false, isAction: true },
  ])
  const [typingDots, setTypingDots] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)

  useEffect(() => {
    if (!isActive) return
    setMessages((prev) => prev.map((msg) => ({ ...msg, visible: false })))
    const timers: NodeJS.Timeout[] = []
    timers.push(setTimeout(() => {
      setMessages((prev) => prev.map((msg, i) => ({ ...msg, visible: i === 0 })))
    }, 500))
    timers.push(setTimeout(() => {
      setMessages((prev) => prev.map((msg, i) => ({ ...msg, visible: i <= 1 })))
    }, 2000))
    timers.push(setTimeout(() => {
      setMessages((prev) => prev.map((msg, i) => ({ ...msg, visible: i <= 2 })))
    }, 3500))
    timers.push(setTimeout(() => {
      setMessages((prev) => prev.map((msg) => ({ ...msg, visible: true })))
    }, 5500))
    timers.push(setTimeout(() => setCycleCount((prev) => prev + 1), 9000))
    return () => timers.forEach(t => clearTimeout(t))
  }, [isActive, cycleCount])

  return (
    <div className="bg-slate-50 rounded-lg p-4 h-36 overflow-hidden relative">
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-xs text-slate-500 font-medium">24/7</span>
      </div>
      <div className="space-y-1.5">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.isBot ? "justify-start" : "justify-end"} transition-all duration-500 ${msg.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <div className={`max-w-[85%] px-3 py-1.5 rounded-full text-xs ${msg.isBot ? (msg.isAction ? "bg-green-100 text-green-800 border border-green-200" : "bg-slate-200 text-slate-700") : "bg-blue-500 text-white"}`}>
              {msg.isAction && "⚡ "}{msg.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const AnimatedPhoneDemo = ({ isActive }: { isActive: boolean }) => {
  const [step, setStep] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)
  const steps = [
    { label: "Gracias por llamar. ¿En qué puedo ayudarte?", type: "bot" },
    { label: "Quiero información sobre mis resultados.", type: "user" },
    { label: "Estoy accediendo a tu historial...", type: "bot" },
    { label: "✔ Solicitud registrada y enviada al equipo", type: "action" },
  ]

  useEffect(() => {
    if (!isActive) return
    setStep(0)
    const timers: NodeJS.Timeout[] = []
    steps.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i + 1), 1500 * (i + 1)))
    })
    timers.push(setTimeout(() => setCycleCount((p) => p + 1), 8000))
    return () => timers.forEach(t => clearTimeout(t))
  }, [isActive, cycleCount])

  return (
    <div className="bg-slate-50 rounded-lg p-4 h-36 overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${step > 0 ? "bg-blue-500" : "bg-green-500 animate-pulse"}`}>
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        </div>
        <span className="text-xs text-slate-500">{step > 0 ? "En curso" : "Entrante"}</span>
      </div>
      <div className="space-y-1.5">
        {steps.slice(0, step).map((s, i) => (
          <div key={i} className={`text-xs px-2.5 py-1 rounded transition-all duration-500 ${s.type === "action" ? "bg-green-100 text-green-700 font-medium" : s.type === "user" ? "bg-blue-50 text-blue-700" : "bg-white text-slate-600"}`}>
            {s.label}
          </div>
        ))}
      </div>
    </div>
  )
}

const AnimatedCalendarDemo = ({ isActive }: { isActive: boolean }) => {
  const [step, setStep] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)

  useEffect(() => {
    if (!isActive) return
    setStep(0)
    const timers: NodeJS.Timeout[] = []
    timers.push(setTimeout(() => setStep(1), 800))
    timers.push(setTimeout(() => setStep(2), 2500))
    timers.push(setTimeout(() => setStep(3), 4000))
    timers.push(setTimeout(() => setCycleCount((p) => p + 1), 7000))
    return () => timers.forEach(t => clearTimeout(t))
  }, [isActive, cycleCount])

  return (
    <div className="bg-slate-50 rounded-lg p-4 h-36">
      <div className="space-y-2.5">
        <div className={`flex items-center gap-2 text-xs transition-all duration-500 ${step >= 1 ? "opacity-100" : "opacity-0"}`}>
          <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
          <span className="text-slate-500">Verificando disponibilidad…</span>
        </div>
        <div className={`flex items-center gap-2 text-xs transition-all duration-500 ${step >= 2 ? "opacity-100" : "opacity-0"}`}>
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center"><svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg></div>
          <span className="text-slate-700">He encontrado un hueco disponible.</span>
        </div>
        <div className={`bg-green-100 border border-green-200 rounded-lg p-2.5 transition-all duration-500 ${step >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="text-xs text-green-700 font-medium">✔ Cita confirmada para el día 15 a las 10:00</div>
        </div>
      </div>
    </div>
  )
}

const AnimatedEmailDemo = ({ isActive }: { isActive: boolean }) => {
  const [step, setStep] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)

  useEffect(() => {
    if (!isActive) return
    setStep(0)
    const timers: NodeJS.Timeout[] = []
    timers.push(setTimeout(() => setStep(1), 600))
    timers.push(setTimeout(() => setStep(2), 2000))
    timers.push(setTimeout(() => setStep(3), 3500))
    timers.push(setTimeout(() => setCycleCount((p) => p + 1), 7000))
    return () => timers.forEach(t => clearTimeout(t))
  }, [isActive, cycleCount])

  return (
    <div className="bg-slate-50 rounded-lg p-4 h-36">
      <div className="space-y-2">
        <div className={`flex items-center gap-2 text-xs transition-all duration-500 ${step >= 1 ? "opacity-100" : "opacity-0"}`}>
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
          <span className="text-slate-600">Nueva solicitud recibida</span>
        </div>
        <div className={`flex items-center gap-2 text-xs transition-all duration-500 ${step >= 2 ? "opacity-100" : "opacity-0"}`}>
          <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
          <span className="text-slate-500">Analizando contenido y clasificando...</span>
        </div>
        <div className={`space-y-1 transition-all duration-500 ${step >= 3 ? "opacity-100" : "opacity-0"}`}>
          {["✔ Información registrada", "✔ Prioridad asignada", "✔ Caso derivado al equipo"].map((line, i) => (
            <div key={i} className="text-xs text-green-700 font-medium bg-green-50 px-2.5 py-1 rounded">{line}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

const AnimatedLeadsDemo = ({ isActive }: { isActive: boolean }) => {
  const [step, setStep] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)

  useEffect(() => {
    if (!isActive) return
    setStep(0)
    const timers: NodeJS.Timeout[] = []
    timers.push(setTimeout(() => setStep(1), 600))
    timers.push(setTimeout(() => setStep(2), 2200))
    timers.push(setTimeout(() => setStep(3), 3800))
    timers.push(setTimeout(() => setCycleCount((p) => p + 1), 7000))
    return () => timers.forEach(t => clearTimeout(t))
  }, [isActive, cycleCount])

  return (
    <div className="bg-slate-50 rounded-lg p-4 h-36">
      <div className="space-y-2">
        <div className={`flex items-center gap-2 text-xs transition-all duration-500 ${step >= 1 ? "opacity-100" : "opacity-0"}`}>
          <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
          <span className="text-slate-500">Recopilando información del cliente…</span>
        </div>
        <div className={`flex items-center gap-2 text-xs transition-all duration-500 ${step >= 2 ? "opacity-100" : "opacity-0"}`}>
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center"><svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg></div>
          <span className="text-slate-700">Perfil validado y clasificado</span>
        </div>
        <div className={`space-y-1 transition-all duration-500 ${step >= 3 ? "opacity-100" : "opacity-0"}`}>
          {["✔ Lead cualificado", "✔ Datos enviados al CRM", "✔ Asignado a equipo comercial"].map((line, i) => (
            <div key={i} className="text-xs text-green-700 font-medium bg-green-50 px-2.5 py-1 rounded">{line}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

const AnimatedIntegrationsDemo = ({ isActive }: { isActive: boolean }) => {
  const [step, setStep] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)

  useEffect(() => {
    if (!isActive) return
    setStep(0)
    const timers: NodeJS.Timeout[] = []
    timers.push(setTimeout(() => setStep(1), 600))
    timers.push(setTimeout(() => setStep(2), 2000))
    timers.push(setTimeout(() => setStep(3), 3500))
    timers.push(setTimeout(() => setCycleCount((p) => p + 1), 7000))
    return () => timers.forEach(t => clearTimeout(t))
  }, [isActive, cycleCount])

  return (
    <div className="bg-slate-50 rounded-lg p-4 h-36">
      <div className="space-y-2">
        <div className={`flex items-center gap-2 text-xs transition-all duration-500 ${step >= 1 ? "opacity-100" : "opacity-0"}`}>
          <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
          <span className="text-slate-500">Conectando sistemas…</span>
        </div>
        <div className={`flex items-center gap-2 text-xs transition-all duration-500 ${step >= 2 ? "opacity-100" : "opacity-0"}`}>
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center"><svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg></div>
          <span className="text-slate-700">Sincronizando información entre plataformas</span>
        </div>
        <div className={`space-y-1 transition-all duration-500 ${step >= 3 ? "opacity-100" : "opacity-0"}`}>
          {["✔ CRM actualizado", "✔ Calendario sincronizado", "✔ Canales conectados"].map((line, i) => (
            <div key={i} className="text-xs text-green-700 font-medium bg-green-50 px-2.5 py-1 rounded">{line}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// FEATURES CONFIG — micro-labels for narrative
// ============================================

const featuresConfig = [
  { key: "chat", demo: AnimatedChatDemo, size: "large", microLabelKey: "chat" },
  { key: "phone", demo: AnimatedPhoneDemo, size: "medium", microLabelKey: "phone" },
  { key: "calendar", demo: AnimatedCalendarDemo, size: "medium", microLabelKey: "calendar" },
  { key: "email", demo: AnimatedEmailDemo, size: "large", microLabelKey: "email" },
  { key: "leads", demo: AnimatedLeadsDemo, size: "medium", microLabelKey: "leads" },
  { key: "integrations", demo: AnimatedIntegrationsDemo, size: "medium", microLabelKey: "integrations" },
]

// ============================================
// MAIN COMPONENT
// ============================================

export function AIWorking247Block() {
  const t = useTranslations("ai_working_247")
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeDemo, setActiveDemo] = useState<number | null>(null)

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
      {/* Transition overlay removed — aurora flows through */}
      
      <div className="bg-transparent dark:bg-transparent pt-24 sm:pt-32 pb-24 sm:pb-32 px-6 sm:px-8 relative overflow-hidden">
        {/* Refined dot pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 0.5px, transparent 0)`, backgroundSize: "32px 32px" }} />
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Header */}
          <div className={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/[0.1] mb-8">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#0078AA] to-[#7C3AED] animate-pulse" />
              <span className="text-xs font-semibold tracking-widest text-slate-600 dark:text-white/60 uppercase">
                {t("badge")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-foreground text-balance mb-6 leading-[1.1] tracking-tight">
              {t("title_1")}{" "}
              <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
                {t("title_2")}
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-500 dark:text-foreground/50 max-w-2xl mx-auto leading-relaxed">
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
                onMouseEnter={() => setActiveDemo(index)}
                onMouseLeave={() => setActiveDemo(null)}
              >
                <div className="relative bg-white dark:bg-white/[0.04] rounded-2xl p-6 sm:p-7 h-full shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-400 hover:-translate-y-1 border border-slate-200/60 dark:border-white/[0.08] hover:border-[#0078AA]/20 dark:hover:border-[#00D4FF]/20 overflow-hidden">
                  {/* Micro-label */}
                  <div className="relative mb-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#0078AA]/[0.06] dark:bg-[#00D4FF]/[0.08] text-[10px] font-bold uppercase tracking-[0.1em] text-[#0078AA] dark:text-[#00D4FF]">
                      {t(`features.${feature.microLabelKey}.micro_label`)}
                    </span>
                  </div>
                  
                  {/* Demo area */}
                  <div className="relative mb-5 rounded-xl overflow-hidden ring-1 ring-slate-200/40 dark:ring-white/[0.06]">
                    <feature.demo isActive={activeDemo === index || isVisible} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="relative text-base sm:text-lg font-bold text-slate-900 dark:text-foreground mb-2 leading-snug tracking-tight">
                    {t(`features.${feature.key}.title`)}
                  </h3>
                  
                  {/* Description */}
                  <p className="relative text-slate-500 dark:text-foreground/50 text-sm leading-relaxed">
                    {t(`features.${feature.key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom transition */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none dark:hidden"
        style={{
          background: "linear-gradient(to top, transparent 0%, rgb(248,250,252) 100%)",
        }}
      />
    </section>
  )
}
