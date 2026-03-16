import type { Metadata } from "next"
import { HomeStagingClient } from "./client"

export const metadata: Metadata = {
  title: "Home Staging IA | Marketing Inmobiliario Inteligente | StaffDigital AI",
  description: "Solucion completa para inmobiliarias: preparacion de propiedades, fotografia profesional, landing pages, chat IA y reserva automatica de visitas.",
}

export default function HomeStagingPage() {
  return <HomeStagingClient />
}
