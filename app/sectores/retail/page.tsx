import type { Metadata } from "next"
import { SectorPageClient } from "./client"

export const metadata: Metadata = {
  title: "IA para Retail y Comercio | StaffDigital AI",
  description: "Automatiza la atencion al cliente, gestiona inventario y aumenta ventas en tu comercio minorista con inteligencia artificial 24/7.",
}

export default function RetailPage() {
  return <SectorPageClient />
}
