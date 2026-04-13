"use client"

import { useTranslations } from "next-intl"

export function ClarificationBlock() {
  const t = useTranslations("clarification")

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-8 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 opacity-50 dark:opacity-30"
        style={{
          background: "linear-gradient(135deg, rgba(0,120,170,0.03) 0%, transparent 50%, rgba(124,58,237,0.03) 100%)",
        }}
      />
      
      {/* Top border accent */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(0,120,170,0.2) 20%, rgba(124,58,237,0.2) 80%, transparent 100%)",
        }}
      />
      
      <div className="max-w-4xl mx-auto relative">
        {/* Editorial layout with accent */}
        <div className="relative">
          {/* Decorative quote mark */}
          <div className="absolute -left-4 sm:-left-8 -top-4 text-6xl sm:text-8xl font-serif text-[#0078AA]/10 dark:text-[#00D4FF]/10 select-none leading-none">
            &ldquo;
          </div>
          
          {/* Title as a statement */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-8 sm:mb-10 pl-4 sm:pl-0">
            {t("title")}
          </h2>
          
          {/* Content with better hierarchy */}
          <div className="space-y-6 sm:space-y-8 pl-4 sm:pl-0">
            <p className="text-foreground/65 text-base sm:text-lg md:text-xl leading-relaxed">
              {t("p1")}
            </p>
            
            {/* Key statement - highlighted */}
            <div className="relative py-6 px-6 sm:px-8 rounded-xl bg-gradient-to-r from-[#0078AA]/[0.06] to-[#7C3AED]/[0.06] border-l-4 border-[#0078AA]">
              <p className="text-foreground font-semibold text-lg sm:text-xl md:text-2xl leading-relaxed">
                {t("p2")}
              </p>
            </div>
            
            <p className="text-foreground/65 text-base sm:text-lg md:text-xl leading-relaxed">
              {t("p3")}
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom border accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(0,120,170,0.2) 20%, rgba(124,58,237,0.2) 80%, transparent 100%)",
        }}
      />
    </section>
  )
}
