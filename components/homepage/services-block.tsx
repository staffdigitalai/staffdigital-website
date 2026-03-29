"use client"

import { Phone, MessageSquare, Globe, ShoppingCart, Headphones, Calendar, Target, Link2, ArrowRight } from "lucide-react"
import Link from "next/link"

const services = [
  { icon: Phone, title: "Agente Telefónico IA", description: "Atiende llamadas con voz humana. Sin menús, sin esperas.", href: "/soluciones/atencion-telefonica-ia", color: "text-blue-400" },
  { icon: MessageSquare, title: "Agente WhatsApp IA", description: "Voz y texto por WhatsApp. Conversaciones naturales.", href: "/soluciones/whatsapp-ia-empresas", color: "text-emerald-400" },
  { icon: Globe, title: "Agente Chat Web IA", description: "Atención en tu web. Cualifica leads 24/7.", href: "/soluciones/agente-chat-web-ia", color: "text-purple-400" },
  { icon: ShoppingCart, title: "Agente de Ventas IA", description: "Cualifica, recomienda y cierra ventas.", href: "/soluciones/agente-ventas-ia", color: "text-amber-400" },
  { icon: Headphones, title: "Agente de Soporte IA", description: "Posventa, tickets y resolución de problemas.", href: "/soluciones/agente-soporte-ia", color: "text-red-400" },
  { icon: Calendar, title: "Agente de Citas IA", description: "Agenda consultas, visitas y reservas.", href: "/soluciones/agente-agendamientos-ia", color: "text-cyan-400" },
  { icon: Target, title: "LeadGen IA", description: "Prospección automática de empresas. Listos para contactar.", href: "/soluciones/lead-generation-ia", color: "text-orange-400" },
  { icon: Link2, title: "CRM Automation IA", description: "Sincroniza agentes con tu CRM. Pipelines al día.", href: "/soluciones/crm-automation-ia", color: "text-pink-400" },
]

export function ServicesBlock() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Conoce nuestros agentes IA
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Especializados por función. Entrenados para tu negocio. Listos 24/7.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all hover:scale-[1.02] space-y-3"
            >
              <s.icon className={`w-8 h-8 ${s.color}`} />
              <h3 className="font-bold text-white group-hover:text-white/90">{s.title}</h3>
              <p className="text-sm text-white/50">{s.description}</p>
              <span className="text-sm text-white/40 group-hover:text-white/70 flex items-center gap-1 transition-colors">
                Saber más <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/soluciones" className="text-sm text-white/50 hover:text-white/80 underline underline-offset-4 transition-colors">
            Ver todas las soluciones →
          </Link>
        </div>
      </div>
    </section>
  )
}
