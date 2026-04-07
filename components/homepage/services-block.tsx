"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { serviceMockups } from "./service-mockups"

const servicesMeta = [
  { href: "/soluciones/atencion-telefonica-ia" },
  { href: "/soluciones/whatsapp-ia-empresas" },
  { href: "/soluciones/agente-chat-web-ia" },
  { href: "/soluciones/agente-ventas-ia" },
  { href: "/soluciones/agente-soporte-ia" },
  { href: "/soluciones/agente-agendamientos-ia" },
  { href: "/soluciones/lead-generation-ia" },
  { href: "/soluciones/crm-automation-ia" },
]

export function ServicesBlock() {
  const t = useTranslations("services")

  const translatedItems = t.raw("items") as { title: string; description: string }[]

  const services = servicesMeta.map((meta, i) => ({
    ...meta,
    title: translatedItems[i].title,
    description: translatedItems[i].description,
    Mockup: serviceMockups[i],
  }))

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.slice(0, 4).map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="card-elevated group rounded-2xl hover:border-foreground/25 transition-all hover:scale-[1.02] overflow-hidden hover:shadow-lg hover:shadow-[var(--neon-blue)]/10"
            >
              <div className="relative w-full h-32 overflow-hidden">
                <s.Mockup />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-foreground group-hover:text-foreground/90">{s.title}</h3>
                <p className="text-sm text-foreground/50">{s.description}</p>
                <span className="text-sm text-foreground/40 group-hover:text-foreground/70 flex items-center gap-1 transition-colors">
                  {t("learn_more")} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            href="/soluciones" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/20 hover:border-foreground/40 text-foreground/70 hover:text-foreground font-medium transition-all hover:scale-105"
          >
            {t("view_all")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
