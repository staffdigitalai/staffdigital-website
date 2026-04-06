"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"

// ============================================
// ANIMATED DEMO COMPONENTS
// ============================================

const AnimatedChatDemo = ({ isActive }: { isActive: boolean }) => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", isBot: true, visible: false },
    { text: "I'd like to book an appointment", isBot: false, visible: false },
    { text: "Perfect! I can help with that. What service are you interested in?", isBot: true, visible: false },
  ])
  const [typingDots, setTypingDots] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)

  useEffect(() => {
    if (!isActive) return
    const scenarios = [
      [
        { text: "Hi! How can I help you today?", isBot: true },
        { text: "I'd like to book an appointment", isBot: false },
        { text: "Perfect! I can help with that. What service are you interested in?", isBot: true },
      ],
      [
        { text: "Hello! I'm available 24/7 to assist you.", isBot: true },
        { text: "Do you have weekend availability?", isBot: false },
        { text: "I can check our weekend slots for you.", isBot: true },
      ],
      [
        { text: "Good evening! How may I assist you?", isBot: true },
        { text: "I need help with pricing", isBot: false },
        { text: "I'd be happy to provide pricing information right away!", isBot: true },
      ],
    ]
    const currentScenario = scenarios[cycleCount % scenarios.length]
    setMessages(currentScenario.map((msg) => ({ ...msg, visible: false })))
    const timer = setTimeout(() => {
      setMessages((prev) => prev.map((msg, i) => ({ ...msg, visible: i === 0 })))
      setTimeout(() => {
        setMessages((prev) => prev.map((msg, i) => ({ ...msg, visible: i <= 1 })))
        setTimeout(() => {
          const typingInterval = setInterval(() => setTypingDots((prev) => (prev + 1) % 4), 500)
          setTimeout(() => {
            clearInterval(typingInterval)
            setTypingDots(0)
            setMessages((prev) => prev.map((msg) => ({ ...msg, visible: true })))
            setTimeout(() => setCycleCount((prev) => prev + 1), 3000)
          }, 2000)
        }, 1000)
      }, 1500)
    }, 500)
    return () => clearTimeout(timer)
  }, [isActive, cycleCount])

  return (
    <div className="bg-slate-50 rounded-lg p-4 h-32 overflow-hidden relative">
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-slate-500 font-medium">24/7</span>
      </div>
      <div className="space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.isBot ? "justify-start" : "justify-end"} transition-all duration-500 ${msg.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <div className={`max-w-[80%] px-3 py-1.5 rounded-full text-xs ${msg.isBot ? "bg-slate-200 text-slate-700" : "bg-blue-500 text-white"}`}>{msg.text}</div>
          </div>
        ))}
        {typingDots > 0 && (
          <div className="flex justify-start">
            <div className="bg-slate-200 px-3 py-1.5 rounded-full">
              <div className="flex space-x-1">
                {[1, 2, 3].map((dot) => (
                  <div key={dot} className={`w-1 h-1 bg-slate-500 rounded-full transition-opacity duration-300 ${typingDots >= dot ? "opacity-100" : "opacity-30"}`} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const AnimatedPhoneDemo = ({ isActive }: { isActive: boolean }) => {
  const [callState, setCallState] = useState<"idle" | "ringing" | "answered">("idle")
  const [callCount, setCallCount] = useState(0)
  
  useEffect(() => {
    if (!isActive) return
    let isMounted = true
    const cycleCall = () => {
      if (!isMounted) return
      setCallState("ringing")
      setTimeout(() => { 
        if (!isMounted) return
        setCallState("answered")
        setTimeout(() => { 
          if (!isMounted) return
          setCallState("idle")
          setCallCount((prev) => prev + 1)
          setTimeout(() => {
            if (isMounted) cycleCall()
          }, 2000)
        }, 2000)
      }, 2000)
    }
    const timer = setTimeout(cycleCall, 800)
    return () => { 
      isMounted = false
      clearTimeout(timer) 
    }
  }, [isActive])
  
  return (
    <div className="bg-slate-50 rounded-lg p-4 h-32 flex items-center justify-center relative">
      <div className="absolute top-2 right-2 text-xs text-slate-500 font-medium">Calls: {callCount + 1}</div>
      <div className="relative">
        <div className={`w-16 h-16 rounded-full bg-green-500 flex items-center justify-center transition-all duration-500 ${callState === "ringing" ? "animate-pulse scale-110" : ""} ${callState === "answered" ? "bg-blue-500" : ""}`}>
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        </div>
        {callState === "ringing" && (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping" style={{ animationDelay: "75ms" }}></div>
          </>
        )}
        {callState === "answered" && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="bg-blue-100 px-2 py-1 rounded text-xs text-blue-700 whitespace-nowrap">Call answered</div>
          </div>
        )}
      </div>
    </div>
  )
}

const AnimatedCalendarDemo = ({ isActive }: { isActive: boolean }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [booked, setBooked] = useState(false)
  
  useEffect(() => {
    if (!isActive) return
    setSelectedDate(null)
    setBooked(false)
    const timer = setTimeout(() => { 
      setSelectedDate(15)
      setTimeout(() => setBooked(true), 1500)
    }, 1000)
    return () => clearTimeout(timer)
  }, [isActive])
  
  return (
    <div className="bg-slate-50 rounded-lg p-4 h-32">
      <div className="grid grid-cols-7 gap-1 text-xs">
        {Array.from({ length: 21 }, (_, i) => i + 1).map((day) => (
          <div key={day} className={`w-4 h-4 flex items-center justify-center rounded transition-all duration-300 ${day === selectedDate ? (booked ? "bg-green-500 text-white scale-110" : "bg-blue-500 text-white scale-110") : day % 7 === 0 || day % 6 === 0 ? "bg-slate-200 text-slate-400" : "bg-white text-slate-600 hover:bg-slate-100"}`}>{day}</div>
        ))}
      </div>
      {booked && <div className="mt-2 text-xs text-green-600 font-medium">✓ Appointment booked for the 15th</div>}
    </div>
  )
}

const AnimatedEmailDemo = ({ isActive }: { isActive: boolean }) => {
  const [emails, setEmails] = useState([
    { subject: "Service inquiry", status: "unread" },
    { subject: "Appointment request", status: "unread" },
    { subject: "Quote needed", status: "unread" },
  ])
  
  useEffect(() => {
    if (!isActive) return
    setEmails([
      { subject: "Service inquiry", status: "unread" },
      { subject: "Appointment request", status: "unread" },
      { subject: "Quote needed", status: "unread" },
    ])
    const timers: NodeJS.Timeout[] = []
    emails.forEach((_, index) => { 
      const timer = setTimeout(() => { 
        setEmails((prev) => prev.map((email, i) => (i === index ? { ...email, status: "replied" } : email)))
      }, 1000 + index * 800)
      timers.push(timer)
    })
    return () => timers.forEach(t => clearTimeout(t))
  }, [isActive])
  
  return (
    <div className="bg-slate-50 rounded-lg p-4 h-32 overflow-hidden">
      <div className="space-y-2">
        {emails.map((email, i) => (
          <div key={i} className={`flex items-center gap-2 p-2 rounded transition-all duration-500 ${email.status === "replied" ? "bg-green-100" : "bg-white"}`}>
            <div className={`w-2 h-2 rounded-full ${email.status === "replied" ? "bg-green-500" : "bg-blue-500"}`} />
            <span className="text-xs text-slate-700 flex-1">{email.subject}</span>
            {email.status === "replied" && (<svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>)}
          </div>
        ))}
      </div>
    </div>
  )
}

const AnimatedLeadsDemo = ({ isActive }: { isActive: boolean }) => {
  const [leads, setLeads] = useState([
    { name: "Sarah M.", score: 0, qualified: false },
    { name: "John D.", score: 0, qualified: false },
    { name: "Mike R.", score: 0, qualified: false },
  ])
  
  useEffect(() => {
    if (!isActive) return
    setLeads([
      { name: "Sarah M.", score: 0, qualified: false },
      { name: "John D.", score: 0, qualified: false },
      { name: "Mike R.", score: 0, qualified: false },
    ])
    const targetScores = [85, 92, 78]
    const timers: NodeJS.Timeout[] = []
    
    leads.forEach((_, index) => {
      const timer = setTimeout(() => {
        const targetScore = targetScores[index]
        let currentScore = 0
        const interval = setInterval(() => {
          currentScore += 5
          if (currentScore >= targetScore) {
            currentScore = targetScore
            clearInterval(interval)
          }
          setLeads((prev) => prev.map((lead, i) => {
            if (i === index) {
              return { ...lead, score: currentScore, qualified: currentScore >= 80 }
            }
            return lead
          }))
        }, 50)
      }, index * 600)
      timers.push(timer)
    })
    
    return () => timers.forEach(t => clearTimeout(t))
  }, [isActive])
  
  return (
    <div className="bg-slate-50 rounded-lg p-4 h-32 overflow-hidden">
      <div className="space-y-2">
        {leads.map((lead, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs text-slate-700 w-12">{lead.name}</span>
            <div className="flex-1 bg-slate-200 rounded-full h-2">
              <div className={`h-2 rounded-full transition-all duration-500 ${lead.qualified ? "bg-green-500" : "bg-blue-500"}`} style={{ width: `${lead.score}%` }} />
            </div>
            {lead.qualified && <span className="text-xs text-green-600">✓</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

const AnimatedIntegrationsDemo = ({ isActive }: { isActive: boolean }) => {
  const [connections, setConnections] = useState([
    { name: "CRM", connected: false },
    { name: "WhatsApp", connected: false },
    { name: "Calendar", connected: false },
    { name: "Email", connected: false },
  ])
  
  useEffect(() => {
    if (!isActive) return
    setConnections([
      { name: "CRM", connected: false },
      { name: "WhatsApp", connected: false },
      { name: "Calendar", connected: false },
      { name: "Email", connected: false },
    ])
    const timers: NodeJS.Timeout[] = []
    connections.forEach((_, index) => { 
      const timer = setTimeout(() => { 
        setConnections((prev) => prev.map((conn, i) => (i === index ? { ...conn, connected: true } : conn)))
      }, 500 + index * 400)
      timers.push(timer)
    })
    return () => timers.forEach(t => clearTimeout(t))
  }, [isActive])
  
  return (
    <div className="bg-slate-50 rounded-lg p-4 h-32">
      <div className="grid grid-cols-2 gap-2">
        {connections.map((conn, i) => (
          <div key={i} className={`flex items-center gap-2 p-2 rounded transition-all duration-500 ${conn.connected ? "bg-green-100" : "bg-white"}`}>
            <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${conn.connected ? "bg-green-500" : "bg-slate-300"}`} />
            <span className="text-xs text-slate-700">{conn.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-center">
        <div className="text-xs text-slate-500">{connections.filter((c) => c.connected).length}/4 connected</div>
      </div>
    </div>
  )
}

// ============================================
// FEATURES DATA
// ============================================

const featuresConfig = [
  { key: "chat", demo: AnimatedChatDemo, size: "large" },
  { key: "phone", demo: AnimatedPhoneDemo, size: "medium" },
  { key: "calendar", demo: AnimatedCalendarDemo, size: "medium" },
  { key: "email", demo: AnimatedEmailDemo, size: "large" },
  { key: "leads", demo: AnimatedLeadsDemo, size: "medium" },
  { key: "integrations", demo: AnimatedIntegrationsDemo, size: "medium" },
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
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => { 
      if (sectionRef.current) observer.unobserve(sectionRef.current) 
    }
  }, [])
  
  return (
    <section id="features" ref={sectionRef} className="relative z-10">
      <div className="bg-white rounded-t-[3rem] pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 relative overflow-hidden">
        {/* Dot pattern background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`, 
              backgroundSize: "24px 24px" 
            }}
          />
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-1 h-1 bg-slate-200 rounded-full animate-float" 
              style={{ 
                left: `${20 + i * 15}%`, 
                top: `${30 + (i % 3) * 20}%`, 
                animationDelay: `${i * 0.5}s`, 
                animationDuration: `${4 + i * 0.5}s` 
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Header */}
          <div className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium mb-6">
              {t("badge")}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-balance mb-4 sm:mb-6">
              {t("title_1")}{" "}
              <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">
                {t("title_2")}
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
          
          {/* Feature Cards Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            {featuresConfig.map((feature, index) => (
              <div 
                key={feature.key} 
                className={`group transition-all duration-1000 ${feature.size === "large" ? "md:col-span-2" : ""}`} 
                style={{ transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms" }} 
                onMouseEnter={() => setActiveDemo(index)} 
                onMouseLeave={() => setActiveDemo(null)}
              >
                <div className="bg-white rounded-2xl p-6 sm:p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200 hover:border-slate-300">
                  <div className="mb-6">
                    <feature.demo isActive={activeDemo === index || isVisible} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 group-hover:text-slate-700 transition-colors duration-300">
                    {t(`features.${feature.key}.title`)}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
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
