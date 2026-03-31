import type { Metadata } from "next"
import { SectorPageClient } from "./client"

export const metadata: Metadata = {
  title: "IA para Restaurantes y Hosteleria | StaffDigital AI",
  description: "Automatiza reservas, gestiona pedidos y atiende consultas en tu restaurante con IA 24/7. Aumenta reservas y reduce no-shows.",
}

export default function RestaurantesPage() {
  return <SectorPageClient />
}
