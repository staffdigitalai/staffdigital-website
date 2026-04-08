import { ArrowRight, Phone, MessageSquare, Globe, TrendingUp, Headphones, Calendar, Target, Layers, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { SolutionMockup } from "@/components/solution-mockups"

// Icon mapping for service slugs (used as fallback)
const iconMap: Record<string, LucideIcon> = {
  "atencion-telefonica-ia": Phone,
  "whatsapp-ia-empresas": MessageSquare,
  "agente-chat-web-ia": Globe,
  "agente-ventas-ia": TrendingUp,
  "agente-soporte-ia": Headphones,
  "agente-agendamientos-ia": Calendar,
  "lead-generation-ia": Target,
  "crm-automation-ia": Layers,
}

// Services meta
const servicesMeta = [
  { slug: "ia-call-center", href: "/soluciones/ia-call-center" },
  { slug: "whatsapp-ia-empresas", href: "/soluciones/whatsapp-ia-empresas" },
  { slug: "agente-chat-web-ia", href: "/soluciones/agente-chat-web-ia" },
  { slug: "agente-ventas-ia", href: "/soluciones/agente-ventas-ia" },
  { slug: "agente-soporte-ia", href: "/soluciones/agente-soporte-ia" },
  { slug: "agente-agendamientos-ia", href: "/soluciones/agente-agendamientos-ia" },
  { slug: "atencion-telefonica-ia", href: "/soluciones/atencion-telefonica-ia" },
  { slug: "lead-generation-ia", href: "/soluciones/lead-generation-ia" },
]

export async function ServicesBlock() {
  const t = await getTranslations("services")
  const translatedItems = t.raw("items") as { title: string; description: string }[]

  const services = servicesMeta.map((meta, i) => ({
    ...meta,
    title: translatedItems[i]?.title || "",
    description: translatedItems[i]?.description || "",
    Icon: iconMap[meta.slug] || Sparkles,
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
          {services.slice(0, 8).map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="card-elevated group rounded-2xl hover:border-foreground/25 transition-all hover:scale-[1.02] overflow-hidden hover:shadow-lg hover:shadow-[var(--neon-blue)]/10"
            >
              {/* Dashboard mockup */}
              <div className="relative w-full h-32 overflow-hidden rounded-t-2xl">
                <SolutionMockup slug={s.slug} fallbackIcon={s.Icon} />
                {/* Subtle gradient overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.05))" }}
                />
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
