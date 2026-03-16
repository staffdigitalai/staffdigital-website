"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/service-page-template"
import type { ServicePageData } from "@/components/service-page-template"
import { 
  Layers, 
  Mail, 
  MessageCircle, 
  Workflow,
  Inbox,
  RefreshCw,
  Database,
  Send,
  Bell,
  BarChart3,
  Link2,
  Settings
} from "lucide-react"

const data: ServicePageData = {
  serviceName: "Automatizacion Omnicanal",
  badge: "Bandeja Unificada y Workflows Inteligentes",
  headline: "Todos tus Canales,",
  headlineAccent: "Una Sola Plataforma",
  subheadline: "Unifica WhatsApp, email, redes sociales y telefono en una bandeja inteligente con respuestas automaticas y workflows personalizados.",
  valueStatement: "Reduce el tiempo de respuesta hasta",
  valueHighlight: "90%",
  valueSuffix: "con automatizacion omnicanal",
  features: [
    { 
      icon: Inbox, 
      title: "Bandeja Unificada Inteligente", 
      description: "Todos tus mensajes de WhatsApp, email, Instagram, Facebook y mas en un solo lugar, con priorización automatica por IA.",
      highlight: "Vista 360° del cliente"
    },
    { 
      icon: Mail, 
      title: "Automatizacion de Email", 
      description: "Respuestas automaticas personalizadas, seguimientos programados y campanas de nurturing gestionadas por IA.",
      highlight: "+50% tasa de apertura"
    },
    { 
      icon: Database, 
      title: "CRM Integrado", 
      description: "Sincronizacion bidireccional con tu CRM existente o usa nuestro CRM integrado con todas las interacciones centralizadas.",
    },
    { 
      icon: Workflow, 
      title: "Workflows Automaticos", 
      description: "Crea flujos de trabajo personalizados que se ejecutan automaticamente basados en triggers y condiciones.",
      highlight: "Sin codigo necesario"
    },
  ],
  useCases: [
    { 
      icon: RefreshCw, 
      title: "Seguimiento Automatico", 
      description: "Envia recordatorios y seguimientos automaticos a leads que no han respondido." 
    },
    { 
      icon: Send, 
      title: "Respuestas Instantaneas", 
      description: "Responde al instante con mensajes personalizados basados en el contexto del cliente." 
    },
    { 
      icon: Bell, 
      title: "Notificaciones Inteligentes", 
      description: "Alertas en tiempo real para mensajes prioritarios que requieren atencion humana." 
    },
    { 
      icon: BarChart3, 
      title: "Analiticas Avanzadas", 
      description: "Dashboard con metricas de rendimiento por canal, tiempo de respuesta y satisfaccion." 
    },
    { 
      icon: Link2, 
      title: "Integraciones Nativas", 
      description: "Conecta con mas de 100 herramientas incluyendo Zapier, Make y APIs personalizadas." 
    },
    { 
      icon: Settings, 
      title: "Reglas Personalizadas", 
      description: "Define reglas de enrutamiento, asignacion y priorizacion segun tus necesidades." 
    },
  ],
  stats: [
    { value: "-90%", label: "Tiempo respuesta" },
    { value: "+50%", label: "Productividad" },
    { value: "100+", label: "Integraciones" },
    { value: "24/7", label: "Automatizacion" },
  ],
  relatedServices: [
    { 
      title: "IA Conversacional", 
      description: "Chatbots y agentes de voz inteligentes para atencion 24/7.",
      href: "/soluciones/ia-conversacional"
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
  ctaTitle: "Listo para unificar",
  ctaAccent: "todos tus canales?",
  ctaDescription: "Descubre como la automatizacion omnicanal puede simplificar tus operaciones y mejorar la experiencia del cliente.",
  accentColor: "blue",
}

export function OmnichannelClient() {
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
