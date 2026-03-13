import type { Metadata } from "next"
import { SectorPageClient } from "./client"

export const metadata: Metadata = {
  title: "IA para Oficinas y Condominios | StaffDigital AI",
  description: "Automatiza la recepcion, gestiona reservas de salas y coordina servicios en tu edificio o condominio con IA 24/7.",
}

export default function OficinasPage() {
  return <SectorPageClient />
}
