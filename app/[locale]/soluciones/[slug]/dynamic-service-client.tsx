"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Link from "next/link"
import { ArrowRight, Check, Phone, MessageSquare, Globe, Shield, Home, BarChart3, FileText, Megaphone, Zap, Bot, Users, Headphones, Calendar, Mail, Database, Settings, Cpu, Sparkles, Clock, Target, PiggyBank, Plug, TrendingUp, CheckCircle, FolderOpen, Scan, Repeat, LayoutDashboard, Star, ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { CTASection } from "@/components/cta-section"
import { useFormModals } from "@/components/contact-form-modals"
import type { WPService } from "@/lib/wordpress"
import { stripHtml } from "@/lib/wordpress"

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Phone,
  MessageSquare,
  Globe,
  Shield,
  Home,
  BarChart3,
  FileText,
  Megaphone,
  Zap,
  Bot,
  Users,
  Headphones,
  Calendar,
  Mail,
  Database,
  Settings,
  Cpu,
  Sparkles,
  Clock,
  Target,
  PiggyBank,
  Plug,
  TrendingUp,
  CheckCircle,
  FolderOpen,
  Scan,
  Repeat,
  LayoutDashboard,
  Star,
  Check,
}

interface TOCItem {
  id: string
  text: string
}

interface DynamicServiceClientProps {
  service: WPService
}

// Stats data for solution pages
const solutionStats = {
  default: [
    { value: "24/7", label: "Atención continua" },
    { value: "0", label: "Llamadas perdidas" },
    { value: "60-80%", label: "Reducción de costes" },
    { value: "92%", label: "Satisfacción cliente" },
  ],
}

// Other solutions for navigation
const otherSolutions = [
  { label: "IA para Call Center", href: "/soluciones/atencion-telefonica-ia", slug: "atencion-telefonica-ia" },
  { label: "WhatsApp IA", href: "/soluciones/whatsapp-ia-empresas", slug: "whatsapp-ia-empresas" },
  { label: "Chat Web IA", href: "/soluciones/agente-chat-web-ia", slug: "agente-chat-web-ia" },
  { label: "Ventas con IA", href: "/soluciones/agente-ventas-ia", slug: "agente-ventas-ia" },
  { label: "Soporte IA", href: "/soluciones/agente-soporte-ia", slug: "agente-soporte-ia" },
  { label: "Agendamiento IA", href: "/soluciones/agente-agendamientos-ia", slug: "agente-agendamientos-ia" },
  { label: "LeadGen IA", href: "/soluciones/lead-generation-ia", slug: "lead-generation-ia" },
  { label: "CRM Automation", href: "/soluciones/crm-automation-ia", slug: "crm-automation-ia" },
]

export function DynamicServiceClient({ service }: DynamicServiceClientProps) {
  const { openContactForm } = useFormModals()
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const contentRef = useRef<HTMLDivElement>(null)

  const title = stripHtml(service.title.rendered)
  const subtitle = service.acf?.subtitulo || ""
  const excerpt = stripHtml(service.excerpt.rendered)
  const MainIcon = iconMap[service.acf?.icono || "Zap"] || Zap
  const stats = solutionStats.default

  // Extract H2s from content for TOC
  useEffect(() => {
    if (contentRef.current) {
      const h2s = contentRef.current.querySelectorAll("h2")
      const items: TOCItem[] = []
      h2s.forEach((h2, index) => {
        const id = `section-${index}`
        h2.id = id
        items.push({ id, text: h2.textContent || "" })
      })
      setTocItems(items)
      if (items.length > 0) setActiveId(items[0].id)
    }
  }, [service.content.rendered])

  // Scroll spy for TOC
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 }
    )

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [tocItems])

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const yOffset = -100
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }, [])

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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="pt-24 pb-4 px-4" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 dark:text-white/50 hover:text-[rgb(0,120,170)] transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <Link href="/soluciones" className="text-gray-500 dark:text-white/50 hover:text-[rgb(0,120,170)] transition-colors">
                Soluciones
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <span className="text-gray-900 dark:text-white font-medium">{title}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div 
            className="inline-flex items-center justify-center w-[72px] h-[72px] rounded-2xl mb-8"
            style={{ 
              background: "linear-gradient(to bottom right, rgba(0,120,170,0.2), rgba(124,58,237,0.1))",
              border: "1px solid rgba(0,120,170,0.2)"
            }}
          >
            <MainIcon size={32} className="text-[rgb(0,120,170)] dark:text-cyan-400" />
          </div>

          {/* H1 */}
          <h1 
            className="text-5xl md:text-6xl font-extrabold leading-tight text-balance mb-4"
            style={{ color: "rgb(17,24,39)" }}
          >
            <span className="dark:text-white">{title}</span>
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-xl md:text-2xl font-medium mb-6 text-[rgb(0,120,170)] dark:text-cyan-400">
              {subtitle}
            </p>
          )}

          {/* Description */}
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            style={{ color: "rgb(75,85,99)" }}
          >
            <span className="dark:text-slate-300">{excerpt}</span>
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={openContactForm}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-medium transition-all duration-200 hover:opacity-90 hover:shadow-lg cursor-pointer"
              style={{ background: "linear-gradient(to right, rgb(0,120,170), rgb(124,58,237))" }}
            >
              Pedir Demo
              <ArrowRight size={18} />
            </button>
            <a
              href="tel:+34931229129"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium transition-all duration-200 border hover:bg-gray-50 dark:hover:bg-white/5"
              style={{ 
                borderColor: "rgb(229,231,235)",
                color: "rgb(17,24,39)"
              }}
            >
              <span className="dark:text-white dark:border-white/20">
                <Phone size={18} className="inline mr-2" />
                Escucha la voz IA
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content (65%) */}
            <div className="lg:w-[65%]">
              <div 
                ref={contentRef}
                className="wp-content"
                dangerouslySetInnerHTML={{ __html: service.content.rendered }}
              />
            </div>

            {/* Sidebar (35%) */}
            <aside className="lg:w-[35%]">
              <div className="lg:sticky lg:top-28 space-y-5">
                {/* Table of Contents */}
                {tocItems.length > 0 && (
                  <nav
                    className="p-6 rounded-2xl"
                    style={{ 
                      backgroundColor: "rgb(255,255,255)",
                      border: "1px solid rgb(229,231,235)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.06)"
                    }}
                    aria-label="Índice de contenido"
                  >
                    <div className="dark:bg-gray-900 dark:border-white/10">
                      <p 
                        className="text-xs uppercase tracking-wider font-semibold mb-4"
                        style={{ color: "rgb(107,114,128)" }}
                      >
                        <span className="dark:text-gray-400">En esta página</span>
                      </p>
                      <ul className="space-y-1">
                        {tocItems.map((item) => (
                          <li key={item.id}>
                            <button
                              onClick={() => scrollToSection(item.id)}
                              className={`w-full text-left py-2 text-sm transition-all duration-200 cursor-pointer ${
                                activeId === item.id
                                  ? "text-[rgb(0,120,170)] font-medium border-l-2 border-[rgb(0,120,170)] pl-3"
                                  : "text-gray-600 dark:text-gray-300 hover:text-[rgb(0,120,170)] pl-0"
                              }`}
                            >
                              {item.text}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </nav>
                )}

                {/* Demo CTA Card */}
                <div
                  className="p-6 rounded-2xl"
                  style={{ 
                    background: "linear-gradient(to bottom right, rgba(0,120,170,0.05), rgba(124,58,237,0.05))",
                    border: "1px solid rgba(0,120,170,0.2)"
                  }}
                >
                  <div className="dark:from-cyan-900/20 dark:to-violet-900/20 dark:border-cyan-500/20">
                    <h3 
                      className="text-lg font-semibold mb-2"
                      style={{ color: "rgb(17,24,39)" }}
                    >
                      <span className="dark:text-white">¿Listo para empezar?</span>
                    </h3>
                    <p 
                      className="text-sm mb-4"
                      style={{ color: "rgb(107,114,128)" }}
                    >
                      <span className="dark:text-gray-400">Configura tu agente IA en menos de 48h</span>
                    </p>
                    <button
                      onClick={openContactForm}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:opacity-90 cursor-pointer"
                      style={{ background: "linear-gradient(to right, rgb(0,120,170), rgb(124,58,237))" }}
                    >
                      Solicitar Demo
                      <ArrowRight size={16} />
                    </button>
                    <p 
                      className="text-xs text-center mt-3"
                      style={{ color: "rgb(107,114,128)" }}
                    >
                      <span className="dark:text-gray-500">o llámanos: +34 931 229 129</span>
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl text-center"
                style={{ 
                  backgroundColor: "rgb(255,255,255)",
                  border: "1px solid rgb(229,231,235)"
                }}
              >
                <div className="dark:bg-gray-900 dark:border-white/10">
                  <p 
                    className="text-4xl font-extrabold mb-2"
                    style={{ 
                      background: "linear-gradient(to right, rgb(0,120,170), rgb(124,58,237))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}
                  >
                    {stat.value}
                  </p>
                  <p 
                    className="text-sm"
                    style={{ color: "rgb(107,114,128)" }}
                  >
                    <span className="dark:text-gray-400">{stat.label}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Logos */}
      <section className="px-4 py-12 border-t border-b" style={{ borderColor: "rgb(229,231,235)" }}>
        <div className="dark:border-white/10">
          <div className="max-w-4xl mx-auto">
            <p 
              className="text-center text-xs uppercase tracking-wider mb-8"
              style={{ color: "rgb(107,114,128)" }}
            >
              <span className="dark:text-gray-400">Tecnología que impulsa nuestros agentes</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12">
              {[
                { src: "/images/partners/openai.svg", alt: "OpenAI" },
                { src: "/images/partners/anthropic.svg", alt: "Anthropic" },
                { src: "/images/partners/google-cloud.svg", alt: "Google Cloud" },
                { src: "/images/partners/twilio.svg", alt: "Twilio" },
                { src: "/images/partners/salesforce.svg", alt: "Salesforce" },
              ].map((logo) => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-6 sm:h-8 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 dark:brightness-0 dark:invert dark:opacity-40 dark:hover:brightness-100 dark:hover:invert-0 dark:hover:opacity-100"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Solutions */}
      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-bold mb-4"
              style={{ color: "rgb(17,24,39)" }}
            >
              <span className="dark:text-white">Otras Soluciones</span>
            </h2>
            <p style={{ color: "rgb(107,114,128)" }}>
              <span className="dark:text-gray-400">Descubre más formas de transformar tu negocio con IA</span>
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {otherSolutions
              .filter((s) => s.slug !== service.slug)
              .slice(0, 6)
              .map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
                  style={{ 
                    backgroundColor: "rgb(255,255,255)",
                    border: "1px solid rgb(229,231,235)",
                    color: "rgb(55,65,81)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgb(0,120,170)"
                    e.currentTarget.style.color = "rgb(0,120,170)"
                    e.currentTarget.style.backgroundColor = "rgba(0,120,170,0.05)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgb(229,231,235)"
                    e.currentTarget.style.color = "rgb(55,65,81)"
                    e.currentTarget.style.backgroundColor = "rgb(255,255,255)"
                  }}
                >
                  <span className="dark:bg-gray-900 dark:border-white/10 dark:text-gray-300 dark:hover:border-cyan-500 dark:hover:text-cyan-400 dark:hover:bg-cyan-900/10">
                    {s.label}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section 
        className="px-4 py-20 border-t border-b"
        style={{ 
          background: "linear-gradient(to bottom right, rgba(0,120,170,0.05), transparent, rgba(124,58,237,0.05))",
          borderColor: "rgb(229,231,235)"
        }}
      >
        <div className="dark:from-cyan-900/10 dark:to-violet-900/10 dark:border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span style={{ color: "rgb(17,24,39)" }} className="dark:text-white">
                ¿Listo para transformar la{" "}
              </span>
              <span 
                style={{ 
                  background: "linear-gradient(to right, rgb(0,120,170), rgb(124,58,237))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                atención al cliente
              </span>
              <span style={{ color: "rgb(17,24,39)" }} className="dark:text-white">?</span>
            </h2>
            <p 
              className="text-lg mb-8"
              style={{ color: "rgb(107,114,128)" }}
            >
              <span className="dark:text-gray-400">
                Agenda una demo gratuita y descubre cómo los agentes IA pueden revolucionar tu negocio
              </span>
            </p>
            <button
              onClick={openContactForm}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-white font-medium text-lg transition-all duration-200 hover:opacity-90 hover:shadow-lg cursor-pointer"
              style={{ background: "linear-gradient(to right, rgb(0,120,170), rgb(124,58,237))" }}
            >
              Habla con un Experto
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* WordPress Content Styles */}
      <style jsx global>{`
        /* WordPress Content Styling */
        .wp-content h2 {
          font-size: 28px;
          font-weight: 700;
          color: rgb(17, 24, 39);
          margin-top: 48px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid rgb(229, 231, 235);
        }
        
        .wp-content h2:first-child {
          margin-top: 0;
        }
        
        .dark .wp-content h2 {
          color: white;
          border-bottom-color: rgba(255, 255, 255, 0.1);
        }
        
        .wp-content h3 {
          font-size: 22px;
          font-weight: 600;
          color: rgb(17, 24, 39);
          margin-top: 32px;
          margin-bottom: 16px;
        }
        
        .dark .wp-content h3 {
          color: white;
        }
        
        .wp-content p {
          font-size: 17px;
          line-height: 1.8;
          color: rgb(75, 85, 99);
          margin-bottom: 20px;
        }
        
        .dark .wp-content p {
          color: rgb(209, 213, 219);
        }
        
        .wp-content strong {
          color: rgb(17, 24, 39);
          font-weight: 600;
        }
        
        .dark .wp-content strong {
          color: white;
        }
        
        .wp-content a {
          color: rgb(0, 120, 170);
          text-decoration: none;
          transition: text-decoration 0.2s;
        }
        
        .wp-content a:hover {
          text-decoration: underline;
        }
        
        .dark .wp-content a {
          color: rgb(34, 211, 238);
        }
        
        /* Unordered Lists with Check Icons */
        .wp-content ul {
          list-style: none;
          padding-left: 0;
          margin-bottom: 24px;
        }
        
        .wp-content ul li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
          font-size: 17px;
          line-height: 1.8;
          color: rgb(75, 85, 99);
        }
        
        .dark .wp-content ul li {
          color: rgb(209, 213, 219);
        }
        
        .wp-content ul li::before {
          content: "";
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          margin-top: 4px;
          background-color: rgba(0, 120, 170, 0.1);
          border-radius: 50%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgb(0,120,170)' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: center;
        }
        
        .dark .wp-content ul li::before {
          background-color: rgba(34, 211, 238, 0.2);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgb(34,211,238)' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
        }
        
        .wp-content ul li strong {
          color: rgb(17, 24, 39);
          font-weight: 600;
        }
        
        .dark .wp-content ul li strong {
          color: white;
        }
        
        /* Ordered Lists with Number Circles */
        .wp-content ol {
          list-style: none;
          padding-left: 0;
          margin-bottom: 24px;
          counter-reset: step-counter;
        }
        
        .wp-content ol li {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 16px;
          font-size: 17px;
          line-height: 1.8;
          color: rgb(75, 85, 99);
          position: relative;
          padding-left: 48px;
        }
        
        .dark .wp-content ol li {
          color: rgb(209, 213, 219);
        }
        
        .wp-content ol li::before {
          counter-increment: step-counter;
          content: counter(step-counter);
          position: absolute;
          left: 0;
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, rgb(0, 120, 170), rgb(124, 58, 237));
          border-radius: 50%;
          color: white;
          font-size: 14px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .wp-content ol li strong {
          color: rgb(17, 24, 39);
          font-weight: 600;
        }
        
        .dark .wp-content ol li strong {
          color: white;
        }
        
        /* Blockquotes */
        .wp-content blockquote {
          position: relative;
          background: linear-gradient(to bottom right, rgba(0, 120, 170, 0.05), rgba(124, 58, 237, 0.05));
          border-left: 4px solid;
          border-image: linear-gradient(to bottom, rgb(0, 120, 170), rgb(124, 58, 237)) 1;
          border-radius: 16px;
          padding: 24px 28px;
          margin: 40px 0;
          font-style: italic;
        }
        
        .dark .wp-content blockquote {
          background: linear-gradient(to bottom right, rgba(8, 145, 178, 0.2), rgba(139, 92, 246, 0.2));
        }
        
        .wp-content blockquote::before {
          content: '"';
          position: absolute;
          top: 12px;
          left: 20px;
          font-size: 48px;
          color: rgba(0, 120, 170, 0.3);
          font-family: Georgia, serif;
          line-height: 1;
        }
        
        .wp-content blockquote p {
          font-size: 17px;
          line-height: 1.7;
          color: rgb(55, 65, 81);
          margin-bottom: 0;
          padding-left: 20px;
        }
        
        .dark .wp-content blockquote p {
          color: rgb(229, 231, 235);
        }
      `}</style>
    </div>
  )
}
