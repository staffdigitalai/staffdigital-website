"use client"

import { useEffect, useRef, useState } from "react"
import { MessageSquare, Search, FileText, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consulta",
    description: "Analizamos tu negocio, canales actuales y objetivos. Entendemos tus necesidades especificas.",
  },
  {
    number: "02",
    icon: Search,
    title: "Analisis",
    description: "Evaluamos oportunidades de mejora y disenamos la estrategia de IA personalizada para ti.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Presupuesto",
    description: "Te presentamos una propuesta clara con plazos, costes y retorno de inversion esperado.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Implementacion",
    description: "Desplegamos, integramos y optimizamos. Gestionamos todo para que tu solo veas resultados.",
  },
]

export function ProblemSolutionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Como Funciona Section */}
        <div
          className={`text-center mb-10 sm:mb-14 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></span>
            Proceso Simple y Efectivo
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance mb-4 sm:mb-6">
            Como <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Funciona</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
            De la consulta a los resultados en cuatro pasos claros. Sin complicaciones.
          </p>
        </div>

        {/* Steps Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="group relative"
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                {/* Connector Line (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-white/20 to-transparent z-0"></div>
                )}
                
                <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 h-full hover:bg-white/10 transition-all duration-500 hover:border-orange-400/30 hover:scale-[1.02] z-10">
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} className="text-orange-400" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
