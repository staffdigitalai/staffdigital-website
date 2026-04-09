"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

const sectorsMeta = [
  { href: "/sectores/concesionarios", image: "/images/sectors/concesionarios.jpg", alt: "Agente IA para concesionarios de automóviles: cualificación de leads y gestión de test drives", objectPosition: "center" },
  { href: "/sectores/clinicas", image: "/images/sectors/clinicas.jpg", alt: "Agente IA para clínicas: gestión de citas médicas y recordatorios automáticos", objectPosition: "center" },
  { href: "/sectores/inmobiliarias", image: "/images/sectors/inmobiliarias.jpg", alt: "Agente IA para inmobiliarias: cualificación de compradores y gestión de visitas", objectPosition: "top" },
  { href: "/sectores/restaurantes", image: "/images/sectors/restaurantes.jpg", alt: "Agente IA para restaurantes: reservas automáticas y gestión de pedidos", objectPosition: "center" },
  { href: "/sectores/ecommerce", image: "/images/sectors/ecommerce.jpg", alt: "Agente IA para e-commerce: recuperación de carrito y recomendaciones de producto", objectPosition: "center" },
  { href: "/sectores/turismo-hoteleria", image: "/images/sectors/turismo.jpg", alt: "Agente IA para hoteles y turismo: reservas, upselling y soporte multiidioma", objectPosition: "center" },
  { href: "/sectores/educacion", image: "/images/sectors/educacion.jpg", alt: "Agente IA para centros educativos: gestión de matrículas y consultas automáticas", objectPosition: "center" },
  { href: "/sectores/servicios-tecnicos", image: "/images/sectors/servicios-locales.jpg", alt: "Agente IA para servicios locales: generación de leads y agendamiento automático", objectPosition: "center" },
]

export function SectorsBlock() {
  const t = useTranslations("sectors")

  const translatedItems = t.raw("items") as { name: string; useCase: string }[]

  const sectors = sectorsMeta.map((meta, i) => ({
    ...meta,
    name: translatedItems[i].name,
    useCase: translatedItems[i].useCase,
  }))

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span>IA entrenada para </span>
            <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">tu industria</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sectors.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="card-elevated group rounded-2xl hover:border-gray-300 dark:hover:border-foreground/20 transition-all hover:scale-[1.02] overflow-hidden"
            >
              <div className="relative w-full h-28">
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover"
                  style={{ objectPosition: s.objectPosition }}
                />
                {/* Brand gradient overlay - unifies all photos */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0078AA]/10 via-transparent to-[#7C3AED]/5 pointer-events-none" />
                {/* Hover overlay */}
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#0078AA]/10 to-[#7C3AED]/15 pointer-events-none" />
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-bold text-foreground">{s.name}</h3>
                <p className="text-sm text-gray-600 dark:text-foreground/60">{s.useCase}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/sectores"
            className="inline-flex items-center gap-1 text-sm text-foreground/50 hover:text-foreground/80 underline underline-offset-4 transition-colors"
          >
            {t("view_all")} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}
