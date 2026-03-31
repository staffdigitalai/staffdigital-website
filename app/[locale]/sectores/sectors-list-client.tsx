"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Stethoscope, Smile, Scissors, UtensilsCrossed, Home, Car, Dumbbell, ShoppingBag, Building2, Wrench, GraduationCap, Warehouse, Building, Briefcase, Heart, Hotel } from "lucide-react"
import { PageWrapper } from "@/components/page-wrapper"
import { CTASection } from "@/components/cta-section"

// Icon mapping from string to Lucide icon
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Stethoscope,
  Smile,
  Scissors,
  UtensilsCrossed,
  Home,
  Car,
  Dumbbell,
  ShoppingBag,
  Building2,
  Wrench,
  GraduationCap,
  Warehouse,
  Building,
  Briefcase,
  Heart,
  Hotel,
}

interface MetricaData {
  valor: string
  etiqueta: string
}

interface SectorData {
  id: number
  slug: string
  title: string
  excerpt: string
  icon: string
  subtitle: string
  metricas: MetricaData[]
}

interface SectorsListClientProps {
  sectors: SectorData[]
}

export function SectorsListClient({ sectors }: SectorsListClientProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in-up")
              }, i * 80)
            })
          }
        }
      },
      { threshold: 0.1 }
    )

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <PageWrapper breadcrumbs={[{ label: "Sectores" }]}>
      {/* Hero Section */}
      <section className="px-4 pt-8 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 animate-fade-in-badge">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
            IA para cada Industria
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight text-balance mb-6 animate-fade-in-heading">
            Soluciones de IA para{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              tu Sector
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-subheading">
            Cada industria tiene sus desafios unicos. Descubre como nuestras soluciones de IA estan disenadas especificamente para resolver los problemas de tu sector.
          </p>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="px-4 pb-20 md:pb-32" ref={gridRef}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector) => {
              const IconComponent = iconMap[sector.icon] || Building2
              return (
                <Link
                  key={sector.id}
                  href={`/sectores/${sector.slug}`}
                  className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 group block"
                >
                  <div className="h-full p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <IconComponent size={24} className="text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-white/90">
                          {sector.title}
                        </h3>
                        {sector.subtitle && (
                          <p className="text-emerald-400/70 text-sm">{sector.subtitle}</p>
                        )}
                      </div>
                    </div>

                    <p className="text-white/60 leading-relaxed text-sm mb-4 line-clamp-2">
                      {sector.excerpt}
                    </p>

                    {sector.metricas && sector.metricas.length > 0 && (
                      <div className="flex flex-wrap gap-3 mb-4">
                        {sector.metricas.slice(0, 2).map((metrica, index) => (
                          <div
                            key={index}
                            className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                          >
                            <span className="text-emerald-400 text-sm font-semibold">
                              {metrica.valor}
                            </span>
                            <span className="text-white/50 text-xs ml-1.5">
                              {metrica.etiqueta}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center text-emerald-400/80 group-hover:text-emerald-400 transition-colors">
                      <span className="text-sm font-medium">Ver soluciones</span>
                      <ArrowRight
                        size={16}
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-20 md:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-balance">
              No encuentras tu sector?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Nuestras soluciones de IA se adaptan a cualquier industria. Contactanos para una solucion personalizada.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-all hover:scale-105"
            >
              Solicitar Demo Personalizada
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </PageWrapper>
  )
}
