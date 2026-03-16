"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/service-page-template"
import type { ServicePageData } from "@/components/service-page-template"
import { 
  Shield, 
  Camera, 
  Bell, 
  Users,
  Car,
  Eye,
  Smartphone,
  AlertTriangle,
  Lock,
  Monitor,
  Wifi,
  Clock
} from "lucide-react"

const data: ServicePageData = {
  serviceName: "Seguridad IA",
  badge: "Videovigilancia Inteligente con IA",
  headline: "Seguridad que",
  headlineAccent: "Piensa por Ti",
  subheadline: "Monitorizacion inteligente con deteccion de personas, vehiculos y comportamientos sospechosos. Alertas automaticas y respuesta inmediata.",
  valueStatement: "Reduce falsas alarmas hasta",
  valueHighlight: "95%",
  valueSuffix: "con deteccion inteligente",
  features: [
    { 
      icon: Eye, 
      title: "Deteccion Inteligente con IA", 
      description: "Reconocimiento avanzado de personas, vehiculos, objetos y comportamientos anomalos con precision superior al 98%.",
      highlight: "98% precision"
    },
    { 
      icon: Bell, 
      title: "Alertas Automaticas Inteligentes", 
      description: "Notificaciones instantaneas al detectar eventos relevantes, filtrando automaticamente falsas alarmas por animales o clima.",
      highlight: "-95% falsas alarmas"
    },
    { 
      icon: Lock, 
      title: "Integracion con Alarmas", 
      description: "Conecta con tu sistema de alarmas existente para activacion automatica basada en detecciones de IA.",
    },
    { 
      icon: Monitor, 
      title: "Dashboard de Monitorizacion", 
      description: "Panel centralizado con vista en tiempo real de todas las camaras, historial de eventos y analiticas de seguridad.",
      highlight: "Acceso remoto 24/7"
    },
  ],
  useCases: [
    { 
      icon: Users, 
      title: "Control de Acceso", 
      description: "Detecta y registra automaticamente personas autorizadas y no autorizadas en areas restringidas." 
    },
    { 
      icon: Car, 
      title: "Vigilancia de Parking", 
      description: "Monitorizacion de estacionamientos con deteccion de vehiculos, matriculas y movimientos sospechosos." 
    },
    { 
      icon: AlertTriangle, 
      title: "Prevencion de Robos", 
      description: "Deteccion temprana de comportamientos sospechosos con alertas antes de que ocurra el incidente." 
    },
    { 
      icon: Smartphone, 
      title: "Alertas Moviles", 
      description: "Recibe notificaciones push en tu movil con imagenes y video del evento detectado." 
    },
    { 
      icon: Wifi, 
      title: "Monitorizacion Remota", 
      description: "Accede a tus camaras desde cualquier lugar con conexion segura y encriptada." 
    },
    { 
      icon: Clock, 
      title: "Grabacion Inteligente", 
      description: "Solo graba cuando hay movimiento relevante, ahorrando almacenamiento y facilitando busquedas." 
    },
  ],
  stats: [
    { value: "98%", label: "Precision deteccion" },
    { value: "-95%", label: "Falsas alarmas" },
    { value: "24/7", label: "Monitorizacion" },
    { value: "<1s", label: "Tiempo alerta" },
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
      title: "Home Staging IA", 
      description: "Solucion completa de preparacion y marketing inmobiliario con IA.",
      href: "/soluciones/home-staging-ia"
    },
  ],
  ctaTitle: "Listo para una seguridad",
  ctaAccent: "verdaderamente inteligente?",
  ctaDescription: "Descubre como la videovigilancia con IA puede proteger tu negocio las 24 horas sin falsas alarmas.",
  accentColor: "emerald",
}

export function SecurityAIClient() {
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
