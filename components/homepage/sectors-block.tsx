"use client"

import { Car, Stethoscope, Home, UtensilsCrossed, ShoppingBag, Plane, GraduationCap, Briefcase, ArrowRight } from "lucide-react"
import Link from "next/link"

const sectors = [
  { icon: Car, name: "Concesionarios", useCase: "Test drives, cualificación, posventa", href: "/sectores/concesionarios" },
  { icon: Stethoscope, name: "Clínicas y Salud", useCase: "Citas, recordatorios, primer contacto", href: "/sectores/clinicas" },
  { icon: Home, name: "Inmobiliario", useCase: "Visitas, cualificación, follow-up", href: "/sectores/inmobiliarias" },
  { icon: UtensilsCrossed, name: "Restaurantes", useCase: "Reservas, takeaway, confirmaciones", href: "/sectores/restaurantes" },
  { icon: ShoppingBag, name: "E-commerce", useCase: "Carrito abandonado, recomendaciones", href: "/sectores/ecommerce" },
  { icon: Plane, name: "Turismo y Hotelería", useCase: "Reservas, upsell, soporte 24/7", href: "/sectores/turismo-hoteleria" },
  { icon: GraduationCap, name: "Educación", useCase: "Matrículas, información, recordatorios", href: "/sectores/educacion" },
  { icon: Briefcase, name: "Servicios Locales", useCase: "LeadGen IA, citas, follow-up", href: "/sectores/servicios-tecnicos" },
]

export function SectorsBlock() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Agentes IA para tu sector
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Agentes especializados que entienden las necesidades de tu negocio.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sectors.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-[1.02] space-y-3"
            >
              <s.icon className="w-7 h-7 text-white/70" />
              <h3 className="font-bold text-white">{s.name}</h3>
              <p className="text-sm text-white/50">{s.useCase}</p>
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
