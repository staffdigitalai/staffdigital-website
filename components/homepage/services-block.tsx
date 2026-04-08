import { ArrowRight, Phone, MessageSquare, Globe, Users, TrendingUp, Headphones, Calendar, Target, Layers, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { getServices } from "@/lib/wordpress"

// Icon mapping for service slugs
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

// Fallback services meta (used when WP fetch fails or for translations)
const servicesMeta = [
  { slug: "atencion-telefonica-ia", href: "/soluciones/atencion-telefonica-ia" },
  { slug: "whatsapp-ia-empresas", href: "/soluciones/whatsapp-ia-empresas" },
  { slug: "agente-chat-web-ia", href: "/soluciones/agente-chat-web-ia" },
  { slug: "agente-ventas-ia", href: "/soluciones/agente-ventas-ia" },
  { slug: "agente-soporte-ia", href: "/soluciones/agente-soporte-ia" },
  { slug: "agente-agendamientos-ia", href: "/soluciones/agente-agendamientos-ia" },
  { slug: "lead-generation-ia", href: "/soluciones/lead-generation-ia" },
  { slug: "crm-automation-ia", href: "/soluciones/crm-automation-ia" },
]

export async function ServicesBlock() {
  const t = await getTranslations("services")
  
  // Fetch real services from WordPress with images
  let wpServices: Array<{ slug: string; imageUrl?: string }> = []
  try {
    const services = await getServices({ perPage: 20 })
    wpServices = services.map(s => ({
      slug: s.slug,
      imageUrl: s._embedded?.['wp:featuredmedia']?.[0]?.source_url,
    }))
  } catch (error) {
    console.error("[ServicesBlock] Failed to fetch services:", error)
  }

  // Create a map for quick lookup
  const imageMap = new Map(wpServices.map(s => [s.slug, s.imageUrl]))

  const translatedItems = t.raw("items") as { title: string; description: string }[]

  const services = servicesMeta.map((meta, i) => ({
    ...meta,
    title: translatedItems[i]?.title || "",
    description: translatedItems[i]?.description || "",
    imageUrl: imageMap.get(meta.slug),
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
              {/* Image area - real image from WP or fallback */}
              <div className="relative w-full h-32 overflow-hidden">
                {s.imageUrl ? (
                  <Image
                    src={s.imageUrl}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0078AA]/10 to-[#7C3AED]/10 flex items-center justify-center">
                    <s.Icon className="w-8 h-8 text-[#0078AA]/40" />
                  </div>
                )}
                {/* Brand overlay */}
                <div 
                  className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-50"
                  style={{ background: "linear-gradient(135deg, rgba(0, 120, 170, 0.06), rgba(124, 58, 237, 0.10))" }}
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
