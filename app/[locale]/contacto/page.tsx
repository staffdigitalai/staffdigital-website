import type { Metadata } from "next"
import { buildPageMetadata } from "@/lib/wordpress"
import { ContactClient } from "./contact-client"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata("contacto", locale, {
    title: "Contacto | StaffDigital AI",
    description:
      "Contacta con StaffDigital AI. Oficinas en Barcelona y Lisboa. Llámanos, escríbenos por WhatsApp o rellena el formulario.",
  })
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      <ContactClient />
    </main>
  )
}
