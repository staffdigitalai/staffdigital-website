import type { Metadata } from "next"
import { buildPageMetadata } from "@/lib/wordpress"
import { DemoVoiceClient } from "./demo-voice-client"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata("demo-voice", locale, {
    title: "Demo de Voz Humana IA | StaffDigital AI",
    description:
      "Escucha la diferencia. Compara una voz robótica tradicional con nuestra tecnología de voz humana propietaria. Prueba gratis →",
  })
}

export default function DemoVoicePage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      <DemoVoiceClient />
    </main>
  )
}
