"use client"

import { useState } from "react"
import { 
  LayoutGrid, 
  MessageSquare, 
  Phone, 
  Users, 
  BarChart3, 
  Calendar, 
  Megaphone, 
  Radio, 
  Settings, 
  Bell,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Bot,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  Pause,
  Mail,
  Globe
} from "lucide-react"
import { StaffDigitalLogo } from "@/components/staffdigital-logo"
import Link from "next/link"

// Navigation items for icon sidebar
const navItems = [
  { icon: LayoutGrid, label: "Panel de Control", id: "dashboard", active: true },
  { icon: MessageSquare, label: "Conversaciones", id: "conversations" },
  { icon: Phone, label: "Llamadas", id: "calls" },
  { icon: Users, label: "Contactos", id: "contacts" },
  { icon: BarChart3, label: "Analíticas", id: "analytics" },
  { icon: Calendar, label: "Agenda", id: "calendar" },
  { icon: Megaphone, label: "Campañas", id: "campaigns" },
  { icon: Radio, label: "Difusión", id: "broadcast" },
  { icon: Settings, label: "Configuración", id: "settings" },
]

// Mock data
const kpiData = [
  { 
    label: "Llamadas activas", 
    value: "8", 
    change: "+12%", 
    positive: true,
    icon: Phone,
    color: "#0078AA"
  },
  { 
    label: "Conversaciones WhatsApp", 
    value: "127", 
    change: "+18%", 
    positive: true,
    icon: MessageSquare,
    color: "#25D366"
  },
  { 
    label: "Chats Web", 
    value: "34", 
    change: "-5%", 
    positive: false,
    icon: Globe,
    color: "#7C3AED"
  },
  { 
    label: "Emails pendientes", 
    value: "23", 
    change: "+3%", 
    positive: true,
    icon: Mail,
    color: "#F59E0B"
  },
]

const agents = [
  { name: "María García", status: "online", calls: 12, csat: 4.8, avatar: "MG" },
  { name: "Carlos López", status: "on-call", calls: 8, csat: 4.9, avatar: "CL" },
  { name: "Ana Martínez", status: "online", calls: 15, csat: 4.7, avatar: "AM" },
  { name: "Pedro Sánchez", status: "break", calls: 6, csat: 4.6, avatar: "PS" },
  { name: "Laura Fernández", status: "offline", calls: 0, csat: 4.5, avatar: "LF" },
]

const hourlyData = [
  { hour: "08:00", calls: 12, whatsapp: 45, web: 8 },
  { hour: "09:00", calls: 28, whatsapp: 67, web: 15 },
  { hour: "10:00", calls: 35, whatsapp: 89, web: 22 },
  { hour: "11:00", calls: 42, whatsapp: 95, web: 28 },
  { hour: "12:00", calls: 38, whatsapp: 78, web: 25 },
  { hour: "13:00", calls: 25, whatsapp: 56, web: 18 },
  { hour: "14:00", calls: 18, whatsapp: 42, web: 12 },
  { hour: "15:00", calls: 32, whatsapp: 71, web: 20 },
]

const channelDistribution = [
  { channel: "WhatsApp", value: 45, color: "#25D366" },
  { channel: "Teléfono", value: 30, color: "#0078AA" },
  { channel: "Chat Web", value: 15, color: "#7C3AED" },
  { channel: "Email", value: 10, color: "#F59E0B" },
]

export function DashboardLayout() {
  const [activeNav, setActiveNav] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const today = new Date().toLocaleDateString("es-ES", { 
    weekday: "long", 
    day: "numeric", 
    month: "long", 
    year: "numeric" 
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Icon Sidebar */}
      <aside className="w-16 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col items-center py-4 shrink-0">
        {/* Logo */}
        <Link href="/" className="mb-6 w-10 h-10 rounded-xl bg-gradient-to-br from-[#0078AA] to-[#7C3AED] flex items-center justify-center text-white font-bold text-lg">
          S
        </Link>
        
        {/* Nav Items */}
        <nav className="flex-1 flex flex-col gap-1 w-full px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all ${
                activeNav === item.id
                  ? "bg-gradient-to-br from-[#0078AA] to-[#7C3AED] text-white shadow-lg shadow-[#0078AA]/25"
                  : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
              title={item.label}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))}
        </nav>

        {/* Notifications */}
        <button className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium">3</span>
        </button>
      </aside>

      {/* Secondary Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-0 overflow-hidden' : 'w-64'} bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 shrink-0 hidden md:block`}>
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <StaffDigitalLogo />
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Panel de Control</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Visión general en tiempo real — hoy, {today}
          </p>
        </div>

        {/* Quick Stats in Sidebar */}
        <div className="px-4 space-y-3">
          {kpiData.slice(0, 2).map((kpi, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">{kpi.label}</span>
                <kpi.icon className="w-4 h-4" style={{ color: kpi.color }} />
              </div>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</span>
                <span className={`text-xs font-medium ${kpi.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="h-14 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <StaffDigitalLogo />
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-green-700 dark:text-green-400">Sistema operativo</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">Demo en vivo — StaffDigital.AI</span>
            <Link 
              href="/"
              className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Volver al sitio
            </Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 md:p-6 space-y-6">
          {/* Mobile Title */}
          <div className="md:hidden">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Panel de Control</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Hoy, {today}</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {kpiData.map((kpi, i) => (
              <div 
                key={i} 
                className="p-4 md:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${kpi.color}15` }}
                  >
                    <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${kpi.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {kpi.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {kpi.change}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{kpi.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{kpi.label}</div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
            {/* Hourly Chart */}
            <div className="p-4 md:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Conversaciones por hora</h3>
              <div className="h-48 flex items-end gap-1">
                {hourlyData.map((data, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col gap-0.5">
                      <div 
                        className="w-full rounded-t bg-[#25D366]" 
                        style={{ height: `${data.whatsapp * 0.8}px` }}
                      />
                      <div 
                        className="w-full bg-[#0078AA]" 
                        style={{ height: `${data.calls * 1.5}px` }}
                      />
                      <div 
                        className="w-full rounded-b bg-[#7C3AED]" 
                        style={{ height: `${data.web * 2}px` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400">{data.hour.split(':')[0]}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[#25D366]" />
                  <span className="text-xs text-slate-500">WhatsApp</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[#0078AA]" />
                  <span className="text-xs text-slate-500">Llamadas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[#7C3AED]" />
                  <span className="text-xs text-slate-500">Web</span>
                </div>
              </div>
            </div>

            {/* Channel Distribution */}
            <div className="p-4 md:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Distribución por canal</h3>
              <div className="flex items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {channelDistribution.reduce((acc, channel, i) => {
                      const prevTotal = channelDistribution.slice(0, i).reduce((sum, c) => sum + c.value, 0)
                      const dashArray = `${channel.value} ${100 - channel.value}`
                      const dashOffset = -prevTotal
                      acc.push(
                        <circle
                          key={channel.channel}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={channel.color}
                          strokeWidth="20"
                          strokeDasharray={dashArray}
                          strokeDashoffset={dashOffset}
                          className="transition-all duration-500"
                        />
                      )
                      return acc
                    }, [] as JSX.Element[])}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">192</div>
                      <div className="text-xs text-slate-500">Total</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {channelDistribution.map((channel) => (
                  <div key={channel.channel} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: channel.color }} />
                    <span className="text-xs text-slate-500">{channel.channel}</span>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 ml-auto">{channel.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
            {/* Agents */}
            <div className="lg:col-span-2 p-4 md:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 dark:text-white">Agentes en línea</h3>
                <span className="text-xs text-slate-500">5 agentes</span>
              </div>
              <div className="space-y-3">
                {agents.map((agent, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0078AA] to-[#7C3AED] flex items-center justify-center text-white text-sm font-medium">
                        {agent.avatar}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-700 ${
                        agent.status === 'online' ? 'bg-green-500' :
                        agent.status === 'on-call' ? 'bg-blue-500' :
                        agent.status === 'break' ? 'bg-yellow-500' : 'bg-slate-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-900 dark:text-white text-sm truncate">{agent.name}</div>
                      <div className="text-xs text-slate-500 capitalize flex items-center gap-1">
                        {agent.status === 'online' && <CheckCircle className="w-3 h-3 text-green-500" />}
                        {agent.status === 'on-call' && <Phone className="w-3 h-3 text-blue-500" />}
                        {agent.status === 'break' && <Pause className="w-3 h-3 text-yellow-500" />}
                        {agent.status === 'offline' && <XCircle className="w-3 h-3 text-slate-400" />}
                        {agent.status === 'on-call' ? 'En llamada' : agent.status === 'break' ? 'Descanso' : agent.status === 'offline' ? 'Desconectado' : 'Disponible'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-slate-900 dark:text-white">{agent.calls}</div>
                      <div className="text-xs text-slate-500">llamadas</div>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{agent.csat}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Copilot */}
            <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-[#0078AA]/10 to-[#7C3AED]/10 border border-[#0078AA]/20 dark:border-[#7C3AED]/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0078AA] to-[#7C3AED] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Copiloto IA</h3>
                  <p className="text-xs text-slate-500">Asistente activo</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-white/50 dark:bg-slate-800/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Conversaciones asistidas</span>
                    <span className="text-lg font-bold text-[#0078AA]">847</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#0078AA] to-[#7C3AED]" style={{ width: '78%' }} />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/50 dark:bg-slate-800/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Resolución automática</span>
                    <span className="text-lg font-bold text-green-500">64%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className="h-full rounded-full bg-green-500" style={{ width: '64%' }} />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/50 dark:bg-slate-800/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Tiempo medio respuesta</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-lg font-bold text-slate-900 dark:text-white">1.2s</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-slate-500 text-center">
                    Ahorro estimado: <span className="font-semibold text-[#0078AA]">€4,320/mes</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
