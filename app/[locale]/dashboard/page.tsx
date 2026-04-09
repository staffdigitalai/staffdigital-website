import type { Metadata } from "next"
import { DashboardLayout } from "./dashboard-layout"

export const metadata: Metadata = {
  title: "Dashboard Demo - StaffDigital.AI",
  description: "Explora el dashboard de StaffDigital AI. Panel de control con métricas en tiempo real, gestión de agentes y copiloto IA.",
}

export default function DashboardPage() {
  return <DashboardLayout />
}
