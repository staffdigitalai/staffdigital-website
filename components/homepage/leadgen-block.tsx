"use client"

import { Target, ArrowRight, MapPin, Users, Mail, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ProcessStepIcon } from "@/components/ui/icon-system"

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
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            ROI visible en días. Alimenta tu pipeline de ventas sin esfuerzo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {steps.map((s) => (
            <div key={s.step} className="group card-premium p-6 rounded-2xl space-y-4">
              <ProcessStepIcon icon={s.icon} stepNumber={s.step} />
              <h3 className="font-bold text-sm text-foreground">{s.title}</h3>
              <p className="text-xs text-foreground/55 dark:text-foreground/45 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
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
