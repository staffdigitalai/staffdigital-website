"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

interface SolutionItem {
  label: string
  href: string
}

interface Category {
  name: string
  items: SolutionItem[]
}

export function SolutionsBlock() {
  const t = useTranslations("solutions_explore")

  const categories = t.raw("categories") as Category[]

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-8 animate-fade-in-section relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-14 sm:mb-16 text-foreground leading-tight tracking-tight">
          {t("title")}
        </h2>

        {/* 3 Columns */}
        <div className="grid md:grid-cols-3 gap-5">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="card-premium p-6 sm:p-8 rounded-xl"
            >
              <h3 className="text-base font-bold text-foreground mb-5 pb-4 border-b border-foreground/[0.06] dark:border-white/[0.08]">
                {category.name}
              </h3>
              <ul className="space-y-2.5">
                {category.items.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-foreground/50 hover:text-[#0078AA] dark:hover:text-[#00D4FF] text-sm transition-all duration-200 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-14">
          <Link
            href="/soluciones"
            className="group relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white transition-all duration-400 hover:scale-[1.02] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0078AA 0%, #5B21B6 100%)",
              boxShadow: "0 4px 16px rgba(0,120,170,0.25), 0 8px 24px rgba(91,33,182,0.15)",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {t("cta")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </span>
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" 
              style={{ background: "linear-gradient(135deg, #0090CC 0%, #7C3AED 100%)" }} 
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
