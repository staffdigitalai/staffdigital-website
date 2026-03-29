"use client"

import { Check } from "lucide-react"

const leftItems = [
  "Configuramos los agentes IA",
  "Los entrenamos con tu negocio",
  "Unificamos WhatsApp, teléfono y chat",
  "Capturamos leads para ti (LeadGen IA)",
]

const rightItems = [
  "Integramos con tu CRM",
  "Gestionamos la infraestructura",
  "Garantizamos seguridad y privacidad",
  "Automatizamos tu CRM",
]

export function DoneForYouBlock() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Nosotros hacemos todo.{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Tú solo creces.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {[...leftItems, ...rightItems].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-white/90 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
