"use client"

import { OmnicanalShowcase } from "@/components/omnicanal-showcase"
import { useTranslations } from "next-intl"

export function OmnicanalShowcaseBlock() {
  const t = useTranslations("omnicanal_showcase")

  // Conversation for the chat simulation
  const conversation = [
    {
      sender: 'agent' as const,
      message: '¡Hola! Soy tu asistente virtual de StaffDigital. ¿En qué puedo ayudarte hoy?',
      delay: 1000,
    },
    {
      sender: 'customer' as const,
      message: 'Hola, quiero información sobre agentes IA para mi call center',
      delay: 2000,
    },
    {
      sender: 'agent' as const,
      message: '¡Perfecto! Tenemos soluciones de IA para call centers que pueden atender llamadas 24/7, cualificar leads y agendar citas automáticamente. ¿Cuántas llamadas recibís al mes aproximadamente?',
      delay: 2500,
    },
    {
      sender: 'customer' as const,
      message: 'Unas 500 llamadas mensuales, pero perdemos muchas fuera de horario',
      delay: 2000,
    },
    {
      sender: 'agent' as const,
      message: 'Entiendo perfectamente. Con nuestros agentes IA podéis capturar esas llamadas perdidas y convertirlas en oportunidades. ¿Te gustaría agendar una demo personalizada?',
      delay: 2500,
    },
    {
      sender: 'customer' as const,
      message: 'Sí, me interesa ver una demo',
      delay: 1500,
    },
    {
      sender: 'agent' as const,
      message: '¡Excelente! Te paso con nuestro equipo comercial para agendar la demo. También te envío información por email. ¿Cuál es tu correo?',
      delay: 2000,
    },
  ]

  const testimonial = {
    quote: 'Desde que implementamos los agentes IA de StaffDigital, hemos reducido un 60% las llamadas perdidas y aumentado las conversiones en un 35%. El ROI fue visible desde el primer mes.',
    author: 'María García',
    role: 'Directora Comercial',
    company: 'AutoMax Concesionarios',
  }

  return (
    <OmnicanalShowcase
      solutionSlug="omnicanal-ia"
      solutionName="Plataforma Omnicanal IA"
      badge="IA Trabajando 24/7"
      title="Tu equipo de ventas"
      titleHighlight="nunca duerme"
      subtitle={`Agentes IA atendiendo WhatsApp, teléfono y chat web\n100% Gestionado por StaffDigital.ai`}
      description="Nuestra plataforma conecta todos tus canales de comunicación en una única bandeja de entrada inteligente. Los agentes IA cualifican leads, responden preguntas frecuentes, agendan citas y transfieren a humanos cuando es necesario — todo de forma automática y natural."
      chatHeader="StaffDigital AI"
      agentName="Ana — Agente IA"
      agentRole="Asistente Virtual 24/7"
      conversation={conversation}
      activeChannels={['phone', 'whatsapp', 'webchat', 'email']}
      testimonial={testimonial}
      illustrationSrc="/images/agents/phone-agent.jpg"
    />
  )
}
