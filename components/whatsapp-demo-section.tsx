"use client"

import { useEffect, useRef, useState } from "react"
import { MessageSquare, Check, CheckCheck } from "lucide-react"

const whatsappMessages = [
  { text: "Hola! Me interesa el BMW Serie 3 que vi en vuestra web", isUser: true, time: "10:30" },
  { text: "Hola! Gracias por tu interes. El BMW Serie 3 2024 esta disponible. Quieres agendar una prueba de conduccion?", isBot: true, time: "10:30" },
  { text: "Si, perfecto! Teneis disponibilidad este sabado?", isUser: true, time: "10:31" },
  { text: "Este sabado tenemos hueco a las 10:00, 12:00 y 16:00. Cual te viene mejor?", isBot: true, time: "10:31" },
  { text: "A las 12:00 por favor", isUser: true, time: "10:32" },
  { text: "Reservado! Sabado a las 12:00. Te enviare un recordatorio el viernes. Necesitas algo mas?", isBot: true, time: "10:32" },
]

export function WhatsAppDemoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setVisibleMessages((prev) => {
        if (prev >= whatsappMessages.length) {
          // Reset after a pause
          setTimeout(() => setVisibleMessages(0), 2000)
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 1200)

    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-400 text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4 mr-2" />
            WhatsApp Business AI
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance mb-4">
            Tu IA Responde por{" "}
            <span className="text-green-400">WhatsApp</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-light">
            Atencion inmediata 24/7 a tus clientes potenciales. Sin esperas, sin leads perdidos.
          </p>
        </div>

        <div
          className={`max-w-md mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Phone mockup */}
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            {/* WhatsApp header */}
            <div className="bg-green-600 px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-xs font-bold">SD</span>
              </div>
              <div>
                <div className="text-white text-sm font-medium">StaffDigital AI</div>
                <div className="text-green-200 text-xs">en linea</div>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                <span className="text-green-200 text-xs">24/7</span>
              </div>
            </div>

            {/* Chat area */}
            <div className="p-4 min-h-[360px] bg-whatsapp-bg-dark-chat space-y-3">
              {whatsappMessages.slice(0, visibleMessages).map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.isUser ? "justify-end" : "justify-start"} animate-fade-in-up`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                      msg.isUser
                        ? "bg-green-700 text-white rounded-br-none"
                        : "bg-slate-800 text-white/90 rounded-bl-none"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div className={`flex items-center gap-1 mt-1 ${msg.isUser ? "justify-end" : "justify-start"}`}>
                      <span className="text-[10px] text-white/40">{msg.time}</span>
                      {msg.isUser && <CheckCheck className="w-3 h-3 text-blue-400" />}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {visibleMessages > 0 && visibleMessages < whatsappMessages.length && !whatsappMessages[visibleMessages - 1]?.isUser && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 px-4 py-2 rounded-lg rounded-bl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats below phone */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { value: "<1s", label: "Respuesta" },
              { value: "24/7", label: "Disponible" },
              { value: "98%", label: "Satisfaccion" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`text-center transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${800 + i * 200}ms` }}
              >
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
