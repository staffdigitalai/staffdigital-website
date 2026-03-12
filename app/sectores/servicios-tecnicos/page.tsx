import type { Metadata } from "next"
import { SectorPageClient } from "./client"

export const metadata: Metadata = {
  title: "IA para Servicios Tecnicos y SAT | StaffDigital AI",
  description: "Automatiza la recepcion de avisos, coordina tecnicos y mantiene informados a tus clientes con IA 24/7.",
}

export default function ServiciosTecnicosPage() {
  return <SectorPageClient />
}
