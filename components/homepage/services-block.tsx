import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { getServices } from "@/lib/wordpress"

// Services meta - maps slugs to hrefs
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

  // Fetch services from WordPress to get featured images
  let wpServices: Awaited<ReturnType<typeof getServices>> = []
  try {
    wpServices = await getServices({ perPage: 50 })
  } catch (error) {
    console.error("[ServicesBlock] Failed to fetch services:", error)
  }

  // Create a map of slug -> featured image URL
  const imageMap: Record<string, string> = {}
  for (const service of wpServices) {
    const imageUrl = service._embedded?.['wp:featuredmedia']?.[0]?.source_url
    if (imageUrl) {
      imageMap[service.slug] = imageUrl
    }
  }

  const services = servicesMeta.map((meta, i) => ({
    ...meta,
    title: translatedItems[i]?.title || "",
    description: translatedItems[i]?.description || "",
    image: imageMap[meta.slug] || null,
  }))

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span>Un agente IA para </span>
            <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">cada necesidad</span>
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
              {/* WordPress featured image */}
              <div className="relative w-full h-32 overflow-hidden">
                {s.image ? (
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0078AA]/10 to-[#7C3AED]/10" />
                )}
                {/* Brand overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0078AA]/10 via-transparent to-[#7C3AED]/5 pointer-events-none" />
                {/* Hover overlay */}
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#0078AA]/10 to-[#7C3AED]/15 pointer-events-none" />
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
