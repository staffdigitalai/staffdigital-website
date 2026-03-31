"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const sectors = [
  { name: "Concesionarios", useCase: "Test drives, cualificación, posventa", href: "/sectores/concesionarios", image: "/images/sectors/concesionarios.jpg", alt: "Agente IA para concesionarios de automóviles: cualificación de leads y gestión de test drives" },
  { name: "Clínicas y Salud", useCase: "Citas, recordatorios, primer contacto", href: "/sectores/clinicas", image: "/images/sectors/clinicas.jpg", alt: "Agente IA para clínicas: gestión de citas médicas y recordatorios automáticos" },
  { name: "Inmobiliario", useCase: "Visitas, cualificación, follow-up", href: "/sectores/inmobiliarias", image: "/images/sectors/inmobiliarias.jpg", alt: "Agente IA para inmobiliarias: cualificación de compradores y gestión de visitas" },
  { name: "Restaurantes", useCase: "Reservas, takeaway, confirmaciones", href: "/sectores/restaurantes", image: "/images/sectors/restaurantes.jpg", alt: "Agente IA para restaurantes: reservas automáticas y gestión de pedidos" },
  { name: "E-commerce", useCase: "Carrito abandonado, recomendaciones", href: "/sectores/ecommerce", image: "/images/sectors/ecommerce.jpg", alt: "Agente IA para e-commerce: recuperación de carrito y recomendaciones de producto" },
  { name: "Turismo y Hotelería", useCase: "Reservas, upsell, soporte 24/7", href: "/sectores/turismo-hoteleria", image: "/images/sectors/turismo.jpg", alt: "Agente IA para hoteles y turismo: reservas, upselling y soporte multiidioma" },
  { name: "Educación", useCase: "Matrículas, información, recordatorios", href: "/sectores/educacion", image: "/images/sectors/educacion.jpg", alt: "Agente IA para centros educativos: gestión de matrículas y consultas automáticas" },
  { name: "Servicios Locales", useCase: "LeadGen IA, citas, follow-up", href: "/sectores/servicios-tecnicos", image: "/images/sectors/servicios-locales.jpg", alt: "Agente IA para servicios locales: generación de leads y agendamiento automático" },
]

export function SectorsBlock() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Agentes IA especializados por sector
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Entrenados con las necesidades específicas de tu industria.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sectors.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-[1.02] overflow-hidden"
            >
              <div className="relative w-full h-28">
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover opacity-75 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-bold text-white">{s.name}</h3>
                <p className="text-sm text-white/50">{s.useCase}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/sectores"
            className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white/80 underline underline-offset-4 transition-colors"
          >
            Ver todos los sectores <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}
