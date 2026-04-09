"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  ChevronDown,
  Phone, 
  MessageSquare, 
  Globe, 
  Check,
  ArrowRight,
  Building2,
  Headphones,
  Calendar,
  ShoppingCart,
  Stethoscope,
  Home,
  GraduationCap,
  Wrench,
  Users,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  Bot,
  Mail,
  Sparkles,
  Target,
  BarChart3,
  Settings,
  Layers
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useFormModals } from "@/components/contact-form-modals"
import { SolutionMockup } from "@/components/solution-mockups"
import type { WPService } from "@/lib/wordpress"
import { stripHtml } from "@/lib/wordpress"

// Icon mapping for ACF icon field values
const iconMap: Record<string, LucideIcon> = {
  phone: Phone,
  "message-square": MessageSquare,
  whatsapp: MessageSquare,
  globe: Globe,
  chat: Globe,
  users: Users,
  "trending-up": TrendingUp,
  headphones: Headphones,
  calendar: Calendar,
  "shopping-cart": ShoppingCart,
  building: Building2,
  stethoscope: Stethoscope,
  home: Home,
  graduation: GraduationCap,
  wrench: Wrench,
  clock: Clock,
  shield: Shield,
  zap: Zap,
  bot: Bot,
  mail: Mail,
  sparkles: Sparkles,
  target: Target,
  chart: BarChart3,
  settings: Settings,
  layers: Layers,
}

// Sector icon mapping (fallback when no image)
const sectorIconMap: Record<string, LucideIcon> = {
  concesionarios: Building2,
  clinicas: Stethoscope,
  inmobiliarias: Home,
  restaurantes: ShoppingCart,
  ecommerce: ShoppingCart,
  turismo: Globe,
  "turismo-hoteleria": Globe,
  educacion: GraduationCap,
  "servicios-locales": Wrench,
  "servicios-tecnicos": Wrench,
}

// Sector image mapping (same as homepage sectors-block.tsx)
const sectorImageMap: Record<string, { image: string; alt: string }> = {
  concesionarios: { image: "/images/sectors/concesionarios.jpg", alt: "Agente IA para concesionarios de automóviles" },
  clinicas: { image: "/images/sectors/clinicas.jpg", alt: "Agente IA para clínicas médicas" },
  inmobiliarias: { image: "/images/sectors/inmobiliarias.jpg", alt: "Agente IA para inmobiliarias" },
  restaurantes: { image: "/images/sectors/restaurantes.jpg", alt: "Agente IA para restaurantes" },
  ecommerce: { image: "/images/sectors/ecommerce.jpg", alt: "Agente IA para e-commerce" },
  turismo: { image: "/images/sectors/turismo.jpg", alt: "Agente IA para turismo y hoteles" },
  "turismo-hoteleria": { image: "/images/sectors/turismo.jpg", alt: "Agente IA para turismo y hoteles" },
  educacion: { image: "/images/sectors/educacion.jpg", alt: "Agente IA para educación" },
  "servicios-locales": { image: "/images/sectors/servicios-locales.jpg", alt: "Agente IA para servicios locales" },
  "servicios-tecnicos": { image: "/images/sectors/servicios-locales.jpg", alt: "Agente IA para servicios técnicos" },
}

// Helper to get sector image
const getSectorImage = (slug: string): { image: string; alt: string } | null => {
  return sectorImageMap[slug] || null
}



// Other solutions for cross-linking (hardcoded fallback)
const allSolutions = [
  { label: "IA para Call Center", description: "Automatiza llamadas entrantes y salientes", href: "/soluciones/atencion-telefonica-ia", slug: "atencion-telefonica-ia", icon: "phone" },
  { label: "WhatsApp IA", description: "Respuestas instantáneas en WhatsApp Business", href: "/soluciones/whatsapp-ia-empresas", slug: "whatsapp-ia-empresas", icon: "whatsapp" },
  { label: "Chat Web IA", description: "Widget inteligente para tu sitio web", href: "/soluciones/agente-chat-web-ia", slug: "agente-chat-web-ia", icon: "globe" },
  { label: "Ventas con IA", description: "Cierra más ventas con agentes automatizados", href: "/soluciones/agente-ventas-ia", slug: "agente-ventas-ia", icon: "trending-up" },
  { label: "Soporte IA", description: "Resuelve tickets 24/7 sin esperas", href: "/soluciones/agente-soporte-ia", slug: "agente-soporte-ia", icon: "headphones" },
  { label: "Agendamiento IA", description: "Gestiona citas automáticamente", href: "/soluciones/agente-agendamientos-ia", slug: "agente-agendamientos-ia", icon: "calendar" },
  { label: "Lead Generation IA", description: "Captura y cualifica leads 24/7", href: "/soluciones/lead-generation-ia", slug: "lead-generation-ia", icon: "target" },
  { label: "CRM Automation IA", description: "Sincroniza datos automáticamente", href: "/soluciones/crm-automation-ia", slug: "crm-automation-ia", icon: "layers" },
]



// Fallback data when ACF fields are empty
const fallbackStats = [
  { valor: "24/7", etiqueta: "Atención continua" },
  { valor: "80%", etiqueta: "Reducción de costes" },
  { valor: "92%", etiqueta: "Satisfacción cliente" },
]

const fallbackCanales = [
  { titulo: "Llamadas Telefónicas", descripcion: "Voz natural con latencia mínima. Atiende y realiza llamadas 24/7.", icono: "phone", color: "#0078AA" },
  { titulo: "WhatsApp Business", descripcion: "Respuestas instantáneas con contexto completo del cliente.", icono: "whatsapp", color: "#25D366" },
  { titulo: "Chat Web", descripcion: "Widget integrado en tu web con el mismo agente IA.", icono: "globe", color: "#7C3AED" },
]

const fallbackFeatures = [
  { titulo: "Agente IA con voz humana natural", icono: "bot" },
  { titulo: "Disponibilidad 24/7 sin interrupciones", icono: "clock" },
  { titulo: "Datos protegidos bajo GDPR", icono: "shield" },
  { titulo: "Integración en menos de 48h", icono: "zap" },
  { titulo: "Escalado automático según demanda", icono: "users" },
  { titulo: "Analytics y métricas en tiempo real", icono: "chart" },
]

const fallbackBeneficios = [
  { texto: "Reduce costes operativos hasta un 80% en atención al cliente" },
  { texto: "Elimina tiempos de espera: respuestas instantáneas 24/7" },
  { texto: "Aumenta la satisfacción del cliente con interacciones naturales" },
  { texto: "Escala tu equipo sin límites de contratación" },
  { texto: "Libera a tu equipo humano para tareas de alto valor" },
  { texto: "Integración perfecta con tu CRM y herramientas existentes" },
]

const fallbackTestimonial = {
  quote: "Desde que implementamos el agente IA de StaffDigital, hemos reducido un 75% las llamadas perdidas y aumentado las conversiones en un 40%.",
  nombre: "María García",
  cargo: "Directora de Operaciones",
  empresa: "AutoPremium Madrid",
}

interface DynamicServiceClientProps {
  service: WPService
}

export function DynamicServiceClient({ service }: DynamicServiceClientProps) {
  const { openContactForm } = useFormModals()
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  
  // Override title and excerpt for ia-omnicanal page
  const isOmnicanal = service.slug === "ia-omnicanal"
  const title = isOmnicanal 
    ? "Bandeja de Atención al Cliente Omnicanal con IA"
    : stripHtml(service.title.rendered)
  const excerpt = isOmnicanal
    ? "StaffDigital AI unifica WhatsApp, teléfono, chat web, email y redes sociales en una sola bandeja de entrada. Un agente IA, todos los canales, historial completo."
    : stripHtml(service.excerpt.rendered)
  const acf = service.acf || {}

  // Use ACF data or fallbacks
  const stats = acf.stats_bar?.length ? acf.stats_bar : fallbackStats
  const canales = acf.canales?.length ? acf.canales : fallbackCanales
  const features = acf.features?.length ? acf.features : fallbackFeatures
  const beneficios = acf.beneficios?.length ? acf.beneficios : fallbackBeneficios
  const faqItems = acf.faq_items || []
  const faqTitulo = acf.faq_titulo || "Preguntas frecuentes"
  
  const testimonialQuote = acf.testimonial_quote || fallbackTestimonial.quote
  const testimonialNombre = acf.testimonial_nombre || fallbackTestimonial.nombre
  const testimonialCargo = acf.testimonial_cargo || fallbackTestimonial.cargo
  const testimonialEmpresa = acf.testimonial_empresa || fallbackTestimonial.empresa
  const hasTestimonial = !!(acf.testimonial_quote || fallbackTestimonial.quote)

  // Use contextual sectors from ACF (populated by WP) - NO FALLBACK
  const sectoresContextuales = acf.sectores_contextuales?.sort((a, b) => a.sector_orden - b.sector_orden) || []

  // Use contextual solutions from ACF (populated by WP) - NO FALLBACK
  const solucionesContextuales = acf.soluciones_contextuales?.sort((a, b) => a.solucion_orden - b.solucion_orden) || []

  // Breadcrumb JSON-LD (SEO only - no visual breadcrumb)
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://staffdigital.ai" },
      { "@type": "ListItem", position: 2, name: "Soluciones", item: "https://staffdigital.ai/soluciones" },
      { "@type": "ListItem", position: 3, name: title, item: `https://staffdigital.ai/soluciones/${service.slug}` },
    ],
  }

  // FAQ JSON-LD for SEO
  const faqJsonLd = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(item => ({
      "@type": "Question",
      name: item.pregunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.respuesta,
      },
    })),
  } : null

  // Helper to get icon component
  const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Sparkles
    return iconMap[iconName.toLowerCase()] || Sparkles
  }

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* ═══════════════════════════════════════
          SECCIÓN 1 — HERO (centrado)
          ═══════════════════════════════════════ */}
      <section className="px-4 pt-32 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Pill Badge */}
          <div className="flex justify-center mb-6">
            <a href="/demo" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-colors">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: 'linear-gradient(135deg, #0078AA, #7C3AED)' }}>Nuevo</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Dashboard interactivo con tour guiado</span>
              <svg className="w-3.5 h-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
            {excerpt}
          </p>

          <div className="flex gap-4 justify-center mt-8">
            <a href="/contacto" className="inline-flex items-center justify-center border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full px-8 py-3 text-sm font-medium transition-colors">
              Talk to Sales
            </a>
            <a href="/demo" className="inline-flex items-center justify-center text-white rounded-full px-8 py-3 text-sm font-medium shadow-lg shadow-[#0078AA]/25" style={{ background: 'linear-gradient(135deg, #0078AA, #7C3AED)' }}>
              Pide tu Demo
            </a>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-8">
            {/* Canais sobrepostos */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center border-2 border-white dark:border-gray-900 relative z-[5]">
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#0078AA] flex items-center justify-center border-2 border-white dark:border-gray-900 relative z-[4]">
                  <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#7C3AED] flex items-center justify-center border-2 border-white dark:border-gray-900 relative z-[3]">
                  <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center border-2 border-white dark:border-gray-900 relative z-[2]">
                  <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Todos los canales</span>
            </div>

            {/* Separador */}
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 hidden sm:block" />

            {/* Estrelas */}
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">4.9/5</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">satisfacción</span>
            </div>

            {/* Separador */}
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 hidden sm:block" />

            {/* Activo en 48h */}
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Activo en <span className="font-medium text-gray-700 dark:text-gray-300">48h</span></span>
            </div>
          </div>

          {/* Live Dashboard Demo */}
          <div 
            className="mt-12 w-full max-w-6xl mx-auto rounded-[20px] border border-gray-200 dark:border-[rgb(61,61,64)] shadow-lg shadow-[#0078AA]/10 overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, rgba(0,120,170,0.05), rgba(124,58,237,0.05))" }}
          >
            {/* Badge */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Demo en vivo — StaffDigital.AI</span>
            </div>

            {/* Iframe */}
            <div className="aspect-video w-full">
              <iframe
                src="https://staffdigital.replit.app/"
                title="StaffDigital AI Dashboard Demo"
                className="w-full h-full border-0"
                loading="lazy"
                allow="clipboard-read; clipboard-write"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECCIÓN 2 — STATS BAR (3 métricas)
          ═════════════════════════════��═════════ */}
      <section className="px-4 py-10 border-y border-gray-200 dark:border-[rgb(61,61,64)]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-around items-center gap-8 md:gap-0">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && (
                <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-[rgb(61,61,64)] mr-12" />
              )}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
                  {stat.valor}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.etiqueta}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECCIÓN 3 — CANALES (3 cards)
          ═══════════════════════════════════════ */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Un agente, todos los canales
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Tu agente IA atiende con la misma calidad en todos los puntos de contacto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {canales.map((channel, i) => {
              const Icon = getIcon(channel.icono)
              const channelColor = channel.color || "#0078AA"
              return (
                <div 
                  key={i}
                  className="p-6 rounded-[20px] bg-white dark:bg-[rgba(101,101,106,0.16)] border border-gray-200 dark:border-[rgb(61,61,64)] hover:border-[#0078AA]/50 transition-colors"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${channelColor}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: channelColor }} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{channel.titulo}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{channel.descripcion}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECCIÓN 4 — FEATURES (6 cards grid)
          ═══════════════════════════════════════ */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Qué incluye esta solución
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Todo lo que necesitas para automatizar la atención al cliente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = getIcon(feature.icono)
              return (
                <div 
                  key={i}
                  className="p-6 rounded-[20px] bg-white dark:bg-[rgba(101,101,106,0.16)] border border-gray-200 dark:border-[rgb(61,61,64)]"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0078AA]/10 dark:bg-[#0078AA]/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#0078AA]" />
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium">{feature.titulo}</p>
                  {feature.descripcion && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{feature.descripcion}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECCIÓN 5 — BENEFICIOS (2 columnas)
          ═══════════════════════════════════════ */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Beneficios para tu negocio
              </h2>
              <ul className="space-y-4">
                {beneficios.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "linear-gradient(135deg, #0078AA, #7C3AED)" }}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">{benefit.texto}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Panel derecho con mini-cards de stats */}
            <div className="space-y-4">
              <div className="rounded-[20px] bg-white dark:bg-[rgba(101,101,106,0.16)] border border-gray-200 dark:border-[rgb(61,61,64)] p-5 flex items-center gap-4">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">80%</div>
                <span className="text-sm text-gray-600 dark:text-gray-400">menos costes operativos</span>
              </div>
              <div className="rounded-[20px] bg-white dark:bg-[rgba(101,101,106,0.16)] border border-gray-200 dark:border-[rgb(61,61,64)] p-5 flex items-center gap-4">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">24/7</div>
                <span className="text-sm text-gray-600 dark:text-gray-400">atención sin interrupciones</span>
              </div>
              <div className="rounded-[20px] bg-white dark:bg-[rgba(101,101,106,0.16)] border border-gray-200 dark:border-[rgb(61,61,64)] p-5 flex items-center gap-4">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">48h</div>
                <span className="text-sm text-gray-600 dark:text-gray-400">implementación completa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECCIÓN 6 — TESTIMONIAL
          ═══════════════════════════════════════ */}
      {hasTestimonial && (
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-12 rounded-[20px] bg-white dark:bg-[rgba(101,101,106,0.16)] border border-gray-200 dark:border-[rgb(61,61,64)]">
              <blockquote className="text-xl md:text-2xl text-gray-900 dark:text-white font-medium text-center mb-8">
                &ldquo;{testimonialQuote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0078AA] to-[#7C3AED] flex items-center justify-center text-white font-bold">
                  {testimonialNombre.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{testimonialNombre}</div>
                  <div className="text-sm text-gray-500">{testimonialCargo}, {testimonialEmpresa}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          SECCIÓN 7 — FAQ (accordion)
          ═══════════════════════════════════════ */}
      {faqItems.length > 0 && (
        <section className="px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {faqTitulo}
              </h2>
            </div>

            <div className="space-y-3">
              {faqItems.map((faq, i) => (
                <div 
                  key={i}
                  className="rounded-[20px] bg-white dark:bg-[rgba(101,101,106,0.16)] border border-gray-200 dark:border-[rgb(61,61,64)] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                    className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white pr-4">
                      {faq.pregunta}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-[#0078AA] flex-shrink-0 transition-transform duration-200 ${openFaqIndex === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaqIndex === i && (
                    <div className="px-5 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.respuesta}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          SECCIÓN 8 — AGENTES IA PARA TU SECTOR (cards com imagem)
          Only render if WP returns contextual sectors
          ═══════════════════════════════════════ */}
      {sectoresContextuales.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
              Agentes IA para tu sector
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-center mb-12">
              IA entrenada con el conocimiento de tu industria. Lista para atender desde el primer día.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sectoresContextuales.map((sector) => {
                const sectorImg = getSectorImage(sector.sector_slug)
                return (
                  <Link
                    key={sector.sector_slug}
                    href={`/sectores/${sector.sector_slug}`}
                    className="card-elevated group rounded-2xl hover:border-gray-300 dark:hover:border-foreground/20 transition-all hover:scale-[1.02] overflow-hidden"
                  >
                    <div className="relative w-full h-28">
                      {sectorImg ? (
                        <Image
                          src={sectorImg.image}
                          alt={sectorImg.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          loading="lazy"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0078AA]/10 to-[#7C3AED]/10 flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-[#0078AA]/40" />
                        </div>
                      )}
                      {/* Brand overlay */}
                      <div 
                        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-50"
                        style={{ background: "linear-gradient(135deg, rgba(0, 120, 170, 0.06), rgba(124, 58, 237, 0.10))" }}
                      />
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="font-bold text-foreground">{sector.sector_nombre}</h3>
                      <p className="text-sm text-gray-600 dark:text-foreground/60">{sector.sector_descripcion}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
            <div className="text-center mt-8">
              <Link href="/sectores" className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors">
                Ver todos los sectores →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          SECCIÓN 9 — SOLUCIONES IA POR CASO DE USO (cards 4 colunas)
          Only render if WP returns contextual solutions
          ═══════════════════════════════════════ */}
      {solucionesContextuales.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
              Soluciones IA por caso de uso
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-center mb-12">
              Cada agente resuelve un problema concreto. Todos conectados en una sola plataforma.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {solucionesContextuales.map((sol) => (
                  <Link
                    key={sol.solucion_slug}
                    href={`/soluciones/${sol.solucion_slug}`}
                    className="card-elevated group rounded-2xl hover:border-foreground/25 transition-all hover:scale-[1.02] overflow-hidden hover:shadow-lg hover:shadow-[var(--neon-blue)]/10"
                  >
                    {/* Dashboard mockup */}
                    <div className="relative w-full h-32 overflow-hidden rounded-t-2xl">
                      <SolutionMockup slug={sol.solucion_slug} />
                      {/* Subtle gradient overlay on hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.05))" }}
                      />
                    </div>
                    {/* Text content */}
                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-foreground group-hover:text-foreground/90">
                        {sol.solucion_nombre}
                      </h3>
                      <p className="text-sm text-foreground/50">
                        {sol.solucion_descripcion}
                      </p>
                      <span className="text-sm text-foreground/40 group-hover:text-foreground/70 flex items-center gap-1 transition-colors">
                        Ver solución <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </div>
                  </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═════════════════════════���═════════════
          SECCIÓN 10 — CTA FINAL
          ═══════════════════════════════════════ */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ¿Listo para automatizar tu atención al cliente?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Agenda una demo personalizada y descubre cómo los agentes IA pueden transformar tu negocio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openContactForm}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0078AA] to-[#7C3AED] text-white rounded-lg px-8 py-4 font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Solicitar Demo Gratuita
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-800 dark:border-white rounded-lg px-8 py-4 text-gray-900 dark:text-white font-semibold bg-white/50 dark:bg-white/10 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-white/20 transition-colors"
            >
              Contactar con ventas
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
