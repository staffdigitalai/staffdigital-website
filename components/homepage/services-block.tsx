"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const services = [
  { title: "Agente Telefónico IA", description: "Atiende llamadas con voz humana. Sin menús, sin esperas.", href: "/soluciones/atencion-telefonica-ia", image: "/images/agents/phone-agent.jpg", alt: "Agente IA telefónico con voz humana para atención de llamadas 24/7" },
  { title: "Agente WhatsApp IA", description: "Voz y texto por WhatsApp. Conversaciones naturales.", href: "/soluciones/whatsapp-ia-empresas", image: "/images/agents/whatsapp-agent.jpg", alt: "Agente IA para WhatsApp Business con conversaciones inteligentes" },
  { title: "Agente Chat Web IA", description: "Atención en tu web. Cualifica leads 24/7.", href: "/soluciones/agente-chat-web-ia", image: "/images/agents/web-chat-agent.jpg", alt: "Agente IA de chat web para cualificación de leads automatizada" },
  { title: "Agente de Ventas IA", description: "Cualifica, recomienda y cierra ventas.", href: "/soluciones/agente-ventas-ia", image: "/images/agents/sales-agent.jpg", alt: "Agente IA de ventas para cualificación y cierre automatizado" },
  { title: "Agente de Soporte IA", description: "Posventa, tickets y resolución de problemas.", href: "/soluciones/agente-soporte-ia", image: "/images/agents/support-agent.jpg", alt: "Agente IA de soporte técnico para resolución de incidencias" },
  { title: "Agente de Citas IA", description: "Agenda consultas, visitas y reservas.", href: "/soluciones/agente-agendamientos-ia", image: "/images/agents/booking-agent.jpg", alt: "Agente IA para gestión automática de citas y reservas" },
  { title: "LeadGen IA", description: "Prospección automática de empresas. Listos para contactar.", href: "/soluciones/lead-generation-ia", image: "/images/agents/leadgen-agent.jpg", alt: "Sistema de generación de leads con prospección automática por IA" },
  { title: "CRM Automation IA", description: "Sincroniza agentes con tu CRM. Pipelines al día.", href: "/soluciones/crm-automation-ia", image: "/images/agents/crm-agent.jpg", alt: "Automatización de CRM con agentes IA para pipelines actualizados" },
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
              className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all hover:scale-[1.02] overflow-hidden"
            >
              <div className="relative w-full h-32">
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-white group-hover:text-white/90">{s.title}</h3>
                <p className="text-sm text-white/50">{s.description}</p>
                <span className="text-sm text-white/40 group-hover:text-white/70 flex items-center gap-1 transition-colors">
                  Saber más <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
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
