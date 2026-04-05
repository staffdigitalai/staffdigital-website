"use client"

import Image from "next/image"
import { X, Check } from "lucide-react"

const rows = [
  { feature: "¿Qué es?", competitor: "Herramienta que el cliente configura solo", us: "Plataforma gestionada con implementación incluida" },
  { feature: "Canales", competitor: "Normalmente solo chat o solo voz", us: "WhatsApp + teléfono + chat web + email unificados" },
  { feature: "CRM", competitor: "Integración básica o inexistente", us: "Twenty CRM integrado de fábrica" },
  { feature: "Agendamiento", competitor: "No incluido, hay que contratar aparte", us: "Cal.com integrado: reservas automáticas" },
  { feature: "Orquestación", competitor: "Flujos simples sin autonomía", us: "OpenClaw: agentes autónomos que deciden y actúan" },
  { feature: "Voz", competitor: "Robótica o sin canal de voz", us: "Voz humana HD, indistinguible de una persona" },
  { feature: "Soporte", competitor: "Documentación + chat", us: "Equipo dedicado de implementación y gestión" },
]

export function ComparisonBlock() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Plataforma gestionada vs herramientas DIY
          </h2>
          <div className="max-w-xl mx-auto">
            <Image
              src="/images/homepage/comparison.jpg"
              alt="Comparación entre herramientas SaaS DIY y la plataforma gestionada StaffDigital AI"
              width={1200}
              height={686}
              loading="lazy"
              className="rounded-2xl border border-white/10 opacity-70"
            />
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block rounded-2xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-3 bg-white/5">
            <div className="p-4 text-sm font-bold text-white/70 border-r border-white/10" />
            <div className="p-4 text-sm font-bold text-red-400 text-center border-r border-white/10">Bland, Vapi, Synthflow...</div>
            <div className="p-4 text-sm font-bold text-emerald-400 text-center">StaffDigital AI</div>
          </div>
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-3 border-t border-white/10">
              <div className="p-4 text-sm font-medium text-white/80 border-r border-white/10">{row.feature}</div>
              <div className="p-4 text-sm text-white/50 border-r border-white/10 flex items-start gap-2">
                <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                {row.competitor}
              </div>
              <div className="p-4 text-sm text-white/80 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                {row.us}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
              <div className="font-bold text-sm text-white/80">{row.feature}</div>
              <div className="flex items-start gap-2 text-sm text-white/40">
                <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                {row.competitor}
              </div>
              <div className="flex items-start gap-2 text-sm text-white/80">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                {row.us}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
