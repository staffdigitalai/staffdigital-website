"use client"

import Image from "next/image"
import { Target, ArrowRight, MapPin, Users, Mail, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
  { icon: MapPin, step: "1", title: "Prospección inteligente", description: "Identificamos empresas de tu sector en tu zona objetivo" },
  { icon: Users, step: "2", title: "Enriquecimiento de datos", description: "Nombre, teléfono, email, web, responsable" },
  { icon: BarChart3, step: "3", title: "Cualificación por IA", description: "Evaluaciones, relevancia, potencial" },
  { icon: Mail, step: "4", title: "Entrega en CRM", description: "Lista lista para contactar o integrar" },
]

export function LeadGenBlock() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
            <Target className="w-4 h-4 mr-2" />
            Servicio exclusivo
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            LeadGen IA — Captura clientes automáticamente
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            ROI visible en días. Alimenta tu pipeline de ventas sin esfuerzo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {steps.map((s) => (
            <div key={s.step} className="p-5 rounded-2xl border border-orange-500/10 bg-orange-500/5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-sm font-bold">{s.step}</span>
                <s.icon className="w-5 h-5 text-orange-400/60" />
              </div>
              <h3 className="font-bold text-sm text-white">{s.title}</h3>
              <p className="text-xs text-white/50">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <Image
            src="/images/homepage/leadgen.jpg"
            alt="Embudo de generación de leads con IA: prospección, enriquecimiento, cualificación y entrega al CRM"
            width={1200}
            height={686}
            loading="lazy"
            className="rounded-2xl border border-orange-500/10 opacity-80"
          />
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="rounded-full px-6 border-orange-500/30 text-orange-400 hover:bg-orange-500/10">
            <Link href="/soluciones/lead-generation-ia">
              Descubrir LeadGen IA <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
