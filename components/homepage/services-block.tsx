"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

const servicesMeta = [
  { href: "/soluciones/atencion-telefonica-ia", image: "/images/agents/phone-agent.jpg", alt: "Central de atendimiento IA para call center con voz realista" },
  { href: "/soluciones/whatsapp-ia-empresas", image: "/images/agents/whatsapp-agent.jpg", alt: "Agente virtual WhatsApp con IA para atendimiento automático" },
  { href: "/soluciones/agente-chat-web-ia", image: "/images/agents/web-chat-agent.jpg", alt: "Chat web inteligente con IA para cualificación de leads" },
  { href: "/soluciones/agente-ventas-ia", image: "/images/agents/sales-agent.jpg", alt: "IA para ventas automáticas: cualificación y cierre de leads" },
  { href: "/soluciones/agente-soporte-ia", image: "/images/agents/support-agent.jpg", alt: "Soporte al cliente automatizado con agentes IA" },
  { href: "/soluciones/agente-agendamientos-ia", image: "/images/agents/booking-agent.jpg", alt: "Agendamiento automático de citas con IA por WhatsApp y teléfono" },
  { href: "/soluciones/lead-generation-ia", image: "/images/agents/leadgen-agent.jpg", alt: "Prospección automática de empresas y generación de leads con IA" },
  { href: "/soluciones/crm-automation-ia", image: "/images/agents/crm-agent.jpg", alt: "Automatización de CRM con agentes IA para gestión de pipeline" },
]

export function ServicesBlock() {
  const t = useTranslations("services")

  const translatedItems = t.raw("items") as { title: string; description: string }[]

  const services = servicesMeta.map((meta, i) => ({
    ...meta,
    title: translatedItems[i].title,
    description: translatedItems[i].description,
  }))

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t("subtitle")}
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
                  {t("learn_more")} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/soluciones" className="text-sm text-white/50 hover:text-white/80 underline underline-offset-4 transition-colors">
            {t("view_all")} →
          </Link>
        </div>
      </div>
    </section>
  )
}
