import type { Metadata } from "next"
import { SectorPageClient } from "./client"

export const metadata: Metadata = {
  title: "IA para Clinicas Dentales | StaffDigital AI",
  description: "Automatiza citas, recordatorios y atencion al paciente en tu clinica dental con IA 24/7. Reduce no-shows y aumenta ocupacion.",
}

export default function DentistasPage() {
  return <SectorPageClient />
}
