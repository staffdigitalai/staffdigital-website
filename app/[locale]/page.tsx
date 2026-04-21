import type { Metadata } from "next"
import { buildPageMetadata } from "@/lib/wordpress"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { BackgroundEffects } from "@/components/background-effects"
import { CSSAurora } from "@/components/css-aurora"

// ─── SEO from WordPress Yoast + WPML ─────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata("homepage", locale, {
    title: "StaffDigital AI",
    description: "AI agents that act, decide and execute.",
  })
}

// Homepage blocks — AIWorking247 promoted to the hero-adjacent slot.
// Order:
//   Hero
//   → [TrustedByCarousel — placeholder, future PR]
//   → AIWorking247  (live demos show the product working in seconds)
//   → How it works  (Receive / Understand / Decide / Execute)
//   → Channels      (4 static cards — WhatsApp, Web, Phone, Email)
//   → Integrations
//   → Sectors
//   → SocialProof
//   → CTA
// Voice is intentionally NOT a standalone block — it's one of the four
// channels. Channels gives the 2x2 overview; AIWorking247 shows the
// same four surfaces in-motion. Complementary, not redundant.
import { HeroBlock } from "@/components/homepage/hero-block"
import { HowItWorksBlock } from "@/components/homepage/how-it-works-block"
import { ChannelsBlock } from "@/components/homepage/channels-block"
import { AIWorking247Block } from "@/components/homepage/ai-working-247-block"
import { IntegrationsBlock } from "@/components/homepage/integrations-block"
import { SectorsBlock } from "@/components/homepage/sectors-block"
import { SocialProofBlock } from "@/components/homepage/social-proof-block"
import { CTABlock } from "@/components/homepage/cta-block"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden transition-colors duration-300">
      <main className="min-h-screen relative overflow-hidden">
        {/* CSS animated aurora background — z-0 */}
        <CSSAurora />

        {/* Neon background effects (grid + floating orbs) — z-[1] */}
        <BackgroundEffects intensity="low" />

        <div className="relative z-10">
          <GlassmorphismNav />

          {/* 1 — Hero */}
          <div id="inicio">
            <HeroBlock />
          </div>

          {/* Solid background zone — rounded top creates premium transition over aurora */}
          <div className="bg-bg-page dark:bg-bg-page rounded-t-[3rem] relative z-10">
            {/* Placeholder: TrustedByCarousel will slot here in a future PR,
                between Hero and AIWorking247Block. */}

            {/* 2 — AI working 24/7: six live demos (WhatsApp, phone, calendar,
                email, integrations hub, analytics) — the product in action. */}
            <AIWorking247Block />

            {/* 3 — How it works: Receive / Understand / Decide / Execute */}
            <HowItWorksBlock />

            <div className="section-divider max-w-3xl mx-auto" />

            {/* 4 — Channels: WhatsApp · Web · Phone · Email (voice is one channel, not the headline) */}
            <ChannelsBlock />

            {/* 5 — Integrations: CRM / ERP / calendar / comms */}
            <IntegrationsBlock />

            {/* 6 — Sectors: 4 featured + transversal pillar (operations · multichannel · automation) */}
            <SectorsBlock />

            <div className="section-divider max-w-3xl mx-auto" />

            {/* 7 — Proof: 3 metrics, each with a one-line context */}
            <SocialProofBlock />

            {/* 8 — Final CTA: single "Solicitar Demo" */}
            <CTABlock />

            <Footer />
          </div>
        </div>
      </main>
    </div>
  )
}
