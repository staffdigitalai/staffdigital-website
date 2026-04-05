"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const services = [
  { title: "IA para Call Center", description: "Atendimiento automático de llamadas con voz realista. Sin colas, sin menús IVR.", href: "/soluciones/atencion-telefonica-ia", image: "/images/agents/phone-agent.jpg", alt: "Central de atendimiento IA para call center con voz realista" },
  { title: "Atendimiento WhatsApp IA", description: "Agente virtual en WhatsApp Business. Responde, cualifica y agenda automáticamente.", href: "/soluciones/whatsapp-ia-empresas", image: "/images/agents/whatsapp-agent.jpg", alt: "Agente virtual WhatsApp con IA para atendimiento automático" },
  { title: "Chat Web Inteligente", description: "Atención instantánea en tu web. Cualifica visitantes y captura leads 24/7.", href: "/soluciones/agente-chat-web-ia", image: "/images/agents/web-chat-agent.jpg", alt: "Chat web inteligente con IA para cualificación de leads" },
  { title: "Vendas Automáticas con IA", description: "Cualifica leads, recomienda productos y agenda reuniones de cierre.", href: "/soluciones/agente-ventas-ia", image: "/images/agents/sales-agent.jpg", alt: "IA para ventas automáticas: cualificación y cierre de leads" },
  { title: "Soporte al Cliente con IA", description: "Resolución de incidencias, apertura de tickets, escalado inteligente.", href: "/soluciones/agente-soporte-ia", image: "/images/agents/support-agent.jpg", alt: "Soporte al cliente automatizado con agentes IA" },
  { title: "Agendamiento Automático", description: "Reserva, confirma y reprograma citas por WhatsApp, teléfono o web.", href: "/soluciones/agente-agendamientos-ia", image: "/images/agents/booking-agent.jpg", alt: "Agendamiento automático de citas con IA por WhatsApp y teléfono" },
  { title: "Prospección Automática", description: "Encuentra empresas de tu sector, enriquece datos y genera leads cualificados.", href: "/soluciones/lead-generation-ia", image: "/images/agents/leadgen-agent.jpg", alt: "Prospección automática de empresas y generación de leads con IA" },
  { title: "Automatización de CRM", description: "Sincroniza conversaciones, leads y pipeline. Sin entrada manual de datos.", href: "/soluciones/crm-automation-ia", image: "/images/agents/crm-agent.jpg", alt: "Automatización de CRM con agentes IA para gestión de pipeline" },
]

export function ServicesBlock() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Soluciones IA por caso de uso
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Cada agente resuelve un problema concreto. Todos conectados en una sola plataforma.
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
                  Ver solución <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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
