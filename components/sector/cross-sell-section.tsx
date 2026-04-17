"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useMotionReveal, useStaggerContainer, useStaggerItem } from "./use-motion-reveal"

interface CrossSellItem {
  slug: string
  name: string
  description: string
  image: string // path to /public/images/sectors/...
}

interface CrossSellSectionProps {
  currentSlug: string
  title: string
  subtitle?: string
  ctaAll: string
}

// Available sectors for cross-sell (uses local images)
const ALL_SECTORS: CrossSellItem[] = [
  { slug: "clinicas", name: "Clínicas y Salud", description: "Gestión de citas médicas y atención 24/7", image: "/images/sectors/clinicas.jpg" },
  { slug: "concesionarios", name: "Concesionarios", description: "Cualificación de leads y test drives", image: "/images/sectors/concesionarios.jpg" },
  { slug: "restaurantes", name: "Restaurantes", description: "Reservas automáticas y gestión de pedidos", image: "/images/sectors/restaurantes.jpg" },
  { slug: "inmobiliarias", name: "Inmobiliarias", description: "Leads inmediatos y visitas agendadas", image: "/images/sectors/inmobiliarias.jpg" },
  { slug: "ecommerce", name: "E-commerce", description: "Recuperación de carrito y recomendaciones", image: "/images/sectors/ecommerce.jpg" },
  { slug: "turismo-hoteleria", name: "Turismo y Hoteles", description: "Reservas multi-idioma y upselling", image: "/images/sectors/turismo.jpg" },
  { slug: "educacion", name: "Educación", description: "Matrículas y atención a familias", image: "/images/sectors/educacion.jpg" },
  { slug: "servicios-tecnicos", name: "Servicios Técnicos", description: "Gestión de incidencias y citas", image: "/images/sectors/servicios-locales.jpg" },
]

export function SectorCrossSellSection({
  currentSlug,
  title,
  subtitle,
  ctaAll,
}: CrossSellSectionProps) {
  const others = ALL_SECTORS.filter((s) => s.slug !== currentSlug).slice(0, 6)
  const headerReveal = useMotionReveal()
  const stagger = useStaggerContainer(0.06)
  const staggerItem = useStaggerItem()

  return (
    <section
      aria-labelledby="sector-cross-sell-title"
      className="px-4 sm:px-6 py-20 md:py-28 border-t border-foreground/5"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...headerReveal}
          className="text-center mb-12 md:mb-14"
        >
          <h2
            id="sector-cross-sell-title"
            className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance leading-tight tracking-tight"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-base text-foreground/55 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          {...stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {others.map((s) => (
            <motion.div key={s.slug} {...staggerItem}>
              <Link
                href={`/sectores/${s.slug}`}
                className="group block rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.04] hover:border-foreground/20 transition-all duration-300 overflow-hidden"
              >
                <div className="relative w-full h-32 sm:h-36 overflow-hidden">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.35) 100%)" }}
                    aria-hidden="true"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base font-semibold text-foreground mb-1 flex items-center gap-1.5 group-hover:text-brand-secondary transition-colors">
                    {s.name}
                    <ArrowRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true" />
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground/55 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10 sm:mt-12">
          <Link
            href="/sectores"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
          >
            {ctaAll}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
