"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslations } from "next-intl"

export function FinalCTABlock() {
  const t = useTranslations("cta")

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {t("title_1")}{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            {t("title_2")}
          </span>
          {" "}{t("title_3")}
        </h2>
        <p className="text-lg text-foreground/60 max-w-xl mx-auto">
          {t("subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-[var(--neon-blue)] text-black rounded-full px-8 py-4 text-lg font-medium hover:scale-105 transition-all group animate-neon-pulse">
            <Link href="/demo">
              {t("demo")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-4 text-lg border-foreground/20 hover:bg-foreground/10 text-foreground">
            <Link href="/contacto">
              {t("contact")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
