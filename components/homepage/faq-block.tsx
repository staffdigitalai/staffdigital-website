"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

const faqs = [
  {
    q: "¿El agente IA parece realmente humano?",
    a: "Sí. Utilizamos tecnología de voz humana propietaria con voces indistinguibles de personas reales. Tus clientes no saben que hablan con IA.",
  },
  {
    q: "¿Cuánto tarda la implementación?",
    a: "Entre 2 y 6 semanas, dependiendo de la complejidad. Nosotros nos encargamos de todo — tú solo nos das acceso.",
  },
  {
    q: "¿Qué necesito proporcionar?",
    a: "Acceso a tu CRM (si existe), información sobre productos/servicios y acceso a los canales (WhatsApp, etc.). Nosotros hacemos el resto.",
  },
  {
    q: "¿Y si el agente no sabe responder?",
    a: "Transfiere la conversación a un humano de tu equipo con todo el contexto de la interacción. Nunca se pierde información.",
  },
  {
    q: "¿Cómo funciona la privacidad de datos?",
    a: "Infraestructura propia en la UE, diseñada para facilitar el cumplimiento del GDPR. Los datos son tuyos.",
  },
  {
    q: "¿Necesito equipo técnico?",
    a: "No. Nosotros configuramos, gestionamos y mantenemos todo. Tu negocio solo necesita usar el servicio.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
}

export function FAQBlock() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-20 px-4">
      {/* FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Preguntas frecuentes sobre agentes IA</h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
              >
                <span className="font-medium text-white/90 text-sm pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-white/40 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-white/60 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/faq" className="text-sm text-white/50 hover:text-white/80 underline underline-offset-4 transition-colors">
            Ver todas las preguntas →
          </Link>
        </div>
      </div>
    </section>
  )
}
