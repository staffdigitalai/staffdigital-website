"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Play, 
  ChevronRight, 
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
import type { WPService, WPSector } from "@/lib/wordpress"
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

// Sector icon mapping
const sectorIconMap: Record<string, LucideIcon> = {
  concesionarios: Building2,
  clinicas: Stethoscope,
  inmobiliarias: Home,
  restaurantes: ShoppingCart,
  ecommerce: ShoppingCart,
  turismo: Globe,
  educacion: GraduationCap,
  "servicios-locales": Wrench,
}

// Other solutions for cross-linking
const allSolutions = [
  { label: "IA para Call Center", href: "/soluciones/atencion-telefonica-ia", slug: "atencion-telefonica-ia" },
  { label: "WhatsApp IA", href: "/soluciones/whatsapp-ia-empresas", slug: "whatsapp-ia-empresas" },
  { label: "Chat Web IA", href: "/soluciones/agente-chat-web-ia", slug: "agente-chat-web-ia" },
  { label: "Ventas con IA", href: "/soluciones/agente-ventas-ia", slug: "agente-ventas-ia" },
  { label: "Soporte IA", href: "/soluciones/agente-soporte-ia", slug: "agente-soporte-ia" },
  { label: "Agendamiento IA", href: "/soluciones/agente-agendamientos-ia", slug: "agente-agendamientos-ia" },
  { label: "Lead Generation IA", href: "/soluciones/lead-generation-ia", slug: "lead-generation-ia" },
  { label: "CRM Automation IA", href: "/soluciones/crm-automation-ia", slug: "crm-automation-ia" },
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
  sectors?: WPSector[]
}

export function DynamicServiceClient({ service, sectors = [] }: DynamicServiceClientProps) {
  const { openContactForm } = useFormModals()
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  
  const title = stripHtml(service.title.rendered)
  const excerpt = stripHtml(service.excerpt.rendered)
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

  // Breadcrumb JSON-LD
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
      {/* JSON-LD */}
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
          SECCIÓN 1 — BREADCRUMB
          ═══════════════════════════════════════ */}
      <nav className="pt-28 pb-4 px-4 max-w-6xl mx-auto">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              Inicio
            </Link>
          </li>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <li>
            <Link href="/soluciones" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              Soluciones
            </Link>
          </li>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <li className="text-gray-900 dark:text-white font-medium">
            {title}
          </li>
        </ol>
      </nav>

      {/* ═══════════════════════════════════════
          SECCIÓN 2 — HERO (centrado)
          ═══════════════════════════════════════ */}
      <section className="px-4 pt-8 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
            {excerpt}
          </p>

          <div className="flex gap-4 justify-center mt-8">
            <button
              onClick={openContactForm}
              className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] text-white rounded-[20px] px-6 py-3 font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Pedir Demo
            </button>
            <a
              href="tel:+34931229129"
              className="border border-gray-300 dark:border-[rgb(61,61,64)] rounded-[20px] px-6 py-3 text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              Escucha la voz IA
            </a>
          </div>

          {/* Video Placeholder - Improved */}
          <div 
            className="mt-12 max-w-5xl mx-auto aspect-video rounded-[20px] border border-gray-200 dark:border-[rgb(61,61,64)] flex items-center justify-center shadow-lg shadow-[#0078AA]/10"
            style={{ background: "linear-gradient(135deg, rgba(0,120,170,0.05), rgba(124,58,237,0.05))" }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#0078AA] to-[#7C3AED] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Demo: Agente IA en acción</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECCIÓN 3 — STATS BAR (3 métricas)
          ═══════════════════════════════════════ */}
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
          SECCIÓN 4 — CANALES (3 cards)
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
          SECCIÓN 5 — FEATURES (6 cards grid)
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
          SECCIÓN 6 — BENEFICIOS (2 columnas)
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
            <div className="grid gap-4">
              <div className="rounded-[20px] bg-white dark:bg-[rgba(101,101,106,0.16)] border border-gray-200 dark:border-[rgb(61,61,64)] p-4 flex items-center gap-3">
                <span className="text-2xl font-bold text-[#0078AA]">80%</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">menos costes operativos</span>
              </div>
              <div className="rounded-[20px] bg-white dark:bg-[rgba(101,101,106,0.16)] border border-gray-200 dark:border-[rgb(61,61,64)] p-4 flex items-center gap-3">
                <span className="text-2xl font-bold text-[#7C3AED]">24/7</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">disponible sin interrupciones</span>
              </div>
              <div className="rounded-[20px] bg-white dark:bg-[rgba(101,101,106,0.16)] border border-gray-200 dark:border-[rgb(61,61,64)] p-4 flex items-center gap-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">48h</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">implementación completa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECCIÓN 7 — SECTORES (pills como links)
          ═══════════════════════════════════════ */}
      {sectors.length > 0 && (
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Ideal para estos sectores
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Agentes IA entrenados con el conocimiento de cada industria
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {sectors.map((sector) => {
                const Icon = sectorIconMap[sector.slug] || Building2
                return (
                  <Link 
                    key={sector.id}
                    href={`/sectores/${sector.slug}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[rgba(101,101,106,0.16)] border border-gray-200 dark:border-[rgb(61,61,64)] hover:border-[#0078AA]/50 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-[#0078AA]" />
                    <span className="text-gray-900 dark:text-white text-sm font-medium">{sector.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          SECCIÓN 8 — TESTIMONIAL
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
          SECCIÓN 9 — FAQ (accordion)
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
          SECCIÓN 10 — OTRAS SOLUCIONES (pills)
          ═══════════════════════════════════════ */}
      <section className="px-4 py-16 border-t border-gray-200 dark:border-[rgb(61,61,64)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Otras soluciones IA
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {allSolutions.filter(s => s.slug !== service.slug).map((s, i) => (
              <Link
                key={i}
                href={s.href}
                className="px-4 py-2 rounded-full bg-white dark:bg-[rgba(101,101,106,0.16)] border border-gray-200 dark:border-[rgb(61,61,64)] text-gray-900 dark:text-white text-sm font-medium hover:border-[#0078AA]/50 transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECCIÓN 11 — CTA FINAL
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
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0078AA] to-[#7C3AED] text-white rounded-[20px] px-8 py-4 font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Solicitar Demo Gratuita
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-[rgb(61,61,64)] rounded-[20px] px-8 py-4 text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              Contactar con ventas
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
