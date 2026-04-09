"use client"

import { Link2, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const syncItems = [
  "Conversaciones → CRM",
  "Leads cualificados → Pipeline",
  "Oportunidades creadas automáticamente",
  "Historial completo del cliente",
  "Follow-ups y notificaciones automáticas",
]

const crms = [
  { name: "Twenty", note: "recomendado" },
  { name: "HubSpot", note: null },
  { name: "Salesforce", note: null },
  { name: "Pipedrive", note: null },
  { name: "Zoho", note: null },
]

export function CRMBlock() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-4">
            <Link2 className="w-4 h-4 mr-2" />
            Integración nativa
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Automatización de CRM con IA
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Tus agentes IA y tu CRM trabajando juntos. Sin entrada manual de datos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* What we sync */}
          <div className="p-6 rounded-2xl border border-foreground/10 bg-foreground/5 space-y-4">
            <h3 className="font-bold text-lg text-foreground">Qué sincronizamos</h3>
            <ul className="space-y-3">
              {syncItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-foreground/70">
                  <Check className="w-4 h-4 text-[var(--lime-green)] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Compatible CRMs */}
          <div className="p-6 rounded-2xl border border-foreground/10 bg-foreground/5 space-y-4">
            <h3 className="font-bold text-lg text-foreground">CRMs compatibles</h3>
            <div className="space-y-3">
              {crms.map((crm) => (
                <div key={crm.name} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-[var(--lime-green)] shrink-0" />
                  <span className="text-foreground/70">{crm.name}</span>
                  {crm.note && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {crm.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="rounded-full px-6 border-pink-500/30 text-pink-400 hover:bg-pink-500/10">
            <Link href="/soluciones/crm-automation-ia">
              Descubrir Automatización CRM <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
