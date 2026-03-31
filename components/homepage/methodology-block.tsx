"use client"

import Image from "next/image"
import { Search, Settings, Brain, TestTube, GraduationCap, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
  { icon: Search, num: "1", title: "Descubrimiento", description: "Entendemos tu negocio, canales y objetivos" },
  { icon: Settings, num: "2", title: "Configuración", description: "Creamos los agentes e integramos tu CRM" },
  { icon: Brain, num: "3", title: "Entrenamiento", description: "Los alimentamos con tu conocimiento: productos, FAQ, tono" },
  { icon: TestTube, num: "4", title: "Tests", description: "Validamos cada interacción y ajustamos flujos" },
  { icon: GraduationCap, num: "5", title: "Formación", description: "Entrenamos a tu equipo para gestionar excepciones" },
  { icon: Rocket, num: "6", title: "Lanzamiento", description: "Producción + acompañamiento y soporte continuo" },
]

export function MethodologyBlock() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Nosotros hacemos todo.{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              En 6 pasos.
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            Tú solo nos das acceso. Nosotros nos encargamos del resto.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div key={s.num} className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-3 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 text-sm font-bold">{s.num}</span>
                <s.icon className="w-5 h-5 text-white/50" />
              </div>
              <h3 className="font-bold text-white">{s.title}</h3>
              <p className="text-sm text-white/50">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mt-8 mb-6">
          <Image
            src="/images/homepage/methodology.jpg"
            alt="Línea temporal de implementación de agentes IA en 6 fases: descubrimiento, configuración, entrenamiento, tests, formación y lanzamiento"
            width={1200}
            height={686}
            loading="lazy"
            className="rounded-2xl border border-white/10 opacity-70"
          />
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link href="/contacto">
              Agendar reunión de descubrimiento
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
