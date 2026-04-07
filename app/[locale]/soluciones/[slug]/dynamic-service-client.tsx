"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Play, 
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
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
            {excerpt}
          </p>

          <div className="flex gap-4 justify-center mt-8">
            <button
              onClick={openContactForm}
              className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] text-white rounded-lg px-6 py-3 font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Pedir Demo
            </button>
            <a
              href="tel:+34931229129"
              className="border-2 border-gray-800 dark:border-white rounded-lg px-6 py-3 text-gray-900 dark:text-white font-semibold bg-white/50 dark:bg-white/10 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-white/20 transition-colors"
            >
              Escucha la voz IA
            </a>
          </div>

          {/* Video Placeholder */}
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
          SECCIÓN 2 — STATS BAR (3 métricas)
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
              {solucionesContextuales.map((sol) => {
                // Find matching icon from allSolutions array (fallback only)
                const matchingSol = allSolutions.find(s => s.slug === sol.solucion_slug)
                const Icon = matchingSol ? getIcon(matchingSol.icon) : Sparkles
                return (
                  <Link
                    key={sol.solucion_slug}
                    href={`/soluciones/${sol.solucion_slug}`}
                    className="card-elevated group rounded-2xl hover:border-foreground/25 transition-all hover:scale-[1.02] overflow-hidden hover:shadow-lg hover:shadow-[var(--neon-blue)]/10"
                  >
                    {/* Image area - real image from WP or fallback */}
                    <div className="relative w-full h-32 overflow-hidden">
                      {sol.solucion_imagen ? (
                        <Image
                          src={sol.solucion_imagen}
                          alt={sol.solucion_nombre}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          loading="lazy"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0078AA]/10 to-[#7C3AED]/10 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-[#0078AA]/40" />
                        </div>
                      )}
                      {/* Brand overlay */}
                      <div 
                        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-50"
                        style={{ background: "linear-gradient(135deg, rgba(0, 120, 170, 0.06), rgba(124, 58, 237, 0.10))" }}
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
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
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
