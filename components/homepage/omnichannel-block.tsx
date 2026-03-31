"use client"

import Image from "next/image"
import { MessageSquare, Phone, Globe, Mail, Share2 } from "lucide-react"

const channels = [
  { icon: MessageSquare, name: "WhatsApp", line1: "Voz y texto con IA", line2: "Conversaciones naturales" },
  { icon: Phone, name: "Teléfono", line1: "Voz humana indistinguible", line2: "Sin menús IVR" },
  { icon: Globe, name: "Chat Web", line1: "Atención instantánea", line2: "Cualificación de leads" },
  { icon: Mail, name: "Email", line1: "Respuestas automáticas", line2: "CRM integrado" },
  { icon: Share2, name: "Redes Sociales", line1: "Instagram, Facebook", line2: "DMs automatizados" },
]

export function OmnichannelBlock() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Un solo agente.{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Todos los canales.
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            El mismo agente IA atiende donde esté tu cliente — con historial completo y contexto en tiempo real.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {channels.map((ch) => (
            <div
              key={ch.name}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 text-center space-y-3 hover:bg-white/10 transition-colors"
            >
              <ch.icon className="w-8 h-8 text-white/80 mx-auto" />
              <h3 className="font-bold text-sm">{ch.name}</h3>
              <p className="text-xs text-white/50">{ch.line1}</p>
              <p className="text-xs text-white/40">{ch.line2}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-2xl mx-auto">
          <Image
            src="/images/homepage/omnichannel.jpg"
            alt="Canales WhatsApp, teléfono, chat web, email y redes sociales conectados a un hub central de IA"
            width={1200}
            height={686}
            loading="lazy"
            className="rounded-2xl border border-white/10 opacity-80"
          />
        </div>

        <p className="text-center text-white/50 mt-6 text-sm italic">
          ¿El cliente cambia de canal? El agente mantiene el contexto. Sin repeticiones. Sin frustraciones.
        </p>
      </div>
    </section>
  )
}
