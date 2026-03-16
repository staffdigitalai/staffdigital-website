"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/service-page-template"
import type { ServicePageData } from "@/components/service-page-template"
import { 
  MessageSquare, 
  Phone, 
  CalendarCheck, 
  Users, 
  Bot, 
  Headphones,
  Clock,
  Target,
  Zap,
  Globe,
  Building2,
  ShoppingBag
} from "lucide-react"

const data: ServicePageData = {
  serviceName: "IA Conversacional",
  badge: "Chatbots y Agentes de Voz Inteligentes",
  headline: "Atencion al Cliente",
  headlineAccent: "24/7 con IA",
  subheadline: "Chatbots inteligentes, asistentes virtuales y agentes de voz que cualifican leads, reservan citas y responden consultas automaticamente.",
  valueStatement: "Empresas con IA conversacional aumentan",
  valueHighlight: "+40%",
  valueSuffix: "la conversion de leads",
  features: [
    { 
      icon: MessageSquare, 
      title: "Chatbots Inteligentes 24/7", 
      description: "Chatbots con IA avanzada que entienden el contexto, responden consultas complejas y guian a los visitantes hacia la conversion.",
      highlight: "Respuesta en menos de 3 segundos"
    },
    { 
      icon: Phone, 
      title: "Agentes de Voz IA", 
      description: "Asistentes telefonicos con voz natural que responden llamadas, toman mensajes y gestionan citas cuando no puedes atender.",
      highlight: "Disponible 24/7/365"
    },
    { 
      icon: Users, 
      title: "Cualificacion Automatica de Leads", 
      description: "Sistema inteligente que cualifica prospectos haciendo las preguntas correctas y priorizando los leads mas calientes para tu equipo.",
      highlight: "+60% leads cualificados"
    },
    { 
      icon: CalendarCheck, 
      title: "Reserva de Citas Automatica", 
      description: "Agenda citas directamente desde el chat o llamada, sincronizado con tu calendario y con confirmaciones automaticas.",
    },
  ],
  useCases: [
    { 
      icon: Clock, 
      title: "Soporte Fuera de Horario", 
      description: "Atiende consultas de clientes cuando tu equipo no esta disponible, sin perder oportunidades de venta." 
    },
    { 
      icon: Target, 
      title: "Generacion de Leads", 
      description: "Captura y cualifica visitantes de tu web convirtiendo trafico anonimo en leads calificados." 
    },
    { 
      icon: Zap, 
      title: "Respuesta Instantanea", 
      description: "Responde preguntas frecuentes al instante, liberando a tu equipo para tareas de mayor valor." 
    },
    { 
      icon: Globe, 
      title: "Atencion Multiidioma", 
      description: "Atiende clientes en espanol, portugues, ingles y mas idiomas automaticamente." 
    },
    { 
      icon: Building2, 
      title: "Recepcion Virtual", 
      description: "Sustituye o complementa tu recepcion con un asistente IA que nunca esta ocupado." 
    },
    { 
      icon: ShoppingBag, 
      title: "Asistente de Compra", 
      description: "Guia a los clientes en su proceso de compra, resolviendo dudas y recomendando productos." 
    },
  ],
  stats: [
    { value: "24/7", label: "Disponibilidad" },
    { value: "+40%", label: "Conversion leads" },
    { value: "3s", label: "Tiempo respuesta" },
    { value: "-70%", label: "Carga equipo" },
  ],
  relatedServices: [
    { 
      title: "Automatizacion Omnicanal", 
      description: "Integra todos tus canales en una bandeja unificada con respuestas automaticas.",
      href: "/soluciones/automatizacion-omnicanal"
    },
    { 
      title: "Seguridad IA", 
      description: "Monitorizacion inteligente y alertas automaticas para tu negocio.",
      href: "/soluciones/seguridad-ia"
    },
    { 
      title: "Home Staging IA", 
      description: "Solucion completa de preparacion y marketing inmobiliario con IA.",
      href: "/soluciones/home-staging-ia"
    },
  ],
  ctaTitle: "Listo para automatizar tu",
  ctaAccent: "atencion al cliente?",
  ctaDescription: "Descubre como la IA conversacional puede transformar la experiencia de tus clientes y aumentar tus ventas.",
  accentColor: "orange",
}

export function ConversationalAIClient() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <ServicePageTemplate data={data} />
          <Footer />
        </div>
      </main>
    </div>
  )
}
