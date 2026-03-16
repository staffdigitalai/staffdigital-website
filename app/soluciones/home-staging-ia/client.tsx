"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/service-page-template"
import type { ServicePageData } from "@/components/service-page-template"
import { 
  Home, 
  Camera, 
  Globe, 
  MessageSquare,
  Phone,
  CalendarCheck,
  Sparkles,
  Wrench,
  Image,
  LayoutTemplate,
  Users,
  TrendingUp
} from "lucide-react"

const data: ServicePageData = {
  serviceName: "Home Staging IA",
  badge: "Marketing Inmobiliario Inteligente",
  headline: "Vende Propiedades",
  headlineAccent: "Mas Rapido con IA",
  subheadline: "Solucion integral para inmobiliarias: desde la preparacion fisica hasta el marketing digital con agentes IA que cualifican compradores y reservan visitas.",
  valueStatement: "Inmuebles con home staging se venden hasta",
  valueHighlight: "50%",
  valueSuffix: "mas rapido",
  features: [
    { 
      icon: Sparkles, 
      title: "Preparacion Integral de Propiedades", 
      description: "Servicio completo de limpieza profesional, pequenas reparaciones y home staging virtual o fisico para maximizar el atractivo visual.",
      highlight: "Listo para vender en 48h"
    },
    { 
      icon: Camera, 
      title: "Fotografia y Video Profesional", 
      description: "Sesion fotografica HDR, tour virtual 360°, video walkthrough y fotos aereas con dron para presentaciones impactantes.",
      highlight: "+300% mas visitas"
    },
    { 
      icon: LayoutTemplate, 
      title: "Landing Pages Personalizadas", 
      description: "Microsite exclusivo para cada propiedad con galeria, planos, zona y formulario de contacto optimizado para conversion.",
    },
    { 
      icon: MessageSquare, 
      title: "Agentes IA para Compradores", 
      description: "Chatbot y agente telefonico IA que responden consultas 24/7, cualifican compradores y reservan visitas automaticamente.",
      highlight: "24/7 atencion compradores"
    },
  ],
  useCases: [
    { 
      icon: Wrench, 
      title: "Preparacion Express", 
      description: "Limpieza, pequenas reparaciones y staging listo en 24-48 horas para acelerar la venta." 
    },
    { 
      icon: Image, 
      title: "Home Staging Virtual", 
      description: "Transforma fotos de espacios vacios en imagenes amuebladas virtualmente con IA." 
    },
    { 
      icon: Globe, 
      title: "Marketing Multi-portal", 
      description: "Publicacion automatica en los principales portales inmobiliarios con textos optimizados." 
    },
    { 
      icon: Phone, 
      title: "Agente Telefonico IA", 
      description: "Responde llamadas de interesados, cualifica su presupuesto y agenda visitas automaticamente." 
    },
    { 
      icon: CalendarCheck, 
      title: "Reserva de Visitas", 
      description: "Sistema inteligente que coordina disponibilidad de propiedad, agente y comprador." 
    },
    { 
      icon: Users, 
      title: "Cualificacion de Compradores", 
      description: "Identifica compradores serios preguntando presupuesto, financiacion y urgencia de compra." 
    },
  ],
  stats: [
    { value: "-50%", label: "Tiempo de venta" },
    { value: "+300%", label: "Visitas online" },
    { value: "24/7", label: "Atencion IA" },
    { value: "48h", label: "Preparacion" },
  ],
  relatedServices: [
    { 
      title: "IA Conversacional", 
      description: "Chatbots y agentes de voz inteligentes para atencion 24/7.",
      href: "/soluciones/ia-conversacional"
    },
    { 
      title: "Automatizacion Omnicanal", 
      description: "Unifica todos tus canales en una bandeja inteligente.",
      href: "/soluciones/automatizacion-omnicanal"
    },
    { 
      title: "Seguridad IA", 
      description: "Monitorizacion inteligente y alertas automaticas.",
      href: "/soluciones/seguridad-ia"
    },
  ],
  ctaTitle: "Listo para vender propiedades",
  ctaAccent: "mas rapido?",
  ctaDescription: "Descubre como el home staging con IA puede transformar tu agencia inmobiliaria y acelerar las ventas.",
  accentColor: "purple",
}

export function HomeStagingClient() {
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
