"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Stethoscope, Smile, Scissors, UtensilsCrossed, Home, Car, Dumbbell, ShoppingBag, Building2, Wrench, GraduationCap, Warehouse, Building, Briefcase, Heart, Hotel, MessageSquare, Calendar, TrendingUp, Image, Camera, Video, Phone, Clock, Target, AlertTriangle, Users, FileText, CalendarCheck, BarChart3 } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageWrapper } from "@/components/page-wrapper"
import { CTASection } from "@/components/cta-section"
import { useFormModals } from "@/components/contact-form-modals"
import type { WPSectorPage } from "@/lib/wordpress"
import { stripHtml } from "@/lib/wordpress"

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Stethoscope,
  Smile,
  Scissors,
  UtensilsCrossed,
  Home,
  Car,
  Dumbbell,
  ShoppingBag,
  Building2,
  Wrench,
  GraduationCap,
  Warehouse,
  Building,
  Briefcase,
  Heart,
  Hotel,
  MessageSquare,
  Calendar,
  TrendingUp,
  Image,
  Camera,
  Video,
  Phone,
  Clock,
  Target,
  AlertTriangle,
  Users,
  FileText,
  CalendarCheck,
  BarChart3,
  Check,
}

interface DynamicSectorClientProps {
  sector: WPSectorPage
}

export function DynamicSectorClient({ sector }: DynamicSectorClientProps) {
  const { openContactForm, openBudgetForm } = useFormModals()
  const [counter, setCounter] = useState(0)
  const problemsRef = useRef<HTMLElement>(null)
  const solutionsRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)

  const title = sector.title.rendered
  const subtitle = sector.acf?.subtitulo || ""
  const excerpt = stripHtml(sector.excerpt.rendered)
  const MainIcon = iconMap[sector.acf?.icono || "Building2"] || Building2
  const problemas = sector.acf?.problemas_sector || []
  const soluciones = sector.acf?.soluciones || []
  const metricas = sector.acf?.metricas || []

  // Get first metric value for animated counter
  const firstMetricNum = metricas[0]?.valor 
    ? parseInt(metricas[0].valor.replace(/[^0-9]/g, ''), 10) || 0 
    : 0

  useEffect(() => {
    if (firstMetricNum === 0) return
    
    const duration = 2000
    const steps = 60
    const increment = firstMetricNum / steps
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setCounter(Math.min(Math.round(increment * currentStep), firstMetricNum))
      } else {
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [firstMetricNum])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in-up")
              }, i * 100)
            })
          }
        }
      },
      { threshold: 0.1 }
    )

    const refs = [problemsRef, solutionsRef, statsRef]
    for (const ref of refs) {
      if (ref.current) observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const breadcrumbs = [
    { label: "Sectores", href: "/sectores" },
    { label: title },
  ]

  return (
    <PageWrapper breadcrumbs={breadcrumbs}>
      {/* Hero Section */}
      <section className="px-4 pt-8 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 animate-fade-in-badge">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
            StaffDigital AI para {title}
          </div>

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 mb-8 animate-fade-in-badge">
            <MainIcon size={40} className="text-emerald-400" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight text-balance mb-4 animate-fade-in-heading">
            IA para{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          {subtitle && (
            <p className="text-xl md:text-2xl text-emerald-400/80 font-medium mb-6 animate-fade-in-subheading">
              {subtitle}
            </p>
          )}

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-subheading">
            {excerpt}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-buttons">
            <Button
              size="lg"
              onClick={openContactForm}
              className="bg-white text-black rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg group cursor-pointer w-full sm:w-auto"
            >
              Pide tu Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={openBudgetForm}
              className="bg-transparent text-white border-2 border-white/30 rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105 cursor-pointer backdrop-blur-sm w-full sm:w-auto"
            >
              Pedir Presupuesto
            </Button>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      {problemas.length > 0 && (
        <section ref={problemsRef} className="px-4 py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
                Problemas que resolvemos en{" "}
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
                Los desafios diarios que frenan tu negocio
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {problemas.map((problema, index) => (
                <div
                  key={index}
                  className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 group"
                >
                  <div className="h-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                      <AlertTriangle size={24} className="text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {problema.problema}
                    </h3>
                    <p className="text-white/60 leading-relaxed text-sm">
                      {problema.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Solutions Section */}
      {soluciones.length > 0 && (
        <section ref={solutionsRef} className="px-4 py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance fade-in-element opacity-0 translate-y-8 transition-all duration-1000">
                Como StaffDigital AI transforma tu{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {title.toLowerCase()}
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {soluciones.map((solucion, index) => {
                const SolutionIcon = iconMap[solucion.icono || "Check"] || Check
                return (
                  <div
                    key={index}
                    className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 group"
                  >
                    <div className="h-full p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <SolutionIcon size={24} className="text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {solucion.titulo}
                          </h3>
                          <p className="text-white/60 leading-relaxed">
                            {solucion.descripcion}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {metricas.length > 0 && (
        <section ref={statsRef} className="px-4 py-20 md:py-32">
          <div className="max-w-5xl mx-auto">
            <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                {metricas.map((metrica, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent mb-2">
                      {index === 0 && firstMetricNum > 0
                        ? metrica.valor.replace(/\d+/, String(counter))
                        : metrica.valor}
                    </p>
                    <p className="text-white/50 text-sm">{metrica.etiqueta}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* WordPress Content Section */}
      {sector.content.rendered && (
        <section className="px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-white/70 prose-p:leading-relaxed
                prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-ul:text-white/70 prose-li:marker:text-emerald-400"
              dangerouslySetInnerHTML={{ __html: sector.content.rendered }}
            />
          </div>
        </section>
      )}

      {/* Related Sectors */}
      <section className="px-4 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Otros Sectores
            </h2>
            <p className="text-white/60">
              Descubre como ayudamos a otras industrias
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sectores/clinicas"
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              Clinicas
            </Link>
            <Link
              href="/sectores/restaurantes"
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              Restaurantes
            </Link>
            <Link
              href="/sectores/inmobiliarias"
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              Inmobiliarias
            </Link>
            <Link
              href="/sectores/retail"
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              Retail
            </Link>
            <Link
              href="/sectores/gimnasios"
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              Gimnasios
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </PageWrapper>
  )
}
