"use client"

import Image from "next/image"
import { Check, MessageSquare, Calendar, Database, Cpu } from "lucide-react"

const stackItems = [
  { icon: MessageSquare, label: "Chatwoot CE", description: "Bandeja omnicanal unificada", category: "Canales" },
  { icon: Cpu, label: "OpenClaw", description: "Orquestación de agentes autónomos", category: "IA" },
  { icon: Calendar, label: "Cal.com", description: "Agendamiento automático", category: "Citas" },
  { icon: Database, label: "Twenty CRM", description: "CRM open source integrado", category: "Datos" },
]

const weDoItems = [
  "Configuramos los agentes IA para tu negocio",
  "Integramos WhatsApp, teléfono, chat web y email",
  "Conectamos con tu CRM y calendario",
  "Entrenamos la IA con tu base de conocimiento",
  "Gestionamos la infraestructura 24/7",
  "Garantizamos seguridad y privacidad (UE)",
]

export function DoneForYouBlock() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Plataforma completa,{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              totalmente gestionada
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Integramos canales, CRM, agenda y agentes IA en una sola plataforma. Tú solo recibes los resultados.
          </p>
        </div>

        {/* Stack cards — show what powers the platform */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {stackItems.map((item) => (
            <div key={item.label} className="p-4 rounded-xl border border-white/10 bg-white/5 text-center space-y-2 hover:bg-white/10 transition-colors">
              <item.icon className="w-6 h-6 text-white/60 mx-auto" />
              <div className="text-xs text-emerald-400 font-medium">{item.category}</div>
              <div className="font-bold text-sm text-white">{item.label}</div>
              <p className="text-xs text-white/40">{item.description}</p>
            </div>
          ))}
        </div>

        {/* What we do grid */}
        <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto mb-8">
          {weDoItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-white/80 text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto">
          <Image
            src="/images/homepage/done-for-you.jpg"
            alt="Plataforma gestionada StaffDigital AI: integración de Chatwoot, OpenClaw, Cal.com y Twenty CRM"
            width={1200}
            height={686}
            loading="lazy"
            className="rounded-2xl border border-white/10"
          />
        </div>
      </div>
    </section>
  )
}
