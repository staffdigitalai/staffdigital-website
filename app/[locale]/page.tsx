import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { BackgroundEffects } from "@/components/background-effects"

// Homepage blocks — new positioning: AI operational platform
import { HeroBlock } from "@/components/homepage/hero-block"
import { AIWorking247Block } from "@/components/homepage/ai-working-247-block"
import { ClarificationBlock } from "@/components/homepage/clarification-block"
import { WhatWeDoBlock } from "@/components/homepage/what-we-do-block"
import { UseCasesBlock } from "@/components/homepage/use-cases-block"
import { HowItWorksBlock } from "@/components/homepage/how-it-works-block"
import { DifferentiationBlock } from "@/components/homepage/differentiation-block"
import { SocialProofBlock } from "@/components/homepage/social-proof-block"
import { VoiceBlock } from "@/components/homepage/voice-block"
import { SolutionsBlock } from "@/components/homepage/solutions-block"
import { CTABlock } from "@/components/homepage/cta-block"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden transition-colors duration-300">
      <main className="min-h-screen relative overflow-hidden">
        {/* Aurora background */}
        <div className="fixed inset-0 w-full h-full dark:opacity-100 opacity-30 transition-opacity duration-500">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>

        {/* Neon background effects (grid + floating orbs) */}
        <BackgroundEffects intensity="medium" />

        <div className="relative z-10">
          <GlassmorphismNav />

          {/* 1 — Hero */}
          <div id="inicio">
            <HeroBlock />
          </div>

          {/* 2 — AI Working 24/7 */}
          <AIWorking247Block />

          {/* 3 — Clarification */}
          <ClarificationBlock />

          {/* 3 — What We Do (Understand → Analyze → Decide → Execute) */}
          <WhatWeDoBlock />

          {/* 4 — Use Cases */}
          <div id="soluciones">
            <UseCasesBlock />
          </div>

          {/* 5 — How It Works (pipeline) */}
          <HowItWorksBlock />

          {/* 6 — Differentiation */}
          <DifferentiationBlock />

          {/* 7 — Social Proof */}
          <SocialProofBlock />

          {/* 8 — Voice */}
          <VoiceBlock />

          {/* 9 — Solutions (3 categories) */}
          <SolutionsBlock />

          {/* 10 — Final CTA */}
          <CTABlock />

          <Footer />
        </div>
      </main>
    </div>
  )
}
