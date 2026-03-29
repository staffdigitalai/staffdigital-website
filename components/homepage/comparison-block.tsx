"use client"

import { X, Check } from "lucide-react"

const rows = [
  { feature: "¿Qué vendes?", competitor: "Una herramienta para que el cliente configure", us: "Solución completa, configurada y gestionada" },
  { feature: "¿Necesita equipo técnico?", competitor: "Sí, el cliente monta todo", us: "No, nosotros hacemos todo" },
  { feature: "Agentes IA", competitor: "Genéricos, sin personalización", us: "Especializados y entrenados para tu negocio" },
  { feature: "Datos", competitor: "En la cloud del proveedor", us: "Infraestructura propia, datos en la UE" },
  { feature: "Precio", competitor: "Por contacto / por minuto", us: "Paquete mensual predecible" },
  { feature: "Soporte", competitor: "Chat / email / documentación", us: "Acompañamiento personalizado con humanos" },
  { feature: "Alcance", competitor: "Solo atención al cliente", us: "Atención + LeadGen + CRM Automation" },
]

export function ComparisonBlock() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Por qué elegir StaffDigital AI
          </h2>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block rounded-2xl border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 bg-white/5">
            <div className="p-4 text-sm font-bold text-white/70 border-r border-white/10" />
            <div className="p-4 text-sm font-bold text-red-400 text-center border-r border-white/10">Herramientas SaaS</div>
            <div className="p-4 text-sm font-bold text-emerald-400 text-center">StaffDigital AI</div>
          </div>
          {/* Rows */}
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
