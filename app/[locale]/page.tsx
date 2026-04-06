import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { BackgroundEffects } from "@/components/background-effects"

// Homepage blocks (11 blocos)
import { HeroBlock } from "@/components/homepage/hero-block"
import { DoneForYouBlock } from "@/components/homepage/done-for-you-block"
import { ServicesBlock } from "@/components/homepage/services-block"
import { OmnichannelBlock } from "@/components/homepage/omnichannel-block"
import { SectorsBlock } from "@/components/homepage/sectors-block"
import { CRMBlock } from "@/components/homepage/crm-block"
import { ComparisonBlock } from "@/components/homepage/comparison-block"
import { SocialProofBlock } from "@/components/homepage/social-proof-block"
import { FAQBlock } from "@/components/homepage/faq-block"
import { AIWorking247Block } from "@/components/homepage/ai-working-247-block"
import { FinalCTABlock } from "@/components/homepage/final-cta-block"

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

          {/* Bloco 1 — Hero */}
          <div id="inicio">
            <HeroBlock />
          </div>

          {/* Bloco 2 — Nós Fazemos Tudo */}
          <DoneForYouBlock />

          {/* Bloco 3 — Serviços */}
          <div id="soluciones">
            <ServicesBlock />
          </div>

          {/* Bloco 4 — AI Working 24/7 Features */}
          <AIWorking247Block />

          {/* Bloco 5 — Omnichannel */}
          <OmnichannelBlock />

          {/* Bloco 6 — Sectores */}
          <div id="sectores">
            <SectorsBlock />
          </div>

          {/* Bloco 7 — CRM Automation */}
          <CRMBlock />

          {/* Bloco 8 — Comparativo */}
          <ComparisonBlock />

          {/* Bloco 9 — Prova Social */}
          <SocialProofBlock />

          {/* Bloco 10 — FAQ */}
          <FAQBlock />

          {/* CTA Final */}
          <FinalCTABlock />

          <Footer />
        </div>
      </main>
    </div>
  )
}
