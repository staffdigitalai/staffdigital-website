import type { Metadata } from "next"
import { SectorPageClient } from "./client"

export const metadata: Metadata = {
  title: "IA para Peluquerias y Salones de Belleza | StaffDigital AI",
  description: "Automatiza reservas, gestiona cancelaciones y fideliza clientes en tu peluqueria o salon con IA 24/7.",
}

export default function PeluqueriasPage() {
  return <SectorPageClient />
}
