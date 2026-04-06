"use client"

import { Search, Settings, Brain, TestTube, GraduationCap, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslations } from "next-intl"

const stepIcons = [Search, Settings, Brain, TestTube, GraduationCap, Rocket]

export function MethodologyBlock() {
  const t = useTranslations("methodology")

  const translatedSteps = t.raw("steps") as { title: string; description: string }[]

  const steps = translatedSteps.map((step, i) => ({
    ...step,
    icon: stepIcons[i],
    num: String(i + 1),
  }))

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${t("title_1")} ${t("title_2")}`,
    description: t("subtitle"),
    totalTime: "P6W",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  }

  return (
    <section className="py-20 px-4">
      {/* HowTo structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title_1")}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              {t("title_2")}
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div key={s.num} className="p-5 rounded-2xl border border-foreground/10 bg-foreground/5 space-y-3 hover:bg-foreground/10 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-foreground/70 text-sm font-bold">{s.num}</span>
                <s.icon className="w-5 h-5 text-foreground/50" />
              </div>
              <h3 className="font-bold text-foreground">{s.title}</h3>
              <p className="text-sm text-foreground/50">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link href="/contacto">
              {t("cta")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
