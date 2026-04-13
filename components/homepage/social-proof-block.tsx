"use client"

import { useTranslations } from "next-intl"
import { TrendingUp, Clock, Users, Zap, Quote, ArrowRight, Building2 } from "lucide-react"
import Link from "next/link"

const metricIcons = [TrendingUp, Clock, Users, Zap]

export function SocialProofBlock() {
  const t = useTranslations("social_proof")

  const metrics = t.raw("metrics") as { value: string; label: string }[]

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        {/* Section badge */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/[0.06] border border-foreground/[0.1] dark:border-white/[0.1] text-xs font-semibold tracking-widest text-foreground/65 dark:text-white/55 uppercase backdrop-blur-sm">
            {t("badge") || "Resultados reales"}
          </span>
        </div>
        
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 sm:mb-20 text-foreground leading-[1.1] tracking-tight">
          {t("title")}
        </h2>

        {/* Metrics row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 sm:mb-20">
          {metrics.map((metric, index) => {
            const Icon = metricIcons[index] || TrendingUp
            return (
              <div key={index} className="card-premium p-6 sm:p-7 rounded-2xl text-center">
                <div className="w-10 h-10 mx-auto mb-4 rounded-xl bg-[#0078AA]/[0.06] dark:bg-[#00D4FF]/[0.08] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#0078AA] dark:text-[#00D4FF]" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1.5 tracking-tight">
                  {metric.value}
                </div>
                <p className="text-sm text-foreground/55 dark:text-foreground/45 leading-snug">
                  {metric.label}
                </p>
              </div>
            )
          })}
        </div>

        {/* Two-part proof: Testimonial + Case Study side by side */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Testimonial Card */}
          <div className="card-premium p-8 sm:p-10 rounded-2xl">
            <div className="mb-6">
              <Quote className="w-8 h-8 text-[#0078AA]/20 dark:text-[#00D4FF]/20" />
            </div>
            
            <blockquote className="mb-8">
              <p className="text-lg sm:text-xl text-foreground/75 dark:text-foreground/70 leading-[1.65] font-light italic">
                {t("quote")}
              </p>
            </blockquote>
            
            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0078AA] to-[#7C3AED] flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-bold">{t("quote_author_initials") || "MG"}</span>
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">
                  {t("quote_author_name") || "Miguel Garcia"}
                </p>
                <p className="text-xs text-foreground/50 dark:text-foreground/45">
                  {t("quote_author_role") || "Director de Operaciones"} &middot; {t("quote_company") || "Clinica Horizonte"}
                </p>
              </div>
            </div>
          </div>
          
          {/* Mini Case Study Card */}
          <div className="card-premium p-8 sm:p-10 rounded-2xl relative overflow-hidden">
            {/* Case study label */}
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="w-4 h-4 text-[#0078AA] dark:text-[#00D4FF]" />
              <span className="text-xs font-semibold tracking-widest text-[#0078AA] dark:text-[#00D4FF] uppercase">
                {t("case_study_label") || "Caso de exito"}
              </span>
            </div>
            
            {/* Company */}
            <h3 className="text-lg font-bold text-foreground mb-1">
              {t("case_study_company") || "Clinica Horizonte"}
            </h3>
            <p className="text-xs text-foreground/45 dark:text-foreground/40 mb-6">
              {t("case_study_type") || "Red de clinicas privadas -- 12 centros"}
            </p>
            
            {/* Challenge / Solution / Result */}
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-foreground/45 dark:text-foreground/40 uppercase tracking-wide mb-1">
                  {t("case_study_challenge_label") || "Desafio"}
                </p>
                <p className="text-sm text-foreground/60 dark:text-foreground/55 leading-relaxed">
                  {t("case_study_challenge") || "Perdian el 40% de llamadas fuera de horario y los tiempos de espera superaban los 8 minutos."}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground/45 dark:text-foreground/40 uppercase tracking-wide mb-1">
                  {t("case_study_solution_label") || "Solucion"}
                </p>
                <p className="text-sm text-foreground/60 dark:text-foreground/55 leading-relaxed">
                  {t("case_study_solution") || "Agente IA con voz humana para atencion telefonica 24/7 integrado con su sistema de citas."}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground/45 dark:text-foreground/40 uppercase tracking-wide mb-1">
                  {t("case_study_result_label") || "Resultado"}
                </p>
                <p className="text-sm text-foreground/85 dark:text-foreground/80 font-semibold leading-relaxed">
                  {t("case_study_result") || "0 llamadas perdidas. Tiempo de respuesta reducido a 12 segundos. +35% en reservas confirmadas."}
                </p>
              </div>
            </div>
            
            {/* CTA */}
            <div className="mt-6 pt-5 border-t border-foreground/[0.05] dark:border-white/[0.06]">
              <Link
                href="/casos-exito"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0078AA] dark:text-[#00D4FF] hover:underline group"
              >
                {t("case_study_cta") || "Ver casos de exito"}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
